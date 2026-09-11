import { createAuth } from "@sejour/socle/lib/auth";
import { createRouteGuard } from "@sejour/socle/lib/auth-guard";

/**
 * Authentification du dashboard — configuration locale du mécanisme du socle.
 *
 * Le JWT, le cookie, le repli de rôle et la résolution des mots de passe nommés vivent dans
 * `@sejour/socle/lib/auth`. Ne restent ici que les valeurs propres à ce site.
 *
 * ⚠️ **Ce module ne doit jamais importer `next/headers`** : `proxy.ts` s'en sert et tourne en
 * runtime edge. La pose et le retrait du cookie sont dans `@sejour/socle/lib/auth-cookie`,
 * importés directement par les deux routes de connexion/déconnexion, qui tournent en Node.
 */

/**
 * Deux rôles, deux usages qui n'ont rien à voir.
 *
 * `admin` voit tout. `viewer` n'a accès qu'au calendrier, **sans aucun montant** : la
 * personne qui fait le ménage a besoin de savoir quand le logement se libère et quand il se
 * remplit, pas de ce que rapporte un séjour.
 *
 * Anciennement `menage`, renommé le 2026-09-11 pour s'aligner sur Barbusse : le rôle ne se
 * réduit plus au ménage — c'est un accès en lecture, qui pilote aussi le chauffage là-bas.
 */
export type Role = "admin" | "viewer";

export const auth = createAuth<Role>({
  adminRole: "admin",
  restrictedRole: "viewer",
  // En cas de doute, le moins de droits possible. C'est le comportement historique d'ici,
  // retenu contre celui de Barbusse, qui retombait sur `admin`.
  fallbackRole: "viewer",
  roles: ["admin", "viewer"],
  /*
   * ⚠️ **Les deux préfixes sont acceptés, et c'est délibéré.**
   *
   * Les variables de production s'appellent encore `DASHBOARD_PASSWORD_MENAGE*` sur Vercel.
   * Leur valeur y est un `Secret` illisible après coup : un renommage raté couperait l'accès
   * de la personne qui fait le ménage sans moyen de le rétablir. Le code passe donc à
   * `viewer` sans attendre les variables, et la bascule des noms côté Vercel pourra se faire
   * plus tard, à froid, sans coupure — les deux formes marchant en même temps.
   */
  restrictedPasswordPrefixes: ["DASHBOARD_PASSWORD_MENAGE", "DASHBOARD_PASSWORD_VIEWER"],
});

/** Contrôle de rôle dans un handler de route : la deuxième porte, après le proxy. */
export const guard = createRouteGuard(auth);

export const COOKIE_NAME = auth.cookieName;

export const createToken = auth.createToken;
export const verifyToken = auth.verifyToken;

/** Conservé sous son nom d'origine : ses appelants le connaissent ainsi. */
export const roleDuToken = auth.roleFromToken;
