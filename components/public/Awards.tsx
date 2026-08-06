"use client";

import { useTranslation } from "@/lib/i18n";
import { AWARDS } from "@/lib/property";
import { Section, SectionTitle } from "./Section";
import SuperhostCard from "./SuperhostCard";

/**
 * Distinctions : Superhôte Airbnb et Traveller Review Awards Booking.
 *
 * Les certificats officiels de Booking sont de grands aplats bleus avec du texte
 * incrusté. Ils sont reconstruits ici aux couleurs du site : le texte devient
 * traduisible, lisible par un lecteur d'écran, et net à toutes les tailles — le
 * visuel 2025 fourni ne fait que 305 px de côté. Les fichiers d'origine restent
 * dans `public/images/awards/` pour un usage hors site.
 */
export default function Awards() {
  const { locale, t } = useTranslation();

  return (
    <Section id="distinctions">
      <SectionTitle title={t.awards.title} subtitle={t.awards.subtitle} />

      <SuperhostCard />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {AWARDS.map((award) => (
          <div
            key={award.year}
            className="flex items-center gap-5 rounded-2xl border border-border bg-white p-5 sm:p-6"
          >
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-[#003b95] text-white">
              <span className="text-2xl font-bold leading-none">
                {award.score.toLocaleString(locale, { minimumFractionDigits: 1 })}
              </span>
              <span className="mt-1 text-[10px] font-medium opacity-90">
                {t.awards.outOf(award.scale)}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wide text-secondary uppercase">
                {award.source}
              </p>
              <p className="mt-0.5 font-semibold">{t.awards.bookingLabel}</p>
              <p className="mt-0.5 text-sm text-secondary">
                {t.awards.yearLabel(award.year)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-secondary">{t.awards.consecutive}</p>
    </Section>
  );
}
