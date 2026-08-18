"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation, LOCALE_META } from "@/lib/i18n";
import type { Season } from "@/lib/seasons";

/**
 * Un article tel que la grille en a besoin.
 *
 * Les photos sont résolues côté serveur (`getPhoto` lit le système de fichiers) et
 * passées déjà mesurées : ce composant est client, il ne peut pas les relever lui-même.
 */
export interface GuideCard {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  season: Season | null;
  photo: { src: string; width: number; height: number } | null;
}

type Filter = "all" | Season;

/**
 * Un article sans saison reste visible sous **chaque** filtre.
 *
 * C'est le point important : « faire ses courses » ou « la boulangerie » servent autant
 * en février qu'en août. Les exclure d'un filtre de saison donnerait une liste
 * techniquement juste et pratiquement inutilisable.
 */
function matches(card: GuideCard, filter: Filter): boolean {
  return filter === "all" || card.season === null || card.season === filter;
}

export default function GuideFilter({ cards }: { cards: GuideCard[] }) {
  const { locale, t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");

  const dateLocale = LOCALE_META[locale].bcp47;
  const visible = cards.filter((card) => matches(card, filter));

  const buttons: Array<{ key: Filter; label: string }> = [
    { key: "all", label: t.blog.filter.all },
    { key: "hiver", label: t.blog.filter.hiver },
    { key: "ete", label: t.blog.filter.ete },
  ];

  return (
    <>
      <div className="mt-10">
        <div role="group" aria-label={t.blog.filter.label} className="flex flex-wrap gap-2">
          {buttons.map(({ key, label }) => {
            const isActive = filter === key;
            const count = cards.filter((card) => matches(card, key)).length;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-border text-secondary hover:border-foreground hover:text-foreground"
                }`}
              >
                {label}
                <span className={isActive ? "ml-1.5 opacity-80" : "ml-1.5 opacity-60"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {filter !== "all" && (
          <p className="mt-4 max-w-3xl text-sm text-secondary">{t.blog.filter.note}</p>
        )}
      </div>

      <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card) => (
          <li
            key={card.slug}
            data-season={card.season ?? undefined}
            className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
          >
            <Link href={`/${locale}/guide/${card.slug}`} className="flex h-full flex-col">
              {card.photo && (
                <div className="relative overflow-hidden bg-light-bg">
                  <Image
                    src={card.photo.src}
                    alt={card.title}
                    width={card.photo.width}
                    height={card.photo.height}
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow">
                    {card.season
                      ? t.blog.seasonBadge[card.season]
                      : t.blog.yearRoundBadge}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <time className="text-xs font-medium uppercase tracking-wide text-secondary">
                  {new Date(card.date).toLocaleDateString(dateLocale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-dark">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm text-secondary">{card.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
