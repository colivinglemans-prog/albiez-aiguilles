#!/usr/bin/env node
/**
 * Rotation du samedi : arrivées et départs interdits tous les autres jours pendant les
 * vacances scolaires d'hiver.
 *
 *   node scripts/rotation-samedi.mjs              # simulation, n'écrit rien
 *   node scripts/rotation-samedi.mjs --appliquer  # écrit dans Beds24
 *   node scripts/rotation-samedi.mjs --annuler    # remet les dates gérées à « aucune règle »
 *   node scripts/rotation-samedi.mjs --du 2026-12-19 --au 2027-03-21
 *
 * **Pourquoi le calendrier et non les tarifs.** Beds24 sait restreindre les jours d'arrivée à
 * deux endroits : les cases « Check-in / Check-out Allowed » d'un Fixed Price, et l'override
 * jour par jour du CALENDRIER. Ici c'est le calendrier, pour trois raisons :
 *   - les prix d'Albiez viennent de **Beyond Pricing**, qui pousse `price1` et `minStay` au
 *     calendrier. Introduire un Fixed Price « vacances scolaires » ferait cohabiter deux
 *     sources de prix sur les mêmes dates, et c'est Beyond qui perdrait ;
 *   - l'override est le seul des deux que l'API v2 expose (`override` dans
 *     `/inventory/rooms/calendar`, énumération `none | blackout | exception | noCheckIn |
 *     noCheckOut | noCheckInOrCheckOut`) — donc le seul rejouable d'une saison sur l'autre ;
 *   - le marquage des jours barrés sur la page de réservation Beds24 (CSS `.datenci` /
 *     `.datenco`) ne fonctionne **que** pour des règles posées au calendrier, jamais pour
 *     celles posées dans un tarif.
 *
 * Beyond Pricing ne touche pas à `override` : les deux écritures ne se marchent pas dessus.
 *
 * ⚠️ Écrire demande le scope **`write:inventory`**, que le `BEDS24_REFRESH_TOKEN` actuel n'a
 * pas (relevé le 2026-09-01 : lecture partout, écriture seulement sur les réservations). Il
 * faut régénérer un token via `scripts/beds24-setup.mjs` avec ce scope coché, sinon Beds24
 * refuse l'écriture.
 */
import { readFileSync } from "node:fs";

process.loadEnvFile(".env.local");

const API = "https://api.beds24.com/v2";
const RESTRICTION = "noCheckInOrCheckOut";
const SAMEDI = 6;

const args = process.argv.slice(2);
const appliquer = args.includes("--appliquer");
const annuler = args.includes("--annuler");
const option = (nom) => {
  const i = args.indexOf(nom);
  return i === -1 ? null : args[i + 1];
};

const jour = (s) => new Date(`${s}T00:00:00Z`);
const iso = (d) => d.toISOString().slice(0, 10);
const decale = (s, n) => {
  const d = jour(s);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
};
const jourSemaine = (s) => jour(s).getUTCDay();
const lisible = (s) =>
  jour(s).toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short", timeZone: "UTC" });

/**
 * La fenêtre par défaut est celle du domaine skiable, pas celle du calendrier scolaire :
 * imposer le samedi aux vacances de la Toussaint ou de printemps fermerait des courts séjours
 * qu'on vend très bien hors saison. `WINTER_OPENING` vit dans `lib/seasons.ts` — une seule
 * source, relue ici pour que la mise à jour annuelle se fasse à un seul endroit.
 */
function fenetreSaison() {
  const src = readFileSync("lib/seasons.ts", "utf8");
  const m = src.match(/WINTER_OPENING\s*=\s*\{\s*from:\s*"(\d{4}-\d{2}-\d{2})",\s*to:\s*"(\d{4}-\d{2}-\d{2})"/);
  if (!m) {
    throw new Error(
      "WINTER_OPENING introuvable dans lib/seasons.ts : passe --du et --au, ou remets la constante en forme.",
    );
  }
  return { du: m[1], au: m[2] };
}

const saison = fenetreSaison();
const DU = option("--du") ?? saison.du;
const AU = option("--au") ?? saison.au;

/** Vacances scolaires (toutes zones) qui recoupent la fenêtre, fusionnées en blocs continus. */
function blocsVacances() {
  const { periodes } = JSON.parse(readFileSync("data/vacances-scolaires.json", "utf8"));
  const retenues = periodes
    // Les entrées `fete` sont des découpes de « Vacances de Noël », déjà couvertes : les
    // garder ne changerait rien après fusion, mais brouillerait l'affichage.
    .filter((p) => p.type === "vacances" && p.fin >= DU && p.debut <= AU)
    .map((p) => ({ nom: p.nom, debut: p.debut < DU ? DU : p.debut, fin: p.fin > AU ? AU : p.fin }))
    .sort((a, b) => a.debut.localeCompare(b.debut));

  const blocs = [];
  for (const p of retenues) {
    const dernier = blocs.at(-1);
    // Deux zones qui s'enchaînent sans trou (fin = veille du début suivant) forment un bloc.
    if (dernier && p.debut <= decale(dernier.fin, 1)) {
      if (p.fin > dernier.fin) dernier.fin = p.fin;
      dernier.noms.add(p.nom);
    } else {
      blocs.push({ debut: p.debut, fin: p.fin, noms: new Set([p.nom]) });
    }
  }
  return blocs;
}

/**
 * Dates à restreindre : tous les jours d'un bloc **sauf les samedis**, jusqu'au vendredi qui
 * précède le samedi suivant le dernier samedi du bloc.
 *
 * Autrement dit : **toute semaine dont le samedi de départ tombe dans les vacances est
 * protégée jusqu'au bout**, y compris la dernière, qui déborde des vacances. Sans ce
 * débordement, un voyageur peut arriver le dimanche qui suit la dernière rotation et occuper
 * la semaine en travers — le samedi de rotation reste alors invendable. C'est la règle
 * appliquée à la main dans Beds24 le 2026-09-01 (février : restreint jusqu'au 12 mars, pour
 * une dernière rotation le 13, alors que la zone B rentre le 8).
 */
function datesRestreintes(blocs) {
  const dates = new Set();
  for (const bloc of blocs) {
    let dernierSamedi = null;
    for (let d = bloc.debut; d <= bloc.fin; d = decale(d, 1)) if (jourSemaine(d) === SAMEDI) dernierSamedi = d;
    if (!dernierSamedi) {
      console.warn(`  ⚠️ ${bloc.debut} → ${bloc.fin} : aucun samedi dans le bloc, ignoré.`);
      continue;
    }
    const fin = decale(dernierSamedi, 6); // vendredi veille de la rotation suivante
    for (let d = bloc.debut; d <= fin; d = decale(d, 1)) {
      if (jourSemaine(d) !== SAMEDI) dates.add(d);
    }
  }
  return dates;
}

async function obtenirJeton() {
  const refreshToken = process.env.BEDS24_REFRESH_TOKEN;
  if (!refreshToken) throw new Error("BEDS24_REFRESH_TOKEN absent de .env.local");
  const res = await fetch(`${API}/authentication/token`, { headers: { refreshToken } });
  const body = await res.text();
  if (!res.ok) throw new Error(`authentication/token ${res.status} : ${body.slice(0, 200)}`);
  return JSON.parse(body).token;
}

const propertyId = process.env.BEDS24_PROPERTY_ID;
if (!propertyId) throw new Error("BEDS24_PROPERTY_ID absent de .env.local");

const blocs = blocsVacances();
if (blocs.length === 0) {
  console.log(`Aucune période de vacances entre ${DU} et ${AU}. Rien à faire.`);
  process.exit(0);
}

console.log(`\nFenêtre : ${DU} → ${AU}  (saison de ski, lib/seasons.ts)\n`);
for (const b of blocs) {
  console.log(`  ${b.debut} → ${b.fin}   ${[...b.noms].join(" / ")}`);
}

const voulues = datesRestreintes(blocs);
const jeton = await obtenirJeton();

async function appel(chemin, params = {}) {
  const url = new URL(API + chemin);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { token: jeton } });
  const body = await res.text();
  if (!res.ok) throw new Error(`${chemin} ${res.status} : ${body.slice(0, 300)}`);
  return JSON.parse(body);
}

/**
 * La lecture se cale sur les dates calculées, pas sur les blocs de vacances : la dernière
 * semaine protégée déborde des vacances, et une date hors fenêtre de lecture serait lue comme
 * « aucune règle » puis réécrite pour rien.
 *
 * Beds24 compacte les jours consécutifs de même valeur : on redéplie pour comparer date à date.
 */
const bornes = [...voulues].sort();
const { data: chambres = [] } = await appel("/inventory/rooms/calendar", {
  propertyId,
  startDate: bornes[0],
  endDate: bornes.at(-1),
  includeOverride: "true",
});

const modifications = [];
const conflits = [];

for (const chambre of chambres) {
  const actuel = new Map();
  for (const tranche of chambre.calendar ?? []) {
    for (let d = tranche.from; d <= tranche.to; d = decale(d, 1)) actuel.set(d, tranche.override ?? "none");
  }

  const cible = new Map();
  for (const date of voulues) {
    const courant = actuel.get(date) ?? "none";
    // `blackout` et `exception` sont des décisions d'inventaire (dates fermées, dérogation) :
    // les écraser ferait disparaître une fermeture sans que personne le voie passer.
    if (courant === "blackout" || courant === "exception") {
      conflits.push({ roomId: chambre.roomId, date, courant });
      continue;
    }
    if (annuler && courant !== RESTRICTION) continue; // on n'annule que ce qu'on a posé
    const veut = annuler ? "none" : RESTRICTION;
    if (courant !== veut) cible.set(date, veut);
  }

  // Regroupement en plages [from, to] : une écriture par semaine plutôt qu'une par jour.
  const plages = [];
  let plage = null;
  for (const date of [...cible.keys()].sort()) {
    const veut = cible.get(date);
    if (plage && plage.override === veut && date === decale(plage.to, 1)) plage.to = date;
    else plages.push((plage = { from: date, to: date, override: veut }));
  }
  if (plages.length) modifications.push({ roomId: chambre.roomId, calendar: plages });
}

console.log(
  `\n${voulues.size} jours concernés — ` +
    `${modifications.reduce((n, m) => n + m.calendar.length, 0)} plage(s) à écrire ` +
    `sur ${modifications.length} chambre(s).`,
);

for (const { roomId, calendar } of modifications) {
  console.log(`\n  room ${roomId}`);
  for (const p of calendar) console.log(`    ${lisible(p.from)} → ${lisible(p.to)}   ${p.override}`);
}

if (conflits.length) {
  console.log(`\n  ⚠️ ${conflits.length} date(s) laissée(s) telles quelles (blackout / exception) :`);
  for (const c of conflits.slice(0, 10)) console.log(`     room ${c.roomId}  ${c.date}  ${c.courant}`);
  if (conflits.length > 10) console.log(`     … et ${conflits.length - 10} autres`);
}

/**
 * Pas de `process.exit()` après un appel réseau : sous Windows, couper pendant qu'une socket
 * undici vit encore fait tomber Node sur une assertion libuv, code de sortie 127. Le script se
 * termine donc naturellement, et signale l'échec par `process.exitCode`.
 */
async function ecrire() {
  const details = await appel("/authentication/details");
  if (!details.token?.scopes?.includes("write:inventory")) {
    console.error(
      "\n✗ Ce token n'a pas le scope write:inventory — l'écriture au calendrier serait refusée.\n" +
        "  Génère un invite code depuis le sub account Albiez (Settings → Apps & Integrations → API)\n" +
        "  en cochant write:inventory, puis : node scripts/beds24-setup.mjs <INVITE_CODE> albiez-inventory\n",
    );
    process.exitCode = 1;
    return;
  }

  const res = await fetch(`${API}/inventory/rooms/calendar`, {
    method: "POST",
    headers: { token: jeton, "Content-Type": "application/json" },
    body: JSON.stringify(modifications),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`\n✗ POST /inventory/rooms/calendar ${res.status} : ${body.slice(0, 500)}`);
    process.exitCode = 1;
    return;
  }
  const reponse = JSON.parse(body);
  const echecs = (Array.isArray(reponse) ? reponse : [reponse]).filter((r) => r?.success === false);
  if (echecs.length) {
    console.error(`\n✗ Beds24 a refusé ${echecs.length} écriture(s) :`, JSON.stringify(echecs).slice(0, 500));
    process.exitCode = 1;
    return;
  }

  console.log(`\n✓ Écrit. ${annuler ? "Restrictions retirées." : "Arrivées et départs limités au samedi."}`);
  console.log("  Vérifie dans le CALENDAR Beds24, puis pousse une mise à jour aux canaux si besoin.\n");
}

if (modifications.length === 0) {
  console.log("\n✓ Le calendrier Beds24 est déjà dans l'état voulu.");
} else if (!appliquer && !annuler) {
  console.log("\nSimulation. Rien n'a été écrit — relance avec --appliquer.\n");
} else {
  await ecrire();
}
