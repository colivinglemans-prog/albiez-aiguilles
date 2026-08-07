import { gallerySpaces } from "./photos";
import type { Season } from "./seasons";
import type { Dictionary } from "./i18n/types";
import type { GalleryGroup } from "@/components/public/PhotoGallery";

/**
 * Assemble la visite affichable : les photos viennent du système de fichiers, les
 * titres et les équipements du dictionnaire.
 *
 * Le rapprochement se fait ici, côté serveur, plutôt que dans la galerie : le
 * composant reçoit des groupes déjà traduits et n'a donc besoin ni de connaître les
 * clés d'espaces, ni de lire les dossiers.
 *
 * Un dossier d'espace sans libellé ne devrait pas exister — `Dictionary["spaces"]`
 * est exhaustive sur `SPACES` — mais s'il apparaît quand même, il s'affiche sous sa
 * clé plutôt que sans titre.
 */
export function galleryGroups(season: Season, t: Dictionary): GalleryGroup[] {
  const labels: Record<string, { title: string; amenities: string[] } | undefined> =
    t.spaces.list;

  return gallerySpaces(season).map(({ key, photos }) => ({
    key,
    title: labels[key]?.title ?? key,
    amenities: labels[key]?.amenities ?? [],
    photos,
  }));
}
