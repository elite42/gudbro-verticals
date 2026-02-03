'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import CalendarView from '@/components/schedule/CalendarView';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  ScheduleOverride,
  OperatingHours,
  getScheduleOverrides,
  getMergedSchedule,
  generateICalExport,
  generateCalendarSubscribeUrl,
  generateGoogleCalendarUrl,
} from '@/lib/calendar-service';
import { Event, getEvents, EVENT_TYPE_CONFIG } from '@/lib/events-service';

// Default operating hours (will be replaced by actual data from location)
const DEFAULT_OPERATING_HOURS: OperatingHours = {
  mon: { open: '09:00', close: '22:00' },
  tue: { open: '09:00', close: '22:00' },
  wed: { open: '09:00', close: '22:00' },
  thu: { open: '09:00', close: '22:00' },
  fri: { open: '09:00', close: '23:00' },
  sat: { open: '10:00', close: '23:00' },
  sun: null,
};

// Event Detail Modal
interface EventDetailModalProps {
  event: Event;
  onClose: () => void;
  onEdit: () => void;
}

function EventDetailModal({ event, onClose, onEdit }: EventDetailModalProps) {
  const typeConfig = EVENT_TYPE_CONFIG[event.event_type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 w-full max-w-md overflow-hidden rounded-2xl bg-white">
        <div className={`p-4 ${typeConfig?.color || 'bg-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{typeConfig?.icon}</span>
              <span className="font-medium">{typeConfig?.labelIt}</span>
            </div>
            <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>

          <div className="mt-4 space-y-3">
            {/* Date & Time */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {new Date(event.start_date).toLocaleDateString('it-IT', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {event.start_time} - {event.end_time}
              </span>
            </div>

            {/* Description */}
            {event.description && <p className="text-sm text-gray-600">{event.description}</p>}

            {/* Performer */}
            {event.performer && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>
                  {event.performer.name}
                  {event.performer.genre && ` - ${event.performer.genre}`}
                </span>
              </div>
            )}

            {/* Capacity */}
            {event.max_capacity && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>
                  {event.current_attendees} / {event.max_capacity} partecipanti
                </span>
              </div>
            )}

            {/* Entrance fee */}
            {event.entrance_fee && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Ingresso: €{event.entrance_fee}</span>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-2">
            <button
              onClick={onEdit}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
            >
              Modifica
            </button>
            <a
              href={generateGoogleCalendarUrl({
                title: event.title,
                description: event.description || undefined,
                startDate: event.start_date,
                startTime: event.start_time,
                endDate: event.end_date || undefined,
                endTime: event.end_time,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              + Google Cal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Override Detail Modal
interface OverrideDetailModalProps {
  override: ScheduleOverride;
  onClose: () => void;
}

function OverrideDetailModal({ override, onClose }: OverrideDetailModalProps) {
  const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
    holiday: { label: 'Festività', icon: '🎄', color: 'bg-purple-100 text-purple-700' },
    seasonal: { label: 'Stagionale', icon: '🌞', color: 'bg-teal-100 text-teal-700' },
    closure: { label: 'Chiusura', icon: '🔒', color: 'bg-red-100 text-red-700' },
    special: { label: 'Speciale', icon: '⭐', color: 'bg-amber-100 text-amber-700' },
    event: { label: 'Evento', icon: '🎉', color: 'bg-blue-100 text-blue-700' },
  };

  const config = typeConfig[override.override_type] || typeConfig.special;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 w-full max-w-md overflow-hidden rounded-2xl bg-white">
        <div className={`p-4 ${config.color}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{config.icon}</span>
              <span className="font-medium">{config.label}</span>
            </div>
            <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900">{override.name}</h3>

          <div className="mt-4 space-y-3">
            {/* Date */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {new Date(override.date_start).toLocaleDateString('it-IT', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                {override.date_end && override.date_end !== override.date_start && (
                  <>
                    {' '}
                    -{' '}
                    {new Date(override.date_end).toLocaleDateString('it-IT', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </>
                )}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 text-sm">
              {override.is_closed ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 font-medium text-red-700">
                  🔒 Chiuso
                </span>
              ) : override.hours ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 font-medium text-green-700">
                  ✓ Aperto {override.hours.open} - {override.hours.close}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 font-medium text-gray-700">
                  Orario normale
                </span>
              )}
            </div>

            {/* Description */}
            {override.description && (
              <p className="text-sm text-gray-600">{override.description}</p>
            )}

            {/* Recurrence */}
            {override.recurrence !== 'none' && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>
                  Ricorrenza:{' '}
                  {override.recurrence === 'yearly'
                    ? 'Ogni anno'
                    : override.recurrence === 'weekly'
                      ? 'Ogni settimana'
                      : 'Ogni mese'}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export Modal
interface ExportModalProps {
  locationId: string;
  locationName: string;
  onClose: () => void;
}

function ExportModal({ locationId, locationName, onClose }: ExportModalProps) {
  const [exporting, setExporting] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  });

  const subscribeUrl = generateCalendarSubscribeUrl(locationId);

  const handleExport = async () => {
    setExporting(true);
    try {
      const icalContent = await generateICalExport({
        locationId,
        locationName,
        startDate,
        endDate,
        includeEvents: true,
        includeOverrides: true,
      });

      // Download file
      const blob = new Blob([icalContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${locationName.toLowerCase().replace(/\s+/g, '-')}-calendar.ics`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('URL copiato negli appunti!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 w-full max-w-lg overflow-hidden rounded-2xl bg-white">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Esporta Calendario</h2>
            <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6 p-4">
          {/* Subscribe URL */}
          <div className="rounded-xl bg-blue-50 p-4">
            <h3 className="font-medium text-blue-900">Iscriviti al calendario</h3>
            <p className="mt-1 text-sm text-blue-700">
              Usa questo URL per iscriverti in Google Calendar, Apple Calendar o Outlook
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                readOnly
                value={subscribeUrl}
                className="flex-1 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm"
              />
              <button
                onClick={() => copyToClipboard(subscribeUrl)}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              >
                Copia
              </button>
            </div>
          </div>

          {/* Manual Export */}
          <div>
            <h3 className="font-medium text-gray-900">Esporta file .ics</h3>
            <p className="mt-1 text-sm text-gray-600">
              Scarica un file calendario per il periodo selezionato
            </p>

            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Data inizio</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Data fine</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {exporting ? 'Esportazione in corso...' : 'Scarica file .ics'}
            </button>
          </div>

          {/* Instructions */}
          <div className="rounded-xl bg-gray-50 p-4">
            <h4 className="font-medium text-gray-900">Come aggiungere a Google Calendar</h4>
            <ol className="mt-2 space-y-1 text-sm text-gray-600">
              <li>1. Apri Google Calendar</li>
              <li>2. Clicca su &quot;+&quot; vicino a &quot;Altri calendari&quot;</li>
              <li>3. Seleziona &quot;Da URL&quot;</li>
              <li>4. Incolla l&apos;URL di iscrizione</li>
              <li>5. Clicca &quot;Aggiungi calendario&quot;</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page
export default function CalendarPage() {
  const t = useTranslations('calendarPage');
  const { location } = useTenant();
  const [events, setEvents] = useState<Event[]>([]);
  const [overrides, setOverrides] = useState<ScheduleOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedOverride, setSelectedOverride] = useState<ScheduleOverride | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const locationId = location?.id || 'demo-location-id';
  const locationName = location?.name || 'My Location';
  const operatingHours: OperatingHours = location?.operating_hours
    ? (location.operating_hours as unknown as OperatingHours)
    : DEFAULT_OPERATING_HOURS;

  // Load data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Get date range (current month +/- 1 month)
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        .toISOString()
        .split('T')[0];
      const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0)
        .toISOString()
        .split('T')[0];

      const [eventsData, overridesData] = await Promise.all([
        getEvents(locationId, { startDate, endDate }),
        getScheduleOverrides(locationId, { startDate, endDate }),
      ]);

      setEvents(eventsData);
      setOverrides(overridesData);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
          <p className="text-sm text-gray-500">Caricamento calendario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.calendar" kbPageId="settings-calendar" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {t('export')}
          </button>
          <a
            href="/marketing/events"
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {t('newEvent')}
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.eventsThisMonth')}</p>
          <p className="text-2xl font-bold text-gray-900">
            {events.filter((e) => e.status === 'published').length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.scheduledClosures')}</p>
          <p className="text-2xl font-bold text-red-600">
            {overrides.filter((o) => o.is_closed).length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.holidays')}</p>
          <p className="text-2xl font-bold text-purple-600">
            {overrides.filter((o) => o.override_type === 'holiday').length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.specialHours')}</p>
          <p className="text-2xl font-bold text-amber-600">
            {
              overrides.filter(
                (o) => o.override_type === 'special' || o.override_type === 'seasonal'
              ).length
            }
          </p>
        </div>
      </div>

      {/* Enterprise Badge */}
      <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3">
        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
          {t('enterprise.badge')}
        </span>
        <span className="text-sm text-gray-700">{t('enterprise.description')}</span>
      </div>

      {/* Calendar */}
      <CalendarView
        locationId={locationId}
        events={events}
        overrides={overrides}
        operatingHours={operatingHours}
        onDateClick={() => {}}
        onEventClick={(event) => setSelectedEvent(event)}
        onOverrideClick={(override) => setSelectedOverride(override)}
        onCreateEvent={(date) => {
          // Could navigate to create event with pre-filled date
          window.location.href = `/marketing/events?date=${date}`;
        }}
      />

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <a
          href="/settings/hours"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">{t('quickLinks.operatingHours')}</p>
            <p className="text-sm text-gray-500">{t('quickLinks.operatingHoursDescription')}</p>
          </div>
        </a>

        <a
          href="/marketing/events"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Gestione eventi</p>
            <p className="text-sm text-gray-500">Crea e modifica eventi</p>
          </div>
        </a>

        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left hover:bg-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Sincronizza</p>
            <p className="text-sm text-gray-500">Esporta in altri calendari</p>
          </div>
        </button>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={() => {
            window.location.href = `/marketing/events?edit=${selectedEvent.id}`;
          }}
        />
      )}

      {/* Override Detail Modal */}
      {selectedOverride && (
        <OverrideDetailModal
          override={selectedOverride}
          onClose={() => setSelectedOverride(null)}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          locationId={locationId}
          locationName={locationName}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
