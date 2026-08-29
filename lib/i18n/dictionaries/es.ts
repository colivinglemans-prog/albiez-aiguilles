import type { Dictionary } from "../types";
import { PROPERTY } from "../../property";

export const es: Dictionary = {
  header: {
    home: "Inicio",
    winter: "Invierno / Esquí",
    summer: "Verano / Lago",
    apartment: "El apartamento",
    location: "Ubicación",
    blog: "Guía",
    book: "Reservar",
    menu: "Menú",
    switchLanguage: "Cambiar de idioma",
  },

  home: {
    heroTitle: "Apartamento frente a las Aiguilles d'Arves",
    heroSubtitle:
      "A 1600 m de altitud en Albiez-Montrond, en un chalé tranquilo de la Maurienne. De 4 a 6 personas, balcón orientado al suroeste.",
    intro:
      "En la última planta de un pequeño chalé de la residencia Le Hameau des Aiguilles, nuestro apartamento familiar se abre a un balcón orientado al suroeste con vistas despejadas a las Aiguilles d'Arves. Las pistas, las tiendas y la escuela de esquí están a 250 metros. El lago y su club de equitación, a unos minutos a pie. Lo alquilamos todo el año.",
    chooseSeason: "Dos temporadas, dos estancias",
    chooseSeasonSubtitle:
      "Albiez no se recorre igual en invierno que en la temporada cálida. Elija la suya.",
    seasonCard: {
      hiver: {
        title: "El invierno esquiando",
        description:
          "40 km de pistas entre 1500 y 2060 m, acceso a pistas a 250 metros con la escuela de esquí y el club Piou-Piou, un amplio guardaesquís en el rellano y una raclette esperándole al volver.",
        cta: "Descubrir la temporada de esquí",
      },
      ete: {
        title: "El verano en el lago",
        description:
          "Baño vigilado en el lago a 350 metros, club de equitación a 300 metros, salidas de senderismo y de BTT al pie del chalé.",
        cta: "Descubrir la temporada de verano",
      },
    },
    offSeasonTitle: "¿Y fuera de temporada?",
    offSeasonText:
      "También alquilamos fuera de los periodos de afluencia, cuando la estación recupera su calma. Es el buen momento para el senderismo, la bicicleta, las raquetas de nieve o simplemente para disfrutar de las vistas sin cruzarse con nadie, a menudo al mejor precio del año. Digámoslo con claridad: fuera de temporada los remontes están cerrados, y también parte de los comercios y restaurantes del pueblo; el supermercado sigue abierto. Quien viene buscando tranquilidad la encuentra, pero conviene saberlo antes de reservar.",
    offSeasonExchange:
      "Fuera de temporada, el apartamento también se ofrece en intercambio en HomeExchange, a cambio de GuestPoints en lugar de alquiler. Una buena manera de descubrir la Maurienne si usted también es miembro.",
    offSeasonExchangeCta: "Ver el alojamiento en HomeExchange",
    offSeasonSponsorCta: "Registrarse con mi código de invitación",
    offSeasonSponsorNote:
      "¿Todavía no es miembro? Si se registra con mi código, ambos recibimos 250 GuestPoints.",
    seo: {
      title:
        "Apartamento en Albiez-Montrond — Esquí y lago frente a las Aiguilles d'Arves",
      description:
        "Apartamento para 4 a 6 personas en Albiez-Montrond (Saboya, 1600 m), a 250 m de las pistas y 350 m del lago. Balcón al suroeste, vistas a las Aiguilles d'Arves. Invierno, verano y temporada baja.",
      keywords: [
        "apartamento Albiez-Montrond",
        "alquiler esquí Alpes franceses",
        "apartamento esquí Saboya",
        "alquiler vacaciones Maurienne",
        "apartamento a pie de pista Francia",
        "estación de esquí Albiez alojamiento",
        "apartamento montaña 6 personas Francia",
        "vacaciones familia Alpes franceses",
        "Aiguilles d'Arves alojamiento",
        "lago Albiez baño",
      ],
    },
  },

  seasons: {
    hiver: {
      heading: "Esquí en Albiez: el apartamento a 250 m de las pistas",
      tagline: (p) => `Dominio esquiable abierto del ${p.du} al ${p.au}`,
      intro:
        "Albiez es una estación familiar de la Maurienne, a escala humana y sin colas. El dominio se extiende de 1500 a 2060 metros, con 40 km de pistas y 13 remontes. Desde el apartamento, 250 metros bastan para llegar al acceso a pistas, y allí está todo: la salida de las pistas, las tiendas, la escuela de esquí y el club Piou-Piou.",
      highlights: [
        {
          title: "Acceso a pistas a 250 m",
          description:
            "Salida de pistas, tiendas, escuela de esquí y club Piou-Piou están reunidos en el mismo sitio, a cinco minutos a pie. Un único trayecto al día.",
        },
        {
          title: "Amplio guardaesquís",
          description:
            "Un amplio guardaesquís le espera en el rellano, junto a la puerta del apartamento.",
        },
        {
          title: "Estación familiar",
          description:
            "40 km de pistas, 13 remontes, de 1500 a 2060 m. Suficiente para una semana, lo bastante tranquila para aprender.",
        },
        {
          title: "La vuelta al calor",
          description:
            "Raclette, fondue, crepera y piedra de asar en el apartamento. Además, trineos para los niños y juegos de mesa.",
        },
      ],
      activitiesTitle: "Qué hacer en Albiez en invierno",
      resortFacts: {
        pistes: "pistas",
        lifts: "remontes",
        snowGuns: "cañones de nieve",
      },
      activities: [
        {
          title: "El dominio, desde el telesilla de Les Échaux",
          description:
            "El telesilla de Les Échaux sale a 250 metros del apartamento y sube de 1600 a 1800 m: es la puerta de entrada al dominio, y detrás se abre todo — el Chef-lieu, Montrond y luego el telesquí de Les Aplanes, que culmina a 2100 m. La meseta es amplia, muy soleada y poco concurrida: aquí se aprende a esquiar con comodidad, no se vienen a buscar paredes.",
          link: {
            href: "/es/guide/domaine-skiable-albiez-secteur-mollard",
            label: "El dominio y los remontes del Mollard",
            internal: true,
          },
        },
        {
          title: "Empezar en la escuela de esquí",
          description:
            "La ESF y el club Piou-Piou están en el acceso a pistas, a 250 metros. Al reservar, elija la salida de Le Mollard: es la que está a 250 metros del apartamento. Las clases se llenan rápido; conviene reservar en cuanto tenga las fechas.",
          link: {
            href: PROPERTY.links.esf,
            label: "Reservar en la ESF de Albiez",
          },
        },
        {
          title: "El invierno fuera de las pistas",
          description:
            "La pista de trineos del Mollard está junto a la residencia, a pleno sol; su nieve no está garantizada, pero cuando abre llena una tarde entera. Además: raquetas de nieve, esquí de fondo, trineos tirados por perros, motos de nieve, parapente, aperitivo en un iglú. En el apartamento le esperan trineos para niños.",
          link: {
            href: "/es/guide/chiens-de-traineau-albiez",
            label: "Los trineos tirados por perros en Albiez",
            internal: true,
          },
        },
        {
          title: "Las tardes en el acceso a pistas",
          description:
            "Los martes de vacaciones escolares, el Albiez C'Show anima el acceso a pistas a 250 metros: bajada de antorchas con los monitores, espectáculo de máquinas pisanieves, fuegos artificiales y vino caliente gratis. Las demás tardes se pasa por el Sherpa al volver de esquiar, con los esquís en la mano, y la fondue se toma en el balcón.",
          link: {
            href: "/es/guide/albiez-c-show",
            label: "El Albiez C'Show, la fiesta del martes",
            internal: true,
          },
        },
        {
          title: "Les Sybelles, a 20 min en coche",
          description:
            "Albiez ofrece forfaits de 5 días más una jornada en Les Sybelles, cuyo acceso se hace por Saint-Jean-d'Arves. Es el cuarto dominio esquiable conectado de Francia y el primero de la Maurienne: 393 ha, 136 pistas de todos los niveles y seis estaciones unidas, de 1300 a 2620 m. Suficiente para cambiar de paisaje a mitad de semana sin cambiar de alojamiento.",
          link: {
            href: PROPERTY.links.sybelles,
            label: "Esquiar en Les Sybelles",
          },
        },
      ],
      activitiesMore: {
        text: "Dominio esquiable, alquiler de esquís, clases en la ESF, trineos tirados por perros, fiestas del martes: la guía lo detalla artículo por artículo, con las direcciones y la información práctica.",
        label: "Ver la guía de Albiez",
      },
      distanceLabels: {
        frontDeNeige: "Acceso a pistas",
        slopes: "Salida de las pistas",
        shops: "Tiendas",
        esf: "Escuela de esquí (ESF)",
        piouPiou: "Club infantil Piou-Piou",
      },
      resortLink: {
        alt: "Albiez, la Perla de los Alpes",
        label: "La web de la estación de Albiez",
      },
      banner: {
        alt: "Esquiadores en el dominio de Albiez, con el pueblo de chalés y las montañas nevadas al fondo",
        caption:
          "Un dominio muy soleado, el pueblo de chalés más abajo y las montañas de la Maurienne al fondo.",
      },
      pisteMap: {
        title: "El sector del Mollard",
        caption:
          "La flecha señala el apartamento: el acceso a pistas, la escuela de esquí y las tiendas están a 250 metros.",
      },
      seo: {
        title:
          "Alquiler esquí Albiez-Montrond — Apartamento 6 personas a 250 m de las pistas",
        description:
          "Apartamento de montaña en Albiez-Montrond, a 250 m de la salida de pistas, de la escuela de esquí y del club infantil. De 4 a 6 personas, guardaesquís, vistas a las Aiguilles d'Arves. Temporada 2026-2027.",
        keywords: [
          "alquiler esquí Albiez",
          "apartamento esquí Saboya",
          "esquiar en Francia alojamiento",
          "apartamento cerca de pistas Maurienne",
          "esquí en familia Alpes franceses",
          "apartamento 6 personas estación esquí",
          "vacaciones esquí Maurienne",
          "forfait Albiez Sybelles",
        ],
      },
    },

    ete: {
      heading: "El verano en Albiez: el lago, los caballos y la montaña",
      tagline: (p) => `Baño vigilado en el lago en ${p.mois}`,
      intro:
        "En verano, Albiez cambia de ritmo. El lago con baño vigilado está a 350 metros del apartamento, el club de equitación a 300 metros, y las salidas de senderismo y de BTT quedan al alcance inmediato. El balcón orientado al suroeste se convierte en la pieza principal de la casa, frente a las Aiguilles d'Arves.",
      highlights: [
        {
          title: "El lago a 350 m",
          description:
            "Baño vigilado durante el periodo estival, a unos minutos a pie del chalé.",
        },
        {
          title: "Equitación a 300 m",
          description:
            "El club de equitación del pueblo ofrece paseos en poni y salidas a caballo, al lado de casa.",
        },
        {
          title: "Senderismo y BTT desde la puerta",
          description:
            "Los itinerarios salen de las inmediaciones. Hay BTT eléctricas y patinetes eléctricos de alquiler en el pueblo.",
        },
        {
          title: "El balcón al suroeste",
          description:
            "Vista panorámica de las Aiguilles d'Arves y sol hasta el final de la tarde.",
        },
      ],
      activitiesTitle: "Qué hacer en Albiez en verano",
      activities: [
        {
          title: "Baño en el lago",
          description:
            "Baño vigilado en julio y agosto, a 350 metros. Suficiente para llenar las tardes calurosas sin coger el coche.",
        },
        {
          title: "Poni y caballo",
          description:
            "El club de equitación está a 300 metros: paseos en poni para los más pequeños, salidas a caballo para los demás.",
        },
        {
          title: "Senderismo",
          description:
            "Senderos para todos los niveles desde el pueblo, con las Aiguilles d'Arves como horizonte.",
        },
        {
          title: "Bicicleta y BTT eléctrica",
          description:
            "Alquiler de BTT eléctricas y patinetes eléctricos en el pueblo, para subir sin sufrir y bajar divirtiéndose.",
        },
      ],
      activitiesMore: {
        text: "Senderos señalizados, el col du Mollard en bicicleta, el lac du Mollard, el bosque de Le Rival, un refugio de altura: la guía lo detalla artículo por artículo, con las direcciones y la información práctica.",
        label: "Ver la guía de Albiez",
      },
      distanceLabels: {
        shops: "Tiendas del pueblo",
        riding: "Club de equitación",
        lake: "Lago con baño vigilado",
      },
      seo: {
        title:
          "Verano en Albiez-Montrond — Apartamento cerca del lago y de las rutas",
        description:
          "Apartamento para 4 a 6 personas en Albiez-Montrond, a 350 m del lago con baño vigilado y 300 m del club de equitación. Senderismo, BTT eléctrica, balcón con vistas a las Aiguilles d'Arves.",
        keywords: [
          "verano Albiez alquiler",
          "vacaciones verano Alpes franceses",
          "lago Albiez baño vigilado",
          "apartamento montaña verano Saboya",
          "senderismo Albiez-Montrond",
          "equitación Albiez",
          "BTT eléctrica Maurienne",
          "vacaciones familia montaña verano",
        ],
      },
    },
  },

  property: {
    title: "El apartamento",
    subtitle:
      "En la 2.ª y última planta de un chalé de la residencia Le Hameau des Aiguilles, a más de 1600 metros de altitud.",
    sleepingTitle: "Las plazas para dormir",
    bedrooms: "Dormitorio",
    alcove: "Rincón de montaña",
    living: "Salón",
    bedDouble: (w, l) => `1 cama doble de ${w} × ${l} cm`,
    bedBunk: (n, w, l) => `${n} camas superpuestas de ${w} × ${l} cm`,
    bedTrundle: (n, w, l) =>
      `Sofá cama nido, ${n} camas individuales de ${w} × ${l} cm`,
    capacity: (min, max) => `De ${min} a ${max} personas`,
    areaCarrez: (m2) => `${m2} m² útiles`,
    roomsSummary: "1 dormitorio + rincón de montaña",
    bedsCount: (n) => `${n} plazas`,
    // L'espagnol pluralise dès zéro : « 0 baños », « 1 baño ».
    bathroomsCount: (n) => (n !== 1 ? `${n} baños` : "1 baño"),
    bathroom: "Baño con bañera y toallero eléctrico, aseo independiente.",
    balcony:
      "Balcón orientado al suroeste con vista panorámica de las Aiguilles d'Arves.",
    amenitiesTitle: "El equipamiento",
    amenityGroups: [
      {
        title: "Cocina",
        items: [
          "Placa de cocción",
          "Lavavajillas",
          "Horno",
          "Microondas",
          "Nevera con congelador",
          "Tostadora",
          "Cafetera Nespresso y cafetera de filtro",
        ],
      },
      {
        title: "Especialidades de montaña",
        items: [
          "Raclette",
          "Fondue",
          "Piedra de asar",
          "Crepera",
        ],
      },
      {
        title: "Confort",
        items: [
          "Balcón al suroeste",
          "Baño con bañera",
          "Toallero eléctrico",
          "Aseo independiente",
          "Guardaesquís en el rellano",
        ],
      },
      {
        title: "Niños y ocio",
        items: [
          "Trineos para niños",
          "Juegos de mesa",
          "Una selección de libros",
          "Cuna de viaje con colchón (a petición)",
          "Trona (a petición)",
          "Trineo adaptado a los más pequeños (a petición)",
        ],
      },
    ],
    showAll: "Ver todo el equipamiento",
    showLess: "Ver menos",
  },

  linen: {
    title: "El pack de ropa de cama",
    subtitle: (price) =>
      `Los edredones y las almohadas están en el apartamento. Las sábanas y la toalla de baño son opcionales, ${price} € por persona.`,
    withLinen: "Con pack de ropa",
    withoutLinen: "Sin pack de ropa",
    providedTitle: "Incluido sin suplemento",
    providedIntro:
      "Los edredones y las almohadas le esperan en el apartamento, en número suficiente para seis personas:",
    itemLabel: (key, count) => {
      // L'espagnol pluralise dès zéro, contrairement au français, et accorde
      // l'adjectif au genre du nom : `edredón` est masculin, `almohada` féminin.
      const plural = (count ?? 0) !== 1;
      const labels: Record<string, string> = {
        duvetDouble: plural ? "edredones dobles" : "edredón doble",
        duvetSingle: plural ? "edredones individuales" : "edredón individual",
        pillow: plural ? "almohadas" : "almohada",
        // Non dénombré : toujours au pluriel.
        extraBlankets: "Mantas adicionales",
      };
      return labels[key] ?? key;
    },
    optionTitle: "Opcional",
    optionIntro: (price) =>
      `Por ${price} € por persona, la ropa de cama le espera en el apartamento. Indíquelo al reservar.`,
    optionItems: [
      "Sábanas y fundas de almohada",
      "Una toalla de baño por persona",
    ],
    notMadeNote:
      "Las camas no están hechas a su llegada: la ropa se pone a su disposición y usted la coloca.",
    byoNote:
      "¿Prefiere traer sus propias sábanas y toallas? Es posible, y en la montaña es incluso lo habitual. Prevea entonces ropa para una cama doble de 160 × 190 y camas individuales de 80 × 190.",
  },

  practical: {
    title: "Información práctica",
    accessTitle: "Llegada y acceso",
    stepsWarning:
      "Hay unos cincuenta escalones entre el aparcamiento y el apartamento. Es el precio de las vistas, pero conviene saberlo antes de reservar.",
    parking: "Aparcamiento exterior a 50 metros del chalé.",
    keyBox:
      "Caja de llaves: llega y se va con total autonomía, a la hora que le convenga.",
    skiLocker: "Amplio guardaesquís en el rellano.",
    onSiteContact: "Hay una persona en el pueblo por si surge algún problema.",
    servicesTitle: "Servicios",
    cleaning:
      "Limpieza final incluida, excepto la cocina y la vajilla, que quedan a su cargo.",
    linen: (price) =>
      `Ropa de cama y de baño opcional, ${price} € por persona.`,
    bringYourOwnTitle: "Para llevar en la maleta",
    bringYourOwn: [
      "Pastillas para el lavavajillas",
      "Bolsas de basura de 50 L",
      "Papel higiénico",
      "Cápsulas Nespresso",
    ],
    rulesTitle: "Normas",
    noPets: "No se admiten animales.",
    noSmoking: "Alojamiento para no fumadores.",
    babyKitTitle: "Kit de bebé, gratis a petición",
    babyKit:
      "Sin edad mínima: el alojamiento es adecuado para los más pequeños. El kit se presta sin suplemento; indíquenos al reservar qué material necesita.",
    babyKitItems: [
      "Cuna de viaje con colchón",
      "Trona",
      "Trineo de bebé",
    ],
  },

  location: {
    title: "Dónde está el apartamento",
    subtitle:
      "Chemin du Châtel, 73530 Albiez-Montrond — tranquilo, en el valle de la Maurienne.",
    resortTitle: "La estación de Albiez",
    resortDescription:
      "Una estación familiar de la Maurienne, entre 1500 y 2060 metros de altitud. Pistas suficientes para una semana, poca gente para aprender a esquiar.",
    openMaps: "Abrir en Google Maps",
    altitudeLabel: "Altitud del alojamiento",
    resortStats: {
      slopes: "de pistas",
      lifts: "remontes mecánicos",
      altitude: "de altitud",
    },
  },

  booking: {
    title: "Disponibilidad y reserva",
    subtitle: "Reserve directamente, sin intermediarios.",
    comingSoon: "Reserva directa disponible en breve",
    comingSoonText:
      "El calendario de disponibilidad en tiempo real llegará pronto a esta página. Hasta entonces, puede consultar las fechas libres y reservar en Airbnb, o escribirnos directamente para una estancia a medida.",
    bookOnAirbnb: "Ver la disponibilidad en Airbnb",
    contactUs: "Escríbanos",
  },

  awards: {
    title: "Distinciones",
    subtitle:
      "Lo que las plataformas de reserva destacan de las estancias aquí.",
    bookingLabel: "Traveller Review Award",
    yearLabel: (year) => `Edición ${year}`,
    outOf: (scale) => `sobre ${scale}`,
    consecutive: "Distinguido dos años consecutivos por Booking.com",
  },

  superhost: {
    title: "Alexandre es Superanfitrión en Airbnb",
    description:
      "Los Superanfitriones son anfitriones experimentados y muy bien valorados, comprometidos a ofrecer estancias excelentes.",
    profileLink: (n) => `Ver mis ${n} valoraciones en mi perfil de Airbnb`,
  },

  guestFavourite: {
    title: "Apartamento Favorito de los huéspedes en Airbnb",
    description:
      "Los alojamientos Favoritos de los huéspedes están entre los más apreciados de Airbnb, según las valoraciones, los comentarios y la fiabilidad.",
  },

  host: {
    title: "Su anfitrión: Alexandre",
    badge: "Superanfitrión",
    experience: (years) => `${years} años recibiendo en Albiez`,
    about: "Sobre Alexandre",
    aboutText:
      "Ingeniero, aficionado a la tecnología, deportista y manitas, soy superanfitrión desde hace varios años.\nMe importa ofrecer alojamientos limpios, cómodos y perfectamente funcionales.\nEstoy disponible y respondo rápido, dejándole al mismo tiempo mucha autonomía.",
    languages: "Idiomas",
    languagesValue: "Français, English",
    responseRate: "Índice de respuesta",
    responseRateValue: "Respuesta rápida — normalmente en menos de una hora",
    emailCta: "Escribirme",
    airbnbCta: "Contactarme en Airbnb",
    whatsappCta: "WhatsApp",
    whatsappMessage:
      "Hola Alexandre, me interesa su apartamento en Albiez.",
  },

  reviews: {
    title: "Lo que dicen los viajeros",
    subtitle: (count) => `${count} comentarios en Airbnb`,
    guestFavourite: "Favorito de los huéspedes",
    guestFavouriteNote:
      "Uno de los alojamientos preferidos de los viajeros en Airbnb, según las valoraciones, los comentarios y la fiabilidad del anuncio.",
    outOf: "sobre 5",
    categories: {
      cleanliness: "Limpieza",
      accuracy: "Exactitud",
      checkIn: "Llegada",
      communication: "Comunicación",
      location: "Ubicación",
      value: "Calidad-precio",
    },
    showAll: (count) => `Ver las ${count} valoraciones`,
    showLess: "Ver menos",
    seeOnAirbnb: "Leer todas las valoraciones en Airbnb",
    empty: "Todavía no hay valoraciones para esta temporada.",
    hostReply: "Respuesta de Alexandre",
    filter: {
      label: "Filtrar por periodo",
      all: "Todas",
      hiver: "Temporada de esquí",
      ete: "Temporada de verano",
      "hors-saison": "Fuera de temporada",
      offSeasonNote:
        "Estancias fuera de los periodos de apertura del dominio: remontes cerrados y parte de los comercios también. La estación está entonces mucho más tranquila.",
    },
  },

  gallery: {
    title: "En imágenes",
    empty: "Las fotos de esta temporada llegan muy pronto.",
    showAll: (count) => `Ver las ${count} fotos`,
    previous: "Foto anterior",
    next: "Foto siguiente",
    close: "Cerrar",
    counter: (i, total) => `${i} / ${total}`,
    expand: "Ampliar",
    zoomIn: "Tamaño real",
    zoomOut: "Vista general",
  },

  spaces: {
    subtitle:
      "La visita espacio por espacio. Salón, cocina y comedor comparten la misma pieza, abierta al suroeste sobre el balcón.",
    // L'espagnol pluralise dès zéro, contrairement au français.
    photoCount: (count) => (count !== 1 ? `${count} fotos` : "1 foto"),
    list: {
      salon: {
        title: "Salón",
        amenities: [
          "Sofá cama nido",
          "Juegos de mesa",
          "Libros y juguetes para niños",
          "Calefacción",
        ],
      },
      kitchenette: {
        title: "Cocina",
        amenities: [
          "Placa de cocción",
          "Horno",
          "Microondas",
          "Lavavajillas",
          "Nevera con congelador",
          "Cafetera Nespresso y cafetera de filtro",
          "Tostadora",
          "Vajilla, cubertería y copas de vino",
          "Detector de humo",
        ],
      },
      "espace-repas": {
        title: "Comedor",
        amenities: [
          "Mesa de comedor",
          "Raclette, fondue, piedra de asar y crepera",
          "Calefacción",
        ],
      },
      chambre: {
        title: "Dormitorio",
        amenities: [
          "Cama doble",
          "Armarios y perchas",
          "Almohadas y mantas adicionales",
          "Cuna de viaje (a petición)",
          "Calefacción",
        ],
      },
      "coin-montagne": {
        title: "Rincón de montaña",
        amenities: ["Camas superpuestas", "Calefacción"],
      },
      "salle-de-bains": {
        title: "Baño",
        amenities: [
          "Bañera",
          "Agua caliente",
          "Toallero eléctrico",
          "Tendedero",
          "Aseo independiente",
          "Productos de limpieza",
        ],
      },
      balcon: {
        title: "Balcón",
        amenities: [
          "Orientado al suroeste",
          "Vistas a las Aiguilles d'Arves",
          "Mesa y sillas",
          "Trineos",
        ],
      },
      exterieur: {
        title: "Exterior",
        amenities: [
          "Guardaesquís en el rellano",
          "Aparcamiento exterior",
          "Residencia Le Hameau des Aiguilles",
        ],
      },
    },
  },

  blog: {
    heading: "La guía de Albiez",
    subheading:
      "Nuestras referencias de habituales en Albiez-Montrond: senderos señalizados, alquiler de esquís, comercios del pueblo, actividades de verano y animaciones de la estación.",
    seasonBadge: { hiver: "Invierno", ete: "Verano" },
    yearRoundBadge: "Todo el año",
    filter: {
      label: "Filtrar la guía por temporada",
      all: "Todo el año",
      hiver: "Invierno",
      ete: "Verano",
      note: "Los temas válidos todo el año — comercios, senderismo, familia — siguen apareciendo en las dos temporadas.",
    },
    back: "← Volver a la guía",
    relatedTitle: "También le puede interesar",
    cta: {
      title: "Alojarse en Albiez",
      text: "Nuestro apartamento está en Le Mollard, a 250 m del acceso a pistas y de la salida de los senderos. Hasta 6 personas, balcón al sur frente a las Aiguilles d'Arves.",
      button: "Ver el alojamiento",
    },
    seo: {
      title:
        "Guía de Albiez-Montrond — senderismo, esquí, comercios y actividades",
      description:
        "Senderos señalizados, alquiler de esquís, escuela de esquí, comercios del pueblo, lac du Mollard, col du Mollard en bicicleta: la guía práctica de Albiez-Montrond escrita por habituales de la estación.",
      keywords: [
        "guía Albiez-Montrond",
        "qué hacer en Albiez",
        "senderismo Albiez-Montrond",
        "estación Albiez Maurienne",
        "Aiguilles d'Arves",
      ],
    },
  },

  footer: {
    navigation: "Navegación",
    contact: "Contacto",
    legal: "Información legal",
    copyright: "Todos los derechos reservados.",
    tagline: "Apartamento de montaña en Albiez-Montrond, Saboya.",
  },

  legal: {
    title: "Aviso legal",
    editorTitle: "Editor del sitio",
    hostTitle: "Alojamiento web",
    dataTitle: "Datos personales",
    dataText:
      "Este sitio no recoge ningún dato personal aparte de los mensajes que usted nos envía voluntariamente por correo electrónico. Las estadísticas de visitas son anónimas y no permiten identificarle. Para cualquier cuestión relativa a sus datos, escríbanos a la dirección indicada arriba.",
    labels: {
      legalName: "Denominación",
      legalForm: "Forma jurídica",
      siren: "SIREN",
      siret: "SIRET de la sede",
      capital: "Capital social",
      office: "Domicilio social",
      ape: "Código APE",
      contact: "Contacto",
    },
  },

  guide: {
    title: "Guía de llegada",
    intro:
      "Del col du Mollard hasta la puerta del apartamento, el camino en fotos. Cuente cinco minutos desde el puerto.",
    codeNote:
      "El código de la caja de llaves se le envía por mensaje antes de su llegada: no figura en esta página.",
    mapsCta: "Abrir el itinerario en Google Maps",
    stepLabel: (n) => `Paso ${n}`,
    steps: {
      mollard: {
        title: "En el col du Mollard, a la derecha",
        text: "Al llegar al col du Mollard, localice la bicicleta blanca con lunares rojos expuesta al borde de la carretera y gire a la derecha por el chemin du Châtel.",
      },
      residence: {
        title: "La residencia Le Hameau des Aiguilles",
        text: "El chalé está en la residencia Le Hameau des Aiguilles. A la entrada hay un primer aparcamiento señalizado: siga adelante en lugar de detenerse allí.",
      },
      parking: {
        title: "Aparcar junto a los contenedores",
        text: "Lo mejor es avanzar hasta los contenedores de basura y aparcar allí: es el punto más cercano a la escalera.",
      },
      escalier: {
        title: "La escalera junto a la piscina",
        text: "Frente a los contenedores, suba la escalera que bordea la piscina (actualmente en obras).",
      },
      chalet: {
        title: "El chalé",
        text: "Este es el chalé. El apartamento ocupa la última planta, la parte de madera: el balcón a la derecha, las ventanas de las habitaciones a la izquierda. Siga subiendo y pase por detrás del edificio.",
      },
      palier: {
        title: "La última escalera",
        text: "Suba la última escalera: el apartamento es la segunda puerta a la derecha en el rellano.",
      },
      porte: {
        title: "La puerta y el guardaesquís",
        text: "El guardaesquís está en el mismo rellano, justo al lado de la puerta, y lleva el mismo número.",
      },
      boiteAClef: {
        title: "La caja de llaves",
        text: "Está fijada en el marco izquierdo de la puerta. Baje la tapa negra, marque el código que le hemos enviado y después baje el botón negro a la izquierda de las ruedas para abrir. La llave grande abre la puerta, la pequeña el guardaesquís.",
      },
    },
    stairsNote: (steps) =>
      `Unos ${steps} escalones separan el aparcamiento del apartamento. ¡Las vistas hay que merecerlas!`,
    unitNote: (unit) =>
      `Puerta ${unit} — el guardaesquís lleva también el ${unit}.`,
    keyBoxSecurity:
      "Acuérdese de cerrar la caja y de descolocar el código después de cada uso. Queda a su disposición durante toda la estancia.",
    manualTitle: "El manual de la casa",
    panelTitle: "Si se ha cortado la corriente",
    panelIntro:
      "Normalmente, alguien ha pasado a comprobar que todo funciona antes de su llegada. Si no fuera así, el cuadro eléctrico está junto a la puerta de entrada.",
    panelMarkers: {
      breaker:
        "Interruptor general. Si se ha cortado la corriente, súbalo hacia arriba.",
      radiators: "Radiadores. Vuelve a poner en marcha la calefacción.",
      waterHeater:
        "Termo de agua caliente. Para forzar el calentamiento, empuje el botón de «auto» hacia «1», una sola vez.",
    },
    panelHotWaterNote:
      "Después de un corte, el agua caliente no suele volver hasta la mañana siguiente, salvo que fuerce el termo.",
    radiatorSwitchTitle: "¿Un radiador no calienta?",
    radiatorSwitchText:
      "Cada radiador, incluido el toallero, tiene un interruptor basculante 0 / 1 escondido detrás del aparato. Debe estar en 1. Compruébelo antes de buscar más lejos: es la causa más frecuente.",
    manualsTitle: "Manuales de los aparatos",
    manualsText:
      "Los manuales de los aparatos electrónicos están guardados en el cajón del mueble pequeño.",
    checkoutTitle: "Antes de irse",
    checkoutIntro:
      "La limpieza final está incluida, pero la cocina y la vajilla quedan a su cargo. Unos gestos antes de cerrar la puerta:",
    checkoutItems: [
      "Dejar la zona de cocina limpia y ordenada, la vajilla lavada y guardada.",
      "Bajar la basura hasta los contenedores, los mismos ante los que aparcó al llegar.",
      "Apagar la calefacción.",
      "Cerrar las contraventanas.",
      "Apagar las luces y los aparatos.",
      "Cerrar con llave la puerta y el guardaesquís.",
    ],
    checkoutKeysNote:
      "Deje un juego de llaves en la caja y descoloque el código; el segundo, déjelo bien visible sobre la mesa: la caja es demasiado pequeña para los dos.",
    contactTitle: "¿Algún problema?",
    contactIntro:
      "Escríbanos, respondemos normalmente en menos de una hora. También hay una persona en el pueblo si hace falta.",
    whatsappCta: "WhatsApp",
    phoneCta: "Llamar",
    emailCta: "Enviar un correo",
    emergencyTitle: "Números de emergencia",
    emergencyLabels: {
      samu: "SAMU — urgencias médicas",
      police: "Policía y gendarmería",
      firefighters: "Bomberos",
      european: "Emergencia europea y rescate en montaña",
    },
    closing: "¡Buena estancia en Albiez!",
    seo: {
      title: "Guía de llegada",
      description:
        "Cómo llegar al apartamento, del col du Mollard a la caja de llaves.",
    },
  },

  common: {
    metersAway: (m) => `a ${m} m`,
    backHome: "Volver al inicio",
  },
};
