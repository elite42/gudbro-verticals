import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { subDays, format, eachDayOfInterval } from 'date-fns';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

const VALID_DAYS = [0, 7, 30, 90];

export const GET = withErrorHandling(
  async (request: Request) => {
    // Auth check (same pattern as feedback/tasks/route.ts)
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new AuthenticationError();
    }

    // Parse days query param (default 30)
    const { searchParams } = new URL(request.url);
    const daysParam = parseInt(searchParams.get('days') || '30', 10);
    const days = VALID_DAYS.includes(daysParam) ? daysParam : 30;

    const today = new Date();

    // Build query
    let query = supabaseAdmin
      .from('fb_submissions')
      .select('created_at')
      .order('created_at', { ascending: true });

    // Filter by date range (days=0 means all time)
    if (days > 0) {
      const startDate = subDays(today, days);
      query = query.gte('created_at', startDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      throw new DatabaseError('Failed to fetch volume data', { cause: error });
    }

    // Aggregate: group by date (yyyy-MM-dd)
    const volumeByDay = new Map<string, number>();
    for (const row of data || []) {
      const day = format(new Date(row.created_at), 'yyyy-MM-dd');
      volumeByDay.set(day, (volumeByDay.get(day) || 0) + 1);
    }

    // Fill date gaps: generate full date range, merge with query results
    let volume: Array<{ date: string; count: number }>;

    if (days > 0) {
      const startDate = subDays(today, days);
      const allDays = eachDayOfInterval({ start: startDate, end: today });
      volume = allDays.map((d) => {
        const dateStr = format(d, 'yyyy-MM-dd');
        return { date: dateStr, count: volumeByDay.get(dateStr) || 0 };
      });
    } else if (data && data.length > 0) {
      // All time: fill from earliest submission to today
      const earliest = new Date(data[0].created_at);
      const allDays = eachDayOfInterval({ start: earliest, end: today });
      volume = allDays.map((d) => {
        const dateStr = format(d, 'yyyy-MM-dd');
        return { date: dateStr, count: volumeByDay.get(dateStr) || 0 };
      });
    } else {
      volume = [];
    }

    return successResponse({ volume });
  },
  { context: 'feedback/analytics/volume', logger: backofficeLogger }
);
