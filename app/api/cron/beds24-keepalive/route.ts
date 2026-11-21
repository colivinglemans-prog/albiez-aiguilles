import { NextRequest, NextResponse } from "next/server";
import { verifyCronAuth } from "@sejour/socle/lib/cron-auth";
import { entretenirTokens } from "@/lib/beds24";
import { beat } from "@/lib/heartbeat";

/**
 * Maintient les quatre refresh tokens Beds24 en vie (le quatrième, messagerie, depuis le 2026-11-08). À appeler une fois par semaine.
 *
 * Beds24 invalide un refresh token qui n'a pas servi depuis 30 jours. Aucun des trois ne
 * s'entretient tout seul de façon fiable : l'écriture ne sert qu'à poser une consigne de
 * ménage, le dashboard n'est ouvert que par intermittence, et le trafic de la vitrine est
 * encore faible. Le site a d'ailleurs perdu ses disponibilités le 2026-09-11, le temps de
 * régénérer des jetons supprimés — le symptôme est un calendrier qui affiche « aucune
 * disponibilité » sans que rien ne soit cassé par ailleurs.
 *
 * Deux des trois morts seraient **silencieuses** : le repli du chemin public prendrait le
 * relais, le tunnel continuerait de fonctionner, et on aurait reperdu la séparation des
 * privilèges sans le voir. D'où ce cron plutôt qu'un pari sur le trafic.
 *
 * Pas d'alerte e-mail ici, contrairement à Barbusse : ce site n'a pas de service d'envoi. La
 * route renvoie un 500 et bat `error` : le battement de cœur (`/api/health/heartbeat`) prévient
 * par ntfy quand aucun passage réussi n'a eu lieu depuis 8 jours.
 *
 * Planifié sur cron-job.org, en-tête `Authorization: Bearer $CRON_SECRET`. La route n'est pas
 * couverte par le matcher de `proxy.ts` — sa protection est ce seul secret.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ erreur: "Non autorisé" }, { status: 401 });
  }

  const etats = await entretenirTokens();
  const echecs = Object.entries(etats).filter(([, e]) => !e.ok);

  if (echecs.length > 0) {
    for (const [nom, etat] of echecs) {
      console.error(
        `[beds24-keepalive] ${nom} : ${"error" in etat ? etat.error : "échec"}. ` +
          "Régénérer un invite code dans Beds24 → Settings → Apps & Integrations → API, " +
          "avec les seuls scopes de cette voie (voir l'en-tête de lib/beds24.ts), " +
          "l'échanger via /authentication/setup — jamais /authentication/token, qui consomme " +
          "le code sans jamais montrer le refresh token.",
      );
    }
    await beat("beds24-keepalive", "error");
    return NextResponse.json({ ok: false, etats }, { status: 500 });
  }

  await beat("beds24-keepalive", "ok");
  return NextResponse.json({ ok: true, etats });
}
