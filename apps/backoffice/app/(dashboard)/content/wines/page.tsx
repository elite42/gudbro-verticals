'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

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
  IT: '🇮🇹', FR: '🇫🇷', ES: '🇪🇸', PT: '🇵🇹', DE: '🇩🇪', AT: '🇦🇹',
  US: '🇺🇸', AR: '🇦🇷', CL: '🇨🇱', AU: '🇦🇺', NZ: '🇳🇿', ZA: '🇿🇦',
  GE: '🇬🇪', HR: '🇭🇷', SI: '🇸🇮', RO: '🇷🇴', BG: '🇧🇬', GR: '🇬🇷',
  HU: '🇭🇺', MD: '🇲🇩', RS: '🇷🇸', AM: '🇦🇲', GB: '🇬🇧', LB: '🇱🇧',
  IL: '🇮🇱', TR: '🇹🇷', CN: '🇨🇳', JP: '🇯🇵', IN: '🇮🇳', UY: '🇺🇾',
  BR: '🇧🇷', MA: '🇲🇦', CH: '🇨🇭', MX: '🇲🇽', CA: '🇨🇦', CZ: '🇨🇿',
  SK: '🇸🇰', UA: '🇺🇦', CY: '🇨🇾', TN: '🇹🇳', DZ: '🇩🇿', PE: '🇵🇪',
  BO: '🇧🇴', TH: '🇹🇭', VN: '🇻🇳', ID: '🇮🇩', BE: '🇧🇪', LU: '🇱🇺',
  MT: '🇲🇹',
};

export default function WinesPage() {
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
      const { data, error } = await supabase
        .from('wines')
        .select('*')
        .order('name');

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
    const countrySet = new Set(wines.map(w => w.origin_country));
    return Array.from(countrySet).sort();
  }, [wines]);

  // Calculate stats
  const wineStats = useMemo(() => ({
    red: wines.filter(w => w.color === 'red').length,
    white: wines.filter(w => w.color === 'white').length,
    rose: wines.filter(w => w.color === 'rosé').length,
    sparkling: wines.filter(w => w.color === 'sparkling').length,
    dessert: wines.filter(w => w.color === 'dessert').length,
    fortified: wines.filter(w => w.color === 'fortified').length,
    orange: wines.filter(w => w.color === 'orange').length,
  }), [wines]);

  // Filter wines
  const filteredWines = useMemo(() => {
    let filtered = [...wines];

    // Color filter
    if (colorFilter !== 'all') {
      filtered = filtered.filter(w => w.color === colorFilter);
    }

    // Country filter
    if (countryFilter !== 'all') {
      filtered = filtered.filter(w => w.origin_country === countryFilter);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(w =>
        w.name.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query) ||
        w.origin_region.toLowerCase().includes(query) ||
        w.grape_varieties.some(g => g.toLowerCase().includes(query))
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900">Error loading wines</h3>
          <p className="text-gray-500 mt-1">{error}</p>
          <button
            onClick={fetchWines}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
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
              Content
            </Link>
            <span>/</span>
            <span className="text-gray-900">Wines</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Wine Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">
            {wines.length} wines from {countries.length} countries
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/content/wines/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Add Wine
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div className="flex-shrink-0 px-4 py-2 bg-red-50 rounded-lg">
          <span className="text-sm text-red-600 font-medium">Red</span>
          <span className="ml-2 text-lg font-bold text-red-800">{wineStats.red}</span>
        </div>
        <div className="flex-shrink-0 px-4 py-2 bg-yellow-50 rounded-lg">
          <span className="text-sm text-yellow-600 font-medium">White</span>
          <span className="ml-2 text-lg font-bold text-yellow-800">{wineStats.white}</span>
        </div>
        <div className="flex-shrink-0 px-4 py-2 bg-pink-50 rounded-lg">
          <span className="text-sm text-pink-600 font-medium">Rosé</span>
          <span className="ml-2 text-lg font-bold text-pink-800">{wineStats.rose}</span>
        </div>
        <div className="flex-shrink-0 px-4 py-2 bg-amber-50 rounded-lg">
          <span className="text-sm text-amber-600 font-medium">Sparkling</span>
          <span className="ml-2 text-lg font-bold text-amber-800">{wineStats.sparkling}</span>
        </div>
        <div className="flex-shrink-0 px-4 py-2 bg-orange-50 rounded-lg">
          <span className="text-sm text-orange-600 font-medium">Dessert</span>
          <span className="ml-2 text-lg font-bold text-orange-800">{wineStats.dessert}</span>
        </div>
        <div className="flex-shrink-0 px-4 py-2 bg-purple-50 rounded-lg">
          <span className="text-sm text-purple-600 font-medium">Fortified</span>
          <span className="ml-2 text-lg font-bold text-purple-800">{wineStats.fortified}</span>
        </div>
      </div>

      {/* Color Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {colorOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setColorFilter(option.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              colorFilter === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
            {option.value === 'all' && (
              <span className={`px-1.5 py-0.5 rounded text-xs ${
                colorFilter === 'all' ? 'bg-blue-500' : 'bg-gray-100'
              }`}>
                {wines.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search wines, grapes, regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          <option value="all">All Countries ({countries.length})</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {countryFlags[wines.find(w => w.origin_country === country)?.origin_country_code || ''] || ''} {country}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'country' | 'popularity')}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          <option value="name">Sort by Name</option>
          <option value="country">Sort by Country</option>
          <option value="popularity">Sort by Popularity</option>
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {filteredWines.length} of {wines.length} wines
      </div>

      {/* Wines Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWines.map((wine) => {
          const flag = countryFlags[wine.origin_country_code] || '🌍';
          const priceTier = getPriceTierBadge(wine.price_tier);

          return (
            <div
              key={wine.id}
              className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              {/* Wine Icon/Image */}
              <div className="h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-5xl relative">
                {wine.color === 'red' && '🍷'}
                {wine.color === 'white' && '🥂'}
                {wine.color === 'rosé' && '🌸'}
                {wine.color === 'sparkling' && '🍾'}
                {wine.color === 'dessert' && '🍯'}
                {wine.color === 'fortified' && '🥃'}
                {wine.color === 'orange' && '🟠'}
                <span className="absolute top-2 left-2 text-xl">{flag}</span>
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium ${priceTier.style}`}>
                  {priceTier.label}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{wine.name}</h3>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium capitalize ${getColorBadge(wine.color)}`}>
                    {wine.color}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {wine.description}
                </p>

                {/* Origin */}
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                  <span>{flag}</span>
                  <span>{wine.origin_region}, {wine.origin_country}</span>
                </div>

                {/* Grapes */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {wine.grape_varieties.slice(0, 3).map((grape) => (
                    <span
                      key={grape}
                      className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs capitalize"
                    >
                      {grape.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {wine.grape_varieties.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                      +{wine.grape_varieties.length - 3}
                    </span>
                  )}
                </div>

                {/* Characteristics */}
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${getStatusBadge(wine.status)}`}>
                    {wine.status.replace(/_/g, ' ')}
                  </span>
                  {wine.is_organic && (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      Organic
                    </span>
                  )}
                  {wine.is_natural && (
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">
                      Natural
                    </span>
                  )}
                  {wine.is_vegan && (
                    <span className="px-1.5 py-0.5 bg-lime-100 text-lime-700 rounded text-xs">
                      Vegan
                    </span>
                  )}
                </div>

                {/* ABV & Serving */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>ABV: {wine.abv_min}-{wine.abv_max}%</span>
                  <span>Serve: {wine.serving_temp_min_celsius}-{wine.serving_temp_max_celsius}°C</span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/content/wines/${wine.slug}`}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="View/Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="Duplicate"
                    >
                      📋
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span title="Popularity">{wine.popularity}%</span>
                    <span>pop.</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Wine Card */}
        <Link
          href="/content/wines/new"
          className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center min-h-[280px]"
        >
          <span className="text-4xl text-gray-400">+</span>
          <span className="mt-2 text-sm font-medium text-gray-600">Add New Wine</span>
        </Link>
      </div>

      {/* Empty state */}
      {filteredWines.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🍷</div>
          <h3 className="text-lg font-medium text-gray-900">No wines found</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery
              ? 'Try a different search term'
              : 'Adjust your filters to see wines'}
          </p>
        </div>
      )}
    </div>
  );
}
