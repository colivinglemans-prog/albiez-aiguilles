"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LIENS = [
  { href: "/dashboard", libelle: "Statistiques" },
  { href: "/dashboard/calendrier", libelle: "Calendrier" },
];

export default function DashboardNav() {
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
        {LIENS.map((l) => (
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
