"use client";

import { useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";
import { HOSTING_SINCE } from "@/lib/reviews";
import { Section, SectionTitle } from "./Section";

export default function HostSection() {
  const { t } = useTranslation();

  // Ancienneté dérivée du plus ancien avis : le chiffre ne se périme pas tout seul.
  const years = new Date().getFullYear() - HOSTING_SINCE;

  return (
    <Section id="hote" className="!py-14">
      <SectionTitle title={t.host.title} />

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex shrink-0 flex-col items-center rounded-2xl border border-border bg-white p-6 md:w-64">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent-dark text-3xl font-bold text-white">
            A
          </div>
          <p className="mt-3 text-lg font-semibold">Alexandre</p>
          <p className="text-sm text-secondary">{t.host.badge}</p>
          <p className="mt-4 text-center text-xs text-secondary">
            {t.host.experience(years)}
          </p>
        </div>

        <div className="flex-1 space-y-5">
          <div>
            <h3 className="font-semibold">{t.host.about}</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-secondary">
              {t.host.aboutText}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">{t.host.languages}</h3>
              <p className="mt-1 text-sm text-secondary">{t.host.languagesValue}</p>
            </div>
            <div>
              <h3 className="font-semibold">{t.host.responseRate}</h3>
              <p className="mt-1 text-sm text-secondary">
                {t.host.responseRateValue}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={`mailto:${PROPERTY.contact.email}`}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t.host.emailCta}
            </a>
            <a
              href={PROPERTY.links.airbnb}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-light-bg"
            >
              {t.host.airbnbCta}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
