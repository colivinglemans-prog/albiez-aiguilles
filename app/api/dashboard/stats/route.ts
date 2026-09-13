import { NextResponse, type NextRequest } from "next/server";
import { guard } from "@/lib/auth";
import type { Sejour } from "@/lib/dashboard-types";
import { fusionner, origineArchive, recettesArchivees, sejoursArchives } from "@/lib/archive";
import { sejoursBeds24 } from "@/lib/beds24";
import { soldBookings } from "@sejour/socle/lib/booking-status";
import { computeDashboardStats, parseStatsQuery } from "@sejour/socle/lib/dashboard-stats";
import { periodeLabel } from "@sejour/socle/lib/periodes";
import { todayParis } from "@sejour/socle/lib/time";

/**
 * La charge utile de la page de statistiques — **la même que chez Barbusse**, calculée par la
 * même fonction du socle.
 *
 * Cette route faisait 223 lignes et recalculait ici huit indicateurs que l'autre site
 * recalculait de son côté, avec d'autres définitions. Il ne reste que ce qui est propre à ce
 * bien : d'où viennent les séjours (Beds24 plus une archive gitignorée), les recettes sans nuits,
 * un logement louable, et le repère des lignes — la période de vacances scolaires, là où
 * Barbusse écrit le nom d'un événement du circuit.
 *
 * **Admin uniquement, vérifié ici.** Sa seule protection était `proxy.ts`, et l'histoire de
 * ce fichier dit pourquoi ça ne suffit pas : `/api/dashboard/:path*` a manqué au matcher
 * jusqu'au 2026-08-31, et cette route a répondu 200 à n'importe qui pendant tout ce temps.
 *
 * Beds24 peut être injoignable : l'archive doit rester consultable, et la page le dit dans un
 * bandeau au lieu d'afficher un historique qui s'arrête sans raison. Le détail de l'erreur
 * reste dans les logs — il porte le chemin interne et 200 caractères de réponse Beds24.
 */
export async function GET(request: NextRequest) {
  const refus = await guard.denyNonAdmin(request);
  if (refus) return refus;

  const { period, mode } = parseStatsQuery(request.nextUrl.searchParams);
  const tousArchives = sejoursArchives();

  // Toute la plage, pas la période choisie : les blocs de comparaison ont besoin de
  // l'historique complet, et le compte tient dans une requête.
  let live: Sejour[] = [];
  let beds24Error: string | null = null;
  const anneeMax = Number(todayParis().slice(0, 4)) + 1;
  try {
    live = await sejoursBeds24({
      arriveeDu: tousArchives[0]?.arrival ?? "2023-01-01",
      arriveeAu: `${anneeMax}-12-31`,
    });
  } catch (e) {
    console.error("Beds24 injoignable :", e instanceof Error ? e.message : e);
    beds24Error = "Beds24 est injoignable : seul l'historique archivé est affiché.";
  }

  const payload = computeDashboardStats({
    // Le tri par statut se fait une fois, ici ; le type `SoldBooking` l'impose ensuite.
    bookings: soldBookings(fusionner(live, tousArchives)),
    extras: recettesArchivees(),
    mode,
    period,
    unitsTotal: 1,
    markerOf: (s) => periodeLabel(s.arrival, s.departure),
    warnings: { archiveMissing: origineArchive() === "absente", beds24Error },
  });

  return NextResponse.json(payload);
}
