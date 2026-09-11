"use client";

import SocleDashboardNav, {
  type DashboardLink,
} from "@sejour/socle/components/DashboardNav";
import type { Role } from "@/lib/auth";

/**
 * La barre de navigation du dashboard — structure, tiroir mobile et déconnexion — vient du
 * socle (`@sejour/socle/components/DashboardNav`). Ne restent ici que les **données** : le
 * nom du bien et la liste des écrans.
 */
const LIENS: DashboardLink[] = [
  { href: "/dashboard", label: "Statistiques", adminOnly: true },
  { href: "/dashboard/calendrier", label: "Calendrier", adminOnly: false },
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
