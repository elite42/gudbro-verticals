-- ===========================================
-- HOT ACTIONS SYSTEM
-- ===========================================
-- Created: 2026-01-04
-- Purpose: Customer-to-staff quick action requests
-- Inspired by: MenuTiger (unique feature)
-- ===========================================

-- ===========================================
-- PART 1: HOT ACTION TYPES (Configurable per location)
-- ===========================================

CREATE TABLE IF NOT EXISTS hot_action_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Action Info
  code TEXT NOT NULL,                         -- 'call_waiter', 'request_bill', etc.
  name TEXT NOT NULL,                         -- Display name
  name_it TEXT,                               -- Italian translation
  description TEXT,                           -- "Call someone to the table"
  icon TEXT DEFAULT 'bell',                   -- Icon name or emoji
  color TEXT DEFAULT '#3B82F6',               -- Hex color for UI

  -- Behavior
  requires_table BOOLEAN DEFAULT true,        -- Must have table number?
  requires_note BOOLEAN DEFAULT false,        -- Requires customer note?
  auto_acknowledge_minutes INTEGER,           -- Auto-mark as seen after X minutes
  cooldown_minutes INTEGER DEFAULT 5,         -- Prevent spam (same table/action)

  -- Notifications
  notification_sound TEXT DEFAULT 'bell',     -- Sound file name
  notification_priority TEXT DEFAULT 'normal' CHECK (notification_priority IN ('low', 'normal', 'high', 'urgent')),

  -- Status
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint per location/code
  UNIQUE(location_id, code)
);

-- ===========================================
-- PART 2: HOT ACTION REQUESTS
-- ===========================================

CREATE TABLE IF NOT EXISTS hot_action_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  action_type_id UUID NOT NULL REFERENCES hot_action_types(id) ON DELETE CASCADE,

  -- Request Info
  table_number TEXT,                          -- "12", "Terrazza 3", etc.
  customer_note TEXT,                         -- Optional note from customer
  device_id TEXT,                             -- For tracking/preventing spam

  -- Status Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',        -- Just created
    'acknowledged',   -- Staff saw it
    'in_progress',    -- Being handled
    'completed',      -- Done
    'cancelled'       -- Cancelled by customer or staff
  )),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES accounts(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES accounts(id) ON DELETE SET NULL,

  -- Response time tracking (for analytics)
  response_time_seconds INTEGER GENERATED ALWAYS AS (
    CASE WHEN acknowledged_at IS NOT NULL
      THEN EXTRACT(EPOCH FROM (acknowledged_at - created_at))::INTEGER
      ELSE NULL
    END
  ) STORED
);

-- ===========================================
-- PART 3: INDEXES
-- ===========================================

-- Hot action types
CREATE INDEX IF NOT EXISTS idx_hot_action_types_location ON hot_action_types(location_id);
CREATE INDEX IF NOT EXISTS idx_hot_action_types_active ON hot_action_types(location_id, is_active) WHERE is_active = true;

-- Hot action requests
CREATE INDEX IF NOT EXISTS idx_hot_action_requests_location ON hot_action_requests(location_id);
CREATE INDEX IF NOT EXISTS idx_hot_action_requests_status ON hot_action_requests(location_id, status);
CREATE INDEX IF NOT EXISTS idx_hot_action_requests_pending ON hot_action_requests(location_id, created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_hot_action_requests_today ON hot_action_requests(location_id, created_at DESC);

-- ===========================================
-- PART 4: TRIGGERS
-- ===========================================

-- Update updated_at for action types
CREATE TRIGGER hot_action_types_updated_at
  BEFORE UPDATE ON hot_action_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- PART 5: SEED DEFAULT ACTION TYPES
-- ===========================================

-- Function to seed default actions for a location
CREATE OR REPLACE FUNCTION seed_default_hot_actions(p_location_id UUID)
RETURNS void AS $$
BEGIN
  -- Call Waiter
  INSERT INTO hot_action_types (location_id, code, name, name_it, description, icon, color, display_order, notification_priority)
  VALUES (
    p_location_id,
    'call_waiter',
    'Call Waiter',
    'Chiama Cameriere',
    'Request a staff member to come to your table',
    'hand-raised',
    '#3B82F6',
    1,
    'high'
  ) ON CONFLICT (location_id, code) DO NOTHING;

  -- Request Bill
  INSERT INTO hot_action_types (location_id, code, name, name_it, description, icon, color, display_order, notification_priority)
  VALUES (
    p_location_id,
    'request_bill',
    'Request Bill',
    'Richiedi Conto',
    'Ask for the bill to be brought to your table',
    'receipt',
    '#10B981',
    2,
    'normal'
  ) ON CONFLICT (location_id, code) DO NOTHING;

  -- Clean Table
  INSERT INTO hot_action_types (location_id, code, name, name_it, description, icon, color, display_order, notification_priority)
  VALUES (
    p_location_id,
    'clean_table',
    'Clean Table',
    'Pulisci Tavolo',
    'Request table cleaning service',
    'sparkles',
    '#F59E0B',
    3,
    'low'
  ) ON CONFLICT (location_id, code) DO NOTHING;

  -- Need Assistance
  INSERT INTO hot_action_types (location_id, code, name, name_it, description, icon, color, display_order, notification_priority)
  VALUES (
    p_location_id,
    'need_assistance',
    'Need Assistance',
    'Serve Aiuto',
    'General assistance request',
    'question-mark-circle',
    '#8B5CF6',
    4,
    'normal'
  ) ON CONFLICT (location_id, code) DO NOTHING;

  -- Water/Refill
  INSERT INTO hot_action_types (location_id, code, name, name_it, description, icon, color, display_order, notification_priority)
  VALUES (
    p_location_id,
    'water_refill',
    'Water Refill',
    'Acqua/Ricarica',
    'Request water or drink refill',
    'beaker',
    '#06B6D4',
    5,
    'low'
  ) ON CONFLICT (location_id, code) DO NOTHING;

END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- PART 6: HELPER FUNCTIONS
-- ===========================================

-- Get active actions for a location (for PWA)
CREATE OR REPLACE FUNCTION get_hot_actions_for_location(p_location_id UUID)
RETURNS TABLE (
  id UUID,
  code TEXT,
  name TEXT,
  name_it TEXT,
  description TEXT,
  icon TEXT,
  color TEXT,
  requires_table BOOLEAN,
  requires_note BOOLEAN,
  cooldown_minutes INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    hat.id,
    hat.code,
    hat.name,
    hat.name_it,
    hat.description,
    hat.icon,
    hat.color,
    hat.requires_table,
    hat.requires_note,
    hat.cooldown_minutes
  FROM hot_action_types hat
  WHERE hat.location_id = p_location_id
    AND hat.is_active = true
  ORDER BY hat.display_order, hat.name;
END;
$$ LANGUAGE plpgsql STABLE;

-- Check if action is on cooldown for a device/table
CREATE OR REPLACE FUNCTION can_submit_hot_action(
  p_location_id UUID,
  p_action_code TEXT,
  p_table_number TEXT,
  p_device_id TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_cooldown INTEGER;
  v_last_request TIMESTAMPTZ;
BEGIN
  -- Get cooldown minutes for this action
  SELECT cooldown_minutes INTO v_cooldown
  FROM hot_action_types
  WHERE location_id = p_location_id AND code = p_action_code;

  IF v_cooldown IS NULL OR v_cooldown = 0 THEN
    RETURN true;
  END IF;

  -- Find last request from same table/device
  SELECT created_at INTO v_last_request
  FROM hot_action_requests har
  JOIN hot_action_types hat ON har.action_type_id = hat.id
  WHERE har.location_id = p_location_id
    AND hat.code = p_action_code
    AND (har.table_number = p_table_number OR har.device_id = p_device_id)
    AND har.status IN ('pending', 'acknowledged', 'in_progress')
  ORDER BY har.created_at DESC
  LIMIT 1;

  IF v_last_request IS NULL THEN
    RETURN true;
  END IF;

  -- Check if cooldown has passed
  RETURN (NOW() - v_last_request) > (v_cooldown * INTERVAL '1 minute');
END;
$$ LANGUAGE plpgsql STABLE;

-- Submit a hot action request
CREATE OR REPLACE FUNCTION submit_hot_action(
  p_location_id UUID,
  p_action_code TEXT,
  p_table_number TEXT DEFAULT NULL,
  p_device_id TEXT DEFAULT NULL,
  p_note TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_action_type_id UUID;
  v_request_id UUID;
  v_can_submit BOOLEAN;
BEGIN
  -- Get action type
  SELECT id INTO v_action_type_id
  FROM hot_action_types
  WHERE location_id = p_location_id AND code = p_action_code AND is_active = true;

  IF v_action_type_id IS NULL THEN
    RAISE EXCEPTION 'Action type not found or inactive: %', p_action_code;
  END IF;

  -- Check cooldown
  v_can_submit := can_submit_hot_action(p_location_id, p_action_code, p_table_number, p_device_id);

  IF NOT v_can_submit THEN
    RAISE EXCEPTION 'Action on cooldown. Please wait before submitting again.';
  END IF;

  -- Create request
  INSERT INTO hot_action_requests (
    location_id,
    action_type_id,
    table_number,
    device_id,
    customer_note
  ) VALUES (
    p_location_id,
    v_action_type_id,
    p_table_number,
    p_device_id,
    p_note
  )
  RETURNING id INTO v_request_id;

  RETURN v_request_id;
END;
$$ LANGUAGE plpgsql;

-- Acknowledge a request
CREATE OR REPLACE FUNCTION acknowledge_hot_action(
  p_request_id UUID,
  p_staff_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE hot_action_requests
  SET
    status = 'acknowledged',
    acknowledged_at = NOW(),
    acknowledged_by = p_staff_id
  WHERE id = p_request_id
    AND status = 'pending';

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Complete a request
CREATE OR REPLACE FUNCTION complete_hot_action(
  p_request_id UUID,
  p_staff_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE hot_action_requests
  SET
    status = 'completed',
    completed_at = NOW(),
    completed_by = p_staff_id
  WHERE id = p_request_id
    AND status IN ('pending', 'acknowledged', 'in_progress');

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Get pending requests for a location (for dashboard)
CREATE OR REPLACE FUNCTION get_pending_hot_actions(
  p_location_id UUID,
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
  request_id UUID,
  action_code TEXT,
  action_name TEXT,
  action_icon TEXT,
  action_color TEXT,
  table_number TEXT,
  customer_note TEXT,
  status TEXT,
  priority TEXT,
  created_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by_name TEXT,
  seconds_waiting INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    har.id AS request_id,
    hat.code AS action_code,
    hat.name AS action_name,
    hat.icon AS action_icon,
    hat.color AS action_color,
    har.table_number,
    har.customer_note,
    har.status,
    hat.notification_priority AS priority,
    har.created_at,
    har.acknowledged_at,
    a.first_name || ' ' || a.last_name AS acknowledged_by_name,
    EXTRACT(EPOCH FROM (NOW() - har.created_at))::INTEGER AS seconds_waiting
  FROM hot_action_requests har
  JOIN hot_action_types hat ON har.action_type_id = hat.id
  LEFT JOIN accounts a ON har.acknowledged_by = a.id
  WHERE har.location_id = p_location_id
    AND har.status IN ('pending', 'acknowledged', 'in_progress')
  ORDER BY
    CASE hat.notification_priority
      WHEN 'urgent' THEN 1
      WHEN 'high' THEN 2
      WHEN 'normal' THEN 3
      WHEN 'low' THEN 4
    END,
    har.created_at ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- Get stats for analytics
CREATE OR REPLACE FUNCTION get_hot_action_stats(
  p_location_id UUID,
  p_start_date DATE DEFAULT CURRENT_DATE - 7,
  p_end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  action_code TEXT,
  action_name TEXT,
  total_requests BIGINT,
  avg_response_seconds NUMERIC,
  completed_count BIGINT,
  cancelled_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    hat.code AS action_code,
    hat.name AS action_name,
    COUNT(*) AS total_requests,
    ROUND(AVG(har.response_time_seconds), 1) AS avg_response_seconds,
    COUNT(*) FILTER (WHERE har.status = 'completed') AS completed_count,
    COUNT(*) FILTER (WHERE har.status = 'cancelled') AS cancelled_count
  FROM hot_action_requests har
  JOIN hot_action_types hat ON har.action_type_id = hat.id
  WHERE har.location_id = p_location_id
    AND har.created_at::DATE BETWEEN p_start_date AND p_end_date
  GROUP BY hat.code, hat.name
  ORDER BY total_requests DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- ===========================================
-- PART 7: ROW LEVEL SECURITY
-- ===========================================

ALTER TABLE hot_action_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE hot_action_requests ENABLE ROW LEVEL SECURITY;

-- Action types: public read for active, authenticated manage
CREATE POLICY "Hot action types readable by all"
  ON hot_action_types FOR SELECT
  USING (is_active = true);

CREATE POLICY "Hot action types manageable by authenticated"
  ON hot_action_types FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Requests: anyone can create (for PWA), authenticated can manage
CREATE POLICY "Hot action requests insertable by anyone"
  ON hot_action_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Hot action requests readable by authenticated"
  ON hot_action_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Hot action requests updatable by authenticated"
  ON hot_action_requests FOR UPDATE
  TO authenticated
  USING (true);

-- ===========================================
-- PART 8: REALTIME
-- ===========================================

-- Enable realtime for hot_action_requests (for live dashboard)
ALTER PUBLICATION supabase_realtime ADD TABLE hot_action_requests;

-- ===========================================
-- PART 9: COMMENTS
-- ===========================================

COMMENT ON TABLE hot_action_types IS 'Configurable hot action types per location (call waiter, request bill, etc.)';
COMMENT ON TABLE hot_action_requests IS 'Customer requests for hot actions, tracked with response times';
COMMENT ON FUNCTION seed_default_hot_actions IS 'Seeds 5 default hot actions for a new location';
COMMENT ON FUNCTION submit_hot_action IS 'Submit a hot action request with cooldown protection';
COMMENT ON FUNCTION get_pending_hot_actions IS 'Get pending requests for staff dashboard with priority sorting';
