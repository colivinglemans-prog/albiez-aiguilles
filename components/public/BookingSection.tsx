"use client";

import { useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";
import { Section, SectionTitle } from "./Section";
import CalendrierReservation from "./CalendrierReservation";

/**
 * Bloc de réservation.
 *
 * Le calendrier interroge Beds24 en direct et ouvre son tunnel de paiement dans une modale.
 *
 * Le bouton Airbnb **reste**, en second et en discret : tant que la conversion en direct
 * n'est pas mesurée, retirer le chemin qui fonctionne déjà serait un pari. Il s'efface de
 * lui-même le jour où le direct aura fait ses preuves.
 */
export default function BookingSection() {
  const { t } = useTranslation();

  return (
    <Section id="reserver">
      <div className="rounded-3xl bg-accent-soft px-4 py-10 sm:px-8">
        <div className="text-center">
          <SectionTitle title={t.booking.title} />
          <p className="-mt-4 mb-8 text-secondary">{t.booking.subtitle}</p>
        </div>

        <CalendrierReservation />

        {/* Chemins secondaires, volontairement en retrait : le bouton principal est celui du
            calendrier, qui mène au tarif direct. Les deux étaient en style « primary » avant
            l'arrivée du calendrier — les laisser ainsi mettrait en concurrence visuelle un
            canal à 18 % de commission avec un canal à 1,92 %. */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <a
            href={PROPERTY.links.airbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-5 py-2.5 font-medium text-secondary transition-colors hover:bg-white hover:text-foreground"
          >
            {t.booking.bookOnAirbnb}
          </a>
          <a
            href={`mailto:${PROPERTY.contact.email}`}
            className="rounded-full border border-border px-5 py-2.5 font-medium text-secondary transition-colors hover:bg-white hover:text-foreground"
          >
            {t.booking.contactUs}
          </a>
        </div>
      </div>
    </Section>
  );
}
