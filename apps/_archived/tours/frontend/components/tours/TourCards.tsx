'use client';

import { formatPrice, convertCurrency } from '@shared/payment';
import type { Tour } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD WRAPPERS

   Adapts shared ProductCard components to Tour data.
   These are thin wrappers that transform Tour -> ProductCardProps.
   ═══════════════════════════════════════════════════════════════════════════ */

// We'll import the shared components when the path alias is set up
// For now, inline the clean versions

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TourCardBaseProps {
  tour: Tour;
  currency: string;
  className?: string;
  onWishlist?: (tourId: string) => void;
  isWishlisted?: boolean;
}

// Helper to format tour price
function getTourPrice(tour: Tour, currency: string): string {
  if (currency === 'VND') {
    return formatPrice(tour.price_vnd, 'VND');
  }
  const converted = convertCurrency(tour.price_vnd, 'VND', currency);
  return formatPrice(Math.round(converted), currency);
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD HERO - Wide cinematic banner
   ═══════════════════════════════════════════════════════════════════════════ */

export function TourCardHero({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardBaseProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHearted, setIsHearted] = useState(isWishlisted);

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
        'group relative block overflow-hidden rounded-2xl',
        'shadow-lg transition-all duration-500 hover:shadow-2xl',
        className
      )}
    >
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-all duration-700 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="100vw"
          priority
        />
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Top: Featured star + Wishlist */}
        <div className="flex items-start justify-between">
          {tour.featured ? (
            <span className="from-accent to-primary inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={handleWishlist}
            className={cn(
              'rounded-full p-2.5 backdrop-blur-md transition-all duration-300 hover:scale-110',
              isHearted ? 'bg-error text-white' : 'bg-white/20 text-white hover:bg-white/40'
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
        </div>

        {/* Bottom: Title + Price */}
        <div className="flex items-end justify-between gap-4">
          <h3 className="line-clamp-2 text-xl font-semibold text-white drop-shadow-lg">
            {tour.name}
          </h3>
          <div className="bg-white/15 flex-shrink-0 rounded-xl border border-white/20 px-4 py-2 backdrop-blur-md">
            <div className="text-xl font-bold text-white">{getTourPrice(tour, currency)}</div>
            <div className="text-[10px] uppercase tracking-wide text-white/70">
              per {tour.price_per}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD TALL - Portrait Pinterest style
   ═══════════════════════════════════════════════════════════════════════════ */

export function TourCardTall({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardBaseProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHearted, setIsHearted] = useState(isWishlisted);

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
        'group relative block overflow-hidden rounded-2xl',
        'shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-all duration-700 group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
        {tour.featured ? (
          <span className="from-accent to-primary inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
        ) : (
          <div />
        )}

        <button
          onClick={handleWishlist}
          className={cn(
            'rounded-full p-2 backdrop-blur-md transition-all duration-300 hover:scale-110',
            isHearted
              ? 'bg-error shadow-error/50 text-white shadow-lg'
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
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white drop-shadow-lg">
          {tour.name}
        </h3>
        <div className="bg-white/15 flex items-center justify-between rounded-xl border border-white/20 p-2.5 backdrop-blur-md">
          <div>
            <div className="text-lg font-bold text-white">{getTourPrice(tour, currency)}</div>
            <div className="text-[10px] uppercase tracking-wide text-white/60">
              per {tour.price_per}
            </div>
          </div>
          <div className="group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors">
            <svg
              className="h-4 w-4 text-gray-900 transition-colors group-hover:text-white"
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
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD STANDARD - Classic 4:3
   ═══════════════════════════════════════════════════════════════════════════ */

export function TourCardStandard({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardBaseProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHearted, setIsHearted] = useState(isWishlisted);

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
        'group block overflow-hidden rounded-2xl bg-white',
        'border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-transform duration-500 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top: Featured star + Wishlist */}
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
          {tour.featured ? (
            <span className="from-accent to-primary inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={handleWishlist}
            className={cn(
              'rounded-full p-2 backdrop-blur-sm transition-all duration-200',
              isHearted
                ? 'bg-error text-white'
                : 'hover:text-error bg-white/80 text-gray-600 hover:bg-white'
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
        </div>

        {/* Bottom: Price */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/15 rounded-xl border border-white/20 px-3 py-2 backdrop-blur-md">
            <div className="text-lg font-bold text-white">{getTourPrice(tour, currency)}</div>
            <div className="text-[10px] uppercase tracking-wide text-white/70">
              per {tour.price_per}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="group-hover:text-primary line-clamp-2 text-base font-semibold text-gray-900 transition-colors">
          {tour.name}
        </h3>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD COMPACT - Horizontal list
   ═══════════════════════════════════════════════════════════════════════════ */

export function TourCardCompact({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardBaseProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHearted, setIsHearted] = useState(isWishlisted);

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
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-all duration-500 group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="80px"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        {tour.featured && (
          <div className="bg-accent shadow-accent/50 absolute left-1.5 top-1.5 h-2 w-2 rounded-full shadow-lg" />
        )}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute right-1 top-1 rounded-full p-1 opacity-0 transition-all duration-200 group-hover:opacity-100',
            isHearted ? 'bg-error text-white opacity-100' : 'hover:bg-error bg-black/40 text-white'
          )}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill={isHearted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <h3 className="group-hover:text-primary line-clamp-2 text-sm font-semibold text-gray-900 transition-colors">
          {tour.name}
        </h3>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-base font-bold text-gray-900">
              {getTourPrice(tour, currency)}
            </span>
            <span className="ml-1 text-xs text-gray-400">/{tour.price_per}</span>
          </div>
          <svg
            className="group-hover:text-primary h-5 w-5 text-gray-300 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD MINI - Tiny suggestions
   ═══════════════════════════════════════════════════════════════════════════ */

export function TourCardMini({ tour, currency, className }: TourCardBaseProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className={cn(
        'group block w-32 flex-shrink-0',
        'transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-xl shadow-sm transition-shadow group-hover:shadow-md">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-transform duration-500 group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="128px"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {tour.featured && (
          <div className="absolute left-1.5 top-1.5">
            <span className="bg-accent inline-flex h-5 w-5 items-center justify-center rounded-full shadow-sm">
              <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </div>
        )}
        <div className="absolute bottom-1.5 right-1.5">
          <span className="rounded-md bg-black/50 px-1.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
            {getTourPrice(tour, currency)}
          </span>
        </div>
      </div>
      <h4 className="group-hover:text-primary line-clamp-2 px-0.5 text-xs font-medium leading-tight text-gray-900 transition-colors">
        {tour.name}
      </h4>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD BOTTLE - Tall vertical for bottle-like products (1:2)
   Perfect for wine tours, cocktail experiences, etc.
   ═══════════════════════════════════════════════════════════════════════════ */

export function TourCardBottle({ tour, currency, className }: TourCardBaseProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className={cn(
        'group block w-36 flex-shrink-0 snap-start',
        'transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      <div className="relative mb-2 aspect-[1/2] w-full overflow-hidden rounded-2xl shadow-md transition-shadow group-hover:shadow-xl">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-transform duration-500 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="112px"
        />
        {!imageLoaded && (
          <div className="via-gray-150 absolute inset-0 animate-pulse bg-gradient-to-b from-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {tour.featured && (
          <div className="absolute left-2 top-2">
            <span className="from-accent to-primary inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
              <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </div>
        )}

        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-white/15 rounded-lg border border-white/20 px-2 py-1.5 text-center backdrop-blur-md">
            <span className="text-sm font-bold text-white">{getTourPrice(tour, currency)}</span>
          </div>
        </div>
      </div>

      <h4 className="group-hover:text-primary line-clamp-2 px-0.5 text-center text-xs font-medium leading-tight text-gray-900 transition-colors">
        {tour.name}
      </h4>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOTTLE ROW - Horizontal scroll for tall cards (3 visible)
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourBottleRowProps {
  tours: Tour[];
  currency: string;
  title?: string;
  className?: string;
}

export function TourBottleRow({
  tours,
  currency,
  title = 'Featured Experiences',
  className,
}: TourBottleRowProps) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button className="text-primary text-xs font-medium hover:underline">See all</button>
      </div>
      <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {tours.map((tour) => (
          <TourCardBottle key={tour.id} tour={tour} currency={currency} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MINI ROW - Horizontal scroll container
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourMiniRowProps {
  tours: Tour[];
  currency: string;
  title?: string;
  className?: string;
}

export function TourMiniRow({
  tours,
  currency,
  title = 'You might also like',
  className,
}: TourMiniRowProps) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button className="text-primary text-xs font-medium hover:underline">See all</button>
      </div>
      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {tours.map((tour) => (
          <TourCardMini key={tour.id} tour={tour} currency={currency} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SKELETONS
   ═══════════════════════════════════════════════════════════════════════════ */

export function TourCardHeroSkeleton() {
  return <div className="aspect-[21/9] animate-pulse overflow-hidden rounded-2xl bg-gray-200" />;
}

export function TourCardTallSkeleton() {
  return <div className="aspect-[3/4] animate-pulse overflow-hidden rounded-2xl bg-gray-200" />;
}

export function TourCardStandardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="aspect-[4/3] animate-pulse bg-gray-200" />
      <div className="p-3">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function TourCardCompactSkeleton() {
  return (
    <div className="flex gap-3 rounded-xl border border-gray-100 bg-white p-2">
      <div className="h-20 w-20 flex-shrink-0 animate-pulse rounded-lg bg-gray-200" />
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function TourMiniRowSkeleton() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-32 flex-shrink-0">
            <div className="mb-2 aspect-square w-full animate-pulse rounded-xl bg-gray-200" />
            <div className="mx-0.5 mb-1 h-3 w-full animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TourCardBottleSkeleton() {
  return (
    <div className="w-36 flex-shrink-0 snap-start">
      <div className="mb-2 aspect-[1/2] w-full animate-pulse rounded-2xl bg-gray-200" />
      <div className="mx-0.5 mb-1 h-3 w-full animate-pulse rounded bg-gray-200" />
      <div className="mx-auto h-3 w-3/4 animate-pulse rounded bg-gray-200" />
    </div>
  );
}

export function TourBottleRowSkeleton() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {[1, 2, 3].map((i) => (
          <TourCardBottleSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
