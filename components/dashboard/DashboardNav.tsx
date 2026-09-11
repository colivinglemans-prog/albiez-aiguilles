"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Lien {
  href: string;
  libelle: string;
  adminSeul: boolean;
  /** Sort du dashboard : nouvel onglet, et jamais marqué actif. */
  externe?: boolean;
}

const LIENS: Lien[] = [
  { href: "/dashboard", libelle: "Statistiques", adminSeul: true },
  { href: "/dashboard/calendrier", libelle: "Calendrier", adminSeul: false },
  /*
   * Le guide d'arrivée est une page publique du site, pas un écran du dashboard : il s'ouvre
   * donc dans un onglet à part, pour qu'on puisse le relire sans perdre le calendrier.
   * Admin seulement — c'est l'administrateur qui l'envoie aux voyageurs, la personne du
   * ménage n'a rien à y faire.
   */
  { href: "/fr/guide-arrivee", libelle: "Guide voyageur", adminSeul: true, externe: true },
];

/**
 * `role` arrive de la réponse d'API et peut manquer au premier rendu : on affiche alors la
 * navigation complète le temps du chargement. Ce n'est pas une faille — le proxy refuse déjà
 * l'accès aux pages interdites, et l'API ne renvoie pas les montants au rôle `viewer`.
 */
export default function DashboardNav({ role }: { role?: "admin" | "viewer" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ouvert, setOuvert] = useState(false);

  /*
   * Le tiroir se referme au clic de chaque lien, et non par un effet sur `pathname` : la
   * navigation est côté client, le composant n'est pas remonté, mais refermer depuis un
   * `useEffect` déclenche un second rendu en cascade — et le lint le refuse, à raison, la
   * fermeture étant la conséquence directe du clic.
   */

  // Sans ça, la page défile derrière le tiroir ouvert et on la retrouve ailleurs en refermant.
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  async function deconnexion() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/dashboard/login");
  }

  const liensVisibles = LIENS.filter((l) => !l.adminSeul || role !== "viewer");

  const estActif = (lien: Lien) =>
    !lien.externe &&
    (lien.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === lien.href || pathname.startsWith(lien.href + "/"));

  return (
    <header className="border-b border-border bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-6">
          {/* Le titre ramène à l'accueil du dashboard : c'est le réflexe qu'on a sur un site,
              et le seul chemin de retour depuis le calendrier sur un écran étroit. */}
          <Link href="/dashboard" className="text-lg font-bold text-primary">
            Albiez Aiguilles
          </Link>

          <div className="hidden items-center gap-5 md:flex">
            {liensVisibles.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                target={lien.externe ? "_blank" : undefined}
                rel={lien.externe ? "noopener noreferrer" : undefined}
                className={`text-sm font-medium transition-colors ${
                  estActif(lien)
                    ? "text-primary underline underline-offset-4"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {lien.libelle}
                {lien.externe && " ↗"}
              </Link>
            ))}
            {/* Pas de condition de rôle : la vitrine est publique, et la personne du ménage
                y trouve l'adresse et l'accès au logement. */}
            <Link href="/" className="text-sm text-slate-400 hover:text-secondary">
              Retour au site
            </Link>
          </div>
        </div>

        <button
          onClick={deconnexion}
          className="hidden text-sm text-slate-400 transition-colors hover:text-secondary md:block"
        >
          Déconnexion
        </button>

        <button
          type="button"
          onClick={() => setOuvert(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={ouvert}
          aria-controls="menu-dashboard"
          className="rounded-md p-2 text-secondary hover:bg-light-bg md:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Tiroir mobile. Toujours dans le DOM et seulement translaté hors écran : monté au
          clic, il n'aurait pas d'état de départ à animer et apparaîtrait d'un coup. */}
      <div
        id="menu-dashboard"
        className={`fixed inset-0 z-50 md:hidden ${ouvert ? "" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setOuvert(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            ouvert ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl transition-transform ${
            ouvert ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="text-base font-bold text-primary">Albiez Aiguilles</span>
            <button
              type="button"
              onClick={() => setOuvert(false)}
              aria-label="Fermer le menu"
              className="rounded-md p-2 text-secondary hover:bg-light-bg"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto px-3 py-4">
            {liensVisibles.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  target={lien.externe ? "_blank" : undefined}
                  rel={lien.externe ? "noopener noreferrer" : undefined}
                  onClick={() => setOuvert(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    estActif(lien)
                      ? "bg-light-bg text-primary"
                      : "text-slate-700 hover:bg-light-bg"
                  }`}
                >
                  {lien.libelle}
                  {lien.externe && " ↗"}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/"
                onClick={() => setOuvert(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-secondary hover:bg-light-bg"
              >
                Retour au site
              </Link>
            </li>
          </ul>

          <div className="border-t border-border p-4">
            <button
              onClick={deconnexion}
              className="w-full rounded-full border border-border px-4 py-2 text-sm font-medium text-secondary hover:bg-light-bg"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
