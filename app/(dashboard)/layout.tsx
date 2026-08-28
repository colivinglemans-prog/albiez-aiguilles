import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard — Albiez",
  // Usage interne : à ne jamais laisser indexer, même si le chemin n'est lié de nulle part.
  robots: { index: false, follow: false },
};

/**
 * **Second layout racine** du projet, à côté de `app/(site)/[locale]/layout.tsx`.
 *
 * Next n'accepte plusieurs layouts racines qu'à condition que chacun vive dans son groupe
 * de routes — d'où le déplacement de `app/[locale]` vers `app/(site)/[locale]`. Les
 * parenthèses n'apparaissent pas dans les URLs : `/fr` et `/dashboard` sont inchangés.
 *
 * Le dashboard reste volontairement **hors de `[locale]`** : il est en français seulement,
 * et le placer sous le segment de langue le dupliquerait en cinq exemplaires indexables.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} min-h-screen bg-slate-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
