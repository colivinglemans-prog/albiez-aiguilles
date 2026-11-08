"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterChips from "@sejour/socle/components/FilterChips";
import { useTranslation, LOCALE_META } from "@/lib/i18n";
import type { Season } from "@/lib/seasons";
import { STAGES, type Stage } from "@/lib/blog/stages";

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
  stage: Stage;
  photo: { src: string; width: number; height: number } | null;
}

type Filter = "all" | Season;

/**
 * Le guide (refonte du 2026-11-08, plan « Blog, guide et parcours voyageur »).
 *
 * - **Un seul filtre, la saison** : « Tous », « Hiver », « Été ». Les compteurs ne comptent que
 *   les articles **de** la saison (10 / 12) : ils ne promettent plus une partition qui n'existe pas.
 * - Un article sans saison (boulangerie, randonnées balisées…) reste visible sous chaque saison,
 *   mais **après** ceux de la saison, avec une pastille grise « Toute l'année » : on voit pourquoi il
 *   est là. L'ancien bouton par défaut portait le même libellé que cette pastille, d'où
 *   l'impression d'un bug.
 * - **Le parcours en sections** (`stage`) : Choisir, Préparer, Sur place, avec des ancres fixes
 *   (`#reserver`, `#preparer`, `#sur-place`). Une section vide sous un filtre est masquée.
 * - `?saison=hiver|ete` présélectionne la saison (pages de saison, messages) : lu dans un effet,
 *   sans `Suspense`, pour que les 30 cartes restent dans le HTML initial.
 */
function seasonRank(card: GuideCard, filter: Filter): number {
  if (filter === "all") return 0;
  if (card.season === filter) return 0;
  if (card.season === null) return 1;
  return -1; // autre saison : masqué
}

export default function GuideFilter({ cards }: { cards: GuideCard[] }) {
  const { locale, t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("saison");
    // Voulu : la saison de l'URL s'applique après l'hydratation, pour que le HTML initial
    // (celui des robots) reste la liste complète. Un seul rendu de plus, au chargement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (s === "hiver" || s === "ete") setFilter(s);
  }, []);

  const dateLocale = LOCALE_META[locale].bcp47;
  const seasonCount = (s: Season) => cards.filter((c) => c.season === s).length;
  const yearRound = cards.filter((c) => c.season === null).length;

  const items = [
    { key: "all" as const, label: t.blog.filter.all, count: cards.length },
    { key: "hiver" as const, label: t.blog.filter.hiver, count: seasonCount("hiver") },
    { key: "ete" as const, label: t.blog.filter.ete, count: seasonCount("ete") },
  ];

  return (
    <>
      <div className="mt-10">
        <FilterChips<Filter>
          items={items}
          active={filter}
          onChange={setFilter}
          ariaLabel={t.blog.filter.label}
        />
        {filter !== "all" && (
          <p className="mt-4 max-w-3xl text-sm text-secondary">
            {t.blog.filter.note(seasonCount(filter), yearRound)}
          </p>
        )}
      </div>

      {STAGES.map((stage) => {
        const sectionCards = cards
          .filter((c) => c.stage === stage && seasonRank(c, filter) >= 0)
          .sort((a, b) => seasonRank(a, filter) - seasonRank(b, filter));
        if (sectionCards.length === 0) return null;
        const head = t.blog.stage[stage];
        return (
          <section key={stage} id={stage} className="mt-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-primary">{head.title}</h2>
            <p className="mt-2 max-w-3xl text-sm text-secondary">{head.intro}</p>
            <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sectionCards.map((card, index) => (
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
                          // La première vignette est l'image principale du premier écran sur mobile :
                          // chargée en différé, elle retardait l'affichage (LCP, audit du 2026-11-08).
                          priority={stage === STAGES[0] && index === 0}
                          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <span
                          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow ${
                            card.season ? "bg-accent" : "bg-secondary"
                          }`}
                        >
                          {card.season ? t.blog.seasonBadge[card.season] : t.blog.yearRoundBadge}
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
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-dark">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-secondary">{card.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
