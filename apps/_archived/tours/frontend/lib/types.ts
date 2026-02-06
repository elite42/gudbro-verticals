/* ═══════════════════════════════════════════════════════════════════════════
   GUDBRO TOURS - TYPE DEFINITIONS

   Core types matching the database schema and API responses.
   Extends shared payment types.
   ═══════════════════════════════════════════════════════════════════════════ */

// Import shared payment types for local use
import type {
  PaymentMethod,
  PaymentStatus as SharedPaymentStatus,
  PaymentIntent,
  PaymentResult,
  CurrencyConfig,
} from '@shared/payment/types';

// Re-export for consumers
export type { PaymentMethod, SharedPaymentStatus, PaymentIntent, PaymentResult, CurrencyConfig };

/**
 * Tour categories
 */
export type TourCategory = 'day_tour' | 'transport' | 'experience' | 'multi_day';

/**
 * Pricing model
 */
export type PricePer = 'person' | 'vehicle' | 'group';

/**
 * Booking status
 */
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

/**
 * Booking payment status (tour-specific)
 */
export type BookingPaymentStatus = 'unpaid' | 'deposit' | 'paid';

/**
 * Tour operator profile
 */
export interface TourOperator {
  id: string;
  phone: string;
  name: string;
  business_name?: string;
  area?: string;
  whatsapp?: string;
  zalo?: string;
  telegram?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Tour listing
 */
export interface Tour {
  id: string;
  operator_id: string;
  name: string;
  slug: string;
  description: string;
  category: TourCategory;

  // Pricing
  price_vnd: number;
  price_usd: number;
  price_per: PricePer;
  min_people: number;
  max_people: number;

  // Details
  duration: string;
  distance?: string;
  included: string[];
  excluded: string[];

  // Logistics
  pickup_locations?: string[];
  departure_times?: string[];

  // Media
  images: string[];
  route_map_url?: string;

  // Stats
  rating: number;
  review_count: number;
  booking_count: number;

  // Status
  active: boolean;
  featured: boolean;

  created_at: string;
  updated_at: string;

  // Relations (optional, populated by API)
  operator?: TourOperator;
  translations?: TourTranslation[];
}

/**
 * Tour translation
 */
export interface TourTranslation {
  id: string;
  tour_id: string;
  language: string;
  name?: string;
  description?: string;
  included?: string[];
  excluded?: string[];
}

/**
 * Booking record
 */
export interface TourBooking {
  id: string;
  tour_id: string;
  operator_id: string;

  // Customer info
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_country?: string;
  customer_language?: string;

  // Booking details
  booking_date: string;
  booking_time: string;
  number_of_people: number;
  pickup_location: string;
  special_requests?: string;

  // Pricing
  total_price_vnd: number;
  total_price_usd: number;

  // Status
  status: BookingStatus;
  payment_status: BookingPaymentStatus;
  payment_method?: PaymentMethod;

  // Communication
  confirmed_via?: string;
  confirmation_sent_at?: string;

  created_at: string;
  updated_at: string;

  // Relations (optional)
  tour?: Tour;
  operator?: TourOperator;
}

/**
 * Tour review
 */
export interface TourReview {
  id: string;
  tour_id: string;
  booking_id?: string;
  rating: number;
  comment?: string;
  customer_name?: string;
  customer_country?: string;
  verified: boolean;
  created_at: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

/**
 * Tour filter options
 */
export interface TourFilters {
  category?: TourCategory;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  search?: string;
  operator_id?: string;
}

/**
 * Booking form data
 */
export interface BookingFormData {
  tour_id: string;
  booking_date: string;
  booking_time: string;
  number_of_people: number;
  pickup_location: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_country?: string;
  customer_language?: string;
  special_requests?: string;
  payment_method?: PaymentMethod;
}

/**
 * Currency configuration
 */
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
}

/**
 * Language configuration
 */
export interface Language {
  code: string;
  name: string;
  flag: string;
}
