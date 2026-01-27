// Accommodation Types
export type AccommodationType =
  | 'hostel'
  | 'dormitory'
  | 'capsule_hotel'
  | 'guesthouse'
  | 'homestay'
  | 'bnb'
  | 'apartment'
  | 'studio'
  | 'boutique_hotel'
  | 'villa'
  | 'resort'
  | 'eco_lodge'
  | 'glamping'
  | 'serviced_apartment'
  | 'coliving'
  | 'bungalow'
  | 'cabin';

export type PropertyCategory = 'budget' | 'mid_range' | 'premium' | 'luxury';

export type UnitType = 'entire_place' | 'private_room' | 'shared_room' | 'bed';

export type BedType = 'single' | 'double' | 'queen' | 'king' | 'bunk' | 'sofa_bed';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'
  | 'no_show';

export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';

export type AvailabilityStatus = 'available' | 'booked' | 'blocked';

// Interfaces
export interface BedConfiguration {
  type: BedType;
  quantity: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  managerId: string;
  name: string;
  slug: string;
  description: string;
  type: AccommodationType;
  category: PropertyCategory;
  stars?: number;
  address: string;
  city: string;
  area: string;
  country: string;
  coordinates: Coordinates;
  totalUnits: number;
  maxGuests: number;
  images: string[];
  coverImage: string;
  virtualTourUrl?: string;
  amenities: string[];
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
  selfCheckIn: boolean;
  rating: number;
  reviewCount: number;
  status: 'draft' | 'active' | 'paused' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Unit {
  id: string;
  propertyId: string;
  name: string;
  description?: string;
  unitType: UnitType;
  maxGuests: number;
  beds: BedConfiguration[];
  bathrooms: number;
  bathroomType: 'private' | 'shared';
  sizeSqm?: number;
  basePricePerNight: number;
  currency: string;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  quantity: number;
  amenities: string[];
  images: string[];
  status: 'available' | 'unavailable' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

export interface Availability {
  id: string;
  unitId: string;
  date: Date;
  status: AvailabilityStatus;
  bookingId?: string;
  priceOverride?: number;
  minNights?: number;
  note?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  unitId: string;
  managerId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry: string;
  numberOfGuests: number;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  confirmedVia?: 'whatsapp' | 'zalo' | 'telegram' | 'email' | 'sms';
  specialRequests?: string;
  referredBy?: string;
  partnerDiscount?: number;
  partnerCommission?: number;
  createdAt: Date;
  updatedAt: Date;
}

// In-Stay Services
export interface ServiceCategory {
  id: string;
  propertyId: string;
  name: string;
  nameTranslations: Record<string, string>;
  icon: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  availableFrom?: string;
  availableTo?: string;
  availableDays?: number[];
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  propertyId: string;
  name: string;
  nameTranslations: Record<string, string>;
  description?: string;
  price: number;
  currency: string;
  priceType: 'fixed' | 'per_person' | 'per_hour' | 'per_day' | 'per_kg';
  variants?: ServiceVariant[];
  expressMultiplier?: number;
  image?: string;
  inStock: boolean;
  maxQuantity?: number;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

export interface ServiceVariant {
  name: string;
  priceModifier: number;
}

export interface ServiceOrder {
  id: string;
  bookingId: string;
  propertyId: string;
  guestId: string;
  items: ServiceOrderItem[];
  subtotal: number;
  tax?: number;
  total: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'delivered' | 'cancelled';
  requestedTime?: string;
  deliveryNotes?: string;
  paymentMethod: 'room_charge' | 'cash' | 'card' | 'online';
  paymentStatus: 'unpaid' | 'paid';
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceOrderItem {
  serviceItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  variant?: string;
  notes?: string;
  total: number;
}

// Review
export interface Review {
  id: string;
  propertyId: string;
  bookingId: string;
  guestName: string;
  guestCountry: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Currency
export interface Currency {
  code: string;
  symbol: string;
  decimals: number;
  name: string;
}

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', decimals: 2, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', decimals: 2, name: 'Euro' },
  VND: { code: 'VND', symbol: '₫', decimals: 0, name: 'Vietnamese Dong' },
  THB: { code: 'THB', symbol: '฿', decimals: 2, name: 'Thai Baht' },
  IDR: { code: 'IDR', symbol: 'Rp', decimals: 0, name: 'Indonesian Rupiah' },
  PHP: { code: 'PHP', symbol: '₱', decimals: 2, name: 'Philippine Peso' },
  MYR: { code: 'MYR', symbol: 'RM', decimals: 2, name: 'Malaysian Ringgit' },
  SGD: { code: 'SGD', symbol: 'S$', decimals: 2, name: 'Singapore Dollar' },
  AUD: { code: 'AUD', symbol: 'A$', decimals: 2, name: 'Australian Dollar' },
  KRW: { code: 'KRW', symbol: '₩', decimals: 0, name: 'Korean Won' },
  JPY: { code: 'JPY', symbol: '¥', decimals: 0, name: 'Japanese Yen' },
  CNY: { code: 'CNY', symbol: '¥', decimals: 2, name: 'Chinese Yuan' },
  GBP: { code: 'GBP', symbol: '£', decimals: 2, name: 'British Pound' },
};

// Amenities
export const PROPERTY_AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
  { id: 'pool', label: 'Pool', icon: '🏊' },
  { id: 'parking', label: 'Parking', icon: '🅿️' },
  { id: 'gym', label: 'Gym', icon: '💪' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'washer', label: 'Washer', icon: '🧺' },
  { id: 'dryer', label: 'Dryer', icon: '👕' },
  { id: 'tv', label: 'TV', icon: '📺' },
  { id: 'workspace', label: 'Workspace', icon: '💻' },
  { id: 'breakfast', label: 'Breakfast', icon: '🥐' },
  { id: 'elevator', label: 'Elevator', icon: '🛗' },
  { id: 'sea_view', label: 'Sea View', icon: '🌊' },
  { id: 'mountain_view', label: 'Mountain View', icon: '🏔️' },
  { id: 'balcony', label: 'Balcony', icon: '🌅' },
  { id: 'garden', label: 'Garden', icon: '🌿' },
  { id: 'bbq', label: 'BBQ', icon: '🍖' },
  { id: 'hot_tub', label: 'Hot Tub', icon: '🛁' },
  { id: 'sauna', label: 'Sauna', icon: '🧖' },
  { id: 'beach_access', label: 'Beach Access', icon: '🏖️' },
];

export const HOUSE_RULES = [
  { id: 'no_smoking', label: 'No Smoking', icon: '🚭' },
  { id: 'no_pets', label: 'No Pets', icon: '🐕' },
  { id: 'no_parties', label: 'No Parties', icon: '🎉' },
  { id: 'quiet_hours', label: 'Quiet Hours', icon: '🤫' },
  { id: 'no_shoes_inside', label: 'No Shoes Inside', icon: '👟' },
];

// Accommodation type labels
export const ACCOMMODATION_LABELS: Record<AccommodationType, { label: string; icon: string }> = {
  hostel: { label: 'Hostel', icon: '🛏️' },
  dormitory: { label: 'Dormitory', icon: '🛏️' },
  capsule_hotel: { label: 'Capsule Hotel', icon: '📦' },
  guesthouse: { label: 'Guesthouse', icon: '🏠' },
  homestay: { label: 'Homestay', icon: '🏡' },
  bnb: { label: 'B&B', icon: '🥐' },
  apartment: { label: 'Apartment', icon: '🏢' },
  studio: { label: 'Studio', icon: '🏠' },
  boutique_hotel: { label: 'Boutique Hotel', icon: '🏨' },
  villa: { label: 'Villa', icon: '🏛️' },
  resort: { label: 'Resort', icon: '🌴' },
  eco_lodge: { label: 'Eco Lodge', icon: '🌿' },
  glamping: { label: 'Glamping', icon: '⛺' },
  serviced_apartment: { label: 'Serviced Apartment', icon: '🏢' },
  coliving: { label: 'Coliving', icon: '👥' },
  bungalow: { label: 'Bungalow', icon: '🏖️' },
  cabin: { label: 'Cabin', icon: '🏕️' },
};
