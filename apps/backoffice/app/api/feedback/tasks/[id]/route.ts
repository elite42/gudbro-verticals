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
// GET - Fetch single feedback task by ID
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

    const { data, error } = await supabaseAdmin.from('fb_tasks').select('*').eq('id', id).single();

    if (error) {
      throw new DatabaseError('Failed to fetch feedback task', { cause: error });
    }

    return successResponse({ task: data });
  },
  { context: 'feedback/tasks/[id]', logger: backofficeLogger }
);
