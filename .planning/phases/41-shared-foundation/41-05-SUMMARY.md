---
phase: 41-shared-foundation
plan: 05
started: 2026-02-02T08:13:34Z
completed: 2026-02-02
duration: ~6 min
subsystem: shared-packages
tags: [currency, hooks, utils, ui, bottom-nav, migration, monorepo]
dependency_graph:
  requires: ['41-01', '41-03', '41-04']
  provides:
    [
      'Pharmacy migrated to @gudbro/hooks and @gudbro/utils',
      'Workshops migrated to @gudbro/hooks and @gudbro/utils',
      '4 BottomNav local copies deleted (gym, laundry, pharmacy, workshops)',
      '6 currency duplicate files deleted (pharmacy + workshops)',
    ]
  affects: ['41-06']
tech_stack:
  added: []
  patterns:
    [
      'App-specific currency.ts setup file pattern (same as 41-04)',
      'NavItem[] array in ClientShell for shared BottomNav',
      'Center button mode (gym/laundry) vs center Link mode (pharmacy/workshops)',
    ]
key_files:
  created:
    - apps/pharmacy/frontend/lib/currency.ts
    - apps/workshops/frontend/lib/currency.ts
  modified:
    - apps/pharmacy/frontend/package.json
    - apps/workshops/frontend/package.json
    - apps/gym/frontend/components/ClientShell.tsx
    - apps/laundry/frontend/components/ClientShell.tsx
    - apps/pharmacy/frontend/components/ClientShell.tsx
    - apps/workshops/frontend/components/ClientShell.tsx
    - pnpm-workspace.yaml
decisions:
  - id: 41-05-D1
    decision: 'Workshops currency storage key changes from gudbro-workshops-currency to gudbro-workshops-currency-preferences'
    reason: 'Shared factory uses {prefix}-currency-preferences format; no app code consumed the old key (usePriceFormat hook was unused)'
  - id: 41-05-D2
    decision: 'Bag count logic moved from laundry BottomNav to ClientShell'
    reason: 'Shared BottomNav accepts centerBadge prop; bag count state must be managed by the consumer'
  - id: 41-05-D3
    decision: 'Nav items defined as NavItem[] arrays in each ClientShell, not in separate files'
    reason: 'Each app has exactly one consumer (ClientShell); extracting to separate file adds indirection without benefit'
metrics:
  tasks_completed: 2
  tasks_total: 2
  commits: 2
---

# Phase 41 Plan 05: Migrate Pharmacy/Workshops Currency + 4 BottomNav Apps Summary

**One-liner:** Pharmacy and workshops migrated to shared @gudbro/hooks and @gudbro/utils, 4 BottomNav apps (gym, laundry, pharmacy, workshops) migrated to @gudbro/ui with app-specific NavItem arrays.

## Performance

- **Duration:** ~6 min
- **Tasks:** 2/2
- **Files created:** 2 (currency.ts setup files)
- **Files modified:** 7 (package.json x2, pnpm-workspace.yaml, ClientShell.tsx x4)
- **Files deleted:** 10 (6 currency duplicates + 4 BottomNav local copies)

## Accomplishments

- Pharmacy and workshops now use `@gudbro/hooks` for usePriceFormat and `@gudbro/utils` for currency store/converter factories
- Each app has a thin `lib/currency.ts` setup file (same pattern as coffeeshop/gym/laundry from 41-04)
- All 4 BottomNav apps (gym, laundry, pharmacy, workshops) now import `BottomNav` from `@gudbro/ui`
- Gym: center button (Day Pass) with `onCenterClick`, activeColor `var(--orange-hex)`
- Laundry: center button (Menu) with `onCenterClick` + `centerBadge` for bag count, activeColor `var(--blue-hex)`
- Pharmacy: center link (Symptoms), activeColor `var(--green-hex)`
- Workshops: center link (Explore), activeColor `var(--terracotta)`, borderColor `var(--sand)`
- All 4 apps build successfully with zero behavioral change

## Task Commits

1. **Task 1: Migrate pharmacy and workshops currency** - `55942f2` (feat)
2. **Task 2: Migrate 4 BottomNav apps to @gudbro/ui** - `b91b53c` (refactor)

## Files Created/Modified

**Created:**

- `apps/pharmacy/frontend/lib/currency.ts` - App-specific currency store, converter, and useAppPriceFormat
- `apps/workshops/frontend/lib/currency.ts` - App-specific currency store, converter, and useAppPriceFormat

**Modified:**

- `apps/pharmacy/frontend/package.json` - Added @gudbro/hooks, @gudbro/utils, @gudbro/ui workspace deps
- `apps/workshops/frontend/package.json` - Added @gudbro/hooks, @gudbro/utils, @gudbro/ui workspace deps
- `pnpm-workspace.yaml` - Added apps/pharmacy/_ and apps/workshops/_ entries
- `apps/gym/frontend/components/ClientShell.tsx` - Replaced local BottomNav with shared @gudbro/ui BottomNav + NavItem[]
- `apps/laundry/frontend/components/ClientShell.tsx` - Replaced local BottomNav with shared @gudbro/ui BottomNav + NavItem[] + bag count logic
- `apps/pharmacy/frontend/components/ClientShell.tsx` - Replaced local BottomNav with shared @gudbro/ui BottomNav + NavItem[]
- `apps/workshops/frontend/components/ClientShell.tsx` - Replaced local BottomNav with shared @gudbro/ui BottomNav + NavItem[]

**Deleted:**

- `apps/pharmacy/frontend/hooks/usePriceFormat.ts` (untracked)
- `apps/pharmacy/frontend/lib/currency-converter.ts` (untracked)
- `apps/pharmacy/frontend/lib/currency-preferences.ts` (untracked)
- `apps/workshops/frontend/hooks/usePriceFormat.ts` (untracked)
- `apps/workshops/frontend/lib/currency-converter.ts` (untracked)
- `apps/workshops/frontend/lib/currency-preferences.ts` (untracked)
- `apps/gym/frontend/components/BottomNav.tsx` (untracked)
- `apps/laundry/frontend/components/BottomNav.tsx` (untracked)
- `apps/pharmacy/frontend/components/BottomNav.tsx` (untracked)
- `apps/workshops/frontend/components/BottomNav.tsx` (untracked)

## Decisions Made

| ID       | Decision                                           | Rationale                                                                      |
| -------- | -------------------------------------------------- | ------------------------------------------------------------------------------ |
| 41-05-D1 | Workshops currency key changes to new store format | Shared factory format; old key was unused (usePriceFormat hook never consumed) |
| 41-05-D2 | Bag count logic moved to laundry ClientShell       | Shared BottomNav accepts centerBadge prop; consumer manages state              |
| 41-05-D3 | Nav items defined inline in ClientShell            | One consumer per app; no benefit from separate file                            |

## Deviations from Plan

### Observations (Not Deviations)

**1. Workshops usePriceFormat hook was unused by app pages**

- **Found during:** Task 1 analysis
- **Issue:** Plan anticipated needing to update workshops consumers from `format`/`formatDual` to `formatPrice`/`formatPriceCompact`. Investigation revealed no app pages import `usePriceFormat`. Workshops pages manage currency state locally with `useState` and inline `Intl.NumberFormat` calls.
- **Impact:** No consumer migration was needed. The 6 local files were simply deleted since they had no consumers.

**2. Pharmacy usePriceFormat hook was also unused by app pages**

- **Found during:** Task 1 analysis
- **Issue:** Same as workshops. Pharmacy pages define their own local `formatPrice` functions inline.
- **Impact:** No consumer migration was needed.

**3. All 10 deleted files were untracked by git**

- **Found during:** Task 1 and Task 2 staging
- **Issue:** The currency files and BottomNav files for gym, laundry, pharmacy, workshops were never committed to git (created in prior phases but not tracked). Only file deletion from disk was needed, not `git rm`.
- **Impact:** None - deletion from disk was sufficient.

---

**Total deviations:** 0 (observations only, no scope changes needed)

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 5 apps (coffeeshop, gym, laundry, pharmacy, workshops) are now migrated to shared currency modules
- All 4 BottomNav apps (gym, laundry, pharmacy, workshops) use @gudbro/ui BottomNav
- Ready for 41-06 (remaining shared module migrations or completion)

---

_Phase: 41-shared-foundation_
_Completed: 2026-02-02_
