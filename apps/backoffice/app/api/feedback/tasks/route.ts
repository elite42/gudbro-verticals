import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { notifyTaskStatusChange } from '@/lib/feedback/notification-utils';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  ValidationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['new', 'reviewing', 'in_progress', 'done', 'rejected'] as const;

// ============================================================================
// GET - Fetch all feedback tasks (admin cross-merchant)
// ============================================================================

export const GET = withErrorHandling(
  async () => {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new AuthenticationError();
    }

    const { data, error } = await supabaseAdmin
      .from('fb_tasks')
      .select('*')
      .order('priority', { ascending: true })
      .order('last_submitted_at', { ascending: false });

    if (error) {
      throw new DatabaseError('Failed to fetch feedback tasks', { cause: error });
    }

    return successResponse({ tasks: data || [] });
  },
  { context: 'feedback/tasks', logger: backofficeLogger }
);

// ============================================================================
// PATCH - Update task status
// ============================================================================

export const PATCH = withErrorHandling(
  async (request: Request) => {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new AuthenticationError();
    }

    const body = await request.json();
    const { taskId, status, resolutionNote } = body as {
      taskId: string;
      status: string;
      resolutionNote?: string;
    };

    if (!taskId || !status) {
      throw new ValidationError('taskId and status are required');
    }

    if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      throw new ValidationError(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    // Build update payload
    const payload: Record<string, unknown> = { status };

    if (status === 'done' || status === 'rejected') {
      payload.resolved_at = new Date().toISOString();
    }

    if (resolutionNote) {
      payload.resolution_note = resolutionNote;
    }

    const { error } = await supabaseAdmin.from('fb_tasks').update(payload).eq('id', taskId);

    if (error) {
      throw new DatabaseError('Failed to update task status', { cause: error });
    }

    // Fire-and-forget notification for relevant status changes (D-1501-1)
    if (status === 'in_progress' || status === 'done' || status === 'rejected') {
      notifyTaskStatusChange(taskId, status);
    }

    return successResponse({ success: true });
  },
  { context: 'feedback/tasks', logger: backofficeLogger }
);
