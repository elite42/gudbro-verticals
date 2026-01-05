import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/wishlist
 * Get user's wishlist
 */
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const itemType = searchParams.get('type');
    const status = searchParams.get('status') || 'active';

    let query = supabase
      .from('wishlists')
      .select(
        `
        *,
        merchant:merchants(id, business_name)
      `
      )
      .eq('account_id', account.id)
      .eq('status', status)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (itemType) {
      query = query.eq('item_type', itemType);
    }

    const { data: items, error } = await query;

    if (error) {
      console.error('[WishlistAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get item details for each wishlist item
    const enrichedItems = await Promise.all(
      (items || []).map(async (item) => {
        let itemDetails = null;

        if (item.item_type === 'product') {
          const { data } = await supabase
            .from('product_taxonomy')
            .select('id, name, description, category')
            .eq('id', item.item_id)
            .single();
          itemDetails = data;
        } else if (item.item_type === 'ingredient') {
          const { data } = await supabase
            .from('ingredients')
            .select('id, name, category')
            .eq('id', item.item_id)
            .single();
          itemDetails = data;
        } else if (item.item_type === 'merchant') {
          const { data } = await supabase
            .from('merchants')
            .select('id, business_name, cuisine_type')
            .eq('id', item.item_id)
            .single();
          itemDetails = data;
        }

        return {
          ...item,
          itemDetails,
        };
      })
    );

    return NextResponse.json({
      items: enrichedItems,
      counts: {
        active: items?.filter((i) => i.status === 'active').length || 0,
        tried: items?.filter((i) => i.status === 'tried').length || 0,
      },
    });
  } catch (err) {
    console.error('[WishlistAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/wishlist
 * Add item to wishlist
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
    const { itemType, itemId, merchantId, notes, priority } = body;

    if (!itemType || !itemId) {
      return NextResponse.json({ error: 'itemType and itemId required' }, { status: 400 });
    }

    const validTypes = ['product', 'ingredient', 'merchant', 'recipe'];
    if (!validTypes.includes(itemType)) {
      return NextResponse.json({ error: 'Invalid itemType' }, { status: 400 });
    }

    const { data: wishlistId, error } = await supabase.rpc('add_to_wishlist', {
      p_account_id: account.id,
      p_item_type: itemType,
      p_item_id: itemId,
      p_merchant_id: merchantId || null,
      p_notes: notes || null,
      p_priority: priority || 0,
    });

    if (error) {
      console.error('[WishlistAPI] Add error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      wishlistId,
      message: 'Added to wishlist',
    });
  } catch (err) {
    console.error('[WishlistAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/wishlist
 * Remove item from wishlist
 */
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const wishlistId = searchParams.get('id');

    if (!wishlistId) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    const { data: removed, error } = await supabase.rpc('remove_from_wishlist', {
      p_account_id: account.id,
      p_wishlist_id: wishlistId,
    });

    if (error) {
      console.error('[WishlistAPI] Remove error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: removed,
      message: removed ? 'Removed from wishlist' : 'Item not found',
    });
  } catch (err) {
    console.error('[WishlistAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/wishlist
 * Mark item as tried
 */
export async function PATCH(request: NextRequest) {
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
    const { wishlistId, action, rating } = body;

    if (!wishlistId || !action) {
      return NextResponse.json({ error: 'wishlistId and action required' }, { status: 400 });
    }

    if (action === 'tried') {
      const { data: success, error } = await supabase.rpc('mark_wishlist_tried', {
        p_account_id: account.id,
        p_wishlist_id: wishlistId,
        p_rating: rating || null,
      });

      if (error) {
        console.error('[WishlistAPI] Mark tried error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success,
        message: success ? 'Marked as tried' : 'Item not found',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('[WishlistAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
