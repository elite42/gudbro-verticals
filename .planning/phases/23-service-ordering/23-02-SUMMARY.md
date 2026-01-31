---
phase: 23-service-ordering
plan: 02
subsystem: backoffice-accommodations
tags: [backoffice, crud, services, catalog, pricing]
dependency-graph:
  requires: [23-01]
  provides: [service-catalog-api, service-catalog-ui, services-page]
  affects: [23-03, 23-04]
tech-stack:
  added: []
  patterns:
    [
      two-panel-crud,
      allowlisted-fields,
      price-major-minor-conversion,
      zero-decimal-currencies,
    ]
key-files:
  created:
    - apps/backoffice/app/api/accommodations/services/route.ts
    - apps/backoffice/components/accommodations/ServiceCatalogManager.tsx
    - apps/backoffice/app/(dashboard)/accommodations/services/page.tsx
  modified: []
decisions:
  - Price input in major units with auto-conversion to minor (x100) for storage
  - Zero-decimal currency set (VND, JPY, KRW, etc.) skips conversion
  - Category deletion cascades items manually (delete items first, then category)
  - Currency derived from first item in catalog, defaults to EUR
  - Slug auto-generated from category name on create and update
metrics:
  duration: ~5 min
  completed: 2026-01-31
---

# Phase 23 Plan 02: Backoffice Service Catalog Manager Summary

**Two-panel CRUD for service categories and items with price conversion, automation level dropdown, availability hours, and admin API key auth**

## What Was Built

### Service Catalog API (route.ts)

- **GET** `/api/accommodations/services?propertyId=X` - Fetches all categories with nested items, ordered by display_order/sort_order, maps snake_case to camelCase
- **POST** - Creates category (auto slug, auto display_order) or item (auto sort_order, category ownership check)
- **PUT** - Updates category or item with allowlisted fields pattern, ownership verification
- **DELETE** - Deletes category (cascades items manually) or item with ownership check
- All endpoints use `validateAdminApiKey` + `supabaseAdmin`

### ServiceCatalogManager Component

- Two-panel layout: categories (1/3 width) and items (2/3 width) on desktop, stacked on mobile
- Category cards show: name, icon, item count, automation level badge, active status
- Item cards show: name, formatted price, description (truncated), availability badge, in-stock toggle
- Inline editing for both categories and items
- Category form: name, icon (Phosphor name), automation level dropdown (Auto-confirm/Manual/WhatsApp+Auto), active toggle
- Item form: name, price in major units, description textarea, always-available checkbox with from/until time pickers, in-stock toggle, image URL
- Price conversion: major units in form (12.50) stored as minor units (1250), with zero-decimal currency support
- CRUD operations via fetch to `/api/accommodations/services` with AUTH_HEADERS
- Success/error banners, loading spinner, confirmation dialogs for delete

### Services Page

- Located at `/accommodations/services` in backoffice dashboard
- Uses `NEXT_PUBLIC_ACCOM_PROPERTY_ID` env var (same pattern as rooms page)
- Shows warning if property ID not configured

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

1. **Price major/minor conversion**: User enters major units (12.50), stored as minor (1250). Zero-decimal currencies (VND, JPY, KRW, etc.) skip conversion.
2. **Currency detection**: Derived from first item's currency in catalog, defaults to EUR.
3. **Category cascade delete**: Items deleted explicitly before category (defensive against missing FK CASCADE).
4. **Slug auto-update**: When category name changes via PUT, slug is regenerated.

## Verification

- [x] TypeScript compiles cleanly
- [x] Next.js build passes
- [x] API route exports GET, POST, PUT, DELETE
- [x] ServiceCatalogManager exceeds 100 lines (964 lines)
- [x] Services page at /accommodations/services
- [x] Automation level dropdown with 3 options
- [x] All 7 success criteria met

## Next Phase Readiness

Plan 23-03 (Guest Cart & Order UI) can proceed - service catalog management is complete and tested.
