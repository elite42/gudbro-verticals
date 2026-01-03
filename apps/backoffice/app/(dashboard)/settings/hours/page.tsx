'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  OperatingHoursEditor,
  EMPTY_OPERATING_HOURS,
  type OperatingHours,
} from '@/components/schedule/OperatingHoursEditor';
import { TemporaryClosures, type TemporaryClosure } from '@/components/schedule/TemporaryClosures';
import {
  getLocationOperatingHours,
  updateLocationOperatingHours,
  getScheduleOverrides,
  createScheduleOverride,
  deleteScheduleOverride,
  DEFAULT_OPERATING_HOURS,
  type ScheduleOverride,
} from '@/lib/schedule-service';

// TODO: Get from auth context or URL param
const DEMO_LOCATION_ID = 'demo-location-id';

export default function HoursSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Operating hours state
  const [operatingHours, setOperatingHours] = useState<OperatingHours>(DEFAULT_OPERATING_HOURS);
  const [originalHours, setOriginalHours] = useState<OperatingHours>(DEFAULT_OPERATING_HOURS);

  // Temporary closures state
  const [closures, setClosures] = useState<TemporaryClosure[]>([]);
  const [pendingClosureAdds, setPendingClosureAdds] = useState<Omit<TemporaryClosure, 'id'>[]>([]);
  const [pendingClosureDeletes, setPendingClosureDeletes] = useState<string[]>([]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load operating hours
      const hours = await getLocationOperatingHours(DEMO_LOCATION_ID);
      if (hours) {
        setOperatingHours(hours);
        setOriginalHours(hours);
      }

      // Load schedule overrides (closures only for Free tier)
      const overrides = await getScheduleOverrides(DEMO_LOCATION_ID, { type: 'closure' });
      const mappedClosures: TemporaryClosure[] = overrides.map((o) => ({
        id: o.id,
        name: o.name,
        description: o.description || undefined,
        dateStart: o.date_start,
        dateEnd: o.date_end || undefined,
        isClosed: o.is_closed,
        hours: o.hours || undefined,
      }));
      setClosures(mappedClosures);
    } catch (err) {
      console.error('Failed to load data:', err);
      // Use default data if load fails (e.g., demo mode without real DB)
      setOperatingHours(DEFAULT_OPERATING_HOURS);
      setOriginalHours(DEFAULT_OPERATING_HOURS);
    } finally {
      setIsLoading(false);
    }
  };

  // Track changes
  const handleHoursChange = useCallback((hours: OperatingHours) => {
    setOperatingHours(hours);
    setHasChanges(true);
    setSuccessMessage(null);
  }, []);

  const handleAddClosure = useCallback((closure: Omit<TemporaryClosure, 'id'>) => {
    // Add to local state with temp ID
    const tempId = `temp-${Date.now()}`;
    const newClosure: TemporaryClosure = {
      ...closure,
      id: tempId,
    };
    setClosures((prev) => [...prev, newClosure]);
    setPendingClosureAdds((prev) => [...prev, closure]);
    setHasChanges(true);
    setSuccessMessage(null);
  }, []);

  const handleRemoveClosure = useCallback(
    (id: string) => {
      setClosures((prev) => prev.filter((c) => c.id !== id));
      // If it's a real ID (not temp), mark for deletion
      if (!id.startsWith('temp-')) {
        setPendingClosureDeletes((prev) => [...prev, id]);
      } else {
        // Remove from pending adds
        setPendingClosureAdds((prev) => {
          const closure = closures.find((c) => c.id === id);
          if (closure) {
            return prev.filter((p) => p.name !== closure.name || p.dateStart !== closure.dateStart);
          }
          return prev;
        });
      }
      setHasChanges(true);
      setSuccessMessage(null);
    },
    [closures]
  );

  const handleUpdateClosure = useCallback((id: string, updates: Partial<TemporaryClosure>) => {
    setClosures((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    setHasChanges(true);
    setSuccessMessage(null);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Save operating hours
      const hoursResult = await updateLocationOperatingHours(DEMO_LOCATION_ID, operatingHours);
      if (!hoursResult.success) {
        throw new Error(hoursResult.error || 'Failed to save operating hours');
      }

      // Delete removed closures
      for (const id of pendingClosureDeletes) {
        await deleteScheduleOverride(id);
      }

      // Add new closures
      for (const closure of pendingClosureAdds) {
        await createScheduleOverride({
          location_id: DEMO_LOCATION_ID,
          override_type: 'closure',
          name: closure.name,
          description: closure.description || null,
          date_start: closure.dateStart,
          date_end: closure.dateEnd || null,
          recurrence: 'none',
          is_closed: closure.isClosed,
          hours: closure.hours || null,
          priority: 100, // Closures have highest priority
          event_id: null,
          created_by: null, // TODO: Get from auth
        });
      }

      // Reset pending changes
      setPendingClosureAdds([]);
      setPendingClosureDeletes([]);
      setOriginalHours(operatingHours);
      setHasChanges(false);
      setSuccessMessage('Hours saved successfully!');

      // Reload to get real IDs for new closures
      await loadData();
    } catch (err) {
      console.error('Failed to save:', err);
      setError(err instanceof Error ? err.message : 'Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original state
    setOperatingHours(originalHours);
    setPendingClosureAdds([]);
    setPendingClosureDeletes([]);
    setHasChanges(false);
    loadData();
  };

  // Check current status
  const getCurrentStatus = () => {
    const now = new Date();
    const dayNames: (keyof OperatingHours)[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = dayNames[now.getDay()];
    const todayHours = operatingHours[today];

    // Check for active closure
    const todayStr = now.toISOString().split('T')[0];
    const activeClosure = closures.find((c) => {
      const start = c.dateStart;
      const end = c.dateEnd || c.dateStart;
      return todayStr >= start && todayStr <= end;
    });

    if (activeClosure) {
      if (activeClosure.isClosed) {
        return { isOpen: false, reason: activeClosure.name };
      }
      const hours = activeClosure.hours;
      if (hours) {
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        if (currentTime >= hours.open && currentTime <= hours.close) {
          return { isOpen: true, hours, note: `Modified: ${activeClosure.name}` };
        }
        return { isOpen: false, hours, note: `Modified: ${activeClosure.name}` };
      }
    }

    if (!todayHours) {
      return { isOpen: false, reason: 'Closed today' };
    }

    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    if (currentTime >= todayHours.open && currentTime <= todayHours.close) {
      return { isOpen: true, hours: todayHours };
    }

    return { isOpen: false, hours: todayHours };
  };

  const status = getCurrentStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/settings" className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Operating Hours</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Set when your location is open and manage temporary closures
          </p>
        </div>

        {/* Current status badge */}
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 ${
            status.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="font-medium">
            {status.isOpen ? 'Currently Open' : 'Currently Closed'}
          </span>
          {status.hours && (
            <span className="text-sm opacity-75">
              ({status.hours.open} - {status.hours.close})
            </span>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <svg
            className="h-5 w-5 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-red-800">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <svg
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-800">{successMessage}</span>
          <button
            onClick={() => setSuccessMessage(null)}
            className="ml-auto text-green-600 hover:text-green-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Unsaved changes warning */}
      {hasChanges && (
        <div className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <svg
            className="h-5 w-5 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-yellow-800">You have unsaved changes</span>
        </div>
      )}

      {/* Operating Hours Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900">Weekly Schedule</h2>
          <p className="text-sm text-gray-500">
            Set your regular opening hours for each day of the week
          </p>
        </div>

        <OperatingHoursEditor
          value={operatingHours}
          onChange={handleHoursChange}
          disabled={isSaving}
        />
      </div>

      {/* Temporary Closures Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <TemporaryClosures
          closures={closures}
          onAdd={handleAddClosure}
          onRemove={handleRemoveClosure}
          onUpdate={handleUpdateClosure}
          disabled={isSaving}
        />
      </div>

      {/* Preview Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-gray-900">Customer Preview</h2>
        <p className="mb-4 text-sm text-gray-500">
          This is how your hours will appear to customers
        </p>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="font-medium text-gray-900">
              {status.isOpen ? 'Open Now' : 'Closed'}
            </span>
            {status.note && <span className="text-sm text-gray-500">({status.note})</span>}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const).map((day) => {
              const hours = operatingHours[day];
              const dayLabels: Record<string, string> = {
                mon: 'Monday',
                tue: 'Tuesday',
                wed: 'Wednesday',
                thu: 'Thursday',
                fri: 'Friday',
                sat: 'Saturday',
                sun: 'Sunday',
              };

              return (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-600">{dayLabels[day]}</span>
                  <span className="text-gray-900">
                    {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleCancel}
          disabled={!hasChanges || isSaving}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
