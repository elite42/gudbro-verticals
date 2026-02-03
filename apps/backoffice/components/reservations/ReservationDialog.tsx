'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Users,
  Clock,
  Calendar,
  Phone,
  EnvelopeSimple,
  ChatTeardrop,
  MapPin,
} from '@phosphor-icons/react';
import { format } from 'date-fns';
import { Reservation, ReservationStatus } from './ReservationCard';

interface Section {
  id: string;
  name: string;
}

interface Table {
  id: string;
  table_number: string;
  min_capacity: number;
  max_capacity: number;
  section_id: string;
}

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ReservationFormData) => Promise<void>;
  reservation?: Reservation | null;
  defaultDate?: Date;
  defaultTime?: string;
  sections: Section[];
  tables: Table[];
  isLoading?: boolean;
}

export interface ReservationFormData {
  id?: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  duration_minutes: number;
  section_id: string | null;
  table_id: string | null;
  occasion: string;
  special_requests: string;
  status: ReservationStatus;
}

const OCCASION_OPTIONS = [
  '',
  'Birthday',
  'Anniversary',
  'Business Meeting',
  'Date Night',
  'Family Gathering',
  'Celebration',
  'Other',
];

const DURATION_OPTIONS = [
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
  { value: 150, label: '2.5 hours' },
  { value: 180, label: '3 hours' },
];

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let h = 10; h <= 22; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    slots.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export function ReservationDialog({
  open,
  onClose,
  onSave,
  reservation,
  defaultDate,
  defaultTime,
  sections,
  tables,
  isLoading = false,
}: ReservationDialogProps) {
  const [formData, setFormData] = useState<ReservationFormData>({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    party_size: 2,
    reservation_date: format(new Date(), 'yyyy-MM-dd'),
    reservation_time: '19:00',
    duration_minutes: 90,
    section_id: null,
    table_id: null,
    occasion: '',
    special_requests: '',
    status: 'pending',
  });

  const [error, setError] = useState<string | null>(null);

  // Initialize form when dialog opens or reservation changes
  useEffect(() => {
    if (reservation) {
      setFormData({
        id: reservation.id,
        guest_name: reservation.guest_name,
        guest_email: reservation.guest_email || '',
        guest_phone: reservation.guest_phone || '',
        party_size: reservation.party_size,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time,
        duration_minutes: reservation.duration_minutes,
        section_id: reservation.section?.id || null,
        table_id: reservation.table?.id || null,
        occasion: reservation.occasion || '',
        special_requests: reservation.special_requests || '',
        status: reservation.status,
      });
    } else {
      setFormData({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        party_size: 2,
        reservation_date: defaultDate
          ? format(defaultDate, 'yyyy-MM-dd')
          : format(new Date(), 'yyyy-MM-dd'),
        reservation_time: defaultTime || '19:00',
        duration_minutes: 90,
        section_id: null,
        table_id: null,
        occasion: '',
        special_requests: '',
        status: 'pending',
      });
    }
    setError(null);
  }, [reservation, defaultDate, defaultTime, open]);

  // Filter tables by selected section
  const filteredTables = formData.section_id
    ? tables.filter((t) => t.section_id === formData.section_id)
    : tables;

  // Filter tables by party size
  const suitableTables = filteredTables.filter(
    (t) => t.min_capacity <= formData.party_size && t.max_capacity >= formData.party_size
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.guest_name.trim()) {
      setError('Guest name is required');
      return;
    }

    if (!formData.guest_phone.trim() && !formData.guest_email.trim()) {
      setError('Please provide at least a phone number or email');
      return;
    }

    // Validate date is not in the past (only for new reservations)
    if (!reservation) {
      const today = format(new Date(), 'yyyy-MM-dd');
      if (formData.reservation_date < today) {
        setError('Cannot create reservation for a past date');
        return;
      }
    }

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save reservation');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {reservation ? 'Edit Reservation' : 'New Reservation'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Guest Name *</label>
              <input
                type="text"
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Phone className="h-4 w-4" /> Phone
                </label>
                <input
                  type="tel"
                  value={formData.guest_phone}
                  onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="+84 xxx xxx xxx"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <EnvelopeSimple className="h-4 w-4" /> Email
                </label>
                <input
                  type="email"
                  value={formData.guest_email}
                  onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="guest@email.com"
                />
              </div>
            </div>

            {/* Party Size & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Users className="h-4 w-4" /> Party Size *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.party_size}
                  onChange={(e) =>
                    setFormData({ ...formData, party_size: parseInt(e.target.value) || 1 })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4" /> Duration
                </label>
                <select
                  value={formData.duration_minutes}
                  onChange={(e) =>
                    setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {DURATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4" /> Date *
                </label>
                <input
                  type="date"
                  value={formData.reservation_date}
                  min={!reservation ? format(new Date(), 'yyyy-MM-dd') : undefined}
                  onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">Time *</label>
                <select
                  value={formData.reservation_time}
                  onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section & Table */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4" /> Section
                </label>
                <select
                  value={formData.section_id || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      section_id: e.target.value || null,
                      table_id: null, // Reset table when section changes
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Any section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">Table</label>
                <select
                  value={formData.table_id || ''}
                  onChange={(e) => setFormData({ ...formData, table_id: e.target.value || null })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Auto-assign</option>
                  {suitableTables.map((table) => (
                    <option key={table.id} value={table.id}>
                      Table {table.table_number} ({table.min_capacity}-{table.max_capacity} guests)
                    </option>
                  ))}
                </select>
                {suitableTables.length === 0 && filteredTables.length > 0 && (
                  <p className="mt-1 text-xs text-amber-600">
                    No tables available for {formData.party_size} guests
                  </p>
                )}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="mb-1 text-sm font-medium text-gray-700">Occasion</label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {OCCASION_OPTIONS.map((occasion) => (
                  <option key={occasion} value={occasion}>
                    {occasion || 'None'}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <ChatTeardrop className="h-4 w-4" /> Special Requests
              </label>
              <textarea
                value={formData.special_requests}
                onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Any dietary requirements, allergies, or special requests..."
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : reservation ? 'Update' : 'Create Reservation'}
          </button>
        </div>
      </div>
    </div>
  );
}
