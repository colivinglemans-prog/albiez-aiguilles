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

      <div className="border-t border-border px-6 py-6 text-center text-xs text-secondary">
        © {new Date().getFullYear()} {SITE_NAME}. {t.footer.copyright}
      </div>
    </footer>
  );
}
