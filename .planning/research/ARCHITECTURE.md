# Architecture: Merchant Feedback Intelligence System

**Domain:** AI-powered feedback collection, aggregation, and task management
**Researched:** 2026-01-30
**Confidence:** HIGH (existing codebase patterns examined, all integration points verified)

---

## Existing Architecture Baseline

### What Already Exists (EXTEND, not replace)

| Asset                           | Location                   | Status | Relevance                                                     |
| ------------------------------- | -------------------------- | ------ | ------------------------------------------------------------- |
| `ai_feedback` table             | Migration 029              | LIVE   | **Extend** - currently AI Co-Manager scoped, needs broadening |
| `ai_feedback_responses` table   | Migration 029              | LIVE   | **Reuse** as-is for team responses                            |
| `internal_notifications` table  | Migration 029              | LIVE   | **Reuse** for team-side notifications                         |
| `notification_queue` table      | Migration 059              | LIVE   | **Reuse** for async notification delivery                     |
| `feedback-loop-service.ts`      | `lib/ai/`                  | LIVE   | **Extend** - add translation, similarity, aggregation         |
| `/api/ai/feedback` route        | `app/api/ai/feedback/`     | LIVE   | **Extend** - add new endpoints for merchant notifications     |
| `/api/upload/image` route       | `app/api/upload/image/`    | LIVE   | **Reuse** - add 'feedback' folder config                      |
| `brand-assets` storage bucket   | Supabase Storage           | LIVE   | **Reuse** with new subfolder                                  |
| `getSession()` auth pattern     | `lib/supabase-server`      | LIVE   | **Reuse** for all new API routes                              |
| `useAuth()` + `hasPermission()` | `lib/contexts/AuthContext` | LIVE   | **Reuse** for UI permission gating                            |
| OpenAI client                   | `lib/ai/openai.ts`         | LIVE   | **Reuse** - gpt-4o-mini for classification/translation        |

### Key Architectural Constraints

1. **Database conventions:** TEXT + CHECK (no ENUM), English column names, `fb_` namespace prefix for new tables
2. **Multi-tenant:** RLS via `account_roles.tenant_id` matching `merchant_id`, service_role bypass
3. **Auth:** `getSession()` server-side, `useAuth()` client-side, `hasPermission()` for feature gating
4. **AI pattern:** Sync OpenAI call on submit (existing pattern in `collectFeedback()`), async notification via `notification_queue`
5. **Upload pattern:** FormData POST to `/api/upload/image`, Supabase Storage `brand-assets` bucket, folder-based organization

---

## Database Schema Design

### Decision: Extend existing `ai_feedback` OR new tables?

**Recommendation: NEW tables with `fb_` prefix.** Rationale:

- `ai_feedback` is scoped to AI Co-Manager feedback (categories like `ai_chat`, `ai_actions`)
- The new system is a general-purpose product feedback system (bugs, features, general feedback)
- Different aggregation model (similarity grouping into tasks)
- Cleaner separation, no risk of breaking existing AI feedback flow

### Table 1: `fb_submissions` (Merchant Feedback)

```sql
CREATE TABLE fb_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who submitted
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- Classification (merchant-selected, AI-refined)
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature_request', 'feedback')),

  -- Content (in merchant's original language)
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  original_language TEXT NOT NULL DEFAULT 'en',  -- ISO 639-1 code detected by AI

  -- AI-translated English version (for team processing)
  title_en TEXT,
  description_en TEXT,

  -- AI Analysis
  ai_sentiment TEXT CHECK (ai_sentiment IN ('positive', 'neutral', 'negative')),
  ai_priority INTEGER CHECK (ai_priority BETWEEN 1 AND 5),  -- 1=critical, 5=nice-to-have
  ai_summary TEXT,  -- Brief English summary for kanban cards
  ai_tags TEXT[] DEFAULT '{}',  -- Auto-extracted topics: '{"navigation","mobile","menu"}'

  -- Context (auto-detected)
  source_page TEXT,       -- e.g., '/orders', '/settings/payments'
  source_vertical TEXT,   -- e.g., 'coffeeshop', 'accommodations', 'backoffice'
  device_type TEXT,       -- 'desktop', 'mobile', 'tablet'
  browser_info TEXT,      -- User agent summary

  -- Screenshot
  screenshot_url TEXT,    -- Supabase Storage URL

  -- Aggregation link (set by AI when similar task found)
  task_id UUID REFERENCES fb_tasks(id) ON DELETE SET NULL,

  -- Status visible to merchant
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN (
    'submitted',      -- Just sent
    'acknowledged',   -- Auto-acknowledged by system
    'in_review',      -- Team is looking at it
    'planned',        -- Accepted into roadmap
    'completed',      -- Done!
    'declined'        -- Not going to do it
  )),

  -- Merchant notification state
  merchant_notified BOOLEAN DEFAULT false,  -- Has merchant seen latest status change?
  decline_reason TEXT,  -- Shown to merchant if declined

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_fb_submissions_merchant ON fb_submissions(merchant_id, created_at DESC);
CREATE INDEX idx_fb_submissions_task ON fb_submissions(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX idx_fb_submissions_status ON fb_submissions(status) WHERE status NOT IN ('completed', 'declined');
CREATE INDEX idx_fb_submissions_unnotified ON fb_submissions(merchant_id)
  WHERE merchant_notified = false AND status != 'submitted';
```

### Table 2: `fb_tasks` (Aggregated Tasks for Kanban)

```sql
CREATE TABLE fb_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Classification
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature_request', 'feedback')),

  -- Content (always in English, AI-synthesized from submissions)
  title TEXT NOT NULL,
  description TEXT NOT NULL,

  -- AI-generated synthesis
  ai_synthesis TEXT,  -- Merged summary from all linked submissions
  ai_tags TEXT[] DEFAULT '{}',

  -- Kanban state
  column_position TEXT NOT NULL DEFAULT 'new' CHECK (column_position IN (
    'new',          -- Unreviewed
    'reviewing',    -- Under consideration
    'in_progress',  -- Being built
    'done',         -- Shipped
    'rejected'      -- Not doing
  )),
  column_order INTEGER NOT NULL DEFAULT 0,  -- Sort order within column

  -- Aggregation metrics (denormalized for fast kanban rendering)
  submission_count INTEGER NOT NULL DEFAULT 1,
  merchant_count INTEGER NOT NULL DEFAULT 1,  -- Distinct merchants
  languages TEXT[] DEFAULT '{}',              -- Languages represented
  avg_sentiment NUMERIC(3,2),                 -- -1.0 to 1.0
  max_priority INTEGER DEFAULT 3,             -- Highest AI priority among submissions

  -- Team actions
  assigned_to TEXT,          -- Team member name
  rejection_reason TEXT,     -- Shown to linked merchants when rejected
  internal_notes TEXT,       -- Private team notes
  completed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_fb_tasks_column ON fb_tasks(column_position, column_order);
CREATE INDEX idx_fb_tasks_type ON fb_tasks(type);
CREATE INDEX idx_fb_tasks_priority ON fb_tasks(max_priority, submission_count DESC)
  WHERE column_position IN ('new', 'reviewing');
```

### Table 3: `fb_merchant_notifications` (Bell Icon State)

```sql
CREATE TABLE fb_merchant_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Target
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- Content
  type TEXT NOT NULL CHECK (type IN (
    'acknowledged',   -- "We received your feedback"
    'status_change',  -- "Your request moved to In Progress"
    'completed',      -- "Your request has been shipped!"
    'declined'        -- "We've decided not to pursue this"
  )),
  title TEXT NOT NULL,
  body TEXT,

  -- Reference
  submission_id UUID REFERENCES fb_submissions(id) ON DELETE CASCADE,
  task_id UUID REFERENCES fb_tasks(id) ON DELETE SET NULL,

  -- State
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_fb_notifications_unread ON fb_merchant_notifications(merchant_id, account_id)
  WHERE is_read = false;
CREATE INDEX idx_fb_notifications_merchant ON fb_merchant_notifications(merchant_id, created_at DESC);
```

### RLS Policies

```sql
-- fb_submissions
ALTER TABLE fb_submissions ENABLE ROW LEVEL SECURITY;

-- Merchants see their own submissions
CREATE POLICY "Merchants view own submissions" ON fb_submissions FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant' AND ar.is_active = true
  ));

-- Merchants can create submissions
CREATE POLICY "Merchants create submissions" ON fb_submissions FOR INSERT
  WITH CHECK (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Admin/platform full access (for kanban board)
CREATE POLICY "Admin full access submissions" ON fb_submissions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'admin' AND ar.is_active = true
  ));

-- Service role bypass
CREATE POLICY "Service role submissions" ON fb_submissions FOR ALL
  USING (auth.role() = 'service_role');

-- fb_tasks: Admin only (platform team kanban)
ALTER TABLE fb_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access tasks" ON fb_tasks FOR ALL
  USING (EXISTS (
    SELECT 1 FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'admin' AND ar.is_active = true
  ));

CREATE POLICY "Service role tasks" ON fb_tasks FOR ALL
  USING (auth.role() = 'service_role');

-- fb_merchant_notifications: Merchants see their own
ALTER TABLE fb_merchant_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Merchants view own notifications" ON fb_merchant_notifications FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant' AND ar.is_active = true
  ));

CREATE POLICY "Merchants mark own notifications read" ON fb_merchant_notifications FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant' AND ar.is_active = true
  ));

CREATE POLICY "Service role notifications" ON fb_merchant_notifications FOR ALL
  USING (auth.role() = 'service_role');
```

### Entity Relationship Diagram

```
merchants
  |
  |-- 1:N --> fb_submissions (merchant_id)
  |               |
  |               |-- N:1 --> fb_tasks (task_id) -- AI groups similar submissions
  |               |
  |               |-- 1:N --> fb_merchant_notifications (submission_id)
  |
  |-- 1:N --> fb_merchant_notifications (merchant_id)

fb_tasks
  |
  |-- 1:N --> fb_submissions (reverse: submissions linked to this task)
  |-- 1:N --> fb_merchant_notifications (task_id)
```

---

## API Route Structure

### New Routes

```
apps/backoffice/app/api/feedback/
  |
  |-- submissions/
  |   |-- route.ts              GET (list merchant's own), POST (new submission)
  |   |-- [id]/
  |       |-- route.ts          GET (single submission detail)
  |
  |-- tasks/
  |   |-- route.ts              GET (all tasks for kanban), POST (create task manually)
  |   |-- [id]/
  |   |   |-- route.ts          GET (single task), PATCH (update column/details)
  |   |   |-- submissions/
  |   |       |-- route.ts      GET (submissions linked to this task)
  |   |-- reorder/
  |       |-- route.ts          PATCH (batch reorder within column)
  |
  |-- notifications/
  |   |-- route.ts              GET (merchant's notifications), PATCH (mark read)
  |   |-- count/
  |       |-- route.ts          GET (unread count for bell badge)
  |
  |-- process/
      |-- route.ts              POST (trigger AI processing for a submission)
```

### Route Details

**POST `/api/feedback/submissions`** (Merchant submits feedback)

```typescript
// Request
{
  type: 'bug' | 'feature_request' | 'feedback',
  title: string,
  description: string,
  screenshotUrl?: string,     // Pre-uploaded via /api/upload/image
  sourcePage?: string,        // Auto-detected by frontend
  sourceVertical?: string,    // Auto-detected by frontend
  deviceType?: string         // Auto-detected by frontend
}

// Response
{
  success: true,
  submission: { id, status: 'acknowledged', ... },
  message: "Thank you! We've received your feedback."
}
```

**Flow:** Submit -> AI Process (sync) -> Save -> Auto-acknowledge -> Return

**GET `/api/feedback/tasks`** (Admin kanban board)

```typescript
// Query params: ?column=new&type=bug
// Response
{
  tasks: [
    {
      id, type, title, description,
      column_position, column_order,
      submission_count, merchant_count,
      languages: ['en', 'vi', 'ko'],
      avg_sentiment, max_priority,
      assigned_to, created_at
    }
  ],
  counts: { new: 5, reviewing: 3, in_progress: 2, done: 12, rejected: 1 }
}
```

**PATCH `/api/feedback/tasks/[id]`** (Move card, update details)

```typescript
// Request
{
  column_position?: 'reviewing' | 'in_progress' | 'done' | 'rejected',
  assigned_to?: string,
  rejection_reason?: string,
  internal_notes?: string
}

// Side effect: When moving to 'done' or 'rejected', auto-notify all linked merchants
```

**GET `/api/feedback/notifications/count`** (Bell badge)

```typescript
// Response
{
  unread: 3;
}
```

### Existing Route Modifications

**`/api/upload/image` - Add feedback folder config**

```typescript
// Add to FOLDER_CONFIGS:
'feedback-screenshots': {
  maxSize: 5 * 1024 * 1024,  // 5MB
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
  subfolder: 'feedback',
},
```

---

## AI Processing Pipeline

### Processing Strategy: Synchronous on Submit

**Why sync, not async:**

1. The existing `collectFeedback()` pattern is already sync (OpenAI call on submit)
2. Translation + classification + similarity check = ~2-3 seconds total
3. Merchant gets immediate acknowledgment with AI-enhanced data
4. No cron infrastructure exists; adding it would be over-engineering for V1
5. The notification_queue handles async delivery of merchant notifications

### Processing Flow

```
Merchant Clicks "Submit"
        |
        v
[1. API Route: POST /api/feedback/submissions]
        |
        v
[2. AI Processing Service (sync, ~2-3s)]
   |-- Detect language (from text)
   |-- Translate to English (if not English)
   |-- Classify: refine type, extract tags, sentiment, priority
   |-- Similarity search: find existing fb_tasks with matching tags/title
   |       |
   |       |-- SIMILAR FOUND (cosine similarity > 0.8 on tags + title)
   |       |     |-- Link to existing task (set task_id)
   |       |     |-- Update task aggregation counters
   |       |     |-- Update task AI synthesis
   |       |
   |       |-- NO SIMILAR FOUND
   |             |-- Create new fb_task
   |             |-- Link submission to new task
   |
        v
[3. Save submission + task updates to DB]
        |
        v
[4. Auto-acknowledge: Create fb_merchant_notification]
        |
        v
[5. Queue internal notification for team]
   (via existing notification_queue / internal_notifications)
        |
        v
[6. Return response to merchant]
   { success: true, submission: {...}, message: "Thank you!" }
```

### AI Service Implementation

```typescript
// lib/ai/feedback-intelligence-service.ts

interface ProcessedSubmission {
  original_language: string;
  title_en: string;
  description_en: string;
  ai_sentiment: 'positive' | 'neutral' | 'negative';
  ai_priority: number;
  ai_summary: string;
  ai_tags: string[];
  matched_task_id: string | null;
}

async function processSubmission(
  title: string,
  description: string,
  type: string,
  sourcePage?: string,
  sourceVertical?: string
): Promise<ProcessedSubmission> {
  const openai = getOpenAIClient();

  // Single API call for translation + classification + tagging
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Fast + cheap for classification
    messages: [
      {
        role: 'system',
        content: `You are a product feedback analyzer for a SaaS platform.
Analyze the following feedback and respond with JSON only.`,
      },
      {
        role: 'user',
        content: `Feedback:
Title: ${title}
Description: ${description}
Type: ${type}
Source page: ${sourcePage || 'unknown'}
Source vertical: ${sourceVertical || 'unknown'}

Respond with:
{
  "detected_language": "ISO 639-1 code",
  "title_en": "English translation of title (or original if already English)",
  "description_en": "English translation (or original if English)",
  "sentiment": "positive|neutral|negative",
  "priority": 1-5,
  "summary": "One sentence English summary for internal team",
  "tags": ["max 5 topic tags like 'navigation', 'payment', 'mobile', 'menu']
}`,
      },
    ],
    temperature: 0.2,
    max_tokens: 500,
  });

  // Parse response...
  // Then: similarity search against existing tasks
}
```

### Similarity Detection Strategy

**V1 (Simple, no embeddings):**

- Compare AI-extracted `tags` against existing `fb_tasks.ai_tags` using array overlap
- Compare `title_en` using trigram similarity (pg_trgm extension)
- Threshold: >= 2 matching tags AND trigram similarity > 0.4 on title

```sql
-- Find similar tasks
SELECT id, title, ai_tags,
  similarity(title, $1) as title_sim,
  array_length(ai_tags & $2, 1) as tag_overlap
FROM fb_tasks
WHERE column_position NOT IN ('done', 'rejected')
  AND type = $3
  AND (ai_tags && $2)  -- At least one tag overlap
ORDER BY tag_overlap DESC, title_sim DESC
LIMIT 3;
```

**V2 (Future, if needed):** OpenAI embeddings on title+description, stored in `pgvector` column, cosine similarity search.

---

## Component Hierarchy (UI)

### Merchant Side (Settings > Feedback)

```
settings/feedback/page.tsx
  |
  |-- FeedbackSettingsPage
      |-- FeedbackSubmitForm          -- New submission form
      |   |-- TypeSelector            -- bug / feature / feedback pills
      |   |-- TitleInput
      |   |-- DescriptionTextarea
      |   |-- ScreenshotUploader      -- Uses existing /api/upload/image
      |   |-- AutoContext              -- Shows detected page/vertical (read-only)
      |   |-- SubmitButton
      |
      |-- MySubmissionsList           -- List of merchant's past submissions
      |   |-- SubmissionCard          -- Title, type badge, status badge, date
      |       |-- StatusBadge         -- Color-coded: submitted/in_review/planned/completed/declined
      |
      |-- (empty state)              -- "No feedback yet. We'd love to hear from you!"
```

### Merchant Notification Bell (Global Header)

```
components/layout/NotificationBell.tsx   -- NEW component
  |-- Bell icon with unread count badge
  |-- Dropdown panel (on click)
      |-- NotificationItem              -- "Your feedback is now in progress!"
      |-- NotificationItem
      |-- "View all" link -> /settings/feedback
```

### Admin Side (Platform > Feedback Board)

```
platform/feedback/page.tsx              -- NEW page (admin only)
  |
  |-- FeedbackKanbanBoard
      |-- ColumnHeader                  -- "New (5)" / "Reviewing (3)" / etc.
      |   |-- TaskCard                  -- Draggable card
      |       |-- TypeBadge             -- bug/feature/feedback
      |       |-- Title
      |       |-- MerchantCount         -- "3 merchants"
      |       |-- LanguageFlags         -- Small flag icons
      |       |-- SentimentIndicator    -- Green/yellow/red dot
      |       |-- PriorityBadge         -- P1-P5
      |       |-- AssigneeAvatar
      |
      |-- TaskDetailPanel               -- Slide-out panel on card click
          |-- TaskHeader                -- Title, type, created date
          |-- AISynthesis               -- AI-merged description
          |-- LinkedSubmissions         -- Expandable list of original submissions
          |   |-- SubmissionDetail      -- Original language + English, screenshot
          |-- ActionButtons             -- Accept, Reject, Assign, Add Note
          |-- InternalNotes             -- Team-only notes
          |-- StatusHistory             -- Timeline of changes
```

### File/Component Mapping

```
apps/backoffice/
  |-- app/(dashboard)/settings/feedback/
  |   |-- page.tsx                    -- Merchant feedback page
  |
  |-- app/(dashboard)/platform/feedback/
  |   |-- page.tsx                    -- Admin kanban board
  |
  |-- app/api/feedback/
  |   |-- submissions/route.ts
  |   |-- submissions/[id]/route.ts
  |   |-- tasks/route.ts
  |   |-- tasks/[id]/route.ts
  |   |-- tasks/[id]/submissions/route.ts
  |   |-- tasks/reorder/route.ts
  |   |-- notifications/route.ts
  |   |-- notifications/count/route.ts
  |   |-- process/route.ts
  |
  |-- components/feedback/
  |   |-- FeedbackSubmitForm.tsx
  |   |-- MySubmissionsList.tsx
  |   |-- SubmissionCard.tsx
  |   |-- StatusBadge.tsx
  |   |-- FeedbackKanbanBoard.tsx
  |   |-- TaskCard.tsx
  |   |-- TaskDetailPanel.tsx
  |   |-- ColumnHeader.tsx
  |
  |-- components/layout/
  |   |-- NotificationBell.tsx        -- NEW
  |   |-- Sidebar.tsx                 -- MODIFY (add Feedback link to Settings)
  |
  |-- lib/feedback/
  |   |-- feedback-intelligence-service.ts  -- AI processing
  |   |-- feedback-queries.ts               -- DB queries
  |   |-- feedback-notifications.ts         -- Notification creation
  |   |-- types.ts                          -- TypeScript types
  |
  |-- hooks/
      |-- useFeedbackSubmissions.ts
      |-- useFeedbackTasks.ts
      |-- useFeedbackNotifications.ts
```

---

## Notification System Architecture

### Approach: Polling (not Supabase Realtime)

**Why polling over Realtime:**

1. Feedback notifications are not time-critical (minutes, not seconds)
2. Polling is simpler to implement, debug, and test
3. No WebSocket connection management needed
4. Supabase Realtime adds complexity for a non-real-time feature
5. The existing backoffice has no Realtime subscriptions to piggyback on

**Implementation:**

```typescript
// hooks/useFeedbackNotifications.ts
function useFeedbackNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll every 60 seconds
  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch('/api/feedback/notifications/count');
      const { unread } = await res.json();
      setUnreadCount(unread);
    };

    fetchCount();
    const interval = setInterval(fetchCount, 60_000);
    return () => clearInterval(interval);
  }, []);

  return { unreadCount };
}
```

### Notification Triggers

| Event                       | Who Gets Notified    | Notification Type | How                   |
| --------------------------- | -------------------- | ----------------- | --------------------- |
| Submission created          | Merchant (self)      | `acknowledged`    | Sync on submit        |
| Task moved to "Reviewing"   | All linked merchants | `status_change`   | API route side-effect |
| Task moved to "In Progress" | All linked merchants | `status_change`   | API route side-effect |
| Task moved to "Done"        | All linked merchants | `completed`       | API route side-effect |
| Task moved to "Rejected"    | All linked merchants | `declined`        | API route side-effect |

### Notification Creation Helper

```typescript
// lib/feedback/feedback-notifications.ts
async function notifyLinkedMerchants(
  taskId: string,
  type: 'status_change' | 'completed' | 'declined',
  title: string,
  body?: string
) {
  // Get all distinct merchant+account pairs linked to this task
  const { data: submissions } = await supabase
    .from('fb_submissions')
    .select('merchant_id, account_id')
    .eq('task_id', taskId);

  // Deduplicate by merchant_id + account_id
  const unique = new Map();
  for (const s of submissions || []) {
    unique.set(`${s.merchant_id}:${s.account_id}`, s);
  }

  // Create notifications
  const notifications = Array.from(unique.values()).map((s) => ({
    merchant_id: s.merchant_id,
    account_id: s.account_id,
    type,
    title,
    body,
    task_id: taskId,
  }));

  await supabase.from('fb_merchant_notifications').insert(notifications);

  // Update submission status for all linked
  const statusMap = {
    status_change: 'in_review',
    completed: 'completed',
    declined: 'declined',
  };
  await supabase
    .from('fb_submissions')
    .update({ status: statusMap[type], merchant_notified: false })
    .eq('task_id', taskId);
}
```

---

## Multi-Tenant Considerations

### Data Isolation

| Data                        | Merchant sees  | Admin sees           |
| --------------------------- | -------------- | -------------------- |
| `fb_submissions`            | Only their own | All (cross-merchant) |
| `fb_tasks`                  | Never directly | All tasks on kanban  |
| `fb_merchant_notifications` | Only their own | N/A (not needed)     |

### Aggregation Safety

When the AI groups submissions from different merchants into one task:

- The task itself has NO merchant_id (it's cross-merchant by design)
- Individual submissions retain their merchant_id for isolation
- Merchants never see other merchants' submissions
- The kanban card shows "3 merchants" count, not merchant names
- Only the admin detail panel shows linked submissions (which includes merchant context)

### Platform Admin Access

Admin access is gated via `account_roles.role_type = 'admin'`. The kanban board at `/platform/feedback` checks:

```typescript
// In page.tsx or layout
const { hasPermission } = useAuth();
if (!hasPermission('platform:admin')) {
  redirect('/dashboard');
}
```

The `/platform/` section is already in the Sidebar with admin gating (see `platformNavigation` in Sidebar.tsx).

---

## Suggested Build Order

### Phase Dependency Graph

```
[1. Database Schema]
        |
        v
[2. AI Processing Service] ----> [3. API Routes (Submissions)]
                                          |
                                          v
                                  [4. Merchant UI: Submit Form + List]
                                          |
                                          v
                                  [5. Notification System]
                                          |
                                          v
                                  [6. Bell Icon in Header]
                                          |
                                          v
                                  [7. Admin Kanban Board]
                                          |
                                          v
                                  [8. Task Detail Panel + Actions]
                                          |
                                          v
                                  [9. Status Change -> Merchant Notifications]
```

### Recommended Phase Grouping

**Phase 1: Foundation (DB + AI)**

- Migration 082: `fb_submissions`, `fb_tasks`, `fb_merchant_notifications` tables + RLS
- `lib/feedback/types.ts` - TypeScript types
- `lib/feedback/feedback-intelligence-service.ts` - AI processing (translate, classify, similarity)
- `lib/feedback/feedback-queries.ts` - DB query helpers
- Add `feedback-screenshots` to upload image folder config

**Phase 2: Merchant Submission Flow**

- `POST /api/feedback/submissions` - Submit with AI processing
- `GET /api/feedback/submissions` - List merchant's own
- `GET /api/feedback/submissions/[id]` - Detail view
- `components/feedback/FeedbackSubmitForm.tsx`
- `components/feedback/MySubmissionsList.tsx`, `SubmissionCard.tsx`, `StatusBadge.tsx`
- `app/(dashboard)/settings/feedback/page.tsx`
- Add "Feedback" link to Settings section in Sidebar

**Phase 3: Notification System**

- `fb_merchant_notifications` population logic
- `GET /api/feedback/notifications` + `GET /api/feedback/notifications/count`
- `PATCH /api/feedback/notifications` (mark read)
- `hooks/useFeedbackNotifications.ts`
- `components/layout/NotificationBell.tsx`
- Integrate bell into header/sidebar

**Phase 4: Admin Kanban Board**

- `GET /api/feedback/tasks` - All tasks for kanban
- `PATCH /api/feedback/tasks/[id]` - Update task (move column, assign, etc.)
- `PATCH /api/feedback/tasks/reorder` - Reorder within column
- `GET /api/feedback/tasks/[id]/submissions` - Linked submissions
- `components/feedback/FeedbackKanbanBoard.tsx` (drag-and-drop)
- `components/feedback/TaskCard.tsx`, `ColumnHeader.tsx`
- `components/feedback/TaskDetailPanel.tsx`
- `app/(dashboard)/platform/feedback/page.tsx`
- Wire status changes to merchant notification creation

### Why This Order

1. **DB first** because everything depends on the schema
2. **AI service second** because the submit flow needs it
3. **Merchant flow before admin** because merchants are the input side -- you need submissions before you can manage them
4. **Notifications before kanban** because merchants want feedback loop visibility early
5. **Kanban last** because it's the most complex UI (drag-drop) and benefits from having real data to work with

---

## Technology Choices for New Components

| Need                  | Choice                             | Rationale                                                                   |
| --------------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| Drag-and-drop kanban  | `@hello-pangea/dnd`                | Fork of `react-beautiful-dnd` (unmaintained), actively maintained, same API |
| Notifications polling | `setInterval` + `fetch`            | Simple, no new deps needed                                                  |
| Screenshot upload     | Existing `/api/upload/image`       | Already built, just add folder config                                       |
| AI processing         | OpenAI `gpt-4o-mini`               | Fast, cheap ($0.15/1M input), good enough for classification                |
| Similarity search     | PostgreSQL `pg_trgm` + tag overlap | No new infrastructure, works with existing Supabase                         |
| Bell icon             | Phosphor Icons `Bell`              | Project standard per CLAUDE.md                                              |

---

## Sources

- **HIGH confidence:** All patterns verified against existing codebase
  - Migration 029 (`ai_feedback` schema and RLS patterns)
  - Migration 059 (`notification_queue` patterns)
  - Migration 024 (follower/feedback RLS with `account_roles`)
  - Migration 012 (multi-tenant architecture)
  - `lib/ai/feedback-loop-service.ts` (AI processing pattern)
  - `app/api/upload/image/route.ts` (file upload pattern)
  - `app/api/ai/feedback/route.ts` (API route pattern)
  - `components/layout/Sidebar.tsx` (navigation structure)
  - `lib/ai/openai.ts` (OpenAI client pattern)
