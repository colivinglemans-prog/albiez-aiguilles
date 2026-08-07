import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { alternatesFor, blogPath } from "@/lib/seo";
import { BLOG_POSTS, getLocalizedPost, splitImagePath } from "@/lib/blog/posts";
import { getPhoto } from "@/lib/photos";
import GuideFilter, { type GuideCard } from "@/components/public/GuideFilter";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { seo } = getDictionary(locale).blog;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: alternatesFor(locale, blogPath),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: blogPath(locale),
      locale: locale === "fr" ? "fr_FR" : "en_GB",
    },
  };
}

export default async function GuideIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  // Les photos sont lues au build : chaque vignette peut donc prendre le format réel
  // de son image plutôt que d'être recadrée. La grille est un composant client (elle
  // porte le filtre de saison), d'où la résolution des photos ici.
  const cards: GuideCard[] = BLOG_POSTS.map((post) => {
    const { dir, file } = splitImagePath(post.image);
    const photo = getPhoto(dir, file);
    const loc = getLocalizedPost(post, locale);
    return {
      slug: post.slug,
      title: loc.title,
      excerpt: loc.excerpt,
      date: post.date,
      season: post.season,
      photo: photo
        ? { src: photo.src, width: photo.width, height: photo.height }
        : null,
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">{t.blog.heading}</h1>
        <p className="mt-4 text-secondary">{t.blog.subheading}</p>
      </header>

      <GuideFilter cards={cards} />
    </div>
  );
}
