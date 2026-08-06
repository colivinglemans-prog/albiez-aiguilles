"use client";

import { useTranslation } from "@/lib/i18n";
import { PROPERTY, RESORT } from "@/lib/property";
import { Section, SectionTitle } from "./Section";

export default function LocationSection() {
  const { t } = useTranslation();

  const stats = [
    { value: `${RESORT.slopesKm} km`, label: t.location.resortStats.slopes },
    { value: String(RESORT.lifts), label: t.location.resortStats.lifts },
    {
      value: `${RESORT.altitudeMin}–${RESORT.altitudeMax} m`,
      label: t.location.resortStats.altitude,
    },
  ];

  return (
    <Section id="situation">
      <SectionTitle title={t.location.title} subtitle={t.location.subtitle} />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="font-semibold">{t.location.resortTitle}</h3>
          <p className="mt-2 text-sm text-secondary">
            {t.location.resortDescription}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xl font-bold text-accent">{stat.value}</dt>
                <dd className="text-xs text-secondary">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <a
            href={PROPERTY.links.resort}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-accent underline underline-offset-2 hover:text-accent-dark"
          >
            station-albiez.com
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-light-bg p-6">
          <p className="text-sm font-semibold">{PROPERTY.residence}</p>
          <p className="mt-1 text-sm text-secondary">{PROPERTY.address.full}</p>

          <p className="mt-6 text-xs font-semibold tracking-wide text-secondary uppercase">
            {t.location.altitudeLabel}
          </p>
          <p className="text-2xl font-bold text-primary">
            {PROPERTY.altitude} m
          </p>

          <a
            href={PROPERTY.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t.location.openMaps}
          </a>
        </div>
      </div>
    </Section>
  );
}
