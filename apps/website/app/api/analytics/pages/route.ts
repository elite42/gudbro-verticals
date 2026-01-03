import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/analytics/pages
 * Get popular pages
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const days = parseInt(searchParams.get('days') || '7', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const { data, error } = await supabase.rpc('get_popular_pages', {
      p_merchant_id: merchantId || null,
      p_days: days,
      p_limit: limit,
    });

    if (error) {
      console.error('[AnalyticsAPI] Get pages error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const pages = (data || []).map((row: Record<string, unknown>) => ({
      pagePath: row.page_path,
      viewCount: row.view_count,
      uniqueVisitors: row.unique_visitors,
    }));

    return NextResponse.json({ pages });
  } catch (err) {
    console.error('[AnalyticsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
