-- =====================================================
-- Migration 021: Schedule Overrides System
-- Date: 2026-01-03
-- Description: Adds schedule_overrides table for temporary closures,
--              holidays, seasonal hours (tier-gated features)
-- Tier: Free/Basic gets temporary closures only
--       Pro gets holidays, seasonal, events
--       Enterprise gets advanced features
-- =====================================================

-- =====================================================
-- PART 1: CREATE SCHEDULE_OVERRIDES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS schedule_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Ownership
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Type and identification
  override_type TEXT NOT NULL CHECK (override_type IN (
    'closure',      -- Temporary closure (ferie, ristrutturazione) - FREE/BASIC
    'holiday',      -- National holidays (Natale, Pasqua) - PRO
    'seasonal',     -- Seasonal hours (orario estivo) - PRO
    'special',      -- Special hours (one-off) - PRO
    'event'         -- Event-generated override - PRO
  )),

  name TEXT NOT NULL,           -- "Chiusura per ferie", "Orario estivo 2026"
  description TEXT,             -- Optional longer description

  -- Date range
  date_start DATE NOT NULL,
  date_end DATE,                -- NULL = single day

  -- Recurrence (for yearly holidays)
  recurrence TEXT DEFAULT 'none' CHECK (recurrence IN (
    'none',         -- One-time
    'yearly'        -- Repeats every year (e.g., Christmas)
  )),

  -- Is the location completely closed?
  is_closed BOOLEAN DEFAULT false,

  -- Custom hours (if not closed)
  -- Format: {"open": "09:00", "close": "18:00"} or
  --         {"slots": [{"open": "09:00", "close": "14:00"}, {"open": "18:00", "close": "22:00"}]}
  hours JSONB,

  -- Priority (higher = takes precedence)
  -- Base operating_hours = 0
  -- Seasonal = 10
  -- Holiday = 20
  -- Special = 30
  -- Closure = 100 (always wins)
  priority INTEGER DEFAULT 10,

  -- Optional link to event (for event-generated overrides)
  event_id UUID,  -- Will add FK when events table exists

  -- Metadata
  created_by UUID,  -- User who created this

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PART 2: INDEXES
-- =====================================================

-- Most common query: get overrides for a location in a date range
CREATE INDEX IF NOT EXISTS idx_schedule_overrides_location_dates
  ON schedule_overrides(location_id, date_start, date_end);

-- Filter by type
CREATE INDEX IF NOT EXISTS idx_schedule_overrides_type
  ON schedule_overrides(override_type);

-- For yearly recurrence checks
CREATE INDEX IF NOT EXISTS idx_schedule_overrides_recurrence
  ON schedule_overrides(recurrence) WHERE recurrence = 'yearly';

-- =====================================================
-- PART 3: TRIGGER FOR updated_at
-- =====================================================

CREATE TRIGGER schedule_overrides_updated_at
  BEFORE UPDATE ON schedule_overrides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PART 4: ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE schedule_overrides ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view overrides for locations they have access to
CREATE POLICY "Schedule overrides viewable by authenticated"
  ON schedule_overrides FOR SELECT
  TO authenticated
  USING (true);  -- Will refine with org-based access

-- Anon users can view active overrides (needed for PWA)
CREATE POLICY "Schedule overrides readable by anon for PWA"
  ON schedule_overrides FOR SELECT
  TO anon
  USING (
    date_start <= CURRENT_DATE
    AND (date_end IS NULL OR date_end >= CURRENT_DATE)
  );

-- Insert/update/delete for authenticated users
CREATE POLICY "Schedule overrides manageable by authenticated"
  ON schedule_overrides FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);  -- Will refine with org-based access

-- =====================================================
-- PART 5: HELPER FUNCTION - Get effective hours for a date
-- =====================================================

CREATE OR REPLACE FUNCTION get_effective_hours(
  p_location_id UUID,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSONB AS $$
DECLARE
  v_base_hours JSONB;
  v_override RECORD;
  v_day_of_week TEXT;
  v_result JSONB;
BEGIN
  -- Get day of week (mon, tue, wed, thu, fri, sat, sun)
  v_day_of_week := LOWER(TO_CHAR(p_date, 'Dy'));

  -- Get base operating hours from location
  SELECT operating_hours INTO v_base_hours
  FROM locations
  WHERE id = p_location_id;

  -- Start with base hours for this day
  v_result := jsonb_build_object(
    'date', p_date,
    'source', 'base',
    'is_closed', v_base_hours->v_day_of_week IS NULL,
    'hours', v_base_hours->v_day_of_week
  );

  -- Find highest priority override for this date
  SELECT * INTO v_override
  FROM schedule_overrides
  WHERE location_id = p_location_id
    AND (
      -- Exact date match
      (date_start <= p_date AND (date_end IS NULL OR date_end >= p_date))
      OR
      -- Yearly recurrence (match month and day)
      (recurrence = 'yearly'
       AND EXTRACT(MONTH FROM date_start) = EXTRACT(MONTH FROM p_date)
       AND EXTRACT(DAY FROM date_start) = EXTRACT(DAY FROM p_date))
    )
  ORDER BY priority DESC, created_at DESC
  LIMIT 1;

  -- If override found, use it
  IF v_override IS NOT NULL THEN
    v_result := jsonb_build_object(
      'date', p_date,
      'source', v_override.override_type,
      'source_name', v_override.name,
      'is_closed', v_override.is_closed,
      'hours', CASE
        WHEN v_override.is_closed THEN NULL
        ELSE COALESCE(v_override.hours, v_base_hours->v_day_of_week)
      END
    );
  END IF;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- PART 6: HELPER FUNCTION - Check if location is open now
-- =====================================================

CREATE OR REPLACE FUNCTION is_location_open(
  p_location_id UUID,
  p_check_time TIMESTAMPTZ DEFAULT NOW()
)
RETURNS JSONB AS $$
DECLARE
  v_location RECORD;
  v_effective JSONB;
  v_local_time TIME;
  v_open_time TIME;
  v_close_time TIME;
  v_is_open BOOLEAN := false;
  v_hours JSONB;
BEGIN
  -- Get location timezone
  SELECT timezone INTO v_location
  FROM locations
  WHERE id = p_location_id;

  -- Convert to local time
  v_local_time := (p_check_time AT TIME ZONE COALESCE(v_location.timezone, 'UTC'))::TIME;

  -- Get effective hours for today
  v_effective := get_effective_hours(p_location_id, (p_check_time AT TIME ZONE COALESCE(v_location.timezone, 'UTC'))::DATE);

  -- Check if closed
  IF (v_effective->>'is_closed')::BOOLEAN THEN
    RETURN jsonb_build_object(
      'is_open', false,
      'reason', COALESCE(v_effective->>'source_name', 'Closed'),
      'effective_hours', v_effective
    );
  END IF;

  -- Get hours
  v_hours := v_effective->'hours';

  IF v_hours IS NULL THEN
    RETURN jsonb_build_object(
      'is_open', false,
      'reason', 'No hours set',
      'effective_hours', v_effective
    );
  END IF;

  -- Check if current time is within opening hours
  v_open_time := (v_hours->>'open')::TIME;
  v_close_time := (v_hours->>'close')::TIME;

  IF v_local_time >= v_open_time AND v_local_time <= v_close_time THEN
    v_is_open := true;
  END IF;

  RETURN jsonb_build_object(
    'is_open', v_is_open,
    'current_time', v_local_time,
    'opens_at', v_open_time,
    'closes_at', v_close_time,
    'effective_hours', v_effective
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- PART 7: COMMENTS
-- =====================================================

COMMENT ON TABLE schedule_overrides IS 'Overrides to location operating hours (closures, holidays, seasonal)';
COMMENT ON COLUMN schedule_overrides.override_type IS 'closure=Free tier, holiday/seasonal/special/event=Pro tier';
COMMENT ON COLUMN schedule_overrides.priority IS 'Higher priority wins: base=0, seasonal=10, holiday=20, special=30, closure=100';
COMMENT ON COLUMN schedule_overrides.recurrence IS 'yearly for annual holidays like Christmas';
COMMENT ON FUNCTION get_effective_hours IS 'Returns the effective opening hours for a location on a given date';
COMMENT ON FUNCTION is_location_open IS 'Checks if a location is currently open, considering all overrides';

-- =====================================================
-- Migration complete
-- =====================================================
