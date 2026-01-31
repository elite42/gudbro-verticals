# Technology Stack: Frictionless Guest Access

**Project:** GUDBRO Accommodations -- QR-based frictionless access, progressive auth, document upload
**Researched:** 2026-01-31
**Overall Confidence:** HIGH

---

## Key Finding: Zero New Dependencies for Core Features

The frictionless QR routing, progressive authentication, and owner-configurable security levels require **no new npm packages**. They are architectural changes to the existing auth system using `jose` (JWT), Next.js middleware, and Supabase RLS. The only genuinely new library needs are for document/passport photo upload and HEIC image conversion.

---

## Current Stack Inventory (Relevant to This Milestone)

These already exist in `apps/accommodations/frontend/package.json` and are the foundation:

| Package                 | Version | Role in This Milestone                                            |
| ----------------------- | ------- | ----------------------------------------------------------------- |
| `jose`                  | ^6.0.8  | JWT signing/verification -- will extend with two-tier token types |
| `@supabase/supabase-js` | ^2.39.0 | Database queries, Storage uploads, RLS enforcement                |
| `qrcode`                | ^1.5.4  | QR generation (backoffice side, already exists)                   |
| `next`                  | 14.2.33 | Middleware for QR routing, API routes for token issuance          |
| `date-fns`              | ^3.3.1  | Token expiry calculations, checkout date checks                   |

**jose note:** The project uses jose ^6.0.8. Current latest is 6.1.3 (verified via npm). No upgrade needed -- ^6.0.8 already resolves to 6.1.x. The `SignJWT` and `jwtVerify` APIs used in `lib/auth.ts` are stable across jose 6.x.

---

## Feature-by-Feature Stack Requirements

### 1. Room-Based QR Routing (Scan -> Immediate Dashboard)

**New packages needed: NONE**

**What changes:**

- **Next.js Middleware** (`middleware.ts`): Intercept `/checkin/{propertyId}/{roomId}` routes. Currently these URLs exist in QR codes (see `AccomQRGenerator.tsx` line 94) but route to a check-in verification page. The middleware will instead issue a "browse-level" JWT and redirect directly to the stay dashboard.
- **New API route** `/api/stay/room-access`: Takes `propertyId` + `roomId`, looks up the active booking for that room (today's date), issues a limited JWT. No guest input required.
- **New SECURITY DEFINER function** in Supabase: `get_active_booking_for_room(p_property_id UUID, p_room_id UUID)` -- returns booking data for the room if check-in <= today <= check-out+24h. This replaces the current `verify_booking_access()` which requires lastName.

**Why no new packages:**

- QR codes already encode `https://stays.gudbro.com/checkin/{propertyId}/{roomId}` (verified in `AccomQRGenerator.tsx`)
- Next.js middleware handles route interception natively
- jose handles JWT issuance with custom claims
- Supabase RPC handles the room-to-booking lookup

**Architecture decision:** The QR URL format stays the same. The behavior changes server-side. This means existing printed QR codes continue to work -- a critical requirement for hospitality where QR codes are physically printed and placed in rooms.

**Confidence:** HIGH -- all code paths verified in codebase.

---

### 2. Progressive Authentication (Two-Tier JWT)

**New packages needed: NONE**

**What changes to `lib/auth.ts`:**

Currently there is one token type: `GuestTokenPayload` with `{ bookingId, propertyId, checkoutDate }`. This token is issued after booking code + last name verification.

The new system introduces **two token levels**:

| Level      | Name           | Issued When             | Contains                                                                        | Allows                                                             |
| ---------- | -------------- | ----------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `browse`   | Browse token   | QR scan (automatic)     | `{ propertyId, roomId, bookingId, level: 'browse', checkoutDate }`              | View dashboard, WiFi, info, deals, contact host                    |
| `verified` | Verified token | Guest verifies identity | `{ propertyId, roomId, bookingId, level: 'verified', guestName, checkoutDate }` | All browse actions + place orders, make payments, upload documents |

**Implementation with existing `jose`:**

```typescript
// Extended payload -- backwards compatible
export interface GuestTokenPayload {
  bookingId: string;
  propertyId: string;
  roomId?: string; // NEW: for room-scoped tokens
  checkoutDate: string;
  level: 'browse' | 'verified'; // NEW: auth level
  guestName?: string; // NEW: only in verified tokens
}
```

The `signGuestToken()` and `verifyGuestToken()` functions in `lib/auth.ts` already use jose's `SignJWT` and `jwtVerify`. Adding claims to the payload requires zero library changes.

**API route protection pattern:**

```typescript
// In any API route that requires verified access:
const payload = await verifyGuestToken(token);
if (payload.level !== 'verified') {
  return NextResponse.json({ error: 'verification_required' }, { status: 403 });
}
```

**Frontend hook change (`useStaySession.ts`):**

- Add `authLevel: 'browse' | 'verified' | null` to session state
- Add `upgrade()` method that triggers the verification flow (booking code + last name)
- When guest tries a paid action with browse-level token, show inline verification prompt

**Confidence:** HIGH -- verified existing auth code, jose API supports arbitrary claims.

---

### 3. Owner-Configurable Security Levels

**New packages needed: NONE**

**What changes (database only):**

Add column to `accom_properties`:

```sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS guest_security_level TEXT NOT NULL DEFAULT 'progressive'
    CHECK (guest_security_level IN ('open', 'progressive', 'strict'));
```

| Level         | Behavior                                             | Use Case                          |
| ------------- | ---------------------------------------------------- | --------------------------------- |
| `open`        | QR scan -> full dashboard, no verification ever      | Small guesthouses, trust-based    |
| `progressive` | QR scan -> browse dashboard, verify for paid actions | Default, recommended              |
| `strict`      | QR scan -> verification required before ANY access   | Hotels with security requirements |

**Implementation:** The `/api/stay/room-access` endpoint reads `guest_security_level` from the property and issues the appropriate token level. No new packages. Pure business logic in the API route.

**Backoffice UI:** A simple radio group in property settings. Uses existing Radix UI components.

**Confidence:** HIGH -- straightforward column addition and conditional logic.

---

### 4. Multi-Zone WiFi Display

**New packages needed: NONE**

**What changes (database only):**

Currently `accom_properties` has single-value WiFi: `wifi_ssid TEXT, wifi_password TEXT`.

Replace with a JSONB column for multiple zones:

```sql
ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS wifi_zones JSONB NOT NULL DEFAULT '[]';

-- Example data:
-- [
--   { "name": "Lobby", "ssid": "Hotel_Lobby", "password": "welcome123" },
--   { "name": "Pool Area", "ssid": "Hotel_Pool", "password": "swim456" },
--   { "name": "Room 203", "ssid": "Room203_5G", "password": "guest789" }
-- ]
```

**Keep existing `wifi_ssid` and `wifi_password` columns** for backward compatibility. The frontend `WifiCard.tsx` component checks `wifi_zones` first; if empty, falls back to the single `wifi_ssid`/`wifi_password`.

**Frontend:** The existing `WifiCard.tsx` component gets an accordion/tabs UI for multiple zones. Uses existing Radix UI primitives (`@radix-ui/react-accordion` or simple state toggle). Currently only `@radix-ui/react-dialog` and `@radix-ui/react-slot` are installed. Recommend adding `@radix-ui/react-accordion` for the multi-zone display.

| Package                     | Version | Purpose                   | Why                                                            |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------- |
| `@radix-ui/react-accordion` | ^1.2.3  | Expandable WiFi zone list | Accessible, keyboard-navigable, matches existing Radix pattern |

**Alternative:** Could use simple `useState` toggle instead of adding another Radix package. Given the minimal component needs, a custom disclosure component with `<details>/<summary>` HTML would also work and add zero bytes to the bundle.

**Recommendation:** Use native `<details>/<summary>` elements styled with Tailwind. Do NOT add `@radix-ui/react-accordion` for a single use case. If more accordion patterns emerge later, add it then.

**Confidence:** HIGH -- straightforward JSONB column, no new packages needed.

---

### 5. Passport/Visa Document Upload with Photo Capture

**New packages needed: 2 (one required, one recommended)**

This is the only feature that genuinely requires new dependencies.

#### Required: Image Compression

| Package                     | Version | Purpose                                     | Why                                                                                                                                                                |
| --------------------------- | ------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `browser-image-compression` | ^2.0.2  | Client-side image compression before upload | Passport photos from phone cameras are 3-8MB. Supabase Storage standard upload limit is 6MB. Must compress to ~1MB before upload. Runs in WebWorker, non-blocking. |

**Verified:** Latest version is 2.0.2 (published ~3 years ago but stable, 248 dependents, actively used). No newer alternative needed -- the API is simple and the library works.

**Source:** [npm: browser-image-compression](https://www.npmjs.com/package/browser-image-compression)

#### Recommended: HEIC Conversion

| Package    | Version | Purpose                                       | Why                                                                                                                             |
| ---------- | ------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `heic2any` | ^0.0.4  | Convert iPhone HEIC photos to JPEG in browser | iPhones shoot HEIC by default. Many guests will use iPhones. Without this, HEIC uploads silently fail or show as broken images. |

**Verified:** Latest version is 0.0.4 (stable, 80 dependents). Alternative `heic-to` tracks libheif more closely but has fewer users.

**Source:** [npm: heic2any](https://www.npmjs.com/package/heic2any)

#### Camera Capture: NO Library Needed

The browser's native `navigator.mediaDevices.getUserMedia()` API handles camera access. On mobile (the primary use case), the simpler approach is an `<input type="file" accept="image/*" capture="environment">` HTML element, which opens the native camera app directly. No JavaScript camera library needed.

```tsx
// Simple, works on all mobile browsers:
<input
  type="file"
  accept="image/jpeg,image/png,image/heic,image/heif"
  capture="environment"
  onChange={handleFileSelect}
/>
```

This is more reliable than `getUserMedia()` on mobile because:

- Works in all mobile browsers including in-app WebViews (Instagram, Facebook, LINE)
- Uses the native camera UI (familiar to users)
- Handles permissions natively
- Returns a File object directly (no canvas intermediate step)

**Source:** [MDN: Media Capture](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos)

#### Storage: Supabase Storage (No New Package)

Documents upload to a **private** Supabase Storage bucket. The `@supabase/supabase-js` client already supports `.storage.from('bucket').upload()`.

**Bucket configuration:**

- Bucket name: `guest-documents`
- Public: `false` (private -- documents contain passport data)
- File size limit: 5MB (after client-side compression)
- Allowed MIME types: `image/jpeg, image/png, application/pdf`
- Folder structure: `{propertyId}/{bookingId}/{documentType}-{timestamp}.jpg`

**RLS policy:** Only the API route (using service role key) can write. Guests cannot directly access the bucket. The API route validates the guest JWT before uploading.

**Signed URLs:** For owner access in backoffice, use `supabase.storage.from('guest-documents').createSignedUrl(path, 3600)` (1-hour expiry).

**What NOT to add:**

- Do NOT add Uppy or Dropzone. Overkill for a single-file passport upload. A simple `<input type="file">` with a preview is sufficient.
- Do NOT add Tesseract.js or any OCR library. Visa expiry date extraction should be manual entry by the guest. OCR on passport photos is unreliable (glare, angles, varied formats) and adds 10MB+ to the bundle.
- Do NOT add sharp or any server-side image processing. Client-side compression via `browser-image-compression` is sufficient. If server-side processing is needed later, use a Supabase Edge Function.

**Confidence:** HIGH for architecture, MEDIUM for heic2any (stable but old, test on target devices).

---

### 6. QR Lifecycle (Deactivation After Checkout)

**New packages needed: NONE**

**What changes:**

The QR deactivation is purely a **backend/database concern**. The QR codes themselves are static URLs (they never change). What changes is what happens when someone scans an expired QR:

1. **`/api/stay/room-access`** checks if there's an active booking for the room today
2. If no active booking -> return a friendly "No active stay" page (not a 404)
3. If booking status is `checked_out` -> return "Your stay has ended" with a link to rebook

**Vercel Cron (already exists):** The project already has a cron job at `/api/cron/pre-arrival-emails/route.ts`. Add a companion cron `/api/cron/checkout-cleanup` that:

- Marks bookings as `checked_out` when `check_out_date < today` and status is still `checked_in`
- This automatically "deactivates" the QR because `get_active_booking_for_room()` only returns bookings with valid dates

**No new packages needed.** The existing Vercel cron infrastructure and Supabase queries handle this.

**Confidence:** HIGH -- pattern already exists in codebase.

---

## Complete Installation Command

```bash
# From apps/accommodations/frontend/

# Document upload (only genuinely new dependencies)
pnpm add browser-image-compression@^2.0.2 heic2any@^0.0.4

# Dev dependencies
pnpm add -D @types/heic2any
```

**Total new direct dependencies: 2**
**Total new dev dependencies: 1 (if types exist; verify with `npm info @types/heic2any`)**

Note: `heic2any` may not have published types. If not, create a local declaration file:

```typescript
// types/heic2any.d.ts
declare module 'heic2any' {
  interface HeicToAnyOptions {
    blob: Blob;
    toType?: string;
    quality?: number;
    gifInterval?: number;
  }
  export default function heic2any(
    options: HeicToAnyOptions
  ): Promise<Blob | Blob[]>;
}
```

---

## What NOT to Add (and Why)

| Library/Service             | Why NOT                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `next-auth` / `auth.js`     | Guest auth is JWT-based via jose. Adding a full auth framework for a two-tier token system is massive overkill.                                                    |
| `tesseract.js` (OCR)        | Passport OCR is unreliable on phone photos (glare, angles). Manual date entry is faster and more accurate. Adds 10MB+ to bundle.                                   |
| `uppy` / `react-dropzone`   | Single-file passport upload needs a simple `<input type="file">`. Drag-and-drop zones make no sense on mobile (primary device).                                    |
| `sharp` (image processing)  | Server-side image processing is not needed. Client-side compression handles the size issue.                                                                        |
| `@radix-ui/react-accordion` | WiFi zones can use native `<details>/<summary>` HTML. Don't add a package for one component.                                                                       |
| `nanoid` / `uuid`           | UUIDs are generated by Supabase (`gen_random_uuid()`). No need for client-side ID generation.                                                                      |
| `qrcode.react`              | QR generation happens in backoffice only (already has `qrcode` package). The accommodations frontend only **scans** QR codes -- the browser handles this natively. |
| `zxing-js` (QR scanner)     | Guests don't scan QR codes in the app. They scan physical QR codes with their phone camera, which opens the URL in the browser. No in-app scanner needed.          |
| Middleware auth library     | Next.js middleware with `jose.jwtVerify()` handles route protection. No need for a wrapper library.                                                                |

---

## Environment Variables (No New Ones)

All features use existing environment variables:

```env
# Already configured
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GUEST_JWT_SECRET=...
```

**No new API keys or services required.** This is a major advantage of the architectural approach -- frictionless access is achieved by restructuring the auth flow, not by adding external services.

---

## Database Changes Summary

| Change                                       | Table              | Type            | Migration           |
| -------------------------------------------- | ------------------ | --------------- | ------------------- |
| Add `guest_security_level` column            | `accom_properties` | ALTER TABLE     | New migration       |
| Add `wifi_zones` JSONB column                | `accom_properties` | ALTER TABLE     | Same migration      |
| Add `get_active_booking_for_room()` function | N/A                | CREATE FUNCTION | Same migration      |
| Add `guest-documents` storage bucket         | Supabase Storage   | Bucket creation | Manual or migration |
| Add `accom_guest_documents` table            | New table          | CREATE TABLE    | Same migration      |

The `accom_guest_documents` table:

```sql
CREATE TABLE IF NOT EXISTS accom_guest_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('passport', 'visa', 'id_card', 'other')),
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- Visa-specific
    visa_expiry_date DATE,
    visa_type TEXT,
    -- Metadata
    notes TEXT
);
```

---

## Version Compatibility Matrix

| Package                   | Version | React 18         | Next.js 14 | TypeScript 5 | Notes                                   |
| ------------------------- | ------- | ---------------- | ---------- | ------------ | --------------------------------------- |
| jose                      | ^6.0.8  | N/A (server)     | Yes        | Yes          | Already installed, no change            |
| browser-image-compression | ^2.0.2  | N/A (vanilla JS) | Yes        | Yes          | WebWorker-based                         |
| heic2any                  | ^0.0.4  | N/A (vanilla JS) | Yes        | Needs .d.ts  | May need local type declaration         |
| @supabase/supabase-js     | ^2.39.0 | N/A (server)     | Yes        | Yes          | Already installed, Storage API included |

---

## Sources

- [npm: jose v6.1.3](https://www.npmjs.com/package/jose) -- verified latest, ^6.0.8 resolves correctly (HIGH confidence)
- [npm: browser-image-compression v2.0.2](https://www.npmjs.com/package/browser-image-compression) -- verified latest (HIGH confidence)
- [npm: heic2any v0.0.4](https://www.npmjs.com/package/heic2any) -- verified latest (MEDIUM confidence -- stable but old)
- [Supabase Storage docs](https://supabase.com/docs/guides/storage/uploads/standard-uploads) -- standard upload for files <=6MB (HIGH confidence)
- [Supabase Storage RLS](https://supabase.com/docs/guides/storage) -- private bucket patterns (HIGH confidence)
- [MDN: Media Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos) -- camera access via getUserMedia (HIGH confidence)
- Existing codebase: `lib/auth.ts` (jose JWT), `hooks/useStaySession.ts` (session management), `AccomQRGenerator.tsx` (QR URL format), `077-accommodations-schema.sql` (DB schema) -- all verified by direct code reading (HIGH confidence)
