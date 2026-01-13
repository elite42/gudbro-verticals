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

export interface BusinessImpact {
  deliveryImpact: string;
  dineInImpact: string;
  outdoorSeating: boolean;
  recommendedActions: string[];
  peakHoursShift?: string;
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
 * Calculate business impact based on weather conditions
 */
function calculateBusinessImpact(current: CurrentWeather, forecast: DayForecast[]): BusinessImpact {
  const todayForecast = forecast[0];
  const conditions = current.conditions.toLowerCase();
  const isRainy =
    conditions.includes('rain') || conditions.includes('storm') || conditions.includes('shower');
  const isSnowy = conditions.includes('snow');
  const isHot = current.temp > 30;
  const isCold = current.temp < 5;
  const isNice = !isRainy && !isSnowy && current.temp >= 18 && current.temp <= 28;

  const recommendedActions: string[] = [];
  let deliveryImpact = '0%';
  let dineInImpact = '0%';
  let outdoorSeating = true;
  let peakHoursShift: string | undefined;

  if (isRainy || isSnowy) {
    deliveryImpact = '+30-45%';
    dineInImpact = '-15-25%';
    outdoorSeating = false;
    recommendedActions.push('Push delivery promotions');
    recommendedActions.push('Prepare for increased delivery orders');
    recommendedActions.push('Close outdoor seating');
    peakHoursShift = 'Earlier lunch rush expected as people avoid going out';
  } else if (isHot) {
    deliveryImpact = '+15-25%';
    dineInImpact = '-10%';
    outdoorSeating = false; // Too hot
    recommendedActions.push('Promote cold beverages and desserts');
    recommendedActions.push('Consider shaded outdoor seating only');
    recommendedActions.push('Stock up on ice and cold drinks');
    peakHoursShift = 'Peak moves to cooler evening hours';
  } else if (isCold) {
    deliveryImpact = '+20-30%';
    dineInImpact = '+5%'; // People want warm places
    outdoorSeating = false;
    recommendedActions.push('Promote hot beverages and comfort food');
    recommendedActions.push('Ensure heating is adequate');
    recommendedActions.push('Feature soups and warm dishes');
  } else if (isNice) {
    deliveryImpact = '-10%';
    dineInImpact = '+15-20%';
    outdoorSeating = true;
    recommendedActions.push('Open outdoor/terrace seating');
    recommendedActions.push('Great day for aperitivo promotions');
    recommendedActions.push('Consider outdoor events');
  }

  // Check for incoming rain in forecast
  if (todayForecast && todayForecast.precipitationProbability > 60 && !isRainy) {
    recommendedActions.push(
      `Rain expected later (${todayForecast.precipitationProbability}% chance) - prepare delivery staff`
    );
  }

  return {
    deliveryImpact,
    dineInImpact,
    outdoorSeating,
    recommendedActions,
    peakHoursShift,
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
