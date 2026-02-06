'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice, convertCurrency } from '@shared/payment';
import type { Tour } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD MINI

   Tiny, elegant card for "You might also like" sections and inline suggestions.
   Whisper-quiet design that doesn't compete with main content.
   Horizontal scroll-friendly with minimal footprint.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardMiniProps {
  tour: Tour;
  currency: string;
  className?: string;
  onClick?: () => void;
}

export function TourCardMini({ tour, currency, className, onClick }: TourCardMiniProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getPrice = () => {
    if (currency === 'VND') {
      return formatPrice(tour.price_vnd, 'VND');
    }
    const converted = convertCurrency(tour.price_vnd, 'VND', currency);
    return formatPrice(Math.round(converted), currency);
  };

  return (
    <Link
      href={`/tour/${tour.slug}`}
      onClick={onClick}
      className={cn(
        'group block w-36 flex-shrink-0',
        'transition-all duration-300',
        'hover:scale-[1.02]',
        className
      )}
    >
      {/* Thumbnail - small square with rounded corners */}
      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-xl shadow-sm transition-shadow group-hover:shadow-md">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="144px"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
        )}

        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Featured indicator - tiny badge */}
        {tour.featured && (
          <div className="absolute left-2 top-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 shadow-sm">
              <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </div>
        )}

        {/* Rating overlay - bottom right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-0.5 rounded-full bg-black/50 px-1.5 py-0.5 backdrop-blur-sm">
          <svg className="h-3 w-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[10px] font-medium text-white">{tour.rating}</span>
        </div>
      </div>

      {/* Content - minimal */}
      <div className="px-0.5">
        {/* Title - 2 lines max */}
        <h4 className="group-hover:text-primary mb-1 line-clamp-2 text-xs font-medium leading-tight text-gray-900 transition-colors">
          {tour.name}
        </h4>

        {/* Price + Duration in one line */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">{getPrice()}</span>
          <span className="text-[10px] text-gray-400">{tour.duration}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MINI CARD ROW - Horizontal scroll container
   ───────────────────────────────────────────────────────────────────── */

interface TourCardMiniRowProps {
  tours: Tour[];
  currency: string;
  title?: string;
  className?: string;
}

export function TourCardMiniRow({
  tours,
  currency,
  title = 'You might also like',
  className,
}: TourCardMiniRowProps) {
  return (
    <div className={cn('', className)}>
      {/* Section header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button className="text-primary text-xs font-medium hover:underline">See all</button>
      </div>

      {/* Horizontal scroll */}
      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {tours.map((tour) => (
          <TourCardMini key={tour.id} tour={tour} currency={currency} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────────────── */

export function TourCardMiniSkeleton() {
  return (
    <div className="w-36 flex-shrink-0">
      <div className="mb-2 aspect-square w-full animate-pulse rounded-xl bg-gray-200" />
      <div className="px-0.5">
        <div className="mb-1 h-3 w-full animate-pulse rounded bg-gray-200" />
        <div className="mb-1 h-3 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="flex justify-between">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function TourCardMiniRowSkeleton() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {[1, 2, 3, 4].map((i) => (
          <TourCardMiniSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
