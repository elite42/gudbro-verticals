import { supabase } from './supabase';

// ===========================================
// Types
// ===========================================

export type EventType =
  // Entertainment
  | 'live_music'
  | 'dj_set'
  | 'karaoke'
  | 'trivia_night'
  | 'game_night'
  | 'comedy_night'
  | 'open_mic'
  | 'theme_night'
  // Food & Beverage
  | 'tasting'
  | 'pairing'
  | 'chefs_table'
  | 'cooking_class'
  | 'menu_launch'
  | 'food_tour'
  // Time-based Promos
  | 'happy_hour'
  | 'brunch'
  | 'lunch_special'
  | 'late_night'
  // Sports
  | 'sports_viewing'
  // Community
  | 'networking'
  | 'charity'
  | 'book_club'
  | 'wine_club'
  | 'singles_night'
  // Private & Corporate
  | 'private_party'
  | 'corporate'
  | 'birthday'
  | 'anniversary'
  // Special
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

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly';

export type PromoMechanic =
  | 'percent_off'
  | 'fixed_discount'
  | 'fixed_price'
  | 'bogo'
  | 'bogoho'
  | 'buy_x_get_y'
  | 'bundle'
  | 'free_item'
  | 'bottomless'
  | 'points_multiplier'
  | 'points_bonus'
  | 'free_upgrade'
  | 'kids_free'
  | 'group_discount'
  | 'early_bird'
  | 'last_minute'
  | 'none';

export interface EventPromotion {
  id: string;
  name: string;
  description?: string;
  mechanic: PromoMechanic;
  value?: number;
  secondaryValue?: number;
  applicableTo: 'all' | 'categories' | 'products' | 'tags';
  categoryIds?: string[];
  productIds?: string[];
  productTags?: string[];
  badge?: string;
  badgeColor?: string;
}

export interface LoyaltyBonus {
  enabled: boolean;
  pointsMultiplier?: number;
  bonusPoints?: number;
}

export interface Performer {
  name: string;
  genre?: string;
  image?: string;
}

export interface SportsInfo {
  sport:
    | 'football'
    | 'basketball'
    | 'tennis'
    | 'f1'
    | 'motogp'
    | 'boxing'
    | 'ufc'
    | 'rugby'
    | 'other';
  homeTeam?: string;
  awayTeam?: string;
  competition?: string;
}

export interface HoursOverride {
  open: string;
  close: string;
}

export interface MenuImpact {
  useSpecialMenu?: boolean;
  specialMenuId?: string;
  disabledCategories?: string[];
  enabledCategories?: string[];
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
  timezone: string;
  recurrence: RecurrenceType;
  recurrence_days: number[] | null;
  recurrence_end_date: string | null;
  venue_status: VenueStatus;
  affected_areas: string[] | null;
  reduced_capacity: number | null;
  hours_override: HoursOverride | null;
  auto_create_schedule_override: boolean;
  schedule_override_id: string | null;
  menu_impact: MenuImpact;
  requires_reservation: boolean;
  entrance_fee: number | null;
  max_capacity: number | null;
  current_attendees: number;
  ticket_url: string | null;
  loyalty_bonus: LoyaltyBonus;
  performer: Performer | null;
  sports_info: SportsInfo | null;
  promotions: EventPromotion[];
  image_url: string | null;
  color: string | null;
  tags: string[] | null;
  is_featured: boolean;
  is_public: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type EventCreateInput = Omit<
  Event,
  'id' | 'created_at' | 'updated_at' | 'schedule_override_id'
>;

export type EventUpdateInput = Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>;

// ===========================================
// CRUD Operations
// ===========================================

/**
 * Get all events for a location
 */
export async function getEvents(
  locationId: string,
  options?: {
    status?: EventStatus;
    category?: EventCategory;
    startDate?: string;
    endDate?: string;
    publicOnly?: boolean;
    limit?: number;
  }
): Promise<Event[]> {
  let query = supabase
    .from('events')
    .select('*')
    .eq('location_id', locationId)
    .order('start_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.category) {
    query = query.eq('event_category', options.category);
  }

  if (options?.startDate) {
    query = query.gte('start_date', options.startDate);
  }

  if (options?.endDate) {
    query = query.lte('start_date', options.endDate);
  }

  if (options?.publicOnly) {
    query = query.eq('is_public', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
}

/**
 * Get a single event by ID
 */
export async function getEvent(eventId: string): Promise<Event | null> {
  const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data;
}

/**
 * Create a new event
 */
export async function createEvent(
  event: EventCreateInput
): Promise<{ success: boolean; data?: Event; error?: string }> {
  const { data, error } = await supabase.from('events').insert(event).select().single();

  if (error) {
    console.error('Error creating event:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Update an existing event
 */
export async function updateEvent(
  eventId: string,
  updates: EventUpdateInput
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('events').update(updates).eq('id', eventId);

  if (error) {
    console.error('Error updating event:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete an event
 */
export async function deleteEvent(eventId: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('events').delete().eq('id', eventId);

  if (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Publish an event (change status to 'published')
 */
export async function publishEvent(eventId: string): Promise<{ success: boolean; error?: string }> {
  return updateEvent(eventId, { status: 'published' });
}

/**
 * Cancel an event
 */
export async function cancelEvent(eventId: string): Promise<{ success: boolean; error?: string }> {
  return updateEvent(eventId, { status: 'cancelled' });
}

/**
 * Mark event as completed
 */
export async function completeEvent(
  eventId: string
): Promise<{ success: boolean; error?: string }> {
  return updateEvent(eventId, { status: 'completed' });
}

/**
 * Duplicate an event
 */
export async function duplicateEvent(
  eventId: string,
  newStartDate?: string
): Promise<{ success: boolean; data?: Event; error?: string }> {
  const original = await getEvent(eventId);
  if (!original) {
    return { success: false, error: 'Event not found' };
  }

  // Create a copy without id and timestamps
  const { id, created_at, updated_at, schedule_override_id, ...eventData } = original;

  const newEvent: EventCreateInput = {
    ...eventData,
    title: `${original.title} (Copy)`,
    status: 'draft',
    start_date: newStartDate || original.start_date,
    current_attendees: 0,
  };

  return createEvent(newEvent);
}

// ===========================================
// Query Functions (using DB functions)
// ===========================================

/**
 * Get events for a date range using DB function
 */
export async function getEventsForRange(
  locationId: string,
  startDate: string,
  endDate: string,
  options?: {
    status?: EventStatus;
    publicOnly?: boolean;
  }
): Promise<Event[]> {
  const { data, error } = await supabase.rpc('get_events_for_range', {
    p_location_id: locationId,
    p_start_date: startDate,
    p_end_date: endDate,
    p_status: options?.status || null,
    p_public_only: options?.publicOnly ?? true,
  });

  if (error) {
    console.error('Error fetching events for range:', error);
    // Fallback to regular query
    return getEvents(locationId, {
      startDate,
      endDate,
      status: options?.status,
      publicOnly: options?.publicOnly,
    });
  }

  return data || [];
}

/**
 * Get today's events using DB function
 */
export async function getTodaysEvents(locationId: string): Promise<Event[]> {
  const { data, error } = await supabase.rpc('get_todays_events', {
    p_location_id: locationId,
  });

  if (error) {
    console.error("Error fetching today's events:", error);
    // Fallback to regular query
    const today = new Date().toISOString().split('T')[0];
    return getEvents(locationId, {
      startDate: today,
      endDate: today,
      status: 'published',
      publicOnly: true,
    });
  }

  return data || [];
}

/**
 * Get upcoming events using DB function
 */
export async function getUpcomingEvents(locationId: string, limit: number = 10): Promise<Event[]> {
  const { data, error } = await supabase.rpc('get_upcoming_events', {
    p_location_id: locationId,
    p_limit: limit,
  });

  if (error) {
    console.error('Error fetching upcoming events:', error);
    // Fallback to regular query
    const today = new Date().toISOString().split('T')[0];
    return getEvents(locationId, {
      startDate: today,
      status: 'published',
      publicOnly: true,
      limit,
    });
  }

  return data || [];
}

// ===========================================
// Helper Functions
// ===========================================

/**
 * Get event category from event type
 */
export function getEventCategory(eventType: EventType): EventCategory {
  const categoryMap: Record<EventType, EventCategory> = {
    // Entertainment
    live_music: 'entertainment',
    dj_set: 'entertainment',
    karaoke: 'entertainment',
    trivia_night: 'entertainment',
    game_night: 'entertainment',
    comedy_night: 'entertainment',
    open_mic: 'entertainment',
    theme_night: 'entertainment',
    // Food & Beverage
    tasting: 'food',
    pairing: 'food',
    chefs_table: 'food',
    cooking_class: 'food',
    menu_launch: 'food',
    food_tour: 'food',
    // Time-based Promos
    happy_hour: 'promo',
    brunch: 'promo',
    lunch_special: 'promo',
    late_night: 'promo',
    // Sports
    sports_viewing: 'sports',
    // Community
    networking: 'community',
    charity: 'community',
    book_club: 'community',
    wine_club: 'community',
    singles_night: 'community',
    // Private & Corporate
    private_party: 'private',
    corporate: 'private',
    birthday: 'private',
    anniversary: 'private',
    // Special
    holiday: 'special',
    special_menu: 'special',
    closure: 'special',
    other: 'special',
  };

  return categoryMap[eventType];
}

/**
 * Get default values for a new event
 */
export function getDefaultEvent(
  locationId: string
): Omit<EventCreateInput, 'title' | 'event_type' | 'event_category'> {
  const today = new Date().toISOString().split('T')[0];

  return {
    location_id: locationId,
    description: null,
    status: 'draft',
    start_date: today,
    end_date: null,
    start_time: '18:00',
    end_time: '22:00',
    timezone: 'Asia/Ho_Chi_Minh',
    recurrence: 'none',
    recurrence_days: null,
    recurrence_end_date: null,
    venue_status: 'open',
    affected_areas: null,
    reduced_capacity: null,
    hours_override: null,
    auto_create_schedule_override: true,
    menu_impact: {},
    requires_reservation: false,
    entrance_fee: null,
    max_capacity: null,
    current_attendees: 0,
    ticket_url: null,
    loyalty_bonus: { enabled: false },
    performer: null,
    sports_info: null,
    promotions: [],
    image_url: null,
    color: null,
    tags: null,
    is_featured: false,
    is_public: true,
    created_by: null,
  };
}

// ===========================================
// Event Type Configuration
// ===========================================

export const EVENT_TYPE_CONFIG: Record<
  EventType,
  {
    label: string;
    labelIt: string;
    descriptionIt: string;
    icon: string;
    color: string;
    category: EventCategory;
  }
> = {
  // Entertainment
  live_music: {
    label: 'Live Music',
    labelIt: 'Musica Live',
    descriptionIt: 'Band o artista dal vivo',
    icon: '🎵',
    color: 'bg-purple-100 text-purple-700',
    category: 'entertainment',
  },
  dj_set: {
    label: 'DJ Set',
    labelIt: 'DJ Set',
    descriptionIt: 'DJ con musica mixata',
    icon: '🎧',
    color: 'bg-blue-100 text-blue-700',
    category: 'entertainment',
  },
  karaoke: {
    label: 'Karaoke',
    labelIt: 'Karaoke',
    descriptionIt: 'Clienti cantano al microfono',
    icon: '🎤',
    color: 'bg-pink-100 text-pink-700',
    category: 'entertainment',
  },
  trivia_night: {
    label: 'Trivia Night',
    labelIt: 'Quiz Night',
    descriptionIt: 'Domande e risposte a squadre',
    icon: '🧠',
    color: 'bg-indigo-100 text-indigo-700',
    category: 'entertainment',
  },
  game_night: {
    label: 'Game Night',
    labelIt: 'Serata Giochi',
    descriptionIt: 'Giochi da tavolo o carte',
    icon: '🎲',
    color: 'bg-green-100 text-green-700',
    category: 'entertainment',
  },
  comedy_night: {
    label: 'Comedy Night',
    labelIt: 'Stand-up Comedy',
    descriptionIt: 'Spettacolo comico dal vivo',
    icon: '😂',
    color: 'bg-yellow-100 text-yellow-700',
    category: 'entertainment',
  },
  open_mic: {
    label: 'Open Mic',
    labelIt: 'Open Mic',
    descriptionIt: 'Palco aperto a tutti',
    icon: '🎙️',
    color: 'bg-gray-100 text-gray-700',
    category: 'entertainment',
  },
  theme_night: {
    label: 'Theme Night',
    labelIt: 'Serata a Tema',
    descriptionIt: "Es: anni '80, Halloween",
    icon: '🎭',
    color: 'bg-indigo-100 text-indigo-700',
    category: 'entertainment',
  },
  // Food & Beverage
  tasting: {
    label: 'Tasting',
    labelIt: 'Degustazione',
    descriptionIt: 'Assaggio di vini, birre, etc',
    icon: '🍷',
    color: 'bg-red-100 text-red-700',
    category: 'food',
  },
  pairing: {
    label: 'Pairing Event',
    labelIt: 'Abbinamento',
    descriptionIt: 'Cibo abbinato a vino/birra',
    icon: '🧀',
    color: 'bg-amber-100 text-amber-700',
    category: 'food',
  },
  chefs_table: {
    label: "Chef's Table",
    labelIt: 'Tavola dello Chef',
    descriptionIt: 'Esperienza esclusiva con chef',
    icon: '👨‍🍳',
    color: 'bg-gray-700 text-white',
    category: 'food',
  },
  cooking_class: {
    label: 'Cooking Class',
    labelIt: 'Corso di Cucina',
    descriptionIt: 'Clienti imparano a cucinare',
    icon: '📚',
    color: 'bg-green-100 text-green-700',
    category: 'food',
  },
  menu_launch: {
    label: 'Menu Launch',
    labelIt: 'Lancio Menu',
    descriptionIt: 'Presentazione nuovi piatti',
    icon: '✨',
    color: 'bg-yellow-100 text-yellow-700',
    category: 'food',
  },
  food_tour: {
    label: 'Food Tour',
    labelIt: 'Tour Gastronomico',
    descriptionIt: 'Percorso guidato tra piatti',
    icon: '🗺️',
    color: 'bg-teal-100 text-teal-700',
    category: 'food',
  },
  // Time-based Promos
  happy_hour: {
    label: 'Happy Hour',
    labelIt: 'Happy Hour',
    descriptionIt: 'Sconti su drink in orario specifico',
    icon: '🍹',
    color: 'bg-orange-100 text-orange-700',
    category: 'promo',
  },
  brunch: {
    label: 'Brunch',
    labelIt: 'Brunch',
    descriptionIt: 'Colazione/pranzo nel weekend',
    icon: '🥐',
    color: 'bg-pink-100 text-pink-700',
    category: 'promo',
  },
  lunch_special: {
    label: 'Lunch Special',
    labelIt: 'Menu Pranzo',
    descriptionIt: 'Menu speciale a pranzo',
    icon: '🍽️',
    color: 'bg-blue-100 text-blue-700',
    category: 'promo',
  },
  late_night: {
    label: 'Late Night',
    labelIt: 'After Hours',
    descriptionIt: 'Offerte dopo mezzanotte',
    icon: '🌙',
    color: 'bg-indigo-200 text-indigo-800',
    category: 'promo',
  },
  // Sports
  sports_viewing: {
    label: 'Sports Event',
    labelIt: 'Evento Sportivo',
    descriptionIt: 'Partita su schermo',
    icon: '⚽',
    color: 'bg-emerald-100 text-emerald-700',
    category: 'sports',
  },
  // Community
  networking: {
    label: 'Networking',
    labelIt: 'Networking',
    descriptionIt: 'Incontri professionali',
    icon: '🤝',
    color: 'bg-blue-100 text-blue-700',
    category: 'community',
  },
  charity: {
    label: 'Charity Event',
    labelIt: 'Evento Benefico',
    descriptionIt: 'Raccolta fondi per causa',
    icon: '💝',
    color: 'bg-pink-100 text-pink-700',
    category: 'community',
  },
  book_club: {
    label: 'Book Club',
    labelIt: 'Club del Libro',
    descriptionIt: 'Discussione libri insieme',
    icon: '📖',
    color: 'bg-amber-100 text-amber-700',
    category: 'community',
  },
  wine_club: {
    label: 'Wine Club',
    labelIt: 'Club del Vino',
    descriptionIt: 'Appassionati di vino',
    icon: '🍇',
    color: 'bg-purple-100 text-purple-700',
    category: 'community',
  },
  singles_night: {
    label: 'Singles Night',
    labelIt: 'Serata Single',
    descriptionIt: 'Incontri per single',
    icon: '💕',
    color: 'bg-red-100 text-red-700',
    category: 'community',
  },
  // Private & Corporate
  private_party: {
    label: 'Private Party',
    labelIt: 'Festa Privata',
    descriptionIt: 'Evento su prenotazione',
    icon: '🎉',
    color: 'bg-pink-100 text-pink-700',
    category: 'private',
  },
  corporate: {
    label: 'Corporate Event',
    labelIt: 'Evento Aziendale',
    descriptionIt: 'Cene/meeting aziendali',
    icon: '💼',
    color: 'bg-gray-100 text-gray-700',
    category: 'private',
  },
  birthday: {
    label: 'Birthday',
    labelIt: 'Compleanno',
    descriptionIt: 'Festa di compleanno',
    icon: '🎂',
    color: 'bg-pink-100 text-pink-700',
    category: 'private',
  },
  anniversary: {
    label: 'Anniversary',
    labelIt: 'Anniversario',
    descriptionIt: 'Celebrazione di coppia',
    icon: '💍',
    color: 'bg-amber-100 text-amber-700',
    category: 'private',
  },
  // Special
  holiday: {
    label: 'Holiday',
    labelIt: 'Festività',
    descriptionIt: 'Natale, Capodanno, etc',
    icon: '🎄',
    color: 'bg-red-100 text-red-700',
    category: 'special',
  },
  special_menu: {
    label: 'Special Menu',
    labelIt: 'Menu Speciale',
    descriptionIt: 'Menu temporaneo speciale',
    icon: '⭐',
    color: 'bg-amber-100 text-amber-700',
    category: 'special',
  },
  closure: {
    label: 'Closure',
    labelIt: 'Chiusura',
    descriptionIt: 'Locale chiuso',
    icon: '🔒',
    color: 'bg-gray-200 text-gray-700',
    category: 'special',
  },
  other: {
    label: 'Other',
    labelIt: 'Altro',
    descriptionIt: 'Evento personalizzato',
    icon: '📅',
    color: 'bg-gray-100 text-gray-700',
    category: 'special',
  },
};

export const STATUS_CONFIG: Record<EventStatus, { label: string; labelIt: string; color: string }> =
  {
    draft: { label: 'Draft', labelIt: 'Bozza', color: 'bg-gray-100 text-gray-700' },
    published: { label: 'Published', labelIt: 'Pubblicato', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Cancelled', labelIt: 'Annullato', color: 'bg-red-100 text-red-700' },
    completed: { label: 'Completed', labelIt: 'Completato', color: 'bg-blue-100 text-blue-700' },
  };

export const VENUE_STATUS_CONFIG: Record<
  VenueStatus,
  { label: string; labelIt: string; icon: string; color: string }
> = {
  open: {
    label: 'Open normally',
    labelIt: 'Aperto normalmente',
    icon: '✅',
    color: 'text-green-600',
  },
  partial: {
    label: 'Partially available',
    labelIt: 'Parzialmente disponibile',
    icon: '⚠️',
    color: 'text-yellow-600',
  },
  reservation_only: {
    label: 'Reservation only',
    labelIt: 'Solo prenotazioni',
    icon: '📝',
    color: 'text-blue-600',
  },
  members_only: {
    label: 'Members only',
    labelIt: 'Solo membri',
    icon: '🔐',
    color: 'text-purple-600',
  },
  closed: {
    label: 'Closed to public',
    labelIt: 'Chiuso al pubblico',
    icon: '🚫',
    color: 'text-red-600',
  },
};

export const CATEGORY_CONFIG: Record<
  EventCategory,
  { label: string; labelIt: string; icon: string; color: string }
> = {
  entertainment: {
    label: 'Entertainment',
    labelIt: 'Intrattenimento',
    icon: '🎭',
    color: 'bg-purple-100 text-purple-700',
  },
  food: {
    label: 'Food & Beverage',
    labelIt: 'Cibo & Bevande',
    icon: '🍽️',
    color: 'bg-amber-100 text-amber-700',
  },
  promo: {
    label: 'Promotions',
    labelIt: 'Promozioni',
    icon: '🎁',
    color: 'bg-orange-100 text-orange-700',
  },
  sports: { label: 'Sports', labelIt: 'Sport', icon: '⚽', color: 'bg-green-100 text-green-700' },
  community: {
    label: 'Community',
    labelIt: 'Community',
    icon: '🤝',
    color: 'bg-blue-100 text-blue-700',
  },
  private: { label: 'Private', labelIt: 'Privati', icon: '🔒', color: 'bg-gray-100 text-gray-700' },
  special: {
    label: 'Special',
    labelIt: 'Speciali',
    icon: '✨',
    color: 'bg-yellow-100 text-yellow-700',
  },
};
