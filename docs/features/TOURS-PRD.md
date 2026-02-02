# Product Requirements Document: Tours Vertical

> **Product:** GUDBRO Tours
> **Version:** 1.0
> **Author:** GUDBRO Team
> **Date:** 2026-01-26
> **Status:** Draft

---

## Table of Contents

1. [Overview](#1-overview)
2. [User Personas](#2-user-personas)
3. [User Stories](#3-user-stories)
4. [Functional Requirements](#4-functional-requirements)
5. [Technical Requirements](#5-technical-requirements)
6. [UI/UX Specifications](#6-uiux-specifications)
7. [Metrics & Success Criteria](#7-metrics--success-criteria)
8. [Timeline & Phases](#8-timeline--phases)
9. [Risks & Mitigations](#9-risks--mitigations)
10. [Appendix](#10-appendix)

---

## 1. Overview

### 1.1 Problem Statement

In Vietnam's tourist areas (Da Nang, Hoi An, Nha Trang, etc.), thousands of small tour operators and transport providers face critical challenges:

| Problem | Impact |
|---------|--------|
| **Language barrier** | Cardboard signs in Vietnamese + basic English only. Korean, Chinese, Japanese tourists can't understand offerings. |
| **Currency confusion** | Prices in VND only. Tourists struggle to convert 250,000₫ mentally. |
| **No details** | Can't explain what's included, duration, pickup points. Lost sales. |
| **No booking system** | Cash only, no advance booking, no confirmation. Tourists prefer established platforms. |
| **No digital presence** | Invisible online. Lose to Klook/GetYourGuide despite better prices. |

**Result:** Small operators lose 40-60% of potential customers due to communication barriers.

### 1.2 Solution

**GUDBRO Tours:** A QR-code based tour menu that transforms any cardboard sign into a multilingual, multi-currency booking platform.

```
Tourist scans QR → Sees tours in their language → Books instantly → WhatsApp confirmation
```

### 1.3 Goals

| Goal | Metric | Target |
|------|--------|--------|
| **G1** | Operators onboarded (Month 3) | 50 |
| **G2** | Tours listed (Month 3) | 200 |
| **G3** | Bookings completed (Month 3) | 300 |
| **G4** | Conversion rate (view → book) | >15% |
| **G5** | Operator satisfaction (NPS) | >50 |

### 1.4 Non-Goals (v1.0)

- ❌ Payment processing (cash/transfer first)
- ❌ Multi-day tour complex itineraries
- ❌ Hotel partnerships
- ❌ Mobile native app
- ❌ Operator mobile app
- ❌ Real-time availability calendar
- ❌ Dynamic pricing

### 1.5 Success Vision

> "A street vendor with a motorbike can compete with Klook by simply printing a QR code."

---

## 2. User Personas

### 2.1 Primary: Tourist (Booker)

```
Name: Sarah, 32
From: Seoul, South Korea
Context: 5-day vacation in Da Nang

GOALS:
- Find authentic local experiences
- Understand what she's paying for
- Book easily without language issues
- Feel safe with verified operators

PAIN POINTS:
- Can't read Vietnamese signs
- Doesn't know fair prices
- Worried about scams
- Hates negotiating

BEHAVIOR:
- Researches on phone
- Prefers instant confirmation
- Uses KakaoTalk/WhatsApp
- Reads reviews before booking

QUOTE:
"I saw many tour signs but couldn't understand them.
 I ended up booking on Klook even though it was more expensive."
```

### 2.2 Primary: Tour Operator (Seller)

```
Name: Minh, 45
From: Da Nang, Vietnam
Context: Runs motorbike tours for 10 years

GOALS:
- Get more foreign customers
- Communicate tour details clearly
- Receive bookings in advance
- Compete with big platforms

PAIN POINTS:
- Can't speak Korean/Chinese/Japanese
- Tourists walk away confused
- No way to show reviews/trust
- Loses to Klook operators

BEHAVIOR:
- Uses Zalo for Vietnamese customers
- Has basic smartphone
- Cash-based business
- Works with family members

QUOTE:
"I have the best Marble Mountains tour but tourists
 can't understand me. They go to the guy with the iPad."
```

### 2.3 Secondary: Tourist Group

```
Name: Tanaka Family (4 people)
From: Osaka, Japan
Context: Family vacation, need transport

GOALS:
- Book transport for whole family
- Know exact price upfront (no surprises)
- Safe, reliable driver
- Clear pickup instructions

NEEDS:
- Group pricing visible
- Japanese language support
- Child-friendly options marked
- WhatsApp/LINE confirmation
```

### 2.4 Secondary: Business Traveler

```
Name: Michael, 38
From: Sydney, Australia
Context: Conference in Da Nang, 1 free day

GOALS:
- Quick half-day tour
- Professional service
- Easy expense reporting
- Airport transfer

NEEDS:
- Fast booking (< 2 min)
- Price in AUD
- Receipt/invoice
- Reliable timing
```

---

## 3. User Stories

### 3.1 Epic: Tour Discovery

```
As a TOURIST
I want to BROWSE available tours in my language
So that I can FIND experiences that interest me
```

#### Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|---------------------|
| TD-1 | As a tourist, I want to scan a QR code and see all tours from this operator | P0 | QR opens menu in <3s, shows all tours |
| TD-2 | As a tourist, I want to see the menu in my language | P0 | Auto-detect or manual select, 5 languages MVP |
| TD-3 | As a tourist, I want to see prices in my currency | P0 | Auto-convert based on location, show both VND + local |
| TD-4 | As a tourist, I want to filter tours by category | P1 | Day tours, Transport, Experiences filters work |
| TD-5 | As a tourist, I want to see tour ratings and reviews | P1 | Star rating + review count visible on cards |

### 3.2 Epic: Tour Details

```
As a TOURIST
I want to SEE complete tour information
So that I can DECIDE if it's right for me
```

#### Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|---------------------|
| TI-1 | As a tourist, I want to see tour photos | P0 | Gallery with 3-10 photos, swipeable |
| TI-2 | As a tourist, I want to see what's included/excluded | P0 | Clear lists with icons |
| TI-3 | As a tourist, I want to see duration and distance | P0 | Displayed prominently |
| TI-4 | As a tourist, I want to see the route on a map | P1 | Google Maps embed with stops |
| TI-5 | As a tourist, I want to see departure times | P0 | Available times listed |
| TI-6 | As a tourist, I want to read reviews from other tourists | P1 | Reviews with country flags, ratings |

### 3.3 Epic: Booking

```
As a TOURIST
I want to BOOK a tour easily
So that I can SECURE my spot
```

#### Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|---------------------|
| BK-1 | As a tourist, I want to select date and time | P0 | Date picker + time slots |
| BK-2 | As a tourist, I want to specify number of people | P0 | Counter with price update |
| BK-3 | As a tourist, I want to enter pickup location | P0 | Text field + popular locations |
| BK-4 | As a tourist, I want to enter my contact info | P0 | Name, phone, optional email |
| BK-5 | As a tourist, I want to receive instant confirmation | P0 | WhatsApp/Zalo message sent |
| BK-6 | As a tourist, I want to add special requests | P2 | Optional notes field |
| BK-7 | As a tourist, I want to see total price before confirming | P0 | Clear breakdown shown |

### 3.4 Epic: Operator Management

```
As an OPERATOR
I want to MANAGE my tours
So that I can RECEIVE bookings
```

#### Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|---------------------|
| OP-1 | As an operator, I want to register my business | P0 | Simple form, phone verification |
| OP-2 | As an operator, I want to add a new tour | P0 | Guided wizard, required fields clear |
| OP-3 | As an operator, I want to set prices in VND | P0 | VND input, USD auto-calculated |
| OP-4 | As an operator, I want to upload tour photos | P0 | Image upload, crop, reorder |
| OP-5 | As an operator, I want to receive booking notifications | P0 | Zalo/WhatsApp alert |
| OP-6 | As an operator, I want to confirm/reject bookings | P1 | One-tap confirm in message |
| OP-7 | As an operator, I want to get my QR code | P0 | Downloadable, printable QR |
| OP-8 | As an operator, I want to see my booking history | P1 | List with status, earnings |

### 3.5 Epic: Communication

```
As a USER
I want to COMMUNICATE easily
So that I can COORDINATE the booking
```

#### Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|---------------------|
| CM-1 | As a tourist, I want to message the operator | P1 | WhatsApp/Zalo deep link |
| CM-2 | As an operator, I want to send pickup reminders | P2 | Automated day-before message |
| CM-3 | As a tourist, I want booking details in my language | P0 | Confirmation translated |

---

## 4. Functional Requirements

### 4.1 MVP Features (v1.0)

#### F1: Tour Menu (Public)

| Feature | Description | Priority |
|---------|-------------|----------|
| F1.1 | QR code landing page | P0 |
| F1.2 | Tour listing with cards | P0 |
| F1.3 | Category filter (day tour, transport, experience) | P0 |
| F1.4 | Multi-language (EN, VI, KO, ZH, JA) | P0 |
| F1.5 | Multi-currency display | P0 |
| F1.6 | Search tours | P1 |

#### F2: Tour Detail Page (Public)

| Feature | Description | Priority |
|---------|-------------|----------|
| F2.1 | Photo gallery | P0 |
| F2.2 | Description (translated) | P0 |
| F2.3 | Included/Excluded lists | P0 |
| F2.4 | Duration, distance, group size | P0 |
| F2.5 | Price display (multi-currency) | P0 |
| F2.6 | Route map | P1 |
| F2.7 | Reviews section | P1 |
| F2.8 | Operator info | P0 |

#### F3: Booking Flow (Public)

| Feature | Description | Priority |
|---------|-------------|----------|
| F3.1 | Date selection | P0 |
| F3.2 | Time selection | P0 |
| F3.3 | Number of people | P0 |
| F3.4 | Pickup location | P0 |
| F3.5 | Contact form | P0 |
| F3.6 | Price summary | P0 |
| F3.7 | Submit booking | P0 |
| F3.8 | Confirmation screen | P0 |
| F3.9 | WhatsApp/Zalo confirmation | P0 |

#### F4: Operator Dashboard (Authenticated)

| Feature | Description | Priority |
|---------|-------------|----------|
| F4.1 | Operator registration | P0 |
| F4.2 | Phone verification (OTP) | P0 |
| F4.3 | Add/Edit tours | P0 |
| F4.4 | Photo upload | P0 |
| F4.5 | QR code generation | P0 |
| F4.6 | Booking list | P0 |
| F4.7 | Confirm/Reject booking | P1 |
| F4.8 | Basic analytics | P2 |

### 4.2 Future Features (v1.1+)

| Feature | Version | Description |
|---------|---------|-------------|
| Online payment (VNPay, Momo) | v1.1 | Accept deposits/full payment |
| Verified operator badge | v1.1 | Trust signal for tourists |
| Availability calendar | v1.1 | Real-time slot management |
| Review submission | v1.1 | Tourists can leave reviews |
| Automated reminders | v1.2 | Day-before notifications |
| Multi-location operator | v1.2 | Same operator, multiple areas |
| Seasonal pricing | v1.2 | High/low season rates |
| Group discounts | v1.2 | Auto-apply for 4+ people |
| Affiliate system | v2.0 | Hotels earn commission |
| Mobile app (operator) | v2.0 | Native app for operators |

---

## 5. Technical Requirements

### 5.1 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                    Next.js 14 (App Router)                      │
│                         Port: 3026                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Public Pages │  │ Booking Flow │  │  Operator    │          │
│  │              │  │              │  │  Dashboard   │          │
│  │ /            │  │ /book/[id]   │  │ /dashboard   │          │
│  │ /tours       │  │ /confirm     │  │ /tours/new   │          │
│  │ /tour/[id]   │  │              │  │ /bookings    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                 │
│                   Supabase (PostgreSQL)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Tours     │  │   Bookings   │  │  Operators   │          │
│  │    Table     │  │    Table     │  │    Table     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Reviews    │  │ Translations │  │    Media     │          │
│  │    Table     │  │    Table     │  │   Storage    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INTEGRATIONS                               │
├─────────────────────────────────────────────────────────────────┤
│  WhatsApp Business API  │  Zalo API  │  Google Maps  │  i18n   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | Next.js 14 | Same as other verticals, SSR for SEO |
| Styling | Tailwind CSS | Consistent with GUDBRO |
| UI Components | Radix UI | Accessible, customizable |
| Icons | Phosphor Icons | Project standard |
| Database | Supabase (PostgreSQL) | Already in use, RLS |
| Auth | Supabase Auth | Phone OTP for operators |
| Storage | Supabase Storage | Tour photos |
| i18n | next-intl | 5+ languages |
| Maps | Google Maps API | Route visualization |
| Messaging | WhatsApp Business API | Booking confirmations |
| Messaging (VN) | Zalo API | Local preference |

### 5.3 Database Schema

```sql
-- Operators (tour providers)
CREATE TABLE tour_operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255),
  area VARCHAR(100),  -- "Da Nang Beach", "Hoi An"
  whatsapp VARCHAR(20),
  zalo VARCHAR(20),
  telegram VARCHAR(50),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tours
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID REFERENCES tour_operators(id),

  -- Basic info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('day_tour', 'transport', 'experience', 'multi_day')),

  -- Pricing
  price_vnd INTEGER NOT NULL,
  price_usd DECIMAL(10,2) GENERATED ALWAYS AS (price_vnd / 25000.0) STORED,
  price_per TEXT CHECK (price_per IN ('person', 'vehicle', 'group')),
  min_people INTEGER DEFAULT 1,
  max_people INTEGER DEFAULT 10,

  -- Details
  duration VARCHAR(50),  -- "3 hours", "Full day"
  distance VARCHAR(50),  -- "25km"
  included TEXT[],
  excluded TEXT[],

  -- Logistics
  pickup_locations TEXT[],
  departure_times TEXT[],  -- ["08:00", "14:00"]

  -- Media
  images TEXT[],
  route_map_url TEXT,

  -- Stats
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  booking_count INTEGER DEFAULT 0,

  -- Status
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tour translations
CREATE TABLE tour_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL,  -- 'en', 'vi', 'ko', 'zh', 'ja'
  name VARCHAR(255),
  description TEXT,
  included TEXT[],
  excluded TEXT[],
  UNIQUE(tour_id, language)
);

-- Bookings
CREATE TABLE tour_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id),
  operator_id UUID REFERENCES tour_operators(id),

  -- Customer
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  customer_country VARCHAR(2),  -- ISO country code
  customer_language VARCHAR(5),

  -- Booking details
  booking_date DATE NOT NULL,
  booking_time VARCHAR(10),
  number_of_people INTEGER NOT NULL,
  pickup_location TEXT,
  special_requests TEXT,

  -- Pricing
  total_price_vnd INTEGER NOT NULL,
  total_price_usd DECIMAL(10,2),

  -- Status
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  payment_status TEXT CHECK (payment_status IN ('unpaid', 'deposit', 'paid')),

  -- Communication
  confirmed_via TEXT,  -- 'whatsapp', 'zalo', 'sms'
  confirmation_sent_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE tour_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id),
  booking_id UUID REFERENCES tour_bookings(id),

  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  customer_name VARCHAR(100),
  customer_country VARCHAR(2),

  verified BOOLEAN DEFAULT FALSE,  -- Linked to real booking

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tours_operator ON tours(operator_id);
CREATE INDEX idx_tours_category ON tours(category);
CREATE INDEX idx_tours_active ON tours(active) WHERE active = TRUE;
CREATE INDEX idx_bookings_tour ON tour_bookings(tour_id);
CREATE INDEX idx_bookings_operator ON tour_bookings(operator_id);
CREATE INDEX idx_bookings_date ON tour_bookings(booking_date);
CREATE INDEX idx_bookings_status ON tour_bookings(status);
```

### 5.4 API Endpoints

```
PUBLIC ENDPOINTS
────────────────────────────────────────────────────
GET    /api/tours                    List tours (with filters)
GET    /api/tours/:slug              Tour detail
GET    /api/tours/:id/reviews        Tour reviews
POST   /api/bookings                 Create booking
GET    /api/operators/:id            Operator public profile

AUTHENTICATED ENDPOINTS (Operator)
────────────────────────────────────────────────────
POST   /api/auth/send-otp            Send OTP to phone
POST   /api/auth/verify-otp          Verify OTP, get session
GET    /api/operator/me              Get operator profile
PUT    /api/operator/me              Update profile
GET    /api/operator/tours           List operator's tours
POST   /api/operator/tours           Create tour
PUT    /api/operator/tours/:id       Update tour
DELETE /api/operator/tours/:id       Delete tour
GET    /api/operator/bookings        List bookings
PUT    /api/operator/bookings/:id    Update booking status
GET    /api/operator/qr              Get QR code
GET    /api/operator/stats           Basic analytics
```

### 5.5 Integrations

#### WhatsApp Business API

```typescript
// Booking confirmation message
const sendWhatsAppConfirmation = async (booking: Booking, tour: Tour) => {
  const message = `
🎫 Booking Confirmed!

Tour: ${tour.name}
Date: ${formatDate(booking.booking_date)}
Time: ${booking.booking_time}
People: ${booking.number_of_people}
Pickup: ${booking.pickup_location}

Total: ${formatCurrency(booking.total_price_vnd, 'VND')}

Operator: ${tour.operator.name}
Contact: ${tour.operator.phone}

Questions? Reply to this message.
  `;

  await whatsapp.sendMessage(booking.customer_phone, message);
};
```

#### Currency Conversion

```typescript
// Real-time rates (cached 1 hour)
const CURRENCY_RATES = {
  VND: 1,
  USD: 25000,
  EUR: 27000,
  KRW: 19,
  JPY: 170,
  CNY: 3500,
  AUD: 16000,
  GBP: 31000,
};

const convertPrice = (vnd: number, currency: string): number => {
  return vnd / CURRENCY_RATES[currency];
};
```

---

## 6. UI/UX Specifications

### 6.1 Design Principles

| Principle | Application |
|-----------|-------------|
| **Mobile-first** | 95% users on phone, design for small screens |
| **Scannable** | Info visible at glance, no hidden content |
| **Trust signals** | Photos, reviews, verified badges visible |
| **Fast** | Load <3s on 3G, minimal JS |
| **Accessible** | Large buttons, high contrast, works in sunlight |

### 6.2 Key Screens

#### Screen 1: Tour Menu (Home)

```
┌─────────────────────────────────────┐
│ [Logo]     🌐 EN ▼     💰 USD ▼    │
├─────────────────────────────────────┤
│                                     │
│  Welcome to                         │
│  MINH'S TOURS                       │
│  ⭐ 4.8 (127 reviews) ✓ Verified   │
│                                     │
├─────────────────────────────────────┤
│ [🏍️ Day Tours] [🚗 Transport]      │
│ [🎨 Experiences]                    │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Photo]                         │ │
│ │ Marble Mountains Adventure      │ │
│ │ ⭐ 4.9 · 3 hours · 25km        │ │
│ │ 250,000₫ · $10 /person         │ │
│ │               [View Details →] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Photo]                         │ │
│ │ Hoi An Sunset Tour              │ │
│ │ ⭐ 4.7 · 4 hours · 30km        │ │
│ │ 400,000₫ · $16 /person         │ │
│ │               [View Details →] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Photo]                         │ │
│ │ Airport Transfer                │ │
│ │ ⭐ 4.8 · 30 min · 35km         │ │
│ │ 300,000₫ · $12 /vehicle        │ │
│ │               [View Details →] │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ 📞 Contact: +84 905 123 456        │
│ 💬 WhatsApp  💬 Zalo               │
└─────────────────────────────────────┘
```

#### Screen 2: Tour Detail

```
┌─────────────────────────────────────┐
│ ← Back                    🌐 EN ▼  │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │         [Photo Gallery]         │ │
│ │          ● ○ ○ ○ ○              │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Marble Mountains Adventure          │
│ ⭐ 4.9 (89 reviews)                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⏱ 3 hours  📍 25km  👥 1-4     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💰 250,000₫ / $10 per person       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Explore the mystical Marble         │
│ Mountains with a local guide.       │
│ Visit ancient pagodas, caves,       │
│ and enjoy panoramic views...        │
│                                     │
├─────────────────────────────────────┤
│ ✅ What's Included                  │
│                                     │
│ • Hotel pickup & drop-off           │
│ • English-speaking driver           │
│ • Entrance fees                     │
│ • Bottled water                     │
│ • Helmet                            │
│                                     │
├─────────────────────────────────────┤
│ ❌ Not Included                     │
│                                     │
│ • Lunch                             │
│ • Tips                              │
│ • Cable car (100,000₫ optional)    │
│                                     │
├─────────────────────────────────────┤
│ 🗺️ Route                           │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │         [Google Map]            │ │
│ │    Hotel → Mountains → Hotel    │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ ⏰ Departure Times                  │
│                                     │
│ [08:00 AM]  [02:00 PM]  [Flexible] │
│                                     │
├─────────────────────────────────────┤
│ 📝 Reviews                          │
│                                     │
│ 🇰🇷 "Amazing experience!" ⭐⭐⭐⭐⭐   │
│ 🇦🇺 "Minh was very friendly" ⭐⭐⭐⭐⭐│
│ 🇯🇵 "Beautiful views" ⭐⭐⭐⭐        │
│                                     │
│ [See all 89 reviews →]              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │      [  📅 BOOK NOW  ]          │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

#### Screen 3: Booking Form

```
┌─────────────────────────────────────┐
│ ← Back          Book This Tour     │
├─────────────────────────────────────┤
│                                     │
│ Marble Mountains Adventure          │
│ 250,000₫ / $10 per person          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 📅 Select Date                      │
│ ┌─────────────────────────────────┐ │
│ │  < January 2026 >               │ │
│ │  Mo Tu We Th Fr Sa Su           │ │
│ │        1  2  3  4  5            │ │
│ │   6  7  8  9 10 11 12           │ │
│ │  13 14 15 16 17 18 19           │ │
│ │  20 21 22 23 24 25 26           │ │
│ │  27[28]29 30 31                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⏰ Select Time                      │
│ [ 08:00 AM ]  [●02:00 PM]          │
│                                     │
│ 👥 Number of People                 │
│ [ - ]    2    [ + ]                │
│                                     │
│ 📍 Pickup Location                  │
│ ┌─────────────────────────────────┐ │
│ │ Hotel name or address...        │ │
│ └─────────────────────────────────┘ │
│ Popular: Novotel · Pullman · Hyatt │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 👤 Your Details                     │
│                                     │
│ Name *                              │
│ ┌─────────────────────────────────┐ │
│ │ Sarah Kim                       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Phone (WhatsApp) *                  │
│ ┌─────────────────────────────────┐ │
│ │ +82 10 1234 5678                │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Email (optional)                    │
│ ┌─────────────────────────────────┐ │
│ │ sarah@email.com                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Special Requests (optional)         │
│ ┌─────────────────────────────────┐ │
│ │ We have a child (5 years old)   │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 💰 Price Summary                    │
│                                     │
│ Marble Mountains × 2 people         │
│ 250,000₫ × 2 = 500,000₫            │
│                                     │
│ Total: 500,000₫ ≈ $20 USD          │
│                                     │
│ 💳 Pay on pickup (cash/card)       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   [  ✓ CONFIRM BOOKING  ]       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ By booking, you agree to our        │
│ Terms of Service                    │
│                                     │
└─────────────────────────────────────┘
```

#### Screen 4: Confirmation

```
┌─────────────────────────────────────┐
│                                     │
│           ✅                        │
│                                     │
│    Booking Confirmed!               │
│                                     │
│    Confirmation sent via WhatsApp   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 📋 Booking Details                  │
│                                     │
│ Tour: Marble Mountains Adventure    │
│ Date: January 28, 2026              │
│ Time: 2:00 PM                       │
│ People: 2                           │
│ Pickup: Novotel Da Nang             │
│                                     │
│ Total: 500,000₫ ($20 USD)          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 👤 Your Operator                    │
│                                     │
│ Minh's Tours                        │
│ ⭐ 4.8 · ✓ Verified                │
│                                     │
│ 📞 +84 905 123 456                 │
│                                     │
│ [💬 WhatsApp]  [💬 Zalo]           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ⏰ What's Next?                     │
│                                     │
│ 1. Save operator contact            │
│ 2. Be ready at 1:45 PM              │
│ 3. Bring cash (VND or USD)          │
│ 4. Enjoy your tour! 🎉             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ [  📥 Save Booking Details  ]       │
│                                     │
│ [  🏠 Browse More Tours  ]          │
│                                     │
└─────────────────────────────────────┘
```

### 6.3 Design Tokens

```css
/* Colors */
--primary: #E07B39;      /* Warm orange - adventure */
--secondary: #2C5F2D;    /* Forest green - nature */
--accent: #FFB400;       /* Gold - premium */
--background: #FAFAF8;   /* Warm white */
--text: #1A1A1A;         /* Near black */
--text-muted: #666666;   /* Grey */
--success: #22C55E;      /* Green */
--error: #EF4444;        /* Red */

/* Typography */
--font-heading: 'Plus Jakarta Sans', sans-serif;
--font-body: 'Inter', sans-serif;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;
```

---

## 7. Metrics & Success Criteria

### 7.1 Key Performance Indicators

| KPI | Definition | Target (M1) | Target (M3) | Target (M6) |
|-----|------------|-------------|-------------|-------------|
| **Operators** | Registered operators | 10 | 50 | 150 |
| **Tours** | Active tour listings | 30 | 200 | 600 |
| **Bookings** | Completed bookings | 50 | 300 | 1,500 |
| **Conversion** | View → Book rate | 10% | 15% | 20% |
| **GMV** | Total booking value (USD) | $500 | $5,000 | $30,000 |
| **NPS** | Operator satisfaction | 40 | 50 | 60 |
| **Rating** | Avg tour rating | 4.5 | 4.6 | 4.7 |

### 7.2 Success Criteria for Launch

| Criteria | Threshold | Measurement |
|----------|-----------|-------------|
| Page load time | < 3 seconds | Lighthouse |
| Booking completion rate | > 60% | Analytics |
| WhatsApp delivery rate | > 95% | API logs |
| Zero critical bugs | 0 P0 bugs | QA testing |
| Operator onboarding time | < 10 minutes | User testing |
| Tourist booking time | < 3 minutes | User testing |

### 7.3 Analytics Events

```typescript
// Key events to track
const ANALYTICS_EVENTS = {
  // Discovery
  TOUR_MENU_VIEW: 'tour_menu_view',
  TOUR_CARD_CLICK: 'tour_card_click',
  TOUR_DETAIL_VIEW: 'tour_detail_view',
  TOUR_GALLERY_SWIPE: 'tour_gallery_swipe',

  // Booking
  BOOKING_START: 'booking_start',
  BOOKING_DATE_SELECT: 'booking_date_select',
  BOOKING_SUBMIT: 'booking_submit',
  BOOKING_CONFIRM: 'booking_confirm',
  BOOKING_ABANDON: 'booking_abandon',

  // Communication
  WHATSAPP_CLICK: 'whatsapp_click',
  ZALO_CLICK: 'zalo_click',
  PHONE_CLICK: 'phone_click',

  // Operator
  OPERATOR_REGISTER: 'operator_register',
  TOUR_CREATE: 'tour_create',
  QR_DOWNLOAD: 'qr_download',
};
```

---

## 8. Timeline & Phases

### 8.1 Development Phases

```
PHASE 1: MVP (Week 1-2)
────────────────────────────────────────────────────
Goal: Basic booking flow works end-to-end

Week 1:
├── Day 1-2: Project setup, database schema
├── Day 3-4: Tour listing + detail pages
└── Day 5: Multi-language, multi-currency

Week 2:
├── Day 1-2: Booking form + submission
├── Day 3: WhatsApp confirmation
├── Day 4: Operator registration + tour creation
└── Day 5: QR code generation, testing


PHASE 2: Polish (Week 3)
────────────────────────────────────────────────────
Goal: Production-ready quality

├── Day 1: Photo upload + gallery
├── Day 2: Reviews display
├── Day 3: Route maps (Google Maps)
├── Day 4: Operator dashboard
└── Day 5: Testing, bug fixes


PHASE 3: Launch (Week 4)
────────────────────────────────────────────────────
Goal: Live with first operators

├── Day 1-2: Beta testing with 3 operators
├── Day 3: Feedback implementation
├── Day 4: Soft launch (10 operators)
└── Day 5: Marketing materials, QR templates
```

### 8.2 Milestones

| Milestone | Date | Deliverable |
|-----------|------|-------------|
| M1: Setup | Day 2 | Database + project structure |
| M2: Core UI | Day 5 | Tour menu + detail pages |
| M3: Booking | Day 9 | End-to-end booking works |
| M4: Operators | Day 12 | Dashboard + tour management |
| M5: Beta | Day 15 | 3 operators testing |
| M6: Launch | Day 20 | Live with 10 operators |

### 8.3 Resource Requirements

| Role | Allocation | Responsibility |
|------|------------|----------------|
| Developer | 100% | Frontend + Backend + Integration |
| Designer | 20% | UI review, assets |
| QA | 10% | Testing |
| Product | 5% | Requirements, feedback |

---

## 9. Risks & Mitigations

### 9.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| WhatsApp API rate limits | Medium | High | Queue messages, Zalo fallback |
| Slow page load (3G) | Medium | High | Aggressive optimization, lazy load |
| Translation quality | Low | Medium | Professional review for 5 main languages |
| Currency rate staleness | Low | Low | Cache 1 hour, show "approximate" |

### 9.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low operator adoption | Medium | High | Free tier, simple onboarding, in-person demos |
| Operators not responding | Medium | High | Response time metrics, warnings |
| Fake/scam operators | Low | High | Phone verification, review system, manual verification |
| Competition from Klook | Low | Medium | Focus on small operators they don't serve |

### 9.3 Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Booking disputes | Medium | Medium | Clear terms, operator contact visible |
| No-shows (tourist) | Medium | Low | Reminder messages, cancellation policy |
| No-shows (operator) | Low | High | Verified badge system, reviews |

---

## 10. Appendix

### 10.1 Competitor Analysis

| Platform | Strengths | Weaknesses | Our Advantage |
|----------|-----------|------------|---------------|
| **Klook** | Brand trust, big catalog | High commission (20%), no small operators | Free for operators, local focus |
| **GetYourGuide** | International reach | Expensive, slow onboarding | Instant setup, QR-based |
| **Viator** | Reviews, booking system | Same issues as above | Same as above |
| **Facebook** | Free, widely used | No booking, no structure | Structured menu, booking flow |
| **Paper signs** | Zero cost | No translation, no booking | Multilingual, bookable |

### 10.2 Market Research

**Vietnam Tourism Stats (2025):**
- 15+ million international visitors
- Top sources: Korea (25%), China (20%), Japan (10%), US (8%)
- Average spend: $1,200/visit
- Day tours: 35% of activities booked

**Da Nang Specific:**
- 5+ million tourists/year
- 500+ small tour operators (estimated)
- Popular tours: Marble Mountains, Ba Na Hills, Hoi An

### 10.3 User Research Quotes

**Tourists:**
> "I wanted to do a cooking class but the sign was only in Vietnamese. I couldn't understand anything." - Australian tourist

> "The tour prices on Klook seemed expensive. I saw cheaper signs on the street but was worried about scams." - Korean tourist

**Operators:**
> "I lose many customers because I can't speak their language. If they could read my tours on their phone, I would get more bookings." - Motorbike tour operator

> "Big companies charge 30% commission. I want to sell directly but tourists don't trust paper." - Day tour operator

### 10.4 Glossary

| Term | Definition |
|------|------------|
| **Operator** | Tour provider (individual or business) |
| **GMV** | Gross Merchandise Value (total booking value) |
| **Conversion** | Percentage of viewers who complete booking |
| **VND** | Vietnamese Dong (currency) |
| **OTP** | One-Time Password (phone verification) |
| **Zalo** | Popular Vietnamese messaging app |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-26 | GUDBRO Team | Initial PRD |

---

**Next Steps:**
1. ✅ PRD Review & Approval
2. ⏳ UI/UX Design (frontend-design skill)
3. ⏳ Technical Spec
4. ⏳ Development Sprint 1
