/**
 * Types du dashboard.
 *
 * Choix structurant : `Sejour` est le type canonique, et **les deux sources s'y ramènent** —
 * l'archive des quatre canaux comme les réservations vivantes de Beds24. Le reste du
 * dashboard ne connaît que `Sejour` et ignore d'où il vient.
 *
 * L'alternative, qu'a retenue Barbusse, est de faire porter à l'archive la forme
 * `Beds24Booking`. Elle ne tient pas ici : nos séjours archivés n'ont ni `id` numérique, ni
 * `propertyId`, ni `roomId`, ni nom de voyageur. Les inventer pour satisfaire un type serait
 * fabriquer des données.
 */

export type Canal = "Airbnb" | "Booking.com" | "Abritel" | "Direct";

export interface Sejour {
  /** Identifiant du canal : code de confirmation, numéro de réservation, id Stripe. */
  ref: string;
  canal: Canal;
  /** Première nuit, incluse (YYYY-MM-DD). */
  arrivee: string;
  /** Jour du départ, exclu des nuits (YYYY-MM-DD). */
  depart: string;
  nuits: number;
  /** Ce que paie le voyageur, avant prélèvement du canal. */
  brut: number;
  /** Ce qui reste après commission du canal. */
  net: number;
  commission: number;
  /** Date de réservation, quand la source la donne — sert au délai de réservation. */
  reserveLe?: string | null;
  fraisMenage?: number | null;
  taxeSejourCollecteeParLeCanal?: number | null;
  source: "archive" | "beds24";
  /** Séjour présent dans les deux sources : à dédoublonner sur `ref`. */
  aussiDansBeds24?: boolean;
  /** L'année du séjour a été déduite de la date d'encaissement, pas lue sur la facture. */
  anneeDeduite?: boolean;
  statut?: string;
}

/**
 * Recette sans nuits : elle compte dans le revenu, jamais dans l'occupation.
 * Trois origines, toutes réelles et toutes déjà vérifiées à l'import.
 */
export interface RecetteSansNuits {
  ref: string;
  canal: Canal;
  date: string | null;
  brut: number;
  net: number;
  nature: "supplement" | "frais_annulation" | "sejour_sans_dates";
  libelle?: string;
  /**
   * Moyen d'encaissement, quand il diffère du canal. Un kit facturé par Stripe à un voyageur
   * venu d'Airbnb porte `canal: "Airbnb"` — c'est Airbnb qui a apporté le client — et
   * `paiementVia: "Stripe"`, qui garde la trace de l'endroit où retrouver la transaction.
   */
  paiementVia?: string;
  rapprocheAvec?: { canal: string; code: string };
}

export interface Archive {
  genereLe: string;
  avertissement: string;
  totauxParCanal: Record<string, number>;
  sejours: Sejour[];
  recettes: RecetteSansNuits[];
}

/** Convention d'imputation du revenu dans le temps. Reprise de Barbusse. */
export type ModeRevenu = "reparti" | "arrivee" | "depart" | "reservation";

export interface MoisRevenu {
  /** YYYY-MM */
  mois: string;
  revenu: number;
  nuits: number;
}

/**
 * Contrat de données du graphe — volontairement ignorant du bien et du canal.
 *
 * `parCanal` est indexé **par année** : la vue par canal a besoin d'une année à la fois
 * (empiler quatre canaux × quatre années serait illisible), mais toutes sont envoyées d'un
 * coup pour que changer d'année ne déclenche pas un aller-retour serveur.
 */
export interface RevenueChartData {
  parAnnee: Record<string, number | string>[];
  parCanal: Record<string, Record<string, number | string>[]>;
  annees: number[];
  canaux: string[];
  anneeCourante: number;
  /** 1-12 : au-delà, les mois ne sont pas écoulés et s'affichent en opacité réduite. */
  dernierMoisEcoule: number;
}

/** Répartition par canal pour une année — la comparaison du mix d'une année sur l'autre. */
export interface CanauxAnnee {
  annee: number;
  total: number;
  enCours: boolean;
  canaux: { canal: string; sejours: number; revenu: number; part: number }[];
}

export interface ComparaisonAnnee {
  annee: number;
  /** Cumul du 1er janvier au même jour de l'année, pour comparer à fenêtre égale. */
  cumulADate: number;
  nuitsADate: number;
  /** Variation du cumul à date par rapport à l'année précédente, en %. */
  variationADate: number | null;
  /** Total de l'année entière. Absent pour l'année en cours. */
  totalAnnee: number | null;
  /** Année encore en cours : `totalAnnee` est une projection, pas un constat. */
  enCours: boolean;
  projection?: number;
}

export interface StatsDashboard {
  periode: { du: string; au: string };
  revenuTotal: number;
  revenuNet: number;
  commissions: number;
  nombreSejours: number;
  nuitsVendues: number;
  tauxOccupation: number;
  /** Prix moyen d'une nuit vendue. */
  tjm: number;
  /** Revenu par nuit disponible : intègre les nuits vides, toujours ≤ TJM. */
  revpar: number;
  dureeMoyenneSejour: number;
  delaiMoyenReservation: number | null;
  partDirecte: { revenu: number; sejours: number };
  occupation90Jours: number;
  repartitionCanaux: { canal: string; sejours: number; revenu: number }[];
  /**
   * Les trois blocs suivants sont calculés sur **tout l'historique**, jamais sur la période
   * sélectionnée : comparer les années est leur seule raison d'être, et un filtre de période
   * les réduirait à une seule barre.
   */
  graphe: RevenueChartData;
  comparaison: ComparaisonAnnee[];
  canauxParAnnee: CanauxAnnee[];
  sejoursRecents: SejourAffiche[];
  meilleursSejours: SejourAffiche[];
  recettesHorsNuits: { total: number; nombre: number };
  /** Absence d'archive détectée : le dashboard doit le dire, pas l'ignorer. */
  archiveManquante: boolean;
}

export interface SejourAffiche extends Sejour {
  /** Étiquette de période — « Hiver A+B », « Noël » — ou null hors vacances. */
  periode: string | null;
  tjm: number;
}
