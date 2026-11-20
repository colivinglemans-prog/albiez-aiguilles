/**
 * Destination après connexion : un chemin **interne au dashboard**, sinon `/dashboard`.
 *
 * `?retour=` vient de l'adresse, donc de n'importe qui : pris tel quel, un lien
 * `…/dashboard/login?retour=https://autre-site` renvoyait l'hôte, une fois connecté, vers une
 * page imitant le dashboard (redirection ouverte, corrigée le 2026-11-20). Même règle que chez
 * Barbusse : `/dashboard` ou `/dashboard/…`, lettres, chiffres, tirets et barres seulement —
 * ni schéma, ni `//`, ni `\`, ni requête.
 */
export function destinationApresConnexion(retour: string | null): string {
  return retour && /^\/dashboard(?:\/[a-z0-9\-/]*)?$/i.test(retour) && !retour.startsWith("//")
    ? retour
    : "/dashboard";
}
