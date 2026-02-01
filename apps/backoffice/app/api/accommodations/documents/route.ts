import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/documents
 *
 * Returns all guest documents for the property, with booking and room info.
 * Supports ?view=urgency (default) or ?view=guests
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const propertyId = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID;
  if (!propertyId) {
    return NextResponse.json({ error: 'Property not configured' }, { status: 500 });
  }

  try {
    // Fetch all non-deleted documents with booking info
    const { data: documents, error } = await supabaseAdmin
      .from('accom_guest_documents')
      .select(
        `id, document_type, file_name, file_size_bytes, visa_expiry_date,
         registered_with_authorities, superseded_by, created_at, deleted_at,
         booking:accom_bookings!inner(
           id, booking_code, guest_name, guest_last_name, check_in_date, check_out_date, status,
           room:accom_rooms(room_number, room_type)
         )`
      )
      .is('deleted_at', null)
      .eq('booking.property_id', propertyId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[accommodations/documents] GET error:', error);
      return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
    }

    // Count pending registrations
    const pendingCount = (documents || []).filter(
      (d) => !d.registered_with_authorities && !d.superseded_by
    ).length;

    return NextResponse.json({
      documents: documents || [],
      pendingCount,
    });
  } catch (err) {
    console.error('[accommodations/documents] unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/accommodations/documents
 *
 * Update document registration status.
 * Body: { docId: string, registeredWithAuthorities: boolean }
 */
export async function PATCH(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  try {
    const body = await request.json();
    const { docId, registeredWithAuthorities } = body;

    if (!docId || typeof registeredWithAuthorities !== 'boolean') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('accom_guest_documents')
      .update({ registered_with_authorities: registeredWithAuthorities })
      .eq('id', docId);

    if (error) {
      console.error('[accommodations/documents] PATCH error:', error);
      return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[accommodations/documents] PATCH unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
