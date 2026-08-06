"use client";

import { useTranslation } from "@/lib/i18n";
import { DISTANCES } from "@/lib/property";
import type { Season } from "@/lib/seasons";

/**
 * Bandeau des distances clés de la saison.
 *
 * En location de montagne, la distance au front de neige (ou au lac) est le premier
 * critère de tri du voyageur : elle apparaît donc dès le haut de page.
 * Une entrée peut regrouper plusieurs points d'intérêt situés au même endroit.
 */
export default function DistanceStrip({ season }: { season: Season }) {
  const { t } = useTranslation();
  const labels = t.seasons[season].distanceLabels;
  const entries = DISTANCES[season];
  const single = entries.length === 1;

  return (
    <ul
      className={`grid gap-px overflow-hidden rounded-2xl border border-border bg-border ${
        single ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
      }`}
    >
      {entries.map(({ key, meters, includes }) => (
        <li key={key} className="bg-white px-6 py-7 text-center">
          <p className="text-3xl font-bold text-accent">{meters} m</p>
          <p className="mt-1 text-sm font-semibold">{labels[key] ?? key}</p>

          {includes && (
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {includes.map((sub) => (
                <li
                  key={sub}
                  className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-dark"
                >
                  {labels[sub] ?? sub}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
