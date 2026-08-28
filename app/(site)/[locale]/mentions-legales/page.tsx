import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { SITE_URL, PROPERTY } from "@/lib/property";
import { LEGAL_ENTITY, HOST_PROVIDER } from "@/lib/legal";
import { Section, SectionTitle } from "@/components/public/Section";

const PATH = "mentions-legales";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    title: t.legal.title,
    // Page de service : utile aux visiteurs, sans intérêt dans l'index de recherche.
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}/${locale}/${PATH}` },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const l = t.legal.labels;

  const rows = [
    { label: l.legalName, value: LEGAL_ENTITY.legalName },
    { label: l.legalForm, value: LEGAL_ENTITY.legalForm },
    { label: l.capital, value: LEGAL_ENTITY.shareCapital },
    { label: l.siren, value: LEGAL_ENTITY.siren },
    { label: l.siret, value: LEGAL_ENTITY.siret },
    { label: l.office, value: LEGAL_ENTITY.registeredOffice },
    {
      label: l.ape,
      value: `${LEGAL_ENTITY.apeCode} — ${LEGAL_ENTITY.apeLabel}`,
    },
    { label: l.contact, value: PROPERTY.contact.email },
  ];

  return (
    <Section>
      <SectionTitle title={t.legal.title} />

      <h2 className="mb-4 text-lg font-semibold">{t.legal.editorTitle}</h2>
      <dl className="mb-12 divide-y divide-border border-y border-border">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-3">
            <dt className="text-sm font-medium text-secondary">{row.label}</dt>
            <dd className="text-sm sm:col-span-2">{row.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mb-4 text-lg font-semibold">{t.legal.hostTitle}</h2>
      <p className="mb-12 text-sm text-secondary">
        {HOST_PROVIDER.name} — {HOST_PROVIDER.address}
        <br />
        <a
          href={HOST_PROVIDER.website}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          {HOST_PROVIDER.website}
        </a>
      </p>

      <h2 className="mb-4 text-lg font-semibold">{t.legal.dataTitle}</h2>
      <p className="max-w-3xl text-sm text-secondary">{t.legal.dataText}</p>
    </Section>
  );
}
