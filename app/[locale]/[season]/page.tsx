import type { Metadata } from "next";
import Image from "next/image";
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
import Reviews from "@/components/public/Reviews";
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

  // Photos de la saison d'abord — elles portent l'ambiance et fournissent le hero —
  // puis les photos valables toute l'année (intérieur sans saison visible), qui
  // n'ont ainsi pas besoin d'être dupliquées dans les deux dossiers.
  const seasonPhotos = listPhotos(season);
  const photos = [...seasonPhotos, ...listPhotos("commun")];

  // Les photos d'activités illustrent la liste dans l'ordre : la 1re photo du dossier
  // va à la 1re activité, et ainsi de suite. Une activité sans photo reste en texte seul.
  const activityPhotos = listPhotos(`activites-${season}`);

  return (
    <div data-season={season}>
      <Hero
        title={content.heading}
        subtitle={content.intro}
        tagline={content.tagline}
        image={seasonPhotos[0]?.src ?? photos[0]?.src}
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
        <ul className="grid gap-6 sm:grid-cols-2">
          {content.activities.map((activity, i) => {
            const photo = activityPhotos[i];
            return (
              <li
                key={activity.title}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                {photo && (
                  <div className="relative aspect-16/9">
                    <Image
                      src={photo.src}
                      alt={photo.alt || activity.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className={photo ? "p-5" : "border-l-2 border-accent p-5"}>
                  <h3 className="font-semibold">{activity.title}</h3>
                  <p className="mt-1.5 text-sm text-secondary">
                    {activity.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="galerie" className="!pt-0">
        <PhotoGallery photos={photos} title={t.gallery.title} />
      </Section>

      {/* Le filtre s'ouvre sur la saison de la page — les retours de skieurs
          convainquent les skieurs — sans empêcher d'aller voir les autres périodes. */}
      <Reviews season={season} />

      <BookingSection />
    </div>
  );
}
