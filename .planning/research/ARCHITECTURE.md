# Architecture: Frictionless QR Room Access

**Project:** Accommodations PWA - Room-Based Access with Two-Tier Auth
**Researched:** 2026-01-31
**Confidence:** HIGH (based on direct codebase analysis of all existing components)

---

## 1. Current Architecture (As-Is)

### Entry Flow

```
Guest arrives -> Finds QR in room
  -> QR points to: stays.gudbro.com/checkin/{propertyId}/{roomId}
  -> Guest enters booking code on check-in page
  -> Redirects to: /stay/{booking-code}
  -> Verification screen: booking code + last name
  -> POST /api/stay/verify -> JWT issued
  -> Dashboard renders with JWT-authenticated API calls
```

### Current Auth Chain

```
[Guest] -> POST /api/stay/verify (bookingCode + lastName)
        -> verify_booking_access() [SECURITY DEFINER]
        -> Validates: code + lastName + dates + status
        -> Returns: bookingId, propertyId, roomId
        -> signGuestToken() -> JWT {bookingId, propertyId, checkoutDate}
        -> JWT stored in localStorage (gudbro_stay_token)
        -> All subsequent API calls: Authorization: Bearer {JWT}
```

### Current Component Map

| Layer      | Component                         | Location                                      |
| ---------- | --------------------------------- | --------------------------------------------- |
| Route      | `/stay/[code]/page.tsx`           | Single entry point, requires auth             |
| Route      | `/api/stay/[code]`                | Public booking lookup (minimal info)          |
| Route      | `/api/stay/verify`                | Auth endpoint -> JWT                          |
| Route      | `/api/stay/[code]/services`       | Authenticated, fetches categories+items       |
| Route      | `/api/stay/[code]/orders`         | Authenticated, GET list + POST create         |
| Route      | `/api/stay/[code]/deals`          | Authenticated, local partner deals            |
| Route      | `/api/stay/[code]/property`       | Authenticated, extended property info         |
| Route      | `/api/stay/[code]/useful-numbers` | Authenticated, emergency/city numbers         |
| Hook       | `useStaySession`                  | JWT lifecycle: store, restore, verify, logout |
| Hook       | `useServiceCart`                  | Cart state (survives tab navigation)          |
| Hook       | `useOrderPolling`                 | Poll for order status updates                 |
| Lib        | `lib/auth.ts`                     | `signGuestToken` / `verifyGuestToken` (jose)  |
| Lib        | `lib/stay-api.ts`                 | All API call wrappers with Bearer auth        |
| Backoffice | `AccomQRGenerator`                | Generates QRs: property + per-room            |

### Current QR URLs

| QR Type  | URL Pattern                                      | Behavior                           |
| -------- | ------------------------------------------------ | ---------------------------------- |
| Property | `stays.gudbro.com/{slug}`                        | Property booking page              |
| Room     | `stays.gudbro.com/checkin/{propertyId}/{roomId}` | Check-in page (enter booking code) |

### Current Database Tables (Relevant)

| Table                       | Key Columns                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `accom_properties`          | id, slug, wifi_network, wifi_password, owner_id, access_settings (TBD)                                     |
| `accom_rooms`               | id, property_id, room_number, room_type, capacity, floor, is_active                                        |
| `accom_bookings`            | id, property_id, room_id, booking_code, guest_name, guest_last_name, check_in_date, check_out_date, status |
| `accom_service_orders`      | id, booking_id, property_id, status, total                                                                 |
| `accom_service_order_items` | id, order_id, service_item_id, name, quantity, unit_price, total                                           |

### Current JWT Payload

```typescript
interface GuestTokenPayload {
  bookingId: string;
  propertyId: string;
  checkoutDate: string;
}
```

### Key Architectural Constraints

1. **Auth model:** Two separate systems -- Guest JWT (jose, custom) vs Owner Supabase Auth
2. **API pattern:** `getSupabaseAdmin()` (service role, bypasses RLS), manual auth per-route
3. **No middleware:** Auth checks happen inside each API route handler
4. **Price storage:** INTEGER (minor units)
5. **Two deployment targets:** Accommodations PWA and Backoffice are separate Next.js apps sharing one Supabase DB

---

## 2. Target Architecture (To-Be)

### Core Principle: Additive, Not Replacement

The room-based access is a NEW entry point layered on top of the existing booking-code access. Both must work simultaneously:

```
ENTRY POINTS (coexist):
  /stay/{booking-code}     <-- Existing. Pre-arrival link, email, etc.
  /stay/room/{room-code}   <-- NEW. Physical QR in room.

Both eventually render the same dashboard components.
The difference is HOW they authenticate, not WHAT they show.
```

### New Entry Flow: Two-Tier Access

```
Guest scans QR in room -> /stay/room/{room-code}
  -> GET /api/stay/room/{room-code}
  -> Server: resolve_room_access(room-code)
  -> Returns: room info, property info, WiFi, booking status

  TIER 1 - ANONYMOUS BROWSING (no verification):
  -> WiFi credentials displayed immediately
  -> Property info, house rules, checkout time
  -> Service catalog (browse only)
  -> Local deals (view only)
  -> Useful numbers

  TIER 2 - AUTHENTICATED ACTIONS (verification required):
  -> Guest taps "Order" or any paid action
  -> InlineVerification component appears
  -> Guest enters last name (configurable per property)
  -> POST /api/stay/room/{room-code}/verify
  -> Full JWT issued
  -> Order proceeds via existing /api/stay/[code]/orders
```

---

## 3. Component Changes

### 3.1 New Components

| Component                                   | Type         | Purpose                                        |
| ------------------------------------------- | ------------ | ---------------------------------------------- |
| `/stay/room/[roomCode]/page.tsx`            | Page route   | New entry point for room-based access          |
| `/api/stay/room/[roomCode]/route.ts`        | API route    | Resolve room code -> tier-1 data + browse JWT  |
| `/api/stay/room/[roomCode]/verify/route.ts` | API route    | Lightweight verification -> tier-2 JWT         |
| `useRoomSession` hook                       | Client hook  | Two-tier session management (none/browse/full) |
| `InlineVerification` component              | UI component | Triggered when guest tries a paid action       |
| `accom_guest_documents` table               | Database     | Document upload + visa tracking                |

### 3.2 Modified Components

| Component                            | Change                                               | Reason                            |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------- |
| `lib/auth.ts`                        | Add `accessTier` and `roomId` to `GuestTokenPayload` | Two-tier JWT support              |
| `lib/auth.ts`                        | Add `signRoomToken()` for tier-1 browse tokens       | Short-lived browse tokens         |
| `AccomQRGenerator` (backoffice)      | Generate room-code URLs instead of checkin URLs      | New URL pattern                   |
| `accom_rooms` table                  | Add `room_code` column (TEXT UNIQUE)                 | Permanent room identifier         |
| `accom_properties` table             | Add `access_settings` JSONB                          | Per-property security config      |
| `accom_properties` table             | Add `wifi_zones` JSONB                               | Multi-zone WiFi support           |
| `accom_rooms` table                  | Add `wifi_ssid`, `wifi_password` columns             | Per-room WiFi override            |
| All `/api/stay/[code]/*` read routes | Accept both browse and full tier JWTs                | Read routes work for tier-1       |
| `/api/stay/[code]/orders` POST       | Enforce tier-2 (full) JWT                            | Write routes require verification |

### 3.3 Unchanged Components (Reuse As-Is)

| Component                                     | Why Unchanged                        |
| --------------------------------------------- | ------------------------------------ |
| `WifiCard`, `WelcomeCard`, `CheckoutInfo`     | Pure display, receive props          |
| `ServicesCarousel`, `ServiceCatalog`          | Already receive token as prop        |
| `CartDrawer`, `CartFAB`                       | Cart logic unchanged                 |
| `ActiveOrders`, `LocalDeals`, `UsefulNumbers` | Already receive bookingCode+token    |
| `BottomNav`, `DashboardHeader`                | Pure layout                          |
| `useServiceCart`                              | Client-side cart, no auth dependency |
| `useOrderPolling`                             | Works with any valid token           |

---

## 4. New Data Models

### 4.1 Room Code Design

**Recommendation:** Short, permanent, human-readable codes on `accom_rooms`.

```sql
ALTER TABLE accom_rooms
  ADD COLUMN room_code TEXT UNIQUE;

-- Format: {property-short-code}-{room-number}
-- Examples: BVA-203, MV-101, ZEN-A5
-- Stable across bookings (unlike booking codes which change per guest)
-- Human-readable for support calls
```

**Why not UUID or rotating codes:**

- QR is physically printed in the room. Rotation means reprinting all QRs.
- UUID in URL is ugly and hard to communicate in support scenarios.
- Security comes from the verification step (tier-2), not code obscurity.
- Room code alone grants tier-1 only (WiFi + browsing). No sensitive data exposed.

**Generation strategy:**

- Owner sets a property short code (3-5 chars) during property setup
- Room codes auto-generated: `{short_code}-{room_number}`
- Must be globally unique (UNIQUE constraint enforced at DB level)
- Fallback: append numeric suffix on collision

**New DB function for auto-generation:**

```sql
CREATE OR REPLACE FUNCTION generate_room_code(p_property_id UUID, p_room_number TEXT)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  short_code TEXT;
  candidate TEXT;
  suffix INTEGER := 0;
BEGIN
  -- Get property short code (first 3-5 chars of slug, uppercased)
  SELECT UPPER(LEFT(slug, LEAST(LENGTH(slug), 4)))
  INTO short_code
  FROM accom_properties WHERE id = p_property_id;

  candidate := short_code || '-' || UPPER(p_room_number);

  -- Check uniqueness, append suffix if needed
  WHILE EXISTS(SELECT 1 FROM accom_rooms WHERE room_code = candidate) LOOP
    suffix := suffix + 1;
    candidate := short_code || '-' || UPPER(p_room_number) || suffix::TEXT;
  END LOOP;

  RETURN candidate;
END;
$$;
```

### 4.2 Room-to-Booking Resolution Function

**New SECURITY DEFINER function:**

```sql
CREATE OR REPLACE FUNCTION resolve_room_access(p_room_code TEXT)
RETURNS TABLE(
  room_id UUID,
  property_id UUID,
  room_number TEXT,
  room_type TEXT,
  floor TEXT,
  has_active_booking BOOLEAN,
  booking_id UUID,
  booking_code TEXT,
  guest_name TEXT,
  guest_last_name TEXT,
  guest_count INTEGER,
  check_in DATE,
  check_out DATE,
  booking_status TEXT,
  wifi_network TEXT,
  wifi_password TEXT,
  property_name TEXT,
  property_slug TEXT,
  property_type TEXT,
  contact_phone TEXT,
  contact_whatsapp TEXT,
  checkout_time TIME,
  access_settings JSONB
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id AS room_id,
    r.property_id,
    r.room_number,
    r.room_type,
    r.floor,
    (b.id IS NOT NULL)::BOOLEAN AS has_active_booking,
    b.id AS booking_id,
    b.booking_code,
    b.guest_name,
    b.guest_last_name,
    b.guest_count,
    b.check_in_date AS check_in,
    b.check_out_date AS check_out,
    b.status AS booking_status,
    -- WiFi: prefer room-specific, fallback to property
    COALESCE(r.wifi_ssid, p.wifi_network) AS wifi_network,
    COALESCE(r.wifi_password, p.wifi_password) AS wifi_password,
    p.name AS property_name,
    p.slug AS property_slug,
    p.type AS property_type,
    p.contact_phone,
    p.contact_whatsapp,
    p.checkout_time,
    p.access_settings
  FROM accom_rooms r
  JOIN accom_properties p ON p.id = r.property_id
  LEFT JOIN accom_bookings b ON b.room_id = r.id
    AND b.check_in_date <= CURRENT_DATE
    AND b.check_out_date + INTERVAL '24 hours' >= NOW()
    AND b.status IN ('confirmed', 'checked_in')
  WHERE r.room_code = p_room_code
    AND r.is_active = true
    AND p.is_active = true;
END;
$$;
```

**Key design decisions:**

- LEFT JOIN on bookings: room exists even without active booking (shows property info + WiFi)
- Same date/status logic as existing `verify_booking_access` for consistency
- Returns WiFi immediately (tier-1 data, no auth needed)
- Returns `has_active_booking` flag to drive UI behavior
- Returns `access_settings` so API can decide what tier-1 allows
- WiFi resolution: room-specific overrides property-level (COALESCE)

### 4.3 Two-Tier JWT Design

**Extended token payload:**

```typescript
interface GuestTokenPayload {
  bookingId: string; // From existing (null for tier-1 without booking)
  propertyId: string; // From existing
  checkoutDate: string; // From existing (null for tier-1 without booking)
  roomId?: string; // NEW: room context
  accessTier: 'browse' | 'full'; // NEW: what actions are allowed
}
```

**Tier-1 token (browse):**

- Issued immediately on room code scan (no verification)
- Contains: propertyId, roomId, accessTier='browse'
- bookingId included if active booking exists (read-only context)
- Expires: 24 hours (short-lived, re-issued on next scan)
- Grants: read-only access to property data, services catalog, deals, numbers, WiFi

**Tier-2 token (full):**

- Issued after verification (last name or configurable method)
- Contains: all fields including bookingId, accessTier='full'
- Expires: checkout date + 24h (same as current behavior)
- Grants: everything tier-1 has + ordering, document upload, etc.

**Implementation in `lib/auth.ts`:**

```typescript
// New function alongside existing signGuestToken
export async function signRoomBrowseToken(payload: {
  propertyId: string;
  roomId: string;
  bookingId?: string;
  checkoutDate?: string;
}): Promise<string> {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  return new SignJWT({
    propertyId: payload.propertyId,
    roomId: payload.roomId,
    bookingId: payload.bookingId || null,
    checkoutDate: payload.checkoutDate || null,
    accessTier: 'browse',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getSecret());
}

// Extend existing signGuestToken to include accessTier and roomId
export async function signGuestToken(payload: {
  bookingId: string;
  propertyId: string;
  checkoutDate: string;
  roomId?: string;
}): Promise<string> {
  const checkoutDate = new Date(payload.checkoutDate);
  const expiresAt = addHours(checkoutDate, 24);

  return new SignJWT({
    bookingId: payload.bookingId,
    propertyId: payload.propertyId,
    checkoutDate: payload.checkoutDate,
    roomId: payload.roomId || null,
    accessTier: 'full',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getSecret());
}
```

**API route enforcement pattern:**

```typescript
// Shared auth helper for all routes
interface AuthOptions {
  requireTier?: 'browse' | 'full'; // default: 'browse'
}

async function authenticateGuest(
  request: NextRequest,
  options: AuthOptions = {}
): Promise<GuestTokenPayload | { error: string; status: number }> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'session_expired', status: 401 };
  }

  const token = authHeader.slice(7);
  try {
    const payload = await verifyGuestToken(token);
    const required = options.requireTier || 'browse';

    if (required === 'full' && payload.accessTier !== 'full') {
      return { error: 'verification_required', status: 403 };
    }

    return payload;
  } catch {
    return { error: 'session_expired', status: 401 };
  }
}
```

### 4.4 Owner-Configurable Security Settings

**New JSONB column on `accom_properties`:**

```sql
ALTER TABLE accom_properties
  ADD COLUMN access_settings JSONB NOT NULL DEFAULT '{
    "browse_requires_verification": false,
    "order_requires_verification": true,
    "verification_method": "last_name",
    "wifi_visible_without_booking": true,
    "auto_checkin_on_verify": true
  }'::jsonb;
```

**TypeScript interface:**

```typescript
interface AccessSettings {
  // Tier-1 browsing behavior
  browse_requires_verification: boolean; // false = scan QR, see everything
  wifi_visible_without_booking: boolean; // true = WiFi shown even if no booking

  // Tier-2 verification behavior
  order_requires_verification: boolean; // true = must verify before ordering
  verification_method: 'last_name' | 'pin' | 'room_number' | 'none';

  // Side effects
  auto_checkin_on_verify: boolean; // true = set booking status to checked_in
}
```

**Property type defaults (applied on property creation):**

| Property Type   | Browse Requires Verify | Order Requires Verify | Verification Method | WiFi Without Booking |
| --------------- | ---------------------- | --------------------- | ------------------- | -------------------- |
| Hostel/Dorm     | false                  | true                  | last_name           | true                 |
| Hotel           | false                  | true                  | last_name           | true                 |
| Villa/Apartment | false                  | false                 | none                | true                 |
| Resort          | false                  | true                  | pin                 | false                |

**How it flows through the system:**

```
1. resolve_room_access() returns access_settings from property
2. /api/stay/room/[roomCode] reads settings
3. If browse_requires_verification=true:
   -> Return 403 with { error: 'verification_required' }
   -> Client shows InlineVerification immediately
4. If browse_requires_verification=false:
   -> Issue tier-1 browse JWT
   -> Client renders dashboard in read-only mode
5. When guest tries to order:
   -> Client checks local accessTier
   -> If 'browse' and order_requires_verification=true:
      -> Show InlineVerification
      -> On success: upgrade to tier-2 JWT
```

### 4.5 Document Upload and Visa Tracking

**New table:**

```sql
CREATE TABLE accom_guest_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,

  -- Document info
  document_type TEXT NOT NULL CHECK (document_type IN (
    'passport', 'visa', 'id_card', 'driving_license', 'other'
  )),

  -- Storage (Supabase Storage)
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,

  -- Visa-specific extracted data
  visa_type TEXT,           -- 'exemption', 'e_visa', 'tourist', 'business'
  visa_expiry_date DATE,
  nationality TEXT,         -- ISO country code

  -- Review status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'verified', 'rejected', 'expired'
  )),
  verified_by UUID REFERENCES accounts(id),
  verified_at TIMESTAMPTZ,
  rejection_reason TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_guest_documents_booking ON accom_guest_documents(booking_id);
CREATE INDEX idx_guest_documents_property ON accom_guest_documents(property_id);
CREATE INDEX idx_guest_documents_visa_expiry ON accom_guest_documents(visa_expiry_date)
  WHERE document_type = 'visa' AND status = 'verified';

-- RLS
ALTER TABLE accom_guest_documents ENABLE ROW LEVEL SECURITY;

-- Owner manages via property_id chain (same pattern as all other accom_ tables)
CREATE POLICY guest_documents_owner_manage ON accom_guest_documents
  FOR ALL TO authenticated
  USING (property_id IN (
    SELECT id FROM accom_properties
    WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  ));
-- NO anon access -- guest uploads via SECURITY DEFINER function
```

**Storage architecture:**

- Supabase Storage bucket: `guest-documents` (private, not public)
- Path convention: `{property_id}/{booking_id}/{document_type}_{timestamp}.{ext}`
- Upload: guest calls SECURITY DEFINER function that writes to storage + inserts row
- Download: owner gets time-limited signed URL via backoffice API

**Upload SECURITY DEFINER function:**

```sql
CREATE OR REPLACE FUNCTION upload_guest_document(
  p_booking_id UUID,
  p_document_type TEXT,
  p_storage_path TEXT,
  p_file_name TEXT,
  p_file_size INTEGER,
  p_mime_type TEXT,
  p_visa_type TEXT DEFAULT NULL,
  p_visa_expiry_date DATE DEFAULT NULL,
  p_nationality TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_property_id UUID;
  v_doc_id UUID;
BEGIN
  -- Get property_id from booking (validates booking exists)
  SELECT property_id INTO v_property_id
  FROM accom_bookings WHERE id = p_booking_id;

  IF v_property_id IS NULL THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;

  INSERT INTO accom_guest_documents (
    booking_id, property_id, document_type,
    storage_path, file_name, file_size, mime_type,
    visa_type, visa_expiry_date, nationality
  ) VALUES (
    p_booking_id, v_property_id, p_document_type,
    p_storage_path, p_file_name, p_file_size, p_mime_type,
    p_visa_type, p_visa_expiry_date, p_nationality
  )
  RETURNING id INTO v_doc_id;

  RETURN v_doc_id;
END;
$$;
```

**Visa expiry tracking query (for notifications):**

```sql
-- Find bookings where visa expires during or before checkout
SELECT
  d.booking_id,
  d.visa_expiry_date,
  b.check_out_date,
  b.guest_name,
  b.guest_last_name,
  p.name AS property_name,
  p.contact_phone,
  (d.visa_expiry_date - CURRENT_DATE) AS days_remaining
FROM accom_guest_documents d
JOIN accom_bookings b ON b.id = d.booking_id
JOIN accom_properties p ON p.id = d.property_id
WHERE d.document_type = 'visa'
  AND d.status = 'verified'
  AND d.visa_expiry_date IS NOT NULL
  AND d.visa_expiry_date <= b.check_out_date
  AND d.visa_expiry_date >= CURRENT_DATE
  AND (d.visa_expiry_date - CURRENT_DATE) IN (14, 7, 3);  -- notification days
```

### 4.6 Multi-Zone WiFi Data Model

**Two levels: property-wide zones + room-specific override.**

**Property-level zones:**

```sql
ALTER TABLE accom_properties
  ADD COLUMN wifi_zones JSONB NOT NULL DEFAULT '[]'::jsonb;
```

**JSONB schema:**

```typescript
interface WifiZone {
  zone_id: string; // 'lobby', 'pool', 'restaurant', 'room_default'
  label: string; // 'Lobby & Reception', 'Pool Area'
  ssid: string; // 'Hotel_Guest'
  password: string; // 'welcome2026'
  is_primary: boolean; // true = shown first/prominently
}
```

**Room-specific WiFi override:**

```sql
ALTER TABLE accom_rooms
  ADD COLUMN wifi_ssid TEXT,
  ADD COLUMN wifi_password TEXT;
```

**WiFi resolution logic (in resolve_room_access and in API routes):**

```
1. Room has own wifi_ssid/wifi_password?
   YES -> Return room WiFi as primary
   NO  -> Continue to step 2

2. Property has wifi_zones with entries?
   YES -> Return zone marked is_primary=true as primary, others as secondary
   NO  -> Continue to step 3

3. Property has wifi_network/wifi_password (legacy single SSID)?
   YES -> Return as primary
   NO  -> Return null (no WiFi configured)
```

**Updated WifiCard display:**

- Single network: current behavior (network + password + copy button)
- Multi-zone: show primary prominently, accordion/tabs for other zones
- Room-specific: "Your Room WiFi" label, other zones below as "Other Networks"

---

## 5. Data Flow Diagrams

### 5.1 Happy Path: Guest with Active Booking

```
1. Guest scans QR -> /stay/room/BVA-203

2. Client: GET /api/stay/room/BVA-203
     |
     v
3. Server: supabase.rpc('resolve_room_access', { p_room_code: 'BVA-203' })
     |
     v
4. Returns: {
     room_id, property_id, room_number: '203',
     has_active_booking: true,
     booking_id, booking_code: 'BK-A3HN7K',
     guest_name: 'Sarah', guest_last_name: 'Johnson',
     wifi_network: 'BeachView_Guest', wifi_password: 'welcome2026',
     property_name: 'Beach View Apartment',
     access_settings: { browse_requires_verification: false, ... }
   }
     |
     v
5. Server checks access_settings.browse_requires_verification
     |
     +--> false: Issue tier-1 JWT (browse) containing propertyId, roomId, bookingId
     |
     v
6. Client: Store JWT, render dashboard
     - WiFi card: immediate
     - Welcome card: "Welcome Sarah" (from browse data)
     - Services: browse catalog (order buttons show lock icon)
     - Deals: visible
     - Useful numbers: visible
     |
     v
7. Guest taps "Order Breakfast"
     |
     +--> access_settings.order_requires_verification = true
     |
     v
8. InlineVerification component appears:
     "To place an order, please confirm your last name"
     [ Johnson_______ ] [Confirm]
     |
     v
9. POST /api/stay/room/BVA-203/verify { lastName: "Johnson" }
     |
     v
10. Server: Validates against booking.guest_last_name
     |
     +--> Match: Issue tier-2 JWT (full) with bookingId + accessTier='full'
     |
     v
11. Client: Replace tier-1 JWT with tier-2
     - Order proceeds: POST /api/stay/BK-A3HN7K/orders (existing route!)
     - All subsequent actions use tier-2 JWT
```

### 5.2 No Active Booking (Empty Room)

```
1. Guest scans QR -> /stay/room/BVA-203

2. Server: resolve_room_access returns has_active_booking=false

3. Server checks access_settings.wifi_visible_without_booking
     |
     +--> true: Include WiFi in response
     |
     v
4. Issue tier-1 JWT (browse, no bookingId)

5. Client renders limited dashboard:
     - WiFi card (if configured to show)
     - Property info, contact host
     - "No active booking found" message
     - "Already have a booking code?" input field
     - Services catalog (browse only, all order actions disabled)
     - Deals (visible, no booking context)
```

### 5.3 Existing Booking Code Path (Unchanged)

```
1. Guest follows link from email -> /stay/BK-A3HN7K
2. Existing flow: lookup -> verify screen -> JWT -> dashboard
3. NO CHANGES to this path.
4. JWT issued by existing signGuestToken includes accessTier='full' (backward-compatible default)
```

### 5.4 Token Upgrade Flow

```
TIER-1 (browse)                    TIER-2 (full)
+-----------------+                +-----------------+
| propertyId      |    verify()    | propertyId      |
| roomId          |  ---------->   | roomId          |
| bookingId (ro)  |                | bookingId       |
| accessTier:     |                | accessTier:     |
|   'browse'      |                |   'full'        |
| exp: 24h        |                | exp: checkout+  |
+-----------------+                |   24h           |
                                   +-----------------+

On upgrade:
1. Old browse JWT removed from localStorage
2. New full JWT stored
3. All API calls automatically use full JWT
4. No page reload needed
```

---

## 6. API Route Design

### New Routes

| Route                              | Method | Auth   | Purpose                                       |
| ---------------------------------- | ------ | ------ | --------------------------------------------- |
| `/api/stay/room/[roomCode]`        | GET    | None   | Resolve room code -> tier-1 data + browse JWT |
| `/api/stay/room/[roomCode]/verify` | POST   | None   | Verify identity -> tier-2 JWT                 |
| `/api/stay/[code]/documents`       | POST   | Tier-2 | Upload document (multipart/form-data)         |
| `/api/stay/[code]/documents`       | GET    | Tier-2 | List guest's own documents                    |
| `/api/stay/[code]/visa-status`     | GET    | Tier-2 | Visa expiry info + days remaining             |

### Modified Routes (Tier Check Addition)

| Route                                 | Current Auth  | New Auth       | Change                        |
| ------------------------------------- | ------------- | -------------- | ----------------------------- |
| `/api/stay/[code]/services` GET       | Full JWT only | Browse or Full | Relax to accept tier-1        |
| `/api/stay/[code]/deals` GET          | Full JWT only | Browse or Full | Relax to accept tier-1        |
| `/api/stay/[code]/property` GET       | Full JWT only | Browse or Full | Relax to accept tier-1        |
| `/api/stay/[code]/useful-numbers` GET | Full JWT only | Browse or Full | Relax to accept tier-1        |
| `/api/stay/[code]/orders` GET         | Full JWT only | Browse or Full | Relax (view own orders)       |
| `/api/stay/[code]/orders` POST        | Full JWT only | **Full only**  | Enforce tier-2 (write action) |

**Backward compatibility:** Existing JWTs without `accessTier` field are treated as `accessTier='full'` (they were issued after full verification).

### Room Route Response Shape

```typescript
// GET /api/stay/room/[roomCode] response
interface RoomAccessResponse {
  token: string; // tier-1 browse JWT

  room: {
    id: string;
    number: string;
    type: string;
    floor: string | null;
  };

  property: {
    name: string;
    slug: string;
    type: string;
    contactPhone: string | null;
    contactWhatsapp: string | null;
    checkoutTime: string;
    houseRules: string[];
    amenities: string[];
    images: string[];
    hasLinkedFnb: boolean;
    linkedFnbSlug: string | null;
  };

  wifi: {
    primary: { network: string; password: string } | null;
    zones: Array<{ label: string; network: string; password: string }>;
  };

  booking: {
    hasActiveBooking: boolean;
    code: string | null;
    guestFirstName: string | null;
    checkIn: string | null;
    checkOut: string | null;
    nights: number | null;
    status: string | null;
    guestCount: number | null;
  };

  accessSettings: {
    browseRequiresVerification: boolean;
    orderRequiresVerification: boolean;
    verificationMethod: string;
  };
}
```

---

## 7. Frontend Session Management

### useRoomSession Hook

```typescript
interface RoomSession {
  // Tier state
  accessTier: 'none' | 'browse' | 'full';

  // Data (available at browse tier)
  roomInfo: RoomInfo | null;
  propertyInfo: PropertyInfo | null;
  wifi: WifiInfo | null;
  hasActiveBooking: boolean;
  bookingPreview: BookingPreview | null; // name, dates (no sensitive data)

  // Data (available at full tier only)
  booking: BookingInfo | null;
  token: string | null;

  // Access settings from property
  accessSettings: AccessSettings | null;

  // Actions
  initFromRoomCode: (roomCode: string) => Promise<void>;
  verify: (input: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;

  // Loading
  isLoading: boolean;
  error: string | null;
}
```

**Storage keys (separate from existing session):**

```typescript
const ROOM_TOKEN_KEY = 'gudbro_room_token';
const ROOM_DATA_KEY = 'gudbro_room_data';
```

**Coexistence with `useStaySession`:**

- `/stay/[code]` pages use `useStaySession` (existing, unchanged)
- `/stay/room/[roomCode]` pages use `useRoomSession` (new)
- Both store tokens under different localStorage keys
- If guest uses both flows, most recent tier-2 token wins for API calls

### InlineVerification Component

```typescript
interface InlineVerificationProps {
  method: 'last_name' | 'pin' | 'room_number';
  roomCode: string;
  onSuccess: (token: string, booking: BookingInfo) => void;
  onCancel: () => void;
}
```

**UX behavior:**

- Appears as a bottom sheet or modal overlay (not a page redirect)
- Shows property-appropriate prompt based on verification_method
- Single input field + confirm button
- On success: closes, session upgrades silently, original action proceeds
- On failure: shows error inline, allows retry
- Cancel: returns to browse mode

---

## 8. QR Code Changes

### Current QR Code Generation (AccomQRGenerator)

```typescript
// Current: uses propertyId/roomId UUIDs
const roomUrl = `https://stays.gudbro.com/checkin/${propertyId}/${room.id}`;
```

### New QR Code Generation

```typescript
// New: uses human-readable room code
const roomUrl = `https://stays.gudbro.com/stay/room/${room.room_code}`;
```

**Changes to `AccomQRGenerator`:**

1. Use `room_code` instead of `{propertyId}/{roomId}` (shorter URL = smaller QR = better scanning)
2. Display room code below QR for reference
3. Add "Copy URL" button for each room
4. Keep property QR unchanged (`stays.gudbro.com/{slug}`)

**Backward compatibility redirect:**

```typescript
// apps/accommodations/frontend/app/checkin/[propertyId]/[roomId]/page.tsx
// Redirect old URLs to new format
export default async function LegacyCheckinRedirect({ params }) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('accom_rooms')
    .select('room_code')
    .eq('id', params.roomId)
    .single();

  if (data?.room_code) {
    redirect(`/stay/room/${data.room_code}`);
  }
  redirect('/'); // fallback
}
```

---

## 9. Security Model

### Threat Analysis

| Threat                                    | Likelihood | Impact | Mitigation                                                                                              |
| ----------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------- |
| Non-guest scans QR                        | HIGH       | LOW    | Tier-1 only shows WiFi + catalog. No PII, no ordering.                                                  |
| Previous guest revisits QR after checkout | MEDIUM     | LOW    | `resolve_room_access` checks active booking dates. Old JWT expires at checkout+24h.                     |
| Guest orders after checkout               | LOW        | MEDIUM | JWT expires. API routes verify dates. Double protection.                                                |
| Room code guessing/enumeration            | LOW        | LOW    | Room codes give tier-1 only. No sensitive data. Rate limit the API route.                               |
| MITM intercepts tier-1 JWT                | LOW        | LOW    | HTTPS enforced. Tier-1 grants read-only. Limited blast radius.                                          |
| Owner wants maximum security              | N/A        | N/A    | `browse_requires_verification=true` forces verification even for WiFi.                                  |
| Shared room scenario (hostel dorm)        | MEDIUM     | MEDIUM | Multiple guests in room all get tier-1. Each verifies individually for tier-2 with their own last name. |

### Physical Presence = Browsing Trust (Design Principle)

Being physically in the room (scanning the QR) is considered sufficient authentication for **browsing**. This mirrors the hospitality standard: the WiFi password card is already physically in the room. Anyone who can see the QR can also see the WiFi card.

Paid actions (ordering, document upload) require **identity verification** proportional to risk, configurable by the property owner.

### Rate Limiting

| Endpoint                                | Limit            | Reason               |
| --------------------------------------- | ---------------- | -------------------- |
| `GET /api/stay/room/[roomCode]`         | 30/min per IP    | Prevent enumeration  |
| `POST /api/stay/room/[roomCode]/verify` | 5/min per IP     | Prevent brute force  |
| `POST /api/stay/[code]/orders`          | 10/min per token | Prevent spam orders  |
| `POST /api/stay/[code]/documents`       | 5/min per token  | Prevent upload abuse |

---

## 10. Suggested Build Order

Based on dependency analysis and incremental value delivery:

### Phase 1: Room Code Foundation + New Entry Point

**What gets built:**

- `room_code` column + generation function on `accom_rooms`
- `resolve_room_access()` SECURITY DEFINER function
- `/stay/room/[roomCode]/page.tsx` (renders full dashboard in browse mode)
- `/api/stay/room/[roomCode]/route.ts` (resolves room, issues browse JWT)
- `useRoomSession` hook (browse tier only initially)
- Update `AccomQRGenerator` to use room codes
- Redirect from old `/checkin/{propertyId}/{roomId}` URLs
- Migrate existing rooms to generate room_code values

**Dependencies:** None (purely additive)
**Value delivered:** Guests scan QR, see WiFi + full dashboard immediately. No verification friction for browsing.

### Phase 2: Two-Tier Authentication + Inline Verification

**What gets built:**

- Add `accessTier` to JWT payload (backward-compatible)
- `InlineVerification` component
- `/api/stay/room/[roomCode]/verify/route.ts`
- Tier checking in write API routes (orders POST returns 403 for browse tier)
- Token upgrade flow in `useRoomSession`
- Relax read API routes to accept browse-tier JWTs

**Dependencies:** Phase 1 (room codes and browse entry exist)
**Value delivered:** Full guest flow works from room QR scan through ordering.

### Phase 3: Configurable Security Settings

**What gets built:**

- `access_settings` JSONB column on `accom_properties`
- Property type defaults
- Backoffice settings page for access configuration
- `resolve_room_access` reads and returns settings
- `InlineVerification` adapts to configured verification method
- `useRoomSession` respects browse_requires_verification

**Dependencies:** Phase 2 (two tiers exist to configure)
**Value delivered:** Owners control their security posture per property type.

### Phase 4: Document Upload and Visa Tracking

**What gets built:**

- `accom_guest_documents` table + RLS + SECURITY DEFINER
- Supabase Storage bucket with policies
- Document upload API route + UI component
- Visa expiry tracking logic
- Visa status card component (extend existing `VisaStatusCard`)
- Backoffice document viewer for owners
- Cron/notification for expiring visas

**Dependencies:** Phase 2 (requires tier-2 auth for uploads)
**Value delivered:** Compliance features, visa partner revenue opportunity.

### Phase 5: Multi-Zone WiFi

**What gets built:**

- `wifi_zones` JSONB on `accom_properties`
- `wifi_ssid`, `wifi_password` on `accom_rooms`
- WiFi resolution logic (room > zone > property fallback)
- Updated `WifiCard` for multi-zone display
- Backoffice WiFi zone management UI

**Dependencies:** Phase 1 (room context exists)
**Value delivered:** Better WiFi UX for multi-building/multi-area properties.

---

## 11. Integration Points Summary

### Database Integration

| New/Modified                       | Integrates With                                       | How                          |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------- |
| `accom_rooms.room_code`            | Existing room table                                   | New UNIQUE column            |
| `resolve_room_access()`            | `accom_rooms` + `accom_bookings` + `accom_properties` | JOINs existing tables        |
| `accom_properties.access_settings` | All API routes                                        | Read at access-decision time |
| `accom_guest_documents`            | `accom_bookings` + Supabase Storage                   | FK + storage path            |
| `accom_rooms.wifi_ssid/password`   | `WifiCard` component                                  | New resolution logic         |
| `accom_properties.wifi_zones`      | `WifiCard` component                                  | Multi-zone display           |

### API Integration

| New Route                          | Reuses From Existing              | Notes                          |
| ---------------------------------- | --------------------------------- | ------------------------------ |
| `/api/stay/room/[roomCode]`        | `getSupabaseAdmin()`, JWT signing | Same infra as existing routes  |
| `/api/stay/room/[roomCode]/verify` | `verify_booking_access()` pattern | Reuses verification logic      |
| All existing `/api/stay/[code]/*`  | `verifyGuestToken()`              | Extended with accessTier check |

### Frontend Integration

| New Component                    | Reuses From Existing                                   | Notes                                      |
| -------------------------------- | ------------------------------------------------------ | ------------------------------------------ |
| `/stay/room/[roomCode]/page.tsx` | All dashboard components (WifiCard, WelcomeCard, etc.) | Different session hook, same UI            |
| `InlineVerification`             | Renders inline on any dashboard tab                    | Overlay, not page redirect                 |
| `useRoomSession`                 | `useStaySession` patterns                              | Parallel hook, different localStorage keys |

### Backoffice Integration

| Change               | Integrates With                  |
| -------------------- | -------------------------------- |
| Room code generation | Existing room management pages   |
| QR code update       | Existing `AccomQRGenerator`      |
| Access settings UI   | New section in property settings |
| Document viewer      | New section in booking detail    |
| WiFi zone management | New section in property settings |

---

## Sources

All findings based on direct codebase analysis (HIGH confidence):

- `apps/accommodations/frontend/` -- all source files examined
- `shared/database/migrations/schema/077-*.sql` through `087-*.sql`
- `apps/backoffice/components/accommodations/AccomQRGenerator.tsx`
- `apps/accommodations/frontend/lib/auth.ts` (JWT signing/verification)
- `apps/accommodations/frontend/hooks/useStaySession.ts` (session management)
- `apps/accommodations/frontend/types/stay.ts` (API response types)
- `apps/accommodations/frontend/lib/stay-api.ts` (API client wrappers)
- All 7 API routes under `/app/api/stay/`
- `apps/accommodations/PRD.md` v2.3 (product requirements, visa tracking, QR strategy)
