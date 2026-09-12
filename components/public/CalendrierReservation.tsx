"use client";

import ReservationCalendar from "@sejour/socle/components/ReservationCalendar";
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
 */
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
    />
  );
}
