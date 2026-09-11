import type { Sejour } from "@/lib/dashboard-types";
import { normalizeChannel as normaliserCanal } from "@sejour/socle/lib/channels";
import { nightsBetween } from "@sejour/socle/lib/booking";
import { isExcludedStatus } from "@sejour/socle/lib/booking-status";
import {
  createBeds24Client,
  expandSpans,
  type Beds24RouteState,
} from "@sejour/socle/lib/beds24-client";
import type {
  Beds24AvailabilityRoom,
  Beds24Booking,
  Beds24CalendarRoom,
  Beds24InvoiceItem,
} from "@sejour/socle/lib/beds24-types";

/**
 * Client Beds24 v2 pour Albiez.
 *
 * Le transport — échange des jetons, cache d'access tokens, repli, écriture de note,
 * réexpansion des tranches de calendrier — vient de `@sejour/socle/lib/beds24-client`. Ne
 * restent ici que les **noms des variables d'environnement**, la traduction vers `Sejour`, et
 * les deux calculs qui n'appartiennent qu'à ce bien : la surcollecte de taxe et les
 * contraintes de séjour.
 *
 * **Trois tokens, trois privilèges** — même architecture que Barbusse depuis le 2026-09-11 :
 *
 * | Variable | deviceName | Scopes | Chemin servi |
 * |---|---|---|---|
 * | `BEDS24_PUBLIC_REFRESH_TOKEN` | `albiez-public-2026-09` | `read:inventory`, `read:properties` | `/api/disponibilites`, vitrine |
 * | `BEDS24_READ_REFRESH_TOKEN` | `albiez-lecture-2026-09` | + `read:bookings`, `read:bookings-financial` | dashboard |
 * | `BEDS24_REFRESH_TOKEN` | `albiez-ecriture-2026-09` | `read:bookings`, `write:bookings` | consignes de ménage |
 *
 * Le découpage suit les chemins, pas les verbes : le point d'entrée public ne sait rien des
 * réservations, la lecture du dashboard ne sait pas écrire, et l'écriture ne voit pas
 * l'argent — les trois vérifiés contre l'API, pas supposés. L'ancien jeton unique portait dix
 * scopes, dont `write:bookings-personal` et `write:bookings-financial` que rien n'utilisait.
 *
 * **Pas de `read:bookings-personal`** : ce site ne lit aucun nom ni contact, et le type
 * `Sejour` n'a même pas de champ rempli pour ça. Le `Booking` du socle en a — Barbusse en a
 * besoin pour ses factures — mais ils sont optionnels, et rien ici ne doit pousser à réclamer
 * le scope pour les remplir.
 *
 * **Les trois sont des refresh tokens, aucun long life.** Un long life ne peut techniquement
 * porter que des scopes de lecture, ce qui forcerait de toute façon un second token pour
 * l'écriture ; et surtout sa durée de vie est incertaine. Un refresh token meurt après
 * 30 jours sans usage, mais l'échéance glisse à chaque échange — d'où le cron keepalive, qui
 * les entretient tous les trois plutôt que de parier sur le trafic.
 */
const client = createBeds24Client({
  defaultRoute: "lecture",
  routes: {
    /**
     * Lectures servies au **public**. S'il fuite, l'attaquant apprend quelles dates sont
     * libres, information que la page affiche déjà.
     *
     * Ses deux replis désignent la voie de **lecture**, jamais celle d'écriture : le chemin
     * le plus exposé du site ne doit à aucun moment, même dégradé, tenir un jeton capable
     * d'écrire.
     */
    public: {
      env: "BEDS24_PUBLIC_REFRESH_TOKEN",
      whenMissing: "lecture",
      whenRefused: "lecture",
      hint:
        "Régénérer un refresh token dans Beds24 → Settings → Apps & Integrations → API, " +
        "avec les seuls scopes read:inventory et read:properties.",
    },
    /**
     * Lectures du dashboard — séjours, montants, commissions. Les scopes d'inventaire ne
     * sont pas un oubli : ils font vivre le repli du chemin public.
     *
     * Pas de `whenRefused` : reprendre un 401 avec le jeton d'écriture rendrait les séjours
     * **sans leurs montants**, et le dashboard afficherait des zéros au lieu d'une erreur.
     */
    lecture: {
      env: "BEDS24_READ_REFRESH_TOKEN",
      whenMissing: "ecriture",
      hint:
        "Sans BEDS24_READ_REFRESH_TOKEN, les lectures passent par le jeton d'écriture, qui " +
        "ne porte pas read:bookings-financial — les montants seront vides.",
    },
    /** Écriture des consignes de ménage, et rien d'autre. Aucun repli : c'est un cul-de-sac. */
    ecriture: { env: "BEDS24_REFRESH_TOKEN" },
  },
});

export type EtatToken = Beds24RouteState;

/**
 * Entretient les trois refresh tokens — appelé par le cron hebdomadaire.
 *
 * Beds24 invalide un refresh token qui n'a pas servi depuis 30 jours, et aucun des trois ne
 * s'entretient de façon fiable tout seul : l'écriture ne sert qu'à poser une consigne de
 * ménage, le dashboard n'est ouvert que par intermittence, et le trafic de la vitrine est
 * encore faible. Pire, deux des trois morts seraient **silencieuses** : le repli prendrait le
 * relais et le site continuerait de fonctionner en ayant reperdu la séparation des
 * privilèges, sans que rien ne le signale.
 */
export function entretenirTokens(): Promise<Record<string, EtatToken>> {
  return client.keepAlive(["public", "lecture", "ecriture"]);
}

/**
 * Libellé de la ligne de taxe de séjour, tel que Beds24 le reprend de l'upsell item 3.
 *
 * Le reconnaître au texte est fragile, et c'est assumé : renommé dans Beds24, la correction
 * disparaît simplement de l'affichage. Un silence vaut mieux qu'un montant faux sur une ligne
 * qui sert à déclarer une taxe.
 */
const LIBELLE_TAXE_SEJOUR = /taxe de s[eé]jour/i;

/**
 * Part de taxe de séjour collectée à tort, faute d'exonération des mineurs.
 *
 * Beds24 assied la taxe en pourcentage sur la totalité de l'hébergement, sans regarder la
 * répartition adultes/enfants. Le montant dû est donc celui collecté rapporté à la part des
 * adultes : les mineurs sont exonérés de plein droit (article L.2333-31 du CGCT), et le
 * barème 3CMA assied le tarif sur le coût **par personne** — diviser par les occupants puis
 * multiplier par les seuls adultes revient exactement à ce ratio.
 *
 * Volontairement indépendant du canal : c'est la présence d'une ligne de taxe qui déclenche
 * le calcul. Aujourd'hui seul le direct en porte une, mais le jour où un canal s'y mettrait,
 * le même écart s'appliquerait sans qu'on ait à y penser.
 */
function surcollecteTaxe(b: Beds24Booking): Sejour["surcollecteTaxe"] {
  const enfants = b.numChild ?? 0;
  const occupants = (b.numAdult ?? 0) + enfants;
  if (enfants <= 0 || occupants <= 0) return null;

  const ligne = (b.invoiceItems ?? []).find((l: Beds24InvoiceItem) =>
    LIBELLE_TAXE_SEJOUR.test(l.description ?? ""),
  );
  const collectee = Number(ligne?.lineTotal ?? 0);
  if (collectee <= 0) return null;

  const due = (collectee * (occupants - enfants)) / occupants;
  return { collectee, due, ecart: collectee - due };
}

/**
 * Réservations vivantes, ramenées au type canonique.
 *
 * `apiReference` porte le numéro de réservation du canal — c'est la clé de dédoublonnage
 * avec l'archive. À défaut, on retombe sur l'id Beds24, qui ne collisionnera avec aucune
 * référence de canal.
 *
 * Le `gross` de Beds24 est `price` et la commission du canal vient de `commission`, que l'API
 * renseigne bel et bien — relevé le 2026-09-01 : 94,86 € sur 510 € chez Airbnb, 61,95 € sur
 * 336,70 € chez Booking. Le net les soustrait. Auparavant net valait brut, ce qui surestimait
 * le net d'environ 18 % sur toutes les réservations vivantes.
 *
 * Reliquat connu : en direct, `commission` vaut 0 et les 1,92 % de Stripe n'y figurent pas.
 * Le net direct est donc surestimé d'autant. On ne les modélise pas — ils sont connus
 * exactement dans Stripe, et une estimation dans le code deviendrait fausse au premier
 * changement de tarif.
 */
export async function sejoursBeds24(params: {
  arriveeDu: string;
  arriveeAu: string;
  /** Ignorer le cache — à utiliser sur les vues où l'on écrit, comme le calendrier. */
  frais?: boolean;
}): Promise<Sejour[]> {
  const { data = [] } = await client.get<{ data: Beds24Booking[] }>("/bookings", {
    params: {
      arrivalFrom: params.arriveeDu,
      arrivalTo: params.arriveeAu,
      // Les lignes de facture isolent l'hébergement et la taxe de séjour, seule façon de
      // chiffrer la surcollecte sur les mineurs.
      includeInvoiceItems: "true",
    },
    fresh: params.frais,
  });

  return data
    .filter((b) => !isExcludedStatus(b.status))
    .map((b) => {
      const gross = Number(b.price ?? 0);
      const commission = Number(b.commission ?? 0);
      return {
        ref: b.apiReference?.trim() || `beds24-${b.id}`,
        channel: normaliserCanal(b.referer, b.channel),
        arrival: b.arrival,
        departure: b.departure,
        nights: nightsBetween(b.arrival, b.departure),
        gross,
        net: gross - commission,
        commission,
        surcollecteTaxe: surcollecteTaxe(b),
        // Tronqué au jour : le délai de réservation et la convention « à la réservation »
        // raisonnent en jours calendaires, pas à la seconde.
        bookedAt: b.bookingTime?.slice(0, 10) ?? null,
        source: "live" as const,
        status: b.status,
        id: b.id,
        notes: b.notes ?? "",
        // `null` et non `0` quand Beds24 ne renseigne rien : zéro voyageur serait un chiffre,
        // l'absence d'information n'en est pas un.
        guests:
          b.numAdult == null && b.numChild == null
            ? null
            : (b.numAdult ?? 0) + (b.numChild ?? 0),
      };
    });
}

/**
 * Disponibilités jour par jour, pour le calendrier **public** de la vitrine.
 *
 * Une date est libre si elle l'est pour toutes les rooms. Albiez n'en a qu'une (`715147`),
 * mais la fusion est conservée : elle ne coûte rien et évite un bug silencieux le jour où une
 * seconde room apparaîtrait.
 *
 * Ne renvoie **que des booléens** : aucun montant, aucun nom. C'est ce qui rend la route
 * publiable sans risque.
 */
export async function disponibilites(du: string, au: string): Promise<Record<string, boolean>> {
  const propertyId = process.env.BEDS24_PROPERTY_ID;
  if (!propertyId) throw new Error("BEDS24_PROPERTY_ID n'est pas défini");

  const { data = [] } = await client.get<{ data: Beds24AvailabilityRoom[] }>(
    "/inventory/rooms/availability",
    { params: { propertyId, startDate: du, endDate: au }, route: "public" },
  );

  const fusion: Record<string, boolean> = {};
  for (const room of data) {
    for (const [jour, libre] of Object.entries(room.availability ?? {})) {
      fusion[jour] = fusion[jour] === undefined ? libre : fusion[jour] && libre;
    }
  }
  return fusion;
}

export type Contraintes = {
  /** Séjour minimum par date. */
  minima: Record<string, number>;
  /** Dates où l'arrivée est interdite. */
  sansArrivee: string[];
  /** Dates où le départ est interdit. */
  sansDepart: string[];
};

/**
 * Contraintes de séjour par date : minimum de nuits, et jours fermés à l'arrivée ou au départ.
 *
 * **Le séjour minimum** est celui que pousse Beyond Pricing, et non le `minStay` de la room,
 * qui vaut 1 et ne veut rien dire : la vraie contrainte est portée date par date au
 * calendrier — relevé le 2026-08-29, 2 nuits en général et 6 nuits en haute saison.
 *
 * **Les jours fermés** viennent de l'`override` du calendrier, c'est-à-dire de la rotation du
 * samedi posée pendant les vacances scolaires d'hiver (voir CLAUDE.md). `blackout` n'est pas
 * repris ici : une date fermée l'est déjà par `disponibilites()`. `exception` non plus, ce
 * n'est pas une règle d'arrivée mais un renvoi aux booking rules de la période exceptionnelle.
 *
 * Les deux sortent du **même appel** : elles viennent du même endpoint, et Beds24 facture au
 * nombre de requêtes.
 *
 * Sans ces contraintes, le calendrier du site laisse sélectionner des séjours que la page de
 * réservation Beds24 refuse ensuite — elle répond « Pas de check-in 24 févr. » et un prix nul,
 * ce qui donne un tunnel qui s'arrête sans expliquer pourquoi.
 */
export async function contraintes(du: string, au: string): Promise<Contraintes> {
  const propertyId = process.env.BEDS24_PROPERTY_ID;
  if (!propertyId) throw new Error("BEDS24_PROPERTY_ID n'est pas défini");

  const { data = [] } = await client.get<{ data: Beds24CalendarRoom[] }>(
    "/inventory/rooms/calendar",
    {
      params: {
        propertyId,
        startDate: du,
        endDate: au,
        includeMinStay: "true",
        includeOverride: "true",
      },
      route: "public",
    },
  );

  const minima: Record<string, number> = {};
  const sansArrivee: Record<string, true> = {};
  const sansDepart: Record<string, true> = {};

  const ferme = (o: string | undefined, bord: "In" | "Out") =>
    o === `noCheck${bord}` || o === "noCheckInOrCheckOut";

  for (const room of data) {
    // Le plus grand minimum gagne quand deux rooms se prononcent sur le même jour : une
    // contrainte de séjour est une borne basse, la relâcher afficherait des séjours refusés.
    expandSpans(room.calendar, (t) => t.minStay, (avant, apres) => Math.max(avant ?? 0, apres), minima);
    expandSpans(room.calendar, (t) => (ferme(t.override, "In") ? true : undefined), undefined, sansArrivee);
    expandSpans(room.calendar, (t) => (ferme(t.override, "Out") ? true : undefined), undefined, sansDepart);
  }

  return {
    minima,
    sansArrivee: Object.keys(sansArrivee).sort(),
    sansDepart: Object.keys(sansDepart).sort(),
  };
}

/** Prix au calendrier — ceux que pousse Beyond Pricing. Sert à la projection. */
export async function prixParNuit(params: { du: string; au: string }): Promise<Record<string, number>> {
  const propertyId = process.env.BEDS24_PROPERTY_ID;
  if (!propertyId) return {};
  const { data = [] } = await client.get<{ data: Beds24CalendarRoom[] }>(
    "/inventory/rooms/calendar",
    {
      params: {
        propertyId,
        startDate: params.du,
        endDate: params.au,
        includePrices: "true",
      },
    },
  );

  // Une seule room ici : la dernière valeur gagne, ce qui est le défaut de `expandSpans`.
  const prix: Record<string, number> = {};
  for (const room of data) expandSpans(room.calendar, (t) => t.price1, undefined, prix);
  return prix;
}

/**
 * Écrit une note interne sur une réservation vivante.
 *
 * Le champ visé est `notes` et non `comments` : le second porte la remarque du voyageur et
 * s'imprime sur les documents envoyés au client. `notes` reste interne.
 *
 * Beds24 v2 répond parfois **200 avec `success: false`** dans le tableau de retour : le socle
 * lit ce refus silencieux dans le corps, sinon l'interface affiche « enregistré » alors que
 * rien ne l'a été.
 */
export function ecrireNotes(id: number, notes: string): Promise<void> {
  return client.updateNotes(id, notes, "ecriture");
}
