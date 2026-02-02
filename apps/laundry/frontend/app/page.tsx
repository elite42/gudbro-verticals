'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA - Fresh & Clean Laundry, Da Nang
// =============================================================================

const business = {
  name: 'Fresh & Clean Laundry',
  tagline: 'Professional Laundry & Dry Cleaning',
  rating: 4.7,
  reviewCount: 183,
  isOpen: true,
  todayHours: '7:00 AM - 8:00 PM',
  address: '56 An Thuong 4, Ngu Hanh Son, Da Nang',
  mapUrl: 'https://maps.google.com/?q=Fresh+Clean+Laundry+Da+Nang',
};

const categories = [
  { id: 'wash', label: 'Wash & Fold', icon: '\u{1F9FA}', color: '#4A90D9' },
  { id: 'iron', label: 'Wash & Iron', icon: '\u{1F454}', color: '#38B2AC' },
  { id: 'dry_clean', label: 'Dry Clean', icon: '\u{1F9E5}', color: '#9F7AEA' },
  { id: 'iron_only', label: 'Iron Only', icon: '\u2668\uFE0F', color: '#ED8936' },
  { id: 'shoes', label: 'Shoes', icon: '\u{1F45F}', color: '#E53E3E' },
  { id: 'express', label: 'Express', icon: '\u26A1', color: '#D69E2E' },
];

const quickPrices = [
  { name: 'Wash & Fold', price: 25000, unit: 'kg', icon: '\u{1F9FA}' },
  { name: 'Wash & Iron', price: 35000, unit: 'kg', icon: '\u{1F454}' },
  { name: 'Dry Clean', price: 50000, unit: 'item', icon: '\u{1F9E5}' },
  { name: 'Express', price: 37500, unit: 'kg', icon: '\u26A1' },
];

const featuredServices = [
  {
    id: '1',
    slug: 'wash-and-fold',
    name: 'Wash & Fold',
    category: 'wash',
    price: 25000,
    unit: 'kg',
    turnaround: '24h',
    image:
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    slug: 'wash-and-iron',
    name: 'Wash & Iron',
    category: 'iron',
    price: 35000,
    unit: 'kg',
    turnaround: '24-36h',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    slug: 'suit-dry-clean',
    name: 'Suit (2-piece)',
    category: 'dry_clean',
    price: 80000,
    unit: 'item',
    turnaround: '48-72h',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73b1160fdc7?w=400&h=300&fit=crop',
  },
  {
    id: '10',
    slug: 'shoe-cleaning',
    name: 'Shoe Cleaning',
    category: 'shoes',
    price: 60000,
    unit: 'pair',
    turnaround: '24-48h',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
  },
  {
    id: '13',
    slug: 'express-wash-fold',
    name: 'Express Wash & Fold',
    category: 'express',
    price: 37500,
    unit: 'kg',
    turnaround: '4-8h',
    image:
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=300&fit=crop',
  },
];

const languages = [
  { code: 'en', label: 'EN', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'vi', label: 'VI', flag: '\u{1F1FB}\u{1F1F3}' },
  { code: 'ko', label: 'KO', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: 'zh', label: 'ZH', flag: '\u{1F1E8}\u{1F1F3}' },
];

const currencies = ['VND', 'USD', 'EUR'];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function formatPrice(price: number, currency: string): string {
  if (currency === 'VND') return new Intl.NumberFormat('vi-VN').format(price) + '\u20AB';
  if (currency === 'USD') return '$' + (price / 24000).toFixed(2);
  return '\u20AC' + (price / 26000).toFixed(2);
}

// =============================================================================
// ICONS (SVG Components)
// =============================================================================

const Icons = {
  Home: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  Services: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  ),
  Star: ({ className, filled }: { className?: string; filled?: boolean }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  ),
  Clock: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  MapPin: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  Phone: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  Menu: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  ),
  // Water droplet logo icon
  WaterDrop: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69zm0 2.83L8.49 9.34a5.5 5.5 0 107.02 0L12 5.52z" />
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" opacity="0.2" />
    </svg>
  ),
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LaundryHomePage() {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('VND');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--cloud)] pb-24">
      {/* ===== HEADER ===== */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--cloud-dark)] bg-[var(--cloud)]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo + Name */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--blue-light)]">
              <Icons.WaterDrop className="h-5 w-5 text-[var(--blue-hex)]" />
            </div>
            <div>
              <h1 className="font-display text-base font-semibold leading-tight text-[var(--charcoal)]">
                {business.name}
              </h1>
              <div className="flex items-center gap-1 text-[11px] text-[var(--charcoal-muted)]">
                <Icons.Star className="h-3 w-3 text-[var(--gold)]" filled />
                <span className="font-medium">{business.rating}</span>
                <span>&middot;</span>
                <span>{business.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowCurrMenu(false);
                }}
                className="rounded-full p-2 transition-colors hover:bg-[var(--cloud-dark)]"
              >
                <svg
                  className="h-5 w-5 text-[var(--charcoal)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </button>
              {showLangMenu && (
                <div className="shadow-soft-lg absolute right-0 top-full mt-1 w-36 rounded-xl bg-white p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        language === lang.code
                          ? 'bg-[var(--blue-light)] font-medium text-[var(--blue-hex)]'
                          : 'text-[var(--charcoal)] hover:bg-[var(--cloud)]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCurrMenu(!showCurrMenu);
                  setShowLangMenu(false);
                }}
                className="flex items-center gap-0.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-[var(--charcoal)] transition-colors hover:bg-[var(--cloud-dark)]"
              >
                {currency === 'VND' ? '\u20AB' : currency === 'USD' ? '$' : '\u20AC'}
              </button>
              {showCurrMenu && (
                <div className="shadow-soft-lg absolute right-0 top-full mt-1 w-28 rounded-xl bg-white p-1">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setShowCurrMenu(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        currency === curr
                          ? 'bg-[var(--blue-light)] font-medium text-[var(--blue-hex)]'
                          : 'text-[var(--charcoal)] hover:bg-[var(--cloud)]'
                      }`}
                    >
                      <span>{curr === 'VND' ? '\u20AB' : curr === 'USD' ? '$' : '\u20AC'}</span>
                      <span>{curr}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-16">
        {/* ===== CATEGORY PILLS ===== */}
        <section className="animate-fade-in-up mb-6">
          <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`hover-lift flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'shadow-soft bg-[var(--blue-hex)] text-white'
                    : 'shadow-soft bg-white text-[var(--charcoal)] hover:bg-[var(--blue-light)]'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ===== QUICK PRICE CARDS ===== */}
        <section className="animate-fade-in-up mb-8 delay-75">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--charcoal)]">
              Quick Prices
            </h2>
            <Link
              href="/services"
              className="flex items-center gap-1 text-sm font-medium text-[var(--blue-hex)] hover:text-[var(--blue-dark)]"
            >
              All prices
              <Icons.ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickPrices.map((item, index) => (
              <div
                key={item.name}
                className="shadow-soft hover-lift rounded-xl bg-gradient-to-br from-[var(--blue-hex)] to-[var(--blue-dark)] p-4 text-white"
                style={{ animationDelay: `${100 + index * 50}ms` }}
              >
                <span className="mb-2 block text-2xl">{item.icon}</span>
                <h3 className="font-display text-sm font-semibold leading-tight">
                  {item.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-lg font-bold">{formatPrice(item.price, currency)}</span>
                  <span className="text-xs text-white/70">/ {item.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FEATURED SERVICES ===== */}
        <section className="animate-fade-in-up mb-8 delay-100">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--charcoal)]">
              Our Services
            </h2>
            <Link
              href="/services"
              className="flex items-center gap-1 text-sm font-medium text-[var(--blue-hex)] hover:text-[var(--blue-dark)]"
            >
              View all
              <Icons.ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="hide-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                className="shadow-soft hover-lift group relative w-64 shrink-0 snap-start overflow-hidden rounded-xl bg-white"
                style={{ animationDelay: `${150 + index * 75}ms` }}
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div
                    className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{
                      backgroundColor: categories.find((c) => c.id === service.category)?.color,
                    }}
                  >
                    {categories.find((c) => c.id === service.category)?.label}
                  </div>

                  {/* Turnaround Badge */}
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-[var(--charcoal)] backdrop-blur-sm">
                    <Icons.Clock className="h-3 w-3 text-[var(--blue-hex)]" />
                    {service.turnaround}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="font-display mb-1 line-clamp-1 text-base font-semibold text-[var(--charcoal)]">
                    {service.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-[var(--blue-hex)]">
                        {formatPrice(service.price, currency)}
                      </span>
                      <span className="text-xs text-[var(--charcoal-muted)]">
                        / {service.unit}
                      </span>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="rounded-lg bg-[var(--blue-hex)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[var(--blue-dark)]"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="animate-fade-in-up mb-8 delay-200">
          <h2 className="font-display mb-4 text-xl font-semibold text-[var(--charcoal)]">
            How It Works
          </h2>

          <div className="shadow-soft rounded-xl bg-white p-5">
            <div className="flex items-start justify-between gap-2">
              {/* Step 1 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blue-light)]">
                  <svg className="h-6 w-6 text-[var(--blue-hex)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="mb-1 text-xs font-bold text-[var(--blue-hex)]">1</div>
                <h4 className="font-display text-sm font-semibold text-[var(--charcoal)]">Drop Off</h4>
                <p className="mt-0.5 text-[11px] text-[var(--charcoal-muted)]">Bring your clothes</p>
              </div>

              {/* Arrow */}
              <div className="mt-6 text-[var(--cloud-dark)]">
                <Icons.ChevronRight className="h-5 w-5" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--teal-light)]">
                  <svg className="h-6 w-6 text-[var(--teal)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="mb-1 text-xs font-bold text-[var(--teal)]">2</div>
                <h4 className="font-display text-sm font-semibold text-[var(--charcoal)]">We Clean</h4>
                <p className="mt-0.5 text-[11px] text-[var(--charcoal-muted)]">Professional care</p>
              </div>

              {/* Arrow */}
              <div className="mt-6 text-[var(--cloud-dark)]">
                <Icons.ChevronRight className="h-5 w-5" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold-light)]">
                  <svg className="h-6 w-6 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="mb-1 text-xs font-bold text-[var(--gold)]">3</div>
                <h4 className="font-display text-sm font-semibold text-[var(--charcoal)]">Pick Up</h4>
                <p className="mt-0.5 text-[11px] text-[var(--charcoal-muted)]">Fresh & ready</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROMOTIONS BANNER ===== */}
        <section className="animate-fade-in-up mb-8 delay-300">
          <div className="shadow-soft-lg relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--charcoal)] to-[var(--charcoal-light)] p-5 text-white">
            {/* Decorative elements */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--gold)] opacity-10" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[var(--blue-hex)] opacity-10" />

            <div className="relative">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 text-xs font-bold text-[var(--charcoal)]">
                  PROMO
                </span>
                <span className="text-xs text-white/70">New Customers</span>
              </div>
              <h3 className="font-display text-xl font-semibold">First Wash Free!</h3>
              <p className="mt-1 text-sm text-white/70">
                Try our Wash & Fold service -- your first kilogram is on us. No strings attached.
              </p>

              <div className="my-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--gold)]">FREE</span>
                <span className="text-sm text-white/50 line-through">
                  {formatPrice(25000, currency)}
                </span>
                <span className="rounded-full bg-[var(--blue-hex)] px-2 py-0.5 text-xs font-bold">
                  100% OFF
                </span>
              </div>

              <Link
                href="/promotions"
                className="inline-block w-full rounded-xl bg-[var(--gold)] py-3 text-center text-sm font-bold text-[var(--charcoal)] shadow-lg transition-all hover:bg-[#D4B46E] hover:shadow-xl active:scale-[0.98]"
              >
                Claim Your Free Wash
              </Link>
            </div>
          </div>
        </section>

        {/* ===== LOCATION & CONTACT ===== */}
        <section className="animate-fade-in-up mb-8 delay-400">
          <h2 className="font-display mb-4 text-xl font-semibold text-[var(--charcoal)]">
            Find Us
          </h2>

          <div className="shadow-soft overflow-hidden rounded-xl bg-white">
            {/* Map Preview */}
            <div className="relative h-36 bg-[var(--blue-light)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Icons.MapPin className="animate-float h-12 w-12 text-[var(--blue-hex)]" />
              </div>
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-soft absolute bottom-2 right-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[var(--blue-hex)] hover:bg-[var(--blue-light)]"
              >
                Open in Maps
              </a>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="mb-3 flex items-start gap-3">
                <Icons.MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--blue-hex)]" />
                <p className="text-sm text-[var(--charcoal)]">{business.address}</p>
              </div>
              <div className="mb-4 flex items-center gap-3">
                <Icons.Clock className="h-5 w-5 shrink-0 text-[var(--blue-hex)]" />
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      business.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {business.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                  <span className="text-sm text-[var(--charcoal-muted)]">
                    Today: {business.todayHours}
                  </span>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://wa.me/84935123456"
                  className="flex flex-col items-center gap-1 rounded-lg bg-green-50 py-2.5 text-green-600 transition-colors hover:bg-green-100"
                >
                  <span className="text-lg">{'\u{1F4AC}'}</span>
                  <span className="text-xs font-medium">WhatsApp</span>
                </a>
                <a
                  href="https://zalo.me/84935123456"
                  className="flex flex-col items-center gap-1 rounded-lg bg-blue-50 py-2.5 text-blue-600 transition-colors hover:bg-blue-100"
                >
                  <span className="text-lg">{'\u{1F4F1}'}</span>
                  <span className="text-xs font-medium">Zalo</span>
                </a>
                <a
                  href="tel:+84935123456"
                  className="flex flex-col items-center gap-1 rounded-lg bg-[var(--blue-light)] py-2.5 text-[var(--blue-hex)] transition-colors hover:bg-[var(--blue-hex)] hover:text-white"
                >
                  <Icons.Phone className="h-5 w-5" />
                  <span className="text-xs font-medium">Call</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation + Laundry Form provided by layout ClientShell */}
    </div>
  );
}
