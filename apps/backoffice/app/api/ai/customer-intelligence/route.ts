import { NextRequest, NextResponse } from 'next/server';
import {
  getMerchantCustomerIntelligence,
  getCustomersAtRisk,
  getIntelligenceSummary,
  syncFromFollowerAnalytics,
  analyzeAllCustomers,
  type CustomerSegment,
  type ChurnRiskLevel,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/customer-intelligence - Get customer intelligence data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const action = searchParams.get('action') || 'list';

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'summary': {
        const summary = await getIntelligenceSummary(merchantId);
        return NextResponse.json({ success: true, summary });
      }

      case 'at-risk': {
        const riskLevels = searchParams.get('riskLevels');
        const levels = riskLevels
          ? (riskLevels.split(',') as ChurnRiskLevel[])
          : ['high', 'critical'];
        const customers = await getCustomersAtRisk(merchantId, levels as ChurnRiskLevel[]);
        return NextResponse.json({ success: true, customers });
      }

      case 'list':
      default: {
        const segment = searchParams.get('segment') as CustomerSegment | null;
        const churnRiskLevel = searchParams.get('churnRiskLevel') as ChurnRiskLevel | null;
        const minClv = searchParams.get('minClv');
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const result = await getMerchantCustomerIntelligence(merchantId, {
          segment: segment || undefined,
          churnRiskLevel: churnRiskLevel || undefined,
          minClv: minClv ? parseFloat(minClv) : undefined,
          limit: limit ? parseInt(limit, 10) : undefined,
          offset: offset ? parseInt(offset, 10) : undefined,
        });

        return NextResponse.json({
          success: true,
          customers: result.customers,
          total: result.total,
        });
      }
    }
  } catch (error) {
    console.error('Customer Intelligence GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/customer-intelligence - Perform actions on customer intelligence
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'sync': {
        // Sync from follower_analytics
        const synced = await syncFromFollowerAnalytics(merchantId);
        return NextResponse.json({
          success: true,
          message: `Synced ${synced} customer records`,
          synced,
        });
      }

      case 'analyze-all': {
        // Run full analysis for all customers
        const result = await analyzeAllCustomers(merchantId, {
          batchSize: body.batchSize || 50,
        });
        return NextResponse.json({
          success: true,
          message: `Analyzed ${result.analyzed} customers with ${result.errors} errors`,
          ...result,
        });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error('Customer Intelligence POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
