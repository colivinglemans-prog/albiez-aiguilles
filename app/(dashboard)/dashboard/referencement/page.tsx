import DashboardNav from "@/components/dashboard/DashboardNav";
import SearchConsoleDashboard from "@sejour/socle/components/SearchConsoleDashboard";

/**
 * Ce que Google Search Console sait des recherches qui mènent au site : requêtes, clics,
 * impressions, position. Le composant est celui du socle, **le même que chez Barbusse** ; ne
 * restent ici que les données propres au bien. Accent : le bleu alpin, comme les statistiques.
 *
 * Les visites elles-mêmes (toutes sources confondues) restent dans Vercel Analytics, qui n'a pas
 * d'API de lecture : un lien, pas une recopie.
 */
export default function ReferencementPage() {
  return (
    <>
      <DashboardNav />
      <SearchConsoleDashboard
        title="Albiez — référencement"
        subtitle="Recherches Google qui mènent au site"
        accent="#0284c7"
        endpoint="/api/dashboard/referencement"
        links={[
          {
            href: "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aalbiez-aiguilles.fr",
            label: "Search Console",
          },
          {
            href: "https://vercel.com/colivinglemans-progs-projects/albiez-aiguilles/analytics",
            label: "Visites (Vercel Analytics)",
          },
        ]}
      />
    </>
  );
}
