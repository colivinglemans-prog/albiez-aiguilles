import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { alternatesFor, seasonPath } from "@/lib/seo";
import { listPhotos, getPhoto } from "@/lib/photos";
import { galleryGroups } from "@/lib/gallery";
import {
  HERO_PHOTOS,
  SEASON_BANNER_PHOTOS,
  PISTE_MAP_PHOTO,
} from "@/lib/property";
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

  // La visite espace par espace. Dans chaque espace, la photo de la saison de la page
  // passe devant : les photos valables toute l'année (intérieur sans saison visible)
  // n'ont ainsi jamais besoin d'être dupliquées dans les deux dossiers.
  const spaces = galleryGroups(season, t);

  // Les photos d'activités illustrent la liste dans l'ordre : la 1re photo du dossier
  // va à la 1re activité, et ainsi de suite. Une activité sans photo reste en texte seul.
  const activityPhotos = listPhotos(`activites-${season}`);

  // Bandeau et plan des pistes sont chargés par nom : ils ne sont pas des activités et
  // sont écartés de la liste appariée par position (préfixe `_`).
  const bannerFile = SEASON_BANNER_PHOTOS[season];
  const bannerPhoto = bannerFile
    ? getPhoto(`activites-${season}`, bannerFile)
    : undefined;
  const pisteMap = content.pisteMap
    ? getPhoto(`activites-${season}`, PISTE_MAP_PHOTO)
    : undefined;

  return (
    <div data-season={season}>
      <Hero
        title={content.heading}
        subtitle={content.intro}
        tagline={content.tagline}
        photo={getPhoto(season, HERO_PHOTOS[season]) ?? spaces[0]?.photos[0]}
      />

      <Section className="!py-10">
        <SeasonSwitch active={season} />
      </Section>

      {/* Le plan est collé aux distances : il montre ce que le chiffre affirme.
          Sans plan (l'été), le bandeau reprend toute la largeur.
          Pas d'`items-start` sur la grille : les deux colonnes s'alignent sur la plus
          haute. Une hauteur fixe se serait décalée au premier libellé plus long. */}
      <Section className="!pt-0">
        {pisteMap && content.pisteMap ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <DistanceStrip season={season} />
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
              <div
                className="relative w-full"
                style={{ aspectRatio: pisteMap.ratio }}
              >
                <Image
                  src={pisteMap.src}
                  alt={content.pisteMap.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-auto border-t border-border px-4 py-3 text-sm text-secondary">
                <span className="font-semibold text-foreground">
                  {content.pisteMap.title}
                </span>{" "}
                — {content.pisteMap.caption}
              </figcaption>
            </figure>
          </div>
        ) : (
          <DistanceStrip season={season} />
        )}
      </Section>

      {/* La photo qui présente la station elle-même, plutôt que l'appartement.
          Seul endroit avec le hero où une photo est plafonnée en hauteur : au format
          d'origine, un panoramique de 3:2 ferait défiler deux écrans. */}
      {bannerPhoto && content.banner && (
        <Section className="!pt-0">
          <figure>
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: bannerPhoto.ratio, maxHeight: "26rem" }}
            >
              <Image
                src={bannerPhoto.src}
                alt={content.banner.alt}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-secondary">
              {content.banner.caption}
            </figcaption>
          </figure>
        </Section>
      )}

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
                  // Le conteneur prend le format de l'image : rien n'est recadré,
                  // et les photos carrées restent carrées.
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: photo.ratio }}
                  >
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
                  {/* Le prestataire chez qui l'activité se réserve, quand il y en a un.
                      Renvoyer directement là où la réservation se fait vaut mieux que de
                      laisser le visiteur chercher le bon site. */}
                  {activity.link && (
                    <a
                      href={activity.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      {activity.link.label}
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="galerie" className="!pt-0">
        <PhotoGallery groups={spaces} title={t.gallery.title} />
      </Section>

      {/* Le filtre s'ouvre sur la saison de la page — les retours de skieurs
          convainquent les skieurs — sans empêcher d'aller voir les autres périodes. */}
      <Reviews season={season} />

      <BookingSection />
    </div>
  );
}
