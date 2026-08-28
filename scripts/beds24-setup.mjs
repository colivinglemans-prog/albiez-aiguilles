#!/usr/bin/env node
// Échange un invite code Beds24 contre un refreshToken (compte SCI JUARISAL / Albiez).
// L'invite code se génère dans Beds24 : Settings → Apps & Integrations → API →
// « Invite Code », en cochant au minimum les scopes read:properties,
// read:bookings et read:inventory. Il est valable quelques minutes.
//
// Usage: node scripts/beds24-setup.mjs <INVITE_CODE>

const code = process.argv[2];
if (!code) {
  console.error("Usage: node scripts/beds24-setup.mjs <INVITE_CODE>");
  process.exit(1);
}

const res = await fetch("https://api.beds24.com/v2/authentication/setup", {
  headers: { code, deviceName: "albiez-aiguilles-site" },
});
const body = await res.text();

if (!res.ok) {
  console.error(`Erreur ${res.status}:`, body);
  process.exit(1);
}

const data = JSON.parse(body);
console.log("\n✓ Refresh token obtenu :\n");
console.log(data.refreshToken);
console.log("\nÀ mettre dans .env.local puis sur Vercel :");
console.log("  BEDS24_REFRESH_TOKEN=<la valeur ci-dessus>");
console.log("  npx vercel env add BEDS24_REFRESH_TOKEN production\n");
console.log("Access token (24 h, pour tester tout de suite) :", data.token?.slice(0, 20) + "…");
console.log("Expires in:", data.expiresIn, "sec");
