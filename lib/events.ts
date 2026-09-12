/**
 * Les événements datés du secteur d'Albiez — festivals, courses, fêtes de village.
 *
 * **Il ne reste ici que les données.** Le type `LocalEvent` et les fonctions (`nextEdition`,
 * `stayWindow`, `eventJsonLd`, `findEventForStay`…) sont montés dans
 * `@sejour/socle/lib/events` : ce fichier avait été écrit pour être extrait, il l'a été.
 * Barbusse tient son catalogue du Mans dans le fichier du même nom, de l'autre côté.
 *
 * Le catalogue sert deux choses, et rien d'autre : l'encart « prochaine édition » en tête
 * d'un article de guide, et le nœud `Event` des données structurées. Les articles y sont
 * raccordés par `BlogPostMeta.event`, qui porte une **clé** de ce catalogue — jamais un nom.
 *
 * Trié par date. Les éditions passées sont retirées plutôt qu'archivées : un article qui
 * survit à son événement garde son intérêt documentaire, mais son encart n'a plus rien à
 * annoncer et `nextEdition` doit rendre `undefined`.
 *
 * ⚠️ Les dates non confirmées sont à reprendre auprès des organisateurs et de l'office de
 * tourisme d'Albiez (04 79 59 30 48) dès que les programmes sortent, généralement au
 * printemps.
 */
import type { LocalEvent } from "@sejour/socle/lib/events";
import type { EventWatchConfig } from "@sejour/socle/lib/events-watch";

export type { LocalEvent };

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
 * Les seuils de la veille des dates, lus par `/api/cron/events-watch` — voir
 * `@sejour/socle/lib/events-watch` pour ce que chaque règle fait.
 *
 * Les programmes sortent au printemps, d'où la fenêtre de mars à mai — et d'où les trois
 * mois de l'échéance plutôt que quatre : à quatre, Le Charoc sonnerait dès février, un mois
 * avant que quiconque puisse y répondre. Et dès septembre, l'été passé, les éditions écoulées
 * sortent du catalogue : celui de l'année suivante doit alors déjà avoir été resemé.
 */
export const EVENTS_WATCH: EventWatchConfig = {
  deadlineDays: 90,
  catalogGap: { from: "09-01", minEvents: 5 },
  publicationWindows: [
    {
      from: "03-01",
      to: "05-31",
      note: "les programmes d'été sortent au printemps — office de tourisme d'Albiez, 04 79 59 30 48.",
    },
  ],
};
