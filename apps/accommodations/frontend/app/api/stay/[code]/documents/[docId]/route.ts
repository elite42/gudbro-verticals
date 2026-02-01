import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, requireFullAccess } from '@/lib/auth';
import type { ApiResponse, DocumentUrlResponse } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * GET /api/stay/[code]/documents/[docId]
 *
 * Generate a time-limited signed download URL for a specific document.
 * Requires full-access tier. URL expires in 5 minutes.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string; docId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    let guest;
    try {
      guest = await verifyGuestToken(authHeader.slice(7));
    } catch {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    if (!requireFullAccess(guest)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_required' },
        { status: 403 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { code, docId } = params;

    // Verify booking_code matches guest token
    const { data: booking, error: bookingError } = await supabase
      .from('accom_bookings')
      .select('id')
      .eq('booking_code', code)
      .eq('id', guest.bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 404 });
    }

    // Fetch document and verify it belongs to this booking
    const { data: doc, error: docError } = await supabase
      .from('accom_guest_documents')
      .select('id, storage_path')
      .eq('id', docId)
      .eq('booking_id', guest.bookingId)
      .is('deleted_at', null)
      .single();

    if (docError || !doc) {
      return NextResponse.json<ApiResponse<null>>({ error: 'document_not_found' }, { status: 404 });
    }

    // Generate signed download URL (5 min expiry)
    const { data: urlData, error: urlError } = await supabase.storage
      .from('guest-documents')
      .createSignedUrl(doc.storage_path, 300);

    if (urlError || !urlData) {
      console.error('GET /api/stay/[code]/documents/[docId] signed URL error:', urlError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    return NextResponse.json<ApiResponse<DocumentUrlResponse>>({
      data: {
        signedUrl: urlData.signedUrl,
        expiresIn: 300,
      },
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/documents/[docId] error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}

/**
 * DELETE /api/stay/[code]/documents/[docId]
 *
 * Delete a guest document. Removes file from storage first,
 * then soft-deletes the DB record (fail-safe order).
 * Requires full-access tier.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { code: string; docId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    let guest;
    try {
      guest = await verifyGuestToken(authHeader.slice(7));
    } catch {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    if (!requireFullAccess(guest)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_required' },
        { status: 403 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { code, docId } = params;

    // Verify booking_code matches guest token
    const { data: booking, error: bookingError } = await supabase
      .from('accom_bookings')
      .select('id')
      .eq('booking_code', code)
      .eq('id', guest.bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 404 });
    }

    // Fetch document and verify it belongs to this booking
    const { data: doc, error: docError } = await supabase
      .from('accom_guest_documents')
      .select('id, storage_path')
      .eq('id', docId)
      .eq('booking_id', guest.bookingId)
      .is('deleted_at', null)
      .single();

    if (docError || !doc) {
      return NextResponse.json<ApiResponse<null>>({ error: 'document_not_found' }, { status: 404 });
    }

    // Delete from storage FIRST (fail-safe: orphaned DB record is better than orphaned file)
    const { error: storageError } = await supabase.storage
      .from('guest-documents')
      .remove([doc.storage_path]);

    if (storageError) {
      console.error('DELETE /api/stay/[code]/documents/[docId] storage error:', storageError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Soft-delete in DB
    const { error: deleteError } = await supabase
      .from('accom_guest_documents')
      .update({ deleted_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', docId);

    if (deleteError) {
      console.error('DELETE /api/stay/[code]/documents/[docId] DB error:', deleteError);
      // Storage already deleted, log but still return success
    }

    return NextResponse.json<ApiResponse<{ success: boolean }>>({
      data: { success: true },
    });
  } catch (err) {
    console.error('DELETE /api/stay/[code]/documents/[docId] error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
