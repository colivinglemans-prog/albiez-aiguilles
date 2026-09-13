import DashboardNav from "@/components/dashboard/DashboardNav";
import StatsDashboard from "@sejour/socle/components/StatsDashboard";

/**
 * La page de statistiques est **la même que chez Barbusse**, au titre, au sous-titre et à la
 * couleur d'accent près : c'est le composant du socle qui la dessine, les huit cartes et leurs
 * définitions imprimées comprises. Elle est destinée à être montrée à un banquier — rien
 * d'extrapolé n'y figure, et les deux biens se lisent avec les mêmes définitions.
 *
 * L'accent est le bleu alpin du site ; il ne vit que sur les courbes des graphes. Les cartes
 * restent blanches des deux côtés.
 */
export default function DashboardPage() {
  return (
    <>
      {/* Le bandeau est hors du conteneur : il s'appuie sur toute la largeur de l'écran,
          comme le header de la vitrine, et pose lui-même sa propre gouttière. */}
      <DashboardNav />
      <StatsDashboard
        title="Albiez — statistiques"
        subtitle="Hameau des Aiguilles · quatre canaux réunis"
        accent="#0284c7"
      />
    </>
  );
}
