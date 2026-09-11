/**
 * Les événements datés du secteur d'Albiez — festivals, courses, fêtes de village.
 *
 * Sert deux choses, et rien d'autre : l'encart « prochaine édition » en tête d'un article
 * de guide, et le nœud `Event` des données structurées. Les articles y sont raccordés par
 * `BlogPostMeta.event`, qui porte une clé de ce catalogue.
 *
 * **Écrit pour être extrait plus tard.** Les fonctions sont pures et reçoivent le catalogue
 * en paramètre plutôt que de lire `EVENTS` : le jour où ce module montera dans
 * `@sejour/socle`, seules les données resteront ici. Barbusse a déjà son propre
 * `lib/events.ts`, de même forme — c'est l'autre moitié de la future fusion. Ne pas
 * introduire ici de dépendance à l'i18n, au JSX ou aux dictionnaires.
 *
 * Le type s'appelle `LocalEvent` et non `Event` : `Event` est un global du DOM, et
 * l'ombrer rendrait les erreurs de typage illisibles.
 */
import { addDays } from "@sejour/socle/lib/dates";

export interface LocalEvent {
  /** Clé stable, jamais affichée : c'est elle que porte `BlogPostMeta.event`. */
  key: string;
  /**
   * Nom de l'événement, dans la langue de l'organisateur.
   *
   * Volontairement non traduit : un festival se cherche sous son nom propre, et
   * « Celti'Cimes » ou « Trail de l'Étendard » ne se traduisent pas plus que « Glastonbury ».
   */
  name: string;
  /** Premier jour, inclus, au format `YYYY-MM-DD`. */
  start: string;
  /** Dernier jour, inclus. Égal à `start` pour un événement d'une journée. */
  end: string;
  /** Commune d'accueil, telle qu'elle s'écrit sur une adresse postale. */
  commune: string;
  /**
   * `true` seulement quand l'organisateur a publié les dates.
   *
   * À `false`, les dates sont une **projection** calée sur le jour de semaine de l'édition
   * précédente : elles servent à ordonner le catalogue et à afficher un mois, jamais un
   * jour. C'est aussi ce qui décide de l'émission du JSON-LD `Event` — on ne déclare pas
   * une date supposée à Google, qui l'afficherait comme un fait.
   */
  confirmed: boolean;
  /** Site de l'organisateur, quand il en existe un. */
  url?: string;
}

/**
 * Le catalogue d'Albiez.
 *
 * Trié par date. Les éditions passées sont retirées plutôt qu'archivées : un article qui
 * survit à son événement garde son intérêt documentaire, mais son encart n'a plus rien à
 * annoncer et `nextEdition` doit rendre `undefined`.
 *
 * ⚠️ Les dates non confirmées sont à reprendre auprès des organisateurs et de l'office de
 * tourisme d'Albiez (04 79 59 30 48) dès que les programmes sortent, généralement au
 * printemps.
 */
export const EVENTS: LocalEvent[] = [
  {
    key: "charoc",
    name: "Festival Le Charoc",
    start: "2027-06-05",
    end: "2027-06-06",
    commune: "Saint-Jean-de-Maurienne",
    confirmed: false,
    url: "https://festival-charoc.fr/",
  },
  {
    // Seul événement du catalogue dont les dates soient officielles : l'organisateur les
    // publie plus d'un an à l'avance parce que les 7 500 dossards partent en une journée.
    key: "marmotte",
    name: "Marmotte Granfondo Alpes",
    start: "2027-06-27",
    end: "2027-06-27",
    commune: "Le Bourg-d'Oisans",
    confirmed: true,
    url: "https://marmottegranfondoalpes.com/",
  },
  {
    key: "cross-triathlon-arves",
    name: "Cross Triathlon et Swimrun des Aiguilles d'Arves",
    start: "2027-07-17",
    end: "2027-07-18",
    commune: "Albiez-Montrond",
    confirmed: false,
  },
  {
    key: "fete-du-mouton",
    name: "Fête du Mouton",
    start: "2027-07-23",
    end: "2027-07-23",
    commune: "Saint-Sorlin-d'Arves",
    confirmed: false,
  },
  {
    key: "celti-cimes",
    name: "Celti'Cimes",
    start: "2027-07-24",
    end: "2027-07-27",
    commune: "Albiez-Montrond",
    confirmed: false,
    url: "https://celticimes.org/",
  },
  {
    key: "trail-etendard",
    name: "Trail de l'Étendard",
    start: "2027-07-31",
    end: "2027-08-01",
    commune: "Saint-Sorlin-d'Arves",
    confirmed: false,
  },
  {
    key: "tradi-cimes",
    name: "Tradi'Cimes",
    start: "2027-08-07",
    end: "2027-08-08",
    commune: "Albiez-Montrond",
    confirmed: false,
  },
];

/**
 * La prochaine édition d'un événement, ou `undefined` si la dernière connue est passée.
 *
 * Un événement compte comme à venir jusqu'à la fin de son **dernier** jour : le visiteur
 * qui cherche un logement le samedi d'un festival de quatre jours a encore trois nuits à
 * réserver.
 *
 * `today` est passé en paramètre plutôt que lu ici : la page est générée au build, et une
 * date figée au build serait fausse dès le lendemain. C'est à l'appelant de décider s'il
 * lit l'horloge du serveur ou celle du visiteur.
 */
export function nextEdition(
  catalog: LocalEvent[],
  key: string,
  today: string,
): LocalEvent | undefined {
  return catalog
    .filter((e) => e.key === key && e.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start))[0];
}

/**
 * La fenêtre de séjour conseillée autour d'un événement : arriver la veille, repartir le
 * lendemain.
 *
 * Les marges sont réglables parce qu'elles ne valent pas pour tout le monde. Un week-end de
 * course se joue en `1` / `1` ; une semaine de stage à Celti'Cimes se réserve du samedi au
 * samedi, et l'appeler avec `before: 1, after: 6` donne la semaine complète.
 */
export function stayWindow(
  event: LocalEvent,
  { before = 1, after = 1 }: { before?: number; after?: number } = {},
): { checkIn: string; checkOut: string } {
  return {
    checkIn: addDays(event.start, -before),
    checkOut: addDays(event.end, after),
  };
}
