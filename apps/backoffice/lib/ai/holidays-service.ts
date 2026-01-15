// Holidays Intelligence Service
// Provides holiday data for AI Co-Manager context and business insights
// Feature: HOLIDAYS-DB (P2)

import { supabase } from '@/lib/supabase';

// =============================================================================
// TYPES
// =============================================================================

export type HolidayType =
  | 'national'
  | 'religious'
  | 'local'
  | 'regional'
  | 'sporting'
  | 'cultural'
  | 'observance'
  | 'school'
  | 'bank';

export type ImpactLevel = 'critical' | 'high' | 'medium' | 'low' | 'none';

export type HolidaySource = 'manual' | 'api' | 'merchant' | 'ai_discovered';

export interface Holiday {
  id: string;
  countryCode: string;
  regionCode?: string;
  city?: string;
  date: string;
  name: string;
  nameEn?: string;
  type: HolidayType;
  impactLevel: ImpactLevel;
  isPublicHoliday: boolean;
  isBankHoliday: boolean;
  isRecurring: boolean;
  recurrenceRule?: string;
  notes?: string;
  businessNotes?: string;
  source: HolidaySource;
  isVerified: boolean;
  daysUntil?: number;
}

export interface MerchantHolidayOverride {
  id: string;
  merchantId: string;
  holidayId: string;
  customImpactLevel?: ImpactLevel;
  isClosed?: boolean;
  specialHours?: string;
  customNotes?: string;
  expectedRevenueChange?: number;
  expectedTrafficChange?: number;
}

export interface MerchantCustomHoliday {
  id: string;
  merchantId: string;
  date: string;
  name: string;
  type: 'anniversary' | 'local_event' | 'sports' | 'convention' | 'school' | 'other';
  impactLevel: ImpactLevel;
  isClosed: boolean;
  specialHours?: string;
  notes?: string;
  isRecurring: boolean;
}

export interface DateImpact {
  date: string;
  holidays: Holiday[];
  customHolidays: MerchantCustomHoliday[];
  overallImpact: ImpactLevel;
  isClosed: boolean;
  specialHours?: string;
  aiSummary: string;
  recommendations: string[];
}

export interface UpcomingHolidaysContext {
  nextHoliday?: Holiday;
  upcomingWeek: Holiday[];
  upcomingMonth: Holiday[];
  criticalAlerts: Holiday[];
  aiContext: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function mapHolidayFromDb(row: Record<string, unknown>): Holiday {
  return {
    id: row.id as string,
    countryCode: row.country_code as string,
    regionCode: row.region_code as string | undefined,
    city: row.city as string | undefined,
    date: row.date as string,
    name: row.name as string,
    nameEn: row.name_en as string | undefined,
    type: row.type as HolidayType,
    impactLevel: row.impact_level as ImpactLevel,
    isPublicHoliday: row.is_public_holiday as boolean,
    isBankHoliday: row.is_bank_holiday as boolean,
    isRecurring: row.is_recurring as boolean,
    recurrenceRule: row.recurrence_rule as string | undefined,
    notes: row.notes as string | undefined,
    businessNotes: row.business_notes as string | undefined,
    source: row.source as HolidaySource,
    isVerified: row.is_verified as boolean,
    daysUntil: row.days_until as number | undefined,
  };
}

function mapCustomHolidayFromDb(row: Record<string, unknown>): MerchantCustomHoliday {
  return {
    id: row.id as string,
    merchantId: row.merchant_id as string,
    date: row.date as string,
    name: row.name as string,
    type: row.type as MerchantCustomHoliday['type'],
    impactLevel: row.impact_level as ImpactLevel,
    isClosed: row.is_closed as boolean,
    specialHours: row.special_hours as string | undefined,
    notes: row.notes as string | undefined,
    isRecurring: row.is_recurring as boolean,
  };
}

function getHighestImpact(levels: ImpactLevel[]): ImpactLevel {
  const order: ImpactLevel[] = ['critical', 'high', 'medium', 'low', 'none'];
  for (const level of order) {
    if (levels.includes(level)) return level;
  }
  return 'none';
}

// =============================================================================
// CORE FUNCTIONS
// =============================================================================

/**
 * Get upcoming holidays for a country/region
 */
export async function getUpcomingHolidays(
  countryCode: string,
  options?: {
    regionCode?: string;
    city?: string;
    daysAhead?: number;
    limit?: number;
  }
): Promise<Holiday[]> {
  const daysAhead = options?.daysAhead ?? 90;
  const limit = options?.limit ?? 20;

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + daysAhead);

  let query = supabase
    .from('holidays')
    .select('*')
    .eq('country_code', countryCode)
    .gte('date', new Date().toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .order('date', { ascending: true })
    .limit(limit);

  if (options?.regionCode) {
    query = query.or(`region_code.eq.${options.regionCode},region_code.is.null`);
  }

  if (options?.city) {
    query = query.or(`city.eq.${options.city},city.is.null`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Holidays] Error fetching upcoming holidays:', error);
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (data || []).map((row) => {
    const holiday = mapHolidayFromDb(row);
    const holidayDate = new Date(holiday.date);
    holidayDate.setHours(0, 0, 0, 0);
    holiday.daysUntil = Math.ceil(
      (holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return holiday;
  });
}

/**
 * Get holidays for a specific date
 */
export async function getHolidaysForDate(
  date: string,
  countryCode: string,
  options?: { regionCode?: string; city?: string }
): Promise<Holiday[]> {
  let query = supabase
    .from('holidays')
    .select('*')
    .eq('country_code', countryCode)
    .eq('date', date);

  if (options?.regionCode) {
    query = query.or(`region_code.eq.${options.regionCode},region_code.is.null`);
  }

  if (options?.city) {
    query = query.or(`city.eq.${options.city},city.is.null`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Holidays] Error fetching holidays for date:', error);
    return [];
  }

  return (data || []).map(mapHolidayFromDb);
}

/**
 * Get merchant custom holidays
 */
export async function getMerchantCustomHolidays(
  merchantId: string,
  options?: { daysAhead?: number }
): Promise<MerchantCustomHoliday[]> {
  const daysAhead = options?.daysAhead ?? 90;

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + daysAhead);

  const { data, error } = await supabase
    .from('merchant_custom_holidays')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('date', new Date().toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) {
    console.error('[Holidays] Error fetching custom holidays:', error);
    return [];
  }

  return (data || []).map(mapCustomHolidayFromDb);
}

/**
 * Create a custom holiday for a merchant
 */
export async function createCustomHoliday(
  merchantId: string,
  holiday: Omit<MerchantCustomHoliday, 'id' | 'merchantId'>
): Promise<MerchantCustomHoliday | null> {
  const { data, error } = await supabase
    .from('merchant_custom_holidays')
    .insert({
      merchant_id: merchantId,
      date: holiday.date,
      name: holiday.name,
      type: holiday.type,
      impact_level: holiday.impactLevel,
      is_closed: holiday.isClosed,
      special_hours: holiday.specialHours,
      notes: holiday.notes,
      is_recurring: holiday.isRecurring,
    })
    .select()
    .single();

  if (error) {
    console.error('[Holidays] Error creating custom holiday:', error);
    return null;
  }

  return mapCustomHolidayFromDb(data);
}

/**
 * Delete a custom holiday
 */
export async function deleteCustomHoliday(holidayId: string): Promise<boolean> {
  const { error } = await supabase.from('merchant_custom_holidays').delete().eq('id', holidayId);

  if (error) {
    console.error('[Holidays] Error deleting custom holiday:', error);
    return false;
  }

  return true;
}

/**
 * Get the business impact for a specific date
 */
export async function getDateImpact(
  date: string,
  merchantId: string,
  countryCode: string,
  options?: { regionCode?: string; city?: string }
): Promise<DateImpact> {
  // Get global holidays for this date
  const holidays = await getHolidaysForDate(date, countryCode, options);

  // Get merchant custom holidays for this date
  const { data: customData } = await supabase
    .from('merchant_custom_holidays')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('date', date);

  const customHolidays = (customData || []).map(mapCustomHolidayFromDb);

  // Get any merchant overrides for these holidays
  const holidayIds = holidays.map((h) => h.id);
  let overrides: MerchantHolidayOverride[] = [];

  if (holidayIds.length > 0) {
    const { data: overridesData } = await supabase
      .from('merchant_holiday_overrides')
      .select('*')
      .eq('merchant_id', merchantId)
      .in('holiday_id', holidayIds);

    overrides = (overridesData || []).map((row) => ({
      id: row.id,
      merchantId: row.merchant_id,
      holidayId: row.holiday_id,
      customImpactLevel: row.custom_impact_level,
      isClosed: row.is_closed,
      specialHours: row.special_hours,
      customNotes: row.custom_notes,
      expectedRevenueChange: row.expected_revenue_change,
      expectedTrafficChange: row.expected_traffic_change,
    }));
  }

  // Calculate overall impact
  const allImpacts: ImpactLevel[] = [
    ...holidays.map((h) => {
      const override = overrides.find((o) => o.holidayId === h.id);
      return override?.customImpactLevel ?? h.impactLevel;
    }),
    ...customHolidays.map((ch) => ch.impactLevel),
  ];

  const overallImpact = allImpacts.length > 0 ? getHighestImpact(allImpacts) : 'none';

  // Check if closed
  const isClosed = overrides.some((o) => o.isClosed) || customHolidays.some((ch) => ch.isClosed);

  // Get special hours
  const specialHours =
    overrides.find((o) => o.specialHours)?.specialHours ||
    customHolidays.find((ch) => ch.specialHours)?.specialHours;

  // Generate AI summary
  const holidayNames = [
    ...holidays.map((h) => h.nameEn || h.name),
    ...customHolidays.map((ch) => ch.name),
  ];

  let aiSummary = '';
  if (holidayNames.length === 0) {
    aiSummary = 'Regular business day with no notable holidays.';
  } else if (isClosed) {
    aiSummary = `Closed for ${holidayNames.join(', ')}.`;
  } else {
    aiSummary = `${holidayNames.join(', ')} - expect ${overallImpact} impact on business.`;
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (overallImpact === 'critical' && !isClosed) {
    recommendations.push('Consider modified hours or special menu');
    recommendations.push('Plan inventory for unusual demand patterns');
  }
  if (overallImpact === 'high') {
    recommendations.push('Expect significant traffic changes');
    recommendations.push('Consider promotional activities');
  }
  if (holidays.some((h) => h.type === 'observance')) {
    recommendations.push('Good opportunity for themed marketing');
  }

  return {
    date,
    holidays,
    customHolidays,
    overallImpact,
    isClosed,
    specialHours,
    aiSummary,
    recommendations,
  };
}

/**
 * Get upcoming holidays context for AI
 */
export async function getUpcomingHolidaysContext(
  countryCode: string,
  options?: { regionCode?: string; city?: string; merchantId?: string }
): Promise<UpcomingHolidaysContext> {
  const today = new Date();
  const oneWeek = new Date(today);
  oneWeek.setDate(oneWeek.getDate() + 7);
  const oneMonth = new Date(today);
  oneMonth.setDate(oneMonth.getDate() + 30);

  // Get upcoming holidays
  const upcomingMonth = await getUpcomingHolidays(countryCode, {
    regionCode: options?.regionCode,
    city: options?.city,
    daysAhead: 30,
    limit: 20,
  });

  const upcomingWeek = upcomingMonth.filter((h) => new Date(h.date) <= oneWeek);

  const nextHoliday = upcomingMonth[0];

  const criticalAlerts = upcomingMonth.filter(
    (h) => h.impactLevel === 'critical' && new Date(h.date) <= oneWeek
  );

  // Build AI context string
  let aiContext = '';

  if (criticalAlerts.length > 0) {
    aiContext += `⚠️ CRITICAL: ${criticalAlerts.map((h) => `${h.nameEn || h.name} on ${h.date}`).join(', ')}. `;
  }

  if (nextHoliday) {
    const daysUntil = Math.ceil(
      (new Date(nextHoliday.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    aiContext += `Next holiday: ${nextHoliday.nameEn || nextHoliday.name} in ${daysUntil} days (${nextHoliday.impactLevel} impact). `;
  }

  if (upcomingWeek.length > 1) {
    aiContext += `This week: ${upcomingWeek.length} holidays. `;
  }

  if (upcomingMonth.length > upcomingWeek.length) {
    const remaining = upcomingMonth.length - upcomingWeek.length;
    aiContext += `Next 30 days: ${remaining} more holidays coming.`;
  }

  if (!aiContext) {
    aiContext = 'No significant holidays in the next 30 days.';
  }

  return {
    nextHoliday,
    upcomingWeek,
    upcomingMonth,
    criticalAlerts,
    aiContext,
  };
}

/**
 * Search holidays by name
 */
export async function searchHolidays(
  query: string,
  options?: { countryCode?: string; limit?: number }
): Promise<Holiday[]> {
  const limit = options?.limit ?? 20;

  let dbQuery = supabase
    .from('holidays')
    .select('*')
    .or(`name.ilike.%${query}%,name_en.ilike.%${query}%`)
    .order('date', { ascending: true })
    .limit(limit);

  if (options?.countryCode) {
    dbQuery = dbQuery.eq('country_code', options.countryCode);
  }

  const { data, error } = await dbQuery;

  if (error) {
    console.error('[Holidays] Error searching holidays:', error);
    return [];
  }

  return (data || []).map(mapHolidayFromDb);
}

/**
 * Get all holidays for a year
 */
export async function getHolidaysForYear(year: number, countryCode: string): Promise<Holiday[]> {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const { data, error } = await supabase
    .from('holidays')
    .select('*')
    .eq('country_code', countryCode)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });

  if (error) {
    console.error('[Holidays] Error fetching holidays for year:', error);
    return [];
  }

  return (data || []).map(mapHolidayFromDb);
}

// =============================================================================
// AI CONTEXT EXPORT
// =============================================================================

/**
 * Get a simple text summary for AI context injection
 */
export async function getHolidaysAIContext(
  countryCode: string,
  options?: { regionCode?: string; city?: string }
): Promise<string> {
  const context = await getUpcomingHolidaysContext(countryCode, options);
  return context.aiContext;
}
