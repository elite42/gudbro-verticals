'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MultiLangText {
  en?: string;
  vi?: string;
  ko?: string;
  ja?: string;
}

interface MenuItem {
  id: string;
  name_multilang: MultiLangText;
  slug: string;
  price: number;
  food_cost: number | null;
  profit_margin: number | null;
  food_cost_updated_at: string | null;
  category_id: string;
  is_available: boolean;
}

interface Category {
  id: string;
  name_multilang: MultiLangText;
}

// Margin thresholds
const MARGIN_THRESHOLDS = {
  excellent: 70, // >= 70% margin
  good: 60, // >= 60% margin
  warning: 50, // >= 50% margin
  critical: 0, // < 50% margin
};

export default function FoodCostsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'margin_asc' | 'margin_desc' | 'cost_asc' | 'cost_desc'>(
    'margin_asc'
  );
  const [showNeedsRecipe, setShowNeedsRecipe] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      // Fetch menu items
      const { data: items, error: itemsError } = await supabase
        .from('menu_items')
        .select(
          'id, name_multilang, slug, price, food_cost, profit_margin, food_cost_updated_at, category_id, is_available'
        )
        .order('name_multilang->en');

      if (itemsError) throw itemsError;

      // Fetch categories
      const { data: cats, error: catsError } = await supabase
        .from('categories')
        .select('id, name_multilang')
        .order('sort_order');

      if (catsError) throw catsError;

      setMenuItems(items || []);
      setCategories(cats || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }

  const getName = (multilang: MultiLangText | null): string => {
    if (!multilang) return 'Unnamed';
    return multilang.en || multilang.vi || 'Unnamed';
  };

  const getMarginClass = (margin: number | null): string => {
    if (margin === null) return 'bg-gray-100 text-gray-600';
    if (margin >= MARGIN_THRESHOLDS.excellent) return 'bg-green-100 text-green-700';
    if (margin >= MARGIN_THRESHOLDS.good) return 'bg-emerald-100 text-emerald-700';
    if (margin >= MARGIN_THRESHOLDS.warning) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  const getMarginLabel = (margin: number | null): string => {
    if (margin === null) return 'No recipe';
    if (margin >= MARGIN_THRESHOLDS.excellent) return 'Excellent';
    if (margin >= MARGIN_THRESHOLDS.good) return 'Good';
    if (margin >= MARGIN_THRESHOLDS.warning) return 'Warning';
    return 'Critical';
  };

  const formatCurrency = (amount: number | null, currency = 'VND'): string => {
    if (amount === null) return '-';
    if (currency === 'VND') {
      return `${amount.toLocaleString()}₫`;
    }
    return `$${amount.toFixed(2)}`;
  };

  // Filter and sort
  const filteredItems = menuItems
    .filter((item) => {
      const name = getName(item.name_multilang).toLowerCase();
      const matchesSearch = name.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
      const matchesNeedsRecipe = showNeedsRecipe ? item.food_cost === null : true;
      return matchesSearch && matchesCategory && matchesNeedsRecipe;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'margin_asc':
          return (a.profit_margin ?? -999) - (b.profit_margin ?? -999);
        case 'margin_desc':
          return (b.profit_margin ?? -999) - (a.profit_margin ?? -999);
        case 'cost_asc':
          return (a.food_cost ?? 0) - (b.food_cost ?? 0);
        case 'cost_desc':
          return (b.food_cost ?? 0) - (a.food_cost ?? 0);
        default:
          return 0;
      }
    });

  // Stats
  const itemsWithCost = menuItems.filter((i) => i.food_cost !== null);
  const avgMargin =
    itemsWithCost.length > 0
      ? itemsWithCost.reduce((sum, i) => sum + (i.profit_margin || 0), 0) / itemsWithCost.length
      : 0;
  const lowMarginCount = menuItems.filter(
    (i) => i.profit_margin !== null && i.profit_margin < 60
  ).length;
  const criticalMarginCount = menuItems.filter(
    (i) => i.profit_margin !== null && i.profit_margin < 50
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading food costs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Food Cost & Margins</h1>
            <InfoTooltip contentKey="pages.foodCostMargins" kbPageId="food-cost-margins" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Track food costs and profit margins across your menu
          </p>
        </div>
        <Link
          href="/food-costs/ingredients"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Manage Ingredient Costs
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Menu Items</p>
          <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
          <p className="text-xs text-gray-400">{itemsWithCost.length} with food cost data</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-600">Average Margin</p>
          <p className="text-2xl font-bold text-blue-900">
            {itemsWithCost.length > 0 ? `${avgMargin.toFixed(1)}%` : '-'}
          </p>
          <p className="text-xs text-blue-500">Across {itemsWithCost.length} items</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-600">Low Margin (&lt;60%)</p>
          <p className="text-2xl font-bold text-amber-700">{lowMarginCount}</p>
          <p className="text-xs text-amber-500">Need attention</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">Critical (&lt;50%)</p>
          <p className="text-2xl font-bold text-red-700">{criticalMarginCount}</p>
          <p className="text-xs text-red-500">Review immediately</p>
        </div>
      </div>

      {/* Low Margin Alert */}
      {criticalMarginCount > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-800">Critical Margin Alert</h3>
              <p className="mt-1 text-sm text-red-700">
                You have {criticalMarginCount} item{criticalMarginCount > 1 ? 's' : ''} with profit
                margin below 50%. Consider raising prices or reviewing ingredient costs.
              </p>
              <button
                onClick={() => {
                  setSortBy('margin_asc');
                  setShowNeedsRecipe(false);
                }}
                className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800"
              >
                Show critical items
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/food-costs/ingredients"
          className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-medium text-gray-900">Ingredient Costs</p>
              <p className="text-sm text-gray-500">Set purchase prices</p>
            </div>
          </div>
        </Link>
        <Link
          href="/content/recipes"
          className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-green-300 hover:bg-green-50"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-medium text-gray-900">Recipes</p>
              <p className="text-sm text-gray-500">View recipe details</p>
            </div>
          </div>
        </Link>
        <Link
          href="/content/menu"
          className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-purple-300 hover:bg-purple-50"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍽️</span>
            <div>
              <p className="font-medium text-gray-900">Menu Items</p>
              <p className="text-sm text-gray-500">Edit prices</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {getName(cat.name_multilang)}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="margin_asc">Margin: Low to High</option>
          <option value="margin_desc">Margin: High to Low</option>
          <option value="cost_asc">Cost: Low to High</option>
          <option value="cost_desc">Cost: High to Low</option>
        </select>
        <button
          onClick={() => setShowNeedsRecipe(!showNeedsRecipe)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            showNeedsRecipe
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Missing Recipe
        </button>
      </div>

      {/* Menu Items Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Item
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Category
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Price
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Food Cost
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Profit
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">
                Margin
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => {
              const category = categories.find((c) => c.id === item.category_id);
              const profit =
                item.price && item.food_cost !== null ? item.price - item.food_cost : null;

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{getName(item.name_multilang)}</div>
                    <div className="text-xs text-gray-500">{item.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">
                      {category ? getName(category.name_multilang) : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-medium text-gray-900">{formatCurrency(item.price)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-gray-600">{formatCurrency(item.food_cost)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={
                        profit !== null && profit > 0
                          ? 'font-medium text-green-600'
                          : 'text-gray-500'
                      }
                    >
                      {formatCurrency(profit)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded px-2 py-1 text-sm font-medium ${getMarginClass(item.profit_margin)}`}
                    >
                      {item.profit_margin !== null ? `${item.profit_margin.toFixed(1)}%` : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${getMarginClass(item.profit_margin)}`}
                    >
                      {getMarginLabel(item.profit_margin)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">📊</div>
            <p className="text-gray-500">No menu items found</p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredItems.length} of {menuItems.length} items
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-green-100"></span> Excellent (&gt;70%)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-emerald-100"></span> Good (60-70%)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-amber-100"></span> Warning (50-60%)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-red-100"></span> Critical (&lt;50%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
