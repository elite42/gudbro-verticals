-- Migration: 048-ai-learning-progress.sql
-- Description: AI Co-Manager learning progress and autonomy governance system
-- Date: 2026-01-13
-- Dependencies: locations, ai_zone_analysis, ai_customer_intelligence

-- ============================================================================
-- AI LEARNING PROGRESS SYSTEM
-- ============================================================================
-- Tracks the AI Co-Manager's knowledge accumulation per location
-- Progress is based on REAL DATA, not arbitrary percentages
-- Autonomy level is calculated from actual knowledge milestones

-- ============================================================================
-- TABLE: ai_learning_progress
-- ============================================================================
-- Master table tracking learning progress per location

CREATE TABLE ai_learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- =========================================================================
  -- KNOWLEDGE AREA 1: Zone Analysis (instant if completed)
  -- =========================================================================
  zone_analysis_completed BOOLEAN DEFAULT false,
  zone_analysis_completed_at TIMESTAMPTZ,
  zone_analysis_data_points INTEGER DEFAULT 0,  -- POIs, competitors, etc.

  -- =========================================================================
  -- KNOWLEDGE AREA 2: Menu Knowledge (based on menu completeness)
  -- =========================================================================
  menu_items_imported INTEGER DEFAULT 0,
  menu_items_with_descriptions INTEGER DEFAULT 0,
  menu_items_with_ingredients INTEGER DEFAULT 0,
  menu_items_with_allergens INTEGER DEFAULT 0,
  menu_items_with_prices INTEGER DEFAULT 0,
  menu_categories_count INTEGER DEFAULT 0,

  -- =========================================================================
  -- KNOWLEDGE AREA 3: Competitor Intelligence (from zone analysis)
  -- =========================================================================
  competitors_analyzed INTEGER DEFAULT 0,
  competitor_prices_tracked INTEGER DEFAULT 0,

  -- =========================================================================
  -- KNOWLEDGE AREA 4: Customer Patterns (accumulates over time)
  -- Thresholds: 100 orders = 25%, 500 = 50%, 1000 = 75%, 2000 = 100%
  -- =========================================================================
  total_orders_processed INTEGER DEFAULT 0,
  unique_customers_seen INTEGER DEFAULT 0,
  repeat_customers_identified INTEGER DEFAULT 0,
  customer_segments_created INTEGER DEFAULT 0,
  peak_hours_identified BOOLEAN DEFAULT false,
  peak_days_identified BOOLEAN DEFAULT false,

  -- =========================================================================
  -- KNOWLEDGE AREA 5: Seasonal Trends (requires months of data)
  -- Thresholds: 1 month = 25%, 3 months = 50%, 6 months = 75%, 12 months = 100%
  -- =========================================================================
  first_order_date DATE,
  days_of_data INTEGER DEFAULT 0,
  months_of_data INTEGER DEFAULT 0,
  seasons_observed INTEGER DEFAULT 0,  -- 0-4 (spring, summer, fall, winter)
  seasonal_patterns_detected JSONB DEFAULT '[]',

  -- =========================================================================
  -- KNOWLEDGE AREA 6: Manager Preferences (from feedback interactions)
  -- Thresholds: 10 feedbacks = 25%, 25 = 50%, 50 = 75%, 100 = 100%
  -- =========================================================================
  total_ai_suggestions INTEGER DEFAULT 0,
  suggestions_accepted INTEGER DEFAULT 0,
  suggestions_rejected INTEGER DEFAULT 0,
  suggestions_modified INTEGER DEFAULT 0,
  explicit_preferences_set INTEGER DEFAULT 0,
  communication_style_learned BOOLEAN DEFAULT false,

  -- =========================================================================
  -- KNOWLEDGE AREA 7: Weather Correlations (requires weather + sales data)
  -- Thresholds: 7 days = 25%, 30 days = 50%, 90 days = 75%, 180 days = 100%
  -- =========================================================================
  weather_data_days INTEGER DEFAULT 0,
  weather_sales_correlations_found INTEGER DEFAULT 0,
  weather_predictions_made INTEGER DEFAULT 0,
  weather_predictions_accurate INTEGER DEFAULT 0,

  -- =========================================================================
  -- CALCULATED PROGRESS (0-100 for each area)
  -- These are calculated by a function, stored for quick access
  -- =========================================================================
  progress_zone_analysis INTEGER DEFAULT 0,
  progress_menu_knowledge INTEGER DEFAULT 0,
  progress_competitor_intel INTEGER DEFAULT 0,
  progress_customer_patterns INTEGER DEFAULT 0,
  progress_seasonal_trends INTEGER DEFAULT 0,
  progress_manager_preferences INTEGER DEFAULT 0,
  progress_weather_correlations INTEGER DEFAULT 0,

  -- Overall progress (weighted average)
  overall_progress INTEGER DEFAULT 0,

  -- Autonomy level (1-4)
  autonomy_level INTEGER DEFAULT 1 CHECK (autonomy_level BETWEEN 1 AND 4),

  -- =========================================================================
  -- AUTONOMY SETTINGS (manager can override)
  -- =========================================================================
  autonomy_override INTEGER,                     -- If set, use this instead of calculated
  max_auto_spend_limit DECIMAL(10,2),           -- Max spend AI can authorize
  allowed_auto_actions JSONB DEFAULT '[]',      -- List of actions AI can do autonomously
  blocked_auto_actions JSONB DEFAULT '[]',      -- List of actions AI must NEVER do alone

  -- =========================================================================
  -- METADATA
  -- =========================================================================
  last_progress_calculation TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_location_learning UNIQUE (location_id)
);

-- ============================================================================
-- TABLE: ai_learning_milestones
-- ============================================================================
-- Tracks when specific milestones are reached (for celebration/notification)

CREATE TABLE ai_learning_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  milestone_type TEXT NOT NULL,
  milestone_name TEXT NOT NULL,
  milestone_value INTEGER,

  -- What unlocked
  unlocked_capability TEXT,

  -- Notification
  notified_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES accounts(id),

  reached_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: ai_autonomy_audit_log
-- ============================================================================
-- Audit trail of all autonomous actions taken by AI

CREATE TABLE ai_autonomy_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- What was done
  action_type TEXT NOT NULL,
  action_description TEXT NOT NULL,
  action_data JSONB,

  -- Autonomy context
  autonomy_level_at_action INTEGER NOT NULL,
  required_level INTEGER NOT NULL,
  was_auto_approved BOOLEAN DEFAULT false,

  -- If manual approval needed
  approval_requested_at TIMESTAMPTZ,
  approval_status TEXT CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES accounts(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,

  -- Outcome
  execution_status TEXT CHECK (execution_status IN ('pending', 'executed', 'failed', 'cancelled')),
  execution_result JSONB,
  executed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- FUNCTION: Calculate Learning Progress
-- ============================================================================
-- Recalculates all progress values based on actual data

CREATE OR REPLACE FUNCTION calculate_ai_learning_progress(p_location_id UUID)
RETURNS TABLE (
  zone_analysis INTEGER,
  menu_knowledge INTEGER,
  competitor_intel INTEGER,
  customer_patterns INTEGER,
  seasonal_trends INTEGER,
  manager_preferences INTEGER,
  weather_correlations INTEGER,
  overall INTEGER,
  calculated_autonomy INTEGER
) AS $$
DECLARE
  v_progress RECORD;
  v_zone INTEGER;
  v_menu INTEGER;
  v_competitor INTEGER;
  v_customer INTEGER;
  v_seasonal INTEGER;
  v_manager INTEGER;
  v_weather INTEGER;
  v_overall INTEGER;
  v_autonomy INTEGER;
BEGIN
  -- Get current progress data
  SELECT * INTO v_progress FROM ai_learning_progress WHERE location_id = p_location_id;

  IF NOT FOUND THEN
    -- Return zeros if no record
    RETURN QUERY SELECT 0, 0, 0, 0, 0, 0, 0, 0, 1;
    RETURN;
  END IF;

  -- Calculate Zone Analysis Progress
  -- 100% if completed, 0% otherwise
  v_zone := CASE WHEN v_progress.zone_analysis_completed THEN 100 ELSE 0 END;

  -- Calculate Menu Knowledge Progress
  -- Based on completeness of menu items
  v_menu := LEAST(100, (
    CASE WHEN v_progress.menu_items_imported > 0 THEN 25 ELSE 0 END +
    CASE WHEN v_progress.menu_items_with_descriptions > v_progress.menu_items_imported * 0.5 THEN 25 ELSE
         (v_progress.menu_items_with_descriptions::FLOAT / NULLIF(v_progress.menu_items_imported, 0) * 25)::INTEGER END +
    CASE WHEN v_progress.menu_items_with_ingredients > v_progress.menu_items_imported * 0.5 THEN 25 ELSE
         (v_progress.menu_items_with_ingredients::FLOAT / NULLIF(v_progress.menu_items_imported, 0) * 25)::INTEGER END +
    CASE WHEN v_progress.menu_categories_count >= 5 THEN 25 ELSE v_progress.menu_categories_count * 5 END
  ));

  -- Calculate Competitor Intel Progress
  -- 0 competitors = 0%, 3+ = 50%, 5+ with prices = 100%
  v_competitor := LEAST(100, (
    LEAST(50, v_progress.competitors_analyzed * 17) +
    LEAST(50, v_progress.competitor_prices_tracked * 10)
  ));

  -- Calculate Customer Patterns Progress
  -- 100 orders = 25%, 500 = 50%, 1000 = 75%, 2000 = 100%
  v_customer := LEAST(100, (
    CASE
      WHEN v_progress.total_orders_processed >= 2000 THEN 50
      WHEN v_progress.total_orders_processed >= 1000 THEN 40
      WHEN v_progress.total_orders_processed >= 500 THEN 30
      WHEN v_progress.total_orders_processed >= 100 THEN 20
      ELSE (v_progress.total_orders_processed::FLOAT / 100 * 20)::INTEGER
    END +
    CASE WHEN v_progress.repeat_customers_identified >= 50 THEN 20 ELSE
         LEAST(20, v_progress.repeat_customers_identified / 2.5)::INTEGER END +
    CASE WHEN v_progress.peak_hours_identified THEN 15 ELSE 0 END +
    CASE WHEN v_progress.peak_days_identified THEN 15 ELSE 0 END
  ));

  -- Calculate Seasonal Trends Progress
  -- 1 month = 25%, 3 months = 50%, 6 months = 75%, 12 months = 100%
  v_seasonal := LEAST(100, (
    CASE
      WHEN v_progress.months_of_data >= 12 THEN 100
      WHEN v_progress.months_of_data >= 6 THEN 75
      WHEN v_progress.months_of_data >= 3 THEN 50
      WHEN v_progress.months_of_data >= 1 THEN 25
      ELSE (v_progress.days_of_data::FLOAT / 30 * 25)::INTEGER
    END
  ));

  -- Calculate Manager Preferences Progress
  -- 10 feedbacks = 25%, 25 = 50%, 50 = 75%, 100 = 100%
  v_manager := LEAST(100, (
    CASE
      WHEN (v_progress.suggestions_accepted + v_progress.suggestions_rejected) >= 100 THEN 60
      WHEN (v_progress.suggestions_accepted + v_progress.suggestions_rejected) >= 50 THEN 45
      WHEN (v_progress.suggestions_accepted + v_progress.suggestions_rejected) >= 25 THEN 30
      WHEN (v_progress.suggestions_accepted + v_progress.suggestions_rejected) >= 10 THEN 15
      ELSE ((v_progress.suggestions_accepted + v_progress.suggestions_rejected)::FLOAT / 10 * 15)::INTEGER
    END +
    LEAST(20, v_progress.explicit_preferences_set * 4) +
    CASE WHEN v_progress.communication_style_learned THEN 20 ELSE 0 END
  ));

  -- Calculate Weather Correlations Progress
  -- 7 days = 25%, 30 days = 50%, 90 days = 75%, 180 days = 100%
  v_weather := LEAST(100, (
    CASE
      WHEN v_progress.weather_data_days >= 180 THEN 60
      WHEN v_progress.weather_data_days >= 90 THEN 45
      WHEN v_progress.weather_data_days >= 30 THEN 30
      WHEN v_progress.weather_data_days >= 7 THEN 15
      ELSE (v_progress.weather_data_days::FLOAT / 7 * 15)::INTEGER
    END +
    LEAST(20, v_progress.weather_sales_correlations_found * 4) +
    CASE
      WHEN v_progress.weather_predictions_made > 0 AND
           v_progress.weather_predictions_accurate::FLOAT / v_progress.weather_predictions_made > 0.7
      THEN 20
      ELSE 0
    END
  ));

  -- Calculate Overall Progress (weighted average)
  -- Weights: Zone 10%, Menu 15%, Competitor 10%, Customer 25%, Seasonal 15%, Manager 15%, Weather 10%
  v_overall := (
    v_zone * 0.10 +
    v_menu * 0.15 +
    v_competitor * 0.10 +
    v_customer * 0.25 +
    v_seasonal * 0.15 +
    v_manager * 0.15 +
    v_weather * 0.10
  )::INTEGER;

  -- Calculate Autonomy Level
  v_autonomy := CASE
    WHEN v_overall >= 75 THEN 4  -- Co-Manager
    WHEN v_overall >= 50 THEN 3  -- Partner
    WHEN v_overall >= 25 THEN 2  -- Assistant
    ELSE 1                        -- Observer
  END;

  -- Update the record
  UPDATE ai_learning_progress
  SET
    progress_zone_analysis = v_zone,
    progress_menu_knowledge = v_menu,
    progress_competitor_intel = v_competitor,
    progress_customer_patterns = v_customer,
    progress_seasonal_trends = v_seasonal,
    progress_manager_preferences = v_manager,
    progress_weather_correlations = v_weather,
    overall_progress = v_overall,
    autonomy_level = COALESCE(autonomy_override, v_autonomy),
    last_progress_calculation = NOW(),
    updated_at = NOW()
  WHERE location_id = p_location_id;

  RETURN QUERY SELECT v_zone, v_menu, v_competitor, v_customer, v_seasonal, v_manager, v_weather, v_overall, v_autonomy;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- ============================================================================
-- FUNCTION: Check if AI can perform action autonomously
-- ============================================================================

CREATE OR REPLACE FUNCTION can_ai_act_autonomously(
  p_location_id UUID,
  p_action_type TEXT,
  p_required_level INTEGER DEFAULT 3
)
RETURNS TABLE (
  can_act BOOLEAN,
  current_level INTEGER,
  required_level INTEGER,
  reason TEXT
) AS $$
DECLARE
  v_progress RECORD;
  v_can_act BOOLEAN;
  v_reason TEXT;
BEGIN
  SELECT * INTO v_progress FROM ai_learning_progress WHERE location_id = p_location_id;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 1, p_required_level, 'No learning data found for this location'::TEXT;
    RETURN;
  END IF;

  -- Check if action is blocked
  IF v_progress.blocked_auto_actions ? p_action_type THEN
    RETURN QUERY SELECT false, v_progress.autonomy_level, p_required_level,
                        'Action is blocked by manager settings'::TEXT;
    RETURN;
  END IF;

  -- Check autonomy level
  IF COALESCE(v_progress.autonomy_override, v_progress.autonomy_level) >= p_required_level THEN
    v_can_act := true;
    v_reason := 'Autonomy level sufficient';
  ELSE
    v_can_act := false;
    v_reason := format('Need level %s but only at level %s',
                       p_required_level,
                       COALESCE(v_progress.autonomy_override, v_progress.autonomy_level));
  END IF;

  RETURN QUERY SELECT v_can_act,
                      COALESCE(v_progress.autonomy_override, v_progress.autonomy_level),
                      p_required_level,
                      v_reason;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- ============================================================================
-- FUNCTION: Get autonomy level name
-- ============================================================================

CREATE OR REPLACE FUNCTION get_autonomy_level_name(p_level INTEGER)
RETURNS TEXT AS $$
BEGIN
  RETURN CASE p_level
    WHEN 1 THEN 'Observer'
    WHEN 2 THEN 'Assistant'
    WHEN 3 THEN 'Partner'
    WHEN 4 THEN 'Co-Manager'
    ELSE 'Unknown'
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE
SET search_path = public;

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_learning_progress_location ON ai_learning_progress(location_id);
CREATE INDEX idx_learning_progress_autonomy ON ai_learning_progress(autonomy_level);
CREATE INDEX idx_learning_milestones_location ON ai_learning_milestones(location_id);
CREATE INDEX idx_autonomy_audit_location ON ai_autonomy_audit_log(location_id);
CREATE INDEX idx_autonomy_audit_status ON ai_autonomy_audit_log(approval_status) WHERE approval_status = 'pending';

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE ai_learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_learning_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_autonomy_audit_log ENABLE ROW LEVEL SECURITY;

-- Service role policies
CREATE POLICY "service_role_all_learning_progress" ON ai_learning_progress
  FOR ALL TO service_role USING (true);

CREATE POLICY "service_role_all_learning_milestones" ON ai_learning_milestones
  FOR ALL TO service_role USING (true);

CREATE POLICY "service_role_all_autonomy_audit" ON ai_autonomy_audit_log
  FOR ALL TO service_role USING (true);

-- User policies
-- Note: locations.brand_id -> brands.id, account_roles.tenant_id references brand
CREATE POLICY "users_manage_own_learning_progress" ON ai_learning_progress
  FOR ALL USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN account_roles ar ON l.brand_id = ar.tenant_id
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "users_read_own_learning_milestones" ON ai_learning_milestones
  FOR SELECT USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN account_roles ar ON l.brand_id = ar.tenant_id
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "users_manage_own_autonomy_audit" ON ai_autonomy_audit_log
  FOR ALL USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN account_roles ar ON l.brand_id = ar.tenant_id
      WHERE ar.account_id = auth.uid()
    )
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE ai_learning_progress IS 'Tracks AI Co-Manager knowledge accumulation per location based on real data';
COMMENT ON TABLE ai_learning_milestones IS 'Records when AI reaches specific learning milestones';
COMMENT ON TABLE ai_autonomy_audit_log IS 'Audit trail of all autonomous actions by AI';
COMMENT ON FUNCTION calculate_ai_learning_progress IS 'Recalculates all learning progress based on actual data';
COMMENT ON FUNCTION can_ai_act_autonomously IS 'Checks if AI has sufficient autonomy for an action';
COMMENT ON FUNCTION get_autonomy_level_name IS 'Returns human-readable name for autonomy level';

-- ============================================================================
-- INITIAL MILESTONES DEFINITION (for reference)
-- ============================================================================
/*
Milestone definitions (used by application code):

ZONE_ANALYSIS_COMPLETE:
  - Type: zone_analysis
  - Condition: zone_analysis_completed = true
  - Unlocks: "AI can now analyze your business context"

FIRST_100_ORDERS:
  - Type: customer_patterns
  - Condition: total_orders_processed >= 100
  - Unlocks: "AI can start identifying customer patterns"

FIRST_REPEAT_CUSTOMERS:
  - Type: customer_patterns
  - Condition: repeat_customers_identified >= 10
  - Unlocks: "AI can now recognize your loyal customers"

PEAK_HOURS_IDENTIFIED:
  - Type: customer_patterns
  - Condition: peak_hours_identified = true
  - Unlocks: "AI knows your busiest hours"

FIRST_MONTH_COMPLETE:
  - Type: seasonal_trends
  - Condition: months_of_data >= 1
  - Unlocks: "AI has one month of data to learn from"

FIRST_SEASON_COMPLETE:
  - Type: seasonal_trends
  - Condition: seasons_observed >= 1
  - Unlocks: "AI can start comparing seasonal patterns"

MANAGER_STYLE_LEARNED:
  - Type: manager_preferences
  - Condition: communication_style_learned = true
  - Unlocks: "AI understands how you like to communicate"

WEATHER_READY:
  - Type: weather_correlations
  - Condition: weather_data_days >= 30 AND weather_sales_correlations_found >= 3
  - Unlocks: "AI can predict weather impact on your business"

AUTONOMY_LEVEL_2:
  - Type: autonomy
  - Condition: autonomy_level >= 2
  - Unlocks: "AI can now handle routine tasks with notifications"

AUTONOMY_LEVEL_3:
  - Type: autonomy
  - Condition: autonomy_level >= 3
  - Unlocks: "AI can make autonomous decisions within limits"

AUTONOMY_LEVEL_4:
  - Type: autonomy
  - Condition: autonomy_level >= 4
  - Unlocks: "AI is now a full Co-Manager partner"
*/
