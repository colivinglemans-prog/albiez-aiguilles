"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { LANGUES_PARTAGE, messageVoyageur, urlGuideArrivee } from "@/lib/partage-voyageur";

/**
 * Bloc de partage voyageur, dans la fiche d'un séjour.
 *
 * Ce qu'on envoie avant une arrivée tient en deux choses : le lien du guide et le code de la
 * boîte à clés. Les deux se copient ici, dans la langue du voyageur, depuis l'écran où l'on
 * regarde déjà le séjour — plutôt que de rouvrir le site pour recomposer l'URL et de chercher
 * le code dans un ancien message.
 *
 * **Admin uniquement** : le parent ne le monte pas en vue restreinte, et la route du code
 * refuse le rôle `viewer` de son côté.
 *
 * ⚠️ **Aucune présélection de langue.** Barbusse met en avant la langue probable d'après le
 * pays du voyageur ; impossible ici, et c'est voulu : les jetons Beds24 d'Albiez ne portent
 * pas `read:bookings-personal`, donc ni pays ni prénom n'entrent dans le site. Les cinq
 * langues sont à égalité, l'administrateur sait laquelle choisir.
 */
export default function PartageVoyageur() {
  const [code, setCode] = useState<string | null>(null);
  const [etatCode, setEtatCode] = useState<"chargement" | "pret" | "erreur">("chargement");
  const [copie, setCopie] = useState<string | null>(null);
  const [repli, setRepli] = useState<string | null>(null);
  const replisRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let annule = false;

    fetch("/api/dashboard/code-acces")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ code: string | null }>;
      })
      .then(({ code: valeur }) => {
        if (annule) return;
        setCode(valeur);
        setEtatCode("pret");
      })
      .catch(() => {
        if (!annule) setEtatCode("erreur");
      });

    return () => {
      annule = true;
    };
  }, []);

  // Le presse-papier est refusé hors contexte sécurisé et dans certains modes application :
  // on sélectionne alors le texte pour une copie à la main, plutôt que d'échouer en silence.
  useEffect(() => {
    if (repli && replisRef.current) {
      replisRef.current.focus();
      replisRef.current.select();
    }
  }, [repli]);

  async function copier(cle: string, texte: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("presse-papier indisponible");
      await navigator.clipboard.writeText(texte);
      setRepli(null);
      setCopie(cle);
      setTimeout(() => setCopie((c) => (c === cle ? null : c)), 1500);
    } catch {
      setCopie(null);
      setRepli(texte);
    }
  }

  /** Une pastille par langue, pour une même nature de contenu. */
  function pastilles(nature: "lien" | "message", texteDe: (l: Locale) => string) {
    return (
      <div className="mt-1 flex flex-wrap gap-1.5">
        {LANGUES_PARTAGE.map((langue) => {
          const cle = `${nature}-${langue}`;
          const estCopie = copie === cle;
          return (
            <button
              key={langue}
              type="button"
              onClick={() => copier(cle, texteDe(langue))}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium uppercase transition-colors ${
                estCopie
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-border text-secondary hover:bg-light-bg"
              }`}
            >
              {estCopie ? "✓" : langue}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <p className="text-xs font-medium text-slate-600">Partage voyageur</p>

      <div className="mt-2">
        <p className="text-xs text-slate-400">Lien du guide</p>
        {pastilles("lien", (langue) => urlGuideArrivee(langue))}
      </div>

      <div className="mt-3">
        <p className="text-xs text-slate-400">Message complet</p>
        {pastilles("message", (langue) =>
          messageVoyageur(langue, { url: urlGuideArrivee(langue), code: code ?? undefined }),
        )}
      </div>

      <div className="mt-3">
        <p className="text-xs text-slate-400">Code de la boîte à clés</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {etatCode === "chargement" && <span className="text-xs text-slate-400">…</span>}
          {etatCode === "erreur" && (
            <span className="text-xs text-rose-600">Code indisponible</span>
          )}
          {etatCode === "pret" && !code && (
            <span className="text-xs text-slate-400">
              Non renseigné (<code className="font-mono">ALBIEZ_CODE_BOITE_A_CLES</code>)
            </span>
          )}
          {etatCode === "pret" && code && (
            <>
              <span className="rounded-lg bg-light-bg px-2.5 py-1 font-mono text-sm font-semibold tracking-widest text-slate-900">
                {code}
              </span>
              <button
                type="button"
                onClick={() => copier("code", code)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  copie === "code"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-border text-secondary hover:bg-light-bg"
                }`}
              >
                {copie === "code" ? "Copié ✓" : "Copier"}
              </button>
            </>
          )}
        </div>
      </div>

      {repli && (
        <div className="mt-3">
          <p className="text-[10px] text-amber-700">
            Copie automatique refusée par le navigateur — le texte est sélectionné, copiez-le à
            la main.
          </p>
          <textarea
            ref={replisRef}
            readOnly
            value={repli}
            rows={repli.includes("\n") ? 6 : 2}
            onClick={(e) => e.currentTarget.select()}
            className="mt-1 w-full resize-y rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs text-amber-900 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
