import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { listPhotos, getPhoto } from "@/lib/photos";
import { SEASON_BANNER_PHOTOS, PISTE_MAP_PHOTO, RESORT } from "@/lib/property";
import type { Season } from "@/lib/seasons";
import SeasonSwitch from "./SeasonSwitch";
import DistanceStrip from "./DistanceStrip";
import ZoomableFigure from "./ZoomableFigure";
import { Section, SectionTitle } from "./Section";

/**
 * Le bloc propre à une saison : bascule ski/été, distances, plan des pistes,
 * bandeau, points forts et activités.
 *
 * C'est le seul contenu qui distingue /ski de /ete — il prend, sur ces pages, la
 * place que « Deux saisons, deux séjours » occupe sur l'accueil. Tout ce qui suit
 * est commun aux trois pages (voir `CommonSections`).
 */
export default function SeasonBlock({
  locale,
  season,
}: {
  locale: Locale;
  season: Season;
}) {
  const t = getDictionary(locale);
  const content = t.seasons[season];

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

  // Les chiffres du domaine viennent de `RESORT`, le dictionnaire ne fournit que les
  // mots. Les milliers sont formatés selon la langue — « 1 500 » en français,
  // « 1,500 » en anglais.
  const number = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB");
  const facts = content.resortFacts;
  const factPills = facts
    ? [
        `${RESORT.pistes} ${facts.pistes}`,
        `${RESORT.lifts} ${facts.lifts}`,
        `${number.format(RESORT.altitudeMin)} – ${number.format(RESORT.altitudeMax)} m`,
        `${RESORT.snowGuns} ${facts.snowGuns}`,
      ]
    : [];

  return (
    <>
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
            {/* Agrandissable : dans sa colonne, un plan de 1920 px de large ne laisse
                pas lire les noms de pistes. */}
            <ZoomableFigure
              photo={pisteMap}
              title={content.pisteMap.title}
              caption={content.pisteMap.caption}
            />
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
        <SectionTitle title={content.activitiesTitle} />
        <ul className="grid gap-6 sm:grid-cols-2">
          {content.activities.map((activity, i) => {
            const photo = activityPhotos[i];
            // L'hiver, la première activité — le domaine skiable — prend toute la
            // largeur : c'est ce que vient chercher le visiteur, et c'est elle qui
            // porte les chiffres de la station. L'été, les quatre activités restent
            // à égalité, aucune ne l'emporte sur les autres.
            const featured = i === 0 && factPills.length > 0;
            return (
              <li
                key={activity.title}
                className={`overflow-hidden rounded-2xl border border-border bg-white ${
                  featured ? "sm:col-span-2 sm:grid sm:grid-cols-2" : ""
                }`}
              >
                {photo &&
                  (featured ? (
                    // Seule photo d'activité recadrée : en vedette, c'est le texte
                    // qui fixe la hauteur de la case et la photo remplit sa colonne.
                    // Sur mobile, la case redevient une colonne et la photo reprend
                    // son format d'origine.
                    <div
                      className="relative aspect-[var(--photo-ratio)] w-full sm:aspect-auto sm:h-full sm:min-h-64"
                      style={
                        {
                          "--photo-ratio": photo.ratio,
                        } as React.CSSProperties
                      }
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt || activity.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
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
                  ))}
                <div
                  className={
                    featured
                      ? "flex flex-col justify-center p-5 sm:p-8"
                      : photo
                        ? "p-5"
                        : "border-l-2 border-accent p-5"
                  }
                >
                  <h3 className={featured ? "text-lg font-bold" : "font-semibold"}>
                    {activity.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-secondary">
                    {activity.description}
                  </p>

                  {/* Les chiffres du domaine, une fois et à un seul endroit : ils
                      n'ont plus à être répétés dans les descriptions. */}
                  {featured && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {factPills.map((fact) => (
                        <li
                          key={fact}
                          className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-dark"
                        >
                          {fact}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Le prestataire chez qui l'activité se réserve, ou l'article du
                      guide qui la détaille. Renvoyer directement là où la réservation
                      se fait vaut mieux que de laisser le visiteur chercher le bon
                      site ; renvoyer au guide évite d'étirer la case jusqu'à en faire
                      un article. */}
                  {activity.link && <ActivityLink link={activity.link} />}
                </div>
              </li>
            );
          })}
        </ul>

        {/* La liste s'arrête à quatre ou cinq activités : au-delà, elle deviendrait
            un sommaire. Ce renvoi ferme la section en indiquant où le reste se
            trouve, plutôt que de laisser la grille se terminer sur rien. */}
        <div className="mt-8 rounded-2xl border border-border bg-accent-soft p-5 sm:p-6">
          <p className="text-sm text-secondary">
            {content.activitiesMore.text}
          </p>
          <Link
            href={`/${locale}/guide`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            {content.activitiesMore.label}
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </Section>
    </>
  );
}

/**
 * Le lien d'une activité.
 *
 * Deux natures, deux rendus : un prestataire s'ouvre dans un onglet neuf — on ne fait
 * pas quitter la page de réservation à quelqu'un qui va consulter des horaires — là où
 * un article du guide reste dans la navigation du site, en `<Link>` préchargé.
 */
function ActivityLink({
  link,
}: {
  link: { href: string; label: string; internal?: boolean };
}) {
  const className =
    "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline";

  if (link.internal) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {link.label}
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
  );
}
