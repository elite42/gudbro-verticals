'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge, CategoryBadge } from '@/components/ui/Badge'
import { formatPrice, convertCurrency } from '@shared/payment'
import type { Tour } from '@/lib/types'

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR CARD COMPONENT - Compact Design
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourCardProps {
  tour: Tour
  currency: string
  className?: string
}

export function TourCard({ tour, currency, className }: TourCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Get price in selected currency
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
      className={cn(
        'group block bg-white rounded-xl overflow-hidden',
        'border border-border shadow-sm',
        'transition-all duration-200',
        'hover:shadow-md hover:border-primary/30',
        'active:scale-[0.99]',
        className
      )}
    >
      {/* IMAGE - More compact */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {/* Image */}
        <Image
          src={tour.images[0] || '/placeholder-tour.jpg'}
          alt={tour.name}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            'group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={tour.category} />
        </div>

        {/* Featured badge */}
        {tour.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent" size="sm" icon={<span>⭐</span>}>
              Featured
            </Badge>
          </div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Duration & distance overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-white text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
            {tour.duration}
          </span>
          {tour.distance && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {tour.distance}
            </span>
          )}
        </div>
      </div>

      {/* CONTENT - Compact */}
      <div className="p-3">
        {/* Title + Rating inline */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {tour.name}
          </h3>
          {tour.review_count > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium whitespace-nowrap">
              <span className="text-amber-500">★</span>
              <span>{tour.rating}</span>
              <span className="text-foreground-muted">({tour.review_count})</span>
            </span>
          )}
        </div>

        {/* Price section - more prominent */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-primary">
              {getPrice()}
            </span>
            <span className="text-xs text-foreground-muted">
              /{tour.price_per === 'person' ? 'person' : tour.price_per}
            </span>
          </div>
          <span className="text-xs text-foreground-muted">
            {tour.min_people}-{tour.max_people} pax
          </span>
        </div>
      </div>

    </Link>
  )
}

export function TourCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-border">
      <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="flex justify-between">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
        </div>
      </div>
    </div>
  )
}
