/**
 * GUDBRO Core Modules - Type Definitions
 *
 * These modules are reusable building blocks for:
 * - F&B (restaurants, cafes, food trucks)
 * - Hotels (room service, amenities)
 * - Airbnb (property info, local tips)
 */

import { MultiLangText, LanguageCode } from '../translation-engine/types';

// =============================================================================
// WiFi Module
// =============================================================================

export interface WiFiNetwork {
  id: string;
  ssid: string;
  password: string;
  security: 'WPA' | 'WPA2' | 'WPA3' | 'WEP' | 'Open';
  hidden?: boolean;
  bandwidthMbps?: number;
  note?: MultiLangText;  // e.g., "Available in lobby only"
}

export interface WiFiConfig {
  networks: WiFiNetwork[];
  showPassword: boolean;
  showQrCode: boolean;
  autoConnect?: boolean;  // Deep link to connect
}

// =============================================================================
// Price List Module
// =============================================================================

export interface PriceItem {
  id: string;
  name: MultiLangText;
  description?: MultiLangText;
  price: number;
  currency: string;
  unit?: MultiLangText;  // "per kg", "per piece", "per hour"
  category: string;
  image?: string;
  available: boolean;
  tags?: string[];  // "popular", "new", "discount"
}

export interface PriceCategory {
  id: string;
  name: MultiLangText;
  icon?: string;
  items: PriceItem[];
  sortOrder: number;
}

export interface PriceListConfig {
  categories: PriceCategory[];
  defaultCurrency: string;
  showCurrencyConverter: boolean;
  supportedCurrencies: string[];
}

// =============================================================================
// Contacts Module
// =============================================================================

export interface ContactNumber {
  id: string;
  label: MultiLangText;
  number: string;
  type: 'phone' | 'whatsapp' | 'telegram' | 'zalo' | 'wechat' | 'line';
  available24h?: boolean;
  availableHours?: string;  // "9:00-22:00"
  icon?: string;
  isPrimary?: boolean;
}

export interface EmergencyContact {
  id: string;
  label: MultiLangText;
  number: string;
  description?: MultiLangText;
  icon?: string;
}

export interface ContactsConfig {
  businessContacts: ContactNumber[];
  emergencyContacts: EmergencyContact[];
  showCallButton: boolean;
  showMessageButton: boolean;
}

// =============================================================================
// Attractions Module
// =============================================================================

export interface Attraction {
  id: string;
  name: MultiLangText;
  description: MultiLangText;
  category: 'restaurant' | 'cafe' | 'bar' | 'museum' | 'beach' | 'temple' | 'market' | 'park' | 'shopping' | 'entertainment' | 'nature' | 'other';
  address: MultiLangText;
  distance?: string;  // "500m", "2km"
  walkingTime?: string;  // "5 min"
  coordinates?: { lat: number; lng: number };
  openingHours?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  rating?: number;
  image?: string;
  tags?: string[];
  partnerDiscount?: {
    percentage: number;
    description: MultiLangText;
    code?: string;
  };
  externalLinks?: {
    googleMaps?: string;
    tripAdvisor?: string;
    website?: string;
  };
}

export interface AttractionsConfig {
  attractions: Attraction[];
  showMap: boolean;
  showDistances: boolean;
  groupByCategory: boolean;
}

// =============================================================================
// Transport Module
// =============================================================================

export interface TransportOption {
  id: string;
  type: 'taxi' | 'grab' | 'uber' | 'bus' | 'train' | 'metro' | 'ferry' | 'bike' | 'scooter' | 'airport_shuttle' | 'hotel_transfer';
  name: MultiLangText;
  description?: MultiLangText;
  contactNumber?: string;
  appLink?: string;  // Deep link to Grab, Uber, etc.
  estimatedPrice?: {
    from: number;
    to: number;
    currency: string;
    note?: MultiLangText;  // "to airport", "per km"
  };
  bookingRequired?: boolean;
  available24h?: boolean;
  icon?: string;
}

export interface TransportConfig {
  options: TransportOption[];
  airportInfo?: {
    name: string;
    code: string;
    distance: string;
    estimatedTime: string;
    shuttleAvailable: boolean;
    shuttlePrice?: number;
  };
  showPriceEstimates: boolean;
}

// =============================================================================
// Services Module (Hotel/Laundry/etc.)
// =============================================================================

export interface ServiceItem {
  id: string;
  name: MultiLangText;
  description?: MultiLangText;
  price?: number;
  currency?: string;
  unit?: MultiLangText;  // "per item", "per kg"
  turnaround?: MultiLangText;  // "Same day", "24 hours"
  category: string;
  available: boolean;
  bookingRequired?: boolean;
  icon?: string;
}

export interface ServiceCategory {
  id: string;
  name: MultiLangText;
  description?: MultiLangText;
  icon?: string;
  items: ServiceItem[];
  contactNumber?: string;
  availableHours?: string;
  sortOrder: number;
}

export interface ServicesConfig {
  categories: ServiceCategory[];
  showPrices: boolean;
  showBookingButton: boolean;
}

// =============================================================================
// House Rules Module (Airbnb specific)
// =============================================================================

export interface HouseRule {
  id: string;
  icon: string;
  title: MultiLangText;
  description: MultiLangText;
  type: 'allowed' | 'not_allowed' | 'info';
  category: 'general' | 'noise' | 'guests' | 'pets' | 'smoking' | 'parking' | 'checkout' | 'safety';
}

export interface HouseRulesConfig {
  rules: HouseRule[];
  checkInTime: string;  // "14:00"
  checkOutTime: string;  // "11:00"
  maxGuests: number;
  quietHours?: { from: string; to: string };  // "22:00" - "08:00"
  emergencyContact: ContactNumber;
}

// =============================================================================
// Check-in/Check-out Module
// =============================================================================

export interface CheckInInfo {
  time: string;
  earlyCheckInAvailable: boolean;
  earlyCheckInFee?: number;
  instructions: MultiLangText;
  accessCode?: string;
  lockboxLocation?: MultiLangText;
  keyPickupLocation?: MultiLangText;
}

export interface CheckOutInfo {
  time: string;
  lateCheckOutAvailable: boolean;
  lateCheckOutFee?: number;
  instructions: MultiLangText;
  keyDropLocation?: MultiLangText;
}

export interface CheckInOutConfig {
  checkIn: CheckInInfo;
  checkOut: CheckOutInfo;
  selfCheckIn: boolean;
}

// =============================================================================
// Deals & Partnerships Module
// =============================================================================

export interface PartnerDeal {
  id: string;
  partnerName: MultiLangText;
  partnerLogo?: string;
  category: 'restaurant' | 'spa' | 'tour' | 'transport' | 'shopping' | 'entertainment' | 'other';
  title: MultiLangText;
  description: MultiLangText;
  discountType: 'percentage' | 'fixed' | 'freebie';
  discountValue: number;  // 10 for 10%, or fixed amount
  discountCode?: string;
  validUntil?: string;  // ISO date
  terms?: MultiLangText;
  address?: MultiLangText;
  distance?: string;
  bookingLink?: string;
  exclusive: boolean;  // Only for guests
}

export interface DealsConfig {
  deals: PartnerDeal[];
  showExpirationDates: boolean;
  groupByCategory: boolean;
}

// =============================================================================
// Module Registry
// =============================================================================

export type ModuleType =
  | 'wifi'
  | 'priceList'
  | 'contacts'
  | 'attractions'
  | 'transport'
  | 'services'
  | 'houseRules'
  | 'checkInOut'
  | 'deals'
  | 'menu';  // F&B menu (existing)

export interface ModuleConfig {
  wifi?: WiFiConfig;
  priceList?: PriceListConfig;
  contacts?: ContactsConfig;
  attractions?: AttractionsConfig;
  transport?: TransportConfig;
  services?: ServicesConfig;
  houseRules?: HouseRulesConfig;
  checkInOut?: CheckInOutConfig;
  deals?: DealsConfig;
}

// =============================================================================
// Template Types
// =============================================================================

export type TemplateType = 'fnb' | 'hotel_room' | 'airbnb' | 'hostel';

export interface TemplateConfig {
  type: TemplateType;
  name: MultiLangText;
  description?: MultiLangText;
  logo?: string;
  primaryColor?: string;
  enabledModules: ModuleType[];
  modules: ModuleConfig;
  languages: LanguageCode[];
  defaultLanguage: LanguageCode;
  currencies: string[];
  defaultCurrency: string;
}
