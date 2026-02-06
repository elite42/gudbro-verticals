'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice, convertCurrency } from '@shared/payment';
import type { Tour } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD COMPACT

   Small, data-dense card for lists and search results.
   Horizontal layout with thumbnail on left, info on right.
   Optimized for quick scanning of many options.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardCompactProps {
  tour: Tour;
  currency: string;
  className?: string;
  onWishlist?: (tourId: string) => void;
  isWishlisted?: boolean;
}

export function TourCardCompact({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardCompactProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHearted, setIsHearted] = useState(isWishlisted);

  const getPrice = () => {
    if (currency === 'VND') {
      return formatPrice(tour.price_vnd, 'VND');
    }
    const converted = convertCurrency(tour.price_vnd, 'VND', currency);
    return formatPrice(Math.round(converted), currency);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHearted(!isHearted);
    onWishlist?.(tour.id);
  };

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className={cn(
        'group flex gap-3 overflow-hidden rounded-xl bg-white',
        'border border-gray-100 p-2',
        'hover:border-primary/20 transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      {/* THUMBNAIL - Square, compact */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="96px"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
        )}

        {/* Wishlist button - subtle overlay */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute right-1 top-1 rounded-full p-1.5',
            'opacity-0 transition-all duration-200 group-hover:opacity-100',
            isHearted
              ? 'bg-red-500 text-white opacity-100'
              : 'bg-black/40 text-white hover:bg-red-500'
          )}
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill={isHearted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Featured indicator - small dot */}
        {tour.featured && (
          <div className="absolute bottom-1 left-1 h-2 w-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
        )}
      </div>

      {/* CONTENT - Dense info layout */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        {/* Top section */}
        <div>
          {/* Title */}
          <h3 className="group-hover:text-primary line-clamp-1 text-sm font-semibold text-gray-900 transition-colors">
            {tour.name}
          </h3>

          {/* Meta row: Rating + Duration */}
          <div className="mt-1 flex items-center gap-2">
            {/* Star + Rating */}
            <div className="flex items-center gap-0.5">
              <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">{tour.rating}</span>
              <span className="text-xs text-gray-400">({tour.review_count})</span>
            </div>

            {/* Dot separator */}
            <span className="h-0.5 w-0.5 rounded-full bg-gray-300" />

            {/* Duration */}
            <span className="text-xs text-gray-500">{tour.duration}</span>
          </div>
        </div>

        {/* Bottom section: Price + Badge */}
        <div className="mt-auto flex items-end justify-between">
          {/* Price */}
          <div>
            <span className="text-base font-bold text-gray-900">{getPrice()}</span>
            <span className="ml-0.5 text-xs text-gray-400">/{tour.price_per}</span>
          </div>

          {/* Quick badge */}
          <span className="inline-flex items-center gap-0.5 rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
            <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Instant
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────────────── */

export function TourCardCompactSkeleton() {
  return (
    <div className="flex gap-3 rounded-xl border border-gray-100 bg-white p-2">
      <div className="h-24 w-24 flex-shrink-0 animate-pulse rounded-lg bg-gray-200" />
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex items-end justify-between">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
