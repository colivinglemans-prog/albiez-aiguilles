/**
 * Devis Beds24 en ligne de commande, sans navigateur.
 *
 *   node scripts/devis-beds24.mjs 2026-12-12 2026-12-19
 *
 * Interroge `api/ajax/getroomprice.php`, l'endpoint qu'appelle le JS de `booking2.php` pour
 * remplir le prix de la première page. Le total renvoyé est celui que voit le visiteur.
 *
 * **Pourquoi ce script plutôt qu'un onglet.** La page de réservation mémorise ses réponses
 * dans `sessionStorage`, sous une clé qui contient les dates *et* le nombre de voyageurs
 * (`storeroomprice()`). Le cache meurt avec l'onglet et ne gêne donc aucun voyageur — mais il
 * frappe de plein fouet celui qui teste, puisque tester consiste à reposer la même question
 * après avoir changé un réglage. Ici, chaque appel part vraiment.
 *
 * Le total inclut les extras obligatoires (remise directe, taxe de séjour, ménage) dès lors
 * que « Total Price Style » vaut « Total including obligatory ». La grille de dates, elle,
 * continue d'afficher les tarifs bruts par nuit — deux réglages distincts.
 */
const [du, au] = process.argv.slice(2);
if (!du || !au) {
  console.error("usage: node scripts/devis-beds24.mjs <arrivee AAAA-MM-JJ> <depart AAAA-MM-JJ>");
  process.exit(1);
}

const ROOM = 715147;
const OCCUPATIONS = [
  [2, 0], [4, 0], [4, 1], [4, 2], [5, 0], [6, 0],
];

const nuits = Math.round((Date.parse(`${au}T00:00:00Z`) - Date.parse(`${du}T00:00:00Z`)) / 86_400_000);
console.log(`${du} → ${au} (${nuits} nuits), room ${ROOM}\n`);

const euros = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

for (const [na, nc] of OCCUPATIONS) {
  const p = new URLSearchParams({
    ro: String(ROOM), ci: du, co: au, na: String(na), nc: String(nc),
    of: "1", nr: "1", la: "fr", cu: "",
  });
  const res = await fetch(`https://beds24.com/api/ajax/getroomprice.php?${p}`, { cache: "no-store" });
  const [offre] = await res.json();

  const etiquette = `${na} adulte${na > 1 ? "s" : ""}${nc ? ` + ${nc} enfant${nc > 1 ? "s" : ""}` : ""}`;
  if (!offre?.roomprice) {
    console.log(`${etiquette.padEnd(22)} indisponible${offre?.warn ? ` — ${offre.warn}` : ""}`);
    continue;
  }

  // Les prix par nuit sont les tarifs bruts, avant remise et avant extras obligatoires :
  // leur somme est ce que la grille de dates affiche, et elle diffère du total.
  const brut = Object.entries(offre)
    .filter(([k]) => /^\d{4}-\d{2}-\d{2}$/.test(k))
    .reduce((s, [, v]) => s + Number(v), 0);

  console.log(
    `${etiquette.padEnd(22)} total ${euros(offre.roomprice).padStart(9)} €` +
      `   (grille de dates : ${euros(brut)} €)`,
  );
}
