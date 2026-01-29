# Phase 5: API Layer - Research

**Researched:** 2026-01-29
**Domain:** Next.js 14 API Routes + Supabase + JWT guest sessions
**Confidence:** HIGH

## Summary

This phase builds five API routes in the Accommodations frontend (`apps/accommodations/frontend/`) that serve stay data to the guest dashboard. The codebase already has mature patterns for Next.js API routes with Supabase in both the coffeeshop and backoffice apps, so the primary challenge is not technical novelty but rather applying existing patterns correctly while adding JWT-based guest session management.

The standard approach is: use `jose` for JWT signing/verification (edge-compatible, zero deps), use the Supabase service role client for all API routes (since the `verify_booking_access` function is SECURITY DEFINER and partner_conventions has no anon grant), and follow the existing `NextRequest`/`NextResponse` pattern from the coffeeshop app.

**Primary recommendation:** Use `jose` v6 for JWT, Supabase service role client for all routes, and follow the existing coffeeshop API route pattern (`createClient` from `@supabase/supabase-js` with service role key). Keep it simple -- no middleware auth layer, just a shared `verifyGuestToken()` helper.

## Standard Stack

### Core

| Library                 | Version               | Purpose            | Why Standard                                                                                                                                              |
| ----------------------- | --------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jose`                  | ^6.x                  | JWT sign/verify    | Edge-compatible, zero deps, 1M+ projects, works in Vercel serverless. The standard for Next.js JWT. NOT `jsonwebtoken` (Node.js-only, won't work on Edge) |
| `@supabase/supabase-js` | (already in monorepo) | DB client          | Already used across coffeeshop and backoffice apps                                                                                                        |
| `next`                  | 14.2.33               | API Route Handlers | Already pinned in accommodations package.json                                                                                                             |

### Supporting

| Library    | Version | Purpose                    | When to Use                                                                            |
| ---------- | ------- | -------------------------- | -------------------------------------------------------------------------------------- |
| `date-fns` | ^3.3.1  | Date math for token expiry | Already in accommodations package.json. Use for checkout date + 24h buffer calculation |

### Alternatives Considered

| Instead of       | Could Use      | Tradeoff                                                                          |
| ---------------- | -------------- | --------------------------------------------------------------------------------- |
| `jose`           | `jsonwebtoken` | Does NOT work on Edge Runtime. `jose` is the modern standard for Next.js          |
| `jose`           | Supabase Auth  | Overkill -- guests don't have accounts, just booking codes. Custom JWT is simpler |
| Service Role Key | Anon Key       | Won't work for partner_conventions (no anon grant) or bookings (no anon policy)   |

**Installation:**

```bash
cd apps/accommodations/frontend
pnpm add jose @supabase/supabase-js
```

## Architecture Patterns

### Recommended Project Structure

```
apps/accommodations/frontend/
├── app/
│   └── api/
│       └── stay/
│           ├── [code]/
│           │   ├── route.ts          # GET /api/stay/[code] - public booking lookup
│           │   ├── services/
│           │   │   └── route.ts      # GET /api/stay/[code]/services - auth required
│           │   ├── deals/
│           │   │   └── route.ts      # GET /api/stay/[code]/deals - auth required
│           │   └── property/
│           │       └── route.ts      # GET /api/stay/[code]/property - auth required
│           └── verify/
│               └── route.ts          # POST /api/stay/verify - returns JWT
├── lib/
│   ├── supabase.ts                   # Supabase service role client (server-only)
│   └── auth.ts                       # JWT sign/verify helpers
└── types/
    └── stay.ts                       # TypeScript types for API responses
```

### Pattern 1: Supabase Service Role Client (Server-Only)

**What:** Lazy-initialized Supabase client with service role key, following backoffice pattern
**When to use:** All API routes (service role bypasses RLS, needed for bookings + conventions)
**Example:**

```typescript
// lib/supabase.ts
// Source: apps/backoffice/lib/supabase-admin.ts (existing codebase pattern)
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Missing Supabase env vars');
    _client = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _client;
}
```

### Pattern 2: JWT Guest Token with jose

**What:** Sign JWT after booking verification, verify on protected routes
**When to use:** POST /verify signs token; GET /services, /deals, /property verify token
**Example:**

```typescript
// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.GUEST_JWT_SECRET);

interface GuestTokenPayload {
  bookingId: string;
  propertyId: string;
}

export async function signGuestToken(
  payload: GuestTokenPayload,
  expiresAt: Date
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(secret);
}

export async function verifyGuestToken(
  token: string
): Promise<GuestTokenPayload> {
  const { payload } = await jwtVerify(token, secret);
  return {
    bookingId: payload.bookingId as string,
    propertyId: payload.propertyId as string,
  };
}
```

### Pattern 3: Consistent Error Response Wrapper

**What:** All routes return `{ data, error }` with appropriate HTTP status codes
**When to use:** Every API route
**Example:**

```typescript
// Source: Existing pattern in apps/coffeeshop/frontend/app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Success
return NextResponse.json({ data: stayData, error: null });

// Client error
return NextResponse.json(
  { data: null, error: 'booking_not_found' },
  { status: 404 }
);

// Server error
return NextResponse.json(
  { data: null, error: 'internal_error' },
  { status: 500 }
);
```

### Pattern 4: Auth Guard for Protected Routes

**What:** Extract and verify JWT from Authorization header before processing request
**When to use:** /services, /deals, /property routes
**Example:**

```typescript
// Shared auth check at top of protected routes
function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}

// In route handler:
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json(
      { data: null, error: 'session_required' },
      { status: 401 }
    );
  }

  let guest;
  try {
    guest = await verifyGuestToken(token);
  } catch {
    return NextResponse.json(
      { data: null, error: 'session_expired' },
      { status: 401 }
    );
  }
  // ... proceed with guest.bookingId, guest.propertyId
}
```

### Anti-Patterns to Avoid

- **Using anon key for API routes:** The bookings table has NO anon SELECT policy. The `verify_booking_access()` function is SECURITY DEFINER (runs as owner), but it's called via `.rpc()` which still needs a client. Service role is cleaner for server-side routes.
- **Storing JWT secret in NEXT*PUBLIC* env var:** JWT secret must be server-only. Use `GUEST_JWT_SECRET` (no NEXT*PUBLIC* prefix).
- **Creating separate Supabase client per route:** Use a shared lazy-initialized singleton (Pattern 1). Module-level singletons work fine in serverless because cold starts get fresh instances.
- **Using `jsonwebtoken` package:** Does not work on Vercel Edge Runtime. Always use `jose`.

## Don't Hand-Roll

| Problem               | Don't Build         | Use Instead                                 | Why                                                                                                  |
| --------------------- | ------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| JWT sign/verify       | Custom HMAC signing | `jose` SignJWT/jwtVerify                    | Edge-compatible, handles claims validation, exp checking                                             |
| Booking verification  | Custom SQL query    | `verify_booking_access()` Postgres function | Already exists in migration 077, handles date checks, case-insensitive name match, status validation |
| Date calculations     | Manual date math    | `date-fns` addHours/addDays                 | Already in package.json, handles timezone edge cases                                                 |
| Error response format | Ad-hoc JSON shapes  | Consistent `{ data, error }` pattern        | Existing codebase convention from coffeeshop                                                         |

**Key insight:** The database layer already does the hard work. The `verify_booking_access()` function validates booking code + last name + active dates + valid statuses. API routes just need to call `.rpc('verify_booking_access', ...)` and wrap the result.

## Common Pitfalls

### Pitfall 1: partner_conventions Has No Anon Access

**What goes wrong:** Deals route fails with permission denied when using anon key
**Why it happens:** Migration 050 only grants to `authenticated` role, not `anon`. No RLS policy for anon either.
**How to avoid:** Use service role client for ALL routes. This is a server-side API, not a browser client.
**Warning signs:** Empty results from partner_conventions queries, or explicit permission errors in Supabase logs.

### Pitfall 2: JWT Secret Not Set in Environment

**What goes wrong:** API routes crash on first request, 500 errors
**Why it happens:** New env var `GUEST_JWT_SECRET` needs to be added to `.env.local` and Vercel
**How to avoid:** Add env var setup as first task. Generate a strong random secret (32+ bytes). Document required env vars.
**Warning signs:** "Missing env var" errors in server logs.

### Pitfall 3: Token Expiry Calculation Off

**What goes wrong:** Guest loses access before checkout, or retains access too long after
**Why it happens:** Context says "checkout date + 24h buffer" but checkout is a DATE (no time). Need to combine with property's `check_out_time`.
**How to avoid:** Calculate expiry as: `check_out_date` at `check_out_time` (from property) + 24 hours. Use `date-fns` for safe date math.
**Warning signs:** Guest reports being locked out on checkout day morning.

### Pitfall 4: Booking Code in URL Path Leaks to Protected Data

**What goes wrong:** Someone with just a booking code accesses services/deals without verification
**Why it happens:** The `[code]` param is in the URL path for all routes
**How to avoid:** The booking code in URL is fine for the public route (minimal data). Protected routes (`/services`, `/deals`, `/property`) MUST validate JWT, not just the code in the URL. The JWT contains the bookingId/propertyId -- use those for data queries, not the URL param.
**Warning signs:** Data returned without Authorization header on protected routes.

### Pitfall 5: verify_booking_access Returns Empty Result Set

**What goes wrong:** Route handler assumes `.single()` and crashes when no match
**Why it happens:** The function returns a row with `is_valid = false` when no match. But Supabase `.rpc()` returns an array, not a single row.
**How to avoid:** Call `.rpc('verify_booking_access', { ... })` and check `data[0]?.is_valid`. Don't use `.single()` with RPC calls that return TABLE type.
**Warning signs:** Unhandled null/undefined when destructuring RPC result.

### Pitfall 6: Dynamic Route Param Access in Next.js 14

**What goes wrong:** `params.code` is undefined or requires await
**Why it happens:** Next.js 14.2 route handlers receive params as the second argument: `{ params: { code: string } }`
**How to avoid:** Use the standard pattern: `export async function GET(request: NextRequest, { params }: { params: { code: string } })`
**Warning signs:** TypeScript error on params access, runtime undefined.

## Code Examples

### Example 1: POST /api/stay/verify (Full Implementation Pattern)

```typescript
// Source: Combines existing patterns from coffeeshop/orders/route.ts + jose docs
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { signGuestToken } from '@/lib/auth';
import { addHours } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { bookingCode, lastName } = await request.json();

    if (!bookingCode || !lastName) {
      return NextResponse.json(
        { data: null, error: 'booking_code_and_last_name_required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.rpc('verify_booking_access', {
      p_booking_code: bookingCode,
      p_last_name: lastName,
    });

    if (error) {
      console.error('verify_booking_access error:', error);
      return NextResponse.json(
        { data: null, error: 'internal_error' },
        { status: 500 }
      );
    }

    const result = data?.[0];
    if (!result?.is_valid) {
      // Generic message -- don't reveal if code exists
      return NextResponse.json(
        { data: null, error: 'verification_failed' },
        { status: 401 }
      );
    }

    // Calculate token expiry: checkout date + 24h
    const checkoutDate = new Date(result.check_out);
    const expiresAt = addHours(checkoutDate, 24);

    const token = await signGuestToken(
      { bookingId: result.booking_id, propertyId: result.property_id },
      expiresAt
    );

    return NextResponse.json({
      data: {
        token,
        guestName: result.guest_name,
        checkIn: result.check_in,
        checkOut: result.check_out,
      },
      error: null,
    });
  } catch (err) {
    console.error('POST /api/stay/verify error:', err);
    return NextResponse.json(
      { data: null, error: 'internal_error' },
      { status: 500 }
    );
  }
}
```

### Example 2: GET /api/stay/[code]/services (Protected Route Pattern)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  // 1. Auth check
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { data: null, error: 'session_required' },
      { status: 401 }
    );
  }

  let guest;
  try {
    guest = await verifyGuestToken(authHeader.slice(7));
  } catch {
    return NextResponse.json(
      { data: null, error: 'session_expired' },
      { status: 401 }
    );
  }

  // 2. Fetch services for the property (use propertyId from JWT, not URL)
  const supabase = getSupabaseAdmin();
  const { data: categories, error } = await supabase
    .from('accom_service_categories')
    .select(
      `
      id,
      name,
      slug,
      icon,
      display_order,
      accom_service_items!inner (
        id, name, description, price,
        image_url, is_always_available,
        available_from, available_until,
        display_order
      )
    `
    )
    .eq('property_id', guest.propertyId)
    .eq('is_active', true)
    .order('display_order');

  if (error) {
    console.error('services error:', error);
    return NextResponse.json(
      { data: null, error: 'internal_error' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    data: { categories: categories || [] },
    error: null,
  });
}
```

### Example 3: GET /api/stay/[code]/deals (Convention Query Pattern)

```typescript
// Key query: partner_conventions WHERE partner_id = propertyId AND partner_type = 'accommodation'
const { data: deals, error } = await supabase
  .from('partner_conventions')
  .select(
    `
    id,
    convention_name,
    benefit_type,
    benefit_value,
    benefit_description,
    benefit_conditions,
    merchant_id,
    merchants!inner (
      name,
      slug,
      city
    )
  `
  )
  .eq('partner_type', 'accommodation')
  .eq('partner_id', guest.propertyId)
  .eq('is_active', true);
```

## State of the Art

| Old Approach                 | Current Approach            | When Changed             | Impact                                                               |
| ---------------------------- | --------------------------- | ------------------------ | -------------------------------------------------------------------- |
| `jsonwebtoken` npm           | `jose` npm                  | 2023+                    | Edge Runtime compatibility required by Next.js Middleware and Vercel |
| Module-level Supabase client | Lazy-initialized singleton  | Current in this codebase | Prevents build-time crashes when env vars aren't set                 |
| Cookie-based sessions        | JWT in Authorization header | N/A (design decision)    | Stateless, no server-side session storage needed for guest access    |

**Deprecated/outdated:**

- `jsonwebtoken`: Still works in Node.js but incompatible with Edge Runtime. Use `jose` instead.
- Next.js 12/13 API Routes pattern (`pages/api/`): This codebase uses App Router route handlers (`app/api/`). Follow that pattern.

## Open Questions

1. **Supabase RPC result format**
   - What we know: `verify_booking_access` returns `TABLE(is_valid BOOLEAN, ...)`. Supabase `.rpc()` should return this as an array.
   - What's unclear: Exact shape of the response when called from `@supabase/supabase-js` `.rpc()` -- is it `{ data: [{is_valid: true, ...}], error: null }`? Need to test with actual seed data.
   - Recommendation: Test during implementation with seed booking BK-T3ST01 / Smith. If `.rpc()` returns unexpected shape, adapt. LOW risk.

2. **Nested select on partner_conventions -> merchants**
   - What we know: Deals query needs merchant name alongside convention data. The `merchant_id` FK exists.
   - What's unclear: Whether Supabase PostgREST syntax `merchants!inner(name, slug, city)` works with the FK on `partner_conventions.merchant_id`.
   - Recommendation: Test during implementation. Fallback: two separate queries (conventions + merchants by IDs). LOW risk.

3. **`check_out_time` for precise token expiry**
   - What we know: Context says "token valid until checkout date + 24h buffer". Property has `check_out_time` (TIME field, default 11:00).
   - What's unclear: Whether we should combine `check_out_date + check_out_time + 24h` or just `check_out_date + 24h` (simpler).
   - Recommendation: Use simpler approach `check_out_date + 24h` (midnight of checkout date + 24h). The 24h buffer already provides generous coverage. MEDIUM risk if checkout is at 23:00 and someone checks late, but edge case.

## Sources

### Primary (HIGH confidence)

- Existing codebase: `apps/coffeeshop/frontend/app/api/orders/route.ts` - API route pattern
- Existing codebase: `apps/backoffice/lib/supabase-admin.ts` - Service role client pattern
- Existing codebase: `shared/database/migrations/schema/077-accommodations-schema.sql` - Full schema with verify_booking_access function
- Existing codebase: `shared/database/migrations/schema/078-accommodations-seed.sql` - Seed data for testing
- Existing codebase: `shared/database/migrations/schema/050-b2b-conventions.sql` - partner_conventions table (grants: authenticated only, NO anon)
- [jose GitHub](https://github.com/panva/jose) - v6, edge-compatible, zero deps

### Secondary (MEDIUM confidence)

- [DEV Community - JWT Auth in Next.js 15](https://dev.to/sizan_mahmud0_e7c3fd0cb68/complete-guide-to-jwt-authentication-in-nextjs-15-from-setup-to-production-3cf4) - jose + Next.js pattern validation
- [Clerk Blog - JWT in Next.js](https://clerk.com/blog/how-do-i-handle-jwt-verification-in-nextjs) - Confirms jose as standard for Next.js JWT

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - jose is well-established, Supabase client patterns already exist in codebase
- Architecture: HIGH - Direct extension of existing coffeeshop/backoffice API patterns
- Pitfalls: HIGH - Verified RLS grants directly in migration SQL, confirmed no anon access to conventions

**Research date:** 2026-01-29
**Valid until:** 2026-03-01 (stable domain, no fast-moving dependencies)
