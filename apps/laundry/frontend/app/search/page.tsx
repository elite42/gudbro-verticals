'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const allServices = [
  {
    id: 's1',
    slug: 'wash-fold-standard',
    name: 'Standard Wash & Fold',
    description: 'Everyday laundry washed, dried, and neatly folded. Up to 24h turnaround.',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop',
    category: 'Wash & Fold',
    price: 25000,
    unit: 'kg',
    turnaround: '24h',
  },
  {
    id: 's2',
    slug: 'wash-fold-bedsheet',
    name: 'Bedsheet Set',
    description: 'Complete bedsheet set including pillowcases, freshly washed and folded.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    category: 'Wash & Fold',
    price: 30000,
    unit: 'set',
    turnaround: '24h',
  },
  {
    id: 's3',
    slug: 'wash-fold-towel',
    name: 'Towel',
    description: 'Bath and hand towels washed with fabric softener for maximum fluffiness.',
    image: 'https://images.unsplash.com/photo-1583845112203-29329902332e?w=400&h=300&fit=crop',
    category: 'Wash & Fold',
    price: 15000,
    unit: 'item',
    turnaround: '24h',
  },
  {
    id: 's4',
    slug: 'wash-fold-delicate',
    name: 'Delicate Hand Wash',
    description: 'Gentle hand washing for delicate fabrics like silk, lace, and cashmere.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    category: 'Wash & Fold',
    price: 45000,
    unit: 'item',
    turnaround: '48h',
  },
  {
    id: 's5',
    slug: 'wash-iron-weight',
    name: 'Wash & Iron by Weight',
    description: 'Full service: washed, pressed, and returned on hangers ready to wear.',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=400&h=300&fit=crop',
    category: 'Wash & Iron',
    price: 35000,
    unit: 'kg',
    turnaround: '24-48h',
  },
  {
    id: 's6',
    slug: 'wash-iron-shirt',
    name: 'Shirt Wash & Iron',
    description: 'Professional shirt laundering with crisp press finish.',
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&h=300&fit=crop',
    category: 'Wash & Iron',
    price: 20000,
    unit: 'item',
    turnaround: '24h',
  },
  {
    id: 's7',
    slug: 'wash-iron-pants',
    name: 'Pants Wash & Iron',
    description: 'Trousers and pants washed and pressed with sharp creases.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop',
    category: 'Wash & Iron',
    price: 25000,
    unit: 'item',
    turnaround: '24h',
  },
  {
    id: 's8',
    slug: 'wash-iron-dress',
    name: 'Dress Wash & Iron',
    description: 'Dresses carefully washed and pressed, ready for any occasion.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop',
    category: 'Wash & Iron',
    price: 35000,
    unit: 'item',
    turnaround: '24-48h',
  },
  {
    id: 's9',
    slug: 'dry-clean-suit',
    name: 'Suit Dry Clean (2-piece)',
    description: 'Professional dry cleaning for suits. Jacket and trousers treated and pressed.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73b1160fdc7?w=400&h=300&fit=crop',
    category: 'Dry Clean',
    price: 80000,
    unit: 'item',
    turnaround: '48-72h',
  },
  {
    id: 's10',
    slug: 'dry-clean-jacket',
    name: 'Jacket Dry Clean',
    description: 'Expert dry cleaning for jackets, blazers, and coats.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop',
    category: 'Dry Clean',
    price: 60000,
    unit: 'item',
    turnaround: '48-72h',
  },
  {
    id: 's11',
    slug: 'dry-clean-dress',
    name: 'Dress Dry Clean',
    description: 'Delicate dry cleaning for formal and evening dresses.',
    image: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=300&fit=crop',
    category: 'Dry Clean',
    price: 50000,
    unit: 'item',
    turnaround: '48-72h',
  },
  {
    id: 's12',
    slug: 'iron-only',
    name: 'Iron Only',
    description: 'Quick pressing service for already clean clothes.',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=400&h=300&fit=crop',
    category: 'Iron Only',
    price: 10000,
    unit: 'item',
    turnaround: '4-6h',
  },
  {
    id: 's13',
    slug: 'shoes-standard',
    name: 'Shoe Standard Clean',
    description: 'Surface cleaning, deodorizing, and conditioning for everyday shoes.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    category: 'Shoes',
    price: 60000,
    unit: 'pair',
    turnaround: '48h',
  },
  {
    id: 's14',
    slug: 'shoes-sneaker-deep',
    name: 'Sneaker Deep Clean',
    description: 'Full deep clean for sneakers: sole, upper, laces, and insole treatment.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
    category: 'Shoes',
    price: 80000,
    unit: 'pair',
    turnaround: '72h',
  },
  {
    id: 's15',
    slug: 'express-wash-fold',
    name: 'Express Wash & Fold',
    description: 'Same-day rush service. Drop off by 10am, ready by 6pm. +50% surcharge.',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=300&fit=crop',
    category: 'Express',
    price: 37500,
    unit: 'kg',
    turnaround: '6-8h',
  },
];

const popularSearches = ['Wash', 'Iron', 'Dry Clean', 'Shoes', 'Express', 'Bedsheet'];

import { formatPriceCompact } from '@gudbro/utils';
function formatPrice(price: number): string {
  return formatPriceCompact(price, 'VND');
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return allServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;

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
          <h1 className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)' }}>
            Fresh & Clean Laundry
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
        {/* Search Input */}
        <div className="relative">
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--charcoal-muted)' }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="shadow-soft focus:shadow-soft-lg w-full rounded-xl bg-white py-3.5 pl-11 pr-10 text-sm font-medium outline-none transition-shadow"
            style={{
              color: 'var(--charcoal)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'transparent',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--blue)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
            }}
          />
          {hasQuery && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              style={{ color: 'var(--charcoal-muted)' }}
              aria-label="Clear search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results / States */}
        {!hasQuery && (
          <div className="animate-fade-in-up">
            {/* Empty state */}
            <div className="space-y-4 py-12 text-center">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: 'var(--blue-light)' }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--blue)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                Start typing to search
              </p>
            </div>

            {/* Popular searches */}
            <div className="space-y-3">
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="shadow-soft hover-lift rounded-full bg-white px-4 py-2 text-sm font-medium transition-all"
                    style={{ color: 'var(--charcoal-light)' }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasQuery && results.length === 0 && (
          <div className="animate-fade-in space-y-3 py-16 text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: 'var(--cloud-dark)' }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--charcoal-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="m8 8 6 6" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--charcoal-muted)' }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

        {hasQuery && results.length > 0 && (
          <div className="space-y-3">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--charcoal-muted)' }}
            >
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {results.map((service, index) => (
                <div
                  key={service.id}
                  className="shadow-soft hover-lift animate-fade-in-up overflow-hidden rounded-xl bg-white"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="relative h-40">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                    <span
                      className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: 'var(--blue-light)',
                        color: 'var(--blue-dark)',
                      }}
                    >
                      {service.category}
                    </span>
                  </div>
                  <div className="space-y-2 p-4">
                    <h3
                      className="font-display text-sm font-bold"
                      style={{ color: 'var(--charcoal)' }}
                    >
                      {service.name}
                    </h3>
                    <p
                      className="line-clamp-2 text-xs leading-relaxed"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-bold" style={{ color: 'var(--blue-hex)' }}>
                        {formatPrice(service.price)}
                        <span
                          className="ml-0.5 text-xs font-normal"
                          style={{ color: 'var(--charcoal-muted)' }}
                        >
                          /{service.unit}
                        </span>
                      </span>
                      <Link
                        href={`https://wa.me/84935123456?text=Hi!%20I%27d%20like%20to%20order%20${encodeURIComponent(service.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: 'var(--blue-hex)' }}
                      >
                        Order on WhatsApp
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation provided by layout */}
    </div>
  );
}
