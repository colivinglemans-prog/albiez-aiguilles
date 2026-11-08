import { getPhoto } from "@/lib/photos";
import { HERO_PHOTOS, SITE_NAME, SITE_URL } from "@/lib/property";
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
 * Lit les dimensions sur disque (`getPhoto`) : serveur uniquement, comme les `generateMetadata`
 * qui l'appellent. Sans saison donnée, celle mise en avant au moment du build, comme l'accueil.
 */
export function ogImage(season: Season = currentSeason()) {
  const photo = getPhoto(season, HERO_PHOTOS[season]);
  if (!photo) return [];
  return [
    {
      url: `${SITE_URL}${photo.src}`,
      width: photo.width,
      height: photo.height,
      alt: `${SITE_NAME} — vue depuis le balcon`,
    },
  ];
}
