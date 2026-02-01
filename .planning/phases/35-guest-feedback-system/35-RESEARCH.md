# Phase 35: Guest Feedback System - Research

**Researched:** 2026-02-02
**Domain:** Accommodations guest feedback (in-stay + post-stay), AI pipeline, backoffice dashboard
**Confidence:** HIGH

## Summary

Phase 35 adds two guest feedback channels to the accommodations PWA: (1) in-stay feedback for reporting issues during an active stay, and (2) post-stay structured ratings sent 2-24 hours after checkout. Both feed into a backoffice feedback dashboard with AI-processed tags.

The codebase already has extensive infrastructure to reuse:

- **F&B Feedback Intelligence pipeline** (migration 082, `feedback-intelligence-service.ts`) with GPT-4o-mini processing, tag extraction, task aggregation, and notification lifecycle
- **Photo upload pipeline** (`image-utils.ts` with HEIC conversion + compression, `DocumentUpload.tsx` as UI pattern)
- **Cron job pattern** in `vercel.json` and `/api/cron/pre-arrival-emails/` for the post-checkout trigger
- **Notification queue** (`notification_queue` table with `queue_notification()` RPC) for push to owner
- **Guest JWT auth** with `verifyGuestToken()` and progressive auth tiers (browse vs full)

**Primary recommendation:** Create a new `accom_guest_feedback` table (NOT reuse `customer_feedback` which is F&B-scoped), fork the `feedback-intelligence-service.ts` with an ACCOM_FEEDBACK_TAGS taxonomy, and reuse the existing photo upload + cron patterns verbatim.

## Standard Stack

### Core (Already in Codebase - Zero New Dependencies)

| Library                   | Version | Purpose                      | Why Standard                                     |
| ------------------------- | ------- | ---------------------------- | ------------------------------------------------ |
| Next.js                   | 14.2.33 | API routes + frontend        | Already in use                                   |
| Supabase (PostgreSQL)     | -       | Database + Storage + RLS     | Already in use                                   |
| OpenAI GPT-4o-mini        | -       | AI tag extraction            | Already used in feedback-intelligence-service.ts |
| jose                      | -       | Guest JWT tokens             | Already used in auth.ts                          |
| browser-image-compression | -       | Photo compression            | Already installed (Phase 28)                     |
| heic2any                  | -       | HEIC conversion              | Already installed (Phase 28)                     |
| Phosphor Icons            | -       | UI icons                     | Project standard                                 |
| Resend                    | -       | Post-stay email trigger      | Already configured for pre-arrival emails        |
| date-fns                  | -       | Date math for checkout+hours | Already installed                                |

### Supporting

| Library | Version | Purpose                                          | When to Use                           |
| ------- | ------- | ------------------------------------------------ | ------------------------------------- |
| qrcode  | -       | QR code generation (if needed for feedback link) | Only if feedback needs standalone URL |

### Alternatives Considered

| Instead of                            | Could Use                                        | Tradeoff                                                                                                                                                                                        |
| ------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New `accom_guest_feedback` table      | Reuse `customer_feedback` (migration 024)        | customer_feedback is F&B-scoped with F&B categories; accommodations needs different categories (maintenance, housekeeping, etc.) and property_id/booking_id linkage. Separate table is cleaner. |
| Vercel Cron for post-checkout trigger | Supabase Edge Function or pg_cron                | Vercel Cron is already proven pattern (pre-arrival emails, document lifecycle). Stick with it.                                                                                                  |
| Separate AI service file              | Extend existing feedback-intelligence-service.ts | Fork is better: different tags, different table, different context. Share the OpenAI helper functions.                                                                                          |

**Installation:**

```bash
# No new packages needed. All dependencies already installed.
```

## Architecture Patterns

### Recommended Project Structure

```
apps/accommodations/frontend/
  app/
    api/
      stay/[code]/feedback/
        route.ts              # POST in-stay feedback + GET feedback list
        upload-url/route.ts   # POST signed URL for feedback screenshot
      cron/
        post-checkout-feedback/
          route.ts            # Cron: find checked_out bookings, send feedback email
  components/
    stay/
      FeedbackForm.tsx        # In-stay feedback submission form
      FeedbackCard.tsx        # Dashboard card linking to feedback
      PostStayRating.tsx      # Star rating form (standalone page or bottom sheet)
  lib/
    feedback-api.ts           # Client-side fetch wrappers
  types/
    stay.ts                   # Add feedback types here (existing file)

apps/backoffice/
  app/
    (dashboard)/accommodations/feedback/
      page.tsx                # Feedback dashboard with aggregate + individual responses
  lib/
    ai/
      accom-feedback-service.ts  # Forked AI pipeline with ACCOM_FEEDBACK_TAGS

shared/database/migrations/schema/
  088-accom-guest-feedback.sql   # New migration
```

### Pattern 1: In-Stay Feedback API (following existing document upload pattern)

**What:** Guest submits feedback via POST with JWT auth, optional photo upload via signed URL
**When to use:** All in-stay feedback submissions
**Example:**

```typescript
// POST /api/stay/[code]/feedback
// Follows exact same auth pattern as /api/stay/[code]/documents/upload-url

import { verifyGuestToken } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const authHeader = request.headers.get('authorization');
  const guest = await verifyGuestToken(authHeader!.slice(7));
  // guest.bookingId, guest.propertyId available

  const body = await request.json();
  // { category, message, photoUrl? }

  // Insert into accom_guest_feedback
  // Queue notification to owner via notification_queue
}
```

### Pattern 2: Post-Checkout Cron Trigger (following pre-arrival email pattern)

**What:** Vercel Cron runs every 2 hours, finds bookings checked out 2-24h ago, sends feedback request email
**When to use:** Post-stay feedback trigger
**Example:**

```typescript
// GET /api/cron/post-checkout-feedback
// Follows exact same pattern as /api/cron/pre-arrival-emails

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  // Verify authorization header

  // Find bookings with status='checked_out'
  // AND checked_out_at BETWEEN NOW() - 24h AND NOW() - 2h
  // AND no existing post-stay feedback for this booking

  // Send email via Resend with feedback link
  // Log in accom_email_logs
}
```

### Pattern 3: AI Pipeline Fork (following feedback-intelligence-service.ts)

**What:** Fork the F&B feedback AI pipeline with accommodations-specific taxonomy
**When to use:** Processing in-stay and post-stay feedback through AI
**Example:**

```typescript
// Accommodations-specific tag taxonomy
const ACCOM_FEEDBACK_TAGS = [
  'maintenance',
  'plumbing',
  'electrical',
  'furniture',
  'housekeeping',
  'cleanliness',
  'linens',
  'towels',
  'noise',
  'neighbors',
  'construction',
  'wifi',
  'tv',
  'ac-heating',
  'check-in',
  'check-out',
  'key-access',
  'amenities',
  'kitchen',
  'bathroom',
  'safety',
  'security',
  'pest-control',
  'location',
  'neighborhood',
  'communication',
  'responsiveness',
  'value',
  'pricing',
  'extra-charges',
  'parking',
  'laundry',
  'pool',
  'common-areas',
] as const;
```

### Pattern 4: Photo Upload (reusing DocumentUpload pattern)

**What:** Reuse existing image processing pipeline for feedback screenshots
**When to use:** Optional photo attachment on in-stay feedback
**Example:**

```typescript
// Reuse processDocumentImage from lib/image-utils.ts
// But store in 'feedback-screenshots' bucket instead of 'guest-documents'
// Same signed URL pattern from document upload
const storagePath = `${guest.bookingId}/feedback/${Date.now()}.jpg`;
const { data } = await supabase.storage
  .from('feedback-screenshots')
  .createSignedUploadUrl(storagePath);
```

### Anti-Patterns to Avoid

- **Reusing customer_feedback table:** The F&B table has F&B-specific categories and merchant_id linkage. Accommodations needs property_id + booking_id + room_id + different categories.
- **In-line AI processing in the API route:** AI processing should be async (insert as 'pending', process later). The F&B pipeline does this correctly.
- **Skipping the notification_queue:** Don't send push notifications synchronously. Use the existing `queue_notification()` RPC for async delivery.
- **Creating a new standalone page for in-stay feedback:** It should be a bottom sheet or section within the existing stay dashboard, not a separate page.

## Don't Hand-Roll

| Problem                  | Don't Build               | Use Instead                                                             | Why                                                               |
| ------------------------ | ------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Image compression + HEIC | Custom image pipeline     | `processDocumentImage()` from lib/image-utils.ts                        | Already handles HEIC, EXIF stripping, compression, blur detection |
| Signed upload URLs       | Custom storage logic      | Supabase Storage `createSignedUploadUrl()` pattern from document upload | Already proven, handles auth                                      |
| Notification dispatch    | Direct email/push sends   | `queue_notification()` RPC into notification_queue                      | Async, retry-safe, existing infrastructure                        |
| AI tag extraction        | Custom NLP                | Fork `feedback-intelligence-service.ts` with new taxonomy               | GPT-4o-mini is proven, cost tracked                               |
| Cron job auth            | Custom auth middleware    | CRON_SECRET pattern from pre-arrival-emails                             | Vercel standard, already configured                               |
| Guest authentication     | Custom session management | `verifyGuestToken()` from lib/auth.ts                                   | JWT with booking scope, already handles browse/full tiers         |
| Star rating UI           | Custom star component     | Simple Phosphor Star icon loop                                          | 5 stars, common pattern, don't over-engineer                      |

**Key insight:** This phase is 90% composition of existing patterns. The only truly new things are: (1) the feedback table schema, (2) the ACCOM_FEEDBACK_TAGS taxonomy, and (3) wiring the feedback card into the dashboard grid.

## Common Pitfalls

### Pitfall 1: Mixing guest feedback auth with merchant auth

**What goes wrong:** Using Supabase auth (merchant/backoffice) instead of guest JWT tokens for feedback submission
**Why it happens:** The accommodations guest is NOT a Supabase authenticated user. They use JWT tokens from booking verification.
**How to avoid:** All guest-facing API routes use `verifyGuestToken()` from `@/lib/auth.ts`. The backoffice routes use standard Supabase auth.
**Warning signs:** References to `auth.uid()` in guest-facing routes.

### Pitfall 2: Not handling browse-tier guests

**What goes wrong:** Browse-tier guests (QR scan, no booking verification) try to submit feedback and get cryptic errors
**Why it happens:** In-stay feedback requires a booking context (to link feedback to booking + room + property)
**How to avoid:** Check `requireFullAccess(guest)` and return `verification_required` error with clear UI guidance. Same pattern as document upload.
**Warning signs:** No access tier check in the feedback POST handler.

### Pitfall 3: Post-checkout timing window

**What goes wrong:** Feedback request sent too early (guest still packing) or too late (guest forgot about stay)
**Why it happens:** The checked_out_at timestamp may not exist yet (bookings have status changes but Phase 35 needs to track actual checkout time)
**How to avoid:** The cron needs a reliable `checked_out_at` timestamp. Either add it to `accom_bookings` or use the `check_out_date` + property `check_out_time` as proxy. The 2-24h window from the phase spec should use this timestamp.
**Warning signs:** Using `check_out_date` without considering timezone and check-out time.

### Pitfall 4: Double feedback prevention

**What goes wrong:** Same guest submits multiple post-stay feedback entries, or cron sends multiple emails
**Why it happens:** No deduplication logic
**How to avoid:** Add `UNIQUE(booking_id)` constraint on post-stay feedback type, or at minimum a check before insert. For cron emails, log in `accom_email_logs` with type `post_stay_feedback` (same pattern as pre-arrival).
**Warning signs:** No email log check before sending.

### Pitfall 5: RLS policies blocking guest feedback inserts

**What goes wrong:** Guest can't insert feedback because RLS requires authenticated role
**Why it happens:** Guest JWT is NOT a Supabase auth session. The API route must use `supabaseAdmin` (service role) for inserts, not the anon/authenticated client.
**How to avoid:** All guest feedback inserts go through API routes that use `getSupabaseAdmin()`. RLS policies on the feedback table should have `service_role` full access. Guest never writes directly to Supabase.
**Warning signs:** Using the anon Supabase client for feedback inserts.

### Pitfall 6: Storage bucket not created

**What goes wrong:** Photo upload fails with "bucket not found"
**Why it happens:** The `feedback-screenshots` Supabase Storage bucket needs to be created before use
**How to avoid:** Document bucket creation as a prerequisite task or create it in the migration. The `guest-documents` bucket already exists as reference.
**Warning signs:** No bucket creation step in the plan.

## Code Examples

### Database Schema: accom_guest_feedback table

```sql
-- Source: Derived from existing patterns (migration 024, 082, 077)
CREATE TABLE accom_guest_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Context (property + booking + room)
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES accom_bookings(id) ON DELETE SET NULL,
  room_id UUID REFERENCES accom_rooms(id) ON DELETE SET NULL,

  -- Feedback type: in_stay (during stay) or post_stay (after checkout)
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('in_stay', 'post_stay')),

  -- In-stay: category selection
  category TEXT CHECK (category IN (
    'maintenance', 'housekeeping', 'question', 'complaint', 'compliment', 'other'
  )),

  -- Content
  message TEXT,

  -- Photo attachment (signed URL upload to feedback-screenshots bucket)
  photo_url TEXT,

  -- Post-stay: category star ratings (1-5)
  rating_cleanliness SMALLINT CHECK (rating_cleanliness BETWEEN 1 AND 5),
  rating_location SMALLINT CHECK (rating_location BETWEEN 1 AND 5),
  rating_value SMALLINT CHECK (rating_value BETWEEN 1 AND 5),
  rating_communication SMALLINT CHECK (rating_communication BETWEEN 1 AND 5),
  rating_wifi SMALLINT CHECK (rating_wifi BETWEEN 1 AND 5),
  rating_overall SMALLINT CHECK (rating_overall BETWEEN 1 AND 5),

  -- AI processing (forked from fb_submissions pattern)
  ai_tags TEXT[] DEFAULT '{}',
  ai_sentiment TEXT CHECK (ai_sentiment IN ('positive', 'neutral', 'negative')),
  ai_priority INTEGER CHECK (ai_priority BETWEEN 1 AND 5),
  ai_processed_at TIMESTAMPTZ,

  -- Status tracking (owner response)
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'acknowledged', 'in_progress', 'resolved', 'dismissed'
  )),
  owner_response TEXT,
  responded_at TIMESTAMPTZ,

  -- Guest info (denormalized for easy display)
  guest_name TEXT,
  guest_room_number TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### In-Stay Feedback Form Component Pattern

```typescript
// Source: Following DocumentUpload.tsx step-based UI pattern
// Components: CategorySelector -> TextInput -> optional PhotoCapture -> Submit

type FeedbackStep =
  | 'category'
  | 'details'
  | 'photo'
  | 'submitting'
  | 'done'
  | 'error';

const CATEGORIES = [
  {
    value: 'maintenance',
    label: 'Maintenance',
    icon: Wrench,
    color: '#E07A5F',
  },
  {
    value: 'housekeeping',
    label: 'Housekeeping',
    icon: Broom,
    color: '#3D8B87',
  },
  { value: 'question', label: 'Question', icon: Question, color: '#6366F1' },
  { value: 'complaint', label: 'Complaint', icon: Warning, color: '#DC2626' },
] as const;
```

### Owner Push Notification Pattern

```typescript
// Source: notification_queue pattern from migration 059
// Queue push notification to property owner when in-stay feedback arrives

await supabase.rpc('queue_notification', {
  p_type: 'push',
  p_payload: JSON.stringify({
    title: 'Guest Feedback',
    body: `Room ${roomNumber}: ${category} issue reported`,
    data: { feedbackId, propertyId },
  }),
  p_merchant_id: null, // Not merchant-scoped, use property owner lookup
  p_user_id: ownerId,
  p_priority: category === 'complaint' ? 'high' : 'normal',
});
```

### Post-Stay Rating Form Pattern

```typescript
// Star rating categories matching the database columns
const RATING_CATEGORIES = [
  { key: 'cleanliness', label: 'Cleanliness', icon: Broom },
  { key: 'location', label: 'Location', icon: MapPin },
  { key: 'value', label: 'Value for Money', icon: CurrencyCircleDollar },
  { key: 'communication', label: 'Communication', icon: ChatCircle },
  { key: 'wifi', label: 'WiFi', icon: WifiHigh },
] as const;

// Each renders 5 tappable Star icons (Phosphor)
// Overall rating auto-calculated as average, or separately input
```

## State of the Art

| Old Approach                          | Current Approach                         | When Changed       | Impact                                                   |
| ------------------------------------- | ---------------------------------------- | ------------------ | -------------------------------------------------------- |
| customer_feedback table (F&B generic) | Vertical-specific feedback tables        | Phase 35           | Accommodations gets proper property/booking/room linkage |
| Manual tag assignment                 | AI tag extraction with GPT-4o-mini       | v1.3 (Phase 13-17) | Automated classification, just fork with new taxonomy    |
| Synchronous notification sends        | notification_queue with async processing | Migration 059      | Reliable, retry-safe delivery                            |

**Deprecated/outdated:**

- The `customer_feedback` table (migration 024) should NOT be used for accommodations feedback. It's F&B-scoped.
- The `ai_feedback` table (migration 029) is for AI Co-Manager feedback about the platform, not guest feedback.

## Open Questions

1. **checked_out_at timestamp:**
   - What we know: `accom_bookings` has `status` column with 'checked_out' value, but no explicit `checked_out_at` timestamp
   - What's unclear: Is there a status change timestamp or do we need to add one?
   - Recommendation: Add `checked_out_at TIMESTAMPTZ` to `accom_bookings` (simple ALTER) as part of 35-02. The cron needs this for the 2-24h window.

2. **Feedback link delivery method:**
   - What we know: Post-stay feedback is "triggered 2-24h after checkout"
   - What's unclear: Email only? Or also SMS/WhatsApp? Guest may not have given email.
   - Recommendation: Start with email (Resend, already configured). If no email on booking, use the `notification_queue` with `type: 'sms'` or `channel: 'whatsapp'`. For MVP, email-only is sufficient since `guest_email` exists on bookings.

3. **Feedback card position in dashboard grid:**
   - What we know: Phase 33 created DashboardGrid with feedback card placeholder mentioned in phase context
   - What's unclear: Where exactly the "Feedback" card goes in the grid. Currently grid has: WiFi, Services, House Rules, Documents, Orders, Minibar, Concierge.
   - Recommendation: Add Feedback card after Concierge card in the grid. Use ChatDots or Megaphone Phosphor icon.

4. **Owner notification mechanism:**
   - What we know: Phase context mentions "owner receives push notification"
   - What's unclear: The `notification_queue` has push type but the actual push delivery mechanism (FCM/APNs) may not be implemented yet for the backoffice
   - Recommendation: Use `notification_queue` with `type: 'push'` and `p_priority: 'high'` for complaints. If push delivery isn't wired up yet, fall back to `type: 'in_app'` which just creates a visible notification in the backoffice. Also consider `type: 'webhook'` to a WhatsApp number as fallback.

## Sources

### Primary (HIGH confidence)

- Migration 024 (`024-merchant-followers-feedback.sql`) - customer_feedback table schema and RLS
- Migration 077 (`077-accommodations-schema.sql`) - accom_properties, accom_bookings, accom_rooms schema
- Migration 082 (`082-feedback-intelligence.sql`) - fb_submissions, fb_tasks, AI pipeline schema
- Migration 059 (`059-notification-queue.sql`) - notification_queue and helper functions
- `apps/backoffice/lib/ai/feedback-intelligence-service.ts` - AI processing pipeline with GPT-4o-mini
- `apps/backoffice/lib/feedback/notification-utils.ts` - notification creation helpers
- `apps/accommodations/frontend/lib/auth.ts` - Guest JWT authentication
- `apps/accommodations/frontend/lib/image-utils.ts` - Image processing pipeline
- `apps/accommodations/frontend/components/stay/DocumentUpload.tsx` - Photo upload UI pattern
- `apps/accommodations/frontend/app/api/cron/pre-arrival-emails/route.ts` - Cron job pattern
- `apps/accommodations/frontend/vercel.json` - Cron configuration
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - Dashboard page with grid cards
- `apps/accommodations/frontend/types/stay.ts` - Existing type definitions

### Secondary (MEDIUM confidence)

- Phase context (ROADMAP, STATE.md) describing requirements GXP-02, GXP-03

### Tertiary (LOW confidence)

- None. All findings are from direct codebase inspection.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Everything already exists in the codebase, zero new dependencies
- Architecture: HIGH - All patterns directly observed in existing code (document upload, cron, AI pipeline)
- Pitfalls: HIGH - Based on actual code patterns and auth system analysis
- Database schema: HIGH - Derived from 4 existing migration patterns with same conventions

**Research date:** 2026-02-02
**Valid until:** 2026-03-02 (stable - internal codebase, low churn risk)
