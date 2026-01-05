-- ============================================
-- Migration 026: Food Challenges System
-- ============================================
-- Food/Drink Challenge promotional system
-- Viral marketing through eating/drinking competitions
-- Wall of Fame, records, stats tracking
-- ============================================

-- ============================================
-- FOOD CHALLENGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS food_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Basic info
  name TEXT NOT NULL,                    -- "The Mega Burger Challenge"
  description TEXT,
  image_url TEXT,

  -- Challenge details
  items JSONB NOT NULL DEFAULT '[]',     -- [{name, quantity, description}]
  time_limit_minutes INTEGER NOT NULL,   -- 45
  price_if_lose DECIMAL(10,2) NOT NULL,  -- 55.00 (price if you LOSE)
  rules JSONB DEFAULT '[]',              -- ["No bathroom breaks", ...]
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard', 'extreme')) DEFAULT 'medium',

  -- Win reward
  win_reward_type TEXT NOT NULL CHECK (win_reward_type IN ('free', 'free_plus_cash', 'free_plus_prize')) DEFAULT 'free',
  win_cash_prize DECIMAL(10,2),          -- 50.00
  win_prize_name TEXT,                   -- "Wall of Fame + T-Shirt"
  win_prize_description TEXT,

  -- Record breaker bonus (extra reward for beating the record)
  record_bonus_enabled BOOLEAN DEFAULT false,
  record_bonus_cash DECIMAL(10,2),       -- 100.00 extra
  record_bonus_prize TEXT,               -- "Lifetime 10% discount"
  record_bonus_description TEXT,         -- "Batti il record e vinci ancora di piu!"

  -- Current record (updated by trigger)
  record_time_minutes DECIMAL(5,2),      -- 23.75 (23:45)
  record_holder_name TEXT,
  record_holder_id UUID REFERENCES accounts(id),
  record_date DATE,

  -- Stats (updated by trigger)
  total_attempts INTEGER DEFAULT 0,
  total_wins INTEGER DEFAULT 0,

  -- Team challenge options
  is_team_challenge BOOLEAN DEFAULT false,
  team_size INTEGER,                     -- Number of people in team

  -- Availability
  requires_booking BOOLEAN DEFAULT false,
  available_days INTEGER[],              -- {0,1,2,3,4,5,6} or {5,6} for weekends only
  available_time_start TIME,             -- 18:00
  available_time_end TIME,               -- 23:00

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CHALLENGE ATTEMPTS TABLE (Wall of Fame data)
-- ============================================

CREATE TABLE IF NOT EXISTS challenge_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES food_challenges(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id),

  -- Participant info
  participant_name TEXT NOT NULL,        -- "Big Mike" or real name
  participant_id UUID REFERENCES accounts(id), -- If registered user
  team_members JSONB,                    -- [{name: "John"}, {name: "Jane"}] for team challenges

  -- Result
  succeeded BOOLEAN NOT NULL,
  completion_time_minutes DECIMAL(5,2),  -- 23.75 = 23:45 (only if succeeded)
  is_current_record BOOLEAN DEFAULT false,

  -- Media (for Wall of Fame)
  photo_url TEXT,
  video_url TEXT,

  -- Staff who recorded this attempt
  recorded_by UUID REFERENCES accounts(id),

  -- Bonus tracking
  record_bonus_awarded BOOLEAN DEFAULT false,

  -- Date
  attempt_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_food_challenges_merchant
  ON food_challenges(merchant_id);

CREATE INDEX IF NOT EXISTS idx_food_challenges_active
  ON food_challenges(merchant_id, is_active)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_challenge_attempts_challenge
  ON challenge_attempts(challenge_id);

CREATE INDEX IF NOT EXISTS idx_challenge_attempts_succeeded
  ON challenge_attempts(challenge_id, succeeded)
  WHERE succeeded = true;

CREATE INDEX IF NOT EXISTS idx_challenge_attempts_record
  ON challenge_attempts(challenge_id, is_current_record)
  WHERE is_current_record = true;

CREATE INDEX IF NOT EXISTS idx_challenge_attempts_date
  ON challenge_attempts(challenge_id, attempt_date DESC);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE food_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_attempts ENABLE ROW LEVEL SECURITY;

-- Merchants can manage their own challenges
CREATE POLICY "Merchants manage own challenges"
  ON food_challenges FOR ALL
  USING (
    merchant_id IN (
      SELECT merchant_id FROM account_roles WHERE account_id = auth.uid()
    )
  );

-- Public can view active challenges (for PWA)
CREATE POLICY "Public can view active challenges"
  ON food_challenges FOR SELECT
  USING (is_active = true);

-- Merchants can manage their own attempts
CREATE POLICY "Merchants manage own attempts"
  ON challenge_attempts FOR ALL
  USING (
    merchant_id IN (
      SELECT merchant_id FROM account_roles WHERE account_id = auth.uid()
    )
  );

-- Public can view successful attempts (Wall of Fame)
CREATE POLICY "Public can view successful attempts"
  ON challenge_attempts FOR SELECT
  USING (succeeded = true);

-- ============================================
-- TRIGGER: Update challenge stats after attempt
-- ============================================

CREATE OR REPLACE FUNCTION update_challenge_stats()
RETURNS TRIGGER AS $$
DECLARE
  current_record DECIMAL(5,2);
BEGIN
  -- Get current record time
  SELECT record_time_minutes INTO current_record
  FROM food_challenges
  WHERE id = NEW.challenge_id;

  -- Update total attempts and wins
  UPDATE food_challenges
  SET
    total_attempts = total_attempts + 1,
    total_wins = total_wins + CASE WHEN NEW.succeeded THEN 1 ELSE 0 END,
    updated_at = NOW()
  WHERE id = NEW.challenge_id;

  -- Check if this is a new record
  IF NEW.succeeded AND NEW.completion_time_minutes IS NOT NULL THEN
    -- First win ever, or beat existing record
    IF current_record IS NULL OR NEW.completion_time_minutes < current_record THEN
      -- Mark this attempt as record
      NEW.is_current_record := true;

      -- Clear previous record holder flag
      UPDATE challenge_attempts
      SET is_current_record = false
      WHERE challenge_id = NEW.challenge_id
        AND id != NEW.id
        AND is_current_record = true;

      -- Update challenge record
      UPDATE food_challenges
      SET
        record_time_minutes = NEW.completion_time_minutes,
        record_holder_name = NEW.participant_name,
        record_holder_id = NEW.participant_id,
        record_date = NEW.attempt_date
      WHERE id = NEW.challenge_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_update_challenge_stats ON challenge_attempts;
CREATE TRIGGER trigger_update_challenge_stats
  BEFORE INSERT ON challenge_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_challenge_stats();

-- ============================================
-- TRIGGER: Update updated_at on food_challenges
-- ============================================

CREATE OR REPLACE FUNCTION update_food_challenges_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_food_challenges_updated_at ON food_challenges;
CREATE TRIGGER trigger_food_challenges_updated_at
  BEFORE UPDATE ON food_challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_food_challenges_updated_at();

-- ============================================
-- HELPER FUNCTION: Get Wall of Fame
-- ============================================

CREATE OR REPLACE FUNCTION get_challenge_wall_of_fame(
  p_challenge_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  rank BIGINT,
  participant_name TEXT,
  completion_time_minutes DECIMAL(5,2),
  attempt_date DATE,
  photo_url TEXT,
  video_url TEXT,
  is_current_record BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ROW_NUMBER() OVER (ORDER BY ca.completion_time_minutes ASC) as rank,
    ca.participant_name,
    ca.completion_time_minutes,
    ca.attempt_date,
    ca.photo_url,
    ca.video_url,
    ca.is_current_record
  FROM challenge_attempts ca
  WHERE ca.challenge_id = p_challenge_id
    AND ca.succeeded = true
    AND ca.completion_time_minutes IS NOT NULL
  ORDER BY ca.completion_time_minutes ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- HELPER FUNCTION: Get challenge stats
-- ============================================

CREATE OR REPLACE FUNCTION get_challenge_stats(p_challenge_id UUID)
RETURNS TABLE (
  total_attempts INTEGER,
  total_wins INTEGER,
  success_rate DECIMAL(5,2),
  record_time_minutes DECIMAL(5,2),
  record_holder_name TEXT,
  record_date DATE,
  has_ever_been_won BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    fc.total_attempts,
    fc.total_wins,
    CASE
      WHEN fc.total_attempts > 0
      THEN ROUND((fc.total_wins::DECIMAL / fc.total_attempts) * 100, 2)
      ELSE 0
    END as success_rate,
    fc.record_time_minutes,
    fc.record_holder_name,
    fc.record_date,
    (fc.total_wins > 0) as has_ever_been_won
  FROM food_challenges fc
  WHERE fc.id = p_challenge_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE food_challenges IS 'Food/Drink challenges for viral marketing. Complete challenge to win, fail and pay full price.';
COMMENT ON TABLE challenge_attempts IS 'Record of all challenge attempts, successful ones form the Wall of Fame.';
COMMENT ON COLUMN food_challenges.items IS 'JSON array of items to consume: [{name: "Mega Burger", quantity: "1.5kg", description: "..."}]';
COMMENT ON COLUMN food_challenges.time_limit_minutes IS 'Time limit in minutes to complete the challenge';
COMMENT ON COLUMN food_challenges.price_if_lose IS 'Price the customer pays if they FAIL the challenge';
COMMENT ON COLUMN food_challenges.record_bonus_enabled IS 'If true, extra prize for beating the current record';
COMMENT ON COLUMN challenge_attempts.completion_time_minutes IS 'Time taken to complete (e.g., 23.75 = 23:45). Only set if succeeded.';
COMMENT ON COLUMN challenge_attempts.is_current_record IS 'True if this is the current record time for the challenge';

-- ============================================
-- DONE
-- ============================================
