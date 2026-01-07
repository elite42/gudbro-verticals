import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Merchant ID for ROOTS My Khe - in production this would come from config/auth
const MERCHANT_ID = '00000000-0000-0000-0000-000000000001';

interface FeedbackRatings {
  service: number;
  ambiance: number;
  foodBeverage: number;
}

interface FeedbackData {
  ratings: FeedbackRatings;
  averageRating: number;
  feedbackType: 'feedback' | 'suggestion' | 'request';
  feedbackText: string;
  discrepancyCategory: string | null;
  userId: string;
  sessionId?: string;
}

// POST /api/feedback - Submit customer feedback
export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json();
    const {
      ratings,
      averageRating,
      feedbackType,
      feedbackText,
      discrepancyCategory,
      userId,
      sessionId,
    } = body;

    // Validation
    if (!feedbackType) {
      return NextResponse.json({ error: 'feedbackType is required' }, { status: 400 });
    }

    // Map feedbackType to category
    const categoryMap: Record<string, string> = {
      feedback: 'general',
      suggestion: 'suggestion',
      request: 'feature_request',
    };

    // Determine type based on feedbackType and ratings
    const typeMap: Record<string, string> = {
      feedback: averageRating >= 4 ? 'compliment' : averageRating <= 2 ? 'complaint' : 'review',
      suggestion: 'suggestion',
      request: 'suggestion',
    };

    const feedbackRecord = {
      merchant_id: MERCHANT_ID,
      session_id: sessionId || userId || null,
      type: typeMap[feedbackType] || 'review',
      category: categoryMap[feedbackType] || 'general',
      rating: Math.round(averageRating),
      title: discrepancyCategory
        ? `${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}: ${discrepancyCategory}`
        : `Customer ${feedbackType}`,
      message: feedbackText || null,
      attachments: ratings
        ? {
            detailed_ratings: {
              service: ratings.service,
              ambiance: ratings.ambiance,
              food_beverage: ratings.foodBeverage,
            },
            discrepancy_category: discrepancyCategory,
          }
        : null,
      status: 'new',
      is_public: feedbackType === 'feedback' && averageRating >= 4, // Auto-publish positive reviews
      is_featured: false,
      device_type: 'pwa',
      app_version: '1.0.0',
    };

    const { data: feedback, error } = await supabase
      .from('customer_feedback')
      .insert(feedbackRecord)
      .select('id')
      .single();

    if (error) {
      console.error('Feedback insert error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      feedbackId: feedback.id,
      message: 'Grazie per il tuo feedback!',
    });
  } catch (error) {
    console.error('Feedback POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/feedback - Get feedback for display (public reviews)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const onlyPublic = searchParams.get('public') !== 'false';

    let query = supabase
      .from('customer_feedback')
      .select('id, rating, title, message, created_at, is_featured')
      .eq('merchant_id', MERCHANT_ID)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (onlyPublic) {
      query = query.eq('is_public', true);
    }

    const { data: feedbacks, error } = await query;

    if (error) {
      console.error('Feedback GET error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      feedbacks: feedbacks || [],
      count: feedbacks?.length || 0,
    });
  } catch (error) {
    console.error('Feedback GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
