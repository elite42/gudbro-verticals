---
phase: 06-in-stay-dashboard
plan: 03
subsystem: frontend-dashboard
tags: [react, components, dashboard, whatsapp, wifi, visa]
dependency-graph:
  requires: ['06-01', '06-02']
  provides:
    [
      'dashboard-shell',
      'section-components',
      'wifi-card',
      'welcome-card',
      'quick-actions',
      'checkout-info',
      'contact-sheet',
      'visa-status',
      'return-banner',
    ]
  affects: ['06-04']
tech-stack:
  added: []
  patterns:
    [
      'thin-shell-composition',
      'props-from-api',
      'copy-to-clipboard',
      'whatsapp-deeplink',
      'localstorage-dismiss',
      'session-guard-redirect',
    ]
key-files:
  created:
    - apps/accommodations/frontend/components/stay/DashboardHeader.tsx
    - apps/accommodations/frontend/components/stay/WifiCard.tsx
    - apps/accommodations/frontend/components/stay/WelcomeCard.tsx
    - apps/accommodations/frontend/components/stay/QuickActions.tsx
    - apps/accommodations/frontend/components/stay/CheckoutInfo.tsx
    - apps/accommodations/frontend/components/stay/ContactSheet.tsx
    - apps/accommodations/frontend/components/stay/VisaStatusCard.tsx
    - apps/accommodations/frontend/components/stay/ReturnGuestBanner.tsx
  modified:
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
decisions:
  - id: dashboard-shell-pattern
    description: 'Dashboard page is thin shell (130 lines) composing 8 section components with real data from useStaySession + fetchProperty'
  - id: visa-static-lookup
    description: 'Visa exemption days use hardcoded lookup for 15 common nationalities (Vietnam-focused) with fallback to e-visa portal link'
  - id: combined-commit
    description: 'Tasks 1 and 2 committed together since shell imports all components and build requires all files present'
metrics:
  duration: '3 minutes'
  completed: '2026-01-29'
---

# Phase 6 Plan 3: Dashboard Components Summary

**Split monolithic 1387-line dashboard into thin shell + 8 composable section components wired to real API data.**

## What Was Done

### Task 1: Dashboard Shell and Core Data Components

- **Dashboard page** (`page.tsx`): Rewritten from 1387 lines to 130 lines. Uses `useStaySession` for auth guard and `fetchProperty` for extended data. Redirects to `/` if not authenticated. Shows loading spinner while data loads.
- **DashboardHeader**: Property name, image (first from images array), verified badge, language selector placeholder
- **WifiCard**: WiFi network + password from `stay.wifi`, copy-to-clipboard via `navigator.clipboard.writeText()` with 2-second "Copied!" feedback
- **WelcomeCard**: Guest first name, room name/number, check-in/out dates formatted with `date-fns format()`, days remaining countdown via `differenceInCalendarDays`
- **QuickActions**: 4-button grid (Room Service, Concierge, Housekeeping, Report Issue). Each opens WhatsApp via `wa.me/{phone}?text={encoded_message}` with room number and property context. Falls back to defaults if property has no custom `quickActions`.
- **CheckoutInfo**: Checkout time and house rules from property data
- **ContactSheet**: Bottom sheet with WhatsApp (pre-filled message) and phone call options

### Task 2: Visa Status Card and Return Guest Banner

- **VisaStatusCard**: Displays visa exemption info based on guest nationality. Hardcoded lookup for 15 common nationalities visiting Vietnam (US, GB, DE, FR, IT, ES, JP, KR, AU, SE, NO, DK, FI, BY, RU). Shows progress bar with color-coded urgency. Falls back to e-visa portal link for unknown nationalities.
- **ReturnGuestBanner**: Conditional promo banner (only renders if `returnBannerText` provided). Dismissible with localStorage persistence (`gudbro_return_banner_dismissed`). Starts hidden to prevent flash.

## Commits

| Hash    | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| 6989b95 | feat(06-03): split monolithic dashboard into composable section components |

## Deviations from Plan

None - plan executed exactly as written. Tasks 1 and 2 were committed together because the shell page imports all 8 components and both tasks must be complete for the build to pass.

## Verification Results

- Dashboard page: 130 lines (target: under 200, was 1387)
- All 8 section components in `components/stay/`
- No hardcoded mock data in any component
- `navigator.clipboard.writeText` in WifiCard
- `wa.me` WhatsApp links in QuickActions and ContactSheet
- `differenceInCalendarDays` in WelcomeCard and VisaStatusCard
- `useStaySession` session guard with redirect
- `pnpm --filter accommodations-frontend build` passes
- Typecheck passes

## Next Phase Readiness

Plan 04 (Services, Deals, Useful Numbers) can proceed. Placeholder comments mark where those components slot into the dashboard shell (lines 97-106 in page.tsx).
