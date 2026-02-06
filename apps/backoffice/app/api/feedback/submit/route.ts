/**
 * Feedback Submission API
 *
 * POST /api/feedback/submit
 *
 * Accepts merchant feedback submissions and inserts into fb_submissions.
 * After successful insert, triggers AI processing asynchronously.
 */

import { createClient } from '@/lib/supabase-server';
import {
  withErrorHandling,
  createdResponse,
  ValidationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

const VALID_TYPES = ['bug', 'feature_request', 'improvement'] as const;
type SubmissionType = (typeof VALID_TYPES)[number];

// Map UI-friendly type names to DB values
function mapType(uiType: string): SubmissionType | null {
  if (uiType === 'bug') return 'bug';
  if (uiType === 'feature_request') return 'feature_request';
  if (uiType === 'feedback' || uiType === 'improvement') return 'improvement';
  return null;
}

export const POST = withErrorHandling(
  async (request: Request) => {
    const supabase = await createClient();

    // Resolve account_id from auth session
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let accountId: string | null = null;
    if (user) {
      const { data: account } = await supabase
        .from('accounts')
        .select('id')
        .eq('auth_id', user.id)
        .single();
      accountId = account?.id || null;
    }

    const body = await request.json();

    const {
      original_title,
      original_body,
      type,
      merchant_id,
      vertical,
      page_path,
      screenshot_url,
    } = body;

    // Validate required fields
    if (!original_title || typeof original_title !== 'string' || !original_title.trim()) {
      throw new ValidationError('original_title is required');
    }

    if (!original_body || typeof original_body !== 'string' || !original_body.trim()) {
      throw new ValidationError('original_body is required');
    }

    if (!merchant_id || typeof merchant_id !== 'string' || !merchant_id.trim()) {
      throw new ValidationError('merchant_id is required');
    }

    const mappedType = mapType(type);
    if (!mappedType) {
      throw new ValidationError('Invalid type. Must be one of: bug, feature_request, feedback');
    }

    // Insert into fb_submissions
    const { data, error } = await supabase
      .from('fb_submissions')
      .insert({
        original_title: original_title.trim(),
        original_body: original_body.trim(),
        type: mappedType,
        source: 'manual',
        status: 'pending',
        merchant_id: merchant_id.trim(),
        vertical: vertical || null,
        page_path: page_path || null,
        screenshot_url: screenshot_url || null,
        submitted_by_account_id: accountId,
      })
      .select('id')
      .single();

    if (error) {
      throw new DatabaseError('Failed to create submission', { cause: error });
    }

    // Fire-and-forget: trigger AI processing asynchronously
    try {
      const origin = new URL(request.url).origin;
      fetch(`${origin}/api/feedback/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ submissionId: data.id }),
      }).catch(() => {
        // Non-blocking: fire-and-forget
      });
    } catch {
      // Non-blocking: submission is already saved
    }

    return createdResponse({ id: data.id, message: 'Submission created' });
  },
  { context: 'feedback/submit', logger: backofficeLogger }
);
