'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Initialize Supabase client
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
  slug: string;
  name_multilang: MultiLangText;
  description_multilang: MultiLangText | null;
  price: number;
  currency: string;
  category_id: string;
  image_url: string | null;
  is_available: boolean;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  allergens: Record<string, boolean>;
  intolerances: Record<string, boolean>;
  dietary_flags: Record<string, boolean>;
  spice_level: number;
  display_order: number;
}

interface Category {
  id: string;
  slug: string;
  name_multilang: MultiLangText;
  icon: string | null;
  display_order: number;
  item_count?: number;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const { data: categoriesData, error: catError } = await supabase
          .from('menu_categories')
          .select('*')
          .order('display_order');

        if (catError) throw catError;

        // Fetch menu items
        const { data: itemsData, error: itemsError } = await supabase
          .from('menu_items')
          .select('*')
          .order('display_order');

        if (itemsError) throw itemsError;

        // Count items per category
        const categoriesWithCount = (categoriesData || []).map((cat) => ({
          ...cat,
          item_count: (itemsData || []).filter((item) => item.category_id === cat.id).length,
        }));

        setCategories(categoriesWithCount);
        setMenuItems(itemsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching menu data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Toggle item availability
  const toggleAvailability = async (itemId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !currentStatus })
        .eq('id', itemId);

      if (error) throw error;

      // Update local state
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, is_available: !currentStatus } : item
        )
      );
    } catch (err) {
      console.error('Error toggling availability:', err);
    }
  };

  // Delete item
  const deleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      // Update local state
      setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category_id === selectedCategory;
    const name = item.name_multilang?.en || '';
    const description = item.description_multilang?.en || '';
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number, currency: string = 'VND') => {
    if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
  };

  const getName = (multilang: MultiLangText | null): string => {
    if (!multilang) return 'Unnamed';
    return multilang.en || multilang.vi || 'Unnamed';
  };

  const getTranslationStatus = (multilang: MultiLangText | null) => {
    if (!multilang) return { hasEn: false, hasVi: false, hasKo: false, hasJa: false };
    return {
      hasEn: !!multilang.en,
      hasVi: !!multilang.vi,
      hasKo: !!multilang.ko,
      hasJa: !!multilang.ja,
    };
  };

  const getCategoryIcon = (categoryId: string): string => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.icon || '📦';
  };

  const totalItems = menuItems.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900">Error loading menu</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
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
            <span className="text-gray-900">Menu</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Menu & Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalItems} items • Data from Supabase
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Import CSV
          </button>
          <Link
            href="/content/menu/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Add Item
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>📋</span>
          <span>All Items</span>
          <span
            className={`px-1.5 py-0.5 rounded text-xs ${
              selectedCategory === 'all' ? 'bg-blue-500' : 'bg-gray-100'
            }`}
          >
            {totalItems}
          </span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{category.icon || '📦'}</span>
            <span>{getName(category.name_multilang)}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-xs ${
                selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-100'
              }`}
            >
              {category.item_count || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option>All Status</option>
          <option>Available</option>
          <option>Unavailable</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Sort by Order</option>
          <option>Sort by Name</option>
          <option>Sort by Price</option>
        </select>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const translations = getTranslationStatus(item.name_multilang);
          const allergenCount = Object.values(item.allergens || {}).filter(Boolean).length;

          return (
            <div
              key={item.id}
              className={`p-4 bg-white rounded-xl border ${
                item.is_available ? 'border-gray-200' : 'border-red-200 bg-red-50'
              }`}
            >
              {/* Image placeholder */}
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-4xl relative">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={getName(item.name_multilang)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  getCategoryIcon(item.category_id)
                )}
                {item.is_featured && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-medium rounded">
                    ⭐ Featured
                  </span>
                )}
                {item.is_new && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                    NEW
                  </span>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900">{getName(item.name_multilang)}</h3>
                  <span className="font-bold text-blue-600">{formatPrice(item.price)}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {item.description_multilang?.en || 'No description'}
                </p>

                {/* Safety badges */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {allergenCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                      ⚠️ {allergenCount} allergen{allergenCount > 1 ? 's' : ''}
                    </span>
                  )}
                  {item.dietary_flags?.vegan && (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      🌱 Vegan
                    </span>
                  )}
                  {item.dietary_flags?.halal && (
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">
                      ☪️ Halal
                    </span>
                  )}
                  {item.spice_level > 0 && (
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                      🌶️ {'🔥'.repeat(item.spice_level)}
                    </span>
                  )}
                </div>

                {/* Translation Status */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Translations:</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs ${
                      translations.hasEn ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    EN {translations.hasEn ? '✓' : '⚠️'}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs ${
                      translations.hasVi ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    VI {translations.hasVi ? '✓' : '⚠️'}
                  </span>
                  {translations.hasKo && (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      KO ✓
                    </span>
                  )}
                  {translations.hasJa && (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      JA ✓
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/content/menu/${item.slug}`}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="Duplicate"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.is_available}
                      onChange={() => toggleAvailability(item.id, item.is_available)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Item Card */}
        <Link
          href="/content/menu/new"
          className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center min-h-[280px]"
        >
          <span className="text-4xl text-gray-400">+</span>
          <span className="mt-2 text-sm font-medium text-gray-600">Add New Item</span>
        </Link>
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🍽️</div>
          <h3 className="text-lg font-medium text-gray-900">No menu items found</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery
              ? 'Try a different search term'
              : 'Add your first menu item to get started'}
          </p>
        </div>
      )}
    </div>
  );
}
