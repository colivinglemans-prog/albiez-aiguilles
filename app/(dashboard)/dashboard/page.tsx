"use client";

import { useCallback, useEffect, useState } from "react";
import type { ModeRevenu, StatsDashboard } from "@/lib/dashboard-types";
import StatsCards from "@/components/dashboard/StatsCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ComparaisonAnnuelle from "@/components/dashboard/ComparaisonAnnuelle";
import CanauxChart from "@/components/dashboard/CanauxChart";
import SejoursTable from "@/components/dashboard/SejoursTable";
import DashboardNav from "@/components/dashboard/DashboardNav";

const PERIODES = [
  { valeur: "annee", libelle: "Année en cours" },
  { valeur: "precedente", libelle: "Année précédente" },
  { valeur: "12m", libelle: "12 derniers mois" },
  { valeur: "toute", libelle: "Tout l'historique" },
];

const MODES: { valeur: ModeRevenu; libelle: string }[] = [
  { valeur: "reparti", libelle: "Réparti par nuit" },
  { valeur: "arrivee", libelle: "Par arrivée" },
  { valeur: "depart", libelle: "Par départ" },
  { valeur: "reservation", libelle: "Par date de réservation" },
];

type Reponse = StatsDashboard & { beds24Erreur?: string | null };

export default function DashboardPage() {
  const [periode, setPeriode] = useState("annee");
  const [mode, setMode] = useState<ModeRevenu>("reparti");
  const [stats, setStats] = useState<Reponse | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur("");
    try {
      const res = await fetch(`/api/dashboard/stats?periode=${periode}&mode=${mode}`);
      if (!res.ok) throw new Error(String(res.status));
      setStats(await res.json());
    } catch {
      setErreur("Impossible de charger les statistiques.");
    } finally {
      setChargement(false);
    }
  }, [periode, mode]);

  useEffect(() => {
    charger();
  }, [charger]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <DashboardNav />

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Albiez — statistiques</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Hameau des Aiguilles · quatre canaux réunis
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as ModeRevenu)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:border-sky-500 focus:outline-none"
          >
            {MODES.map((m) => (
              <option key={m.valeur} value={m.valeur}>
                {m.libelle}
              </option>
            ))}
          </select>

          <div className="flex rounded-lg bg-slate-100 p-0.5">
            {PERIODES.map((p) => (
              <button
                key={p.valeur}
                onClick={() => setPeriode(p.valeur)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  periode === p.valeur
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {p.libelle}
              </button>
            ))}
          </div>
        </div>
      </header>

      {chargement && (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500" />
        </div>
      )}

      {erreur && <div className="rounded-2xl bg-rose-50 p-6 text-rose-700">{erreur}</div>}

      {stats && !chargement && (
        <div className="space-y-6">
          {stats.archiveManquante && (
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
              <strong>Archive introuvable.</strong> Ni la variable{" "}
              <code className="rounded bg-amber-100 px-1">HISTORIQUE_ALBIEZ</code>, ni le fichier{" "}
              <code className="rounded bg-amber-100 px-1">data/archive-albiez.json</code>. Les
              chiffres ci-dessous ne portent donc que sur Beds24, c&apos;est-à-dire sur
              l&apos;après-28 août 2026 — ce n&apos;est pas une année creuse, c&apos;est une
              archive manquante. Lancer{" "}
              <code className="rounded bg-amber-100 px-1">node scripts/build-archive.mjs</code>.
            </div>
          )}

          {stats.beds24Erreur && (
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
              <strong>Beds24 injoignable.</strong> L&apos;historique archivé s&apos;affiche, mais
              les réservations vivantes manquent. Détail : {stats.beds24Erreur}
            </div>
          )}

          <StatsCards stats={stats} />

          <p className="text-xs text-slate-400">
            Les indicateurs ci-dessus suivent la période choisie. Les trois blocs qui suivent
            couvrent toujours toutes les années — c&apos;est leur raison d&apos;être.
          </p>

          <RevenueChart data={stats.graphe} />

          <ComparaisonAnnuelle
            comparaison={stats.comparaison}
            jourDeReference={new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" })}
          />

          {/* Pleine largeur et non côte à côte : sur une demi-colonne, les cinq colonnes du
              tableau imposaient un défilement horizontal qui masquait le prix et le net. */}
          <SejoursTable
            titre="Réservations récentes"
            sejours={stats.sejoursRecents}
            colonne="reserveLe"
          />
          <SejoursTable
            titre="Meilleurs séjours (€ / nuit)"
            sejours={stats.meilleursSejours}
            colonne="tjm"
          />

          <CanauxChart data={stats.canauxParAnnee} />
        </div>
      )}
    </div>
  );
}
