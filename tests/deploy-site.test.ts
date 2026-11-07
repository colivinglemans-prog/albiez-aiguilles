/**
 * Tests hors réseau de la configuration de surveillance (`tests/deploy/site.ts`) et des
 * contrôles propres à Albiez. Lancés par `npm test` et la CI ; aucun appel au site.
 */
import { describe, expect, it } from "vitest";
import type { Periode } from "@sejour/socle/lib/periodes";
import { HIVERS } from "@/lib/seasons";
import { CANCELLATION_POLICY } from "@/lib/property";
import site from "./deploy/site";
import { primaryDeclarations, upcomingWinterHolidayBlocks } from "./deploy/albiez-checks";

const hiver = { saison: "hiver" as const, debut: "2026-12-19", fin: "2027-03-21", confirme: true };
const p = (nom: string, debut: string, fin: string, type: Periode["type"] = "vacances"): Periode => ({
  nom,
  zone: "Zone A",
  debut,
  fin,
  type,
});
const periodes: Periode[] = [
  p("Semaine de Noël", "2026-12-19", "2026-12-25", "fete"),
  p("Vacances de Noël", "2026-12-19", "2027-01-03"),
  p("Vacances d'Hiver", "2027-02-06", "2027-02-21"),
  p("Vacances d'Hiver", "2027-02-20", "2027-03-07"),
  p("Vacances de Printemps", "2027-04-03", "2027-04-18"),
];

describe("upcomingWinterHolidayBlocks", () => {
  it("fusionne les zones et ignore le printemps", () => {
    expect(upcomingWinterHolidayBlocks("2026-11-07", [hiver], periodes)).toEqual([
      { from: "2026-12-19", to: "2027-01-03" },
      { from: "2027-02-06", to: "2027-03-07" },
    ]);
  });

  it("rogne au lendemain et écarte une plage dont il reste moins d'une semaine", () => {
    expect(upcomingWinterHolidayBlocks("2026-12-30", [hiver], periodes)).toEqual([
      { from: "2027-02-06", to: "2027-03-07" },
    ]);
  });

  it("ne rend rien sans saison d'hiver déclarée à venir", () => {
    expect(upcomingWinterHolidayBlocks("2027-04-01", [hiver], periodes)).toEqual([]);
  });

  it("trouve l'hiver à venir dans les vraies données", () => {
    const fin = HIVERS[HIVERS.length - 1].fin;
    const today = "2026-11-07";
    if (fin > today) expect(upcomingWinterHolidayBlocks(today, HIVERS).length).toBeGreaterThan(0);
  });
});

describe("primaryDeclarations", () => {
  it("lit la couleur primaire dans une feuille minifiée", () => {
    expect(primaryDeclarations(":root{--site-background:#fff;--site-primary:#1B4965;--x:1}")).toEqual(["#1b4965"]);
  });
});

describe("site.ts", () => {
  it("n'impose pas de Disallow sur /api entier", () => {
    expect(site.robots.mustDisallow).not.toContain("/api");
    expect(site.robots.mustDisallow).toContain("/dashboard");
  });

  it("contrôle au moins une route de cron", () => {
    expect(site.security.cronRoutes.length).toBeGreaterThan(0);
  });

  it("déclare des paliers d'annulation du plus au moins favorable", () => {
    const days = CANCELLATION_POLICY.tiers.map((t) => t.minDaysBefore);
    expect([...days].sort((a, b) => b - a)).toEqual(days);
  });

  it("traduit les slugs de saison dans les pages clés", () => {
    const pages = typeof site.keyPages === "function" ? site.keyPages("es") : site.keyPages;
    expect(pages).toContain("/esqui");
  });
});
