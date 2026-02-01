---
phase: 31-bug-fixes-image-foundation
plan: 01
status: complete
started: 2026-02-01
completed: 2026-02-01
subsystem: accommodations-pwa
tags: [bug-fix, wifi-qr, currency-selector, shared-utils, ui-polish]
requires: [phase-30]
provides:
  [shared-qr-utils, currency-selector, wifi-qr-codes, polished-guest-dashboard]
affects: [phase-33, phase-34]
tech-stack:
  added: []
  patterns:
    [
      localStorage-preference-hook,
      shared-utils-extraction,
      toggle-expandable-ui,
    ]
key-files:
  created:
    - shared/utils/qr/wifi.ts
    - shared/utils/qr/index.ts
  modified:
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
    - apps/accommodations/frontend/components/BottomNav.tsx
    - apps/accommodations/frontend/components/stay/DashboardHeader.tsx
    - apps/accommodations/frontend/components/stay/WifiCard.tsx
    - apps/accommodations/frontend/components/stay/ServiceItemCard.tsx
    - apps/accommodations/frontend/components/stay/ServicesCarousel.tsx
    - apps/accommodations/frontend/components/stay/ServiceCatalog.tsx
metrics:
  duration: ~6 min
  completed: 2026-02-01
---

# Phase 31 Plan 01: PWA Bug Fixes Summary

**One-liner:** Fixed 8 guest dashboard bugs (name duplication, nav tabs, card layout, icon prefix, time format, currency selector, WiFi QR codes, placeholder images) and extracted QR WiFi utils to shared.

## Summary

Fixed all identified PWA bugs in the accommodations guest dashboard to deliver a polished in-stay experience. Task 1 addressed display bugs (guest name duplication, bottom nav, card layout, icon-to-emoji mapping, time formatting). Task 2 added new functionality: a currency selector using SUPPORTED_CURRENCIES from @shared/payment with localStorage persistence, WiFi QR code generation with toggle-to-show UX, shared QR utility extraction, and improved service item placeholders with gradient backgrounds and category emoji.

## Tasks Completed

| #   | Task                                                                                                | Commit  | Files   |
| --- | --------------------------------------------------------------------------------------------------- | ------- | ------- |
| 1   | Fix guest name, bottom nav, homepage cards, icon prefix, time format (BUG-01 to BUG-05)             | 6bb2751 | 9 files |
| 2   | Currency selector, WiFi QR codes, QR extraction, placeholder improvement (BUG-06 to BUG-08, INF-02) | 40088c4 | 6 files |

## Deliverables

- **shared/utils/qr/wifi.ts** - WiFi QR string generation (generateWiFiString, escapeWiFiValue, WiFiConfig type) extracted from backoffice for shared use
- **shared/utils/qr/index.ts** - Barrel export for QR utils
- **DashboardHeader** - Currency selector dropdown with localStorage persistence and parent callback
- **WifiCard** - QR code toggle button for each WiFi zone (SingleNetworkCard and ZoneRow), using qrcode library with teal-themed colors
- **ServiceItemCard** - Gradient placeholder with category emoji instead of plain grey Package icon

## Decisions Made

| Decision                                     | Rationale                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Currency via callback prop (not context)     | Simple prop drilling from DashboardHeader to page; context would be over-engineering for current usage |
| QR codes toggle-to-show (not always visible) | Keeps WiFi card compact by default; QR expands below on tap                                            |
| QR color matches teal theme (#2D7A76)        | Consistent with WiFi card gradient branding                                                            |
| categoryEmoji as optional prop               | Allows gradual adoption; falls back to package emoji                                                   |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compilation: PASS (zero errors)
- Lint + Prettier: PASS (pre-commit hooks)
- All success criteria met per plan
