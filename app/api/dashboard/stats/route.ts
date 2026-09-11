import { NextResponse, type NextRequest } from "next/server";
import { guard } from "@/lib/auth";
import type { RevenueMode, Sejour, StatsDashboard } from "@/lib/dashboard-types";
import { fusionner, origineArchive, recettesArchivees, sejoursArchives } from "@/lib/archive";
import { prixParNuit, sejoursBeds24 } from "@/lib/beds24";
import { periodeLabel } from "@sejour/socle/lib/periodes";
import { addDays, daysBetween } from "@sejour/socle/lib/dates";
import { todayParis } from "@sejour/socle/lib/time";
import {
  buildRevenueChart,
  channelBreakdown,
  channelsByYear,
  compareYears,
  occupiedNights,
  spreadRevenue,
} from "@sejour/socle/lib/stats";

const arrondi = (n: number) => Math.round(n * 100) / 100;

/**
 * Bornes de la période demandée. « toute » couvre l'archive entière — c'est le défaut, parce
 * que l'intérêt de ce dashboard est justement la comparaison pluriannuelle.
 *
 * Le début de « toute » est le **premier séjour connu**, et non une date ronde : l'annonce
 * n'existait pas avant novembre 2023, et faire commencer la période au 1er janvier 2023
 * ajouterait dix mois de nuits « invendues » qui n'étaient pas en vente. Le taux
 * d'occupation en sortait mécaniquement écrasé.
 */
function bornes(periode: string, premierSejour: string | null): { du: string; au: string } {
  const today = todayParis();
  const annee = Number(today.slice(0, 4));
  switch (periode) {
    case "annee":
      return { du: `${annee}-01-01`, au: `${annee}-12-31` };
    case "12m":
      return { du: addDays(today, -365), au: today };
    case "precedente":
      return { du: `${annee - 1}-01-01`, au: `${annee - 1}-12-31` };
    case "toute":
    default:
      return { du: premierSejour ?? `${annee}-01-01`, au: `${annee + 1}-12-31` };
  }
}

/**
 * Le payload le plus précieux du dashboard : `revenuTotal`, `revenuNet`, les commissions par
 * canal, le TJM, la comparaison pluriannuelle.
 *
 * **Admin uniquement, vérifié ici.** Sa seule protection était `proxy.ts`, et l'histoire de
 * ce fichier dit pourquoi ça ne suffit pas : `/api/dashboard/:path*` a manqué au matcher
 * jusqu'au 2026-08-31, et cette route a répondu 200 à n'importe qui pendant tout ce temps.
 * Un matcher est une liste, une liste s'oublie — et rien dans le code ne le signale.
 */
export async function GET(request: NextRequest) {
  const refus = await guard.denyNonAdmin(request);
  if (refus) return refus;

  const params = request.nextUrl.searchParams;
  const mode = (params.get("mode") ?? "averagedPerNight") as RevenueMode;
  const periode = params.get("periode") ?? "toute";
  const tousArchives = sejoursArchives();
  const { du, au } = bornes(
    periode,
    tousArchives.length > 0 ? tousArchives[0].arrival : null,
  );

  // Beds24 peut être injoignable (token expiré, API en panne) : l'archive doit rester
  // consultable. Un dashboard qui refuse de s'afficher parce qu'une API tierce tousse est
  // plus gênant qu'un dashboard qui affiche l'historique en annonçant le live manquant.
  //
  // On interroge Beds24 sur **toute** la plage, pas sur la période sélectionnée : les blocs
  // de comparaison ont besoin de l'historique complet, et le compte tient dans une requête.
  let live: Sejour[] = [];
  let beds24Erreur: string | null = null;
  const anneeMax = Number(todayParis().slice(0, 4)) + 1;
  try {
    live = await sejoursBeds24({
      arriveeDu: tousArchives[0]?.arrival ?? "2023-01-01",
      arriveeAu: `${anneeMax}-12-31`,
    });
  } catch (e) {
    beds24Erreur = e instanceof Error ? e.message : String(e);
    console.error("Beds24 injoignable :", beds24Erreur);
  }

  /**
   * Deux jeux de données, et la distinction est le cœur de cette route.
   *
   * `tout` sert aux trois blocs de comparaison — revenus mensuels, comparaison annuelle,
   * répartition par canal. Les filtrer par période les viderait de leur sens : comparer les
   * années suppose de les avoir toutes, y compris quand l'utilisateur regarde « l'année en
   * cours ».
   *
   * `sejours` sert aux indicateurs et aux tableaux, qui eux décrivent la période choisie.
   */
  const tout = fusionner(live, tousArchives);
  const sejours = tout.filter((s) => s.arrival >= du && s.arrival <= au);

  /**
   * La première année d'activité est écartée des comparaisons quand elle est tronquée.
   *
   * L'annonce a ouvert fin novembre 2023 : cinq semaines de données, contre douze mois pour
   * les années suivantes. Les mettre côte à côte donne une barre minuscule qui ne dit rien
   * d'autre que « l'activité n'avait pas commencé », en écrasant l'échelle du graphe.
   *
   * La règle se maintient seule : on garde à partir de la première année dont le premier
   * séjour tombe en janvier. Elle ne demandera aucune retouche l'an prochain.
   */
  const premier = tout[0]?.arrival;
  const premiereAnneeComparable = premier
    ? Number(premier.slice(0, 4)) + (premier.slice(5, 7) === "01" ? 0 : 1)
    : 0;
  const comparables = tout.filter((s) => Number(s.arrival.slice(0, 4)) >= premiereAnneeComparable);
  const recettes = recettesArchivees({ arriveeDu: du, arriveeAu: au });
  // Recettes sur tout l'historique, pour les mêmes raisons que `comparables`.
  const recettesComparables = recettesArchivees().filter(
    (r) => !r.date || Number(r.date.slice(0, 4)) >= premiereAnneeComparable,
  );

  const today = todayParis();
  const revenuNet = sejours.reduce((s, x) => s + x.net, 0) + recettes.reduce((s, r) => s + r.net, 0);
  const revenuBrut = sejours.reduce((s, x) => s + x.gross, 0) + recettes.reduce((s, r) => s + r.brut, 0);
  const nuitsVendues = sejours.reduce((s, x) => s + x.nights, 0);

  // Occupation sur la partie ÉCOULÉE de la période seulement. Compter les mois à venir
  // comme des nuits invendues écraserait le taux sans rien dire d'utile.
  const finEcoulee = au < today ? au : today;
  const joursEcoules = Math.max(1, daysBetween(du, finEcoulee) + 1);
  const nuitsOccupeesEcoulees = occupiedNights(sejours, du, finEcoulee);

  // Projection de l'année en cours : réalisé + confirmé à venir + tendance sur les jours
  // encore libres, valorisés au prix que pousse Beyond Pricing quand il est disponible.
  const anneeCourante = Number(today.slice(0, 4));
  const debutAnnee = `${anneeCourante}-01-01`;
  const finAnnee = `${anneeCourante}-12-31`;
  // `tout` et non `sejours` : la projection porte sur l'année en cours, que l'utilisateur
  // regarde « l'année précédente » ou « 12 derniers mois » n'y change rien.
  const dansAnnee = tout.filter((s) => s.arrival >= debutAnnee && s.arrival <= finAnnee);
  const realise = dansAnnee
    .flatMap((s) => spreadRevenue(s, mode))
    .filter((v) => v.day <= today)
    .reduce((s, v) => s + v.amount, 0);
  const confirme = dansAnnee
    .flatMap((s) => spreadRevenue(s, mode))
    .filter((v) => v.day > today)
    .reduce((s, v) => s + v.amount, 0);

  let projection = realise + confirme;
  try {
    const prix = await prixParNuit({ du: today, au: finAnnee });
    const nuitsPrises = new Set(
      dansAnnee.flatMap((s) =>
        Array.from({ length: s.nights }, (_, i) => addDays(s.arrival, i)),
      ),
    );
    const tauxRealise = joursEcoules > 0 ? nuitsOccupeesEcoulees / joursEcoules : 0;
    const attenduLibre = Object.entries(prix)
      .filter(([jour]) => jour > today && jour <= finAnnee && !nuitsPrises.has(jour))
      .reduce((s, [, p]) => s + p * tauxRealise, 0);
    projection = realise + confirme + attenduLibre;
  } catch (e) {
    console.warn("Prix au calendrier indisponibles, projection limitée au confirmé :", e);
  }

  const avecPeriode = (liste: Sejour[]) =>
    liste.map((s) => ({
      ...s,
      periode: periodeLabel(s.arrival, s.departure),
      tjm: s.nights > 0 ? arrondi(s.net / s.nights) : 0,
    }));

  const stats: StatsDashboard = {
    periode: { du, au },
    revenuTotal: arrondi(revenuBrut),
    revenuNet: arrondi(revenuNet),
    commissions: arrondi(revenuBrut - revenuNet),
    nombreSejours: sejours.length,
    nuitsVendues,
    tauxOccupation: arrondi((nuitsOccupeesEcoulees / joursEcoules) * 100),
    tjm: nuitsVendues > 0 ? arrondi(sejours.reduce((s, x) => s + x.net, 0) / nuitsVendues) : 0,
    revpar: arrondi(revenuNet / joursEcoules),
    dureeMoyenneSejour: sejours.length > 0 ? arrondi(nuitsVendues / sejours.length) : 0,
    delaiMoyenReservation: (() => {
      const avec = sejours.filter((s) => s.bookedAt);
      if (avec.length === 0) return null;
      return Math.round(
        avec.reduce((s, x) => s + Math.max(0, daysBetween(x.bookedAt!, x.arrival)), 0) / avec.length,
      );
    })(),
    partDirecte: {
      revenu:
        revenuNet > 0
          ? arrondi(
              (sejours.filter((s) => s.channel === "Direct").reduce((s, x) => s + x.net, 0) /
                revenuNet) *
                100,
            )
          : 0,
      sejours:
        sejours.length > 0
          ? arrondi((sejours.filter((s) => s.channel === "Direct").length / sejours.length) * 100)
          : 0,
    },
    // Les 90 jours à venir débordent de toute période passée : calcul sur `tout`.
    occupation90Jours: arrondi(
      (occupiedNights(tout, today, addDays(today, 90)) / 90) * 100,
    ),
    repartitionCanaux: channelBreakdown(sejours),
    // Sur `comparables`, jamais sur `sejours` : voir le commentaire des deux jeux de données.
    graphe: buildRevenueChart(comparables, recettesComparables, mode),
    comparaison: compareYears(comparables, recettesComparables, mode, projection),
    canauxParAnnee: channelsByYear(comparables, recettesComparables),
    sejoursRecents: avecPeriode(
      [...sejours]
        .sort((a, b) => (b.bookedAt ?? b.arrival).localeCompare(a.bookedAt ?? a.arrival))
        .slice(0, 8),
    ),
    meilleursSejours: avecPeriode(
      [...sejours]
        .filter((s) => s.nights > 0)
        .sort((a, b) => b.net / b.nights - a.net / a.nights)
        .slice(0, 8),
    ),
    recettesHorsNuits: {
      total: arrondi(recettes.reduce((s, r) => s + r.net, 0)),
      nombre: recettes.length,
    },
    archiveManquante: origineArchive() === "absente",
  };

  return NextResponse.json({ ...stats, beds24Erreur });
}
