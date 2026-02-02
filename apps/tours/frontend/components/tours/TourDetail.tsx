'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Badge, VerifiedBadge, CategoryBadge, RatingBadge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Tour, TourOperator } from '@/lib/types'

/* ═══════════════════════════════════════════════════════════════════════════
   TOUR DETAIL COMPONENT

   Full tour information page with gallery, details, inclusions, reviews.
   Mobile-first design with sticky booking CTA.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TourDetailProps {
  tour: Tour
  operator: TourOperator
  currency: string
  onBookNow: () => void
}

export function TourDetail({
  tour,
  operator,
  currency,
  onBookNow,
}: TourDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const formatPrice = (priceVnd: number, curr: string) => {
    const rates: Record<string, number> = {
      VND: 1, USD: 25000, EUR: 27000, KRW: 19, JPY: 170, AUD: 16000,
    }
    const converted = priceVnd / (rates[curr] || 25000)
    const symbols: Record<string, string> = {
      VND: '₫', USD: '$', EUR: '€', KRW: '₩', JPY: '¥', AUD: 'A$',
    }
    if (curr === 'VND') return `${priceVnd.toLocaleString()}${symbols[curr]}`
    return `${symbols[curr] || '$'}${converted.toFixed(0)}`
  }

  return (
    <div className="pb-24">
      {/* ─────────────────────────────────────────────────────────────────
          PHOTO GALLERY
         ───────────────────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Main Image */}
        <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={tour.images[currentImageIndex] || '/placeholder-tour.jpg'}
            alt={tour.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Thumbnails */}
        {tour.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {tour.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all',
                  index === currentImageIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                )}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image count badge */}
        <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full">
          {currentImageIndex + 1} / {tour.images.length}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          MAIN CONTENT
         ───────────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-6 max-w-3xl mx-auto">
        {/* Header */}
        <header className="py-6 border-b border-border">
          <div className="flex flex-wrap gap-2 mb-3">
            <CategoryBadge category={tour.category} />
            {tour.featured && (
              <Badge variant="accent" size="sm">Featured</Badge>
            )}
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            {tour.name}
          </h1>

          {tour.review_count > 0 && (
            <RatingBadge rating={tour.rating} reviewCount={tour.review_count} />
          )}
        </header>

        {/* Quick Info Bar */}
        <section className="py-4 flex flex-wrap gap-6 border-b border-border">
          <div className="flex items-center gap-2 text-foreground-muted">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
            <span className="font-medium">{tour.duration}</span>
          </div>

          {tour.distance && (
            <div className="flex items-center gap-2 text-foreground-muted">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="font-medium">{tour.distance}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-foreground-muted">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <span className="font-medium">
              {tour.min_people === tour.max_people
                ? `${tour.max_people} people`
                : `${tour.min_people}-${tour.max_people} people`}
            </span>
          </div>
        </section>

        {/* Price Display */}
        <section className="py-6 border-b border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-foreground">
              {formatPrice(tour.price_vnd, currency)}
            </span>
            <span className="text-lg text-foreground-muted">
              / {tour.price_per === 'person' ? 'person' : tour.price_per}
            </span>
          </div>
          {currency !== 'VND' && (
            <p className="text-sm text-foreground-subtle mt-1">
              ≈ {tour.price_vnd.toLocaleString()}₫
            </p>
          )}
        </section>

        {/* Description */}
        <section className="py-6 border-b border-border">
          <h2 className="font-display text-xl font-semibold mb-4">About This Tour</h2>
          <p className="text-foreground-muted leading-relaxed whitespace-pre-line">
            {tour.description}
          </p>
        </section>

        {/* Included / Excluded */}
        <section className="py-6 border-b border-border grid md:grid-cols-2 gap-6">
          {/* Included */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-secondary mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              What's Included
            </h3>
            <ul className="space-y-3">
              {tour.included.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground-muted">
                  <span className="text-secondary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-error mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
              Not Included
            </h3>
            <ul className="space-y-3">
              {tour.excluded.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground-muted">
                  <span className="text-error mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Departure Times */}
        {tour.departure_times && tour.departure_times.length > 0 && (
          <section className="py-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold mb-4">Departure Times</h2>
            <div className="flex flex-wrap gap-3">
              {tour.departure_times.map((time, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium"
                >
                  {time}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pickup Locations */}
        {tour.pickup_locations && tour.pickup_locations.length > 0 && (
          <section className="py-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold mb-4">Pickup Locations</h2>
            <div className="flex flex-wrap gap-2">
              {tour.pickup_locations.map((location, index) => (
                <Badge key={index} variant="outline">
                  {location}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Operator Info */}
        <section className="py-6 border-b border-border">
          <h2 className="font-display text-xl font-semibold mb-4">Your Operator</h2>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-background-elevated border border-border">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
              🧑‍✈️
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{operator.name}</h3>
                {operator.verified && <VerifiedBadge />}
              </div>
              <p className="text-sm text-foreground-muted">{operator.area}</p>
            </div>
          </div>

          {/* Contact buttons */}
          <div className="flex gap-3 mt-4">
            {operator.whatsapp && (
              <a
                href={`https://wa.me/${operator.whatsapp.replace(/\D/g, '')}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#22c55e] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            )}
            {operator.zalo && (
              <a
                href={`https://zalo.me/${operator.zalo}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0068FF] text-white font-medium hover:bg-[#0056d6] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg">💬</span>
                Zalo
              </a>
            )}
          </div>
        </section>

        {/* Reviews Preview */}
        {tour.review_count > 0 && (
          <section className="py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Reviews</h2>
              <button
                onClick={() => setShowAllReviews(true)}
                className="text-primary font-medium hover:underline"
              >
                See all {tour.review_count}
              </button>
            </div>

            {/* Sample reviews - would come from API */}
            <div className="space-y-4">
              {[
                { flag: '🇰🇷', name: 'Min-jun', rating: 5, text: 'Amazing experience! The views were incredible.' },
                { flag: '🇦🇺', name: 'Sarah', rating: 5, text: 'Minh was very friendly and knowledgeable.' },
                { flag: '🇯🇵', name: 'Yuki', rating: 4, text: 'Beautiful views, great value for money.' },
              ].map((review, index) => (
                <div key={index} className="p-4 rounded-xl bg-background-elevated border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{review.flag}</span>
                    <span className="font-medium">{review.name}</span>
                    <div className="flex gap-0.5 ml-auto">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={cn('w-4 h-4', i < review.rating ? 'text-amber-400' : 'text-gray-300')}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground-muted">{review.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          STICKY BOOK NOW BAR
         ───────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-border p-4 safe-bottom shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <span className="text-2xl font-display font-bold">
              {formatPrice(tour.price_vnd, currency)}
            </span>
            <span className="text-foreground-muted ml-1">
              / {tour.price_per === 'person' ? 'person' : tour.price_per}
            </span>
          </div>
          <Button
            size="lg"
            onClick={onBookNow}
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            }
            className="px-8"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}
