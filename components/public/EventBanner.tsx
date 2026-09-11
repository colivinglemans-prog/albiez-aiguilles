import Link from "next/link";
import { getDictionary, LOCALE_META, type Locale } from "@/lib/i18n";
import { stayWindow, type LocalEvent } from "@/lib/events";

/**
 * Encart de tête d'un article d'événement : ce qui se passe, quand, et où réserver.
 *
 * **Rendu côté serveur, donc figé au build**, et c'est assumé. La fraîcheur ne vient pas
 * d'une horloge mais du catalogue : `lib/events.ts` ne contient que des éditions à venir,
 * et une édition passée s'en retire à la main — exactement comme `WINTER_OPENING` se met à
 * jour chaque année dans `lib/seasons.ts`. Le filtrage par date de `nextEdition()` n'est
 * qu'un filet : il fait disparaître l'encart au déploiement suivant si le ménage a été
 * oublié.
 *
 * L'alternative — calculer la date chez le visiteur — mettrait l'encart hors du HTML
 * initial. Sur une page dont l'événement est le sujet principal, c'est précisément le
 * contenu qu'on veut donner à lire au moteur de recherche.
 *
 * ⚠️ **Le contrat, explicitement** : aucune page de ce site ne déclare `revalidate`, donc
 * les 85 pages du guide sont générées une fois par déploiement et jamais rafraîchies
 * ensuite. Si une édition passe sans qu'un déploiement n'intervienne entre-temps, cet
 * encart continue d'annoncer une date écoulée, et le visiteur le voit. Deux façons de
 * fermer le trou, le jour où ça devient gênant : retirer l'édition passée du catalogue et
 * redéployer — c'est la procédure —, ou poser un `export const revalidate` sur la route
 * d'article, au prix de faire sortir tout le guide du statique.
 */
export function EventBanner({
  locale,
  event,
}: {
  locale: Locale;
  event: LocalEvent;
}) {
  const t = getDictionary(locale);
  const { bcp47 } = LOCALE_META[locale];

  // Tout en UTC : les dates du catalogue sont des jours calendaires, pas des instants.
  // Sans `timeZone`, un visiteur à l'ouest de Greenwich verrait la veille.
  const day = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString(bcp47, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

  let dates: string;
  let stay: string | null = null;

  if (event.confirmed) {
    // `formatRange` factorise ce que les deux bornes ont en commun — « 24–27 juillet 2027 »
    // plutôt que « 24 juillet 2027 – 27 juillet 2027 » — et le fait dans chaque langue.
    // Sur un événement d'une journée, il rend simplement la date.
    dates = new Intl.DateTimeFormat(bcp47, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).formatRange(
      new Date(`${event.start}T00:00:00Z`),
      new Date(`${event.end}T00:00:00Z`),
    );
    const window = stayWindow(event);
    stay = t.blog.event.stay(day(window.checkIn), day(window.checkOut));
  } else {
    dates = t.blog.event.toBeConfirmed(
      new Date(`${event.start}T00:00:00Z`).toLocaleDateString(bcp47, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
    );
  }

  return (
    <aside className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft px-6 py-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
        {t.blog.event.label}
      </p>
      <p className="mt-2 text-lg font-semibold text-primary">{event.name}</p>
      {/*
        Séparateur en point médian et non en tiret : le libellé « dates à confirmer »
        contient déjà un tiret cadratin, et deux à la suite se lisent mal.
      */}
      <p className="mt-1 text-sm text-secondary">
        {dates} · {event.commune}
      </p>
      {stay && <p className="mt-1 text-sm text-secondary">{stay}</p>}
      <Link
        href={`/${locale}#reserver`}
        className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        {t.blog.event.button}
      </Link>
    </aside>
  );
}
