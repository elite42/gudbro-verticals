'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  subcategory: string;
  product_type: string;
  selling_price_usd: number | null;
  calories_per_serving: number | null;
  is_vegan: boolean;
  is_dairy_free: boolean;
  is_gluten_free: boolean;
  allergens: string[];
  tags: string[];
  popularity: number;
  is_signature: boolean;
  image_url: string | null;
  prep_time_seconds: number | null;
}

interface SubcategoryInfo {
  name: string;
  category: string;
  count: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  beverages: '🍹',
  dishes: '🍽️',
  sides: '🥗',
};

const SUBCATEGORY_ICONS: Record<string, string> = {
  coffee: '☕',
  tea: '🍵',
  cocktails: '🍸',
  wines: '🍷',
  smoothies: '🥤',
  pasta: '🍝',
  pizzas: '🍕',
  salads: '🥗',
  burgers: '🍔',
  risotti: '🍚',
  soups: '🍲',
  dumplings: '🥟',
  steaks: '🥩',
  seafood: '🦐',
  sandwiches: '🥪',
  desserts: '🍰',
  appetizers: '🥢',
};

function formatTime(seconds?: number | null): string {
  if (!seconds) return '-';
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function formatPrice(price?: number | null): string {
  if (!price) return '-';
  return `$${price.toFixed(2)}`;
}

export default function RecipesPage() {
  const t = useTranslations('recipesPage');
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'vegan' | 'dairy-free' | 'gluten-free'>(
    'all'
  );
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchProducts();
  }, [selectedSubcategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (selectedSubcategory !== 'all') {
        params.set('subcategory', selectedSubcategory);
      }
      params.set('limit', '500');

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      setProducts(data.products || []);
      setSubcategories(data.subcategories || []);
      setStats(data.stats || {});
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    const matchesDiet =
      dietFilter === 'all' ||
      (dietFilter === 'vegan' && product.is_vegan) ||
      (dietFilter === 'dairy-free' && product.is_dairy_free) ||
      (dietFilter === 'gluten-free' && product.is_gluten_free);

    return matchesSearch && matchesCategory && matchesDiet;
  });

  const totalProducts = Object.values(stats).reduce((a, b) => a + b, 0);

  const categories = ['beverages', 'dishes', 'sides'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('description', { count: totalProducts.toLocaleString() })}
          </p>
        </div>
        <Link
          href="/content/recipes/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <span>+</span> {t('createRecipe')}
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4">
          <p className="text-sm font-medium text-blue-600">{t('totalRecipes')}</p>
          <p className="text-2xl font-bold text-blue-900">{totalProducts.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 p-4">
          <p className="text-sm font-medium text-amber-600">
            {CATEGORY_ICONS.beverages} {t('beverages')}
          </p>
          <p className="text-2xl font-bold text-amber-900">
            {(['coffee', 'tea', 'cocktails', 'wines', 'smoothies'] as const).reduce(
              (sum, key) => sum + (stats[key] || 0),
              0
            )}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-rose-50 to-rose-100 p-4">
          <p className="text-sm font-medium text-rose-600">
            {CATEGORY_ICONS.dishes} {t('dishes')}
          </p>
          <p className="text-2xl font-bold text-rose-900">
            {(
              ['pasta', 'pizzas', 'burgers', 'risotti', 'dumplings', 'steaks', 'seafood'] as const
            ).reduce((sum, key) => sum + (stats[key] || 0), 0)}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
          <p className="text-sm font-medium text-emerald-600">
            {CATEGORY_ICONS.sides} {t('sides')}
          </p>
          <p className="text-2xl font-bold text-emerald-900">
            {(['salads', 'soups', 'sandwiches', 'desserts', 'appetizers'] as const).reduce(
              (sum, key) => sum + (stats[key] || 0),
              0
            )}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
          <p className="text-sm font-medium text-green-600">🌱 {t('veganOptions')}</p>
          <p className="text-2xl font-bold text-green-900">
            {products.filter((p) => p.is_vegan).length}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
          <p className="text-sm font-medium text-purple-600">⭐ {t('signatures')}</p>
          <p className="text-2xl font-bold text-purple-900">
            {products.filter((p) => p.is_signature).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Diet Filter */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: t('all'), icon: '📋' },
            { id: 'vegan', label: t('vegan'), icon: '🌱' },
            { id: 'dairy-free', label: t('dairyFree'), icon: '🥛' },
            { id: 'gluten-free', label: t('glutenFree'), icon: '🌾' },
          ].map((diet) => (
            <button
              key={diet.id}
              onClick={() => setDietFilter(diet.id as typeof dietFilter)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                dietFilter === diet.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {diet.icon} {diet.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => {
            setSelectedCategory('all');
            setSelectedSubcategory('all');
          }}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📋 {t('allCategories')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubcategory('all');
            }}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Subcategory Pills */}
      <div className="flex flex-wrap gap-2">
        {subcategories
          .filter((sub) => selectedCategory === 'all' || sub.category === selectedCategory)
          .map((sub) => (
            <button
              key={sub.name}
              onClick={() =>
                setSelectedSubcategory(sub.name === selectedSubcategory ? 'all' : sub.name)
              }
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                selectedSubcategory === sub.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
              }`}
            >
              {SUBCATEGORY_ICONS[sub.name] || '📦'} {sub.name}
              <span
                className={`ml-1 text-xs ${selectedSubcategory === sub.name ? 'text-blue-200' : 'text-gray-400'}`}
              >
                ({sub.count})
              </span>
            </button>
          ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <span className="ml-3 text-gray-500">{t('loading')}</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-medium">{t('errorTitle')}</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-2 text-sm font-medium text-red-600 hover:underline"
          >
            {t('tryAgain')}
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !error && (
        <>
          <p className="text-sm text-gray-500">
            {t('showingResults', { filtered: filteredProducts.length, total: products.length })}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/content/recipes/${product.product_type}/${product.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      {SUBCATEGORY_ICONS[product.subcategory] || '🍽️'}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute left-2 top-2 flex flex-wrap gap-1">
                    {product.is_signature && (
                      <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs font-bold text-white">
                        ⭐ {t('signature')}
                      </span>
                    )}
                    {product.is_vegan && (
                      <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                        🌱 {t('vegan')}
                      </span>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-2 right-2">
                    <span className="rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium capitalize text-white">
                      {product.subcategory}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">{product.description}</p>
                  )}

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    {product.selling_price_usd && (
                      <span className="font-semibold text-green-600">
                        {formatPrice(product.selling_price_usd)}
                      </span>
                    )}
                    {product.calories_per_serving && (
                      <span>🔥 {product.calories_per_serving} cal</span>
                    )}
                    {product.prep_time_seconds && (
                      <span>⏱️ {formatTime(product.prep_time_seconds)}</span>
                    )}
                    {product.popularity > 0 && <span>📊 {product.popularity}%</span>}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                      {product.tags.length > 3 && (
                        <span className="text-xs text-gray-400">+{product.tags.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Dietary Icons */}
                  <div className="mt-2 flex gap-1">
                    {product.is_dairy_free && (
                      <span title="Dairy-free" className="text-sm">
                        🥛✗
                      </span>
                    )}
                    {product.is_gluten_free && (
                      <span title="Gluten-free" className="text-sm">
                        🌾✗
                      </span>
                    )}
                    {product.allergens && product.allergens.length > 0 && (
                      <span
                        title={`Contains: ${product.allergens.join(', ')}`}
                        className="text-sm text-orange-500"
                      >
                        ⚠️ {product.allergens.length}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <span className="text-5xl">🔍</span>
              <p className="mt-4 text-lg font-medium text-gray-900">{t('noRecipes')}</p>
              <p className="mt-1 text-gray-500">{t('noRecipesHint')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
