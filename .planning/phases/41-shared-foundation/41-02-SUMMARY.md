---
phase: 41-shared-foundation
plan: 02
subsystem: shared-config
tags: [tsconfig, tailwind, nextjs, config-factory, design-tokens]
dependency-graph:
  requires: []
  provides: [tsconfig-app-base, tailwind-preset, nextjs-config-factory]
  affects: [41-03, 41-04, 41-05, 41-06]
tech-stack:
  added: []
  patterns: [config-factory-pattern, css-variable-design-tokens, tailwind-presets]
key-files:
  created:
    - shared/config/tsconfig.app.json
    - shared/config/tailwind.preset.js
    - shared/config/next.config.base.js
  modified: []
decisions:
  - id: d-41-02-01
    decision: "Use CSS variable-based semantic color tokens in Tailwind preset"
    rationale: "Each app defines its own brand colors via CSS variables, preset provides the token structure"
  - id: d-41-02-02
    decision: "Use _comment field instead of JSON comments in tsconfig.app.json"
    rationale: "JSON does not support comments; _comment field preserves documentation for developers"
  - id: d-41-02-03
    decision: "Deep merge overrides in createNextConfig with domain appending"
    rationale: "Apps need to add custom image domains without losing shared ones"
metrics:
  duration: ~3 min
  completed: 2026-02-02
---

# Phase 41 Plan 02: Shared Config Files Summary

Created three shared configuration files that standardize settings across all PWA apps: base TypeScript config, Tailwind design tokens preset, and Next.js config factory with port-based customization and domain merging.

## Tasks Completed

| # | Task | Commit | Key Files |
|---|------|--------|-----------|
| 1 | Create base tsconfig.app.json for PWA apps | 9f40ec1 | shared/config/tsconfig.app.json |
| 2 | Create Tailwind preset and Next.js config factory | d24bd95 | shared/config/tailwind.preset.js, shared/config/next.config.base.js |

## What Was Built

### tsconfig.app.json
- Extends root `tsconfig.base.json` with Next.js-specific settings
- Strict mode enabled, ES2017 target, bundler moduleResolution
- Next.js plugin for IDE type checking support
- All `@gudbro/*` path aliases (types, config, utils, ui, hooks)
- Note: paths use `../../shared/*` relative depth for `apps/X/frontend/` apps; shallower apps must override

### tailwind.preset.js
- Semantic color tokens via CSS variables: `theme-bg`, `theme-text`, `theme-border`, `theme-interactive`
- Shared animations: bounce-once, slide-up, fade-in, scale-in
- Custom keyframes for slide-up, fade-in, scale-in
- No `content` paths (stays in each app's own config)
- CommonJS export with `/* global module */` for ESLint flat config compatibility

### next.config.base.js
- `createNextConfig({ port, additionalDomains, overrides })` factory function
- Base image domains: unsplash, cdn.gudbro.com, vietqr, flagcdn, qrserver
- Image formats (avif, webp), device sizes, image sizes from coffeeshop config
- Smart deep merge: top-level spread, image domains append, env merge
- CommonJS export with `/* global module, process */` for ESLint compatibility

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] ESLint flat config does not support `/* eslint-env node */` comments**
- **Found during:** Task 2 commit
- **Issue:** ESLint with flat config (`eslint.config.js`) ignores `/* eslint-env node */` directive, causing `no-undef` errors for `module` and `process`
- **Fix:** Used `/* global module */` and `/* global module, process */` comments instead
- **Files modified:** shared/config/tailwind.preset.js, shared/config/next.config.base.js
- **Commit:** d24bd95

**2. [Rule 1 - Bug] JSON comments not valid in tsconfig.app.json**
- **Found during:** Task 1 verification
- **Issue:** Initial version used JavaScript-style comments which are invalid JSON (Python JSON parser rejected)
- **Fix:** Replaced comments with `_comment` field and `$schema` field
- **Commit:** 9f40ec1

## Decisions Made

1. **CSS variable-based tokens over hardcoded colors** -- Each app defines brand colors via CSS variables; the preset provides the semantic structure (bg, text, border, interactive) that maps to those variables. This allows a single preset to serve all 8+ apps with different visual identities.

2. **createNextConfig factory pattern** -- Instead of a static config object, a factory function accepts `{ port, additionalDomains, overrides }` so each app can customize while inheriting shared defaults. Domain arrays are appended (not replaced) to prevent losing shared domains.

3. **CommonJS for config files** -- Both tailwind.preset.js and next.config.base.js use CommonJS (`module.exports`) because Tailwind and Next.js config files require CommonJS in this project setup.

## Next Phase Readiness

- Plan 03+ can now migrate individual apps to extend these shared configs
- Apps at `apps/X/frontend/` (3 levels deep) can extend tsconfig.app.json directly
- Apps at `apps/X/` (2 levels deep) will need path overrides in their local tsconfig
- No blockers identified
