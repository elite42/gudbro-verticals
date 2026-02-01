---
phase: 32
plan: 04
subsystem: backoffice-accommodations
tags: [settings, structured-policies, property-data, gap-closure]
dependency-graph:
  requires: [32-02]
  provides: [structured-policies-wired, property-data-form-wired]
  affects: [33]
tech-stack:
  added: []
  patterns: [controlled-component-wiring, onChange-callback-pattern]
key-files:
  created: []
  modified:
    - apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx
decisions: []
metrics:
  duration: ~3 min
  completed: 2026-02-01
---

# Phase 32 Plan 04: Wire StructuredPolicies and PropertyDataForm Summary

**One-liner:** Replaced orphaned policy textareas with checkbox-based StructuredPolicies and wired full PropertyDataForm (social links, maps, hours, languages) into settings page.

## What Was Done

### Task 1: Replace policy textareas with StructuredPolicies component

- Imported StructuredPolicies and replaced house rules textarea with checkbox selection (8 common rules + custom rules input)
- Replaced cancellation policy textarea with structured dropdown (flexible/moderate/strict/non-refundable)
- Changed `houseRulesText: string` state to `houseRules: string[]` for direct array management
- Removed manual newline-splitting logic from handleSave (array used directly)
- Commit: `ce87aab`

### Task 2: Wire PropertyDataForm into settings page

- Imported PropertyDataForm and added "Property Information" section between Policies and Contact
- Added 5 new state variables: socialLinks, googleMapsUrl, communicationMethods, operatingHours, staffLanguages
- Extended PropertySettings interface with corresponding DB fields (social_links, google_maps_url, communication_methods, operating_hours, staff_languages)
- Loaded all new fields from API response in useEffect
- Included all new fields in handleSave PUT payload with proper null handling
- Commit: `63efc4a`

## Deviations from Plan

None - plan executed exactly as written.

## Gaps Closed

- **Gap 4** (from 32-VERIFICATION): StructuredPolicies orphaned - now wired into settings page
- **Gap 5** (from 32-VERIFICATION): PropertyDataForm orphaned - now rendered in new Property Information section
- **Gap 6** (from 32-VERIFICATION): Settings page missing property data management - now complete

## Verification

- [x] StructuredPolicies replaces old policy textareas (zero textareas remain)
- [x] PropertyDataForm renders in new Property Information section
- [x] All new fields included in handleSave payload
- [x] No regressions: all existing settings sections unchanged
- [x] TypeScript: backoffice compiles cleanly with zero errors
- [x] Zero modifications to StructuredPolicies.tsx or PropertyDataForm.tsx
