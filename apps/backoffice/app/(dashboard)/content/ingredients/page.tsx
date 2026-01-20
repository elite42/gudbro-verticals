'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';

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

interface Ingredient {
  id: string;
  slug: string;
  name_multilang: MultiLangText;
  allergens: Record<string, boolean>;
  intolerances: Record<string, boolean>;
  dietary_flags: Record<string, boolean>;
  calories_per_100g: number | null;
  protein_per_100g: number | null;
  carbs_per_100g: number | null;
  fat_per_100g: number | null;
  fiber_per_100g: number | null;
  is_global: boolean;
  merchant_id: string | null;
}

// Allergen definitions for display
const ALLERGENS = {
  gluten: { label: 'Gluten', icon: '🌾' },
  crustaceans: { label: 'Crustaceans', icon: '🦐' },
  eggs: { label: 'Eggs', icon: '🥚' },
  fish: { label: 'Fish', icon: '🐟' },
  peanuts: { label: 'Peanuts', icon: '🥜' },
  soybeans: { label: 'Soybeans', icon: '🫘' },
  milk: { label: 'Milk', icon: '🥛' },
  nuts: { label: 'Tree Nuts', icon: '🌰' },
  celery: { label: 'Celery', icon: '🥬' },
  mustard: { label: 'Mustard', icon: '🟡' },
  sesame: { label: 'Sesame', icon: '⚪' },
  sulphites: { label: 'Sulphites', icon: '🧪' },
  lupin: { label: 'Lupin', icon: '🌸' },
  molluscs: { label: 'Molluscs', icon: '🦪' },
};

export default function IngredientsPage() {
  const t = useTranslations('ingredientsPage');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name_en: '',
    name_vi: '',
    slug: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    allergens: {} as Record<string, boolean>,
    intolerances: {} as Record<string, boolean>,
    dietary_flags: {} as Record<string, boolean>,
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('name_multilang->en');

      if (error) throw error;
      setIngredients(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }

  const getName = (multilang: MultiLangText | null): string => {
    if (!multilang) return 'Unnamed';
    return multilang.en || multilang.vi || 'Unnamed';
  };

  const getAllergenBadges = (allergens: Record<string, boolean>) => {
    return Object.entries(allergens)
      .filter(([, value]) => value)
      .map(([key]) => ({
        key,
        ...ALLERGENS[key as keyof typeof ALLERGENS],
      }));
  };

  const filteredIngredients = ingredients.filter((ing) => {
    const name = getName(ing.name_multilang).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_vi: '',
      slug: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      allergens: {},
      intolerances: {},
      dietary_flags: {},
    });
    setEditingIngredient(null);
  };

  const openEditModal = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setFormData({
      name_en: ingredient.name_multilang?.en || '',
      name_vi: ingredient.name_multilang?.vi || '',
      slug: ingredient.slug,
      calories: ingredient.calories_per_100g?.toString() || '',
      protein: ingredient.protein_per_100g?.toString() || '',
      carbs: ingredient.carbs_per_100g?.toString() || '',
      fat: ingredient.fat_per_100g?.toString() || '',
      fiber: ingredient.fiber_per_100g?.toString() || '',
      allergens: ingredient.allergens || {},
      intolerances: ingredient.intolerances || {},
      dietary_flags: ingredient.dietary_flags || {},
    });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    try {
      const ingredientData = {
        slug: formData.slug || formData.name_en.toLowerCase().replace(/\s+/g, '-'),
        name_multilang: {
          en: formData.name_en,
          vi: formData.name_vi || undefined,
        },
        calories_per_100g: formData.calories ? parseFloat(formData.calories) : null,
        protein_per_100g: formData.protein ? parseFloat(formData.protein) : null,
        carbs_per_100g: formData.carbs ? parseFloat(formData.carbs) : null,
        fat_per_100g: formData.fat ? parseFloat(formData.fat) : null,
        fiber_per_100g: formData.fiber ? parseFloat(formData.fiber) : null,
        allergens: formData.allergens,
        intolerances: formData.intolerances,
        dietary_flags: formData.dietary_flags,
        is_global: true,
      };

      if (editingIngredient) {
        const { error } = await supabase
          .from('ingredients')
          .update(ingredientData)
          .eq('id', editingIngredient.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('ingredients').insert(ingredientData);
        if (error) throw error;
      }

      await fetchIngredients();
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Error saving ingredient:', err);
      alert(t('saveFailed'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    try {
      const { error } = await supabase.from('ingredients').delete().eq('id', id);
      if (error) throw error;
      setIngredients((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const toggleAllergen = (allergen: string) => {
    setFormData((prev) => ({
      ...prev,
      allergens: {
        ...prev.allergens,
        [allergen]: !prev.allergens[allergen],
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
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
            <span className="text-gray-900">Ingredients</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('itemsCount', { count: ingredients.length })} • {t('system')}
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + {t('addIngredient')}
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4"
        />
      </div>

      {/* Ingredients Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                {t('tableHeaders.name')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                {t('tableHeaders.allergens')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                {t('tableHeaders.nutrition')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                {t('tableHeaders.type')}
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                {t('tableHeaders.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredIngredients.map((ingredient) => {
              const allergenBadges = getAllergenBadges(ingredient.allergens || {});
              return (
                <tr key={ingredient.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {getName(ingredient.name_multilang)}
                      </div>
                      {ingredient.name_multilang?.vi && (
                        <div className="text-sm text-gray-500">{ingredient.name_multilang.vi}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {allergenBadges.length > 0 ? (
                        allergenBadges.map((a) => (
                          <span
                            key={a.key}
                            className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700"
                            title={a.label}
                          >
                            {a.icon} {a.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">{t('none')}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      {ingredient.calories_per_100g ? (
                        <div className="flex gap-3 text-gray-600">
                          <span>{ingredient.calories_per_100g} kcal</span>
                          <span>P: {ingredient.protein_per_100g || 0}g</span>
                          <span>C: {ingredient.carbs_per_100g || 0}g</span>
                          <span>F: {ingredient.fat_per_100g || 0}g</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">{t('notSet')}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        ingredient.is_global
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {ingredient.is_global ? `🌍 ${t('global')}` : `🏪 ${t('local')}`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(ingredient)}
                        className="rounded p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(ingredient.id)}
                        className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredIngredients.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">🥕</div>
            <p className="text-gray-500">{t('noIngredients')}</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              {editingIngredient ? t('editIngredient') : t('addIngredient')}
            </h2>

            <div className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name (Vietnamese)
                  </label>
                  <input
                    type="text"
                    value={formData.name_vi}
                    onChange={(e) => setFormData({ ...formData, name_vi: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              {/* Nutrition */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nutrition (per 100g)
                </label>
                <div className="grid grid-cols-5 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Calories</label>
                    <input
                      type="number"
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                      className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                      placeholder="kcal"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Protein (g)</label>
                    <input
                      type="number"
                      value={formData.protein}
                      onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                      className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Carbs (g)</label>
                    <input
                      type="number"
                      value={formData.carbs}
                      onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                      className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Fat (g)</label>
                    <input
                      type="number"
                      value={formData.fat}
                      onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                      className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Fiber (g)</label>
                    <input
                      type="number"
                      value={formData.fiber}
                      onChange={(e) => setFormData({ ...formData, fiber: e.target.value })}
                      className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Allergens */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Allergens (EU 14)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(ALLERGENS).map(([key, { label, icon }]) => (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-center gap-2 rounded border p-2 transition-colors ${
                        formData.allergens[key]
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.allergens[key] || false}
                        onChange={() => toggleAllergen(key)}
                        className="sr-only"
                      />
                      <span>{icon}</span>
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Flags */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Dietary Properties
                </label>
                <div className="flex flex-wrap gap-2">
                  {['vegan', 'vegetarian', 'gluten_free', 'halal', 'kosher'].map((flag) => (
                    <label
                      key={flag}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 ${
                        formData.dietary_flags[flag]
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.dietary_flags[flag] || false}
                        onChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            dietary_flags: {
                              ...prev.dietary_flags,
                              [flag]: !prev.dietary_flags[flag],
                            },
                          }))
                        }
                        className="sr-only"
                      />
                      <span className="text-sm capitalize">{flag.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                {editingIngredient ? 'Save Changes' : 'Add Ingredient'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
