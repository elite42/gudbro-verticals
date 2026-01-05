import { NextRequest, NextResponse } from 'next/server';
import {
  generatePost,
  generateContentCalendar,
  generateCaptionVariations,
  getPosts,
  getContentCalendars,
  updatePostStatus,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/social - Get posts and calendars
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const type = searchParams.get('type') || 'posts'; // posts or calendars
    const status = searchParams.get('status') as any;
    const platform = searchParams.get('platform') as any;
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    if (type === 'calendars') {
      const calendars = await getContentCalendars(merchantId, limit);
      return NextResponse.json({
        success: true,
        calendars,
        count: calendars.length,
      });
    }

    const posts = await getPosts(merchantId, { status, platform, limit });
    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('AI Social GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/social - Generate content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'post': {
        const { platform, contentType, topic, style, menuItem, event } = params;

        if (!platform || !contentType || !topic) {
          return NextResponse.json(
            { error: 'Missing required fields: platform, contentType, topic' },
            { status: 400 }
          );
        }

        const post = await generatePost(merchantId, {
          platform,
          contentType,
          topic,
          style,
          menuItem,
          event,
        });

        return NextResponse.json({
          success: true,
          post,
        });
      }

      case 'calendar': {
        const { weekStart, platforms, postsPerWeek, focusAreas } = params;

        if (!weekStart || !platforms || !postsPerWeek) {
          return NextResponse.json(
            { error: 'Missing required fields: weekStart, platforms, postsPerWeek' },
            { status: 400 }
          );
        }

        const calendar = await generateContentCalendar(merchantId, {
          weekStart,
          platforms,
          postsPerWeek,
          focusAreas,
        });

        return NextResponse.json({
          success: true,
          calendar,
        });
      }

      case 'captions': {
        const { topic, platform, numberOfVariations, style } = params;

        if (!topic || !platform) {
          return NextResponse.json(
            { error: 'Missing required fields: topic, platform' },
            { status: 400 }
          );
        }

        const captions = await generateCaptionVariations(merchantId, {
          topic,
          platform,
          numberOfVariations: numberOfVariations || 3,
          style,
        });

        return NextResponse.json({
          success: true,
          captions,
          count: captions.length,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: post, calendar, or captions' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Social POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/social - Update post status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, status, scheduledFor } = body;

    if (!postId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: postId, status' },
        { status: 400 }
      );
    }

    await updatePostStatus(postId, status, scheduledFor);

    return NextResponse.json({
      success: true,
      message: `Post status updated to ${status}`,
    });
  } catch (error) {
    console.error('AI Social PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
