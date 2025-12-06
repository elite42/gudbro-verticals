import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;

interface ExchangeRateAPIResponse {
  result: string;
  base_code: string;
  time_last_update_utc: string;
  conversion_rates: Record<string, number>;
}

export async function POST() {
  try {
    // Check if API key is configured
    if (!EXCHANGE_RATE_API_KEY) {
      // Return mock success for demo (uses existing seeded data)
      return NextResponse.json({
        success: true,
        message: 'API key not configured. Using existing rates.',
        source: 'seed_data',
      });
    }

    // Fetch from exchangerate-api.com
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data: ExchangeRateAPIResponse = await response.json();

    if (data.result !== 'success') {
      throw new Error('API returned error');
    }

    // Update Supabase
    const { error } = await supabase
      .from('exchange_rates')
      .upsert({
        base_currency: 'USD',
        rates: data.conversion_rates,
        source: 'exchangerate-api.com',
        fetched_at: new Date().toISOString(),
        currency_count: Object.keys(data.conversion_rates).length,
      }, {
        onConflict: 'base_currency',
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Exchange rates updated successfully',
      source: 'exchangerate-api.com',
      currencies: Object.keys(data.conversion_rates).length,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to refresh exchange rates:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        base_currency: data.base_currency,
        rates: data.rates,
        source: data.source,
        fetched_at: data.fetched_at,
        currency_count: data.currency_count,
      },
    });
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
