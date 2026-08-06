import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/i18n";
import { SITE_URL, PROPERTY, SITE_NAME, RESORT } from "@/lib/property";
import { SEASON_SLUGS, type Season } from "@/lib/seasons";
import { REVIEW_SUMMARY } from "@/lib/reviews";

/**
 * Construit les balises `alternates` (canonical + hreflang) d'une page.
 *
 * `pathFor` reçoit une langue et rend le chemin correspondant : c'est ce qui permet
 * de gérer les slugs localisés (`/fr/ete` ↔ `/en/summer`) sans dupliquer la logique.
 */
export function alternatesFor(
  locale: Locale,
  pathFor: (l: Locale) => string,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}${pathFor(l)}`;
  }
  languages["x-default"] = `${SITE_URL}${pathFor("fr")}`;

  return { canonical: `${SITE_URL}${pathFor(locale)}`, languages };
}

/** Chemin de la page d'accueil d'une langue. */
export const homePath = (l: Locale) => `/${l}`;

/** Chemin de la page d'une saison dans une langue. */
export const seasonPath = (season: Season) => (l: Locale) =>
  `/${l}/${SEASON_SLUGS[l][season]}`;

/**
 * Données structurées schema.org du logement.
 * Sert aux résultats enrichis de Google sur les requêtes d'hébergement.
 */
export function apartmentJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: SITE_NAME,
    description,
    url: `${SITE_URL}/${locale}`,
    numberOfBedrooms: PROPERTY.capacity.bedrooms,
    numberOfBathroomsTotal: PROPERTY.capacity.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: PROPERTY.areaM2,
      unitCode: "MTK",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      minValue: PROPERTY.capacity.min,
      maxValue: PROPERTY.capacity.max,
      unitText: "person",
    },
    // Note moyenne issue des avis Airbnb : c'est ce qui alimente les étoiles
    // affichées dans les résultats de recherche Google.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEW_SUMMARY.rating,
      reviewCount: REVIEW_SUMMARY.count,
      bestRating: 5,
      worstRating: 1,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: PROPERTY.address.street,
      postalCode: PROPERTY.address.postalCode,
      addressLocality: PROPERTY.address.city,
      addressRegion: PROPERTY.address.region,
      addressCountry: "FR",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Balcony", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ski storage", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dishwasher", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
    ],
    containedInPlace: {
      "@type": "SkiResort",
      name: `Station d'${RESORT.name}`,
      url: PROPERTY.links.resort,
    },
  };
}
