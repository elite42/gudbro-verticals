---
phase: 29-multi-zone-wifi
plan: 01
subsystem: accommodations
tags: [wifi, jsonb, backoffice, settings, migration]
requires: [25-room-code-foundation]
provides:
  [wifi_zones schema, backoffice wifi zone management, room wifi overrides]
affects: [29-02 guest-facing wifi display]
tech-stack:
  added: []
  patterns: [JSONB array with CHECK constraint, zone-based config]
key-files:
  created:
    - shared/database/migrations/schema/092-multi-zone-wifi.sql
  modified:
    - apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx
    - apps/backoffice/app/api/accommodations/property/route.ts
    - apps/backoffice/app/api/accommodations/rooms/route.ts
decisions:
  - id: WIFI-01
    decision: 'wifi_zones stored as JSONB array on accom_properties (max 8 zones)'
    rationale: 'Flexible schema for variable zone counts, CHECK constraint enforces limit'
  - id: WIFI-02
    decision: 'Legacy wifi_network/wifi_password columns preserved (not dropped)'
    rationale: 'Non-breaking migration, guest PWA can still use legacy columns until 29-02 ships'
  - id: WIFI-03
    decision: 'Room WiFi overrides are simple nullable TEXT columns (ssid + password)'
    rationale: 'Rooms inherit from property zones by default, overrides are exceptional'
metrics:
  duration: ~3 min
  completed: 2026-02-01
---

# Phase 29 Plan 01: Multi-Zone WiFi Schema + Backoffice Management Summary

**One-liner:** JSONB wifi_zones column on properties with backoffice zone management UI (add/edit/remove/reorder up to 8 zones) and room-level WiFi override fields.

## What Was Done

### Task 1: Migration 092 -- wifi_zones JSONB + room WiFi overrides

- Added `wifi_zones JSONB DEFAULT NULL` column to `accom_properties`
- Added `wifi_zones_valid` CHECK constraint: NULL or array with max 8 entries
- Added `wifi_ssid_override` and `wifi_password_override` nullable TEXT columns to `accom_rooms`
- Data migration: existing `wifi_network` values converted to first wifi_zones entry with zone_type='room', label='Property WiFi'
- Column comments for all 3 new columns
- Legacy columns preserved (no DROP)

### Task 2: Backoffice WiFi zone management + API updates

- **Property API**: GET returns `wifi_zones`, PUT accepts `wifi_zones` in allowedFields
- **Rooms API**: GET returns override fields, PUT/POST accept `wifi_ssid_override` and `wifi_password_override`
- **Settings page**: New "WiFi Zones" section with:
  - Zone type selector (room, restaurant, pool, lobby, garden, rooftop, coworking, custom)
  - Auto-icon assignment per zone type
  - Editable label, required SSID, password with show/hide toggle
  - Up/down reorder buttons, remove button per zone
  - "Add WiFi Zone" button (disabled at 8 zones)
  - Inline SSID validation with red error highlighting on save attempt
  - Phosphor Icons throughout (WifiHigh, ArrowUp, ArrowDown, Trash, Eye, EyeSlash, Plus)

## Decisions Made

| ID      | Decision                               | Rationale                                        |
| ------- | -------------------------------------- | ------------------------------------------------ |
| WIFI-01 | wifi_zones as JSONB array, max 8       | Flexible schema, CHECK constraint enforces limit |
| WIFI-02 | Legacy wifi columns preserved          | Non-breaking, guest PWA uses them until 29-02    |
| WIFI-03 | Room overrides as simple nullable TEXT | Rooms inherit property zones, overrides are rare |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- [x] Migration 092 SQL is syntactically valid and idempotent (IF NOT EXISTS)
- [x] Backoffice settings page renders WiFi Zones section without errors
- [x] Property GET returns wifi_zones, PUT accepts and saves it
- [x] Rooms GET returns wifi_ssid_override/wifi_password_override, PUT/POST accepts them
- [x] TypeScript compiles cleanly (`npx tsc --noEmit` passed)

## Next Phase Readiness

Plan 29-02 (guest-facing WiFi display) can now proceed. The wifi_zones data is available via the property API, and the backoffice UI allows owners to configure zones. The guest PWA needs to read wifi_zones and display zone-appropriate networks based on room assignment.
