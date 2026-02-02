# Phase 37: Conventions + Vouchers - Research

**Researched:** 2026-02-02
**Domain:** Conventions system adaptation for accommodations, voucher validation in booking flow, convention partner cards in guest dashboard
**Confidence:** HIGH

## Summary

This phase extends the existing B2B conventions system (migration 050) to support accommodations-specific discount scoping and surfaces convention partner cards in the guest in-stay dashboard. The codebase already has a mature conventions infrastructure: `partner_conventions`, `convention_vouchers`, `convention_redemptions` tables with full RLS, a `validate_voucher()` RPC, and a comprehensive `conventions-service.ts` in the backoffice. The coffeeshop vertical also has a `VoucherInput` component ready for adaptation.

The primary work is: (1) adding a `benefit_scope` column to `partner_conventions` for accommodations-specific calculation (per_order, per_night, per_stay, flat), (2) creating a new API endpoint and component in the accommodations stay dashboard to show convention partner cards (replacing or augmenting the existing `LocalDeals` component with convention-sourced data), and (3) integrating voucher code validation into the booking flow via the property page's `useBookingForm` hook and `/api/booking` route.

**Primary recommendation:** Add `benefit_scope` column via ALTER TABLE migration, create a `validate_accommodation_voucher()` RPC that extends `validate_voucher()` with scope-aware discount calculation, and build convention partner cards as a new component alongside the existing `LocalDeals` section.

## Standard Stack

### Core (Already in Codebase)

| Library        | Version  | Purpose                     | Why Standard               |
| -------------- | -------- | --------------------------- | -------------------------- |
| Supabase JS    | existing | DB queries, RPC calls       | Already used everywhere    |
| Next.js 14.2   | 14.2.33  | API routes + pages          | Project framework          |
| Phosphor Icons | existing | Icons for cards/UI          | Project standard (duotone) |
| date-fns       | existing | Date math for stay duration | Already in booking flow    |

### Supporting (Already in Codebase)

| Library       | Version  | Purpose                 | When to Use                        |
| ------------- | -------- | ----------------------- | ---------------------------------- |
| framer-motion | existing | VoucherInput animations | Already in coffeeshop VoucherInput |
| Radix UI      | existing | Sheet/drawer overlays   | If voucher details need overlay    |

### Alternatives Considered

| Instead of       | Could Use                          | Tradeoff                                                                     |
| ---------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| New RPC function | Extend existing validate_voucher() | New function is cleaner, existing one returns coffeeshop-shaped data         |
| New deals table  | Use partner_conventions directly   | Conventions already support partner_type='accommodation' polymorphic pattern |

**Installation:** Zero new packages needed. All dependencies already exist.

## Architecture Patterns

### Existing Convention Data Flow

```
partner_conventions (partner_type='accommodation', partner_id=property_id)
    |
    v
convention_vouchers (voucher_code, convention_id)
    |
    v
validate_voucher() RPC (checks active, dates, usage limits)
    |
    v
convention_redemptions (tracks usage with order/booking link)
```

### Pattern 1: Polymorphic Partner Lookup (Already Established)

**What:** `partner_conventions` uses `partner_type` + `partner_id` to link to any entity (office, accommodation, tour_operator)
**When to use:** Querying conventions for a specific property
**Example:**

```sql
-- Source: migration 080 architectural note
SELECT * FROM partner_conventions
WHERE partner_id = :propertyId AND partner_type = 'accommodation'
AND is_active = true
AND valid_from <= CURRENT_DATE
AND (valid_until IS NULL OR valid_until >= CURRENT_DATE);
```

### Pattern 2: Guest JWT Authentication (Established in Stay API)

**What:** All stay API endpoints authenticate via guest JWT tokens containing `{ bookingId, propertyId, checkoutDate }`
**When to use:** Convention partner cards API endpoint
**Example:**

```typescript
// Source: apps/accommodations/frontend/app/api/stay/[code]/deals/route.ts
const guest = await authenticateGuest(request);
if (!guest)
  return NextResponse.json({ error: 'session_expired' }, { status: 401 });
// Use guest.propertyId to query conventions
```

### Pattern 3: Booking Flow Server-Authoritative Pricing

**What:** Client calculates preview, server recalculates authoritatively in POST /api/booking
**When to use:** Voucher discount must be server-validated, not client-trusted
**Example:**

```typescript
// Client: preview discount amount based on voucher validation
// Server: POST /api/booking re-validates voucher and calculates authoritative discount
```

### Pattern 4: VoucherInput Component (Coffeeshop Pattern)

**What:** Reusable input with code entry, apply button, loading state, error display, applied voucher state
**When to use:** Adapt for accommodations booking form
**Source:** `apps/coffeeshop/frontend/components/v2/VoucherInput.tsx`

### Recommended Project Structure (New Files)

```
shared/database/migrations/schema/
  092-conventions-benefit-scope.sql          # ALTER TABLE + new RPC

apps/accommodations/frontend/
  components/stay/ConventionPartnerCards.tsx  # Guest dashboard cards (GXP-05)
  components/booking/VoucherInput.tsx         # Adapted from coffeeshop
  app/api/stay/[code]/conventions/route.ts   # GET conventions for property
  app/api/booking/validate-voucher/route.ts  # POST voucher validation
```

### Anti-Patterns to Avoid

- **Duplicating convention tables for accommodations:** The existing polymorphic pattern (partner_type='accommodation') already supports this. Do NOT create `accom_conventions`.
- **Client-side discount calculation as authoritative:** The voucher discount MUST be recalculated server-side in POST /api/booking. Client only shows preview.
- **Mixing deals and conventions:** `accom_deals` (migration 087) is a separate simpler system for static local deals. Conventions are the B2B system. They coexist in the dashboard, not replace each other.

## Don't Hand-Roll

| Problem                   | Don't Build                | Use Instead                                       | Why                                           |
| ------------------------- | -------------------------- | ------------------------------------------------- | --------------------------------------------- |
| Voucher code generation   | Custom random code gen     | `generate_voucher_code()` RPC                     | Already handles uniqueness with retry loop    |
| Voucher validation        | Custom JS validation       | `validate_voucher()` RPC                          | Checks all constraints atomically in DB       |
| Convention stats tracking | Manual counter updates     | `update_convention_stats_on_redemption()` trigger | Already auto-increments on redemption insert  |
| Daily code rotation       | Cron job                   | `generate_daily_convention_code()` trigger        | Already fires on INSERT/UPDATE                |
| VoucherInput UI           | New component from scratch | Adapt coffeeshop `VoucherInput.tsx`               | Proven UX with loading, error, applied states |

**Key insight:** The conventions system in migration 050 is complete with triggers, RPC functions, and stats tracking. The backoffice `conventions-service.ts` has full CRUD. The work is adaptation, not creation.

## Common Pitfalls

### Pitfall 1: benefit_scope Discount Calculation Complexity

**What goes wrong:** Different scopes require different inputs: per_night needs stay duration, per_order is a flat per-booking discount, per_stay is total stay discount, flat is a fixed amount.
**Why it happens:** The `validate_voucher()` RPC currently returns `benefit_type` and `benefit_value` but has no concept of "scope" (it was built for per-order coffeeshop use).
**How to avoid:** Create a new `validate_accommodation_voucher()` RPC that accepts `num_nights` as parameter and returns the calculated `discount_amount` based on scope. Keep the existing RPC untouched for backward compatibility.
**Warning signs:** If you try to extend `validate_voucher()` with optional parameters, you risk breaking coffeeshop callers.

### Pitfall 2: Stacking Voucher with Existing Discounts

**What goes wrong:** The booking already has `weekly_discount_percent` and `monthly_discount_percent`. A voucher discount on top could create negative totals.
**Why it happens:** `calculatePriceBreakdown()` in `price-utils.ts` doesn't account for voucher discounts.
**How to avoid:** Apply voucher discount AFTER existing discounts. Add a `max_discount_cap` or ensure total discount never exceeds subtotal. The discount_amount column on accom_bookings already exists.
**Warning signs:** `totalPrice` going negative or near-zero on long stays with stacked discounts.

### Pitfall 3: Convention Cards vs Deals Cards Confusion

**What goes wrong:** Guest dashboard already shows `LocalDeals` component (from `accom_deals` table). Convention partner cards are different data from `partner_conventions`.
**Why it happens:** Both show "partner offers" to guests but from different sources.
**How to avoid:** Convention cards should be a SEPARATE section above or alongside LocalDeals. Convention cards show structured data (partner name, benefit type/value, logo) while deals are simpler (name, discount label, URL). They can coexist.
**Warning signs:** Trying to merge them into one component or one data source.

### Pitfall 4: Voucher Validation Timing in Booking Flow

**What goes wrong:** Voucher validated on client but expired/used by the time server processes booking.
**Why it happens:** Race condition between validation call and booking submission.
**How to avoid:** Server-side re-validation in POST /api/booking is mandatory. The client validation is only for UX preview. Record the voucher_code in the booking submission and re-validate server-side.
**Warning signs:** Discount applied to booking but voucher was already at max_uses.

### Pitfall 5: RLS Policy for Guest Convention Access

**What goes wrong:** Guests can't see conventions because RLS on `partner_conventions` requires merchant staff role.
**Why it happens:** Current RLS policy: `merchant_id IN (SELECT ar.tenant_id FROM account_roles ar WHERE ar.account_id = auth.uid() AND ar.role_type = 'merchant')`.
**How to avoid:** The stay API uses `getSupabaseAdmin()` (service_role) for all guest-facing queries, bypassing RLS. Follow the same pattern for conventions -- the guest JWT + admin client is the established pattern.
**Warning signs:** 401/empty results when querying conventions from stay endpoints.

## Code Examples

### Schema: benefit_scope Column Addition

```sql
-- Source: Adaptation of existing partner_conventions table
ALTER TABLE partner_conventions
  ADD COLUMN IF NOT EXISTS benefit_scope TEXT DEFAULT 'per_order'
    CHECK (benefit_scope IN ('per_order', 'per_night', 'per_stay', 'flat'));

COMMENT ON COLUMN partner_conventions.benefit_scope IS
  'How the benefit is applied for accommodations: per_order=single discount, per_night=multiplied by nights, per_stay=total stay discount, flat=fixed amount regardless of duration';
```

### RPC: Accommodation Voucher Validation with Scope

```sql
-- New function that extends validate_voucher with scope-aware calculation
CREATE OR REPLACE FUNCTION validate_accommodation_voucher(
  p_voucher_code TEXT,
  p_property_id UUID,
  p_num_nights INTEGER DEFAULT 1,
  p_subtotal INTEGER DEFAULT 0
)
RETURNS TABLE(
  is_valid BOOLEAN,
  error_message TEXT,
  convention_id UUID,
  voucher_id UUID,
  benefit_type TEXT,
  benefit_value DECIMAL,
  benefit_scope TEXT,
  discount_amount INTEGER,
  partner_name TEXT
) AS $$
DECLARE
  v_voucher convention_vouchers%ROWTYPE;
  v_convention partner_conventions%ROWTYPE;
  v_merchant_id UUID;
  v_calc_discount INTEGER;
BEGIN
  -- Find property's merchant (via accom_properties owner chain)
  -- Convention partner_id = property UUID, partner_type = 'accommodation'

  -- Delegate base validation to existing function pattern
  -- ... (full implementation in plan)

  -- Calculate discount based on scope
  CASE v_convention.benefit_scope
    WHEN 'per_night' THEN
      v_calc_discount := (v_convention.benefit_value * p_num_nights)::INTEGER;
    WHEN 'per_stay' THEN
      v_calc_discount := v_convention.benefit_value::INTEGER;
    WHEN 'flat' THEN
      v_calc_discount := v_convention.benefit_value::INTEGER;
    ELSE -- per_order
      v_calc_discount := v_convention.benefit_value::INTEGER;
  END CASE;

  -- For percentage types, calculate against subtotal
  IF v_convention.benefit_type = 'percentage_discount' THEN
    CASE v_convention.benefit_scope
      WHEN 'per_night' THEN
        v_calc_discount := (p_subtotal * v_convention.benefit_value / 100)::INTEGER;
      ELSE
        v_calc_discount := (p_subtotal * v_convention.benefit_value / 100)::INTEGER;
    END CASE;
  END IF;

  RETURN QUERY SELECT
    true, NULL::TEXT, v_convention.id, v_voucher.id,
    v_convention.benefit_type, v_convention.benefit_value,
    v_convention.benefit_scope, v_calc_discount, v_convention.partner_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### API: Convention Partner Cards Endpoint

```typescript
// Source: Pattern from apps/accommodations/frontend/app/api/stay/[code]/deals/route.ts
// GET /api/stay/[code]/conventions
export async function GET(request: NextRequest) {
  const guest = await authenticateGuest(request);
  if (!guest)
    return NextResponse.json({ error: 'session_expired' }, { status: 401 });

  const supabase = getSupabaseAdmin();

  const { data } = await supabase
    .from('partner_conventions')
    .select(
      'id, partner_name, benefit_type, benefit_value, benefit_scope, benefit_description, convention_name'
    )
    .eq('partner_type', 'accommodation')
    .eq('partner_id', guest.propertyId)
    .eq('is_active', true)
    .gte('valid_until', new Date().toISOString().split('T')[0])
    .order('created_at');

  // Map to response shape...
}
```

### Component: Convention Partner Card (Guest Dashboard)

```tsx
// Pattern: Follow LocalDeals.tsx card style with Phosphor icons
import { Storefront, Percent, Tag } from '@phosphor-icons/react';

interface ConventionPartner {
  id: string;
  partnerName: string;
  conventionName: string;
  benefitType: string;
  benefitValue: number;
  benefitScope: string;
  benefitDescription: string | null;
}

// Card layout: partner name, benefit badge, description
// Tap action: expand details or deep-link to partner menu
```

### Booking Flow: Voucher Integration Point

```typescript
// In useBookingForm hook -- add voucher state
const [voucherCode, setVoucherCode] = useState<string | null>(null);
const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
const [voucherDetails, setVoucherDetails] = useState<ValidatedVoucher | null>(
  null
);

// In POST /api/booking -- re-validate and apply
if (body.voucherCode) {
  const { data: voucherResult } = await supabase.rpc(
    'validate_accommodation_voucher',
    {
      p_voucher_code: body.voucherCode,
      p_property_id: property.id,
      p_num_nights: nights,
      p_subtotal: priceBreakdown.subtotal,
    }
  );
  // Apply discount_amount to total
}
```

## State of the Art

| Old Approach                     | Current Approach                             | When Changed          | Impact                                                                         |
| -------------------------------- | -------------------------------------------- | --------------------- | ------------------------------------------------------------------------------ |
| `accom_deals` simple deals table | `partner_conventions` polymorphic B2B system | Migration 050         | Conventions provide structured partner data, vouchers, and redemption tracking |
| Manual partner discovery         | AI-assisted office discovery                 | Convention-service.ts | Backoffice already has AI partner discovery                                    |
| No benefit scoping               | Adding benefit_scope column                  | This phase            | Enables per_night/per_stay calculation for accommodations                      |

**Key architectural note from migration 080:**

> "The partner_conventions table already connects to properties via: partner_id = <property UUID> AND partner_type = 'accommodation'. This polymorphic pattern provides property-specific filtering WITHOUT a redundant property_id FK."

This confirms the schema is already designed for accommodations use.

## Open Questions

1. **Voucher code in booking submission vs separate field**
   - What we know: The booking form currently has no voucher field. The coffeeshop `VoucherInput` is a standalone component.
   - What's unclear: Should the voucher be validated as a separate API call (preview) then code sent with booking, or should it be a single call?
   - Recommendation: Two-step approach. First validate via `/api/booking/validate-voucher` for preview, then include `voucherCode` in booking POST for server-authoritative re-validation.

2. **Convention cards: property-level vs merchant-level display**
   - What we know: Conventions link via `partner_id` (property UUID) and `partner_type='accommodation'`. But `merchant_id` on the convention row refers to the F&B merchant offering the deal, not the property.
   - What's unclear: When an accommodation property has conventions, are they conventions offered BY the property's restaurant partners TO the property's guests? Or are they deals the property owner creates?
   - Recommendation: Based on the existing data model, conventions are from merchants (restaurants, etc.) offering deals to guests of a specific accommodation (partner_id=propertyId). The cards show "restaurant X offers you 10% off" to the guest. This matches the `accommodation` partner_type flow.

3. **Backoffice: accommodation owner vs restaurant merchant**
   - What we know: Current backoffice conventions management is merchant-centric (for restaurants managing their B2B deals). Accommodation owners need to see and manage which conventions are linked to their properties.
   - What's unclear: Should the accommodation owner manage conventions from their own backoffice view, or should the restaurant merchant create them?
   - Recommendation: Phase 37 plan says "owner convention management in backoffice" -- create a read-only view for accommodation owners showing active conventions linked to their property, with ability to enable/disable visibility to guests. Full convention CRUD stays with the merchant (restaurant) side.

## Sources

### Primary (HIGH confidence)

- `shared/database/migrations/schema/050-b2b-conventions.sql` -- Full conventions schema, validate_voucher() RPC, triggers
- `shared/database/migrations/schema/080-accommodations-fnb-integration.sql` -- Architectural note confirming polymorphic partner lookup
- `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` -- Booking schema with pricing columns
- `shared/database/migrations/schema/087-analytics-deals-communication.sql` -- accom_deals table (separate from conventions)
- `apps/backoffice/lib/ai/conventions-service.ts` -- Full conventions CRUD service
- `apps/coffeeshop/frontend/components/v2/VoucherInput.tsx` -- Proven VoucherInput component
- `apps/accommodations/frontend/app/api/booking/route.ts` -- Booking submission flow
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` -- In-stay dashboard layout
- `apps/accommodations/frontend/components/stay/LocalDeals.tsx` -- Existing partner cards pattern
- `apps/accommodations/frontend/lib/price-utils.ts` -- Price calculation utilities

### Secondary (MEDIUM confidence)

- Migration 080 architectural note on INT-01 convention connection pattern

### Tertiary (LOW confidence)

- None -- all findings verified from codebase

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- all libraries already in codebase, zero new packages
- Architecture: HIGH -- polymorphic pattern explicitly documented in migration 080, all integration points inspected
- Pitfalls: HIGH -- identified from actual code inspection (RLS policies, price calculation, validate_voucher signature)
- Schema design: HIGH -- benefit_scope is a simple ALTER TABLE on existing table with established CHECK constraint pattern

**Research date:** 2026-02-02
**Valid until:** 2026-03-02 (stable -- internal codebase, no external dependency changes)
