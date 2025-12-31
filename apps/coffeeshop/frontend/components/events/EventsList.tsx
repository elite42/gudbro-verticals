'use client';

import { useState, useMemo } from 'react';
import { Event, EventType, EVENT_TYPE_CONFIG } from '@/types/event';
import { EventCard } from './EventCard';

interface EventsListProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onReserveClick?: (event: Event) => void;
  showFilters?: boolean;
  maxItems?: number;
  variant?: 'full' | 'compact' | 'mini';
  title?: string;
}

type FilterType = 'all' | 'today' | 'this_week' | 'upcoming';

export function EventsList({
  events,
  onEventClick,
  onReserveClick,
  showFilters = true,
  maxItems,
  variant = 'compact',
  title = 'Eventi',
}: EventsListProps) {
  const [timeFilter, setTimeFilter] = useState<FilterType>('all');
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all');

  // Filter events
  const filteredEvents = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    let filtered = events.filter((event) => {
      // Only show published events
      if (event.status !== 'published') return false;

      // Only show future or ongoing events
      const eventEnd = new Date(`${event.endDate}T${event.endTime}`);
      if (eventEnd < now) return false;

      return true;
    });

    // Apply time filter
    if (timeFilter !== 'all') {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);

        switch (timeFilter) {
          case 'today':
            return eventDate.toDateString() === today.toDateString();
          case 'this_week':
            return eventDate >= today && eventDate < weekEnd;
          case 'upcoming':
            return eventDate >= weekEnd;
          default:
            return true;
        }
      });
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((event) => event.eventType === typeFilter);
    }

    // Sort by date (soonest first)
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.startDate}T${a.startTime}`);
      const dateB = new Date(`${b.startDate}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });

    // Limit if maxItems specified
    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [events, timeFilter, typeFilter, maxItems]);

  // Get happening now events
  const happeningNow = useMemo(() => {
    const now = new Date();
    return events.filter((event) => {
      const start = new Date(`${event.startDate}T${event.startTime}`);
      const end = new Date(`${event.endDate}T${event.endTime}`);
      return now >= start && now <= end && event.status === 'published';
    });
  }, [events]);

  // Available event types for filter
  const availableTypes = useMemo(() => {
    const types = new Set(events.map((e) => e.eventType));
    return Array.from(types);
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">📅</span>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nessun evento in programma</h3>
        <p className="text-gray-500 dark:text-gray-400">Torna a trovarci presto!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {happeningNow.length > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full animate-pulse">
            {happeningNow.length} LIVE
          </span>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-3">
          {/* Time filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {[
              { id: 'all', label: 'Tutti' },
              { id: 'today', label: 'Oggi' },
              { id: 'this_week', label: 'Questa settimana' },
              { id: 'upcoming', label: 'Prossimi' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTimeFilter(filter.id as FilterType)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  timeFilter === filter.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Type filter */}
          {availableTypes.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Tutti i tipi
              </button>
              {availableTypes.map((type) => {
                const config = EVENT_TYPE_CONFIG[type];
                return (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                      typeFilter === type
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{config.icon}</span>
                    <span>{config.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Happening Now Section */}
      {happeningNow.length > 0 && timeFilter === 'all' && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h3 className="font-bold text-gray-900 dark:text-white">In corso ora</h3>
          </div>
          <div className="space-y-3">
            {happeningNow.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant={variant}
                onDetailsClick={onEventClick}
                onReserveClick={onReserveClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Events List */}
      {filteredEvents.length > 0 ? (
        <div className={`space-y-${variant === 'mini' ? '2' : '4'}`}>
          {filteredEvents
            .filter((e) => !happeningNow.some((h) => h.id === e.id) || timeFilter !== 'all')
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant={variant}
                onDetailsClick={onEventClick}
                onReserveClick={onReserveClick}
              />
            ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <span className="text-4xl mb-3 block">🔍</span>
          <p className="text-gray-500 dark:text-gray-400">Nessun evento trovato con questi filtri</p>
          <button
            onClick={() => {
              setTimeFilter('all');
              setTypeFilter('all');
            }}
            className="mt-2 text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline"
          >
            Resetta filtri
          </button>
        </div>
      )}
    </div>
  );
}
