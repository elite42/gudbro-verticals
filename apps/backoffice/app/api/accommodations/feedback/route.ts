import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/feedback?propertyId=X
 *
 * Returns all feedback for a property, ordered by created_at DESC.
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('accom_guest_feedback')
      .select('*')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[accommodations/feedback] GET error:', error);
      return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
    }

    const feedback = (data || []).map((row) => ({
      id: row.id,
      category: row.category,
      message: row.message,
      photoUrl: row.photo_url,
      status: row.status,
      ownerResponse: row.owner_response,
      respondedAt: row.responded_at,
      guestName: row.guest_name,
      guestRoomNumber: row.guest_room_number,
      feedbackType: row.feedback_type,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ feedback });
  } catch (err) {
    console.error('[accommodations/feedback] GET unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
