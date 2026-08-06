import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { alternatesFor, homePath, apartmentJsonLd } from "@/lib/seo";
import { listPhotos } from "@/lib/photos";
import { currentSeason } from "@/lib/seasons";
import Hero from "@/components/public/Hero";
import SeasonCards from "@/components/public/SeasonCards";
import ApartmentSection from "@/components/public/ApartmentSection";
import PracticalSection from "@/components/public/PracticalSection";
import LocationSection from "@/components/public/LocationSection";
import BookingSection from "@/components/public/BookingSection";
import PhotoGallery from "@/components/public/PhotoGallery";
import { Section, SectionTitle } from "@/components/public/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    title: t.home.seo.title,
    description: t.home.seo.description,
    keywords: t.home.seo.keywords,
    alternates: alternatesFor(locale, homePath),
    openGraph: {
      title: t.home.seo.title,
      description: t.home.seo.description,
      url: `${homePath(locale)}`,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const season = currentSeason();

  const winter = listPhotos("hiver");
  const summer = listPhotos("ete");
  const common = listPhotos("commun");

  // Le hero suit la saison en cours ; à défaut de photo de saison, on retombe
  // sur les photos communes, puis sur un dégradé (géré par le composant Hero).
  const seasonPhotos = season === "hiver" ? winter : summer;
  const heroImage = seasonPhotos[0]?.src ?? common[0]?.src;

  const galleryPhotos = common.length > 0 ? common : [...winter, ...summer];

  return (
    <div data-season={season}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(apartmentJsonLd(locale, t.home.seo.description)),
        }}
      />

      <Hero
        title={t.home.heroTitle}
        subtitle={t.home.heroSubtitle}
        image={heroImage}
      />

      <Section className="!pb-0">
        <p className="max-w-3xl text-lg leading-relaxed text-secondary">
          {t.home.intro}
        </p>
      </Section>

      <SeasonCards
        covers={{ hiver: winter[0]?.src, ete: summer[0]?.src }}
      />

      <Section id="galerie" className="!pt-0">
        <PhotoGallery photos={galleryPhotos} title={t.gallery.title} />
      </Section>

      <ApartmentSection />
      <PracticalSection />
      <LocationSection />

      <Section className="!py-10">
        <div className="rounded-2xl border border-border bg-light-bg p-6 sm:p-8">
          <SectionTitle title={t.home.offSeasonTitle} />
          <p className="-mt-4 max-w-3xl text-secondary">{t.home.offSeasonText}</p>
        </div>
      </Section>

      <BookingSection />
    </div>
  );
}
