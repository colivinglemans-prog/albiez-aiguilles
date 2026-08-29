import type { PeriodeSaison } from "@/lib/seasons";
import type { SpaceKey } from "../spaces";
import type { WinterDistanceKey, SummerDistanceKey } from "../property";
import type {
  ArrivalStepKey,
  PanelMarkerKey,
  EmergencyKey,
} from "../arrival";

/*
 * `Locale` et `LOCALES` vivent dans `./locales` — un module sans aucun import, le
 * middleware en ayant besoin. Ils sont ré-exportés ici parce que tout le site les
 * importe depuis `@/lib/i18n`.
 */
export type { Locale, LocaleMeta } from "./locales";
export { LOCALES, DEFAULT_LOCALE, LOCALE_META, isLocale } from "./locales";

/**
 * Le contenu d'une page de saison.
 *
 * Paramétré par les clés de distance de la saison : la page ski doit nommer les cinq
 * points du front de neige, la page été les trois siens, et il ne peut plus en manquer
 * un dans une langue sans casser la compilation.
 */
export interface SeasonContent<DistanceLabelKey extends string = string> {
  /** Titre H1 de la page de saison. */
  heading: string;
  /**
   * Accroche sous le H1. C'est une **fonction** et non une chaîne : elle porte les dates
   * d'ouverture du domaine et les mois de la saison estivale, qui vivent dans
   * `lib/seasons.ts`. Les recopier en toutes lettres dans les cinq dictionnaires obligeait
   * à six modifications pour un changement de date, sans rien pour signaler un oubli.
   */
  tagline: (p: PeriodeSaison) => string;
  intro: string;
  /** Arguments courts affichés en tuiles sous le hero. */
  highlights: Array<{ title: string; description: string }>;
  /**
   * Titre de la section des activités. Distinct de `heading`, qui est déjà le H1 de
   * la page : les répéter donnait deux fois la même phrase à un écran d'intervalle.
   */
  activitiesTitle: string;
  activities: Array<{
    title: string;
    description: string;
    /**
     * Lien facultatif : le prestataire chez qui l'activité se réserve, ou l'article
     * du guide qui la détaille. L'URL d'un prestataire vient de `PROPERTY.links` ;
     * celle d'un article est écrite en clair, préfixée par la langue comme dans le
     * corps des articles.
     */
    link?: { href: string; label: string; internal?: boolean };
  }>;
  /**
   * Renvoi au guide sous la liste d'activités. La liste tient en quatre ou cinq
   * encarts ; les 17 articles du guide vont plus loin, et rien ne le disait à
   * quelqu'un qui arrive au bas de la section. Le lien pointe vers `/{locale}/guide`,
   * construit par le composant : le dictionnaire ne porte que les mots.
   */
  activitiesMore: { text: string; label: string };
  /**
   * Libellés des chiffres du domaine, affichés en pastilles sur la première activité.
   * Les valeurs viennent de `RESORT` (property.ts) — le dictionnaire ne porte que les
   * mots. Présent l'hiver seulement : c'est aussi ce qui met cette première activité
   * en pleine largeur, le domaine skiable étant l'argument principal de la page ski.
   */
  resortFacts?: { pistes: string; lifts: string; snowGuns: string };
  /** Libellés des distances, indexés par la clé de DISTANCES. */
  distanceLabels: Record<DistanceLabelKey, string>;
  /**
   * Lien vers le site de la station, affiché dans l'encart de distance qui porte
   * un `brand`. Le logo est fourni par la station : son texte alternatif est écrit
   * ici plutôt que déduit du nom de fichier.
   */
  resortLink?: { alt: string; label: string };
  /**
   * Bandeau panoramique de la saison. Facultatif : une saison sans photo à la hauteur
   * n'affiche pas de bandeau plutôt que d'en afficher un médiocre.
   * Le texte alternatif est écrit ici et non déduit du nom de fichier — la photo est
   * chargée par nom (préfixe `_`), et le nom seul décrirait mal ce qu'on y voit.
   */
  banner?: { alt: string; caption: string };
  /**
   * Plan des pistes légendé, avec le repère de l'appartement. Hiver seulement :
   * c'est la preuve du « front de neige à 250 m », qui n'a pas d'équivalent l'été.
   */
  pisteMap?: { title: string; caption: string };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Dictionary {
  header: {
    home: string;
    winter: string;
    summer: string;
    apartment: string;
    location: string;
    blog: string;
    book: string;
    menu: string;
    switchLanguage: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    intro: string;
    chooseSeason: string;
    chooseSeasonSubtitle: string;
    seasonCard: Record<"hiver" | "ete", { title: string; description: string; cta: string }>;
    offSeasonTitle: string;
    offSeasonText: string;
    offSeasonExchange: string;
    offSeasonExchangeCta: string;
    offSeasonSponsorCta: string;
    /** Mention de transparence sur le lien de parrainage. */
    offSeasonSponsorNote: string;
    seo: { title: string; description: string; keywords: string[] };
  };
  /*
   * Les deux saisons ne portent pas les mêmes distances : l'hiver tout est au front
   * de neige, l'été les trois lieux sont distincts. D'où deux instanciations plutôt
   * qu'un `Record<Season, SeasonContent>`.
   */
  seasons: {
    hiver: SeasonContent<WinterDistanceKey>;
    ete: SeasonContent<SummerDistanceKey>;
  };
  property: {
    title: string;
    subtitle: string;
    sleepingTitle: string;
    bedrooms: string;
    alcove: string;
    living: string;
    bedDouble: (w: number, l: number) => string;
    bedBunk: (n: number, w: number, l: number) => string;
    bedTrundle: (n: number, w: number, l: number) => string;
    capacity: (min: number, max: number) => string;
    /** Surface loi Carrez, affichée dans le résumé du logement. */
    areaCarrez: (m2: number) => string;
    roomsSummary: string;
    bedsCount: (n: number) => string;
    bathroomsCount: (n: number) => string;
    bathroom: string;
    balcony: string;
    amenitiesTitle: string;
    amenityGroups: Array<{ title: string; items: string[] }>;
    showAll: string;
    showLess: string;
  };
  linen: {
    title: string;
    subtitle: (price: number) => string;
    withLinen: string;
    withoutLinen: string;
    /** Ce qui est fourni sans supplément, pour lever l'ambiguïté la plus fréquente. */
    providedTitle: string;
    providedIntro: string;
    /** Libellé accordé au nombre : « 4 couettes simples ». */
    itemLabel: (key: string, count?: number) => string;
    optionTitle: string;
    optionIntro: (price: number) => string;
    optionItems: string[];
    /** Précision qui évite une déception à l'arrivée. */
    notMadeNote: string;
    /** Alternative pour qui préfère apporter ses draps. */
    byoNote: string;
  };
  practical: {
    title: string;
    accessTitle: string;
    stepsWarning: string;
    parking: string;
    keyBox: string;
    skiLocker: string;
    onSiteContact: string;
    servicesTitle: string;
    cleaning: string;
    linen: (price: number) => string;
    bringYourOwnTitle: string;
    bringYourOwn: string[];
    rulesTitle: string;
    noPets: string;
    noSmoking: string;
    babyKitTitle: string;
    babyKit: string;
    babyKitItems: string[];
  };
  location: {
    title: string;
    subtitle: string;
    resortTitle: string;
    resortDescription: string;
    openMaps: string;
    altitudeLabel: string;
    resortStats: { slopes: string; lifts: string; altitude: string };
  };
  /**
   * Calendrier de réservation directe.
   *
   * Aucune clé ne porte de prix : la tarification bouge tous les jours sous Beyond Pricing,
   * et c'est la page de réservation Beds24 qui l'affiche. Le seul chiffre commercial ici est
   * la remise directe, qui est une politique, pas un tarif.
   */
  calendar: {
    loading: string;
    previousMonth: string;
    nextMonth: string;
    close: string;
    clear: string;
    bookNow: string;
    adults: string;
    children: string;
    selectCheckOut: string;
    directDiscount: string;
    nights: (n: number) => string;
    minStayNote: (n: number) => string;
    capacityNote: (max: number) => string;
    summary: (
      nights: number,
      checkIn: string,
      checkOut: string,
      adults: number,
      children: number,
    ) => string;
    monthNames: string[];
    dayNames: string[];
  };
  booking: {
    title: string;
    subtitle: string;
    bookOnAirbnb: string;
    contactUs: string;
  };
  awards: {
    title: string;
    subtitle: string;
    bookingLabel: string;
    /** Ex. « Note des voyageurs 2026 ». */
    yearLabel: (year: number) => string;
    outOf: (scale: number) => string;
    consecutive: string;
  };
  superhost: {
    title: string;
    description: string;
    profileLink: (reviewCount: number) => string;
  };
  guestFavourite: {
    title: string;
    description: string;
  };
  host: {
    title: string;
    badge: string;
    /** Suffixe du compteur d'années : « 3 ans d'accueil ». */
    experience: (years: number) => string;
    about: string;
    aboutText: string;
    languages: string;
    languagesValue: string;
    responseRate: string;
    responseRateValue: string;
    emailCta: string;
    airbnbCta: string;
    whatsappCta: string;
    /** Message pré-rempli à l'ouverture de WhatsApp. */
    whatsappMessage: string;
  };
  reviews: {
    title: string;
    subtitle: (count: number) => string;
    guestFavourite: string;
    guestFavouriteNote: string;
    outOf: string;
    categories: {
      cleanliness: string;
      accuracy: string;
      checkIn: string;
      communication: string;
      location: string;
      value: string;
    };
    showAll: (count: number) => string;
    showLess: string;
    seeOnAirbnb: string;
    empty: string;
    hostReply: string;
    /** Libellés du filtre par période. */
    filter: {
      label: string;
      all: string;
      hiver: string;
      ete: string;
      "hors-saison": string;
      offSeasonNote: string;
    };
  };
  gallery: {
    title: string;
    empty: string;
    showAll: (count: number) => string;
    previous: string;
    next: string;
    close: string;
    counter: (i: number, total: number) => string;
    /** Repère posé sur une image agrandissable (plan des pistes). */
    expand: string;
    /** Les deux paliers du plein écran : ajusté à l'écran, puis taille réelle. */
    zoomIn: string;
    zoomOut: string;
  };
  /**
   * Les espaces de la visite. `list` est exhaustive sur `SPACES` (lib/spaces.ts) :
   * ajouter un dossier d'espace sans son libellé casse la compilation, ce qui est
   * préférable à un titre manquant en production.
   */
  spaces: {
    subtitle: string;
    /** « 3 photos » sous la vignette d'un espace. */
    photoCount: (count: number) => string;
    list: Record<SpaceKey, { title: string; amenities: string[] }>;
  };
  blog: {
    heading: string;
    subheading: string;
    /** Libellé de la pastille de saison sur une carte d'article. */
    seasonBadge: Record<"hiver" | "ete", string>;
    /** Pastille des articles valables toute l'année. */
    yearRoundBadge: string;
    /**
     * Filtre de l'index. Libellés distincts de `seasonBadge` bien qu'identiques
     * aujourd'hui : la pastille qualifie un article, le filtre décrit un séjour.
     */
    filter: {
      label: string;
      all: string;
      hiver: string;
      ete: string;
      /** Explique pourquoi un sujet « toute l'année » apparaît sous les deux saisons. */
      note: string;
    };
    back: string;
    relatedTitle: string;
    /** Encart de fin d'article — c'est lui qui ramène le lecteur vers la réservation. */
    cta: { title: string; text: string; button: string };
    seo: { title: string; description: string; keywords: string[] };
  };
  footer: {
    navigation: string;
    contact: string;
    legal: string;
    copyright: string;
    tagline: string;
  };
  legal: {
    title: string;
    editorTitle: string;
    hostTitle: string;
    dataTitle: string;
    dataText: string;
    labels: {
      legalName: string;
      legalForm: string;
      siren: string;
      siret: string;
      capital: string;
      office: string;
      ape: string;
      contact: string;
    };
  };
  /**
   * Guide d'arrivée — page cachée, réservée aux voyageurs qui ont réservé.
   * Les clés de `steps` correspondent à `ARRIVAL_STEPS` (`lib/arrival.ts`).
   */
  guide: {
    title: string;
    intro: string;
    /** Rappel affiché en tête : les codes ne sont jamais publiés sur la page. */
    codeNote: string;
    mapsCta: string;
    stepLabel: (n: number) => string;
    steps: Record<ArrivalStepKey, { title: string; text: string }>;
    /** Précision chiffrée rattachée à l'étape de l'escalier. */
    stairsNote: (steps: number) => string;
    /** Précision rattachée à l'étape de la porte. */
    unitNote: (unit: string) => string;
    keyBoxSecurity: string;
    manualTitle: string;
    panelTitle: string;
    panelIntro: string;
    /** Repères du tableau électrique, indexés par la clé de PANEL_MARKERS. */
    panelMarkers: Record<PanelMarkerKey, string>;
    panelHotWaterNote: string;
    radiatorSwitchTitle: string;
    radiatorSwitchText: string;
    manualsTitle: string;
    manualsText: string;
    checkoutTitle: string;
    checkoutIntro: string;
    checkoutItems: string[];
    /** Le retour des clés a son propre encart : c'est ce qui bloque l'arrivée suivante. */
    checkoutKeysNote: string;
    contactTitle: string;
    contactIntro: string;
    whatsappCta: string;
    phoneCta: string;
    emailCta: string;
    emergencyTitle: string;
    /** Libellés des numéros d'urgence, indexés par la clé de EMERGENCY_NUMBERS. */
    emergencyLabels: Record<EmergencyKey, string>;
    closing: string;
    seo: { title: string; description: string };
  };
  common: {
    metersAway: (m: number) => string;
    backHome: string;
  };
}
