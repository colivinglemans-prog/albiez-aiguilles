import data from "@/data/reviews.json";

/**
 * Période du séjour commenté.
 *
 * Distincte de `Season` : une page n'existe que pour l'hiver et l'été, mais un séjour
 * peut aussi avoir eu lieu hors saison — remontées fermées, commerces au ralenti.
 * Ces avis-là décrivent une expérience différente et méritent d'être identifiés
 * plutôt que rangés d'office dans l'une des deux saisons.
 */
export type ReviewPeriod = "hiver" | "ete" | "hors-saison";

export const REVIEW_PERIODS: ReviewPeriod[] = ["hiver", "ete", "hors-saison"];

export interface Review {
  name: string;
  /** Mois du séjour, format `YYYY-MM`. */
  date: string;
  rating: number;
  period: ReviewPeriod;
  text: string;
  /** Réponse de l'hôte, quand elle apporte une information au lecteur. */
  reply?: string;
}

export interface ReviewSummary {
  rating: number;
  count: number;
  guestFavourite: boolean;
  categories: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
}

export const REVIEW_SUMMARY = data.summary as ReviewSummary;

const ALL = (data.reviews as Review[])
  .slice()
  // Les plus récents d'abord : un avis daté de l'an dernier rassure moins.
  .sort((a, b) => b.date.localeCompare(a.date));

/** Tous les avis, ordre le plus récent en premier. */
export function getReviews(period?: ReviewPeriod): Review[] {
  return period ? ALL.filter((r) => r.period === period) : ALL;
}

/** Nombre d'avis par période, pour afficher les compteurs sur le filtre. */
export const REVIEW_COUNTS: Record<ReviewPeriod, number> = REVIEW_PERIODS.reduce(
  (acc, p) => ({ ...acc, [p]: ALL.filter((r) => r.period === p).length }),
  {} as Record<ReviewPeriod, number>,
);

/**
 * Année du plus ancien avis — sert de point de départ à l'ancienneté affichée.
 * Dérivée des données plutôt que saisie en dur, pour qu'elle ne se périme pas.
 */
export const HOSTING_SINCE = Number(
  ALL[ALL.length - 1]?.date.slice(0, 4) ?? new Date().getFullYear(),
);

/** `2026-03` → « mars 2026 ». */
export function formatReviewDate(date: string, locale: string): string {
  const [year, month] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
