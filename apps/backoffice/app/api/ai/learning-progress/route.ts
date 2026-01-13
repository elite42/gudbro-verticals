import { NextRequest, NextResponse } from 'next/server';
import {
  getLearningProgress,
  recalculateLearningProgress,
  setAutonomyOverride,
  getMilestones,
} from '@/lib/ai/learning-progress-service';

export const dynamic = 'force-dynamic';

// GET /api/ai/learning-progress - Get learning progress and milestones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const includeHistory = searchParams.get('history') === 'true';

    if (!locationId) {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }

    // Get current progress
    const progress = await getLearningProgress(locationId);

    if (!progress) {
      return NextResponse.json({ error: 'Learning progress not found' }, { status: 404 });
    }

    // Get recent milestones
    const milestones = await getMilestones(locationId, 10);

    return NextResponse.json({
      progress,
      milestones,
    });
  } catch (error) {
    console.error('Learning progress API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/learning-progress - Recalculate or override progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { locationId, action, autonomyLevel } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }

    // Action: recalculate
    if (action === 'recalculate') {
      const newProgress = await recalculateLearningProgress(locationId);
      return NextResponse.json({
        success: true,
        message: 'Learning progress recalculated',
        progress: newProgress,
      });
    }

    // Action: override autonomy level
    if (action === 'override' && autonomyLevel !== undefined) {
      if (![1, 2, 3, 4, null].includes(autonomyLevel)) {
        return NextResponse.json(
          { error: 'Invalid autonomy level. Must be 1, 2, 3, 4, or null to clear' },
          { status: 400 }
        );
      }
      await setAutonomyOverride(locationId, autonomyLevel);
      return NextResponse.json({
        success: true,
        message: autonomyLevel
          ? `Autonomy level overridden to ${autonomyLevel}`
          : 'Autonomy override cleared',
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "recalculate" or "override"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Learning progress update error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
