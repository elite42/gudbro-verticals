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
  | 'internal_error'
  | 'order_not_found'
  | 'invalid_transition'
  | 'outside_hours';

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
  description: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  contactWhatsapp: string | null;
  checkoutTime: string;
  houseRules: string[];
  amenities: string[];
  images: string[];
  hasLinkedFnb: boolean;
  linkedFnbSlug: string | null;
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
  guestCountry: string | null;
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
  automationLevel: string;
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
  isAlwaysAvailable: boolean;
  availableFrom: string | null;
  availableUntil: string | null;
}

// --- GET /api/stay/[code]/useful-numbers ---

export interface EmergencyNumber {
  serviceType: string;
  phoneNumber: string;
}

export interface CityNumber {
  label: string;
  phoneNumber: string;
  category: string;
  sortOrder: number;
}

export interface UsefulNumbersResponse {
  emergency: EmergencyNumber[];
  city: CityNumber[];
  property: {
    name: string;
    phone: string;
  };
}

// --- Quick Actions & Return Banner ---

export interface QuickAction {
  id: string;
  name: string;
  icon: string;
  whatsappMessage: string;
}

export interface PropertyExtended extends PropertyInfo {
  quickActions: QuickAction[];
  returnBannerText: string | null;
  returnBannerUrl: string | null;
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

// --- Service Ordering Types ---

export interface CartItem {
  serviceItemId: string;
  name: string;
  unitPrice: number;
  currency: string;
  quantity: number;
  notes: string;
}

export interface ServiceOrder {
  id: string;
  status: string;
  requestedTime: string | null;
  deliveryNotes: string | null;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  items: ServiceOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceOrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes: string | null;
}

export interface CreateOrderRequest {
  items: {
    serviceItemId: string;
    quantity: number;
    notes?: string;
  }[];
  requestedTime?: string;
  deliveryNotes?: string;
}

export interface OrdersResponse {
  orders: ServiceOrder[];
}

export interface ServiceCategoryResponseWithTimezone extends ServiceCategoryResponse {
  timezone: string;
}
