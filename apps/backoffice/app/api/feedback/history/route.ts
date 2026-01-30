import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Fetch merchant submission history
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('fb_submissions')
      .select('id, original_title, type, status, created_at, screenshot_url, original_body')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback history:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submissions: data || [] });
  } catch (error) {
    console.error('Error in GET /api/feedback/history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
