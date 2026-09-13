import { type Locale } from "@/lib/i18n";
import {
  createSeo,
  homePath,
  itemPath,
  openGraphLocales,
  sectionPath,
  type PathFor,
} from "@sejour/socle/lib/seo";
import { SITE_URL, PROPERTY, SITE_NAME, RESORT } from "@/lib/property";
import { SEASON_SLUGS, type Season } from "@/lib/seasons";
import { REVIEW_SUMMARY } from "@/lib/reviews";

/**
 * Le SEO du site : ce qui est commun aux deux sites vit dans `@sejour/socle/lib/seo`,
 * ce qui décrit **ce bien-ci** reste ici.
 *
 * La frontière passe exactement là où passe la donnée. `alternatesFor`, `openGraphLocales`
 * et `articleJsonLd` ne connaissent qu'une URL de site et un `pathFor` : ils sont montés.
 * `apartmentJsonLd` décrit un appartement en station — surface, couchages, `SkiResort` — et
 * n'a aucun équivalent chez l'autre site : il reste.
 */
const seo = createSeo({ siteUrl: SITE_URL, siteName: SITE_NAME });

/** Les `alternates` d'une page : `canonical` + les cinq `hreflang` + le `x-default`. */
export const { alternatesFor, hreflangMap } = seo;

export { openGraphLocales, homePath };

/**
 * Chemin de la page d'une saison dans une langue.
 *
 * Le seul chemin du site dont le slug est **traduit** (`/fr/ete` ↔ `/en/summer`), et donc
 * le seul que le socle ne peut pas fabriquer : il lit `SEASON_SLUGS`, qui est une donnée
 * d'Albiez.
 */
export const seasonPath =
  (season: Season): PathFor =>
  (l) =>
    `/${l}/${SEASON_SLUGS[l][season]}`;

/** Chemin de l'index du guide. */
export const blogPath = sectionPath("guide");

/**
 * Chemin de la page de séjour longue durée.
 *
 * Slug commun aux cinq langues, comme `/guide` et contrairement aux saisons. La requête
 * visée est française — « logement chantier Lyon-Turin » — parce que le chantier est en
 * France et que la plateforme de mise en relation l'est aussi ; traduire l'adresse ne
 * ferait gagner aucun mot-clé utile.
 *
 * La page n'est ni dans la navigation ni dans l'index du guide, mais elle est au sitemap :
 * elle se trouve en la cherchant, pas en se promenant sur le site. C'est délibéré — un
 * vacancier venu pour le ski n'a rien à faire sur une page qui parle de chantier.
 */
export const longStayPath = sectionPath("sejour-longue-duree");

/**
 * Chemin d'un article. Le slug est commun aux cinq langues, contrairement aux
 * saisons : un article n'existe qu'à un seul endroit, seul son contenu est traduit.
 */
export const blogPostPath = (slug: string): PathFor => itemPath("guide", slug);

/**
 * Données structurées d'un article de guide.
 *
 * Enveloppe du socle : elle prend un `slug` plutôt qu'un `pathFor`, parce que c'est ce que
 * la page d'article a sous la main et que le chemin du guide est décidé ici.
 */
export function articleJsonLd(params: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}) {
  return seo.articleJsonLd({
    locale: params.locale,
    pathFor: blogPostPath(params.slug),
    title: params.title,
    description: params.description,
    imageUrl: params.imageUrl,
    date: params.date,
  });
}

/*
 * `eventJsonLd` a quitté ce fichier : il vit dans `@sejour/socle/lib/events`, avec le champ
 * `confirmed` qui commande son émission. Barbusse en avait besoin et ne l'avait pas.
 */

/**
 * Données structurées schema.org du logement.
 * Sert aux résultats enrichis de Google sur les requêtes d'hébergement.
 *
 * `imagePath` est un chemin public (`/images/...`) : l'absolu est construit ici, une
 * URL relative n'ayant pas de sens hors du document pour un consommateur de JSON-LD.
 */
export function apartmentJsonLd(
  locale: Locale,
  description: string,
  imagePath?: string,
) {
  return {
    "@context": "https://schema.org",
    // Deux types pour une seule entité : `Apartment` décrit le **lieu** (surface,
    // couchages, équipements), `LodgingBusiness` l'**activité** de location.
    //
    // Le second n'est pas décoratif. Google n'accepte `aggregateRating` que sur une
    // liste fermée de types, dont `LocalBusiness` — dont `LodgingBusiness` hérite.
    // `Apartment` seul n'en fait pas partie : la Search Console rejetait tout le bloc
    // en « type d'objet non valide pour le champ <parent_node> », et l'élément entier
    // devenait inéligible aux résultats enrichis. Ne pas retirer `LodgingBusiness`
    // sans retirer `aggregateRating` en même temps.
    "@type": ["Apartment", "LodgingBusiness"],
    name: SITE_NAME,
    description,
    url: `${SITE_URL}/${locale}`,
    ...(imagePath ? { image: `${SITE_URL}${imagePath}` } : {}),
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
