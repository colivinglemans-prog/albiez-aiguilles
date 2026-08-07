/**
 * Les espaces du logement — l'axe qui organise les photos, en plus de la saison.
 *
 * Une photo appartient à un espace (le sous-dossier) et à une saison (le dossier
 * parent) : `hiver/balcon/`, `commun/chambre/`. Les deux axes se composent au lieu de
 * se disputer un seul dossier, ce qui permet au balcon d'avoir ses photos d'été *et*
 * d'hiver sans que la galerie ne les mélange.
 *
 * L'ordre ci-dessous est celui de la visite, pas l'ordre alphabétique : on entre par
 * le séjour et on finit dehors. C'est pour cette raison qu'il est écrit ici et non
 * déduit du système de fichiers.
 *
 * Module volontairement sans dépendance (ni `fs`, ni dictionnaire) : il est importé
 * aussi bien par le code serveur qui lit les dossiers que par le typage i18n.
 */
export const SPACES = [
  // Le séjour est une pièce unique. La découper en trois espaces suit le découpage
  // Airbnb, qui décrit des usages plutôt que des murs — et laisse chaque usage porter
  // ses propres équipements.
  "salon",
  "kitchenette",
  "espace-repas",
  "chambre",
  // Le coin montagne n'est pas une chambre fermée (cf. `PROPERTY.capacity.alcoves`) :
  // il garde son nom plutôt que de devenir « chambre 2 ».
  "coin-montagne",
  "salle-de-bains",
  "balcon",
  "exterieur",
] as const;

export type SpaceKey = (typeof SPACES)[number];

/** Position d'un espace dans la visite ; les dossiers inconnus passent à la fin. */
export function spaceOrder(key: string): number {
  const i = (SPACES as readonly string[]).indexOf(key);
  return i === -1 ? SPACES.length : i;
}
