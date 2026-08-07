"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";
import { Section, SectionTitle } from "./Section";

/**
 * Hors saison : l'échange de maison plutôt que la location.
 *
 * Le bloc ne parle ni de ski ni d'été — c'est ce qui reste quand les deux saisons
 * sont fermées. Il figure donc sur les trois pages, au même titre que le reste du
 * tronc commun.
 */
export default function OffSeasonSection() {
  const { t } = useTranslation();

  return (
    <Section className="!py-10">
      <div className="rounded-2xl border border-border bg-light-bg p-6 sm:p-8">
        <SectionTitle title={t.home.offSeasonTitle} />
        <p className="-mt-4 max-w-3xl text-secondary">{t.home.offSeasonText}</p>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <Image
            src="/brand/homeexchange.svg"
            alt="HomeExchange"
            width={152}
            height={44}
            unoptimized
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-3xl text-secondary">
            {t.home.offSeasonExchange}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={PROPERTY.links.homeExchange}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t.home.offSeasonExchangeCta}
            </a>
            <a
              href={PROPERTY.links.homeExchangeSponsor}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-light-bg"
            >
              {t.home.offSeasonSponsorCta}
            </a>
          </div>

          {/* La contrepartie est annoncée : un lien de parrainage qui ne dit pas
              son nom se retourne contre celui qui le pose. */}
          <p className="mt-3 text-xs text-secondary">
            {t.home.offSeasonSponsorNote}
          </p>
        </div>
      </div>
    </Section>
  );
}
