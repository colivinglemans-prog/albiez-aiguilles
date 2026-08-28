#!/usr/bin/env node
// Convertit les relevés CSV « statements » de Booking.com en archive JSON, au même format
// que l'archive Airbnb pour que le dashboard puisse concaténer les canaux.
//
// Usage: node scripts/import-booking-history.mjs <relevé1.csv> [relevé2.csv ...]
//        (un export par année ; l'ordre des fichiers n'a pas d'importance)
//
// AUCUN NOM DE VOYAGEUR N'EST ÉCRIT dans la sortie : le repo est public. Le numéro de
// réservation Booking suffit à rapprocher une ligne de l'export d'origine.

import { readFileSync, writeFileSync } from "node:fs";

const inputs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const outPath = "data/historique-booking.json";
if (!inputs.length) {
  console.error("Usage: node scripts/import-booking-history.mjs <relevé1.csv> [relevé2.csv ...]");
  process.exit(1);
}

/** Même parseur que l'import Airbnb : tous les champs texte sont entre guillemets ici,
 *  et « Guest name » contient des virgules. */
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

function num(v) {
  if (v == null || v.trim() === "") return null;
  const n = Number(v.trim().replace(/\s/g, ""));
  return Number.isFinite(n) ? n : null;
}

const MOIS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };

/** Booking écrit les dates en anglais : « Jan 26, 2026 ». */
function isoDate(v) {
  if (!v || !v.trim()) return null;
  const m = v.trim().match(/^([A-Za-z]{3})[a-z]*\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) throw new Error(`Date Booking non reconnue : « ${v} »`);
  const mois = MOIS[m[1]];
  if (!mois) throw new Error(`Mois non reconnu : « ${m[1]} » (export en anglais attendu)`);
  return `${m[3]}-${String(mois).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

const nuitsEntre = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

const bookings = new Map();
let lignes = 0, ignorees = 0;
const statuts = new Set();

for (const path of inputs) {
  const [header, ...rows] = parseCsv(readFileSync(path, "utf8").replace(/^﻿/, ""));
  const col = (name) => {
    const i = header.indexOf(name);
    if (i === -1) throw new Error(`${path} : colonne absente « ${name} »`);
    return i;
  };
  const C = {
    type: col("Type"), num: col("Booking number"),
    in: col("Check-in"), out: col("Checkout"),
    statut: col("Reservation status"),
    montant: col("Amount"), commission: col("Commission"),
    fraisPaiement: col("Payments Service Fee"), net: col("Net"),
    verseLe: col("Payout date"),
  };

  for (const r of rows) {
    if (!r[C.num] || !r[C.num].trim()) continue;
    lignes++;
    if (r[C.type].trim() !== "Reservation") { ignorees++; continue; }
    const code = r[C.num].trim();
    statuts.add(r[C.statut].trim());

    // Une réservation peut avoir PLUSIEURS lignes : ajustement de commission après
    // coup, remboursement partiel. Il faut cumuler, jamais remplacer — c'est le même
    // piège que l'ordre inverse de l'export Airbnb.
    let b = bookings.get(code);
    if (!b) {
      b = {
        code, canal: "booking",
        arrivee: isoDate(r[C.in]), depart: isoDate(r[C.out]),
        nuits: null, statut: r[C.statut].trim(),
        brut: 0, commission: 0, fraisPaiement: 0, net: 0,
        fraisMenage: null, taxeSejourReverseeParLeCanal: null,
        verseLe: isoDate(r[C.verseLe]), lignes: 0,
      };
      b.nuits = nuitsEntre(b.arrivee, b.depart);
      bookings.set(code, b);
    }
    b.brut += num(r[C.montant]) ?? 0;
    b.commission += -(num(r[C.commission]) ?? 0);       // négatif dans l'export
    b.fraisPaiement += -(num(r[C.fraisPaiement]) ?? 0); // négatif dans l'export
    b.net += num(r[C.net]) ?? 0;
    b.lignes++;
  }
}

const aujourdhui = new Date().toISOString().slice(0, 10);
const rows = [...bookings.values()].sort((a, b) => a.arrivee.localeCompare(b.arrivee));
for (const b of rows) {
  for (const k of ["brut", "commission", "fraisPaiement", "net"]) b[k] = Number(b[k].toFixed(2));
  if (b.lignes === 1) delete b.lignes;
  // Un séjour non terminé est aussi vivant dans Beds24 : le dashboard doit dédoublonner
  // sur le numéro de réservation, sinon il compte le montant deux fois.
  if (b.depart > aujourdhui) b.aussiDansBeds24 = true;
}

/** Contrôle : net = brut - commission - frais de paiement, ligne par ligne. */
const ecarts = rows.filter((b) => Math.abs(b.net - (b.brut - b.commission - b.fraisPaiement)) > 0.02);

const annees = {};
for (const b of rows) {
  const y = Number(b.arrivee.slice(0, 4));
  const a = (annees[y] ??= { reservations: 0, nuits: 0, brut: 0, commission: 0, fraisPaiement: 0, net: 0 });
  a.reservations++;
  a.nuits += b.nuits;
  a.brut += b.brut; a.commission += b.commission; a.fraisPaiement += b.fraisPaiement; a.net += b.net;
}
for (const a of Object.values(annees)) {
  for (const k of ["brut", "commission", "fraisPaiement", "net"]) a[k] = Number(a[k].toFixed(2));
  a.tauxCommission = a.brut ? Number(((a.commission / a.brut) * 100).toFixed(1)) : null;
  a.prixMoyenParNuit = a.nuits ? Number((a.brut / a.nuits).toFixed(2)) : null;
}

const out = {
  source: "Relevés CSV « statements » Booking.com",
  genereLe: aujourdhui,
  avertissement:
    "Archive figée, canal Booking uniquement. Booking n'isole ni les frais de ménage ni la " +
    "taxe de séjour dans ce relevé : ces champs restent nuls, ils ne valent pas zéro. " +
    "Les séjours marqués aussiDansBeds24 sont à dédoublonner sur le numéro de réservation. " +
    "Aucun nom de voyageur (repo public).",
  fichiers: inputs,
  annees,
  reservations: rows,
};

writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
const compact = JSON.stringify(out);
writeFileSync("data/historique-booking.env.txt", `HISTORIQUE_BOOKING=${compact}\n`, "utf8");

const total = rows.reduce((s, b) => s + b.net, 0);
console.log(`✓ ${rows.length} réservations Booking écrites dans ${outPath}`);
console.log(`  ${lignes} lignes lues sur ${inputs.length} fichiers${ignorees ? `, ${ignorees} non « Reservation »` : ""}`);
console.log(`  Statuts rencontrés : ${[...statuts].join(", ")}`);
console.log(`  Net cumulé : ${total.toFixed(2)} €`);
console.log(`  Forme compacte : data/historique-booking.env.txt (${(compact.length / 1024).toFixed(1)} Ko)`);

const multi = rows.filter((b) => b.lignes > 1);
if (multi.length) {
  console.log(`\n  ${multi.length} réservation(s) en plusieurs lignes (ajustement après coup), cumulées :`);
  for (const b of multi) console.log(`    ${b.code}  ${b.arrivee}  ${b.lignes} lignes  net ${b.net}`);
}

const futurs = rows.filter((b) => b.aussiDansBeds24);
if (futurs.length) {
  console.log(`\n  ${futurs.length} séjour(s) non terminé(s), donc aussi vivants dans Beds24 :`);
  for (const b of futurs) console.log(`    ${b.code}  ${b.arrivee} → ${b.depart}`);
}

console.log("\n-- Par année (arrivée) --");
console.log("année  résas  nuits      brut €   commission       net €  taux  PM/nuit");
for (const y of Object.keys(annees).sort()) {
  const a = annees[y];
  console.log(
    `${y}   ${String(a.reservations).padStart(4)}  ${String(a.nuits).padStart(5)}  ` +
    `${a.brut.toFixed(2).padStart(10)}  ${a.commission.toFixed(2).padStart(11)}  ` +
    `${a.net.toFixed(2).padStart(10)}  ${String(a.tauxCommission).padStart(4)}%  ${String(a.prixMoyenParNuit).padStart(7)}`
  );
}

if (ecarts.length) {
  console.error(`\n✗ ${ecarts.length} réservation(s) où net != brut - commission - frais :`);
  for (const b of ecarts) console.error(`  ${b.code} ${b.arrivee} : ${b.net} vs ${(b.brut - b.commission - b.fraisPaiement).toFixed(2)}`);
  process.exit(1);
}
console.log("\n✓ Réconciliation OK : net = brut - commission - frais de paiement sur toutes les lignes.");
