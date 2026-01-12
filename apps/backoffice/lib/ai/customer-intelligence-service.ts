// AI Customer Intelligence Service
// Part of AI-ZONE-INTEL feature
// Manages CLV estimation, churn risk prediction, and customer segmentation

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// =============================================================================
// TYPES
// =============================================================================

export type CustomerSegment =
  | 'champion'
  | 'loyal'
  | 'potential'
  | 'new'
  | 'at_risk'
  | 'dormant'
  | 'lost';

export type ChurnRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface CustomerIntelligence {
  id: string;
  accountId: string;
  merchantId: string;

  // Customer Lifetime Value
  clvEstimated: number | null;
  clvConfidence: number | null;
  clvCalculatedAt: string | null;

  // Churn Risk
  churnRiskScore: number | null;
  churnRiskLevel: ChurnRiskLevel | null;
  churnFactors: string[];
  daysSinceLastVisit: number | null;
  predictedDaysToChurn: number | null;

  // Segmentation
  segment: CustomerSegment | null;
  segmentConfidence: number | null;

  // Predictions
  predictedNextVisitAt: string | null;
  predictedNextOrderValue: number | null;
  predictedMonthlySpend: number | null;

  // Patterns
  visitPattern: VisitPattern;
  orderPattern: OrderPattern;

  // AI Recommendations
  recommendedActions: RecommendedAction[];

  // Metadata
  lastSyncedFromAnalyticsAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VisitPattern {
  preferredDays?: string[];
  preferredTimeSlots?: string[];
  averageFrequencyDays?: number;
  seasonality?: Record<string, number>;
  lastVisitAt?: string;
}

export interface OrderPattern {
  averageOrderValue?: number;
  preferredCategories?: string[];
  preferredItems?: string[];
  upsellRate?: number;
  tipPercentage?: number;
}

export interface RecommendedAction {
  type: 'promo' | 'notification' | 'loyalty' | 'winback' | 'upsell';
  priority: number;
  title: string;
  description: string;
  expectedRoi?: number;
  suggestedTiming?: string;
}

export interface CustomerIntelligenceSummary {
  merchantId: string;
  totalCustomers: number;
  bySegment: Record<CustomerSegment, number>;
  highRiskCount: number;
  avgClv: number;
  totalClv: number;
}

export interface CustomerAtRisk {
  accountId: string;
  email: string;
  name: string;
  churnRiskScore: number;
  churnRiskLevel: ChurnRiskLevel;
  daysSinceLastVisit: number;
  clvEstimated: number;
  segment: CustomerSegment;
  recommendedActions: RecommendedAction[];
}

// =============================================================================
// CORE FUNCTIONS
// =============================================================================

/**
 * Get customer intelligence for a specific customer-merchant pair
 */
export async function getCustomerIntelligence(
  merchantId: string,
  accountId: string
): Promise<CustomerIntelligence | null> {
  const { data, error } = await supabase
    .from('ai_customer_intelligence')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('account_id', accountId)
    .single();

  if (error || !data) return null;

  return mapDbToCustomerIntelligence(data);
}

/**
 * Get all customer intelligence for a merchant
 */
export async function getMerchantCustomerIntelligence(
  merchantId: string,
  options: {
    segment?: CustomerSegment;
    churnRiskLevel?: ChurnRiskLevel;
    minClv?: number;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ customers: CustomerIntelligence[]; total: number }> {
  let query = supabase
    .from('ai_customer_intelligence')
    .select('*', { count: 'exact' })
    .eq('merchant_id', merchantId)
    .order('clv_estimated', { ascending: false, nullsFirst: false });

  if (options.segment) {
    query = query.eq('segment', options.segment);
  }

  if (options.churnRiskLevel) {
    query = query.eq('churn_risk_level', options.churnRiskLevel);
  }

  if (options.minClv) {
    query = query.gte('clv_estimated', options.minClv);
  }

  const limit = options.limit || 50;
  const offset = options.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error('Error fetching customer intelligence:', error);
    return { customers: [], total: 0 };
  }

  return {
    customers: (data || []).map(mapDbToCustomerIntelligence),
    total: count || 0,
  };
}

/**
 * Get customers at risk of churning (uses database function)
 */
export async function getCustomersAtRisk(
  merchantId: string,
  riskLevels: ChurnRiskLevel[] = ['high', 'critical']
): Promise<CustomerAtRisk[]> {
  const { data, error } = await supabase.rpc('get_customers_at_risk', {
    p_merchant_id: merchantId,
    p_risk_levels: riskLevels,
  });

  if (error) {
    console.error('Error fetching customers at risk:', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    accountId: row.account_id,
    email: row.account_email || '',
    name: row.account_name || '',
    churnRiskScore: row.churn_risk_score,
    churnRiskLevel: row.churn_risk_level,
    daysSinceLastVisit: row.days_since_last_visit,
    clvEstimated: row.clv_estimated,
    segment: row.segment,
    recommendedActions: row.recommended_actions || [],
  }));
}

/**
 * Get intelligence summary for a merchant
 */
export async function getIntelligenceSummary(
  merchantId: string
): Promise<CustomerIntelligenceSummary | null> {
  const { data, error } = await supabase
    .from('v_customer_intelligence_summary')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (error || !data) return null;

  return {
    merchantId: data.merchant_id,
    totalCustomers: data.total_customers || 0,
    bySegment: {
      champion: data.champions || 0,
      loyal: data.loyal || 0,
      potential: data.potential || 0,
      new: 0, // View doesn't include 'new' segment count
      at_risk: data.at_risk || 0,
      dormant: data.dormant || 0,
      lost: data.lost || 0,
    },
    highRiskCount: data.high_risk_count || 0,
    avgClv: parseFloat(data.avg_clv) || 0,
    totalClv: parseFloat(data.total_clv) || 0,
  };
}

// =============================================================================
// SYNC FUNCTIONS
// =============================================================================

/**
 * Sync customer intelligence from follower_analytics
 */
export async function syncFromFollowerAnalytics(merchantId: string): Promise<number> {
  const { data, error } = await supabase.rpc('sync_customer_intelligence_from_analytics', {
    p_merchant_id: merchantId,
  });

  if (error) {
    console.error('Error syncing from analytics:', error);
    return 0;
  }

  return data || 0;
}

// =============================================================================
// AI ANALYSIS FUNCTIONS
// =============================================================================

/**
 * Calculate CLV for a customer using AI and historical data
 */
export async function calculateCustomerCLV(
  merchantId: string,
  accountId: string
): Promise<{ clv: number; confidence: number }> {
  // Fetch customer's order history
  const { data: orders } = await supabase
    .from('orders')
    .select('total_amount, created_at')
    .eq('merchant_id', merchantId)
    .eq('account_id', accountId)
    .eq('status', 'completed')
    .order('created_at', { ascending: true });

  if (!orders || orders.length === 0) {
    return { clv: 0, confidence: 0.1 };
  }

  // Simple CLV calculation based on historical spend
  const totalSpend = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const avgOrderValue = totalSpend / orders.length;

  // Calculate frequency
  const firstOrder = new Date(orders[0].created_at);
  const lastOrder = new Date(orders[orders.length - 1].created_at);
  const daysActive = Math.max(
    1,
    (lastOrder.getTime() - firstOrder.getTime()) / (1000 * 60 * 60 * 24)
  );
  const ordersPerMonth = (orders.length / daysActive) * 30;

  // Estimate 24-month CLV
  const estimatedMonthlySpend = avgOrderValue * ordersPerMonth;
  const clv = estimatedMonthlySpend * 24;

  // Confidence based on data points
  const confidence = Math.min(0.95, 0.3 + orders.length * 0.05);

  // Update database
  await supabase.from('ai_customer_intelligence').upsert(
    {
      merchant_id: merchantId,
      account_id: accountId,
      clv_estimated: clv,
      clv_confidence: confidence,
      clv_calculated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'account_id,merchant_id',
    }
  );

  return { clv, confidence };
}

/**
 * Calculate churn risk for a customer
 */
export async function calculateChurnRisk(
  merchantId: string,
  accountId: string
): Promise<{ score: number; level: ChurnRiskLevel; factors: string[] }> {
  const factors: string[] = [];

  // Fetch customer's last visit
  const { data: analytics } = await supabase
    .from('follower_analytics')
    .select('last_visit_at, visit_count, total_spent')
    .eq('merchant_id', merchantId)
    .eq('account_id', accountId)
    .single();

  if (!analytics) {
    return { score: 0.5, level: 'medium', factors: ['No visit history available'] };
  }

  let riskScore = 0;

  // Factor 1: Days since last visit
  const daysSinceVisit = analytics.last_visit_at
    ? Math.floor((Date.now() - new Date(analytics.last_visit_at).getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  if (daysSinceVisit > 90) {
    riskScore += 0.4;
    factors.push(`No visit in ${daysSinceVisit} days`);
  } else if (daysSinceVisit > 60) {
    riskScore += 0.3;
    factors.push(`Last visit ${daysSinceVisit} days ago`);
  } else if (daysSinceVisit > 30) {
    riskScore += 0.15;
    factors.push(`Last visit ${daysSinceVisit} days ago`);
  }

  // Factor 2: Visit frequency decline
  const visitCount = analytics.visit_count || 0;
  if (visitCount === 1) {
    riskScore += 0.2;
    factors.push('Only visited once');
  }

  // Factor 3: Low engagement
  const totalSpent = analytics.total_spent || 0;
  if (visitCount > 0 && totalSpent / visitCount < 20) {
    riskScore += 0.1;
    factors.push('Low average spend per visit');
  }

  // Normalize score
  riskScore = Math.min(1, riskScore);

  // Determine level
  let level: ChurnRiskLevel;
  if (riskScore >= 0.75) {
    level = 'critical';
  } else if (riskScore >= 0.5) {
    level = 'high';
  } else if (riskScore >= 0.25) {
    level = 'medium';
  } else {
    level = 'low';
  }

  // Update database
  await supabase.from('ai_customer_intelligence').upsert(
    {
      merchant_id: merchantId,
      account_id: accountId,
      churn_risk_score: riskScore,
      churn_risk_level: level,
      churn_factors: factors,
      days_since_last_visit: daysSinceVisit,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'account_id,merchant_id',
    }
  );

  return { score: riskScore, level, factors };
}

/**
 * Determine customer segment based on behavior
 */
export async function determineCustomerSegment(
  merchantId: string,
  accountId: string
): Promise<{ segment: CustomerSegment; confidence: number }> {
  // Fetch analytics
  const { data: analytics } = await supabase
    .from('follower_analytics')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('account_id', accountId)
    .single();

  if (!analytics) {
    return { segment: 'new', confidence: 0.5 };
  }

  const visitCount = analytics.visit_count || 0;
  const totalSpent = analytics.total_spent || 0;
  const lastVisit = analytics.last_visit_at ? new Date(analytics.last_visit_at) : null;
  const firstVisit = analytics.first_visit_at ? new Date(analytics.first_visit_at) : null;

  const daysSinceLastVisit = lastVisit
    ? Math.floor((Date.now() - lastVisit.getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  const customerAge = firstVisit
    ? Math.floor((Date.now() - firstVisit.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  let segment: CustomerSegment;
  let confidence = 0.7;

  // Segmentation logic
  if (customerAge < 30 && visitCount <= 2) {
    segment = 'new';
    confidence = 0.9;
  } else if (daysSinceLastVisit > 180) {
    segment = 'lost';
    confidence = 0.85;
  } else if (daysSinceLastVisit > 90) {
    segment = 'dormant';
    confidence = 0.8;
  } else if (daysSinceLastVisit > 45 && visitCount > 3) {
    segment = 'at_risk';
    confidence = 0.75;
  } else if (visitCount >= 10 && totalSpent > 500) {
    segment = 'champion';
    confidence = 0.9;
  } else if (visitCount >= 5 && totalSpent > 200) {
    segment = 'loyal';
    confidence = 0.85;
  } else {
    segment = 'potential';
    confidence = 0.7;
  }

  // Update database
  await supabase.from('ai_customer_intelligence').upsert(
    {
      merchant_id: merchantId,
      account_id: accountId,
      segment,
      segment_confidence: confidence,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'account_id,merchant_id',
    }
  );

  return { segment, confidence };
}

/**
 * Generate AI-powered action recommendations for a customer
 */
export async function generateRecommendedActions(
  merchantId: string,
  accountId: string
): Promise<RecommendedAction[]> {
  const openai = getOpenAIClient();

  // Fetch customer intelligence and analytics
  const [intelligence, analytics] = await Promise.all([
    getCustomerIntelligence(merchantId, accountId),
    supabase
      .from('follower_analytics')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('account_id', accountId)
      .single()
      .then(({ data }) => data),
  ]);

  if (!intelligence && !analytics) {
    return [];
  }

  const prompt = `Analyze this customer and suggest 2-3 specific actions to improve retention and revenue.

Customer Data:
- Segment: ${intelligence?.segment || 'unknown'}
- CLV Estimated: $${intelligence?.clvEstimated?.toFixed(2) || 'unknown'}
- Churn Risk: ${intelligence?.churnRiskLevel || 'unknown'} (${((intelligence?.churnRiskScore || 0) * 100).toFixed(0)}%)
- Days Since Last Visit: ${intelligence?.daysSinceLastVisit || 'unknown'}
- Total Visits: ${analytics?.visit_count || 0}
- Total Spent: $${analytics?.total_spent?.toFixed(2) || '0'}

Respond with JSON array:
[{
  "type": "promo" | "notification" | "loyalty" | "winback" | "upsell",
  "priority": 1-5 (1 is highest),
  "title": "Short action title",
  "description": "Detailed description of the action",
  "expectedRoi": percentage number,
  "suggestedTiming": "When to execute this action"
}]`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a customer retention AI. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '[]';
    const cleanJson = responseText
      .replace(/```json?\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const actions: RecommendedAction[] = JSON.parse(cleanJson);

    // Update database with recommendations
    await supabase.from('ai_customer_intelligence').upsert(
      {
        merchant_id: merchantId,
        account_id: accountId,
        recommended_actions: actions,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'account_id,merchant_id',
      }
    );

    return actions;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}

/**
 * Run full intelligence analysis for a customer
 */
export async function analyzeCustomer(
  merchantId: string,
  accountId: string
): Promise<CustomerIntelligence | null> {
  // Run all analyses in parallel
  await Promise.all([
    calculateCustomerCLV(merchantId, accountId),
    calculateChurnRisk(merchantId, accountId),
    determineCustomerSegment(merchantId, accountId),
  ]);

  // Generate recommendations based on updated data
  await generateRecommendedActions(merchantId, accountId);

  // Return updated intelligence
  return getCustomerIntelligence(merchantId, accountId);
}

/**
 * Batch analyze all customers for a merchant
 */
export async function analyzeAllCustomers(
  merchantId: string,
  options: { batchSize?: number } = {}
): Promise<{ analyzed: number; errors: number }> {
  const batchSize = options.batchSize || 50;
  let analyzed = 0;
  let errors = 0;

  // First sync from analytics
  await syncFromFollowerAnalytics(merchantId);

  // Get all customers with analytics data
  const { data: customers } = await supabase
    .from('follower_analytics')
    .select('account_id')
    .eq('merchant_id', merchantId);

  if (!customers) return { analyzed: 0, errors: 0 };

  // Process in batches
  for (let i = 0; i < customers.length; i += batchSize) {
    const batch = customers.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (customer) => {
        try {
          await analyzeCustomer(merchantId, customer.account_id);
          analyzed++;
        } catch (error) {
          console.error(`Error analyzing customer ${customer.account_id}:`, error);
          errors++;
        }
      })
    );
  }

  return { analyzed, errors };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function mapDbToCustomerIntelligence(data: any): CustomerIntelligence {
  return {
    id: data.id,
    accountId: data.account_id,
    merchantId: data.merchant_id,
    clvEstimated: data.clv_estimated,
    clvConfidence: data.clv_confidence,
    clvCalculatedAt: data.clv_calculated_at,
    churnRiskScore: data.churn_risk_score,
    churnRiskLevel: data.churn_risk_level,
    churnFactors: data.churn_factors || [],
    daysSinceLastVisit: data.days_since_last_visit,
    predictedDaysToChurn: data.predicted_days_to_churn,
    segment: data.segment,
    segmentConfidence: data.segment_confidence,
    predictedNextVisitAt: data.predicted_next_visit_at,
    predictedNextOrderValue: data.predicted_next_order_value,
    predictedMonthlySpend: data.predicted_monthly_spend,
    visitPattern: data.visit_pattern || {},
    orderPattern: data.order_pattern || {},
    recommendedActions: data.recommended_actions || [],
    lastSyncedFromAnalyticsAt: data.last_synced_from_analytics_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
