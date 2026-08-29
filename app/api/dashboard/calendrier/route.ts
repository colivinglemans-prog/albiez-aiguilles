import { NextResponse, type NextRequest } from "next/server";
import type { Sejour } from "@/lib/dashboard-types";
import { fusionner, sejoursArchives } from "@/lib/archive";
import { sejoursBeds24 } from "@/lib/beds24";
import { PERIODES } from "@/lib/periodes";
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
    beds24Erreur = e instanceof Error ? e.message : String(e);
  }

  const role = await roleDuToken(request.cookies.get(COOKIE_NAME)?.value ?? "");
  const tous = fusionner(live, archives).filter((s) => s.depart >= du && s.arrivee <= au);

  /**
   * Pour le rôle `menage`, les montants sont retirés **de la réponse**, pas seulement de
   * l'affichage. Masquer côté client laisserait les chiffres dans le navigateur, à un
   * clic-droit « inspecter » de distance.
   *
   * Le canal disparaît aussi : savoir qu'un séjour vient d'Airbnb ou de Booking n'aide en
   * rien à faire le ménage, et c'est une information commerciale.
   */
  const sejours =
    role === "menage"
      ? tous.map((s) => ({
          ref: s.ref,
          canal: "Direct" as const,
          arrivee: s.arrivee,
          depart: s.depart,
          nuits: s.nuits,
          brut: 0,
          net: 0,
          commission: 0,
          source: s.source,
          // Les notes restent : elles sont écrites POUR la personne qui fait le ménage.
          // C'est le seul champ qu'elle a besoin de lire au-delà des dates.
          notes: s.notes,
          idBeds24: s.idBeds24,
          // Le nombre de voyageurs reste : c'est le nombre de lits à faire.
          voyageurs: s.voyageurs,
        }))
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
