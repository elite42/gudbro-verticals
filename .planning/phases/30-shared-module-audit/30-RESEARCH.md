# Phase 30: Shared Module Audit - Research

**Researched:** 2026-02-01
**Domain:** Codebase audit / module inventory (no external libraries needed)
**Confidence:** HIGH

## Summary

This phase produces a catalog document, not code. The research investigated the actual codebase structure to map every shared module, identify duplicated patterns across verticals, and understand what phases 31-39 need from shared infrastructure.

The codebase has 8 workspace packages under `shared/` (components, config, core, database, menu-template, payment, types, utils) plus 2 non-package directories (seo, ui). Additionally, significant reusable logic lives inside `apps/backoffice/lib/` (QR generation, AI pipeline, feedback, auth, notifications, tenancy, i18n) and is duplicated across 5+ vertical PWAs (currency conversion, price formatting, SEO utilities, Supabase client setup).

**Primary recommendation:** The audit plan should systematically scan each shared package AND each app's lib/hooks/config directories, classify every module using the three-tier system (ready/needs-adaptation/to-build), and produce a phase dependency matrix showing which of phases 31-39 depends on which modules.

## Standard Stack

This phase requires no libraries. The deliverable is a single markdown file.

### Tools Used During Audit

| Tool           | Purpose                               | Why                                           |
| -------------- | ------------------------------------- | --------------------------------------------- |
| Glob/Grep      | Find modules and imports              | Identify which apps use which shared packages |
| Read           | Inspect module interfaces and exports | Determine readiness status                    |
| Bash (wc/diff) | Compare duplicated files              | Quantify duplication and divergence           |

## Architecture Patterns

### Catalog File Structure

The deliverable goes to: `.planning/phases/30-shared-module-audit/SHARED-MODULE-CATALOG.md`

Recommended internal structure based on CONTEXT.md decisions:

```markdown
# Shared Module Catalog

## Quick Reference Matrix (Phase Dependencies)

[Table mapping phases 31-39 to required modules]

## Priority Ranking

[Modules ranked by how many phases depend on them]

## Functional Area: UI Components

### Module: @gudbro/ui

[status, location, consumers, phase needs, import examples]

## Functional Area: Data & Infrastructure

### Module: @gudbro/config

[...]

## Functional Area: Business Logic

### Module: Currency Conversion (DUPLICATED)

[...]

## Duplicated Patterns

[Code that exists in 2+ apps and should be consolidated]
```

### Pattern: Module Entry Format

Each module entry should follow this template for consistency:

```markdown
### [Module Name]

- **Location:** `shared/[package]/` or `apps/[app]/lib/[file]`
- **Package:** `@gudbro/[name]` (or "not packaged")
- **Status:** Ready | Needs Adaptation | To-Build
- **Used by:** [list of apps that import it]
- **Import path:** `import { X } from '@gudbro/[name]'`
- **Phases 31-39 need:** [specific usage in upcoming phases]
- **Adaptation needed:** [only for "needs adaptation" - specific changes]
- **LOC:** [approximate line count]
```

### Pattern: Phase Dependency Matrix Format

Use a table for scannability:

```markdown
| Phase | Modules Needed                                    | Critical?      |
| ----- | ------------------------------------------------- | -------------- |
| 31    | QR Builder (extract from backoffice), Image Utils | Yes - blockers |
| 32    | None (owner dashboard is app-specific)            | No             |
| ...   | ...                                               | ...            |
```

## Don't Hand-Roll

| Problem               | Don't Build                             | Use Instead                                                 | Why                                         |
| --------------------- | --------------------------------------- | ----------------------------------------------------------- | ------------------------------------------- |
| Module discovery      | Manual file-by-file reading             | Glob + Grep patterns to find imports/exports systematically | Misses hidden dependencies                  |
| Duplication detection | Reading and comparing files manually    | `diff` commands + `wc -l` for quantitative comparison       | Need evidence of divergence, not assumption |
| Phase mapping         | Guessing which modules each phase needs | Read the ROADMAP.md phase descriptions + plan summaries     | Each phase has explicit requirements listed |

## Common Pitfalls

### Pitfall 1: Missing Backoffice-Embedded Shared Logic

**What goes wrong:** Auditing only `shared/` and missing that critical reusable modules live inside `apps/backoffice/lib/` (QR generation, AI feedback pipeline, notifications, auth patterns).
**Why it happens:** The backoffice is the oldest, most feature-rich app and accumulated logic that should be shared.
**How to avoid:** Explicitly audit `apps/backoffice/lib/` as a source of extractable modules.
**Warning signs:** If the catalog has no entries from backoffice, the audit is incomplete.

Key backoffice modules to audit:

- `apps/backoffice/lib/qr/` - QR code generation (Phase 31 needs extraction)
- `apps/backoffice/lib/ai/feedback-intelligence-service.ts` - AI feedback pipeline (Phase 35 needs fork)
- `apps/backoffice/lib/ai/conventions-service.ts` - Conventions system (Phase 37 needs adaptation)
- `apps/backoffice/lib/notifications/` - Push/email notifications (multiple phases)
- `apps/backoffice/lib/auth/` - Auth patterns including TOTP (referenced by accommodation auth)
- `apps/backoffice/lib/security/` - Rate limiter, credentials encryption
- `apps/backoffice/lib/i18n/` - Internationalization config
- `apps/backoffice/lib/tenancy/` - Multi-tenant context

### Pitfall 2: Treating Diverged Duplicates as Identical

**What goes wrong:** Marking duplicated files (e.g., currency-converter.ts) as "ready to consolidate" when they have actually diverged significantly.
**Why it happens:** Files were copy-pasted and then evolved independently per vertical.
**How to avoid:** Run `diff` between duplicated files and document actual divergence. The coffeeshop version (314 LOC) is much richer than workshops (72 LOC).
**Warning signs:** Line count differences of >50% between "identical" files.

Verified divergence data:

- `currency-converter.ts`: coffeeshop=314 LOC, laundry=218, gym=159, pharmacy=151, workshops=72
- `currency-preferences.ts`: duplicated across 5 apps
- `usePriceFormat.ts`: 5 copies, coffeeshop has detailed comments stripped in copies
- `lib/seo/`: 6+ copies across verticals (rentals, wellness, laundry, pharmacy, workshops, gym)

### Pitfall 3: Ignoring the shared/core Module System

**What goes wrong:** Treating `shared/core/` as just another package when it has a sophisticated module registry system (WiFi, PriceList, Contacts, Attractions, Transport, Services, HouseRules, CheckInOut, Deals) specifically designed for accommodations.
**Why it happens:** The core modules were built during v1.1-v1.4 phases and are already the primary building blocks.
**How to avoid:** Audit `shared/core/modules/types.ts` (327 LOC) thoroughly - it defines 9 module types with full TypeScript interfaces. Several phases 33-38 will consume these directly.

### Pitfall 4: Not Mapping shared/menu-template vs shared/core Overlap

**What goes wrong:** Both `@gudbro/menu-template` and `@gudbro/core` define vertical config types, business info, contact info, and UI config - but for different purposes.
**Why it happens:** menu-template was built for F&B verticals first, core was built for accommodations.
**How to avoid:** Document both, clarify which one each phase should use, and flag the overlap for future consolidation.

### Pitfall 5: Overlooking the @shared/payment Naming Inconsistency

**What goes wrong:** The payment package uses `@shared/payment` while all other packages use `@gudbro/*` naming convention.
**Why it happens:** Payment was added later with a different naming convention.
**How to avoid:** Document this inconsistency; flag for eventual rename to `@gudbro/payment`.

## Code Examples

### How to Systematically Find Module Consumers

```bash
# Find which apps import from a shared package
grep -r "@gudbro/ui" apps/ --include="*.ts" --include="*.tsx" -l

# Find which apps have their own currency-converter
find apps/ -name "currency-converter.ts" -type f

# Compare divergence between duplicated files
diff apps/coffeeshop/frontend/lib/currency-converter.ts \
     apps/gym/frontend/lib/currency-converter.ts | head -30

# Count LOC for a module
wc -l shared/core/modules/types.ts
```

### How to Check Package Exports

```bash
# For each shared package, read its index.ts to see public API
cat shared/ui/index.ts
cat shared/utils/index.ts
cat shared/core/index.ts
```

## Inventory of Modules Discovered

### Workspace Packages (shared/)

| Package              | Name                  | LOC (est.) | Has Tests | Key Exports                                                                       |
| -------------------- | --------------------- | ---------- | --------- | --------------------------------------------------------------------------------- |
| shared/ui            | @gudbro/ui            | ~500       | No        | Button, Card, Dialog, Toast, Tooltip, Badge, Avatar, Skeleton, Spinner, cn()      |
| shared/components    | @gudbro/components    | ~400       | No        | ProductCard variants (Hero, Tall, Standard, Compact, Mini, Bottle) + Skeletons    |
| shared/config        | @gudbro/config        | ~200       | No        | env validation (Zod), constants (POINTS, SUBSCRIPTION, BADGES, API, DB, FEATURES) |
| shared/types         | @gudbro/types         | ~220       | No        | Supabase generated types, custom types (API, Auth, Points, Badge, Menu, etc.)     |
| shared/utils         | @gudbro/utils         | ~250       | Yes       | AppError hierarchy, logger, Result type, API response helpers                     |
| shared/database      | @gudbro/database      | large      | No        | Migrations (76+), seed data, types, safety filters                                |
| shared/payment       | @shared/payment       | ~220       | No        | PaymentMethod types, formatPrice, convertCurrency, SUPPORTED_CURRENCIES           |
| shared/core          | (not packaged)        | ~600+      | No        | TranslationEngine, 9 module types (WiFi, PriceList, etc.), template configs       |
| shared/menu-template | @gudbro/menu-template | ~350       | No        | Header, Footer, BottomNav, BaseItem, VerticalConfig, Category types               |
| shared/seo           | (not packaged)        | ~300       | No        | meta-tags, schema-org, robots, sitemap, performance                               |

### Duplicated Patterns Across Apps

| Pattern                    | Apps With Copy                                                     | Divergence Level                              |
| -------------------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| currency-converter.ts      | coffeeshop, gym, laundry, pharmacy, workshops (5)                  | HIGH - coffeeshop 314 LOC vs workshops 72 LOC |
| currency-preferences.ts    | coffeeshop, gym, laundry, pharmacy, workshops (5)                  | MEDIUM                                        |
| usePriceFormat.ts (hook)   | coffeeshop, gym, laundry, pharmacy, workshops (5)                  | MEDIUM - coffeeshop has richer docs           |
| lib/seo/ (directory)       | rentals, wellness, laundry, pharmacy, workshops, gym (6)           | LOW - mostly copied from shared/seo           |
| supabase.ts (client setup) | coffeeshop, accommodations, waiter, backoffice (4 unique patterns) | HIGH - backoffice has 5 variants              |
| Vertical config pattern    | coffeeshop, gym, laundry, pharmacy, wellness, workshops (6)        | MEDIUM - same structure, different data       |

### Backoffice Extractable Modules

| Module                  | Location                                                | Reuse Potential                               | Needed By Phase    |
| ----------------------- | ------------------------------------------------------- | --------------------------------------------- | ------------------ |
| QR Generator            | apps/backoffice/lib/qr/                                 | HIGH - Phase 31 extracts this                 | 31, 33             |
| AI Feedback Pipeline    | apps/backoffice/lib/ai/feedback-intelligence-service.ts | MEDIUM - needs fork for accommodations        | 35                 |
| Conventions Service     | apps/backoffice/lib/ai/conventions-service.ts           | MEDIUM - needs benefit_scope adaptation       | 37                 |
| Notification Dispatcher | apps/backoffice/lib/notifications/                      | HIGH - multi-phase usage                      | 31, 34, 35, 38     |
| Auth System             | apps/backoffice/lib/auth/                               | LOW - backoffice-specific (TOTP, permissions) | -                  |
| Tenancy Context         | apps/backoffice/lib/tenancy/                            | LOW - backoffice-specific                     | -                  |
| I18n System             | apps/backoffice/lib/i18n/                               | MEDIUM - pattern could be shared              | 36                 |
| Rate Limiter            | apps/backoffice/lib/security/rate-limiter.ts            | HIGH - reusable utility                       | 31                 |
| Image Utils             | apps/accommodations/frontend/lib/image-utils.ts         | HIGH - HEIC/compression pipeline              | 31, 32             |
| WiFi Utils              | apps/accommodations/frontend/lib/wifi-utils.ts          | MEDIUM - accommodations-specific              | 31 (QR extraction) |

### Phase Dependencies on Shared Modules

| Phase                   | Required Modules                                                                  | Priority                  |
| ----------------------- | --------------------------------------------------------------------------------- | ------------------------- |
| 31 (Bug Fixes + Image)  | QR Builder (extract), Image Utils, Notification Dispatcher                        | CRITICAL - immediate next |
| 32 (Owner Dashboard)    | None specific (app-level)                                                         | LOW                       |
| 33 (Guest Dashboard)    | @gudbro/core modules (WiFi, Contacts, Services), @gudbro/ui                       | MEDIUM                    |
| 34 (Services + Minibar) | @gudbro/core (ServicesConfig), Supabase Realtime pattern, Notification Dispatcher | MEDIUM                    |
| 35 (Feedback)           | AI Feedback Pipeline (fork), Image Utils, Notification Dispatcher                 | HIGH                      |
| 36 (Concierge)          | @gudbro/core (Attractions, Transport, Contacts), I18n pattern                     | MEDIUM                    |
| 37 (Conventions)        | Conventions Service (adapt), @shared/payment                                      | HIGH                      |
| 38 (Lifecycle)          | Document types (from Phase 28), Notification Dispatcher, @shared/payment          | MEDIUM                    |
| 39 (Polish)             | @gudbro/config (constants), @gudbro/utils                                         | LOW                       |

## Open Questions

1. **shared/core is not a workspace package**
   - What we know: `shared/core/` has no `package.json` and no `@gudbro/core` entry in workspace config
   - What's unclear: Whether apps import from it via relative path or if it's accessed differently
   - Recommendation: The audit should verify actual import paths used by accommodations app and document them

2. **shared/seo is not a workspace package either**
   - What we know: It's plain JS files (not TS), has been copy-pasted into 6+ app directories
   - What's unclear: Whether the shared version is the canonical source or if app copies have diverged
   - Recommendation: Run diff between shared/seo and one app copy to check divergence

3. **@gudbro/components scope**
   - What we know: Only exports ProductCard variants (food/beverage product cards)
   - What's unclear: Whether this is the right home for generic shared components or if @gudbro/ui should absorb it
   - Recommendation: Document as "F&B-specific" and flag that accommodations phases won't use it

## Sources

### Primary (HIGH confidence)

- Direct codebase inspection via Glob, Grep, Read, Bash tools
- `pnpm-workspace.yaml` - workspace package definitions
- Each `shared/*/package.json` - package names and versions
- Each `shared/*/index.ts` - public API surface
- `.planning/ROADMAP.md` - phases 31-39 descriptions and requirements

### Verification

- `diff` commands confirmed currency-converter divergence across apps
- `wc -l` confirmed LOC differences between duplicated modules
- Direct reading of `shared/core/modules/types.ts` (327 LOC) confirmed 9 module types

## Metadata

**Confidence breakdown:**

- Module inventory: HIGH - direct codebase inspection, every package/directory verified
- Duplication analysis: HIGH - diff/wc-l verified, not assumed
- Phase dependency mapping: HIGH - derived from explicit ROADMAP.md requirements
- Backoffice extractable modules: MEDIUM - identified by directory listing, not all fully inspected

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable - codebase structure changes slowly)
