import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { notifyTaskStatusChange } from '@/lib/feedback/notification-utils';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['new', 'reviewing', 'in_progress', 'done', 'rejected'] as const;

// ============================================================================
// GET - Fetch all feedback tasks (admin cross-merchant)
// ============================================================================

export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('fb_tasks')
      .select('*')
      .order('priority', { ascending: true })
      .order('last_submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback tasks:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ tasks: data || [] });
  } catch (error) {
    console.error('Error in GET /api/feedback/tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PATCH - Update task status
// ============================================================================

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { taskId, status, resolutionNote } = body as {
      taskId: string;
      status: string;
      resolutionNote?: string;
    };

    if (!taskId || !status) {
      return NextResponse.json({ error: 'taskId and status are required' }, { status: 400 });
    }

    if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
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
      console.error('Error updating task status:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fire-and-forget notification for relevant status changes (D-1501-1)
    if (status === 'in_progress' || status === 'done' || status === 'rejected') {
      notifyTaskStatusChange(taskId, status);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PATCH /api/feedback/tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
