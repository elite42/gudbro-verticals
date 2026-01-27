# Accommodations - Claude Code Context

**Vertical:** Accommodations / Lodging / Stays
**Tech Stack:** Next.js 14 (Frontend) + Supabase (Backend)
**Port:** 3027 (backend), 3028 (frontend)
**Languages:** EN, VI, KO, ZH, JA, RU, DE, FR (tourism priority)
**Status:** Planning
**Last Updated:** 2026-01-26

---

## Quick Context

This is an **accommodation booking platform** designed for:

- Small property owners (1-10 properties)
- Family-run guesthouses
- Boutique hotels
- Homestay hosts
- Apartment/villa managers
- Hostel operators

**Target Market:** Southeast Asia (Vietnam, Thailand, Indonesia, Philippines) - tourist areas

**Key Differentiator:** One manager can have **multiple properties of different types**.

---

## The Problem We Solve

### Current Situation (Small Accommodation Owners)

```
High commission fees from OTAs (15-25%)
Limited control over pricing and availability
No direct relationship with guests
Complex setup for multiple properties
Language barriers with international guests
Dependence on platforms that can change terms
```

### Our Solution

```
Zero/low commission - direct bookings
Multi-property management from one account
Multi-language PWA for each property
Direct guest communication (WhatsApp/Zalo/Telegram)
Simple calendar and availability management
Integration with GUDBRO Partnership Network
```

---

## Accommodation Categories

### Tier 1: Budget

| Type                 | Target Guest      | Price Range  | Key Features                |
| -------------------- | ----------------- | ------------ | --------------------------- |
| **Hostel/Dormitory** | Backpackers, solo | $5-15/night  | Shared rooms, social        |
| **Capsule Hotel**    | Solo, transit     | $10-30/night | Minimal, efficient, privacy |
| **Guesthouse**       | Budget travelers  | $15-35/night | Family-run, local feel      |

### Tier 2: Mid-Range

| Type                 | Target Guest          | Price Range   | Key Features                |
| -------------------- | --------------------- | ------------- | --------------------------- |
| **Homestay**         | Cultural seekers      | $20-50/night  | Live with locals, authentic |
| **B&B**              | Couples, solo         | $25-60/night  | Breakfast included, cozy    |
| **Apartment/Studio** | Families, medium stay | $30-80/night  | Kitchen, self-catering      |
| **Boutique Hotel**   | Design lovers         | $50-150/night | Unique character, curated   |

### Tier 3: Premium

| Type          | Target Guest        | Price Range     | Key Features              |
| ------------- | ------------------- | --------------- | ------------------------- |
| **Villa**     | Groups, families    | $150-500+/night | Private, multiple rooms   |
| **Resort**    | Luxury seekers      | $100-500+/night | Pool, spa, full service   |
| **Eco-Lodge** | Nature lovers       | $40-120/night   | Sustainable, remote       |
| **Glamping**  | Adventure + comfort | $50-200/night   | Tents, treehouses, unique |

### Special Types

| Type                   | Target Guest        | Price Range    | Key Features         |
| ---------------------- | ------------------- | -------------- | -------------------- |
| **Serviced Apartment** | Business, long stay | $50-150/night  | Weekly/monthly rates |
| **Coliving Space**     | Digital nomads      | $300-800/month | Community, coworking |
| **Beach Bungalow**     | Beach lovers        | $30-100/night  | Simple, waterfront   |
| **Mountain Cabin**     | Nature escape       | $40-120/night  | Secluded, scenic     |

---

## Account Structure

### Multi-Property Model

```
┌─────────────────────────────────────────────────────────────┐
│                    MANAGER ACCOUNT                          │
│  (Mario Rossi - mario@email.com)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Property 1  │  │ Property 2  │  │ Property 3  │        │
│  │ "Beach Apt" │  │ "City Loft" │  │ "Villa Rosa"│        │
│  │ apartment   │  │ apartment   │  │ villa       │        │
│  │ Da Nang     │  │ Hoi An      │  │ Da Nang     │        │
│  │ 1 unit      │  │ 2 units     │  │ 1 unit      │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Property Types by Complexity

| Type             | Units | Rooms per Unit | Example                  |
| ---------------- | ----- | -------------- | ------------------------ |
| **Single Unit**  | 1     | 1-5            | Apartment, villa, house  |
| **Multi-Unit**   | 2-10  | 1-3 each       | Small apartment building |
| **Hostel/Hotel** | N/A   | 5-50+          | Shared/private rooms     |

---

## Data Models

### Manager (Account Owner)

```typescript
interface AccommodationManager {
  id: string;

  // Personal
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  zalo?: string;

  // Business
  businessName?: string;
  businessType: 'individual' | 'company';
  taxId?: string;

  // Verification
  verified: boolean;
  verifiedAt?: Date;

  // Subscription
  tier: 'free' | 'basic' | 'pro' | 'enterprise';
  maxProperties: number; // Based on tier

  // Stats
  totalProperties: number;
  totalBookings: number;
  rating: number;

  // GUDBRO Integration
  gudbroPartnerId?: string; // For partnership network

  createdAt: Date;
  updatedAt: Date;
}
```

### Property

```typescript
interface Property {
  id: string;
  managerId: string;

  // Basic Info
  name: string;
  slug: string; // URL-friendly
  description: string;

  // Classification
  type: AccommodationType; // See enum below
  category: 'budget' | 'mid_range' | 'premium' | 'luxury';
  stars?: number; // 1-5, optional for hotels

  // Location
  address: string;
  city: string;
  area: string; // "Da Nang Beach", "Hoi An Old Town"
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };

  // Capacity
  totalUnits: number; // How many bookable units
  maxGuests: number; // Total across all units

  // Media
  images: string[];
  coverImage: string;
  virtualTourUrl?: string;

  // Amenities
  amenities: string[]; // ["wifi", "pool", "parking", "ac", ...]
  houseRules: string[]; // ["no_smoking", "no_parties", ...]

  // Check-in
  checkInTime: string; // "14:00"
  checkOutTime: string; // "11:00"
  selfCheckIn: boolean;

  // Reviews
  rating: number;
  reviewCount: number;

  // Status
  status: 'draft' | 'active' | 'paused' | 'archived';

  createdAt: Date;
  updatedAt: Date;
}

type AccommodationType =
  // Budget
  | 'hostel'
  | 'dormitory'
  | 'capsule_hotel'
  | 'guesthouse'
  // Mid-range
  | 'homestay'
  | 'bnb'
  | 'apartment'
  | 'studio'
  | 'boutique_hotel'
  // Premium
  | 'villa'
  | 'resort'
  | 'eco_lodge'
  | 'glamping'
  // Special
  | 'serviced_apartment'
  | 'coliving'
  | 'bungalow'
  | 'cabin';
```

### Unit (Bookable Room/Apartment)

```typescript
interface Unit {
  id: string;
  propertyId: string;

  // Basic
  name: string; // "Room 101", "Master Suite", "Entire Apartment"
  description?: string;

  // Type
  unitType: 'entire_place' | 'private_room' | 'shared_room' | 'bed';

  // Capacity
  maxGuests: number;
  beds: BedConfiguration[];
  bathrooms: number;
  bathroomType: 'private' | 'shared';

  // Size
  sizeSqm?: number;

  // Pricing
  basePricePerNight: number; // In cents (USD)
  currency: string;
  weeklyDiscount?: number; // Percentage
  monthlyDiscount?: number;

  // Availability
  quantity: number; // How many of this unit type (e.g., 5 standard rooms)

  // Amenities (unit-specific)
  amenities: string[]; // ["balcony", "sea_view", "minibar"]

  // Media
  images: string[];

  // Status
  status: 'available' | 'unavailable' | 'maintenance';

  createdAt: Date;
  updatedAt: Date;
}

interface BedConfiguration {
  type: 'single' | 'double' | 'queen' | 'king' | 'bunk' | 'sofa_bed';
  quantity: number;
}
```

### Booking

```typescript
interface AccommodationBooking {
  id: string;
  propertyId: string;
  unitId: string;
  managerId: string;

  // Guest
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry: string;
  numberOfGuests: number;

  // Dates
  checkIn: Date;
  checkOut: Date;
  nights: number;

  // Pricing
  pricePerNight: number;
  subtotal: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
  totalPrice: number;
  currency: string;

  // Status
  status:
    | 'pending'
    | 'confirmed'
    | 'checked_in'
    | 'checked_out'
    | 'cancelled'
    | 'no_show';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';

  // Communication
  confirmedVia?: 'whatsapp' | 'zalo' | 'telegram' | 'email' | 'sms';
  specialRequests?: string;

  // GUDBRO Partnership
  referredBy?: string; // Partner merchant ID
  partnerDiscount?: number; // Applied discount
  partnerCommission?: number; // Commission to referrer

  createdAt: Date;
  updatedAt: Date;
}
```

### Availability Calendar

```typescript
interface Availability {
  id: string;
  unitId: string;
  date: Date;

  // Status
  status: 'available' | 'booked' | 'blocked';
  bookingId?: string; // If booked

  // Dynamic pricing
  priceOverride?: number; // Override base price for this date
  minNights?: number; // Minimum stay for this date

  // Notes
  note?: string; // "Holiday pricing", "Maintenance"
}
```

---

## In-Stay Services (Digital Menu)

The accommodation PWA becomes a **digital menu** for all services available to guests during their stay. Manager can customize items, prices, and availability.

### Service Categories

| Category                 | Examples                     | Pricing Model      |
| ------------------------ | ---------------------------- | ------------------ |
| **Minibar**              | Drinks, snacks, alcohol      | Per item           |
| **Breakfast**            | Included, buffet, à la carte | Per person/day     |
| **Kitchen/Room Service** | Meals, dishes                | Per item           |
| **Laundry**              | Wash, iron, dry clean        | Per item + express |
| **Rentals**              | Bike, scooter, car           | Per hour/day       |
| **Transfer**             | Airport, train station       | Per trip           |
| **Extras**               | Late checkout, early checkin | Fixed fee          |
| **GUDBRO Network**       | Spa, Tours, Restaurants      | Partner prices     |

### Data Models

```typescript
interface ServiceCategory {
  id: string;
  propertyId: string;

  name: string; // "Minibar", "Lavanderia"
  nameTranslations: Record<string, string>;
  icon: string; // Emoji or icon name
  description?: string;

  // Display
  sortOrder: number;
  isActive: boolean;

  // Availability
  availableFrom?: string; // "06:00" for breakfast
  availableTo?: string; // "10:00" for breakfast
  availableDays?: number[]; // [1,2,3,4,5] weekdays only
}

interface ServiceItem {
  id: string;
  categoryId: string;
  propertyId: string;

  // Basic
  name: string; // "Coca Cola 330ml"
  nameTranslations: Record<string, string>;
  description?: string;

  // Pricing
  price: number; // In cents
  currency: string;
  priceType: 'fixed' | 'per_person' | 'per_hour' | 'per_day' | 'per_kg';

  // Options
  variants?: ServiceVariant[]; // Size, type options
  expressMultiplier?: number; // 1.5 = +50% for express

  // Media
  image?: string;

  // Availability
  inStock: boolean;
  maxQuantity?: number;

  // Display
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

interface ServiceVariant {
  name: string; // "Regular", "Express"
  priceModifier: number; // Additional cents
}

interface ServiceOrder {
  id: string;
  bookingId: string;
  propertyId: string;
  guestId: string;

  // Items
  items: ServiceOrderItem[];

  // Totals
  subtotal: number;
  tax?: number;
  total: number;
  currency: string;

  // Status
  status: 'pending' | 'confirmed' | 'in_progress' | 'delivered' | 'cancelled';

  // Delivery
  requestedTime?: string; // "ASAP", "18:00"
  deliveryNotes?: string; // "Leave at door"

  // Payment
  paymentMethod: 'room_charge' | 'cash' | 'card' | 'online';
  paymentStatus: 'unpaid' | 'paid';

  createdAt: Date;
  updatedAt: Date;
}

interface ServiceOrderItem {
  serviceItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  variant?: string;
  notes?: string;
  total: number;
}
```

### Example: Minibar Configuration

```
Manager Dashboard > Services > Minibar

┌─────────────────────────────────────────────────┐
│  🍫 Minibar                          [Active ✓] │
├─────────────────────────────────────────────────┤
│                                                 │
│  + Add Item                                     │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ [img] Coca Cola 330ml         $2.50    │   │
│  │       In stock: ✓    [Edit] [Delete]   │   │
│  ├─────────────────────────────────────────┤   │
│  │ [img] Saigon Beer 330ml       $3.00    │   │
│  │       In stock: ✓    [Edit] [Delete]   │   │
│  ├─────────────────────────────────────────┤   │
│  │ [img] Pringles Original       $4.00    │   │
│  │       In stock: ✗    [Edit] [Delete]   │   │
│  ├─────────────────────────────────────────┤   │
│  │ [img] Evian Water 500ml       $1.50    │   │
│  │       In stock: ✓    [Edit] [Delete]   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Example: Laundry Configuration

```
Manager Dashboard > Services > Laundry

┌─────────────────────────────────────────────────┐
│  👕 Laundry Service                  [Active ✓] │
├─────────────────────────────────────────────────┤
│  Hours: 08:00 - 18:00                          │
│  Express available: ✓ (+50%)                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  + Add Item                                     │
│                                                 │
│  Item                    Regular    Express     │
│  ─────────────────────────────────────────     │
│  Shirt                   $3.00      $4.50      │
│  Pants                   $4.00      $6.00      │
│  Dress                   $6.00      $9.00      │
│  Full Suit               $12.00     $18.00     │
│  Underwear (per piece)   $1.50      $2.25      │
│  Socks (per pair)        $1.00      $1.50      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Example: Breakfast Configuration

```
Manager Dashboard > Services > Breakfast

┌─────────────────────────────────────────────────┐
│  🍳 Breakfast                        [Active ✓] │
├─────────────────────────────────────────────────┤
│  Type: [À la carte ▼]                          │
│        ○ Included in room rate                 │
│        ○ Buffet (fixed price)                  │
│        ● À la carte (order items)              │
│                                                 │
│  Hours: 06:30 - 10:00                          │
│  Location: Ground floor / Room delivery        │
├─────────────────────────────────────────────────┤
│                                                 │
│  Menu Items:                                    │
│  ─────────────────────────────────────────     │
│  Vietnamese Pho                    $5.00       │
│  Eggs Benedict                     $7.00       │
│  Continental Breakfast Set         $8.00       │
│  Fresh Fruit Plate                 $4.00       │
│  Coffee / Tea                      $2.00       │
│  Fresh Orange Juice                $3.00       │
│                                                 │
│  [+ Add Item]                                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Guest PWA View

```
┌─────────────────────────────────────────────────┐
│  Beach View Apartment                          │
│  ─────────────────────────────────────────     │
│                                                 │
│  🛏️ Your Stay                                  │
│  Jan 15-18 • Room 203 • WiFi: guest_abc       │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  📋 SERVICES                                   │
│                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │   🍳    │ │   🍫    │ │   👕    │          │
│  │Breakfast│ │ Minibar │ │Laundry │          │
│  │06:30-10 │ │ 24/7    │ │08-18   │          │
│  └─────────┘ └─────────┘ └─────────┘          │
│                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │   🍜    │ │   🚗    │ │   🛵    │          │
│  │  Room   │ │Transfer │ │ Rental │          │
│  │ Service │ │         │ │        │          │
│  └─────────┘ └─────────┘ └─────────┘          │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  🎁 GUDBRO PERKS                               │
│  3 partner offers available                    │
│  └─ Minh's Tours: -10%                        │
│  └─ Zen Spa: -15%                             │
│  └─ Cafe Bella: -10%                          │
│  [Show GUDBRO Pass]                            │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  📞 Contact Host                               │
│  🏠 House Rules                                │
│  ⭐ Leave Review                               │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Onboarding Flow

### Step 1: Create Manager Account

```
┌─────────────────────────────────────────┐
│         Welcome to GUDBRO Stays         │
│                                         │
│  Create your account                    │
│                                         │
│  Name: [________________]               │
│  Email: [________________]              │
│  Phone: [________________]              │
│  WhatsApp: [________________]           │
│                                         │
│  [ ] I manage properties as individual  │
│  [ ] I manage properties as company     │
│                                         │
│         [Create Account]                │
└─────────────────────────────────────────┘
```

### Step 2: Add First Property

```
┌─────────────────────────────────────────┐
│      What type of property?             │
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │ 🏠  │ │ 🏨  │ │ 🏡  │ │ 🛖  │      │
│  │Apt  │ │Hotel│ │Villa│ │Host │      │
│  └─────┘ └─────┘ └─────┘ └─────┘      │
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │ 🛏️  │ │ ⛺  │ │ 🏕️  │ │ 🌴  │      │
│  │Hostel│ │Glamp│ │Cabin│ │Resort│     │
│  └─────┘ └─────┘ └─────┘ └─────┘      │
│                                         │
│            [More types...]              │
└─────────────────────────────────────────┘
```

### Step 3: Property Details

```
┌─────────────────────────────────────────┐
│      Tell us about your property        │
│                                         │
│  Name: [Beach View Apartment______]     │
│                                         │
│  Location:                              │
│  City: [Da Nang___] Area: [My Khe___]  │
│  Address: [123 Vo Nguyen Giap_______]   │
│                                         │
│  📍 [Pin on map]                        │
│                                         │
│  Description:                           │
│  [Modern apartment with sea view...   ] │
│  [                                    ] │
│                                         │
│              [Continue]                 │
└─────────────────────────────────────────┘
```

### Step 4: Add Units/Rooms

```
┌─────────────────────────────────────────┐
│      How many bookable units?           │
│                                         │
│  This property has:                     │
│                                         │
│  [1] unit(s)  ← For apartments/villas   │
│                                         │
│  OR for hotels/hostels:                 │
│  [5] rooms of different types           │
│                                         │
│  ─────────────────────────────────      │
│                                         │
│  Unit 1: "Entire Apartment"             │
│  Type: [Entire place     ▼]             │
│  Max guests: [4]                        │
│  Beds: [1 Queen] [1 Sofa bed] [+ Add]   │
│  Bathrooms: [1] [Private ▼]             │
│                                         │
│  Base price: [$45] per night            │
│                                         │
│  [+ Add another unit]                   │
│                                         │
│              [Continue]                 │
└─────────────────────────────────────────┘
```

### Step 5: Photos & Amenities

```
┌─────────────────────────────────────────┐
│      Make it shine!                     │
│                                         │
│  Photos (drag to reorder):              │
│  [+] [img1] [img2] [img3] [img4]       │
│                                         │
│  Amenities:                             │
│  [x] WiFi        [x] AC                 │
│  [x] Kitchen     [ ] Pool               │
│  [x] Parking     [ ] Gym                │
│  [x] Washer      [x] Sea View           │
│  [ ] Elevator    [x] Balcony            │
│                                         │
│  House Rules:                           │
│  [x] No smoking  [ ] No pets            │
│  [ ] No parties  [x] Quiet hours        │
│                                         │
│              [Continue]                 │
└─────────────────────────────────────────┘
```

### Step 6: Availability & Pricing

```
┌─────────────────────────────────────────┐
│      Set your availability              │
│                                         │
│  Check-in: [14:00]  Check-out: [11:00]  │
│                                         │
│  [ ] Self check-in available            │
│                                         │
│  Calendar:                              │
│  ┌─────────────────────────────────┐    │
│  │ Jan 2026                        │    │
│  │ Mo Tu We Th Fr Sa Su            │    │
│  │        1  2  3  4  5            │    │
│  │  6  7  8  9 10 11 12            │    │
│  │ 13 14 15 16 17 18 19            │    │
│  │ [Blocked] [Available]           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Minimum stay: [1] night(s)             │
│  Maximum stay: [30] night(s)            │
│                                         │
│              [Publish Property]         │
└─────────────────────────────────────────┘
```

### Step 7: Add More Properties (Optional)

```
┌─────────────────────────────────────────┐
│      Property published!                │
│                                         │
│  "Beach View Apartment" is now live     │
│                                         │
│  Your PWA: stays.gudbro.com/mario      │
│  QR Code: [QR]                          │
│                                         │
│  ─────────────────────────────────      │
│                                         │
│  [+ Add another property]               │
│                                         │
│  [Go to Dashboard]                      │
└─────────────────────────────────────────┘
```

---

## PWA Structure

### Manager with Single Property

```
stays.gudbro.com/beach-view-apartment
    └── Property page with all units
```

### Manager with Multiple Properties

```
stays.gudbro.com/mario-stays
    ├── /                    → Portfolio (all properties)
    ├── /beach-view          → Property 1
    ├── /city-loft           → Property 2
    └── /villa-rosa          → Property 3
```

---

## Integration with GUDBRO Partnership Network

### As Provider (Accommodation receives guests)

```typescript
// When booking comes from partner referral
{
  referredBy: "cafe-bella-123",      // Partner merchant
  partnerDiscount: 10,               // 10% off for guest
  partnerCommission: 5,              // 5% to referrer
  originalPrice: 100,
  discountedPrice: 90,
  commissionAmount: 4.50             // 5% of 90
}
```

### As Referrer (Accommodation refers to tours/restaurants)

- Guest staying at property sees "GUDBRO Perks"
- Partner tours, restaurants, wellness with discounts
- Property owner earns commission on referrals

---

## Multi-Currency Support

```typescript
const ACCOMMODATION_CURRENCIES = {
  USD: { symbol: '$', decimals: 2 },
  EUR: { symbol: '€', decimals: 2 },
  VND: { symbol: '₫', decimals: 0 },
  THB: { symbol: '฿', decimals: 2 },
  IDR: { symbol: 'Rp', decimals: 0 },
  PHP: { symbol: '₱', decimals: 2 },
  MYR: { symbol: 'RM', decimals: 2 },
  SGD: { symbol: 'S$', decimals: 2 },
  AUD: { symbol: 'A$', decimals: 2 },
  KRW: { symbol: '₩', decimals: 0 },
  JPY: { symbol: '¥', decimals: 0 },
  CNY: { symbol: '¥', decimals: 2 },
  GBP: { symbol: '£', decimals: 2 },
};
```

---

## Tier Pricing (Suggested)

| Tier           | Properties | Price  | Features                    |
| -------------- | ---------- | ------ | --------------------------- |
| **Free**       | 1          | $0     | Basic listing, 5 photos     |
| **Basic**      | 3          | $10/mo | Calendar sync, 20 photos    |
| **Pro**        | 10         | $25/mo | Analytics, priority support |
| **Enterprise** | Unlimited  | $50/mo | API access, white-label     |

---

## Competition Analysis

| Competitor     | Commission | Pros               | Cons                       |
| -------------- | ---------- | ------------------ | -------------------------- |
| Airbnb         | 14-16%     | Huge reach         | High fees, strict policies |
| Booking.com    | 15-25%     | Business travelers | Very high commission       |
| Agoda          | 15-22%     | Asia focus         | Complex backend            |
| Direct booking | 0%         | Full control       | No discovery               |

**Our Advantage:**

- **Low/no commission** - owners keep more
- **Multi-property** - one dashboard
- **GUDBRO Network** - cross-promotion
- **Local focus** - Southeast Asia tourists

---

## Development Phases

### Phase 1: MVP (2 weeks)

- [ ] Manager account creation
- [ ] Single property onboarding
- [ ] Basic listing page
- [ ] Availability calendar
- [ ] Booking request (email/WhatsApp)
- [ ] Multi-currency display

### Phase 2: Multi-Property (1 week)

- [ ] Add multiple properties
- [ ] Portfolio page
- [ ] Property management dashboard
- [ ] Booking management

### Phase 3: Features (2 weeks)

- [ ] Online payment integration
- [ ] Review system
- [ ] Calendar sync (iCal)
- [ ] Dynamic pricing
- [ ] GUDBRO Partnership integration

### Phase 4: Growth (ongoing)

- [ ] Channel manager (sync with OTAs)
- [ ] Revenue analytics
- [ ] Automated messaging
- [ ] Mobile app for managers

---

## Example Property Page

```
┌────────────────────────────────────────────┐
│ Beach View Apartment                       │
│ ⭐ 4.9 (47 reviews) · Da Nang, Vietnam     │
├────────────────────────────────────────────┤
│ [Photo Gallery - swipeable]                │
├────────────────────────────────────────────┤
│ Entire apartment · 4 guests · 2 bedrooms   │
│ 1 queen bed · 1 sofa bed · 1 bathroom      │
├────────────────────────────────────────────┤
│ 💰 $45/night                               │
│    Weekly: $280 (-10%)                     │
│    Monthly: $900 (-30%)                    │
├────────────────────────────────────────────┤
│ 📅 Check availability                      │
│ ┌─────────────────────────────────────┐    │
│ │ Check-in    │ Check-out  │ Guests  │    │
│ │ [Jan 15   ] │ [Jan 18  ] │ [2    ] │    │
│ └─────────────────────────────────────┘    │
│                                            │
│ 3 nights × $45 = $135                      │
│ Cleaning fee = $15                         │
│ Total: $150                                │
│                                            │
│ [        Book Now        ]                 │
├────────────────────────────────────────────┤
│ ✨ Amenities                               │
│ WiFi · AC · Kitchen · Balcony · Sea View   │
│ Washer · Parking · Elevator                │
├────────────────────────────────────────────┤
│ 📍 Location                                │
│ [Map] My Khe Beach, Da Nang                │
│ 2 min walk to beach · 15 min to airport    │
├────────────────────────────────────────────┤
│ 🏠 House Rules                             │
│ Check-in: 2:00 PM · Check-out: 11:00 AM    │
│ No smoking · No parties · Quiet after 10PM │
├────────────────────────────────────────────┤
│ 👤 Hosted by Mario                         │
│ Joined 2024 · 12 properties · Superhost    │
│ [Contact Host]                             │
├────────────────────────────────────────────┤
│ ⭐ Reviews (47)                            │
│ "Amazing view, super clean!" - Sarah, US   │
│ "Great location, helpful host" - Kim, KR   │
│ [See all reviews]                          │
└────────────────────────────────────────────┘
```

---

## Success Metrics

| Metric     | Month 1 | Month 6 | Month 12 |
| ---------- | ------- | ------- | -------- |
| Managers   | 20      | 200     | 1,000    |
| Properties | 30      | 500     | 3,000    |
| Bookings   | 50      | 1,500   | 10,000   |
| GMV        | $5K     | $150K   | $1M      |
| Cities     | 2       | 10      | 30       |

---

**This file provides Accommodations vertical context for Claude Code sessions.**

**Last Updated:** 2026-01-26
**Status:** Planning
**Priority:** HIGH - Large market, complements Tours vertical
