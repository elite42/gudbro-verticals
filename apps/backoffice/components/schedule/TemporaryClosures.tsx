'use client';

import { useState, useCallback } from 'react';

export interface TemporaryClosure {
  id: string;
  name: string;
  description?: string;
  dateStart: string; // ISO date string
  dateEnd?: string; // ISO date string, null for single day
  isClosed: boolean; // true = fully closed, false = modified hours
  hours?: {
    open: string;
    close: string;
  };
}

interface TemporaryClosuresProps {
  closures: TemporaryClosure[];
  onAdd: (closure: Omit<TemporaryClosure, 'id'>) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, closure: Partial<TemporaryClosure>) => void;
  disabled?: boolean;
}

// Generate time options in 30-minute increments
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
});

export function TemporaryClosures({
  closures,
  onAdd,
  onRemove,
  onUpdate,
  disabled = false,
}: TemporaryClosuresProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newClosure, setNewClosure] = useState<Omit<TemporaryClosure, 'id'>>({
    name: '',
    dateStart: '',
    isClosed: true,
  });

  const handleAdd = useCallback(() => {
    if (!newClosure.name || !newClosure.dateStart) return;
    onAdd(newClosure);
    setNewClosure({ name: '', dateStart: '', isClosed: true });
    setIsAdding(false);
  }, [newClosure, onAdd]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isActive = (closure: TemporaryClosure) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(closure.dateStart);
    const endDate = closure.dateEnd ? new Date(closure.dateEnd) : startDate;
    return today >= startDate && today <= endDate;
  };

  const isPast = (closure: TemporaryClosure) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = closure.dateEnd ? new Date(closure.dateEnd) : new Date(closure.dateStart);
    return endDate < today;
  };

  // Sort closures: active first, then future, then past
  const sortedClosures = [...closures].sort((a, b) => {
    const aActive = isActive(a);
    const bActive = isActive(b);
    const aPast = isPast(a);
    const bPast = isPast(b);

    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    if (aPast && !bPast) return 1;
    if (!aPast && bPast) return -1;
    return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
  });

  return (
    <div className="space-y-4">
      {/* Header with add button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Temporary Closures</h3>
          <p className="text-sm text-gray-500">
            Set temporary closures for holidays, renovations, or special events
          </p>
        </div>
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            disabled={disabled}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Closure
          </button>
        )}
      </div>

      {/* Add new closure form */}
      {isAdding && (
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-4 font-medium text-blue-900">New Temporary Closure</h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newClosure.name}
                onChange={(e) => setNewClosure({ ...newClosure, name: e.target.value })}
                placeholder="e.g., Summer holidays, Renovation"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={newClosure.description || ''}
                onChange={(e) => setNewClosure({ ...newClosure, description: e.target.value })}
                placeholder="Optional details"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Start date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={newClosure.dateStart}
                onChange={(e) => setNewClosure({ ...newClosure, dateStart: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* End date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="date"
                value={newClosure.dateEnd || ''}
                onChange={(e) =>
                  setNewClosure({ ...newClosure, dateEnd: e.target.value || undefined })
                }
                min={newClosure.dateStart}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Closure type */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={newClosure.isClosed}
                    onChange={() =>
                      setNewClosure({ ...newClosure, isClosed: true, hours: undefined })
                    }
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Fully closed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!newClosure.isClosed}
                    onChange={() =>
                      setNewClosure({
                        ...newClosure,
                        isClosed: false,
                        hours: { open: '09:00', close: '18:00' },
                      })
                    }
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Modified hours</span>
                </label>
              </div>
            </div>

            {/* Modified hours */}
            {!newClosure.isClosed && newClosure.hours && (
              <div className="flex items-center gap-4 sm:col-span-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500">Open</label>
                  <select
                    value={newClosure.hours.open}
                    onChange={(e) =>
                      setNewClosure({
                        ...newClosure,
                        hours: { ...newClosure.hours!, open: e.target.value },
                      })
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500">Close</label>
                  <select
                    value={newClosure.hours.close}
                    onChange={(e) =>
                      setNewClosure({
                        ...newClosure,
                        hours: { ...newClosure.hours!, close: e.target.value },
                      })
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewClosure({ name: '', dateStart: '', isClosed: true });
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!newClosure.name || !newClosure.dateStart}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Closure
            </button>
          </div>
        </div>
      )}

      {/* Closures list */}
      {sortedClosures.length > 0 ? (
        <div className="space-y-2">
          {sortedClosures.map((closure) => {
            const active = isActive(closure);
            const past = isPast(closure);

            return (
              <div
                key={closure.id}
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  active
                    ? 'border-red-200 bg-red-50'
                    : past
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : 'border-orange-200 bg-orange-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Status indicator */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      active
                        ? 'bg-red-500 text-white'
                        : past
                          ? 'bg-gray-400 text-white'
                          : 'bg-orange-500 text-white'
                    }`}
                  >
                    {closure.isClosed ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{closure.name}</h4>
                      {active && (
                        <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                          Active
                        </span>
                      )}
                      {past && (
                        <span className="rounded-full bg-gray-400 px-2 py-0.5 text-xs font-medium text-white">
                          Past
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatDate(closure.dateStart)}
                      {closure.dateEnd && ` - ${formatDate(closure.dateEnd)}`}
                    </p>
                    {closure.description && (
                      <p className="text-sm text-gray-500">{closure.description}</p>
                    )}
                    {!closure.isClosed && closure.hours && (
                      <p className="text-sm font-medium text-gray-700">
                        Modified hours: {closure.hours.open} - {closure.hours.close}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <button
                  type="button"
                  onClick={() => onRemove(closure.id)}
                  disabled={disabled}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
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
            );
          })}
        </div>
      ) : (
        !isAdding && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h4 className="mt-2 text-sm font-medium text-gray-900">No closures scheduled</h4>
            <p className="mt-1 text-sm text-gray-500">
              Add temporary closures for holidays or special events
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default TemporaryClosures;
