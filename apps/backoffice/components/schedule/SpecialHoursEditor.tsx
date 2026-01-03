'use client';

import { useState, useCallback } from 'react';

// ===========================================
// Types
// ===========================================

export interface SpecialHours {
  id: string;
  name: string;
  description?: string;
  date: string; // YYYY-MM-DD
  isClosed: boolean;
  hours?: { open: string; close: string };
}

export interface SpecialHoursEditorProps {
  specials: SpecialHours[];
  onAdd: (special: Omit<SpecialHours, 'id'>) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SpecialHours>) => void;
  disabled?: boolean;
}

// ===========================================
// Component
// ===========================================

export function SpecialHoursEditor({
  specials,
  onAdd,
  onRemove,
  onUpdate,
  disabled = false,
}: SpecialHoursEditorProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New special hours form state
  const [newSpecial, setNewSpecial] = useState({
    name: '',
    description: '',
    date: '',
    isClosed: false,
    hours: { open: '09:00', close: '22:00' },
  });

  const handleAddSpecial = useCallback(() => {
    if (!newSpecial.name || !newSpecial.date) return;

    onAdd({
      name: newSpecial.name,
      description: newSpecial.description || undefined,
      date: newSpecial.date,
      isClosed: newSpecial.isClosed,
      hours: newSpecial.isClosed ? undefined : newSpecial.hours,
    });

    setNewSpecial({
      name: '',
      description: '',
      date: '',
      isClosed: false,
      hours: { open: '09:00', close: '22:00' },
    });
    setShowAddModal(false);
  }, [newSpecial, onAdd]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isUpcoming = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isPast = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Sort specials by date (upcoming first, then past)
  const sortedSpecials = [...specials].sort((a, b) => {
    const aUpcoming = isUpcoming(a.date);
    const bUpcoming = isUpcoming(b.date);
    if (aUpcoming && !bUpcoming) return -1;
    if (!aUpcoming && bUpcoming) return 1;
    return a.date.localeCompare(b.date);
  });

  const upcomingSpecials = sortedSpecials.filter((s) => isUpcoming(s.date));
  const pastSpecials = sortedSpecials.filter((s) => isPast(s.date));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Special Hours</h3>
          <p className="text-sm text-gray-500">
            One-time schedule changes for special occasions or events
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={disabled}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Special Hours
        </button>
      </div>

      {/* Specials List */}
      {sortedSpecials.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
          <div className="text-4xl">✨</div>
          <h4 className="mt-2 font-medium text-gray-900">No special hours configured</h4>
          <p className="mt-1 text-sm text-gray-500">
            Add special hours for one-time events or occasions
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Upcoming */}
          {upcomingSpecials.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-500">Upcoming</h4>
              <div className="space-y-2">
                {upcomingSpecials.map((special) => (
                  <SpecialHoursItem
                    key={special.id}
                    special={special}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    disabled={disabled}
                    formatDate={formatDate}
                    editingId={editingId}
                    setEditingId={setEditingId}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {pastSpecials.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-400">Past</h4>
              <div className="space-y-2 opacity-60">
                {pastSpecials.map((special) => (
                  <SpecialHoursItem
                    key={special.id}
                    special={special}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    disabled={disabled}
                    formatDate={formatDate}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    isPast
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Add Special Hours</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a one-time schedule change for a specific date
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newSpecial.name}
                  onChange={(e) => setNewSpecial({ ...newSpecial, name: e.target.value })}
                  placeholder="e.g., Private Event, Early Closing"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={newSpecial.description}
                  onChange={(e) => setNewSpecial({ ...newSpecial, description: e.target.value })}
                  placeholder="e.g., Closed for private wedding reception"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newSpecial.date}
                  onChange={(e) => setNewSpecial({ ...newSpecial, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hoursType"
                    checked={!newSpecial.isClosed}
                    onChange={() => setNewSpecial({ ...newSpecial, isClosed: false })}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Modified Hours</div>
                    <div className="text-xs text-gray-500">Open with different hours</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hoursType"
                    checked={newSpecial.isClosed}
                    onChange={() => setNewSpecial({ ...newSpecial, isClosed: true })}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Closed All Day</div>
                    <div className="text-xs text-gray-500">Location will be closed</div>
                  </div>
                </label>
              </div>

              {!newSpecial.isClosed && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Open</label>
                    <input
                      type="time"
                      value={newSpecial.hours.open}
                      onChange={(e) =>
                        setNewSpecial({
                          ...newSpecial,
                          hours: { ...newSpecial.hours, open: e.target.value },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Close</label>
                    <input
                      type="time"
                      value={newSpecial.hours.close}
                      onChange={(e) =>
                        setNewSpecial({
                          ...newSpecial,
                          hours: { ...newSpecial.hours, close: e.target.value },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSpecial}
                disabled={!newSpecial.name || !newSpecial.date}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Special Hours
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================
// Item Component
// ===========================================

interface SpecialHoursItemProps {
  special: SpecialHours;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SpecialHours>) => void;
  disabled: boolean;
  formatDate: (date: string) => string;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  isPast?: boolean;
}

function SpecialHoursItem({
  special,
  onRemove,
  onUpdate,
  disabled,
  formatDate,
  editingId,
  setEditingId,
  isPast = false,
}: SpecialHoursItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${
            special.isClosed ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}
        >
          {special.isClosed ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{special.name}</h4>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">{formatDate(special.date)}</span>
            {special.isClosed ? (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                Closed
              </span>
            ) : (
              <span className="text-gray-500">
                {special.hours?.open} - {special.hours?.close}
              </span>
            )}
          </div>
          {special.description && (
            <p className="mt-1 text-xs text-gray-400">{special.description}</p>
          )}
        </div>
      </div>

      {!isPast && (
        <div className="flex items-center gap-2">
          {/* Toggle closed/open */}
          <button
            onClick={() =>
              onUpdate(special.id, {
                isClosed: !special.isClosed,
                hours: special.isClosed ? { open: '09:00', close: '18:00' } : undefined,
              })
            }
            disabled={disabled}
            className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            {special.isClosed ? 'Set Hours' : 'Set Closed'}
          </button>

          {/* Time inputs when not closed */}
          {!special.isClosed && editingId === special.id && (
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={special.hours?.open || '09:00'}
                onChange={(e) =>
                  onUpdate(special.id, {
                    hours: { ...special.hours!, open: e.target.value },
                  })
                }
                disabled={disabled}
                className="rounded border border-gray-300 px-2 py-1 text-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="time"
                value={special.hours?.close || '18:00'}
                onChange={(e) =>
                  onUpdate(special.id, {
                    hours: { ...special.hours!, close: e.target.value },
                  })
                }
                disabled={disabled}
                className="rounded border border-gray-300 px-2 py-1 text-sm"
              />
              <button
                onClick={() => setEditingId(null)}
                className="rounded px-2 py-1 text-sm text-green-600 hover:bg-green-50"
              >
                Done
              </button>
            </div>
          )}

          {!special.isClosed && editingId !== special.id && (
            <button
              onClick={() => setEditingId(special.id)}
              disabled={disabled}
              className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-50"
            >
              Edit Hours
            </button>
          )}

          {/* Remove button */}
          <button
            onClick={() => onRemove(special.id)}
            disabled={disabled}
            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default SpecialHoursEditor;
