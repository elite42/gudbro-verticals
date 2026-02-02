import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import type { ApiResponse, ValidatedVoucher } from '@/types/property';

export const dynamic = 'force-dynamic';

/**
 * POST /api/booking/validate-voucher
 *
 * Client-side voucher preview validation. No auth required because the
 * property booking page is public. Server-authoritative re-validation
 * happens in POST /api/booking on submission.
 */
export async function POST(request: NextRequest) {
  try {
    let body: {
      voucherCode: string;
      propertyId: string;
      numNights: number;
      subtotal: number;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse<null>>({ error: 'validation_error' }, { status: 400 });
    }

    const { voucherCode, propertyId, numNights, subtotal } = body;

    if (!voucherCode || !propertyId || !numNights || subtotal == null) {
      return NextResponse.json<ApiResponse<null>>({ error: 'validation_error' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase.rpc('validate_accommodation_voucher', {
      p_voucher_code: voucherCode.trim().toUpperCase(),
      p_property_id: propertyId,
      p_num_nights: numNights,
      p_subtotal: subtotal,
    });

    if (error) {
      console.error('Voucher validation RPC error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // RPC returns an array of rows; take the first
    const row = Array.isArray(data) ? data[0] : data;

    if (!row || !row.is_valid) {
      return NextResponse.json<ApiResponse<null>>(
        { error: row?.error_message || 'Invalid voucher code' },
        { status: 400 }
      );
    }

    const voucher: ValidatedVoucher = {
      code: voucherCode.trim().toUpperCase(),
      conventionId: row.convention_id,
      voucherId: row.voucher_id,
      benefitType: row.benefit_type,
      benefitValue: Number(row.benefit_value),
      benefitScope: row.benefit_scope,
      discountAmount: row.discount_amount,
      partnerName: row.partner_name,
      conventionName: row.convention_name,
    };

    return NextResponse.json<ApiResponse<ValidatedVoucher>>({ data: voucher });
  } catch (err) {
    console.error('POST /api/booking/validate-voucher error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
