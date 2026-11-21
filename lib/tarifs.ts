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
import { unstable_cache } from "next/cache";
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
export const PRICE_GRID_COMPOSITION = "albiez-v2:hiver+ete,chained-7n,reserves;guests-4-5-6";

/** Clé Upstash de la grille (l'état du cron sous `…:job`, l'alerte sous `…:alert`). */
export const PRICE_GRID_KEY = "albiez:price-grid";


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
export async function computePriceGrid(
  counter?: { availability: number; price: number },
  previous: PriceGrid | null = null,
): Promise<PriceGrid> {
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
        // Sans cache (socle v3.37.0) : la fraîcheur vient de l'âge de chaque cellule, renouvelée
        // la plus vieille d'abord — plus du cache de Next (stale-while-revalidate : prix de la veille).
        return fetchRoomPrice(req);
      },
    },
    {
      sources: sources(today),
      parties: PRICE_PARTIES,
      enabled: publicPricesEnabled(),
      // getroomprice répond 403 aux rafales (19/11/2026) ; 30 appels sur 30 acceptés à 250 ms
      // (20/11/2026). Chaque appel part chez Beds24 : environ 25 prix par passage de 18 s.
      pauseMs: 400,
      // cron-job.org coupe la requête à 30 s par défaut (la route en a 60) : on s'arrête à ~18 s
      // (22 s jusqu'au 21/11/2026 : passages mesurés à 24-26 s avec la lecture des dispos).
      // Renouvellement par âge : les cellules jamais demandées d'abord, puis les plus vieilles ; la
      // grille de travail est rangée à chaque passage (`price-grid-job`, `incremental`).
      timeBudgetMs: 18_000,
      previous,
    },
  );
}

/** Au-delà, une grille rangée n'est plus servie du tout (le cron est arrêté depuis trop longtemps). */
const MAX_AGE_MS = 7 * 24 * 3_600_000;

/**
 * Lecture mise en cache 5 min (`unstable_cache`, tag `price-grid`) : le client Upstash lit en
 * `no-store`, ce qui rendrait la page dynamique à chaque visite ; enveloppée, elle reste en ISR.
 * Aucun `try/catch` ici : `readPriceGrid` ne lève jamais (magasin illisible → `null`), et une
 * erreur de rendu dynamique de Next ne doit pas être avalée.
 */
const readStored = unstable_cache(
  async (composition: string): Promise<ReadPriceGrid | null> =>
    hasKv() ? readPriceGrid(kvStore(), PRICE_GRID_KEY, composition, { today: todayParis() }) : null,
  ["price-grid-read"],
  { revalidate: 300, tags: ["price-grid"] },
);

/**
 * La grille rangée par le cron, ou `null` : Upstash absent ou vide, autre composition, prix publics
 * coupés (`PRIX_PUBLICS`, vérifié aussi à la lecture : couper ne doit pas attendre le calcul
 * suivant), ou grille de plus de 7 jours.
 */
export async function getPriceGrid(): Promise<ReadPriceGrid | null> {
  if (!publicPricesEnabled()) return null;
  const read = await readStored(PRICE_GRID_COMPOSITION);
  if (!read || Date.now() - Date.parse(read.grid.generatedAt) > MAX_AGE_MS) return null;
  return read;
}
