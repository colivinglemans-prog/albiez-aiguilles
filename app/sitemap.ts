import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { hreflangMap } from "@/lib/seo";
import type { PathFor } from "@sejour/socle/lib/seo";
import { SITE_URL } from "@/lib/property";
import { SEASONS, SEASON_SLUGS } from "@/lib/seasons";
import { BLOG_POSTS } from "@/lib/blog/posts";

/**
 * Les `hreflang` d'une entrée : une par langue, plus le `x-default`.
 *
 * La table est celle que `lib/seo.ts` pose dans le `<head>` des pages, à dessein : les deux
 * jeux d'annotations décrivent le même ensemble et Google les lit tous les deux. Une clé
 * présente d'un côté et absente de l'autre est une incohérence gratuite — et c'est ce qui
 * arrive dès que les deux listes sont construites par deux bouts de code différents, ce qui
 * était le cas ici.
 */
function alternates(pathFor: PathFor) {
  return { languages: hreflangMap(pathFor) };
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

    // La page de séjour longue durée. Elle n'est liée depuis nulle part sur le site —
    // ni navigation, ni index du guide — donc le sitemap est le seul chemin par lequel
    // un moteur la découvre. Sans cette entrée, elle serait invisible.
    entries.push({
      url: `${SITE_URL}/${locale}/sejour-longue-duree`,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: alternates((l) => `/${l}/sejour-longue-duree`),
    });

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
