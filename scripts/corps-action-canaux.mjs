/**
 * Assemble les corps de message de l'Auto Action « canaux » à partir de ceux de 617008.
 *
 * `docs/auto-actions-beds24.md` ne stocke volontairement que le **bloc kit linge** de l'action
 * canaux, pas les cinq messages entiers : deux copies d'un même texte divergent, et le dépôt
 * en porte déjà la trace avec les modèles Airbnb ski / hors-ski devenus identiques sans que
 * personne s'en aperçoive.
 *
 * Ce script fait donc l'assemblage à la demande — corps de 617008, bloc linge remplacé — pour
 * qu'on ait quelque chose à coller dans Beds24 sans jamais l'écrire deux fois.
 *
 *   node scripts/corps-action-canaux.mjs           # les cinq langues
 *   node scripts/corps-action-canaux.mjs fr        # une seule
 *
 * Le résultat est écrit dans `docs/_generated/action-canaux.txt`, à ouvrir et à coller dans
 * Beds24. ⚠️ Ce dossier est **gitignoré, et doit le rester** : un texte dérivé qu'on versionne
 * devient une seconde source de vérité, et c'est exactement ce que ce script existe pour éviter.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const DOC = "docs/auto-actions-beds24.md";

/**
 * `titre` repère la section dans le document, `beds24` nomme la même langue dans l'interface
 * Beds24, qui les étiquette en anglais — « Deutsch » ici, « German » là-bas. Seule cette
 * dernière a été observée (2026-09-25) ; les quatre autres sont déduites.
 */
const LANGUES = [
  { cle: "fr", titre: "Français", beds24: "French", linge: "VOTRE KIT LINGE" },
  { cle: "en", titre: "English", beds24: "English", linge: "YOUR LINEN KIT" },
  { cle: "de", titre: "Deutsch", beds24: "German", linge: "IHR WÄSCHEPAKET" },
  { cle: "es", titre: "Español", beds24: "Spanish", linge: "SU KIT DE ROPA DE CAMA" },
  { cle: "it", titre: "Italiano", beds24: "Italian", linge: "IL VOSTRO KIT BIANCHERIA" },
];

// Fins de ligne normalisées : le dépôt est en CRLF sous Windows, et les repères de bloc ```
// ne se laissent pas trouver autrement.
const texte = readFileSync(DOC, "utf8").split("\r\n").join("\n");

/*
 * Le document porte deux actions ; la seconde commence à son titre. On l'ancre sur
 * « (Booking.com et Airbnb) » plutôt que sur le numéro d'action, qui a déjà changé une fois
 * le jour où l'action a été créée et 625162 a remplacé le mot « canaux ».
 */
const coupure = texte.search(/^# Auto Action .*\(Booking\.com et Airbnb\)/m);
if (coupure < 0) {
  throw new Error(
    "Titre de l'action canaux introuvable dans " + DOC +
      " — il doit se terminer par « (Booking.com et Airbnb) »",
  );
}
const partieDirecte = texte.slice(0, coupure);
const partieCanaux = texte.slice(coupure);

/** Contenu des blocs ``` d'une section, repérée par son titre et son niveau. */
function fences(source, titre, niveau) {
  const debut = source.indexOf("\n" + niveau + " " + titre);
  if (debut < 0) throw new Error("Section « " + titre + " » introuvable");
  const suite = source.slice(debut + 1);
  const fin = suite.search(new RegExp("\n#{1," + niveau.length + "} ", "m"));
  const section = fin < 0 ? suite : suite.slice(0, fin);
  return [...section.matchAll(/```\n([\s\S]*?)\n```/g)].map((m) => m[1]);
}

const voulue = process.argv[2];
const morceaux = [];

for (const { cle, titre, beds24, linge } of LANGUES) {
  if (voulue && voulue !== cle) continue;

  // Action 617008 : 1er bloc = sujet, 2e = message.
  const directs = fences(partieDirecte, titre, "##");
  if (directs.length < 2) throw new Error(titre + " : sujet ou message manquant dans 617008");
  const [sujet, message] = directs;

  // Action canaux : un seul bloc, le kit linge.
  const [blocLinge] = fences(partieCanaux, titre, "###");
  if (!blocLinge) throw new Error(titre + " : bloc linge « canaux » manquant");

  const lignes = message.split("\n");
  const depart = lignes.findIndex((l) => l.trim() === linge);
  if (depart < 0) throw new Error(titre + " : en-tête « " + linge + " » introuvable");

  // La zone à remplacer court jusqu'au SECOND conditionnel du kit — celui des couchages.
  const marque = "[IF>:[INVOICEUPSELLQTY2]";
  const premier = lignes.findIndex((l, i) => i > depart && l.includes(marque));
  const second = lignes.findIndex((l, i) => i > premier && l.includes(marque));
  if (premier < 0 || second < 0) {
    throw new Error(titre + " : les deux conditionnels du kit sont attendus");
  }

  const assemble = [
    ...lignes.slice(0, depart),
    ...blocLinge.split("\n"),
    ...lignes.slice(second + 1),
  ].join("\n");

  // Garde-fous : plus un mot d'upsell, et le tri sur le canal doit être là deux fois.
  if (assemble.includes("INVOICEUPSELLQTY2")) {
    throw new Error(titre + " : un conditionnel d'upsell a survécu au remplacement");
  }
  const tris = (assemble.match(/\[IF>:\[APISOURCE\]/g) ?? []).length;
  if (tris !== 2) throw new Error(titre + " : " + tris + " conditionnel(s) [APISOURCE], 2 attendus");

  const barre = "=".repeat(72);
  morceaux.push(
    [barre, titre.toUpperCase() + "  (Beds24 : " + beds24 + ", code " + cle + ")", barre, "", "--- SUJET ---", sujet, "", "--- MESSAGE ---", assemble, ""].join("\n"),
  );
}

if (morceaux.length === 0) {
  throw new Error("Langue inconnue : " + voulue + ". Attendu fr, en, de, es ou it.");
}

/**
 * Un fichier sans en-tête ne dit pas de quelle action il vient, et on le colle dans la
 * mauvaise trois mois plus tard.
 */
const ENTETE = `${"=".repeat(72)}
CORPS À COLLER DANS L'AUTO ACTION 625162 — Booking.com et Airbnb
${"=".repeat(72)}

Ceci ne concerne PAS l'action 617008, qui sert les réservations directes et dont le
texte n'a pas changé. Son corps reste lisible dans ${DOC}.

Réglages de l'action qui reçoit ces textes
  Booking Source : Channel Manager
  Send Message   : Booking API/Email Smart

Fichier dérivé, régénéré par scripts/corps-action-canaux.mjs le ${new Date()
  .toISOString()
  .slice(0, 10)}.
NE PAS le modifier — toute retouche se fait dans ${DOC}, puis on relance le script.

`;

const SORTIE = voulue
  ? "docs/_generated/action-canaux-" + voulue + ".txt"
  : "docs/_generated/action-canaux.txt";

mkdirSync("docs/_generated", { recursive: true });
writeFileSync(SORTIE, ENTETE + morceaux.join("\n"), "utf8");
console.log(morceaux.length + " corps assemblé(s) depuis " + DOC + "\n-> " + SORTIE);
