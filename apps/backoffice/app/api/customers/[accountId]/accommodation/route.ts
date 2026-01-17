/**
 * Customer Accommodation API
 *
 * PATCH /api/customers/[accountId]/accommodation
 *
 * Updates tourist accommodation details for a customer.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create admin client for service role operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface AccommodationUpdate {
  merchantId: string;
  visitorType?: 'resident' | 'tourist' | 'unknown';
  hotelName?: string | null;
  hotelPlaceId?: string | null;
  hotelAddress?: string | null;
  hotelLatitude?: number | null;
  hotelLongitude?: number | null;
  roomNumber?: string | null;
  arrivalDate?: string | null;
  departureDate?: string | null;
  lifecycleStatus?: 'active' | 'departed' | 'returning';
  homeCity?: string | null;
  homeCountry?: string | null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const { accountId } = await params;
    const body: AccommodationUpdate = await request.json();

    if (!body.merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    // Build update object, only including provided fields
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.visitorType !== undefined) {
      updateData.visitor_type = body.visitorType;
    }
    if (body.hotelName !== undefined) {
      updateData.hotel_name = body.hotelName;
    }
    if (body.hotelPlaceId !== undefined) {
      updateData.hotel_place_id = body.hotelPlaceId;
    }
    if (body.hotelAddress !== undefined) {
      updateData.hotel_address = body.hotelAddress;
    }
    if (body.hotelLatitude !== undefined) {
      updateData.hotel_latitude = body.hotelLatitude;
    }
    if (body.hotelLongitude !== undefined) {
      updateData.hotel_longitude = body.hotelLongitude;
    }
    if (body.roomNumber !== undefined) {
      updateData.room_number = body.roomNumber;
    }
    if (body.arrivalDate !== undefined) {
      updateData.arrival_date = body.arrivalDate;
    }
    if (body.departureDate !== undefined) {
      updateData.departure_date = body.departureDate;
      // Also update trip_end_date for backwards compatibility
      updateData.trip_end_date = body.departureDate;
    }
    if (body.lifecycleStatus !== undefined) {
      updateData.lifecycle_status = body.lifecycleStatus;
    }
    if (body.homeCity !== undefined) {
      updateData.home_city = body.homeCity;
    }
    if (body.homeCountry !== undefined) {
      updateData.home_country = body.homeCountry;
    }

    // Update the merchant_followers record
    const { data, error } = await supabaseAdmin
      .from('merchant_followers')
      .update(updateData)
      .eq('account_id', accountId)
      .eq('merchant_id', body.merchantId)
      .select()
      .single();

    if (error) {
      console.error('[Accommodation API] Update error:', error);
      return NextResponse.json({ error: 'Failed to update accommodation' }, { status: 500 });
    }

    return NextResponse.json({ success: true, follower: data });
  } catch (error) {
    console.error('[Accommodation API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const { accountId } = await params;
    const merchantId = request.nextUrl.searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('merchant_followers')
      .select(
        `
        visitor_type,
        hotel_name,
        hotel_place_id,
        hotel_address,
        hotel_latitude,
        hotel_longitude,
        room_number,
        arrival_date,
        departure_date,
        lifecycle_status,
        home_city,
        home_country,
        trip_end_date
      `
      )
      .eq('account_id', accountId)
      .eq('merchant_id', merchantId)
      .single();

    if (error) {
      console.error('[Accommodation API] Fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch accommodation' }, { status: 500 });
    }

    return NextResponse.json({
      accommodation: {
        visitorType: data.visitor_type,
        hotelName: data.hotel_name,
        hotelPlaceId: data.hotel_place_id,
        hotelAddress: data.hotel_address,
        hotelLatitude: data.hotel_latitude,
        hotelLongitude: data.hotel_longitude,
        roomNumber: data.room_number,
        arrivalDate: data.arrival_date,
        departureDate: data.departure_date || data.trip_end_date,
        lifecycleStatus: data.lifecycle_status,
        homeCity: data.home_city,
        homeCountry: data.home_country,
      },
    });
  } catch (error) {
    console.error('[Accommodation API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
