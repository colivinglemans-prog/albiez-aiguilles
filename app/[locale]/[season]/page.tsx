import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { alternatesFor, seasonPath } from "@/lib/seo";
import { listPhotos } from "@/lib/photos";
import { SEASONS, SEASON_SLUGS, seasonFromSlug } from "@/lib/seasons";
import Hero from "@/components/public/Hero";
import SeasonSwitch from "@/components/public/SeasonSwitch";
import DistanceStrip from "@/components/public/DistanceStrip";
import PhotoGallery from "@/components/public/PhotoGallery";
import BookingSection from "@/components/public/BookingSection";
import { Section, SectionTitle } from "@/components/public/Section";

/** Génère /fr/ski, /fr/ete, /en/ski, /en/summer. */
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
      locale: locale === "fr" ? "fr_FR" : "en_GB",
    },
  };
}

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
  const photos = listPhotos(season);

  return (
    <div data-season={season}>
      <Hero
        title={content.heading}
        subtitle={content.intro}
        tagline={content.tagline}
        image={photos[0]?.src}
      />

      <Section className="!py-10">
        <SeasonSwitch active={season} />
      </Section>

      <Section className="!pt-0">
        <DistanceStrip season={season} />
      </Section>

      <Section className="!pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="activites" className="!pt-0">
        <SectionTitle title={content.heading} />
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {content.activities.map((activity) => (
            <div key={activity.title} className="border-l-2 border-accent pl-5">
              <h3 className="font-semibold">{activity.title}</h3>
              <p className="mt-1.5 text-sm text-secondary">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="galerie" className="!pt-0">
        <PhotoGallery photos={photos} title={t.gallery.title} />
      </Section>

      <BookingSection />
    </div>
  );
}
