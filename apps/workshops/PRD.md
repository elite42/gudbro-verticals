# GUDBRO Workshops & Experiences - Product Requirements Document

**Product:** GUDBRO Workshops & Experiences PWA
**Version:** 2.0
**Status:** Planning
**Last Updated:** 2026-01-27
**Author:** GUDBRO Team

---

## Table of Contents

1. [Vision & Objective](#1-vision--objective)
2. [Market Context & Opportunity](#2-market-context--opportunity)
3. [User Personas](#3-user-personas)
4. [User Journeys](#4-user-journeys)
5. [Core Features (Phase 1 MVP)](#5-core-features-phase-1-mvp)
6. [Technical Architecture](#6-technical-architecture)
7. [Design System](#7-design-system)
8. [Information Architecture](#8-information-architecture)
9. [Success Metrics (KPIs)](#9-success-metrics-kpis)
10. [Roadmap (Phase 1-3)](#10-roadmap-phase-1-3)
11. [Risks & Mitigations](#11-risks--mitigations)
12. [Business Model Details](#12-business-model-details)
13. [Cross-Vertical Integration](#13-cross-vertical-integration)

---

## 1. Vision & Objective

### Vision

Become the definitive digital marketplace for authentic, hands-on cultural workshops and experiences in Central Vietnam -- empowering small artisan operators to reach international tourists while preserving and celebrating traditional Vietnamese craftsmanship.

### Objective

Launch a PWA for the Da Nang / Hoi An corridor that:

1. **Surfaces hidden gems** -- connects tourists with small, independent workshop operators who have zero digital presence today (80%+ of the market)
2. **Removes friction** -- eliminates the language barrier, opaque scheduling, and trust gap that prevent tourists from booking artisan experiences
3. **Preserves culture** -- creates sustainable income for traditional craftspeople (lantern makers, silk weavers, potters) so their skills survive the next generation
4. **Charges the lowest commission in the market** -- 10-15% vs 20-30% on Viator/GetYourGuide/Klook, meaning operators keep 85-90% of revenue
5. **Integrates into the GUDBRO ecosystem** -- plugs workshops alongside accommodations, tours, wellness, laundry, and coffeeshop verticals

### Value Proposition

| For Tourists | For Workshop Operators | For Hotels/Accommodations |
| --- | --- | --- |
| Discover authentic workshops in one place, in their language | Digital storefront without any technical skills | Offer "local experiences" as a guest amenity |
| Transparent pricing in their currency (VND/USD/EUR/KRW) | Lowest commission in the market (10-15% vs 20-30%) | Earn 10% referral commission on every booking |
| Verified reviews and photo portfolios from past participants | Steady stream of international bookings via WhatsApp/Zalo | Content for in-stay PWA page -- differentiation vs Booking/Airbnb |
| Filter by type, language, duration, price, area, skill level | Simplified booking management -- one-tap confirm | Data on guest activity preferences for personalization |
| Book in English with instant confirmation via messaging | Pre/post experience customer communication handled | Cross-sell alongside tours, wellness, laundry verticals |
| Integration with accommodation (hotel suggests nearby workshops) | Tracked payments with transparent accounting | Network effect -- happy guests leave better reviews for the property too |

---

## 2. Market Context & Opportunity

### 2.1 Vietnam: The Most Affordable Workshop Destination in SEA

Vietnam -- and specifically the Hoi An / Da Nang corridor -- is the **workshop capital of Southeast Asia**. Hoi An alone has hundreds of artisan workshops spanning cooking, lanterns, pottery, silk, tailoring, and more. Vietnam is consistently **40-60% cheaper** than Bali and Chiang Mai for equivalent experiences.

| Workshop Type | Vietnam Price Range | Bali Price Range | Chiang Mai Price Range | Vietnam Advantage |
| --- | --- | --- | --- | --- |
| **Cooking class** | $8 - $59 | $30 - $65 | $25 - $55 | 40-50% cheaper |
| **Crafts (pottery, lanterns)** | $15 - $40 | $25 - $60 | $20 - $45 | 40-50% cheaper |
| **Art & painting** | $20 - $50 | $30 - $70 | $25 - $55 | 35-45% cheaper |
| **Jewelry making** | $30 - $60 | $35 - $80 | $30 - $60 | 20-40% cheaper |
| **Bamboo craft** | $15 - $35 | $20 - $45 | $15 - $35 | 25-40% cheaper |
| **Martial arts (per session)** | $10 - $30 | $20 - $50 | $15 - $40 | 40-50% cheaper |
| **Traditional dance** | $15 - $30 | $20 - $45 | $15 - $35 | 25-35% cheaper |
| **Coffee experience** | $10 - $25 | $15 - $40 | $12 - $30 | 30-40% cheaper |
| **Fashion / Ao Dai** | $30 - $80 | N/A | N/A | Unique to Vietnam |
| **Food tours** | $15 - $45 | $30 - $75 | $20 - $50 | 40-55% cheaper |

### 2.2 The Problem: 80%+ Operators Are Digitally Invisible

| Problem | Impact |
| --- | --- |
| **No digital presence** | 80%+ of workshop operators are SMEs with no website, no booking system, just a physical location and maybe a Facebook page |
| **Language barrier** | Operators speak limited English; tourists cannot understand offerings, schedules, inclusions, or skill requirements |
| **Discovery gap** | Tourists rely on hotel concierge, TripAdvisor reviews (no booking), or random walk-ins -- missing dozens of options |
| **No real-time availability** | Tourists walk to a workshop only to find it's full, closed today, or the English-speaking instructor is off |
| **Trust deficit** | No verified reviews, no portfolio, no way to evaluate quality before committing time and money |
| **Booking friction** | No online booking; must call, message on Facebook, or physically show up |
| **Payment limitations** | Cash only in most cases; no way to hold a spot or prepay |

### 2.3 Operator Landscape

Workshops in Da Nang / Hoi An are run by diverse types of operators:

| Operator Type | Examples | Characteristics |
| --- | --- | --- |
| **Independent artisans / families** | Lantern makers in Hoi An Old Town, pottery in Thanh Ha village | Multi-generational skills, zero digital presence, Vietnamese only |
| **Cooking schools** | Red Bridge Cooking School, Green Bamboo Cooking Class | Some digital presence, higher prices, English-speaking, already on OTAs |
| **International instructors (expats)** | Yoga teachers, art workshop leaders, photography walks | Tech-savvy, English-native, price-sensitive on commission |
| **Resort / hotel in-house** | Hotel cooking classes, on-site massage + craft workshops | Captive audience but limited to hotel guests |
| **Craft cooperatives** | Silk weaving co-ops, community-based tourism initiatives | Government-linked, multiple artisans, variable quality |

### 2.4 Market Numbers

- **Da Nang:** 10.9M visitors in 2024, target 11.9M in 2025 (9.2% growth)
- **Hoi An:** THE workshop capital of Vietnam for international tourists -- nearly every visitor does at least one workshop
- **Vietnam total:** 17.5M+ international visitors (2025), growing ~15% YoY
- **Digital nomads:** 50,000+ in Vietnam, seeking authentic cultural experiences alongside remote work
- **Expat community:** Growing steadily, values cultural immersion and regular activities
- **Workshop market size (estimated):** $50-80M/year in the Da Nang/Hoi An corridor alone (based on 5M+ tourists, 30%+ participation rate, $30 average spend)

### 2.5 Competitive Landscape

| Platform | Focus | Commission | Strengths | Weaknesses |
| --- | --- | --- | --- | --- |
| **TripAdvisor** | Reviews & discovery | N/A (no booking) | Massive traffic, trust, reviews | **No direct booking capability** -- just reviews and links |
| **Airbnb Experiences** | Peer-to-peer | 20% | Brand trust, social proof | Declining focus on experiences (20% and shrinking) |
| **GetYourGuide / Viator** | Global activities | 20-30% | Strong global traffic, trust | High commission, favors big operators, limited Vietnam depth |
| **Klook** | Asian activities | 15-25% | Strong Asian market traffic | Standardized experiences; less authentic/artisan feel |
| **Cookly** | Cooking classes only | 15-20% | Niche cooking focus, good UX | **Cooking only** -- no crafts, no lanterns, no pottery, no silk |
| **Facebook / Instagram** | Organic social | 0% | Free, visual | No booking, no availability, no structured reviews |
| **Hotel concierge** | Manual referral | 15-25% kickback | Trusted by guests | Limited selection, biased toward kickback-paying partners |
| **Visit Vietnam (Gov)** | National tourism platform | TBD | Government backing, launching Q2 2026 | **Won't cover independent small workshops** -- bureaucratic, formal operators only |
| **GUDBRO Workshops** | Vietnam artisan experiences | **10-15%** | **Lowest commission, local-first, ecosystem integration, multi-language, WhatsApp/Zalo native** | New entrant, needs to build supply |

**GUDBRO's five competitive advantages:**

1. **Lowest commission** (10-15% vs 20-30%) -- operators keep 85-90% of revenue
2. **Ecosystem integration** -- cross-sell from GUDBRO Stays, Tours, Wellness, Coffeeshop, Laundry
3. **Local-first design** -- built for Vietnam's small operators, not adapted from a global template
4. **Multi-vertical referral network** -- hotels earn 10% for recommending workshops to guests
5. **WhatsApp/Zalo native booking** -- operators use tools they already know (no new software to learn)

---

## 3. User Personas

### Persona 1: Experience-Seeking Tourist -- "Sophie"

- **Demographics:** 26-38, European or Australian, traveling solo or as a couple
- **Context:** Visiting Hoi An for 3-5 days, wants to "do something local," has seen lantern-making photos on Instagram
- **Budget:** $15-50 per workshop, willing to spend more for unique experiences
- **Pain points:**
  - Googles "Hoi An workshops" and gets Viator results that all look the same (cookie-cutter cooking classes)
  - Walks down the street and sees 10 workshops but cannot compare them (pricing, quality, reviews, what's included)
  - Language barrier: cannot ask detailed questions about what's included, how long it takes, skill level required
  - No way to verify quality before committing -- no portfolio of past work, no verified reviews
- **Behavior:** Discovers GUDBRO via QR code at her accommodation, Google search, or friend's shared link. Browses the catalog on her phone, filters by "lantern making" + "English speaking" + "Hoi An Old Town," reads reviews, views photo gallery of past participants' creations, and sends a WhatsApp booking request
- **Goal:** Find an authentic, well-reviewed workshop and book it without hassle. Take home something she made with her own hands
- **Success metric:** Books within one browsing session; leaves a 5-star review with photos

### Persona 2: Digital Nomad / Long-Term Expat -- "Marcus"

- **Demographics:** 28-42, international (any nationality), working remotely from Da Nang or Hoi An
- **Context:** Has been in Vietnam for 2-6 months. Already done the tourist highlights. Looking for deeper cultural immersion and social activities to break the remote-work routine
- **Budget:** $10-30 per session (recurring), price-sensitive on repeated activities
- **Pain points:**
  - Tourist-oriented workshops feel superficial -- he wants ongoing learning, not a one-off photo op
  - Hard to find martial arts classes (Vovinam), regular pottery sessions, or recurring art workshops
  - Wants to meet locals and other expats through shared experiences
  - Most listings cater to short-stay tourists, not repeat participants
- **Behavior:** Uses GUDBRO regularly. Bookmarks favorite operators. Filters by "multi-session" or "weekly" options. Tries different workshops each week -- pottery on Monday, Vovinam on Wednesday, coffee tasting on Saturday
- **Goal:** Build a weekly routine of cultural activities. Develop real skills (not just tourist-level). Find a community
- **Success metric:** Books 3+ workshops per month; becomes a repeat customer for specific operators

### Persona 3: Small Workshop Operator -- "Thanh"

- **Demographics:** 35-55, Vietnamese, runs a pottery workshop in Thanh Ha village (Hoi An) with 2-3 helpers
- **Context:** Has been making pottery for 20 years, learned from his father. Gets tourists from walk-ins and a few TripAdvisor reviews. No website. Uses Facebook sporadically. Speaks basic English
- **Monthly revenue:** Variable -- 2-5M VND ($80-200) on slow weeks, 8-15M VND ($320-600) in high season
- **Pain points:**
  - Income is unpredictable -- some days 15 tourists, some days zero
  - Cannot communicate with Korean/Chinese tourists at all (lost revenue)
  - Viator wants 25% commission and requires complex onboarding he cannot navigate
  - Does not know how to take online bookings or manage a digital calendar
  - Photos of his work are only on his personal Facebook -- not professional quality
- **Behavior:** GUDBRO team visits his workshop, takes professional photos, creates his profile in English/Vietnamese/Korean. He manages availability via a simple WhatsApp/Zalo-based system. Receives booking requests as pre-formatted messages he can confirm with one tap
- **Goal:** Get more tourists through the door with zero tech overhead. Keep most of his revenue. Reach Korean and Chinese tourists he currently misses entirely
- **Success metric:** 30%+ increase in monthly visitors within 3 months of listing

### Persona 4: GUDBRO Hotel Partner -- "Linh" (Hotel Manager)

- **Demographics:** 30-45, Vietnamese, manages a boutique hotel or homestay in Da Nang with 15-30 rooms
- **Context:** Her hotel is on GUDBRO Stays. Guests constantly ask "what should I do in Hoi An?" She currently recommends 2-3 workshops she personally knows, but the suggestions feel limited and she earns nothing from them
- **Revenue from GUDBRO Workshops:** Could earn 10% referral on every guest booking -- estimated $200-500/month at scale
- **Pain points:**
  - Cannot offer a wide variety of curated experiences to guests
  - Competing with Airbnb and Booking.com -- needs differentiation
  - No structured way to track referrals or earn from recommendations
  - Guests who have a great workshop experience leave better hotel reviews -- but she has no data on this
- **Behavior:** Adds the "Workshops & Experiences" card to her GUDBRO in-stay dashboard. When guests ask for recommendations, she points them to the GUDBRO workshops page (auto-filtered by proximity). Every booking through her property earns her 10%. She can see referral earnings in her GUDBRO dashboard
- **Goal:** Enhance guest experience, differentiate from OTA-only hotels, earn passive referral income
- **Success metric:** 20%+ of guests engage with workshops; $300+/month referral income within 6 months

---

## 4. User Journeys

### Journey 1: Tourist Discovery & Booking (Sophie)

```
  ┌──────────────┐
  │   DISCOVERY   │
  │               │
  │  QR at hotel  │
  │  Google search│
  │  Instagram    │
  │  Friend link  │
  └──────┬───────┘
         │
         v
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │   CATALOG     │     │   WORKSHOP    │     │   GALLERY     │
  │               │     │   DETAIL      │     │               │
  │  Browse all   │────>│  Photos       │────>│  Past work    │
  │  Filter by:   │     │  Description  │     │  Student      │
  │  - Type       │     │  Price        │     │    creations  │
  │  - Language   │     │  Duration     │     │  Process      │
  │  - Price      │     │  What's incl. │     │    photos     │
  │  - Area       │     │  Skill level  │     │               │
  │  - Duration   │     │  Languages    │     │               │
  └──────────────┘     │  Location map │     └──────┬───────┘
                       └──────┬───────┘            │
                              │                     │
                              v                     │
                       ┌──────────────┐             │
                       │  CALENDAR     │<───────────┘
                       │               │
                       │  See open     │
                       │  dates/times  │
                       │  Group size   │
                       │  availability │
                       └──────┬───────┘
                              │
                              v
                       ┌──────────────┐     ┌──────────────┐
                       │  BOOKING      │     │  CONFIRMATION │
                       │  REQUEST      │     │               │
                       │               │────>│  WhatsApp/    │
                       │  Pre-filled   │     │  Zalo message │
                       │  message:     │     │  sent to      │
                       │  - Date/time  │     │  operator     │
                       │  - Group size │     │               │
                       │  - Language   │     │  Operator     │
                       │  - Name       │     │  confirms     │
                       └──────────────┘     └──────┬───────┘
                                                   │
                                                   v
                                            ┌──────────────┐
                                            │  POST-VISIT   │
                                            │               │
                                            │  Leave review  │
                                            │  Share photos  │
                                            │  Rate (1-5)    │
                                            │  Recommend     │
                                            └──────────────┘
```

### Journey 2: Operator Listing Creation (Thanh)

```
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  GUDBRO TEAM  │     │  PROFILE      │     │  PHOTO SHOOT  │
  │  VISITS       │     │  CREATION     │     │               │
  │               │     │               │     │  GUDBRO team  │
  │  Explains     │────>│  Workshop     │────>│  takes pro    │
  │  the platform │     │  name         │     │  photos of:   │
  │  in Vietnamese│     │  Description  │     │  - Workspace  │
  │  Shows demos  │     │  Services &   │     │  - Materials  │
  │  Answers Qs   │     │  Pricing      │     │  - Process    │
  │  Signs up     │     │  Languages    │     │  - Finished   │
  │  operator     │     │  spoken       │     │    products   │
  │  (free)       │     │  Duration     │     │  - Thanh at   │
  │               │     │  Group sizes  │     │    work       │
  └──────────────┘     └──────────────┘     └──────┬───────┘
                                                   │
                                                   v
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  GO LIVE!     │     │  QA REVIEW    │     │  AVAILABILITY │
  │               │     │               │     │  SETUP        │
  │  Workshop     │<────│  GUDBRO team  │<────│               │
  │  appears in   │     │  checks:      │     │  Simple       │
  │  catalog      │     │  - Photos OK  │     │  weekly       │
  │               │     │  - Info clear │     │  schedule:    │
  │  QR code      │     │  - Pricing    │     │  "Mon-Sat     │
  │  generated    │     │    fair       │     │   9am, 2pm"   │
  │  for shop     │     │  - Translated │     │  "Sun closed" │
  │  window       │     │    EN/VI/KO   │     │  "Max 8       │
  │               │     │               │     │   per slot"   │
  └──────┬───────┘     └──────────────┘     └──────────────┘
         │
         v
  ┌──────────────┐
  │  ONGOING      │
  │  OPERATIONS   │
  │               │
  │  Receives     │
  │  booking      │
  │  requests on  │
  │  WhatsApp/    │
  │  Zalo as      │
  │  pre-formatted│
  │  messages     │
  │               │
  │  Confirms     │
  │  with 1 tap   │
  │               │
  │  Tourist pays │
  │  on arrival   │
  │  (85% kept)   │
  └──────────────┘
```

### Journey 3: Hotel Referral (Linh's Guests)

```
  ┌──────────────────────────────────────────────────────┐
  │              GUDBRO ACCOMMODATION DASHBOARD           │
  │                                                      │
  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │
  │  │  Room    │ │  Tours   │ │ WORKSHOPS│ │Laundry │  │
  │  │  Info    │ │          │ │ & EXPERI.│ │        │  │
  │  └──────────┘ └──────────┘ └────┬─────┘ └────────┘  │
  └─────────────────────────────────┼────────────────────┘
                                    │
                                    v
  ┌──────────────────────────────────────────────────────┐
  │  DEEP LINK WITH GUEST CONTEXT                        │
  │                                                      │
  │  workshops.gudbro.com/workshops                      │
  │    ?ref=accommodation                                │
  │    &ref_id=beach-view-hotel                          │
  │    &guest=Marcus                                     │
  │    &checkin=2026-02-10                               │
  │    &checkout=2026-02-15                              │
  │    &lang=en                                          │
  │    &currency=USD                                     │
  │    &lat=15.8801                                      │
  │    &lng=108.3380                                     │
  └─────────────────────────────────┬────────────────────┘
                                    │
                                    v
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  NEARBY       │     │  WORKSHOP     │     │  QUICK BOOK   │
  │  WORKSHOPS    │     │  DETAIL       │     │               │
  │               │     │               │     │  Pre-filled:  │
  │  Auto-sorted: │────>│  Full info    │────>│  - Guest name │
  │  - Distance   │     │  + reviews    │     │  - Hotel name │
  │  - Rating     │     │  + calendar   │     │  - Stay dates │
  │  - Available  │     │  + gallery    │     │  - Language   │
  │    during     │     │               │     │  - Currency   │
  │    stay dates │     │               │     │               │
  │               │     │               │     │  Ref tracking │
  │  Filtered to  │     │               │     │  attached     │
  │  dates of stay│     │               │     │               │
  └──────────────┘     └──────────────┘     └──────┬───────┘
                                                   │
                                                   v
                                            ┌──────────────┐
                                            │  COMMISSION    │
                                            │  DISTRIBUTION  │
                                            │               │
                                            │  Operator: 85%│
                                            │  Hotel: 10%   │
                                            │  GUDBRO: 5%   │
                                            │               │
                                            │  Hotel sees   │
                                            │  earnings in  │
                                            │  GUDBRO dash  │
                                            └──────────────┘
```

---

## 5. Core Features (Phase 1 MVP)

### 5.1 Workshop Catalog

The heart of the product. A browsable, filterable catalog of all registered workshops.

**Workshop Card (list view) displays:**

- Hero photo (landscape, 16:9)
- Workshop name
- Type badge (e.g., "Cooking," "Pottery," "Lantern Making")
- Star rating + review count
- Price (in user's preferred currency)
- Duration
- Languages available (flag icons)
- Distance from user (if location access granted)
- "Available today" / "Available tomorrow" badge

**Workshop types supported at launch:**

| Category | Subcategories | Price Range (Vietnam) |
| --- | --- | --- |
| **Cooking** | Vietnamese cooking class, pho making, banh mi, spring rolls, market + cook | $8 - $59 |
| **Crafts** | Lantern making, pottery, silk weaving, embroidery, lacquer art, paper craft | $15 - $40 |
| **Art & Painting** | Watercolor, lacquer painting, calligraphy, sketching | $20 - $50 |
| **Jewelry** | Silver smithing, bead making, pearl crafting | $30 - $60 |
| **Bamboo Craft** | Basket weaving, bamboo boat making, eco-craft | $15 - $35 |
| **Martial Arts** | Vovinam class, Tai Chi session, self-defense | $10 - $30/session |
| **Traditional Dance** | Folk dance, fan dance, water puppet introduction | $15 - $30 |
| **Coffee** | Vietnamese coffee brewing, egg coffee making, roasting tour | $10 - $25 |
| **Fashion / Ao Dai** | Ao Dai fitting + photo, Ao Dai sewing basics, fashion design | $30 - $80 |
| **Food Tours** | Walking food tours, market tours, street food experiences | $15 - $45 |

### 5.2 Search & Filters

| Filter | Options |
| --- | --- |
| **Type** | All 10 categories above, multi-select |
| **Price range** | Slider: $0 - $80 (auto-converts to user currency) |
| **Area / Location** | Hoi An Old Town, An Bang Beach, Da Nang center, Ba Na Hills, Marble Mountains, Thanh Ha, Tra Que, My Son |
| **Language** | English, Vietnamese, Korean, Chinese, Japanese, French |
| **Duration** | Under 1 hour, 1-2 hours, 2-4 hours, Half day (4+h), Full day |
| **Group size** | Solo friendly, Couples, Small group (3-8), Large group (8+) |
| **Skill level** | Beginner (no experience needed), Intermediate, Advanced |
| **Availability** | Today, Tomorrow, This week, Custom date |
| **Sort by** | Rating, Price (low/high), Distance, Popularity, Newest |

Free-text search across workshop names, descriptions, and types. Supports English, Vietnamese, Korean, and Chinese input.

### 5.3 Workshop Detail Page

A rich, immersive detail page giving tourists everything they need to decide.

**Sections:**

1. **Hero Gallery** -- 5-10 high-quality photos (workshop space, materials, process, finished products, happy participants)
2. **Quick Facts Bar** -- Price | Duration | Language | Group Size | Skill Level
3. **Description** -- What you will do, what you will learn, what you take home
4. **What's Included** -- Materials, tools, instructor, finished product, refreshments, certificate
5. **What to Bring** -- Comfortable clothes, camera, etc.
6. **Schedule / Calendar** -- Available dates and times for the next 14 days
7. **Location** -- Map embed, address, directions from popular landmarks
8. **Operator Profile** -- Photo, name, years of experience, story, other workshops offered
9. **Reviews** -- Star rating (1-5), written reviews, photos from past participants
10. **Similar Workshops** -- "You might also like" section
11. **Booking CTA** -- Sticky bottom bar with price and "Book via WhatsApp" / "Book via Zalo" button

### 5.4 Calendar / Availability View

- 14-day rolling calendar display
- Each day shows available time slots (e.g., "9:00 AM - 11:00 AM," "2:00 PM - 4:30 PM")
- Remaining capacity per slot (e.g., "4 spots left")
- Fully booked slots grayed out with "Full" label
- Operator updates availability via simple WhatsApp/Zalo command or basic admin panel

### 5.5 Booking via Messaging (WhatsApp / Zalo)

Phase 1 uses messaging apps that operators already know -- no full booking engine required.

**Flow:**

1. Tourist selects a date, time, and group size on the detail page
2. Taps "Book via WhatsApp" or "Book via Zalo"
3. A **pre-formatted message** opens in the messaging app:

```
Hi [Operator Name]! I'd like to book:

Workshop: [Workshop Name]
Date: [Selected Date]
Time: [Selected Time]
Guests: [Number]
Language: [Preferred Language]
Name: [Tourist Name]

Booked via GUDBRO Workshops
Ref: #GW-[booking-id]
```

4. Operator receives the message, confirms or suggests alternative
5. Tourist pays on arrival (cash or card if operator accepts)

**Why this works for Phase 1:**

- Zero tech overhead for operators (they already use WhatsApp/Zalo daily)
- No payment integration complexity
- Personal touch that tourists appreciate
- GUDBRO tracks booking requests via the reference ID for analytics

### 5.6 Reviews & Ratings System

- **Star rating:** 1-5 stars, required
- **Written review:** Optional, supports photo uploads
- **Verified badge:** "Visited via GUDBRO" for bookings initiated through the platform
- **Operator response:** Operators can reply to reviews
- **Moderation:** GUDBRO team reviews flagged content
- **Display:** Most recent first, with "Most helpful" sort option
- **Review prompt:** Automated WhatsApp/Zalo message 24 hours after the workshop date: "How was your [Workshop Name] experience? Leave a review!"

### 5.7 Multi-Language Support

| Language | Code | Priority | Launch Phase |
| --- | --- | --- | --- |
| English | EN | P0 | Phase 1 |
| Vietnamese | VI | P0 | Phase 1 |
| Korean | KO | P1 | Phase 1 |
| Chinese (Simplified) | ZH | P1 | Phase 2 |
| Japanese | JA | P2 | Phase 2 |
| French | FR | P2 | Phase 3 |

- UI chrome (buttons, labels, navigation) translated for all P0/P1 languages at launch
- Workshop descriptions translated by GUDBRO team (human-reviewed AI translation)
- Reviews shown in original language with auto-translate option
- Language auto-detected from browser, manual override available

### 5.8 Multi-Currency Display

| Currency | Code | Auto-detect |
| --- | --- | --- |
| Vietnamese Dong | VND | Default |
| US Dollar | USD | EN locale |
| Euro | EUR | EU locales |
| Korean Won | KRW | KO locale |
| Australian Dollar | AUD | AU locale |
| Chinese Yuan | CNY | ZH locale |

- Prices stored in VND (source of truth)
- Phase 1: static exchange rates updated weekly
- Phase 2: daily rate updates via API
- Currency auto-detected from locale, manual override available

### 5.9 Operator Profile Pages

Each operator gets a professional profile page as their digital portfolio.

- **Header:** Operator photo, name, tagline ("Master Potter since 1998")
- **About:** Their story, background, craft heritage
- **Workshops offered:** All their listed workshops
- **Gallery:** Best photos of work, space, and students
- **Stats:** Years active, workshops completed, average rating
- **Reviews:** Aggregated across all workshops
- **Location:** Map with workshop address
- **Contact:** WhatsApp/Zalo buttons
- **Shareable URL:** `workshops.gudbro.com/operator/[slug]`

### 5.10 SEO & Discovery

- Individual workshop pages with structured data (Schema.org `Event` + `LocalBusiness`)
- Category landing pages: `/workshops/cooking`, `/workshops/pottery`, etc.
- Location landing pages: `/area/hoi-an`, `/area/da-nang`, etc.
- Auto-generated sitemap
- Multi-language hreflang meta tags
- Open Graph tags for social sharing with workshop photos
- Google Business Profile integration guidance for operators

### 5.11 PWA Features

- Installable (Add to Home Screen prompt)
- Offline service worker caches catalog for offline browsing
- Native share API for workshop links
- Fast: target < 2s First Contentful Paint

---

## 6. Technical Architecture

### 6.1 Tech Stack

| Layer | Technology | Notes |
| --- | --- | --- |
| **Framework** | Next.js 14 (App Router) | Consistent with GUDBRO ecosystem |
| **Styling** | Tailwind CSS | Utility-first, responsive, custom theme |
| **UI Components** | Radix UI + custom | Accessible, composable |
| **Icons** | Phosphor Icons | 9,000+ icons, duotone weight preferred |
| **Database** | Supabase (PostgreSQL) | Shared infrastructure with other verticals |
| **Auth** | Supabase Auth | For operator admin panel (Phase 2) |
| **Images** | Supabase Storage + Vercel Image Optimization | High-quality workshop photos |
| **Deploy** | Vercel | PWA with edge caching |
| **Analytics** | Plausible or PostHog | Privacy-friendly, event tracking |
| **Maps** | Google Maps Embed API | Workshop locations |
| **i18n** | next-intl or custom solution | 4+ languages at launch |
| **Currency** | exchangerate-api.com or similar | Static rates Phase 1, live API Phase 2 |

### 6.2 Project Structure

```
apps/workshops/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                       # Homepage: hero, featured, categories
│   │   ├── layout.tsx                     # Root layout with theme, fonts, PWA
│   │   ├── workshops/
│   │   │   ├── page.tsx                   # Full catalog with filters
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx              # Workshop detail page
│   │   │   ├── cooking/
│   │   │   │   └── page.tsx              # Category: cooking
│   │   │   ├── pottery/
│   │   │   │   └── page.tsx              # Category: pottery
│   │   │   └── [type]/
│   │   │       └── page.tsx              # Dynamic category pages
│   │   ├── area/
│   │   │   ├── hoi-an/
│   │   │   │   └── page.tsx              # Location: Hoi An
│   │   │   ├── da-nang/
│   │   │   │   └── page.tsx              # Location: Da Nang
│   │   │   └── [area-slug]/
│   │   │       └── page.tsx              # Dynamic location pages
│   │   ├── operator/
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Operator profile page
│   │   ├── search/
│   │   │   └── page.tsx                  # Search results
│   │   ├── about/
│   │   │   └── page.tsx                  # About GUDBRO Workshops
│   │   ├── for-operators/
│   │   │   └── page.tsx                  # Operator acquisition landing
│   │   ├── sitemap.xml/
│   │   │   └── route.ts                  # Dynamic sitemap
│   │   └── robots.txt/
│   │       └── route.ts                  # Robots config
│   ├── components/
│   │   ├── catalog/
│   │   │   ├── WorkshopCard.tsx          # Workshop card (list/grid)
│   │   │   ├── WorkshopGrid.tsx          # Grid layout with filters
│   │   │   ├── CategoryBadge.tsx         # Type badge component
│   │   │   ├── FilterBar.tsx             # Search + filter controls
│   │   │   ├── FilterSheet.tsx           # Mobile filter bottom sheet
│   │   │   └── SortDropdown.tsx          # Sort options
│   │   ├── detail/
│   │   │   ├── HeroGallery.tsx           # Photo gallery with swipe
│   │   │   ├── QuickFacts.tsx            # Price/duration/language bar
│   │   │   ├── IncludedList.tsx          # What's included section
│   │   │   ├── CalendarView.tsx          # 14-day availability calendar
│   │   │   ├── OperatorCard.tsx          # Operator mini-profile
│   │   │   ├── ReviewList.tsx            # Reviews section
│   │   │   ├── SimilarWorkshops.tsx      # Related workshops
│   │   │   ├── BookingBar.tsx            # Sticky bottom CTA
│   │   │   └── LocationMap.tsx           # Map embed
│   │   ├── booking/
│   │   │   ├── BookingSheet.tsx          # Booking bottom sheet
│   │   │   ├── DatePicker.tsx            # Date selection
│   │   │   ├── TimePicker.tsx            # Time slot selection
│   │   │   ├── GuestCounter.tsx          # Group size selector
│   │   │   └── MessagePreview.tsx        # WhatsApp/Zalo message preview
│   │   ├── reviews/
│   │   │   ├── ReviewCard.tsx            # Individual review display
│   │   │   ├── ReviewForm.tsx            # Submit review form
│   │   │   ├── RatingStars.tsx           # Star display/input
│   │   │   └── PhotoUpload.tsx           # Review photo upload
│   │   ├── operator/
│   │   │   ├── OperatorProfile.tsx       # Full operator profile
│   │   │   ├── OperatorStory.tsx         # About section
│   │   │   └── OperatorStats.tsx         # Stats display
│   │   └── shared/
│   │       ├── Header.tsx                # App header
│   │       ├── BottomNav.tsx             # Mobile bottom navigation
│   │       ├── CurrencyToggle.tsx        # Currency switcher
│   │       ├── LanguageSelector.tsx       # Language switcher
│   │       ├── WhatsAppButton.tsx        # WhatsApp CTA
│   │       ├── ZaloButton.tsx            # Zalo CTA
│   │       ├── ShareButton.tsx           # Native share
│   │       └── AvailabilityBadge.tsx     # "Available today" badge
│   ├── config/
│   │   ├── site.ts                       # Site metadata, URLs
│   │   ├── categories.ts                # Workshop type definitions
│   │   ├── areas.ts                     # Location definitions
│   │   └── currencies.ts               # Currency config + rates
│   ├── lib/
│   │   ├── types.ts                     # TypeScript interfaces
│   │   ├── mock-data.ts                 # Mock data (Phase 1)
│   │   ├── utils.ts                     # Utility functions
│   │   ├── currency.ts                  # Currency conversion logic
│   │   ├── i18n.ts                      # Internationalization utils
│   │   └── seo.ts                       # SEO helpers
│   └── public/
│       ├── icons/                       # PWA icons
│       ├── images/                      # Static images
│       └── manifest.json               # PWA manifest
└── PRD.md                               # This document
```

### 6.3 Data Model (Core Tables)

```sql
-- Workshop Operators
CREATE TABLE workshop_operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  story TEXT,                       -- operator's personal story / heritage
  photo_url TEXT,
  phone TEXT,
  whatsapp TEXT,
  zalo TEXT,
  email TEXT,
  address TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  area TEXT,                        -- 'hoi-an-old-town', 'da-nang-center', etc.
  years_active INTEGER,
  languages TEXT[],                 -- '{"en","vi","ko"}'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Workshops
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID REFERENCES workshop_operators(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  what_included TEXT,
  what_to_bring TEXT,
  type TEXT NOT NULL,               -- 'cooking', 'pottery', 'lantern', etc.
  price_vnd INTEGER NOT NULL,       -- price in VND (source of truth)
  duration_minutes INTEGER NOT NULL,
  max_group_size INTEGER,
  min_group_size INTEGER DEFAULT 1,
  skill_level TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  languages TEXT[],                 -- languages this workshop is offered in
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Workshop Photos
CREATE TABLE workshop_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id),
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Availability Slots
CREATE TABLE workshop_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_capacity INTEGER NOT NULL,
  booked_count INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Booking Requests (tracking -- actual booking via WhatsApp/Zalo)
CREATE TABLE booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT UNIQUE NOT NULL,  -- 'GW-XXXX'
  workshop_id UUID REFERENCES workshops(id),
  availability_id UUID REFERENCES workshop_availability(id),
  guest_name TEXT,
  guest_count INTEGER DEFAULT 1,
  preferred_language TEXT DEFAULT 'en',
  channel TEXT DEFAULT 'whatsapp',      -- 'whatsapp' or 'zalo'
  referrer_type TEXT,                   -- 'accommodation', 'tour', 'direct', 'qr'
  referrer_id TEXT,                     -- slug of referring property if applicable
  status TEXT DEFAULT 'sent',           -- 'sent','confirmed','completed','cancelled','no_show'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE workshop_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id),
  booking_id UUID REFERENCES booking_requests(id),
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  language TEXT DEFAULT 'en',
  photos TEXT[],                        -- array of photo URLs
  is_verified BOOLEAN DEFAULT false,    -- booked via GUDBRO
  operator_response TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Translations
CREATE TABLE workshop_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id),
  language TEXT NOT NULL,               -- 'en', 'vi', 'ko', 'zh'
  name TEXT,
  description TEXT,
  what_included TEXT,
  what_to_bring TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (workshop_id, language)
);

CREATE TABLE operator_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID REFERENCES workshop_operators(id),
  language TEXT NOT NULL,
  description TEXT,
  story TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (operator_id, language)
);
```

### 6.4 API Endpoints (Phase 1)

```
GET  /api/workshops                        # List workshops (with filters)
GET  /api/workshops/[slug]                # Workshop detail
GET  /api/workshops/[slug]/availability   # Availability for next 14 days
GET  /api/workshops/[slug]/reviews        # Reviews for a workshop
GET  /api/operators/[slug]                # Operator profile
GET  /api/categories                      # All workshop categories
GET  /api/areas                           # All areas/locations
POST /api/booking-request                 # Track a booking request
POST /api/reviews                         # Submit a review
GET  /api/exchange-rates                  # Current exchange rates
```

---

## 7. Design System

### 7.1 Design Philosophy

The Workshops & Experiences vertical should feel **creative, warm, and inspiring** -- like stepping into an artisan's studio. The design celebrates **handmade craft, natural materials, and cultural authenticity**. It must feel distinctly different from the clinical, corporate look of Viator, GetYourGuide, and Klook.

**Core principles:**

1. **Artisanal warmth** -- Earth tones, natural textures, handcrafted feel
2. **Photography-forward** -- Large, warm-toned images of hands at work, materials, finished creations
3. **Mobile-first** -- 90%+ of tourists browse on phones
4. **Trust through transparency** -- Prices, reviews, and inclusions are immediately visible
5. **Cultural respect** -- Celebrate Vietnamese craft heritage, not exoticize it

### 7.2 Color Palette

```css
:root {
  /* Primary - Terracotta (warm, earthy, artisanal) */
  --terracotta: #C2703E;
  --terracotta-light: #E8A977;
  --terracotta-dark: #9B4D2B;

  /* Secondary - Amber Gold (highlights, badges, accents) */
  --amber: #D4A04A;
  --amber-light: #F5E6C4;
  --amber-dark: #B8872E;

  /* Background - Warm Cream & Ivory */
  --ivory: #FAF7F2;
  --cream: #F5EDE3;
  --sand: #EDE0D0;

  /* Text */
  --clay: #8B5E3C;           /* Headings, strong emphasis */
  --charcoal: #2D2A26;       /* Body text */
  --charcoal-light: #5C5650; /* Secondary text */
  --charcoal-muted: #9B9590; /* Captions, placeholders */

  /* Accent - Sage Green (availability, success) */
  --sage: #7A8B6F;
  --sage-light: #D4DFD0;
  --sage-dark: #5A6B4F;

  /* Functional */
  --success: #7A8B6F;        /* Same as sage */
  --error: #C44B4B;
  --warning: #D4A04A;        /* Same as amber */
  --info: #6B8CA0;

  /* Category Accent Colors */
  --cat-cooking: #C2703E;    /* Terracotta */
  --cat-craft: #8B7355;      /* Warm brown */
  --cat-art: #9B6B8A;        /* Muted plum */
  --cat-jewelry: #D4A04A;    /* Amber gold */
  --cat-bamboo: #7A8B6F;     /* Sage green */
  --cat-martial: #8B5E3C;    /* Clay */
  --cat-dance: #C47A8A;      /* Dusty rose */
  --cat-coffee: #6B5344;     /* Dark brown */
  --cat-fashion: #B07AAA;    /* Soft purple */
  --cat-food-tour: #C2703E;  /* Terracotta */
}
```

**Rationale:** These earth tones evoke natural materials -- clay, wood, silk, dried herbs, terracotta pots -- the raw ingredients of Vietnam's artisan workshops. The palette avoids cold blues and sterile whites common on travel platforms.

### 7.3 Typography

```css
:root {
  /* Display / Headlines -- Serif for editorial, crafted quality */
  --font-display: 'DM Serif Display', Georgia, serif;

  /* Body / UI -- Clean sans-serif for readability */
  --font-body: 'DM Sans', system-ui, sans-serif;
}
```

| Element | Font | Weight | Size (mobile) | Size (desktop) |
| --- | --- | --- | --- | --- |
| **H1 (Page title)** | DM Serif Display | 400 | 28px | 40px |
| **H2 (Section heading)** | DM Serif Display | 400 | 22px | 32px |
| **H3 (Card title)** | DM Sans | 600 | 18px | 24px |
| **Body** | DM Sans | 400 | 15px | 16px |
| **Caption / Label** | DM Sans | 500 | 12px | 13px |
| **Price** | DM Sans | 700 | 20px | 24px |
| **Badge text** | DM Sans | 600 | 11px | 12px |

The serif headline font gives the platform a crafted, editorial quality that differentiates it from generic booking platforms.

### 7.4 Visual Language

- **Photography:** Warm-toned, natural light, close-ups of hands working with materials. Show the process, not just the result. People smiling, concentrating, creating. Avoid stock photography -- all images taken by GUDBRO team on-site
- **Card design:** Rounded corners (12-16px), subtle warm shadow (`0 2px 8px rgba(45,42,38,0.08)`), cream background. No harsh borders
- **Badges:** Pill-shaped with amber gold background for categories, sage green for availability, terracotta for featured
- **Icons:** Phosphor Icons in duotone weight, terracotta color for primary actions
- **Maps:** Warm-toned map style (avoid default Google blue)
- **Empty states:** Optional hand-drawn style line art (craft tools, lanterns, pottery wheel)
- **Textures:** Very subtle paper/linen texture on backgrounds (optional, never distracting)

### 7.5 Component Sketches

**Workshop Card:**

```
┌─────────────────────────────┐
│  [     HERO PHOTO 16:9    ] │
│                             │
│  ● Cooking Class            │  <- Type badge (amber pill)
│  Traditional Pho Making     │  <- Name (DM Serif Display, clay)
│  with Chef Minh             │  <- Operator name (charcoal-light)
│                             │
│  ★★★★☆  4.7 (42 reviews)   │  <- Rating (amber stars)
│                             │
│  🕐 2.5 hours  |  $25      │  <- Duration + Price
│  🇬🇧 🇻🇳 🇰🇷                │  <- Language flags
│                             │
│  ✓ Available tomorrow       │  <- Availability (sage green)
└─────────────────────────────┘
```

**Sticky Booking CTA (bottom bar):**

```
┌─────────────────────────────────────────┐
│  From $25/person     [ Book via WhatsApp ] │  <- Terracotta filled button
│  2.5 hours           [ Book via Zalo     ] │  <- Terracotta outline button
└─────────────────────────────────────────┘
```

**Filter Bar (mobile):**

```
┌─────────────────────────────────────────┐
│ [🔍 Search workshops...]               │
│                                         │
│ [Cooking] [Pottery] [Art] [+7 more] ▸  │  <- Horizontal scroll pills
│                                         │
│ [Filters 🎛️]  [Today ▾]  [Price ▾]    │
└─────────────────────────────────────────┘
```

### 7.6 Responsive Breakpoints

| Breakpoint | Layout |
| --- | --- |
| **Mobile** (< 640px) | Single column, full-width cards, sticky bottom CTA, sheet-based filters |
| **Tablet** (640-1024px) | 2-column card grid, side filter panel |
| **Desktop** (> 1024px) | 3-column card grid, persistent sidebar filters, optional map view |

### 7.7 Accessibility

- WCAG 2.1 AA compliance minimum
- All images have descriptive alt text (critical for a photo-heavy product)
- Color contrast ratios meet 4.5:1 for body text, 3:1 for large text
- Keyboard navigation for all interactive elements
- Screen reader friendly landmark structure
- Focus indicators on all interactive elements (terracotta outline)
- Touch targets minimum 44x44px on mobile

---

## 8. Information Architecture

### 8.1 Pages & Routes

```
workshops.gudbro.com/
│
├── /                              # HOMEPAGE
│   ├── Hero with search bar
│   ├── Category quick-access pills
│   ├── Featured workshops carousel
│   ├── "Popular in Hoi An" section
│   ├── "Popular in Da Nang" section
│   ├── Operator spotlight section
│   ├── Recent reviews section
│   └── SEO footer with all categories + areas
│
├── /workshops                     # CATALOG (full listing)
│   ├── Search bar
│   ├── Filter bar (type, price, area, language, duration, date)
│   ├── Sort options
│   ├── Workshop card grid
│   └── Pagination / infinite scroll
│
├── /workshops/[slug]              # WORKSHOP DETAIL
│   ├── Hero gallery (swipe)
│   ├── Quick facts bar
│   ├── Description + inclusions
│   ├── Calendar / availability
│   ├── Operator mini-profile
│   ├── Reviews
│   ├── Similar workshops
│   └── Sticky booking CTA
│
├── /workshops/cooking             # CATEGORY PAGE (static)
├── /workshops/pottery             # CATEGORY PAGE (static)
├── /workshops/lantern-making      # CATEGORY PAGE (static)
├── /workshops/art                 # CATEGORY PAGE (static)
├── /workshops/jewelry             # CATEGORY PAGE (static)
├── /workshops/bamboo              # CATEGORY PAGE (static)
├── /workshops/martial-arts        # CATEGORY PAGE (static)
├── /workshops/dance               # CATEGORY PAGE (static)
├── /workshops/coffee              # CATEGORY PAGE (static)
├── /workshops/ao-dai              # CATEGORY PAGE (static)
├── /workshops/food-tours          # CATEGORY PAGE (static)
├── /workshops/[type]              # CATEGORY PAGE (dynamic fallback)
│
├── /area/hoi-an                   # LOCATION PAGE
├── /area/hoi-an-old-town          # LOCATION PAGE (sub-area)
├── /area/da-nang                  # LOCATION PAGE
├── /area/thanh-ha                 # LOCATION PAGE (pottery village)
├── /area/tra-que                  # LOCATION PAGE (herb village)
├── /area/an-bang                  # LOCATION PAGE (beach)
├── /area/[area-slug]              # LOCATION PAGE (dynamic)
│
├── /operator/[slug]               # OPERATOR PROFILE
│   ├── Photo + name + tagline
│   ├── Story / about
│   ├── All workshops listed
│   ├── Photo gallery
│   ├── Aggregated reviews
│   ├── Location map
│   └── Contact buttons
│
├── /search                        # SEARCH RESULTS
│   ├── Query display
│   ├── Filtered results
│   └── "No results" with suggestions
│
├── /about                         # ABOUT GUDBRO WORKSHOPS
│
├── /for-operators                 # OPERATOR ACQUISITION LANDING
│   ├── Value proposition
│   ├── How it works
│   ├── Commission comparison
│   ├── Testimonials
│   └── Sign up CTA (WhatsApp)
│
├── /sitemap.xml                   # AUTO-GENERATED SITEMAP
└── /robots.txt                    # SEO ROBOTS CONFIG
```

### 8.2 Bottom Navigation (Mobile)

```
┌─────────────────────────────────────────┐
│  🏠 Home  │  🔍 Explore  │  ❤️ Saved  │  👤 More  │
└─────────────────────────────────────────┘
```

| Tab | Destination | Notes |
| --- | --- | --- |
| Home | `/` | Homepage with featured content |
| Explore | `/workshops` | Full catalog with filters |
| Saved | `/saved` | Bookmarked workshops (localStorage Phase 1) |
| More | `/more` | Language, currency, about, for operators, contact |

### 8.3 SEO URL Structure

All URLs are designed for search engine optimization:

- `/workshops/cooking` ranks for "cooking class Hoi An"
- `/workshops/pottery` ranks for "pottery workshop Vietnam"
- `/area/hoi-an` ranks for "things to do in Hoi An"
- `/operator/red-bridge-cooking-school` ranks for brand searches
- Workshop detail slugs are descriptive: `/workshops/traditional-pho-cooking-class-with-chef-minh`

---

## 9. Success Metrics (KPIs)

### 9.1 North Star Metric

**Monthly Booking Requests Initiated** -- the number of WhatsApp/Zalo booking messages sent through the platform per month.

### 9.2 KPI Dashboard

| Metric | Target (Month 3) | Target (Month 6) | Target (Month 12) |
| --- | --- | --- | --- |
| **Operators onboarded** | 25 | 60 | 150 |
| **Workshops listed** | 40 | 100 | 250 |
| **Monthly unique visitors** | 2,000 | 8,000 | 25,000 |
| **Monthly booking requests** | 100 | 500 | 2,000 |
| **Booking conversion rate** (visit-to-book) | 5% | 8% | 12% |
| **Average rating** | 4.5+ | 4.5+ | 4.5+ |
| **Reviews submitted** | 30 | 200 | 1,000 |
| **Cross-vertical referrals** (% from accommodations/tours) | 10% | 20% | 30% |
| **Operator retention** (monthly active) | 80% | 85% | 90% |
| **Revenue** (commission collected) | $500 | $3,000 | $15,000 |

### 9.3 Phase 1 MVP Metrics (Month 1-2)

| Metric | Target | Measurement |
| --- | --- | --- |
| Operators onboarded | 15 | Supabase count |
| Workshops listed | 25 | Supabase count |
| PWA page views | 1,000/month | Analytics |
| QR code scans | 200/month | UTM tracking |
| WhatsApp booking requests | 50/month | Reference code tracking |
| Average session duration | > 2 minutes | Analytics |
| Bounce rate | < 50% | Analytics |
| Lighthouse score (mobile) | > 90 | Lighthouse CI |

### 9.4 Tracking Events

| Event | Trigger | Data Captured |
| --- | --- | --- |
| `page_view` | Any page load | Page path, language, referrer, source vertical |
| `workshop_view` | Workshop detail page | Workshop ID, type, area, price |
| `filter_applied` | Any filter interaction | Filter type, value |
| `calendar_view` | Calendar/availability opened | Workshop ID |
| `booking_initiated` | WhatsApp/Zalo button clicked | Workshop ID, channel, date, group size, referrer type |
| `review_submitted` | Review form completed | Workshop ID, rating, has_text, has_photos |
| `language_changed` | Language switcher used | From language, To language |
| `currency_changed` | Currency switcher used | From currency, To currency |
| `operator_profile_view` | Operator page loaded | Operator ID |
| `share_clicked` | Share button tapped | Workshop ID, share method |
| `cross_vertical_click` | Click from accommodation/tour | Source vertical, source entity, workshop ID |
| `search_performed` | Search executed | Query text, results count, language |
| `category_clicked` | Category page visited | Category type |
| `area_clicked` | Area page visited | Area slug |

---

## 10. Roadmap (Phase 1-3)

### Phase 1: Foundation (Months 1-3) -- "Launch & Learn"

**Goal:** Get the catalog live with 25+ operators, validate demand, start collecting booking data.

| Feature | Priority | Effort | Notes |
| --- | --- | --- | --- |
| Workshop catalog (browse, filter, search) | P0 | 3 weeks | Core product |
| Workshop detail page with full info | P0 | 2 weeks | Gallery, description, inclusions |
| Operator profile pages | P0 | 1 week | Digital portfolio for each artisan |
| Booking via WhatsApp/Zalo (pre-formatted messages) | P0 | 1 week | Zero-tech for operators |
| Calendar / availability view | P0 | 2 weeks | 14-day rolling calendar |
| Multi-language UI (EN/VI/KO) | P0 | 1 week | Korean is critical for Da Nang market |
| Multi-currency display (VND/USD/EUR/KRW) | P0 | 1 week | Static rates |
| SEO foundations (meta, sitemap, structured data) | P0 | 1 week | Critical for organic discovery |
| Category landing pages (cooking, pottery, etc.) | P1 | 1 week | SEO + navigation |
| Area landing pages (hoi-an, da-nang, etc.) | P1 | 1 week | Location-based discovery |
| Reviews & ratings system | P1 | 2 weeks | Social proof |
| PWA (installable, offline catalog) | P1 | 1 week | Progressive web app |
| Analytics & tracking setup | P1 | 0.5 weeks | PostHog/Plausible |
| Design system implementation (colors, fonts, components) | P0 | 1 week | Terracotta + cream theme |

**Parallel: Operator onboarding (GUDBRO team)**

- Physically visit workshops in Hoi An (Old Town, Thanh Ha, Riverside, Tra Que) and Da Nang
- Professional photo shoots (10-15 photos per operator)
- Profile creation and EN/VI/KO translation
- Target: 25 operators, 40 workshops live

### Phase 2: Growth (Months 4-6) -- "Scale & Engage"

| Feature | Priority | Notes |
| --- | --- | --- |
| Chinese (ZH) language support | P0 | Growing tourist segment |
| Cross-vertical integration with GUDBRO Stays | P0 | Deep link from accommodation dashboard |
| "Near me" location-based discovery | P1 | GPS-based sorting |
| Review request automation (post-visit WhatsApp prompt) | P1 | 24h after workshop date |
| Operator self-service dashboard (basic) | P1 | Update availability, view bookings |
| Workshop bundles ("Hoi An Artisan Day") | P1 | Lantern + pottery + cooking package |
| Social sharing (Instagram Stories template) | P2 | Share finished craft with branded template |
| Push notifications for deals and new workshops | P2 | PWA push |
| KRW and CNY live currency rates | P1 | API-based rates |
| Expanded areas: Hue, Ho Chi Minh City | P1 | New markets |
| Saved/favorites (persistent) | P1 | User accounts or localStorage |

### Phase 3: Monetization (Months 7-12) -- "Revenue & Retention"

| Feature | Priority | Notes |
| --- | --- | --- |
| Online prepayment (deposit or full) | P0 | GUDBRO collects, distributes minus commission |
| Commission tracking and automated payouts | P0 | 85/10/5 model enforced |
| Featured/promoted workshops (paid placement) | P1 | Monthly fee for top-of-category |
| Gift vouchers for workshops | P1 | "Give the gift of an experience" |
| Group booking management | P1 | Corporate, school groups, events |
| Operator analytics dashboard | P1 | Views, bookings, revenue, reviews |
| Loyalty program ("Artisan Explorer" rewards) | P2 | Points for bookings and reviews |
| AI-powered recommendations | P2 | "Based on your interests..." |
| Japanese (JA) and French (FR) language support | P1 | Expanding language coverage |
| Integration with Visit Vietnam government platform | P2 | Data exchange if API available |

### Phase 4: Platform (Year 2+) -- "Ecosystem"

| Feature | Priority |
| --- | --- |
| Full online booking with instant confirmation | P0 |
| Multi-city expansion (Hanoi, Nha Trang, Phu Quoc, Sa Pa) | P0 |
| Operator mobile app (manage bookings, upload photos) | P1 |
| Dynamic pricing (surge pricing peak season, discounts off-peak) | P2 |
| Corporate/team-building workshop packages | P1 |
| Virtual workshop preview (short video walkthroughs) | P2 |
| GUDBRO Verified Artisan certification program | P1 |
| API for third-party integration (hotels, OTAs) | P2 |

---

## 11. Risks & Mitigations

| # | Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| 1 | **Operator adoption resistance** -- artisans are not tech-savvy and may distrust digital platforms | High | High | GUDBRO team handles ALL setup. Zero tech required from operators. They just receive WhatsApp messages like they already do. Face-to-face onboarding in Vietnamese. Deliver first booking within 7 days to build trust |
| 2 | **Low booking conversion** -- tourists browse but do not book because WhatsApp feels informal | Medium | High | Make the booking flow frictionless (pre-filled message, one tap). Show social proof (reviews, ratings, participant photos). Phase 2: add prepayment for commitment |
| 3 | **Quality inconsistency** -- some workshops disappoint tourists, damaging the GUDBRO brand | Medium | High | Vet every operator in person before listing. Minimum photo quality standards. Review system with rapid response to complaints. Remove operators below 3.5 stars after 10 reviews |
| 4 | **Seasonal demand volatility** -- tourism is seasonal, operators see no bookings in low season | Medium | Medium | Da Nang / Hoi An have warm weather year-round (milder than Bangkok/Bali). Promote to domestic tourists and expats during low season. Offer off-peak discounts |
| 5 | **Commission collection difficulty** -- operators may bypass GUDBRO after initial tourist contact | Medium | Medium | Track referral attribution via booking reference codes. Build value beyond lead-gen (reviews, SEO traffic, cross-vertical). Phase 3: prepayment where GUDBRO collects and distributes |
| 6 | **Visit Vietnam government platform** -- launching Q2 2026, could compete for same operators | Low | Medium | Move fast -- establish supply before government launch. Visit Vietnam will focus on large, formal operators -- GUDBRO targets the 80% of independents they won't serve. Different value prop: ecosystem + low commission vs. government listing |
| 7 | **Photo quality issues** -- operator-submitted photos are low quality | Medium | Low | Phase 1: GUDBRO team takes all photos. Phase 2: provide photo guidelines and review process. Reject photos below quality bar |
| 8 | **Translation inaccuracy** -- AI translations miss cultural nuance | Low | Medium | Human review of all translations. Use context-aware translation. Korean and Chinese translations reviewed by native speakers |
| 9 | **Messaging app deep-link changes** -- WhatsApp/Zalo change URL scheme | Low | Low | Abstract messaging integration behind shared utility. Support multiple channels. Phase 3: build in-app messaging fallback |
| 10 | **Price war from OTAs** -- Viator/Klook lower commission to compete | Low | Medium | GUDBRO's advantage is ecosystem integration and local relationships, not just price. Build switching costs through reviews, portfolio, cross-vertical traffic |

---

## 12. Business Model Details

### 12.1 Revenue Split

```
                    ┌────────────────────────────┐
                    │     TOURIST PAYS $30        │
                    │     (at the workshop)        │
                    └──────────────┬─────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              v                    v                    v
     ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
     │   OPERATOR      │  │   REFERRER      │  │   GUDBRO        │
     │   85% = $25.50  │  │   10% = $3.00   │  │   5% = $1.50    │
     │                 │  │                 │  │                 │
     │  The artisan    │  │  Hotel/hostel   │  │  Platform fee   │
     │  keeps most     │  │  that referred  │  │  for tech,      │
     │  of the revenue │  │  the guest      │  │  marketing,     │
     │                 │  │  (if applicable)│  │  support        │
     └────────────────┘  └────────────────┘  └────────────────┘
```

### 12.2 Commission Structure

| Scenario | Operator | Referrer | GUDBRO | Total Commission |
| --- | --- | --- | --- | --- |
| **Direct booking** (tourist finds GUDBRO via Google, QR, social) | 85% | 0% | 15% | 15% |
| **Referred booking** (tourist from GUDBRO accommodation or tour) | 85% | 10% | 5% | 15% |
| **QR code at partner venue** | 85% | 10% | 5% | 15% |

**Phase 1 (Months 1-6):** Commission is tracked but **not actively collected**. Focus on building supply and demand. Operators pay nothing. GUDBRO subsidizes growth.

**Phase 2 (Months 7-12):** Commission collection begins via:
- Prepayment system (GUDBRO collects, distributes minus commission)
- Monthly invoice for operators without prepayment

### 12.3 Commission Comparison vs Competitors

| Platform | Operator Keeps | Commission | Notes |
| --- | --- | --- | --- |
| **GUDBRO** | **85-90%** | **10-15%** | Lowest in market |
| Cookly | 80-85% | 15-20% | Cooking only |
| Airbnb Experiences | 80% | 20% | Declining focus on experiences |
| Klook | 75-85% | 15-25% | Asian market focus |
| GetYourGuide | 75-80% | 20-25% | European traffic |
| Viator (TripAdvisor) | 70-80% | 20-30% | Highest commission, biggest reach |

### 12.4 Additional Revenue Streams (Phase 3+)

| Stream | Description | Estimated Revenue |
| --- | --- | --- |
| **Featured placement** | Operators pay to appear at top of category/area pages | $20-50/month per operator |
| **Professional photography** | Paid photo shoot service for operators wanting premium listings | $50-100 per shoot |
| **Gift vouchers** | GUDBRO sells workshop gift cards (margin on unredeemed) | 5-10% margin on sales |
| **Bundle packages** | Multi-workshop packages at discount (higher total spend) | Higher AOV, same commission % |
| **Corporate events** | Team-building workshop packages for companies/groups | Premium pricing, 15-20% commission |

### 12.5 Unit Economics (Target at Month 12)

| Metric | Value |
| --- | --- |
| Average workshop price | $30 |
| Average GUDBRO commission (blended) | 12% |
| Revenue per booking | $3.60 |
| Monthly bookings | 2,000 |
| Monthly gross revenue | $7,200 |
| Monthly operating cost (support, hosting, marketing) | ~$3,000 |
| Monthly net contribution | ~$4,200 |
| Customer acquisition cost (CAC) | ~$2.00 (SEO-heavy, low paid) |
| Lifetime value (LTV) per tourist | ~$5.40 (1.5 bookings avg) |
| LTV:CAC ratio | 2.7:1 |

### 12.6 Referral Economics for Hotels

A partner hotel with 20 rooms at 70% occupancy:

| Metric | Value |
| --- | --- |
| Guests per month | ~420 (20 rooms x 70% x 30 days) |
| Workshop engagement rate | 15% (conservative) |
| Bookings per month | ~63 |
| Average workshop price | $30 |
| Referral commission (10%) | $3 per booking |
| **Monthly referral income** | **~$189** |
| Annual referral income | ~$2,268 |

At 25% engagement (achievable with in-stay dashboard prominence): **$315/month** passive income.

---

## 13. Cross-Vertical Integration

### 13.1 Integration Map

```
  ┌─────────────────────────────────────────────────────────┐
  │                    GUDBRO ECOSYSTEM                      │
  │                                                         │
  │  ┌──────────────┐     ┌──────────────┐                  │
  │  │ ACCOMMODATIONS│────>│  WORKSHOPS   │<────┐            │
  │  │              │     │  & EXPERIENCES│     │            │
  │  │  "Explore    │     │              │     │            │
  │  │   workshops  │     │  Core        │  ┌──┴─────────┐  │
  │  │   near your  │     │  vertical    │  │   TOURS     │  │
  │  │   stay"      │     │              │  │             │  │
  │  └──────────────┘     └──────┬───────┘  │  "Add a     │  │
  │                              │          │   workshop  │  │
  │  ┌──────────────┐            │          │   to your   │  │
  │  │  COFFEESHOP  │            │          │   tour day" │  │
  │  │              │            │          └─────────────┘  │
  │  │  "Coffee     │<───────────┘                          │
  │  │   brewing    │     ┌──────────────┐                  │
  │  │   workshop   │     │   LAUNDRY    │                  │
  │  │   at this    │     │              │                  │
  │  │   cafe"      │     │  "Dirty      │                  │
  │  └──────────────┘     │   clothes    │                  │
  │                       │   after      │                  │
  │  ┌──────────────┐     │   pottery?   │                  │
  │  │   WELLNESS   │     │   Use our    │                  │
  │  │              │     │   laundry"   │                  │
  │  │  "Relax      │     └──────────────┘                  │
  │  │   after your │                                       │
  │  │   workshop   │     ┌──────────────┐                  │
  │  │   with a     │     │   RENTALS    │                  │
  │  │   massage"   │     │              │                  │
  │  └──────────────┘     │  "Get there  │                  │
  │                       │   by scooter"│                  │
  │                       └──────────────┘                  │
  └─────────────────────────────────────────────────────────┘
```

### 13.2 Integration Points

| Source Vertical | Integration | User Experience | Implementation |
| --- | --- | --- | --- |
| **Accommodations** | "Workshops near your stay" card in in-stay dashboard | Guest taps card, sees workshops within 5km sorted by distance + rating, filtered to stay dates | Deep link with guest context (name, dates, language, currency, GPS coords). Hotel earns 10% referral |
| **Tours** | "Add a workshop" upsell during tour booking | Tour to Hoi An? Suggest lantern-making add-on for the same day | Show workshops in same area as tour destination. Tour operator earns referral |
| **Coffeeshop** | "Coffee brewing workshop" link on cafe menus | Guest at a GUDBRO cafe sees workshop link alongside regular menu | Tag cafes that also offer workshops. Direct link to workshop detail page |
| **Wellness** | "Relax after your workshop" post-booking suggestion | After booking a pottery class, suggest nearby spa/massage | Post-booking confirmation page shows wellness cross-sell. Wellness earns referral |
| **Laundry** | "Dirty clothes?" post-workshop suggestion | After pottery/cooking workshops, suggest laundry pickup | Light-hearted cross-sell in post-visit review prompt. Laundry earns referral |
| **Rentals** | "Get there by motorbike" for distant workshops | Workshops outside walkable center show rental option | Show rental CTA for workshops > 2km from city center |

### 13.3 Shared Guest Context

When a tourist arrives from another GUDBRO vertical, we carry forward via URL parameters:

| Data Point | Source | Passed Via |
| --- | --- | --- |
| Language preference | Browser / previous vertical | `?lang=en` |
| Currency preference | Previous vertical selection | `?currency=USD` |
| Guest name | Accommodation booking | `?guest=Marcus` |
| Stay dates | Accommodation booking | `?checkin=2026-02-10&checkout=2026-02-15` |
| Location (lat/lng) | Accommodation address | `?lat=15.8801&lng=108.3380` |
| Referrer type | Source vertical | `?ref=accommodation` |
| Referrer ID | Source entity | `?ref_id=beach-view-hotel` |

This creates a seamless experience where switching between GUDBRO verticals feels like one unified platform, not separate apps.

### 13.4 Cross-Vertical Referral Tracking

```typescript
// Shared cross-vertical referral data model
interface CrossVerticalReferral {
  id: string;
  source_vertical: 'accommodations' | 'tours' | 'coffeeshop' | 'wellness' | 'laundry' | 'rentals';
  source_entity_id: string;       // e.g., accommodation slug
  target_vertical: 'workshops';
  target_entity_id: string;       // workshop slug
  referral_code: string;          // tracking code
  commission_rate: number;        // 0.10 for 10%
  status: 'clicked' | 'booked' | 'completed' | 'paid';
  created_at: string;
}
```

---

## Appendix A: Workshop Type Taxonomy

```
workshops/
├── culinary/
│   ├── cooking-class
│   ├── food-tour
│   ├── coffee-brewing
│   ├── baking
│   └── market-tour
├── craft/
│   ├── lantern-making
│   ├── pottery
│   ├── silk-weaving
│   ├── jewelry
│   ├── bamboo-craft
│   ├── lacquer-art
│   ├── paper-craft
│   └── embroidery
├── cultural/
│   ├── ao-dai-experience
│   ├── traditional-dance
│   ├── calligraphy
│   ├── music
│   └── martial-arts
└── nature/
    ├── farming-experience
    ├── fishing-village
    └── herbal-medicine
```

## Appendix B: Hoi An Priority Onboarding Areas

```
    ┌──────────────────────────────────────────┐
    │              HOI AN                        │
    │                                            │
    │    ┌─────────────────┐                     │
    │    │  OLD TOWN (1)   │  1. Highest density │
    │    │  Lanterns, Silk, │     of workshops    │
    │    │  Tailoring, Food │     (START HERE)    │
    │    └────────┬────────┘                     │
    │             │                              │
    │    ┌────────┴────────┐                     │
    │    │  RIVERSIDE (2)   │  2. Cooking classes │
    │    │  Cooking, Coffee │     and cafes       │
    │    └────────┬────────┘                     │
    │             │                              │
    │    ┌────────┴────────┐                     │
    │    │  THANH HA (3)    │  3. Pottery village │
    │    │  Pottery, Ceramics│    (must-visit)    │
    │    └────────┬────────┘                     │
    │             │                              │
    │    ┌────────┴────────┐                     │
    │    │  AN BANG (4)     │  4. Beach area      │
    │    │  Bamboo, Fishing │     eco-experiences │
    │    └─────────────────┘                     │
    │                                            │
    │    ┌─────────────────┐                     │
    │    │  TRA QUE (5)    │  5. Herb village    │
    │    │  Farming, Herbs  │     farming tours   │
    │    └─────────────────┘                     │
    └──────────────────────────────────────────┘
```

## Appendix C: Operator Onboarding Checklist

- [ ] Visit workshop in person (face-to-face in Vietnamese)
- [ ] Take 10-15 professional photos (workspace, materials, process, finished products, operator at work)
- [ ] Record operator story (background, how they learned, years of experience, family heritage)
- [ ] Document all workshops offered (name, description, price in VND, duration, what's included, what to bring)
- [ ] Confirm languages spoken by operator and staff
- [ ] Set up weekly schedule (days, times, capacity per session)
- [ ] Collect WhatsApp and/or Zalo number
- [ ] Verify location (GPS coordinates, Google Maps pin)
- [ ] Create operator profile page (EN/VI)
- [ ] Create workshop listing(s) (EN/VI/KO)
- [ ] Translate descriptions (human-reviewed AI translation)
- [ ] QA review (photos, info accuracy, pricing fairness, translation quality)
- [ ] Generate QR code for shop window display
- [ ] Go live in catalog
- [ ] Deliver first booking within 7 days (target)
- [ ] Follow up after 2 weeks (feedback, issues, satisfaction)
- [ ] Monthly check-in (availability updates, new photos, new workshops)

---

**Document History**

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 2.0 | 2026-01-27 | GUDBRO Team | Comprehensive rewrite: added Design System (Section 7), Information Architecture (Section 8), expanded Business Model (Section 12) with referral economics, enhanced User Personas with budget/revenue details, added all 13 required sections |
| 1.0 | 2026-01-27 | GUDBRO Team | Initial PRD -- vision, market analysis, features, technical architecture, roadmap |
