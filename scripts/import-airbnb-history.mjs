#!/usr/bin/env node
// Convertit l'export CSV « historique des transactions » d'Airbnb en archive JSON
// exploitable par le dashboard : une entrée par réservation, agrégats par année.
//
// Usage: node scripts/import-airbnb-history.mjs <chemin/vers/airbnb.csv> [sortie.json]
//
// Pourquoi une archive et pas un import dans Beds24 : le lien Airbnb → Beds24 ne
// rétro-importe pas l'historique, et injecter des réservations reconstituées dans le
// compte fausserait les analytics de Beyond Pricing, qui lit ce même compte.
//
// AUCUN NOM DE VOYAGEUR N'EST ÉCRIT dans la sortie : le repo est public. Le code de
// confirmation suffit à rapprocher une ligne de l'export d'origine en cas de doute.

import { readFileSync, writeFileSync } from "node:fs";

const [csvPath, outPath = "data/historique-airbnb.json"] = process.argv.slice(2);
if (!csvPath) {
  console.error("Usage: node scripts/import-airbnb-history.mjs <airbnb.csv> [sortie.json]");
  process.exit(1);
}

/** CSV avec champs entre guillemets : les virgules internes sont fréquentes
 *  (décimales « 61,21 » et noms « Agathe, Claire »). */
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/** Airbnb mélange les deux conventions décimales dans le même fichier :
 *  « 329.10 » pour les revenus bruts, « 61,21 » pour les frais de service. */
function num(v) {
  if (v == null || v.trim() === "") return null;
  const n = Number(v.trim().replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** L'export est en MM/DD/YYYY quelle que soit la langue de l'interface. */
function isoDate(v) {
  if (!v || !v.trim()) return null;
  const [m, d, y] = v.trim().split("/");
  if (!y) return null;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

const text = readFileSync(csvPath, "utf8").replace(/^﻿/, "");
const [header, ...lines] = parseCsv(text);
const col = (name) => {
  const i = header.indexOf(name);
  if (i === -1) throw new Error(`Colonne absente de l'export : « ${name} »`);
  return i;
};

const C = {
  type: col("Type"),
  code: col("Code de confirmation"),
  bookedAt: col("Date de réservation"),
  start: col("Date de début"),
  end: col("Date de fin"),
  nights: col("Nuits"),
  listing: col("Logement"),
  amount: col("Montant"),
  paid: col("Versé"),
  serviceFee: col("Frais de service"),
  cleaningFee: col("Frais de ménage"),
  gross: col("Revenus bruts"),
  taxes: col("Taxes reversées par Airbnb"),
  year: col("Année des revenus"),
};

const bookings = new Map();
const listings = new Set();
let payouts = 0, payoutTotal = 0, ignored = 0;

/** L'export est en ordre chronologique inverse : pour cinq séjours sur sept, la ligne
 *  « Versement de résolution » précède la ligne « Réservation » du même code. Il faut donc
 *  fusionner dans une entrée existante, jamais l'écraser — sinon les résolutions déjà
 *  accumulées disparaissent (225 € sur cet export). */
function entry(code) {
  let b = bookings.get(code);
  if (!b) {
    b = { code, canal: "airbnb", resolutions: 0 };
    bookings.set(code, b);
  }
  return b;
}

for (const r of lines) {
  if (!r[C.type]) continue;
  const type = r[C.type].trim();
  if (r[C.listing]) listings.add(r[C.listing].trim());

  if (type === "Payout") { payouts++; payoutTotal += num(r[C.paid]) ?? 0; continue; }

  const code = r[C.code].trim();
  if (!code) { ignored++; continue; }

  if (type === "Réservation") {
    Object.assign(entry(code), {
      reserveLe: isoDate(r[C.bookedAt]),
      arrivee: isoDate(r[C.start]),
      depart: isoDate(r[C.end]),
      nuits: num(r[C.nights]),
      brut: num(r[C.gross]),
      fraisService: num(r[C.serviceFee]),
      fraisMenage: num(r[C.cleaningFee]),
      taxeSejourReverseeParAirbnb: num(r[C.taxes]),
      versement: num(r[C.amount]),
      anneeRevenus: num(r[C.year]),
      estReservation: true,
    });
  } else if (type.startsWith("Versement de résolution") || type.startsWith("Régularisation")) {
    // Frais réclamés au voyageur après le séjour (ménage, dégâts) et leurs annulations.
    const b = entry(code);
    b.resolutions += num(r[C.amount]) ?? 0;
    // Les dates de la résolution servent de repli si la réservation est hors export.
    b.arrivee ??= isoDate(r[C.start]);
    b.depart ??= isoDate(r[C.end]);
    b.nuits ??= num(r[C.nights]);
    b.anneeRevenus ??= num(r[C.year]);
  } else ignored++;
}

const rows = [...bookings.values()].sort((a, b) => (a.arrivee ?? "").localeCompare(b.arrivee ?? ""));
for (const b of rows) {
  b.net = Number(((b.versement ?? 0) + b.resolutions).toFixed(2));
  b.resolutions = Number(b.resolutions.toFixed(2));
  if (!b.estReservation) {
    // Un paiement de résolution sans ligne « Réservation » n'est pas un séjour : très
    // probablement une réservation annulée dont seuls des frais ont été encaissés. Ses
    // dates ont donc été relouées à quelqu'un d'autre — les compter en nuits vendues
    // crée un chevauchement fantôme et gonfle l'occupation.
    b.note = "résolution sans ligne de réservation (annulation ?) — montant conservé, nuits non comptées";
    b.nuitsNonComptees = b.nuits;
    b.nuits = null;
  }
  delete b.estReservation;
}

/** Contrôle : brut = versement + frais de service. Un écart signale une modification
 *  de séjour après coup — on le signale, on ne le corrige pas en silence. */
const ecarts = rows.filter((b) => {
  if (b.brut == null || b.versement == null || b.fraisService == null) return false;
  return Math.abs(b.brut - (b.versement + b.fraisService)) > 0.02;
});

/** Les nuits d'un séjour à cheval sur deux années sont réparties sur les deux. */
function nuitsParAnnee(arrivee, depart) {
  const out = {};
  if (!arrivee || !depart) return out;
  for (let d = new Date(arrivee); d < new Date(depart); d.setUTCDate(d.getUTCDate() + 1)) {
    const y = d.getUTCFullYear();
    out[y] = (out[y] ?? 0) + 1;
  }
  return out;
}

const annees = {};
const bucket = (y) => (annees[y] ??= {
  reservations: 0, nuits: 0, brut: 0, net: 0, fraisService: 0, fraisMenage: 0,
  taxeSejourReverseeParAirbnb: 0, nuitsCalendaires: 0,
});

for (const b of rows) {
  // Revenus rattachés à l'année déclarée par Airbnb (celle du versement, base comptable).
  const yRevenu = b.anneeRevenus ?? Number((b.arrivee ?? "").slice(0, 4));
  if (yRevenu) {
    const a = bucket(yRevenu);
    a.reservations += 1;
    a.nuits += b.nuits ?? 0;
    a.brut += b.brut ?? 0;
    a.net += b.net;
    a.fraisService += b.fraisService ?? 0;
    a.fraisMenage += b.fraisMenage ?? 0;
    a.taxeSejourReverseeParAirbnb += b.taxeSejourReverseeParAirbnb ?? 0;
  }
  // Occupation rattachée aux dates réelles, indépendamment de l'année comptable.
  // Les entrées sans séjour (résolution seule) n'occupent rien : `nuits` y est nul.
  if (b.nuits != null) {
    for (const [y, n] of Object.entries(nuitsParAnnee(b.arrivee, b.depart))) bucket(Number(y)).nuitsCalendaires += n;
  }
}

for (const [y, a] of Object.entries(annees)) {
  for (const k of ["brut", "net", "fraisService", "fraisMenage", "taxeSejourReverseeParAirbnb"]) {
    a[k] = Number(a[k].toFixed(2));
  }
  a.prixMoyenParNuit = a.nuits ? Number((a.brut / a.nuits).toFixed(2)) : null;
  a.dureeMoyenneSejour = a.reservations ? Number((a.nuits / a.reservations).toFixed(1)) : null;
  const jours = Number(y) === new Date().getUTCFullYear()
    ? Math.round((Date.now() - Date.UTC(Number(y), 0, 1)) / 86_400_000)
    : (Number(y) % 4 === 0 ? 366 : 365);
  a.tauxOccupation = Number(((a.nuitsCalendaires / jours) * 100).toFixed(1));
  a.joursDeReference = jours;
}

const out = {
  source: "Export CSV « historique des transactions » Airbnb",
  genereLe: new Date().toISOString().slice(0, 10),
  avertissement:
    "Archive figée : Airbnb ne rétro-importe pas l'historique dans Beds24. Le dashboard lit " +
    "Beds24 pour le vivant et ce fichier pour l'antérieur. Aucun nom de voyageur (repo public).",
  annonces: [...listings],
  annees,
  reservations: rows,
};

writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

/** Le repo est public : la production lit l'archive depuis une variable d'environnement,
 *  pas depuis un fichier versionné. On écrit à côté la forme compacte à y coller. */
const envPath = outPath.replace(/\.json$/, ".env.txt");
const compact = JSON.stringify(out);
writeFileSync(envPath, `HISTORIQUE_AIRBNB=${compact}\n`, "utf8");

/** Garde-fou : la somme des nets doit retomber sur celle des virements Airbnb. C'est ce
 *  contrôle qui a révélé les 225 € de résolutions perdues par un `set` qui écrasait. */
const netTotal = rows.reduce((s, b) => s + b.net, 0);
const ecartTresorerie = Number((payoutTotal - netTotal).toFixed(2));
if (Math.abs(ecartTresorerie) > 0.02) {
  console.error(`\n✗ Réconciliation en échec : ${payoutTotal.toFixed(2)} € versés par Airbnb`);
  console.error(`  contre ${netTotal.toFixed(2)} € reconstitués — écart de ${ecartTresorerie} €.`);
  console.error("  L'archive n'est pas fiable, ne pas l'utiliser en l'état.");
  process.exit(1);
}

console.log(`✓ ${rows.length} réservations écrites dans ${outPath}`);
console.log(`  Réconciliation OK : ${netTotal.toFixed(2)} € = total des virements Airbnb`);
console.log(`  Forme compacte pour la variable d'environnement : ${envPath} (${(compact.length / 1024).toFixed(1)} Ko)`);
console.log(`  ${payouts} lignes Payout ignorées (${payoutTotal.toFixed(2)} € de virements — mouvements de trésorerie, pas du revenu)`);
if (ignored) console.log(`  ${ignored} ligne(s) non reconnue(s)`);
console.log(`  Annonces présentes dans l'export : ${[...listings].join(" | ")}`);
console.log("\n-- Par année --");
console.log("année  résas  nuits      brut €       net €  PM/nuit  durée  occup.");
for (const y of Object.keys(annees).sort()) {
  const a = annees[y];
  console.log(
    `${y}   ${String(a.reservations).padStart(4)}  ${String(a.nuits).padStart(5)}  ` +
    `${a.brut.toFixed(2).padStart(10)}  ${a.net.toFixed(2).padStart(10)}  ` +
    `${String(a.prixMoyenParNuit ?? "-").padStart(7)}  ${String(a.dureeMoyenneSejour ?? "-").padStart(5)}  ${String(a.tauxOccupation).padStart(5)}%`
  );
}
if (ecarts.length) {
  console.log(`\n! ${ecarts.length} réservation(s) où brut != versement + frais de service (modification après coup ?) :`);
  for (const b of ecarts) {
    console.log(`  ${b.code}  ${b.arrivee}  brut ${b.brut} vs ${b.versement} + ${b.fraisService} = ${(b.versement + b.fraisService).toFixed(2)}`);
  }
}
