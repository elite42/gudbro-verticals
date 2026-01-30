# Phase 13: Foundation and AI Pipeline - Research

**Researched:** 2026-01-30
**Domain:** PostgreSQL schema design + OpenAI AI processing pipeline
**Confidence:** HIGH

## Summary

This phase builds the database backbone and AI processing service for merchant feedback intelligence. The codebase already has extensive patterns for both domains: 81 SQL migrations with consistent conventions (UUID PKs, TEXT + CHECK constraints, RLS policies via `account_roles`, `SECURITY DEFINER` functions), and 20+ AI service files all using the same `getOpenAIClient()` / `gpt-4o-mini` pattern with JSON response parsing.

The key technical challenge is **similarity detection** between feedback submissions. The project already uses `pg_trgm` (enabled in `shared/core/food-database/schema.sql`), so the extension is available. The recommended approach is a dual strategy: tag-based overlap for structured matching plus `pg_trgm` trigram similarity on translated English text for fuzzy matching. This avoids the cost and complexity of embedding-based approaches while leveraging PostgreSQL-native capabilities.

The existing `ai_feedback` table (migration 029) and `customer_feedback` table (migration 024) are different systems -- `ai_feedback` is internal GudBro team feedback about the AI product, while `customer_feedback` is customer-to-merchant reviews. The new `fb_submissions` system is a third concept: **merchant-submitted feedback about their business** (operational issues, feature requests, improvement ideas) that gets AI-processed and aggregated into actionable tasks.

**Primary recommendation:** Follow existing migration and AI service patterns exactly. Use `gpt-4o-mini` for all AI processing (translate, classify, tag in a single API call to minimize cost). Use `pg_trgm` + tag overlap for similarity. Store processing results inline on the submission row (not in separate tables).

## Standard Stack

### Core

| Library               | Version              | Purpose                 | Why Standard                                            |
| --------------------- | -------------------- | ----------------------- | ------------------------------------------------------- |
| `openai`              | (already installed)  | OpenAI API client       | Already used in 20+ AI services via `getOpenAIClient()` |
| Supabase (PostgreSQL) | (already configured) | Database + RLS          | Project database, admin client via `supabaseAdmin`      |
| `pg_trgm`             | Built-in extension   | Trigram text similarity | Already enabled in the project, PostgreSQL-native       |

### Supporting

| Library       | Version | Purpose           | When to Use                                                                     |
| ------------- | ------- | ----------------- | ------------------------------------------------------------------------------- |
| `gpt-4o-mini` | Current | All AI processing | Translation, classification, tagging -- cost-effective at $0.15/1M input tokens |

### Alternatives Considered

| Instead of                              | Could Use                             | Tradeoff                                                                                                                                                        |
| --------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pg_trgm` similarity                    | OpenAI embeddings + vector similarity | Embeddings give better semantic matching but require pgvector extension, embedding storage, and per-submission API cost. Overkill for v1 with <1000 submissions |
| Single AI call (translate+classify+tag) | Separate API calls per step           | Separate calls give more control but 3x API cost and 3x latency. Single structured JSON response is sufficient                                                  |
| `gpt-4o`                                | `gpt-4o-mini`                         | 4o is smarter but 17x more expensive. Mini is already excellent for classification/translation tasks per existing project usage                                 |

**Installation:** No new packages needed. All dependencies already exist.

## Architecture Patterns

### Recommended Project Structure

```
apps/backoffice/lib/
├── ai/
│   ├── openai.ts                          # EXISTING - reuse getOpenAIClient()
│   ├── feedback-intelligence-service.ts   # NEW - process submissions
│   └── ...existing services...
shared/database/migrations/schema/
├── 082-feedback-intelligence.sql          # NEW - schema + RLS + functions
```

### Pattern 1: AI Service Pattern (from existing codebase)

**What:** All AI services follow the same structure: import `getOpenAIClient`, call `chat.completions.create` with system+user prompts, parse JSON response, handle errors gracefully.
**When to use:** Every AI processing step.
**Example (from `feedback-loop-service.ts`):**

````typescript
import { getOpenAIClient, DEFAULT_MODEL, calculateCost } from './openai';
import { supabaseAdmin } from '../supabase-admin';

// Pattern: system prompt defines role, user prompt provides data, response is JSON
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'You are a feedback analyst. Respond with valid JSON only.',
    },
    { role: 'user', content: analysisPrompt },
  ],
  temperature: 0.3, // Low temp for consistent classification
  max_tokens: 500,
  response_format: { type: 'json_object' },
});

// Pattern: parse with fallback
const responseText = completion.choices[0]?.message?.content || '{}';
try {
  const cleanJson = responseText
    .replace(/```json?\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
  const parsed = JSON.parse(cleanJson);
} catch {
  // Keep defaults if parsing fails
}
````

### Pattern 2: Migration Pattern (from 029-ai-feedback-loop.sql)

**What:** Migrations follow a consistent structure: table creation with UUID PKs, TEXT + CHECK constraints (never ENUM), indexes, RLS enable, RLS policies using `account_roles` lookup, helper functions with `SECURITY DEFINER` and `SET search_path = public`, comments.
**When to use:** Schema creation.
**Example structure:**

```sql
-- Table with UUID PK, TEXT + CHECK constraints
CREATE TABLE fb_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  -- ... fields ...
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'processing', 'processed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX idx_fb_submissions_merchant ON fb_submissions(merchant_id, created_at DESC);

-- RLS
ALTER TABLE fb_submissions ENABLE ROW LEVEL SECURITY;

-- Merchant access via account_roles
CREATE POLICY "Merchants can view own submissions"
  ON fb_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = fb_submissions.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

-- Service role bypass
CREATE POLICY "Service role full access"
  ON fb_submissions FOR ALL
  USING (auth.role() = 'service_role');
```

### Pattern 3: Single-Call AI Pipeline

**What:** Combine translate + classify + tag into one OpenAI call that returns a structured JSON object. This minimizes API calls and latency.
**When to use:** Processing a new submission.
**Example:**

```typescript
const PROCESS_SYSTEM_PROMPT = `You are a feedback intelligence analyst for a hospitality platform.
Given merchant feedback in any language, you must:
1. Translate to English (if not already English)
2. Classify by type, priority, and sentiment
3. Extract topic tags

Respond with JSON only.`;

const processPrompt = `Analyze this merchant feedback:

Original text: "${submission.original_text}"

Return JSON:
{
  "detected_language": "ISO 639-1 code",
  "translated_title": "English title",
  "translated_body": "English body text",
  "type": "bug|feature_request|improvement|complaint|praise|operational",
  "priority": 1-5 (1=critical, 5=nice-to-have),
  "sentiment": "positive|neutral|negative",
  "confidence": 0.0-1.0,
  "tags": ["tag1", "tag2", "tag3"]
}`;
```

### Anti-Patterns to Avoid

- **Separate tables for AI results:** Don't store translations, classifications, and tags in separate tables. Store them as columns on `fb_submissions` directly. The existing `ai_feedback` table (migration 029) stores `ai_summary`, `ai_sentiment`, `ai_priority` inline -- follow this pattern.
- **Using ENUM types:** The project uses `TEXT + CHECK` constraints, never PostgreSQL ENUM. This is an explicit architectural decision (see CLAUDE.md section 11).
- **Embedding-based similarity for v1:** The vector approach requires pgvector, storage overhead, and per-item embedding costs. Tag overlap + trigram is simpler and sufficient for the expected data volume.
- **Processing submissions synchronously in the API request:** The AI call takes 1-3 seconds. Accept the submission immediately with `status: 'pending'`, then process asynchronously (or in a follow-up API call).

## Don't Hand-Roll

| Problem              | Don't Build                                | Use Instead                                                    | Why                                                           |
| -------------------- | ------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------- |
| Text similarity      | Custom Levenshtein / n-gram implementation | `pg_trgm` `similarity()` function + `%` operator               | PostgreSQL-native, indexable with GIN/GiST, battle-tested     |
| Language detection   | Custom heuristics                          | OpenAI in the same processing call                             | GPT-4o-mini detects language perfectly as part of translation |
| JSON parsing from AI | Simple `JSON.parse`                        | Defensive parsing with markdown stripping (existing pattern)   | OpenAI sometimes wraps JSON in markdown code blocks           |
| UUID generation      | `uuid` package                             | `gen_random_uuid()` in PostgreSQL, `crypto.randomUUID()` in JS | Both are already used throughout the project                  |
| Cost tracking        | Manual calculation                         | `calculateCost()` from `openai.ts`                             | Already exists with per-model pricing                         |

**Key insight:** The codebase already has solutions for every supporting concern (OpenAI client, cost calculation, JSON parsing, Supabase admin access, RLS patterns). The new service should compose existing utilities, not create new ones.

## Common Pitfalls

### Pitfall 1: pg_trgm Extension Not Enabled on Supabase

**What goes wrong:** `similarity()` function calls fail with "function similarity does not exist"
**Why it happens:** `pg_trgm` is enabled in `shared/core/food-database/schema.sql` but may not be enabled on the Supabase production instance.
**How to avoid:** Include `CREATE EXTENSION IF NOT EXISTS "pg_trgm";` at the top of the migration file. The `IF NOT EXISTS` is safe.
**Warning signs:** Any SQL error mentioning `similarity` function not found.

### Pitfall 2: RLS Policy Blocking Service Role Operations

**What goes wrong:** AI processing service can't read/write submissions because RLS blocks it.
**Why it happens:** Using the regular `supabase` client instead of `supabaseAdmin` (which uses service role key).
**How to avoid:** Always use `supabaseAdmin` from `lib/supabase-admin.ts` for AI service operations. This is the existing pattern in `translation-service.ts`.
**Warning signs:** Empty results or permission errors from database queries in the AI service.

### Pitfall 3: Single-Point AI Failure Blocking All Processing

**What goes wrong:** If OpenAI API is down or rate-limited, no submissions get processed and errors accumulate.
**Why it happens:** No retry logic or graceful degradation.
**How to avoid:**

1. Set submission status to `'failed'` with error details on failure
2. Add a `processing_attempts` counter (max 3 retries)
3. Store partial results if available (e.g., translation succeeded but classification failed)
   **Warning signs:** Many submissions stuck in `'processing'` status.

### Pitfall 4: Tag Explosion Making Similarity Useless

**What goes wrong:** AI generates too many unique tags, making tag overlap similarity meaningless.
**Why it happens:** No constraints on tag vocabulary -- AI invents new tags each time.
**How to avoid:** Provide a fixed taxonomy of ~30-50 tags in the AI prompt. Let AI pick from the list + optionally suggest 1-2 new ones. Store the canonical tag list in the codebase (not DB).
**Warning signs:** More than 100 unique tags after 50 submissions.

### Pitfall 5: Similarity Threshold Too Low/High

**What goes wrong:** Either everything matches (false positives) or nothing matches (false negatives).
**Why it happens:** Default `pg_trgm` threshold of 0.3 may be too loose for short feedback text.
**How to avoid:** Use a combined score: `(0.6 * tag_overlap_score) + (0.4 * trigram_similarity_score)`. Require combined score >= 0.5 to consider items similar. Expose threshold as a constant for tuning.
**Warning signs:** Tasks with 50+ linked submissions (too loose) or zero linked submissions (too strict).

## Code Examples

### Example 1: Migration Structure for fb_submissions

```sql
-- Enable pg_trgm for text similarity
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE fb_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Original content
  original_title TEXT,
  original_body TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'chat', 'email', 'api')),

  -- AI-processed fields (populated after processing)
  detected_language TEXT,              -- ISO 639-1 code
  translated_title TEXT,               -- English
  translated_body TEXT,                -- English

  -- Classification
  type TEXT CHECK (type IN ('bug', 'feature_request', 'improvement', 'complaint', 'praise', 'operational')),
  priority INTEGER CHECK (priority BETWEEN 1 AND 5),
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  ai_confidence DECIMAL(3,2),          -- 0.00 to 1.00

  -- Tags (for similarity matching)
  tags TEXT[] DEFAULT '{}',

  -- Task linkage
  task_id UUID,                        -- FK added after fb_tasks table created

  -- Processing state
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed')),
  processing_attempts INTEGER NOT NULL DEFAULT 0,
  processing_error TEXT,
  processed_at TIMESTAMPTZ,

  -- Metadata
  submitted_by_account_id UUID REFERENCES accounts(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_fb_submissions_merchant ON fb_submissions(merchant_id, created_at DESC);
CREATE INDEX idx_fb_submissions_status ON fb_submissions(status) WHERE status IN ('pending', 'processing');
CREATE INDEX idx_fb_submissions_task ON fb_submissions(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX idx_fb_submissions_tags ON fb_submissions USING GIN (tags);
CREATE INDEX idx_fb_submissions_trgm ON fb_submissions USING GIN (translated_body gin_trgm_ops);
```

### Example 2: Task Table with Denormalized Metrics

```sql
CREATE TABLE fb_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Task content (from first/best submission)
  title TEXT NOT NULL,
  description TEXT,

  -- Classification (inherited from submissions, may be overridden)
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature_request', 'improvement', 'complaint', 'praise', 'operational')),
  priority INTEGER NOT NULL CHECK (priority BETWEEN 1 AND 5),
  tags TEXT[] DEFAULT '{}',

  -- Lifecycle
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'in_progress', 'done', 'rejected')),

  -- Denormalized aggregation metrics
  submission_count INTEGER NOT NULL DEFAULT 1,
  first_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  avg_sentiment DECIMAL(3,2),          -- average sentiment score across submissions

  -- Resolution
  resolved_at TIMESTAMPTZ,
  resolution_note TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add FK from submissions to tasks
ALTER TABLE fb_submissions ADD CONSTRAINT fk_fb_submissions_task
  FOREIGN KEY (task_id) REFERENCES fb_tasks(id) ON DELETE SET NULL;
```

### Example 3: Similarity Detection Function

```sql
-- Find similar tasks for a new submission
CREATE OR REPLACE FUNCTION find_similar_tasks(
  p_merchant_id UUID,
  p_translated_body TEXT,
  p_tags TEXT[],
  p_threshold DECIMAL DEFAULT 0.5
)
RETURNS TABLE (
  task_id UUID,
  similarity_score DECIMAL,
  tag_overlap INTEGER,
  trigram_score REAL
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id AS task_id,
    (
      -- Combined score: 60% tag overlap, 40% trigram
      0.6 * COALESCE(
        (SELECT COUNT(*)::DECIMAL / GREATEST(array_length(p_tags, 1), 1)
         FROM unnest(p_tags) tag WHERE tag = ANY(t.tags)),
        0
      ) +
      0.4 * COALESCE(similarity(t.title || ' ' || COALESCE(t.description, ''), p_translated_body), 0)
    )::DECIMAL AS similarity_score,
    (SELECT COUNT(*)::INTEGER FROM unnest(p_tags) tag WHERE tag = ANY(t.tags)) AS tag_overlap,
    similarity(t.title || ' ' || COALESCE(t.description, ''), p_translated_body) AS trigram_score
  FROM fb_tasks t
  WHERE t.merchant_id = p_merchant_id
    AND t.status NOT IN ('done', 'rejected')
  HAVING (
    0.6 * COALESCE(
      (SELECT COUNT(*)::DECIMAL / GREATEST(array_length(p_tags, 1), 1)
       FROM unnest(p_tags) tag WHERE tag = ANY(t.tags)),
      0
    ) +
    0.4 * COALESCE(similarity(t.title || ' ' || COALESCE(t.description, ''), p_translated_body), 0)
  ) >= p_threshold
  ORDER BY similarity_score DESC
  LIMIT 5;
END;
$$;
```

### Example 4: AI Processing Service Structure

```typescript
// apps/backoffice/lib/ai/feedback-intelligence-service.ts
import { getOpenAIClient, calculateCost } from './openai';
import { supabaseAdmin } from '../supabase-admin';

// Canonical tag taxonomy -- AI picks from this list
const FEEDBACK_TAGS = [
  'menu',
  'pricing',
  'service',
  'delivery',
  'ambience',
  'cleanliness',
  'app',
  'ordering',
  'payment',
  'reservation',
  'staff',
  'wait-time',
  'food-quality',
  'portion-size',
  'allergens',
  'hours',
  'location',
  'wifi',
  'parking',
  'accessibility',
  'loyalty',
  'promotions',
  'packaging',
  'temperature',
  'freshness',
  'variety',
  'vegan-options',
  'gluten-free',
  'kids-menu',
  'drinks',
  'desserts',
  'communication',
  'billing',
  'refund',
  'noise',
  'seating',
  'outdoor',
  'pet-friendly',
] as const;

interface ProcessingResult {
  detected_language: string;
  translated_title: string | null;
  translated_body: string;
  type: string;
  priority: number;
  sentiment: string;
  confidence: number;
  tags: string[];
}

export async function processSubmission(submissionId: string): Promise<void> {
  // 1. Fetch submission
  const { data: submission } = await supabaseAdmin
    .from('fb_submissions')
    .select('*')
    .eq('id', submissionId)
    .single();

  if (!submission) throw new Error(`Submission ${submissionId} not found`);

  // 2. Mark as processing
  await supabaseAdmin
    .from('fb_submissions')
    .update({
      status: 'processing',
      processing_attempts: submission.processing_attempts + 1,
    })
    .eq('id', submissionId);

  try {
    // 3. Call OpenAI (single call for translate + classify + tag)
    const result = await callAIProcessor(submission);

    // 4. Find similar tasks
    const { data: similarTasks } = await supabaseAdmin.rpc(
      'find_similar_tasks',
      {
        p_merchant_id: submission.merchant_id,
        p_translated_body: result.translated_body,
        p_tags: result.tags,
      }
    );

    // 5. Link to existing task or create new one
    let taskId: string;
    if (
      similarTasks &&
      similarTasks.length > 0 &&
      similarTasks[0].similarity_score >= 0.5
    ) {
      taskId = similarTasks[0].task_id;
      // Update task denormalized metrics
      await updateTaskMetrics(taskId, result);
    } else {
      taskId = await createTask(submission.merchant_id, result);
    }

    // 6. Update submission with results
    await supabaseAdmin
      .from('fb_submissions')
      .update({
        detected_language: result.detected_language,
        translated_title: result.translated_title,
        translated_body: result.translated_body,
        type: result.type,
        priority: result.priority,
        sentiment: result.sentiment,
        ai_confidence: result.confidence,
        tags: result.tags,
        task_id: taskId,
        status: 'processed',
        processed_at: new Date().toISOString(),
      })
      .eq('id', submissionId);
  } catch (error) {
    await supabaseAdmin
      .from('fb_submissions')
      .update({
        status: submission.processing_attempts >= 2 ? 'failed' : 'pending',
        processing_error:
          error instanceof Error ? error.message : 'Unknown error',
      })
      .eq('id', submissionId);
  }
}
```

## State of the Art

| Old Approach                          | Current Approach                                                            | When Changed                       | Impact                                                              |
| ------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| Separate translate/classify API calls | Single structured JSON call with `response_format: { type: 'json_object' }` | OpenAI JSON mode (mid-2024)        | 3x fewer API calls, lower cost, more consistent output              |
| Embedding-based similarity (pgvector) | Tag overlap + pg_trgm for small-medium scale                                | Depends on data volume             | Simpler, no extra extension needed, sufficient for <10K submissions |
| Manual feedback categorization        | AI auto-classification with confidence scores                               | Standard practice with GPT-4o-mini | Instant processing, consistent taxonomy                             |

**Deprecated/outdated:**

- Using `gpt-3.5-turbo` for classification: `gpt-4o-mini` is cheaper ($0.15 vs $0.50 per 1M input tokens) AND better. The project already uses `gpt-4o-mini` as `DEFAULT_MODEL`.
- `response_format: { type: 'json_object' }` is already used in `translation-service.ts` line 203 -- confirmed available and working.

## Open Questions

1. **pg_trgm availability on Supabase production**
   - What we know: Extension is enabled in `shared/core/food-database/schema.sql`, and Supabase supports pg_trgm
   - What's unclear: Whether the production database already has it enabled
   - Recommendation: Include `CREATE EXTENSION IF NOT EXISTS "pg_trgm"` in the migration. Safe to run even if already enabled.

2. **Notification table design**
   - What we know: The context mentions `fb_merchant_notifications`. There's already `internal_notifications` (migration 029) for GudBro team.
   - What's unclear: Whether merchant notifications should reuse the existing notification system or be feedback-specific
   - Recommendation: Create a dedicated `fb_merchant_notifications` table to avoid coupling with the internal notification system. This keeps the feedback intelligence domain self-contained.

3. **Migration number**
   - What we know: Latest migration is 081. Next would be 082.
   - Recommendation: Use `082-feedback-intelligence.sql`

## Sources

### Primary (HIGH confidence)

- `apps/backoffice/lib/ai/openai.ts` - OpenAI client pattern, model pricing, cost calculation
- `apps/backoffice/lib/ai/translation-service.ts` - Batch translation pattern, JSON response parsing, `response_format`
- `apps/backoffice/lib/ai/feedback-loop-service.ts` - Feedback classification pattern (type, sentiment, priority via AI)
- `apps/backoffice/lib/supabase-admin.ts` - Service role admin client pattern
- `shared/database/migrations/schema/029-ai-feedback-loop.sql` - Migration structure, RLS policy pattern, TEXT+CHECK pattern
- `shared/database/migrations/schema/024-merchant-followers-feedback.sql` - Customer feedback schema, denormalized analytics pattern
- `shared/core/food-database/schema.sql` - pg_trgm extension already enabled

### Secondary (MEDIUM confidence)

- [PostgreSQL pg_trgm documentation](https://www.postgresql.org/docs/current/pgtrgm.html) - Similarity functions, GIN/GiST indexing, threshold defaults
- [Neon pg_trgm docs](https://neon.com/docs/extensions/pg_trgm) - Practical usage patterns

### Tertiary (LOW confidence)

- None -- all findings verified against codebase or official PostgreSQL docs

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - All technologies already in use in the codebase, patterns verified from source files
- Architecture: HIGH - Service structure, migration patterns, and AI call patterns all derived from existing code
- Pitfalls: HIGH - Identified from actual codebase patterns (RLS, supabaseAdmin, pg_trgm) and PostgreSQL docs

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable patterns, no fast-moving dependencies)
