"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
import { SEASON_SLUGS, SEASONS } from "@/lib/seasons";

/**
 * Traduit l'URL courante vers une autre langue.
 *
 * Les slugs de saison étant localisés (`/fr/ete` ↔ `/en/summer` ↔ `/de/sommer`), on les
 * convertit explicitement plutôt que de se contenter de remplacer le préfixe de langue :
 * `/it/estate` vers l'allemand doit mener à `/de/sommer`, pas à `/de/estate` (un 404).
 *
 * Les autres segments — `guide`, les slugs d'articles, `mentions-legales`,
 * `guide-arrivee` — sont identiques dans toutes les langues et passent tels quels.
 */
export function translatePath(pathname: string, from: Locale, to: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${to}`;

  segments[0] = to;

  if (segments[1]) {
    for (const season of SEASONS) {
      if (segments[1] === SEASON_SLUGS[from][season]) {
        segments[1] = SEASON_SLUGS[to][season];
        break;
      }
    }
  }

  return `/${segments.join("/")}`;
}

/**
 * Sélecteur de langue en menu déroulant.
 *
 * À deux langues, une simple pastille « EN » suffisait. À cinq, quatre pastilles
 * alignées mangeaient la barre de navigation et débordaient sur mobile à côté du bouton
 * de menu : un déroulant tient la même place quel que soit le nombre de langues.
 *
 * Les langues sont nommées dans leur propre langue (« Deutsch », et non « Allemand ») —
 * un visiteur qui cherche sa langue n'a pas à savoir lire celle de la page.
 */
export default function LocaleSwitcher({
  locale,
  pathname,
  label,
  className = "",
}: {
  locale: Locale;
  pathname: string;
  /** `t.header.switchLanguage` — le composant ne lit pas le dictionnaire lui-même. */
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  // Fermeture au clic extérieur et à Échap. Sans cela, le menu resterait ouvert
  // derrière la page une fois le doigt reposé ailleurs.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const others = LOCALES.filter((l) => l !== locale);

  return (
    <div ref={container} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-secondary transition-colors hover:bg-light-bg hover:text-foreground"
      >
        {LOCALE_META[locale].short}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/*
        La liste est toujours dans le HTML et seulement masquée en CSS, jamais
        démontée : rendue au clic seulement, elle privait la page de tout lien vers
        les autres langues, et un robot ne clique pas. Les `hreflang` du `<head>`
        restent la déclaration qui compte, mais ces liens sont ce qui fait découvrir
        les quatre autres versions depuis n'importe quelle page.
        `display:none` retire aussi les liens du parcours au clavier quand le menu
        est fermé — il n'y a donc pas de piège à tabulation.

        Aligné à droite : le sélecteur est toujours en fin de barre, et un menu
        aligné à gauche sortirait de l'écran sur téléphone.
      */}
      <ul
        role="menu"
        className={`absolute right-0 z-50 mt-2 min-w-44 overflow-hidden rounded-2xl border border-border bg-white py-1 shadow-lg ${
          open ? "" : "hidden"
        }`}
      >
        {others.map((l) => (
          <li key={l} role="none">
            <Link
              href={translatePath(pathname, locale, l)}
              hrefLang={l}
              lang={l}
              role="menuitem"
              onClick={() => setOpen(false)}
              // Cible tactile d'au moins 44 px de haut : le menu s'utilise au pouce.
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-secondary transition-colors hover:bg-light-bg hover:text-foreground"
            >
              {LOCALE_META[l].native}
              <span className="text-xs font-semibold text-secondary/60">
                {LOCALE_META[l].short}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
