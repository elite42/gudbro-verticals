# Phase 11: E2E Smoke Tests - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Write Playwright smoke tests for all 8 verticals covering page load, BottomNav navigation, and responsive viewports. Uses the infrastructure built in Phase 10 (shared fixtures, vertical registry, per-vertical projects). Does NOT include visual regression baselines (Phase 12) or new test infrastructure.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All decisions for this phase are technical and fall under Claude's discretion. The user trusts Claude to make the right technical choices guided by the roadmap's success criteria:

1. **Test file structure** — How many files per vertical, naming convention, grouping by test type vs by vertical
2. **Navigation coverage** — Which BottomNav links to test, what to verify after navigation, how to handle verticals with different nav structures
3. **Anti-flaky strategy** — Timeout values, waitFor patterns, retry configuration, dev server vs build mode
4. **Cross-vertical differences** — How to handle verticals with different layouts, missing BottomNav, or unique page structures without duplicating test code
5. **Assertion patterns** — Structural assertions (element counts, visibility, no overflow) rather than content assertions per success criteria #5

### Locked Constraints (from Roadmap Success Criteria)

These are non-negotiable:

- Every vertical must have a page-load test (no JS console errors)
- Every vertical must have BottomNav navigation tests
- Responsive viewport tests at 375px, 768px, 1280px (no horizontal overflow)
- All tests must pass together (`--project="smoke-*"`) with zero flaky failures across 3 consecutive runs
- Assertions must be structural, not content-based

</decisions>

<specifics>
## Specific Ideas

No specific requirements — the user wants a solid, crash-free, well-tested product and trusts Claude for all technical decisions in this testing phase.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 11-e2e-smoke-tests_
_Context gathered: 2026-01-30_
