import type { Sejour } from "@/lib/dashboard-types";
import { normaliserCanal } from "@/lib/canal";

/**
 * Client Beds24 v2 pour Albiez.
 *
 * **Deux tokens, deux privilèges**, comme chez Barbusse :
 *
 * - `BEDS24_REFRESH_TOKEN` — échangé contre un access token de 24 h, il porte
 *   `write:bookings`. Sert au dashboard et à l'écriture des consignes de ménage.
 * - `BEDS24_PUBLIC_REFRESH_TOKEN` — refresh token en **lecture seule**, utilisé uniquement
 *   par les deux lectures servies au public (`disponibilites`, `sejourMinimum`).
 *
 * Le second n'est pas un long life token, bien que ceux-là ne puissent techniquement porter
 * que des scopes de lecture : ils expirent au bout de 90 jours **fermes**. Un refresh token
 * expire lui aussi — 30 jours — mais l'échéance **glisse à chaque usage** (visible dans
 * Beds24 → Settings → API : le token d'écriture, créé le 28/08 à 15:50, expirait le 30/09 à
 * 19:58, l'heure de son dernier appel). Un token que le site interroge en continu ne s'éteint
 * donc jamais, là où le long life token aurait imposé un renouvellement manuel en pleine
 * saison. Le privilège reste restreint par les scopes de l'invite code, pas par la nature du
 * token.
 */
const API = "https://api.beds24.com/v2";

/** Statuts qui ne sont pas du chiffre d'affaires : blocages propriétaire et annulations. */
const STATUTS_EXCLUS = new Set(["cancelled", "black"]);

/**
 * Access tokens de 24 h, en cache par refresh token.
 *
 * Les deux voies — écriture et publique — partagent le même mécanisme d'échange : les
 * dupliquer aurait laissé deux caches à maintenir, et la marge d'expiration à corriger
 * deux fois le jour où elle s'avère mal choisie.
 */
const accesEnCache = new Map<string, { token: string; expireLe: number }>();

async function echanger(refreshToken: string, usage: string): Promise<string> {
  // Marge d'une minute : un token qui expire pendant la requête coûte un 401 inexplicable.
  const cache = accesEnCache.get(refreshToken);
  if (cache && cache.expireLe > Date.now() + 60_000) return cache.token;

  const res = await fetch(`${API}/authentication/token`, {
    headers: { refreshToken },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `Beds24 authentication/token ${res.status} (${usage}) : ${(await res.text()).slice(0, 200)}`,
    );
  }
  const { token, expiresIn } = (await res.json()) as { token: string; expiresIn: number };
  accesEnCache.set(refreshToken, { token, expireLe: Date.now() + expiresIn * 1000 });
  return token;
}

/** Token d'écriture — dashboard, consignes de ménage. Porte `write:bookings`. */
async function accessToken(): Promise<string> {
  const rt = process.env.BEDS24_REFRESH_TOKEN;
  if (!rt) throw new Error("BEDS24_REFRESH_TOKEN n'est pas défini");
  return echanger(rt, "écriture");
}

/**
 * Token des lectures servies au **public**.
 *
 * `BEDS24_PUBLIC_REFRESH_TOKEN` est un refresh token dont l'invite code ne demandait que
 * `read:inventory` et `read:properties` — `deviceName: albiez-site-public`, créé le
 * 2026-08-31 via `scripts/beds24-setup.mjs`.
 *
 * Un refresh token et non un long life token, alors que ce dernier ne peut *techniquement*
 * porter que des scopes de lecture : le long life expire au bout de **90 jours**, et une
 * échéance manuelle sur le chemin qui encaisse les réservations est une dette. Ce sont les
 * scopes de l'invite code qui restreignent le privilège, pas la nature du token.
 *
 * Sans la variable, on retombe sur le token d'écriture pour ne pas bloquer le développement
 * local — mais la production doit l'avoir.
 */
async function tokenPublic(): Promise<string> {
  const rt = process.env.BEDS24_PUBLIC_REFRESH_TOKEN;
  if (rt && rt.trim()) return echanger(rt.trim(), "public");
  console.warn(
    "BEDS24_PUBLIC_REFRESH_TOKEN absent : les lectures publiques utilisent le token " +
      "d'écriture. Créer un refresh token en lecture seule avant de déployer.",
  );
  return accessToken();
}

async function appeler<T>(
  chemin: string,
  params: Record<string, string> = {},
  frais = false,
  public_ = false,
): Promise<T> {
  const url = new URL(API + chemin);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  /**
   * Le token public est un **long life token de 90 jours**. Le jour où il expire, la route
   * de disponibilités renverrait 502 et le calendrier du site afficherait un logement
   * indisponible sur toutes les dates — un calendrier muet, sans que rien ne le signale.
   *
   * D'où un repli : sur 401, on refait l'appel avec le token d'écriture. On perd la
   * séparation des privilèges le temps de renouveler, ce qui vaut mieux qu'un tunnel de
   * réservation éteint en pleine saison. L'avertissement dans les logs dit quoi faire.
   */
  const appel = (token: string) => fetch(url, {
    headers: { token },
    // 60 s par défaut : le dashboard n'a pas besoin de la seconde près, et ça évite de
    // tapisser l'API à chaque changement de période.
    //
    // `frais` court-circuite ce cache là où l'on vient d'écrire. Sans lui, une consigne de
    // ménage enregistrée restait invisible pendant une minute — et la personne du ménage,
    // qui rafraîchit sa page, voyait l'ancienne version sans comprendre pourquoi.
    ...(frais ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
  });

  let res = await appel(public_ ? await tokenPublic() : await accessToken());

  if (res.status === 401 && public_ && process.env.BEDS24_PUBLIC_REFRESH_TOKEN) {
    // Un refresh token n'expire pas sur une horloge, mais il peut être révoqué. Le repli
    // évite qu'une révocation éteigne le calendrier de réservation sans prévenir.
    console.error(
      "BEDS24_PUBLIC_REFRESH_TOKEN refusé (401) — révoqué ? Repli sur le token d'écriture. " +
        "En régénérer un dans Beds24 → Settings → Apps & Integrations → API, avec les seuls " +
        "scopes read:inventory et read:properties.",
    );
    res = await appel(await accessToken());
  }

  if (!res.ok) throw new Error(`Beds24 ${chemin} ${res.status} : ${(await res.text()).slice(0, 200)}`);
  return res.json() as Promise<T>;
}

interface BookingBeds24 {
  id: number;
  arrival: string;
  departure: string;
  status?: string;
  price?: number;
  referer?: string;
  channel?: string;
  apiReference?: string;
  bookingTime?: string;
  firstName?: string;
  lastName?: string;
  notes?: string;
  numAdult?: number;
  numChild?: number;
}

const nuitsEntre = (a: string, b: string) =>
  Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);

/**
 * Réservations vivantes, ramenées au type `Sejour`.
 *
 * `apiReference` porte le numéro de réservation du canal — c'est la clé de dédoublonnage
 * avec l'archive. À défaut, on retombe sur l'id Beds24, qui ne collisionnera avec aucune
 * référence de canal.
 *
 * Le `brut` de Beds24 est `price`, dont la sémantique dépend de la configuration du compte.
 * Faute de `invoiceItems` exploitables sur ce compte encore neuf, on prend `price` tel quel
 * pour le brut **et** pour le net : la commission des séjours vivants sera donc nulle, ce
 * qui est faux mais visible, plutôt qu'estimé au doigt mouillé.
 */
export async function sejoursBeds24(params: {
  arriveeDu: string;
  arriveeAu: string;
  /** Ignorer le cache — à utiliser sur les vues où l'on écrit, comme le calendrier. */
  frais?: boolean;
}): Promise<Sejour[]> {
  const { data = [] } = await appeler<{ data: BookingBeds24[] }>(
    "/bookings",
    { arrivalFrom: params.arriveeDu, arrivalTo: params.arriveeAu },
    params.frais,
  );

  return data
    .filter((b) => !STATUTS_EXCLUS.has((b.status ?? "").toLowerCase()))
    .map((b) => {
      const prix = Number(b.price ?? 0);
      return {
        ref: b.apiReference?.trim() || `beds24-${b.id}`,
        canal: normaliserCanal(b.referer, b.channel),
        arrivee: b.arrival,
        depart: b.departure,
        nuits: nuitsEntre(b.arrival, b.departure),
        brut: prix,
        net: prix,
        commission: 0,
        reserveLe: b.bookingTime?.slice(0, 10) ?? null,
        source: "beds24" as const,
        statut: b.status,
        idBeds24: b.id,
        notes: b.notes ?? "",
        // `null` et non `0` quand Beds24 ne renseigne rien : zéro voyageur serait un chiffre,
        // l'absence d'information n'en est pas un.
        voyageurs:
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

  const { data = [] } = await appeler<{ data: { availability: Record<string, boolean> }[] }>(
    "/inventory/rooms/availability",
    { propertyId, startDate: du, endDate: au },
    false,
    true,
  );

  const fusion: Record<string, boolean> = {};
  for (const room of data) {
    for (const [jour, libre] of Object.entries(room.availability ?? {})) {
      fusion[jour] = fusion[jour] === undefined ? libre : fusion[jour] && libre;
    }
  }
  return fusion;
}

/**
 * Séjour minimum par date, tel que **Beyond Pricing** le pousse dans Beds24.
 *
 * Ce n'est pas le `minStay` de la room, qui vaut 1 et ne veut rien dire : la vraie contrainte
 * est portée date par date au calendrier — relevé le 2026-08-29, 2 nuits en général et
 * **6 nuits sur les fêtes de fin d'année**. Le calendrier du site doit la respecter, sinon il
 * laisse sélectionner des séjours que le tunnel de réservation refusera ensuite.
 */
export async function sejourMinimum(du: string, au: string): Promise<Record<string, number>> {
  const propertyId = process.env.BEDS24_PROPERTY_ID;
  if (!propertyId) throw new Error("BEDS24_PROPERTY_ID n'est pas défini");

  const { data = [] } = await appeler<{
    data: { calendar?: { from: string; to: string; minStay?: number }[] }[];
  }>(
    "/inventory/rooms/calendar",
    { propertyId, startDate: du, endDate: au, includeMinStay: "true" },
    false,
    true,
  );

  const minima: Record<string, number> = {};
  for (const room of data) {
    for (const tranche of room.calendar ?? []) {
      if (tranche.minStay == null) continue;
      // Beds24 compacte les jours consécutifs de même valeur en une tranche [from, to].
      for (let j = tranche.from; j <= tranche.to; ) {
        minima[j] = Math.max(minima[j] ?? 0, tranche.minStay);
        const d = new Date(`${j}T00:00:00Z`);
        d.setUTCDate(d.getUTCDate() + 1);
        j = d.toISOString().slice(0, 10);
      }
    }
  }
  return minima;
}

/** Prix au calendrier — ceux que pousse Beyond Pricing. Sert à la projection. */
export async function prixParNuit(params: { du: string; au: string }): Promise<Record<string, number>> {
  const propertyId = process.env.BEDS24_PROPERTY_ID;
  if (!propertyId) return {};
  const { data = [] } = await appeler<{
    data: { calendar?: { from: string; to: string; price1?: number }[] }[];
  }>("/inventory/rooms/calendar", {
    propertyId,
    startDate: params.du,
    endDate: params.au,
    includePrices: "true",
  });

  const prix: Record<string, number> = {};
  for (const room of data) {
    for (const tranche of room.calendar ?? []) {
      if (tranche.price1 == null) continue;
      // Beds24 compacte les jours consécutifs de même prix en une tranche [from, to].
      for (let j = tranche.from; j <= tranche.to; ) {
        prix[j] = tranche.price1;
        const d = new Date(`${j}T00:00:00Z`);
        d.setUTCDate(d.getUTCDate() + 1);
        j = d.toISOString().slice(0, 10);
      }
    }
  }
  return prix;
}

/**
 * Écrit une note interne sur une réservation vivante.
 *
 * Le champ visé est `notes` et non `comments` : le second porte la remarque du voyageur et
 * s'imprime sur les documents envoyés au client. `notes` reste interne.
 *
 * Beds24 v2 répond parfois **200 avec `success: false`** dans le tableau de retour : un
 * refus silencieux qu'il faut lire dans le corps, sinon l'interface affiche « enregistré »
 * alors que rien ne l'a été.
 */
export async function ecrireNotes(id: number, notes: string): Promise<void> {
  const token = await accessToken();
  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify([{ id, notes }]),
    cache: "no-store",
  });
  const corps = await res.text();
  if (!res.ok) {
    // Un 401 signifie que l'access token est mort avant son expiration annoncée : on vide
    // l'entrée du cache pour que l'appel suivant en redemande un. Seule celle du token
    // d'écriture — celle du token public n'a rien à voir avec cet échec.
    if (res.status === 401 && process.env.BEDS24_REFRESH_TOKEN) {
      accesEnCache.delete(process.env.BEDS24_REFRESH_TOKEN);
    }
    throw new Error(`Beds24 ${res.status} : ${corps.slice(0, 300)}`);
  }
  try {
    const parse = JSON.parse(corps) as { success?: boolean; errors?: unknown; error?: unknown }[];
    const premier = Array.isArray(parse) ? parse[0] : null;
    if (premier && premier.success === false) {
      throw new Error(
        `Beds24 a refusé l'écriture : ${JSON.stringify(premier.errors ?? premier.error ?? premier).slice(0, 300)}`,
      );
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("Beds24 a refusé")) throw e;
    // Corps illisible mais statut 200 : format inattendu, pas une erreur d'écriture.
  }
}
