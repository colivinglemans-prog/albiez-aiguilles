"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { Photo } from "@/lib/photos";

/**
 * Bannière d'ouverture.
 *
 * Le texte n'est pas posé sur la photo : il vit dans une carte opaque qui chevauche
 * le bas de l'image. Un voile sombre sur toute la photo la rendait terne alors que
 * c'est elle qui vend le logement — ici elle garde ses couleurs, et le texte reste
 * lisible parce qu'il a son propre fond.
 */
export default function Hero({
  title,
  subtitle,
  tagline,
  photo,
}: {
  title: string;
  subtitle: string;
  /** Sur-titre court (ex. dates d'ouverture du domaine). */
  tagline?: string;
  photo?: Photo;
}) {
  const { locale, t } = useTranslation();

  return (
    <section className="relative">
      {photo ? (
        <div
          className="relative w-full overflow-hidden bg-light-bg"
          // Le format de la photo pilote la hauteur, plafonnée pour qu'il reste
          // toujours quelque chose de la page visible sous la bannière.
          style={{ aspectRatio: photo.ratio, maxHeight: "70vh" }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </div>
      ) : (
        <div className="h-56 w-full bg-linear-to-br from-primary to-accent-dark sm:h-72" />
      )}

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative -mt-12 rounded-3xl border border-border bg-white p-7 shadow-xl sm:-mt-20 sm:p-10 md:max-w-3xl">
          {tagline && (
            <p className="mb-4 inline-flex rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-dark">
              {tagline}
            </p>
          )}

          <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${locale}#reserver`}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t.header.book}
            </Link>
            <Link
              href={`/${locale}#appartement`}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-light-bg"
            >
              {t.header.apartment}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
