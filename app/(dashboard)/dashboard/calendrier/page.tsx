"use client";

import { useCallback, useEffect, useState } from "react";
import type { Periode } from "@sejour/socle/lib/periodes";
import type { BandeauSaison } from "@/lib/seasons";
import type { Sejour } from "@/lib/dashboard-types";
import Calendrier from "@/components/dashboard/Calendrier";
import DashboardNav from "@/components/dashboard/DashboardNav";

interface Reponse {
  mois: string;
  role: "admin" | "viewer";
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
  /**
   * Bascule **d'affichage seulement**, réservée à l'administrateur : elle rend l'écran tel
   * que le voit la personne du ménage, pour vérifier ce qu'on lui montre — et surtout ce
   * qu'on ne lui montre pas — avant de lui laisser une consigne.
   *
   * ⚠️ **Ce n'est pas un contrôle de sécurité, et il ne faut pas s'en servir comme tel.**
   * Le cloisonnement réel est serveur : le rôle est porté par le JWT, le proxy refuse les
   * pages interdites, et `/api/dashboard/calendrier` **projette** sa réponse sur une forme
   * réduite pour le rôle `viewer` — les montants et le canal n'atteignent jamais le
   * navigateur. Ici, à l'inverse, l'administrateur a bel et bien reçu les montants : les
   * masquer à l'écran ne les retire pas de la réponse déjà chargée.
   */
  const [vueViewer, setVueViewer] = useState(false);

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

  // Le rôle réel reste celui de la réponse : la bascule ne fait que s'y ajouter.
  const vueRestreinte = data?.role === "viewer" || vueViewer;

  return (
    <>
      <DashboardNav role={data?.role} />

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Calendrier</h1>

          {data?.role === "admin" && (
            <button
              onClick={() => setVueViewer((v) => !v)}
              title="Affichage seulement : le cloisonnement des données est fait côté serveur."
              className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                vueViewer
                  ? "border-border bg-light-bg text-secondary"
                  : "border-primary/20 bg-primary/5 text-primary"
              }`}
            >
              {vueViewer ? "Vue viewer" : "Vue admin"}
            </button>
          )}
        </div>

        <p className="mb-6 mt-0.5 text-sm text-slate-500">
          {vueRestreinte
            ? "Saison de la station en fond, vacances scolaires par zone, séjours en gris. Un séjour marqué 📝 porte une consigne — kit draps et serviettes, heure d'arrivée… — à lire en cliquant dessus."
            : "Saison de la station en fond, vacances scolaires par zone, séjours par canal. Cliquez sur un séjour pour y laisser une consigne de ménage — kit draps et serviettes, heure d'arrivée… — ou pour partager le guide d'arrivée au voyageur."}
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
            viewer={vueRestreinte}
          />
        )}
      </div>
    </>
  );
}
