# Phase 3: Verification - Research

**Researched:** 2026-01-29
**Domain:** Next.js 14 build verification, route validation, monorepo (pnpm + Turborepo)
**Confidence:** HIGH

## Summary

This phase verifies that all 7 new vertical PWAs (pharmacy, workshops, gym, wellness, laundry, tours, accommodations) build successfully and have valid navigation. Research investigated the actual codebase structure: BottomNav components, app routes, build configs, internal links, and shared dependencies.

All 7 verticals are Next.js 14 apps in a pnpm monorepo with Turborepo orchestration. Five verticals (pharmacy, workshops, gym, laundry, wellness) depend on `@gudbro/menu-template` as a workspace dependency. Two verticals (tours, accommodations) are independently structured with different dependency patterns. The BottomNav implementations fall into two categories: **link-based** (pharmacy, workshops, gym, laundry, wellness) using Next.js `<Link>` with `href`, and **state-based** (tours, accommodations) using buttons with `onTabChange` callbacks (single-page app pattern). This distinction is critical for navigation verification strategy.

Pre-research route analysis already identified one confirmed broken link: wellness home page links to `/reviews` but no such route exists. Tours and accommodations have only 1-2 routes each (they are SPA-style with all content on the home page), so their BottomNav verification is about button functionality rather than route existence.

**Primary recommendation:** Build each vertical sequentially using `pnpm --filter <package-name> build`, fix TypeScript/build errors inline, then run static analysis scripts to validate BottomNav links against filesystem routes.

## Standard Stack

The established tools for this verification phase:

### Core

| Tool       | Version                                  | Purpose                                          | Why Standard                             |
| ---------- | ---------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| pnpm       | 10.0.0                                   | Package manager (workspace hoisting)             | Already configured in monorepo           |
| Turborepo  | (configured)                             | Build orchestration with `dependsOn: ["^build"]` | Already configured in turbo.json         |
| Next.js    | 14.2.33 (tours/accom) / ^14.0.0 (others) | Build command `next build`                       | Each vertical's build script             |
| TypeScript | ^5.0.0                                   | Type checking during build                       | Configured per-vertical with strict mode |

### Supporting

| Tool                 | Purpose                                                | When to Use                         |
| -------------------- | ------------------------------------------------------ | ----------------------------------- |
| `grep` / `Grep tool` | Extract href values from BottomNav and page components | Static route validation             |
| `find` / `Glob tool` | List `page.tsx` files under `app/` to enumerate routes | Route existence check               |
| Shell scripting      | Automate build + report generation                     | Orchestrating 7 builds sequentially |

### Build Commands Per Vertical

```bash
# Individual builds (preferred for sequential verification)
pnpm --filter @gudbro/pharmacy-frontend build
pnpm --filter @gudbro/workshops-frontend build
pnpm --filter @gudbro/gym-frontend build
pnpm --filter @gudbro/wellness-frontend build
pnpm --filter @gudbro/laundry-frontend build
pnpm --filter @gudbro/tours-frontend build
pnpm --filter @gudbro/accommodations-frontend build
```

**Note:** Package names are defined in each vertical's `package.json`. Tours uses `@gudbro/tours-frontend`, accommodations uses `@gudbro/accommodations-frontend`. The 5 menu-template verticals follow the pattern `@gudbro/<vertical>-frontend`.

## Architecture Patterns

### Vertical Structure (Two Categories)

**Category A: Menu-Template Verticals** (pharmacy, workshops, gym, laundry, wellness)

```
apps/<vertical>/frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home
│   ├── services|products|workshops|courses/
│   │   ├── page.tsx       # Listing
│   │   └── [slug]/page.tsx # Detail
│   ├── promotions/page.tsx
│   ├── search/page.tsx
│   └── layout.tsx
├── components/
│   └── BottomNav.tsx       # Link-based navigation
├── next.config.js          # CommonJS (module.exports)
├── tsconfig.json
└── package.json            # Depends on @gudbro/menu-template
```

**Category B: Standalone Verticals** (tours, accommodations)

```
apps/<vertical>/frontend/
├── app/
│   ├── page.tsx           # SPA-style home (all content here)
│   ├── layout.tsx
│   └── [limited routes]
├── components/
│   └── layout/BottomNav.tsx  # State-based navigation (buttons, not links)
├── next.config.js            # ESM (export default) for accommodations, CJS for tours
├── tsconfig.json
└── package.json              # Independent deps (no menu-template)
```

### Pattern 1: Link-Based BottomNav Verification

**What:** Pharmacy, workshops, gym, laundry, wellness use `<Link href="/path">` in BottomNav
**When:** All Category A verticals
**Verification approach:** Extract `href` values from `navItems` array in BottomNav.tsx, check each against `app/` filesystem

```typescript
// Pattern in BottomNav.tsx (Category A)
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Search', href: '/search', isCenter: true },
  { label: 'Offers', href: '/promotions' },
  { label: 'Info', href: '/info' },
];
```

**Note:** Center items sometimes use `href: '#'` with a `<button>` instead of `<Link>` (gym, laundry). These are NOT route links and should be skipped during route validation.

### Pattern 2: State-Based BottomNav Verification

**What:** Tours and accommodations use `onTabChange(tab)` callback pattern
**When:** Category B verticals
**Verification approach:** These verticals render all content in the home page based on state. No route validation needed for BottomNav -- verify that the BottomNav component renders without errors.

```typescript
// Pattern in BottomNav.tsx (Category B - tours)
interface BottomNavProps {
  activeTab: 'home' | 'map' | 'deals' | 'profile';
  onTabChange: (tab: 'home' | 'map' | 'deals' | 'profile') => void;
  onMenuClick?: () => void;
}
// Buttons, not Links -- no filesystem routes to validate
```

### Pattern 3: Internal Link Verification

**What:** Scan all `href="/path"` occurrences in page components
**Verification approach:** grep for `href="/` in all .tsx files, extract paths, check against filesystem

### Anti-Patterns to Avoid

- **Building all at once with `turbo build`:** This builds ALL packages including coffeeshop, backoffice, waiter, shared libs -- much slower and introduces noise. Build each vertical individually.
- **Treating state-based BottomNav as broken links:** Tours/accommodations intentionally use button-based navigation. Their `onTabChange` callbacks are not routes.
- **Treating `href="#"` as broken:** Center action buttons in gym and laundry BottomNav intentionally use `#` href with onClick handlers.

## Pre-Verification Route Analysis

Already-identified findings from codebase investigation:

### BottomNav Links vs Routes (Category A)

| Vertical  | BottomNav Links                                          | Routes Exist | Status           |
| --------- | -------------------------------------------------------- | ------------ | ---------------- |
| Pharmacy  | `/`, `/products`, `/search`, `/promotions`, `/info`      | All present  | PASS (predicted) |
| Workshops | `/`, `/workshops`, `/search`, `/promotions`, `/about`    | All present  | PASS (predicted) |
| Gym       | `/`, `/courses`, `#` (button), `/shop`, `/account`       | All present  | PASS (predicted) |
| Laundry   | `/`, `/services`, `#` (button), `/promotions`, `/search` | All present  | PASS (predicted) |
| Wellness  | `/`, `/services`, `/packages`, `/promotions`, `/search`  | All present  | PASS (predicted) |

### BottomNav (Category B - state-based, no route links)

| Vertical       | Pattern             | Status |
| -------------- | ------------------- | ------ | ------- | -------------------------- | ----------- |
| Tours          | `onTabChange('home' | 'map'  | 'deals' | 'profile')`                | N/A (state) |
| Accommodations | `onTabChange('home' | 'map'  | 'deals' | 'profile')`+`onMenuToggle` | N/A (state) |

### Known Broken Internal Links (Pre-identified)

| Vertical | File                                     | Link              | Issue                      |
| -------- | ---------------------------------------- | ----------------- | -------------------------- |
| Wellness | `app/page.tsx:699`                       | `href="/reviews"` | No `/reviews` route exists |
| Tours    | `components/booking/BookingForm.tsx:455` | `href="/terms"`   | No `/terms` route exists   |

### Internal Links Requiring Validation (Gym - well-connected)

Gym has many internal links across pages: `/passes`, `/courses`, `/shop`, `/info`, `/promotions`, `/account`, `/courses` (from detail pages). All corresponding routes exist in the filesystem. This is the most link-rich vertical and a good test case.

## Don't Hand-Roll

| Problem             | Don't Build                               | Use Instead                                              | Why                                            |
| ------------------- | ----------------------------------------- | -------------------------------------------------------- | ---------------------------------------------- |
| Route enumeration   | Manual listing of routes                  | `find app/ -name "page.tsx"` to auto-discover all routes | Complete, no human error                       |
| Link extraction     | Manual reading of components              | `grep -rn 'href="/' *.tsx` to extract all links          | Catches links in all files, not just BottomNav |
| Build per vertical  | Running `next build` directly in each dir | `pnpm --filter <name> build` from root                   | Handles workspace dependencies correctly       |
| Build error parsing | Reading terminal output manually          | Capture build exit code ($?) per vertical                | Automated pass/fail                            |

**Key insight:** The verification process is inherently scriptable. Every check (build status, route existence, link validity) can be expressed as a shell command with a binary pass/fail outcome.

## Common Pitfalls

### Pitfall 1: Running `next build` in Wrong Directory

**What goes wrong:** Running `cd apps/pharmacy/frontend && next build` instead of using pnpm filter
**Why it happens:** Direct invocation misses workspace dependency resolution (e.g., @gudbro/menu-template)
**How to avoid:** Always use `pnpm --filter @gudbro/<vertical>-frontend build` from monorepo root
**Warning signs:** "Module not found: @gudbro/menu-template"

### Pitfall 2: Mixing Up CJS and ESM Config

**What goes wrong:** accommodations uses `export default` in next.config.js (ESM), others use `module.exports` (CJS)
**Why it happens:** Different verticals were scaffolded at different times
**How to avoid:** Don't normalize configs during verification -- just note differences. Both are valid.
**Warning signs:** "SyntaxError: Unexpected token 'export'" if package.json lacks `"type": "module"`

### Pitfall 3: Treating State-Based Nav as Broken

**What goes wrong:** Flagging tours/accommodations BottomNav as "missing routes" because buttons don't have href paths
**Why it happens:** Not recognizing the SPA pattern vs multi-page pattern
**How to avoid:** Check BottomNav category before applying route validation
**Warning signs:** Tours/accommodations having only 1-2 page.tsx files is EXPECTED

### Pitfall 4: Missing Shared Dependency Builds

**What goes wrong:** @gudbro/menu-template must build before verticals that depend on it
**Why it happens:** Turborepo handles this automatically with `dependsOn: ["^build"]`, but manual builds might skip it
**How to avoid:** Always use pnpm filter (which triggers turbo dependency chain) or build menu-template first
**Warning signs:** "Cannot find module '@gudbro/menu-template'"

### Pitfall 5: Confusing `href="#"` Center Buttons with Broken Links

**What goes wrong:** Reporting gym and laundry center buttons as broken navigation
**Why it happens:** BottomNav center items use `href="#"` with `onClick` handlers (buttons styled as nav items)
**How to avoid:** Skip `href="#"` during route validation -- it's a button action, not a navigation link
**Warning signs:** `isCenter: true` property on navItem

### Pitfall 6: next.config.js `images.domains` Deprecation Warning

**What goes wrong:** Build succeeds but warns about deprecated `images.domains` config
**Why it happens:** Next.js 14 prefers `images.remotePatterns` over `images.domains`
**How to avoid:** Log as warning, do NOT fix during verification (non-blocking per phase decisions)
**Warning signs:** "images.domains is deprecated" in build output

## Code Examples

### Build One Vertical and Capture Result

```bash
# From monorepo root
pnpm --filter @gudbro/pharmacy-frontend build 2>&1
BUILD_EXIT=$?
if [ $BUILD_EXIT -eq 0 ]; then
  echo "PASS: pharmacy"
else
  echo "FAIL: pharmacy (exit code: $BUILD_EXIT)"
fi
```

### Extract BottomNav Links (Category A)

```bash
# Extract href values from navItems in a BottomNav file
grep -oP "href:\s*'([^']+)'" apps/pharmacy/frontend/components/BottomNav.tsx | \
  grep -oP "'[^']+'" | tr -d "'"
# Output: /, /products, /search, /promotions, /info
```

### Enumerate Routes from Filesystem

```bash
# List all routes for a vertical
find apps/pharmacy/frontend/app -name "page.tsx" | \
  sed 's|apps/pharmacy/frontend/app||' | \
  sed 's|/page.tsx||' | \
  sed 's|^$|/|'
# Output: /, /info, /products, /products/[slug], /promotions, /search
```

### Compare Links vs Routes

```bash
# For each BottomNav href, check if a matching route exists
VERTICAL="pharmacy"
APP_DIR="apps/${VERTICAL}/frontend/app"
LINKS=$(grep -oP "href:\s*'(/[^'#]*)" "apps/${VERTICAL}/frontend/components/BottomNav.tsx" | grep -oP "'/[^']*" | tr -d "'")
for link in $LINKS; do
  # Convert /products to /products/page.tsx check
  if [ "$link" = "/" ]; then
    [ -f "${APP_DIR}/page.tsx" ] && echo "OK: $link" || echo "BROKEN: $link"
  else
    DIR="${APP_DIR}${link}"
    [ -f "${DIR}/page.tsx" ] && echo "OK: $link" || echo "BROKEN: $link"
  fi
done
```

## Vertical-Specific Build Configuration

| Vertical       | Package Name                    | Port | Config Format | Has menu-template | Has @shared           | Special                               |
| -------------- | ------------------------------- | ---- | ------------- | ----------------- | --------------------- | ------------------------------------- |
| Pharmacy       | @gudbro/pharmacy-frontend       | 3031 | CJS           | Yes               | No                    | -                                     |
| Workshops      | @gudbro/workshops-frontend      | 3032 | CJS           | Yes               | No                    | -                                     |
| Gym            | @gudbro/gym-frontend            | 3033 | CJS           | Yes               | No                    | Center btn is button                  |
| Laundry        | @gudbro/laundry-frontend        | 3030 | CJS           | Yes               | No                    | Center btn is button, localStorage    |
| Wellness       | @gudbro/wellness-frontend       | 3003 | CJS           | Yes               | No                    | Broken `/reviews` link                |
| Tours          | @gudbro/tours-frontend          | 3026 | CJS           | No                | Yes (@shared/payment) | SPA, transpilePackages, webpack alias |
| Accommodations | @gudbro/accommodations-frontend | 3028 | ESM           | No                | No                    | SPA, unoptimized images               |

## Recommended Verification Order

1. **Pharmacy** -- simplest menu-template vertical, good first build test
2. **Workshops** -- similar to pharmacy, validates pattern
3. **Laundry** -- adds localStorage pattern in BottomNav
4. **Wellness** -- known broken link, validates link checking works
5. **Gym** -- most internal links, good stress test for link validation
6. **Tours** -- different architecture (standalone, @shared dep, webpack alias)
7. **Accommodations** -- ESM config, minimal routes, SPA pattern

Rationale: Start with simplest (Category A), move to complex (Category A with issues), end with Category B (different patterns). If menu-template fails to build, it blocks 5 verticals -- catch this first.

## Open Questions

1. **pnpm install state**
   - What we know: Root node_modules exists, accommodations has local node_modules. Other verticals lack local node_modules.
   - What's unclear: Whether `pnpm install` needs to be run before builds (pnpm workspace should handle via hoisting)
   - Recommendation: Run `pnpm install` at root as first step of verification to ensure all deps are resolved

2. **Tours @shared/payment dependency**
   - What we know: Tours next.config.js has `transpilePackages: ['@shared/payment']` and webpack alias for `@shared`
   - What's unclear: Whether `shared/payment` builds correctly and provides needed exports
   - Recommendation: If tours build fails on this, it may need a pre-build of shared/payment or the transpile config may need updating

3. **Accommodations ESM config**
   - What we know: Uses `export default` in next.config.js while all others use `module.exports`
   - What's unclear: Whether the package.json has `"type": "module"` or if Next.js handles this automatically
   - Recommendation: If ESM config causes issues, this is a simple fix (convert to CJS or add type field)

## Sources

### Primary (HIGH confidence)

- Codebase analysis: All 7 vertical `package.json`, `next.config.js`, `tsconfig.json` files read directly
- Codebase analysis: All 7 BottomNav components read and categorized
- Codebase analysis: All `app/` route structures enumerated via filesystem listing
- Codebase analysis: Internal links extracted via grep on all .tsx files

### Secondary (MEDIUM confidence)

- Build command inference from turbo.json pipeline config and pnpm workspace setup
- Route validation approach based on Next.js App Router conventions (page.tsx = route)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - all tools are already in the monorepo, no new dependencies
- Architecture: HIGH - codebase directly inspected, two patterns clearly identified
- Pitfalls: HIGH - derived from actual codebase inconsistencies found during research
- Pre-identified issues: HIGH - `/reviews` and `/terms` broken links confirmed via filesystem check

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (stable -- no external dependencies or fast-moving APIs)
