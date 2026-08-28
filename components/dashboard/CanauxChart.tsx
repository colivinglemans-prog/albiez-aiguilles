"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CANAUX, COULEUR_CANAL } from "@/lib/canal";
import type { CanauxAnnee } from "@/lib/dashboard-types";

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

/**
 * Répartition par canal, année par année.
 *
 * Un camembert par période ne répondait qu'à « quelle est ma dépendance aux plateformes
 * aujourd'hui ». La vraie question est « comment évolue-t-elle », et elle demande de voir les
 * années côte à côte : des barres empilées donnent d'un coup le total et le mix.
 *
 * Le tableau sous le graphe porte les pourcentages, que l'empilement rend impossibles à
 * estimer à l'œil quand les totaux annuels diffèrent.
 */
export default function CanauxChart({ data }: { data: CanauxAnnee[] }) {
  if (data.length === 0) return null;

  const canauxPresents = CANAUX.filter((c) =>
    data.some((a) => a.canaux.some((x) => x.canal === c && x.revenu > 0)),
  );

  const lignes = data.map((a) => {
    const ligne: Record<string, number | string> = {
      annee: a.enCours ? `${a.annee} (à date)` : String(a.annee),
    };
    for (const canal of canauxPresents) {
      ligne[canal] = a.canaux.find((x) => x.canal === canal)?.revenu ?? 0;
    }
    return ligne;
  });

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-base font-semibold text-slate-900">Répartition par canal</h3>
      <p className="mt-0.5 text-sm text-slate-500">
        Net encaissé par année, rattaché à l&apos;année d&apos;arrivée du séjour
      </p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={lignes}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="annee"
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
              formatter={(v, nom) => [euros(Number(v)), String(nom)]}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 14px rgba(15,23,42,0.1)",
                fontSize: 13,
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
            {canauxPresents.map((canal) => (
              <Bar key={canal} dataKey={canal} stackId="canaux" fill={COULEUR_CANAL[canal]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Comme les tableaux de séjours : cartes en dessous de `md`, tableau au-dessus.
          Aucun conteneur défilant — les pourcentages sont justement ce qu'on vient lire. */}
      <ul className="mt-4 space-y-3 md:hidden">
        {[...data].reverse().map((a) => (
          <li key={a.annee} className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-baseline justify-between">
              <span className="font-medium text-slate-900">
                {a.annee}
                {a.enCours && <span className="ml-1 text-xs text-slate-400">à date</span>}
              </span>
              <span className="font-semibold text-slate-900">{euros(a.total)}</span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              {a.canaux.map((c) => (
                <span key={c.canal} className="whitespace-nowrap">
                  {c.canal} {euros(c.revenu)}{" "}
                  <span className="text-slate-400">({Math.round(c.part)} %)</span>
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <table className="mt-4 hidden w-full text-sm md:table">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-slate-400">
            <th className="pb-2 pr-3 text-left font-medium">Année</th>
            {canauxPresents.map((c) => (
              <th key={c} className="pb-2 pr-3 text-right font-medium">
                {c}
              </th>
            ))}
            <th className="pb-2 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {[...data].reverse().map((a) => (
            <tr key={a.annee} className="border-t border-slate-100">
              <td className="whitespace-nowrap py-2 pr-3 font-medium text-slate-900">
                {a.annee}
                {a.enCours && <span className="ml-1 text-xs text-slate-400">à date</span>}
              </td>
              {canauxPresents.map((canal) => {
                const e = a.canaux.find((x) => x.canal === canal);
                return (
                  <td key={canal} className="whitespace-nowrap py-2 pr-3 text-right">
                    {e ? (
                      <>
                        <span className="text-slate-900">{euros(e.revenu)}</span>
                        <span className="ml-1.5 text-xs text-slate-400">
                          {Math.round(e.part)} %
                        </span>
                      </>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                );
              })}
              <td className="whitespace-nowrap py-2 text-right font-semibold text-slate-900">
                {euros(a.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
