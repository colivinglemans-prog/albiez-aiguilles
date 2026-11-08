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

/** « Compris », selon que le linge est pris ou non : jamais « en option » sous une ligne de linge comptée. */
const INCLUDED: Record<string, { base: string; linenOptional: string; linenIncluded: string }> = {
  fr: { base: "Taxe de séjour et ménage de fin de séjour compris.", linenOptional: "Linge de lit et serviettes en option.", linenIncluded: "Linge de lit et serviettes compris (à cocher sur la page de paiement)." },
  en: { base: "Tourist tax and end-of-stay cleaning included.", linenOptional: "Bed linen and towels optional.", linenIncluded: "Bed linen and towels included (tick the option on the payment page)." },
  de: { base: "Kurtaxe und Endreinigung inklusive.", linenOptional: "Bettwäsche und Handtücher optional.", linenIncluded: "Bettwäsche und Handtücher inklusive (auf der Zahlungsseite ankreuzen)." },
  es: { base: "Tasa turística y limpieza final incluidas.", linenOptional: "Ropa de cama y toallas opcionales.", linenIncluded: "Ropa de cama y toallas incluidas (marque la opción en la página de pago)." },
  it: { base: "Tassa di soggiorno e pulizia finale incluse.", linenOptional: "Biancheria e asciugamani opzionali.", linenIncluded: "Biancheria e asciugamani inclusi (spuntate l'opzione nella pagina di pagamento)." },
};

function included(lang: string) {
  const t = INCLUDED[lang] ?? INCLUDED.fr;
  return (extras: string[]) => `${t.base} ${extras.includes("linge") ? t.linenIncluded : t.linenOptional}`;
}

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
        labels={quoteLabels(locale, included(locale))}
        calendarUrl={calendarUrl}
        conditionsUrl={`/${locale}/conditions`}
        cancellation={cancellationText(CANCELLATION_POLICY, locale)}
        header={<p className="text-sm uppercase tracking-wide text-secondary">{STAY_AGENT.facts(locale).name}</p>}
      />
    </div>
  );
}
