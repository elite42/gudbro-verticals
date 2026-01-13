-- Migration: 047-weather-intelligence.sql
-- Description: Weather intelligence system with smart caching
-- Date: 2026-01-13
-- Dependencies: locations table

-- ============================================================================
-- WEATHER INTELLIGENCE SYSTEM
-- ============================================================================
-- Provides weather data caching for AI Co-Manager context and business insights
-- Uses Visual Crossing API with on-demand + smart cache strategy

-- ============================================================================
-- TABLE: location_weather_cache
-- ============================================================================
-- Caches weather data per location with TTL-based refresh

CREATE TABLE location_weather_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Current conditions (refresh: 1 hour TTL)
  current_temp DECIMAL(4,1),                    -- Temperature in Celsius
  current_feels_like DECIMAL(4,1),              -- "Feels like" temperature
  current_humidity INTEGER,                      -- Humidity percentage (0-100)
  current_conditions TEXT,                       -- 'clear', 'cloudy', 'rain', 'snow', 'storm', etc.
  current_conditions_icon TEXT,                  -- Icon code from API
  current_wind_speed DECIMAL(5,2),              -- Wind speed in km/h
  current_wind_direction TEXT,                   -- Wind direction (N, NE, E, etc.)
  current_uv_index DECIMAL(3,1),                -- UV index
  current_visibility DECIMAL(5,2),              -- Visibility in km
  current_updated_at TIMESTAMPTZ,               -- When current data was last fetched

  -- Forecast data (refresh: 6 hours TTL)
  -- Array of daily forecasts, up to 7 days
  forecast JSONB DEFAULT '[]',
  /*
  Example forecast structure:
  [
    {
      "date": "2026-01-13",
      "temp_max": 24.5,
      "temp_min": 18.2,
      "conditions": "rain",
      "conditions_icon": "rain",
      "precipitation_probability": 80,
      "precipitation_mm": 12.5,
      "humidity": 75,
      "wind_speed": 15.2,
      "sunrise": "07:15",
      "sunset": "17:45",
      "description": "Rain expected from afternoon"
    }
  ]
  */
  forecast_updated_at TIMESTAMPTZ,              -- When forecast was last fetched

  -- Hourly forecast for today (refresh: 1 hour TTL)
  hourly_today JSONB DEFAULT '[]',
  /*
  Example hourly structure:
  [
    {
      "hour": "14:00",
      "temp": 22.5,
      "conditions": "rain",
      "precipitation_probability": 85,
      "precipitation_mm": 5.2
    }
  ]
  */

  -- Weather alerts (refresh: 1 hour TTL)
  alerts JSONB DEFAULT '[]',
  /*
  Example alerts structure:
  [
    {
      "type": "storm_warning",
      "severity": "moderate",
      "title": "Thunderstorm Warning",
      "description": "Severe thunderstorms expected between 15:00-18:00",
      "starts_at": "2026-01-13T15:00:00Z",
      "ends_at": "2026-01-13T18:00:00Z"
    }
  ]
  */

  -- Business impact predictions (AI-calculated)
  business_impact JSONB DEFAULT '{}',
  /*
  Example business_impact structure:
  {
    "delivery_impact": "+35%",
    "dine_in_impact": "-15%",
    "outdoor_seating": false,
    "recommended_actions": [
      "Push delivery promotions",
      "Increase delivery staff"
    ],
    "peak_hours_shift": "Earlier lunch rush expected"
  }
  */

  -- API metadata
  api_provider TEXT DEFAULT 'visual_crossing',  -- Weather API provider
  api_calls_today INTEGER DEFAULT 0,            -- Track API usage
  last_api_call_at TIMESTAMPTZ,                 -- Last API call timestamp

  -- Location coordinates (cached from locations table for quick access)
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_location_weather UNIQUE (location_id)
);

-- ============================================================================
-- TABLE: weather_business_correlations
-- ============================================================================
-- Tracks correlations between weather and business metrics over time
-- Used to improve AI predictions

CREATE TABLE weather_business_correlations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Date of observation
  observation_date DATE NOT NULL,

  -- Weather snapshot for the day
  weather_conditions TEXT,                       -- Primary condition
  temp_avg DECIMAL(4,1),
  temp_max DECIMAL(4,1),
  temp_min DECIMAL(4,1),
  precipitation_mm DECIMAL(5,2) DEFAULT 0,
  humidity_avg INTEGER,

  -- Business metrics for the day
  total_orders INTEGER DEFAULT 0,
  delivery_orders INTEGER DEFAULT 0,
  dine_in_orders INTEGER DEFAULT 0,
  takeaway_orders INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,

  -- Calculated correlations
  delivery_percentage DECIMAL(5,2),              -- % of orders that were delivery
  revenue_vs_average DECIMAL(5,2),               -- % vs 30-day rolling average

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_location_date_correlation UNIQUE (location_id, observation_date)
);

-- ============================================================================
-- TABLE: weather_triggers
-- ============================================================================
-- Configurable weather-based automation triggers

CREATE TABLE weather_triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Trigger identity
  name TEXT NOT NULL,
  description TEXT,

  -- Trigger conditions (JSONB for flexibility)
  conditions JSONB NOT NULL,
  /*
  Example conditions:
  {
    "type": "rain_forecast",
    "conditions": ["rain", "storm"],
    "hours_ahead": 3,
    "min_probability": 60
  }
  OR
  {
    "type": "temperature",
    "operator": "above",
    "threshold": 30
  }
  OR
  {
    "type": "alert",
    "alert_types": ["storm_warning", "heat_wave"]
  }
  */

  -- Action to take when triggered
  action_type TEXT NOT NULL CHECK (action_type IN (
    'send_promo',           -- Send promotion to customers
    'notify_staff',         -- Notify staff/manager
    'adjust_delivery',      -- Adjust delivery settings
    'social_post',          -- Create social media post
    'inventory_alert'       -- Alert about inventory needs
  )),

  action_config JSONB DEFAULT '{}',
  /*
  Example action_config for send_promo:
  {
    "promo_type": "delivery_discount",
    "discount_percent": 15,
    "message_template": "Rain outside? Stay cozy! {discount}% off delivery today.",
    "target_segment": "all_followers"
  }
  */

  -- Autonomy level required (links with ai_learning_progress)
  min_autonomy_level INTEGER DEFAULT 3 CHECK (min_autonomy_level BETWEEN 1 AND 4),

  -- Execution limits
  cooldown_hours INTEGER DEFAULT 24,             -- Minimum hours between triggers
  max_executions_per_day INTEGER DEFAULT 2,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Statistics
  times_triggered INTEGER DEFAULT 0,
  last_triggered_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: weather_trigger_executions
-- ============================================================================
-- Log of weather trigger executions

CREATE TABLE weather_trigger_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trigger_id UUID NOT NULL REFERENCES weather_triggers(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- What triggered it
  trigger_conditions_snapshot JSONB,             -- Weather conditions at trigger time

  -- Execution details
  action_taken TEXT,
  action_result JSONB,

  -- Autonomy
  autonomy_level_at_execution INTEGER,
  required_approval BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES accounts(id),
  approved_at TIMESTAMPTZ,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',      -- Waiting for approval (if required)
    'executed',     -- Successfully executed
    'skipped',      -- Skipped (cooldown, limit, etc.)
    'failed'        -- Execution failed
  )),

  -- Results tracking
  conversions INTEGER DEFAULT 0,                 -- If promo, how many used it
  revenue_attributed DECIMAL(12,2) DEFAULT 0,

  -- Timestamps
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  executed_at TIMESTAMPTZ
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Weather cache lookups
CREATE INDEX idx_weather_cache_location ON location_weather_cache(location_id);
CREATE INDEX idx_weather_cache_current_updated ON location_weather_cache(current_updated_at);

-- Correlations queries
CREATE INDEX idx_weather_correlations_location_date ON weather_business_correlations(location_id, observation_date DESC);
CREATE INDEX idx_weather_correlations_conditions ON weather_business_correlations(weather_conditions);

-- Trigger lookups
CREATE INDEX idx_weather_triggers_location ON weather_triggers(location_id);
CREATE INDEX idx_weather_triggers_active ON weather_triggers(location_id) WHERE is_active = true;

-- Executions
CREATE INDEX idx_weather_executions_trigger ON weather_trigger_executions(trigger_id);
CREATE INDEX idx_weather_executions_location ON weather_trigger_executions(location_id);
CREATE INDEX idx_weather_executions_status ON weather_trigger_executions(status);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to check if weather cache needs refresh
CREATE OR REPLACE FUNCTION check_weather_cache_freshness(
  p_location_id UUID,
  p_current_ttl_minutes INTEGER DEFAULT 60,
  p_forecast_ttl_minutes INTEGER DEFAULT 360
)
RETURNS TABLE (
  needs_current_refresh BOOLEAN,
  needs_forecast_refresh BOOLEAN,
  current_age_minutes INTEGER,
  forecast_age_minutes INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(
      EXTRACT(EPOCH FROM (NOW() - current_updated_at)) / 60 > p_current_ttl_minutes,
      true
    ) AS needs_current_refresh,
    COALESCE(
      EXTRACT(EPOCH FROM (NOW() - forecast_updated_at)) / 60 > p_forecast_ttl_minutes,
      true
    ) AS needs_forecast_refresh,
    COALESCE(
      EXTRACT(EPOCH FROM (NOW() - current_updated_at)) / 60,
      999999
    )::INTEGER AS current_age_minutes,
    COALESCE(
      EXTRACT(EPOCH FROM (NOW() - forecast_updated_at)) / 60,
      999999
    )::INTEGER AS forecast_age_minutes
  FROM location_weather_cache
  WHERE location_id = p_location_id;

  -- If no cache exists, return needs refresh = true
  IF NOT FOUND THEN
    RETURN QUERY SELECT true, true, 999999, 999999;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Function to get weather condition emoji
CREATE OR REPLACE FUNCTION get_weather_emoji(p_conditions TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN CASE LOWER(p_conditions)
    WHEN 'clear' THEN '☀️'
    WHEN 'sunny' THEN '☀️'
    WHEN 'partly-cloudy-day' THEN '⛅'
    WHEN 'partly-cloudy-night' THEN '☁️'
    WHEN 'cloudy' THEN '☁️'
    WHEN 'overcast' THEN '☁️'
    WHEN 'rain' THEN '🌧️'
    WHEN 'showers-day' THEN '🌦️'
    WHEN 'showers-night' THEN '🌧️'
    WHEN 'thunder-rain' THEN '⛈️'
    WHEN 'thunder-showers-day' THEN '⛈️'
    WHEN 'storm' THEN '⛈️'
    WHEN 'snow' THEN '❄️'
    WHEN 'snow-showers-day' THEN '🌨️'
    WHEN 'fog' THEN '🌫️'
    WHEN 'wind' THEN '💨'
    ELSE '🌡️'
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE
SET search_path = public;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE location_weather_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_business_correlations ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_trigger_executions ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "service_role_all_weather_cache" ON location_weather_cache
  FOR ALL TO service_role USING (true);

CREATE POLICY "service_role_all_weather_correlations" ON weather_business_correlations
  FOR ALL TO service_role USING (true);

CREATE POLICY "service_role_all_weather_triggers" ON weather_triggers
  FOR ALL TO service_role USING (true);

CREATE POLICY "service_role_all_weather_executions" ON weather_trigger_executions
  FOR ALL TO service_role USING (true);

-- Users can read weather data for their locations
-- Note: locations.brand_id -> brands.id, account_roles.tenant_id references brand
CREATE POLICY "users_read_own_weather_cache" ON location_weather_cache
  FOR SELECT USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN account_roles ar ON l.brand_id = ar.tenant_id
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "users_read_own_weather_correlations" ON weather_business_correlations
  FOR SELECT USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN account_roles ar ON l.brand_id = ar.tenant_id
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "users_manage_own_weather_triggers" ON weather_triggers
  FOR ALL USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN account_roles ar ON l.brand_id = ar.tenant_id
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "users_read_own_weather_executions" ON weather_trigger_executions
  FOR SELECT USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN account_roles ar ON l.brand_id = ar.tenant_id
      WHERE ar.account_id = auth.uid()
    )
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE location_weather_cache IS 'Cached weather data per location with TTL-based refresh';
COMMENT ON TABLE weather_business_correlations IS 'Historical weather vs business metrics for AI predictions';
COMMENT ON TABLE weather_triggers IS 'Configurable weather-based automation triggers';
COMMENT ON TABLE weather_trigger_executions IS 'Log of weather trigger executions';
COMMENT ON FUNCTION check_weather_cache_freshness IS 'Check if weather cache needs refresh based on TTL';
COMMENT ON FUNCTION get_weather_emoji IS 'Convert weather condition to emoji for UI display';
