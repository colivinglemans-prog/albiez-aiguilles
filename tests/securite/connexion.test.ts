import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

/**
 * Connexion du dashboard (socle v3.31.0) : la route d'Albiez passe par `createLoginRoute`,
 * avec le champ `motDePasse` et la limite de 5 échecs par adresse. Cookie et ntfy simulés.
 */
const cookies: string[] = [];
const alertes: string[] = [];

vi.mock("@sejour/socle/lib/auth-cookie", () => ({
  setAuthCookie: vi.fn(async (t: string) => {
    cookies.push(t);
  }),
  removeAuthCookie: vi.fn(async () => {}),
}));
vi.mock("@sejour/socle/lib/ntfy", () => ({
  sendNtfy: vi.fn(async (m: string) => {
    alertes.push(m);
  }),
}));

const env = { ...process.env };
beforeAll(() => {
  process.env.DASHBOARD_SECRET = "x".repeat(40);
  process.env.DASHBOARD_PASSWORD = "bon-mot-de-passe";
});
afterAll(() => {
  process.env = env;
});

const essai = (motDePasse: string, ip: string) =>
  new Request("https://www.example.test/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ motDePasse }),
  });

describe("/api/auth/login", () => {
  it("ouvre le rôle admin avec le champ motDePasse", async () => {
    const { POST } = await import("@/app/api/auth/login/route");
    const res = await POST(essai("bon-mot-de-passe", "203.0.113.1"));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, role: "admin" });
    expect(cookies).toHaveLength(1);
  });

  it("bloque l'adresse après 5 échecs, même avec le bon mot de passe, et n'alerte qu'une fois", async () => {
    const { POST } = await import("@/app/api/auth/login/route");
    for (let i = 0; i < 5; i++) {
      const res = await POST(essai("faux", "203.0.113.2"));
      expect(res.status).toBe(401);
      expect((await res.json()).erreur).toBe("Mot de passe incorrect");
    }
    const bloque = await POST(essai("bon-mot-de-passe", "203.0.113.2"));
    expect(bloque.status).toBe(429);
    expect(bloque.headers.get("retry-after")).toBeTruthy();
    expect((await bloque.json()).erreur).toBeTruthy();
    expect(alertes).toHaveLength(1);
    // Une autre adresse n'est pas touchée.
    expect((await POST(essai("bon-mot-de-passe", "203.0.113.3"))).status).toBe(200);
  });
});
