import type { Locale } from "@/lib/i18n/locales";

export type Season = "hiver" | "ete";

export const SEASONS: Season[] = ["hiver", "ete"];

/**
 * Slugs d'URL par saison et par langue.
 *
 * On garde des slugs localisés (`/fr/ete` vs `/en/summer`) plutôt qu'un slug unique :
 * les requêtes de recherche sont dans la langue du visiteur, et le mot de l'URL pèse
 * dans le référencement. « ski » se trouve être identique en français, en anglais et
 * en allemand ; l'italien dit « sci » et l'espagnol « esquí ».
 *
 * Sans accent (`esqui`) : un slug accentué se percent-encode dans les canonical, les
 * hreflang et le sitemap, et une URL de ce genre se recopie mal.
 *
 * Les clés restent `hiver` / `ete` dans toutes les langues — ce sont des clés de
 * données, pas du texte affiché.
 */
export const SEASON_SLUGS: Record<Locale, Record<Season, string>> = {
  fr: { hiver: "ski", ete: "ete" },
  en: { hiver: "ski", ete: "summer" },
  de: { hiver: "ski", ete: "sommer" },
  es: { hiver: "esqui", ete: "verano" },
  it: { hiver: "sci", ete: "estate" },
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
 * Forçage manuel de la saison mise en avant sur l'accueil.
 *
 * À utiliser quand la réalité commerciale ne suit pas le calendrier : une saison
 * complète plus tôt que prévu, une ouverture décalée, une opération sur l'autre saison.
 * `null` = bascule automatique selon le mois (voir `currentSeason`).
 */
export const FEATURED_SEASON_OVERRIDE: Season | null = null;

/**
 * Saison à mettre en avant par défaut, selon le mois en cours.
 *
 * Le basculement est volontairement très en avance sur la saison réelle, parce qu'on
 * vend un séjour plusieurs mois avant qu'il ait lieu : dès août l'été est joué et ce
 * sont les réservations de ski qui se décident.
 * Août → avril : ski. Mai → juillet : été.
 */
export function currentSeason(now: Date = new Date()): Season {
  if (FEATURED_SEASON_OVERRIDE) return FEATURED_SEASON_OVERRIDE;
  const month = now.getMonth() + 1;
  return month >= 8 || month <= 4 ? "hiver" : "ete";
}

/** Dossier d'images correspondant à la saison (voir public/images/). */
export function seasonImageDir(season: Season): string {
  return `/images/${season}`;
}
