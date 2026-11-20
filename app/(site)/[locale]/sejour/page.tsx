import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import QuoteSummary from "@sejour/socle/components/QuoteSummary";
import { jsonLdText } from "@sejour/socle/lib/price-grid";
import { cancellationText, stayPageLabels } from "@sejour/socle/lib/quote-labels";
import { loadStayPage, parseStayParams, stayJsonLd, stayQuery } from "@sejour/socle/lib/stay-page";
import { STAY_AGENT, STAY_QUOTE, stayAgentDeps } from "@/lib/agent";
import { isLocale } from "@/lib/i18n";
import { CANCELLATION_POLICY, PROPERTY, SITE_URL } from "@/lib/property";
import { included, PAYMENT_NOTE } from "@/lib/quote-notes";

/**
 * La page Séjour : `/fr/sejour?checkin=2027-01-23&checkout=2027-01-30&adults=4&children=0`.
 * « Disponible » et le prix Beds24 au centime, rendus côté serveur — lisibles par une IA qui
 * ouvre une URL sans JavaScript —, ou le refus traduit avec les séjours libres les plus proches.
 * Voir `@sejour/socle/lib/stay-page`. Jamais indexée ; 60 s de cache CDN (`next.config.ts`).
 * Rendue à la demande, comme le devis : elle ne compte pas parmi les pages statiques du site.
 */
export const dynamic = "force-dynamic";

const TITLE: Record<string, string> = {
  fr: "Votre séjour : disponibilité et prix exact",
  en: "Your stay: availability and exact price",
  de: "Ihr Aufenthalt: Verfügbarkeit und genauer Preis",
  es: "Su estancia: disponibilidad y precio exacto",
  it: "Il vostro soggiorno: disponibilità e prezzo esatto",
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: TITLE[locale] ?? TITLE.fr, robots: { index: false, follow: false } };
}

export default async function StayPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const parsed = parseStayParams(await searchParams);
  if (parsed.kind === "empty") permanentRedirect(`/${locale}/tarifs`);
  if (parsed.kind === "redirect") permanentRedirect(`/${locale}/sejour?${parsed.query}`);

  const state = await loadStayPage(parsed.stay, PROPERTY.beds24.propertyId, STAY_QUOTE, stayAgentDeps(), locale);
  const calendarUrl = (s: { checkIn: string; checkOut: string; adults: number; children: number }) =>
    `/${locale}?${new URLSearchParams({ arrivee: s.checkIn, depart: s.checkOut, adultes: String(s.adults), enfants: String(s.children) })}#reserver`;
  const name = STAY_AGENT.facts(locale).name;
  const ld = stayJsonLd(state, { name, url: `${SITE_URL}/${locale}` });
  return (
    <div className="pt-24">
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdText(ld) }} />}
      <QuoteSummary
        state={state}
        lang={locale}
        // Pas de prix par personne : le même de 1 à 4 voyageurs (décision de l'hôte, 2026-11-20).
        labels={{ ...stayPageLabels(locale, included(locale)), perPersonPerNight: undefined }}
        calendarUrl={calendarUrl}
        alternativeUrl={(s) => `/${locale}/sejour?${stayQuery({ ...s, src: parsed.stay.src })}`}
        fallbackUrl={`/${locale}#reserver`}
        conditionsUrl={`/${locale}/conditions`}
        cancellation={cancellationText(CANCELLATION_POLICY, locale)}
        notes={[PAYMENT_NOTE[locale] ?? PAYMENT_NOTE.fr]}
        header={<p className="text-sm uppercase tracking-wide text-secondary">{name}</p>}
      />
    </div>
  );
}
