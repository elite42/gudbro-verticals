import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { chargesLimiter, withRateLimit } from '@/lib/rate-limiter';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Fetch enabled charges for a merchant
// ============================================================================

export async function GET(request: NextRequest) {
  // Rate limit: 60 requests per minute per IP
  const rateLimitResult = await withRateLimit(request, chargesLimiter);
  if (rateLimitResult) return rateLimitResult;

  const supabase = getSupabaseAdmin();

  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    const { data: charges, error } = await supabase
      .from('merchant_charges')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('is_enabled', true)
      .order('charge_type')
      .order('sort_order');

    if (error) {
      console.error('Error fetching charges:', error);
      // Return empty array if table doesn't exist yet (migration not applied)
      if (error.code === '42P01') {
        return NextResponse.json({ charges: [] });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ charges: charges || [] });
  } catch (error) {
    console.error('Error in GET /api/charges:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
