import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Le socle expose du TypeScript brut : c'est Next qui le compile.
  transpilePackages: ["@sejour/socle"],
  /**
   * L'hôte `albiez-aiguilles.vercel.app` est indexé par les moteurs à la place du domaine (relevé par le test
   * voyageur IA-1, 2026-11-07) : 301 vers `https://www.albiez-aiguilles.fr`, même chemin et même requête. Règle de
   * routage Vercel, sans invocation de fonction. **Hôte exact** : les previews
   * (`*-git-*`, `*-<hash>-*`) ne sont pas touchées. **`/api/*` exclu** : les crons Vercel ne
   * suivent pas les redirections, et un webhook ou un cron externe peut viser cet hôte.
   */
  async redirects() {
    return [
      {
        source: "/:path((?!api/).*)",
        has: [{ type: "host", value: "albiez-aiguilles.vercel.app" }],
        destination: "https://www.albiez-aiguilles.fr/:path",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
