'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'ko', flag: '🇰🇷', name: '한국어' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
];

const CURRENCIES = [
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

const CATEGORIES = [
  { key: 'cooking', label: 'Cooking', emoji: '👨‍🍳', color: 'var(--cat-cooking)' },
  { key: 'craft', label: 'Crafts', emoji: '🏮', color: 'var(--cat-craft)' },
  { key: 'art', label: 'Art', emoji: '🎨', color: 'var(--cat-art)' },
  { key: 'jewelry', label: 'Jewelry', emoji: '💎', color: 'var(--cat-jewelry)' },
  { key: 'bamboo', label: 'Bamboo', emoji: '🎋', color: 'var(--cat-bamboo)' },
  { key: 'martial-arts', label: 'Martial Arts', emoji: '🥋', color: 'var(--cat-martial)' },
  { key: 'dance', label: 'Dance', emoji: '💃', color: 'var(--cat-dance)' },
  { key: 'coffee', label: 'Coffee', emoji: '☕', color: 'var(--cat-coffee)' },
  { key: 'ao-dai', label: 'Ao Dai', emoji: '👗', color: 'var(--cat-fashion)' },
  { key: 'food-tour', label: 'Food Tours', emoji: '🍜', color: 'var(--cat-food-tour)' },
];

const WORKSHOPS = [
  {
    id: 1,
    slug: 'traditional-pho-making',
    name: 'Traditional Pho Making',
    operator: 'Chef Minh',
    category: 'cooking',
    categoryLabel: 'Cooking',
    location: 'Hoi An',
    duration: '2.5h',
    price: 350000,
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳'],
    availability: 'Available today',
  },
  {
    id: 2,
    slug: 'lantern-making-workshop',
    name: 'Lantern Making Workshop',
    operator: 'Artisan Lan',
    category: 'craft',
    categoryLabel: 'Craft',
    location: 'Hoi An Old Town',
    duration: '2h',
    price: 250000,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳', '🇰🇷'],
    availability: 'Available tomorrow',
  },
  {
    id: 3,
    slug: 'thanh-ha-pottery',
    name: 'Thanh Ha Pottery',
    operator: 'Master Toan',
    category: 'craft',
    categoryLabel: 'Craft',
    location: 'Thanh Ha Village',
    duration: '3h',
    price: 400000,
    rating: 4.7,
    reviews: 52,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳'],
    availability: 'Available today',
  },
  {
    id: 4,
    slug: 'vietnamese-coffee-masterclass',
    name: 'Vietnamese Coffee Masterclass',
    operator: 'Barista Hung',
    category: 'coffee',
    categoryLabel: 'Coffee',
    location: 'Da Nang',
    duration: '1.5h',
    price: 200000,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳', '🇨🇳'],
    availability: 'Available today',
  },
  {
    id: 5,
    slug: 'watercolor-hoi-an',
    name: 'Watercolor Hoi An',
    operator: 'Artist Mai',
    category: 'art',
    categoryLabel: 'Art',
    location: 'Hoi An Old Town',
    duration: '3h',
    price: 500000,
    rating: 4.8,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳'],
    availability: 'Available tomorrow',
  },
  {
    id: 6,
    slug: 'silk-weaving-experience',
    name: 'Silk Weaving Experience',
    operator: 'Weaver Huong',
    category: 'craft',
    categoryLabel: 'Craft',
    location: 'Hoi An',
    duration: '2h',
    price: 300000,
    rating: 4.6,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1596568362037-a2a4e97c5e5e?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳', '🇰🇷'],
    availability: 'Available today',
  },
  {
    id: 7,
    slug: 'vovinam-martial-arts',
    name: 'Vovinam Martial Arts',
    operator: 'Coach Duc',
    category: 'martial-arts',
    categoryLabel: 'Martial Arts',
    location: 'Da Nang',
    duration: '1h',
    price: 150000,
    rating: 4.9,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳'],
    availability: 'Available tomorrow',
  },
  {
    id: 8,
    slug: 'hoi-an-food-tour',
    name: 'Hoi An Food Tour',
    operator: 'Guide Thao',
    category: 'food-tour',
    categoryLabel: 'Food Tour',
    location: 'Hoi An',
    duration: '4h',
    price: 600000,
    rating: 5.0,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    languages: ['🇬🇧', '🇻🇳', '🇰🇷', '🇨🇳'],
    availability: 'Available today',
  },
];

const HOI_AN_WORKSHOPS = [
  WORKSHOPS[1], // Lantern Making
  WORKSHOPS[0], // Pho Making (Cooking Class)
  WORKSHOPS[2], // Pottery
  WORKSHOPS[5], // Silk Weaving
];

const DA_NANG_WORKSHOPS = [
  WORKSHOPS[3], // Coffee Masterclass
  WORKSHOPS[6], // Martial Arts
  WORKSHOPS[4], // Art (Watercolor)
  WORKSHOPS[7], // Food Tour
];

const REVIEWS = [
  {
    id: 1,
    name: 'Sophie L.',
    country: '🇦🇺',
    rating: 5,
    text: 'Best experience in Vietnam! Master Toan is so patient. I made my own clay bowl and it turned out beautiful. Highly recommend!',
    workshop: 'Thanh Ha Pottery',
  },
  {
    id: 2,
    name: 'Min-Jun K.',
    country: '🇰🇷',
    rating: 5,
    text: '호이안에서 가장 좋은 경험이었어요! 랜턴 만들기가 이렇게 재미있을 줄 몰랐어요. 한국어 가이드도 있어서 편했습니다.',
    workshop: 'Lantern Making Workshop',
  },
  {
    id: 3,
    name: 'James R.',
    country: '🇬🇧',
    rating: 5,
    text: 'Chef Minh is amazing. We learned to make proper pho from scratch. The market tour at the start was a lovely bonus. My wife and I loved every minute.',
    workshop: 'Traditional Pho Making',
  },
  {
    id: 4,
    name: 'Yuki T.',
    country: '🇯🇵',
    rating: 4,
    text: 'Coffee workshop was so informative! Learned about Vietnamese coffee culture and tried egg coffee for the first time. Great value.',
    workshop: 'Vietnamese Coffee Masterclass',
  },
];

const AREAS = [
  { label: 'Hoi An', emoji: '🏮', slug: 'hoi-an' },
  { label: 'Hoi An Old Town', emoji: '🏛️', slug: 'hoi-an-old-town' },
  { label: 'Da Nang', emoji: '🌉', slug: 'da-nang' },
  { label: 'Thanh Ha', emoji: '🏺', slug: 'thanh-ha' },
  { label: 'Tra Que', emoji: '🌿', slug: 'tra-que' },
  { label: 'An Bang', emoji: '🏖️', slug: 'an-bang' },
];

const WHY_GUDBRO = [
  {
    icon: '🎨',
    title: 'Authentic Experiences',
    desc: 'Real artisans, not tourist traps. Learn from masters who have practiced their craft for decades.',
  },
  {
    icon: '💰',
    title: 'Lowest Commission',
    desc: 'Operators keep 85-90%. We charge only 10-15% vs industry standard 20-30%.',
  },
  {
    icon: '🌏',
    title: 'Your Language',
    desc: 'Browse & book in English, Korean, Chinese, and Vietnamese. Multilingual guides available.',
  },
];

const MORE_MENU_ITEMS = [
  { icon: '🏮', label: 'All Workshops', href: '/workshops' },
  { icon: '🔍', label: 'Search', href: '/search' },
  { icon: '🎁', label: 'Promotions', href: '/promotions' },
  { icon: '📍', label: 'Areas', href: '/search?view=map' },
  { icon: '📖', label: 'About Us', href: '/about' },
  { icon: '📞', label: 'Contact', href: '/about#contact' },
];

/* =============================================================================
   HELPERS
   ============================================================================= */

function formatPrice(vnd: number, currency: string): string {
  if (currency === 'VND') return `${vnd.toLocaleString()}₫`;
  if (currency === 'USD') return `$${(vnd * 0.00004).toFixed(2)}`;
  if (currency === 'EUR') return `€${(vnd * 0.000037).toFixed(2)}`;
  if (currency === 'KRW') return `₩${Math.round(vnd * 0.054).toLocaleString()}`;
  if (currency === 'AUD') return `A$${(vnd * 0.000062).toFixed(2)}`;
  return `${vnd.toLocaleString()}₫`;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={star <= rating ? 'var(--amber)' : '#E5E7EB'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* =============================================================================
   WORKSHOP CARD COMPONENTS
   ============================================================================= */

function FeaturedWorkshopCard({
  workshop,
  currency,
}: {
  workshop: (typeof WORKSHOPS)[0];
  currency: string;
}) {
  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="card card-hover w-[280px] flex-shrink-0 snap-start"
    >
      {/* Image */}
      <div className="relative h-[160px] overflow-hidden">
        <img
          src={workshop.image}
          alt={workshop.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(45,42,38,0.5) 0%, transparent 50%)',
          }}
        />
        {/* Category badge */}
        <span className="badge badge-amber absolute left-3 top-3">{workshop.categoryLabel}</span>
        {/* Availability badge */}
        {workshop.availability && (
          <span className="badge badge-sage absolute right-3 top-3 text-[10px]">
            {workshop.availability}
          </span>
        )}
        {/* Bottom overlay info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex gap-1">
            {workshop.languages.map((flag, i) => (
              <span key={i} className="text-sm drop-shadow-md">
                {flag}
              </span>
            ))}
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-md">
            {workshop.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h4
          className="font-display mb-0.5 text-[15px] leading-tight"
          style={{ color: 'var(--charcoal)' }}
        >
          {workshop.name}
        </h4>
        <p className="mb-2 text-[11px]" style={{ color: 'var(--clay)' }}>
          {workshop.operator} &middot; {workshop.location}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={Math.round(workshop.rating)} size={12} />
            <span className="text-[11px] font-semibold" style={{ color: 'var(--charcoal)' }}>
              {workshop.rating}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
              ({workshop.reviews})
            </span>
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--terracotta)' }}>
            {formatPrice(workshop.price, currency)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function GridWorkshopCard({
  workshop,
  currency,
}: {
  workshop: (typeof WORKSHOPS)[0];
  currency: string;
}) {
  return (
    <Link href={`/workshops/${workshop.slug}`} className="card card-hover">
      <div className="relative h-[110px] overflow-hidden">
        <img
          src={workshop.image}
          alt={workshop.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(45,42,38,0.4) 0%, transparent 60%)',
          }}
        />
        <span className="badge badge-amber absolute left-2 top-2 px-2 py-0.5 text-[9px]">
          {workshop.categoryLabel}
        </span>
      </div>
      <div className="p-2.5">
        <h4
          className="font-display mb-0.5 text-[13px] leading-tight"
          style={{ color: 'var(--charcoal)' }}
        >
          {workshop.name}
        </h4>
        <p className="mb-1.5 text-[10px]" style={{ color: 'var(--clay)' }}>
          {workshop.operator}
        </p>
        <div className="mb-1 flex items-center gap-1">
          <StarRating rating={Math.round(workshop.rating)} size={10} />
          <span className="text-[10px] font-semibold" style={{ color: 'var(--charcoal)' }}>
            {workshop.rating}
          </span>
          <span className="text-[9px]" style={{ color: 'var(--charcoal-muted)' }}>
            ({workshop.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
            {workshop.duration}
          </span>
          <span className="text-xs font-bold" style={{ color: 'var(--terracotta)' }}>
            {formatPrice(workshop.price, currency)}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function WorkshopsHomePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('VND');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];
  const currentCurr = CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0];

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--ivory)' }}>
      {/* ================================================================
          HEADER -- Sticky, glass, compact
          ================================================================ */}
      <header
        className="glass sticky top-0 z-40 border-b"
        style={{ borderColor: 'rgba(194, 112, 62, 0.12)' }}
      >
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo + Tagline */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{
                  background:
                    'linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-dark) 100%)',
                  boxShadow: '0 2px 8px rgba(194, 112, 62, 0.3)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h1
                  className="font-display text-[15px] font-bold leading-tight"
                  style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
                >
                  GUDBRO Workshops
                </h1>
                <p
                  className="text-[10px] font-medium uppercase tracking-wide"
                  style={{ color: 'var(--terracotta)' }}
                >
                  Craft Your Story
                </p>
              </div>
            </div>

            {/* Lang + Currency + Hamburger */}
            <div className="flex items-center gap-1">
              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowCurrMenu(false);
                  }}
                  className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    background: showLangMenu ? 'var(--sand)' : 'transparent',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  <span className="text-sm">{currentLang.flag}</span>
                  <span className="text-[11px]">{currentLang.code.toUpperCase()}</span>
                </button>
                {showLangMenu && (
                  <div
                    className="shadow-warm-lg animate-fade-in absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border bg-white py-1"
                    style={{ borderColor: 'var(--sand)' }}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang.code);
                          setShowLangMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-gray-50"
                        style={{
                          color:
                            lang.code === selectedLang ? 'var(--terracotta)' : 'var(--charcoal)',
                          fontWeight: lang.code === selectedLang ? 600 : 400,
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {lang.code === selectedLang && (
                          <svg
                            className="ml-auto"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="var(--terracotta)"
                            stroke="none"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
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
                  className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    background: showCurrMenu ? 'var(--sand)' : 'transparent',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  <span className="text-[11px] font-semibold">{currentCurr.symbol}</span>
                  <span className="text-[11px]">{currentCurr.code}</span>
                </button>
                {showCurrMenu && (
                  <div
                    className="shadow-warm-lg animate-fade-in absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-xl border bg-white py-1"
                    style={{ borderColor: 'var(--sand)' }}
                  >
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setSelectedCurrency(curr.code);
                          setShowCurrMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-gray-50"
                        style={{
                          color:
                            curr.code === selectedCurrency
                              ? 'var(--terracotta)'
                              : 'var(--charcoal)',
                          fontWeight: curr.code === selectedCurrency ? 600 : 400,
                        }}
                      >
                        <span className="w-5 font-semibold">{curr.symbol}</span>
                        <span>{curr.name}</span>
                        {curr.code === selectedCurrency && (
                          <svg
                            className="ml-auto"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="var(--terracotta)"
                            stroke="none"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setShowMoreMenu(true)}
                className="rounded-lg p-2 transition-colors"
                style={{ color: 'var(--charcoal-light)' }}
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
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Click-away overlay for dropdowns */}
      {(showLangMenu || showCurrMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowLangMenu(false);
            setShowCurrMenu(false);
          }}
        />
      )}

      <main className="mx-auto max-w-lg px-4">
        {/* ================================================================
            1. SEARCH BAR -- Hero area
            ================================================================ */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div
            className="texture-paper relative overflow-hidden rounded-2xl p-5"
            style={{
              background: 'linear-gradient(165deg, #ffffff 0%, var(--cream) 50%, var(--sand) 100%)',
              boxShadow: '0 1px 3px rgba(194, 112, 62, 0.08)',
            }}
          >
            {/* Decorative element */}
            <div className="absolute right-3 top-3 opacity-[0.06]">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="var(--terracotta-dark)"
                stroke="none"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <p
              className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: 'var(--terracotta)' }}
            >
              Discover & Create
            </p>
            <h2
              className="font-display mb-4 text-xl font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
            >
              What do you want to create?
            </h2>

            {/* Search Input */}
            <div className="relative mb-4">
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
                placeholder="Search workshops, cooking, pottery..."
                className="font-body w-full rounded-xl border-0 py-3 pl-10 pr-4 text-sm transition-shadow focus:ring-2"
                style={{
                  background: 'white',
                  color: 'var(--charcoal)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(194, 112, 62, 0.15)',
                  // @ts-expect-error CSS custom property for focus ring
                  '--tw-ring-color': 'var(--terracotta)',
                }}
              />
            </div>

            {/* Category pills */}
            <div className="hide-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.key}
                  href={`/workshops?category=${cat.key}`}
                  className="flex flex-shrink-0 snap-start items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all hover:scale-105"
                  style={{
                    background: 'white',
                    color: 'var(--charcoal)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  <span className="text-sm">{cat.emoji}</span>
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            2. FEATURED WORKSHOPS -- Horizontal scroll
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-2' : 'opacity-0'}`}>
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="font-display text-[17px] font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
            >
              Featured Workshops
            </h3>
            <Link
              href="/workshops"
              className="text-xs font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              View all &rarr;
            </Link>
          </div>

          <div className="hide-scrollbar -mx-1 flex snap-x gap-3.5 overflow-x-auto px-1 pb-2">
            {WORKSHOPS.slice(0, 6).map((workshop) => (
              <FeaturedWorkshopCard
                key={workshop.id}
                workshop={workshop}
                currency={selectedCurrency}
              />
            ))}
          </div>
        </section>

        {/* ================================================================
            3. POPULAR IN HOI AN -- 2-col grid
            ================================================================ */}
        <section className={`mt-8 ${mounted ? 'animate-fade-in-up delay-3' : 'opacity-0'}`}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3
                className="font-display text-[17px] font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
              >
                Popular in Hoi An
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                The heart of Vietnamese craftsmanship
              </p>
            </div>
            <Link
              href="/workshops?area=hoi-an"
              className="text-xs font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              See all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {HOI_AN_WORKSHOPS.map((workshop) => (
              <GridWorkshopCard key={workshop.id} workshop={workshop} currency={selectedCurrency} />
            ))}
          </div>
        </section>

        {/* ================================================================
            4. POPULAR IN DA NANG -- 2-col grid
            ================================================================ */}
        <section className={`mt-8 ${mounted ? 'animate-fade-in-up delay-4' : 'opacity-0'}`}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3
                className="font-display text-[17px] font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
              >
                Popular in Da Nang
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                Modern city, timeless traditions
              </p>
            </div>
            <Link
              href="/workshops?area=da-nang"
              className="text-xs font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              See all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {DA_NANG_WORKSHOPS.map((workshop) => (
              <GridWorkshopCard key={workshop.id} workshop={workshop} currency={selectedCurrency} />
            ))}
          </div>
        </section>

        {/* ================================================================
            5. OPERATOR SPOTLIGHT -- Full-width editorial card
            ================================================================ */}
        <section className={`mt-8 ${mounted ? 'animate-fade-in-up delay-5' : 'opacity-0'}`}>
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(170deg, var(--cream) 0%, #FFFFFF 40%, var(--sand) 100%)',
              border: '1px solid rgba(194, 112, 62, 0.12)',
            }}
          >
            {/* Photo area */}
            <div className="relative h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=400&fit=crop&crop=top"
                alt="Master Minh at work"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(45,42,38,0.7) 0%, transparent 60%)',
                }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="badge badge-terracotta mb-2 text-[10px]">Artisan Spotlight</span>
                <h3 className="font-display text-xl leading-tight text-white">Master Minh</h3>
                <p className="text-xs text-white/80">Potter &middot; Thanh Ha Village</p>
              </div>
            </div>

            {/* Story */}
            <div className="p-5">
              <p
                className="mb-3 text-[13px] leading-relaxed"
                style={{ color: 'var(--charcoal-light)' }}
              >
                &ldquo;For 30 years, I have shaped clay in Thanh Ha. Each piece carries the spirit
                of our 500-year-old pottery village. When visitors come, I don&rsquo;t just teach
                pottery &mdash; I share the soul of our craft.&rdquo;
              </p>
              <div className="mb-4 flex items-center gap-4">
                <div className="text-center">
                  <p
                    className="font-display text-lg font-bold"
                    style={{ color: 'var(--terracotta)' }}
                  >
                    30+
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                    Years
                  </p>
                </div>
                <div className="h-8 w-px" style={{ background: 'var(--sand)' }} />
                <div className="text-center">
                  <p
                    className="font-display text-lg font-bold"
                    style={{ color: 'var(--terracotta)' }}
                  >
                    4.7
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                    Rating
                  </p>
                </div>
                <div className="h-8 w-px" style={{ background: 'var(--sand)' }} />
                <div className="text-center">
                  <p
                    className="font-display text-lg font-bold"
                    style={{ color: 'var(--terracotta)' }}
                  >
                    1,200+
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                    Students
                  </p>
                </div>
              </div>
              <Link
                href="/workshops/thanh-ha-pottery"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-semibold transition-colors"
                style={{
                  background: 'var(--terracotta)',
                  color: 'white',
                }}
              >
                View Workshops by Master Minh
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================
            6. WHY GUDBRO WORKSHOPS -- 3 cards
            ================================================================ */}
        <section className={`mt-8 ${mounted ? 'animate-fade-in-up delay-6' : 'opacity-0'}`}>
          <h3
            className="font-display mb-3 text-[17px] font-bold"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            Why GUDBRO Workshops
          </h3>

          <div className="space-y-3">
            {WHY_GUDBRO.map((item, i) => (
              <div
                key={i}
                className="shadow-warm flex items-start gap-3.5 rounded-2xl bg-white p-4"
              >
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ background: 'var(--cream)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4
                    className="mb-0.5 text-[13px] font-semibold"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: 'var(--charcoal-muted)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            7. RECENT REVIEWS -- Horizontal scroll
            ================================================================ */}
        <section className={`mt-8 ${mounted ? 'animate-fade-in-up delay-7' : 'opacity-0'}`}>
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="font-display text-[17px] font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
            >
              Recent Reviews
            </h3>
            <Link
              href="/promotions"
              className="text-xs font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              See all &rarr;
            </Link>
          </div>

          <div className="hide-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="shadow-warm w-[270px] flex-shrink-0 snap-start rounded-2xl bg-white p-4"
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: 'var(--terracotta)' }}
                    >
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>
                        {review.name} {review.country}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                        {review.workshop}
                      </p>
                    </div>
                  </div>
                </div>
                <StarRating rating={review.rating} size={11} />
                <p
                  className="mt-2 line-clamp-3 text-[11px] leading-relaxed"
                  style={{ color: 'var(--charcoal-light)' }}
                >
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            8. AREAS TO EXPLORE -- Horizontal scroll chips
            ================================================================ */}
        <section className={`mt-8 ${mounted ? 'animate-fade-in-up delay-8' : 'opacity-0'}`}>
          <h3
            className="font-display mb-3 text-[17px] font-bold"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            Areas to Explore
          </h3>

          <div className="hide-scrollbar -mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-1">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/area/${area.slug}`}
                className="shadow-warm hover-lift flex flex-shrink-0 snap-start items-center gap-2 rounded-2xl bg-white px-4 py-3"
              >
                <span className="text-lg">{area.emoji}</span>
                <span
                  className="whitespace-nowrap text-xs font-semibold"
                  style={{ color: 'var(--charcoal)' }}
                >
                  {area.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            9. CONTACT / CTA
            ================================================================ */}
        <section className={`mb-4 mt-8 ${mounted ? 'animate-fade-in-up delay-9' : 'opacity-0'}`}>
          <div
            className="relative overflow-hidden rounded-2xl p-5"
            style={{
              background:
                'linear-gradient(170deg, var(--terracotta) 0%, var(--terracotta-dark) 100%)',
            }}
          >
            {/* Decorative corner */}
            <div
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-10"
              style={{ background: 'white' }}
            />
            <div
              className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full opacity-10"
              style={{ background: 'white' }}
            />

            <h3 className="font-display mb-1.5 text-xl text-white">Ready to create something?</h3>
            <p className="mb-5 text-[12px] leading-relaxed text-white/80">
              Book a workshop or ask us anything. We reply within minutes.
            </p>

            <div className="mb-3 flex gap-2.5">
              <a
                href="https://wa.me/+84905456789?text=Hi%20GUDBRO!%20I%20want%20to%20book%20a%20workshop."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{ background: '#25D366' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="https://zalo.me/0905456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{ background: '#0068FF' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.18-.192-.42-.288-.72-.288h-1.032V6.36c0-.324-.108-.6-.324-.828-.216-.228-.504-.342-.864-.342H9.36c-.36 0-.648.114-.864.342-.216.228-.324.504-.324.828v1.512H7.152c-.3 0-.54.096-.72.288-.18.192-.27.432-.27.72v.96h11.676v-.96c0-.288-.09-.528-.27-.72zM7.884 18.24h8.232c.36 0 .648-.108.864-.324.216-.216.324-.492.324-.852V10.8H6.696v6.264c0 .36.108.636.324.852.216.216.504.324.864.324z" />
                </svg>
                Zalo
              </a>
            </div>

            <a
              href="mailto:workshops@gudbro.com"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] font-semibold transition-colors"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              workshops@gudbro.com
            </a>
          </div>
        </section>
      </main>

      {/* ================================================================
          BENTO MORE MENU -- Drawer
          ================================================================ */}
      {showMoreMenu && (
        <div className="animate-fade-in fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMoreMenu(false)}
          />

          {/* Panel */}
          <div
            className="pb-safe animate-slide-up absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            {/* Handle */}
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full" style={{ background: 'var(--sand)' }} />
            </div>

            <h3
              className="font-display mb-4 text-lg font-bold"
              style={{ color: 'var(--charcoal)' }}
            >
              More
            </h3>

            {/* Bento grid */}
            <div className="mb-5 grid grid-cols-3 gap-3">
              {MORE_MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setShowMoreMenu(false)}
                  className="flex flex-col items-center gap-1.5 rounded-xl p-3 transition-colors"
                  style={{ background: 'var(--cream)' }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="text-center text-[10px] font-medium"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Language setting */}
            <div className="mb-3">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Language
              </p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all"
                    style={{
                      background: selectedLang === lang.code ? 'var(--terracotta)' : 'var(--cream)',
                      color: selectedLang === lang.code ? 'white' : 'var(--charcoal)',
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency setting */}
            <div className="mb-5">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Currency
              </p>
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => setSelectedCurrency(curr.code)}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all"
                    style={{
                      background:
                        selectedCurrency === curr.code ? 'var(--terracotta)' : 'var(--cream)',
                      color: selectedCurrency === curr.code ? 'white' : 'var(--charcoal)',
                    }}
                  >
                    <span className="font-semibold">{curr.symbol}</span>
                    <span>{curr.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Close */}
            <button
              onClick={() => setShowMoreMenu(false)}
              className="w-full rounded-xl py-3 text-sm font-semibold"
              style={{
                background: 'var(--cream)',
                color: 'var(--charcoal-light)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
