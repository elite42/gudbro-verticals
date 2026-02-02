'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatPrice, convertCurrency } from '@shared/payment'
import type { Tour } from '@/lib/types'

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD MINI

   Tiny, elegant card for "You might also like" sections and inline suggestions.
   Whisper-quiet design that doesn't compete with main content.
   Horizontal scroll-friendly with minimal footprint.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardMiniProps {
  tour: Tour
  currency: string
  className?: string
  onClick?: () => void
}

export function TourCardMini({
  tour,
  currency,
  className,
  onClick,
}: TourCardMiniProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const getPrice = () => {
    if (currency === 'VND') {
      return formatPrice(tour.price_vnd, 'VND')
    }
    const converted = convertCurrency(tour.price_vnd, 'VND', currency)
    return formatPrice(Math.round(converted), currency)
  }

  return (
    <Link
      href={`/tour/${tour.slug}`}
      onClick={onClick}
      className={cn(
        'group flex-shrink-0 w-36 block',
        'transition-all duration-300',
        'hover:scale-[1.02]',
        className
      )}
    >
      {/* Thumbnail - small square with rounded corners */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 shadow-sm group-hover:shadow-md transition-shadow">
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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Featured indicator - tiny badge */}
        {tour.featured && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 shadow-sm">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </div>
        )}

        {/* Rating overlay - bottom right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm">
          <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[10px] text-white font-medium">{tour.rating}</span>
        </div>
      </div>

      {/* Content - minimal */}
      <div className="px-0.5">
        {/* Title - 2 lines max */}
        <h4 className="text-xs font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-tight">
          {tour.name}
        </h4>

        {/* Price + Duration in one line */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">{getPrice()}</span>
          <span className="text-[10px] text-gray-400">{tour.duration}</span>
        </div>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   MINI CARD ROW - Horizontal scroll container
   ───────────────────────────────────────────────────────────────────── */

interface TourCardMiniRowProps {
  tours: Tour[]
  currency: string
  title?: string
  className?: string
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
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button className="text-xs text-primary font-medium hover:underline">
          See all
        </button>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {tours.map((tour) => (
          <TourCardMini key={tour.id} tour={tour} currency={currency} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   SKELETON
   ───────────────────────────────────────────────────────────────────── */

export function TourCardMiniSkeleton() {
  return (
    <div className="flex-shrink-0 w-36">
      <div className="w-full aspect-square rounded-xl bg-gray-200 animate-pulse mb-2" />
      <div className="px-0.5">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-full mb-1" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4 mb-1" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-8" />
        </div>
      </div>
    </div>
  )
}

export function TourCardMiniRowSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-12" />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
        {[1, 2, 3, 4].map((i) => (
          <TourCardMiniSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
