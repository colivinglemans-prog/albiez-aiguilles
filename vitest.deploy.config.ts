import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Contrôles post-déploiement et surveillance (`npm run test:deploy`).
 *
 * Interroge un site **déployé** (production par défaut, ou `DEPLOY_BASE_URL`), en lecture
 * seule. Variables lues par l'adaptateur du socle (`testing/deploy/vitest-suite.ts`) :
 * `DEPLOY_BASE_URL`, `DEPLOY_LEVEL` (`vital` | `full`), `DEPLOY_ONLY`, `DEPLOY_REPORT`, et les
 * secrets facultatifs `BEDS24_MONITOR_TOKEN`, `DEPLOY_VIEWER_PASSWORD`,
 * `VERCEL_AUTOMATION_BYPASS_SECRET`. Un secret absent donne `skip`, jamais un vert.
 *
 * Fuseau forcé à Paris : le runner GitHub est en UTC, et une date de calendrier se lit à Paris.
 */
process.env.TZ = "Europe/Paris";

export default defineConfig({
  resolve: {
    // Même alias que tsconfig.json (`@/*` → racine). Une regex, pour ne pas capturer `@sejour/…`.
    alias: [{ find: /^@\//, replacement: fileURLToPath(new URL("./", import.meta.url)) }],
  },
  test: {
    environment: "node",
    // Le socle est publié en TypeScript brut (exports `./lib/*.ts`) : vitest doit le transformer.
    server: { deps: { inline: ["@sejour/socle"] } },
    include: ["tests/deploy/**/*.test.ts"],
    // Le moteur met lui-même ses délais (relance à 65 s du contrôle Beds24 comprise).
    testTimeout: 15 * 60_000,
    hookTimeout: 15 * 60_000,
  },
});
