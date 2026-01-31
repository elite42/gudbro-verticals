# Phase 18: Database Foundation - Research

**Researched:** 2026-01-31
**Domain:** PostgreSQL schema design (exclusion constraints, RLS, Stripe webhooks)
**Confidence:** HIGH

## Summary

Phase 18 creates the database foundation for the full Accommodations v2 system. It involves: (1) an availability table with an exclusion constraint to prevent double bookings at the database level, (2) service order tables for guest ordering, (3) extensions to three existing tables (properties, rooms, bookings) with pricing/payment/configuration columns, (4) RLS policies for all new/extended tables, and (5) a Stripe webhook endpoint with signature verification.

The research confirms that the existing codebase already provides strong patterns to follow. Migration 077 established the accom\_ namespace, RLS pattern, and SECURITY DEFINER functions. The existing Stripe webhook in `apps/backoffice/app/api/wallet/stripe/route.ts` provides a working reference for webhook signature verification in Next.js App Router. The btree_gist extension is available on Supabase and is the standard approach for exclusion constraints with mixed scalar + range types.

**Primary recommendation:** Write a single migration (083) for all schema changes, follow the existing RLS pattern verbatim, and place the Stripe webhook endpoint in the accommodations PWA (not backoffice) since booking payments flow through the guest-facing app.

## Standard Stack

### Core

| Library               | Version  | Purpose                                | Why Standard                                                    |
| --------------------- | -------- | -------------------------------------- | --------------------------------------------------------------- |
| PostgreSQL (Supabase) | 15+      | Database engine                        | Supabase default, supports btree_gist and exclusion constraints |
| btree_gist extension  | Built-in | GiST operator classes for B-tree types | Required for EXCLUDE USING GIST with UUID/scalar + daterange    |
| stripe (npm)          | ^14.0.0  | Stripe SDK                             | Already installed in backoffice package.json                    |

### Supporting

| Library         | Version   | Purpose                        | When to Use                                                  |
| --------------- | --------- | ------------------------------ | ------------------------------------------------------------ |
| @shared/payment | workspace | Payment types, currency config | Reuse PaymentMethod type for accepted_payment_methods column |

### Alternatives Considered

| Instead of                     | Could Use                    | Tradeoff                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exclusion constraint           | Application-level check      | Exclusion is safer (DB enforces, no race conditions), but requires btree_gist extension                                                                                                                                                                                                         |
| Per-day availability rows      | daterange column + exclusion | Per-day rows are simpler to query/display (calendar view) but more rows; daterange is more compact but harder to query for calendar UI. **Decision: use per-day rows for availability table (simpler calendar queries) + exclusion constraint on bookings table for double-booking prevention** |
| PostgreSQL 18 WITHOUT OVERLAPS | EXCLUDE USING GIST           | WITHOUT OVERLAPS is cleaner syntax but Supabase runs PostgreSQL 15, not 18. Use EXCLUDE USING GIST.                                                                                                                                                                                             |

## Architecture Patterns

### Migration File Structure

All changes go in a single migration file: `083-accommodations-v2-foundation.sql`. This follows the existing convention (077 was the original schema, 079/080/081 were incremental extensions).

```
shared/database/migrations/schema/
  083-accommodations-v2-foundation.sql    # All Phase 18 changes
```

### Pattern 1: Exclusion Constraint for Double-Booking Prevention

**What:** Use `EXCLUDE USING GIST` on `accom_bookings` to prevent overlapping date ranges for the same room.
**When to use:** When a new booking is inserted or an existing booking's dates are updated.
**Why on bookings, not a separate availability table:** The bookings table IS the source of truth for reservations. An exclusion constraint directly on bookings prevents the root cause (two bookings with overlapping dates for the same room). A separate availability table is for display/calendar purposes.

```sql
-- Source: PostgreSQL docs + verified Supabase support for btree_gist
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Prevent overlapping bookings for the same room
-- Uses [) bound: check-in included, check-out excluded (guest leaves on checkout day)
-- Partial: only active bookings (cancelled/no_show don't block)
ALTER TABLE accom_bookings
  ADD CONSTRAINT accom_bookings_no_overlap
  EXCLUDE USING GIST (
    room_id WITH =,
    daterange(check_in_date, check_out_date, '[)') WITH &&
  )
  WHERE (status NOT IN ('cancelled', 'no_show'));
```

**Critical detail:** The `[)` bound means check-in day is included but check-out day is excluded. This allows back-to-back bookings where guest A checks out on Feb 5 and guest B checks in on Feb 5. This matches real-world hotel behavior.

**Partial constraint:** The `WHERE` clause excludes cancelled and no_show bookings so they don't block future reservations.

### Pattern 2: RLS Policy Pattern (Existing Convention)

**What:** Owner manages via property*id chain, anon reads active/public data, guest access via SECURITY DEFINER.
**When to use:** Every new table with an `accom*` prefix.

```sql
-- Source: Migration 077 (verified working in production)

-- Enable RLS
ALTER TABLE accom_new_table ENABLE ROW LEVEL SECURITY;

-- Anon: read active records only
CREATE POLICY accom_new_table_anon_read
  ON accom_new_table FOR SELECT TO anon
  USING (is_active = true);  -- or specific condition

-- Owner: full CRUD via property ownership chain
CREATE POLICY accom_new_table_owner_manage
  ON accom_new_table FOR ALL TO authenticated
  USING (
    property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    )
  );

-- Grants
GRANT SELECT ON accom_new_table TO anon;
GRANT ALL ON accom_new_table TO authenticated;
```

### Pattern 3: Service Order Tables (FK Chain)

**What:** Two-table pattern for orders: header + line items, with foreign keys to bookings and service items.
**When to use:** For accom_service_orders and accom_service_order_items.

```
accom_bookings (1) --< accom_service_orders (1) --< accom_service_order_items
                                                        |
                                                        +--> accom_service_items (snapshot price)
```

Order items store snapshot values (name, unit_price) at order time so that service catalog changes don't retroactively alter historical orders.

### Pattern 4: Stripe Webhook in Next.js App Router

**What:** Webhook endpoint using `request.text()` for raw body, `constructEvent()` for signature verification.
**When to use:** For the accommodations Stripe webhook endpoint.

```typescript
// Source: Existing codebase (apps/backoffice/app/api/wallet/stripe/route.ts)
// + Stripe official docs (https://docs.stripe.com/webhooks/signature)

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});
const endpointSecret = process.env.STRIPE_ACCOM_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text(); // RAW body, not .json()
  const signature = request.headers.get('stripe-signature');

  if (!signature || !endpointSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle event types...
  return NextResponse.json({ received: true });
}
```

**Key points:**

- Use `request.text()` not `request.json()` -- Stripe needs the raw body for signature verification
- No body parsing config needed in App Router (unlike Pages Router)
- The existing wallet webhook in backoffice already follows this exact pattern

### Anti-Patterns to Avoid

- **Storing prices as NUMERIC/REAL:** Use INTEGER (minor units). All existing accom\_ tables use INTEGER for prices. Follow suit.
- **Using ENUM for status fields:** Project convention is TEXT + CHECK constraint. Already established in migration 077.
- **Creating a separate availability table that duplicates booking data:** The exclusion constraint on accom_bookings IS the double-booking prevention. The availability table (if created later for calendar UI) should be for owner-blocked dates and price overrides only, not for tracking booked dates (which the bookings table already handles).
- **Applying RLS to webhook endpoints:** Webhook routes use the admin client (`getSupabaseAdmin()`) to bypass RLS. Stripe calls the webhook as an unauthenticated external service.

## Don't Hand-Roll

| Problem                       | Don't Build                          | Use Instead                                                 | Why                                                                                        |
| ----------------------------- | ------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Double-booking prevention     | Application-level date overlap check | PostgreSQL exclusion constraint (`EXCLUDE USING GIST`)      | Race conditions: two concurrent bookings can both pass app check. DB constraint is atomic. |
| Stripe signature verification | Manual HMAC comparison               | `stripe.webhooks.constructEvent()`                          | Handles timing attack protection, header parsing, multiple signatures.                     |
| Booking code generation       | Custom UUID-based codes              | Existing `generate_booking_code()` function (migration 077) | Already tested, excludes ambiguous chars, collision-resistant.                             |
| Date range overlap detection  | Manual SQL with >= and <=            | `daterange()` + `&&` operator                               | PostgreSQL's built-in range types handle edge cases (inclusive/exclusive bounds).          |

**Key insight:** The database IS the last line of defense for data integrity. Application-level checks are supplements, not replacements. An exclusion constraint guarantees no double bookings regardless of how many concurrent requests arrive.

## Common Pitfalls

### Pitfall 1: btree_gist Not Enabled

**What goes wrong:** `CREATE EXTENSION IF NOT EXISTS btree_gist;` fails or is forgotten, and the exclusion constraint creation fails with "data type uuid has no default operator class for access method gist."
**Why it happens:** btree_gist is not enabled by default in PostgreSQL. Supabase has it available but not necessarily enabled.
**How to avoid:** Put `CREATE EXTENSION IF NOT EXISTS btree_gist;` as the FIRST statement in the migration, before any constraint that depends on it.
**Warning signs:** Error mentioning "no default operator class for access method gist."

### Pitfall 2: Exclusion Constraint with Cancelled Bookings

**What goes wrong:** A cancelled booking blocks future reservations for the same date range.
**Why it happens:** The exclusion constraint checks ALL rows by default, including cancelled ones.
**How to avoid:** Use a partial exclusion constraint: `WHERE (status NOT IN ('cancelled', 'no_show'))`. This means only active bookings participate in the overlap check.
**Warning signs:** Owner cannot create a new booking for dates that had a previously cancelled booking.

### Pitfall 3: Check-in/Check-out Date Boundary

**What goes wrong:** Guest A checks out Feb 5, Guest B cannot check in Feb 5 (overlap detected).
**Why it happens:** Using `[]` (inclusive-inclusive) bounds for the daterange instead of `[)` (inclusive-exclusive).
**How to avoid:** Use `daterange(check_in_date, check_out_date, '[)')` -- check-in is inclusive, check-out is exclusive. This matches hotel industry convention where checkout day is available for new check-ins.
**Warning signs:** Back-to-back bookings are rejected by the constraint.

### Pitfall 4: RLS Blocking API Routes Using Admin Client

**What goes wrong:** New tables have RLS enabled but the API routes use the admin client (service role) which bypasses RLS anyway. But anon key queries fail unexpectedly.
**Why it happens:** Forgetting to GRANT SELECT to anon role for tables that should be publicly readable.
**How to avoid:** For every new table, always include: `GRANT SELECT ON table TO anon;` (for public-readable tables) and `GRANT ALL ON table TO authenticated;` (for owner-managed tables). Follow migration 077 pattern exactly.
**Warning signs:** 403 or empty results when querying from the frontend with anon key.

### Pitfall 5: Adding NOT NULL Column to Existing Table with Data

**What goes wrong:** `ALTER TABLE accom_properties ADD COLUMN booking_mode TEXT NOT NULL DEFAULT 'inquiry'` works fine (DEFAULT handles existing rows). But `ALTER TABLE accom_rooms ADD COLUMN base_price_per_night INTEGER NOT NULL DEFAULT 0` means all existing rooms get price 0, which is incorrect.
**Why it happens:** NOT NULL with DEFAULT works for schema, but the default value may not be semantically correct for existing data.
**How to avoid:** Use DEFAULT values that are safe for existing data. For prices, DEFAULT 0 is acceptable since the owner will set actual prices in the dashboard. Document that existing seed data should be updated.
**Warning signs:** Existing rooms showing $0/night.

### Pitfall 6: Stripe Webhook Endpoint Needs Different Secret Per Environment

**What goes wrong:** Development webhook events fail signature verification in production (or vice versa).
**Why it happens:** Each Stripe webhook endpoint has its own signing secret. Development vs. production endpoints have different secrets.
**How to avoid:** Use environment-specific variables: `STRIPE_ACCOM_WEBHOOK_SECRET` (separate from the existing `STRIPE_WALLET_WEBHOOK_SECRET` used by backoffice). Each webhook endpoint in Stripe Dashboard gets its own secret.
**Warning signs:** "Invalid signature" errors that only happen in one environment.

## Code Examples

### Complete Exclusion Constraint Setup

```sql
-- Source: PostgreSQL btree_gist docs + Supabase extensions documentation

-- 1. Enable btree_gist (required for GIST index on UUID type)
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- 2. Add exclusion constraint to existing accom_bookings table
-- Prevents two active bookings from overlapping for the same room
ALTER TABLE accom_bookings
  ADD CONSTRAINT accom_bookings_no_overlap
  EXCLUDE USING GIST (
    room_id WITH =,
    daterange(check_in_date, check_out_date, '[)') WITH &&
  )
  WHERE (status NOT IN ('cancelled', 'no_show'));
```

### Extending accom_properties with Booking Config

```sql
-- Source: Architecture research doc (.planning/research/ARCHITECTURE.md)
-- + existing migration 077/081 patterns

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS booking_mode TEXT NOT NULL DEFAULT 'inquiry'
    CHECK (booking_mode IN ('instant', 'inquiry', 'disabled')),
  ADD COLUMN IF NOT EXISTS accepted_payment_methods TEXT[] NOT NULL DEFAULT '{"cash"}',
  ADD COLUMN IF NOT EXISTS min_nights INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS max_nights INTEGER,
  ADD COLUMN IF NOT EXISTS cleaning_fee INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS service_fee_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS weekly_discount_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_discount_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cancellation_policy TEXT NOT NULL DEFAULT 'flexible'
    CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict', 'non_refundable')),
  ADD COLUMN IF NOT EXISTS inquiry_timeout_hours INTEGER NOT NULL DEFAULT 24,
  ADD COLUMN IF NOT EXISTS stripe_account_id TEXT;
```

### Extending accom_rooms with Pricing

```sql
ALTER TABLE accom_rooms
  ADD COLUMN IF NOT EXISTS base_price_per_night INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'VND',
  ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS beds JSONB NOT NULL DEFAULT '[]';
  -- beds format: [{"type": "double", "count": 1}, {"type": "single", "count": 2}]
```

### Extending accom_bookings with Payment Fields

```sql
ALTER TABLE accom_bookings
  ADD COLUMN IF NOT EXISTS price_per_night INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS num_nights INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS subtotal INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cleaning_fee INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS service_fee INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS discount_amount INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_price INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'VND',
  ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cash'
    CHECK (payment_method IN ('cash', 'card', 'bank_transfer', 'crypto', 'vnpay', 'momo')),
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT,
  ADD COLUMN IF NOT EXISTS confirmed_via TEXT
    CHECK (confirmed_via IN ('whatsapp', 'zalo', 'telegram', 'email', 'sms', 'auto')),
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
  -- expires_at: for inquiry bookings, auto-expire after inquiry_timeout_hours
```

### Service Order Tables

```sql
CREATE TABLE accom_service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,

  -- Pricing (INTEGER, minor units)
  subtotal INTEGER NOT NULL DEFAULT 0,
  tax INTEGER DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'VND',

  -- Status lifecycle: pending > confirmed > preparing > ready > delivered
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),

  -- Delivery
  requested_time TEXT,       -- "7:30 AM", "ASAP"
  delivery_notes TEXT,

  -- Payment
  payment_method TEXT NOT NULL DEFAULT 'room_charge'
    CHECK (payment_method IN ('room_charge', 'cash', 'card')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE accom_service_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES accom_service_orders(id) ON DELETE CASCADE,
  service_item_id UUID NOT NULL REFERENCES accom_service_items(id),

  -- Snapshot at order time (catalog may change later)
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price INTEGER NOT NULL,
  total INTEGER NOT NULL,

  -- Options
  variant TEXT,
  notes TEXT
);
```

### RLS for Service Orders (Guest Access Pattern)

```sql
-- Service orders: owner manages, NO anon access
-- Guest access goes through SECURITY DEFINER functions (like verify_booking_access)
ALTER TABLE accom_service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_service_order_items ENABLE ROW LEVEL SECURITY;

-- Owner manages via property ownership
CREATE POLICY accom_service_orders_owner_manage
  ON accom_service_orders FOR ALL TO authenticated
  USING (
    property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY accom_service_order_items_owner_manage
  ON accom_service_order_items FOR ALL TO authenticated
  USING (
    order_id IN (SELECT id FROM accom_service_orders WHERE property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    ))
  );

-- Grants (no anon access - guest uses service-role admin client via API routes)
GRANT ALL ON accom_service_orders TO authenticated;
GRANT ALL ON accom_service_order_items TO authenticated;
```

### Stripe Webhook Endpoint (Accommodations)

```typescript
// apps/accommodations/frontend/app/api/webhooks/stripe/route.ts
// Source: Existing pattern from apps/backoffice/app/api/wallet/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});
const endpointSecret = process.env.STRIPE_ACCOM_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !endpointSecret) {
    return NextResponse.json(
      { error: 'Missing signature or endpoint secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;
      if (bookingId) {
        // Update booking payment status
        const { getSupabaseAdmin } = await import('@/lib/supabase');
        const supabase = getSupabaseAdmin();
        await supabase
          .from('accom_bookings')
          .update({
            payment_status: 'paid',
            status: 'confirmed',
            stripe_payment_intent_id: session.payment_intent as string,
            stripe_checkout_session_id: session.id,
          })
          .eq('id', bookingId);
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;
      if (bookingId) {
        const { getSupabaseAdmin } = await import('@/lib/supabase');
        const supabase = getSupabaseAdmin();
        await supabase
          .from('accom_bookings')
          .update({ payment_status: 'unpaid' })
          .eq('id', bookingId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

## State of the Art

| Old Approach                                        | Current Approach                 | When Changed                         | Impact                                               |
| --------------------------------------------------- | -------------------------------- | ------------------------------------ | ---------------------------------------------------- |
| Application-level date overlap checks               | PostgreSQL exclusion constraints | Stable since PG 9.2                  | Eliminates race conditions for double bookings       |
| `micro` library for webhook raw body (Pages Router) | `request.text()` (App Router)    | Next.js 13+ App Router               | Simpler, no external dependency needed               |
| ENUM types for status fields                        | TEXT + CHECK constraint          | Project convention (always)          | Easier to add new values without migration           |
| TIMESTAMPTZ for dates                               | DATE for check-in/check-out      | Architecture decision (this project) | Prevents timezone shift bugs (guest sees wrong date) |

## Open Questions

1. **Stripe dependency for Phase 18 vs Phase 20**
   - What we know: INFRA-08 says "Stripe webhook endpoint with signature verification" is in Phase 18. But actual Stripe payment flow is Phase 20.
   - What's unclear: Should we create the webhook endpoint in Phase 18 (just the infrastructure) or defer to Phase 20 when payment processing is actually implemented?
   - Recommendation: Create the webhook route file with signature verification in Phase 18 (empty event handlers). Fill in the handlers in Phase 20. This satisfies the requirement and allows Phase 20 to focus on payment flow, not webhook plumbing.

2. **accepted_payment_methods column type**
   - What we know: The PRD and architecture doc suggest `TEXT[]` (PostgreSQL array of strings).
   - What's unclear: Should this be a JSONB array instead for flexibility?
   - Recommendation: Use `TEXT[] NOT NULL DEFAULT '{"cash"}'`. PostgreSQL arrays are efficient for simple string lists. JSONB would be overkill here since we only store method identifiers, not complex objects. The CHECK constraint on accom_bookings.payment_method already validates individual method values.

3. **accom_availability table vs exclusion constraint only**
   - What we know: The architecture doc proposes both an availability table (for calendar display, owner-blocked dates, price overrides) AND an exclusion constraint on bookings.
   - What's unclear: Should Phase 18 create the availability table, or just the exclusion constraint?
   - Recommendation: Phase 18 should NOT create accom_availability. The exclusion constraint on bookings handles double-booking prevention (INFRA-01). The availability table (for calendar UI with blocked dates and price overrides) belongs in Phase 22 (Calendar & Pricing). This keeps Phase 18 focused on schema that later phases depend on.

4. **accom_reviews table scope**
   - What we know: The architecture doc includes reviews in the DB foundation. Requirements doc puts reviews in "Future v1.5+."
   - Recommendation: Do NOT create accom_reviews in Phase 18. It is explicitly out of scope for v1.4 per the requirements doc. If needed later, it gets its own migration.

## Sources

### Primary (HIGH confidence)

- Existing migration 077 (`shared/database/migrations/schema/077-accommodations-schema.sql`) -- core schema, RLS pattern, triggers
- Existing migration 081 (`shared/database/migrations/schema/081-schema-api-alignment.sql`) -- ALTER TABLE pattern for extending tables
- Existing Stripe webhook (`apps/backoffice/app/api/wallet/stripe/route.ts`) -- verified working pattern for Next.js App Router
- Architecture research (`.planning/research/ARCHITECTURE.md`) -- verified schema design proposals
- Requirements doc (`.planning/REQUIREMENTS.md`) -- INFRA-01 through INFRA-08 specifications
- Shared payment types (`shared/payment/types.ts`) -- PaymentMethod type definition
- Environment config (`shared/config/env.ts`) -- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET already defined

### Secondary (MEDIUM confidence)

- [PostgreSQL btree_gist documentation](https://www.postgresql.org/docs/current/btree-gist.html) -- extension capabilities
- [Stripe webhook signature docs](https://docs.stripe.com/webhooks/signature) -- constructEvent API
- [Supabase extensions docs](https://supabase.com/docs/guides/database/extensions) -- btree_gist availability confirmed
- [CYBERTEC exclusion constraints guide](https://www.cybertec-postgresql.com/en/postgresql-exclusion-constraints-beyond-unique/) -- partial constraint patterns

### Tertiary (LOW confidence)

- PostgreSQL 18 WITHOUT OVERLAPS syntax -- not available on Supabase (PG 15), noted for future reference only

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- all tools are already in the codebase or confirmed available on Supabase
- Architecture: HIGH -- patterns directly copied from existing working migrations and API routes
- Pitfalls: HIGH -- identified from real issues in PostgreSQL documentation and existing codebase conventions

**Research date:** 2026-01-31
**Valid until:** 2026-03-31 (stable domain, PostgreSQL and Stripe APIs change slowly)
