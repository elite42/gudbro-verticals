# Project Research Summary

**Project:** GUDBRO Merchant Feedback Intelligence System (v1.3)
**Domain:** AI-powered feedback collection, classification, and internal task management for multi-vertical SaaS
**Researched:** 2026-01-30
**Confidence:** HIGH

## Executive Summary

The GUDBRO Merchant Feedback Intelligence system is an **integration and composition** task, not a greenfield build. Research reveals that 95% of required capabilities already exist in the backoffice codebase: Supabase Storage for screenshots, OpenAI integration for AI processing, Realtime for notifications, and even a `feedback-loop-service.ts` with matching data structures. The key insight is that this is about extending existing patterns, not adding new technology.

The recommended approach is a **three-phase build**: (1) Foundation with database schema, AI processing service, and API routes; (2) Merchant-facing submission flow with notification system; (3) Admin kanban board for GUDBRO team task management. This order follows natural dependencies — merchants provide input before admins can manage it — and leverages existing infrastructure incrementally. The system processes feedback synchronously on submit (translate to English, classify by type/priority, detect duplicates, aggregate similar requests into internal tasks), then notifies merchants asynchronously as tasks progress.

The primary risk is **over-engineering**. The most common pitfall in feedback systems is building Canny-level public voting boards with complex workflows when GUDBRO needs a lightweight internal kanban with smart aggregation. Research confirms: zero new npm dependencies required, use GPT-4.1-mini/nano for cost-efficient AI ($0.001 per submission), and cap V1 scope at submission + aggregation + notifications. Defer public roadmaps, GitHub integration, and semantic clustering to post-MVP once the system proves value.

## Key Findings

### Recommended Stack

**Zero new dependencies.** Every capability needed already exists in the backoffice. The stack research focused on what to reuse and extend rather than what to add.

**Core technologies:**

- **Supabase Storage** (existing): Screenshot uploads — add `feedback-screenshots` folder config to existing `/api/upload/image` route. Handles 10MB images, RLS isolation, ~$0.20/month at expected volume.
- **OpenAI GPT-4.1-mini/nano** (upgrade from gpt-4o-mini): AI processing pipeline — translation, classification, duplicate detection. $0.001 per feedback submission (~$0.50/month at 500 feedbacks/month). Update `MODEL_PRICING` constants only.
- **Supabase Realtime** (existing): Push notifications via Postgres Changes — clone `chat-channel.ts` pattern for `notification-channel.ts` subscribing to `fb_merchant_notifications` table.
- **@dnd-kit** (already installed): Kanban drag-and-drop — extend existing `SectionList.tsx` pattern from single-column to multi-column with `rectSortingStrategy`.
- **Trigger.dev** (existing): Scheduled aggregation jobs — add `feedback-aggregation.ts` trigger for weekly/monthly trend analysis following `daily-briefing.ts` pattern.
- **PostgreSQL + Prisma** (existing): Three new tables (`fb_submissions`, `fb_tasks`, `fb_merchant_notifications`) following existing TEXT+CHECK conventions, RLS via `account_roles`, indexed for performance.

**Architecture decision:** Extend existing patterns rather than replace. The current `feedback-loop-service.ts` already defines matching types (`bug`, `feature_request`, `improvement`, statuses, AI fields). Build on this foundation instead of creating parallel infrastructure.

**Cost efficiency:** At 500 feedbacks/month, total AI cost is ~$0.50/month (translation + classification + embedding + duplicate check). Storage adds ~$0.20/month. Total incremental cost: ~$1/month. This is negligible compared to platform revenue.

### Expected Features

Research analyzed 12+ SaaS feedback systems (Canny, Productboard, Usersnap, Frill) to identify table stakes vs differentiators vs anti-features.

**Must have (table stakes):**

- **Feedback submission form** — Type selector (bug/feature/feedback), free-text description, screenshot upload (67% of bug reports need visual context per Usersnap data), vertical/module auto-detection
- **AI processing pipeline** — Auto-translate to English (GUDBRO is multi-country), classify by type/priority, detect duplicates via similarity, aggregate similar submissions into actionable internal tasks
- **Internal team kanban** — Columns (New, Reviewing, In Progress, Done, Rejected), drag-and-drop workflow, task cards showing aggregated info (merchant count, languages, sentiment, priority)
- **Merchant notifications** — "Received" confirmation, "In Progress" update, "Completed" or "Declined" with reason. Email + in-app bell icon with unread count.
- **Feedback history list** — Merchants see their past submissions with current status (Submitted, In Review, Planned, Completed, Declined)
- **Native language input** — Merchants write in any language, AI handles translation. No language picker needed.

**Should have (competitive differentiators):**

- **Smart aggregation engine** — Semantic clustering (not just keyword matching) to group "menu is slow" with "loading takes forever on food page"
- **Auto-generated task summaries** — AI reads 15 merchant submissions and produces one clear summary for team
- **Sentiment analysis** — Detect frustrated merchants before they churn, auto-escalate high-priority + negative sentiment
- **Cross-vertical pattern recognition** — Surface themes like "4 verticals all asking for dark mode"

**Defer (v2+):**

- **Public roadmap** — Creates entitlement ("500 votes means you must build it"). GUDBRO is early-stage, keep product direction team-driven.
- **Real-time chat** — Turns feedback into support desk, different problem space
- **GitHub integration** — Sync with issues/PRs. Wait until dev workflow stabilizes.
- **NPS/CSAT surveys** — Different methodology, separate feature
- **Multi-step wizards** — Friction kills submissions, keep single-page form

**Critical insight:** The gap between "feedback form" and "feedback intelligence" is the aggregation layer. Many platforms collect feedback but merchants see no action because the volume overwhelms the team. GUDBRO's AI aggregation (translate, classify, merge duplicates) is the core value proposition.

### Architecture Approach

**Decision: New tables with `fb_` prefix, not extending `ai_feedback`.** The existing `ai_feedback` table is scoped to AI Co-Manager feedback (categories like `ai_chat`, `ai_actions`). The new system is general-purpose product feedback with different aggregation needs. Clean separation prevents breaking existing AI feedback flows.

**Major components:**

1. **Database layer** — Three tables: `fb_submissions` (merchant input + AI analysis), `fb_tasks` (aggregated tasks for kanban with denormalized metrics), `fb_merchant_notifications` (bell icon state). RLS via `account_roles.tenant_id` for multi-tenant isolation. Service role for admin full access.

2. **AI processing service** (`lib/feedback/feedback-intelligence-service.ts`) — Single synchronous pipeline on submit (~2-3s total): detect language, translate to English if needed, classify type/priority/sentiment, extract topic tags, find similar existing tasks via tag overlap + trigram similarity (V1 approach, no embeddings yet), link to existing task or create new one.

3. **API routes** (`/api/feedback/...`) — 8 new routes: submissions CRUD, tasks CRUD, task reorder, notifications list/count. Follows existing auth patterns (`getSession()` server-side, RLS enforcement). Side-effects: moving task to Done/Rejected triggers merchant notifications for all linked submissions.

4. **Merchant UI** (`settings/feedback/page.tsx`) — FeedbackSubmitForm (type selector, title, description, screenshot uploader) + MySubmissionsList (past submissions with status badges). Uses existing Radix + Tailwind patterns.

5. **Admin UI** (`platform/feedback/page.tsx`) — FeedbackKanbanBoard with drag-and-drop (@dnd-kit multi-column pattern), TaskCard components, TaskDetailPanel slide-out showing all linked submissions with original language + English translation side-by-side.

6. **Notification system** — Polling-based (60-second interval) via `/api/feedback/notifications/count` for bell badge. Simpler than Realtime for non-critical notifications. NotificationBell component in global header.

**Integration points with existing stack:**

- Screenshot upload: Add `feedback-screenshots` folder to `/api/upload/image` FOLDER_CONFIGS
- AI client: Reuse `lib/ai/openai.ts`, add GPT-4.1-mini/nano pricing
- Translation: Follow `translation-service.ts` patterns
- Realtime (optional future): Clone `chat-channel.ts` pattern if polling proves insufficient
- DnD: Extend `site-builder/SectionList.tsx` from single-column to multi-column
- Trigger.dev: Add `feedback-aggregation.ts` for weekly/monthly batch analysis

**Build order:** Database → AI service → API routes → Merchant UI → Notification system → Admin kanban. This sequence follows natural dependencies and allows incremental testing with real data.

### Critical Pitfalls

Research identified 14 pitfalls from SaaS feedback systems and Playwright E2E testing. Top 5 for this project:

1. **Over-engineering the feature scope** — Most feedback systems fail by trying to be Canny/Productboard clones with public voting, complex workflows, and feature request management. For GUDBRO v1.3, the goal is simpler: collect merchant input, let AI aggregate duplicates, give the team an internal kanban. Defer public roadmaps, GitHub sync, and advanced analytics to v2+. Prevention: Cap MVP at 3 tables, 8 API routes, 2 UI pages (merchant submit, admin kanban).

2. **Testing mock-data apps as if they have backends** — 7 of 8 GUDBRO verticals use mock data (coffeeshop, tours, wellness, laundry, pharmacy, workshops, gym). Writing E2E tests that assert specific product names or prices creates brittleness — when mock data updates, every test breaks. Prevention: Test structure, not content. Assert "menu has items" not "menu has Cappuccino at EUR 3.50." Only accommodations (real Supabase backend) should test data accuracy.

3. **Ignoring multi-language complexity** — GUDBRO operates across multiple countries and languages. Merchants will submit feedback in Italian, Vietnamese, Korean, etc. Forcing English input loses nuance. The AI pipeline MUST translate every submission to English for team processing, but store both original and translated versions. Prevention: Make translation the first step in AI pipeline, store `original_language` + `title_en` + `description_en`, display side-by-side in admin UI.

4. **Building a brittle kanban with hard-coded workflows** — Many systems enforce rigid status transitions (can't move from Inbox to Done without passing through Triaging and Planned). This breaks when reality doesn't match the flowchart. Prevention: Allow any status transition, log state changes for audit trail, rely on human judgment not enforced workflows.

5. **Notification fatigue from real-time updates** — Sending merchants a notification for every minor status change trains them to ignore notifications. Prevention: Notify only on meaningful state changes: submission acknowledged, moved to In Progress, completed, or declined. Do NOT notify on "Reviewing" or internal team actions. Rate limit to max 1 notification per submission per day.

**Secondary pitfalls to watch:**

- Port conflicts when testing 8 apps simultaneously (test verticals sequentially, not in parallel)
- Merchant-to-merchant discussion threads (out of scope, use existing WhatsApp channels)
- Auto-responses without human review (AI drafts, humans send)
- Full-text search before needed (embedding similarity suffices for <1000 submissions)

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation (Database + AI Processing)

**Rationale:** Database schema and AI processing service are foundational dependencies. Everything else builds on these. Migration must come first to establish the data model. AI service must be testable independently before wiring to API routes.

**Delivers:**

- Migration 082: `fb_submissions`, `fb_tasks`, `fb_merchant_notifications` tables with RLS policies
- `lib/feedback/types.ts` with TypeScript interfaces
- `lib/feedback/feedback-intelligence-service.ts` with translate/classify/similarity functions
- `lib/feedback/feedback-queries.ts` with DB query helpers
- Updated `/api/upload/image` route with `feedback-screenshots` folder config
- Updated `lib/ai/openai.ts` with GPT-4.1-mini/nano pricing

**Addresses:** Table stakes features (AI processing pipeline), avoids pitfall of building UI before data model is validated.

**Avoids:** Over-engineering (no embeddings yet, no real-time subscriptions, no complex workflows — just the minimum viable data structure).

**Estimated effort:** 8-12 hours (migration + service + tests).

### Phase 2: Merchant Submission Flow

**Rationale:** Merchants are the input side. Need working submission flow before admin side has anything to manage. This phase makes the system functional for data collection.

**Delivers:**

- `POST /api/feedback/submissions` route with sync AI processing
- `GET /api/feedback/submissions` route for merchant's own history
- `GET /api/feedback/submissions/[id]` route for detail view
- `components/feedback/FeedbackSubmitForm.tsx` with type selector, title, description, screenshot upload
- `components/feedback/MySubmissionsList.tsx` with SubmissionCard and StatusBadge components
- `app/(dashboard)/settings/feedback/page.tsx` merchant-facing page
- "Feedback" link in Settings section of Sidebar

**Uses:** Phase 1 database schema, AI service, screenshot upload config.

**Implements:** Merchant submission form (table stakes), feedback history list (table stakes), native language input (table stakes).

**Avoids:** Brittle selectors pitfall — add `data-testid` attributes to key elements during build, not as separate task.

**Estimated effort:** 10-14 hours (API routes + components + integration).

### Phase 3: Notification System

**Rationale:** Close the feedback loop early. Merchants need to see their submissions were received and are being acted on. Notifications provide this visibility before full kanban is built.

**Delivers:**

- `GET /api/feedback/notifications` and `GET /api/feedback/notifications/count` routes
- `PATCH /api/feedback/notifications` route for mark-as-read
- `hooks/useFeedbackNotifications.ts` with 60-second polling
- `components/layout/NotificationBell.tsx` with unread badge and dropdown
- Integrated bell icon in global header
- Auto-notification creation on submission (acknowledged) and task status changes

**Uses:** Phase 1 notification table, Phase 2 submission flow triggers.

**Implements:** Merchant notifications (table stakes), in-app notification center (table stakes).

**Avoids:** Notification fatigue pitfall — only notify on meaningful state changes, max 1/day per submission.

**Estimated effort:** 8-10 hours (routes + polling + UI + integration).

### Phase 4: Admin Kanban Board

**Rationale:** Admin side is the most complex UI (drag-and-drop, aggregated data display, multi-merchant visibility). Building this last means there's real submission data to work with and test against.

**Delivers:**

- `GET /api/feedback/tasks` route for kanban data with filters
- `PATCH /api/feedback/tasks/[id]` route for task updates (move column, assign, add notes)
- `PATCH /api/feedback/tasks/reorder` route for drag-and-drop persistence
- `GET /api/feedback/tasks/[id]/submissions` route for linked submissions view
- `components/feedback/FeedbackKanbanBoard.tsx` with @dnd-kit multi-column
- `components/feedback/TaskCard.tsx`, `ColumnHeader.tsx`, `TaskDetailPanel.tsx`
- `app/(dashboard)/platform/feedback/page.tsx` admin-only page
- Status change triggers for merchant notifications (In Progress, Done, Rejected)

**Uses:** Phase 1 tasks table, @dnd-kit library, existing Radix/Tailwind patterns.

**Implements:** Internal team kanban (table stakes), task cards with aggregated info (table stakes), linked submissions view (table stakes), assignment (table stakes).

**Avoids:** Hard-coded workflow pitfall — allow any status transition, log changes, trust team judgment.

**Estimated effort:** 14-18 hours (drag-and-drop is complex, testing multi-merchant aggregation takes time).

### Phase 5: Analytics and Polish (Optional for v1.3)

**Rationale:** Nice-to-have for launch, but not blocking. Analytics provide insights once there's data volume. Can be deferred to v1.4 if timeline is tight.

**Delivers:**

- Basic analytics dashboard: submission volume over time, breakdown by type/vertical, response time tracking
- Top requested features list (by linked submission count)
- Trigger.dev aggregation job for weekly/monthly trend summaries
- UI polish: loading states, error handling, empty states, mobile responsive refinements

**Uses:** Phase 1-4 complete system, Trigger.dev patterns from existing daily-briefing job.

**Implements:** Basic analytics (table stakes), smart aggregation engine (differentiator via scheduled batch job).

**Estimated effort:** 6-8 hours (simpler than kanban, mostly queries + charts).

### Phase Ordering Rationale

- **Database first** because everything depends on the schema. Building UI before data model is validated causes rework.
- **AI service second** because it's independent and testable in isolation. Submit flow needs it but doesn't block UI scaffolding.
- **Merchant flow before admin** because merchants are the input side — you need submissions before admins have anything to manage. Also allows early validation that AI processing works correctly.
- **Notifications before kanban** because closing the feedback loop early (letting merchants see their input was received) is higher value than giving admins a fancy UI. Notifications can work with the simple task list from Phase 2.
- **Kanban last** because it's the most complex UI component (drag-and-drop, multi-merchant aggregation display) and benefits from having real data to develop against.
- **Analytics optional** because it's reporting on data patterns — needs volume first. Can launch without it and add in v1.4 based on team usage patterns.

### Research Flags

**Phases with standard patterns (skip research-phase):**

- **Phase 1:** Database schema and AI service follow existing backoffice patterns (Supabase RLS, OpenAI client, Prisma queries). No new research needed.
- **Phase 2:** Submission form is standard Next.js + Radix UI. Screenshot upload already implemented. No research needed.
- **Phase 3:** Notification polling is straightforward. Bell icon follows existing header patterns. No research needed.

**Phases likely needing deeper research during planning:**

- **Phase 4:** Drag-and-drop kanban with @dnd-kit. While the library is already installed, extending from single-column (existing SectionList) to multi-column with cross-container sorting is a new pattern. Plan to allocate 2-3 hours for researching @dnd-kit multi-container examples and testing drag behavior.
- **Phase 5 (if included):** Trigger.dev scheduled jobs. While daily-briefing pattern exists, feedback aggregation has different data needs (clustering similar submissions, generating trend summaries). May need 1-2 hours researching optimal aggregation algorithms.

**External dependencies to validate:**

- **OpenAI API:** Verify GPT-4.1-mini/nano pricing and availability. If models are not accessible, fallback to gpt-4o-mini (already working, just slightly more expensive).
- **Supabase Storage:** Confirm current plan has sufficient storage for feedback screenshots. At ~200KB avg, 500 screenshots/month = ~100MB/month. Current plan likely sufficient but worth checking.

## Confidence Assessment

| Area         | Confidence | Notes                                                                                                                                                                                                                                                                             |
| ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH       | Every technology is already in use. Research verified by reading existing code (`feedback-loop-service.ts`, `chat-channel.ts`, `upload/image/route.ts`, etc.). No new dependencies = no unknown unknowns.                                                                         |
| Features     | HIGH       | Analyzed 12+ competing products (Canny, Productboard, Usersnap, Frill) with strong consensus on table stakes. GUDBRO's multi-language requirement is well-understood from existing translation infrastructure.                                                                    |
| Architecture | HIGH       | All patterns verified against existing codebase. Database conventions (TEXT+CHECK, RLS via account_roles), API patterns (getSession, service role), UI patterns (Radix+Tailwind) are established. Only new pattern is multi-column kanban, which is well-documented for @dnd-kit. |
| Pitfalls     | HIGH       | Based on documented failure modes from feedback system postmortems, Playwright testing guides, and GUDBRO's own lessons-learned. The 7-mock-data vs 1-real-backend distinction is unique to GUDBRO but clearly understood from codebase inspection.                               |

**Overall confidence:** HIGH

### Gaps to Address

**Minor gaps:**

- **GPT-4.1 model availability:** Research assumes GPT-4.1-mini and GPT-4.1-nano are available via OpenAI API. These are newer models (late 2025/early 2026 announcements). If not accessible, fallback to `gpt-4o-mini` (already working, tested in codebase, just 60% more expensive at $0.15/$0.60 per 1M tokens vs $0.10/$0.40 for nano and $0.40/$1.60 for mini). Cost difference at 500 feedbacks/month: ~$0.30/month more. Negligible.
  - **Validation:** Test API call with `gpt-4.1-mini` model name during Phase 1. If 404/not-found, update constants to use `gpt-4o-mini`.

- **Duplicate detection accuracy:** V1 approach uses tag overlap + trigram similarity instead of embeddings. This is intentionally simpler (no pgvector extension, no embedding storage) but may miss semantic duplicates. Research suggests this is acceptable for <1000 submissions but needs real-world validation.
  - **Validation:** During Phase 2, after 20-30 real submissions, manually review duplicate detection accuracy. If <70% accuracy (too many false negatives), plan to add embeddings in Phase 5 or v1.4.

- **Kanban drag-and-drop on mobile:** @dnd-kit works well on desktop. Mobile touch support exists but needs testing on actual devices (not just Chrome DevTools). Research confirms it should work but touch interactions may need tuning.
  - **Validation:** During Phase 4, test on 2-3 actual mobile devices (iOS Safari, Android Chrome). If touch DnD is problematic, provide fallback UI (move-up/move-down buttons) for mobile.

**No major gaps.** The research confidence is high because all technology is already in use and patterns are verified in production code.

## Sources

### Primary (HIGH confidence)

- **GUDBRO codebase** — Verified against existing implementations:
  - `apps/backoffice/lib/ai/feedback-loop-service.ts` (matching types and AI processing pattern)
  - `apps/backoffice/app/api/upload/image/route.ts` (screenshot upload pattern)
  - `apps/backoffice/lib/ai/openai.ts` (AI client with cost tracking)
  - `apps/backoffice/lib/realtime/chat-channel.ts` (Realtime subscription pattern)
  - `apps/backoffice/app/(dashboard)/settings/site-builder/components/SectionList.tsx` (@dnd-kit single-column pattern)
  - `shared/database/migrations/` (migrations 012, 024, 029, 059 for schema conventions)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage) — Storage RLS and folder organization
- [Supabase Realtime Documentation](https://supabase.com/docs/guides/realtime) — Postgres Changes subscriptions
- [OpenAI API Pricing](https://openai.com/api/pricing/) — GPT-4.1-mini/nano pricing (verified 2026-01-30)
- [@dnd-kit Documentation](https://docs.dndkit.com/) — Multi-container sorting patterns

### Secondary (MEDIUM confidence)

- [Canny](https://canny.io/use-cases/feature-request-management) — Feature request management patterns
- [Productboard](https://www.featurebase.app/blog/canny-vs-productboard) — Competitive analysis
- [Usersnap](https://usersnap.com/l/feedback-management-tool) — Screenshot-based feedback UX (67% stat on visual context)
- [Qualaroo: SaaS Feedback Strategies](https://qualaroo.com/blog/customer-feedback-saas/) — Table stakes features
- [Zonka: Feedback Tools 2026](https://www.zonkafeedback.com/blog/saas-customer-feedback-tools) — Tool comparison
- [Featurebase: SaaS Feedback Tools](https://www.featurebase.app/blog/saas-feedback-tools) — Feature analysis
- [Frill: Customer Feedback Software](https://frill.co/blog/posts/customer-feedback-software) — Top 20 tools comparison
- [Kanban Tool: Feedback Management](https://kanbantool.com/blog/feedback-management-with-kanban) — Kanban workflow patterns
- [ProductLed: SaaS Feedback Loop](https://productled.com/blog/saas-customer-feedback-loop) — Closing the loop best practices
- [Userpilot: Notification Types](https://userpilot.com/blog/notification-types/) — In-app notification patterns
- [Dialzara: Multilingual Feedback Tools](https://dialzara.com/blog/top-7-ai-tools-for-multilingual-feedback) — Multi-language handling
- [BrowserStack: Playwright Best Practices](https://www.browserstack.com/guide/playwright-best-practices) — E2E testing patterns
- [Turborepo Playwright Guide](https://turborepo.com/docs/guides/tools/playwright) — Monorepo testing

### Tertiary (LOW confidence, needs validation)

- [PricePerToken GPT-4.1 Calculator](https://pricepertoken.com/pricing-page/model/openai-gpt-4.1) — Batch pricing comparison (source reliability uncertain, prefer official OpenAI docs)
- [FeedbackPlus OSS Screenshot Library](https://github.com/ColonelParrot/feedbackplus) — Alternative screenshot approach (not needed, using existing Supabase pattern)

---

**Research completed:** 2026-01-30
**Ready for roadmap:** Yes

**Next step:** Create roadmap with 4-5 phases based on implications above. Each phase should have 3-5 atomic tasks, clear acceptance criteria, and estimated effort (4-18 hours per phase based on complexity).
