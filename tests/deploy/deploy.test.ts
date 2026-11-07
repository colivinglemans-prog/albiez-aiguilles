/**
 * Contrôles post-déploiement et surveillance d'Albiez : le moteur est celui du socle, les
 * attendus sont dans `./site.ts`. Lancé par `npm run test:deploy` (jamais par `npm test`).
 */
import { defineDeploySuite } from "@sejour/socle/testing/deploy/vitest-suite";
import site from "./site";

defineDeploySuite(site);
