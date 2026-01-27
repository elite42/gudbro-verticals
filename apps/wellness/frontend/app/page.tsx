'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA - Serene Wellness & Beauty, Da Nang
// =============================================================================

const business = {
  name: 'Serene Wellness & Beauty',
  tagline: 'Your sanctuary of tranquility',
  logo: '/images/logo.png',
  rating: 4.8,
  reviewCount: 247,
  isOpen: true,
  todayHours: '9:00 AM - 9:00 PM',
  address: '123 Nguyen Van Linh, Hai Chau, Da Nang',
  mapUrl: 'https://maps.google.com/?q=Serene+Wellness+Da+Nang',
};

const categories = [
  { id: 'massage', label: 'Massage', icon: '🧘', color: '#8BA888' },
  { id: 'hair', label: 'Hair', icon: '✂️', color: '#B8A898' },
  { id: 'nails', label: 'Nails', icon: '💅', color: '#E8B8B8' },
  { id: 'beauty', label: 'Beauty', icon: '✨', color: '#D4B8D4' },
  { id: 'barber', label: 'Barber', icon: '💈', color: '#8B7355' },
  { id: 'tattoo', label: 'Tattoo', icon: '🎨', color: '#5A5A5A' },
  { id: 'wellness', label: 'Wellness', icon: '🌿', color: '#A8C8D8' },
];

const featuredServices = [
  {
    id: '1',
    name: 'Traditional Vietnamese Massage',
    category: 'massage',
    duration: 90,
    price: 450000,
    originalPrice: 550000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Luxury Hair Treatment',
    category: 'hair',
    duration: 60,
    price: 350000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Gel Nail Art Set',
    category: 'nails',
    duration: 75,
    price: 280000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Hot Stone Therapy',
    category: 'massage',
    duration: 120,
    price: 650000,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop',
  },
];

const staff = [
  {
    id: '1',
    name: 'Linh Nguyen',
    specialty: 'Senior Massage Therapist',
    languages: ['EN', 'VI'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Minh Tran',
    specialty: 'Hair Stylist',
    languages: ['EN', 'VI', 'KO'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Mai Pham',
    specialty: 'Nail Artist',
    languages: ['EN', 'VI', 'ZH'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
];

const vipPackage = {
  name: 'Serenity VIP Package',
  originalPrice: 1200000,
  price: 899000,
  services: [
    'Full Body Massage (60 min)',
    'Facial Treatment (30 min)',
    'Manicure & Pedicure',
    'Herbal Tea & Refreshments',
  ],
};

const reviews = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    text: 'Absolutely divine experience! The massage was incredible and the staff were so professional.',
    date: '2 days ago',
  },
  {
    id: '2',
    author: 'James K.',
    rating: 5,
    text: 'Best spa in Da Nang. Clean, peaceful atmosphere and skilled therapists.',
    date: '1 week ago',
  },
];

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'vi', label: 'VI', flag: '🇻🇳' },
  { code: 'ko', label: 'KO', flag: '🇰🇷' },
  { code: 'zh', label: 'ZH', flag: '🇨🇳' },
];

const currencies = ['VND', 'USD', 'EUR'];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function formatPrice(price: number, currency: string): string {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  } else if (currency === 'USD') {
    return '$' + (price / 24000).toFixed(0);
  } else {
    return '€' + (price / 26000).toFixed(0);
  }
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// =============================================================================
// ICONS (SVG Components)
// =============================================================================

const Icons = {
  Home: ({ className }: { className?: string }) => (
    <svg
      className={className}
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
  Calendar: ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  ),
  Users: ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  ),
  Menu: ({ className }: { className?: string }) => (
    <svg
      className={className}
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
  Star: ({ className, filled }: { className?: string; filled?: boolean }) => (
    <svg
      className={className}
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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function WellnessHomePage() {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('VND');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-24">
      {/* ===== HEADER ===== */}
      <header className="glass sticky top-0 z-50 border-b border-[var(--cream-dark)]">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="shadow-soft relative h-10 w-10 overflow-hidden rounded-full bg-[var(--sage-light)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icons.Sparkles className="h-5 w-5 text-[var(--sage-hex)]" />
                </div>
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-[var(--charcoal)]">
                  {business.name}
                </h1>
                <p className="text-xs text-[var(--charcoal-muted)]">{business.tagline}</p>
              </div>
            </div>

            {/* Language + Currency */}
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-[var(--cream-dark)] bg-white/50 px-2 py-1 text-xs font-medium text-[var(--charcoal)] focus:border-[var(--sage-hex)] focus:outline-none focus:ring-1 focus:ring-[var(--sage-hex)]"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-[var(--cream-dark)] bg-white/50 px-2 py-1 text-xs font-medium text-[var(--charcoal)] focus:border-[var(--sage-hex)] focus:outline-none focus:ring-1 focus:ring-[var(--sage-hex)]"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4">
        {/* ===== CATEGORY PILLS ===== */}
        <section className="animate-fade-in-up mb-6">
          <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`hover-lift flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'shadow-soft bg-[var(--sage-hex)] text-white'
                    : 'shadow-soft bg-white text-[var(--charcoal)] hover:bg-[var(--sage-light)]'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ===== FEATURED SERVICES ===== */}
        <section className="animate-fade-in-up mb-8 delay-100">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--charcoal)]">
              Featured Services
            </h2>
            <Link
              href="/services"
              className="flex items-center gap-1 text-sm font-medium text-[var(--sage-hex)] hover:text-[var(--sage-dark)]"
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

                  {/* Rating Badge */}
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-[var(--charcoal)] backdrop-blur-sm">
                    <Icons.Star className="h-3 w-3 text-[var(--gold)]" filled />
                    {service.rating}
                  </div>

                  {/* Category Badge */}
                  <div
                    className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{
                      backgroundColor: categories.find((c) => c.id === service.category)?.color,
                    }}
                  >
                    {categories.find((c) => c.id === service.category)?.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="font-display mb-1 line-clamp-1 text-base font-semibold text-[var(--charcoal)]">
                    {service.name}
                  </h3>
                  <div className="mb-2 flex items-center gap-2 text-xs text-[var(--charcoal-muted)]">
                    <Icons.Clock className="h-3.5 w-3.5" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-[var(--sage-hex)]">
                        {formatPrice(service.price, currency)}
                      </span>
                      {service.originalPrice && (
                        <span className="text-xs text-[var(--charcoal-muted)] line-through">
                          {formatPrice(service.originalPrice, currency)}
                        </span>
                      )}
                    </div>
                    <button className="rounded-lg bg-[var(--sage-hex)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[var(--sage-dark)]">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MEET OUR TEAM ===== */}
        <section className="animate-fade-in-up mb-8 delay-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--charcoal)]">
              Meet Our Team
            </h2>
            <Link
              href="/staff"
              className="flex items-center gap-1 text-sm font-medium text-[var(--sage-hex)] hover:text-[var(--sage-dark)]"
            >
              View all
              <Icons.ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="hide-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {staff.map((member, index) => (
              <div
                key={member.id}
                className="shadow-soft hover-lift group w-40 shrink-0 snap-start rounded-xl bg-white p-3 text-center"
                style={{ animationDelay: `${250 + index * 50}ms` }}
              >
                <div className="relative mx-auto mb-2 h-20 w-20 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display text-sm font-semibold text-[var(--charcoal)]">
                  {member.name}
                </h3>
                <p className="mb-2 line-clamp-1 text-xs text-[var(--charcoal-muted)]">
                  {member.specialty}
                </p>
                <div className="mb-2 flex justify-center gap-1">
                  {member.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded bg-[var(--sage-light)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--sage-dark)]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs">
                  <Icons.Star className="h-3 w-3 text-[var(--gold)]" filled />
                  <span className="font-semibold text-[var(--charcoal)]">{member.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== VIP PACKAGE ===== */}
        <section className="animate-fade-in-up mb-8 delay-300">
          <div className="shadow-soft-lg relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--charcoal)] to-[var(--charcoal-light)] p-5 text-white">
            {/* Decorative elements */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--gold)] opacity-10" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[var(--sage-hex)] opacity-10" />

            <div className="relative">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 text-xs font-bold text-[var(--charcoal)]">
                  VIP
                </span>
                <span className="text-xs text-white/70">Limited Offer</span>
              </div>
              <h3 className="font-display text-xl font-semibold">{vipPackage.name}</h3>

              <div className="my-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--gold)]">
                  {formatPrice(vipPackage.price, currency)}
                </span>
                <span className="text-sm text-white/50 line-through">
                  {formatPrice(vipPackage.originalPrice, currency)}
                </span>
                <span className="rounded-full bg-[var(--sage-hex)] px-2 py-0.5 text-xs font-bold">
                  Save {Math.round((1 - vipPackage.price / vipPackage.originalPrice) * 100)}%
                </span>
              </div>

              <ul className="mb-4 space-y-1.5">
                {vipPackage.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--sage-hex)] text-[10px]">
                      ✓
                    </span>
                    {service}
                  </li>
                ))}
              </ul>

              <button className="w-full rounded-xl bg-[var(--gold)] py-3 text-sm font-bold text-[var(--charcoal)] shadow-lg transition-all hover:bg-[#D4B46E] hover:shadow-xl active:scale-[0.98]">
                Book VIP Package
              </button>
            </div>
          </div>
        </section>

        {/* ===== REVIEWS ===== */}
        <section className="animate-fade-in-up delay-400 mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--charcoal)]">
              Guest Reviews
            </h2>
            <Link
              href="/reviews"
              className="flex items-center gap-1 text-sm font-medium text-[var(--sage-hex)] hover:text-[var(--sage-dark)]"
            >
              See all
              <Icons.ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Rating Summary */}
          <div className="shadow-soft mb-4 flex items-center gap-4 rounded-xl bg-white p-4">
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--charcoal)]">
                {business.rating}
              </div>
              <div className="flex justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icons.Star
                    key={star}
                    className="h-4 w-4 text-[var(--gold)]"
                    filled={star <= Math.round(business.rating)}
                  />
                ))}
              </div>
              <div className="mt-1 text-xs text-[var(--charcoal-muted)]">
                {business.reviewCount} reviews
              </div>
            </div>
            <div className="h-16 w-px bg-[var(--cream-dark)]" />
            <div className="flex-1 text-sm text-[var(--charcoal-muted)]">
              Rated <strong className="text-[var(--charcoal)]">Excellent</strong> by guests who
              loved our serene atmosphere and skilled therapists.
            </div>
          </div>

          {/* Review Cards */}
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="shadow-soft rounded-xl bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-light)] text-sm font-semibold text-[var(--sage-hex)]">
                      {review.author.charAt(0)}
                    </div>
                    <span className="font-medium text-[var(--charcoal)]">{review.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icons.Star
                        key={star}
                        className="h-3 w-3 text-[var(--gold)]"
                        filled={star <= review.rating}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--charcoal-light)]">{review.text}</p>
                <p className="mt-2 text-xs text-[var(--charcoal-muted)]">{review.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== LOCATION & HOURS ===== */}
        <section className="animate-fade-in-up mb-8 delay-500">
          <h2 className="font-display mb-4 text-xl font-semibold text-[var(--charcoal)]">
            Visit Us
          </h2>

          <div className="shadow-soft overflow-hidden rounded-xl bg-white">
            {/* Map Preview */}
            <div className="relative h-36 bg-[var(--sage-light)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Icons.MapPin className="animate-float h-12 w-12 text-[var(--sage-hex)]" />
              </div>
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-soft absolute bottom-2 right-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[var(--sage-hex)] hover:bg-[var(--sage-light)]"
              >
                Open in Maps
              </a>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="mb-3 flex items-start gap-3">
                <Icons.MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sage-hex)]" />
                <p className="text-sm text-[var(--charcoal)]">{business.address}</p>
              </div>
              <div className="mb-4 flex items-center gap-3">
                <Icons.Clock className="h-5 w-5 shrink-0 text-[var(--sage-hex)]" />
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
                  href="https://wa.me/84123456789"
                  className="flex flex-col items-center gap-1 rounded-lg bg-green-50 py-2.5 text-green-600 transition-colors hover:bg-green-100"
                >
                  <span className="text-lg">💬</span>
                  <span className="text-xs font-medium">WhatsApp</span>
                </a>
                <a
                  href="https://zalo.me/84123456789"
                  className="flex flex-col items-center gap-1 rounded-lg bg-blue-50 py-2.5 text-blue-600 transition-colors hover:bg-blue-100"
                >
                  <span className="text-lg">📱</span>
                  <span className="text-xs font-medium">Zalo</span>
                </a>
                <a
                  href="tel:+84123456789"
                  className="flex flex-col items-center gap-1 rounded-lg bg-[var(--sage-light)] py-2.5 text-[var(--sage-hex)] transition-colors hover:bg-[var(--sage-hex)] hover:text-white"
                >
                  <Icons.Phone className="h-5 w-5" />
                  <span className="text-xs font-medium">Call</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== BOTTOM NAVIGATION ===== */}
      <nav className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white/95 backdrop-blur-lg">
        <div className="flex h-16 items-center justify-around px-2">
          <NavItem href="/" icon={<Icons.Home className="h-6 w-6" />} label="Home" active />
          <NavItem
            href="/services"
            icon={<Icons.Services className="h-6 w-6" />}
            label="Services"
          />
          <NavItemCenter href="/book" />
          <NavItem href="/staff" icon={<Icons.Users className="h-6 w-6" />} label="Team" />
          <NavItem href="/more" icon={<Icons.Menu className="h-6 w-6" />} label="More" />
        </div>
      </nav>
    </div>
  );
}

// =============================================================================
// NAV COMPONENTS
// =============================================================================

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
        active
          ? 'text-[var(--sage-hex)]'
          : 'text-[var(--charcoal-muted)] hover:text-[var(--sage-hex)]'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}

function NavItemCenter({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="relative -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sage-hex)] text-white shadow-lg transition-all hover:bg-[var(--sage-dark)] hover:shadow-xl active:scale-95"
    >
      <Icons.Calendar className="h-6 w-6" />
    </Link>
  );
}
