/**
 * Types for Accommodations Property Page & Booking Flow
 *
 * Used by: /property/[slug] page, /api/property/[slug], /api/booking
 * All prices are INTEGER minor currency units (e.g., 50000 = $500.00 or 500,000 VND)
 */

// --- Generic API wrapper (self-contained, mirrors stay.ts pattern) ---

export type PropertyApiError =
  | 'property_not_found'
  | 'property_disabled'
  | 'room_not_found'
  | 'room_unavailable'
  | 'dates_unavailable'
  | 'invalid_dates'
  | 'min_nights_not_met'
  | 'max_nights_exceeded'
  | 'max_guests_exceeded'
  | 'validation_error'
  | 'internal_error';

export interface ApiResponse<T> {
  data?: T;
  error?: PropertyApiError | string;
}

// --- Property Page Data ---

export interface PropertyPageData {
  id: string;
  name: string;
  slug: string;
  type: string; // 'hotel' | 'apartment' | 'villa' | 'homestay' | 'hostel'
  description: string | null;
  address: string | null;
  city: string | null;
  country_code: string;
  latitude: number | null;
  longitude: number | null;
  images: string[];
  amenities: string[];
  house_rules: Record<string, unknown>; // JSONB from DB
  contact_phone: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  check_in_time: string;
  check_out_time: string;
  host_name: string | null;
  host_photo: string | null;
  host_languages: string[];
  booking_mode: 'instant' | 'inquiry' | 'disabled';
  accepted_payment_methods: string[];
  min_nights: number;
  max_nights: number | null;
  cleaning_fee: number; // INTEGER minor units
  weekly_discount_percent: number;
  monthly_discount_percent: number;
  has_linked_fnb: boolean;
  linked_fnb_slug: string | null;
  rooms: PropertyRoom[];
}

export interface PropertyRoom {
  id: string;
  room_number: string;
  room_type: string;
  capacity: number;
  description: string | null;
  base_price_per_night: number; // INTEGER minor units
  currency: string;
  images: string[]; // JSONB array
  beds: RoomBed[]; // JSONB array
  is_active: boolean;
}

export interface RoomBed {
  type: string; // 'single' | 'double' | 'queen' | 'king' | 'bunk'
  count: number;
}

// --- Availability ---

export interface BookedRange {
  from: string; // YYYY-MM-DD (check_in_date)
  to: string; // YYYY-MM-DD (check_out_date, exclusive in half-open [) convention)
}

export interface AvailabilityResponse {
  bookedRanges: BookedRange[];
}

// --- Price Breakdown ---

export interface PriceBreakdown {
  pricePerNight: number; // INTEGER minor units
  nights: number;
  subtotal: number; // pricePerNight * nights
  cleaningFee: number;
  discountAmount: number;
  discountLabel: string | null; // e.g., "10% weekly discount"
  totalPrice: number;
  currency: string;
}

// --- Booking ---

export interface BookingSubmission {
  propertySlug: string;
  roomId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestCount: number;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  specialRequests?: string;
}

export interface BookingResponse {
  bookingCode: string;
  token: string;
  status: 'confirmed' | 'pending';
  expiresAt: string | null;
  priceBreakdown: PriceBreakdown;
  propertyName: string;
  hostPhone: string | null;
  hostWhatsapp: string | null;
}
