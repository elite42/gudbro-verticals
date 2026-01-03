'use client';

import { useState, useCallback } from 'react';
import { type OperatingHours, EMPTY_OPERATING_HOURS } from './OperatingHoursEditor';

// ===========================================
// Types
// ===========================================

export interface SeasonalSchedule {
  id: string;
  name: string;
  dateStart: string; // YYYY-MM-DD
  dateEnd: string; // YYYY-MM-DD
  isRecurring: boolean; // Repeat every year
  hours: OperatingHours;
}

export interface SeasonalHoursEditorProps {
  schedules: SeasonalSchedule[];
  onAdd: (schedule: Omit<SeasonalSchedule, 'id'>) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SeasonalSchedule>) => void;
  disabled?: boolean;
}

// ===========================================
// Preset Templates
// ===========================================

interface SeasonTemplate {
  name: string;
  dateStart: string;
  dateEnd: string;
  description: string;
}

const SEASON_TEMPLATES: SeasonTemplate[] = [
  {
    name: 'Summer Hours',
    dateStart: '06-01',
    dateEnd: '08-31',
    description: 'Extended hours during summer months',
  },
  {
    name: 'Winter Hours',
    dateStart: '12-01',
    dateEnd: '02-28',
    description: 'Reduced hours during winter months',
  },
  {
    name: 'Holiday Season',
    dateStart: '12-15',
    dateEnd: '01-05',
    description: 'Special hours during holiday period',
  },
  {
    name: 'Spring Break',
    dateStart: '03-15',
    dateEnd: '04-15',
    description: 'Extended hours during spring break',
  },
];

const DAY_LABELS: Record<keyof OperatingHours, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

// ===========================================
// Component
// ===========================================

export function SeasonalHoursEditor({
  schedules,
  onAdd,
  onRemove,
  onUpdate,
  disabled = false,
}: SeasonalHoursEditorProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // New seasonal schedule form state
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    dateStart: '',
    dateEnd: '',
    isRecurring: true,
    hours: { ...EMPTY_OPERATING_HOURS },
  });

  const handleAddSchedule = useCallback(() => {
    if (!newSchedule.name || !newSchedule.dateStart || !newSchedule.dateEnd) return;

    onAdd({
      name: newSchedule.name,
      dateStart: newSchedule.dateStart,
      dateEnd: newSchedule.dateEnd,
      isRecurring: newSchedule.isRecurring,
      hours: newSchedule.hours,
    });

    setNewSchedule({
      name: '',
      dateStart: '',
      dateEnd: '',
      isRecurring: true,
      hours: { ...EMPTY_OPERATING_HOURS },
    });
    setShowAddModal(false);
  }, [newSchedule, onAdd]);

  const applyTemplate = (template: SeasonTemplate) => {
    const currentYear = new Date().getFullYear();
    setNewSchedule({
      ...newSchedule,
      name: template.name,
      dateStart: `${currentYear}-${template.dateStart}`,
      dateEnd: `${currentYear}-${template.dateEnd}`,
    });
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };

  const updateDayHours = (
    scheduleId: string,
    day: keyof OperatingHours,
    field: 'open' | 'close' | 'enabled',
    value: string | boolean
  ) => {
    const schedule = schedules.find((s) => s.id === scheduleId);
    if (!schedule) return;

    if (field === 'enabled') {
      const newHours = { ...schedule.hours };
      if (value) {
        newHours[day] = { open: '09:00', close: '22:00' };
      } else {
        newHours[day] = null;
      }
      onUpdate(scheduleId, { hours: newHours });
    } else {
      const currentDayHours = schedule.hours[day];
      if (currentDayHours) {
        const newHours = { ...schedule.hours };
        newHours[day] = { ...currentDayHours, [field]: value };
        onUpdate(scheduleId, { hours: newHours });
      }
    }
  };

  // Sort schedules by date
  const sortedSchedules = [...schedules].sort((a, b) => a.dateStart.localeCompare(b.dateStart));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Seasonal Hours</h3>
          <p className="text-sm text-gray-500">
            Set different operating hours for specific seasons or periods
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={disabled}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Seasonal Hours
        </button>
      </div>

      {/* Schedules List */}
      {sortedSchedules.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
          <div className="text-4xl">🌞</div>
          <h4 className="mt-2 font-medium text-gray-900">No seasonal hours configured</h4>
          <p className="mt-1 text-sm text-gray-500">
            Add seasonal schedules for summer, winter, or special periods
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              {/* Header */}
              <div
                className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
                onClick={() => setExpandedId(expandedId === schedule.id ? null : schedule.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">
                        {formatDateRange(schedule.dateStart, schedule.dateEnd)}
                      </span>
                      {schedule.isRecurring && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                          Yearly
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(schedule.id);
                    }}
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
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedId === schedule.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Expanded Hours Editor */}
              {expandedId === schedule.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="space-y-2">
                    {(Object.keys(DAY_LABELS) as (keyof OperatingHours)[]).map((day) => {
                      const dayHours = schedule.hours[day];
                      const isEnabled = dayHours !== null;

                      return (
                        <div key={day} className="flex items-center gap-4 rounded-lg bg-white p-3">
                          <label className="flex w-28 items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={(e) =>
                                updateDayHours(schedule.id, day, 'enabled', e.target.checked)
                              }
                              disabled={disabled}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {DAY_LABELS[day]}
                            </span>
                          </label>

                          {isEnabled ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="time"
                                value={dayHours.open}
                                onChange={(e) =>
                                  updateDayHours(schedule.id, day, 'open', e.target.value)
                                }
                                disabled={disabled}
                                className="rounded border border-gray-300 px-2 py-1 text-sm"
                              />
                              <span className="text-gray-400">-</span>
                              <input
                                type="time"
                                value={dayHours.close}
                                onChange={(e) =>
                                  updateDayHours(schedule.id, day, 'close', e.target.value)
                                }
                                disabled={disabled}
                                className="rounded border border-gray-300 px-2 py-1 text-sm"
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Closed</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Add Seasonal Hours</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a new seasonal schedule with custom operating hours
            </p>

            {/* Templates */}
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Quick Templates
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SEASON_TEMPLATES.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => applyTemplate(template)}
                    className="rounded-lg border border-gray-200 p-3 text-left hover:border-blue-500 hover:bg-blue-50"
                  >
                    <div className="text-sm font-medium text-gray-900">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Schedule Name</label>
                <input
                  type="text"
                  value={newSchedule.name}
                  onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  placeholder="e.g., Summer Hours"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={newSchedule.dateStart}
                    onChange={(e) => setNewSchedule({ ...newSchedule, dateStart: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={newSchedule.dateEnd}
                    onChange={(e) => setNewSchedule({ ...newSchedule, dateEnd: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newSchedule.isRecurring}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, isRecurring: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Repeat every year</span>
                </label>
              </div>

              {/* Hours for each day */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Operating Hours
                </label>
                <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  {(Object.keys(DAY_LABELS) as (keyof OperatingHours)[]).map((day) => {
                    const dayHours = newSchedule.hours[day];
                    const isEnabled = dayHours !== null;

                    return (
                      <div key={day} className="flex items-center gap-4">
                        <label className="flex w-28 items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={(e) => {
                              const newHours = { ...newSchedule.hours };
                              if (e.target.checked) {
                                newHours[day] = { open: '09:00', close: '22:00' };
                              } else {
                                newHours[day] = null;
                              }
                              setNewSchedule({ ...newSchedule, hours: newHours });
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{DAY_LABELS[day]}</span>
                        </label>

                        {isEnabled && dayHours && (
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={dayHours.open}
                              onChange={(e) => {
                                const newHours = { ...newSchedule.hours };
                                newHours[day] = { ...dayHours, open: e.target.value };
                                setNewSchedule({ ...newSchedule, hours: newHours });
                              }}
                              className="rounded border border-gray-300 px-2 py-1 text-sm"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                              type="time"
                              value={dayHours.close}
                              onChange={(e) => {
                                const newHours = { ...newSchedule.hours };
                                newHours[day] = { ...dayHours, close: e.target.value };
                                setNewSchedule({ ...newSchedule, hours: newHours });
                              }}
                              className="rounded border border-gray-300 px-2 py-1 text-sm"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSchedule}
                disabled={!newSchedule.name || !newSchedule.dateStart || !newSchedule.dateEnd}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Seasonal Hours
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeasonalHoursEditor;
