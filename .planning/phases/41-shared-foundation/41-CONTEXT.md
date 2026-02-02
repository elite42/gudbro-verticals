# Phase 41: Shared Foundation - Context

**Gathered:** 2026-02-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Consolidate all duplicated hooks, utils, configs, UI components, and types into shared/ so every PWA imports from a single source of truth. Specifically: usePriceFormat hook, currency utils, base tsconfig/tailwind/next.config, BottomNav component, and domain types (MenuItem, Order, MerchantCharge). All local duplicates must be deleted after migration.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

User confirmed this is a purely technical phase and defers all implementation decisions to Claude's professional judgment. The following areas should be resolved during research and planning based on codebase analysis and best practices:

**Consolidation strategy**

- How to handle divergent implementations across PWAs (merge variants vs pick best)
- Whether to create configurable shared modules or opinionated defaults
- Migration order and approach for replacing local copies with shared imports

**Shared configuration**

- How PWAs extend base tsconfig, tailwind preset, and next.config
- Which values are fixed in shared vs overridable per-PWA
- How to structure config inheritance (extends, presets, spreads)

**BottomNav component**

- How to unify different BottomNav implementations into a configurable shared component
- What props/configuration the shared component exposes
- How PWA-specific navigation items are defined

**Export conventions and structure**

- Barrel exports vs direct imports from shared/
- Path alias configuration (@shared/ or similar)
- Folder structure within shared/ (hooks/, utils/, config/, ui/, types/)
- Naming conventions for shared modules

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Claude should analyze existing implementations across all PWAs and choose the most robust/complete version as the base for consolidation.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 41-shared-foundation_
_Context gathered: 2026-02-02_
