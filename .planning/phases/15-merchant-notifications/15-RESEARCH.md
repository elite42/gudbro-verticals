# Phase 15: Merchant Notifications - Research

**Researched:** 2026-01-30
**Domain:** In-app notification system (bell icon + dropdown + polling + API routes)
**Confidence:** HIGH

## Summary

This phase adds merchant-facing notification delivery for the feedback intelligence system. The database table (`fb_merchant_notifications`) already exists from migration 082. The existing `NotificationDropdown` component in `apps/backoffice/components/notifications/` is a fully-built UI with mock data -- it has a bell icon, unread badge, dropdown list, mark-as-read, dismiss, time-ago formatting, and type-based icons. The work is to: (1) replace mock data with real API calls backed by `fb_merchant_notifications`, (2) add 60-second polling for unread count, (3) create notification records when task status changes.

The codebase already uses `setInterval`-based polling extensively (30s for orders, 15s for requests, 120s for system alerts). The pattern is consistent: `useEffect` with `setInterval`, fetch data function, cleanup on unmount. No special polling library is needed.

The key architectural decision is **when notifications get created**. Currently, `processSubmission()` in `feedback-intelligence-service.ts` links submissions to tasks (creating or matching), but does NOT create notification records. For Phase 15, notifications must be inserted into `fb_merchant_notifications` at two points: (1) when the AI pipeline links a submission to a task (acknowledged), and (2) when a task's status changes (in_progress, done, rejected). Point 1 happens in the AI service. Point 2 will need a new mechanism since task status changes come from a kanban board (Phase 16) -- but the notification API should support it now, even if Phase 16 calls it later.

**Primary recommendation:** Extend the existing `NotificationDropdown` component to fetch from a new `/api/feedback/notifications` API route. Add a lightweight `useNotifications` hook with 60-second polling for unread count. Insert notification records in the AI service when submissions are acknowledged (linked to a task). Expose a `createFeedbackNotification()` utility for future phases to call when task status changes.

## Standard Stack

### Core

| Library         | Version              | Purpose                       | Why Standard                                                                   |
| --------------- | -------------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| `date-fns`      | (already installed)  | Relative time formatting      | Already used in existing `NotificationDropdown` with `formatDistanceToNow`     |
| `lucide-react`  | (already installed)  | Bell icon, notification icons | Already used in existing `NotificationDropdown` component                      |
| Supabase client | (already configured) | Database queries via RLS      | Both browser client (polling) and server client (API routes) already available |

### Supporting

| Library              | Version             | Purpose                            | When to Use                                       |
| -------------------- | ------------------- | ---------------------------------- | ------------------------------------------------- |
| `date-fns/locale/it` | (already installed) | Italian locale for time formatting | Already imported in existing NotificationDropdown |

### Alternatives Considered

| Instead of                | Could Use                                  | Tradeoff                                                                                                                                                            |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setInterval` polling     | Supabase Realtime subscription             | Realtime gives instant updates but adds complexity; polling at 60s is simple, matches requirements, and follows existing codebase patterns (orders use 30s polling) |
| Custom polling hook       | SWR / React Query                          | These libraries have built-in polling (`refreshInterval`), but the project doesn't use them; adding a dependency for one feature is overkill                        |
| Separate unread count API | Single notifications API with count header | Separate endpoint means 2 requests per poll; include `unreadCount` in the notification list response instead                                                        |

**Installation:** No new packages needed. All dependencies already exist.

## Architecture Patterns

### Recommended Project Structure

```
apps/backoffice/
├── app/api/feedback/
│   ├── notifications/
│   │   └── route.ts          # NEW - GET notifications, PATCH mark-as-read
│   ├── submit/route.ts       # EXISTING
│   ├── process/route.ts      # EXISTING
│   └── history/route.ts      # EXISTING
├── components/notifications/
│   ├── NotificationDropdown.tsx  # MODIFY - replace mock data with real API
│   └── index.ts                  # EXISTING
├── hooks/
│   └── useNotifications.ts       # NEW - polling hook for unread count + list
└── lib/
    └── feedback/
        └── notification-utils.ts # NEW - createFeedbackNotification() utility
```

### Pattern 1: Polling with setInterval (from existing codebase)

**What:** The codebase uses `setInterval` inside `useEffect` for background data fetching. Consistent across orders, requests, and system alerts pages.
**When to use:** The 60-second notification polling.
**Example (from `apps/backoffice/app/(staff)/page.tsx`):**

```typescript
useEffect(() => {
  loadData();
  // Poll every 30 seconds for new requests
  const interval = setInterval(loadData, 30000);
  return () => clearInterval(interval);
}, [loadData]);
```

### Pattern 2: API Route with Supabase Server Client (from existing feedback routes)

**What:** API routes use `createClient()` from `@/lib/supabase-server` which respects RLS. The `fb_merchant_notifications` table has RLS policies that allow accounts to view/update their own notifications via `auth.uid()`.
**When to use:** GET and PATCH notification API routes.
**Example (from `apps/backoffice/app/api/feedback/history/route.ts`):**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const merchantId = searchParams.get('merchantId');
  // ... query with RLS-enforced access
}
```

### Pattern 3: Service-Side Notification Creation (from async-notifier.ts)

**What:** Backend services create notification records using `supabaseAdmin` (service role) to bypass RLS. This is the pattern for creating feedback notifications when the AI pipeline processes submissions.
**When to use:** Creating `fb_merchant_notifications` records in `feedback-intelligence-service.ts` and in future task status change handlers.
**Example structure:**

```typescript
import { supabaseAdmin } from '../supabase-admin';

export async function createFeedbackNotification(params: {
  merchantId: string;
  accountId: string;
  submissionId?: string;
  taskId?: string;
  type: 'acknowledged' | 'status_changed' | 'resolved' | 'rejected';
  title: string;
  body?: string;
}): Promise<void> {
  await supabaseAdmin.from('fb_merchant_notifications').insert({
    merchant_id: params.merchantId,
    account_id: params.accountId,
    submission_id: params.submissionId || null,
    task_id: params.taskId || null,
    type: params.type,
    title: params.title,
    body: params.body || null,
  });
}
```

### Pattern 4: Existing NotificationDropdown Structure

**What:** The existing `NotificationDropdown` already has complete UI including: bell icon with unread badge (capped at 9+), dropdown with header + mark-all-as-read button, notification list with type-based icons and priority border styling, dismiss/mark-as-read per item, time-ago formatting, empty state, and footer link. Currently uses mock data via `generateMockNotifications()`.
**When to use:** Reuse this entire component, replacing mock data with the `useNotifications` hook.

### Anti-Patterns to Avoid

- **Replacing the existing NotificationDropdown entirely:** The component is well-built with good UX. Modify it to accept real data, don't rewrite from scratch.
- **Polling the full notification list every 60 seconds:** Only poll the unread count. Fetch the full list when the dropdown opens. This minimizes bandwidth and DB load.
- **Creating notifications for every possible event in Phase 15:** Scope to FBNOT-01 and FBNOT-02 only. Phase 15 creates notifications for: (a) submission acknowledged (linked to task), and (b) task status changes. Don't over-engineer for future notification types.
- **Using Supabase Realtime for notifications:** The requirement specifies 60-second polling. Keep it simple. Realtime can be added later if needed.

## Don't Hand-Roll

| Problem                         | Don't Build                     | Use Instead                                                     | Why                                                                       |
| ------------------------------- | ------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Relative time display           | Custom "X minutes ago" function | `date-fns` `formatDistanceToNow`                                | Already used in existing NotificationDropdown with Italian locale support |
| Outside-click-to-close dropdown | Custom event listeners          | Existing pattern in `NotificationDropdown` already handles this | Copy the `useEffect` with `mousedown` listener pattern                    |
| Unread badge with 9+ cap        | Custom logic                    | Existing pattern: `{unreadCount > 9 ? '9+' : unreadCount}`      | Already implemented in current NotificationDropdown                       |
| Notification type icons/colors  | New icon mapping                | Existing `typeConfig` in NotificationDropdown                   | Already maps type -> icon + color + bg                                    |

**Key insight:** The existing `NotificationDropdown` is ~95% complete for the UI requirements. The main work is plumbing: API routes, polling hook, and notification creation in the AI service.

## Common Pitfalls

### Pitfall 1: RLS Blocking Notification Reads

**What goes wrong:** Merchant opens notification dropdown but sees empty list, despite notifications existing in the database.
**Why it happens:** The RLS policy on `fb_merchant_notifications` uses `account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())`. If the API route uses `supabaseAdmin` (service role) instead of the user-scoped `createClient()`, or vice versa -- if notification creation uses the user client instead of admin -- things break.
**How to avoid:** Use `createClient()` (user-scoped, RLS-enforced) for reading notifications in the API route. Use `supabaseAdmin` for creating notifications in the backend service.
**Warning signs:** Empty notification list despite confirmed records in the database.

### Pitfall 2: Missing account_id When Creating Notifications

**What goes wrong:** `processSubmission()` needs to create a notification with `account_id`, but it only has `merchant_id` from the submission. The `fb_merchant_notifications` table requires `account_id` (NOT NULL).
**Why it happens:** The AI processing pipeline works with `merchant_id` (tenant), not individual accounts. A merchant may have multiple accounts (staff members).
**How to avoid:** Two options:

1. Store `submitted_by_account_id` on `fb_submissions` (column already exists!) and use it for the acknowledged notification. This notifies the person who submitted.
2. For task status change notifications, query all merchant accounts and notify all of them, or notify only the submitter.
   **Recommendation:** Use `submitted_by_account_id` from the submission. The column exists but needs to be populated by the submit API route. Currently the submit route does NOT set this field -- it will need to resolve the account_id from the auth session and include it.

### Pitfall 3: Polling Continues When Tab Is Not Visible

**What goes wrong:** The 60-second polling continues even when the browser tab is in the background, wasting resources and potentially hitting rate limits.
**Why it happens:** `setInterval` runs regardless of tab visibility.
**How to avoid:** Use `document.visibilityState` or the `visibilitychange` event to pause polling when the tab is hidden. This is a nice-to-have optimization, not a blocker. The existing codebase does NOT implement this for its other polling (orders, requests), so it's acceptable to skip for consistency.
**Warning signs:** High API call volume from background tabs.

### Pitfall 4: Notification Type Mismatch Between DB and UI

**What goes wrong:** The DB `type` field has values `('acknowledged', 'status_changed', 'resolved', 'rejected')` but the existing `NotificationDropdown` uses types `('ai', 'operations', 'feedback', 'business', 'system')`.
**Why it happens:** The existing dropdown was designed for a general notification system, not feedback-specific.
**How to avoid:** Map the `fb_merchant_notifications.type` values to the existing UI type system, or add new type entries to `typeConfig`. Recommendation: Add feedback-specific type mappings:

- `acknowledged` -> icon: CheckCircle, color: green
- `status_changed` -> icon: ArrowRight, color: blue
- `resolved` -> icon: CheckCircle2, color: green
- `rejected` -> icon: XCircle, color: red

### Pitfall 5: Race Condition Between Notification Creation and Polling

**What goes wrong:** User submits feedback. AI processes it (1-3 seconds). Notification is created. But the next poll is 55 seconds away, so user sees nothing.
**Why it happens:** 60-second polling has inherent latency.
**How to avoid:** After a user submits feedback, trigger an immediate notification refresh (optimistic or manual poll). The existing polling interval continues normally. This gives the feeling of real-time without the complexity.
**Warning signs:** User submits feedback and waits >30 seconds to see any notification.

## Code Examples

### Example 1: useNotifications Hook

```typescript
// apps/backoffice/hooks/useNotifications.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

interface FeedbackNotification {
  id: string;
  type: 'acknowledged' | 'status_changed' | 'resolved' | 'rejected';
  title: string;
  body: string | null;
  is_read: boolean;
  submission_id: string | null;
  task_id: string | null;
  created_at: string;
}

interface UseNotificationsResult {
  notifications: FeedbackNotification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useNotifications(
  merchantId: string | null
): UseNotificationsResult {
  const [notifications, setNotifications] = useState<FeedbackNotification[]>(
    []
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!merchantId) return;
    try {
      const res = await fetch(
        `/api/feedback/notifications?merchantId=${merchantId}`
      );
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // 60s polling
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ... markAsRead, markAllAsRead, refresh implementations
}
```

### Example 2: GET API Route for Notifications

```typescript
// apps/backoffice/app/api/feedback/notifications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const merchantId = searchParams.get('merchantId');

  if (!merchantId) {
    return NextResponse.json(
      { error: 'merchantId is required' },
      { status: 400 }
    );
  }

  // Fetch notifications (RLS ensures user can only see their own)
  const { data, error } = await supabase
    .from('fb_merchant_notifications')
    .select(
      'id, type, title, body, is_read, submission_id, task_id, created_at'
    )
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const notifications = data || [];
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return NextResponse.json({ notifications, unreadCount });
}
```

### Example 3: PATCH for Mark-as-Read

```typescript
// In the same route file: PATCH handler
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  if (body.markAllRead && body.merchantId) {
    // Mark all as read for this merchant
    const { error } = await supabase
      .from('fb_merchant_notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('merchant_id', body.merchantId)
      .eq('is_read', false);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.notificationId) {
    // Mark single notification as read
    const { error } = await supabase
      .from('fb_merchant_notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', body.notificationId);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
```

### Example 4: Creating Notification in AI Service

```typescript
// In feedback-intelligence-service.ts, after linking submission to task:

// After step 6 (link or create task), create "acknowledged" notification
if (sub.submitted_by_account_id) {
  await supabaseAdmin.from('fb_merchant_notifications').insert({
    merchant_id: sub.merchant_id,
    account_id: sub.submitted_by_account_id,
    submission_id: submissionId,
    task_id: taskId,
    type: 'acknowledged',
    title: 'Your feedback has been received',
    body: `Your submission "${sub.original_title || 'Feedback'}" has been processed and linked to a task.`,
  });
}
```

## State of the Art

| Old Approach                             | Current Approach                                                         | When Changed           | Impact                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------------------- |
| WebSocket/Realtime for all notifications | Polling for simple use cases, Realtime for critical (e.g., chat, orders) | Ongoing best practice  | Simpler code, lower infra cost, acceptable latency for non-urgent notifications    |
| Separate notification microservice       | In-app table + API route                                                 | For small-medium scale | No extra infrastructure, simpler deployment, sufficient for <10K notifications/day |

**Deprecated/outdated:**

- The existing `NotificationDropdown` uses hardcoded Italian strings ("Notifiche", "Segna tutte come lette"). Phase 15 should keep this for now (the backoffice is primarily Italian-facing), but note that the header uses `useTranslations('header')` for i18n. Full i18n of the notification dropdown is a future concern.

## Open Questions

1. **submitted_by_account_id population**
   - What we know: The `fb_submissions` table has a `submitted_by_account_id` column (UUID, FK to accounts). The submit API route (`/api/feedback/submit`) does NOT currently populate this field.
   - What's unclear: Whether Phase 14 (which built the submit UI) already resolves and sends the account_id.
   - Recommendation: Phase 15 should ensure `submitted_by_account_id` is populated. If not already done, add account_id resolution in the submit route or the submit form. This is required for notification delivery (we need to know WHO to notify).

2. **Task status change notification trigger**
   - What we know: FBNOT-02 requires notifications when a task moves to In Progress, Done, or Rejected. But the kanban board (task management UI) is Phase 16.
   - What's unclear: How task status changes will be triggered in Phase 15 without the kanban.
   - Recommendation: Build the `createFeedbackNotification()` utility now. For Phase 15, it will be called for "acknowledged" notifications. Phase 16 (kanban) will call it for status change notifications. Add a TODO/hook point in the task update logic. Optionally, create a simple `/api/feedback/tasks/[id]/status` endpoint that also triggers notifications, which Phase 16's kanban UI can call.

3. **Notification for all merchant accounts or just submitter**
   - What we know: A merchant may have multiple staff accounts. `fb_merchant_notifications` stores a single `account_id`.
   - What's unclear: Should all merchant staff see feedback notifications, or only the person who submitted?
   - Recommendation: For "acknowledged" notifications, notify only the submitter (using `submitted_by_account_id`). For status changes (Phase 16+), notify the submitter as well. If broader notification is needed later, the utility can be extended to query all merchant accounts.

## Sources

### Primary (HIGH confidence)

- `shared/database/migrations/schema/082-feedback-intelligence.sql` - `fb_merchant_notifications` table schema, RLS policies, indexes
- `apps/backoffice/components/notifications/NotificationDropdown.tsx` - Existing UI component with complete bell icon, dropdown, mock data pattern
- `apps/backoffice/components/layout/Header.tsx` - Where NotificationDropdown is mounted in the global header
- `apps/backoffice/lib/ai/feedback-intelligence-service.ts` - AI pipeline where "acknowledged" notification should be created
- `apps/backoffice/app/api/feedback/submit/route.ts` - Submit API route (needs `submitted_by_account_id`)
- `apps/backoffice/app/api/feedback/history/route.ts` - API route pattern using `createClient()` with RLS
- `apps/backoffice/app/(staff)/page.tsx` - Polling pattern with `setInterval`
- `apps/backoffice/lib/notifications/async-notifier.ts` - Existing notification creation pattern using `supabaseAdmin`

### Secondary (MEDIUM confidence)

- None needed -- all patterns verified directly from codebase

### Tertiary (LOW confidence)

- None -- all findings derived from source code analysis

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - No new dependencies needed; all libraries already installed and in use
- Architecture: HIGH - All patterns (polling, API routes, service-side writes, dropdown UI) already exist in the codebase
- Pitfalls: HIGH - Identified from direct analysis of existing code (RLS policies, missing account_id, type mapping)

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable patterns, no external dependencies)
