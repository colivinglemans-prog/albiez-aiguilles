import { NextResponse, type NextRequest } from "next/server";
import { localeFromAcceptLanguage } from "@/lib/i18n/locales";

/**
 * Oriente `/` vers la langue du visiteur.
 *
 * C'était auparavant une `app/page.tsx` qui lisait les en-têtes. Le déplacer ici a deux
 * effets : la négociation devient un vrai tri par poids `q=` sur cinq langues, et la
 * racine de `app/` ne contient plus de page — ce qui permet à `app/[locale]/layout.tsx`
 * d'être le layout racine et de rendre `<html lang={locale}>` correctement, au lieu du
 * `lang="fr"` figé qu'un `useEffect` rattrapait après l'hydratation.
 *
 * Fichier `proxy.ts` et non `middleware.ts` : c'est la convention de Next 16, l'ancien
 * nom étant déprécié.
 *
 * Redirection temporaire (307) et non permanente : la destination dépend de l'en-tête du
 * visiteur, la mettre en cache côté navigateur figerait la langue du premier passage.
 */
export function proxy(request: NextRequest) {
  const locale = localeFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url, 307);
}

/**
 * Le proxy ne s'occupe que de la racine exacte. Tout le reste du site est déjà préfixé
 * par sa langue et rendu statiquement : le faire passer ici ne servirait à rien et
 * coûterait une invocation par requête.
 */
export const config = {
  matcher: "/",
};
