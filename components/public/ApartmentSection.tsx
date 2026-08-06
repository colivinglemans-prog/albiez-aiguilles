"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { PROPERTY, TOTAL_BEDS } from "@/lib/property";
import type { Photo } from "@/lib/photos";
import { Section, SectionTitle } from "./Section";

/** Photos par couchage, résolues côté serveur depuis `SLEEPING_PHOTOS`. */
export interface SleepingPhotos {
  bedroom: Photo[];
  alcove: Photo[];
  living: Photo[];
}

export default function ApartmentSection({
  sleepingPhotos,
}: {
  sleepingPhotos: SleepingPhotos;
}) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const { capacity, beds } = PROPERTY;
  const double = beds.find((b) => b.type === "double")!;
  const bunk = beds.find((b) => b.type === "bunk")!;
  const trundle = beds.find((b) => b.type === "trundle-sofa")!;

  const rooms = [
    {
      name: t.property.bedrooms,
      description: t.property.bedDouble(double.width, double.length),
      photos: sleepingPhotos.bedroom,
      captions: [],
    },
    {
      name: t.property.alcove,
      description: t.property.bedBunk(bunk.count, bunk.width, bunk.length),
      photos: sleepingPhotos.alcove,
      captions: [],
    },
    {
      name: t.property.living,
      description: t.property.bedTrundle(
        trundle.count,
        trundle.width,
        trundle.length,
      ),
      photos: sleepingPhotos.living,
      captions: [],
    },
  ];

  const groups = expanded
    ? t.property.amenityGroups
    : t.property.amenityGroups.slice(0, 2);

  return (
    <Section id="appartement">
      <SectionTitle title={t.property.title} subtitle={t.property.subtitle} />

      <ul className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-secondary">
        {[
          t.property.areaCarrez(PROPERTY.areaM2),
          t.property.capacity(capacity.min, capacity.max),
          t.property.roomsSummary,
          t.property.bedsCount(TOTAL_BEDS),
          t.property.bathroomsCount(capacity.bathrooms),
        ].map((item, i) => (
          <li key={item} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden>·</span>}
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mb-4 text-lg font-semibold">{t.property.sleepingTitle}</h3>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.name}
            className="overflow-hidden rounded-2xl border border-border bg-white"
          >
            {room.photos.length > 0 && (
              <div
                className={`grid gap-px bg-border ${room.photos.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
              >
                {room.photos.map((photo, i) => (
                  <figure key={photo.src} className="bg-white">
                    {/* Le conteneur prend le format de la photo : rien n'est recadré. */}
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: photo.ratio }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt || room.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    {room.captions[i] && (
                      <figcaption className="px-3 py-2 text-center text-[11px] leading-tight text-secondary">
                        {room.captions[i]}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            <div className="p-5">
              <p className="font-semibold">{room.name}</p>
              <p className="mt-1 text-sm text-secondary">{room.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12 space-y-2 text-sm text-secondary">
        <p>{t.property.bathroom}</p>
        <p>{t.property.balcony}</p>
      </div>

      <h3 className="mb-4 text-lg font-semibold">{t.property.amenitiesTitle}</h3>
      <div className="grid gap-8 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 text-sm font-semibold text-accent-dark">
              {group.title}
            </p>
            <ul className="space-y-2 text-sm text-secondary">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {t.property.amenityGroups.length > 2 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-8 rounded-full border border-foreground px-5 py-2 text-sm font-semibold transition-colors hover:bg-light-bg"
        >
          {expanded ? t.property.showLess : t.property.showAll}
        </button>
      )}
    </Section>
  );
}
