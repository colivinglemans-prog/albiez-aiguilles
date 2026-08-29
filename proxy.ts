import { NextResponse, type NextRequest } from "next/server";
import { localeFromAcceptLanguage } from "@/lib/i18n/locales";
import { COOKIE_NAME, roleDuToken, verifyToken } from "@/lib/auth";

/**
 * Deux responsabilités, sans rapport l'une avec l'autre mais qui vivent dans le même
 * fichier parce que Next n'accepte qu'un proxy par projet.
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
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = localeFromAcceptLanguage(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    // Redirection temporaire (307) et non permanente : la destination dépend de l'en-tête
    // du visiteur, la mettre en cache côté navigateur figerait la langue du premier passage.
    return NextResponse.redirect(url, 307);
  }

  // La page de connexion doit rester atteignable, sinon la redirection boucle sur elle-même.
  if (pathname === "/dashboard/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.searchParams.set("retour", pathname);
    return NextResponse.redirect(url);
  }

  // Le rôle `menage` n'a droit qu'au calendrier. Le contrôle vit ici et non dans les pages :
  // une page cliente qui masquerait les montants les aurait quand même reçus dans sa réponse
  // d'API, donc dans le navigateur.
  if ((await roleDuToken(token)) === "menage" && pathname !== "/dashboard/calendrier") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/calendrier";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

/**
 * La racine exacte, et le dashboard. Tout le site vitrine est déjà préfixé par sa langue et
 * rendu statiquement : le faire passer ici ne servirait à rien et coûterait une invocation
 * par requête.
 */
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
