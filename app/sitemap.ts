import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/property";
import { SEASONS, SEASON_SLUGS } from "@/lib/seasons";
import { BLOG_POSTS } from "@/lib/blog/posts";

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

    // Le guide : l'index, puis un article par slug. Les slugs sont communs aux deux
    // langues, ce qui rend les `alternates` triviaux à construire.
    entries.push({
      url: `${SITE_URL}/${locale}/guide`,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/guide`]),
        ),
      },
    });

    for (const post of BLOG_POSTS) {
      entries.push({
        url: `${SITE_URL}/${locale}/guide/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}/guide/${post.slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
