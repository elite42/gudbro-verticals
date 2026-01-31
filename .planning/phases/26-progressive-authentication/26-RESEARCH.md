# Phase 26: Progressive Authentication - Research

**Researched:** 2026-02-01
**Domain:** JWT-based session upgrade, inline verification UI, multi-tier access control
**Confidence:** HIGH (codebase-first research, all patterns verified from source)

## Summary

Phase 26 adds inline verification to upgrade browse-tier room sessions (created in Phase 25) to full-access sessions. The codebase is well-prepared: the JWT infrastructure already supports `accessTier` claims, `signGuestToken` accepts both browse and full tiers, and the `useRoomSession` hook uses shared localStorage keys with the booking flow. The primary work is: (1) a new verify API endpoint for room sessions, (2) a database migration adding PIN support and verification config, (3) an InlineVerification bottom sheet component, (4) access tier gating on write API endpoints, and (5) upgrading `useRoomSession` to support token replacement.

The existing codebase patterns (bottom sheet in `ContactSheet.tsx`, drawer in `CartDrawer.tsx`, verify endpoint in `/api/stay/verify`) provide strong templates. No new libraries are needed -- all building blocks exist.

**Primary recommendation:** Follow existing patterns strictly. The verify endpoint mirrors `/api/stay/verify` but for room-based access. The bottom sheet follows `ContactSheet.tsx` pattern. Token replacement uses the same localStorage keys already shared between hooks.

## Standard Stack

### Core (Already in Codebase)

| Library                 | Version     | Purpose                          | Status                        |
| ----------------------- | ----------- | -------------------------------- | ----------------------------- |
| `jose`                  | (installed) | JWT signing/verification (HS256) | Already used in `lib/auth.ts` |
| `date-fns`              | (installed) | Date math for token expiry       | Already used in room route    |
| `@phosphor-icons/react` | (installed) | Icons for verification UI        | Already used throughout       |
| Next.js App Router      | 14.2.33     | API routes, pages                | Already in use                |

### Supporting (Already Available)

| Library                             | Purpose                                 | When to Use                    |
| ----------------------------------- | --------------------------------------- | ------------------------------ |
| `String.prototype.normalize('NFD')` | Unicode normalization for name matching | Built-in JS, no library needed |
| `Intl.Collator`                     | Locale-sensitive string comparison      | Built-in JS, no library needed |

### No New Dependencies Needed

The phase requires zero new npm packages. All functionality is achievable with existing libraries and browser APIs.

## Architecture Patterns

### Existing JWT Flow (auth.ts)

The JWT system is already two-tier ready:

```typescript
// lib/auth.ts - CURRENT STATE
export interface GuestTokenPayload {
  bookingId: string; // null for browse, UUID for full
  propertyId: string;
  checkoutDate: string;
  accessTier?: 'browse' | 'full'; // Already defined!
  roomCode?: string;
}

// signGuestToken already accepts accessTier
export async function signGuestToken(payload: {
  bookingId: string | null;
  propertyId: string;
  checkoutDate: string;
  accessTier?: 'browse' | 'full';
  roomCode?: string;
}): Promise<string>;

// verifyGuestToken already returns accessTier
// Default: 'full' for backward compat (old tokens without claim)
```

**Key insight:** Backward compatibility is already handled. Old tokens without `accessTier` default to `'full'` in `verifyGuestToken`. This means existing `/stay/[code]` flow tokens work as full-tier automatically.

### Existing Session Hooks

**useRoomSession.ts** (browse tier, Phase 25):

- Auto-resolves room code on mount via `GET /api/stay/room/[roomCode]`
- Stores token + stay data in `gudbro_stay_token` / `gudbro_stay_data` localStorage keys
- Checks `isMatchingRoomSession()` by verifying `accessTier === 'browse'` and matching roomCode
- Returns `{ token, stay, isLoading, hasActiveBooking, error, refresh }`
- Does NOT expose a `verify()` method (Phase 26 adds this)

**useStaySession.ts** (full tier, existing booking flow):

- Reads token from localStorage on mount
- Provides `verify(bookingCode, lastName)` method
- Uses SAME localStorage keys (`gudbro_stay_token`, `gudbro_stay_data`)
- Returns `{ token, stay, isLoading, isAuthenticated, verify, logout }`

**Shared keys design:** Both hooks write to the same localStorage keys. "Latest wins" -- a room scan overwrites a booking session and vice versa. This is intentional and documented.

### Existing API Authentication Pattern

Every write endpoint uses the same `authenticateGuest` helper:

```typescript
// Pattern used in orders/route.ts, services/route.ts
async function authenticateGuest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  if (!token) return null;
  try {
    return await verifyGuestToken(token);
  } catch {
    return null;
  }
}
```

**Current gap:** This helper validates the token but does NOT check `accessTier`. All valid tokens (browse or full) pass authentication. Phase 26 must add tier checking to write endpoints.

### Existing Bottom Sheet Patterns

Two patterns in the codebase:

**1. ContactSheet.tsx** (simple bottom sheet):

```tsx
// Pattern: backdrop + absolute positioned sheet
{
  isOpen && (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 pb-24">
        <div className="mb-5 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-gray-300" />{' '}
          {/* Drag handle */}
        </div>
        {/* Content */}
      </div>
    </div>
  );
}
```

**2. CartDrawer.tsx** (more complex, with states):

```tsx
// Pattern: backdrop + fixed sheet with max-height
<>
  <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
  <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] flex-col rounded-t-3xl bg-white shadow-2xl">
    {/* Header with close button */}
    {/* Scrollable content */}
    {/* Footer with CTA */}
  </div>
</>
```

**Recommendation:** Use CartDrawer pattern (more robust) for the InlineVerification component. It handles header, content area, and footer CTA cleanly.

### Existing Database Patterns for Verification

**verify_booking_access** (migration 077):

```sql
-- Validates booking code + last name + active dates
CREATE OR REPLACE FUNCTION verify_booking_access(p_booking_code TEXT, p_last_name TEXT)
RETURNS TABLE(is_valid BOOLEAN, property_id UUID, booking_id UUID, ...)
-- Uses: LOWER(b.guest_last_name) = LOWER(p_last_name)
-- Checks: check_in_date <= CURRENT_DATE AND check_out_date + 24h >= NOW()
-- Status filter: IN ('confirmed', 'checked_in')
```

**resolve_room_access** (migration 088):

```sql
-- Maps room code to active booking
CREATE OR REPLACE FUNCTION resolve_room_access(p_room_code TEXT)
RETURNS TABLE(is_valid BOOLEAN, has_active_booking BOOLEAN, property_id UUID, booking_id UUID, ...)
-- Uses timezone-aware date: (NOW() AT TIME ZONE property.timezone)::DATE
-- Status filter: IN ('confirmed', 'checked_in')
```

## Codebase Findings

### 1. Token Upgrade Path

The upgrade path is straightforward because of the shared localStorage keys:

1. Guest has browse-tier token (from `useRoomSession`)
2. Guest triggers verification
3. API returns new full-tier token with same bookingId
4. Client replaces token in `gudbro_stay_token`
5. Client updates stay data in `gudbro_stay_data` (now includes guest name, booking code)
6. All API calls automatically use new token

**Critical detail:** The `useRoomSession` hook currently checks `isMatchingRoomSession` which requires `accessTier === 'browse'`. After upgrade to full tier, this check would fail on next page visit. The hook needs modification to recognize upgraded tokens (accessTier=full with matching roomCode) as valid cached sessions.

### 2. Database Schema - What Exists vs What's Needed

**accom_bookings table columns (current):**

- `guest_name TEXT NOT NULL` - first name
- `guest_last_name TEXT NOT NULL` - last name (used by verify_booking_access)
- `guest_email TEXT`
- `guest_phone TEXT`
- `guest_count INTEGER`
- `guest_country TEXT`
- `status TEXT` - CHECK IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')

**What needs adding:**

- `verification_pin TEXT` - 4-digit PIN per booking (nullable, only set if owner uses PIN method)

**accom_properties table - What needs adding:**

- `guest_verification_method TEXT DEFAULT 'last_name'` - CHECK IN ('last_name', 'pin')
- This is the per-property config that determines which verification UI to show

### 3. API Endpoints - Current vs Needed

**Existing endpoints and their tier requirements:**

| Endpoint                              | Method | Current Auth         | Needed Tier              |
| ------------------------------------- | ------ | -------------------- | ------------------------ |
| `GET /api/stay/room/[roomCode]`       | GET    | None (public)        | browse (no change)       |
| `GET /api/stay/[code]`                | GET    | None (public)        | browse (no change)       |
| `POST /api/stay/verify`               | POST   | None (creates token) | N/A (creates full token) |
| `GET /api/stay/[code]/services`       | GET    | Bearer token         | browse (read-only)       |
| `GET /api/stay/[code]/deals`          | GET    | Bearer token         | browse (read-only)       |
| `GET /api/stay/[code]/property`       | GET    | Bearer token         | browse (read-only)       |
| `GET /api/stay/[code]/useful-numbers` | GET    | Bearer token         | browse (read-only)       |
| `GET /api/stay/[code]/orders`         | GET    | Bearer token         | **full** (own orders)    |
| `POST /api/stay/[code]/orders`        | POST   | Bearer token         | **full** (creates order) |

**New endpoint needed:**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `POST /api/stay/room/[roomCode]/verify` | POST | Upgrade browse token to full |

### 4. Frontend - Where Paid Actions Are Triggered

From the room dashboard page (`app/stay/room/[roomCode]/page.tsx`), paid actions are currently:

- **Not shown at all** in browse tier (Phase 25 explicitly excluded them)
- There is a "coming soon" notice placeholder at line 167-175

From the full stay dashboard (`app/stay/[code]/page.tsx`), paid actions are:

- **ServicesCarousel** - browse services, add to cart
- **CartDrawer** - place order (calls `POST /api/stay/[code]/orders`)
- **QuickActions** - room service, housekeeping, etc. (currently WhatsApp links)
- **ActiveOrders** - view order status

**Integration approach:** After Phase 26, the room dashboard should show services (browse-tier viewable) but trigger the verification modal when guest taps "Add to cart" or "Place Order". This means:

1. Show `ServicesCarousel` in browse tier (read-only, services endpoint is browse-tier)
2. Intercept cart add / order placement actions
3. If `accessTier === 'browse'`, show InlineVerification modal
4. On success, proceed with the original action

### 5. The Room Dashboard Upgrade Path

Currently the room page has two render states:

1. **No active booking** - minimal property info
2. **Active booking, browse tier** - property info + dates + "coming soon" notice

After Phase 26, state 2 transforms to:

- Show services carousel (viewable in browse)
- Show quick actions (but some trigger verification)
- Cart/ordering becomes available after verification
- Active orders visible after verification

The page should NOT redirect to `/stay/[code]` after verification. Instead, it enhances in-place by re-rendering with full-tier data.

### 6. Unicode / International Name Handling

The existing `verify_booking_access` uses `LOWER()` for case-insensitive comparison. For international names:

```sql
-- Current: LOWER(b.guest_last_name) = LOWER(p_last_name)
-- Problem: LOWER() doesn't handle diacritics
-- "Nguyen" vs "Nguy\u1ec5n" would NOT match with LOWER()
```

For the new verify endpoint, use PostgreSQL's `unaccent` extension or implement partial matching:

```sql
-- Option A: unaccent extension (requires enabling it)
WHERE unaccent(LOWER(b.guest_last_name)) = unaccent(LOWER(p_last_name))

-- Option B: Partial match (first 3+ chars, case-insensitive)
-- More forgiving, handles encoding issues
WHERE LOWER(b.guest_last_name) LIKE LOWER(LEFT(p_last_name, 3)) || '%'
  AND LENGTH(p_last_name) >= 3
```

**Recommendation:** Use partial match (Option B) as decided in CONTEXT.md ("first 3+ chars accepted to handle encoding issues"). This is simpler and more forgiving without needing a PostgreSQL extension.

### 7. Rate Limiting / Brute Force Protection

No existing rate limiting pattern in the codebase. The CONTEXT specifies:

- Max 5 attempts before 5-minute cooldown
- Then 5 more attempts

Implementation options:

- **In-memory (API route):** Simple but resets on deploy/restart. Not great for production.
- **Database-backed:** Add attempt counter to the session or a separate table.
- **localStorage-based (client):** Track attempts client-side. Easy to bypass but sufficient for UX protection.

**Recommendation:** Combine client-side tracking (for UI) with a lightweight server-side check. Use a simple in-memory Map keyed by room code with TTL cleanup. For Phase 26, this is sufficient -- hardened rate limiting can come in Phase 27 (Security Configuration).

## Don't Hand-Roll

| Problem               | Don't Build       | Use Instead                                                   | Why                                             |
| --------------------- | ----------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| JWT signing           | Custom crypto     | `jose` library (`signGuestToken`)                             | Already in codebase, battle-tested              |
| Unicode normalization | regex stripping   | `String.normalize('NFD')` + `replace(/[\u0300-\u036f]/g, '')` | Browser native, handles Vietnamese/Thai/Chinese |
| Bottom sheet          | npm component lib | Copy `CartDrawer.tsx` pattern                                 | Matches existing design, zero new deps          |
| Token storage         | New storage key   | Same `gudbro_stay_token` key                                  | Already designed for "latest wins"              |
| API auth              | New middleware    | Extend existing `authenticateGuest`                           | DRY, consistent                                 |

## Common Pitfalls

### Pitfall 1: Breaking Existing Booking Flow

**What goes wrong:** Adding accessTier checking to API endpoints breaks the existing `/stay/[code]` flow, which issues tokens without an explicit `accessTier` claim.
**Why it happens:** Old tokens from `POST /api/stay/verify` don't include `accessTier`.
**How to avoid:** `verifyGuestToken` already defaults to `'full'` when `accessTier` is undefined. The tier check must treat `undefined` as `'full'`:

```typescript
const tier = guest.accessTier || 'full'; // backward compat
if (tier !== 'full') return 403;
```

**Warning signs:** Existing stay dashboard stops working after deploy.

### Pitfall 2: useRoomSession Cache Invalidation After Upgrade

**What goes wrong:** After upgrading to full tier, `useRoomSession` on next visit sees the full-tier token, fails `isMatchingRoomSession` check (which expects `accessTier === 'browse'`), and re-resolves the room -- which overwrites the full-tier token with a new browse-tier one.
**Why it happens:** `isMatchingRoomSession` is too strict.
**How to avoid:** Modify the check to accept both browse and full tokens with matching `roomCode`:

```typescript
function isMatchingRoomSession(token: string, roomCode: string): boolean {
  const payload = decodeJwtPayload(token);
  return payload?.roomCode === roomCode; // Remove accessTier check
}
```

**Warning signs:** Guest loses full-tier access after navigating away and back.

### Pitfall 3: PIN Not in Database Schema

**What goes wrong:** Trying to verify against PIN but no column exists.
**Why it happens:** `accom_bookings` doesn't have a `verification_pin` column yet.
**How to avoid:** Migration must run BEFORE the API endpoint is deployed. Include migration in Plan 26-01 (backend).

### Pitfall 4: Partial Name Match Too Loose

**What goes wrong:** 3-character partial match on common name prefixes (e.g., "Ngu" in Vietnam) could match multiple bookings for same room.
**Why it happens:** Short prefix + common names.
**How to avoid:** The verify function should match against the SPECIFIC booking for this room (not all bookings). The query must join through room_id from the room code resolution:

```sql
WHERE b.room_id = v_room_id  -- scoped to this room
  AND LOWER(b.guest_last_name) LIKE LOWER(LEFT(p_value, 3)) || '%'
  AND b.status IN ('confirmed', 'checked_in')
```

This scopes to only the active booking for this specific room.

### Pitfall 5: Token Expiry After Upgrade

**What goes wrong:** Browse token issued with 7-day expiry (no-booking case) gets upgraded to full, but expiry stays 7 days instead of checkout+24h.
**Why it happens:** The upgrade endpoint must issue a NEW token with proper expiry.
**How to avoid:** The verify endpoint signs a completely new token with the booking's checkout date:

```typescript
const token = await signGuestToken({
  bookingId: booking.id,
  propertyId: booking.property_id,
  checkoutDate: booking.check_out_date, // proper date
  accessTier: 'full',
  roomCode: roomCode, // preserve room code
});
```

### Pitfall 6: Stay Data Not Updated After Verification

**What goes wrong:** Token upgrades to full tier but `gudbro_stay_data` still has browse-tier data (empty guest name, empty booking code).
**Why it happens:** Only the token is replaced, not the stay data.
**How to avoid:** The verify endpoint must return BOTH the new token AND updated stay data (with guest name, booking code, guest count populated). The client must update both localStorage values.

## Code Examples

### Verify Room Session Endpoint (Pseudocode)

```typescript
// POST /api/stay/room/[roomCode]/verify
export async function POST(
  request: NextRequest,
  { params }: { params: { roomCode: string } }
) {
  const { roomCode } = params;
  const { method, value } = await request.json();

  // 1. Resolve room to active booking (reuse existing function)
  const { data: rpcData } = await supabase.rpc('resolve_room_access', {
    p_room_code: roomCode,
  });
  const result = rpcData?.[0];

  if (!result?.has_active_booking) {
    return NextResponse.json({ error: 'no_active_booking' }, { status: 404 });
  }

  // 2. Verify based on method
  if (method === 'lastName') {
    // Partial match: first 3+ chars, case-insensitive
    const booking = await fetchBookingForRoom(result.booking_id);
    const normalizedInput = normalizeForComparison(value);
    const normalizedStored = normalizeForComparison(booking.guest_last_name);

    if (
      !normalizedStored.startsWith(normalizedInput) ||
      normalizedInput.length < 3
    ) {
      return NextResponse.json(
        { error: 'verification_failed' },
        { status: 401 }
      );
    }
  } else if (method === 'pin') {
    // Exact match on 4-digit PIN
    const booking = await fetchBookingForRoom(result.booking_id);
    if (booking.verification_pin !== value) {
      return NextResponse.json(
        { error: 'verification_failed' },
        { status: 401 }
      );
    }
  }

  // 3. Sign full-tier token
  const token = await signGuestToken({
    bookingId: result.booking_id,
    propertyId: result.property_id,
    checkoutDate: result.check_out,
    accessTier: 'full',
    roomCode,
  });

  // 4. Return token + full stay data
  return NextResponse.json({ data: { token, stay: fullStayData } });
}
```

### Access Tier Guard (Reusable Helper)

```typescript
// lib/auth.ts - addition
export function requireFullAccess(guest: GuestTokenPayload): boolean {
  return (guest.accessTier || 'full') === 'full';
}

// Usage in write endpoints:
const guest = await authenticateGuest(request);
if (!guest) return 401;
if (!requireFullAccess(guest)) {
  return NextResponse.json({ error: 'verification_required' }, { status: 403 });
}
```

### Unicode Name Normalization

```typescript
// Normalize for comparison: remove diacritics, lowercase
function normalizeForComparison(name: string): string {
  return name
    .normalize('NFD') // decompose diacritics
    .replace(/[\u0300-\u036f]/g, '') // strip combining marks
    .toLowerCase()
    .trim();
}

// "Nguyen" -> "nguyen"
// "Nguy\u1ec5n" -> "nguyen"
// "Muller" -> "muller"
// "Mueller" -> "mueller"
```

### useRoomSession Upgrade Method

```typescript
// Addition to useRoomSession hook
const upgradeSession = useCallback(
  async (method: string, value: string) => {
    const res = await fetch(`/api/stay/room/${roomCode}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, value }),
    });

    const json = await res.json();
    if (!res.ok || json.error) {
      return { success: false, error: json.error };
    }

    // Replace both token and stay data
    localStorage.setItem(TOKEN_KEY, json.data.token);
    localStorage.setItem(STAY_KEY, JSON.stringify(json.data.stay));
    setToken(json.data.token);
    setStay(json.data.stay);

    return { success: true };
  },
  [roomCode]
);
```

## State of the Art

| Aspect                | Current State                 | After Phase 26                              |
| --------------------- | ----------------------------- | ------------------------------------------- |
| Room QR scan          | Browse-only dashboard         | Browse + upgrade to full                    |
| Verification          | Booking code flow only        | Room code + inline verify                   |
| JWT accessTier        | Defined but unused for gating | Used to gate write endpoints                |
| Service ordering      | Only via /stay/[code]         | Also via /stay/room/[roomCode] after verify |
| Multi-guest           | N/A                           | Shared PIN, independent device sessions     |
| Checkout invalidation | Token expires naturally       | Active check via resolve_room_access        |

## Plan Structure Recommendation

### Plan 26-01: Backend (JWT tier gating + verify endpoint + migration)

**Scope:**

1. Database migration: add `verification_pin` to `accom_bookings`, add `guest_verification_method` to `accom_properties`
2. Create new RPC function `verify_room_booking_access(p_room_code, p_method, p_value)` in SQL
3. Create API route `POST /api/stay/room/[roomCode]/verify`
4. Add `requireFullAccess` guard to `lib/auth.ts`
5. Apply access tier check to `POST /api/stay/[code]/orders` (the main write endpoint)
6. Update `resolve_room_access` to also return `guest_verification_method` from property

**Why first:** Frontend depends on the API endpoint existing.

### Plan 26-02: Frontend (InlineVerification component + hook upgrade + integration)

**Scope:**

1. Create `InlineVerification` bottom sheet component
2. Extend `useRoomSession` with `upgradeSession()` method and `accessTier` state
3. Fix `isMatchingRoomSession` to accept full-tier tokens
4. Update room dashboard to show services in browse tier
5. Integrate verification trigger on cart actions
6. Handle success animation and session upgrade flow
7. Client-side rate limiting (attempt tracking)

**Why second:** Depends on verify API endpoint from 26-01.

## Open Questions

1. **Should `GET /api/stay/[code]/orders` require full tier?** Currently browse-tier guests have no orders, so it's moot. But for safety, gating it to full tier is cleaner. Recommend: yes, gate to full.

2. **What happens if property has no verification method set?** Default to `last_name` (as per CONTEXT.md). The migration should set default.

3. **Should the verify endpoint return the property's verification method?** The room resolve endpoint (`GET /api/stay/room/[roomCode]`) should include `verificationMethod` so the frontend knows which input to show BEFORE the user triggers verification. This requires a small update to the room resolve response type.

## Sources

### Primary (HIGH confidence - direct codebase reads)

- `apps/accommodations/frontend/lib/auth.ts` - JWT implementation with accessTier support
- `apps/accommodations/frontend/hooks/useRoomSession.ts` - Browse-tier session hook
- `apps/accommodations/frontend/hooks/useStaySession.ts` - Full-tier session hook
- `apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts` - Room resolve endpoint
- `apps/accommodations/frontend/app/api/stay/verify/route.ts` - Booking verify endpoint
- `apps/accommodations/frontend/app/api/stay/[code]/orders/route.ts` - Order endpoint (auth pattern)
- `apps/accommodations/frontend/app/stay/room/[roomCode]/page.tsx` - Room dashboard page
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - Stay dashboard page
- `apps/accommodations/frontend/components/stay/CartDrawer.tsx` - Bottom sheet pattern
- `apps/accommodations/frontend/components/stay/ContactSheet.tsx` - Bottom sheet pattern
- `apps/accommodations/frontend/types/stay.ts` - Type definitions
- `shared/database/migrations/schema/077-accommodations-schema.sql` - Base schema
- `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` - Service orders
- `shared/database/migrations/schema/088-room-codes.sql` - Room codes + resolve function

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - all libraries already in codebase, no new deps
- Architecture: HIGH - direct code reading, patterns clearly established
- Pitfalls: HIGH - identified from actual code patterns and edge cases
- Database: HIGH - read actual migrations, schema fully understood
- Unicode handling: MEDIUM - approach is sound but not yet validated with real Vietnamese names in DB

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable codebase, no external dependencies changing)
