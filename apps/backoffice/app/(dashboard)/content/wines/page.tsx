'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Wine type matching Supabase schema
interface Wine {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: WineColor;
  style: string;
  status: string;
  grape_varieties: string[];
  is_blend: boolean;
  vintage_type: string;
  origin_country: string;
  origin_country_code: string;
  origin_region: string;
  origin_subregion: string | null;
  origin_appellation: string | null;
  origin_classification: string | null;
  abv_min: number;
  abv_max: number;
  acidity: string;
  tannins: string;
  sweetness: string;
  body: string;
  oak: string;
  primary_flavors: string[];
  secondary_flavors: string[];
  tertiary_flavors: string[];
  aroma_profile: string[];
  finish: string;
  serving_temp_min_celsius: number;
  serving_temp_max_celsius: number;
  glass_type: string;
  decanting_minutes: number | null;
  aging_potential_min_years: number | null;
  aging_potential_max_years: number | null;
  food_categories: string[];
  specific_dishes: string[];
  cheese_pairings: string[];
  avoid_with: string[];
  is_vegan: boolean;
  is_organic: boolean;
  is_biodynamic: boolean;
  is_natural: boolean;
  is_low_sulfite: boolean;
  contains_sulfites: boolean;
  allergens: string[];
  calories_per_glass: number;
  ingredient_ids: string[];
  tags: string[];
  popularity: number;
  price_tier: string;
  production_method: string | null;
  aging_vessel: string | null;
  aging_months: number | null;
  annual_production_bottles: number | null;
}

type WineColor = 'red' | 'white' | 'rosé' | 'orange' | 'sparkling' | 'dessert' | 'fortified';

type ColorFilter = 'all' | WineColor;

const colorOptions: { value: ColorFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All Wines', icon: '🍷' },
  { value: 'red', label: 'Red', icon: '🍷' },
  { value: 'white', label: 'White', icon: '🥂' },
  { value: 'rosé', label: 'Rosé', icon: '🌸' },
  { value: 'sparkling', label: 'Sparkling', icon: '🍾' },
  { value: 'dessert', label: 'Dessert', icon: '🍯' },
  { value: 'fortified', label: 'Fortified', icon: '🥃' },
  { value: 'orange', label: 'Orange', icon: '🟠' },
];

const countryFlags: Record<string, string> = {
  IT: '🇮🇹',
  FR: '🇫🇷',
  ES: '🇪🇸',
  PT: '🇵🇹',
  DE: '🇩🇪',
  AT: '🇦🇹',
  US: '🇺🇸',
  AR: '🇦🇷',
  CL: '🇨🇱',
  AU: '🇦🇺',
  NZ: '🇳🇿',
  ZA: '🇿🇦',
  GE: '🇬🇪',
  HR: '🇭🇷',
  SI: '🇸🇮',
  RO: '🇷🇴',
  BG: '🇧🇬',
  GR: '🇬🇷',
  HU: '🇭🇺',
  MD: '🇲🇩',
  RS: '🇷🇸',
  AM: '🇦🇲',
  GB: '🇬🇧',
  LB: '🇱🇧',
  IL: '🇮🇱',
  TR: '🇹🇷',
  CN: '🇨🇳',
  JP: '🇯🇵',
  IN: '🇮🇳',
  UY: '🇺🇾',
  BR: '🇧🇷',
  MA: '🇲🇦',
  CH: '🇨🇭',
  MX: '🇲🇽',
  CA: '🇨🇦',
  CZ: '🇨🇿',
  SK: '🇸🇰',
  UA: '🇺🇦',
  CY: '🇨🇾',
  TN: '🇹🇳',
  DZ: '🇩🇿',
  PE: '🇵🇪',
  BO: '🇧🇴',
  TH: '🇹🇭',
  VN: '🇻🇳',
  ID: '🇮🇩',
  BE: '🇧🇪',
  LU: '🇱🇺',
  MT: '🇲🇹',
};

export default function WinesPage() {
  const t = useTranslations('winesPage');
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'country' | 'popularity'>('name');

  useEffect(() => {
    fetchWines();
  }, []);

  async function fetchWines() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('wines').select('*').order('name');

      if (error) throw error;
      setWines(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wines');
    } finally {
      setLoading(false);
    }
  }

  // Get unique countries from wines
  const countries = useMemo(() => {
    const countrySet = new Set(wines.map((w) => w.origin_country));
    return Array.from(countrySet).sort();
  }, [wines]);

  // Calculate stats
  const wineStats = useMemo(
    () => ({
      red: wines.filter((w) => w.color === 'red').length,
      white: wines.filter((w) => w.color === 'white').length,
      rose: wines.filter((w) => w.color === 'rosé').length,
      sparkling: wines.filter((w) => w.color === 'sparkling').length,
      dessert: wines.filter((w) => w.color === 'dessert').length,
      fortified: wines.filter((w) => w.color === 'fortified').length,
      orange: wines.filter((w) => w.color === 'orange').length,
    }),
    [wines]
  );

  // Filter wines
  const filteredWines = useMemo(() => {
    let filtered = [...wines];

    // Color filter
    if (colorFilter !== 'all') {
      filtered = filtered.filter((w) => w.color === colorFilter);
    }

    // Country filter
    if (countryFilter !== 'all') {
      filtered = filtered.filter((w) => w.origin_country === countryFilter);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          w.description.toLowerCase().includes(query) ||
          w.origin_region.toLowerCase().includes(query) ||
          w.grape_varieties.some((g) => g.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'country':
        filtered.sort((a, b) => a.origin_country.localeCompare(b.origin_country));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return filtered;
  }, [wines, colorFilter, countryFilter, searchQuery, sortBy]);

  const getColorBadge = (color: WineColor) => {
    const colors: Record<WineColor, string> = {
      red: 'bg-red-100 text-red-800',
      white: 'bg-yellow-50 text-yellow-800',
      rosé: 'bg-pink-100 text-pink-800',
      sparkling: 'bg-amber-100 text-amber-800',
      dessert: 'bg-orange-100 text-orange-800',
      fortified: 'bg-amber-200 text-amber-900',
      orange: 'bg-orange-100 text-orange-700',
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      classic: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800',
      reserve: 'bg-indigo-100 text-indigo-800',
      grand_cru: 'bg-gold-100 text-amber-900 border border-amber-300',
      everyday: 'bg-gray-100 text-gray-700',
      organic: 'bg-green-100 text-green-800',
      natural: 'bg-emerald-100 text-emerald-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriceTierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      budget: 'bg-gray-100 text-gray-600',
      value: 'bg-green-50 text-green-700',
      mid: 'bg-blue-50 text-blue-700',
      premium: 'bg-purple-50 text-purple-700',
      luxury: 'bg-amber-50 text-amber-800',
    };
    const labels: Record<string, string> = {
      budget: '$',
      value: '$$',
      mid: '$$$',
      premium: '$$$$',
      luxury: '$$$$$',
    };
    return { style: styles[tier] || 'bg-gray-100', label: labels[tier] || tier };
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900">{t('errorTitle')}</h3>
          <p className="mt-1 text-gray-500">{error}</p>
          <button
            onClick={fetchWines}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/content" className="hover:text-gray-700">
              {t('breadcrumb')}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{t('title')}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.wines" kbPageId="content-wines" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {t('subtitle', { count: wines.length, countriesCount: countries.length })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/content/wines/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {t('addWine')}
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div className="flex-shrink-0 rounded-lg bg-red-50 px-4 py-2">
          <span className="text-sm font-medium text-red-600">{t('stats.red')}</span>
          <span className="ml-2 text-lg font-bold text-red-800">{wineStats.red}</span>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-yellow-50 px-4 py-2">
          <span className="text-sm font-medium text-yellow-600">{t('stats.white')}</span>
          <span className="ml-2 text-lg font-bold text-yellow-800">{wineStats.white}</span>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-pink-50 px-4 py-2">
          <span className="text-sm font-medium text-pink-600">{t('stats.rose')}</span>
          <span className="ml-2 text-lg font-bold text-pink-800">{wineStats.rose}</span>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-amber-50 px-4 py-2">
          <span className="text-sm font-medium text-amber-600">{t('stats.sparkling')}</span>
          <span className="ml-2 text-lg font-bold text-amber-800">{wineStats.sparkling}</span>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-orange-50 px-4 py-2">
          <span className="text-sm font-medium text-orange-600">{t('stats.dessert')}</span>
          <span className="ml-2 text-lg font-bold text-orange-800">{wineStats.dessert}</span>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-purple-50 px-4 py-2">
          <span className="text-sm font-medium text-purple-600">{t('stats.fortified')}</span>
          <span className="ml-2 text-lg font-bold text-purple-800">{wineStats.fortified}</span>
        </div>
      </div>

      {/* Color Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {colorOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setColorFilter(option.value)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              colorFilter === option.value
                ? 'bg-blue-600 text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{option.icon}</span>
            <span>{t(`colorOptions.${option.value === 'rosé' ? 'rose' : option.value}`)}</span>
            {option.value === 'all' && (
              <span
                className={`rounded px-1.5 py-0.5 text-xs ${
                  colorFilter === 'all' ? 'bg-blue-500' : 'bg-gray-100'
                }`}
              >
                {wines.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative min-w-[200px] flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
        >
          <option value="all">{t('allCountriesWithCount', { count: countries.length })}</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {countryFlags[
                wines.find((w) => w.origin_country === country)?.origin_country_code || ''
              ] || ''}{' '}
              {country}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'country' | 'popularity')}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
        >
          <option value="name">{t('sortBy.name')}</option>
          <option value="country">{t('sortBy.country')}</option>
          <option value="popularity">{t('sortBy.popularity')}</option>
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        {t('showingResults', { filtered: filteredWines.length, total: wines.length })}
      </div>

      {/* Wines Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWines.map((wine) => {
          const flag = countryFlags[wine.origin_country_code] || '🌍';
          const priceTier = getPriceTierBadge(wine.price_tier);

          return (
            <div
              key={wine.id}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
            >
              {/* Wine Icon/Image */}
              <div className="relative flex h-24 items-center justify-center rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 text-5xl">
                {wine.color === 'red' && '🍷'}
                {wine.color === 'white' && '🥂'}
                {wine.color === 'rosé' && '🌸'}
                {wine.color === 'sparkling' && '🍾'}
                {wine.color === 'dessert' && '🍯'}
                {wine.color === 'fortified' && '🥃'}
                {wine.color === 'orange' && '🟠'}
                <span className="absolute left-2 top-2 text-xl">{flag}</span>
                <span
                  className={`absolute right-2 top-2 rounded px-2 py-0.5 text-xs font-medium ${priceTier.style}`}
                >
                  {priceTier.label}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 font-semibold text-gray-900">{wine.name}</h3>
                  <span
                    className={`flex-shrink-0 rounded px-2 py-0.5 text-xs font-medium capitalize ${getColorBadge(wine.color)}`}
                  >
                    {wine.color}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{wine.description}</p>

                {/* Origin */}
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                  <span>{flag}</span>
                  <span>
                    {wine.origin_region}, {wine.origin_country}
                  </span>
                </div>

                {/* Grapes */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {wine.grape_varieties.slice(0, 3).map((grape) => (
                    <span
                      key={grape}
                      className="rounded bg-gray-100 px-1.5 py-0.5 text-xs capitalize text-gray-600"
                    >
                      {grape.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {wine.grape_varieties.length > 3 && (
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                      +{wine.grape_varieties.length - 3}
                    </span>
                  )}
                </div>

                {/* Characteristics */}
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className={`rounded px-1.5 py-0.5 text-xs ${getStatusBadge(wine.status)}`}>
                    {wine.status.replace(/_/g, ' ')}
                  </span>
                  {wine.is_organic && (
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                      {t('card.organic')}
                    </span>
                  )}
                  {wine.is_natural && (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700">
                      {t('card.natural')}
                    </span>
                  )}
                  {wine.is_vegan && (
                    <span className="rounded bg-lime-100 px-1.5 py-0.5 text-xs text-lime-700">
                      {t('card.vegan')}
                    </span>
                  )}
                </div>

                {/* ABV & Serving */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {t('card.abv')}: {wine.abv_min}-{wine.abv_max}%
                  </span>
                  <span>
                    {t('card.serve')}: {wine.serving_temp_min_celsius}-
                    {wine.serving_temp_max_celsius}°C
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/content/wines/${wine.slug}`}
                      className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      title={t('card.viewEdit')}
                    >
                      ✏️
                    </Link>
                    <button
                      className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      title={t('card.duplicate')}
                    >
                      📋
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span title={t('card.popularity')}>{wine.popularity}%</span>
                    <span>{t('card.popularity')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Wine Card */}
        <Link
          href="/content/wines/new"
          className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50"
        >
          <span className="text-4xl text-gray-400">+</span>
          <span className="mt-2 text-sm font-medium text-gray-600">{t('addNewWine')}</span>
        </Link>
      </div>

      {/* Empty state */}
      {filteredWines.length === 0 && (
        <div className="py-12 text-center">
          <div className="mb-4 text-4xl">🍷</div>
          <h3 className="text-lg font-medium text-gray-900">{t('noWines')}</h3>
          <p className="mt-1 text-gray-500">
            {searchQuery ? t('noWinesSearchHint') : t('noWinesFilterHint')}
          </p>
        </div>
      )}
    </div>
  );
}
