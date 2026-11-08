import { NextRequest, NextResponse } from "next/server";
import { constantTimeEqual } from "@sejour/socle/lib/cron-auth";
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

function authorized(request: NextRequest): boolean {
  const secret = process.env.BEDS24_WEBHOOK_SECRET?.trim();
  const given = request.headers.get("x-webhook-secret");
  return Boolean(secret && given && constantTimeEqual(given, secret));
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
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
