/**
 * Le chemin jusqu'à la porte, en photos — données du guide d'arrivée.
 *
 * Le guide est une page cachée (`/fr/guide-arrivee`), non indexée et absente de la
 * navigation : son adresse est communiquée aux voyageurs avec leur réservation.
 * Aucun code d'accès ne figure ici ni sur la page ; ils sont transmis par message.
 */

export interface ArrivalStep {
  /** Clé du texte dans `guide.steps` des dictionnaires. */
  key: string;
  /** Nom de fichier dans `public/images/guide-arrivee/`. */
  photo: string;
}

/**
 * Étapes dans l'ordre où le voyageur les rencontre — le numéro affiché est la
 * position dans cette liste.
 *
 * Chaque étape est appariée à sa photo par nom de fichier plutôt que par position :
 * une photo d'itinéraire doit montrer exactement l'endroit décrit, et insérer une
 * étape ne doit pas décaler silencieusement toutes les suivantes.
 */
export const ARRIVAL_STEPS: readonly ArrivalStep[] = [
  { key: "mollard", photo: "01-col-du-mollard.jpg" },
  { key: "residence", photo: "02-residence-hameau-des-aiguilles.jpg" },
  { key: "parking", photo: "03-parking-conteneurs.jpg" },
  { key: "escalier", photo: "04-escalier-piscine.jpg" },
  { key: "chalet", photo: "05-chalet-dernier-etage.jpg" },
  { key: "palier", photo: "06-dernier-escalier.jpg" },
  { key: "porte", photo: "07-porte-b122-casier-ski.jpg" },
  { key: "boiteAClef", photo: "08-boite-a-clef.jpg" },
];

/** Dossier des photos du guide, sous `public/images/`. */
export const ARRIVAL_PHOTO_DIR = "guide-arrivee";

/** Photo du tableau électrique — hors itinéraire, utilisée par la section de dépannage. */
export const ELECTRICAL_PANEL_PHOTO = "09-tableau-electrique.jpg";

/**
 * Repères du tableau électrique.
 *
 * Les couleurs reprennent celles des cadres dessinés sur la photo : c'est ce qui
 * permet au voyageur de faire le lien entre la liste et l'image sans compter les
 * disjoncteurs. Changer une couleur ici impose de refaire l'annotation de la photo.
 */
export const PANEL_MARKERS = [
  { key: "breaker", color: "#15803d" },
  { key: "radiators", color: "#dc2626" },
  { key: "waterHeater", color: "#2563eb" },
] as const;

/** Numéros d'urgence en France — les libellés vivent dans les dictionnaires. */
export const EMERGENCY_NUMBERS = [
  { key: "samu", number: "15" },
  { key: "police", number: "17" },
  { key: "firefighters", number: "18" },
  { key: "european", number: "112" },
] as const;
