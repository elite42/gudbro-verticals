# Phase 28: Document Upload + Visa Tracking - Research

**Researched:** 2026-02-01
**Domain:** File upload (Supabase Storage), image processing (client-side), GDPR-compliant document lifecycle, cron-based auto-deletion
**Confidence:** HIGH

## Summary

This phase adds document upload (passport + visa photos) to the accommodations in-stay dashboard, with visa expiry tracking, reminder notifications, backoffice document management, and GDPR-compliant auto-deletion. The research focused on five domains: (1) Supabase Storage for private document storage with signed URLs, (2) client-side image processing (HEIC conversion + compression), (3) client-side blur detection for photo quality validation, (4) cron job architecture for reminders and auto-deletion, and (5) existing codebase patterns to integrate with.

The codebase already has a well-established pattern for authenticated API routes (JWT via `jose`, `getSupabaseAdmin()` service role client), a Vercel cron job for pre-arrival emails, and the `VisaStatusCard` component which currently shows visa-free exemption info based on nationality. Phase 28 replaces the estimated visa status with actual uploaded document data.

**Primary recommendation:** Use Supabase Storage private bucket with server-side upload via API route (avoiding Vercel's 4.5MB body limit by using `createSignedUploadUrl` for direct client-to-Supabase upload). Use a Vercel cron job for both visa reminders and GDPR auto-deletion, consolidating into a single daily cron endpoint. Use canvas-based Laplacian variance for client-side blur detection (zero dependencies).

## Standard Stack

### Core (Already in project)

| Library                 | Version | Purpose                                   | Why Standard                                                                           |
| ----------------------- | ------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| `@supabase/supabase-js` | ^2.39.0 | Storage API (upload, signed URLs, delete) | Already installed, provides `storage.from().upload()`, `createSignedUrl()`, `remove()` |
| `jose`                  | ^6.0.8  | JWT verification for guest tokens         | Already installed, used by all stay API routes                                         |
| `date-fns`              | ^3.3.1  | Date arithmetic for expiry calculations   | Already installed, used by VisaStatusCard                                              |
| `next`                  | 14.2.33 | API routes for upload + cron endpoints    | Already installed                                                                      |

### New Dependencies

| Library                     | Version | Purpose                                        | Why Needed                                                                                                                             |
| --------------------------- | ------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `browser-image-compression` | ^2.0.2  | Client-side JPEG/PNG compression before upload | Reduces upload size (target: <500KB per photo). 390K weekly downloads, well-maintained. Uses Web Workers for non-blocking compression. |
| `heic2any`                  | ^0.0.4  | Convert iPhone HEIC photos to JPEG in browser  | iPhones default to HEIC format. 80+ dependents, standard choice for browser HEIC conversion.                                           |

### No New Dependencies Needed For

| Capability         | Approach                                                     | Why No Library                                                                    |
| ------------------ | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Blur detection     | Canvas + Laplacian variance (50 lines of code)               | Simple math on pixel data, no library needed. Revolut uses same approach for KYC. |
| Progress bar       | CSS `width` transition + Tailwind colors                     | Already have this pattern in existing `VisaStatusCard.tsx`                        |
| Camera capture     | `<input type="file" accept="image/*" capture="environment">` | Native HTML5 attribute, opens camera on mobile                                    |
| Push notifications | Not in v1 scope                                              | Use in-app alerts first; push requires service worker setup (separate phase)      |

**Installation:**

```bash
cd apps/accommodations/frontend
pnpm add browser-image-compression heic2any
```

**Note:** `heic2any` has no TypeScript types bundled. Add a declaration file:

```typescript
// types/heic2any.d.ts
declare module 'heic2any' {
  interface Options {
    blob: Blob;
    toType?: string;
    quality?: number;
    multiple?: boolean;
  }
  export default function heic2any(options: Options): Promise<Blob | Blob[]>;
}
```

## Architecture Patterns

### Recommended File Structure

```
apps/accommodations/frontend/
├── app/api/stay/[code]/documents/
│   ├── route.ts              # GET (list) + POST (initiate upload)
│   └── [docId]/route.ts      # GET (signed URL) + DELETE
├── app/api/stay/[code]/documents/upload-url/
│   └── route.ts              # POST → returns signed upload URL
├── app/api/cron/
│   ├── pre-arrival-emails/route.ts  # existing
│   └── document-lifecycle/route.ts  # NEW: reminders + auto-delete
├── components/stay/
│   ├── VisaStatusCard.tsx     # MODIFY: use real uploaded data
│   ├── DocumentUpload.tsx     # NEW: upload flow with camera
│   ├── DocumentConsent.tsx    # NEW: GDPR consent checkbox
│   └── VisaExpiryAlert.tsx    # NEW: dismissable progress bar
├── lib/
│   ├── image-utils.ts         # NEW: HEIC conversion + compression + blur check
│   └── stay-api.ts            # MODIFY: add document API functions
└── types/
    └── stay.ts                # MODIFY: add document types
```

### Pattern 1: Signed Upload URL Flow (Client → Server → Supabase)

**What:** Two-step upload — API route creates a signed upload URL, client uploads directly to Supabase Storage.
**When to use:** For file uploads that may exceed Vercel's 4.5MB serverless function body limit.
**Why:** iPhone photos can be 3-8MB. Even after compression, some may exceed limits. Signed URLs bypass the server entirely for the actual file transfer.

```
Client                    API Route                   Supabase Storage
  │                          │                              │
  ├── POST /documents ──────►│                              │
  │   {type, fileName}       │                              │
  │                          ├── createSignedUploadUrl() ──►│
  │                          │◄── {signedUrl, path, token} ─┤
  │◄── {signedUrl, docId} ──┤                              │
  │                          │                              │
  ├── PUT signedUrl ─────────┼─────────────────────────────►│
  │   (file binary)          │                              │
  │                          │                              │
  ├── POST /documents/confirm►│                              │
  │   {docId, visaExpiry?}   │── UPDATE accom_guest_docs ──►│
  │◄── {success} ───────────┤                              │
```

**Example:**

```typescript
// Server: API route creates signed upload URL
// Source: Supabase docs - createSignedUploadUrl
const supabase = getSupabaseAdmin();
const filePath = `${bookingId}/${docType}/${fileName}`;
const { data, error } = await supabase.storage
  .from('guest-documents')
  .createSignedUploadUrl(filePath);
// Returns: { signedUrl, path, token }

// Client: uploads directly to Supabase
const { error } = await supabase.storage
  .from('guest-documents')
  .uploadToSignedUrl(data.path, data.token, file);
```

### Pattern 2: Server-Side Signed Download URLs for Owner Access

**What:** Owner never gets direct storage URLs. API route generates time-limited signed URLs.
**When to use:** Private bucket documents that owners need to view/download.

```typescript
// Server: Generate signed URL valid for 5 minutes
const { data, error } = await supabase.storage
  .from('guest-documents')
  .createSignedUrl(filePath, 300); // 5 min expiry
// Returns: { signedUrl }
```

### Pattern 3: Client-Side Image Processing Pipeline

**What:** Before upload, process image: detect HEIC → convert → compress → blur check.
**When to use:** Every document upload.

```typescript
// lib/image-utils.ts
async function processDocumentImage(file: File): Promise<{
  blob: Blob;
  isBlurry: boolean;
  blurScore: number;
}> {
  let blob: Blob = file;

  // Step 1: HEIC conversion (iPhone photos)
  if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
    const heic2any = (await import('heic2any')).default;
    blob = (await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.85,
    })) as Blob;
  }

  // Step 2: Compress (target < 500KB, max dimension 2048px)
  const imageCompression = (await import('browser-image-compression')).default;
  const compressed = await imageCompression(
    new File([blob], file.name, { type: blob.type }),
    {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 2048,
      useWebWorker: true,
      preserveExif: false, // No EXIF needed for document photos
    }
  );

  // Step 3: Blur detection via Canvas + Laplacian
  const blurScore = await detectBlur(compressed);

  return { blob: compressed, isBlurry: blurScore < 100, blurScore };
}
```

### Pattern 4: Vercel Cron for Document Lifecycle

**What:** Single daily cron handles both visa reminders and GDPR auto-deletion.
**When to use:** Consolidate into one cron to stay within Vercel plan limits.
**Why:** Hobby plan = 2 cron jobs max. Already using 1 for pre-arrival emails. This is the second.

```typescript
// GET /api/cron/document-lifecycle
// Schedule: 0 9 * * * (daily at 09:00 UTC)
// 1. Find bookings with visa expiring in 7 or 3 days → send reminders
// 2. Find checked-out bookings past retention period → delete documents + storage files
```

### Pattern 5: Database Schema for Document Tracking

**What:** New `accom_guest_documents` table linked to bookings.
**Storage path convention:** `{booking_id}/{doc_type}/{timestamp}.jpg`

```sql
CREATE TABLE accom_guest_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('passport', 'visa')),
  storage_path TEXT NOT NULL,           -- path in Supabase Storage bucket
  file_size_bytes INTEGER,
  visa_expiry_date DATE,                -- NULL for passport, required for visa
  consent_given_at TIMESTAMPTZ NOT NULL, -- GDPR: when guest gave consent
  consent_text_hash TEXT NOT NULL,       -- hash of consent text version shown
  registered_with_authorities BOOLEAN DEFAULT false, -- owner marks this
  registered_at TIMESTAMPTZ,
  reminder_sent_7d BOOLEAN DEFAULT false,
  reminder_sent_3d BOOLEAN DEFAULT false,
  deleted_at TIMESTAMPTZ,               -- soft-delete timestamp (set by cron)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Anti-Patterns to Avoid

- **Storing files in database BYTEA columns:** Use Supabase Storage, not the database. Document images are 100KB-2MB each.
- **Public storage bucket for documents:** These are sensitive PII. Must be private bucket with signed URLs only.
- **Client-side storage access with anon key:** Guest has no Supabase auth session. All storage operations go through API routes using service role.
- **Relying on `pg_cron` for deletion:** While `pg_cron` can delete DB rows, it cannot delete Storage objects directly. Use Vercel cron + `supabase.storage.from().remove()`.
- **Storing EXIF data:** Document photos may contain GPS coordinates. Strip EXIF before storage (`preserveExif: false` in browser-image-compression).

## Don't Hand-Roll

| Problem                 | Don't Build                 | Use Instead                                      | Why                                                                                        |
| ----------------------- | --------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| HEIC to JPEG conversion | Manual libheif WASM         | `heic2any`                                       | HEIC decoding is complex, requires WASM. heic2any wraps libheif correctly.                 |
| Image compression       | Canvas resize + toBlob      | `browser-image-compression`                      | Handles Web Worker offloading, iterative quality reduction to hit target size, edge cases. |
| Signed URLs             | Custom pre-signed URL logic | `supabase.storage.createSignedUrl()`             | Supabase handles URL signing, expiration, and bucket-level security.                       |
| File upload progress    | Custom XHR with progress    | `browser-image-compression` onProgress + fetch   | Compression progress is the slow part; upload to signed URL is fast for <500KB.            |
| Date calculations       | Manual day arithmetic       | `date-fns` `differenceInCalendarDays`, `addDays` | Already in project, handles timezone edge cases.                                           |

**Key insight:** The upload flow has three genuinely complex parts (HEIC conversion, image compression, signed URL auth). All three have established solutions. The rest (blur detection, progress bar, consent UI) is straightforward custom code.

## Common Pitfalls

### Pitfall 1: iPhone HEIC Detection by MIME Type Only

**What goes wrong:** iPhone photos sometimes report `image/jpeg` MIME type even when the actual file is HEIC (especially when taken in "Most Compatible" camera mode or shared via certain apps).
**Why it happens:** iOS does not consistently set the MIME type for HEIC files, especially in web contexts.
**How to avoid:** Check BOTH `file.type` AND `file.name` extension. Also check the first bytes (magic number) if both fail: HEIC starts with `ftyp` at offset 4.
**Warning signs:** Upload works in dev but fails on iPhone Safari with "unsupported format" errors.

### Pitfall 2: Vercel Serverless Body Size Limit (4.5MB)

**What goes wrong:** Direct file upload to API route fails for large photos.
**Why it happens:** Vercel Serverless functions limit request body to 4.5MB (not configurable).
**How to avoid:** Use the signed upload URL pattern — client compresses the image, then uploads directly to Supabase Storage via the signed URL. The API route only handles metadata (tiny JSON payloads).
**Warning signs:** 413 Payload Too Large errors in production but not in local dev.

### Pitfall 3: GDPR Consent Version Tracking

**What goes wrong:** Consent text changes but existing consents reference old version. Legal challenge: "I never agreed to THAT text."
**Why it happens:** Consent text evolves (legal review, translation updates).
**How to avoid:** Hash the consent text shown to the user and store the hash alongside the `consent_given_at` timestamp. Keep a version history of consent texts.
**Warning signs:** Legal audit asks "what exactly did the user consent to?" and you can't answer.

### Pitfall 4: Storage Path Collisions on Re-upload

**What goes wrong:** Guest re-uploads a visa (renewal) but old file path gets overwritten, losing audit trail.
**Why it happens:** Using predictable paths like `{bookingId}/visa.jpg`.
**How to avoid:** Include timestamp in path: `{bookingId}/visa/{timestamp}.jpg`. Mark old document as superseded in DB, but retain file until retention period.
**Warning signs:** Owner downloads visa photo and sees the old one, or loses the original.

### Pitfall 5: Cron Job Deletes Files But Not DB Records (or Vice Versa)

**What goes wrong:** Storage files deleted but DB records remain (showing broken images) or DB records deleted but orphan files linger in storage.
**Why it happens:** Partial failure in the deletion sequence.
**How to avoid:** Delete storage file FIRST, then mark DB record as deleted. If storage delete fails, skip that record and retry next cron run. Log all deletion operations.
**Warning signs:** "File not found" errors when owner tries to view document, or storage costs growing despite retention policy.

### Pitfall 6: Camera Capture on Desktop Browsers

**What goes wrong:** `capture="environment"` attribute causes the file picker to open camera on desktop, which has no rear camera concept and may fail.
**Why it happens:** The `capture` attribute behavior varies across browsers and devices.
**How to avoid:** Only add `capture` attribute on mobile devices (detect via user agent or media query). On desktop, show a standard file picker with accept="image/\*".
**Warning signs:** Desktop users can't select files because camera dialog opens and fails.

## Code Examples

### Client-Side Blur Detection (Laplacian Variance)

```typescript
// Source: Revolut's canvas-based approach for KYC
// https://medium.com/revolut/canvas-based-javascript-blur-detection-b92ab1075acf
async function detectBlur(file: File | Blob): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Scale down for faster processing (max 300px)
      const scale = Math.min(1, 300 / Math.max(img.width, img.height));
      const w = Math.floor(img.width * scale);
      const h = Math.floor(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);

      const imageData = ctx.getImageData(0, 0, w, h);
      const grey = new Float64Array(w * h);

      // Convert to greyscale
      for (let i = 0; i < w * h; i++) {
        const r = imageData.data[i * 4];
        const g = imageData.data[i * 4 + 1];
        const b = imageData.data[i * 4 + 2];
        grey[i] = 0.299 * r + 0.587 * g + 0.114 * b;
      }

      // Apply Laplacian kernel [0,1,0,1,-4,1,0,1,0]
      let sum = 0;
      let sumSq = 0;
      let count = 0;
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const val =
            grey[(y - 1) * w + x] +
            grey[y * w + (x - 1)] +
            -4 * grey[y * w + x] +
            grey[y * w + (x + 1)] +
            grey[(y + 1) * w + x];
          sum += val;
          sumSq += val * val;
          count++;
        }
      }

      // Variance of Laplacian — higher = sharper
      const mean = sum / count;
      const variance = sumSq / count - mean * mean;

      URL.revokeObjectURL(img.src);
      resolve(variance);
    };
    img.src = URL.createObjectURL(
      file instanceof File ? file : new File([file], 'doc.jpg')
    );
  });
}

// Usage:
// score > 500 = sharp (good)
// score 100-500 = acceptable
// score < 100 = blurry (warn user)
```

### Camera Input with Mobile Detection

```typescript
// Source: HTML5 spec + codebase pattern
function DocumentCaptureInput({ onFile }: { onFile: (file: File) => void }) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="flex flex-col gap-3">
      {/* Primary: Camera (mobile only) */}
      {isMobile && (
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#3D8B87] px-4 py-3 text-white">
          <Camera size={20} weight="bold" />
          <span>Take Photo</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
        </label>
      )}

      {/* Fallback: File picker */}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E8E2D9] px-4 py-3 text-[#8B7355]">
        <ImageSquare size={20} />
        <span>{isMobile ? 'Choose from Gallery' : 'Select Photo'}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/heic,image/heif"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
      </label>
    </div>
  );
}
```

### Supabase Storage Bucket Creation (Migration)

```sql
-- Create private bucket for guest documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'guest-documents',
  'guest-documents',
  false,  -- PRIVATE: all access via signed URLs
  5242880, -- 5MB max (compressed images should be <500KB)
  '{"image/jpeg","image/png","image/webp"}'
);

-- RLS: Only service role can access (no anon, no authenticated direct access)
-- All access goes through API routes using getSupabaseAdmin()
-- No RLS policies needed on storage.objects for this bucket
-- because we use service_role key exclusively
```

### Consent Component Pattern

```typescript
// Following GDPR: explicit consent with transparent info
interface DocumentConsentProps {
  onConsent: (consentHash: string) => void;
  language: string; // guest's language
}

const CONSENT_TEXT = {
  en: {
    checkbox:
      'I consent to the processing of my passport/visa documents for temporary residence registration with local authorities.',
    disclaimer:
      'Your documents will be stored securely and shared only with the property owner for legal registration purposes. Documents are automatically deleted {days} days after checkout. You can request early deletion after checkout.',
  },
  // ... other languages
};

// Hash for version tracking
function hashConsent(text: string): string {
  // Simple hash — not cryptographic, just version tracking
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  }
  return `v1-${Math.abs(hash).toString(36)}`;
}
```

## State of the Art

| Old Approach                          | Current Approach                                       | When Changed                             | Impact                                          |
| ------------------------------------- | ------------------------------------------------------ | ---------------------------------------- | ----------------------------------------------- |
| Server-side file upload via API route | Signed upload URLs (client → storage direct)           | Supabase JS v2 (2023)                    | Bypasses serverless body limits, faster uploads |
| `pg_cron` for storage cleanup         | Vercel Cron + SDK `remove()`                           | N/A (Supabase Storage has no SQL delete) | Must use HTTP API to delete storage objects     |
| Manual EXIF stripping                 | `browser-image-compression` with `preserveExif: false` | v2.0 (2024)                              | Automatic EXIF removal during compression       |

**Not yet available (deferred):**

- Supabase Storage object lifecycle policies (like S3): Requested in [Discussion #20171](https://github.com/orgs/supabase/discussions/20171), not implemented yet. Must use cron for auto-deletion.
- Web Push API without service worker: Still requires service worker. Push notifications deferred to future phase.

## Open Questions

1. **Vercel Cron Plan Limits**
   - What we know: Hobby plan = 2 cron jobs, 1 invocation/day each. Pro plan = 40 crons. Currently using 1 cron (pre-arrival emails).
   - What's unclear: Is the project on Hobby or Pro plan? If Hobby, we can use the second slot. If we need more crons later, we'll need to consolidate.
   - Recommendation: Consolidate document lifecycle (reminders + deletion) into a single cron job. If plan is Hobby, this uses the last available slot.

2. **OCR for Photo Quality Validation Scope**
   - What we know: Context says "OCR for photo quality validation only" — detect blurry photos, wrong page.
   - What's unclear: How sophisticated should "wrong page detection" be? Detecting "this is not a document" is different from "this is a passport bio page vs a random page."
   - Recommendation: For v1, use blur detection only (Laplacian variance). "Wrong page" detection would require ML/OCR service (e.g., Google Vision, AWS Textract) which adds cost and complexity. Flag this as a v2 enhancement. The blur check alone provides significant value.

3. **Push Notification Infrastructure**
   - What we know: Context mentions "in-app + push notifications." The codebase has no push notification infrastructure.
   - What's unclear: Whether to invest in service worker + Web Push API setup in this phase.
   - Recommendation: Start with in-app notifications only (banner on dashboard load + email via Resend). Push notifications require service worker registration, VAPID keys, and permission prompts — significant infrastructure that deserves its own phase.

4. **Multi-Visa Support**
   - What we know: Guest can upload visa renewals (only new visa page needed, passport already on file).
   - What's unclear: Should old visa records be kept when a new one is uploaded? What about the progress bar — does it switch to the new expiry date?
   - Recommendation: Keep old visa records (marked as `superseded`), always show the latest visa's expiry on the dashboard. Owner can see document history per guest.

## Sources

### Primary (HIGH confidence)

- **Supabase Storage Docs** — [Private buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [Access Control](https://supabase.com/docs/guides/storage/security/access-control), [createSignedUploadUrl](https://supabase.com/docs/reference/javascript/storage-from-createsigneduploadurl), [uploadToSignedUrl](https://supabase.com/docs/reference/javascript/storage-from-uploadtosignedurl)
- **Codebase analysis** — Existing patterns from `apps/accommodations/frontend/`: API routes (`/api/stay/verify/route.ts`, `/api/cron/pre-arrival-emails/route.ts`), types (`types/stay.ts`), auth (`lib/auth.ts`), Supabase client (`lib/supabase.ts`), stay API (`lib/stay-api.ts`), existing VisaStatusCard component
- **Supabase Extensions** — `pg_cron` (v1.6.4), `pg_net` (v0.19.5), `http` (v1.6) available but not yet installed

### Secondary (MEDIUM confidence)

- [browser-image-compression npm](https://www.npmjs.com/package/browser-image-compression) — 392K weekly downloads, v2.0.2
- [heic2any npm](https://www.npmjs.com/package/heic2any) — v0.0.4, 80+ dependents, last published ~3 years ago (stable, no changes needed)
- [Revolut: Canvas-based blur detection](https://medium.com/revolut/canvas-based-javascript-blur-detection-b92ab1075acf) — KYC image quality validation pattern
- [Vercel Cron Jobs Limits](https://vercel.com/docs/cron-jobs/usage-and-pricing) — Hobby: 2 jobs max, 1/day; Pro: 40 jobs, unlimited
- [Supabase Discussion #20171](https://github.com/orgs/supabase/discussions/20171) — Object expiration not yet supported natively
- [Medium: Signed URL uploads with Next.js](https://medium.com/@olliedoesdev/signed-url-file-uploads-with-nextjs-and-supabase-74ba91b65fe0) — Pattern for bypassing serverless body limits

### Tertiary (LOW confidence)

- [blur-detector-js GitHub](https://github.com/pop123123123/blur-detector-js) — Alternative blur detection library (not needed, custom is simpler)
- [GaryAustin supa-file-helper](https://github.com/GaryAustin1/supa-file-helper) — SQL-based storage cleanup via pg_cron (interesting but we use Vercel cron instead)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — All libraries verified via npm, Supabase docs confirmed API methods
- Architecture: HIGH — Patterns verified against existing codebase (`stay-api.ts`, `auth.ts`, `cron/pre-arrival-emails`) and Supabase docs
- Pitfalls: HIGH — HEIC detection, body size limits, and GDPR consent tracking are well-documented issues in file upload systems
- Blur detection: MEDIUM — Laplacian variance approach is standard in computer vision but threshold tuning will need empirical testing with real passport/visa photos

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable domain, no fast-moving dependencies)
