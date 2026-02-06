import { createClient } from '@/lib/supabase-server';
import {
  withErrorHandling,
  successResponse,
  ValidationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Fetch merchant submission history
// ============================================================================

export const GET = withErrorHandling(
  async (request: Request) => {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      throw new ValidationError('merchantId is required');
    }

    const { data, error } = await supabase
      .from('fb_submissions')
      .select('id, original_title, type, status, created_at, screenshot_url, original_body')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new DatabaseError('Failed to fetch feedback history', { cause: error });
    }

    return successResponse({ submissions: data || [] });
  },
  { context: 'feedback/history', logger: backofficeLogger }
);
