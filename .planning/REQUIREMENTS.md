# Requirements: GUDBRO Verticals v2.0 Codebase Hardening

**Defined:** 2026-02-02
**Core Value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Driver:** 360-degree audit scored 6.7/10. Target: 8.5+/10.

## v2.0 Requirements

Requirements derived from AUDIT-360.md findings (Critical + High severity).

### Security

- [ ] **SEC-01**: Rate limiting applied to all public API endpoints (/api/booking POST, /api/orders POST, /api/charges GET)
- [ ] **SEC-02**: Orders RLS policy filters by session_id and merchant_id instead of USING (true)
- [ ] **SEC-03**: Admin API key validation uses crypto.timingSafeEqual() instead of string comparison
- [ ] **SEC-04**: Supabase client removes fallback to ANON key when SERVICE_ROLE_KEY is missing (throws error)
- [ ] **SEC-05**: Booking code lookup endpoint has rate limiting (max 5 attempts per IP per minute)

### Shared Foundation

- [ ] **SHR-01**: shared/hooks/ contains usePriceFormat consolidated from 4 app copies (gym, laundry, pharmacy, workshops)
- [ ] **SHR-02**: shared/utils/ contains currency-converter consolidated from 4 app copies
- [ ] **SHR-03**: shared/utils/ contains currency-preferences consolidated from 6 app copies
- [ ] **SHR-04**: shared/config/ contains base tsconfig.app.json that all apps extend (standardized aliases, strict mode)
- [ ] **SHR-05**: shared/config/ contains tailwind.preset.js with shared color tokens and design system
- [ ] **SHR-06**: shared/config/ contains next.config.base.js with shared image domains, security headers
- [ ] **SHR-07**: shared/ui/ contains BottomNav component replacing 4 separate implementations
- [ ] **SHR-08**: All 8 PWAs import shared hooks/utils instead of local copies (zero duplicates remain)
- [ ] **SHR-09**: shared/types/ contains consolidated domain types (MenuItem, Order, MerchantCharge) used by all apps

### Frontend Resilience

- [ ] **FE-01**: All 9 PWAs have error.tsx at app root with user-friendly error UI and retry action
- [ ] **FE-02**: All 9 PWAs have loading.tsx at app root with skeleton/spinner loading state
- [ ] **FE-03**: TypeScript strict mode fully enabled across all apps (noUnusedLocals, noUnusedParameters, noImplicitReturns = true)
- [ ] **FE-04**: Dead code cleanup: commented-out code blocks removed, unused imports cleaned
- [ ] **FE-05**: Image optimization: CSS backgroundImage usage replaced with next/image in gym, laundry, pharmacy, workshops
- [ ] **FE-06**: Accessibility: aria-labels added to all icon-only buttons across all PWAs
- [ ] **FE-07**: Accessibility: visible focus indicators (outline/ring) on all interactive elements
- [ ] **FE-08**: Accessibility: color contrast fix for --text-tertiary to meet WCAG AA (4.5:1 ratio)
- [ ] **FE-09**: PWA manifest fix: gym manifest corrected (512x512 icon uses correct path)

### Architecture

- [ ] **ARC-01**: ModernChatMenuV3 refactored from 860-line god component into 4-5 focused components (ChatContainer, MenuBrowser, CartManager, WiFiQR)
- [ ] **ARC-02**: shared/utils/error-handling.ts provides AppError class, handleCatch utility, safeParse helper
- [ ] **ARC-03**: Unsafe type assertions (as any/unknown) reduced by 50%+ with proper type guards
- [ ] **ARC-04**: Unsafe JSON parsing pattern (.json().catch(() => ({}))) replaced with proper error handling in API routes
- [ ] **ARC-05**: Supabase types auto-generated via supabase gen types and used as source of truth

### Documentation

- [ ] **DOC-01**: docs/reference/API.md created with index of all API endpoints, auth requirements, rate limits
- [ ] **DOC-02**: apps/gym/PRD.md created (product requirements for Gym PWA)
- [ ] **DOC-03**: apps/waiter/PRD.md created (product requirements for Waiter PWA)
- [ ] **DOC-04**: docs/knowledge/decisions/ populated with 3 ADRs (zustand, phosphor-icons, v2-architecture)
- [ ] **DOC-05**: docs/knowledge/patterns/ populated with 3 pattern docs (connected-component, tier-gating, store-sync)

## v2.1+ Requirements (Deferred)

### Frontend Enhancement

- **FE-D1**: Dark mode support across all PWAs (currently only coffeeshop)
- **FE-D2**: Service worker/offline support for all PWAs (currently only coffeeshop)
- **FE-D3**: Sitemap generation for all PWAs
- **FE-D4**: PWA manifest enhancement (screenshots, shortcuts for all apps)

### Database

- **DB-D1**: SECURITY INVOKER migration for user-facing SQL functions
- **DB-D2**: RLS policy comments (COMMENT ON POLICY) for all 673 policies
- **DB-D3**: JSONB schema documentation for all JSONB columns
- **DB-D4**: Materialized view refresh strategy and indexing
- **DB-D5**: Table naming convention standardization (core\_\* prefix)
- **DB-D6**: RLS hardening on AI tables (replace WITH CHECK (true))

### Architecture

- **ARC-D1**: State management standardization (Zustand across all apps)
- **ARC-D2**: Branded types for domain entities (AccountId, MerchantId, OrderId)

## Out of Scope

| Feature                                           | Reason                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| Complete icon library migration (all to Phosphor) | Cosmetic change, high LOC churn, defer to incremental per-vertical work |
| Backoffice multi-vertical accounts                | Separate milestone, large scope                                         |
| Full E2E test coverage expansion                  | v1.2 established baseline, expand incrementally                         |
| Performance profiling and optimization            | Requires production traffic data, separate initiative                   |
| Rentals PRD                                       | Rentals vertical not yet in active development                          |

## Traceability

| Requirement | Phase | Status  |
| ----------- | ----- | ------- |
| SEC-01      | 40    | Pending |
| SEC-02      | 40    | Pending |
| SEC-03      | 40    | Pending |
| SEC-04      | 40    | Pending |
| SEC-05      | 40    | Pending |
| SHR-01      | 41    | Pending |
| SHR-02      | 41    | Pending |
| SHR-03      | 41    | Pending |
| SHR-04      | 41    | Pending |
| SHR-05      | 41    | Pending |
| SHR-06      | 41    | Pending |
| SHR-07      | 41    | Pending |
| SHR-08      | 41    | Pending |
| SHR-09      | 41    | Pending |
| FE-01       | 43    | Pending |
| FE-02       | 43    | Pending |
| FE-03       | 43    | Pending |
| FE-04       | 43    | Pending |
| FE-05       | 43    | Pending |
| FE-06       | 43    | Pending |
| FE-07       | 43    | Pending |
| FE-08       | 43    | Pending |
| FE-09       | 43    | Pending |
| ARC-01      | 44    | Pending |
| ARC-02      | 42    | Pending |
| ARC-03      | 44    | Pending |
| ARC-04      | 42    | Pending |
| ARC-05      | 44    | Pending |
| DOC-01      | 45    | Pending |
| DOC-02      | 45    | Pending |
| DOC-03      | 45    | Pending |
| DOC-04      | 45    | Pending |
| DOC-05      | 45    | Pending |

**Coverage:**

- v2.0 requirements: 33 total
- Mapped to phases: 33
- Unmapped: 0

---

_Requirements defined: 2026-02-02_
_Last updated: 2026-02-02 after roadmap phase mapping_
