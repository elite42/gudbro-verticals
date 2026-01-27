# GUDBRO Stays - Product Requirements Document

**Product:** GUDBRO Stays PWA
**Version:** 2.0
**Status:** Planning
**Last Updated:** 2026-01-27
**Author:** GUDBRO Team

---

## 1. Vision & Mission

### Vision

Empowering small accommodation owners in Southeast Asia to compete with OTAs through direct bookings, in-stay services, local partnerships, and the GUDBRO network.

### Mission

Provide a simple, beautiful PWA platform that:

1. Enables direct bookings without high commissions
2. Transforms the guest experience with digital in-stay services
3. Connects guests with trusted local partners (tours, transport, restaurants, wellness)
4. Creates a revenue ecosystem where everyone wins

### Value Proposition

| For Guests                            | For Property Owners              | For Local Partners           |
| ------------------------------------- | -------------------------------- | ---------------------------- |
| Easy booking without app download     | 0% commission on direct bookings | Access to qualified tourists |
| WiFi & info instantly via QR          | Digital menu for all services    | No marketing costs           |
| Local deals & trusted recommendations | Earn commissions on referrals    | Steady referral stream       |
| Multi-language, multi-currency        | Professional online presence     | Part of GUDBRO ecosystem     |

### Core Philosophy: Collaborative Local Ecosystem

> **"GUDBRO unifica e potenzia la collaborazione tra i commercianti della zona."**

Instead of competing individually against Big Tech platforms, GUDBRO creates a **local business alliance** where everyone benefits from collaboration.

```
            ┌─────────────────────────────────────────┐
            │           GUDBRO NETWORK                │
            │     "Commercianti locali, insieme"      │
            └─────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
       ┌─────────┐      ┌─────────┐      ┌─────────┐
       │  🏠     │      │  🍝     │      │  🗺️     │
       │ Alloggi │ ←──→ │ Locali  │ ←──→ │  Tour   │
       └─────────┘      └─────────┘      └─────────┘
            │                 │                 │
            └─────────────────┼─────────────────┘
                              ▼
                        ┌─────────┐
                        │  🧳     │
                        │ Turista │
                        └─────────┘
```

**Traditional Model (Competition):**

- Each business fights alone
- Pays 25-30% to external platforms (Booking, Grab, Airbnb)
- Competes with others for visibility
- Margins shrink continuously

**GUDBRO Model (Collaboration):**

- Accommodation recommends → Restaurant
- Restaurant recommends → Tour
- Tour recommends → Another GUDBRO accommodation
- **Everyone earns from the network**

**Ecosystem Benefits:**

| Actor               | Collaborative Advantage                           |
| ------------------- | ------------------------------------------------- |
| **Accommodation**   | Earns from every referral, happier guests         |
| **Restaurant**      | Loyal customers without marketing, no competition |
| **Tour Operator**   | Steady stream of qualified tourists               |
| **Guest**           | Curated experiences, discounts everywhere, trust  |
| **Local Community** | Money stays in territory, not to Big Tech         |

**Tagline:**

> "Meno commissioni alle big tech. Più valore al territorio."

---

## 2. Critical Insight: Two Distinct User Contexts

### The Problem with Traditional Approach

Most accommodation apps treat all interactions the same. But a guest has **completely different needs** before vs. after check-in:

| Aspect            | Pre-Booking                      | Post Check-in                          |
| ----------------- | -------------------------------- | -------------------------------------- |
| **Mental State**  | Evaluating, comparing, skeptical | Relaxed, practical, wants convenience  |
| **Primary Need**  | "Is this the right place?"       | "How do I use this place?"             |
| **Key Actions**   | Browse photos, check price, book | Get WiFi, order services, explore area |
| **Time Pressure** | Planning ahead                   | Immediate needs                        |
| **Trust Level**   | Building trust                   | Already committed                      |

### Solution: Two-Mode PWA Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      GUDBRO STAYS PWA                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌───────────────────────┐      ┌───────────────────────┐      │
│   │    BOOKING MODE       │      │     IN-STAY MODE      │      │
│   │    (Property Page)    │      │   (Guest Dashboard)   │      │
│   ├───────────────────────┤      ├───────────────────────┤      │
│   │                       │      │                       │      │
│   │  Entry: Public URL    │      │  Entry: QR in Room    │      │
│   │  /beach-view-apt      │      │  /stay/BK-ABC123      │      │
│   │                       │      │                       │      │
│   │  • Photo Gallery      │      │  • WiFi Card (TOP!)   │      │
│   │  • Pricing & Dates    │      │  • Stay Summary       │      │
│   │  • Reviews            │      │  • Services Menu      │      │
│   │  • Amenities          │      │  • Local Deals        │      │
│   │  • Location           │      │  • Contact Host       │      │
│   │  • Booking Flow       │      │  • Check-out Info     │      │
│   │  • Host Info          │      │  • House Rules        │      │
│   │                       │      │                       │      │
│   │  Goal: CONVERT        │      │  Goal: DELIGHT        │      │
│   │                       │      │                       │      │
│   └───────────────────────┘      └───────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Target Users

### Primary Personas

#### 🏠 Property Owner - "Mario"

- **Demographics:** 35-55, owns 1-5 properties
- **Location:** Da Nang, Hoi An, Bangkok, Bali
- **Tech comfort:** Medium (uses smartphone, WhatsApp)
- **Current situation:**
  - Pays 15-25% to Booking.com/Airbnb
  - Has informal deals with local tour operators
  - Guests always ask "where should I go?"
  - Can't monetize recommendations
- **Goals:**
  - Keep more revenue from bookings
  - Earn from local referrals
  - Professional digital presence
  - Less repetitive questions from guests

#### 🧳 Guest Pre-Booking - "Sarah"

- **Demographics:** 25-45, international tourist
- **Context:** Planning trip, comparing options
- **Behavior:** Scrolls photos, checks reviews, compares prices
- **Needs:**
  - Beautiful photos
  - Clear pricing
  - Social proof (reviews)
  - Easy booking process
  - Trust signals

#### 🛏️ Guest In-Stay - "Sarah" (same person, different mode)

- **Context:** Already checked in, in the room
- **First action:** Scan QR to get WiFi
- **Subsequent needs:**
  - Order breakfast
  - Book a tour
  - Get laundry done
  - Find good restaurants
  - Contact host for questions
- **Mindset:** "What can I do here? Make it easy."

#### 🏍️ Local Partner - "Minh" (Tour Operator)

- **Demographics:** 30-50, runs small tour/transport business
- **Current situation:**
  - Pays for ads or waits on street
  - No steady lead source
  - Language barriers with tourists
- **Goals:**
  - Steady stream of qualified leads
  - No upfront marketing cost
  - Professional presentation

---

## 4. User Journeys

### Journey A: Discovery → Booking → Confirmation

```
┌─────────────────────────────────────────────────────────────────┐
│  BOOKING JOURNEY (Property Page)                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. DISCOVER                                                     │
│     └─ Guest finds link (Google, social, referral)              │
│     └─ Opens: stays.gudbro.com/beach-view-apartment             │
│                                                                  │
│  2. EVALUATE                                                     │
│     └─ Swipes through photo gallery                             │
│     └─ Reads description & amenities                            │
│     └─ Checks reviews (social proof)                            │
│     └─ Views location on map                                    │
│                                                                  │
│  3. DECIDE                                                       │
│     └─ Selects dates on calendar                                │
│     └─ Sees price breakdown                                     │
│     └─ Checks weekly/monthly discounts                          │
│                                                                  │
│  4. BOOK                                                         │
│     └─ Enters guest info (name, email, phone)                   │
│     └─ Adds special requests                                    │
│     └─ Chooses payment method                                   │
│     └─ Submits booking request                                  │
│                                                                  │
│  5. CONFIRM                                                      │
│     └─ Receives WhatsApp/email confirmation                     │
│     └─ Gets booking code: BK-ABC123                             │
│     └─ Receives pre-arrival info                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Journey B: Check-in → In-Stay → Check-out

```
┌─────────────────────────────────────────────────────────────────┐
│  IN-STAY JOURNEY (Guest Dashboard)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. ARRIVE                                                       │
│     └─ Guest arrives at property                                │
│     └─ Finds QR code in room/reception                          │
│     └─ Scans QR → stays.gudbro.com/stay/BK-ABC123              │
│                                                                  │
│  2. CONNECT                                                      │
│     └─ Verifies identity (last name + booking code or PIN)      │
│     └─ Sees WELCOME screen with WiFi credentials                │
│     └─ Bookmarks/installs PWA                                   │
│                                                                  │
│  3. EXPLORE                                                      │
│     └─ Browses in-stay services:                                │
│        • Breakfast menu (order for tomorrow)                    │
│        • Minibar items with prices                              │
│        • Laundry service                                        │
│        • Room service                                           │
│     └─ Discovers local deals:                                   │
│        • "10% off Marble Mountains Tour"                        │
│        • "Free pickup with Da Nang Food Tour"                   │
│        • "15% off at Zen Spa (5 min walk)"                      │
│                                                                  │
│  4. USE                                                          │
│     └─ Orders breakfast for 7:30 AM                             │
│     └─ Books airport transfer                                   │
│     └─ Requests laundry pickup                                  │
│     └─ Contacts host with question                              │
│                                                                  │
│  5. DEPART                                                       │
│     └─ Sees check-out info & instructions                       │
│     └─ Reviews stay (prompted)                                  │
│     └─ Receives receipt summary                                 │
│     └─ Gets "Come back" discount for next visit                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Local Partnerships System

### The Opportunity

Every accommodation owner knows local businesses. They constantly recommend:

- Tour operators
- Restaurant/cafes
- Spa/massage
- Motorbike rentals
- Airport transfers
- Cooking classes
- Diving/snorkeling

Currently these recommendations are **verbal and unmonetized**.

### Partnership Types

#### Type 1: Property-Owned Services

Services directly provided by the accommodation:

- Breakfast
- Minibar
- Laundry
- Airport transfer (own vehicle)
- Equipment rental (bikes, scooters)

**Revenue:** 100% to property owner

#### Type 2: Affiliate Partnerships (Commission-Based)

External businesses with formal agreement:

- Tour operators
- Restaurants
- Wellness/spa
- Rental shops
- Activity providers
- **Visa services** (extensions, visa runs, consulting)

**Revenue Model:**

```
Guest pays: $50 for tour
Partner receives: $42.50 (85%)
Property earns: $5.00 (10% commission)
GUDBRO fee: $2.50 (5%)
```

#### Hidden Value for Partners: Zero-Noise Advantage

Beyond commission savings, GUDBRO partners gain a **strategic competitive advantage** that's often more valuable than the cost difference.

**The Problem with Delivery Apps (Grab, ShopeeFood, etc.):**
| Issue | Impact |
|-------|--------|
| 50+ competitors on same screen | Customer easily distracted |
| Must pay for visibility/ADS | Extra cost on top of 30% commission |
| Algorithm favors big chains | Small local businesses buried |
| Zero customer loyalty | Guest sees alternatives every time |
| Price wars | Race to bottom with discounts |

**The GUDBRO Advantage:**
| Benefit | Description |
|---------|-------------|
| **Zero noise** | Only 3-5 curated partners visible, no competitors |
| **Captive audience** | Tourists who MUST eat every day for 5-30 days |
| **Trust transfer** | Property recommendation = instant credibility |
| **Local monopoly** | Only Italian restaurant? All Italian orders are yours |
| **Repeat orders** | Same guest orders multiple times during stay |
| **No ADS needed** | Property does the marketing for you |
| **Premium clientele** | Tourists spend more than local average |
| **Higher conversion** | Short list = faster decision = more orders |

**Comparison Example:**

```
Via Grab Food:
├─ Commission: 30%
├─ Visibility: Competing with 50+ restaurants
├─ Must pay ADS to be seen
└─ Customer loyalty: Near zero

Via GUDBRO Partner:
├─ Commission: 15% (saves 15%)
├─ Visibility: 1 of 5 featured partners
├─ No ADS needed
└─ Customer loyalty: High (no alternatives shown)
```

**Sales Pitch for Partners:**

> "Non è solo risparmiare il 15% di commissioni. È avere accesso esclusivo a turisti che devono mangiare ogni giorno, senza competere con altri 50 ristoranti sullo stesso schermo. Quando un ospite apre l'app, vede solo te."

#### Type 3: GUDBRO Network Partners

Partners in the broader GUDBRO ecosystem:

- Other GUDBRO Stays properties
- GUDBRO Tours operators
- GUDBRO Wellness providers

**Revenue Model:** Same as Type 2, tracked via GUDBRO Pass

### Partnership Data Model

```typescript
interface LocalPartnership {
  id: string;
  propertyId: string;

  // Partner Info
  partnerName: string;
  partnerType:
    | 'tour'
    | 'transport'
    | 'restaurant'
    | 'wellness'
    | 'rental'
    | 'activity'
    | 'visa_services';
  visaServiceType?:
    | 'extension'
    | 'visa_run'
    | 'consulting'
    | 'document_support';
  partnerContact: string;
  partnerWhatsApp?: string;

  // Offer Details
  offerTitle: string; // "Marble Mountains Tour"
  offerDescription: string;
  originalPrice: number;
  discountPercent: number; // 10% off for guests
  discountedPrice: number;

  // Commission
  commissionPercent: number; // 10% to property
  commissionType: 'percentage' | 'fixed';

  // Display
  image?: string;
  featured: boolean;
  sortOrder: number;

  // Availability
  isActive: boolean;
  validFrom?: Date;
  validUntil?: Date;
  availableDays?: number[]; // [1,2,3,4,5,6,0] = which days

  // Tracking
  totalReferrals: number;
  totalRevenue: number;
}

interface PartnerReferral {
  id: string;
  partnershipId: string;
  bookingId: string; // Guest's stay booking

  // Transaction
  serviceDate: Date;
  originalPrice: number;
  discountApplied: number;
  finalPrice: number;
  commissionEarned: number;

  // Status
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  confirmedAt?: Date;

  // Notes
  guestNotes?: string;
}
```

### Partner Display in Guest Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  🎁 EXCLUSIVE DEALS FOR GUESTS                                   │
│  Curated by your host Mario                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🏍️ Marble Mountains Tour              -10%             │    │
│  │  Half-day adventure with English guide                  │    │
│  │  $27 → $24.30                           [Book Now]      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ✈️ Airport Transfer                    FREE PICKUP     │    │
│  │  Comfortable car, meet at arrivals                      │    │
│  │  $15 one-way                            [Book Now]      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  💆 Zen Spa & Massage                   -15%            │    │
│  │  5 min walk • Traditional Vietnamese massage            │    │
│  │  From $20                               [See Menu]      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🍜 Madam Khanh Banh Mi                 -10%            │    │
│  │  Famous "Banh Mi Queen" • 10 min walk                   │    │
│  │  Show this screen for discount          [Get Directions]│    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. User Stories (Revised)

### Epic 1: Property Setup (Owner)

| ID     | As a... | I want to...                | So that...                      | Priority |
| ------ | ------- | --------------------------- | ------------------------------- | -------- |
| US-1.1 | Owner   | Create my account           | I can manage properties         | P0       |
| US-1.2 | Owner   | Add a new property          | Guests can find it              | P0       |
| US-1.3 | Owner   | Upload photos               | My property looks attractive    | P0       |
| US-1.4 | Owner   | Set amenities & house rules | Guests know what to expect      | P0       |
| US-1.5 | Owner   | Get booking page URL        | I can share it anywhere         | P0       |
| US-1.6 | Owner   | Generate room QR codes      | Guests access in-stay dashboard | P0       |

### Epic 2: Booking Mode (Guest Pre-Arrival)

| ID     | As a... | I want to...             | So that...                  | Priority |
| ------ | ------- | ------------------------ | --------------------------- | -------- |
| US-2.1 | Guest   | See beautiful photos     | I can evaluate the property | P0       |
| US-2.2 | Guest   | Check availability       | I know if my dates work     | P0       |
| US-2.3 | Guest   | See clear pricing        | No surprises                | P0       |
| US-2.4 | Guest   | Read reviews             | I trust the property        | P0       |
| US-2.5 | Guest   | Book without account     | It's fast and easy          | P0       |
| US-2.6 | Guest   | Receive confirmation     | I have proof of booking     | P0       |
| US-2.7 | Guest   | Contact host pre-arrival | I can ask questions         | P0       |

### Epic 3: In-Stay Mode (Guest After Check-in)

| ID     | As a... | I want to...                   | So that...                        | Priority |
| ------ | ------- | ------------------------------ | --------------------------------- | -------- |
| US-3.1 | Guest   | Scan QR and see WiFi instantly | I can connect immediately         | P0       |
| US-3.2 | Guest   | See my stay summary            | I know dates, room, checkout time | P0       |
| US-3.3 | Guest   | Browse in-stay services        | I know what's available           | P0       |
| US-3.4 | Guest   | Order breakfast                | I wake up to food                 | P1       |
| US-3.5 | Guest   | Request laundry                | My clothes get cleaned            | P1       |
| US-3.6 | Guest   | See local deals                | I discover activities             | P0       |
| US-3.7 | Guest   | Book a tour directly           | Without searching elsewhere       | P1       |
| US-3.8 | Guest   | Contact host easily            | I get help quickly                | P0       |
| US-3.9 | Guest   | See checkout info              | I know when/how to leave          | P0       |

### Epic 4: In-Stay Services (Owner)

| ID     | As a... | I want to...                  | So that...                      | Priority |
| ------ | ------- | ----------------------------- | ------------------------------- | -------- |
| US-4.1 | Owner   | Create service categories     | I organize my offerings         | P1       |
| US-4.2 | Owner   | Add minibar items             | Guests see what's in the fridge | P1       |
| US-4.3 | Owner   | Add breakfast menu            | Guests can pre-order            | P1       |
| US-4.4 | Owner   | Set service hours             | Guests know when available      | P1       |
| US-4.5 | Owner   | Receive service notifications | I fulfill requests promptly     | P1       |

### Epic 5: Local Partnerships (Owner)

| ID     | As a... | I want to...            | So that...                    | Priority |
| ------ | ------- | ----------------------- | ----------------------------- | -------- |
| US-5.1 | Owner   | Add local partners      | Guests see my recommendations | P1       |
| US-5.2 | Owner   | Set discount for guests | Partners become attractive    | P1       |
| US-5.3 | Owner   | Set my commission       | I earn from referrals         | P1       |
| US-5.4 | Owner   | Track referral revenue  | I see my earnings             | P2       |
| US-5.5 | Owner   | Feature best partners   | Important ones stand out      | P1       |

### Epic 6: GUDBRO Network

| ID     | As a... | I want to...                 | So that...                      | Priority |
| ------ | ------- | ---------------------------- | ------------------------------- | -------- |
| US-6.1 | Owner   | Connect with GUDBRO partners | Access to verified businesses   | P2       |
| US-6.2 | Guest   | Use GUDBRO Pass              | I get discounts everywhere      | P2       |
| US-6.3 | Owner   | Receive GUDBRO referrals     | Other properties send me guests | P2       |

---

## 7. Functional Requirements

### 7.1 Booking Mode (Property Page)

#### Property Display

- [ ] Hero image gallery (swipeable, 5-20 photos)
- [ ] Property name, type badge, rating
- [ ] Location with area name
- [ ] Quick stats (guests, bedrooms, bathrooms)
- [ ] Price per night with discounts
- [ ] Amenities grid with icons
- [ ] Description (expandable)
- [ ] House rules section
- [ ] Location map
- [ ] Reviews section
- [ ] Host profile

#### Booking Flow

- [ ] Date picker (check-in/out)
- [ ] Guest count selector
- [ ] Price calculator with breakdown
- [ ] Guest info form
- [ ] Special requests field
- [ ] Payment method selection
- [ ] Booking confirmation
- [ ] WhatsApp/email notification

### 7.2 In-Stay Mode (Guest Dashboard)

#### Welcome Screen (First Load)

- [ ] Verification (name + booking code)
- [ ] WiFi credentials prominently displayed
- [ ] Stay summary card
- [ ] Quick actions grid

#### Dashboard Sections

- [ ] **WiFi Card** - Network name, password, copy button
- [ ] **Your Stay** - Dates, room, checkout time, host contact
- [ ] **Services** - Breakfast, minibar, laundry, room service
- [ ] **Local Deals** - Partner offers with discounts
- [ ] **Explore** - Nearby attractions, restaurants, activities
- [ ] **Contact** - WhatsApp host, emergency info
- [ ] **Check-out** - Time, procedure, key return

#### Service Ordering

- [ ] Browse service menu
- [ ] Add items to request
- [ ] Specify time (breakfast: "7:30 AM")
- [ ] Add notes
- [ ] Submit request
- [ ] Receive confirmation

### 7.3 Owner Dashboard

#### Property Management

- [ ] Add/edit property details
- [ ] Manage photos
- [ ] Set pricing and discounts
- [ ] Manage availability calendar
- [ ] View/manage bookings

#### In-Stay Services Management

- [ ] Create service categories
- [ ] Add/edit service items
- [ ] Set prices and availability
- [ ] View service requests
- [ ] Mark as fulfilled

#### Local Partnerships

- [ ] Add partner businesses
- [ ] Set discounts and commissions
- [ ] Track referrals
- [ ] View earnings report

#### QR Code Management

- [ ] Generate property booking QR
- [ ] Generate room-specific QR codes
- [ ] Print/download QR codes

---

## 8. Technical Architecture

### URL Structure

```
BOOKING MODE (Public)
stays.gudbro.com/{property-slug}
stays.gudbro.com/beach-view-apartment
stays.gudbro.com/mario-stays/villa-rosa

IN-STAY MODE (Authenticated)
stays.gudbro.com/stay/{booking-code}
stays.gudbro.com/stay/BK-2024-ABC123

OWNER DASHBOARD
stays.gudbro.com/dashboard
stays.gudbro.com/dashboard/properties
stays.gudbro.com/dashboard/bookings
stays.gudbro.com/dashboard/services
stays.gudbro.com/dashboard/partners
```

### QR Code Strategy

```
BOOKING QR (on business card, flyer)
→ stays.gudbro.com/beach-view-apartment
→ Shows Property Page (Booking Mode)

ROOM QR (in each room)
→ stays.gudbro.com/stay/BK-{booking-code}
→ Shows Guest Dashboard (In-Stay Mode)

GENERIC ROOM QR (permanent, no booking code)
→ stays.gudbro.com/checkin/{property-id}/{room-id}
→ Guest enters booking code to access dashboard
```

### Frontend Architecture

```
apps/accommodations/frontend/
├── app/
│   ├── page.tsx                    # Landing/redirect
│   ├── [slug]/
│   │   └── page.tsx                # Property Page (Booking Mode)
│   ├── stay/
│   │   └── [code]/
│   │       └── page.tsx            # Guest Dashboard (In-Stay Mode)
│   ├── checkin/
│   │   └── [propertyId]/
│   │       └── page.tsx            # Check-in verification
│   └── dashboard/
│       ├── page.tsx                # Owner dashboard
│       ├── properties/
│       ├── bookings/
│       ├── services/
│       └── partners/
├── components/
│   ├── booking/                    # Booking Mode components
│   │   ├── PropertyGallery.tsx
│   │   ├── BookingWidget.tsx
│   │   ├── ReviewsList.tsx
│   │   └── ...
│   ├── instay/                     # In-Stay Mode components
│   │   ├── WifiCard.tsx
│   │   ├── StaySummary.tsx
│   │   ├── ServicesMenu.tsx
│   │   ├── LocalDeals.tsx
│   │   └── ...
│   └── shared/                     # Shared components
│       ├── BottomNav.tsx
│       ├── Header.tsx
│       └── ...
└── lib/
    ├── types.ts
    └── utils.ts
```

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (owners) + Booking codes (guests)
- **Storage:** Supabase Storage
- **Communication:** WhatsApp Business API, Zalo

---

## 9. MVP Scope (Revised)

### MVP Phase 1: Core Booking (Week 1-2)

1. ✅ Owner account creation
2. ✅ Single property setup
3. ✅ Property Page (Booking Mode)
4. ✅ Basic booking flow
5. ✅ WhatsApp confirmation
6. ✅ Multi-language (5 languages)

### MVP Phase 2: In-Stay Dashboard (Week 3-4)

1. ✅ Guest Dashboard (In-Stay Mode)
2. ✅ WiFi display
3. ✅ Stay summary
4. ✅ Basic services menu (view only)
5. ✅ Contact host
6. ✅ Room QR generation

### MVP Phase 3: Services & Partners (Week 5-6)

1. ✅ Service ordering
2. ✅ Local partnerships
3. ✅ Partner deals display
4. ✅ Basic referral tracking

### NOT in MVP

- ❌ Online payments (cash/transfer only)
- ❌ Multi-property management
- ❌ GUDBRO Network integration
- ❌ Review system
- ❌ Calendar sync

---

## 10. Success Metrics (Revised)

### Launch Metrics (Month 1)

| Metric                  | Target        |
| ----------------------- | ------------- |
| Properties onboarded    | 15            |
| Bookings                | 30            |
| In-Stay dashboard opens | 80% of guests |
| WiFi QR scans           | 90% of guests |
| Service requests        | 20            |
| Partner referrals       | 10            |

### Growth Metrics (Month 6)

| Metric                 | Target  |
| ---------------------- | ------- |
| Properties             | 150     |
| Monthly bookings       | 400     |
| Booking GMV            | $40,000 |
| Partner referral GMV   | $8,000  |
| Owner partner earnings | $800    |
| Guest satisfaction     | 4.5/5   |

### North Star Metrics

1. **Booking GMV** - Total accommodation bookings
2. **Referral GMV** - Total partner service bookings via property referrals
3. **Owner Additional Revenue** - Commissions earned from referrals

---

## 11. Risks & Mitigations

| Risk                                    | Impact | Likelihood | Mitigation                             |
| --------------------------------------- | ------ | ---------- | -------------------------------------- |
| Guests don't scan QR                    | High   | Medium     | Make WiFi the hook - they NEED to scan |
| Partners don't want to share commission | Medium | Medium     | Start with property-owned services     |
| Owners find it complex                  | High   | Low        | Simple onboarding, pre-built templates |
| Low booking conversion                  | High   | Medium     | Focus on existing OTA customers first  |

---

## 12. Open Questions

1. **Partner onboarding:** How do partners confirm bookings? WhatsApp? Dashboard?
2. **Commission tracking:** How verify guest actually used the service?
3. **Multi-room properties:** Same QR for all rooms or unique per room?
4. **Offline mode:** Should services work offline?
5. **Check-in automation:** Self check-in with codes?

---

## 13. Visa Compliance & Tracker System

### The Problem (Vietnam-Specific, Applicable Across SEA)

In Vietnam, accommodations have **legal obligations** regarding foreign guests:

| Requirement               | Detail                                     | Penalty              |
| ------------------------- | ------------------------------------------ | -------------------- |
| **NA17 Registration**     | Register guest with police within 12-24h   | 3-5M VND (~$130-220) |
| **Document Verification** | Check passport + visa BEFORE check-in      | Legal liability      |
| **Overstay Prevention**   | Guest overstay affects property reputation | Blacklisting risk    |

### Guest Overstay Penalties (Vietnam)

| Days Overstay | Fine      | Additional          |
| ------------- | --------- | ------------------- |
| < 16 days     | $22-88    | Warning             |
| 16-30 days    | $133-221  | Deportation risk    |
| 30-60 days    | $221-441  | Blacklist 1-3 years |
| 60-90 days    | $441-661  | Blacklist 3-5 years |
| 90+ days      | $661-885+ | Blacklist 5+ years  |

### Vietnam Visa Types (2025-2026)

| Type               | Duration      | Notes                                                                                     |
| ------------------ | ------------- | ----------------------------------------------------------------------------------------- |
| **Visa Exemption** | 45 days       | 24 countries incl. Italy, Germany, France, UK, Spain, Japan, Korea, etc. Valid until 2028 |
| **E-Visa**         | Up to 90 days | All nationalities. Single entry $25, Multiple entry $50                                   |
| **Phu Quoc Only**  | 30 days       | Visa-free for all nationalities (island only)                                             |

**Official Resources:**

- E-Visa Portal: https://evisa.xuatnhapcanh.gov.vn
- Immigration: https://evisa.gov.vn

### GUDBRO Stays Visa Tracker Feature

```
┌─────────────────────────────────────────────────────────────────┐
│  VISA TRACKER (In-Stay Dashboard)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🛂 Your Visa Status                                    │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │    │
│  │  E-Visa • Valid until Feb 15, 2026                      │    │
│  │                                                          │    │
│  │  ⚠️ 19 days remaining                                   │    │
│  │  ████████████░░░░░░░░  (63%)                             │    │
│  │                                                          │    │
│  │  [Extend Visa]  [Update Visa]                           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  💡 Need visa help? Our partners can assist:                    │
│  • Visa extension (from $35)                                    │
│  • Visa run to Cambodia ($89 incl. transport)                   │
│  • Document consulting                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Feature Components

#### For Guests (In-Stay Dashboard)

- [ ] **Visa upload** - Photo of passport + visa page
- [ ] **Expiry extraction** - OCR or manual entry
- [ ] **Countdown display** - Days remaining with visual bar
- [ ] **Push notifications** - 14, 7, 3 days before expiry
- [ ] **Extension services** - Quick link to visa partners
- [ ] **Visa run booking** - Partner deals for border runs

#### For Property Owners (Backoffice)

- [ ] **Document reception** - Auto-receive guest documents
- [ ] **Expiry alerts** - Warning if visa expires during stay
- [ ] **NA17 pre-fill** - Export data for police registration
- [ ] **Compliance dashboard** - Overview of all guest documents
- [ ] **Provincial portal links** - Quick access to registration sites

#### Push Notification Schedule

```
Guest visa expires: Feb 15
Check-out: Feb 10

Timeline:
├─ Feb 1 (14 days before): "Your visa expires in 14 days"
├─ Feb 8 (7 days before): "⚠️ Visa expires in 7 days - Extend now?"
└─ Feb 12 (3 days before): "🚨 Visa expires in 3 days!"

If checkout > visa expiry:
├─ Alert to GUEST: "Your visa expires before checkout!"
├─ Alert to OWNER: "Guest [name] visa expires during stay"
└─ Suggested action: Visa extension or adjust checkout
```

### Visa Services as Partner Category

New partner type: `visa_services`

```typescript
// Extended LocalPartnership partnerType
partnerType: 'tour' | 'transport' | 'restaurant' | 'wellness' | 'rental' | 'activity' | 'visa_services';

// Visa Services sub-categories
visaServiceType?: 'extension' | 'visa_run' | 'consulting' | 'document_support';
```

### Visa Partner Revenue Model

```
Guest needs visa extension:
├─ Service cost: $50
├─ Partner receives: $42.50 (85%)
├─ Property earns: $5.00 (10%)
└─ GUDBRO fee: $2.50 (5%)

Visa run package (Cambodia/Laos):
├─ Package cost: $150
├─ Partner receives: $127.50 (85%)
├─ Property earns: $15.00 (10%)
└─ GUDBRO fee: $7.50 (5%)
```

### Compliance Benefits

| Stakeholder       | Benefit                                         |
| ----------------- | ----------------------------------------------- |
| **Guest**         | Never forget visa expiry, easy extension access |
| **Owner**         | Automated document collection, NA17 ready data  |
| **Authorities**   | Better compliance, fewer overstays              |
| **Visa Partners** | Steady stream of clients needing services       |

---

## Appendix A: In-Stay Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  Beach View Apartment                           EN | $ | ⚙️     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  📶 WiFi                                                │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  Network: BeachView_Guest                               │    │
│  │  Password: welcome2024           [Copy]                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🛏️ Your Stay                                           │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  Jan 15-18, 2026 • Room 203 • 2 guests                  │    │
│  │  Check-out: 11:00 AM (in 2 days)                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  SERVICES                                                        │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │   🍳    │  │   🍫    │  │   👕    │  │   🍜    │           │
│  │Breakfast│  │ Minibar │  │ Laundry │  │  Room   │           │
│  │6:30-10  │  │  24/7   │  │ 8-18    │  │ Service │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  🎁 LOCAL DEALS                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🏍️ Marble Mountains    -10%    $27 → $24    [Book]    │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  ✈️ Airport Transfer   Incl.    $15          [Book]    │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  💆 Zen Spa            -15%     From $20     [View]    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  [📞 Contact Host]                    [🏠 House Rules]          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  🏠        🗺️        ⊞        🎁        👤                     │
│  Home      Map      Menu    Deals    Profile                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Appendix B: Revenue Flow Example

```
Guest "Sarah" stays at "Beach View Apartment"

BOOKING REVENUE:
├─ 3 nights × $45 = $135
├─ Cleaning fee = $15
├─ Total = $150
└─ To Owner: $150 (100%, no commission)

IN-STAY SERVICES REVENUE:
├─ Breakfast × 2 days = $10
├─ Minibar items = $8
├─ Laundry = $12
├─ Total = $30
└─ To Owner: $30 (100%, own services)

PARTNER REFERRAL REVENUE:
├─ Marble Mountains Tour
│   ├─ Original: $30
│   ├─ Guest pays: $27 (-10%)
│   ├─ To Partner: $22.95 (85%)
│   ├─ To Owner: $2.70 (10%)
│   └─ To GUDBRO: $1.35 (5%)
│
├─ Zen Spa Massage
│   ├─ Original: $40
│   ├─ Guest pays: $34 (-15%)
│   ├─ To Partner: $28.90 (85%)
│   ├─ To Owner: $3.40 (10%)
│   └─ To GUDBRO: $1.70 (5%)
│
└─ Owner total partner earnings: $6.10

OWNER TOTAL REVENUE FROM THIS GUEST:
├─ Booking: $150.00
├─ Services: $30.00
├─ Referrals: $6.10
└─ TOTAL: $186.10

vs. Booking.com at 20% commission:
├─ Booking: $120.00 (after commission)
├─ Services: $0 (not offered)
├─ Referrals: $0 (verbal only)
└─ TOTAL: $120.00

GUDBRO ADVANTAGE: +$66.10 per guest (+55%)
```

---

**Document History**

| Version | Date       | Author      | Changes                                                                                       |
| ------- | ---------- | ----------- | --------------------------------------------------------------------------------------------- |
| 1.0     | 2026-01-26 | GUDBRO Team | Initial PRD                                                                                   |
| 2.0     | 2026-01-27 | GUDBRO Team | Two-mode architecture, local partnerships, revised user journeys                              |
| 2.1     | 2026-01-27 | GUDBRO Team | Visa Tracker system, visa_services partner type, NA17 compliance                              |
| 2.2     | 2026-01-27 | GUDBRO Team | Zero-Noise Advantage value proposition, delivery/pickup options, partner competitive analysis |
