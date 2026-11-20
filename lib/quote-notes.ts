/** Textes affichés sous le prix, sur le devis signé (`/devis`) et la page Séjour (`/sejour`). */

/** « Compris », selon que le linge est pris ou non : jamais « en option » sous une ligne de linge comptée. */
export const INCLUDED: Record<string, { base: string; linenOptional: string; linenIncluded: string }> = {
  fr: { base: "Taxe de séjour et ménage de fin de séjour compris.", linenOptional: "Linge de lit et serviettes en option.", linenIncluded: "Linge de lit et serviettes ajoutés au devis : cochez l'option « kit linge » sur la page de paiement." },
  en: { base: "Tourist tax and end-of-stay cleaning included.", linenOptional: "Bed linen and towels optional.", linenIncluded: "Bed linen and towels added to the quote: tick the “linen kit” option on the payment page." },
  de: { base: "Kurtaxe und Endreinigung inklusive.", linenOptional: "Bettwäsche und Handtücher optional.", linenIncluded: "Bettwäsche und Handtücher im Angebot enthalten: auf der Zahlungsseite die Option „Wäschepaket“ ankreuzen." },
  es: { base: "Tasa turística y limpieza final incluidas.", linenOptional: "Ropa de cama y toallas opcionales.", linenIncluded: "Ropa de cama y toallas añadidas al presupuesto: marque la opción «kit de ropa» en la página de pago." },
  it: { base: "Tassa di soggiorno e pulizia finale incluse.", linenOptional: "Biancheria e asciugamani opzionali.", linenIncluded: "Biancheria e asciugamani aggiunti al preventivo: spuntate l'opzione «kit biancheria» nella pagina di pagamento." },
};

/** Rappel du paiement sur le devis et la page Séjour (relevé par le test voyageur : le devis ne le disait pas). */
export const PAYMENT_NOTE: Record<string, string> = {
  fr: "Paiement : 100 % à la réservation, par carte, sur la page sécurisée Beds24.",
  en: "Payment: 100% at booking, by card, on the secure Beds24 page.",
  de: "Zahlung: 100 % bei der Buchung, per Karte, auf der sicheren Beds24-Seite.",
  es: "Pago: 100 % al reservar, con tarjeta, en la página segura de Beds24.",
  it: "Pagamento: 100% alla prenotazione, con carta, sulla pagina sicura di Beds24.",
};

export function included(lang: string) {
  const t = INCLUDED[lang] ?? INCLUDED.fr;
  return (extras: string[]) => `${t.base} ${extras.includes("linge") ? t.linenIncluded : t.linenOptional}`;
}
