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

interface BusinessImpact {
  deliveryImpact: string;
  dineInImpact: string;
  outdoorSeating: boolean;
  recommendedActions: string[];
  peakHoursShift?: string;
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

export function WeatherWidget() {
  const { location } = useTenant();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch weather data
  const fetchWeather = async () => {
    if (!location?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/ai/weather?locationId=${location.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Weather unavailable');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when location changes
  useEffect(() => {
    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
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

  // Loading state
  if (loading && !weather) {
    return (
      <div className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-gray-400">
        <RefreshCw className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error && !weather) {
    return null; // Silent fail
  }

  // No data
  if (!weather) {
    return null;
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
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
              Business Impact
            </p>
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
            {weather.businessImpact.recommendedActions.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Suggestion</p>
                <p className="text-sm text-gray-700">
                  {weather.businessImpact.recommendedActions[0]}
                </p>
              </div>
            )}
          </div>

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
