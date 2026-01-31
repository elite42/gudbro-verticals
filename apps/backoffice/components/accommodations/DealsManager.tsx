'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, PencilSimple, Check, X, Power, Handshake, Link, Trash } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface Deal {
  id: string;
  partner_name: string;
  discount_description: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface DealFormData {
  partner_name: string;
  discount_description: string;
  description: string;
  url: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
}

interface DealsManagerProps {
  propertyId: string;
}

const DEFAULT_FORM: DealFormData = {
  partner_name: '',
  discount_description: '',
  description: '',
  url: '',
  image_url: '',
  is_active: true,
  display_order: 0,
};

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

const AUTH_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ADMIN_API_KEY}`,
};

// ============================================================================
// Component
// ============================================================================

export function DealsManager({ propertyId }: DealsManagerProps) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<DealFormData>(DEFAULT_FORM);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load deals
  const loadDeals = useCallback(async () => {
    try {
      const res = await fetch(`/api/accommodations/deals?propertyId=${propertyId}`, {
        headers: AUTH_HEADERS,
      });
      const data = await res.json();
      if (data.deals) {
        setDeals(data.deals);
      }
    } catch (err) {
      console.error('Error loading deals:', err);
      setError('Failed to load deals');
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      loadDeals();
    }
  }, [propertyId, loadDeals]);

  // Convert deal to form data
  const dealToFormData = (deal: Deal): DealFormData => ({
    partner_name: deal.partner_name,
    discount_description: deal.discount_description,
    description: deal.description || '',
    url: deal.url || '',
    image_url: deal.image_url || '',
    is_active: deal.is_active,
    display_order: deal.display_order,
  });

  // Save deal (create or update)
  const saveDeal = async (data: DealFormData, id?: string) => {
    setSaving(true);
    setError(null);

    try {
      const url = id ? `/api/accommodations/deals/${id}` : '/api/accommodations/deals';

      const payload = id ? { ...data } : { ...data, propertyId };

      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: AUTH_HEADERS,
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save deal');
      }

      await loadDeals();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);

      setIsAdding(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
    } catch (err) {
      console.error('Error saving deal:', err);
      setError(err instanceof Error ? err.message : 'Failed to save deal');
    } finally {
      setSaving(false);
    }
  };

  // Toggle active status
  const toggleActive = async (deal: Deal) => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/accommodations/deals/${deal.id}`, {
        method: 'PUT',
        headers: AUTH_HEADERS,
        body: JSON.stringify({ is_active: !deal.is_active }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to update deal');
      }

      await loadDeals();
    } catch (err) {
      console.error('Error toggling deal:', err);
      setError(err instanceof Error ? err.message : 'Failed to update deal');
    } finally {
      setSaving(false);
    }
  };

  // Delete deal
  const deleteDeal = async (id: string) => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/accommodations/deals/${id}`, {
        method: 'DELETE',
        headers: AUTH_HEADERS,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to delete deal');
      }

      setDeletingId(null);
      await loadDeals();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error('Error deleting deal:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete deal');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Local Deals</h2>
          <p className="text-sm text-gray-500">
            Partner deals for your guests. {deals.filter((d) => d.is_active).length} active of{' '}
            {deals.length} total.
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData(DEFAULT_FORM);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" weight="bold" />
            Add Deal
          </button>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
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

      {/* Add Form */}
      {isAdding && (
        <div className="rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-5">
          <h3 className="mb-4 font-medium text-gray-900">New Deal</h3>
          <DealForm
            form={formData}
            setForm={setFormData}
            onSave={() => saveDeal(formData)}
            onCancel={() => {
              setIsAdding(false);
              setFormData(DEFAULT_FORM);
            }}
            isSaving={saving}
          />
        </div>
      )}

      {/* Deal List */}
      {deals.length === 0 && !isAdding ? (
        <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
          <Handshake className="mx-auto h-12 w-12 text-gray-300" weight="duotone" />
          <h3 className="mt-4 text-sm font-medium text-gray-900">No deals yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add partnership deals for your guests to enjoy local discounts.
          </p>
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData(DEFAULT_FORM);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" weight="bold" />
            Add Deal
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className={`rounded-xl border bg-white p-4 transition-colors ${
                deal.is_active ? 'border-gray-200' : 'border-gray-100 opacity-60'
              }`}
            >
              {editingId === deal.id ? (
                <div>
                  <h3 className="mb-4 font-medium text-gray-900">Edit Deal</h3>
                  <DealForm
                    form={formData}
                    setForm={setFormData}
                    onSave={() => saveDeal(formData, deal.id)}
                    onCancel={() => {
                      setEditingId(null);
                      setFormData(DEFAULT_FORM);
                    }}
                    isSaving={saving}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Partner icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                      <Handshake className="h-6 w-6 text-orange-500" weight="duotone" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{deal.partner_name}</span>
                        <span className="flex-shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                          {deal.discount_description}
                        </span>
                        {!deal.is_active && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                        {deal.description && (
                          <span className="line-clamp-1">{deal.description}</span>
                        )}
                        {deal.url && (
                          <span className="flex items-center gap-1 text-blue-500">
                            <Link className="h-3.5 w-3.5" weight="duotone" />
                            Link
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingId(deal.id);
                        setFormData(dealToFormData(deal));
                      }}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      title="Edit deal"
                    >
                      <PencilSimple className="h-4 w-4" weight="duotone" />
                    </button>
                    <button
                      onClick={() => toggleActive(deal)}
                      disabled={saving}
                      className={`rounded-lg p-2 transition-colors ${
                        deal.is_active
                          ? 'text-green-500 hover:bg-red-50 hover:text-red-600'
                          : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
                      }`}
                      title={deal.is_active ? 'Deactivate deal' : 'Reactivate deal'}
                    >
                      <Power className="h-4 w-4" weight="duotone" />
                    </button>
                    {deletingId === deal.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => deleteDeal(deal.id)}
                          disabled={saving}
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                          title="Confirm delete"
                        >
                          <Check className="h-4 w-4" weight="bold" />
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" weight="bold" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(deal.id)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete deal"
                      >
                        <Trash className="h-4 w-4" weight="duotone" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Deal Form Sub-Component
// ============================================================================

interface DealFormProps {
  form: DealFormData;
  setForm: (form: DealFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

function DealForm({ form, setForm, onSave, onCancel, isSaving }: DealFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Partner Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Partner Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.partner_name}
            onChange={(e) => setForm({ ...form, partner_name: e.target.value })}
            placeholder="e.g. Beach Bar Sunrise"
            maxLength={100}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Discount Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Discount <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.discount_description}
            onChange={(e) => setForm({ ...form, discount_description: e.target.value })}
            placeholder="e.g. 15% off all drinks"
            maxLength={200}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Optional longer description of the deal"
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* URL */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Partner URL</label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Display Order */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Display Order</label>
          <input
            type="number"
            min={0}
            value={form.display_order}
            onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Active toggle */}
        <div className="flex items-end pb-1">
          <div className="flex w-full items-center justify-between">
            <div>
              <span className="font-medium text-gray-900">Active</span>
              <p className="text-sm text-gray-500">Visible to guests</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || !form.partner_name || !form.discount_description}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Save
        </button>
      </div>
    </div>
  );
}
