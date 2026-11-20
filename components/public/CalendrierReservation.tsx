"use client";

import ReservationCalendar from "@sejour/socle/components/ReservationCalendar";
import { calendarQuoteLabels, type CalendarStay } from "@sejour/socle/lib/calendar-quote";
import { LOCALE_META, useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";
import { formatPeriode, HIVERS } from "@/lib/seasons";

/**
 * Calendrier de réservation directe — l'enveloppe locale du composant du socle.
 *
 * Le calendrier lui-même (huit états de case, sélection arrivée/départ, séjour minimum,
 * refetch au retour d'onglet, modale Beds24) est monté dans
 * `@sejour/socle/components/ReservationCalendar` au Lot 5 : il était à 80 % identique à celui
 * du Mans, et l'en-tête de ce fichier le disait déjà — « porté de celui du Mans ».
 *
 * Ne restent ici que les quatre choses qui ne peuvent pas monter :
 *
 * - l'identifiant Beds24 et la capacité, lus dans `PROPERTY` ;
 * - la route de disponibilité et ses noms de paramètres (`du` / `au`) ;
 * - la **bande de saison de ski**, teintée derrière les cases, et sa légende ;
 * - les libellés hors de la section `calendar` commune : les trois `aria-label`.
 *
 * La **rotation du samedi** (`sansArrivee` / `sansDepart`) n'est pas un paramètre : elle
 * arrive dans la réponse de `/api/disponibilites`, et le socle la lit si elle est là. Le Mans
 * n'envoie pas ces champs et ne voit aucune différence.
 *
 * **Bloc prix** (socle v3.29.0) : une fois les dates choisies, « Disponible » et le total Beds24
 * exact, lus sur `/api/agent/quote` — la route des IA, même calcul et même cache. Le linge n'est
 * jamais compté dans ce total : il est en option en direct, à cocher sur la page de paiement.
 */

/** Ce que le total comprend — et ne comprend pas : le linge, en option (règle de l'hôte, 19/11/2026). */
const COMPRIS: Record<string, (prix: number) => string> = {
  fr: (p) => `Ménage de fin de séjour (hors cuisine et vaisselle) et taxe de séjour compris. Linge de lit et serviettes en option (${p} € par personne), à cocher sur la page de paiement.`,
  en: (p) => `End-of-stay cleaning (except kitchen and dishes) and tourist tax included. Bed linen and towels optional (€${p} per person), to tick on the payment page.`,
  de: (p) => `Endreinigung (außer Küche und Geschirr) und Kurtaxe inklusive. Bettwäsche und Handtücher optional (${p} € pro Person), auf der Zahlungsseite anzukreuzen.`,
  es: (p) => `Limpieza final (excepto cocina y vajilla) y tasa turística incluidas. Ropa de cama y toallas opcionales (${p} € por persona), a marcar en la página de pago.`,
  it: (p) => `Pulizia finale (escluse cucina e stoviglie) e tassa di soggiorno incluse. Biancheria e asciugamani opzionali (${p} € a persona), da spuntare nella pagina di pagamento.`,
};

/** La route de devis pour un séjour ; `src=calendrier` distingue ces appels de ceux des IA. */
const urlDevis = (lang: string) => (s: CalendarStay) =>
  `/api/agent/quote?${new URLSearchParams({
    checkin: s.checkIn,
    checkout: s.checkOut,
    adults: String(s.adults),
    children: String(s.children),
    lang,
    src: "calendrier",
  })}`;

export default function CalendrierReservation() {
  const { t, locale } = useTranslation();

  /*
   * Bande de saison de ski, teintée derrière les cases.
   *
   * On parcourt `HIVERS` et non le seul `WINTER_OPENING` : le calendrier navigue librement,
   * et un hiver publié mais absent du teintage se lirait comme « hors saison ».
   */
  const estSaisonSki = (jour: string) =>
    HIVERS.some((h) => jour >= h.debut && jour <= h.fin);

  /*
   * La légende étiquette la bande **effectivement visible** : le socle rend la fenêtre des
   * deux mois affichés, sans quoi naviguer vers un autre hiver afficherait les dates du
   * mauvais.
   */
  const legendeSaison = (debutFenetre: string, finFenetre: string) => {
    const hiver = HIVERS.find((h) => h.debut <= finFenetre && h.fin >= debutFenetre);
    if (!hiver) return null;
    const periode = formatPeriode(LOCALE_META[locale].bcp47, hiver.debut, hiver.fin);
    return (
      // La teinte seule ne suffirait pas : une information portée par la couleur doit avoir
      // un équivalent textuel. La légende nomme la période en clair, ce qui vaut mieux que
      // d'alourdir l'`aria-label` des quatre-vingt-treize cases concernées.
      <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
        <span aria-hidden className="h-4 w-4 rounded-sm border border-sky-400 bg-sky-200" />
        {t.seasons.skiPeriod(periode.du, periode.au)}
      </p>
    );
  };

  return (
    <ReservationCalendar
      propertyId={PROPERTY.beds24.propertyId}
      lang={locale}
      availabilityUrl={(du, au) => `/api/disponibilites?du=${du}&au=${au}`}
      labels={t.calendar}
      a11y={{
        previousMonth: t.calendar.previousMonth,
        nextMonth: t.calendar.nextMonth,
        close: t.calendar.close,
      }}
      guests={{
        maxTotal: PROPERTY.capacity.max,
        childrenLabel: t.calendar.children,
        note: t.calendar.capacityNote(PROPERTY.capacity.max),
      }}
      dayOverlayClass={(jour) => (estSaisonSki(jour) ? "bg-sky-200" : undefined)}
      overlayLegend={legendeSaison}
      quote={{
        url: urlDevis(locale),
        labels: calendarQuoteLabels(locale),
        included: (COMPRIS[locale] ?? COMPRIS.fr)(PROPERTY.linen.pricePerPerson),
      }}
    />
  );
}
