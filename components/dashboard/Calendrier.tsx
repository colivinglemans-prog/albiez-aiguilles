"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Periode } from "@/lib/periodes";
import type { BandeauSaison } from "@/lib/seasons";
import type { Sejour } from "@/lib/dashboard-types";
import { COULEUR_CANAL } from "@/lib/canal";

const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

const jourISO = (annee: number, mois0: number, jour: number) =>
  `${annee}-${String(mois0 + 1).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;

/** Un segment de barre, tel qu'il sera peint dans une semaine donnée. */
interface Segment<T> {
  source: T;
  couleur: string;
  libelle: string;
  /** Colonnes 0-6 dans la semaine. */
  debutCol: number;
  finCol: number;
  /** Ligne d'empilement à l'intérieur de la semaine. */
  ligne: number;
  /** La borne réelle tombe dans ce segment : arrondir et rentrer d'une demi-cellule. */
  borneDebut: boolean;
  borneFin: boolean;
  premierSegment: boolean;
}

/**
 * Répartit des barres en lignes à l'intérieur de chaque semaine, sans chevauchement.
 *
 * `demiCellules` est le point délicat, repris du calendrier du Mans : une barre qui se
 * termine le jour J n'occupe que la moitié gauche de la case, et une barre qui commence le
 * jour J n'occupe que la moitié droite. Deux séjours qui s'enchaînent le même jour peuvent
 * donc partager la même ligne au lieu de s'empiler — ce qui est exactement ce qui se passe
 * en pleine saison, où les rotations sont quotidiennes.
 */
function placer<T>(
  barres: {
    source: T;
    couleur: string;
    libelle: string;
    debutJour: number;
    finJour: number;
    borneDebut: boolean;
    borneFin: boolean;
  }[],
  decalagePremierJour: number,
  demiCellules: boolean,
): Map<number, Segment<T>[]> {
  const parSemaine = new Map<number, Segment<T>[]>();
  const lignesParSemaine = new Map<number, [number, number][][]>();

  for (const barre of barres) {
    const celluleDebut = decalagePremierJour + barre.debutJour - 1;
    const celluleFin = decalagePremierJour + barre.finJour - 1;
    const semaineDebut = Math.floor(celluleDebut / 7);
    const semaineFin = Math.floor(celluleFin / 7);

    for (let w = semaineDebut; w <= semaineFin; w++) {
      const debutSemaine = w * 7;
      const visDebut = Math.max(celluleDebut, debutSemaine);
      const visFin = Math.min(celluleFin, debutSemaine + 6);
      const col0 = visDebut - debutSemaine;
      const col1 = visFin - debutSemaine;

      const borneDebut = w === semaineDebut && barre.borneDebut;
      const borneFin = w === semaineFin && barre.borneFin;
      // En demi-cellules : +1 si la barre démarre à la moitié de sa case, -1 si elle finit
      // à la moitié de la sienne. Sans ça, deux séjours consécutifs se croiseraient.
      const gauche = col0 * 2 + (demiCellules && borneDebut ? 1 : 0);
      const droite = col1 * 2 + 1 - (demiCellules && borneFin ? 1 : 0);

      if (!lignesParSemaine.has(w)) lignesParSemaine.set(w, []);
      const lignes = lignesParSemaine.get(w)!;
      let ligne = 0;
      while (
        ligne < lignes.length &&
        lignes[ligne].some(([s, e]) => gauche <= e && droite >= s)
      ) {
        ligne++;
      }
      if (ligne === lignes.length) lignes.push([]);
      lignes[ligne].push([gauche, droite]);

      if (!parSemaine.has(w)) parSemaine.set(w, []);
      parSemaine.get(w)!.push({
        source: barre.source,
        couleur: barre.couleur,
        libelle: barre.libelle,
        debutCol: col0,
        finCol: col1,
        ligne,
        borneDebut,
        borneFin,
        premierSegment: w === semaineDebut,
      });
    }
  }
  return parSemaine;
}

/** Arrondis : pleins aux deux bouts, sinon du seul côté où la barre s'arrête vraiment. */
function arrondis(gauche: boolean, droite: boolean): string {
  if (gauche && droite) return "rounded-full";
  if (gauche) return "rounded-l-full";
  if (droite) return "rounded-r-full";
  return "";
}

/**
 * Note interne d'une réservation.
 *
 * Lecture seule pour le rôle `menage` — la note est écrite *pour* lui, pas *par* lui — et
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
  const [texte, setTexte] = useState(valeur);
  const [etat, setEtat] = useState<"repos" | "envoi" | "ok" | "erreur">("repos");
  const [message, setMessage] = useState("");

  // Le popup est remonté à chaque ouverture, mais pas quand on passe d'une barre à l'autre
  // du même rendu : sans cette remise à zéro, la note du séjour précédent resterait affichée.
  useEffect(() => {
    setTexte(valeur);
    setEtat("repos");
  }, [sejour.ref, valeur]);

  if (lectureSeule) {
    if (!valeur) return null;
    return (
      <div className="mt-3 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900">
        <p className="mb-1 font-semibold">Consigne</p>
        <p className="whitespace-pre-wrap">{valeur}</p>
      </div>
    );
  }

  if (sejour.idBeds24 == null) {
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
        body: JSON.stringify({ id: sejour.idBeds24, notes: texte }),
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
  menage = false,
}: {
  mois: string;
  sejours: Sejour[];
  periodes: Periode[];
  saisons: BandeauSaison[];
  onMois: (mois: string) => void;
  /**
   * Vue ménage : pas de montants, pas de canaux, et un marqueur sur chaque jour de départ —
   * c'est ce jour-là qu'il faut venir. Les montants sont déjà absents de la réponse d'API
   * pour ce rôle ; ce drapeau ne fait qu'adapter l'affichage.
   */
  menage?: boolean;
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
      .filter((s) => s.arrivee <= dernier && s.depart >= premier)
      .sort((a, b) => a.arrivee.localeCompare(b.arrivee))
      .map((s) => {
        const commenceDansLeMois = s.arrivee >= premier;
        const finitDansLeMois = s.depart <= dernier;
        return {
          source: s,
          couleur: menage ? "#64748b" : COULEUR_CANAL[s.canal],
          libelle: menage
            ? `${s.nuits} n${s.voyageurs != null ? ` · ${s.voyageurs} voy.` : ""}`
            : `${s.canal} · ${s.nuits} n${s.voyageurs != null ? ` · ${s.voyageurs} voy.` : ""}`,
          debutJour: commenceDansLeMois ? Number(s.arrivee.slice(8, 10)) : 1,
          finJour: finitDansLeMois ? Number(s.depart.slice(8, 10)) : nbJours,
          borneDebut: commenceDansLeMois,
          borneFin: finitDansLeMois,
        };
      });
    return placer(barres, decalage, true);
  }, [sejours, premier, dernier, nbJours, decalage, menage]);

  /** Jours de départ : ce sont eux qui déclenchent un ménage. */
  const departs = useMemo(() => new Set(sejours.map((s) => s.depart)), [sejours]);

  /** La note la plus fraîche : celle qu'on vient d'écrire l'emporte sur celle du chargement. */
  const noteDe = (s: Sejour) =>
    (s.idBeds24 != null && notesLocales[s.idBeds24] !== undefined
      ? notesLocales[s.idBeds24]
      : s.notes) ?? "";

  const segmentsPeriodes = useMemo(() => {
    const barres = periodes
      .filter((p) => p.debut <= dernier && p.fin >= premier)
      // Les fêtes d'abord : elles se superposent aux vacances de Noël et doivent rester
      // sur la ligne du haut, là où l'œil les trouve.
      .sort((a, b) =>
        a.type === b.type ? a.debut.localeCompare(b.debut) : a.type === "fete" ? -1 : 1,
      )
      .map((p) => {
        const commence = p.debut >= premier;
        const finit = p.fin <= dernier;
        const zone = p.zone.replace(/^Zone\s+/, "");
        return {
          source: p,
          couleur: p.type === "fete" ? "#e11d48" : "#6366f1",
          libelle:
            p.type === "fete"
              ? p.nom.replace(/^Semaine (du |de )/, "")
              : `${p.nom.replace(/^Vacances (de la |de |d')/, "")} ${zone}`,
          debutJour: commence ? Number(p.debut.slice(8, 10)) : 1,
          finJour: finit ? Number(p.fin.slice(8, 10)) : nbJours,
          borneDebut: commence,
          borneFin: finit,
        };
      });
    return placer(barres, decalage, false);
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

      <div className="grid grid-cols-7 border-b border-slate-200 pb-2">
        {JOURS.map((j) => (
          <div key={j} className="text-center text-xs font-medium text-slate-500">
            {j}
          </div>
        ))}
      </div>

      {Array.from({ length: semaines }, (_, w) => {
        const barresSejours = segmentsSejours.get(w) ?? [];
        const barresPeriodes = segmentsPeriodes.get(w) ?? [];
        const lignesSejours = barresSejours.reduce((n, b) => Math.max(n, b.ligne + 1), 0);
        const lignesPeriodes = barresPeriodes.reduce((n, b) => Math.max(n, b.ligne + 1), 0);

        return (
          <div key={w} className="grid grid-cols-7 border-b border-slate-100">
            {Array.from({ length: 7 }, (_, col) => {
              const jourDuMois = w * 7 + col - decalage + 1;
              const dansLeMois = jourDuMois >= 1 && jourDuMois <= nbJours;
              const jour = dansLeMois ? jourISO(annee, mois0, jourDuMois) : "";
              const saison = dansLeMois ? saisonDuJour(jour) : undefined;

              return (
                <div
                  key={col}
                  className={`relative min-h-[2.5rem] border-r border-slate-50 px-1.5 pt-1 last:border-r-0 ${
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
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                          jour === today ? "bg-sky-600 font-bold text-white" : "text-slate-700"
                        }`}
                      >
                        {jourDuMois}
                      </span>
                      {menage && departs.has(jour) && (
                        <span
                          className="rounded bg-emerald-100 px-1 text-[10px] font-bold text-emerald-700"
                          title="Départ ce jour : ménage à prévoir"
                        >
                          MÉNAGE
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {lignesPeriodes > 0 && (
              <div className="col-span-7 px-0.5 pt-0.5">
                {Array.from({ length: lignesPeriodes }, (_, ligne) => (
                  <div key={ligne} className="relative mt-0.5 h-5">
                    {barresPeriodes
                      .filter((b) => b.ligne === ligne)
                      .map((b) => (
                        <div
                          key={`${b.source.nom}-${b.source.zone}-${b.debutCol}`}
                          className={`absolute top-0 h-full overflow-hidden truncate px-1.5 text-left text-[10px] font-semibold uppercase tracking-wide text-white ${arrondis(
                            b.borneDebut,
                            b.borneFin,
                          )}`}
                          style={{
                            left: `${b.debutCol * CELLULE}%`,
                            width: `${(b.finCol - b.debutCol + 1) * CELLULE}%`,
                            backgroundColor: b.couleur,
                          }}
                          title={`${b.source.nom}${
                            b.source.zone === "Toutes" ? "" : ` — ${b.source.zone}`
                          } · ${b.source.debut} → ${b.source.fin}`}
                        >
                          {b.premierSegment && b.libelle}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}

            {lignesSejours > 0 && (
              <div className="col-span-7 px-0.5 pb-1.5">
                {Array.from({ length: lignesSejours }, (_, ligne) => (
                  <div key={ligne} className="relative mt-0.5 h-6">
                    {barresSejours
                      .filter((b) => b.ligne === ligne)
                      .map((b) => {
                        const demi = CELLULE / 2;
                        const retraitGauche = b.borneDebut ? demi : 0;
                        const retraitDroite = b.borneFin ? demi : 0;
                        return (
                          <button
                            key={`${b.source.ref}-${b.debutCol}`}
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
                            className={`absolute top-0 h-full cursor-pointer overflow-hidden truncate px-1.5 text-left text-[11px] font-medium text-white transition-opacity hover:opacity-90 ${arrondis(
                              b.borneDebut,
                              b.borneFin,
                            )}`}
                            style={{
                              left: `${b.debutCol * CELLULE + retraitGauche}%`,
                              width: `${
                                (b.finCol - b.debutCol + 1) * CELLULE - retraitGauche - retraitDroite
                              }%`,
                              backgroundColor: b.couleur,
                            }}
                            title={
                              menage
                                ? `${b.source.arrivee} → ${b.source.depart}`
                                : `${b.source.canal} · ${b.source.arrivee} → ${b.source.depart} · ${euros(b.source.net)}`
                            }
                          >
                            {noteDe(b.source) && (
                              <span aria-label="Note interne" title={noteDe(b.source)}>
                                📝
                              </span>
                            )}
                            {b.premierSegment && (
                              <span className="hidden sm:inline">
                                {noteDe(b.source) ? " " : ""}
                                {b.libelle}
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
          <span className="inline-block h-3 w-6 rounded-full bg-indigo-500" />
          Vacances scolaires
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-6 rounded-full bg-rose-600" />
          Fêtes
        </span>
        {menage ? (
          <>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-6 rounded-full bg-slate-500" />
              Logement occupé
            </span>
            <span className="flex items-center gap-1.5">
              <span className="rounded bg-emerald-100 px-1 text-[10px] font-bold text-emerald-700">
                MÉNAGE
              </span>
              Jour de départ
            </span>
          </>
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
          className="absolute z-20 w-64 rounded-xl bg-white p-4 shadow-xl ring-1 ring-slate-200"
          style={{ top: popup.haut, left: Math.max(0, popup.gauche) }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: menage ? "#64748b" : COULEUR_CANAL[popup.sejour.canal] }}
            />
            <p className="font-semibold text-slate-900">
              {menage ? "Séjour" : popup.sejour.canal}
            </p>
          </div>
          <dl className="mt-2.5 space-y-1 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Séjour</dt>
              <dd className="text-right text-slate-900">
                {popup.sejour.arrivee} → {popup.sejour.depart}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Nuits</dt>
              <dd className="text-slate-900">{popup.sejour.nuits}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Voyageurs</dt>
              <dd className="text-slate-900">
                {popup.sejour.voyageurs ?? (
                  <span className="text-slate-400">non renseigné</span>
                )}
              </dd>
            </div>
            {!menage && (
              <>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Net</dt>
                  <dd className="font-medium text-slate-900">{euros(popup.sejour.net)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">€ / nuit</dt>
                  <dd className="text-slate-900">
                    {popup.sejour.nuits > 0 ? euros(popup.sejour.net / popup.sejour.nuits) : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Référence</dt>
                  <dd className="truncate font-mono text-slate-500">{popup.sejour.ref}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Source</dt>
                  <dd className="text-slate-900">
                    {popup.sejour.source === "beds24" ? "Beds24" : "Archive"}
                  </dd>
                </div>
              </>
            )}
            {menage && (
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Ménage</dt>
                <dd className="font-medium text-emerald-700">
                  le {popup.sejour.depart.split("-").reverse().join("/")}
                </dd>
              </div>
            )}
          </dl>

          <Notes
            sejour={popup.sejour}
            valeur={noteDe(popup.sejour)}
            lectureSeule={menage}
            onEnregistre={(texte) =>
              setNotesLocales((n) => ({ ...n, [popup.sejour.idBeds24!]: texte }))
            }
          />
        </div>
      )}
    </div>
  );
}
