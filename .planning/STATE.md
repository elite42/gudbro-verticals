# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-31)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** Phase 24 - Analytics, Deals & Communication (v1.4 Accommodations v2)

## Current Position

Phase: 24 of 24 (Analytics, Deals & Communication)
Plan: 1 of 3 in current phase
Status: In progress
Last activity: 2026-01-31 -- Completed 24-01-PLAN.md

Progress: v1.0-v1.3 [36/36] | v1.4 [████████████████████████████░] 19/21
████████████████████████████████████████ prior | ████████████████████████████░ v1.4

## Performance Metrics

**Velocity:**

- Total plans completed: 55 (+ 1 quick task)
- Average duration: ~3.3 min/plan
- Total execution time: ~4.0 hours

**By Milestone:**

| Milestone | Plans | Total Time | Avg/Plan |
| --------- | ----- | ---------- | -------- |
| v1.0      | 6     | ~20 min    | 3.3 min  |
| v1.1      | 12+1  | ~32 min    | 2.7 min  |
| v1.2      | 8     | ~62 min    | 7.8 min  |
| v1.3      | 10    | ~33 min    | 3.3 min  |
| v1.4      | 19    | ~77 min    | 4.1 min  |

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table and milestone archives.

Key v1.4 architectural decisions:

- Owner Dashboard lives in apps/backoffice/ (not accommodations PWA)
- Guest flows remain JWT-based (no account creation)
- DATE type for check-in/check-out (not TIMESTAMPTZ)
- Single booking model with status field (instant vs inquiry)
- Cash/transfer default, Stripe as progressive enhancement
- Half-open [) daterange for back-to-back bookings (checkout day free for new checkin)
- All prices INTEGER minor currency units (not NUMERIC/DECIMAL)
- Service order items snapshot name/unit_price for historical accuracy
- Separate STRIPE_ACCOM_WEBHOOK_SECRET env var (not shared with wallet webhook)
- Phosphor SSR imports: @phosphor-icons/react/dist/ssr for server components, @phosphor-icons/react for client
- BookingCalendar is presentational -- receives bookedRanges as props, useBookingForm owns fetch lifecycle
- OpenStreetMap embed for map preview (no API key); Google Maps link for navigation
- Regular join (not !inner) for rooms query so page loads even with no active rooms
- Booking code as access token for /booking/[code] -- no auth required
- noindex on booking confirmation pages to prevent search indexing
- Deposit percent 1-100 range (no 0% -- at least 1% required for commitment)
- Payment method CHECK allows NULL for legacy bookings
- BankTransferInfo as JSONB (flexible for different banking systems)
- Cancellation penalty as percent of deposit (not total price)
- Stripe client as lazy singleton with Proxy pattern (same as supabase.ts)
- ADMIN_API_KEY for owner endpoints (simple auth before full session system)
- Dashboard bookings page in accommodations PWA (self-contained vertical)
- Webhook sets payment_status to partial when deposit < 100%
- Reuse supabaseAdmin lazy Proxy from lib/supabase-admin.ts for all backoffice API routes
- Allowlisted fields pattern for PUT endpoints (prevent mass-assignment)
- PGRST116 error code for 404 detection on .single() queries
- Module-level AUTH_HEADERS for stable fetch headers in client components
- Price conversion in RoomManager: user enters major units, API stores minor (x100)
- QR URLs: stays.gudbro.com/{slug} for property, stays.gudbro.com/checkin/{id}/{roomId} for rooms
- House rules as JSONB array, entered as one-per-line textarea
- EXCLUDE USING GIST with half-open [) daterange for room blocks and seasonal pricing (consistent with bookings)
- Application-level overlap check against active bookings before creating room blocks
- Calendar API computes grid range from month using date-fns startOfWeek/endOfWeek
- Seasonal pricing PUT uses camelCase-to-snake_case field mapping
- dateTo +1 day conversion for block API (UI inclusive range, API half-open)
- Status priority: blocked > booked > partial > available
- CalendarDay interface as shared contract between calendar and detail panel
- Range selection state (rangeStart/rangeEnd) managed at page level
- Auto-confirm when ALL order items belong to auto_confirm/whatsapp_notify categories
- Property timezone for availability checks via Intl.DateTimeFormat
- ServiceCategoryResponseWithTimezone extends base type (additive, non-breaking)
- Price input in major units with auto-conversion to minor (x100) for service catalog
- Zero-decimal currency set for VND, JPY, KRW etc. skips x100 conversion
- Category cascade delete: items deleted explicitly before category
- Cart state at page level (not localStorage) for tab navigation survival
- ServiceCatalog and CartDrawer as fixed overlays (not route changes)
- Order polling auto-stops when no active orders remain
- Slide-out detail panel for order management (not separate page)
- Orders after Bookings in sidebar, Services after Rooms
- Recharts v3 Tooltip formatter typed as `any` to handle optional params
- Static room type color map with gray fallback for unknown types

### Pending Todos

None.

### Blockers/Concerns

- Stripe MCC 7011 extended authorization needs validation with SEA property owners
- Partner commission confirmation flow underspecified (start with click tracking only)

## Session Continuity

Last session: 2026-01-31
Stopped at: Completed 24-01-PLAN.md
Resume file: None
Next: `/gsd:execute-phase 24` (plan 02)

---

_Last updated: 2026-01-31 after completing 24-01-PLAN.md_
