/**
 * Feedback Submission Processor
 *
 * POST /api/feedback/process
 *
 * Processes pending feedback submissions through the AI pipeline.
 *
 * Modes:
 * - Single: { submissionId: "uuid" } — process one submission
 * - Batch:  { batch: true } — process up to 10 pending submissions
 *
 * Security: Requires CRON_SECRET header or service role key.
 * This endpoint is called by cron jobs or manual triggers.
 */

import { NextRequest, NextResponse } from 'next/server';
import { processSubmission } from '@/lib/ai/feedback-intelligence-service';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  // Verify authorization (same pattern as notifications/process)
  const cronSecret = request.headers.get('x-cron-secret');
  const authHeader = request.headers.get('authorization');
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const cronSecretValid = !process.env.CRON_SECRET || cronSecret === process.env.CRON_SECRET;

  const isAuthorized =
    (isVercelCron && cronSecretValid) ||
    authHeader === `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`;

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Mode 1: Single submission
    if (body.submissionId) {
      await processSubmission(body.submissionId);
      return NextResponse.json({
        success: true,
        submissionId: body.submissionId,
      });
    }

    // Mode 2: Batch processing
    if (body.batch === true) {
      const { data: pendingSubmissions, error: fetchError } = await supabaseAdmin
        .from('fb_submissions')
        .select('id')
        .eq('status', 'pending')
        .lt('processing_attempts', 3)
        .order('created_at', { ascending: true })
        .limit(10);

      if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
      }

      if (!pendingSubmissions || pendingSubmissions.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No pending submissions',
          processed: 0,
          failed: 0,
        });
      }

      let processed = 0;
      let failed = 0;

      // Process sequentially to avoid OpenAI rate limits
      for (const sub of pendingSubmissions) {
        try {
          await processSubmission(sub.id);
          processed++;
        } catch (error) {
          console.error('[FeedbackProcess] Failed to process:', sub.id, error);
          failed++;
        }
      }

      return NextResponse.json({
        success: true,
        processed,
        failed,
        total: pendingSubmissions.length,
      });
    }

    return NextResponse.json(
      { error: 'Invalid request. Provide { submissionId } or { batch: true }' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[FeedbackProcess] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}
