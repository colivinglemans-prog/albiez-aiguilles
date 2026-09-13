import { readFileSync } from "node:fs";
import { createArchive } from "@sejour/socle/lib/archive";
import type {
  Archive,
  RecetteArchive,
  RecetteSansNuits,
  Sejour,
  SejourArchive,
} from "@/lib/dashboard-types";

/**
 * Archive des quatre canaux, antérieure au branchement Beds24 du 2026-08-28.
 *
 * Le mécanisme — filtrer comme le fait l'API, puis dédoublonner en laissant gagner le live —
 * vient de `@sejour/socle/lib/archive`. Ne restent ici que les trois choses qui sont propres
 * à ce bien : **d'où le fichier se charge**, **quelle clé dédoublonne**, et **comment ses
 * lignes se traduisent** en `Sejour`.
 *
 * Barbusse charge son équivalent par `import archiveData from "@/data/..."`. Impossible ici :
 * le fichier est **gitignoré**, parce que le dépôt est public et que l'archive contient le
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

/**
 * Le cache évite de reparser 26 Ko de JSON à chaque requête, **et** de refaire la traduction.
 * L'archive étant figée par nature, il n'y a rien à invalider : un nouveau déploiement
 * recharge le processus.
 */
let cache: { archive: Archive; origine: Origine } | null = null;
const fichier = () => (cache ??= charger());

/**
 * Traduction d'une ligne du fichier vers le type du domaine.
 *
 * Les valeurs ne bougent pas — seuls les noms changent. `source` est forcé à `"archive"`
 * plutôt que recopié : c'est la seule valeur qu'une ligne de ce fichier puisse honnêtement
 * porter, et la lire depuis le JSON laisserait une coquille d'export passer pour du live.
 */
function enSejour(s: SejourArchive): Sejour {
  return {
    ref: s.ref,
    channel: s.canal,
    arrival: s.arrivee,
    departure: s.depart,
    nights: s.nuits,
    gross: s.brut,
    net: s.net,
    commission: s.commission,
    source: "archive",
    bookedAt: s.reserveLe ?? null,
    fraisMenage: s.fraisMenage ?? null,
    taxeSejourCollecteeParLeCanal: s.taxeSejourCollecteeParLeCanal ?? null,
    anneeDeduite: s.anneeDeduite,
  };
}

/**
 * Même traduction pour les recettes : seul `canal` change de nom, pour rejoindre le
 * `channel` de `RevenueExtra` qu'attendent les calculs du socle.
 */
function enRecette({ canal, ...reste }: RecetteArchive): RecetteSansNuits {
  // `gross` est le nom que lisent les indicateurs du socle ; `brut` reste pour ce site.
  return { ...reste, channel: canal, gross: reste.brut };
}

/**
 * La clé de dédoublonnage est `ref`, et non un `id` : nos lignes archivées n'en ont pas.
 *
 * Le tri par date d'arrivée est conservé — le dashboard affiche la fusion telle quelle, et
 * une liste qui alterne live et archive au fil du hasard serait illisible.
 */
const sejours = createArchive<Sejour, Origine>({
  load: () => {
    const { archive, origine } = fichier();
    return { items: archive.sejours.map(enSejour), origin: origine };
  },
  key: (s) => s.ref,
  fields: { arrival: (s) => s.arrival },
  sort: (a, b) => a.arrival.localeCompare(b.arrival),
});

const recettes = createArchive<RecetteSansNuits, Origine>({
  load: () => {
    const { archive, origine } = fichier();
    return { items: archive.recettes.map(enRecette), origin: origine };
  },
  key: (r) => r.ref,
  fields: { arrival: (r) => r.date },
});

export function origineArchive(): Origine {
  return sejours.origin();
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
  return sejours.list({ arrivalFrom: filtre.arriveeDu, arrivalTo: filtre.arriveeAu });
}

/**
 * Recettes sans nuits : suppléments, frais d'annulation, séjours directs sans dates.
 *
 * Une recette sans date est écartée **même sans filtre** : elle ne peut être rattachée à
 * aucune année, et la laisser passer la ferait compter dans un total sans jamais apparaître
 * dans une série.
 */
export function recettesArchivees(filtre: FiltreSejours = {}): RecetteSansNuits[] {
  return recettes.list({ arrivalFrom: filtre.arriveeDu, arrivalTo: filtre.arriveeAu })
    .filter((r) => r.date);
}

/**
 * Fusionne le live et l'archive. **Le live gagne** : on n'ajoute de l'archive que les
 * séjours dont la référence est absente du live.
 *
 * Aucune date de coupure en dur. Si un export est un jour réimporté sur une plage plus
 * large, la dédup absorbe le recouvrement toute seule.
 */
export function fusionner(live: Sejour[], archives: Sejour[]): Sejour[] {
  return sejours.merge(live, archives);
}
