import type { Dictionary } from "../types";
import { PROPERTY } from "../../property";

export const en: Dictionary = {
  header: {
    home: "Home",
    winter: "Winter / Ski",
    summer: "Summer / Lake",
    apartment: "The apartment",
    location: "Location",
    blog: "Guide",
    book: "Book",
    menu: "Menu",
    switchLanguage: "Change language",
  },

  home: {
    heroTitle: "Apartment facing the Aiguilles d'Arves",
    heroSubtitle:
      "At 1,600 m in Albiez-Montrond, tucked away in a Maurienne chalet. Sleeps 4 to 6, with a south-west facing balcony.",
    intro:
      "On the top floor of a small chalet in the Hameau des Aiguilles residence, our family apartment opens onto a south-west facing balcony with a clear view of the Aiguilles d'Arves. The slopes, the village shops and the ski school are 250 metres away. The lake and the riding club are a few minutes on foot. We rent it all year round.",
    chooseSeason: "Two seasons, two very different stays",
    chooseSeasonSubtitle:
      "Albiez is not the same place in winter and in the warmer months. Pick yours.",
    seasonCard: {
      hiver: {
        title: "Winter on the slopes",
        description:
          "40 km of pistes between 1,500 and 2,060 m, the foot of the slopes 250 metres away with the ski school and the kids' club, a large ski locker on the landing and a raclette waiting when you get back.",
        cta: "Explore the ski season",
      },
      ete: {
        title: "Summer by the lake",
        description:
          "Supervised swimming at the lake 350 metres away, a riding club at 300 metres, and hiking and mountain-bike trails starting at the door.",
        cta: "Explore the summer season",
      },
    },
    offSeasonTitle: "What about the shoulder season?",
    offSeasonText:
      "We also rent outside the busy months, when the resort goes quiet again. It is the right time for hiking, cycling, snowshoeing, or simply enjoying the view without meeting anyone — usually at the best rate of the year. To be straight about it: out of season the lifts are closed, and so are some of the village shops and restaurants, though the grocery stays open. Guests who come for the quiet are rarely disappointed, but it is worth knowing before you book.",
    offSeasonExchange:
      "Outside the seasons, the apartment is also open to home exchange on HomeExchange, for GuestPoints rather than rent. A good way to discover the Maurienne if you are a member yourself.",
    offSeasonExchangeCta: "See the home on HomeExchange",
    offSeasonSponsorCta: "Join with my referral code",
    offSeasonSponsorNote:
      "Not a member yet? Sign up with my code and we each receive 250 GuestPoints.",
    seo: {
      title: "Albiez-Montrond apartment rental — Skiing and lake, French Alps",
      description:
        "Apartment for 4 to 6 guests in Albiez-Montrond (Savoie, 1,600 m), 250 m from the slopes and 350 m from the lake. South-west balcony facing the Aiguilles d'Arves. Winter, summer and off-season rental.",
      keywords: [
        "Albiez-Montrond rental",
        "Albiez apartment",
        "ski apartment French Alps",
        "Maurienne holiday rental",
        "apartment near slopes Albiez",
        "Aiguilles d'Arves accommodation",
        "Savoie mountain apartment 6 people",
        "family ski holiday France",
      ],
    },
  },

  seasons: {
    hiver: {
      heading: "Skiing in Albiez: an apartment 250 m from the slopes",
      tagline: (p) => `Ski area open from ${p.du} to ${p.au}`,
      intro:
        "Albiez is a family resort in the Maurienne valley — small enough to feel calm, big enough for a full week. The ski area runs from 1,500 to 2,060 metres, with 40 km of pistes served by 13 lifts. From the apartment, 250 metres take you to the foot of the slopes — and everything is there: the piste departure, the shops, the ski school and the Piou-Piou kids' club.",
      highlights: [
        {
          title: "250 m to the foot of the slopes",
          description:
            "Piste departure, shops, ski school and kids' club are all gathered in the same place, five minutes on foot. One walk a day is all it takes.",
        },
        {
          title: "Large ski locker",
          description:
            "A large ski locker is yours for the stay, on the landing right outside the door.",
        },
        {
          title: "A family resort",
          description:
            "40 km of pistes, 13 lifts, 1,500 to 2,060 m. Enough for a week, quiet enough to learn on.",
        },
        {
          title: "Coming back to the warm",
          description:
            "Raclette, fondue, crêpe maker and pierrade grill in the kitchen. Plus sledges for the children and a shelf of board games.",
        },
      ],
      activitiesTitle: "What to do in Albiez in winter",
      resortFacts: {
        pistes: "runs",
        lifts: "lifts",
        snowGuns: "snow guns",
      },
      activities: [
        {
          title: "The ski area, from the Échaux chairlift",
          description:
            "The Échaux chairlift starts 250 metres from the apartment and climbs from 1,600 to 1,800 m: it is the way into the ski area, and everything opens up behind it — Chef-lieu, Montrond, then the Aplanes drag lift topping out at 2,100 m. The plateau is wide, very sunny and sees little rain: a place to learn to ski in comfort, not a place to come looking for steep walls.",
          link: {
            href: "/en/guide/domaine-skiable-albiez-secteur-mollard",
            label: "The Le Mollard ski area and its lifts",
            internal: true,
          },
        },
        {
          title: "Learning to ski",
          description:
            "The ski school and the Piou-Piou club sit at the foot of the slopes, 250 metres away. When you book, choose the Le Mollard departure point: that is the one 250 metres from the apartment. Lessons fill up fast, so book as soon as your dates are set.",
          link: {
            href: PROPERTY.links.esf,
            label: "Book with ESF Albiez",
          },
        },
        {
          title: "Winter off the pistes",
          description:
            "The Le Mollard sledging run is right next to the residence, in full sun — snow cover there is not guaranteed, but when it is open it fills a whole late afternoon. Otherwise: snowshoe walks, cross-country skiing, dog sledding, snowmobiling, paragliding, drinks in an igloo. Children's sledges are kept in the apartment for you.",
          link: {
            href: "/en/guide/chiens-de-traineau-albiez",
            label: "Dog sledding in Albiez",
            internal: true,
          },
        },
        {
          title: "Evenings at the foot of the slopes",
          description:
            "On Tuesday evenings during the school holidays, the Albiez C'Show takes over the foot of the slopes, 250 metres away: torchlight descent with the instructors, snow groomer show, fireworks and free mulled wine. On other evenings, the Sherpa shop is a two-minute stop on the way back from skiing, skis in hand, and the fondue happens on the balcony.",
          link: {
            href: "/en/guide/albiez-c-show",
            label: "The Albiez C'Show, Tuesday nights",
            internal: true,
          },
        },
        {
          title: "Les Sybelles, 20 minutes by car",
          description:
            "Albiez sells a 5-day pass plus one day in Les Sybelles, reached via Saint-Jean-d'Arves. It is France's 4th largest linked ski area and the largest in the Maurienne: 393 hectares, 136 pistes for every level and six linked resorts, from 1,300 to 2,620 m. A change of scene mid-week without changing where you sleep.",
          link: {
            href: PROPERTY.links.sybelles,
            label: "Skiing in Les Sybelles",
          },
        },
      ],
      activitiesMore: {
        text: "The ski area, ski hire, ESF lessons, husky rides, Tuesday evenings on the snow front: the guide covers all of it article by article, with addresses and practical details.",
        label: "Read the Albiez guide",
      },
      distanceLabels: {
        frontDeNeige: "Foot of the slopes",
        slopes: "Piste departure",
        shops: "Shops",
        esf: "Ski school (ESF)",
        piouPiou: "Piou-Piou kids' club",
      },
      resortLink: {
        alt: "Albiez, la Perle des Alpes",
        label: "The Albiez resort website",
      },
      banner: {
        alt: "Skiers on the Albiez ski area, with the chalet village and snow-covered mountains behind",
        caption:
          "A very sunny ski area, the chalet village below and the Maurienne mountains behind.",
      },
      pisteMap: {
        title: "The Le Mollard sector",
        caption:
          "The arrow marks the apartment: the foot of the slopes, the ski school and the shops are 250 metres away.",
      },
      seo: {
        title: "Ski rental Albiez-Montrond — Apartment for 6, 250 m from the slopes",
        description:
          "Mountain apartment in Albiez-Montrond, 250 m from the slopes, the ski school and the kids' club. Sleeps 4 to 6, ski locker, Aiguilles d'Arves view. 2026-2027 season.",
        keywords: [
          "ski rental Albiez",
          "Albiez-Montrond ski apartment",
          "apartment near slopes Maurienne",
          "Albiez resort accommodation",
          "family ski rental Savoie",
          "ski apartment sleeps 6",
          "Maurienne ski holiday",
        ],
      },
    },

    ete: {
      heading: "Summer in Albiez: the lake, the horses and the mountains",
      tagline: (p) => `Supervised swimming at the lake in ${p.mois}`,
      intro:
        "Albiez changes pace in summer. The lake and its supervised swimming area are 350 metres from the apartment, the riding club is at 300 metres, and hiking and mountain-bike trails start right nearby. The south-west balcony becomes the main room of the place, facing the Aiguilles d'Arves.",
      highlights: [
        {
          title: "The lake, 350 m away",
          description:
            "Supervised swimming through the summer season, a few minutes' walk from the chalet.",
        },
        {
          title: "Riding club at 300 m",
          description:
            "The village riding club runs pony rides and horse treks, right next door.",
        },
        {
          title: "Trails from the door",
          description:
            "Hiking and biking routes start nearby. Electric mountain bikes and e-scooters can be hired in the village.",
        },
        {
          title: "The south-west balcony",
          description:
            "A panoramic view of the Aiguilles d'Arves, and sun until the end of the evening.",
        },
      ],
      activitiesTitle: "What to do in Albiez in summer",
      activities: [
        {
          title: "Swimming at the lake",
          description:
            "Supervised swimming in July and August, 350 metres away — enough to fill the hot afternoons without taking the car.",
        },
        {
          title: "Ponies and horses",
          description:
            "The riding club is 300 metres away: pony rides for the youngest, horse treks for everyone else.",
        },
        {
          title: "Hiking",
          description:
            "Trails for every level starting from the village, with the Aiguilles d'Arves in your sights.",
        },
        {
          title: "Cycling and e-biking",
          description:
            "Electric mountain bikes and e-scooters for hire locally — climb without suffering, descend for the fun of it.",
        },
      ],
      activitiesMore: {
        text: "Waymarked hikes, the Col du Mollard by bike, the Lac du Mollard, the Rival forest, a mountain refuge: the guide covers all of it article by article, with addresses and practical details.",
        label: "Read the Albiez guide",
      },
      distanceLabels: {
        shops: "Village shops",
        riding: "Riding club",
        lake: "Lake and supervised swimming",
      },
      seo: {
        title: "Summer rental Albiez-Montrond — Apartment near the lake and trails",
        description:
          "Apartment for 4 to 6 guests in Albiez-Montrond, 350 m from the lake with supervised swimming and 300 m from the riding club. Hiking, e-biking, balcony facing the Aiguilles d'Arves.",
        keywords: [
          "summer rental Albiez",
          "Maurienne summer holiday",
          "Albiez lake swimming",
          "Savoie mountain summer rental",
          "hiking Albiez-Montrond",
          "horse riding Albiez",
          "electric mountain bike Maurienne",
        ],
      },
    },
  },

  property: {
    title: "The apartment",
    subtitle:
      "On the 2nd and top floor of a chalet in the Hameau des Aiguilles residence, at over 1,600 metres.",
    sleepingTitle: "Sleeping arrangements",
    bedrooms: "Bedroom",
    alcove: "Mountain alcove",
    living: "Living room",
    bedDouble: (w, l) => `1 double bed, ${w} × ${l} cm`,
    bedBunk: (n, w, l) => `${n} bunk beds, ${w} × ${l} cm`,
    bedTrundle: (n, w, l) => `Trundle sofa bed, ${n} single beds ${w} × ${l} cm`,
    capacity: (min, max) => `${min} to ${max} guests`,
    areaCarrez: (m2) => `${m2} m² (Carrez)`,
    roomsSummary: "1 bedroom + mountain alcove",
    bedsCount: (n) => `${n} beds`,
    bathroomsCount: (n) => `${n} bathroom`,
    bathroom: "Bathroom with bathtub and heated towel rail, separate toilet.",
    balcony:
      "South-west facing balcony with a panoramic view of the Aiguilles d'Arves.",
    amenitiesTitle: "Amenities",
    amenityGroups: [
      {
        title: "Kitchen",
        items: [
          "Hob",
          "Dishwasher",
          "Oven",
          "Microwave",
          "Fridge with freezer",
          "Toaster",
          "Nespresso espresso machine and filter coffee maker",
        ],
      },
      {
        title: "Mountain specialities",
        items: [
          "Raclette grill",
          "Fondue set",
          "Pierrade stone grill",
          "Crêpe maker",
        ],
      },
      {
        title: "Comfort",
        items: [
          "South-west balcony",
          "Bathroom with bathtub",
          "Heated towel rail",
          "Separate toilet",
          "Ski locker on the landing",
        ],
      },
      {
        title: "Children and leisure",
        items: [
          "Children's sledges",
          "Board games",
          "A selection of books",
          "Travel cot with mattress (on request)",
          "High chair (on request)",
          "Toddler sledge (on request)",
        ],
      },
    ],
    showAll: "Show all amenities",
    showLess: "Show less",
  },

  linen: {
    title: "The linen kit",
    subtitle: (price) =>
      `Duvets and pillows are already there. Sheets and a bath towel are optional, €${price} per person.`,
    withLinen: "With the linen kit",
    withoutLinen: "Without the linen kit",
    providedTitle: "Provided at no extra cost",
    providedIntro:
      "Duvets and pillows are waiting in the apartment, enough for six guests:",
    itemLabel: (key, count) => {
      const s = (count ?? 0) > 1 ? "s" : "";
      const labels: Record<string, string> = {
        duvetDouble: `double duvet${s}`,
        duvetSingle: `single duvet${s}`,
        pillow: `pillow${s}`,
        // Non dénombré : toujours au pluriel.
        extraBlankets: "Extra blankets",
      };
      return labels[key] ?? key;
    },
    optionTitle: "Optional",
    optionIntro: (price) =>
      `For €${price} per person the linen is waiting for you in the apartment. Just let us know when booking.`,
    optionItems: ["Sheets and pillowcases", "One bath towel per person"],
    notMadeNote:
      "Beds are not made up on arrival: the linen is provided, it is yours to put on.",
    byoNote:
      "Would rather bring your own sheets and towels? That is perfectly fine, and common practice in the mountains. Plan for one 160 × 190 double bed and 80 × 190 single beds.",
  },

  practical: {
    title: "Practical information",
    accessTitle: "Arrival and access",
    stepsWarning:
      "There are around fifty steps between the car park and the apartment. That is the price of the view — but better to know before you book.",
    parking: "Outdoor parking 50 metres from the chalet.",
    keyBox:
      "Key box: arrive and leave on your own schedule, no check-in appointment needed.",
    skiLocker: "Large ski locker on the landing.",
    onSiteContact: "Someone is on site should anything go wrong.",
    servicesTitle: "Services",
    cleaning:
      "End-of-stay cleaning included, excluding the kitchen and washing-up which remain your responsibility.",
    linen: (price) => `Bed and bath linen optional, €${price} per person.`,
    bringYourOwnTitle: "Worth packing",
    bringYourOwn: [
      "Dishwasher tablets",
      "50 L bin bags",
      "Toilet paper",
      "Nespresso capsules",
    ],
    rulesTitle: "House rules",
    noPets: "Pets are not allowed.",
    noSmoking: "Non-smoking apartment.",
    babyKitTitle: "Baby kit, free on request",
    babyKit:
      "No minimum age: the apartment suits the youngest guests. The kit is lent at no extra charge — please tell us at booking which equipment you need.",
    babyKitItems: ["Travel cot with mattress", "High chair", "Baby sledge"],
  },

  location: {
    title: "Where the apartment is",
    subtitle:
      "Chemin du Châtel, 73530 Albiez-Montrond — quiet, in the Maurienne valley.",
    resortTitle: "The Albiez ski area",
    resortDescription:
      "A family resort in the Maurienne, between 1,500 and 2,060 metres. Enough pistes for a week, few enough people to learn to ski on them.",
    openMaps: "Open in Google Maps",
    altitudeLabel: "Apartment altitude",
    resortStats: {
      slopes: "of pistes",
      lifts: "ski lifts",
      altitude: "altitude",
    },
  },

  calendar: {
    loading: "Loading availability…",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    close: "Close",
    clear: "Clear",
    bookNow: "Book now",
    adults: "Adults",
    children: "Children",
    selectCheckOut: "Select your check-out date",
    directDiscount: "Best rate guaranteed: −7% when you book direct",
    nights: (n) => `${n} night${n > 1 ? "s" : ""}`,
    minStayNote: (n) => `(minimum ${n} nights)`,
    capacityNote: (max) => `Up to ${max} guests.`,
    summary: (nights, checkIn, checkOut, adults, children) =>
      `${nights} night${nights > 1 ? "s" : ""} — ${checkIn} to ${checkOut} · ${adults} adult${adults > 1 ? "s" : ""}${children > 0 ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}`,
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  booking: {
    title: "Availability and booking",
    subtitle: "Book directly, with no middleman.",
    bookOnAirbnb: "Check availability on Airbnb",
    contactUs: "Write to us",
  },

  awards: {
    title: "Awards",
    subtitle: "What the booking platforms make of the stays spent here.",
    bookingLabel: "Traveller Review Award",
    yearLabel: (year) => `${year} edition`,
    outOf: (scale) => `out of ${scale}`,
    consecutive: "Awarded two years running by Booking.com",
  },

  superhost: {
    title: "Alexandre is a Superhost on Airbnb",
    description:
      "Superhosts are experienced, highly rated hosts who are committed to providing excellent stays.",
    profileLink: (n) => `Browse my ${n} reviews on my Airbnb profile`,
  },

  guestFavourite: {
    title: "A Guest Favourite apartment on Airbnb",
    description:
      "Guest Favourites are among the most loved homes on Airbnb, based on ratings, reviews and reliability.",
  },

  host: {
    title: "Your host: Alexandre",
    badge: "Superhost",
    experience: (years) => `${years} years hosting in Albiez`,
    about: "About Alexandre",
    aboutText:
      "Engineer, geek, sportsman and handyman, I have been a Superhost for several years.\nI am committed to offering clean, comfortable and perfectly functional accommodation.\nI stay available and responsive, while leaving you plenty of independence.",
    languages: "Languages",
    languagesValue: "French, English",
    responseRate: "Response rate",
    responseRateValue: "Quick response — usually within an hour",
    emailCta: "Write to me",
    airbnbCta: "Contact me on Airbnb",
    whatsappCta: "WhatsApp",
    whatsappMessage:
      "Hello Alexandre, I am interested in your apartment in Albiez.",
  },

  reviews: {
    title: "What guests say",
    subtitle: (count) => `${count} reviews on Airbnb`,
    guestFavourite: "Guest Favourite",
    guestFavouriteNote:
      "One of the most loved homes on Airbnb, based on ratings, reviews and listing reliability.",
    outOf: "out of 5",
    categories: {
      cleanliness: "Cleanliness",
      accuracy: "Accuracy",
      checkIn: "Check-in",
      communication: "Communication",
      location: "Location",
      value: "Value",
    },
    showAll: (count) => `Show all ${count} reviews`,
    showLess: "Show less",
    seeOnAirbnb: "Read all reviews on Airbnb",
    empty: "No reviews yet for this season.",
    hostReply: "Reply from Alexandre",
    filter: {
      label: "Filter by period",
      all: "All",
      hiver: "Ski season",
      ete: "Summer season",
      "hors-saison": "Off season",
      offSeasonNote:
        "Stays outside the resort's opening periods: lifts closed, and some village shops too. The resort is markedly quieter then.",
    },
  },

  gallery: {
    title: "In pictures",
    empty: "Photos for this season are coming very soon.",
    showAll: (count) => `Show all ${count} photos`,
    previous: "Previous photo",
    next: "Next photo",
    close: "Close",
    counter: (i, total) => `${i} / ${total}`,
    expand: "Enlarge",
    zoomIn: "Actual size",
    zoomOut: "Fit to screen",
  },

  spaces: {
    subtitle:
      "A room-by-room tour. The living area, kitchenette and dining space share one open room, facing south-west onto the balcony.",
    photoCount: (count) => (count > 1 ? `${count} photos` : "1 photo"),
    list: {
      salon: {
        title: "Living area",
        amenities: [
          "Trundle sofa bed",
          "Board games",
          "Books and toys for children",
          "Heating",
        ],
      },
      kitchenette: {
        title: "Kitchenette",
        amenities: [
          "Hob",
          "Oven",
          "Microwave",
          "Dishwasher",
          "Fridge with freezer",
          "Nespresso espresso machine and filter coffee maker",
          "Toaster",
          "Crockery, cutlery and wine glasses",
          "Smoke alarm",
        ],
      },
      "espace-repas": {
        title: "Dining space",
        amenities: [
          "Dining table",
          "Raclette, fondue, pierrade and crêpe makers",
          "Heating",
        ],
      },
      chambre: {
        title: "Bedroom",
        amenities: [
          "Double bed",
          "Wardrobe space and hangers",
          "Extra pillows and blankets",
          "Travel cot (on request)",
          "Heating",
        ],
      },
      "coin-montagne": {
        title: "Mountain nook",
        amenities: ["Bunk beds", "Heating"],
      },
      "salle-de-bains": {
        title: "Bathroom",
        amenities: [
          "Bathtub",
          "Hot water",
          "Heated towel rail",
          "Drying rack",
          "Separate toilet",
          "Cleaning products",
        ],
      },
      balcon: {
        title: "Balcony",
        amenities: [
          "South-west facing",
          "View of the Aiguilles d'Arves",
          "Table and chairs",
          "Sledges",
        ],
      },
      exterieur: {
        title: "Outside",
        amenities: [
          "Ski locker on the landing",
          "Outdoor parking",
          "Le Hameau des Aiguilles residence",
        ],
      },
    },
  },

  blog: {
    heading: "The Albiez guide",
    subheading:
      "What regulars know about Albiez-Montrond: waymarked walks, ski hire, village shops, summer activities and the resort's evening events.",
    seasonBadge: { hiver: "Winter", ete: "Summer" },
    yearRoundBadge: "All year",
    filter: {
      label: "Filter the guide by season",
      all: "All year",
      hiver: "Winter",
      ete: "Summer",
      note: "Year-round topics — shops, walks, family — stay visible under both seasons.",
    },
    back: "← Back to the guide",
    relatedTitle: "Read next",
    cta: {
      title: "Staying in Albiez",
      text: "Our apartment sits in the Mollard hamlet, 250 m from the slopes and from the start of the trails. Sleeps up to 6, south-facing balcony looking straight at the Aiguilles d'Arves.",
      button: "See the apartment",
    },
    seo: {
      title: "Albiez-Montrond guide — walks, skiing, shops and activities",
      description:
        "Waymarked walks, ski hire, ski school, village shops, the Mollard lake and the Col du Mollard by bike: a practical guide to Albiez-Montrond written by regulars of the resort.",
      keywords: [
        "Albiez-Montrond guide",
        "things to do in Albiez",
        "hiking Albiez-Montrond",
        "Albiez ski resort Maurienne",
        "Aiguilles d'Arves",
      ],
    },
  },

  footer: {
    navigation: "Navigation",
    contact: "Contact",
    legal: "Legal information",
    copyright: "All rights reserved.",
    tagline: "Mountain apartment in Albiez-Montrond, Savoie, France.",
  },

  legal: {
    title: "Legal notice",
    editorTitle: "Site publisher",
    hostTitle: "Hosting",
    dataTitle: "Personal data",
    dataText:
      "This site collects no personal data beyond the messages you choose to send us by email. Traffic statistics are anonymous and cannot identify you. For any question about your data, write to the address above.",
    labels: {
      legalName: "Legal name",
      legalForm: "Legal form",
      siren: "SIREN",
      siret: "Head office SIRET",
      capital: "Share capital",
      office: "Registered office",
      ape: "APE code",
      contact: "Contact",
    },
  },

  guide: {
    title: "Arrival guide",
    intro:
      "From the Col du Mollard to the apartment door, the way there in pictures. Allow five minutes from the pass.",
    codeNote:
      "The key box code is sent to you by message before you arrive — it is never published on this page.",
    mapsCta: "Open the route in Google Maps",
    stepLabel: (n) => `Step ${n}`,
    steps: {
      mollard: {
        title: "At the Col du Mollard, turn right",
        text: "As you reach the Col du Mollard, look for the white bike with red polka dots displayed by the roadside, then turn right onto Chemin du Châtel.",
      },
      residence: {
        title: "Le Hameau des Aiguilles",
        text: "The chalet stands in the Hameau des Aiguilles residence. A first car park is signposted at the entrance: keep driving rather than stopping there.",
      },
      parking: {
        title: "Park by the bins",
        text: "Drive on to the waste containers and park there: it is the closest spot to the staircase.",
      },
      escalier: {
        title: "The staircase along the pool",
        text: "Facing the containers, climb the staircase that runs along the swimming pool (currently under renovation).",
      },
      chalet: {
        title: "The chalet",
        text: "Here is the chalet. The apartment is on the top floor, the wooden part: the balcony on the right, the bedroom windows on the left. Keep climbing and walk around the back.",
      },
      palier: {
        title: "The last staircase",
        text: "Climb the last staircase: the apartment is the second door on the right on the landing.",
      },
      porte: {
        title: "The door and the ski locker",
        text: "The ski locker is on the same landing, right next to the door, and carries the same number.",
      },
      boiteAClef: {
        title: "The key box",
        text: "It is fixed to the left door frame. Slide the black cover down, dial the code you were given, then push down the black button to the left of the dials to open it. The large key opens the door, the small one the ski locker.",
      },
    },
    stairsNote: (steps) =>
      `About ${steps} steps separate the car park from the apartment. The view has to be earned!`,
    unitNote: (unit) => `Door ${unit} — the ski locker is also marked ${unit}.`,
    keyBoxSecurity:
      "Please close the box and scramble the dials after each use. It stays available to you throughout your stay.",
    manualTitle: "House manual",
    panelTitle: "If the power goes out",
    panelIntro:
      "Someone will normally have checked that everything works before you arrive. If not, the electrical panel is next to the front door.",
    panelMarkers: {
      breaker: "Main breaker. If the power is off, flip it back up.",
      radiators: "Radiators. Switches the heating back on.",
      waterHeater:
        "Water heater. To force a heating cycle, push the switch from “auto” up to “1”, once.",
    },
    panelHotWaterNote:
      "After a power cut, hot water usually only comes back the next morning — unless you force the tank.",
    radiatorSwitchTitle: "A radiator not heating?",
    radiatorSwitchText:
      "Every radiator, towel rail included, has a 0 / 1 rocker switch hidden behind it. It needs to be on 1. Check that before looking any further: it is by far the most common cause.",
    manualsTitle: "Appliance manuals",
    manualsText:
      "The manuals for the electronic appliances are kept in the drawer of the small cabinet.",
    checkoutTitle: "Before you leave",
    checkoutIntro:
      "The end-of-stay cleaning is included, but the kitchen and the washing-up are yours to handle. A few things before you close the door:",
    checkoutItems: [
      "Leave the kitchen area clean and tidy, dishes washed and put away.",
      "Take the rubbish down to the containers — the ones you parked in front of when you arrived.",
      "Turn the heating off.",
      "Close the shutters.",
      "Switch off the lights and appliances.",
      "Lock the door and the ski locker.",
    ],
    checkoutKeysNote:
      "Put one set of keys back in the key box and scramble the dials, then leave the second set in plain sight on the table: the box is too small for both.",
    contactTitle: "Something wrong?",
    contactIntro:
      "Message us, we usually reply within the hour. Someone is also on site should you need help.",
    whatsappCta: "WhatsApp",
    phoneCta: "Call",
    emailCta: "Send an email",
    emergencyTitle: "Emergency numbers",
    emergencyLabels: {
      samu: "SAMU — medical emergencies",
      police: "Police and gendarmerie",
      firefighters: "Fire brigade",
      european: "European emergency and mountain rescue",
    },
    closing: "Enjoy your stay in Albiez!",
    seo: {
      title: "Arrival guide",
      description:
        "How to reach the apartment, from the Col du Mollard to the key box.",
    },
  },

  common: {
    metersAway: (m) => `${m} m away`,
    backHome: "Back to home",
  },
};
