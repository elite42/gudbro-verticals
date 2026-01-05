import { NextRequest, NextResponse } from 'next/server';
import { generateSuggestions } from '@/lib/ai';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/ai/suggestions - Get pending suggestions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const status = searchParams.get('status') || 'pending';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const { data: suggestions, error } = await supabase
      .from('ai_suggestions')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('status', status)
      .order('priority', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      suggestions: suggestions || [],
      count: suggestions?.length || 0,
    });
  } catch (error) {
    console.error('AI Suggestions GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/suggestions - Generate new suggestions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, locationId } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const suggestions = await generateSuggestions(merchantId, locationId);

    // Save suggestions to database
    if (suggestions.length > 0) {
      await supabase.from('ai_suggestions').insert(
        suggestions.map((s) => ({
          id: s.id,
          merchant_id: merchantId,
          location_id: locationId,
          type: s.type,
          title: s.title,
          description: s.description,
          expected_impact: s.expectedImpact,
          effort: s.effort,
          priority: s.priority,
          status: 'pending',
        }))
      );
    }

    return NextResponse.json({
      success: true,
      suggestions,
      count: suggestions.length,
    });
  } catch (error) {
    console.error('AI Suggestions POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/suggestions - Update suggestion status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { suggestionId, status, feedback } = body;

    if (!suggestionId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: suggestionId, status' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'accepted', 'rejected', 'implemented'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
      reviewed_at: new Date().toISOString(),
    };

    if (feedback) {
      updateData.user_feedback = feedback;
    }

    if (status === 'implemented') {
      updateData.implemented_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('ai_suggestions')
      .update(updateData)
      .eq('id', suggestionId);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: `Suggestion marked as ${status}`,
    });
  } catch (error) {
    console.error('AI Suggestions PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
