"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { anchorBase } from "@/lib/anchors";

/**
 * Barre « Réserver » fixée en bas de l'écran, sur mobile seulement.
 *
 * Sur téléphone, le bouton de l'en-tête est rangé dans le menu burger. 71 % des clics Google
 * arrivent sur mobile (Search Console, 90 jours au 2026-11-08), surtout sur les articles du
 * guide, d'où cette barre. Elle n'a pas sa place dans l'en-tête : le nom du logement passe
 * déjà sur deux lignes à côté de la langue et du burger.
 *
 * Même cible que le bouton de l'en-tête : le calendrier de la page courante sur l'accueil et
 * les pages de saison, celui de l'accueil ailleurs. Elle s'efface quand le calendrier est à
 * l'écran (deux boutons pour la même action se concurrencent). L'espaceur final empêche la
 * barre de recouvrir le bas du pied de page.
 */
/**
 * Pages où la barre n'a rien à faire : le devis (il porte son propre lien de réservation)
 * et le guide d'arrivée (le voyageur a déjà réservé).
 */
const HIDDEN_SECTIONS = new Set(["devis", "guide-arrivee"]);

export default function MobileBookBar() {
  const { locale, t } = useTranslation();
  const pathname = usePathname() || `/${locale}`;
  // L'état garde le chemin qu'il décrit : après une navigation, l'ancien « masqué » ne vaut plus.
  const [seen, setSeen] = useState<{ path: string; hidden: boolean }>({ path: "", hidden: false });
  const hidden = seen.path === pathname && seen.hidden;

  // La barre vit dans le layout et survit aux navigations : on relit l'ancre de chaque page.
  useEffect(() => {
    // Seuls l'accueil et les pages de saison portent le calendrier. L'index du guide a lui aussi
    // une section `id="reserver"` (l'étape « Choisir » du parcours) : l'observer y masquerait la
    // barre dès le chargement, sur la page d'entrée mobile qu'elle doit servir.
    if (anchorBase(pathname, locale) !== pathname) return;
    const target = document.getElementById("reserver");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setSeen({ path: pathname, hidden: entry.isIntersecting }),);
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname, locale]);

  if (HIDDEN_SECTIONS.has((pathname ?? "").split("/")[2] ?? "")) return null;

  return (
    <>
      <div aria-hidden className="h-20 md:hidden" />
      <div
        aria-hidden={hidden || undefined}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-white/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-200 md:hidden ${
          hidden ? "pointer-events-none translate-y-full" : ""
        }`}
      >
        <Link
          href={`${anchorBase(pathname, locale)}#reserver`}
          tabIndex={hidden ? -1 : undefined}
          className="block rounded-full bg-primary py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {t.header.book}
        </Link>
      </div>
    </>
  );
}
