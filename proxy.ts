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

  // Une route d'API répond par un statut, jamais par une redirection : un client qui reçoit
  // un 307 vers du HTML tente de le parser en JSON et échoue de façon illisible.
  const estApi = pathname.startsWith("/api/");
  const refuser = (statut: number, message: string) =>
    estApi
      ? NextResponse.json({ erreur: message }, { status: statut })
      : (() => {
          const url = request.nextUrl.clone();
          url.pathname = "/dashboard/login";
          url.searchParams.set("retour", pathname);
          return NextResponse.redirect(url);
        })();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) return refuser(401, "Authentification requise");

  /**
   * Le rôle `menage` n'a droit qu'au calendrier — la page comme son API.
   *
   * Le contrôle vit ici et non dans les pages : une page cliente qui masquerait les montants
   * les aurait quand même reçus dans sa réponse d'API, donc dans le navigateur.
   */
  if ((await roleDuToken(token)) === "menage") {
    const autorise =
      pathname === "/dashboard/calendrier" || pathname.startsWith("/api/dashboard/calendrier");
    if (!autorise) {
      if (estApi) return NextResponse.json({ erreur: "Réservé à l'administrateur" }, { status: 403 });
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/calendrier";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

/**
 * La racine exacte, les pages du dashboard, **et ses routes d'API**.
 *
 * ⚠️ `/api/dashboard/:path*` manquait jusqu'au 2026-08-31, et c'était un trou béant : les
 * pages redirigeaient bien vers la connexion, mais `/api/dashboard/stats` répondait 200 à
 * n'importe qui — chiffre d'affaires, séjours et répartition par canal en clair. Protéger la
 * page sans protéger l'API qu'elle appelle ne protège rien.
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
