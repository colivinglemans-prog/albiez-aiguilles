import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PriceGrid from "@sejour/socle/components/PriceGrid";
import { jsonLdText, lowestTotal, priceGridOffer, type GridColumn, type GridRow } from "@sejour/socle/lib/price-grid";
import { ogImage } from "@/lib/og-image";
import { isLocale, LOCALE_META, type Locale } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/property";
import { alternatesFor, openGraphLocales, pricesPath } from "@/lib/seo";
import { getPriceGrid } from "@/lib/tarifs";
import { Section, SectionTitle } from "@/components/public/Section";
import { pricesContent } from "./content";

/**
 * « Tarifs » : le prix exact des semaines à venir, en HTML lisible sans JavaScript — ce que les
 * assistants IA ne trouvaient nulle part (tests du 19/11/2026). Page publique mais discrète :
 * liée depuis le pied de page, les conditions, les saisons et le bloc de réservation, pas depuis
 * le menu.
 *
 * La page ne fait **que lire** la grille rangée dans Upstash par le cron `/api/cron/price-grid`
 * (toutes les heures) : jamais un appel Beds24 sur le chemin d'un visiteur. Régénérée au plus toutes
 * les 5 minutes (`revalidate`, seule page du site qui en déclare un) : une grille neuve paraît au
 * plus 5 minutes après le calcul. Rien de rangé, ou autre composition : renvoi au calendrier, jamais
 * d'erreur. Grille de plus de 24 h : lignes passées retirées, pas de JSON-LD.
 */
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = pricesContent(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternatesFor(locale, pricesPath),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: pricesPath(locale),
      ...openGraphLocales(locale),
      images: ogImage(locale),
    },
  };
}

/** Le calendrier de l'accueil, pré-rempli pour ce séjour (lien `nofollow` de la grille). */
function calendarHref(locale: Locale) {
  return (row: GridRow, column: GridColumn) => {
    const party = column.parties[column.parties.length - 1];
    const q = new URLSearchParams({
      arrivee: row.checkIn,
      depart: row.checkOut,
      adultes: String(party.adults),
      enfants: String(party.children),
    });
    return `/${locale}?${q}#reserver`;
  };
}

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = pricesContent(locale);
  const tag = LOCALE_META[locale].bcp47;
  const stored = await getPriceGrid();
  const grid = stored?.grid ?? null;
  // « 7 nuits à partir de » : les semaines de 7 nuits seulement, jamais un sous-séjour de 3 nuits
  // glissé dans une semaine en partie prise (test voyageur du 20/11/2026 : « dès 238,57 € »).
  const min = grid?.pricesShown ? lowestTotal(grid, 0, (r) => r.nights === 7) : null;
  const from = min === null ? null : new Intl.NumberFormat(tag, { style: "currency", currency: "EUR" }).format(min);
  const offer = grid && !stored?.stale ? priceGridOffer(grid, `${SITE_URL}${pricesPath(locale)}`) : null;

  return (
    <Section>
      {offer && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdText({
              "@context": "https://schema.org",
              ...offer,
              itemOffered: { "@type": "Apartment", name: SITE_NAME, url: SITE_URL },
            }),
          }}
        />
      )}
      <SectionTitle as="h1" title={c.title} />
      <p className="mb-6 max-w-3xl text-secondary">{c.lead(from)}</p>
      {grid && grid.rows.length > 0 ? (
        <PriceGrid grid={grid} priced={stored?.priced} locale={tag} labels={c.grid} linkFor={grid.pricesShown ? calendarHref(locale) : undefined} className="max-w-4xl" />
      ) : (
        <p className="max-w-3xl rounded-2xl bg-light-bg p-4 text-sm">{c.noPrices}</p>
      )}
      <div className="mt-8 max-w-3xl space-y-2 text-sm text-secondary">
        <p>{c.absentWeeks}</p>
        <p>{c.linen}</p>
        <p>{c.exact}</p>
        <p>
          {c.otherDates}{" "}
          <Link href={`/${locale}#reserver`} className="font-medium text-foreground underline">
            {c.calendarLink}
          </Link>
        </p>
      </div>
    </Section>
  );
}
