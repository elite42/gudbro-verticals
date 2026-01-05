// AI Financial Management Service
// Phase 9: P&L analysis, revenue tracking, cost management, budgeting

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export interface FinancialSummary {
  id: string;
  merchantId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  periodStart: string;
  periodEnd: string;

  // Revenue
  revenue: {
    total: number;
    byCategory: Record<string, number>;
    orderCount: number;
    averageOrderValue: number;
  };

  // Costs
  costs: {
    total: number;
    labor: number;
    ingredients: number;
    utilities: number;
    rent: number;
    marketing: number;
    other: number;
  };

  // P&L
  grossProfit: number;
  grossMargin: number;
  netProfit: number;
  netMargin: number;

  // Comparisons
  vsLastPeriod?: {
    revenueChange: number;
    costChange: number;
    profitChange: number;
  };

  createdAt: string;
}

export interface BudgetPlan {
  id: string;
  merchantId: string;
  year: number;
  month: number;

  // Budget allocations
  budgets: {
    category: string;
    planned: number;
    actual: number;
    variance: number;
    variancePercent: number;
  }[];

  // Totals
  totalBudget: number;
  totalSpent: number;
  remaining: number;

  // AI insights
  insights: string[];
  recommendations: string[];

  createdAt: string;
  updatedAt: string;
}

export interface CashFlowForecast {
  id: string;
  merchantId: string;
  forecastPeriod: string; // e.g., "2024-Q1"

  // Projections
  projectedRevenue: number;
  projectedCosts: number;
  projectedProfit: number;

  // Weekly breakdown
  weeklyProjections: {
    week: number;
    startDate: string;
    revenue: number;
    costs: number;
    netCash: number;
  }[];

  // Risk factors
  risks: {
    factor: string;
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
  }[];

  // Confidence
  confidence: number; // 0-100
  assumptions: string[];

  createdAt: string;
}

// Generate financial summary
export async function generateFinancialSummary(
  merchantId: string,
  period: FinancialSummary['period'],
  periodStart: string,
  periodEnd: string
): Promise<FinancialSummary> {
  // In production, this would aggregate real data from orders/expenses tables
  // For now, we'll use AI to simulate based on context

  const openai = getOpenAIClient();

  // Get merchant info
  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  // Check for existing analytics data
  const { data: analytics } = await supabase
    .from('analytics_daily_aggregates')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('date', periodStart)
    .lte('date', periodEnd);

  const hasRealData = analytics && analytics.length > 0;

  let summary: FinancialSummary;

  if (hasRealData) {
    // Aggregate real data
    const totalRevenue = analytics.reduce((sum, a) => sum + (a.total_revenue || 0), 0);
    const orderCount = analytics.reduce((sum, a) => sum + (a.order_count || 0), 0);

    summary = {
      id: crypto.randomUUID(),
      merchantId,
      period,
      periodStart,
      periodEnd,
      revenue: {
        total: totalRevenue,
        byCategory: {},
        orderCount,
        averageOrderValue: orderCount > 0 ? totalRevenue / orderCount : 0,
      },
      costs: {
        total: totalRevenue * 0.65, // Estimated 65% cost ratio
        labor: totalRevenue * 0.3,
        ingredients: totalRevenue * 0.25,
        utilities: totalRevenue * 0.05,
        rent: totalRevenue * 0.03,
        marketing: totalRevenue * 0.02,
        other: 0,
      },
      grossProfit: totalRevenue * 0.35,
      grossMargin: 35,
      netProfit: totalRevenue * 0.1,
      netMargin: 10,
      createdAt: new Date().toISOString(),
    };
  } else {
    // Generate simulated data with AI context
    const prompt = `Generate realistic financial data for a ${merchant?.business_type || 'restaurant'} named "${merchant?.name || 'Restaurant'}" for the period ${periodStart} to ${periodEnd}.

Respond with JSON:
{
  "revenue": {
    "total": 25000,
    "byCategory": {"food": 18000, "drinks": 5000, "other": 2000},
    "orderCount": 850,
    "averageOrderValue": 29.41
  },
  "costs": {
    "labor": 8000,
    "ingredients": 7500,
    "utilities": 1200,
    "rent": 3000,
    "marketing": 800,
    "other": 500
  }
}

Use realistic numbers for a small-medium restaurant.`;

    try {
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a restaurant financial analyst. Respond with valid JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 400,
      });

      const responseText = completion.choices[0]?.message?.content || '{}';
      let parsed;
      try {
        const cleanJson = responseText
          .replace(/```json?\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        parsed = JSON.parse(cleanJson);
      } catch {
        parsed = {
          revenue: { total: 25000, byCategory: {}, orderCount: 850, averageOrderValue: 29.41 },
          costs: {
            labor: 8000,
            ingredients: 7500,
            utilities: 1200,
            rent: 3000,
            marketing: 800,
            other: 500,
          },
        };
      }

      const totalCosts = Object.values(parsed.costs || {}).reduce(
        (sum: number, val: any) => sum + (val || 0),
        0
      );
      const grossProfit = parsed.revenue.total - totalCosts;

      summary = {
        id: crypto.randomUUID(),
        merchantId,
        period,
        periodStart,
        periodEnd,
        revenue: {
          total: parsed.revenue?.total || 0,
          byCategory: parsed.revenue?.byCategory || {},
          orderCount: parsed.revenue?.orderCount || 0,
          averageOrderValue: parsed.revenue?.averageOrderValue || 0,
        },
        costs: {
          total: totalCosts,
          labor: parsed.costs?.labor || 0,
          ingredients: parsed.costs?.ingredients || 0,
          utilities: parsed.costs?.utilities || 0,
          rent: parsed.costs?.rent || 0,
          marketing: parsed.costs?.marketing || 0,
          other: parsed.costs?.other || 0,
        },
        grossProfit,
        grossMargin: parsed.revenue?.total ? (grossProfit / parsed.revenue.total) * 100 : 0,
        netProfit: grossProfit * 0.7, // After taxes, etc.
        netMargin: parsed.revenue?.total ? ((grossProfit * 0.7) / parsed.revenue.total) * 100 : 0,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Financial summary generation failed:', error);
      throw error;
    }
  }

  // Save to database
  await supabase.from('ai_financial_summaries').insert({
    id: summary.id,
    merchant_id: summary.merchantId,
    period: summary.period,
    period_start: summary.periodStart,
    period_end: summary.periodEnd,
    revenue: summary.revenue,
    costs: summary.costs,
    gross_profit: summary.grossProfit,
    gross_margin: summary.grossMargin,
    net_profit: summary.netProfit,
    net_margin: summary.netMargin,
    vs_last_period: summary.vsLastPeriod,
    created_at: summary.createdAt,
  });

  return summary;
}

// Generate budget plan with AI recommendations
export async function generateBudgetPlan(
  merchantId: string,
  year: number,
  month: number,
  totalBudget: number
): Promise<BudgetPlan> {
  const openai = getOpenAIClient();

  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  const prompt = `Create a monthly budget allocation for a ${merchant?.business_type || 'restaurant'} with a total budget of $${totalBudget} for ${year}-${month.toString().padStart(2, '0')}.

Respond with JSON:
{
  "allocations": [
    {"category": "Labor", "percentage": 30, "amount": ${totalBudget * 0.3}},
    {"category": "Food & Ingredients", "percentage": 25, "amount": ${totalBudget * 0.25}},
    ...
  ],
  "insights": ["Key insight 1", "Key insight 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}

Include typical restaurant expense categories.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a restaurant financial planner. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 600,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { allocations: [], insights: [], recommendations: [] };
    }

    const plan: BudgetPlan = {
      id: crypto.randomUUID(),
      merchantId,
      year,
      month,
      budgets: (parsed.allocations || []).map((a: any) => ({
        category: a.category || 'Other',
        planned: a.amount || 0,
        actual: 0,
        variance: a.amount || 0,
        variancePercent: 100,
      })),
      totalBudget,
      totalSpent: 0,
      remaining: totalBudget,
      insights: parsed.insights || [],
      recommendations: parsed.recommendations || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to database
    await supabase.from('ai_budget_plans').insert({
      id: plan.id,
      merchant_id: plan.merchantId,
      year: plan.year,
      month: plan.month,
      budgets: plan.budgets,
      total_budget: plan.totalBudget,
      total_spent: plan.totalSpent,
      remaining: plan.remaining,
      insights: plan.insights,
      recommendations: plan.recommendations,
      created_at: plan.createdAt,
      updated_at: plan.updatedAt,
    });

    return plan;
  } catch (error) {
    console.error('Budget plan generation failed:', error);
    throw error;
  }
}

// Generate cash flow forecast
export async function generateCashFlowForecast(
  merchantId: string,
  forecastMonths: number = 3
): Promise<CashFlowForecast> {
  const openai = getOpenAIClient();

  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  // Get recent financial data
  const { data: recentSummaries } = await supabase
    .from('ai_financial_summaries')
    .select('revenue, costs')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(3);

  const avgRevenue = recentSummaries?.length
    ? recentSummaries.reduce((sum, s) => sum + (s.revenue?.total || 0), 0) / recentSummaries.length
    : 25000;

  const avgCosts = recentSummaries?.length
    ? recentSummaries.reduce((sum, s) => sum + (s.costs?.total || 0), 0) / recentSummaries.length
    : 17500;

  const prompt = `Create a ${forecastMonths}-month cash flow forecast for a ${merchant?.business_type || 'restaurant'} with:
- Average monthly revenue: $${avgRevenue.toFixed(0)}
- Average monthly costs: $${avgCosts.toFixed(0)}

Respond with JSON:
{
  "projectedRevenue": ${avgRevenue * forecastMonths},
  "projectedCosts": ${avgCosts * forecastMonths},
  "weeklyProjections": [
    {"week": 1, "revenue": 6000, "costs": 4200, "netCash": 1800}
  ],
  "risks": [
    {"factor": "Seasonal slowdown", "impact": "medium", "mitigation": "Increase marketing"}
  ],
  "confidence": 75,
  "assumptions": ["Stable customer base", "No major price changes"]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a financial forecasting analyst. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = {};
    }

    const now = new Date();
    const forecastPeriod = `${now.getFullYear()}-Q${Math.ceil((now.getMonth() + 1) / 3)}`;

    const forecast: CashFlowForecast = {
      id: crypto.randomUUID(),
      merchantId,
      forecastPeriod,
      projectedRevenue: parsed.projectedRevenue || avgRevenue * forecastMonths,
      projectedCosts: parsed.projectedCosts || avgCosts * forecastMonths,
      projectedProfit:
        (parsed.projectedRevenue || avgRevenue * forecastMonths) -
        (parsed.projectedCosts || avgCosts * forecastMonths),
      weeklyProjections: (parsed.weeklyProjections || []).map((w: any, i: number) => ({
        week: i + 1,
        startDate: new Date(now.getTime() + i * 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        revenue: w.revenue || avgRevenue / 4,
        costs: w.costs || avgCosts / 4,
        netCash: (w.revenue || avgRevenue / 4) - (w.costs || avgCosts / 4),
      })),
      risks: (parsed.risks || []).map((r: any) => ({
        factor: r.factor || 'Unknown',
        impact: r.impact || 'medium',
        mitigation: r.mitigation || 'Monitor closely',
      })),
      confidence: parsed.confidence || 70,
      assumptions: parsed.assumptions || [],
      createdAt: new Date().toISOString(),
    };

    // Save to database
    await supabase.from('ai_cash_flow_forecasts').insert({
      id: forecast.id,
      merchant_id: forecast.merchantId,
      forecast_period: forecast.forecastPeriod,
      projected_revenue: forecast.projectedRevenue,
      projected_costs: forecast.projectedCosts,
      projected_profit: forecast.projectedProfit,
      weekly_projections: forecast.weeklyProjections,
      risks: forecast.risks,
      confidence: forecast.confidence,
      assumptions: forecast.assumptions,
      created_at: forecast.createdAt,
    });

    return forecast;
  } catch (error) {
    console.error('Cash flow forecast failed:', error);
    throw error;
  }
}

// Get financial data for a merchant
export async function getFinancialData(merchantId: string): Promise<{
  summaries: FinancialSummary[];
  budgets: BudgetPlan[];
  forecasts: CashFlowForecast[];
}> {
  const [summaryData, budgetData, forecastData] = await Promise.all([
    supabase
      .from('ai_financial_summaries')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false })
      .limit(12),
    supabase
      .from('ai_budget_plans')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('year', { ascending: false })
      .order('month', { ascending: false })
      .limit(6),
    supabase
      .from('ai_cash_flow_forecasts')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false })
      .limit(4),
  ]);

  return {
    summaries: (summaryData.data || []).map((s) => ({
      id: s.id,
      merchantId: s.merchant_id,
      period: s.period,
      periodStart: s.period_start,
      periodEnd: s.period_end,
      revenue: s.revenue,
      costs: s.costs,
      grossProfit: s.gross_profit,
      grossMargin: s.gross_margin,
      netProfit: s.net_profit,
      netMargin: s.net_margin,
      vsLastPeriod: s.vs_last_period,
      createdAt: s.created_at,
    })),
    budgets: (budgetData.data || []).map((b) => ({
      id: b.id,
      merchantId: b.merchant_id,
      year: b.year,
      month: b.month,
      budgets: b.budgets,
      totalBudget: b.total_budget,
      totalSpent: b.total_spent,
      remaining: b.remaining,
      insights: b.insights,
      recommendations: b.recommendations,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    })),
    forecasts: (forecastData.data || []).map((f) => ({
      id: f.id,
      merchantId: f.merchant_id,
      forecastPeriod: f.forecast_period,
      projectedRevenue: f.projected_revenue,
      projectedCosts: f.projected_costs,
      projectedProfit: f.projected_profit,
      weeklyProjections: f.weekly_projections,
      risks: f.risks,
      confidence: f.confidence,
      assumptions: f.assumptions,
      createdAt: f.created_at,
    })),
  };
}
