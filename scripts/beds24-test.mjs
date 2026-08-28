#!/usr/bin/env node
// Vérifie que le compte Beds24 d'Albiez répond et que la propriété attendue
// est bien visible depuis le token configuré.
//
// Usage: node scripts/beds24-test.mjs [propertyId]
// Lit .env.local : BEDS24_REFRESH_TOKEN (ou BEDS24_API_TOKEN) et BEDS24_PROPERTY_ID.

process.loadEnvFile(".env.local");

const API = "https://api.beds24.com/v2";
const propertyId = process.argv[2] ?? process.env.BEDS24_PROPERTY_ID;

if (!propertyId) {
  console.error("Aucun property ID : passe-le en argument ou pose BEDS24_PROPERTY_ID dans .env.local");
  process.exit(1);
}

/** Un refreshToken donne un access token de 24 h ; un API token s'utilise tel quel. */
async function resolveToken() {
  const refreshToken = process.env.BEDS24_REFRESH_TOKEN;
  if (refreshToken) {
    const res = await fetch(`${API}/authentication/token`, { headers: { refreshToken } });
    const body = await res.text();
    if (!res.ok) throw new Error(`authentication/token ${res.status} : ${body.slice(0, 200)}`);
    const { token, expiresIn } = JSON.parse(body);
    console.log(`✓ Access token obtenu via refreshToken (valide ${expiresIn} s)`);
    return token;
  }
  const apiToken = process.env.BEDS24_API_TOKEN;
  if (apiToken) {
    console.log("→ Utilisation de BEDS24_API_TOKEN (token longue durée)");
    return apiToken;
  }
  throw new Error("Ni BEDS24_REFRESH_TOKEN ni BEDS24_API_TOKEN dans .env.local");
}

const token = await resolveToken();

async function call(path, params = {}) {
  const url = new URL(API + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { token } });
  const body = await res.text();
  if (!res.ok) throw new Error(`${path} ${res.status} : ${body.slice(0, 200)}`);
  return JSON.parse(body);
}

console.log("\n── Propriétés du compte ──");
const { data: properties = [] } = await call("/properties");
for (const p of properties) {
  const rooms = (p.roomTypes ?? []).map((r) => `${r.id} (${r.name})`).join(", ") || "aucune";
  console.log(`  ${p.id}  ${p.name} — ${p.city ?? "?"} — room types : ${rooms}`);
}

const target = properties.find((p) => String(p.id) === String(propertyId));
if (!target) {
  console.error(`\n✗ La propriété ${propertyId} n'est pas visible depuis ce token.`);
  console.error("  Soit le token appartient à un autre compte Beds24, soit ses scopes sont trop étroits.");
  process.exit(1);
}
console.log(`\n✓ Propriété ${propertyId} trouvée : ${target.name}`);

const today = new Date().toISOString().slice(0, 10);
const in90 = new Date(Date.now() + 90 * 86_400_000).toISOString().slice(0, 10);

console.log(`\n── Disponibilités ${today} → ${in90} ──`);
const { data: rooms = [] } = await call("/inventory/rooms/availability", {
  propertyId,
  startDate: today,
  endDate: in90,
});
for (const room of rooms) {
  const days = Object.values(room.availability ?? {});
  const libres = days.filter(Boolean).length;
  console.log(`  room ${room.roomId} : ${libres} nuits libres sur ${days.length}`);
}
if (rooms.length === 0) console.log("  (aucune room retournée — inventaire pas encore configuré ?)");

console.log("\n── Réservations à venir ──");
const { data: bookings = [] } = await call("/bookings", { arrivalFrom: today, arrivalTo: in90 });
console.log(`  ${bookings.length} réservation(s) sur la période`);
for (const b of bookings.slice(0, 10)) {
  console.log(`  ${b.arrival} → ${b.departure}  ${b.firstName ?? ""} ${b.lastName ?? ""} (${b.referer ?? b.channel ?? "direct"}) — ${b.status}`);
}

console.log("\n✓ Connexion Beds24 opérationnelle.");
