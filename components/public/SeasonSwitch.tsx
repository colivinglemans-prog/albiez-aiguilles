"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { SEASONS, seasonHref, type Season } from "@/lib/seasons";

/**
 * Bascule entre les deux pages de saison.
 *
 * C'est un couple de liens, pas un état client : chaque saison garde son URL
 * propre et reste indexable séparément. Le visiteur voit un interrupteur,
 * le moteur de recherche voit deux pages distinctes.
 */
export default function SeasonSwitch({ active }: { active: Season }) {
  const { locale, t } = useTranslation();

  const labels: Record<Season, string> = {
    hiver: t.header.winter,
    ete: t.header.summer,
  };

  return (
    <div className="mx-auto flex w-fit gap-1 rounded-full border border-border bg-light-bg p-1">
      {SEASONS.map((season) => {
        const isActive = season === active;
        return (
          <Link
            key={season}
            href={seasonHref(locale, season)}
            data-season={season}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-accent text-white"
                : "text-secondary hover:text-foreground"
            }`}
          >
            {labels[season]}
          </Link>
        );
      })}
    </div>
  );
}
