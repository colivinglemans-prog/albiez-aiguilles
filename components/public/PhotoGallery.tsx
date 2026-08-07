"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";
import { useTranslation } from "@/lib/i18n";

/** Un espace de la visite, déjà traduit par la page. */
export interface GalleryGroup {
  key: string;
  title: string;
  /** Équipements de l'espace ; vide si l'espace n'en déclare aucun. */
  amenities: string[];
  photos: Photo[];
}

/**
 * La galerie « En images », organisée en espaces comme la visite guidée d'Airbnb.
 *
 * Deux états, parce que les deux répondent à des questions différentes :
 *
 * - **replié** — une vignette par espace, avec son nom et son nombre de photos. On
 *   voit d'un coup d'œil *ce que contient le logement*, y compris le balcon et
 *   l'extérieur qu'un simple « les 8 premières photos » aurait laissés hors champ.
 * - **déplié** — la visite complète, espace par espace, chacun avec ses équipements.
 *
 * La visionneuse, elle, ignore ce découpage : elle parcourt les photos à plat, dans
 * l'ordre de la visite. Ouvrir la vignette « Balcon » puis continuer à la flèche doit
 * dérouler la suite, pas s'arrêter au bord de l'espace.
 */
export default function PhotoGallery({
  groups,
  title,
}: {
  groups: GalleryGroup[];
  title?: string;
}) {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Index de la 1re photo de chaque espace dans la liste à plat : c'est ce qui relie
  // une vignette repliée à sa position dans la visionneuse.
  const photos = groups.flatMap((g) => g.photos);
  const offsets: number[] = [];
  let running = 0;
  for (const group of groups) {
    offsets.push(running);
    running += group.photos.length;
  }

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    // Empêche la page de défiler derrière la visionneuse.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, close, prev, next]);

  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-light-bg px-6 py-12 text-center text-sm text-secondary">
        {t.gallery.empty}
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">{title}</h2>
      )}
      <p className="mb-6 max-w-3xl text-secondary">{t.spaces.subtitle}</p>

      {expanded ? (
        <div className="space-y-10">
          {groups.map((group, g) => (
            <section key={group.key}>
              <h3 className="text-lg font-semibold">{group.title}</h3>

              {group.amenities.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.amenities.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-light-bg px-3 py-1 text-xs text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/*
                Disposition en colonnes plutôt qu'en grille à cases fixes : chaque photo
                garde son format d'origine. Un cadre imposé recadrerait les portraits et
                les carrés, qui sont nombreux ici.
              */}
              <div className="mt-4 columns-2 gap-2 sm:gap-3 md:columns-3 lg:columns-4">
                {group.photos.map((photo, i) => (
                  <Thumbnail
                    key={photo.src}
                    photo={photo}
                    onClick={() => setLightboxIndex(offsets[g] + i)}
                    priority={g === 0 && i === 0}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="columns-2 gap-2 sm:gap-3 md:columns-3 lg:columns-4">
          {groups.map((group, g) => (
            <div key={group.key} className="mb-3 break-inside-avoid sm:mb-4">
              <Thumbnail
                photo={group.photos[0]}
                onClick={() => setLightboxIndex(offsets[g])}
                priority={g === 0}
                className="mb-0"
              />
              <p className="mt-1.5 text-sm font-semibold">{group.title}</p>
              <p className="text-xs text-secondary">
                {t.spaces.photoCount(group.photos.length)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Sans photo cachée — un seul cliché par espace — le bouton ne promettrait rien. */}
      {photos.length > groups.length && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 rounded-full border border-foreground px-5 py-2 text-sm font-semibold transition-colors hover:bg-light-bg"
        >
          {expanded ? t.property.showLess : t.gallery.showAll(photos.length)}
        </button>
      )}

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.close}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80">
            {t.gallery.counter(lightboxIndex + 1, photos.length)}
          </span>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label={t.gallery.previous}
                className="absolute left-2 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t.gallery.next}
                className="absolute right-2 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div className="relative h-[80vh] w-[92vw]">
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Thumbnail({
  photo,
  onClick,
  priority,
  className = "mb-2 sm:mb-3",
}: {
  photo: Photo;
  onClick: () => void;
  priority?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group block w-full break-inside-avoid overflow-hidden rounded-xl bg-light-bg ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
        priority={priority}
      />
    </button>
  );
}
