"use client";

import { useMemo, useState } from "react";
import type { Periode } from "@/lib/periodes";
import type { BandeauSaison } from "@/lib/seasons";
import type { Sejour } from "@/lib/dashboard-types";
import { COULEUR_CANAL } from "@/lib/canal";

const JOURS = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

function ajouter(jour: string, n: number): string {
  const d = new Date(`${jour}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * Grille mensuelle, avec trois couches d'information superposées sur chaque jour.
 *
 * 1. **La saison de la station** teinte le fond — bleu quand le domaine skiable est ouvert,
 *    ambre pendant la saison du lac. C'est le contexte commercial : une semaine vide en
 *    février ne se lit pas comme une semaine vide en novembre.
 * 2. **Les vacances scolaires** en pastilles A / B / C. Trois zones ensemble signalent la
 *    pression maximale sur la demande.
 * 3. **Les séjours** en barre à la couleur de leur canal.
 *
 * Les nuits sont comptées sur `[arrivee, depart[` : le jour du départ n'est pas occupé, ce
 * qui laisse deux séjours qui s'enchaînent le même jour cohabiter sans se recouvrir.
 */
export default function Calendrier({
  mois,
  sejours,
  periodes,
  saisons,
  onMois,
}: {
  mois: string;
  sejours: Sejour[];
  periodes: Periode[];
  saisons: BandeauSaison[];
  onMois: (mois: string) => void;
}) {
  const [selection, setSelection] = useState<Sejour | null>(null);
  const [annee, m] = mois.split("-").map(Number);

  const jours = useMemo(() => {
    const premier = `${annee}-${String(m).padStart(2, "0")}-01`;
    const nbJours = new Date(Date.UTC(annee, m, 0)).getUTCDate();
    // La grille démarre au lundi précédent. `getUTCDay()` rend 0 pour dimanche, d'où le
    // décalage qui ramène lundi à l'index 0.
    const decalage = (new Date(`${premier}T00:00:00Z`).getUTCDay() + 6) % 7;
    const total = Math.ceil((decalage + nbJours) / 7) * 7;
    return Array.from({ length: total }, (_, i) => ajouter(premier, i - decalage));
  }, [annee, m]);

  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });

  const saisonDuJour = (jour: string) => saisons.find((s) => jour >= s.debut && jour <= s.fin);
  const zonesDuJour = (jour: string) =>
    periodes
      .filter((p) => p.type === "vacances" && jour >= p.debut && jour <= p.fin)
      .map((p) => p.zone.replace(/^Zone\s+/, ""))
      .sort();
  const feteDuJour = (jour: string) =>
    periodes.find((p) => p.type === "fete" && jour >= p.debut && jour <= p.fin);
  const sejourDuJour = (jour: string) =>
    sejours.find((s) => jour >= s.arrivee && jour < s.depart);

  const nomMois = new Date(`${mois}-01T00:00:00Z`).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const decale = (n: number) => {
    const d = new Date(Date.UTC(annee, m - 1 + n, 1));
    onMois(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => decale(-1)}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100"
          aria-label="Mois précédent"
        >
          ←
        </button>
        <h2 className="text-base font-semibold capitalize text-slate-900">{nomMois}</h2>
        <button
          onClick={() => decale(1)}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100"
          aria-label="Mois suivant"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {JOURS.map((j) => (
          <div key={j} className="pb-1 text-center text-xs font-medium text-slate-400">
            {j}
          </div>
        ))}

        {jours.map((jour) => {
          const dansLeMois = jour.slice(0, 7) === mois;
          const saison = saisonDuJour(jour);
          const zones = zonesDuJour(jour);
          const fete = feteDuJour(jour);
          const sejour = sejourDuJour(jour);
          const fond =
            saison?.saison === "hiver"
              ? "bg-sky-50"
              : saison?.saison === "ete"
                ? "bg-amber-50"
                : "bg-white";

          return (
            <div
              key={jour}
              className={`min-h-[4.5rem] rounded-lg p-1.5 ring-1 ring-slate-100 ${fond} ${
                dansLeMois ? "" : "opacity-40"
              }`}
            >
              <div className="flex items-start justify-between gap-1">
                <span
                  className={`text-xs ${
                    jour === today
                      ? "rounded-md bg-sky-600 px-1.5 py-0.5 font-semibold text-white"
                      : "text-slate-500"
                  }`}
                >
                  {Number(jour.slice(8, 10))}
                </span>
                {zones.length > 0 && (
                  <span
                    className="flex gap-0.5"
                    title={`Vacances scolaires zone${zones.length > 1 ? "s" : ""} ${zones.join(", ")}`}
                  >
                    {zones.map((z) => (
                      <span
                        key={z}
                        className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-indigo-100 text-[9px] font-bold text-indigo-700"
                      >
                        {z}
                      </span>
                    ))}
                  </span>
                )}
              </div>

              {fete && (
                <p
                  className="mt-0.5 truncate text-[10px] font-medium text-rose-600"
                  title={fete.nom}
                >
                  {fete.nom.replace(/^Semaine (du |de )/, "")}
                </p>
              )}

              {sejour && (
                <button
                  onClick={() => setSelection(sejour)}
                  className="mt-1 w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium text-white"
                  style={{ backgroundColor: COULEUR_CANAL[sejour.canal] }}
                  title={`${sejour.canal} · ${sejour.arrivee} → ${sejour.depart} · ${euros(sejour.net)}`}
                >
                  {jour === sejour.arrivee ? sejour.canal : "·"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-sky-50 ring-1 ring-sky-200" />
          Domaine skiable ouvert
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-amber-50 ring-1 ring-amber-200" />
          Saison du lac
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-indigo-100 text-[9px] font-bold text-indigo-700">
            A
          </span>
          Vacances scolaires par zone
        </span>
        {Object.entries(COULEUR_CANAL).map(([canal, couleur]) => (
          <span key={canal} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: couleur }}
            />
            {canal}
          </span>
        ))}
      </div>

      {selection && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
          onClick={() => setSelection(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COULEUR_CANAL[selection.canal] }}
              />
              <h3 className="font-semibold text-slate-900">{selection.canal}</h3>
            </div>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Séjour</dt>
                <dd className="text-right text-slate-900">
                  {selection.arrivee} → {selection.depart}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Nuits</dt>
                <dd className="text-slate-900">{selection.nuits}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Net</dt>
                <dd className="font-medium text-slate-900">{euros(selection.net)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">€ / nuit</dt>
                <dd className="text-slate-900">
                  {selection.nuits > 0 ? euros(selection.net / selection.nuits) : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Référence</dt>
                <dd className="truncate font-mono text-xs text-slate-500">{selection.ref}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Source</dt>
                <dd className="text-slate-900">
                  {selection.source === "beds24" ? "Beds24 (vivante)" : "Archive"}
                </dd>
              </div>
            </dl>
            <button
              onClick={() => setSelection(null)}
              className="mt-4 w-full rounded-lg bg-slate-100 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
