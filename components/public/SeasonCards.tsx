"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { SEASONS, seasonHref, type Season } from "@/lib/seasons";
import { Section, SectionTitle } from "./Section";

/** Une photo d'ambiance par saison, choisie côté serveur (peut être absente). */
export type SeasonCover = Partial<Record<Season, string>>;

export default function SeasonCards({ covers }: { covers: SeasonCover }) {
  const { locale, t } = useTranslation();

  return (
    <Section id="saisons">
      <SectionTitle
        title={t.home.chooseSeason}
        subtitle={t.home.chooseSeasonSubtitle}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {SEASONS.map((season) => {
          const card = t.home.seasonCard[season];
          const cover = covers[season];

          return (
            <Link
              key={season}
              href={seasonHref(locale, season)}
              data-season={season}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-16/9 bg-accent-soft">
                {cover ? (
                  <Image
                    src={cover}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-accent-dark">
                    {t.gallery.empty}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm text-secondary">
                  {card.description}
                </p>
                <span className="mt-5 text-sm font-semibold text-accent group-hover:text-accent-dark">
                  {card.cta} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
