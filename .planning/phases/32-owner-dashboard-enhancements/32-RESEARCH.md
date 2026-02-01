# Phase 32: Owner Dashboard Enhancements - Research

**Researched:** 2026-02-01
**Domain:** CSS Grid Gantt calendar, multi-step onboarding wizard, property data management
**Confidence:** HIGH

## Summary

This phase adds three major features to the backoffice accommodation owner dashboard: (1) a Gantt-style timeline calendar showing rooms x dates, (2) a multi-step onboarding wizard for new property owners, and (3) structured policies and complete property data forms. All three build on existing codebase patterns -- the backoffice already has an AvailabilityCalendar, RoomManager, OnboardingChecklist, and property settings page that serve as direct foundations.

The critical decision (confirmed in STATE.md) is to build the Gantt calendar with pure CSS Grid rather than any external library. This is the right call for this use case: the grid is a fixed rooms-by-dates layout (not a project management tool), so the complexity is bounded. The existing `AvailabilityCalendar` component already uses a 7-column CSS grid for the monthly view -- the Gantt view extends this to a rooms-on-Y-axis, dates-on-X-axis layout with horizontal scrolling.

The onboarding wizard already has a foundation in `components/onboarding/OnboardingChecklist.tsx` which uses localStorage-based progress tracking. Phase 32 upgrades this to a database-persisted `onboarding_progress` JSONB column, multi-step wizard flow, and automatic skip for configured properties.

**Primary recommendation:** Build all three features using existing codebase patterns (CSS Grid, Tailwind, Phosphor Icons, Supabase API routes). Zero new npm packages needed. The Gantt calendar is the highest-risk item and should be built first.

## Standard Stack

### Core (Already in project)

| Library        | Version     | Purpose                           | Why Standard                         |
| -------------- | ----------- | --------------------------------- | ------------------------------------ |
| Next.js        | 14.2.33     | App framework                     | Already in use                       |
| date-fns       | (installed) | Date math for calendar grid       | Already used in AvailabilityCalendar |
| Tailwind CSS   | (installed) | Styling, CSS Grid                 | Already in use                       |
| Phosphor Icons | (installed) | Icons (duotone weight)            | Project standard                     |
| Supabase JS    | (installed) | Database client via supabaseAdmin | Already in use                       |

### Supporting (Already in project)

| Library  | Version     | Purpose                       | When to Use                                   |
| -------- | ----------- | ----------------------------- | --------------------------------------------- |
| Radix UI | (installed) | Accessible dropdowns, dialogs | For cancellation policy dropdown, house rules |

### Alternatives Considered

| Instead of          | Could Use                     | Tradeoff                                                                        |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------- |
| CSS Grid Gantt      | react-gantt, gantt-task-react | Over-engineered for rooms x dates; adds bundle size; locked decision to NOT use |
| localStorage wizard | JSONB in DB                   | DB persistence is correct -- survives device switches, shared with co-owners    |

**Installation:**

```bash
# No new packages needed
```

## Architecture Patterns

### Recommended Component Structure

```
apps/backoffice/
├── app/(dashboard)/accommodations/
│   ├── calendar/
│   │   └── page.tsx              # MODIFY: Add Gantt view toggle alongside existing monthly calendar
│   ├── bookings/
│   │   ├── page.tsx              # MODIFY: Add "History" tab for past stays (checked_out, cancelled)
│   │   └── [id]/page.tsx         # EXISTS: Booking detail (click target from Gantt cells)
│   └── settings/
│       └── page.tsx              # MODIFY: Restructure policies section, add complete property data
├── components/accommodations/
│   ├── GanttCalendar.tsx         # NEW: Rooms x dates CSS Grid timeline
│   ├── GanttBookingBar.tsx       # NEW: Color-coded booking bar spanning date columns
│   ├── OnboardingWizard.tsx      # NEW: Multi-step wizard (replaces/wraps existing checklist)
│   ├── StructuredPolicies.tsx    # NEW: Checkbox house rules + dropdown cancellation
│   ├── PropertyDataForm.tsx      # NEW: Social links, Google Maps, hours, languages, communication
│   ├── AvailabilityCalendar.tsx  # EXISTS: Monthly calendar (kept as-is, Gantt is separate view)
│   └── RoomManager.tsx           # MODIFY: Add floor/level field to RoomForm
```

### Pattern 1: CSS Grid Gantt Calendar

**What:** A rooms-by-dates grid where Y-axis = room rows, X-axis = date columns, with booking bars spanning multiple columns
**When to use:** Timeline visualization for multi-room properties

**Key CSS Grid approach:**

```tsx
// Grid structure: first column for room labels, remaining columns for dates
// grid-template-columns: 120px repeat(NUM_DAYS, minmax(40px, 1fr))

// Container with horizontal scroll
<div className="overflow-x-auto">
  <div
    className="grid min-w-[800px]"
    style={{
      gridTemplateColumns: `120px repeat(${numDays}, minmax(40px, 1fr))`,
      gridTemplateRows: `48px repeat(${rooms.length}, 56px)`,
    }}
  >
    {/* Header row: date labels */}
    <div className="sticky left-0 z-10 bg-white" /> {/* Corner cell */}
    {dates.map((date, col) => (
      <div key={date} style={{ gridColumn: col + 2 }}>
        {format(date, 'dd')}
      </div>
    ))}
    {/* Room rows: room label + booking bars */}
    {rooms.map((room, rowIdx) => (
      <Fragment key={room.id}>
        <div
          className="sticky left-0 z-10 bg-white"
          style={{ gridRow: rowIdx + 2 }}
        >
          {room.room_number} {room.floor && `(${room.floor})`}
        </div>
        {/* Booking bars positioned via gridColumn: startCol / endCol */}
        {getBookingsForRoom(room.id).map((booking) => (
          <div
            key={booking.id}
            className={`rounded ${STATUS_COLORS[booking.status]}`}
            style={{
              gridRow: rowIdx + 2,
              gridColumn: `${getColForDate(booking.check_in_date)} / ${getColForDate(booking.check_out_date)}`,
            }}
            onClick={() =>
              router.push(`/accommodations/bookings/${booking.id}`)
            }
          >
            {booking.guest_name}
          </div>
        ))}
      </Fragment>
    ))}
  </div>
</div>
```

**Color coding for booking status:**

- `confirmed` = blue (`bg-blue-100 border-blue-300`)
- `checked_in` = green (`bg-green-100 border-green-300`)
- `pending` = amber (`bg-amber-100 border-amber-300`)
- `cancelled` = gray with strikethrough (`bg-gray-100 text-gray-400 line-through`)
- Blocks = hatched gray (matching existing `AvailabilityCalendar` pattern)

### Pattern 2: Onboarding Wizard with DB Persistence

**What:** Multi-step wizard that wraps existing CRUD pages, with progress stored in DB
**When to use:** New property owners who haven't configured their property yet

**Key architecture:**

```tsx
// onboarding_progress JSONB column on accom_properties:
// {
//   completed_steps: ['basic_info', 'photos', 'rooms'],
//   current_step: 'wifi',
//   started_at: '2026-02-01T10:00:00Z',
//   completed_at: null  // null until all required steps done
// }

// Steps definition:
const WIZARD_STEPS = [
  { id: 'basic_info', label: 'Basic Info', required: true },
  { id: 'photos', label: 'Photos', required: false },
  { id: 'rooms', label: 'Rooms', required: true },
  { id: 'wifi', label: 'WiFi', required: false },
  { id: 'services', label: 'Services', required: false },
  { id: 'contact', label: 'Contact', required: true },
] as const;

// Skip logic: if property has rooms AND basic info filled, skip wizard
function shouldShowWizard(property: Property): boolean {
  if (property.onboarding_progress?.completed_at) return false;
  // Check if "configured enough" to skip
  const hasRooms = property.room_count > 0;
  const hasName = !!property.name && property.name !== 'My Property';
  const hasContact = !!property.contact_phone || !!property.contact_email;
  return !(hasRooms && hasName && hasContact);
}
```

### Pattern 3: Structured Policies Form

**What:** Replace free-text house rules with checkbox list + custom additions; replace free-text cancellation with dropdown
**When to use:** Property settings page, also embedded in onboarding wizard

**Existing state:** Settings page already has `house_rules` (JSONB array of strings) and `cancellation_policy` (TEXT with CHECK constraint: flexible/moderate/strict/non_refundable). The UI currently uses free-text textarea for both -- this phase upgrades the UX to structured inputs while keeping the same database schema.

### Anti-Patterns to Avoid

- **Putting Gantt logic inside AvailabilityCalendar:** Keep them separate. The monthly calendar is per-room, single-month focused. The Gantt is multi-room, scrollable timeline. Different data needs.
- **Building a full PMS calendar:** The Gantt is read-only visualization + click-to-navigate. Do NOT add drag-to-resize bookings, drag-to-create, or inline editing. Keep it simple.
- **Storing wizard state in localStorage:** Existing OnboardingChecklist uses localStorage -- this is wrong for production. Use DB persistence (JSONB column) so progress survives across devices.

## Don't Hand-Roll

| Problem                              | Don't Build            | Use Instead                                                   | Why                                                           |
| ------------------------------------ | ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| Date range math                      | Custom date arithmetic | `date-fns` (eachDayOfInterval, addDays, differenceInDays)     | Already used in AvailabilityCalendar, handles edge cases      |
| Dropdown with search                 | Custom dropdown        | Radix Select or native `<select>`                             | Cancellation policy has only 4 options, native select is fine |
| Horizontal scroll with sticky column | Custom scroll handler  | `overflow-x-auto` + `sticky left-0` CSS                       | Pure CSS handles this perfectly                               |
| Auth/API pattern                     | New auth approach      | Copy existing `validateAdminApiKey` + `ADMIN_API_KEY` pattern | Every accommodation API route uses this pattern               |

## Common Pitfalls

### Pitfall 1: Gantt Calendar Date Column Alignment

**What goes wrong:** Booking bars don't align with date columns because of off-by-one errors in grid column calculation
**Why it happens:** Hotel convention uses half-open intervals [check_in, check_out) -- checkout day is free for next guest. Grid columns are 1-indexed. Mixing 0-indexed dates with 1-indexed grid columns causes misalignment.
**How to avoid:** Define a clear `getColForDate(dateStr)` function that returns the 1-indexed grid column. The booking bar spans `gridColumn: startCol / endCol` (CSS Grid uses exclusive end). Since check_out_date is already exclusive in hotel convention, the bar naturally ends at the right column.
**Warning signs:** Booking bars appear one cell too wide or too narrow.

### Pitfall 2: Gantt Mobile Horizontal Scroll

**What goes wrong:** On mobile, the grid is too narrow to be useful, or scroll doesn't work, or the room label column scrolls off-screen
**Why it happens:** CSS `position: sticky` with `overflow-x-auto` needs careful z-index management
**How to avoid:** Room label column uses `sticky left-0 z-10 bg-white` with explicit background (no transparency). The outer container uses `overflow-x-auto`. Test on actual phone screens (noted in STATE.md as needing validation).
**Warning signs:** Room labels scroll away, z-index fights with booking bars.

### Pitfall 3: Rooms API Missing `floor` in allowedFields

**What goes wrong:** Trying to save floor/level from RoomForm but API rejects the field
**Why it happens:** The `floor` column exists in DB (migration 077) and the GET route selects it, but the PUT route's `allowedFields` array doesn't include `'floor'`
**How to avoid:** Add `'floor'` to the `allowedFields` array in the PUT handler AND add `floor` to the GET select string. Also add to POST handler for new rooms.
**Warning signs:** Floor value saves without error but doesn't persist (silently stripped by allowedFields filter).

### Pitfall 4: Property Settings API Missing New Fields

**What goes wrong:** New property data fields (social links, Google Maps, etc.) can't be saved
**Why it happens:** The property PUT route has an explicit `allowedFields` whitelist. New columns in the DB won't be updatable until added to this list.
**How to avoid:** For each new property field: (1) add DB column via migration, (2) add to property GET select, (3) add to property PUT allowedFields.

### Pitfall 5: Onboarding Wizard Showing for Existing Properties

**What goes wrong:** Existing property owners who already configured everything see the onboarding wizard
**Why it happens:** The `onboarding_progress` JSONB column is NULL for existing properties
**How to avoid:** The "should show wizard" check must handle NULL gracefully. If `onboarding_progress` is NULL AND the property has rooms + name + contact, auto-mark as completed (backfill logic).

## Code Examples

### CSS Grid Gantt Date Navigation (14-day sliding window)

```tsx
// Source: Derived from existing AvailabilityCalendar pattern + CSS Grid
const [startDate, setStartDate] = useState(() =>
  startOfWeek(new Date(), { weekStartsOn: 1 })
);
const numDays = 14; // 2-week view
const dates = eachDayOfInterval({
  start: startDate,
  end: addDays(startDate, numDays - 1),
});

// Navigate
const handlePrev = () => setStartDate((prev) => addDays(prev, -7));
const handleNext = () => setStartDate((prev) => addDays(prev, 7));

// Column index for a date string (1-indexed, offset by room-label column)
function dateToCol(dateStr: string): number {
  const idx = dates.findIndex((d) => format(d, 'yyyy-MM-dd') === dateStr);
  return idx >= 0 ? idx + 2 : -1; // +2: col 1 is room label
}
```

### Fetching Bookings for Gantt (Multi-Room Date Range)

```tsx
// Source: Existing bookings API pattern extended with date range
// API: GET /api/accommodations/bookings?propertyId=X&dateFrom=Y&dateTo=Z
// Needs: Add dateFrom/dateTo params to existing bookings route

const fetchGanttData = async (
  propertyId: string,
  dateFrom: string,
  dateTo: string
) => {
  const params = new URLSearchParams({ propertyId, dateFrom, dateTo });
  const [roomsRes, bookingsRes] = await Promise.all([
    fetch(`/api/accommodations/rooms?propertyId=${propertyId}`, {
      headers: AUTH_HEADERS,
    }),
    fetch(
      `/api/accommodations/bookings?propertyId=${propertyId}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: AUTH_HEADERS,
      }
    ),
  ]);
  return {
    rooms: (await roomsRes.json()).rooms,
    bookings: (await bookingsRes.json()).bookings,
  };
};
```

### Structured House Rules (Checkbox + Custom)

```tsx
// Source: Settings page pattern, enhanced with predefined options
const COMMON_HOUSE_RULES = [
  'No smoking indoors',
  'No pets allowed',
  'Quiet hours: 22:00-08:00',
  'No parties or events',
  'Remove shoes indoors',
  'No outside guests overnight',
  'Keep common areas clean',
  'Separate trash and recycling',
];

// State: selected predefined + custom additions
const [selectedRules, setSelectedRules] = useState<string[]>([]);
const [customRules, setCustomRules] = useState<string[]>([]);

// Save as existing JSONB array format (backward-compatible)
const allRules = [...selectedRules, ...customRules.filter((r) => r.trim())];
// Saved to house_rules column as JSONB array -- same format as current
```

### Migration for New Property Fields

```sql
-- New columns for OWN-03, OWN-04, OWN-05
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',
  -- { instagram: "url", facebook: "url", tiktok: "url", ... }
  ADD COLUMN IF NOT EXISTS google_maps_url TEXT,
  ADD COLUMN IF NOT EXISTS communication_methods TEXT[] DEFAULT '{}',
  -- e.g. '{"whatsapp","zalo","telegram","email"}'
  ADD COLUMN IF NOT EXISTS operating_hours JSONB DEFAULT '{}',
  -- { reception: { mon: {open: "08:00", close: "22:00"}, ... }, restaurant: {...} }
  ADD COLUMN IF NOT EXISTS staff_languages TEXT[] DEFAULT '{"en"}',
  -- e.g. '{"en","vi","ko","ja"}'
  ADD COLUMN IF NOT EXISTS onboarding_progress JSONB DEFAULT NULL;
  -- { completed_steps: [], current_step: null, started_at: null, completed_at: null }
```

## State of the Art

| Old Approach                   | Current Approach                                   | When Changed                  | Impact                               |
| ------------------------------ | -------------------------------------------------- | ----------------------------- | ------------------------------------ |
| Free-text house rules textarea | Checkbox predefined + custom additions             | Phase 32                      | Better UX, consistent formatting     |
| Free-text cancellation policy  | Dropdown (flexible/moderate/strict/non_refundable) | Already in DB (migration 083) | UI upgrade only, DB already supports |
| localStorage onboarding        | JSONB DB-persisted onboarding                      | Phase 32                      | Survives device switches, shareable  |
| Monthly calendar only          | Monthly + Gantt timeline view                      | Phase 32                      | Multi-room visibility at a glance    |

**Already in place (no changes needed):**

- `accom_rooms.floor` column exists (migration 077)
- `accom_properties.cancellation_policy` CHECK constraint already limits to flexible/moderate/strict/non_refundable (migration 083)
- `accom_properties.house_rules` is JSONB array (migration 081)
- Booking status values already include `checked_out` (migration 077 -- for history tab)

## Open Questions

1. **Gantt calendar date range for API query**
   - What we know: Existing bookings API fetches ALL bookings ordered by date desc, limit 200. Gantt needs date-range filtering.
   - What's unclear: Should we add dateFrom/dateTo params to existing GET route, or create a separate endpoint?
   - Recommendation: Add optional dateFrom/dateTo query params to existing `/api/accommodations/bookings` route. When present, filter by `check_in_date <= dateTo AND check_out_date >= dateFrom` (overlap query). When absent, existing behavior (all bookings, limit 200).

2. **Gantt mobile UX validation**
   - What we know: STATE.md flags this as needing validation on phone screens
   - What's unclear: Whether 14-day view with 40px columns works on 375px screens
   - Recommendation: Build with 7-day mobile view (vs 14-day desktop). Use `useMediaQuery` or responsive grid to switch. Room label column narrows to 80px on mobile. This is implementable but needs manual testing.

3. **Onboarding wizard: separate page or modal/drawer?**
   - What we know: Existing OnboardingChecklist is an inline card on the dashboard
   - What's unclear: Should wizard be a full page (`/accommodations/onboarding`) or overlay
   - Recommendation: Full-page wizard at `/accommodations/onboarding` with step navigation. Dashboard shows a banner linking to it. Simpler routing, no modal complexity.

## Sources

### Primary (HIGH confidence)

- Codebase inspection: `apps/backoffice/components/accommodations/AvailabilityCalendar.tsx` -- existing CSS Grid calendar pattern
- Codebase inspection: `apps/backoffice/components/accommodations/RoomManager.tsx` -- existing room CRUD, missing floor field
- Codebase inspection: `apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx` -- current settings form structure
- Codebase inspection: `apps/backoffice/components/onboarding/OnboardingChecklist.tsx` -- existing onboarding pattern
- Codebase inspection: `shared/database/migrations/schema/077-accommodations-schema.sql` -- floor column exists
- Codebase inspection: `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` -- cancellation_policy enum
- Codebase inspection: `apps/backoffice/app/api/accommodations/rooms/route.ts` -- floor NOT in allowedFields
- Codebase inspection: `apps/backoffice/app/api/accommodations/property/route.ts` -- property PUT allowedFields whitelist

### Secondary (MEDIUM confidence)

- CSS Grid subgrid/sticky patterns for Gantt-style layouts are well-established in modern browsers (Chrome 117+, Safari 16.4+, Firefox 117+)

### Tertiary (LOW confidence)

- None. All findings are from direct codebase inspection.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- everything already in project, zero new packages
- Architecture: HIGH -- patterns directly extend existing components
- Pitfalls: HIGH -- identified from actual code inspection (missing allowedFields, off-by-one risks)
- Gantt mobile: MEDIUM -- CSS approach is sound but needs real-device testing
- DB schema: HIGH -- existing columns verified, new columns are straightforward ALTER TABLE

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable codebase, no external dependency changes)
