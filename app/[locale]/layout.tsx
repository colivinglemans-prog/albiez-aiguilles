import { notFound } from "next/navigation";
import { I18nProvider, isLocale, LOCALES } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

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
    <I18nProvider locale={locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </I18nProvider>
  );
}
