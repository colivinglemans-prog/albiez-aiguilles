import { createLoginLimiter, createMemoryLoginAttemptStore } from "@sejour/socle/lib/login-attempts";
import { createLoginRoute } from "@sejour/socle/lib/login-route";
import { sendNtfy } from "@sejour/socle/lib/ntfy";
import { auth } from "@/lib/auth";

/**
 * Un mot de passe par rôle. `DASHBOARD_PASSWORD` ouvre tout ; n'importe quelle variable
 * commençant par `DASHBOARD_PASSWORD_MENAGE` — ou `DASHBOARD_PASSWORD_VIEWER`, son futur nom —
 * ouvre le calendrier seul, ce qui permet d'en donner un différent à chaque personne
 * (`DASHBOARD_PASSWORD_MENAGE_Sylvie`) et d'en révoquer un sans changer celui des autres.
 * La résolution est dans le socle.
 *
 * Tentatives limitées (socle) : 5 échecs en 15 min par adresse, puis 429 jusqu'à ce que le plus
 * ancien sorte de la fenêtre. Albiez n'a pas de Redis : le magasin est la mémoire de l'instance,
 * donc la limite vaut par instance Vercel, pas globalement. Une seule alerte au franchissement.
 */
const limiter = createLoginLimiter({
  store: createMemoryLoginAttemptStore(),
  notify: (message) =>
    sendNtfy(message, { title: "Dashboard Albiez", priority: 4, tags: ["warning"] }),
});

export const { POST } = createLoginRoute({ auth, passwordField: "motDePasse", limiter });
