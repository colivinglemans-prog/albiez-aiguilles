#!/usr/bin/env node
// Synchronise data/reviews.json avec les avis Airbnb, lus par l'API Beds24.
//
// Usage: node scripts/sync-reviews.mjs [--dry-run]
// Lit .env.local : BEDS24_REFRESH_TOKEN.
//
// Beds24 expose `GET /channels/airbnb/reviews?roomId=…` (endpoint « Beta »), qui relaie tel
// quel le `listing_reviews` d'Airbnb : note globale, texte public, notes par catégorie,
// réponse de l'hôte, code de réservation. Le scope `read:channels` suffit — le token
// d'écriture le porte déjà.
//
// **Ce que l'API ne donne pas : le prénom du voyageur.** L'avis ne porte qu'un `reviewer_id`
// opaque. Le prénom se récupère en joignant `reservation_confirmation_code` à la réservation
// Beds24 correspondante — ce qui ne vaut que pour les séjours passés par Beds24, c'est-à-dire
// à partir d'août 2026. Pour les avis antérieurs, le prénom a été saisi à la main et ce script
// le conserve : il n'écrase jamais une entrée existante.
//
// D'où sa règle de fonctionnement : **il ajoute, il ne réécrit pas.**
//
//   - avis déjà dans reviews.json  → laissé intact (les textes y ont été corrigés des fautes
//                                    de frappe évidentes, la date et la période vérifiées)
//   - avis nouveau                 → ajouté, prénom depuis Beds24 si joignable, sinon "" à
//                                    compléter à la main
//   - avis disparu côté Airbnb     → signalé, jamais supprimé
//   - `summary`                    → recalculé intégralement (il est entièrement dérivable,
//                                    sauf `guestFavourite`, distinction qu'Airbnb n'expose pas)
//
// L'appariement entre les deux listes se fait par similarité de texte et non par identifiant :
// reviews.json est antérieur à cette intégration et ne porte pas les `id` Airbnb. Le trigramme
// de Jaccard encaisse les corrections de frappe — sur les 49 avis d'origine, le pire score
// d'appariement est 0,86, très au-dessus du seuil.

import { readFileSync, writeFileSync } from "node:fs";

process.loadEnvFile(".env.local");

const API = "https://api.beds24.com/v2";
const FICHIER = "data/reviews.json";
const dryRun = process.argv.includes("--dry-run");

/** Le roomId vient de lib/property.ts pour qu'il n'existe qu'à un seul endroit. */
function roomIdDuSite() {
  const src = readFileSync("lib/property.ts", "utf8");
  const m = src.match(/roomId:\s*(\d+)/);
  if (!m) throw new Error("roomId introuvable dans lib/property.ts");
  return Number(m[1]);
}

async function accessToken() {
  const refreshToken = process.env.BEDS24_REFRESH_TOKEN;
  if (!refreshToken) throw new Error("BEDS24_REFRESH_TOKEN absent de .env.local");
  const res = await fetch(`${API}/authentication/token`, { headers: { refreshToken } });
  const body = await res.text();
  if (!res.ok) throw new Error(`authentication/token ${res.status} : ${body.slice(0, 200)}`);
  return JSON.parse(body).token;
}

async function appeler(token, chemin, params = {}) {
  const url = new URL(API + chemin);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { token } });
  const body = await res.text();
  if (!res.ok) throw new Error(`${chemin} ${res.status} : ${body.slice(0, 300)}`);
  return JSON.parse(body);
}

// --- Appariement des textes ------------------------------------------------------------

const normaliser = (s) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const trigrammes = (s) => {
  const n = normaliser(s);
  const t = new Set();
  for (let i = 0; i < n.length - 2; i++) t.add(n.slice(i, i + 3));
  return t;
};

const jaccard = (a, b) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
};

/**
 * Seuil délibérément bas. Un faux positif se paie cher — un avis nouveau serait pris pour un
 * ancien et jamais ajouté, en silence. Un faux négatif, lui, se voit : le script propose un
 * doublon, et la relecture du rapport le rattrape.
 */
const SEUIL = 0.35;

/** Appariement glouton par score décroissant : chaque avis ne sert qu'une fois. */
function apparier(apiRevs, existants) {
  const A = apiRevs.map((r, i) => ({ i, r, t: trigrammes(r.public_review) }));
  const B = existants.map((c, j) => ({ j, c, t: trigrammes(c.text) }));
  const paires = [];
  for (const a of A) for (const b of B) paires.push([jaccard(a.t, b.t), a, b]);
  paires.sort((x, y) => y[0] - x[0]);

  const prisA = new Set();
  const prisB = new Set();
  for (const [score, a, b] of paires) {
    if (score < SEUIL) break;
    if (prisA.has(a.i) || prisB.has(b.j)) continue;
    prisA.add(a.i);
    prisB.add(b.j);
  }
  return {
    nouveaux: A.filter((a) => !prisA.has(a.i)).map((a) => a.r),
    disparus: B.filter((b) => !prisB.has(b.j)).map((b) => b.c),
  };
}

// --- Dérivations -----------------------------------------------------------------------

/** hiver = décembre à mars, ete = juillet-août, le reste hors-saison. Voir lib/reviews.ts. */
function periode(mois) {
  const m = Number(mois.slice(5, 7));
  if (m === 12 || m <= 3) return "hiver";
  if (m === 7 || m === 8) return "ete";
  return "hors-saison";
}

const arrondi = (n, d) => Math.round(n * 10 ** d) / 10 ** d;
const moyenne = (xs, d) => arrondi(xs.reduce((a, b) => a + b, 0) / xs.length, d);

/**
 * `summary` est recalculé plutôt que reporté : à la virgule près, les six sous-notes que le
 * fichier affichait à la main sont la moyenne des `category_ratings`, arrondie au dixième
 * comme le fait Airbnb. `guestFavourite` n'est pas dans la réponse et reste piloté à la main.
 */
function resumer(apiRevs, ancien) {
  const cats = {};
  for (const r of apiRevs)
    for (const c of r.category_ratings ?? []) (cats[c.category] ??= []).push(c.rating);
  const cat = (nom, cle) => (cats[nom] ? moyenne(cats[nom], 1) : (ancien?.categories?.[cle] ?? 0));
  return {
    rating: moyenne(apiRevs.map((r) => r.overall_rating), 2),
    count: apiRevs.length,
    guestFavourite: ancien?.guestFavourite ?? false,
    categories: {
      cleanliness: cat("cleanliness", "cleanliness"),
      accuracy: cat("accuracy", "accuracy"),
      checkIn: cat("checkin", "checkIn"),
      communication: cat("communication", "communication"),
      location: cat("location", "location"),
      value: cat("value", "value"),
    },
  };
}

// --- Exécution -------------------------------------------------------------------------

const token = await accessToken();
const roomId = roomIdDuSite();

const reponse = await appeler(token, "/channels/airbnb/reviews", { roomId });
// Un avis non soumis ou masqué n'apparaît pas sur l'annonce ; le site ne doit pas le montrer
// non plus. Un avis sans texte public ne dit rien à personne, mais compte dans la note.
const tous = (reponse.data ?? []).filter((r) => r.submitted && !r.hidden);
const avecTexte = tous.filter((r) => r.public_review?.trim());
console.log(`✓ ${tous.length} avis lus depuis Airbnb via Beds24 (room ${roomId})`);
if (reponse.pages?.nextPageExists) {
  console.warn("⚠ L'API annonce une page suivante — au-delà de 100 avis, il faudra paginer.");
}

const fichier = JSON.parse(readFileSync(FICHIER, "utf8"));
const { nouveaux, disparus } = apparier(avecTexte, fichier.reviews);

/**
 * Prénom et mois du séjour d'un avis nouveau, par jointure sur le code de réservation.
 * Beds24 range le code Airbnb dans `apiReference`. Chargé une seule fois, et seulement s'il y
 * a un avis à compléter : la plupart des exécutions n'appelleront pas /bookings du tout.
 */
let reservations = null;
async function reservationDe(code) {
  if (!reservations) {
    const j = await appeler(token, "/bookings", { roomId, arrivalFrom: "2020-01-01" });
    reservations = new Map((j.data ?? []).map((b) => [b.apiReference, b]));
    console.log(`  (${reservations.size} réservations Beds24 chargées pour la jointure)`);
  }
  return reservations.get(code);
}

const ajoutes = [];
for (const r of nouveaux) {
  const resa = await reservationDe(r.reservation_confirmation_code);
  // Le mois du séjour est celui de l'arrivée. À défaut de réservation Beds24, celui du dépôt
  // de l'avis : Airbnb ne le publie qu'après le départ, l'écart dépasse rarement le mois.
  const date = (resa?.arrival ?? r.submitted_at ?? "").slice(0, 7);
  ajoutes.push({
    name: resa?.firstName?.trim() || "",
    date,
    rating: r.overall_rating,
    period: periode(date),
    text: r.public_review.trim(),
    // Réponse de l'hôte reprise telle quelle. Le fichier ne garde que celles qui apprennent
    // quelque chose au lecteur : à supprimer si celle-ci n'apporte rien.
    ...(r.reviewee_response?.trim() ? { reply: r.reviewee_response.trim() } : {}),
  });
}

const ancienResume = fichier.summary;
fichier.summary = resumer(tous, ancienResume);
fichier.reviews = [...ajoutes, ...fichier.reviews].sort((a, b) => b.date.localeCompare(a.date));

// --- Rapport ---------------------------------------------------------------------------

if (ajoutes.length === 0) console.log("→ Aucun avis nouveau.");
for (const a of ajoutes) {
  console.log(`\n+ ${a.date} — ${a.rating}★ — ${a.period}`);
  console.log(`  ${a.text.slice(0, 120)}${a.text.length > 120 ? "…" : ""}`);
  if (a.name) console.log(`  prénom : ${a.name} (repris de la réservation Beds24)`);
  else console.log("  ⚠ prénom inconnu — le compléter à la main dans data/reviews.json");
  if (a.reply) console.log("  ⚠ réponse hôte reprise : la supprimer si elle n'apporte rien");
}

for (const d of disparus) {
  console.log(`\n⚠ Plus renvoyé par Airbnb : ${d.name} (${d.date}) — conservé dans le fichier.`);
  console.log("  Avis retiré côté Airbnb, ou appariement raté : vérifier avant de l'effacer.");
}

const changeResume = JSON.stringify(ancienResume) !== JSON.stringify(fichier.summary);
if (changeResume) {
  console.log(`\n≠ summary : ${JSON.stringify(ancienResume)}`);
  console.log(`         → ${JSON.stringify(fichier.summary)}`);
}

if (!ajoutes.length && !changeResume) {
  console.log("\nRien à écrire, data/reviews.json est à jour.");
  process.exit(0);
}

if (dryRun) {
  console.log("\n--dry-run : rien n'a été écrit.");
  process.exit(0);
}

writeFileSync(FICHIER, JSON.stringify(fichier, null, 2) + "\n", "utf8");
console.log(`\n✓ ${FICHIER} mis à jour (${fichier.reviews.length} avis).`);
if (ajoutes.some((a) => !a.name)) {
  console.log("  Compléter les prénoms manquants avant de committer.");
}
