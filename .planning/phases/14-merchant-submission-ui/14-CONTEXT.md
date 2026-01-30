# Phase 14: Merchant Submission UI - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Merchants can submit feedback from the backoffice in any language with optional screenshots and view their submission history. The form captures context automatically (vertical, page path, merchant ID). AI processing (Phase 13) handles translation and classification after submission.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All areas delegated to Claude's judgment. The following approach guidelines apply:

**Form di feedback:**

- Single-page form in backoffice settings or sidebar — not a modal (needs space for description)
- Type selector: bug / feature request / general feedback — simple radio or segmented control
- Title field: required, short text
- Description field: required, textarea with generous height
- No language picker — user writes in their language, AI handles the rest
- Context auto-captured on submission: current vertical slug, current page path, merchant ID from session
- Simple client-side validation (required fields) before submit

**Screenshot upload:**

- Single screenshot per submission (keep it simple for v1)
- Click-to-upload button, accepts image formats (jpg, png, webp)
- Preview thumbnail after selection
- Upload to Supabase Storage on form submit
- Reasonable size limit (5MB)

**Storico segnalazioni:**

- List view showing: title, type badge, status badge, date submitted
- Sorted by most recent first
- No filters for v1 (small number of submissions per merchant)
- Click row to see full details (description, screenshot if present, current status)

**Feedback di conferma:**

- Success toast/banner after submission
- Form resets to allow another submission
- No redirect — merchant stays on feedback page
- Submission appears immediately in history list below

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Follow existing backoffice patterns for form layout, buttons, and data tables.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 14-merchant-submission-ui_
_Context gathered: 2026-01-30_
