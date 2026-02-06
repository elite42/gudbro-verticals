# Tours - Claude Code Context

**Vertical:** Tour Operators / Transport Services / Street Vendors
**Tech Stack:** Next.js 14 (Frontend planned) + Express (Backend planned)
**Port:** 3025 (backend), 3026 (frontend)
**Languages:** EN, VI, KO, ZH, JA (high priority for tourism)
**Status:** 📋 Planned - Structure Created
**Last Updated:** 2026-01-26

---

## Quick Context

This is a **tour booking and transport services platform**, designed for:

- Small tour operators
- Street vendors selling tours
- Motorbike/car transport services
- Airport transfer services
- Day trip organizers

**Target Market:** Vietnam (Da Nang, Hoi An, Ho Chi Minh, Hanoi) - high tourist areas

---

## The Problem We Solve

### Current Situation (Street Vendors / Small Operators)

```
❌ Cardboard signs with prices in VND only
❌ 1-2 languages max (Vietnamese + basic English)
❌ Can't explain tour details (duration, what's included, pickup)
❌ Tourists don't understand → don't buy
❌ No way to book in advance
❌ No digital presence
❌ Lost sales to bigger operators with apps
```

### Our Solution

```
✅ QR Code Menu with all tours/services
✅ Prices in multiple currencies (VND, USD, EUR, AUD, KRW, JPY, CNY)
✅ Auto-translation to 20+ languages
✅ Full details: photos, duration, included/excluded, route map
✅ Direct booking + payment
✅ WhatsApp/Telegram/Zalo confirmation
✅ Simple setup - just scan and go
```

---

## Project Structure

```
apps/tours/
├── backend/                # Express API (Port 3025) 📋 PLANNED
│   ├── server.js          # Main entry point
│   ├── routes/            # API routes
│   │   ├── tours.js       # Tour listings
│   │   ├── bookings.js    # Booking management
│   │   ├── transport.js   # Transport services
│   │   └── reviews.js     # Customer reviews
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   └── db/                # Database setup
│
├── frontend/              # Next.js 14 App (Port 3026) 📋 PLANNED
│   ├── app/               # App Router
│   │   ├── page.tsx       # Homepage - Tour categories
│   │   ├── tours/         # Browse tours
│   │   ├── transport/     # Transport services
│   │   ├── booking/       # Booking flow
│   │   └── [tourId]/      # Tour detail page
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   └── public/            # Static assets
│
├── db/                    # Database schemas
│   └── schema.sql         # PostgreSQL schema
│
└── VERTICAL-CONTEXT.md    # This file
```

---

## Service Categories

### 1. Day Tours

| Example             | Duration | Typical Price |
| ------------------- | -------- | ------------- |
| Marble Mountains    | 3h       | $10-15        |
| Ba Na Hills         | Full day | $30-50        |
| Hoi An Ancient Town | 4h       | $15-20        |
| My Son Sanctuary    | 5h       | $20-30        |
| Cham Islands        | Full day | $30-40        |

### 2. Transport Services

| Example               | Duration | Typical Price |
| --------------------- | -------- | ------------- |
| Airport Transfer      | 30min    | $10-15        |
| Hotel → Beach         | 15min    | $3-5          |
| City Tour (motorbike) | 2h       | $10-15        |
| Hoi An → Da Nang      | 45min    | $15-20        |

### 3. Multi-Day Tours

| Example           | Duration | Typical Price |
| ----------------- | -------- | ------------- |
| Hue Imperial City | 2 days   | $80-120       |
| Phong Nha Caves   | 3 days   | $150-200      |
| Ha Long Bay       | 2 days   | $100-150      |

### 4. Special Experiences

| Example         | Duration | Typical Price |
| --------------- | -------- | ------------- |
| Cooking Class   | 3h       | $25-35        |
| Lantern Making  | 2h       | $15-20        |
| Fishing Village | 4h       | $20-30        |
| Sunset Cruise   | 2h       | $25-40        |

---

## Data Models

### Tour

```typescript
interface Tour {
  id: string;
  name: string;
  description: string;
  category: 'day_tour' | 'transport' | 'multi_day' | 'experience';

  // Pricing
  priceVND: number;
  priceUSD: number;
  pricePerPerson: boolean; // vs per vehicle
  minPeople: number;
  maxPeople: number;

  // Details
  duration: string; // "3 hours", "Full day", "2 days"
  distance?: string; // "25km"

  // Inclusions
  included: string[]; // ["Pickup", "English guide", "Entrance fees"]
  excluded: string[]; // ["Lunch", "Tips", "Personal expenses"]

  // Media
  images: string[];
  routeMapUrl?: string;

  // Logistics
  pickupLocations: string[];
  departureTime: string; // "08:00" or "Flexible"

  // Reviews
  rating: number;
  reviewCount: number;

  // Operator
  operatorId: string;
  operatorName: string;
  operatorPhone: string;
  operatorWhatsApp?: string;
  operatorZalo?: string;
}
```

### Booking

```typescript
interface TourBooking {
  id: string;
  tourId: string;

  // Customer
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerCountry: string;
  customerLanguage: string;

  // Booking details
  date: Date;
  time: string;
  numberOfPeople: number;
  pickupLocation: string;
  specialRequests?: string;

  // Pricing
  totalPriceVND: number;
  totalPriceUSD: number;

  // Status
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'deposit' | 'paid';

  // Communication
  confirmedVia: 'whatsapp' | 'zalo' | 'telegram' | 'sms';
}
```

### Operator

```typescript
interface TourOperator {
  id: string;
  name: string;
  type: 'individual' | 'small_business' | 'agency';

  // Contact
  phone: string;
  whatsApp?: string;
  zalo?: string;
  telegram?: string;

  // Location
  area: string; // "Da Nang Beach", "Hoi An Old Town"

  // Verification
  verified: boolean;
  licenseNumber?: string;

  // Stats
  totalTours: number;
  totalBookings: number;
  rating: number;
}
```

---

## Multi-Currency Support (Critical)

### Display Currencies

```typescript
const SUPPORTED_CURRENCIES = {
  VND: { symbol: '₫', decimals: 0, name: 'Vietnamese Dong' },
  USD: { symbol: '$', decimals: 2, name: 'US Dollar' },
  EUR: { symbol: '€', decimals: 2, name: 'Euro' },
  AUD: { symbol: 'A$', decimals: 2, name: 'Australian Dollar' },
  GBP: { symbol: '£', decimals: 2, name: 'British Pound' },
  KRW: { symbol: '₩', decimals: 0, name: 'Korean Won' },
  JPY: { symbol: '¥', decimals: 0, name: 'Japanese Yen' },
  CNY: { symbol: '¥', decimals: 2, name: 'Chinese Yuan' },
  THB: { symbol: '฿', decimals: 2, name: 'Thai Baht' },
  SGD: { symbol: 'S$', decimals: 2, name: 'Singapore Dollar' },
};
```

### Price Display

```
250,000₫ ≈ $10 USD
```

Auto-detect user's country → show their currency first.

---

## i18n Priority Languages

| Language   | Code | Priority | Reason                    |
| ---------- | ---- | -------- | ------------------------- |
| English    | EN   | P0       | International tourists    |
| Vietnamese | VI   | P0       | Local + context           |
| Korean     | KO   | P1       | Large tourist segment     |
| Chinese    | ZH   | P1       | Growing market            |
| Japanese   | JA   | P1       | Premium tourists          |
| Russian    | RU   | P2       | Beach tourists            |
| French     | FR   | P2       | Colonial history interest |
| German     | DE   | P2       | Backpackers               |

---

## Key Differentiators from Other Verticals

### vs Coffeeshop (Menu)

| Aspect        | Coffeeshop      | Tours                 |
| ------------- | --------------- | --------------------- |
| Product       | Food/drinks     | Experiences           |
| Pricing       | Per item        | Per person or vehicle |
| Duration      | Instant         | Hours/days            |
| Location      | Fixed           | Moving/routes         |
| Booking       | Order now       | Schedule ahead        |
| Communication | Kitchen display | WhatsApp/Zalo         |

### vs Wellness (Booking)

| Aspect         | Wellness         | Tours           |
| -------------- | ---------------- | --------------- |
| Provider       | Fixed spa        | Mobile operator |
| Location       | Business address | Pickup anywhere |
| Duration       | 30-120 min       | Hours to days   |
| Multi-currency | Less critical    | Essential       |
| Group size     | Usually 1        | Often groups    |
| Route/Map      | Not needed       | Essential       |

---

## UI/UX Considerations

### Mobile-First (Critical)

- Tourists scan QR with phone
- Must work on any device
- Fast load on 3G/4G
- Offline-capable for saved tours

### Visual Design

- High-quality tour photos
- Clear pricing (multi-currency)
- Easy-to-read on bright sunlight
- Big buttons for booking
- Trust signals (reviews, verified)

### Booking Flow

```
1. Scan QR → Tour Menu
2. Browse tours (filter by category)
3. Select tour → See details
4. Choose date/time/people
5. Enter contact info
6. Confirm via WhatsApp/Zalo
7. Receive confirmation + pickup details
```

---

## Integration Points

### Communication

```typescript
// WhatsApp Business API
const sendWhatsAppConfirmation = async (booking: TourBooking) => {
  // Send booking confirmation
  // Include: tour name, date, pickup, operator contact
};

// Zalo API (Vietnam popular)
const sendZaloConfirmation = async (booking: TourBooking) => {
  // Same flow for Zalo users
};
```

### Maps

```typescript
// Show tour route
const TourRouteMap = ({ tour }) => (
  <GoogleMap
    route={tour.routePoints}
    markers={tour.stops}
  />
);
```

### Payments

- Cash on pickup (default)
- VNPay (Vietnam)
- Momo (Vietnam mobile wallet)
- Stripe (international cards)
- Crypto (future - see coffeeshop)

---

## GUDBRO Partnership Network (Planned)

### Concept

Cross-merchant partnership system that creates value for all parties in the GUDBRO ecosystem.

### How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Coffeeshop │◄───►│    Tours    │◄───►│   Wellness  │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                   ▲                   ▲
       └───────────────────┴───────────────────┘
                    Cliente GUDBRO
```

### Requirements

1. **Customer must have GUDBRO account** (unified cross-app)
2. **Merchant must have partnership agreement** with other merchants
3. **Partnerships are bidirectional** - both parties benefit

### Example Flow

```
1. Mario creates account at "Café Bella" (coffeeshop GUDBRO)
2. "Café Bella" has partnership with "Minh's Tours"
3. Mario opens Tours PWA → sees "Offerte per clienti Café Bella"
4. Mario books tour with 10% discount
5. Café Bella receives 5% commission (hidden from customer)
```

### Value Proposition

| Who                   | Benefit                                     |
| --------------------- | ------------------------------------------- |
| **Customer**          | Exclusive discounts (-10%, -15%, etc.)      |
| **Referrer Merchant** | Passive commission income (optional, 3-10%) |
| **Provider Merchant** | Qualified leads from trusted sources        |
| **GUDBRO**            | Sticky ecosystem, reduced churn             |

### Business Model Impact

- Merchant pays subscription ($30/month example)
- Referring 3-4 customers/month → earns $20-40 commission
- **Subscription pays for itself** → incentive to stay and promote

### Data Model

```typescript
interface MerchantPartnership {
  id: string;
  merchantA_id: string; // Referrer (e.g., coffeeshop)
  merchantB_id: string; // Provider (e.g., tour operator)

  // Customer benefit
  discountPercent: number; // Visible to customer (e.g., 10%)
  discountType: 'percentage' | 'fixed';

  // Merchant benefit (optional)
  commissionPercent?: number; // Hidden from customer (e.g., 5%)
  commissionTo: 'referrer' | 'provider' | 'split';

  // Terms
  validFrom: Date;
  validUntil?: Date;
  maxUsesPerCustomer?: number;
  terms: string;

  // Status
  status: 'pending' | 'active' | 'paused' | 'expired';
}

interface CustomerMerchantAffiliation {
  customerId: string;
  merchantId: string; // Which merchant "knows" the customer
  firstVisit: Date;
  lastVisit: Date;
  totalOrders: number;
}
```

### UI Integration

**In Tours PWA:**

- Section "GUDBRO Perks" or "Partner Deals" on homepage
- Badge on cards showing partnership discount
- Filter to see only partnered offers
- Only visible to logged-in users with affiliations

**In Backoffice:**

- Partnership management dashboard
- Create/edit partnership agreements
- Track referral conversions
- Commission reports

### Development Phase

- **Phase 4+** (after core features stable)
- Requires unified account system (P5)
- Requires cross-vertical data sharing

---

## Operator Onboarding

### Simple Flow

```
1. Scan QR → "Become an Operator"
2. Enter business details
3. Add first tour (guided wizard)
4. Get personalized QR code
5. Print and display
6. Start receiving bookings
```

### Tier Pricing (Suggested)

| Tier  | Tours     | Price  | Features                 |
| ----- | --------- | ------ | ------------------------ |
| Free  | 3         | $0     | Basic listing            |
| Basic | 10        | $5/mo  | Analytics                |
| Pro   | Unlimited | $15/mo | Priority, multi-location |

---

## Example Tour Page

```
┌────────────────────────────────────────┐
│ 🏍️ Marble Mountains Adventure         │
│ ⭐ 4.8 (127 reviews)                   │
├────────────────────────────────────────┤
│ [Photo Gallery - 5 images]             │
├────────────────────────────────────────┤
│ Duration: 3 hours                      │
│ Distance: 25km round trip              │
│ Group: 1-4 people                      │
├────────────────────────────────────────┤
│ 💰 250,000₫ / $10 per person           │
├────────────────────────────────────────┤
│ ✅ Included:                           │
│ • Hotel pickup & drop-off              │
│ • English-speaking driver              │
│ • Entrance fees                        │
│ • Bottled water                        │
│                                        │
│ ❌ Not included:                       │
│ • Lunch                                │
│ • Tips                                 │
│ • Cable car (optional 100,000₫)        │
├────────────────────────────────────────┤
│ 🗺️ [Route Map]                        │
│ Da Nang → Marble Mountains → Da Nang   │
├────────────────────────────────────────┤
│ ⏰ Departure: 8:00 AM or 2:00 PM       │
├────────────────────────────────────────┤
│ [    📅 BOOK NOW    ]                  │
└────────────────────────────────────────┘
```

---

## Development Phases

### Phase 1: MVP (1 week)

- [ ] Basic tour listing page
- [ ] Tour detail page
- [ ] Simple booking form
- [ ] WhatsApp confirmation
- [ ] Multi-currency display
- [ ] 5 languages (EN, VI, KO, ZH, JA)

### Phase 2: Features (1 week)

- [ ] Operator dashboard
- [ ] Booking management
- [ ] Review system
- [ ] Route maps
- [ ] Photo galleries

### Phase 3: Growth (ongoing)

- [ ] Payment integration
- [ ] Verified operators
- [ ] Featured tours
- [ ] Seasonal pricing
- [ ] Group discounts

---

## Competition Analysis

### Direct Competitors

| Competitor   | Pros                 | Cons                                |
| ------------ | -------------------- | ----------------------------------- |
| Klook        | Big catalog, trusted | High commission, no small operators |
| GetYourGuide | International reach  | Expensive for operators             |
| Viator       | Well-known           | Same issues                         |

### Our Advantage

- **For small operators:** No commission, simple setup
- **For tourists:** Local prices, authentic experiences
- **For both:** Multi-language, multi-currency, instant communication

---

## Success Metrics

| Metric       | Target (Month 1) | Target (Month 6) |
| ------------ | ---------------- | ---------------- |
| Operators    | 10               | 100              |
| Tours listed | 30               | 500              |
| Bookings     | 50               | 1,000            |
| Languages    | 5                | 10               |
| Cities       | 1 (Da Nang)      | 5                |

---

## Quick Start

```bash
# When ready to develop:
cd apps/tours

# Backend
cd backend
npm init -y
npm install express cors dotenv
# Create server.js, routes, etc.

# Frontend
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
npm run dev
```

---

**This file provides Tours vertical context for Claude Code sessions.**

**Last Updated:** 2026-01-26
**Status:** Structure Created, Development Pending
**Priority:** HIGH - Strong market fit for Vietnam tourism
