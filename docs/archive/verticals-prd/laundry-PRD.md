# GUDBRO Laundry - Product Requirements Document

**Product:** GUDBRO Laundry PWA
**Version:** 1.0
**Status:** Planning
**Last Updated:** 2026-01-27
**Author:** GUDBRO Team

---

## 1. Vision & Mission

### Vision

Become the go-to digital laundry platform in Vietnam, making laundry services accessible, transparent, and hassle-free for tourists, expats, and locals alike.

### Mission

Provide a simple, multilingual PWA that:

1. Eliminates the language barrier between customers and laundry shops
2. Makes pricing transparent and upfront (no surprises)
3. Enables digital ordering with real-time tracking
4. Connects laundry shops with a steady stream of customers through the GUDBRO ecosystem

### Value Proposition

| For Customers                          | For Laundry Shops                     | For GUDBRO Ecosystem               |
| -------------------------------------- | ------------------------------------- | ---------------------------------- |
| Clear pricing in their language        | Digital orders instead of paper chaos | New vertical revenue stream        |
| Visual garment selection (no guessing) | Fewer miscommunication errors         | Cross-sell from accommodations     |
| Real-time tracking                     | Recurring customer base               | Partner commission model (85/10/5) |
| Pickup/delivery option                 | Professional digital presence         | Data on guest spending patterns    |
| Multi-currency (VND/USD/EUR)           | Order history & analytics             | Network effect with stays & tours  |

---

## 2. Market Context

### The Problem (Vietnam-Specific)

Laundry services in Vietnam's tourist areas suffer from several pain points:

| Problem                  | Impact                                                        |
| ------------------------ | ------------------------------------------------------------- |
| **Language barrier**     | Tourists can't explain garment types or service preferences   |
| **Opaque pricing**       | No visible price list; prices vary per customer (tourist tax) |
| **Paper-based ordering** | Handwritten forms with garment names in Vietnamese only       |
| **No tracking**          | "Come back tomorrow" with no real ETA                         |
| **No delivery**          | Customer must physically return to pick up                    |
| **Lost items**           | No digital record of what was handed in                       |
| **Cash only**            | No digital payment options                                    |

### Market Opportunity

- **Vietnam tourism:** 17.5M international visitors (2025), growing 15% YoY
- **Da Nang/Hoi An corridor:** 5M+ tourists/year, high density of laundry shops
- **Digital nomad population:** 50,000+ in Vietnam, recurring laundry needs
- **Expat community:** Growing, values convenience and reliability
- **Hotel outsourcing trend:** Many small hotels don't have in-house laundry, outsource to local shops

### Competitive Landscape

| Competitor      | Model             | Weakness                                 |
| --------------- | ----------------- | ---------------------------------------- |
| Walk-in shops   | Paper, cash only  | No digital presence, language barrier    |
| Hotel concierge | Manual forwarding | Expensive, slow, limited to hotel guests |
| Grab services   | Delivery platform | Not laundry-specific, limited coverage   |
| None (gap)      | Digital-first PWA | **GUDBRO fills this gap**                |

---

## 3. Target Users

### Persona 1: Walk-in Tourist - "Emma"

- **Demographics:** 25-40, international tourist visiting Da Nang/Hoi An
- **Context:** Staying 5-14 days, accumulates dirty clothes
- **Pain:** Sees laundry shop but can't read Vietnamese price list, unsure what services are available
- **Behavior:** Scans QR code on shop window, browses services and prices on phone
- **Goal:** Get clothes cleaned without miscommunication, know when they'll be ready

### Persona 2: Recurring Customer - "Alex"

- **Demographics:** 28-45, digital nomad or long-term expat
- **Context:** Lives in Da Nang, does laundry weekly
- **Pain:** Repeats same order every week, wants it faster
- **Behavior:** Opens PWA at home, submits order, schedules pickup
- **Goal:** Automate weekly laundry with minimal effort, delivery to door

### Persona 3: Hotel Guest (GUDBRO Stays) - "Sarah"

- **Demographics:** 25-50, staying at a GUDBRO accommodation
- **Context:** Hotel doesn't have in-house laundry, refers to partner shop
- **Pain:** Doesn't know where to go, language barrier
- **Behavior:** Taps "Laundry" in the in-stay dashboard, redirected to nearest partner laundry
- **Goal:** Seamless laundry experience without leaving the accommodation app

### Persona 4: Local Vietnamese Customer - "Linh"

- **Demographics:** 25-40, urban professional
- **Context:** Busy work schedule, prefers drop-off/pickup laundry
- **Pain:** Wants reliable service with tracking
- **Behavior:** Uses PWA in Vietnamese, schedules regular pickups
- **Goal:** Convenient, trackable laundry service with delivery

---

## 4. User Journeys

### Journey A: Walk-in → QR Scan → Service Browse → Drop-off → Track → Pickup

```
┌─────────────────────────────────────────────────────────────────┐
│  WALK-IN JOURNEY                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  1. DISCOVER                                                       │
│     └─ Customer sees QR code on shop window/counter               │
│     └─ Scans QR → laundry.gudbro.com/{shop-slug}                 │
│                                                                    │
│  2. BROWSE                                                         │
│     └─ Sees service catalog with prices (in their language)       │
│     └─ Wash & Fold: 25.000₫/kg                                   │
│     └─ Dry Cleaning: per-item pricing with photos                 │
│     └─ Express available (+50%)                                    │
│                                                                    │
│  3. ORDER                                                          │
│     └─ Selects garments with visual picker                        │
│     └─ Chooses service type per garment                           │
│     └─ Sees real-time price estimate                              │
│     └─ Adds special notes (stains, delicates)                     │
│     └─ Submits order                                               │
│                                                                    │
│  4. DROP-OFF                                                       │
│     └─ Hands clothes to shop staff                                │
│     └─ Staff confirms items received                              │
│     └─ Gets estimated ready time                                  │
│                                                                    │
│  5. TRACK                                                          │
│     └─ Checks status in PWA anytime                               │
│     └─ Receives WhatsApp/Zalo notification when ready             │
│                                                                    │
│  6. PICKUP                                                         │
│     └─ Returns to shop, shows order ID                            │
│     └─ Collects clothes, confirms delivery                        │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Journey B: Recurring → PWA → Submit Order → Pickup at Door → Track → Delivery Back

```
┌─────────────────────────────────────────────────────────────────┐
│  RECURRING CUSTOMER JOURNEY                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  1. OPEN PWA                                                       │
│     └─ Customer opens bookmarked PWA                              │
│     └─ Sees order history, can "Reorder last"                     │
│                                                                    │
│  2. SUBMIT ORDER                                                   │
│     └─ Selects garments (pre-filled from last order or manual)    │
│     └─ Chooses delivery pickup time slot                          │
│     └─ Confirms address                                            │
│                                                                    │
│  3. PICKUP                                                         │
│     └─ Driver picks up bag at scheduled time                      │
│     └─ Staff weighs & confirms items at shop                      │
│     └─ Final price confirmed                                      │
│                                                                    │
│  4. TRACK                                                          │
│     └─ Real-time status updates:                                  │
│        received → washing → drying → ironing → ready             │
│                                                                    │
│  5. DELIVERY                                                       │
│     └─ Notification: "Your laundry is ready!"                     │
│     └─ Driver delivers to address                                 │
│     └─ Customer confirms receipt                                  │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Journey C: From GUDBRO Accommodation → Deep Link → Partner Laundry

```
┌─────────────────────────────────────────────────────────────────┐
│  ACCOMMODATION GUEST JOURNEY                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  1. IN-STAY DASHBOARD                                              │
│     └─ Guest taps "Laundry" in services menu                     │
│                                                                    │
│  2. REDIRECT                                                       │
│     └─ Deep link to nearest partner laundry:                      │
│        laundry.gudbro.com/order?guest=Sarah&room=203              │
│          &hotel=beach-view-apt                                     │
│     └─ Guest data pre-filled from booking                         │
│                                                                    │
│  3. ORDER                                                          │
│     └─ Same garment selection flow as walk-in                     │
│     └─ Delivery address = hotel (auto-filled)                     │
│     └─ Price shown in guest's preferred currency                  │
│                                                                    │
│  4. FULFILLMENT                                                    │
│     └─ Laundry shop picks up from hotel reception                 │
│     └─ Returns clean clothes to reception                         │
│     └─ Guest notified via PWA/WhatsApp                            │
│                                                                    │
│  5. COMMISSION                                                     │
│     └─ Standard GUDBRO model:                                     │
│        85% Laundry Shop | 10% Accommodation | 5% GUDBRO          │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Core Features

### 5.1 Service Catalog

Public-facing catalog showing all available services with transparent pricing.

- Service categories with descriptions and photos
- Pricing: per-kg (standard) + per-item (specialty garments)
- Multi-language display (EN/VI/KO/ZH)
- Multi-currency pricing (VND/USD/EUR)
- Operating hours and turnaround times
- Express service availability

### 5.2 Visual Garment Selection

Icon-based garment picker that eliminates language barriers.

**Garment Types (with icons):**

| Icon | Garment   | VI             | KO       | ZH     |
| ---- | --------- | -------------- | -------- | ------ |
| 👔   | Shirt     | Áo sơ mi       | 셔츠     | 衬衫   |
| 👕   | T-Shirt   | Áo thun        | 티셔츠   | T恤    |
| 👖   | Pants     | Quần dài       | 바지     | 裤子   |
| 🩳   | Shorts    | Quần short     | 반바지   | 短裤   |
| 👗   | Dress     | Váy đầm        | 드레스   | 连衣裙 |
| 👘   | Skirt     | Chân váy       | 스커트   | 裙子   |
| 🧥   | Jacket    | Áo khoác       | 재킷     | 夹克   |
| 🩲   | Underwear | Đồ lót         | 속옷     | 内衣   |
| 🧦   | Socks     | Tất            | 양말     | 袜子   |
| 🧺   | Towel     | Khăn tắm       | 수건     | 毛巾   |
| 🛏️   | Bedsheet  | Ga trải giường | 침대시트 | 床单   |
| 👟   | Shoes     | Giày           | 신발     | 鞋子   |
| 🧣   | Scarf     | Khăn quàng     | 스카프   | 围巾   |
| 👔   | Suit      | Bộ vest        | 정장     | 西装   |
| 📦   | Other     | Khác           | 기타     | 其他   |

### 5.3 Real-Time Price Calculator

Dynamic pricing engine that shows costs as the customer builds their order.

- **Per-kg pricing:** Standard wash & fold calculated by estimated weight
- **Per-item pricing:** Specialty garments (suits, dresses, shoes) priced individually
- **Express surcharge:** +50% for same-day/4h service
- **Delivery fee:** Based on distance from shop
- **Currency toggle:** Instant conversion VND ↔ USD ↔ EUR

### 5.4 Service Types

| Service         | Description                          | Pricing Model  | Turnaround |
| --------------- | ------------------------------------ | -------------- | ---------- |
| **Wash & Fold** | Machine wash, tumble dry, folded     | Per kg         | 24h        |
| **Wash & Iron** | Machine wash, pressed/ironed         | Per kg + extra | 24-36h     |
| **Dry Clean**   | Professional dry cleaning            | Per item       | 48-72h     |
| **Iron Only**   | Pressing/ironing service only        | Per item       | 12-24h     |
| **Shoe Clean**  | Professional shoe cleaning/polishing | Per pair       | 24-48h     |
| **Express**     | Any service with rush processing     | +50% surcharge | 4-8h       |

### 5.5 Order Tracking

Real-time status updates with push notifications.

```
Order Status Flow:
──────────────────────────────────────────────────────

  📥 Received    →    🔄 Washing    →    💨 Drying
       │                                      │
       └──────────────────────────────────────┘
                                               │
  📦 Ready       ←    👔 Ironing    ←─────────┘
       │
       ▼
  🚗 Delivered (if delivery selected)
       │
       ▼
  ✅ Completed
```

**Notification triggers:**

- Order confirmed (received at shop)
- Processing started (washing)
- Ready for pickup/delivery
- Out for delivery
- Pickup reminder (if not collected within 48h)

**Channels:** WhatsApp, Zalo, PWA push notification

### 5.6 Pickup & Delivery

Optional pickup and delivery service for customer convenience.

| Distance from shop | Pickup Fee    | Delivery Fee  |
| ------------------ | ------------- | ------------- |
| < 500m             | Free          | Free          |
| 500m - 2km         | 15.000₫       | 15.000₫       |
| 2km - 5km          | 30.000₫       | 30.000₫       |
| > 5km              | Not available | Not available |

- Scheduled time slots (morning/afternoon/evening)
- Driver tracking (Phase 3)
- Minimum order value for free delivery

### 5.7 Order History & Reorder

For recurring customers:

- Full order history with details and receipts
- "Reorder last" one-tap functionality
- Favorite garment combinations saved
- Spending analytics (monthly summary)
- Loyalty program integration (Phase 3)

---

## 6. Pricing Model

### Standard Pricing (Baseline)

| Service     | Unit     | Price (VND) | Price (USD) | Price (EUR) |
| ----------- | -------- | ----------- | ----------- | ----------- |
| Wash & Fold | per kg   | 25.000₫     | $1.00       | €0.95       |
| Wash & Iron | per kg   | 35.000₫     | $1.40       | €1.30       |
| Iron Only   | per item | 10.000₫     | $0.40       | €0.38       |

### Specialty Per-Item Pricing

| Item           | Wash & Iron (VND) | Dry Clean (VND) |
| -------------- | ----------------- | --------------- |
| Shirt          | 20.000₫           | 40.000₫         |
| T-Shirt        | 15.000₫           | -               |
| Pants          | 25.000₫           | 45.000₫         |
| Dress          | 35.000₫           | 50.000₫         |
| Suit (2-piece) | 60.000₫           | 80.000₫         |
| Jacket         | 40.000₫           | 60.000₫         |
| Shoes (pair)   | -                 | 60.000₫         |
| Bedsheet       | 30.000₫           | -               |

### Surcharges

| Type             | Surcharge     |
| ---------------- | ------------- |
| Express (4-8h)   | +50%          |
| Stain treatment  | +20.000₫/item |
| Delicate fabrics | +30%          |

> **Note:** Prices are configurable per laundry shop. These are baseline defaults that shops can adjust in their profile.

---

## 7. Connection with Accommodations

### Integration Architecture

```
┌────────────────────────────────────────────────────────────────┐
│  GUDBRO STAYS (In-Stay Dashboard)                                │
│                                                                   │
│  Guest taps "Laundry" in services                                │
│          │                                                        │
│          ▼                                                        │
│  ┌─── Deep Link ───────────────────────────────────────────┐    │
│  │  laundry.gudbro.com/order                                │    │
│  │    ?guest=Sarah+Johnson                                   │    │
│  │    &room=203                                              │    │
│  │    &hotel=beach-view-apt                                  │    │
│  │    &checkin=2026-01-15                                    │    │
│  │    &checkout=2026-01-18                                   │    │
│  │    &lang=en                                               │    │
│  │    &currency=USD                                          │    │
│  └──────────────────────────────────────────────────────────┘    │
│          │                                                        │
│          ▼                                                        │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  GUDBRO LAUNDRY PWA                                       │    │
│  │                                                            │    │
│  │  • Guest data pre-filled                                  │    │
│  │  • Nearest partner laundry auto-selected                  │    │
│  │  • Delivery address = hotel (pre-filled)                  │    │
│  │  • Language & currency inherited from stays               │    │
│  └──────────────────────────────────────────────────────────┘    │
│          │                                                        │
│          ▼                                                        │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  COMMISSION MODEL (per order)                              │    │
│  │                                                            │    │
│  │  Customer pays: 145.000₫                                  │    │
│  │  Laundry Shop:  123.250₫  (85%)                           │    │
│  │  Accommodation:  14.500₫  (10%)                           │    │
│  │  GUDBRO:          7.250₫  (5%)                            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
└────────────────────────────────────────────────────────────────┘
```

### Partner Visibility

- The laundry shop appears in the accommodation's in-stay dashboard under "Services"
- Marked as "Partner" with GUDBRO verified badge
- Distance from property displayed
- Rating and reviews visible
- Turnaround time shown

### Data Flow

| Data Point    | Source         | Passed Via |
| ------------- | -------------- | ---------- |
| Guest name    | Booking        | URL params |
| Room number   | Booking        | URL params |
| Hotel slug    | Property       | URL params |
| Check-in/out  | Booking        | URL params |
| Language pref | Guest settings | URL params |
| Currency pref | Guest settings | URL params |

---

## 8. Technical Architecture

### Project Structure

```
apps/laundry/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                    # Landing / Shop directory
│   │   ├── [slug]/
│   │   │   └── page.tsx                # Shop page (catalog + info)
│   │   ├── services/
│   │   │   └── page.tsx                # Full service catalog
│   │   ├── order/
│   │   │   ├── page.tsx                # New order (garment selection)
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Order tracking
│   │   ├── promotions/
│   │   │   └── page.tsx                # Active promotions
│   │   └── history/
│   │       └── page.tsx                # Order history (recurring)
│   ├── components/
│   │   ├── catalog/
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── PriceTable.tsx
│   │   │   └── ServiceGrid.tsx
│   │   ├── order/
│   │   │   ├── GarmentPicker.tsx       # Visual garment selection
│   │   │   ├── ServiceSelector.tsx     # Service type per garment
│   │   │   ├── PriceCalculator.tsx     # Real-time price display
│   │   │   ├── ExpressToggle.tsx
│   │   │   ├── SpecialNotes.tsx
│   │   │   └── OrderSummary.tsx
│   │   ├── tracking/
│   │   │   ├── StatusTracker.tsx       # Visual status pipeline
│   │   │   ├── OrderTimeline.tsx
│   │   │   └── DeliveryMap.tsx         # Phase 3
│   │   └── shared/
│   │       ├── Header.tsx
│   │       ├── BottomNav.tsx
│   │       ├── CurrencyToggle.tsx
│   │       ├── LanguageSelector.tsx
│   │       └── WhatsAppButton.tsx
│   ├── lib/
│   │   ├── types.ts
│   │   ├── mock-data.ts               # Mock data (Phase 1)
│   │   ├── pricing.ts                 # Price calculation logic
│   │   └── utils.ts
│   └── public/
│       ├── icons/                      # Garment icons
│       └── images/                     # Shop photos
└── PRD.md                              # This document
```

### Tech Stack

| Layer          | Technology                                 |
| -------------- | ------------------------------------------ |
| Framework      | Next.js 14 (App Router)                    |
| Styling        | Tailwind CSS                               |
| Icons          | Phosphor Icons (duotone weight)            |
| Database       | Supabase (PostgreSQL) - Phase 2            |
| PWA            | next-pwa / service worker                  |
| Notifications  | WhatsApp Business API, Zalo                |
| Multi-language | next-intl or custom i18n                   |
| Multi-currency | Static rates (Phase 1), live API (Phase 2) |

### Design Principles

- **Mobile-first:** 95%+ users will access via phone
- **Zen-clean:** Minimal, calming UI — no visual clutter
- **Icon-driven:** Visual garment selection reduces text dependency
- **Instant feedback:** Real-time price updates as user selects items
- **Offline-capable:** PWA with service worker for basic catalog browsing
- **Fast:** Target < 2s first contentful paint

### Data Model

```typescript
interface LaundryShop {
  id: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  whatsapp?: string;
  zalo?: string;

  // Operating
  operatingHours: OperatingHours[];
  turnaroundHours: number; // Standard turnaround
  expressAvailable: boolean;
  deliveryAvailable: boolean;
  deliveryRadius: number; // meters

  // Pricing
  pricePerKg: number; // Base wash & fold
  priceList: PriceItem[];
  currency: 'VND';
  expressSurcharge: number; // Percentage (e.g., 50)

  // Display
  photos: string[];
  rating: number;
  reviewCount: number;
  isGudbroPartner: boolean;

  // Status
  isActive: boolean;
  createdAt: Date;
}

interface PriceItem {
  garmentType: GarmentType;
  service: LaundryServiceType;
  price: number;
  unit: 'item' | 'kg' | 'pair';
}

interface LaundryOrder {
  id: string;
  shopId: string;
  orderNumber: string; // e.g., "LD-2026-001234"

  // Customer
  customerName: string;
  customerPhone: string;
  customerWhatsApp?: string;

  // Accommodation link (if from GUDBRO Stays)
  accommodationSlug?: string;
  roomNumber?: string;
  bookingId?: string;

  // Items
  items: OrderItem[];

  // Options
  isExpress: boolean;
  specialNotes?: string;
  pickupRequested: boolean;
  deliveryRequested: boolean;
  deliveryAddress?: string;

  // Pricing
  subtotal: number;
  expressSurcharge: number;
  deliveryFee: number;
  total: number;
  currency: 'VND' | 'USD' | 'EUR';

  // Timing
  submittedAt: Date;
  receivedAt?: Date;
  estimatedReadyAt: Date;
  completedAt?: Date;
  deliveredAt?: Date;

  // Tracking
  status:
    | 'submitted'
    | 'received'
    | 'washing'
    | 'drying'
    | 'ironing'
    | 'ready'
    | 'out_for_delivery'
    | 'delivered'
    | 'completed';

  // Commission (for partner orders)
  commission?: {
    shopAmount: number; // 85%
    partnerAmount: number; // 10% (accommodation)
    gudbroAmount: number; // 5%
  };
}

interface OrderItem {
  garmentType: GarmentType;
  service: LaundryServiceType;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
  notes?: string;
}

type GarmentType =
  | 'shirt'
  | 't_shirt'
  | 'pants'
  | 'shorts'
  | 'dress'
  | 'skirt'
  | 'jacket'
  | 'underwear'
  | 'socks'
  | 'towel'
  | 'bedsheet'
  | 'shoes'
  | 'scarf'
  | 'suit'
  | 'other';

type LaundryServiceType =
  | 'wash_fold'
  | 'wash_iron'
  | 'dry_clean'
  | 'iron_only'
  | 'shoe_clean';

interface OperatingHours {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  openTime: string; // "08:00"
  closeTime: string; // "20:00"
  isClosed: boolean;
}
```

---

## 9. MVP Scope

### Phase 1: Static Catalog PWA (like Wellness)

**Goal:** Public-facing PWA with service catalog, pricing, and contact info. No backend, mock data only.

**Features:**

- [ ] Shop landing page with info, photos, operating hours
- [ ] Service catalog with transparent pricing
- [ ] Visual garment type display with icons and translations
- [ ] Multi-language support (EN/VI/KO/ZH)
- [ ] Multi-currency display (VND/USD/EUR)
- [ ] Price calculator (client-side, based on mock pricing)
- [ ] WhatsApp/Zalo contact buttons
- [ ] Google Maps integration (shop location)
- [ ] PWA installable (service worker, manifest)
- [ ] QR code for shop window display
- [ ] Mobile-first responsive design
- [ ] Promotions page (static deals)

**Not included:** Order submission, tracking, delivery, accounts, payments.

### Phase 2: Digital Ordering + Tracking

**Goal:** Full digital order flow with status tracking and notifications.

**Features:**

- [ ] Order submission with garment picker
- [ ] Real-time price calculation
- [ ] Express service option
- [ ] Special notes and instructions
- [ ] Order confirmation (WhatsApp/Zalo/push)
- [ ] Status tracking page with visual pipeline
- [ ] Notification triggers (received, ready, reminder)
- [ ] Order history for returning customers
- [ ] "Reorder last" functionality
- [ ] Shop dashboard (receive orders, update status)
- [ ] Supabase backend integration

### Phase 3: Delivery + Accommodation Integration

**Goal:** Pickup/delivery service and full integration with GUDBRO Stays.

**Features:**

- [ ] Pickup scheduling with time slots
- [ ] Delivery with distance-based pricing
- [ ] Deep link from accommodation in-stay dashboard
- [ ] Guest data pre-fill from booking
- [ ] Commission tracking (85/10/5 model)
- [ ] Partner dashboard in accommodation backoffice
- [ ] Driver assignment and tracking (basic)
- [ ] Loyalty program (points/stamps)
- [ ] Recurring order scheduling (weekly)
- [ ] Payment integration (Phase 3+)

---

## 10. Success Metrics

### Phase 1 Metrics (Month 1-2)

| Metric                     | Target       |
| -------------------------- | ------------ |
| Laundry shops onboarded    | 5            |
| PWA page views             | 500/month    |
| QR scans (shop window)     | 200/month    |
| WhatsApp inquiries via PWA | 50/month     |
| Average session duration   | > 90 seconds |

### Phase 2 Metrics (Month 3-6)

| Metric                   | Target    |
| ------------------------ | --------- |
| Digital orders submitted | 100/month |
| Order completion rate    | > 90%     |
| Repeat customer rate     | > 30%     |
| Average order value      | 120.000₫  |
| Customer satisfaction    | > 4.3/5   |

### Phase 3 Metrics (Month 6-12)

| Metric                     | Target       |
| -------------------------- | ------------ |
| Orders from accommodations | 40% of total |
| Delivery orders            | 25% of total |
| Monthly GMV                | 50M₫         |
| Partner commission revenue | 5M₫/month    |
| GUDBRO fee revenue         | 2.5M₫/month  |

### North Star Metrics

1. **Monthly GMV** - Total laundry order value processed
2. **Accommodation Referral %** - Orders originating from GUDBRO Stays
3. **Repeat Rate** - Customers ordering more than once
4. **Shop Satisfaction** - Partner shop NPS score

---

## 11. Risks & Mitigations

| Risk                                       | Impact | Likelihood | Mitigation                                            |
| ------------------------------------------ | ------ | ---------- | ----------------------------------------------------- |
| Shops don't adopt digital ordering         | High   | Medium     | Phase 1 is just catalog (zero friction for shop)      |
| Tourists prefer to just walk in            | Medium | High       | QR code makes digital entry effortless at the counter |
| Price transparency scares shops            | Medium | Medium     | Shops set their own prices, GUDBRO just displays them |
| Language data (garment translations) wrong | Low    | Medium     | Native speaker review for all translations            |
| Delivery logistics too complex             | Medium | Medium     | Phase 3 only, start with shop-managed delivery        |
| Low volume doesn't justify commission      | Medium | Low        | Phase 1 has zero cost for shops (just visibility)     |

---

## 12. Open Questions

1. **Shop onboarding:** Self-service or GUDBRO team manually adds shops?
2. **Pricing control:** Can shops update prices themselves, or managed by GUDBRO?
3. **Weight estimation:** How to handle per-kg pricing before shop weighs clothes?
4. **Payment:** Cash only in Phase 1-2? When to add digital payments?
5. **Multi-shop:** Should the PWA support browsing multiple shops or one shop per instance?
6. **Loyalty:** Stamp card model (10th wash free) or points-based?
7. **Reviews:** When to add customer reviews for shops?

---

**Document History**

| Version | Date       | Author      | Changes                                                             |
| ------- | ---------- | ----------- | ------------------------------------------------------------------- |
| 1.0     | 2026-01-27 | GUDBRO Team | Initial PRD - Vision, market analysis, features, pricing, MVP scope |
