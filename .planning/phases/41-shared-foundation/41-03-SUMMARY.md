---
phase: 41-shared-foundation
plan: 03
started: 2026-02-02T07:58:56Z
completed: 2026-02-02
duration: ~3 min
subsystem: shared-packages
tags: [ui, types, bottom-nav, domain-types, react, next.js]
dependency_graph:
  requires: ['41-01']
  provides:
    [
      'BottomNav shared component',
      'NavItem and BottomNavProps types',
      'Order domain type',
      'MerchantCharge domain type',
    ]
  affects: ['41-04', '41-05', '41-06', '42-xx', '43-xx']
tech_stack:
  added: []
  patterns:
    [
      'Configurable BottomNav with button/Link center modes',
      'Re-export pattern for existing types (MenuItem from custom.ts)',
      'Extracted sub-types for MerchantCharge (ChargeType, ChargeAmountType, etc.)',
    ]
key_files:
  created:
    - shared/ui/components/bottom-nav.tsx
    - shared/types/domain.ts
  modified:
    - shared/ui/index.ts
    - shared/ui/package.json
    - shared/types/index.ts
decisions:
  - id: 41-03-D1
    decision: 'Center item renders as button when onCenterClick provided, as Link otherwise'
    reason: 'Gym/laundry use button (opens drawer), pharmacy/workshops use Link (navigates to page)'
  - id: 41-03-D2
    decision: 'MenuItem re-exported from custom.ts instead of redefined in domain.ts'
    reason: 'MenuItem already existed in custom.ts; avoid duplication and potential drift'
  - id: 41-03-D3
    decision: 'MerchantCharge sub-types extracted as named types (ChargeType, ChargeAmountType, etc.)'
    reason: 'Enables apps to import specific union types without referencing the full interface'
  - id: 41-03-D4
    decision: 'Added next>=14 as peer dependency to @gudbro/ui'
    reason: 'BottomNav imports from next/link and next/navigation; peer dep documents this requirement'
metrics:
  tasks_completed: 2
  tasks_total: 2
  commits: 2
---

# Phase 41 Plan 03: Shared BottomNav & Domain Types Summary

**One-liner:** Configurable BottomNav component in @gudbro/ui (replacing 4 app duplicates) and consolidated Order/MerchantCharge domain types in @gudbro/types.

## What Was Done

### Task 1: Create shared BottomNav component

- Created `shared/ui/components/bottom-nav.tsx` with `'use client'` directive
- Exported `NavItem` interface: label, href, icon renderer, optional isCenter
- Exported `BottomNavProps`: items, activeColor, borderColor, onCenterClick, centerBadge
- Two center item modes:
  - **Button mode** (onCenterClick provided): gym/laundry pattern, renders `<button>` with hover color
  - **Link mode** (no onCenterClick): pharmacy/workshops pattern, renders `<Link>` with active state
- Badge support on center item (laundry bag count pattern)
- Active state: `scale(1.1)` transform + activeColor, matching all 4 existing implementations
- Inactive state: `var(--charcoal-muted)` color
- Added `next>=14` as peer dependency for Link/usePathname imports
- Added barrel export to `shared/ui/index.ts`

### Task 2: Create consolidated domain types

- Created `shared/types/domain.ts` with three domain type families:
  - **Order**: Generalized from waiter (Zustand store) and coffeeshop (order-service) implementations
    - `Order`, `OrderItem`, `OrderStatus`, `OrderItemStatus`
    - Optional fields for table/consumption context (not all verticals need them)
  - **MerchantCharge**: Consolidated from backoffice ChargesManager and coffeeshop useMerchantCharges
    - Full type with all fields from the backoffice superset (includes `legal_reference`)
    - Extracted sub-types: `ChargeType`, `ChargeAmountType`, `ChargeDisplayMode`, `ChargeCalculationBase`, `ChargeAppliesTo`
  - **MenuItem**: Re-exported from `custom.ts` (already defined there, no duplication)
- Updated `shared/types/index.ts` barrel with explicit named exports from domain.ts

## Decisions Made

| ID       | Decision                                          | Rationale                                                      |
| -------- | ------------------------------------------------- | -------------------------------------------------------------- |
| 41-03-D1 | Button/Link center mode based on onCenterClick    | Gym/laundry open drawers; pharmacy/workshops navigate to pages |
| 41-03-D2 | MenuItem re-exported from custom.ts               | Already existed; avoid duplication                             |
| 41-03-D3 | Extracted MerchantCharge sub-types as named types | Apps can import specific union types without full interface    |
| 41-03-D4 | next>=14 as peer dependency for @gudbro/ui        | BottomNav uses next/link and next/navigation                   |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

1. `pnpm --filter @gudbro/ui typecheck` -- PASS
2. `pnpm --filter @gudbro/types typecheck` -- PASS
3. BottomNav exported from `shared/ui/index.ts` -- CONFIRMED
4. `domain.ts` contains MenuItem, Order, MerchantCharge -- CONFIRMED
5. No existing exports removed from either barrel file -- CONFIRMED

## Commits

| Hash    | Message                                                     |
| ------- | ----------------------------------------------------------- |
| 4ca31f3 | feat(41-03): add shared BottomNav component to @gudbro/ui   |
| 4b23bef | feat(41-03): add consolidated domain types to @gudbro/types |

## Next Phase Readiness

The shared BottomNav and domain types are ready for consumption. Migration pattern for apps:

**BottomNav migration:**

1. Add `@gudbro/ui` dependency (if not already present)
2. Define app-specific `navItems: NavItem[]` array with icons
3. Replace local `BottomNav` with `<BottomNav items={navItems} activeColor="var(--brand-color)" />`
4. For gym/laundry: pass `onCenterClick` and optionally `centerBadge`
5. Delete local `components/BottomNav.tsx`

**Domain types migration:**

1. Import from `@gudbro/types` instead of local definitions
2. Delete local `interface Order`, `interface MerchantCharge` definitions
3. Adjust field names if local types used different naming (e.g. `order_code` vs `orderNumber`)
