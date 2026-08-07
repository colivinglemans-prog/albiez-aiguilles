import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_URL } from "@/lib/property";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    /*
     * Pas de suffixe de marque. Le nom du logement fait une cinquantaine de
     * caractères : l'ajouter à chaque titre les pousserait tous bien au-delà des
     * ~60 que Google affiche, et c'est la requête ciblée qui serait tronquée.
     * Chaque page porte déjà « Albiez » dans son propre titre.
     */
    template: "%s",
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `lang` est corrigé côté client par I18nProvider selon le segment d'URL.
    // On garde le rendu statique plutôt que de lire les en-têtes ici.
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
