import { NextResponse, type NextRequest } from "next/server";
import { monthlyAvailability } from "@sejour/socle/lib/availability";
import { addDays } from "@sejour/socle/lib/dates";
import { todayParis } from "@sejour/socle/lib/time";
import { contraintes, disponibilites } from "@/lib/beds24";

/**
 * Disponibilités du logement, pour le calendrier de la vitrine.
 *
 * **Route publique**, volontairement : elle est hors du `matcher` du proxy, qui ne couvre que
 * `/` et `/dashboard/:path*`.
 *
 * Elle ne renvoie que des **dates, des booléens, des durées minimales et des jours fermés à
 * l'arrivée ou au départ** — aucun montant, aucun nom de voyageur, aucune référence. C'est ce qui la rend publiable :
 * un visiteur apprend qu'une nuit est prise, rien de plus.
 *
 * Les prix ne transitent pas par ici non plus : c'est la page de réservation Beds24 qui les
 * affiche, avec la remise directe déjà appliquée.
 *
 * `du`/`au` sont au choix de l'appelant ; depuis le 2026-11-20 ils ne fabriquent plus une URL
 * Beds24 par couple :
 * - **lecture par mois civils entiers** (`monthlyAvailability`, comme `lib/agent.ts`) : une
 *   quinzaine d'URL possibles, absorbées par le cache de données de 60 s ;
 * - **horizon borné** : `au` ramené à aujourd'hui + 400 jours, `du` à aujourd'hui − 31 jours
 *   (le calendrier part du 1er du mois en cours). Un jour hors horizon est absent de la
 *   réponse, ce que le calendrier lit comme « non vendable » ;
 * - **`Cache-Control` public de 60 s** sur les réponses 200 : le CDN sert les rafales.
 */
const HORIZON_JOURS = 400;
const PASSE_JOURS = 31;
const CACHE = { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60" };

const lireParMois = monthlyAvailability(async (du, au) => {
  const [dates, regles] = await Promise.all([disponibilites(du, au), contraintes(du, au)]);
  return { dates, minStay: regles.minima, sansArrivee: regles.sansArrivee, sansDepart: regles.sansDepart };
});

/** Bornes ramenées dans l'horizon, ou `null` si plus rien n'en reste. */
function dansHorizon(du: string, au: string): { du: string; au: string } | null {
  const aujourdhui = todayParis();
  const debut = addDays(aujourdhui, -PASSE_JOURS);
  const fin = addDays(aujourdhui, HORIZON_JOURS);
  const a = du < debut ? debut : du;
  const b = au > fin ? fin : au;
  return a <= b ? { du: a, au: b } : null;
}
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const du = params.get("du");
  const au = params.get("au");

  if (!du || !au || !/^\d{4}-\d{2}-\d{2}$/.test(du) || !/^\d{4}-\d{2}-\d{2}$/.test(au)) {
    return NextResponse.json(
      { erreur: "Paramètres `du` et `au` attendus au format YYYY-MM-DD" },
      { status: 400 },
    );
  }
  if (au < du) {
    return NextResponse.json({ erreur: "`au` doit suivre `du`" }, { status: 400 });
  }
  // Garde-fou sur une route ouverte : sans borne, une plage de dix ans ferait travailler
  // l'API Beds24 pour rien à chaque appel.
  if (Date.parse(au) - Date.parse(du) > 400 * 86_400_000) {
    return NextResponse.json({ erreur: "Plage limitée à 400 jours" }, { status: 400 });
  }

  const plage = dansHorizon(du, au);
  if (!plage) {
    return NextResponse.json({ dates: {}, minStay: {}, sansArrivee: [], sansDepart: [] }, { headers: CACHE });
  }

  try {
    const { dates, minStay, sansArrivee, sansDepart } = await lireParMois(plage.du, plage.au);
    // `sansArrivee` / `sansDepart` portent la rotation du samedi des vacances d'hiver. Sans
    // elles, le calendrier laisse choisir une arrivée que la page Beds24 refuse ensuite.
    return NextResponse.json(
      { dates, minStay: minStay ?? {}, sansArrivee: sansArrivee ?? [], sansDepart: sansDepart ?? [] },
      { headers: CACHE },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Disponibilités indisponibles :", message);
    // Le détail de l'erreur reste dans les logs : il peut contenir des indices sur la
    // configuration du compte, qui n'ont rien à faire dans une réponse publique.
    return NextResponse.json(
      { erreur: "Disponibilités momentanément indisponibles" },
      { status: 502 },
    );
  }
}
