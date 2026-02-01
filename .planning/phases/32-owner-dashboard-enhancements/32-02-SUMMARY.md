---
phase: 32
plan: 02
subsystem: accommodations-backoffice
tags: [onboarding, policies, property-data, wizard, migration]
dependency-graph:
  requires: [32-01]
  provides:
    [structured-policies, property-data-form, onboarding-wizard, migration-094]
  affects: [33, 34, 35]
tech-stack:
  added: []
  patterns: [checkbox-policies, multi-step-wizard, db-persisted-progress]
key-files:
  created:
    - shared/database/migrations/schema/094-property-data-onboarding.sql
    - apps/backoffice/components/accommodations/StructuredPolicies.tsx
    - apps/backoffice/components/accommodations/PropertyDataForm.tsx
    - apps/backoffice/components/accommodations/OnboardingWizard.tsx
    - apps/backoffice/app/(dashboard)/accommodations/onboarding/page.tsx
    - apps/backoffice/app/(dashboard)/accommodations/page.tsx
  modified:
    - apps/backoffice/app/api/accommodations/property/route.ts
    - apps/backoffice/app/(dashboard)/accommodations/settings/page.tsx
decisions:
  - id: ONBOARD-01
    decision: Onboarding wizard uses link-out pattern for rooms/photos/wifi steps (not embedded components)
    rationale: Avoids component coupling; rooms page already exists and works well standalone
  - id: ONBOARD-02
    decision: shouldShowWizard checks name + contact as minimum configured threshold
    rationale: Pre-existing properties with rooms/name/contact should never see the wizard banner
  - id: POLICY-01
    decision: StructuredPolicies stores house_rules as string[] (same format as before)
    rationale: Backward compatible with existing data; no migration needed for existing rules
metrics:
  duration: ~9 min
  completed: 2026-02-01
---

# Phase 32 Plan 02: Onboarding Wizard + Structured Policies Summary

Checkbox-based house rules, dropdown cancellation policy, property data form (social/maps/hours/languages), and 6-step onboarding wizard with DB-persisted progress and skip logic for configured properties.

## What Was Built

### Task 1: Migration + Property API + Structured Policies + Property Data Form

- **Migration 094**: Added 6 new columns to `accom_properties` -- `social_links` (JSONB), `google_maps_url` (TEXT), `communication_methods` (TEXT[]), `operating_hours` (JSONB), `staff_languages` (TEXT[]), `onboarding_progress` (JSONB)
- **Property API**: GET returns all new fields; PUT allowedFields expanded with new columns plus basic fields (name, description, address, city, host_name, amenities) needed by onboarding
- **StructuredPolicies**: 8 common house rules as checkboxes + custom rule input with removable chips + cancellation policy dropdown (flexible/moderate/strict/non_refundable)
- **PropertyDataForm**: Social links (Instagram, Facebook, TikTok, Website with Phosphor icons), Google Maps URL, communication method checkboxes (WhatsApp, Zalo, Telegram, LINE, Email, Phone), operating hours (reception + restaurant), staff languages (9 common SEA languages + custom)
- **Settings page**: Policies section replaced with StructuredPolicies; new Property Information section with PropertyDataForm

### Task 2: Onboarding Wizard

- **OnboardingWizard**: 6 steps (basic_info, photos, rooms, wifi, services, contact) with horizontal progress bar, step icons, checkmarks for completed steps
- **DB persistence**: onboarding_progress JSONB tracks completed_steps, current_step, started_at, completed_at
- **Skip logic**: Optional steps (photos, wifi, services) have Skip button; required steps (basic_info, rooms, contact) must be completed
- **Onboarding page**: `/accommodations/onboarding` with redirect if already completed
- **Dashboard page**: `/accommodations` with navigation grid (6 links) and onboarding banner for unconfigured properties
- **shouldShowWizard**: Returns false if property has name + contact OR if onboarding_progress.completed_at is set; banner is dismissible

## Commits

| #   | Hash    | Message                                                                  |
| --- | ------- | ------------------------------------------------------------------------ |
| 1   | 8ca5448 | feat(32-02): structured policies, property data form, and migration      |
| 2   | 3a10550 | feat(32-02): onboarding wizard with DB-persisted progress and skip logic |

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

| ID         | Decision                                                    | Rationale                                                      |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| ONBOARD-01 | Wizard uses link-out pattern for rooms/photos/wifi steps    | Avoids component coupling; existing pages work well standalone |
| ONBOARD-02 | shouldShowWizard checks name + contact as minimum threshold | Pre-existing configured properties never see wizard banner     |
| POLICY-01  | house_rules stored as string[] (unchanged format)           | Backward compatible with existing data                         |

## Verification

- TypeScript compilation: backoffice passes with zero errors
- Settings page: StructuredPolicies replaces textarea with checkboxes + dropdown
- Settings page: PropertyDataForm section with social links, maps, communication, hours, languages
- Onboarding page: renders wizard at /accommodations/onboarding
- Dashboard page: shows navigation grid + conditional onboarding banner
- Property API: GET/PUT handle all new fields

## Next Phase Readiness

Phase 32 plan 02 complete. All artifacts delivered:

- Migration 094 ready to apply
- Property API supports all new fields
- Onboarding wizard functional with DB persistence
- Dashboard page provides entry point for all accommodations features
