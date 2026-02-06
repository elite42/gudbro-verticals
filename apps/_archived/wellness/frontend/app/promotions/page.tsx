'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const promotions = [
  {
    id: 'promo-1',
    name: '20% Off All Massages',
    description:
      'Enjoy 20% off every massage treatment for the entire month. Perfect for first-timers and regulars alike.',
    originalPrice: 450000,
    discountedPrice: 360000,
    discountType: 'percentage' as const,
    discountValue: 20,
    validFrom: '2026-01-01',
    validTo: '2026-01-31',
    services: ['Thai Massage', 'Swedish Massage', 'Hot Stone Massage', 'Aromatherapy Massage'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop',
    active: true,
  },
  {
    id: 'promo-2',
    name: 'Couples Retreat Special',
    description:
      'Book a couples massage and receive a complimentary herbal tea ceremony and rose petal decoration.',
    originalPrice: 1200000,
    discountedPrice: 800000,
    discountType: 'fixed' as const,
    discountValue: 400000,
    validFrom: '2026-02-01',
    validTo: '2026-02-28',
    services: ['Couples Massage (2 persons)', 'Champagne & Strawberries', 'Rose Petals Decoration'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=250&fit=crop',
    active: true,
  },
  {
    id: 'promo-3',
    name: 'Happy Hour Facial',
    description:
      'Book a facial treatment between 2-4 PM weekdays and get 30% off. Limited spots available.',
    originalPrice: 500000,
    discountedPrice: 350000,
    discountType: 'percentage' as const,
    discountValue: 30,
    validFrom: '2026-01-01',
    validTo: '2026-03-31',
    services: ['Korean Facial', 'Anti-aging Treatment', 'Deep Cleansing'],
    conditions: 'Monday-Friday, 2:00 PM - 4:00 PM only',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=250&fit=crop',
    active: true,
  },
  {
    id: 'promo-expired',
    name: 'Black Friday Deal',
    description: 'Was: 50% off all services for one day only.',
    originalPrice: 500000,
    discountedPrice: 250000,
    discountType: 'percentage' as const,
    discountValue: 50,
    validFrom: '2025-11-28',
    validTo: '2025-11-28',
    services: ['All services'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=250&fit=crop',
    active: false,
  },
];

// =============================================================================
// UTILS
// =============================================================================

import { formatPrice, formatDate } from '@gudbro/utils';

// =============================================================================
// COMPONENT
// =============================================================================

export default function PromotionsPage() {
  const [currency] = useState('VND');

  const activePromos = promotions.filter((p) => p.active);
  const expiredPromos = promotions.filter((p) => !p.active);

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-24">
      {/* ===== HEADER ===== */}
      <header className="bg-[var(--cream)]/90 fixed left-0 right-0 top-0 z-50 border-b border-[var(--cream-dark)] backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--cream-dark)]"
          >
            <svg
              className="h-5 w-5 text-[var(--charcoal)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div>
            <h1 className="font-display text-lg font-semibold text-[var(--charcoal)]">
              Special Offers
            </h1>
            <p className="text-xs text-[var(--charcoal-muted)]">
              {activePromos.length} active promotions
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 pt-20">
        {/* ===== ACTIVE PROMOTIONS ===== */}
        {activePromos.length > 0 && (
          <section className="mb-8">
            <div className="space-y-4">
              {activePromos.map((promo, index) => (
                <div
                  key={promo.id}
                  className="animate-fade-in-up shadow-soft-lg overflow-hidden rounded-2xl bg-white"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={promo.image}
                      alt={promo.name}
                      width={400}
                      height={160}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute left-3 top-3 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[var(--charcoal)]">
                      {promo.discountType === 'percentage'
                        ? `-${promo.discountValue}%`
                        : `Save ${formatPrice(promo.discountValue, currency)}`}
                    </div>

                    {/* Validity */}
                    <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[var(--charcoal)] backdrop-blur-sm">
                      {formatDate(promo.validFrom, { style: 'short' })} -{' '}
                      {formatDate(promo.validTo, { style: 'short' })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h2 className="font-display mb-1 text-lg font-semibold text-[var(--charcoal)]">
                      {promo.name}
                    </h2>
                    <p className="mb-3 text-xs text-[var(--charcoal-muted)]">{promo.description}</p>

                    {/* Price */}
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="font-display text-xl font-bold text-[var(--sage-hex)]">
                        {formatPrice(promo.discountedPrice, currency)}
                      </span>
                      <span className="text-sm text-[var(--charcoal-muted)] line-through">
                        {formatPrice(promo.originalPrice, currency)}
                      </span>
                    </div>

                    {/* Applicable Services */}
                    <div className="mb-3">
                      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--charcoal-muted)]">
                        Applies to
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {promo.services.map((svc, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-[var(--sage-light)] px-2.5 py-1 text-[11px] font-medium text-[var(--sage-dark)]"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Conditions */}
                    {promo.conditions && (
                      <div className="mb-3 rounded-lg bg-[var(--cream)] px-3 py-2">
                        <p className="text-xs text-[var(--charcoal-muted)]">
                          <span className="font-medium text-[var(--charcoal)]">Note:</span>{' '}
                          {promo.conditions}
                        </p>
                      </div>
                    )}

                    {/* Book CTA */}
                    <button className="w-full rounded-xl bg-[var(--sage-hex)] py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--sage-dark)] active:scale-[0.98]">
                      Claim Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== NO ACTIVE PROMOS ===== */}
        {activePromos.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-5xl">🌿</div>
            <h2 className="font-display mb-2 text-xl font-semibold text-[var(--charcoal)]">
              No Active Promotions
            </h2>
            <p className="mb-6 text-sm text-[var(--charcoal-muted)]">
              Check back soon for special offers and exclusive deals.
            </p>
            <Link
              href="/"
              className="inline-block rounded-xl bg-[var(--sage-hex)] px-6 py-3 text-sm font-semibold text-white"
            >
              Browse Services
            </Link>
          </div>
        )}

        {/* ===== EXPIRED PROMOTIONS ===== */}
        {expiredPromos.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display mb-3 text-base text-[var(--charcoal-muted)]">
              Past Offers
            </h2>
            <div className="space-y-3 opacity-50">
              {expiredPromos.map((promo) => (
                <div
                  key={promo.id}
                  className="shadow-soft flex items-center gap-3 rounded-xl bg-white p-3"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={promo.image}
                      alt={promo.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover grayscale"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-sm font-semibold text-[var(--charcoal)]">
                      {promo.name}
                    </h3>
                    <p className="text-xs text-[var(--charcoal-muted)]">
                      Expired {formatDate(promo.validTo, { style: 'short' })}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--cream-dark)] px-2 py-0.5 text-[10px] font-medium text-[var(--charcoal-muted)]">
                    EXPIRED
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== STAY UPDATED CTA ===== */}
        <section className="mb-4">
          <div className="shadow-soft rounded-2xl bg-gradient-to-br from-[var(--charcoal)] to-[var(--charcoal-light)] p-5 text-white">
            <h3 className="font-display mb-2 text-lg font-semibold">Never Miss an Offer</h3>
            <p className="mb-4 text-sm text-white/70">
              Contact us on WhatsApp or Zalo to receive exclusive VIP offers and early access to
              promotions.
            </p>
            <div className="flex gap-2">
              <a
                href="https://wa.me/84123456789"
                className="flex-1 rounded-lg bg-green-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                WhatsApp
              </a>
              <a
                href="https://zalo.me/84123456789"
                className="flex-1 rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Zalo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ===== BOTTOM NAVIGATION ===== */}
      <nav className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white px-6 pt-2">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]">
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <Link
            href="/services"
            className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]"
          >
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </Link>
          <span className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]">
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </span>
          <Link
            href="/staff"
            className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]"
          >
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </Link>
          <span className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]">
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </span>
        </div>
      </nav>
    </div>
  );
}
