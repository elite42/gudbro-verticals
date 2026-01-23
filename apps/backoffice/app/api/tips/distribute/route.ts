import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface DistributionResult {
  staffId: string;
  staffName: string;
  tipRole: string;
  allocationAmount: number;
  percentageShare: number;
}

interface DistributeRequest {
  merchantId: string;
  periodId: string;
  distributedBy: string; // account ID
  notes?: string;
}

// ============================================================================
// POST - Distribute tips for a period
// ============================================================================

export async function POST(request: Request) {
  try {
    const body: DistributeRequest = await request.json();
    const { merchantId, periodId, distributedBy, notes } = body;

    if (!merchantId || !periodId) {
      return NextResponse.json({ error: 'merchantId and periodId are required' }, { status: 400 });
    }

    // 1. Get the period
    const { data: period, error: periodError } = await supabase
      .from('tip_pool_periods')
      .select('*')
      .eq('id', periodId)
      .eq('merchant_id', merchantId)
      .single();

    if (periodError || !period) {
      console.error('Error fetching period:', periodError);
      return NextResponse.json({ error: 'Period not found' }, { status: 404 });
    }

    // Check period is closed (ready for distribution)
    if (period.status !== 'closed') {
      return NextResponse.json(
        { error: 'Period must be closed before distribution. Current status: ' + period.status },
        { status: 400 }
      );
    }

    // 2. Get distribution settings
    const { data: settings, error: settingsError } = await supabase
      .from('tip_distribution_settings')
      .select('*')
      .eq('merchant_id', merchantId)
      .single();

    if (settingsError || !settings) {
      return NextResponse.json({ error: 'Distribution settings not configured' }, { status: 400 });
    }

    // 3. Calculate total pool
    let totalPool = parseFloat(period.total_tips) || 0;
    if (settings.include_service_charge) {
      totalPool += parseFloat(period.total_service_charges) || 0;
    }

    if (totalPool <= 0) {
      return NextResponse.json({ error: 'No tips to distribute for this period' }, { status: 400 });
    }

    // 4. Get pool members
    const { data: members, error: membersError } = await supabase
      .from('tip_pool_members')
      .select(
        `
        *,
        staff:staff_profiles(
          id,
          display_name,
          job_title
        )
      `
      )
      .eq('merchant_id', merchantId)
      .eq('is_included', true);

    if (membersError) {
      console.error('Error fetching pool members:', membersError);
      return NextResponse.json({ error: membersError.message }, { status: 500 });
    }

    if (!members || members.length === 0) {
      return NextResponse.json({ error: 'No pool members configured' }, { status: 400 });
    }

    // 5. Calculate distribution based on pool type
    const distributions: DistributionResult[] = calculateDistribution(members, settings, totalPool);

    // 6. Create allocations
    const allocations = distributions.map((d) => ({
      merchant_id: merchantId,
      pool_period_id: periodId,
      staff_id: d.staffId,
      amount: d.allocationAmount,
      source: 'pool_share' as const,
      is_paid: false,
      notes: `Period distribution: ${period.period_start} to ${period.period_end}`,
    }));

    const { error: allocError } = await supabase.from('tip_allocations').insert(allocations);

    if (allocError) {
      console.error('Error creating allocations:', allocError);
      return NextResponse.json({ error: allocError.message }, { status: 500 });
    }

    // 7. Update period status to distributed
    const { error: updateError } = await supabase
      .from('tip_pool_periods')
      .update({
        status: 'distributed',
        total_distributed: totalPool,
        distributed_at: new Date().toISOString(),
        distributed_by: distributedBy || null,
        notes: notes || null,
      })
      .eq('id', periodId);

    if (updateError) {
      console.error('Error updating period status:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 8. Return results
    return NextResponse.json({
      success: true,
      message: `Successfully distributed €${totalPool.toFixed(2)} to ${distributions.length} staff members`,
      distribution: {
        periodId,
        totalPool,
        memberCount: distributions.length,
        allocations: distributions,
      },
    });
  } catch (error) {
    console.error('Error in POST /api/tips/distribute:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// GET - Preview distribution (without actually distributing)
// ============================================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const periodId = searchParams.get('periodId');

    if (!merchantId || !periodId) {
      return NextResponse.json({ error: 'merchantId and periodId are required' }, { status: 400 });
    }

    // 1. Get the period
    const { data: period, error: periodError } = await supabase
      .from('tip_pool_periods')
      .select('*')
      .eq('id', periodId)
      .eq('merchant_id', merchantId)
      .single();

    if (periodError || !period) {
      return NextResponse.json({ error: 'Period not found' }, { status: 404 });
    }

    // 2. Get distribution settings
    const { data: settings, error: settingsError } = await supabase
      .from('tip_distribution_settings')
      .select('*')
      .eq('merchant_id', merchantId)
      .single();

    if (settingsError || !settings) {
      return NextResponse.json({
        success: true,
        preview: {
          periodId,
          totalPool: 0,
          memberCount: 0,
          allocations: [],
          warning: 'Distribution settings not configured',
        },
      });
    }

    // 3. Calculate total pool
    let totalPool = parseFloat(period.total_tips) || 0;
    if (settings.include_service_charge) {
      totalPool += parseFloat(period.total_service_charges) || 0;
    }

    // 4. Get pool members
    const { data: members, error: membersError } = await supabase
      .from('tip_pool_members')
      .select(
        `
        *,
        staff:staff_profiles(
          id,
          display_name,
          job_title,
          photo_url
        )
      `
      )
      .eq('merchant_id', merchantId)
      .eq('is_included', true);

    if (membersError) {
      console.error('Error fetching pool members:', membersError);
      return NextResponse.json({ error: membersError.message }, { status: 500 });
    }

    if (!members || members.length === 0) {
      return NextResponse.json({
        success: true,
        preview: {
          periodId,
          totalPool,
          memberCount: 0,
          allocations: [],
          warning: 'No pool members configured',
        },
      });
    }

    // 5. Calculate distribution preview
    const distributions = calculateDistribution(members, settings, totalPool);

    return NextResponse.json({
      success: true,
      preview: {
        periodId,
        periodStart: period.period_start,
        periodEnd: period.period_end,
        status: period.status,
        totalTips: parseFloat(period.total_tips) || 0,
        totalServiceCharges: parseFloat(period.total_service_charges) || 0,
        totalPool,
        includesServiceCharge: settings.include_service_charge,
        poolType: settings.pool_type,
        memberCount: distributions.length,
        allocations: distributions.map((d) => ({
          ...d,
          staffPhoto: members.find((m: any) => m.staff_id === d.staffId)?.staff?.photo_url,
        })),
      },
    });
  } catch (error) {
    console.error('Error in GET /api/tips/distribute:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// Helper: Calculate distribution based on pool type
// ============================================================================

function calculateDistribution(
  members: any[],
  settings: any,
  totalPool: number
): DistributionResult[] {
  const poolType = settings.pool_type;
  const rolePercentages = settings.role_percentages || {};

  if (poolType === 'equal') {
    // Equal split
    const sharePerMember = totalPool / members.length;
    const percentagePerMember = 100 / members.length;

    return members.map((m) => ({
      staffId: m.staff_id,
      staffName: m.staff?.display_name || 'Unknown',
      tipRole: m.tip_role || m.staff?.job_title || 'Staff',
      allocationAmount: Math.round(sharePerMember * 100) / 100,
      percentageShare: Math.round(percentagePerMember * 100) / 100,
    }));
  }

  if (poolType === 'custom') {
    // Custom percentages
    const totalCustomPercentage = members.reduce(
      (sum: number, m: any) => sum + (parseFloat(m.custom_percentage) || 0),
      0
    );

    return members.map((m) => {
      const customPct = parseFloat(m.custom_percentage) || 0;
      const normalizedPct =
        totalCustomPercentage > 0 ? (customPct / totalCustomPercentage) * 100 : 0;
      const amount = totalPool * (normalizedPct / 100);

      return {
        staffId: m.staff_id,
        staffName: m.staff?.display_name || 'Unknown',
        tipRole: m.tip_role || m.staff?.job_title || 'Staff',
        allocationAmount: Math.round(amount * 100) / 100,
        percentageShare: Math.round(normalizedPct * 100) / 100,
      };
    });
  }

  // By role (default)
  // Group members by role
  const membersByRole: Record<string, any[]> = {};
  members.forEach((m) => {
    const role = m.tip_role || m.staff?.job_title || 'staff';
    const normalizedRole = role.toLowerCase();
    if (!membersByRole[normalizedRole]) {
      membersByRole[normalizedRole] = [];
    }
    membersByRole[normalizedRole].push(m);
  });

  const results: DistributionResult[] = [];

  Object.entries(membersByRole).forEach(([role, roleMembers]) => {
    // Get percentage for this role (default 0 if not configured)
    const rolePercentage = rolePercentages[role] || rolePercentages['staff'] || 0;
    const roleTotal = totalPool * (rolePercentage / 100);
    const memberShare = roleTotal / roleMembers.length;
    const memberPercentage = rolePercentage / roleMembers.length;

    roleMembers.forEach((m) => {
      results.push({
        staffId: m.staff_id,
        staffName: m.staff?.display_name || 'Unknown',
        tipRole: role,
        allocationAmount: Math.round(memberShare * 100) / 100,
        percentageShare: Math.round(memberPercentage * 100) / 100,
      });
    });
  });

  return results;
}
