import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// ============================================================================
// GET - Fetch aggregated useful numbers for PWA
// ============================================================================
// Returns emergency numbers by country, city numbers, and merchant numbers
// Input: merchantId, countryCode, cityName (optional)
// Output: { emergency: [...], city: [...], merchant: [...] }

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const countryCode = searchParams.get('countryCode');
    const cityName = searchParams.get('cityName');

    if (!merchantId || !countryCode) {
      return NextResponse.json(
        { error: 'merchantId and countryCode are required' },
        { status: 400 }
      );
    }

    // Fetch emergency numbers for country
    const { data: emergency, error: emergencyError } = await supabase
      .from('emergency_numbers')
      .select('*')
      .eq('country_code', countryCode)
      .order('service_type');

    if (emergencyError) {
      console.error('Error fetching emergency numbers:', emergencyError);
      return NextResponse.json({ error: emergencyError.message }, { status: 500 });
    }

    // Fetch city numbers if cityName provided
    let city: unknown[] = [];
    if (cityName) {
      const { data: cityData, error: cityError } = await supabase
        .from('city_useful_numbers')
        .select('*')
        .eq('country_code', countryCode)
        .eq('city_name', cityName)
        .eq('is_active', true)
        .order('sort_order');

      if (cityError) {
        console.error('Error fetching city numbers:', cityError);
      } else {
        city = cityData || [];
      }
    }

    // Fetch merchant numbers
    const { data: merchant, error: merchantError } = await supabase
      .from('merchant_useful_numbers')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('is_active', true)
      .order('sort_order');

    if (merchantError) {
      console.error('Error fetching merchant numbers:', merchantError);
    }

    return NextResponse.json({
      emergency: emergency || [],
      city: city || [],
      merchant: merchant || [],
    });
  } catch (error) {
    console.error('Error in GET /api/useful-numbers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
