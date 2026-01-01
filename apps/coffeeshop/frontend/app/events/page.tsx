'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EventsList, EventDetailsModal } from '@/components/events';
import { Event } from '@/types/event';

// Mock events data - updated with new EventPromotion structure
const mockEvents: Event[] = [
  {
    id: '1',
    merchantId: 'caffe-rossi',
    title: 'Jazz Night con Marco Rossi Quartet',
    description: 'Una serata di jazz dal vivo con il famoso quartetto di Marco Rossi. Godetevi la musica migliore accompagnata dai nostri cocktail signature.',
    shortDescription: 'Live jazz con aperitivo incluso',
    eventType: 'live_music',
    status: 'published',
    startDate: '2025-01-03',
    endDate: '2025-01-03',
    startTime: '21:00',
    endTime: '00:00',
    recurrence: 'none',
    venueStatus: 'open',
    location: 'Sala Principale',
    maxCapacity: 80,
    currentAttendees: 45,
    requiresReservation: true,
    entranceFee: 15,
    entranceFeeCurrency: '€',
    loyaltyBonus: {
      enabled: true,
      pointsMultiplier: 2,
      bonusPoints: 50,
    },
    performer: {
      name: 'Marco Rossi Quartet',
      genre: 'Jazz',
      socialLinks: {
        instagram: 'marcorossijazz',
        spotify: 'https://spotify.com/artist/xxx',
      },
    },
    promotions: [
      {
        id: '1',
        name: 'Cocktail Signature -20%',
        mechanic: 'percent_off',
        value: 20,
        applicableTo: 'categories',
        badge: '-20%',
      },
    ],
    tags: ['jazz', 'live', 'musica'],
    createdAt: '2024-12-20T10:00:00Z',
    updatedAt: '2024-12-28T15:00:00Z',
  },
  {
    id: '2',
    merchantId: 'caffe-rossi',
    title: 'Happy Hour Esteso',
    description: 'Il nostro happy hour si allunga! Dalle 17 alle 21, tutti i cocktail e gli stuzzichini a prezzo ridotto.',
    shortDescription: '-30% su cocktail e stuzzichini',
    eventType: 'happy_hour',
    status: 'published',
    startDate: new Date().toISOString().split('T')[0], // Today
    endDate: new Date().toISOString().split('T')[0],
    startTime: '17:00',
    endTime: '21:00',
    recurrence: 'weekly',
    recurrenceDays: [4, 5], // Thu, Fri
    venueStatus: 'open',
    location: 'Bar',
    requiresReservation: false,
    loyaltyBonus: {
      enabled: true,
      bonusPoints: 25,
    },
    promotions: [
      {
        id: '2',
        name: 'Cocktail 2x1',
        mechanic: 'bogo',
        applicableTo: 'categories',
        badge: '2x1',
      },
      {
        id: '3',
        name: 'Combo Aperitivo',
        mechanic: 'bundle',
        value: 12,
        applicableTo: 'products',
        badge: '€12',
      },
    ],
    tags: ['aperitivo', 'cocktail', 'happy-hour'],
    createdAt: '2024-12-28T10:00:00Z',
    updatedAt: '2024-12-28T10:00:00Z',
  },
  {
    id: '3',
    merchantId: 'caffe-rossi',
    title: 'Degustazione Vini Toscani',
    description: 'Un percorso sensoriale attraverso i migliori vini della Toscana. 6 etichette selezionate accompagnate da formaggi e salumi locali.',
    shortDescription: '6 vini + tagliere abbinato',
    eventType: 'tasting',
    status: 'published',
    startDate: '2025-01-10',
    endDate: '2025-01-10',
    startTime: '19:00',
    endTime: '22:00',
    recurrence: 'none',
    venueStatus: 'reservation_only',
    location: 'Cantina',
    maxCapacity: 20,
    currentAttendees: 12,
    requiresReservation: true,
    entranceFee: 35,
    entranceFeeCurrency: '€',
    loyaltyBonus: {
      enabled: true,
      pointsMultiplier: 3,
    },
    tags: ['vino', 'toscana', 'degustazione'],
    createdAt: '2024-12-30T10:00:00Z',
    updatedAt: '2024-12-30T10:00:00Z',
  },
  {
    id: '4',
    merchantId: 'caffe-rossi',
    title: 'DJ Set - House Music Night',
    description: 'Ogni sabato sera, i migliori DJ della scena house. Ingresso libero fino alle 23.',
    shortDescription: 'House music fino a tarda notte',
    eventType: 'dj_set',
    status: 'published',
    startDate: '2025-01-04',
    endDate: '2025-01-05',
    startTime: '22:00',
    endTime: '03:00',
    recurrence: 'weekly',
    recurrenceDays: [6], // Saturday
    venueStatus: 'open',
    location: 'Main Floor',
    maxCapacity: 150,
    currentAttendees: 0,
    requiresReservation: false,
    entranceFee: 0,
    ageRestriction: 18,
    dressCode: 'Smart Casual',
    performer: {
      name: 'DJ Rotation',
      genre: 'House / Deep House',
    },
    loyaltyBonus: {
      enabled: true,
      pointsMultiplier: 2,
    },
    promotions: [
      {
        id: '4',
        name: 'Punti x2',
        mechanic: 'points_multiplier',
        value: 2,
        applicableTo: 'all',
        badge: '2x pts',
      },
    ],
    tags: ['dj', 'house', 'nightlife'],
    createdAt: '2024-12-25T10:00:00Z',
    updatedAt: '2024-12-28T10:00:00Z',
  },
  {
    id: '5',
    merchantId: 'caffe-rossi',
    title: 'Partita Serie A - Inter vs Juventus',
    description: 'Guarda il big match sui nostri maxischermi! Birra alla spina in offerta durante la partita.',
    shortDescription: 'Big match + birra in offerta',
    eventType: 'sports_viewing',
    status: 'published',
    startDate: '2025-01-05',
    endDate: '2025-01-05',
    startTime: '20:45',
    endTime: '23:00',
    recurrence: 'none',
    venueStatus: 'open',
    location: 'Sala TV',
    requiresReservation: false,
    sportsInfo: {
      sport: 'football',
      homeTeam: 'Inter',
      awayTeam: 'Juventus',
      competition: 'Serie A',
    },
    promotions: [
      {
        id: '5',
        name: 'Birra Speciale',
        mechanic: 'fixed_price',
        value: 4,
        applicableTo: 'products',
        badge: '€4',
      },
    ],
    tags: ['calcio', 'serie-a', 'sport'],
    createdAt: '2024-12-30T10:00:00Z',
    updatedAt: '2024-12-30T10:00:00Z',
  },
  {
    id: '6',
    merchantId: 'caffe-rossi',
    title: 'Brunch della Domenica',
    description: 'Ogni domenica dalle 11 alle 15, brunch all you can eat con prosecco illimitato!',
    shortDescription: 'All you can eat + prosecco illimitato',
    eventType: 'brunch',
    status: 'published',
    startDate: '2025-01-05',
    endDate: '2025-01-05',
    startTime: '11:00',
    endTime: '15:00',
    recurrence: 'weekly',
    recurrenceDays: [0], // Sunday
    venueStatus: 'open',
    location: 'Terrazza',
    maxCapacity: 40,
    currentAttendees: 28,
    requiresReservation: true,
    entranceFee: 35,
    entranceFeeCurrency: '€',
    promotions: [
      {
        id: '6',
        name: 'Prosecco Illimitato',
        mechanic: 'bottomless',
        value: 35,
        applicableTo: 'all',
        badge: '♾️',
      },
    ],
    tags: ['brunch', 'domenica', 'prosecco'],
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
  },
  {
    id: '7',
    merchantId: 'caffe-rossi',
    title: 'Festa Privata',
    description: 'Locale riservato per evento privato.',
    shortDescription: 'Locale chiuso al pubblico',
    eventType: 'private_party',
    status: 'published',
    startDate: '2025-01-08',
    endDate: '2025-01-08',
    startTime: '19:00',
    endTime: '02:00',
    recurrence: 'none',
    venueStatus: 'closed',
    maxCapacity: 60,
    requiresReservation: true,
    tags: ['privato'],
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleReserve = (event: Event) => {
    // In production, this would open reservation flow or external link
    if (event.reservationLink) {
      window.open(event.reservationLink, '_blank');
    } else {
      alert(`Prenotazione per: ${event.title}\nImplementazione in arrivo!`);
    }
  };

  const handleShare = async (event: Event) => {
    const shareData = {
      title: event.title,
      text: event.shortDescription || event.description,
      url: `${window.location.origin}/events/${event.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Share was cancelled by user
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url);
      alert('Link copiato!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Eventi</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Caffè Rossi</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6">
        <EventsList
          events={mockEvents}
          onEventClick={handleEventClick}
          onReserveClick={handleReserve}
          showFilters={true}
          variant="compact"
        />
      </main>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        onReserve={handleReserve}
        onShare={handleShare}
      />
    </div>
  );
}
