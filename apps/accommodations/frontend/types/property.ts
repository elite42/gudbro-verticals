/**
 * Types for Accommodations Property Page & Booking Flow
 *
 * Used by: /property/[slug] page, /api/property/[slug], /api/booking
 * All prices are INTEGER minor currency units (e.g., 50000 = $500.00 or 500,000 VND)
 */

// --- Payment Method Types ---

export type AccomPaymentMethod = 'cash' | 'bank_transfer' | 'card' | 'crypto';

export interface BankTransferInfo {
  bank_name: string;
  account_number: string;
  account_holder: string;
  swift_code?: string;
  notes?: string;
}

export const PAYMENT_METHOD_CONFIG: Record<
  AccomPaymentMethod,
  { label: string; description: string; icon: string; color: string }
> = {
  cash: {
    label: 'Cash',
    description: 'Pay at check-in',
    icon: 'Money',
    color: 'bg-emerald-500',
  },
  bank_transfer: {
    label: 'Bank Transfer',
    description: 'Transfer before arrival',
    icon: 'Bank',
    color: 'bg-blue-500',
  },
  card: {
    label: 'Credit/Debit Card',
    description: 'Secure payment via Stripe',
    icon: 'CreditCard',
    color: 'bg-indigo-600',
  },
  crypto: {
    label: 'Cryptocurrency',
    description: 'BTC, ETH, USDC & more',
    icon: 'CurrencyBtc',
    color: 'bg-orange-500',
  },
};

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
  | 'payment_method_not_accepted'
  | 'stripe_checkout_failed'
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
  deposit_percent: number;
  bank_transfer_info: BankTransferInfo | null;
  crypto_wallets: Record<string, string> | null;
  cancellation_window_hours: number;
  cancellation_penalty_percent: number;
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
  paymentMethod?: AccomPaymentMethod;
}

export interface BookingResponse {
  bookingCode: string;
  token: string;
  status: 'confirmed' | 'pending' | 'pending_payment';
  expiresAt: string | null;
  priceBreakdown: PriceBreakdown;
  propertyName: string;
  hostPhone: string | null;
  hostWhatsapp: string | null;
  paymentMethod?: AccomPaymentMethod;
  depositAmount?: number;
  depositPercent?: number;
  stripeCheckoutUrl?: string | null;
  bankTransferInfo?: BankTransferInfo | null;
  cryptoWallets?: Record<string, string> | null;
}
