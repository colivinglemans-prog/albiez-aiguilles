"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LIENS = [
  { href: "/dashboard", libelle: "Statistiques", adminSeul: true },
  { href: "/dashboard/calendrier", libelle: "Calendrier", adminSeul: false },
];

/**
 * `role` arrive de la réponse d'API et peut manquer au premier rendu : on affiche alors la
 * navigation complète le temps du chargement. Ce n'est pas une faille — le proxy refuse déjà
 * l'accès aux pages interdites, et l'API ne renvoie pas les montants au rôle `menage`.
 */
export default function DashboardNav({ role }: { role?: "admin" | "menage" }) {
  const pathname = usePathname();
  const router = useRouter();

  async function deconnexion() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/dashboard/login");
  }

  return (
    <nav className="mb-6 flex items-center justify-between gap-4">
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
        {LIENS.filter((l) => !l.adminSeul || role !== "menage").map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === l.href
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {l.libelle}
          </Link>
        ))}
      </div>

      <button
        onClick={deconnexion}
        className="text-sm text-slate-400 transition-colors hover:text-slate-600"
      >
        Déconnexion
      </button>
    </nav>
  );
}
