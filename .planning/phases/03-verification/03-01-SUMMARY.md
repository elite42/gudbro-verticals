---
phase: 03-verification
plan: 01
subsystem: build-pipeline
tags: [next.js, typescript, workspace, build-verification]
completed: 2026-01-29
duration: 6 minutes

dependency-graph:
  requires:
    - 01-01 # TypeScript fixes
    - 02-01 # Wellness vertical separation
    - 02-02 # Accommodations BottomNav
    - 02-03 # UI/UX verification
  provides:
    - All 7 vertical PWAs build successfully
    - @shared/payment workspace package
    - Build verification baseline
  affects:
    - All future vertical development
    - Deployment verification plans
    - CI/CD pipeline setup

tech-stack:
  added:
    - '@shared/payment workspace package'
  patterns:
    - 'Workspace dependency pattern for shared modules'
    - 'ESM package.json configuration for Next.js'
    - 'TypeScript path alias with selective includes'

key-files:
  created:
    - shared/payment/package.json
    - .planning/phases/03-verification/build-results.md
  modified:
    - apps/tours/frontend/package.json
    - apps/tours/frontend/lib/types.ts
    - apps/tours/frontend/tsconfig.json
    - apps/accommodations/frontend/package.json
    - apps/accommodations/frontend/app/page.tsx
    - apps/accommodations/frontend/components/BottomNav.tsx

decisions:
  - id: SHARED-PAYMENT-WORKSPACE
    title: '@shared/payment as workspace package'
    context: 'Tours vertical imports @shared/payment but it was not configured as a workspace package'
    decision: 'Created package.json with exports field, added as workspace dependency'
    rationale: 'Enables proper TypeScript resolution and transpilation in Next.js build'
    alternatives: 'Relative imports would work but break convention and complicate refactoring'

  - id: TSCONFIG-SELECTIVE-INCLUDES
    title: 'Limit tsconfig includes to only required shared modules'
    context: 'Tours tsconfig included all shared/**/*.ts which pulled in food-database with type errors'
    decision: 'Changed include to only shared/payment/**/*.ts'
    rationale: 'Prevents unrelated shared modules from causing type errors during build'
    alternatives: 'Could fix food-database types but marked as out-of-scope in STATE.md'

  - id: ESM-CONFIG-MODULE-TYPE
    title: 'Declare module type for ESM configs'
    context: 'Accommodations uses export default in postcss.config.js but package.json had no type field'
    decision: 'Added "type": "module" to package.json'
    rationale: 'Node requires explicit module type when using ESM syntax'
    alternatives: 'Could convert configs to CJS but ESM is modern standard'
---

# Phase 3 Plan 01: Build Verification Summary

**One-liner:** All 7 vertical PWAs build successfully after fixing workspace setup (Tours) and ESM config (Accommodations)

## What Was Done

Built all 7 vertical frontend PWAs using `pnpm --filter @gudbro/*-frontend build` to establish a verified baseline for Phase 3.

**Category A (Menu-Template Verticals) - 5/5 PASS:**

- Pharmacy ✅ (8 pages, 0 errors)
- Workshops ✅ (8 pages, 0 errors)
- Laundry ✅ (7 pages, 0 errors)
- Wellness ✅ (11 pages, 19 ESLint warnings logged)
- Gym ✅ (14 pages, 0 errors)

**Category B (Standalone Verticals) - 2/2 PASS:**

- Tours ✅ (4 pages, fixed 4 build errors inline)
- Accommodations ✅ (4 pages, fixed 3 build errors inline)

**Build Performance:** ~83 seconds total, 6-15 seconds per vertical

## Tasks Completed

### Task 1: Build Category A Verticals ✅

- Ran `pnpm install` to ensure workspace dependencies resolved
- Built Pharmacy, Workshops, Laundry, Wellness, Gym sequentially
- All 5 passed on first attempt (Wellness had expected ESLint warnings)
- Logged warnings but did NOT fix per plan instructions

### Task 2: Build Category B Verticals + Report ✅

- **Tours:** Fixed 4 build errors inline (workspace setup, type imports, tsconfig)
- **Accommodations:** Fixed 3 build errors inline (ESM config, type assertions)
- Created comprehensive `build-results.md` documenting all builds
- Committed fixes atomically per vertical (2 commits total)

## Key Outcomes

### 1. @shared/payment Workspace Package Created

Tours vertical required shared payment types but the module wasn't set up as a workspace package. Created `shared/payment/package.json` with proper exports field and added as workspace dependency. This pattern now available for other verticals needing shared modules.

### 2. Tours Build Errors Resolved

Four interconnected issues fixed:

- Missing workspace package setup (blocking)
- Type import/export pattern (types not available in local scope)
- Missing downlevelIteration (string spread operator failed)
- Overly broad tsconfig includes (pulled in unrelated shared modules)

### 3. Accommodations Build Errors Resolved

Three ESM-related issues fixed:

- Missing `"type": "module"` for postcss.config.js
- Type mismatch between React state setter and callback prop
- Icon signature inconsistency (menu icon didn't accept parameter)

### 4. Build Verification Baseline Established

All 7 verticals now have confirmed working TypeScript configurations and Next.js build pipelines. This baseline enables:

- Runtime verification in subsequent plans
- CI/CD pipeline setup with confidence
- Parallel vertical development without build surprises

## Technical Details

### Tours Fixes (Commit: 388e622)

**Issue 1: @shared/payment not found**

```bash
Error: Cannot find module '@shared/payment/types'
```

Created `shared/payment/package.json`:

```json
{
  "name": "@shared/payment",
  "version": "1.0.0",
  "private": true,
  "main": "index.ts",
  "types": "index.ts",
  "exports": {
    ".": "./index.ts",
    "./types": "./types.ts",
    "./utils": "./utils.ts"
  }
}
```

Added to `tours/package.json`:

```json
"dependencies": {
  "@shared/payment": "workspace:*",
  ...
}
```

**Issue 2: PaymentMethod type not available**

```typescript
// Before - exports but doesn't import
export type { PaymentMethod, ... } from '@shared/payment/types'
payment_method?: PaymentMethod // Error: Cannot find name

// After - import for local use, export for consumers
import type { PaymentMethod, ... } from '@shared/payment/types'
export type { PaymentMethod, ... }
payment_method?: PaymentMethod // ✅ Works
```

**Issue 3: String spread operator**

```bash
Error: Type 'string' can only be iterated through when using '--downlevelIteration'
```

Added to `tsconfig.json`:

```json
"downlevelIteration": true
```

**Issue 4: Food-database type conflicts**

```bash
Error: Type 'AllergenFlags' is not an array type or does not have '[Symbol.iterator]()'
```

Changed `tsconfig.json` include:

```json
// Before
"include": ["...", "../../../shared/**/*.ts"]

// After (selective)
"include": ["...", "../../../shared/payment/**/*.ts"]
```

### Accommodations Fixes (Commit: d816688)

**Issue 1: PostCSS ESM syntax**

```bash
Error: Your custom PostCSS configuration must export a `plugins` key.
Warning: Module type not specified and doesn't parse as CommonJS
```

Added to `package.json`:

```json
"type": "module"
```

**Issue 2: onTabChange type mismatch**

```typescript
// Before
<BottomNav onTabChange={setActiveTab} />
// Error: Dispatch<SetStateAction<...>> not assignable to (tab: string) => void

// After
<BottomNav onTabChange={(tab) => setActiveTab(tab as typeof activeTab)} />
```

**Issue 3: Menu icon signature**

```typescript
// Before
icon: () => (<svg>...</svg>)
// Called with: item.icon(false)
// Error: Expected 0 arguments, but got 1

// After
icon: (_active: boolean) => (<svg>...</svg>)
```

## Deviations from Plan

### Auto-Fixed Issues (Deviation Rules Applied)

**Tours - 4 fixes (Rules 1 + 3):**

1. **Rule 3 (Blocking):** Created @shared/payment workspace package - couldn't build without it
2. **Rule 1 (Bug):** Fixed type import pattern - PaymentMethod undefined in scope
3. **Rule 1 (Bug):** Added downlevelIteration - string spread operator failed
4. **Rule 3 (Blocking):** Limited tsconfig includes - unrelated modules causing errors

**Accommodations - 3 fixes (Rule 1):**

1. **Rule 1 (Bug):** Added type: module - PostCSS config syntax error
2. **Rule 1 (Bug):** Fixed type assertion - React state type mismatch
3. **Rule 1 (Bug):** Fixed icon signature - function arity mismatch

All fixes were < 5 lines each and directly addressed build errors. Committed atomically per vertical for clean git history.

## Warnings Logged (Not Fixed)

Per plan instructions, deprecation warnings and ESLint warnings were logged but NOT fixed:

**Wellness (19 ESLint warnings):**

- `@next/next/no-img-element` (8) - Using `<img>` instead of `<Image />`
- `@typescript-eslint/no-explicit-any` (2) - `any` types in search page
- `@typescript-eslint/no-unused-vars` (2) - Unused variables
- `react/no-unescaped-entities` (2) - Unescaped quotes
- `react-hooks/exhaustive-deps` (1) - Missing useEffect dependency

**Rationale:** These don't prevent build, and plan explicitly states "do NOT fix warnings."

## Decisions Made

### Decision: @shared/payment as Workspace Package

**Context:** Tours imports `@shared/payment/types` but module existed only as TypeScript files without package.json.

**Decision:** Created workspace package with proper exports field and added as dependency.

**Why:** Enables Next.js transpilePackages and proper module resolution. Follows workspace convention used by @gudbro/menu-template.

**Impact:** Other verticals can now use @shared/payment without similar setup. Pattern established for future shared modules.

### Decision: Limit tsconfig Includes to Required Modules

**Context:** Tours tsconfig included `../../../shared/**/*.ts` which pulled in food-database with known type errors (marked out-of-scope in STATE.md).

**Decision:** Changed to `../../../shared/payment/**/*.ts` to include only what's needed.

**Why:** Prevents unrelated type errors from blocking build. Tours doesn't use food-database.

**Impact:** Each vertical should explicitly include only the shared modules it needs. Prevents "type pollution" from unused modules.

### Decision: Declare Module Type for ESM Configs

**Context:** Accommodations uses ESM syntax (`export default`) in postcss.config.js but package.json had no type declaration.

**Decision:** Added `"type": "module"` to package.json.

**Why:** Node requires explicit module type when using ESM syntax. Next.js documentation recommends ESM for config files.

**Impact:** Accommodations now fully ESM-compatible. Other verticals may follow this pattern for cleaner config syntax.

## Files Changed

**Created:**

- `shared/payment/package.json` - Workspace package setup for shared payment types
- `.planning/phases/03-verification/build-results.md` - Comprehensive build report

**Modified (Tours):**

- `apps/tours/frontend/package.json` - Added @shared/payment dependency
- `apps/tours/frontend/lib/types.ts` - Fixed type import/export pattern
- `apps/tours/frontend/tsconfig.json` - Added downlevelIteration, limited includes

**Modified (Accommodations):**

- `apps/accommodations/frontend/package.json` - Added type: module
- `apps/accommodations/frontend/app/page.tsx` - Fixed onTabChange type assertion
- `apps/accommodations/frontend/components/BottomNav.tsx` - Fixed menu icon signature

## Next Phase Readiness

### Blockers Resolved

- ✅ All 7 verticals have working build pipelines
- ✅ Workspace dependencies properly configured
- ✅ TypeScript configurations validated
- ✅ ESM/CJS config patterns established

### New Capabilities Unlocked

- **Build verification baseline:** Can now confidently test runtime behavior
- **CI/CD ready:** All builds pass, can set up automated testing
- **Parallel development:** Verticals can be developed independently without build surprises
- **Shared module pattern:** @shared/payment demonstrates how to add future shared packages

### Known Issues (Outside Scope)

- **Tours:** Food-database type errors remain (intentionally excluded from tsconfig)
- **Wellness:** 19 ESLint warnings (don't prevent build, will address in cleanup phase)

### Recommended Next Steps

1. **Runtime verification:** Start dev servers and verify all 7 verticals load correctly
2. **E2E smoke tests:** Basic navigation and functionality checks per vertical
3. **Deployment verification:** Test production builds deploy successfully to Vercel
4. **CI/CD setup:** Automate build verification for all verticals in GitHub Actions

## Lessons Learned

### 1. Workspace Package Setup is Critical for Shared Modules

Tours build failed because @shared/payment wasn't configured as a proper workspace package. Just having TypeScript files isn't enough for Next.js transpilation. Always create package.json with exports field.

### 2. Type Re-exports Don't Create Local Scope

The pattern `export type { X } from 'Y'` makes X available to consumers but NOT within the same file. Need `import type { X } from 'Y'` for local use + `export type { X }` for consumers.

### 3. Selective tsconfig Includes Prevent Type Pollution

Including `shared/**/*.ts` pulled in unrelated modules with their own type errors. Better to explicitly include only what's needed: `shared/payment/**/*.ts`.

### 4. ESM Config Files Require Explicit Module Type

Next.js allows ESM syntax in configs but Node requires `"type": "module"` in package.json. Without it, performance warnings and potential parse errors.

### 5. Build Verification Catches Integration Issues Early

Menu-template verticals passed immediately (shared pattern works well), but standalone verticals revealed workspace setup and config issues. Building early in verification phase prevents surprises during deployment.

## Metrics

- **Duration:** 6 minutes
- **Tasks completed:** 2/2
- **Builds successful:** 7/7 (100%)
- **Inline fixes:** 7 files, 2 commits
- **Lines changed:** ~25 lines total
- **Warnings logged:** 19 (Wellness)
- **Errors resolved:** 7 (4 Tours, 3 Accommodations)

## Commits

1. **388e622** - `fix(03-01): resolve tours-frontend build errors`
   - Created @shared/payment package.json with exports
   - Added @shared/payment workspace dependency
   - Fixed type import/export pattern in types.ts
   - Added downlevelIteration, limited tsconfig includes

2. **d816688** - `fix(03-01): resolve accommodations-frontend build errors`
   - Added type: module for ESM config support
   - Fixed onTabChange type mismatch
   - Fixed menu icon signature

---

**Status:** ✅ Complete
**Verification:** All success criteria met, build-results.md shows PASS for all 7 verticals
**Next:** Ready for runtime verification and deployment testing
