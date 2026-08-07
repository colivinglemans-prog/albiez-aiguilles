import type { Locale } from "@/lib/i18n";
import type { Season } from "@/lib/seasons";

/**
 * Métadonnées d'un article, dans une langue.
 *
 * `description` sert deux fois : balise meta et chapeau affiché sous le titre.
 * `excerpt` est plus court et n'existe que pour la vignette de l'index — un chapeau
 * fait pour Google est rarement le meilleur texte d'accroche sur une carte.
 */
export interface LocalizedPost {
  title: string;
  description: string;
  excerpt: string;
  keywords: string[];
}

export interface BlogPostMeta {
  slug: string;
  /** Date de publication ISO. Les articles d'un même lot partagent la même date. */
  date: string;
  /**
   * Photo de couverture, sous la forme `dossier/fichier.jpg` relative à
   * `public/images/`. Chargée par `getPhoto()` : ses dimensions réelles sont relevées
   * au build, ce qui évite d'imposer un cadrage aux photos.
   */
  image: string;
  /**
   * Saison à laquelle l'article se rattache — pilote la pastille et la couleur
   * d'accent de la carte. `null` pour un sujet valable toute l'année.
   */
  season: Season | null;
  locales: Record<Locale, LocalizedPost>;
}

/**
 * Les articles, du plus récent au plus ancien.
 *
 * L'ordre du tableau fait foi : à date égale, c'est lui qui décide de l'affichage.
 * Le contenu de chaque article vit dans `content/{fr,en}/<slug>.tsx` et le slug est
 * volontairement identique dans les deux langues — une URL par article, deux langues
 * qui se déclarent mutuellement en hreflang.
 */
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "randonnees-balisees-albiez",
    date: "2026-08-07",
    image: "activites-ete/03-randonnee.jpg",
    // Trois des six itinéraires (Contamines, la Plaigne, le Chalmieu) se font en
    // raquettes : l'article vaut pour les deux saisons.
    season: null,
    locales: {
      fr: {
        title: "Les 6 randonnées balisées au départ d'Albiez-Montrond",
        description:
          "Croix du Châtel, tour du lac du Mollard, plateau de Montrond, sentier de la Plaigne, tour de la Cochette, tour des Contamines : durées, dénivelés et itinéraires détaillés.",
        excerpt:
          "De 40 minutes à 3h30, six itinéraires balisés au départ du village ou du Mollard — avec le détail des bifurcations.",
        keywords: [
          "randonnée Albiez-Montrond",
          "sentiers balisés Albiez",
          "croix du Châtel",
          "plateau de Montrond randonnée",
          "raquettes Albiez",
        ],
      },
      en: {
        title: "Six waymarked walks starting from Albiez-Montrond",
        description:
          "Croix du Châtel, the Mollard lake loop, the Montrond plateau, the Plaigne trail, the Cochette loop and the Contamines loop: times, height gain and turn-by-turn routes.",
        excerpt:
          "From 40 minutes to 3½ hours, six waymarked routes leaving from the village or the Mollard — junction by junction.",
        keywords: [
          "hiking Albiez-Montrond",
          "waymarked trails Albiez",
          "Croix du Châtel walk",
          "Montrond plateau hike",
          "snowshoeing Albiez",
        ],
      },
    },
  },
  {
    slug: "domaine-skiable-albiez-secteur-mollard",
    date: "2026-08-07",
    image: "activites-hiver/_domaine-skiable-vue-aerienne.jpg",
    season: "hiver",
    locales: {
      fr: {
        title: "Skier à Albiez depuis le secteur Mollard : télésièges, téléskis et pistes",
        description:
          "40 km de pistes, 13 remontées, 22 pistes de 1 500 à 2 060 m. Comment attaquer le domaine d'Albiez depuis le Mollard : Échaux, Aplanes, Coucou et Polytre.",
        excerpt:
          "Le Mollard est le secteur le plus haut de la station. Voici par quelle remontée commencer sa journée selon son niveau.",
        keywords: [
          "domaine skiable Albiez",
          "secteur Mollard Albiez",
          "télésiège des Échaux",
          "pistes Albiez-Montrond",
          "station familiale Maurienne",
        ],
      },
      en: {
        title: "Skiing Albiez from the Mollard sector: chairlifts, drag lifts and pistes",
        description:
          "40 km of pistes, 13 lifts and 22 runs between 1,500 and 2,060 m. How to open your day on the Albiez ski area from the Mollard: Échaux, Aplanes, Coucou and Polytre.",
        excerpt:
          "The Mollard is the highest of the resort's sectors. Here is which lift to start with, depending on your level.",
        keywords: [
          "Albiez ski area",
          "Mollard sector Albiez",
          "Échaux chairlift",
          "Albiez-Montrond pistes",
          "family ski resort Maurienne",
        ],
      },
    },
  },
  {
    slug: "louer-ses-skis-a-albiez",
    date: "2026-08-07",
    // Devanture de Sport 2000 Aux Deux Frères, au front de neige du Mollard. Photo du
    // magasin, rapatriée depuis son site plutôt que servie à distance : les couvertures
    // sont mesurées au build par `getPhoto()`, ce qui suppose un fichier local.
    image: "blog/location-ski-sport-2000-aux-deux-freres.jpg",
    season: "hiver",
    locales: {
      fr: {
        title: "Louer ses skis à Albiez-Montrond : les quatre loueurs et comment payer moins cher",
        description:
          "Sport 2000 Aux Deux Frères, Skiset Ski Attitude, Skiset Albiez Sports, Skimium Mustang Sports : où louer ses skis à Albiez, au front de neige ou au Chef-lieu, et pourquoi réserver en ligne.",
        excerpt:
          "Trois loueurs à 250 m du logement, un quatrième au Chef-lieu, et une réduction systématique en réservant avant d'arriver. Notre choix : Sport 2000 Aux Deux Frères.",
        keywords: [
          "location ski Albiez",
          "Skiset Albiez",
          "Sport 2000 Albiez",
          "louer skis Albiez-Montrond",
          "matériel ski front de neige Albiez",
        ],
      },
      en: {
        title: "Ski hire in Albiez-Montrond: the four shops and how to pay less",
        description:
          "Sport 2000 Aux Deux Frères, Skiset Ski Attitude, Skiset Albiez Sports and Skimium Mustang Sports: where to hire skis in Albiez, by the slopes or in the village, and why to book online.",
        excerpt:
          "Three hire shops 250 m from the apartment, a fourth in the village, and a discount every time you book ahead. Our own choice: Sport 2000 Aux Deux Frères.",
        keywords: [
          "ski hire Albiez",
          "Skiset Albiez",
          "Sport 2000 Albiez",
          "rent skis Albiez-Montrond",
          "ski rental Albiez slopes",
        ],
      },
    },
  },
  {
    slug: "cours-de-ski-esf-albiez",
    date: "2026-08-07",
    image: "activites-hiver/02-ecole-de-ski-esf.jpg",
    season: "hiver",
    locales: {
      fr: {
        title: "Cours de ski à Albiez : l'ESF, le club Piou-Piou et le rendez-vous du Mollard",
        description:
          "Club Piou-Piou dès 3 ans et demi, cours enfants, ados et adultes, garderie, biathlon et DVA : le fonctionnement de l'École du Ski Français d'Albiez-Montrond.",
        excerpt:
          "Un piège à éviter : l'ESF a deux points de rassemblement. Depuis le Mollard, c'est celui du Mollard qu'il faut choisir à la réservation.",
        keywords: [
          "ESF Albiez",
          "cours de ski Albiez-Montrond",
          "club Piou-Piou Albiez",
          "école de ski Maurienne",
          "garderie ski Albiez",
        ],
      },
      en: {
        title: "Ski lessons in Albiez: the ESF, the Piou-Piou club and the Mollard meeting point",
        description:
          "Piou-Piou club from age 3½, children's, teens' and adults' lessons, childcare, biathlon and avalanche-transceiver taster sessions: how the Albiez-Montrond French ski school works.",
        excerpt:
          "One trap to avoid: the ski school has two meeting points. From the Mollard, book the Mollard one.",
        keywords: [
          "ESF Albiez",
          "ski lessons Albiez-Montrond",
          "Piou-Piou club Albiez",
          "ski school Maurienne",
          "ski childcare Albiez",
        ],
      },
    },
  },
  {
    slug: "faire-ses-courses-a-albiez",
    date: "2026-08-07",
    image: "blog/faire-ses-courses-a-albiez.jpg",
    season: null,
    locales: {
      fr: {
        title: "Faire ses courses à Albiez-Montrond : commerces du village et arrêt à Saint-Jean",
        description:
          "Sherpa au front de neige, épicerie Sambuis Dufreney et boulangerie au Chef-lieu, Carrefour Market et Lidl à Saint-Jean-de-Maurienne : où faire ses courses et dans quel ordre.",
        excerpt:
          "La bonne méthode : le gros des courses à Saint-Jean sur la route, les compléments et les produits savoyards au village.",
        keywords: [
          "courses Albiez-Montrond",
          "Sherpa Albiez",
          "épicerie Albiez",
          "supermarché Saint-Jean-de-Maurienne",
          "produits locaux Maurienne",
        ],
      },
      en: {
        title: "Food shopping in Albiez-Montrond: village shops and the stop in Saint-Jean",
        description:
          "The Sherpa by the slopes, the Sambuis Dufreney grocery and the bakery in the village, Carrefour Market and Lidl in Saint-Jean-de-Maurienne: where to shop, and in which order.",
        excerpt:
          "The sensible routine: the big shop in Saint-Jean on the way up, top-ups and Savoyard produce in the village.",
        keywords: [
          "food shopping Albiez-Montrond",
          "Sherpa Albiez",
          "Albiez grocery",
          "supermarket Saint-Jean-de-Maurienne",
          "local produce Maurienne",
        ],
      },
    },
  },
  {
    slug: "boulangerie-moulin-valentin-albiez",
    date: "2026-08-07",
    image: "blog/boulangerie-moulin-valentin-albiez.jpg",
    season: null,
    locales: {
      fr: {
        title: "Le Moulin Valentin, la boulangerie d'Albiez-Montrond",
        description:
          "Pains, viennoiseries, pâté croûte, pain yéti et tartelettes : la boulangerie du Chef-lieu d'Albiez-Montrond, dont l'histoire remonte à 1694. Adresse, téléphone et horaires.",
        excerpt:
          "Une boulangerie dont l'histoire commence en 1694 — et un « pain yéti » lardons-fromage qui règle la question du pique-nique.",
        keywords: [
          "boulangerie Albiez-Montrond",
          "Moulin Valentin Albiez",
          "pain Albiez",
          "pique-nique Maurienne",
          "pâté croûte Savoie",
        ],
      },
      en: {
        title: "Le Moulin Valentin, the bakery of Albiez-Montrond",
        description:
          "Bread, pastries, pâté en croûte, the 'pain yéti' and almond tarts: the bakery in the village of Albiez-Montrond, whose story goes back to 1694. Address, phone and opening hours.",
        excerpt:
          "A bakery whose story starts in 1694 — and a bacon-and-cheese 'pain yéti' that settles the picnic question.",
        keywords: [
          "bakery Albiez-Montrond",
          "Moulin Valentin Albiez",
          "bread Albiez",
          "picnic Maurienne",
          "Savoyard bakery",
        ],
      },
    },
  },
  {
    slug: "fromagerie-cooperative-beaufort-des-arves",
    date: "2026-08-07",
    image: "blog/fromagerie-cooperative-beaufort-des-arves.jpg",
    season: null,
    locales: {
      fr: {
        title: "Le Beaufort des Arves : la coopérative où faire ses provisions de fromage",
        description:
          "Beaufort AOP au lait cru d'alpages jusqu'à 2 500 m, affiné 6 à 12 mois, raclette de Savoie IGP, fondue râpée : la Fromagerie Coopérative de la vallée des Arves et sa boutique d'Albiez-Montrond.",
        excerpt:
          "Beaufort d'été ou d'hiver, ce n'est pas le même fromage. Une boutique à Albiez-Montrond, et une raclette qui vous attend à l'appartement.",
        keywords: [
          "Beaufort des Arves",
          "fromagerie coopérative Saint-Sorlin-d'Arves",
          "Beaufort AOP Maurienne",
          "fromage Albiez-Montrond",
          "raclette de Savoie IGP",
        ],
      },
      en: {
        title: "Beaufort des Arves: the cooperative dairy to stock up on cheese",
        description:
          "Beaufort AOP made from raw milk off pastures up to 2,500 m and matured 6 to 12 months, Raclette de Savoie IGP, ready-grated fondue: the Arves valley cooperative and its Albiez-Montrond shop.",
        excerpt:
          "Summer or winter Beaufort is not the same cheese. A shop in Albiez-Montrond, and a raclette grill waiting in the apartment.",
        keywords: [
          "Beaufort des Arves",
          "cooperative dairy Saint-Sorlin-d'Arves",
          "Beaufort AOP Maurienne",
          "cheese Albiez-Montrond",
          "Raclette de Savoie IGP",
        ],
      },
    },
  },
  {
    slug: "albiez-en-famille",
    date: "2026-08-07",
    image: "activites-ete/90-aire-de-jeux-mollard.jpg",
    season: null,
    locales: {
      fr: {
        title: "Albiez-Montrond en famille : garderies, luge, baignade et aires de jeux",
        description:
          "Club Piou-Piou, centre de loisirs Le Petit Montagnard, halte-garderie Le Chat Perché, piste de luge du Mollard, baignade surveillée : ce qui rend Albiez praticable avec des enfants.",
        excerpt:
          "Deux modes de garde, une piste de luge à côté de la résidence et un plan d'eau surveillé l'été : le détail de ce qui existe vraiment.",
        keywords: [
          "Albiez en famille",
          "garderie Albiez-Montrond",
          "Le Petit Montagnard Albiez",
          "luge Albiez",
          "station familiale Savoie",
        ],
      },
      en: {
        title: "Albiez-Montrond with children: childcare, sledging, swimming and playgrounds",
        description:
          "The Piou-Piou club, the Petit Montagnard holiday club, the Chat Perché day nursery, the Mollard sledging run and supervised swimming: what makes Albiez workable with children.",
        excerpt:
          "Two childcare options, a sledging run next to the residence and a supervised lake in summer — here is what actually exists.",
        keywords: [
          "Albiez with kids",
          "childcare Albiez-Montrond",
          "Petit Montagnard Albiez",
          "sledging Albiez",
          "family resort Savoie",
        ],
      },
    },
  },
  {
    slug: "aiguilles-arves",
    date: "2026-08-07",
    image: "activites-ete/98-albiez-ete-4.jpg",
    season: null,
    locales: {
      fr: {
        title: "Les Aiguilles d'Arves, la trilogie qu'on voit depuis le balcon",
        description:
          "3 514 mètres, une première ascension en 1878, une promenade accessible aux poussettes et une montée sportive à la Basse du Gerbier : tout sur l'emblème de la Maurienne.",
        excerpt:
          "« La plus belle trilogie des Alpes », disait Coolidge. Deux façons d'aller les voir de plus près, l'une très facile, l'autre non.",
        keywords: [
          "Aiguilles d'Arves",
          "randonnée Aiguilles d'Arves",
          "Basse du Gerbier",
          "Promenade Savoyarde de Découverte",
          "Maurienne panorama",
        ],
      },
      en: {
        title: "The Aiguilles d'Arves, the trio you see from the balcony",
        description:
          "3,514 metres, a first ascent in 1878, a pushchair-friendly promenade and a demanding climb to the Basse du Gerbier: everything about the emblem of the Maurienne valley.",
        excerpt:
          "\"The finest trio in the Alps\", said Coolidge. Two ways to get closer to them — one very easy, one not.",
        keywords: [
          "Aiguilles d'Arves",
          "Aiguilles d'Arves hike",
          "Basse du Gerbier",
          "Savoyard discovery walk",
          "Maurienne viewpoint",
        ],
      },
    },
  },
  {
    slug: "col-du-mollard-velo",
    date: "2026-08-07",
    image: "blog/col-du-mollard-velo.jpg",
    season: "ete",
    locales: {
      fr: {
        title: "Le col du Mollard à vélo : trois montées et le tour Arvan-Villards",
        description:
          "1 638 m d'altitude, passage du Tour de France en 2006 et 2011 : la montée chronométrée depuis Saint-Jean, la boucle panoramique, la variante par Albiez-le-Jeune et le tour des trois cols.",
        excerpt:
          "Un col du Tour de France dont le sommet est notre village. Trois façons de le monter, et une boucle qui enchaîne Glandon, Croix de Fer et Mollard.",
        keywords: [
          "col du Mollard vélo",
          "col du Mollard Tour de France",
          "cyclisme Maurienne",
          "tour Arvan-Villards",
          "Croix de Fer Glandon Mollard",
        ],
      },
      en: {
        title: "The Col du Mollard by bike: three climbs and the Arvan-Villards loop",
        description:
          "1,638 m high and used by the Tour de France in 2006 and 2011: the timed climb from Saint-Jean, the panoramic loop, the Albiez-le-Jeune variant and the three-col circuit.",
        excerpt:
          "A Tour de France col whose summit is our village. Three ways up, plus a loop linking the Glandon, the Croix de Fer and the Mollard.",
        keywords: [
          "Col du Mollard cycling",
          "Col du Mollard Tour de France",
          "cycling Maurienne",
          "Arvan-Villards loop",
          "Croix de Fer Glandon Mollard",
        ],
      },
    },
  },
  {
    slug: "chiens-de-traineau-albiez",
    date: "2026-08-07",
    image: "blog/chiens-de-traineau-albiez.jpg",
    season: "hiver",
    locales: {
      fr: {
        title: "Balade en chiens de traîneau à Albiez-Montrond",
        description:
          "Balades d'une demi-heure ou d'une heure au départ de la base de loisirs des Contamines, du 17/12 au 01/04. Tarifs, réservation et conseils pour ne pas rater le créneau.",
        excerpt:
          "45 € adulte, 40 € enfant, départ au Chef-lieu — et une réservation qui se prend bien avant d'arriver dans la station.",
        keywords: [
          "chiens de traîneau Albiez",
          "traîneau à chiens Maurienne",
          "activité hiver Albiez-Montrond",
          "musher Savoie",
          "base de loisirs des Contamines",
        ],
      },
      en: {
        title: "Husky sledding in Albiez-Montrond",
        description:
          "Half-hour and one-hour rides from the Contamines leisure area, from 17 December to 1 April. Prices, booking and how not to miss your slot.",
        excerpt:
          "€45 for adults, €40 for children, leaving from the village — and a booking you should make well before you arrive.",
        keywords: [
          "husky sledding Albiez",
          "dog sledding Maurienne",
          "winter activity Albiez-Montrond",
          "musher Savoie",
          "Contamines leisure area",
        ],
      },
    },
  },
  {
    slug: "albiez-c-show",
    date: "2026-08-07",
    image: "blog/albiez-c-show-descente-aux-flambeaux.jpg",
    season: "hiver",
    locales: {
      fr: {
        title: "L'Albiez C'Show, la soirée du mardi sur le front de neige du Mollard",
        description:
          "Descente aux flambeaux encadrée par l'ESF, démonstration de dameuses, show des moniteurs, feu d'artifice et vin chaud : le rendez-vous des vacances scolaires à Albiez-Montrond.",
        excerpt:
          "Ça se passe sur le front de neige du Mollard, à 250 m du logement — et les enfants dès le niveau flocon peuvent descendre aux flambeaux.",
        keywords: [
          "Albiez C'Show",
          "descente aux flambeaux Albiez",
          "animation station Albiez-Montrond",
          "feu d'artifice Albiez",
          "soirée ESF Maurienne",
        ],
      },
      en: {
        title: "The Albiez C'Show, Tuesday night on the Mollard snow front",
        description:
          "A torchlit descent run by the ski school, a piste-basher demonstration, an instructors' show, fireworks and mulled wine: the school-holiday highlight of Albiez-Montrond.",
        excerpt:
          "It happens on the Mollard snow front, 250 m from the apartment — and children from 'flocon' level up can join the torchlit descent.",
        keywords: [
          "Albiez C'Show",
          "torchlit descent Albiez",
          "Albiez-Montrond resort event",
          "fireworks Albiez",
          "ski school evening Maurienne",
        ],
      },
    },
  },
  {
    slug: "lac-du-mollard-baignade",
    date: "2026-08-07",
    image: "activites-ete/01-lac-baignade.jpg",
    season: "ete",
    locales: {
      fr: {
        title: "Le lac du Mollard : baignade surveillée, structure gonflable et base de loisirs",
        description:
          "À 350 m du logement, le plan d'eau du Mollard sert de réserve pour la neige de culture l'hiver et de base de baignade l'été, surveillée du 1er juillet au 31 août de 12 h à 18 h.",
        excerpt:
          "Pataugeoire, structure gonflable, pétanque, volley et tables de pique-nique — le tout à trois minutes à pied.",
        keywords: [
          "lac du Mollard Albiez",
          "baignade Albiez-Montrond",
          "plan d'eau Savoie",
          "base de loisirs Albiez",
          "lac Savard",
        ],
      },
      en: {
        title: "The Mollard lake: supervised swimming, inflatables and a leisure area",
        description:
          "350 m from the apartment, the Mollard lake stores water for snowmaking in winter and becomes a swimming spot in summer, supervised from 1 July to 31 August, noon to 6 pm.",
        excerpt:
          "Paddling pool, inflatable play structure, pétanque, volleyball and picnic tables — all three minutes' walk away.",
        keywords: [
          "Mollard lake Albiez",
          "swimming Albiez-Montrond",
          "mountain lake Savoie",
          "Albiez leisure area",
          "Lac Savard",
        ],
      },
    },
  },
  {
    slug: "foret-du-rival",
    date: "2026-08-07",
    image: "blog/foret-du-rival-automne.jpg",
    season: "ete",
    locales: {
      fr: {
        title: "La forêt du Rival, de 1 300 m au col du Mollard",
        description:
          "Conifères, cascades, torrents et faune de montagne : la forêt du Rival s'étend du Collet d'en Haut au col du Mollard, traversée de sentiers pédestres et de parcours VTT.",
        excerpt:
          "700 mètres de dénivelé de forêt, des champignons, des cascades, et des cerfs qu'on entend brâmer à l'automne.",
        keywords: [
          "forêt du Rival",
          "forêt Albiez-Montrond",
          "VTT forêt Maurienne",
          "faune Savoie",
          "balade forêt Albiez",
        ],
      },
      en: {
        title: "The Rival forest, from 1,300 m up to the Col du Mollard",
        description:
          "Conifers, waterfalls, mountain streams and wildlife: the Rival forest runs from the Collet d'en Haut up to the Col du Mollard, crossed by footpaths and mountain-bike trails.",
        excerpt:
          "700 metres of forest, mushrooms, waterfalls — and deer you can hear rutting in the autumn.",
        keywords: [
          "Rival forest Albiez",
          "forest Albiez-Montrond",
          "mountain biking Maurienne forest",
          "wildlife Savoie",
          "forest walk Albiez",
        ],
      },
    },
  },
  {
    slug: "refuge-chalet-la-croe",
    date: "2026-08-07",
    image: "blog/refuge-chalet-la-croe.jpg",
    season: "ete",
    locales: {
      fr: {
        title: "Le Chalet d'la Croë, refuge à 2 076 m au pied des Aiguilles d'Arves",
        description:
          "Refuge privé rénové en 2013, ouvert du 18 juin au 13 septembre 2026 : restauration, hébergement en dômes, produits locaux faits maison, au cœur des alpages d'Albiez-Montrond.",
        excerpt:
          "Crêpe ou raclette au milieu d'une rando, et des dômes pour dormir sous le ciel étoilé des alpages.",
        keywords: [
          "Chalet d'la Croë",
          "refuge Albiez-Montrond",
          "refuge Aiguilles d'Arves",
          "dormir en alpage Savoie",
          "randonnée refuge Maurienne",
        ],
      },
      en: {
        title: "Le Chalet d'la Croë, a refuge at 2,076 m below the Aiguilles d'Arves",
        description:
          "A private refuge renovated in 2013, open from 18 June to 13 September 2026: meals, dome accommodation and home-made local produce, in the high pastures of Albiez-Montrond.",
        excerpt:
          "A crêpe or a raclette mid-hike, and geodesic domes to sleep under the alpine night sky.",
        keywords: [
          "Chalet d'la Croë",
          "mountain refuge Albiez-Montrond",
          "Aiguilles d'Arves refuge",
          "sleeping in the alpine pastures",
          "hiking refuge Maurienne",
        ],
      },
    },
  },
  {
    slug: "equitation-le-kavalkada",
    date: "2026-08-07",
    image: "activites-ete/02-poney-cheval.jpg",
    season: "ete",
    locales: {
      fr: {
        title: "Le Kavalkada : balades à cheval et poney à 300 m du logement",
        description:
          "Centre équestre d'Albiez-Montrond : balades en forêt et en alpage, stages de poney à la semaine, cours en carrière avec moniteurs diplômés d'État. Horaires du 8 juillet au 31 août.",
        excerpt:
          "Du tour de poney d'une demi-heure autour du Châtel à la promenade d'une demi-journée dans les prairies de la Cochette.",
        keywords: [
          "Kavalkada Albiez",
          "centre équestre Albiez-Montrond",
          "balade à cheval Maurienne",
          "poney enfants Savoie",
          "équitation montagne",
        ],
      },
      en: {
        title: "Le Kavalkada: horse and pony rides 300 m from the apartment",
        description:
          "The riding centre of Albiez-Montrond: forest and high-pasture rides, week-long pony courses and arena lessons with state-qualified instructors. Opening hours 8 July to 31 August.",
        excerpt:
          "From a half-hour pony ride around the Châtel to a half-day trek across the Cochette meadows.",
        keywords: [
          "Kavalkada Albiez",
          "riding centre Albiez-Montrond",
          "horse riding Maurienne",
          "pony rides Savoie",
          "mountain horse riding",
        ],
      },
    },
  },
  {
    slug: "bmx-vtt-trottinette-albiez",
    date: "2026-08-07",
    image: "blog/bmx-race-albiez-montrond.jpg",
    season: "ete",
    locales: {
      fr: {
        title: "Le terrain de BMX le plus haut de France, et le VTT à Albiez",
        description:
          "Piste de BMX race au Chef-lieu d'Albiez-Montrond, location de VTT électriques, BMX et trottinettes électriques, sorties accompagnées : le vélo l'été à Albiez.",
        excerpt:
          "Une piste de BMX race en libre accès, entourée de terrains de foot, basket, tennis et d'une aire de pique-nique.",
        keywords: [
          "BMX Albiez-Montrond",
          "piste BMX la plus haute de France",
          "VTT électrique Albiez",
          "trottinette électrique Maurienne",
          "vélo Albiez été",
        ],
      },
      en: {
        title: "France's highest BMX track, and mountain biking in Albiez",
        description:
          "A BMX race track in the village of Albiez-Montrond, electric mountain bike, BMX and e-scooter hire, plus guided rides: cycling in Albiez in summer.",
        excerpt:
          "A freely accessible BMX race track, ringed by football, basketball and tennis courts and a picnic area.",
        keywords: [
          "BMX Albiez-Montrond",
          "highest BMX track in France",
          "electric mountain bike Albiez",
          "e-scooter Maurienne",
          "cycling Albiez summer",
        ],
      },
    },
  },
];

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getLocalizedPost(post: BlogPostMeta, locale: Locale): LocalizedPost {
  return post.locales[locale] ?? post.locales.fr;
}

/**
 * Découpe `dossier/sous-dossier/fichier.jpg` en arguments de `getPhoto()`.
 *
 * La coupe se fait au **dernier** séparateur : les photos du logement vivent dans des
 * sous-dossiers (`commun/salon/…`) alors que celles d'activité sont à plat.
 */
export function splitImagePath(image: string): { dir: string; file: string } {
  const cut = image.lastIndexOf("/");
  return { dir: image.slice(0, cut), file: image.slice(cut + 1) };
}

/**
 * Les autres articles de la même saison, pour le bloc « À lire aussi ».
 *
 * Les articles sans saison (commerces, famille) servent de repli : mieux vaut proposer
 * un sujet valable toute l'année qu'un bloc vide.
 */
export function relatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const sameSeason = others.filter((p) => p.season === post.season);
  const rest = others.filter((p) => p.season !== post.season);
  return [...sameSeason, ...rest].slice(0, limit);
}
