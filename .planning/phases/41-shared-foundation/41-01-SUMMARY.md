---
phase: 41-shared-foundation
plan: 01
started: 2026-02-02T07:50:29Z
completed: 2026-02-02
duration: ~4 min
subsystem: shared-packages
tags: [hooks, utils, currency, react, pnpm-workspace]
dependency_graph:
  requires: []
  provides:
    [
      '@gudbro/hooks package',
      '@gudbro/utils currency modules',
      'usePriceFormat hook',
      'createCurrencyPreferencesStore',
      'createCurrencyConverter',
    ]
  affects: ['41-03', '41-04', '41-05', '41-06', '42-xx', '43-xx']
tech_stack:
  added: ['@gudbro/hooks']
  patterns:
    [
      'factory-pattern for currency stores/converters',
      'configurable storageKeyPrefix for localStorage isolation',
      'CustomEvent-based reactivity',
    ]
key_files:
  created:
    - shared/hooks/package.json
    - shared/hooks/tsconfig.json
    - shared/hooks/index.ts
    - shared/hooks/use-price-format.ts
    - shared/utils/currency-converter.ts
    - shared/utils/currency-preferences.ts
  modified:
    - shared/utils/index.ts
    - pnpm-lock.yaml
decisions:
  - id: 41-01-D1
    decision: 'Factory pattern for both currency-preferences and currency-converter'
    reason: 'Each app needs its own store instance with unique storageKeyPrefix to avoid localStorage collisions'
  - id: 41-01-D2
    decision: 'usePriceFormat accepts options object (store, formatConvertedPrice, getBaseCurrency) instead of importing globals'
    reason: 'Decouples hook from app-specific config; apps wire their own store and converter instances'
  - id: 41-01-D3
    decision: 'VND formatting uses "k" for thousands and "M" for millions (from gym implementation)'
    reason: 'Gym prices can reach millions (e.g., monthly memberships); coffeeshop only had "k" format'
metrics:
  tasks_completed: 2
  tasks_total: 2
  commits: 2
---

# Phase 41 Plan 01: Shared Hooks & Currency Utils Summary

**One-liner:** Factory-based currency preferences store, currency converter with VND k/M format, and usePriceFormat React hook in new @gudbro/hooks package.

## What Was Done

### Task 1: Currency utilities in @gudbro/utils

- Created `currency-preferences.ts` with `createCurrencyPreferencesStore(config)` factory
  - Configurable `storageKeyPrefix` to isolate localStorage per app
  - Dispatches `currency-preferences-updated` CustomEvent for reactive UI updates
  - `CURRENCIES` map with code, symbol, name, flag, decimalDigits for 10 currencies
  - Exports `CurrencyPreferences`, `CurrencyPreferencesConfig`, `CurrencyPreferencesStore` types
- Created `currency-converter.ts` with `createCurrencyConverter(config)` factory
  - Optional `fetchRates` parameter (Supabase integration opt-in, not forced)
  - VND: "k" for thousands, "M" for millions (merged coffeeshop + gym patterns)
  - JPY/KRW: zero decimal places via Intl.NumberFormat
  - `DEFAULT_FALLBACK_RATES` with VND-based rates for 10 currencies
  - Returns `{ convert, formatConvertedPrice, getRate, refreshRates }`
- Updated `index.ts` barrel exports (appended, no existing exports removed)

### Task 2: @gudbro/hooks package with usePriceFormat

- Created new `shared/hooks/` workspace package (`@gudbro/hooks`)
- `usePriceFormat(options)` hook with dependency injection pattern:
  - Accepts `{ store, formatConvertedPrice, getBaseCurrency }`
  - Returns `{ formatPrice, formatPriceCompact, currencyPrefs, baseCurrency }`
  - `'use client'` directive for Next.js app router compatibility
  - SSR-safe with `typeof window` check
  - `useCallback` for stable function references
- tsconfig extends root `tsconfig.base.json` with `jsx: "react-jsx"`
- Linked via pnpm workspaces (shared/\* glob already covered it)

## Decisions Made

| ID       | Decision                                | Rationale                                                              |
| -------- | --------------------------------------- | ---------------------------------------------------------------------- |
| 41-01-D1 | Factory pattern for stores/converters   | Apps need isolated localStorage keys and optional Supabase integration |
| 41-01-D2 | Dependency injection in usePriceFormat  | Decouples hook from app config; each app wires its own instances       |
| 41-01-D3 | VND "M" format from gym added to shared | Gym memberships reach millions; coffeeshop only had "k"                |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

1. `pnpm --filter @gudbro/utils typecheck` -- PASS
2. `pnpm --filter @gudbro/hooks typecheck` -- PASS
3. `shared/utils/currency-converter.ts` exports `createCurrencyConverter` -- CONFIRMED
4. `shared/utils/currency-preferences.ts` exports `createCurrencyPreferencesStore` -- CONFIRMED
5. `shared/hooks/use-price-format.ts` has `'use client'` directive -- CONFIRMED
6. No circular dependencies (hooks -> utils, NOT reverse) -- CONFIRMED

## Commits

| Hash    | Message                                                                       |
| ------- | ----------------------------------------------------------------------------- |
| ff3443f | feat(41-01): add currency-converter and currency-preferences to @gudbro/utils |
| d7a3459 | feat(41-01): create @gudbro/hooks package with usePriceFormat hook            |

## Next Phase Readiness

The shared currency modules and hook are ready for consumption. Next plans (41-03 through 41-06) can now import from `@gudbro/utils` and `@gudbro/hooks` instead of duplicating currency logic in each app.

**Migration pattern for apps:**

1. Add `@gudbro/hooks` and `@gudbro/utils` as dependencies
2. Create app-specific instances: `const store = createCurrencyPreferencesStore({ storageKeyPrefix: 'gudbro-coffeeshop', baseCurrency: 'VND' })`
3. Create converter: `const converter = createCurrencyConverter({ baseCurrency: 'VND', fallbackRates: DEFAULT_FALLBACK_RATES })`
4. Use hook: `const { formatPrice } = usePriceFormat({ store, formatConvertedPrice: converter.formatConvertedPrice, getBaseCurrency: () => 'VND' })`
5. Delete local `lib/currency-preferences.ts`, `lib/currency-converter.ts`, `hooks/usePriceFormat.ts`
