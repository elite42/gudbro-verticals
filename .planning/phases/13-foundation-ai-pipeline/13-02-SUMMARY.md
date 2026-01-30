---
phase: 13
plan: 02
subsystem: ai-service
tags:
  [openai, gpt-4o-mini, feedback, classification, translation, deduplication]
requires: [phase-13-01]
provides: [processSubmission, feedback-process-api]
affects: [phase-14, phase-15, phase-16, phase-17]
tech-stack:
  added: []
  patterns:
    [
      single-call-ai-pipeline,
      defensive-json-parsing,
      canonical-tag-validation,
      batch-api-processing,
    ]
key-files:
  created:
    - apps/backoffice/lib/ai/feedback-intelligence-service.ts
    - apps/backoffice/app/api/feedback/process/route.ts
  modified: []
decisions: []
metrics:
  duration: ~2 minutes
  completed: 2026-01-30
---

# Phase 13 Plan 02: AI Processing Service Summary

**One-liner:** OpenAI gpt-4o-mini pipeline that translates, classifies (type/priority/sentiment), tags from 38-tag taxonomy, deduplicates via RPC similarity, and creates/links tasks with retry logic

## What Was Built

### feedback-intelligence-service.ts

The core AI processing engine with a single public function `processSubmission(submissionId)`:

1. **Fetch & Guard** - Loads submission from `fb_submissions`, skips if not `pending`
2. **Status Tracking** - Sets `processing` status, increments `processing_attempts`
3. **AI Call** - Single OpenAI `gpt-4o-mini` call with `response_format: json_object` for:
   - Language detection (ISO 639-1)
   - English translation (title + body)
   - Type classification (bug/feature_request/improvement/complaint/praise/operational)
   - Priority scoring (1-5)
   - Sentiment analysis (positive/neutral/negative)
   - Tag extraction (up to 5 from 38-tag canonical taxonomy)
4. **Deduplication** - Calls `find_similar_tasks` RPC; links to existing task if score >= 0.5
5. **Task Creation** - Creates new `fb_task` with denormalized metrics if no match found
6. **Error Handling** - Failed attempts go back to `pending` if under 3 attempts, `failed` otherwise

Key patterns:

- Defensive JSON parsing (strips markdown code blocks)
- Field validation (clamps priority 1-5, validates tags against canonical list, defaults for missing fields)
- Cost tracking via `calculateCost()` logged per call
- Uses `supabaseAdmin` (service role) to bypass RLS

### /api/feedback/process route

POST endpoint with two modes:

- **Single**: `{ submissionId: "uuid" }` - processes one submission
- **Batch**: `{ batch: true }` - fetches up to 10 pending submissions and processes sequentially

Auth follows existing notification processor pattern (CRON_SECRET or service role bearer token).

## Commits

| Task | Name                                       | Commit  | Files                             |
| ---- | ------------------------------------------ | ------- | --------------------------------- |
| 1    | Create feedback intelligence AI service    | eef98e7 | feedback-intelligence-service.ts  |
| 2    | Create API route for submission processing | 25a6ec1 | app/api/feedback/process/route.ts |

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

None - followed established patterns from existing AI services.

## Next Phase Readiness

Phase 13 is now complete. Phase 14 (Merchant Submission UI) can proceed. The submission form will insert into `fb_submissions` with status `pending`, and either a cron job or manual trigger will call `/api/feedback/process` to run the AI pipeline.
