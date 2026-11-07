/**
 * Ce qu'Albiez déclare aux IA : la configuration de `@sejour/socle/lib/stay-agent` et ses
 * branchements (disponibilités Beds24, prix `getroomprice`, ntfy, secrets de devis).
 *
 * Les valeurs viennent de `lib/property.ts` (identifiants, capacité, contact, politiques) et
 * de `lib/seasons.ts` (refus des séjours pros en saison) — rien n'est recopié ici à la main,
 * sauf les textes destinés aux IA (fiche en français et en anglais).
 */
import { monthlyAvailability } from "@sejour/socle/lib/availability";
import { addDays } from "@sejour/socle/lib/dates";
import { sendNtfy } from "@sejour/socle/lib/ntfy";
import { quoteKeysFromEnv } from "@sejour/socle/lib/quote-token";
import { fetchRoomPrice } from "@sejour/socle/lib/stay-price";
import type { PropertyFacts, StayAgentConfig, StayAgentDeps } from "@sejour/socle/lib/stay-agent";
import type { StayQuoteConfig } from "@sejour/socle/lib/stay-quote";
import { todayParis } from "@sejour/socle/lib/time";
import { contraintes, disponibilites } from "@/lib/beds24";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/types";
import { CANCELLATION_POLICY, PAYMENT_POLICY, PROPERTY, SITE_NAME, SITE_URL } from "@/lib/property";
import { saisonsEntre, SEASON_SLUGS } from "@/lib/seasons";

/** `+33620921005` → `+33 6 20 92 10 05`, dérivé du contact plutôt que recopié. */
const PHONE = PROPERTY.contact.phone.replace(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, "+33 $1 $2 $3 $4 $5");

/**
 * Séjours professionnels : hors saison seulement (jamais pendant l'ouverture du domaine skiable
 * ni en juillet-août) — la règle affichée sur `/sejour-longue-duree` et dans `llms.txt`.
 */
function refuse(req: { checkIn: string; checkOut: string; purpose?: string }): string | null {
  // Bornes de mot : « profiter », « promenade » ou « Provence » ne sont pas des séjours pros.
  if (!/\b(pros?|professionnel(le)?s?|professional|travail|work|chantier|mission|business|entreprise|company)\b/i.test(req.purpose ?? "")) return null;
  return saisonsEntre(req.checkIn, addDays(req.checkOut, -1)).length
    ? "Les séjours professionnels ne sont acceptés que hors saison (ni pendant l'ouverture du domaine skiable, ni en juillet-août)."
    : null;
}

export const STAY_QUOTE: StayQuoteConfig = {
  roomId: PROPERTY.beds24.roomId,
  capacity: { maxTotal: PROPERTY.capacity.max, maxChildren: PROPERTY.capacity.max - 1 },
  defaultMinStay: 2,
  maxHorizonDays: 400,
  optionalExtras: [
    {
      id: "linge",
      label: {
        fr: "Linge de lit et serviettes",
        en: "Bed linen and towels",
        de: "Bettwäsche und Handtücher",
        es: "Ropa de cama y toallas",
        it: "Biancheria da letto e asciugamani",
      },
      perGuest: PROPERTY.linen.pricePerPerson,
      // La page de paiement Beds24 ne coche pas l'option d'elle-même (option n° 2, « kit linge »).
      bookingNote: {
        fr: "Linge de lit et serviettes : cochez l'option « kit linge » sur la page de paiement, sinon il n'est pas compris.",
        en: "Bed linen and towels: tick the “linen kit” option on the payment page, otherwise it is not included.",
        de: "Bettwäsche und Handtücher: Kreuzen Sie auf der Zahlungsseite die Option „Wäschepaket“ an, sonst sind sie nicht enthalten.",
        es: "Ropa de cama y toallas: marque la opción «kit de ropa» en la página de pago; si no, no está incluida.",
        it: "Biancheria e asciugamani: spuntate l'opzione «kit biancheria» nella pagina di pagamento, altrimenti non è inclusa.",
      },
    },
  ],
  refuse,
  // Grille Beds24 relevée le 2026-11-07, au centime : nuits −7 % (direct), taxe de séjour
  // 5,5 % des nuitées remisées, ménage. Un écart bloque le prix et prévient l'hôte.
  expectedTotal: ({ nightly }) => nightly.reduce((s, n) => s + n, 0) * 0.93 * 1.055 + PROPERTY.services.cleaningFee,
  lastMinute: {
    withinDays: 0,
    notice: {
      fr: `Arrivée aujourd'hui : appelez l'hôte ou écrivez-lui sur WhatsApp au ${PHONE} avant de réserver, pour vérifier que l'appartement est prêt.`,
      en: `Arriving today: call the host or message them on WhatsApp at ${PHONE} before booking, to check the apartment is ready.`,
      de: `Anreise heute: Rufen Sie den Gastgeber vor der Buchung an oder schreiben Sie per WhatsApp an ${PHONE}, um zu prüfen, ob die Wohnung bereit ist.`,
      es: `Llegada hoy: llame al anfitrión o escríbale por WhatsApp al ${PHONE} antes de reservar, para comprobar que el apartamento está listo.`,
      it: `Arrivo oggi: chiamate l'host o scrivetegli su WhatsApp al ${PHONE} prima di prenotare, per verificare che l'appartamento sia pronto.`,
    },
  },
};

function pages(lang: string): Record<string, string> {
  const l = (LOCALES as readonly string[]).includes(lang) ? (lang as (typeof LOCALES)[number]) : DEFAULT_LOCALE;
  const fr = lang === "fr";
  return {
    [`/${l}`]: fr ? "Accueil, photos et calendrier de réservation" : "Home, photos and booking calendar",
    [`/${l}/${SEASON_SLUGS[l].hiver}`]: fr ? "L'hiver : ski" : "Winter: skiing",
    [`/${l}/${SEASON_SLUGS[l].ete}`]: fr ? "L'été" : "Summer",
    [`/${l}/guide`]: fr ? "Guide de la station" : "Resort guide",
    [`/${l}/sejour-longue-duree`]: fr ? "Séjours professionnels (hors saison)" : "Work stays (off-season)",
  };
}

const FACTS_FR: Omit<PropertyFacts, "pages"> = {
  name: SITE_NAME,
  summary:
    "Appartement de montagne de 33 m² pour 4 à 6 personnes à Albiez-Montrond (Savoie, 1 600 m), à 250 m à pied du front de neige du Mollard, balcon sud-ouest face aux Aiguilles d'Arves. Station familiale, environ 2 h 30 de Lyon et de Genève.",
  address: PROPERTY.address.full,
  capacity: { min: PROPERTY.capacity.min, max: PROPERTY.capacity.max, note: "1 chambre (lit 160), coin montagne (2 lits superposés 80), canapé gigogne (2 × 80)" },
  checkIn: "À partir de 16 h, arrivée autonome (boîte à clés), contact sur place",
  checkOut: "Avant 10 h",
  includes: ["Ménage de fin de séjour (hors cuisine et vaisselle)", "Taxe de séjour", "Casier à skis sur le palier", "Kit bébé sur demande"],
  rules: [
    "Séjours professionnels uniquement hors saison (ni pendant l'ouverture du domaine skiable, ni en juillet-août) : devis à contact@albiez-aiguilles.fr",
    "Couettes et oreillers fournis ; draps et serviettes en option",
    "Animaux non autorisés",
    "Non-fumeur", "Parking extérieur gratuit à 50 m puis une cinquantaine de marches", "Pneus hiver ou chaînes obligatoires du 1er novembre au 31 mars"],
  contact: { phone: PROPERTY.contact.phone, whatsapp: PROPERTY.contact.whatsapp, email: PROPERTY.contact.business },
};

const FACTS_EN: Omit<PropertyFacts, "pages"> = {
  ...FACTS_FR,
  name: "Albiez - Apartment in the Chalet du Hameau des Aiguilles",
  summary:
    "33 m² mountain apartment for 4 to 6 guests in Albiez-Montrond (Savoie, French Alps, 1,600 m), a 250 m walk from the Mollard ski front, south-west balcony facing the Aiguilles d'Arves. Family resort, about 2 h 30 from Lyon and Geneva.",
  capacity: { min: PROPERTY.capacity.min, max: PROPERTY.capacity.max, note: "1 bedroom (160 bed), mountain nook (2 bunk beds 80), trundle sofa (2 × 80)" },
  checkIn: "From 4 pm, self check-in (key box), on-site contact",
  checkOut: "Before 10 am",
  includes: ["End-of-stay cleaning (except kitchen and dishes)", "Tourist tax", "Ski locker on the landing", "Baby kit on request"],
  rules: [
    "Work stays off-season only (not while the ski area is open, nor in July-August): quote at contact@albiez-aiguilles.fr",
    "Duvets and pillows provided; sheets and towels optional",
    "No pets",
    "Non-smoking", "Free outdoor parking 50 m away, then about fifty steps", "Winter tyres or chains mandatory from 1 November to 31 March"],
};

export const STAY_AGENT: StayAgentConfig = {
  propertyId: PROPERTY.beds24.propertyId,
  siteUrl: SITE_URL,
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  quote: STAY_QUOTE,
  cancellation: CANCELLATION_POLICY,
  payment: PAYMENT_POLICY,
  facts: (lang) => ({ ...(lang === "fr" ? FACTS_FR : FACTS_EN), pages: pages(lang) }),
  quotePagePath: (lang, token) => `/${lang}/devis/${token}`,
  calendarPath: (lang) => `/${lang}#reserver`,
  instantBooking: true,
};

/** Les branchements réels, recalculés à chaque requête (`today` change à minuit). */
export function stayAgentDeps(): StayAgentDeps {
  return {
    today: todayParis(),
    // Par mois entiers : une route publique ne doit pas multiplier les URL Beds24 (quota partagé
    // avec le calendrier du site).
    availability: monthlyAvailability(async (from, to) => {
      const [dates, regles] = await Promise.all([disponibilites(from, to), contraintes(from, to)]);
      return { dates, minStay: regles.minima, sansArrivee: regles.sansArrivee, sansDepart: regles.sansDepart };
    }),
    price: (req) => fetchRoomPrice(req),
    onAnomaly: (message) => sendNtfy(message, { title: "Devis IA Albiez", priority: 4, tags: ["warning"] }),
    keys: () => quoteKeysFromEnv(),
  };
}
