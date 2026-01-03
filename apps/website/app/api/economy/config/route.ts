import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/economy/config
 * Get public points economy configuration
 */
export async function GET() {
  try {
    const { data: configs, error } = await supabase
      .from('points_economy_config')
      .select('config_key, config_value, description')
      .eq('is_active', true);

    if (error) {
      console.error('[EconomyConfigAPI] Error:', error);
      // Return defaults if table doesn't exist yet
      return NextResponse.json({
        pointValue: { value: 0.01, currency: 'EUR' },
        expiryMonths: 24,
        maxDepositPerTransaction: 200,
        maxDepositPerDay: 500,
        isClosedLoop: true,
        cashOutAllowed: false,
      });
    }

    // Convert to object
    const configMap: Record<string, unknown> = {};
    configs?.forEach((c) => {
      configMap[c.config_key] = c.config_value;
    });

    // Extract public-facing config
    const pointValue = (configMap['point_value_eur'] as { value: number; currency: string }) || {
      value: 0.01,
      currency: 'EUR',
    };
    const expiryPolicy = (configMap['expiry_policy'] as { months_to_expire: number }) || {
      months_to_expire: 24,
    };
    const antiAbuse = (configMap['anti_abuse'] as {
      max_deposit_per_transaction: number;
      max_deposit_per_day: number;
    }) || { max_deposit_per_transaction: 200, max_deposit_per_day: 500 };
    const compliance = (configMap['compliance'] as {
      is_closed_loop: boolean;
      cash_out_allowed: boolean;
    }) || { is_closed_loop: true, cash_out_allowed: false };

    return NextResponse.json({
      pointValue: {
        value: pointValue.value,
        currency: pointValue.currency,
        pointsPerEuro: Math.floor(1 / pointValue.value),
      },
      expiryMonths: expiryPolicy.months_to_expire,
      maxDepositPerTransaction: antiAbuse.max_deposit_per_transaction,
      maxDepositPerDay: antiAbuse.max_deposit_per_day,
      isClosedLoop: compliance.is_closed_loop,
      cashOutAllowed: compliance.cash_out_allowed,
      // Helpful info for UI
      depositOptions: [5, 10, 20, 50, 100, 200].filter(
        (v) => v <= antiAbuse.max_deposit_per_transaction
      ),
    });
  } catch (err) {
    console.error('[EconomyConfigAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
