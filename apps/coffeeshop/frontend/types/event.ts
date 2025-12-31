// Event types for PWA and Backoffice

export type EventType =
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

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface EventLoyaltyBonus {
  enabled: boolean;
  pointsMultiplier?: number; // e.g., 2 = double points during event
  bonusPoints?: number; // flat bonus for attendance
  exclusiveReward?: string; // special reward ID
}

export interface EventPromotion {
  type: 'discount' | 'bundle' | 'freebie';
  description: string;
  discountPercent?: number;
  bundleItems?: string[]; // product IDs
  freeItemId?: string;
  minPurchase?: number;
}

export interface Event {
  id: string;
  merchantId: string;

  // Basic info
  title: string;
  description: string;
  shortDescription?: string;
  image?: string;
  eventType: EventType;
  status: EventStatus;

  // Timing
  startDate: string; // ISO date
  endDate: string; // ISO date
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  timezone?: string;

  // Recurrence
  recurrence: RecurrenceType;
  recurrenceDays?: number[]; // 0-6 (Sun-Sat) for weekly
  recurrenceEndDate?: string;

  // Location
  location?: string; // 'main_room' | 'terrace' | 'private_room' | custom
  maxCapacity?: number;
  currentAttendees?: number;

  // Features
  requiresReservation: boolean;
  reservationLink?: string;
  entranceFee?: number;
  entranceFeeCurrency?: string;
  ageRestriction?: number;
  dressCode?: string;

  // Loyalty integration
  loyaltyBonus?: EventLoyaltyBonus;

  // Promotions during event
  promotions?: EventPromotion[];

  // Featured products during event
  featuredProducts?: string[]; // product IDs

  // Artist/performer info (for live music, dj, etc.)
  performer?: {
    name: string;
    genre?: string;
    image?: string;
    socialLinks?: {
      instagram?: string;
      spotify?: string;
      website?: string;
    };
  };

  // Push notification settings
  notifications?: {
    sendReminder: boolean;
    reminderHoursBefore?: number;
    sendToFollowers: boolean;
    sendToNearby: boolean;
    nearbyRadiusKm?: number;
  };

  // Metadata
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// For creating/editing events
export interface EventFormData {
  title: string;
  description: string;
  shortDescription?: string;
  image?: string;
  eventType: EventType;

  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;

  recurrence: RecurrenceType;
  recurrenceDays?: number[];
  recurrenceEndDate?: string;

  location?: string;
  maxCapacity?: number;

  requiresReservation: boolean;
  reservationLink?: string;
  entranceFee?: number;
  ageRestriction?: number;
  dressCode?: string;

  loyaltyBonus?: EventLoyaltyBonus;
  promotions?: EventPromotion[];
  featuredProducts?: string[];

  performer?: {
    name: string;
    genre?: string;
    image?: string;
    socialLinks?: {
      instagram?: string;
      spotify?: string;
      website?: string;
    };
  };

  notifications?: {
    sendReminder: boolean;
    reminderHoursBefore?: number;
    sendToFollowers: boolean;
    sendToNearby: boolean;
    nearbyRadiusKm?: number;
  };

  tags?: string[];
}

// Event type metadata for UI
export const EVENT_TYPE_CONFIG: Record<EventType, { label: string; icon: string; color: string }> = {
  live_music: { label: 'Live Music', icon: '🎵', color: 'from-purple-500 to-pink-500' },
  dj_set: { label: 'DJ Set', icon: '🎧', color: 'from-blue-500 to-purple-500' },
  tasting: { label: 'Tasting', icon: '🍷', color: 'from-red-500 to-orange-500' },
  happy_hour: { label: 'Happy Hour', icon: '🍹', color: 'from-yellow-500 to-orange-500' },
  theme_night: { label: 'Theme Night', icon: '🎭', color: 'from-indigo-500 to-purple-500' },
  workshop: { label: 'Workshop', icon: '👨‍🍳', color: 'from-green-500 to-teal-500' },
  special_menu: { label: 'Special Menu', icon: '⭐', color: 'from-amber-500 to-yellow-500' },
  private_party: { label: 'Private Party', icon: '🎉', color: 'from-pink-500 to-rose-500' },
  sports: { label: 'Sports Event', icon: '⚽', color: 'from-green-500 to-emerald-500' },
  other: { label: 'Event', icon: '📅', color: 'from-gray-500 to-gray-600' },
};
