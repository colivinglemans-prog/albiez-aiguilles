/**
 * Vérifie que la page de réservation Beds24 rend bien un sélecteur d'enfants.
 *
 *   node scripts/verifie-selecteur-enfants.mjs
 *
 * Pourquoi un script dédié plutôt que `devis-beds24.mjs` : l'endpoint AJAX honore `nc=2`
 * quoi qu'il arrive, donc un devis correct ne prouve rien sur ce que le visiteur peut
 * réellement saisir. Seul le HTML de la page le dit.
 *
 * Le 2026-08-31, `maxChildren` était `null` sur la chambre 715147 : la page ne rendait qu'un
 * sélecteur « Personnes », et le `numchild=2` envoyé par notre calendrier était jeté — une
 * famille de 4 adultes + 2 enfants était devisée au tarif 4 personnes, soit 68,68 € de moins
 * sur 7 nuits de novembre.
 */
const URL_PAGE =
  "https://beds24.com/booking2.php?propid=346417&layout=1" +
  "&checkin=2026-11-07&checkout=2026-11-14&numadult=4&numchild=2&lang=fr";

const html = await (await fetch(URL_PAGE, { cache: "no-store" })).text();

/**
 * Le bloc `<select>` portant cet identifiant, ou `null`.
 *
 * Découpage à la main plutôt qu'une `RegExp` construite par interpolation : les gestionnaires
 * d'événements du JS de Beds24 citent `inputnumchild` même quand l'élément n'existe pas, donc
 * il faut chercher la balise et non la chaîne — et un `[\s\S]` dans un template literal est
 * une source d'erreur silencieuse (`\s` y vaut `s`).
 */
function blocSelect(id) {
  const ancre = html.indexOf(`id="${id}"`);
  if (ancre === -1) return null;
  const debut = html.lastIndexOf("<select", ancre);
  const fin = html.indexOf("</select>", ancre);
  if (debut === -1 || fin === -1) return null;
  return html.slice(debut, fin);
}

/** La valeur pré-sélectionnée, qui doit refléter ce que l'URL demandait. */
function retenu(bloc) {
  for (const option of bloc.split("<option").slice(1)) {
    if (!/\bselected\b/.test(option)) continue;
    return option.match(/value="(\d+)"/)?.[1] ?? "?";
  }
  return "aucune";
}

const adultes = blocSelect("inputnumadult");
const enfants = blocSelect("inputnumchild");

for (const [nom, bloc] of [["adultes", adultes], ["enfants", enfants]]) {
  console.log(`sélecteur ${nom} : ${bloc ? `présent, valeur ${retenu(bloc)}` : "ABSENT"}`);
}
console.log();

if (enfants && retenu(enfants) === "2") {
  console.log("OK — la page accepte les enfants et retient les 2 demandés.");
} else if (enfants) {
  console.log(`ATTENTION — sélecteur présent mais il retient ${retenu(enfants)} et non 2.`);
} else {
  console.log(
    "ECHEC — aucun sélecteur d'enfants. Renseigner Max Adults et Max Children sur la\n" +
      "chambre 715147 (Settings > Properties > Rooms). Sans ça, une famille de 4 adultes\n" +
      "+ 2 enfants est devisée au tarif 4 personnes : 68,68 EUR perdus sur 7 nuits.",
  );
}
