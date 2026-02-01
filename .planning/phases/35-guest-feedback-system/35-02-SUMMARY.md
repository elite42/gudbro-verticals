---
phase: 35-guest-feedback-system
plan: 02
subsystem: api, ui, ai
tags:
  [
    cron,
    feedback,
    accommodations,
    ai-pipeline,
    openai,
    star-ratings,
    jose-jwt,
    resend-email,
    phosphor-icons,
  ]

requires:
  - phase: 35-01
    provides: accom_guest_feedback table, feedback API routes, backoffice feedback page

provides:
  - Post-checkout cron job sending feedback emails (2-24h window)
  - Feedback token auth (72h JWT) for standalone email link access
  - Post-stay star rating form (5 categories + overall + comment)
  - AI feedback processing pipeline with accommodations-specific taxonomy (35+ tags)
  - Backoffice aggregate ratings dashboard and AI insights section

affects: [36-tourist-concierge, 38-returning-guest-detection]

tech-stack:
  added: []
  patterns:
    [cron-email-dedup, feedback-token-jwt, ai-tag-extraction, aggregate-ratings]

key-files:
  created:
    - apps/accommodations/frontend/app/api/cron/post-checkout-feedback/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/feedback/post-stay/route.ts
    - apps/accommodations/frontend/app/api/feedback/verify/route.ts
    - apps/accommodations/frontend/app/feedback/[bookingId]/page.tsx
    - apps/accommodations/frontend/components/stay/PostStayRating.tsx
    - apps/backoffice/lib/ai/accom-feedback-service.ts
    - apps/backoffice/app/api/accommodations/feedback/process-ai/route.ts
  modified:
    - apps/accommodations/frontend/lib/auth.ts
    - apps/accommodations/frontend/vercel.json
    - apps/backoffice/app/(dashboard)/accommodations/feedback/page.tsx
    - apps/backoffice/app/api/accommodations/feedback/route.ts

decisions:
  - id: FB-06
    title: Feedback token reuses GUEST_JWT_SECRET
    context: Simpler than separate secret, claims include type='feedback' for differentiation

metrics:
  duration: ~7 min
  completed: 2026-02-02
---

# Phase 35 Plan 02: Post-Stay Feedback System Summary

**One-liner:** Post-checkout cron emails guests 2-24h after checkout with feedback link; standalone star rating page (5 categories + overall); AI pipeline with 35+ accommodations tags; backoffice aggregate dashboard with tag cloud.

## Tasks Completed

| #   | Task                                                        | Commit  | Key Files                                                                      |
| --- | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| 1   | Post-checkout cron + post-stay rating form + submission API | ef78ca9 | cron route, post-stay API, feedback page, PostStayRating, vercel.json, auth.ts |
| 2   | AI feedback pipeline fork + backoffice aggregate dashboard  | a941dd0 | accom-feedback-service.ts, process-ai route, feedback page, feedback API       |

## What Was Built

### Post-Checkout Cron Job

- Runs every 2 hours via Vercel cron
- Queries bookings with `status='checked_out'` and `checked_out_at` in 2-24h window
- Deduplicates via `accom_email_logs` (email_type='post_stay_feedback') AND existing feedback check
- Generates 72h feedback token (JWT with bookingId, propertyId, type='feedback')
- Sends branded email via Resend with "Rate Your Stay" CTA button

### Feedback Token Auth

- `generateFeedbackToken()` and `verifyFeedbackToken()` added to lib/auth.ts
- Reuses GUEST_JWT_SECRET with `type: 'feedback'` claim for differentiation
- 72h expiry gives guests ample time to complete review

### Standalone Rating Page (/feedback/[bookingId])

- Token verification via /api/feedback/verify endpoint
- Shows property name and stay dates
- PostStayRating component: 5 category star rows + overall + optional comment
- States: loading, ready, submitted (checkmark), already_submitted, expired, error
- Submits to POST /api/stay/[code]/feedback/post-stay

### PostStayRating Component

- 5 categories: Cleanliness (Broom), Location (MapPin), Value (CurrencyCircleDollar), Communication (ChatCircle), WiFi (WifiHigh)
- Overall rating prominent at top with label feedback (Excellent/Great/Good/Fair/Poor)
- Star interaction: tap to set, filled amber stars for selected
- Submit disabled until all 5 categories rated + overall
- 155 lines, clean Phosphor icons

### Post-Stay Submission API

- Accepts guest JWT OR feedback token (dual auth)
- Validates all 6 ratings are 1-5 integers
- Handles UNIQUE constraint violation (409 "already submitted")
- Inserts with feedback_type='post_stay' and all rating columns

### AI Feedback Pipeline (accom-feedback-service.ts)

- Forked from feedback-intelligence-service.ts (F&B pipeline NOT modified)
- ACCOM_FEEDBACK_TAGS: 35 accommodations-specific tags across 8 categories
- processAccomFeedback(): queries WHERE ai_processed_at IS NULL, LIMIT 10
- GPT-4o-mini extracts tags (validated against taxonomy), sentiment, priority
- Shared OpenAI helpers from ./openai.ts (no duplication)

### Backoffice Dashboard Enhancements

- Aggregate Ratings Overview: overall score + per-category averages + review count + response rate
- AI Insights section: tag cloud with sentiment color coding (green/amber/red) + frequency counts
- "Process AI" button with unprocessed count, loading state, result feedback
- Feedback list items: inline AI tags (max 3 + overflow count), sentiment dot, post-stay badge, overall star rating
- Expanded view: full star ratings grid for post-stay feedback
- API route updated to return rating*\* and ai*\* columns

## Deviations from Plan

### Auto-added Missing Critical Functionality

**1. [Rule 2 - Missing Critical] Added /api/feedback/verify endpoint**

- **Found during:** Task 1
- **Issue:** Standalone feedback page needed a way to verify token and get booking info before showing the form
- **Fix:** Created GET /api/feedback/verify?bookingId=X&token=X that validates token, checks for existing feedback, and returns booking details
- **Files created:** apps/accommodations/frontend/app/api/feedback/verify/route.ts
- **Commit:** ef78ca9

**2. [Rule 2 - Missing Critical] Updated backoffice feedback API to return new fields**

- **Found during:** Task 2
- **Issue:** Backoffice feedback page expected rating and AI fields but API wasn't returning them
- **Fix:** Added ratingCleanliness/Location/Value/Communication/Wifi/Overall and aiTags/aiSentiment/aiPriority to API response mapping
- **Files modified:** apps/backoffice/app/api/accommodations/feedback/route.ts
- **Commit:** a941dd0

## Next Phase Readiness

Phase 35 (Guest Feedback System) is now complete:

- Plan 01: In-stay feedback (form, API, backoffice queue)
- Plan 02: Post-stay feedback (cron, ratings, AI, aggregate dashboard)

Ready for Phase 36 (Tourist Concierge) or next priority.

**Pending from Phase 35:**

- Migration 097 needs to be applied to live database
- Storage bucket `feedback-screenshots` needs to be created
- Vercel cron will activate on next deploy (post-checkout-feedback every 2h)
