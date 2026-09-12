import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { extname, join } from "node:path";

const MAX_WIDTH = 1920;
const QUALITY = 82;
const ROOT = "public/images";
const EXTS = [".jpg", ".jpeg", ".png"];
const MIN_SIZE = 400 * 1024; // skip files already under 400 KB

/**
 * Gain minimal pour accepter le fichier réencodé, en proportion de la taille d'origine.
 *
 * Sans ce seuil, chaque exécution réécrivait **toutes** les images dépassant MIN_SIZE, y
 * compris celles que le script avait lui-même compressées la fois d'avant. Un JPEG déjà
 * en mozjpeg q82 repasse à q82 : il n'y gagne que quelques dixièmes de pour cent, et il y
 * perd un peu de qualité à chaque passage. Treize fichiers se retrouvaient ainsi modifiés
 * dans git à chaque `npm run compress-images`, pour trois kilo-octets gagnés en tout.
 *
 * 10 % laisse passer sans discussion ce qui doit l'être — une photo d'appareil non
 * traitée gagne 60 à 80 % — et arrête net le réencodage à vide.
 */
const MIN_GAIN = 0.1;

function humanSize(bytes) {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const path = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const all = await walk(ROOT);
let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;
let alreadyOptimised = 0;
const renames = [];

for (const path of all) {
  const ext = extname(path).toLowerCase();
  if (!EXTS.includes(ext)) continue;
  const { size: before } = await stat(path);
  totalBefore += before;
  if (before < MIN_SIZE) {
    skipped++;
    totalAfter += before;
    continue;
  }

  const tmp = path + ".tmp.jpg";
  const finalPath = ext === ".png" ? path.replace(/\.png$/i, ".jpg") : path;

  await sharp(path)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp);

  const { size: after } = await stat(tmp);
  const short = path.replace(ROOT + "/", "").replace(ROOT + "\\", "");

  // Un PNG est toujours remplacé : on vient de le convertir en JPEG, et c'est le
  // changement de format qu'on cherchait, pas seulement les octets gagnés.
  const converted = finalPath !== path;

  if (!converted && after > before * (1 - MIN_GAIN)) {
    await unlink(tmp);
    totalAfter += before;
    alreadyOptimised++;
    continue;
  }

  if (ext === ".png" && converted) {
    await unlink(path);
    renames.push({ from: path, to: finalPath });
  }
  await rename(tmp, finalPath);

  totalAfter += after;
  processed++;
  console.log(`${short}: ${humanSize(before)} → ${humanSize(after)}`);
}

console.log(
  `\nProcessed ${processed} files` +
    ` (skipped ${skipped} under ${humanSize(MIN_SIZE)},` +
    ` ${alreadyOptimised} already optimised)`,
);
console.log(`Total: ${humanSize(totalBefore)} → ${humanSize(totalAfter)} (saved ${humanSize(totalBefore - totalAfter)})`);

if (renames.length) {
  console.log(`\n${renames.length} PNGs converted to JPG — update references in code.`);
}
