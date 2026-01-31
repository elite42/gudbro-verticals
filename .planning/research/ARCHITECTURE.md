# Architecture: Accommodations v2 -- Booking, Owner Dashboard, Service Ordering

**Domain:** Accommodation booking platform with in-stay service management
**Researched:** 2026-01-31
**Confidence:** HIGH (existing codebase fully examined, all integration points verified against source)

---

## Existing Architecture Baseline

### What Already Exists (EXTEND, not replace)

| Asset                                              | Location                                                                            | Status | Relevance                                                   |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------- |
| In-Stay Dashboard                                  | `apps/accommodations/frontend/app/stay/[code]/page.tsx`                             | LIVE   | **Keep** -- guest dashboard after check-in                  |
| Guest JWT Auth                                     | `apps/accommodations/frontend/lib/auth.ts`                                          | LIVE   | **Extend** -- add public (no-auth) routes alongside         |
| Stay API Client                                    | `apps/accommodations/frontend/lib/stay-api.ts`                                      | LIVE   | **Extend** -- add booking + service ordering API calls      |
| Session Hook                                       | `apps/accommodations/frontend/hooks/useStaySession.ts`                              | LIVE   | **Keep** -- manages guest JWT lifecycle                     |
| 6 API Routes                                       | `app/api/stay/[code]/*` (lookup, verify, services, deals, property, useful-numbers) | LIVE   | **Keep** -- all read-only, add write routes for ordering    |
| `accom_properties`                                 | Migration 077 + 079 + 080 + 081                                                     | LIVE   | **Extend** -- add pricing columns, booking_mode config      |
| `accom_rooms`                                      | Migration 077                                                                       | LIVE   | **Extend** -- add base pricing, availability tracking       |
| `accom_bookings`                                   | Migration 077 + 079                                                                 | LIVE   | **Extend** -- add payment fields, pricing breakdown         |
| `accom_service_categories` + `accom_service_items` | Migration 077 + 081                                                                 | LIVE   | **Keep** -- service catalog already works                   |
| `accom_service_translations`                       | Migration 077                                                                       | LIVE   | **Keep** -- multi-language support                          |
| `verify_booking_access()`                          | Migration 077                                                                       | LIVE   | **Keep** -- SECURITY DEFINER for guest access               |
| `generate_booking_code()`                          | Migration 077                                                                       | LIVE   | **Keep** -- auto-generates BK-XXXXXX codes                  |
| F&B Integration                                    | Migration 080                                                                       | LIVE   | **Keep** -- `has_linked_fnb`, `linked_fnb_slug`             |
| `@shared/payment`                                  | `shared/payment/`                                                                   | LIVE   | **Reuse** -- payment types, formatPrice, currency detection |
| Backoffice                                         | `apps/backoffice/` (52 pages, Radix UI + Tailwind)                                  | LIVE   | **Extend** -- add owner dashboard pages                     |
| Supabase Admin Client                              | `apps/accommodations/frontend/lib/supabase.ts`                                      | LIVE   | **Reuse** -- lazy-init pattern with service role            |
| RLS Policies                                       | Migration 077                                                                       | LIVE   | **Extend** -- add policies for new tables                   |
| `partner_conventions`                              | Migration 080 notes (INT-01)                                                        | LIVE   | **Reuse** -- polymorphic partner linking already works      |

### Key Architectural Constraints

1. **Database conventions:** TEXT + CHECK (no ENUM), English column names, `accom_` prefix for all tables
2. **Auth model:** Two separate auth mechanisms:
   - **Guest:** Custom JWT via `signGuestToken()` / `verifyGuestToken()`, checkout+24h expiry, localStorage persistence
   - **Owner:** Supabase Auth via `accounts` table, RLS via `owner_id` matching `accounts.auth_id`
3. **API pattern:** Next.js API routes with `getSupabaseAdmin()` (service role, bypasses RLS), manual auth checks
4. **Frontend pattern:** Client-side rendering (`'use client'`), React hooks for state, Tailwind for styling
5. **No middleware:** No Next.js middleware exists yet -- auth checks are per-route
6. **Price storage:** INTEGER (minor units) -- accom_service_items.price stores VND cents
7. **Two deployment targets:** Accommodations PWA runs independently from Backoffice -- separate Next.js apps

---

## Architecture for New Features

### High-Level System Map

```
                                    ACCOMMODATIONS PWA
                                    (apps/accommodations/frontend)
                                    +---------------------------------+
                                    |                                 |
     PUBLIC VISITOR ------>  [1. /{slug}]  Property Page (Booking Mode)
          |                         |
          | books                   | booking form
          v                         v
     GUEST -----QR scan---->  [2. /stay/{code}]  In-Stay Dashboard (EXISTING)
          |                         |
          | orders services         | service menu (EXISTING: read-only)
          v                         v
     GUEST -----submit----->  [3. /stay/{code}/order]  Service Ordering (NEW)


                                    BACKOFFICE
                                    (apps/backoffice)
                                    +---------------------------------+
                                    |                                 |
     OWNER ------login----->  [4. /stays/*]  Owner Dashboard (NEW)
                                    |
                                    +-- /stays/bookings      (manage bookings)
                                    +-- /stays/calendar       (availability)
                                    +-- /stays/services       (manage services)
                                    +-- /stays/deals          (manage deals)
                                    +-- /stays/settings       (property config)
                                    +-- /stays/analytics      (revenue reports)
```

---

## Component 1: Public Property Page (Booking Mode)

### Integration Points

| What           | Integrates With                                 | How                                                      |
| -------------- | ----------------------------------------------- | -------------------------------------------------------- |
| Property data  | `accom_properties` table                        | Direct Supabase query (server component, no auth needed) |
| Room/unit data | `accom_rooms` table                             | Join with property, filter `is_active = true`            |
| Images         | `accom_properties.images` JSONB                 | Already stored as JSONB array of URLs                    |
| Availability   | NEW `accom_availability` table                  | Date-based availability check                            |
| Pricing        | `accom_rooms.base_price_per_night` (NEW column) | Per-room pricing with date overrides                     |
| Reviews        | NEW `accom_reviews` table                       | Public read access                                       |

### New Routes Needed (Accommodations PWA)

```
apps/accommodations/frontend/app/
  [slug]/
    page.tsx                    -- Public property page (SSR for SEO)
  api/
    property/
      [slug]/
        route.ts                -- GET: public property data + rooms + availability
        availability/
          route.ts              -- GET: date range availability check
    booking/
      route.ts                  -- POST: create booking (public, no auth)
      [id]/
        route.ts                -- GET: booking confirmation details
```

### New Components

```
components/booking/
  PropertyHero.tsx              -- Image gallery (swipeable)
  PropertyInfo.tsx              -- Name, type, rating, location
  AmenityGrid.tsx               -- Amenity icons grid
  RoomCard.tsx                  -- Room type with pricing
  DatePicker.tsx                -- Check-in/out date selection
  PriceBreakdown.tsx            -- Nightly rate x nights + fees
  BookingForm.tsx               -- Guest info + payment method
  BookingConfirmation.tsx       -- Success page with BK-code
  ReviewsList.tsx               -- Guest reviews
  LocationMap.tsx               -- Property location
  HostProfile.tsx               -- Host info + contact
```

### Data Flow: Booking Creation

```
Guest fills form -> POST /api/booking
  |
  |-- Validate dates (check_in < check_out)
  |-- Check availability (accom_availability)
  |-- Calculate pricing (base + fees + discounts)
  |
  |-- IF booking_mode = 'instant':
  |     |-- Insert accom_bookings (status: 'confirmed')
  |     |-- Generate booking_code (trigger)
  |     |-- Send WhatsApp/email confirmation
  |     |-- Return { bookingCode, status: 'confirmed' }
  |
  |-- IF booking_mode = 'inquiry':
  |     |-- Insert accom_bookings (status: 'pending')
  |     |-- Generate booking_code (trigger)
  |     |-- Notify owner (WhatsApp)
  |     |-- Return { bookingCode, status: 'pending' }
  |
  v
Guest sees confirmation page with BK-XXXXXX
```

### URL Structure

```
/{slug}                         -- Property page (public, SEO-friendly)
/{slug}?checkin=2026-02-01&checkout=2026-02-05  -- Deep link with dates
/booking/{bookingCode}          -- Booking confirmation page
/stay/{bookingCode}             -- In-Stay Dashboard (EXISTING)
```

### SEO Consideration

The `/{slug}` page should be a **Server Component** (not `'use client'`) for:

- SSR/SSG for search engine indexing
- Open Graph meta tags (property name, cover image, price)
- Structured data (schema.org/LodgingBusiness)

This is a departure from the existing In-Stay Dashboard which is fully client-rendered. The booking page needs discoverability; the in-stay dashboard does not.

---

## Component 2: Hybrid Booking System

### Database Changes

```sql
-- Extend accom_properties
ALTER TABLE accom_properties
  ADD COLUMN booking_mode TEXT NOT NULL DEFAULT 'inquiry'
    CHECK (booking_mode IN ('instant', 'inquiry', 'disabled')),
  ADD COLUMN min_nights INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN max_nights INTEGER DEFAULT NULL,
  ADD COLUMN cleaning_fee INTEGER DEFAULT 0,        -- minor units
  ADD COLUMN service_fee_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN weekly_discount_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN monthly_discount_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN cancellation_policy TEXT NOT NULL DEFAULT 'flexible'
    CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict', 'non_refundable'));

-- Extend accom_rooms with pricing
ALTER TABLE accom_rooms
  ADD COLUMN base_price_per_night INTEGER NOT NULL DEFAULT 0,  -- minor units
  ADD COLUMN currency TEXT NOT NULL DEFAULT 'VND';

-- NEW: Availability calendar
CREATE TABLE accom_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES accom_rooms(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'booked', 'blocked')),
  price_override INTEGER,            -- NULL = use base price
  booking_id UUID REFERENCES accom_bookings(id) ON DELETE SET NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(room_id, date)
);

-- Extend accom_bookings with pricing
ALTER TABLE accom_bookings
  ADD COLUMN price_per_night INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN subtotal INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN cleaning_fee INTEGER DEFAULT 0,
  ADD COLUMN service_fee INTEGER DEFAULT 0,
  ADD COLUMN discount_amount INTEGER DEFAULT 0,
  ADD COLUMN total_price INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN currency TEXT NOT NULL DEFAULT 'VND',
  ADD COLUMN payment_method TEXT DEFAULT 'cash'
    CHECK (payment_method IN ('cash', 'card', 'bank_transfer', 'crypto', 'vnpay', 'momo')),
  ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
  ADD COLUMN confirmed_via TEXT
    CHECK (confirmed_via IN ('whatsapp', 'zalo', 'telegram', 'email', 'sms', 'auto'));

-- NEW: Reviews
CREATE TABLE accom_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_country TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  owner_reply TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(booking_id)  -- One review per booking
);
```

### RLS for New Tables

```sql
-- accom_availability: anon reads available dates, owner manages
CREATE POLICY accom_availability_anon_read ON accom_availability
  FOR SELECT TO anon USING (true);

CREATE POLICY accom_availability_owner_manage ON accom_availability
  FOR ALL TO authenticated USING (
    property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    )
  );

-- accom_reviews: anon reads visible, owner manages via property
CREATE POLICY accom_reviews_anon_read ON accom_reviews
  FOR SELECT TO anon USING (is_visible = true);

CREATE POLICY accom_reviews_owner_manage ON accom_reviews
  FOR ALL TO authenticated USING (
    property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    )
  );
```

---

## Component 3: Service Ordering (Guest Side)

### Integration Points

| What               | Integrates With                                          | How                                   |
| ------------------ | -------------------------------------------------------- | ------------------------------------- |
| Service catalog    | `accom_service_categories` + `accom_service_items`       | EXISTING read routes work             |
| Order creation     | NEW `accom_service_orders` + `accom_service_order_items` | New POST route                        |
| Guest auth         | Existing JWT system                                      | Order routes use `verifyGuestToken()` |
| Owner notification | WhatsApp Business API                                    | POST to WhatsApp on new order         |
| Payment            | `@shared/payment` types                                  | Reuse PaymentMethod enum              |

### New Tables

```sql
CREATE TABLE accom_service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,

  -- Pricing
  subtotal INTEGER NOT NULL DEFAULT 0,
  tax INTEGER DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'VND',

  -- Status
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivered', 'cancelled')),

  -- Delivery
  requested_time TEXT,          -- e.g., "7:30 AM" for breakfast
  delivery_notes TEXT,

  -- Payment
  payment_method TEXT NOT NULL DEFAULT 'room_charge'
    CHECK (payment_method IN ('room_charge', 'cash', 'card')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE accom_service_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES accom_service_orders(id) ON DELETE CASCADE,
  service_item_id UUID NOT NULL REFERENCES accom_service_items(id),
  name TEXT NOT NULL,           -- Snapshot at order time
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,  -- Snapshot at order time
  variant TEXT,
  notes TEXT,
  total INTEGER NOT NULL
);
```

### New API Routes

```
apps/accommodations/frontend/app/api/
  stay/[code]/
    orders/
      route.ts                  -- POST: create service order (guest JWT auth)
                                -- GET: list guest's orders (guest JWT auth)
    orders/[orderId]/
      route.ts                  -- GET: order status (guest JWT auth)
```

### New Components

```
components/stay/
  ServiceOrderSheet.tsx         -- Bottom sheet: cart + submit
  ServiceItemCard.tsx           -- Item with +/- quantity (MODIFY existing ServicesCarousel)
  OrderCart.tsx                  -- Floating cart button with count
  OrderConfirmation.tsx         -- Post-submit confirmation
  OrderHistory.tsx              -- Past orders list
```

### Data Flow: Service Ordering

```
Guest browses services (EXISTING ServicesCarousel)
  |
  v
Guest adds items to cart (client-side state)
  |
  v
Guest opens ServiceOrderSheet
  |-- Selects delivery time
  |-- Adds notes
  |-- Chooses payment method
  |-- Submits
  |
  v
POST /api/stay/{code}/orders
  |-- Verify JWT (authenticateGuest)
  |-- Validate items exist + in_stock
  |-- Calculate totals
  |-- Insert accom_service_orders + accom_service_order_items
  |-- Send WhatsApp notification to owner
  |-- Return order with status: 'pending'
  |
  v
Guest sees OrderConfirmation
```

---

## Component 4: Owner Dashboard (Backoffice)

### Integration Points

| What          | Integrates With                           | How                                                                     |
| ------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| Auth          | Backoffice Supabase Auth                  | Existing `getSession()` + RLS                                           |
| Property data | `accom_properties` (owner_id FK)          | RLS: `owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())` |
| Navigation    | Backoffice Sidebar.tsx                    | Add "Stays" section to sidebar                                          |
| UI components | Radix UI + Tailwind (backoffice standard) | Follow existing patterns                                                |
| Data tables   | TanStack Table (already in backoffice)    | Reuse for bookings, services lists                                      |

### Architecture Decision: Where Does the Owner Dashboard Live?

**Recommendation: In the Backoffice app (`apps/backoffice/`).** Rationale:

1. **Auth already exists** -- Supabase Auth with `accounts` table, role-based permissions
2. **UI patterns exist** -- Radix UI, TanStack Table, Sidebar navigation, all established
3. **Multi-vertical pattern** -- Backoffice already manages F&B (coffeeshop), adding stays follows the same pattern
4. **No new deployment** -- One fewer Vercel project to manage
5. **Cross-vertical consistency** -- Owner sees all their businesses in one place

**NOT in the Accommodations PWA** because:

- PWA is guest-facing (public URLs, no Supabase Auth)
- Mixing owner auth (Supabase) with guest auth (JWT) in one app adds complexity
- PWA should stay lightweight for mobile performance

### New Backoffice Routes

```
apps/backoffice/app/(dashboard)/stays/
  page.tsx                      -- Dashboard overview (stats, recent bookings)
  bookings/
    page.tsx                    -- Bookings list with filters
    [id]/
      page.tsx                  -- Booking detail + actions
  calendar/
    page.tsx                    -- Visual availability calendar
  rooms/
    page.tsx                    -- Room management
  services/
    page.tsx                    -- Service categories + items CRUD
  deals/
    page.tsx                    -- Local deals management
  reviews/
    page.tsx                    -- Reviews + reply
  settings/
    page.tsx                    -- Property settings (booking mode, pricing, policies)
  analytics/
    page.tsx                    -- Revenue, occupancy, service revenue charts

apps/backoffice/app/api/stays/
  bookings/
    route.ts                    -- GET (list), POST (manual create)
    [id]/
      route.ts                  -- GET, PATCH (status change), DELETE (cancel)
  calendar/
    route.ts                    -- GET (availability grid), PATCH (block/unblock dates)
  rooms/
    route.ts                    -- CRUD
  services/
    categories/
      route.ts                  -- CRUD
    items/
      route.ts                  -- CRUD
  orders/
    route.ts                    -- GET (service orders list)
    [id]/
      route.ts                  -- PATCH (update status)
  deals/
    route.ts                    -- CRUD
  reviews/
    route.ts                    -- GET, PATCH (reply)
  settings/
    route.ts                    -- GET, PATCH (property config)
  analytics/
    route.ts                    -- GET (stats, charts data)
```

### New Backoffice Components

```
apps/backoffice/components/stays/
  BookingsTable.tsx             -- TanStack Table with status filters
  BookingDetailPanel.tsx        -- Booking info + actions
  AvailabilityCalendar.tsx      -- Month grid with color-coded dates
  RoomManager.tsx               -- Room CRUD list
  ServiceCategoryManager.tsx    -- Category + items CRUD
  ServiceOrdersList.tsx         -- Incoming service orders
  DealsManager.tsx              -- Local deals CRUD
  ReviewsTable.tsx              -- Reviews with reply action
  StaysDashboardStats.tsx       -- Key metrics cards
  PropertySettingsForm.tsx      -- Booking mode, pricing, policies
```

### Sidebar Integration

Add to existing `apps/backoffice/components/layout/Sidebar.tsx`:

```typescript
// In the navigation items array, add:
{
  label: 'Stays',
  icon: 'Buildings',  // Phosphor icon
  href: '/stays',
  children: [
    { label: 'Dashboard', href: '/stays' },
    { label: 'Bookings', href: '/stays/bookings' },
    { label: 'Calendar', href: '/stays/calendar' },
    { label: 'Rooms', href: '/stays/rooms' },
    { label: 'Services', href: '/stays/services' },
    { label: 'Deals', href: '/stays/deals' },
    { label: 'Reviews', href: '/stays/reviews' },
    { label: 'Settings', href: '/stays/settings' },
    { label: 'Analytics', href: '/stays/analytics' },
  ],
}
```

---

## Component 5: Payments Integration

### Architecture Decision: Stripe vs. Phase 1

**Recommendation: Phase payments in.** Rationale:

- MVP in SEA (Vietnam) where cash/bank transfer dominates
- Stripe is not available in Vietnam directly (requires Singapore entity)
- Start with: cash, bank transfer, crypto (via `@shared/payment`)
- Add Stripe later when expanding to markets where it is available

### Phase 1 Payment Flow (No Stripe)

```
Guest selects payment method on booking form:
  |
  |-- 'cash': status='confirmed', paymentStatus='unpaid', pay at check-in
  |-- 'bank_transfer': status='pending', show bank details, owner confirms manually
  |-- 'crypto': deep-link to crypto payment (via @shared/payment patterns)
  |
  v
Owner manages payment status in backoffice:
  PATCH /api/stays/bookings/{id} { paymentStatus: 'paid' }
```

### Phase 2 Payment Flow (Stripe, future)

```
Guest selects 'card' payment:
  |
  v
POST /api/booking/payment-intent
  |-- Create Stripe PaymentIntent
  |-- Return clientSecret
  |
  v
Guest completes payment (Stripe Elements)
  |
  v
Stripe webhook -> /api/webhooks/stripe
  |-- Update booking paymentStatus='paid'
  |-- Update booking status='confirmed' (if was pending)
  |-- Notify owner
```

### Reusing @shared/payment

```typescript
// In booking form component:
import {
  PaymentMethod,
  DEFAULT_PAYMENT_METHODS,
  formatPrice,
} from '@shared/payment';

// Filter available methods for accommodations
const availableMethods = DEFAULT_PAYMENT_METHODS.filter(
  (m) => ['cash', 'bank_transfer', 'crypto'].includes(m.id) && m.enabled
);
```

---

## Cross-App Communication

### How Booking Mode Links to In-Stay Mode

```
BOOKING MODE                    IN-STAY MODE
/{slug}                         /stay/{bookingCode}
                |                       ^
                |  booking created       |  QR scan at check-in
                |  returns BK-code       |
                v                       |
        Guest saves BK-code ---------> Guest scans QR
        Gets email/WhatsApp            (QR encodes /stay/BK-XXXXXX)
```

The two modes are **connected by the booking code** but are otherwise independent:

- Booking Mode is public, no auth, SEO-friendly
- In-Stay Mode requires JWT verification (existing flow)
- No shared client-side state between modes

### How Backoffice Connects to PWA

```
BACKOFFICE (apps/backoffice/)         ACCOMMODATIONS PWA (apps/accommodations/frontend/)
  |                                     |
  |-- Writes to accom_* tables          |-- Reads from accom_* tables
  |   (via Supabase Auth + RLS)         |   (via service role admin client)
  |                                     |
  |-- Owner updates booking status      |-- Guest sees updated status
  |-- Owner manages services            |-- Guest browses service catalog
  |-- Owner replies to reviews          |-- Guest sees review reply
  |                                     |
  SHARED: Supabase PostgreSQL (same DB, same tables)
```

Both apps share the same Supabase project. Data flows through the database, not through direct API calls between apps.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Mixing Auth Systems in One App

**What:** Putting owner Supabase Auth and guest JWT in the same Next.js app
**Why bad:** Middleware conflicts, cookie confusion, session management complexity
**Instead:** Owner dashboard in Backoffice (Supabase Auth), guest flows in PWA (JWT)

### Anti-Pattern 2: Real-Time for Everything

**What:** Using Supabase Realtime for booking notifications, order updates
**Why bad:** Adds WebSocket complexity, connection management, reconnection logic
**Instead:** Polling for non-critical updates. WhatsApp for time-sensitive notifications (owner gets a message, not a WebSocket push)

### Anti-Pattern 3: Over-Engineering the Calendar

**What:** Building a custom calendar component from scratch for availability management
**Why bad:** Calendar logic is notoriously complex (timezones, DST, date ranges)
**Instead:** Use a proven library (react-day-picker or date-fns for logic) + simple grid UI for availability visualization

### Anti-Pattern 4: Storing Prices as Floats

**What:** Using NUMERIC or REAL for prices
**Why bad:** Floating point math errors (0.1 + 0.2 !== 0.3)
**Instead:** Store as INTEGER (minor units). The existing `accom_service_items.price` already uses INTEGER. Follow this for all new price columns.

### Anti-Pattern 5: Public Booking Creating Authenticated-Only Records

**What:** Requiring Supabase Auth for booking creation (public guests do not have accounts)
**Why bad:** Guests should not need to create an account to book
**Instead:** Use the admin client (`getSupabaseAdmin()`) for booking creation in the API route, same as existing verify/lookup routes do. The API route validates input; the admin client writes to DB.

---

## Suggested Build Order

### Phase Dependency Graph

```
[1. DB Schema: pricing + availability + orders + reviews]
        |
        +-----------+-------------------+
        |           |                   |
        v           v                   v
[2. Public        [3. Service         [4. Owner Dashboard
 Property Page]    Ordering]            Foundation]
        |           |                   |
        v           |                   v
[5. Booking Flow]  |           [6. Booking Management]
        |           |                   |
        v           v                   v
[7. Payments     [8. Order          [9. Calendar +
 Phase 1]        Management]         Analytics]
                                        |
                                        v
                                [10. Reviews + Deals
                                     Management]
```

### Recommended Phase Grouping

**Phase 1: Database Foundation**

- Migration: Extend `accom_properties` with booking_mode, pricing columns
- Migration: Extend `accom_rooms` with base_price_per_night
- Migration: Create `accom_availability` table
- Migration: Extend `accom_bookings` with pricing/payment fields
- Migration: Create `accom_service_orders` + `accom_service_order_items`
- Migration: Create `accom_reviews`
- RLS policies for all new tables
- TypeScript types update in `lib/types.ts`

**Phase 2: Public Property Page**

- `/{slug}` route (Server Component for SEO)
- `GET /api/property/{slug}` route (public)
- `GET /api/property/{slug}/availability` route (public)
- Components: PropertyHero, PropertyInfo, AmenityGrid, RoomCard, DatePicker, PriceBreakdown, LocationMap
- No auth required -- fully public

**Phase 3: Booking Flow**

- `POST /api/booking` route (public, admin client writes)
- BookingForm component with guest info
- Payment method selector (cash/transfer/crypto via @shared/payment)
- BookingConfirmation page
- WhatsApp notification to owner
- Instant vs. inquiry booking mode handling

**Phase 4: Owner Dashboard Foundation (Backoffice)**

- Sidebar integration (add "Stays" section)
- `/stays` dashboard page with stats
- `/stays/bookings` with TanStack Table
- `/stays/bookings/{id}` detail + status management
- `/stays/rooms` CRUD
- `/stays/settings` (booking mode, pricing, policies)

**Phase 5: Service Ordering (Guest Side)**

- Modify ServicesCarousel to support add-to-cart
- ServiceOrderSheet (bottom sheet cart)
- `POST /api/stay/{code}/orders` route
- `GET /api/stay/{code}/orders` route
- OrderConfirmation + OrderHistory components
- WhatsApp notification to owner on new order

**Phase 6: Order + Calendar Management (Backoffice)**

- `/stays/services` CRUD for categories + items
- `/stays/calendar` availability calendar
- Service orders management (`/stays/orders` with status updates)
- Block/unblock dates

**Phase 7: Reviews + Deals + Analytics**

- `/stays/reviews` with reply functionality
- `/stays/deals` local partnerships CRUD
- `/stays/analytics` revenue charts

### Why This Order

1. **DB first** -- everything depends on the schema being right
2. **Public property page before booking** -- you need to display before you can convert
3. **Booking before owner dashboard** -- owner needs bookings to manage before the dashboard is useful
4. **Owner dashboard before service ordering** -- owner needs to see orders (foundation for order management)
5. **Service ordering after owner dashboard foundation** -- orders need a destination (owner sees them)
6. **Calendar + analytics last** -- these are management features, not core flow
7. **Reviews + deals last** -- nice-to-have, not blocking MVP guest flow

---

## Scalability Considerations

| Concern                 | At 10 properties          | At 100 properties                     | At 1000 properties                          |
| ----------------------- | ------------------------- | ------------------------------------- | ------------------------------------------- |
| Availability queries    | Simple date range query   | Index on (room_id, date) handles it   | Partition accom_availability by property_id |
| Booking code collisions | Statistically zero        | Still fine (30^6 = 729M combinations) | Still fine                                  |
| Image storage           | Supabase Storage          | Supabase Storage + CDN                | Consider dedicated CDN (Cloudflare R2)      |
| Search/discovery        | Not needed                | Simple city/type filter               | Full-text search + PostGIS for geo queries  |
| Multi-property owners   | Single property per owner | owner_id already supports multiple    | Add property switcher in backoffice UI      |

---

## Sources

- **HIGH confidence:** All patterns verified against existing codebase
  - Migration 077 (core schema), 079 (extensions), 080 (F&B integration), 081 (API alignment)
  - `apps/accommodations/frontend/` -- all source files examined
  - `apps/accommodations/PRD.md` v2.3 (product requirements)
  - `shared/payment/` (types.ts, utils.ts, index.ts)
  - `apps/backoffice/app/(dashboard)/partnerships/accommodations/page.tsx` (existing backoffice integration)
  - Supabase RLS pattern from migration 077 (verified working in production)
  - Guest JWT auth pattern from `lib/auth.ts` (verified working)
  - Service role admin client from `lib/supabase.ts` (verified pattern)
