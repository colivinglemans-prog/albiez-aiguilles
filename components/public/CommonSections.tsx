import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getPhoto } from "@/lib/photos";
import { galleryGroups } from "@/lib/gallery";
import { SLEEPING_PHOTOS, LINEN_PHOTOS, BABY_KIT_PHOTO } from "@/lib/property";
import { currentSeason, type Season } from "@/lib/seasons";
import PhotoGallery from "./PhotoGallery";
import ApartmentSection from "./ApartmentSection";
import LinenSection from "./LinenSection";
import Awards from "./Awards";
import Reviews from "./Reviews";
import PracticalSection from "./PracticalSection";
import LocationSection from "./LocationSection";
import HostSection from "./HostSection";
import OffSeasonSection from "./OffSeasonSection";
import BookingSection from "./BookingSection";
import { Section } from "./Section";

/**
 * Le tronc commun aux trois pages : tout ce qui décrit le logement sans dépendre
 * de la saison.
 *
 * Un visiteur qui arrive directement sur /ski ou /ete depuis une recherche doit
 * pouvoir tout apprendre sans repasser par l'accueil — combien de couchages, le
 * kit linge, les 50 marches, les distinctions. Ces sections vivaient sur la seule
 * page d'accueil : elles sont montées ici pour être rendues à l'identique partout.
 *
 * `season` absente = accueil : la galerie suit la saison du moment et les avis ne
 * sont pas filtrés. `season` fournie = page saison : les deux s'y accordent.
 */
export default function CommonSections({
  locale,
  season,
}: {
  locale: Locale;
  season?: Season;
}) {
  const t = getDictionary(locale);

  // La galerie suit la visite : un groupe par espace, dans l'ordre de `SPACES`, et
  // à l'intérieur de chaque espace la saison de la page d'abord.
  const spaces = galleryGroups(season ?? currentSeason(), t);

  // Chaque couchage est illustré par une photo précise, désignée par nom de fichier.
  const resolve = (files: readonly string[]) =>
    files.map((f) => getPhoto("commun", f)).filter((p) => p !== undefined);
  const sleepingPhotos = {
    bedroom: resolve(SLEEPING_PHOTOS.bedroom),
    alcove: resolve(SLEEPING_PHOTOS.alcove),
    living: resolve(SLEEPING_PHOTOS.living),
  };
  const linenPhotos = {
    with: getPhoto("commun", LINEN_PHOTOS.with),
    without: getPhoto("commun", LINEN_PHOTOS.without),
  };

  return (
    <>
      <Section id="galerie" className="!pt-0">
        <PhotoGallery groups={spaces} title={t.gallery.title} />
      </Section>

      <ApartmentSection sleepingPhotos={sleepingPhotos} />
      <LinenSection photos={linenPhotos} />

      {/* Les distinctions expliquent pourquoi la note qui suit est crédible :
          les deux se renforcent côte à côte, séparées elles perdent de leur poids. */}
      <Awards />
      {/* Sur une page saison, le filtre s'ouvre sur cette saison — les retours de
          skieurs convainquent les skieurs — sans empêcher d'aller voir le reste. */}
      <Reviews season={season} />

      <PracticalSection babyKitPhoto={getPhoto("commun", BABY_KIT_PHOTO)} />
      <LocationSection />
      <HostSection />
      <OffSeasonSection />

      <BookingSection />
    </>
  );
}
