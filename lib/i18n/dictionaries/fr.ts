import type { Dictionary } from "../types";
import { PROPERTY } from "../../property";

export const fr: Dictionary = {
  header: {
    home: "Accueil",
    winter: "Hiver / Ski",
    summer: "Été / Lac",
    apartment: "L'appartement",
    location: "Situation",
    blog: "Guide",
    book: "Réserver",
    menu: "Menu",
    switchLanguage: "Changer de langue",
  },

  home: {
    heroTitle: "Un appartement face aux Aiguilles d'Arves",
    heroSubtitle:
      "À 1 600 m d'altitude à Albiez-Montrond, au calme dans un chalet de Maurienne. 4 à 6 personnes, balcon plein sud-ouest.",
    intro:
      "Au dernier étage d'un petit chalet de la résidence Le Hameau des Aiguilles, notre appartement familial ouvre sur un balcon exposé sud-ouest et une vue dégagée sur les Aiguilles d'Arves. Les pistes, les commerces et l'école de ski sont à 250 mètres. Le lac et son club d'équitation sont à quelques minutes à pied. Nous le louons toute l'année.",
    chooseSeason: "Deux saisons, deux séjours",
    chooseSeasonSubtitle:
      "Albiez ne se visite pas de la même façon en hiver et pendant la belle saison. Choisissez la vôtre.",
    seasonCard: {
      hiver: {
        title: "L'hiver au ski",
        description:
          "40 km de pistes entre 1 500 et 2 060 m, un front de neige à 250 mètres avec l'ESF et le club Piou-Piou, un grand casier à skis sur le palier et une raclette qui vous attend au retour.",
        cta: "Découvrir la saison de ski",
      },
      ete: {
        title: "L'été au lac",
        description:
          "Baignade surveillée au lac à 350 mètres, club d'équitation à 300 mètres, départs de randonnée et de VTT au pied du chalet.",
        cta: "Découvrir la saison d'été",
      },
    },
    offSeasonTitle: "Et hors saison ?",
    offSeasonText:
      "Nous louons aussi en dehors des périodes d'affluence, quand la station retrouve son calme. C'est le bon moment pour la randonnée, le vélo, la raquette ou simplement pour profiter de la vue sans croiser personne — souvent au meilleur tarif de l'année. Autant le dire franchement : hors saison, les remontées mécaniques sont fermées et une partie des commerces et restaurants du village aussi, la supérette restant ouverte. Ceux qui viennent chercher le calme y trouvent leur compte, mais mieux vaut le savoir avant de réserver.",
    offSeasonExchange:
      "En dehors des saisons, l'appartement est aussi proposé à l'échange sur HomeExchange, contre GuestPoints plutôt qu'en location. Une bonne façon de découvrir la Maurienne si vous êtes vous-même membre.",
    offSeasonExchangeCta: "Voir le logement sur HomeExchange",
    offSeasonSponsorCta: "S'inscrire avec mon code de parrainage",
    offSeasonSponsorNote:
      "Pas encore membre ? En vous inscrivant avec mon code, nous recevons chacun 250 GuestPoints.",
    seo: {
      title:
        "Location appartement Albiez-Montrond — Ski et lac face aux Aiguilles d'Arves",
      description:
        "Appartement 4 à 6 personnes à Albiez-Montrond (Savoie, 1 600 m), à 250 m des pistes et 350 m du lac. Balcon sud-ouest, vue Aiguilles d'Arves. Location hiver, été et hors saison.",
      keywords: [
        "location Albiez-Montrond",
        "appartement Albiez",
        "location ski Albiez",
        "location vacances Maurienne",
        "appartement pied des pistes Albiez",
        "location Aiguilles d'Arves",
        "hébergement station Albiez",
        "location montagne Savoie 6 personnes",
        "lac Albiez baignade",
        "vacances famille Maurienne",
      ],
    },
  },

  seasons: {
    hiver: {
      heading: "Ski à Albiez : l'appartement à 250 m des pistes",
      tagline: "Domaine skiable ouvert du 19 décembre 2026 au 21 mars 2027",
      intro:
        "Albiez est une station familiale de Maurienne, à taille humaine et sans file d'attente. Le domaine s'étend de 1 500 à 2 060 mètres, avec 40 km de pistes desservies par 13 remontées mécaniques. Depuis l'appartement, 250 mètres suffisent pour rejoindre le front de neige — et tout s'y trouve : le départ des pistes, les commerces, l'école de ski et le club Piou-Piou.",
      highlights: [
        {
          title: "Le front de neige à 250 m",
          description:
            "Départ des pistes, commerces, ESF et club Piou-Piou sont tous réunis au même endroit, à cinq minutes à pied. Une seule marche à faire dans la journée.",
        },
        {
          title: "Grand casier à skis",
          description:
            "Un grand casier à skis vous attend sur le palier, à la porte de l'appartement.",
        },
        {
          title: "Station familiale",
          description:
            "40 km de pistes, 13 remontées, de 1 500 à 2 060 m. Assez pour la semaine, assez calme pour apprendre.",
        },
        {
          title: "Le retour au chaud",
          description:
            "Appareil à raclette, à fondue, à crêpes et pierrade sur place. Plus des luges pour les enfants et des jeux de société.",
        },
      ],
      activitiesTitle: "Que faire à Albiez l'hiver",
      resortFacts: {
        pistes: "pistes",
        lifts: "remontées",
        snowGuns: "enneigeurs",
      },
      activities: [
        {
          title: "Le domaine, depuis le télésiège des Échaux",
          description:
            "Le télésiège des Échaux part à 250 mètres de l'appartement et monte de 1 600 à 1 800 m : c'est la porte d'entrée du domaine, et tout s'ouvre derrière — le Chef-lieu, Montrond, puis le téléski des Aplanes qui culmine à 2 100 m. Le plateau est large, très ensoleillé et peu arrosé : on y apprend à skier confortablement, on n'y vient pas chercher des murs.",
          link: {
            href: "/fr/guide/domaine-skiable-albiez-secteur-mollard",
            label: "Le domaine et les remontées du Mollard",
            internal: true,
          },
        },
        {
          title: "Débuter à l'école de ski",
          description:
            "L'ESF et le club Piou-Piou sont sur le front de neige à 250 mètres. À la réservation, choisissez le départ du Mollard : c'est celui-là qui est à 250 mètres de l'appartement. Les cours se remplissent vite — mieux vaut réserver dès que vos dates sont fixées.",
          link: {
            href: PROPERTY.links.esf,
            label: "Réserver à l'ESF d'Albiez",
          },
        },
        {
          title: "L'hiver hors des pistes",
          description:
            "La piste de luge du Mollard est juste à côté de la résidence, en plein soleil — son enneigement n'est pas garanti, mais quand elle est ouverte elle occupe une fin d'après-midi entière. Pour le reste : raquettes, ski de fond, chiens de traîneau, motoneige, parapente, apéro dans un igloo. Des luges pour enfants vous attendent dans l'appartement.",
          link: {
            href: "/fr/guide/chiens-de-traineau-albiez",
            label: "Les chiens de traîneau à Albiez",
            internal: true,
          },
        },
        {
          title: "Les soirées au front de neige",
          description:
            "Le mardi des vacances scolaires, l'Albiez C'Show anime le front de neige à 250 mètres : descente aux flambeaux avec les moniteurs, show des dameuses, feu d'artifice et vin chaud offert. Les autres soirs, le Sherpa se fait au retour de ski, skis à la main, et la fondue se prend sur le balcon.",
          link: {
            href: "/fr/guide/albiez-c-show",
            label: "L'Albiez C'Show, la soirée du mardi",
            internal: true,
          },
        },
        {
          title: "Les Sybelles, à 20 min de voiture",
          description:
            "Albiez propose des forfaits 5 jours + 1 journée aux Sybelles, dont l'accès se fait par Saint-Jean-d'Arves. C'est le 4e domaine skiable relié de France et le premier de Maurienne : 393 ha, 136 pistes tous niveaux et six stations reliées, de 1 300 à 2 620 m. De quoi changer de décor en milieu de semaine sans changer de logement.",
          link: {
            href: PROPERTY.links.sybelles,
            label: "Skier aux Sybelles",
          },
        },
      ],
      distanceLabels: {
        frontDeNeige: "Front de neige",
        slopes: "Départ des pistes",
        shops: "Commerces",
        esf: "École de ski (ESF)",
        piouPiou: "Club Piou-Piou",
      },
      resortLink: {
        alt: "Albiez, la Perle des Alpes",
        label: "Le site de la station d'Albiez",
      },
      banner: {
        alt: "Skieurs sur le domaine d'Albiez, le village de chalets et les montagnes enneigées en arrière-plan",
        caption:
          "Un domaine très ensoleillé, le village de chalets en contrebas et les montagnes de Maurienne au fond.",
      },
      pisteMap: {
        title: "Le secteur du Mollard",
        caption:
          "La flèche indique l'appartement : le front de neige, l'ESF et les commerces sont à 250 mètres.",
      },
      seo: {
        title:
          "Location ski Albiez-Montrond — Appartement 6 personnes à 250 m des pistes",
        description:
          "Appartement de montagne à Albiez-Montrond, à 250 m du départ des pistes, de l'ESF et du club Piou-Piou. 4 à 6 personnes, casier à skis, vue Aiguilles d'Arves. Saison 2026-2027.",
        keywords: [
          "location ski Albiez",
          "appartement ski Albiez-Montrond",
          "location proche pistes Maurienne",
          "station Albiez hébergement",
          "location ski famille Savoie",
          "appartement 6 personnes station ski",
          "séjour ski Maurienne",
          "location ski pas cher Savoie",
        ],
      },
    },

    ete: {
      heading: "L'été à Albiez : le lac, les chevaux et la montagne",
      tagline: "Baignade surveillée au lac en juillet et août",
      intro:
        "L'été, Albiez change de rythme. Le lac et sa baignade surveillée sont à 350 mètres de l'appartement, le club d'équitation à 300 mètres, et les départs de randonnée et de VTT sont à portée immédiate. Le balcon exposé sud-ouest devient la pièce principale du logement, face aux Aiguilles d'Arves.",
      highlights: [
        {
          title: "Le lac à 350 m",
          description:
            "Baignade surveillée pendant la période estivale, à quelques minutes à pied du chalet.",
        },
        {
          title: "Équitation à 300 m",
          description:
            "Le club d'équitation du village propose balades en poney et sorties à cheval, à côté de chez vous.",
        },
        {
          title: "Rando et VTT au départ",
          description:
            "Les itinéraires partent à proximité immédiate. VTT électriques et trottinettes électriques se louent sur place.",
        },
        {
          title: "Le balcon sud-ouest",
          description:
            "Vue panoramique sur les Aiguilles d'Arves et le soleil jusqu'au bout de la soirée.",
        },
      ],
      activitiesTitle: "Que faire à Albiez l'été",
      activities: [
        {
          title: "Baignade au lac",
          description:
            "Baignade surveillée en juillet et août, à 350 mètres. De quoi occuper les après-midis chauds sans prendre la voiture.",
        },
        {
          title: "Poney et cheval",
          description:
            "Le club d'équitation est à 300 mètres : balades en poney pour les plus jeunes, sorties à cheval pour les autres.",
        },
        {
          title: "Randonnée",
          description:
            "Des sentiers pour tous les niveaux au départ du village, avec les Aiguilles d'Arves en ligne de mire.",
        },
        {
          title: "Vélo et VTT électrique",
          description:
            "Location de VTT électriques et de trottinettes électriques sur place, pour monter sans souffrir et descendre en s'amusant.",
        },
      ],
      distanceLabels: {
        shops: "Commerces du village",
        riding: "Club d'équitation",
        lake: "Lac et baignade surveillée",
      },
      seo: {
        title:
          "Location été Albiez-Montrond — Appartement près du lac et des randonnées",
        description:
          "Appartement 4 à 6 personnes à Albiez-Montrond, à 350 m du lac avec baignade surveillée et 300 m du club d'équitation. Randonnée, VTT électrique, balcon vue Aiguilles d'Arves.",
        keywords: [
          "location été Albiez",
          "vacances été Maurienne",
          "lac Albiez baignade surveillée",
          "location montagne été Savoie",
          "randonnée Albiez-Montrond",
          "équitation Albiez",
          "VTT électrique Maurienne",
          "location vacances famille montagne été",
        ],
      },
    },
  },

  property: {
    title: "L'appartement",
    subtitle:
      "Au 2ᵉ et dernier étage d'un chalet de la résidence Le Hameau des Aiguilles, à plus de 1 600 mètres d'altitude.",
    sleepingTitle: "Les couchages",
    bedrooms: "Chambre",
    alcove: "Coin montagne",
    living: "Salon",
    bedDouble: (w, l) => `1 lit double ${w} × ${l} cm`,
    bedBunk: (n, w, l) => `${n} lits superposés ${w} × ${l} cm`,
    bedTrundle: (n, w, l) =>
      `Canapé-lit gigogne, ${n} lits simples ${w} × ${l} cm`,
    capacity: (min, max) => `${min} à ${max} personnes`,
    areaCarrez: (m2) => `${m2} m² Carrez`,
    roomsSummary: "1 chambre + coin montagne",
    bedsCount: (n) => `${n} couchages`,
    bathroomsCount: (n) => `${n} salle de bains`,
    bathroom:
      "Salle de bains avec baignoire et sèche-serviettes, toilettes séparées.",
    balcony:
      "Balcon exposé sud-ouest avec vue panoramique sur les Aiguilles d'Arves.",
    amenitiesTitle: "Les équipements",
    amenityGroups: [
      {
        title: "Cuisine",
        items: [
          "Lave-vaisselle",
          "Four",
          "Micro-ondes",
          "Réfrigérateur",
          "Grille-pain",
          "Machine à expresso Nespresso",
        ],
      },
      {
        title: "Spécialités de montagne",
        items: [
          "Appareil à raclette",
          "Appareil à fondue",
          "Pierrade",
          "Appareil à crêpes",
        ],
      },
      {
        title: "Confort",
        items: [
          "Balcon sud-ouest",
          "Salle de bains avec baignoire",
          "Sèche-serviettes",
          "Toilettes séparées",
          "Casier à skis sur le palier",
        ],
      },
      {
        title: "Enfants et loisirs",
        items: [
          "Luges pour enfants",
          "Jeux de société",
          "Sélection de livres",
          "Lit parapluie avec matelas (sur demande)",
          "Chaise haute (sur demande)",
          "Luge adaptée aux tout-petits (sur demande)",
        ],
      },
    ],
    showAll: "Voir tous les équipements",
    showLess: "Réduire",
  },

  linen: {
    title: "Le kit linge",
    subtitle: (price) =>
      `Couettes et oreillers sont sur place. Draps et serviette de bain sont en option, ${price} € par personne.`,
    withLinen: "Avec le kit linge",
    withoutLinen: "Sans le kit linge",
    providedTitle: "Fourni sans supplément",
    providedIntro:
      "Les couettes et les oreillers vous attendent dans l'appartement, en nombre suffisant pour six personnes :",
    itemLabel: (key, count) => {
      const s = (count ?? 0) > 1 ? "s" : "";
      const labels: Record<string, string> = {
        duvetDouble: `couette${s} double${s}`,
        duvetSingle: `couette${s} simple${s}`,
        pillow: `oreiller${s}`,
        // Non dénombré : toujours au pluriel.
        extraBlankets: "Couvertures additionnelles",
      };
      return labels[key] ?? key;
    },
    optionTitle: "En option",
    optionIntro: (price) =>
      `Pour ${price} € par personne, le linge vous attend dans l'appartement. À signaler à la réservation.`,
    optionItems: [
      "Draps et taies d'oreiller",
      "Une serviette de bain par personne",
    ],
    notMadeNote:
      "Les lits ne sont pas faits à votre arrivée : le linge est mis à disposition, à vous de l'installer.",
    byoNote:
      "Vous préférez apporter vos draps et vos serviettes ? C'est possible, et c'est même l'usage à la montagne. Prévoyez alors du linge pour un lit double de 160 × 190 et des lits simples de 80 × 190.",
  },

  practical: {
    title: "Infos pratiques",
    accessTitle: "Arrivée et accès",
    stepsWarning:
      "Il y a une cinquantaine de marches entre le parking et l'appartement. C'est le prix de la vue — mais mieux vaut le savoir avant de réserver.",
    parking: "Parking extérieur à 50 mètres du chalet.",
    keyBox:
      "Boîte à clés : vous arrivez et repartez en toute autonomie, à l'heure qui vous arrange.",
    skiLocker: "Grand casier à skis sur le palier.",
    onSiteContact: "Une personne est sur place en cas de souci.",
    servicesTitle: "Services",
    cleaning:
      "Ménage de fin de séjour inclus, hors cuisine et vaisselle qui restent à votre charge.",
    linen: (price) =>
      `Linge de lit et de toilette en option, ${price} € par personne.`,
    bringYourOwnTitle: "À prévoir dans vos bagages",
    bringYourOwn: [
      "Tablettes pour le lave-vaisselle",
      "Sacs poubelle 50 L",
      "Papier toilette",
      "Dosettes Nespresso",
    ],
    rulesTitle: "Règlement",
    noPets: "Les animaux ne sont pas acceptés.",
    noSmoking: "Logement non-fumeur.",
    babyKitTitle: "Kit bébé, gratuit sur demande",
    babyKit:
      "Pas d'âge minimum : le logement convient aux tout-petits. Le kit est prêté sans supplément — merci de nous signaler à la réservation le matériel dont vous avez besoin.",
    babyKitItems: [
      "Lit parapluie avec matelas",
      "Chaise haute",
      "Luge bébé",
    ],
  },

  location: {
    title: "Où se trouve l'appartement",
    subtitle:
      "Chemin du Châtel, 73530 Albiez-Montrond — au calme, dans la vallée de la Maurienne.",
    resortTitle: "La station d'Albiez",
    resortDescription:
      "Une station familiale de Maurienne, entre 1 500 et 2 060 mètres d'altitude. Assez de pistes pour une semaine, assez peu de monde pour y apprendre à skier.",
    openMaps: "Ouvrir dans Google Maps",
    altitudeLabel: "Altitude du logement",
    resortStats: {
      slopes: "de pistes",
      lifts: "remontées mécaniques",
      altitude: "d'altitude",
    },
  },

  booking: {
    title: "Disponibilités et réservation",
    subtitle: "Réservez en direct, sans intermédiaire.",
    comingSoon: "Réservation en direct bientôt disponible",
    comingSoonText:
      "Le calendrier de disponibilités en temps réel arrive prochainement sur cette page. En attendant, vous pouvez consulter les dates libres et réserver sur Airbnb, ou nous écrire directement pour un séjour sur mesure.",
    bookOnAirbnb: "Voir les disponibilités sur Airbnb",
    contactUs: "Nous écrire",
  },

  awards: {
    title: "Distinctions",
    subtitle:
      "Ce que les plateformes de réservation retiennent des séjours passés ici.",
    bookingLabel: "Traveller Review Award",
    yearLabel: (year) => `Édition ${year}`,
    outOf: (scale) => `sur ${scale}`,
    consecutive: "Distingué deux années consécutives par Booking.com",
  },

  superhost: {
    title: "Alexandre est Superhôte sur Airbnb",
    description:
      "Les Superhôtes sont des hôtes expérimentés, très bien notés, qui s'engagent à offrir d'excellents séjours.",
    profileLink: (n) => `Découvrir mes ${n} avis sur mon profil Airbnb`,
  },

  guestFavourite: {
    title: "Appartement Coup de cœur voyageurs sur Airbnb",
    description:
      "Les logements Coup de cœur voyageurs font partie des plus appréciés sur Airbnb, d'après les notes, les avis et la fiabilité.",
  },

  host: {
    title: "Votre hôte : Alexandre",
    badge: "Superhôte",
    experience: (years) => `${years} ans d'accueil à Albiez`,
    about: "À propos d'Alexandre",
    aboutText:
      "Ingénieur, geek, sportif et bricoleur, je suis superhôte depuis plusieurs années.\nJ'ai à cœur de proposer des hébergements propres, confortables et parfaitement fonctionnels.\nJe reste disponible et réactif, tout en vous laissant une grande autonomie.",
    languages: "Langues",
    languagesValue: "Français, English",
    responseRate: "Taux de réponse",
    responseRateValue: "Réponse rapide — généralement en moins d'une heure",
    emailCta: "M'écrire",
    airbnbCta: "Me contacter sur Airbnb",
    whatsappCta: "WhatsApp",
    whatsappMessage:
      "Bonjour Alexandre, je suis intéressé(e) par votre appartement à Albiez.",
  },

  reviews: {
    title: "Ce qu'en disent les voyageurs",
    subtitle: (count) => `${count} commentaires sur Airbnb`,
    guestFavourite: "Coup de cœur voyageurs",
    guestFavouriteNote:
      "Un logement parmi les préférés des voyageurs sur Airbnb, d'après les évaluations, les commentaires et la fiabilité de l'annonce.",
    outOf: "sur 5",
    categories: {
      cleanliness: "Propreté",
      accuracy: "Précision",
      checkIn: "Arrivée",
      communication: "Communication",
      location: "Emplacement",
      value: "Qualité-prix",
    },
    showAll: (count) => `Voir les ${count} avis`,
    showLess: "Réduire",
    seeOnAirbnb: "Lire tous les avis sur Airbnb",
    empty: "Pas encore d'avis pour cette saison.",
    hostReply: "Réponse d'Alexandre",
    filter: {
      label: "Filtrer par période",
      all: "Tous",
      hiver: "Saison ski",
      ete: "Saison été",
      "hors-saison": "Hors saison",
      offSeasonNote:
        "Séjours hors des périodes d'ouverture du domaine : remontées fermées et une partie des commerces aussi. La station y est nettement plus calme.",
    },
  },

  gallery: {
    title: "En images",
    empty: "Les photos de cette saison arrivent très bientôt.",
    showAll: (count) => `Voir les ${count} photos`,
    previous: "Photo précédente",
    next: "Photo suivante",
    close: "Fermer",
    counter: (i, total) => `${i} / ${total}`,
    expand: "Agrandir",
    zoomIn: "Taille réelle",
    zoomOut: "Vue d'ensemble",
  },

  spaces: {
    subtitle:
      "La visite espace par espace. Salon, kitchenette et coin repas partagent la même pièce, ouverte plein sud-ouest sur le balcon.",
    photoCount: (count) => (count > 1 ? `${count} photos` : "1 photo"),
    list: {
      salon: {
        title: "Salon",
        amenities: [
          "Canapé-lit gigogne",
          "Jeux de société",
          "Livres et jouets pour enfants",
          "Chauffage",
        ],
      },
      kitchenette: {
        title: "Kitchenette",
        amenities: [
          "Plaques de cuisson",
          "Four",
          "Four à micro-ondes",
          "Lave-vaisselle",
          "Réfrigérateur",
          "Cafetière Nespresso",
          "Grille-pain",
          "Vaisselle, couverts et verres à vin",
          "Détecteur de fumée",
        ],
      },
      "espace-repas": {
        title: "Espace repas",
        amenities: [
          "Table à manger",
          "Raclette, fondue, pierrade et crêpière",
          "Chauffage",
        ],
      },
      chambre: {
        title: "Chambre",
        amenities: [
          "Lit double",
          "Rangements et cintres",
          "Oreillers et couvertures supplémentaires",
          "Lit parapluie (sur demande)",
          "Chauffage",
        ],
      },
      "coin-montagne": {
        title: "Coin montagne",
        amenities: ["Lits superposés", "Chauffage"],
      },
      "salle-de-bains": {
        title: "Salle de bains",
        amenities: [
          "Baignoire",
          "Eau chaude",
          "Sèche-serviettes",
          "Étendoir à linge",
          "Toilettes séparées",
          "Produits d'entretien",
        ],
      },
      balcon: {
        title: "Balcon",
        amenities: [
          "Exposé sud-ouest",
          "Vue sur les Aiguilles d'Arves",
          "Table et chaises",
          "Luges",
        ],
      },
      exterieur: {
        title: "Extérieur",
        amenities: [
          "Casier à skis sur le palier",
          "Parking extérieur",
          "Résidence Le Hameau des Aiguilles",
        ],
      },
    },
  },

  blog: {
    heading: "Le guide d'Albiez",
    subheading:
      "Nos repères d'habitués sur Albiez-Montrond : randonnées balisées, loueurs de ski, commerces du village, activités d'été et animations de la station.",
    seasonBadge: { hiver: "Hiver", ete: "Été" },
    yearRoundBadge: "Toute l'année",
    filter: {
      label: "Filtrer le guide par saison",
      all: "Toute l'année",
      hiver: "Hiver",
      ete: "Été",
      note: "Les sujets valables toute l'année — commerces, randonnées, famille — restent affichés dans les deux saisons.",
    },
    back: "← Retour au guide",
    relatedTitle: "À lire aussi",
    cta: {
      title: "Séjourner à Albiez",
      text: "Notre appartement se trouve au Mollard, à 250 m du front de neige et du départ des sentiers. Jusqu'à 6 personnes, balcon plein sud face aux Aiguilles d'Arves.",
      button: "Voir le logement",
    },
    seo: {
      title: "Guide d'Albiez-Montrond — randonnées, ski, commerces et activités",
      description:
        "Randonnées balisées, location de ski, ESF, commerces du village, lac du Mollard, col du Mollard à vélo : le guide pratique d'Albiez-Montrond écrit par des habitués de la station.",
      keywords: [
        "guide Albiez-Montrond",
        "que faire à Albiez",
        "randonnée Albiez-Montrond",
        "station Albiez Maurienne",
        "Aiguilles d'Arves",
      ],
    },
  },

  footer: {
    navigation: "Navigation",
    contact: "Contact",
    legal: "Informations légales",
    copyright: "Tous droits réservés.",
    tagline: "Appartement de montagne à Albiez-Montrond, Savoie.",
  },

  legal: {
    title: "Mentions légales",
    editorTitle: "Éditeur du site",
    hostTitle: "Hébergement",
    dataTitle: "Données personnelles",
    dataText:
      "Ce site ne collecte aucune donnée personnelle en dehors des messages que vous nous adressez volontairement par e-mail. Les statistiques de fréquentation sont anonymes et ne permettent pas de vous identifier. Pour toute question relative à vos données, écrivez-nous à l'adresse ci-dessus.",
    labels: {
      legalName: "Dénomination",
      legalForm: "Forme juridique",
      siren: "SIREN",
      siret: "SIRET du siège",
      capital: "Capital social",
      office: "Siège social",
      ape: "Code APE",
      contact: "Contact",
    },
  },

  guide: {
    title: "Guide d'arrivée",
    intro:
      "Du col du Mollard jusqu'à la porte de l'appartement, le chemin en photos. Comptez cinq minutes depuis le col.",
    codeNote:
      "Le code de la boîte à clés vous est envoyé par message avant votre arrivée : il ne figure pas sur cette page.",
    mapsCta: "Ouvrir l'itinéraire dans Google Maps",
    stepLabel: (n) => `Étape ${n}`,
    steps: {
      mollard: {
        title: "Au col du Mollard, à droite",
        text: "En arrivant au col du Mollard, repérez le vélo blanc à pois rouges exposé sur le bord de la route, puis tournez à droite sur le chemin du Châtel.",
      },
      residence: {
        title: "La résidence Le Hameau des Aiguilles",
        text: "Le chalet est dans la résidence Le Hameau des Aiguilles. Un premier parking est signalé à l'entrée : continuez à avancer plutôt que de vous y arrêter.",
      },
      parking: {
        title: "Se garer près des conteneurs",
        text: "Le mieux est d'avancer jusqu'aux conteneurs à poubelle et de se garer là : c'est le point le plus proche de l'escalier.",
      },
      escalier: {
        title: "L'escalier le long de la piscine",
        text: "En face des conteneurs, montez l'escalier qui longe la piscine (actuellement en rénovation).",
      },
      chalet: {
        title: "Le chalet",
        text: "Voici le chalet. L'appartement occupe le dernier étage, la partie en bois : le balcon à droite, les fenêtres des chambres à gauche. Continuez à monter et passez derrière le bâtiment.",
      },
      palier: {
        title: "Le dernier escalier",
        text: "Montez le dernier escalier : l'appartement est la deuxième porte à droite sur le palier.",
      },
      porte: {
        title: "La porte et le casier à skis",
        text: "Le casier à skis se trouve sur le même palier, juste à côté de la porte, et porte le même numéro.",
      },
      boiteAClef: {
        title: "La boîte à clés",
        text: "Elle est fixée sur le montant gauche de la porte. Faites descendre le cache noir, composez le code qui vous a été transmis, puis abaissez le bouton noir à gauche des molettes pour ouvrir. La grande clé ouvre la porte, la petite le casier à skis.",
      },
    },
    stairsNote: (steps) =>
      `Environ ${steps} marches séparent le parking de l'appartement. La vue se mérite !`,
    unitNote: (unit) => `Porte ${unit} — le casier à skis porte lui aussi le ${unit}.`,
    keyBoxSecurity:
      "Pensez à refermer la boîte et à brouiller le code après chaque utilisation. Elle reste à votre disposition pendant tout le séjour.",
    manualTitle: "Le manuel de la maison",
    panelTitle: "Si le courant est coupé",
    panelIntro:
      "Normalement, quelqu'un est passé vérifier que tout fonctionne avant votre arrivée. Si ce n'est pas le cas, le tableau électrique est à côté de la porte d'entrée.",
    panelMarkers: {
      breaker:
        "Disjoncteur général. Si le courant est coupé, relevez-le vers le haut.",
      radiators: "Radiateurs. Remet le chauffage en marche.",
      waterHeater:
        "Ballon d'eau chaude. Pour forcer la chauffe, poussez le bouton de « auto » vers « 1 », une seule fois.",
    },
    panelHotWaterNote:
      "Après une coupure, l'eau chaude ne revient en général que le lendemain matin — sauf si vous forcez le ballon.",
    radiatorSwitchTitle: "Un radiateur ne chauffe pas ?",
    radiatorSwitchText:
      "Chaque radiateur, sèche-serviette compris, a un interrupteur à bascule 0 / 1 caché derrière l'appareil. Il doit être sur 1. Vérifiez-le avant de chercher plus loin : c'est la cause la plus fréquente.",
    manualsTitle: "Notices des appareils",
    manualsText:
      "Les notices des appareils électroniques sont rangées dans le tiroir du petit meuble.",
    checkoutTitle: "Avant de partir",
    checkoutIntro:
      "Le ménage de fin de séjour est inclus, mais la cuisine et la vaisselle restent à votre charge. Quelques gestes avant de refermer la porte :",
    checkoutItems: [
      "Laisser la partie cuisine propre et rangée, vaisselle faite et remise en place.",
      "Descendre les poubelles jusqu'aux conteneurs — ceux devant lesquels vous vous êtes garé en arrivant.",
      "Couper le chauffage.",
      "Fermer les volets.",
      "Éteindre les lumières et les appareils.",
      "Verrouiller la porte et le casier à skis.",
    ],
    checkoutKeysNote:
      "Remettez un trousseau dans la boîte à clés et brouillez le code, puis laissez le second bien en évidence sur la table : la boîte est trop petite pour les deux.",
    contactTitle: "Un souci ?",
    contactIntro:
      "Écrivez-nous, nous répondons généralement en moins d'une heure. Une personne est également sur place en cas de besoin.",
    whatsappCta: "WhatsApp",
    phoneCta: "Appeler",
    emailCta: "Envoyer un e-mail",
    emergencyTitle: "Numéros d'urgence",
    emergencyLabels: {
      samu: "SAMU — urgences médicales",
      police: "Police et gendarmerie",
      firefighters: "Pompiers",
      european: "Urgence européenne et secours en montagne",
    },
    closing: "Bon séjour à Albiez !",
    seo: {
      title: "Guide d'arrivée",
      description:
        "Comment rejoindre l'appartement, du col du Mollard à la boîte à clés.",
    },
  },

  common: {
    metersAway: (m) => `à ${m} m`,
    backHome: "Retour à l'accueil",
  },
};
