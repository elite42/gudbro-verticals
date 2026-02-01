import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * PATCH /api/accommodations/feedback/[id]
 *
 * Update feedback status and/or owner response.
 * Body: { status?: string, ownerResponse?: string }
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { id } = params;

  try {
    const body = await request.json();
    const { status, ownerResponse } = body;

    const validStatuses = ['new', 'acknowledged', 'in_progress', 'resolved', 'dismissed'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    // Build update object
    const update: Record<string, unknown> = {};
    if (status) update.status = status;
    if (ownerResponse !== undefined) {
      update.owner_response = ownerResponse || null;
      update.responded_at = ownerResponse ? new Date().toISOString() : null;
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('accom_guest_feedback')
      .update(update)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('[accommodations/feedback] PATCH error:', error);
      return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json({
      feedback: {
        id: data.id,
        status: data.status,
        ownerResponse: data.owner_response,
        respondedAt: data.responded_at,
      },
    });
  } catch (err) {
    console.error('[accommodations/feedback] PATCH unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
