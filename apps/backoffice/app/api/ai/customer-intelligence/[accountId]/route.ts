import { NextRequest, NextResponse } from 'next/server';
import { getCustomerIntelligence } from '@/lib/ai';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

interface CustomerDetailResponse {
  success: boolean;
  account: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    avatarUrl: string | null;
  } | null;
  follower: {
    id: string;
    source: string | null;
    followedAt: string;
    isActive: boolean;
    analytics: {
      totalVisits: number;
      totalOrders: number;
      totalSpent: number;
      averageOrderValue: number;
      lastVisitAt: string | null;
      loyaltyPoints: number;
      feedbackCount: number;
      averageRating: number | null;
    } | null;
  } | null;
  intelligence: {
    clvEstimated: number | null;
    clvConfidence: number | null;
    churnRiskScore: number | null;
    churnRiskLevel: string | null;
    churnFactors: string[];
    daysSinceLastVisit: number | null;
    segment: string | null;
    predictedNextVisitAt: string | null;
    recommendedActions: Array<{
      type: string;
      priority: number;
      title: string;
      description: string;
      expectedRoi?: number;
    }>;
    visitPattern: Record<string, any>;
    orderPattern: Record<string, any>;
  } | null;
  triggerHistory: Array<{
    id: string;
    triggerId: string;
    triggerName: string;
    triggerType: string;
    actionType: string;
    triggeredAt: string;
    status: string;
    convertedAt: string | null;
    conversionValue: number | null;
  }>;
}

// GET /api/ai/customer-intelligence/[accountId] - Get single customer details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const { accountId } = await params;
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    if (!accountId) {
      return NextResponse.json({ error: 'Missing required field: accountId' }, { status: 400 });
    }

    const supabase = await createClient();

    // Fetch all data in parallel
    const [accountResult, followerResult, intelligenceResult, triggersResult] = await Promise.all([
      // 1. Account info
      supabase
        .from('accounts')
        .select('id, email, first_name, last_name, display_name, avatar_url')
        .eq('id', accountId)
        .single(),

      // 2. Follower relationship with analytics
      supabase
        .from('merchant_followers')
        .select(
          `
            id,
            source,
            followed_at,
            is_active,
            follower_analytics (
              total_visits,
              total_orders,
              total_spent,
              average_order_value,
              last_visit_at,
              loyalty_points,
              feedback_count,
              average_rating
            )
          `
        )
        .eq('account_id', accountId)
        .eq('merchant_id', merchantId)
        .single(),

      // 3. AI Intelligence
      getCustomerIntelligence(merchantId, accountId),

      // 4. Trigger executions history
      supabase
        .from('ai_customer_trigger_executions')
        .select(
          `
            id,
            trigger_id,
            triggered_at,
            status,
            converted_at,
            conversion_value,
            ai_customer_triggers (
              name,
              trigger_type,
              action_type
            )
          `
        )
        .eq('account_id', accountId)
        .eq('merchant_id', merchantId)
        .order('triggered_at', { ascending: false })
        .limit(20),
    ]);

    // Build response
    const response: CustomerDetailResponse = {
      success: true,
      account: accountResult.data
        ? {
            id: accountResult.data.id,
            email: accountResult.data.email,
            firstName: accountResult.data.first_name,
            lastName: accountResult.data.last_name,
            displayName: accountResult.data.display_name,
            avatarUrl: accountResult.data.avatar_url,
          }
        : null,
      follower: followerResult.data
        ? {
            id: followerResult.data.id,
            source: followerResult.data.source,
            followedAt: followerResult.data.followed_at,
            isActive: followerResult.data.is_active,
            analytics: followerResult.data.follower_analytics
              ? {
                  totalVisits: (followerResult.data.follower_analytics as any).total_visits || 0,
                  totalOrders: (followerResult.data.follower_analytics as any).total_orders || 0,
                  totalSpent: (followerResult.data.follower_analytics as any).total_spent || 0,
                  averageOrderValue:
                    (followerResult.data.follower_analytics as any).average_order_value || 0,
                  lastVisitAt:
                    (followerResult.data.follower_analytics as any).last_visit_at || null,
                  loyaltyPoints:
                    (followerResult.data.follower_analytics as any).loyalty_points || 0,
                  feedbackCount:
                    (followerResult.data.follower_analytics as any).feedback_count || 0,
                  averageRating:
                    (followerResult.data.follower_analytics as any).average_rating || null,
                }
              : null,
          }
        : null,
      intelligence: intelligenceResult
        ? {
            clvEstimated: intelligenceResult.clvEstimated,
            clvConfidence: intelligenceResult.clvConfidence,
            churnRiskScore: intelligenceResult.churnRiskScore,
            churnRiskLevel: intelligenceResult.churnRiskLevel,
            churnFactors: intelligenceResult.churnFactors || [],
            daysSinceLastVisit: intelligenceResult.daysSinceLastVisit,
            segment: intelligenceResult.segment,
            predictedNextVisitAt: intelligenceResult.predictedNextVisitAt,
            recommendedActions: intelligenceResult.recommendedActions || [],
            visitPattern: intelligenceResult.visitPattern || {},
            orderPattern: intelligenceResult.orderPattern || {},
          }
        : null,
      triggerHistory: (triggersResult.data || []).map((exec: any) => ({
        id: exec.id,
        triggerId: exec.trigger_id,
        triggerName: exec.ai_customer_triggers?.name || 'Unknown',
        triggerType: exec.ai_customer_triggers?.trigger_type || 'unknown',
        actionType: exec.ai_customer_triggers?.action_type || 'unknown',
        triggeredAt: exec.triggered_at,
        status: exec.status,
        convertedAt: exec.converted_at,
        conversionValue: exec.conversion_value,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Customer Detail GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
