'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const packages = [
  {
    id: '1',
    name: 'Serenity VIP Package',
    description:
      'Our signature full-body wellness experience combining massage, facial care, and total relaxation.',
    duration: 150,
    price: 899000,
    originalPrice: 1200000,
    services: [
      'Full Body Massage (60 min)',
      'Facial Treatment (30 min)',
      'Manicure & Pedicure',
      'Herbal Tea & Refreshments',
    ],
    popular: true,
    icon: '💎',
  },
  {
    id: '2',
    name: 'VIP Grooming Package',
    description: 'Complete grooming experience for the modern gentleman. Relax and refresh.',
    duration: 90,
    price: 550000,
    originalPrice: 700000,
    services: [
      'Ear Cleaning',
      'Face Shaving',
      'Facial Treatment',
      'Face Mask',
      'Shampoo',
      'Head-Neck-Shoulder Massage',
    ],
    popular: false,
    icon: '✨',
  },
  {
    id: '3',
    name: 'Foot Care Combo',
    description: 'Treat tired feet to the ultimate pampering with massage, pedicure, and scrub.',
    duration: 75,
    price: 450000,
    originalPrice: 550000,
    services: ['Foot Massage (30 min)', 'Pedicure (no color)', 'Heel Scrub'],
    popular: false,
    icon: '🦶',
  },
  {
    id: '4',
    name: 'Beauty Glow Package',
    description: 'Complete facial rejuvenation with our premium Korean skincare products.',
    duration: 120,
    price: 750000,
    originalPrice: 950000,
    services: [
      'HydraFacial Treatment',
      'LED Light Therapy',
      'Eye Mask Treatment',
      'Neck & Shoulder Massage',
    ],
    popular: false,
    icon: '🌟',
  },
];

// =============================================================================
// UTILS
// =============================================================================

function formatPrice(price: number, currency: string): string {
  if (currency === 'VND') return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  if (currency === 'USD') return '$' + (price / 24000).toFixed(0);
  return '€' + (price / 26000).toFixed(0);
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function PackagesPage() {
  const [currency] = useState('VND');

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
              VIP Packages
            </h1>
            <p className="text-xs text-[var(--charcoal-muted)]">Save with our curated combos</p>
          </div>
        </div>
      </header>

      <main className="px-4 pt-20">
        {/* ===== PACKAGES LIST ===== */}
        <div className="space-y-4">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="animate-fade-in-up shadow-soft-lg relative overflow-hidden rounded-2xl bg-white"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute right-0 top-0 rounded-bl-xl bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[var(--charcoal)]">
                  MOST POPULAR
                </div>
              )}

              <div className="p-5">
                {/* Header */}
                <div className="mb-3 flex items-start gap-3">
                  <span className="text-3xl">{pkg.icon}</span>
                  <div className="flex-1">
                    <h2 className="font-display text-lg font-semibold text-[var(--charcoal)]">
                      {pkg.name}
                    </h2>
                    <p className="text-xs text-[var(--charcoal-muted)]">{pkg.description}</p>
                  </div>
                </div>

                {/* Price + Duration */}
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-display text-2xl font-bold text-[var(--sage-hex)]">
                    {formatPrice(pkg.price, currency)}
                  </span>
                  <span className="text-sm text-[var(--charcoal-muted)] line-through">
                    {formatPrice(pkg.originalPrice, currency)}
                  </span>
                  <span className="rounded-full bg-[var(--sage-light)] px-2 py-0.5 text-xs font-bold text-[var(--sage-hex)]">
                    Save {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Duration */}
                <div className="mb-3 flex items-center gap-1.5 text-xs text-[var(--charcoal-muted)]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formatDuration(pkg.duration)} total</span>
                </div>

                {/* Included Services */}
                <div className="mb-4 rounded-xl bg-[var(--cream)] p-3">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--charcoal-muted)]">
                    Included
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.services.map((service, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-[var(--charcoal)]"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--sage-hex)] text-[8px] text-white">
                          ✓
                        </span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book CTA */}
                <button className="w-full rounded-xl bg-[var(--sage-hex)] py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--sage-dark)] active:scale-[0.98]">
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== WHY CHOOSE SECTION ===== */}
        <section className="mb-4 mt-8">
          <h2 className="font-display mb-4 text-lg font-semibold text-[var(--charcoal)]">
            Why Choose a Package?
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="shadow-soft flex items-start gap-3 rounded-xl bg-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sage-light)]">
                <svg
                  className="h-5 w-5 text-[var(--sage-hex)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--charcoal)]">Guaranteed Savings</h3>
                <p className="text-xs text-[var(--charcoal-muted)]">
                  Up to 25% off compared to individual services
                </p>
              </div>
            </div>
            <div className="shadow-soft flex items-start gap-3 rounded-xl bg-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sage-light)]">
                <svg
                  className="h-5 w-5 text-[var(--sage-hex)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--charcoal)]">
                  Seamless Experience
                </h3>
                <p className="text-xs text-[var(--charcoal-muted)]">
                  All services in one session, maximum relaxation
                </p>
              </div>
            </div>
            <div className="shadow-soft flex items-start gap-3 rounded-xl bg-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sage-light)]">
                <svg
                  className="h-5 w-5 text-[var(--sage-hex)]"
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
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--charcoal)]">
                  Curated Combinations
                </h3>
                <p className="text-xs text-[var(--charcoal-muted)]">
                  Services designed to complement each other perfectly
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== BOTTOM NAVIGATION ===== */}
      <nav className="pb-safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white px-6 pt-2">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]">
            <svg
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
