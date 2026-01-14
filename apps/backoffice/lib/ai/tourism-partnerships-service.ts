// Tourism Partnerships Service
// Part of TOURISM-B2B feature
// Manages tour operator and accommodation partnership discovery and outreach

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// =============================================================================
// TYPES
// =============================================================================

export type OperatorType =
  | 'bus_operator'
  | 'luxury'
  | 'religious'
  | 'cultural'
  | 'budget'
  | 'cruise'
  | 'mice'
  | 'school'
  | 'senior';

export type AccommodationType = 'hotel' | 'hostel' | 'airbnb_host' | 'b_and_b' | 'aparthotel';

export type OutreachStatus =
  | 'suggested'
  | 'contacted'
  | 'responded'
  | 'negotiating'
  | 'partnership_active'
  | 'declined'
  | 'no_response';

export type PartnershipType =
  | 'breakfast_convention'
  | 'lunch_convention'
  | 'dinner_convention'
  | 'discount_guests'
  | 'recommendation_only'
  | 'full_board';

export type VolumeEstimate = 'high' | 'medium' | 'low';

export type DataSource =
  | 'manual'
  | 'scraped'
  | 'ai_enriched'
  | 'google_maps'
  | 'booking'
  | 'airbnb';

export type FeedbackType =
  | 'contact_verified'
  | 'contact_wrong'
  | 'closed_business'
  | 'successful_deal'
  | 'declined'
  | 'wrong_info';

export interface TourOperator {
  id: string;
  name: string;
  countryCode: string;
  website: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  operatorType: OperatorType | null;
  regionsCovered: string[];
  poisVisited: string[];
  typicalGroupSizeMin: number | null;
  typicalGroupSizeMax: number | null;
  mealBudgetMin: number | null;
  mealBudgetMax: number | null;
  bookingMethod: string | null;
  volumeEstimate: VolumeEstimate | null;
  responseRate: number | null;
  dataSource: DataSource | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccommodationPartner {
  id: string;
  name: string;
  accommodationType: AccommodationType | null;
  address: string | null;
  city: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  distanceToMerchantM: number | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  website: string | null;
  roomCount: number | null;
  avgGuestsPerDay: number | null;
  starRating: number | null;
  propertiesCount: number | null;
  isSuperhost: boolean | null;
  guestNationalityMix: Record<string, number> | null;
  avgStayNights: number | null;
  businessVsLeisure: 'business' | 'leisure' | 'mixed' | null;
  needsBreakfast: boolean;
  needsLunch: boolean;
  needsDinner: boolean;
  needsRecommendations: boolean;
  dataSource: DataSource | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TouristPoi {
  id: string;
  name: string;
  slug: string;
  city: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  annualVisitors: number | null;
  peakSeasons: string[];
  typicalVisitDuration: number | null;
  mealOpportunity: 'lunch' | 'dinner' | 'both' | null;
  createdAt: string;
}

export interface TourOperatorOutreach {
  id: string;
  merchantId: string;
  operatorId: string;
  status: OutreachStatus;
  firstContactAt: string | null;
  lastContactAt: string | null;
  responseAt: string | null;
  outreachTemplateUsed: string | null;
  customMessage: string | null;
  partnershipTerms: Record<string, unknown> | null;
  bookingsGenerated: number;
  revenueGenerated: number;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  operator?: TourOperator;
}

export interface AccommodationOutreach {
  id: string;
  merchantId: string;
  accommodationId: string;
  status: OutreachStatus;
  partnershipType: PartnershipType | null;
  discountPercent: number | null;
  commissionPercent: number | null;
  fixedPriceMenu: number | null;
  firstContactAt: string | null;
  lastContactAt: string | null;
  responseAt: string | null;
  partnershipStartDate: string | null;
  partnershipEndDate: string | null;
  guestsReferred: number;
  revenueGenerated: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  accommodation?: AccommodationPartner;
}

export interface PartnerFeedback {
  id: string;
  partnerType: 'tour_operator' | 'accommodation';
  partnerId: string;
  merchantId: string;
  feedbackType: FeedbackType;
  notes: string | null;
  createdAt: string;
}

export interface PartnershipMetrics {
  merchantId: string;
  tourOperators: {
    total: number;
    byStatus: Record<OutreachStatus, number>;
    totalBookings: number;
    totalRevenue: number;
  };
  accommodations: {
    total: number;
    byStatus: Record<OutreachStatus, number>;
    totalGuestsReferred: number;
    totalRevenue: number;
  };
  activePartnerships: number;
  monthlyRevenueEstimate: number;
}

export interface DiscoverPartnersInput {
  merchantId: string;
  city: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  radiusMeters?: number;
}

export interface DiscoveredPartner {
  type: 'tour_operator' | 'accommodation';
  name: string;
  reason: string;
  potentialValue: number;
  confidence: number;
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

function camelToSnake(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    result[snakeKey] = obj[key];
  }
  return result;
}

// =============================================================================
// TOUR OPERATORS
// =============================================================================

export async function listTourOperators(options?: {
  countryCode?: string;
  operatorType?: OperatorType;
  limit?: number;
  offset?: number;
}): Promise<TourOperator[]> {
  let query = supabase.from('tour_operators').select('*').eq('is_active', true).order('name');

  if (options?.countryCode) {
    query = query.eq('country_code', options.countryCode);
  }
  if (options?.operatorType) {
    query = query.eq('operator_type', options.operatorType);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing tour operators:', error);
    return [];
  }

  return (data || []).map((row) => snakeToCamel<TourOperator>(row));
}

export async function getTourOperator(id: string): Promise<TourOperator | null> {
  const { data, error } = await supabase.from('tour_operators').select('*').eq('id', id).single();

  if (error) {
    console.error('Error getting tour operator:', error);
    return null;
  }

  return snakeToCamel<TourOperator>(data);
}

// =============================================================================
// ACCOMMODATION PARTNERS
// =============================================================================

export async function listAccommodationPartners(options?: {
  city?: string;
  accommodationType?: AccommodationType;
  maxDistanceM?: number;
  limit?: number;
  offset?: number;
}): Promise<AccommodationPartner[]> {
  let query = supabase
    .from('accommodation_partners')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (options?.city) {
    query = query.eq('city', options.city);
  }
  if (options?.accommodationType) {
    query = query.eq('accommodation_type', options.accommodationType);
  }
  if (options?.maxDistanceM) {
    query = query.lte('distance_to_merchant_m', options.maxDistanceM);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing accommodation partners:', error);
    return [];
  }

  return (data || []).map((row) => snakeToCamel<AccommodationPartner>(row));
}

export async function getAccommodationPartner(id: string): Promise<AccommodationPartner | null> {
  const { data, error } = await supabase
    .from('accommodation_partners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error getting accommodation partner:', error);
    return null;
  }

  return snakeToCamel<AccommodationPartner>(data);
}

// =============================================================================
// OUTREACH MANAGEMENT
// =============================================================================

export async function listTourOperatorOutreach(
  merchantId: string,
  options?: {
    status?: OutreachStatus;
    limit?: number;
  }
): Promise<TourOperatorOutreach[]> {
  let query = supabase
    .from('merchant_tour_operator_outreach')
    .select(
      `
      *,
      operator:tour_operators(*)
    `
    )
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing tour operator outreach:', error);
    return [];
  }

  return (data || []).map((row) => {
    const outreach = snakeToCamel<TourOperatorOutreach>(row);
    if (row.operator) {
      outreach.operator = snakeToCamel<TourOperator>(row.operator);
    }
    return outreach;
  });
}

export async function listAccommodationOutreach(
  merchantId: string,
  options?: {
    status?: OutreachStatus;
    limit?: number;
  }
): Promise<AccommodationOutreach[]> {
  let query = supabase
    .from('merchant_accommodation_outreach')
    .select(
      `
      *,
      accommodation:accommodation_partners(*)
    `
    )
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing accommodation outreach:', error);
    return [];
  }

  return (data || []).map((row) => {
    const outreach = snakeToCamel<AccommodationOutreach>(row);
    if (row.accommodation) {
      outreach.accommodation = snakeToCamel<AccommodationPartner>(row.accommodation);
    }
    return outreach;
  });
}

export async function createTourOperatorOutreach(
  merchantId: string,
  operatorId: string,
  options?: {
    templateUsed?: string;
    customMessage?: string;
  }
): Promise<TourOperatorOutreach | null> {
  const { data, error } = await supabase
    .from('merchant_tour_operator_outreach')
    .insert({
      merchant_id: merchantId,
      operator_id: operatorId,
      status: 'suggested',
      outreach_template_used: options?.templateUsed,
      custom_message: options?.customMessage,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating tour operator outreach:', error);
    return null;
  }

  return snakeToCamel<TourOperatorOutreach>(data);
}

export async function createAccommodationOutreach(
  merchantId: string,
  accommodationId: string,
  options?: {
    partnershipType?: PartnershipType;
    discountPercent?: number;
    commissionPercent?: number;
    fixedPriceMenu?: number;
  }
): Promise<AccommodationOutreach | null> {
  const { data, error } = await supabase
    .from('merchant_accommodation_outreach')
    .insert({
      merchant_id: merchantId,
      accommodation_id: accommodationId,
      status: 'suggested',
      partnership_type: options?.partnershipType,
      discount_percent: options?.discountPercent,
      commission_percent: options?.commissionPercent,
      fixed_price_menu: options?.fixedPriceMenu,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating accommodation outreach:', error);
    return null;
  }

  return snakeToCamel<AccommodationOutreach>(data);
}

export async function updateOutreachStatus(
  outreachId: string,
  type: 'tour_operator' | 'accommodation',
  newStatus: OutreachStatus,
  options?: {
    notes?: string;
    partnershipTerms?: Record<string, unknown>;
  }
): Promise<boolean> {
  const table =
    type === 'tour_operator'
      ? 'merchant_tour_operator_outreach'
      : 'merchant_accommodation_outreach';

  const updateData: Record<string, unknown> = {
    status: newStatus,
  };

  // Set timestamps based on status
  if (newStatus === 'contacted' && !options?.partnershipTerms) {
    updateData.first_contact_at = new Date().toISOString();
    updateData.last_contact_at = new Date().toISOString();
  } else if (newStatus === 'responded') {
    updateData.response_at = new Date().toISOString();
  }

  if (options?.partnershipTerms) {
    updateData.partnership_terms = options.partnershipTerms;
  }

  if (options?.notes && type === 'accommodation') {
    updateData.notes = options.notes;
  }

  const { error } = await supabase.from(table).update(updateData).eq('id', outreachId);

  if (error) {
    console.error('Error updating outreach status:', error);
    return false;
  }

  return true;
}

// =============================================================================
// METRICS
// =============================================================================

export async function getPartnershipMetrics(merchantId: string): Promise<PartnershipMetrics> {
  const metrics: PartnershipMetrics = {
    merchantId,
    tourOperators: {
      total: 0,
      byStatus: {
        suggested: 0,
        contacted: 0,
        responded: 0,
        negotiating: 0,
        partnership_active: 0,
        declined: 0,
        no_response: 0,
      },
      totalBookings: 0,
      totalRevenue: 0,
    },
    accommodations: {
      total: 0,
      byStatus: {
        suggested: 0,
        contacted: 0,
        responded: 0,
        negotiating: 0,
        partnership_active: 0,
        declined: 0,
        no_response: 0,
      },
      totalGuestsReferred: 0,
      totalRevenue: 0,
    },
    activePartnerships: 0,
    monthlyRevenueEstimate: 0,
  };

  // Get tour operator stats
  const { data: tourData } = await supabase
    .from('merchant_tour_operator_outreach')
    .select('status, bookings_generated, revenue_generated')
    .eq('merchant_id', merchantId);

  if (tourData) {
    metrics.tourOperators.total = tourData.length;
    for (const row of tourData) {
      metrics.tourOperators.byStatus[row.status as OutreachStatus]++;
      metrics.tourOperators.totalBookings += row.bookings_generated || 0;
      metrics.tourOperators.totalRevenue += Number(row.revenue_generated) || 0;
    }
  }

  // Get accommodation stats
  const { data: accomData } = await supabase
    .from('merchant_accommodation_outreach')
    .select('status, guests_referred, revenue_generated')
    .eq('merchant_id', merchantId);

  if (accomData) {
    metrics.accommodations.total = accomData.length;
    for (const row of accomData) {
      metrics.accommodations.byStatus[row.status as OutreachStatus]++;
      metrics.accommodations.totalGuestsReferred += row.guests_referred || 0;
      metrics.accommodations.totalRevenue += Number(row.revenue_generated) || 0;
    }
  }

  metrics.activePartnerships =
    metrics.tourOperators.byStatus.partnership_active +
    metrics.accommodations.byStatus.partnership_active;

  // Estimate monthly revenue from active partnerships
  metrics.monthlyRevenueEstimate =
    (metrics.tourOperators.totalRevenue + metrics.accommodations.totalRevenue) / 12;

  return metrics;
}

// =============================================================================
// PARTNER FEEDBACK (Network Effect)
// =============================================================================

export async function submitPartnerFeedback(
  merchantId: string,
  partnerType: 'tour_operator' | 'accommodation',
  partnerId: string,
  feedbackType: FeedbackType,
  notes?: string
): Promise<boolean> {
  const { error } = await supabase.from('partner_feedback').insert({
    merchant_id: merchantId,
    partner_type: partnerType,
    partner_id: partnerId,
    feedback_type: feedbackType,
    notes,
  });

  if (error) {
    console.error('Error submitting partner feedback:', error);
    return false;
  }

  return true;
}

// =============================================================================
// AI DISCOVERY
// =============================================================================

export async function discoverPartners(input: DiscoverPartnersInput): Promise<DiscoveredPartner[]> {
  const openai = getOpenAIClient();

  const prompt = `You are an AI assistant helping a restaurant find B2B partnership opportunities.

Location: ${input.city}, ${input.countryCode}
${input.latitude && input.longitude ? `Coordinates: ${input.latitude}, ${input.longitude}` : ''}
${input.radiusMeters ? `Search radius: ${input.radiusMeters}m` : ''}

Suggest potential tourism partners for this location. Consider:
1. Tour operators that visit this area (by country of origin)
2. Hotels and accommodations within walking distance
3. Hostels and budget accommodations for younger travelers
4. Airbnb hosts with multiple properties

For each suggestion, provide:
- Type (tour_operator or accommodation)
- Name (realistic example)
- Reason why they would be a good partner
- Potential monthly revenue value in EUR
- Confidence score (0-1)

Respond in JSON format with an array of partner suggestions.`;

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a B2B partnership discovery assistant. Respond only with valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return [];

    const parsed = JSON.parse(content);
    return parsed.partners || parsed.suggestions || [];
  } catch (error) {
    console.error('Error discovering partners:', error);
    return [];
  }
}

export async function analyzeTourismPotential(
  merchantId: string,
  merchantData: {
    name: string;
    city: string;
    cuisineType?: string;
    seatingCapacity?: number;
  }
): Promise<{
  score: number;
  reasons: string[];
  recommendations: string[];
}> {
  const openai = getOpenAIClient();

  const prompt = `Analyze the tourism potential for this restaurant:

Restaurant: ${merchantData.name}
Location: ${merchantData.city}
Cuisine: ${merchantData.cuisineType || 'Unknown'}
Capacity: ${merchantData.seatingCapacity || 'Unknown'} seats

Assess:
1. Tourism potential score (0-100)
2. Reasons for the score
3. Recommendations to maximize tourism revenue

Consider:
- Proximity to tourist attractions
- Cuisine appeal to international visitors
- Capacity for group bookings
- Potential for tour operator partnerships

Respond in JSON format.`;

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a tourism business analyst. Respond only with valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return { score: 0, reasons: [], recommendations: [] };
    }

    const parsed = JSON.parse(content);
    return {
      score: parsed.score || 0,
      reasons: parsed.reasons || [],
      recommendations: parsed.recommendations || [],
    };
  } catch (error) {
    console.error('Error analyzing tourism potential:', error);
    return { score: 0, reasons: [], recommendations: [] };
  }
}
