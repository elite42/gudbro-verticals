# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-02)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** v2.0 Codebase Hardening — Phase 41 Shared Foundation in progress

## Current Position

Phase: 41 of 45 (Shared Foundation)
Plan: 4 of 6 in current phase (41-01, 41-02, 41-03, 41-04 complete)
Status: In progress
Last activity: 2026-02-02 — Completed 41-04-PLAN.md

Progress: v1.0-v1.5 [##################################################] 92/92 plans
Progress: v2.0 [########......] 7/13 plans

## Performance Metrics

**Velocity:**

- Total plans completed: 99 (+ 1 quick task)
- Average duration: ~3.4 min/plan
- Total execution time: ~7.9 hours

**By Milestone:**

| Milestone | Plans | Total Time | Avg/Plan |
| --------- | ----- | ---------- | -------- |
| v1.0      | 6     | ~20 min    | 3.3 min  |
| v1.1      | 12+1  | ~32 min    | 2.7 min  |
| v1.2      | 8     | ~62 min    | 7.8 min  |
| v1.3      | 10    | ~33 min    | 3.3 min  |
| v1.4      | 21    | ~87 min    | 4.1 min  |
| v1.5      | 35    | ~176 min   | 5.0 min  |
| v2.0      | 7     | ~29 min    | 4.1 min  |

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table and milestone archives.

- Used supabase() function wrapper in backoffice services for lazy admin client access
- Migration 102 drops old permissive policies before creating restrictive ones
- Passkey auth routes excluded from ANON fallback removal (correct pattern for auth flows)
- CSS variable-based semantic color tokens in shared Tailwind preset (apps define brand via CSS vars)
- createNextConfig factory pattern with domain appending for Next.js config standardization
- Factory pattern for currency preferences (storageKeyPrefix) and converter (optional fetchRates)
- usePriceFormat hook uses dependency injection (store + converter) not global imports
- BottomNav center item: button mode (onCenterClick) vs Link mode for navigation
- MenuItem re-exported from custom.ts in domain.ts (no duplication)
- MerchantCharge sub-types extracted as named union types for granular imports
- App-specific lib/currency.ts setup files wire shared factories with DI for each app
- useAppPriceFormat wrapper hook pre-wires shared usePriceFormat with app-specific stores
- Re-export CURRENCIES as AVAILABLE_CURRENCIES for coffeeshop backward compat

### Blockers/Concerns

- Stripe MCC 7011 extended authorization needs validation with SEA property owners
- ADMIN_API_KEY auth pattern needs migration to session-based auth
- Migrations 095-102 need to be applied to live database
- Storage bucket `feedback-screenshots` needs manual creation in Supabase
- UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars needed in Vercel for rate limiting

### Pending Todos

- Migrations 095-102 need to be applied to live database (Supabase MCP/CLI not available during execution)
- Storage bucket `feedback-screenshots` needs to be created in Supabase dashboard

## Session Continuity

Last session: 2026-02-02
Stopped at: Completed 41-04-PLAN.md
Resume file: None
Next: 41-05-PLAN.md — Continue Shared Foundation (Wave 2)

---

_Last updated: 2026-02-02 after 41-04 currency migration plan completed_
