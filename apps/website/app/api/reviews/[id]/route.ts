import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/reviews/[id]
 * Get single review details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: review, error } = await supabase
      .from('v_reviews_public')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[ReviewDetailAPI] Error:', error);
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ review });
  } catch (err) {
    console.error('[ReviewDetailAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/reviews/[id]
 * Update review (user can edit own, merchant can respond)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { action, content, response } = body;

    // Get review
    const { data: review } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (action === 'edit') {
      // Only owner can edit
      if (review.account_id !== account.id) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
      }

      const { error } = await supabase
        .from('reviews')
        .update({
          content: content || review.content,
          status: 'pending', // Re-moderate after edit
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('[ReviewDetailAPI] Edit error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Review updated, pending re-moderation',
      });
    }

    if (action === 'respond') {
      // Check if user is owner of the merchant being reviewed
      const { data: merchantRole } = await supabase
        .from('account_roles')
        .select('reference_id')
        .eq('account_id', account.id)
        .eq('role_type', 'merchant')
        .eq('is_active', true)
        .single();

      if (!merchantRole || merchantRole.reference_id !== review.merchant_id) {
        return NextResponse.json(
          { error: 'Only the merchant can respond' },
          { status: 403 }
        );
      }

      const { error } = await supabase
        .from('reviews')
        .update({
          merchant_response: response,
          merchant_response_at: new Date().toISOString(),
          merchant_response_by: account.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('[ReviewDetailAPI] Respond error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Response added',
      });
    }

    if (action === 'hide') {
      // Only owner can hide
      if (review.account_id !== account.id) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
      }

      const { error } = await supabase
        .from('reviews')
        .update({
          status: 'hidden',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('[ReviewDetailAPI] Hide error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Review hidden',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('[ReviewDetailAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
