import type { Dictionary } from "../types";
import { PROPERTY } from "../../property";

export const de: Dictionary = {
  header: {
    home: "Startseite",
    winter: "Winter / Ski",
    summer: "Sommer / See",
    apartment: "Die Wohnung",
    location: "Lage",
    blog: "Reiseführer",
    book: "Buchen",
    menu: "Menü",
    switchLanguage: "Sprache wechseln",
  },

  home: {
    heroTitle: "Ferienwohnung mit Blick auf die Aiguilles d'Arves",
    heroSubtitle:
      "Auf 1.600 m Höhe in Albiez-Montrond, ruhig gelegen in einem Chalet in der Maurienne. 4 bis 6 Personen, Balkon nach Südwesten.",
    intro:
      "Im obersten Stock eines kleinen Chalets der Residenz Le Hameau des Aiguilles öffnet sich unsere Familienwohnung auf einen nach Südwesten ausgerichteten Balkon mit freiem Blick auf die Aiguilles d'Arves. Pisten, Geschäfte und Skischule liegen 250 Meter entfernt. Zum See und zum Reitzentrum sind es wenige Minuten zu Fuß. Wir vermieten das ganze Jahr über.",
    chooseSeason: "Zwei Jahreszeiten, zwei Aufenthalte",
    chooseSeasonSubtitle:
      "Albiez erlebt man im Winter anders als in der warmen Jahreszeit. Wählen Sie Ihre Saison.",
    seasonCard: {
      hiver: {
        title: "Winter zum Skifahren",
        description:
          "40 km Pisten zwischen 1.500 und 2.060 m, Pistenzugang in 250 Metern mit Skischule und Kinderskiclub Piou-Piou, ein großer Skiraum auf dem Treppenabsatz und ein Raclette, das nach dem Skitag auf Sie wartet.",
        cta: "Die Skisaison entdecken",
      },
      ete: {
        title: "Sommer am See",
        description:
          "Bewachter Badebetrieb am See in 350 Metern, Reitzentrum in 300 Metern, Wander- und Mountainbike-Einstiege direkt am Chalet.",
        cta: "Die Sommersaison entdecken",
      },
    },
    offSeasonTitle: "Und in der Nebensaison?",
    offSeasonText:
      "Wir vermieten auch außerhalb der Hauptzeiten, wenn der Ort zur Ruhe kommt. Das ist die richtige Zeit für Wanderungen, Radtouren, Schneeschuhe – oder einfach für die Aussicht, ohne jemandem zu begegnen, oft zum besten Preis des Jahres. Sagen wir es offen: in der Nebensaison sind die Bergbahnen geschlossen und ein Teil der Geschäfte und Restaurants im Dorf ebenfalls; der Lebensmittelladen bleibt geöffnet. Wer die Ruhe sucht, kommt hier auf seine Kosten – aber man sollte es vor der Buchung wissen.",
    offSeasonExchange:
      "Außerhalb der Saison steht die Wohnung auch bei HomeExchange zum Tausch gegen GuestPoints statt zur Miete. Eine gute Gelegenheit, die Maurienne kennenzulernen, wenn Sie selbst Mitglied sind.",
    offSeasonExchangeCta: "Die Wohnung auf HomeExchange ansehen",
    offSeasonSponsorCta: "Mit meinem Empfehlungscode registrieren",
    offSeasonSponsorNote:
      "Noch kein Mitglied? Wenn Sie sich mit meinem Code anmelden, erhalten wir beide 250 GuestPoints.",
    seo: {
      title:
        "Ferienwohnung Albiez-Montrond — Ski und See vor den Aiguilles d'Arves",
      description:
        "Ferienwohnung für 4 bis 6 Personen in Albiez-Montrond (Savoyen, 1.600 m), 250 m von den Pisten und 350 m vom See. Südwestbalkon, Blick auf die Aiguilles d'Arves. Winter, Sommer und Nebensaison.",
      keywords: [
        "Ferienwohnung Albiez-Montrond",
        "Skiwohnung Savoyen",
        "Ferienwohnung Maurienne",
        "Skiurlaub Frankreich Wohnung",
        "Wohnung direkt an der Piste Albiez",
        "Skigebiet Albiez Unterkunft",
        "Ferienwohnung Französische Alpen 6 Personen",
        "Familienurlaub Maurienne",
        "Aiguilles d'Arves Unterkunft",
        "Badesee Albiez",
      ],
    },
  },

  seasons: {
    hiver: {
      heading: "Skifahren in Albiez: die Wohnung 250 m von den Pisten",
      tagline: (p) => `Skigebiet geöffnet vom ${p.du} bis ${p.au}`,
      intro:
        "Albiez ist ein familiäres Skigebiet in der Maurienne, überschaubar und ohne Warteschlangen. Es reicht von 1.500 bis 2.060 Meter, mit 40 km Pisten und 13 Bergbahnen. Von der Wohnung sind es 250 Meter bis zum Pistenzugang – und dort ist alles beieinander: Pistenstart, Geschäfte, Skischule und Kinderskiclub Piou-Piou.",
      highlights: [
        {
          title: "Pistenzugang in 250 m",
          description:
            "Pistenstart, Geschäfte, Skischule und Kinderskiclub Piou-Piou liegen alle am selben Ort, fünf Minuten zu Fuß. Ein einziger Weg pro Tag.",
        },
        {
          title: "Großer Skiraum",
          description:
            "Ein großer Skiraum erwartet Sie auf dem Treppenabsatz, direkt an der Wohnungstür.",
        },
        {
          title: "Familiäres Skigebiet",
          description:
            "40 km Pisten, 13 Bergbahnen, von 1.500 bis 2.060 m. Genug für eine Woche, ruhig genug zum Lernen.",
        },
        {
          title: "Heimkommen ins Warme",
          description:
            "Raclette-, Fondue-, Crêpes- und Pierrade-Gerät sind vorhanden. Dazu Schlitten für die Kinder und Gesellschaftsspiele.",
        },
      ],
      activitiesTitle: "Was man im Winter in Albiez unternimmt",
      resortFacts: {
        pistes: "Pisten",
        lifts: "Bergbahnen",
        snowGuns: "Schneekanonen",
      },
      activities: [
        {
          title: "Das Skigebiet, ab dem Sessellift Les Échaux",
          description:
            "Der Sessellift Les Échaux startet 250 Meter von der Wohnung und führt von 1.600 auf 1.800 m: er ist das Tor zum Skigebiet, und dahinter öffnet sich alles – Chef-lieu, Montrond und dann der Schlepplift Les Aplanes, der auf 2.100 m endet. Das Plateau ist weit, sehr sonnig und wenig überlaufen: hier lernt man in Ruhe Skifahren, steile Wände sucht man vergebens.",
          link: {
            href: "/de/guide/domaine-skiable-albiez-secteur-mollard",
            label: "Das Skigebiet und die Bahnen am Mollard",
            internal: true,
          },
        },
        {
          title: "Anfangen in der Skischule",
          description:
            "Die französische Skischule ESF und der Kinderskiclub Piou-Piou liegen am Pistenzugang in 250 Metern. Wählen Sie bei der Buchung den Einstieg Le Mollard: das ist derjenige, der 250 Meter von der Wohnung entfernt liegt. Die Kurse füllen sich schnell – am besten buchen, sobald Ihre Daten feststehen.",
          link: {
            href: PROPERTY.links.esf,
            label: "Bei der ESF Albiez buchen",
          },
        },
        {
          title: "Winter abseits der Pisten",
          description:
            "Die Rodelbahn am Mollard liegt direkt neben der Residenz, in voller Sonne – Schneesicherheit gibt es keine, aber wenn sie offen ist, füllt sie einen ganzen Nachmittag. Dazu: Schneeschuhe, Langlauf, Hundeschlitten, Motorschlitten, Gleitschirm, Aperitif im Iglu. Kinderschlitten warten in der Wohnung.",
          link: {
            href: "/de/guide/chiens-de-traineau-albiez",
            label: "Hundeschlittenfahrten in Albiez",
            internal: true,
          },
        },
        {
          title: "Abende am Pistenzugang",
          description:
            "Dienstags in den Schulferien belebt die Albiez C'Show den Pistenzugang in 250 Metern: Fackelabfahrt mit den Skilehrern, Pistenraupen-Show, Feuerwerk und Glühwein zum Mitnehmen. An den anderen Abenden kehrt man mit den Skiern in der Hand ins Sherpa ein, und das Fondue kommt auf den Balkon.",
          link: {
            href: "/de/guide/albiez-c-show",
            label: "Die Albiez C'Show am Dienstagabend",
            internal: true,
          },
        },
        {
          title: "Les Sybelles, 20 Autominuten entfernt",
          description:
            "Albiez bietet Skipässe für 5 Tage plus einen Tag in Les Sybelles, dessen Zugang über Saint-Jean-d'Arves führt. Es ist das viertgrößte zusammenhängende Skigebiet Frankreichs und das größte der Maurienne: 393 ha, 136 Pisten für alle Niveaus und sechs verbundene Orte, von 1.300 bis 2.620 m. Genug, um mitten in der Woche die Kulisse zu wechseln, ohne die Wohnung zu wechseln.",
          link: {
            href: PROPERTY.links.sybelles,
            label: "Skifahren in Les Sybelles",
          },
        },
      ],
      activitiesMore: {
        text: "Skigebiet, Skiverleih, Kurse bei der ESF, Hundeschlitten, Dienstagabende: der Reiseführer behandelt all das Artikel für Artikel, mit Adressen und praktischen Hinweisen.",
        label: "Den Reiseführer für Albiez ansehen",
      },
      distanceLabels: {
        frontDeNeige: "Pistenzugang",
        slopes: "Pistenstart",
        shops: "Geschäfte",
        esf: "Skischule (ESF)",
        piouPiou: "Kinderskiclub Piou-Piou",
      },
      resortLink: {
        alt: "Albiez, die Perle der Alpen",
        label: "Die Website des Skigebiets Albiez",
      },
      banner: {
        alt: "Skifahrer im Skigebiet von Albiez, im Hintergrund das Chaletdorf und die schneebedeckten Berge",
        caption:
          "Ein ausgesprochen sonniges Skigebiet, darunter das Chaletdorf und im Hintergrund die Berge der Maurienne.",
      },
      pisteMap: {
        title: "Der Sektor Le Mollard",
        caption:
          "Der Pfeil markiert die Wohnung: Pistenzugang, Skischule und Geschäfte liegen 250 Meter entfernt.",
      },
      seo: {
        title:
          "Skiwohnung Albiez-Montrond — Ferienwohnung für 6 Personen, 250 m zur Piste",
        description:
          "Bergwohnung in Albiez-Montrond, 250 m vom Pistenstart, von der Skischule und vom Kinderskiclub. 4 bis 6 Personen, Skiraum, Blick auf die Aiguilles d'Arves. Saison 2026/2027.",
        keywords: [
          "Skiwohnung Albiez",
          "Ferienwohnung Skigebiet Savoyen",
          "Skiurlaub Maurienne",
          "Unterkunft nahe Piste Frankreich",
          "Familienskiurlaub Französische Alpen",
          "Ferienwohnung 6 Personen Skigebiet",
          "Skiwohnung günstig Savoyen",
          "Albiez Skipass Sybelles",
        ],
      },
    },

    ete: {
      heading: "Sommer in Albiez: der See, die Pferde und die Berge",
      tagline: (p) => `Bewachter Badebetrieb am See im ${p.mois}`,
      intro:
        "Im Sommer wechselt Albiez den Rhythmus. Der See mit bewachtem Badebetrieb liegt 350 Meter von der Wohnung, das Reitzentrum 300 Meter, und die Wander- und Mountainbike-Einstiege sind unmittelbar erreichbar. Der nach Südwesten ausgerichtete Balkon wird zum Hauptraum der Wohnung, gegenüber den Aiguilles d'Arves.",
      highlights: [
        {
          title: "Der See in 350 m",
          description:
            "Bewachter Badebetrieb in der Sommerzeit, wenige Minuten zu Fuß vom Chalet.",
        },
        {
          title: "Reiten in 300 m",
          description:
            "Das Reitzentrum des Dorfes bietet Ponyausritte und Ausritte zu Pferd, gleich neben Ihrer Tür.",
        },
        {
          title: "Wandern und Biken ab Haustür",
          description:
            "Die Routen beginnen in unmittelbarer Nähe. E-Mountainbikes und E-Scooter können vor Ort gemietet werden.",
        },
        {
          title: "Der Südwestbalkon",
          description:
            "Panoramablick auf die Aiguilles d'Arves und Sonne bis zum Ende des Abends.",
        },
      ],
      activitiesTitle: "Was man im Sommer in Albiez unternimmt",
      activities: [
        {
          title: "Baden am See",
          description:
            "Bewachter Badebetrieb im Juli und August, 350 Meter entfernt. Genug, um heiße Nachmittage zu füllen, ohne ins Auto zu steigen.",
        },
        {
          title: "Pony und Pferd",
          description:
            "Das Reitzentrum liegt 300 Meter entfernt: Ponyausritte für die Kleinsten, Ausritte zu Pferd für die anderen.",
        },
        {
          title: "Wandern",
          description:
            "Wege für jedes Niveau ab dem Dorf, mit den Aiguilles d'Arves im Blick.",
        },
        {
          title: "Rad und E-Mountainbike",
          description:
            "Verleih von E-Mountainbikes und E-Scootern vor Ort: bergauf ohne Mühe, bergab mit Vergnügen.",
        },
      ],
      activitiesMore: {
        text: "Markierte Wanderwege, der Col du Mollard mit dem Rad, der Lac du Mollard, der Wald von Le Rival, eine Berghütte: der Reiseführer behandelt all das Artikel für Artikel, mit Adressen und praktischen Hinweisen.",
        label: "Den Reiseführer für Albiez ansehen",
      },
      distanceLabels: {
        shops: "Geschäfte im Dorf",
        riding: "Reitzentrum",
        lake: "See mit bewachtem Badebetrieb",
      },
      seo: {
        title:
          "Sommerurlaub Albiez-Montrond — Ferienwohnung nahe See und Wanderwegen",
        description:
          "Ferienwohnung für 4 bis 6 Personen in Albiez-Montrond, 350 m vom See mit bewachtem Badebetrieb und 300 m vom Reitzentrum. Wandern, E-Mountainbike, Balkon mit Blick auf die Aiguilles d'Arves.",
        keywords: [
          "Sommerurlaub Albiez",
          "Bergurlaub Sommer Maurienne",
          "Badesee Albiez bewacht",
          "Ferienwohnung Sommer Savoyen",
          "Wandern Albiez-Montrond",
          "Reiten Albiez",
          "E-Mountainbike Maurienne",
          "Familienurlaub Berge Sommer Frankreich",
        ],
      },
    },
  },

  property: {
    title: "Die Wohnung",
    subtitle:
      "Im 2. und obersten Stock eines Chalets der Residenz Le Hameau des Aiguilles, auf über 1.600 Metern Höhe.",
    sleepingTitle: "Die Schlafplätze",
    bedrooms: "Schlafzimmer",
    alcove: "Schlafnische",
    living: "Wohnzimmer",
    bedDouble: (w, l) => `1 Doppelbett ${w} × ${l} cm`,
    bedBunk: (n, w, l) => `${n} Etagenbetten ${w} × ${l} cm`,
    bedTrundle: (n, w, l) =>
      `Schlafsofa mit Ausziehbett, ${n} Einzelbetten ${w} × ${l} cm`,
    capacity: (min, max) => `${min} bis ${max} Personen`,
    areaCarrez: (m2) => `${m2} m² Wohnfläche`,
    roomsSummary: "1 Schlafzimmer + Schlafnische",
    bedsCount: (n) => `${n} Schlafplätze`,
    // « Badezimmer » est invariable en allemand : le nombre suffit à marquer le pluriel.
    bathroomsCount: (n) => `${n} Badezimmer`,
    bathroom:
      "Badezimmer mit Badewanne und Handtuchheizkörper, separates WC.",
    balcony:
      "Nach Südwesten ausgerichteter Balkon mit Panoramablick auf die Aiguilles d'Arves.",
    amenitiesTitle: "Die Ausstattung",
    amenityGroups: [
      {
        title: "Küche",
        items: [
          "Kochfeld",
          "Geschirrspüler",
          "Backofen",
          "Mikrowelle",
          "Kühlschrank mit Gefrierfach",
          "Toaster",
          "Nespresso-Maschine und Filterkaffeemaschine",
        ],
      },
      {
        title: "Bergspezialitäten",
        items: [
          "Raclette-Gerät",
          "Fondue-Set",
          "Pierrade (Steingrill)",
          "Crêpes-Gerät",
        ],
      },
      {
        title: "Komfort",
        items: [
          "Südwestbalkon",
          "Badezimmer mit Badewanne",
          "Handtuchheizkörper",
          "Separates WC",
          "Skiraum auf dem Treppenabsatz",
        ],
      },
      {
        title: "Kinder und Freizeit",
        items: [
          "Kinderschlitten",
          "Gesellschaftsspiele",
          "Eine Auswahl an Büchern",
          "Reisebett mit Matratze (auf Anfrage)",
          "Hochstuhl (auf Anfrage)",
          "Schlitten für Kleinkinder (auf Anfrage)",
        ],
      },
    ],
    showAll: "Die gesamte Ausstattung ansehen",
    showLess: "Weniger anzeigen",
  },

  linen: {
    title: "Das Wäschepaket",
    subtitle: (price) =>
      `Bettdecken und Kopfkissen sind vorhanden. Bettwäsche und Badetuch sind optional, ${price} € pro Person.`,
    withLinen: "Mit Wäschepaket",
    withoutLinen: "Ohne Wäschepaket",
    providedTitle: "Ohne Aufpreis vorhanden",
    providedIntro:
      "Bettdecken und Kopfkissen erwarten Sie in der Wohnung, in ausreichender Zahl für sechs Personen:",
    itemLabel: (key, count) => {
      // L'allemand pluralise à partir de zéro (« 0 Bettdecken »), contrairement au
      // français. `Kopfkissen` est invariable : c'est le nombre qui marque le pluriel.
      const plural = (count ?? 0) !== 1;
      const labels: Record<string, string> = {
        duvetDouble: plural ? "Doppelbettdecken" : "Doppelbettdecke",
        duvetSingle: plural ? "Einzelbettdecken" : "Einzelbettdecke",
        pillow: "Kopfkissen",
        // Non dénombré : toujours au pluriel.
        extraBlankets: "Zusätzliche Decken",
      };
      return labels[key] ?? key;
    },
    optionTitle: "Optional",
    optionIntro: (price) =>
      `Für ${price} € pro Person liegt die Wäsche in der Wohnung bereit. Bei der Buchung angeben.`,
    optionItems: [
      "Bettwäsche und Kopfkissenbezüge",
      "Ein Badetuch pro Person",
    ],
    notMadeNote:
      "Die Betten sind bei Ihrer Ankunft nicht gemacht: die Wäsche wird bereitgestellt, das Beziehen übernehmen Sie selbst.",
    byoNote:
      "Sie bringen lieber eigene Bettwäsche und Handtücher mit? Das ist möglich und in den Bergen sogar üblich. Rechnen Sie dann mit einem Doppelbett von 160 × 190 und Einzelbetten von 80 × 190.",
  },

  practical: {
    title: "Praktische Hinweise",
    accessTitle: "Ankunft und Zugang",
    stepsWarning:
      "Zwischen Parkplatz und Wohnung liegen etwa fünfzig Stufen. Das ist der Preis für die Aussicht – aber man sollte es vor der Buchung wissen.",
    parking: "Außenparkplatz 50 Meter vom Chalet.",
    keyBox:
      "Schlüsselbox: Sie kommen und gehen völlig selbstständig, zu der Zeit, die Ihnen passt.",
    skiLocker: "Großer Skiraum auf dem Treppenabsatz.",
    onSiteContact: "Eine Ansprechperson ist bei Problemen vor Ort.",
    servicesTitle: "Leistungen",
    cleaning:
      "Endreinigung inbegriffen, ausgenommen Küche und Geschirr, die Ihnen obliegen.",
    linen: (price) =>
      `Bett- und Handtuchwäsche optional, ${price} € pro Person.`,
    bringYourOwnTitle: "Ins Gepäck einplanen",
    bringYourOwn: [
      "Geschirrspültabs",
      "Müllsäcke 50 L",
      "Toilettenpapier",
      "Nespresso-Kapseln",
    ],
    rulesTitle: "Hausordnung",
    noPets: "Haustiere sind nicht erlaubt.",
    noSmoking: "Nichtraucherwohnung.",
    babyKitTitle: "Baby-Set, kostenlos auf Anfrage",
    babyKit:
      "Kein Mindestalter: die Wohnung ist für die Kleinsten geeignet. Das Set wird ohne Aufpreis überlassen – bitte teilen Sie uns bei der Buchung mit, was Sie brauchen.",
    babyKitItems: [
      "Reisebett mit Matratze",
      "Hochstuhl",
      "Babyschlitten",
    ],
  },

  location: {
    title: "Wo die Wohnung liegt",
    subtitle:
      "Chemin du Châtel, 73530 Albiez-Montrond — ruhig gelegen, im Tal der Maurienne.",
    resortTitle: "Das Skigebiet Albiez",
    resortDescription:
      "Ein familiäres Skigebiet in der Maurienne, zwischen 1.500 und 2.060 Metern Höhe. Genug Pisten für eine Woche, wenig genug Betrieb, um dort Skifahren zu lernen.",
    openMaps: "In Google Maps öffnen",
    altitudeLabel: "Höhe der Wohnung",
    resortStats: {
      slopes: "Pisten",
      lifts: "Bergbahnen",
      altitude: "Höhe",
    },
  },

  calendar: {
    loading: "Verfügbarkeiten werden geladen…",
    previousMonth: "Vorheriger Monat",
    nextMonth: "Nächster Monat",
    close: "Schließen",
    clear: "Zurücksetzen",
    bookNow: "Jetzt buchen",
    adults: "Erwachsene",
    children: "Kinder",
    selectCheckOut: "Wählen Sie Ihr Abreisedatum",
    directDiscount: "Bestpreisgarantie: −7 % bei Direktbuchung",
    nights: (n) => `${n} Nacht${n > 1 ? "e" : ""}`,
    minStayNote: (n) => `(mindestens ${n} Nächte)`,
    capacityNote: (max) => `Bis zu ${max} Gäste.`,
    summary: (nights, checkIn, checkOut, adults, children) =>
      `${nights} Nacht${nights > 1 ? "e" : ""} — ${checkIn} bis ${checkOut} · ${adults} Erwachsene${adults > 1 ? "" : "r"}${children > 0 ? `, ${children} Kind${children > 1 ? "er" : ""}` : ""}`,
    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    dayNames: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  },
  booking: {
    title: "Verfügbarkeit und Buchung",
    subtitle: "Buchen Sie direkt, ohne Vermittler.",
    bookOnAirbnb: "Verfügbarkeit auf Airbnb ansehen",
    contactUs: "Schreiben Sie uns",
  },

  awards: {
    title: "Auszeichnungen",
    subtitle:
      "Was die Buchungsplattformen von den Aufenthalten hier festhalten.",
    bookingLabel: "Traveller Review Award",
    yearLabel: (year) => `Ausgabe ${year}`,
    outOf: (scale) => `von ${scale}`,
    consecutive: "Zwei Jahre in Folge von Booking.com ausgezeichnet",
  },

  superhost: {
    title: "Alexandre ist Superhost auf Airbnb",
    description:
      "Superhosts sind erfahrene, sehr gut bewertete Gastgeber, die sich für einen ausgezeichneten Aufenthalt einsetzen.",
    profileLink: (n) => `Meine ${n} Bewertungen auf meinem Airbnb-Profil ansehen`,
  },

  guestFavourite: {
    title: "Wohnung mit dem Airbnb-Gästeliebling-Abzeichen",
    description:
      "Gästelieblinge gehören zu den beliebtesten Unterkünften auf Airbnb – gemessen an Bewertungen, Kommentaren und Zuverlässigkeit.",
  },

  host: {
    title: "Ihr Gastgeber: Alexandre",
    badge: "Superhost",
    experience: (years) => `${years} Jahre Gastgeber in Albiez`,
    about: "Über Alexandre",
    aboutText:
      "Ingenieur, technikbegeistert, sportlich und handwerklich veranlagt – ich bin seit mehreren Jahren Superhost.\nMir liegt daran, saubere, komfortable und einwandfrei funktionierende Unterkünfte anzubieten.\nIch bleibe erreichbar und reagiere schnell, lasse Ihnen dabei aber viel Freiraum.",
    languages: "Sprachen",
    languagesValue: "Français, English",
    responseRate: "Antwortrate",
    responseRateValue: "Schnelle Antwort — in der Regel unter einer Stunde",
    emailCta: "Schreiben Sie mir",
    airbnbCta: "Über Airbnb kontaktieren",
    whatsappCta: "WhatsApp",
    whatsappMessage:
      "Hallo Alexandre, ich interessiere mich für Ihre Wohnung in Albiez.",
  },

  reviews: {
    title: "Was die Gäste sagen",
    subtitle: (count) => `${count} Bewertungen auf Airbnb`,
    guestFavourite: "Gästeliebling",
    guestFavouriteNote:
      "Eine der beliebtesten Unterkünfte auf Airbnb – gemessen an Bewertungen, Kommentaren und der Zuverlässigkeit des Angebots.",
    outOf: "von 5",
    categories: {
      cleanliness: "Sauberkeit",
      accuracy: "Genauigkeit",
      checkIn: "Check-in",
      communication: "Kommunikation",
      location: "Lage",
      value: "Preis-Leistung",
    },
    showAll: (count) => `Alle ${count} Bewertungen ansehen`,
    showLess: "Weniger anzeigen",
    seeOnAirbnb: "Alle Bewertungen auf Airbnb lesen",
    empty: "Für diese Saison gibt es noch keine Bewertungen.",
    hostReply: "Antwort von Alexandre",
    filter: {
      label: "Nach Zeitraum filtern",
      all: "Alle",
      hiver: "Skisaison",
      ete: "Sommersaison",
      "hors-saison": "Nebensaison",
      offSeasonNote:
        "Aufenthalte außerhalb der Öffnungszeiten des Skigebiets: Bergbahnen geschlossen, ein Teil der Geschäfte ebenfalls. Der Ort ist dann deutlich ruhiger.",
    },
  },

  gallery: {
    title: "In Bildern",
    empty: "Die Fotos dieser Saison folgen in Kürze.",
    showAll: (count) => `Alle ${count} Fotos ansehen`,
    previous: "Vorheriges Foto",
    next: "Nächstes Foto",
    close: "Schließen",
    counter: (i, total) => `${i} / ${total}`,
    expand: "Vergrößern",
    zoomIn: "Originalgröße",
    zoomOut: "Gesamtansicht",
  },

  spaces: {
    subtitle:
      "Der Rundgang Bereich für Bereich. Wohnzimmer, Küchenzeile und Essbereich teilen denselben Raum, der sich nach Südwesten zum Balkon öffnet.",
    // L'allemand pluralise dès zéro, contrairement au français.
    photoCount: (count) => (count !== 1 ? `${count} Fotos` : "1 Foto"),
    list: {
      salon: {
        title: "Wohnzimmer",
        amenities: [
          "Schlafsofa mit Ausziehbett",
          "Gesellschaftsspiele",
          "Bücher und Kinderspielzeug",
          "Heizung",
        ],
      },
      kitchenette: {
        title: "Küchenzeile",
        amenities: [
          "Kochfeld",
          "Backofen",
          "Mikrowelle",
          "Geschirrspüler",
          "Kühlschrank mit Gefrierfach",
          "Nespresso-Maschine und Filterkaffeemaschine",
          "Toaster",
          "Geschirr, Besteck und Weingläser",
          "Rauchmelder",
        ],
      },
      "espace-repas": {
        title: "Essbereich",
        amenities: [
          "Esstisch",
          "Raclette, Fondue, Pierrade und Crêpes-Gerät",
          "Heizung",
        ],
      },
      chambre: {
        title: "Schlafzimmer",
        amenities: [
          "Doppelbett",
          "Schränke und Kleiderbügel",
          "Zusätzliche Kopfkissen und Decken",
          "Reisebett (auf Anfrage)",
          "Heizung",
        ],
      },
      "coin-montagne": {
        title: "Schlafnische",
        amenities: ["Etagenbetten", "Heizung"],
      },
      "salle-de-bains": {
        title: "Badezimmer",
        amenities: [
          "Badewanne",
          "Warmwasser",
          "Handtuchheizkörper",
          "Wäscheständer",
          "Separates WC",
          "Reinigungsmittel",
        ],
      },
      balcon: {
        title: "Balkon",
        amenities: [
          "Nach Südwesten ausgerichtet",
          "Blick auf die Aiguilles d'Arves",
          "Tisch und Stühle",
          "Schlitten",
        ],
      },
      exterieur: {
        title: "Außenbereich",
        amenities: [
          "Skiraum auf dem Treppenabsatz",
          "Außenparkplatz",
          "Residenz Le Hameau des Aiguilles",
        ],
      },
    },
  },

  blog: {
    heading: "Der Reiseführer für Albiez",
    subheading:
      "Unsere Anhaltspunkte als Stammgäste in Albiez-Montrond: markierte Wanderwege, Skiverleih, Geschäfte im Dorf, Sommeraktivitäten und Veranstaltungen im Skigebiet.",
    seasonBadge: { hiver: "Winter", ete: "Sommer" },
    yearRoundBadge: "Ganzjährig",
    filter: {
      label: "Reiseführer nach Saison filtern",
      all: "Ganzjährig",
      hiver: "Winter",
      ete: "Sommer",
      note: "Ganzjährig gültige Themen – Geschäfte, Wanderungen, Familie – bleiben in beiden Saisons sichtbar.",
    },
    back: "← Zurück zum Reiseführer",
    relatedTitle: "Auch interessant",
    cta: {
      title: "In Albiez übernachten",
      text: "Unsere Wohnung liegt am Mollard, 250 m vom Pistenzugang und vom Start der Wanderwege. Bis zu 6 Personen, Südbalkon mit Blick auf die Aiguilles d'Arves.",
      button: "Die Wohnung ansehen",
    },
    seo: {
      title:
        "Reiseführer Albiez-Montrond — Wandern, Skifahren, Geschäfte und Aktivitäten",
      description:
        "Markierte Wanderwege, Skiverleih, Skischule, Geschäfte im Dorf, Lac du Mollard, Col du Mollard mit dem Rad: der praktische Reiseführer für Albiez-Montrond, geschrieben von Stammgästen.",
      keywords: [
        "Reiseführer Albiez-Montrond",
        "was tun in Albiez",
        "Wandern Albiez-Montrond",
        "Skigebiet Albiez Maurienne",
        "Aiguilles d'Arves",
      ],
    },
  },

  footer: {
    navigation: "Navigation",
    contact: "Kontakt",
    legal: "Rechtliche Hinweise",
    copyright: "Alle Rechte vorbehalten.",
    tagline: "Bergwohnung in Albiez-Montrond, Savoyen.",
  },

  legal: {
    title: "Impressum",
    editorTitle: "Herausgeber der Website",
    hostTitle: "Hosting",
    dataTitle: "Personenbezogene Daten",
    dataText:
      "Diese Website erhebt keine personenbezogenen Daten außer den Nachrichten, die Sie uns freiwillig per E-Mail senden. Die Besuchsstatistiken sind anonym und lassen keine Identifizierung zu. Bei Fragen zu Ihren Daten schreiben Sie uns an die oben genannte Adresse.",
    labels: {
      legalName: "Firmenname",
      legalForm: "Rechtsform",
      siren: "SIREN",
      siret: "SIRET des Sitzes",
      capital: "Stammkapital",
      office: "Firmensitz",
      ape: "APE-Code",
      contact: "Kontakt",
    },
  },

  guide: {
    title: "Ankunftsanleitung",
    intro:
      "Vom Col du Mollard bis zur Wohnungstür, der Weg in Bildern. Rechnen Sie mit fünf Minuten ab dem Pass.",
    codeNote:
      "Den Code der Schlüsselbox senden wir Ihnen vor der Ankunft per Nachricht: er steht nicht auf dieser Seite.",
    mapsCta: "Route in Google Maps öffnen",
    stepLabel: (n) => `Schritt ${n}`,
    steps: {
      mollard: {
        title: "Am Col du Mollard rechts",
        text: "Wenn Sie am Col du Mollard ankommen, achten Sie auf das weiße Fahrrad mit roten Punkten am Straßenrand und biegen Sie dann rechts in den Chemin du Châtel ein.",
      },
      residence: {
        title: "Die Residenz Le Hameau des Aiguilles",
        text: "Das Chalet liegt in der Residenz Le Hameau des Aiguilles. Am Eingang ist ein erster Parkplatz ausgeschildert: fahren Sie weiter, halten Sie dort nicht.",
      },
      parking: {
        title: "Bei den Müllcontainern parken",
        text: "Am besten fahren Sie bis zu den Müllcontainern und parken dort: das ist der Punkt, der der Treppe am nächsten liegt.",
      },
      escalier: {
        title: "Die Treppe am Schwimmbad",
        text: "Gegenüber den Containern steigen Sie die Treppe hinauf, die am Schwimmbad vorbeiführt (derzeit in Renovierung).",
      },
      chalet: {
        title: "Das Chalet",
        text: "Hier ist das Chalet. Die Wohnung nimmt das oberste Geschoss ein, den Holzteil: der Balkon rechts, die Zimmerfenster links. Gehen Sie weiter hinauf und um das Gebäude herum.",
      },
      palier: {
        title: "Die letzte Treppe",
        text: "Steigen Sie die letzte Treppe hinauf: die Wohnung ist die zweite Tür rechts auf dem Treppenabsatz.",
      },
      porte: {
        title: "Die Tür und der Skiraum",
        text: "Der Skiraum liegt auf demselben Treppenabsatz, direkt neben der Tür, und trägt dieselbe Nummer.",
      },
      boiteAClef: {
        title: "Die Schlüsselbox",
        text: "Sie ist am linken Türrahmen befestigt. Schieben Sie die schwarze Abdeckung nach unten, stellen Sie den Code ein, den Sie erhalten haben, und drücken Sie dann den schwarzen Knopf links neben den Rädchen nach unten, um zu öffnen. Der große Schlüssel öffnet die Tür, der kleine den Skiraum.",
      },
    },
    stairsNote: (steps) =>
      `Etwa ${steps} Stufen trennen den Parkplatz von der Wohnung. Die Aussicht muss man sich verdienen!`,
    unitNote: (unit) => `Tür ${unit} — der Skiraum trägt ebenfalls die ${unit}.`,
    keyBoxSecurity:
      "Denken Sie daran, die Box wieder zu schließen und den Code zu verstellen. Sie steht Ihnen während des gesamten Aufenthalts zur Verfügung.",
    manualTitle: "Das Haushandbuch",
    panelTitle: "Wenn der Strom ausgefallen ist",
    panelIntro:
      "Normalerweise hat jemand vor Ihrer Ankunft geprüft, dass alles funktioniert. Falls nicht: der Sicherungskasten befindet sich neben der Eingangstür.",
    panelMarkers: {
      breaker:
        "Hauptschalter. Wenn der Strom ausgefallen ist, drücken Sie ihn nach oben.",
      radiators: "Heizkörper. Schaltet die Heizung wieder ein.",
      waterHeater:
        "Warmwasserboiler. Um das Aufheizen zu erzwingen, schieben Sie den Schalter von „auto“ auf „1“, ein einziges Mal.",
    },
    panelHotWaterNote:
      "Nach einem Ausfall kommt das warme Wasser meist erst am nächsten Morgen zurück – es sei denn, Sie erzwingen das Aufheizen.",
    radiatorSwitchTitle: "Ein Heizkörper wird nicht warm?",
    radiatorSwitchText:
      "Jeder Heizkörper, auch der Handtuchheizkörper, hat einen Kippschalter 0 / 1 hinter dem Gerät. Er muss auf 1 stehen. Prüfen Sie das zuerst: es ist die häufigste Ursache.",
    manualsTitle: "Bedienungsanleitungen",
    manualsText:
      "Die Anleitungen der Elektrogeräte liegen in der Schublade des kleinen Möbels.",
    checkoutTitle: "Vor der Abreise",
    checkoutIntro:
      "Die Endreinigung ist inbegriffen, Küche und Geschirr bleiben jedoch Ihre Aufgabe. Ein paar Handgriffe, bevor Sie die Tür schließen:",
    checkoutItems: [
      "Den Küchenbereich sauber und aufgeräumt hinterlassen, Geschirr gespült und eingeräumt.",
      "Den Müll zu den Containern bringen – dort, wo Sie bei der Ankunft geparkt haben.",
      "Die Heizung abschalten.",
      "Die Fensterläden schließen.",
      "Licht und Geräte ausschalten.",
      "Tür und Skiraum abschließen.",
    ],
    checkoutKeysNote:
      "Legen Sie einen Schlüsselbund in die Schlüsselbox und verstellen Sie den Code, den zweiten lassen Sie gut sichtbar auf dem Tisch: die Box ist zu klein für beide.",
    contactTitle: "Ein Problem?",
    contactIntro:
      "Schreiben Sie uns, wir antworten in der Regel innerhalb einer Stunde. Eine Ansprechperson ist außerdem vor Ort, falls nötig.",
    whatsappCta: "WhatsApp",
    phoneCta: "Anrufen",
    emailCta: "E-Mail senden",
    emergencyTitle: "Notrufnummern",
    emergencyLabels: {
      samu: "SAMU — medizinischer Notdienst",
      police: "Polizei und Gendarmerie",
      firefighters: "Feuerwehr",
      european: "Europäischer Notruf und Bergrettung",
    },
    closing: "Einen schönen Aufenthalt in Albiez!",
    seo: {
      title: "Ankunftsanleitung",
      description:
        "Wie Sie zur Wohnung kommen, vom Col du Mollard bis zur Schlüsselbox.",
    },
  },

  common: {
    metersAway: (m) => `${m} m entfernt`,
    backHome: "Zurück zur Startseite",
  },
};
