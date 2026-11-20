import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { destinationApresConnexion } from "@/lib/retour-connexion";

/**
 * Durcissements du 2026-11-20 : `?retour=` de la page de connexion, et `/api/disponibilites`
 * (lecture mensuelle, horizon, cache). Beds24 est simulé : aucun appel réseau.
 */
const appels: { du: string; au: string }[] = [];

vi.mock("@/lib/beds24", () => ({
  disponibilites: vi.fn(async (du: string, au: string) => {
    appels.push({ du, au });
    const out: Record<string, boolean> = {};
    for (let d = new Date(`${du}T12:00:00Z`); d.toISOString().slice(0, 10) <= au; d.setUTCDate(d.getUTCDate() + 1)) {
      out[d.toISOString().slice(0, 10)] = true;
    }
    return out;
  }),
  contraintes: vi.fn(async (du: string) => ({ minima: { [du]: 2 }, sansArrivee: [du], sansDepart: [] })),
}));

beforeEach(() => {
  appels.length = 0;
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-20T10:00:00Z"));
});
afterEach(() => {
  vi.useRealTimers();
});

describe("destinationApresConnexion", () => {
  it.each([
    ["/dashboard", "/dashboard"],
    ["/dashboard/calendrier", "/dashboard/calendrier"],
    ["/dashboard/referencement/bing", "/dashboard/referencement/bing"],
  ])("garde le chemin interne %s", (retour, attendu) => {
    expect(destinationApresConnexion(retour)).toBe(attendu);
  });

  it.each([
    null,
    "",
    "https://autre-site.test/dashboard",
    "//autre-site.test/dashboard",
    "/\autre-site.test",
    "javascript:alert(1)",
    "/dashboardx",
    "/blog",
    "/dashboard/calendrier?x=https://autre-site.test",
    "/dashboard/../blog",
  ])("refuse %s", (retour) => {
    expect(destinationApresConnexion(retour)).toBe("/dashboard");
  });
});

const get = (path: string) => new NextRequest(`https://www.example.test${path}`);

describe("/api/disponibilites", () => {
  it("lit par mois entiers, garde la forme de la réponse et pose le Cache-Control", async () => {
    const { GET } = await import("@/app/api/disponibilites/route");
    const res = await GET(get("/api/disponibilites?du=2026-12-10&au=2027-01-05"));
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("public, s-maxage=60, stale-while-revalidate=60");
    const json = await res.json();
    expect(Object.keys(json).sort()).toEqual(["dates", "minStay", "sansArrivee", "sansDepart"]);
    expect(Object.keys(json.dates)[0]).toBe("2026-12-10");
    expect(Object.keys(json.dates).at(-1)).toBe("2027-01-05");
    // Jours fermés hors fenêtre (le 1er décembre) retirés, ceux de la fenêtre gardés.
    expect(json.sansArrivee).toEqual(["2027-01-01"]);
    expect(appels).toEqual([
      { du: "2026-12-01", au: "2026-12-31" },
      { du: "2027-01-01", au: "2027-01-31" },
    ]);
  });

  it("ramène les bornes dans [aujourd'hui − 31 j, aujourd'hui + 400 j]", async () => {
    const { GET } = await import("@/app/api/disponibilites/route");
    const json = await (await GET(get("/api/disponibilites?du=2026-01-01&au=2026-11-30"))).json();
    expect(Object.keys(json.dates)[0]).toBe("2026-10-20");
    const tard = await (await GET(get("/api/disponibilites?du=2027-12-01&au=2028-03-01"))).json();
    expect(Object.keys(tard.dates).at(-1)).toBe("2027-12-25");
    appels.length = 0;
    const loin = await (await GET(get("/api/disponibilites?du=2028-06-01&au=2028-06-30"))).json();
    expect(loin).toEqual({ dates: {}, minStay: {}, sansArrivee: [], sansDepart: [] });
    expect(appels).toHaveLength(0);
  });

  it("refuse toujours les paramètres invalides", async () => {
    const { GET } = await import("@/app/api/disponibilites/route");
    expect((await GET(get("/api/disponibilites?du=2027-01-10&au=2027-01-01"))).status).toBe(400);
    expect((await GET(get("/api/disponibilites?du=hier&au=2027-01-01"))).status).toBe(400);
  });
});
