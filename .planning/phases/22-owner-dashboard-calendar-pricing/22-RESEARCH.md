# Phase 22: Owner Dashboard - Calendar & Pricing - Research

**Researched:** 2026-01-31
**Domain:** Backoffice calendar UI, date blocking, seasonal pricing, discount management
**Confidence:** HIGH

## Summary

Phase 22 adds a Calendar & Pricing management page to the backoffice accommodations section. The codebase already has strong precedent for every piece needed: `react-day-picker` v9 is used in the guest-facing BookingCalendar (accommodations frontend), `date-fns` v4 is installed in backoffice, the backoffice has two custom month-grid calendar components (MonthView for reservations, CalendarView for schedule) that demonstrate the team's pattern for building calendar UIs. The existing API pattern (supabaseAdmin + validateAdminApiKey + allowlisted PUT fields) is well-established across 4 API routes.

The primary work is: (1) a new SQL migration for `accom_seasonal_pricing` and `accom_room_blocks` tables, (2) 3 new API routes (calendar data, room blocks, seasonal pricing), (3) a backoffice calendar page with color-coded month grid + sidebar detail panel + pricing/discount sections, (4) sidebar nav addition.

**Primary recommendation:** Build a custom month grid component (not react-day-picker) following the pattern in `MonthView.tsx` and `CalendarView.tsx` which already exist in backoffice. These custom grids allow cell content (price labels, status colors, multi-booking indicators) that react-day-picker's DayPicker cannot render natively. Install react-day-picker only if range selection UX proves difficult with custom grid.

## Standard Stack

### Core

| Library               | Version                                         | Purpose                                                            | Why Standard                       |
| --------------------- | ----------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------- |
| date-fns              | ^4.1.0                                          | Date math (start/endOfMonth, eachDayOfInterval, format, addMonths) | Already in backoffice package.json |
| Next.js 14 App Router | 14.2.35                                         | Page routing, API routes                                           | Existing framework                 |
| Tailwind CSS          | ^3.4.1                                          | Styling                                                            | Existing styling system            |
| Phosphor Icons        | via lucide (backoffice) + @phosphor-icons/react | Icons                                                              | Existing in backoffice             |
| Supabase JS           | ^2.86.2                                         | Database client (supabaseAdmin)                                    | Existing in backoffice             |

### Supporting

| Library          | Version | Purpose                         | When to Use                                            |
| ---------------- | ------- | ------------------------------- | ------------------------------------------------------ |
| react-day-picker | ^9.13.0 | Range picker for date selection | ONLY if custom grid range selection proves too complex |

### Alternatives Considered

| Instead of                           | Could Use                     | Tradeoff                                                                                                                                                       |
| ------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Custom month grid                    | react-day-picker DayPicker    | DayPicker lacks cell content slots (no price labels in cells). Custom grid matches existing MonthView.tsx and CalendarView.tsx patterns already in backoffice. |
| react-day-picker for range selection | Click handlers on custom grid | Custom click-start + click-end is simpler than integrating DayPicker's range mode with custom cell rendering. Backoffice MonthView already has onDateClick.    |

**Installation:**

```bash
# No new packages needed -- date-fns ^4.1.0 already in backoffice
# If needed later: pnpm add react-day-picker --filter backoffice
```

## Architecture Patterns

### Recommended Project Structure

```
apps/backoffice/
├── app/(dashboard)/accommodations/
│   ├── calendar/
│   │   └── page.tsx              # Calendar & Pricing page (NEW)
│   ├── bookings/                 # Existing
│   ├── rooms/                    # Existing
│   ├── settings/                 # Existing
│   └── qr-codes/                 # Existing
├── app/api/accommodations/
│   ├── calendar/
│   │   └── route.ts             # GET: merged calendar data (bookings + blocks + pricing)
│   ├── room-blocks/
│   │   └── route.ts             # POST, DELETE: create/remove blocks
│   ├── seasonal-pricing/
│   │   └── route.ts             # GET, POST, PUT, DELETE: manage overrides
│   ├── bookings/                 # Existing
│   ├── rooms/                    # Existing
│   └── property/                 # Existing
├── components/accommodations/
│   ├── AvailabilityCalendar.tsx  # Month grid with color coding (NEW)
│   ├── CalendarDetailPanel.tsx   # Sidebar panel for selected date (NEW)
│   ├── SeasonalPricingManager.tsx # List + CRUD for price overrides (NEW)
│   ├── DiscountSettings.tsx      # Weekly/monthly discount sliders (NEW)
│   ├── RoomManager.tsx           # Existing
│   ├── BookingActions.tsx        # Existing
│   └── BookingStatusBadge.tsx    # Existing
└── lib/accommodations/
    └── helpers.ts                # Existing (validateAdminApiKey, formatBookingPrice)
```

### Pattern 1: Custom Month Grid (following MonthView.tsx)

**What:** Build calendar grid using date-fns math, not a library component
**When to use:** When cells need custom content (price, status color, icons)
**Example:**

```typescript
// Source: apps/backoffice/components/reservations/MonthView.tsx (existing pattern)
const calendarDays = useMemo(() => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: gridStart, end: gridEnd });
}, [currentMonth]);

// Each cell renders:
// - Day number
// - Background color based on status (booked/available/blocked)
// - Price label (base or override)
// - Booking count dot
```

### Pattern 2: Merged Calendar Data API

**What:** Single GET endpoint returns all calendar data for a month + room
**When to use:** Avoid N+1 client-side fetches
**Example:**

```typescript
// GET /api/accommodations/calendar?propertyId=X&roomId=Y&month=2026-02
// Returns:
{
  bookings: [{ check_in_date, check_out_date, guest_name, status }],
  blocks: [{ date_from, date_to, reason, id }],
  seasonalPricing: [{ date_from, date_to, price_per_night, label, id }],
  room: { base_price_per_night, currency }
}
```

### Pattern 3: Allowlisted PUT Fields (existing)

**What:** API routes whitelist updatable fields to prevent mass-assignment
**When to use:** All PUT/PATCH endpoints
**Example:**

```typescript
// Source: apps/backoffice/app/api/accommodations/rooms/route.ts (existing)
const allowedFields = ['room_number', 'room_type', 'capacity', ...];
const update: Record<string, unknown> = {};
for (const key of allowedFields) {
  if (key in fields) update[key] = fields[key];
}
```

### Pattern 4: Page Layout (existing backoffice)

**What:** Pages use PROPERTY_ID + ADMIN_API_KEY from env, fetch on mount, handle loading/error states
**When to use:** All accommodations backoffice pages
**Example:**

```typescript
// Source: apps/backoffice/app/(dashboard)/accommodations/bookings/page.tsx
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';

// useEffect fetch with auth headers
const res = await fetch(
  `/api/accommodations/calendar?propertyId=${PROPERTY_ID}&...`,
  {
    headers: { Authorization: `Bearer ${ADMIN_API_KEY}` },
  }
);
```

### Anti-Patterns to Avoid

- **Don't use react-day-picker for the owner calendar grid.** DayPicker is optimized for date selection (guest booking flow), not for data-rich calendar displays. The owner needs to see prices, booking names, and status colors inside each cell. Custom grid is the right approach (proven by MonthView.tsx).
- **Don't fetch bookings, blocks, and pricing separately.** Merge into one API call per month/room to avoid waterfalls.
- **Don't store prices as DECIMAL/NUMERIC.** All prices are INTEGER minor currency units (existing convention across accom_rooms.base_price_per_night, accom_bookings.total_price, etc.).
- **Don't allow overlapping seasonal pricing for the same room.** Use CHECK or application-level validation to reject overlapping date ranges. Simpler than "last-wins" merge logic.

## Don't Hand-Roll

| Problem                      | Don't Build                    | Use Instead                                                                                                 | Why                                                                          |
| ---------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Month grid date math         | Manual day-of-week calculation | `date-fns` startOfMonth/endOfMonth/startOfWeek/endOfWeek/eachDayOfInterval                                  | Edge cases with month boundaries, leap years                                 |
| Date range overlap detection | Custom SQL                     | `daterange(d1, d2, '[)') && daterange(d3, d4, '[)')` PostgreSQL overlap operator                            | Already used in accom_bookings_no_overlap EXCLUDE constraint (migration 083) |
| Price formatting             | `toFixed(2)`                   | `formatBookingPrice()` from `lib/accommodations/helpers.ts` or `formatPrice()` from accommodations frontend | Handles VND (no decimals) vs USD (2 decimals) correctly                      |
| Date formatting              | Manual string concat           | `date-fns` format()                                                                                         | Locale-aware, handles edge cases                                             |
| Calendar navigation          | Manual month increment         | `date-fns` addMonths/subMonths                                                                              | Handles year boundaries                                                      |

**Key insight:** PostgreSQL's `daterange` type with GIST indexes is the right tool for both double-booking prevention (already done) and seasonal pricing overlap prevention. Don't build overlap detection in application code.

## Common Pitfalls

### Pitfall 1: Half-Open Date Range Mismatch

**What goes wrong:** Using `[check_in, check_out]` (inclusive both ends) causes off-by-one errors where checkout day appears booked
**Why it happens:** Hotel convention is that checkout day is available for new check-in
**How to avoid:** Always use half-open `[)` ranges: `daterange(check_in, check_out, '[)')`. This is already established in migration 083 (EXCLUDE constraint).
**Warning signs:** Calendar shows checkout day as "booked", back-to-back bookings appear to overlap

### Pitfall 2: Price Display in Wrong Units

**What goes wrong:** Showing 50000 VND as "500.00 VND" or $45 as "4500"
**Why it happens:** Forgetting that VND minor unit = 1 (not 100), or forgetting to divide USD by 100
**How to avoid:** Use `formatBookingPrice()` from helpers.ts (already handles this). For input forms, convert user-entered major units to minor: `value * (currency === 'VND' ? 1 : 100)`.
**Warning signs:** Prices look absurdly high or low

### Pitfall 3: Calendar Not Updating After Block/Price Changes

**What goes wrong:** Owner creates a block but calendar still shows dates as available
**Why it happens:** Stale state after mutation, missing refetch
**How to avoid:** After any POST/PUT/DELETE, refetch calendar data for the current month/room. Use a simple `refreshKey` counter or callback pattern.
**Warning signs:** User has to manually refresh browser to see changes

### Pitfall 4: Timezone Issues with Date Cells

**What goes wrong:** A booking on Jan 15 appears on Jan 14 or Jan 16 in the calendar
**Why it happens:** Converting DATE strings to JavaScript Date objects applies local timezone offset
**How to avoid:** Parse dates as `parseISO('2026-01-15')` from date-fns (returns midnight local time). Compare dates using `isSameDay()` not `===`. Store all dates as DATE (not TIMESTAMPTZ) in the DB for check-in/check-out.
**Warning signs:** Bookings shift by one day depending on user's timezone

### Pitfall 5: Room Filter "All Rooms" Aggregation Complexity

**What goes wrong:** Showing all rooms' bookings on one calendar creates visual chaos
**Why it happens:** Multiple bookings on same date across different rooms
**How to avoid:** Default to first room, "All rooms" shows summary counts per day (e.g., "2/5 rooms booked") rather than individual booking details. Detail panel shows per-room breakdown on click.
**Warning signs:** Calendar cells overflow with too many bookings

### Pitfall 6: Seasonal Pricing Overlap

**What goes wrong:** Owner creates "High Season Jan 1-31" and "New Year Jan 1-5" and the system doesn't know which price to use
**Why it happens:** No constraint preventing overlapping date ranges per room
**How to avoid:** Add an EXCLUDE constraint on `accom_seasonal_pricing` similar to the booking overlap constraint. Reject overlaps at DB level. UI shows validation error: "This overlaps with [existing override]. Delete or adjust it first."
**Warning signs:** Guest sees wrong price on booking page

## Code Examples

### SQL Migration: New Tables

```sql
-- accom_room_blocks: date ranges when a room is blocked (maintenance, personal use)
CREATE TABLE accom_room_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES accom_rooms(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  reason TEXT DEFAULT 'other' CHECK (reason IN ('maintenance', 'personal_use', 'other')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (date_to > date_from)
);

-- accom_seasonal_pricing: price overrides for specific date ranges
CREATE TABLE accom_seasonal_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES accom_rooms(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  price_per_night INTEGER NOT NULL CHECK (price_per_night > 0),
  label TEXT,  -- e.g., "High Season", "New Year"
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (date_to > date_from),
  -- Prevent overlapping price ranges for the same room
  EXCLUDE USING GIST (
    room_id WITH =,
    daterange(date_from, date_to, '[)') WITH &&
  )
);

-- Indexes
CREATE INDEX idx_accom_room_blocks_room_dates ON accom_room_blocks(room_id, date_from, date_to);
CREATE INDEX idx_accom_room_blocks_property ON accom_room_blocks(property_id);
CREATE INDEX idx_accom_seasonal_pricing_room_dates ON accom_seasonal_pricing(room_id, date_from, date_to);
CREATE INDEX idx_accom_seasonal_pricing_property ON accom_seasonal_pricing(property_id);

-- RLS (same ownership chain pattern as existing accom tables)
ALTER TABLE accom_room_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_seasonal_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY accom_room_blocks_owner_manage ON accom_room_blocks FOR ALL TO authenticated
  USING (property_id IN (
    SELECT id FROM accom_properties WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  ));

CREATE POLICY accom_seasonal_pricing_owner_manage ON accom_seasonal_pricing FOR ALL TO authenticated
  USING (property_id IN (
    SELECT id FROM accom_properties WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  ));

GRANT ALL ON accom_room_blocks TO authenticated;
GRANT ALL ON accom_seasonal_pricing TO authenticated;
```

### Calendar Data Aggregation API

```typescript
// GET /api/accommodations/calendar?propertyId=X&roomId=Y&month=2026-02
// Source: follows pattern from apps/backoffice/app/api/accommodations/bookings/route.ts

export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const roomId = searchParams.get('roomId'); // optional, null = all rooms
  const month = searchParams.get('month'); // format: 2026-02

  // Parse month to get date range (with buffer for rendering prev/next month days)
  const monthDate = parseISO(`${month}-01`);
  const rangeStart = format(startOfWeek(startOfMonth(monthDate)), 'yyyy-MM-dd');
  const rangeEnd = format(endOfWeek(endOfMonth(monthDate)), 'yyyy-MM-dd');

  // Parallel fetch: bookings, blocks, pricing
  const [bookingsRes, blocksRes, pricingRes] = await Promise.all([
    supabaseAdmin
      .from('accom_bookings')
      .select('id, check_in_date, check_out_date, guest_name, status, room_id')
      .eq('property_id', propertyId)
      .gte('check_out_date', rangeStart)
      .lte('check_in_date', rangeEnd)
      .not('status', 'in', '("cancelled","no_show")'),

    supabaseAdmin
      .from('accom_room_blocks')
      .select('id, room_id, date_from, date_to, reason, notes')
      .eq('property_id', propertyId)
      .gte('date_to', rangeStart)
      .lte('date_from', rangeEnd),

    supabaseAdmin
      .from('accom_seasonal_pricing')
      .select('id, room_id, date_from, date_to, price_per_night, label')
      .eq('property_id', propertyId)
      .gte('date_to', rangeStart)
      .lte('date_from', rangeEnd),
  ]);

  // Apply roomId filter if provided
  // ... filter results by roomId ...

  return NextResponse.json({
    bookings: bookingsRes.data,
    blocks: blocksRes.data,
    seasonalPricing: pricingRes.data,
  });
}
```

### Custom Month Grid Component Pattern

```typescript
// Source: adapted from apps/backoffice/components/reservations/MonthView.tsx
interface CalendarDay {
  date: Date;
  dateStr: string; // yyyy-MM-dd
  isCurrentMonth: boolean;
  isToday: boolean;
  status: 'available' | 'booked' | 'blocked' | 'partial';
  pricePerNight: number | null; // null = use base price
  priceLabel: string | null;    // e.g., "High Season"
  bookingCount: number;
}

// Color mapping
const STATUS_BG: Record<string, string> = {
  available: 'bg-white hover:bg-green-50',
  booked: 'bg-blue-50 border-blue-200',
  blocked: 'bg-gray-100 border-gray-200',  // + diagonal stripe via CSS
  partial: 'bg-amber-50 border-amber-200',  // some rooms booked
};

// Cell rendering includes price
<div className={cn('h-20 border p-1 cursor-pointer', STATUS_BG[day.status])}>
  <span className="text-xs font-medium">{format(day.date, 'd')}</span>
  {day.pricePerNight && (
    <span className="text-[10px] text-gray-500 block">
      {formatBookingPrice(day.pricePerNight, currency)}
    </span>
  )}
</div>
```

### Discount Settings with Preview

```typescript
// Weekly/monthly discount slider with live preview
// Values come from accom_properties.weekly_discount_percent / monthly_discount_percent

const weeklyPreview = useMemo(() => {
  if (!basePrice || weeklyDiscount <= 0) return null;
  const nights = 7;
  const subtotal = basePrice * nights;
  const discount = Math.round((subtotal * weeklyDiscount) / 100);
  return { subtotal, discount, total: subtotal - discount };
}, [basePrice, weeklyDiscount]);

// UI: range input 0-50 + number input
<input type="range" min={0} max={50} value={weeklyDiscount}
  onChange={(e) => setWeeklyDiscount(Number(e.target.value))} />
<span>{weeklyDiscount}%</span>
{weeklyPreview && (
  <p className="text-xs text-gray-500">
    7 nights: {formatPrice(weeklyPreview.subtotal)} - {weeklyDiscount}% =
    <strong>{formatPrice(weeklyPreview.total)}</strong>
  </p>
)}
```

## State of the Art

| Old Approach                 | Current Approach         | When Changed  | Impact                                                                                                 |
| ---------------------------- | ------------------------ | ------------- | ------------------------------------------------------------------------------------------------------ |
| date-fns v3                  | date-fns v4              | 2024          | Backoffice already on v4, accommodations frontend on v3. Both APIs compatible for date math used here. |
| react-day-picker v8          | react-day-picker v9      | 2024          | v9 uses CSS modules, different import path. Guest BookingCalendar already on v9.                       |
| Heavy modal dialogs for CRUD | Inline panels / sidebars | Ongoing trend | Airbnb calendar uses inline panels. Match existing backoffice lightweight pattern.                     |

**Deprecated/outdated:**

- None relevant. All existing libraries and patterns are current.

## Open Questions

1. **Room blocks vs booking overlap**
   - What we know: `accom_bookings_no_overlap` EXCLUDE constraint prevents double-booking per room. Room blocks are a separate concept (owner manually blocks dates).
   - What's unclear: Should blocks also use an EXCLUDE constraint against bookings? Or can a block overlap an existing booking (e.g., owner wants to block a period that partially overlaps an existing booking)?
   - Recommendation: Blocks should NOT overlap active bookings. Add application-level validation that checks for existing confirmed/checked_in bookings before creating a block. Don't use EXCLUDE across tables (PostgreSQL doesn't support cross-table EXCLUDE). API returns error: "Cannot block dates with existing bookings."

2. **Discount save endpoint**
   - What we know: `weekly_discount_percent` and `monthly_discount_percent` already exist on `accom_properties`.
   - What's unclear: Should we use the existing `/api/accommodations/property` PUT route (which already supports property updates) or create a separate endpoint?
   - Recommendation: Use the existing `/api/accommodations/property` PUT route. Just add `weekly_discount_percent` and `monthly_discount_percent` to its allowedFields list.

## Sources

### Primary (HIGH confidence)

- **Codebase analysis** - Direct reading of 15+ source files in the repository
  - `apps/backoffice/components/reservations/MonthView.tsx` - Custom month grid pattern
  - `apps/backoffice/components/schedule/CalendarView.tsx` - Another custom calendar pattern
  - `apps/accommodations/frontend/components/booking/BookingCalendar.tsx` - react-day-picker v9 usage
  - `apps/backoffice/app/api/accommodations/rooms/route.ts` - API route pattern (GET/POST/PUT with allowlisted fields)
  - `apps/backoffice/app/(dashboard)/accommodations/bookings/page.tsx` - Backoffice page pattern
  - `apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx` - Settings form pattern
  - `shared/database/migrations/schema/077-accommodations-schema.sql` - Base schema
  - `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` - EXCLUDE constraint, btree_gist, pricing columns
  - `apps/accommodations/frontend/lib/price-utils.ts` - Price calculation with VND/USD handling
  - `apps/backoffice/lib/accommodations/helpers.ts` - Auth, formatBookingPrice, status colors

### Secondary (MEDIUM confidence)

- PostgreSQL `daterange` and GIST exclusion constraints - well-documented PostgreSQL feature, already proven in migration 083

### Tertiary (LOW confidence)

- None. All findings are verified against existing codebase.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - All libraries already installed and used in codebase
- Architecture: HIGH - All patterns proven by existing backoffice pages and API routes
- Pitfalls: HIGH - Half-open ranges, price units, timezone issues all documented from existing codebase experience

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable codebase, no major version changes expected)
