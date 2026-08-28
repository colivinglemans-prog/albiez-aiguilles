import type { SejourAffiche } from "@/lib/dashboard-types";
import { COULEUR_CANAL } from "@/lib/canal";

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;
const jourCourt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });

export default function SejoursTable({
  titre,
  sejours,
  colonne,
}: {
  titre: string;
  sejours: SejourAffiche[];
  colonne: "reserveLe" | "tjm";
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="mb-4 text-base font-semibold text-slate-900">{titre}</h3>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[34rem] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-2 pb-2 font-medium">Séjour</th>
              <th className="px-2 pb-2 font-medium">Canal</th>
              <th className="px-2 pb-2 font-medium">Période</th>
              <th className="px-2 pb-2 text-right font-medium">
                {colonne === "tjm" ? "€ / nuit" : "Réservé le"}
              </th>
              <th className="px-2 pb-2 text-right font-medium">Net</th>
            </tr>
          </thead>
          <tbody>
            {sejours.map((s) => (
              <tr key={`${s.canal}-${s.ref}`} className="border-t border-slate-100">
                <td className="px-2 py-2.5 text-slate-900">
                  {jourCourt(s.arrivee)}
                  <span className="text-slate-400"> → </span>
                  {jourCourt(s.depart)}
                  <span className="ml-1.5 text-xs text-slate-400">{s.nuits} n</span>
                </td>
                <td className="px-2 py-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 text-slate-600"
                    title={s.source === "beds24" ? "Réservation vivante (Beds24)" : "Archive"}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: COULEUR_CANAL[s.canal] }}
                    />
                    {s.canal}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  {s.periode ? (
                    <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                      {s.periode}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-300">hors vacances</span>
                  )}
                </td>
                <td className="px-2 py-2.5 text-right text-slate-600">
                  {colonne === "tjm"
                    ? euros(s.tjm)
                    : s.reserveLe
                      ? jourCourt(s.reserveLe)
                      : "—"}
                </td>
                <td className="px-2 py-2.5 text-right font-medium text-slate-900">
                  {euros(s.net)}
                </td>
              </tr>
            ))}
            {sejours.length === 0 && (
              <tr>
                <td colSpan={5} className="px-2 py-6 text-center text-slate-400">
                  Aucun séjour sur la période.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
