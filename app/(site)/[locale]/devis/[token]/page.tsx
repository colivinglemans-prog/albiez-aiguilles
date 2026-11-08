import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuoteSummary from "@sejour/socle/components/QuoteSummary";
import { loadQuotePage } from "@sejour/socle/lib/quote-page";
import { cancellationText, quoteLabels } from "@sejour/socle/lib/quote-labels";
import { quoteKeysFromEnv } from "@sejour/socle/lib/quote-token";
import { STAY_AGENT, STAY_QUOTE, stayAgentDeps } from "@/lib/agent";
import { isLocale } from "@/lib/i18n";
import { CANCELLATION_POLICY, PROPERTY } from "@/lib/property";

/**
 * Le devis partagé par une IA (`/api/agent/quote` → `quoteUrl`). Revérifié à chaque affichage :
 * voir `@sejour/socle/lib/quote-page`. Jamais indexé : une page par jeton, sans valeur de
 * recherche, et qui expire.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const INCLUDED: Record<string, string> = {
  fr: "Taxe de séjour et ménage de fin de séjour compris. Linge de lit et serviettes en option.",
  en: "Tourist tax and end-of-stay cleaning included. Bed linen and towels optional.",
  de: "Kurtaxe und Endreinigung inklusive. Bettwäsche und Handtücher optional.",
  es: "Tasa turística y limpieza final incluidas. Ropa de cama y toallas opcionales.",
  it: "Tassa di soggiorno e pulizia finale incluse. Biancheria e asciugamani opzionali.",
};

export default async function QuotePage({ params }: { params: Promise<{ locale: string; token: string }> }) {
  const { locale, token } = await params;
  if (!isLocale(locale)) notFound();
  let keys;
  try {
    keys = quoteKeysFromEnv();
  } catch {
    notFound();
  }
  const state = await loadQuotePage(token, PROPERTY.beds24.propertyId, STAY_QUOTE, stayAgentDeps(), keys);
  const calendarUrl = (s: { checkIn: string; checkOut: string; adults: number; children: number }) =>
    `/${locale}?${new URLSearchParams({ arrivee: s.checkIn, depart: s.checkOut, adultes: String(s.adults), enfants: String(s.children) })}#reserver`;
  return (
    <div className="pt-24">
      <QuoteSummary
        state={state}
        lang={locale}
        labels={quoteLabels(locale, INCLUDED[locale] ?? INCLUDED.fr)}
        calendarUrl={calendarUrl}
        conditionsUrl={`/${locale}/conditions`}
        cancellation={cancellationText(CANCELLATION_POLICY, locale)}
        header={<p className="text-sm uppercase tracking-wide text-secondary">{STAY_AGENT.facts(locale).name}</p>}
      />
    </div>
  );
}
