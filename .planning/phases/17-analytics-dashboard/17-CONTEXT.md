# Phase 17: Analytics Dashboard - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Admin dashboard page showing feedback analytics: submission volume over time, breakdown by type and vertical, top requested features ranked by submission count, and average response time metrics. No new data collection — purely visualization of existing fb_submissions and fb_tasks data.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All implementation decisions delegated to Claude. The following areas are open for best judgment:

**Layout and Visualizations**

- Chart types (line, bar, pie, etc.) chosen per metric
- Page layout and card arrangement
- Information density and visual hierarchy
- Color coding for types/verticals/sentiment

**Filters and Time Range**

- Time range selector approach (presets vs date picker vs both)
- Filtering by vertical, type, or other dimensions
- Default time range on page load

**Metrics and KPIs**

- Which summary numbers to highlight as top-level KPIs
- How to display response time (median vs average, formatting)
- Trend indicators (up/down arrows, percentage change)
- Whether to show period-over-period comparison

**Empty and Loading States**

- Skeleton loading approach
- Minimum data threshold messaging
- Graceful degradation when partial data available

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Follow existing backoffice patterns (Radix UI, Tailwind, consistent with Phase 16 kanban page styling).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 17-analytics-dashboard_
_Context gathered: 2026-01-30_
