import { NextRequest, NextResponse } from 'next/server';
import {
  generateFinancialSummary,
  generateBudgetPlan,
  generateCashFlowForecast,
  getFinancialData,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/finance - Get financial data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const data = await getFinancialData(merchantId);

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('AI Finance GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/finance - Generate financial analysis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'summary': {
        const { period, periodStart, periodEnd } = params;

        if (!period || !periodStart || !periodEnd) {
          return NextResponse.json(
            { error: 'Missing required fields: period, periodStart, periodEnd' },
            { status: 400 }
          );
        }

        const summary = await generateFinancialSummary(merchantId, period, periodStart, periodEnd);

        return NextResponse.json({
          success: true,
          summary,
        });
      }

      case 'budget': {
        const { year, month, totalBudget } = params;

        if (!year || !month || !totalBudget) {
          return NextResponse.json(
            { error: 'Missing required fields: year, month, totalBudget' },
            { status: 400 }
          );
        }

        const budget = await generateBudgetPlan(merchantId, year, month, totalBudget);

        return NextResponse.json({
          success: true,
          budget,
        });
      }

      case 'forecast': {
        const { months } = params;

        const forecast = await generateCashFlowForecast(merchantId, months || 3);

        return NextResponse.json({
          success: true,
          forecast,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: summary, budget, or forecast' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Finance POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
