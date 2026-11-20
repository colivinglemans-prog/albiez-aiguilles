import type { PriceGridLabels } from "@sejour/socle/components/PriceGrid";
import type { GridColumn } from "@sejour/socle/lib/price-grid";
import type { Locale } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";

/**
 * Les textes de la page « Tarifs », dans les cinq langues. Séparés de la page pour que le test
 * des longueurs (titre ≤ 65, description 120–155 : règle Bing) les lise sans rendre la page.
 *
 * Formulation : « ménage et taxe de séjour compris, linge en option » — jamais « tout compris »
 * (le linge ne l'est pas) ni un pourcentage de remise (allégation qui devrait rester vraie en
 * permanence) : « tarif direct, moins cher que sur les plateformes ».
 */
export interface PricesContent {
  /** Titre de la page (H1). */
  title: string;
  /** Titre de l'onglet et des moteurs (≤ 65 caractères, nom du lieu compris). */
  metaTitle: string;
  /** Meta description (120 à 155 caractères). */
  metaDescription: string;
  /** Phrase de tête ; `from` est le plus petit prix affiché, déjà formaté, ou `null`. */
  lead: (from: string | null) => string;
  /** Les semaines prises ne sont pas listées (séjours enchaînés) : le dire. */
  absentWeeks: string;
  linen: string;
  exact: string;
  otherDates: string;
  calendarLink: string;
  noPrices: string;
  grid: PriceGridLabels;
}

const linen = PROPERTY.linen.pricePerPerson;

function people(locale: Locale, c: GridColumn): string {
  const counts = c.parties.map((p) => p.adults + p.children);
  const lo = Math.min(...counts);
  const hi = Math.max(...counts);
  // La plus petite colonne chiffrée (4) vaut pour tout groupe plus petit : même prix de 1 à 4.
  const upTo = lo <= 4;
  switch (locale) {
    case "en":
      return upTo ? `Up to ${hi} guests` : lo === hi ? `${hi} guests` : `${lo} or ${hi} guests`;
    case "de":
      return upTo ? `Bis ${hi} Personen` : lo === hi ? `${hi} Personen` : `${lo} oder ${hi} Personen`;
    case "es":
      return upTo ? `Hasta ${hi} personas` : lo === hi ? `${hi} personas` : `${lo} o ${hi} personas`;
    case "it":
      return upTo ? `Fino a ${hi} persone` : lo === hi ? `${hi} persone` : `${lo} o ${hi} persone`;
    default:
      return upTo ? `Jusqu'à ${hi} personnes` : lo === hi ? `${hi} personnes` : `${lo} ou ${hi} personnes`;
  }
}

export function pricesContent(locale: Locale): PricesContent {
  switch (locale) {
    case "en":
      return {
        title: "Prices and availability",
        metaTitle: "Prices and availability — Albiez-Montrond apartment",
        metaDescription:
          "Exact prices of the coming weeks for our apartment in Albiez-Montrond (Savoie): 7 nights, cleaning and tourist tax included, direct rate.",
        lead: (from) =>
          from
            ? `7-night stays from ${from}, cleaning and tourist tax included, bed linen optional. Direct rate, cheaper than on the platforms.`
            : "Exact price of each week, cleaning and tourist tax included, bed linen optional. Direct rate, cheaper than on the platforms.",
        absentWeeks: "Weeks marked “Booked” are already taken; weeks not yet open for booking are not listed.",
        linen: `Bed linen and towels optional: ${linen} € per person per stay, to be ticked on the payment page (beds are not made up).`,
        exact: "The price is recalculated on the payment page at the time of booking: it is the one that applies.",
        otherDates: "Other dates or another length of stay:",
        calendarLink: "see the exact price in the calendar",
        noPrices: "Prices cannot be displayed right now. Choose your dates in the calendar to see the exact price.",
        grid: {
          caption: "Exact price per stay, by number of guests",
          stay: "Stay",
          nights: (n) => `${n} nights`,
          column: (c) => people("en", c),
          taken: "Booked",
          onRequest: "Price on the payment page",
          book: "Book these dates",
          updatedAt: (d) => `Table updated on ${d}.`,
        },
      };
    case "de":
      return {
        title: "Preise und Verfügbarkeit",
        metaTitle: "Preise und Verfügbarkeit — Wohnung in Albiez-Montrond",
        metaDescription:
          "Genaue Preise der kommenden Wochen für unsere Wohnung in Albiez-Montrond (Savoyen): 7 Nächte, Endreinigung und Kurtaxe inklusive, Direktpreis.",
        lead: (from) =>
          from
            ? `7 Nächte ab ${from}, Endreinigung und Kurtaxe inklusive, Bettwäsche optional. Direktpreis, günstiger als auf den Plattformen.`
            : "Genauer Preis jeder Woche, Endreinigung und Kurtaxe inklusive, Bettwäsche optional. Direktpreis, günstiger als auf den Plattformen.",
        absentWeeks: "Mit „Belegt“ markierte Wochen sind bereits vergeben; noch nicht buchbare Wochen erscheinen nicht.",
        linen: `Bettwäsche und Handtücher optional: ${linen} € pro Person und Aufenthalt, auf der Zahlungsseite anzukreuzen (Betten nicht bezogen).`,
        exact: "Der Preis wird bei der Buchung auf der Zahlungsseite neu berechnet: Dieser Preis gilt.",
        otherDates: "Andere Daten oder eine andere Dauer:",
        calendarLink: "genauer Preis im Kalender",
        noPrices: "Die Preise können gerade nicht angezeigt werden. Wählen Sie Ihre Daten im Kalender, um den genauen Preis zu sehen.",
        grid: {
          caption: "Genauer Preis pro Aufenthalt, nach Personenzahl",
          stay: "Aufenthalt",
          nights: (n) => `${n} Nächte`,
          column: (c) => people("de", c),
          taken: "Belegt",
          onRequest: "Preis auf der Zahlungsseite",
          book: "Diese Daten buchen",
          updatedAt: (d) => `Tabelle aktualisiert am ${d}.`,
        },
      };
    case "es":
      return {
        title: "Precios y disponibilidad",
        metaTitle: "Precios y disponibilidad — apartamento en Albiez-Montrond",
        metaDescription:
          "Precios exactos de las próximas semanas de nuestro apartamento en Albiez-Montrond (Saboya): 7 noches, limpieza y tasa turística incluidas.",
        lead: (from) =>
          from
            ? `Estancias de 7 noches desde ${from}, limpieza y tasa turística incluidas, ropa de cama opcional. Tarifa directa, más barata que en las plataformas.`
            : "Precio exacto de cada semana, limpieza y tasa turística incluidas, ropa de cama opcional. Tarifa directa, más barata que en las plataformas.",
        absentWeeks: "Las semanas marcadas «Reservado» ya están ocupadas; las que aún no están a la venta no aparecen.",
        linen: `Ropa de cama y toallas opcionales: ${linen} € por persona y estancia, a marcar en la página de pago (camas sin hacer).`,
        exact: "El precio se recalcula en la página de pago al reservar: es el que se aplica.",
        otherDates: "Otras fechas u otra duración:",
        calendarLink: "precio exacto en el calendario",
        noPrices: "Los precios no se pueden mostrar en este momento. Elija sus fechas en el calendario para ver el precio exacto.",
        grid: {
          caption: "Precio exacto por estancia, según el número de personas",
          stay: "Estancia",
          nights: (n) => `${n} noches`,
          column: (c) => people("es", c),
          taken: "Reservado",
          onRequest: "Precio en la página de pago",
          book: "Reservar estas fechas",
          updatedAt: (d) => `Tabla actualizada el ${d}.`,
        },
      };
    case "it":
      return {
        title: "Prezzi e disponibilità",
        metaTitle: "Prezzi e disponibilità — appartamento ad Albiez-Montrond",
        metaDescription:
          "Prezzi esatti delle prossime settimane del nostro appartamento ad Albiez-Montrond (Savoia): 7 notti, pulizia e tassa di soggiorno incluse.",
        lead: (from) =>
          from
            ? `Soggiorni di 7 notti da ${from}, pulizia e tassa di soggiorno incluse, biancheria opzionale. Tariffa diretta, più conveniente che sulle piattaforme.`
            : "Prezzo esatto di ogni settimana, pulizia e tassa di soggiorno incluse, biancheria opzionale. Tariffa diretta, più conveniente che sulle piattaforme.",
        absentWeeks: "Le settimane indicate «Prenotato» sono già occupate; quelle non ancora in vendita non compaiono.",
        linen: `Biancheria da letto e asciugamani opzionali: ${linen} € a persona per soggiorno, da spuntare nella pagina di pagamento (letti non preparati).`,
        exact: "Il prezzo viene ricalcolato nella pagina di pagamento al momento della prenotazione: è quello che si applica.",
        otherDates: "Altre date o un'altra durata:",
        calendarLink: "prezzo esatto nel calendario",
        noPrices: "Al momento i prezzi non possono essere mostrati. Scegliete le date nel calendario per vedere il prezzo esatto.",
        grid: {
          caption: "Prezzo esatto per soggiorno, secondo il numero di persone",
          stay: "Soggiorno",
          nights: (n) => `${n} notti`,
          column: (c) => people("it", c),
          taken: "Prenotato",
          onRequest: "Prezzo nella pagina di pagamento",
          book: "Prenota queste date",
          updatedAt: (d) => `Tabella aggiornata il ${d}.`,
        },
      };
    default:
      return {
        title: "Tarifs et disponibilités",
        metaTitle: "Tarifs et disponibilités — appartement à Albiez-Montrond",
        metaDescription:
          "Prix exacts des prochaines semaines de notre appartement à Albiez-Montrond (Savoie) : 7 nuits, ménage et taxe de séjour compris, tarif direct.",
        lead: (from) =>
          from
            ? `Séjours de 7 nuits à partir de ${from}, ménage et taxe de séjour compris, linge en option. Tarif direct, moins cher que sur les plateformes.`
            : "Prix exact de chaque semaine, ménage et taxe de séjour compris, linge en option. Tarif direct, moins cher que sur les plateformes.",
        absentWeeks: "Les semaines marquées « Réservé » sont déjà prises ; celles qui ne sont pas encore ouvertes à la vente n'apparaissent pas.",
        linen: `Linge de lit et serviettes en option : ${linen} € par personne et par séjour, à cocher sur la page de paiement (lits non faits).`,
        exact: "Le prix est recalculé sur la page de paiement au moment de la réservation : c'est lui qui s'applique.",
        otherDates: "Autres dates ou autre durée :",
        calendarLink: "prix exact dans le calendrier",
        noPrices: "Les prix ne peuvent pas être affichés pour le moment. Choisissez vos dates dans le calendrier pour voir le prix exact.",
        grid: {
          caption: "Prix exact par séjour, selon le nombre de voyageurs",
          stay: "Séjour",
          nights: (n) => `${n} nuits`,
          column: (c) => people("fr", c),
          taken: "Réservé",
          onRequest: "Prix sur la page de paiement",
          book: "Réserver ces dates",
          updatedAt: (d) => `Tableau mis à jour le ${d}.`,
        },
      };
  }
}
