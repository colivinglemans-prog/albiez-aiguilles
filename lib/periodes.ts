import data from "@/data/vacances-scolaires.json";

/**
 * Périodes de forte demande à Albiez : vacances scolaires par zone, semaine de Noël,
 * semaine du Jour de l'An.
 *
 * L'équivalent chez Barbusse est `lib/events.ts`, mais la nature des données diffère et
 * deux choix en découlent :
 *
 *   - **Aucune extension de dates.** Barbusse élargit ses événements de ±2 jours pour
 *     rattraper le client arrivé la veille du MotoGP. Une période de vacances a des bornes
 *     exactes : l'élargir étiquetterait à tort les séjours voisins.
 *   - **Un séjour peut relever de plusieurs périodes.** En février les trois zones se
 *     chevauchent largement. On renvoie donc une liste là où Barbusse renvoie un nom.
 *
 * La liste est générée par `scripts/build-vacances.mjs` depuis l'open data du ministère.
 * Ne pas l'éditer à la main : les dates changent chaque année.
 */
export interface Periode {
  nom: string;
  /** « Zone A » / « Zone B » / « Zone C », ou « Toutes » pour les semaines de fêtes. */
  zone: string;
  /** Première journée de vacances, incluse (YYYY-MM-DD). */
  debut: string;
  /** Dernière journée de vacances, incluse (YYYY-MM-DD). */
  fin: string;
  type: "vacances" | "fete";
  anneeScolaire?: string;
  /** Le ministère n'a publié que la date de début : la borne de fin ne veut rien dire. */
  finNonPubliee?: boolean;
}

export const PERIODES: Periode[] = data.periodes as Periode[];

/** Ordre d'affichage : une semaine de fêtes prime sur des vacances qui l'englobent. */
const POIDS: Record<string, number> = {
  "Semaine du Jour de l'An": 100,
  "Semaine de Noël": 90,
};

function addDays(jour: string, n: number): string {
  const d = new Date(`${jour}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * Nombre de nuits du séjour [arrivee, depart[ tombant dans la période [debut, fin].
 * Sert à classer les périodes : celle qui couvre le plus de nuits passe en tête.
 */
function nuitsCommunes(arrivee: string, depart: string, debut: string, fin: string): number {
  const debutCommun = arrivee > debut ? arrivee : debut;
  const finExclue = addDays(fin, 1);
  const finCommune = depart < finExclue ? depart : finExclue;
  const jours = Math.round(
    (Date.parse(`${finCommune}T00:00:00Z`) - Date.parse(`${debutCommun}T00:00:00Z`)) / 86_400_000,
  );
  return Math.max(0, jours);
}

/**
 * Toutes les périodes qu'un séjour [arrivee, depart[ recoupe, les plus significatives
 * d'abord — d'abord le poids (fêtes en tête), puis le nombre de nuits en commun.
 */
export function findPeriodesForStay(arrivee: string, depart: string): Periode[] {
  return PERIODES.map((p) => ({ p, nuits: nuitsCommunes(arrivee, depart, p.debut, p.fin) }))
    .filter(({ nuits }) => nuits > 0)
    .sort(
      (a, b) =>
        (POIDS[b.p.nom] ?? 0) - (POIDS[a.p.nom] ?? 0) ||
        b.nuits - a.nuits ||
        a.p.zone.localeCompare(b.p.zone),
    )
    .map(({ p }) => p);
}

/** Les périodes qui contiennent un jour donné, mêmes règles de tri. */
export function findPeriodesOnDay(jour: string): Periode[] {
  return findPeriodesForStay(jour, addDays(jour, 1));
}

/** « Vacances d'Hiver » → « Hiver ». Pour les affichages compacts (calendrier, badges). */
export function shortPeriodeLabel(nom: string): string {
  if (/jour de l'an/i.test(nom)) return "Jour de l'An";
  if (/no[eë]l/i.test(nom)) return "Noël";
  if (/toussaint/i.test(nom)) return "Toussaint";
  if (/hiver/i.test(nom)) return "Hiver";
  if (/printemps/i.test(nom)) return "Printemps";
  if (/ascension/i.test(nom)) return "Ascension";
  if (/été/i.test(nom)) return "Été";
  return nom;
}

/**
 * Étiquette unique pour un séjour : le nom de la période dominante, suivi des lettres de
 * zones concernées par cette même période. « Vacances d'Hiver A+C », « Noël ».
 *
 * Les zones sont regroupées parce qu'afficher trois badges identiques à la lettre près
 * n'apprend rien : ce qui compte est *combien* de zones sont en vacances, donc la pression
 * sur la demande.
 */
export function periodeLabel(arrivee: string, depart: string): string | null {
  const trouvees = findPeriodesForStay(arrivee, depart);
  if (trouvees.length === 0) return null;

  const dominante = trouvees[0];
  const court = shortPeriodeLabel(dominante.nom);
  if (dominante.type === "fete") return court;

  const zones = trouvees
    .filter((p) => p.nom === dominante.nom)
    .map((p) => p.zone.replace(/^Zone\s+/, ""))
    .filter((z) => z !== "Toutes")
    .sort();

  return zones.length > 0 ? `${court} ${zones.join("+")}` : court;
}
