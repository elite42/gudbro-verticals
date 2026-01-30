'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice, convertCurrency } from '@shared/payment';
import type { Tour } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD V2

   Redesigned based on travel app best practices (Klook, GetYourGuide, Viator).
   Features:
   - Prominent rating with stars
   - Urgency/scarcity indicators
   - Trust badges (Instant confirmation, Free cancellation)
   - Clear pricing with original price strikethrough for discounts
   - Wishlist heart button
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardV2Props {
  tour: Tour;
  currency: string;
  className?: string;
  onWishlist?: (tourId: string) => void;
  isWishlisted?: boolean;
}

export function TourCardV2({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardV2Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHearted, setIsHearted] = useState(isWishlisted);

  // Price calculation
  const getPrice = () => {
    if (currency === 'VND') {
      return formatPrice(tour.price_vnd, 'VND');
    }
    const converted = convertCurrency(tour.price_vnd, 'VND', currency);
    return formatPrice(Math.round(converted), currency);
  };

  // Simulate some dynamic data
  const spotsLeft = Math.floor(Math.random() * 5) + 1;
  const hasDiscount = tour.featured;
  const originalPrice = hasDiscount ? Math.round(tour.price_vnd * 1.2) : null;

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
        'shadow-sm transition-all duration-300 hover:shadow-xl',
        'border border-gray-100',
        className
      )}
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            'group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Skeleton */}
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges row */}
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
          {/* Left badges */}
          <div className="flex flex-col gap-1.5">
            {tour.featured && (
              <span className="bg-accent inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-white">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Best Seller
              </span>
            )}
            {/* Free cancellation badge */}
            <span className="text-success-foreground inline-flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-xs font-medium backdrop-blur-sm">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Free cancellation
            </span>
          </div>

          {/* Wishlist button */}
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

        {/* Bottom info on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          {/* Duration & distance */}
          <div className="flex items-center gap-3 text-sm font-medium text-white">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              {tour.duration}
            </span>
          </div>

          {/* Urgency indicator */}
          {spotsLeft <= 5 && (
            <span className="bg-error animate-pulse rounded-lg px-2 py-1 text-xs font-semibold text-white">
              Only {spotsLeft} left!
            </span>
          )}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4">
        {/* Title */}
        <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors">
          {tour.name}
        </h3>

        {/* Rating row */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {/* Stars */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    'h-4 w-4',
                    star <= Math.floor(tour.rating) ? 'text-accent' : 'text-gray-200'
                  )}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">{tour.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({tour.review_count.toLocaleString()} reviews)
          </span>
        </div>

        {/* Social proof */}
        <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <span>{tour.booking_count.toLocaleString()}+ booked this week</span>
        </div>

        {/* Divider */}
        <div className="mb-3 h-px bg-gray-100" />

        {/* Price section */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(convertCurrency(originalPrice, 'VND', currency), currency)}
                </span>
              )}
              <span className="text-xl font-bold text-gray-900">{getPrice()}</span>
            </div>
            <span className="text-xs text-gray-500">per {tour.price_per}</span>
          </div>

          {/* Instant confirm badge */}
          <div className="text-success flex items-center gap-1 text-xs font-medium">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
            </svg>
            Instant confirm
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────────────── */

export function TourCardV2Skeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="aspect-[4/3] animate-pulse bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-px bg-gray-100" />
        <div className="flex justify-between">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
