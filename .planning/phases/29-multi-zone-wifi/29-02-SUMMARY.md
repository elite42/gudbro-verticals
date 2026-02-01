---
phase: 29-multi-zone-wifi
plan: 02
subsystem: accommodations
tags: [wifi, multi-zone, guest-pwa, api, component]
requires: [29-01]
provides:
  [
    buildWifiInfo helper,
    WifiZoneInfo type,
    multi-zone WifiCard,
    consistent WiFi API responses,
  ]
affects: []
tech-stack:
  added: []
  patterns: [shared helper for cross-route consistency, zone icon mapping]
key-files:
  created:
    - apps/accommodations/frontend/lib/wifi-utils.ts
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/components/stay/WifiCard.tsx
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/route.ts
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/property/route.ts
    - apps/accommodations/frontend/app/api/cron/pre-arrival-emails/route.ts
decisions:
  - id: WIFI-04
    decision: 'buildWifiInfo() shared helper ensures all routes return identical WifiInfo shape'
    rationale: 'Prevents pitfall of 4 routes diverging in WiFi resolution logic'
  - id: WIFI-05
    decision: 'Property route returns zones without room override (no room context in JWT)'
    rationale: 'Frontend caches room override from initial resolution and merges client-side'
  - id: WIFI-06
    decision: 'Pre-arrival email uses primary zone (first after sort) via buildWifiInfo, not all zones'
    rationale: 'Email should be simple; full zone list shown in dashboard after arrival'
metrics:
  duration: ~4 min
  completed: 2026-02-01
---

# Phase 29 Plan 02: Guest-Facing WiFi Display Summary

**One-liner:** Shared buildWifiInfo() helper with WifiZoneInfo types, all 4 guest API routes updated for consistent multi-zone WiFi resolution, and redesigned WifiCard with room highlight and zone icons.

## What Was Done

### Task 1: WifiZoneInfo type + buildWifiInfo() helper + update 4 API routes + email template

- Added `WifiZoneInfo` interface to `types/stay.ts`: zoneId, label, zoneType, icon, ssid, password, sortOrder, isRoomNetwork
- Updated `WifiInfo` interface with optional `zones?: WifiZoneInfo[]` (backward compatible)
- Created `lib/wifi-utils.ts` with `buildWifiInfo(property, roomOverride?)` helper
  - Resolution priority: room override > wifi_zones array > legacy wifi_network/wifi_password
  - Room override gets `isRoomNetwork: true` and sorts first
  - Legacy fallback when no zones exist returns plain network/password
- Updated all 4 guest API routes to use `buildWifiInfo()`:
  - Route 1 (`/api/stay/room/[roomCode]`): fetches room WiFi overrides via separate query on room_id
  - Route 2 (`/api/stay/verify`): adds wifi_zones to property SELECT, room overrides to rooms join
  - Route 3 (`/api/stay/room/[roomCode]/verify`): same pattern as Route 2
  - Route 4 (`/api/stay/[code]/property`): adds wifi_zones to SELECT, no room override (no room context)
- Updated pre-arrival email cron to resolve primary WiFi zone via `buildWifiInfo()` instead of raw columns
- Commit: `30c8854`

### Task 2: Multi-zone WifiCard component

- Redesigned WifiCard.tsx with three display modes:
  - **Legacy mode**: no zones, renders with network/password as simple gradient teal card (unchanged look)
  - **Single zone mode**: renders as gradient card, optional subtitle if label differs from "Property WiFi"
  - **Multi-zone mode**: room network as gradient card with "Your Room" badge, other zones as compact rows
- Zone icon mapping using Phosphor Icons (duotone weight): Bed, ForkKnife, SwimmingPool, Buildings, Tree, CloudSun, Laptop, WifiHigh
- Per-zone password show/hide toggle with Eye/EyeSlash icons
- Copy-to-clipboard with Check icon feedback per zone row
- If no room zone in multi-zone mode, all zones shown equally as compact rows
- Commit: `1958def`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Updated pre-arrival email cron caller**

- **Found during:** Task 1, Step 4
- **Issue:** The email template itself takes wifiName/wifiPassword as params, but the cron job caller was fetching raw wifi_network/wifi_password and not considering wifi_zones
- **Fix:** Added wifi_zones to cron property SELECT, used buildWifiInfo() to resolve primary zone before passing to email template
- **Files modified:** apps/accommodations/frontend/app/api/cron/pre-arrival-emails/route.ts
- **Commit:** 30c8854

## Verification

- TypeScript compiles cleanly (`npx tsc --noEmit` passes)
- All 4 API routes + cron job import and use `buildWifiInfo()` (no inline WiFi resolution remains)
- WifiCard handles all display modes: legacy, single zone, multi-zone with/without room highlight
- WifiZoneInfo type exported from types/stay.ts
- wifi-utils.ts exports buildWifiInfo

## Next Phase Readiness

Phase 29 is now complete. All multi-zone WiFi infrastructure (schema, backoffice, guest APIs, guest UI) is in place.

- No blockers for downstream phases
- Dashboard refactor (Phase 33) should preserve WifiCard integration
