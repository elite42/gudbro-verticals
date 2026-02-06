'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/lib/contexts/ToastContext';
import { formatPrice as _fp } from '@gudbro/utils';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

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
  const t = useTranslations('menuPage');
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

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
        prev.map((item) => (item.id === itemId ? { ...item, is_available: !currentStatus } : item))
      );

      toast.success(!currentStatus ? t('markedAvailable') : t('markedUnavailable'));
    } catch (err) {
      toast.error(t('failedUpdate'));
      console.error('Error toggling availability:', err);
    }
  };

  // Parse CSV file
  const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/"/g, ''));
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;

      for (const char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }

    return rows;
  };

  // Handle CSV import
  const handleCSVImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const errors: string[] = [];
    let successCount = 0;

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        toast.error(t('csvEmpty'));
        return;
      }

      // Expected columns: name_en, name_vi, description_en, description_vi, price, currency, category_slug, is_available, is_featured, is_new
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2; // +2 because line 1 is headers, and we're 0-indexed

        // Validate required fields
        if (!row.name_en && !row.name_vi) {
          errors.push(`Row ${rowNum}: Missing name`);
          continue;
        }

        // Find category by slug
        let categoryId = row.category_id;
        if (!categoryId && row.category_slug) {
          const category = categories.find((c) => c.slug === row.category_slug);
          if (category) {
            categoryId = category.id;
          } else {
            errors.push(`Row ${rowNum}: Category "${row.category_slug}" not found`);
            continue;
          }
        }

        if (!categoryId) {
          errors.push(`Row ${rowNum}: No category`);
          continue;
        }

        // Generate slug from name
        const nameForSlug = row.name_en || row.name_vi || '';
        const slug =
          nameForSlug
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') +
          '-' +
          Date.now();

        // Parse price
        const price = parseFloat(row.price) || 0;

        // Build menu item
        const menuItem = {
          slug,
          name_multilang: {
            en: row.name_en || null,
            vi: row.name_vi || null,
            ko: row.name_ko || null,
            ja: row.name_ja || null,
          },
          description_multilang: {
            en: row.description_en || null,
            vi: row.description_vi || null,
            ko: row.description_ko || null,
            ja: row.description_ja || null,
          },
          price,
          currency: row.currency || 'VND',
          category_id: categoryId,
          image_url: row.image_url || null,
          is_available: row.is_available !== 'false' && row.is_available !== '0',
          is_active: true,
          is_featured: row.is_featured === 'true' || row.is_featured === '1',
          is_new: row.is_new === 'true' || row.is_new === '1',
          allergens: {},
          intolerances: {},
          dietary_flags: {
            vegan: row.vegan === 'true' || row.vegan === '1',
            vegetarian: row.vegetarian === 'true' || row.vegetarian === '1',
            halal: row.halal === 'true' || row.halal === '1',
            kosher: row.kosher === 'true' || row.kosher === '1',
          },
          spice_level: parseInt(row.spice_level) || 0,
          display_order: parseInt(row.display_order) || 0,
        };

        // Insert into Supabase
        const { error: insertError } = await supabase.from('menu_items').insert(menuItem);

        if (insertError) {
          errors.push(`Row ${rowNum}: ${insertError.message}`);
        } else {
          successCount++;
        }
      }

      // Show toast based on results
      if (successCount > 0 && errors.length === 0) {
        toast.success(t('importSuccess', { count: successCount }));
      } else if (successCount > 0 && errors.length > 0) {
        toast.warning(t('importPartial', { success: successCount, errors: errors.length }));
      } else if (errors.length > 0) {
        toast.error(
          `${t('importFailed')}: ${errors.slice(0, 3).join(', ')}${errors.length > 3 ? '...' : ''}`
        );
      }

      // Refresh data if any items were imported
      if (successCount > 0) {
        const { data: itemsData } = await supabase
          .from('menu_items')
          .select('*')
          .order('display_order');

        if (itemsData) {
          setMenuItems(itemsData);
          // Update category counts
          setCategories((prev) =>
            prev.map((cat) => ({
              ...cat,
              item_count: itemsData.filter((item) => item.category_id === cat.id).length,
            }))
          );
        }
      }
    } catch (err) {
      toast.error(`Failed to parse CSV: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Download CSV template
  const downloadCSVTemplate = () => {
    const headers = [
      'name_en',
      'name_vi',
      'description_en',
      'description_vi',
      'price',
      'currency',
      'category_slug',
      'is_available',
      'is_featured',
      'is_new',
      'vegan',
      'vegetarian',
      'halal',
      'spice_level',
      'display_order',
      'image_url',
    ];
    const exampleRow = [
      'Espresso',
      'Ca phe Espresso',
      'Rich and bold espresso shot',
      'Ca phe espresso dam da',
      '35000',
      'VND',
      'coffee',
      'true',
      'false',
      'true',
      'true',
      'true',
      'false',
      '0',
      '1',
      '',
    ];

    const csv = [headers.join(','), exampleRow.join(',')].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'menu-items-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Delete item
  const deleteItem = async (itemId: string) => {
    if (!confirm(t('confirmDelete'))) return;

    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', itemId);

      if (error) throw error;

      // Update local state
      setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success(t('deleteSuccess'));
    } catch (err) {
      toast.error(t('deleteFailed'));
      console.error('Error deleting item:', err);
    }
  };

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
    const name = item.name_multilang?.en || '';
    const description = item.description_multilang?.en || '';
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number, currency: string = 'VND') => _fp(price, currency);

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
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl text-red-500">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900">{t('errorTitle')}</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
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
            <span className="text-gray-900">Menu</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.menu" kbPageId="content-menu" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {t('itemsCount', { count: totalItems })} • {t('dataSource')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleCSVImport}
            className="hidden"
          />
          <button
            onClick={downloadCSVTemplate}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            title={t('template')}
          >
            {t('template')}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {importing ? t('importing') : t('importCsv')}
          </button>
          <Link
            href="/content/menu/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + {t('addItem')}
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>📋</span>
          <span>{t('allItems')}</span>
          <span
            className={`rounded px-1.5 py-0.5 text-xs ${
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
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{category.icon || '📦'}</span>
            <span>{getName(category.name_multilang)}</span>
            <span
              className={`rounded px-1.5 py-0.5 text-xs ${
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
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
          <option>{t('allStatus')}</option>
          <option>{t('available')}</option>
          <option>{t('unavailable')}</option>
        </select>
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
          <option>{t('sortByOrder')}</option>
          <option>{t('sortByName')}</option>
          <option>{t('sortByPrice')}</option>
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
              className={`rounded-xl border bg-white p-4 ${
                item.is_available ? 'border-gray-200' : 'border-red-200 bg-red-50'
              }`}
            >
              {/* Image placeholder */}
              <div className="relative flex h-32 items-center justify-center rounded-lg bg-gray-100 text-4xl">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={getName(item.name_multilang)}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  getCategoryIcon(item.category_id)
                )}
                {item.is_featured && (
                  <span className="absolute left-2 top-2 rounded bg-yellow-400 px-2 py-0.5 text-xs font-medium text-yellow-900">
                    ⭐ {t('featured')}
                  </span>
                )}
                {item.is_new && (
                  <span className="absolute right-2 top-2 rounded bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                    {t('new')}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900">{getName(item.name_multilang)}</h3>
                  <span className="font-bold text-blue-600">{formatPrice(item.price)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {item.description_multilang?.en || t('noDescription')}
                </p>

                {/* Safety badges */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {allergenCount > 0 && (
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700">
                      ⚠️ {allergenCount} {allergenCount > 1 ? t('allergens') : t('allergen')}
                    </span>
                  )}
                  {item.dietary_flags?.vegan && (
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                      🌱 {t('vegan')}
                    </span>
                  )}
                  {item.dietary_flags?.halal && (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700">
                      ☪️ {t('halal')}
                    </span>
                  )}
                  {item.spice_level > 0 && (
                    <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-700">
                      🌶️ {'🔥'.repeat(item.spice_level)}
                    </span>
                  )}
                </div>

                {/* Translation Status */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">{t('translations')}:</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs ${
                      translations.hasEn
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    EN {translations.hasEn ? '✓' : '⚠️'}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs ${
                      translations.hasVi
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    VI {translations.hasVi ? '✓' : '⚠️'}
                  </span>
                  {translations.hasKo && (
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                      KO ✓
                    </span>
                  )}
                  {translations.hasJa && (
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                      JA ✓
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/content/menu/${item.slug}`}
                      className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      title={t('edit')}
                    >
                      ✏️
                    </Link>
                    <button
                      className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      title={t('duplicate')}
                    >
                      📋
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      title={t('delete')}
                    >
                      🗑️
                    </button>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={item.is_available}
                      onChange={() => toggleAvailability(item.id, item.is_available)}
                      className="peer sr-only"
                    />
                    <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Item Card */}
        <Link
          href="/content/menu/new"
          className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50"
        >
          <span className="text-4xl text-gray-400">+</span>
          <span className="mt-2 text-sm font-medium text-gray-600">{t('addNewItem')}</span>
        </Link>
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && !loading && (
        <div className="py-12 text-center">
          <div className="mb-4 text-4xl">🍽️</div>
          <h3 className="text-lg font-medium text-gray-900">{t('noItems')}</h3>
          <p className="mt-1 text-gray-500">
            {searchQuery ? t('tryDifferentSearch') : t('addFirstItem')}
          </p>
        </div>
      )}
    </div>
  );
}
