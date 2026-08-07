import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { spaceOrder } from "./spaces";
import type { Season } from "./seasons";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export interface Photo {
  /** Chemin public, utilisable directement dans `src`. */
  src: string;
  /** Texte alternatif dérivé du nom de fichier, à surcharger si besoin. */
  alt: string;
  width: number;
  height: number;
  /** Largeur / hauteur. Sert à donner au conteneur le format réel de l'image. */
  ratio: number;
}

/**
 * Liste les photos d'un dossier de `public/images/`.
 *
 * L'ordre d'affichage suit l'ordre alphabétique des noms de fichiers : il suffit
 * de préfixer les fichiers (`01-`, `02-`…) pour maîtriser l'ordre, sans toucher au code.
 * Lu au build côté serveur — déposer des photos ne demande aucune modification.
 *
 * Les dimensions sont relevées ici (lecture de l'en-tête seulement, pas du fichier
 * entier) pour que l'affichage puisse respecter le format de chaque image plutôt que
 * de la recadrer dans un cadre imposé.
 */
export function listPhotos(dir: string): Photo[] {
  const abs = path.join(process.cwd(), "public", "images", dir);

  let entries: string[];
  try {
    entries = fs.readdirSync(abs);
  } catch {
    // Dossier absent : on rend une galerie vide plutôt que de casser la page.
    return [];
  }

  return entries
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    // Un fichier préfixé par `_` reste dans le dossier mais n'est pas publié :
    // c'est la façon de mettre une photo de côté sans la supprimer.
    .filter((f) => !f.startsWith("_"))
    .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }))
    .flatMap((file) => {
      const dimensions = readDimensions(path.join(abs, file));
      if (!dimensions) return [];
      return [
        {
          src: `/images/${dir}/${file}`,
          alt: altFromFilename(file),
          width: dimensions.width,
          height: dimensions.height,
          ratio: dimensions.width / dimensions.height,
        },
      ];
    });
}

/**
 * Charge une photo précise par son nom de fichier, y compris préfixée par `_`.
 *
 * Sert aux images qui ont un rôle désigné plutôt que d'être du contenu de galerie —
 * les mosaïques des cartes de saison, par exemple, qui n'ont rien à faire dans
 * « En images » puisqu'elles ne montrent que des photos déjà présentes.
 */
export function getPhoto(dir: string, fileName: string): Photo | undefined {
  const abs = path.join(process.cwd(), "public", "images", dir, fileName);
  const dimensions = readDimensions(abs);
  if (!dimensions) return undefined;

  return {
    src: `/images/${dir}/${fileName}`,
    alt: altFromFilename(fileName),
    width: dimensions.width,
    height: dimensions.height,
    ratio: dimensions.width / dimensions.height,
  };
}

/** Un espace du logement et ses photos, dans l'ordre du sous-dossier. */
export interface SpacePhotos {
  /** Nom du sous-dossier : `salon`, `balcon`… Voir `SPACES` (lib/spaces.ts). */
  key: string;
  photos: Photo[];
}

/**
 * Les sous-dossiers d'un dossier de saison, un par espace.
 *
 * Le découpage reste piloté par le système de fichiers : créer `commun/entree/` et y
 * déposer une photo suffit à faire apparaître l'espace. Seuls son titre et ses
 * équipements demandent une entrée dans les dictionnaires — un espace inconnu
 * s'affiche quand même, en fin de visite, plutôt que de disparaître en silence.
 */
export function listSpaces(dir: string): SpacePhotos[] {
  const abs = path.join(process.cwd(), "public", "images", dir);

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(abs, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => ({ key: e.name, photos: listPhotos(`${dir}/${e.name}`) }))
    .filter((s) => s.photos.length > 0);
}

/**
 * La visite complète pour une saison : un groupe par espace, dans l'ordre de `SPACES`.
 *
 * À l'intérieur d'un espace, l'ordre reprend celui de la galerie d'avant : saison en
 * cours, puis photos sans saison visible, puis l'autre saison. Le balcon sous la neige
 * précède donc le balcon au soleil sur `/ski`, et l'inverse sur `/ete` — c'est le même
 * lieu, montré deux fois, et voir l'autre saison est justement ce qui donne envie de
 * revenir.
 */
export function gallerySpaces(season: Season): SpacePhotos[] {
  const other: Season = season === "hiver" ? "ete" : "hiver";

  const merged = new Map<string, Photo[]>();
  for (const dir of [season, "commun", other]) {
    for (const { key, photos } of listSpaces(dir)) {
      merged.set(key, [...(merged.get(key) ?? []), ...photos]);
    }
  }

  return [...merged]
    .map(([key, photos]) => ({ key, photos }))
    .sort((a, b) => spaceOrder(a.key) - spaceOrder(b.key) || a.key.localeCompare(b.key));
}

function readDimensions(file: string): { width: number; height: number } | null {
  try {
    const { width, height } = imageSize(fs.readFileSync(file));
    if (!width || !height) return null;
    return { width, height };
  } catch {
    // Fichier illisible ou format non reconnu : on l'ignore plutôt que d'échouer le build.
    return null;
  }
}

/** `02-balcon-vue-aiguilles.jpg` → « Balcon vue aiguilles ». */
function altFromFilename(file: string): string {
  const base = path
    .basename(file, path.extname(file))
    .replace(/^\d+[-_\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  if (!base) return "";
  return base.charAt(0).toUpperCase() + base.slice(1);
}
