# Plan 28-02: Frontend Upload UI + Backoffice Document Viewer — Summary

**Phase:** 28-document-upload-visa-tracking
**Plan:** 02
**Status:** Complete
**Duration:** ~5 min

## What Was Built

Complete guest-facing document upload UI and owner backoffice document management:

1. **Image Processing Pipeline** (`lib/image-utils.ts`):
   - `processDocumentImage()`: HEIC detection + conversion (via heic2any), compression (browser-image-compression, <500KB target), blur detection (canvas Laplacian variance)
   - `hashConsentText()`: Simple hash for GDPR consent version tracking
   - Blur thresholds: < 100 = blurry (warn), 100-500 = acceptable, > 500 = sharp
   - Type declaration for heic2any (`types/heic2any.d.ts`)

2. **Guest Components** (3 new components):
   - `DocumentConsent.tsx`: GDPR consent checkbox with expandable disclaimer, consent hash generation
   - `DocumentUpload.tsx`: Multi-step upload flow (type select → consent → camera/gallery → processing → preview → details → upload → done), mobile camera detection, blur warning with retake option
   - `VisaExpiryAlert.tsx`: Dismissable progress bar with color progression (green > 14d, amber 7-14d, red < 7d), non-dismissable when expired, localStorage persistence

3. **Dashboard Integration**:
   - Room dashboard (`app/stay/room/[roomCode]/page.tsx`): Document section with upload button, visa expiry alert above WiFi card, document list with status
   - Legacy booking dashboard (`app/stay/[code]/page.tsx`): Same integration for backward compatibility
   - `VisaStatusCard.tsx`: Updated to use uploaded visa expiry date when available (falls back to estimated visa-free exemption)

4. **Backoffice Document Management**:
   - Document urgency dashboard (`accommodations/documents/page.tsx`): Two tabs (By Urgency / By Guest), color-coded rows, registration toggle, pending count badge
   - Booking detail page: Documents section with registration status toggle, per-booking document filtering

5. **Dependencies**: `browser-image-compression@^2.0.2`, `heic2any@^0.0.4` added to accommodations frontend

## Commits

| #   | Hash    | Message                                                           |
| --- | ------- | ----------------------------------------------------------------- |
| 1   | d286ceb | feat(28-02): image utils + dependencies + guest upload components |
| 2   | ccd9436 | feat(28-02): dashboard integration + backoffice document viewer   |

## Deviations

- None. Implementation followed plan closely.

## Verification

- TypeScript compilation: 0 errors (both accommodations and backoffice)
- All 6 target files exist and are functional
- Dependencies installed in package.json
- Both dashboard pages (room + legacy booking code) integrate documents
- Backoffice has urgency dashboard and per-booking document section
