import { NextRequest, NextResponse } from "next/server";
import { constantTimeEqual } from "@sejour/socle/lib/cron-auth";
import { sendNtfy } from "@sejour/socle/lib/ntfy";
import { modes, runCron } from "@/lib/messages/engine";

/**
 * Webhook « Booking » de Beds24 (sous-compte Albiez) : appelé à chaque réservation créée,
 * modifiée ou annulée. Il lance un passage de la messagerie voyageur — la confirmation part dans
 * la minute, sans attendre le cron de 10 min, qui reste le filet.
 *
 * **Le corps envoyé par Beds24 n'est pas lu** : le moteur relit tout depuis l'API, un appel forgé
 * ne peut rien injecter, au pire déclencher un passage de plus (les modes, le plafond et le
 * registre s'appliquent comme au cron).
 *
 * Authentification : en-tête `x-webhook-secret` (champ « Custom Header » du webhook Beds24),
 * comparé à `BEDS24_WEBHOOK_SECRET`. Variable absente ⇒ refus.
 *
 * Nos propres écritures de registre (`MSG_*`) rappellent ce webhook ; le passage suivant ne trouve
 * plus rien à envoyer. Sans verrou (Albiez n'a pas de stockage), deux appels simultanés en mode
 * `test` peuvent doubler une copie — à l'hôte seulement ; en `live`, le départage du moteur tient.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Le secret peut arriver par l'en-tête `x-webhook-secret` **ou** par le paramètre `key` de l'URL
 * (2026-11-08) : chez Barbusse, Beds24 n'envoyait pas l'en-tête saisi dans « Custom Header »
 * (appels relevés sans en-tête, ou avec une autre valeur). Le paramètre est saisi dans le même
 * champ URL que l'adresse : l'appel qui en vient est reconnu quoi qu'il arrive à l'en-tête.
 */
type Result = "accepted" | "no-header" | "bad-secret" | "no-config";

function check(request: NextRequest): { result: Result; bracketed: boolean } {
  const secret = process.env.BEDS24_WEBHOOK_SECRET?.trim();
  const header = request.headers.get("x-webhook-secret");
  const query = request.nextUrl.searchParams.get("key");
  const given = query && secret && constantTimeEqual(query, secret) ? query : header;
  const bracketed = Boolean(given && given.startsWith("<") && given.endsWith(">"));
  if (!secret) return { result: "no-config", bracketed };
  if (!given) return { result: "no-header", bracketed };
  return { result: constantTimeEqual(given, secret) ? "accepted" : "bad-secret", bracketed };
}

/**
 * Témoin des appels (demandé par l'hôte le 2026-11-08, pour prouver que Beds24 envoie le bon
 * secret) : Albiez n'a pas de stockage, donc une notification ntfy — au plus une par issue et par
 * heure, **par instance** (mémoire du processus, au mieux). Rien du secret n'est envoyé.
 */
const lastNotified = new Map<Result, number>();
async function notify(result: Result, bracketed: boolean): Promise<void> {
  const now = Date.now();
  if (now - (lastNotified.get(result) ?? 0) < 3_600_000) return;
  lastNotified.set(result, now);
  const text =
    result === "accepted"
      ? "Webhook Beds24 reçu et accepté."
      : `Webhook Beds24 refusé (${result}${bracketed ? ", valeur entre chevrons" : ""}) : vérifier le « Custom Header » dans Beds24.`;
  await sendNtfy(text, { title: "Albiez — webhook Beds24", priority: result === "accepted" ? 2 : 3, tags: [result === "accepted" ? "white_check_mark" : "warning"] }).catch(() => {});
}

export async function POST(request: NextRequest) {
  const { result, bracketed } = check(request);
  // Un refus n'alerte que s'il vient de Beds24 (agent « Booking Notifier », relevé le 2026-11-13) :
  // les robots, et le contrôle `security.webhooks` du socle, qui envoie exprès un faux secret,
  // donnaient de fausses alertes.
  const fromBeds24 = (request.headers.get("user-agent") ?? "").includes("Booking Notifier");
  if (result === "accepted" || (result !== "no-header" && fromBeds24)) await notify(result, bracketed);
  if (result !== "accepted") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { killSwitch, modes: m } = modes();
  // Seule la confirmation a besoin de partir dans la minute ; les autres messages sont à heure
  // fixe et le cron de 10 min suffit — inutile de payer un passage complet à chaque webhook.
  if (killSwitch || (m.confirmation !== "live" && m.confirmation !== "test")) {
    return NextResponse.json({ ok: true, messages: null });
  }
  try {
    const r = await runCron();
    return NextResponse.json({
      ok: true,
      sent: r.results.filter((x) => x.outcome === "sent").length,
      tested: r.results.filter((x) => x.outcome === "tested").length,
    });
  } catch (e) {
    console.error(JSON.stringify({ scope: "guest-message", event: "failed", reason: "webhook", error: e instanceof Error ? e.name : typeof e }));
    // 200 quand même : un 5xx ferait réessayer Beds24 en boucle, et le cron rattrape.
    return NextResponse.json({ ok: false });
  }
}

/**
 * Beds24 envoie le webhook en **GET** quand « Additional Data » vaut None (doc Beds24, PROPERTIES
 * -> ACCESS) : même traitement que POST, le corps n'étant jamais lu.
 */
export const GET = POST;
