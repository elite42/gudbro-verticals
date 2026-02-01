import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, requireFullAccess } from '@/lib/auth';
import type { ApiResponse, GuestDocument, DocumentListResponse } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * Extract filename from a storage path like "bookingId/passport/1234567890.jpg"
 */
function extractFileName(storagePath: string): string {
  return storagePath.split('/').pop() || storagePath;
}

/**
 * GET /api/stay/[code]/documents
 *
 * List all documents for the authenticated guest's booking.
 * Requires full-access tier. Returns metadata only (no storage URLs).
 */
export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
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
    const { code } = params;

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

    // Fetch documents for this booking
    const { data: docs, error: docsError } = await supabase
      .from('accom_guest_documents')
      .select(
        'id, document_type, storage_path, file_size_bytes, visa_expiry_date, registered_with_authorities, superseded_by, created_at'
      )
      .eq('booking_id', guest.bookingId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (docsError) {
      console.error('GET /api/stay/[code]/documents query error:', docsError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const documents: GuestDocument[] = (docs || []).map((row) => ({
      id: row.id as string,
      documentType: row.document_type as 'passport' | 'visa',
      fileName: extractFileName(row.storage_path as string),
      fileSizeBytes: row.file_size_bytes as number | null,
      visaExpiryDate: (row.visa_expiry_date as string) || null,
      registeredWithAuthorities: row.registered_with_authorities as boolean,
      supersededBy: (row.superseded_by as string) || null,
      createdAt: row.created_at as string,
    }));

    return NextResponse.json<ApiResponse<DocumentListResponse>>({
      data: { documents },
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/documents error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}

/**
 * POST /api/stay/[code]/documents
 *
 * Confirm a document upload by updating file_size_bytes.
 * Called after the client successfully uploads to the signed URL.
 *
 * Body: { docId: string, fileSizeBytes: number }
 */
export async function POST(request: NextRequest, { params }: { params: { code: string } }) {
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
    const { code } = params;

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

    const body = await request.json();
    const { docId, fileSizeBytes } = body;

    if (!docId || typeof fileSizeBytes !== 'number' || fileSizeBytes < 0) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'docId and valid fileSizeBytes are required.' },
        { status: 400 }
      );
    }

    // Update the document record (verify it belongs to this booking)
    const { data: updated, error: updateError } = await supabase
      .from('accom_guest_documents')
      .update({ file_size_bytes: fileSizeBytes, updated_at: new Date().toISOString() })
      .eq('id', docId)
      .eq('booking_id', guest.bookingId)
      .is('deleted_at', null)
      .select('id')
      .single();

    if (updateError || !updated) {
      return NextResponse.json<ApiResponse<null>>({ error: 'document_not_found' }, { status: 404 });
    }

    return NextResponse.json<ApiResponse<{ success: boolean }>>({
      data: { success: true },
    });
  } catch (err) {
    console.error('POST /api/stay/[code]/documents error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
