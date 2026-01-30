# Phase 9: Code Fixes - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Resolve all 5 v1.0 tech debt items (CFIX-01 through CFIX-05). Every vertical must compile cleanly, use consistent theming, and have zero placeholder links or lint warnings. No new features, no refactoring beyond what's needed for the fix.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All implementation decisions delegated to Claude — follow best practices for each fix:

- **CFIX-01 (Tours TypeScript):** Fix type errors so Tours compiles with `tsc --noEmit` without the soups DB type exclusion. Approach: fix the actual types rather than adding suppressions.
- **CFIX-02 (Tours theming):** Migrate hardcoded Tailwind color values to CSS variables. Naming convention, variable placement, and migration strategy at Claude's discretion — follow existing project patterns.
- **CFIX-03 (Wellness back link):** Add visible back navigation to /staff/[slug]. Style, placement, and icon choice should match existing Wellness UI patterns.
- **CFIX-04 (Wellness lint):** Resolve all `pnpm lint` warnings for Wellness app. Fix the root causes, don't suppress.
- **CFIX-05 (Placeholder links):** Remove all `href="#"` from Tours and Workshops. Strategy (remove element, link to real page, or make non-clickable) depends on each element's context.

### Execution approach

- Single phase, likely 2 plans (group related fixes)
- No dependencies between CFIX items — can be done in any order
- Each fix should be independently verifiable against its success criterion

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Follow existing codebase patterns and best practices.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 09-code-fixes_
_Context gathered: 2026-01-30_
