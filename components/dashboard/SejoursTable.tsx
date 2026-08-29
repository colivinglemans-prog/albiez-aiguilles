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

/**
 * Deux rendus du même contenu, et aucun ascenseur dans l'un ni dans l'autre.
 *
 * Cinq ou six colonnes ne tiennent pas sous ~34 rem : les mettre dans un conteneur défilant
 * faisait disparaître le prix et le net hors de l'écran, c'est-à-dire ce qu'on vient lire.
 * En dessous de `md`, le tableau est donc remplacé par une liste de cartes qui empile la même
 * information verticalement — rien n'est masqué, rien ne défile latéralement. Au-dessus de
 * `md`, le tableau reprend, sans largeur minimale imposée.
 */
export default function SejoursTable({
  titre,
  sejours,
  reserveLe = false,
}: {
  titre: string;
  sejours: SejourAffiche[];
  /**
   * Ajoute la date de réservation. Le prix par nuit, lui, est toujours affiché : c'est
   * l'indicateur qui permet de juger un séjour, et il manquait au tableau des réservations
   * récentes où l'on regarde justement si les dernières prises se vendent bien.
   */
  reserveLe?: boolean;
}) {
  const Canal = ({ s }: { s: SejourAffiche }) => (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap text-slate-600"
      title={s.source === "beds24" ? "Réservation vivante (Beds24)" : "Archive"}
    >
      <span
        className="inline-block h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: COULEUR_CANAL[s.canal] }}
      />
      {s.canal}
    </span>
  );

  const Periode = ({ s }: { s: SejourAffiche }) =>
    s.periode ? (
      <span className="whitespace-nowrap rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
        {s.periode}
      </span>
    ) : (
      <span className="text-xs text-slate-300">hors vacances</span>
    );

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="mb-4 text-base font-semibold text-slate-900">{titre}</h3>

      {sejours.length === 0 && (
        <p className="py-6 text-center text-slate-400">Aucun séjour sur la période.</p>
      )}

      {/* Cartes — petits écrans */}
      <ul className="space-y-3 md:hidden">
        {sejours.map((s) => (
          <li key={`${s.canal}-${s.ref}`} className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-slate-900">
                {jourCourt(s.arrivee)} <span className="text-slate-400">→</span>{" "}
                {jourCourt(s.depart)}
              </span>
              <span className="text-sm font-semibold text-slate-900">{euros(s.net)}</span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <Canal s={s} />
              <span className="text-slate-400">{s.nuits} nuits</span>
              <span className="text-slate-400">{euros(s.tjm)} / nuit</span>
              {reserveLe && (
                <span className="text-slate-400">
                  réservé le {s.reserveLe ? jourCourt(s.reserveLe) : "—"}
                </span>
              )}
              <Periode s={s} />
            </div>
          </li>
        ))}
      </ul>

      {/* Tableau — à partir de md, où toutes les colonnes tiennent sans défilement */}
      {sejours.length > 0 && (
        <table className="hidden w-full text-sm md:table">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="pb-2 pr-3 font-medium">Séjour</th>
              <th className="pb-2 pr-3 font-medium">Canal</th>
              <th className="pb-2 pr-3 font-medium">Période</th>
              {reserveLe && <th className="pb-2 pr-3 text-right font-medium">Réservé le</th>}
              <th className="pb-2 pr-3 text-right font-medium">€ / nuit</th>
              <th className="pb-2 text-right font-medium">Net</th>
            </tr>
          </thead>
          <tbody>
            {sejours.map((s) => (
              <tr key={`${s.canal}-${s.ref}`} className="border-t border-slate-100">
                <td className="whitespace-nowrap py-2.5 pr-3 text-slate-900">
                  {jourCourt(s.arrivee)}
                  <span className="text-slate-400"> → </span>
                  {jourCourt(s.depart)}
                  <span className="ml-1.5 text-xs text-slate-400">{s.nuits} n</span>
                </td>
                <td className="py-2.5 pr-3">
                  <Canal s={s} />
                </td>
                <td className="py-2.5 pr-3">
                  <Periode s={s} />
                </td>
                {reserveLe && (
                  <td className="whitespace-nowrap py-2.5 pr-3 text-right text-slate-500">
                    {s.reserveLe ? jourCourt(s.reserveLe) : "—"}
                  </td>
                )}
                <td className="whitespace-nowrap py-2.5 pr-3 text-right text-slate-600">
                  {euros(s.tjm)}
                </td>
                <td className="whitespace-nowrap py-2.5 text-right font-medium text-slate-900">
                  {euros(s.net)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
