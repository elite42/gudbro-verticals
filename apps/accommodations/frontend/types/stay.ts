/**
 * API Response Types for Accommodations Stay Endpoints
 *
 * All API routes return ApiResponse<T> with consistent { data, error } shape.
 */

// --- Generic API wrapper ---

export type ApiError =
  | 'booking_not_found'
  | 'booking_expired'
  | 'verification_failed'
  | 'session_expired'
  | 'internal_error';

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError | string;
}

// --- GET /api/stay/[code] ---

export interface StayLookupResponse {
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guestFirstName: string;
}

// --- POST /api/stay/verify ---

export interface VerifyResponse {
  token: string;
  stay: StayData;
}

export interface StayData {
  property: PropertyInfo;
  room: RoomInfo;
  booking: BookingInfo;
  wifi: WifiInfo;
}

export interface PropertyInfo {
  name: string;
  slug: string;
  type: string;
  contactPhone: string | null;
  contactWhatsapp: string | null;
  checkoutTime: string;
  houseRules: string[];
  amenities: string[];
  images: string[];
}

export interface RoomInfo {
  number: string;
  name: string;
  floor: number | null;
}

export interface BookingInfo {
  code: string;
  guestName: string;
  guestCount: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: string;
}

export interface WifiInfo {
  network: string | null;
  password: string | null;
}

// --- GET /api/stay/[code]/services ---

export interface ServiceCategoryResponse {
  categories: ServiceCategoryWithItems[];
}

export interface ServiceCategoryWithItems {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  sortOrder: number;
  items: ServiceItemResponse[];
}

export interface ServiceItemResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  priceType: string;
  image: string | null;
  inStock: boolean;
}

// --- GET /api/stay/[code]/deals ---

export interface DealResponse {
  id: string;
  merchantName: string;
  merchantSlug: string;
  discountLabel: string;
  description: string | null;
  validUntil: string | null;
  bookingAction: string | null;
}
