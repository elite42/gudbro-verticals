# Phase 30: Shared Module Audit - Context

**Gathered:** 2026-02-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Produce a comprehensive catalog document of all reusable modules across verticals, with status classification (ready / needs adaptation / to-build). No code changes — output is a reference document that phases 31-39 will consult for build-vs-reuse decisions.

</domain>

<decisions>
## Implementation Decisions

### Audit scope

- Audit ALL directories: `shared/` (7 workspace packages), `shared/core/`, `shared/database/`, `shared/seo/`, `shared/menu-template/`
- Audit app-specific lib directories for duplicated patterns: `apps/*/frontend/lib/`, `apps/backoffice/lib/`
- Include cross-vertical patterns (Supabase client setup, currency conversion, translation hooks, auth helpers, theme system)
- Cover 11 vertical PWAs + backoffice + waiter

### Classification criteria

- **Ready**: Module exists as workspace package, tested, documented imports — can be used as-is in accommodations phases
- **Needs adaptation**: Module exists but requires changes for accommodations context (e.g., coffeeshop-specific types, missing accommodation business logic)
- **To-build**: Pattern is duplicated across apps or doesn't exist yet — needs extraction or creation as shared module
- For "needs adaptation" entries: document the specific changes required (not vague descriptions)

### Catalog structure

- Organize by functional area (UI, data, infrastructure, business logic), NOT by directory
- Each module entry includes: name, location, status, which apps use it, and what phases 31-39 need from it
- Include a "Duplicated Patterns" section highlighting code that exists in 2+ apps and should be consolidated
- Include a "Phase Dependency Matrix" mapping each phase (31-39) to which shared modules it will need

### Deliverable format

- Single markdown file: `.planning/phases/30-shared-module-audit/SHARED-MODULE-CATALOG.md`
- Actionable enough that a planner can read one module entry and decide build-vs-reuse without investigating further
- Include import path examples for "ready" modules so downstream plans can reference them directly

### Priority ranking

- Rank modules by how many phases 31-39 depend on them (higher dependency count = higher priority for extraction)
- Flag modules that are blockers for Phase 31 (bug fixes) since that's the immediate next phase

### Claude's Discretion

- Exact grouping categories for the catalog
- Whether to include LOC counts or other metrics per module
- Level of detail for modules that no phase 31-39 needs
- Format of the phase dependency matrix (table vs list)

</decisions>

<specifics>
## Specific Ideas

- The 7 existing workspace packages (@gudbro/ui, types, utils, config, payment, components, menu-template) are the baseline — audit their completeness
- Key duplicated patterns already identified: Supabase client (6 apps), currency conversion (4+ PWAs), translation hooks (3+ PWAs), auth helpers (3 apps), theme system
- `shared/core/` has hospitality modules (WiFi, PriceList, Contacts, Attractions) that are directly relevant to accommodations phases
- Backoffice AI services (15+ modules) — assess which patterns could serve the feedback pipeline (Phase 35)
- Image utilities from Phase 28 (HEIC conversion, compression) should be cataloged for reuse in Phase 31 (image foundation)
- QR code builder exists in backoffice — Phase 31 needs it extracted to shared (INF-02)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 30-shared-module-audit_
_Context gathered: 2026-02-01_
