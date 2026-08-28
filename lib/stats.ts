import type {
  Canal,
  CanauxAnnee,
  ComparaisonAnnee,
  ModeRevenu,
  RevenueChartData,
  Sejour,
} from "@/lib/dashboard-types";
import { CANAUX } from "@/lib/canal";

/**
 * Calculs du dashboard.
 *
 * Un parti pris à connaître avant de lire les chiffres : **la série de référence est le net
 * encaissé**, pas le chiffre d'affaires brut. Deux raisons.
 *
 * D'abord c'est ce qui arrive réellement sur le compte. Ensuite, et surtout, c'est la seule
 * série comparable d'une année sur l'autre : les frais de service Airbnb passent de 3,6 % à
 * 18 % entre le 9 et le 22 mars 2024 (bascule du modèle partagé vers *host-only*). Le brut
 * change donc de définition au milieu de l'historique — avant, il exclut la commission
 * voyageur ; après, il l'inclut. Une courbe de brut à cheval sur cette date affiche une
 * croissance qui n'existe pas. Le brut reste exposé dans les cartes, à côté du net et des
 * commissions, mais il ne sert pas à comparer les années.
 */

export const MOIS_COURTS = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc.",
];

export function ajouterJours(jour: string, n: number): string {
  const d = new Date(`${jour}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function joursEntre(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/** Aujourd'hui à Paris. Vercel tourne en UTC : `toISOString()` décale huit mois par an. */
export function aujourdhui(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });
}

/**
 * Ventile le revenu d'un séjour dans le temps selon la convention choisie.
 *
 * `reparti` est le défaut : le revenu tombe là où sont les nuits, donc là où est
 * l'occupation. C'est la seule convention qui rende le graphe mensuel cohérent avec le taux
 * de remplissage — un séjour de seize nuits à cheval sur deux mois compterait sinon
 * entièrement dans l'un des deux.
 */
export function ventiler(sejour: Sejour, mode: ModeRevenu): { jour: string; montant: number }[] {
  const montant = sejour.net;
  switch (mode) {
    case "arrivee":
      return [{ jour: sejour.arrivee, montant }];
    case "depart":
      return [{ jour: sejour.depart, montant }];
    case "reservation":
      return [{ jour: sejour.reserveLe ?? sejour.arrivee, montant }];
    case "reparti":
    default: {
      if (sejour.nuits <= 0) return [{ jour: sejour.arrivee, montant }];
      const parNuit = montant / sejour.nuits;
      return Array.from({ length: sejour.nuits }, (_, i) => ({
        jour: ajouterJours(sejour.arrivee, i),
        montant: parNuit,
      }));
    }
  }
}

/** Les nuits d'un séjour, une par jour — base de tous les calculs d'occupation. */
export function nuitsDuSejour(sejour: Sejour): string[] {
  return Array.from({ length: Math.max(0, sejour.nuits) }, (_, i) => ajouterJours(sejour.arrivee, i));
}

const arrondi = (n: number) => Math.round(n * 100) / 100;

/**
 * Matrice année × mois et matrice canal × mois, dans la forme exacte qu'attend le graphe.
 *
 * Cette fonction ne connaît ni Albiez, ni Beds24 : elle prend des séjours et rend des lignes.
 * C'est ce qui permettra à Barbusse de reprendre le composant l'an prochain sans le réécrire.
 */
export function construireGraphe(sejours: Sejour[], mode: ModeRevenu): RevenueChartData {
  const parAnneeMois = new Map<string, number>();
  const parCanalMois = new Map<string, number>();
  const annees = new Set<number>();

  for (const s of sejours) {
    for (const { jour, montant } of ventiler(s, mode)) {
      const annee = Number(jour.slice(0, 4));
      const mois = Number(jour.slice(5, 7)) - 1;
      annees.add(annee);
      parAnneeMois.set(`${annee}|${mois}`, (parAnneeMois.get(`${annee}|${mois}`) ?? 0) + montant);
      const cleC = `${annee}|${s.canal}|${mois}`;
      parCanalMois.set(cleC, (parCanalMois.get(cleC) ?? 0) + montant);
    }
  }

  const listeAnnees = [...annees].sort();
  const parAnnee = MOIS_COURTS.map((nom, mois) => {
    const ligne: Record<string, number | string> = { mois: nom };
    for (const annee of listeAnnees) {
      ligne[String(annee)] = arrondi(parAnneeMois.get(`${annee}|${mois}`) ?? 0);
    }
    return ligne;
  });

  // Les canaux présents sont calculés sur l'ensemble de l'historique, pas année par année :
  // une série qui apparaît et disparaît d'une année à l'autre ferait changer les couleurs de
  // la légende à chaque bascule.
  const canauxPresents = CANAUX.filter((c) =>
    listeAnnees.some((a) =>
      MOIS_COURTS.some((_, mois) => (parCanalMois.get(`${a}|${c}|${mois}`) ?? 0) > 0),
    ),
  );

  const parCanal: Record<string, Record<string, number | string>[]> = {};
  for (const annee of listeAnnees) {
    parCanal[String(annee)] = MOIS_COURTS.map((nom, mois) => {
      const ligne: Record<string, number | string> = { mois: nom };
      for (const canal of canauxPresents) {
        ligne[canal] = arrondi(parCanalMois.get(`${annee}|${canal}|${mois}`) ?? 0);
      }
      return ligne;
    });
  }

  const today = aujourdhui();
  return {
    parAnnee,
    parCanal,
    annees: listeAnnees,
    canaux: canauxPresents,
    anneeCourante: Number(today.slice(0, 4)),
    dernierMoisEcoule: Number(today.slice(5, 7)),
  };
}

/**
 * Répartition par canal, année par année.
 *
 * Le rattachement se fait sur **l'année d'arrivée** du séjour et non sur la ventilation du
 * revenu : un séjour appartient à un canal en entier, le découper entre deux années pour
 * quelques nuits de décembre n'apprendrait rien sur le mix de canaux.
 */
export function canauxParAnnee(sejours: Sejour[]): CanauxAnnee[] {
  const parAnnee = new Map<number, Map<Canal, { sejours: number; revenu: number }>>();
  for (const s of sejours) {
    const annee = Number(s.arrivee.slice(0, 4));
    const m = parAnnee.get(annee) ?? new Map();
    const e = m.get(s.canal) ?? { sejours: 0, revenu: 0 };
    e.sejours += 1;
    e.revenu += s.net;
    m.set(s.canal, e);
    parAnnee.set(annee, m);
  }

  const anneeCourante = Number(aujourdhui().slice(0, 4));
  return [...parAnnee.keys()]
    .sort()
    .map((annee) => {
      const m = parAnnee.get(annee)!;
      const total = [...m.values()].reduce((s, e) => s + e.revenu, 0);
      return {
        annee,
        total: arrondi(total),
        enCours: annee === anneeCourante,
        canaux: CANAUX.filter((c) => m.has(c)).map((canal) => ({
          canal,
          sejours: m.get(canal)!.sejours,
          revenu: arrondi(m.get(canal)!.revenu),
          part: total > 0 ? arrondi((m.get(canal)!.revenu / total) * 100) : 0,
        })),
      };
    });
}

/**
 * Comparaison des années à **fenêtre égale** : du 1er janvier au même rang de jour dans
 * l'année. C'est le seul pourcentage honnête — opposer huit mois de l'année en cours à douze
 * mois de la précédente afficherait un effondrement imaginaire.
 *
 * La fenêtre est calculée en rang de jour et non en « même jour du mois », ce qui règle au
 * passage le 29 février : le rang existe dans toutes les années, la date non.
 */
export function comparerAnnees(
  sejours: Sejour[],
  mode: ModeRevenu,
  projectionAnneeCourante: number | null,
): ComparaisonAnnee[] {
  const today = aujourdhui();
  const anneeCourante = Number(today.slice(0, 4));
  const rangDuJour = joursEntre(`${anneeCourante}-01-01`, today); // 0 = 1er janvier

  const cumuls = new Map<number, { aDate: number; total: number; nuitsADate: number }>();
  const bucket = (a: number) => {
    let b = cumuls.get(a);
    if (!b) cumuls.set(a, (b = { aDate: 0, total: 0, nuitsADate: 0 }));
    return b;
  };

  for (const s of sejours) {
    for (const { jour, montant } of ventiler(s, mode)) {
      const annee = Number(jour.slice(0, 4));
      const b = bucket(annee);
      b.total += montant;
      if (joursEntre(`${annee}-01-01`, jour) <= rangDuJour) b.aDate += montant;
    }
    for (const nuit of nuitsDuSejour(s)) {
      const annee = Number(nuit.slice(0, 4));
      const b = bucket(annee);
      if (joursEntre(`${annee}-01-01`, nuit) <= rangDuJour) b.nuitsADate += 1;
    }
  }

  const annees = [...cumuls.keys()].sort();
  return annees.map((annee, i) => {
    const b = cumuls.get(annee)!;
    const precedente = i > 0 ? cumuls.get(annees[i - 1])! : null;
    const enCours = annee === anneeCourante;
    return {
      annee,
      cumulADate: arrondi(b.aDate),
      nuitsADate: b.nuitsADate,
      variationADate:
        precedente && precedente.aDate > 0
          ? arrondi(((b.aDate - precedente.aDate) / precedente.aDate) * 100)
          : null,
      totalAnnee: enCours ? null : arrondi(b.total),
      enCours,
      ...(enCours && projectionAnneeCourante != null
        ? { projection: arrondi(projectionAnneeCourante) }
        : {}),
    };
  });
}

/**
 * Nuits vendues sur une fenêtre, sans double comptage : un jour occupé compte une fois,
 * même si deux séjours se recouvrent (ce qui n'arrive que sur une coquille de données).
 */
export function nuitsOccupees(sejours: Sejour[], du: string, au: string): number {
  const jours = new Set<string>();
  for (const s of sejours) {
    for (const nuit of nuitsDuSejour(s)) {
      if (nuit >= du && nuit <= au) jours.add(nuit);
    }
  }
  return jours.size;
}

export function repartitionCanaux(sejours: Sejour[]): { canal: string; sejours: number; revenu: number }[] {
  const parCanal = new Map<Canal, { sejours: number; revenu: number }>();
  for (const s of sejours) {
    const e = parCanal.get(s.canal) ?? { sejours: 0, revenu: 0 };
    e.sejours += 1;
    e.revenu += s.net;
    parCanal.set(s.canal, e);
  }
  return CANAUX.filter((c) => parCanal.has(c)).map((canal) => ({
    canal,
    sejours: parCanal.get(canal)!.sejours,
    revenu: arrondi(parCanal.get(canal)!.revenu),
  }));
}
