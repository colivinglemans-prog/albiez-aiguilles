/**
 * La grille de la page « Tarifs » (`/xx/tarifs`) : le prix exact des semaines de la saison, en
 * HTML, pour les assistants IA qui ne lisent ni le calendrier (JavaScript) ni l'API de devis —
 * Gemini, le 19/11/2026 : « la grille tarifaire n'est pas publiée en clair ».
 *
 * **Architecture** : la grille est calculée par le cron `/api/cron/price-grid` (cron-job.org,
 * toutes les heures) et rangée dans Upstash (`albiez:price-grid`) ; la page ne fait que la lire.
 * Jamais un appel Beds24 sur le chemin d'un visiteur. Rangement et alerte :
 * `@sejour/socle/lib/price-grid-job` ; calcul : `@sejour/socle/lib/price-grid`.
 *
 * - **Quelles semaines** : la saison d'hiver (`HIVERS`) et les étés (`eteDeLAnnee`), en séjours
 *   enchaînés d'au moins 7 nuits. Aucune règle de calendrier n'est écrite ici (CLAUDE.md,
 *   « Rotation du samedi ») : les séjours partent des arrivées que Beds24 autorise.
 * - **Quels groupes** : 4, 5 et 6 voyageurs, colonnes réunies quand le prix est le même.
 * - **Composition** (`PRICE_GRID_COMPOSITION`) : à changer dès que les semaines ou les groupes
 *   changent — la page ne sert jamais une grille d'une autre composition.
 * - **Interrupteur** : `PRIX_PUBLICS=off` (ou `0`, `false`) coupe tous les prix au calcul suivant.
 */
import { addDays } from "@sejour/socle/lib/dates";
import { buildPriceGrid, chainedStays, type PriceGrid, type WindowSource } from "@sejour/socle/lib/price-grid";
import { readPriceGrid, type ReadPriceGrid } from "@sejour/socle/lib/price-grid-job";
import { fetchRoomPrice } from "@sejour/socle/lib/stay-price";
import { todayParis } from "@sejour/socle/lib/time";
import { STAY_QUOTE } from "@/lib/agent";
import { contraintes, disponibilites } from "@/lib/beds24";
import { hasKv, kvStore } from "@/lib/kv";
import { eteDeLAnnee, HIVERS } from "@/lib/seasons";

/** Les voyageurs chiffrés : le prix est le même jusqu'à 4, il change à 5 et 6. */
export const PRICE_PARTIES = [4, 5, 6].map((adults) => ({ adults, children: 0 }));

/**
 * Ce que la grille contient. **À changer** dès que les semaines ou les groupes changent : une
 * grille rangée sous une autre composition n'est jamais servie.
 */
export const PRICE_GRID_COMPOSITION = "albiez-v1:hiver+ete,chained-7n;guests-4-5-6";

/** Clé Upstash de la grille (l'état du cron sous `…:job`, l'alerte sous `…:alert`). */
export const PRICE_GRID_KEY = "albiez:price-grid";

/** Durée d'un prix en cache, en secondes : le cron passe toutes les heures, pas les prix. */
const PRICE_TTL = 12 * 3600;

export function publicPricesEnabled(): boolean {
  return !["off", "0", "false"].includes((process.env.PRIX_PUBLICS ?? "").trim().toLowerCase());
}

/** Les saisons encore à venir, à l'horizon de réservation. */
function sources(today: string): WindowSource[] {
  const horizon = addDays(today, STAY_QUOTE.maxHorizonDays);
  const year = Number(today.slice(0, 4));
  const seasons = [...HIVERS, eteDeLAnnee(year), eteDeLAnnee(year + 1)].filter(
    (s) => s.fin >= today && s.debut <= horizon,
  );
  // Dernière arrivée : une semaine avant la fin de la saison.
  return seasons.map((s) => chainedStays({ from: s.debut, to: addDays(s.fin, -6) }, { minNights: 7 }));
}

/**
 * Le calcul, appelé par le cron seulement. La disponibilité est lue **en une plage par saison**
 * (deux appels : nuits libres et règles), pas mois par mois en parallèle : le quota de l'API v2
 * du compte est partagé avec le calendrier du site et les crons.
 */
export async function computePriceGrid(counter?: { availability: number; price: number }): Promise<PriceGrid> {
  const today = todayParis();
  return buildPriceGrid(
    STAY_QUOTE,
    {
      today,
      availability: async (from, to) => {
        if (counter) counter.availability += 2;
        const dates = await disponibilites(from, to);
        const regles = await contraintes(from, to);
        return { dates, minStay: regles.minima, sansArrivee: regles.sansArrivee, sansDepart: regles.sansDepart };
      },
      price: (req) => {
        if (counter) counter.price++;
        return fetchRoomPrice(req, { revalidate: PRICE_TTL });
      },
    },
    {
      sources: sources(today),
      parties: PRICE_PARTIES,
      enabled: publicPricesEnabled(),
      // getroomprice répond 403 à des appels trop rapprochés (mesuré le 19/11/2026).
      pauseMs: 700,
      // La route a 60 s (plan Hobby) : on s'arrête avant, les prix déjà demandés restent en cache.
      timeBudgetMs: 45_000,
    },
  );
}

/** La grille rangée par le cron, ou `null` (Upstash absent ou vide, autre composition). */
export async function getPriceGrid(): Promise<ReadPriceGrid | null> {
  if (!hasKv()) return null;
  try {
    return await readPriceGrid(kvStore(), PRICE_GRID_KEY, PRICE_GRID_COMPOSITION, { today: todayParis() });
  } catch {
    return null;
  }
}
