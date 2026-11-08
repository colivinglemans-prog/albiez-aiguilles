/**
 * Étapes du parcours du voyageur, dans l'ordre (`BlogPostMeta.stage`).
 *
 * Module à part, sans données d'articles : le composant client du guide l'importe, et
 * `posts.ts` (toutes les métadonnées) ne doit pas partir dans le paquet du navigateur.
 */
export const STAGES = ["reserver", "preparer", "sur-place"] as const;
export type Stage = (typeof STAGES)[number];
