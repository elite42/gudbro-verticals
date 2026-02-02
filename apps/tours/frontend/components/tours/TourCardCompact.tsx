'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatPrice, convertCurrency } from '@shared/payment'
import type { Tour } from '@/lib/types'

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD COMPACT

   Small, data-dense card for lists and search results.
   Horizontal layout with thumbnail on left, info on right.
   Optimized for quick scanning of many options.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardCompactProps {
  tour: Tour
  currency: string
  className?: string
  onWishlist?: (tourId: string) => void
  isWishlisted?: boolean
}

export function TourCardCompact({
  tour,
  currency,
  className,
  onWishlist,
  isWishlisted = false,
}: TourCardCompactProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHearted, setIsHearted] = useState(isWishlisted)

  const getPrice = () => {
    if (currency === 'VND') {
      return formatPrice(tour.price_vnd, 'VND')
    }
    const converted = convertCurrency(tour.price_vnd, 'VND', currency)
    return formatPrice(Math.round(converted), currency)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHearted(!isHearted)
    onWishlist?.(tour.id)
  }

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className={cn(
        'group flex gap-3 bg-white rounded-xl overflow-hidden',
        'border border-gray-100 p-2',
        'hover:shadow-lg hover:border-primary/20 transition-all duration-300',
        className
      )}
    >
      {/* THUMBNAIL - Square, compact */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Wishlist button - subtle overlay */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-1 right-1 p-1.5 rounded-full',
            'transition-all duration-200 opacity-0 group-hover:opacity-100',
            isHearted
              ? 'bg-red-500 text-white opacity-100'
              : 'bg-black/40 text-white hover:bg-red-500'
          )}
        >
          <svg
            className="w-3.5 h-3.5"
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
          <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
        )}
      </div>

      {/* CONTENT - Dense info layout */}
      <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
        {/* Top section */}
        <div>
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
            {tour.name}
          </h3>

          {/* Meta row: Rating + Duration */}
          <div className="flex items-center gap-2 mt-1">
            {/* Star + Rating */}
            <div className="flex items-center gap-0.5">
              <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">{tour.rating}</span>
              <span className="text-xs text-gray-400">({tour.review_count})</span>
            </div>

            {/* Dot separator */}
            <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />

            {/* Duration */}
            <span className="text-xs text-gray-500">{tour.duration}</span>
          </div>
        </div>

        {/* Bottom section: Price + Badge */}
        <div className="flex items-end justify-between mt-auto">
          {/* Price */}
          <div>
            <span className="text-base font-bold text-gray-900">{getPrice()}</span>
            <span className="text-xs text-gray-400 ml-0.5">/{tour.price_per}</span>
          </div>

          {/* Quick badge */}
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-medium">
            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Instant
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────────────── */

export function TourCardCompactSkeleton() {
  return (
    <div className="flex gap-3 bg-white rounded-xl border border-gray-100 p-2">
      <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-gray-200 animate-pulse" />
      <div className="flex-1 py-0.5 flex flex-col justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2 mt-2" />
        </div>
        <div className="flex justify-between items-end">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
        </div>
      </div>
    </div>
  )
}
