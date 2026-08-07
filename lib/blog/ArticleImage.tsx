import Image from "next/image";
import { getPhoto } from "@/lib/photos";
import { splitImagePath } from "./posts";

/**
 * Une photo au fil d'un article.
 *
 * Même principe que les couvertures : le fichier est désigné par son chemin sous
 * `public/images/`, ses dimensions sont relevées au build, et le conteneur prend le
 * format réel de l'image — aucune photo n'est recadrée.
 *
 * Un fichier introuvable ne fait pas échouer le rendu : la figure disparaît, l'article
 * reste lisible. C'est le même parti pris que `listPhotos()`.
 */
export default function ArticleImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const { dir, file } = splitImagePath(src);
  const photo = getPhoto(dir, file);
  if (!photo) return null;

  return (
    <figure className="my-8">
      <Image
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 768px) 48rem, 100vw"
        className="h-auto w-full rounded-xl"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-secondary">{caption}</figcaption>
      )}
    </figure>
  );
}
