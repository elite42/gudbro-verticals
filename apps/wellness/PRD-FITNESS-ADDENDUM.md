# Wellness PWA - Gym & Fitness Addendum

> **Version:** 2.0
> **Last Updated:** 2026-01-27
> **Status:** Planning
> **Parent Document:** [PRD.md](./PRD.md) (Wellness PWA v1.0)

---

## 1. Context & Rationale

### Why Integrate Into Wellness, Not a Separate Vertical

Gym/fitness is being added as an extension of the existing Wellness PWA rather than launched as a standalone vertical. Five factors drive this decision:

**1. Shared User Intent**

The tourist who books a massage at 10 AM wants a gym session at 7 AM. The digital nomad attending weekly yoga also wants access to a weight room. These are the same user expressing different facets of the same intent: physical well-being during a trip or stay. Fragmenting them across two apps doubles acquisition cost for zero incremental value.

**2. Existing Infrastructure Covers 80% of Requirements**

The Wellness PWA already has:

| Existing Feature | Gym Equivalent |
|-----------------|---------------|
| `wellness_locations` (multi-venue, addresses, hours, amenities JSONB) | Gym location profile |
| `wellness_staff` (specialties, certifications, languages, ratings) | Personal trainers, instructors |
| `wellness_services` (category, duration, description, pricing) | Day passes, class sessions |
| `wellness_bookings` (date, time, status, payment tracking) | Pass purchases, class bookings |
| `service_reviews` (rating, text, verified badge) | Gym reviews |
| `wellness_pricing` (base price, weekend premium, session packages) | Day/week/month pass pricing |
| `wellness_contact_settings` (Zalo, WhatsApp, phone, booking integration) | Gym contact channels |

Building a separate vertical would duplicate all seven tables and their associated APIs, components, and SEO infrastructure. Extending the existing schema requires adding approximately three new tables and modifying two existing ones.

**3. Cross-Sell Creates Compound Value**

A unified vertical enables:
- "Morning Gym + Evening Massage" combo packages
- "Fitness + Recovery" multi-day tourist bundles
- Hotel partnerships that bundle gym access with spa credits under one integration

A separate vertical would require inter-app navigation, separate user sessions, and independent booking flows, killing the cross-sell opportunity.

**4. Hotel Partnership is a Single Integration Point**

Hotels without gyms already partner informally with nearby wellness venues. Adding gym/fitness to the same Wellness PWA means one hotel integration, one partner dashboard, one commission structure, one API. The hotel concierge recommends "GUDBRO Wellness" for both a massage and a gym rather than managing two separate platforms.

**5. The WellnessCategory Type Was Designed for This**

The existing `WellnessCategory` type includes `'wellness_center'` covering yoga, meditation, sauna, and detox. Gym/fitness is a natural sub-expansion, not a conceptual leap. Adding `'gym_fitness'` to the union type is a one-line change.

### What Changes

| Aspect | Before (Wellness v1.0) | After (v1.1 + Fitness) |
|--------|------------------------|------------------------|
| Categories | spa_massage, hair_salon, barbershop, nail_salon, beauty_aesthetics, tattoo_piercing, wellness_center | + `gym_fitness` |
| Venue Types | Spa, Salon, Studio | + Gym, Fitness Center, CrossFit Box, Pool |
| Service Model | Appointment-based (book a specific time slot with a staff member) | + Access-based (buy a pass, show up anytime during operating hours) |
| Pricing Model | Fixed price per service/duration | + Day pass, multi-visit credit packs, time-limited access |
| Staff Roles | Therapist, Stylist, Artist | + Personal Trainer, Coach, Instructor |
| Facility Info | Amenities list (JSONB) | + Structured equipment inventory, facility checklist (A/C, showers, lockers) |
| B2B Layer | None | + Hotel-gym partnership management with commission tracking |

---

## 2. Market Opportunity

### Vietnam Fitness Market

| Metric | Value | Source |
|--------|-------|--------|
| Market size (2030 projected) | $3.78 billion | Mordor Intelligence |
| CAGR | 19.08% (2024-2030) | Mordor Intelligence |
| Current gym count | ~600 nationwide | Industry estimates |
| Population gym penetration | <1% | Compared to 20%+ in US, 3% in Thailand |
| Da Nang gym density | ~40-50 gyms | Tourist zones concentrated |

### Competitive Landscape (Vietnam Gym Chains)

| Chain | Market Share | Positioning | Price Range |
|-------|-------------|-------------|-------------|
| California Fitness & Yoga | 36% | Premium, expat-friendly | $50-80/month |
| Curves Vietnam | 27% | Women-only, subscription | $40-60/month |
| Elite Fitness | 14% | Mid-premium | $35-55/month |
| CitiGym | 7% | Mid-range, Vietnamese-focused | $25-40/month |
| **Independents** | **30%+** | Budget to boutique, **dominant in tourist zones** | 40K-200K VND/day |

### Key Market Insight

Independents dominate tourist zones. These are the exact gyms that:
- Have no online presence (no website, weak Google Maps listing)
- Cannot be found easily by English-speaking tourists
- Do not offer day passes through any platform
- Have no English-language information or signage
- Accept only cash
- Have no quality indicators visible before visiting

This is the classic GUDBRO sweet spot: digitizing underserved independent businesses for tourist discovery, just as we do with spas, salons, and laundry shops.

### Da Nang Pricing Tiers

| Tier | Day Pass | Monthly | Characteristics |
|------|----------|---------|-----------------|
| Budget | 40K VND (~$1.50) | 300K-500K VND | Basic equipment, no A/C, Vietnamese only |
| Mid-Range | 100K VND (~$4) | 500K-1M VND | Good equipment, A/C, some English |
| Premium | 150-200K VND (~$6-8) | 1.2M-1.8M VND ($50-70) | Full facility, classes, English staff |
| Hotel Gym | N/A (guests only) | N/A | Often small, limited equipment |

The tourist sweet spot is **80K-120K VND ($3-5)**: mid-range gyms with air conditioning, modern equipment, and showers. This is the tier we target.

### No Aggregator Exists

There is no ClassPass, no ResortPass, no DayPass, and no Mindbody operating at scale in Vietnam. WeFit attempted it and went bankrupt in 2020 (see Section 4 for analysis). The market has been wide open for six years.

---

## 3. New User Personas

These personas supplement the existing four in the Wellness PRD (Tourist Traveler Sarah, Digital Nomad Marcus, Expat Resident Lisa, Local Vietnamese Linh).

### Persona 5: Gym-Seeking Tourist

- **Name:** Jake, 29, UK
- **Context:** Two-week holiday in Da Nang; works out 4-5x/week at home
- **Needs:** Find a clean gym with good equipment near his hotel; buy a day pass without subscription commitment
- **Pain Points:**
  - Hotel has no gym, or a tiny one with two treadmills and a broken cable machine
  - Google Maps shows gym pins but no photos of equipment, no pricing, no indication of language
  - Some gyms (e.g., The New Gym, Da Nang) only sell monthly subscriptions, no day passes
  - Budget gyms are cash-only with no English signage
  - Cannot assess quality (A/C? showers? free weights? squat rack?) without physically visiting
- **Goals:** Maintain his fitness routine without friction or language barriers
- **Willingness to Pay:** $4-8/day; values convenience over cheapest price
- **How GUDBRO Helps:** Jake opens the Wellness PWA, taps "Gym," sees three gyms within 500m of his hotel with photos of equipment, facility checklists, ratings, and day pass prices. Books a 100K VND day pass in 30 seconds. Shows QR code at reception.

### Persona 6: Digital Nomad Fitness Enthusiast

- **Name:** Ana, 31, Brazil
- **Context:** Living in Da Nang for 3 months; needs regular gym access but does not want a 12-month contract
- **Needs:** Multi-visit credit pack; access to different gyms for different workouts
- **Pain Points:**
  - Monthly subscriptions lock her into one gym; she leaves in 3 months
  - No multi-gym access pass exists in Vietnam
  - Wants weights at one gym, pool at another, yoga at a third
  - Does not want to lose money on an unused subscription when she moves to Hoi An
- **Goals:** Flexible fitness access across multiple venues; 10-20 visits per month
- **Willingness to Pay:** $3-5/visit with volume discount
- **How GUDBRO Helps:** Ana buys a 20-credit fitness pack (1.4M VND, ~$56, valid 90 days). Uses credits at different partner gyms. Monday: weights at Iron Paradise. Wednesday: yoga at Zen Studio. Friday: swimming at Aqua Fitness. Each visit deducts one credit.

### Persona 7: Hotel Without Gym (B2B)

- **Name:** Minh, 42, Vietnamese hotel owner
- **Context:** Runs a 60-room boutique hotel in My Khe Beach area; no space or budget for a gym
- **Needs:** Offer "fitness amenity" to guests without capital investment; earn referral commission passively
- **Pain Points:**
  - Western guests ask about gym access at check-in; staff gives vague directions
  - No formal arrangement with any gym; no tracking, no commission, no guaranteed pricing
  - Cannot guarantee quality or availability for guests
  - Competitors with in-house gyms get better review scores on Booking.com
  - Building an on-site gym would cost $30K-$100K+ in CapEx with ongoing maintenance
- **Goals:** Increase guest satisfaction scores; generate passive revenue from gym referrals
- **Willingness to Partner:** Immediately, if setup is zero-cost and commission is automated
- **How GUDBRO Helps:** Minh places a GUDBRO QR code at reception. Guests scan it, see three partner gyms within walking distance with guaranteed tourist pricing. Minh earns 10-15% commission on every booking. Zero CapEx, zero operational burden.

### Persona 8: Independent Gym Owner

- **Name:** Tuan, 35, Vietnamese gym owner
- **Context:** Owns a mid-range gym (150 sqm, decent equipment, A/C) near tourist area in An Thuong
- **Needs:** Steady flow of tourist customers; digital presence; day pass sales without marketing effort
- **Pain Points:**
  - 95% of members are local Vietnamese on monthly plans
  - Tourists walk by daily but do not know what is inside, how much it costs, or that day passes exist
  - No website, weak Google Maps presence, no English signage
  - Tried Facebook ads but ROI was poor (targeting tourists is hard)
  - **WeFit burned him:** late payments, broken promises, lost trust in platforms
- **Goals:** 10-20 tourist day passes per day without marketing spend
- **Willingness to Partner:** Yes, if payments are punctual and commission is reasonable (15-20%)
- **How GUDBRO Helps:** Tuan fills out a 10-minute onboarding form, uploads gym photos, checks facility boxes, sets his day pass price. Goes live on GUDBRO within 24 hours. Receives booking notifications via Zalo. Gets weekly payouts. No marketing, no English skills required.

---

## 4. WeFit Failure Analysis

### Background

WeFit was Vietnam's answer to ClassPass. Founded in 2016, it aggregated gyms, yoga studios, and fitness classes into a single unlimited subscription.

| Metric | Value |
|--------|-------|
| Peak bookings | 150,000/month |
| Partner facilities | 1,000+ (600+ at shutdown) |
| Business model | Unlimited subscription (~700K VND/month) |
| Shutdown | June 2020 |
| Root cause | Cash flow collapse; paying partners more than revenue collected |

### What Went Wrong (and What GUDBRO Must Not Repeat)

| # | WeFit Mistake | Root Cause | GUDBRO Response |
|---|--------------|------------|-----------------|
| 1 | **"All-you-can-eat" unlimited subscription** | Power users attended 20+ sessions/month. WeFit paid partners per visit but collected a flat monthly fee. Unit economics were structurally broken from day one. | **Pay-per-visit only.** No unlimited subscription. Every transaction is individually profitable. Day pass, multi-visit credits, week pass. Each has a positive margin. |
| 2 | **Late payments to partners (60-90 day cycles)** | As unit economics deteriorated, WeFit began delaying payments. 600+ studios lost trust and stopped honoring bookings. | **Weekly payouts.** Partner trust is non-negotiable. Commission is deducted at transaction time; gym receives its share within 7 days. This is a hard business rule, not a goal. |
| 3 | **Expanded to 30+ service types simultaneously** | Lost focus; quality control became impossible across massage, yoga, dance, cycling, swimming, martial arts, and more. | **Gym/fitness as one category within an existing vertical.** Controlled scope. Quality bar enforced through facility checklists and photo verification. |
| 4 | **Subsidy-driven growth via VC money** | Customer acquisition cost exceeded lifetime value. Aggressively discounted subscriptions to grow user numbers. | **Organic growth through hotel channel.** Tourists have high willingness to pay (they are on vacation, not optimizing for cheapest option). No subsidies needed. Hotels provide distribution for free (they earn commission). |
| 5 | **Competed for existing gym members** | WeFit redistributed existing demand at a loss rather than creating new demand. Gyms saw cannibalization, not incremental revenue. | **Hotel-tourist channel creates genuinely new demand.** Tourists and short-stay visitors are customers gyms cannot reach on their own. Every booking through GUDBRO is incremental revenue for the gym. |
| 6 | **COVID-19 as final blow** | No cash reserves; partner ecosystem already fragile; physical fitness business halted entirely. | **Asset-light model.** GUDBRO has no inventory, no leases, no equipment. Commission-based revenue means costs scale with volume. In a downturn, costs drop proportionally. |

### The Core Lesson

WeFit failed because it tried to be cheaper than going directly to a gym. GUDBRO succeeds because it connects people who cannot find each other: tourists who do not know gyms exist, and gyms who cannot reach tourists. The value is in discovery and convenience, not in price subsidies.

---

## 5. New User Journeys

### Journey A: Tourist Finds Gym Near Hotel

```
Tourist opens GUDBRO Wellness PWA
    |
[Homepage] sees "Gym" category pill alongside Massage, Hair, Nails...
    |
[Taps "Gym"]
    |
[Gym Listing Page] - List/map view showing gyms near current location
    |-- Each gym card shows: Name, Distance, Rating, Day Pass Price, Key Facility Icons
    |-- Filters: Distance, Price Range, Facilities (A/C, Pool, Classes, Free Weights)
    |-- Sort: Distance, Price (low-high), Rating
    |
[Taps "Iron Paradise Gym - 0.3km"]
    |
[Gym Detail Page]
    |-- Hero photo gallery (equipment, facility, changing rooms)
    |-- Facility Checklist: [AC] [Showers] [Lockers] [Towels] [WiFi] [Parking]
    |-- Equipment List: Free weights (up to 40kg), 2 squat racks, 5 treadmills, cable machines
    |-- Pass Pricing Cards: Day 100K | Week 400K | Month 800K
    |-- Class Schedule (if applicable): Yoga Mon/Wed 7AM, CrossFit Tue/Thu 6PM
    |-- Opening Hours, Location Map, Reviews
    |
[Taps "Buy Day Pass - 100K VND"]
    |
[Booking Confirmation]
    |-- Select date (today or future)
    |-- Payment: Cash on arrival / MoMo / ZaloPay / Card
    |-- QR code generated for check-in
    |
[Shows QR code at gym reception]
    |
[Post-visit: Leave review prompt]
```

### Journey B: Hotel Refers Guest to Gym

```
Guest asks hotel concierge "Is there a gym nearby?"
    |
Concierge scans GUDBRO QR code at front desk (or opens hotel partner link)
    |
[Hotel Partner View] - Pre-filtered list of partner gyms
    |-- Shows negotiated tourist rates (guaranteed pricing)
    |-- Sorted by distance from this hotel
    |
[Concierge shares gym link to guest via WhatsApp / shows QR on screen]
    |
Guest receives link with hotel referral code embedded:
    wellness.gudbro.com/fitness/iron-paradise?ref=MYKHEHOTEL
    |
[Guest views gym, purchases day pass]
    |-- Hotel earns 10-15% referral commission (tracked automatically)
    |-- Gym receives booking notification via Zalo
    |
[Guest visits gym with QR code]
    |
[Monthly: Hotel receives commission payout report]
```

### Journey C: Nomad Buys Multi-Gym Credit Pack

```
Digital nomad browses GUDBRO Wellness fitness section
    |
[Sees "Fitness Credits" banner]
    |-- 5 credits = 450K VND ($18) - valid 30 days
    |-- 10 credits = 800K VND ($32) - valid 60 days
    |-- 20 credits = 1.4M VND ($56) - valid 90 days
    |
[Purchases 20-credit pack via MoMo]
    |
[Credits appear in "My Fitness Wallet"]
    |
[Each visit: Select gym -> Show QR -> 1 credit deducted]
    |-- Monday: Weights at Iron Paradise (1 credit)
    |-- Wednesday: Yoga class at Zen Studio (1 credit)
    |-- Friday: Swimming at Aqua Fitness (2 credits - premium venue)
```

### Journey D: Gym Owner Onboards

```
Gym owner sees GUDBRO outreach (field sales or existing partner referral)
    |
[Onboarding Form] - 10-minute setup
    |-- Business name, address, phone, Zalo ID
    |-- Upload 5-10 photos (equipment, facility, changing rooms, exterior)
    |-- Facility checklist (checkboxes: A/C, Showers, Lockers, Pool, etc.)
    |-- Equipment inventory (checkboxes + quantities)
    |-- Set day pass price, week pass price (optional), month pass price (optional)
    |-- Class schedule (optional)
    |-- Opening hours
    |-- Bank account for payouts
    |
[Profile goes live within 24 hours after photo review]
    |
[Receives booking notifications via Zalo]
    |
[Weekly: Receives payout for completed visits]
    |
[Monthly: Receives performance report (visits, revenue, reviews)]
```

---

## 6. New Features to Add

### 6.1 Gym/Fitness Center Listings

**Extends:** Existing service discovery and `wellness_locations` system.

New gym-specific structured data (beyond the existing `amenities` JSONB field):

**Facility Checklist (Boolean Fields):**
- Air Conditioning
- Showers (Hot/Cold)
- Lockers
- Towel Service
- Drinking Water (Free)
- WiFi
- Parking (Car)
- Parking (Motorbike)
- Changing Rooms
- Mirror Walls
- Sound System / Music
- TV Screens

**Equipment Inventory (Structured JSONB):**

| Category | Items |
|----------|-------|
| Free Weights | Dumbbells (max kg), Barbells + Plates, Kettlebells |
| Racks | Squat Rack / Power Rack (quantity), Smith Machine |
| Machines | Cable Machines, Chest Press, Leg Press, Lat Pulldown, etc. |
| Cardio | Treadmills (qty), Ellipticals (qty), Stationary Bikes (qty), Rowing Machines (qty) |
| Functional | Battle Ropes, TRX / Suspension, Resistance Bands, Plyometric Boxes |
| Combat | Heavy Bags, Speed Bags, Boxing Ring |
| Other | Yoga/Stretching Area, Swimming Pool (size), Sauna/Steam Room |

**Equipment Quality Rating:**
- `basic` - Older equipment, functional but worn
- `standard` - Decent brands, well-maintained
- `premium` - Major brands (Technogym, Life Fitness, Hammer Strength)
- `professional` - Competition-grade equipment

**Gym Card (in listing view):**
```
+---------------------------------------------+
| [Photo: Equipment/Facility]                  |
| Iron Paradise Gym                  4.7 stars |
| 0.3 km away - An Thuong                     |
|                                              |
| [AC] [Showers] [Lockers] [Free Weights]     |
|                                              |
| Day Pass: 100,000d ($4)                      |
|                          [Buy Day Pass]      |
+---------------------------------------------+
```

### 6.2 Day Pass Booking

A new booking type that differs from the existing appointment-based model:

| Appointment Booking (Existing) | Day Pass Booking (New) |
|-------------------------------|----------------------|
| Specific time slot required | Valid entire operating day |
| Staff member selection | No staff assignment |
| Duration: 30-120 min | Duration: full day access |
| Confirmation may be required | Instant confirmation with QR |
| Price per service performed | Price per day of access |
| Cancel/reschedule mechanics | Simple date change |

**Day Pass Flow:**
1. Select gym
2. Select date (today or future)
3. Select pass type (day / week / month, or redeem credit)
4. Choose payment method (cash on arrival, MoMo, ZaloPay, card)
5. Receive QR code
6. Show QR at gym reception
7. Check-in recorded; pass activated

### 6.3 Multi-Visit Credit Packages

Credit packs usable across all partner gyms:

| Pack | Credits | Price (VND) | Price (USD) | Per-Visit | Savings | Validity |
|------|---------|-------------|-------------|-----------|---------|----------|
| Starter | 5 | 450,000 | $18 | 90K/$3.60 | 10% | 30 days |
| Regular | 10 | 800,000 | $32 | 80K/$3.20 | 20% | 60 days |
| Power | 20 | 1,400,000 | $56 | 70K/$2.80 | 30% | 90 days |

**Rules:**
- 1 credit = 1 day pass at a standard partner gym
- Premium gyms may require 2 credits (clearly marked on listing)
- Credits are non-transferable and tied to the purchaser
- Expired credits are non-refundable (30/60/90-day expiry enforced)
- No unlimited plans -- this is an anti-WeFit rule

### 6.4 Hotel-Gym Partnership Management

**The Core Business Opportunity.** This is the feature that no competitor offers.

**Why the Gap Exists:**
- ResortPass / DayPass do NOT operate in Vietnam
- Hotels without gyms have NO formal partnerships with nearby gyms
- Concierge suggests informally: no tracking, no commission, no guaranteed price
- Completely unexplored B2B opportunity

**Commission Structure:**

Hotel-referred booking:
```
Tourist pays 100K VND for day pass
    |
    +-- Gym receives: 70,000 VND (70%)
    +-- GUDBRO platform: 15,000 VND (15%)
    +-- Hotel referral: 15,000 VND (15%)
```

Direct booking (no hotel referral):
```
Tourist pays 100K VND for day pass
    |
    +-- Gym receives: 80,000 VND (80%)
    +-- GUDBRO platform: 20,000 VND (20%)
```

**Hotel Partner Dashboard (Lightweight):**
- View list of partner gyms curated for their location
- Generate guest referral links and QR codes
- Track referrals and commission earned (real-time)
- Monthly payout summary
- Brandable QR card for front desk / room placement

**Gym Partner Dashboard (Extension of existing business tools):**
- View incoming day pass bookings
- Check-in guests via QR scan (or manual confirmation)
- View payout history and pending payments
- Update facility info, photos, pricing
- Respond to reviews

**Revenue Math (Per Hotel):**
- 100-room hotel, 10% of guests book a gym visit = 10 bookings/day
- Average day pass: 100K VND ($4)
- Hotel commission (15%): 15K VND per booking
- Daily hotel revenue: 150K VND ($6)
- Monthly hotel revenue: ~4.5M VND ($180) -- passive, zero cost

**Revenue Math (Per Gym):**
- Receives 10 tourist bookings/day from hotel channel
- Revenue per booking: 70K VND (after commission)
- Daily incremental revenue: 700K VND ($28)
- Monthly incremental revenue: ~21M VND ($840) -- customers they could not reach before

### 6.5 Gym Facility Details Page

Comprehensive gym profile page beyond basic listing:

```
+---------------------------------------------+
| [Photo Gallery - horizontal scroll]          |
+---------------------------------------------+
| Iron Paradise Gym                            |
| 4.7 stars (89 reviews)       [Open Now]      |
| 0.3 km - An Thuong, My Khe Beach            |
+---------------------------------------------+
| PASSES                                       |
| [Day: 100K] [Week: 400K] [Month: 800K]      |
+---------------------------------------------+
| FACILITIES                                   |
| [AC] [Showers] [Lockers] [WiFi] [Parking]   |
| [Changing Rooms] [Water] [Towels]            |
+---------------------------------------------+
| EQUIPMENT                                    |
| Free Weights: Dumbbells up to 40kg           |
| Squat Racks: 2 available                     |
| Cardio: 5 treadmills, 3 bikes, 2 ellipticals|
| Cable Machines: 4 stations                   |
| Equipment Quality: Standard                  |
| Last updated: Jan 2026                       |
+---------------------------------------------+
| CLASS SCHEDULE                               |
| Mon  07:00  Yoga (included in day pass)      |
| Tue  18:00  CrossFit (+50K VND)              |
| Wed  07:00  Yoga (included)                  |
| Thu  18:00  CrossFit (+50K VND)              |
| Fri  17:30  Boxing (+100K VND)               |
+---------------------------------------------+
| REVIEWS                                      |
| "Great equipment, clean showers, friendly"   |
| "Best gym near the beach for tourists"       |
+---------------------------------------------+
| LOCATION & CONTACT                           |
| [Map] [Directions] [WhatsApp] [Zalo] [Call]  |
+---------------------------------------------+
```

### 6.6 Class Schedules

For gyms that offer group classes:

| Class Type | Typical Schedule | Duration | Pricing |
|------------|-----------------|----------|---------|
| Yoga | Mon/Wed/Fri 7:00 AM | 60 min | Often included in day pass |
| CrossFit | Tue/Thu 6:00 PM | 60 min | Sometimes extra (50K VND) |
| Spinning / Cycling | Mon-Fri 6:30 AM | 45 min | Included |
| Boxing / Muay Thai | Tue/Thu/Sat 5:00 PM | 90 min | Extra (100K-150K VND) |
| Swimming (lap swim) | Daily | Open access | Included if pool exists |
| Martial Arts | Varies | 60-90 min | Extra (100-150K VND) |
| Dance Fitness / Zumba | Mon/Wed 5:30 PM | 45 min | Included |

**Class Booking:**
- View weekly class schedule on gym detail page
- See available spots (capacity management)
- Book a spot (deducts 1 credit or pay separately)
- Cancel up to 2 hours before (credit returned)
- No-show: credit not returned

### 6.7 Quality & Trust Indicators

Gym-specific trust signals (supplements existing review system):

| Indicator | Description |
|-----------|-------------|
| **Facility Score** | Automated score: "10/14 facilities" based on checklist completion |
| **Equipment Quality Badge** | Self-reported: Basic / Standard / Premium / Professional |
| **Photo Verified** | GUDBRO staff has physically verified photos match reality |
| **Tourist-Friendly** | English-speaking staff + accepts digital payment + A/C confirmed |
| **Equipment Last Updated** | "Equipment refreshed: Jan 2026" |
| **Crowd Indicator** (future) | Time-of-day estimates: "Usually quiet before 10 AM" |

---

## 7. Technical Changes Required

### 7.1 Database Schema Additions

**New `WellnessCategory` value:**
Add `'gym_fitness'` to `wellness_businesses.business_type` and the TypeScript `WellnessCategory` union.

**New table: `gym_facilities`**
```sql
CREATE TABLE gym_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID REFERENCES wellness_locations(id) ON DELETE CASCADE,

    -- Facility Checklist
    has_ac BOOLEAN DEFAULT FALSE,
    has_showers BOOLEAN DEFAULT FALSE,
    has_hot_showers BOOLEAN DEFAULT FALSE,
    has_lockers BOOLEAN DEFAULT FALSE,
    has_towels BOOLEAN DEFAULT FALSE,
    has_water BOOLEAN DEFAULT FALSE,
    has_wifi BOOLEAN DEFAULT FALSE,
    has_parking_car BOOLEAN DEFAULT FALSE,
    has_parking_moto BOOLEAN DEFAULT FALSE,
    has_changing_rooms BOOLEAN DEFAULT FALSE,
    has_pool BOOLEAN DEFAULT FALSE,
    has_sauna BOOLEAN DEFAULT FALSE,
    has_mirror_walls BOOLEAN DEFAULT FALSE,
    has_sound_system BOOLEAN DEFAULT FALSE,

    -- Equipment (structured JSONB)
    equipment JSONB DEFAULT '[]'::jsonb,
    equipment_quality TEXT CHECK (equipment_quality IN ('basic', 'standard', 'premium', 'professional')),
    equipment_last_updated DATE,

    -- Capacity
    max_capacity INTEGER,
    gym_size_sqm INTEGER,

    -- Verification
    photo_verified BOOLEAN DEFAULT FALSE,
    photo_verified_at TIMESTAMP,
    tourist_friendly BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(location_id)
);

CREATE INDEX idx_gym_facilities_location ON gym_facilities(location_id);
```

**New table: `gym_day_passes`**
```sql
CREATE TABLE gym_day_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID REFERENCES wellness_locations(id) ON DELETE CASCADE,

    pass_type TEXT CHECK (pass_type IN ('day', 'half_day', 'week', 'month')) DEFAULT 'day',
    price INTEGER NOT NULL, -- VND
    credits_required INTEGER DEFAULT 1,

    valid_from TIME,
    valid_until TIME,

    includes_classes BOOLEAN DEFAULT FALSE,
    includes_pool BOOLEAN DEFAULT FALSE,
    includes_sauna BOOLEAN DEFAULT FALSE,
    includes_towel BOOLEAN DEFAULT FALSE,
    description TEXT,

    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gym_day_passes_location ON gym_day_passes(location_id);
```

**New table: `fitness_credits`**
```sql
CREATE TABLE fitness_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_phone VARCHAR(20) NOT NULL, -- primary identifier (tourists may not have account)
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),

    pack_type TEXT CHECK (pack_type IN ('starter_5', 'regular_10', 'power_20')),
    total_credits INTEGER NOT NULL,
    remaining_credits INTEGER NOT NULL,

    amount_paid INTEGER NOT NULL, -- VND
    currency TEXT DEFAULT 'VND',
    payment_method VARCHAR(50),

    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,

    status TEXT CHECK (status IN ('active', 'expired', 'fully_used')) DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fitness_credits_customer ON fitness_credits(customer_phone);
CREATE INDEX idx_fitness_credits_status ON fitness_credits(status);
```

**New table: `fitness_credit_usage`**
```sql
CREATE TABLE fitness_credit_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    credit_pack_id UUID REFERENCES fitness_credits(id) ON DELETE CASCADE,
    location_id UUID REFERENCES wellness_locations(id),
    booking_id UUID REFERENCES wellness_bookings(id),

    credits_used INTEGER DEFAULT 1,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_credit_usage_pack ON fitness_credit_usage(credit_pack_id);
```

**New table: `hotel_partnerships`**
```sql
CREATE TABLE hotel_partnerships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    hotel_name VARCHAR(255) NOT NULL,
    hotel_contact_name VARCHAR(255),
    hotel_contact_phone VARCHAR(20),
    hotel_contact_email VARCHAR(255),
    hotel_address TEXT,
    hotel_city VARCHAR(100) DEFAULT 'Da Nang',

    referral_commission_pct DECIMAL(5,2) DEFAULT 15.00,
    referral_code VARCHAR(50) UNIQUE NOT NULL,

    partner_location_ids JSONB DEFAULT '[]'::jsonb,

    status TEXT CHECK (status IN ('active', 'paused', 'terminated')) DEFAULT 'active',
    contract_start DATE,
    contract_end DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hotel_partnerships_code ON hotel_partnerships(referral_code);
```

**New table: `hotel_referrals`**
```sql
CREATE TABLE hotel_referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partnership_id UUID REFERENCES hotel_partnerships(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES wellness_bookings(id),

    booking_amount INTEGER NOT NULL,
    commission_amount INTEGER NOT NULL,
    commission_pct DECIMAL(5,2) NOT NULL,

    payout_status TEXT CHECK (payout_status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
    paid_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hotel_referrals_partnership ON hotel_referrals(partnership_id);
CREATE INDEX idx_hotel_referrals_payout ON hotel_referrals(payout_status);
```

**New table: `class_schedules`**
```sql
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID REFERENCES wellness_locations(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES wellness_staff(id),

    class_name VARCHAR(255) NOT NULL,
    class_type TEXT CHECK (class_type IN (
        'yoga', 'crossfit', 'spinning', 'boxing', 'muay_thai',
        'swimming', 'martial_arts', 'dance_fitness', 'pilates',
        'hiit', 'strength', 'stretching', 'other'
    )),
    description TEXT,

    day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
    start_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL,

    max_participants INTEGER,

    included_in_day_pass BOOLEAN DEFAULT TRUE,
    extra_cost INTEGER DEFAULT 0, -- VND, 0 if included

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_class_schedules_location ON class_schedules(location_id);
CREATE INDEX idx_class_schedules_day ON class_schedules(day_of_week);
```

### 7.2 Existing Schema Modifications

**`wellness_bookings` table -- add columns:**
```sql
ALTER TABLE wellness_bookings
    ADD COLUMN booking_type TEXT
        CHECK (booking_type IN ('appointment', 'day_pass', 'class', 'credit_redemption'))
        DEFAULT 'appointment',
    ADD COLUMN checkin_qr_code TEXT,
    ADD COLUMN checked_in_at TIMESTAMP,
    ADD COLUMN referral_code VARCHAR(50),
    ADD COLUMN credit_pack_id UUID REFERENCES fitness_credits(id);
```

**`wellness_services.category`** -- add valid values:
- `'gym_access'`
- `'fitness_class'`
- `'personal_training'`

### 7.3 API Additions

New endpoints extending the Express backend:

```
# Gym Discovery
GET    /api/gyms                         # List gyms (filtered wellness_locations where type=gym_fitness)
GET    /api/gyms/:slug                   # Gym detail with facilities, equipment, passes
GET    /api/gyms/:slug/classes           # Class schedule
GET    /api/gyms/nearby?lat=X&lng=Y&r=Z  # Geolocation search within radius

# Day Passes
GET    /api/gyms/:slug/passes            # Available pass types + prices
POST   /api/gyms/:slug/passes/book       # Purchase a day/week/month pass
GET    /api/passes/:id                   # Pass detail + QR code
POST   /api/passes/:id/checkin           # Record check-in (gym-side)

# Credit Packs
GET    /api/fitness/credits/plans        # Available credit packs
POST   /api/fitness/credits/purchase     # Buy a credit pack
GET    /api/fitness/credits/balance      # Check remaining credits
POST   /api/fitness/credits/redeem       # Redeem credit at a gym

# Classes
GET    /api/classes                      # All classes across all gyms
POST   /api/classes/:id/book             # Book a class spot
DELETE /api/classes/:id/book             # Cancel class booking

# Hotel Partnerships (B2B)
POST   /api/partnerships                 # Create hotel partnership
GET    /api/partnerships/:code/gyms      # Partner gyms for hotel
GET    /api/partnerships/:code/stats     # Referral stats + commission
POST   /api/partnerships/:code/refer     # Generate guest referral link
GET    /api/partnerships/:code/payouts   # Payout history
```

### 7.4 Frontend Config Changes

In `wellness.config.ts`:

```typescript
// New category pill
{ id: 'gym', label: 'Gym', icon: 'Barbell', color: '#E85D04' }

// New labels
labels: {
  ...existingLabels,
  dayPass: 'Day Pass',
  weekPass: 'Week Pass',
  credits: 'Fitness Credits',
  equipment: 'Equipment',
  facilities: 'Facilities',
  classes: 'Classes',
  buyPass: 'Buy Day Pass',
  gymAccess: 'Gym Access',
  creditBalance: 'Credit Balance',
}

// New feature flags
features: {
  ...existingFeatures,
  enableGymListings: true,
  enableDayPasses: true,
  enableCreditPacks: true,
  enableClassSchedules: true,
  enableHotelPartnerships: false, // B2B, enable per deployment
  enableGeolocation: true,
  enableGymMap: true,
}
```

---

## 8. Design Additions

### 8.1 Color Extension

New category color for gym/fitness:

```css
:root {
  /* Existing wellness palette preserved */
  --cat-massage: #8ba888; /* Sage */
  --cat-hair: #b8a898;    /* Taupe */
  --cat-nails: #e8b8b8;   /* Rose */
  --cat-beauty: #d4b8d4;  /* Lavender */
  --cat-tattoo: #4a4a4a;  /* Charcoal */
  --cat-barber: #8b7355;  /* Warm Brown */
  --cat-wellness: #a8c8d8; /* Sky Blue */

  /* NEW: Fitness Orange (energy, strength, motivation) */
  --cat-fitness: #E85D04;
  --cat-fitness-light: #FFF0E5;
  --cat-fitness-dark: #C44D03;
}
```

The warm orange contrasts with the calm sage/blush palette, visually signaling "this is the active/fitness section" while still belonging to the same brand ecosystem.

### 8.2 Fitness-Specific Icons

Using Phosphor Icons (per project standard in `CLAUDE.md` Section 8.1):

| Element | Phosphor Icon | Weight |
|---------|--------------|--------|
| Gym category | `Barbell` | duotone |
| A/C | `Snowflake` | duotone |
| Showers | `Shower` | duotone |
| Lockers | `Lockers` | duotone |
| Towels | `Towel` | duotone |
| WiFi | `WifiHigh` | duotone |
| Parking | `Car` / `Motorcycle` | duotone |
| Pool | `SwimmingPool` | duotone |
| Free Weights | `Barbell` | duotone |
| Cardio | `HeartPulse` | duotone |
| Classes | `UsersThree` | duotone |
| Day Pass / QR | `QrCode` | duotone |
| Credits / Wallet | `Wallet` | duotone |
| Hotel | `Buildings` | duotone |
| Check-in | `CheckCircle` | fill |

### 8.3 QR Code Day Pass

After purchasing a day pass, the user sees a full-screen QR code:

```
+---------------------------------------------+
|                                              |
|          GUDBRO FITNESS PASS                 |
|                                              |
|         +====================+               |
|         |                    |               |
|         |    [QR CODE]       |               |
|         |    200 x 200px     |               |
|         |                    |               |
|         +====================+               |
|                                              |
|     Iron Paradise Gym                        |
|     Day Pass - January 27, 2026             |
|     Valid: 06:00 - 22:00                    |
|                                              |
|     Guest: Jake Thompson                     |
|     Booking #: GF-2026-0127-001             |
|                                              |
|     [ Show this QR at reception ]            |
|                                              |
|     [Get Directions]  [Contact Gym]          |
+---------------------------------------------+
```

### 8.4 Credit Balance Widget

Persistent widget visible in the fitness section header when user has active credits:

```
+--------------------------------------+
| [Wallet Icon] 17/20 credits          |
| Expires: Mar 27, 2026   [Buy More]   |
+--------------------------------------+
```

---

## 9. New Routes/Pages

### Frontend Routes (Next.js App Router)

```
app/
|-- page.tsx                              # Homepage (MODIFY: add "Gym" category pill)
|-- services/                             # Existing wellness services (unchanged)
|-- staff/                                # Existing staff profiles (unchanged)
|-- packages/                             # Existing packages (ADD fitness combo packages)
|-- promotions/                           # Existing promotions (unchanged)
|-- search/page.tsx                       # MODIFY: include gym results
|-- fitness/                              # NEW: Fitness section root
|   |-- page.tsx                          # Gym listing (list + map view, filters)
|   |-- [slug]/                           # Individual gym
|   |   |-- page.tsx                      # Gym detail (facilities, equipment, reviews)
|   |   |-- classes/page.tsx              # Class schedule for this gym
|   |   `-- pass/page.tsx                 # Day pass purchase flow
|   |-- credits/                          # Credit pack system
|   |   |-- page.tsx                      # Browse and buy credit packs
|   |   `-- balance/page.tsx              # View balance and usage history
|   |-- classes/page.tsx                  # All classes across all partner gyms
|   `-- pass/[id]/page.tsx               # QR code pass display (full screen)
|-- hotel/                                # NEW: Hotel partner portal (B2B)
|   |-- [code]/page.tsx                   # Hotel-specific partner gym listing
|   `-- dashboard/page.tsx               # Hotel referral dashboard (stats, payouts)
|-- robots.txt/route.ts                   # MODIFY: add fitness and hotel routes
`-- sitemap.xml/route.ts                  # MODIFY: add fitness and hotel routes
```

### New Components

```
components/
|-- BottomNav.tsx                         # MODIFY: ensure fitness section accessible
|-- GymCard.tsx                           # NEW: Gym listing card (name, distance, price, facilities)
|-- GymFacilities.tsx                     # NEW: Facility icons grid with labels
|-- GymEquipment.tsx                      # NEW: Equipment inventory list
|-- GymPassCard.tsx                       # NEW: Day/week/month pass pricing card
|-- ClassScheduleTable.tsx                # NEW: Weekly class schedule table
|-- ClassBookingCard.tsx                  # NEW: Individual class booking card
|-- CreditPackCard.tsx                    # NEW: Credit pack option (5/10/20)
|-- CreditBalance.tsx                     # NEW: Credit balance widget
|-- FitnessPassQR.tsx                     # NEW: QR code full-screen pass display
|-- GymMap.tsx                            # NEW: Map view with gym location pins
|-- FacilityBadge.tsx                     # NEW: Individual facility icon + label
|-- EquipmentQualityBadge.tsx             # NEW: Basic/Standard/Premium/Professional badge
|-- HotelReferralBanner.tsx               # NEW: Banner shown to hotel-referred guests
`-- TouristFriendlyBadge.tsx              # NEW: "Tourist Friendly" trust badge
```

### SEO Additions

**Schema.org:** Add `SportsActivityLocation` structured data for gym listings (extends existing `LocalBusiness` pattern in `lib/seo/schema-org.js`).

**New meta patterns:**
- `/fitness` -> "Gyms & Fitness Centers in Da Nang - Day Passes for Tourists"
- `/fitness/[slug]` -> "{Gym Name} - Day Pass {Price} - {Area}, Da Nang"
- `/fitness/classes` -> "Fitness Classes in Da Nang - Yoga, CrossFit, Boxing"

---

## 10. Success Metrics

### North Star

**Hotel-referred gym bookings per month** -- this is the single metric that proves the B2B partnership model works.

### Phase 1 Targets (First 3 Months)

| Metric | Target | Rationale |
|--------|--------|-----------|
| Gyms onboarded | 10-15 in Da Nang | Focus on tourist-zone independents |
| Hotel partners | 3-5 | Hotels without gyms near My Khe / An Thuong |
| Day passes sold / month | 200 | ~7/day across all gyms |
| Average day pass value | 100K VND ($4) | Mid-range positioning |
| Gym profile view-to-booking conversion | >8% | Higher than beauty (immediate need) |
| Hotel referral share | >15% of bookings | Early B2B channel signal |
| Customer satisfaction rating | >4.3/5 | Quality bar |
| Gym partner satisfaction | >4.0/5 | WeFit failed here; our bar is higher |
| Partner payment on-time rate | **100%** | Non-negotiable; weekly payouts |

### Phase 2 Targets (Months 4-6)

| Metric | Target |
|--------|--------|
| Gyms onboarded | 25-30 (expand to Hoi An corridor) |
| Hotel partners | 10-15 |
| Day passes sold / month | 600 (~20/day) |
| Credit pack sales / month | 50 packs |
| Multi-gym credit users | 30% visit 2+ gyms (validates multi-gym value prop) |
| Class bookings / month | 100 |
| Revenue per gym / month | 2M VND ($80) from GUDBRO channel |
| Hotel commission / month | 500K VND/hotel ($20) |
| Cross-sell to spa/wellness | >15% of gym users also book a wellness service |

### Anti-Metrics (Watch and Avoid)

| Anti-Metric | Threshold | What It Signals |
|-------------|-----------|-----------------|
| Gym quality complaints | >5% of bookings | Quality control failing; photo verification needed |
| Gym partner churn | >10% quarterly | WeFit pattern; trust breaking; check payment timing |
| Credit pack refund requests | >3% | Pricing or expiry too aggressive |
| Hotel partner inactive rate | >30% | Partnership not delivering enough value |
| Day pass no-show rate | >20% | Consider requiring prepayment or deposit |

---

## 11. Rollout Plan

### Phase 0: Validation (Weeks 1-2)

**Goal:** Validate demand before writing code.

| Action | Timeline |
|--------|----------|
| Interview 5 gym owners in Da Nang tourist zone | Week 1 |
| Interview 5 hotel concierges (hotels without gyms) | Week 1 |
| Survey 20 tourists/nomads about gym discovery pain points | Week 1 |
| Validate pricing sensitivity ($1.50 budget vs $4 mid vs $8 premium) | Week 1 |
| Confirm 3-5 gyms willing to pilot | Week 2 |
| Confirm 2-3 hotels willing to pilot referral program | Week 2 |
| Document findings and refine PRD if needed | Week 2 |

### Phase 1: MVP (Weeks 3-6)

**Goal:** Gym listings exist and day passes are bookable.

| Feature | Effort | Week |
|---------|--------|------|
| Add `gym_fitness` category to schema + TypeScript | 2h | 3 |
| `gym_facilities` table + migration | 4h | 3 |
| `gym_day_passes` table + migration | 3h | 3 |
| Gym listing API endpoints | 8h | 3-4 |
| Day pass booking API + QR generation | 8h | 4 |
| Homepage: add "Gym" category pill | 1h | 4 |
| `GymCard` component | 4h | 4 |
| `/fitness` listing page (list view, no map yet) | 6h | 4-5 |
| `/fitness/[slug]` gym detail page | 8h | 5 |
| `/fitness/[slug]/pass` purchase flow | 6h | 5 |
| `/fitness/pass/[id]` QR code page | 4h | 5 |
| Onboard 5 pilot gyms with photos and pricing | Field work | 5-6 |
| SEO: SportsActivityLocation structured data | 4h | 6 |
| Basic gym search and filter | 4h | 6 |

**Phase 1 Total:** ~62 hours engineering + field work

### Phase 2: Credits + Classes (Weeks 7-10)

| Feature | Effort | Week |
|---------|--------|------|
| `fitness_credits` + `fitness_credit_usage` tables | 4h | 7 |
| Credit pack purchase API | 6h | 7 |
| Credit redemption flow | 6h | 7-8 |
| `/fitness/credits` page | 6h | 8 |
| Credit balance widget | 3h | 8 |
| `class_schedules` table | 3h | 8 |
| Class schedule API | 6h | 9 |
| `ClassScheduleTable` component | 4h | 9 |
| `/fitness/classes` all-classes page | 6h | 9 |
| Class booking flow | 6h | 10 |
| Map view for gym listings (geolocation) | 8h | 10 |

**Phase 2 Total:** ~58 hours

### Phase 3: Hotel Partnerships (Weeks 11-14)

| Feature | Effort | Week |
|---------|--------|------|
| `hotel_partnerships` + `hotel_referrals` tables | 4h | 11 |
| Hotel partnership API | 8h | 11 |
| Referral tracking (embed code in booking flow) | 6h | 12 |
| `/hotel/[code]` partner gym listing | 6h | 12 |
| `/hotel/dashboard` referral stats page | 8h | 13 |
| Commission calculation + payout report | 8h | 13 |
| Hotel onboarding: sign 3-5 partners | Field work | 11-14 |
| QR code for hotel lobby display | 3h | 14 |

**Phase 3 Total:** ~43 hours + field work

### Phase 4: Optimization (Weeks 15+)

| Feature | Priority |
|---------|----------|
| Gym check-in via QR scan (gym-side tool) | P1 |
| Push notifications for class reminders | P2 |
| Crowd level estimates (time-of-day heatmap) | P2 |
| Multi-city expansion (Ho Chi Minh, Hanoi, Hoi An) | P1 |
| Payment integration: MoMo, ZaloPay, Stripe | P1 |
| Gym owner mobile dashboard | P2 |
| Personal trainer booking (extends staff model) | P2 |
| Fitness + Spa combo packages | P1 |
| Self-serve gym onboarding portal | P2 |

---

## 12. Risks

### Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Gym owners distrust platforms (WeFit trauma)** | High | High | Weekly payouts from day one. Reference existing GUDBRO wellness partners as social proof. Start with personal relationships. Never delay a payment. |
| **Low tourist adoption ("I'll just Google it")** | Medium | High | Hotel referral channel bypasses Google entirely. QR codes in hotel rooms/lobby. Concierge training. In-stay dashboard integration. |
| **Gym quality inconsistent** | Medium | Medium | Photo verification badge. Facility checklist as minimum bar. Remove gyms below 3.5 stars. Tourist-friendly badge for vetted venues. |
| **Credit pack economics unsustainable** | Medium | High | No subsidies, ever. Conservative pricing. Credits expire after 30-90 days. Monitor redemption rates weekly. Premium gyms cost 2 credits. |
| **Hotels see too little commission** | Medium | Medium | Volume argument: $20/month today, $180/month at 10 referrals/day. Zero setup cost. Branded amenity card they give guests. Concierge sees it as a service, not work. |
| **Fitness section distracts from core wellness UX** | Low | Medium | Fitness is one category pill among seven. Users who do not care about gyms never see it. Clean separation via `/fitness` route. |
| **Regulatory risk: multi-gym credit passes** | Low | High | Credits are "prepaid day passes," not memberships. Legal review before Phase 2 launch. |
| **Seasonality: rainy season drops gym bookings** | Medium | Low | Promote indoor A/C gyms. Cross-sell classes. Pivot marketing to nomad community (year-round residents). |
| **Chain gyms (California Fitness) launch own day pass app** | Low | Medium | GUDBRO aggregates independents (chains already have systems). Hotel channel is the moat: chains do not do hotel B2B. |
| **WeFit-style cash flow problem** | Low | Critical | Commission-based model. No inventory. No subsidies. No unlimited plans. GUDBRO earns only when a booking happens. If bookings drop, costs drop proportionally. |

### Key Decision Points

| Decision | Timing | Options | Recommended Default |
|----------|--------|---------|-------------------|
| Map view in Phase 1 or Phase 2? | Week 3 | Phase 1 (richer but slower) vs Phase 2 (faster MVP) | **Phase 2** -- list view is sufficient for MVP |
| Cash payment or digital only? | Week 4 | Cash (wider adoption, harder tracking) vs digital only (cleaner) | **Both** -- gym confirms cash check-in manually |
| Multi-gym credits: uniform or per-gym pricing? | Week 7 | 1 credit everywhere vs premium gyms cost 2 | **Premium gyms cost 2 credits** |
| Hotel dashboard: custom build or analytics tool? | Week 11 | Custom page vs embedded Metabase/Retool | **Custom lightweight page** -- simpler for hotel staff |
| Geo-search radius default? | Week 3 | 500m, 1km, 2km, 5km | **2km** -- walkable/bikeable in Da Nang |

---

## Appendix A: Commission Comparison

| Channel | Gym | Hotel | GUDBRO | Total |
|---------|-----|-------|--------|-------|
| Hotel-referred booking | 70% | 15% | 15% | 100% |
| Direct booking (organic) | 80% | -- | 20% | 100% |
| Credit pack redemption | 70% | -- | 30% | 100% (30% covers credit pack discount) |

## Appendix B: Glossary

| Term | Definition |
|------|-----------|
| Day Pass | Single-day access to a gym, valid from opening to closing on purchased date |
| Credit Pack | Prepaid bundle of gym visits redeemable at any partner gym |
| Hotel Partnership | Formal referral agreement between a hotel and GUDBRO for gym access |
| Referral Code | Unique hotel identifier embedded in booking URLs for commission tracking |
| Check-in | Guest arrives at gym and scans QR code or staff confirms manually |
| Facility Checklist | Standardized list of gym amenities for quality comparison |
| Equipment Inventory | Categorized list of gym equipment types and quantities |
| Photo Verified | GUDBRO staff has physically visited and confirmed photos are accurate |
| Tourist-Friendly | English staff + digital payments + A/C confirmed |
| WeFit | Defunct Vietnamese fitness aggregator (2017-2020), cautionary reference |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-01-27 | Complete rewrite: 12-section structure with context/rationale, market data, 4 new personas, WeFit failure analysis, 5 user journeys, 7 feature groups, full technical spec (7 new tables, API endpoints, config changes), design system additions, new routes/pages, success metrics with anti-metrics, phased rollout plan, risk matrix with decision points |
| 1.0 | 2026-01-27 | Initial draft |
