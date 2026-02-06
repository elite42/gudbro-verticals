'use client';

import { useState, useEffect } from 'react';
import {
  TourCardHero,
  TourCardTall,
  TourCardStandard,
  TourCardCompact,
  TourMiniRow,
  TourBottleRow,
  TourCardHeroSkeleton,
  TourCardTallSkeleton,
  TourCardStandardSkeleton,
  TourCardCompactSkeleton,
  TourMiniRowSkeleton,
  TourBottleRowSkeleton,
} from '@/components/tours';
import { QuickFilters } from '@/components/search/SearchBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { detectLanguage, detectCurrency, cn } from '@/lib/utils';
import type { Tour, TourOperator } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   HOME PAGE - Clean Multi-Layout

   Clean cards showing only: image, title, price, badges, wishlist.
   All details (rating, reviews, duration, etc.) shown on detail page.
   ═══════════════════════════════════════════════════════════════════════════ */

const MOCK_OPERATOR: TourOperator = {
  id: '1',
  phone: '+84 905 123 456',
  name: "Minh's Tours",
  business_name: "Minh's Adventure Tours",
  area: 'Da Nang, Vietnam',
  whatsapp: '+84905123456',
  zalo: '0905123456',
  verified: true,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
};

const MOCK_TOURS: Tour[] = [
  {
    id: '1',
    operator_id: '1',
    name: 'Marble Mountains Adventure',
    slug: 'marble-mountains-adventure',
    description: 'Explore the mystical Marble Mountains with a local guide.',
    category: 'day_tour',
    price_vnd: 250000,
    price_usd: 10,
    price_per: 'person',
    min_people: 1,
    max_people: 4,
    duration: '3 hours',
    distance: '25km',
    included: ['Hotel pickup', 'Guide', 'Entrance fees'],
    excluded: ['Lunch', 'Tips'],
    pickup_locations: ['Novotel Da Nang'],
    departure_times: ['08:00 AM', '02:00 PM'],
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800'],
    rating: 4.9,
    review_count: 89,
    booking_count: 234,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '2',
    operator_id: '1',
    name: 'Hoi An Ancient Town Sunset Tour',
    slug: 'hoi-an-sunset-tour',
    description: 'Ride through rice paddies to magical Hoi An at sunset.',
    category: 'day_tour',
    price_vnd: 400000,
    price_usd: 16,
    price_per: 'person',
    min_people: 1,
    max_people: 2,
    duration: '4 hours',
    distance: '30km',
    included: ['Motorbike transport', 'Photo stops'],
    excluded: ['Entrance fees', 'Food'],
    pickup_locations: ['Any hotel in Da Nang'],
    departure_times: ['02:30 PM'],
    images: ['https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800'],
    rating: 4.7,
    review_count: 156,
    booking_count: 478,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '3',
    operator_id: '1',
    name: 'Da Nang Airport Transfer',
    slug: 'airport-transfer',
    description: 'Comfortable transfer to/from Da Nang Airport.',
    category: 'transport',
    price_vnd: 300000,
    price_usd: 12,
    price_per: 'vehicle',
    min_people: 1,
    max_people: 4,
    duration: '30-45 min',
    distance: '8-15km',
    included: ['AC vehicle', 'Flight tracking', 'Meet & greet'],
    excluded: ['Waiting time over 30 min'],
    pickup_locations: ['Da Nang Airport', 'Any hotel'],
    departure_times: ['Flexible'],
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'],
    rating: 4.8,
    review_count: 324,
    booking_count: 1256,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '4',
    operator_id: '1',
    name: 'Vietnamese Cooking Class',
    slug: 'cooking-class',
    description: 'Learn authentic Vietnamese cooking with a local family.',
    category: 'experience',
    price_vnd: 600000,
    price_usd: 24,
    price_per: 'person',
    min_people: 2,
    max_people: 6,
    duration: '4 hours',
    included: ['Market visit', 'Ingredients', 'Recipe book', 'Meal'],
    excluded: ['Hotel pickup (+100,000₫)'],
    departure_times: ['09:00 AM', '02:00 PM'],
    images: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800'],
    rating: 4.9,
    review_count: 167,
    booking_count: 398,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '5',
    operator_id: '1',
    name: 'Ba Na Hills Cable Car Experience',
    slug: 'ba-na-hills',
    description: 'Visit the famous Golden Bridge and French Village.',
    category: 'day_tour',
    price_vnd: 850000,
    price_usd: 34,
    price_per: 'person',
    min_people: 1,
    max_people: 8,
    duration: '8 hours',
    included: ['Cable car ticket', 'Lunch buffet', 'Hotel transfer'],
    excluded: ['Personal expenses'],
    pickup_locations: ['Any hotel in Da Nang'],
    departure_times: ['07:00 AM'],
    images: ['https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800'],
    rating: 4.6,
    review_count: 542,
    booking_count: 1823,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '6',
    operator_id: '1',
    name: 'My Son Sanctuary Sunrise Tour',
    slug: 'my-son-sanctuary',
    description: 'Ancient Hindu temples at mystical sunrise.',
    category: 'day_tour',
    price_vnd: 550000,
    price_usd: 22,
    price_per: 'person',
    min_people: 2,
    max_people: 12,
    duration: '5 hours',
    included: ['Entrance fees', 'Guide', 'Breakfast', 'Transfer'],
    excluded: ['Tips'],
    pickup_locations: ['Da Nang', 'Hoi An'],
    departure_times: ['04:30 AM'],
    images: ['https://images.unsplash.com/photo-1528127269322-539801943592?w=800'],
    rating: 4.8,
    review_count: 289,
    booking_count: 967,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
];

const QUICK_FILTERS = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'day_tour', label: 'Day Tours', icon: '🏍️' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'experience', label: 'Experiences', icon: '🎨' },
];

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧' },
  { code: 'vi', flag: '🇻🇳' },
  { code: 'ko', flag: '🇰🇷' },
  { code: 'zh', flag: '🇨🇳' },
  { code: 'ja', flag: '🇯🇵' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'VND', symbol: '₫' },
  { code: 'EUR', symbol: '€' },
  { code: 'KRW', symbol: '₩' },
  { code: 'JPY', symbol: '¥' },
];

export default function HomePage() {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>('all');
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'deals' | 'profile'>('home');
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setLanguage(detectLanguage());
    setCurrency(detectCurrency());
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredTours = MOCK_TOURS.filter((tour) => {
    const matchesFilter =
      !selectedFilter || selectedFilter === 'all' || tour.category === selectedFilter;
    const matchesSearch =
      !searchQuery || tour.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredTours = MOCK_TOURS.filter((t) => t.featured);
  const heroTour = featuredTours[0];
  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const currentCurr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <div
      className={cn(
        'min-h-screen pb-20 transition-colors duration-300',
        isDark ? 'bg-gray-950' : 'bg-gray-50'
      )}
    >
      {/* PREMIUM HEADER - Compact */}
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          isDark
            ? 'border-b border-white/5 bg-gray-900/95 backdrop-blur-xl'
            : 'border-b border-gray-100 bg-white/95 backdrop-blur-xl'
        )}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Brand Section */}
            <div className="flex items-center gap-3">
              {/* Logo with premium gradient */}
              <div className="relative">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold',
                    'from-accent via-primary to-primary bg-gradient-to-br',
                    'shadow-primary/25 text-white shadow-lg'
                  )}
                >
                  GT
                </div>
                {/* Verified badge */}
                {MOCK_OPERATOR.verified && (
                  <div
                    className={cn(
                      'bg-success absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full',
                      'flex items-center justify-center ring-2',
                      isDark ? 'ring-gray-900' : 'ring-white'
                    )}
                  >
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Operator Info */}
              <div className="flex flex-col">
                <h1
                  className={cn(
                    'text-base font-semibold tracking-tight',
                    isDark ? 'text-white' : 'text-gray-900'
                  )}
                >
                  {MOCK_OPERATOR.name}
                </h1>
                <div className="flex items-center gap-1.5">
                  <div className="bg-success h-1.5 w-1.5 animate-pulse rounded-full" />
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    )}
                  >
                    {MOCK_OPERATOR.area}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions - Minimal icons like footer */}
            <div className="flex items-center gap-1">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center transition-all duration-200',
                  isDark
                    ? 'text-accent hover:text-accent-glow'
                    : 'text-gray-400 hover:text-gray-500'
                )}
              >
                {isDark ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                )}
              </button>

              {/* Language Selector - Globe icon */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowCurrMenu(false);
                  }}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center transition-all duration-200',
                    showLangMenu
                      ? 'text-accent'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-500'
                  )}
                >
                  <svg
                    className="h-6 w-6"
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
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                    <div
                      className={cn(
                        'absolute right-0 top-full z-20 mt-2 min-w-[140px] rounded-2xl py-2',
                        'border shadow-xl backdrop-blur-xl',
                        isDark
                          ? 'border-white/10 bg-gray-800/95 shadow-black/50'
                          : 'border-gray-200 bg-white/95 shadow-gray-200/50'
                      )}
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            language === lang.code
                              ? 'text-accent bg-accent/10'
                              : isDark
                                ? 'text-gray-300 hover:bg-white/5'
                                : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium uppercase tracking-wide">{lang.code}</span>
                          {language === lang.code && (
                            <svg
                              className="text-accent ml-auto h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Currency Selector - Minimal */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCurrMenu(!showCurrMenu);
                    setShowLangMenu(false);
                  }}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center transition-all duration-200',
                    'text-lg font-medium',
                    showCurrMenu
                      ? 'text-accent'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-500'
                  )}
                >
                  {currentCurr.symbol}
                </button>

                {showCurrMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowCurrMenu(false)} />
                    <div
                      className={cn(
                        'absolute right-0 top-full z-20 mt-2 min-w-[130px] rounded-2xl py-2',
                        'border shadow-xl backdrop-blur-xl',
                        isDark
                          ? 'border-white/10 bg-gray-800/95 shadow-black/50'
                          : 'border-gray-200 bg-white/95 shadow-gray-200/50'
                      )}
                    >
                      {CURRENCIES.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrency(curr.code);
                            setShowCurrMenu(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            currency === curr.code
                              ? 'text-accent bg-accent/10 font-semibold'
                              : isDark
                                ? 'text-gray-300 hover:bg-white/5'
                                : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          <span className="w-5 text-center font-semibold">{curr.symbol}</span>
                          <span>{curr.code}</span>
                          {currency === curr.code && (
                            <svg
                              className="text-accent ml-auto h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="px-4 pb-3">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto py-1">
            {QUICK_FILTERS.map((filter) => {
              const isSelected = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(isSelected ? null : filter.id)}
                  className={cn(
                    'flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2',
                    'whitespace-nowrap text-sm font-medium transition-all duration-200',
                    isSelected
                      ? 'from-accent to-primary shadow-primary/25 bg-gradient-to-r text-white shadow-md'
                      : isDark
                        ? 'hover:bg-white/15 bg-white/10 text-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {filter.icon && <span className="text-base">{filter.icon}</span>}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* BENTO MENU DRAWER */}
      {showMenu && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className={cn(
              'absolute inset-0 transition-opacity',
              isDark ? 'bg-black/80' : 'bg-black/50'
            )}
            onClick={() => setShowMenu(false)}
          />

          {/* Menu Drawer */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 rounded-t-3xl p-5 pb-8',
              'transform transition-transform duration-300',
              isDark ? 'bg-gray-900' : 'bg-white'
            )}
          >
            {/* Handle */}
            <div className="mb-5 flex justify-center">
              <div
                className={cn('h-1 w-10 rounded-full', isDark ? 'bg-gray-700' : 'bg-gray-300')}
              />
            </div>

            {/* Search Input */}
            <div
              className={cn(
                'mb-6 flex items-center gap-3 rounded-2xl px-4 py-3',
                'border-2',
                isDark
                  ? 'focus-within:border-accent/50 border-white/10 bg-white/5'
                  : 'focus-within:border-accent border-gray-100 bg-gray-50'
              )}
            >
              <svg
                className={cn('h-5 w-5', isDark ? 'text-gray-400' : 'text-gray-400')}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tours & experiences..."
                className={cn(
                  'flex-1 bg-transparent text-base font-medium outline-none',
                  isDark
                    ? 'text-white placeholder:text-gray-500'
                    : 'text-gray-900 placeholder:text-gray-400'
                )}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={cn(
                    'rounded-lg p-1.5 transition-colors',
                    isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-400 hover:bg-gray-100'
                  )}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Categories Grid */}
            <div className="mb-6">
              <h3
                className={cn(
                  'mb-3 text-xs font-semibold uppercase tracking-wider',
                  isDark ? 'text-gray-500' : 'text-gray-400'
                )}
              >
                Categories
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  {
                    id: 'day_tour',
                    icon: '🏍️',
                    label: 'Day Tours',
                    color: 'from-accent to-primary',
                  },
                  {
                    id: 'transport',
                    icon: '🚗',
                    label: 'Transport',
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    id: 'experience',
                    icon: '🎨',
                    label: 'Experiences',
                    color: 'from-purple-500 to-pink-500',
                  },
                  { id: 'food', icon: '🍜', label: 'Food', color: 'from-green-500 to-emerald-500' },
                  {
                    id: 'adventure',
                    icon: '🧗',
                    label: 'Adventure',
                    color: 'from-red-500 to-rose-500',
                  },
                  {
                    id: 'culture',
                    icon: '🏛️',
                    label: 'Culture',
                    color: 'from-indigo-500 to-violet-500',
                  },
                  {
                    id: 'nature',
                    icon: '🌿',
                    label: 'Nature',
                    color: 'from-teal-500 to-green-500',
                  },
                  {
                    id: 'nightlife',
                    icon: '🌙',
                    label: 'Nightlife',
                    color: 'from-slate-500 to-zinc-600',
                  },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedFilter(cat.id);
                      setShowMenu(false);
                    }}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-2xl p-3 transition-all duration-200',
                      'hover:scale-105 active:scale-95',
                      selectedFilter === cat.id
                        ? `bg-gradient-to-br ${cat.color} text-white shadow-lg`
                        : isDark
                          ? 'bg-white/5 hover:bg-white/10'
                          : 'bg-gray-50 hover:bg-gray-100'
                    )}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span
                      className={cn(
                        'text-center text-[10px] font-medium leading-tight',
                        selectedFilter === cat.id
                          ? 'text-white'
                          : isDark
                            ? 'text-gray-300'
                            : 'text-gray-600'
                      )}
                    >
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3
                className={cn(
                  'mb-3 text-xs font-semibold uppercase tracking-wider',
                  isDark ? 'text-gray-500' : 'text-gray-400'
                )}
              >
                Quick Actions
              </h3>
              <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
                {[
                  { icon: '🔥', label: 'Hot Deals' },
                  { icon: '⭐', label: 'Top Rated' },
                  { icon: '📍', label: 'Near Me' },
                  { icon: '🆕', label: 'New' },
                  { icon: '💰', label: 'Budget' },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setShowMenu(false)}
                    className={cn(
                      'flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5',
                      'transition-all duration-200',
                      'hover:scale-105 active:scale-95',
                      isDark
                        ? 'hover:bg-white/15 bg-white/10 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    <span>{action.icon}</span>
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="space-y-6 px-4 py-4">
        {/* HERO */}
        {isLoading ? (
          <TourCardHeroSkeleton />
        ) : (
          heroTour && <TourCardHero tour={heroTour} currency={currency} />
        )}

        {/* HOT DEALS */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
                <span className="text-sm">🔥</span>
              </div>
              <div>
                <h2 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>
                  Hot Deals
                </h2>
                <p
                  className={cn(
                    'text-[10px] font-medium',
                    isDark ? 'text-primary' : 'text-primary'
                  )}
                >
                  Limited time offers
                </p>
              </div>
            </div>
            <button className="text-accent hover:text-accent text-sm font-medium transition-colors">
              See all
            </button>
          </div>

          <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {MOCK_TOURS.slice(0, 3).map((tour, index) => (
              <div
                key={tour.id}
                className={cn(
                  'relative w-64 flex-shrink-0 snap-start overflow-hidden rounded-2xl',
                  'group cursor-pointer transition-transform duration-200',
                  'hover:scale-[1.02] active:scale-[0.98]'
                )}
              >
                {/* Background Image */}
                <div className="relative aspect-[16/10]">
                  <img
                    src={tour.images[0]}
                    alt={tour.name}
                    className="h-full w-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Discount Badge */}
                  <div className="absolute left-3 top-3">
                    <div className="bg-error flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold text-white">
                      <span>-{20 + index * 5}%</span>
                    </div>
                  </div>

                  {/* Timer Badge */}
                  <div className="absolute right-3 top-3">
                    <div
                      className={cn(
                        'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                        'bg-black/50 text-white backdrop-blur-sm'
                      )}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.42V7z" />
                      </svg>
                      <span>{3 - index}h left</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-white">
                      {tour.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-white/50 line-through">
                          {currency === 'USD'
                            ? `$${Math.round(tour.price_usd * 1.25)}`
                            : `${(tour.price_vnd * 1.25).toLocaleString()}₫`}
                        </span>
                        <span className="text-base font-bold text-white">
                          {currency === 'USD'
                            ? `$${tour.price_usd}`
                            : `${tour.price_vnd.toLocaleString()}₫`}
                        </span>
                      </div>
                      <div className="text-accent flex items-center gap-1 text-xs">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="font-medium">{tour.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DISCOVER - Tall cards */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>
              Discover
            </h2>
            <button className="text-accent hover:text-accent text-sm font-medium transition-colors">
              See all
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <TourCardTallSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {featuredTours.slice(1, 3).map((tour) => (
                <TourCardTall key={tour.id} tour={tour} currency={currency} />
              ))}
            </div>
          )}
        </section>

        {/* POPULAR - Standard cards */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>
                Popular Tours
              </h2>
              <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>
                {filteredTours.length} experiences
              </p>
            </div>
            <button className="text-accent hover:text-accent text-sm font-medium transition-colors">
              See all
            </button>
          </div>

          {isLoading ? (
            <div className="grid gap-4">
              {[1, 2].map((i) => (
                <TourCardStandardSkeleton key={i} />
              ))}
            </div>
          ) : filteredTours.length === 0 ? (
            <div
              className={cn(
                'rounded-2xl border py-12 text-center',
                isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-white'
              )}
            >
              <div className="mb-3 text-4xl">🔍</div>
              <h3
                className={cn(
                  'mb-1 text-base font-semibold',
                  isDark ? 'text-white' : 'text-gray-900'
                )}
              >
                No tours found
              </h3>
              <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTours.slice(0, 2).map((tour) => (
                <TourCardStandard key={tour.id} tour={tour} currency={currency} />
              ))}
            </div>
          )}
        </section>

        {/* QUICK BOOKINGS - Compact cards */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>
              Quick Bookings
            </h2>
            <button className="text-accent hover:text-accent text-sm font-medium transition-colors">
              See all
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <TourCardCompactSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {MOCK_TOURS.slice(2, 5).map((tour) => (
                <TourCardCompact key={tour.id} tour={tour} currency={currency} />
              ))}
            </div>
          )}
        </section>

        {/* FEATURED EXPERIENCES - Bottle cards (tall vertical) */}
        {isLoading ? (
          <TourBottleRowSkeleton />
        ) : (
          <TourBottleRow tours={featuredTours} currency={currency} title="Featured Experiences" />
        )}

        {/* SUGGESTIONS - Mini row */}
        {isLoading ? (
          <TourMiniRowSkeleton />
        ) : (
          <TourMiniRow tours={MOCK_TOURS} currency={currency} title="You might also like" />
        )}

        {/* Trust section */}
        <div
          className={cn(
            'rounded-2xl border p-4',
            isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-white'
          )}
        >
          <h3 className={cn('mb-3 text-sm font-semibold', isDark ? 'text-white' : 'text-gray-900')}>
            Why book with us?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '✓', text: 'Free cancellation' },
              { icon: '⚡', text: 'Instant confirmation' },
              { icon: '🛡️', text: 'Secure payment' },
              { icon: '💬', text: '24/7 support' },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-2 text-sm',
                  isDark ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onMenuClick={() => setShowMenu(true)}
        isDark={isDark}
      />
    </div>
  );
}
