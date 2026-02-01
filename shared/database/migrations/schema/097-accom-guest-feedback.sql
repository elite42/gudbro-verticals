-- Migration 097: Guest Feedback System for Accommodations
-- Phase 35-01: In-stay and post-stay feedback from guests
--
-- Purpose:
--   Enable guests to submit feedback (maintenance, housekeeping, complaints, etc.)
--   during their stay for immediate owner visibility and resolution tracking.

-- 1. Create accom_guest_feedback table
CREATE TABLE IF NOT EXISTS accom_guest_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- References
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES accom_bookings(id) ON DELETE SET NULL,
  room_id UUID REFERENCES accom_rooms(id) ON DELETE SET NULL,

  -- Feedback classification
  feedback_type TEXT NOT NULL DEFAULT 'in_stay'
    CHECK (feedback_type IN ('in_stay', 'post_stay')),
  category TEXT NOT NULL
    CHECK (category IN ('maintenance', 'housekeeping', 'question', 'complaint', 'compliment', 'other')),

  -- Content
  message TEXT NOT NULL,
  photo_url TEXT,

  -- Ratings (post-stay only, 1-5 scale)
  rating_cleanliness SMALLINT CHECK (rating_cleanliness IS NULL OR (rating_cleanliness >= 1 AND rating_cleanliness <= 5)),
  rating_location SMALLINT CHECK (rating_location IS NULL OR (rating_location >= 1 AND rating_location <= 5)),
  rating_value SMALLINT CHECK (rating_value IS NULL OR (rating_value >= 1 AND rating_value <= 5)),
  rating_communication SMALLINT CHECK (rating_communication IS NULL OR (rating_communication >= 1 AND rating_communication <= 5)),
  rating_wifi SMALLINT CHECK (rating_wifi IS NULL OR (rating_wifi >= 1 AND rating_wifi <= 5)),
  rating_overall SMALLINT CHECK (rating_overall IS NULL OR (rating_overall >= 1 AND rating_overall <= 5)),

  -- AI processing fields
  ai_tags TEXT[] DEFAULT '{}',
  ai_sentiment TEXT CHECK (ai_sentiment IS NULL OR ai_sentiment IN ('positive', 'neutral', 'negative')),
  ai_priority INTEGER CHECK (ai_priority IS NULL OR (ai_priority >= 1 AND ai_priority <= 5)),
  ai_processed_at TIMESTAMPTZ,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'acknowledged', 'in_progress', 'resolved', 'dismissed')),
  owner_response TEXT,
  responded_at TIMESTAMPTZ,

  -- Denormalized guest info (for display without joins)
  guest_name TEXT,
  guest_room_number TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_accom_guest_feedback_property
  ON accom_guest_feedback (property_id);

CREATE INDEX IF NOT EXISTS idx_accom_guest_feedback_booking
  ON accom_guest_feedback (booking_id);

CREATE INDEX IF NOT EXISTS idx_accom_guest_feedback_property_type
  ON accom_guest_feedback (property_id, feedback_type);

CREATE INDEX IF NOT EXISTS idx_accom_guest_feedback_property_status
  ON accom_guest_feedback (property_id, status);

-- 3. Unique constraint: one post-stay feedback per booking
CREATE UNIQUE INDEX IF NOT EXISTS idx_accom_guest_feedback_post_stay_unique
  ON accom_guest_feedback (booking_id)
  WHERE feedback_type = 'post_stay';

-- 4. RLS: service_role only (guest writes go through API with supabaseAdmin)
ALTER TABLE accom_guest_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "accom_guest_feedback_service_role" ON accom_guest_feedback
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Add checked_out_at to bookings for post-stay cron timing
ALTER TABLE accom_bookings
  ADD COLUMN IF NOT EXISTS checked_out_at TIMESTAMPTZ;

COMMENT ON COLUMN accom_bookings.checked_out_at
  IS 'Timestamp when guest actually checked out (for post-stay feedback timing)';

-- 6. Updated_at trigger
CREATE OR REPLACE FUNCTION update_accom_guest_feedback_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER accom_guest_feedback_updated_at
  BEFORE UPDATE ON accom_guest_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_accom_guest_feedback_timestamp();

-- Comments
COMMENT ON TABLE accom_guest_feedback IS 'Guest feedback during and after stay: issues, complaints, compliments, ratings';
COMMENT ON COLUMN accom_guest_feedback.feedback_type IS 'in_stay = real-time issue reporting, post_stay = checkout review with ratings';
COMMENT ON COLUMN accom_guest_feedback.category IS 'Feedback category: maintenance, housekeeping, question, complaint, compliment, other';
COMMENT ON COLUMN accom_guest_feedback.ai_tags IS 'AI-generated tags for categorization and analytics';
COMMENT ON COLUMN accom_guest_feedback.ai_sentiment IS 'AI-detected sentiment: positive, neutral, negative';
COMMENT ON COLUMN accom_guest_feedback.ai_priority IS 'AI-assigned priority 1-5 (1=lowest, 5=urgent)';
