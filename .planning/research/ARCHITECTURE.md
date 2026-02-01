# Architecture Patterns: Accommodations Extended Features

**Domain:** Accommodations vertical feature expansion (bug fixes + 38 new features)
**Researched:** 2026-02-01
**Confidence:** HIGH (based on direct codebase analysis, not external sources)

---

## 1. Existing Architecture Summary

The accommodations vertical has a mature, well-structured architecture after 15 migrations (077-091):

```
PWA (apps/accommodations/frontend/)        Backoffice (apps/backoffice/)
  |                                          |
  |  Room QR scan -> useRoomSession()        |  11 pages under
  |  Stay API (jose JWT, two-tier auth)      |  (dashboard)/accommodations/*
  |  22 components in /stay/*                |  11 API route groups under
  |  5 hooks, 8 lib modules                  |  /api/accommodations/*
  |                                          |
  +--------- shared/database/ --------------+
             migrations 077-091 (accom_ prefix)
             Supabase PostgreSQL + RLS
             SECURITY DEFINER functions
             Supabase Storage (guest-documents bucket)
```

**Established patterns (MUST follow for consistency):**

| Pattern                | Implementation                                        | Where                          |
| ---------------------- | ----------------------------------------------------- | ------------------------------ |
| Two-tier auth          | browse (room code) vs full (verified booking)         | useRoomSession, JWT accessTier |
| SECURITY DEFINER       | resolve_room_access(), verify_booking_access()        | anon-callable DB functions     |
| Service role mediation | Guest uploads through API routes, not direct Supabase | /api/stay/\* routes            |
| JWT via jose           | Custom tokens (NOT Supabase Auth) for guest sessions  | lib/auth.ts                    |
| accom\_ prefix         | All accommodations tables namespaced                  | migrations 077+                |
| Private storage        | guest-documents bucket, service_role only             | migration 091                  |
| Image processing       | HEIC conversion, compression, blur detection          | lib/image-utils.ts             |
| API client pattern     | fetchStayAPI/postStayAPI with FetchResult<T>          | lib/stay-api.ts                |
| Component card pattern | rounded-2xl border-[#E8E2D9] bg-white shadow-sm       | All stay/\* components         |

---

## 2. Reusable Module Assessment

### 2.1 QR Builder (apps/backoffice/lib/qr/)

**Files:** qr-types.ts (250 lines), qr-service.ts (382 lines), qr-generator.ts
**Reusability:** HIGH

**What it provides that accommodations needs:**

- `generateWiFiString()` -- produces `WIFI:T:WPA;S:ssid;P:pass;H:false;;` for WiFi QR codes
- `QRDesign` interface with colors, patterns, eye styles, logos
- `EXPORT_PRESETS` for materials (paper, sticker, tent-card, business-card)
- CRUD for qr_codes table with scan analytics

**What to reuse vs what to simplify:**

| Use Case                         | Approach                                                              | Why                                                         |
| -------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| WiFi QR on guest dashboard (PWA) | Import only `generateWiFiString()` + use `qrcode.react` for rendering | Full QR Builder is 200KB+, overkill for a static display QR |
| WiFi QR download in backoffice   | Use full QR Builder with material presets                             | Owner needs printable tent cards, stickers                  |
| Room QR codes in backoffice      | Already works via AccomQRGenerator                                    | Just update URL to room code format                         |

**Recommendation:** Extract `generateWiFiString()` and `WiFiConfig` type to `shared/qr/wifi.ts` as a lightweight export. Keep full QR Builder in backoffice.

### 2.2 B2B Conventions (apps/backoffice/lib/ai/conventions-service.ts)

**Files:** conventions-service.ts (1137 lines), migration 050
**Tables:** office_partners, merchant_office_outreach, partner_conventions, convention_vouchers, convention_redemptions
**Reusability:** MEDIUM

**Already supports accommodations:**

- `ConventionPartnerType` includes `'accommodation'`
- Voucher system is generic (code generation, validation, redemption tracking)
- Benefit types work for stays (percentage_discount, fixed_discount, special_price)

**Gaps for accommodations use case:**

1. Benefits are per-order, not per-night or per-stay
2. AI discovery is F&B-specific (offices with canteens)
3. Verification is POS-oriented, not booking-flow-oriented

**Adaptation needed:**

```sql
-- Add benefit scope to partner_conventions
ALTER TABLE partner_conventions
  ADD COLUMN IF NOT EXISTS benefit_scope TEXT DEFAULT 'per_order'
  CHECK (benefit_scope IN ('per_order', 'per_night', 'per_stay', 'flat'));

-- Accommodations uses: per_night (10% off each night) or per_stay (flat $20 off)
```

**Integration point:** When creating a booking with a voucher code:

1. Call existing `validate_voucher()` RPC
2. Calculate discount based on `benefit_scope` + stay duration
3. Apply to `accom_bookings.total_price`
4. Record in `convention_redemptions`

### 2.3 Feedback Intelligence (apps/backoffice/lib/ai/feedback-intelligence-service.ts)

**Files:** feedback-intelligence-service.ts, migration 082
**Tables:** fb_submissions, fb_tasks, fb_task_links, fb_notifications
**Reusability:** LOW (tag taxonomy is F&B-specific)

**What IS reusable (the AI processing pipeline pattern):**

- OpenAI call to translate, classify, extract sentiment, assign tags
- Task aggregation (group similar feedback into actionable tasks)
- Notification system (alert owner about new feedback)

**What is NOT reusable:**

- `FEEDBACK_TAGS` array (menu, food-quality, portion-size, etc.) -- entirely F&B
- `fb_submissions.source` types (manual, chat, email) -- guests submit differently
- `fb_submissions.submitted_by_account_id` -- guests don't have accounts

**Recommendation:** Fork the processing function, NOT the table. Create `accom_guest_feedback` with accommodations-specific fields and a new tag taxonomy:

```typescript
const ACCOM_FEEDBACK_TAGS = [
  'cleanliness',
  'check-in',
  'check-out',
  'location',
  'noise',
  'wifi-quality',
  'bed-comfort',
  'bathroom',
  'amenities',
  'kitchen',
  'air-conditioning',
  'hot-water',
  'parking',
  'security',
  'host-response',
  'value-for-money',
  'photos-accuracy',
  'neighborhood',
  'view',
  'breakfast',
  'minibar',
  'laundry',
  'room-service',
  'local-deals',
] as const;
```

### 2.4 Order Timing Analytics (migrations 074-076)

**Reusability:** NONE for accommodations. This tracks kitchen prep times, order-to-delivery metrics. Not applicable to accommodation services.

---

## 3. Feature Architecture (New Components)

### 3.1 Gantt/Timeline View for Room Availability

**Current state:** Calendar page already has `AvailabilityCalendar`, `CalendarDetailPanel`, `SeasonalPricingManager`, `DiscountSettings`. Data layer returns bookings + blocks + pricing for date ranges.

**Architecture decision: UI-only change, no API/DB modifications.**

```
New component: GanttCalendar.tsx
  Location: apps/backoffice/components/accommodations/

  Layout:
  +--Room Names--+---Jan 28---+---Jan 29---+---Jan 30---+---Jan 31---+
  | Room 101     | [===Sarah Johnson===]    |            |            |
  | Room 203     |            | [====Marco Rossi========]|            |
  | Room 305     | [BLOCKED - Maintenance]  | [===New Guest===]       |
  +              +            +            +            +            +

  Implementation:
  - CSS Grid: rooms as rows, dates as columns
  - Booking bars: absolute-positioned divs spanning date columns
  - Color coding: confirmed=teal, checked_in=green, blocked=gray-hatched
  - Click bar -> CalendarDetailPanel (reuse existing)
  - Horizontal scroll with date header pinned
```

**Why NOT an external Gantt library:** The data model is simple (start date, end date, room). No task dependencies, no resource leveling, no critical path. A Gantt library (dhtmlx-gantt, frappe-gantt) adds 200KB+ for features we don't need.

**Data source:** Existing `/api/accommodations/calendar` endpoint. No changes needed.

### 3.2 Minibar System

**Architecture decision: Minibar IS a service category, not a separate system.**

The existing service ordering pipeline handles this completely:

```
accom_service_categories (e.g., "Minibar")
  └── accom_service_items (e.g., "Water 500ml $1", "Local Beer $3")
      └── Orders via ServicesCarousel -> useServiceCart -> CartDrawer -> API

Migration 086 already added: automation_level column
  - 'requires_confirmation' (Breakfast, Laundry)
  - 'self_service' (Minibar - guest takes item, order is for billing)
  - 'manual_fulfillment' (Special requests)
```

**Only UI changes needed:**

1. Add "Self-Service" badge to minibar category header in `ServicesCarousel`
2. Skip confirmation-wait state in `ActiveOrders` for self_service items
3. Add minibar-specific onboarding prompt in backoffice ("Add your minibar items")

### 3.3 Guest Feedback System

**New table + new PWA component + forked AI pipeline:**

```sql
CREATE TABLE accom_guest_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,

    -- Ratings
    overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    category_ratings JSONB DEFAULT '{}',
    -- { cleanliness: 4, location: 5, value: 3, communication: 5, check_in: 4 }

    -- Free text
    comment TEXT,
    detected_language TEXT,
    translated_comment TEXT,

    -- AI-processed
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    tags TEXT[] DEFAULT '{}',
    ai_confidence DECIMAL(3,2),

    -- Processing state
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'published', 'hidden')),
    processed_at TIMESTAMPTZ,

    -- Metadata
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Component architecture:**

```
PWA (guest-facing):
  FeedbackPrompt.tsx        -- Banner shown 1 day before checkout
  FeedbackForm.tsx          -- Star ratings + categories + free text
  /api/stay/feedback/route.ts  -- POST, requires full tier JWT

Backoffice (owner-facing):
  /accommodations/feedback/page.tsx  -- TanStack Table with filters
  FeedbackDetailPanel.tsx            -- Individual feedback view
  FeedbackStatsCard.tsx              -- Average ratings, trends
```

**AI pipeline (forked from feedback-intelligence-service.ts):**

- Same pattern: OpenAI call with translate + classify + tag
- Different prompt: accommodations-focused tag extraction
- Different tag taxonomy: ACCOM_FEEDBACK_TAGS (see 2.3)
- Triggered async after guest submits

### 3.4 Convention/Voucher Adaptation

**Minimal changes to existing system:**

1. Add `benefit_scope` column (see 2.2)
2. New accommodations-specific API route: `/api/booking/validate-voucher`
3. Booking flow integration: voucher code field on booking form
4. Discount calculation based on scope + stay duration

**No new tables needed.** The existing convention_vouchers and convention_redemptions tables work as-is.

### 3.5 Property Image Upload

**New table + new storage bucket + backoffice component:**

```sql
-- New PUBLIC bucket (unlike private guest-documents)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('property-images', 'property-images', true, 2097152,
        '{"image/jpeg","image/png","image/webp"}');

CREATE TABLE accom_property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    room_id UUID REFERENCES accom_rooms(id) ON DELETE CASCADE, -- null = property-level
    storage_path TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    alt_text TEXT,
    is_cover BOOLEAN DEFAULT false,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Key distinction from guest documents:**

| Aspect      | Property Images             | Guest Documents                   |
| ----------- | --------------------------- | --------------------------------- |
| Bucket      | property-images (PUBLIC)    | guest-documents (PRIVATE)         |
| Uploaded by | Owner (authenticated)       | Guest (JWT + service role)        |
| Visible to  | Everyone (booking page)     | Owner only                        |
| Retention   | Permanent                   | GDPR auto-delete after checkout   |
| Processing  | Compress to 2MB, strip EXIF | Compress to 0.5MB, blur detection |

**Reuse from image-utils.ts:** The compression pipeline. Fork with different settings (2MB max, 2560px instead of 2048px for higher quality property photos).

### 3.6 Homepage Redesign (Card-Based Dashboard)

**Architecture decision: Wrap existing components in configurable grid, don't rebuild them.**

```typescript
// Owner-configurable layout stored on property
// accom_properties.dashboard_layout JSONB DEFAULT '{}'

interface DashboardLayout {
  sections: DashboardSection[];
}

interface DashboardSection {
  type:
    | 'wifi'
    | 'stay_summary'
    | 'services'
    | 'orders'
    | 'deals'
    | 'contact'
    | 'checkout'
    | 'documents'
    | 'feedback'
    | 'useful_numbers';
  visible: boolean;
  // No drag-and-drop ordering for v1. Fixed default order.
  // Add priority/ordering only if owners request it.
}
```

**Implementation:**

```tsx
// DashboardGrid.tsx -- new wrapper component
function DashboardGrid({ layout, children }) {
  // Filter children based on layout.sections[x].visible
  // Render in fixed order (WiFi always first, checkout always near bottom)
  // Each child wrapped in consistent card container
}

// RoomDashboard page.tsx -- minimal changes
// Replace current vertical stack with:
<DashboardGrid layout={stay.property.dashboardLayout}>
  <WifiCard wifi={wifi} />        {/* type: 'wifi' */}
  <ServicesCarousel ... />         {/* type: 'services' */}
  <ActiveOrders ... />             {/* type: 'orders' */}
  <CheckoutInfo ... />             {/* type: 'checkout' */}
  {/* etc */}
</DashboardGrid>
```

**Backwards compatible:** Empty `dashboard_layout` = show all sections in current default order.

### 3.7 WiFi QR Code

**Add to existing WifiCard component:**

```tsx
// WifiCard.tsx modification
import QRCode from 'qrcode.react';  // ~3KB, client-side only
import { generateWiFiString } from '@shared/qr/wifi'; // extracted from backoffice

// Inside WifiCard, below existing SSID/password display:
const wifiQR = generateWiFiString({
  ssid: wifi.network,
  password: wifi.password,
  security: 'WPA',
});

<QRCode value={wifiQR} size={120} className="mx-auto mt-3" />
<p className="text-xs text-center text-[#8B7355] mt-1">
  Scan to connect automatically
</p>
```

**For backoffice (printable WiFi QR):** Add "Download WiFi QR" button on settings page that opens the full QR Builder modal with material presets.

### 3.8 Onboarding Wizard

**Data model: JSONB on existing table, not a separate table.**

```sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS onboarding_progress JSONB DEFAULT '{}';

-- Progress structure:
-- {
--   "basic_info": true,
--   "photos_uploaded": false,    (at least 3 photos)
--   "rooms_created": false,      (at least 1 room)
--   "wifi_configured": false,    (wifi_ssid set)
--   "services_added": false,     (at least 1 service category)
--   "contact_set": false         (phone or whatsapp set)
-- }
```

**Component architecture:**

```
apps/backoffice/components/accommodations/onboarding/
  OnboardingWizard.tsx       -- Full wizard (step-by-step)
  OnboardingBanner.tsx       -- Dashboard banner ("3 of 6 steps done")
  steps/
    BasicInfoStep.tsx        -- Property name, type, description
    PhotoUploadStep.tsx      -- Drag & drop (uses PropertyImageManager)
    RoomSetupStep.tsx        -- Add rooms (wraps existing room CRUD)
    WifiStep.tsx             -- SSID + password
    ServicesStep.tsx          -- Add categories (wraps ServiceCatalogManager)
    ContactStep.tsx          -- Phone/WhatsApp
    CompletionStep.tsx       -- Generate QR codes, share booking link
```

**Key principle:** Each wizard step wraps or links to existing management components. The wizard is a guided flow, NOT a duplicate of existing CRUD.

---

## 4. Data Flow Changes

### Current Flows (Unchanged)

```
Guest QR Scan -> resolve_room_access(room_code)
  -> Returns property + room + booking info
  -> JWT issued (browse or full tier)
  -> All API calls use JWT via stay-api.ts
```

### New Flows

**Guest Feedback (near checkout):**

```
Guest dashboard detects checkout in 1 day -> FeedbackPrompt banner
  -> Guest taps "Leave Review"
  -> FeedbackForm renders (stars + categories + text)
  -> POST /api/stay/feedback (full tier JWT required)
  -> Insert into accom_guest_feedback (status: 'pending')
  -> Async: AI processing (translate, classify, tag)
  -> Update accom_guest_feedback (status: 'processed')
  -> Owner sees in backoffice /accommodations/feedback
```

**Property Image Upload (owner):**

```
Owner in backoffice -> PropertyImageManager
  -> Drag & drop or file picker
  -> Client: compress via forked image-utils (2MB, 2560px)
  -> POST /api/accommodations/images (multipart, service_role auth)
  -> Server: upload to 'property-images' bucket
  -> Insert metadata into accom_property_images
  -> PWA reads public URL for property gallery
```

**Voucher at Booking Time:**

```
Guest on booking page -> enters voucher code in booking form
  -> POST /api/booking/validate-voucher { code, propertyId, nights }
  -> Server: supabase.rpc('validate_voucher', { p_voucher_code, p_merchant_id })
  -> If valid: calculate discount based on benefit_scope + nights
  -> Return { valid: true, discount: 45, description: "15% off 3 nights" }
  -> Guest sees updated price breakdown
  -> On booking submission: create redemption record
```

---

## 5. Suggested Build Order (Dependency-Driven)

### Phase 1: Bug Fixes + Image Foundation

**Rationale:** Fix 13 identified bugs before adding features. Establish image upload pattern needed by onboarding wizard and booking page.

- All bug fixes from manual testing
- `accom_property_images` table + `property-images` storage bucket
- PropertyImageManager backoffice component
- Image compression fork for property photos

**Dependencies:** None
**Enables:** Phase 2 (onboarding needs photo upload), Phase 4 (booking page needs gallery)

### Phase 2: Owner Dashboard Enhancements

**Rationale:** Owner tools that don't touch guest PWA. Can be tested independently.

- Gantt calendar view (new component, existing API)
- Onboarding wizard (wraps existing CRUD + new photo upload)
- `onboarding_progress` JSONB column
- Settings improvements

**Dependencies:** Phase 1 (photo upload for onboarding)
**Enables:** Phase 5 (onboarding sets up services needed for minibar)

### Phase 3: Guest Dashboard Redesign

**Rationale:** Restructure the dashboard before adding new cards (feedback, minibar).

- DashboardGrid wrapper component
- `dashboard_layout` JSONB column on properties
- WiFi QR code on WifiCard (extract shared QR util)
- Card-based layout with show/hide configuration
- Homepage visual refresh

**Dependencies:** None (parallel with Phase 2)
**Enables:** Phase 4 (new cards integrate into grid)

### Phase 4: Service Expansion + Feedback

**Rationale:** Extends guest experience with new service types and post-stay feedback.

- Minibar as service category (UI tweaks for self_service automation)
- Digital laundry form (garment selection UI extending service ordering)
- Guest feedback system (table + AI pipeline + PWA form + backoffice page)
- `accom_guest_feedback` table + processing pipeline

**Dependencies:** Phase 3 (feedback card in dashboard grid)
**Enables:** Phase 5 (feedback data helps sell partnerships)

### Phase 5: Partnerships & Revenue

**Rationale:** Revenue features that depend on stable booking flow and guest experience.

- Convention/voucher adaptation (`benefit_scope` column)
- Voucher validation in booking flow
- Local deals enhancement
- Partner referral tracking improvements

**Dependencies:** Phase 1 (bug-free booking flow), Phase 4 (feedback drives partnership value)

### Phase 6: Polish & Analytics

- Analytics dashboard improvements
- Owner reports (occupancy, revenue, feedback trends)
- Performance optimization (image lazy loading, bundle splitting)

---

## 6. Anti-Patterns to Avoid

### Anti-Pattern 1: Separate Minibar System

**What:** Building dedicated minibar tables, API routes, and components.
**Why bad:** Duplicates the entire service ordering pipeline. Two codepaths to maintain, test, and debug.
**Instead:** Add minibar as a service category with `automation_level: 'self_service'`. Only UI needs tweaks.

### Anti-Pattern 2: Heavy Gantt Library

**What:** Installing dhtmlx-gantt, frappe-gantt, or similar for room availability.
**Why bad:** 200KB+ for a feature that needs: rows (rooms), horizontal bars (bookings), date scrolling. No task dependencies, no critical path, no resource leveling.
**Instead:** CSS Grid with absolute-positioned bars. Under 200 lines of code.

### Anti-Pattern 3: Direct Storage Upload from PWA

**What:** Using Supabase JS client in guest browser to upload to storage.
**Why bad:** Requires anon storage policies (security risk). Guests don't have Supabase Auth sessions.
**Instead:** Upload through API route with service_role client. Pattern already established in document upload.

### Anti-Pattern 4: Full QR Builder for WiFi Display

**What:** Importing the entire QR Builder (types, service, generator, modal) into the PWA for the WiFi QR.
**Why bad:** Pulls in Supabase client, design customization, material presets -- none needed for a static display QR.
**Instead:** Extract `generateWiFiString()` to shared util. Use `qrcode.react` (3KB) for rendering.

### Anti-Pattern 5: Drag-and-Drop Dashboard Builder

**What:** Building a full layout editor with drag-and-drop card reordering.
**Why bad:** Owners are small property managers, not web designers. They want "show/hide" toggles, not layout configuration.
**Instead:** Fixed layout with visibility toggles. Add reordering only if explicitly requested.

### Anti-Pattern 6: Separate Feedback Table Per Vertical

**What:** `accom_guest_feedback`, `fnb_feedback`, `wellness_feedback`.
**Why bad:** Schema diverges. Eventually all verticals need the same fields.
**Instead:** Design `accom_guest_feedback` with a `vertical` TEXT column from day 1. When other verticals adopt feedback, the schema generalizes with minimal changes.

---

## 7. Migration Strategy

All new migrations follow established conventions:

| Convention       | Value                                                         |
| ---------------- | ------------------------------------------------------------- |
| Table prefix     | `accom_`                                                      |
| Primary key      | `UUID PRIMARY KEY DEFAULT gen_random_uuid()`                  |
| Timestamps       | `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at` |
| RLS              | ENABLE on all tables, service_role full access policy         |
| Text constraints | `CHECK (column IN ('value1', 'value2'))` not ENUM             |
| Naming           | `{number}-{description}.sql`                                  |
| Current max      | 091 (guest-documents)                                         |

**Estimated new migrations:**

| Number | Name                     | Purpose                                              |
| ------ | ------------------------ | ---------------------------------------------------- |
| 092    | property-images          | accom_property_images table + property-images bucket |
| 093    | onboarding-progress      | onboarding_completed_at + onboarding_progress JSONB  |
| 094    | guest-feedback           | accom_guest_feedback table + indexes + RLS           |
| 095    | dashboard-layout         | dashboard_layout JSONB on accom_properties           |
| 096    | convention-benefit-scope | benefit_scope column on partner_conventions          |

---

## 8. Integration Points Summary

| Feature           | Reuses Existing                                              | New Components                                | New DB Objects                                |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------- |
| Gantt calendar    | /api/accommodations/calendar, CalendarDetailPanel            | GanttCalendar.tsx                             | None                                          |
| Minibar           | Service ordering pipeline (categories, items, cart, orders)  | UI tweaks only                                | None                                          |
| Guest feedback    | AI processing pattern, notification pattern                  | FeedbackForm, FeedbackPrompt, backoffice page | accom_guest_feedback table                    |
| Conventions       | partner_conventions, convention_vouchers, validate_voucher() | Voucher field in booking form                 | benefit_scope column                          |
| Image upload      | image-utils.ts compression, storage pattern                  | PropertyImageManager                          | accom_property_images, property-images bucket |
| Homepage redesign | All existing stay/\* card components                         | DashboardGrid wrapper                         | dashboard_layout JSONB                        |
| WiFi QR           | generateWiFiString() from QR Builder                         | QR display in WifiCard                        | None                                          |
| Onboarding wizard | Existing CRUD components (rooms, services, settings)         | OnboardingWizard + steps                      | onboarding_progress JSONB                     |

---

## Sources

All findings based on direct codebase analysis (HIGH confidence):

- `apps/accommodations/frontend/` -- 22 stay components, 5 hooks, 8 lib modules, 10+ API routes
- `apps/backoffice/app/(dashboard)/accommodations/` -- 11 pages (analytics, bookings, calendar, deals, documents, orders, qr-codes, rooms, security, services, settings)
- `apps/backoffice/lib/qr/` -- QR Builder (qr-types.ts 250 lines, qr-service.ts 382 lines)
- `apps/backoffice/lib/ai/conventions-service.ts` -- B2B conventions (1137 lines, 6 DB tables)
- `apps/backoffice/lib/ai/feedback-intelligence-service.ts` -- Feedback pipeline (AI translate+classify+tag)
- `shared/database/migrations/schema/077-091` -- 15 accommodations migrations
- `apps/accommodations/frontend/lib/image-utils.ts` -- HEIC conversion, compression, blur detection
- `apps/accommodations/PRD.md` v2.3 -- Product requirements including minibar, laundry form, visa tracking
