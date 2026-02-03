'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  Event,
  EventStatus,
  EventCreateInput,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  EVENT_TYPE_CONFIG,
  STATUS_CONFIG,
  VENUE_STATUS_CONFIG,
} from '@/lib/events-service';
import { PROMO_MECHANIC_CONFIG } from './components/types';
import { EventFormModal } from './components/EventFormModal';

export default function EventsPage() {
  const t = useTranslations('events');
  const { location } = useTenant();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | EventStatus>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Demo location ID for development
  const locationId = location?.id || 'demo-location-id';

  // Load events
  const loadEvents = useCallback(async () => {
    if (!locationId) return;

    setLoading(true);
    try {
      const data = await getEvents(locationId);
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Filter events
  const filteredEvents = filter === 'all' ? events : events.filter((e) => e.status === filter);

  // Sort by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(`${a.start_date}T${a.start_time}`);
    const dateB = new Date(`${b.start_date}T${b.start_time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Stats
  const stats = {
    total: events.length,
    published: events.filter((e) => e.status === 'published').length,
    draft: events.filter((e) => e.status === 'draft').length,
    upcoming: events.filter((e) => {
      const eventDate = new Date(`${e.start_date}T${e.start_time}`);
      return eventDate > new Date() && e.status === 'published';
    }).length,
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const handlePublish = async (eventId: string) => {
    const result = await publishEvent(eventId);
    if (result.success) {
      await loadEvents();
    }
  };

  const handleUnpublish = async (eventId: string) => {
    const result = await updateEvent(eventId, { status: 'draft' });
    if (result.success) {
      await loadEvents();
    }
  };

  const handleDelete = async (eventId: string) => {
    if (confirm(t('actions.confirmDelete'))) {
      const result = await deleteEvent(eventId);
      if (result.success) {
        await loadEvents();
      }
    }
  };

  const handleSaveEvent = async (eventData: EventCreateInput) => {
    if (selectedEvent) {
      // Update existing
      const result = await updateEvent(selectedEvent.id, eventData);
      if (result.success) {
        await loadEvents();
      }
    } else {
      // Create new
      const result = await createEvent(eventData);
      if (result.success) {
        await loadEvents();
      }
    }
    setShowCreateModal(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
          <p className="text-sm text-gray-500">{t('loading')}</p>
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
            <InfoTooltip contentKey="pages.events" kbPageId="events" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('description')}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('newEvent')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.total')}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.published')}</p>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.draft')}</p>
          <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.upcoming')}</p>
          <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: t('filters.all') },
          { id: 'published', label: t('filters.published') },
          { id: 'draft', label: t('filters.draft') },
          { id: 'completed', label: t('filters.completed') },
          { id: 'cancelled', label: t('filters.cancelled') },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {sortedEvents.length === 0 ? (
          <div className="p-12 text-center">
            <span className="mb-4 block text-5xl">📅</span>
            <h3 className="mb-2 text-lg font-medium text-gray-900">{t('empty.title')}</h3>
            <p className="mb-4 text-gray-500">{t('empty.description')}</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
            >
              {t('empty.action')}
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('table.event')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('table.type')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('table.date')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('table.status')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('table.reservations')}
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                  {t('table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedEvents.map((event) => {
                const typeConfig = EVENT_TYPE_CONFIG[event.event_type];
                const statusConfig = STATUS_CONFIG[event.status];
                const isPast =
                  new Date(`${event.end_date || event.start_date}T${event.end_time}`) < new Date();

                return (
                  <tr key={event.id} className={`hover:bg-gray-50 ${isPast ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-lg ${typeConfig.color} flex items-center justify-center text-lg`}
                        >
                          {typeConfig.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{event.title}</p>
                            {event.is_featured && (
                              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                                {t('table.featured')}
                              </span>
                            )}
                          </div>
                          {event.performer && (
                            <p className="text-sm text-gray-500">{event.performer.name}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${typeConfig.color}`}
                      >
                        {typeConfig.labelIt}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-900">{formatDate(event.start_date)}</p>
                      <p className="text-xs text-gray-500">
                        {event.start_time} - {event.end_time}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-1">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${statusConfig.color}`}
                        >
                          {statusConfig.labelIt}
                        </span>
                        {event.venue_status !== 'open' && (
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${VENUE_STATUS_CONFIG[event.venue_status].color} bg-gray-100`}
                          >
                            {VENUE_STATUS_CONFIG[event.venue_status].icon}
                          </span>
                        )}
                        {event.promotions && event.promotions.length > 0 && (
                          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                            {event.promotions[0].badge ||
                              PROMO_MECHANIC_CONFIG[event.promotions[0].mechanic].icon}
                          </span>
                        )}
                        {event.loyalty_bonus?.enabled && (
                          <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                            {event.loyalty_bonus.pointsMultiplier
                              ? `${event.loyalty_bonus.pointsMultiplier}x`
                              : `+${event.loyalty_bonus.bonusPoints}`}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {event.max_capacity ? (
                        <div>
                          <p className="text-sm text-gray-900">
                            {event.current_attendees} / {event.max_capacity}
                          </p>
                          <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200">
                            <div
                              className={`h-full rounded-full ${
                                event.current_attendees / event.max_capacity > 0.8
                                  ? 'bg-red-500'
                                  : event.current_attendees / event.max_capacity > 0.5
                                    ? 'bg-amber-500'
                                    : 'bg-green-500'
                              }`}
                              style={{
                                width: `${(event.current_attendees / event.max_capacity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          title="Modifica"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        {event.status === 'draft' ? (
                          <button
                            onClick={() => handlePublish(event.id)}
                            className="rounded-lg p-2 text-green-600 hover:bg-green-50 hover:text-green-700"
                            title="Pubblica"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        ) : event.status === 'published' ? (
                          <button
                            onClick={() => handleUnpublish(event.id)}
                            className="rounded-lg p-2 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                            title="Rimuovi pubblicazione"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          </button>
                        ) : null}
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                          title="Elimina"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Tips */}
      <div className="rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
        <h3 className="mb-3 font-bold text-gray-900">{t('tips.title')}</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <p className="font-medium text-gray-900">{t('tips.addImages')}</p>
              <p className="text-sm text-gray-600">{t('tips.addImagesDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-medium text-gray-900">{t('tips.loyaltyBonus')}</p>
              <p className="text-sm text-gray-600">{t('tips.loyaltyBonusDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="font-medium text-gray-900">{t('tips.notifications')}</p>
              <p className="text-sm text-gray-600">{t('tips.notificationsDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || selectedEvent) && (
        <EventFormModal
          event={selectedEvent}
          locationId={locationId}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}
