# Phase 7: F&B Integration - Research

**Researched:** 2026-01-30
**Domain:** Cross-vertical integration (accommodations + coffeeshop PWA), database schema extension, conditional UI routing
**Confidence:** HIGH

## Summary

This phase is primarily an integration task connecting two existing systems: the accommodations In-Stay Dashboard and the coffeeshop PWA. The technical challenge is modest -- the core work involves a database migration to add F&B linking columns to `accom_properties`, a conditional quick-action component, a static menu view component, and wiring the conventions system to filter by property.

All four requirements (FNB-01, FNB-02, FNB-03, INT-01) operate on existing, well-established patterns in the codebase. The dashboard shell pattern (128-line thin page composing section components), the API route authentication pattern (JWT + `verifyGuestToken`), and the service categories data model all provide direct templates. No new libraries or external dependencies are needed.

**Primary recommendation:** Follow the existing section component pattern (like `ServicesCarousel.tsx` and `LocalDeals.tsx`). Add `has_linked_fnb` and `linked_fnb_slug` columns to `accom_properties` via a new migration. Create a `RestaurantSection` component that conditionally renders either a deep-link card or a static menu view. Extend the existing deals API route to filter by `property_id` on conventions.

## Standard Stack

### Core (Already in Project -- No New Dependencies)

| Library        | Version  | Purpose                                    | Why Standard                                  |
| -------------- | -------- | ------------------------------------------ | --------------------------------------------- |
| Next.js        | 14.2.33  | App router, API routes                     | Already used across all verticals             |
| Supabase JS    | existing | Database queries in API routes             | `getSupabaseAdmin()` pattern established      |
| jose           | existing | JWT signing/verification                   | `verifyGuestToken()` already in `lib/auth.ts` |
| date-fns       | existing | Date calculations                          | Used in verify route                          |
| Phosphor Icons | existing | ForkKnife icon for restaurant quick action | Project standard per CLAUDE.md                |

### Supporting

| Library           | Version  | Purpose             | When to Use                                       |
| ----------------- | -------- | ------------------- | ------------------------------------------------- |
| Intl.NumberFormat | built-in | Currency formatting | Reuse `formatPrice()` from `ServicesCarousel.tsx` |

### Alternatives Considered

None applicable. This phase uses exclusively existing project dependencies.

**Installation:**

```bash
# No new packages needed
```

## Architecture Patterns

### Recommended Structure (Files to Create/Modify)

```
apps/accommodations/frontend/
├── components/stay/
│   └── RestaurantSection.tsx     # NEW: Conditional F&B component
├── app/
│   ├── stay/[code]/
│   │   └── page.tsx              # MODIFY: Add RestaurantSection
│   │   └── menu/
│   │       └── page.tsx          # NEW: Static menu view (in-dashboard route)
│   └── api/stay/[code]/
│       └── deals/route.ts        # MODIFY: Add property_id filtering
├── types/
│   └── stay.ts                   # MODIFY: Add F&B types
└── lib/
    └── stay-api.ts               # MODIFY: Add fetchFnbConfig helper

shared/database/migrations/schema/
└── 080-accommodations-fnb-integration.sql  # NEW: Migration
```

### Pattern 1: Section Component (Existing Pattern to Follow)

**What:** Each dashboard section is a self-contained component that fetches its own data and handles loading/error states.
**When to use:** For the RestaurantSection component.
**Example (from existing ServicesCarousel.tsx):**

```typescript
// Source: apps/accommodations/frontend/components/stay/ServicesCarousel.tsx
interface RestaurantSectionProps {
  bookingCode: string;
  token: string;
  propertySlug: string;
}

export default function RestaurantSection({
  bookingCode,
  token,
  propertySlug,
}: RestaurantSectionProps) {
  // Fetch F&B config from property endpoint
  // Conditionally render deep-link card or static menu
}
```

### Pattern 2: Property-Level Configuration (Existing Pattern)

**What:** Property-level settings stored directly on `accom_properties` table, fetched via the property API route.
**When to use:** For `has_linked_fnb` and `linked_fnb_slug` columns.
**Example (from existing quick_actions pattern in migration 079):**

```sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS has_linked_fnb BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS linked_fnb_slug TEXT;
```

### Pattern 3: Authenticated API Route (Existing Pattern)

**What:** API routes extract propertyId from JWT token, not URL params.
**When to use:** For any new data fetching in this phase.
**Example (from existing deals/route.ts):**

```typescript
const guest = await authenticateGuest(request);
if (!guest) {
  return NextResponse.json<ApiResponse<null>>(
    { error: 'session_expired' },
    { status: 401 }
  );
}
// Use guest.propertyId for queries
```

### Pattern 4: Deep-Link to External PWA

**What:** Open coffeeshop PWA in new tab using merchant slug.
**When to use:** For FNB-01 deep-link from dashboard.
**Example:**

```typescript
// Coffeeshop PWA URL pattern (from coffeeshop config):
// The coffeeshop runs on its own subdomain/port, accessed by slug
const coffeeshopUrl = `${process.env.NEXT_PUBLIC_COFFEESHOP_BASE_URL || '/coffeeshop'}/${linked_fnb_slug}`;

// Open in new tab
window.open(coffeeshopUrl, '_blank');
```

### Anti-Patterns to Avoid

- **Passing context through URL params to coffeeshop PWA:** CONTEXT.md explicitly states "No special banner or context passed -- standard coffeeshop PWA experience." Do NOT add query params like `?from=hotel&propertyId=xxx`.
- **Building a rich F&B menu component:** CONTEXT.md defers rich F&B menus. The static menu uses existing `accom_service_items` data, not a new menu system.
- **Duplicating `authenticateGuest()` in new routes:** Extract it to a shared util or import from existing route (currently copy-pasted in each route.ts).

## Don't Hand-Roll

| Problem                | Don't Build      | Use Instead                                       | Why                                            |
| ---------------------- | ---------------- | ------------------------------------------------- | ---------------------------------------------- |
| Currency formatting    | Custom formatter | `formatPrice()` from ServicesCarousel.tsx         | Already handles VND/JPY zero-decimal edge case |
| JWT verification       | Custom auth      | `verifyGuestToken()` from lib/auth.ts             | Security-critical, already tested              |
| Loading/error states   | Custom patterns  | Copy from ServicesCarousel.tsx skeleton pattern   | Consistent UX across dashboard sections        |
| Property data fetching | New endpoint     | Extend existing `/api/stay/[code]/property` route | Already returns PropertyInfo, add fnb fields   |

**Key insight:** This phase adds no new architectural concerns. Every pattern needed already exists in the Phase 4-6 codebase. The primary risk is introducing inconsistency, not missing functionality.

## Common Pitfalls

### Pitfall 1: Schema Mismatch Between DB Columns and API Response

**What goes wrong:** The `accom_properties` table uses `host_phone` but the verify route selects `contact_phone`. Migration 077 defines `host_phone` but the Supabase query references `contact_phone` (suggesting a column alias or later ALTER). Adding new columns must match what the queries actually SELECT.
**Why it happens:** Column names in schema (077) and API routes diverge.
**How to avoid:** Before writing migration, verify the actual column names being SELECTed in `verify/route.ts` and `property/route.ts`. The verify route selects `contact_phone, contact_whatsapp` from `accom_properties`. Confirm these columns exist (possibly added via an ALTER in migration 078 or 079, or the schema was updated). New columns (`has_linked_fnb`, `linked_fnb_slug`) must be added to the SELECT in the property route.
**Warning signs:** API returning null for new fields despite seed data existing.

### Pitfall 2: Conventions Filtering Without property_id FK

**What goes wrong:** The existing `partner_conventions` table uses `partner_id` UUID (polymorphic) to reference the property, but there is no explicit FK constraint to `accom_properties`. The deals route already queries `WHERE partner_id = guest.propertyId AND partner_type = 'accommodation'`. Adding a formal `property_id` column as specified in INT-01 could create confusion with the existing `partner_id` field.
**Why it happens:** The conventions table is polymorphic (partner_type + partner_id pattern). Adding a typed FK would mean two IDs referencing the same thing.
**How to avoid:** Re-evaluate INT-01. The existing `partner_id` + `partner_type = 'accommodation'` pattern ALREADY provides property-specific filtering. The deals API route already does this correctly (see `deals/route.ts` line 53-55). Adding a redundant `property_id` column would create data inconsistency risk. **Recommendation:** Skip the formal FK addition. Document that `partner_id WHERE partner_type = 'accommodation'` IS the property_id link. The existing pattern works and is already in production use.
**Warning signs:** Two columns (`partner_id` and `property_id`) that should always match but can drift.

### Pitfall 3: Static Menu Route vs In-Dashboard View

**What goes wrong:** Creating a separate `/stay/[code]/menu` Next.js page for the static menu requires the guest to re-authenticate or pass the token, breaking the single-page dashboard experience.
**Why it happens:** Temptation to create a separate route for "tap opens static menu view within the dashboard."
**How to avoid:** Implement the static menu as a modal/drawer or expandable section within the dashboard page, not a separate route. This keeps the user in the dashboard context with their existing session. Alternatively, use URL hash (`#menu`) for scroll-to behavior.
**Warning signs:** User sees a loading spinner when tapping "Restaurant" because a new page is loading.

### Pitfall 4: F&B Quick Action Placement

**What goes wrong:** Adding the restaurant quick action to the existing `QuickActions` component conflicts with the JSONB-configured actions from `accom_properties.quick_actions`. The F&B action is conditional (based on property config), not part of the static quick actions grid.
**Why it happens:** QuickActions currently renders a 4-column grid of WhatsApp-linked actions. The F&B action is fundamentally different (opens URL, not WhatsApp).
**How to avoid:** Implement the restaurant entry point as a separate section component (`RestaurantSection`) placed between QuickActions and ServicesCarousel in the dashboard layout. This keeps concerns separated and avoids modifying the WhatsApp-centric QuickActions component.
**Warning signs:** Restaurant action opening WhatsApp instead of the coffeeshop PWA because it was added to the quick actions array.

### Pitfall 5: Coffeeshop PWA URL Construction

**What goes wrong:** Hardcoding the coffeeshop URL or assuming same-domain routing when the coffeeshop is deployed as a separate Vercel project.
**Why it happens:** In development, coffeeshop runs on `:3004`. In production, it has its own Vercel deployment URL.
**How to avoid:** Use an environment variable `NEXT_PUBLIC_COFFEESHOP_BASE_URL` that can be configured per environment. In development: `http://localhost:3004`. In production: the actual Vercel URL for the coffeeshop app.
**Warning signs:** Deep-link works in dev but 404s in production.

## Code Examples

### Migration: Add F&B Columns to accom_properties

```sql
-- Source: Based on existing pattern from 079-accommodations-phase6-extensions.sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS has_linked_fnb BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS linked_fnb_slug TEXT;

COMMENT ON COLUMN accom_properties.has_linked_fnb IS 'Whether property has a linked F&B vertical (coffeeshop PWA).';
COMMENT ON COLUMN accom_properties.linked_fnb_slug IS 'Coffeeshop PWA merchant slug for deep-linking. NULL if has_linked_fnb=false.';

-- Seed: link demo property to existing ROOTS coffeeshop
UPDATE accom_properties
SET has_linked_fnb = true, linked_fnb_slug = 'roots-danang'
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

### Extend PropertyInfo Type

```typescript
// Source: apps/accommodations/frontend/types/stay.ts
export interface PropertyInfo {
  // ... existing fields ...
  hasLinkedFnb: boolean;
  linkedFnbSlug: string | null;
}
```

### RestaurantSection Component (Skeleton)

```typescript
// Source: Pattern from ServicesCarousel.tsx + LocalDeals.tsx
'use client';

import { ForkKnife } from '@phosphor-icons/react';

interface RestaurantSectionProps {
  hasLinkedFnb: boolean;
  linkedFnbSlug: string | null;
  bookingCode: string;
  token: string;
}

export default function RestaurantSection({
  hasLinkedFnb,
  linkedFnbSlug,
  bookingCode,
  token,
}: RestaurantSectionProps) {
  if (hasLinkedFnb && linkedFnbSlug) {
    // Deep-link card: opens coffeeshop PWA in new tab
    const coffeeshopUrl = `${process.env.NEXT_PUBLIC_COFFEESHOP_BASE_URL || ''}/${linkedFnbSlug}`;

    return (
      <section className="mb-5 px-4">
        <a
          href={coffeeshopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E07A5F]/10">
            <ForkKnife size={24} weight="duotone" className="text-[#E07A5F]" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-[#2D2016]">Restaurant</p>
            <p className="text-sm text-[#8B7355]">View our menu</p>
          </div>
          {/* Chevron right */}
        </a>
      </section>
    );
  }

  // Static menu: render inline from service items
  // Fetch F&B-category services and display as view-only catalog
  return <StaticMenuView bookingCode={bookingCode} token={token} />;
}
```

### Static Menu View (Reusing ServicesCarousel Pattern)

```typescript
// Fetch services, filter to F&B categories (breakfast, restaurant, minibar)
// Reuse formatPrice from ServicesCarousel
// Display as categorized list with photos and prices
```

### Dashboard Integration

```typescript
// In app/stay/[code]/page.tsx, between QuickActions and ServicesCarousel:
<RestaurantSection
  hasLinkedFnb={propertyExtended?.hasLinkedFnb ?? false}
  linkedFnbSlug={propertyExtended?.linkedFnbSlug ?? null}
  bookingCode={params.code}
  token={token!}
/>
```

## State of the Art

| Old Approach                             | Current Approach                                       | When Changed            | Impact                                                              |
| ---------------------------------------- | ------------------------------------------------------ | ----------------------- | ------------------------------------------------------------------- |
| Hardcoded quick actions with emoji icons | JSONB-configured quick actions with Phosphor icons     | Phase 6 (migration 079) | New actions should use Phosphor icon names                          |
| `host_phone` column name                 | `contact_phone` / `contact_whatsapp` in queries        | Between schema/seed     | Always check what the API routes SELECT, not just the migration DDL |
| Separate pages per section               | Composable section components in single dashboard page | Phase 6 (06-03)         | Keep RestaurantSection as in-dashboard component                    |

**Deprecated/outdated:**

- The `host_phone` column name in migration 077 appears to have been superseded by `contact_phone` / `contact_whatsapp` in the actual queries. This is either a schema discrepancy or was fixed in a migration not visible in the numbered sequence.

## Open Questions

1. **Column name discrepancy: `host_phone` vs `contact_phone`**
   - What we know: Migration 077 creates `host_phone` and `host_email`. The verify route and property route SELECT `contact_phone` and `contact_whatsapp`. These must exist as columns (queries would fail otherwise).
   - What's unclear: Whether a rename happened (missing migration) or these are aliases.
   - Recommendation: During implementation, run `\d accom_properties` against the actual database to confirm column names before writing the new migration. If both exist, the migration is fine. If only `host_phone` exists, the API routes need investigation.

2. **Coffeeshop PWA production URL**
   - What we know: In development, coffeeshop runs on `:3004`. The merchant slug is `roots-danang`.
   - What's unclear: The production Vercel deployment URL for the coffeeshop PWA.
   - Recommendation: Use `NEXT_PUBLIC_COFFEESHOP_BASE_URL` env var. Can be set later during deployment configuration. Default to empty string for same-domain routing.

3. **F&B service category identification**
   - What we know: Service categories have slugs (`breakfast`, `minibar`, `laundry`). For the static menu, we need to show only F&B-relevant categories.
   - What's unclear: Whether to filter by slug convention (`breakfast`, `restaurant`, `minibar`) or add a `is_fnb` flag to categories.
   - Recommendation: Filter by slug convention. The existing seed data uses `breakfast` and `minibar` slugs. Add a constant list of F&B slugs (`['breakfast', 'restaurant', 'minibar', 'bar', 'cafe']`) in the component. This avoids a schema change and is flexible enough for v1.1.

## Sources

### Primary (HIGH confidence)

All findings are based on direct code inspection of the existing codebase:

- `shared/database/migrations/schema/077-accommodations-schema.sql` -- accom_properties schema
- `shared/database/migrations/schema/078-accommodations-seed.sql` -- seed data and conventions setup
- `shared/database/migrations/schema/079-accommodations-phase6-extensions.sql` -- quick_actions, return banner pattern
- `shared/database/migrations/schema/050-b2b-conventions.sql` -- conventions system schema
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` -- dashboard shell composition
- `apps/accommodations/frontend/components/stay/ServicesCarousel.tsx` -- section component pattern
- `apps/accommodations/frontend/components/stay/LocalDeals.tsx` -- deals rendering pattern
- `apps/accommodations/frontend/components/stay/QuickActions.tsx` -- quick actions pattern
- `apps/accommodations/frontend/app/api/stay/[code]/deals/route.ts` -- conventions query pattern
- `apps/accommodations/frontend/app/api/stay/[code]/property/route.ts` -- property data fetching
- `apps/accommodations/frontend/app/api/stay/verify/route.ts` -- full verify flow
- `apps/accommodations/frontend/types/stay.ts` -- type definitions
- `apps/accommodations/frontend/lib/stay-api.ts` -- client-side API helpers
- `apps/accommodations/frontend/lib/auth.ts` -- JWT auth
- `apps/coffeeshop/frontend/config/coffeeshop.config.ts` -- merchant slug pattern

### Secondary (MEDIUM confidence)

- CONTEXT.md decisions document -- user-locked decisions for this phase

### Tertiary (LOW confidence)

None. No external research was needed. This is entirely an internal integration task.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- No new dependencies, all patterns verified in codebase
- Architecture: HIGH -- Direct reuse of existing section component pattern, verified in 6+ existing components
- Pitfalls: HIGH -- Based on direct code inspection, identified real schema discrepancy and data model concerns

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable -- internal codebase patterns, not external dependencies)
