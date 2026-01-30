# Feature Landscape: Merchant Feedback Intelligence System

**Domain:** AI-powered merchant feedback collection, classification, and internal task management for multi-vertical SaaS
**Researched:** 2026-01-30
**Confidence:** HIGH (well-established patterns from Canny, Productboard, Usersnap; existing GUDBRO AI infrastructure)

## Context

GUDBRO is a multi-vertical SaaS platform serving merchants across 8+ verticals (F&B, accommodations, gym, wellness, tours, laundry, pharmacy, workshops) in multiple countries and languages. Merchants access a backoffice dashboard (52 pages, Next.js 14, Supabase). An AI Co-Manager system already exists with 15 services using OpenAI GPT-4o/4o-mini.

The Feedback Intelligence system must:

- Let merchants submit feedback/bugs/feature requests from their backoffice Settings page
- AI processes submissions: translates to English, classifies by type/priority, detects duplicates
- Similar requests get aggregated into actionable internal tasks
- GUDBRO team manages aggregated tasks via internal kanban
- Merchants receive status notifications as their requests progress

### Existing Infrastructure to Leverage

| Asset                            | What It Provides                                                   |
| -------------------------------- | ------------------------------------------------------------------ |
| AI Co-Manager (15 services)      | OpenAI integration, gpt-4o/4o-mini clients, service patterns       |
| Notification system (7 channels) | WhatsApp, Zalo, Telegram, email, push, Kakao, Line                 |
| Supabase + RLS                   | Multi-tenant database with row-level security patterns             |
| Backoffice Settings              | 15 settings pages already exist, natural home for feedback         |
| `feedback-loop-service.ts`       | Existing merchant feedback service (ai_merchant_preferences table) |
| Audit Log (migration 064)        | Event tracking patterns                                            |

---

## Table Stakes

Features merchants and the GUDBRO team expect. Missing any of these makes the system feel incomplete or unusable.

### 1. Feedback Submission Form (Merchant-Facing)

| Feature                                                              | Why Expected                                                            | Complexity | Notes                                                                                                |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| Feedback type selector (Bug, Feature Request, Improvement, Question) | Merchants need to categorize what they're reporting                     | Low        | Dropdown or segmented control. Maps to internal classification.                                      |
| Free-text description field                                          | Core of any feedback system                                             | Low        | Rich text unnecessary -- plain textarea with character limit (1000 chars).                           |
| Screenshot attachment                                                | 67% of bug reports are ambiguous without visual context (Usersnap data) | Medium     | Use html2canvas for DOM-based capture + file upload fallback. Max 3 images.                          |
| Vertical/module selector                                             | GUDBRO has 8+ verticals; team needs to know which module is affected    | Low        | Auto-detect from merchant's active verticals. Pre-populated dropdown.                                |
| Submission confirmation                                              | Merchants need to know their feedback was received                      | Low        | Toast notification + email confirmation. Sets expectation for response time.                         |
| Feedback history list                                                | Merchants want to track what they've submitted and current status       | Low        | Simple list view in Settings with status badges (Submitted, In Review, In Progress, Done, Rejected). |
| Native language input                                                | Merchants are in multiple countries; forcing English loses nuance       | Low        | Accept any language. AI handles translation. No language picker needed.                              |

**Dependency:** Existing backoffice Settings page structure (15 pages already exist).

### 2. AI Processing Pipeline

| Feature                                                | Why Expected                                                                | Complexity | Notes                                                                                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Auto-translation to English                            | GUDBRO team works in English; merchants write in native language            | Low        | Use existing gpt-4o-mini integration. ~$0.0015 per translation. Store both original + translated.                                      |
| Type classification (bug/feature/improvement/question) | Even if merchant selects a type, AI should verify and re-classify if needed | Low        | Single GPT-4o-mini call with few-shot prompt. Confidence score stored.                                                                 |
| Priority inference (critical/high/medium/low)          | Team needs automated triage to focus on what matters                        | Medium     | Based on: keyword analysis, merchant tier, frequency of similar reports, affected vertical count.                                      |
| Duplicate/similar detection                            | Prevents the same issue from being tracked 20 times                         | Medium     | Use text-embedding-3-small ($0.02/1M tokens) to generate embeddings. Cosine similarity threshold (>0.85) to flag potential duplicates. |
| Aggregation into internal tasks                        | The core intelligence: N merchant submissions become 1 actionable task      | High       | When similarity threshold met, auto-link new submission to existing internal task. Increment vote count. Surface in kanban.            |

**Dependency:** Existing OpenAI integration (openai-client.ts), text-embedding-3-small model already configured.

### 3. Internal Team Kanban (GUDBRO Admin-Facing)

| Feature                            | Why Expected                                                                                      | Complexity | Notes                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------- |
| Kanban board with columns          | Standard task management UX. Columns: Inbox, Triaging, Planned, In Progress, Done, Rejected       | Medium     | Build with existing Radix UI + Tailwind. Drag-and-drop with @dnd-kit or similar. |
| Task cards with aggregated info    | Each card shows: title, type, priority, vote count (how many merchants reported this), top quotes | Medium     | Aggregated view is the key differentiator vs a basic helpdesk.                   |
| Status workflow transitions        | Move tasks through stages with validation (e.g., can't skip from Inbox to Done)                   | Low        | State machine pattern. Simple allowed-transitions map.                           |
| Filter by type, priority, vertical | Team needs to focus on specific areas                                                             | Low        | Standard filter UI. Combine with search.                                         |
| Assignment to team member          | Someone owns each task                                                                            | Low        | Simple user selector. Store assignee_id.                                         |
| Linked submissions view            | Click a task to see all original merchant submissions that fed into it                            | Low        | One-to-many relationship. Show original language + translation side-by-side.     |
| Manual task creation               | Sometimes the team identifies issues themselves                                                   | Low        | Same form as aggregated tasks but without linked submissions.                    |

**Dependency:** Backoffice auth system (JWT), team/role management.

### 4. Merchant Notifications (Status Updates)

| Feature                             | Why Expected                                              | Complexity | Notes                                                                     |
| ----------------------------------- | --------------------------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| "Received" confirmation             | Immediate feedback that submission was captured           | Low        | Email + in-app notification. Triggered on submission.                     |
| "In Progress" notification          | Merchant knows their issue is being worked on             | Low        | Triggered when linked internal task moves to "In Progress".               |
| "Completed" notification            | Closed loop -- merchant sees their feedback led to action | Low        | Triggered on task completion. Include brief description of what was done. |
| "Rejected" notification with reason | Honest communication prevents frustration                 | Low        | Triggered on rejection. Requires team to enter reason (mandatory field).  |
| In-app notification center          | Merchants see all notifications in backoffice             | Medium     | Bell icon in header. Unread count badge. List of recent notifications.    |

**Dependency:** Existing notification system (7 channels, migration 059). Leverage for email/push. In-app needs new UI.

### 5. Basic Analytics

| Feature                             | Why Expected                                                        | Complexity | Notes                                                      |
| ----------------------------------- | ------------------------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| Submission volume over time         | Team needs to track whether feedback volume is growing or declining | Low        | Simple line chart. Group by week/month.                    |
| Breakdown by type and vertical      | Identify which verticals generate most feedback, and what type      | Low        | Bar chart / pie chart. Standard analytics pattern.         |
| Average response time               | SLA tracking -- how fast does the team respond?                     | Low        | Calculate time between submission and first status change. |
| Top requested features (vote count) | Product prioritization signal                                       | Low        | Ranked list of internal tasks by linked submission count.  |

**Dependency:** Existing analytics infrastructure (migrations 017, 060, 061).

---

## Differentiators

Features that make this system smarter than a generic helpdesk or basic feedback form. Not expected in MVP, but these are what make the "Intelligence" part real.

### 6. Smart Aggregation Engine

| Feature                                         | Value Proposition                                                                        | Complexity | Notes                                                                                                                        |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Semantic clustering (not just keyword matching) | Groups "the menu is slow" and "loading takes forever on the food page" as the same issue | High       | Embedding-based clustering. Run nightly batch job to re-cluster. Use DBSCAN or hierarchical clustering on embedding vectors. |
| Auto-generated task summaries                   | AI reads 15 merchant submissions and produces one clear summary for the team             | Medium     | GPT-4o call with all linked submissions as context. Regenerate when new submissions link.                                    |
| Trend detection alerts                          | "Bug reports about payments increased 300% this week"                                    | Medium     | Compare current week vs rolling 4-week average. Alert on significant deviations.                                             |
| Cross-vertical pattern recognition              | "Merchants across 4 different verticals are all asking for dark mode"                    | Medium     | Cluster without vertical filter. Surface cross-cutting themes.                                                               |

### 7. Merchant Sentiment Analysis

| Feature                          | Value Proposition                                                      | Complexity | Notes                                                                      |
| -------------------------------- | ---------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------- |
| Sentiment scoring per submission | Detect frustrated merchants before they churn                          | Low        | Single GPT-4o-mini call. Store sentiment score (-1 to 1).                  |
| Merchant health score            | Aggregate sentiment over time per merchant                             | Medium     | Rolling average of last N submissions. Flag declining trends.              |
| Urgency escalation               | Auto-escalate if sentiment is very negative AND merchant is high-value | Medium     | Combine sentiment + merchant tier + submission type. Push to top of Inbox. |

### 8. Public Roadmap / Changelog

| Feature                     | Value Proposition                                          | Complexity | Notes                                                                                |
| --------------------------- | ---------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| Public roadmap view         | Merchants see what's planned, what's in progress           | Medium     | Subset of kanban visible to merchants. Opt-in per task (team decides what's public). |
| Feature voting from roadmap | Merchants upvote features they want most                   | Low        | Simple vote button. Feeds into prioritization.                                       |
| Changelog/release notes     | "We shipped what you asked for" -- closes the loop visibly | Low        | Markdown-based release notes. Link to completed tasks.                               |

### 9. Smart Response Templates

| Feature                                         | Value Proposition                               | Complexity | Notes                                                                                             |
| ----------------------------------------------- | ----------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| AI-generated response drafts                    | Team reviews and sends, not writes from scratch | Medium     | GPT-4o generates response based on task context + merchant language. Team edits before sending.   |
| Auto-translate responses to merchant's language | Response arrives in merchant's native language  | Low        | Detect original submission language. Translate response with gpt-4o-mini.                         |
| Canned responses for common scenarios           | Speed up team workflow for repetitive replies   | Low        | Template library: "Known issue, fix coming", "Feature planned for Q2", "Not planned, here's why". |

### 10. Integration with Development Workflow

| Feature                                | Value Proposition                                    | Complexity | Notes                                                                              |
| -------------------------------------- | ---------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| GitHub Issue creation from kanban task | Seamless handoff to dev team                         | Medium     | Use GitHub API (gh CLI already in workflow). Create issue with aggregated context. |
| Status sync from GitHub                | When GitHub issue closes, kanban task auto-completes | Medium     | GitHub webhook or polling. Update task status + trigger merchant notifications.    |
| Link to specific code changes          | Merchants see "this was fixed in version X"          | Low        | Store commit/PR reference on completed tasks.                                      |

---

## Anti-Features

Features to explicitly NOT build. Common mistakes in feedback systems that add complexity without proportional value.

| Anti-Feature                                        | Why Avoid                                                                                                                                     | What to Do Instead                                                                                            |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Public voting board (Canny-style)                   | Creates entitlement ("500 votes means you must build it"). GUDBRO is early stage -- product direction should be team-driven, not vote-driven. | Internal vote counting from submissions. Team sees demand signals but retains decision authority.             |
| Real-time chat with merchants about their feedback  | Turns feedback system into a support desk. Different problem, different UX.                                                                   | Status notifications only. Use existing WhatsApp/chat channels for conversations.                             |
| SLA enforcement / automatic escalation timers       | Over-engineering for a small team. Creates false urgency.                                                                                     | Simple "days since submitted" counter visible on kanban cards. Human judgment for urgency.                    |
| Merchant-to-merchant discussion threads             | Creates community management burden. Not GUDBRO's value prop.                                                                                 | One-way submission. If merchants want to discuss, they have their own channels.                               |
| Custom feedback form builder (drag-and-drop fields) | Unnecessary flexibility. One good form beats 50 mediocre ones.                                                                                | Fixed form with type, description, screenshot, vertical. That's it.                                           |
| NPS/CSAT surveys within the feedback system         | Different methodology, different timing, different analysis. Mixing them dilutes both.                                                        | Build NPS/CSAT as a separate feature if needed. Feedback Intelligence is for qualitative input.               |
| Multi-step feedback wizards                         | Friction kills submission rates. Every extra step loses ~20% of submissions.                                                                  | Single-page form. Submit in under 60 seconds.                                                                 |
| Audio/video feedback recording                      | Complexity explosion (storage, transcription, playback). Screenshots + text cover 95% of cases.                                               | Screenshot capture + text description. Add video later only if text+screenshot proves insufficient.           |
| Automated response without human review             | Erodes trust. Merchants can tell when a bot responds.                                                                                         | AI drafts responses, human reviews and sends. Always.                                                         |
| Full-text search across all submissions             | Over-engineering for v1 volume. Embedding-based similarity is better for finding related items.                                               | Use embedding similarity for "find related". Add full-text search only when volume exceeds ~1000 submissions. |

---

## Feature Dependencies

```
Merchant Submission Form (Settings page)
    |
    +---> AI Processing Pipeline
    |         |
    |         +---> Translation (gpt-4o-mini)
    |         |
    |         +---> Classification (gpt-4o-mini)
    |         |
    |         +---> Embedding Generation (text-embedding-3-small)
    |         |         |
    |         |         +---> Duplicate Detection (cosine similarity)
    |         |                   |
    |         |                   +---> Aggregation into Internal Tasks
    |         |
    |         +---> Priority Inference
    |
    +---> Merchant Feedback History (read own submissions)
    |
    +---> Merchant Notifications
              |
              +---> "Received" (on submit)
              +---> "In Progress" (on task status change)
              +---> "Completed" / "Rejected" (on resolution)

Internal Team Kanban
    |
    +---> Task Cards (aggregated from submissions)
    |
    +---> Status Workflow (Inbox -> Triaging -> Planned -> In Progress -> Done/Rejected)
    |
    +---> Assignment
    |
    +---> Linked Submissions View
    |
    +---> Basic Analytics Dashboard

[LATER] Smart Aggregation Engine
    |
    +---> Semantic Clustering (nightly batch)
    +---> Auto-generated Summaries
    +---> Trend Detection

[LATER] GitHub Integration
    |
    +---> Issue Creation from Task
    +---> Status Sync Back
```

---

## Multi-Language Handling (Critical for GUDBRO)

GUDBRO merchants operate across multiple countries. Language handling is not a "nice to have" -- it's foundational.

| Aspect                         | Approach                                                                                               | Confidence                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| **Input language**             | Accept any language. No language picker. Detect automatically.                                         | HIGH -- GPT-4o-mini handles language detection natively                                     |
| **Translation**                | Translate every submission to English immediately on receipt. Store both original and English version. | HIGH -- Already using gpt-4o-mini for translations in the platform                          |
| **Classification**             | Classify on the English translation (more accurate than non-English classification)                    | HIGH -- English classification outperforms multilingual (research confirms performance gap) |
| **Embedding generation**       | Generate embeddings on English text for consistency in similarity matching                             | HIGH -- text-embedding-3-small performs best on English                                     |
| **Team interface**             | All internal kanban shows English translations. Toggle to see original language.                       | MEDIUM -- UX decision, straightforward implementation                                       |
| **Merchant notifications**     | Translate team responses back to merchant's detected language before sending                           | HIGH -- Same gpt-4o-mini pipeline. Store language preference on merchant profile.           |
| **Edge case: mixed languages** | Some merchants mix languages (e.g., Italian + English). Translate the full text regardless.            | MEDIUM -- GPT handles mixed input well but results vary                                     |

**Cost estimate for translation pipeline:**

- ~$0.0015 per submission (translate) + ~$0.001 (classify) + ~$0.00002 (embed) = ~$0.003 per submission
- At 100 submissions/month: ~$0.30/month. At 1000/month: ~$3.00/month. Negligible.

---

## MVP Recommendation

### Phase 1: Foundation (Week 1-2)

Build the submission pipeline and basic internal view:

1. **Feedback submission form** in Settings -- type, description, screenshot upload, vertical selector
2. **AI processing on submit** -- translate, classify, generate embedding, store all
3. **Basic internal list view** -- not full kanban yet, just a filterable table of all submissions
4. **"Received" email notification** to merchant
5. **Database tables** -- `feedback_submissions`, `feedback_internal_tasks`, `feedback_task_links`

### Phase 2: Intelligence (Week 2-3)

Add the smart parts:

6. **Duplicate detection** -- on each new submission, find similar existing tasks (cosine similarity > 0.85)
7. **Aggregation** -- link similar submissions to existing tasks, increment vote count
8. **Kanban board** -- full drag-and-drop board for internal team
9. **Status notifications** -- "In Progress", "Completed", "Rejected" notifications to merchants
10. **Assignment** -- assign tasks to team members

### Phase 3: Insights (Week 3-4)

Add analytics and polish:

11. **Analytics dashboard** -- volume over time, breakdown by type/vertical, response times
12. **Merchant feedback history** -- full history view with status tracking in Settings
13. **In-app notification center** -- bell icon, unread count, notification list
14. **Priority auto-inference** -- combine frequency + sentiment + merchant tier

### Defer to Post-MVP

- Public roadmap / changelog (needs product maturity first)
- GitHub integration (team workflow not yet standardized)
- Semantic clustering batch job (v1 cosine similarity is sufficient)
- Smart response templates (team should write manually first to understand patterns)
- Sentiment-based merchant health scores (need submission volume first)

---

## Sources

- [Qualaroo: Customer Feedback Strategies for SaaS 2026](https://qualaroo.com/blog/customer-feedback-saas/)
- [Zonka: Customer Feedback Tools for SaaS 2026](https://www.zonkafeedback.com/blog/saas-customer-feedback-tools)
- [Featurebase: Top SaaS Feedback Tools 2026](https://www.featurebase.app/blog/saas-feedback-tools)
- [Frill: Top 20 Customer Feedback Software 2026](https://frill.co/blog/posts/customer-feedback-software)
- [Canny: Feature Request Management](https://canny.io/use-cases/feature-request-management)
- [Featurebase: Canny vs Productboard 2026](https://www.featurebase.app/blog/canny-vs-productboard)
- [Canny: How SaaS Can Use AI](https://canny.io/blog/how-saas-can-use-ai/)
- [Zonka: AI Survey Tools 2026](https://www.zonkafeedback.com/blog/ai-survey-tools)
- [Zonka: AI Insight Tools for Feedback Intelligence](https://www.zonkafeedback.com/blog/ai-insight-tools)
- [Kanban Tool: Feedback Management with Kanban](https://kanbantool.com/blog/feedback-management-with-kanban)
- [Usersnap: Feedback Management Tool](https://usersnap.com/l/feedback-management-tool)
- [Usersnap: Feedback Widget](https://usersnap.com/blog/feedback-widget/)
- [Usersnap: Visual Feedback with Screenshot](https://help.usersnap.com/docs/feedback-with-a-screenshot)
- [Userback: SaaS Feedback Portal](https://userback.io/blog/idea-portal-for-saas/)
- [Userpilot: Notification Types for SaaS](https://userpilot.com/blog/notification-types/)
- [ProductLed: Customer Feedback Loop for SaaS](https://productled.com/blog/saas-customer-feedback-loop)
- [Dialzara: AI Tools for Multilingual Feedback](https://dialzara.com/blog/top-7-ai-tools-for-multilingual-feedback)
- [FeedbackPlus: Open Source Screenshot Library](https://github.com/ColonelParrot/feedbackplus)
- GUDBRO internal: `docs/core/AI-SYSTEM.md` (existing AI infrastructure)
- GUDBRO internal: `docs/roadmaps/MULTI-VERTICAL-STRATEGY.md` (platform context)
