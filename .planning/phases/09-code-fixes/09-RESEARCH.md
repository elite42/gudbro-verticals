# Phase 9 Research: Code Fixes

**Researched:** 2026-01-30
**Method:** Direct codebase investigation (tsc, lint, grep)
**Confidence:** HIGH -- all findings verified against actual codebase state

---

## CFIX-01: Tours TypeScript Compilation

### Current State

**FINDING: tsc already passes cleanly.**

```bash
cd apps/tours/frontend && npx tsc --noEmit
# Exit code: 0 (no errors)
```

The Tours `tsconfig.json` excludes only `node_modules` -- there is no "soups DB type exclusion" present. Either:

1. This was already fixed in a prior session, or
2. The issue description references a state that no longer exists

The `tsconfig.json` includes `../../../shared/payment/**/*.ts` in its include array, which compiles cleanly.

### Files

- `apps/tours/frontend/tsconfig.json` -- current exclude is only `["node_modules"]`

### Work Required

**Possibly zero.** Verify that this was the intent. If the success criterion is "Tours compiles with `tsc --noEmit` without the soups DB type exclusion in tsconfig" -- this is already satisfied since the exclusion does not exist and tsc passes.

### Risk

- LOW. May just need verification, not implementation.

---

## CFIX-02: Tours Brand Colors (CSS Variables vs Hardcoded Tailwind)

### Current State

Tours has a well-structured CSS variable system in `apps/tours/frontend/styles/globals.css` with full theming:

- Primary: Burnt Orange (`--primary: 24 90% 50%`)
- Secondary: Forest Green (`--secondary: 122 38% 28%`)
- Accent: Golden Sun (`--accent: 43 100% 50%`)
- Background, foreground, semantic colors all defined

The `tailwind.config.ts` correctly maps these CSS variables to Tailwind tokens (`primary`, `secondary`, `accent`, `background`, `foreground`, etc.).

**HOWEVER: Massive use of hardcoded Tailwind color values across the codebase.** 260+ instances of hardcoded colors found.

### Categorization of Hardcoded Colors

**1. Neutral grays (gray-50 through gray-950) -- ~180 instances**
These are used for:

- Skeleton/loading states: `bg-gray-200 animate-pulse` (very common pattern)
- Inactive/muted UI: `text-gray-400`, `text-gray-500`, `text-gray-700`
- Borders: `border-gray-100`, `border-gray-200`
- Backgrounds: `bg-gray-50`, `bg-gray-100`
- Dark mode variants: `bg-gray-800`, `bg-gray-900`, `text-gray-300`

Files most affected:

- `app/page.tsx` (~60 instances) -- main homepage with dark mode support
- `components/tours/TourCards.tsx` (~50 instances)
- `components/tours/TourCardV2.tsx` (~25 instances)
- `components/tours/TourCardCompact.tsx` (~20 instances)
- `components/tours/TourCardMini.tsx` (~15 instances)
- `components/tours/TourCardTall.tsx` (~15 instances)
- `components/layout/BottomNav.tsx` (~15 instances)
- `components/layout/Header.tsx` (~10 instances)
- `components/search/SearchBar.tsx` (~10 instances)
- `components/booking/BookingForm.tsx` (~5 instances)
- `components/dashboard/OperatorDashboard.tsx` (~10 instances)

**2. Brand-relevant colors (amber, orange, emerald) -- ~50 instances**
These are the ACTUAL brand theming issue:

- `text-amber-400`, `text-amber-500`, `bg-amber-100`, `text-amber-800` -- used for ratings, active nav, accent highlights
- `from-amber-500 to-orange-500` -- gradient for featured badges, CTAs
- `bg-emerald-500`, `text-emerald-700`, `bg-emerald-100` -- used for verified badges, online indicators
- `from-red-500`, `bg-red-500` -- deals, favorites, errors

Files with brand-color hardcoding:

- `app/page.tsx` -- amber for active states, navigation, ratings
- `components/layout/BottomNav.tsx` -- amber for active tab
- `components/tours/TourCardV2.tsx` -- amber ratings, green availability
- `components/tours/TourCards.tsx` -- amber ratings, red favorites
- `components/ui/Badge.tsx` -- amber, emerald, orange, red badge variants
- `styles/globals.css` -- `.badge-accent`, `.badge-verified`, `.star-filled`, `.star-empty`
- `components/payment/PaymentSelector.tsx` -- emerald, blue, indigo, orange for payment methods
- `components/payment/PaymentForm.tsx` -- blue for Stripe, pink for MoMo, etc.

**3. Decorative/category colors (multi-color gradients) -- ~15 instances**

- Category filter pills in `app/page.tsx` use unique gradients per category (`from-blue-500 to-cyan-500`, `from-purple-500 to-pink-500`, etc.)
- These are intentionally varied by category and may not need CSS variable treatment

### Recommended Approach

**Scope the fix to BRAND theming colors only**, not neutral grays:

1. **Add CSS variables** for missing tokens in `globals.css`:
   - `--accent-muted` / `--accent-light` for amber-100/amber-400 patterns
   - `--success` already exists but isn't used consistently
   - `--error` already exists but isn't used consistently

2. **Update Tailwind config** to expose these as utility classes

3. **Replace brand colors** in components:
   - `text-amber-*` -> `text-accent` (ratings, active states)
   - `bg-emerald-*` -> `text-success` / `bg-success-light` (verified badges)
   - `bg-red-*` -> `text-error` / `bg-error-light` (deals, error states)

4. **Leave neutral grays alone** -- these are standard Tailwind utilities and are theme-agnostic. Converting all `gray-*` to CSS variables would be over-engineering for no benefit.

5. **Leave payment method colors alone** -- Stripe blue, MoMo pink, etc. are brand-specific to the payment provider, not the app theme.

6. **Leave category gradient colors alone** -- these are decorative, per-category, and not themeable.

### Work Estimate

- **MEDIUM complexity** -- ~15-20 files need changes, but most changes are mechanical find-replace
- Biggest risk: the `app/page.tsx` homepage has extensive dark mode logic with hardcoded colors

---

## CFIX-03: Wellness /staff/[slug] Back Link

### Current State

The page at `apps/wellness/frontend/app/staff/[slug]/page.tsx` (519 lines) **already has a back button**:

```tsx
// Line 270-285: Fixed header overlay with icon-only back button
<Link
  href="/staff"
  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm"
>
  <svg ... d="M15.75 19.5L8.25 12l7.5-7.5" /> {/* chevron-left */}
</Link>
```

This is an icon-only circular button overlaid on the hero image. It navigates to `/staff` correctly.

### Existing Pattern in Other Pages

The `services/[slug]/page.tsx` uses the **identical pattern** -- a circular icon-only back button in a fixed header overlay. This is the established Wellness UI pattern for detail pages.

### What the Requirement Asks

"Visible back link that navigates to the staff list" -- the current back button IS functional and visible, but it is:

- Icon-only (no text label)
- Semi-transparent overlay on the hero image
- Could be missed if the hero image is light-colored

### Recommended Fix

Add a **text back link** below the hero section (near the profile info area), matching the pattern used in the "not found" state which already has a "Browse Team" link. Something like:

```
< Back to Team
```

This would be a small addition (~3-5 lines) near line 313.

### Files to Change

- `apps/wellness/frontend/app/staff/[slug]/page.tsx` -- add text back link

### Work Estimate

- **LOW complexity** -- 5 minutes, single file change

---

## CFIX-04: Wellness ESLint Warnings

### Current State

Running `pnpm lint` (via `next lint`) on Wellness produces **20 warnings** across 8 files:

| File                           | Count | Warning Types                                                                                                   |
| ------------------------------ | ----- | --------------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`                 | 2     | `no-img-element` (x2)                                                                                           |
| `app/promotions/page.tsx`      | 2     | `no-img-element` (x2)                                                                                           |
| `app/search/page.tsx`          | 6     | `no-explicit-any` (x2), `react-hooks/exhaustive-deps` (x1), `no-unescaped-entities` (x2), `no-img-element` (x1) |
| `app/services/[slug]/page.tsx` | 3     | `no-img-element` (x3)                                                                                           |
| `app/services/page.tsx`        | 1     | `no-img-element` (x1)                                                                                           |
| `app/staff/[slug]/page.tsx`    | 2     | `no-unused-vars` (x1), `no-img-element` (x1)                                                                    |
| `app/staff/page.tsx`           | 1     | `no-img-element` (x1)                                                                                           |
| `components/ServiceCard.tsx`   | 2     | `no-img-element` (x2)                                                                                           |
| `lib/seo/performance.js`       | 1     | `no-unused-vars` (x1)                                                                                           |

### Warning Breakdown by Type

| Rule                                 | Count | Fix Strategy                                                         |
| ------------------------------------ | ----- | -------------------------------------------------------------------- |
| `@next/next/no-img-element`          | 13    | Replace `<img>` with `next/image` `<Image>` component                |
| `@typescript-eslint/no-explicit-any` | 2     | Add proper types in `app/search/page.tsx`                            |
| `react/no-unescaped-entities`        | 2     | Escape `"` characters in `app/search/page.tsx`                       |
| `react-hooks/exhaustive-deps`        | 1     | Add `apiUrl` to deps array in `app/search/page.tsx`                  |
| `@typescript-eslint/no-unused-vars`  | 2     | Remove unused `_tab` in staff/[slug], unused `ext` in performance.js |

### Detailed Fix Plan

**1. `<img>` to `<Image>` (13 warnings, 7 files)**
All use external URLs (Unsplash). Need to:

- Import `Image` from `next/image`
- Add `width`/`height` or use `fill` prop
- Add `unoptimized` for external URLs or configure `images.remotePatterns` in `next.config.js`
- These are mock data images, so `unoptimized` is the pragmatic choice

**2. `app/search/page.tsx` (5 warnings)**

- Line 8-9: Replace `any` types with proper interfaces
- Line 25: Add `apiUrl` to useEffect dependency array (or wrap in useCallback)
- Line 102: Escape `"` with `&quot;` or use backticks

**3. Unused vars (2 warnings)**

- `app/staff/[slug]/page.tsx` line 239: `_tab` -- remove useState entirely (tab state not used)
- `lib/seo/performance.js` line 71: `ext` -- remove or use the variable

### Work Estimate

- **MEDIUM complexity** -- 8 files to touch, most changes are mechanical but the `<img>` to `<Image>` migration requires care with external URLs and layout

---

## CFIX-05: Placeholder Links (href="#")

### Current State

**3 instances found** (matches expected count):

**1. Tours -- `components/booking/BookingForm.tsx` line 505**

```tsx
<a href="#" className="text-primary hover:underline">
  {/* TODO: add /terms route */}
  Terms of Service
</a>
```

Context: "By booking, you agree to our Terms of Service" text at bottom of booking form.

**2. Workshops -- `app/about/page.tsx` line 391**

```tsx
<Link href="#" style={{ ... background: 'var(--terracotta)', ... }}>
  Join Our Network
</Link>
```

Context: CTA button in "For Local Artisans & Guides" partnership section.

**3. Workshops -- `app/about/page.tsx` line 460**

```tsx
<Link href="#" style={{ ... }}>
  Partner With Us
</Link>
```

Context: CTA button in "For Hotels & Accommodations" partnership section.

### Recommended Fix Strategy

| Instance                     | Recommended Action                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Tours Terms of Service       | Link to `/terms` or use a modal. Since no `/terms` route exists, either create a simple placeholder page or link to WhatsApp/contact. |
| Workshops "Join Our Network" | Link to WhatsApp contact (`https://wa.me/...`) or `/contact` page                                                                     |
| Workshops "Partner With Us"  | Link to WhatsApp contact or `/contact` page                                                                                           |

For all three: the simplest approach is to link to the merchant's WhatsApp or a contact page, since these are CTA buttons for partnership/legal that don't have dedicated routes.

### Files to Change

- `apps/tours/frontend/components/booking/BookingForm.tsx` (line 505)
- `apps/workshops/frontend/app/about/page.tsx` (lines 391, 460)

### Work Estimate

- **LOW complexity** -- 2 files, 3 line changes

---

## Summary for Planner

| CFIX    | Status                                                        | Effort               | Files  | Risk                            |
| ------- | ------------------------------------------------------------- | -------------------- | ------ | ------------------------------- |
| CFIX-01 | Already passing (tsc exits 0, no soups exclusion in tsconfig) | Zero/Verify only     | 0      | None                            |
| CFIX-02 | ~50 brand-color instances need CSS variable migration         | Medium (15-20 files) | ~15-20 | Dark mode page.tsx is complex   |
| CFIX-03 | Back button exists but is icon-only; need text link           | Low (1 file)         | 1      | None                            |
| CFIX-04 | 20 lint warnings across 8 files                               | Medium (8 files)     | 8      | img->Image migration needs care |
| CFIX-05 | 3 placeholder links found exactly as expected                 | Low (2 files)        | 2      | Need to decide link targets     |

### Recommended Grouping for Plans

**Plan 1: Quick Fixes (CFIX-01, CFIX-03, CFIX-05)** -- ~30 min

- Verify CFIX-01 (already done)
- Add text back link in Wellness staff page
- Replace 3 href="#" placeholders

**Plan 2: Larger Fixes (CFIX-02, CFIX-04)** -- ~2-3 hours

- Migrate Tours brand colors to CSS variables
- Fix all 20 Wellness lint warnings

### Key Risks

1. **CFIX-02 scope creep** -- The requirement says "zero hardcoded Tailwind color values for brand theming." Need to clearly define what counts as "brand theming" vs. neutral/decorative colors. Recommendation: only amber/emerald/orange/red brand colors, NOT gray-\* neutrals.
2. **CFIX-04 img migration** -- External Unsplash URLs need either `unoptimized` prop or `next.config.js` remote patterns config. Since these are mock data, `unoptimized` is pragmatic.
3. **CFIX-01 may be a no-op** -- If tsc already passes, this task is just verification.
