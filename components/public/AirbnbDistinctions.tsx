"use client";

import { useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";

/**
 * Les deux distinctions Airbnb : Superhôte (l'hôte) et Coup de cœur voyageurs
 * (le logement).
 *
 * Placées juste avant les avis : les badges expliquent *pourquoi* la note de 4,96 est
 * crédible, les avis la démontrent. Séparés, les deux signaux se renforcent moins.
 * Les deux distinctions sont côte à côte parce qu'elles ne récompensent pas la même
 * chose — les confondre en un seul bandeau ferait passer l'une pour une reformulation
 * de l'autre.
 */
export default function AirbnbDistinctions() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl bg-accent-soft p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{t.superhost.title}</h3>
            <p className="mt-1 text-sm text-secondary">
              {t.superhost.description}
            </p>
            <a
              href={PROPERTY.links.airbnbProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark"
            >
              {t.superhost.profileLink(PROPERTY.hostReviewCount)}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-accent-soft p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{t.guestFavourite.title}</h3>
            <p className="mt-1 text-sm text-secondary">
              {t.guestFavourite.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
