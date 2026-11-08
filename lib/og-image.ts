import { galleryGroups } from "@/lib/gallery";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getPhoto } from "@/lib/photos";
import { HERO_PHOTOS, SITE_URL } from "@/lib/property";
import { currentSeason, type Season } from "@/lib/seasons";

/**
 * L'image de partage (WhatsApp, Facebook, LinkedIn) des pages qui n'en ont pas de propre : la
 * photo d'en-tête de la saison, la vue panoramique depuis le balcon.
 *
 * Le layout n'en déclarait **aucune**, et Next fusionne les métadonnées en surface : seules les
 * pages d'article (qui posent l'image de l'article) avaient une vignette. L'accueil, les pages
 * saison, le guide, les conditions et le long séjour — 30 URL sur cinq langues — se partageaient
 * sans image (audit du 2026-11-08).
 *
 * Même repli que le hero de l'accueil : la photo désignée, sinon la première de la visite — une
 * photo renommée ne doit pas faire disparaître la vignette sans bruit (relecture du dahu).
 * Lit les dimensions sur disque (`getPhoto`) : serveur uniquement, comme les `generateMetadata`
 * qui l'appellent. Sans saison donnée, celle mise en avant au moment du build, comme l'accueil.
 */
const ALT: Record<Locale, string> = {
  fr: "Vue panoramique depuis le balcon de l'appartement à Albiez-Montrond",
  en: "Panoramic view from the apartment balcony in Albiez-Montrond",
  it: "Vista panoramica dal balcone dell'appartamento ad Albiez-Montrond",
  de: "Panoramablick vom Balkon der Wohnung in Albiez-Montrond",
  es: "Vista panorámica desde el balcón del apartamento en Albiez-Montrond",
};

export function ogImage(locale: Locale, season: Season = currentSeason()) {
  const photo =
    getPhoto(season, HERO_PHOTOS[season]) ??
    galleryGroups(season, getDictionary(locale))[0]?.photos[0];
  if (!photo) return [];
  return [
    {
      url: `${SITE_URL}${photo.src}`,
      width: photo.width,
      height: photo.height,
      alt: ALT[locale],
    },
  ];
}
