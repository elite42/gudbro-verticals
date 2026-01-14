'use client';

import { useState, useEffect, useRef } from 'react';
import {
  CloudRain,
  Sun,
  Cloud,
  Snowflake,
  Wind,
  AlertTriangle,
  ChevronDown,
  RefreshCw,
  Coffee,
  IceCream,
  Users,
  Utensils,
  Megaphone,
  ThermometerSun,
} from 'lucide-react';
import { useTenant } from '@/lib/contexts/TenantContext';

// Types
interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  conditions: string;
  conditionsIcon: string;
  windSpeed: number;
  windDirection: string;
  updatedAt: string;
}

interface DayForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  conditions: string;
  precipitationProbability: number;
  description: string;
}

interface HourlyForecast {
  hour: string;
  temp: number;
  conditions: string;
  precipitationProbability: number;
}

interface WeatherAlert {
  type: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  title: string;
  description: string;
}

interface StaffAdjustment {
  sala: number;
  kitchen: number;
  delivery: number;
  bar: number;
}

interface MenuSuggestion {
  category: 'comfort' | 'light' | 'hot_drinks' | 'cold_drinks' | 'soups' | 'salads';
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

type WeatherCategory =
  | 'cold_extreme'
  | 'cold'
  | 'cool'
  | 'optimal'
  | 'warm'
  | 'hot'
  | 'hot_extreme'
  | 'rainy'
  | 'stormy'
  | 'snowy'
  | 'humid';

interface BusinessImpact {
  deliveryImpact: string;
  dineInImpact: string;
  outdoorSeating: boolean;
  recommendedActions: string[];
  peakHoursShift?: string;
  // Enhanced fields from knowledge base
  weatherCategory?: WeatherCategory;
  staffAdjustment?: StaffAdjustment;
  menuSuggestions?: MenuSuggestion[];
  beverageFocus?: 'hot' | 'cold' | 'mixed';
  comfortFoodCategories?: string[];
  marketingHook?: string;
}

interface WeatherData {
  current: CurrentWeather;
  forecast: DayForecast[];
  hourlyToday: HourlyForecast[];
  alerts: WeatherAlert[];
  businessImpact: BusinessImpact;
}

// Weather emoji mapping
const WEATHER_EMOJIS: Record<string, string> = {
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

function getWeatherEmoji(conditions: string): string {
  const key = conditions.toLowerCase().replace(/\s+/g, '-');
  return WEATHER_EMOJIS[key] || '🌡️';
}

function getWeatherIcon(conditions: string) {
  const condition = conditions.toLowerCase();
  if (condition.includes('rain') || condition.includes('shower')) {
    return <CloudRain className="h-4 w-4" />;
  }
  if (condition.includes('snow')) {
    return <Snowflake className="h-4 w-4" />;
  }
  if (condition.includes('cloud') || condition.includes('overcast')) {
    return <Cloud className="h-4 w-4" />;
  }
  if (condition.includes('wind')) {
    return <Wind className="h-4 w-4" />;
  }
  return <Sun className="h-4 w-4" />;
}

function formatTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
}

// Format staff multiplier to percentage change
function formatStaffChange(multiplier: number): string {
  const change = Math.round((multiplier - 1) * 100);
  if (change === 0) return '0%';
  return change > 0 ? `+${change}%` : `${change}%`;
}

// Get color class for staff change
function getStaffChangeColor(multiplier: number): string {
  if (multiplier > 1.05) return 'text-green-600';
  if (multiplier < 0.95) return 'text-amber-600';
  return 'text-gray-600';
}

// Weather category display labels
const WEATHER_CATEGORY_LABELS: Record<WeatherCategory, string> = {
  cold_extreme: 'Extreme Cold',
  cold: 'Cold',
  cool: 'Cool',
  optimal: 'Perfect',
  warm: 'Warm',
  hot: 'Hot',
  hot_extreme: 'Extreme Heat',
  rainy: 'Rainy',
  stormy: 'Stormy',
  snowy: 'Snowy',
  humid: 'Humid',
};

// Weather category badge colors
const WEATHER_CATEGORY_COLORS: Record<WeatherCategory, string> = {
  cold_extreme: 'bg-blue-100 text-blue-700',
  cold: 'bg-blue-50 text-blue-600',
  cool: 'bg-cyan-50 text-cyan-600',
  optimal: 'bg-green-50 text-green-600',
  warm: 'bg-orange-50 text-orange-600',
  hot: 'bg-red-50 text-red-600',
  hot_extreme: 'bg-red-100 text-red-700',
  rainy: 'bg-indigo-50 text-indigo-600',
  stormy: 'bg-purple-100 text-purple-700',
  snowy: 'bg-slate-100 text-slate-600',
  humid: 'bg-teal-50 text-teal-600',
};

// Menu suggestion icons
function getMenuCategoryIcon(category: MenuSuggestion['category']) {
  switch (category) {
    case 'hot_drinks':
      return <Coffee className="h-3 w-3" />;
    case 'cold_drinks':
      return <IceCream className="h-3 w-3" />;
    case 'soups':
    case 'comfort':
      return <Utensils className="h-3 w-3" />;
    default:
      return <Utensils className="h-3 w-3" />;
  }
}

// Configuration
const FETCH_TIMEOUT_MS = 10000; // 10 seconds timeout
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000; // 2 seconds between retries

export function WeatherWidget() {
  const { location } = useTenant();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch weather data with timeout and retry
  const fetchWeather = async (retry = 0): Promise<boolean> => {
    if (!location?.id) return false;

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    if (retry === 0) {
      setError(null);
      setErrorDetails(null);
    }

    try {
      // Create timeout
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const response = await fetch(`/api/ai/weather?locationId=${location.id}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      // Validate data structure
      if (!data.current || typeof data.current.temp !== 'number') {
        throw new Error('Invalid weather data structure');
      }

      setWeather(data);
      setError(null);
      setErrorDetails(null);
      setRetryCount(0);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const isAborted = err instanceof Error && err.name === 'AbortError';

      // Log error for debugging (could be sent to a monitoring service)
      console.error(`[WeatherWidget] Fetch failed (attempt ${retry + 1}/${MAX_RETRIES + 1}):`, {
        locationId: location.id,
        error: errorMessage,
        isTimeout: isAborted,
        timestamp: new Date().toISOString(),
      });

      // Retry logic
      if (retry < MAX_RETRIES && !isAborted) {
        setRetryCount(retry + 1);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * (retry + 1)));
        return fetchWeather(retry + 1);
      }

      // Final failure
      setError(isAborted ? 'Timeout' : 'Unavailable');
      setErrorDetails(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when location changes
  useEffect(() => {
    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(() => fetchWeather(), 30 * 60 * 1000);
    return () => {
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location?.id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't render if no location
  if (!location?.id) {
    return null;
  }

  // Loading state (initial load)
  if (loading && !weather && !error) {
    return (
      <div
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-gray-400"
        title={retryCount > 0 ? `Retry ${retryCount}/${MAX_RETRIES}...` : 'Loading weather...'}
      >
        <RefreshCw className="h-4 w-4 animate-spin" />
        {retryCount > 0 && <span className="text-xs">{retryCount}</span>}
      </div>
    );
  }

  // Error state - show clickable error indicator instead of hiding
  if (error && !weather) {
    return (
      <button
        onClick={() => fetchWeather()}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-amber-600 transition-colors hover:bg-amber-50"
        title={`Weather ${error}${errorDetails ? `: ${errorDetails}` : ''}. Click to retry.`}
      >
        <AlertTriangle className="h-4 w-4" />
        <span className="text-xs font-medium">!</span>
      </button>
    );
  }

  // No data (shouldn't happen but safety net)
  if (!weather) {
    return (
      <button
        onClick={() => fetchWeather()}
        className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-gray-400 transition-colors hover:bg-gray-100"
        title="Weather data not available. Click to retry."
      >
        <Cloud className="h-4 w-4" />
        <span className="text-xs">?</span>
      </button>
    );
  }

  const hasAlert = weather.alerts.length > 0;
  const emoji = getWeatherEmoji(weather.current.conditions);
  const temp = Math.round(weather.current.temp);

  // Find if rain is coming in the next few hours
  const rainComing = weather.hourlyToday.find(
    (h) => h.precipitationProbability > 60 && h.conditions.toLowerCase().includes('rain')
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Mini Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
          hasAlert
            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        title={`${weather.current.conditions} - Click for details`}
      >
        <span className="text-base">{emoji}</span>
        <span>{temp}°</span>
        {hasAlert && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </span>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* Current Weather Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-2xl font-semibold text-gray-900">{temp}°C</span>
                </div>
                <p className="text-sm text-gray-600">{weather.current.conditions}</p>
                <p className="text-xs text-gray-500">
                  Feels like {Math.round(weather.current.feelsLike)}° • Humidity{' '}
                  {weather.current.humidity}%
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fetchWeather();
                }}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white/50 hover:text-gray-600"
                title="Refresh"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Alerts */}
          {weather.alerts.length > 0 && (
            <div className="border-b border-amber-100 bg-amber-50 px-4 py-2">
              {weather.alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">{alert.title}</p>
                    <p className="text-xs text-amber-700">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rain Warning */}
          {rainComing && !hasAlert && (
            <div className="border-b border-blue-100 bg-blue-50 px-4 py-2">
              <div className="flex items-center gap-2">
                <CloudRain className="h-4 w-4 text-blue-600" />
                <p className="text-sm text-blue-800">
                  Rain expected at {rainComing.hour} ({rainComing.precipitationProbability}%)
                </p>
              </div>
            </div>
          )}

          {/* Business Impact */}
          <div className="border-b border-gray-100 px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Business Impact
              </p>
              {weather.businessImpact.weatherCategory && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${WEATHER_CATEGORY_COLORS[weather.businessImpact.weatherCategory]}`}
                >
                  {WEATHER_CATEGORY_LABELS[weather.businessImpact.weatherCategory]}
                </span>
              )}
            </div>

            {/* Marketing Hook */}
            {weather.businessImpact.marketingHook && (
              <div className="mb-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-2">
                <Megaphone className="h-4 w-4 flex-shrink-0 text-purple-500" />
                <p className="text-sm font-medium text-purple-700">
                  &quot;{weather.businessImpact.marketingHook}&quot;
                </p>
              </div>
            )}

            {/* Impact Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-xs text-gray-500">Delivery</p>
                <p
                  className={`font-medium ${
                    weather.businessImpact.deliveryImpact.includes('+')
                      ? 'text-green-600'
                      : weather.businessImpact.deliveryImpact.includes('-')
                        ? 'text-red-600'
                        : 'text-gray-700'
                  }`}
                >
                  {weather.businessImpact.deliveryImpact}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-xs text-gray-500">Dine-in</p>
                <p
                  className={`font-medium ${
                    weather.businessImpact.dineInImpact.includes('+')
                      ? 'text-green-600'
                      : weather.businessImpact.dineInImpact.includes('-')
                        ? 'text-red-600'
                        : 'text-gray-700'
                  }`}
                >
                  {weather.businessImpact.dineInImpact}
                </p>
              </div>
            </div>

            {/* Beverage Focus */}
            {weather.businessImpact.beverageFocus && (
              <div className="mt-2 flex items-center gap-2">
                {weather.businessImpact.beverageFocus === 'hot' ? (
                  <Coffee className="h-4 w-4 text-amber-500" />
                ) : weather.businessImpact.beverageFocus === 'cold' ? (
                  <IceCream className="h-4 w-4 text-cyan-500" />
                ) : (
                  <ThermometerSun className="h-4 w-4 text-gray-500" />
                )}
                <p className="text-xs text-gray-600">
                  Push{' '}
                  <span className="font-medium">
                    {weather.businessImpact.beverageFocus === 'hot'
                      ? 'hot beverages'
                      : weather.businessImpact.beverageFocus === 'cold'
                        ? 'cold beverages'
                        : 'varied beverages'}
                  </span>
                </p>
              </div>
            )}

            {/* Top Suggestion */}
            {weather.businessImpact.recommendedActions.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Top Action</p>
                <p className="text-sm text-gray-700">
                  {weather.businessImpact.recommendedActions[0]}
                </p>
              </div>
            )}
          </div>

          {/* Staff & Menu Suggestions */}
          {(weather.businessImpact.staffAdjustment ||
            (weather.businessImpact.menuSuggestions &&
              weather.businessImpact.menuSuggestions.length > 0)) && (
            <div className="border-b border-gray-100 px-4 py-3">
              {/* Staff Adjustments */}
              {weather.businessImpact.staffAdjustment && (
                <div className="mb-3">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-gray-400" />
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Staff Adjustment
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="rounded bg-gray-50 px-1.5 py-1">
                      <p className="text-[10px] text-gray-400">Sala</p>
                      <p
                        className={`text-xs font-medium ${getStaffChangeColor(weather.businessImpact.staffAdjustment.sala)}`}
                      >
                        {formatStaffChange(weather.businessImpact.staffAdjustment.sala)}
                      </p>
                    </div>
                    <div className="rounded bg-gray-50 px-1.5 py-1">
                      <p className="text-[10px] text-gray-400">Kitchen</p>
                      <p
                        className={`text-xs font-medium ${getStaffChangeColor(weather.businessImpact.staffAdjustment.kitchen)}`}
                      >
                        {formatStaffChange(weather.businessImpact.staffAdjustment.kitchen)}
                      </p>
                    </div>
                    <div className="rounded bg-gray-50 px-1.5 py-1">
                      <p className="text-[10px] text-gray-400">Delivery</p>
                      <p
                        className={`text-xs font-medium ${getStaffChangeColor(weather.businessImpact.staffAdjustment.delivery)}`}
                      >
                        {formatStaffChange(weather.businessImpact.staffAdjustment.delivery)}
                      </p>
                    </div>
                    <div className="rounded bg-gray-50 px-1.5 py-1">
                      <p className="text-[10px] text-gray-400">Bar</p>
                      <p
                        className={`text-xs font-medium ${getStaffChangeColor(weather.businessImpact.staffAdjustment.bar)}`}
                      >
                        {formatStaffChange(weather.businessImpact.staffAdjustment.bar)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu Suggestions */}
              {weather.businessImpact.menuSuggestions &&
                weather.businessImpact.menuSuggestions.length > 0 && (
                  <div>
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <Utensils className="h-3.5 w-3.5 text-gray-400" />
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Menu Focus
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {weather.businessImpact.menuSuggestions
                        .filter((s) => s.priority === 'high')
                        .slice(0, 3)
                        .map((suggestion, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700"
                            title={suggestion.reason}
                          >
                            {getMenuCategoryIcon(suggestion.category)}
                            <span className="capitalize">
                              {suggestion.category.replace('_', ' ')}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Hourly Today */}
          {weather.hourlyToday.length > 0 && (
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                Today
              </p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {weather.hourlyToday
                  .filter((_, i) => i % 3 === 0) // Every 3 hours
                  .slice(0, 6)
                  .map((hour, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <p className="text-xs text-gray-500">{hour.hour}</p>
                      <span className="my-1 text-base">{getWeatherEmoji(hour.conditions)}</span>
                      <p className="text-sm font-medium text-gray-700">{Math.round(hour.temp)}°</p>
                      {hour.precipitationProbability > 30 && (
                        <p className="text-xs text-blue-600">{hour.precipitationProbability}%</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 7-Day Forecast */}
          <div className="px-4 py-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
              7-Day Forecast
            </p>
            <div className="space-y-2">
              {weather.forecast.slice(0, 5).map((day, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="w-16 text-gray-600">
                    {i === 0 ? 'Today' : formatDate(day.date)}
                  </span>
                  <span className="text-base">{getWeatherEmoji(day.conditions)}</span>
                  <div className="flex items-center gap-2">
                    {day.precipitationProbability > 30 && (
                      <span className="text-xs text-blue-600">{day.precipitationProbability}%</span>
                    )}
                    <span className="w-8 text-right font-medium text-gray-900">
                      {Math.round(day.tempMax)}°
                    </span>
                    <span className="w-8 text-right text-gray-400">{Math.round(day.tempMin)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
            <p className="text-center text-xs text-gray-400">
              Updated {formatTime(weather.current.updatedAt)} • {location?.city || 'Unknown'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
