import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, requireFullAccess } from '@/lib/auth';
import type { ApiResponse, DocumentUploadResponse } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stay/[code]/documents/upload-url
 *
 * Generate a signed upload URL for a guest document (passport or visa).
 * Requires full-access tier. Browse-tier tokens are rejected.
 *
 * Body: { documentType: 'passport' | 'visa', consentTextHash: string, visaExpiryDate?: string }
 * Returns: { data: { docId, signedUrl, path, token } }
 */
export async function POST(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    // Authenticate guest
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

    // Require full access (documents are PII)
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

    // Parse and validate body
    const body = await request.json();
    const { documentType, consentTextHash, visaExpiryDate } = body;

    if (!documentType || !['passport', 'visa'].includes(documentType)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Invalid document type. Must be passport or visa.' },
        { status: 400 }
      );
    }

    if (!consentTextHash || typeof consentTextHash !== 'string' || consentTextHash.trim() === '') {
      return NextResponse.json<ApiResponse<null>>({ error: 'consent_missing' }, { status: 400 });
    }

    if (documentType === 'visa' && !visaExpiryDate) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Visa expiry date is required for visa documents.' },
        { status: 400 }
      );
    }

    // Generate storage path
    const storagePath = `${guest.bookingId}/${documentType}/${Date.now()}.jpg`;

    // Create signed upload URL
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('guest-documents')
      .createSignedUploadUrl(storagePath);

    if (uploadError || !uploadData) {
      console.error('POST /api/stay/[code]/documents/upload-url storage error:', uploadError);
      return NextResponse.json<ApiResponse<null>>({ error: 'upload_failed' }, { status: 500 });
    }

    // Insert document record
    const { data: doc, error: docError } = await supabase
      .from('accom_guest_documents')
      .insert({
        booking_id: guest.bookingId,
        property_id: guest.propertyId,
        document_type: documentType,
        storage_path: storagePath,
        visa_expiry_date: documentType === 'visa' ? visaExpiryDate : null,
        consent_given_at: new Date().toISOString(),
        consent_text_hash: consentTextHash.trim(),
      })
      .select('id')
      .single();

    if (docError || !doc) {
      console.error('POST /api/stay/[code]/documents/upload-url insert error:', docError);
      return NextResponse.json<ApiResponse<null>>({ error: 'upload_failed' }, { status: 500 });
    }

    // If visa, supersede any existing non-superseded visa for this booking
    if (documentType === 'visa') {
      const { data: existingVisas } = await supabase
        .from('accom_guest_documents')
        .select('id')
        .eq('booking_id', guest.bookingId)
        .eq('document_type', 'visa')
        .is('superseded_by', null)
        .is('deleted_at', null)
        .neq('id', doc.id);

      const existingVisaIds = (existingVisas || []).map((v) => v.id);
      if (existingVisaIds.length > 0) {
        await supabase
          .from('accom_guest_documents')
          .update({ superseded_by: doc.id, updated_at: new Date().toISOString() })
          .in('id', existingVisaIds);
      }
    }

    return NextResponse.json<ApiResponse<DocumentUploadResponse>>({
      data: {
        docId: doc.id,
        signedUrl: uploadData.signedUrl,
        path: uploadData.path,
        token: uploadData.token,
      },
    });
  } catch (err) {
    console.error('POST /api/stay/[code]/documents/upload-url error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
