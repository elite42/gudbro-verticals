# Phase 4: Database Foundation - Research

**Researched:** 2026-01-29
**Domain:** PostgreSQL schema design (Supabase), RLS policies, accommodation domain modeling
**Confidence:** HIGH

## Summary

This phase creates the PostgreSQL database schema for the accommodations vertical: properties, rooms, bookings, services, and local partnerships. The codebase already has 76 migrations with well-established patterns for table creation, RLS policies, triggers, indexes, and translations.

The research focused on: (1) extracting exact patterns from existing migrations to ensure consistency, (2) understanding the conventions system (migration 050) for partnership reuse, (3) designing the booking code generation approach, and (4) determining the correct RLS strategy for guest access via booking code (a new pattern not present in the current codebase).

**Primary recommendation:** Follow existing migration patterns exactly (TEXT+CHECK, UUID PKs, TIMESTAMPTZ, `update_updated_at_column()` trigger). The novel challenge is guest-facing RLS without authentication -- use a verification function approach rather than standard RLS policies for guest access.

## Standard Stack

### Core

| Library           | Version        | Purpose            | Why Standard                               |
| ----------------- | -------------- | ------------------ | ------------------------------------------ |
| PostgreSQL        | 15+ (Supabase) | Database engine    | Project standard                           |
| Supabase RLS      | Built-in       | Row Level Security | Already used in all 76 migrations          |
| gen_random_uuid() | Built-in       | UUID generation    | Project standard (newer migrations)        |
| plpgsql           | Built-in       | Stored procedures  | Used for triggers, booking code generation |

### Supporting

| Library                      | Version           | Purpose                 | When to Use                            |
| ---------------------------- | ----------------- | ----------------------- | -------------------------------------- |
| `update_updated_at_column()` | Existing function | Auto-update timestamps  | Every table with `updated_at`          |
| `partner_conventions` table  | Migration 050     | Local partnership deals | DB-06: link partnerships to properties |

### Alternatives Considered

| Instead of                 | Could Use                            | Tradeoff                                                                                                                   |
| -------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Separate properties table  | Extend `merchants` table             | Properties are fundamentally different from F&B merchants -- separate table is cleaner, avoids polluting core schema       |
| Custom partnerships table  | Existing `partner_conventions` (050) | Decision locked: reuse conventions system. Property acts as convention source via `partner_type = 'accommodation'`         |
| pgcrypto for booking codes | plpgsql random generation            | pgcrypto may not be enabled; plpgsql LOOP with uniqueness check is the proven pattern (see `generate_voucher_code` in 050) |

## Architecture Patterns

### Recommended Migration Structure

```
shared/database/migrations/schema/
├── 077-accommodations-foundation.sql    # Properties, rooms, bookings, services, service items
├── 078-accommodations-rls.sql           # All RLS policies (separated for clarity)
├── 079-accommodations-seed.sql          # Demo data for Da Nang property
```

**Rationale for 3 files:** Migration 050 puts everything in one file (577 lines) which works but is harder to debug. Splitting schema/RLS/seed makes each migration focused and independently verifiable. However, a single file is also acceptable per CONTEXT.md (Claude's discretion).

**Alternative: Single file** `077-accommodations-foundation.sql` with clearly labeled sections. This is simpler and matches migration 050's approach.

**Recommendation:** Use 2 files: `077-accommodations-schema.sql` (tables + indexes + triggers + RLS) and `078-accommodations-seed.sql` (demo data). This keeps schema and data separate while avoiding unnecessary splitting.

### Pattern 1: Table Creation (from codebase)

**What:** Standard table structure with UUID PK, TIMESTAMPTZ, TEXT+CHECK
**When to use:** Every new table
**Example:**

```sql
-- Source: migrations 050, 068, 073 patterns
CREATE TABLE IF NOT EXISTS accom_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,

  -- Type constraint using TEXT+CHECK (NEVER ENUM)
  property_type TEXT NOT NULL DEFAULT 'apartment' CHECK (property_type IN (
    'apartment', 'hotel', 'hostel', 'villa', 'guesthouse', 'resort', 'other'
  )),

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Pattern 2: RLS with Account Roles (from migration 050, 068)

**What:** Owner/staff access via `account_roles` table
**When to use:** Owner CRUD access to their own properties
**Example:**

```sql
-- Source: migration 068 (site_sections) - newer pattern using brands/organizations
-- For accommodations, link via property owner
CREATE POLICY "accom_properties_owner_manage"
  ON accom_properties FOR ALL TO authenticated
  USING (
    owner_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
    OR auth.role() = 'service_role'
  );
```

### Pattern 3: Guest Access via Booking Code (NEW - not in codebase)

**What:** Unauthenticated guest reads data by presenting booking code + last name
**When to use:** Guest In-Stay Dashboard access
**Example:**

```sql
-- Guest verification function (similar to validate_voucher in 050)
CREATE OR REPLACE FUNCTION verify_booking_access(
  p_booking_code TEXT,
  p_last_name TEXT
)
RETURNS TABLE(
  is_valid BOOLEAN,
  property_id UUID,
  booking_id UUID,
  room_id UUID,
  guest_name TEXT,
  check_in DATE,
  check_out DATE
)
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    true,
    b.property_id,
    b.id,
    b.room_id,
    b.guest_name,
    b.check_in_date,
    b.check_out_date
  FROM accom_bookings b
  WHERE b.booking_code = p_booking_code
    AND LOWER(b.guest_last_name) = LOWER(p_last_name)
    AND b.check_in_date <= CURRENT_DATE
    AND b.check_out_date + INTERVAL '24 hours' >= NOW()
    AND b.status IN ('confirmed', 'checked_in');

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DATE, NULL::DATE;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

### Pattern 4: Booking Code Generation (adapted from generate_voucher_code in 050)

**What:** Generate unique BK-XXXXXX codes with ambiguous character exclusion
**When to use:** Booking creation
**Example:**

```sql
CREATE OR REPLACE FUNCTION generate_booking_code()
RETURNS TEXT
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';  -- Excludes 0/O, 1/I/L
  code TEXT;
  i INTEGER;
  exists_already BOOLEAN;
BEGIN
  LOOP
    code := 'BK-';
    FOR i IN 1..6 LOOP
      code := code || SUBSTR(chars, FLOOR(RANDOM() * LENGTH(chars) + 1)::INTEGER, 1);
    END LOOP;
    SELECT EXISTS(SELECT 1 FROM accom_bookings WHERE booking_code = code) INTO exists_already;
    EXIT WHEN NOT exists_already;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;
```

### Pattern 5: Translations Table (from migration 008)

**What:** Separate translation tables per entity with language_code FK
**When to use:** Service categories and service items that need multi-language
**Example:**

```sql
CREATE TABLE IF NOT EXISTS accom_service_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_item_id UUID NOT NULL REFERENCES accom_service_items(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_machine_translated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(service_item_id, language_code)
);
```

### Anti-Patterns to Avoid

- **ENUM types:** Never use CREATE TYPE ... AS ENUM. Always TEXT + CHECK constraint.
- **UUID with non-hex characters:** Only 0-9, a-f in UUID values.
- **Array syntax `[]`:** PostgreSQL uses `'{"a","b"}'` not `'["a","b"]'`.
- **RLS USING(true) for writes:** Never use `FOR ALL USING (true)`. Use `auth.role() = 'service_role'` for backend writes.
- **Missing search_path on functions:** All functions MUST have `SET search_path = public`.
- **Hardcoded service categories:** Categories must be dynamic per property, not a CHECK constraint on a column. Use a separate `accom_service_categories` table.

## Don't Hand-Roll

| Problem                 | Don't Build                  | Use Instead                                      | Why                                                                                   |
| ----------------------- | ---------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Local partnerships      | New partnership tables       | `partner_conventions` (migration 050)            | Already has partner_type='accommodation', benefit types, validity dates, verification |
| Booking code generation | Simple random string         | Dedicated PL/pgSQL function with uniqueness loop | Collision avoidance, consistent format, reusable                                      |
| Timestamp updates       | Manual updated_at in queries | `update_updated_at_column()` trigger (existing)  | Already exists, all tables use it                                                     |
| Voucher/coupon codes    | Custom implementation        | `convention_vouchers` (migration 050)            | Deferred to v1.2+, but infrastructure exists                                          |

**Key insight:** The conventions system (migration 050) is surprisingly well-suited for accommodations partnerships. The `partner_conventions` table already supports `partner_type = 'accommodation'`, benefit types (percentage/fixed discount), validity dates, and verification methods. The property just needs to create convention records where the property acts as the "merchant" offering the deal context, or more precisely, the convention links a partner (restaurant, tour operator) to the property's context.

### How Partnerships Integration Works

The existing `partner_conventions` table has:

- `merchant_id` -- the F&B merchant offering the deal (this is the PARTNER in our case)
- `partner_type` -- includes 'accommodation'
- `partner_id` -- UUID of the accommodation property
- `partner_name` -- name of the accommodation

**For accommodations, the flow is REVERSED:**

- The accommodation property is the "partner" (`partner_type = 'accommodation'`, `partner_id = property.id`)
- The local business (restaurant, tour operator) is the `merchant_id`
- The convention describes what the local business offers to the property's guests

**Important:** This means we query `partner_conventions` WHERE `partner_type = 'accommodation' AND partner_id = property_id` to get all deals available to guests of that property.

**Alternative approach (simpler for v1.1):** Since we're view-only with no coupon tracking, we could create a lightweight `accom_local_deals` table that's simpler than the full conventions system. But the CONTEXT.md decision says to use the conventions system, so we follow that.

**Recommendation:** Seed `partner_conventions` records where the local businesses (restaurant, tour, transport) are the merchants and the property is listed as `partner_type = 'accommodation'`. This requires the demo merchants to exist or use placeholder UUIDs.

**CRITICAL ISSUE:** The `partner_conventions.merchant_id` references `merchants(id)`. For the seed data, we need actual merchant records for the partner businesses (restaurant, tour operator, transport). Options:

1. Create minimal merchant records for demo partners
2. Use a new junction/linking table specific to accommodations
3. Make merchant_id nullable for accommodation partnerships

**Recommendation:** Option 1 -- create minimal merchant records for the 3 demo partners. This is realistic (in production, these businesses would have their own GUDBRO presence).

## Common Pitfalls

### Pitfall 1: Guest Access Without Authentication

**What goes wrong:** Standard RLS assumes `auth.uid()` exists. Guests access via booking code without logging in.
**Why it happens:** All existing tables use authenticated user patterns. Accommodations introduces unauthenticated guest access.
**How to avoid:** Use `SECURITY DEFINER` functions to bypass RLS. The API route validates booking code + last name, then uses the service role to fetch data. Do NOT try to make RLS policies work with booking codes -- it's the wrong abstraction.
**Warning signs:** Trying to put booking code logic inside RLS USING clauses.

### Pitfall 2: Timezone Handling for Booking Dates

**What goes wrong:** Check-in/check-out dates compared with server time in wrong timezone.
**Why it happens:** `CURRENT_DATE` uses server timezone, but bookings are in property's local timezone.
**How to avoid:** Store check-in/check-out as `DATE` (not TIMESTAMPTZ) since they represent calendar dates. The 24h grace period after checkout should be computed in the verification function using the property's timezone. Store property timezone in the properties table.
**Warning signs:** Guests locked out at midnight server time when they still have 6 hours left locally.

### Pitfall 3: Conventions System Relationship Direction

**What goes wrong:** Confusion about who is `merchant_id` and who is `partner_id` in the conventions table.
**Why it happens:** In the F&B context, the coffeeshop (merchant) creates deals with office partners. In accommodations, the flow is reversed -- we want deals FROM local businesses TO the property's guests.
**How to avoid:** Document clearly: `merchant_id` = the business offering the deal (restaurant, tour op), `partner_id` = the property UUID, `partner_type` = 'accommodation'. The property "receives" deals, it doesn't create them.
**Warning signs:** Querying by merchant_id when you should query by partner_id.

### Pitfall 4: Price Storage as Integer (Cents)

**What goes wrong:** Storing prices as DECIMAL causes floating point display issues.
**Why it happens:** Natural instinct to use DECIMAL for money.
**How to avoid:** Per CONTEXT.md decision: store prices as `INTEGER` (cents). VND 50,000 = stored as 5000000 (in cents? No -- VND doesn't have subunits).
**IMPORTANT CORRECTION:** VND has no subunits (no cents). For VND, store as whole units (50000 = 50,000 VND). For USD, store as cents (1050 = $10.50). The currency from the property configuration determines interpretation.
**Recommendation:** Store as INTEGER representing the smallest currency unit. For VND (0 decimal places), 1 = 1 VND. For USD (2 decimal places), 1 = $0.01. Add a `price_unit` comment or rely on the property's currency to determine the multiplier.

### Pitfall 5: Booking Code Collision Under Load

**What goes wrong:** Two concurrent inserts generate the same booking code.
**Why it happens:** LOOP check + INSERT is not atomic without proper constraints.
**How to avoid:** Add `UNIQUE` constraint on `booking_code` column AND use the generation function. The UNIQUE constraint is the safety net; the function's loop is the optimization. Use DEFAULT value via trigger.
**Warning signs:** Duplicate key violations on booking_code.

### Pitfall 6: Missing `anon` Role Grants

**What goes wrong:** Guest-facing API calls fail because tables have no `anon` role access.
**Why it happens:** Most existing tables only grant to `authenticated`. Guest access is unauthenticated.
**How to avoid:** For guest-readable tables (properties, rooms, services, service items), add `GRANT SELECT ON ... TO anon;` AND create RLS policies for the `anon` role. See migration 068 which has `TO anon` policies.
**Warning signs:** 401/403 errors when calling Supabase from the PWA without login.

## Code Examples

### Complete Property Table

```sql
-- Source: Synthesized from migrations 001, 012, 050, 068, 073 patterns
CREATE TABLE IF NOT EXISTS accom_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  tagline TEXT,                -- Short description for cards

  -- Type
  property_type TEXT NOT NULL DEFAULT 'apartment' CHECK (property_type IN (
    'apartment', 'hotel', 'hostel', 'villa', 'guesthouse', 'resort', 'other'
  )),

  -- Location
  address TEXT,
  city TEXT,
  country_code TEXT NOT NULL DEFAULT 'VN',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',

  -- Contact
  host_name TEXT,
  host_phone TEXT,              -- WhatsApp number for guests
  host_email TEXT,
  emergency_phone TEXT,

  -- WiFi
  wifi_ssid TEXT,
  wifi_password TEXT,

  -- Settings
  currency TEXT NOT NULL DEFAULT 'VND',
  default_language TEXT NOT NULL DEFAULT 'en',
  supported_languages TEXT[] DEFAULT '{"en"}',
  check_in_time TIME DEFAULT '14:00',
  check_out_time TIME DEFAULT '11:00',

  -- Images (JSONB array of URLs)
  images JSONB DEFAULT '[]',
  cover_image_url TEXT,

  -- Amenities (JSONB array of strings)
  amenities JSONB DEFAULT '[]',

  -- House rules (JSONB or TEXT)
  house_rules TEXT,

  -- Owner (links to accounts)
  owner_id UUID REFERENCES accounts(id),

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Complete Booking Table

```sql
CREATE TABLE IF NOT EXISTS accom_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- References
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES accom_rooms(id) ON DELETE CASCADE,

  -- Booking code (BK-XXXXXX)
  booking_code TEXT NOT NULL UNIQUE,

  -- Guest info
  guest_name TEXT NOT NULL,              -- Full name
  guest_last_name TEXT NOT NULL,         -- For verification (stored separately for matching)
  guest_email TEXT,
  guest_phone TEXT,
  guest_count INTEGER NOT NULL DEFAULT 1,

  -- Dates (DATE not TIMESTAMPTZ -- these are calendar dates)
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN (
    'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'
  )),

  -- Notes
  special_requests TEXT,
  internal_notes TEXT,

  -- Source
  booking_source TEXT DEFAULT 'direct' CHECK (booking_source IN (
    'direct', 'booking_com', 'airbnb', 'expedia', 'walk_in', 'phone', 'other'
  )),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure check_out is after check_in
  CHECK (check_out_date > check_in_date)
);

-- Auto-generate booking code on insert
CREATE OR REPLACE FUNCTION set_booking_code()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.booking_code IS NULL THEN
    NEW.booking_code := generate_booking_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER accom_bookings_set_code
  BEFORE INSERT ON accom_bookings
  FOR EACH ROW EXECUTE FUNCTION set_booking_code();
```

### Service Categories and Items

```sql
-- Dynamic categories per property
CREATE TABLE IF NOT EXISTS accom_service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,               -- e.g., "Breakfast", "Minibar"
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT,                        -- Phosphor icon name
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(property_id, slug)
);

-- Items within categories
CREATE TABLE IF NOT EXISTS accom_service_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES accom_service_categories(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,    -- Smallest currency unit (cents/whole for VND)
  image_url TEXT,

  -- Availability
  is_always_available BOOLEAN DEFAULT true,
  available_from TIME,                  -- NULL if always available
  available_until TIME,

  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Seed Data Pattern

```sql
-- Demo property
INSERT INTO accom_properties (id, name, slug, description, property_type, city, country_code, timezone, currency, host_name, host_phone, wifi_ssid, wifi_password, amenities, check_in_time, check_out_time, is_active)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Roots Da Nang',
  'roots-danang',
  'Modern tourist apartment in the heart of Da Nang, steps from the beach.',
  'apartment',
  'Da Nang',
  'VN',
  'Asia/Ho_Chi_Minh',
  'VND',
  'Nguyen Van Minh',
  '+84 905 123 456',
  'Roots-Guest-5G',
  'welcome2danang',
  '["wifi", "air_conditioning", "kitchen", "washing_machine", "beach_access", "motorbike_parking"]',
  '14:00',
  '11:00',
  true
);
```

## State of the Art

| Old Approach                  | Current Approach                                   | When Changed                     | Impact                                  |
| ----------------------------- | -------------------------------------------------- | -------------------------------- | --------------------------------------- |
| `uuid_generate_v4()`          | `gen_random_uuid()`                                | Migration ~050+                  | No extension needed, built into PG13+   |
| ENUM types                    | TEXT + CHECK                                       | Architecture decision 2025-12-18 | Easier migrations, no ALTER TYPE issues |
| `merchant_users` for auth     | `accounts` + `account_roles` (P5)                  | P5 migration                     | Unified account system                  |
| `auth.uid()::text` comparison | `accounts.auth_id = auth.uid()` via accounts table | P5 migration                     | Cleaner auth chain                      |
| Single `merchants` table      | `organizations > brands > locations` hierarchy     | Migration 012                    | Multi-tenant architecture               |

**Important note on auth patterns:** The codebase has TWO auth patterns:

1. **Old (migration 001):** `merchant_users.auth_provider_id = auth.uid()::text`
2. **New (P5, migration 068):** `accounts.auth_id = auth.uid()` via account_roles

**Use the NEW pattern** (P5 accounts) for all new tables.

## Open Questions

1. **Property ownership model**
   - What we know: Properties need an owner for backoffice CRUD. The P5 `accounts` + `account_roles` system handles user-tenant relationships.
   - What's unclear: Should properties have a direct `owner_id` FK to `accounts`, or should ownership go through the organization > brand > location hierarchy (migration 012)?
   - Recommendation: Use `owner_id UUID REFERENCES accounts(id)` directly for v1.1 simplicity. The multi-tenant hierarchy is overkill for a single-property MVP. Can migrate to org/brand/location structure later.

2. **Conventions merchant_id for seed data**
   - What we know: `partner_conventions.merchant_id` must reference an existing `merchants` record.
   - What's unclear: Do demo partner businesses (restaurant, tour op, transport) already exist as merchants?
   - Recommendation: Create 3 minimal merchant records in the seed data for the partner businesses. This is realistic -- in production they'd be GUDBRO merchants too.

3. **Image storage approach**
   - What we know: Property images are needed. The codebase uses `TEXT` for URL fields (e.g., `logo_url`, `cover_image_url`).
   - What's unclear: Should we use Supabase Storage or external URLs?
   - Recommendation: Store as URL strings (TEXT). Supabase Storage integration is a separate concern. For seed data, use placeholder URLs. The `images` field as JSONB array of objects `[{"url": "...", "alt": "...", "order": 0}]` gives flexibility.

4. **Translation tables scope**
   - What we know: GUDBRO pattern is separate translation tables per entity (migration 008).
   - What's unclear: Which accommodations entities need translations?
   - Recommendation: Create translation tables for `accom_service_categories` and `accom_service_items` only. Property descriptions can use a simpler JSONB approach or a single `accom_property_translations` table. Skip room translations (room names are typically just numbers/types).

## Sources

### Primary (HIGH confidence)

- `shared/database/migrations/schema/050-b2b-conventions.sql` - Conventions system, voucher generation, RLS patterns
- `shared/database/migrations/schema/001-enable-rls-all-tables.sql` - RLS policy patterns
- `shared/database/migrations/schema/068-site-customization.sql` - Modern RLS with P5 accounts, anon role
- `shared/database/migrations/schema/073-useful-numbers.sql` - Recent migration patterns, seed data
- `shared/database/migrations/schema/008-menu-translations.sql` - Translation table pattern
- `shared/database/migrations/schema/012-multi-tenant-architecture.sql` - Organizations, brands, locations hierarchy
- `shared/database/_system/schema/001-menu-management.sql` - Merchants table structure
- `shared/database/_system/docs/STANDARDS/03-sql-patterns.md` - Official SQL patterns guide
- `docs/core/lessons/database.md` - Known database pitfalls

### Secondary (MEDIUM confidence)

- `docs/reference/DATABASE-SCHEMA.md` - Schema documentation (slightly outdated: last updated at migration 041, current is 076)
- `.planning/phases/04-database-foundation/04-CONTEXT.md` - User decisions and constraints

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - All patterns directly observed from 10+ existing migrations
- Architecture: HIGH - Table design follows established codebase patterns exactly
- Pitfalls: HIGH - All pitfalls derived from documented lessons and observed migration patterns
- Guest access pattern: MEDIUM - New pattern (booking code verification) not in codebase, designed by analogy with voucher validation in migration 050
- Conventions integration: MEDIUM - Relationship direction for accommodations is reversed from F&B usage, needs careful implementation

**Table naming convention recommendation:** Prefix all new tables with `accom_` to namespace the accommodations vertical and avoid collision with existing tables. Tables: `accom_properties`, `accom_rooms`, `accom_bookings`, `accom_service_categories`, `accom_service_items`, `accom_service_translations`.

**Migration numbering:** Next available is 077. Use 077 for schema + RLS, 078 for seed data.

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (stable domain, no external dependency changes expected)
