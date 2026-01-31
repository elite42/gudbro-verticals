import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/deals/[id]/click?bid=<booking_id>
 *
 * Logs a deal click and redirects to the partner URL.
 * No authentication required -- click tracking is not sensitive.
 * booking_id is optional (passed as query param for attribution).
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const dealId = params.id;
  const bookingId = request.nextUrl.searchParams.get('bid') || null;

  const supabase = getSupabaseAdmin();

  // Log click (fire and forget -- don't block redirect on insert failure)
  await supabase.from('accom_deal_clicks').insert({
    deal_id: dealId,
    booking_id: bookingId,
  });

  // Get deal URL
  const { data } = await supabase
    .from('accom_deals')
    .select('url')
    .eq('id', dealId)
    .eq('is_active', true)
    .single();

  if (!data?.url) {
    // No URL or deal not found -- redirect to stay dashboard root
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.redirect(data.url);
}
