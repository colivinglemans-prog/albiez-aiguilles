"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { bandesPeriodes, type Periode } from "@sejour/socle/lib/periodes";
import type { BandeauSaison } from "@/lib/seasons";
import type { Sejour } from "@/lib/dashboard-types";
import { CHANNEL_COLORS as COULEUR_CANAL } from "@sejour/socle/lib/channels";
import {
  PERIOD_PALETTE,
  laneCount,
  periodTooltip,
  placeSegments,
  roundedEnds,
} from "@sejour/socle/lib/calendar-lanes";
import PartageVoyageur from "@/components/dashboard/PartageVoyageur";

const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

const jourISO = (annee: number, mois0: number, jour: number) =>
  `${annee}-${String(mois0 + 1).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;

/*
 * Le moteur de placement — `placeSegments`, les arrondis, l'infobulle de bande et la palette
 * des périodes — est monté dans `@sejour/socle/lib/calendar-lanes` au Lot 3. Il était écrit
 * ici sous le nom `placer<T>` et **deux fois en ligne** chez Barbusse, avec les mêmes noms de
 * variables. Le paramètre délicat, `demiCellules`, y est devenu une granularité nommée.
 *
 * Ce qui reste ici est l'enveloppe, et elle ne monte pas : fonds de saison de la station,
 * popup de séjour avec net, commission et surcollecte de taxe, bloc de partage voyageur. Elle
 * n'a pas d'équivalent chez Barbusse, dont l'enveloppe porte des barres d'événements du
 * circuit et des rayures « non confirmé ».
 */

/**
 * Note interne d'une réservation.
 *
 * Lecture seule pour le rôle `viewer` — la note est écrite *pour* lui, pas *par* lui — et
 * éditable par l'administrateur. Un séjour archivé n'a pas d'identifiant Beds24 : il n'est
 * pas annotable, et on le dit plutôt que d'afficher un champ qui échouerait à l'envoi.
 */
function Notes({
  sejour,
  valeur,
  lectureSeule,
  onEnregistre,
}: {
  sejour: Sejour;
  valeur: string;
  lectureSeule: boolean;
  onEnregistre: (texte: string) => void;
}) {
  /*
   * Pas d'effet de remise à zéro ici : c'est l'appelant qui pose une `key` sur le séjour, et
   * React remonte donc ce composant quand on passe d'une barre à l'autre du même rendu.
   * L'état repart de `valeur` tout seul.
   *
   * L'effet qui faisait ce travail dérivait un état à partir des props, ce que
   * `react-hooks/set-state-in-effect` signale à juste titre : il provoquait un second rendu
   * à chaque changement de séjour. Il avait de surcroît un défaut discret — il dépendait
   * aussi de `valeur`, si bien qu'enregistrer une note remettait `etat` à « repos » et
   * effaçait le « Enregistré » que l'on venait d'afficher. La `key` ne porte que sur la
   * référence du séjour, donc ce message survit maintenant à sa propre sauvegarde.
   */
  const [texte, setTexte] = useState(valeur);
  const [etat, setEtat] = useState<"repos" | "envoi" | "ok" | "erreur">("repos");
  const [message, setMessage] = useState("");

  if (lectureSeule) {
    if (!valeur) return null;
    return (
      <div className="mt-3 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900">
        <p className="mb-1 font-semibold">Consigne</p>
        <p className="whitespace-pre-wrap">{valeur}</p>
      </div>
    );
  }

  if (sejour.id == null) {
    return (
      <p className="mt-3 text-xs text-slate-400">
        Séjour archivé : il n&apos;existe plus dans Beds24 et ne peut pas recevoir de note.
      </p>
    );
  }

  async function enregistrer() {
    setEtat("envoi");
    setMessage("");
    try {
      const res = await fetch("/api/dashboard/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sejour.id, notes: texte }),
      });
      if (!res.ok) {
        const { erreur } = await res.json().catch(() => ({ erreur: "Échec de l'enregistrement" }));
        setMessage(erreur ?? "Échec de l'enregistrement");
        setEtat("erreur");
        return;
      }
      onEnregistre(texte);
      setEtat("ok");
    } catch {
      setMessage("Réseau indisponible");
      setEtat("erreur");
    }
  }

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <label className="mb-1 block text-xs font-medium text-slate-600">
        Consigne ménage
        <span className="ml-1 font-normal text-slate-400">— visible par la personne du ménage</span>
      </label>
      <textarea
        value={texte}
        onChange={(e) => {
          setTexte(e.target.value);
          setEtat("repos");
        }}
        rows={3}
        placeholder="Changer les draps du canapé, relever le compteur…"
        className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
      />
      <div className="mt-1.5 flex items-center gap-2">
        <button
          onClick={enregistrer}
          disabled={etat === "envoi" || texte === valeur}
          className="rounded-lg bg-sky-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-sky-700 disabled:opacity-40"
        >
          {etat === "envoi" ? "Enregistrement…" : "Enregistrer"}
        </button>
        {etat === "ok" && <span className="text-xs text-emerald-600">✓ enregistré</span>}
        {etat === "erreur" && <span className="text-xs text-rose-600">{message}</span>}
      </div>
    </div>
  );
}

export default function Calendrier({
  mois,
  sejours,
  periodes,
  saisons,
  onMois,
  viewer = false,
}: {
  mois: string;
  sejours: Sejour[];
  periodes: Periode[];
  saisons: BandeauSaison[];
  onMois: (mois: string) => void;
  /**
   * Vue ménage : pas de montants, pas de canaux. Les montants sont déjà absents de la réponse
   * d'API pour ce rôle ; ce drapeau ne fait qu'adapter l'affichage.
   */
  viewer?: boolean;
}) {
  const [popup, setPopup] = useState<{ sejour: Sejour; haut: number; gauche: number } | null>(null);
  const conteneur = useRef<HTMLDivElement>(null);
  /** Notes modifiées localement, pour ne pas recharger tout le mois après chaque écriture. */
  const [notesLocales, setNotesLocales] = useState<Record<number, string>>({});

  useEffect(() => {
    const fermer = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-barre], [data-popup]")) setPopup(null);
    };
    document.addEventListener("click", fermer);
    return () => document.removeEventListener("click", fermer);
  }, []);

  const [annee, m] = mois.split("-").map(Number);
  const mois0 = m - 1;
  const nbJours = new Date(Date.UTC(annee, m, 0)).getUTCDate();
  // `getUTCDay()` rend 0 pour dimanche : le décalage ramène lundi à l'index 0.
  const decalage = (new Date(`${mois}-01T00:00:00Z`).getUTCDay() + 6) % 7;
  const semaines = Math.ceil((decalage + nbJours) / 7);
  const premier = jourISO(annee, mois0, 1);
  const dernier = jourISO(annee, mois0, nbJours);
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });

  const segmentsSejours = useMemo(() => {
    const barres = sejours
      .filter((s) => s.arrival <= dernier && s.departure >= premier)
      .sort((a, b) => a.arrival.localeCompare(b.arrival))
      .map((s) => {
        const commenceDansLeMois = s.arrival >= premier;
        const finitDansLeMois = s.departure <= dernier;
        return {
          source: s,
          colour: viewer ? "#64748b" : COULEUR_CANAL[s.channel],
          label: viewer
            ? `${s.nights} n${s.guests != null ? ` · ${s.guests} voy.` : ""}`
            : `${s.channel} · ${s.nights} n${s.guests != null ? ` · ${s.guests} voy.` : ""}`,
          startDay: commenceDansLeMois ? Number(s.arrival.slice(8, 10)) : 1,
          endDay: finitDansLeMois ? Number(s.departure.slice(8, 10)) : nbJours,
          startsHere: commenceDansLeMois,
          endsHere: finitDansLeMois,
        };
      });
    return placeSegments(barres, decalage, "half-day");
  }, [sejours, premier, dernier, nbJours, decalage, viewer]);

  /** La note la plus fraîche : celle qu'on vient d'écrire l'emporte sur celle du chargement. */
  const noteDe = (s: Sejour) =>
    (s.id != null && notesLocales[s.id] !== undefined
      ? notesLocales[s.id]
      : s.notes) ?? "";

  /**
   * Une seule ligne de bandes : `bandesPeriodes` a déjà fusionné les zones d'une même période
   * (« Noël A+B+C ») et découpé aux jours où la composition change (« Hiver A » → « Hiver
   * A+B »). Les bandes ne se chevauchent donc jamais.
   *
   * Elles se relaient **en demi-journées**, exactement comme deux séjours dont l'un part le
   * jour où l'autre arrive : une composition prend effet à la moitié de son premier jour et
   * cesse à la moitié du jour où elle change. D'où `demiCellules` à `true` et une fin portée
   * au *lendemain* du dernier jour de la composition — sans quoi « PRINTEMPS A+C » et
   * « PRINTEMPS A+B » se disputaient le samedi de bascule en pleines cases.
   */
  const segmentsPeriodes = useMemo(() => {
    const barres = bandesPeriodes(periodes, premier, dernier).map((b) => {
      // Le jour de transition est le lendemain de la composition. Hors du mois, la bande
      // court jusqu'au bord droit : elle vaut alors pour toute la dernière journée.
      const transitionDansLeMois = b.fin < dernier;
      return {
        source: b,
        colour: PERIOD_PALETTE[b.type].line,
        label: b.libelle,
        startDay: Number(b.debut.slice(8, 10)),
        endDay: transitionDansLeMois ? Number(b.fin.slice(8, 10)) + 1 : nbJours,
        startsHere: b.debutReel,
        endsHere: transitionDansLeMois,
      };
    });
    return placeSegments(barres, decalage, "half-day");
  }, [periodes, premier, dernier, nbJours, decalage]);

  const saisonDuJour = (jour: string) => saisons.find((s) => jour >= s.debut && jour <= s.fin);

  const decale = (n: number) => {
    const d = new Date(Date.UTC(annee, mois0 + n, 1));
    onMois(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
  };

  const CELLULE = 100 / 7;

  return (
    <div ref={conteneur} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => decale(-1)}
          aria-label="Mois précédent"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-slate-900">
          {MOIS[mois0]} {annee}
        </h2>
        <button
          onClick={() => decale(1)}
          aria-label="Mois suivant"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-300 pb-2">
        {JOURS.map((j) => (
          <div key={j} className="text-center text-xs font-medium text-slate-500">
            {j}
          </div>
        ))}
      </div>

      {Array.from({ length: semaines }, (_, w) => {
        const barresSejours = segmentsSejours.get(w) ?? [];
        const barresPeriodes = segmentsPeriodes.get(w) ?? [];
        const lignesSejours = laneCount(barresSejours);
        const lignesPeriodes = laneCount(barresPeriodes);

        return (
          <div key={w} className="relative grid grid-cols-7 border-b border-slate-200">
            {/*
             * Filets de colonnes, en position absolue et non sur les cases : une case ne
             * couvre que la ligne des numéros, et le trait s'arrêtait donc avant les barres
             * — impossible d'aligner à l'œil la fin d'un séjour sur son jour. Hors flux, la
             * couche traverse toute la hauteur de la semaine. Elle est *avant* les barres
             * dans le DOM, donc elle passe au-dessus des fonds de saison et en dessous des
             * séjours : les filets ne coupent aucune pilule.
             */}
            <div className="pointer-events-none absolute inset-0 grid grid-cols-7" aria-hidden>
              {Array.from({ length: 7 }, (_, col) => (
                <div key={col} className={col < 6 ? "border-r border-slate-200" : ""} />
              ))}
            </div>

            {Array.from({ length: 7 }, (_, col) => {
              const jourDuMois = w * 7 + col - decalage + 1;
              const dansLeMois = jourDuMois >= 1 && jourDuMois <= nbJours;
              const jour = dansLeMois ? jourISO(annee, mois0, jourDuMois) : "";
              const saison = dansLeMois ? saisonDuJour(jour) : undefined;

              return (
                <div
                  key={col}
                  className={`relative min-h-[2.5rem] px-1.5 pt-1 ${
                    !dansLeMois
                      ? "bg-slate-50/50"
                      : saison?.saison === "hiver"
                        ? "bg-sky-50/70"
                        : saison?.saison === "ete"
                          ? "bg-amber-50/70"
                          : ""
                  }`}
                >
                  {dansLeMois && (
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        jour === today ? "bg-sky-600 font-bold text-white" : "text-slate-700"
                      }`}
                    >
                      {jourDuMois}
                    </span>
                  )}
                </div>
              );
            })}

            {lignesPeriodes > 0 && (
              <div className="col-span-7 px-0.5 pt-0.5">
                {Array.from({ length: lignesPeriodes }, (_, ligne) => (
                  <div key={ligne} className="relative mt-0.5 h-[1.15rem]">
                    {barresPeriodes
                      .filter((b) => b.row === ligne)
                      .map((b) => {
                        // Mêmes demi-cellules que les séjours : une composition qui cesse
                        // n'occupe que la moitié gauche de son jour de bascule, celle qui
                        // prend le relais que la moitié droite.
                        const demi = CELLULE / 2;
                        const retraitGauche = b.startsHere ? demi : 0;
                        const retraitDroite = b.endsHere ? demi : 0;
                        return (
                        <div
                          key={`${b.source.debut}-${b.startCol}`}
                          className="absolute top-0 h-full"
                          style={{
                            left: `${b.startCol * CELLULE + retraitGauche}%`,
                            width: `${
                              (b.endCol - b.startCol + 1) * CELLULE - retraitGauche - retraitDroite
                            }%`,
                          }}
                          title={periodTooltip(b.source)}
                        >
                          {/* Le libellé n'apparaît que sur le premier segment ; les semaines
                              suivantes ne portent que le filet, à la même hauteur. */}
                          <div
                            className="truncate px-1 text-left text-[10px] font-semibold uppercase leading-[0.85rem] tracking-wide"
                            style={{ color: PERIOD_PALETTE[b.source.type].text }}
                          >
                            {b.isFirstSegment && b.label}
                          </div>
                          {/* Les 3 px de retrait s'ajoutent à la demi-cellule : sans eux les
                              deux filets se toucheraient pile au milieu du samedi de bascule
                              et n'en feraient qu'un, ce que l'arrondi des pilules évite pour
                              les séjours. Aucun retrait du côté où la bande est coupée par le
                              bord du mois : là, elle continue. */}
                          <div
                            className="h-[3px] rounded-full"
                            style={{
                              backgroundColor: b.colour,
                              marginLeft: b.startsHere ? 3 : 0,
                              marginRight: b.endsHere ? 3 : 0,
                            }}
                          />
                        </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            )}

            {lignesSejours > 0 && (
              <div className="col-span-7 px-0.5 pb-1.5">
                {Array.from({ length: lignesSejours }, (_, ligne) => (
                  <div key={ligne} className="relative mt-0.5 h-6">
                    {barresSejours
                      .filter((b) => b.row === ligne)
                      .map((b) => {
                        const demi = CELLULE / 2;
                        const retraitGauche = b.startsHere ? demi : 0;
                        const retraitDroite = b.endsHere ? demi : 0;
                        return (
                          <button
                            key={`${b.source.ref}-${b.startCol}`}
                            data-barre
                            onClick={(e) => {
                              const r = e.currentTarget.getBoundingClientRect();
                              const c = conteneur.current!.getBoundingClientRect();
                              setPopup({
                                sejour: b.source,
                                haut: r.bottom - c.top + 6,
                                gauche: Math.min(r.left - c.left, c.width - 260),
                              });
                            }}
                            className={`absolute top-0 h-full cursor-pointer overflow-hidden truncate px-1.5 text-left text-[11px] font-medium text-white transition-opacity hover:opacity-90 ${roundedEnds(
                              b.startsHere,
                              b.endsHere,
                            )}`}
                            style={{
                              left: `${b.startCol * CELLULE + retraitGauche}%`,
                              width: `${
                                (b.endCol - b.startCol + 1) * CELLULE - retraitGauche - retraitDroite
                              }%`,
                              backgroundColor: b.colour,
                            }}
                            title={
                              viewer
                                ? `${b.source.arrival} → ${b.source.departure}`
                                : `${b.source.channel} · ${b.source.arrival} → ${b.source.departure} · ${euros(b.source.net)}`
                            }
                          >
                            {noteDe(b.source) && (
                              <span aria-label="Note interne" title={noteDe(b.source)}>
                                📝
                              </span>
                            )}
                            {b.isFirstSegment && (
                              <span className="hidden sm:inline">
                                {noteDe(b.source) ? " " : ""}
                                {b.label}
                              </span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-6 rounded-sm bg-sky-50 ring-1 ring-sky-200" />
          Domaine ouvert
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-6 rounded-sm bg-amber-50 ring-1 ring-amber-200" />
          Saison du lac
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-[3px] w-6 rounded-full"
            style={{ backgroundColor: PERIOD_PALETTE.vacances.line }}
          />
          Vacances scolaires
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-[3px] w-6 rounded-full"
            style={{ backgroundColor: PERIOD_PALETTE.fete.line }}
          />
          Fêtes
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden>📝</span>
          Consigne sur le séjour
        </span>
        {viewer ? (
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-6 rounded-full bg-slate-500" />
            Logement occupé
          </span>
        ) : (
          Object.entries(COULEUR_CANAL).map(([canal, couleur]) => (
            <span key={canal} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-6 rounded-full"
                style={{ backgroundColor: couleur }}
              />
              {canal}
            </span>
          ))
        )}
      </div>

      {popup && (
        <div
          data-popup
          // `w-72` et non `w-64` : les cinq pastilles de langue du bloc de partage tiennent
          // alors sur une seule ligne au lieu de se replier en deux.
          className="absolute z-20 w-72 rounded-xl bg-white p-4 shadow-xl ring-1 ring-slate-200"
          style={{ top: popup.haut, left: Math.max(0, popup.gauche) }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: viewer ? "#64748b" : COULEUR_CANAL[popup.sejour.channel] }}
            />
            <p className="font-semibold text-slate-900">
              {viewer ? "Séjour" : popup.sejour.channel}
            </p>
          </div>
          <dl className="mt-2.5 space-y-1 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Séjour</dt>
              <dd className="text-right text-slate-900">
                {popup.sejour.arrival} → {popup.sejour.departure}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Nuits</dt>
              <dd className="text-slate-900">{popup.sejour.nights}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Voyageurs</dt>
              <dd className="text-slate-900">
                {popup.sejour.guests ?? (
                  <span className="text-slate-400">non renseigné</span>
                )}
              </dd>
            </div>
            {!viewer && (
              <>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Net</dt>
                  <dd className="font-medium text-slate-900">{euros(popup.sejour.net)}</dd>
                </div>
                {/* La commission ne s'affiche que si elle existe : en direct elle vaut zéro,
                    et une ligne à 0,00 € ferait croire à une donnée manquante. */}
                {popup.sejour.commission > 0 && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Commission</dt>
                    <dd className="text-slate-900">
                      {euros(popup.sejour.commission)}
                      <span className="ml-1 text-slate-400">
                        {popup.sejour.gross > 0
                          ? `(${Math.round((popup.sejour.commission / popup.sejour.gross) * 100)} %)`
                          : ""}
                      </span>
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">€ / nuit</dt>
                  <dd className="text-slate-900">
                    {popup.sejour.nights > 0 ? euros(popup.sejour.net / popup.sejour.nights) : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Référence</dt>
                  <dd className="truncate font-mono text-slate-500">{popup.sejour.ref}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Source</dt>
                  <dd className="text-slate-900">
                    {popup.sejour.source === "live" ? "Beds24" : "Archive"}
                  </dd>
                </div>
              </>
            )}
          </dl>

          {/*
            * Surcollecte de taxe de séjour : Beds24 taxe les mineurs, qui en sont exonérés de
            * plein droit, et aucune configuration n'y remédie (support Beds24, 2026-09-01).
            * Le montant s'affiche ici parce que c'est l'endroit où l'on ouvre une réservation
            * pour agir dessus — la correction se fait à la main dans Beds24.
            */}
          {!viewer && popup.sejour.surcollecteTaxe && (
            <div className="mt-3 rounded-md bg-amber-50 px-2.5 py-2 text-xs text-amber-900">
              <p className="font-semibold">Taxe de séjour à corriger</p>
              <p className="mt-1">
                {euros(popup.sejour.surcollecteTaxe.collectee)} collectés,{" "}
                {euros(popup.sejour.surcollecteTaxe.due)} dus —{" "}
                <strong>{euros(popup.sejour.surcollecteTaxe.ecart)} de trop</strong>.
              </p>
              <p className="mt-1 text-amber-800">
                Beds24 taxe les mineurs, qui en sont exonérés.
              </p>
            </div>
          )}

          <Notes
            // Remonte l'éditeur quand on passe d'un séjour à l'autre sans fermer le popup :
            // sans ça, la note du précédent resterait affichée. La `key` ne porte que sur la
            // référence, pour qu'enregistrer une note ne remonte pas le composant.
            key={popup.sejour.ref}
            sejour={popup.sejour}
            valeur={noteDe(popup.sejour)}
            lectureSeule={viewer}
            onEnregistre={(texte) =>
              setNotesLocales((n) => ({ ...n, [popup.sejour.id!]: texte }))
            }
          />

          {/*
            * Le bloc de partage ne dépend d'aucun champ du séjour : le code de la boîte à
            * clés est le même pour tout le monde et le guide est public. Il s'affiche donc
            * aussi sur un séjour archivé, où il ne sert à rien — mais l'y masquer demanderait
            * un test qui laisserait croire qu'il existe un code par réservation.
            */}
          {!viewer && <PartageVoyageur />}
        </div>
      )}
    </div>
  );
}
