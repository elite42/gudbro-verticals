// AI Market Intelligence Service
// Phase 7: Price comparison, partnership finder, market trends

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export interface PriceComparison {
  id: string;
  merchantId: string;
  itemName: string;
  itemCategory: string;
  merchantPrice: number;
  currency: string;

  // Market data
  marketAverage: number;
  marketLow: number;
  marketHigh: number;
  pricePosition: 'below_market' | 'at_market' | 'above_market';
  percentageDiff: number; // vs market average

  // Recommendations
  recommendation: 'keep' | 'increase' | 'decrease' | 'review';
  reasoning: string;

  createdAt: string;
}

export interface PartnershipOpportunity {
  id: string;
  merchantId: string;

  // Partner info
  partnerType: 'supplier' | 'delivery' | 'event' | 'cross_promo' | 'influencer' | 'local_business';
  partnerName: string;
  partnerDescription: string;

  // Opportunity details
  opportunityType: string;
  potentialBenefit: string;
  estimatedValue?: string;
  effort: 'low' | 'medium' | 'high';

  // Contact info (if available)
  contactInfo?: string;

  // Status
  status: 'suggested' | 'interested' | 'contacted' | 'in_progress' | 'completed' | 'declined';

  createdAt: string;
  updatedAt: string;
}

export interface MarketTrend {
  id: string;
  merchantId: string;
  category: 'food' | 'beverage' | 'service' | 'marketing' | 'technology';

  trendName: string;
  description: string;
  relevance: 'high' | 'medium' | 'low';

  // Actionable insight
  howToApply: string;
  estimatedImpact: string;

  // Source
  source: 'ai_analysis' | 'industry_report' | 'social_trends';

  createdAt: string;
  expiresAt?: string;
}

// Analyze pricing for menu items
export async function analyzePricing(
  merchantId: string,
  items: Array<{
    name: string;
    category: string;
    price: number;
    currency?: string;
  }>,
  context: {
    city: string;
    country: string;
    businessType?: string;
    priceSegment?: string;
  }
): Promise<PriceComparison[]> {
  const openai = getOpenAIClient();

  const prompt = `Analyze menu pricing for a ${context.businessType || 'restaurant'} in ${context.city}, ${context.country}.
${context.priceSegment ? `Price segment: ${context.priceSegment}` : ''}

Menu items to analyze:
${items.map((i) => `- ${i.name} (${i.category}): ${i.currency || 'EUR'} ${i.price}`).join('\n')}

For each item, provide market comparison in JSON:
{
  "comparisons": [
    {
      "itemName": "item name",
      "itemCategory": "category",
      "merchantPrice": 12.50,
      "marketAverage": 14.00,
      "marketLow": 10.00,
      "marketHigh": 18.00,
      "pricePosition": "below_market|at_market|above_market",
      "percentageDiff": -10.7,
      "recommendation": "keep|increase|decrease|review",
      "reasoning": "Brief explanation"
    }
  ]
}

Base your analysis on typical pricing for this type of establishment in this location.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a restaurant pricing analyst. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0]?.message?.content || '{"comparisons":[]}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { comparisons: [] };
    }

    const comparisons: PriceComparison[] = (parsed.comparisons || []).map((c: any) => ({
      id: crypto.randomUUID(),
      merchantId,
      itemName: c.itemName || '',
      itemCategory: c.itemCategory || '',
      merchantPrice: c.merchantPrice || 0,
      currency: items[0]?.currency || 'EUR',
      marketAverage: c.marketAverage || 0,
      marketLow: c.marketLow || 0,
      marketHigh: c.marketHigh || 0,
      pricePosition: c.pricePosition || 'at_market',
      percentageDiff: c.percentageDiff || 0,
      recommendation: c.recommendation || 'keep',
      reasoning: c.reasoning || '',
      createdAt: new Date().toISOString(),
    }));

    // Save to database
    if (comparisons.length > 0) {
      await supabase.from('ai_price_comparisons').insert(
        comparisons.map((c) => ({
          id: c.id,
          merchant_id: c.merchantId,
          item_name: c.itemName,
          item_category: c.itemCategory,
          merchant_price: c.merchantPrice,
          currency: c.currency,
          market_average: c.marketAverage,
          market_low: c.marketLow,
          market_high: c.marketHigh,
          price_position: c.pricePosition,
          percentage_diff: c.percentageDiff,
          recommendation: c.recommendation,
          reasoning: c.reasoning,
          created_at: c.createdAt,
        }))
      );
    }

    return comparisons;
  } catch (error) {
    console.error('Price analysis failed:', error);
    throw error;
  }
}

// Discover partnership opportunities
export async function discoverPartnerships(
  merchantId: string,
  context: {
    businessType: string;
    city: string;
    country: string;
    cuisineType?: string;
    targetAudience?: string;
  }
): Promise<PartnershipOpportunity[]> {
  const openai = getOpenAIClient();

  const prompt = `Suggest partnership opportunities for a ${context.businessType} in ${context.city}, ${context.country}.
${context.cuisineType ? `Cuisine: ${context.cuisineType}` : ''}
${context.targetAudience ? `Target audience: ${context.targetAudience}` : ''}

Suggest 5-8 partnership opportunities in JSON:
{
  "partnerships": [
    {
      "partnerType": "supplier|delivery|event|cross_promo|influencer|local_business",
      "partnerName": "Generic name or type",
      "partnerDescription": "Brief description",
      "opportunityType": "What type of partnership",
      "potentialBenefit": "What the merchant gains",
      "estimatedValue": "Potential value/savings (if quantifiable)",
      "effort": "low|medium|high"
    }
  ]
}

Focus on realistic, actionable opportunities for this market.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a business development consultant. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 1200,
    });

    const responseText = completion.choices[0]?.message?.content || '{"partnerships":[]}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { partnerships: [] };
    }

    const now = new Date().toISOString();
    const partnerships: PartnershipOpportunity[] = (parsed.partnerships || []).map((p: any) => ({
      id: crypto.randomUUID(),
      merchantId,
      partnerType: p.partnerType || 'local_business',
      partnerName: p.partnerName || '',
      partnerDescription: p.partnerDescription || '',
      opportunityType: p.opportunityType || '',
      potentialBenefit: p.potentialBenefit || '',
      estimatedValue: p.estimatedValue,
      effort: p.effort || 'medium',
      status: 'suggested' as const,
      createdAt: now,
      updatedAt: now,
    }));

    // Save to database
    if (partnerships.length > 0) {
      await supabase.from('ai_partnership_opportunities').insert(
        partnerships.map((p) => ({
          id: p.id,
          merchant_id: p.merchantId,
          partner_type: p.partnerType,
          partner_name: p.partnerName,
          partner_description: p.partnerDescription,
          opportunity_type: p.opportunityType,
          potential_benefit: p.potentialBenefit,
          estimated_value: p.estimatedValue,
          effort: p.effort,
          status: p.status,
          created_at: p.createdAt,
          updated_at: p.updatedAt,
        }))
      );
    }

    return partnerships;
  } catch (error) {
    console.error('Partnership discovery failed:', error);
    throw error;
  }
}

// Get market trends
export async function getMarketTrends(
  merchantId: string,
  context: {
    businessType: string;
    city: string;
    country: string;
    cuisineType?: string;
  }
): Promise<MarketTrend[]> {
  const openai = getOpenAIClient();

  const prompt = `What are the current market trends relevant for a ${context.businessType} in ${context.city}, ${context.country}?
${context.cuisineType ? `Cuisine: ${context.cuisineType}` : ''}

Provide 5-7 actionable trends in JSON:
{
  "trends": [
    {
      "category": "food|beverage|service|marketing|technology",
      "trendName": "Trend name",
      "description": "Brief description",
      "relevance": "high|medium|low",
      "howToApply": "Specific way to apply this trend",
      "estimatedImpact": "Expected business impact"
    }
  ]
}

Focus on trends that are actionable and relevant to this specific business type and location.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a hospitality industry analyst. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content || '{"trends":[]}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { trends: [] };
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const trends: MarketTrend[] = (parsed.trends || []).map((t: any) => ({
      id: crypto.randomUUID(),
      merchantId,
      category: t.category || 'food',
      trendName: t.trendName || '',
      description: t.description || '',
      relevance: t.relevance || 'medium',
      howToApply: t.howToApply || '',
      estimatedImpact: t.estimatedImpact || '',
      source: 'ai_analysis' as const,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    }));

    // Save to database
    if (trends.length > 0) {
      await supabase.from('ai_market_trends').insert(
        trends.map((t) => ({
          id: t.id,
          merchant_id: t.merchantId,
          category: t.category,
          trend_name: t.trendName,
          description: t.description,
          relevance: t.relevance,
          how_to_apply: t.howToApply,
          estimated_impact: t.estimatedImpact,
          source: t.source,
          created_at: t.createdAt,
          expires_at: t.expiresAt,
        }))
      );
    }

    return trends;
  } catch (error) {
    console.error('Market trends analysis failed:', error);
    throw error;
  }
}

// Get existing market intelligence data
export async function getMarketIntelligence(merchantId: string): Promise<{
  priceComparisons: PriceComparison[];
  partnerships: PartnershipOpportunity[];
  trends: MarketTrend[];
}> {
  const [priceData, partnershipData, trendData] = await Promise.all([
    supabase
      .from('ai_price_comparisons')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('ai_partnership_opportunities')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('ai_market_trends')
      .select('*')
      .eq('merchant_id', merchantId)
      .gte('expires_at', new Date().toISOString())
      .order('relevance', { ascending: true })
      .limit(20),
  ]);

  return {
    priceComparisons: (priceData.data || []).map((c) => ({
      id: c.id,
      merchantId: c.merchant_id,
      itemName: c.item_name,
      itemCategory: c.item_category,
      merchantPrice: c.merchant_price,
      currency: c.currency,
      marketAverage: c.market_average,
      marketLow: c.market_low,
      marketHigh: c.market_high,
      pricePosition: c.price_position,
      percentageDiff: c.percentage_diff,
      recommendation: c.recommendation,
      reasoning: c.reasoning,
      createdAt: c.created_at,
    })),
    partnerships: (partnershipData.data || []).map((p) => ({
      id: p.id,
      merchantId: p.merchant_id,
      partnerType: p.partner_type,
      partnerName: p.partner_name,
      partnerDescription: p.partner_description,
      opportunityType: p.opportunity_type,
      potentialBenefit: p.potential_benefit,
      estimatedValue: p.estimated_value,
      effort: p.effort,
      contactInfo: p.contact_info,
      status: p.status,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    })),
    trends: (trendData.data || []).map((t) => ({
      id: t.id,
      merchantId: t.merchant_id,
      category: t.category,
      trendName: t.trend_name,
      description: t.description,
      relevance: t.relevance,
      howToApply: t.how_to_apply,
      estimatedImpact: t.estimated_impact,
      source: t.source,
      createdAt: t.created_at,
      expiresAt: t.expires_at,
    })),
  };
}

// Update partnership status
export async function updatePartnershipStatus(
  partnershipId: string,
  status: PartnershipOpportunity['status'],
  contactInfo?: string
): Promise<void> {
  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (contactInfo) {
    updateData.contact_info = contactInfo;
  }

  await supabase.from('ai_partnership_opportunities').update(updateData).eq('id', partnershipId);
}
