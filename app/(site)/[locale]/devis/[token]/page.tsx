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
  fr: { base: "Taxe de séjour et ménage de fin de séjour compris.", linenOptional: "Linge de lit et serviettes en option.", linenIncluded: "Linge de lit et serviettes ajoutés au devis : cochez l'option « kit linge » sur la page de paiement." },
  en: { base: "Tourist tax and end-of-stay cleaning included.", linenOptional: "Bed linen and towels optional.", linenIncluded: "Bed linen and towels added to the quote: tick the “linen kit” option on the payment page." },
  de: { base: "Kurtaxe und Endreinigung inklusive.", linenOptional: "Bettwäsche und Handtücher optional.", linenIncluded: "Bettwäsche und Handtücher im Angebot enthalten: auf der Zahlungsseite die Option „Wäschepaket“ ankreuzen." },
  es: { base: "Tasa turística y limpieza final incluidas.", linenOptional: "Ropa de cama y toallas opcionales.", linenIncluded: "Ropa de cama y toallas añadidas al presupuesto: marque la opción «kit de ropa» en la página de pago." },
  it: { base: "Tassa di soggiorno e pulizia finale incluse.", linenOptional: "Biancheria e asciugamani opzionali.", linenIncluded: "Biancheria e asciugamani aggiunti al preventivo: spuntate l'opzione «kit biancheria» nella pagina di pagamento." },
};

/** Rappel du paiement sur le devis (relevé par le test voyageur : le devis ne le disait pas). */
const PAYMENT_NOTE: Record<string, string> = {
  fr: "Paiement : 100 % à la réservation, par carte, sur la page sécurisée Beds24.",
  en: "Payment: 100% at booking, by card, on the secure Beds24 page.",
  de: "Zahlung: 100 % bei der Buchung, per Karte, auf der sicheren Beds24-Seite.",
  es: "Pago: 100 % al reservar, con tarjeta, en la página segura de Beds24.",
  it: "Pagamento: 100% alla prenotazione, con carta, sulla pagina sicura di Beds24.",
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
        notes={[PAYMENT_NOTE[locale] ?? PAYMENT_NOTE.fr]}
        header={<p className="text-sm uppercase tracking-wide text-secondary">{STAY_AGENT.facts(locale).name}</p>}
      />
    </div>
  );
}
