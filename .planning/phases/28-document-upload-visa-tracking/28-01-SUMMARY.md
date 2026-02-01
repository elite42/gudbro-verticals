# Plan 28-01: Database + API + Cron — Summary

**Phase:** 28-document-upload-visa-tracking
**Plan:** 01
**Status:** Complete
**Duration:** ~5 min

## What Was Built

Complete backend infrastructure for guest document upload and visa tracking:

1. **Migration 091** (`shared/database/migrations/schema/091-guest-documents.sql`):
   - `accom_guest_documents` table with 16 columns (soft-delete, consent tracking, visa supersession)
   - 4 partial indexes for booking, property, visa expiry, and cleanup queries
   - Property columns: `document_retention_days` (7-90, default 30), `visa_reminder_days` (default {7,3}), `visa_extension_info`
   - Private `guest-documents` storage bucket (5MB limit, JPEG/PNG/WebP only)
   - RLS enabled with service_role-only access

2. **API Routes** (5 endpoints, all require full-access tier):
   - `POST /api/stay/[code]/documents/upload-url` — signed upload URL + DB record creation + visa supersession
   - `GET /api/stay/[code]/documents` — list documents (metadata only, no storage URLs)
   - `POST /api/stay/[code]/documents` — confirm upload (update file size)
   - `GET /api/stay/[code]/documents/[docId]` — signed download URL (5 min expiry)
   - `DELETE /api/stay/[code]/documents/[docId]` — storage delete first, then DB soft-delete

3. **Cron Job** (`/api/cron/document-lifecycle`, daily at 09:00 UTC):
   - Part A: Visa expiry reminders (marks flags for 7d/3d intervals per property config)
   - Part B: GDPR auto-delete (storage first, then DB soft-delete, skip on failure)

4. **Client Functions** (`lib/stay-api.ts`):
   - `requestDocumentUploadUrl`, `confirmDocumentUpload`, `fetchDocuments`, `fetchDocumentUrl`, `deleteDocument`
   - New `deleteStayAPI` helper for DELETE requests

5. **Types** (`types/stay.ts`):
   - `GuestDocument`, `DocumentUploadRequest`, `DocumentUploadResponse`, `DocumentListResponse`, `DocumentUrlResponse`
   - Extended `ApiError` with `consent_missing`, `upload_failed`, `document_not_found`

## Commits

| #   | Hash    | Message                                                           |
| --- | ------- | ----------------------------------------------------------------- |
| 1   | f34ded3 | feat(28-01): database migration + storage bucket + document types |
| 2   | b1d4306 | feat(28-01): document API routes + cron job + stay-api client     |

## Deviations

- Cron GDPR deletion uses a fallback query approach instead of RPC (supabase.rpc not set up), querying documents + bookings + properties separately then computing expiry in JS. Functionally equivalent.
- Map/Set iteration fixed to use `Array.from()` for compatibility with ES target.

## Verification

- TypeScript compilation: 0 errors
- All 4 route files exist with correct exports
- vercel.json has 2 cron entries
- stay-api.ts has 5 new document functions + deleteStayAPI helper
