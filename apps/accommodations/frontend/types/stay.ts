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
  | 'outside_hours'
  | 'invalid_room_code'
  | 'verification_required'
  | 'too_many_attempts'
  | 'no_active_booking'
  | 'consent_missing'
  | 'upload_failed'
  | 'document_not_found';

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

// --- Access tier for progressive auth ---

export type AccessTier = 'browse' | 'full';

// --- Access settings for owner security configuration (Phase 27) ---

export interface AccessSettings {
  preset: 'family' | 'standard' | 'structured';
  actions: {
    order_service: boolean;
    order_fnb: boolean;
    request_checkout: boolean;
    view_orders: boolean;
    contact_host: boolean;
  };
}

export const ACCESS_PRESETS: Record<string, AccessSettings> = {
  family: {
    preset: 'family',
    actions: {
      order_service: false,
      order_fnb: false,
      request_checkout: false,
      view_orders: false,
      contact_host: false,
    },
  },
  standard: {
    preset: 'standard',
    actions: {
      order_service: true,
      order_fnb: true,
      request_checkout: false,
      view_orders: false,
      contact_host: false,
    },
  },
  structured: {
    preset: 'structured',
    actions: {
      order_service: true,
      order_fnb: true,
      request_checkout: true,
      view_orders: true,
      contact_host: true,
    },
  },
};

// --- Verification types for progressive auth (Phase 26) ---

export type VerificationMethod = 'last_name' | 'pin';

export interface VerifyRoomRequest {
  method: VerificationMethod;
  value: string;
}

export interface VerifyRoomResponse {
  token: string;
  stay: StayData;
}

// --- GET /api/stay/room/[roomCode] ---

export interface RoomResolveResponse {
  token: string;
  stay: RoomStayData;
}

/**
 * Stay data from room code resolution.
 * Similar to StayData but booking is optional (room may be vacant).
 */
export interface RoomStayData {
  property: PropertyInfo;
  room: RoomInfo;
  booking: BookingInfo | null; // null when no active booking
  wifi: WifiInfo;
  hasActiveBooking: boolean;
  accessTier: AccessTier;
  verificationMethod?: VerificationMethod; // Present when hasActiveBooking=true
  accessSettings?: AccessSettings; // Owner-configured action gates (Phase 27)
}

export interface PropertyInfo {
  name: string;
  slug: string;
  type: string;
  description: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  contactWhatsapp: string | null;
  checkInTime: string | null;
  checkoutTime: string;
  checkoutProcedure: string | null;
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

export interface WifiZoneInfo {
  zoneId: string;
  label: string;
  zoneType: string;
  icon: string;
  ssid: string;
  password: string;
  sortOrder: number;
  isRoomNetwork?: boolean;
}

export interface WifiInfo {
  network: string | null;
  password: string | null;
  zones?: WifiZoneInfo[];
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
  categoryTag: string;
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
  includedInRate: boolean;
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
  partnerName: string;
  discountLabel: string;
  description: string | null;
  imageUrl: string | null;
  url: string | null;
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
  categoryTag: string;
  isMinibarConsumption: boolean;
  ownerConfirmed: boolean | null;
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
  categoryTag?: string;
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

export interface CreateMinibarOrderRequest {
  items: { serviceItemId: string; quantity: number }[];
}

export interface OrdersResponse {
  orders: ServiceOrder[];
}

export interface ServiceCategoryResponseWithTimezone extends ServiceCategoryResponse {
  timezone: string;
}

// --- Guest Document Types (Phase 28) ---

export interface GuestDocument {
  id: string;
  documentType: 'passport' | 'visa';
  fileName: string;
  fileSizeBytes: number | null;
  visaExpiryDate: string | null;
  registeredWithAuthorities: boolean;
  supersededBy: string | null;
  createdAt: string;
}

export interface DocumentUploadRequest {
  documentType: 'passport' | 'visa';
  consentTextHash: string;
  visaExpiryDate?: string;
}

export interface DocumentUploadResponse {
  docId: string;
  signedUrl: string;
  path: string;
  token: string;
}

export interface DocumentListResponse {
  documents: GuestDocument[];
}

export interface DocumentUrlResponse {
  signedUrl: string;
  expiresIn: number;
}

// --- Guest Feedback Types (Phase 35) ---

export type FeedbackCategory =
  | 'maintenance'
  | 'housekeeping'
  | 'question'
  | 'complaint'
  | 'compliment'
  | 'other';

export type FeedbackStatus = 'new' | 'acknowledged' | 'in_progress' | 'resolved' | 'dismissed';

export interface GuestFeedback {
  id: string;
  propertyId: string;
  bookingId: string | null;
  roomId: string | null;
  feedbackType: 'in_stay' | 'post_stay';
  category: FeedbackCategory;
  message: string;
  photoUrl: string | null;
  status: FeedbackStatus;
  ownerResponse: string | null;
  respondedAt: string | null;
  guestName: string | null;
  guestRoomNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackSubmitRequest {
  category: FeedbackCategory;
  message: string;
  photoUrl?: string;
}

export interface FeedbackUploadUrlResponse {
  signedUrl: string;
  path: string;
  token: string;
}

export interface FeedbackListResponse {
  feedback: GuestFeedback[];
}

// --- Concierge Hub Types (Phase 36) ---

export type ConciergeSection = 'discover' | 'emergency' | 'safety' | 'culture' | 'transport';

export type ConciergeSections = Record<ConciergeSection, boolean>;

export interface ConciergeConfig {
  sections: ConciergeSections;
  country: string;
  city: string;
}

export const DEFAULT_CONCIERGE_SECTIONS: ConciergeSections = {
  discover: true,
  emergency: true,
  safety: true,
  culture: true,
  transport: true,
};
