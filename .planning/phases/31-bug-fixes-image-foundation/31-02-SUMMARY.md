---
phase: 31
plan: 02
subsystem: accommodations-backoffice
tags: [image-upload, supabase-storage, room-management]
dependency-graph:
  requires: []
  provides: [room-image-upload, service-items-folder-config]
  affects: [phase-33, phase-34]
tech-stack:
  added: []
  patterns: [folder-config-upload-api, image-upload-component-reuse]
key-files:
  created: []
  modified:
    - apps/backoffice/app/api/upload/image/route.ts
    - apps/backoffice/components/accommodations/RoomManager.tsx
    - apps/backoffice/components/ui/image-upload.tsx
decisions:
  - id: IMG-01
    decision: 'Room images stored as string[] in room.images JSONB, single primary image for now'
    rationale: 'Matches existing schema (images: string[]), expandable to multi-image later'
  - id: IMG-02
    decision: "New rooms show 'save first' message instead of upload (no room ID yet)"
    rationale: 'Upload needs entityId for storage path organization; avoids orphaned files'
  - id: IMG-03
    decision: 'Added feedback-screenshots to ImageUploadFolder type (was in route but missing from type)'
    rationale: 'Type consistency between route config and component type union'
metrics:
  duration: ~2 min
  completed: 2026-02-01
---

# Phase 31 Plan 02: Image Upload Foundation Summary

**Room image upload in backoffice RoomManager with accommodation folder configs for Supabase Storage**

## What Was Done

### Task 1: Add accommodation folder configs and fix RoomManager image upload (BUG-09, OWN-02)

**Upload API route** (`apps/backoffice/app/api/upload/image/route.ts`):

- Added `room-images` folder config (5MB, PNG/JPEG/WebP, subfolder `rooms`)
- Added `service-items` folder config (5MB, PNG/JPEG/WebP, subfolder `services`)
- Both use existing `brand-assets` Supabase Storage bucket

**ImageUpload component** (`apps/backoffice/components/ui/image-upload.tsx`):

- Added `room-images`, `service-items`, and `feedback-screenshots` to `ImageUploadFolder` type union
- `feedback-screenshots` was already in the route config but missing from the type

**RoomManager** (`apps/backoffice/components/accommodations/RoomManager.tsx`):

- Imported `ImageUpload` component
- Added `handleRoomImageUpdate()` function that PUTs `{ id, images: [url] }` to `/api/accommodations/rooms`
- Extended `RoomFormProps` with `roomId`, `roomImages`, `onImageChange` optional props
- Replaced "Image upload coming soon" placeholder with `ImageUpload` component (folder: `room-images`)
- Edit form passes room data and image handler; add form shows "save first" message
- Removed outdated Phase 22 TODO comments

## Commits

| #   | Hash    | Message                                                      |
| --- | ------- | ------------------------------------------------------------ |
| 1   | e2e89f1 | feat(31-02): add room image upload to backoffice RoomManager |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added feedback-screenshots to ImageUploadFolder type**

- **Found during:** Task 1, Step 3
- **Issue:** `feedback-screenshots` existed in route FOLDER_CONFIGS but was missing from the `ImageUploadFolder` type union in `image-upload.tsx`
- **Fix:** Added to the type union alongside `room-images` and `service-items`
- **Files modified:** `apps/backoffice/components/ui/image-upload.tsx`

## Verification

- TypeScript compilation: PASSED (no errors)
- Lint + Prettier: PASSED (pre-commit hook)
- No "coming soon" text remains in RoomManager
- Upload route has both `room-images` and `service-items` configs
- RoomManager imports and renders ImageUpload component

## Next Phase Readiness

No blockers. The `service-items` folder config is ready for future service item image uploads. Room image upload is functional for property owners editing rooms in backoffice.
