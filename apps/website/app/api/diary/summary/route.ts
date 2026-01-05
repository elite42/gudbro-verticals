import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/diary/summary
 * Get diary summary for a period
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
    const period = searchParams.get('period') || 'week'; // week, month, year
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let queryStartDate: string;
    let queryEndDate: string;

    if (startDate && endDate) {
      queryStartDate = startDate;
      queryEndDate = endDate;
    } else {
      const now = new Date();
      queryEndDate = now.toISOString().split('T')[0];

      switch (period) {
        case 'week': {
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          queryStartDate = weekAgo.toISOString().split('T')[0];
          break;
        }
        case 'month': {
          const monthAgo = new Date(now);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          queryStartDate = monthAgo.toISOString().split('T')[0];
          break;
        }
        case 'year': {
          const yearAgo = new Date(now);
          yearAgo.setFullYear(yearAgo.getFullYear() - 1);
          queryStartDate = yearAgo.toISOString().split('T')[0];
          break;
        }
        default: {
          const defaultWeek = new Date(now);
          defaultWeek.setDate(defaultWeek.getDate() - 7);
          queryStartDate = defaultWeek.toISOString().split('T')[0];
        }
      }
    }

    // Get daily summaries
    const { data: dailySummaries, error } = await supabase
      .from('food_diary_daily_summary')
      .select('*')
      .eq('account_id', account.id)
      .gte('summary_date', queryStartDate)
      .lte('summary_date', queryEndDate)
      .order('summary_date', { ascending: true });

    if (error) {
      console.error('[DiarySummaryAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate period totals
    const totals =
      dailySummaries?.reduce(
        (acc, day) => ({
          totalDays: acc.totalDays + 1,
          totalMeals: acc.totalMeals + (day.meals_count || 0),
          totalCalories: acc.totalCalories + (day.total_calories || 0),
          totalProtein: acc.totalProtein + parseFloat(day.total_protein_g || 0),
          totalCarbs: acc.totalCarbs + parseFloat(day.total_carbs_g || 0),
          totalFat: acc.totalFat + parseFloat(day.total_fat_g || 0),
          totalSpent: acc.totalSpent + parseFloat(day.total_spent || 0),
          totalMerchantsVisited: acc.totalMerchantsVisited + (day.merchants_visited || 0),
          totalHomeMeals: acc.totalHomeMeals + (day.home_meals || 0),
        }),
        {
          totalDays: 0,
          totalMeals: 0,
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
          totalSpent: 0,
          totalMerchantsVisited: 0,
          totalHomeMeals: 0,
        }
      ) || {};

    // Calculate averages
    const daysWithData = totals.totalDays || 1;
    const averages = {
      avgCaloriesPerDay: Math.round(totals.totalCalories / daysWithData),
      avgMealsPerDay: (totals.totalMeals / daysWithData).toFixed(1),
      avgProteinPerDay: (totals.totalProtein / daysWithData).toFixed(1),
      avgCarbsPerDay: (totals.totalCarbs / daysWithData).toFixed(1),
      avgFatPerDay: (totals.totalFat / daysWithData).toFixed(1),
      avgSpentPerDay: (totals.totalSpent / daysWithData).toFixed(2),
    };

    // Get meal type distribution
    const { data: mealDistribution } = await supabase
      .from('food_diary_entries')
      .select('meal_type')
      .eq('account_id', account.id)
      .gte('entry_date', queryStartDate)
      .lte('entry_date', queryEndDate);

    const mealTypes =
      mealDistribution?.reduce((acc: Record<string, number>, entry) => {
        acc[entry.meal_type] = (acc[entry.meal_type] || 0) + 1;
        return acc;
      }, {}) || {};

    // Get top merchants visited
    const { data: topMerchants } = await supabase
      .from('food_diary_entries')
      .select('merchant_id, merchant:merchants(business_name)')
      .eq('account_id', account.id)
      .gte('entry_date', queryStartDate)
      .lte('entry_date', queryEndDate)
      .not('merchant_id', 'is', null);

    const merchantCounts =
      topMerchants?.reduce((acc: Record<string, { count: number; name: string }>, entry) => {
        if (entry.merchant_id) {
          if (!acc[entry.merchant_id]) {
            const merchant = entry.merchant as unknown as
              | { business_name: string }
              | { business_name: string }[]
              | null;
            const businessName = Array.isArray(merchant)
              ? merchant[0]?.business_name
              : merchant?.business_name;
            acc[entry.merchant_id] = {
              count: 0,
              name: businessName || 'Unknown',
            };
          }
          acc[entry.merchant_id].count++;
        }
        return acc;
      }, {}) || {};

    const topMerchantsList = Object.entries(merchantCounts)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      period: {
        startDate: queryStartDate,
        endDate: queryEndDate,
        periodType: period,
      },
      totals,
      averages,
      dailySummaries: dailySummaries || [],
      mealTypeDistribution: mealTypes,
      topMerchants: topMerchantsList,
      insights: {
        homeCookingRatio:
          totals.totalMeals > 0
            ? ((totals.totalHomeMeals / totals.totalMeals) * 100).toFixed(1)
            : 0,
        daysTracked: totals.totalDays,
      },
    });
  } catch (err) {
    console.error('[DiarySummaryAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
