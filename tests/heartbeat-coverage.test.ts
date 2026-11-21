import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EXPECTED_CRONS } from "@/lib/heartbeat";

/**
 * Chaque route de `app/api/cron/` bat (`beat("<nom>",`), figure dans `EXPECTED_CRONS` et déclare
 * un `maxDuration` : un cron ajouté sans battement serait un cron dont l'arrêt passe inaperçu.
 */
const dir = join(process.cwd(), "app/api/cron");
const routes = readdirSync(dir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

describe("couverture du battement de cœur", () => {
  it("trouve les routes cron", () => {
    expect(routes.length).toBeGreaterThanOrEqual(5);
  });

  for (const name of routes) {
    it(name, () => {
      const src = readFileSync(join(dir, name, "route.ts"), "utf8");
      expect(EXPECTED_CRONS.map((c) => c.name), "absent d'EXPECTED_CRONS").toContain(name);
      expect(src, "aucun beat()").toContain(`beat("${name}",`);
      expect(src, "aucun maxDuration").toMatch(/export const maxDuration = \d+/);
    });
  }

  it("aucun cron attendu sans route", () => {
    for (const { name } of EXPECTED_CRONS) expect(routes).toContain(name);
  });
});
