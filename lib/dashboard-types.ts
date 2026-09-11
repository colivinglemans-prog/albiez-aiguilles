/**
 * Types du dashboard.
 *
 * Choix structurant : **le type canonique est `Booking`, et il vit dans le socle** — les deux
 * sources s'y ramènent, l'archive des quatre canaux comme les réservations vivantes de
 * Beds24. Le reste du dashboard ne connaît que lui et ignore d'où il vient.
 *
 * L'alternative, qu'avait retenue Barbusse jusqu'au Lot 2, était de faire porter à l'archive
 * la forme `Beds24Booking`. Elle ne tenait pas ici : nos séjours archivés n'ont ni `id`
 * numérique, ni `propertyId`, ni `roomId`, ni nom de voyageur. Les inventer pour satisfaire
 * un type serait fabriquer des données. C'est ce modèle-ci qui est monté au socle.
 *
 * `Sejour` n'ajoute que ce qui n'existe qu'ici : la surcollecte de taxe de séjour, les deux
 * colonnes d'archive sans équivalent vivant, et le drapeau d'année déduite.
 */

import type { Channel } from "@sejour/socle/lib/channels";
import type { Booking } from "@sejour/socle/lib/booking";
import type {
  ChannelYear,
  RevenueChartData,
  RevenueExtra,
  RevenueMode,
  YearComparison,
} from "@sejour/socle/lib/stats";

/**
 * Les calculs du dashboard — ventilation du revenu, graphe, comparaison annuelle, occupation
 * — sont montés dans `@sejour/socle/lib/stats` au Lot 3. Ce fichier ne garde donc que les
 * types **propres à ce bien** : le séjour augmenté de ses quatre colonnes locales, la forme
 * du fichier d'archive, et la charge utile de `/api/dashboard/stats`.
 *
 * Les types du socle sont réexportés ici pour que les composants gardent un import unique.
 */
export type { ChannelYear, RevenueChartData, RevenueExtra, RevenueMode, YearComparison };

/**
 * Le canal de distribution est défini par le socle (`Channel`). L'alias français reste le
 * nom utilisé par tout ce qui est propre à ce site — au premier rang duquel les recettes
 * sans nuits, dont le vocabulaire est français de bout en bout.
 */
export type Canal = Channel;

/**
 * Un séjour d'Albiez : le `Booking` du socle, plus quatre champs que ce bien est seul à
 * porter.
 *
 * Les champs d'identité du voyageur restent vides ici et doivent le rester : ce site ne
 * porte pas le scope `read:bookings-personal`, et rien dans son dashboard n'en a besoin.
 */
export interface Sejour extends Booking {
  fraisMenage?: number | null;
  taxeSejourCollecteeParLeCanal?: number | null;
  /**
   * Taxe de séjour surcollectée, quand le séjour comporte des mineurs.
   *
   * Beds24 ne sait pas exonérer les mineurs d'une taxe en **pourcentage** : leur support l'a
   * confirmé le 2026-09-01, `per: "adult"` n'est honoré que par les items à montant fixe et
   * aucune configuration n'y remédie. La correction à la main est donc une routine, et ce
   * champ dit combien corriger au lieu de laisser refaire le calcul.
   *
   * `null` dès qu'il n'y a pas de mineur ou pas de ligne de taxe sur la facture — ce qui
   * couvre tous les canaux : Airbnb et Booking ne font pas passer la taxe par Beds24.
   *
   * Reste en français : c'est du vocabulaire réglementaire, pas technique.
   */
  surcollecteTaxe?: { collectee: number; due: number; ecart: number } | null;
  /** L'année du séjour a été déduite de la date d'encaissement, pas lue sur la facture. */
  anneeDeduite?: boolean;
}

/**
 * Recette sans nuits : elle compte dans le revenu, jamais dans l'occupation.
 * Trois origines, toutes réelles et toutes déjà vérifiées à l'import.
 *
 * Elle étend `RevenueExtra` du socle — `date`, `channel`, `net` — et ajoute ce que ce bien
 * est seul à porter : la référence, le brut, la nature et le rapprochement bancaire.
 */
export interface RecetteSansNuits extends RevenueExtra {
  ref: string;
  brut: number;
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

/**
 * Forme **du fichier** d'archive, telle que `scripts/build-archive.mjs` l'écrit — et non
 * celle du domaine.
 *
 * Ses clés sont restées en français : le fichier est un export figé, produit une fois, et le
 * renommer obligerait à régénérer l'archive et à repousser la variable `HISTORIQUE_ALBIEZ`
 * sur Vercel pour un gain nul. La traduction vers `Sejour` se fait au chargement
 * (`lib/archive.ts`), ce qui est exactement le travail d'un adaptateur : c'est la même
 * frontière que celle qui sépare `Beds24Booking` de `Booking`.
 */
export interface SejourArchive {
  ref: string;
  canal: Canal;
  arrivee: string;
  depart: string;
  nuits: number;
  brut: number;
  net: number;
  commission: number;
  reserveLe?: string | null;
  fraisMenage?: number | null;
  taxeSejourCollecteeParLeCanal?: number | null;
  source?: string;
  anneeDeduite?: boolean;
}

/**
 * Une recette telle que **le fichier** l'écrit : `canal`, comme `SejourArchive` écrit
 * `arrivee` et `depart`. La traduction vers `RecetteSansNuits` se fait au chargement
 * (`lib/archive.ts`), au même endroit et pour la même raison que celle des séjours.
 */
export interface RecetteArchive extends Omit<RecetteSansNuits, "channel"> {
  canal: Canal;
}

export interface Archive {
  genereLe: string;
  avertissement: string;
  totauxParCanal: Record<string, number>;
  sejours: SejourArchive[];
  recettes: RecetteArchive[];
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
  repartitionCanaux: { channel: string; stays: number; revenue: number }[];
  /**
   * Les trois blocs suivants sont calculés sur **tout l'historique**, jamais sur la période
   * sélectionnée : comparer les années est leur seule raison d'être, et un filtre de période
   * les réduirait à une seule barre.
   */
  graphe: RevenueChartData;
  comparaison: YearComparison[];
  canauxParAnnee: ChannelYear[];
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
