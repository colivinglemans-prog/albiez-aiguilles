import { readFileSync } from "node:fs";
import type { Archive, RecetteSansNuits, Sejour } from "@/lib/dashboard-types";

/**
 * Archive des quatre canaux, antérieure au branchement Beds24 du 2026-08-28.
 *
 * Barbusse charge son équivalent par `import archiveData from "@/data/..."`. Impossible ici :
 * le fichier est **gitignoré**, parce que le repo est public et que l'archive contient le
 * chiffre d'affaires de la SCI ligne par ligne. Un import statique ferait échouer le build
 * sur Vercel, où le fichier n'existe pas.
 *
 * D'où une lecture à l'exécution, dans cet ordre :
 *   1. `HISTORIQUE_ALBIEZ` — la variable d'environnement, en production ;
 *   2. `data/archive-albiez.json` — le fichier local, en développement ;
 *   3. rien, et le dashboard **le dit** au lieu d'afficher zéro sans explication.
 *
 * Le troisième cas est le piège à éviter : une archive absente ressemble à une année creuse.
 */

const VIDE: Archive = {
  genereLe: "",
  avertissement: "",
  totauxParCanal: {},
  sejours: [],
  recettes: [],
};

let cache: { archive: Archive; origine: Origine } | null = null;

export type Origine = "variable d'environnement" | "fichier local" | "absente";

function charger(): { archive: Archive; origine: Origine } {
  const brut = process.env.HISTORIQUE_ALBIEZ;
  if (brut && brut.trim()) {
    try {
      return { archive: JSON.parse(brut) as Archive, origine: "variable d'environnement" };
    } catch (e) {
      console.error("HISTORIQUE_ALBIEZ est illisible (JSON invalide) :", e);
    }
  }
  try {
    const texte = readFileSync("data/archive-albiez.json", "utf8");
    return { archive: JSON.parse(texte) as Archive, origine: "fichier local" };
  } catch {
    console.warn(
      "Aucune archive : ni HISTORIQUE_ALBIEZ, ni data/archive-albiez.json. " +
        "Lancer `node scripts/build-archive.mjs`, puis poser la variable sur Vercel.",
    );
    return { archive: VIDE, origine: "absente" };
  }
}

function archive() {
  // Le cache évite de reparser 26 Ko de JSON à chaque requête. L'archive étant figée par
  // nature, il n'y a rien à invalider : un nouveau déploiement recharge le processus.
  cache ??= charger();
  return cache;
}

export function origineArchive(): Origine {
  return archive().origine;
}

export interface FiltreSejours {
  /** Bornes sur la date d'arrivée, incluses. */
  arriveeDu?: string;
  arriveeAu?: string;
}

/**
 * Séjours archivés, filtrés comme le fait l'API Beds24 pour que les deux sources répondent
 * aux mêmes bornes. Comparaisons lexicographiques : les dates sont en ISO.
 */
export function sejoursArchives(filtre: FiltreSejours = {}): Sejour[] {
  return archive().archive.sejours.filter((s) => {
    if (filtre.arriveeDu && s.arrivee < filtre.arriveeDu) return false;
    if (filtre.arriveeAu && s.arrivee > filtre.arriveeAu) return false;
    return true;
  });
}

/** Recettes sans nuits : suppléments, frais d'annulation, séjours directs sans dates. */
export function recettesArchivees(filtre: FiltreSejours = {}): RecetteSansNuits[] {
  return archive().archive.recettes.filter((r) => {
    if (!r.date) return false;
    if (filtre.arriveeDu && r.date < filtre.arriveeDu) return false;
    if (filtre.arriveeAu && r.date > filtre.arriveeAu) return false;
    return true;
  });
}

/**
 * Fusionne le live et l'archive. **Le live gagne** : on n'ajoute de l'archive que les
 * séjours dont la référence est absente du live.
 *
 * Aucune date de coupure en dur. Si un export est un jour réimporté sur une plage plus
 * large, la dédup absorbe le recouvrement toute seule — et les séjours marqués
 * `aussiDansBeds24` sont précisément ceux qui existent déjà des deux côtés.
 */
export function fusionner(live: Sejour[], archives: Sejour[]): Sejour[] {
  const refsLive = new Set(live.map((s) => s.ref).filter(Boolean));
  return [...live, ...archives.filter((s) => !refsLive.has(s.ref))].sort((a, b) =>
    a.arrivee.localeCompare(b.arrivee),
  );
}
