import DashboardNav from "@/components/dashboard/DashboardNav";
import GuestMessagesDashboard from "@sejour/socle/components/GuestMessagesDashboard";

/**
 * Messages automatiques aux voyageurs : pour chaque séjour, ce qui est parti (par l'outil, ou à
 * la main avant lui), ce qui partira et quand, ce qui est bloqué et pourquoi. Le composant est
 * celui du socle, **le même que chez Barbusse** ; les textes sont dans `lib/messages/templates.ts`.
 *
 * La confirmation de réservation n'y figure pas : elle reste envoyée par Beds24 (facture et lien
 * de paiement), décision du 2026-11-08.
 */
export default function MessagesPage() {
  return (
    <>
      <DashboardNav />
      <GuestMessagesDashboard
        title="Albiez — messages voyageurs"
        subtitle="Avant l'arrivée, code de la boîte à clés, veille du départ. La confirmation reste envoyée par Beds24."
        accent="#0284c7"
        endpoint="/api/dashboard/messages"
        previewEndpoint="/api/dashboard/messages/apercu"
        sendEndpoint="/api/dashboard/messages/envoyer"
      />
    </>
  );
}
