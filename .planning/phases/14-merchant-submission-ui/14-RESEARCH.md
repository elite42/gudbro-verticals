# Phase 14: Merchant Submission UI - Research

**Researched:** 2026-01-30
**Domain:** Next.js backoffice form + Supabase Storage image upload + API routes
**Confidence:** HIGH

## Summary

Phase 14 is a straightforward CRUD UI phase that builds on the Phase 13 database schema (`fb_submissions` table) already in place. The codebase has well-established patterns for every aspect needed: settings page layout, API route structure, image upload via Supabase Storage, form components with Phosphor Icons, toast notifications, and tenant/auth context access.

The primary implementation involves: (1) a feedback submission form page under `/settings/feedback`, (2) two API routes for submission CRUD and screenshot upload, (3) a submission history list below the form. All of these follow existing patterns that are extensively documented in the codebase.

**Primary recommendation:** Follow existing `UsefulNumbersManager` pattern for the form + list combo, reuse the `/api/upload/image` folder config for screenshot uploads, and insert directly into `fb_submissions` table.

## Standard Stack

### Core (Already in codebase)

| Library               | Version     | Purpose                              | Why Standard                                  |
| --------------------- | ----------- | ------------------------------------ | --------------------------------------------- |
| Next.js               | 14.2.33     | App framework, API routes            | Already the project stack                     |
| @supabase/supabase-js | (installed) | Database operations + Storage upload | Already used for all data + all image uploads |
| @phosphor-icons/react | (installed) | UI icons with duotone weight         | Mandated by CLAUDE.md section 8.1             |
| Tailwind CSS          | (installed) | Styling                              | Already used throughout                       |

### Supporting (Already in codebase)

| Library                     | Version  | Purpose                           | When to Use                    |
| --------------------------- | -------- | --------------------------------- | ------------------------------ |
| ToastContext                | internal | Success/error notifications       | After submission, on errors    |
| TenantContext               | internal | Get merchant_id, brand, location  | Context auto-capture           |
| AuthContext                 | internal | Get session, permissions, account | Auth + submitted_by_account_id |
| next/navigation usePathname | Next.js  | Get current page path             | Auto-capture page_path context |

### No New Dependencies Needed

This phase requires zero new packages. Every capability needed is already available.

## Architecture Patterns

### Recommended Project Structure

```
apps/backoffice/
├── app/(dashboard)/settings/feedback/
│   └── page.tsx                          # Page shell (TenantContext + loading)
├── components/settings/
│   └── FeedbackSubmissionManager.tsx      # Form + history list combo
└── app/api/feedback/
│   ├── submit/route.ts                   # POST: create submission
│   └── history/route.ts                  # GET: merchant's submissions
```

### Pattern 1: Settings Page + Manager Component (from UsefulNumbersManager)

**What:** The page.tsx is a thin shell that gets tenant context, shows loading state, and renders a Manager component that handles all form/list logic.

**When to use:** Always for settings sub-pages.

**Example (from existing codebase):**

```typescript
// page.tsx - thin shell pattern
'use client';
import { useTenant } from '@/lib/contexts/TenantContext';
import { FeedbackSubmissionManager } from '@/components/settings/FeedbackSubmissionManager';

export default function FeedbackPage() {
  const { brand, location, isLoading } = useTenant();
  const merchantId = location?.id || brand?.id;

  if (isLoading) return <LoadingSpinner />;
  if (!merchantId) return <SelectLocationPrompt />;

  return (
    <div className="max-w-4xl space-y-6">
      <Header />
      <FeedbackSubmissionManager merchantId={merchantId} />
    </div>
  );
}
```

**Source:** `apps/backoffice/app/(dashboard)/settings/useful-numbers/page.tsx`

### Pattern 2: API Route with createClient (from useful-numbers route)

**What:** API routes use `createClient` from `@/lib/supabase-server` for session-scoped operations, or `supabaseAdmin` for service-role operations. Session check via `getSession()`.

**Example:**

```typescript
// route.ts pattern
import { NextRequest, NextResponse } from 'next/server';
import { createClient, getSession } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = createClient(); // or supabaseAdmin for bypassing RLS
  // ... insert into fb_submissions
}
```

**Source:** `apps/backoffice/app/api/settings/useful-numbers/route.ts`, `apps/backoffice/app/api/upload/image/route.ts`

### Pattern 3: Image Upload via Supabase Storage (from upload/image route)

**What:** The existing `/api/upload/image` route already supports multiple folder configs. Add a `feedback-screenshots` folder config and reuse the same route.

**Key details:**

- Bucket: `brand-assets` (already exists)
- Upload pattern: FormData with `file`, `folder`, `locationId`, `entityId`
- Returns: `{ url, path }` with public URL
- Validation: file type + file size checks per folder config

**Example:**

```typescript
// Client-side upload
const formData = new FormData();
formData.append('file', screenshotFile);
formData.append('folder', 'feedback-screenshots');
formData.append('entityId', submissionId);

const res = await fetch('/api/upload/image', {
  method: 'POST',
  body: formData,
});
const { url } = await res.json();
```

**Source:** `apps/backoffice/app/api/upload/image/route.ts`

### Pattern 4: Form with Loading/Saving State (from UsefulNumbersManager)

**What:** useState for form fields, isSaving flag, error/success banners, disabled state during save.

**Source:** `apps/backoffice/components/settings/UsefulNumbersManager.tsx` lines 110-141

### Anti-Patterns to Avoid

- **Don't create a new upload endpoint.** The existing `/api/upload/image` already handles everything. Just add a folder config entry.
- **Don't use supabaseAdmin for client-facing submissions.** Use `createClient()` (session-scoped) so RLS applies. The INSERT policy on fb_submissions already permits merchant inserts.
- **Don't add a language selector.** The context says "no language picker" - merchant writes in whatever language, AI handles translation in Phase 13 pipeline.
- **Don't use a modal for the form.** Context explicitly says "not a modal (needs space for description)". Use a full page.

## Don't Hand-Roll

| Problem                       | Don't Build                 | Use Instead                                            | Why                                                                |
| ----------------------------- | --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| Image upload to cloud storage | Custom upload logic         | `/api/upload/image` existing route + add folder config | Already handles validation, bucket creation, public URL generation |
| Toast notifications           | Custom notification banners | `useToast()` from `ToastContext`                       | Already provides success/error/info toasts with sound              |
| Loading spinner               | Custom spinner              | `Loader2` from lucide-react (existing pattern)         | Already used across all settings pages                             |
| Auth check in API route       | Custom auth                 | `getSession()` from `@/lib/supabase-server`            | Already handles dev mode + real auth                               |
| Get merchant ID               | Custom lookup               | `useTenant()` from `TenantContext`                     | Already provides brand/location/merchantId                         |

**Key insight:** This phase is 100% composition of existing patterns. Zero custom solutions needed.

## Common Pitfalls

### Pitfall 1: Upload Order - Screenshot Before vs After Submission

**What goes wrong:** If you upload the screenshot first and then create the submission, a failed submission leaves an orphaned file in storage. If you create the submission first and then upload, you need the submission ID to name the file uniquely.

**Why it happens:** Two-step operations without transaction support.

**How to avoid:** Create the submission first (without screenshot_url), then upload the screenshot using the submission ID as entityId, then update the submission with the screenshot_url. This matches the existing upload pattern where entityId is used for file naming.

**Warning signs:** Orphaned files in storage, missing screenshot_url on submissions.

### Pitfall 2: Forgetting Context Auto-Capture

**What goes wrong:** The form captures merchant_id and context but the developer forgets to include `vertical`, `page_path`, or `submitted_by_account_id` in the API call.

**Why it happens:** These fields are "auto-captured" but still need to be passed from client to server.

**How to avoid:** The client should capture `window.location.pathname` (page_path) and the known vertical slug on form submit. The API route should resolve `submitted_by_account_id` from the session. The `merchant_id` comes from TenantContext.

**Warning signs:** NULL values in vertical/page_path columns after submissions.

### Pitfall 3: RLS Policy Requires account_roles Lookup

**What goes wrong:** Using `supabaseAdmin` bypasses RLS, which works but loses security guarantees. Using `createClient()` requires that the authenticated user has an entry in `account_roles` linking them to the merchant.

**Why it happens:** The INSERT policy on fb_submissions checks `account_roles` for merchant association.

**How to avoid:** Use `createClient()` for the insert. If the user is properly authenticated (they are, since they're in the backoffice), the RLS policy will pass. For the dev mode, the mock session works with the admin client pattern already in place. If RLS causes issues in dev mode, fall back to `supabaseAdmin` for the submission insert only.

**Warning signs:** 403/RLS errors when inserting submissions in dev mode.

### Pitfall 4: File Size Validation Only Server-Side

**What goes wrong:** User selects a 20MB screenshot, waits for upload, gets server-side error.

**Why it happens:** No client-side validation before upload.

**How to avoid:** Add client-side checks on the file input's `onChange`: check `file.size <= 5 * 1024 * 1024` and `['image/jpeg', 'image/png', 'image/webp'].includes(file.type)` before enabling submit.

**Warning signs:** Users complaining about upload failures.

## Code Examples

### Submission Form Type (for TypeScript)

```typescript
// Source: fb_submissions schema from 082-feedback-intelligence.sql
interface FeedbackSubmissionForm {
  original_title: string; // required by UX, but DB allows null
  original_body: string; // required
  type: 'bug' | 'feature_request' | 'feedback'; // UI simplified types
  // Auto-captured:
  merchant_id: string; // from TenantContext
  vertical: string; // from app context (e.g., 'backoffice')
  page_path: string; // from usePathname() or window.location
  source: 'manual'; // always 'manual' for UI submissions
  // After upload:
  screenshot_url?: string; // from /api/upload/image response
}
```

Note: The `type` field in the DB schema allows `'bug', 'feature_request', 'improvement', 'complaint', 'praise', 'operational'` but the UI context specifies three options: bug / feature request / general feedback. Map "general feedback" to the DB type `'improvement'` or create a UI-to-DB mapping.

### History List Query Pattern

```typescript
// Source: follows useful-numbers GET pattern
const { data: submissions, error } = await supabase
  .from('fb_submissions')
  .select('id, original_title, type, status, created_at, screenshot_url')
  .eq('merchant_id', merchantId)
  .order('created_at', { ascending: false });
```

### Screenshot Upload with Feedback Folder Config

```typescript
// Add to FOLDER_CONFIGS in /api/upload/image/route.ts
'feedback-screenshots': {
  maxSize: 5 * 1024 * 1024,  // 5MB
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
  subfolder: 'feedback',
},
```

### Sidebar Navigation Entry

The Settings nav item already exists in the sidebar. The feedback page should be a sub-page of settings (`/settings/feedback`), following the same pattern as `/settings/useful-numbers`. No sidebar changes needed - the page is accessed from within the Settings section.

## State of the Art

| Old Approach                         | Current Approach                            | When Changed     | Impact                              |
| ------------------------------------ | ------------------------------------------- | ---------------- | ----------------------------------- |
| `lucide-react` icons                 | `@phosphor-icons/react` with duotone weight | CLAUDE.md v8.1   | Use Phosphor for new components     |
| Direct Supabase client in components | API routes as intermediary                  | Existing pattern | All mutations go through API routes |
| Alert/confirm for feedback           | Toast context with sound                    | Existing pattern | Use useToast() for success/error    |

## Open Questions

1. **Type mapping: "general feedback" to DB type**
   - What we know: UI has 3 types (bug/feature/feedback), DB has 6 types
   - What's unclear: Whether "general feedback" maps to `improvement` or `operational`
   - Recommendation: Map to `'improvement'` as the closest semantic match. The AI processing (Phase 13) will re-classify anyway.

2. **Dev mode RLS compatibility**
   - What we know: Dev mode uses mock sessions. The RLS INSERT policy checks `account_roles`.
   - What's unclear: Whether dev mode mock sessions properly traverse the account_roles lookup
   - Recommendation: Start with `createClient()`. If RLS blocks in dev mode, use `supabaseAdmin` for the insert with explicit merchant_id validation.

## Sources

### Primary (HIGH confidence)

- `shared/database/migrations/schema/082-feedback-intelligence.sql` - Complete schema with all columns, types, constraints
- `apps/backoffice/app/api/upload/image/route.ts` - Exact upload pattern with folder configs, bucket handling
- `apps/backoffice/app/api/settings/useful-numbers/route.ts` - CRUD API route pattern
- `apps/backoffice/components/settings/UsefulNumbersManager.tsx` - Form + list component pattern
- `apps/backoffice/app/(dashboard)/settings/useful-numbers/page.tsx` - Settings page shell pattern
- `apps/backoffice/lib/supabase-server.ts` - Auth session check pattern
- `apps/backoffice/lib/supabase-admin.ts` - Admin client pattern
- `apps/backoffice/lib/ai/feedback-intelligence-service.ts` - How submissions are processed (Phase 13)
- `apps/backoffice/components/layout/Sidebar.tsx` - Navigation structure

### Secondary (MEDIUM confidence)

- None needed - all patterns are directly visible in the codebase

### Tertiary (LOW confidence)

- None

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - No new dependencies, everything exists in codebase
- Architecture: HIGH - Direct pattern reuse from UsefulNumbersManager + upload/image
- Pitfalls: HIGH - Based on direct code reading of existing patterns and constraints

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable patterns, no external dependencies)
