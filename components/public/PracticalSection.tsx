"use client";

import { useTranslation } from "@/lib/i18n";
import { Section, SectionTitle } from "./Section";

export default function PracticalSection() {
  const { t } = useTranslation();

  return (
    <Section id="infos-pratiques" className="!py-14">
      <SectionTitle title={t.practical.title} />

      {/*
        L'avertissement sur les 50 marches est mis en évidence volontairement :
        c'est la principale cause de déception possible à l'arrivée, autant
        que le voyageur la voie avant de réserver plutôt qu'après.
      */}
      <div className="mb-10 flex gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
        <p className="text-sm text-amber-900">{t.practical.stepsWarning}</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 font-semibold">{t.practical.accessTitle}</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li>{t.practical.parking}</li>
            <li>{t.practical.keyBox}</li>
            <li>{t.practical.skiLocker}</li>
            <li>{t.practical.onSiteContact}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">{t.practical.servicesTitle}</h3>
          {/* Le linge a sa propre section : le répéter ici brouillerait le message. */}
          <ul className="space-y-2 text-sm text-secondary">
            <li>{t.practical.cleaning}</li>
          </ul>
          <p className="mt-4 mb-2 text-sm font-semibold">
            {t.practical.bringYourOwnTitle}
          </p>
          <ul className="space-y-1 text-sm text-secondary">
            {t.practical.bringYourOwn.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">{t.practical.rulesTitle}</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li>{t.practical.noPets}</li>
            <li>{t.practical.noSmoking}</li>
            <li>{t.practical.babyKit}</li>
          </ul>
          <ul className="mt-3 space-y-1 text-sm text-secondary">
            {t.practical.babyKitItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
