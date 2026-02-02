# Phase 38: Guest Lifecycle — Research

> **Generated:** 2026-02-02
> **Goal:** Returning guest detection, early/late checkout requests, visa expiry alerts for owner, delivery apps deep-links

---

## 1. EXISTING CODEBASE INVENTORY

### 1.1 Database Schema (accom_bookings)

**File:** `shared/database/migrations/schema/077-accommodations-schema.sql`

The `accom_bookings` table already has:

- `guest_name TEXT NOT NULL` (first name)
- `guest_last_name TEXT NOT NULL`
- `guest_email TEXT`
- `guest_phone TEXT`
- `guest_count INTEGER`
- `check_in_date DATE`, `check_out_date DATE`
- `status TEXT` (pending, confirmed, checked_in, checked_out, cancelled, no_show)
- `booking_source TEXT` (direct, booking_com, airbnb, etc.)

**Added in migration 079:**

- `guest_country TEXT` — ISO country code (e.g., US, IT, DE). Currently seeded as 'US' for demo booking but **NOT populated during booking creation** (the POST /api/booking route does NOT insert guest_country).

**Added in migration 083 (v2 foundation):**

- Pricing breakdown columns (price_per_night, num_nights, subtotal, etc.)
- Payment tracking (payment*method, payment_status, stripe*\*)
- `expires_at TIMESTAMPTZ`
- Double-booking exclusion constraint via btree_gist

**Added in migration 097:**

- `checked_out_at TIMESTAMPTZ` — actual checkout timestamp for post-stay feedback timing

**Key observation:** There is NO `guest_nationality` column separate from `guest_country`. The `guest_country` column serves as both nationality and country code.

### 1.2 Guest Documents (accom_guest_documents)

**File:** `shared/database/migrations/schema/091-guest-documents.sql`

Already exists with:

- `booking_id UUID` (FK to accom_bookings)
- `property_id UUID` (FK to accom_properties)
- `document_type TEXT` (passport, visa)
- `visa_expiry_date DATE` — **this is the key field for visa expiry alerts**
- `reminder_sent_7d BOOLEAN` / `reminder_sent_3d BOOLEAN`
- `registered_with_authorities BOOLEAN`
- Index on `visa_expiry_date` where document_type = 'visa'

**Property-level visa config (migration 091):**

- `document_retention_days INTEGER DEFAULT 30`
- `visa_reminder_days INTEGER[] DEFAULT '{7,3}'`
- `visa_extension_info TEXT`

### 1.3 Existing Frontend Components

**Guest Dashboard (PWA):** `apps/accommodations/frontend/app/stay/[code]/page.tsx`

- Already imports `ProfileView`, `ReturnGuestBanner`, `VisaStatusCard`, `VisaExpiryAlert`
- `ReturnGuestBanner` — simple banner with text + URL, localStorage-based dismiss. **This is a promotional banner, NOT returning guest detection.**
- `ProfileView` has a **"Preferences" stub explicitly marked for Phase 38** (line 229: `{/* Preferences (stub for Phase 38) */}`)
- `VisaStatusCard` — shows visa countdown to guest (estimated or uploaded), already functional
- `VisaExpiryAlert` — shows warning when visa is close to expiry

**Backoffice Booking Detail:** `apps/backoffice/app/(dashboard)/accommodations/bookings/[id]/page.tsx`

- Shows guest info, stay details, payment, timeline, documents
- Documents section shows visa expiry date and registration status
- **No "returning guest" badge currently**
- **No visa expiry alert for owner currently** (only document listing)

### 1.4 Concierge/Transport System

**File:** `apps/accommodations/frontend/lib/concierge-data.ts`

- Already has `RecommendedApp` type with name, description, platform
- Transport tips include Grab, Be, Xanh SM references
- `ConciergeTransport.tsx` shows transport options as cards
- **No delivery app deep-links exist yet** — transport section is for ride-hailing/taxis

### 1.5 Booking Form

**File:** `apps/accommodations/frontend/components/booking/BookingForm.tsx`

- Collects: firstName, lastName, email, phone, guestCount, specialRequests, paymentMethod, voucherCode
- **Does NOT collect guest_country/nationality** — guest_country is only set manually or via seed data
- The phone input uses `react-international-phone` which could be used to infer country from phone prefix

---

## 2. WHAT NEEDS TO BE BUILT (per plan)

### Plan 38-01: Returning Guest + Visa Alert + Checkout Requests

#### A. Returning Guest Detection (OWN-08)

**Requirement:** Match guests across bookings using name + last name + nationality. Avoid false positives for common SEA surnames (Nguyen, Tran, Le, Pham).

**Key decisions needed:**

1. **Matching strategy:** The requirement says "name + last name + nationality" but `guest_country` is rarely populated. Options:
   - Match on `LOWER(guest_name) + LOWER(guest_last_name) + guest_email` (email is most reliable)
   - Match on `LOWER(guest_name) + LOWER(guest_last_name) + guest_country` (requires guest_country to be collected)
   - Multi-signal: combine name + email OR name + phone OR name + country (any 2 of 3)

2. **False positive mitigation:** Common Vietnamese surnames (Nguyen ~40% of population) mean `guest_last_name = 'Nguyen'` alone matches ~40% of local bookings. Mitigation:
   - Require at least 2 matching signals (name + email, or name + country, or full name + phone)
   - Only match within same property (a "returning guest" is someone who stayed at THIS property before)
   - Exclude current booking from matches

3. **Database approach:** SQL function or query at booking detail load time:

   ```sql
   -- Find previous bookings at this property with matching guest identity
   SELECT COUNT(*), MAX(check_out_date) as last_visit
   FROM accom_bookings
   WHERE property_id = $1
     AND id != $2  -- exclude current booking
     AND status IN ('checked_out', 'confirmed', 'checked_in')
     AND (
       -- Signal 1: exact email match
       (guest_email IS NOT NULL AND LOWER(guest_email) = LOWER($3))
       OR
       -- Signal 2: full name + country match (when country available)
       (LOWER(guest_name) = LOWER($4) AND LOWER(guest_last_name) = LOWER($5) AND guest_country = $6 AND guest_country IS NOT NULL)
       OR
       -- Signal 3: full name + phone match
       (LOWER(guest_name) = LOWER($4) AND LOWER(guest_last_name) = LOWER($5) AND guest_phone = $7 AND guest_phone IS NOT NULL)
     )
   ```

4. **UI:** "Welcome back" badge in backoffice booking detail view. Simple pill/badge next to guest name showing visit count.

**Data gap:** `guest_country` is not collected during booking. Two options:

- Add nationality/country field to BookingForm (recommended for Phase 38)
- Infer from phone prefix (unreliable — many travelers use local SIMs)

#### B. Visa Expiry Alert for Owner (OWN-09)

**Requirement:** Warn owner if guest's visa expires during their stay (before checkout).

**What exists:**

- `accom_guest_documents.visa_expiry_date DATE` — already stored when guest uploads visa
- Guest-facing `VisaStatusCard` and `VisaExpiryAlert` already show countdown
- Documents section in booking detail shows visa expiry date

**What's missing:**

- **Owner-side alert logic:** Query to detect `visa_expiry_date < check_out_date` for active bookings
- **UI in booking detail:** Alert banner/card in the backoffice booking detail page when visa expires during stay
- **Optional: Bookings list indicator** — small icon/badge on bookings where visa expires during stay

**Implementation approach:**

- When loading booking detail, if documents include a visa with `visa_expiry_date < booking.check_out_date`, show a prominent warning card
- SQL: Already have `idx_guest_docs_visa_expiry` index on visa_expiry_date
- The check is simple: `visa_expiry_date IS NOT NULL AND visa_expiry_date < check_out_date AND visa_expiry_date >= check_in_date`

#### C. Early Check-in / Late Checkout Request (GXP-01)

**Requirement:** Guest requests via PWA, owner approves/rejects from backoffice with conflict detection.

**New table needed:** `accom_checkout_requests`

```sql
CREATE TABLE accom_checkout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL CHECK (request_type IN ('early_checkin', 'late_checkout')),
  requested_time TIME NOT NULL, -- e.g., '10:00' for early checkin, '15:00' for late checkout
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  owner_response TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Conflict detection logic:**

- For **late checkout**: Check if another booking has check_in on the same day for the same room
- For **early check-in**: Check if another booking has check_out on the same day for the same room
- Query: `SELECT EXISTS(SELECT 1 FROM accom_bookings WHERE room_id = $1 AND check_in_date = $2 AND status NOT IN ('cancelled', 'no_show'))` for late checkout conflicts

**Guest PWA flow:**

1. Button in ProfileView or stay dashboard: "Request Early Check-in" / "Request Late Checkout"
2. Simple form: select desired time + optional reason
3. Submit via API → creates pending request
4. Show request status (pending/approved/rejected)

**Owner backoffice flow:**

1. Alert in booking detail when pending request exists
2. Show conflict warning if adjacent booking exists
3. Approve/Reject buttons with optional response message

### Plan 38-02: Delivery Apps Section (GXP-04)

**Requirement:** Branded cards for Grab, ShopeeFood, Baemin with deep-links pre-filled with property address. Link-out only.

**Key research findings:**

#### Delivery App Deep-Links (Vietnam)

| App            | Platform    | Deep-Link Pattern                                   | Notes                                                            |
| -------------- | ----------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| **Grab**       | iOS/Android | `grab://` scheme, or `https://food.grab.com/vn/en/` | Universal links work; address pre-fill via URL params is limited |
| **ShopeeFood** | iOS/Android | `shopeefood://` scheme, or `https://shopeefood.vn/` | Formerly Now.vn; deep-link support varies                        |
| **Baemin**     | iOS/Android | `baemin://` or `https://baemin.vn/`                 | Woowa Brothers (Korean); popular in Vietnam                      |

**Reality check on "pre-fill address":**

- Grab Food: The web URL `https://food.grab.com/vn/en/` opens the web version but does NOT support address pre-fill via URL parameters. The `grab://` scheme opens the app but address pre-fill is not a public API.
- ShopeeFood: Similar limitation — no public API for address pre-fill
- Baemin: Same — app deep-links exist but address pre-fill is not documented

**Practical approach:** Show branded cards with:

1. App store links (if app not installed)
2. Universal links to open the app (if installed)
3. Property address displayed as copyable text so guest can paste into the app
4. Optional: Property coordinates for "copy location" button

**Implementation:**

- Static config per country (Vietnam: Grab, ShopeeFood, Baemin; Thailand: Grab, Foodpanda, LINE MAN; etc.)
- Property address from `accom_properties.address` + `accom_properties.city`
- Cards with app logo, name, "Order Food" CTA, and "Copy address" button
- Country-specific app list based on `accom_properties.country_code`

**No database changes needed** — this is purely frontend with static app configuration per country.

---

## 3. RISK AREAS & EDGE CASES

### 3.1 Returning Guest Detection

- **False positives:** "Nguyen Van" is extremely common. Email match is the safest signal.
- **Privacy:** Showing "3rd visit" reveals guest history — ensure this is only visible to owner, never to other guests
- **Cross-property:** Should returning guest only count same property, or across all owner properties? Recommendation: same property only (simpler, clearer value)
- **guest_country gap:** Currently not collected during booking. Need to add to BookingForm or accept that country-based matching will be incomplete initially

### 3.2 Visa Expiry Alert

- **Visa not uploaded:** Many guests won't upload visa documents. Alert only works when visa doc exists with expiry date.
- **Visa-free guests:** Guests from visa-exempt countries (45-day exemption) may not upload anything. The VisaStatusCard already estimates this based on guest_country + check_in_date. Owner alert could use this estimated expiry too.
- **Multiple visa documents:** A guest may upload updated visa (superseding old one). Use latest non-superseded visa document.

### 3.3 Early/Late Checkout

- **Timezone handling:** Property timezone (`accom_properties.timezone`) must be used for all time comparisons
- **Multiple requests:** Guest submits early checkin, then also late checkout. Allow both? Recommendation: yes, they're independent requests
- **Already checked out:** Don't allow late checkout request after actual checkout
- **Conflict detection accuracy:** The exclusion constraint prevents double-booking by date, but same-day turnaround (guest A checkout + guest B checkin on same day) is allowed. Late checkout could genuinely conflict with next guest's check-in.

### 3.4 Delivery Apps

- **App availability:** Grab operates across SEA, but ShopeeFood and Baemin are Vietnam-specific. Need country-aware app list.
- **App store links:** Need both iOS App Store and Google Play Store links
- **Deep-link fallback:** If app is not installed, universal link should fall back to web or app store
- **No GUDBRO integration:** Explicitly "link-out only, not a parallel order system" per requirements

---

## 4. DEPENDENCIES MAP

```
Phase 28 (Document Upload) ──── accom_guest_documents table ✅ EXISTS
                                 visa_expiry_date field ✅ EXISTS
                                 Document upload flow ✅ EXISTS

Phase 34 (Service Expansion) ── Service orders ✅ EXISTS
                                 Order detail view ✅ EXISTS

Phase 37 (Conventions) ────────  Convention vouchers ✅ EXISTS (not directly needed but validates booking flow)

Migration 079 ─────────────────  guest_country column ✅ EXISTS (but not populated during booking)
Migration 083 ─────────────────  checked_out_at column ✅ EXISTS
Migration 091 ─────────────────  Guest documents + visa tracking ✅ EXISTS
```

All dependencies are met. The only gap is `guest_country` not being collected during booking creation.

---

## 5. IMPLEMENTATION ESTIMATES

| Component                          | Complexity | New Files                  | Modified Files      | New Migration        |
| ---------------------------------- | ---------- | -------------------------- | ------------------- | -------------------- |
| Returning guest SQL function       | Medium     | 0                          | 0                   | 1 (function + index) |
| Returning guest badge (backoffice) | Low        | 0                          | 1 (booking detail)  |                      |
| guest_country in BookingForm       | Low        | 0                          | 3 (form, hook, API) | 0 (column exists)    |
| Visa expiry alert (backoffice)     | Low        | 1 (alert component)        | 1 (booking detail)  | 0                    |
| Checkout request table             | Medium     | 0                          | 0                   | 1                    |
| Checkout request API (guest)       | Medium     | 1                          | 0                   | 0                    |
| Checkout request UI (guest PWA)    | Medium     | 1-2                        | 1 (ProfileView)     | 0                    |
| Checkout request UI (backoffice)   | Medium     | 1                          | 1 (booking detail)  | 0                    |
| Conflict detection query           | Low        | 0                          | Included in API     | 0                    |
| Delivery apps section              | Low        | 1 (component) + 1 (config) | 1 (stay page)       | 0                    |

**Total new migrations:** 2 (returning guest function, checkout requests table)
**Total new files:** ~6-8
**Total modified files:** ~8-10

---

## 6. TECHNICAL DECISIONS (RECOMMENDATIONS)

### 6.1 Returning Guest Matching Strategy

**Recommended:** Multi-signal with priority:

1. Email match (highest confidence)
2. Full name + phone match
3. Full name + country match (when country available)

Any single match is sufficient, but name-only match is never used (too many false positives).

### 6.2 guest_country Collection

**Recommended:** Add country selector to BookingForm using the existing `react-international-phone` country data. Make it optional but encouraged. Pre-select based on phone country code if available.

### 6.3 Visa Alert Scope

**Recommended:** Show alert in booking detail when:

- Guest has uploaded visa with `visa_expiry_date < check_out_date`, OR
- Guest has `guest_country` in visa-exempt list and estimated exemption expiry (check_in + exemption_days) < check_out_date

### 6.4 Delivery Apps Architecture

**Recommended:** Country-keyed static config object (like `concierge-data.ts` pattern). No database storage needed. New `DeliveryAppsSection` component in guest dashboard.

### 6.5 Checkout Request Flow

**Recommended:** Lightweight approval queue. No real-time notifications initially — owner sees pending requests when viewing booking detail. Future enhancement: push notification via existing notification system.

---

## 7. FILES TO MODIFY/CREATE (Summary)

### New Files

- `shared/database/migrations/schema/100-guest-lifecycle.sql` — returning guest function, checkout requests table
- `apps/accommodations/frontend/components/stay/CheckoutRequestForm.tsx` — guest request form
- `apps/accommodations/frontend/components/stay/DeliveryAppsSection.tsx` — delivery app cards
- `apps/accommodations/frontend/lib/delivery-apps-data.ts` — country-keyed app config
- `apps/accommodations/frontend/app/api/stay/[code]/checkout-request/route.ts` — guest API
- `apps/backoffice/components/accommodations/ReturningGuestBadge.tsx` — badge component
- `apps/backoffice/components/accommodations/VisaExpiryAlert.tsx` — owner alert component
- `apps/backoffice/app/api/accommodations/checkout-requests/route.ts` — owner API

### Modified Files

- `apps/accommodations/frontend/components/booking/BookingForm.tsx` — add country selector
- `apps/accommodations/frontend/hooks/useBookingForm.ts` — add country state
- `apps/accommodations/frontend/app/api/booking/route.ts` — insert guest_country
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` — add DeliveryAppsSection
- `apps/accommodations/frontend/components/stay/ProfileView.tsx` — add checkout request button
- `apps/backoffice/app/(dashboard)/accommodations/bookings/[id]/page.tsx` — add badge, alert, request queue
