import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export interface Photo {
  /** Chemin public, utilisable directement dans `src`. */
  src: string;
  /** Texte alternatif dérivé du nom de fichier, à surcharger si besoin. */
  alt: string;
}

/**
 * Liste les photos d'un dossier de `public/images/`.
 *
 * L'ordre d'affichage suit l'ordre alphabétique des noms de fichiers : il suffit
 * de préfixer les fichiers (`01-`, `02-`…) pour maîtriser l'ordre, sans toucher au code.
 * Lu au build côté serveur — déposer des photos ne demande aucune modification.
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
    .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }))
    .map((file) => ({
      src: `/images/${dir}/${file}`,
      alt: altFromFilename(file),
    }));
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
