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
          const r = renderMessage(t, { channel: "Airbnb", locale }, { ...vars, prenom, kitAbsent: "1", hiver: "1" });
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
