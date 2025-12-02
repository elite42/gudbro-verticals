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
}

const EMOJI_PICKER = ['☕', '🍵', '🧊', '🥤', '🍽️', '🍰', '🥗', '🍕', '🍔', '🌮', '🍜', '🍣', '🥐', '🍩', '🍪'];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name_en: '',
    name_vi: '',
    slug: '',
    icon: '📦',
    is_active: true,
  });

  useEffect(() => {
    fetchCategories();
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

      const catsWithCount = (cats || []).map((cat) => ({
        ...cat,
        item_count: itemCounts[cat.id] || 0,
      }));

      setCategories(catsWithCount);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
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
              <div className="flex-1">
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
              </div>

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
    </div>
  );
}
