import { NextRequest, NextResponse } from 'next/server';
import {
  collectFeedback,
  getMerchantFeedback,
  getAllFeedback,
  updateFeedbackStatus,
  getFeedbackStats,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/feedback - Get feedback (merchant's own or all for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const isAdmin = searchParams.get('admin') === 'true';
    const status = searchParams.get('status') as any;
    const type = searchParams.get('type') as any;
    const category = searchParams.get('category') as any;
    const limit = parseInt(searchParams.get('limit') || '20');

    if (isAdmin) {
      // Admin view - all feedback
      const { feedback, total } = await getAllFeedback({
        status,
        type,
        category,
        limit,
      });

      const stats = await getFeedbackStats();

      return NextResponse.json({
        success: true,
        feedback,
        total,
        stats,
      });
    }

    // Merchant view - their own feedback
    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const feedback = await getMerchantFeedback(merchantId, { status, limit });

    return NextResponse.json({
      success: true,
      feedback,
      count: feedback.length,
    });
  } catch (error) {
    console.error('AI Feedback GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/feedback - Submit new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      merchantId,
      accountId,
      type,
      category,
      subject,
      description,
      sessionId,
      screenshotUrl,
      metadata,
    } = body;

    // Validate required fields
    if (!merchantId || !accountId || !type || !category || !subject || !description) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: merchantId, accountId, type, category, subject, description',
        },
        { status: 400 }
      );
    }

    const feedback = await collectFeedback(merchantId, accountId, {
      type,
      category,
      subject,
      description,
      sessionId,
      screenshotUrl,
      metadata,
    });

    return NextResponse.json({
      success: true,
      feedback,
      message: 'Thank you for your feedback! Our team will review it shortly.',
    });
  } catch (error) {
    console.error('AI Feedback POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/feedback - Update feedback status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { feedbackId, status, assignedTo, resolution } = body;

    if (!feedbackId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: feedbackId, status' },
        { status: 400 }
      );
    }

    await updateFeedbackStatus(feedbackId, {
      status,
      assignedTo,
      resolution,
    });

    return NextResponse.json({
      success: true,
      message: `Feedback status updated to ${status}`,
    });
  } catch (error) {
    console.error('AI Feedback PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
