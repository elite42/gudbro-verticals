'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { courses, passes, products, promotions } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

const popularSearches = [
  'Boxing',
  'Yoga',
  'Day Pass',
  'CrossFit',
  'Swimming',
  'T-Shirt',
  'Protein',
];

interface SearchResult {
  type: 'course' | 'pass' | 'product' | 'promotion';
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  price?: number;
}

function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  courses.forEach((c) => {
    if (
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'course',
        title: c.name,
        subtitle: `${c.category} · ${c.instructor}`,
        href: `/courses/${c.slug}`,
        image: c.image,
      });
    }
  });

  passes.forEach((p) => {
    if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
      results.push({
        type: 'pass',
        title: p.name,
        subtitle: p.duration,
        href: '/passes',
        price: p.price,
      });
    }
  });

  products.forEach((p) => {
    if (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
      results.push({
        type: 'product',
        title: p.name,
        subtitle: p.category,
        href: `/shop/${p.slug}`,
        image: p.image,
        price: p.price,
      });
    }
  });

  promotions.forEach((p) => {
    if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
      results.push({ type: 'promotion', title: p.title, subtitle: p.badge, href: '/promotions' });
    }
  });

  return results;
}

const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
  course: { label: 'Course', color: 'var(--orange-dark)', bg: 'var(--orange-light)' },
  pass: { label: 'Pass', color: 'var(--navy)', bg: 'var(--navy-light)' },
  product: { label: 'Product', color: '#166534', bg: '#DCFCE7' },
  promotion: { label: 'Promo', color: 'var(--gold)', bg: 'var(--yellow-light)' },
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchAll(query), [query]);

  return (
    <main className="mx-auto max-w-lg pb-24">
      {/* Header */}
      <div
        className="glass animate-slide-down sticky top-0 z-40 border-b px-4 py-3"
        style={{ borderColor: 'var(--cloud-dark)' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-full p-1.5 hover:bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--charcoal-muted)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search courses, passes, products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border py-2.5 pl-9 pr-8 text-sm"
              style={{ borderColor: 'var(--cloud-dark)' }}
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--charcoal-muted)"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 px-4">
        {!query.trim() ? (
          /* Popular Searches */
          <div className="animate-fade-in-up">
            <h2 className="mb-3 text-sm font-semibold" style={{ color: 'var(--charcoal-muted)' }}>
              Popular Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="shadow-soft hover-lift rounded-full bg-white px-3.5 py-1.5 text-sm font-medium"
                  style={{ color: 'var(--charcoal-light)' }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          /* No Results */
          <div className="animate-fade-in-up py-16 text-center">
            <span className="text-5xl">🔍</span>
            <p className="mt-3 text-sm font-medium" style={{ color: 'var(--charcoal-muted)' }}>
              No results for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
              Try a different search term.
            </p>
          </div>
        ) : (
          /* Results */
          <div className="space-y-2.5">
            <p className="text-xs font-medium" style={{ color: 'var(--charcoal-muted)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            {results.map((result, i) => (
              <Link
                key={`${result.type}-${result.title}-${i}`}
                href={result.href}
                className="shadow-soft hover-lift animate-fade-in-up flex items-center gap-3 rounded-2xl bg-white p-3"
                style={{ animationDelay: `${(i + 1) * 50}ms` }}
              >
                {result.image ? (
                  <div
                    className="h-12 w-12 flex-shrink-0 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${result.image})` }}
                  />
                ) : (
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: typeLabels[result.type].bg }}
                  >
                    <span className="text-lg">{result.type === 'pass' ? '🎫' : '🎁'}</span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{result.title}</span>
                    <span
                      className="flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                      style={{
                        background: typeLabels[result.type].bg,
                        color: typeLabels[result.type].color,
                      }}
                    >
                      {typeLabels[result.type].label}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                    {result.subtitle}
                  </span>
                </div>
                {result.price && (
                  <span
                    className="flex-shrink-0 text-sm font-bold"
                    style={{ color: 'var(--orange)' }}
                  >
                    {formatVNDPrice(result.price)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
