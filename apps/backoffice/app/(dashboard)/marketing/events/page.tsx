'use client';

import { useState } from 'react';

// Types (would normally be imported from shared types)
type EventType =
  | 'live_music'
  | 'dj_set'
  | 'tasting'
  | 'happy_hour'
  | 'theme_night'
  | 'workshop'
  | 'special_menu'
  | 'private_party'
  | 'sports'
  | 'other';

type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

interface Event {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location?: string;
  maxCapacity?: number;
  currentAttendees: number;
  requiresReservation: boolean;
  entranceFee?: number;
  image?: string;
  loyaltyBonus?: {
    enabled: boolean;
    pointsMultiplier?: number;
    bonusPoints?: number;
  };
  performer?: {
    name: string;
    genre?: string;
  };
  createdAt: string;
}

const EVENT_TYPE_CONFIG: Record<EventType, { label: string; icon: string; color: string }> = {
  live_music: { label: 'Live Music', icon: '🎵', color: 'bg-purple-100 text-purple-700' },
  dj_set: { label: 'DJ Set', icon: '🎧', color: 'bg-blue-100 text-blue-700' },
  tasting: { label: 'Tasting', icon: '🍷', color: 'bg-red-100 text-red-700' },
  happy_hour: { label: 'Happy Hour', icon: '🍹', color: 'bg-yellow-100 text-yellow-700' },
  theme_night: { label: 'Theme Night', icon: '🎭', color: 'bg-indigo-100 text-indigo-700' },
  workshop: { label: 'Workshop', icon: '👨‍🍳', color: 'bg-green-100 text-green-700' },
  special_menu: { label: 'Special Menu', icon: '⭐', color: 'bg-amber-100 text-amber-700' },
  private_party: { label: 'Private Party', icon: '🎉', color: 'bg-pink-100 text-pink-700' },
  sports: { label: 'Sports Event', icon: '⚽', color: 'bg-emerald-100 text-emerald-700' },
  other: { label: 'Event', icon: '📅', color: 'bg-gray-100 text-gray-700' },
};

const STATUS_CONFIG: Record<EventStatus, { label: string; color: string }> = {
  draft: { label: 'Bozza', color: 'bg-gray-100 text-gray-700' },
  published: { label: 'Pubblicato', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annullato', color: 'bg-red-100 text-red-700' },
  completed: { label: 'Completato', color: 'bg-blue-100 text-blue-700' },
};

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Jazz Night con Marco Rossi Quartet',
    description: 'Una serata di jazz dal vivo con il famoso quartetto di Marco Rossi',
    eventType: 'live_music',
    status: 'published',
    startDate: '2025-01-03',
    endDate: '2025-01-03',
    startTime: '21:00',
    endTime: '00:00',
    location: 'Sala Principale',
    maxCapacity: 80,
    currentAttendees: 45,
    requiresReservation: true,
    entranceFee: 15,
    loyaltyBonus: { enabled: true, pointsMultiplier: 2 },
    performer: { name: 'Marco Rossi Quartet', genre: 'Jazz' },
    createdAt: '2024-12-20',
  },
  {
    id: '2',
    title: 'Happy Hour Esteso',
    description: 'Aperitivo prolungato con sconti su cocktail e stuzzichini',
    eventType: 'happy_hour',
    status: 'published',
    startDate: '2025-01-02',
    endDate: '2025-01-02',
    startTime: '17:00',
    endTime: '21:00',
    location: 'Bar',
    requiresReservation: false,
    currentAttendees: 0,
    loyaltyBonus: { enabled: true, bonusPoints: 50 },
    createdAt: '2024-12-28',
  },
  {
    id: '3',
    title: 'Degustazione Vini Toscani',
    description: 'Percorso di degustazione con 6 vini selezionati dalla Toscana',
    eventType: 'tasting',
    status: 'draft',
    startDate: '2025-01-10',
    endDate: '2025-01-10',
    startTime: '19:00',
    endTime: '22:00',
    location: 'Cantina',
    maxCapacity: 20,
    currentAttendees: 8,
    requiresReservation: true,
    entranceFee: 35,
    createdAt: '2024-12-30',
  },
  {
    id: '4',
    title: 'Capodanno 2024 - Tema Anni 80',
    description: 'Festeggia il nuovo anno con musica e atmosfera anni 80!',
    eventType: 'theme_night',
    status: 'completed',
    startDate: '2024-12-31',
    endDate: '2025-01-01',
    startTime: '21:00',
    endTime: '04:00',
    maxCapacity: 150,
    currentAttendees: 142,
    requiresReservation: true,
    entranceFee: 80,
    loyaltyBonus: { enabled: true, pointsMultiplier: 3, bonusPoints: 100 },
    createdAt: '2024-12-01',
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filter, setFilter] = useState<'all' | EventStatus>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Filter events
  const filteredEvents = filter === 'all'
    ? events
    : events.filter(e => e.status === filter);

  // Sort by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(`${a.startDate}T${a.startTime}`);
    const dateB = new Date(`${b.startDate}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Stats
  const stats = {
    total: events.length,
    published: events.filter(e => e.status === 'published').length,
    draft: events.filter(e => e.status === 'draft').length,
    upcoming: events.filter(e => {
      const eventDate = new Date(`${e.startDate}T${e.startTime}`);
      return eventDate > new Date() && e.status === 'published';
    }).length,
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const handlePublish = (eventId: string) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, status: 'published' as EventStatus } : e
    ));
  };

  const handleUnpublish = (eventId: string) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, status: 'draft' as EventStatus } : e
    ));
  };

  const handleDelete = (eventId: string) => {
    if (confirm('Sei sicuro di voler eliminare questo evento?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Eventi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Crea e gestisci eventi per il tuo locale
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuovo Evento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Totale Eventi</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Pubblicati</p>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">In Bozza</p>
          <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Prossimi</p>
          <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Tutti' },
          { id: 'published', label: 'Pubblicati' },
          { id: 'draft', label: 'Bozze' },
          { id: 'completed', label: 'Completati' },
          { id: 'cancelled', label: 'Annullati' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
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
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {sortedEvents.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-5xl mb-4 block">📅</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun evento trovato</h3>
            <p className="text-gray-500 mb-4">Crea il tuo primo evento per iniziare</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Crea Evento
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Evento</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prenotazioni</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedEvents.map((event) => {
                const typeConfig = EVENT_TYPE_CONFIG[event.eventType];
                const statusConfig = STATUS_CONFIG[event.status];
                const isPast = new Date(`${event.endDate}T${event.endTime}`) < new Date();

                return (
                  <tr key={event.id} className={`hover:bg-gray-50 ${isPast ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${typeConfig.color} flex items-center justify-center text-lg`}>
                          {typeConfig.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          {event.performer && (
                            <p className="text-sm text-gray-500">{event.performer.name}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-900">{formatDate(event.startDate)}</p>
                      <p className="text-xs text-gray-500">{event.startTime} - {event.endTime}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                      {event.loyaltyBonus?.enabled && (
                        <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {event.loyaltyBonus.pointsMultiplier}x pts
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {event.maxCapacity ? (
                        <div>
                          <p className="text-sm text-gray-900">
                            {event.currentAttendees} / {event.maxCapacity}
                          </p>
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                            <div
                              className={`h-full rounded-full ${
                                event.currentAttendees / event.maxCapacity > 0.8
                                  ? 'bg-red-500'
                                  : event.currentAttendees / event.maxCapacity > 0.5
                                  ? 'bg-amber-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${(event.currentAttendees / event.maxCapacity) * 100}%` }}
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
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                          title="Modifica"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        {event.status === 'draft' ? (
                          <button
                            onClick={() => handlePublish(event.id)}
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg"
                            title="Pubblica"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        ) : event.status === 'published' ? (
                          <button
                            onClick={() => handleUnpublish(event.id)}
                            className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg"
                            title="Rimuovi pubblicazione"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        ) : null}
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Elimina"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <h3 className="font-bold text-gray-900 mb-3">Suggerimenti per eventi di successo</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <p className="font-medium text-gray-900">Aggiungi immagini</p>
              <p className="text-sm text-gray-600">Gli eventi con foto ricevono 3x più interesse</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-medium text-gray-900">Attiva bonus fedeltà</p>
              <p className="text-sm text-gray-600">I punti extra aumentano la partecipazione del 40%</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="font-medium text-gray-900">Invia notifiche</p>
              <p className="text-sm text-gray-600">Ricorda l'evento ai tuoi follower 24h prima</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal placeholder */}
      {(showCreateModal || selectedEvent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedEvent ? 'Modifica Evento' : 'Nuovo Evento'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedEvent(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center py-12">
                Form di creazione evento in sviluppo...
                <br />
                <span className="text-sm">I campi includeranno: titolo, tipo, data/ora, location, capacità, prezzo, bonus fedeltà, performer, immagine, promozioni.</span>
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedEvent(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annulla
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                {selectedEvent ? 'Salva Modifiche' : 'Crea Evento'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
