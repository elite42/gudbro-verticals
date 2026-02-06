'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

/* =============================================================================
   TYPES
   ============================================================================= */

interface Workshop {
  slug: string;
  name: string;
  category: string;
  categoryEmoji: string;
  area: string;
  areaSlug: string;
  price: number;
  duration: number;
  durationLabel: string;
  rating: number;
  reviews: number;
  image: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  shortDesc: string;
  operatorName: string;
  availability: string[];
}

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating' | 'duration';

/* =============================================================================
   HELPERS
   ============================================================================= */

import { formatPrice as _fp, formatPriceCompact } from '@gudbro/utils';
function formatPrice(vnd: number): string {
  return _fp(vnd, 'VND');
}

function formatPriceShort(vnd: number): string {
  return formatPriceCompact(vnd, 'VND');
}

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const WORKSHOPS: Workshop[] = [
  {
    slug: 'traditional-pho-making',
    name: 'Traditional Pho Making',
    category: 'Cooking',
    categoryEmoji: '\uD83D\uDC68\u200D\uD83C\uDF73',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 350000,
    duration: 2.5,
    durationLabel: '2.5h',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi'],
    shortDesc: "Master Vietnam's iconic soup from scratch with a local chef.",
    operatorName: 'Chef Minh',
    availability: ['today', 'tomorrow', 'this-week'],
  },
  {
    slug: 'lantern-making',
    name: 'Lantern Making Workshop',
    category: 'Crafts',
    categoryEmoji: '\uD83C\uDFEE',
    area: 'Hoi An Old Town',
    areaSlug: 'hoi-an-old-town',
    price: 250000,
    duration: 2,
    durationLabel: '2h',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi', 'ko'],
    shortDesc: 'Craft your own silk lantern in the ancient lantern quarter.',
    operatorName: 'Artisan Lan',
    availability: ['today', 'this-week'],
  },
  {
    slug: 'thanh-ha-pottery',
    name: 'Thanh Ha Pottery',
    category: 'Crafts',
    categoryEmoji: '\uD83C\uDFEE',
    area: 'Thanh Ha',
    areaSlug: 'thanh-ha',
    price: 400000,
    duration: 3,
    durationLabel: '3h',
    rating: 4.7,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi'],
    shortDesc: 'Shape clay on a traditional wheel in a 500-year-old pottery village.',
    operatorName: 'Master Duc',
    availability: ['tomorrow', 'this-week'],
  },
  {
    slug: 'vietnamese-coffee',
    name: 'Vietnamese Coffee Experience',
    category: 'Coffee',
    categoryEmoji: '\u2615',
    area: 'Da Nang',
    areaSlug: 'da-nang',
    price: 200000,
    duration: 1.5,
    durationLabel: '1.5h',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi', 'ko', 'zh'],
    shortDesc: 'From bean to cup -- brew ca phe sua da like a local barista.',
    operatorName: 'Barista Trang',
    availability: ['today', 'tomorrow', 'this-week'],
  },
  {
    slug: 'watercolor-hoi-an',
    name: 'Watercolor Hoi An',
    category: 'Art',
    categoryEmoji: '\uD83C\uDFA8',
    area: 'Hoi An Old Town',
    areaSlug: 'hoi-an-old-town',
    price: 500000,
    duration: 3,
    durationLabel: '3h',
    rating: 4.8,
    reviews: 62,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
    skillLevel: 'intermediate',
    languages: ['en', 'vi'],
    shortDesc: "Paint the ancient town's iconic yellow walls and lantern streets.",
    operatorName: 'Artist Hoa',
    availability: ['this-week'],
  },
  {
    slug: 'silk-weaving',
    name: 'Silk Weaving',
    category: 'Crafts',
    categoryEmoji: '\uD83C\uDFEE',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 300000,
    duration: 2,
    durationLabel: '2h',
    rating: 4.6,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
    skillLevel: 'intermediate',
    languages: ['en', 'vi'],
    shortDesc: 'Weave vibrant silk on traditional looms with skilled artisans.',
    operatorName: 'Weaver Thu',
    availability: ['tomorrow', 'this-week'],
  },
  {
    slug: 'vovinam-class',
    name: 'Vovinam Martial Arts',
    category: 'Martial Arts',
    categoryEmoji: '\uD83E\uDD4B',
    area: 'Da Nang',
    areaSlug: 'da-nang',
    price: 150000,
    duration: 1,
    durationLabel: '1h',
    rating: 4.9,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi'],
    shortDesc: "Learn Vietnam's national martial art from a certified master.",
    operatorName: 'Master Hung',
    availability: ['today', 'tomorrow', 'this-week'],
  },
  {
    slug: 'food-tour-hoi-an',
    name: 'Hoi An Food Tour',
    category: 'Food Tour',
    categoryEmoji: '\uD83C\uDF5C',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 600000,
    duration: 4,
    durationLabel: '4h',
    rating: 5.0,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi', 'ko'],
    shortDesc: "Taste 10+ local dishes on a guided walk through Hoi An's hidden alleys.",
    operatorName: 'Guide Bao',
    availability: ['today', 'this-week'],
  },
  {
    slug: 'silver-jewelry',
    name: 'Silver Jewelry Making',
    category: 'Jewelry',
    categoryEmoji: '\uD83D\uDC8E',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 700000,
    duration: 3,
    durationLabel: '3h',
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d9391946?w=600&h=400&fit=crop',
    skillLevel: 'intermediate',
    languages: ['en'],
    shortDesc: 'Forge your own silver ring or pendant with traditional tools.',
    operatorName: 'Jeweler Khanh',
    availability: ['this-week'],
  },
  {
    slug: 'bamboo-basket',
    name: 'Bamboo Basket Weaving',
    category: 'Bamboo',
    categoryEmoji: '\uD83C\uDF8B',
    area: 'Tra Que',
    areaSlug: 'tra-que',
    price: 180000,
    duration: 1.5,
    durationLabel: '1.5h',
    rating: 4.5,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi'],
    shortDesc: 'Weave a bamboo basket in the lush Tra Que herb village.',
    operatorName: 'Artisan Nam',
    availability: ['tomorrow', 'this-week'],
  },
  {
    slug: 'ao-dai-experience',
    name: 'Ao Dai Experience',
    category: 'Ao Dai',
    categoryEmoji: '\uD83D\uDC57',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 800000,
    duration: 4,
    durationLabel: '4h',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1583425423320-81e7a55ef4c4?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi', 'ko', 'zh'],
    shortDesc: 'Design, fit, and photograph your own custom Ao Dai dress.',
    operatorName: 'Designer Linh',
    availability: ['today', 'tomorrow', 'this-week'],
  },
  {
    slug: 'banh-mi-class',
    name: 'Banh Mi Masterclass',
    category: 'Cooking',
    categoryEmoji: '\uD83D\uDC68\u200D\uD83C\uDF73',
    area: 'Da Nang',
    areaSlug: 'da-nang',
    price: 280000,
    duration: 2,
    durationLabel: '2h',
    rating: 4.6,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1600688640154-9619e002df30?w=600&h=400&fit=crop',
    skillLevel: 'beginner',
    languages: ['en', 'vi'],
    shortDesc: 'Bake French-Vietnamese baguettes and build the perfect banh mi.',
    operatorName: 'Chef Tam',
    availability: ['today', 'this-week'],
  },
];

/* =============================================================================
   FILTER OPTIONS
   ============================================================================= */

const CATEGORIES = [
  { value: 'Cooking', label: 'Cooking', emoji: '\uD83D\uDC68\u200D\uD83C\uDF73' },
  { value: 'Crafts', label: 'Crafts', emoji: '\uD83C\uDFEE' },
  { value: 'Art', label: 'Art', emoji: '\uD83C\uDFA8' },
  { value: 'Coffee', label: 'Coffee', emoji: '\u2615' },
  { value: 'Jewelry', label: 'Jewelry', emoji: '\uD83D\uDC8E' },
  { value: 'Bamboo', label: 'Bamboo', emoji: '\uD83C\uDF8B' },
  { value: 'Martial Arts', label: 'Martial Arts', emoji: '\uD83E\uDD4B' },
  { value: 'Food Tour', label: 'Food Tour', emoji: '\uD83C\uDF5C' },
  { value: 'Ao Dai', label: 'Ao Dai', emoji: '\uD83D\uDC57' },
];

const AREAS = [
  { value: 'hoi-an', label: 'Hoi An', emoji: '\uD83C\uDFEE' },
  { value: 'hoi-an-old-town', label: 'Old Town', emoji: '\uD83C\uDFDB\uFE0F' },
  { value: 'da-nang', label: 'Da Nang', emoji: '\uD83C\uDF09' },
  { value: 'thanh-ha', label: 'Thanh Ha', emoji: '\uD83C\uDFFA' },
  { value: 'tra-que', label: 'Tra Que', emoji: '\uD83C\uDF3F' },
];

const PRICE_RANGES = [
  { value: 'under-15', label: 'Under $15', min: 0, max: 375000 },
  { value: '15-30', label: '$15 - $30', min: 375000, max: 750000 },
  { value: '30-plus', label: '$30+', min: 750000, max: Infinity },
];

const DURATIONS = [
  { value: 'under-2h', label: 'Under 2h', min: 0, max: 2 },
  { value: '2-4h', label: '2 - 4h', min: 2, max: 4 },
  { value: 'half-day', label: 'Half day (4h+)', min: 4, max: Infinity },
];

const LANGUAGES = [
  { value: 'en', label: 'EN', flag: '\uD83C\uDDEC\uD83C\uDDE7' },
  { value: 'vi', label: 'VI', flag: '\uD83C\uDDFB\uD83C\uDDF3' },
  { value: 'ko', label: 'KO', flag: '\uD83C\uDDF0\uD83C\uDDF7' },
  { value: 'zh', label: 'ZH', flag: '\uD83C\uDDE8\uD83C\uDDF3' },
];

const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const AVAILABILITY = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'this-week', label: 'This Week' },
];

const POPULAR_SEARCHES = [
  { label: 'Cooking class Hoi An', icon: '\uD83D\uDC68\u200D\uD83C\uDF73' },
  { label: 'Pottery workshop', icon: '\uD83C\uDFFA' },
  { label: 'Lantern making', icon: '\uD83C\uDFEE' },
  { label: 'Food tour Da Nang', icon: '\uD83C\uDF5C' },
  { label: 'Coffee experience', icon: '\u2615' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'duration', label: 'Shortest First' },
];

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    area: true,
    price: false,
    duration: false,
    language: false,
    skill: false,
    availability: false,
  });

  /* ---- Toggle helpers ---- */

  const toggleMulti = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const toggleSection = (key: string) =>
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ---- Active filters count ---- */

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedAreas.length > 0 ||
    selectedPriceRange !== null ||
    selectedDuration !== null ||
    selectedLanguages.length > 0 ||
    selectedSkillLevel !== null ||
    selectedAvailability !== null;

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAreas([]);
    setSelectedPriceRange(null);
    setSelectedDuration(null);
    setSelectedLanguages([]);
    setSelectedSkillLevel(null);
    setSelectedAvailability(null);
  };

  /* ---- Build active filter chips ---- */

  const activeFilterChips: { key: string; label: string; remove: () => void }[] = [];

  selectedCategories.forEach((c) => {
    const cat = CATEGORIES.find((x) => x.value === c);
    if (cat)
      activeFilterChips.push({
        key: `cat-${c}`,
        label: `${cat.emoji} ${cat.label}`,
        remove: () => setSelectedCategories((prev) => prev.filter((v) => v !== c)),
      });
  });
  selectedAreas.forEach((a) => {
    const area = AREAS.find((x) => x.value === a);
    if (area)
      activeFilterChips.push({
        key: `area-${a}`,
        label: `${area.emoji} ${area.label}`,
        remove: () => setSelectedAreas((prev) => prev.filter((v) => v !== a)),
      });
  });
  if (selectedPriceRange) {
    const pr = PRICE_RANGES.find((x) => x.value === selectedPriceRange);
    if (pr)
      activeFilterChips.push({
        key: 'price',
        label: pr.label,
        remove: () => setSelectedPriceRange(null),
      });
  }
  if (selectedDuration) {
    const dur = DURATIONS.find((x) => x.value === selectedDuration);
    if (dur)
      activeFilterChips.push({
        key: 'duration',
        label: dur.label,
        remove: () => setSelectedDuration(null),
      });
  }
  selectedLanguages.forEach((l) => {
    const lang = LANGUAGES.find((x) => x.value === l);
    if (lang)
      activeFilterChips.push({
        key: `lang-${l}`,
        label: `${lang.flag} ${lang.label}`,
        remove: () => setSelectedLanguages((prev) => prev.filter((v) => v !== l)),
      });
  });
  if (selectedSkillLevel) {
    const sk = SKILL_LEVELS.find((x) => x.value === selectedSkillLevel);
    if (sk)
      activeFilterChips.push({
        key: 'skill',
        label: sk.label,
        remove: () => setSelectedSkillLevel(null),
      });
  }
  if (selectedAvailability) {
    const av = AVAILABILITY.find((x) => x.value === selectedAvailability);
    if (av)
      activeFilterChips.push({
        key: 'avail',
        label: av.label,
        remove: () => setSelectedAvailability(null),
      });
  }

  /* ---- Filtered + sorted results ---- */

  const filteredWorkshops = useMemo(() => {
    let results = [...WORKSHOPS];

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q) ||
          w.area.toLowerCase().includes(q) ||
          w.operatorName.toLowerCase().includes(q) ||
          w.shortDesc.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      results = results.filter((w) => selectedCategories.includes(w.category));
    }

    // Area
    if (selectedAreas.length > 0) {
      results = results.filter((w) => selectedAreas.includes(w.areaSlug));
    }

    // Price
    if (selectedPriceRange) {
      const range = PRICE_RANGES.find((r) => r.value === selectedPriceRange);
      if (range) results = results.filter((w) => w.price >= range.min && w.price < range.max);
    }

    // Duration
    if (selectedDuration) {
      const dur = DURATIONS.find((d) => d.value === selectedDuration);
      if (dur) results = results.filter((w) => w.duration >= dur.min && w.duration < dur.max);
    }

    // Language
    if (selectedLanguages.length > 0) {
      results = results.filter((w) => selectedLanguages.some((l) => w.languages.includes(l)));
    }

    // Skill level
    if (selectedSkillLevel) {
      results = results.filter((w) => w.skillLevel === selectedSkillLevel);
    }

    // Availability
    if (selectedAvailability) {
      results = results.filter((w) => w.availability.includes(selectedAvailability));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case 'duration':
        results.sort((a, b) => a.duration - b.duration);
        break;
      default:
        // recommended = by rating * reviews weight
        results.sort(
          (a, b) => b.rating * Math.log(b.reviews + 1) - a.rating * Math.log(a.reviews + 1)
        );
    }

    return results;
  }, [
    searchQuery,
    selectedCategories,
    selectedAreas,
    selectedPriceRange,
    selectedDuration,
    selectedLanguages,
    selectedSkillLevel,
    selectedAvailability,
    sortBy,
  ]);

  /* ---- Render helpers ---- */

  const FilterSection = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const isOpen = expandedSections[id];
    return (
      <div style={{ borderBottom: '1px solid var(--sand)' }}>
        <button
          onClick={() => toggleSection(id)}
          className="flex w-full items-center justify-between px-1 py-3"
          style={{ color: 'var(--charcoal)' }}
        >
          <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--charcoal-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: 'transform 0.2s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {isOpen && (
          <div className="animate-fade-in pb-3" style={{ paddingLeft: 1 }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const ChipPill = ({
    label,
    active,
    onClick,
    emoji,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    emoji?: string;
  }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
      style={{
        background: active ? 'var(--terracotta)' : 'white',
        color: active ? 'white' : 'var(--charcoal-light)',
        border: active ? '1.5px solid var(--terracotta)' : '1.5px solid var(--sand)',
        boxShadow: active ? '0 2px 8px rgba(194, 112, 62, 0.3)' : 'none',
      }}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </button>
  );

  /* ===========================================================================
     JSX
     =========================================================================== */

  return (
    <div className="page-content min-h-screen" style={{ background: 'var(--ivory)' }}>
      {/* ================================================================
          HEADER
          ================================================================ */}
      <header className="glass sticky top-0 z-40 border-b" style={{ borderColor: 'var(--sand)' }}>
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
              style={{ background: 'var(--cream)' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--terracotta)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1
                className="text-[20px] leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--charcoal)',
                  letterSpacing: '-0.02em',
                }}
              >
                Explore
              </h1>
              <p className="text-[11px] font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                Find your perfect workshop
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4">
        {/* ================================================================
            SEARCH INPUT
            ================================================================ */}
        <section className="animate-fade-in-up mt-5">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2"
              width="20"
              height="20"
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
              placeholder="Search workshops, operators, areas..."
              className="w-full rounded-2xl border-0 py-4 pl-12 pr-10 text-[15px] transition-shadow focus:outline-none focus:ring-2"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'white',
                color: 'var(--charcoal)',
                boxShadow: '0 2px 12px rgba(45, 42, 38, 0.08), inset 0 0 0 1.5px var(--sand)',
                // @ts-expect-error CSS variable for focus ring
                '--tw-ring-color': 'var(--terracotta)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full transition-colors"
                style={{ background: 'var(--sand)', color: 'var(--charcoal-muted)' }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </section>

        {/* ================================================================
            POPULAR SEARCHES (when no search text)
            ================================================================ */}
        {!searchQuery.trim() && !hasActiveFilters && (
          <section className="animate-fade-in-up delay-1 mt-5">
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: 'var(--charcoal-muted)' }}
            >
              Popular Searches
            </p>
            <div className="flex flex-col gap-2">
              {POPULAR_SEARCHES.map((ps) => (
                <button
                  key={ps.label}
                  onClick={() => setSearchQuery(ps.label)}
                  className="card-hover flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                  style={{
                    background: 'white',
                    boxShadow: '0 1px 4px rgba(45, 42, 38, 0.06)',
                  }}
                >
                  <span className="text-lg">{ps.icon}</span>
                  <span className="text-[13px] font-medium" style={{ color: 'var(--charcoal)' }}>
                    {ps.label}
                  </span>
                  <svg
                    className="ml-auto"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--charcoal-muted)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================
            QUICK FILTERS (collapsible sections)
            ================================================================ */}
        <section className="animate-fade-in-up delay-2 mt-5">
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: 'white',
              boxShadow: '0 2px 8px rgba(45, 42, 38, 0.06)',
            }}
          >
            <div className="px-4">
              {/* Category */}
              <FilterSection id="category" title="Category">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <ChipPill
                      key={cat.value}
                      label={cat.label}
                      emoji={cat.emoji}
                      active={selectedCategories.includes(cat.value)}
                      onClick={() => setSelectedCategories((prev) => toggleMulti(prev, cat.value))}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Area */}
              <FilterSection id="area" title="Area">
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((area) => (
                    <ChipPill
                      key={area.value}
                      label={area.label}
                      emoji={area.emoji}
                      active={selectedAreas.includes(area.value)}
                      onClick={() => setSelectedAreas((prev) => toggleMulti(prev, area.value))}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Price Range */}
              <FilterSection id="price" title="Price Range">
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((pr) => (
                    <ChipPill
                      key={pr.value}
                      label={pr.label}
                      active={selectedPriceRange === pr.value}
                      onClick={() =>
                        setSelectedPriceRange(selectedPriceRange === pr.value ? null : pr.value)
                      }
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Duration */}
              <FilterSection id="duration" title="Duration">
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((dur) => (
                    <ChipPill
                      key={dur.value}
                      label={dur.label}
                      active={selectedDuration === dur.value}
                      onClick={() =>
                        setSelectedDuration(selectedDuration === dur.value ? null : dur.value)
                      }
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Language */}
              <FilterSection id="language" title="Language">
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <ChipPill
                      key={lang.value}
                      label={lang.label}
                      emoji={lang.flag}
                      active={selectedLanguages.includes(lang.value)}
                      onClick={() => setSelectedLanguages((prev) => toggleMulti(prev, lang.value))}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Skill Level */}
              <FilterSection id="skill" title="Skill Level">
                <div className="flex flex-wrap gap-2">
                  {SKILL_LEVELS.map((sk) => (
                    <ChipPill
                      key={sk.value}
                      label={sk.label}
                      active={selectedSkillLevel === sk.value}
                      onClick={() =>
                        setSelectedSkillLevel(selectedSkillLevel === sk.value ? null : sk.value)
                      }
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Availability */}
              <FilterSection id="availability" title="Availability">
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY.map((av) => (
                    <ChipPill
                      key={av.value}
                      label={av.label}
                      active={selectedAvailability === av.value}
                      onClick={() =>
                        setSelectedAvailability(selectedAvailability === av.value ? null : av.value)
                      }
                    />
                  ))}
                </div>
              </FilterSection>
            </div>
          </div>
        </section>

        {/* ================================================================
            ACTIVE FILTERS BAR
            ================================================================ */}
        {hasActiveFilters && (
          <section className="animate-fade-in mt-4">
            <div className="mb-2 flex items-center justify-between">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Active Filters
              </p>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-semibold"
                style={{ color: 'var(--terracotta)' }}
              >
                Clear all
              </button>
            </div>
            <div className="hide-scrollbar flex flex-wrap gap-2">
              {activeFilterChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={chip.remove}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all"
                  style={{
                    background: 'var(--amber-light)',
                    color: 'var(--amber-dark)',
                    border: '1px solid rgba(212, 160, 74, 0.3)',
                  }}
                >
                  {chip.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================
            RESULTS HEADER (count + sort)
            ================================================================ */}
        {(searchQuery.trim() || hasActiveFilters) && (
          <section className="animate-fade-in mt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-semibold" style={{ color: 'var(--charcoal)' }}>
                {filteredWorkshops.length}{' '}
                {filteredWorkshops.length === 1 ? 'workshop' : 'workshops'} found
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="cursor-pointer appearance-none rounded-lg border-0 py-1.5 pl-2 pr-6 text-[11px] font-semibold focus:outline-none"
                  style={{
                    background: 'var(--cream)',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--charcoal-muted)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================
            RESULTS - WORKSHOP CARDS
            ================================================================ */}
        {(searchQuery.trim() || hasActiveFilters) && filteredWorkshops.length > 0 && (
          <section className="space-y-4 pb-4">
            {filteredWorkshops.map((workshop, idx) => (
              <Link
                key={workshop.slug}
                href={`/workshops/${workshop.slug}`}
                className={`card card-hover animate-fade-in-up block delay-${Math.min(idx + 1, 10)}`}
              >
                {/* Image */}
                <div className="relative" style={{ height: 180 }}>
                  <img
                    src={workshop.image}
                    alt={workshop.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div className="badge badge-amber absolute left-3 top-3">
                    <span>{workshop.categoryEmoji}</span>
                    <span>{workshop.category}</span>
                  </div>
                  {/* Rating badge */}
                  <div
                    className="badge absolute right-3 top-3"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--charcoal)',
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="var(--amber)"
                      stroke="none"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span style={{ fontWeight: 700, fontSize: 11 }}>{workshop.rating}</span>
                    <span style={{ color: 'var(--charcoal-muted)', fontSize: 10 }}>
                      ({workshop.reviews})
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className="mb-1 text-[15px] font-bold leading-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--charcoal)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {workshop.name}
                  </h3>
                  <p
                    className="mb-3 text-[12px] leading-relaxed"
                    style={{ color: 'var(--charcoal-light)' }}
                  >
                    {workshop.shortDesc}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Area */}
                      <span
                        className="flex items-center gap-1 text-[11px] font-medium"
                        style={{ color: 'var(--charcoal-muted)' }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {workshop.area}
                      </span>
                      {/* Duration */}
                      <span
                        className="flex items-center gap-1 text-[11px] font-medium"
                        style={{ color: 'var(--charcoal-muted)' }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {workshop.durationLabel}
                      </span>
                      {/* Skill level */}
                      <span className="badge-sage badge text-[9px]" style={{ padding: '2px 7px' }}>
                        {workshop.skillLevel.charAt(0).toUpperCase() + workshop.skillLevel.slice(1)}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-[15px] font-bold" style={{ color: 'var(--terracotta)' }}>
                        {formatPriceShort(workshop.price)}
                      </p>
                      <p className="text-[9px]" style={{ color: 'var(--charcoal-muted)' }}>
                        {formatPrice(workshop.price)}
                      </p>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mt-2.5 flex items-center gap-1.5">
                    {workshop.languages.map((langCode) => {
                      const lang = LANGUAGES.find((l) => l.value === langCode);
                      return lang ? (
                        <span key={langCode} className="text-[11px]" title={lang.label}>
                          {lang.flag}
                        </span>
                      ) : null;
                    })}
                    <span
                      className="ml-1 text-[10px] font-medium"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      by {workshop.operatorName}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* ================================================================
            EMPTY STATE
            ================================================================ */}
        {(searchQuery.trim() || hasActiveFilters) && filteredWorkshops.length === 0 && (
          <section className="animate-fade-in-up mb-8 mt-8">
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: 'white', boxShadow: '0 2px 8px rgba(45,42,38,0.06)' }}
            >
              {/* Illustration placeholder */}
              <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: 'var(--cream)' }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--charcoal-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <path d="M8 11h6" />
                </svg>
              </div>
              <h3
                className="mb-1 text-[16px] font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--charcoal)',
                }}
              >
                No workshops match your search
              </h3>
              <p
                className="mb-4 text-[12px] leading-relaxed"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Try adjusting your filters or searching for something different.
              </p>
              <div className="flex flex-col gap-2">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: 'var(--charcoal-muted)' }}
                >
                  Suggestions
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Cooking class', 'Lantern making', 'Pottery'].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        clearAllFilters();
                        setSearchQuery(s);
                      }}
                      className="rounded-full px-3 py-1.5 text-[11px] font-semibold"
                      style={{
                        background: 'var(--cream)',
                        color: 'var(--terracotta)',
                        border: '1px solid var(--sand)',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="mt-4 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'var(--terracotta)' }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </section>
        )}

        {/* ================================================================
            DEFAULT RESULTS (no filters, no search = show all)
            ================================================================ */}
        {!searchQuery.trim() && !hasActiveFilters && (
          <section className="animate-fade-in-up delay-3 mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                All Workshops
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="cursor-pointer appearance-none rounded-lg border-0 py-1.5 pl-2 pr-6 text-[11px] font-semibold focus:outline-none"
                  style={{
                    background: 'var(--cream)',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--charcoal-muted)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 pb-4">
              {filteredWorkshops.map((workshop, idx) => (
                <Link
                  key={workshop.slug}
                  href={`/workshops/${workshop.slug}`}
                  className={`card card-hover animate-fade-in-up block delay-${Math.min(idx + 1, 10)}`}
                >
                  {/* Image */}
                  <div className="relative" style={{ height: 180 }}>
                    <img
                      src={workshop.image}
                      alt={workshop.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="badge badge-amber absolute left-3 top-3">
                      <span>{workshop.categoryEmoji}</span>
                      <span>{workshop.category}</span>
                    </div>
                    <div
                      className="badge absolute right-3 top-3"
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--charcoal)',
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="var(--amber)"
                        stroke="none"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span style={{ fontWeight: 700, fontSize: 11 }}>{workshop.rating}</span>
                      <span style={{ color: 'var(--charcoal-muted)', fontSize: 10 }}>
                        ({workshop.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3
                      className="mb-1 text-[15px] font-bold leading-tight"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--charcoal)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {workshop.name}
                    </h3>
                    <p
                      className="mb-3 text-[12px] leading-relaxed"
                      style={{ color: 'var(--charcoal-light)' }}
                    >
                      {workshop.shortDesc}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex items-center gap-1 text-[11px] font-medium"
                          style={{ color: 'var(--charcoal-muted)' }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {workshop.area}
                        </span>
                        <span
                          className="flex items-center gap-1 text-[11px] font-medium"
                          style={{ color: 'var(--charcoal-muted)' }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {workshop.durationLabel}
                        </span>
                        <span
                          className="badge-sage badge text-[9px]"
                          style={{ padding: '2px 7px' }}
                        >
                          {workshop.skillLevel.charAt(0).toUpperCase() +
                            workshop.skillLevel.slice(1)}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-[15px] font-bold" style={{ color: 'var(--terracotta)' }}>
                          {formatPriceShort(workshop.price)}
                        </p>
                        <p className="text-[9px]" style={{ color: 'var(--charcoal-muted)' }}>
                          {formatPrice(workshop.price)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center gap-1.5">
                      {workshop.languages.map((langCode) => {
                        const lang = LANGUAGES.find((l) => l.value === langCode);
                        return lang ? (
                          <span key={langCode} className="text-[11px]" title={lang.label}>
                            {lang.flag}
                          </span>
                        ) : null;
                      })}
                      <span
                        className="ml-1 text-[10px] font-medium"
                        style={{ color: 'var(--charcoal-muted)' }}
                      >
                        by {workshop.operatorName}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
