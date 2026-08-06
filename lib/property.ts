/**
 * Données factuelles du logement — source de vérité unique.
 *
 * Tout ce qui est un fait mesurable (distance, altitude, dimension de lit) vit ici,
 * pas dans les dictionnaires i18n : ces valeurs sont identiques dans toutes les langues
 * et doivent être corrigées à un seul endroit.
 */

/** Nom de marque provisoire — à remplacer quand le nom de domaine sera arrêté. */
export const SITE_NAME = "Albiez Aiguilles";

/** À remplacer par le domaine définitif (utilisé pour canonical, sitemap, OG). */
export const SITE_URL = "https://www.albiez-aiguilles.fr";

export const PROPERTY = {
  residence: "Le Hameau des Aiguilles",
  floor: 2,
  topFloor: true,
  /** Altitude du logement, en mètres. */
  altitude: 1600,

  address: {
    street: "Chemin du Châtel",
    postalCode: "73530",
    city: "Albiez-Montrond",
    department: "Savoie",
    region: "Auvergne-Rhône-Alpes",
    country: "France",
    full: "Chemin du Châtel, 73530 Albiez-Montrond, France",
  },

  /** Surface loi Carrez, en m². */
  areaM2: 33,

  capacity: {
    min: 4,
    max: 6,
    bedrooms: 1,
    /** Le « coin montagne » n'est pas une chambre fermée : compté à part. */
    alcoves: 1,
    bathrooms: 1,
    separateToilet: true,
  },

  /** Détail des couchages, dimensions en cm. */
  beds: [
    { room: "bedroom", type: "double", width: 160, length: 190, count: 1, note: "queen" },
    { room: "alcove", type: "bunk", width: 80, length: 190, count: 2 },
    { room: "living", type: "trundle-sofa", width: 80, length: 190, count: 2 },
  ] as const,

  /** Inventaire du linge disponible sur place (le linge de lit reste en option payante). */
  linen: {
    included: false,
    pricePerPerson: 15,
    inventory: [
      { item: "couette double", size: "220x240", count: 1 },
      { item: "couette simple", size: "140x200", count: 4 },
      { item: "oreiller", size: "45x60", count: 6 },
    ],
  },

  balcony: {
    orientation: "sud-ouest",
    view: "Aiguilles d'Arves",
  },

  access: {
    /** Marches entre le parking et l'appartement. */
    steps: 50,
    parkingDistanceM: 50,
    parkingType: "extérieur",
    keyBox: true,
    skiLocker: true,
    skiLockerLocation: "palier",
    onSiteContact: true,
  },

  services: {
    cleaningIncluded: true,
    /** Montant refacturé du ménage de fin de séjour, en euros. */
    cleaningFee: 60,
    /** La cuisine et la vaisselle restent à la charge du voyageur. */
    cleaningExcludes: ["cuisine", "vaisselle"],
    /** À apporter par le voyageur — évite les mauvaises surprises à l'arrivée. */
    bringYourOwn: [
      "tablettes lave-vaisselle",
      "sacs poubelle 50 L",
      "papier toilette",
      "dosettes Nespresso",
    ],
  },

  rules: {
    pets: false,
    smoking: false,
    minAge: null,
    babyKitOnRequest: true,
  },

  /** Équipement bébé, mis à disposition sur demande préalable. */
  babyKit: ["lit parapluie avec matelas", "chaise haute", "luge adaptée"],

  contact: {
    email: "alexandre.delan@gmail.com",
    phone: "+33620921005",
    whatsapp: "https://wa.me/33620921005",
  },

  /**
   * Nombre d'avis cumulés sur le profil hôte, toutes annonces confondues.
   * Relevé le 2026-08-06. Le chiffre ne fait que croître : s'il n'est pas
   * réactualisé il sous-estime, ce qui est le bon sens de l'erreur.
   */
  hostReviewCount: 125,

  links: {
    googleMaps: "https://maps.app.goo.gl/mQnt1JRWTJ92JePW9",
    airbnb: "https://www.airbnb.fr/rooms/12328987",
    /** Profil hôte, commun à toutes les annonces. */
    airbnbProfile: "https://www.airbnb.fr/users/profile/1465428634658451220",
    resort: "https://www.station-albiez.com/fr/",
  },
} as const;

/** Le domaine skiable d'Albiez — chiffres affichés sur la page ski. */
export const RESORT = {
  name: "Albiez",
  valley: "Maurienne",
  altitudeMin: 1500,
  altitudeMax: 2060,
  slopesKm: 40,
  lifts: 13,
} as const;

export interface DistanceEntry {
  key: string;
  meters: number;
  /**
   * Points d'intérêt réunis au même endroit.
   * L'hiver, tout se trouve au front de neige : afficher quatre fois « 250 m »
   * donnerait l'impression de quatre lieux distincts alors qu'il n'y en a qu'un.
   */
  includes?: readonly string[];
}

/**
 * Distances depuis le logement, en mètres.
 * Séparées par saison : ce sont les arguments de vente de chaque page.
 */
export const DISTANCES: Record<"hiver" | "ete", readonly DistanceEntry[]> = {
  hiver: [
    {
      key: "frontDeNeige",
      meters: 250,
      includes: ["slopes", "shops", "esf", "piouPiou"],
    },
  ],
  ete: [
    { key: "shops", meters: 250 },
    { key: "riding", meters: 300 },
    { key: "lake", meters: 350 },
  ],
};

/** Total de couchages, dérivé de `beds` pour éviter une constante qui dérive. */
export const TOTAL_BEDS = PROPERTY.beds.reduce((n, b) => n + b.count, 0);
