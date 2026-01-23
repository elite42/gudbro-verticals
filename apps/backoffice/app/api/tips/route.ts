import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface TipDistributionSettings {
  id: string;
  merchantId: string;
  distributionMode: 'individual' | 'pool' | 'none';
  poolType: 'equal' | 'by_role' | 'custom';
  rolePercentages: Record<string, number>;
  distributionPeriod: 'weekly' | 'biweekly' | 'monthly' | 'custom';
  distributionDay: number;
  includeServiceCharge: boolean;
  requireMinimumHours: boolean;
  minimumHoursPerPeriod: number;
}

interface TipPoolMember {
  id: string;
  merchantId: string;
  staffId: string;
  staffName: string;
  staffPhoto?: string;
  jobTitle: string;
  isIncluded: boolean;
  exclusionReason?: string;
  customPercentage?: number;
  tipRole?: string;
}

interface TipPoolPeriod {
  id: string;
  merchantId: string;
  periodStart: string;
  periodEnd: string;
  status: 'open' | 'closed' | 'distributed';
  totalTips: number;
  totalServiceCharges: number;
  totalDistributed: number;
  closedAt?: string;
  distributedAt?: string;
  distributedBy?: string;
  notes?: string;
}

interface TipAllocation {
  id: string;
  poolPeriodId?: string;
  staffId: string;
  staffName: string;
  merchantId: string;
  amount: number;
  source: 'individual_order' | 'pool_share' | 'adjustment';
  orderId?: string;
  isPaid: boolean;
  paidAt?: string;
  paymentMethod?: string;
  paymentReference?: string;
  notes?: string;
  createdAt: string;
}

// ============================================================================
// GET - Fetch tip data
// ============================================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const type = searchParams.get('type'); // settings, members, periods, allocations, my-tips
    const staffId = searchParams.get('staffId');
    const periodId = searchParams.get('periodId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    switch (type) {
      case 'settings':
        return getSettings(merchantId);

      case 'members':
        return getPoolMembers(merchantId);

      case 'periods':
        return getPeriods(merchantId);

      case 'allocations':
        return getAllocations(merchantId, periodId);

      case 'my-tips':
        if (!staffId) {
          return NextResponse.json({ error: 'staffId is required for my-tips' }, { status: 400 });
        }
        return getMyTips(merchantId, staffId);

      default:
        // Return all data
        return getAllTipData(merchantId);
    }
  } catch (error) {
    console.error('Error in GET /api/tips:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getSettings(merchantId: string) {
  const { data, error } = await supabase
    .from('tip_distribution_settings')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (error && error.code === 'PGRST116') {
    // No settings found, return defaults
    return NextResponse.json({
      success: true,
      settings: null,
      isNew: true,
    });
  }

  if (error) {
    console.error('Error fetching tip settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    settings: {
      id: data.id,
      merchantId: data.merchant_id,
      distributionMode: data.distribution_mode,
      poolType: data.pool_type,
      rolePercentages: data.role_percentages,
      distributionPeriod: data.distribution_period,
      distributionDay: data.distribution_day,
      includeServiceCharge: data.include_service_charge,
      requireMinimumHours: data.require_minimum_hours,
      minimumHoursPerPeriod: data.minimum_hours_per_period,
    } as TipDistributionSettings,
    isNew: false,
  });
}

async function getPoolMembers(merchantId: string) {
  const { data, error } = await supabase
    .from('tip_pool_members')
    .select(
      `
      *,
      staff:staff_profiles(
        id,
        display_name,
        photo_url,
        job_title
      )
    `
    )
    .eq('merchant_id', merchantId);

  if (error) {
    console.error('Error fetching pool members:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const members: TipPoolMember[] = (data || []).map((m: any) => ({
    id: m.id,
    merchantId: m.merchant_id,
    staffId: m.staff_id,
    staffName: m.staff?.display_name || 'Unknown',
    staffPhoto: m.staff?.photo_url,
    jobTitle: m.staff?.job_title || '',
    isIncluded: m.is_included,
    exclusionReason: m.exclusion_reason,
    customPercentage: m.custom_percentage,
    tipRole: m.tip_role,
  }));

  return NextResponse.json({
    success: true,
    members,
  });
}

async function getPeriods(merchantId: string) {
  const { data, error } = await supabase
    .from('tip_pool_periods')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('period_start', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching periods:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const periods: TipPoolPeriod[] = (data || []).map((p: any) => ({
    id: p.id,
    merchantId: p.merchant_id,
    periodStart: p.period_start,
    periodEnd: p.period_end,
    status: p.status,
    totalTips: parseFloat(p.total_tips) || 0,
    totalServiceCharges: parseFloat(p.total_service_charges) || 0,
    totalDistributed: parseFloat(p.total_distributed) || 0,
    closedAt: p.closed_at,
    distributedAt: p.distributed_at,
    distributedBy: p.distributed_by,
    notes: p.notes,
  }));

  return NextResponse.json({
    success: true,
    periods,
  });
}

async function getAllocations(merchantId: string, periodId: string | null) {
  let query = supabase
    .from('tip_allocations')
    .select(
      `
      *,
      staff:staff_profiles(
        id,
        display_name,
        photo_url
      )
    `
    )
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (periodId) {
    query = query.eq('pool_period_id', periodId);
  }

  const { data, error } = await query.limit(100);

  if (error) {
    console.error('Error fetching allocations:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const allocations: TipAllocation[] = (data || []).map((a: any) => ({
    id: a.id,
    poolPeriodId: a.pool_period_id,
    staffId: a.staff_id,
    staffName: a.staff?.display_name || 'Unknown',
    merchantId: a.merchant_id,
    amount: parseFloat(a.amount) || 0,
    source: a.source,
    orderId: a.order_id,
    isPaid: a.is_paid,
    paidAt: a.paid_at,
    paymentMethod: a.payment_method,
    paymentReference: a.payment_reference,
    notes: a.notes,
    createdAt: a.created_at,
  }));

  return NextResponse.json({
    success: true,
    allocations,
  });
}

async function getMyTips(merchantId: string, staffId: string) {
  // Get current period
  const { data: currentPeriod } = await supabase
    .from('tip_pool_periods')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('status', 'open')
    .order('period_start', { ascending: false })
    .limit(1)
    .single();

  // Get allocations for this staff
  const { data: allocations, error: allocError } = await supabase
    .from('tip_allocations')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('staff_id', staffId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (allocError) {
    console.error('Error fetching my tips:', allocError);
    return NextResponse.json({ error: allocError.message }, { status: 500 });
  }

  // Calculate totals
  const totalEarned = (allocations || []).reduce(
    (sum: number, a: any) => sum + (parseFloat(a.amount) || 0),
    0
  );
  const totalPaid = (allocations || [])
    .filter((a: any) => a.is_paid)
    .reduce((sum: number, a: any) => sum + (parseFloat(a.amount) || 0), 0);
  const pendingPayment = totalEarned - totalPaid;

  // Current period earnings
  const currentPeriodEarnings = currentPeriod
    ? (allocations || [])
        .filter((a: any) => a.pool_period_id === currentPeriod.id)
        .reduce((sum: number, a: any) => sum + (parseFloat(a.amount) || 0), 0)
    : 0;

  return NextResponse.json({
    success: true,
    summary: {
      totalEarned,
      totalPaid,
      pendingPayment,
      currentPeriodEarnings,
      currentPeriod: currentPeriod
        ? {
            id: currentPeriod.id,
            periodStart: currentPeriod.period_start,
            periodEnd: currentPeriod.period_end,
            status: currentPeriod.status,
          }
        : null,
    },
    allocations: (allocations || []).map((a: any) => ({
      id: a.id,
      amount: parseFloat(a.amount) || 0,
      source: a.source,
      isPaid: a.is_paid,
      paidAt: a.paid_at,
      paymentMethod: a.payment_method,
      createdAt: a.created_at,
    })),
  });
}

async function getAllTipData(merchantId: string) {
  // Fetch all data in parallel
  const [settingsRes, membersRes, periodsRes] = await Promise.all([
    getSettings(merchantId),
    getPoolMembers(merchantId),
    getPeriods(merchantId),
  ]);

  const settingsData = await settingsRes.json();
  const membersData = await membersRes.json();
  const periodsData = await periodsRes.json();

  return NextResponse.json({
    success: true,
    settings: settingsData.settings,
    members: membersData.members,
    periods: periodsData.periods,
    isNew: settingsData.isNew,
  });
}

// ============================================================================
// PUT - Update tip data
// ============================================================================

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { action, merchantId, data } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    switch (action) {
      case 'updateSettings':
        return updateSettings(merchantId, data);

      case 'updateMember':
        return updateMember(data);

      case 'addMembers':
        return addMembers(merchantId, data.staffIds);

      case 'markPaid':
        return markAllocationsPaid(data.allocationIds, data.paymentMethod, data.paymentReference);

      case 'closePeriod':
        return closePeriod(data.periodId);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in PUT /api/tips:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function updateSettings(merchantId: string, data: Partial<TipDistributionSettings>) {
  const upsertData = {
    merchant_id: merchantId,
    distribution_mode: data.distributionMode || 'individual',
    pool_type: data.poolType || 'equal',
    role_percentages: data.rolePercentages || { waiter: 60, kitchen: 25, manager: 15 },
    distribution_period: data.distributionPeriod || 'weekly',
    distribution_day: data.distributionDay || 1,
    include_service_charge: data.includeServiceCharge ?? true,
    require_minimum_hours: data.requireMinimumHours ?? false,
    minimum_hours_per_period: data.minimumHoursPerPeriod || 20,
    updated_at: new Date().toISOString(),
  };

  const { data: result, error } = await supabase
    .from('tip_distribution_settings')
    .upsert(upsertData, { onConflict: 'merchant_id' })
    .select()
    .single();

  if (error) {
    console.error('Error updating tip settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    settings: result,
    message: 'Settings updated successfully',
  });
}

async function updateMember(data: Partial<TipPoolMember> & { id: string }) {
  const updateData: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (data.isIncluded !== undefined) updateData.is_included = data.isIncluded;
  if (data.exclusionReason !== undefined) updateData.exclusion_reason = data.exclusionReason;
  if (data.customPercentage !== undefined) updateData.custom_percentage = data.customPercentage;
  if (data.tipRole !== undefined) updateData.tip_role = data.tipRole;

  const { error } = await supabase.from('tip_pool_members').update(updateData).eq('id', data.id);

  if (error) {
    console.error('Error updating pool member:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Member updated successfully',
  });
}

async function addMembers(merchantId: string, staffIds: string[]) {
  const inserts = staffIds.map((staffId: string) => ({
    merchant_id: merchantId,
    staff_id: staffId,
    is_included: true,
  }));

  const { error } = await supabase
    .from('tip_pool_members')
    .upsert(inserts, { onConflict: 'merchant_id,staff_id' });

  if (error) {
    console.error('Error adding pool members:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: `${staffIds.length} members added to pool`,
  });
}

async function markAllocationsPaid(
  allocationIds: string[],
  paymentMethod: string,
  paymentReference?: string
) {
  const { error } = await supabase
    .from('tip_allocations')
    .update({
      is_paid: true,
      paid_at: new Date().toISOString(),
      payment_method: paymentMethod,
      payment_reference: paymentReference,
    })
    .in('id', allocationIds);

  if (error) {
    console.error('Error marking allocations paid:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: `${allocationIds.length} allocations marked as paid`,
  });
}

async function closePeriod(periodId: string) {
  const { error } = await supabase
    .from('tip_pool_periods')
    .update({
      status: 'closed',
      closed_at: new Date().toISOString(),
    })
    .eq('id', periodId);

  if (error) {
    console.error('Error closing period:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Period closed successfully',
  });
}

// ============================================================================
// POST - Create new resources
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, merchantId, data } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    switch (action) {
      case 'createPeriod':
        return createPeriod(merchantId, data.periodStart, data.periodEnd);

      case 'createAllocation':
        return createAllocation(merchantId, data);

      case 'syncMembers':
        return syncPoolMembers(merchantId);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in POST /api/tips:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function createPeriod(merchantId: string, periodStart: string, periodEnd: string) {
  const { data, error } = await supabase
    .from('tip_pool_periods')
    .insert({
      merchant_id: merchantId,
      period_start: periodStart,
      period_end: periodEnd,
      status: 'open',
      total_tips: 0,
      total_service_charges: 0,
      total_distributed: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating period:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    period: data,
    message: 'Period created successfully',
  });
}

async function createAllocation(
  merchantId: string,
  data: {
    staffId: string;
    amount: number;
    source: 'individual_order' | 'pool_share' | 'adjustment';
    periodId?: string;
    orderId?: string;
    notes?: string;
  }
) {
  const { data: allocation, error } = await supabase
    .from('tip_allocations')
    .insert({
      merchant_id: merchantId,
      staff_id: data.staffId,
      amount: data.amount,
      source: data.source,
      pool_period_id: data.periodId,
      order_id: data.orderId,
      notes: data.notes,
      is_paid: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating allocation:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    allocation,
    message: 'Allocation created successfully',
  });
}

async function syncPoolMembers(merchantId: string) {
  // Get all active staff for this merchant
  const { data: staff, error: staffError } = await supabase
    .from('staff_profiles')
    .select('id')
    .eq('location_id', merchantId)
    .eq('status', 'active');

  if (staffError) {
    console.error('Error fetching staff:', staffError);
    return NextResponse.json({ error: staffError.message }, { status: 500 });
  }

  if (!staff || staff.length === 0) {
    return NextResponse.json({
      success: true,
      message: 'No active staff found',
      added: 0,
    });
  }

  // Add all staff to pool members (if not already)
  const inserts = staff.map((s: any) => ({
    merchant_id: merchantId,
    staff_id: s.id,
    is_included: true,
  }));

  const { error } = await supabase
    .from('tip_pool_members')
    .upsert(inserts, { onConflict: 'merchant_id,staff_id', ignoreDuplicates: true });

  if (error) {
    console.error('Error syncing pool members:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: `Synced ${staff.length} staff members to pool`,
    added: staff.length,
  });
}
