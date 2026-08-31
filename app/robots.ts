import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/property";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /*
       * Le dashboard est déjà protégé par `proxy.ts` — un robot n'y verrait qu'une
       * redirection vers l'écran de connexion. L'exclure sert donc au référencement, pas à la
       * sécurité : sans ça, `/dashboard/login` est indexable, et une page de connexion dans
       * les résultats de recherche ne rend service à personne.
       *
       * `/api/dashboard` est cité séparément : les chemins de robots.txt se comparent par
       * préfixe, et ces routes ne sont pas sous `/dashboard`. Elles répondent 401 sans cookie,
       * ce qui apparaîtrait en erreurs d'exploration dans Search Console — du bruit dans le
       * seul rapport qu'on vient de mettre en place.
       *
       * En revanche **on ne bloque pas `/api` en entier** : `/api/disponibilites` est appelée
       * par le calendrier de réservation, et Googlebot exécute le JavaScript. La bloquer
       * ferait rendre la page avec un calendrier vide aux yeux de Google.
       */
      disallow: ["/dashboard", "/api/dashboard"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
