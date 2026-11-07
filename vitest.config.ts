import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Tests unitaires : rapides, sans réseau, lancés par la CI à chaque push (`npm test`).
 *
 * Les contrôles post-déploiement (`tests/deploy/**`) sont **exclus** : ils interrogent la
 * production et ont leur propre configuration, `vitest.deploy.config.ts`.
 */
export default defineConfig({
  resolve: {
    // Même alias que tsconfig.json (`@/*` → racine). Une regex, pour ne pas capturer `@sejour/…`.
    alias: [{ find: /^@\//, replacement: fileURLToPath(new URL("./", import.meta.url)) }],
  },
  test: {
    environment: "node",
    // Le socle est publié en TypeScript brut (exports `./lib/*.ts`) : vitest doit le transformer.
    server: { deps: { inline: ["@sejour/socle"] } },
    include: ["tests/**/*.test.ts"],
    exclude: ["tests/deploy/**", "node_modules/**"],
  },
});
