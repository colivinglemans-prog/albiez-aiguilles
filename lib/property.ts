/**
 * Données factuelles du logement — source de vérité unique.
 *
 * Tout ce qui est un fait mesurable (distance, altitude, dimension de lit) vit ici,
 * pas dans les dictionnaires i18n : ces valeurs sont identiques dans toutes les langues
 * et doivent être corrigées à un seul endroit.
 */

/**
 * Nom du logement.
 *
 * « Appart **au** Chalet » et non « Appart - Chalet » (renommé le 2026-08-31) : c'est un
 * appartement **dans** un des chalets de la résidence, et le tiret laissait entendre une
 * apposition, comme si le logement était le chalet. La nuance compte — 33 m² annoncés
 * « chalet » promettent une maison entière, et l'écart se découvre à l'arrivée.
 *
 * Volontairement long : c'est sous ce nom que les voyageurs ont réservé, et le reconnaître
 * d'un coup d'œil compte plus qu'une marque courte. Les endroits contraints en largeur
 * (bandeau du header) l'affichent en plus petit plutôt que de le tronquer.
 *
 * ⚠️ Ce nom était aligné sur les titres d'annonces Booking et Airbnb. Le renommage les
 * désaligne : à répercuter sur les annonces, ou à assumer comme un écart voulu.
 */
export const SITE_NAME = "Albiez - Appart au Chalet du Hameau des Aiguilles";

/**
 * Domaine du site — source unique des canonical, hreflang, sitemap et Open Graph.
 * La forme `www.` est celle que le site déclare : l'apex doit rediriger vers elle.
 */
export const SITE_URL = "https://www.albiez-aiguilles.fr";

export const PROPERTY = {
  residence: "Le Hameau des Aiguilles",
  /** Numéro porté par la porte et par le casier à skis — le même sur le palier. */
  unit: "B 122",
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

  /**
   * Identifiants Beds24 du logement.
   *
   * Le `propertyId` est ici et non en variable d'environnement parce qu'il **n'est pas un
   * secret** : il figure en clair dans l'URL de la page de réservation, que n'importe quel
   * visiteur peut lire. Le mettre en env var obligerait à l'exposer côté client par un
   * `NEXT_PUBLIC_`, ce qui revient au même en moins lisible.
   *
   * `BEDS24_PROPERTY_ID` reste la source pour le **serveur** (dashboard, disponibilités) :
   * là, il sert à interroger l'API avec un token, et vit avec lui.
   */
  beds24: {
    propertyId: 346417,
    roomId: 715147,
  },

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
    /**
     * Le libellé de chaque `key` vit dans les dictionnaires, pas ici.
     * `count` et `size` sont facultatifs : tout n'est pas dénombré à l'unité.
     */
    inventory: [
      { key: "duvetDouble", size: "220 × 240", count: 1 },
      { key: "duvetSingle", size: "140 × 200", count: 4 },
      { key: "pillow", size: "45 × 60", count: 6 },
      { key: "extraBlankets" },
    ] as ReadonlyArray<{ key: string; size?: string; count?: number }>,
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
    /**
     * Le palier **de l'appartement**, au dernier étage : le casier est juste à côté de
     * la porte et porte le même numéro qu'elle. Il n'y a **aucun local en bas** — les
     * marches depuis le parking se montent avec les skis. Ne jamais en déduire qu'on
     * laisse le matériel au rez-de-chaussée : l'argument est la proximité de la porte,
     * pas un étage économisé.
     */
    skiLockerLocation: "palier",
    onSiteContact: true,
  },

  services: {
    /**
     * « Inclus » au sens qui compte pour le voyageur : **rien à payer en plus** de ce qu'il a
     * réglé. Le ménage apparaît en ligne séparée chez Booking et en direct, et il est fondu
     * dans le prix à la nuit chez Airbnb — mais dans les trois cas il est déjà payé.
     */
    cleaningIncluded: true,
    /**
     * Montant du ménage de fin de séjour en **direct et sur Airbnb**, en euros.
     *
     * ⚠️ **Booking est à 40 €**, et c'est voulu : le forfait Booking impose en revanche le
     * linge (20 € serviettes + 20 € draps), soit 80 € de frais fixes contre 60 € en direct
     * où le linge reste optionnel. Deux emballages pour deux publics — les séjours Booking
     * sont plus courts (3,1 nuits de moyenne contre 4,8 tous canaux) et le voyageur y est
     * moins susceptible d'apporter ses draps.
     *
     * Ne pas « harmoniser » les deux montants sans revoir cette logique : ce n'est pas une
     * incohérence, c'est une politique par canal.
     */
    cleaningFee: 60,
    /** Montant du ménage sur Booking, où le linge est en revanche obligatoire. */
    cleaningFeeBooking: 40,
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
    /**
     * Les Sybelles, le grand domaine relié voisin. L'accès depuis Albiez se fait par
     * Saint-Jean-d'Arves, à 20 min de voiture — c'est la sortie à la journée quand on
     * a fait le tour du domaine d'Albiez en milieu de semaine.
     */
    sybelles: "https://www.sybelles.ski/skier-aux-sybelles/",
    /**
     * École du ski français d'Albiez — cours collectifs et particuliers.
     * Deux points de départ dans la station : c'est **Le Mollard** qu'il faut choisir
     * à la réservation, celui du front de neige à 250 m de l'appartement.
     */
    esf: "https://www.esfalbiez.fr/",
    /**
     * Sport 2000 Aux Deux Frères, au front de neige du Mollard — le loueur chez qui
     * nous prenons notre propre matériel. Le lien pointe directement sur la page de
     * réservation en ligne du magasin : c'est elle qui porte la remise, pas la vitrine.
     */
    skiRental:
      "https://location-ski.sport2000.fr/magasins/282-sport-2000-aux-deux-freres",
    /**
     * Yves Vionnet, accompagnateur en montagne à Albiez. Le seul prestataire du guide
     * qui travaille **toute l'année**, hors saison comprise : c'est ce qui en fait la
     * réponse à « que faire à Albiez en avril ou en octobre ».
     */
    mountainGuide: "https://www.albiezrandopatrimoine.com/",
    /**
     * Le Sherpa du front de neige. On pointe la fiche magasin plutôt que l'accueil du
     * site : les horaires changent de saison en saison, et c'est cette page qui les
     * porte à jour — mieux vaut y renvoyer que les recopier ici.
     */
    sherpa: "https://www.sherpa.net/magasins/albiez-montrond",
    /** Fromagerie coopérative de la vallée des Arves — Beaufort AOP. */
    cheeseCoop: "https://www.beaufortdesarves.com/",
    /** Échange de maisons, proposé hors saison. */
    homeExchange: "https://www.homeexchange.fr/homes/view/2779081",
    /** Lien de parrainage — l'inscription via ce lien crédite les deux parties. */
    homeExchangeSponsor: "https://www.homeexchange.fr/?sponsorkey=alexandre-07e4b",
  },
} as const;

/** Le domaine skiable d'Albiez — chiffres affichés sur la page ski. */
export const RESORT = {
  name: "Albiez",
  valley: "Maurienne",
  altitudeMin: 1500,
  altitudeMax: 2060,
  slopesKm: 40,
  pistes: 22,
  lifts: 13,
  /** Enneigeurs, en complément de l'enneigement naturel. */
  snowGuns: 50,
} as const;

/**
 * Points d'intérêt auxquels une distance peut se rapporter, par saison.
 *
 * Écrits ici plutôt que déduits de `DISTANCES` : ces unions typent les libellés des
 * dictionnaires (`SeasonContent.distanceLabels`), et c'est ce qui rend impossible
 * d'oublier « front de neige » ou « club Piou-Piou » dans une des cinq langues.
 * Séparées par saison — demander à l'hiver de nommer le centre équestre serait du bruit.
 */
export type WinterDistanceKey =
  | "frontDeNeige"
  | "slopes"
  | "shops"
  | "esf"
  | "piouPiou";

export type SummerDistanceKey = "shops" | "riding" | "lake";

export type DistanceKey = WinterDistanceKey | SummerDistanceKey;

export interface DistanceEntry {
  key: DistanceKey;
  meters: number;
  /**
   * Points d'intérêt réunis au même endroit.
   * L'hiver, tout se trouve au front de neige : afficher quatre fois « 250 m »
   * donnerait l'impression de quatre lieux distincts alors qu'il n'y en a qu'un.
   */
  includes?: readonly DistanceKey[];
  /**
   * Station à laquelle cette distance renvoie — logo et site officiel.
   * Seuls le fichier et l'URL vivent ici ; le libellé du lien et le texte alternatif
   * viennent du dictionnaire, comme partout ailleurs.
   */
  brand?: { logo: string; href: string };
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
      brand: {
        logo: "/brand/albiez-station.png",
        href: PROPERTY.links.resort,
      },
    },
  ],
  ete: [
    { key: "shops", meters: 250 },
    { key: "riding", meters: 300 },
    { key: "lake", meters: 350 },
  ],
};

/**
 * Photos illustrant chaque couchage, dans `public/images/commun/`.
 *
 * Désignées par `espace/nom-de-fichier` plutôt que par position : ces photos doivent
 * correspondre exactement au couchage décrit, contrairement aux galeries où
 * l'ordre seul suffit.
 */
export const SLEEPING_PHOTOS = {
  // Le lit nu : c'est l'état dans lequel le logement est remis, les lits n'étant
  // pas faits à l'arrivée. Le lit préparé est montré dans la section kit linge.
  bedroom: ["chambre/02-chambre-lit-double-sans-linge.JPG"],
  alcove: ["coin-montagne/01-coin-montagne-lits-superposes.JPG"],
  living: ["salon/02-canape-lit-gigogne-deplie.JPG"],
} as const;

/**
 * Photo de couverture de chaque saison — hero de l'accueil et de la page de saison.
 *
 * Désignée par nom de fichier, et non « la première du dossier » : le hero et la tête
 * de galerie ne répondent pas aux mêmes critères. Le hero doit tenir en bandeau large,
 * la première vignette doit donner envie d'ouvrir la galerie. Les coupler obligeait à
 * sacrifier l'un pour changer l'autre.
 *
 * Si le fichier nommé disparaît, on retombe sur la première photo du dossier.
 */
export const HERO_PHOTOS: Record<"hiver" | "ete", string> = {
  hiver: "balcon/02-vue-panoramique-depuis-le-balcon.jpg",
  ete: "balcon/01-vue-panoramique-depuis-le-balcon.jpg",
};

/** Le même lit préparé puis nu — la comparaison est tout l'objet de la section. */
export const LINEN_PHOTOS = {
  with: "chambre/01-chambre-lit-double-160.jpg",
  without: "chambre/02-chambre-lit-double-sans-linge.JPG",
} as const;

/**
 * Le kit bébé monté, dans `public/images/commun/`.
 *
 * Désignée par nom de fichier, comme les couchages : la photo doit montrer le matériel
 * annoncé. Prêter du matériel de puériculture est un engagement — le voir dissipe le
 * doute sur son état bien mieux qu'une liste à puces.
 */
export const BABY_KIT_PHOTO =
  "chambre/03-kit-bebe-lit-parapluie-et-chaise-haute.jpg";

/**
 * Bandeau panoramique de la page de saison, dans `public/images/activites-<saison>/`.
 *
 * Préfixé par `_` : la photo ne montre pas une activité et n'a donc rien à faire dans
 * la liste appariée par position, mais `getPhoto()` la charge malgré tout. Une saison
 * absente de cet objet n'affiche simplement pas de bandeau.
 */
export const SEASON_BANNER_PHOTOS: Partial<Record<"hiver" | "ete", string>> = {
  hiver: "_albiez-vue-du-domaine-et-du-village.jpeg",
};

/**
 * Plan des pistes du secteur du Mollard, flèche à l'appui sur l'appartement.
 *
 * Affiché contre le bandeau des distances : « 250 m du front de neige » est l'argument
 * principal de la page ski, et une carte le prouve mieux qu'un chiffre répété.
 */
export const PISTE_MAP_PHOTO = "_plan-des-pistes-secteur-mollard.jpg";

/**
 * Distinctions reçues, la plus récente en premier.
 *
 * Le nom de l'annonce sur Booking diffère de celui du site : les certificats sont
 * délivrés à « Appart - Chalet du Hameau des Aiguilles ». Les visuels officiels sont
 * conservés dans `public/images/awards/` mais ne sont pas affichés tels quels
 * (voir le composant `Awards`).
 */
export const AWARDS = [
  {
    source: "Booking.com",
    year: 2026,
    score: 8.8,
    scale: 10,
    image: "/images/awards/booking-traveller-review-award-2026.png",
  },
  {
    source: "Booking.com",
    year: 2025,
    score: 9.1,
    scale: 10,
    image: "/images/awards/booking-traveller-review-award-2025.png",
  },
] as const;

/** Total de couchages, dérivé de `beds` pour éviter une constante qui dérive. */
export const TOTAL_BEDS = PROPERTY.beds.reduce((n, b) => n + b.count, 0);
