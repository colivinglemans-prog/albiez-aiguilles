"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";
import { useTranslation } from "@/lib/i18n";

/**
 * Une figure légendée dont l'image s'ouvre en plein écran.
 *
 * Faite pour le plan des pistes : dans sa colonne, il fait 550 px de large pour
 * 1920 px d'origine, et les noms de pistes y sont illisibles. Le plein écran a donc
 * **deux** paliers — l'image ajustée à l'écran, puis sa taille réelle dans un cadre
 * qui défile. Le premier palier suffit sur un grand écran ; le second est le seul
 * moyen de lire le plan sur un téléphone.
 *
 * Pas de réutilisation de la visionneuse de `PhotoGallery` : celle-ci parcourt une
 * série de photos avec un compteur et des flèches, là où il n'y a ici qu'une image à
 * regarder de près.
 */
export default function ZoomableFigure({
  photo,
  title,
  caption,
  alt,
}: {
  photo: Photo;
  title: string;
  caption: string;
  /** Par défaut la légende, qui décrit mieux l'image que le nom du fichier. */
  alt?: string;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    // Empêche la page de défiler derrière le plein écran.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const description = alt ?? caption;

  return (
    <>
      <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${title} — ${t.gallery.expand}`}
          className="group relative w-full cursor-zoom-in"
          style={{ aspectRatio: photo.ratio }}
        >
          <Image
            src={photo.src}
            alt={description}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
          />
          {/* Le repère reste visible en permanence : au tactile il n'y a pas de survol
              pour révéler qu'une image est agrandissable. */}
          <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors group-hover:bg-white">
            <ExpandIcon className="h-3.5 w-3.5" />
            {t.gallery.expand}
          </span>
        </button>
        <figcaption className="mt-auto border-t border-border px-4 py-3 text-sm text-secondary">
          <span className="font-semibold text-foreground">{title}</span> —{" "}
          {caption}
        </figcaption>
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-100 bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.close}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setZoomed((v) => !v)}
            className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            {zoomed ? (
              <>
                <MinusIcon className="h-4 w-4" />
                {t.gallery.zoomOut}
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" />
                {t.gallery.zoomIn}
              </>
            )}
          </button>

          {/* Un clic à côté de l'image ferme ; un clic sur l'image change de palier.
              Le cadre défile seulement au palier « taille réelle ». */}
          <div
            onClick={close}
            className={
              zoomed
                ? "h-full w-full overflow-auto"
                : "flex h-full w-full items-center justify-center p-4 sm:p-12"
            }
          >
            <Image
              src={photo.src}
              alt={description}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((v) => !v);
              }}
              className={
                zoomed
                  ? "h-auto max-w-none cursor-zoom-out"
                  : "max-h-full w-auto max-w-full cursor-zoom-in object-contain"
              }
              style={zoomed ? { width: photo.width } : undefined}
            />
          </div>

          {/* Masquée au zoom : à ce palier, chaque bande de plan compte. */}
          {!zoomed && (
            <p className="absolute inset-x-0 bottom-0 bg-black/50 px-4 py-3 text-center text-sm text-white/90">
              <span className="font-semibold text-white">{title}</span> —{" "}
              {caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M11 8v6M8 11h6M20 20l-4-4" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M8 11h6M20 20l-4-4" />
    </svg>
  );
}
