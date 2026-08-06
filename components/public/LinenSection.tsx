"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { PROPERTY } from "@/lib/property";
import type { Photo } from "@/lib/photos";
import { Section, SectionTitle } from "./Section";

/**
 * Le kit linge.
 *
 * L'ambiguïté à lever est toujours la même : « linge en option » laisse croire
 * qu'on dormira sans rien. Les couettes et les oreillers sont là, seuls les draps
 * et les serviettes se paient. La comparaison photo dit en une seconde ce que
 * trois phrases peinent à expliquer.
 */
export default function LinenSection({
  photos,
}: {
  photos: { with?: Photo; without?: Photo };
}) {
  const { t } = useTranslation();
  const price = PROPERTY.linen.pricePerPerson;

  const pairs = [
    { photo: photos.with, caption: t.linen.withLinen },
    { photo: photos.without, caption: t.linen.withoutLinen },
  ].filter((p) => p.photo);

  return (
    <Section id="linge">
      <SectionTitle title={t.linen.title} subtitle={t.linen.subtitle(price)} />

      {pairs.length > 0 && (
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {pairs.map(({ photo, caption }) => (
            <figure
              key={photo!.src}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="relative w-full" style={{ aspectRatio: photo!.ratio }}>
                <Image
                  src={photo!.src}
                  alt={caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-center text-sm font-semibold">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="font-semibold">{t.linen.providedTitle}</h3>
          <p className="mt-2 text-sm text-secondary">{t.linen.providedIntro}</p>
          <ul className="mt-4 space-y-2 text-sm text-secondary">
            {PROPERTY.linen.inventory.map((item) => (
              <li key={item.key} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-semibold text-foreground">
                    {item.count}
                  </strong>{" "}
                  {t.linen.itemLabel(item.key, item.count)}
                  <span className="text-secondary"> — {item.size} cm</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-accent-soft p-6">
          <h3 className="font-semibold">{t.linen.optionTitle}</h3>
          <p className="mt-2 text-sm text-secondary">
            {t.linen.optionIntro(price)}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-secondary">
            {t.linen.optionItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-secondary">{t.linen.byoNote}</p>
    </Section>
  );
}
