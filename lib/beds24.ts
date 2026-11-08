import type { Sejour } from "@/lib/dashboard-types";
import { normalizeChannel as normaliserCanal } from "@sejour/socle/lib/channels";
import { nightsBetween } from "@sejour/socle/lib/booking";
import { isExcludedStatus } from "@sejour/socle/lib/booking-status";
import { commissionOf } from "@sejour/socle/lib/commissions";
import {
  createBeds24Client,
  expandSpans,
  type Beds24RouteState,
} from "@sejour/socle/lib/beds24-client";
import type {
  Beds24AvailabilityRoom,
  Beds24Booking,
  Beds24CalendarRoom,
  Beds24Message,
} from "@sejour/socle/lib/beds24-types";
import { ecartDeCollecte, touristTaxFromInvoiceItems } from "@sejour/socle/lib/taxe-sejour";

/**
 * Client Beds24 v2 pour Albiez.
 *
 * Le transport — échange des jetons, cache d'access tokens, repli, écriture de note,
 * réexpansion des tranches de calendrier — vient de `@sejour/socle/lib/beds24-client`. Ne
 * restent ici que les **noms des variables d'environnement**, la traduction vers `Sejour`, et
 * `contraintes()`, le seul calcul qui n'appartienne encore qu'à ce bien. La surcollecte de
 * taxe est partie au socle au Lot 4 (`ecartDeCollecte`).
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
 * **`read:bookings-personal` sur la seule voie `messagerie`** (2026-11-08) : la messagerie
 * voyageur (`lib/messages/`) lit prénom, langue et e-mail. Le dashboard n'en lit aucun : le type
 * `Sejour` n'a pas de champ d'identité rempli, et rien ici ne doit employer la voie `messagerie`
 * pour en remplir un.
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
    /**
     * Écriture des consignes de ménage et du registre de la messagerie voyageur (`infoItems`
     * `MSG_*`). Aucun repli : c'est un cul-de-sac.
     */
    ecriture: { env: "BEDS24_REFRESH_TOKEN" },
    /**
     * Messagerie voyageur (2026-11-08) : `read:bookings`, `read:bookings-personal`,
     * `write:bookings-personal` — device `albiez-aiguilles-messagerie-2026-11`. Lit le prénom,
     * l'adresse et la langue du voyageur, et poste dans la messagerie de la plateforme.
     * `/bookings/messages` refuse tout jeton sans la variante `-personal`. **Aucun repli** :
     * aucune autre voie ne doit pouvoir écrire au voyageur.
     */
    messagerie: { env: "BEDS24_MESSAGES_REFRESH_TOKEN" },
  },
});

export type EtatToken = Beds24RouteState;

/**
 * Entretient les quatre refresh tokens — appelé par le cron hebdomadaire.
 *
 * Beds24 invalide un refresh token qui n'a pas servi depuis 30 jours, et aucun des trois ne
 * s'entretient de façon fiable tout seul : l'écriture ne sert qu'à poser une consigne de
 * ménage, le dashboard n'est ouvert que par intermittence, et le trafic de la vitrine est
 * encore faible. Pire, deux des trois morts seraient **silencieuses** : le repli prendrait le
 * relais et le site continuerait de fonctionner en ayant reperdu la séparation des
 * privilèges, sans que rien ne le signale.
 */
export function entretenirTokens(): Promise<Record<string, EtatToken>> {
  return client.keepAlive(["public", "lecture", "ecriture", "messagerie"]);
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
      // La même définition du brut que chez Barbusse, au centime : `price` fait foi, on en
      // retire la taxe de séjour lue dans les lignes, la commission vient de `commissionOf`.
      // Airbnb et Booking ne font pas passer la taxe par Beds24 : `touristTax` y vaut 0 et
      // `gross` ne bouge pas — l'archive, elle, est déjà hors taxe et ne porte pas ce champ.
      const round2 = (n: number) => Math.round(n * 100) / 100;
      const touristTax = touristTaxFromInvoiceItems(b.invoiceItems);
      const gross = round2(Number(b.price ?? 0) - touristTax);
      const commission = round2(commissionOf(b));
      return {
        ref: b.apiReference?.trim() || `beds24-${b.id}`,
        channel: normaliserCanal(b.referer, b.channel),
        arrival: b.arrival,
        departure: b.departure,
        nights: nightsBetween(b.arrival, b.departure),
        gross,
        net: round2(gross - commission),
        commission,
        touristTax,
        // Monté au socle au Lot 4, sans un chiffre de changé : l'exonération des mineurs
        // (art. L.2333-31 du CGCT) n'était écrite qu'ici, et le moteur de taxe de séjour de
        // l'autre site ne l'avait pas. Les deux ont fusionné dans `ecartDeCollecte`, qui ne
        // demande aucun barème — c'est le collecté qui sert de base, pas la délibération.
        surcollecteTaxe: ecartDeCollecte(b),
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

/*
 * ——— Messagerie voyageur (`lib/messages/engine.ts`) ———
 *
 * Lectures **fraîches** : le moteur relit le registre juste avant d'envoyer, et le cache de 60 s
 * rendrait un registre en retard (champollion, 2026-11-08).
 */

/** Réservations confirmées ou nouvelles de la fenêtre, avec `infoItems` et données du voyageur. */
export async function reservationsMessagerie(params: { departDu: string; arriveeAu: string }): Promise<Beds24Booking[]> {
  const { data = [] } = await client.get<{ data: Beds24Booking[] }>("/bookings", {
    params: {
      // Comme les autres lectures serveur : la variable fait foi (voir `PROPERTY.beds24`).
      propertyId: proprieteServeur(),
      departureFrom: params.departDu,
      arrivalTo: params.arriveeAu,
      includeInfoItems: "true",
    },
    route: "messagerie",
    fresh: true,
  });
  return data;
}

/** Une réservation, fraîche, avec `infoItems` et données du voyageur. */
export async function reservationMessagerie(id: number): Promise<Beds24Booking | null> {
  const { data = [] } = await client.get<{ data: Beds24Booking[] }>("/bookings", {
    params: { id: String(id), propertyId: proprieteServeur(), includeInfoItems: "true" },
    route: "messagerie",
    fresh: true,
  });
  return data[0] ?? null;
}

/**
 * Messages de l'hôte sur toutes les réservations des `jours` derniers jours, en une requête
 * paginée (100 par page) plutôt qu'une par réservation. Sert à reprendre l'historique : ce que
 * l'hôte a envoyé à la main avant l'outil.
 */
export async function messagesHote(jours: number): Promise<Beds24Message[]> {
  const out: Beds24Message[] = [];
  for (let page = 1; page <= 20; page++) {
    const r = await client.get<{ data?: Beds24Message[]; pages?: { nextPageExists?: boolean } }>("/bookings/messages", {
      params: { maxAge: String(jours), source: "host", page: String(page) },
      route: "messagerie",
      fresh: true,
    });
    out.push(...(r.data ?? []));
    if (!r.pages?.nextPageExists) return out;
  }
  // Un historique tronqué ferait renvoyer des messages déjà partis (chef-de-stand) : on s'arrête.
  throw new Error("Historique des messages tronqué (plus de 20 pages)");
}

/** Fil d'une réservation (première page). */
export function filReservation(id: number): Promise<Beds24Message[]> {
  return client.getMessages(id, "messagerie");
}

/** Poste un message dans la messagerie de la plateforme. */
export function envoyerMessagePlateforme(id: number, texte: string): Promise<void> {
  return client.sendMessage(id, texte, "messagerie");
}

/** Écrit une trace du registre (`MSG_*`) sur la réservation. */
export function ecrireRegistre(id: number, code: string, texte: string): Promise<void> {
  return client.addInfoItems(id, [{ code, text: texte }], "ecriture");
}

/**
 * Le voyageur a-t-il pris le kit linge ? Seulement pour une réservation directe, où le kit est
 * une option du tunnel Beds24. Lu dans les lignes de facture **par leur libellé**, jamais par le
 * rang de l'upsell (le-dahu : il dépend de l'ordre dans l'interface).
 */
export async function kitLingePris(id: number): Promise<boolean> {
  const { data = [] } = await client.get<{ data: Beds24Booking[] }>("/bookings", {
    params: { id: String(id), includeInvoiceItems: "true" },
    route: "lecture",
    fresh: true,
  });
  // Montant positif exigé (le-dahu) : une ligne de remise sur le kit ne doit pas faire croire
  // qu'il est pris — le message promettrait du linge qui ne sera pas là.
  return (data[0]?.invoiceItems ?? []).some((l) => {
    const total = Number(l.lineTotal ?? Number(l.amount ?? 0) * Number(l.qty ?? 1));
    return l.type !== "payment" && /linge|linen|kit/i.test(l.description ?? "") && Number(l.qty ?? 0) > 0 && total > 0;
  });
}

/** Crédits Beds24 restants, lus sur la dernière réponse (indicatif). */
export function creditsBeds24(): number | undefined {
  return client.quota()?.remaining;
}

function proprieteServeur(): string {
  const id = process.env.BEDS24_PROPERTY_ID;
  if (!id) throw new Error("BEDS24_PROPERTY_ID n'est pas défini");
  return id;
}
