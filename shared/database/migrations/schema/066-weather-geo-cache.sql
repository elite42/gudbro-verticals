-- Migration: 066-weather-geo-cache.sql
-- Description: Geo-based weather cache optimization for reduced API calls
-- Date: 2026-01-19
-- Dependencies: 047-weather-intelligence.sql

-- ============================================================================
-- GEO-BASED WEATHER CACHE OPTIMIZATION
-- ============================================================================
-- Problem: 500 locations in Da Nang = 500 identical API calls
-- Solution: Cache by geographic area (~10km precision)
--           500 locations same area = 1 API call
--
-- BEFORE:  Location A → API call → Cache A
--          Location B → API call → Cache B (same weather!)
--          Location C → API call → Cache C (same weather!)
--
-- AFTER:   Location A → Geo Key "10.8:106.7" → API call → Geo Cache
--          Location B → Geo Key "10.8:106.7" → HIT! → Geo Cache
--          Location C → Geo Key "10.8:106.7" → HIT! → Geo Cache

-- ============================================================================
-- ADD GEO CACHE KEY COLUMN
-- ============================================================================

ALTER TABLE location_weather_cache
ADD COLUMN IF NOT EXISTS geo_cache_key TEXT;

-- ============================================================================
-- INDEX FOR GEO LOOKUPS
-- ============================================================================
-- Optimized for finding fresh cache by geo key

CREATE INDEX IF NOT EXISTS idx_weather_geo_cache_key
ON location_weather_cache(geo_cache_key, current_updated_at DESC)
WHERE geo_cache_key IS NOT NULL;

-- ============================================================================
-- FUNCTION: Get Fresh Geo Weather Cache
-- ============================================================================
-- Finds fresh weather cache for a geographic area
-- Returns the most recently updated cache entry for the geo key

CREATE OR REPLACE FUNCTION get_fresh_geo_weather_cache(
  p_geo_cache_key TEXT,
  p_current_ttl_minutes INT DEFAULT 60
)
RETURNS TABLE (
  weather_data JSONB,
  forecast_data JSONB,
  alerts JSONB,
  business_impact JSONB,
  hourly_today JSONB,
  current_temp DECIMAL(4,1),
  current_feels_like DECIMAL(4,1),
  current_humidity INTEGER,
  current_conditions TEXT,
  current_conditions_icon TEXT,
  current_wind_speed DECIMAL(5,2),
  current_wind_direction TEXT,
  current_uv_index DECIMAL(3,1),
  current_visibility DECIMAL(5,2),
  current_updated_at TIMESTAMPTZ,
  forecast_updated_at TIMESTAMPTZ,
  timezone TEXT,
  source_location_id UUID
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    -- We return all weather fields so the service can copy them
    jsonb_build_object(
      'temp', lwc.current_temp,
      'feelsLike', lwc.current_feels_like,
      'humidity', lwc.current_humidity,
      'conditions', lwc.current_conditions,
      'conditionsIcon', lwc.current_conditions_icon,
      'windSpeed', lwc.current_wind_speed,
      'windDirection', lwc.current_wind_direction,
      'uvIndex', lwc.current_uv_index,
      'visibility', lwc.current_visibility,
      'updatedAt', lwc.current_updated_at
    ) as weather_data,
    lwc.forecast as forecast_data,
    lwc.alerts,
    lwc.business_impact,
    lwc.hourly_today,
    lwc.current_temp,
    lwc.current_feels_like,
    lwc.current_humidity,
    lwc.current_conditions,
    lwc.current_conditions_icon,
    lwc.current_wind_speed,
    lwc.current_wind_direction,
    lwc.current_uv_index,
    lwc.current_visibility,
    lwc.current_updated_at,
    lwc.forecast_updated_at,
    lwc.timezone,
    lwc.location_id as source_location_id
  FROM location_weather_cache lwc
  WHERE lwc.geo_cache_key = p_geo_cache_key
    AND lwc.current_updated_at > NOW() - (p_current_ttl_minutes || ' minutes')::INTERVAL
  ORDER BY lwc.current_updated_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- ============================================================================
-- COMMENT
-- ============================================================================

COMMENT ON COLUMN location_weather_cache.geo_cache_key IS 'Geographic cache key format: "lat_1decimal:lng_1decimal" for ~10km precision cache sharing';
COMMENT ON FUNCTION get_fresh_geo_weather_cache IS 'Find fresh weather cache for a geographic area to reduce API calls';
