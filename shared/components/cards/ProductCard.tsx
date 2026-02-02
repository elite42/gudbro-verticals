'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Standalone cn utility for shared components
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT CARD - Shared Component

   Clean, minimal card for products/tours/services across all GUDBRO PWAs.
   Shows only essential info: image, title, price, featured badge, wishlist.
   All details revealed on click/detail page.

   IMAGE REQUIREMENTS:
   ─────────────────────────────────────────────────────────────────────────
   - Hero/Wide:   1200x500px min (aspect 21:9 or 16:7)
   - Tall:        600x800px min (aspect 3:4)
   - Standard:    800x600px min (aspect 4:3)
   - Compact:     400x400px min (aspect 1:1)
   - Mini:        300x300px min (aspect 1:1)
   - Bottle:      300x600px min (aspect 1:2) - for tall products like bottles

   - Subject should be centered or rule-of-thirds positioned
   - Avoid text/logos in bottom 30% (price overlay area)
   - High contrast edges for badge visibility
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ProductCardProps {
  id: string
  slug: string
  name: string
  image: string
  price: string
  priceSubtext?: string // "per person", "per vehicle", etc.
  href: string
  featured?: boolean
  featuredLabel?: string // "Editor's Pick", "Best Seller", etc.
  badge?: string // "Free cancellation", etc.
  className?: string
  onWishlist?: (id: string) => void
  isWishlisted?: boolean
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO CARD - Wide cinematic banner (21:9)
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductCardHero({
  id,
  name,
  image,
  price,
  priceSubtext,
  href,
  featured,
  featuredLabel = "Editor's Pick",
  badge,
  className,
  onWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHearted, setIsHearted] = useState(isWishlisted)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHearted(!isHearted)
    onWishlist?.(id)
  }

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl',
        'shadow-lg hover:shadow-2xl transition-all duration-500',
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-[21/9] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            'object-cover transition-all duration-700',
            'group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="100vw"
          priority
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Top: Featured star + Wishlist */}
        <div className="flex items-start justify-between">
          {featured ? (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          ) : <div />}

          <button
            onClick={handleWishlist}
            className={cn(
              'p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110',
              isHearted
                ? 'bg-red-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/40'
            )}
          >
            <svg
              className="w-5 h-5"
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
          <h3 className="text-xl font-semibold text-white line-clamp-2 drop-shadow-lg">
            {name}
          </h3>

          <div className="flex-shrink-0 bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
            <div className="text-xl font-bold text-white">{price}</div>
            {priceSubtext && (
              <div className="text-[10px] text-white/70 uppercase tracking-wide">{priceSubtext}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TALL CARD - Portrait Pinterest style (3:4)
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductCardTall({
  id,
  name,
  image,
  price,
  priceSubtext,
  href,
  featured,
  className,
  onWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHearted, setIsHearted] = useState(isWishlisted)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHearted(!isHearted)
    onWishlist?.(id)
  }

  return (
    <Link
      href={href}
      className={cn(
        'group relative block rounded-2xl overflow-hidden',
        'shadow-sm hover:shadow-xl transition-all duration-500',
        'hover:-translate-y-1',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
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
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
        {featured ? (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
        ) : <div />}

        <button
          onClick={handleWishlist}
          className={cn(
            'p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110',
            isHearted
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
              : 'bg-white/20 text-white hover:bg-white/40'
          )}
        >
          <svg
            className="w-5 h-5"
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
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 drop-shadow-lg">
          {name}
        </h3>

        {/* Price bar */}
        <div className="flex items-center justify-between bg-white/15 backdrop-blur-md rounded-xl p-2.5 border border-white/20">
          <div>
            <div className="text-lg font-bold text-white">{price}</div>
            {priceSubtext && (
              <div className="text-[10px] text-white/60 uppercase tracking-wide">{priceSubtext}</div>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-primary transition-colors">
            <svg className="w-4 h-4 text-gray-900 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STANDARD CARD - Classic 4:3 aspect
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductCardStandard({
  id,
  name,
  image,
  price,
  priceSubtext,
  href,
  featured,
  featuredLabel = 'Best Seller',
  badge,
  className,
  onWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHearted, setIsHearted] = useState(isWishlisted)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHearted(!isHearted)
    onWishlist?.(id)
  }

  return (
    <Link
      href={href}
      className={cn(
        'group block bg-white rounded-2xl overflow-hidden',
        'shadow-sm hover:shadow-xl transition-all duration-300',
        'border border-gray-100',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            'group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top: Featured star + Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {featured ? (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          ) : <div />}

          <button
            onClick={handleWishlist}
            className={cn(
              'p-2 rounded-full backdrop-blur-sm transition-all duration-200',
              isHearted
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            )}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill={isHearted ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

        {/* Bottom price overlay */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/15 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20">
            <div className="text-lg font-bold text-white">{price}</div>
            {priceSubtext && (
              <div className="text-[10px] text-white/70 uppercase tracking-wide">{priceSubtext}</div>
            )}
          </div>
        </div>
      </div>

      {/* Title below image */}
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPACT CARD - Horizontal list item (1:1 thumb)
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductCardCompact({
  id,
  name,
  image,
  price,
  priceSubtext,
  href,
  featured,
  className,
  onWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHearted, setIsHearted] = useState(isWishlisted)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHearted(!isHearted)
    onWishlist?.(id)
  }

  return (
    <Link
      href={href}
      className={cn(
        'group flex gap-3 bg-white rounded-xl overflow-hidden',
        'border border-gray-100 p-2',
        'hover:shadow-lg hover:border-primary/20 transition-all duration-300',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="80px"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Featured dot */}
        {featured && (
          <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
        )}

        {/* Wishlist on hover */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-1 right-1 p-1 rounded-full transition-all duration-200',
            'opacity-0 group-hover:opacity-100',
            isHearted
              ? 'bg-red-500 text-white opacity-100'
              : 'bg-black/40 text-white hover:bg-red-500'
          )}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill={isHearted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-base font-bold text-gray-900">{price}</span>
            {priceSubtext && (
              <span className="text-xs text-gray-400 ml-1">/{priceSubtext}</span>
            )}
          </div>
          <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MINI CARD - Tiny for suggestions (1:1)
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductCardMini({
  name,
  image,
  price,
  href,
  featured,
  className,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        'group flex-shrink-0 w-32 block',
        'transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 shadow-sm group-hover:shadow-md transition-shadow">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="128px"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-1.5 left-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 shadow-sm">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-1.5 right-1.5">
          <span className="px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
            {price}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-xs font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-tight px-0.5">
        {name}
      </h4>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOTTLE CARD - Tall vertical for bottles/drinks (1:2)
   Perfect for wine bottles, cocktails, tall glasses, vertical products
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductCardBottle({
  name,
  image,
  price,
  href,
  featured,
  className,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        'group flex-shrink-0 w-36 block snap-start',
        'transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      {/* Thumbnail - aspect 1:2 for tall products */}
      <div className="relative w-full aspect-[1/2] rounded-2xl overflow-hidden mb-2 shadow-md group-hover:shadow-xl transition-shadow">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            'group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="112px"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-150 to-gray-200 animate-pulse" />
        )}

        {/* Subtle gradient at bottom for price readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Featured badge - small star */}
        {featured && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </div>
        )}

        {/* Price overlay - glassmorphism */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-white/15 backdrop-blur-md rounded-lg px-2 py-1.5 border border-white/20 text-center">
            <span className="text-sm font-bold text-white">{price}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-xs font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-tight px-0.5 text-center">
        {name}
      </h4>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SKELETONS
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProductCardHeroSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[21/9]">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
    </div>
  )
}

export function ProductCardTallSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[3/4]">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300 animate-pulse" />
    </div>
  )
}

export function ProductCardStandardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="p-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
      </div>
    </div>
  )
}

export function ProductCardCompactSkeleton() {
  return (
    <div className="flex gap-3 bg-white rounded-xl border border-gray-100 p-2">
      <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-gray-200 animate-pulse" />
      <div className="flex-1 py-0.5 flex flex-col justify-between">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-16" />
      </div>
    </div>
  )
}

export function ProductCardMiniSkeleton() {
  return (
    <div className="flex-shrink-0 w-32">
      <div className="w-full aspect-square rounded-xl bg-gray-200 animate-pulse mb-2" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-full mb-1 mx-0.5" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4 mx-0.5" />
    </div>
  )
}

export function ProductCardBottleSkeleton() {
  return (
    <div className="flex-shrink-0 w-36 snap-start">
      <div className="w-full aspect-[1/2] rounded-2xl bg-gray-200 animate-pulse mb-2" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-full mb-1 mx-0.5" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
    </div>
  )
}
