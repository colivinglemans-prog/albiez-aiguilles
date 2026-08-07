"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation, LOCALES } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SEASON_SLUGS, seasonHref } from "@/lib/seasons";
import { SITE_NAME } from "@/lib/property";

const LOCALE_LABELS: Record<Locale, string> = { fr: "FR", en: "EN" };

/**
 * Traduit l'URL courante vers une autre langue.
 * Les slugs de saison étant localisés (`/fr/ete` ↔ `/en/summer`), on les convertit
 * explicitement plutôt que de se contenter de remplacer le préfixe de langue.
 */
function translatePath(pathname: string, from: Locale, to: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${to}`;

  segments[0] = to;

  if (segments[1]) {
    for (const season of ["hiver", "ete"] as const) {
      if (segments[1] === SEASON_SLUGS[from][season]) {
        segments[1] = SEASON_SLUGS[to][season];
        break;
      }
    }
  }

  return `/${segments.join("/")}`;
}

export default function Header() {
  const { locale, t } = useTranslation();
  const pathname = usePathname() || `/${locale}`;
  const [menuOpen, setMenuOpen] = useState(false);

  const base = `/${locale}`;
  const other = LOCALES.filter((l) => l !== locale);

  const links = [
    { href: seasonHref(locale, "hiver"), label: t.header.winter },
    { href: seasonHref(locale, "ete"), label: t.header.summer },
    { href: `${base}#appartement`, label: t.header.apartment },
    { href: `${base}#situation`, label: t.header.location },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/*
          Le nom du logement est long : plutôt que de le tronquer, on le rend plus
          petit sur mobile et on le laisse passer sur deux lignes. La ligne de
          situation disparaît sous `sm` — elle répète ce que le nom dit déjà, et
          l'espace vaut mieux au nom lui-même.
        */}
        <Link href={base} className="flex flex-col leading-tight">
          <span className="max-w-[13rem] text-sm font-bold text-primary sm:max-w-none sm:text-base lg:text-lg">
            {SITE_NAME}
          </span>
          <span className="hidden text-[11px] font-medium text-secondary sm:block sm:text-xs">
            Albiez-Montrond · Maurienne · 1 600 m
          </span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium text-secondary md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={`${base}#reserver`}
              className="rounded-full bg-primary px-5 py-2 text-white transition-colors hover:bg-primary-dark"
            >
              {t.header.book}
            </Link>
          </li>
          {other.map((l) => (
            <li key={l}>
              <Link
                href={translatePath(pathname, locale, l)}
                hrefLang={l}
                aria-label={t.header.switchLanguage}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-light-bg hover:text-foreground"
              >
                {LOCALE_LABELS[l]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:hidden">
          {other.map((l) => (
            <Link
              key={l}
              href={translatePath(pathname, locale, l)}
              hrefLang={l}
              aria-label={t.header.switchLanguage}
              className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-secondary"
            >
              {LOCALE_LABELS[l]}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-1.5"
            aria-label={t.header.menu}
            aria-expanded={menuOpen}
          >
            <span className={`h-0.5 w-6 bg-foreground transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-foreground transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-border/60 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-secondary">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`${base}#reserver`}
                onClick={() => setMenuOpen(false)}
                className="inline-block rounded-full bg-primary px-5 py-2 text-white"
              >
                {t.header.book}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
