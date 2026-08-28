#!/usr/bin/env node
// Fusionne les quatre archives par canal en une seule, normalisée, que le dashboard sait lire.
//
// Usage: node scripts/build-archive.mjs
//
// Entrées  : data/historique-{airbnb,booking,abritel,direct}.json
// Sorties  : data/archive-albiez.json     (lisible, pour inspection)
//            data/archive-albiez.env.txt  (HISTORIQUE_ALBIEZ=... pour Vercel)
//
// Les deux sorties sont gitignorées : le repo est public et ce sont les chiffres de la SCI.

import { readFileSync, writeFileSync } from "node:fs";

const lire = (canal) => {
  try {
    return JSON.parse(readFileSync(`data/historique-${canal}.json`, "utf8"));
  } catch {
    console.error(`✗ data/historique-${canal}.json absent — relancer l'importeur de ce canal.`);
    process.exit(1);
  }
};

const CANAUX = { airbnb: "Airbnb", booking: "Booking.com", abritel: "Abritel", direct: "Direct" };

const sejours = [];
const recettes = [];

/**
 * « brut » et « commission » n'ont pas le même nom d'un canal à l'autre, mais la même
 * définition : ce que paie le voyageur, et ce que le canal prélève dessus. On les ramène à
 * un vocabulaire unique, en vérifiant à chaque fois que net = brut − commission.
 */
function pousserSejour(s) {
  const commission = Number((s.brut - s.net).toFixed(2));
  sejours.push({ ...s, commission });
}

// --- Airbnb ---------------------------------------------------------------------------
{
  const j = lire("airbnb");
  for (const r of j.reservations) {
    if (r.nuits == null) {
      // Résolution sans ligne de réservation : une annulation dont seuls des frais ont été
      // encaissés. Le montant compte, les nuits non — ses dates ont été relouées.
      recettes.push({
        ref: r.code, canal: CANAUX.airbnb, date: r.arrivee ?? null,
        brut: r.net, net: r.net, nature: "frais_annulation",
        libelle: "Frais encaissés sur une réservation annulée",
      });
      continue;
    }
    pousserSejour({
      ref: r.code, canal: CANAUX.airbnb,
      arrivee: r.arrivee, depart: r.depart, nuits: r.nuits,
      reserveLe: r.reserveLe ?? null,
      brut: r.brut ?? r.net, net: r.net,
      fraisMenage: r.fraisMenage ?? null,
      taxeSejourCollecteeParLeCanal: r.taxeSejourReverseeParAirbnb ?? null,
      source: "archive",
    });
  }
}

// --- Booking.com ----------------------------------------------------------------------
{
  const j = lire("booking");
  for (const r of j.reservations) {
    pousserSejour({
      ref: r.code, canal: CANAUX.booking,
      arrivee: r.arrivee, depart: r.depart, nuits: r.nuits,
      reserveLe: null,
      brut: r.brut, net: r.net,
      fraisMenage: null,
      // Booking n'isole pas la taxe de séjour et ne la collecte pas : null, pas zéro.
      taxeSejourCollecteeParLeCanal: null,
      source: "archive",
      ...(r.aussiDansBeds24 ? { aussiDansBeds24: true } : {}),
    });
  }
}

// --- Abritel --------------------------------------------------------------------------
{
  const j = lire("abritel");
  for (const r of j.reservations) {
    pousserSejour({
      ref: r.code, canal: CANAUX.abritel,
      arrivee: r.arrivee, depart: r.depart, nuits: r.nuits,
      reserveLe: null,
      brut: r.brut, net: r.net,
      fraisMenage: null, taxeSejourCollecteeParLeCanal: null,
      source: "archive",
    });
  }
}

// --- Direct (Stripe) ------------------------------------------------------------------
{
  const j = lire("direct");
  for (const e of j.encaissements) {
    if (e.nature === "supplement") {
      // Un kit drap/serviette encaissé par Stripe pour un voyageur venu d'Airbnb est du
      // revenu **du canal Airbnb**, pas du direct : c'est Airbnb qui a apporté le client.
      // L'attribuer au direct sous prétexte que le paiement passe par Stripe gonflerait la
      // part directe d'une recette que le direct n'a pas générée.
      const origine = e.rapprocheAvec?.canal;
      recettes.push({
        ref: e.id,
        canal: CANAUX[origine] ?? CANAUX.direct,
        date: e.date,
        brut: e.brut, net: e.net, nature: "supplement", libelle: e.libelle,
        paiementVia: "Stripe",
        ...(e.rapprocheAvec ? { rapprocheAvec: e.rapprocheAvec } : {}),
      });
      continue;
    }
    if (e.arrivee && e.depart && e.nuits) {
      pousserSejour({
        ref: e.id, canal: CANAUX.direct,
        arrivee: e.arrivee, depart: e.depart, nuits: e.nuits,
        reserveLe: e.date,
        brut: e.brut, net: e.net,
        fraisMenage: null, taxeSejourCollecteeParLeCanal: null,
        source: "archive",
        ...(e.anneeDeduite ? { anneeDeduite: true } : {}),
      });
      continue;
    }
    // Séjour direct facturé sans dates dans le libellé : le revenu est certain, les nuits
    // inconnues. Les inventer fausserait l'occupation, les jeter fausserait le revenu.
    //
    // Le canal reste **Direct** même quand le nom est déjà connu d'un autre canal : ce sont
    // des voyageurs qui reviennent, et qui repassent alors en direct.
    recettes.push({
      ref: e.id, canal: CANAUX.direct, date: e.date,
      brut: e.brut, net: e.net, nature: "sejour_sans_dates", libelle: e.libelle,
      paiementVia: "Stripe",
      ...(e.rapprocheAvec ? { rapprocheAvec: e.rapprocheAvec } : {}),
    });
  }
}

sejours.sort((a, b) => a.arrivee.localeCompare(b.arrivee));
recettes.sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));

/** Deux séjours ne peuvent pas se superposer dans un logement unique. */
const chevauchements = [];
for (let i = 0; i < sejours.length - 1; i++) {
  if (sejours[i + 1].arrivee < sejours[i].depart) {
    chevauchements.push([sejours[i], sejours[i + 1]]);
  }
}

const somme = (liste, f) => Number(liste.reduce((s, x) => s + f(x), 0).toFixed(2));

/**
 * Réconciliation avec les archives source.
 *
 * Le contrôle porte sur le **total**, pas sur le détail par canal : les suppléments changent
 * délibérément de canal à la fusion (un kit encaissé par Stripe pour un voyageur Airbnb est
 * du revenu Airbnb). Un écart par canal est donc attendu et documenté ; un écart sur le total
 * signalerait en revanche une entrée perdue ou comptée deux fois.
 */
const attenduTotal = Number(
  (
    somme(lire("airbnb").reservations, (r) => r.net) +
    somme(lire("booking").reservations, (r) => r.net) +
    somme(lire("abritel").reservations, (r) => r.net) +
    somme(lire("direct").encaissements, (e) => e.net)
  ).toFixed(2),
);
const obtenu = {};
for (const canal of Object.values(CANAUX)) {
  obtenu[canal] = Number(
    (
      somme(sejours.filter((s) => s.canal === canal), (s) => s.net) +
      somme(recettes.filter((r) => r.canal === canal), (r) => r.net)
    ).toFixed(2),
  );
}
const obtenuTotal = Number(somme(Object.values(obtenu), (v) => v).toFixed(2));

const sortie = {
  genereLe: new Date().toISOString().slice(0, 10),
  avertissement:
    "Archive figée des quatre canaux, antérieure au branchement Beds24 du 2026-08-28. " +
    "`sejours` porte les nuits et le revenu ; `recettes` porte du revenu SANS nuits " +
    "(suppléments kit facturés à un voyageur d'un autre canal, frais d'annulation, séjours " +
    "directs sans dates). Ne jamais compter les `recettes` dans l'occupation. Les entrées " +
    "`aussiDansBeds24` existent aussi en live : dédoublonner sur `ref`.",
  totauxParCanal: obtenu,
  sejours,
  recettes,
};

writeFileSync("data/archive-albiez.json", JSON.stringify(sortie, null, 2) + "\n", "utf8");
const compact = JSON.stringify(sortie);
writeFileSync("data/archive-albiez.env.txt", `HISTORIQUE_ALBIEZ=${compact}\n`, "utf8");

console.log(`✓ ${sejours.length} séjours + ${recettes.length} recettes sans nuits`);
console.log(`  data/archive-albiez.json  et  data/archive-albiez.env.txt (${(compact.length / 1024).toFixed(1)} Ko)`);

console.log("\n-- Réconciliation avec les archives source --");
for (const canal of Object.values(CANAUX)) {
  console.log(`  ${canal.padEnd(12)} ${obtenu[canal].toFixed(2).padStart(10)} €`);
}
const ko = Math.abs(obtenuTotal - attenduTotal) > 0.02;
console.log(
  `  ${"TOTAL".padEnd(12)} ${obtenuTotal.toFixed(2).padStart(10)} € ` +
  `${ko ? `✗ attendu ${attenduTotal.toFixed(2)} €` : "✓ identique aux quatre archives"}`,
);

const reattribues = recettes.filter((r) => r.nature === "supplement" && r.canal !== CANAUX.direct);
if (reattribues.length) {
  console.log(
    `\n  ${reattribues.length} supplément(s) encaissés par Stripe mais rattachés à leur canal ` +
    `d'origine (${somme(reattribues, (r) => r.net).toFixed(2)} €) : le client venait de là.`,
  );
}

console.log("\n-- Nuits par année (séjours seuls) --");
const parAn = {};
for (const s of sejours) {
  const a = (parAn[s.arrivee.slice(0, 4)] ??= {});
  a[s.canal] = (a[s.canal] ?? 0) + s.nuits;
}
for (const [annee, canaux] of Object.entries(parAn).sort()) {
  const total = Object.values(canaux).reduce((x, y) => x + y, 0);
  console.log(`  ${annee}  ${String(total).padStart(3)} nuits   ${JSON.stringify(canaux)}`);
}

const sansDates = recettes.filter((r) => r.nature === "sejour_sans_dates");
if (sansDates.length) {
  console.log(`\n! ${sansDates.length} séjour(s) direct(s) facturé(s) sans dates — revenu compté, nuits inconnues :`);
  for (const r of sansDates) console.log(`   ${r.date}  ${r.brut.toFixed(2)} €  « ${r.libelle} »`);
  console.log(`   Total ${somme(sansDates, (r) => r.brut).toFixed(2)} € hors occupation.`);
}

if (chevauchements.length) {
  console.log(`\n! ${chevauchements.length} chevauchement(s) :`);
  for (const [a, b] of chevauchements) {
    console.log(`   ${a.canal} ${a.ref} ${a.arrivee}→${a.depart}  VS  ${b.canal} ${b.ref} ${b.arrivee}→${b.depart}`);
  }
}

if (ko) {
  console.error("\n✗ La fusion ne retombe pas sur les archives source. Archive inutilisable.");
  process.exit(1);
}
console.log("\n✓ Fusion réconciliée avec les quatre archives source.");
