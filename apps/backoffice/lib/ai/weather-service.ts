// Weather Intelligence Service
// Provides weather data for AI Co-Manager context and business insights
// Uses Visual Crossing API with smart caching

import { supabase } from '@/lib/supabase';

// =============================================================================
// TYPES
// =============================================================================

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  conditions: string;
  conditionsIcon: string;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  visibility: number;
  updatedAt: string;
}

export interface DayForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  conditions: string;
  conditionsIcon: string;
  precipitationProbability: number;
  precipitationMm: number;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  description: string;
}

export interface HourlyForecast {
  hour: string;
  temp: number;
  conditions: string;
  precipitationProbability: number;
  precipitationMm: number;
}

export interface WeatherAlert {
  type: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
}

export interface StaffAdjustment {
  sala: number; // multiplier (0.7 = -30%, 1.2 = +20%)
  kitchen: number;
  delivery: number;
  bar: number;
}

export interface MenuSuggestion {
  category: 'comfort' | 'light' | 'hot_drinks' | 'cold_drinks' | 'soups' | 'salads';
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export type WeatherCategory =
  | 'cold_extreme' // < 0°C
  | 'cold' // 0-10°C
  | 'cool' // 10-18°C
  | 'optimal' // 18-25°C
  | 'warm' // 25-30°C
  | 'hot' // 30-35°C
  | 'hot_extreme' // > 35°C
  | 'rainy'
  | 'stormy'
  | 'snowy'
  | 'humid'; // > 80% humidity

export interface BusinessImpact {
  deliveryImpact: string;
  dineInImpact: string;
  outdoorSeating: boolean;
  recommendedActions: string[];
  peakHoursShift?: string;
  // New fields from knowledge base
  weatherCategory: WeatherCategory;
  staffAdjustment: StaffAdjustment;
  menuSuggestions: MenuSuggestion[];
  beverageFocus: 'hot' | 'cold' | 'mixed';
  comfortFoodCategories: string[];
  marketingHook?: string;
}

export interface WeatherData {
  locationId: string;
  current: CurrentWeather;
  forecast: DayForecast[];
  hourlyToday: HourlyForecast[];
  alerts: WeatherAlert[];
  businessImpact: BusinessImpact;
  cacheInfo: {
    currentAge: number; // minutes
    forecastAge: number;
    needsRefresh: boolean;
  };
}

export interface WeatherCacheFreshness {
  needsCurrentRefresh: boolean;
  needsForecastRefresh: boolean;
  currentAgeMinutes: number;
  forecastAgeMinutes: number;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const VISUAL_CROSSING_BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const CURRENT_TTL_MINUTES = 60; // 1 hour
const FORECAST_TTL_MINUTES = 360; // 6 hours

// Weather condition to emoji mapping
export const WEATHER_EMOJIS: Record<string, string> = {
  clear: '☀️',
  sunny: '☀️',
  'partly-cloudy-day': '⛅',
  'partly-cloudy-night': '☁️',
  cloudy: '☁️',
  overcast: '☁️',
  rain: '🌧️',
  'showers-day': '🌦️',
  'showers-night': '🌧️',
  'thunder-rain': '⛈️',
  'thunder-showers-day': '⛈️',
  storm: '⛈️',
  snow: '❄️',
  'snow-showers-day': '🌨️',
  fog: '🌫️',
  wind: '💨',
};

// =============================================================================
// VISUAL CROSSING API
// =============================================================================

interface VisualCrossingResponse {
  resolvedAddress: string;
  timezone: string;
  tzoffset: number;
  currentConditions: {
    temp: number;
    feelslike: number;
    humidity: number;
    conditions: string;
    icon: string;
    windspeed: number;
    winddir: number;
    uvindex: number;
    visibility: number;
    datetime: string;
  };
  days: Array<{
    datetime: string;
    tempmax: number;
    tempmin: number;
    conditions: string;
    icon: string;
    precip: number;
    precipprob: number;
    humidity: number;
    windspeed: number;
    sunrise: string;
    sunset: string;
    description: string;
    hours?: Array<{
      datetime: string;
      temp: number;
      conditions: string;
      icon: string;
      precipprob: number;
      precip: number;
    }>;
  }>;
  alerts?: Array<{
    event: string;
    headline: string;
    description: string;
    onset: string;
    ends: string;
    severity?: string;
  }>;
}

/**
 * Fetch weather data from Visual Crossing API
 */
async function fetchFromVisualCrossing(
  latitude: number,
  longitude: number,
  apiKey: string
): Promise<VisualCrossingResponse> {
  const location = `${latitude},${longitude}`;
  const url = `${VISUAL_CROSSING_BASE_URL}/${location}?unitGroup=metric&include=current,days,hours,alerts&key=${apiKey}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Visual Crossing API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Convert wind degrees to direction string
 */
function getWindDirection(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Get emoji for weather condition
 */
export function getWeatherEmoji(conditions: string): string {
  const key = conditions.toLowerCase().replace(/\s+/g, '-');
  return WEATHER_EMOJIS[key] || '🌡️';
}

/**
 * Determine weather category based on conditions and temperature
 * Based on AI Weather & Seasonal Knowledge Base
 */
function determineWeatherCategory(current: CurrentWeather): WeatherCategory {
  const conditions = current.conditions.toLowerCase();

  // Weather conditions take priority over temperature
  if (conditions.includes('storm') || conditions.includes('thunder')) {
    return 'stormy';
  }
  if (conditions.includes('snow') || conditions.includes('blizzard')) {
    return 'snowy';
  }
  if (
    conditions.includes('rain') ||
    conditions.includes('shower') ||
    conditions.includes('drizzle')
  ) {
    return 'rainy';
  }
  if (current.humidity > 80) {
    return 'humid';
  }

  // Temperature-based categories
  if (current.temp < 0) return 'cold_extreme';
  if (current.temp < 10) return 'cold';
  if (current.temp < 18) return 'cool';
  if (current.temp <= 25) return 'optimal';
  if (current.temp <= 30) return 'warm';
  if (current.temp <= 35) return 'hot';
  return 'hot_extreme';
}

/**
 * Get staff adjustment multipliers based on weather
 * Based on AI Weather & Seasonal Knowledge Base Section 4
 */
function getStaffAdjustment(category: WeatherCategory): StaffAdjustment {
  const adjustments: Record<WeatherCategory, StaffAdjustment> = {
    cold_extreme: { sala: 0.6, kitchen: 1.2, delivery: 1.3, bar: 0.7 },
    cold: { sala: 0.9, kitchen: 1.0, delivery: 1.1, bar: 0.9 },
    cool: { sala: 1.0, kitchen: 1.0, delivery: 1.0, bar: 1.0 },
    optimal: { sala: 1.1, kitchen: 1.05, delivery: 0.9, bar: 1.2 },
    warm: { sala: 1.0, kitchen: 1.0, delivery: 1.0, bar: 1.15 },
    hot: { sala: 0.85, kitchen: 1.0, delivery: 1.1, bar: 1.1 },
    hot_extreme: { sala: 0.7, kitchen: 0.9, delivery: 1.2, bar: 1.0 },
    rainy: { sala: 0.75, kitchen: 1.15, delivery: 1.2, bar: 0.9 },
    stormy: { sala: 0.6, kitchen: 1.2, delivery: 1.35, bar: 0.8 },
    snowy: { sala: 0.55, kitchen: 1.2, delivery: 1.3, bar: 0.8 },
    humid: { sala: 0.9, kitchen: 1.0, delivery: 1.15, bar: 1.0 },
  };
  return adjustments[category];
}

/**
 * Get menu suggestions based on weather category
 * Based on AI Weather & Seasonal Knowledge Base Section 3
 */
function getMenuSuggestions(category: WeatherCategory): MenuSuggestion[] {
  const suggestions: Record<WeatherCategory, MenuSuggestion[]> = {
    cold_extreme: [
      { category: 'soups', reason: 'Comfort and warmth', priority: 'high' },
      { category: 'hot_drinks', reason: 'Hot chocolate, mulled wine', priority: 'high' },
      { category: 'comfort', reason: 'Stews, gratins, fondue', priority: 'high' },
    ],
    cold: [
      { category: 'soups', reason: 'Warming dishes', priority: 'high' },
      { category: 'hot_drinks', reason: 'Coffee, tea, hot beverages', priority: 'medium' },
      { category: 'comfort', reason: 'Pasta, risotto, hearty dishes', priority: 'medium' },
    ],
    cool: [
      { category: 'comfort', reason: 'Balanced comfort food', priority: 'medium' },
      { category: 'hot_drinks', reason: 'Warm beverages option', priority: 'low' },
    ],
    optimal: [
      { category: 'light', reason: 'Perfect for varied menu', priority: 'medium' },
      { category: 'cold_drinks', reason: 'Aperitivo, cocktails', priority: 'medium' },
    ],
    warm: [
      { category: 'light', reason: 'Fresh, light dishes', priority: 'high' },
      { category: 'cold_drinks', reason: 'Refreshing beverages', priority: 'high' },
      { category: 'salads', reason: 'Cool, crisp options', priority: 'medium' },
    ],
    hot: [
      { category: 'cold_drinks', reason: 'Hydration focus', priority: 'high' },
      { category: 'salads', reason: 'Light, refreshing', priority: 'high' },
      { category: 'light', reason: 'Avoid heavy dishes', priority: 'medium' },
    ],
    hot_extreme: [
      { category: 'cold_drinks', reason: 'Maximum hydration', priority: 'high' },
      { category: 'light', reason: 'Ceviche, poke, cold dishes', priority: 'high' },
      { category: 'salads', reason: 'Fresh and cooling', priority: 'high' },
    ],
    rainy: [
      { category: 'comfort', reason: 'Cozy, nostalgic food', priority: 'high' },
      { category: 'hot_drinks', reason: 'Warm beverages', priority: 'high' },
      { category: 'soups', reason: 'Classic rainy day choice', priority: 'medium' },
    ],
    stormy: [
      { category: 'comfort', reason: 'Ultra-comfort food', priority: 'high' },
      { category: 'hot_drinks', reason: 'Warm and soothing', priority: 'high' },
      { category: 'soups', reason: 'Hearty soups', priority: 'high' },
    ],
    snowy: [
      { category: 'comfort', reason: 'Maximum indulgence', priority: 'high' },
      { category: 'hot_drinks', reason: 'Hot chocolate, Irish coffee', priority: 'high' },
      { category: 'soups', reason: 'Warming soups', priority: 'high' },
    ],
    humid: [
      { category: 'light', reason: 'Avoid heavy, fried foods', priority: 'high' },
      { category: 'cold_drinks', reason: 'Refreshing, hydrating', priority: 'medium' },
    ],
  };
  return suggestions[category];
}

/**
 * Get comfort food categories for weather
 * Based on AI Weather & Seasonal Knowledge Base Section 3.1
 */
function getComfortFoodCategories(category: WeatherCategory): string[] {
  const mapping: Record<WeatherCategory, string[]> = {
    cold_extreme: ['stews', 'gratins', 'fondue', 'hot chocolate', 'mulled wine'],
    cold: ['soups', 'pasta', 'risotto', 'roasts', 'hot beverages'],
    cool: ['pasta', 'risotto', 'warm salads'],
    optimal: ['varied menu', 'aperitivo', 'fresh dishes'],
    warm: ['salads', 'grilled items', 'cold beverages'],
    hot: ['ceviche', 'poke', 'cold soups', 'frozen drinks'],
    hot_extreme: ['ice cream', 'cold drinks', 'raw dishes', 'gazpacho'],
    rainy: ['ramen', 'curry', 'lasagne', 'comfort desserts'],
    stormy: ['stews', 'mac & cheese', 'hot chocolate', 'comfort classics'],
    snowy: ['fondue', 'gratin', 'hot chocolate', 'Irish coffee'],
    humid: ['pho', 'light spicy', 'citrus dishes', 'mint-based'],
  };
  return mapping[category];
}

/**
 * Get marketing hook for weather condition
 * Based on AI Weather & Seasonal Knowledge Base Section 2
 */
function getMarketingHook(category: WeatherCategory): string | undefined {
  const hooks: Partial<Record<WeatherCategory, string>> = {
    rainy: 'Fuori piove, dentro si mangia meglio',
    stormy: 'Storm outside? Comfort inside',
    snowy: 'Let it snow - warm up with us',
    cold_extreme: 'Escape the cold - warm dishes await',
    cold: 'Warm up with our comfort menu',
    hot: 'Beat the heat with refreshing bites',
    hot_extreme: "Too hot to cook? We've got you covered",
    humid: 'Stay fresh and light today',
  };
  return hooks[category];
}

/**
 * Calculate business impact based on weather conditions
 * Enhanced version based on AI Weather & Seasonal Knowledge Base
 */
function calculateBusinessImpact(current: CurrentWeather, forecast: DayForecast[]): BusinessImpact {
  const todayForecast = forecast[0];
  const category = determineWeatherCategory(current);

  // Impact percentages based on knowledge base Section 1.1
  const impactMap: Record<
    WeatherCategory,
    { delivery: string; dineIn: string; outdoor: boolean; peak?: string }
  > = {
    cold_extreme: {
      delivery: '+25-35%',
      dineIn: '+5-10%',
      outdoor: false,
      peak: 'Lunch rush earlier, dinner rush slightly later',
    },
    cold: {
      delivery: '+15-25%',
      dineIn: '+5%',
      outdoor: false,
    },
    cool: {
      delivery: '+5-10%',
      dineIn: '0%',
      outdoor: false,
    },
    optimal: {
      delivery: '-10%',
      dineIn: '+15-20%',
      outdoor: true,
      peak: 'Extended aperitivo hours (17:00-20:00)',
    },
    warm: {
      delivery: '+5%',
      dineIn: '+5-10%',
      outdoor: true,
      peak: 'Peak shifts to evening (19:00-22:00)',
    },
    hot: {
      delivery: '+15-25%',
      dineIn: '-10-15%',
      outdoor: false,
      peak: 'Peak moves to cooler evening hours',
    },
    hot_extreme: {
      delivery: '+25-35%',
      dineIn: '-25-35%',
      outdoor: false,
      peak: 'Avoid 12:00-16:00, focus on evening service',
    },
    rainy: {
      delivery: '+30-40%',
      dineIn: '-15-25%',
      outdoor: false,
      peak: 'Earlier lunch rush as people avoid going out',
    },
    stormy: {
      delivery: '+40-60%',
      dineIn: '-30-40%',
      outdoor: false,
      peak: 'Significant traffic reduction, focus on delivery',
    },
    snowy: {
      delivery: '+50-135%',
      dineIn: '-40-50%',
      outdoor: false,
      peak: 'Prepare for potential delivery delays',
    },
    humid: {
      delivery: '+15-25%',
      dineIn: '-10%',
      outdoor: false,
      peak: 'Avoid fried items in menu highlights (lose crispness)',
    },
  };

  const impact = impactMap[category];
  const recommendedActions: string[] = [];

  // Weather-specific actions
  switch (category) {
    case 'cold_extreme':
    case 'cold':
      recommendedActions.push('Promote hot beverages and comfort food');
      recommendedActions.push('Ensure heating is adequate');
      recommendedActions.push('Feature soups and warm dishes prominently');
      break;
    case 'optimal':
      recommendedActions.push('Open outdoor/terrace seating');
      recommendedActions.push('Great day for aperitivo promotions');
      recommendedActions.push('Consider outdoor events or live music');
      break;
    case 'hot':
    case 'hot_extreme':
      recommendedActions.push('Push cold beverages to top of menu');
      recommendedActions.push('Stock up on ice and frozen drinks');
      recommendedActions.push('Consider extended evening hours');
      if (category === 'hot_extreme') {
        recommendedActions.push('Close outdoor seating - too hot');
      }
      break;
    case 'rainy':
    case 'stormy':
      recommendedActions.push('Push delivery promotions');
      recommendedActions.push('Prepare for increased delivery orders');
      recommendedActions.push('Staff up kitchen, reduce floor staff');
      recommendedActions.push('Consider "Rainy Day Deals" promotion');
      break;
    case 'snowy':
      recommendedActions.push('Maximum delivery focus');
      recommendedActions.push('Prepare for potential delivery delays');
      recommendedActions.push('Ultra-comfort menu features');
      break;
    case 'humid':
      recommendedActions.push('Avoid featuring fried items (lose crispness)');
      recommendedActions.push('Push light, refreshing options');
      recommendedActions.push('Ensure AC is working optimally');
      break;
  }

  // Forecast alerts
  if (
    todayForecast &&
    todayForecast.precipitationProbability > 60 &&
    category !== 'rainy' &&
    category !== 'stormy'
  ) {
    recommendedActions.push(
      `Rain expected later (${todayForecast.precipitationProbability}% chance) - prepare delivery staff`
    );
  }

  // Temperature change alerts
  if (forecast.length > 1) {
    const tempDiff = forecast[1].tempMax - current.temp;
    if (tempDiff > 8) {
      recommendedActions.push(
        `Temperature rising ${Math.round(tempDiff)}°C tomorrow - prepare for menu shift`
      );
    } else if (tempDiff < -8) {
      recommendedActions.push(
        `Temperature dropping ${Math.round(Math.abs(tempDiff))}°C tomorrow - stock comfort items`
      );
    }
  }

  // Determine beverage focus
  let beverageFocus: 'hot' | 'cold' | 'mixed' = 'mixed';
  if (current.temp < 15 || category === 'rainy' || category === 'stormy' || category === 'snowy') {
    beverageFocus = 'hot';
  } else if (current.temp > 25 || category === 'hot' || category === 'hot_extreme') {
    beverageFocus = 'cold';
  }

  return {
    deliveryImpact: impact.delivery,
    dineInImpact: impact.dineIn,
    outdoorSeating: impact.outdoor,
    recommendedActions,
    peakHoursShift: impact.peak,
    weatherCategory: category,
    staffAdjustment: getStaffAdjustment(category),
    menuSuggestions: getMenuSuggestions(category),
    beverageFocus,
    comfortFoodCategories: getComfortFoodCategories(category),
    marketingHook: getMarketingHook(category),
  };
}

// =============================================================================
// CACHE MANAGEMENT
// =============================================================================

/**
 * Check if weather cache needs refresh
 */
export async function checkCacheFreshness(locationId: string): Promise<WeatherCacheFreshness> {
  const { data, error } = await supabase.rpc('check_weather_cache_freshness', {
    p_location_id: locationId,
    p_current_ttl_minutes: CURRENT_TTL_MINUTES,
    p_forecast_ttl_minutes: FORECAST_TTL_MINUTES,
  });

  if (error || !data || data.length === 0) {
    return {
      needsCurrentRefresh: true,
      needsForecastRefresh: true,
      currentAgeMinutes: 999999,
      forecastAgeMinutes: 999999,
    };
  }

  const row = data[0];
  return {
    needsCurrentRefresh: row.needs_current_refresh,
    needsForecastRefresh: row.needs_forecast_refresh,
    currentAgeMinutes: row.current_age_minutes,
    forecastAgeMinutes: row.forecast_age_minutes,
  };
}

/**
 * Get cached weather data
 */
export async function getCachedWeather(locationId: string): Promise<WeatherData | null> {
  const { data, error } = await supabase
    .from('location_weather_cache')
    .select('*')
    .eq('location_id', locationId)
    .single();

  if (error || !data) {
    return null;
  }

  const cacheInfo = await checkCacheFreshness(locationId);

  return {
    locationId: data.location_id,
    current: {
      temp: data.current_temp,
      feelsLike: data.current_feels_like,
      humidity: data.current_humidity,
      conditions: data.current_conditions,
      conditionsIcon: data.current_conditions_icon,
      windSpeed: data.current_wind_speed,
      windDirection: data.current_wind_direction,
      uvIndex: data.current_uv_index,
      visibility: data.current_visibility,
      updatedAt: data.current_updated_at,
    },
    forecast: data.forecast || [],
    hourlyToday: data.hourly_today || [],
    alerts: data.alerts || [],
    businessImpact: data.business_impact || {
      deliveryImpact: '0%',
      dineInImpact: '0%',
      outdoorSeating: true,
      recommendedActions: [],
    },
    cacheInfo: {
      currentAge: cacheInfo.currentAgeMinutes,
      forecastAge: cacheInfo.forecastAgeMinutes,
      needsRefresh: cacheInfo.needsCurrentRefresh || cacheInfo.needsForecastRefresh,
    },
  };
}

/**
 * Update weather cache with fresh data
 */
async function updateWeatherCache(
  locationId: string,
  latitude: number,
  longitude: number,
  timezone: string,
  apiResponse: VisualCrossingResponse
): Promise<void> {
  const current = apiResponse.currentConditions;
  const days = apiResponse.days;
  const today = days[0];

  // Transform forecast data
  const forecast: DayForecast[] = days.slice(0, 7).map((day) => ({
    date: day.datetime,
    tempMax: day.tempmax,
    tempMin: day.tempmin,
    conditions: day.conditions,
    conditionsIcon: day.icon,
    precipitationProbability: day.precipprob || 0,
    precipitationMm: day.precip || 0,
    humidity: day.humidity,
    windSpeed: day.windspeed,
    sunrise: day.sunrise,
    sunset: day.sunset,
    description: day.description,
  }));

  // Transform hourly data for today
  const hourlyToday: HourlyForecast[] = (today.hours || []).map((hour) => ({
    hour: hour.datetime.slice(0, 5), // "HH:MM"
    temp: hour.temp,
    conditions: hour.conditions,
    precipitationProbability: hour.precipprob || 0,
    precipitationMm: hour.precip || 0,
  }));

  // Transform alerts
  const alerts: WeatherAlert[] = (apiResponse.alerts || []).map((alert) => ({
    type: alert.event,
    severity: (alert.severity?.toLowerCase() as WeatherAlert['severity']) || 'moderate',
    title: alert.headline,
    description: alert.description,
    startsAt: alert.onset,
    endsAt: alert.ends,
  }));

  // Build current weather object for business impact calculation
  const currentWeather: CurrentWeather = {
    temp: current.temp,
    feelsLike: current.feelslike,
    humidity: current.humidity,
    conditions: current.conditions,
    conditionsIcon: current.icon,
    windSpeed: current.windspeed,
    windDirection: getWindDirection(current.winddir),
    uvIndex: current.uvindex,
    visibility: current.visibility,
    updatedAt: new Date().toISOString(),
  };

  // Calculate business impact
  const businessImpact = calculateBusinessImpact(currentWeather, forecast);

  // Upsert to cache
  const { error } = await supabase.from('location_weather_cache').upsert(
    {
      location_id: locationId,
      current_temp: current.temp,
      current_feels_like: current.feelslike,
      current_humidity: current.humidity,
      current_conditions: current.conditions,
      current_conditions_icon: current.icon,
      current_wind_speed: current.windspeed,
      current_wind_direction: getWindDirection(current.winddir),
      current_uv_index: current.uvindex,
      current_visibility: current.visibility,
      current_updated_at: new Date().toISOString(),
      forecast: forecast,
      forecast_updated_at: new Date().toISOString(),
      hourly_today: hourlyToday,
      alerts: alerts,
      business_impact: businessImpact,
      latitude: latitude,
      longitude: longitude,
      timezone: timezone,
      api_provider: 'visual_crossing',
      last_api_call_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'location_id',
    }
  );

  if (error) {
    console.error('Error updating weather cache:', error);
    throw error;
  }
}

// =============================================================================
// MAIN API
// =============================================================================

/**
 * Get weather data for a location with smart caching
 * This is the main function to call from UI/API
 */
export async function getWeatherForLocation(
  locationId: string,
  forceRefresh = false
): Promise<WeatherData> {
  // Get Visual Crossing API key from environment
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;

  if (!apiKey) {
    throw new Error('VISUAL_CROSSING_API_KEY not configured');
  }

  // Check cache freshness
  const freshness = await checkCacheFreshness(locationId);

  // If cache is fresh and not forcing refresh, return cached data
  if (!forceRefresh && !freshness.needsCurrentRefresh && !freshness.needsForecastRefresh) {
    const cached = await getCachedWeather(locationId);
    if (cached) {
      return cached;
    }
  }

  // Get location coordinates
  const { data: location, error: locationError } = await supabase
    .from('locations')
    .select('latitude, longitude, timezone')
    .eq('id', locationId)
    .single();

  if (locationError || !location) {
    throw new Error(`Location not found: ${locationId}`);
  }

  if (!location.latitude || !location.longitude) {
    throw new Error(`Location ${locationId} has no coordinates`);
  }

  // Fetch fresh data from Visual Crossing
  const apiResponse = await fetchFromVisualCrossing(location.latitude, location.longitude, apiKey);

  // Update cache
  await updateWeatherCache(
    locationId,
    location.latitude,
    location.longitude,
    location.timezone || apiResponse.timezone,
    apiResponse
  );

  // Return fresh cached data
  const weather = await getCachedWeather(locationId);
  if (!weather) {
    throw new Error('Failed to retrieve updated weather data');
  }

  return weather;
}

/**
 * Get weather summary for AI context (briefings, chat)
 */
export async function getWeatherSummaryForAI(locationId: string): Promise<string> {
  try {
    const weather = await getWeatherForLocation(locationId);
    const emoji = getWeatherEmoji(weather.current.conditions);
    const impact = weather.businessImpact;

    let summary = `Weather: ${emoji} ${Math.round(weather.current.temp)}°C (feels ${Math.round(weather.current.feelsLike)}°C), ${weather.current.conditions}.`;

    if (weather.alerts.length > 0) {
      summary += ` ALERT: ${weather.alerts[0].title}.`;
    }

    summary += ` Business impact: Delivery ${impact.deliveryImpact}, Dine-in ${impact.dineInImpact}.`;

    if (impact.recommendedActions.length > 0) {
      summary += ` Recommended: ${impact.recommendedActions[0]}.`;
    }

    // Tomorrow forecast
    if (weather.forecast.length > 1) {
      const tomorrow = weather.forecast[1];
      const tomorrowEmoji = getWeatherEmoji(tomorrow.conditions);
      summary += ` Tomorrow: ${tomorrowEmoji} ${Math.round(tomorrow.tempMax)}°C/${Math.round(tomorrow.tempMin)}°C.`;
    }

    return summary;
  } catch (error) {
    console.error('Error getting weather summary:', error);
    return 'Weather data unavailable.';
  }
}

/**
 * Get simple weather display data for header widget
 */
export async function getWeatherWidgetData(locationId: string): Promise<{
  temp: number;
  emoji: string;
  conditions: string;
  hasAlert: boolean;
  alertType?: string;
} | null> {
  try {
    const weather = await getWeatherForLocation(locationId);
    return {
      temp: Math.round(weather.current.temp),
      emoji: getWeatherEmoji(weather.current.conditions),
      conditions: weather.current.conditions,
      hasAlert: weather.alerts.length > 0,
      alertType: weather.alerts[0]?.type,
    };
  } catch (error) {
    console.error('Error getting weather widget data:', error);
    return null;
  }
}
