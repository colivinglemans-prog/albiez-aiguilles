import type { StatsDashboard } from "@/lib/dashboard-types";

const euros = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;
const pct = (n: number) => `${n.toFixed(1).replace(".", ",")} %`;

function Carte({
  titre,
  valeur,
  detail,
}: {
  titre: string;
  valeur: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{titre}</p>
      <p className="mt-1.5 text-2xl font-bold text-slate-900">{valeur}</p>
      {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
    </div>
  );
}

export default function StatsCards({ stats }: { stats: StatsDashboard }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Carte
        titre="Net encaissé"
        valeur={euros(stats.revenuNet)}
        detail={`${euros(stats.revenuTotal)} brut · ${euros(stats.commissions)} de commissions`}
      />
      <Carte
        titre="Occupation"
        valeur={pct(stats.tauxOccupation)}
        detail="Nuits vendues sur la période écoulée"
      />
      <Carte
        titre="Prix moyen par nuit"
        valeur={euros(stats.tjm)}
        detail={`RevPAR ${euros(stats.revpar)} (nuits vides incluses)`}
      />
      <Carte
        titre="Séjours"
        valeur={String(stats.nombreSejours)}
        detail={`${stats.nuitsVendues} nuits · ${stats.dureeMoyenneSejour.toFixed(1).replace(".", ",")} nuits en moyenne`}
      />
      <Carte
        titre="Part du direct"
        valeur={pct(stats.partDirecte.revenu)}
        detail={`${pct(stats.partDirecte.sejours)} des séjours · aucune commission de canal`}
      />
      <Carte
        titre="Occupation 90 jours"
        valeur={pct(stats.occupation90Jours)}
        detail="Déjà réservé sur les 90 prochains jours"
      />
      <Carte
        titre="Délai de réservation"
        valeur={
          stats.delaiMoyenReservation == null
            ? "—"
            : `${stats.delaiMoyenReservation} j`
        }
        detail="Entre la réservation et l'arrivée"
      />
      <Carte
        titre="Recettes hors nuits"
        valeur={euros(stats.recettesHorsNuits.total)}
        detail={`${stats.recettesHorsNuits.nombre} encaissements · kits, frais d'annulation`}
      />
    </div>
  );
}
