import { describe, expect, it } from "vitest";
import { validateTemplates } from "@sejour/socle/lib/guest-messaging/validate";
import { renderMessage } from "@sejour/socle/lib/guest-messaging/dispatch";
import { LOCALES } from "@sejour/socle/lib/locales";
import { TEMPLATES } from "@/lib/messages/templates";

/**
 * Les textes des messages voyageurs : toute erreur bloque le build. Langue manquante, variable
 * oubliée dans une traduction, reste de syntaxe Beds24, numéro ou code écrit en dur (le dépôt est
 * public), lien dans une variante qui n'en veut pas, trou au rendu…
 */
describe("messages voyageurs d'Albiez", () => {
  const findings = validateTemplates(TEMPLATES);

  it("aucune erreur dans les textes", () => {
    expect(findings.filter((f) => f.level === "error")).toEqual([]);
  });

  it("avertissements connus seulement", () => {
    // Liens envoyés à Booking.com : assumé tant que la mesure côté voyageur n'est pas faite.
    const unexpected = findings.filter((f) => f.level === "warning" && f.code !== "links");
    expect(unexpected).toEqual([]);
  });

  it("chaque message se rend dans les cinq langues, avec et sans prénom", () => {
    const vars = {
      guideArrivee: "https://exemple.fr/guide-arrivee",
      guide: "https://exemple.fr/guide",
      telephone: "+33 0 00 00 00 00",
      whatsapp: "https://wa.me/0",
      code: "0000",
    };
    for (const t of TEMPLATES) {
      for (const locale of LOCALES) {
        for (const prenom of ["Test", undefined]) {
          const r = renderMessage(t, { channel: "Airbnb", locale }, { ...vars, prenom, kitAbsent: "1", prixKit: "15 €", viaAirbnb: "1", pneus: "1", ski: "1" });
          expect(r.text).not.toMatch(/\{\{|\}\}|undefined/);
          if (!prenom) expect(r.text).not.toMatch(/^\S+ ,/);
        }
      }
    }
  });

  it("signature au nom de la SCI, jamais de Coliving Barbusse", () => {
    for (const t of TEMPLATES) for (const l of LOCALES) {
      expect(t.body[l]).toMatch(/Isabelle (et|and|und|y|e) Alexandre/);
      expect(t.body[l]).not.toMatch(/Barbusse|Coliving/i);
    }
  });
});

describe("garde-fous propres à Albiez (le-dahu)", () => {
  it("le faux positif du 2026-11-08 n'est plus reconnu comme un envoi du code", async () => {
    const { ledgerFromThread } = await import("@sejour/socle/lib/guest-messaging/ledger");
    const thread = [{ source: "host", time: "2026-09-22T18:07:58Z", message: "Bonsoir,\nc'est noté pour l'heure d'arrivée.\nJe vous transmettrez le code de la boite à clef plus tard." }];
    expect(ledgerFromThread(thread, TEMPLATES)).toEqual([]);
    const real = [{ source: "host", time: "2026-11-02T07:01:25Z", message: "Bonjour,\n\nun petit message pour vous donner le code de la boite à clef : 0000" }];
    expect(ledgerFromThread(real, TEMPLATES).map((e) => e.templateId)).toEqual(["code-boite"]);
  });

  it("les pneus suivent la période légale (1er novembre – 31 mars), pas le domaine skiable", async () => {
    const { overlapsTyreSeason } = await import("@/lib/messages/engine");
    expect(overlapsTyreSeason("2026-11-20", "2026-11-22")).toBe(true);
    expect(overlapsTyreSeason("2027-03-30", "2027-04-02")).toBe(true);
    expect(overlapsTyreSeason("2027-04-01", "2027-04-05")).toBe(false);
    expect(overlapsTyreSeason("2027-10-29", "2027-10-31")).toBe(false);
  });

  it("HIVERS couvre la fenêtre lue par la messagerie (120 jours) — sinon, ajouter l'hiver suivant", async () => {
    const { HIVERS } = await import("@/lib/seasons");
    const { todayParis } = await import("@sejour/socle/lib/time");
    const { addDays } = await import("@sejour/socle/lib/guest-messaging/schedule");
    const horizon = addDays(todayParis(), 120);
    const lastWinterEnd = HIVERS.map((h) => h.fin).sort().at(-1)!;
    // Hors saison, l'horizon peut dépasser la fin du dernier hiver sans en manquer un : on ne
    // signale que si l'horizon atteint novembre suivant cette fin.
    const nextNovember = `${Number(lastWinterEnd.slice(0, 4))}-11-01`;
    expect(horizon < nextNovember, `Ajouter l'hiver ${nextNovember.slice(0, 4)}-${Number(nextNovember.slice(0, 4)) + 1} dans HIVERS (lib/seasons.ts)`).toBe(true);
  });
});
