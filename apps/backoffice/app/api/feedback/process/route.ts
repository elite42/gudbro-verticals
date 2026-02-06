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

import { processSubmission } from '@/lib/ai/feedback-intelligence-service';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  ValidationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const POST = withErrorHandling<unknown>(
  async (request: Request) => {
    // Verify authorization (same pattern as notifications/process)
    const cronSecret = request.headers.get('x-cron-secret');
    const authHeader = request.headers.get('authorization');
    const isVercelCron = request.headers.get('x-vercel-cron') === '1';
    const cronSecretValid = !process.env.CRON_SECRET || cronSecret === process.env.CRON_SECRET;

    const isAuthorized =
      (isVercelCron && cronSecretValid) ||
      authHeader === `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`;

    if (!isAuthorized) {
      throw new AuthenticationError();
    }

    const body = await request.json();

    // Mode 1: Single submission
    if (body.submissionId) {
      await processSubmission(body.submissionId);
      return successResponse({
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
        throw new DatabaseError(fetchError.message, { cause: fetchError });
      }

      if (!pendingSubmissions || pendingSubmissions.length === 0) {
        return successResponse({
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
        } catch {
          failed++;
        }
      }

      return successResponse({
        success: true,
        processed,
        failed,
        total: pendingSubmissions.length,
      });
    }

    throw new ValidationError('Invalid request. Provide { submissionId } or { batch: true }');
  },
  { context: 'feedback/process', logger: backofficeLogger }
);
