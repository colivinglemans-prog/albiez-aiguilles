"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RevenueChartData } from "@/lib/dashboard-types";
import { COULEUR_CANAL } from "@/lib/canal";

/**
 * Revenus mensuels, en deux lectures.
 *
 * **Par année** (défaut) : l'axe X porte les douze mois et chaque mois contient un rectangle
 * par année, côte à côte. C'est l'absence de `stackId` sur les `<Bar>` qui les met côte à
 * côte — avec un `stackId` commun, Recharts les empilerait.
 *
 * **Par canal** : une seule barre par mois, empilée Airbnb / Booking / Abritel / Direct, sur
 * l'année en cours.
 *
 * Ce composant ne connaît ni Albiez, ni Beds24, ni la provenance des chiffres : il ne lit que
 * `RevenueChartData`. C'est délibéré — Barbusse doit pouvoir le reprendre en produisant la
 * même forme, sans toucher au graphe.
 */

/** Bleus de plus en plus soutenus : l'année la plus récente est la plus foncée. */
const TEINTES_ANNEES = ["#bae6fd", "#7dd3fc", "#38bdf8", "#0284c7", "#075985"];

const euros = (v: number) => `${Math.round(v).toLocaleString("fr-FR")} €`;

export default function RevenueChart({ data }: { data: RevenueChartData }) {
  const [vue, setVue] = useState<"annee" | "canal">("annee");
  const [masquees, setMasquees] = useState<Set<number>>(new Set());
  // La vue par canal empile déjà quatre séries : y superposer plusieurs années la rendrait
  // illisible. Une année à la fois, choisie ici, sans aller-retour serveur — toutes les
  // années sont déjà dans `data.parCanal`.
  const [anneeCanal, setAnneeCanal] = useState(data.anneeCourante);

  const anneesVisibles = data.annees.filter((a) => !masquees.has(a));
  const lignesCanal = data.parCanal[String(anneeCanal)] ?? [];

  function basculer(annee: number) {
    setMasquees((prec) => {
      const suivant = new Set(prec);
      if (suivant.has(annee)) suivant.delete(annee);
      // Toujours laisser au moins une année : un graphe vide n'apprend rien.
      else if (anneesVisibles.length > 1) suivant.add(annee);
      return suivant;
    });
  }

  const couleurAnnee = (annee: number) =>
    TEINTES_ANNEES[
      Math.max(0, TEINTES_ANNEES.length - data.annees.length) + data.annees.indexOf(annee)
    ] ?? "#0284c7";

  const libelleAnnee = (annee: number) =>
    annee === data.anneeCourante ? `${annee} (à date)` : String(annee);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Revenus mensuels</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            Net encaissé, réparti sur les nuits du séjour
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {vue === "canal" && (
            <select
              value={anneeCanal}
              onChange={(e) => setAnneeCanal(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 focus:border-sky-500 focus:outline-none"
            >
              {data.annees.map((annee) => (
                <option key={annee} value={annee}>
                  {annee}
                </option>
              ))}
            </select>
          )}

          {vue === "annee" && (
            <div className="flex flex-wrap gap-1.5">
              {data.annees.map((annee) => {
                const visible = !masquees.has(annee);
                return (
                  <button
                    key={annee}
                    onClick={() => basculer(annee)}
                    aria-pressed={visible}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      visible
                        ? "bg-slate-100 text-slate-700"
                        : "bg-white text-slate-400 ring-1 ring-slate-200"
                    }`}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-sm"
                      style={{ backgroundColor: visible ? couleurAnnee(annee) : "#e2e8f0" }}
                    />
                    {annee}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex rounded-lg bg-slate-100 p-0.5">
            {(["annee", "canal"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVue(v)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  vue === v ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                }`}
              >
                {v === "annee" ? "Par année" : "Par canal"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vue === "annee" ? data.parAnnee : lignesCanal} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="mois"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v} €`}
            />
            <Tooltip
              formatter={(valeur, nom) => [euros(Number(valeur)), String(nom)]}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 14px rgba(15,23,42,0.1)",
                fontSize: 13,
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#64748b" }} />

            {vue === "annee"
              ? anneesVisibles.map((annee) => (
                  // Pas de `stackId` : c'est ce qui produit un rectangle par année côte à
                  // côte à l'intérieur de chaque mois.
                  <Bar
                    key={annee}
                    dataKey={String(annee)}
                    name={libelleAnnee(annee)}
                    fill={couleurAnnee(annee)}
                    radius={[3, 3, 0, 0]}
                  >
                    {data.parAnnee.map((_, mois) => (
                      // L'année en cours est incomplète : ses mois non écoulés sont
                      // estompés, pour qu'un creux de fin d'année ne se lise pas comme un
                      // effondrement.
                      <Cell
                        key={mois}
                        fillOpacity={
                          annee === data.anneeCourante && mois + 1 > data.dernierMoisEcoule
                            ? 0.3
                            : 1
                        }
                      />
                    ))}
                  </Bar>
                ))
              : data.canaux.map((canal) => (
                  <Bar
                    key={canal}
                    dataKey={canal}
                    name={canal}
                    stackId="canaux"
                    fill={COULEUR_CANAL[canal as keyof typeof COULEUR_CANAL] ?? "#94a3b8"}
                  />
                ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {vue === "canal" && (
        <p className="mt-3 text-xs text-slate-400">
          Mix de canaux mois par mois sur {anneeCanal}. Changer d&apos;année avec le sélecteur
          ci-dessus.
        </p>
      )}
    </section>
  );
}
