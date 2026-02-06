'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

/* =============================================================================
   TYPES
   ============================================================================= */

interface Workshop {
  slug: string;
  name: string;
  operator: string;
  category: string;
  area: string;
  areaSlug: string;
  price: number;
  duration: string;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  availability: 'today' | 'tomorrow' | 'booked';
  image: string;
}

/* =============================================================================
   CONSTANTS
   ============================================================================= */

const CATEGORIES = [
  { key: 'all', label: 'All', emoji: '', color: 'var(--terracotta)' },
  {
    key: 'cooking',
    label: 'Cooking',
    emoji: '\u{1F468}\u200D\u{1F373}',
    color: 'var(--cat-cooking)',
  },
  { key: 'craft', label: 'Crafts', emoji: '\u{1F3EE}', color: 'var(--cat-craft)' },
  { key: 'art', label: 'Art', emoji: '\u{1F3A8}', color: 'var(--cat-art)' },
  { key: 'jewelry', label: 'Jewelry', emoji: '\u{1F48E}', color: 'var(--cat-jewelry)' },
  { key: 'bamboo', label: 'Bamboo', emoji: '\u{1F38B}', color: 'var(--cat-bamboo)' },
  { key: 'martial-arts', label: 'Martial Arts', emoji: '\u{1F94B}', color: 'var(--cat-martial)' },
  { key: 'dance', label: 'Dance', emoji: '\u{1F483}', color: 'var(--cat-dance)' },
  { key: 'coffee', label: 'Coffee', emoji: '\u2615', color: 'var(--cat-coffee)' },
  { key: 'ao-dai', label: 'Ao Dai', emoji: '\u{1F457}', color: 'var(--cat-fashion)' },
  { key: 'food-tour', label: 'Food Tours', emoji: '\u{1F35C}', color: 'var(--cat-food-tour)' },
];

const AREAS = [
  { key: 'all', label: 'All Areas' },
  { key: 'hoi-an', label: 'Hoi An' },
  { key: 'da-nang', label: 'Da Nang' },
  { key: 'thanh-ha', label: 'Thanh Ha' },
  { key: 'tra-que', label: 'Tra Que' },
  { key: 'an-bang', label: 'An Bang' },
];

const SORT_OPTIONS = [
  { key: 'rating', label: 'Rating' },
  { key: 'price-low', label: 'Price Low' },
  { key: 'price-high', label: 'Price High' },
  { key: 'duration', label: 'Duration' },
];

const LANGUAGE_FLAGS: Record<string, string> = {
  EN: '\u{1F1EC}\u{1F1E7}',
  VI: '\u{1F1FB}\u{1F1F3}',
  KO: '\u{1F1F0}\u{1F1F7}',
  ZH: '\u{1F1E8}\u{1F1F3}',
};

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const WORKSHOPS: Workshop[] = [
  {
    slug: 'traditional-pho-making',
    name: 'Traditional Pho Making',
    operator: "Chef Lan's Kitchen",
    category: 'cooking',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 350000,
    duration: '2.5h',
    durationMinutes: 150,
    rating: 4.9,
    reviewCount: 67,
    skillLevel: 'beginner',
    languages: ['EN', 'VI'],
    availability: 'today',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=340&fit=crop',
  },
  {
    slug: 'lantern-making',
    name: 'Hoi An Lantern Making',
    operator: "Minh's Lantern Workshop",
    category: 'craft',
    area: 'Hoi An Old Town',
    areaSlug: 'hoi-an',
    price: 250000,
    duration: '2h',
    durationMinutes: 120,
    rating: 4.8,
    reviewCount: 124,
    skillLevel: 'beginner',
    languages: ['EN', 'VI', 'KO'],
    availability: 'today',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=340&fit=crop',
  },
  {
    slug: 'thanh-ha-pottery',
    name: 'Thanh Ha Pottery Village',
    operator: 'Master Duc Pottery',
    category: 'craft',
    area: 'Thanh Ha',
    areaSlug: 'thanh-ha',
    price: 400000,
    duration: '3h',
    durationMinutes: 180,
    rating: 4.7,
    reviewCount: 52,
    skillLevel: 'beginner',
    languages: ['EN', 'VI'],
    availability: 'tomorrow',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=340&fit=crop',
  },
  {
    slug: 'vietnamese-coffee',
    name: 'Vietnamese Coffee Workshop',
    operator: 'Saigon Coffee Lab',
    category: 'coffee',
    area: 'Da Nang',
    areaSlug: 'da-nang',
    price: 200000,
    duration: '1.5h',
    durationMinutes: 90,
    rating: 4.9,
    reviewCount: 89,
    skillLevel: 'beginner',
    languages: ['EN', 'VI'],
    availability: 'today',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=340&fit=crop',
  },
  {
    slug: 'watercolor-hoi-an',
    name: 'Watercolor Painting Hoi An',
    operator: 'Trang Art Studio',
    category: 'art',
    area: 'Hoi An Old Town',
    areaSlug: 'hoi-an',
    price: 500000,
    duration: '3h',
    durationMinutes: 180,
    rating: 4.8,
    reviewCount: 38,
    skillLevel: 'intermediate',
    languages: ['EN'],
    availability: 'tomorrow',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=340&fit=crop',
  },
  {
    slug: 'silk-weaving',
    name: 'Silk Weaving Experience',
    operator: 'Hoi An Silk Village',
    category: 'craft',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 300000,
    duration: '2h',
    durationMinutes: 120,
    rating: 4.6,
    reviewCount: 45,
    skillLevel: 'beginner',
    languages: ['EN', 'VI', 'KO'],
    availability: 'today',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=340&fit=crop',
  },
  {
    slug: 'vovinam-class',
    name: 'Vovinam Martial Arts Class',
    operator: 'Master Huy Dojo',
    category: 'martial-arts',
    area: 'Da Nang',
    areaSlug: 'da-nang',
    price: 150000,
    duration: '1h',
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 31,
    skillLevel: 'beginner',
    languages: ['EN', 'VI'],
    availability: 'today',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=340&fit=crop',
  },
  {
    slug: 'food-tour-hoi-an',
    name: 'Hoi An Street Food Tour',
    operator: 'Taste of Hoi An',
    category: 'food-tour',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 600000,
    duration: '4h',
    durationMinutes: 240,
    rating: 5.0,
    reviewCount: 76,
    skillLevel: 'beginner',
    languages: ['EN', 'VI', 'KO', 'ZH'],
    availability: 'today',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=340&fit=crop',
  },
  {
    slug: 'silver-jewelry',
    name: 'Silver Jewelry Making',
    operator: 'Bac Artisan Studio',
    category: 'jewelry',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 700000,
    duration: '3h',
    durationMinutes: 180,
    rating: 4.7,
    reviewCount: 28,
    skillLevel: 'intermediate',
    languages: ['EN', 'VI'],
    availability: 'booked',
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d8e8e3b5?w=600&h=340&fit=crop',
  },
  {
    slug: 'bamboo-basket',
    name: 'Bamboo Basket Weaving',
    operator: 'Tra Que Village Co-op',
    category: 'bamboo',
    area: 'Tra Que',
    areaSlug: 'tra-que',
    price: 180000,
    duration: '1.5h',
    durationMinutes: 90,
    rating: 4.5,
    reviewCount: 19,
    skillLevel: 'beginner',
    languages: ['EN', 'VI'],
    availability: 'tomorrow',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=340&fit=crop',
  },
  {
    slug: 'ao-dai-experience',
    name: 'Ao Dai Tailoring Experience',
    operator: 'Miss Saigon Atelier',
    category: 'ao-dai',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 800000,
    duration: '4h',
    durationMinutes: 240,
    rating: 4.8,
    reviewCount: 33,
    skillLevel: 'beginner',
    languages: ['EN', 'VI', 'KO'],
    availability: 'tomorrow',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=340&fit=crop',
  },
  {
    slug: 'banh-mi-class',
    name: 'Banh Mi Masterclass',
    operator: "Madam Khanh's Kitchen",
    category: 'cooking',
    area: 'Da Nang',
    areaSlug: 'da-nang',
    price: 280000,
    duration: '2h',
    durationMinutes: 120,
    rating: 4.6,
    reviewCount: 41,
    skillLevel: 'beginner',
    languages: ['EN', 'VI'],
    availability: 'today',
    image: 'https://images.unsplash.com/photo-1600688640154-9619e002df30?w=600&h=340&fit=crop',
  },
];

/* =============================================================================
   HELPERS
   ============================================================================= */

import { formatPrice as _fp } from '@gudbro/utils';
function formatPrice(vnd: number): string {
  return _fp(vnd, 'VND');
}

function getCategoryInfo(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function WorkshopsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeArea, setActiveArea] = useState('all');
  const [activeSort, setActiveSort] = useState('rating');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredWorkshops = useMemo(() => {
    const results = WORKSHOPS.filter((w) => {
      // Category filter
      if (activeCategory !== 'all' && w.category !== activeCategory) return false;

      // Area filter
      if (activeArea !== 'all' && w.areaSlug !== activeArea) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          w.name.toLowerCase().includes(q) ||
          w.operator.toLowerCase().includes(q) ||
          w.area.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });

    // Sort
    switch (activeSort) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        results.sort((a, b) => a.durationMinutes - b.durationMinutes);
        break;
    }

    return results;
  }, [searchQuery, activeCategory, activeArea, activeSort]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveArea('all');
    setActiveSort('rating');
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--ivory)' }}>
      <main className="mx-auto max-w-lg">
        {/* ================================================================
            STICKY SEARCH BAR
            ================================================================ */}
        <div
          className="glass sticky top-0 z-40 px-4 pb-3 pt-4"
          style={{ borderBottom: '1px solid var(--sand)' }}
        >
          {/* Page Title */}
          <div
            className={`mb-3 flex items-center gap-3 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <Link
              href="/"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ background: 'var(--sand)' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--clay)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <h1
              className="font-display text-xl"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
            >
              Workshops
            </h1>
          </div>

          {/* Search Input */}
          <div className={`relative ${mounted ? 'animate-fade-in-up delay-1' : 'opacity-0'}`}>
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--charcoal-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workshops..."
              className="w-full rounded-xl border-0 py-3 pl-11 pr-10 text-sm outline-none"
              style={{
                background: 'white',
                color: 'var(--charcoal)',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 1px 4px rgba(45, 42, 38, 0.06), inset 0 0 0 1px var(--sand)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ background: 'var(--sand)' }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--charcoal-muted)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="px-4">
          {/* ================================================================
              CATEGORY FILTER PILLS
              ================================================================ */}
          <section className={`mb-3 mt-4 ${mounted ? 'animate-fade-in-up delay-2' : 'opacity-0'}`}>
            <div className="hide-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className="flex-shrink-0 snap-start whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-all"
                    style={{
                      background: isActive ? cat.color : 'white',
                      color: isActive ? 'white' : 'var(--charcoal)',
                      boxShadow: isActive
                        ? '0 2px 8px rgba(194, 112, 62, 0.3)'
                        : '0 1px 3px rgba(45, 42, 38, 0.06)',
                    }}
                  >
                    {cat.emoji ? `${cat.emoji} ${cat.label}` : cat.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ================================================================
              AREA FILTER CHIPS
              ================================================================ */}
          <section className={`mb-3 ${mounted ? 'animate-fade-in-up delay-3' : 'opacity-0'}`}>
            <div className="hide-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
              {AREAS.map((area) => {
                const isActive = activeArea === area.key;
                return (
                  <button
                    key={area.key}
                    onClick={() => setActiveArea(area.key)}
                    className="flex-shrink-0 snap-start whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                    style={{
                      background: isActive ? 'rgba(194, 112, 62, 0.1)' : 'transparent',
                      color: isActive ? 'var(--terracotta)' : 'var(--charcoal-muted)',
                      border: isActive
                        ? '1.5px solid var(--terracotta)'
                        : '1.5px solid var(--sand)',
                    }}
                  >
                    {area.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ================================================================
              SORT & RESULTS COUNT ROW
              ================================================================ */}
          <section
            className={`mb-4 flex items-center justify-between ${mounted ? 'animate-fade-in-up delay-4' : 'opacity-0'}`}
          >
            <p className="text-xs font-medium" style={{ color: 'var(--charcoal-muted)' }}>
              {filteredWorkshops.length} workshop{filteredWorkshops.length !== 1 ? 's' : ''} found
            </p>

            <div className="flex gap-1.5">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setActiveSort(opt.key)}
                  className="rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all"
                  style={{
                    background: activeSort === opt.key ? 'var(--charcoal)' : 'var(--cream)',
                    color: activeSort === opt.key ? 'white' : 'var(--charcoal-muted)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* ================================================================
              WORKSHOP CARDS
              ================================================================ */}
          <section className={`${mounted ? 'animate-fade-in-up delay-5' : 'opacity-0'}`}>
            {filteredWorkshops.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredWorkshops.map((workshop) => {
                  const catInfo = getCategoryInfo(workshop.category);

                  return (
                    <Link
                      key={workshop.slug}
                      href={`/workshops/${workshop.slug}`}
                      className="card card-hover block"
                    >
                      {/* Hero Image */}
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: '16/9' }}
                      >
                        <img
                          src={workshop.image}
                          alt={workshop.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />

                        {/* Category badge */}
                        <span className="badge badge-amber absolute left-3 top-3">
                          {catInfo?.emoji} {catInfo?.label}
                        </span>

                        {/* Availability badge */}
                        {workshop.availability === 'today' && (
                          <span className="badge badge-sage absolute right-3 top-3">
                            Available today
                          </span>
                        )}
                        {workshop.availability === 'tomorrow' && (
                          <span
                            className="badge absolute right-3 top-3"
                            style={{
                              background: 'var(--sage-light)',
                              color: 'var(--sage-dark)',
                              opacity: 0.9,
                            }}
                          >
                            Available tomorrow
                          </span>
                        )}
                        {workshop.availability === 'booked' && (
                          <span
                            className="badge absolute right-3 top-3"
                            style={{
                              background: 'rgba(45, 42, 38, 0.6)',
                              color: 'rgba(255,255,255,0.85)',
                            }}
                          >
                            Fully booked
                          </span>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-4">
                        {/* Workshop Name */}
                        <h2
                          className="font-display mb-1 text-base leading-tight"
                          style={{ color: 'var(--clay)' }}
                        >
                          {workshop.name}
                        </h2>

                        {/* Operator */}
                        <p className="mb-2 text-xs" style={{ color: 'var(--charcoal-light)' }}>
                          {workshop.operator}
                        </p>

                        {/* Rating */}
                        <div className="mb-2.5 flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill={
                                  i < Math.floor(workshop.rating)
                                    ? 'var(--amber)'
                                    : i < workshop.rating
                                      ? 'var(--amber-light)'
                                      : 'var(--sand)'
                                }
                                stroke="none"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: 'var(--amber-dark)' }}
                          >
                            {workshop.rating}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                            ({workshop.reviewCount})
                          </span>
                        </div>

                        {/* Duration + Price Row */}
                        <div className="mb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Duration */}
                            <div className="flex items-center gap-1">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--charcoal-muted)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span className="text-xs" style={{ color: 'var(--charcoal-light)' }}>
                                {workshop.duration}
                              </span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-1">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--charcoal-muted)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              <span className="text-xs" style={{ color: 'var(--charcoal-light)' }}>
                                {workshop.area}
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <span
                            className="text-sm font-bold"
                            style={{ color: 'var(--terracotta)' }}
                          >
                            {formatPrice(workshop.price)}
                          </span>
                        </div>

                        {/* Languages + Skill Level Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {workshop.languages.map((lang) => (
                              <span key={lang} className="text-sm" title={lang}>
                                {LANGUAGE_FLAGS[lang] || lang}
                              </span>
                            ))}
                          </div>

                          {workshop.skillLevel !== 'beginner' && (
                            <span
                              className="badge"
                              style={{
                                background:
                                  workshop.skillLevel === 'intermediate'
                                    ? 'var(--amber-light)'
                                    : 'var(--terracotta-light)',
                                color:
                                  workshop.skillLevel === 'intermediate'
                                    ? 'var(--amber-dark)'
                                    : 'var(--terracotta-dark)',
                                fontSize: '10px',
                              }}
                            >
                              {workshop.skillLevel.charAt(0).toUpperCase() +
                                workshop.skillLevel.slice(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              /* ================================================================
                  EMPTY STATE
                  ================================================================ */
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16"
                style={{ background: 'white' }}
              >
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: 'var(--sand)' }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--clay)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <p className="font-display mb-1 text-sm" style={{ color: 'var(--charcoal)' }}>
                  No workshops found
                </p>
                <p
                  className="mb-4 max-w-[240px] text-center text-xs"
                  style={{ color: 'var(--charcoal-muted)' }}
                >
                  Try different filters or search terms to discover workshops near you
                </p>
                <button
                  onClick={clearFilters}
                  className="hover-lift rounded-xl px-5 py-2.5 text-xs font-semibold transition-all"
                  style={{
                    background: 'var(--terracotta)',
                    color: 'white',
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
