"use client";

import SocleDashboardNav, {
  type DashboardLink,
} from "@sejour/socle/components/DashboardNav";
import type { Role } from "@/lib/auth";

/**
 * La barre de navigation du dashboard — structure, tiroir mobile et déconnexion — vient du
 * socle (`@sejour/socle/components/DashboardNav`). Ne restent ici que les **données** : le
 * nom du bien et la liste des écrans.
 *
 * Le calendrier est **en tête, et c'est l'accueil** : `/dashboard` y redirige. C'est l'écran
 * qu'on ouvre tous les jours, là où les statistiques se lisent une fois par mois.
 */
const LIENS: DashboardLink[] = [
  { href: "/dashboard/calendrier", label: "Calendrier", adminOnly: false },
  { href: "/dashboard/statistiques", label: "Statistiques", adminOnly: true },
  /*
   * Le guide d'arrivée est une page publique du site, pas un écran du dashboard : il s'ouvre
   * donc dans un onglet à part, pour qu'on puisse le relire sans perdre le calendrier.
   * Admin seulement — c'est l'administrateur qui l'envoie aux voyageurs, la personne du
   * ménage n'a rien à y faire.
   */
  { href: "/fr/guide-arrivee", label: "Guide voyageur", adminOnly: true, external: true },
];

/**
 * Pas de condition de rôle sur le retour au site : la vitrine est publique, et la personne du
 * ménage y trouve l'adresse et l'accès au logement.
 */
const VITRINE: DashboardLink = { href: "/", label: "Retour au site", adminOnly: false };

export default function DashboardNav({ role }: { role?: Role }) {
  return (
    <SocleDashboardNav
      title="Albiez Aiguilles"
      links={LIENS}
      siteLink={VITRINE}
      role={role}
    />
  );
}
