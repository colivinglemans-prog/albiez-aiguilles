"use client";

import { useCallback, useEffect, useState } from "react";
import { LOCALE_META, useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";
import { formatPeriode, HIVERS } from "@/lib/seasons";
import {
  ajouterJours,
  ajouterMois,
  cleMois,
  formatJour,
  joursDuMois,
  premierJourDuMois,
} from "@/lib/calendrier-utils";

/**
 * Calendrier de réservation directe, porté de celui du Mans.
 *
 * Le site ne fait que **choisir des dates** : les prix, la remise directe et le paiement
 * vivent sur la page de réservation Beds24, ouverte dans une modale. C'est ce qui permet de
 * n'afficher aucun tarif en dur ici — la tarification bouge tous les jours sous Beyond
 * Pricing, et un prix recopié dans le code serait faux dès le lendemain.
 *
 * Trois différences avec Le Mans : la capacité plafonne à six voyageurs, il n'y a pas de
 * restriction d'âge à afficher, et l'identifiant de propriété vient de la configuration.
 */

/** Repli quand Beds24 ne donne pas de minimum pour une date. */
const SEJOUR_MINIMUM_PAR_DEFAUT = 2;

type Dispos = Record<string, boolean>;
type Minima = Record<string, number>;
/** Dates fermées à l'arrivée ou au départ, indexées pour un test en O(1). */
type Fermetures = Record<string, true>;
type EtatCase =
  | "passe"
  | "indisponible"
  | "libre"
  | "arrivee"
  | "depart"
  | "dans-sejour"
  | "survol"
  | "inactif";

const STYLES: Record<EtatCase, string> = {
  passe: "text-gray-300 cursor-default",
  indisponible: "text-gray-400 line-through cursor-default bg-gray-100 font-medium",
  libre: "text-foreground hover:bg-light-bg cursor-pointer font-medium",
  arrivee: "bg-primary text-white font-semibold rounded-l-full cursor-pointer",
  depart: "bg-primary text-white font-semibold rounded-r-full cursor-pointer",
  "dans-sejour": "bg-primary/15 text-foreground",
  survol: "bg-primary/8 text-foreground",
  inactif: "text-gray-300 cursor-default",
};

export default function CalendrierReservation() {
  const { t, locale } = useTranslation();
  const maintenant = new Date();
  const aujourdhui = formatJour(maintenant);

  const [annee, setAnnee] = useState(maintenant.getFullYear());
  const [mois, setMois] = useState(maintenant.getMonth());
  const [arrivee, setArrivee] = useState<string | null>(null);
  const [depart, setDepart] = useState<string | null>(null);
  const [survol, setSurvol] = useState<string | null>(null);
  const [dispos, setDispos] = useState<Record<string, Dispos>>({});
  const [minima, setMinima] = useState<Minima>({});
  const [sansArrivee, setSansArrivee] = useState<Fermetures>({});
  const [sansDepart, setSansDepart] = useState<Fermetures>({});
  const [chargement, setChargement] = useState(false);
  const [modale, setModale] = useState(false);
  const [adultes, setAdultes] = useState(2);
  const [enfants, setEnfants] = useState(0);

  const mois2 = ajouterMois(annee, mois, 1);

  const charger = useCallback(
    async (force = false) => {
      const cle1 = cleMois(annee, mois);
      const cle2 = cleMois(mois2.annee, mois2.mois);
      if (!force && dispos[cle1] && dispos[cle2]) return;

      setChargement(true);
      try {
        const dernier = joursDuMois(mois2.annee, mois2.mois);
        const res = await fetch(
          `/api/disponibilites?du=${cle1}-01&au=${cle2}-${String(dernier).padStart(2, "0")}`,
          // `no-store` côté navigateur : une disponibilité périmée ferait sélectionner des
          // dates déjà vendues. Le cache serveur de 60 s protège déjà le quota Beds24.
          { cache: "no-store" },
        );
        const data = await res.json();
        if (data.dates) {
          setDispos((prec) => {
            const suivant = { ...prec };
            for (const [jour, libre] of Object.entries(data.dates as Dispos)) {
              const mk = jour.slice(0, 7);
              suivant[mk] = { ...(suivant[mk] ?? {}), [jour]: libre };
            }
            return suivant;
          });
        }
        if (data.minStay) setMinima((prec) => ({ ...prec, ...(data.minStay as Minima) }));
        // Les fermetures s'accumulent au fil des mois visités, comme les minima : la réponse
        // ne couvre que la fenêtre demandée, et repartir de zéro rouvrirait les mois déjà vus.
        const indexer = (jours: unknown) =>
          Object.fromEntries((Array.isArray(jours) ? jours : []).map((j) => [String(j), true as const]));
        setSansArrivee((prec) => ({ ...prec, ...indexer(data.sansArrivee) }));
        setSansDepart((prec) => ({ ...prec, ...indexer(data.sansDepart) }));
      } catch {
        // Silence volontaire : sans données, toutes les dates restent non sélectionnables.
        // Mieux vaut un calendrier inerte qu'une réservation prise sur une dispo inventée.
      } finally {
        setChargement(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [annee, mois],
  );

  useEffect(() => {
    charger();
  }, [charger]);

  // Un onglet laissé ouvert plusieurs heures affiche des disponibilités périmées. On les
  // rafraîchit au retour, sans descendre sous 30 s pour ne pas marteler l'API.
  useEffect(() => {
    let dernier = Date.now();
    const auRetour = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - dernier < 30_000) return;
      dernier = Date.now();
      charger(true);
    };
    document.addEventListener("visibilitychange", auRetour);
    window.addEventListener("focus", auRetour);
    return () => {
      document.removeEventListener("visibilitychange", auRetour);
      window.removeEventListener("focus", auRetour);
    };
  }, [charger]);

  const peutReculer = cleMois(annee, mois) > cleMois(maintenant.getFullYear(), maintenant.getMonth());

  function decaler(n: number) {
    if (n < 0 && !peutReculer) return;
    const m = ajouterMois(annee, mois, n);
    setAnnee(m.annee);
    setMois(m.mois);
  }

  const estLibre = (jour: string) => dispos[jour.slice(0, 7)]?.[jour] === true;
  const estPasse = (jour: string) => jour < aujourdhui;
  const minimumDe = (jour: string) => minima[jour] ?? SEJOUR_MINIMUM_PAR_DEFAUT;

  /** Nuits libres consécutives à partir d'une date — sert à valider un début de séjour. */
  function nuitsLibresDepuis(jour: string): number {
    let n = 0;
    let d = jour;
    while (estLibre(d) && n <= 365) {
      n++;
      d = ajouterJours(d, 1);
    }
    return n;
  }

  /**
   * Rotation du samedi : pendant les vacances scolaires d'hiver, l'`override` du calendrier
   * Beds24 ferme l'arrivée et le départ tous les autres jours. La règle est posée dans Beds24
   * et vaut pour les trois canaux — le site ne fait que la refléter, sans jamais la déduire
   * d'un jour de la semaine, sinon les deux définitions divergeraient à la première exception.
   */
  const arriveeFermee = (jour: string) => sansArrivee[jour] === true;
  const departFerme = (jour: string) => sansDepart[jour] === true;

  function arriveeValide(jour: string): boolean {
    if (estPasse(jour) || !estLibre(jour) || arriveeFermee(jour)) return false;
    return nuitsLibresDepuis(jour) >= minimumDe(jour);
  }

  /**
   * Le jour du départ n'a pas besoin d'être libre : le voyageur part le matin, le suivant
   * arrive le soir. Seules les nuits *entre* les deux doivent l'être.
   */
  function departValide(jour: string): boolean {
    if (!arrivee || jour <= arrivee) return false;
    if (departFerme(jour)) return false;
    if (jour < ajouterJours(arrivee, minimumDe(arrivee))) return false;
    for (let d = ajouterJours(arrivee, 1); d < jour; d = ajouterJours(d, 1)) {
      if (!estLibre(d)) return false;
    }
    return true;
  }

  function clic(jour: string) {
    if (estPasse(jour)) return;
    if (!arrivee || depart) {
      if (arriveeValide(jour)) {
        setArrivee(jour);
        setDepart(null);
        setSurvol(null);
      }
      return;
    }
    if (departValide(jour)) {
      setDepart(jour);
      setSurvol(null);
    } else if (arriveeValide(jour)) {
      // Un clic hors plage valide reprend la sélection à zéro plutôt que de ne rien faire :
      // sans ça, l'utilisateur croit l'interface bloquée.
      setArrivee(jour);
      setDepart(null);
      setSurvol(null);
    }
  }

  function etatDe(jour: string): EtatCase {
    if (arrivee && jour === arrivee) return "arrivee";
    if (depart && jour === depart) return "depart";
    if (arrivee && depart && jour > arrivee && jour < depart) return "dans-sejour";
    if (arrivee && !depart && survol && survol > arrivee && jour > arrivee && jour <= survol && departValide(survol)) {
      return jour === survol ? "depart" : "survol";
    }
    if (estPasse(jour)) return "passe";
    if (!estLibre(jour)) {
      // Une nuit vendue reste un départ possible.
      if (arrivee && !depart && jour > arrivee && departValide(jour)) return "libre";
      return "indisponible";
    }
    if (!arrivee && !arriveeValide(jour)) return "inactif";
    if (arrivee && !depart && !departValide(jour) && !arriveeValide(jour)) return "inactif";
    return "libre";
  }

  const nuits =
    arrivee && depart
      ? Math.round((Date.parse(depart) - Date.parse(arrivee)) / 86_400_000)
      : 0;

  /*
   * Bande de saison de ski, teintée derrière les cases.
   *
   * On parcourt `HIVERS` et non le seul `WINTER_OPENING` : le calendrier navigue librement,
   * et un hiver publié mais absent du teintage se lirait comme « hors saison ». La légende
   * étiquette la bande **effectivement visible**, sans quoi naviguer vers un autre hiver
   * afficherait les dates du mauvais.
   */
  const estSaisonSki = (jour: string) =>
    HIVERS.some((h) => jour >= h.debut && jour <= h.fin);

  const debutFenetre = `${annee}-${String(mois + 1).padStart(2, "0")}-01`;
  const finFenetre = `${mois2.annee}-${String(mois2.mois + 1).padStart(2, "0")}-${String(
    joursDuMois(mois2.annee, mois2.mois),
  ).padStart(2, "0")}`;
  const hiverVisible = HIVERS.find((h) => h.debut <= finFenetre && h.fin >= debutFenetre);
  const periodeVisible = hiverVisible
    ? formatPeriode(LOCALE_META[locale].bcp47, hiverVisible.debut, hiverVisible.fin)
    : null;

  const urlReservation =
    arrivee && depart
      ? `https://beds24.com/booking2.php?propid=${PROPERTY.beds24.propertyId}&layout=1&lang=${locale}` +
        `&checkin=${arrivee}&checkout=${depart}&numadult=${adultes}&numchild=${enfants}`
      : null;

  return (
    <div id="disponibilite">
      <div className="rounded-2xl border border-border p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => decaler(-1)}
            disabled={!peutReculer}
            className="rounded-full p-2 transition-colors hover:bg-light-bg disabled:opacity-30"
            aria-label={t.calendar.previousMonth}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-8 text-sm font-semibold text-foreground">
            <span>
              {t.calendar.monthNames[mois]} {annee}
            </span>
            <span className="hidden md:inline">
              {t.calendar.monthNames[mois2.mois]} {mois2.annee}
            </span>
          </div>
          <button
            onClick={() => decaler(1)}
            className="rounded-full p-2 transition-colors hover:bg-light-bg"
            aria-label={t.calendar.nextMonth}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Grille
            annee={annee}
            mois={mois}
            etatDe={etatDe}
            onClic={clic}
            onSurvol={(j) => arrivee && !depart && setSurvol(j)}
            nomsMois={t.calendar.monthNames}
            nomsJours={t.calendar.dayNames}
            estSaisonSki={estSaisonSki}
          />
          <div className="hidden md:block">
            <Grille
              annee={mois2.annee}
              mois={mois2.mois}
              etatDe={etatDe}
              onClic={clic}
              onSurvol={(j) => arrivee && !depart && setSurvol(j)}
              nomsMois={t.calendar.monthNames}
              nomsJours={t.calendar.dayNames}
              estSaisonSki={estSaisonSki}
            />
          </div>
        </div>

        {/*
          * La teinte seule ne suffirait pas : une information portée par la couleur doit avoir
          * un équivalent textuel. La légende nomme la période en clair, ce qui vaut mieux que
          * d'alourdir l'`aria-label` des quatre-vingt-treize cases concernées.
          */}
        {periodeVisible && (
          <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
            <span aria-hidden className="h-4 w-4 rounded-sm border border-sky-400 bg-sky-200" />
            {t.seasons.skiPeriod(periodeVisible.du, periodeVisible.au)}
          </p>
        )}

        {chargement && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-secondary">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-secondary/30 border-t-secondary" />
            {t.calendar.loading}
          </div>
        )}

        {arrivee && !depart && (
          <p className="mt-4 text-center text-sm text-secondary">
            {t.calendar.selectCheckOut} {t.calendar.minStayNote(minimumDe(arrivee))}
          </p>
        )}

        {arrivee && depart && (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-xl bg-light-bg p-4">
            <p className="text-sm text-foreground">
              <span className="font-semibold">{t.calendar.nights(nuits)}</span> — {arrivee} →{" "}
              {depart}
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <Compteur
                label={t.calendar.adults}
                valeur={adultes}
                min={1}
                max={PROPERTY.capacity.max}
                onChange={(v) => {
                  setAdultes(v);
                  // La capacité est un plafond global : on rabote les enfants plutôt que de
                  // laisser partir vers Beds24 une réservation qu'il refusera.
                  if (v + enfants > PROPERTY.capacity.max) setEnfants(PROPERTY.capacity.max - v);
                }}
              />
              <Compteur
                label={t.calendar.children}
                valeur={enfants}
                min={0}
                max={PROPERTY.capacity.max - adultes}
                onChange={setEnfants}
              />
            </div>
            <p className="text-xs text-secondary">
              {t.calendar.capacityNote(PROPERTY.capacity.max)}
            </p>

            <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-center text-xs font-medium text-emerald-700">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.calendar.directDiscount}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setArrivee(null);
                  setDepart(null);
                  setSurvol(null);
                }}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-white"
              >
                {t.calendar.clear}
              </button>
              <button
                onClick={() => setModale(true)}
                className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {t.calendar.bookNow}
              </button>
            </div>
          </div>
        )}
      </div>

      {modale && urlReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex h-full max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white">
            <div className="flex items-start justify-between gap-3 border-b border-border p-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">{t.calendar.bookNow}</h3>
                <p className="text-xs text-secondary">
                  {t.calendar.summary(nuits, arrivee!, depart!, adultes, enfants)}
                </p>
              </div>
              <button
                onClick={() => setModale(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-light-bg"
                aria-label={t.calendar.close}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <iframe
              src={urlReservation}
              title={t.calendar.bookNow}
              className="flex-1 border-0"
              // Le tunnel Beds24 encaisse un paiement : il lui faut ses propres scripts,
              // formulaires et redirections vers la page 3-D Secure de la banque.
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation-by-user-activation"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Compteur({
  label,
  valeur,
  min,
  max,
  onChange,
}: {
  label: string;
  valeur: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="whitespace-nowrap text-sm font-medium text-foreground">{label}</span>
      <button
        type="button"
        disabled={valeur <= min}
        onClick={() => onChange(valeur - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-light-bg disabled:cursor-default disabled:opacity-30"
        aria-label="−"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="w-6 text-center text-sm font-semibold text-foreground">{valeur}</span>
      <button
        type="button"
        disabled={valeur >= max}
        onClick={() => onChange(valeur + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-light-bg disabled:cursor-default disabled:opacity-30"
        aria-label="+"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

function Grille({
  annee,
  mois,
  etatDe,
  onClic,
  onSurvol,
  nomsMois,
  nomsJours,
  estSaisonSki,
}: {
  annee: number;
  mois: number;
  etatDe: (jour: string) => EtatCase;
  onClic: (jour: string) => void;
  onSurvol: (jour: string) => void;
  nomsMois: string[];
  nomsJours: string[];
  estSaisonSki: (jour: string) => boolean;
}) {
  const nb = joursDuMois(annee, mois);
  const decalage = premierJourDuMois(annee, mois);
  const cases: (number | null)[] = [
    ...Array.from({ length: decalage }, () => null),
    ...Array.from({ length: nb }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-secondary">
        {nomsJours.map((n) => (
          <div key={n} className="py-1">
            {n}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cases.map((jour, i) => {
          if (jour === null) return <div key={`vide-${i}`} className="aspect-square" />;
          const iso = `${annee}-${String(mois + 1).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;
          const etat = etatDe(iso);
          const cliquable = ["libre", "arrivee", "depart", "dans-sejour", "survol"].includes(etat);
          /*
           * La teinte de saison vit sur un conteneur et non sur le bouton : les états de
           * sélection ont leur propre fond (`bg-primary`, `bg-gray-100`…) et l'écraseraient.
           * En sous-couche, elle reste visible sur les jours libres et cède la place à
           * l'indisponibilité ou à la sélection, qui priment.
           *
           * Conséquence assumée : au survol d'un jour libre, le `hover:bg-light-bg` du bouton
           * masque la teinte le temps du survol. Le retour de survol vaut mieux que la bande.
           */
          return (
            <div key={iso} className={`aspect-square ${estSaisonSki(iso) ? "bg-sky-200" : ""}`}>
              <button
                type="button"
                disabled={!cliquable}
                onClick={() => cliquable && onClic(iso)}
                onMouseEnter={() => onSurvol(iso)}
                className={`flex h-full w-full items-center justify-center text-sm transition-colors ${STYLES[etat]}`}
                aria-label={`${jour} ${nomsMois[mois]} ${annee}`}
              >
                {jour}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
