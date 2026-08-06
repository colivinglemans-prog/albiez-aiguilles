"use client";

import { useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";
import { Section, SectionTitle } from "./Section";

/**
 * Placeholder de réservation.
 *
 * Le calendrier temps réel viendra de Beds24 une fois le compte de la SCI créé —
 * ce bloc sera alors remplacé par le composant calendrier, sans toucher au reste
 * de la page. En attendant on renvoie vers Airbnb plutôt que d'afficher un vide.
 */
export default function BookingSection() {
  const { t } = useTranslation();

  return (
    <Section id="reserver">
      <div className="rounded-3xl bg-accent-soft px-6 py-12 text-center sm:px-12">
        <SectionTitle title={t.booking.title} />
        <p className="-mt-4 mb-8 text-secondary">{t.booking.subtitle}</p>

        <p className="mx-auto mb-2 max-w-xl text-sm font-semibold text-accent-dark">
          {t.booking.comingSoon}
        </p>
        <p className="mx-auto mb-8 max-w-xl text-sm text-secondary">
          {t.booking.comingSoonText}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={PROPERTY.links.airbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {t.booking.bookOnAirbnb}
          </a>
          <a
            href={`mailto:${PROPERTY.contact.email}`}
            className="rounded-full border border-foreground px-6 py-3 text-sm font-semibold transition-colors hover:bg-white"
          >
            {t.booking.contactUs}
          </a>
        </div>
      </div>
    </Section>
  );
}
