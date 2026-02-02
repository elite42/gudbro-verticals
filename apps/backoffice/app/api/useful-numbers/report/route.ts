import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// ============================================================================
// POST - Create a report for incorrect emergency/city number
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      merchantId,
      reportedBy,
      referenceType, // 'city' | 'emergency'
      referenceId,
      reportType, // 'wrong_number' | 'outdated' | 'closed' | 'other'
      description,
      suggestedFix,
    } = body;

    if (!merchantId || !reportedBy || !referenceType || !referenceId || !reportType) {
      return NextResponse.json(
        {
          error:
            'merchantId, reportedBy, referenceType, referenceId, and reportType are required',
        },
        { status: 400 }
      );
    }

    // Validate referenceType
    if (!['city', 'emergency'].includes(referenceType)) {
      return NextResponse.json(
        { error: 'referenceType must be "city" or "emergency"' },
        { status: 400 }
      );
    }

    // Validate reportType
    if (!['wrong_number', 'outdated', 'closed', 'other'].includes(reportType)) {
      return NextResponse.json(
        { error: 'reportType must be one of: wrong_number, outdated, closed, other' },
        { status: 400 }
      );
    }

    // Verify the reference exists
    const tableName = referenceType === 'city' ? 'city_useful_numbers' : 'emergency_numbers';
    const { data: reference, error: refError } = await supabase
      .from(tableName)
      .select('id')
      .eq('id', referenceId)
      .single();

    if (refError || !reference) {
      return NextResponse.json(
        { error: `Referenced ${referenceType} number not found` },
        { status: 404 }
      );
    }

    // Create the report
    const { data: report, error } = await supabase
      .from('useful_numbers_reports')
      .insert({
        merchant_id: merchantId,
        reported_by: reportedBy,
        reference_type: referenceType,
        reference_id: referenceId,
        report_type: reportType,
        description,
        suggested_fix: suggestedFix,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating report:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ report, message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error in POST /api/useful-numbers/report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// GET - List reports (for admin/GUDBRO use)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const merchantId = searchParams.get('merchantId');

    let query = supabase
      .from('useful_numbers_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (merchantId) {
      query = query.eq('merchant_id', merchantId);
    }

    const { data: reports, error } = await query.limit(100);

    if (error) {
      console.error('Error fetching reports:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reports: reports || [] });
  } catch (error) {
    console.error('Error in GET /api/useful-numbers/report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
