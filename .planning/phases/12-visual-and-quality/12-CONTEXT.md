# Phase 12: Visual and Quality - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Capture visual regression baselines (screenshots) for all 8 verticals, validate PWA manifests, and create a physical device QA checklist. No new features or UI changes — this phase documents and locks the current visual state.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All areas delegated to best practices. Claude has full flexibility on:

**Screenshot strategy:**

- Capture homepage + one key internal page per vertical (e.g., menu page for coffeeshop, service catalog for laundry)
- Mobile (375px) and desktop (1280px) viewports — skip tablet to keep baseline count manageable
- Use Playwright `toHaveScreenshot()` with stable selectors
- Mask or freeze dynamic content (dates, random images) to avoid false positives
- One screenshot per page per viewport = ~32 baseline images (8 verticals x 2 pages x 2 viewports)

**Visual regression thresholds:**

- Start with `maxDiffPixelRatio: 0.01` (1%) — strict enough to catch layout breaks, loose enough to handle anti-aliasing
- Use `threshold: 0.2` for per-pixel color comparison to handle font rendering differences across CI vs local
- Target: <5% false positive rate as stated in success criteria
- If a vertical has animated content, use `animations: 'disabled'` in screenshot options

**PWA manifest validation:**

- Automated tests using Playwright to fetch and parse each vertical's `manifest.json`
- Assert required fields: `name`, `short_name`, `icons` (192px + 512px), `theme_color`, `display`, `start_url`
- Test should fail if any required field is missing or empty — fix in this phase if trivial, create issue if complex

**Physical device QA checklist:**

- Markdown document in `docs/reference/PHYSICAL-QA-CHECKLIST.md`
- Organized by vertical with common checks (layout, touch targets 44px min, font legibility, scroll behavior, no horizontal overflow)
- Per-vertical specific items (e.g., coffeeshop menu scrolling, accommodations booking form usability)
- Format: checkboxes that can be printed or used as issue template

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User delegated all decisions to best practices.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 12-visual-and-quality_
_Context gathered: 2026-01-30_
