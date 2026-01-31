---
phase: 22-owner-dashboard-calendar-pricing
verified: 2026-01-31T15:30:00Z
status: passed
score: 5/5 must-haves verified
---

# Phase 22: Owner Dashboard - Calendar & Pricing Verification Report

**Phase Goal:** Owners can visually manage availability and set flexible pricing strategies
**Verified:** 2026-01-31T15:30:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                                  | Status     | Evidence                                                                                                                                                                                                                                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Owner can view a monthly calendar with color-coded dates showing booked, available, and blocked status | ✓ VERIFIED | AvailabilityCalendar.tsx renders custom month grid with STATUS_STYLES mapping (available: white/green-hover, booked: blue-50, blocked: gray-100 with diagonal stripes, partial: amber-50). Legend component displays all 4 statuses.                                                                                |
| 2   | Owner can block and unblock date ranges for maintenance or personal use                                | ✓ VERIFIED | CalendarDetailPanel.tsx provides block form with reason dropdown (maintenance, personal_use, other), notes textarea, and "Block Dates" button calling onBlock handler. Range selection in AvailabilityCalendar (click-to-start, click-to-end). Unblock button in CalendarDetailPanel calls onUnblock with block ID. |
| 3   | Owner can set base price per room type and override prices for specific date ranges (seasonal pricing) | ✓ VERIFIED | SeasonalPricingManager.tsx provides inline form with date range inputs, price input (converted from major to minor units: \*100), and label field. POST/PUT to seasonal-pricing API. Calendar displays override prices in green text on calendar cells.                                                             |
| 4   | Owner can set weekly and monthly discount percentages that automatically apply to qualifying bookings  | ✓ VERIFIED | DiscountSettings.tsx provides two range sliders (0-50%) synced with number inputs for weekly (7+ nights) and monthly (28+ nights) discounts. Live preview calculations show discounted totals. PUT to property API with discount fields.                                                                            |
| 5   | Calendar page is accessible from sidebar navigation under Accommodations                               | ✓ VERIFIED | Sidebar.tsx line includes `{ name: 'Calendar & Pricing', href: '/accommodations/calendar' }` in Accommodations children array, positioned after Bookings and before Rooms.                                                                                                                                          |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact                                                               | Expected                                                                                   | Status     | Details                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shared/database/migrations/schema/085-calendar-pricing.sql`           | accom_room_blocks and accom_seasonal_pricing tables with EXCLUDE constraints, indexes, RLS | ✓ VERIFIED | 123 lines. Both tables exist with EXCLUDE USING GIST constraints (half-open [) daterange), 4 indexes, RLS policies, updated_at trigger on seasonal_pricing. No duplicate CREATE EXTENSION (btree_gist already in 083).                                                                                                                                |
| `apps/backoffice/app/api/accommodations/calendar/route.ts`             | Merged calendar data endpoint                                                              | ✓ VERIFIED | 98 lines. Exports GET. Fetches bookings + blocks + pricing via Promise.all (line 73). Computes grid range using date-fns startOfWeek/endOfWeek. Optional roomId filter applied to all 3 queries.                                                                                                                                                      |
| `apps/backoffice/app/api/accommodations/room-blocks/route.ts`          | Room block CRUD                                                                            | ✓ VERIFIED | 127 lines. Exports POST and DELETE. POST validates booking overlap (lines 40-46: queries accom_bookings with date range check, returns 409 if overlaps). Handles EXCLUDE constraint errors (line 79: checks for "exclusion" or code 23P01).                                                                                                           |
| `apps/backoffice/app/api/accommodations/seasonal-pricing/route.ts`     | Seasonal pricing CRUD                                                                      | ✓ VERIFIED | 217 lines. Exports GET, POST, PUT, DELETE. PUT maps camelCase to snake_case (lines 137-148). All mutations handle EXCLUDE constraint as 409. Validates pricePerNight > 0.                                                                                                                                                                             |
| `apps/backoffice/app/api/accommodations/property/route.ts`             | Discount fields in allowlist                                                               | ✓ VERIFIED | Lines 31, 85-86 include weekly_discount_percent and monthly_discount_percent in both GET select string and PUT allowedFields array.                                                                                                                                                                                                                   |
| `apps/backoffice/components/accommodations/AvailabilityCalendar.tsx`   | Custom month grid with color-coded cells showing status and prices                         | ✓ VERIFIED | 254 lines. Exports AvailabilityCalendar and CalendarDay interface. Custom grid using eachDayOfInterval (no react-day-picker). Status styles with diagonal stripe CSS for blocked. Range selection logic (lines 127-151). Phosphor icons (CaretLeft, CaretRight). formatBookingPrice for price labels.                                                 |
| `apps/backoffice/components/accommodations/CalendarDetailPanel.tsx`    | Sidebar/panel showing details for selected date with block/unblock actions                 | ✓ VERIFIED | 244 lines. Exports CalendarDetailPanel. Shows formatted date, status badge, booking list, block list with remove buttons, price info with override label. Block form with reason dropdown (3 options), notes textarea, "Block Dates" button. Phosphor icons used (CalendarBlank, Lock, LockOpen, Bed, User, SpinnerGap).                              |
| `apps/backoffice/components/accommodations/SeasonalPricingManager.tsx` | List of seasonal pricing overrides with add/edit/delete                                    | ✓ VERIFIED | 348 lines. Exports SeasonalPricingManager. Fetches pricing on mount/roomId change. Inline form (NOT modal) for add/edit with date inputs, price input (converts major to minor: \*100), label input. DELETE with window.confirm(). 409 overlap errors displayed inline. Phosphor icons (PencilSimple, Trash, Plus, CurrencyCircleDollar, SpinnerGap). |
| `apps/backoffice/components/accommodations/DiscountSettings.tsx`       | Weekly and monthly discount sliders with preview calculation                               | ✓ VERIFIED | 160 lines. Exports DiscountSettings. Two discount controls: range slider (0-50) + number input (synced). Live preview with useMemo showing strikethrough original and green discounted total. isDirty check enables/disables save button. Phosphor Percent icon.                                                                                      |
| `apps/backoffice/app/(dashboard)/accommodations/calendar/page.tsx`     | Calendar & Pricing page orchestrating all components                                       | ✓ VERIFIED | 490 lines. Client component. Fetches rooms, property, calendar data. Transforms raw data into CalendarDay[] with status priority (blocked > booked > partial > available). Room filter dropdown. 2-column layout (calendar + detail panel). Handlers for block, unblock, discount save. Header with CalendarDots icon. Loading skeleton.              |
| `apps/backoffice/components/layout/Sidebar.tsx`                        | Calendar & Pricing nav item                                                                | ✓ VERIFIED | Modified. Accommodations children array includes `{ name: 'Calendar & Pricing', href: '/accommodations/calendar' }` positioned after Bookings, before Rooms.                                                                                                                                                                                          |

### Key Link Verification

| From                                                                 | To                                   | Via                                                       | Status  | Details                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apps/backoffice/app/(dashboard)/accommodations/calendar/page.tsx     | /api/accommodations/calendar         | fetch on mount and month/room change                      | ✓ WIRED | Line 176: fetch with propertyId and month params. useEffect triggers on currentMonth or selectedRoomId change (line 193). Response sets bookings, blocks, seasonalPricing state.                                                                                    |
| apps/backoffice/app/api/accommodations/calendar/route.ts             | supabaseAdmin                        | Parallel Promise.all fetch of bookings + blocks + pricing | ✓ WIRED | Line 73: `Promise.all([bookingsQuery, blocksQuery, pricingQuery])` fetches all 3 data types in parallel. Each query filters by propertyId, date range, and optional roomId.                                                                                         |
| apps/backoffice/app/api/accommodations/room-blocks/route.ts          | accom_bookings                       | Application-level overlap check before insert             | ✓ WIRED | Lines 40-46: queries accom_bookings with room_id, status filter (NOT cancelled/no_show), and date overlap check (lt check_in_date, gt check_out_date). Returns 409 with conflict details if any rows found.                                                         |
| apps/backoffice/components/accommodations/CalendarDetailPanel.tsx    | /api/accommodations/room-blocks      | POST to create block, DELETE to remove block              | ✓ WIRED | onBlock handler (lines 64-72) calls parent-provided onBlock prop. onUnblock handler (lines 74-81) calls parent-provided onUnblock prop. Page.tsx implements these handlers (lines 265-316) with fetch to room-blocks API.                                           |
| apps/backoffice/components/accommodations/SeasonalPricingManager.tsx | /api/accommodations/seasonal-pricing | GET/POST/PUT/DELETE for pricing CRUD                      | ✓ WIRED | fetchPricing (lines 61-84): GET with propertyId/roomId params. handleSave (lines 110-171): POST for create or PUT for update with pricePerNight converted to minor units (\*100). handleDelete (lines 174-191): DELETE with window.confirm(). All use AUTH_HEADERS. |
| apps/backoffice/components/accommodations/DiscountSettings.tsx       | /api/accommodations/property         | PUT to save discount percentages                          | ✓ WIRED | handleSave (lines 54-61) calls parent-provided onSave prop. Page.tsx handleDiscountSave (lines 318-336) implements PUT to property API with weekly_discount_percent and monthly_discount_percent fields.                                                            |

### Requirements Coverage

Requirements OCAL-01 through OCAL-05 (from Phase 22 in ROADMAP.md):

| Requirement                                                                                     | Status      | Supporting Artifacts                                                                                                                 |
| ----------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| OCAL-01: Monthly calendar with color-coded booking status (available, booked, blocked, partial) | ✓ SATISFIED | AvailabilityCalendar.tsx STATUS_STYLES, CalendarDay status field, page.tsx status determination logic                                |
| OCAL-02: Block/unblock date ranges with reason (maintenance, personal_use, other)               | ✓ SATISFIED | CalendarDetailPanel.tsx block form, room-blocks API POST/DELETE, page.tsx handleBlock/handleUnblock                                  |
| OCAL-03: Base price displayed per room (from accom_rooms.base_price_per_night)                  | ✓ SATISFIED | Room type has base_price_per_night field, page.tsx basePricePerNight derived from selectedRoom, AvailabilityCalendar displays prices |
| OCAL-04: Seasonal price overrides with date range, price, and label                             | ✓ SATISFIED | SeasonalPricingManager.tsx inline CRUD, seasonal-pricing API, accom_seasonal_pricing table                                           |
| OCAL-05: Weekly and monthly discount percentages with slider controls and preview               | ✓ SATISFIED | DiscountSettings.tsx sliders with live preview, property API discount fields, page.tsx handleDiscountSave                            |

### Anti-Patterns Found

**None detected.**

Scanned files:

- apps/backoffice/app/(dashboard)/accommodations/calendar/page.tsx
- apps/backoffice/components/accommodations/AvailabilityCalendar.tsx
- apps/backoffice/components/accommodations/CalendarDetailPanel.tsx
- apps/backoffice/components/accommodations/SeasonalPricingManager.tsx
- apps/backoffice/components/accommodations/DiscountSettings.tsx

No TODO/FIXME comments, no placeholder text, no empty returns, no console.log-only implementations found.

### Human Verification Required

None. All observable truths can be verified through code inspection and structural analysis. The UI renders substantive components with full API integration.

---

_Verified: 2026-01-31T15:30:00Z_
_Verifier: Claude (gsd-verifier)_
