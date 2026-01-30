---
phase: 14-merchant-submission-ui
verified: 2026-01-30T11:10:44Z
status: passed
score: 5/5 must-haves verified
re_verification: false
---

# Phase 14: Merchant Submission UI Verification Report

**Phase Goal:** Merchants can submit feedback from the backoffice in any language with screenshots and see their submission history

**Verified:** 2026-01-30T11:10:44Z
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                                        | Status     | Evidence                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------------------------------------------------- |
| 1   | Merchant can open a feedback form, select type (bug/feature/feedback), enter title and description           | ✓ VERIFIED | FeedbackSubmissionManager.tsx L320-376 (type selector, title, description fields exist and are wired)    |
| 2   | Merchant can attach a screenshot that uploads and persists with the submission                               | ✓ VERIFIED | FeedbackSubmissionManager.tsx L235-253 (screenshot upload to /api/upload/image, URL saved in submission) |
| 3   | Submission automatically captures current vertical, module/page path, and merchant ID without merchant input | ✓ VERIFIED | FeedbackSubmissionManager.tsx L128,267-268 (usePathname + auto-captured merchantId, vertical)            |
| 4   | Merchant can write in Italian, Thai, or any language and submission is accepted (no language picker)         | ✓ VERIFIED | No language picker in form, all text inputs accept any UTF-8 (L353-375)                                  |
| 5   | Merchant can view a list of their past submissions showing title, type, status, and submission date          | ✓ VERIFIED | FeedbackSubmissionManager.tsx L438-557 (history section with accordion, badges, date formatting)         |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact                                                            | Expected                                       | Status     | Details                                                                                             |
| ------------------------------------------------------------------- | ---------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `apps/backoffice/app/(dashboard)/settings/feedback/page.tsx`        | Settings page shell with TenantContext         | ✓ VERIFIED | 48 lines, imports TenantContext, renders FeedbackSubmissionManager, proper loading/empty states     |
| `apps/backoffice/components/settings/FeedbackSubmissionManager.tsx` | Form with type selector, title, description... | ✓ VERIFIED | 562 lines, complete form + history list, Phosphor icons, proper state management                    |
| `apps/backoffice/app/api/feedback/submit/route.ts`                  | POST endpoint inserting into fb_submissions    | ✓ VERIFIED | 107 lines, exports POST, validates fields, inserts to fb_submissions, triggers AI processing        |
| `apps/backoffice/app/api/feedback/history/route.ts`                 | GET endpoint returning merchant submissions    | ✓ VERIFIED | 36 lines, exports GET, queries fb_submissions with merchantId filter, sorted by created_at desc     |
| `apps/backoffice/app/api/upload/image/route.ts`                     | feedback-screenshots folder config added       | ✓ VERIFIED | Contains 'feedback-screenshots' key with 5MB max, PNG/JPG/WebP allowed types, subfolder: 'feedback' |

**All artifacts verified at 3 levels:**

- **Level 1 (Existence):** All files exist at expected paths
- **Level 2 (Substantive):** Line counts exceed minimums (48, 562, 107, 36), no stub patterns (TODO/FIXME/placeholder), proper exports
- **Level 3 (Wired):** FeedbackSubmissionManager imported and used in page.tsx (L4, L45), API routes callable via fetch

### Key Link Verification

| From                          | To                    | Via                                              | Status  | Details                                                                                       |
| ----------------------------- | --------------------- | ------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------- |
| FeedbackSubmissionManager.tsx | /api/feedback/submit  | fetch POST on form submit                        | ✓ WIRED | L259-271: fetch with JSON body, handles response, error handling                              |
| FeedbackSubmissionManager.tsx | /api/upload/image     | FormData upload with folder feedback-screenshots | ✓ WIRED | L241-252: FormData with file, folder, entityId, gets URL back                                 |
| FeedbackSubmissionManager.tsx | /api/feedback/history | fetch GET on mount and after submit              | ✓ WIRED | L151: useCallback fetch, L165: useEffect on mount, L284: called after submit success          |
| submit/route.ts               | fb_submissions        | supabase insert                                  | ✓ WIRED | L63-77: supabase.from('fb_submissions').insert() with all required fields                     |
| submit/route.ts               | /api/feedback/process | fire-and-forget async call after insert          | ✓ WIRED | L86-96: fetch to /api/feedback/process with submissionId, wrapped in try/catch (non-blocking) |
| history/route.ts              | fb_submissions        | supabase select query                            | ✓ WIRED | L20-24: supabase.from('fb_submissions').select().eq('merchant_id').order('created_at', desc)  |

**All key links verified with response handling and error states.**

### Requirements Coverage

| Requirement | Description                                                | Status      | Evidence                                      |
| ----------- | ---------------------------------------------------------- | ----------- | --------------------------------------------- |
| FBSUB-01    | Merchant can submit feedback with type, title, description | ✓ SATISFIED | Form implements all fields with validation    |
| FBSUB-02    | Merchant can attach screenshot                             | ✓ SATISFIED | Screenshot upload with preview and validation |
| FBSUB-03    | Submission auto-captures context                           | ✓ SATISFIED | merchantId, vertical, page_path auto-captured |
| FBSUB-04    | Any language accepted                                      | ✓ SATISFIED | No language picker, UTF-8 text inputs         |
| FBSUB-05    | Merchant can view submission history                       | ✓ SATISFIED | History list with accordion, badges, date     |

### Anti-Patterns Found

**No blockers, warnings, or anti-patterns detected.**

Scanned files:

- `apps/backoffice/app/(dashboard)/settings/feedback/page.tsx` — No TODO/FIXME/stub patterns
- `apps/backoffice/components/settings/FeedbackSubmissionManager.tsx` — Only legitimate placeholder text for input fields
- `apps/backoffice/app/api/feedback/submit/route.ts` — Full validation and error handling
- `apps/backoffice/app/api/feedback/history/route.ts` — Proper query with error handling

TypeScript compilation: ✓ Clean (backoffice app)

### Implementation Quality Highlights

**Exceptional implementation exceeding plan requirements:**

1. **Type Selector UX:** Three-card button layout with Phosphor icons (duotone weight), color-coded selection states (red/blue/green), visual weight change on selection (duotone → fill). Better UX than standard dropdown.

2. **Screenshot Handling:** Proper object URL lifecycle management with cleanup (useEffect unmount, remove button), client-side validation with user-friendly error messages, thumbnail preview with remove button.

3. **Form State Management:** Character counter on title (L361), disabled submit with multi-condition validation (L293), success banner auto-dismisses after 4s (L281), error banner for all failure cases.

4. **History List:** Accordion expand/collapse with CaretDown/CaretUp icons, Italian labels for badges (Bug/Richiesta/Feedback, In attesa/Elaborato/etc), formatted dates with it-IT locale, empty state and loading states.

5. **API Integration:** Fire-and-forget AI processing trigger (non-blocking), proper error boundaries (try/catch), validation on both client and server, automatic history refresh after submission.

6. **Accessibility:** Keyboard-accessible type selector (buttons), required field indicators (\*), descriptive labels, proper semantic HTML.

**Code Quality:**

- TypeScript strict types throughout (FeedbackType, Submission interface)
- useCallback for fetchHistory (memoization)
- Proper cleanup (URL.revokeObjectURL)
- Consistent Tailwind styling matching existing settings pages
- Error handling at all levels (file upload, API calls, DB operations)

### Human Verification Required

**None required.** All success criteria are structurally verifiable and have been confirmed.

**Optional manual testing checklist (for QA, not blocking):**

1. **Submit flow test:**
   - Navigate to /settings/feedback (after merchant selection)
   - Select each type (bug/feature/feedback), verify visual states
   - Enter title and description in Italian, Thai, Emoji, Mixed scripts
   - Attach a screenshot (PNG, JPG, WebP), verify preview
   - Submit, verify success banner, form reset
   - Verify new submission appears at top of history list

2. **Screenshot validation test:**
   - Try to upload a 6MB file, verify error message
   - Try to upload a PDF, verify error message
   - Upload valid screenshot, verify Supabase storage URL

3. **History accordion test:**
   - Click a submission row, verify detail expands
   - Verify original_body displays full text (multiline)
   - Verify screenshot thumbnail and link work
   - Click another row, verify previous collapses

4. **Error handling test:**
   - Simulate network failure during submit
   - Simulate screenshot upload failure
   - Verify error banners display with user-friendly messages

---

## Verification Summary

**Phase 14 goal ACHIEVED.**

All 5 observable truths verified. All 5 artifacts exist, are substantive (no stubs), and are wired correctly. All 6 key links verified with proper request/response handling. All 5 requirements (FBSUB-01 through FBSUB-05) satisfied.

**Implementation quality: Excellent.** Exceeds plan requirements with superior UX (three-card type selector, auto-dismiss success banner, character counter), proper resource management (object URL cleanup), robust error handling, and Italian localization.

**TypeScript:** Clean compilation, no errors.
**Anti-patterns:** None detected.
**Commits:** 4 commits match summaries (98e6be2, ccb3167, fe6a42f, 1c76302).

**Ready for Phase 15 (Merchant Notifications).**

---

_Verified: 2026-01-30T11:10:44Z_
_Verifier: Claude (gsd-verifier)_
