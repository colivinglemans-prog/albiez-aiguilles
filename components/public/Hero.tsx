"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function Hero({
  title,
  subtitle,
  tagline,
  image,
}: {
  title: string;
  subtitle: string;
  /** Sur-titre court (ex. dates d'ouverture du domaine). */
  tagline?: string;
  image?: string;
}) {
  const { locale, t } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            priority
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/35 to-black/60" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary to-accent-dark" />
      )}

      <div className="mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-center px-6 py-20 text-white">
        {tagline && (
          <p className="mb-4 inline-flex w-fit rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
            {tagline}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}#reserver`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            {t.header.book}
          </Link>
          <Link
            href={`/${locale}#appartement`}
            className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t.header.apartment}
          </Link>
        </div>
      </div>
    </section>
  );
}
