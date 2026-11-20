import { NextRequest, NextResponse } from "next/server";
import { verifyCronAuth } from "@sejour/socle/lib/cron-auth";
import { sendNtfy } from "@sejour/socle/lib/ntfy";
import { runPriceGridJob } from "@sejour/socle/lib/price-grid-job";
import { emptyStore, hasKv, kvStore } from "@/lib/kv";
import { computePriceGrid, PRICE_GRID_COMPOSITION, PRICE_GRID_KEY } from "@/lib/tarifs";

/**
 * Calcul de la grille de la page « Tarifs », **toutes les heures** par cron-job.org, avec
 * l'en-tête `Authorization: Bearer $CRON_SECRET`. Elle est rangée dans Upstash
 * (`albiez:price-grid`) ; la page ne fait que la lire. Un échec garde la grille précédente,
 * suspend les essais 15 min et alerte au 2e relevé KO (`@sejour/socle/lib/price-grid-job`).
 *
 * `?dry=1` : calcule et rend la grille et le nombre d'appels Beds24, sans rien écrire ni alerter.
 * Après un déploiement qui change la composition, appeler la route une fois à la main.
 */
export const dynamic = "force-dynamic";
// Plafond du plan Hobby. Le calcul s'arrête à ~22 s (`timeBudgetMs`, cron-job.org coupe à 30 s) :
// à cache de prix vide, la grille n'est rangée qu'au 2e ou 3e passage, qui reprend les prix en cache.
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ erreur: "Non autorisé" }, { status: 401 });
  }
  const dry = request.nextUrl.searchParams.get("dry") === "1";
  if (!hasKv() && !dry) {
    return NextResponse.json(
      { success: false, error: "Upstash non branché (KV_REST_API_URL / KV_REST_API_TOKEN)." },
      { status: 503 },
    );
  }
  const calls = { availability: 0, price: 0 };
  try {
    const report = await runPriceGridJob(
      { key: PRICE_GRID_KEY, composition: PRICE_GRID_COMPOSITION },
      {
        store: hasKv() ? kvStore() : emptyStore(),
        build: () => computePriceGrid(calls),
        dry,
        notify: (n) => sendNtfy(n.body, { title: `Tarifs Albiez — ${n.title}`, priority: n.priority, tags: ["moneybag", "warning"] }),
      },
    );
    const grid = report.grid;
    return NextResponse.json({
      success: report.outcome !== "failed",
      outcome: report.outcome,
      stalled: report.stalled,
      reason: report.reason,
      alert: report.alert,
      calls,
      ...(grid ? { rows: grid.rows.length, columns: grid.columns.length, pricesShown: grid.pricesShown } : {}),
      ...(dry && grid ? { grid } : {}),
    });
  } catch (e) {
    console.error("[price-grid]", e instanceof Error ? e.message : String(e));
    return NextResponse.json({ success: false, error: "Calcul de la grille momentanément impossible." }, { status: 500 });
  }
}
