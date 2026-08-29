import type { Dictionary } from "../types";
import { PROPERTY } from "../../property";

export const it: Dictionary = {
  header: {
    home: "Home",
    winter: "Inverno / Sci",
    summer: "Estate / Lago",
    apartment: "L'appartamento",
    location: "Posizione",
    blog: "Guida",
    book: "Prenota",
    menu: "Menu",
    switchLanguage: "Cambia lingua",
  },

  home: {
    heroTitle: "Appartamento di fronte alle Aiguilles d'Arves",
    heroSubtitle:
      "A 1600 m di quota ad Albiez-Montrond, in tranquillità in uno chalet della Maurienne. Da 4 a 6 persone, balcone esposto a sud-ovest.",
    intro:
      "All'ultimo piano di un piccolo chalet della residenza Le Hameau des Aiguilles, il nostro appartamento per famiglie si apre su un balcone esposto a sud-ovest con vista libera sulle Aiguilles d'Arves. Piste, negozi e scuola di sci sono a 250 metri. Il lago e il suo centro di equitazione a pochi minuti a piedi. Lo affittiamo tutto l'anno.",
    chooseSeason: "Due stagioni, due soggiorni",
    chooseSeasonSubtitle:
      "Albiez non si vive allo stesso modo d'inverno e nella bella stagione. Scegliete la vostra.",
    seasonCard: {
      hiver: {
        title: "L'inverno sugli sci",
        description:
          "40 km di piste tra 1500 e 2060 m, accesso alle piste a 250 metri con la scuola di sci e il club Piou-Piou, un ampio deposito sci sul pianerottolo e una raclette che vi aspetta al rientro.",
        cta: "Scoprire la stagione dello sci",
      },
      ete: {
        title: "L'estate al lago",
        description:
          "Balneazione sorvegliata al lago a 350 metri, centro di equitazione a 300 metri, partenze di escursioni e di mountain bike ai piedi dello chalet.",
        cta: "Scoprire la stagione estiva",
      },
    },
    offSeasonTitle: "E in bassa stagione?",
    offSeasonText:
      "Affittiamo anche fuori dai periodi di punta, quando la località ritrova la sua calma. È il momento giusto per le escursioni, la bicicletta, le ciaspole o semplicemente per godersi la vista senza incontrare nessuno, spesso alla tariffa migliore dell'anno. Diciamolo francamente: in bassa stagione gli impianti di risalita sono chiusi e anche una parte dei negozi e dei ristoranti del paese; il minimarket resta aperto. Chi cerca la tranquillità la trova, ma è meglio saperlo prima di prenotare.",
    offSeasonExchange:
      "Fuori stagione l'appartamento è proposto anche in scambio su HomeExchange, in cambio di GuestPoints invece che in affitto. Un buon modo per scoprire la Maurienne se anche voi siete iscritti.",
    offSeasonExchangeCta: "Vedere l'alloggio su HomeExchange",
    offSeasonSponsorCta: "Iscriversi con il mio codice invito",
    offSeasonSponsorNote:
      "Non siete ancora iscritti? Iscrivendovi con il mio codice, riceviamo entrambi 250 GuestPoints.",
    seo: {
      title:
        "Appartamento ad Albiez-Montrond — Sci e lago di fronte alle Aiguilles d'Arves",
      description:
        "Appartamento per 4-6 persone ad Albiez-Montrond (Savoia, 1600 m), a 250 m dalle piste e 350 m dal lago. Balcone a sud-ovest, vista sulle Aiguilles d'Arves. Inverno, estate e bassa stagione.",
      keywords: [
        "appartamento Albiez-Montrond",
        "appartamento sci Maurienne",
        "settimana bianca Francia appartamento",
        "affitto vacanze Savoia",
        "appartamento vicino alle piste Francia",
        "Albiez comprensorio sciistico alloggio",
        "appartamento montagna 6 persone Alpi francesi",
        "vacanze famiglia Maurienne",
        "Aiguilles d'Arves alloggio",
        "lago Albiez balneazione",
      ],
    },
  },

  seasons: {
    hiver: {
      heading: "Sci ad Albiez: l'appartamento a 250 m dalle piste",
      tagline: (p) => `Comprensorio aperto dal ${p.du} al ${p.au}`,
      intro:
        "Albiez è una località per famiglie della Maurienne, a misura d'uomo e senza code. Il comprensorio si estende da 1500 a 2060 metri, con 40 km di piste servite da 13 impianti di risalita. Dall'appartamento bastano 250 metri per raggiungere l'accesso alle piste, e lì c'è tutto: la partenza delle piste, i negozi, la scuola di sci e il club Piou-Piou.",
      highlights: [
        {
          title: "L'accesso alle piste a 250 m",
          description:
            "Partenza delle piste, negozi, scuola di sci e club Piou-Piou sono tutti riuniti nello stesso posto, a cinque minuti a piedi. Un solo tragitto al giorno.",
        },
        {
          title: "Ampio deposito sci",
          description:
            "Un ampio deposito sci vi attende sul pianerottolo, accanto alla porta dell'appartamento.",
        },
        {
          title: "Località per famiglie",
          description:
            "40 km di piste, 13 impianti, da 1500 a 2060 m. Abbastanza per una settimana, abbastanza tranquilla per imparare.",
        },
        {
          title: "Il rientro al caldo",
          description:
            "Apparecchio per raclette, per fonduta, per crêpe e pietra ollare in appartamento. Più slittini per i bambini e giochi da tavolo.",
        },
      ],
      activitiesTitle: "Cosa fare ad Albiez d'inverno",
      resortFacts: {
        pistes: "piste",
        lifts: "impianti",
        snowGuns: "cannoni da neve",
      },
      activities: [
        {
          title: "Il comprensorio, dalla seggiovia des Échaux",
          description:
            "La seggiovia des Échaux parte a 250 metri dall'appartamento e sale da 1600 a 1800 m: è la porta d'ingresso del comprensorio, e dietro si apre tutto — il Chef-lieu, Montrond, poi lo skilift des Aplanes che culmina a 2100 m. L'altopiano è ampio, molto soleggiato e poco frequentato: qui si impara a sciare con calma, non si vengono a cercare muri.",
          link: {
            href: "/it/guide/domaine-skiable-albiez-secteur-mollard",
            label: "Il comprensorio e gli impianti del Mollard",
            internal: true,
          },
        },
        {
          title: "Iniziare alla scuola di sci",
          description:
            "La ESF e il club Piou-Piou si trovano all'accesso alle piste, a 250 metri. Al momento della prenotazione scegliete la partenza di Le Mollard: è quella a 250 metri dall'appartamento. I corsi si riempiono in fretta, meglio prenotare appena avete le date.",
          link: {
            href: PROPERTY.links.esf,
            label: "Prenotare alla ESF di Albiez",
          },
        },
        {
          title: "L'inverno fuori pista",
          description:
            "La pista da slittino del Mollard è proprio accanto alla residenza, in pieno sole: l'innevamento non è garantito, ma quando è aperta occupa un intero pomeriggio. Per il resto: ciaspole, sci di fondo, cani da slitta, motoslitta, parapendio, aperitivo in un igloo. Nell'appartamento vi attendono slittini per bambini.",
          link: {
            href: "/it/guide/chiens-de-traineau-albiez",
            label: "I cani da slitta ad Albiez",
            internal: true,
          },
        },
        {
          title: "Le serate all'accesso alle piste",
          description:
            "Il martedì delle vacanze scolastiche l'Albiez C'Show anima l'accesso alle piste a 250 metri: fiaccolata con i maestri, spettacolo dei gatti delle nevi, fuochi d'artificio e vin brulé offerto. Le altre sere si passa allo Sherpa al rientro dallo sci, sci in mano, e la fonduta si mangia sul balcone.",
          link: {
            href: "/it/guide/albiez-c-show",
            label: "L'Albiez C'Show, la serata del martedì",
            internal: true,
          },
        },
        {
          title: "Les Sybelles, a 20 min di auto",
          description:
            "Albiez propone skipass di 5 giorni più una giornata a Les Sybelles, il cui accesso avviene da Saint-Jean-d'Arves. È il quarto comprensorio collegato di Francia e il primo della Maurienne: 393 ha, 136 piste per tutti i livelli e sei località collegate, da 1300 a 2620 m. Quanto basta per cambiare scenario a metà settimana senza cambiare alloggio.",
          link: {
            href: PROPERTY.links.sybelles,
            label: "Sciare a Les Sybelles",
          },
        },
      ],
      activitiesMore: {
        text: "Comprensorio sciistico, noleggio sci, corsi alla ESF, cani da slitta, serate del martedì: la guida approfondisce tutto questo articolo per articolo, con indirizzi e informazioni pratiche.",
        label: "Vedere la guida di Albiez",
      },
      distanceLabels: {
        frontDeNeige: "Accesso alle piste",
        slopes: "Partenza delle piste",
        shops: "Negozi",
        esf: "Scuola di sci (ESF)",
        piouPiou: "Club per bambini Piou-Piou",
      },
      resortLink: {
        alt: "Albiez, la Perla delle Alpi",
        label: "Il sito della località di Albiez",
      },
      banner: {
        alt: "Sciatori sul comprensorio di Albiez, con il paese di chalet e le montagne innevate sullo sfondo",
        caption:
          "Un comprensorio molto soleggiato, il paese di chalet più in basso e le montagne della Maurienne sullo sfondo.",
      },
      pisteMap: {
        title: "Il settore del Mollard",
        caption:
          "La freccia indica l'appartamento: l'accesso alle piste, la scuola di sci e i negozi sono a 250 metri.",
      },
      seo: {
        title:
          "Settimana bianca Albiez-Montrond — Appartamento 6 persone a 250 m dalle piste",
        description:
          "Appartamento di montagna ad Albiez-Montrond, a 250 m dalla partenza delle piste, dalla scuola di sci e dal club per bambini. Da 4 a 6 persone, deposito sci, vista sulle Aiguilles d'Arves. Stagione 2026-2027.",
        keywords: [
          "appartamento sci Albiez",
          "settimana bianca Maurienne",
          "appartamento sci Savoia",
          "alloggio vicino piste Alpi francesi",
          "sci in famiglia Francia",
          "appartamento 6 persone comprensorio sciistico",
          "vacanze sci Maurienne",
          "skipass Albiez Sybelles",
        ],
      },
    },

    ete: {
      heading: "L'estate ad Albiez: il lago, i cavalli e la montagna",
      tagline: (p) => `Balneazione sorvegliata al lago in ${p.mois}`,
      intro:
        "D'estate Albiez cambia ritmo. Il lago con la sua balneazione sorvegliata è a 350 metri dall'appartamento, il centro di equitazione a 300 metri, e le partenze di escursioni e di mountain bike sono a portata immediata. Il balcone esposto a sud-ovest diventa la stanza principale della casa, di fronte alle Aiguilles d'Arves.",
      highlights: [
        {
          title: "Il lago a 350 m",
          description:
            "Balneazione sorvegliata durante il periodo estivo, a pochi minuti a piedi dallo chalet.",
        },
        {
          title: "Equitazione a 300 m",
          description:
            "Il centro di equitazione del paese propone passeggiate in pony e uscite a cavallo, a due passi da casa.",
        },
        {
          title: "Escursioni e MTB dalla porta",
          description:
            "Gli itinerari partono nelle immediate vicinanze. Mountain bike elettriche e monopattini elettrici si noleggiano in paese.",
        },
        {
          title: "Il balcone a sud-ovest",
          description:
            "Vista panoramica sulle Aiguilles d'Arves e sole fino a fine serata.",
        },
      ],
      activitiesTitle: "Cosa fare ad Albiez d'estate",
      activities: [
        {
          title: "Bagno al lago",
          description:
            "Balneazione sorvegliata in luglio e agosto, a 350 metri. Quanto basta per riempire i pomeriggi caldi senza prendere l'auto.",
        },
        {
          title: "Pony e cavallo",
          description:
            "Il centro di equitazione è a 300 metri: passeggiate in pony per i più piccoli, uscite a cavallo per gli altri.",
        },
        {
          title: "Escursioni",
          description:
            "Sentieri per tutti i livelli con partenza dal paese, con le Aiguilles d'Arves davanti agli occhi.",
        },
        {
          title: "Bici e MTB elettrica",
          description:
            "Noleggio di mountain bike elettriche e monopattini elettrici in paese, per salire senza fatica e scendere divertendosi.",
        },
      ],
      activitiesMore: {
        text: "Sentieri segnalati, il col du Mollard in bici, il lac du Mollard, la foresta di Le Rival, un rifugio d'alta quota: la guida approfondisce tutto questo articolo per articolo, con indirizzi e informazioni pratiche.",
        label: "Vedere la guida di Albiez",
      },
      distanceLabels: {
        shops: "Negozi del paese",
        riding: "Centro di equitazione",
        lake: "Lago con balneazione sorvegliata",
      },
      seo: {
        title:
          "Estate ad Albiez-Montrond — Appartamento vicino al lago e ai sentieri",
        description:
          "Appartamento per 4-6 persone ad Albiez-Montrond, a 350 m dal lago con balneazione sorvegliata e 300 m dal centro di equitazione. Escursioni, MTB elettrica, balcone con vista sulle Aiguilles d'Arves.",
        keywords: [
          "estate Albiez affitto",
          "vacanze estate Alpi francesi",
          "lago Albiez balneazione sorvegliata",
          "appartamento montagna estate Savoia",
          "escursioni Albiez-Montrond",
          "equitazione Albiez",
          "MTB elettrica Maurienne",
          "vacanze famiglia montagna estate",
        ],
      },
    },
  },

  property: {
    title: "L'appartamento",
    subtitle:
      "Al 2° e ultimo piano di uno chalet della residenza Le Hameau des Aiguilles, a oltre 1600 metri di quota.",
    sleepingTitle: "I posti letto",
    bedrooms: "Camera",
    alcove: "Angolo montagna",
    living: "Soggiorno",
    bedDouble: (w, l) => `1 letto matrimoniale ${w} × ${l} cm`,
    bedBunk: (n, w, l) => `${n} letti a castello ${w} × ${l} cm`,
    bedTrundle: (n, w, l) =>
      `Divano letto con secondo letto estraibile, ${n} letti singoli ${w} × ${l} cm`,
    capacity: (min, max) => `Da ${min} a ${max} persone`,
    areaCarrez: (m2) => `${m2} m² calpestabili`,
    roomsSummary: "1 camera + angolo montagna",
    bedsCount: (n) => `${n} posti letto`,
    // L'italien pluralise dès zéro : « 0 bagni », « 1 bagno ».
    bathroomsCount: (n) => (n !== 1 ? `${n} bagni` : "1 bagno"),
    bathroom: "Bagno con vasca e scaldasalviette, WC separato.",
    balcony:
      "Balcone esposto a sud-ovest con vista panoramica sulle Aiguilles d'Arves.",
    amenitiesTitle: "Le dotazioni",
    amenityGroups: [
      {
        title: "Cucina",
        items: [
          "Piano cottura",
          "Lavastoviglie",
          "Forno",
          "Microonde",
          "Frigorifero con congelatore",
          "Tostapane",
          "Macchina Nespresso e caffettiera a filtro",
        ],
      },
      {
        title: "Specialità di montagna",
        items: [
          "Apparecchio per raclette",
          "Apparecchio per fonduta",
          "Pietra ollare",
          "Apparecchio per crêpe",
        ],
      },
      {
        title: "Comfort",
        items: [
          "Balcone a sud-ovest",
          "Bagno con vasca",
          "Scaldasalviette",
          "WC separato",
          "Deposito sci sul pianerottolo",
        ],
      },
      {
        title: "Bambini e tempo libero",
        items: [
          "Slittini per bambini",
          "Giochi da tavolo",
          "Una selezione di libri",
          "Culla da viaggio con materasso (su richiesta)",
          "Seggiolone (su richiesta)",
          "Slittino adatto ai più piccoli (su richiesta)",
        ],
      },
    ],
    showAll: "Vedere tutte le dotazioni",
    showLess: "Riduci",
  },

  linen: {
    title: "Il kit biancheria",
    subtitle: (price) =>
      `Piumini e cuscini sono in appartamento. Lenzuola e telo da bagno sono opzionali, ${price} € a persona.`,
    withLinen: "Con il kit biancheria",
    withoutLinen: "Senza il kit biancheria",
    providedTitle: "Fornito senza supplemento",
    providedIntro:
      "Piumini e cuscini vi attendono in appartamento, in numero sufficiente per sei persone:",
    itemLabel: (key, count) => {
      // L'italien pluralise dès zéro, contrairement au français, et accorde
      // l'adjectif au genre : `piumino` est masculin, `cuscino` aussi.
      const plural = (count ?? 0) !== 1;
      const labels: Record<string, string> = {
        duvetDouble: plural ? "piumini matrimoniali" : "piumino matrimoniale",
        duvetSingle: plural ? "piumini singoli" : "piumino singolo",
        pillow: plural ? "cuscini" : "cuscino",
        // Non dénombré : toujours au pluriel.
        extraBlankets: "Coperte aggiuntive",
      };
      return labels[key] ?? key;
    },
    optionTitle: "Opzionale",
    optionIntro: (price) =>
      `Per ${price} € a persona, la biancheria vi attende in appartamento. Da segnalare alla prenotazione.`,
    optionItems: [
      "Lenzuola e federe",
      "Un telo da bagno a persona",
    ],
    notMadeNote:
      "I letti non sono preparati al vostro arrivo: la biancheria è messa a disposizione, tocca a voi sistemarla.",
    byoNote:
      "Preferite portare le vostre lenzuola e i vostri asciugamani? Si può, ed è anzi l'uso in montagna. Prevedete allora biancheria per un letto matrimoniale da 160 × 190 e letti singoli da 80 × 190.",
  },

  practical: {
    title: "Informazioni pratiche",
    accessTitle: "Arrivo e accesso",
    stepsWarning:
      "Ci sono una cinquantina di gradini tra il parcheggio e l'appartamento. È il prezzo della vista, ma è meglio saperlo prima di prenotare.",
    parking: "Parcheggio esterno a 50 metri dallo chalet.",
    keyBox:
      "Cassetta portachiavi: arrivate e ripartite in autonomia, all'ora che vi conviene.",
    skiLocker: "Ampio deposito sci sul pianerottolo.",
    onSiteContact: "Una persona è sul posto in caso di problemi.",
    servicesTitle: "Servizi",
    cleaning:
      "Pulizia finale inclusa, escluse cucina e stoviglie che restano a vostro carico.",
    linen: (price) =>
      `Biancheria da letto e da bagno opzionale, ${price} € a persona.`,
    bringYourOwnTitle: "Da mettere in valigia",
    bringYourOwn: [
      "Tabs per la lavastoviglie",
      "Sacchi della spazzatura da 50 L",
      "Carta igienica",
      "Capsule Nespresso",
    ],
    rulesTitle: "Regolamento",
    noPets: "Gli animali non sono ammessi.",
    noSmoking: "Alloggio per non fumatori.",
    babyKitTitle: "Kit bebè, gratuito su richiesta",
    babyKit:
      "Nessuna età minima: l'alloggio è adatto ai più piccoli. Il kit è prestato senza supplemento; segnalateci alla prenotazione di che materiale avete bisogno.",
    babyKitItems: [
      "Culla da viaggio con materasso",
      "Seggiolone",
      "Slittino per bebè",
    ],
  },

  location: {
    title: "Dove si trova l'appartamento",
    subtitle:
      "Chemin du Châtel, 73530 Albiez-Montrond — in tranquillità, nella valle della Maurienne.",
    resortTitle: "La località di Albiez",
    resortDescription:
      "Una località per famiglie della Maurienne, tra 1500 e 2060 metri di quota. Piste abbastanza per una settimana, poca gente per imparare a sciare.",
    openMaps: "Aprire in Google Maps",
    altitudeLabel: "Quota dell'alloggio",
    resortStats: {
      slopes: "di piste",
      lifts: "impianti di risalita",
      altitude: "di quota",
    },
  },

  booking: {
    title: "Disponibilità e prenotazione",
    subtitle: "Prenotate direttamente, senza intermediari.",
    comingSoon: "Prenotazione diretta disponibile a breve",
    comingSoonText:
      "Il calendario delle disponibilità in tempo reale arriverà presto su questa pagina. Nel frattempo potete consultare le date libere e prenotare su Airbnb, oppure scriverci direttamente per un soggiorno su misura.",
    bookOnAirbnb: "Vedere le disponibilità su Airbnb",
    contactUs: "Scriveteci",
  },

  awards: {
    title: "Riconoscimenti",
    subtitle:
      "Ciò che le piattaforme di prenotazione rilevano dai soggiorni trascorsi qui.",
    bookingLabel: "Traveller Review Award",
    yearLabel: (year) => `Edizione ${year}`,
    outOf: (scale) => `su ${scale}`,
    consecutive: "Premiato due anni consecutivi da Booking.com",
  },

  superhost: {
    title: "Alexandre è Superhost su Airbnb",
    description:
      "I Superhost sono host esperti, molto ben valutati, che si impegnano a offrire soggiorni eccellenti.",
    profileLink: (n) => `Scoprire le mie ${n} recensioni sul mio profilo Airbnb`,
  },

  guestFavourite: {
    title: "Appartamento Preferito dagli ospiti su Airbnb",
    description:
      "Gli alloggi Preferiti dagli ospiti sono tra i più apprezzati su Airbnb, in base a valutazioni, recensioni e affidabilità.",
  },

  host: {
    title: "Il vostro host: Alexandre",
    badge: "Superhost",
    experience: (years) => `${years} anni di accoglienza ad Albiez`,
    about: "Su Alexandre",
    aboutText:
      "Ingegnere, appassionato di tecnologia, sportivo e con le mani in pasta, sono superhost da diversi anni.\nCi tengo a proporre alloggi puliti, confortevoli e perfettamente funzionanti.\nResto disponibile e reattivo, lasciandovi al tempo stesso grande autonomia.",
    languages: "Lingue",
    languagesValue: "Français, English",
    responseRate: "Tasso di risposta",
    responseRateValue: "Risposta rapida — di solito in meno di un'ora",
    emailCta: "Scrivermi",
    airbnbCta: "Contattarmi su Airbnb",
    whatsappCta: "WhatsApp",
    whatsappMessage:
      "Buongiorno Alexandre, sono interessato al vostro appartamento ad Albiez.",
  },

  reviews: {
    title: "Cosa dicono i viaggiatori",
    subtitle: (count) => `${count} recensioni su Airbnb`,
    guestFavourite: "Preferito dagli ospiti",
    guestFavouriteNote:
      "Uno degli alloggi preferiti dai viaggiatori su Airbnb, in base alle valutazioni, ai commenti e all'affidabilità dell'annuncio.",
    outOf: "su 5",
    categories: {
      cleanliness: "Pulizia",
      accuracy: "Precisione",
      checkIn: "Check-in",
      communication: "Comunicazione",
      location: "Posizione",
      value: "Qualità-prezzo",
    },
    showAll: (count) => `Vedere tutte le ${count} recensioni`,
    showLess: "Riduci",
    seeOnAirbnb: "Leggere tutte le recensioni su Airbnb",
    empty: "Non ci sono ancora recensioni per questa stagione.",
    hostReply: "Risposta di Alexandre",
    filter: {
      label: "Filtrare per periodo",
      all: "Tutte",
      hiver: "Stagione sciistica",
      ete: "Stagione estiva",
      "hors-saison": "Bassa stagione",
      offSeasonNote:
        "Soggiorni fuori dai periodi di apertura del comprensorio: impianti chiusi e anche una parte dei negozi. La località è allora molto più tranquilla.",
    },
  },

  gallery: {
    title: "In immagini",
    empty: "Le foto di questa stagione arrivano molto presto.",
    showAll: (count) => `Vedere tutte le ${count} foto`,
    previous: "Foto precedente",
    next: "Foto successiva",
    close: "Chiudi",
    counter: (i, total) => `${i} / ${total}`,
    expand: "Ingrandisci",
    zoomIn: "Dimensione reale",
    zoomOut: "Vista d'insieme",
  },

  spaces: {
    subtitle:
      "La visita spazio per spazio. Soggiorno, angolo cottura e zona pranzo condividono la stessa stanza, aperta a sud-ovest sul balcone.",
    // L'italien pluralise dès zéro, contrairement au français.
    photoCount: (count) => (count !== 1 ? `${count} foto` : "1 foto"),
    list: {
      salon: {
        title: "Soggiorno",
        amenities: [
          "Divano letto con secondo letto estraibile",
          "Giochi da tavolo",
          "Libri e giocattoli per bambini",
          "Riscaldamento",
        ],
      },
      kitchenette: {
        title: "Angolo cottura",
        amenities: [
          "Piano cottura",
          "Forno",
          "Forno a microonde",
          "Lavastoviglie",
          "Frigorifero con congelatore",
          "Macchina Nespresso e caffettiera a filtro",
          "Tostapane",
          "Stoviglie, posate e calici da vino",
          "Rilevatore di fumo",
        ],
      },
      "espace-repas": {
        title: "Zona pranzo",
        amenities: [
          "Tavolo da pranzo",
          "Raclette, fonduta, pietra ollare e crêpiera",
          "Riscaldamento",
        ],
      },
      chambre: {
        title: "Camera",
        amenities: [
          "Letto matrimoniale",
          "Armadi e grucce",
          "Cuscini e coperte aggiuntivi",
          "Culla da viaggio (su richiesta)",
          "Riscaldamento",
        ],
      },
      "coin-montagne": {
        title: "Angolo montagna",
        amenities: ["Letti a castello", "Riscaldamento"],
      },
      "salle-de-bains": {
        title: "Bagno",
        amenities: [
          "Vasca",
          "Acqua calda",
          "Scaldasalviette",
          "Stendibiancheria",
          "WC separato",
          "Prodotti per la pulizia",
        ],
      },
      balcon: {
        title: "Balcone",
        amenities: [
          "Esposto a sud-ovest",
          "Vista sulle Aiguilles d'Arves",
          "Tavolo e sedie",
          "Slittini",
        ],
      },
      exterieur: {
        title: "Esterni",
        amenities: [
          "Deposito sci sul pianerottolo",
          "Parcheggio esterno",
          "Residenza Le Hameau des Aiguilles",
        ],
      },
    },
  },

  blog: {
    heading: "La guida di Albiez",
    subheading:
      "I nostri riferimenti da habitué su Albiez-Montrond: sentieri segnalati, noleggio sci, negozi del paese, attività estive e animazioni della località.",
    seasonBadge: { hiver: "Inverno", ete: "Estate" },
    yearRoundBadge: "Tutto l'anno",
    filter: {
      label: "Filtrare la guida per stagione",
      all: "Tutto l'anno",
      hiver: "Inverno",
      ete: "Estate",
      note: "I temi validi tutto l'anno — negozi, escursioni, famiglia — restano visibili in entrambe le stagioni.",
    },
    back: "← Torna alla guida",
    relatedTitle: "Da leggere anche",
    cta: {
      title: "Soggiornare ad Albiez",
      text: "Il nostro appartamento si trova a Le Mollard, a 250 m dall'accesso alle piste e dalla partenza dei sentieri. Fino a 6 persone, balcone a sud di fronte alle Aiguilles d'Arves.",
      button: "Vedere l'alloggio",
    },
    seo: {
      title:
        "Guida di Albiez-Montrond — escursioni, sci, negozi e attività",
      description:
        "Sentieri segnalati, noleggio sci, scuola di sci, negozi del paese, lac du Mollard, col du Mollard in bici: la guida pratica di Albiez-Montrond scritta da habitué della località.",
      keywords: [
        "guida Albiez-Montrond",
        "cosa fare ad Albiez",
        "escursioni Albiez-Montrond",
        "comprensorio Albiez Maurienne",
        "Aiguilles d'Arves",
      ],
    },
  },

  footer: {
    navigation: "Navigazione",
    contact: "Contatti",
    legal: "Informazioni legali",
    copyright: "Tutti i diritti riservati.",
    tagline: "Appartamento di montagna ad Albiez-Montrond, Savoia.",
  },

  legal: {
    title: "Note legali",
    editorTitle: "Editore del sito",
    hostTitle: "Hosting",
    dataTitle: "Dati personali",
    dataText:
      "Questo sito non raccoglie alcun dato personale al di fuori dei messaggi che ci inviate volontariamente per e-mail. Le statistiche di visita sono anonime e non permettono di identificarvi. Per qualsiasi domanda relativa ai vostri dati, scriveteci all'indirizzo indicato sopra.",
    labels: {
      legalName: "Denominazione",
      legalForm: "Forma giuridica",
      siren: "SIREN",
      siret: "SIRET della sede",
      capital: "Capitale sociale",
      office: "Sede legale",
      ape: "Codice APE",
      contact: "Contatti",
    },
  },

  guide: {
    title: "Guida all'arrivo",
    intro:
      "Dal col du Mollard fino alla porta dell'appartamento, il percorso in foto. Calcolate cinque minuti dal passo.",
    codeNote:
      "Il codice della cassetta portachiavi vi viene inviato per messaggio prima dell'arrivo: non figura su questa pagina.",
    mapsCta: "Aprire l'itinerario in Google Maps",
    stepLabel: (n) => `Tappa ${n}`,
    steps: {
      mollard: {
        title: "Al col du Mollard, a destra",
        text: "Arrivando al col du Mollard, individuate la bicicletta bianca a pois rossi esposta sul bordo della strada, poi girate a destra sul chemin du Châtel.",
      },
      residence: {
        title: "La residenza Le Hameau des Aiguilles",
        text: "Lo chalet si trova nella residenza Le Hameau des Aiguilles. All'ingresso è segnalato un primo parcheggio: continuate ad avanzare invece di fermarvi lì.",
      },
      parking: {
        title: "Parcheggiare vicino ai contenitori",
        text: "Meglio avanzare fino ai contenitori dei rifiuti e parcheggiare lì: è il punto più vicino alla scala.",
      },
      escalier: {
        title: "La scala lungo la piscina",
        text: "Di fronte ai contenitori, salite la scala che costeggia la piscina (attualmente in ristrutturazione).",
      },
      chalet: {
        title: "Lo chalet",
        text: "Ecco lo chalet. L'appartamento occupa l'ultimo piano, la parte in legno: il balcone a destra, le finestre delle camere a sinistra. Continuate a salire e passate dietro l'edificio.",
      },
      palier: {
        title: "L'ultima scala",
        text: "Salite l'ultima scala: l'appartamento è la seconda porta a destra sul pianerottolo.",
      },
      porte: {
        title: "La porta e il deposito sci",
        text: "Il deposito sci si trova sullo stesso pianerottolo, proprio accanto alla porta, e porta lo stesso numero.",
      },
      boiteAClef: {
        title: "La cassetta portachiavi",
        text: "È fissata sullo stipite sinistro della porta. Fate scendere il coperchio nero, componete il codice che vi è stato trasmesso, poi abbassate il pulsante nero a sinistra delle rotelle per aprire. La chiave grande apre la porta, quella piccola il deposito sci.",
      },
    },
    stairsNote: (steps) =>
      `Circa ${steps} gradini separano il parcheggio dall'appartamento. La vista va meritata!`,
    unitNote: (unit) =>
      `Porta ${unit} — anche il deposito sci porta il ${unit}.`,
    keyBoxSecurity:
      "Ricordatevi di richiudere la cassetta e di scombinare il codice dopo ogni uso. Resta a vostra disposizione per tutto il soggiorno.",
    manualTitle: "Il manuale della casa",
    panelTitle: "Se manca la corrente",
    panelIntro:
      "Normalmente qualcuno è passato a verificare che tutto funzioni prima del vostro arrivo. Se non fosse così, il quadro elettrico è accanto alla porta d'ingresso.",
    panelMarkers: {
      breaker:
        "Interruttore generale. Se manca la corrente, alzatelo verso l'alto.",
      radiators: "Radiatori. Rimette in funzione il riscaldamento.",
      waterHeater:
        "Boiler dell'acqua calda. Per forzare il riscaldamento, spingete il pulsante da «auto» verso «1», una sola volta.",
    },
    panelHotWaterNote:
      "Dopo un'interruzione, l'acqua calda torna in genere solo la mattina seguente, a meno che non forziate il boiler.",
    radiatorSwitchTitle: "Un radiatore non scalda?",
    radiatorSwitchText:
      "Ogni radiatore, scaldasalviette compreso, ha un interruttore a bilanciere 0 / 1 nascosto dietro l'apparecchio. Deve essere su 1. Verificatelo prima di cercare altrove: è la causa più frequente.",
    manualsTitle: "Istruzioni degli apparecchi",
    manualsText:
      "Le istruzioni degli apparecchi elettronici sono riposte nel cassetto del mobiletto.",
    checkoutTitle: "Prima di partire",
    checkoutIntro:
      "La pulizia finale è inclusa, ma cucina e stoviglie restano a vostro carico. Qualche gesto prima di richiudere la porta:",
    checkoutItems: [
      "Lasciare la zona cucina pulita e in ordine, stoviglie lavate e riposte.",
      "Portare i rifiuti ai contenitori, quelli davanti ai quali avete parcheggiato all'arrivo.",
      "Spegnere il riscaldamento.",
      "Chiudere le persiane.",
      "Spegnere luci e apparecchi.",
      "Chiudere a chiave la porta e il deposito sci.",
    ],
    checkoutKeysNote:
      "Rimettete un mazzo di chiavi nella cassetta e scombinate il codice, poi lasciate il secondo bene in vista sul tavolo: la cassetta è troppo piccola per entrambi.",
    contactTitle: "Un problema?",
    contactIntro:
      "Scriveteci, rispondiamo di solito in meno di un'ora. Una persona è inoltre sul posto in caso di necessità.",
    whatsappCta: "WhatsApp",
    phoneCta: "Chiamare",
    emailCta: "Inviare un'e-mail",
    emergencyTitle: "Numeri di emergenza",
    emergencyLabels: {
      samu: "SAMU — emergenze mediche",
      police: "Polizia e gendarmeria",
      firefighters: "Vigili del fuoco",
      european: "Emergenza europea e soccorso alpino",
    },
    closing: "Buon soggiorno ad Albiez!",
    seo: {
      title: "Guida all'arrivo",
      description:
        "Come raggiungere l'appartamento, dal col du Mollard alla cassetta portachiavi.",
    },
  },

  common: {
    metersAway: (m) => `a ${m} m`,
    backHome: "Torna alla home",
  },
};
