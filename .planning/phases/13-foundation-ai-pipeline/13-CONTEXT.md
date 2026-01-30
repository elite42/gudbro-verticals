# Phase 13: Foundation and AI Pipeline - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Database schema (fb_submissions, fb_tasks, fb_merchant_notifications) and AI processing service for translating, classifying, tagging, and grouping merchant feedback. Pure backend — no UI in this phase. Phases 14-17 build UIs on top of this foundation.

</domain>

<decisions>
## Implementation Decisions

### AI Service Provider

- Use OpenAI API (already in use for AI Co-Manager in this project)
- All submissions translated to English regardless of source language
- Store both original text + English translation
- Detect and store original language code

### Claude's Discretion

- **Classification taxonomy**: type categories (bug/feature/feedback), priority levels, sentiment scale — Claude determines optimal set
- **Similarity detection**: algorithm choice (trigram similarity, embedding-based, or hybrid), match threshold, auto-link vs suggest behavior
- **Task aggregation**: when to create new task vs link to existing, denormalized count update strategy
- **Schema design**: table structure, indexes, RLS policies, constraint choices — following existing project patterns
- **Task lifecycle**: status values (New → Reviewing → In Progress → Done → Rejected), transition rules
- **Error handling**: what happens when AI API fails, retry strategy, fallback behavior
- **Topic tagging**: how tags are extracted, stored (array on record), and used for matching
- **Confidence thresholds**: when AI classification confidence is too low, how to handle uncertain results

</decisions>

<specifics>
## Specific Ideas

- OpenAI API is already integrated in the project for the AI Co-Manager — reuse existing patterns and API key configuration
- Translation target is always English (canonical language for AI processing and admin review)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 13-foundation-ai-pipeline_
_Context gathered: 2026-01-30_
