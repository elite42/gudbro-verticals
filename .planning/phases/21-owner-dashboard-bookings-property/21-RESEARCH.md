# Phase 21: Owner Dashboard - Bookings & Property - Research

**Researched:** 2026-01-31
**Domain:** Next.js backoffice dashboard (booking management, room CRUD, QR code generation)
**Confidence:** HIGH

## Summary

Phase 21 builds an owner-facing dashboard within the existing backoffice app (`apps/backoffice/`) for managing accommodation bookings, rooms, and QR codes. The research reveals that **all required infrastructure already exists** in the codebase: database schema (migrations 077, 083, 084), API patterns (ADMIN_API_KEY auth), dashboard bookings page in accommodations PWA (reusable as reference), QR generation library (`qrcode` ^1.5.4 already installed), and WhatsApp deep-link pattern (used in BookingConfirmation component).

The primary work is **porting and enhancing** existing patterns from `apps/accommodations/frontend/app/dashboard/` into the backoffice app with proper multi-tenant context, richer UI (tab filtering, detail panel, status actions), and adding room CRUD + QR generation pages.

**Primary recommendation:** Build on existing backoffice patterns (ChargesManager for room CRUD, partnership bookings for tab UI, orders page for status management), reuse the `qrcode` library already installed, and follow the ADMIN_API_KEY auth pattern established in Phase 19-20.

## Standard Stack

### Core (Already Installed)

| Library               | Version     | Purpose            | Why Standard                                                      |
| --------------------- | ----------- | ------------------ | ----------------------------------------------------------------- |
| Next.js               | 14.2.33     | Framework          | Already in use, App Router                                        |
| @supabase/supabase-js | (installed) | Database client    | Already used for all data access                                  |
| qrcode                | ^1.5.4      | QR code generation | Already installed in backoffice, used by `lib/qr/qr-generator.ts` |
| @phosphor-icons/react | (installed) | Icons              | Project standard per CLAUDE.md                                    |
| Tailwind CSS          | (installed) | Styling            | Project standard                                                  |

### Supporting (Already Installed)

| Library            | Version     | Purpose                 | When to Use                 |
| ------------------ | ----------- | ----------------------- | --------------------------- |
| jsPDF + svg2pdf.js | (installed) | PDF export for QR codes | Print-friendly QR output    |
| lucide-react       | (installed) | Legacy icons            | Only in existing components |

### Alternatives Considered

| Instead of           | Could Use               | Tradeoff                                                                                                                                                                                                                                    |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `qrcode` (installed) | `qrcode.react` (v4.2.0) | qrcode.react renders SVG/Canvas components directly in React. However, `qrcode` is already installed AND has a full QR system built around it (`lib/qr/qr-generator.ts`, `components/qr/QRPreview.tsx`). **Use existing `qrcode` library.** |
| Custom slide-over    | Radix Dialog            | Radix is available but a dedicated page is simpler for the amount of booking detail content. **Use dedicated page with back navigation.**                                                                                                   |

**Installation:** No new packages needed. Everything is already installed.

## Architecture Patterns

### Recommended Project Structure

```
apps/backoffice/
├── app/(dashboard)/
│   └── accommodations/               # NEW section
│       ├── bookings/
│       │   ├── page.tsx               # Booking list with tabs & search
│       │   └── [id]/
│       │       └── page.tsx           # Booking detail + actions
│       ├── rooms/
│       │   └── page.tsx               # Room CRUD (ChargesManager pattern)
│       ├── settings/
│       │   └── page.tsx               # Property settings (booking mode, policies)
│       └── qr-codes/
│           └── page.tsx               # Property & room QR generation
├── app/api/accommodations/            # NEW API routes
│   ├── bookings/
│   │   ├── route.ts                   # GET list, POST actions (confirm/decline/checkin/checkout/cancel)
│   │   └── [id]/
│   │       └── route.ts              # GET detail, PATCH status change
│   ├── rooms/
│   │   └── route.ts                   # GET list, POST create, PUT update, DELETE deactivate
│   └── property/
│       └── route.ts                   # GET settings, PUT update
└── components/accommodations/         # NEW components
    ├── BookingStatusBadge.tsx          # Reusable status badge
    ├── BookingActions.tsx              # Contextual action buttons
    ├── BookingTimeline.tsx             # Status change history
    ├── RoomManager.tsx                # Room CRUD (follows ChargesManager)
    └── AccomQRGenerator.tsx           # Property/room QR generation
```

### Pattern 1: Tab-Based Filtering (from partnerships/bookings)

**What:** Tab navigation with counts for status filtering
**When to use:** Booking list page with All | Pending | Confirmed | Checked-in | Cancelled tabs
**Example:**

```typescript
// Source: apps/backoffice/app/(dashboard)/partnerships/bookings/page.tsx
const [activeTab, setActiveTab] = useState<
  'all' | 'pending' | 'confirmed' | 'checked_in' | 'cancelled'
>('all');

const filteredBookings = useMemo(() => {
  if (activeTab === 'all') return bookings;
  return bookings.filter((b) => b.status === activeTab);
}, [bookings, activeTab]);

const counts = useMemo(
  () => ({
    all: bookings.length,
    pending: bookings.filter(
      (b) => b.status === 'pending' || b.status === 'pending_payment'
    ).length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    checked_in: bookings.filter((b) => b.status === 'checked_in').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }),
  [bookings]
);
```

### Pattern 2: CRUD Manager (from ChargesManager)

**What:** List + inline add/edit with toggle/deactivate. Section-based, collapsible.
**When to use:** Room management page
**Example:**

```typescript
// Source: apps/backoffice/components/settings/ChargesManager.tsx
// Key pattern: editingId state, form data, save/delete handlers
const [editingId, setEditingId] = useState<string | null>(null);
const [isAdding, setIsAdding] = useState(false);

// API pattern: single endpoint with method switching
const saveRoom = async (room: RoomFormData, id?: string) => {
  const response = await fetch('/api/accommodations/rooms', {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ merchantId, ...(id ? { id } : {}), ...room }),
  });
};
```

### Pattern 3: ADMIN_API_KEY Auth (from accommodations dashboard)

**What:** Simple API key authentication for owner-only endpoints
**When to use:** All `/api/accommodations/*` routes in backoffice
**Example:**

```typescript
// Source: apps/accommodations/frontend/app/api/dashboard/bookings/route.ts
const adminApiKey = process.env.ADMIN_API_KEY;
if (!adminApiKey) {
  return NextResponse.json(
    { error: 'Server configuration error' },
    { status: 500 }
  );
}
if (!key || key !== adminApiKey) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### Pattern 4: Status Badges with Color Coding (from existing dashboard)

**What:** Consistent status badge rendering with semantic colors
**When to use:** Booking status and payment status display
**Example:**

```typescript
// Source: apps/accommodations/frontend/app/dashboard/bookings/page.tsx
const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  pending_payment: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800',
  checked_in: 'bg-blue-100 text-blue-800',
  checked_out: 'bg-gray-100 text-gray-600',
  no_show: 'bg-gray-100 text-gray-600',
};
```

### Pattern 5: WhatsApp Deep Link (from BookingConfirmation)

**What:** Pre-formatted wa.me URL for owner notification
**When to use:** New booking notification to owner
**Example:**

```typescript
// Source: apps/accommodations/frontend/components/booking/BookingConfirmation.tsx
const whatsappPhone = hostWhatsapp?.replace(/[^0-9]/g, '');
const whatsappMessage = encodeURIComponent(
  `New booking ${bookingCode} from ${guestName}. Check-in: ${checkIn}, Check-out: ${checkOut}.`
);
const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;
```

### Anti-Patterns to Avoid

- **Don't create a separate app for owner dashboard:** The context says it lives in `apps/backoffice/`, not in the accommodations PWA
- **Don't use Supabase client directly in components:** Use API routes with ADMIN_API_KEY for all data access (server-side Supabase admin client)
- **Don't hard-delete rooms:** Use `is_active` soft-delete to preserve booking history integrity
- **Don't build a custom QR component from scratch:** Reuse existing `lib/qr/qr-generator.ts` and `components/qr/QRPreview.tsx`
- **Don't implement server-side WhatsApp Business API:** Use client-side wa.me deep links as specified

## Don't Hand-Roll

| Problem              | Don't Build              | Use Instead                                         | Why                                                               |
| -------------------- | ------------------------ | --------------------------------------------------- | ----------------------------------------------------------------- |
| QR code generation   | Custom canvas rendering  | `qrcode` lib + existing `lib/qr/qr-generator.ts`    | Full QR system already exists with preview, download, export      |
| QR PNG download      | Custom canvas-to-PNG     | `generateQRDataUrl()` from `lib/qr/qr-generator.ts` | Already handles size presets, error correction, design options    |
| PDF print for QR     | Custom layout            | `jsPDF` + `svg2pdf.js` already integrated           | Print-ready output already solved                                 |
| Status badge styling | Per-component color maps | Shared `BookingStatusBadge` component               | Already have color maps in accommodations dashboard, extract once |
| Date formatting      | Custom date functions    | Existing `formatDate()` patterns                    | Multiple implementations exist in codebase                        |
| Price formatting     | String concatenation     | `formatPrice()` from accommodations                 | Already handles minor units + currency                            |

**Key insight:** This phase is 90% assembly of existing patterns and 10% new code. The biggest risk is rebuilding what already exists.

## Common Pitfalls

### Pitfall 1: Auth Context Mismatch

**What goes wrong:** Accommodations dashboard uses ADMIN_API_KEY via URL params, but backoffice uses TenantContext + AuthContext
**Why it happens:** The accommodations dashboard was built as standalone; backoffice has its own auth system
**How to avoid:** In backoffice API routes, use the backoffice auth pattern (TenantContext provides merchantId). For accommodations-specific queries, use Supabase admin client to query `accom_properties` by `owner_id` matching the authenticated user's account. If no property exists, show "No accommodation configured" empty state.
**Warning signs:** 401 errors, missing propertyId, queries returning empty

### Pitfall 2: Property-to-Merchant Mapping

**What goes wrong:** Backoffice operates on `merchant_id` (from locations table) but accommodations uses `property_id` + `owner_id` (from accounts table)
**Why it happens:** Two different entity models — F&B merchants vs accommodation owners
**How to avoid:** Need a lookup step: authenticated user -> account -> owner_id -> accom_properties. Cache the property_id in component state after first lookup. Consider adding a helper function `getOwnerProperty(accountId)`.
**Warning signs:** "No property found" despite owner having one configured

### Pitfall 3: Booking Status Transition Validation

**What goes wrong:** Invalid status transitions (e.g., cancelling an already checked-out booking)
**Why it happens:** Status is a state machine but no enforcement exists
**How to avoid:** Define valid transitions explicitly:

```
pending -> confirmed | cancelled
pending_payment -> confirmed | cancelled
confirmed -> checked_in | cancelled
checked_in -> checked_out | cancelled
```

Validate in API route before applying update.
**Warning signs:** Bookings in impossible states, action buttons appearing for wrong statuses

### Pitfall 4: QR Code URL Structure

**What goes wrong:** QR codes point to wrong URLs or non-existent routes
**Why it happens:** URL structure not aligned between QR generation and accommodations PWA routing
**How to avoid:** Property QR -> `stays.gudbro.com/{slug}` (matches existing property page route). Room QR -> `stays.gudbro.com/checkin/{propertyId}/{roomId}` or similar. Verify routes exist in accommodations app before generating QR codes.
**Warning signs:** QR codes scanning to 404 pages

### Pitfall 5: Sidebar Navigation Scope

**What goes wrong:** Adding too many items to an already full sidebar
**Why it happens:** Sidebar already has 12+ top-level items
**How to avoid:** Add "Accommodations" as a single top-level item with sub-pages (Bookings, Rooms, Settings, QR Codes). Only show this section for owners who have a configured property. Use the existing `NavItem` interface with `children` array.
**Warning signs:** Sidebar becomes cluttered, items hard to find

## Code Examples

### Booking List API Route

```typescript
// apps/backoffice/app/api/accommodations/bookings/route.ts
// Source pattern: apps/accommodations/frontend/app/api/dashboard/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const status = searchParams.get('status'); // optional filter

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from('accom_bookings')
    .select(
      `
      id, booking_code, guest_name, guest_last_name, guest_email, guest_phone,
      check_in_date, check_out_date, num_nights, total_price, currency,
      status, payment_method, payment_status, deposit_amount, deposit_percent,
      special_requests, internal_notes, booking_source, created_at,
      room:accom_rooms(id, room_number, room_type)
    `
    )
    .eq('property_id', propertyId)
    .order('check_in_date', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query.limit(200);
  // ... error handling, response
}
```

### Booking Status Action API

```typescript
// apps/backoffice/app/api/accommodations/bookings/[id]/route.ts
// PATCH - Change booking status
const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  pending_payment: ['confirmed', 'cancelled'],
  confirmed: ['checked_in', 'cancelled'],
  checked_in: ['checked_out', 'cancelled'],
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { action, reason } = body; // action: 'confirm'|'decline'|'checkin'|'checkout'|'cancel'

  // Map action to new status
  const statusMap: Record<string, string> = {
    confirm: 'confirmed',
    decline: 'cancelled',
    checkin: 'checked_in',
    checkout: 'checked_out',
    cancel: 'cancelled',
  };

  // Validate transition
  const currentStatus = booking.status;
  const newStatus = statusMap[action];
  if (!VALID_TRANSITIONS[currentStatus]?.includes(newStatus)) {
    return NextResponse.json(
      { error: 'Invalid status transition' },
      { status: 400 }
    );
  }

  // Apply update
  const updateData: Record<string, unknown> = { status: newStatus };
  if (action === 'cancel' || action === 'decline') {
    updateData.internal_notes = reason || null;
  }
  // ... update and respond
}
```

### Room Manager Component Structure

```typescript
// apps/backoffice/components/accommodations/RoomManager.tsx
// Source pattern: apps/backoffice/components/settings/ChargesManager.tsx
interface Room {
  id: string;
  room_number: string;
  room_type: string;
  capacity: number;
  description: string | null;
  base_price_per_night: number;
  currency: string;
  images: string[];
  beds: Array<{ type: string; count: number }>;
  is_active: boolean;
}

// CRUD via /api/accommodations/rooms
// List: GET
// Create: POST
// Update: PUT
// Deactivate: PATCH (set is_active = false)
```

### QR Code Generator for Property/Room

```typescript
// Reuse existing QR infrastructure
import { generateQRDataUrl, SIZE_PRESETS } from '@/lib/qr/qr-generator';

// Property QR
const propertyUrl = `https://stays.gudbro.com/${property.slug}`;
const propertyQR = await generateQRDataUrl(propertyUrl, {
  width: SIZE_PRESETS.medium,
});

// Room QR
const roomUrl = `https://stays.gudbro.com/checkin/${property.id}/${room.id}`;
const roomQR = await generateQRDataUrl(roomUrl, { width: SIZE_PRESETS.medium });

// Download
const link = document.createElement('a');
link.download = `qr-${property.slug}-room-${room.room_number}.png`;
link.href = roomQR;
link.click();
```

## State of the Art

| Old Approach                         | Current Approach                  | When Changed | Impact                                                      |
| ------------------------------------ | --------------------------------- | ------------ | ----------------------------------------------------------- |
| QR in accommodations only            | QR in backoffice with full system | Phase 21     | Owners manage QR from admin dashboard, not guest-facing app |
| Bookings in accommodations dashboard | Bookings in backoffice            | Phase 21     | Centralized owner management, proper auth                   |
| URL param auth (key=...)             | TenantContext + API auth          | Phase 21     | Proper session-based auth for owner actions                 |

**Deprecated/outdated:**

- The `apps/accommodations/frontend/app/dashboard/bookings/page.tsx` will be superseded by the backoffice version, but kept for backward compatibility

## Open Questions

1. **Property-Merchant Relationship**
   - What we know: Backoffice uses `merchant_id` from TenantContext, accommodations uses `property_id` + `owner_id`
   - What's unclear: Is there a direct mapping between merchant (location) and accommodation property? Or do we need a separate lookup?
   - Recommendation: Check if `accom_properties.owner_id` links to the same account that owns the merchant. If yes, query by `owner_id`. If not, may need a linking table or convention.

2. **WhatsApp Notification Trigger Point**
   - What we know: wa.me deep links work for guest-initiated contact (BookingConfirmation)
   - What's unclear: OBOOK-06 says "Owner receives WhatsApp notification on new booking" — this implies push TO the owner, not just a link
   - Recommendation: For v1, show a notification badge in the backoffice dashboard with a "Contact guest via WhatsApp" button. Server-side WhatsApp Business API integration is deferred. Alternatively, use the existing notification-dispatcher system (`apps/backoffice/lib/notifications/notification-dispatcher.ts`) which already has a WhatsApp provider.

3. **Sidebar Visibility Condition**
   - What we know: Not all merchants are accommodation owners
   - What's unclear: How to conditionally show the Accommodations sidebar section only for relevant merchants
   - Recommendation: Check if the authenticated user's account has an `accom_properties` record. If not, hide the section. Could be a simple API check on layout mount.

## Sources

### Primary (HIGH confidence)

- `apps/accommodations/frontend/app/dashboard/bookings/page.tsx` — existing booking list implementation
- `apps/accommodations/frontend/app/api/dashboard/bookings/route.ts` — existing API route pattern
- `apps/accommodations/frontend/app/api/bookings/[id]/payment/route.ts` — ADMIN_API_KEY pattern
- `apps/backoffice/components/settings/ChargesManager.tsx` — CRUD manager pattern (480 lines)
- `apps/backoffice/app/(dashboard)/partnerships/bookings/page.tsx` — tab filtering pattern (490 lines)
- `apps/backoffice/components/layout/Sidebar.tsx` — navigation structure with NavItem interface
- `apps/backoffice/lib/qr/qr-generator.ts` — existing QR generation with `qrcode` ^1.5.4
- `shared/database/migrations/schema/077-accommodations-schema.sql` — base schema (accom_properties, accom_rooms, accom_bookings)
- `shared/database/migrations/schema/083-accommodations-v2-foundation.sql` — v2 extensions (pricing, payment, status)
- `shared/database/migrations/schema/084-payment-config.sql` — deposit, bank transfer, crypto config
- `apps/accommodations/frontend/components/booking/BookingConfirmation.tsx` — WhatsApp wa.me deep link pattern

### Secondary (MEDIUM confidence)

- `apps/backoffice/lib/notifications/notification-dispatcher.ts` — existing notification system with WhatsApp provider
- `apps/backoffice/app/(dashboard)/qr-codes/page.tsx` — full QR management page in backoffice

### Tertiary (LOW confidence)

- [qrcode.react npm](https://www.npmjs.com/package/qrcode.react) — v4.2.0 available but NOT recommended (existing `qrcode` lib is already integrated)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all libraries already installed and in use
- Architecture: HIGH — all patterns exist in codebase, this is assembly work
- Pitfalls: HIGH — derived from actual codebase analysis, real auth/mapping concerns identified

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable — no external dependencies, all internal patterns)
