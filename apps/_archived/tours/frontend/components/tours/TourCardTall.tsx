'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice, convertCurrency } from '@shared/payment';
import type { Tour } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD TALL

   Vertical/portrait card for Pinterest-style grids and carousels.
   Dramatic vertical imagery with bottom content overlay.
   Creates visual interest in masonry layouts and discovery feeds.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardTallProps {
  tour: Tour;
  currency: string;
  className?: string;
  onWishlist?: (tourId: string) => void;
  isWishlisted?: boolean;
}

export function TourCardTall({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardTallProps) {
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

  // Dynamic height for visual interest (like Pinterest)
  const spotsLeft = Math.floor(Math.random() * 6) + 1;

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-2xl',
        'bg-white shadow-sm hover:shadow-xl',
        'transition-all duration-500',
        'hover:-translate-y-1',
        className
      )}
    >
      {/* IMAGE - Tall portrait aspect */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-all duration-700',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-100 to-gray-200" />
        )}

        {/* Dramatic bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

        {/* Top left badges - stacked vertically */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {tour.featured && (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          )}
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </span>
        </div>

        {/* Top right: Wishlist */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute right-3 top-3 rounded-full p-2.5',
            'backdrop-blur-md transition-all duration-300',
            'hover:scale-110',
            isHearted
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
              : 'bg-white/20 text-white hover:bg-white/40'
          )}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill={isHearted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Urgency badge - floating */}
        {spotsLeft <= 3 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="animate-pulse rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              Only {spotsLeft} left!
            </span>
          </div>
        )}

        {/* Bottom content - overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Duration pill */}
          <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
            {tour.duration}
          </span>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-white drop-shadow-lg">
            {tour.name}
          </h3>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    'h-3.5 w-3.5',
                    star <= Math.floor(tour.rating) ? 'text-amber-400' : 'text-white/30'
                  )}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-white/80">
              {tour.rating} ({tour.review_count})
            </span>
          </div>

          {/* Price bar */}
          <div className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md">
            <div>
              <div className="text-lg font-bold text-white">{getPrice()}</div>
              <div className="text-[10px] uppercase tracking-wide text-white/60">
                per {tour.price_per}
              </div>
            </div>
            <div className="group-hover:bg-primary flex h-9 w-9 items-center justify-center rounded-full bg-white transition-colors group-hover:text-white">
              <svg
                className="h-5 w-5 text-gray-900 group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────────────── */

export function TourCardTallSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-200">
      <div className="relative aspect-[3/4]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300" />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-white/40" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-white/40" />
        </div>
        <div className="absolute right-3 top-3 h-10 w-10 animate-pulse rounded-full bg-white/40" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-2 h-5 w-16 animate-pulse rounded-full bg-white/30" />
          <div className="mb-1 h-5 w-full animate-pulse rounded bg-white/30" />
          <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-white/30" />
          <div className="mb-3 h-4 w-1/2 animate-pulse rounded bg-white/30" />
          <div className="h-14 animate-pulse rounded-xl bg-white/30" />
        </div>
      </div>
    </div>
  );
}
