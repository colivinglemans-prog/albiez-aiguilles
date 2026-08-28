import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { SITE_URL, PROPERTY } from "@/lib/property";
import {
  ARRIVAL_PHOTO_DIR,
  ARRIVAL_STEPS,
  ELECTRICAL_PANEL_PHOTO,
  EMERGENCY_NUMBERS,
  PANEL_MARKERS,
} from "@/lib/arrival";
import { getPhoto } from "@/lib/photos";

const PATH = "guide-arrivee";

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
    title: t.guide.seo.title,
    description: t.guide.seo.description,
    /*
     * Page cachée : son adresse est communiquée aux voyageurs avec leur réservation.
     * `follow: false` en plus de `index: false` — rien ici n'a vocation à être
     * exploré. Elle est volontairement absente du sitemap et de la navigation ;
     * la lister dans robots.txt reviendrait au contraire à publier son adresse.
     */
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE_URL}/${locale}/${PATH}` },
  };
}

export default async function ArrivalGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const g = t.guide;

  // Deux étapes portent une précision chiffrée : le nombre de marches et le numéro
  // de la porte. Ces valeurs viennent de `property.ts`, jamais du dictionnaire.
  const notes: Record<string, string> = {
    escalier: g.stairsNote(PROPERTY.access.steps),
    porte: g.unitNote(PROPERTY.unit),
  };

  const panelPhoto = getPhoto(ARRIVAL_PHOTO_DIR, ELECTRICAL_PANEL_PHOTO);

  return (
    // Page lue sur un téléphone, souvent au volant arrêté au col : une seule
    // colonne, des photos pleine largeur et des cibles tactiles généreuses.
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">{g.title}</h1>
        <p className="mt-4 text-secondary">{g.intro}</p>

        <p className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {g.codeNote}
        </p>

        <a
          href={PROPERTY.links.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {g.mapsCta}
        </a>
        <p className="mt-3 text-center text-sm text-secondary">
          {PROPERTY.address.full}
        </p>
      </header>

      <ol className="mt-12 space-y-12">
        {ARRIVAL_STEPS.map((step, i) => {
          const content = g.steps[step.key];
          const photo = getPhoto(ARRIVAL_PHOTO_DIR, step.photo);
          const note = notes[step.key];

          return (
            <li key={step.key}>
              {photo && (
                <div className="overflow-hidden rounded-2xl border border-border bg-light-bg">
                  <Image
                    src={photo.src}
                    alt={content.title}
                    width={photo.width}
                    height={photo.height}
                    // Le conteneur prend le format de la photo : les panoramiques
                    // comme les portraits s'affichent sans recadrage.
                    className="h-auto w-full"
                    sizes="(max-width: 672px) 100vw, 672px"
                    priority={i === 0}
                  />
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold sm:text-xl">
                    <span className="sr-only">{g.stepLabel(i + 1)} — </span>
                    {content.title}
                  </h2>
                  <p className="mt-2 text-secondary">{content.text}</p>
                  {note && (
                    <p className="mt-3 rounded-xl bg-light-bg p-3 text-sm font-medium">
                      {note}
                    </p>
                  )}
                  {step.key === "boiteAClef" && (
                    <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                      {g.keyBoxSecurity}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">{g.manualTitle}</h2>

        <h3 className="mt-6 text-lg font-semibold">{g.panelTitle}</h3>
        <p className="mt-3 text-secondary">{g.panelIntro}</p>

        {panelPhoto && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-light-bg">
            <Image
              src={panelPhoto.src}
              alt={g.panelTitle}
              width={panelPhoto.width}
              height={panelPhoto.height}
              className="h-auto w-full"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
        )}

        <ul className="mt-5 space-y-3">
          {PANEL_MARKERS.map((marker) => (
            <li key={marker.key} className="flex gap-3 text-sm">
              {/* Pastille de la couleur du cadre dessiné sur la photo. */}
              <span
                className="mt-1.5 h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: marker.color }}
                aria-hidden
              />
              <span>{g.panelMarkers[marker.key]}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-2xl bg-light-bg p-4 text-sm text-secondary">
          {g.panelHotWaterNote}
        </p>

        <h3 className="mt-10 text-lg font-semibold">{g.radiatorSwitchTitle}</h3>
        <p className="mt-3 text-secondary">{g.radiatorSwitchText}</p>

        <h3 className="mt-10 text-lg font-semibold">{g.manualsTitle}</h3>
        <p className="mt-3 text-secondary">{g.manualsText}</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">{g.checkoutTitle}</h2>
        <p className="mt-3 text-secondary">{g.checkoutIntro}</p>

        <ul className="mt-5 space-y-3">
          {g.checkoutItems.map((item) => (
            <li key={item} className="flex gap-3 text-sm">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {g.checkoutKeysNote}
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">{g.contactTitle}</h2>
        <p className="mt-3 text-secondary">{g.contactIntro}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { href: PROPERTY.contact.whatsapp, label: g.whatsappCta, external: true },
            { href: `tel:${PROPERTY.contact.phone}`, label: g.phoneCta, external: false },
            { href: `mailto:${PROPERTY.contact.email}`, label: g.emailCta, external: false },
          ].map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              {...(cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex min-h-12 items-center justify-center rounded-full border border-primary px-4 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {cta.label}
            </a>
          ))}
        </div>

        <h3 className="mt-10 mb-3 font-semibold">{g.emergencyTitle}</h3>
        <ul className="divide-y divide-border border-y border-border">
          {EMERGENCY_NUMBERS.map((entry) => (
            <li key={entry.key}>
              {/* Ligne entière cliquable : composer un numéro d'urgence ne doit
                  pas demander de viser trois chiffres sur un écran de téléphone. */}
              <a
                href={`tel:${entry.number}`}
                className="flex min-h-14 items-center justify-between gap-4 text-sm"
              >
                <span className="text-secondary">
                  {g.emergencyLabels[entry.key]}
                </span>
                <span className="text-lg font-semibold tabular-nums">
                  {entry.number}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-14 text-center text-lg font-semibold">{g.closing}</p>

      <p className="mt-6 text-center text-sm">
        <Link href={`/${locale}`} className="text-secondary underline underline-offset-2 hover:text-foreground">
          {t.common.backHome}
        </Link>
      </p>
    </div>
  );
}
