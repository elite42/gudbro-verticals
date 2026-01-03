-- ===========================================
-- EVENTS TABLE
-- ===========================================
-- Created: 2026-01-03
-- Purpose: Store events for locations with impact on schedule, menu, and capacity
-- Part of: Schedule System Phase 3 (Pro Tier)
-- ===========================================

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN (
    -- Entertainment
    'live_music', 'dj_set', 'karaoke', 'trivia_night', 'game_night',
    'comedy_night', 'open_mic', 'theme_night',
    -- Food & Beverage
    'tasting', 'pairing', 'chefs_table', 'cooking_class', 'menu_launch', 'food_tour',
    -- Time-based Promos
    'happy_hour', 'brunch', 'lunch_special', 'late_night',
    -- Sports
    'sports_viewing',
    -- Community
    'networking', 'charity', 'book_club', 'wine_club', 'singles_night',
    -- Private & Corporate
    'private_party', 'corporate', 'birthday', 'anniversary',
    -- Special
    'holiday', 'special_menu', 'closure', 'other'
  )),
  event_category TEXT NOT NULL CHECK (event_category IN (
    'entertainment', 'food', 'promo', 'sports', 'community', 'private', 'special'
  )),
  status TEXT DEFAULT 'draft' CHECK (status IN (
    'draft', 'published', 'cancelled', 'completed'
  )),

  -- Timing
  start_date DATE NOT NULL,
  end_date DATE,                           -- NULL = single day event
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone TEXT DEFAULT 'Asia/Ho_Chi_Minh',

  -- Recurrence (for recurring events like weekly happy hour)
  recurrence TEXT DEFAULT 'none' CHECK (recurrence IN (
    'none', 'daily', 'weekly', 'biweekly', 'monthly'
  )),
  recurrence_days INTEGER[],               -- [1,3,5] for Mon,Wed,Fri (ISO weekday)
  recurrence_end_date DATE,                -- When to stop recurring

  -- Venue Impact
  venue_status TEXT DEFAULT 'open' CHECK (venue_status IN (
    'open',              -- Normal operation
    'partial',           -- Partially available
    'reservation_only',  -- Only reservations
    'members_only',      -- Members/VIP only
    'closed'             -- Closed to public
  )),
  affected_areas TEXT[],                   -- ['terrace', 'main_hall']
  reduced_capacity INTEGER,                -- Max capacity during event

  -- Hours Override (auto-generates schedule_override)
  hours_override JSONB,                    -- {"open": "18:00", "close": "02:00"}
  auto_create_schedule_override BOOLEAN DEFAULT true,
  schedule_override_id UUID REFERENCES schedule_overrides(id) ON DELETE SET NULL,

  -- Menu Impact
  menu_impact JSONB DEFAULT '{}',          -- {useSpecialMenu: true, specialMenuId: "...", disabledCategories: [...]}

  -- Access & Tickets
  requires_reservation BOOLEAN DEFAULT false,
  entrance_fee DECIMAL(10,2),
  max_capacity INTEGER,
  current_attendees INTEGER DEFAULT 0,
  ticket_url TEXT,

  -- Loyalty Integration
  loyalty_bonus JSONB DEFAULT '{}',        -- {enabled: true, pointsMultiplier: 2, bonusPoints: 100}

  -- Performer (for entertainment events)
  performer JSONB,                         -- {name: "...", genre: "...", image: "..."}

  -- Sports (for sports viewing events)
  sports_info JSONB,                       -- {sport: "football", homeTeam: "...", awayTeam: "...", competition: "..."}

  -- Promotions (array of promotion objects)
  promotions JSONB DEFAULT '[]',           -- [{id, name, mechanic, value, applicableTo, ...}]

  -- Visual
  image_url TEXT,
  color TEXT,                              -- Hex color for calendar display
  tags TEXT[],

  -- Metadata
  is_featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,          -- Visible on PWA?
  created_by UUID REFERENCES accounts(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_location ON events(location_id);
CREATE INDEX IF NOT EXISTS idx_events_dates ON events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(event_category);
CREATE INDEX IF NOT EXISTS idx_events_public ON events(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured) WHERE is_featured = true;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS events_updated_at ON events;
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_events_updated_at();

-- ===========================================
-- AUTO-CREATE SCHEDULE OVERRIDE FROM EVENT
-- ===========================================
-- When an event is published and has hours_override,
-- automatically create a schedule_override record

CREATE OR REPLACE FUNCTION auto_create_event_schedule_override()
RETURNS TRIGGER AS $$
DECLARE
  v_override_id UUID;
BEGIN
  -- Only proceed if:
  -- 1. Status changed to 'published'
  -- 2. auto_create_schedule_override is true
  -- 3. hours_override is not null OR venue_status is 'closed'
  IF NEW.status = 'published'
     AND NEW.auto_create_schedule_override = true
     AND (NEW.hours_override IS NOT NULL OR NEW.venue_status = 'closed')
     AND NEW.schedule_override_id IS NULL
  THEN
    -- Create the schedule override
    INSERT INTO schedule_overrides (
      location_id,
      override_type,
      name,
      description,
      date_start,
      date_end,
      recurrence,
      is_closed,
      hours,
      priority,
      event_id,
      created_by
    ) VALUES (
      NEW.location_id,
      'event',
      NEW.title,
      NEW.description,
      NEW.start_date,
      NEW.end_date,
      NEW.recurrence,
      NEW.venue_status = 'closed',
      NEW.hours_override,
      30,  -- Event priority
      NEW.id,
      NEW.created_by
    )
    RETURNING id INTO v_override_id;

    -- Update event with the override ID
    NEW.schedule_override_id = v_override_id;
  END IF;

  -- If event is cancelled or completed, deactivate the schedule override
  IF (NEW.status = 'cancelled' OR NEW.status = 'completed')
     AND OLD.status = 'published'
     AND NEW.schedule_override_id IS NOT NULL
  THEN
    UPDATE schedule_overrides
    SET is_active = false
    WHERE id = NEW.schedule_override_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS events_auto_schedule_override ON events;
CREATE TRIGGER events_auto_schedule_override
  BEFORE INSERT OR UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_event_schedule_override();

-- ===========================================
-- HELPER FUNCTIONS
-- ===========================================

-- Get events for a specific date range
CREATE OR REPLACE FUNCTION get_events_for_range(
  p_location_id UUID,
  p_start_date DATE,
  p_end_date DATE,
  p_status TEXT DEFAULT NULL,
  p_public_only BOOLEAN DEFAULT true
)
RETURNS SETOF events AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM events
  WHERE location_id = p_location_id
    AND start_date <= p_end_date
    AND (end_date IS NULL OR end_date >= p_start_date OR start_date >= p_start_date)
    AND (p_status IS NULL OR status = p_status)
    AND (NOT p_public_only OR is_public = true)
  ORDER BY start_date, start_time;
END;
$$ LANGUAGE plpgsql;

-- Get today's events for a location
CREATE OR REPLACE FUNCTION get_todays_events(
  p_location_id UUID
)
RETURNS SETOF events AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM events
  WHERE location_id = p_location_id
    AND status = 'published'
    AND is_public = true
    AND (
      -- Single day event today
      (start_date = CURRENT_DATE AND end_date IS NULL)
      OR
      -- Multi-day event that includes today
      (start_date <= CURRENT_DATE AND (end_date IS NULL OR end_date >= CURRENT_DATE))
    )
  ORDER BY start_time;
END;
$$ LANGUAGE plpgsql;

-- Get upcoming events
CREATE OR REPLACE FUNCTION get_upcoming_events(
  p_location_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS SETOF events AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM events
  WHERE location_id = p_location_id
    AND status = 'published'
    AND is_public = true
    AND start_date >= CURRENT_DATE
  ORDER BY start_date, start_time
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- RLS POLICIES
-- ===========================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public can view published public events
CREATE POLICY events_select_public ON events
  FOR SELECT
  USING (is_public = true AND status = 'published');

-- Authenticated users can view all events for their location
CREATE POLICY events_select_authenticated ON events
  FOR SELECT
  TO authenticated
  USING (
    location_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Users with merchant role can manage events
CREATE POLICY events_insert ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    location_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.role_type IN ('merchant', 'admin')
    )
  );

CREATE POLICY events_update ON events
  FOR UPDATE
  TO authenticated
  USING (
    location_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.role_type IN ('merchant', 'admin')
    )
  );

CREATE POLICY events_delete ON events
  FOR DELETE
  TO authenticated
  USING (
    location_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.role_type IN ('merchant', 'admin')
    )
  );

-- ===========================================
-- COMMENTS
-- ===========================================

COMMENT ON TABLE events IS 'Events for locations with schedule, menu, and capacity impact';
COMMENT ON COLUMN events.event_type IS 'Type of event from predefined list (29 types)';
COMMENT ON COLUMN events.venue_status IS 'How the event affects venue availability';
COMMENT ON COLUMN events.hours_override IS 'Override operating hours during event';
COMMENT ON COLUMN events.auto_create_schedule_override IS 'Whether to auto-create schedule_override on publish';
COMMENT ON COLUMN events.promotions IS 'Array of promotion objects applied during event';
COMMENT ON COLUMN events.loyalty_bonus IS 'Loyalty points bonus during event';
