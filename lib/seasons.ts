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

/**
 * Saisons d'activité de la station, pour les bandeaux du calendrier du dashboard et les
 * accroches de la vitrine.
 *
 * Ce ne sont pas les vacances scolaires (voir `lib/periodes.ts`, généré depuis l'open data
 * du ministère) : c'est l'ouverture du domaine et la saison animée du lac, qui commandent la
 * demande indépendamment du calendrier des zones.
 */
export interface BandeauSaison {
  saison: Season;
  /** Première journée, incluse (YYYY-MM-DD). */
  debut: string;
  /** Dernière journée, incluse (YYYY-MM-DD). */
  fin: string;
  /**
   * `false` quand les dates sont déduites d'une convention et non d'un communiqué de la
   * station. Le calendrier les affiche alors en pointillé : une bande pleine laisserait
   * croire à une date vérifiée.
   */
  confirme: boolean;
}

/**
 * Ouvertures du domaine skiable, **une entrée par hiver**.
 *
 * À compléter chaque année quand la station publie ses dates. Les hivers passés sont
 * volontairement absents plutôt qu'estimés : sur un calendrier, une bande approximative se
 * lit comme une donnée.
 */
export const HIVERS: BandeauSaison[] = [
  { saison: "hiver", debut: "2023-12-16", fin: "2024-03-24", confirme: true },
  { saison: "hiver", debut: "2024-12-21", fin: "2025-03-23", confirme: true },
  { saison: "hiver", debut: "2025-12-20", fin: "2026-03-22", confirme: true },
  { saison: "hiver", debut: WINTER_OPENING.from, fin: WINTER_OPENING.to, confirme: true },
];

/**
 * Saison estivale animée : juillet et août, tous les ans.
 *
 * Contrairement à l'hiver, la règle est stable d'une année sur l'autre — la baignade
 * surveillée au lac et les animations suivent les vacances d'été, pas une date d'ouverture
 * négociée. On peut donc la générer pour n'importe quelle année.
 */
export function eteDeLAnnee(annee: number): BandeauSaison {
  const premier = Math.min(...SUMMER_MONTHS);
  const dernier = Math.max(...SUMMER_MONTHS);
  const finDuMois = new Date(Date.UTC(annee, dernier, 0)).getUTCDate();
  return {
    saison: "ete",
    debut: `${annee}-${String(premier).padStart(2, "0")}-01`,
    fin: `${annee}-${String(dernier).padStart(2, "0")}-${finDuMois}`,
    confirme: true,
  };
}

/** Les bandeaux de saison qui recoupent la fenêtre [du, au], dans l'ordre chronologique. */
export function saisonsEntre(du: string, au: string): BandeauSaison[] {
  const anneeDebut = Number(du.slice(0, 4));
  const anneeFin = Number(au.slice(0, 4));
  const etes = Array.from({ length: anneeFin - anneeDebut + 1 }, (_, i) =>
    eteDeLAnnee(anneeDebut + i),
  );
  return [...HIVERS, ...etes]
    .filter((s) => s.debut <= au && s.fin >= du)
    .sort((a, b) => a.debut.localeCompare(b.debut));
}

/** Ce que les accroches de saison ont besoin de savoir, déjà mis en forme pour la langue. */
export interface PeriodeSaison {
  /** Date d'ouverture du domaine, formatée (« 19 décembre 2026 »). */
  du: string;
  /** Date de fermeture du domaine, formatée. */
  au: string;
  /** Mois de la saison estivale, énumérés dans la langue (« juillet et août »). */
  mois: string;
}

/**
 * Les dates ne sont écrites qu'ici : les dictionnaires reçoivent des chaînes déjà formatées
 * et n'ont plus qu'à composer la phrase.
 *
 * Elles étaient auparavant recopiées en toutes lettres dans les cinq dictionnaires, à côté
 * de `WINTER_OPENING` qui n'était lue par personne. Changer une date d'ouverture demandait
 * six modifications, et rien ne signalait qu'on en avait oublié une.
 */
export function periodeSaison(bcp47: string): PeriodeSaison {
  const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString(bcp47, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  const nomMois = (m: number) =>
    new Date(Date.UTC(2000, m - 1, 1)).toLocaleDateString(bcp47, {
      month: "long",
      timeZone: "UTC",
    });

  return {
    du: formatDate(WINTER_OPENING.from),
    au: formatDate(WINTER_OPENING.to),
    // `Intl.ListFormat` connaît la conjonction de chaque langue : « et », « and », « und »,
    // « y », « e ». L'écrire à la main obligerait à la traduire cinq fois.
    mois: new Intl.ListFormat(bcp47, { style: "long", type: "conjunction" }).format(
      SUMMER_MONTHS.map(nomMois),
    ),
  };
}
