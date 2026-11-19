/**
 * La grille de la page « Tarifs » (`/xx/tarifs`) : le prix exact des semaines de la saison, en
 * HTML, pour les assistants IA qui ne lisent ni le calendrier (JavaScript) ni l'API de devis —
 * Gemini, le 19/11/2026 : « la grille tarifaire n'est pas publiée en clair ». Le calcul est celui
 * du socle (`@sejour/socle/lib/price-grid`) ; ce fichier ne garde que ce qui est propre à Albiez.
 *
 * - **Quelles semaines** : la saison d'hiver (`HIVERS`) et l'été (`eteDeLAnnee`), en séjours
 *   enchaînés d'au moins 7 nuits. Aucune règle de calendrier n'est écrite ici (voir CLAUDE.md,
 *   « Rotation du samedi ») : les séjours partent des arrivées que Beds24 autorise.
 * - **Quels groupes** : 4, 5 et 6 voyageurs, colonnes réunies quand le prix est le même.
 * - **Cache** : une seule grille pour les cinq langues, recalculée au plus une fois par heure ;
 *   chaque prix est gardé 12 h (`fetchRoomPrice`). Une grille dégradée (Beds24 en panne) n'est
 *   pas mise en cache : la page affiche alors le renvoi au calendrier.
 * - **Interrupteur** : `PRIX_PUBLICS=off` coupe tous les prix (Beds24 bloquerait l'endpoint de
 *   prix public) ; la disponibilité reste affichée.
 */
import { unstable_cache } from "next/cache";
import { addDays } from "@sejour/socle/lib/dates";
import { buildPriceGrid, chainedStays, type PriceGrid, type WindowSource } from "@sejour/socle/lib/price-grid";
import { fetchRoomPrice } from "@sejour/socle/lib/stay-price";
import { STAY_QUOTE, stayAgentDeps } from "@/lib/agent";
import { eteDeLAnnee, HIVERS } from "@/lib/seasons";

/** Les voyageurs chiffrés : le prix est le même jusqu'à 4, il peut changer à 5 et 6. */
export const PRICE_PARTIES = [4, 5, 6].map((adults) => ({ adults, children: 0 }));

/** Durée d'un prix en cache, en secondes : la grille se recalcule toutes les heures, pas les prix. */
const PRICE_TTL = 12 * 3600;

export function publicPricesEnabled(): boolean {
  return (process.env.PRIX_PUBLICS ?? "").trim().toLowerCase() !== "off";
}

/** Les saisons encore à venir, à l'horizon de réservation. */
function sources(today: string): WindowSource[] {
  const horizon = addDays(today, STAY_QUOTE.maxHorizonDays);
  const year = Number(today.slice(0, 4));
  const seasons = [...HIVERS, eteDeLAnnee(year), eteDeLAnnee(year + 1)].filter(
    (s) => s.fin >= today && s.debut <= horizon,
  );
  return seasons.map((s) =>
    // Dernière arrivée : une semaine avant la fin de la saison.
    chainedStays({ from: s.debut, to: addDays(s.fin, -6) }, { minNights: 7 }),
  );
}

async function compute(enabled: boolean): Promise<PriceGrid> {
  const deps = stayAgentDeps();
  return buildPriceGrid(
    STAY_QUOTE,
    { ...deps, price: (req) => fetchRoomPrice(req, { revalidate: PRICE_TTL }) },
    {
      sources: sources(deps.today),
      parties: PRICE_PARTIES,
      enabled,
      mergeEqualColumns: true,
      // getroomprice répond 403 à des appels trop rapprochés (mesuré le 19/11/2026).
      pauseMs: 700,
    },
  );
}

/** La grille, ou `null` si Beds24 ne répond pas (aucun prix inventé, renvoi au calendrier). */
export async function getPriceGrid(): Promise<PriceGrid | null> {
  // L'état de l'interrupteur entre dans la clé : le cache de données survit aux déploiements, et
  // couper les prix ne doit pas attendre l'expiration d'une grille chiffrée.
  const enabled = publicPricesEnabled();
  const cached = unstable_cache(() => compute(enabled), ["albiez-price-grid-v1", enabled ? "on" : "off"], {
    revalidate: 3600,
    tags: ["price-grid"],
  });
  try {
    return await cached();
  } catch (e) {
    console.error("Grille de prix :", e instanceof Error ? e.message : e);
    return null;
  }
}
