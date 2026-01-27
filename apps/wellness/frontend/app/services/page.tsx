'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const categories = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'massage', label: 'Massage', icon: '🧘', color: '#8BA888' },
  { id: 'hair', label: 'Hair', icon: '✂️', color: '#B8A898' },
  { id: 'nails', label: 'Nails', icon: '💅', color: '#E8B8B8' },
  { id: 'beauty', label: 'Beauty', icon: '✨', color: '#D4B8D4' },
  { id: 'barber', label: 'Barber', icon: '💈', color: '#8B7355' },
  { id: 'tattoo', label: 'Tattoo', icon: '🎨', color: '#5A5A5A' },
  { id: 'wellness', label: 'Wellness', icon: '🌿', color: '#A8C8D8' },
];

const allServices = [
  {
    id: '1',
    slug: 'traditional-vietnamese-massage',
    name: 'Traditional Vietnamese Massage',
    category: 'massage',
    duration: 90,
    price: 450000,
    originalPrice: 550000,
    rating: 4.9,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    description: 'A deeply relaxing full-body massage combining traditional Vietnamese techniques.',
    popular: true,
  },
  {
    id: '2',
    slug: 'hot-stone-therapy',
    name: 'Hot Stone Therapy',
    category: 'massage',
    duration: 120,
    price: 650000,
    rating: 5.0,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop',
    description: 'Heated basalt stones placed on key energy points for deep relaxation.',
  },
  {
    id: '3',
    slug: 'aromatherapy-massage',
    name: 'Aromatherapy Massage',
    category: 'massage',
    duration: 60,
    price: 380000,
    rating: 4.8,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&fit=crop',
    description: 'Essential oil massage for stress relief and mental clarity.',
  },
  {
    id: '4',
    slug: 'thai-massage',
    name: 'Thai Massage',
    category: 'massage',
    duration: 90,
    price: 500000,
    rating: 4.7,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&h=300&fit=crop',
    description: 'Traditional Thai stretching and acupressure techniques for flexibility.',
  },
  {
    id: '5',
    slug: 'luxury-hair-treatment',
    name: 'Luxury Hair Treatment',
    category: 'hair',
    duration: 60,
    price: 350000,
    rating: 4.7,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    description: 'Deep conditioning treatment with premium products for silky, healthy hair.',
  },
  {
    id: '6',
    slug: 'haircut-styling',
    name: 'Haircut & Styling',
    category: 'hair',
    duration: 45,
    price: 250000,
    rating: 4.6,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
    description: 'Precision cut and professional styling tailored to your features.',
  },
  {
    id: '7',
    slug: 'keratin-treatment',
    name: 'Keratin Treatment',
    category: 'hair',
    duration: 120,
    price: 800000,
    rating: 4.9,
    reviewCount: 32,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
    description: 'Professional keratin straightening for smooth, frizz-free hair.',
  },
  {
    id: '8',
    slug: 'gel-nail-art',
    name: 'Gel Nail Art Set',
    category: 'nails',
    duration: 75,
    price: 280000,
    rating: 4.8,
    reviewCount: 93,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    description: 'Custom gel nail art with long-lasting shine and creative designs.',
    popular: true,
  },
  {
    id: '9',
    slug: 'classic-manicure',
    name: 'Classic Manicure',
    category: 'nails',
    duration: 45,
    price: 150000,
    rating: 4.6,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop',
    description: 'Traditional manicure with cuticle care, shaping, and polish.',
  },
  {
    id: '10',
    slug: 'spa-pedicure',
    name: 'Spa Pedicure',
    category: 'nails',
    duration: 60,
    price: 200000,
    rating: 4.7,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=300&fit=crop',
    description: 'Luxurious foot soak, scrub, massage, and nail care.',
  },
  {
    id: '11',
    slug: 'hydra-facial',
    name: 'HydraFacial Treatment',
    category: 'beauty',
    duration: 60,
    price: 500000,
    rating: 4.9,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    description: 'Advanced facial treatment for deep cleansing and hydration.',
  },
  {
    id: '12',
    slug: 'eyelash-extensions',
    name: 'Eyelash Extensions',
    category: 'beauty',
    duration: 90,
    price: 400000,
    rating: 4.8,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&h=300&fit=crop',
    description: 'Natural-looking lash extensions for a glamorous, effortless look.',
  },
  {
    id: '13',
    slug: 'classic-shave',
    name: 'Classic Hot Towel Shave',
    category: 'barber',
    duration: 30,
    price: 180000,
    rating: 4.8,
    reviewCount: 44,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
    description: 'Traditional straight razor shave with hot towel treatment.',
  },
  {
    id: '14',
    slug: 'custom-tattoo',
    name: 'Custom Tattoo Design',
    category: 'tattoo',
    duration: 180,
    price: 1500000,
    rating: 4.9,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=300&fit=crop',
    description: 'Bespoke tattoo consultation and creation by our resident artist.',
  },
  {
    id: '15',
    slug: 'sauna-session',
    name: 'Herbal Sauna Session',
    category: 'wellness',
    duration: 45,
    price: 200000,
    rating: 4.6,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6e?w=400&h=300&fit=crop',
    description: 'Vietnamese herbal steam sauna for detox and relaxation.',
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

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currency] = useState('VND');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>(
    'popular'
  );

  const filteredServices = allServices
    .filter((s) => activeCategory === 'all' || s.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating;
    });

  const categoryCount =
    activeCategory === 'all'
      ? allServices.length
      : allServices.filter((s) => s.category === activeCategory).length;

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-24">
      {/* ===== HEADER ===== */}
      <header className="bg-[var(--cream)]/90 fixed left-0 right-0 top-0 z-50 border-b border-[var(--cream-dark)] backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </Link>
            <div>
              <h1 className="font-display text-lg font-semibold text-[var(--charcoal)]">
                Our Services
              </h1>
              <p className="text-xs text-[var(--charcoal-muted)]">
                {categoryCount} services available
              </p>
            </div>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-lg border border-[var(--cream-dark)] bg-white px-3 py-1.5 text-xs text-[var(--charcoal)] focus:outline-none focus:ring-1 focus:ring-[var(--sage-hex)]"
          >
            <option value="popular">Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low</option>
            <option value="price-desc">Price: High</option>
          </select>
        </div>
      </header>

      <main className="pt-16">
        {/* ===== CATEGORY TABS ===== */}
        <section className="border-b border-[var(--cream-dark)] bg-[var(--cream)]">
          <div className="hide-scrollbar flex gap-1 overflow-x-auto px-4 py-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'shadow-soft bg-[var(--sage-hex)] text-white'
                    : 'shadow-soft bg-white text-[var(--charcoal)] hover:bg-[var(--sage-light)]'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ===== SERVICES LIST ===== */}
        <section className="px-4 py-4">
          <div className="space-y-3">
            {filteredServices.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="animate-fade-in-up shadow-soft hover-lift group flex overflow-hidden rounded-xl bg-white"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative h-32 w-28 shrink-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge */}
                  <div
                    className="absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white"
                    style={{
                      backgroundColor:
                        categories.find((c) => c.id === service.category)?.color || '#8BA888',
                    }}
                  >
                    {categories.find((c) => c.id === service.category)?.label}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <div className="mb-1 flex items-start justify-between">
                      <h3 className="font-display line-clamp-1 text-[15px] font-semibold text-[var(--charcoal)]">
                        {service.name}
                      </h3>
                      {service.popular && (
                        <span className="ml-2 shrink-0 rounded-full bg-[var(--gold-light)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--gold)]">
                          HOT
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-2 text-xs text-[var(--charcoal-muted)]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Duration */}
                      <span className="flex items-center gap-1 text-xs text-[var(--charcoal-muted)]">
                        <svg
                          className="h-3.5 w-3.5"
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
                        {formatDuration(service.duration)}
                      </span>
                      {/* Rating */}
                      <span className="flex items-center gap-1 text-xs">
                        <svg
                          className="h-3.5 w-3.5 text-[var(--gold)]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <span className="font-medium text-[var(--charcoal)]">{service.rating}</span>
                        <span className="text-[var(--charcoal-muted)]">
                          ({service.reviewCount})
                        </span>
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-[var(--sage-hex)]">
                        {formatPrice(service.price, currency)}
                      </span>
                      {service.originalPrice && (
                        <span className="text-[10px] text-[var(--charcoal-muted)] line-through">
                          {formatPrice(service.originalPrice, currency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="py-16 text-center">
              <div className="mb-4 text-5xl">🌿</div>
              <h3 className="font-display mb-2 text-lg font-semibold text-[var(--charcoal)]">
                No services found
              </h3>
              <p className="text-sm text-[var(--charcoal-muted)]">
                Try selecting a different category
              </p>
            </div>
          )}
        </section>

        {/* ===== CTA BANNER ===== */}
        <section className="px-4 pb-4">
          <div className="shadow-soft-lg overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--charcoal)] to-[var(--charcoal-light)] p-5 text-white">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--sage-hex)] opacity-10" />
            <h3 className="font-display mb-2 text-lg font-semibold">
              Can&apos;t find what you need?
            </h3>
            <p className="mb-4 text-sm text-white/70">
              Contact us and we&apos;ll help you find the perfect treatment.
            </p>
            <div className="flex gap-2">
              <a
                href="https://wa.me/84123456789"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                WhatsApp
              </a>
              <a
                href="https://zalo.me/84123456789"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Zalo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ===== BOTTOM NAVIGATION ===== */}
      <nav className="pb-safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white px-6 pt-2">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link
            href="/"
            className="flex flex-col items-center py-2 text-[var(--charcoal-muted)] transition-all"
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <span className="flex scale-110 flex-col items-center py-2 text-[var(--sage-hex)]">
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </span>
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
            className="flex flex-col items-center py-2 text-[var(--charcoal-muted)] transition-all"
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
