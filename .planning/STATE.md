# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-30)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** v1.2 Tech Debt Cleanup — Phase 12 (Visual & Quality) IN PROGRESS

## Current Position

Phase: 12 of 12 (Visual & Quality)
Plan: 01 of 02 complete
Status: In progress — 12-01 complete (manifests, screenshot CSS, QA checklist)
Last activity: 2026-01-30 — Completed 12-01-PLAN.md

Progress: v1.0 [██████] 6/6 plans | v1.1 [████████████] 12/12 plans + 1 quick | v1.2 [███████░] 7/8 (phase 9-11 done, 12-01 done)

## Performance Metrics

**v1.0 Velocity:**

- Total plans completed: 6
- Average duration: 3.3 minutes
- Total execution time: ~20 minutes

**v1.1 Velocity:**

- Total plans completed: 12 + 1 quick task
- Average duration: 2.7 minutes
- Total execution time: ~32 minutes

**v1.2 Velocity:**

- Plans completed so far: 6
- 09-01: ~4 minutes (3 tasks)
- 09-02: ~9 minutes (2 tasks)
- 10-01: ~3 minutes (2 tasks)
- 10-02: ~5 minutes (2 tasks)
- 11-01: ~9 minutes (2 tasks)
- 11-02: ~25 minutes (2 tasks + 3x validation)
- 12-01: ~3 minutes (2 tasks)

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table and milestones archives.

| Decision                                   | Phase | Rationale                                                                    |
| ------------------------------------------ | ----- | ---------------------------------------------------------------------------- |
| Tours ToS: span instead of link            | 09-01 | No /terms route exists; span preserves visual without broken navigation      |
| Workshops CTAs: mailto links               | 09-01 | No /contact route; mailto with subject prefill is functional alternative     |
| Opacity modifiers for light tint bg        | 09-02 | bg-accent/10 keeps variable count manageable vs separate CSS vars            |
| unoptimized prop for external mock images  | 09-02 | Avoids remotePatterns config for demo Unsplash URLs                          |
| encodeURIComponent for SVG data URIs       | 09-02 | Buffer not available in ESLint browser env; encodeURIComponent universal     |
| ESLint no-empty-pattern for PW fixtures    | 10-01 | Playwright's async ({}, use) convention requires disable for option fixtures |
| testIgnore on legacy PW projects           | 10-02 | Prevents chromium/Mobile Chrome/Safari from picking up vertical smoke tests  |
| Graceful desktop nav skip in tests         | 11-01 | count === 0 early return allows same BottomNav test on mobile+desktop        |
| overflow-x:hidden fix for laundry/pharmacy | 11-01 | Matches wellness pattern; -mx-4 carousels caused real horizontal overflow    |
| Remove /stay from accommodations registry  | 11-02 | /stay is not standalone page; only /stay/[code] exists                       |
| Scoped nav selector for coffeeshop         | 11-02 | nav[role="navigation"] avoids picking up desktop nav links                   |
| Custom benign errors for coffeeshop        | 11-02 | MerchantConfig 400 in dev is not a real error                                |
| Graceful no-nav for accommodations         | 11-02 | Home page (booking) has no BottomNav; skip nav test gracefully               |
| Array themeColor: use light-mode value     | 12-01 | manifest.json requires single string; light mode is primary brand color      |

### Known Issues

All 7 tech debt items from v1.0 are now tracked as CFIX-01..05 requirements in v1.2. The remaining 2 items (visual QA, no manual smoke testing) are covered by E2EI and VISQ requirements.

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-01-30
Stopped at: Completed 12-01-PLAN.md
Resume file: None
Next: `/gsd:execute-phase 12` (plan 02)

---

_Last updated: 2026-01-30 after 12-01 completion_
