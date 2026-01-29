# Phase 6: In-Stay Dashboard - Research

**Researched:** 2026-01-29
**Domain:** Next.js 14 frontend integration (API wiring + DB extensions + session management)
**Confidence:** HIGH

## Summary

This phase connects the existing mock-heavy Accommodations In-Stay Dashboard (`apps/accommodations/frontend/app/stay/[code]/page.tsx`, ~1387 lines) to the real Phase 5 API routes, and extends the backend to serve data for sections not yet covered (visa rules, useful numbers, quick actions, return guest banner). The verification landing page (`app/page.tsx`) also needs to be replaced from its current property-listing mock to a clean booking verification screen.

The primary technical challenge is NOT complex -- it is architectural refactoring. The current dashboard is a single monolithic client component with ~1387 lines of mock data + JSX. This needs to be split into composable components, each fetching its own data or receiving it from a parent data loader. The existing codebase uses plain `fetch` for API calls (no SWR, no react-query in PWAs). The Phase 5 API routes return typed `{ data, error }` responses with `Authorization: Bearer <token>` authentication.

The secondary challenge is backend extension: creating new DB tables/columns and API routes for visa rules, useful numbers, quick actions, and return guest banner -- data that exists in the mock but has no Phase 5 equivalent.

**Primary recommendation:** Split the monolithic dashboard into ~8-10 components, create a `useStaySession` hook for JWT management + localStorage persistence, use plain fetch with typed wrappers for API calls, and create one new migration + 4 new API routes for the missing backend data.

## Standard Stack

### Core (Already in Codebase)

| Library                 | Version    | Purpose                                            | Why Standard                 |
| ----------------------- | ---------- | -------------------------------------------------- | ---------------------------- |
| `next`                  | 14.2.33    | App Router, API routes, dynamic routes             | Already pinned               |
| `jose`                  | ^6.x       | JWT verify (for token expiry checking client-side) | Already installed in Phase 5 |
| `date-fns`              | ^3.3.1     | Date math (countdown, days remaining)              | Already in package.json      |
| `@supabase/supabase-js` | (monorepo) | DB client for new API routes                       | Already in lib/supabase.ts   |

### Supporting (No New Dependencies Needed)

| Library               | Purpose            | Notes                                                           |
| --------------------- | ------------------ | --------------------------------------------------------------- |
| `navigator.clipboard` | Copy WiFi password | Browser API, already used in mock                               |
| `localStorage`        | JWT persistence    | Browser API, per CONTEXT.md decision                            |
| `fetch`               | API calls          | Native, matches coffeeshop pattern (no SWR/react-query in PWAs) |

### Alternatives Considered

| Instead of             | Could Use         | Why Not                                                                                                                                  |
| ---------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Plain fetch            | SWR / react-query | Overkill for this use case -- dashboard loads once, no real-time updates, no cache invalidation needed. Coffeeshop PWAs use plain fetch. |
| localStorage for JWT   | Cookies           | CONTEXT.md explicitly decided localStorage. In-room QR use case, convenience over security.                                              |
| Client-side JWT decode | jose client-side  | JWT payload can be decoded without verification (base64). No need to ship jose to client. But checking expiry needs `Date` only.         |

**Installation:** No new packages needed. All dependencies already exist.

## Architecture Patterns

### Recommended Project Structure

```
apps/accommodations/frontend/
├── app/
│   ├── page.tsx                          # REWRITE: Verification screen (was: property listing mock)
│   ├── stay/
│   │   └── [code]/
│   │       └── page.tsx                  # REWRITE: Dashboard shell (was: 1387-line monolith)
│   └── api/
│       └── stay/
│           ├── [code]/
│           │   ├── route.ts              # EXISTS (Phase 5)
│           │   ├── services/route.ts     # EXISTS (Phase 5)
│           │   ├── deals/route.ts        # EXISTS (Phase 5)
│           │   ├── property/route.ts     # EXISTS (Phase 5)
│           │   ├── useful-numbers/route.ts  # NEW: Emergency + city numbers
│           │   └── quick-actions/route.ts   # NEW: Property-configurable actions
│           └── verify/route.ts           # EXISTS (Phase 5)
├── components/
│   ├── stay/                             # NEW: Dashboard section components
│   │   ├── VerificationForm.tsx          # Booking code + last name form
│   │   ├── WifiCard.tsx                  # WiFi network + password + copy
│   │   ├── WelcomeCard.tsx              # Guest name, room, days countdown
│   │   ├── VisaStatusCard.tsx           # Visa progress bar + info sheet
│   │   ├── QuickActions.tsx             # Room service, concierge, etc.
│   │   ├── ServicesCarousel.tsx         # Horizontal scroll service categories
│   │   ├── LocalDeals.tsx              # Partner deals with tabs
│   │   ├── UsefulNumbers.tsx           # Emergency + city + property numbers
│   │   ├── ReturnGuestBanner.tsx       # Optional promo banner
│   │   ├── CheckoutInfo.tsx            # Checkout time + procedure
│   │   ├── ContactSheet.tsx            # Bottom sheet with host channels
│   │   └── DashboardHeader.tsx         # Property branding + lang/currency
│   └── BottomNav.tsx                    # EXISTS (needs minor update)
├── hooks/
│   └── useStaySession.ts               # NEW: JWT management + localStorage + fetch helpers
├── lib/
│   ├── supabase.ts                      # EXISTS (Phase 5)
│   ├── auth.ts                          # EXISTS (Phase 5, server-only)
│   └── stay-api.ts                      # NEW: Typed fetch wrappers for all API routes
├── types/
│   └── stay.ts                          # EXISTS (Phase 5, extend with new types)
└── styles/
    └── globals.css                      # EXISTS
```

### Pattern 1: Session Hook with localStorage Persistence

**What:** Single hook manages JWT token lifecycle: store after verify, retrieve on mount, clear on expire, provide to all fetch calls.
**When to use:** Every component that needs API access.
**Example:**

```typescript
// hooks/useStaySession.ts
'use client';
import { useState, useEffect, useCallback } from 'react';
import type { StayData, VerifyResponse } from '@/types/stay';

const TOKEN_KEY = 'gudbro_stay_token';
const STAY_KEY = 'gudbro_stay_data';

interface StaySession {
  token: string | null;
  stay: StayData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  verify: (
    bookingCode: string,
    lastName: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export function useStaySession(): StaySession {
  const [token, setToken] = useState<string | null>(null);
  const [stay, setStay] = useState<StayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: check localStorage for existing session
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedStay = localStorage.getItem(STAY_KEY);
    if (savedToken && savedStay) {
      // Check if token is expired by decoding exp claim
      try {
        const payload = JSON.parse(atob(savedToken.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setToken(savedToken);
          setStay(JSON.parse(savedStay));
        } else {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(STAY_KEY);
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(STAY_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const verify = useCallback(async (bookingCode: string, lastName: string) => {
    const res = await fetch('/api/stay/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingCode, lastName }),
    });
    const json = await res.json();
    if (json.error) return { success: false, error: json.error };

    const { token: newToken, stay: newStay } = json.data as VerifyResponse;
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(STAY_KEY, JSON.stringify(newStay));
    setToken(newToken);
    setStay(newStay);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STAY_KEY);
    setToken(null);
    setStay(null);
  }, []);

  return {
    token,
    stay,
    isLoading,
    isAuthenticated: !!token,
    verify,
    logout,
  };
}
```

### Pattern 2: Typed API Fetch Wrapper

**What:** Thin typed wrappers around fetch that add Authorization header and return typed responses.
**When to use:** Every component that fetches protected data.
**Example:**

```typescript
// lib/stay-api.ts
import type {
  ApiResponse,
  ServiceCategoryResponse,
  DealResponse,
  PropertyInfo,
  WifiInfo,
} from '@/types/stay';

async function fetchStayAPI<T>(
  path: string,
  token: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(path, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json: ApiResponse<T> = await res.json();
    if (json.error) return { data: null, error: json.error };
    return { data: json.data ?? null, error: null };
  } catch {
    return { data: null, error: 'network_error' };
  }
}

export function fetchServices(code: string, token: string) {
  return fetchStayAPI<ServiceCategoryResponse>(
    `/api/stay/${code}/services`,
    token
  );
}

export function fetchDeals(code: string, token: string) {
  return fetchStayAPI<DealResponse[]>(`/api/stay/${code}/deals`, token);
}

export function fetchProperty(code: string, token: string) {
  return fetchStayAPI<{ property: PropertyInfo; wifi: WifiInfo }>(
    `/api/stay/${code}/property`,
    token
  );
}
```

### Pattern 3: Component-Level Data Loading with Skeleton States

**What:** Each dashboard section component manages its own loading/error/data states. Parent passes token, component fetches its own data.
**When to use:** Services, Deals, Useful Numbers sections.
**Example:**

```typescript
// components/stay/ServicesCarousel.tsx
'use client';
import { useState, useEffect } from 'react';
import { fetchServices } from '@/lib/stay-api';
import type { ServiceCategoryWithItems } from '@/types/stay';

interface Props {
  bookingCode: string;
  token: string;
}

export function ServicesCarousel({ bookingCode, token }: Props) {
  const [categories, setCategories] = useState<ServiceCategoryWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices(bookingCode, token).then(({ data, error }) => {
      if (data) setCategories(data.categories);
      if (error) setError(error);
      setIsLoading(false);
    });
  }, [bookingCode, token]);

  if (isLoading) return <ServicesSkeleton />;
  if (error) return <ErrorCard message="Couldn't load services" />;
  if (categories.length === 0) return null; // No services configured
  // ... render
}
```

### Anti-Patterns to Avoid

- **Fetching all data in the dashboard page and passing down:** The page would become a single-point-of-failure waterfall. Better to let sections fetch independently and fail independently.
- **Using `useEffect` with token before checking isLoading:** The session hook starts with `isLoading=true`. Components must wait for session to resolve before fetching.
- **Importing `jose` on the client:** JWT expiry can be checked by decoding the base64 payload and reading `exp`. No need to ship jose to the browser bundle.
- **Using `router.push` after verify without waiting for state update:** After successful verify, navigate using `router.push('/stay/CODE')` only after localStorage is written. The stay page reads from localStorage on mount.

## Don't Hand-Roll

| Problem                   | Don't Build                | Use Instead                                            | Why                                                                                       |
| ------------------------- | -------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| JWT expiry check (client) | Full jose verify on client | `atob(token.split('.')[1])` + check `exp`              | No crypto needed client-side. We trust the token because we issued it.                    |
| Countdown timer           | setInterval recalculating  | `date-fns` differenceInCalendarDays + static display   | Real-time countdown is unnecessary -- days remaining is enough. Update on page load only. |
| Copy to clipboard         | Custom clipboard polyfill  | `navigator.clipboard.writeText()`                      | Modern browsers all support it. Fallback: textarea select/copy.                           |
| Price formatting          | Custom price formatter     | `Intl.NumberFormat` with currency                      | Native browser API, handles VND (no decimals), USD (2 decimals), etc.                     |
| WhatsApp deep links       | Custom URL builder         | `https://wa.me/PHONE?text=ENCODED_MSG`                 | Standard WhatsApp URL scheme. Pre-fill message with room number and property name.        |
| Loading skeletons         | Custom animated divs       | Tailwind `animate-pulse` on `bg-gray-200 rounded` divs | Already used in codebase, zero dependencies.                                              |

**Key insight:** This phase is about WIRING, not building. The UI already exists (mock). The API already exists (Phase 5). The primary work is connecting them and extending the backend for missing data.

## Common Pitfalls

### Pitfall 1: Monolith Page Won't Survive Real Data

**What goes wrong:** Trying to wire real data into the existing 1387-line monolithic page without splitting into components. Merge conflicts, state management nightmare, impossible to test sections independently.
**Why it happens:** "Just replace mock data" seems easier than refactoring.
**How to avoid:** Split first, wire second. Extract each section (WiFi, Welcome, Visa, Quick Actions, Services, Deals, Useful Numbers, Return Banner, Contact) into its own component BEFORE wiring API data.
**Warning signs:** Single file growing past 500 lines, multiple useEffect hooks competing for state.

### Pitfall 2: Mock Data Shape Mismatch with API Response

**What goes wrong:** The mock data in the current dashboard uses different field names, structures, and nesting than the Phase 5 API responses. Direct swap causes runtime errors.
**Why it happens:** Mock was designed for UI prototyping, API was designed from DB schema. They diverged.
**How to avoid:** Map exhaustively. Key mismatches to watch:

- Mock: `booking.wifi.network` / API: `stay.wifi.network` (same shape, different path)
- Mock: `services[].price` as string ("From $8") / API: `items[].price` as integer (65000 VND)
- Mock: `localDeals.tours[]` with tabs / API: `DealResponse[]` flat array without category tabs
- Mock: `booking.guestName` / API: `stay.booking.guestName` (same value, nested differently)
- Mock: `booking.unit.name` / API: `stay.room.name`
  **Warning signs:** `undefined` appearing in rendered text, prices showing as raw integers.

### Pitfall 3: Schema Field Name Discrepancy

**What goes wrong:** The verify route queries `guest_first_name` from `accom_bookings` but the schema only has `guest_name` and `guest_last_name` (no `guest_first_name` column).
**Why it happens:** The lookup route (`GET /api/stay/[code]`) references `guest_first_name` in its select statement but the actual migration 077 defines `guest_name TEXT NOT NULL` and `guest_last_name TEXT NOT NULL`.
**How to avoid:** The lookup route will fail or return null for that field. Before wiring the frontend verification screen, verify the actual column name. The verify route correctly uses `guest_name` (via `verify_booking_access` function which returns `b.guest_name`). The seed data confirms: `guest_name = 'John Smith'` and `guest_last_name = 'Smith'`. The lookup route needs to be fixed to use `guest_name` instead of `guest_first_name`.
**Warning signs:** Lookup route returns null for guest name, verification screen shows "undefined".

### Pitfall 4: Useful Numbers Has No Anon Policy for Service Role

**What goes wrong:** Querying `emergency_numbers` and `city_useful_numbers` via service role client works (bypasses RLS), but the tables were designed for the coffeeshop/backoffice context with their own RLS policies.
**Why it happens:** Migration 073 gives `SELECT` to anyone on `emergency_numbers` and active `city_useful_numbers`. The service role client bypasses RLS entirely.
**How to avoid:** Use service role client (already the pattern for all stay API routes). The useful numbers query just needs: `emergency_numbers WHERE country_code = property.country_code` and `city_useful_numbers WHERE country_code = property.country_code AND city_name = property.city`.
**Warning signs:** None likely -- service role works. But if someone later switches to anon key, the policies already allow SELECT.

### Pitfall 5: Price Display Requires Currency Awareness

**What goes wrong:** Service item prices are stored as integers in the property's currency (VND in seed data: 65000 = 65,000 VND). Displaying "65000" or "$650.00" would be wrong.
**Why it happens:** Minor currency unit storage (cents for USD, units for VND) requires knowing the currency to format correctly.
**How to avoid:** The service item response includes `currency` field. Use `Intl.NumberFormat('en', { style: 'currency', currency: item.currency })` but note VND has 0 decimal places. `Intl.NumberFormat` handles this automatically. BUT: the price is stored as the minor unit, so for VND (0 decimals), 65000 = 65,000 VND (correct). For USD (2 decimals), 800 = $8.00.
**Warning signs:** Prices off by factor of 100, or showing wrong decimal places.

### Pitfall 6: Session Redirect Loop

**What goes wrong:** Guest visits `/stay/CODE`, session check finds no token, redirects to `/`, guest verifies, redirects to `/stay/CODE`, but the token isn't available yet, redirects back to `/`.
**Why it happens:** Race condition between localStorage write and next page render.
**How to avoid:** After successful verification, use `router.push('/stay/CODE')` only AFTER `localStorage.setItem` completes (synchronous, so this is fine). On the dashboard page, the session hook reads from localStorage on mount -- it will find the token. Critical: the `useStaySession` hook must run `useEffect` with empty deps to read localStorage on mount BEFORE any redirect logic runs.
**Warning signs:** Infinite redirect loop, rapid page flashes.

## Code Examples

### Example 1: Verification Landing Page

```typescript
// app/page.tsx - Clean verification screen
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStaySession } from '@/hooks/useStaySession';

export default function VerificationPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, verify, stay } = useStaySession();
  const [bookingCode, setBookingCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Auto-redirect if already authenticated
  if (!isLoading && isAuthenticated && stay) {
    router.push(`/stay/${stay.booking.code}`);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await verify(bookingCode.trim(), lastName.trim());
    if (result.success) {
      // Stay data is now in session hook + localStorage
      // Navigate to dashboard
      router.push(`/stay/${bookingCode.trim()}`);
    } else {
      setError(result.error === 'verification_failed'
        ? 'We couldn\'t find your booking. Please check your code and last name.'
        : 'Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      {/* Property branding + form */}
      <form onSubmit={handleSubmit}>
        <input value={bookingCode} onChange={e => setBookingCode(e.target.value)} placeholder="BK-XXXXXX" />
        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" disabled={submitting}>Access your stay</button>
      </form>
    </div>
  );
}
```

### Example 2: WhatsApp Quick Action Link

```typescript
// Quick action WhatsApp URL builder
function buildWhatsAppLink(phone: string, action: string, roomNumber: string, propertyName: string): string {
  const message = encodeURIComponent(
    `${action} request - Room ${roomNumber}, ${propertyName}`
  );
  // Strip non-digits from phone
  const cleanPhone = phone.replace(/[^\d+]/g, '').replace('+', '');
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

// Usage in QuickActions component:
const actions = [
  { id: 'room-service', name: 'Room Service', message: 'Room Service' },
  { id: 'concierge', name: 'Concierge', message: 'Concierge assistance' },
  { id: 'housekeeping', name: 'Housekeeping', message: 'Housekeeping' },
  { id: 'report', name: 'Report Issue', message: 'Issue report' },
];

// Each action opens WhatsApp with pre-filled message
<a href={buildWhatsAppLink(property.contactWhatsapp, action.message, room.number, property.name)}>
```

### Example 3: New API Route for Useful Numbers

```typescript
// app/api/stay/[code]/useful-numbers/route.ts
// Queries emergency_numbers + city_useful_numbers based on property location
export async function GET(request: NextRequest) {
  const guest = await authenticateGuest(request);
  if (!guest) return unauthorizedResponse();

  const supabase = getSupabaseAdmin();

  // Get property location
  const { data: property } = await supabase
    .from('accom_properties')
    .select('country_code, city, host_name, host_phone, emergency_phone')
    .eq('id', guest.propertyId)
    .single();

  if (!property) return notFoundResponse();

  // Parallel fetch: emergency numbers + city numbers
  const [emergencyResult, cityResult] = await Promise.all([
    supabase
      .from('emergency_numbers')
      .select('service_type, phone_number')
      .eq('country_code', property.country_code),
    supabase
      .from('city_useful_numbers')
      .select('label, phone_number, category, sort_order')
      .eq('country_code', property.country_code)
      .eq('city_name', property.city)
      .eq('is_active', true)
      .order('sort_order'),
  ]);

  return NextResponse.json({
    data: {
      emergency: emergencyResult.data || [],
      city: cityResult.data || [],
      property: {
        name: property.host_name,
        phone: property.emergency_phone || property.host_phone,
      },
    },
  });
}
```

## Backend Extensions Needed

### New Tables / Columns

| What                    | Approach                                                                     | Notes                                                                                                                                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Visa rules**          | Static reference data (no new table needed for MVP)                          | The mock has 9 country entries. For MVP, serve as JSON from API route or hardcode. Country-specific visa rules change rarely. A `visa_rules` table is nice-to-have but CONTEXT.md says "read-only reference data" -- a static JSON file or in-API-route constant is simpler for MVP. |
| **Useful numbers**      | Already exist: `emergency_numbers` + `city_useful_numbers` (migration 073)   | Just need new API route + seed Da Nang city numbers. Emergency VN numbers already seeded.                                                                                                                                                                                            |
| **Quick actions**       | New table `accom_quick_actions` OR new JSONB column on `accom_properties`    | Property-configurable actions. JSONB column is simpler for MVP (array of `{id, name, icon, whatsapp_message}`). Avoids new table + migration.                                                                                                                                        |
| **Return guest banner** | New columns on `accom_properties`: `return_banner_text`, `return_banner_url` | Two nullable TEXT columns. If null, banner hidden. Simple DB alter.                                                                                                                                                                                                                  |

### New API Routes

| Route                                 | Purpose                                           | Auth                                                 |
| ------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| `GET /api/stay/[code]/useful-numbers` | Emergency + city + property numbers               | JWT required                                         |
| `GET /api/stay/[code]/visa-info`      | Visa rules for property's country + guest country | JWT required (or could be served inline from verify) |

### Migration Plan

One new migration (~079) adding:

1. Da Nang city useful numbers seed data (emergency_numbers for VN already exists)
2. `accom_properties` columns: `quick_actions JSONB DEFAULT '[]'`, `return_banner_text TEXT`, `return_banner_url TEXT`
3. Seed quick_actions and return_banner for demo property

## State of the Art

| Old Approach                     | Current Approach                            | Impact                                                   |
| -------------------------------- | ------------------------------------------- | -------------------------------------------------------- |
| Single monolithic page component | Component-per-section architecture          | Enables independent loading, testing, and error handling |
| Mock data at top of file         | API fetch in useEffect                      | Real data from Phase 5 routes                            |
| No auth state                    | JWT in localStorage with session hook       | Persistent guest sessions across browser refreshes       |
| Hardcoded useful numbers         | DB-driven via existing migration 073 tables | Reusable across all verticals                            |

## Open Questions

1. **Deals Category Tabs**
   - What we know: Mock dashboard has tabbed deals (tours / food / more). The API returns a flat `DealResponse[]` with no category field.
   - What's unclear: Should deals be categorized in the frontend based on merchant type? The `partner_conventions` table has no category field.
   - Recommendation: For MVP, show all deals in a single list without tabs. The convention data doesn't have categories. Adding a `deal_category` column to `partner_conventions` could come later. LOW risk.

2. **Guest Country for Visa Info**
   - What we know: Mock uses `booking.guestCountry` (ISO code) for visa rules lookup. The `accom_bookings` table does NOT have a `guest_country` column.
   - What's unclear: How to get the guest's nationality for visa info display.
   - Recommendation: Add `guest_country TEXT` column to `accom_bookings` in the new migration. Until then, the visa section can be hidden or use the property's country as context (show general Vietnam visa info). MEDIUM risk -- affects visa card display.

3. **Lookup Route Field Name Bug**
   - What we know: `GET /api/stay/[code]` selects `guest_first_name` but schema has `guest_name` (not `guest_first_name`).
   - What's unclear: Whether this route has been tested against real data.
   - Recommendation: Fix in Phase 6 when rewriting the verification flow. The field should be `guest_name`. LOW risk -- easy fix.

4. **Verify Route Already Returns Full Stay Data**
   - What we know: `POST /api/stay/verify` already returns `{ token, stay: { property, room, booking, wifi } }` -- this is most of what the dashboard needs on first load.
   - What's unclear: Whether the dashboard should re-fetch property/wifi data from the protected routes, or just use the verify response.
   - Recommendation: Use the verify response for initial render (it's already fetched), then only call protected routes for data NOT in the verify response (services, deals, useful numbers). Avoid redundant fetches. HIGH confidence.

## Sources

### Primary (HIGH confidence)

- **Existing codebase** (all files read directly):
  - `apps/accommodations/frontend/app/stay/[code]/page.tsx` -- Current 1387-line monolithic dashboard with all mock data
  - `apps/accommodations/frontend/app/page.tsx` -- Current property listing page (needs full rewrite to verification screen)
  - `apps/accommodations/frontend/app/api/stay/verify/route.ts` -- Phase 5 verify endpoint (returns token + full stay data)
  - `apps/accommodations/frontend/app/api/stay/[code]/services/route.ts` -- Phase 5 services endpoint
  - `apps/accommodations/frontend/app/api/stay/[code]/deals/route.ts` -- Phase 5 deals endpoint
  - `apps/accommodations/frontend/app/api/stay/[code]/property/route.ts` -- Phase 5 property endpoint
  - `apps/accommodations/frontend/app/api/stay/[code]/route.ts` -- Phase 5 public lookup endpoint
  - `apps/accommodations/frontend/types/stay.ts` -- API response types
  - `apps/accommodations/frontend/lib/auth.ts` -- JWT sign/verify helpers
  - `apps/accommodations/frontend/lib/supabase.ts` -- Supabase admin client
  - `shared/database/migrations/schema/077-accommodations-schema.sql` -- Full DB schema
  - `shared/database/migrations/schema/078-accommodations-seed.sql` -- Seed data
  - `shared/database/migrations/schema/073-useful-numbers.sql` -- Existing useful numbers tables
  - `.planning/phases/05-api-layer/05-RESEARCH.md` -- Phase 5 research (JWT patterns, API patterns)
  - `.planning/phases/06-in-stay-dashboard/06-CONTEXT.md` -- Phase 6 user decisions

### Secondary (MEDIUM confidence)

- Phase 5 Summary (`05-02-SUMMARY.md`) -- Confirmed all 5 API routes complete and build passing

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- No new dependencies, all patterns exist in codebase
- Architecture: HIGH -- Component split + session hook is standard React pattern, API routes follow Phase 5 patterns exactly
- Pitfalls: HIGH -- All identified from direct codebase analysis (schema field mismatch, price formatting, mock vs API shape differences)
- Backend extensions: MEDIUM -- Useful numbers tables exist but need Da Nang seed data. Quick actions and return banner schema decisions are Claude's discretion per CONTEXT.md.

**Research date:** 2026-01-29
**Valid until:** 2026-03-01 (stable domain, no external dependencies changing)
