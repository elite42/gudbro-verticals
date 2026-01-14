// Conventions Service
// Part of B2B-CONVENTIONS feature
// Manages corporate partnerships (offices, gyms, schools) and voucher system

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// =============================================================================
// TYPES
// =============================================================================

export type OfficePartnerType = 'office' | 'gym' | 'school' | 'coworking' | 'hospital' | 'other';

export type Industry =
  | 'tech'
  | 'legal'
  | 'finance'
  | 'healthcare'
  | 'retail'
  | 'manufacturing'
  | 'education'
  | 'government'
  | 'other';

export type ConventionOutreachStatus =
  | 'suggested'
  | 'contacted'
  | 'meeting_scheduled'
  | 'negotiating'
  | 'active'
  | 'declined'
  | 'no_response';

export type BenefitType =
  | 'percentage_discount'
  | 'fixed_discount'
  | 'free_item'
  | 'special_price'
  | 'points_multiplier';

export type VerificationMethod = 'link' | 'qr_scan' | 'daily_code' | 'badge_id' | 'automatic';

export type MaxUsesPeriod = 'day' | 'week' | 'month' | 'total';

export type ConventionPartnerType =
  | 'tour_operator'
  | 'accommodation'
  | 'office'
  | 'gym'
  | 'school'
  | 'other';

export type ConventionDataSource = 'manual' | 'google_places' | 'ai_enriched' | 'linkedin';

export type WfhPolicy = 'full_office' | 'hybrid' | 'mostly_remote' | 'full_remote';

export type CanteenQuality = 'none' | 'basic' | 'good' | 'excellent';

export interface OfficePartner {
  id: string;
  companyName: string;
  industry: Industry | null;
  partnerType: OfficePartnerType;
  address: string | null;
  city: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  distanceToMerchantM: number | null;
  employeeCount: number | null;
  floorsOccupied: number | null;
  buildingName: string | null;
  hrContactName: string | null;
  hrContactEmail: string | null;
  hrContactPhone: string | null;
  officeManagerName: string | null;
  officeManagerEmail: string | null;
  officeManagerPhone: string | null;
  receptionPhone: string | null;
  hasCanteen: boolean;
  canteenQuality: CanteenQuality | null;
  lunchBreakStart: string | null;
  lunchBreakEnd: string | null;
  wfhPolicy: WfhPolicy | null;
  dataSource: ConventionDataSource | null;
  sourceId: string | null;
  isVerified: boolean;
  isActive: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OfficeOutreach {
  id: string;
  merchantId: string;
  officeId: string;
  status: ConventionOutreachStatus;
  proposedBenefitType: BenefitType | null;
  proposedBenefitValue: number | null;
  proposedBenefitDescription: string | null;
  firstContactAt: string | null;
  lastContactAt: string | null;
  meetingDate: string | null;
  meetingNotes: string | null;
  contractSignedAt: string | null;
  contactMethod: 'email' | 'phone' | 'in_person' | 'linkedin' | null;
  contactPerson: string | null;
  employeesEnrolled: number;
  monthlyVisits: number;
  monthlyRevenue: number;
  aiScore: number | null;
  aiRecommendation: string | null;
  aiReasoning: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  office?: OfficePartner;
}

export interface Convention {
  id: string;
  merchantId: string;
  partnerType: ConventionPartnerType;
  partnerId: string;
  partnerName: string;
  conventionName: string;
  conventionSlug: string | null;
  benefitType: BenefitType;
  benefitValue: number | null;
  benefitDescription: string | null;
  benefitConditions: string | null;
  freeItemId: string | null;
  validFrom: string;
  validUntil: string | null;
  validDays: number[];
  validTimeStart: string;
  validTimeEnd: string;
  verificationMethod: VerificationMethod;
  dailyCodePrefix: string | null;
  currentDailyCode: string | null;
  dailyCodeGeneratedAt: string | null;
  maxUsesTotal: number | null;
  maxUsesPerUser: number;
  maxUsesPeriod: MaxUsesPeriod;
  currentUses: number;
  minOrderAmount: number | null;
  minPartySize: number;
  isActive: boolean;
  pausedReason: string | null;
  totalRedemptions: number;
  totalRevenueGenerated: number;
  avgOrderValue: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Voucher {
  id: string;
  conventionId: string;
  merchantId: string;
  voucherCode: string;
  shortUrl: string | null;
  qrData: string | null;
  userId: string | null;
  userIdentifier: string | null;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  badgeNumber: string | null;
  validFrom: string;
  validUntil: string | null;
  maxUses: number;
  timesUsed: number;
  isActive: boolean;
  deactivatedAt: string | null;
  deactivatedReason: string | null;
  lastUsedAt: string | null;
  totalSavings: number;
  createdAt: string;
  createdBy: string | null;
}

export interface Redemption {
  id: string;
  voucherId: string | null;
  conventionId: string;
  merchantId: string;
  orderId: string | null;
  originalAmount: number | null;
  discountAmount: number | null;
  finalAmount: number | null;
  itemsSummary: string | null;
  partySize: number;
  verificationMethod: string;
  verificationCode: string | null;
  verifiedByStaff: string | null;
  posTerminalId: string | null;
  redeemedAt: string;
}

export interface ConventionsMetrics {
  merchantId: string;
  offices: {
    total: number;
    byStatus: Record<ConventionOutreachStatus, number>;
    totalEmployeesEnrolled: number;
  };
  conventions: {
    total: number;
    active: number;
    totalRedemptions: number;
    totalRevenue: number;
  };
  vouchers: {
    total: number;
    active: number;
    totalUsed: number;
  };
  monthlyRevenueEstimate: number;
}

export interface DiscoverOfficesInput {
  merchantId: string;
  city: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  radiusMeters?: number;
}

export interface DiscoveredOffice {
  name: string;
  industry: Industry;
  partnerType: OfficePartnerType;
  employeeCount: number;
  reason: string;
  potentialValue: number;
  confidence: number;
  hasCanteen: boolean;
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
// OFFICE PARTNERS
// =============================================================================

export async function listOfficePartners(options?: {
  city?: string;
  partnerType?: OfficePartnerType;
  industry?: Industry;
  maxDistanceM?: number;
  limit?: number;
  offset?: number;
}): Promise<OfficePartner[]> {
  let query = supabase
    .from('office_partners')
    .select('*')
    .eq('is_active', true)
    .order('company_name');

  if (options?.city) {
    query = query.eq('city', options.city);
  }
  if (options?.partnerType) {
    query = query.eq('partner_type', options.partnerType);
  }
  if (options?.industry) {
    query = query.eq('industry', options.industry);
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
    console.error('Error listing office partners:', error);
    return [];
  }

  return (data || []).map((row) => snakeToCamel<OfficePartner>(row));
}

export async function getOfficePartner(id: string): Promise<OfficePartner | null> {
  const { data, error } = await supabase.from('office_partners').select('*').eq('id', id).single();

  if (error) {
    console.error('Error getting office partner:', error);
    return null;
  }

  return snakeToCamel<OfficePartner>(data);
}

export async function createOfficePartner(
  input: Omit<OfficePartner, 'id' | 'createdAt' | 'updatedAt'>
): Promise<OfficePartner | null> {
  const snakeData = camelToSnake(input as unknown as Record<string, unknown>);

  const { data, error } = await supabase
    .from('office_partners')
    .insert(snakeData)
    .select()
    .single();

  if (error) {
    console.error('Error creating office partner:', error);
    return null;
  }

  return snakeToCamel<OfficePartner>(data);
}

// =============================================================================
// OFFICE OUTREACH
// =============================================================================

export async function listOfficeOutreach(
  merchantId: string,
  options?: {
    status?: ConventionOutreachStatus;
    limit?: number;
  }
): Promise<OfficeOutreach[]> {
  let query = supabase
    .from('merchant_office_outreach')
    .select(
      `
      *,
      office:office_partners(*)
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
    console.error('Error listing office outreach:', error);
    return [];
  }

  return (data || []).map((row) => {
    const outreach = snakeToCamel<OfficeOutreach>(row);
    if (row.office) {
      outreach.office = snakeToCamel<OfficePartner>(row.office);
    }
    return outreach;
  });
}

export async function createOfficeOutreach(
  merchantId: string,
  officeId: string,
  options?: {
    proposedBenefitType?: BenefitType;
    proposedBenefitValue?: number;
    proposedBenefitDescription?: string;
  }
): Promise<OfficeOutreach | null> {
  const { data, error } = await supabase
    .from('merchant_office_outreach')
    .insert({
      merchant_id: merchantId,
      office_id: officeId,
      status: 'suggested',
      proposed_benefit_type: options?.proposedBenefitType,
      proposed_benefit_value: options?.proposedBenefitValue,
      proposed_benefit_description: options?.proposedBenefitDescription,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating office outreach:', error);
    return null;
  }

  return snakeToCamel<OfficeOutreach>(data);
}

export async function updateOfficeOutreachStatus(
  id: string,
  newStatus: ConventionOutreachStatus,
  options?: {
    notes?: string;
    meetingDate?: string;
    meetingNotes?: string;
    contactMethod?: 'email' | 'phone' | 'in_person' | 'linkedin';
    contactPerson?: string;
  }
): Promise<boolean> {
  const updateData: Record<string, unknown> = {
    status: newStatus,
  };

  if (newStatus === 'contacted') {
    updateData.first_contact_at = new Date().toISOString();
    updateData.last_contact_at = new Date().toISOString();
  } else if (newStatus === 'meeting_scheduled' && options?.meetingDate) {
    updateData.meeting_date = options.meetingDate;
  } else if (newStatus === 'active') {
    updateData.contract_signed_at = new Date().toISOString().split('T')[0];
  }

  if (options?.notes) {
    updateData.notes = options.notes;
  }
  if (options?.meetingNotes) {
    updateData.meeting_notes = options.meetingNotes;
  }
  if (options?.contactMethod) {
    updateData.contact_method = options.contactMethod;
  }
  if (options?.contactPerson) {
    updateData.contact_person = options.contactPerson;
  }

  const { error } = await supabase.from('merchant_office_outreach').update(updateData).eq('id', id);

  if (error) {
    console.error('Error updating office outreach status:', error);
    return false;
  }

  return true;
}

// =============================================================================
// CONVENTIONS
// =============================================================================

export async function listConventions(
  merchantId: string,
  options?: {
    partnerType?: ConventionPartnerType;
    isActive?: boolean;
    limit?: number;
  }
): Promise<Convention[]> {
  let query = supabase
    .from('partner_conventions')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (options?.partnerType) {
    query = query.eq('partner_type', options.partnerType);
  }
  if (options?.isActive !== undefined) {
    query = query.eq('is_active', options.isActive);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing conventions:', error);
    return [];
  }

  return (data || []).map((row) => snakeToCamel<Convention>(row));
}

export async function getConvention(id: string): Promise<Convention | null> {
  const { data, error } = await supabase
    .from('partner_conventions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error getting convention:', error);
    return null;
  }

  return snakeToCamel<Convention>(data);
}

export async function createConvention(
  merchantId: string,
  input: {
    partnerType: ConventionPartnerType;
    partnerId: string;
    partnerName: string;
    conventionName: string;
    benefitType: BenefitType;
    benefitValue?: number;
    benefitDescription?: string;
    benefitConditions?: string;
    validFrom?: string;
    validUntil?: string;
    validDays?: number[];
    validTimeStart?: string;
    validTimeEnd?: string;
    verificationMethod?: VerificationMethod;
    dailyCodePrefix?: string;
    maxUsesTotal?: number;
    maxUsesPerUser?: number;
    maxUsesPeriod?: MaxUsesPeriod;
    minOrderAmount?: number;
    minPartySize?: number;
  }
): Promise<Convention | null> {
  const slug = input.conventionName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const { data, error } = await supabase
    .from('partner_conventions')
    .insert({
      merchant_id: merchantId,
      partner_type: input.partnerType,
      partner_id: input.partnerId,
      partner_name: input.partnerName,
      convention_name: input.conventionName,
      convention_slug: slug,
      benefit_type: input.benefitType,
      benefit_value: input.benefitValue,
      benefit_description: input.benefitDescription,
      benefit_conditions: input.benefitConditions,
      valid_from: input.validFrom || new Date().toISOString().split('T')[0],
      valid_until: input.validUntil,
      valid_days: input.validDays || [1, 2, 3, 4, 5],
      valid_time_start: input.validTimeStart || '00:00',
      valid_time_end: input.validTimeEnd || '23:59',
      verification_method: input.verificationMethod || 'link',
      daily_code_prefix: input.dailyCodePrefix,
      max_uses_total: input.maxUsesTotal,
      max_uses_per_user: input.maxUsesPerUser || 1,
      max_uses_period: input.maxUsesPeriod || 'day',
      min_order_amount: input.minOrderAmount,
      min_party_size: input.minPartySize || 1,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating convention:', error);
    return null;
  }

  return snakeToCamel<Convention>(data);
}

export async function updateConvention(
  id: string,
  updates: Partial<{
    conventionName: string;
    benefitType: BenefitType;
    benefitValue: number;
    benefitDescription: string;
    benefitConditions: string;
    validFrom: string;
    validUntil: string;
    validDays: number[];
    validTimeStart: string;
    validTimeEnd: string;
    verificationMethod: VerificationMethod;
    dailyCodePrefix: string;
    maxUsesTotal: number;
    maxUsesPerUser: number;
    maxUsesPeriod: MaxUsesPeriod;
    minOrderAmount: number;
    minPartySize: number;
    isActive: boolean;
    pausedReason: string;
  }>
): Promise<boolean> {
  const snakeUpdates = camelToSnake(updates as Record<string, unknown>);

  const { error } = await supabase.from('partner_conventions').update(snakeUpdates).eq('id', id);

  if (error) {
    console.error('Error updating convention:', error);
    return false;
  }

  return true;
}

export async function toggleConvention(
  id: string,
  isActive: boolean,
  pausedReason?: string
): Promise<boolean> {
  const { error } = await supabase
    .from('partner_conventions')
    .update({
      is_active: isActive,
      paused_reason: isActive ? null : pausedReason,
    })
    .eq('id', id);

  if (error) {
    console.error('Error toggling convention:', error);
    return false;
  }

  return true;
}

// =============================================================================
// VOUCHERS
// =============================================================================

export async function listVouchers(
  conventionId: string,
  options?: {
    isActive?: boolean;
    limit?: number;
  }
): Promise<Voucher[]> {
  let query = supabase
    .from('convention_vouchers')
    .select('*')
    .eq('convention_id', conventionId)
    .order('created_at', { ascending: false });

  if (options?.isActive !== undefined) {
    query = query.eq('is_active', options.isActive);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing vouchers:', error);
    return [];
  }

  return (data || []).map((row) => snakeToCamel<Voucher>(row));
}

export async function createVoucher(
  conventionId: string,
  merchantId: string,
  userData?: {
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    badgeNumber?: string;
    validUntil?: string;
    maxUses?: number;
  }
): Promise<Voucher | null> {
  // Generate voucher code using DB function
  const { data: codeData, error: codeError } = await supabase.rpc('generate_voucher_code', {
    prefix: 'CONV',
  });

  if (codeError || !codeData) {
    console.error('Error generating voucher code:', codeError);
    return null;
  }

  const voucherCode = codeData as string;

  const { data, error } = await supabase
    .from('convention_vouchers')
    .insert({
      convention_id: conventionId,
      merchant_id: merchantId,
      voucher_code: voucherCode,
      qr_data: voucherCode,
      user_name: userData?.userName,
      user_email: userData?.userEmail,
      user_phone: userData?.userPhone,
      badge_number: userData?.badgeNumber,
      valid_until: userData?.validUntil,
      max_uses: userData?.maxUses || 1,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating voucher:', error);
    return null;
  }

  return snakeToCamel<Voucher>(data);
}

export async function createBulkVouchers(
  conventionId: string,
  merchantId: string,
  count: number,
  options?: {
    validUntil?: string;
    maxUses?: number;
  }
): Promise<Voucher[]> {
  const vouchers: Voucher[] = [];

  for (let i = 0; i < count; i++) {
    const voucher = await createVoucher(conventionId, merchantId, {
      validUntil: options?.validUntil,
      maxUses: options?.maxUses,
    });
    if (voucher) {
      vouchers.push(voucher);
    }
  }

  return vouchers;
}

export async function deactivateVoucher(id: string, reason?: string): Promise<boolean> {
  const { error } = await supabase
    .from('convention_vouchers')
    .update({
      is_active: false,
      deactivated_at: new Date().toISOString(),
      deactivated_reason: reason,
    })
    .eq('id', id);

  if (error) {
    console.error('Error deactivating voucher:', error);
    return false;
  }

  return true;
}

// =============================================================================
// REDEMPTIONS
// =============================================================================

export async function redeemVoucher(
  voucherCode: string,
  merchantId: string,
  orderDetails: {
    originalAmount: number;
    discountAmount: number;
    finalAmount: number;
    itemsSummary?: string;
    partySize?: number;
    orderId?: string;
    verifiedByStaff?: string;
  }
): Promise<{ success: boolean; error?: string; redemption?: Redemption }> {
  // Validate voucher using DB function
  const { data: validationData, error: validationError } = await supabase.rpc('validate_voucher', {
    p_voucher_code: voucherCode,
    p_merchant_id: merchantId,
  });

  if (validationError) {
    console.error('Error validating voucher:', validationError);
    return { success: false, error: 'Validation failed' };
  }

  const validation = validationData?.[0];
  if (!validation?.is_valid) {
    return { success: false, error: validation?.error_message || 'Invalid voucher' };
  }

  // Create redemption record
  const { data, error } = await supabase
    .from('convention_redemptions')
    .insert({
      voucher_id: validation.voucher_id,
      convention_id: validation.convention_id,
      merchant_id: merchantId,
      order_id: orderDetails.orderId,
      original_amount: orderDetails.originalAmount,
      discount_amount: orderDetails.discountAmount,
      final_amount: orderDetails.finalAmount,
      items_summary: orderDetails.itemsSummary,
      party_size: orderDetails.partySize || 1,
      verification_method: 'voucher_code',
      verification_code: voucherCode,
      verified_by_staff: orderDetails.verifiedByStaff,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating redemption:', error);
    return { success: false, error: 'Failed to record redemption' };
  }

  return { success: true, redemption: snakeToCamel<Redemption>(data) };
}

export async function getRedemptionStats(
  merchantId: string,
  dateRange?: { start: string; end: string }
): Promise<{
  totalRedemptions: number;
  totalRevenue: number;
  totalDiscount: number;
  avgOrderValue: number;
  byConvention: Array<{
    conventionId: string;
    partnerName: string;
    count: number;
    revenue: number;
  }>;
}> {
  let query = supabase
    .from('convention_redemptions')
    .select(
      `
      id,
      convention_id,
      original_amount,
      discount_amount,
      final_amount,
      convention:partner_conventions(partner_name)
    `
    )
    .eq('merchant_id', merchantId);

  if (dateRange) {
    query = query.gte('redeemed_at', dateRange.start).lte('redeemed_at', dateRange.end);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error getting redemption stats:', error);
    return {
      totalRedemptions: 0,
      totalRevenue: 0,
      totalDiscount: 0,
      avgOrderValue: 0,
      byConvention: [],
    };
  }

  const stats = {
    totalRedemptions: data?.length || 0,
    totalRevenue: 0,
    totalDiscount: 0,
    avgOrderValue: 0,
    byConvention: [] as Array<{
      conventionId: string;
      partnerName: string;
      count: number;
      revenue: number;
    }>,
  };

  const conventionMap = new Map<string, { partnerName: string; count: number; revenue: number }>();

  for (const row of data || []) {
    stats.totalRevenue += Number(row.final_amount) || 0;
    stats.totalDiscount += Number(row.discount_amount) || 0;

    const existing = conventionMap.get(row.convention_id) || {
      partnerName: (row.convention as { partner_name?: string })?.partner_name || 'Unknown',
      count: 0,
      revenue: 0,
    };
    existing.count++;
    existing.revenue += Number(row.final_amount) || 0;
    conventionMap.set(row.convention_id, existing);
  }

  stats.avgOrderValue =
    stats.totalRedemptions > 0 ? stats.totalRevenue / stats.totalRedemptions : 0;

  for (const [conventionId, data] of conventionMap) {
    stats.byConvention.push({ conventionId, ...data });
  }

  return stats;
}

// =============================================================================
// METRICS
// =============================================================================

export async function getConventionsMetrics(merchantId: string): Promise<ConventionsMetrics> {
  const metrics: ConventionsMetrics = {
    merchantId,
    offices: {
      total: 0,
      byStatus: {
        suggested: 0,
        contacted: 0,
        meeting_scheduled: 0,
        negotiating: 0,
        active: 0,
        declined: 0,
        no_response: 0,
      },
      totalEmployeesEnrolled: 0,
    },
    conventions: {
      total: 0,
      active: 0,
      totalRedemptions: 0,
      totalRevenue: 0,
    },
    vouchers: {
      total: 0,
      active: 0,
      totalUsed: 0,
    },
    monthlyRevenueEstimate: 0,
  };

  // Get office outreach stats
  const { data: officeData } = await supabase
    .from('merchant_office_outreach')
    .select('status, employees_enrolled')
    .eq('merchant_id', merchantId);

  if (officeData) {
    metrics.offices.total = officeData.length;
    for (const row of officeData) {
      metrics.offices.byStatus[row.status as ConventionOutreachStatus]++;
      metrics.offices.totalEmployeesEnrolled += row.employees_enrolled || 0;
    }
  }

  // Get convention stats
  const { data: convData } = await supabase
    .from('partner_conventions')
    .select('is_active, total_redemptions, total_revenue_generated')
    .eq('merchant_id', merchantId);

  if (convData) {
    metrics.conventions.total = convData.length;
    for (const row of convData) {
      if (row.is_active) metrics.conventions.active++;
      metrics.conventions.totalRedemptions += row.total_redemptions || 0;
      metrics.conventions.totalRevenue += Number(row.total_revenue_generated) || 0;
    }
  }

  // Get voucher stats
  const { data: voucherData } = await supabase
    .from('convention_vouchers')
    .select('is_active, times_used')
    .eq('merchant_id', merchantId);

  if (voucherData) {
    metrics.vouchers.total = voucherData.length;
    for (const row of voucherData) {
      if (row.is_active) metrics.vouchers.active++;
      metrics.vouchers.totalUsed += row.times_used || 0;
    }
  }

  metrics.monthlyRevenueEstimate = metrics.conventions.totalRevenue / 12;

  return metrics;
}

// =============================================================================
// AI DISCOVERY
// =============================================================================

export async function discoverOffices(input: DiscoverOfficesInput): Promise<DiscoveredOffice[]> {
  const openai = getOpenAIClient();

  const prompt = `You are an AI assistant helping a restaurant find B2B corporate partnership opportunities.

Location: ${input.city}, ${input.countryCode}
${input.latitude && input.longitude ? `Coordinates: ${input.latitude}, ${input.longitude}` : ''}
${input.radiusMeters ? `Search radius: ${input.radiusMeters}m` : ''}

Suggest potential corporate partners for lunch conventions. Consider:
1. Tech companies (usually no canteen, employees eat out)
2. Law firms and financial services (high-value orders)
3. Coworking spaces (many freelancers, consistent flow)
4. Gyms and fitness centers (health-conscious menu opportunities)
5. Schools and universities (student discounts)
6. Hospitals and clinics (staff meal programs)

For each suggestion, provide:
- name: Realistic company name for this area
- industry: One of: tech, legal, finance, healthcare, retail, manufacturing, education, government, other
- partnerType: One of: office, gym, school, coworking, hospital, other
- employeeCount: Estimated number of employees
- hasCanteen: Whether they likely have an internal canteen
- reason: Why they would be a good partner
- potentialValue: Estimated monthly revenue in EUR
- confidence: Score 0-1 based on how likely this partnership would succeed

Generate 5-8 realistic suggestions. Respond in JSON format with array "offices".`;

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a B2B corporate partnership discovery assistant. Respond only with valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return [];

    const parsed = JSON.parse(content);
    return parsed.offices || parsed.suggestions || [];
  } catch (error) {
    console.error('Error discovering offices:', error);
    return [];
  }
}

export async function analyzeConventionPotential(
  merchantId: string,
  officeData: {
    companyName: string;
    industry: Industry;
    employeeCount: number;
    hasCanteen: boolean;
    distanceM?: number;
  }
): Promise<{
  score: number;
  potentialMonthlyRevenue: number;
  recommendedBenefit: BenefitType;
  recommendedValue: number;
  reasoning: string;
}> {
  const openai = getOpenAIClient();

  const prompt = `Analyze the convention potential for this corporate partnership:

Company: ${officeData.companyName}
Industry: ${officeData.industry}
Employees: ${officeData.employeeCount}
Has Canteen: ${officeData.hasCanteen ? 'Yes' : 'No'}
${officeData.distanceM ? `Distance: ${officeData.distanceM}m` : ''}

Assess:
1. Partnership potential score (0-100)
2. Estimated monthly revenue in EUR
3. Recommended benefit type (percentage_discount, fixed_discount, free_item, special_price)
4. Recommended benefit value (e.g., 10 for 10%, 2 for €2 off)
5. Reasoning for recommendations

Consider:
- Companies without canteens are more likely to use conventions
- Tech companies have higher per-meal spending
- Closer offices generate more visits
- Larger employee counts = more potential customers

Respond in JSON format with fields: score, potentialMonthlyRevenue, recommendedBenefit, recommendedValue, reasoning.`;

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a B2B partnership analyst. Respond only with valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return {
        score: 0,
        potentialMonthlyRevenue: 0,
        recommendedBenefit: 'percentage_discount',
        recommendedValue: 10,
        reasoning: 'Unable to analyze',
      };
    }

    const parsed = JSON.parse(content);
    return {
      score: parsed.score || 0,
      potentialMonthlyRevenue: parsed.potentialMonthlyRevenue || 0,
      recommendedBenefit: parsed.recommendedBenefit || 'percentage_discount',
      recommendedValue: parsed.recommendedValue || 10,
      reasoning: parsed.reasoning || '',
    };
  } catch (error) {
    console.error('Error analyzing convention potential:', error);
    return {
      score: 0,
      potentialMonthlyRevenue: 0,
      recommendedBenefit: 'percentage_discount',
      recommendedValue: 10,
      reasoning: 'Analysis failed',
    };
  }
}
