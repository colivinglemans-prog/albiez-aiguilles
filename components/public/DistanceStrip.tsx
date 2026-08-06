"use client";

import { useTranslation } from "@/lib/i18n";
import { DISTANCES } from "@/lib/property";
import type { Season } from "@/lib/seasons";

/**
 * Bandeau des distances clés de la saison.
 * En location de montagne, la distance aux pistes (ou au lac) est le premier
 * critère de tri du voyageur : elle apparaît donc dès le haut de page.
 */
export default function DistanceStrip({ season }: { season: Season }) {
  const { t } = useTranslation();
  const labels = t.seasons[season].distanceLabels;

  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
      {DISTANCES[season].map(({ key, meters }) => (
        <li key={key} className="bg-white px-5 py-6 text-center">
          <p className="text-2xl font-bold text-accent">{meters} m</p>
          <p className="mt-1 text-xs text-secondary">{labels[key] ?? key}</p>
        </li>
      ))}
    </ul>
  );
}
