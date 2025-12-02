'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

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
      alert('Failed to save ingredient');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this ingredient?')) return;
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/content" className="hover:text-gray-700">Content</Link>
            <span>/</span>
            <span className="text-gray-900">Ingredients</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Ingredient Database</h1>
          <p className="text-sm text-gray-500 mt-1">
            {ingredients.length} ingredients • Sistema 51 Filtri
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Add Ingredient
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Ingredients Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allergens</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nutrition (per 100g)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                        <div className="text-sm text-gray-500">
                          {ingredient.name_multilang.vi}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {allergenBadges.length > 0 ? (
                        allergenBadges.map((a) => (
                          <span
                            key={a.key}
                            className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs"
                            title={a.label}
                          >
                            {a.icon} {a.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">None</span>
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
                        <span className="text-gray-400">Not set</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      ingredient.is_global
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {ingredient.is_global ? '🌍 Global' : '🏪 Local'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(ingredient)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(ingredient.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
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
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🥕</div>
            <p className="text-gray-500">No ingredients found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingIngredient ? 'Edit Ingredient' : 'Add Ingredient'}
            </h2>

            <div className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Vietnamese)
                  </label>
                  <input
                    type="text"
                    value={formData.name_vi}
                    onChange={(e) => setFormData({ ...formData, name_vi: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Nutrition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nutrition (per 100g)
                </label>
                <div className="grid grid-cols-5 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Calories</label>
                    <input
                      type="number"
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                      placeholder="kcal"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Protein (g)</label>
                    <input
                      type="number"
                      value={formData.protein}
                      onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Carbs (g)</label>
                    <input
                      type="number"
                      value={formData.carbs}
                      onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Fat (g)</label>
                    <input
                      type="number"
                      value={formData.fat}
                      onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Fiber (g)</label>
                    <input
                      type="number"
                      value={formData.fiber}
                      onChange={(e) => setFormData({ ...formData, fiber: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Allergens */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergens (EU 14)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(ALLERGENS).map(([key, { label, icon }]) => (
                    <label
                      key={key}
                      className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
                        formData.allergens[key]
                          ? 'bg-red-50 border-red-300'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Properties
                </label>
                <div className="flex flex-wrap gap-2">
                  {['vegan', 'vegetarian', 'gluten_free', 'halal', 'kosher'].map((flag) => (
                    <label
                      key={flag}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer ${
                        formData.dietary_flags[flag]
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-gray-200'
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
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
