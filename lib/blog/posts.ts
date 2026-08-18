import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
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
 * Le contenu de chaque article vit dans `content/{fr,en,de,es,it}/<slug>.tsx` et le
 * slug est volontairement identique dans toutes les langues — une URL par article et
 * par langue, qui se déclarent mutuellement en hreflang.
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
      de: {
        title: "Die sechs markierten Wanderungen ab Albiez-Montrond",
        description:
          "Croix du Châtel, Rundweg um den Lac du Mollard, Plateau von Montrond, Weg von La Plaigne, Rundweg der Cochette, Rundweg der Contamines: Gehzeiten, Höhenmeter und Wegbeschreibungen.",
        excerpt:
          "Von 40 Minuten bis 3½ Stunden: sechs markierte Routen ab dem Dorf oder ab Le Mollard – Abzweigung für Abzweigung.",
        keywords: [
          "Wandern Albiez-Montrond",
          "markierte Wanderwege Albiez",
          "Croix du Châtel Wanderung",
          "Plateau Montrond Wanderung",
          "Schneeschuhwandern Albiez",
        ],
      },
      es: {
        title: "Las seis rutas señalizadas que salen de Albiez-Montrond",
        description:
          "Croix du Châtel, vuelta al lac du Mollard, meseta de Montrond, sendero de La Plaigne, vuelta de la Cochette, vuelta de las Contamines: duraciones, desniveles e itinerarios detallados.",
        excerpt:
          "De 40 minutos a 3 h 30, seis itinerarios señalizados desde el pueblo o desde Le Mollard, con el detalle de cada bifurcación.",
        keywords: [
          "senderismo Albiez-Montrond",
          "senderos señalizados Albiez",
          "croix du Châtel ruta",
          "meseta de Montrond senderismo",
          "raquetas de nieve Albiez",
        ],
      },
      it: {
        title: "Le sei escursioni segnalate con partenza da Albiez-Montrond",
        description:
          "Croix du Châtel, giro del lac du Mollard, altopiano di Montrond, sentiero di La Plaigne, giro della Cochette, giro delle Contamines: durate, dislivelli e itinerari dettagliati.",
        excerpt:
          "Da 40 minuti a 3 ore e mezza, sei itinerari segnalati con partenza dal paese o da Le Mollard, con il dettaglio di ogni bivio.",
        keywords: [
          "escursioni Albiez-Montrond",
          "sentieri segnalati Albiez",
          "croix du Châtel escursione",
          "altopiano di Montrond escursione",
          "ciaspole Albiez",
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
      de: {
        title:
          "Skifahren in Albiez ab dem Sektor Le Mollard: Sessellifte, Schlepplifte und Pisten",
        description:
          "40 km Pisten, 13 Bergbahnen, 22 Abfahrten von 1.500 bis 2.060 m. Wie Sie das Skigebiet von Albiez ab Le Mollard angehen: Échaux, Aplanes, Coucou und Polytre.",
        excerpt:
          "Le Mollard ist der höchste Sektor des Skigebiets. Hier steht, mit welcher Bahn Sie Ihren Tag beginnen – je nach Niveau.",
        keywords: [
          "Skigebiet Albiez",
          "Sektor Mollard Albiez",
          "Sessellift Les Échaux",
          "Pisten Albiez-Montrond",
          "familiäres Skigebiet Maurienne",
        ],
      },
      es: {
        title:
          "Esquiar en Albiez desde el sector Le Mollard: telesillas, telesquís y pistas",
        description:
          "40 km de pistas, 13 remontes y 22 pistas de 1500 a 2060 m. Cómo atacar el dominio de Albiez desde Le Mollard: Échaux, Aplanes, Coucou y Polytre.",
        excerpt:
          "Le Mollard es el sector más alto de la estación. Aquí está por qué remonte empezar la jornada según su nivel.",
        keywords: [
          "dominio esquiable Albiez",
          "sector Mollard Albiez",
          "telesilla Les Échaux",
          "pistas Albiez-Montrond",
          "estación familiar Maurienne",
        ],
      },
      it: {
        title:
          "Sciare ad Albiez dal settore Le Mollard: seggiovie, skilift e piste",
        description:
          "40 km di piste, 13 impianti, 22 piste da 1500 a 2060 m. Come affrontare il comprensorio di Albiez da Le Mollard: Échaux, Aplanes, Coucou e Polytre.",
        excerpt:
          "Le Mollard è il settore più alto della località. Ecco da quale impianto iniziare la giornata in base al proprio livello.",
        keywords: [
          "comprensorio sciistico Albiez",
          "settore Mollard Albiez",
          "seggiovia Les Échaux",
          "piste Albiez-Montrond",
          "località per famiglie Maurienne",
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
      de: {
        title:
          "Skiverleih in Albiez-Montrond: die vier Geschäfte und wie Sie weniger zahlen",
        description:
          "Sport 2000 Aux Deux Frères, Skiset Ski Attitude, Skiset Albiez Sports, Skimium Mustang Sports: wo Sie in Albiez Ski leihen, am Pistenzugang oder im Dorf, und warum Sie online buchen sollten.",
        excerpt:
          "Drei Verleihe 250 m von der Wohnung, ein vierter im Dorf, und jedes Mal ein Rabatt, wenn Sie vorab buchen. Unsere Wahl: Sport 2000 Aux Deux Frères.",
        keywords: [
          "Skiverleih Albiez",
          "Skiset Albiez",
          "Sport 2000 Albiez",
          "Ski leihen Albiez-Montrond",
          "Skiausrüstung Pistenzugang Albiez",
        ],
      },
      es: {
        title:
          "Alquilar los esquís en Albiez-Montrond: las cuatro tiendas y cómo pagar menos",
        description:
          "Sport 2000 Aux Deux Frères, Skiset Ski Attitude, Skiset Albiez Sports, Skimium Mustang Sports: dónde alquilar los esquís en Albiez, junto a las pistas o en el pueblo, y por qué reservar en línea.",
        excerpt:
          "Tres tiendas a 250 m del alojamiento, una cuarta en el pueblo, y un descuento sistemático si reserva antes de llegar. Nuestra elección: Sport 2000 Aux Deux Frères.",
        keywords: [
          "alquiler esquís Albiez",
          "Skiset Albiez",
          "Sport 2000 Albiez",
          "alquilar esquís Albiez-Montrond",
          "material esquí pistas Albiez",
        ],
      },
      it: {
        title:
          "Noleggiare gli sci ad Albiez-Montrond: i quattro negozi e come pagare meno",
        description:
          "Sport 2000 Aux Deux Frères, Skiset Ski Attitude, Skiset Albiez Sports, Skimium Mustang Sports: dove noleggiare gli sci ad Albiez, all'accesso alle piste o in paese, e perché prenotare online.",
        excerpt:
          "Tre noleggi a 250 m dall'alloggio, un quarto in paese e uno sconto sistematico prenotando prima di arrivare. La nostra scelta: Sport 2000 Aux Deux Frères.",
        keywords: [
          "noleggio sci Albiez",
          "Skiset Albiez",
          "Sport 2000 Albiez",
          "noleggiare sci Albiez-Montrond",
          "attrezzatura sci piste Albiez",
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
      de: {
        title:
          "Skikurse in Albiez: die ESF, der Club Piou-Piou und der Treffpunkt Le Mollard",
        description:
          "Club Piou-Piou ab 3½ Jahren, Kurse für Kinder, Jugendliche und Erwachsene, Kinderbetreuung, Biathlon und LVS-Schnupperkurse: wie die französische Skischule von Albiez-Montrond funktioniert.",
        excerpt:
          "Eine Falle, die es zu vermeiden gilt: die Skischule hat zwei Treffpunkte. Von Le Mollard aus buchen Sie den von Le Mollard.",
        keywords: [
          "ESF Albiez",
          "Skikurs Albiez-Montrond",
          "Club Piou-Piou Albiez",
          "Skischule Maurienne",
          "Kinderbetreuung Ski Albiez",
        ],
      },
      es: {
        title:
          "Clases de esquí en Albiez: la ESF, el club Piou-Piou y el punto de encuentro del Mollard",
        description:
          "Club Piou-Piou desde los 3 años y medio, clases para niños, adolescentes y adultos, guardería, biatlón e iniciación al ARVA: cómo funciona la Escuela de Esquí Francesa de Albiez-Montrond.",
        excerpt:
          "Una trampa que evitar: la escuela tiene dos puntos de encuentro. Desde Le Mollard hay que elegir el del Mollard al reservar.",
        keywords: [
          "ESF Albiez",
          "clases de esquí Albiez-Montrond",
          "club Piou-Piou Albiez",
          "escuela de esquí Maurienne",
          "guardería esquí Albiez",
        ],
      },
      it: {
        title:
          "Corsi di sci ad Albiez: la ESF, il club Piou-Piou e il punto di ritrovo del Mollard",
        description:
          "Club Piou-Piou dai 3 anni e mezzo, corsi per bambini, ragazzi e adulti, servizio di custodia, biathlon e prova dell'ARTVA: come funziona la Scuola di Sci Francese di Albiez-Montrond.",
        excerpt:
          "Una trappola da evitare: la scuola ha due punti di ritrovo. Da Le Mollard bisogna scegliere quello del Mollard al momento della prenotazione.",
        keywords: [
          "ESF Albiez",
          "corsi di sci Albiez-Montrond",
          "club Piou-Piou Albiez",
          "scuola di sci Maurienne",
          "custodia bambini sci Albiez",
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
      de: {
        title:
          "Einkaufen in Albiez-Montrond: die Geschäfte im Dorf und der Halt in Saint-Jean",
        description:
          "Der Sherpa am Pistenzugang, der Lebensmittelladen Sambuis Dufreney und die Bäckerei im Dorf, Carrefour Market und Lidl in Saint-Jean-de-Maurienne: wo Sie einkaufen und in welcher Reihenfolge.",
        excerpt:
          "Die sinnvolle Reihenfolge: der Großeinkauf in Saint-Jean auf dem Weg hinauf, Ergänzungen und savoyische Erzeugnisse im Dorf.",
        keywords: [
          "einkaufen Albiez-Montrond",
          "Sherpa Albiez",
          "Lebensmittelladen Albiez",
          "Supermarkt Saint-Jean-de-Maurienne",
          "regionale Produkte Maurienne",
        ],
      },
      es: {
        title:
          "Hacer la compra en Albiez-Montrond: comercios del pueblo y parada en Saint-Jean",
        description:
          "El Sherpa junto a las pistas, la tienda Sambuis Dufreney y la panadería del pueblo, Carrefour Market y Lidl en Saint-Jean-de-Maurienne: dónde hacer la compra y en qué orden.",
        excerpt:
          "El método razonable: la compra grande en Saint-Jean de camino, los complementos y los productos saboyanos en el pueblo.",
        keywords: [
          "compra Albiez-Montrond",
          "Sherpa Albiez",
          "tienda de alimentación Albiez",
          "supermercado Saint-Jean-de-Maurienne",
          "productos locales Maurienne",
        ],
      },
      it: {
        title:
          "Fare la spesa ad Albiez-Montrond: i negozi del paese e la sosta a Saint-Jean",
        description:
          "Lo Sherpa all'accesso alle piste, l'alimentari Sambuis Dufreney e il panificio in paese, Carrefour Market e Lidl a Saint-Jean-de-Maurienne: dove fare la spesa e in quale ordine.",
        excerpt:
          "Il metodo giusto: la spesa grossa a Saint-Jean lungo la strada, le integrazioni e i prodotti savoiardi in paese.",
        keywords: [
          "spesa Albiez-Montrond",
          "Sherpa Albiez",
          "alimentari Albiez",
          "supermercato Saint-Jean-de-Maurienne",
          "prodotti locali Maurienne",
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
      de: {
        title: "Le Moulin Valentin, die Bäckerei von Albiez-Montrond",
        description:
          "Brot, Gebäck, Pastete im Teigmantel, das „pain yéti“ und Mandeltörtchen: die Bäckerei im Dorfkern von Albiez-Montrond, deren Geschichte bis 1694 zurückreicht. Adresse, Telefon und Öffnungszeiten.",
        excerpt:
          "Eine Bäckerei, deren Geschichte 1694 beginnt – und ein „pain yéti“ mit Speck und Käse, das die Picknickfrage erledigt.",
        keywords: [
          "Bäckerei Albiez-Montrond",
          "Moulin Valentin Albiez",
          "Brot Albiez",
          "Picknick Maurienne",
          "savoyische Bäckerei",
        ],
      },
      es: {
        title: "Le Moulin Valentin, la panadería de Albiez-Montrond",
        description:
          "Panes, bollería, pâté en croûte, el «pain yéti» y tartaletas de almendra: la panadería del centro de Albiez-Montrond, cuya historia se remonta a 1694. Dirección, teléfono y horarios.",
        excerpt:
          "Una panadería cuya historia empieza en 1694, y un «pain yéti» de panceta y queso que resuelve la cuestión del picnic.",
        keywords: [
          "panadería Albiez-Montrond",
          "Moulin Valentin Albiez",
          "pan Albiez",
          "picnic Maurienne",
          "panadería saboyana",
        ],
      },
      it: {
        title: "Le Moulin Valentin, il panificio di Albiez-Montrond",
        description:
          "Pane, viennoiserie, pâté en croûte, il «pain yéti» e crostatine alle mandorle: il panificio del centro di Albiez-Montrond, la cui storia risale al 1694. Indirizzo, telefono e orari.",
        excerpt:
          "Un panificio la cui storia inizia nel 1694, e un «pain yéti» con pancetta e formaggio che risolve la questione del picnic.",
        keywords: [
          "panificio Albiez-Montrond",
          "Moulin Valentin Albiez",
          "pane Albiez",
          "picnic Maurienne",
          "panificio savoiardo",
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
      de: {
        title: "Beaufort des Arves: die Sennereigenossenschaft für den Käsevorrat",
        description:
          "Beaufort AOP aus Rohmilch von Almen bis 2.500 m, 6 bis 12 Monate gereift, Raclette de Savoie IGP, fertig geriebenes Fondue: die Genossenschaftssennerei des Arves-Tals und ihr Laden in Albiez-Montrond.",
        excerpt:
          "Sommer- und Winter-Beaufort sind nicht derselbe Käse. Ein Laden in Albiez-Montrond – und ein Raclette-Gerät, das in der Wohnung wartet.",
        keywords: [
          "Beaufort des Arves",
          "Sennerei Saint-Sorlin-d'Arves",
          "Beaufort AOP Maurienne",
          "Käse Albiez-Montrond",
          "Raclette de Savoie IGP",
        ],
      },
      es: {
        title: "El Beaufort des Arves: la cooperativa donde abastecerse de queso",
        description:
          "Beaufort AOP de leche cruda de pastos hasta 2500 m, curado de 6 a 12 meses, raclette de Savoie IGP, fondue ya rallada: la quesería cooperativa del valle de los Arves y su tienda de Albiez-Montrond.",
        excerpt:
          "El Beaufort de verano y el de invierno no son el mismo queso. Una tienda en Albiez-Montrond, y una raclette esperando en el apartamento.",
        keywords: [
          "Beaufort des Arves",
          "quesería cooperativa Saint-Sorlin-d'Arves",
          "Beaufort AOP Maurienne",
          "queso Albiez-Montrond",
          "raclette de Savoie IGP",
        ],
      },
      it: {
        title: "Il Beaufort des Arves: la cooperativa dove fare provvista di formaggio",
        description:
          "Beaufort AOP di latte crudo di alpeggi fino a 2500 m, stagionato da 6 a 12 mesi, raclette de Savoie IGP, fonduta già grattugiata: il caseificio cooperativo della valle degli Arves e il suo negozio ad Albiez-Montrond.",
        excerpt:
          "Il Beaufort d'estate e quello d'inverno non sono lo stesso formaggio. Un negozio ad Albiez-Montrond, e una raclette che vi attende in appartamento.",
        keywords: [
          "Beaufort des Arves",
          "caseificio cooperativo Saint-Sorlin-d'Arves",
          "Beaufort AOP Maurienne",
          "formaggio Albiez-Montrond",
          "raclette de Savoie IGP",
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
      de: {
        title:
          "Albiez-Montrond mit Kindern: Betreuung, Rodeln, Baden und Spielplätze",
        description:
          "Club Piou-Piou, Ferienclub Le Petit Montagnard, Kinderkrippe Le Chat Perché, Rodelbahn am Mollard, bewachter Badebetrieb: was Albiez mit Kindern praktikabel macht.",
        excerpt:
          "Zwei Betreuungsmöglichkeiten, eine Rodelbahn neben der Residenz und im Sommer ein bewachter See – hier steht, was es wirklich gibt.",
        keywords: [
          "Albiez mit Kindern",
          "Kinderbetreuung Albiez-Montrond",
          "Le Petit Montagnard Albiez",
          "Rodeln Albiez",
          "familienfreundliches Skigebiet Savoyen",
        ],
      },
      es: {
        title:
          "Albiez-Montrond en familia: guarderías, trineo, baño y zonas de juego",
        description:
          "Club Piou-Piou, centro de ocio Le Petit Montagnard, guardería Le Chat Perché, pista de trineos del Mollard, baño vigilado: lo que hace Albiez practicable con niños.",
        excerpt:
          "Dos opciones de cuidado, una pista de trineos junto a la residencia y un lago vigilado en verano: el detalle de lo que existe de verdad.",
        keywords: [
          "Albiez en familia",
          "guardería Albiez-Montrond",
          "Le Petit Montagnard Albiez",
          "trineo Albiez",
          "estación familiar Saboya",
        ],
      },
      it: {
        title:
          "Albiez-Montrond in famiglia: servizi di custodia, slittino, bagno e aree gioco",
        description:
          "Club Piou-Piou, centro ricreativo Le Petit Montagnard, asilo nido Le Chat Perché, pista da slittino del Mollard, balneazione sorvegliata: ciò che rende Albiez praticabile con i bambini.",
        excerpt:
          "Due modalità di custodia, una pista da slittino accanto alla residenza e uno specchio d'acqua sorvegliato d'estate: il dettaglio di ciò che esiste davvero.",
        keywords: [
          "Albiez in famiglia",
          "custodia bambini Albiez-Montrond",
          "Le Petit Montagnard Albiez",
          "slittino Albiez",
          "località per famiglie Savoia",
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
      de: {
        title: "Die Aiguilles d'Arves, das Dreigestirn vom Balkon aus",
        description:
          "3.514 Meter, Erstbesteigung 1878, ein kinderwagentauglicher Spazierweg und ein sportlicher Aufstieg zur Basse du Gerbier: alles über das Wahrzeichen der Maurienne.",
        excerpt:
          "„Das schönste Dreigestirn der Alpen“, sagte Coolidge. Zwei Wege, um näher heranzukommen – einer sehr leicht, einer nicht.",
        keywords: [
          "Aiguilles d'Arves",
          "Wanderung Aiguilles d'Arves",
          "Basse du Gerbier",
          "savoyischer Entdeckungsweg",
          "Aussichtspunkt Maurienne",
        ],
      },
      es: {
        title: "Las Aiguilles d'Arves, la trilogía que se ve desde el balcón",
        description:
          "3514 metros, una primera ascensión en 1878, un paseo accesible con carrito y una subida deportiva a la Basse du Gerbier: todo sobre el emblema de la Maurienne.",
        excerpt:
          "«La trilogía más bella de los Alpes», decía Coolidge. Dos formas de acercarse a ellas, una muy fácil y otra no.",
        keywords: [
          "Aiguilles d'Arves",
          "ruta Aiguilles d'Arves",
          "Basse du Gerbier",
          "paseo saboyano de descubrimiento",
          "mirador Maurienne",
        ],
      },
      it: {
        title: "Le Aiguilles d'Arves, la trilogia che si vede dal balcone",
        description:
          "3514 metri, una prima ascensione nel 1878, una passeggiata accessibile ai passeggini e una salita sportiva alla Basse du Gerbier: tutto sull'emblema della Maurienne.",
        excerpt:
          "«La più bella trilogia delle Alpi», diceva Coolidge. Due modi per vederle da vicino, uno molto facile e uno no.",
        keywords: [
          "Aiguilles d'Arves",
          "escursione Aiguilles d'Arves",
          "Basse du Gerbier",
          "passeggiata savoiarda di scoperta",
          "panorama Maurienne",
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
      de: {
        title:
          "Der Col du Mollard mit dem Rad: drei Auffahrten und die Runde Arvan-Villards",
        description:
          "1.638 m hoch, 2006 und 2011 von der Tour de France befahren: die gemessene Auffahrt von Saint-Jean, die Panoramarunde, die Variante über Albiez-le-Jeune und die Drei-Pässe-Runde.",
        excerpt:
          "Ein Tour-de-France-Pass, dessen Scheitelpunkt unser Dorf ist. Drei Wege hinauf und eine Runde, die Glandon, Croix de Fer und Mollard verbindet.",
        keywords: [
          "Col du Mollard Rennrad",
          "Col du Mollard Tour de France",
          "Radfahren Maurienne",
          "Runde Arvan-Villards",
          "Croix de Fer Glandon Mollard",
        ],
      },
      es: {
        title:
          "El col du Mollard en bicicleta: tres subidas y la vuelta Arvan-Villards",
        description:
          "1638 m de altitud, paso del Tour de Francia en 2006 y 2011: la subida cronometrada desde Saint-Jean, la vuelta panorámica, la variante por Albiez-le-Jeune y la ruta de los tres puertos.",
        excerpt:
          "Un puerto del Tour de Francia cuya cima es nuestro pueblo. Tres formas de subirlo, y una vuelta que enlaza Glandon, Croix de Fer y Mollard.",
        keywords: [
          "col du Mollard ciclismo",
          "col du Mollard Tour de Francia",
          "ciclismo Maurienne",
          "vuelta Arvan-Villards",
          "Croix de Fer Glandon Mollard",
        ],
      },
      it: {
        title:
          "Il col du Mollard in bici: tre salite e il giro Arvan-Villards",
        description:
          "1638 m di quota, passaggio del Tour de France nel 2006 e nel 2011: la salita cronometrata da Saint-Jean, il giro panoramico, la variante per Albiez-le-Jeune e il giro dei tre colli.",
        excerpt:
          "Un colle del Tour de France la cui cima è il nostro paese. Tre modi per salirlo, e un giro che collega Glandon, Croix de Fer e Mollard.",
        keywords: [
          "col du Mollard bici",
          "col du Mollard Tour de France",
          "ciclismo Maurienne",
          "giro Arvan-Villards",
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
      de: {
        title: "Hundeschlittenfahrt in Albiez-Montrond",
        description:
          "Halbstündige und einstündige Fahrten ab dem Freizeitgelände Les Contamines, vom 17. Dezember bis 1. April. Preise, Buchung und wie Sie Ihren Termin nicht verpassen.",
        excerpt:
          "45 € für Erwachsene, 40 € für Kinder, Start im Dorfkern – und eine Buchung, die Sie deutlich vor der Anreise vornehmen sollten.",
        keywords: [
          "Hundeschlitten Albiez",
          "Schlittenhunde Maurienne",
          "Winteraktivität Albiez-Montrond",
          "Musher Savoyen",
          "Freizeitgelände Les Contamines",
        ],
      },
      es: {
        title: "Paseo en trineo tirado por perros en Albiez-Montrond",
        description:
          "Paseos de media hora o de una hora desde la base de ocio de Les Contamines, del 17 de diciembre al 1 de abril. Tarifas, reserva y consejos para no perder el turno.",
        excerpt:
          "45 € adulto, 40 € niño, salida en el centro del pueblo, y una reserva que conviene hacer mucho antes de llegar a la estación.",
        keywords: [
          "trineo con perros Albiez",
          "mushing Maurienne",
          "actividad invierno Albiez-Montrond",
          "musher Saboya",
          "base de ocio Les Contamines",
        ],
      },
      it: {
        title: "Giro in slitta con i cani ad Albiez-Montrond",
        description:
          "Giri di mezz'ora o di un'ora con partenza dalla base ricreativa delle Contamines, dal 17 dicembre al 1° aprile. Tariffe, prenotazione e consigli per non perdere lo slot.",
        excerpt:
          "45 € adulti, 40 € bambini, partenza dal centro del paese, e una prenotazione da fare molto prima di arrivare in località.",
        keywords: [
          "cani da slitta Albiez",
          "sleddog Maurienne",
          "attività inverno Albiez-Montrond",
          "musher Savoia",
          "base ricreativa Les Contamines",
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
      de: {
        title: "Die Albiez C'Show, Dienstagabend am Pistenzugang von Le Mollard",
        description:
          "Fackelabfahrt unter Leitung der Skischule, Vorführung der Pistenraupen, Show der Skilehrer, Feuerwerk und Glühwein: der Höhepunkt der Schulferien in Albiez-Montrond.",
        excerpt:
          "Es findet am Pistenzugang von Le Mollard statt, 250 m von der Wohnung – und Kinder ab dem Niveau „flocon“ dürfen bei der Fackelabfahrt mit.",
        keywords: [
          "Albiez C'Show",
          "Fackelabfahrt Albiez",
          "Veranstaltung Skigebiet Albiez-Montrond",
          "Feuerwerk Albiez",
          "Skischulabend Maurienne",
        ],
      },
      es: {
        title: "El Albiez C'Show, la fiesta del martes en el acceso a pistas del Mollard",
        description:
          "Bajada de antorchas dirigida por la escuela de esquí, demostración de máquinas pisanieves, espectáculo de los monitores, fuegos artificiales y vino caliente: la cita de las vacaciones escolares en Albiez-Montrond.",
        excerpt:
          "Ocurre en el acceso a pistas del Mollard, a 250 m del alojamiento, y los niños desde el nivel «flocon» pueden bajar con antorchas.",
        keywords: [
          "Albiez C'Show",
          "bajada de antorchas Albiez",
          "animación estación Albiez-Montrond",
          "fuegos artificiales Albiez",
          "fiesta escuela de esquí Maurienne",
        ],
      },
      it: {
        title: "L'Albiez C'Show, la serata del martedì all'accesso alle piste del Mollard",
        description:
          "Fiaccolata guidata dalla scuola di sci, dimostrazione dei gatti delle nevi, spettacolo dei maestri, fuochi d'artificio e vin brulé: l'appuntamento delle vacanze scolastiche ad Albiez-Montrond.",
        excerpt:
          "Si svolge all'accesso alle piste del Mollard, a 250 m dall'alloggio, e i bambini dal livello «flocon» possono scendere con le fiaccole.",
        keywords: [
          "Albiez C'Show",
          "fiaccolata Albiez",
          "animazione località Albiez-Montrond",
          "fuochi d'artificio Albiez",
          "serata scuola di sci Maurienne",
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
      de: {
        title:
          "Der Lac du Mollard: bewachter Badebetrieb, Wasserspielgerät und Freizeitgelände",
        description:
          "350 m von der Wohnung dient der See am Mollard im Winter als Wasserspeicher für die Beschneiung und im Sommer als Badestelle, bewacht vom 1. Juli bis 31. August von 12 bis 18 Uhr.",
        excerpt:
          "Planschbecken, aufblasbares Spielgerät, Boulebahn, Volleyball und Picknicktische – alles drei Minuten zu Fuß entfernt.",
        keywords: [
          "Lac du Mollard Albiez",
          "Baden Albiez-Montrond",
          "Bergsee Savoyen",
          "Freizeitgelände Albiez",
          "Lac Savard",
        ],
      },
      es: {
        title:
          "El lac du Mollard: baño vigilado, hinchable y base de ocio",
        description:
          "A 350 m del alojamiento, el lago del Mollard sirve de reserva para la nieve artificial en invierno y de zona de baño en verano, vigilada del 1 de julio al 31 de agosto de 12 a 18 h.",
        excerpt:
          "Piscina infantil, estructura hinchable, petanca, voleibol y mesas de picnic, todo a tres minutos a pie.",
        keywords: [
          "lac du Mollard Albiez",
          "baño Albiez-Montrond",
          "lago de montaña Saboya",
          "base de ocio Albiez",
          "Lac Savard",
        ],
      },
      it: {
        title:
          "Il lac du Mollard: balneazione sorvegliata, gonfiabile e base ricreativa",
        description:
          "A 350 m dall'alloggio, lo specchio d'acqua del Mollard fa da riserva per la neve artificiale d'inverno e da zona balneabile d'estate, sorvegliata dal 1° luglio al 31 agosto dalle 12 alle 18.",
        excerpt:
          "Piscina per bambini, struttura gonfiabile, bocce, pallavolo e tavoli da picnic, tutto a tre minuti a piedi.",
        keywords: [
          "lac du Mollard Albiez",
          "balneazione Albiez-Montrond",
          "lago di montagna Savoia",
          "base ricreativa Albiez",
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
      de: {
        title: "Der Wald von Le Rival, von 1.300 m bis zum Col du Mollard",
        description:
          "Nadelbäume, Wasserfälle, Bergbäche und Wildtiere: der Wald von Le Rival zieht sich vom Collet d'en Haut bis zum Col du Mollard, durchzogen von Wanderwegen und Mountainbike-Strecken.",
        excerpt:
          "700 Höhenmeter Wald, Pilze, Wasserfälle – und Hirsche, die man im Herbst röhren hört.",
        keywords: [
          "Wald Le Rival Albiez",
          "Wald Albiez-Montrond",
          "Mountainbike Wald Maurienne",
          "Wildtiere Savoyen",
          "Waldspaziergang Albiez",
        ],
      },
      es: {
        title: "El bosque de Le Rival, de los 1300 m al col du Mollard",
        description:
          "Coníferas, cascadas, torrentes y fauna de montaña: el bosque de Le Rival se extiende del Collet d'en Haut al col du Mollard, atravesado por senderos y recorridos de BTT.",
        excerpt:
          "700 metros de desnivel de bosque, setas, cascadas y ciervos que se oyen berrear en otoño.",
        keywords: [
          "bosque de Le Rival",
          "bosque Albiez-Montrond",
          "BTT bosque Maurienne",
          "fauna Saboya",
          "paseo por el bosque Albiez",
        ],
      },
      it: {
        title: "La foresta di Le Rival, dai 1300 m al col du Mollard",
        description:
          "Conifere, cascate, torrenti e fauna di montagna: la foresta di Le Rival si estende dal Collet d'en Haut al col du Mollard, attraversata da sentieri e percorsi per mountain bike.",
        excerpt:
          "700 metri di dislivello di foresta, funghi, cascate e cervi che si sentono bramire in autunno.",
        keywords: [
          "foresta di Le Rival",
          "foresta Albiez-Montrond",
          "mountain bike foresta Maurienne",
          "fauna Savoia",
          "passeggiata nel bosco Albiez",
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
      de: {
        title:
          "Le Chalet d'la Croë, Hütte auf 2.076 m am Fuß der Aiguilles d'Arves",
        description:
          "Private, 2013 renovierte Hütte, geöffnet vom 18. Juni bis 13. September 2026: Bewirtung, Übernachtung in Kuppelzelten, hausgemachte regionale Erzeugnisse, mitten in den Almen von Albiez-Montrond.",
        excerpt:
          "Eine Crêpe oder ein Raclette mitten in der Wanderung – und Kuppelzelte, um unter dem Sternenhimmel der Almen zu schlafen.",
        keywords: [
          "Chalet d'la Croë",
          "Berghütte Albiez-Montrond",
          "Hütte Aiguilles d'Arves",
          "auf der Alm schlafen Savoyen",
          "Hüttenwanderung Maurienne",
        ],
      },
      es: {
        title:
          "Le Chalet d'la Croë, refugio a 2076 m al pie de las Aiguilles d'Arves",
        description:
          "Refugio privado renovado en 2013, abierto del 18 de junio al 13 de septiembre de 2026: restauración, alojamiento en domos, productos locales caseros, en el corazón de los pastos de Albiez-Montrond.",
        excerpt:
          "Una crepe o una raclette en mitad de una ruta, y domos para dormir bajo el cielo estrellado de los pastos de altura.",
        keywords: [
          "Chalet d'la Croë",
          "refugio Albiez-Montrond",
          "refugio Aiguilles d'Arves",
          "dormir en pastos de altura Saboya",
          "ruta con refugio Maurienne",
        ],
      },
      it: {
        title:
          "Le Chalet d'la Croë, rifugio a 2076 m ai piedi delle Aiguilles d'Arves",
        description:
          "Rifugio privato ristrutturato nel 2013, aperto dal 18 giugno al 13 settembre 2026: ristorazione, pernottamento in domi, prodotti locali fatti in casa, nel cuore degli alpeggi di Albiez-Montrond.",
        excerpt:
          "Una crêpe o una raclette a metà escursione, e domi per dormire sotto il cielo stellato degli alpeggi.",
        keywords: [
          "Chalet d'la Croë",
          "rifugio Albiez-Montrond",
          "rifugio Aiguilles d'Arves",
          "dormire in alpeggio Savoia",
          "escursione con rifugio Maurienne",
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
      de: {
        title: "Le Kavalkada: Pferde- und Ponyausritte 300 m von der Wohnung",
        description:
          "Der Reitbetrieb von Albiez-Montrond: Ausritte im Wald und auf den Almen, Ponykurse über eine Woche, Unterricht auf dem Reitplatz mit staatlich geprüften Lehrkräften. Öffnungszeiten vom 8. Juli bis 31. August.",
        excerpt:
          "Vom halbstündigen Ponyausritt rund um den Châtel bis zum halbtägigen Ritt über die Wiesen der Cochette.",
        keywords: [
          "Kavalkada Albiez",
          "Reitbetrieb Albiez-Montrond",
          "Ausritt Maurienne",
          "Ponyreiten Kinder Savoyen",
          "Reiten in den Bergen",
        ],
      },
      es: {
        title: "Le Kavalkada: paseos a caballo y en poni a 300 m del alojamiento",
        description:
          "El centro equino de Albiez-Montrond: paseos por el bosque y por los pastos, cursos de poni por semanas, clases en pista con monitores titulados. Horarios del 8 de julio al 31 de agosto.",
        excerpt:
          "Desde el paseo en poni de media hora alrededor del Châtel hasta la excursión de media jornada por las praderas de la Cochette.",
        keywords: [
          "Kavalkada Albiez",
          "centro equino Albiez-Montrond",
          "paseo a caballo Maurienne",
          "poni niños Saboya",
          "equitación en montaña",
        ],
      },
      it: {
        title: "Le Kavalkada: passeggiate a cavallo e in pony a 300 m dall'alloggio",
        description:
          "Il centro equestre di Albiez-Montrond: passeggiate nel bosco e in alpeggio, corsi di pony settimanali, lezioni in campo con istruttori diplomati. Orari dall'8 luglio al 31 agosto.",
        excerpt:
          "Dal giro in pony di mezz'ora attorno al Châtel alla passeggiata di mezza giornata nei prati della Cochette.",
        keywords: [
          "Kavalkada Albiez",
          "centro equestre Albiez-Montrond",
          "passeggiata a cavallo Maurienne",
          "pony bambini Savoia",
          "equitazione in montagna",
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
      de: {
        title: "Die höchstgelegene BMX-Bahn Frankreichs, und Mountainbiken in Albiez",
        description:
          "BMX-Race-Bahn im Dorfkern von Albiez-Montrond, Verleih von E-Mountainbikes, BMX und E-Scootern, geführte Ausfahrten: Radfahren im Sommer in Albiez.",
        excerpt:
          "Eine frei zugängliche BMX-Race-Bahn, umgeben von Fußball-, Basketball- und Tennisplätzen und einem Picknickplatz.",
        keywords: [
          "BMX Albiez-Montrond",
          "höchste BMX-Bahn Frankreichs",
          "E-Mountainbike Albiez",
          "E-Scooter Maurienne",
          "Radfahren Albiez Sommer",
        ],
      },
      es: {
        title: "La pista de BMX más alta de Francia, y la BTT en Albiez",
        description:
          "Pista de BMX race en el centro de Albiez-Montrond, alquiler de BTT eléctricas, BMX y patinetes eléctricos, salidas acompañadas: la bicicleta en verano en Albiez.",
        excerpt:
          "Una pista de BMX race de libre acceso, rodeada de campos de fútbol, baloncesto, tenis y una zona de picnic.",
        keywords: [
          "BMX Albiez-Montrond",
          "pista BMX más alta de Francia",
          "BTT eléctrica Albiez",
          "patinete eléctrico Maurienne",
          "bicicleta Albiez verano",
        ],
      },
      it: {
        title: "La pista di BMX più alta di Francia, e la mountain bike ad Albiez",
        description:
          "Pista di BMX race nel centro di Albiez-Montrond, noleggio di mountain bike elettriche, BMX e monopattini elettrici, uscite accompagnate: la bici d'estate ad Albiez.",
        excerpt:
          "Una pista di BMX race ad accesso libero, circondata da campi di calcio, basket, tennis e da un'area picnic.",
        keywords: [
          "BMX Albiez-Montrond",
          "pista BMX più alta di Francia",
          "mountain bike elettrica Albiez",
          "monopattino elettrico Maurienne",
          "bici Albiez estate",
        ],
      },
    },
  },
];

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getLocalizedPost(post: BlogPostMeta, locale: Locale): LocalizedPost {
  return post.locales[locale] ?? post.locales[DEFAULT_LOCALE];
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
