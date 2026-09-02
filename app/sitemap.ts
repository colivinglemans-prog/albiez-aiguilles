import type { MetadataRoute } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/property";
import { SEASONS, SEASON_SLUGS } from "@/lib/seasons";
import { BLOG_POSTS } from "@/lib/blog/posts";

/**
 * Les `hreflang` d'une entrée : une par langue, plus le `x-default`.
 *
 * Le `x-default` est indispensable ici parce que le `<head>` des pages le déclare aussi
 * (`lib/seo.ts`). Les deux jeux d'annotations décrivent le même ensemble et Google les lit
 * tous les deux : une clé présente d'un côté et absente de l'autre est une incohérence
 * gratuite. Il pointe sur le français, comme partout ailleurs sur le site.
 */
function alternates(pathFor: (l: Locale) => string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}${pathFor(l)}`;
  }
  languages["x-default"] = `${SITE_URL}${pathFor(DEFAULT_LOCALE)}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: alternates((l) => `/${l}`),
    });

    for (const season of SEASONS) {
      entries.push({
        url: `${SITE_URL}/${locale}/${SEASON_SLUGS[locale][season]}`,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: alternates((l) => `/${l}/${SEASON_SLUGS[l][season]}`),
      });
    }

    // Le guide : l'index, puis un article par slug. Les slugs sont communs aux cinq
    // langues, ce qui rend les `alternates` triviaux à construire.
    entries.push({
      url: `${SITE_URL}/${locale}/guide`,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates((l) => `/${l}/guide`),
    });

    for (const post of BLOG_POSTS) {
      entries.push({
        url: `${SITE_URL}/${locale}/guide/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: alternates((l) => `/${l}/guide/${post.slug}`),
      });
    }
  }

  return entries;
}
