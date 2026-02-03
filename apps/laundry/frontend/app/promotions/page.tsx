'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@gudbro/utils';

const promotions = [
  {
    id: 'promo-1',
    name: 'First Wash Free!',
    description:
      'New customers get their first wash & fold (up to 3kg) completely free. No strings attached!',
    discountType: 'free' as const,
    discountValue: 'FREE',
    validFrom: '2026-01-01',
    validTo: '2026-03-31',
    services: ['Wash & Fold (up to 3kg)'],
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=250&fit=crop',
    active: true,
  },
  {
    id: 'promo-2',
    name: 'Midweek 20% Off',
    description: 'Drop off your laundry Tuesday to Thursday and save 20% on all wash services.',
    originalPrice: 25000,
    discountedPrice: 20000,
    discountType: 'percentage' as const,
    discountValue: 20,
    validFrom: '2026-01-01',
    validTo: '2026-06-30',
    services: ['Wash & Fold', 'Wash & Iron', 'Express Wash'],
    conditions: 'Tuesday - Thursday drop-off only',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop',
    active: true,
  },
  {
    id: 'promo-3',
    name: 'Loyalty: 10th Wash Free',
    description: 'After 9 paid washes, your 10th wash & fold is on us! Ask for your loyalty card.',
    discountType: 'loyalty' as const,
    discountValue: 'FREE',
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    services: ['All wash services'],
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=250&fit=crop',
    active: true,
  },
  {
    id: 'promo-4',
    name: 'Dry Cleaning Bundle',
    description: 'Bring 3+ items for dry cleaning and get 15% off the total.',
    originalPrice: 190000,
    discountedPrice: 161500,
    discountType: 'percentage' as const,
    discountValue: 15,
    validFrom: '2026-02-01',
    validTo: '2026-04-30',
    services: ['Suit', 'Jacket', 'Dress (Dry Clean)'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73b1160fdc7?w=400&h=250&fit=crop',
    active: true,
  },
];

function DiscountBadge({ type, value }: { type: string; value: string | number }) {
  let label = '';
  if (type === 'free') label = 'FREE';
  else if (type === 'loyalty') label = 'LOYALTY';
  else if (type === 'percentage') label = `${value}% OFF`;
  else label = String(value);

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
      style={{ backgroundColor: 'var(--gold)', color: '#fff' }}
    >
      {label}
    </span>
  );
}

export default function PromotionsPage() {
  const activePromos = promotions.filter((p) => p.active);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--cloud)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b bg-white"
        style={{ borderColor: 'var(--cloud-dark)' }}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            aria-label="Go back"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)' }}>
              Special Offers
            </h1>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{
              backgroundColor: 'var(--gold-light)',
              color: 'var(--gold)',
            }}
          >
            {activePromos.length} active
          </span>
        </div>
      </header>

      {/* Promotions List */}
      <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
        {activePromos.map((promo, index) => (
          <article
            key={promo.id}
            className="shadow-soft hover-lift animate-fade-in-up overflow-hidden rounded-2xl bg-white"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image with badge */}
            <div className="relative h-44 sm:h-52">
              <Image
                src={promo.image}
                alt={promo.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 640px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute left-3 top-3">
                <DiscountBadge type={promo.discountType} value={promo.discountValue} />
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="rounded-full bg-black/30 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm">
                  {formatDate(promo.validFrom)} - {formatDate(promo.validTo)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 p-5">
              <h2 className="font-display text-lg font-bold" style={{ color: 'var(--charcoal)' }}>
                {promo.name}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
                {promo.description}
              </p>

              {/* Applicable services */}
              <div className="flex flex-wrap gap-2">
                {promo.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--blue-light)',
                      color: 'var(--blue-dark)',
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Conditions */}
              {promo.conditions && (
                <p
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: 'var(--charcoal-muted)' }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  {promo.conditions}
                </p>
              )}

              {/* CTA */}
              <button
                className="mt-2 w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: 'var(--blue-hex)' }}
              >
                Claim Offer
              </button>
            </div>
          </article>
        ))}

        {/* Never Miss an Offer CTA */}
        <section
          className="animate-fade-in-up space-y-4 rounded-2xl p-6 text-center"
          style={{
            backgroundColor: 'var(--charcoal)',
            animationDelay: `${activePromos.length * 100 + 100}ms`,
          }}
        >
          <h3 className="font-display text-lg font-bold text-white">Never Miss an Offer</h3>
          <p className="text-sm text-gray-300">
            Get notified about new promotions and exclusive deals directly on your phone.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="https://wa.me/84935123456?text=Hi!%20I%27d%20like%20to%20receive%20promo%20updates"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://zalo.me/0935123456"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0068FF' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.18-.424-.75-.672-1.327-.672H7.76c-.577 0-1.148.248-1.327.672-.18.424.053.904.516 1.198l4.253 2.727c.18.116.392.174.604.174.212 0 .424-.058.604-.174l4.253-2.727c.463-.294.696-.774.516-1.198zM17.76 16.8H6.24c-.663 0-1.2-.537-1.2-1.2V10.8l4.8 3.072c.348.223.744.336 1.148.336.404 0 .8-.113 1.148-.336l4.8-3.072v4.8c0 .663-.537 1.2-1.2 1.2z" />
              </svg>
              Zalo
            </a>
          </div>
        </section>
      </main>

      {/* Bottom Navigation provided by layout */}
    </div>
  );
}
