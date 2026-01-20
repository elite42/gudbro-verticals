/**
 * Intelligence Map API
 *
 * GET /api/intelligence/map
 *
 * Returns map data: customers, competitors, partners, leads within radius.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { getMerchantCenter, calculateDistance } from '@/lib/geocoding-service';
import {
  calculateCustomerStatus,
  type CustomerEntity,
  type CompetitorEntity,
  type PartnerEntity,
  type MapStats,
} from '@/components/map/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse parameters
    const merchantId = searchParams.get('merchant_id');
    if (!merchantId) {
      return NextResponse.json({ error: 'merchant_id is required' }, { status: 400 });
    }

    const radiusKm = parseFloat(searchParams.get('radius_km') || '5');
    const radiusMeters = radiusKm * 1000;

    const entitiesParam = searchParams.get('entities') || 'customers,competitors,partners';
    const entities = entitiesParam.split(',');

    const customerStatusParam = searchParams.get('customer_status') || 'active,atRisk';
    const customerStatuses = customerStatusParam.split(',');

    const datePreset = searchParams.get('date_preset') || '30d';
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');

    // Get center point
    let centerLat = parseFloat(searchParams.get('center_lat') || '');
    let centerLng = parseFloat(searchParams.get('center_lng') || '');
    let centerName = 'Your Location';

    if (isNaN(centerLat) || isNaN(centerLng)) {
      const merchantCenter = await getMerchantCenter(merchantId);
      if (merchantCenter) {
        centerLat = merchantCenter.lat;
        centerLng = merchantCenter.lng;
        centerName = merchantCenter.name;
      } else {
        return NextResponse.json(
          { error: 'Could not determine center point. Please set location coordinates.' },
          { status: 400 }
        );
      }
    }

    const supabase = getSupabaseAdmin();

    // Calculate date filter based on preset
    let dateFilter: Date | null = null;
    if (dateFrom) {
      dateFilter = new Date(dateFrom);
    } else if (datePreset) {
      const now = new Date();
      switch (datePreset) {
        case '7d':
          dateFilter = new Date(now.setDate(now.getDate() - 7));
          break;
        case '30d':
          dateFilter = new Date(now.setDate(now.getDate() - 30));
          break;
        case '90d':
          dateFilter = new Date(now.setDate(now.getDate() - 90));
          break;
        case '365d':
          dateFilter = new Date(now.setDate(now.getDate() - 365));
          break;
      }
    }

    // Fetch data in parallel
    const [customersResult, competitorsResult, partnersResult] = await Promise.all([
      entities.includes('customers')
        ? fetchCustomers(
            supabase,
            merchantId,
            centerLat,
            centerLng,
            radiusMeters,
            dateFilter,
            customerStatuses
          )
        : Promise.resolve([]),
      entities.includes('competitors')
        ? fetchCompetitors(supabase, merchantId, centerLat, centerLng, radiusMeters)
        : Promise.resolve([]),
      entities.includes('partners') || entities.includes('leads')
        ? fetchPartners(
            supabase,
            merchantId,
            centerLat,
            centerLng,
            radiusMeters,
            entities.includes('leads')
          )
        : Promise.resolve({ partners: [], leads: [] }),
    ]);

    // Calculate stats
    const stats = calculateStats(
      customersResult as CustomerEntity[],
      competitorsResult as CompetitorEntity[],
      partnersResult as { partners: PartnerEntity[]; leads: PartnerEntity[] }
    );

    return NextResponse.json({
      center: {
        lat: centerLat,
        lng: centerLng,
        name: centerName,
      },
      entities: {
        customers: customersResult,
        competitors: competitorsResult,
        partners: (partnersResult as { partners: PartnerEntity[]; leads: PartnerEntity[] })
          .partners,
        leads: (partnersResult as { partners: PartnerEntity[]; leads: PartnerEntity[] }).leads,
      },
      stats,
    });
  } catch (error) {
    console.error('[Map API] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch map data' }, { status: 500 });
  }
}

// Fetch customers with location data
async function fetchCustomers(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  merchantId: string,
  centerLat: number,
  centerLng: number,
  radiusMeters: number,
  dateFilter: Date | null,
  statuses: string[]
): Promise<CustomerEntity[]> {
  // First, get account IDs that have a relationship with this merchant
  // This includes followers, loyalty accounts, wallets, or orders
  const { data: merchantFollowers } = await supabase
    .from('merchant_followers')
    .select('account_id')
    .eq('merchant_id', merchantId)
    .eq('is_active', true);

  const { data: merchantLoyaltyAccounts } = await supabase
    .from('customer_loyalty_accounts')
    .select('account_id')
    .eq('merchant_id', merchantId);

  const { data: merchantWallets } = await supabase
    .from('customer_wallets')
    .select('account_id')
    .eq('merchant_id', merchantId);

  const { data: merchantOrdersAccounts } = await supabase
    .from('orders')
    .select('account_id')
    .eq('merchant_id', merchantId)
    .not('account_id', 'is', null);

  // Combine all account IDs and deduplicate
  const allAccountIds = new Set<string>([
    ...(merchantFollowers || []).map((f) => f.account_id),
    ...(merchantLoyaltyAccounts || []).map((l) => l.account_id),
    ...(merchantWallets || []).map((w) => w.account_id),
    ...(merchantOrdersAccounts || [])
      .map((o) => o.account_id)
      .filter((id): id is string => id !== null),
  ]);

  // If no accounts related to this merchant, return empty
  if (allAccountIds.size === 0) {
    return [];
  }

  // Get customers with delivery location - only those related to this merchant
  const { data: accounts, error } = await supabase
    .from('accounts')
    .select(
      `
      id,
      first_name,
      last_name,
      email,
      phone,
      delivery_latitude,
      delivery_longitude,
      delivery_city,
      is_resident,
      profile_completion_pct
    `
    )
    .in('id', Array.from(allAccountIds))
    .not('delivery_latitude', 'is', null)
    .not('delivery_longitude', 'is', null);

  if (error || !accounts) {
    console.error('[Map API] Error fetching accounts:', error);
    return [];
  }

  // Get loyalty data for these accounts
  const accountIds = accounts.map((a) => a.id);
  const { data: loyaltyAccounts } = await supabase
    .from('customer_loyalty_accounts')
    .select('account_id, points_balance, lifetime_points, current_tier')
    .eq('merchant_id', merchantId)
    .in('account_id', accountIds);

  // Get wallet data
  const { data: wallets } = await supabase
    .from('customer_wallets')
    .select('account_id, balance_cents')
    .eq('merchant_id', merchantId)
    .in('account_id', accountIds);

  // Get order data
  const { data: orders } = await supabase
    .from('orders')
    .select('account_id, total, created_at')
    .eq('merchant_id', merchantId)
    .in('account_id', accountIds)
    .order('created_at', { ascending: false });

  // Build customer entities
  const customers: CustomerEntity[] = [];

  for (const account of accounts) {
    const lat = parseFloat(account.delivery_latitude);
    const lng = parseFloat(account.delivery_longitude);

    // Calculate distance
    const distance = calculateDistance(centerLat, centerLng, lat, lng);
    if (distance > radiusMeters) continue;

    // Get related data
    const loyalty = loyaltyAccounts?.find((l) => l.account_id === account.id);
    const wallet = wallets?.find((w) => w.account_id === account.id);
    const accountOrders = orders?.filter((o) => o.account_id === account.id) || [];
    const lastOrder = accountOrders[0];

    // Calculate status
    const status = calculateCustomerStatus(lastOrder?.created_at || null);

    // Filter by status
    if (!statuses.includes(status) && !statuses.includes(status.replace('_', ''))) {
      continue;
    }

    // Filter by date
    if (dateFilter && lastOrder) {
      const orderDate = new Date(lastOrder.created_at);
      if (orderDate < dateFilter) continue;
    }

    customers.push({
      id: account.id,
      type: 'customer',
      lat,
      lng,
      name: [account.first_name, account.last_name].filter(Boolean).join(' ') || 'Anonymous',
      email: account.email,
      phone: account.phone,
      distance_m: distance,
      tier: loyalty?.current_tier || 'Bronze',
      points_balance: loyalty?.points_balance || 0,
      lifetime_points: loyalty?.lifetime_points || 0,
      wallet_balance_cents: wallet?.balance_cents || 0,
      last_order_at: lastOrder?.created_at,
      total_spent_cents: accountOrders.reduce(
        (sum, o) => sum + (parseFloat(o.total) * 100 || 0),
        0
      ),
      order_count: accountOrders.length,
      status,
      is_resident: account.is_resident,
      profile_completion_pct: account.profile_completion_pct || 0,
    });
  }

  // Sort by distance
  customers.sort((a, b) => (a.distance_m || 0) - (b.distance_m || 0));

  return customers;
}

// Fetch competitors
async function fetchCompetitors(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  merchantId: string,
  centerLat: number,
  centerLng: number,
  radiusMeters: number
): Promise<CompetitorEntity[]> {
  const { data: competitors, error } = await supabase
    .from('ai_competitor_profiles')
    .select('*')
    .eq('merchant_id', merchantId)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null);

  if (error || !competitors) {
    console.error('[Map API] Error fetching competitors:', error);
    return [];
  }

  const result: CompetitorEntity[] = [];

  for (const comp of competitors) {
    const lat = parseFloat(comp.latitude);
    const lng = parseFloat(comp.longitude);

    const distance = calculateDistance(centerLat, centerLng, lat, lng);
    if (distance > radiusMeters) continue;

    result.push({
      id: comp.id,
      type: 'competitor',
      lat,
      lng,
      name: comp.name,
      address: comp.address,
      distance_m: distance,
      price_range: comp.price_range,
      cuisine_type: comp.cuisine_type,
      rating: comp.google_rating ? parseFloat(comp.google_rating) : undefined,
      review_count: comp.google_reviews_count,
    });
  }

  // Sort by distance
  result.sort((a, b) => (a.distance_m || 0) - (b.distance_m || 0));

  return result;
}

// Fetch partners and leads
async function fetchPartners(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  merchantId: string,
  centerLat: number,
  centerLng: number,
  radiusMeters: number,
  includeLeads: boolean
): Promise<{ partners: PartnerEntity[]; leads: PartnerEntity[] }> {
  const partners: PartnerEntity[] = [];
  const leads: PartnerEntity[] = [];

  // Fetch accommodations (no merchant_id filter - uses geographic proximity)
  const { data: accommodations } = await supabase
    .from('accommodation_partners')
    .select('*')
    .eq('is_active', true)
    .not('latitude', 'is', null);

  if (accommodations) {
    for (const acc of accommodations) {
      const lat = parseFloat(acc.latitude);
      const lng = parseFloat(acc.longitude);
      const distance = calculateDistance(centerLat, centerLng, lat, lng);

      if (distance > radiusMeters) continue;

      const entity: PartnerEntity = {
        id: acc.id,
        type: acc.partnership_status === 'lead' ? 'lead' : 'partner',
        lat,
        lng,
        name: acc.name,
        distance_m: distance,
        partner_type: 'accommodation',
        status: acc.partnership_status || 'pending',
        contact_name: acc.contact_name,
        contact_email: acc.contact_email,
        contact_phone: acc.contact_phone,
        vouchers_issued: acc.vouchers_issued,
        vouchers_used: acc.vouchers_redeemed,
      };

      if (entity.status === 'lead' && includeLeads) {
        leads.push(entity);
      } else if (entity.status !== 'lead') {
        partners.push(entity);
      }
    }
  }

  // Fetch offices (no merchant_id filter - uses geographic proximity)
  const { data: offices } = await supabase
    .from('office_partners')
    .select('*')
    .eq('is_active', true)
    .not('latitude', 'is', null);

  if (offices) {
    for (const office of offices) {
      const lat = parseFloat(office.latitude);
      const lng = parseFloat(office.longitude);
      const distance = calculateDistance(centerLat, centerLng, lat, lng);

      if (distance > radiusMeters) continue;

      const entity: PartnerEntity = {
        id: office.id,
        type: office.partnership_status === 'lead' ? 'lead' : 'partner',
        lat,
        lng,
        name: office.company_name,
        distance_m: distance,
        partner_type: 'office',
        status: office.partnership_status || 'pending',
        contact_name: office.contact_person,
        contact_email: office.contact_email,
        contact_phone: office.contact_phone,
      };

      if (entity.status === 'lead' && includeLeads) {
        leads.push(entity);
      } else if (entity.status !== 'lead') {
        partners.push(entity);
      }
    }
  }

  // Sort by distance
  partners.sort((a, b) => (a.distance_m || 0) - (b.distance_m || 0));
  leads.sort((a, b) => (a.distance_m || 0) - (b.distance_m || 0));

  return { partners, leads };
}

// Calculate aggregate stats
function calculateStats(
  customers: CustomerEntity[],
  competitors: CompetitorEntity[],
  partnersData: { partners: PartnerEntity[]; leads: PartnerEntity[] }
): MapStats {
  const activeCustomers = customers.filter((c) => c.status === 'active').length;
  const atRiskCustomers = customers.filter((c) => c.status === 'at_risk').length;
  const churnedCustomers = customers.filter((c) => c.status === 'churned').length;

  const totalRevenue = customers.reduce((sum, c) => sum + c.total_spent_cents, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.order_count, 0);

  return {
    totalCustomers: customers.length,
    activeCustomers,
    atRiskCustomers,
    churnedCustomers,
    totalCompetitors: competitors.length,
    totalPartners: partnersData.partners.length,
    totalLeads: partnersData.leads.length,
    revenueInRadius: totalRevenue,
    avgOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
  };
}
