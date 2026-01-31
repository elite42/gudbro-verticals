---
phase: 21-owner-dashboard-bookings-property
plan: 03
subsystem: ui
tags: [react, phosphor-icons, qrcode, backoffice, accommodations, sidebar]

# Dependency graph
requires:
  - phase: 21-01
    provides: API routes for rooms CRUD, property settings, and ADMIN_API_KEY auth
provides:
  - RoomManager CRUD component following ChargesManager pattern
  - Property settings form (booking mode, times, deposit, policies, contact)
  - QR code generation for property and per-room with PNG download
  - Sidebar navigation with Accommodations section (4 sub-pages)
affects: [21-04, 22-accommodations-enhancements]

# Tech tracking
tech-stack:
  added: []
  patterns:
    [
      ADMIN_API_KEY auth headers from env,
      minor/major currency conversion in forms,
    ]

key-files:
  created:
    - apps/backoffice/components/accommodations/RoomManager.tsx
    - apps/backoffice/components/accommodations/AccomQRGenerator.tsx
    - apps/backoffice/app/(dashboard)/accommodations/rooms/page.tsx
    - apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx
    - apps/backoffice/app/(dashboard)/accommodations/qr-codes/page.tsx
  modified:
    - apps/backoffice/components/layout/Sidebar.tsx

key-decisions:
  - 'Price conversion in RoomManager: user enters major units, API stores minor (x100)'
  - 'QR URLs: stays.gudbro.com/{slug} for property, stays.gudbro.com/checkin/{id}/{roomId} for rooms'
  - 'House rules stored as JSONB array, entered as one-per-line textarea'
  - 'Property ID from NEXT_PUBLIC_ACCOM_PROPERTY_ID env var with empty state fallback'

patterns-established:
  - 'Accommodations backoffice pattern: authHeaders() helper with Bearer ADMIN_API_KEY'
  - 'AccomQRGenerator reuses existing qr-generator.ts library with SIZE_PRESETS.medium'

# Metrics
duration: 8min
completed: 2026-01-31
---

# Phase 21 Plan 03: Room Management, Settings, QR Codes & Sidebar Summary

**RoomManager CRUD with ChargesManager pattern, property settings form, QR code generation for property/rooms with PNG download, and Accommodations sidebar navigation**

## Performance

- **Duration:** 8 min
- **Started:** 2026-01-31T06:26:33Z
- **Completed:** 2026-01-31T06:35:04Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- RoomManager with full CRUD (add, edit, deactivate, reactivate) following ChargesManager inline edit pattern
- Property settings page with booking mode, check-in/out times, deposit percent, cancellation penalty, house rules, and contact info
- QR code generation for property page and each active room with PNG download and print-friendly layout
- Sidebar updated with Accommodations section containing Bookings, Rooms, Settings, QR Codes sub-pages

## Task Commits

Each task was committed atomically:

1. **Task 1: RoomManager component and Rooms page** - `7573c7f` (feat)
2. **Task 2: Property settings, QR generation, sidebar navigation** - `1be3a53` (feat)

## Files Created/Modified

- `apps/backoffice/components/accommodations/RoomManager.tsx` - Room CRUD component with inline add/edit forms, price conversion, Phosphor icons
- `apps/backoffice/app/(dashboard)/accommodations/rooms/page.tsx` - Rooms page wrapper with property ID check
- `apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx` - Property settings form with booking mode, times, deposit, policies, contact
- `apps/backoffice/components/accommodations/AccomQRGenerator.tsx` - QR code generation for property and rooms with download and print
- `apps/backoffice/app/(dashboard)/accommodations/qr-codes/page.tsx` - QR codes page wrapper
- `apps/backoffice/components/layout/Sidebar.tsx` - Added Accommodations nav section with 4 sub-pages

## Decisions Made

1. **Price conversion in form** - RoomManager converts between major units (user input) and minor units (API storage, x100) to match the INTEGER minor currency convention
2. **QR URL structure** - Property QR points to `stays.gudbro.com/{slug}`, room QRs point to `stays.gudbro.com/checkin/{propertyId}/{roomId}` for direct room check-in
3. **House rules as textarea** - One rule per line, split to array on save, joined with newlines on load. Simple v1 approach before structured rules editor
4. **NEXT_PUBLIC_ACCOM_PROPERTY_ID** - All accommodations pages use this env var with graceful empty state when not configured

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Task 2 files were committed alongside the 21-02 booking detail commit (1be3a53) due to lint-staged stash/restore cycle during a pre-commit hook failure. The files are correctly tracked and functional; the commit grouping is cosmetically different from plan but all content is present and verified.

## User Setup Required

Environment variable needed:

- `NEXT_PUBLIC_ACCOM_PROPERTY_ID` - Set to the UUID of the accommodations property
- `NEXT_PUBLIC_ADMIN_API_KEY` - Must match the `ADMIN_API_KEY` server-side env var

## Next Phase Readiness

- All owner dashboard UI pages are now in place (bookings list, booking detail, rooms, settings, QR codes)
- Sidebar navigation makes all accommodations features discoverable
- Ready for 21-04 (if exists) or Phase 22 enhancements (image upload, amenities, drag-sort)

---

_Phase: 21-owner-dashboard-bookings-property_
_Completed: 2026-01-31_
