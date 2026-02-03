'use client';

import { useState, useEffect } from 'react';
import { X, Users, Hash, GridFour } from '@phosphor-icons/react';
import { TableData, TableShapeType } from './TableShape';

interface Section {
  id: string;
  name: string;
}

interface TableDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: TableFormData) => Promise<void>;
  table?: TableData | null;
  sections: Section[];
  isLoading?: boolean;
}

export interface TableFormData {
  id?: string;
  table_number: string;
  min_capacity: number;
  max_capacity: number;
  shape: TableShapeType;
  section_id: string | null;
  is_reservable: boolean;
  notes: string;
}

const SHAPE_OPTIONS: { value: TableShapeType; label: string }[] = [
  { value: 'round', label: 'Round' },
  { value: 'square', label: 'Square' },
  { value: 'rectangle', label: 'Rectangle' },
];

export function TableDialog({
  open,
  onClose,
  onSave,
  table,
  sections,
  isLoading = false,
}: TableDialogProps) {
  const [formData, setFormData] = useState<TableFormData>({
    table_number: '',
    min_capacity: 2,
    max_capacity: 4,
    shape: 'square',
    section_id: null,
    is_reservable: true,
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);

  // Initialize form when dialog opens or table changes
  useEffect(() => {
    if (table) {
      setFormData({
        id: table.id,
        table_number: table.table_number,
        min_capacity: table.min_capacity,
        max_capacity: table.max_capacity,
        shape: table.shape,
        section_id: table.section_id ?? null,
        is_reservable: table.is_reservable ?? true,
        notes: table.notes || '',
      });
    } else {
      setFormData({
        table_number: '',
        min_capacity: 2,
        max_capacity: 4,
        shape: 'square',
        section_id: sections[0]?.id || null,
        is_reservable: true,
        notes: '',
      });
    }
    setError(null);
  }, [table, open, sections]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.table_number.trim()) {
      setError('Table number is required');
      return;
    }

    if (formData.min_capacity > formData.max_capacity) {
      setError('Minimum capacity cannot exceed maximum capacity');
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save table');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {table ? 'Edit Table' : 'New Table'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="space-y-4">
            {/* Table Number */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <Hash className="h-4 w-4" /> Table Number *
              </label>
              <input
                type="text"
                value={formData.table_number}
                onChange={(e) => setFormData({ ...formData, table_number: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., T1, A1, 101"
              />
            </div>

            {/* Capacity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Users className="h-4 w-4" /> Min Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.min_capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, min_capacity: parseInt(e.target.value) || 1 })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">Max Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.max_capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, max_capacity: parseInt(e.target.value) || 1 })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Shape */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <GridFour className="h-4 w-4" /> Table Shape
              </label>
              <div className="flex gap-2">
                {SHAPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, shape: option.value })}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
                      formData.shape === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option.value === 'round' && (
                      <div className="h-4 w-4 rounded-full border-2 border-current" />
                    )}
                    {option.value === 'square' && (
                      <div className="h-4 w-4 rounded border-2 border-current" />
                    )}
                    {option.value === 'rectangle' && (
                      <div className="h-3 w-5 rounded border-2 border-current" />
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section */}
            {sections.length > 0 && (
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">Section</label>
                <select
                  value={formData.section_id || ''}
                  onChange={(e) => setFormData({ ...formData, section_id: e.target.value || null })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">No section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Reservable toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_reservable"
                checked={formData.is_reservable}
                onChange={(e) => setFormData({ ...formData, is_reservable: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="is_reservable" className="text-sm text-gray-700">
                Available for reservations
              </label>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1 text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Near window, wheelchair accessible..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : table ? 'Update Table' : 'Add Table'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
