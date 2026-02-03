'use client';

/**
 * V2 Events Client Component
 *
 * Pagina eventi con lista, filtri e dettagli modal.
 */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CalendarBlank,
  Clock,
  MapPin,
  Users,
  X,
  Ticket,
  MusicNotes,
  Coffee,
  ChalkboardTeacher,
} from '@phosphor-icons/react';
import { Header } from '@/components/v2/Header';
import { BottomNav } from '@/components/v2/BottomNav';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { cartStore } from '@/lib/cart-store';
import { formatDate } from '@gudbro/utils';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'music' | 'workshop' | 'special' | 'tasting';
  image?: string;
  capacity?: number;
  spotsLeft?: number;
  price?: number;
}

const EVENT_TYPE_CONFIG = {
  music: { icon: MusicNotes, color: '#8b5cf6', label: 'Live Music' },
  workshop: { icon: ChalkboardTeacher, color: '#22c55e', label: 'Workshop' },
  special: { icon: Coffee, color: '#f59e0b', label: 'Special Event' },
  tasting: { icon: Coffee, color: '#ec4899', label: 'Tasting' },
};

// Mock events data
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Acoustic Sunday',
    description:
      'Enjoy live acoustic music while sipping on your favorite drinks. Local artists perform every Sunday afternoon.',
    date: '2024-06-30',
    time: '3:00 PM - 6:00 PM',
    location: 'Main Hall',
    type: 'music',
    capacity: 50,
    spotsLeft: 12,
    price: 0,
  },
  {
    id: '2',
    title: 'Plant-Based Cooking Workshop',
    description:
      'Learn how to make delicious plant-based meals with our head chef. Includes all ingredients and recipes to take home.',
    date: '2024-07-05',
    time: '10:00 AM - 1:00 PM',
    location: 'Kitchen Studio',
    type: 'workshop',
    capacity: 15,
    spotsLeft: 4,
    price: 350000,
  },
  {
    id: '3',
    title: 'Coffee Tasting Session',
    description:
      'Explore the world of specialty coffee with our expert baristas. Taste different origins and brewing methods.',
    date: '2024-07-10',
    time: '2:00 PM - 4:00 PM',
    location: 'Roastery Corner',
    type: 'tasting',
    capacity: 20,
    spotsLeft: 8,
    price: 150000,
  },
  {
    id: '4',
    title: 'Grand Opening Anniversary',
    description:
      'Celebrate our 2nd anniversary with special menu items, giveaways, and live entertainment all day long!',
    date: '2024-07-15',
    time: 'All Day',
    location: 'Entire Venue',
    type: 'special',
    capacity: 100,
    spotsLeft: 45,
    price: 0,
  },
];

type FilterType = 'all' | 'music' | 'workshop' | 'special' | 'tasting';

export default function V2EventsClient() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    setIsClient(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);

    const updateCartCount = () => setCartCount(cartStore.count());
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const handleNavigate = (pageId: string) => {
    switch (pageId) {
      case 'home':
        router.push('/v2');
        break;
      case 'menu':
        router.push('/v2/menu');
        break;
      case 'cart':
        router.push('/v2/cart');
        break;
      case 'favorites':
        router.push('/v2/favorites');
        break;
      case 'orders':
        router.push('/v2/orders');
        break;
      case 'account':
        router.push('/v2/account');
        break;
    }
  };

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return MOCK_EVENTS;
    return MOCK_EVENTS.filter((event) => event.type === filter);
  }, [filter]);

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `${Math.round(price / 1000)}K VND`;
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div
      data-theme={isDark ? 'dark' : 'light'}
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      <Header
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        showSearch={false}
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
      />

      <main className="container-app safe-area-bottom pb-24 pt-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Events
          </h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
            Upcoming activities and happenings
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex gap-2 overflow-x-auto pb-2"
        >
          {(['all', 'music', 'workshop', 'special', 'tasting'] as FilterType[]).map(
            (filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className="shrink-0 rounded-full px-4 py-2 text-sm font-medium"
                style={{
                  background:
                    filter === filterType ? 'var(--interactive-primary)' : 'var(--bg-secondary)',
                  color: filter === filterType ? 'white' : 'var(--text-secondary)',
                }}
              >
                {filterType === 'all' ? 'All' : EVENT_TYPE_CONFIG[filterType].label}
              </button>
            )
          )}
        </motion.div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center">
            <CalendarBlank size={48} style={{ color: 'var(--text-tertiary)', margin: '0 auto' }} />
            <p className="mt-4" style={{ color: 'var(--text-tertiary)' }}>
              No events found
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredEvents.map((event, index) => {
              const typeConfig = EVENT_TYPE_CONFIG[event.type];
              const TypeIcon = typeConfig.icon;

              return (
                <motion.button
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full overflow-hidden rounded-xl text-left"
                  style={{ background: 'var(--bg-secondary)' }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex gap-4 p-4">
                    {/* Date Badge */}
                    <div
                      className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl"
                      style={{ background: typeConfig.color }}
                    >
                      <span className="text-xs font-medium uppercase text-white opacity-80">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-2xl font-bold text-white">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <TypeIcon size={16} style={{ color: typeConfig.color }} />
                        <span className="text-xs font-medium" style={{ color: typeConfig.color }}>
                          {typeConfig.label}
                        </span>
                      </div>

                      <h3
                        className="line-clamp-1 font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {event.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-3">
                        <span
                          className="flex items-center gap-1 text-sm"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          <Clock size={14} />
                          {event.time}
                        </span>
                        {event.spotsLeft !== undefined && (
                          <span
                            className="flex items-center gap-1 text-sm"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            <Users size={14} />
                            {event.spotsLeft} spots left
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div
                      className="shrink-0 font-medium"
                      style={{
                        color: event.price === 0 ? 'var(--status-success)' : 'var(--text-primary)',
                      }}
                    >
                      {formatPrice(event.price || 0)}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav cartCount={cartCount} activePage="home" onNavigate={handleNavigate} />

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setSelectedEvent(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl p-6"
              style={{ background: 'var(--bg-primary)' }}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute right-4 top-4 rounded-full p-2"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                <X size={20} />
              </button>

              {/* Event Type Badge */}
              <div className="mb-4 flex items-center gap-2">
                {(() => {
                  const typeConfig = EVENT_TYPE_CONFIG[selectedEvent.type];
                  const TypeIcon = typeConfig.icon;
                  return (
                    <span
                      className="flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium"
                      style={{ background: typeConfig.color, color: 'white' }}
                    >
                      <TypeIcon size={16} weight="fill" />
                      {typeConfig.label}
                    </span>
                  );
                })()}
              </div>

              <h2
                className="font-display text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {selectedEvent.title}
              </h2>

              {/* Details */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <CalendarBlank size={20} style={{ color: 'var(--text-tertiary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {formatDate(selectedEvent.date, { style: 'short' })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} style={{ color: 'var(--text-tertiary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} style={{ color: 'var(--text-tertiary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{selectedEvent.location}</span>
                </div>
                {selectedEvent.capacity && (
                  <div className="flex items-center gap-3">
                    <Users size={20} style={{ color: 'var(--text-tertiary)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {selectedEvent.spotsLeft} of {selectedEvent.capacity} spots available
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                  About this event
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{selectedEvent.description}</p>
              </div>

              {/* Price & Register */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    Price
                  </p>
                  <p
                    className="font-display text-xl font-bold"
                    style={{
                      color:
                        selectedEvent.price === 0 ? 'var(--status-success)' : 'var(--text-primary)',
                    }}
                  >
                    {formatPrice(selectedEvent.price || 0)}
                  </p>
                </div>

                <motion.button
                  className="flex items-center gap-2 rounded-xl px-6 py-3 font-medium"
                  style={{ background: 'var(--interactive-primary)', color: 'white' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Ticket size={20} weight="fill" />
                  Reserve Spot
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
