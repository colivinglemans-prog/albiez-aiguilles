import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  isLocale,
  LOCALES,
  LOCALE_META,
} from "@/lib/i18n";
import Link from "next/link";
import { alternatesFor, blogPath, longStayPath, openGraphLocales } from "@/lib/seo";
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

        <h2>{t.afterWorkTitle}</h2>
        <p>{t.afterWorkText}</p>
        <p>
          <Link href={blogPath(locale)}>{t.afterWorkLink}</Link>
        </p>

        <h2>{t.servicesTitle}</h2>
        <ul>
          {t.servicesItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{t.limitsTitle}</h2>
        <p>{t.limitsText}</p>

        <h2>{t.bookingTitle}</h2>
        <p>{t.bookingText}</p>
      </div>

      {/*
        Deux boutons, dans cet ordre. Le direct d'abord : c'est le tarif le plus bas pour
        le client et le seul sans commission pour nous. Le courriel ensuite, parce que la
        majorité de ces réservations passent par une agence ou un service voyages qui a
        besoin d'un devis puis d'une facture — ce que le calendrier ne sait pas produire.
      */}
      <aside className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-accent-soft px-6 py-7">
        <Link
          href={`/${locale}#reserver`}
          className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {t.bookingCta}
        </Link>

        {/*
          Les deux canaux de devis, à égalité. WhatsApp pour la réponse du jour, le
          courriel pour l'écrit qu'un service achats transfère en interne et joint à un
          bon de commande — les deux publics existent et n'ont pas les mêmes contraintes.
          L'adresse est celle du domaine et non la personnelle : c'est elle qui figurera
          sur le devis.
        */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={`${PROPERTY.contact.whatsapp}?text=${encodeURIComponent(t.quoteWhatsApp)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {t.whatsappCta}
          </a>
          <a
            href={`mailto:${PROPERTY.contact.business}?subject=${encodeURIComponent(t.quoteSubject)}&body=${encodeURIComponent(t.quoteBody)}`}
            className="inline-block rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {t.contactCta}
          </a>
        </div>
      </aside>
    </Section>
  );
}
