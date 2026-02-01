import { NextRequest, NextResponse } from 'next/server';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';
import { processAccomFeedback } from '@/lib/ai/accom-feedback-service';

export const dynamic = 'force-dynamic';

/**
 * POST /api/accommodations/feedback/process-ai
 *
 * Manual trigger for AI processing of unprocessed accommodations feedback.
 * Processes up to 10 records per call.
 */
export async function POST(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  try {
    const result = await processAccomFeedback();
    return NextResponse.json({
      success: true,
      processed: result.processed,
      failed: result.failed,
    });
  } catch (err) {
    console.error('[accommodations/feedback/process-ai] Error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Processing failed',
      },
      { status: 500 }
    );
  }
}
