import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { I18nProvider, isLocale, LOCALES } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/property";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * C'est le layout **racine** du site : `app/` ne contient plus de page, la racine `/`
 * étant redirigée par le middleware. C'est ce qui permet d'écrire `lang` sur `<html>`
 * avec la vraie langue de la page, en gardant le rendu statique.
 *
 * Auparavant `app/layout.tsx` figeait `lang="fr"` et `I18nProvider` le corrigeait au
 * montage. Acceptable à deux langues ; à cinq, le HTML servi à Google et aux lecteurs
 * d'écran annonçait du français sur `/de`, `/es` et `/it`.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
