import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  isLocale,
  LOCALES,
  LOCALE_META,
} from "@/lib/i18n";
import { alternatesFor, longStayPath, openGraphLocales } from "@/lib/seo";
import { PROPERTY } from "@/lib/property";
import { WINTER_OPENING, formatPeriode } from "@/lib/seasons";
import { Section } from "@/components/public/Section";

/**
 * Page de séjour longue durée hors saison.
 *
 * Volontairement **hors navigation et hors index du guide** : elle vise les salariés du
 * chantier Lyon-Turin, qui la trouvent en la cherchant, et non les vacanciers, qui n'ont
 * aucune raison d'y tomber en se promenant sur le site. Elle est en revanche au sitemap et
 * indexable — c'est tout l'intérêt.
 *
 * Les dates ne sont pas écrites ici : elles viennent de `WINTER_OPENING` et sont formatées
 * dans la langue de la page, comme partout ailleurs.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { seo } = getDictionary(locale).longStay;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: alternatesFor(locale, longStayPath),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: longStayPath(locale),
      ...openGraphLocales(locale),
    },
  };
}

export default async function LongStayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale).longStay;
  const { du, au } = formatPeriode(
    LOCALE_META[locale].bcp47,
    WINTER_OPENING.from,
    WINTER_OPENING.to,
  );

  return (
    <Section>
      {/*
        Un `<h1>` écrit ici plutôt que `SectionTitle`, qui rend un `<h2>` : c'est le titre
        de la page, pas celui d'une section, et cette page-ci est indexable. Toutes les
        autres pages indexables du site en ont un.
      */}
      <header className="mx-auto mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">{t.heading}</h1>
        <p className="mt-4 text-secondary">{t.intro}</p>
      </header>

      <div className="prose-article mx-auto max-w-3xl">
        <div className="facts">
          <p>{t.windows(du, au)}</p>
        </div>

        <h2>{t.worksiteTitle}</h2>
        <p>{t.worksiteText}</p>
        <p>
          {t.commute(
            PROPERTY.valleyCommute.km,
            PROPERTY.valleyCommute.minutes,
          )}
        </p>

        <h2>{t.flatTitle}</h2>
        <ul>
          {t.flatItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{t.limitsTitle}</h2>
        <p>{t.limitsText}</p>

        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
      </div>

      <aside className="mx-auto mt-10 max-w-3xl rounded-2xl border border-accent/30 bg-accent-soft px-6 py-7 text-center">
        <a
          href={`mailto:${PROPERTY.contact.email}?subject=${encodeURIComponent(t.heading)}`}
          className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {t.contactCta}
        </a>
      </aside>
    </Section>
  );
}
