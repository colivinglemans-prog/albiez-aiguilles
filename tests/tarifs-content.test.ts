/** Les textes de la page « Tarifs » respectent la règle Bing : titre ≤ 65, description 120–155. */
import { describe, expect, it } from "vitest";
import { pricesContent } from "../app/(site)/[locale]/tarifs/content";
import { LOCALES } from "../lib/i18n/types";

describe("page Tarifs : métadonnées", () => {
  for (const locale of LOCALES) {
    it(locale, () => {
      const c = pricesContent(locale);
      expect(c.metaTitle.length).toBeLessThanOrEqual(65);
      expect(c.metaDescription.length).toBeGreaterThanOrEqual(120);
      expect(c.metaDescription.length).toBeLessThanOrEqual(155);
      expect(c.lead("1 000 €")).toContain("1 000 €");
      expect(`${c.lead(null)} ${c.linen}`).not.toMatch(/−7|-7 ?%|7 ?%/);
    });
  }
});
