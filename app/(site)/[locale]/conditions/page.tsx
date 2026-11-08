import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cancellationText } from "@sejour/socle/lib/quote-labels";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { CANCELLATION_POLICY, PAYMENT_POLICY, PROPERTY } from "@/lib/property";
import { Section, SectionTitle } from "@/components/public/Section";
import { alternatesFor, conditionsPath, openGraphLocales } from "@/lib/seo";

/**
 * Conditions de réservation : la page que citent `llms.txt`, la page de devis et le profil
 * Stripe (« politiques de la boutique »). Les nombres viennent des constantes de
 * `lib/property.ts` — les mêmes que contrôle la surveillance (`llms.policies`) et que sert
 * l'API des IA —, les phrases sont ici, dans les cinq langues.
 */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface Content {
  title: string;
  intro: string;
  sections: { title: string; items: string[] }[];
}

const linen = PROPERTY.linen.pricePerPerson;
const cleaning = PROPERTY.services.cleaningFee;
const { max } = PROPERTY.capacity;
const upfront = PAYMENT_POLICY.direct.upfrontPct;
const deposit = PAYMENT_POLICY.business?.depositPct ?? 30;
const email = PROPERTY.contact.email;

function content(locale: Locale): Content {
  const cancel = cancellationText(CANCELLATION_POLICY, locale);
  switch (locale) {
    case "en":
      return {
        title: "Booking conditions",
        intro: "These conditions apply to direct bookings made on this website. The cancellation policy is the same as on Airbnb.",
        sections: [
          { title: "Payment", items: [
            `Online booking: ${upfront}% paid at booking, by card, on the secure Beds24 payment page. Tourist tax included.`,
            `Companies (on invoice): ${deposit}% deposit at booking, balance before arrival, by card or bank transfer.`,
            "Booking is instant: dates are confirmed as soon as the payment is made. A quote does not hold the dates.",
          ] },
          { title: "Cancellation", items: [cancel, "Bookings made on Airbnb, Booking.com or Abritel follow the conditions shown on that platform."] },
          { title: "Arrival and departure", items: ["Arrival from 4 pm, self check-in (key box), on-site contact.", "Departure before 10 am."] },
          { title: "Included and optional", items: [
            `End-of-stay cleaning included (${cleaning} €, except kitchen and dishes) and tourist tax included.`,
            `Bed linen and towels optional: ${linen} € per person per stay, to be ticked on the payment page. Duvets and pillows are provided.`,
          ] },
          { title: "Capacity and house rules", items: [
            `Up to ${max} guests, babies included (baby kit on request).`,
            "No pets. Non-smoking apartment.",
            "Minimum stay depends on the dates (weekly, Saturday to Saturday, during most of the ski season; usually 2 nights off-season): the booking calendar shows the rule for each date.",
            "Work stays: off-season only (not while the ski area is open, nor in July-August).",
            "Winter tyres or chains are mandatory in Savoie from 1 November to 31 March.",
          ] },
          { title: "Personal data", items: [
            `The data needed for the booking (name, contact details, dates, payment) is used only to manage the booking and the stay. It is processed by Beds24 (booking software) and its payment provider; the site is hosted by Vercel. Nothing is sold or used for advertising. Data controller: the site publisher (see the legal notice, /en/mentions-legales). Access or deletion: ${PROPERTY.contact.email}.`,
            `To access, correct or delete your data: ${email}.`,
          ] },
        ],
      };
    case "de":
      return {
        title: "Buchungsbedingungen",
        intro: "Diese Bedingungen gelten für Direktbuchungen auf dieser Website. Die Stornierungsbedingungen sind dieselben wie bei Airbnb.",
        sections: [
          { title: "Zahlung", items: [
            `Online-Buchung: ${upfront} % bei der Buchung, per Karte, auf der sicheren Zahlungsseite von Beds24. Kurtaxe inklusive.`,
            `Unternehmen (auf Rechnung): ${deposit} % Anzahlung bei der Buchung, Restzahlung vor der Anreise, per Karte oder Überweisung.`,
            "Die Buchung ist sofort verbindlich: Die Daten sind mit der Zahlung bestätigt. Ein Angebot reserviert keine Daten.",
          ] },
          { title: "Stornierung", items: [cancel, "Buchungen über Airbnb, Booking.com oder Abritel folgen den Bedingungen der jeweiligen Plattform."] },
          { title: "Anreise und Abreise", items: ["Anreise ab 16 Uhr, selbstständig (Schlüsselbox), Ansprechpartner vor Ort.", "Abreise vor 10 Uhr."] },
          { title: "Inklusive und optional", items: [
            `Endreinigung inklusive (${cleaning} €, außer Küche und Geschirr), Kurtaxe inklusive.`,
            `Bettwäsche und Handtücher optional: ${linen} € pro Person und Aufenthalt, auf der Zahlungsseite anzukreuzen. Bettdecken und Kissen sind vorhanden.`,
          ] },
          { title: "Kapazität und Hausregeln", items: [
            `Bis zu ${max} Gäste, Babys willkommen (Babyausstattung auf Anfrage).`,
            "Keine Haustiere. Nichtraucherwohnung.",
            "Der Mindestaufenthalt hängt von den Daten ab (in weiten Teilen der Skisaison wochenweise von Samstag bis Samstag, außerhalb der Saison meist 2 Nächte): Der Buchungskalender zeigt die Regel für jedes Datum.",
            "Geschäftsaufenthalte nur außerhalb der Saison (nicht während der Skisaison und nicht im Juli-August).",
            "Winterreifen oder Schneeketten sind in Savoyen vom 1. November bis 31. März Pflicht.",
          ] },
          { title: "Personenbezogene Daten", items: [
            `Die für die Buchung nötigen Daten (Name, Kontaktdaten, Daten, Zahlung) dienen nur der Verwaltung der Buchung und des Aufenthalts. Sie werden von Beds24 (Buchungssoftware) und deren Zahlungsdienstleister verarbeitet; die Website wird bei Vercel gehostet. Nichts wird verkauft oder für Werbung genutzt. Verantwortlicher: der Herausgeber der Website (siehe Impressum, /de/mentions-legales). Auskunft oder Löschung: ${PROPERTY.contact.email}.`,
            `Auskunft, Berichtigung oder Löschung: ${email}.`,
          ] },
        ],
      };
    case "es":
      return {
        title: "Condiciones de reserva",
        intro: "Estas condiciones se aplican a las reservas directas en este sitio. La política de cancelación es la misma que en Airbnb.",
        sections: [
          { title: "Pago", items: [
            `Reserva en línea: ${upfront} % al reservar, con tarjeta, en la página de pago segura de Beds24. Tasa turística incluida.`,
            `Empresas (con factura): depósito del ${deposit} % al reservar, saldo antes de la llegada, con tarjeta o transferencia.`,
            "La reserva es inmediata: las fechas se confirman con el pago. Un presupuesto no bloquea las fechas.",
          ] },
          { title: "Cancelación", items: [cancel, "Las reservas hechas en Airbnb, Booking.com o Abritel siguen las condiciones de esa plataforma."] },
          { title: "Llegada y salida", items: ["Llegada a partir de las 16 h, autónoma (caja de llaves), contacto en el lugar.", "Salida antes de las 10 h."] },
          { title: "Incluido y opcional", items: [
            `Limpieza final incluida (${cleaning} €, salvo cocina y vajilla) y tasa turística incluida.`,
            `Ropa de cama y toallas opcionales: ${linen} € por persona y estancia, a marcar en la página de pago. Edredones y almohadas incluidos.`,
          ] },
          { title: "Capacidad y normas", items: [
            `Hasta ${max} personas, bebés incluidos (kit de bebé bajo petición).`,
            "No se admiten mascotas. Apartamento para no fumadores.",
            "La estancia mínima depende de las fechas (por semanas, de sábado a sábado, durante gran parte de la temporada de esquí; en general 2 noches fuera de temporada): el calendario de reserva indica la regla de cada fecha.",
            "Estancias de trabajo solo fuera de temporada (ni con las pistas abiertas ni en julio-agosto).",
            "Neumáticos de invierno o cadenas obligatorios en Saboya del 1 de noviembre al 31 de marzo.",
          ] },
          { title: "Datos personales", items: [
            `Los datos necesarios para la reserva (nombre, contacto, fechas, pago) solo se usan para gestionar la reserva y la estancia. Los tratan Beds24 (software de reservas) y su proveedor de pago; el sitio está alojado en Vercel. Nada se vende ni se usa con fines publicitarios. Responsable del tratamiento: el editor del sitio (ver aviso legal, /es/mentions-legales). Acceso o supresión: ${PROPERTY.contact.email}.`,
            `Para consultar, corregir o borrar sus datos: ${email}.`,
          ] },
        ],
      };
    case "it":
      return {
        title: "Condizioni di prenotazione",
        intro: "Queste condizioni valgono per le prenotazioni dirette su questo sito. La politica di cancellazione è la stessa di Airbnb.",
        sections: [
          { title: "Pagamento", items: [
            `Prenotazione online: ${upfront}% alla prenotazione, con carta, sulla pagina di pagamento sicura di Beds24. Tassa di soggiorno inclusa.`,
            `Aziende (con fattura): acconto del ${deposit}% alla prenotazione, saldo prima dell'arrivo, con carta o bonifico.`,
            "La prenotazione è immediata: le date sono confermate al pagamento. Un preventivo non blocca le date.",
          ] },
          { title: "Cancellazione", items: [cancel, "Le prenotazioni su Airbnb, Booking.com o Abritel seguono le condizioni di quella piattaforma."] },
          { title: "Arrivo e partenza", items: ["Arrivo dalle 16, in autonomia (cassetta delle chiavi), referente sul posto.", "Partenza entro le 10."] },
          { title: "Incluso e opzionale", items: [
            `Pulizia finale inclusa (${cleaning} €, esclusi cucina e stoviglie) e tassa di soggiorno inclusa.`,
            `Biancheria da letto e asciugamani opzionali: ${linen} € a persona per soggiorno, da spuntare nella pagina di pagamento. Piumini e cuscini forniti.`,
          ] },
          { title: "Capienza e regole", items: [
            `Fino a ${max} persone, neonati compresi (kit neonato su richiesta).`,
            "Animali non ammessi. Appartamento non fumatori.",
            "Il soggiorno minimo dipende dalle date (a settimana, da sabato a sabato, per gran parte della stagione sciistica; in genere 2 notti fuori stagione): il calendario di prenotazione indica la regola di ogni data.",
            "Soggiorni di lavoro solo fuori stagione (non con le piste aperte né a luglio-agosto).",
            "Pneumatici invernali o catene obbligatori in Savoia dal 1° novembre al 31 marzo.",
          ] },
          { title: "Dati personali", items: [
            `I dati necessari alla prenotazione (nome, recapiti, date, pagamento) servono solo a gestire la prenotazione e il soggiorno. Sono trattati da Beds24 (software di prenotazione) e dal suo fornitore di pagamento; il sito è ospitato da Vercel. Nulla viene venduto né usato per pubblicità. Titolare del trattamento: l'editore del sito (vedi note legali, /it/mentions-legales). Accesso o cancellazione: ${PROPERTY.contact.email}.`,
            `Per consultare, correggere o cancellare i dati: ${email}.`,
          ] },
        ],
      };
    default:
      return {
        title: "Conditions de réservation",
        intro: "Ces conditions s'appliquent aux réservations directes faites sur ce site. La politique d'annulation est la même que sur Airbnb.",
        sections: [
          { title: "Paiement", items: [
            `Réservation en ligne : ${upfront} % à la réservation, par carte, sur la page de paiement sécurisée Beds24. Taxe de séjour comprise.`,
            `Entreprises (sur facture) : acompte de ${deposit} % à la réservation, solde avant l'arrivée, par carte ou virement.`,
            "La réservation est instantanée : les dates sont confirmées dès le paiement. Un devis ne bloque pas les dates.",
          ] },
          { title: "Annulation", items: [cancel, "Une réservation faite sur Airbnb, Booking.com ou Abritel suit les conditions affichées sur cette plateforme."] },
          { title: "Arrivée et départ", items: ["Arrivée à partir de 16 h, autonome (boîte à clés), contact sur place.", "Départ avant 10 h."] },
          { title: "Compris et en option", items: [
            `Ménage de fin de séjour compris (${cleaning} €, hors cuisine et vaisselle) et taxe de séjour comprise.`,
            `Linge de lit et serviettes en option : ${linen} € par personne et par séjour, à cocher sur la page de paiement. Couettes et oreillers fournis.`,
          ] },
          { title: "Capacité et règles", items: [
            `Jusqu'à ${max} personnes, bébés compris (kit bébé sur demande).`,
            "Animaux non autorisés. Logement non-fumeur.",
            "Le séjour minimum dépend des dates (à la semaine, du samedi au samedi, sur une grande partie de la saison de ski ; en général 2 nuits hors saison) : le calendrier de réservation indique la règle de chaque date.",
            "Séjours professionnels uniquement hors saison (ni pendant l'ouverture du domaine skiable, ni en juillet-août).",
            "Pneus hiver ou chaînes obligatoires en Savoie du 1er novembre au 31 mars.",
          ] },
          { title: "Données personnelles", items: [
            `Les données nécessaires à la réservation (nom, coordonnées, dates, paiement) servent uniquement à gérer la réservation et le séjour. Elles sont traitées par Beds24 (logiciel de réservation) et son prestataire de paiement ; le site est hébergé par Vercel. Rien n'est vendu ni utilisé à des fins publicitaires. Responsable du traitement : l'éditeur du site (voir les mentions légales, /fr/mentions-legales). Accès ou suppression : ${PROPERTY.contact.email}.`,
            `Pour consulter, corriger ou supprimer vos données : ${email}.`,
          ] },
        ],
      };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = content(locale);
  return {
    title: c.title,
    description: c.intro,
    alternates: alternatesFor(locale, conditionsPath),
    openGraph: { ...openGraphLocales(locale) },
  };
}

export default async function ConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content(locale);
  return (
    <Section>
      <SectionTitle title={c.title} />
      <p className="mb-10 max-w-3xl text-secondary">{c.intro}</p>
      {c.sections.map((s) => (
        <div key={s.title} className="mb-10 max-w-3xl">
          <h2 className="mb-3 text-lg font-semibold">{s.title}</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary">
            {s.items.filter(Boolean).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
