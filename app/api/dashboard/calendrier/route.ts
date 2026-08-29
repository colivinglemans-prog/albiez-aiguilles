import { NextResponse, type NextRequest } from "next/server";
import type { Sejour } from "@/lib/dashboard-types";
import { fusionner, sejoursArchives } from "@/lib/archive";
import { sejoursBeds24 } from "@/lib/beds24";
import { PERIODES } from "@/lib/periodes";
import { saisonsEntre } from "@/lib/seasons";
import { ajouterJours, aujourdhui } from "@/lib/stats";

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
    live = await sejoursBeds24({ arriveeDu: du, arriveeAu: au });
  } catch (e) {
    beds24Erreur = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({
    mois,
    sejours: fusionner(live, archives).filter((s) => s.depart >= du && s.arrivee <= au),
    // Les périodes sont filtrées ici et non côté client : envoyer les 80 de tout
    // l'historique pour n'en afficher trois est du gaspillage à chaque changement de mois.
    periodes: PERIODES.filter((p) => p.debut <= au && p.fin >= du),
    saisons: saisonsEntre(du, au),
    beds24Erreur,
  });
}
