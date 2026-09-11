import { NextResponse, type NextRequest } from "next/server";
import type { Sejour } from "@/lib/dashboard-types";
import { fusionner, sejoursArchives } from "@/lib/archive";
import { sejoursBeds24 } from "@/lib/beds24";
import { PERIODES } from "@sejour/socle/lib/periodes";
import { saisonsEntre } from "@/lib/seasons";
import { ajouterJours, aujourdhui } from "@/lib/stats";
import { COOKIE_NAME, roleDuToken } from "@/lib/auth";

/**
 * Contenu d'un mois de calendrier : séjours, vacances scolaires, saisons de la station.
 *
 * Les bornes sont élargies d'un mois de chaque côté : un séjour commencé le 28 du mois
 * précédent doit apparaître sur les premiers jours affichés, et la grille déborde toujours
 * sur les semaines voisines.
 */
export async function GET(request: NextRequest) {
  const mois = request.nextUrl.searchParams.get("mois") ?? aujourdhui().slice(0, 7);
  const [annee, m] = mois.split("-").map(Number);
  if (!annee || !m || m < 1 || m > 12) {
    return NextResponse.json({ erreur: "Paramètre `mois` attendu au format YYYY-MM" }, { status: 400 });
  }

  const premier = `${annee}-${String(m).padStart(2, "0")}-01`;
  const du = ajouterJours(premier, -40);
  const au = ajouterJours(premier, 71);

  const archives = sejoursArchives({ arriveeDu: du, arriveeAu: au });
  let live: Sejour[] = [];
  let beds24Erreur: string | null = null;
  try {
    // `frais` : le calendrier est la page où les consignes s'écrivent, il doit les relire
    // immédiatement plutôt qu'au bout d'une minute.
    live = await sejoursBeds24({ arriveeDu: du, arriveeAu: au, frais: true });
  } catch (e) {
    // Le détail reste dans les logs. Il est construit avec le chemin interne appelé et
    // 200 caractères de la réponse de Beds24 (`lib/beds24.ts`), qui peuvent porter des
    // indices sur la configuration du compte — et il partait tel quel jusqu'au rôle
    // restreint. C'est déjà ce que fait la route publique `/api/disponibilites`.
    console.error("Beds24 injoignable pour le calendrier :", e instanceof Error ? e.message : String(e));
    beds24Erreur = "Beds24 momentanément injoignable";
  }

  const role = await roleDuToken(request.cookies.get(COOKIE_NAME)?.value ?? "");
  const tous = fusionner(live, archives).filter((s) => s.departure >= du && s.arrival <= au);

  /**
   * Pour le rôle `viewer`, les montants sont retirés **de la réponse**, pas seulement de
   * l'affichage. Masquer côté client laisserait les chiffres dans le navigateur, à un
   * clic-droit « inspecter » de distance.
   *
   * Le canal disparaît aussi : savoir qu'un séjour vient d'Airbnb ou de Booking n'aide en
   * rien à faire le ménage, et c'est une information commerciale.
   */
  const sejours: Sejour[] =
    role === "viewer"
      ? tous.map(
          (s, i) =>
            ({
              /*
               * Identifiant **synthétique**, et non `s.ref`.
               *
               * Sur une réservation vivante, `ref` vaut `apiReference` : le code de
               * confirmation du canal. Un `HM…` dit « Airbnb » à qui sait lire, alors que la
               * projection force `canal: "Direct"` juste en dessous — la liste blanche
               * masquait le canal et la référence le dénonçait. Il ne sert ici que de clé
               * React, une clé stable d'un rendu à l'autre suffit donc.
               */
              ref: `sejour-${s.arrival}-${s.departure}-${i}`,
              channel: "Direct" as const,
              arrival: s.arrival,
              departure: s.departure,
              nights: s.nights,
              gross: 0,
              net: 0,
              commission: 0,
              source: s.source,
              // Les notes restent : elles sont écrites POUR la personne qui fait le ménage.
              // C'est le seul champ qu'elle a besoin de lire au-delà des dates.
              notes: s.notes,
              id: s.id,
              // Le nombre de voyageurs reste : c'est le nombre de lits à faire.
              guests: s.guests,
              /*
               * `satisfies Sejour` et non un simple objet : la forme réduite n'était
               * contrainte par rien. Un champ ajouté à `Sejour` demain — sensible ou non —
               * ne serait pas signalé ici, et un champ recopié par mégarde non plus.
               */
            }) satisfies Sejour,
        )
      : tous;

  return NextResponse.json({
    mois,
    role,
    sejours,
    // Les périodes sont filtrées ici et non côté client : envoyer les 80 de tout
    // l'historique pour n'en afficher trois est du gaspillage à chaque changement de mois.
    periodes: PERIODES.filter((p) => p.debut <= au && p.fin >= du),
    saisons: saisonsEntre(du, au),
    beds24Erreur,
  });
}
