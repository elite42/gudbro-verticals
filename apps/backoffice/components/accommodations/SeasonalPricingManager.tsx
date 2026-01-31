'use client';

import { useState, useEffect, useCallback } from 'react';
import { PencilSimple, Trash, Plus, CurrencyCircleDollar, SpinnerGap } from '@phosphor-icons/react';
import { formatBookingPrice } from '@/lib/accommodations/helpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SeasonalPricing {
  id: string;
  room_id: string;
  date_from: string;
  date_to: string;
  price_per_night: number;
  label: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeasonalPricingManagerProps {
  propertyId: string;
  roomId: string | null; // null = show all rooms
  currency: string;
  onRefresh: () => void; // trigger calendar data refresh
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const AUTH_HEADERS = { Authorization: `Bearer ${ADMIN_API_KEY}` };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SeasonalPricingManager({
  propertyId,
  roomId,
  currency,
  onRefresh,
}: SeasonalPricingManagerProps) {
  const [pricing, setPricing] = useState<SeasonalPricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formDateFrom, setFormDateFrom] = useState('');
  const [formDateTo, setFormDateTo] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formLabel, setFormLabel] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch pricing overrides
  const fetchPricing = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ propertyId });
      if (roomId) params.set('roomId', roomId);

      const res = await fetch(`/api/accommodations/seasonal-pricing?${params}`, {
        headers: AUTH_HEADERS,
      });

      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      const data = await res.json();
      setPricing(data.pricing || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pricing');
    } finally {
      setLoading(false);
    }
  }, [propertyId, roomId]);

  useEffect(() => {
    fetchPricing();
  }, [fetchPricing]);

  // Reset form
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormDateFrom('');
    setFormDateTo('');
    setFormPrice('');
    setFormLabel('');
    setFormError(null);
  };

  // Open edit
  const openEdit = (p: SeasonalPricing) => {
    setEditingId(p.id);
    setFormDateFrom(p.date_from);
    setFormDateTo(p.date_to);
    // Convert minor units to major for display
    setFormPrice(String(p.price_per_night / 100));
    setFormLabel(p.label || '');
    setFormError(null);
    setShowForm(true);
  };

  // Save (create or update)
  const handleSave = async () => {
    if (!formDateFrom || !formDateTo || !formPrice) {
      setFormError('Date range and price are required.');
      return;
    }

    if (!roomId) {
      setFormError('Please select a specific room first.');
      return;
    }

    const priceValue = parseFloat(formPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      setFormError('Price must be a positive number.');
      return;
    }

    // Convert major units to minor (cents)
    const priceMinor = Math.round(priceValue * 100);

    setSaving(true);
    setFormError(null);

    try {
      const payload: Record<string, unknown> = {
        propertyId,
        roomId,
        dateFrom: formDateFrom,
        dateTo: formDateTo,
        pricePerNight: priceMinor,
        label: formLabel || null,
      };

      let res: Response;
      if (editingId) {
        res = await fetch('/api/accommodations/seasonal-pricing', {
          method: 'PUT',
          headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
      } else {
        res = await fetch('/api/accommodations/seasonal-pricing', {
          method: 'POST',
          headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed (${res.status})`);
      }

      resetForm();
      await fetchPricing();
      onRefresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this pricing override?')) return;

    try {
      const res = await fetch('/api/accommodations/seasonal-pricing', {
        method: 'DELETE',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, propertyId }),
      });

      if (!res.ok) throw new Error(`Failed to delete (${res.status})`);

      await fetchPricing();
      onRefresh();
    } catch (err) {
      console.error('[SeasonalPricingManager] delete error:', err);
    }
  };

  // Format date for display
  const fmtDate = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CurrencyCircleDollar size={20} weight="duotone" className="text-green-600" />
          <h3 className="text-sm font-semibold text-gray-900">Seasonal Pricing</h3>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-1 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
          >
            <Plus size={14} />
            Add Override
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-6">
          <SpinnerGap size={20} className="animate-spin text-gray-400" />
        </div>
      )}

      {/* Error */}
      {!loading && error && <p className="text-sm text-red-600">{error}</p>}

      {/* List */}
      {!loading && !error && pricing.length === 0 && !showForm && (
        <p className="text-center text-sm text-gray-400">No seasonal pricing overrides yet.</p>
      )}

      {!loading &&
        !error &&
        pricing.map((p) => (
          <div
            key={p.id}
            className="mb-2 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
          >
            <div className="min-w-0 flex-1">
              {p.label && (
                <span className="mb-0.5 block text-xs font-medium text-green-700">{p.label}</span>
              )}
              <span className="text-sm text-gray-700">
                {fmtDate(p.date_from)} &mdash; {fmtDate(p.date_to)}
              </span>
              <span className="ml-2 font-medium text-gray-900">
                {formatBookingPrice(p.price_per_night, currency)}/night
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => openEdit(p)}
                className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                title="Edit"
              >
                <PencilSimple size={16} />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="rounded p-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}

      {/* Inline Form */}
      {showForm && (
        <div className="mt-3 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Date From</label>
              <input
                type="date"
                value={formDateFrom}
                onChange={(e) => setFormDateFrom(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Date To</label>
              <input
                type="date"
                value={formDateTo}
                onChange={(e) => setFormDateTo(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">
                Price per Night ({currency.toUpperCase()})
              </label>
              <input
                type="number"
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
                min="0.01"
                step="0.01"
                placeholder="e.g. 45.00"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Label (optional)</label>
              <input
                type="text"
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                placeholder="e.g. Holiday Season"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {formError && <p className="text-xs text-red-600">{formError}</p>}

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving && <SpinnerGap size={14} className="animate-spin" />}
              {editingId ? 'Update' : 'Save'}
            </button>
            <button
              onClick={resetForm}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
