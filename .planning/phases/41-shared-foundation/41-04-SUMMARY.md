---
phase: 41-shared-foundation
plan: 04
started: 2026-02-02
completed: 2026-02-02
duration: ~10 min
subsystem: shared-packages
tags: [currency, hooks, utils, migration, monorepo, pnpm-workspace]
dependency_graph:
  requires: ['41-01']
  provides:
    [
      'Coffeeshop migrated to @gudbro/hooks and @gudbro/utils',
      'Gym migrated to @gudbro/hooks and @gudbro/utils',
      'Laundry migrated to @gudbro/hooks and @gudbro/utils',
      'App-specific currency.ts setup files with factory instances',
      '9 local duplicate files deleted',
    ]
  affects: ['41-05', '41-06']
tech_stack:
  added: []
  patterns:
    [
      'App-specific currency.ts setup file wiring shared factories with DI',
      'useAppPriceFormat wrapper hook pre-wiring shared usePriceFormat with app stores',
      'CURRENCIES as AVAILABLE_CURRENCIES re-export for backward compatibility',
    ]
key_files:
  created:
    - apps/coffeeshop/frontend/lib/currency.ts
    - apps/gym/frontend/lib/currency.ts
    - apps/laundry/frontend/lib/currency.ts
  modified:
    - apps/coffeeshop/frontend/package.json
    - apps/gym/frontend/package.json
    - apps/laundry/frontend/package.json
    - pnpm-workspace.yaml
    - 20+ coffeeshop component/page files (import updates)
    - 10 gym page files (import updates)
decisions:
  - id: 41-04-D1
    decision: 'Each app gets a lib/currency.ts setup file that creates app-specific store/converter instances'
    reason: 'Shared modules use factory pattern with DI; apps need thin wiring layer for app-specific config'
  - id: 41-04-D2
    decision: 'useAppPriceFormat wrapper hook in each app pre-wires shared usePriceFormat with app stores'
    reason: 'Consumers import useAppPriceFormat (aliased as usePriceFormat) for zero-change migration'
  - id: 41-04-D3
    decision: 'Re-export CURRENCIES as AVAILABLE_CURRENCIES in coffeeshop currency.ts'
    reason: 'Coffeeshop consumers used AVAILABLE_CURRENCIES name; shared module exports CURRENCIES'
  - id: 41-04-D4
    decision: 'Added gym and laundry to pnpm-workspace.yaml'
    reason: 'pnpm did not recognize gym/laundry frontends as workspace packages without explicit entries'
metrics:
  tasks_completed: 2
  tasks_total: 2
  commits: 2
---

# Phase 41 Plan 04: Migrate Apps to Shared Currency Modules Summary

**One-liner:** Coffeeshop, gym, and laundry migrated from 9 local currency files to shared @gudbro/hooks usePriceFormat and @gudbro/utils factories via app-specific currency.ts setup files.

## Performance

- **Duration:** ~10 min
- **Tasks:** 2/2
- **Files created:** 3 (currency.ts setup files)
- **Files modified:** ~35 (package.json x3, pnpm-workspace.yaml, ~20 coffeeshop files, ~10 gym files)
- **Files deleted:** 9 (3 usePriceFormat + 3 currency-converter + 3 currency-preferences)

## Accomplishments

- All 3 apps now use `@gudbro/hooks` for usePriceFormat and `@gudbro/utils` for currency store/converter factories
- Each app has a thin `lib/currency.ts` setup file that creates app-specific instances (preserving exact localStorage keys and behavior)
- Coffeeshop's Supabase fetchRates integration preserved in its setup file
- Gym's formatVNDPrice re-exported from shared utils
- All 3 apps build successfully with zero behavioral change

## Task Commits

1. **Task 1: Create currency setup files and add shared deps** - `a518255` (feat)
2. **Task 2: Migrate imports and delete local duplicates** - `230c6d8` (refactor)

## Files Created/Modified

**Created:**

- `apps/coffeeshop/frontend/lib/currency.ts` - App-specific currency store, converter, and useAppPriceFormat with Supabase fetchRates
- `apps/gym/frontend/lib/currency.ts` - App-specific currency store, converter, useAppPriceFormat, re-exports formatVNDPrice
- `apps/laundry/frontend/lib/currency.ts` - App-specific currency store, converter, and useAppPriceFormat

**Modified:**

- `apps/coffeeshop/frontend/package.json` - Added @gudbro/\* workspace deps
- `apps/gym/frontend/package.json` - Added @gudbro/\* workspace deps
- `apps/laundry/frontend/package.json` - Added @gudbro/\* workspace deps
- `pnpm-workspace.yaml` - Added apps/gym/_ and apps/laundry/_ entries
- ~20 coffeeshop components/pages - Updated import paths
- ~10 gym pages - Updated import paths from @/lib/currency-converter to @/lib/currency

**Deleted:**

- `apps/coffeeshop/frontend/hooks/usePriceFormat.ts`
- `apps/coffeeshop/frontend/lib/currency-converter.ts`
- `apps/coffeeshop/frontend/lib/currency-preferences.ts`
- `apps/gym/frontend/hooks/usePriceFormat.ts` (untracked)
- `apps/gym/frontend/lib/currency-converter.ts` (untracked)
- `apps/gym/frontend/lib/currency-preferences.ts` (untracked)
- `apps/laundry/frontend/hooks/usePriceFormat.ts` (untracked)
- `apps/laundry/frontend/lib/currency-converter.ts` (untracked)
- `apps/laundry/frontend/lib/currency-preferences.ts` (untracked)

## Decisions Made

| ID       | Decision                                        | Rationale                                                                |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| 41-04-D1 | App-specific lib/currency.ts setup files        | Shared factories need DI wiring; apps need thin config layer             |
| 41-04-D2 | useAppPriceFormat wrapper pre-wires shared hook | Zero-change migration for consumers (alias as usePriceFormat)            |
| 41-04-D3 | Re-export CURRENCIES as AVAILABLE_CURRENCIES    | Backward compat for coffeeshop consumers that used old name              |
| 41-04-D4 | Added gym/laundry to pnpm-workspace.yaml        | pnpm couldn't resolve workspace:\* deps without explicit workspace entry |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added gym and laundry to pnpm-workspace.yaml**

- **Found during:** Task 1 (pnpm install after adding workspace deps)
- **Issue:** pnpm did not recognize gym/laundry frontends as workspace packages; `pnpm --filter @gudbro/gym-frontend build` returned "No projects matched"
- **Fix:** Added `'apps/gym/*'` and `'apps/laundry/*'` entries to pnpm-workspace.yaml
- **Files modified:** pnpm-workspace.yaml
- **Verification:** pnpm install succeeded, workspace deps resolved
- **Committed in:** a518255 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed relative path imports not caught by initial pass**

- **Found during:** Task 2 (coffeeshop build failed after first import update pass)
- **Issue:** Initial grep only matched `@/hooks/usePriceFormat` and `@/lib/currency-*` patterns. Many coffeeshop files used relative paths like `../lib/currency-preferences` and `../../lib/currency-converter`
- **Fix:** Broader grep for all currency-related imports, updated ~13 additional files with relative path imports
- **Files modified:** ~13 coffeeshop component files
- **Verification:** coffeeshop build passes
- **Committed in:** 230c6d8 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for builds to pass. No scope creep.

## Issues Encountered

- Gym/laundry local files (hooks/usePriceFormat.ts, lib/currency-converter.ts, lib/currency-preferences.ts) were never tracked by git (created in prior plans but uncommitted). Deletion from disk worked but `git add` for removal was unnecessary. Only the modified page/component files needed staging.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Coffeeshop, gym, and laundry are fully migrated to shared currency modules
- Migration pattern established: shared factory + app-specific setup file + wrapper hook
- Ready for 41-05 (BottomNav migration) and 41-06 (remaining shared module migrations)

---

_Phase: 41-shared-foundation_
_Completed: 2026-02-02_
