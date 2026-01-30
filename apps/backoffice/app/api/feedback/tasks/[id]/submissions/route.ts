import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Fetch submissions linked to a feedback task
// ============================================================================

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
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
      .from('fb_submissions')
      .select(
        'id, merchant_id, original_title, original_body, translated_title, translated_body, detected_language, type, priority, sentiment, tags, screenshot_url, submitted_by_account_id, created_at'
      )
      .eq('task_id', params.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching task submissions:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submissions: data || [] });
  } catch (error) {
    console.error('Error in GET /api/feedback/tasks/[id]/submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
