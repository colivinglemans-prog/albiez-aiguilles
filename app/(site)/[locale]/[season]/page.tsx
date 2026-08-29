import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES, LOCALE_META } from "@/lib/i18n";
import { alternatesFor, seasonPath, openGraphLocales } from "@/lib/seo";
import { getPhoto } from "@/lib/photos";
import { galleryGroups } from "@/lib/gallery";
import { HERO_PHOTOS } from "@/lib/property";
import { SEASONS, SEASON_SLUGS, seasonFromSlug, periodeSaison } from "@/lib/seasons";
import Hero from "@/components/public/Hero";
import SeasonBlock from "@/components/public/SeasonBlock";
import CommonSections from "@/components/public/CommonSections";

/** Génère /fr/ski, /fr/ete, /en/summer, /de/sommer, /es/verano, /it/estate… */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SEASONS.map((season) => ({ locale, season: SEASON_SLUGS[locale][season] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; season: string }>;
}): Promise<Metadata> {
  const { locale, season: slug } = await params;
  if (!isLocale(locale)) return {};

  const season = seasonFromSlug(locale, slug);
  if (!season) return {};

  const t = getDictionary(locale);
  const { seo } = t.seasons[season];

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: alternatesFor(locale, seasonPath(season)),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seasonPath(season)(locale),
      ...openGraphLocales(locale),
    },
  };
}

/**
 * La page d'une saison.
 *
 * Elle a la même colonne vertébrale que l'accueil : seul le bloc de saison y prend la
 * place des cartes « Deux saisons, deux séjours ». Tout ce qui décrit le logement sans
 * dépendre de la saison suit, à l'identique — quelqu'un qui arrive ici depuis une
 * recherche « location ski Albiez » ne doit pas avoir à remonter à l'accueil pour
 * savoir combien on y dort ou ce que coûte le kit linge.
 */
export default async function SeasonPage({
  params,
}: {
  params: Promise<{ locale: string; season: string }>;
}) {
  const { locale, season: slug } = await params;
  if (!isLocale(locale)) notFound();

  const season = seasonFromSlug(locale, slug);
  if (!season) notFound();

  const t = getDictionary(locale);
  const content = t.seasons[season];

  // Le hero porte une photo désignée, pas la première du dossier ; à défaut on
  // retombe sur la première de la visite, puis sur un dégradé (géré par Hero).
  const heroPhoto =
    getPhoto(season, HERO_PHOTOS[season]) ??
    galleryGroups(season, t)[0]?.photos[0];

  return (
    <div data-season={season}>
      <Hero
        title={content.heading}
        subtitle={content.intro}
        tagline={content.tagline(periodeSaison(LOCALE_META[locale].bcp47))}
        photo={heroPhoto}
      />

      <SeasonBlock locale={locale} season={season} />
      <CommonSections locale={locale} season={season} />
    </div>
  );
}
