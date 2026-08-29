"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { seasonHref } from "@/lib/seasons";
import { PROPERTY, SITE_NAME } from "@/lib/property";

export default function Footer() {
  const { locale, t } = useTranslation();
  const base = `/${locale}`;

  return (
    <footer className="mt-24 border-t border-border bg-light-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-primary">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-secondary">{t.footer.tagline}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold">{t.footer.navigation}</p>
          <ul className="space-y-2 text-sm text-secondary">
            <li>
              <Link href={base} className="hover:text-foreground">
                {t.header.home}
              </Link>
            </li>
            <li>
              <Link href={seasonHref(locale, "hiver")} className="hover:text-foreground">
                {t.header.winter}
              </Link>
            </li>
            <li>
              <Link href={seasonHref(locale, "ete")} className="hover:text-foreground">
                {t.header.summer}
              </Link>
            </li>
            <li>
              <Link href={`${base}/guide`} className="hover:text-foreground">
                {t.header.blog}
              </Link>
            </li>
            <li>
              <Link href={`${base}/mentions-legales`} className="hover:text-foreground">
                {t.footer.legal}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold">{t.footer.contact}</p>
          <ul className="space-y-2 text-sm text-secondary">
            <li>
              <a href={`mailto:${PROPERTY.contact.email}`} className="hover:text-foreground">
                {PROPERTY.contact.email}
              </a>
            </li>
            <li>{PROPERTY.address.full}</li>
            <li>
              <a
                href={PROPERTY.links.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Airbnb
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center border-t border-border px-6 py-6 text-center text-xs text-secondary">
        <span>
          © {new Date().getFullYear()} {SITE_NAME}. {t.footer.copyright}
        </span>
        {/*
          Accès au dashboard, volontairement discret : une icône à 40 % d'opacité, sans
          libellé, à côté du copyright — comme sur le site du Mans. Ce n'est pas un secret
          (la page est protégée par mot de passe), juste un lien qui n'a rien à faire dans la
          navigation d'un site de location.

          `nofollow` en plus du `noindex` que porte déjà la page : le premier évite que les
          robots suivent le lien, le second qu'ils indexent la destination. Les deux sont
          utiles, ils n'agissent pas au même moment.
        */}
        <Link
          href="/dashboard"
          rel="nofollow"
          aria-label="Espace privé"
          title="Espace privé"
          className="ml-3 rounded-md px-2 py-1 text-secondary/40 transition-colors hover:text-secondary"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
