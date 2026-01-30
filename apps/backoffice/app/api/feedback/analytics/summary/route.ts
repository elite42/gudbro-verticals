import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { subDays } from 'date-fns';

export const dynamic = 'force-dynamic';

const VALID_DAYS = [0, 7, 30, 90];

export async function GET(request: NextRequest) {
  try {
    // Auth check (same pattern as feedback/tasks/route.ts)
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse days query param (default 30)
    const { searchParams } = new URL(request.url);
    const daysParam = parseInt(searchParams.get('days') || '30', 10);
    const days = VALID_DAYS.includes(daysParam) ? daysParam : 30;

    const startDate = days > 0 ? subDays(new Date(), days).toISOString() : null;

    // Run three parallel queries via Promise.all
    const [submissionsResult, topFeaturesResult, resolvedTasksResult] = await Promise.all([
      // (a) fb_submissions: type, vertical, processing time data
      (() => {
        let query = supabaseAdmin
          .from('fb_submissions')
          .select('created_at, type, vertical, processed_at, status');
        if (startDate) query = query.gte('created_at', startDate);
        return query;
      })(),

      // (b) fb_tasks: top features ranked by submission_count
      supabaseAdmin
        .from('fb_tasks')
        .select('id, title, type, submission_count, priority, status')
        .eq('type', 'feature_request')
        .order('submission_count', { ascending: false })
        .limit(10),

      // (c) fb_tasks: resolved tasks for resolution time calculation
      (() => {
        let query = supabaseAdmin
          .from('fb_tasks')
          .select('created_at, resolved_at')
          .not('resolved_at', 'is', null);
        if (startDate) query = query.gte('created_at', startDate);
        return query;
      })(),
    ]);

    // Check for errors
    if (submissionsResult.error) {
      console.error('Error fetching submissions:', submissionsResult.error);
      return NextResponse.json({ error: submissionsResult.error.message }, { status: 500 });
    }
    if (topFeaturesResult.error) {
      console.error('Error fetching top features:', topFeaturesResult.error);
      return NextResponse.json({ error: topFeaturesResult.error.message }, { status: 500 });
    }
    if (resolvedTasksResult.error) {
      console.error('Error fetching resolved tasks:', resolvedTasksResult.error);
      return NextResponse.json({ error: resolvedTasksResult.error.message }, { status: 500 });
    }

    const submissions = submissionsResult.data || [];
    const topFeatures = topFeaturesResult.data || [];
    const resolvedTasks = resolvedTasksResult.data || [];

    // Aggregate by type
    const typeMap = new Map<string, number>();
    for (const sub of submissions) {
      const type = sub.type || 'unclassified';
      typeMap.set(type, (typeMap.get(type) || 0) + 1);
    }
    const byType = Array.from(typeMap.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    // Aggregate by vertical
    const verticalMap = new Map<string, number>();
    for (const sub of submissions) {
      const vertical = sub.vertical || 'unknown';
      verticalMap.set(vertical, (verticalMap.get(vertical) || 0) + 1);
    }
    const byVertical = Array.from(verticalMap.entries())
      .map(([vertical, count]) => ({ vertical, count }))
      .sort((a, b) => b.count - a.count);

    // Average processing time (processed_at - created_at) in hours
    let avgProcessingHours: number | null = null;
    const processedSubmissions = submissions.filter((s) => s.processed_at);
    if (processedSubmissions.length > 0) {
      const totalHours = processedSubmissions.reduce((sum, s) => {
        const created = new Date(s.created_at).getTime();
        const processed = new Date(s.processed_at).getTime();
        return sum + (processed - created) / (1000 * 60 * 60);
      }, 0);
      avgProcessingHours = Math.round((totalHours / processedSubmissions.length) * 10) / 10;
    }

    // Average resolution time (resolved_at - created_at) in hours
    let avgResolutionHours: number | null = null;
    if (resolvedTasks.length > 0) {
      const totalHours = resolvedTasks.reduce((sum, t) => {
        const created = new Date(t.created_at).getTime();
        const resolved = new Date(t.resolved_at).getTime();
        return sum + (resolved - created) / (1000 * 60 * 60);
      }, 0);
      avgResolutionHours = Math.round((totalHours / resolvedTasks.length) * 10) / 10;
    }

    return NextResponse.json({
      totalSubmissions: submissions.length,
      byType,
      byVertical,
      topFeatures,
      avgProcessingHours,
      avgResolutionHours,
    });
  } catch (error) {
    console.error('Error in GET /api/feedback/analytics/summary:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
