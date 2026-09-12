import { NextRequest, NextResponse } from "next/server";
import { verifyCronAuth } from "@sejour/socle/lib/cron-auth";
import { formatEventWatch, watchEvents } from "@sejour/socle/lib/events-watch";
import { sendNtfy } from "@sejour/socle/lib/ntfy";
import { todayParis } from "@sejour/socle/lib/time";
import { EVENTS, EVENTS_WATCH } from "@/lib/events";

/**
 * Rappelle d'aller vérifier les dates d'événements qui ne sont pas encore officielles. À
 * appeler une fois par semaine.
 *
 * Les règles et leurs limites sont dites dans `@sejour/socle/lib/events-watch` ; ici ne
 * vivent que les seuils du secteur — `EVENTS_WATCH`, à côté du catalogue — et l'envoi.
 *
 * Sans état : la même alerte revient chaque semaine tant que `lib/events.ts` n'a pas été mis
 * à jour, et s'éteint seule ensuite. Pas de coupe-circuit pour la même raison — la façon
 * d'arrêter une alerte est de faire ce qu'elle demande.
 *
 * `NTFY_TOPIC` absent vaut un 500, pas un envoi ignoré : `sendNtfy` se contenterait d'un
 * `console.error` que personne ne lit, et une veille qui se tait ressemble exactement à une
 * veille qui n'a rien à dire. C'est la notification d'échec de cron-job.org qui prévient.
 *
 * `?dry=1` rend les alertes sans rien envoyer — pour lire ce que dirait la notification —
 * et accepte alors `&today=YYYY-MM-DD` pour la lire à une autre date : la veille se tait
 * des mois d'affilée, c'est le seul moyen de la voir parler avant l'heure. Hors `dry`, la
 * date est toujours celle du jour.
 *
 * Planifié sur cron-job.org, en-tête `Authorization: Bearer $CRON_SECRET`. La route n'est pas
 * couverte par le matcher de `proxy.ts` — sa protection est ce seul secret.
 */
export async function GET(request: NextRequest) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ erreur: "Non autorisé" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const aBlanc = params.get("dry") === "1";
  const dateDemandee = params.get("today");
  const aujourdhui =
    aBlanc && dateDemandee && /^\d{4}-\d{2}-\d{2}$/.test(dateDemandee) ? dateDemandee : todayParis();
  const alertes = watchEvents(EVENTS, aujourdhui, EVENTS_WATCH);
  const message = formatEventWatch(alertes);

  if (alertes.length === 0 || aBlanc) {
    return NextResponse.json({ ok: true, aujourdhui, alertes, message, envoye: false });
  }

  if (!process.env.NTFY_TOPIC) {
    return NextResponse.json(
      { ok: false, erreur: "NTFY_TOPIC n'est pas défini : la veille aurait quelque chose à dire et ne peut pas l'envoyer", alertes },
      { status: 500 },
    );
  }

  const fenetre = alertes.find((a) => a.kind === "window");
  await sendNtfy(message, {
    title: "Veille événements — Albiez",
    priority: 2,
    tags: ["calendar"],
    click: fenetre?.window.url,
  });

  return NextResponse.json({ ok: true, aujourdhui, alertes, message, envoye: true });
}
