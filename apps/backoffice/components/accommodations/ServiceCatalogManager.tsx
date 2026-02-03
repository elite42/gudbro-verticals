'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Trash,
  Pencil,
  Check,
  X,
  Info,
  Package,
  Clock,
  SpinnerGap,
} from '@phosphor-icons/react';
import { formatPriceFromMinor as formatPrice } from '@gudbro/utils';

// ============================================================================
// Types
// ============================================================================

interface ServiceItem {
  id: string;
  categoryId: string;
  propertyId: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  isAlwaysAvailable: boolean;
  availableFrom: string | null;
  availableUntil: string | null;
  inStock: boolean;
  sortOrder: number;
  imageUrl: string | null;
}

interface ServiceCategory {
  id: string;
  propertyId: string;
  name: string;
  slug: string;
  icon: string | null;
  displayOrder: number;
  isActive: boolean;
  automationLevel: string;
  items: ServiceItem[];
}

interface ServiceCatalogManagerProps {
  propertyId: string;
}

type AutomationLevel = 'auto_confirm' | 'manual' | 'whatsapp_notify';

interface CategoryFormData {
  name: string;
  icon: string;
  automationLevel: AutomationLevel;
  isActive: boolean;
}

interface ItemFormData {
  name: string;
  description: string;
  priceMajor: string; // user types major units
  isAlwaysAvailable: boolean;
  availableFrom: string;
  availableUntil: string;
  inStock: boolean;
  imageUrl: string;
}

// ============================================================================
// Constants
// ============================================================================

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const AUTH_HEADERS = { Authorization: `Bearer ${ADMIN_API_KEY}` };

const ZERO_DECIMAL_CURRENCIES = new Set([
  'VND',
  'JPY',
  'KRW',
  'BIF',
  'CLP',
  'DJF',
  'GNF',
  'ISK',
  'KMF',
  'MGA',
  'PYG',
  'RWF',
  'UGX',
  'VUV',
  'XAF',
  'XOF',
  'XPF',
]);

const AUTOMATION_OPTIONS: { value: AutomationLevel; label: string; description: string }[] = [
  { value: 'auto_confirm', label: 'Auto-confirm', description: 'Order confirmed automatically' },
  { value: 'manual', label: 'Manual', description: 'Owner must confirm each order' },
  {
    value: 'whatsapp_notify',
    label: 'WhatsApp + Auto',
    description: 'Auto-confirm and notify via WhatsApp',
  },
];

const DEFAULT_CATEGORY: CategoryFormData = {
  name: '',
  icon: '',
  automationLevel: 'manual',
  isActive: true,
};

const DEFAULT_ITEM: ItemFormData = {
  name: '',
  description: '',
  priceMajor: '0',
  isAlwaysAvailable: true,
  availableFrom: '08:00',
  availableUntil: '22:00',
  inStock: true,
  imageUrl: '',
};

// ============================================================================
// Price helpers
// ============================================================================

function isZeroDecimal(currency: string): boolean {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase());
}

function minorToMajor(minor: number, currency: string): number {
  return isZeroDecimal(currency) ? minor : minor / 100;
}

function majorToMinor(major: number, currency: string): number {
  return isZeroDecimal(currency) ? Math.round(major) : Math.round(major * 100);
}

// formatPrice imported from @gudbro/utils (formatPriceFromMinor)

// ============================================================================
// Component
// ============================================================================

export function ServiceCatalogManager({ propertyId }: ServiceCatalogManagerProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Category editing
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryForm, setEditCategoryForm] = useState<CategoryFormData>(DEFAULT_CATEGORY);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryForm, setNewCategoryForm] = useState<CategoryFormData>(DEFAULT_CATEGORY);

  // Item editing
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemForm, setEditItemForm] = useState<ItemFormData>(DEFAULT_ITEM);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemForm, setNewItemForm] = useState<ItemFormData>(DEFAULT_ITEM);

  // Derive currency from first category's first item, default EUR
  const defaultCurrency =
    categories.flatMap((c) => c.items).find((i) => i.currency)?.currency || 'EUR';

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || null;

  // ------------------------------------------------------------------
  // Load categories
  // ------------------------------------------------------------------

  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch(`/api/accommodations/services?propertyId=${propertyId}`, {
        headers: AUTH_HEADERS,
      });
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
        // auto-select first if nothing selected
        if (!selectedCategoryId && data.categories.length > 0) {
          setSelectedCategoryId(data.categories[0].id);
        }
      }
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load service categories');
    } finally {
      setIsLoading(false);
    }
  }, [propertyId, selectedCategoryId]);

  useEffect(() => {
    if (propertyId) loadCategories();
  }, [propertyId, loadCategories]);

  // ------------------------------------------------------------------
  // Show success flash
  // ------------------------------------------------------------------

  function flashSuccess() {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  }

  // ------------------------------------------------------------------
  // Category CRUD
  // ------------------------------------------------------------------

  async function createCategory() {
    if (!newCategoryForm.name.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/accommodations/services', {
        method: 'POST',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'category',
          propertyId,
          name: newCategoryForm.name.trim(),
          icon: newCategoryForm.icon.trim() || null,
          automationLevel: newCategoryForm.automationLevel,
          isActive: newCategoryForm.isActive,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to create category');
      }
      await loadCategories();
      setIsAddingCategory(false);
      setNewCategoryForm(DEFAULT_CATEGORY);
      flashSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setIsSaving(false);
    }
  }

  async function updateCategory(id: string) {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/accommodations/services', {
        method: 'PUT',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'category',
          id,
          propertyId,
          name: editCategoryForm.name.trim(),
          icon: editCategoryForm.icon.trim() || null,
          automationLevel: editCategoryForm.automationLevel,
          isActive: editCategoryForm.isActive,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to update category');
      }
      await loadCategories();
      setEditingCategoryId(null);
      flashSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm('Delete this category and all its items?')) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/accommodations/services', {
        method: 'DELETE',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'category', id, propertyId }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to delete category');
      }
      if (selectedCategoryId === id) setSelectedCategoryId(null);
      await loadCategories();
      flashSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setIsSaving(false);
    }
  }

  // ------------------------------------------------------------------
  // Item CRUD
  // ------------------------------------------------------------------

  async function createItem() {
    if (!newItemForm.name.trim() || !selectedCategoryId) return;
    setIsSaving(true);
    setError(null);
    try {
      const priceMajor = parseFloat(newItemForm.priceMajor) || 0;
      const res = await fetch('/api/accommodations/services', {
        method: 'POST',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'item',
          propertyId,
          categoryId: selectedCategoryId,
          name: newItemForm.name.trim(),
          description: newItemForm.description.trim() || null,
          price: majorToMinor(priceMajor, defaultCurrency),
          currency: defaultCurrency,
          isAlwaysAvailable: newItemForm.isAlwaysAvailable,
          availableFrom: newItemForm.isAlwaysAvailable ? null : newItemForm.availableFrom,
          availableUntil: newItemForm.isAlwaysAvailable ? null : newItemForm.availableUntil,
          inStock: newItemForm.inStock,
          imageUrl: newItemForm.imageUrl.trim() || null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to create item');
      }
      await loadCategories();
      setIsAddingItem(false);
      setNewItemForm(DEFAULT_ITEM);
      flashSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
    } finally {
      setIsSaving(false);
    }
  }

  async function updateItem(id: string) {
    setIsSaving(true);
    setError(null);
    try {
      const priceMajor = parseFloat(editItemForm.priceMajor) || 0;
      const res = await fetch('/api/accommodations/services', {
        method: 'PUT',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'item',
          id,
          propertyId,
          name: editItemForm.name.trim(),
          description: editItemForm.description.trim() || null,
          price: majorToMinor(priceMajor, defaultCurrency),
          isAlwaysAvailable: editItemForm.isAlwaysAvailable,
          availableFrom: editItemForm.isAlwaysAvailable ? null : editItemForm.availableFrom,
          availableUntil: editItemForm.isAlwaysAvailable ? null : editItemForm.availableUntil,
          inStock: editItemForm.inStock,
          imageUrl: editItemForm.imageUrl.trim() || null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to update item');
      }
      await loadCategories();
      setEditingItemId(null);
      flashSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteItem(id: string) {
    if (!confirm('Delete this service item?')) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/accommodations/services', {
        method: 'DELETE',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'item', id, propertyId }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to delete item');
      }
      await loadCategories();
      flashSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleItemStock(item: ServiceItem) {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/accommodations/services', {
        method: 'PUT',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'item',
          id: item.id,
          propertyId,
          inStock: !item.inStock,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to toggle stock');
      }
      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle stock');
    } finally {
      setIsSaving(false);
    }
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <SpinnerGap className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Info Banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" weight="duotone" />
          <div>
            <h4 className="font-medium text-blue-900">Service Catalog</h4>
            <p className="mt-1 text-sm text-blue-700">
              Manage service categories and items guests can order. Set prices, availability hours,
              and automation level per category.
            </p>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
          <button onClick={() => setError(null)} className="mt-1 text-sm text-red-600 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Success Banner */}
      {saveSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" weight="bold" />
            <p className="text-green-800">Saved successfully</p>
          </div>
        </div>
      )}

      {/* Two-Panel Layout */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* LEFT PANEL: Categories */}
        <div className="w-full space-y-3 lg:w-1/3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Categories
          </h3>

          {categories.map((cat) => {
            const isSelected = cat.id === selectedCategoryId;
            const isEditing = cat.id === editingCategoryId;

            if (isEditing) {
              return (
                <div key={cat.id} className="rounded-lg border-2 border-blue-300 bg-blue-50 p-3">
                  <CategoryForm
                    form={editCategoryForm}
                    setForm={setEditCategoryForm}
                    onSave={() => updateCategory(cat.id)}
                    onCancel={() => setEditingCategoryId(null)}
                    isSaving={isSaving}
                  />
                </div>
              );
            }

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                  isSelected
                    ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-400'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } ${!cat.isActive ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold text-gray-900">{cat.name}</span>
                      {cat.icon && <span className="text-xs text-gray-400">{cat.icon}</span>}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {cat.items.length} item{cat.items.length !== 1 ? 's' : ''}
                      </span>
                      <AutomationBadge level={cat.automationLevel} />
                      {!cat.isActive && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-2 flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategoryId(cat.id);
                        setEditCategoryForm({
                          name: cat.name,
                          icon: cat.icon || '',
                          automationLevel: cat.automationLevel as AutomationLevel,
                          isActive: cat.isActive,
                        });
                      }}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <Pencil className="h-3.5 w-3.5" weight="duotone" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCategory(cat.id);
                      }}
                      className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash className="h-3.5 w-3.5" weight="duotone" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add Category */}
          {isAddingCategory ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-3">
              <CategoryForm
                form={newCategoryForm}
                setForm={setNewCategoryForm}
                onSave={createCategory}
                onCancel={() => {
                  setIsAddingCategory(false);
                  setNewCategoryForm(DEFAULT_CATEGORY);
                }}
                isSaving={isSaving}
                isNew
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCategory(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-blue-400 hover:text-blue-600"
            >
              <Plus className="h-4 w-4" weight="bold" />
              Add Category
            </button>
          )}
        </div>

        {/* RIGHT PANEL: Items */}
        <div className="w-full lg:w-2/3">
          {selectedCategory ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Items in &quot;{selectedCategory.name}&quot;
                </h3>
                <span className="text-xs text-gray-400">
                  {selectedCategory.items.length} item
                  {selectedCategory.items.length !== 1 ? 's' : ''}
                </span>
              </div>

              {selectedCategory.items.length === 0 && !isAddingItem && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center">
                  <Package className="mx-auto h-10 w-10 text-gray-300" weight="duotone" />
                  <p className="mt-2 text-sm text-gray-500">No items in this category yet</p>
                </div>
              )}

              {selectedCategory.items.map((item) => {
                const isEditing = item.id === editingItemId;

                if (isEditing) {
                  return (
                    <div
                      key={item.id}
                      className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4"
                    >
                      <ItemForm
                        form={editItemForm}
                        setForm={setEditItemForm}
                        onSave={() => updateItem(item.id)}
                        onCancel={() => setEditingItemId(null)}
                        isSaving={isSaving}
                      />
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-4 transition-colors ${
                      item.inStock
                        ? 'border-gray-200 bg-white'
                        : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{item.name}</span>
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            {formatPrice(item.price, item.currency)}
                          </span>
                        </div>
                        {item.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          {item.isAlwaysAvailable ? (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                              Always available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                              <Clock className="h-3 w-3" weight="bold" />
                              {item.availableFrom} - {item.availableUntil}
                            </span>
                          )}
                          {!item.inStock && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                              Out of stock
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex items-center gap-2">
                        {/* In-stock toggle */}
                        <label
                          className="relative inline-flex cursor-pointer items-center"
                          title={item.inStock ? 'In stock' : 'Out of stock'}
                        >
                          <input
                            type="checkbox"
                            checked={item.inStock}
                            onChange={() => toggleItemStock(item)}
                            className="peer sr-only"
                            disabled={isSaving}
                          />
                          <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                        <button
                          onClick={() => {
                            setEditingItemId(item.id);
                            setEditItemForm({
                              name: item.name,
                              description: item.description || '',
                              priceMajor: String(minorToMajor(item.price, item.currency)),
                              isAlwaysAvailable: item.isAlwaysAvailable,
                              availableFrom: item.availableFrom || '08:00',
                              availableUntil: item.availableUntil || '22:00',
                              inStock: item.inStock,
                              imageUrl: item.imageUrl || '',
                            });
                          }}
                          className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <Pencil className="h-4 w-4" weight="duotone" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" weight="duotone" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add Item */}
              {isAddingItem ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                  <ItemForm
                    form={newItemForm}
                    setForm={setNewItemForm}
                    onSave={createItem}
                    onCancel={() => {
                      setIsAddingItem(false);
                      setNewItemForm(DEFAULT_ITEM);
                    }}
                    isSaving={isSaving}
                    isNew
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingItem(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-green-400 hover:text-green-600"
                >
                  <Plus className="h-4 w-4" weight="bold" />
                  Add Item
                </button>
              )}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500">
                {categories.length === 0
                  ? 'Create a category to get started'
                  : 'Select a category to view items'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Automation Badge
// ============================================================================

function AutomationBadge({ level }: { level: string }) {
  const config: Record<string, { label: string; classes: string }> = {
    auto_confirm: { label: 'Auto', classes: 'bg-green-100 text-green-700' },
    manual: { label: 'Manual', classes: 'bg-gray-100 text-gray-600' },
    whatsapp_notify: { label: 'WhatsApp', classes: 'bg-emerald-100 text-emerald-700' },
  };
  const c = config[level] || config.manual;
  return <span className={`rounded-full px-2 py-0.5 text-xs ${c.classes}`}>{c.label}</span>;
}

// ============================================================================
// Category Form
// ============================================================================

interface CategoryFormProps {
  form: CategoryFormData;
  setForm: (f: CategoryFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  isNew?: boolean;
}

function CategoryForm({ form, setForm, onSave, onCancel, isSaving, isNew }: CategoryFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Room Service, Minibar, Towels"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Icon (Phosphor name)</label>
        <input
          type="text"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          placeholder="e.g. coffee, towel, bed"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Automation Level</label>
        <select
          value={form.automationLevel}
          onChange={(e) => setForm({ ...form, automationLevel: e.target.value as AutomationLevel })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          {AUTOMATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} — {opt.description}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-700">Active</span>
          <p className="text-xs text-gray-500">Visible to guests when active</p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
        <button
          onClick={onSave}
          disabled={isSaving || !form.name.trim()}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? (
            <SpinnerGap className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          {isNew ? 'Add' : 'Save'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Item Form
// ============================================================================

interface ItemFormProps {
  form: ItemFormData;
  setForm: (f: ItemFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  isNew?: boolean;
}

function ItemForm({ form, setForm, onSave, onCancel, isSaving, isNew }: ItemFormProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Extra Towels, Club Sandwich"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price (major units)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={form.priceMajor}
            onChange={(e) => setForm({ ...form, priceMajor: e.target.value })}
            placeholder="12.50"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Optional description shown to guests"
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isAlwaysAvailable}
            onChange={(e) => setForm({ ...form, isAlwaysAvailable: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Always available</span>
        </label>
        {!form.isAlwaysAvailable && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="time"
              value={form.availableFrom}
              onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">to</span>
            <input
              type="time"
              value={form.availableUntil}
              onChange={(e) => setForm({ ...form, availableUntil: e.target.value })}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* In Stock + Image URL */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">In stock</span>
        </label>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Image URL (optional)</label>
        <input
          type="text"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="https://..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
        <button
          onClick={onSave}
          disabled={isSaving || !form.name.trim()}
          className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isSaving ? (
            <SpinnerGap className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          {isNew ? 'Add Item' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default ServiceCatalogManager;
