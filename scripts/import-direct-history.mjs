#!/usr/bin/env node
// Convertit l'export « Détail de l'évolution du solde selon l'activité » de Stripe en
// archive JSON : montants par mois, plus une ligne par encaissement.
//
// Usage: node scripts/import-direct-history.mjs <stripe.csv> [--airbnb <csv>] [--booking <csv> ...]
//
// Le compte Stripe d'Albiez N'EST PAS « le canal direct ». Il porte deux natures de
// recettes qu'il faut séparer, sans quoi les nuits sont comptées deux fois :
//
//   - des SUPPLÉMENTS facturés à un voyageur venu d'un autre canal (kit drap/serviette
//     surtout) : recette réelle, absente des relevés du canal, mais AUCUNE nuit à
//     ajouter, le séjour est déjà compté côté Airbnb ou Booking ;
//   - de vraies RÉSERVATIONS DIRECTES, avec leurs nuits.
//
// La séparation se fait en rapprochant le nom du client Stripe des noms de voyageurs des
// autres canaux — d'où les exports optionnels passés en argument. AUCUN NOM N'EST ÉCRIT
// dans la sortie : le repo est public. Les noms ne servent qu'au rapprochement en mémoire.

import { readFileSync, writeFileSync } from "node:fs";

function parseCsv(text) {
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(f); f = ""; }
    else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; }
    else if (c !== "\r") f += c;
  }
  if (f !== "" || row.length) { row.push(f); rows.push(row); }
  return rows;
}
const lire = (p) => parseCsv(readFileSync(p, "utf8").replace(/^﻿/, ""));

/** Rapprochement de noms tolérant : accents, casse, ordre des mots, civilités.
 *  « Benoit Perreau » et « Perreau Benoit » doivent se reconnaître. */
const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
  .replace(/[^a-z ]/g, " ").split(/\s+/).filter((w) => w.length > 2).sort().join(" ");

const args = process.argv.slice(2);
const stripePath = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1]?.startsWith("--") !== true);
if (!stripePath) {
  console.error("Usage: node scripts/import-direct-history.mjs <stripe.csv> [--airbnb <csv>] [--booking <csv> ...]");
  process.exit(1);
}
const optionnels = (nom) => args.reduce((acc, a, i) => (a === `--${nom}` && args[i + 1] ? [...acc, args[i + 1]] : acc), []);

/** Noms de voyageurs des autres canaux, lus depuis leurs exports d'origine. */
const autres = [];
for (const p of optionnels("airbnb")) {
  const [h, ...r] = lire(p);
  const [iN, iC, iT] = ["Voyageur", "Code de confirmation", "Type"].map((n) => h.indexOf(n));
  for (const x of r) if (x[iN] && x[iT]?.trim() === "Réservation") autres.push({ canal: "airbnb", nom: x[iN], code: x[iC] });
}
for (const p of optionnels("booking")) {
  const [h, ...r] = lire(p);
  const [iN, iC] = ["Guest name", "Booking number"].map((n) => h.indexOf(n));
  for (const x of r) if (x[iN]) autres.push({ canal: "booking", nom: x[iN], code: x[iC] });
}
for (const p of optionnels("abritel")) {
  // Abritel n'a pas d'export : un fichier texte « nom<TAB>code » par ligne suffit.
  for (const l of readFileSync(p, "utf8").split("\n")) {
    const [nom, code] = l.split("\t");
    if (nom?.trim()) autres.push({ canal: "abritel", nom: nom.trim(), code: (code || "").trim() });
  }
}

const MOIS_FR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** Les factures directes portent les dates dans le libellé du produit :
 *  « Séjour du 30 avril au 16 mai 2026 ». L'année manque parfois sur la première borne
 *  comme sur les deux — on la déduit alors de l'année de l'encaissement, et on le signale. */
function sejourDepuisLibelle(libelle, anneeEncaissement) {
  const m = (libelle || "").toLowerCase().match(
    /s[ée]jour du (\d{1,2})(?:er)? ([a-zûéaô]+)(?: (\d{4}))? au (\d{1,2})(?:er)? ([a-zûéaô]+)(?: (\d{4}))?/i
  );
  if (!m) return null;
  const mois = (nom) => MOIS_FR.findIndex((x) => x.normalize("NFD").replace(/[̀-ͯ]/g, "") === nom.normalize("NFD").replace(/[̀-ͯ]/g, ""));
  const m1 = mois(m[2]), m2 = mois(m[5]);
  if (m1 < 0 || m2 < 0) return null;
  const a2 = Number(m[6] ?? m[3] ?? anneeEncaissement);
  const a1 = Number(m[3] ?? (m1 > m2 ? a2 - 1 : a2)); // à cheval sur le nouvel an
  const iso = (a, mo, j) => `${a}-${String(mo + 1).padStart(2, "0")}-${String(j).padStart(2, "0")}`;
  const arrivee = iso(a1, m1, Number(m[1])), depart = iso(a2, m2, Number(m[4]));
  return {
    arrivee, depart,
    nuits: Math.round((Date.parse(depart) - Date.parse(arrivee)) / 86_400_000),
    anneeDeduite: !m[3] && !m[6],
  };
}

const [h, ...rows] = lire(stripePath);
const c = (n) => {
  const i = h.indexOf(n);
  if (i === -1) throw new Error(`Colonne absente de l'export Stripe : « ${n} »`);
  return i;
};

const encaissements = [];
let fraisAbonnement = 0, autresCategories = new Map();

for (const x of rows) {
  if (!x[c("balance_transaction_id")]) continue;
  const categorie = x[c("reporting_category")];
  const brut = Number(x[c("gross")]) || 0, frais = Number(x[c("fee")]) || 0;

  if (categorie !== "charge") {
    // « fee » = abonnement Stripe Invoicing, pas un frais par transaction. C'est un coût
    // du canal, jamais une recette : il ne doit pas entrer dans le brut.
    autresCategories.set(categorie, (autresCategories.get(categorie) ?? 0) + brut);
    if (categorie === "fee") fraisAbonnement += brut;
    continue;
  }

  const date = x[c("created")].slice(0, 10);
  const libelle = x[c("product_names")] || x[c("description")] || "";
  const nom = x[c("customer_name")], indice = (x[c("customer_description")] || "").trim();
  const nn = norm(nom);
  const correspondance = nn ? autres.find((a) => norm(a.nom) === nn) : null;
  const contientNuit = /nuit/i.test(libelle);
  const sejour = sejourDepuisLibelle(libelle, Number(date.slice(0, 4)));

  // Un nom connu d'un autre canal + aucune nuit facturée = supplément sur ce séjour.
  // Un nom connu + des nuits facturées = un séjour en direct : les voyageurs qui reviennent
  // repassent en direct (règle donnée par l'utilisateur, 2026-08-28). Ce n'est donc pas une
  // prolongation du séjour OTA, et ces nuits sont bien à compter.
  const nature = correspondance && !contientNuit ? "supplement" : "direct";

  // Le kit drap/serviette est facturé 15 € par personne : un supplément doit être un
  // multiple de 15. Sinon le libellé ou le tarif a changé, et le tri mérite un œil.
  const kitIncoherent = nature === "supplement" && Math.abs(brut % 15) > 0.005;

  encaissements.push({
    id: x[c("balance_transaction_id")],
    canal: "direct",
    nature,
    date,
    mois: date.slice(0, 7),
    libelle,
    brut: Number(brut.toFixed(2)),
    fraisStripe: Number(frais.toFixed(2)),
    net: Number((brut - frais).toFixed(2)),
    ...(correspondance ? { rapprocheAvec: { canal: correspondance.canal, code: correspondance.code } } : {}),
    ...(nature === "supplement" ? { personnesKit: Number((brut / 15).toFixed(2)) } : {}),
    ...(kitIncoherent ? { kitIncoherent: true } : {}),
    ...(indice ? { indiceCanal: indice } : {}),
    ...(sejour ? { arrivee: sejour.arrivee, depart: sejour.depart, nuits: sejour.nuits, ...(sejour.anneeDeduite ? { anneeDeduite: true } : {}) } : {}),
  });
}

encaissements.sort((a, b) => a.date.localeCompare(b.date));

/** Contrôle : net = brut - frais, ligne par ligne. */
const ecarts = encaissements.filter((e) => Math.abs(e.net - (e.brut - e.fraisStripe)) > 0.005);

const mois = {};
for (const e of encaissements) {
  const m = (mois[e.mois] ??= { encaissements: 0, brut: 0, fraisStripe: 0, net: 0, brutDirect: 0, brutSupplements: 0, nuits: 0 });
  m.encaissements++;
  m.brut += e.brut; m.fraisStripe += e.fraisStripe; m.net += e.net;
  if (e.nature === "direct") m.brutDirect += e.brut;
  else m.brutSupplements += e.brut;
  if (e.nature === "direct" && e.nuits) m.nuits += e.nuits;
}
for (const m of Object.values(mois)) {
  for (const k of ["brut", "fraisStripe", "net", "brutDirect", "brutSupplements"]) m[k] = Number(m[k].toFixed(2));
}

const total = (f) => Number(encaissements.reduce((s, e) => s + f(e), 0).toFixed(2));
const out = {
  source: "Export Stripe « Détail de l'évolution du solde selon l'activité »",
  genereLe: new Date().toISOString().slice(0, 10),
  avertissement:
    "Ce compte Stripe n'est pas « le canal direct » : il mélange des réservations directes " +
    "(nature: direct) et des suppléments facturés à des voyageurs venus d'Airbnb, Booking ou " +
    "Abritel (nature: supplement) — recette réelle, mais AUCUNE nuit à ajouter, le séjour est " +
    "déjà compté dans le canal d'origine. Un nom déjà vu ailleurs AVEC des nuits facturées reste " +
    "du direct : les voyageurs qui reviennent repassent en direct. La date est celle de " +
    "l'encaissement, pas du séjour. Aucun nom de client (repo public).",
  fraisAbonnementInvoicing: Number(fraisAbonnement.toFixed(2)),
  totaux: {
    brut: total((e) => e.brut),
    fraisStripe: total((e) => e.fraisStripe),
    net: total((e) => e.net),
    brutDirect: total((e) => (e.nature === "direct" ? e.brut : 0)),
    brutSupplements: total((e) => (e.nature === "supplement" ? e.brut : 0)),
    nuitsDirectes: encaissements.reduce((s, e) => s + (e.nature === "direct" ? (e.nuits ?? 0) : 0), 0),
  },
  mois,
  encaissements,
};

writeFileSync("data/historique-direct.json", JSON.stringify(out, null, 2) + "\n", "utf8");
const compact = JSON.stringify(out);
writeFileSync("data/historique-direct.env.txt", `HISTORIQUE_DIRECT=${compact}\n`, "utf8");

console.log(`✓ ${encaissements.length} encaissements écrits dans data/historique-direct.json`);
console.log(`  Forme compacte : data/historique-direct.env.txt (${(compact.length / 1024).toFixed(1)} Ko)`);
if (autresCategories.size) {
  console.log(`  Catégories hors « charge », exclues du brut : ${[...autresCategories].map(([k, v]) => `${k} ${v.toFixed(2)} €`).join(", ")}`);
}
console.log(`  Frais Stripe : ${out.totaux.fraisStripe.toFixed(2)} € sur ${out.totaux.brut.toFixed(2)} € = ${((out.totaux.fraisStripe / out.totaux.brut) * 100).toFixed(2)} %`);

console.log("\n-- Par mois --");
console.log("mois     enc.      brut       direct   supplém.   frais      net   nuits");
for (const k of Object.keys(mois).sort()) {
  const m = mois[k];
  console.log(
    `${k}  ${String(m.encaissements).padStart(4)}  ${m.brut.toFixed(2).padStart(8)}  ` +
    `${m.brutDirect.toFixed(2).padStart(9)}  ${m.brutSupplements.toFixed(2).padStart(8)}  ` +
    `${m.fraisStripe.toFixed(2).padStart(6)}  ${m.net.toFixed(2).padStart(8)}  ${String(m.nuits).padStart(5)}`
  );
}

const kitsDouteux = encaissements.filter((e) => e.kitIncoherent);
if (kitsDouteux.length) {
  console.log(`
! ${kitsDouteux.length} supplément(s) qui ne tombent pas sur un multiple de 15 € (kit = 15 €/personne) :`);
  for (const e of kitsDouteux) console.log(`   ${e.date}  ${e.brut.toFixed(2)} €  « ${e.libelle} »`);
}

const deduites = encaissements.filter((e) => e.anneeDeduite);
if (deduites.length) {
  console.log(`\n  ${deduites.length} séjour(s) dont l'année a été déduite de la date d'encaissement : ${deduites.map((e) => `${e.arrivee}→${e.depart}`).join(", ")}`);
}

if (ecarts.length) {
  console.error(`\n✗ ${ecarts.length} ligne(s) où net != brut - frais.`);
  process.exit(1);
}
console.log("\n✓ Réconciliation OK : net = brut - frais Stripe sur toutes les lignes.");
