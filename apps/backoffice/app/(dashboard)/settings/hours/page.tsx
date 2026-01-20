'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  OperatingHoursEditor,
  EMPTY_OPERATING_HOURS,
  type OperatingHours,
} from '@/components/schedule/OperatingHoursEditor';
import { TemporaryClosures, type TemporaryClosure } from '@/components/schedule/TemporaryClosures';
import { HolidaysEditor, type Holiday } from '@/components/schedule/HolidaysEditor';
import {
  SeasonalHoursEditor,
  type SeasonalSchedule,
} from '@/components/schedule/SeasonalHoursEditor';
import { SpecialHoursEditor, type SpecialHours } from '@/components/schedule/SpecialHoursEditor';
import {
  getLocationOperatingHours,
  updateLocationOperatingHours,
  getScheduleOverrides,
  createScheduleOverride,
  deleteScheduleOverride,
  DEFAULT_OPERATING_HOURS,
  type ScheduleOverride,
  type ScheduleOverrideType,
} from '@/lib/schedule-service';

// TODO: Get from auth context or URL param
const DEMO_LOCATION_ID = 'demo-location-id';

// TODO: Get from subscription context
const IS_PRO_TIER = true; // Enable Pro features for demo

export default function HoursSettingsPage() {
  const t = useTranslations('hoursPage');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'pro'>('basic');

  // Operating hours state
  const [operatingHours, setOperatingHours] = useState<OperatingHours>(DEFAULT_OPERATING_HOURS);
  const [originalHours, setOriginalHours] = useState<OperatingHours>(DEFAULT_OPERATING_HOURS);

  // Schedule overrides state (organized by type)
  const [closures, setClosures] = useState<TemporaryClosure[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [seasonalSchedules, setSeasonalSchedules] = useState<SeasonalSchedule[]>([]);
  const [specialHours, setSpecialHours] = useState<SpecialHours[]>([]);

  // Pending changes tracking
  const [pendingAdds, setPendingAdds] = useState<
    { type: ScheduleOverrideType; data: Record<string, unknown> }[]
  >([]);
  const [pendingDeletes, setPendingDeletes] = useState<string[]>([]);

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

      // Load all schedule overrides
      const overrides = await getScheduleOverrides(DEMO_LOCATION_ID);

      // Organize by type
      const closuresList: TemporaryClosure[] = [];
      const holidaysList: Holiday[] = [];
      const seasonalList: SeasonalSchedule[] = [];
      const specialList: SpecialHours[] = [];

      overrides.forEach((o) => {
        switch (o.override_type) {
          case 'closure':
            closuresList.push({
              id: o.id,
              name: o.name,
              description: o.description || undefined,
              dateStart: o.date_start,
              dateEnd: o.date_end || undefined,
              isClosed: o.is_closed,
              hours: o.hours || undefined,
            });
            break;
          case 'holiday':
            holidaysList.push({
              id: o.id,
              name: o.name,
              date: o.date_start.slice(5), // MM-DD from YYYY-MM-DD
              isRecurring: o.recurrence === 'yearly',
              isClosed: o.is_closed,
              hours: o.hours || undefined,
            });
            break;
          case 'seasonal':
            seasonalList.push({
              id: o.id,
              name: o.name,
              dateStart: o.date_start,
              dateEnd: o.date_end || o.date_start,
              isRecurring: o.recurrence === 'yearly',
              hours: (o.hours as unknown as OperatingHours) || EMPTY_OPERATING_HOURS,
            });
            break;
          case 'special':
            specialList.push({
              id: o.id,
              name: o.name,
              description: o.description || undefined,
              date: o.date_start,
              isClosed: o.is_closed,
              hours: o.hours || undefined,
            });
            break;
        }
      });

      setClosures(closuresList);
      setHolidays(holidaysList);
      setSeasonalSchedules(seasonalList);
      setSpecialHours(specialList);
    } catch (err) {
      console.error('Failed to load data:', err);
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

  // Generic add handler
  const handleAdd = useCallback(
    (
      type: ScheduleOverrideType,
      data: Record<string, unknown>,
      setList: React.Dispatch<React.SetStateAction<unknown[]>>
    ) => {
      const tempId = `temp-${Date.now()}`;
      const newItem = { ...data, id: tempId };
      setList((prev: unknown[]) => [...prev, newItem]);
      setPendingAdds((prev) => [...prev, { type, data }]);
      setHasChanges(true);
      setSuccessMessage(null);
    },
    []
  );

  // Generic remove handler
  const handleRemove = useCallback(
    (id: string, setList: React.Dispatch<React.SetStateAction<unknown[]>>) => {
      setList((prev: unknown[]) => prev.filter((item) => (item as { id?: string }).id !== id));
      if (!id.startsWith('temp-')) {
        setPendingDeletes((prev) => [...prev, id]);
      } else {
        setPendingAdds((prev) =>
          prev.filter((p) => {
            const tempData = p.data as { id?: string };
            return tempData.id !== id;
          })
        );
      }
      setHasChanges(true);
      setSuccessMessage(null);
    },
    []
  );

  // Closure handlers
  const handleAddClosure = useCallback(
    (closure: Omit<TemporaryClosure, 'id'>) => {
      handleAdd(
        'closure',
        closure as Record<string, unknown>,
        setClosures as React.Dispatch<React.SetStateAction<unknown[]>>
      );
    },
    [handleAdd]
  );

  const handleRemoveClosure = useCallback(
    (id: string) => {
      handleRemove(id, setClosures as React.Dispatch<React.SetStateAction<unknown[]>>);
    },
    [handleRemove]
  );

  const handleUpdateClosure = useCallback((id: string, updates: Partial<TemporaryClosure>) => {
    setClosures((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    setHasChanges(true);
    setSuccessMessage(null);
  }, []);

  // Holiday handlers
  const handleAddHoliday = useCallback(
    (holiday: Omit<Holiday, 'id'>) => {
      handleAdd(
        'holiday',
        holiday as Record<string, unknown>,
        setHolidays as React.Dispatch<React.SetStateAction<unknown[]>>
      );
    },
    [handleAdd]
  );

  const handleRemoveHoliday = useCallback(
    (id: string) => {
      handleRemove(id, setHolidays as React.Dispatch<React.SetStateAction<unknown[]>>);
    },
    [handleRemove]
  );

  const handleUpdateHoliday = useCallback((id: string, updates: Partial<Holiday>) => {
    setHolidays((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
    setHasChanges(true);
    setSuccessMessage(null);
  }, []);

  // Seasonal handlers
  const handleAddSeasonal = useCallback(
    (schedule: Omit<SeasonalSchedule, 'id'>) => {
      handleAdd(
        'seasonal',
        schedule as Record<string, unknown>,
        setSeasonalSchedules as React.Dispatch<React.SetStateAction<unknown[]>>
      );
    },
    [handleAdd]
  );

  const handleRemoveSeasonal = useCallback(
    (id: string) => {
      handleRemove(id, setSeasonalSchedules as React.Dispatch<React.SetStateAction<unknown[]>>);
    },
    [handleRemove]
  );

  const handleUpdateSeasonal = useCallback((id: string, updates: Partial<SeasonalSchedule>) => {
    setSeasonalSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setHasChanges(true);
    setSuccessMessage(null);
  }, []);

  // Special hours handlers
  const handleAddSpecial = useCallback(
    (special: Omit<SpecialHours, 'id'>) => {
      handleAdd(
        'special',
        special as Record<string, unknown>,
        setSpecialHours as React.Dispatch<React.SetStateAction<unknown[]>>
      );
    },
    [handleAdd]
  );

  const handleRemoveSpecial = useCallback(
    (id: string) => {
      handleRemove(id, setSpecialHours as React.Dispatch<React.SetStateAction<unknown[]>>);
    },
    [handleRemove]
  );

  const handleUpdateSpecial = useCallback((id: string, updates: Partial<SpecialHours>) => {
    setSpecialHours((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setHasChanges(true);
    setSuccessMessage(null);
  }, []);

  // Save all changes
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

      // Delete removed overrides
      for (const id of pendingDeletes) {
        await deleteScheduleOverride(id);
      }

      // Add new overrides
      for (const pending of pendingAdds) {
        const data = pending.data as Record<string, unknown>;
        const currentYear = new Date().getFullYear();

        const baseOverride = {
          location_id: DEMO_LOCATION_ID,
          override_type: pending.type,
          event_id: null,
          created_by: null,
        };

        switch (pending.type) {
          case 'closure':
            await createScheduleOverride({
              ...baseOverride,
              name: data.name as string,
              description: (data.description as string) || null,
              date_start: data.dateStart as string,
              date_end: (data.dateEnd as string) || null,
              recurrence: 'none',
              is_closed: data.isClosed as boolean,
              hours: (data.hours as { open: string; close: string }) || null,
              priority: 100,
            });
            break;

          case 'holiday':
            await createScheduleOverride({
              ...baseOverride,
              name: data.name as string,
              description: null,
              date_start: `${currentYear}-${data.date as string}`,
              date_end: null,
              recurrence: data.isRecurring ? 'yearly' : 'none',
              is_closed: data.isClosed as boolean,
              hours: (data.hours as { open: string; close: string }) || null,
              priority: 20,
            });
            break;

          case 'seasonal':
            await createScheduleOverride({
              ...baseOverride,
              name: data.name as string,
              description: null,
              date_start: data.dateStart as string,
              date_end: data.dateEnd as string,
              recurrence: data.isRecurring ? 'yearly' : 'none',
              is_closed: false,
              hours: data.hours as { open: string; close: string } | null,
              priority: 10,
            });
            break;

          case 'special':
            await createScheduleOverride({
              ...baseOverride,
              name: data.name as string,
              description: (data.description as string) || null,
              date_start: data.date as string,
              date_end: null,
              recurrence: 'none',
              is_closed: data.isClosed as boolean,
              hours: (data.hours as { open: string; close: string }) || null,
              priority: 30,
            });
            break;
        }
      }

      // Reset pending changes
      setPendingAdds([]);
      setPendingDeletes([]);
      setOriginalHours(operatingHours);
      setHasChanges(false);
      setSuccessMessage('All changes saved successfully!');

      // Reload to get real IDs
      await loadData();
    } catch (err) {
      console.error('Failed to save:', err);
      setError(err instanceof Error ? err.message : 'Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setOperatingHours(originalHours);
    setPendingAdds([]);
    setPendingDeletes([]);
    setHasChanges(false);
    loadData();
  };

  // Check current status
  const getCurrentStatus = () => {
    const now = new Date();
    const dayNames: (keyof OperatingHours)[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = dayNames[now.getDay()];
    const todayHours = operatingHours[today];
    const todayStr = now.toISOString().split('T')[0];

    // Check for active closure
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
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
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
            {status.isOpen ? t('status.open') : t('status.closed')}
          </span>
          {status.hours && (
            <span className="text-sm opacity-75">
              ({status.hours.open} - {status.hours.close})
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
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
          <span className="text-yellow-800">{t('unsavedChanges')}</span>
        </div>
      )}

      {/* Tab Navigation */}
      {IS_PRO_TIER && (
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('basic')}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'basic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {t('tabs.basic')}
            </button>
            <button
              onClick={() => setActiveTab('pro')}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'pro'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                {t('tabs.advanced')}
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  PRO
                </span>
              </span>
            </button>
          </nav>
        </div>
      )}

      {/* Basic Tab Content */}
      {activeTab === 'basic' && (
        <>
          {/* Operating Hours Section */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900">{t('weeklySchedule.title')}</h2>
              <p className="text-sm text-gray-500">{t('weeklySchedule.description')}</p>
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
            <h2 className="font-semibold text-gray-900">{t('preview.title')}</h2>
            <p className="mb-4 text-sm text-gray-500">{t('preview.description')}</p>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <span className="font-medium text-gray-900">
                  {status.isOpen ? t('preview.openNow') : t('status.closed')}
                </span>
                {status.note && <span className="text-sm text-gray-500">({status.note})</span>}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const).map((day) => {
                  const hours = operatingHours[day];
                  const dayKeys: Record<string, string> = {
                    mon: 'monday',
                    tue: 'tuesday',
                    wed: 'wednesday',
                    thu: 'thursday',
                    fri: 'friday',
                    sat: 'saturday',
                    sun: 'sunday',
                  };

                  return (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-600">{t(`days.${dayKeys[day]}`)}</span>
                      <span className="text-gray-900">
                        {hours ? `${hours.open} - ${hours.close}` : t('status.closed')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pro Tab Content */}
      {activeTab === 'pro' && IS_PRO_TIER && (
        <>
          {/* Holidays Section */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <HolidaysEditor
              holidays={holidays}
              onAdd={handleAddHoliday}
              onRemove={handleRemoveHoliday}
              onUpdate={handleUpdateHoliday}
              disabled={isSaving}
              countryCode="IT"
            />
          </div>

          {/* Seasonal Hours Section */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <SeasonalHoursEditor
              schedules={seasonalSchedules}
              onAdd={handleAddSeasonal}
              onRemove={handleRemoveSeasonal}
              onUpdate={handleUpdateSeasonal}
              disabled={isSaving}
            />
          </div>

          {/* Special Hours Section */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <SpecialHoursEditor
              specials={specialHours}
              onAdd={handleAddSpecial}
              onRemove={handleRemoveSpecial}
              onUpdate={handleUpdateSpecial}
              disabled={isSaving}
            />
          </div>
        </>
      )}

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleCancel}
          disabled={!hasChanges || isSaving}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('cancel')}
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? t('saving') : t('saveChanges')}
        </button>
      </div>
    </div>
  );
}
