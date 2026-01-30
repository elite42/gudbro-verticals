---
phase: '09'
plan: '02'
subsystem: 'frontend'
tags: ['css-variables', 'theming', 'eslint', 'tours', 'wellness', 'next-image']
dependency-graph:
  requires: ['09-RESEARCH']
  provides:
    ['Tours CSS variable theming system', 'Wellness lint-clean codebase']
  affects: ['future Tours theme customization', 'CI lint gates']
tech-stack:
  added: []
  patterns:
    [
      'CSS variable-backed Tailwind tokens',
      'next/image for external URLs with unoptimized',
    ]
key-files:
  created: []
  modified:
    - 'apps/tours/frontend/styles/globals.css'
    - 'apps/tours/frontend/tailwind.config.ts'
    - 'apps/tours/frontend/app/page.tsx'
    - 'apps/tours/frontend/components/layout/BottomNav.tsx'
    - 'apps/tours/frontend/components/tours/TourCardV2.tsx'
    - 'apps/tours/frontend/components/tours/TourCards.tsx'
    - 'apps/tours/frontend/components/ui/Badge.tsx'
    - 'apps/wellness/frontend/app/page.tsx'
    - 'apps/wellness/frontend/app/promotions/page.tsx'
    - 'apps/wellness/frontend/app/search/page.tsx'
    - 'apps/wellness/frontend/app/services/[slug]/page.tsx'
    - 'apps/wellness/frontend/app/services/page.tsx'
    - 'apps/wellness/frontend/app/staff/[slug]/page.tsx'
    - 'apps/wellness/frontend/app/staff/page.tsx'
    - 'apps/wellness/frontend/components/ServiceCard.tsx'
    - 'apps/wellness/frontend/lib/seo/performance.js'
decisions:
  - id: 'D-0902-1'
    decision: 'Use opacity modifiers (bg-accent/10) for light tint backgrounds instead of separate light CSS variables where gradients are used'
    rationale: 'Keeps variable count manageable while maintaining flexibility'
  - id: 'D-0902-2'
    decision: 'Use unoptimized prop on next/image for all external Unsplash mock URLs'
    rationale: 'Mock data uses external URLs that would require remotePatterns config; unoptimized avoids unnecessary config for demo data'
  - id: 'D-0902-3'
    decision: "Replace Buffer.from().toString('base64') with encodeURIComponent for SVG data URIs"
    rationale: 'Buffer is Node.js global not recognized by ESLint browser config; encodeURIComponent is universally available and produces valid data URIs'
metrics:
  duration: '~9 minutes'
  completed: '2026-01-30'
---

# Phase 9 Plan 2: Tours Brand Colors + Wellness ESLint Summary

**Tours brand colors migrated to CSS variable-backed Tailwind tokens; Wellness ESLint warnings reduced from 20 to 0.**

## What Was Done

### Task 1: Tours Brand Color Migration (CFIX-02)

Migrated ~50 hardcoded brand-theming colors (amber, emerald, orange, red) to CSS variable-backed Tailwind tokens across 7 files.

**CSS Variables Added:**

- `--accent-light` (43 100% 92%) - light tint backgrounds
- `--accent-foreground` (43 80% 25%) - text on accent backgrounds
- `--success-foreground` (142 60% 30%) - dark green text
- `--error-foreground` (0 70% 35%) - dark red text
- `--warning` / `--warning-light` / `--warning-foreground` - complete warning semantic set

**Tailwind Config Extended:**

- `accent: { light, foreground }` added to existing DEFAULT/glow
- `success: { foreground }` added to existing DEFAULT/light
- `error: { foreground }` added to existing DEFAULT/light
- `warning: { DEFAULT, light, foreground }` new token group

**Color Mappings Applied:**
| Hardcoded | Token | Usage |
|-----------|-------|-------|
| `text-amber-400/500` | `text-accent` | Stars, ratings, active states |
| `bg-amber-100` | `bg-accent-light` | Light accent backgrounds |
| `text-amber-800` | `text-accent-foreground` | Text on accent backgrounds |
| `bg-emerald-500` | `bg-success` | Verified badges, online dots |
| `text-emerald-700` | `text-success-foreground` | Success text |
| `bg-red-500` | `bg-error` | Wishlist, urgency, discount badges |
| `from-amber-500 to-orange-500` | `from-accent to-primary` | Featured gradients, filter pills |
| `bg-amber-400` | `bg-accent` | Featured dots (compact cards) |

**Untouched (by design):**

- Neutral grays (gray-50 through gray-950)
- Category gradient decorative colors (blue-to-cyan, purple-to-pink, etc.)
- Payment provider colors

### Task 2: Wellness ESLint Warnings (CFIX-04)

Resolved all 20 ESLint warnings across 9 files:

| Warning Type                | Count | Fix                                                                             |
| --------------------------- | ----- | ------------------------------------------------------------------------------- |
| no-img-element              | 13    | Replaced `<img>` with `<Image>` from next/image (unoptimized for external URLs) |
| no-explicit-any             | 2     | Defined `WellnessService` interface in search/page.tsx                          |
| no-unescaped-entities       | 2     | Escaped quotes with `&quot;` in search results message                          |
| react-hooks/exhaustive-deps | 1     | Wrapped apiUrl in useMemo, added to useEffect deps                              |
| no-unused-vars              | 2     | Removed `_tab` useState (staff/[slug]), removed `ext` variable (performance.js) |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Buffer.from() not defined in ESLint context**

- **Found during:** Task 2 commit (pre-commit hook)
- **Issue:** `performance.js` used `Buffer.from(svg).toString('base64')` which ESLint flagged as `no-undef` since the file has no Node.js env declaration
- **Fix:** Replaced with `encodeURIComponent(svg)` for SVG data URIs, which is universally available
- **Files modified:** `apps/wellness/frontend/lib/seo/performance.js`
- **Commit:** 399441f

## Commits

| Hash    | Message                                                                        |
| ------- | ------------------------------------------------------------------------------ |
| 30850c1 | feat(09-02): migrate Tours brand colors to CSS variable-backed Tailwind tokens |
| 399441f | fix(09-02): resolve all 20 Wellness ESLint warnings                            |

## Verification Results

- Tours: `npx tsc --noEmit` -- pass
- Tours: `npx next build` -- pass
- Tours: zero hardcoded brand colors in Badge.tsx, TourCardV2.tsx, TourCards.tsx, BottomNav.tsx
- Wellness: `pnpm lint` -- zero warnings
- Wellness: `npx tsc --noEmit` -- pass
- Wellness: `npx next build` -- pass

## Next Phase Readiness

No blockers. The remaining CFIX items (CFIX-05 through CFIX-10) can proceed in subsequent plans.
