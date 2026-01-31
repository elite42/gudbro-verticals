'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Check, X, Power, Bed, Users, CurrencyDollar } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface Room {
  id: string;
  room_number: string;
  room_type: string;
  capacity: number;
  description: string | null;
  base_price_per_night: number;
  currency: string;
  images: string[];
  beds: Array<{ type: string; count: number }> | null;
  amenities: string[];
  is_active: boolean;
  sort_order: number;
}

interface RoomFormData {
  room_number: string;
  room_type: string;
  capacity: number;
  base_price_per_night: number; // In major units (user-facing)
  currency: string;
  description: string;
  is_active: boolean;
}

interface RoomManagerProps {
  propertyId: string;
}

const ROOM_TYPES = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'twin', label: 'Twin' },
  { value: 'suite', label: 'Suite' },
  { value: 'dorm', label: 'Dorm' },
  { value: 'studio', label: 'Studio' },
  { value: 'apartment', label: 'Apartment' },
];

const DEFAULT_FORM: RoomFormData = {
  room_number: '',
  room_type: 'double',
  capacity: 2,
  base_price_per_night: 0,
  currency: 'USD',
  description: '',
  is_active: true,
};

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_API_KEY}`,
  };
}

// ============================================================================
// Component
// ============================================================================

export function RoomManager({ propertyId }: RoomManagerProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<RoomFormData>(DEFAULT_FORM);

  // Load rooms
  const loadRooms = useCallback(async () => {
    try {
      const res = await fetch(`/api/accommodations/rooms?propertyId=${propertyId}`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.rooms) {
        setRooms(data.rooms);
      }
    } catch (err) {
      console.error('Error loading rooms:', err);
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      loadRooms();
    }
  }, [propertyId, loadRooms]);

  // Convert room to form data (minor units -> major units for price)
  const roomToFormData = (room: Room): RoomFormData => ({
    room_number: room.room_number,
    room_type: room.room_type,
    capacity: room.capacity,
    base_price_per_night: room.base_price_per_night / 100,
    currency: room.currency,
    description: room.description || '',
    is_active: room.is_active,
  });

  // Save room (create or update)
  const saveRoom = async (data: RoomFormData, id?: string) => {
    setSaving(true);
    setError(null);

    // Convert price from major to minor units
    const payload = {
      ...data,
      base_price_per_night: Math.round(data.base_price_per_night * 100),
      propertyId,
      ...(id ? { id } : {}),
    };

    try {
      const res = await fetch('/api/accommodations/rooms', {
        method: id ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save room');
      }

      await loadRooms();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);

      setIsAdding(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
    } catch (err) {
      console.error('Error saving room:', err);
      setError(err instanceof Error ? err.message : 'Failed to save room');
    } finally {
      setSaving(false);
    }
  };

  // Toggle active status
  const toggleActive = async (room: Room) => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/accommodations/rooms', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ id: room.id, is_active: !room.is_active }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to update room');
      }

      await loadRooms();
    } catch (err) {
      console.error('Error toggling room:', err);
      setError(err instanceof Error ? err.message : 'Failed to update room');
    } finally {
      setSaving(false);
    }
  };

  // Format price for display
  const formatPrice = (amount: number, currency: string) => {
    const major = (amount / 100).toFixed(2);
    return `${major} ${currency.toUpperCase()}`;
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
          <h2 className="text-lg font-semibold text-gray-900">Rooms</h2>
          <p className="text-sm text-gray-500">
            Manage your property rooms. {rooms.filter((r) => r.is_active).length} active of{' '}
            {rooms.length} total.
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
            Add Room
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
          <h3 className="mb-4 font-medium text-gray-900">New Room</h3>
          <RoomForm
            form={formData}
            setForm={setFormData}
            onSave={() => saveRoom(formData)}
            onCancel={() => {
              setIsAdding(false);
              setFormData(DEFAULT_FORM);
            }}
            isSaving={saving}
          />
        </div>
      )}

      {/* Room List */}
      {rooms.length === 0 && !isAdding ? (
        <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
          <Bed className="mx-auto h-12 w-12 text-gray-300" weight="duotone" />
          <h3 className="mt-4 text-sm font-medium text-gray-900">No rooms yet</h3>
          <p className="mt-1 text-sm text-gray-500">Add your first room to get started.</p>
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData(DEFAULT_FORM);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" weight="bold" />
            Add Room
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`rounded-xl border bg-white p-4 transition-colors ${
                room.is_active ? 'border-gray-200' : 'border-gray-100 opacity-60'
              }`}
            >
              {editingId === room.id ? (
                <div>
                  <h3 className="mb-4 font-medium text-gray-900">Edit Room {room.room_number}</h3>
                  <RoomForm
                    form={formData}
                    setForm={setFormData}
                    onSave={() => saveRoom(formData, room.id)}
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
                    {/* Room number */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold text-gray-700">
                      {room.room_number}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Room {room.room_number}</span>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium capitalize text-blue-700">
                          {room.room_type}
                        </span>
                        {!room.is_active && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" weight="duotone" />
                          {room.capacity} guest{room.capacity !== 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <CurrencyDollar className="h-3.5 w-3.5" weight="duotone" />
                          {formatPrice(room.base_price_per_night, room.currency)}/night
                        </span>
                      </div>
                      {room.description && (
                        <p className="mt-1 text-sm text-gray-400">{room.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingId(room.id);
                        setFormData(roomToFormData(room));
                      }}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      title="Edit room"
                    >
                      <Pencil className="h-4 w-4" weight="duotone" />
                    </button>
                    <button
                      onClick={() => toggleActive(room)}
                      disabled={saving}
                      className={`rounded-lg p-2 transition-colors ${
                        room.is_active
                          ? 'text-green-500 hover:bg-red-50 hover:text-red-600'
                          : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
                      }`}
                      title={room.is_active ? 'Deactivate room' : 'Reactivate room'}
                    >
                      <Power className="h-4 w-4" weight="duotone" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TODO: Image upload for rooms (Phase 22) */}
      {/* TODO: Beds configuration UI (Phase 22) */}
      {/* TODO: Amenities multi-select (Phase 22) */}
      {/* TODO: Drag-to-reorder sort (Phase 22) */}
    </div>
  );
}

// ============================================================================
// Room Form Sub-Component
// ============================================================================

interface RoomFormProps {
  form: RoomFormData;
  setForm: (form: RoomFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

function RoomForm({ form, setForm, onSave, onCancel, isSaving }: RoomFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Room Number */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Room Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.room_number}
            onChange={(e) => setForm({ ...form, room_number: e.target.value })}
            placeholder="e.g. 101, A1"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Room Type</label>
          <select
            value={form.room_type}
            onChange={(e) => setForm({ ...form, room_type: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {ROOM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Capacity */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Capacity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 1 })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price/Night <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={form.base_price_per_night}
            onChange={(e) =>
              setForm({ ...form, base_price_per_night: parseFloat(e.target.value) || 0 })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
          <input
            type="text"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })}
            placeholder="USD"
            maxLength={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 uppercase focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Optional room description (e.g. sea view, private balcony)"
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image upload placeholder */}
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-center text-sm text-gray-400">
        {/* TODO: Image upload coming soon (Phase 22) */}
        Image upload coming soon
      </div>

      {/* Active toggle */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium text-gray-900">Active</span>
          <p className="text-sm text-gray-500">Room is available for bookings</p>
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
          disabled={isSaving || !form.room_number || form.base_price_per_night <= 0}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Save
        </button>
      </div>
    </div>
  );
}
