import type { Sejour } from "@/lib/dashboard-types";
import { normaliserCanal } from "@/lib/canal";

/**
 * Client Beds24 v2 pour Albiez.
 *
 * Différence avec Barbusse, qui utilise un long life token en lecture : le compte de la SCI
 * n'a qu'un **refresh token**, échangé contre un access token de 24 h. C'est d'ailleurs la
 * bonne forme — un long life token Beds24 ne porte que des scopes de lecture, et celui de
 * Barbusse a fini par être refusé en local.
 */
const API = "https://api.beds24.com/v2";

/** Statuts qui ne sont pas du chiffre d'affaires : blocages propriétaire et annulations. */
const STATUTS_EXCLUS = new Set(["cancelled", "black"]);

let accesEnCache: { token: string; expireLe: number } | null = null;

async function accessToken(): Promise<string> {
  const refreshToken = process.env.BEDS24_REFRESH_TOKEN;
  if (!refreshToken) throw new Error("BEDS24_REFRESH_TOKEN n'est pas défini");

  // Marge d'une minute : un token qui expire pendant la requête coûte un 401 inexplicable.
  if (accesEnCache && accesEnCache.expireLe > Date.now() + 60_000) return accesEnCache.token;

  const res = await fetch(`${API}/authentication/token`, {
    headers: { refreshToken },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Beds24 authentication/token ${res.status} : ${(await res.text()).slice(0, 200)}`);
  }
  const { token, expiresIn } = (await res.json()) as { token: string; expiresIn: number };
  accesEnCache = { token, expireLe: Date.now() + expiresIn * 1000 };
  return token;
}

async function appeler<T>(
  chemin: string,
  params: Record<string, string> = {},
  frais = false,
): Promise<T> {
  const token = await accessToken();
  const url = new URL(API + chemin);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, {
    headers: { token },
    // 60 s par défaut : le dashboard n'a pas besoin de la seconde près, et ça évite de
    // tapisser l'API à chaque changement de période.
    //
    // `frais` court-circuite ce cache là où l'on vient d'écrire. Sans lui, une consigne de
    // ménage enregistrée restait invisible pendant une minute — et la personne du ménage,
    // qui rafraîchit sa page, voyait l'ancienne version sans comprendre pourquoi.
    ...(frais ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
  });
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
      };
    });
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
    // le cache pour que l'appel suivant en redemande un.
    if (res.status === 401) accesEnCache = null;
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
