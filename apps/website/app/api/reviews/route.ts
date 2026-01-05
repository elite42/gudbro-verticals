import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/reviews
 * Get reviews (public or user's own)
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const productId = searchParams.get('productId');
    const myReviews = searchParams.get('my') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // If requesting own reviews, need auth
    if (myReviews) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const token = authHeader.substring(7);
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

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

      const {
        data: reviews,
        error,
        count,
      } = await supabase
        .from('reviews')
        .select(
          `
          *,
          merchant:merchants(id, business_name)
        `,
          { count: 'exact' }
        )
        .eq('account_id', account.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('[ReviewsAPI] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        reviews: reviews || [],
        total: count || 0,
      });
    }

    // Public reviews
    let query = supabase
      .from('v_reviews_public')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (merchantId) {
      query = query.eq('merchant_id', merchantId);
    }
    if (productId) {
      query = query.eq('product_id', productId);
    }

    const { data: reviews, error, count } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('[ReviewsAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get merchant ratings if merchantId provided
    let merchantRatings = null;
    if (merchantId) {
      const { data } = await supabase
        .from('merchant_ratings')
        .select('*')
        .eq('merchant_id', merchantId)
        .single();
      merchantRatings = data;
    }

    return NextResponse.json({
      reviews: reviews || [],
      total: count || 0,
      merchantRatings,
    });
  } catch (err) {
    console.error('[ReviewsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/reviews
 * Submit a review
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

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
      reviewType,
      overallRating,
      merchantId,
      productId,
      orderId,
      title,
      content,
      foodQuality,
      service,
      value,
      ambiance,
      photos,
      pros,
      cons,
    } = body;

    if (!reviewType || !overallRating) {
      return NextResponse.json({ error: 'reviewType and overallRating required' }, { status: 400 });
    }

    if (overallRating < 1 || overallRating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const validTypes = ['product', 'merchant', 'order'];
    if (!validTypes.includes(reviewType)) {
      return NextResponse.json({ error: 'Invalid reviewType' }, { status: 400 });
    }

    const { data: reviewId, error } = await supabase.rpc('submit_review', {
      p_account_id: account.id,
      p_review_type: reviewType,
      p_overall_rating: overallRating,
      p_merchant_id: merchantId || null,
      p_product_id: productId || null,
      p_order_id: orderId || null,
      p_title: title || null,
      p_content: content || null,
      p_food_quality: foodQuality || null,
      p_service: service || null,
      p_value: value || null,
      p_ambiance: ambiance || null,
      p_photos: photos || [],
      p_pros: pros || [],
      p_cons: cons || [],
    });

    if (error) {
      console.error('[ReviewsAPI] Submit error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      reviewId,
      message: 'Review submitted for moderation',
    });
  } catch (err) {
    console.error('[ReviewsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
