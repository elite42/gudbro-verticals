// Accommodations Feedback Intelligence Service
// AI processing pipeline for guest feedback (post-stay and in-stay)
// Forked from feedback-intelligence-service.ts with accommodations-specific taxonomy

import { getOpenAIClient, calculateCost } from './openai';
import { supabaseAdmin } from '../supabase-admin';

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Canonical tag taxonomy for accommodations guest feedback classification.
 * AI-extracted tags are validated against this list.
 */
export const ACCOM_FEEDBACK_TAGS = [
  // Maintenance & facilities
  'maintenance',
  'plumbing',
  'electrical',
  'furniture',
  'appliances',

  // Housekeeping
  'housekeeping',
  'cleanliness',
  'linens',
  'towels',

  // Environment
  'noise',
  'neighbors',
  'construction',

  // Technology & comfort
  'wifi',
  'tv',
  'ac-heating',

  // Check-in/out process
  'check-in',
  'check-out',
  'key-access',

  // Amenities & spaces
  'amenities',
  'kitchen',
  'bathroom',
  'pool',
  'common-areas',
  'parking',
  'laundry',

  // Safety
  'safety',
  'security',
  'pest-control',

  // Location & surroundings
  'location',
  'neighborhood',

  // Host interaction
  'communication',
  'responsiveness',

  // Value
  'value',
  'pricing',
  'extra-charges',
] as const;

const VALID_SENTIMENTS = ['positive', 'neutral', 'negative'] as const;

// =============================================================================
// TYPES
// =============================================================================

interface AccomFeedbackRow {
  id: string;
  property_id: string;
  message: string;
  category: string;
  feedback_type: string;
  rating_overall: number | null;
}

interface AIProcessingResult {
  tags: string[];
  sentiment: string;
  priority: number;
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

/**
 * Process unprocessed accommodations guest feedback through the AI pipeline.
 *
 * Flow:
 * 1. Query accom_guest_feedback WHERE ai_processed_at IS NULL (LIMIT 10)
 * 2. For each: call GPT-4o-mini to extract tags, sentiment, priority
 * 3. Update record with ai_tags, ai_sentiment, ai_priority, ai_processed_at
 *
 * Returns count of processed records.
 */
export async function processAccomFeedback(): Promise<{ processed: number; failed: number }> {
  // 1. Fetch unprocessed feedback
  const { data: feedbackRows, error: fetchError } = await supabaseAdmin
    .from('accom_guest_feedback')
    .select('id, property_id, message, category, feedback_type, rating_overall')
    .is('ai_processed_at', null)
    .order('created_at', { ascending: true })
    .limit(10);

  if (fetchError) {
    console.error('[AccomFeedback] Failed to fetch unprocessed feedback:', fetchError.message);
    throw new Error(`Fetch error: ${fetchError.message}`);
  }

  if (!feedbackRows || feedbackRows.length === 0) {
    return { processed: 0, failed: 0 };
  }

  let processed = 0;
  let failed = 0;

  for (const row of feedbackRows as AccomFeedbackRow[]) {
    try {
      // 2. Call AI for tag extraction + sentiment + priority
      const result = await callAIProcessor(row);

      // 3. Update record
      await supabaseAdmin
        .from('accom_guest_feedback')
        .update({
          ai_tags: result.tags,
          ai_sentiment: result.sentiment,
          ai_priority: result.priority,
          ai_processed_at: new Date().toISOString(),
        } as Record<string, unknown>)
        .eq('id', row.id);

      processed++;
      console.log('[AccomFeedback] Processed feedback:', row.id, 'tags:', result.tags.join(', '));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[AccomFeedback] Failed to process feedback:', row.id, errorMessage);
      failed++;
    }
  }

  return { processed, failed };
}

// =============================================================================
// AI PROCESSOR
// =============================================================================

async function callAIProcessor(feedback: AccomFeedbackRow): Promise<AIProcessingResult> {
  const openai = getOpenAIClient();

  const systemPrompt = `You are a feedback analyst for an accommodation/property management platform. Given guest feedback about their stay (hotel, apartment, hostel, etc.), you must:
1) Extract relevant topic tags from this canonical list: ${ACCOM_FEEDBACK_TAGS.join(', ')}
2) Determine sentiment (positive, neutral, or negative)
3) Assign priority 1-5 (1=lowest/nice-to-know, 5=urgent/safety issue)

Consider the feedback category (${feedback.category}) and type (${feedback.feedback_type}) for context.
${feedback.rating_overall ? `The guest gave an overall rating of ${feedback.rating_overall}/5.` : ''}

Respond with valid JSON only.`;

  const userContent = [
    `Category: ${feedback.category}`,
    `Type: ${feedback.feedback_type}`,
    `Message: ${feedback.message}`,
    '',
    'Return JSON with these fields:',
    `- tags: array of up to 5 tags from the canonical list`,
    `- sentiment: one of ${VALID_SENTIMENTS.join(', ')}`,
    '- priority: 1-5 (1=lowest, 5=urgent)',
  ].join('\n');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    temperature: 0.3,
    max_tokens: 400,
    response_format: { type: 'json_object' },
  });

  // Track cost
  if (completion.usage) {
    const cost = calculateCost(
      'gpt-4o-mini',
      completion.usage.prompt_tokens,
      completion.usage.completion_tokens
    );
    console.log(
      `[AccomFeedback] AI cost: $${cost.toFixed(6)} (${completion.usage.prompt_tokens}+${completion.usage.completion_tokens} tokens)`
    );
  }

  const responseText = completion.choices[0]?.message?.content || '{}';

  // Defensive JSON parsing
  const cleanJson = responseText
    .replace(/```json?\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  const parsed = JSON.parse(cleanJson);

  // Validate and sanitize
  const validatedTags = Array.isArray(parsed.tags)
    ? parsed.tags
        .filter((tag: string) =>
          ACCOM_FEEDBACK_TAGS.includes(tag as (typeof ACCOM_FEEDBACK_TAGS)[number])
        )
        .slice(0, 5)
    : [];

  const validatedSentiment = VALID_SENTIMENTS.includes(parsed.sentiment)
    ? parsed.sentiment
    : 'neutral';
  const validatedPriority = Math.min(5, Math.max(1, Math.round(parsed.priority || 3)));

  return {
    tags: validatedTags,
    sentiment: validatedSentiment,
    priority: validatedPriority,
  };
}
