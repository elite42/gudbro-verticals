# Phase 25: Room Code Foundation - Research

**Researched:** 2026-02-01
**Domain:** Permanent room QR codes with date-based booking resolution, browse-tier JWT, additive routing
**Confidence:** HIGH

## Summary

Phase 25 replaces the current "booking code + last name" verification gate with a permanent room QR code that instantly resolves to the active booking. The guest scans a physical QR in their room and sees WiFi, property info, contacts, and house rules immediately -- zero login forms. When no booking is active, the QR falls back to a read-only property info page.

The implementation is purely additive: a new `/stay/room/[roomCode]` route sits alongside the existing `/stay/[code]` route. No existing code is modified. The core technical challenge is the `resolve_room_access()` SECURITY DEFINER function that maps a room code to the current active booking using date-based resolution, and a new "browse-tier" JWT that grants read-only access without verification.

**Primary recommendation:** Add a `room_code` column to `accom_rooms`, create `resolve_room_access()` as a SECURITY DEFINER function (follows existing `verify_booking_access()` pattern), extend the JWT with an `accessTier` claim (browse vs full), and build a new Next.js route at `/stay/room/[roomCode]` that reuses all existing dashboard components.

## Standard Stack

### Core

| Library               | Version  | Purpose                                       | Why Standard                                      |
| --------------------- | -------- | --------------------------------------------- | ------------------------------------------------- |
| jose                  | ^6.0.8   | JWT sign/verify with accessTier claim         | Already used in `lib/auth.ts` for guest tokens    |
| @supabase/supabase-js | existing | Database queries + SECURITY DEFINER RPC calls | Already used via `lib/supabase.ts` (admin client) |
| Next.js 14 App Router | 14.2.33  | `/stay/room/[roomCode]` dynamic route         | Existing framework, follows `[code]` pattern      |
| date-fns              | existing | Date math for checkout-based token expiry     | Already used in verify route                      |

### Supporting

| Library                | Version | Purpose                                       | When to Use                                         |
| ---------------------- | ------- | --------------------------------------------- | --------------------------------------------------- |
| crypto (Node built-in) | -       | `crypto.randomBytes` for room code generation | Generating unique 8-char room codes in SQL function |

### Alternatives Considered

| Instead of                 | Could Use                         | Tradeoff                                                                                                              |
| -------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Room code on `accom_rooms` | Separate `accom_room_codes` table | Extra table adds complexity with no benefit; room code is 1:1 with room                                               |
| SQL-generated room codes   | Application-generated codes       | SQL SECURITY DEFINER keeps code generation close to uniqueness check; avoids race conditions                          |
| New `useRoomSession` hook  | Extend existing `useStaySession`  | New hook is cleaner -- room sessions start unauthenticated (browse tier) vs booking sessions that start authenticated |

**Installation:**
No new dependencies needed. All libraries already in the project.

## Architecture Patterns

### Recommended Changes to File Structure

```
apps/accommodations/frontend/
├── app/
│   ├── stay/
│   │   ├── [code]/page.tsx              # EXISTING - booking code dashboard (unchanged)
│   │   └── room/
│   │       └── [roomCode]/page.tsx      # NEW - room code dashboard (browse tier)
│   └── api/
│       └── stay/
│           ├── [code]/...               # EXISTING - all booking-code APIs (unchanged)
│           ├── verify/route.ts          # EXISTING - booking verification (unchanged)
│           └── room/
│               └── [roomCode]/
│                   └── route.ts         # NEW - room code resolution API
├── hooks/
│   ├── useStaySession.ts               # EXISTING - unchanged
│   └── useRoomSession.ts               # NEW - room code session management
├── lib/
│   └── auth.ts                         # MODIFIED - add accessTier to JWT payload
└── types/
    └── stay.ts                         # MODIFIED - add accessTier + RoomResolveResponse types
```

### Pattern 1: Additive Route Architecture (Zero Regression)

**What:** New `/stay/room/[roomCode]` route exists alongside `/stay/[code]`. Legacy URLs are never touched.
**When to use:** Always. This is a locked decision from prior architecture decisions.
**Example:**

```
URL: /stay/room/RM-B3KN7P2H
  -> API: GET /api/stay/room/RM-B3KN7P2H
  -> DB: resolve_room_access('RM-B3KN7P2H')
  -> Returns: { booking data OR property-only fallback }
  -> JWT: signed with accessTier: 'browse'
  -> Dashboard: all components render (read-only, no ordering)

URL: /stay/BK-A3HN7K (legacy, unchanged)
  -> Verification page -> POST /api/stay/verify
  -> JWT: signed with accessTier: 'full' (backward compatible)
  -> Dashboard: full access including ordering
```

### Pattern 2: Two-Tier JWT with accessTier Claim

**What:** Single JWT token with an `accessTier` claim that is either `'browse'` or `'full'`. Browse-tier tokens are issued from room code resolution (no verification). Full-tier tokens are issued from booking verification (existing flow).
**When to use:** All JWT operations from Phase 25 onwards.
**Why single token, not two:** Simpler state management, single localStorage key, Phase 26 upgrades accessTier in-place.

**Current JWT payload (lib/auth.ts):**

```typescript
interface GuestTokenPayload {
  bookingId: string;
  propertyId: string;
  checkoutDate: string;
}
```

**New JWT payload:**

```typescript
interface GuestTokenPayload {
  bookingId: string; // booking UUID (null/empty when no active booking)
  propertyId: string; // always present
  checkoutDate: string; // booking checkout or fallback expiry
  accessTier: 'browse' | 'full'; // NEW - browse = read only, full = can order
  roomCode?: string; // NEW - room code for room-based sessions
}
```

**Backward compatibility:** Existing tokens without `accessTier` are treated as `'full'` (they went through verification). This means zero changes to existing API routes for Phase 25. Phase 26 will add tier-based gating.

### Pattern 3: SECURITY DEFINER for Room Resolution

**What:** A `resolve_room_access(p_room_code TEXT)` function that:

1. Looks up the room by its `room_code`
2. Finds the active booking for that room (check_in_date <= today AND check_out_date + 24h >= now AND status IN ('confirmed', 'checked_in'))
3. If found: returns full booking + property + room + WiFi data
4. If not found: returns property + room + WiFi data only (read-only fallback)
5. If room code invalid: returns is_valid = false

**When to use:** Every room QR scan hits this function.
**Why SECURITY DEFINER:** Same pattern as `verify_booking_access()`. Guest access to `accom_bookings` goes through RPC, not direct table access. The table has NO anon RLS policies by design.

```sql
CREATE OR REPLACE FUNCTION resolve_room_access(p_room_code TEXT)
RETURNS TABLE(
    is_valid BOOLEAN,
    has_active_booking BOOLEAN,
    property_id UUID,
    booking_id UUID,
    room_id UUID,
    guest_name TEXT,
    check_in DATE,
    check_out DATE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- First: validate room code exists
    -- Then: find active booking for that room
    -- Fallback: return property info without booking
    ...
END;
$$;
```

### Pattern 4: Room Code Format

**What:** Room codes follow the format `RM-XXXXXXXX` (8 alphanumeric characters, excluding ambiguous chars 0/O/1/I/L).
**Why 8 chars:** Booking codes use 6 chars (BK-XXXXXX). Room codes are permanent and more exposed (physical QR), so 8 chars gives larger keyspace (~1.5 trillion combinations vs ~700 million for 6 chars). Security through obscurity is not the goal, but longer codes reduce guessability.
**Generation:** SQL function `generate_room_code()` following the exact pattern of `generate_booking_code()` from migration 077.

### Pattern 5: No-Booking Fallback (Property Info Page)

**What:** When `resolve_room_access()` finds the room but no active booking, the API still returns property info (name, WiFi, house rules, contacts). The frontend renders a stripped-down dashboard showing only public info.
**When to use:** Between guest checkouts, during vacant periods, or before a property starts using the booking system.
**Implementation:** The room resolution API returns `hasActiveBooking: false` with property and room data. The frontend conditionally hides booking-specific sections (WelcomeCard, CheckoutInfo, ActiveOrders, etc.) and shows a simplified view.

### Anti-Patterns to Avoid

- **Modifying existing `/stay/[code]` route:** Never touch it. The new route is entirely separate. Shared logic goes into utility functions.
- **Separate localStorage keys for room sessions:** Use the same `gudbro_stay_token` / `gudbro_stay_data` keys. A room session overwrites a booking session and vice versa. Simpler state, no conflicts.
- **Exposing booking details without verification in browse tier:** Browse tier shows WiFi, property info, contacts, house rules. It does NOT show guest name, booking code, or order history. These are for full tier only (Phase 26).
- **Using `anon` role for room resolution:** Always use SECURITY DEFINER function via `supabaseAdmin.rpc()`. Never give anon SELECT on `accom_bookings`.

## Don't Hand-Roll

| Problem                       | Don't Build                         | Use Instead                                            | Why                                                                             |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Room code uniqueness          | Application-level retry loop        | SQL `generate_room_code()` SECURITY DEFINER with loop  | Race conditions in concurrent inserts; SQL handles atomicity                    |
| JWT expiry calculation        | Manual Date math                    | `jose` SignJWT with `setExpirationTime`                | Already used in existing auth.ts, handles edge cases                            |
| Date-based booking resolution | Multiple queries from API route     | Single `resolve_room_access()` RPC call                | Single round-trip, atomic read, consistent date handling in PostgreSQL timezone |
| Token backward compatibility  | Version header or separate endpoint | Default `accessTier` to `'full'` when claim is missing | Zero changes to existing routes                                                 |

**Key insight:** The entire room code system is a thin layer on top of the existing booking system. The room code is just a different entry point that resolves to the same booking data. Don't build a parallel system.

## Common Pitfalls

### Pitfall 1: Timezone Mismatch in Date-Based Resolution

**What goes wrong:** `resolve_room_access()` uses `CURRENT_DATE` which is in the database timezone. If the property is in `Asia/Ho_Chi_Minh` (UTC+7) but the DB server is in UTC, bookings resolve incorrectly around midnight.
**Why it happens:** PostgreSQL `CURRENT_DATE` uses the session timezone, which for Supabase is typically UTC.
**How to avoid:** Use `(NOW() AT TIME ZONE property.timezone)::DATE` instead of `CURRENT_DATE` in the resolution query. This matches the existing pattern in `verify_booking_access()` which uses `CURRENT_DATE` (acceptable for now since all properties are in VN timezone, but the room code function should be timezone-aware from the start).
**Warning signs:** Guest scans QR at 11 PM local time and gets "no active booking" because UTC date has already flipped to the next day.

### Pitfall 2: Room Code Collision with Booking Codes

**What goes wrong:** If room codes and booking codes use the same format, the routing logic might confuse them.
**Why it happens:** Both use alphanumeric codes with similar character sets.
**How to avoid:** Use distinct prefix: `RM-` for room codes vs `BK-` for booking codes. The Next.js route structure also separates them: `/stay/room/[roomCode]` vs `/stay/[code]`.
**Warning signs:** URL routing sends a room code to the booking route handler.

### Pitfall 3: Stale Room Sessions After New Booking

**What goes wrong:** Guest A checks out, Guest B checks in. Guest A's browser still has a cached session token for the same room.
**Why it happens:** localStorage tokens persist until expiry. Guest A's token was set to expire at their checkout + 24h.
**How to avoid:** The `resolve_room_access()` function always returns the CURRENT active booking. When Guest B scans the QR, they get fresh data. Guest A's expired token will fail on API calls. Additionally, Phase 26 will add checkout invalidation. For Phase 25 (browse tier only), stale sessions are low risk since no paid actions are possible.
**Warning signs:** Two different guests see each other's booking data.

### Pitfall 4: Race Condition - Multiple Active Bookings for Same Room

**What goes wrong:** If two overlapping bookings exist for the same room (should be prevented by exclusion constraint), `resolve_room_access()` might return the wrong one.
**Why it happens:** The `accom_bookings_no_overlap` exclusion constraint (migration 083) prevents this, but only for non-cancelled/non-no-show bookings.
**How to avoid:** The exclusion constraint already handles this. In `resolve_room_access()`, additionally ORDER BY `check_in_date DESC LIMIT 1` as a safety net.
**Warning signs:** Function returns multiple rows.

### Pitfall 5: QR Code Pointing to Wrong Route Format

**What goes wrong:** QR codes are generated with the wrong URL format (e.g., including the booking code instead of the room code).
**Why it happens:** The existing QR system (migration 042) generates codes for the F&B vertical, not accommodations.
**How to avoid:** The QR generator update must output URLs in the format `stays.gudbro.com/stay/room/{room_code}`. Document the exact URL format clearly.
**Warning signs:** Scanning QR leads to a 404 or the wrong page.

## Code Examples

### Example 1: resolve_room_access() SQL Function

```sql
-- Source: follows verify_booking_access() pattern from migration 077
CREATE OR REPLACE FUNCTION resolve_room_access(p_room_code TEXT)
RETURNS TABLE(
    is_valid BOOLEAN,
    has_active_booking BOOLEAN,
    property_id UUID,
    room_id UUID,
    booking_id UUID,
    room_number TEXT,
    room_type TEXT,
    guest_name TEXT,
    check_in DATE,
    check_out DATE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_room_id UUID;
    v_property_id UUID;
    v_room_number TEXT;
    v_room_type TEXT;
BEGIN
    -- Step 1: Find the room by code
    SELECT r.id, r.property_id, r.room_number, r.room_type
    INTO v_room_id, v_property_id, v_room_number, v_room_type
    FROM accom_rooms r
    WHERE r.room_code = p_room_code
      AND r.is_active = true;

    -- Invalid room code
    IF v_room_id IS NULL THEN
        RETURN QUERY SELECT
            false, false, NULL::UUID, NULL::UUID, NULL::UUID,
            NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::DATE, NULL::DATE;
        RETURN;
    END IF;

    -- Step 2: Find active booking for this room
    RETURN QUERY
    SELECT
        true,
        true,
        v_property_id,
        v_room_id,
        b.id,
        v_room_number,
        v_room_type,
        b.guest_name,
        b.check_in_date,
        b.check_out_date
    FROM accom_bookings b
    WHERE b.room_id = v_room_id
      AND b.check_in_date <= CURRENT_DATE
      AND b.check_out_date + INTERVAL '24 hours' >= NOW()
      AND b.status IN ('confirmed', 'checked_in')
    ORDER BY b.check_in_date DESC
    LIMIT 1;

    -- Step 3: No active booking -> return room/property info only
    IF NOT FOUND THEN
        RETURN QUERY SELECT
            true,        -- room code is valid
            false,       -- but no active booking
            v_property_id,
            v_room_id,
            NULL::UUID,  -- no booking
            v_room_number,
            v_room_type,
            NULL::TEXT,  -- no guest
            NULL::DATE,
            NULL::DATE;
    END IF;
END;
$$;
```

### Example 2: Extended signGuestToken with accessTier

```typescript
// Source: extends existing lib/auth.ts pattern
export async function signGuestToken(payload: {
  bookingId: string | null;
  propertyId: string;
  checkoutDate: string;
  accessTier: 'browse' | 'full';
  roomCode?: string;
}): Promise<string> {
  const checkoutDate = new Date(payload.checkoutDate);
  const expiresAt = addHours(checkoutDate, 24);

  return new SignJWT({
    bookingId: payload.bookingId,
    propertyId: payload.propertyId,
    checkoutDate: payload.checkoutDate,
    accessTier: payload.accessTier,
    ...(payload.roomCode && { roomCode: payload.roomCode }),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getSecret());
}
```

### Example 3: Room Resolution API Route

```typescript
// Source: follows /api/stay/[code] pattern
// GET /api/stay/room/[roomCode]/route.ts
export async function GET(
  _request: NextRequest,
  { params }: { params: { roomCode: string } }
) {
  const { roomCode } = params;

  // Validate room code format: RM- followed by 8 chars
  const codePattern = /^RM-[A-HJ-NP-Z2-9]{8}$/;
  if (!codePattern.test(roomCode)) {
    return NextResponse.json({ error: 'invalid_room_code' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc('resolve_room_access', {
    p_room_code: roomCode,
  });

  // ... handle response, sign browse-tier JWT, return stay data
}
```

### Example 4: useRoomSession Hook (Skeleton)

```typescript
// Manages room-based session (browse tier)
// Similar to useStaySession but:
// - No verify() method (no verification needed)
// - Calls GET /api/stay/room/[roomCode] on mount
// - Stores browse-tier token in same localStorage keys
// - Exposes hasActiveBooking flag for conditional rendering
export function useRoomSession(roomCode: string): RoomSession {
  // On mount: call room resolution API
  // Store token + stay data in localStorage
  // Return { token, stay, hasActiveBooking, isLoading }
}
```

### Example 5: generate_room_code() SQL Function

```sql
-- Source: follows generate_booking_code() from migration 077
CREATE OR REPLACE FUNCTION generate_room_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    code TEXT;
    i INTEGER;
    exists_already BOOLEAN;
BEGIN
    LOOP
        code := 'RM-';
        FOR i IN 1..8 LOOP
            code := code || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
        END LOOP;

        SELECT EXISTS(
            SELECT 1 FROM accom_rooms WHERE room_code = code
        ) INTO exists_already;

        IF NOT exists_already THEN
            RETURN code;
        END IF;
    END LOOP;
END;
$$;
```

## State of the Art

| Old Approach                                             | Current Approach                          | When Changed   | Impact                                  |
| -------------------------------------------------------- | ----------------------------------------- | -------------- | --------------------------------------- |
| Booking code in QR                                       | Permanent room code in QR                 | Phase 25 (now) | QR never changes, works across bookings |
| Verification required for all access                     | Browse tier (no verification) + full tier | Phase 25 (now) | Instant WiFi access on QR scan          |
| Single JWT payload (bookingId, propertyId, checkoutDate) | JWT with accessTier claim                 | Phase 25 (now) | Enables progressive auth in Phase 26    |

**Deprecated/outdated:**

- Nothing deprecated in Phase 25. All existing routes remain functional.

## Data Model Changes Summary

### accom_rooms: New Columns

| Column      | Type | Default                | Constraint       | Purpose                                |
| ----------- | ---- | ---------------------- | ---------------- | -------------------------------------- |
| `room_code` | TEXT | `generate_room_code()` | UNIQUE, NOT NULL | Permanent room identifier for QR codes |

### New Functions

| Function                    | Type             | Purpose                                          |
| --------------------------- | ---------------- | ------------------------------------------------ |
| `generate_room_code()`      | SECURITY DEFINER | Generates unique RM-XXXXXXXX codes               |
| `set_room_code()`           | TRIGGER          | Auto-sets room_code on INSERT if NULL            |
| `resolve_room_access(TEXT)` | SECURITY DEFINER | Maps room code to active booking + property data |

### New Indexes

| Index                       | Table         | Columns     | Purpose                  |
| --------------------------- | ------------- | ----------- | ------------------------ |
| `idx_accom_rooms_room_code` | `accom_rooms` | `room_code` | Fast lookup by room code |

### Backfill

Existing rooms need room codes generated. The migration should UPDATE all existing rows:

```sql
UPDATE accom_rooms SET room_code = generate_room_code() WHERE room_code IS NULL;
```

## JWT Changes Summary

### Phase 25 (This Phase)

| Change                           | Detail                                                    |
| -------------------------------- | --------------------------------------------------------- |
| Add `accessTier` to payload      | `'browse'` for room QR, `'full'` for booking verification |
| Add `roomCode` to payload        | Optional, present for room-based sessions                 |
| Backward compat                  | Missing `accessTier` treated as `'full'`                  |
| Expiry for browse (no booking)   | 7 days from issuance (property info doesn't change often) |
| Expiry for browse (with booking) | checkout + 24h (matches existing pattern)                 |

### Phase 26 (Next Phase - NOT This Phase)

| Change          | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| API tier gating | Write APIs require `accessTier: 'full'`                           |
| Token upgrade   | Inline verification upgrades `accessTier` from `browse` to `full` |

## Open Questions

1. **Room code auto-generation for existing rooms**
   - What we know: There is seed data in migration 078 with demo rooms. These need room codes.
   - What's unclear: Whether to generate codes in the migration (deterministic) or let the trigger handle it.
   - Recommendation: Add column with trigger, then UPDATE existing rows to trigger code generation. This ensures all rooms have codes after migration.

2. **Browse tier token expiry when no active booking**
   - What we know: With an active booking, expiry = checkout + 24h (matches existing pattern).
   - What's unclear: What expiry to use when there's no booking (vacant room QR scan).
   - Recommendation: 7 days from issuance. Guest likely won't return after leaving. Long enough to be useful if they're browsing property info pre-arrival.

3. **Should browse-tier users see the guest name from the booking?**
   - What we know: Browse tier is meant for instant, unauthenticated access.
   - What's unclear: Whether showing "Welcome, Sarah" is a privacy risk (anyone scanning the QR sees it).
   - Recommendation: Do NOT show guest name in browse tier. Show property name instead (e.g., "Welcome to Beach View Apartment"). Guest name is only shown after verification (full tier, Phase 26).

## Sources

### Primary (HIGH confidence)

- `apps/accommodations/frontend/lib/auth.ts` - Current JWT implementation with jose v6.0.8
- `apps/accommodations/frontend/app/api/stay/verify/route.ts` - Current verification flow pattern
- `apps/accommodations/frontend/app/api/stay/[code]/route.ts` - Current booking lookup pattern
- `apps/accommodations/frontend/hooks/useStaySession.ts` - Current session management with localStorage
- `shared/database/migrations/schema/077-accommodations-schema.sql` - Base accommodations schema (tables, functions, RLS)
- `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` - v2 extensions (service orders, pricing)
- `shared/database/migrations/schema/081-schema-api-alignment.sql` - Column renames aligning DB to API
- `apps/accommodations/frontend/types/stay.ts` - Full API response type definitions
- `.planning/REQUIREMENTS.md` - v1.5 requirements (QRA-01 through QRA-05, AUTH-01)

### Secondary (MEDIUM confidence)

- `apps/accommodations/PRD.md` - Product requirements for QR strategy and two-mode architecture
- `shared/database/migrations/schema/042-qr-codes.sql` - Existing QR code system (F&B vertical, separate from accommodations)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - All libraries already in the project, zero new dependencies
- Architecture: HIGH - Follows exact patterns established in existing codebase (SECURITY DEFINER, JWT, API routes)
- Pitfalls: HIGH - Identified from reading actual codebase patterns and timezone handling
- Data model: HIGH - Extends existing tables with minimal, backward-compatible changes

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable domain, no external dependency changes expected)
