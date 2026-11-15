import { NextRequest, NextResponse } from "next/server";
import { verifyCronAuth } from "@sejour/socle/lib/cron-auth";
import { runIndexing, type IndexingConfig } from "@sejour/socle/lib/indexing";
import { sendNtfy } from "@sejour/socle/lib/ntfy";
import { emptyStore, hasKv, kvStore } from "@/lib/kv";

/**
 * Indexation automatique, une fois par jour (cron-job.org, 06:30 heure de Paris, en-tête
 * `Authorization: Bearer $CRON_SECRET`) : les pages **nouvelles ou modifiées** du sitemap, et
 * `/llms.txt` quand son contenu change, vont à IndexNow (Bing, Yandex…) et à l'API Bing
 * (`SubmitUrlBatch`, ~100 URL/jour), puis le reliquat jamais soumis à Bing dans le quota
 * restant. Jamais une page inchangée. Toute la logique est dans `@sejour/socle/lib/indexing`
 * (v3.24.0) ; ne restent ici que les réglages du site.
 *
 * État dans Upstash (`lib/kv.ts`) sous `albiez:indexing:state` (l'alerte sous `…:alert`).
 * Amorçage : les 98 URL soumises à la main le 14/11/2026 sont réputées déjà soumises à Bing.
 * **Sans Upstash branché**, la route refuse (503) : sans mémoire, elle renverrait chaque jour
 * le même reliquat. `?dry=1` marche quand même (plan calculé depuis l'amorçage, rien d'envoyé).
 *
 * La route n'est pas couverte par le matcher de `proxy.ts` : sa protection est ce seul secret.
 * Remplace le `npm run indexnow` manuel après déploiement (le script reste pour l'usage manuel).
 */
export const maxDuration = 60;

const CONFIG: IndexingConfig = {
  siteUrl: "https://www.albiez-aiguilles.fr",
  bingSiteUrl: "https://albiez-aiguilles.fr/",
  indexNowKey: "665c5a478fa47b3dbc1e2c94bfa76e22",
  extraPaths: ["/llms.txt"],
  primaryLocale: "fr",
  bingAlreadySubmitted: 98,
  stateKey: "albiez:indexing:state",
};

export async function GET(request: NextRequest) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ erreur: "Non autorisé" }, { status: 401 });
  }
  const dry = request.nextUrl.searchParams.get("dry") === "1";
  if (!hasKv() && !dry) {
    return NextResponse.json(
      { success: false, error: "Upstash non branché (KV_REST_API_URL / KV_REST_API_TOKEN) : aucun envoi sans mémoire." },
      { status: 503 },
    );
  }
  try {
    const report = await runIndexing(CONFIG, {
      store: hasKv() ? kvStore() : emptyStore(),
      bingApiKey: process.env.BING_WEBMASTER_API_KEY?.trim() || undefined,
      dry,
      notify: (n) =>
        sendNtfy(n.body, { title: `Indexation Albiez — ${n.title}`, priority: n.priority, tags: ["mag", "warning"] }),
    });
    return NextResponse.json({ success: true, ...report });
  } catch (e) {
    // Les erreurs du socle ne portent jamais la clé Bing ; on ne renvoie que leur message.
    const message = e instanceof Error ? e.message : String(e);
    console.error("Indexation :", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
