"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";
import { useTranslation } from "@/lib/i18n";

/** Nombre de vignettes visibles avant le bouton « voir tout ». */
const PREVIEW_COUNT = 5;

export default function PhotoGallery({
  photos,
  title,
}: {
  photos: Photo[];
  title?: string;
}) {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

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

  const visible = expanded ? photos : photos.slice(0, PREVIEW_COUNT);

  return (
    <div>
      {title && (
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{title}</h2>
      )}

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {visible.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className={`group relative aspect-4/3 overflow-hidden rounded-xl bg-light-bg ${
              i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-4/3" : ""
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {photos.length > PREVIEW_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 rounded-full border border-foreground px-5 py-2 text-sm font-semibold transition-colors hover:bg-light-bg"
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
