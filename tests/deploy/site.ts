/**
 * Ce que la surveillance attend d'Albiez — contrat `DeploySite` du socle (v3.9.0).
 *
 * **Les valeurs sont importées du code du site, jamais recopiées** : une règle qui change
 * dans `lib/property.ts`, `lib/legal.ts`, `lib/seasons.ts` ou `app/robots.ts` ne laisse pas le
 * contrôle en retard. Les seules constantes écrites ici sont celles qui n'existent nulle part
 * ailleurs dans le dépôt : chemins de routes, et identifiants de l'autre entité qui ne doivent
 * jamais apparaître.
 *
 * Ce fichier est public, comme tout le dépôt : aucun secret, aucun code d'accès, aucune date
 * d'occupation. Les secrets arrivent par l'environnement, au moment du passage.
 */
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { DeploySite } from "@sejour/socle/config/deploy-site";
import { todayParis } from "@sejour/socle/lib/time";
import robots from "@/app/robots";
import { BLOG_POSTS } from "@/lib/blog/posts";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n/locales";
import { LEGAL_ENTITY } from "@/lib/legal";
import { CANCELLATION_POLICY, DISTANCES, PROPERTY, SITE_NAME, SITE_URL } from "@/lib/property";
import { REVIEW_SUMMARY } from "@/lib/reviews";
import { HIVERS, SEASON_SLUGS } from "@/lib/seasons";
import {
  declaredPrimary,
  keyBoxCodeCheck,
  legalNoticeCheck,
  rotationCheck,
  themeCheck,
} from "./albiez-checks";

const root = (p: string) => fileURLToPath(new URL(`../../${p}`, import.meta.url));

/**
 * SIREN de l'entreprise individuelle qui exploite la maison du Mans : il ne doit **jamais**
 * figurer sur ce site (voir l'en-tête de `lib/legal.ts`). Espaces facultatives, le SIRET
 * commençant par le SIREN est couvert du même coup.
 */
const AUTRE_ENTITE_SIREN = /535\s?071\s?757/;

/** Pages contrôlées dans chaque langue — les slugs de saison sont traduits. */
function keyPages(locale: string): string[] {
  const slugs = SEASON_SLUGS[locale as Locale];
  return [
    "",
    `/${slugs.hiver}`,
    `/${slugs.ete}`,
    "/guide",
    `/guide/${BLOG_POSTS[0].slug}`,
    "/guide-arrivee",
    "/mentions-legales",
    "/sejour-longue-duree",
  ];
}

/** Ce que `app/robots.ts` interdit réellement : la même fonction que celle que sert Next. */
const disallowed = [robots().rules]
  .flat()
  .flatMap((r) => [r.disallow ?? []].flat());

/** Une route de cron par dossier de `app/api/cron/` : un cron ajouté est contrôlé d'office. */
const cronRoutes = readdirSync(root("app/api/cron"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => `/api/cron/${d.name}`)
  .sort();

/** Le mois courant, pour que l'API du calendrier réponde sur un paramètre valide. */
const moisCourant = todayParis().slice(0, 7);

const site = {
  name: SITE_NAME,
  canonicalUrl: SITE_URL,
  apexUrl: SITE_URL.replace("://www.", "://"),
  // Aucun hôte en plus du canonique : le post-déploiement de production vise le domaine, et
  // les previews ne reçoivent aucun secret de session (voir post-deploy.yml).
  allowedHosts: [],

  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  keyPages,
  // L'adresse personnelle de l'hôte est publiée (guide d'arrivée, mentions légales).
  allowedEmailDomains: [PROPERTY.contact.email.split("@")[1]],
  bookingAnchor: "reserver",

  availability: {
    path: (from, to) => `/api/disponibilites?du=${from}&au=${to}`,
    datesKey: "dates",
    minStayKey: "minStay",
    closedArrivalKey: "sansArrivee",
    closedDepartureKey: "sansDepart",
    // Pas de `sellingWindow` : le logement se loue toute l'année (ski, été, hors saison).
  },

  beds24: {
    propertyId: PROPERTY.beds24.propertyId,
    roomId: PROPERTY.beds24.roomId,
  },

  robots: { mustDisallow: disallowed },

  sitemap: {
    // Pages servies mais hors sitemap, en `noindex` (mentions légales, guide d'arrivée caché).
    excludedPaths: ["mentions-legales", "guide-arrivee"],
  },

  reviews: { count: REVIEW_SUMMARY.count, ratingValue: REVIEW_SUMMARY.rating },

  llms: {
    path: "/llms.txt",
    requiredPaths: [
      ...LOCALES.map((l) => `/${l}`),
      `/${DEFAULT_LOCALE}/${SEASON_SLUGS[DEFAULT_LOCALE].hiver}`,
      `/${DEFAULT_LOCALE}/${SEASON_SLUGS[DEFAULT_LOCALE].ete}`,
      `/${DEFAULT_LOCALE}/guide`,
      `/${DEFAULT_LOCALE}/sejour-longue-duree`,
    ],
    facts: [
      { label: "surface", value: `${PROPERTY.areaM2} m²` },
      { label: "capacité", value: `${PROPERTY.capacity.min} à ${PROPERTY.capacity.max} personnes` },
      { label: "altitude", value: `${new Intl.NumberFormat("fr-FR").format(PROPERTY.altitude)} m` },
      { label: "adresse", value: PROPERTY.address.full },
      { label: "résidence", value: PROPERTY.residence },
      { label: "distance au front de neige", value: `${DISTANCES.hiver[0].meters} m` },
      { label: "kit linge par personne", value: `${PROPERTY.linen.pricePerPerson} €` },
      { label: "orientation du balcon", value: PROPERTY.balcony.orientation },
      { label: "casier à skis", value: PROPERTY.access.skiLockerLocation },
    ],
  },

  // L'ancienne politique d'annulation, abandonnée le 2026-11-07.
  forbiddenPhrases: ["annulation modérée"],
  mustNeverAppear: [
    // Le Wi-Fi n'est jamais mentionné sur ce site, dans aucune langue.
    /\bwi-?fi\b/,
    /\bwlan\b/,
    AUTRE_ENTITE_SIREN,
  ],

  cancellation: CANCELLATION_POLICY,

  security: {
    loginPath: "/api/auth/login",
    loginBody: (motDePasse) => ({ motDePasse }),
    dashboardLoginPage: "/dashboard/login",
    // Ordre utile : `security.pathTricks` éprouve la première API protégée en GET.
    doors: [
      { path: "/api/dashboard/stats", anonymous: [401], viewer: [403] },
      { path: `/api/dashboard/calendrier?mois=${moisCourant}`, anonymous: [401], viewer: [200] },
      { path: "/api/dashboard/code-acces", anonymous: [401], viewer: [403] },
      // Le proxy refuse le viewer avant la route : rien n'est écrit.
      { path: "/api/dashboard/notes", method: "POST", anonymous: [401], viewer: [403] },
      { path: "/dashboard", anonymous: [307], viewer: [307] },
      { path: "/dashboard/statistiques", anonymous: [307], viewer: [307] },
      { path: "/dashboard/calendrier", anonymous: [307], viewer: [200] },
    ],
    cronRoutes,
    // Champs du DTO que la projection `viewer` de `/api/dashboard/calendrier` ne doit jamais
    // porter. `gross`, `net` et `commission` y sont présents mais **à zéro** : une clé ne suffit
    // pas à les juger, ils ne figurent donc pas ici.
    viewerForbiddenFields: [
      "touristTax",
      "bookedAt",
      "fraisMenage",
      "taxeSejourCollecteeParLeCanal",
      "surcollecteTaxe",
      "apiReference",
      "code",
    ],
  },

  extraChecks: [
    rotationCheck(HIVERS),
    legalNoticeCheck({
      path: "/mentions-legales",
      legalName: LEGAL_ENTITY.legalName,
      siren: LEGAL_ENTITY.siren,
      foreign: [AUTRE_ENTITE_SIREN],
    }),
    themeCheck(declaredPrimary(root("app/globals.css"))),
    keyBoxCodeCheck(keyPages),
  ],
} satisfies DeploySite;

export default site;
