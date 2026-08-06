import type { Locale } from "@/lib/i18n/types";

export type Season = "hiver" | "ete";

export const SEASONS: Season[] = ["hiver", "ete"];

/**
 * Slugs d'URL par saison et par langue.
 *
 * On garde des slugs localisés (`/fr/ete` vs `/en/summer`) plutôt qu'un slug unique :
 * les requêtes de recherche sont dans la langue du visiteur, et le mot de l'URL pèse
 * dans le référencement. « ski » se trouve être identique dans les deux langues.
 */
export const SEASON_SLUGS: Record<Locale, Record<Season, string>> = {
  fr: { hiver: "ski", ete: "ete" },
  en: { hiver: "ski", ete: "summer" },
};

/** Résout un slug d'URL vers une saison, ou null si le slug est inconnu (→ 404). */
export function seasonFromSlug(locale: Locale, slug: string): Season | null {
  const map = SEASON_SLUGS[locale];
  const found = SEASONS.find((s) => map[s] === slug);
  return found ?? null;
}

export function slugForSeason(locale: Locale, season: Season): string {
  return SEASON_SLUGS[locale][season];
}

export function seasonHref(locale: Locale, season: Season): string {
  return `/${locale}/${slugForSeason(locale, season)}`;
}

/**
 * Dates d'ouverture du domaine skiable, à mettre à jour chaque année.
 * Affichées telles quelles sur la page ski.
 */
export const WINTER_OPENING = {
  from: "2026-12-19",
  to: "2027-03-21",
} as const;

/** Mois de la saison estivale « animée » (baignade surveillée, animations). */
export const SUMMER_MONTHS = [7, 8] as const;

/**
 * Saison à mettre en avant par défaut, selon le mois en cours.
 *
 * Le basculement est volontairement en avance sur la saison réelle : on promeut le ski
 * dès octobre parce que les séjours d'hiver se réservent plusieurs mois à l'avance.
 * Octobre → avril : ski. Mai → septembre : été.
 */
export function currentSeason(now: Date = new Date()): Season {
  const month = now.getMonth() + 1;
  return month >= 10 || month <= 4 ? "hiver" : "ete";
}

/** Dossier d'images correspondant à la saison (voir public/images/). */
export function seasonImageDir(season: Season): string {
  return `/images/${season}`;
}
