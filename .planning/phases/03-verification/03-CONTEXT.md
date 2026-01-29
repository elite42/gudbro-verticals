# Phase 3: Verification - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Validate that all 7 new vertical PWAs (accommodations, tours, gym, wellness, laundry, pharmacy, workshops) complete `next build` without errors, and that all navigation links (BottomNav + internal) point to existing routes. Fix issues found inline when simple. This phase produces a pass/fail report per vertical.

</domain>

<decisions>
## Implementation Decisions

### Build verification strategy

- Run `next build` sequentially for all 7 new vertical PWAs
- TypeScript errors and build errors are **blocking** — fix inline during verification
- Warnings (deprecation, unused vars) are **non-blocking** — log only, no fix
- Coffeeshop excluded (already production, separate build pipeline)
- Backoffice excluded (admin tool, not a vertical PWA)

### Navigation verification approach

- Static code analysis: scan BottomNav components and page links against `app/` filesystem routes
- Verify every BottomNav link has a matching route in the vertical's `app/` directory
- Verify internal links (CTAs, cards, buttons) on main pages point to valid routes
- Back navigation: confirm detail pages have logical return path to listing page
- No runtime/browser testing — static analysis sufficient for route existence

### Failure handling

- Simple fix (< 5 lines): fix inline during verification, atomic commit per fix
- Complex fix: document in report, create follow-up task (do not block verification)
- Pass threshold: **zero build errors** and **zero broken BottomNav links** per vertical
- Broken internal links that aren't in BottomNav: log as warning, not blocking

### Output format

- Verification report as markdown in phase directory
- Per-vertical checklist: build status, BottomNav links, internal links, back nav
- Summary table with pass/fail per vertical per criterion
- Maps directly to ROADMAP.md success criteria (5 criteria)

### Claude's Discretion

- Order of vertical verification (can optimize based on dependencies)
- Exact format of verification report sections
- How to scan for internal links (grep patterns, AST analysis, etc.)
- Whether to parallelize build checks or run sequentially

</decisions>

<specifics>
## Specific Ideas

- User delegated all decisions to Claude — approach designed for thoroughness and efficiency
- Fix-inline approach keeps verification self-contained (no dangling issues)
- Static analysis preferred over runtime testing for speed and reliability

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 03-verification_
_Context gathered: 2026-01-29_
