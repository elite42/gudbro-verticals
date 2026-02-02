import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

// Points awarded per action type
const POINTS_CONFIG: Record<string, number> = {
  // Social actions
  instagram_follow: 50,
  facebook_follow: 50,
  instagram_share: 25,
  facebook_share: 25,
  instagram_story: 30,
  instagram_post: 50,
  google_review: 100,
  tripadvisor_review: 100,

  // Engagement actions
  check_in: 20,
  referral: 100,
  referral_purchase: 200,
  birthday_bonus: 50,

  // Order actions (usually handled by backend triggers)
  order_complete: 10,
  first_order: 50,
};

interface PointsRequest {
  accountId?: string;
  sessionId?: string;
  actionType: string;
  metadata?: Record<string, unknown>;
}

// POST /api/loyalty/points - Record points for an action
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  try {
    const body: PointsRequest = await request.json();
    const { accountId, sessionId, actionType, metadata } = body;

    // Validation
    if (!actionType) {
      return NextResponse.json({ error: 'actionType is required' }, { status: 400 });
    }

    const points = POINTS_CONFIG[actionType];
    if (points === undefined) {
      return NextResponse.json(
        {
          error: `Unknown action type: ${actionType}`,
          validTypes: Object.keys(POINTS_CONFIG),
        },
        { status: 400 }
      );
    }

    // If we have an accountId, update the account points
    if (accountId) {
      // First get current points
      const { data: account, error: fetchError } = await supabase
        .from('accounts')
        .select('consumer_points, total_points')
        .eq('id', accountId)
        .single();

      if (fetchError) {
        console.error('Account fetch error:', fetchError);
        // Account doesn't exist or can't be found - log points for later
      } else {
        // Update account points
        const { error: updateError } = await supabase
          .from('accounts')
          .update({
            consumer_points: (account.consumer_points || 0) + points,
            total_points: (account.total_points || 0) + points,
          })
          .eq('id', accountId);

        if (updateError) {
          console.error('Account update error:', updateError);
        }
      }
    }

    // Log the transaction
    const transactionData = {
      account_id: accountId || null,
      merchant_id: '00000000-0000-0000-0000-000000000001', // ROOTS
      points_amount: points,
      transaction_type: 'earn',
      source: actionType,
      description: `Earned ${points} points for ${actionType.replace(/_/g, ' ')}`,
      metadata: {
        session_id: sessionId,
        ...metadata,
      },
    };

    // Try to log to loyalty_transactions if table exists
    try {
      await supabase.from('loyalty_transactions').insert(transactionData);
    } catch (logError) {
      // Table might not exist or have different schema
      console.log('Transaction log skipped:', logError);
    }

    return NextResponse.json({
      success: true,
      points,
      actionType,
      message: `+${points} punti guadagnati!`,
    });
  } catch (error) {
    console.error('Loyalty points POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/loyalty/points - Get points config or user balance
export async function GET(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    if (accountId) {
      // Get account balance
      const { data: account, error } = await supabase
        .from('accounts')
        .select('consumer_points, total_points, loyalty_tier')
        .eq('id', accountId)
        .single();

      if (error) {
        return NextResponse.json({ error: 'Account not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        balance: account.consumer_points || 0,
        totalEarned: account.total_points || 0,
        tier: account.loyalty_tier || 'bronze',
      });
    }

    // Return points config
    return NextResponse.json({
      success: true,
      config: POINTS_CONFIG,
    });
  } catch (error) {
    console.error('Loyalty points GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
