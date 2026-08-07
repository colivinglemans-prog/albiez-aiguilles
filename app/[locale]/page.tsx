import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { alternatesFor, homePath, apartmentJsonLd } from "@/lib/seo";
import { listSpaces, getPhoto } from "@/lib/photos";
import { galleryGroups } from "@/lib/gallery";
import { HERO_PHOTOS } from "@/lib/property";
import { currentSeason } from "@/lib/seasons";
import Hero from "@/components/public/Hero";
import SeasonCards from "@/components/public/SeasonCards";
import CommonSections from "@/components/public/CommonSections";
import { Section } from "@/components/public/Section";

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

  // Le hero porte une photo désignée, pas la première du dossier ; à défaut on
  // retombe sur la première de la visite, puis sur un dégradé (géré par Hero).
  const heroPhoto =
    getPhoto(season, HERO_PHOTOS[season]) ??
    galleryGroups(season, t)[0]?.photos[0];

  return (
    <div data-season={season}>
      {/* Une seule page déclare le logement comme entité : l'accueil. Les pages
          saison en reprennent le contenu mais pas le balisage, pour ne pas
          déclarer trois fois le même appartement. */}
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
          galerie (préfixe `_`) : elles ne montrent que des photos déjà présentes.
          C'est le seul bloc que les pages saison remplacent — tout ce qui suit
          leur est commun. */}
      <SeasonCards
        covers={{
          hiver:
            getPhoto("hiver", "_mosaique-hiver.jpg") ??
            listSpaces("hiver")[0]?.photos[0],
          ete:
            getPhoto("ete", "_mosaique-ete.jpg") ??
            listSpaces("ete")[0]?.photos[0],
        }}
      />

      <CommonSections locale={locale} />
    </div>
  );
}
