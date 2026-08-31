#!/usr/bin/env node
// Échange un invite code Beds24 contre un refreshToken (compte SCI JUARISAL / Albiez).
// L'invite code se génère dans Beds24 : Settings → Apps & Integrations → API →
// « Invite Code », en cochant au minimum les scopes read:properties,
// read:bookings et read:inventory. Il est valable quelques minutes.
//
// Usage: node scripts/beds24-setup.mjs <INVITE_CODE> [deviceName]
//
// ⚠️ Un invite code n'est PAS un refresh token, et c'est le piège de ce flux. Présenté à
// `/authentication/token` avec l'en-tête `refreshToken:`, Beds24 l'accepte **une seule fois**
// et renvoie un access token valide — ce qui donne l'illusion que le code est un refresh
// token. Le vrai refresh token est créé silencieusement au passage, et sa valeur n'est jamais
// affichée : elle est perdue. Le deuxième appel répond alors `401 Token not valid`, et on
// croit à un token révoqué.
//
// Seul `/authentication/setup` avec l'en-tête `code:` — celui utilisé ici — retourne le
// refresh token en clair. C'est la seule façon de le capturer.
//
// Le `deviceName` distingue les tokens dans Beds24 → Settings → API → Refresh Tokens.
// Ne pas réutiliser celui du token d'écriture pour un token de lecture.

const code = process.argv[2];
const deviceName = process.argv[3] ?? "albiez-aiguilles-site";
if (!code) {
  console.error("Usage: node scripts/beds24-setup.mjs <INVITE_CODE> [deviceName]");
  process.exit(1);
}

const res = await fetch("https://api.beds24.com/v2/authentication/setup", {
  headers: { code, deviceName },
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
