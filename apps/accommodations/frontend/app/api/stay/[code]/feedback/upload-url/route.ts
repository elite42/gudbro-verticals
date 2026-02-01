import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, requireFullAccess } from '@/lib/auth';
import type { ApiResponse, FeedbackUploadUrlResponse } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stay/[code]/feedback/upload-url
 *
 * Generate a signed upload URL for a feedback screenshot/photo.
 * Requires full-access tier.
 *
 * Returns: { data: { signedUrl, path, token } }
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

    // Require full access
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

    // Generate storage path
    const storagePath = `${guest.propertyId}/${guest.bookingId}/feedback/${Date.now()}.jpg`;

    // Create signed upload URL in feedback-screenshots bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('feedback-screenshots')
      .createSignedUploadUrl(storagePath);

    if (uploadError || !uploadData) {
      console.error('POST /api/stay/[code]/feedback/upload-url storage error:', uploadError);
      return NextResponse.json<ApiResponse<null>>({ error: 'upload_failed' }, { status: 500 });
    }

    return NextResponse.json<ApiResponse<FeedbackUploadUrlResponse>>({
      data: {
        signedUrl: uploadData.signedUrl,
        path: uploadData.path,
        token: uploadData.token,
      },
    });
  } catch (err) {
    console.error('POST /api/stay/[code]/feedback/upload-url error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
