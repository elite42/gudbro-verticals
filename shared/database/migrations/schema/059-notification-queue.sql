-- ============================================================================
-- Migration 059: Notification Queue Documentation
-- ============================================================================
-- Purpose: Document existing async notification system
-- Part of: GUDBRO Scaling Initiative Phase 1
-- Date: 2026-01-17
--
-- NOTE: The notification_queue and related tables already exist in the database.
-- This file documents the expected schema for reference.
-- Related tables: internal_notifications, notification_log, notification_queue
-- ============================================================================

-- Table: notification_queue
-- Stores pending notifications to be processed asynchronously
CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Notification type and target
  type TEXT NOT NULL CHECK (type IN ('email', 'push', 'webhook', 'sms', 'in_app')),

  -- Context
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  user_id UUID,

  -- Payload (notification data)
  payload JSONB NOT NULL DEFAULT '{}',

  -- Routing information
  channel TEXT, -- e.g., 'telegram', 'whatsapp', 'line', 'zalo'
  recipient TEXT, -- email address, phone number, or channel ID

  -- Processing metadata
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),

  -- Scheduling
  scheduled_for TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Retry logic
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  last_error TEXT,
  last_attempt_at TIMESTAMPTZ,

  -- Timestamps
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for queue processing (pending notifications by priority and schedule)
CREATE INDEX IF NOT EXISTS idx_notification_queue_pending
  ON notification_queue (status, priority, scheduled_for)
  WHERE status = 'pending';

-- Index for retry processing (failed notifications that can be retried)
CREATE INDEX IF NOT EXISTS idx_notification_queue_retry
  ON notification_queue (status, last_attempt_at)
  WHERE status = 'failed' AND attempts < max_attempts;

-- Index for merchant-specific queries
CREATE INDEX IF NOT EXISTS idx_notification_queue_merchant
  ON notification_queue (merchant_id, created_at DESC);

-- Index for monitoring/cleanup
CREATE INDEX IF NOT EXISTS idx_notification_queue_status_created
  ON notification_queue (status, created_at);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_notification_queue_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notification_queue_updated_at
  BEFORE UPDATE ON notification_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_queue_timestamp();

-- RLS Policies
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;

-- Only service role can access (backend processing)
CREATE POLICY "notification_queue_service_role" ON notification_queue
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Function to queue a notification
CREATE OR REPLACE FUNCTION queue_notification(
  p_type TEXT,
  p_payload JSONB,
  p_merchant_id UUID DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_priority TEXT DEFAULT 'normal',
  p_channel TEXT DEFAULT NULL,
  p_recipient TEXT DEFAULT NULL,
  p_scheduled_for TIMESTAMPTZ DEFAULT NOW()
)
RETURNS UUID AS $$
DECLARE
  v_notification_id UUID;
BEGIN
  INSERT INTO notification_queue (
    type, payload, merchant_id, user_id, priority, channel, recipient, scheduled_for
  ) VALUES (
    p_type, p_payload, p_merchant_id, p_user_id, p_priority, p_channel, p_recipient, p_scheduled_for
  )
  RETURNING id INTO v_notification_id;

  RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process next batch of notifications
CREATE OR REPLACE FUNCTION get_pending_notifications(p_batch_size INTEGER DEFAULT 10)
RETURNS SETOF notification_queue AS $$
BEGIN
  RETURN QUERY
  UPDATE notification_queue
  SET
    status = 'processing',
    last_attempt_at = NOW(),
    attempts = attempts + 1
  WHERE id IN (
    SELECT id
    FROM notification_queue
    WHERE status = 'pending'
      AND scheduled_for <= NOW()
    ORDER BY
      CASE priority
        WHEN 'high' THEN 1
        WHEN 'normal' THEN 2
        WHEN 'low' THEN 3
      END,
      scheduled_for
    LIMIT p_batch_size
    FOR UPDATE SKIP LOCKED
  )
  RETURNING *;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark notification as completed
CREATE OR REPLACE FUNCTION complete_notification(
  p_notification_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE notification_queue
  SET
    status = 'completed',
    processed_at = NOW()
  WHERE id = p_notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark notification as failed
CREATE OR REPLACE FUNCTION fail_notification(
  p_notification_id UUID,
  p_error TEXT
)
RETURNS VOID AS $$
DECLARE
  v_attempts INTEGER;
  v_max_attempts INTEGER;
BEGIN
  SELECT attempts, max_attempts
  INTO v_attempts, v_max_attempts
  FROM notification_queue
  WHERE id = p_notification_id;

  IF v_attempts >= v_max_attempts THEN
    -- Permanently failed
    UPDATE notification_queue
    SET
      status = 'failed',
      last_error = p_error
    WHERE id = p_notification_id;
  ELSE
    -- Can be retried, move back to pending
    UPDATE notification_queue
    SET
      status = 'pending',
      last_error = p_error,
      -- Exponential backoff: 1 min, 5 min, 30 min
      scheduled_for = NOW() + (power(5, v_attempts) || ' minutes')::interval
    WHERE id = p_notification_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cleanup function for old notifications
CREATE OR REPLACE FUNCTION cleanup_old_notifications(
  p_days_completed INTEGER DEFAULT 7,
  p_days_failed INTEGER DEFAULT 30
)
RETURNS INTEGER AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM notification_queue
  WHERE
    (status = 'completed' AND processed_at < NOW() - (p_days_completed || ' days')::interval)
    OR (status = 'failed' AND created_at < NOW() - (p_days_failed || ' days')::interval)
    OR (status = 'cancelled' AND created_at < NOW() - (p_days_completed || ' days')::interval);

  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments
COMMENT ON TABLE notification_queue IS 'Async notification queue for processing notifications without blocking API requests';
COMMENT ON COLUMN notification_queue.type IS 'Type of notification: email, push, webhook, sms, in_app';
COMMENT ON COLUMN notification_queue.priority IS 'Processing priority: high > normal > low';
COMMENT ON COLUMN notification_queue.payload IS 'JSON payload containing notification data specific to type';
COMMENT ON FUNCTION queue_notification IS 'Queue a notification for async processing';
COMMENT ON FUNCTION get_pending_notifications IS 'Get and lock next batch of pending notifications for processing';
COMMENT ON FUNCTION complete_notification IS 'Mark a notification as successfully processed';
COMMENT ON FUNCTION fail_notification IS 'Mark a notification as failed with error message and handle retry logic';
