// Feedback Intelligence Service
// AI processing pipeline for merchant feedback submissions
// Translates, classifies, tags, and links submissions to tasks

import { getOpenAIClient, calculateCost } from './openai';
import { supabaseAdmin } from '../supabase-admin';
import { createFeedbackNotification } from '../feedback/notification-utils';

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Canonical tag taxonomy for hospitality feedback classification.
 * AI-extracted tags are validated against this list.
 */
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

const VALID_TYPES = [
  'bug',
  'feature_request',
  'improvement',
  'complaint',
  'praise',
  'operational',
] as const;
const VALID_SENTIMENTS = ['positive', 'neutral', 'negative'] as const;

// =============================================================================
// TYPES
// =============================================================================

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

interface Submission {
  id: string;
  merchant_id: string;
  original_title: string | null;
  original_body: string;
  status: string;
  processing_attempts: number;
  submitted_by_account_id: string | null;
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

/**
 * Process a single feedback submission through the AI pipeline.
 *
 * Flow:
 * 1. Fetch submission from db
 * 2. Guard: must be pending
 * 3. Set status to processing, increment attempts
 * 4. Call OpenAI for translation + classification + tagging
 * 5. Find similar existing tasks via RPC
 * 6. Link to existing task or create new one
 * 7. Update submission with all results
 *
 * On failure: set status to 'failed' if max retries reached, else back to 'pending'.
 */
export async function processSubmission(submissionId: string): Promise<void> {
  // 1. Fetch submission
  const { data: submission, error: fetchError } = await supabaseAdmin
    .from('fb_submissions')
    .select(
      'id, merchant_id, original_title, original_body, status, processing_attempts, submitted_by_account_id'
    )
    .eq('id', submissionId)
    .single();

  if (fetchError || !submission) {
    console.error(
      '[FeedbackIntelligence] Submission not found:',
      submissionId,
      fetchError?.message
    );
    return;
  }

  const sub = submission as Submission;

  // 2. Guard: only process pending submissions
  if (sub.status !== 'pending') {
    console.log(
      '[FeedbackIntelligence] Skipping non-pending submission:',
      submissionId,
      sub.status
    );
    return;
  }

  // 3. Set status to processing
  const newAttempts = sub.processing_attempts + 1;
  await supabaseAdmin
    .from('fb_submissions')
    .update({
      status: 'processing',
      processing_attempts: newAttempts,
    } as Record<string, unknown>)
    .eq('id', submissionId);

  try {
    // 4. Call AI for translate + classify + tag
    const result = await callAIProcessor(sub);

    // 5. Find similar tasks
    const { data: similarTasks } = await supabaseAdmin.rpc('find_similar_tasks', {
      p_merchant_id: sub.merchant_id,
      p_translated_body: result.translated_body,
      p_tags: result.tags,
    });

    let taskId: string;

    // 6. Link or create task
    const bestMatch = similarTasks?.[0];
    if (bestMatch && bestMatch.similarity_score >= 0.5) {
      // Link to existing task
      taskId = bestMatch.task_id;

      // Update task metrics via RPC
      await supabaseAdmin.rpc('update_task_metrics', { p_task_id: taskId });
    } else {
      // Create new task
      taskId = await createTask(sub.merchant_id, result, sub);
    }

    // 7. Update submission with AI results + task link
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
      } as Record<string, unknown>)
      .eq('id', submissionId);

    console.log('[FeedbackIntelligence] Processed submission:', submissionId, '-> task:', taskId);

    // Create "acknowledged" notification for the submitter
    if (sub.submitted_by_account_id) {
      await createFeedbackNotification({
        merchantId: sub.merchant_id,
        accountId: sub.submitted_by_account_id,
        submissionId: submissionId,
        taskId: taskId,
        type: 'acknowledged',
        title: 'Your feedback has been received',
        body: `Your submission "${sub.original_title || 'Feedback'}" has been processed and linked to a task.`,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown processing error';
    console.error('[FeedbackIntelligence] Processing failed:', submissionId, errorMessage);

    // Set status based on retry count (max 3 attempts)
    const newStatus = newAttempts >= 3 ? 'failed' : 'pending';

    await supabaseAdmin
      .from('fb_submissions')
      .update({
        status: newStatus,
        processing_error: errorMessage,
      } as Record<string, unknown>)
      .eq('id', submissionId);
  }
}

// =============================================================================
// AI PROCESSOR
// =============================================================================

/**
 * Call OpenAI to translate, classify, and tag a submission in a single API call.
 */
async function callAIProcessor(submission: Submission): Promise<ProcessingResult> {
  const openai = getOpenAIClient();

  const systemPrompt = `You are a feedback intelligence analyst for a hospitality platform. Given merchant feedback in any language, you must:
1) Detect the language and translate to English (if not already English, keep original if English)
2) Classify by type, priority, and sentiment
3) Extract topic tags from this canonical list: ${FEEDBACK_TAGS.join(', ')}

Respond with valid JSON only.`;

  const userContent = [
    submission.original_title ? `Title: ${submission.original_title}` : null,
    `Body: ${submission.original_body}`,
    '',
    'Return JSON with these fields:',
    '- detected_language: ISO 639-1 code (e.g. "en", "it", "vi")',
    `- translated_title: English translation of title (null if no title)`,
    '- translated_body: English translation of body (keep original if already English)',
    `- type: one of ${VALID_TYPES.join(', ')}`,
    '- priority: 1-5 (1=critical, 5=nice-to-have)',
    `- sentiment: one of ${VALID_SENTIMENTS.join(', ')}`,
    '- confidence: 0.0-1.0 (your confidence in the classification)',
    `- tags: array of up to 5 tags from the canonical list`,
  ]
    .filter(Boolean)
    .join('\n');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    temperature: 0.3,
    max_tokens: 800,
    response_format: { type: 'json_object' },
  });

  // Track cost (logging only for now)
  if (completion.usage) {
    const cost = calculateCost(
      'gpt-4o-mini',
      completion.usage.prompt_tokens,
      completion.usage.completion_tokens
    );
    console.log(
      `[FeedbackIntelligence] AI cost: $${cost.toFixed(6)} (${completion.usage.prompt_tokens}+${completion.usage.completion_tokens} tokens)`
    );
  }

  const responseText = completion.choices[0]?.message?.content || '{}';

  // Defensive JSON parsing (strip markdown code blocks if present)
  const cleanJson = responseText
    .replace(/```json?\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  const parsed = JSON.parse(cleanJson);

  // Validate and sanitize
  const validatedTags = Array.isArray(parsed.tags)
    ? parsed.tags
        .filter((tag: string) => FEEDBACK_TAGS.includes(tag as (typeof FEEDBACK_TAGS)[number]))
        .slice(0, 5)
    : [];

  const validatedType = VALID_TYPES.includes(parsed.type) ? parsed.type : 'improvement';
  const validatedSentiment = VALID_SENTIMENTS.includes(parsed.sentiment)
    ? parsed.sentiment
    : 'neutral';
  const validatedPriority = Math.min(5, Math.max(1, Math.round(parsed.priority || 3)));
  const validatedConfidence =
    typeof parsed.confidence === 'number' ? Math.min(1, Math.max(0, parsed.confidence)) : 0.5;

  return {
    detected_language: parsed.detected_language || 'en',
    translated_title: parsed.translated_title || null,
    translated_body: parsed.translated_body || submission.original_body,
    type: validatedType,
    priority: validatedPriority,
    sentiment: validatedSentiment,
    confidence: validatedConfidence,
    tags: validatedTags,
  };
}

// =============================================================================
// TASK CREATION
// =============================================================================

/**
 * Create a new fb_task from a processed submission.
 * Returns the new task ID.
 */
async function createTask(
  merchantId: string,
  result: ProcessingResult,
  submission: Submission
): Promise<string> {
  const title = result.translated_title || result.translated_body.slice(0, 120);

  const { data, error } = await supabaseAdmin
    .from('fb_tasks')
    .insert({
      merchant_id: merchantId,
      title,
      description: result.translated_body,
      type: result.type,
      priority: result.priority,
      tags: result.tags,
      status: 'new',
      submission_count: 1,
      languages: result.detected_language ? [result.detected_language] : [],
      avg_sentiment: mapSentimentToNumeric(result.sentiment),
      first_submitted_at: new Date().toISOString(),
      last_submitted_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }

  return data.id;
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Map sentiment string to numeric value for denormalized avg_sentiment.
 */
function mapSentimentToNumeric(sentiment: string): number {
  switch (sentiment) {
    case 'positive':
      return 1.0;
    case 'neutral':
      return 0.5;
    case 'negative':
      return 0.0;
    default:
      return 0.5;
  }
}
