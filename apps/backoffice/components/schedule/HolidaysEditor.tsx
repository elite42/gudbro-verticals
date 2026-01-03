'use client';

import { useState, useCallback } from 'react';

// ===========================================
// Types
// ===========================================

export interface Holiday {
  id: string;
  name: string;
  date: string; // MM-DD format for yearly recurrence
  isRecurring: boolean;
  isClosed: boolean;
  hours?: { open: string; close: string };
}

export interface HolidaysEditorProps {
  holidays: Holiday[];
  onAdd: (holiday: Omit<Holiday, 'id'>) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Holiday>) => void;
  disabled?: boolean;
  countryCode?: string;
}

// ===========================================
// Holiday Presets by Country
// ===========================================

interface HolidayPreset {
  name: string;
  date: string; // MM-DD format
  isRecurring: true;
}

type CountryPresets = Record<string, HolidayPreset[]>;

const HOLIDAY_PRESETS: CountryPresets = {
  IT: [
    { name: 'Capodanno', date: '01-01', isRecurring: true },
    { name: 'Epifania', date: '01-06', isRecurring: true },
    { name: 'Festa della Liberazione', date: '04-25', isRecurring: true },
    { name: 'Festa dei Lavoratori', date: '05-01', isRecurring: true },
    { name: 'Festa della Repubblica', date: '06-02', isRecurring: true },
    { name: 'Ferragosto', date: '08-15', isRecurring: true },
    { name: 'Ognissanti', date: '11-01', isRecurring: true },
    { name: 'Immacolata Concezione', date: '12-08', isRecurring: true },
    { name: 'Natale', date: '12-25', isRecurring: true },
    { name: 'Santo Stefano', date: '12-26', isRecurring: true },
  ],
  US: [
    { name: "New Year's Day", date: '01-01', isRecurring: true },
    { name: 'Independence Day', date: '07-04', isRecurring: true },
    { name: 'Veterans Day', date: '11-11', isRecurring: true },
    { name: 'Christmas Day', date: '12-25', isRecurring: true },
  ],
  UK: [
    { name: "New Year's Day", date: '01-01', isRecurring: true },
    { name: 'Christmas Day', date: '12-25', isRecurring: true },
    { name: 'Boxing Day', date: '12-26', isRecurring: true },
  ],
  VN: [
    { name: "New Year's Day", date: '01-01', isRecurring: true },
    { name: 'Reunification Day', date: '04-30', isRecurring: true },
    { name: 'Labour Day', date: '05-01', isRecurring: true },
    { name: 'National Day', date: '09-02', isRecurring: true },
  ],
  ES: [
    { name: 'Ano Nuevo', date: '01-01', isRecurring: true },
    { name: 'Epifania', date: '01-06', isRecurring: true },
    { name: 'Dia del Trabajo', date: '05-01', isRecurring: true },
    { name: 'Asuncion', date: '08-15', isRecurring: true },
    { name: 'Fiesta Nacional', date: '10-12', isRecurring: true },
    { name: 'Todos los Santos', date: '11-01', isRecurring: true },
    { name: 'Constitucion', date: '12-06', isRecurring: true },
    { name: 'Inmaculada Concecion', date: '12-08', isRecurring: true },
    { name: 'Navidad', date: '12-25', isRecurring: true },
  ],
  FR: [
    { name: "Jour de l'An", date: '01-01', isRecurring: true },
    { name: 'Fete du Travail', date: '05-01', isRecurring: true },
    { name: 'Victoire 1945', date: '05-08', isRecurring: true },
    { name: 'Fete Nationale', date: '07-14', isRecurring: true },
    { name: 'Assomption', date: '08-15', isRecurring: true },
    { name: 'Toussaint', date: '11-01', isRecurring: true },
    { name: 'Armistice', date: '11-11', isRecurring: true },
    { name: 'Noel', date: '12-25', isRecurring: true },
  ],
  DE: [
    { name: 'Neujahr', date: '01-01', isRecurring: true },
    { name: 'Tag der Arbeit', date: '05-01', isRecurring: true },
    { name: 'Tag der Deutschen Einheit', date: '10-03', isRecurring: true },
    { name: 'Weihnachten', date: '12-25', isRecurring: true },
    { name: 'Zweiter Weihnachtstag', date: '12-26', isRecurring: true },
  ],
  AU: [
    { name: "New Year's Day", date: '01-01', isRecurring: true },
    { name: 'Australia Day', date: '01-26', isRecurring: true },
    { name: 'Anzac Day', date: '04-25', isRecurring: true },
    { name: 'Christmas Day', date: '12-25', isRecurring: true },
    { name: 'Boxing Day', date: '12-26', isRecurring: true },
  ],
};

const COUNTRY_NAMES: Record<string, string> = {
  IT: 'Italy',
  US: 'United States',
  UK: 'United Kingdom',
  VN: 'Vietnam',
  ES: 'Spain',
  FR: 'France',
  DE: 'Germany',
  AU: 'Australia',
};

// ===========================================
// Component
// ===========================================

export function HolidaysEditor({
  holidays,
  onAdd,
  onRemove,
  onUpdate,
  disabled = false,
  countryCode = 'IT',
}: HolidaysEditorProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCode);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New holiday form state
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    date: '',
    isClosed: true,
    hours: { open: '09:00', close: '18:00' },
  });

  const handleAddHoliday = useCallback(() => {
    if (!newHoliday.name || !newHoliday.date) return;

    onAdd({
      name: newHoliday.name,
      date: newHoliday.date,
      isRecurring: true,
      isClosed: newHoliday.isClosed,
      hours: newHoliday.isClosed ? undefined : newHoliday.hours,
    });

    setNewHoliday({
      name: '',
      date: '',
      isClosed: true,
      hours: { open: '09:00', close: '18:00' },
    });
    setShowAddModal(false);
  }, [newHoliday, onAdd]);

  const handleImportPresets = useCallback(
    (presets: HolidayPreset[]) => {
      presets.forEach((preset) => {
        // Check if holiday already exists
        const exists = holidays.some((h) => h.date === preset.date && h.name === preset.name);
        if (!exists) {
          onAdd({
            name: preset.name,
            date: preset.date,
            isRecurring: true,
            isClosed: true,
          });
        }
      });
      setShowPresetsModal(false);
    },
    [holidays, onAdd]
  );

  const formatDate = (dateStr: string) => {
    const [month, day] = dateStr.split('-');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`;
  };

  // Sort holidays by date
  const sortedHolidays = [...holidays].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">National Holidays</h3>
          <p className="text-sm text-gray-500">
            Set closures or modified hours for public holidays
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPresetsModal(true)}
            disabled={disabled}
            className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Import Presets
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            disabled={disabled}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add Holiday
          </button>
        </div>
      </div>

      {/* Holidays List */}
      {sortedHolidays.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
          <div className="text-4xl">🎉</div>
          <h4 className="mt-2 font-medium text-gray-900">No holidays configured</h4>
          <p className="mt-1 text-sm text-gray-500">
            Import presets for your country or add holidays manually
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedHolidays.map((holiday) => (
            <div
              key={holiday.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <span className="text-sm font-bold">{formatDate(holiday.date)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{holiday.name}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    {holiday.isClosed ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        Closed
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        {holiday.hours?.open} - {holiday.hours?.close}
                      </span>
                    )}
                    {holiday.isRecurring && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        Yearly
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Toggle closed/open */}
                <button
                  onClick={() =>
                    onUpdate(holiday.id, {
                      isClosed: !holiday.isClosed,
                      hours: holiday.isClosed ? { open: '09:00', close: '18:00' } : undefined,
                    })
                  }
                  disabled={disabled}
                  className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  {holiday.isClosed ? 'Set Hours' : 'Set Closed'}
                </button>

                {/* Time inputs when not closed */}
                {!holiday.isClosed && editingId === holiday.id && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={holiday.hours?.open || '09:00'}
                      onChange={(e) =>
                        onUpdate(holiday.id, {
                          hours: { ...holiday.hours!, open: e.target.value },
                        })
                      }
                      disabled={disabled}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="time"
                      value={holiday.hours?.close || '18:00'}
                      onChange={(e) =>
                        onUpdate(holiday.id, {
                          hours: { ...holiday.hours!, close: e.target.value },
                        })
                      }
                      disabled={disabled}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>
                )}

                {!holiday.isClosed && editingId !== holiday.id && (
                  <button
                    onClick={() => setEditingId(holiday.id)}
                    disabled={disabled}
                    className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                  >
                    Edit Hours
                  </button>
                )}

                {/* Remove button */}
                <button
                  onClick={() => onRemove(holiday.id)}
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
            </div>
          ))}
        </div>
      )}

      {/* Add Holiday Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Add Holiday</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a national holiday or special closure day
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Holiday Name</label>
                <input
                  type="text"
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  placeholder="e.g., Christmas Day"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date (MM-DD)</label>
                <input
                  type="text"
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                  placeholder="e.g., 12-25"
                  pattern="\d{2}-\d{2}"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: MM-DD (e.g., 12-25 for December 25)
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newHoliday.isClosed}
                    onChange={(e) => setNewHoliday({ ...newHoliday, isClosed: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Closed all day</span>
                </label>
              </div>

              {!newHoliday.isClosed && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Open</label>
                    <input
                      type="time"
                      value={newHoliday.hours.open}
                      onChange={(e) =>
                        setNewHoliday({
                          ...newHoliday,
                          hours: { ...newHoliday.hours, open: e.target.value },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Close</label>
                    <input
                      type="time"
                      value={newHoliday.hours.close}
                      onChange={(e) =>
                        setNewHoliday({
                          ...newHoliday,
                          hours: { ...newHoliday.hours, close: e.target.value },
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
                onClick={handleAddHoliday}
                disabled={!newHoliday.name || !newHoliday.date}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Holiday
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Presets Modal */}
      {showPresetsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Import Holiday Presets</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a country to import its national holidays
            </p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {Object.entries(COUNTRY_NAMES).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {HOLIDAY_PRESETS[selectedCountry] && (
              <div className="mt-4 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  {HOLIDAY_PRESETS[selectedCountry].length} holidays will be imported:
                </h4>
                <div className="space-y-1">
                  {HOLIDAY_PRESETS[selectedCountry].map((preset, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm text-gray-600"
                    >
                      <span>{preset.name}</span>
                      <span className="text-gray-400">{formatDate(preset.date)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPresetsModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleImportPresets(HOLIDAY_PRESETS[selectedCountry] || [])}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Import {HOLIDAY_PRESETS[selectedCountry]?.length || 0} Holidays
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HolidaysEditor;
