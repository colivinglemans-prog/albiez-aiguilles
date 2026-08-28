"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const retour = params.get("retour") ?? "/dashboard";
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motDePasse }),
      });
      if (!res.ok) {
        const { erreur } = await res.json().catch(() => ({ erreur: "Connexion impossible" }));
        setErreur(erreur ?? "Connexion impossible");
        return;
      }
      // `refresh()` avant `push()` : sans ça le proxy revalide avec l'ancien cookie et
      // renvoie aussitôt vers cette page.
      router.refresh();
      router.push(retour);
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={soumettre}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-lg font-semibold text-slate-900">Albiez — espace privé</h1>
        <p className="mt-1 text-sm text-slate-500">
          Statistiques et calendrier du Hameau des Aiguilles.
        </p>

        <label htmlFor="mdp" className="mt-6 block text-sm font-medium text-slate-700">
          Mot de passe
        </label>
        <input
          id="mdp"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />

        {erreur && <p className="mt-3 text-sm text-rose-600">{erreur}</p>}

        <button
          type="submit"
          disabled={envoi || motDePasse.length === 0}
          className="mt-6 w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white transition-colors hover:bg-sky-700 disabled:opacity-50"
        >
          {envoi ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
