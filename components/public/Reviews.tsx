"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  REVIEW_SUMMARY,
  getReviews,
  formatReviewDate,
  type Review,
} from "@/lib/reviews";
import { PROPERTY } from "@/lib/property";
import type { Season } from "@/lib/seasons";
import { Section, SectionTitle } from "./Section";

/** Avis visibles avant dépliage. */
const PREVIEW_COUNT = 6;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i <= rating ? "text-accent" : "text-border"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review, locale }: { review: Review; locale: string }) {
  return (
    <li className="rounded-2xl border border-border bg-white p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent-dark">
          {review.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-semibold">{review.name}</p>
          <p className="text-xs text-secondary">
            {formatReviewDate(review.date, locale)}
          </p>
        </div>
      </div>
      <Stars rating={review.rating} />
      <p className="mt-3 text-sm leading-relaxed text-secondary">{review.text}</p>
    </li>
  );
}

export default function Reviews({ season }: { season?: Season }) {
  const { locale, t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const reviews = getReviews(season);
  if (reviews.length === 0) return null;

  const visible = expanded ? reviews : reviews.slice(0, PREVIEW_COUNT);
  const { rating, count, guestFavourite, categories } = REVIEW_SUMMARY;

  const categoryRows = [
    { label: t.reviews.categories.cleanliness, value: categories.cleanliness },
    { label: t.reviews.categories.accuracy, value: categories.accuracy },
    { label: t.reviews.categories.checkIn, value: categories.checkIn },
    { label: t.reviews.categories.communication, value: categories.communication },
    { label: t.reviews.categories.location, value: categories.location },
    { label: t.reviews.categories.value, value: categories.value },
  ];

  return (
    <Section id="avis">
      <SectionTitle title={t.reviews.title} subtitle={t.reviews.subtitle(count)} />

      <div className="mb-10 grid gap-8 rounded-3xl border border-border bg-light-bg p-6 sm:p-8 md:grid-cols-3">
        <div className="flex flex-col justify-center">
          <p className="text-5xl font-bold text-primary">
            {rating.toLocaleString(locale, { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-1 text-sm text-secondary">{t.reviews.outOf}</p>
          {guestFavourite && (
            <>
              <p className="mt-4 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                {t.reviews.guestFavourite}
              </p>
              <p className="mt-2 text-xs text-secondary">
                {t.reviews.guestFavouriteNote}
              </p>
            </>
          )}
        </div>

        <dl className="grid gap-3 md:col-span-2 sm:grid-cols-2">
          {categoryRows.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <dt className="w-32 shrink-0 text-xs text-secondary">{row.label}</dt>
              <dd className="flex flex-1 items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{ width: `${(row.value / 5) * 100}%` }}
                  />
                </span>
                <span className="w-8 text-right text-xs font-semibold">
                  {row.value.toLocaleString(locale, { minimumFractionDigits: 1 })}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {visible.map((review) => (
          <ReviewCard
            key={`${review.name}-${review.date}`}
            review={review}
            locale={locale}
          />
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        {reviews.length > PREVIEW_COUNT && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-foreground px-5 py-2 text-sm font-semibold transition-colors hover:bg-light-bg"
          >
            {expanded ? t.reviews.showLess : t.reviews.showAll(reviews.length)}
          </button>
        )}
        <a
          href={PROPERTY.links.airbnb}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-2 text-sm font-semibold text-accent underline underline-offset-2 hover:text-accent-dark"
        >
          {t.reviews.seeOnAirbnb}
        </a>
      </div>
    </Section>
  );
}
