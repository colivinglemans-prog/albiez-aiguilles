"use client";

import Image from "next/image";
import { LOCALE_META, useTranslation } from "@/lib/i18n";
import { DISTANCES } from "@/lib/property";
import { periodeSaison, type Season } from "@/lib/seasons";

/**
 * Bandeau des distances clés de la saison.
 *
 * En location de montagne, la distance au front de neige (ou au lac) est le premier
 * critère de tri du voyageur : elle apparaît donc dès le haut de page.
 * Une entrée peut regrouper plusieurs points d'intérêt situés au même endroit.
 */
export default function DistanceStrip({ season }: { season: Season }) {
  const { t, locale } = useTranslation();
  // Les libellés sont exhaustifs par saison côté dictionnaire ; ici `season` est une
  // variable, donc on les relit à plat — c'est la seule façon d'indexer les deux
  // saisons avec la même expression sans dupliquer le rendu.
  const labels: Record<string, string> = t.seasons[season].distanceLabels;
  const resortLink = t.seasons[season].resortLink;
  const entries = DISTANCES[season];
  const single = entries.length === 1;
  /*
   * Les dates d'ouverture du domaine n'ont de sens qu'en hiver : l'été n'a pas d'ouverture
   * négociée, seulement une règle de mois (`SUMMER_MONTHS`). On les affiche contre le lien
   * de la station, dont elles relèvent — c'est le domaine qui ouvre, pas l'appartement.
   */
  const periode = season === "hiver" ? periodeSaison(LOCALE_META[locale].bcp47) : null;

  return (
    <ul
      className={`grid h-full gap-px overflow-hidden rounded-2xl border border-border bg-border ${
        single ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
      }`}
    >
      {/* Contenu centré verticalement : quand le bandeau s'aligne sur un voisin plus
          haut, il se répartit au lieu de rester collé en haut de la carte. */}
      {entries.map(({ key, meters, includes, brand }) => (
        <li
          key={key}
          className="flex flex-col justify-center bg-white px-6 py-7 text-center"
        >
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

          {periode && (
            <p className="mt-4 text-sm font-semibold text-accent-dark">
              {t.seasons.skiPeriod(periode.du, periode.au)}
            </p>
          )}

          {/* La station à laquelle mène cette distance. Le logo et le libellé sont
              dans le même lien : deux liens vers la même page se disputeraient le
              clic et alourdiraient la navigation au lecteur d'écran. */}
          {brand && resortLink && (
            <div className="mt-6 border-t border-border pt-5">
              <a
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center gap-2"
              >
                <Image
                  src={brand.logo}
                  alt={resortLink.alt}
                  width={2018}
                  height={1206}
                  className="h-14 w-auto"
                />
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 group-hover:underline">
                  {resortLink.label}
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
