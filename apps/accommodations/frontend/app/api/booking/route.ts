import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays, parseISO, addHours, isBefore, startOfDay } from 'date-fns';
import { getSupabaseAdmin } from '@/lib/supabase';
import { signGuestToken } from '@/lib/auth';
import { calculatePriceBreakdown } from '@/lib/price-utils';
import type {
  ApiResponse,
  BookingResponse,
  BookingSubmission,
  AccomPaymentMethod,
  PropertyApiError,
} from '@/types/property';

export const dynamic = 'force-dynamic';

/**
 * POST /api/booking
 *
 * Booking submission endpoint. Validates input, calculates pricing
 * server-side (authoritative), inserts booking, and returns JWT.
 *
 * Double-booking prevention is handled by the DB exclusion constraint
 * (migration 083). We catch PostgreSQL error 23P01 (exclusion_violation).
 *
 * Booking mode:
 * - instant: status = 'confirmed' immediately
 * - inquiry: status = 'pending' with expires_at deadline
 */
export async function POST(request: NextRequest) {
  try {
    let body: BookingSubmission;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse<null>>({ error: 'validation_error' }, { status: 400 });
    }

    // Validate required fields
    const {
      propertySlug,
      roomId,
      firstName,
      lastName,
      email,
      phone,
      guestCount,
      checkIn,
      checkOut,
    } = body;
    if (
      !propertySlug ||
      !roomId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !guestCount ||
      !checkIn ||
      !checkOut
    ) {
      return NextResponse.json<ApiResponse<null>>({ error: 'validation_error' }, { status: 400 });
    }

    // Validate dates
    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);
    const today = startOfDay(new Date());

    if (isBefore(checkInDate, today)) {
      return NextResponse.json<ApiResponse<null>>({ error: 'invalid_dates' }, { status: 400 });
    }

    if (!isBefore(checkInDate, checkOutDate)) {
      return NextResponse.json<ApiResponse<null>>({ error: 'invalid_dates' }, { status: 400 });
    }

    const nights = differenceInDays(checkOutDate, checkInDate);

    const supabase = getSupabaseAdmin();

    // Fetch property (including payment config)
    const { data: property, error: propError } = await supabase
      .from('accom_properties')
      .select(
        'id, name, booking_mode, min_nights, max_nights, cleaning_fee, weekly_discount_percent, monthly_discount_percent, inquiry_timeout_hours, contact_phone, contact_whatsapp, deposit_percent, bank_transfer_info, crypto_wallets, accepted_payment_methods, stripe_account_id'
      )
      .eq('slug', propertySlug)
      .eq('is_active', true)
      .single();

    if (propError || !property) {
      return NextResponse.json<ApiResponse<null>>({ error: 'property_not_found' }, { status: 404 });
    }

    if (property.booking_mode === 'disabled') {
      return NextResponse.json<ApiResponse<null>>({ error: 'property_disabled' }, { status: 403 });
    }

    // Validate min/max nights
    if (nights < property.min_nights) {
      return NextResponse.json<ApiResponse<null>>({ error: 'min_nights_not_met' }, { status: 400 });
    }
    if (property.max_nights && nights > property.max_nights) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'max_nights_exceeded' },
        { status: 400 }
      );
    }

    // Fetch room
    const { data: room, error: roomError } = await supabase
      .from('accom_rooms')
      .select('id, base_price_per_night, currency, capacity')
      .eq('id', roomId)
      .eq('property_id', property.id)
      .eq('is_active', true)
      .single();

    if (roomError || !room) {
      return NextResponse.json<ApiResponse<null>>({ error: 'room_not_found' }, { status: 404 });
    }

    // Validate guest count
    if (guestCount > room.capacity) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'max_guests_exceeded' },
        { status: 400 }
      );
    }

    // Calculate price (server-authoritative)
    const priceBreakdown = calculatePriceBreakdown(
      room.base_price_per_night,
      checkInDate,
      checkOutDate,
      property.cleaning_fee || 0,
      property.weekly_discount_percent || 0,
      property.monthly_discount_percent || 0,
      room.currency
    );

    // --- Voucher validation (server-authoritative re-validation) ---
    let voucherDiscount = 0;
    let voucherResult: {
      convention_id: string;
      voucher_id: string;
      discount_amount: number;
      benefit_type: string;
      benefit_value: number;
      benefit_scope: string;
      partner_name: string;
      convention_name: string;
    } | null = null;

    if (body.voucherCode) {
      const { data: voucherData, error: voucherError } = await supabase.rpc(
        'validate_accommodation_voucher',
        {
          p_voucher_code: body.voucherCode.trim().toUpperCase(),
          p_property_id: property.id,
          p_num_nights: nights,
          p_subtotal: priceBreakdown.subtotal,
        }
      );

      if (voucherError) {
        console.error('Voucher re-validation RPC error:', voucherError);
        return NextResponse.json<ApiResponse<null>>(
          { error: 'invalid_voucher' as PropertyApiError },
          { status: 400 }
        );
      }

      const row = Array.isArray(voucherData) ? voucherData[0] : voucherData;

      if (!row || !row.is_valid) {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'invalid_voucher' as PropertyApiError },
          { status: 400 }
        );
      }

      voucherDiscount = row.discount_amount || 0;
      voucherResult = {
        convention_id: row.convention_id,
        voucher_id: row.voucher_id,
        discount_amount: row.discount_amount,
        benefit_type: row.benefit_type,
        benefit_value: Number(row.benefit_value),
        benefit_scope: row.benefit_scope,
        partner_name: row.partner_name,
        convention_name: row.convention_name,
      };

      // Apply voucher discount to price breakdown
      priceBreakdown.voucherDiscount = voucherDiscount;
      priceBreakdown.voucherLabel = `${row.partner_name} - ${row.convention_name}`;
      priceBreakdown.totalPrice = Math.max(0, priceBreakdown.totalPrice - voucherDiscount);
    }

    // --- Payment method validation ---
    const acceptedMethods: string[] = property.accepted_payment_methods || [];
    let paymentMethod: AccomPaymentMethod | null = body.paymentMethod || null;

    if (paymentMethod && acceptedMethods.length > 0 && !acceptedMethods.includes(paymentMethod)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'payment_method_not_accepted' },
        { status: 400 }
      );
    }

    // Default to first accepted method if none provided (backward compat)
    if (!paymentMethod && acceptedMethods.length > 0) {
      paymentMethod = acceptedMethods[0] as AccomPaymentMethod;
    }

    // --- Deposit calculation ---
    const depositPercent = property.deposit_percent ?? 100;
    const depositAmount = Math.round(priceBreakdown.totalPrice * (depositPercent / 100));

    // --- Determine booking status based on payment method ---
    let status: 'confirmed' | 'pending' | 'pending_payment';
    if (
      paymentMethod === 'bank_transfer' ||
      paymentMethod === 'crypto' ||
      paymentMethod === 'card'
    ) {
      status = 'pending_payment';
    } else if (paymentMethod === 'cash') {
      // Cash follows existing booking mode logic
      status = property.booking_mode === 'instant' ? 'confirmed' : 'pending';
    } else {
      // No payment method (legacy) -- use booking mode
      status = property.booking_mode === 'instant' ? 'confirmed' : 'pending';
    }

    const expiresAt =
      status === 'pending' ? addHours(new Date(), property.inquiry_timeout_hours || 24) : null;

    // Insert booking -- let DB exclusion constraint handle double-booking
    const { data: booking, error: insertError } = await supabase
      .from('accom_bookings')
      .insert({
        property_id: property.id,
        room_id: roomId,
        guest_name: firstName,
        guest_last_name: lastName,
        guest_email: email,
        guest_phone: phone,
        guest_count: guestCount,
        check_in_date: checkIn,
        check_out_date: checkOut,
        guest_country: body.guestCountry || null,
        special_requests: body.specialRequests || null,
        status,
        booking_source: 'direct',
        price_per_night: priceBreakdown.pricePerNight,
        num_nights: priceBreakdown.nights,
        subtotal: priceBreakdown.subtotal,
        cleaning_fee: priceBreakdown.cleaningFee,
        discount_amount: priceBreakdown.discountAmount + voucherDiscount,
        total_price: priceBreakdown.totalPrice,
        currency: priceBreakdown.currency,
        expires_at: expiresAt?.toISOString() || null,
        payment_method: paymentMethod,
        deposit_amount: depositAmount,
        deposit_percent: depositPercent,
      })
      .select('id, booking_code')
      .single();

    if (insertError) {
      // PostgreSQL 23P01 = exclusion_violation (double booking)
      if (insertError.code === '23P01') {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'dates_unavailable' },
          { status: 409 }
        );
      }
      console.error('Booking insert error:', insertError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Record convention redemption if voucher was used
    if (voucherResult && booking) {
      try {
        await supabase.from('convention_redemptions').insert({
          voucher_id: voucherResult.voucher_id,
          convention_id: voucherResult.convention_id,
          merchant_id: (
            await supabase
              .from('partner_conventions')
              .select('merchant_id')
              .eq('id', voucherResult.convention_id)
              .single()
          ).data?.merchant_id,
          order_id: booking.id,
          original_amount: priceBreakdown.subtotal,
          discount_amount: voucherDiscount,
          final_amount: priceBreakdown.totalPrice,
          verification_method: 'link',
          verification_code: body.voucherCode?.trim().toUpperCase(),
        });
      } catch (redemptionErr) {
        // Redemption tracking failure must never block the booking response
        console.error('Convention redemption insert error (non-blocking):', redemptionErr);
      }
    }

    // Sign JWT for guest
    const token = await signGuestToken({
      bookingId: booking.id,
      propertyId: property.id,
      checkoutDate: checkOut,
    });

    // Build response with payment-specific data
    const response: BookingResponse = {
      bookingCode: booking.booking_code,
      token,
      status,
      expiresAt: expiresAt?.toISOString() || null,
      priceBreakdown,
      propertyName: property.name,
      hostPhone: property.contact_phone,
      hostWhatsapp: property.contact_whatsapp,
      paymentMethod: paymentMethod || undefined,
      depositAmount,
      depositPercent,
    };

    // Add payment-method-specific data
    if (paymentMethod === 'bank_transfer' && property.bank_transfer_info) {
      response.bankTransferInfo = property.bank_transfer_info;
    }
    if (paymentMethod === 'crypto' && property.crypto_wallets) {
      response.cryptoWallets = property.crypto_wallets;
    }
    if (paymentMethod === 'card') {
      // Stripe session is NOT created here -- Plan 03 handles /api/checkout
      response.stripeCheckoutUrl = null;
    }

    // Fire-and-forget: send booking confirmation email
    // Email failure must never block the booking response
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
      fetch(`${baseUrl}/api/email/booking-confirmation`, {
        method: 'POST',
        body: JSON.stringify({ bookingId: booking.id }),
        headers: { 'Content-Type': 'application/json' },
      }).catch((emailErr) => {
        console.error('Email trigger failed (fire-and-forget):', emailErr);
      });
    } catch {
      // Silently ignore -- email is enhancement, not gate
    }

    return NextResponse.json<ApiResponse<BookingResponse>>({ data: response });
  } catch (err) {
    console.error('POST /api/booking error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
