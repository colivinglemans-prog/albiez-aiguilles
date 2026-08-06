export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

export interface SeasonContent {
  /** Titre H1 de la page de saison. */
  heading: string;
  tagline: string;
  intro: string;
  /** Arguments courts affichés en tuiles sous le hero. */
  highlights: Array<{ title: string; description: string }>;
  activities: Array<{ title: string; description: string }>;
  /** Libellés des distances, indexés par la clé de DISTANCES. */
  distanceLabels: Record<string, string>;
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
    seo: { title: string; description: string; keywords: string[] };
  };
  seasons: Record<"hiver" | "ete", SeasonContent>;
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
  booking: {
    title: string;
    subtitle: string;
    comingSoon: string;
    comingSoonText: string;
    bookOnAirbnb: string;
    contactUs: string;
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
  };
  gallery: {
    title: string;
    empty: string;
    showAll: (count: number) => string;
    previous: string;
    next: string;
    close: string;
    counter: (i: number, total: number) => string;
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
  common: {
    metersAway: (m: number) => string;
    backHome: string;
  };
}
