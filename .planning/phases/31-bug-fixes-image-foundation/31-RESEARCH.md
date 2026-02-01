# Phase 31: Bug Fixes + Image Foundation - Research

**Researched:** 2026-02-01
**Domain:** Accommodations PWA bug fixes, QR code extraction, image upload infrastructure
**Confidence:** HIGH

## Summary

Phase 31 addresses 9 identified bugs in the accommodations PWA plus establishes image upload infrastructure. Research focused on understanding the exact root cause of each bug by reading the actual source files, identifying the minimal fix for each, and mapping the QR extraction and image upload architecture.

All bugs have clear root causes identified in the code. The QR extraction is straightforward since `qrcode` is already a dependency in accommodations. The image upload infrastructure can reuse the existing backoffice pattern (Supabase Storage + upload API route + ImageUpload component).

**Primary recommendation:** Fix bugs first (plan 31-01), then build image infrastructure (plan 31-02). Each bug is isolated and can be fixed independently. No new npm packages needed.

## Standard Stack

### Core (already in codebase)

| Library                   | Version   | Purpose                                               | Already In                  |
| ------------------------- | --------- | ----------------------------------------------------- | --------------------------- |
| qrcode                    | ^1.5.4    | QR code generation (PNG/SVG)                          | accommodations package.json |
| browser-image-compression | ^2.0.2    | Client-side image compression                         | accommodations package.json |
| heic2any                  | ^0.0.4    | HEIC to JPEG conversion                               | accommodations package.json |
| @shared/payment           | workspace | formatPrice(), SUPPORTED_CURRENCIES, detectCurrency() | shared/payment/             |
| @phosphor-icons/react     | existing  | Phosphor Icons for bottom nav                         | accommodations              |

### Not Needed

| Library         | Why Not                                                              |
| --------------- | -------------------------------------------------------------------- |
| jspdf           | Only needed for PDF export in backoffice QR, not for WiFi QR display |
| svg2pdf.js      | Same - backoffice only                                               |
| Any new package | Zero new npm packages constraint from STATE.md                       |

**Installation:** None required. All dependencies already present.

## Architecture Patterns

### Bug Fix Locations (Plan 31-01)

Each bug maps to specific files with identified root causes:

#### BUG-01: Guest Name Duplication

- **Root cause:** `apps/accommodations/frontend/app/api/stay/verify/route.ts` line 136: `guestName: \`${bookingData.guest_name} ${bookingData.guest_last_name}\``concatenates first + last name. Then`WelcomeCard.tsx`line 17:`booking.guestName.split(' ')[0]`extracts first name. The DB likely stores first name in`guest_name`but the concatenation creates "John Smith" which displays correctly. The BUG says "John Smith Smith" -- this means`guest_name`already contains the full name (e.g., "John Smith") and then`guest_last_name` appends "Smith" again.
- **Fix location:** `apps/accommodations/frontend/app/api/stay/verify/route.ts` line 136 AND `apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts` line 237 (same pattern in both verify routes).
- **Fix approach:** Check if `guest_name` already contains a space (full name) vs just first name. If it does, don't append `guest_last_name`. Or simply construct properly: use `guest_name` as first name and `guest_last_name` as last name, ensuring no duplication.
- **Confidence:** HIGH - both verify routes have identical code.

#### BUG-02: Bottom Nav Tabs Not Working

- **Root cause:** `BottomNav.tsx` uses inline SVG icons (not Phosphor). The `handleTabChange` in the InStayDashboard (line 81-89) only handles the `services` tab specially. Other tabs (`map`, `menu`, `profile`) just set `activeTab` but the page renders the same home content regardless -- there are no conditional renders for different tabs.
- **Fix location:** `apps/accommodations/frontend/app/stay/[code]/page.tsx` (InStayDashboard) -- add tab-based content switching. Also `BottomNav.tsx` -- replace inline SVGs with Phosphor icons.
- **Fix approach:** Add conditional rendering in the dashboard based on `activeTab`. For now, Map/Profile can show placeholder content. Menu tab triggers `onMenuToggle`. Replace SVG icons with Phosphor: `House`, `MapPin`, `SquaresFour`, `Briefcase`, `UserCircle`.
- **Confidence:** HIGH - direct code inspection.

#### BUG-03: Homepage Text Wall Instead of Visual Cards

- **Root cause:** The homepage layout in InStayDashboard renders sections linearly (WifiCard, WelcomeCard, VisaStatusCard, QuickActions, RestaurantSection, ServicesCarousel, etc.) without visual card containers. Most sections are bare content without rounded card wrappers.
- **Fix location:** `apps/accommodations/frontend/app/stay/[code]/page.tsx` -- wrap sections in card containers.
- **Fix approach:** Wrap each major section in a card container (`rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm`) similar to the documents section pattern already used in the same file (line 198).
- **Confidence:** HIGH - visual layout issue.

#### BUG-04: Icon Name Prefix in Category Names

- **Root cause:** The `icon` column in `accom_service_categories` table stores Phosphor icon names (e.g., "CookingPot"). The `ServiceCatalog.tsx` `getCategoryIcon()` function (line 31-34) returns the raw icon string if present. The `ServicesCarousel.tsx` line 118 renders `{cat.name}` directly. The BUG description says "CookingPot Breakfast" -- this suggests the `name` field in the DB was populated with the icon name prepended to the category name, OR the icon and name are being concatenated somewhere in the UI/seed data.
- **Fix location:** Check seed data in `shared/database/migrations/schema/078-accommodations-seed.sql` for how categories are seeded. Fix either the DB data or the rendering logic in `ServiceCatalog.tsx` and `ServicesCarousel.tsx`.
- **Fix approach:** The `getCategoryIcon()` function in ServiceCatalog returns the icon string as-is (it treats it as emoji). If the DB stores Phosphor icon names like "CookingPot", the function should map them to emojis or render Phosphor icons. Need to either: (a) store emoji in the DB icon field, or (b) add an icon-name-to-component mapping in the frontend.
- **Confidence:** MEDIUM - need to verify the actual DB seed data to confirm root cause.

#### BUG-05: Time Format "07:00:00 - 10:30:00"

- **Root cause:** The `available_from` and `available_until` columns are TIME type in PostgreSQL (stored as HH:MM:SS). The API route `services/route.ts` line 101-102 passes them through as-is: `availableFrom: (item.available_from as string) || null`. The `ServiceItemCard.tsx` line 96 renders `{item.availableFrom} - {item.availableUntil}` without formatting.
- **Fix location:** `apps/accommodations/frontend/components/stay/ServiceItemCard.tsx` line 96.
- **Fix approach:** Add a `formatTime()` helper that converts "07:00:00" to "7:00 AM" and renders as "7:00 - 10:30 AM". Use `Intl.DateTimeFormat` or simple string manipulation.
- **Confidence:** HIGH - PostgreSQL TIME type returns HH:MM:SS strings.

#### BUG-06: Grey Placeholder Instead of Product Images

- **Root cause:** Service items have `image: string | null` in the API response. The DB column `image_url TEXT` stores URLs but most items likely have `null`. The `ServiceItemCard.tsx` fallback (line 62-64) shows a Package icon on grey background. This is correct behavior when no image exists. The real fix is OWN-02 (image upload) which will populate these URLs.
- **Fix location:** For now, improve the fallback placeholder to look better. The actual fix is the image upload feature (plan 31-02).
- **Confidence:** HIGH - the items simply lack image URLs.

#### BUG-07: Currency Selector Missing

- **Root cause:** `DashboardHeader.tsx` line 50-69 has a "Language selector placeholder" button that does nothing. There is no currency selector.
- **Fix location:** `apps/accommodations/frontend/components/stay/DashboardHeader.tsx` -- replace language placeholder with currency selector.
- **Fix approach:** Add a currency dropdown using `SUPPORTED_CURRENCIES` from `@shared/payment`. Store selected currency in localStorage. Pass selected currency through to price-formatting components. Use `formatPrice()` from `@shared/payment` or the existing local `formatPrice()` in ServiceItemCard/ServicesCarousel.
- **Per AUDIT-03:** Use `@shared/payment` directly, NOT copy the currency converter pattern.
- **Confidence:** HIGH - clear architectural decision from Phase 30 audit.

#### BUG-08: WiFi QR Code Missing

- **Root cause:** `WifiCard.tsx` has copy-password buttons but no QR code. The `qrcode` library is already in accommodations' package.json. The backoffice `qr-types.ts` has `generateWiFiString()` which creates the standard WIFI: QR format.
- **Fix location:** `apps/accommodations/frontend/components/stay/WifiCard.tsx` -- add QR code display.
- **Fix approach per AUDIT-02:** Extract `generateWiFiString()` and `WiFiConfig` type to a shared location (e.g., `shared/utils/qr/`). Then in WifiCard, use `qrcode` library to generate a QR data URL from the WiFi string and render as `<img>`.
- **Confidence:** HIGH - straightforward QR generation with existing library.

#### BUG-09: Room Image Upload in Backoffice

- **Root cause:** `apps/backoffice/components/accommodations/RoomManager.tsx` line 482-485 has a hardcoded "Image upload coming soon" placeholder.
- **Fix location:** `apps/backoffice/components/accommodations/RoomManager.tsx` -- replace placeholder with actual image upload.
- **Fix approach:** Reuse the existing `ImageUpload` component from `apps/backoffice/components/ui/image-upload.tsx`. Add a new folder config for room images. Store URLs in the room's `images` JSONB array (already defined in the Room interface, line 19).
- **Confidence:** HIGH - pattern exists in backoffice.

### QR Extraction Pattern (INF-02)

**Current location:** `apps/backoffice/lib/qr/`
**Extraction target:** `shared/utils/qr/`

Files to extract:

1. `generateWiFiString()` + `WiFiConfig` type + `escapeWiFiValue()` -- needed by WiFi QR in PWA
2. `generateQRDataUrl()` -- the core QR generation function (uses `qrcode` library)
3. `QRDesign`, `DEFAULT_QR_DESIGN` -- design types

Files to leave in backoffice:

1. `qr-service.ts` -- CRUD operations, uses `@/lib/supabase-admin`
2. Export presets, material presets -- backoffice-specific
3. PDF/SVG export functions -- uses `jspdf`, `svg2pdf.js` (not in accommodations deps)

**Key dependency issue:** The `qr-generator.ts` imports `jsPDF` and `svg2pdf.js` which are NOT in accommodations package.json. The shared extraction must only include the `generateQRDataUrl()` function (PNG generation using `qrcode` library) and the WiFi string generator. The PDF/SVG export functions stay in backoffice.

### Image Upload Pattern (OWN-02)

**Existing pattern in backoffice:**

1. `apps/backoffice/components/ui/image-upload.tsx` -- Client component with drag/drop
2. `apps/backoffice/app/api/upload/image/route.ts` -- Server route: validates, uploads to Supabase Storage `brand-assets` bucket
3. Folder-based organization within the bucket (staff/, menu/, categories/, etc.)

**For accommodations Phase 31:**

1. Create new Supabase Storage bucket: `property-images` (or reuse `brand-assets` with new subfolder)
2. Add folder configs: `room-images`, `service-items`
3. Create upload API route in backoffice (room/service images are managed by owners)
4. Extend `ImageUploadFolder` type to include new folders
5. No need for a separate table -- room images go into `accom_rooms.images` JSONB array, service item images go into `accom_service_items.image_url` TEXT column

**DB columns already exist:**

- `accom_rooms.images` -- JSONB, already defined (line 19 of RoomManager interface shows `images: string[]`)
- `accom_service_items.image_url` -- TEXT, defined in migration 077

## Don't Hand-Roll

| Problem               | Don't Build                     | Use Instead                                          | Why                                    |
| --------------------- | ------------------------------- | ---------------------------------------------------- | -------------------------------------- |
| QR code generation    | Canvas-based QR renderer        | `qrcode` library (already in deps)                   | Error correction, encoding standards   |
| WiFi QR string format | Custom string builder           | `generateWiFiString()` from backoffice (extract)     | Special char escaping, standard format |
| Currency formatting   | Custom formatter                | `@shared/payment` formatPrice() or Intl.NumberFormat | Locale handling, decimal places        |
| Image compression     | Server-side processing          | `browser-image-compression` (already in deps)        | WebWorker support, EXIF stripping      |
| Time formatting       | Regex-based string manipulation | `Intl.DateTimeFormat` or simple slice                | Locale-aware AM/PM handling            |
| Image upload UI       | New upload component            | Extend existing `ImageUpload` from backoffice        | Drag/drop, progress, error handling    |

## Common Pitfalls

### Pitfall 1: Guest Name Field Inconsistency

**What goes wrong:** The `guest_name` DB column may contain just first name or full name depending on how the booking was created (direct entry vs import).
**Why it happens:** No validation on whether `guest_name` is first-name-only or full-name.
**How to avoid:** Make the guestName construction defensive: trim both fields, check for duplication before concatenating. Consider: `const fullName = guest_last_name && !guest_name.includes(guest_last_name) ? \`${guest_name} ${guest_last_name}\` : guest_name`.
**Warning signs:** Names displaying as "John Smith Smith" or "John John".

### Pitfall 2: QR Code Size on Mobile

**What goes wrong:** QR code renders too large or too small on different phone screens.
**Why it happens:** Fixed pixel dimensions don't account for viewport width.
**How to avoid:** Use responsive sizing (e.g., `w-32 h-32` with Tailwind, which is 128px -- good for scanning). Set QR generation width to 256px (small preset) for crisp rendering at 2x density.

### Pitfall 3: Currency State Not Persisting

**What goes wrong:** User selects currency, navigates away, comes back to default.
**Why it happens:** Currency preference stored in React state only.
**How to avoid:** Use localStorage for persistence. The coffeeshop pattern (`currency-preferences.ts`) does this well. For accommodations, a simpler approach: `localStorage.getItem('preferred-currency')` with fallback to property currency.

### Pitfall 4: Image Upload to Wrong Bucket

**What goes wrong:** Upload succeeds but URL is inaccessible because bucket policies don't allow public read.
**Why it happens:** Supabase Storage buckets need explicit public access configuration.
**How to avoid:** Either use the existing `brand-assets` bucket (already configured) with new subfolder paths, or create `property-images` bucket with public read policy. Verify the bucket policy allows `SELECT` for `anon` role.

### Pitfall 5: Bottom Nav Tab State vs URL State

**What goes wrong:** Tab state is lost on page refresh because it's in React state, not URL.
**Why it happens:** Current implementation uses `useState('home')`.
**How to avoid:** For v1.5, keeping it in React state is fine since the dashboard is a single page. Don't over-engineer with URL params. But ensure tab state persists through catalog/cart overlay open/close.

### Pitfall 6: Service Category Icon Field Ambiguity

**What goes wrong:** The `icon` TEXT column stores either emoji ("🍳") or Phosphor icon names ("CookingPot") depending on how the data was entered.
**Why it happens:** No validation or convention on the icon field format.
**How to avoid:** Create a mapping function that handles both formats: if the string matches a known Phosphor icon name, render the Phosphor component; if it's a short string (1-2 chars), treat as emoji. Alternatively, normalize all icon values to emoji in the seed data.

## Code Examples

### WiFi QR Code Generation (for WifiCard.tsx)

```typescript
// Source: backoffice/lib/qr/qr-types.ts (to be extracted to shared)
function escapeWiFiValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/:/g, '\\:')
    .replace(/,/g, '\\,');
}

export function generateWiFiString(config: {
  ssid: string;
  password: string;
  security?: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}): string {
  const { ssid, password, security = 'WPA', hidden = false } = config;
  return `WIFI:T:${security};S:${escapeWiFiValue(ssid)};P:${escapeWiFiValue(password)};H:${hidden};;`;
}

// In WifiCard.tsx -- generate QR data URL
import QRCode from 'qrcode';

const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

useEffect(() => {
  const wifiString = generateWiFiString({ ssid, password });
  QRCode.toDataURL(wifiString, {
    width: 256,
    margin: 2,
    errorCorrectionLevel: 'M',
  }).then(setQrDataUrl);
}, [ssid, password]);

// Render
{qrDataUrl && <img src={qrDataUrl} alt="WiFi QR Code" className="h-32 w-32 rounded-xl" />}
```

### Currency Selector Pattern (for DashboardHeader.tsx)

```typescript
// Source: @shared/payment
import { SUPPORTED_CURRENCIES, formatPrice } from '@shared/payment';

// Simple localStorage persistence
function useCurrencyPreference(defaultCurrency: string) {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferred-currency') || defaultCurrency;
    }
    return defaultCurrency;
  });

  const updateCurrency = (code: string) => {
    setCurrency(code);
    localStorage.setItem('preferred-currency', code);
  };

  return { currency, updateCurrency };
}
```

### Time Formatting (for ServiceItemCard.tsx)

```typescript
// Convert PostgreSQL TIME "07:00:00" to "7:00 AM"
function formatServiceTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Usage: "7:00 - 10:30 AM" format
function formatTimeRange(from: string, until: string): string {
  const fromFormatted = formatServiceTime(from);
  const untilFormatted = formatServiceTime(until);
  // If same AM/PM, only show once
  const fromParts = fromFormatted.split(' ');
  const untilParts = untilFormatted.split(' ');
  if (fromParts[1] === untilParts[1]) {
    return `${fromParts[0]} - ${untilFormatted}`;
  }
  return `${fromFormatted} - ${untilFormatted}`;
}
```

### Room Image Upload (extending existing backoffice pattern)

```typescript
// In backoffice/app/api/upload/image/route.ts -- add folder config:
'room-images': {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
  subfolder: 'rooms',
},
'service-items': {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
  subfolder: 'services',
},

// In RoomManager.tsx -- replace placeholder:
import { ImageUpload } from '@/components/ui/image-upload';

<ImageUpload
  value={room.images?.[0] || ''}
  onChange={(url) => handleImageUpdate(room.id, url)}
  folder="room-images"
  entityId={room.id}
  label="Room Photo"
  maxSizeMB={5}
/>
```

## State of the Art

| Old Approach                  | Current Approach                        | When Changed | Impact                           |
| ----------------------------- | --------------------------------------- | ------------ | -------------------------------- |
| Inline SVG icons in BottomNav | Phosphor Icons (already used elsewhere) | Phase 29     | Consistency with rest of app     |
| Text URL for service images   | Direct upload to Supabase Storage       | This phase   | Better UX, no manual URL pasting |
| Copy-only WiFi password       | QR code + copy button                   | This phase   | Universal scanning support       |

## Open Questions

1. **Service Category Icon Format**
   - What we know: DB column is TEXT, stores either emoji or Phosphor icon names
   - What's unclear: What format the seed data actually uses (need to check 078-accommodations-seed.sql)
   - Recommendation: During implementation, check the actual DB values and handle both formats

2. **Supabase Storage Bucket for Property Images**
   - What we know: `brand-assets` bucket exists for F&B. Accommodations needs image storage.
   - What's unclear: Whether to create a new `property-images` bucket or add subfolders to `brand-assets`
   - Recommendation: Create new `property-images` bucket for cleaner separation. The bucket creation is a one-time Supabase dashboard operation.

3. **Currency Selector Scope**
   - What we know: AUDIT-03 says use @shared/payment directly. SUPPORTED_CURRENCIES has 10 currencies.
   - What's unclear: Should converted prices show approximate indicators? Should the selector be in header or a modal?
   - Recommendation: Small dropdown in header, show approximate prices with "~" prefix. Keep it simple.

## Sources

### Primary (HIGH confidence)

- Direct code inspection of all bug-related source files in `/apps/accommodations/frontend/`
- `apps/backoffice/lib/qr/` -- QR generator and types (520 + 249 LOC)
- `shared/payment/` -- payment utils and types (475 LOC)
- `shared/database/migrations/schema/077-accommodations-schema.sql` -- DB schema
- `.planning/phases/30-shared-module-audit/SHARED-MODULE-CATALOG.md` -- module catalog

### Secondary (MEDIUM confidence)

- Backoffice image upload pattern (`apps/backoffice/app/api/upload/image/route.ts` + `components/ui/image-upload.tsx`)

### Tertiary (LOW confidence)

- None -- all findings from direct code inspection

## Metadata

**Confidence breakdown:**

- Bug root causes: HIGH -- direct source code inspection of every affected file
- QR extraction: HIGH -- dependencies verified in package.json, function signatures inspected
- Image upload: HIGH -- existing pattern in backoffice fully documented
- Currency selector: HIGH -- @shared/payment exports verified, AUDIT-03 decision locked

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (stable -- all findings based on current codebase state)
