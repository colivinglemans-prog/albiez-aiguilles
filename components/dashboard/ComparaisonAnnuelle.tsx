import type { ComparaisonAnnee } from "@/lib/dashboard-types";

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

/**
 * Comparaison des années, en deux blocs qu'il ne faut surtout pas confondre.
 *
 * **À date** : chaque année cumulée du 1er janvier au même rang de jour. C'est là, et
 * seulement là, que le pourcentage a un sens. Opposer huit mois de l'année en cours à douze
 * mois de la précédente afficherait un recul imaginaire.
 *
 * **Fin d'année** : les années closes, plus la projection de l'année en cours — sans
 * pourcentage, parce que comparer un constat à une estimation n'en produirait pas un vrai.
 */
export default function ComparaisonAnnuelle({
  comparaison,
  jourDeReference,
}: {
  comparaison: ComparaisonAnnee[];
  jourDeReference: string;
}) {
  if (comparaison.length === 0) return null;

  const [annee, mois, jour] = jourDeReference.split("-");
  const moisLong = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ][Number(mois) - 1];
  const fenetre = `1ᵉʳ janvier → ${Number(jour)} ${moisLong}`;

  const closes = comparaison.filter((c) => !c.enCours);
  const enCours = comparaison.find((c) => c.enCours);
  const maxADate = Math.max(...comparaison.map((c) => c.cumulADate), 1);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-base font-semibold text-slate-900">Comparaison annuelle</h3>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          À date — {fenetre}, à fenêtre égale
        </p>

        <div className="mt-3 space-y-2">
          {[...comparaison].reverse().map((c) => (
            <div key={c.annee} className="flex items-center gap-3">
              <span
                className={`w-16 shrink-0 text-sm ${
                  c.enCours ? "font-semibold text-slate-900" : "text-slate-500"
                }`}
              >
                {c.annee}
              </span>

              <div className="h-6 flex-1 overflow-hidden rounded-md bg-slate-100">
                <div
                  className={`h-full rounded-md ${c.enCours ? "bg-sky-500" : "bg-sky-200"}`}
                  style={{ width: `${(c.cumulADate / maxADate) * 100}%` }}
                />
              </div>

              <span className="w-24 shrink-0 text-right text-sm font-medium text-slate-900">
                {euros(c.cumulADate)}
              </span>

              <span className="w-28 shrink-0 text-right text-sm">
                {c.variationADate == null ? (
                  <span className="text-slate-300">—</span>
                ) : (
                  <span
                    className={c.variationADate >= 0 ? "text-emerald-600" : "text-rose-600"}
                  >
                    {c.variationADate >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(c.variationADate).toFixed(1).replace(".", ",")} %
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Le pourcentage compare au cumul de l&apos;année précédente arrêté au même jour.
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Fin d&apos;année
        </p>
        <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
          {enCours && (
            <div>
              <p className="text-sm text-slate-500">
                {enCours.annee} <span className="text-slate-400">· projeté</span>
              </p>
              <p className="text-xl font-bold text-slate-900">
                {enCours.projection != null ? euros(enCours.projection) : "—"}
              </p>
            </div>
          )}
          {[...closes].reverse().map((c) => (
            <div key={c.annee}>
              <p className="text-sm text-slate-500">{c.annee}</p>
              <p className="text-xl font-bold text-slate-900">
                {c.totalAnnee != null ? euros(c.totalAnnee) : "—"}
              </p>
              {c.variationTotale != null && (
                <p
                  className={`text-xs font-medium ${
                    c.variationTotale >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {c.variationTotale >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(c.variationTotale).toFixed(1).replace(".", ",")} % vs {c.annee - 1}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Les pourcentages ne comparent que des exercices clos entre eux. La projection de{" "}
          {annee} n&apos;en porte pas : la confronter à une année close donnerait un chiffre
          trompeur.
        </p>
      </div>
    </section>
  );
}
