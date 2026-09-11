import { createDashboardProxy } from "@sejour/socle/lib/proxy";
import { localeFromAcceptLanguage } from "@/lib/i18n/locales";
import { auth } from "@/lib/auth";

/**
 * Deux responsabilités, sans rapport l'une avec l'autre mais qui vivent dans le même fichier
 * parce que Next n'accepte qu'un proxy par projet. Elles sont ici des **données** passées au
 * socle ; la mécanique — helper de refus unique, JSON pour une API et redirection pour une
 * page, `?retour=` conservé — est commune aux deux sites.
 *
 * 1. **`/` → la langue du visiteur.** C'était auparavant une `app/page.tsx` qui lisait les
 *    en-têtes. Le déplacer ici a deux effets : la négociation devient un vrai tri par poids
 *    `q=` sur cinq langues, et la racine de `app/` ne contient plus de page — ce qui permet
 *    à `app/(site)/[locale]/layout.tsx` d'être un layout racine et de rendre
 *    `<html lang={locale}>` correctement, au lieu du `lang="fr"` figé qu'un `useEffect`
 *    rattrapait après l'hydratation.
 *
 * 2. **`/dashboard` derrière le cookie.** Sans ça, les pages seraient publiques et seules
 *    les routes d'API refuseraient de répondre : le visiteur verrait un dashboard vide plutôt
 *    qu'un écran de connexion.
 *
 * Fichier `proxy.ts` et non `middleware.ts` : c'est la convention de Next 16, l'ancien nom
 * étant déprécié.
 *
 * ⚠️ Runtime edge : n'importe que `@/lib/auth`, qui ne tire pas `next/headers`.
 */
export const proxy = createDashboardProxy({
  auth,
  restrictedRole: "viewer",

  /**
   * Le rôle `viewer` n'a droit qu'au calendrier — la page comme son API.
   *
   * Le contrôle vit ici et non dans les pages : une page cliente qui masquerait les montants
   * les aurait quand même reçus dans sa réponse d'API, donc dans le navigateur. Mais il ne
   * vit **pas que** ici : les routes qui portent du chiffre le revérifient chacune.
   */
  allowedPaths: ["/dashboard/calendrier", "/api/dashboard/calendrier"],

  protectedPaths: ["/dashboard", "/api/dashboard"],
  publicPaths: ["/dashboard/login"],
  loginPath: "/dashboard/login",
  restrictedHome: "/dashboard/calendrier",

  localeRedirect: { path: "/", negotiate: localeFromAcceptLanguage },
});

/**
 * La racine exacte, les pages du dashboard, **et ses routes d'API**.
 *
 * ⚠️ `/api/dashboard/:path*` manquait jusqu'au 2026-08-31, et c'était un trou béant : les
 * pages redirigeaient bien vers la connexion, mais `/api/dashboard/stats` répondait 200 à
 * n'importe qui — chiffre d'affaires, séjours et répartition par canal en clair. Protéger la
 * page sans protéger l'API qu'elle appelle ne protège rien. Depuis, `stats` refait le
 * contrôle elle-même : un matcher est une liste, et une liste s'oublie.
 *
 * `/api/disponibilites` reste volontairement en dehors : elle est publique par conception et
 * ne renvoie que des dates et des booléens.
 *
 * Tout le site vitrine est déjà préfixé par sa langue et rendu statiquement : le faire passer
 * ici ne servirait à rien et coûterait une invocation par requête.
 */
export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/dashboard/:path*"],
};
