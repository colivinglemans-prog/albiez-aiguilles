/**
 * Utilitaires de calendrier, en **heure locale du navigateur**.
 *
 * Volontairement à l'écart des helpers de `lib/stats.ts`, qui travaillent en UTC : ici on
 * manipule ce que le visiteur voit dans sa grille, pas des données comptables. Passer par
 * `toISOString()` décalerait la date d'un jour pour tout visiteur à l'est de Greenwich en
 * soirée — et la case cliquée ne serait pas celle envoyée à Beds24.
 */

/** Une `Date` vers « YYYY-MM-DD », sans passer par UTC. */
export function formatJour(d: Date): string {
  const a = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const j = String(d.getDate()).padStart(2, "0");
  return `${a}-${m}-${j}`;
}

/** « YYYY-MM-DD » vers une `Date` locale. */
export function parseJour(s: string): Date {
  const [a, m, j] = s.split("-").map(Number);
  return new Date(a, m - 1, j);
}

/** Nombre de jours du mois (mois indexé à partir de 0). */
export function joursDuMois(annee: number, mois: number): number {
  return new Date(annee, mois + 1, 0).getDate();
}

/** Jour de la semaine du 1er du mois, lundi = 0 (`getDay()` rend dimanche = 0). */
export function premierJourDuMois(annee: number, mois: number): number {
  const j = new Date(annee, mois, 1).getDay();
  return j === 0 ? 6 : j - 1;
}

export function ajouterMois(annee: number, mois: number, n: number): { annee: number; mois: number } {
  const d = new Date(annee, mois + n, 1);
  return { annee: d.getFullYear(), mois: d.getMonth() };
}

/** Clé « YYYY-MM », utilisée pour indexer le cache de disponibilités par mois. */
export function cleMois(annee: number, mois: number): string {
  return `${annee}-${String(mois + 1).padStart(2, "0")}`;
}

export function ajouterJours(jour: string, n: number): string {
  const d = parseJour(jour);
  d.setDate(d.getDate() + n);
  return formatJour(d);
}
