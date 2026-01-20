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

const EMOJI_PICKER = [
  '☕',
  '🍵',
  '🧊',
  '🥤',
  '🍽️',
  '🍰',
  '🥗',
  '🍕',
  '🍔',
  '🌮',
  '🍜',
  '🍣',
  '🥐',
  '🍩',
  '🍪',
];

export default function CategoriesPage() {
  const t = useTranslations('categoriesPage');
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
      const { data: items } = await supabase.from('menu_items').select('category_id');

      const itemCounts: Record<string, number> = {};
      (items || []).forEach((item) => {
        if (item.category_id) {
          itemCounts[item.category_id] = (itemCounts[item.category_id] || 0) + 1;
        }
      });

      // Fetch category-modifier relationships
      const { data: categoryModifiers } = await supabase
        .from('category_modifier_groups')
        .select(
          `
          *,
          modifier_group:modifier_groups(id, slug, name_multilang, selection_type, is_required, is_active)
        `
        )
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
    if (!multilang) return t('unnamed');
    return multilang.en || multilang.vi || t('unnamed');
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
          ? (await supabase.from('menu_categories').select('merchant_id').limit(1).single()).data
              ?.merchant_id
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
      alert(t('saveFailed'));
    }
  };

  const handleDelete = async (id: string, itemCount: number) => {
    if (itemCount > 0) {
      alert(t('cannotDeleteWithItems', { count: itemCount }));
      return;
    }
    if (!confirm(t('confirmDelete'))) return;

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
    const currentModifierIds = (category.modifier_groups || []).map((cm) => cm.modifier_group_id);
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
      alert(t('modifiersModal.saveFailed'));
    } finally {
      setSavingModifiers(false);
    }
  };

  const toggleModifierGroup = (groupId: string) => {
    setSelectedModifierGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
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

    // N+1 fix: Use Promise.all for parallel updates instead of sequential loop
    await Promise.all(
      updates.map((update) =>
        supabase
          .from('menu_categories')
          .update({ display_order: update.display_order })
          .eq('id', update.id)
      )
    );

    setDraggedId(null);
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
            <span className="text-gray-900">{t('title')}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('itemsCount', { count: categories.length })} • {t('dragToReorder')}
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {t('addCategory')}
        </button>
      </div>

      {/* Categories List */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <div
              key={category.id}
              draggable
              onDragStart={() => handleDragStart(category.id)}
              onDragOver={(e) => handleDragOver(e, category.id)}
              onDragEnd={handleDragEnd}
              className={`flex cursor-move items-center gap-4 p-4 hover:bg-gray-50 ${
                draggedId === category.id ? 'bg-blue-50 opacity-50' : ''
              } ${!category.is_active ? 'opacity-60' : ''}`}
            >
              {/* Drag Handle */}
              <div className="cursor-grab text-gray-400 active:cursor-grabbing">⠿</div>

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                {category.icon || '📦'}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{getName(category.name_multilang)}</h3>
                  {!category.is_active && (
                    <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                      {t('hidden')}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                  <span>{t('itemCount', { count: category.item_count })}</span>
                  <span>•</span>
                  <span className="font-mono text-xs">{category.slug}</span>
                </div>
                {/* Linked Modifiers */}
                {category.modifier_groups && category.modifier_groups.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {category.modifier_groups.map((cmg) => (
                      <span
                        key={cmg.id}
                        className="rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700"
                      >
                        {cmg.modifier_group?.name_multilang?.en ||
                          cmg.modifier_group?.slug ||
                          'Unknown'}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modifiers Button */}
              <button
                onClick={() => openModifiersModal(category)}
                className="flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-sm text-purple-700 transition-colors hover:bg-purple-100"
                title={t('modifiersModal.title')}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                <span>{category.modifier_groups?.length || 0}</span>
              </button>

              {/* Translations */}
              <div className="flex gap-1">
                {category.name_multilang?.en && (
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                    EN
                  </span>
                )}
                {category.name_multilang?.vi && (
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                    VI
                  </span>
                )}
                {category.name_multilang?.ko && (
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                    KO
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="rounded p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => toggleActive(category.id, category.is_active)}
                  className={`rounded p-2 ${
                    category.is_active
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title={category.is_active ? t('hide') : t('show')}
                >
                  {category.is_active ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={() => handleDelete(category.id, category.item_count || 0)}
                  className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">📂</div>
            <p className="text-gray-500">{t('noCategories')}</p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
            >
              {t('createFirst')}
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              {editingCategory ? t('modal.editTitle') : t('modal.addTitle')}
            </h2>

            <div className="space-y-4">
              {/* Icon Picker */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('modal.icon')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_PICKER.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: emoji })}
                      className={`h-10 w-10 rounded-lg border-2 text-xl transition-colors ${
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
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('modal.nameEn')}
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder={t('modal.nameEnPlaceholder')}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('modal.nameVi')}
                </label>
                <input
                  type="text"
                  value={formData.name_vi}
                  onChange={(e) => setFormData({ ...formData, name_vi: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder={t('modal.nameViPlaceholder')}
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('modal.slug')}
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
                  placeholder={t('modal.slugPlaceholder')}
                />
                <p className="mt-1 text-xs text-gray-500">{t('modal.slugHint')}</p>
              </div>

              {/* Active Toggle */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{t('modal.visibleOnMenu')}</span>
              </label>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                {t('modal.cancel')}
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name_en}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {editingCategory ? t('modal.saveChanges') : t('modal.addCategory')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifiers Modal */}
      {showModifiersModal && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white">
            {/* Header */}
            <div className="border-b p-6">
              <h2 className="text-xl font-bold text-gray-900">{t('modifiersModal.title')}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {t('modifiersModal.selectFor')}{' '}
                <span className="font-medium">{getName(editingCategory.name_multilang)}</span>
              </p>
            </div>

            {/* Modifier Groups List */}
            <div className="flex-1 overflow-y-auto p-6">
              {modifierGroups.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-4xl">🎛️</div>
                  <p className="text-gray-500">{t('modifiersModal.noGroups')}</p>
                  <p className="mt-1 text-sm text-gray-400">{t('modifiersModal.createHint')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {modifierGroups.map((group) => {
                    const isSelected = selectedModifierGroups.includes(group.id);
                    return (
                      <label
                        key={group.id}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all ${
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
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                            isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {group.name_multilang?.en || group.slug}
                            </span>
                            <span
                              className={`rounded px-2 py-0.5 text-xs ${
                                group.selection_type === 'single'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {group.selection_type === 'single'
                                ? t('modifiersModal.single')
                                : t('modifiersModal.multiple')}
                            </span>
                            {group.is_required && (
                              <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                                {t('modifiersModal.required')}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">{group.slug}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {t('modifiersModal.selectedCount', {
                    selected: selectedModifierGroups.length,
                    total: modifierGroups.length,
                  })}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowModifiersModal(false);
                      setEditingCategory(null);
                      setSelectedModifierGroups([]);
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {t('modifiersModal.cancel')}
                  </button>
                  <button
                    onClick={handleSaveModifiers}
                    disabled={savingModifiers}
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                  >
                    {savingModifiers ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t('modifiersModal.saving')}
                      </>
                    ) : (
                      t('modifiersModal.saveChanges')
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
