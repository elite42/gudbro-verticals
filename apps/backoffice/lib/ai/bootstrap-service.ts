// AI Bootstrap Service
// Phase 6: Automatic setup for new merchants - zone analysis, competitor discovery

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export interface ZoneAnalysis {
  id: string;
  merchantId: string;
  locationId: string;

  // Location info
  address: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };

  // Zone characteristics
  zoneType: 'downtown' | 'residential' | 'tourist' | 'business' | 'mixed' | 'industrial';
  footTraffic: 'low' | 'medium' | 'high' | 'very_high';
  demographics: {
    primaryAge: string;
    incomeLevel: string;
    lifestyle: string[];
  };

  // Business environment
  nearbyPOIs: string[]; // Points of interest
  peakHours: string[];
  busyDays: string[];

  // AI recommendations
  recommendations: string[];

  createdAt: string;
}

export interface CompetitorProfile {
  id: string;
  merchantId: string;
  locationId: string;

  // Competitor info
  name: string;
  businessType: string;
  address?: string;
  distance?: number; // meters from merchant

  // Analysis
  priceRange: 'budget' | 'mid-range' | 'premium' | 'luxury';
  strengths: string[];
  weaknesses: string[];
  popularItems: string[];

  // Differentiation opportunities
  differentiators: string[];

  // Source
  source: 'google_places' | 'manual' | 'ai_discovery';

  createdAt: string;
}

export interface BootstrapResult {
  merchantId: string;
  locationId: string;
  zoneAnalysis: ZoneAnalysis;
  competitors: CompetitorProfile[];
  suggestedMenu: {
    categories: string[];
    priceRange: { min: number; max: number };
    mustHaveItems: string[];
  };
  marketingTips: string[];
  operationalTips: string[];
  completedAt: string;
}

// Analyze zone for a new merchant location
export async function analyzeZone(
  merchantId: string,
  locationId: string,
  locationData: {
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    businessType?: string;
  }
): Promise<ZoneAnalysis> {
  const openai = getOpenAIClient();

  const prompt = `Analyze this business location and provide zone characteristics:

Location: ${locationData.address}, ${locationData.city}, ${locationData.country}
Coordinates: ${locationData.latitude}, ${locationData.longitude}
Business Type: ${locationData.businessType || 'restaurant/bar'}

Based on the location, provide a JSON analysis:
{
  "zoneType": "downtown|residential|tourist|business|mixed|industrial",
  "footTraffic": "low|medium|high|very_high",
  "demographics": {
    "primaryAge": "18-25|25-35|35-50|50+|mixed",
    "incomeLevel": "low|medium|high|mixed",
    "lifestyle": ["young professionals", "families", "tourists", "students", etc.]
  },
  "nearbyPOIs": ["offices", "hotels", "shopping centers", "universities", etc.],
  "peakHours": ["12:00-14:00", "18:00-21:00", etc.],
  "busyDays": ["Friday", "Saturday", etc.],
  "recommendations": [
    "Consider offering lunch specials for office workers",
    "Tourist-friendly menu with English translations",
    etc.
  ]
}

Be specific to the actual location if you recognize it. If not, make reasonable assumptions based on the city and area type.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a location analyst for restaurants and bars. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = {
        zoneType: 'mixed',
        footTraffic: 'medium',
        demographics: { primaryAge: 'mixed', incomeLevel: 'medium', lifestyle: [] },
        nearbyPOIs: [],
        peakHours: ['12:00-14:00', '19:00-22:00'],
        busyDays: ['Friday', 'Saturday'],
        recommendations: [],
      };
    }

    const analysis: ZoneAnalysis = {
      id: crypto.randomUUID(),
      merchantId,
      locationId,
      address: locationData.address,
      city: locationData.city,
      country: locationData.country,
      coordinates: { lat: locationData.latitude, lng: locationData.longitude },
      zoneType: parsed.zoneType || 'mixed',
      footTraffic: parsed.footTraffic || 'medium',
      demographics: parsed.demographics || {
        primaryAge: 'mixed',
        incomeLevel: 'medium',
        lifestyle: [],
      },
      nearbyPOIs: parsed.nearbyPOIs || [],
      peakHours: parsed.peakHours || [],
      busyDays: parsed.busyDays || [],
      recommendations: parsed.recommendations || [],
      createdAt: new Date().toISOString(),
    };

    // Save to database
    await supabase.from('ai_zone_analysis').insert({
      id: analysis.id,
      merchant_id: merchantId,
      location_id: locationId,
      address: analysis.address,
      city: analysis.city,
      country: analysis.country,
      coordinates: analysis.coordinates,
      zone_type: analysis.zoneType,
      foot_traffic: analysis.footTraffic,
      demographics: analysis.demographics,
      nearby_pois: analysis.nearbyPOIs,
      peak_hours: analysis.peakHours,
      busy_days: analysis.busyDays,
      recommendations: analysis.recommendations,
      created_at: analysis.createdAt,
    });

    return analysis;
  } catch (error) {
    console.error('Zone analysis failed:', error);
    throw error;
  }
}

// Discover and analyze competitors
export async function discoverCompetitors(
  merchantId: string,
  locationId: string,
  locationData: {
    address: string;
    city: string;
    country: string;
    businessType?: string;
  }
): Promise<CompetitorProfile[]> {
  const openai = getOpenAIClient();

  const prompt = `Identify likely competitors for a ${locationData.businessType || 'restaurant/bar'} in ${locationData.address}, ${locationData.city}, ${locationData.country}.

List 5-8 likely competitor types/profiles in this area. For each, provide:
{
  "competitors": [
    {
      "name": "Generic name or type (e.g., 'Italian Trattoria nearby', 'Sports Bar on Main Street')",
      "businessType": "italian_restaurant|sports_bar|cafe|etc",
      "priceRange": "budget|mid-range|premium|luxury",
      "strengths": ["established reputation", "good location", etc.],
      "weaknesses": ["outdated menu", "slow service", etc.],
      "popularItems": ["pizza", "pasta", "cocktails", etc.],
      "differentiators": ["Ways this new business can stand out from this competitor"]
    }
  ]
}

Be realistic about what competitors typically exist in this type of area.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a competitive analysis expert. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 1200,
    });

    const responseText = completion.choices[0]?.message?.content || '{"competitors":[]}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { competitors: [] };
    }

    const competitors: CompetitorProfile[] = (parsed.competitors || []).map((c: any) => ({
      id: crypto.randomUUID(),
      merchantId,
      locationId,
      name: c.name || 'Unknown Competitor',
      businessType: c.businessType || 'restaurant',
      priceRange: c.priceRange || 'mid-range',
      strengths: c.strengths || [],
      weaknesses: c.weaknesses || [],
      popularItems: c.popularItems || [],
      differentiators: c.differentiators || [],
      source: 'ai_discovery' as const,
      createdAt: new Date().toISOString(),
    }));

    // Save to database
    if (competitors.length > 0) {
      await supabase.from('ai_competitor_profiles').insert(
        competitors.map((c) => ({
          id: c.id,
          merchant_id: c.merchantId,
          location_id: c.locationId,
          name: c.name,
          business_type: c.businessType,
          price_range: c.priceRange,
          strengths: c.strengths,
          weaknesses: c.weaknesses,
          popular_items: c.popularItems,
          differentiators: c.differentiators,
          source: c.source,
          created_at: c.createdAt,
        }))
      );
    }

    return competitors;
  } catch (error) {
    console.error('Competitor discovery failed:', error);
    throw error;
  }
}

// Full bootstrap for a new merchant
export async function bootstrapMerchant(
  merchantId: string,
  locationId: string
): Promise<BootstrapResult> {
  // Get location data
  const { data: location } = await supabase
    .from('locations')
    .select('*')
    .eq('id', locationId)
    .single();

  if (!location) {
    throw new Error('Location not found');
  }

  // Get merchant data
  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  const locationData = {
    address: location.address || '',
    city: location.city || '',
    country: location.country || '',
    latitude: location.latitude || 0,
    longitude: location.longitude || 0,
    businessType: merchant?.business_type,
  };

  // Run analyses in parallel
  const [zoneAnalysis, competitors] = await Promise.all([
    analyzeZone(merchantId, locationId, locationData),
    discoverCompetitors(merchantId, locationId, locationData),
  ]);

  // Generate additional recommendations based on analyses
  const openai = getOpenAIClient();

  const recommendationsPrompt = `Based on this zone analysis and competitor landscape, provide actionable recommendations:

Zone: ${zoneAnalysis.zoneType} area with ${zoneAnalysis.footTraffic} foot traffic
Demographics: ${JSON.stringify(zoneAnalysis.demographics)}
Peak hours: ${zoneAnalysis.peakHours.join(', ')}
Competitors: ${competitors.length} identified, mostly ${competitors.map((c) => c.priceRange).join(', ')} range

Provide JSON:
{
  "suggestedMenu": {
    "categories": ["appetizers", "mains", etc.],
    "priceRange": { "min": 8, "max": 25 },
    "mustHaveItems": ["signature dish", "local favorite", etc.]
  },
  "marketingTips": ["Focus on Instagram for young professionals", etc.],
  "operationalTips": ["Staff up for Friday dinner rush", etc.]
}`;

  let recommendations = {
    suggestedMenu: { categories: [], priceRange: { min: 10, max: 30 }, mustHaveItems: [] },
    marketingTips: [],
    operationalTips: [],
  };

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a restaurant consultant. Respond with valid JSON only.',
        },
        { role: 'user', content: recommendationsPrompt },
      ],
      temperature: 0.6,
      max_tokens: 600,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      recommendations = JSON.parse(cleanJson);
    } catch {
      // Keep defaults
    }
  } catch (error) {
    console.error('Recommendations generation failed:', error);
  }

  const result: BootstrapResult = {
    merchantId,
    locationId,
    zoneAnalysis,
    competitors,
    suggestedMenu: recommendations.suggestedMenu || {
      categories: [],
      priceRange: { min: 10, max: 30 },
      mustHaveItems: [],
    },
    marketingTips: recommendations.marketingTips || [],
    operationalTips: recommendations.operationalTips || [],
    completedAt: new Date().toISOString(),
  };

  // Save bootstrap result
  await supabase.from('ai_bootstrap_results').insert({
    id: crypto.randomUUID(),
    merchant_id: merchantId,
    location_id: locationId,
    zone_analysis_id: zoneAnalysis.id,
    competitor_count: competitors.length,
    suggested_menu: result.suggestedMenu,
    marketing_tips: result.marketingTips,
    operational_tips: result.operationalTips,
    completed_at: result.completedAt,
  });

  return result;
}

// Get existing bootstrap data for a merchant
export async function getBootstrapData(
  merchantId: string,
  locationId?: string
): Promise<{
  zoneAnalysis: ZoneAnalysis | null;
  competitors: CompetitorProfile[];
  bootstrapResult: BootstrapResult | null;
}> {
  // Get zone analysis
  let zoneQuery = supabase
    .from('ai_zone_analysis')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (locationId) {
    zoneQuery = zoneQuery.eq('location_id', locationId);
  }

  const { data: zoneData } = await zoneQuery;
  const zoneAnalysis = zoneData?.[0]
    ? {
        id: zoneData[0].id,
        merchantId: zoneData[0].merchant_id,
        locationId: zoneData[0].location_id,
        address: zoneData[0].address,
        city: zoneData[0].city,
        country: zoneData[0].country,
        coordinates: zoneData[0].coordinates,
        zoneType: zoneData[0].zone_type,
        footTraffic: zoneData[0].foot_traffic,
        demographics: zoneData[0].demographics,
        nearbyPOIs: zoneData[0].nearby_pois,
        peakHours: zoneData[0].peak_hours,
        busyDays: zoneData[0].busy_days,
        recommendations: zoneData[0].recommendations,
        createdAt: zoneData[0].created_at,
      }
    : null;

  // Get competitors
  let competitorQuery = supabase
    .from('ai_competitor_profiles')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (locationId) {
    competitorQuery = competitorQuery.eq('location_id', locationId);
  }

  const { data: competitorData } = await competitorQuery;
  const competitors = (competitorData || []).map((c) => ({
    id: c.id,
    merchantId: c.merchant_id,
    locationId: c.location_id,
    name: c.name,
    businessType: c.business_type,
    address: c.address,
    distance: c.distance,
    priceRange: c.price_range,
    strengths: c.strengths,
    weaknesses: c.weaknesses,
    popularItems: c.popular_items,
    differentiators: c.differentiators,
    source: c.source,
    createdAt: c.created_at,
  }));

  // Get bootstrap result
  let bootstrapQuery = supabase
    .from('ai_bootstrap_results')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('completed_at', { ascending: false })
    .limit(1);

  if (locationId) {
    bootstrapQuery = bootstrapQuery.eq('location_id', locationId);
  }

  const { data: bootstrapData } = await bootstrapQuery;
  const bootstrapResult =
    bootstrapData?.[0] && zoneAnalysis
      ? {
          merchantId,
          locationId: bootstrapData[0].location_id,
          zoneAnalysis,
          competitors,
          suggestedMenu: bootstrapData[0].suggested_menu,
          marketingTips: bootstrapData[0].marketing_tips,
          operationalTips: bootstrapData[0].operational_tips,
          completedAt: bootstrapData[0].completed_at,
        }
      : null;

  return { zoneAnalysis, competitors, bootstrapResult };
}
