# Technology Stack: Merchant Feedback Intelligence System

**Project:** GUDBRO Merchant Feedback Intelligence
**Researched:** 2026-01-30
**Overall Confidence:** HIGH

---

## Key Finding: Almost Everything Already Exists

The backoffice already has every major capability needed. This is an **integration and composition** task, not a new-stack task. The research below focuses on what to reuse, what to extend, and the few genuinely new patterns needed.

**Existing capabilities confirmed in codebase:**

- Supabase Storage uploads (`apps/backoffice/app/api/upload/image/route.ts`) with folder configs, auth, validation
- OpenAI integration (`apps/backoffice/lib/ai/openai.ts`) with 46 files, translation service, cost tracking
- Supabase Realtime (`apps/backoffice/lib/realtime/chat-channel.ts`) with Postgres Changes subscriptions
- @dnd-kit kanban-style DnD (`apps/backoffice/app/(dashboard)/settings/site-builder/`) with sortable lists
- Feedback types already defined (`apps/backoffice/lib/ai/feedback-loop-service.ts`) with classification, AI summary, sentiment

---

## Recommended Stack

### 1. Image/Screenshot Upload and Storage

**Recommendation: Supabase Storage (existing)** -- zero new dependencies.

| Technology       | Version            | Purpose            | Why                                                                                                                                    |
| ---------------- | ------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Supabase Storage | Already configured | Screenshot storage | Already used for 9 folder types (staff, menu, logos, etc.). Add a `feedback` folder config to existing `FOLDER_CONFIGS` in `route.ts`. |

**What to do:**

- Add `'feedback-screenshots'` folder config to existing `apps/backoffice/app/api/upload/image/route.ts`
- Config: `maxSize: 10MB`, `allowedTypes: ['image/png', 'image/jpeg', 'image/webp']`, `subfolder: 'feedback'`
- Path pattern: `feedback/{merchantId}/{timestamp}-{randomId}.{ext}`

**What NOT to do:**

- Do NOT add Cloudinary. No image transformations needed for feedback screenshots -- just store and display. Cloudinary adds cost ($99+/month at scale) and a new external dependency for zero benefit.
- Do NOT add Vercel Blob. Would split storage across two systems (Supabase for everything else, Blob for screenshots). Operational complexity for no gain.
- Do NOT use signed upload URLs. Screenshots are under 10MB; the existing server-side upload pattern works fine and maintains auth control.

**Cost:** Included in existing Supabase plan. 1GB free storage, Pro plan includes 100GB. Feedback screenshots at ~200KB avg, 100 feedbacks/month = ~20MB/month. Negligible.

**Confidence:** HIGH -- pattern verified in existing codebase.

---

### 2. AI Processing Pipeline

**Recommendation: OpenAI GPT-4.1-mini (upgrade from gpt-4o-mini) via existing client** -- update model constant only.

| Technology           | Version                     | Purpose                                      | Why                                                                                       |
| -------------------- | --------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `openai` npm package | ^6.15.0 (already installed) | AI API client                                | Already in backoffice, lazy-initialized, with cost tracking                               |
| GPT-4.1-mini model   | API model ID                | Translation + classification + summarization | 60% cheaper than gpt-4o-mini ($0.40/$1.60 vs legacy pricing), better at structured output |
| GPT-4.1-nano model   | API model ID                | Duplicate detection, simple classification   | Ultra-cheap ($0.10/$0.40 per 1M tokens) for high-volume simple tasks                      |

**Pipeline architecture -- synchronous, not batch:**

Feedback processing does NOT need the OpenAI Batch API. Rationale:

- Volume: ~100-500 feedbacks/month across all merchants. This is trivially low.
- Latency expectation: Merchants expect near-instant submission confirmation. AI processing should complete within 5-10 seconds.
- Existing pattern: The codebase already processes AI tasks synchronously in API routes (translation, chat, suggestions).

**Processing steps (single API route, sequential):**

```
1. TRANSLATE (if not English) -- GPT-4.1-mini
   Input: merchant feedback text (any language)
   Output: English translation + detected source language

2. CLASSIFY -- GPT-4.1-nano (cheapest, fastest)
   Input: English text
   Output: { type, category, priority, sentiment }

3. SUMMARIZE -- GPT-4.1-mini
   Input: English text + classification
   Output: 1-sentence summary for kanban card

4. DUPLICATE CHECK -- GPT-4.1-nano with embedding comparison
   Input: summary + recent feedback summaries
   Output: potential_duplicate_ids[]
```

**Cost estimate (per feedback):**

- Translate: ~500 input tokens + ~500 output = $0.0004
- Classify: ~300 input + ~100 output = $0.00004
- Summarize: ~500 input + ~100 output = $0.0003
- Duplicate check: ~1000 input + ~100 output = $0.00015
- **Total per feedback: ~$0.001 (one tenth of a cent)**
- **Monthly at 500 feedbacks: ~$0.50**

**What to do:**

- Update `MODEL_PRICING` in `openai.ts` to include `gpt-4.1-mini` and `gpt-4.1-nano`
- Create `lib/ai/feedback-intelligence-service.ts` following existing service patterns
- Reuse existing `translation-service.ts` patterns for the translate step
- Use structured output (JSON mode) for classification -- already supported by OpenAI SDK v6

**What NOT to do:**

- Do NOT use OpenAI Batch API. Volume is too low to justify 24-hour async processing.
- Do NOT use embeddings for duplicate detection initially. Start with GPT-4.1-nano text comparison. Add pgvector embeddings only if duplicate detection accuracy is insufficient.
- Do NOT use GPT-4o or GPT-4.1 (full). Classification and summarization of short feedback texts do not need frontier model capabilities.

**Confidence:** HIGH -- existing OpenAI integration verified, pricing verified via official sources.

---

### 3. Real-time Notifications (Bell/Campanella)

**Recommendation: Supabase Realtime Postgres Changes (existing pattern)** -- zero new dependencies.

| Technology        | Version            | Purpose                   | Why                                                                                               |
| ----------------- | ------------------ | ------------------------- | ------------------------------------------------------------------------------------------------- |
| Supabase Realtime | Already configured | Push notification updates | Existing `useChatRealtime` hook pattern. Subscribe to `notifications` table changes per merchant. |

**Architecture:**

```
Database INSERT into `merchant_notifications` table
  → Supabase Realtime broadcasts via WebSocket
  → Client hook receives payload
  → Updates bell badge count + notification dropdown
```

**What to do:**

- Create `lib/realtime/notification-channel.ts` following `chat-channel.ts` pattern exactly
- Subscribe to `merchant_notifications` table filtered by `account_id`
- Initial load: fetch unread count + recent notifications via standard query
- Real-time: listen for INSERTs to update badge count

**What NOT to do:**

- Do NOT implement polling. Supabase Realtime is already working in production for chat. Same pattern, different table.
- Do NOT add Firebase Cloud Messaging (FCM) or push notifications. This is in-app only (bell icon). Browser push notifications are a separate future concern.
- Do NOT add a WebSocket library. Supabase JS client handles WebSocket connection internally.

**Confidence:** HIGH -- exact pattern already implemented in `chat-channel.ts`.

---

### 4. Kanban Board UI

**Recommendation: @dnd-kit (already installed)** -- extend existing pattern for multi-column kanban.

| Technology           | Version                     | Purpose                 | Why                                                       |
| -------------------- | --------------------------- | ----------------------- | --------------------------------------------------------- |
| `@dnd-kit/core`      | ^6.3.1 (already installed)  | Drag and drop core      | Already in package.json, used in site-builder SectionList |
| `@dnd-kit/sortable`  | ^10.0.0 (already installed) | Sortable containers     | Already in package.json                                   |
| `@dnd-kit/utilities` | ^3.2.2 (already installed)  | CSS transform utilities | Already in package.json                                   |

**Current vs needed:**

The existing SectionList uses `verticalListSortingStrategy` for reordering within a single list. The kanban board needs:

- Multiple columns (statuses: New, Reviewing, In Progress, Resolved, Won't Fix)
- Drag between columns (cross-container sorting)
- Drag within columns (priority reordering)

This is a standard @dnd-kit pattern. The library supports multi-container sorting out of the box with `DndContext` + multiple `SortableContext` containers.

**What to do:**

- Build kanban using the existing @dnd-kit packages -- no new installs
- Use `rectSortingStrategy` instead of `verticalListSortingStrategy` for column items
- Add `DragOverlay` for smooth cross-column drag visual feedback
- Follow the [dnd-kit kanban example pattern](https://docs.dndkit.com/)

**Alternatives considered:**

| Library                                           | Why NOT                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `@hello-pangea/dnd`                               | Would add a duplicate DnD library. @dnd-kit is already installed and sufficient.     |
| `@atlaskit/pragmatic-drag-and-drop`               | Smaller bundle but worse DX, limited docs, tied to Atlaskit. @dnd-kit already works. |
| Build from scratch with HTML5 DnD API             | Reinventing the wheel when @dnd-kit is already a dependency.                         |
| Third-party kanban component (react-kanban, etc.) | Over-opinionated, hard to customize to match existing Radix/Tailwind design system.  |

**Confidence:** HIGH -- library already installed and working in codebase.

---

### 5. Database Patterns

**Recommendation: Standard PostgreSQL with existing Supabase patterns** -- no new database technology.

| Technology            | Version                     | Purpose                          | Why                                                          |
| --------------------- | --------------------------- | -------------------------------- | ------------------------------------------------------------ |
| PostgreSQL (Supabase) | Already configured          | Feedback + notifications storage | All other data already here. RLS for multi-tenant isolation. |
| Prisma                | ^5.22.0 (already installed) | ORM for backoffice queries       | Already used for all backoffice data access                  |

**New tables needed:**

```sql
-- Core feedback table
merchant_feedback (
  id UUID PK,
  account_id UUID FK NOT NULL,       -- multi-tenant isolation
  merchant_id UUID FK NOT NULL,       -- who submitted
  location_id UUID FK,                -- optional, which location

  -- Merchant input
  type TEXT CHECK (type IN ('bug','feature_request','improvement','question','praise')) NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  screenshot_url TEXT,                -- Supabase Storage URL
  source_language TEXT,               -- detected language code

  -- AI processing
  translated_subject TEXT,            -- English translation
  translated_description TEXT,        -- English translation
  ai_summary TEXT,                    -- 1-sentence summary
  ai_category TEXT,                   -- AI-classified category
  ai_priority INTEGER CHECK (ai_priority BETWEEN 1 AND 5),
  ai_sentiment TEXT CHECK (ai_sentiment IN ('positive','neutral','negative')),
  ai_duplicate_of UUID FK REFERENCES merchant_feedback(id),
  ai_processed_at TIMESTAMPTZ,

  -- Internal management (GUDBRO team kanban)
  status TEXT CHECK (status IN ('new','reviewing','in_progress','resolved','wont_fix')) DEFAULT 'new',
  assigned_to TEXT,                   -- GUDBRO team member
  internal_notes TEXT,                -- GUDBRO team notes
  resolution TEXT,                    -- How it was resolved

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

-- Notification table for merchant bell
merchant_notifications (
  id UUID PK,
  account_id UUID FK NOT NULL,
  merchant_id UUID FK NOT NULL,

  type TEXT NOT NULL,                 -- 'feedback_status_change', 'feedback_response', etc.
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,                          -- Deep link within backoffice
  read BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Aggregation view for GUDBRO team
feedback_aggregation (
  id UUID PK,
  period TEXT NOT NULL,               -- 'weekly', 'monthly'
  period_start DATE NOT NULL,

  total_count INTEGER,
  by_type JSONB,                      -- {"bug": 5, "feature_request": 12, ...}
  by_category JSONB,
  by_sentiment JSONB,
  top_requests JSONB,                 -- [{subject, count, feedback_ids}]
  ai_generated_summary TEXT,          -- AI-written trend summary

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS policies:**

- Merchants can INSERT feedback and SELECT their own feedback + notifications
- GUDBRO team (service role) can SELECT/UPDATE all feedback
- Notifications filtered by `account_id = auth.uid()`
- Enable Realtime on `merchant_notifications` table

**Indexes:**

- `merchant_feedback(account_id, created_at DESC)` -- merchant's feedback list
- `merchant_feedback(status, ai_priority)` -- kanban board sorting
- `merchant_notifications(account_id, read, created_at DESC)` -- bell badge query

**What NOT to do:**

- Do NOT add pgvector for embeddings. Overkill for <500 feedbacks/month. GPT-4.1-nano text comparison is sufficient for duplicate detection.
- Do NOT create a separate database. Everything stays in the existing Supabase instance.
- Do NOT use ENUM types. Project convention is `TEXT + CHECK` constraints (per CLAUDE.md Section 11).

**Confidence:** HIGH -- follows existing database conventions verified in codebase.

---

### 6. Aggregation Pipeline

**Recommendation: Trigger.dev (already installed) for scheduled aggregation**

| Technology         | Version                    | Purpose                       | Why                                                                                                       |
| ------------------ | -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `@trigger.dev/sdk` | ^4.3.2 (already installed) | Scheduled AI aggregation jobs | Already used for `daily-briefing` and `social-content` triggers. Add weekly/monthly feedback aggregation. |

**What to do:**

- Create `trigger/ai/feedback-aggregation.ts` following existing trigger patterns
- Schedule: weekly (Sunday night) and monthly (1st of month)
- Job: Query all feedback in period, send to GPT-4.1-mini for trend analysis, write to `feedback_aggregation` table

**What NOT to do:**

- Do NOT use cron jobs or Vercel Cron. Trigger.dev is already the job runner for this project.
- Do NOT aggregate in real-time. Aggregation is a batch concern -- run it periodically.

**Confidence:** HIGH -- Trigger.dev already configured with AI jobs.

---

## Complete New Dependencies Summary

```bash
# Nothing new to install.
# All required packages are already in apps/backoffice/package.json:
#
# - @supabase/supabase-js (storage + realtime)
# - @supabase/ssr (auth)
# - openai (AI processing)
# - @dnd-kit/core + @dnd-kit/sortable + @dnd-kit/utilities (kanban DnD)
# - @trigger.dev/sdk (scheduled aggregation)
# - @prisma/client (database ORM)
# - zod (input validation)
# - @tanstack/react-query (data fetching + cache)

# Total new npm dependencies: 0
```

---

## Model Pricing Update Needed

The existing `openai.ts` has pricing for `gpt-4o-mini`, `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`. Update to include newer, cheaper models:

```typescript
// Add to MODEL_PRICING in openai.ts
'gpt-4.1-mini': { input: 0.40, output: 1.60 },
'gpt-4.1-nano': { input: 0.10, output: 0.40 },
'gpt-4.1': { input: 2.00, output: 8.00 },
```

**Cost-tier strategy for feedback intelligence:**

- **Nano tier** ($0.10/$0.40): Classification, duplicate detection, simple extraction
- **Mini tier** ($0.40/$1.60): Translation, summarization, trend analysis
- **Full tier** (not needed): Reserve for complex multi-step reasoning only

---

## Integration Points with Existing Stack

| Existing System                                           | Integration                                                                |
| --------------------------------------------------------- | -------------------------------------------------------------------------- |
| Supabase Storage (`/api/upload/image`)                    | Add `feedback-screenshots` folder config                                   |
| OpenAI client (`lib/ai/openai.ts`)                        | Add GPT-4.1-mini/nano pricing, update DEFAULT_MODEL consideration          |
| Translation service (`lib/ai/translation-service.ts`)     | Reuse translation patterns for feedback text                               |
| Feedback loop service (`lib/ai/feedback-loop-service.ts`) | **Extend or replace** -- already has matching types (AIFeedback interface) |
| Realtime hooks (`lib/realtime/chat-channel.ts`)           | Clone pattern for notification subscriptions                               |
| DnD components (`site-builder/SectionList.tsx`)           | Extend pattern for multi-column kanban                                     |
| Trigger.dev (`trigger/ai/daily-briefing.ts`)              | Add feedback aggregation scheduled job                                     |
| TanStack Query (`@tanstack/react-query`)                  | Use for feedback list, kanban state, notification polling fallback         |
| Zod (`zod`)                                               | Validate feedback submission form input                                    |
| Radix UI + Tailwind                                       | Build kanban cards, notification dropdown, feedback form                   |

---

## Architecture Decision: Existing feedback-loop-service.ts

The codebase already has `lib/ai/feedback-loop-service.ts` with an `AIFeedback` interface that closely matches our needs. It defines:

- Types: `bug`, `feature_request`, `improvement`, `complaint`, `praise`, `question`
- Categories: `ai_chat`, `ai_actions`, `ai_suggestions`, `ui_ux`, `data_accuracy`, `performance`, `other`
- Status: `new`, `reviewed`, `in_progress`, `resolved`, `wont_fix`
- AI fields: `aiSummary`, `aiSentiment`, `aiPriority`

**Recommendation:** Extend this existing service rather than creating from scratch. The types are already defined and match the Merchant Feedback Intelligence requirements. Add:

1. Translation step (not in current service)
2. Duplicate detection (not in current service)
3. Screenshot upload integration
4. Aggregation pipeline
5. Notification system

---

## Sources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage) -- Storage setup and RLS (HIGH confidence)
- [Supabase Realtime Documentation](https://supabase.com/docs/guides/realtime) -- Postgres Changes subscriptions (HIGH confidence)
- [OpenAI API Pricing](https://openai.com/api/pricing/) -- GPT-4.1-mini/nano pricing verified (HIGH confidence)
- [GPT-4.1 Pricing Calculator](https://pricepertoken.com/pricing-page/model/openai-gpt-4.1) -- Batch vs standard pricing (MEDIUM confidence)
- [@dnd-kit/core on npm](https://www.npmjs.com/package/@dnd-kit/core) -- v6.3.1 latest stable (HIGH confidence)
- [dnd-kit Kanban Board Guide](https://docs.dndkit.com/) -- Multi-container sorting patterns (MEDIUM confidence)
- [Building Real-time Notifications with Supabase and Next.js](https://makerkit.dev/blog/tutorials/real-time-notifications-supabase-nextjs) -- Notification system pattern (MEDIUM confidence)
- [Complete Guide to File Uploads with Next.js and Supabase](https://supalaunch.com/blog/file-upload-nextjs-supabase) -- Upload patterns (MEDIUM confidence)
- Existing codebase: `apps/backoffice/app/api/upload/image/route.ts`, `lib/ai/openai.ts`, `lib/ai/feedback-loop-service.ts`, `lib/realtime/chat-channel.ts`, `settings/site-builder/components/SectionList.tsx` (HIGH confidence)
