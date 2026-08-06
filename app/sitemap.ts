import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/property";
import { SEASONS, SEASON_SLUGS } from "@/lib/seasons";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}`]),
        ),
      },
    });

    for (const season of SEASONS) {
      entries.push({
        url: `${SITE_URL}/${locale}/${SEASON_SLUGS[locale][season]}`,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}/${SEASON_SLUGS[l][season]}`]),
          ),
        },
      });
    }
  }

  return entries;
}
