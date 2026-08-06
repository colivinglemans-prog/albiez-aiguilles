import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { alternatesFor, homePath, apartmentJsonLd } from "@/lib/seo";
import { listPhotos, getPhoto } from "@/lib/photos";
import { currentSeason } from "@/lib/seasons";
import Hero from "@/components/public/Hero";
import SeasonCards from "@/components/public/SeasonCards";
import ApartmentSection from "@/components/public/ApartmentSection";
import PracticalSection from "@/components/public/PracticalSection";
import LocationSection from "@/components/public/LocationSection";
import BookingSection from "@/components/public/BookingSection";
import Reviews from "@/components/public/Reviews";
import SuperhostCard from "@/components/public/SuperhostCard";
import HostSection from "@/components/public/HostSection";
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
  const heroPhoto = seasonPhotos[0] ?? common[0];

  // L'accueil montre tout : l'intérieur d'abord, puis les deux saisons.
  // La galerie se replie d'elle-même au-delà de quelques vignettes.
  const galleryPhotos = [...common, ...winter, ...summer];

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
        photo={heroPhoto}
      />

      <Section className="!pb-0">
        <p className="max-w-3xl text-lg leading-relaxed text-secondary">
          {t.home.intro}
        </p>
      </Section>

      {/* Les mosaïques résument une saison entière en une image. Elles sont hors
          galerie (préfixe `_`) : elles ne montrent que des photos déjà présentes. */}
      <SeasonCards
        covers={{
          hiver: getPhoto("hiver", "_mosaique-hiver.jpg") ?? winter[0],
          ete: getPhoto("ete", "_mosaique-ete.jpg") ?? summer[0],
        }}
      />

      <Section id="galerie" className="!pt-0">
        <PhotoGallery photos={galleryPhotos} title={t.gallery.title} />
      </Section>

      <ApartmentSection />

      {/* Le badge explique pourquoi la note qui suit est crédible : les deux
          se renforcent côte à côte, séparés ils perdent de leur poids. */}
      <Section className="!pb-0">
        <SuperhostCard />
      </Section>
      <Reviews />

      <PracticalSection />
      <LocationSection />
      <HostSection />

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
