/**
 * Events Service for PWA
 *
 * Fetches events from Supabase for customer-facing display.
 * Read-only operations for the PWA.
 */

import { supabase, isSupabaseConfigured } from './supabase';

// ===========================================
// Types
// ===========================================

export type EventType =
  | 'live_music'
  | 'dj_set'
  | 'karaoke'
  | 'trivia_night'
  | 'game_night'
  | 'comedy_night'
  | 'open_mic'
  | 'theme_night'
  | 'tasting'
  | 'pairing'
  | 'chefs_table'
  | 'cooking_class'
  | 'menu_launch'
  | 'food_tour'
  | 'happy_hour'
  | 'brunch'
  | 'lunch_special'
  | 'late_night'
  | 'sports_viewing'
  | 'networking'
  | 'charity'
  | 'book_club'
  | 'wine_club'
  | 'singles_night'
  | 'private_party'
  | 'corporate'
  | 'birthday'
  | 'anniversary'
  | 'holiday'
  | 'special_menu'
  | 'closure'
  | 'other';

export type EventCategory =
  | 'entertainment'
  | 'food'
  | 'promo'
  | 'sports'
  | 'community'
  | 'private'
  | 'special';

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export type VenueStatus = 'open' | 'partial' | 'reservation_only' | 'members_only' | 'closed';

export interface EventPromotion {
  id: string;
  name: string;
  description?: string;
  mechanic: string;
  value?: number;
  badge?: string;
  badgeColor?: string;
}

export interface Event {
  id: string;
  location_id: string;
  title: string;
  description: string | null;
  event_type: EventType;
  event_category: EventCategory;
  status: EventStatus;
  start_date: string;
  end_date: string | null;
  start_time: string;
  end_time: string;
  venue_status: VenueStatus;
  requires_reservation: boolean;
  entrance_fee: number | null;
  max_capacity: number | null;
  current_attendees: number;
  image_url: string | null;
  tags: string[] | null;
  is_featured: boolean;
  promotions: EventPromotion[];
  performer?: { name: string; genre?: string };
  sports_info?: { sport: string; homeTeam?: string; awayTeam?: string; competition?: string };
}

// ===========================================
// Mock Data (fallback when Supabase not configured)
// ===========================================

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    location_id: 'demo',
    title: 'Live Jazz Night',
    description: 'Join us for an evening of smooth jazz with local artists.',
    event_type: 'live_music',
    event_category: 'entertainment',
    status: 'published',
    start_date: new Date().toISOString().split('T')[0],
    end_date: null,
    start_time: '19:00',
    end_time: '22:00',
    venue_status: 'open',
    requires_reservation: false,
    entrance_fee: null,
    max_capacity: 50,
    current_attendees: 0,
    image_url: null,
    tags: ['jazz', 'music', 'live'],
    is_featured: true,
    promotions: [],
    performer: { name: 'Local Jazz Trio', genre: 'Jazz' },
  },
  {
    id: '2',
    location_id: 'demo',
    title: 'Happy Hour',
    description: '50% off selected drinks every weekday!',
    event_type: 'happy_hour',
    event_category: 'promo',
    status: 'published',
    start_date: new Date().toISOString().split('T')[0],
    end_date: null,
    start_time: '16:00',
    end_time: '19:00',
    venue_status: 'open',
    requires_reservation: false,
    entrance_fee: null,
    max_capacity: null,
    current_attendees: 0,
    image_url: null,
    tags: ['drinks', 'promo', 'happy-hour'],
    is_featured: false,
    promotions: [
      {
        id: 'p1',
        name: '50% off drinks',
        mechanic: 'percent_off',
        value: 50,
        badge: 'Happy Hour',
        badgeColor: 'orange',
      },
    ],
  },
];

// ===========================================
// API Functions
// ===========================================

/**
 * Get today's events for a location
 */
export async function getTodaysEvents(locationId?: string): Promise<Event[]> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_EVENTS.filter((e) => e.start_date === new Date().toISOString().split('T')[0]);
  }

  try {
    const { data, error } = await supabase.rpc('get_todays_events', {
      p_location_id: locationId || 'demo-location-id',
    });

    if (error) {
      console.error("Error fetching today's events:", error);
      return MOCK_EVENTS;
    }

    return data || [];
  } catch (err) {
    console.error('Failed to fetch events:', err);
    return MOCK_EVENTS;
  }
}

/**
 * Get upcoming events for a location
 */
export async function getUpcomingEvents(locationId?: string, limit: number = 10): Promise<Event[]> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_EVENTS;
  }

  try {
    const { data, error } = await supabase.rpc('get_upcoming_events', {
      p_location_id: locationId || 'demo-location-id',
      p_limit: limit,
    });

    if (error) {
      console.error('Error fetching upcoming events:', error);
      // Fallback to regular query
      const today = new Date().toISOString().split('T')[0];
      const { data: fallbackData } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .eq('is_public', true)
        .gte('start_date', today)
        .order('start_date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(limit);

      return fallbackData || MOCK_EVENTS;
    }

    return data || [];
  } catch (err) {
    console.error('Failed to fetch events:', err);
    return MOCK_EVENTS;
  }
}

/**
 * Get a single event by ID
 */
export async function getEvent(eventId: string): Promise<Event | null> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_EVENTS.find((e) => e.id === eventId) || null;
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .eq('is_public', true)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      return MOCK_EVENTS.find((e) => e.id === eventId) || null;
    }

    return data;
  } catch (err) {
    console.error('Failed to fetch event:', err);
    return null;
  }
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(locationId?: string): Promise<Event[]> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_EVENTS.filter((e) => e.is_featured);
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_featured', true)
      .eq('is_public', true)
      .eq('status', 'published')
      .gte('start_date', today)
      .order('start_date', { ascending: true })
      .limit(5);

    if (error) {
      console.error('Error fetching featured events:', error);
      return MOCK_EVENTS.filter((e) => e.is_featured);
    }

    return data || [];
  } catch (err) {
    console.error('Failed to fetch featured events:', err);
    return MOCK_EVENTS.filter((e) => e.is_featured);
  }
}

// ===========================================
// Helper Functions
// ===========================================

/**
 * Format event time for display
 */
export function formatEventTime(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}

/**
 * Format event date for display
 */
export function formatEventDate(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  if (endDate && endDate !== startDate) {
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  }

  return start.toLocaleDateString('en-US', options);
}

/**
 * Check if event is happening now
 */
export function isEventHappeningNow(event: Event): boolean {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  // Check if today is within event date range
  const isToday = event.start_date <= today && (event.end_date === null || event.end_date >= today);

  if (!isToday) return false;

  // Check if current time is within event time
  return currentTime >= event.start_time && currentTime <= event.end_time;
}

/**
 * Get event type configuration
 */
export const EVENT_TYPE_CONFIG: Record<EventType, { label: string; icon: string; color: string }> =
  {
    live_music: { label: 'Live Music', icon: '🎵', color: 'bg-purple-100 text-purple-700' },
    dj_set: { label: 'DJ Set', icon: '🎧', color: 'bg-blue-100 text-blue-700' },
    karaoke: { label: 'Karaoke', icon: '🎤', color: 'bg-pink-100 text-pink-700' },
    trivia_night: { label: 'Trivia Night', icon: '🧠', color: 'bg-indigo-100 text-indigo-700' },
    game_night: { label: 'Game Night', icon: '🎲', color: 'bg-green-100 text-green-700' },
    comedy_night: { label: 'Comedy Night', icon: '😂', color: 'bg-yellow-100 text-yellow-700' },
    open_mic: { label: 'Open Mic', icon: '🎙️', color: 'bg-gray-100 text-gray-700' },
    theme_night: { label: 'Theme Night', icon: '🎭', color: 'bg-indigo-100 text-indigo-700' },
    tasting: { label: 'Tasting', icon: '🍷', color: 'bg-red-100 text-red-700' },
    pairing: { label: 'Pairing', icon: '🧀', color: 'bg-amber-100 text-amber-700' },
    chefs_table: { label: "Chef's Table", icon: '👨‍🍳', color: 'bg-gray-700 text-white' },
    cooking_class: { label: 'Cooking Class', icon: '📚', color: 'bg-green-100 text-green-700' },
    menu_launch: { label: 'Menu Launch', icon: '✨', color: 'bg-yellow-100 text-yellow-700' },
    food_tour: { label: 'Food Tour', icon: '🗺️', color: 'bg-teal-100 text-teal-700' },
    happy_hour: { label: 'Happy Hour', icon: '🍹', color: 'bg-orange-100 text-orange-700' },
    brunch: { label: 'Brunch', icon: '🥐', color: 'bg-pink-100 text-pink-700' },
    lunch_special: { label: 'Lunch Special', icon: '🍽️', color: 'bg-blue-100 text-blue-700' },
    late_night: { label: 'Late Night', icon: '🌙', color: 'bg-indigo-200 text-indigo-800' },
    sports_viewing: { label: 'Sports Event', icon: '⚽', color: 'bg-emerald-100 text-emerald-700' },
    networking: { label: 'Networking', icon: '🤝', color: 'bg-blue-100 text-blue-700' },
    charity: { label: 'Charity Event', icon: '💝', color: 'bg-pink-100 text-pink-700' },
    book_club: { label: 'Book Club', icon: '📖', color: 'bg-amber-100 text-amber-700' },
    wine_club: { label: 'Wine Club', icon: '🍇', color: 'bg-purple-100 text-purple-700' },
    singles_night: { label: 'Singles Night', icon: '💕', color: 'bg-red-100 text-red-700' },
    private_party: { label: 'Private Party', icon: '🎉', color: 'bg-pink-100 text-pink-700' },
    corporate: { label: 'Corporate Event', icon: '💼', color: 'bg-gray-100 text-gray-700' },
    birthday: { label: 'Birthday', icon: '🎂', color: 'bg-pink-100 text-pink-700' },
    anniversary: { label: 'Anniversary', icon: '💍', color: 'bg-amber-100 text-amber-700' },
    holiday: { label: 'Holiday', icon: '🎄', color: 'bg-red-100 text-red-700' },
    special_menu: { label: 'Special Menu', icon: '⭐', color: 'bg-amber-100 text-amber-700' },
    closure: { label: 'Closure', icon: '🔒', color: 'bg-gray-200 text-gray-700' },
    other: { label: 'Other', icon: '📅', color: 'bg-gray-100 text-gray-700' },
  };
