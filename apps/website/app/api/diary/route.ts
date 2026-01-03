import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/diary
 * Get food diary entries
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

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '30');

    let query = supabase
      .from('food_diary_entries')
      .select(`
        *,
        merchant:merchants(id, business_name)
      `)
      .eq('account_id', account.id)
      .order('entry_date', { ascending: false })
      .order('entry_time', { ascending: false });

    if (date) {
      query = query.eq('entry_date', date);
    } else if (startDate && endDate) {
      query = query.gte('entry_date', startDate).lte('entry_date', endDate);
    }

    const { data: entries, error } = await query.limit(limit);

    if (error) {
      console.error('[DiaryAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get daily summary if date specified
    let dailySummary = null;
    if (date) {
      const { data: summary } = await supabase
        .from('food_diary_daily_summary')
        .select('*')
        .eq('account_id', account.id)
        .eq('summary_date', date)
        .single();
      dailySummary = summary;
    }

    return NextResponse.json({
      entries: entries || [],
      dailySummary,
    });
  } catch (err) {
    console.error('[DiaryAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/diary
 * Log a food diary entry
 */
export async function POST(request: NextRequest) {
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

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      entryDate,
      mealType,
      items,
      merchantId,
      locationName,
      isHomeCooking,
      notes,
      totalCost,
      photos,
    } = body;

    if (!mealType || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'mealType and items array required' },
        { status: 400 }
      );
    }

    const validMealTypes = ['breakfast', 'brunch', 'lunch', 'snack', 'dinner', 'dessert', 'drink'];
    if (!validMealTypes.includes(mealType)) {
      return NextResponse.json({ error: 'Invalid mealType' }, { status: 400 });
    }

    const { data: entryId, error } = await supabase.rpc('log_food_diary_entry', {
      p_account_id: account.id,
      p_entry_date: entryDate || new Date().toISOString().split('T')[0],
      p_meal_type: mealType,
      p_items: items,
      p_merchant_id: merchantId || null,
      p_location_name: locationName || null,
      p_is_home_cooking: isHomeCooking || false,
      p_notes: notes || null,
      p_total_cost: totalCost || null,
      p_photos: photos || [],
    });

    if (error) {
      console.error('[DiaryAPI] Log error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      entryId,
      message: 'Entry logged successfully',
    });
  } catch (err) {
    console.error('[DiaryAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/diary
 * Delete a diary entry
 */
export async function DELETE(request: NextRequest) {
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

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get('id');

    if (!entryId) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    // Get entry to find date for summary update
    const { data: entry } = await supabase
      .from('food_diary_entries')
      .select('entry_date')
      .eq('id', entryId)
      .eq('account_id', account.id)
      .single();

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    const { error } = await supabase
      .from('food_diary_entries')
      .delete()
      .eq('id', entryId)
      .eq('account_id', account.id);

    if (error) {
      console.error('[DiaryAPI] Delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update daily summary
    await supabase.rpc('update_daily_summary', {
      p_account_id: account.id,
      p_date: entry.entry_date,
    });

    return NextResponse.json({
      success: true,
      message: 'Entry deleted',
    });
  } catch (err) {
    console.error('[DiaryAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
