"use client";

import { useCallback, useEffect, useState } from "react";
import type { Periode } from "@/lib/periodes";
import type { BandeauSaison } from "@/lib/seasons";
import type { Sejour } from "@/lib/dashboard-types";
import Calendrier from "@/components/dashboard/Calendrier";
import DashboardNav from "@/components/dashboard/DashboardNav";

interface Reponse {
  mois: string;
  role: "admin" | "menage";
  sejours: Sejour[];
  periodes: Periode[];
  saisons: BandeauSaison[];
  beds24Erreur: string | null;
}

export default function CalendrierPage() {
  const [mois, setMois] = useState(() =>
    new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" }).slice(0, 7),
  );
  const [data, setData] = useState<Reponse | null>(null);
  const [erreur, setErreur] = useState("");

  const charger = useCallback(async () => {
    setErreur("");
    try {
      const res = await fetch(`/api/dashboard/calendrier?mois=${mois}`);
      if (!res.ok) throw new Error(String(res.status));
      setData(await res.json());
    } catch {
      setErreur("Impossible de charger le calendrier.");
    }
  }, [mois]);

  useEffect(() => {
    charger();
  }, [charger]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <DashboardNav role={data?.role} />

      <h1 className="text-2xl font-bold text-slate-900">Calendrier</h1>
      <p className="mb-6 mt-0.5 text-sm text-slate-500">
        {data?.role === "menage"
          ? "Les jours marqués MÉNAGE sont les départs : c'est là qu'il faut intervenir."
          : "Saison de la station en fond, vacances scolaires par zone, séjours par canal."}
      </p>

      {erreur && <div className="rounded-2xl bg-rose-50 p-6 text-rose-700">{erreur}</div>}

      {data?.beds24Erreur && (
        <div className="mb-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
          <strong>Beds24 injoignable.</strong> Les séjours archivés s&apos;affichent, mais les
          réservations vivantes manquent.
        </div>
      )}

      {/* Le composant reste monté pendant le rechargement : sans ça, changer de mois faisait
          disparaître la grille puis réapparaître, ce qui donne une impression de saccade. */}
      {data && (
        <Calendrier
          mois={mois}
          sejours={data.sejours}
          periodes={data.periodes}
          saisons={data.saisons}
          onMois={setMois}
          menage={data.role === "menage"}
        />
      )}
    </div>
  );
}
