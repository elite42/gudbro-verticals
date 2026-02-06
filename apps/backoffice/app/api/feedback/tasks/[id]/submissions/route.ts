import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  withErrorHandlingDynamic,
  successResponse,
  AuthenticationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Fetch submissions linked to a feedback task
// ============================================================================

export const GET = withErrorHandlingDynamic<unknown, { id: string }>(
  async (_request, { params }) => {
    const { id } = await params;

    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new AuthenticationError();
    }

    const { data, error } = await supabaseAdmin
      .from('fb_submissions')
      .select(
        'id, merchant_id, original_title, original_body, translated_title, translated_body, detected_language, type, priority, sentiment, tags, screenshot_url, submitted_by_account_id, created_at'
      )
      .eq('task_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new DatabaseError('Failed to fetch task submissions', { cause: error });
    }

    return successResponse({ submissions: data || [] });
  },
  { context: 'feedback/tasks/[id]/submissions', logger: backofficeLogger }
);
