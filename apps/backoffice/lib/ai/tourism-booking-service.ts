// Tourism Booking Service
// Part of TOURISM-B2B feature
// Manages AI Booking Coordinator and group booking requests

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// =============================================================================
// TYPES
// =============================================================================

export type AutomationLevel = 'suggest' | 'auto_routine' | 'full_auto';

export type BookingSlot = 'breakfast' | 'lunch' | 'dinner';

export type BookingStatus =
  | 'pending'
  | 'ai_suggested_accept'
  | 'ai_suggested_decline'
  | 'ai_suggested_counter'
  | 'accepted'
  | 'declined'
  | 'countered'
  | 'expired'
  | 'cancelled';

export type PartnerType = 'tour_operator' | 'accommodation' | 'direct';

export interface AIBookingConfig {
  id: string;
  merchantId: string;
  automationLevel: AutomationLevel;
  weightRevenue: number;
  weightOccupancy: number;
  weightRelationships: number;
  minMarginPercent: number;
  maxGroupPercent: number;
  blackoutDates: string[];
  preferredPartners: string[];
  blockedPartners: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GroupBookingRequest {
  id: string;
  merchantId: string;
  partnerType: PartnerType | null;
  partnerId: string | null;
  requestedDate: string;
  requestedSlot: BookingSlot | null;
  partySize: number;
  pricePerPerson: number | null;
  totalValue: number | null;
  menuType: string | null;
  dietaryRequirements: string[];
  specialRequests: string | null;
  status: BookingStatus;
  aiRecommendation: string | null;
  aiReasoning: string | null;
  aiExpectedValue: number | null;
  aiConfidence: number | null;
  counterPricePerPerson: number | null;
  counterDate: string | null;
  counterSlot: string | null;
  requestedAt: string;
  decidedAt: string | null;
  decidedBy: string | null;
  createdAt: string;
}

export interface BookingPerformance {
  id: string;
  merchantId: string;
  date: string;
  slot: BookingSlot;
  totalCapacity: number | null;
  groupCovers: number;
  walkinCovers: number;
  totalCovers: number;
  occupancyPercent: number | null;
  groupRevenue: number;
  walkinRevenue: number;
  totalRevenue: number;
  avgGroupSpend: number | null;
  avgWalkinSpend: number | null;
  dayOfWeek: number | null;
  isHoliday: boolean;
  weatherConditions: string | null;
  specialEvents: string[];
  createdAt: string;
}

export interface AIBookingDecision {
  recommendation: 'accept' | 'decline' | 'counter';
  reasoning: string;
  expectedValue: number;
  confidence: number;
  counterOffer?: {
    pricePerPerson?: number;
    alternativeDate?: string;
    alternativeSlot?: BookingSlot;
  };
}

export interface BookingAnalytics {
  merchantId: string;
  period: {
    from: string;
    to: string;
  };
  totalRequests: number;
  acceptedRequests: number;
  declinedRequests: number;
  acceptanceRate: number;
  totalGroupRevenue: number;
  avgGroupSize: number;
  avgPricePerPerson: number;
  popularSlots: Record<BookingSlot, number>;
  topPartners: Array<{
    partnerId: string;
    partnerType: PartnerType;
    bookingsCount: number;
    totalRevenue: number;
  }>;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function snakeToCamel<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result as T;
}

// =============================================================================
// BOOKING CONFIG
// =============================================================================

export async function getBookingConfig(merchantId: string): Promise<AIBookingConfig | null> {
  const { data, error } = await supabase
    .from('ai_booking_config')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No config exists, create default
      return createDefaultBookingConfig(merchantId);
    }
    console.error('Error getting booking config:', error);
    return null;
  }

  return snakeToCamel<AIBookingConfig>(data);
}

export async function createDefaultBookingConfig(
  merchantId: string
): Promise<AIBookingConfig | null> {
  const { data, error } = await supabase
    .from('ai_booking_config')
    .insert({
      merchant_id: merchantId,
      automation_level: 'suggest',
      weight_revenue: 50,
      weight_occupancy: 30,
      weight_relationships: 20,
      min_margin_percent: 20,
      max_group_percent: 60,
      blackout_dates: [],
      preferred_partners: [],
      blocked_partners: [],
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating default booking config:', error);
    return null;
  }

  return snakeToCamel<AIBookingConfig>(data);
}

export async function updateBookingConfig(
  merchantId: string,
  updates: Partial<{
    automationLevel: AutomationLevel;
    weightRevenue: number;
    weightOccupancy: number;
    weightRelationships: number;
    minMarginPercent: number;
    maxGroupPercent: number;
    blackoutDates: string[];
    preferredPartners: string[];
    blockedPartners: string[];
  }>
): Promise<boolean> {
  const updateData: Record<string, unknown> = {};

  if (updates.automationLevel !== undefined) updateData.automation_level = updates.automationLevel;
  if (updates.weightRevenue !== undefined) updateData.weight_revenue = updates.weightRevenue;
  if (updates.weightOccupancy !== undefined) updateData.weight_occupancy = updates.weightOccupancy;
  if (updates.weightRelationships !== undefined)
    updateData.weight_relationships = updates.weightRelationships;
  if (updates.minMarginPercent !== undefined)
    updateData.min_margin_percent = updates.minMarginPercent;
  if (updates.maxGroupPercent !== undefined) updateData.max_group_percent = updates.maxGroupPercent;
  if (updates.blackoutDates !== undefined) updateData.blackout_dates = updates.blackoutDates;
  if (updates.preferredPartners !== undefined)
    updateData.preferred_partners = updates.preferredPartners;
  if (updates.blockedPartners !== undefined) updateData.blocked_partners = updates.blockedPartners;

  const { error } = await supabase
    .from('ai_booking_config')
    .update(updateData)
    .eq('merchant_id', merchantId);

  if (error) {
    console.error('Error updating booking config:', error);
    return false;
  }

  return true;
}

// =============================================================================
// BOOKING REQUESTS
// =============================================================================

export async function listBookingRequests(
  merchantId: string,
  options?: {
    status?: BookingStatus | BookingStatus[];
    fromDate?: string;
    toDate?: string;
    limit?: number;
  }
): Promise<GroupBookingRequest[]> {
  let query = supabase
    .from('group_booking_requests')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('requested_date', { ascending: true });

  if (options?.status) {
    if (Array.isArray(options.status)) {
      query = query.in('status', options.status);
    } else {
      query = query.eq('status', options.status);
    }
  }
  if (options?.fromDate) {
    query = query.gte('requested_date', options.fromDate);
  }
  if (options?.toDate) {
    query = query.lte('requested_date', options.toDate);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing booking requests:', error);
    return [];
  }

  return (data || []).map((row) => snakeToCamel<GroupBookingRequest>(row));
}

export async function getBookingRequest(requestId: string): Promise<GroupBookingRequest | null> {
  const { data, error } = await supabase
    .from('group_booking_requests')
    .select('*')
    .eq('id', requestId)
    .single();

  if (error) {
    console.error('Error getting booking request:', error);
    return null;
  }

  return snakeToCamel<GroupBookingRequest>(data);
}

export async function createBookingRequest(
  merchantId: string,
  request: {
    partnerType?: PartnerType;
    partnerId?: string;
    requestedDate: string;
    requestedSlot?: BookingSlot;
    partySize: number;
    pricePerPerson?: number;
    menuType?: string;
    dietaryRequirements?: string[];
    specialRequests?: string;
  }
): Promise<GroupBookingRequest | null> {
  const { data, error } = await supabase
    .from('group_booking_requests')
    .insert({
      merchant_id: merchantId,
      partner_type: request.partnerType || 'direct',
      partner_id: request.partnerId,
      requested_date: request.requestedDate,
      requested_slot: request.requestedSlot,
      party_size: request.partySize,
      price_per_person: request.pricePerPerson,
      menu_type: request.menuType,
      dietary_requirements: request.dietaryRequirements || [],
      special_requests: request.specialRequests,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating booking request:', error);
    return null;
  }

  return snakeToCamel<GroupBookingRequest>(data);
}

export async function updateBookingRequestStatus(
  requestId: string,
  status: BookingStatus,
  decidedBy: 'ai_auto' | 'manager',
  options?: {
    counterPricePerPerson?: number;
    counterDate?: string;
    counterSlot?: BookingSlot;
  }
): Promise<boolean> {
  const updateData: Record<string, unknown> = {
    status,
    decided_at: new Date().toISOString(),
    decided_by: decidedBy,
  };

  if (status === 'countered' && options) {
    if (options.counterPricePerPerson)
      updateData.counter_price_per_person = options.counterPricePerPerson;
    if (options.counterDate) updateData.counter_date = options.counterDate;
    if (options.counterSlot) updateData.counter_slot = options.counterSlot;
  }

  const { error } = await supabase
    .from('group_booking_requests')
    .update(updateData)
    .eq('id', requestId);

  if (error) {
    console.error('Error updating booking request status:', error);
    return false;
  }

  return true;
}

// =============================================================================
// AI BOOKING COORDINATOR
// =============================================================================

export async function processBookingRequest(
  merchantId: string,
  requestId: string
): Promise<AIBookingDecision | null> {
  const openai = getOpenAIClient();

  // Get booking config
  const config = await getBookingConfig(merchantId);
  if (!config) return null;

  // Get the request
  const request = await getBookingRequest(requestId);
  if (!request) return null;

  // Get historical performance for context
  const { data: performanceData } = await supabase
    .from('booking_performance_history')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('slot', request.requestedSlot)
    .order('date', { ascending: false })
    .limit(30);

  const avgOccupancy = performanceData?.length
    ? performanceData.reduce((sum, p) => sum + (p.occupancy_percent || 0), 0) /
      performanceData.length
    : 50;

  const avgGroupSpend = performanceData?.length
    ? performanceData.reduce((sum, p) => sum + (p.avg_group_spend || 0), 0) / performanceData.length
    : 25;

  const prompt = `You are an AI Booking Coordinator for a restaurant.

Current Request:
- Date: ${request.requestedDate}
- Slot: ${request.requestedSlot}
- Party Size: ${request.partySize}
- Price per Person: ${request.pricePerPerson || 'Not specified'} EUR
- Menu Type: ${request.menuType || 'Standard'}
- Special Requests: ${request.specialRequests || 'None'}

Restaurant Configuration:
- Automation Level: ${config.automationLevel}
- Revenue Weight: ${config.weightRevenue}%
- Occupancy Weight: ${config.weightOccupancy}%
- Relationships Weight: ${config.weightRelationships}%
- Min Margin: ${config.minMarginPercent}%
- Max Group Capacity: ${config.maxGroupPercent}%
- Blackout Dates: ${config.blackoutDates.length > 0 ? config.blackoutDates.join(', ') : 'None'}

Historical Data (last 30 days):
- Average Occupancy: ${avgOccupancy.toFixed(1)}%
- Average Group Spend: ${avgGroupSpend.toFixed(2)} EUR

Analyze this request and provide:
1. Recommendation: accept, decline, or counter
2. Reasoning (2-3 sentences)
3. Expected value if accepted (EUR)
4. Confidence score (0-1)
5. If counter: suggest alternative price/date/slot

Consider:
- Is the date a blackout date?
- Does the party size exceed max group capacity?
- Is the price per person acceptable given min margin?
- What's the expected occupancy for that slot?

Respond in JSON format.`;

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an AI Booking Coordinator. Respond only with valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);

    const decision: AIBookingDecision = {
      recommendation: parsed.recommendation || 'decline',
      reasoning: parsed.reasoning || '',
      expectedValue: parsed.expectedValue || 0,
      confidence: parsed.confidence || 0,
    };

    if (parsed.counterOffer) {
      decision.counterOffer = {
        pricePerPerson: parsed.counterOffer.pricePerPerson,
        alternativeDate: parsed.counterOffer.alternativeDate,
        alternativeSlot: parsed.counterOffer.alternativeSlot,
      };
    }

    // Update the request with AI recommendation
    const aiStatus: BookingStatus =
      decision.recommendation === 'accept'
        ? 'ai_suggested_accept'
        : decision.recommendation === 'counter'
          ? 'ai_suggested_counter'
          : 'ai_suggested_decline';

    await supabase
      .from('group_booking_requests')
      .update({
        status: aiStatus,
        ai_recommendation: decision.recommendation,
        ai_reasoning: decision.reasoning,
        ai_expected_value: decision.expectedValue,
        ai_confidence: decision.confidence,
      })
      .eq('id', requestId);

    // If automation is full_auto or auto_routine for standard requests, auto-decide
    if (config.automationLevel === 'full_auto') {
      await updateBookingRequestStatus(
        requestId,
        decision.recommendation === 'accept' ? 'accepted' : 'declined',
        'ai_auto'
      );
    }

    return decision;
  } catch (error) {
    console.error('Error processing booking request:', error);
    return null;
  }
}

// =============================================================================
// PERFORMANCE TRACKING
// =============================================================================

export async function recordBookingPerformance(
  merchantId: string,
  performance: {
    date: string;
    slot: BookingSlot;
    totalCapacity?: number;
    groupCovers?: number;
    walkinCovers?: number;
    groupRevenue?: number;
    walkinRevenue?: number;
    isHoliday?: boolean;
    weatherConditions?: string;
    specialEvents?: string[];
  }
): Promise<boolean> {
  const totalCovers = (performance.groupCovers || 0) + (performance.walkinCovers || 0);
  const totalRevenue = (performance.groupRevenue || 0) + (performance.walkinRevenue || 0);
  const occupancyPercent = performance.totalCapacity
    ? (totalCovers / performance.totalCapacity) * 100
    : null;

  const { error } = await supabase.from('booking_performance_history').upsert(
    {
      merchant_id: merchantId,
      date: performance.date,
      slot: performance.slot,
      total_capacity: performance.totalCapacity,
      group_covers: performance.groupCovers || 0,
      walkin_covers: performance.walkinCovers || 0,
      total_covers: totalCovers,
      occupancy_percent: occupancyPercent,
      group_revenue: performance.groupRevenue || 0,
      walkin_revenue: performance.walkinRevenue || 0,
      total_revenue: totalRevenue,
      avg_group_spend: performance.groupCovers
        ? (performance.groupRevenue || 0) / performance.groupCovers
        : null,
      avg_walkin_spend: performance.walkinCovers
        ? (performance.walkinRevenue || 0) / performance.walkinCovers
        : null,
      day_of_week: new Date(performance.date).getDay(),
      is_holiday: performance.isHoliday || false,
      weather_conditions: performance.weatherConditions,
      special_events: performance.specialEvents || [],
    },
    {
      onConflict: 'merchant_id,date,slot',
    }
  );

  if (error) {
    console.error('Error recording booking performance:', error);
    return false;
  }

  return true;
}

export async function getBookingAnalytics(
  merchantId: string,
  fromDate: string,
  toDate: string
): Promise<BookingAnalytics> {
  const analytics: BookingAnalytics = {
    merchantId,
    period: { from: fromDate, to: toDate },
    totalRequests: 0,
    acceptedRequests: 0,
    declinedRequests: 0,
    acceptanceRate: 0,
    totalGroupRevenue: 0,
    avgGroupSize: 0,
    avgPricePerPerson: 0,
    popularSlots: { breakfast: 0, lunch: 0, dinner: 0 },
    topPartners: [],
  };

  // Get booking requests stats
  const { data: requests } = await supabase
    .from('group_booking_requests')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('requested_date', fromDate)
    .lte('requested_date', toDate);

  if (requests) {
    analytics.totalRequests = requests.length;
    analytics.acceptedRequests = requests.filter((r) => r.status === 'accepted').length;
    analytics.declinedRequests = requests.filter((r) => r.status === 'declined').length;
    analytics.acceptanceRate =
      analytics.totalRequests > 0
        ? (analytics.acceptedRequests / analytics.totalRequests) * 100
        : 0;

    const acceptedWithValue = requests.filter((r) => r.status === 'accepted' && r.total_value);
    analytics.totalGroupRevenue = acceptedWithValue.reduce(
      (sum, r) => sum + Number(r.total_value || 0),
      0
    );

    const acceptedWithSize = requests.filter((r) => r.status === 'accepted');
    analytics.avgGroupSize =
      acceptedWithSize.length > 0
        ? acceptedWithSize.reduce((sum, r) => sum + r.party_size, 0) / acceptedWithSize.length
        : 0;

    const withPrice = requests.filter((r) => r.price_per_person);
    analytics.avgPricePerPerson =
      withPrice.length > 0
        ? withPrice.reduce((sum, r) => sum + Number(r.price_per_person || 0), 0) / withPrice.length
        : 0;

    // Popular slots
    for (const req of requests) {
      if (
        req.requested_slot &&
        analytics.popularSlots[req.requested_slot as BookingSlot] !== undefined
      ) {
        analytics.popularSlots[req.requested_slot as BookingSlot]++;
      }
    }

    // Top partners
    const partnerStats: Record<
      string,
      { partnerType: PartnerType; count: number; revenue: number }
    > = {};
    for (const req of acceptedWithValue) {
      if (req.partner_id) {
        if (!partnerStats[req.partner_id]) {
          partnerStats[req.partner_id] = {
            partnerType: req.partner_type as PartnerType,
            count: 0,
            revenue: 0,
          };
        }
        partnerStats[req.partner_id].count++;
        partnerStats[req.partner_id].revenue += Number(req.total_value || 0);
      }
    }

    analytics.topPartners = Object.entries(partnerStats)
      .map(([partnerId, stats]) => ({
        partnerId,
        partnerType: stats.partnerType,
        bookingsCount: stats.count,
        totalRevenue: stats.revenue,
      }))
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);
  }

  return analytics;
}
