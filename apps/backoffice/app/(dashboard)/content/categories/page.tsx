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
  it?: string;
}

interface Category {
  id: string;
  slug: string;
  name_multilang: MultiLangText;
  description_multilang: MultiLangText | null;
  icon: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  item_count?: number;
  modifier_groups?: CategoryModifierGroup[];
}

interface ModifierGroup {
  id: string;
  slug: string;
  name_multilang: MultiLangText;
  selection_type: 'single' | 'multiple';
  is_required: boolean;
  is_active: boolean;
}

interface CategoryModifierGroup {
  id: string;
  category_id: string;
  modifier_group_id: string;
  display_order: number;
  is_visible: boolean;
  modifier_group?: ModifierGroup;
}

const EMOJI_PICKER = ['☕', '🍵', '🧊', '🥤', '🍽️', '🍰', '🥗', '🍕', '🍔', '🌮', '🍜', '🍣', '🥐', '🍩', '🍪'];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModifiersModal, setShowModifiersModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [savingModifiers, setSavingModifiers] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name_en: '',
    name_vi: '',
    slug: '',
    icon: '📦',
    is_active: true,
  });

  // Modifier linking state
  const [selectedModifierGroups, setSelectedModifierGroups] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchModifierGroups();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);

      // Fetch categories
      const { data: cats, error: catError } = await supabase
        .from('menu_categories')
        .select('*')
        .order('display_order');

      if (catError) throw catError;

      // Fetch item counts
      const { data: items } = await supabase
        .from('menu_items')
        .select('category_id');

      const itemCounts: Record<string, number> = {};
      (items || []).forEach((item) => {
        if (item.category_id) {
          itemCounts[item.category_id] = (itemCounts[item.category_id] || 0) + 1;
        }
      });

      // Fetch category-modifier relationships
      const { data: categoryModifiers } = await supabase
        .from('category_modifier_groups')
        .select(`
          *,
          modifier_group:modifier_groups(id, slug, name_multilang, selection_type, is_required, is_active)
        `)
        .order('display_order');

      const categoryModifiersMap: Record<string, CategoryModifierGroup[]> = {};
      (categoryModifiers || []).forEach((cm: CategoryModifierGroup) => {
        if (!categoryModifiersMap[cm.category_id]) {
          categoryModifiersMap[cm.category_id] = [];
        }
        categoryModifiersMap[cm.category_id].push(cm);
      });

      const catsWithCount = (cats || []).map((cat) => ({
        ...cat,
        item_count: itemCounts[cat.id] || 0,
        modifier_groups: categoryModifiersMap[cat.id] || [],
      }));

      setCategories(catsWithCount);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchModifierGroups() {
    try {
      const { data, error } = await supabase
        .from('modifier_groups')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setModifierGroups(data || []);
    } catch (err) {
      console.error('Error fetching modifier groups:', err);
    }
  }

  const getName = (multilang: MultiLangText | null): string => {
    if (!multilang) return 'Unnamed';
    return multilang.en || multilang.vi || 'Unnamed';
  };

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_vi: '',
      slug: '',
      icon: '📦',
      is_active: true,
    });
    setEditingCategory(null);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name_en: category.name_multilang?.en || '',
      name_vi: category.name_multilang?.vi || '',
      slug: category.slug,
      icon: category.icon || '📦',
      is_active: category.is_active,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const categoryData = {
        slug: formData.slug || formData.name_en.toLowerCase().replace(/\s+/g, '-'),
        name_multilang: {
          en: formData.name_en,
          vi: formData.name_vi || undefined,
        },
        icon: formData.icon,
        is_active: formData.is_active,
        display_order: editingCategory?.display_order ?? categories.length,
      };

      if (editingCategory) {
        const { error } = await supabase
          .from('menu_categories')
          .update(categoryData)
          .eq('id', editingCategory.id);
        if (error) throw error;
      } else {
        // Get merchant_id from first category or use demo
        const merchantId = categories[0]?.id
          ? (await supabase.from('menu_categories').select('merchant_id').limit(1).single()).data?.merchant_id
          : null;

        if (!merchantId) {
          // Get demo merchant
          const { data: merchant } = await supabase
            .from('merchants')
            .select('id')
            .eq('slug', 'demo-cafe')
            .single();

          if (merchant) {
            const { error } = await supabase
              .from('menu_categories')
              .insert({ ...categoryData, merchant_id: merchant.id });
            if (error) throw error;
          }
        } else {
          const { error } = await supabase
            .from('menu_categories')
            .insert({ ...categoryData, merchant_id: merchantId });
          if (error) throw error;
        }
      }

      await fetchCategories();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error('Error saving category:', err);
      alert('Failed to save category');
    }
  };

  const handleDelete = async (id: string, itemCount: number) => {
    if (itemCount > 0) {
      alert(`Cannot delete category with ${itemCount} items. Move or delete the items first.`);
      return;
    }
    if (!confirm('Delete this category?')) return;

    try {
      const { error } = await supabase.from('menu_categories').delete().eq('id', id);
      if (error) throw error;
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_categories')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      if (error) throw error;
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_active: !currentStatus } : c))
      );
    } catch (err) {
      console.error('Error toggling:', err);
    }
  };

  const openModifiersModal = (category: Category) => {
    setEditingCategory(category);
    const currentModifierIds = (category.modifier_groups || [])
      .map((cm) => cm.modifier_group_id);
    setSelectedModifierGroups(currentModifierIds);
    setShowModifiersModal(true);
  };

  const handleSaveModifiers = async () => {
    if (!editingCategory) return;

    try {
      setSavingModifiers(true);

      // Delete existing relationships for this category
      const { error: deleteError } = await supabase
        .from('category_modifier_groups')
        .delete()
        .eq('category_id', editingCategory.id);

      if (deleteError) throw deleteError;

      // Insert new relationships
      if (selectedModifierGroups.length > 0) {
        const insertData = selectedModifierGroups.map((groupId, index) => ({
          category_id: editingCategory.id,
          modifier_group_id: groupId,
          display_order: index,
          is_visible: true,
        }));

        const { error: insertError } = await supabase
          .from('category_modifier_groups')
          .insert(insertData);

        if (insertError) throw insertError;
      }

      await fetchCategories();
      setShowModifiersModal(false);
      setEditingCategory(null);
      setSelectedModifierGroups([]);
    } catch (err) {
      console.error('Error saving modifier relationships:', err);
      alert('Failed to save modifier relationships');
    } finally {
      setSavingModifiers(false);
    }
  };

  const toggleModifierGroup = (groupId: string) => {
    setSelectedModifierGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = categories.findIndex((c) => c.id === draggedId);
    const targetIndex = categories.findIndex((c) => c.id === targetId);

    const newCategories = [...categories];
    const [removed] = newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, removed);

    setCategories(newCategories);
  };

  const handleDragEnd = async () => {
    if (!draggedId) return;

    // Update display_order in database
    const updates = categories.map((cat, index) => ({
      id: cat.id,
      display_order: index,
    }));

    for (const update of updates) {
      await supabase
        .from('menu_categories')
        .update({ display_order: update.display_order })
        .eq('id', update.id);
    }

    setDraggedId(null);
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
            <span className="text-gray-900">Categories</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Menu Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            {categories.length} categories • Drag to reorder
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <div
              key={category.id}
              draggable
              onDragStart={() => handleDragStart(category.id)}
              onDragOver={(e) => handleDragOver(e, category.id)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-4 p-4 hover:bg-gray-50 cursor-move ${
                draggedId === category.id ? 'opacity-50 bg-blue-50' : ''
              } ${!category.is_active ? 'opacity-60' : ''}`}
            >
              {/* Drag Handle */}
              <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                ⠿
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                {category.icon || '📦'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">
                    {getName(category.name_multilang)}
                  </h3>
                  {!category.is_active && (
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span>{category.item_count} items</span>
                  <span>•</span>
                  <span className="font-mono text-xs">{category.slug}</span>
                </div>
                {/* Linked Modifiers */}
                {category.modifier_groups && category.modifier_groups.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {category.modifier_groups.map((cmg) => (
                      <span
                        key={cmg.id}
                        className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs"
                      >
                        {cmg.modifier_group?.name_multilang?.en || cmg.modifier_group?.slug || 'Unknown'}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modifiers Button */}
              <button
                onClick={() => openModifiersModal(category)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                title="Manage Modifiers"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span>{category.modifier_groups?.length || 0}</span>
              </button>

              {/* Translations */}
              <div className="flex gap-1">
                {category.name_multilang?.en && (
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">EN</span>
                )}
                {category.name_multilang?.vi && (
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">VI</span>
                )}
                {category.name_multilang?.ko && (
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">KO</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                >
                  ✏️
                </button>
                <button
                  onClick={() => toggleActive(category.id, category.is_active)}
                  className={`p-2 rounded ${
                    category.is_active
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title={category.is_active ? 'Hide' : 'Show'}
                >
                  {category.is_active ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={() => handleDelete(category.id, category.item_count || 0)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📂</div>
            <p className="text-gray-500">No categories yet</p>
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h2>

            <div className="space-y-4">
              {/* Icon Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_PICKER.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: emoji })}
                      className={`w-10 h-10 text-xl rounded-lg border-2 transition-colors ${
                        formData.icon === emoji
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Names */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name (English) *
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Hot Coffee"
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
                  placeholder="e.g., Cà phê nóng"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="hot-coffee"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from name if empty</p>
              </div>

              {/* Active Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Visible on menu</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name_en}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {editingCategory ? 'Save Changes' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifiers Modal */}
      {showModifiersModal && editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Manage Modifiers
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Select modifier groups for{' '}
                <span className="font-medium">
                  {getName(editingCategory.name_multilang)}
                </span>
              </p>
            </div>

            {/* Modifier Groups List */}
            <div className="flex-1 overflow-y-auto p-6">
              {modifierGroups.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎛️</div>
                  <p className="text-gray-500">No modifier groups available</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Create modifier groups in Content &gt; Modifiers
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {modifierGroups.map((group) => {
                    const isSelected = selectedModifierGroups.includes(group.id);
                    return (
                      <label
                        key={group.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleModifierGroup(group.id)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {group.name_multilang?.en || group.slug}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              group.selection_type === 'single'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {group.selection_type === 'single' ? 'Single' : 'Multiple'}
                            </span>
                            {group.is_required && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {group.slug}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {selectedModifierGroups.length} of {modifierGroups.length} selected
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowModifiersModal(false);
                      setEditingCategory(null);
                      setSelectedModifierGroups([]);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveModifiers}
                    disabled={savingModifiers}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {savingModifiers ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
