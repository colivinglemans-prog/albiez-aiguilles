import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDictionary,
  isLocale,
  LOCALES,
  LOCALE_META,
  type Locale,
} from "@/lib/i18n";
import {
  alternatesFor,
  articleJsonLd,
  blogPostPath,
  openGraphLocales,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/property";
import { getPhoto } from "@/lib/photos";
import {
  BLOG_POSTS,
  getLocalizedPost,
  getPostBySlug,
  relatedPosts,
  splitImagePath,
} from "@/lib/blog/posts";

/**
 * Le contenu de chaque article, chargé à la demande.
 *
 * Les imports sont paresseux et non pas en tête de fichier : quatre-vingt-cinq
 * composants importés d'emblée pour n'en rendre qu'un seul alourdiraient chaque page du
 * guide. Les chemins restent des littéraux — c'est ce qui permet au bundler de les
 * résoudre ; une expression `content/${locale}/${slug}` lui ferait perdre l'analyse
 * statique, et c'est la raison de la longueur de cette table.
 */
type ContentLoader = () => Promise<{ default: React.ComponentType }>;

const CONTENT: Record<string, Record<Locale, ContentLoader>> = {
  "randonnees-balisees-albiez": {
    fr: () => import("@/lib/blog/content/fr/randonnees-balisees-albiez"),
    en: () => import("@/lib/blog/content/en/randonnees-balisees-albiez"),
    de: () => import("@/lib/blog/content/de/randonnees-balisees-albiez"),
    es: () => import("@/lib/blog/content/es/randonnees-balisees-albiez"),
    it: () => import("@/lib/blog/content/it/randonnees-balisees-albiez"),
  },
  "domaine-skiable-albiez-secteur-mollard": {
    fr: () => import("@/lib/blog/content/fr/domaine-skiable-albiez-secteur-mollard"),
    en: () => import("@/lib/blog/content/en/domaine-skiable-albiez-secteur-mollard"),
    de: () => import("@/lib/blog/content/de/domaine-skiable-albiez-secteur-mollard"),
    es: () => import("@/lib/blog/content/es/domaine-skiable-albiez-secteur-mollard"),
    it: () => import("@/lib/blog/content/it/domaine-skiable-albiez-secteur-mollard"),
  },
  "louer-ses-skis-a-albiez": {
    fr: () => import("@/lib/blog/content/fr/louer-ses-skis-a-albiez"),
    en: () => import("@/lib/blog/content/en/louer-ses-skis-a-albiez"),
    de: () => import("@/lib/blog/content/de/louer-ses-skis-a-albiez"),
    es: () => import("@/lib/blog/content/es/louer-ses-skis-a-albiez"),
    it: () => import("@/lib/blog/content/it/louer-ses-skis-a-albiez"),
  },
  "cours-de-ski-esf-albiez": {
    fr: () => import("@/lib/blog/content/fr/cours-de-ski-esf-albiez"),
    en: () => import("@/lib/blog/content/en/cours-de-ski-esf-albiez"),
    de: () => import("@/lib/blog/content/de/cours-de-ski-esf-albiez"),
    es: () => import("@/lib/blog/content/es/cours-de-ski-esf-albiez"),
    it: () => import("@/lib/blog/content/it/cours-de-ski-esf-albiez"),
  },
  "faire-ses-courses-a-albiez": {
    fr: () => import("@/lib/blog/content/fr/faire-ses-courses-a-albiez"),
    en: () => import("@/lib/blog/content/en/faire-ses-courses-a-albiez"),
    de: () => import("@/lib/blog/content/de/faire-ses-courses-a-albiez"),
    es: () => import("@/lib/blog/content/es/faire-ses-courses-a-albiez"),
    it: () => import("@/lib/blog/content/it/faire-ses-courses-a-albiez"),
  },
  "boulangerie-moulin-valentin-albiez": {
    fr: () => import("@/lib/blog/content/fr/boulangerie-moulin-valentin-albiez"),
    en: () => import("@/lib/blog/content/en/boulangerie-moulin-valentin-albiez"),
    de: () => import("@/lib/blog/content/de/boulangerie-moulin-valentin-albiez"),
    es: () => import("@/lib/blog/content/es/boulangerie-moulin-valentin-albiez"),
    it: () => import("@/lib/blog/content/it/boulangerie-moulin-valentin-albiez"),
  },
  "fromagerie-cooperative-beaufort-des-arves": {
    fr: () => import("@/lib/blog/content/fr/fromagerie-cooperative-beaufort-des-arves"),
    en: () => import("@/lib/blog/content/en/fromagerie-cooperative-beaufort-des-arves"),
    de: () => import("@/lib/blog/content/de/fromagerie-cooperative-beaufort-des-arves"),
    es: () => import("@/lib/blog/content/es/fromagerie-cooperative-beaufort-des-arves"),
    it: () => import("@/lib/blog/content/it/fromagerie-cooperative-beaufort-des-arves"),
  },
  "albiez-en-famille": {
    fr: () => import("@/lib/blog/content/fr/albiez-en-famille"),
    en: () => import("@/lib/blog/content/en/albiez-en-famille"),
    de: () => import("@/lib/blog/content/de/albiez-en-famille"),
    es: () => import("@/lib/blog/content/es/albiez-en-famille"),
    it: () => import("@/lib/blog/content/it/albiez-en-famille"),
  },
  "aiguilles-arves": {
    fr: () => import("@/lib/blog/content/fr/aiguilles-arves"),
    en: () => import("@/lib/blog/content/en/aiguilles-arves"),
    de: () => import("@/lib/blog/content/de/aiguilles-arves"),
    es: () => import("@/lib/blog/content/es/aiguilles-arves"),
    it: () => import("@/lib/blog/content/it/aiguilles-arves"),
  },
  "col-du-mollard-velo": {
    fr: () => import("@/lib/blog/content/fr/col-du-mollard-velo"),
    en: () => import("@/lib/blog/content/en/col-du-mollard-velo"),
    de: () => import("@/lib/blog/content/de/col-du-mollard-velo"),
    es: () => import("@/lib/blog/content/es/col-du-mollard-velo"),
    it: () => import("@/lib/blog/content/it/col-du-mollard-velo"),
  },
  "chiens-de-traineau-albiez": {
    fr: () => import("@/lib/blog/content/fr/chiens-de-traineau-albiez"),
    en: () => import("@/lib/blog/content/en/chiens-de-traineau-albiez"),
    de: () => import("@/lib/blog/content/de/chiens-de-traineau-albiez"),
    es: () => import("@/lib/blog/content/es/chiens-de-traineau-albiez"),
    it: () => import("@/lib/blog/content/it/chiens-de-traineau-albiez"),
  },
  "albiez-c-show": {
    fr: () => import("@/lib/blog/content/fr/albiez-c-show"),
    en: () => import("@/lib/blog/content/en/albiez-c-show"),
    de: () => import("@/lib/blog/content/de/albiez-c-show"),
    es: () => import("@/lib/blog/content/es/albiez-c-show"),
    it: () => import("@/lib/blog/content/it/albiez-c-show"),
  },
  "lac-du-mollard-baignade": {
    fr: () => import("@/lib/blog/content/fr/lac-du-mollard-baignade"),
    en: () => import("@/lib/blog/content/en/lac-du-mollard-baignade"),
    de: () => import("@/lib/blog/content/de/lac-du-mollard-baignade"),
    es: () => import("@/lib/blog/content/es/lac-du-mollard-baignade"),
    it: () => import("@/lib/blog/content/it/lac-du-mollard-baignade"),
  },
  "foret-du-rival": {
    fr: () => import("@/lib/blog/content/fr/foret-du-rival"),
    en: () => import("@/lib/blog/content/en/foret-du-rival"),
    de: () => import("@/lib/blog/content/de/foret-du-rival"),
    es: () => import("@/lib/blog/content/es/foret-du-rival"),
    it: () => import("@/lib/blog/content/it/foret-du-rival"),
  },
  "refuge-chalet-la-croe": {
    fr: () => import("@/lib/blog/content/fr/refuge-chalet-la-croe"),
    en: () => import("@/lib/blog/content/en/refuge-chalet-la-croe"),
    de: () => import("@/lib/blog/content/de/refuge-chalet-la-croe"),
    es: () => import("@/lib/blog/content/es/refuge-chalet-la-croe"),
    it: () => import("@/lib/blog/content/it/refuge-chalet-la-croe"),
  },
  "equitation-le-kavalkada": {
    fr: () => import("@/lib/blog/content/fr/equitation-le-kavalkada"),
    en: () => import("@/lib/blog/content/en/equitation-le-kavalkada"),
    de: () => import("@/lib/blog/content/de/equitation-le-kavalkada"),
    es: () => import("@/lib/blog/content/es/equitation-le-kavalkada"),
    it: () => import("@/lib/blog/content/it/equitation-le-kavalkada"),
  },
  "bmx-vtt-trottinette-albiez": {
    fr: () => import("@/lib/blog/content/fr/bmx-vtt-trottinette-albiez"),
    en: () => import("@/lib/blog/content/en/bmx-vtt-trottinette-albiez"),
    de: () => import("@/lib/blog/content/de/bmx-vtt-trottinette-albiez"),
    es: () => import("@/lib/blog/content/es/bmx-vtt-trottinette-albiez"),
    it: () => import("@/lib/blog/content/it/bmx-vtt-trottinette-albiez"),
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const post = getPostBySlug(slug);
  if (!post) return {};

  const loc = getLocalizedPost(post, locale);

  return {
    title: loc.title,
    description: loc.description,
    keywords: loc.keywords,
    alternates: alternatesFor(locale, blogPostPath(post.slug)),
    openGraph: {
      title: loc.title,
      description: loc.description,
      url: blogPostPath(post.slug)(locale),
      type: "article",
      publishedTime: post.date,
      images: [{ url: `${SITE_URL}/images/${post.image}`, alt: loc.title }],
      ...openGraphLocales(locale),
    },
  };
}

export default async function GuidePost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getPostBySlug(slug);
  const loader = CONTENT[slug]?.[locale];
  if (!post || !loader) notFound();

  const t = getDictionary(locale);
  const loc = getLocalizedPost(post, locale);
  const { dir, file } = splitImagePath(post.image);
  const photo = getPhoto(dir, file);
  const { default: Content } = await loader();

  const jsonLd = articleJsonLd({
    locale,
    slug: post.slug,
    title: loc.title,
    description: loc.description,
    imageUrl: `${SITE_URL}/images/${post.image}`,
    date: post.date,
  });

  const related = relatedPosts(post);

  return (
    <div data-season={post.season ?? undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-12">
        <nav className="text-sm text-secondary">
          <Link href={`/${locale}/guide`} className="transition-colors hover:text-foreground">
            {t.blog.back}
          </Link>
        </nav>

        <header className="mt-6">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-secondary">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-accent-dark">
              {post.season ? t.blog.seasonBadge[post.season] : t.blog.yearRoundBadge}
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(LOCALE_META[locale].bcp47, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
            {loc.title}
          </h1>
          <p className="mt-4 text-lg text-secondary">{loc.description}</p>
        </header>

        {photo && (
          <Image
            src={photo.src}
            alt={loc.title}
            width={photo.width}
            height={photo.height}
            priority
            sizes="(min-width: 768px) 48rem, 100vw"
            className="mt-8 h-auto w-full rounded-2xl"
          />
        )}

        <div className="prose-article mt-10">
          <Content />
        </div>

        <aside className="mt-14 rounded-2xl border border-accent/30 bg-accent-soft px-6 py-7">
          <p className="text-lg font-semibold text-primary">{t.blog.cta.title}</p>
          <p className="mt-2 text-sm text-secondary">{t.blog.cta.text}</p>
          <Link
            href={`/${locale}`}
            className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {t.blog.cta.button}
          </Link>
        </aside>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold text-primary">{t.blog.relatedTitle}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/${locale}/guide/${other.slug}`}
                    className="block py-4 transition-colors hover:text-accent-dark"
                  >
                    <span className="font-medium">
                      {getLocalizedPost(other, locale).title}
                    </span>
                    <span className="mt-1 block text-sm text-secondary">
                      {getLocalizedPost(other, locale).excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
