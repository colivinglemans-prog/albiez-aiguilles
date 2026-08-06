import data from "@/data/reviews.json";
import type { Season } from "./seasons";

export interface Review {
  name: string;
  /** Mois du séjour, format `YYYY-MM`. */
  date: string;
  rating: number;
  season: Season;
  text: string;
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

/**
 * Avis à afficher. Filtrés par saison sur les pages de saison — un visiteur qui
 * prépare un séjour au ski est convaincu par des retours de skieurs, pas par
 * des retours de randonneurs.
 */
export function getReviews(season?: Season): Review[] {
  return season ? ALL.filter((r) => r.season === season) : ALL;
}

/** `2026-03` → « mars 2026 ». */
export function formatReviewDate(date: string, locale: string): string {
  const [year, month] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
