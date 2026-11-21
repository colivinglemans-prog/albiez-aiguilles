import {
  heartbeatResponse,
  overdueWithGrace,
  recordHeartbeat,
  type ExpectedCron,
  type HeartbeatStore,
} from "@sejour/socle/lib/heartbeat";
import { nextAlertState, type AlertState } from "@sejour/socle/lib/alert-state";
import { sendNtfy } from "@sejour/socle/lib/ntfy";
import { hasKv, kvStore } from "@/lib/kv";

/**
 * Battement de cœur des crons d'Albiez (depuis le 21/11/2026) : chaque cron écrit son passage
 * dans Upstash (`albiez:heartbeat:<nom>` et `…:ok`), la route publique `/api/health/heartbeat`
 * dit s'il y en a en retard — **le compte seulement**, jamais les noms — et prévient par ntfy,
 * une fois par changement d'état.
 *
 * Retard accepté = cadence réelle (cron-job.org, relevée le 21/11/2026) plus un passage raté
 * toléré : trois cadences sous l'heure, 26 h pour un quotidien, ~8 jours pour un hebdomadaire.
 * Seul le dernier passage `ok` compte : un cron qui échoue à chaque tour finit en retard.
 *
 * `beat(...)` en fin de passage **réel**, jamais en `?dry=1`. Un passage sauté par décision
 * (coupe-circuit, rien en `live`) bat `ok` : le planificateur est vivant, c'est ce que le
 * battement mesure.
 */
export const HEARTBEAT_PREFIX = "albiez:heartbeat";
const ALERT_KEY = "albiez:alert:heartbeat";

const WEEK_PLUS_A_DAY = 8 * 24 * 60;
const DAY_PLUS_TWO_HOURS = 26 * 60;

export const EXPECTED_CRONS = [
  // Toutes les 10 min (:00, :10…).
  { name: "messages-voyageurs", maxAgeMinutes: 30 },
  // Toutes les 20 min (:03, :23, :43).
  { name: "price-grid", maxAgeMinutes: 90 },
  // 6 h 30 heure de Paris.
  { name: "indexing", maxAgeMinutes: DAY_PLUS_TWO_HOURS },
  // Lundi 11 h (et le 1er du mois) : les refresh tokens Beds24 meurent à 30 jours sans usage.
  { name: "beds24-keepalive", maxAgeMinutes: WEEK_PLUS_A_DAY },
  // Lundi 12 h.
  { name: "events-watch", maxAgeMinutes: WEEK_PLUS_A_DAY },
] as const satisfies readonly ExpectedCron[];

export type MonitoredCron = (typeof EXPECTED_CRONS)[number]["name"];

/** Les clés de passage expirent seules au bout de 30 jours : un cron disparu finit « en retard ». */
const TTL_SECONDS = 30 * 24 * 3600;

/** Enregistre un passage. Ne lève jamais : un battement raté ne doit pas faire échouer le cron. */
export async function beat(name: MonitoredCron, outcome: "ok" | "error", now: Date = new Date()): Promise<void> {
  if (!hasKv()) return;
  try {
    const kv = kvStore();
    const store: HeartbeatStore = { get: kv.get, set: (k, v) => kv.setEx(k, v, TTL_SECONDS) };
    await recordHeartbeat(store, HEARTBEAT_PREFIX, name, outcome, now);
  } catch (e) {
    console.error(`[heartbeat] ${name}:`, e instanceof Error ? e.message : e);
  }
}

export type AlertSender = (title: string, body: string, priority: 1 | 4) => Promise<void>;

const ntfySender: AlertSender = (title, body, priority) =>
  sendNtfy(body, { title, priority, tags: priority === 1 ? ["white_check_mark"] : ["warning"] });

/**
 * Contrôle complet : crons en retard (avec le délai de grâce du socle), puis alerte privée une
 * fois par changement d'état. **L'état n'est écrit qu'après un envoi réussi** : si ntfy est en
 * panne, l'appel suivant renverra l'alerte (correctif Barbusse du 16/11/2026).
 *
 * Le magasin est injecté pour les tests. Il ne doit pas expirer ses écritures (`watched-since`).
 */
export async function checkHeartbeat(
  store: HeartbeatStore,
  now: Date,
  send: AlertSender = ntfySender,
): Promise<{ status: 200 | 503; body: { ok: boolean; overdue: number } }> {
  const result = await overdueWithGrace(store, HEARTBEAT_PREFIX, EXPECTED_CRONS, now);

  try {
    const raw = await store.get(ALERT_KEY);
    const prev = raw ? (JSON.parse(raw) as AlertState) : null;
    const transition = nextAlertState(
      prev,
      result.names.map((id) => ({ id, status: "fail", severity: "blocking" })),
      now,
    );
    if (transition.action === "open" || transition.action === "escalate") {
      await send(
        `Albiez — ${transition.failingIds.length} cron(s) en retard`,
        [
          "Dernier passage réussi trop ancien (vérifier cron-job.org et les journaux Vercel) :",
          "",
          ...transition.failingIds.map((n) => `  - ${n}`),
        ].join("\n"),
        4,
      );
    } else if (transition.action === "recover") {
      await send("Albiez — crons rétablis", "Tous les crons surveillés sont de nouveau à l'heure.", 1);
    }
    await store.set(ALERT_KEY, JSON.stringify(transition.state));
  } catch (e) {
    // L'alerte privée ne doit pas changer la réponse publique.
    console.error("[heartbeat] alerte:", e instanceof Error ? e.message : e);
  }

  return heartbeatResponse(result);
}
