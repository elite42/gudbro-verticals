'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice, convertCurrency } from '@shared/payment';
import type { Tour } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD WIDE

   Horizontal banner-style card for featured sections and hero areas.
   Cinematic aspect ratio with immersive imagery and overlay content.
   Creates visual impact at the top of feeds or in spotlight sections.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardWideProps {
  tour: Tour;
  currency: string;
  className?: string;
  onWishlist?: (tourId: string) => void;
  isWishlisted?: boolean;
  variant?: 'default' | 'hero';
}

export function TourCardWide({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
  variant = 'default',
}: TourCardWideProps) {
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

  const isHero = variant === 'hero';

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className={cn(
        'group relative block overflow-hidden',
        isHero ? 'rounded-3xl' : 'rounded-2xl',
        'shadow-lg transition-all duration-500 hover:shadow-2xl',
        className
      )}
    >
      {/* IMAGE - Cinematic aspect ratio */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          isHero ? 'aspect-[21/9]' : 'aspect-[16/7]'
        )}
      >
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-all duration-700',
            'group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="100vw"
          priority={isHero}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
        )}

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Decorative light streak */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* CONTENT OVERLAY */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Top row: Badges + Wishlist */}
        <div className="flex items-start justify-between">
          {/* Left badges */}
          <div className="flex flex-wrap gap-2">
            {tour.featured && (
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5',
                  'bg-gradient-to-r from-amber-500 to-orange-500',
                  'text-xs font-semibold text-white shadow-lg shadow-amber-500/30',
                  isHero && 'px-4 py-2 text-sm'
                )}
              >
                <svg
                  className={cn('h-3.5 w-3.5', isHero && 'h-4 w-4')}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Editor&apos;s Pick
              </span>
            )}
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5',
                'bg-white/95 text-xs font-medium text-green-700 backdrop-blur-sm',
                isHero && 'px-4 py-2 text-sm'
              )}
            >
              <svg
                className={cn('h-3.5 w-3.5', isHero && 'h-4 w-4')}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Free cancellation
            </span>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={cn(
              'rounded-full p-2.5 backdrop-blur-md transition-all duration-300',
              'hover:scale-110',
              isHearted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'
            )}
          >
            <svg
              className={cn('h-5 w-5', isHero && 'h-6 w-6')}
              viewBox="0 0 24 24"
              fill={isHearted ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

        {/* Bottom content */}
        <div className="flex items-end justify-between gap-4">
          {/* Left: Title + Meta */}
          <div className="min-w-0 flex-1">
            {/* Category tag */}
            <span className="mb-1 inline-block text-xs font-medium uppercase tracking-wider text-white/70">
              {tour.category.replace('_', ' ')}
            </span>

            {/* Title */}
            <h3
              className={cn(
                'line-clamp-2 font-semibold text-white',
                'drop-shadow-lg',
                isHero ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
              )}
            >
              {tour.name}
            </h3>

            {/* Meta row */}
            <div className="mt-2 flex items-center gap-3 text-white/90">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={cn(
                        isHero ? 'h-4 w-4' : 'h-3.5 w-3.5',
                        star <= Math.floor(tour.rating) ? 'text-amber-400' : 'text-white/30'
                      )}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className={cn('font-medium', isHero ? 'text-sm' : 'text-xs')}>
                  {tour.rating}
                </span>
                <span className={cn('text-white/60', isHero ? 'text-sm' : 'text-xs')}>
                  ({tour.review_count.toLocaleString()})
                </span>
              </div>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              {/* Duration */}
              <span className={cn('flex items-center gap-1', isHero ? 'text-sm' : 'text-xs')}>
                <svg
                  className={cn(isHero ? 'h-4 w-4' : 'h-3.5 w-3.5')}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                </svg>
                {tour.duration}
              </span>
            </div>
          </div>

          {/* Right: Price card */}
          <div
            className={cn(
              'flex-shrink-0 text-right',
              'rounded-xl bg-white/10 p-3 backdrop-blur-md',
              'border border-white/20',
              isHero && 'rounded-2xl p-4'
            )}
          >
            <div className={cn('font-bold text-white', isHero ? 'text-2xl' : 'text-xl')}>
              {getPrice()}
            </div>
            <div className={cn('text-white/70', isHero ? 'text-sm' : 'text-xs')}>
              per {tour.price_per}
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

export function TourCardWideSkeleton({ hero = false }: { hero?: boolean }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-200',
        hero ? 'aspect-[21/9] rounded-3xl' : 'aspect-[16/7] rounded-2xl'
      )}
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex justify-between">
          <div className="h-7 w-28 animate-pulse rounded-full bg-white/20" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-white/20" />
        </div>
        <div>
          <div className="mb-2 h-4 w-20 animate-pulse rounded bg-white/20" />
          <div className="mb-2 h-7 w-3/4 animate-pulse rounded bg-white/20" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-white/20" />
        </div>
      </div>
    </div>
  );
}
