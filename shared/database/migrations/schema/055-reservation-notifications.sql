-- =============================================
-- Migration 055: Reservation Notifications System
-- =============================================
-- Multi-channel notification system for reservations
-- Supports: Email, SMS, Push, WhatsApp, Telegram, LINE, Zalo
-- =============================================

-- =============================================
-- 1. NOTIFICATION CHANNEL PREFERENCES
-- =============================================
-- Per-account preferences for notification channels

CREATE TABLE IF NOT EXISTS notification_channel_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,

  -- Channel toggles
  email_enabled BOOLEAN DEFAULT TRUE,
  sms_enabled BOOLEAN DEFAULT FALSE,
  push_enabled BOOLEAN DEFAULT TRUE,
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  telegram_enabled BOOLEAN DEFAULT FALSE,
  line_enabled BOOLEAN DEFAULT FALSE,
  zalo_enabled BOOLEAN DEFAULT FALSE,

  -- Channel identifiers (for messaging platforms)
  telegram_chat_id TEXT,
  line_user_id TEXT,
  zalo_user_id TEXT,
  whatsapp_phone TEXT,

  -- Preferences
  preferred_locale TEXT DEFAULT 'en',
  quiet_hours_start TIME,
  quiet_hours_end TIME,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One preference set per account per merchant (or global if merchant_id is null)
  UNIQUE(account_id, merchant_id)
);

-- Index for lookups
CREATE INDEX IF NOT EXISTS idx_notification_prefs_account ON notification_channel_preferences(account_id);
CREATE INDEX IF NOT EXISTS idx_notification_prefs_merchant ON notification_channel_preferences(merchant_id);

-- =============================================
-- 2. NOTIFICATION TEMPLATES
-- =============================================
-- Templates for different notification types, channels, and languages

CREATE TABLE IF NOT EXISTS notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,

  -- Template identification
  template_code TEXT NOT NULL,  -- e.g., 'reservation_confirmed', 'reminder_24h'
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'whatsapp', 'telegram', 'line', 'zalo')),
  locale TEXT NOT NULL DEFAULT 'en',

  -- Template content
  subject TEXT,  -- For email
  title TEXT,    -- For push notifications
  body TEXT NOT NULL,

  -- Rich content (for channels that support it)
  html_body TEXT,  -- For email
  buttons JSONB DEFAULT '[]',  -- For messaging platforms with buttons

  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  version INTEGER DEFAULT 1,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique template per merchant/code/channel/locale
  UNIQUE(merchant_id, template_code, channel, locale)
);

-- Index for template lookups
CREATE INDEX IF NOT EXISTS idx_notification_templates_code ON notification_templates(template_code);
CREATE INDEX IF NOT EXISTS idx_notification_templates_merchant ON notification_templates(merchant_id);

-- =============================================
-- 3. RESERVATION NOTIFICATIONS LOG
-- =============================================
-- Log of all notifications sent for reservations

CREATE TABLE IF NOT EXISTS reservation_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,

  -- Notification details
  notification_type TEXT NOT NULL,  -- 'confirmation', 'reminder_24h', 'reminder_2h', 'update', 'cancelled', 'no_show'
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'whatsapp', 'telegram', 'line', 'zalo')),

  -- Recipient
  recipient TEXT NOT NULL,  -- Email, phone, or channel-specific ID
  recipient_name TEXT,

  -- Content (snapshot at time of sending)
  subject TEXT,
  body TEXT NOT NULL,

  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'queued', 'sent', 'delivered', 'read', 'failed', 'bounced')),

  -- Provider info
  provider TEXT,  -- 'sendgrid', 'twilio', 'telegram_bot', etc.
  provider_message_id TEXT,
  provider_response JSONB,

  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,

  -- Timestamps
  scheduled_for TIMESTAMPTZ,  -- For scheduled notifications like reminders
  queued_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for notification queries
CREATE INDEX IF NOT EXISTS idx_reservation_notifications_reservation ON reservation_notifications(reservation_id);
CREATE INDEX IF NOT EXISTS idx_reservation_notifications_status ON reservation_notifications(status);
CREATE INDEX IF NOT EXISTS idx_reservation_notifications_scheduled ON reservation_notifications(scheduled_for) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_reservation_notifications_type ON reservation_notifications(notification_type);

-- =============================================
-- 4. NOTIFICATION QUEUE (for async processing)
-- =============================================
-- Queue for pending notifications to be processed by workers

CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Reference to the notification log entry
  notification_id UUID REFERENCES reservation_notifications(id) ON DELETE CASCADE,

  -- Queue metadata
  priority INTEGER DEFAULT 5,  -- 1 = highest, 10 = lowest
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,

  -- Processing info
  locked_by TEXT,  -- Worker ID that picked up this job
  locked_at TIMESTAMPTZ,

  -- Scheduling
  process_after TIMESTAMPTZ DEFAULT NOW(),

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Index for queue processing
CREATE INDEX IF NOT EXISTS idx_notification_queue_pending ON notification_queue(process_after, priority)
  WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_notification_queue_locked ON notification_queue(locked_by, locked_at)
  WHERE status = 'processing';

-- =============================================
-- 5. DEFAULT NOTIFICATION TEMPLATES
-- =============================================
-- Insert default templates for common notification types

-- Email templates (English)
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, subject, body, html_body) VALUES
(NULL, 'reservation_confirmed', 'email', 'en',
  'Your reservation is confirmed - {{restaurant_name}}',
  'Hi {{guest_name}},

Your reservation has been confirmed!

Details:
- Date: {{date}}
- Time: {{time}}
- Party size: {{party_size}} guests
- Confirmation code: {{reservation_code}}

We look forward to seeing you!

{{restaurant_name}}',
  NULL),

(NULL, 'reminder_24h', 'email', 'en',
  'Reminder: Your reservation tomorrow at {{restaurant_name}}',
  'Hi {{guest_name}},

This is a friendly reminder about your reservation tomorrow.

Details:
- Date: {{date}}
- Time: {{time}}
- Party size: {{party_size}} guests
- Confirmation code: {{reservation_code}}

Need to make changes? Contact us or visit our website.

See you soon!
{{restaurant_name}}',
  NULL),

(NULL, 'reservation_cancelled', 'email', 'en',
  'Reservation cancelled - {{restaurant_name}}',
  'Hi {{guest_name}},

Your reservation has been cancelled.

Cancelled reservation details:
- Date: {{date}}
- Time: {{time}}
- Confirmation code: {{reservation_code}}

We hope to see you again soon!

{{restaurant_name}}',
  NULL)
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- Push notification templates (English)
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, title, body) VALUES
(NULL, 'reservation_confirmed', 'push', 'en',
  'Reservation Confirmed!',
  'Your table for {{party_size}} on {{date}} at {{time}} is confirmed. Code: {{reservation_code}}'),

(NULL, 'reminder_24h', 'push', 'en',
  'Reminder: Tomorrow''s Reservation',
  'Don''t forget! Table for {{party_size}} tomorrow at {{time}}'),

(NULL, 'reminder_2h', 'push', 'en',
  'See You Soon!',
  'Your reservation at {{restaurant_name}} is in 2 hours. Table for {{party_size}} at {{time}}'),

(NULL, 'reservation_cancelled', 'push', 'en',
  'Reservation Cancelled',
  'Your reservation on {{date}} has been cancelled.')
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- WhatsApp/SMS templates (English)
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, body) VALUES
(NULL, 'reservation_confirmed', 'whatsapp', 'en',
  '✅ *Reservation Confirmed*

Hi {{guest_name}}!

Your table at *{{restaurant_name}}* is confirmed.

📅 {{date}}
🕐 {{time}}
👥 {{party_size}} guests
🔑 Code: {{reservation_code}}

See you soon!'),

(NULL, 'reminder_24h', 'whatsapp', 'en',
  '📅 *Reminder: Tomorrow''s Reservation*

Hi {{guest_name}}!

Just a friendly reminder about your reservation at *{{restaurant_name}}*.

📅 {{date}}
🕐 {{time}}
👥 {{party_size}} guests

Looking forward to seeing you!'),

(NULL, 'reservation_confirmed', 'sms', 'en',
  '{{restaurant_name}}: Reservation confirmed for {{party_size}} on {{date}} at {{time}}. Code: {{reservation_code}}'),

(NULL, 'reminder_24h', 'sms', 'en',
  '{{restaurant_name}} reminder: Your table for {{party_size}} is tomorrow at {{time}}. See you soon!')
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- Telegram templates (English)
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, body, buttons) VALUES
(NULL, 'reservation_confirmed', 'telegram', 'en',
  '✅ <b>Reservation Confirmed</b>

Hi {{guest_name}}!

Your table at <b>{{restaurant_name}}</b> is confirmed.

📅 Date: {{date}}
🕐 Time: {{time}}
👥 Guests: {{party_size}}
🔑 Code: <code>{{reservation_code}}</code>

See you soon!',
  '[{"text": "Add to Calendar", "url": "{{calendar_url}}"}]'),

(NULL, 'reminder_24h', 'telegram', 'en',
  '📅 <b>Reminder: Tomorrow''s Reservation</b>

Hi {{guest_name}}!

Don''t forget your reservation at <b>{{restaurant_name}}</b>.

📅 {{date}}
🕐 {{time}}
👥 {{party_size}} guests

Looking forward to seeing you!',
  '[{"text": "View Reservation", "url": "{{reservation_url}}"}, {"text": "Cancel", "callback_data": "cancel_{{reservation_id}}"}]')
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- Vietnamese templates
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, subject, body) VALUES
(NULL, 'reservation_confirmed', 'email', 'vi',
  'Xác nhận đặt bàn - {{restaurant_name}}',
  'Xin chào {{guest_name}},

Đặt bàn của bạn đã được xác nhận!

Chi tiết:
- Ngày: {{date}}
- Giờ: {{time}}
- Số khách: {{party_size}}
- Mã xác nhận: {{reservation_code}}

Hẹn gặp bạn!

{{restaurant_name}}'),

(NULL, 'reminder_24h', 'email', 'vi',
  'Nhắc nhở: Đặt bàn ngày mai tại {{restaurant_name}}',
  'Xin chào {{guest_name}},

Đây là lời nhắc về đặt bàn của bạn vào ngày mai.

Chi tiết:
- Ngày: {{date}}
- Giờ: {{time}}
- Số khách: {{party_size}}
- Mã xác nhận: {{reservation_code}}

Hẹn gặp bạn sớm!
{{restaurant_name}}')
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- Vietnamese push templates
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, title, body) VALUES
(NULL, 'reservation_confirmed', 'push', 'vi',
  'Đặt Bàn Thành Công!',
  'Bàn cho {{party_size}} khách ngày {{date}} lúc {{time}} đã được xác nhận. Mã: {{reservation_code}}'),

(NULL, 'reminder_24h', 'push', 'vi',
  'Nhắc Nhở: Đặt Bàn Ngày Mai',
  'Đừng quên! Bàn cho {{party_size}} khách ngày mai lúc {{time}}')
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- Italian templates
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, subject, body) VALUES
(NULL, 'reservation_confirmed', 'email', 'it',
  'Prenotazione confermata - {{restaurant_name}}',
  'Ciao {{guest_name}},

La tua prenotazione è confermata!

Dettagli:
- Data: {{date}}
- Ora: {{time}}
- Numero ospiti: {{party_size}}
- Codice conferma: {{reservation_code}}

Ti aspettiamo!

{{restaurant_name}}'),

(NULL, 'reminder_24h', 'email', 'it',
  'Promemoria: Prenotazione domani da {{restaurant_name}}',
  'Ciao {{guest_name}},

Ti ricordiamo la tua prenotazione per domani.

Dettagli:
- Data: {{date}}
- Ora: {{time}}
- Numero ospiti: {{party_size}}
- Codice conferma: {{reservation_code}}

A presto!
{{restaurant_name}}')
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- Italian push templates
INSERT INTO notification_templates (merchant_id, template_code, channel, locale, title, body) VALUES
(NULL, 'reservation_confirmed', 'push', 'it',
  'Prenotazione Confermata!',
  'Tavolo per {{party_size}} il {{date}} alle {{time}} confermato. Codice: {{reservation_code}}'),

(NULL, 'reminder_24h', 'push', 'it',
  'Promemoria: Prenotazione Domani',
  'Non dimenticare! Tavolo per {{party_size}} domani alle {{time}}')
ON CONFLICT (merchant_id, template_code, channel, locale) DO NOTHING;

-- =============================================
-- 6. RLS POLICIES
-- =============================================

ALTER TABLE notification_channel_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;

-- Notification preferences: users can manage their own
CREATE POLICY "Users can view own notification preferences"
  ON notification_channel_preferences FOR SELECT
  USING (auth.uid() = account_id);

CREATE POLICY "Users can update own notification preferences"
  ON notification_channel_preferences FOR UPDATE
  USING (auth.uid() = account_id);

CREATE POLICY "Users can insert own notification preferences"
  ON notification_channel_preferences FOR INSERT
  WITH CHECK (auth.uid() = account_id);

-- Templates: readable by all, writable by merchants/admins
CREATE POLICY "Templates are readable by all"
  ON notification_templates FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage templates"
  ON notification_templates FOR ALL
  USING (auth.role() = 'service_role');

-- Notification logs: service role only (system manages these)
CREATE POLICY "Service role can manage notification logs"
  ON reservation_notifications FOR ALL
  USING (auth.role() = 'service_role');

-- Users can view their own reservation notifications
CREATE POLICY "Users can view own reservation notifications"
  ON reservation_notifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM reservations r
      WHERE r.id = reservation_notifications.reservation_id
      AND r.account_id = auth.uid()
    )
  );

-- Queue: service role only
CREATE POLICY "Service role can manage notification queue"
  ON notification_queue FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================
-- 7. HELPER FUNCTIONS
-- =============================================

-- Function to get template with fallback to default (merchant_id = NULL)
CREATE OR REPLACE FUNCTION get_notification_template(
  p_merchant_id UUID,
  p_template_code TEXT,
  p_channel TEXT,
  p_locale TEXT
)
RETURNS notification_templates
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_template notification_templates;
BEGIN
  -- Try merchant-specific template first
  SELECT * INTO v_template
  FROM notification_templates
  WHERE (merchant_id = p_merchant_id OR (p_merchant_id IS NULL AND merchant_id IS NULL))
    AND template_code = p_template_code
    AND channel = p_channel
    AND locale = p_locale
    AND is_active = TRUE
  ORDER BY merchant_id NULLS LAST
  LIMIT 1;

  -- If not found, try with English fallback
  IF v_template IS NULL AND p_locale != 'en' THEN
    SELECT * INTO v_template
    FROM notification_templates
    WHERE (merchant_id = p_merchant_id OR merchant_id IS NULL)
      AND template_code = p_template_code
      AND channel = p_channel
      AND locale = 'en'
      AND is_active = TRUE
    ORDER BY merchant_id NULLS LAST
    LIMIT 1;
  END IF;

  RETURN v_template;
END;
$$;

-- Function to queue a notification
CREATE OR REPLACE FUNCTION queue_reservation_notification(
  p_reservation_id UUID,
  p_notification_type TEXT,
  p_channel TEXT,
  p_recipient TEXT,
  p_recipient_name TEXT DEFAULT NULL,
  p_scheduled_for TIMESTAMPTZ DEFAULT NOW(),
  p_priority INTEGER DEFAULT 5
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_notification_id UUID;
  v_queue_id UUID;
  v_reservation reservations;
  v_location locations;
  v_template notification_templates;
  v_body TEXT;
  v_subject TEXT;
  v_locale TEXT;
BEGIN
  -- Get reservation details
  SELECT * INTO v_reservation
  FROM reservations
  WHERE id = p_reservation_id;

  IF v_reservation IS NULL THEN
    RAISE EXCEPTION 'Reservation not found: %', p_reservation_id;
  END IF;

  -- Get location for restaurant name
  SELECT * INTO v_location
  FROM locations
  WHERE id = v_reservation.location_id;

  -- Determine locale
  v_locale := COALESCE(v_reservation.guest_locale, 'en');

  -- Get template
  v_template := get_notification_template(
    (SELECT merchant_id FROM locations WHERE id = v_reservation.location_id),
    p_notification_type,
    p_channel,
    v_locale
  );

  IF v_template IS NULL THEN
    RAISE EXCEPTION 'No template found for: %, %, %', p_notification_type, p_channel, v_locale;
  END IF;

  -- Replace placeholders in body
  v_body := v_template.body;
  v_body := REPLACE(v_body, '{{guest_name}}', COALESCE(p_recipient_name, v_reservation.guest_name));
  v_body := REPLACE(v_body, '{{restaurant_name}}', COALESCE(v_location.name, 'Our Restaurant'));
  v_body := REPLACE(v_body, '{{date}}', TO_CHAR(v_reservation.reservation_date, 'DD/MM/YYYY'));
  v_body := REPLACE(v_body, '{{time}}', TO_CHAR(v_reservation.reservation_time, 'HH24:MI'));
  v_body := REPLACE(v_body, '{{party_size}}', v_reservation.party_size::TEXT);
  v_body := REPLACE(v_body, '{{reservation_code}}', v_reservation.reservation_code);
  v_body := REPLACE(v_body, '{{reservation_id}}', v_reservation.id::TEXT);

  -- Replace placeholders in subject (if email)
  v_subject := v_template.subject;
  IF v_subject IS NOT NULL THEN
    v_subject := REPLACE(v_subject, '{{restaurant_name}}', COALESCE(v_location.name, 'Our Restaurant'));
    v_subject := REPLACE(v_subject, '{{date}}', TO_CHAR(v_reservation.reservation_date, 'DD/MM/YYYY'));
    v_subject := REPLACE(v_subject, '{{time}}', TO_CHAR(v_reservation.reservation_time, 'HH24:MI'));
  END IF;

  -- Create notification log entry
  INSERT INTO reservation_notifications (
    reservation_id,
    notification_type,
    channel,
    recipient,
    recipient_name,
    subject,
    body,
    status,
    scheduled_for
  ) VALUES (
    p_reservation_id,
    p_notification_type,
    p_channel,
    p_recipient,
    COALESCE(p_recipient_name, v_reservation.guest_name),
    v_subject,
    v_body,
    'pending',
    p_scheduled_for
  )
  RETURNING id INTO v_notification_id;

  -- Add to queue
  INSERT INTO notification_queue (
    notification_id,
    priority,
    process_after
  ) VALUES (
    v_notification_id,
    p_priority,
    p_scheduled_for
  )
  RETURNING id INTO v_queue_id;

  RETURN v_notification_id;
END;
$$;

-- Function to process queue (called by workers)
CREATE OR REPLACE FUNCTION claim_notification_from_queue(
  p_worker_id TEXT
)
RETURNS notification_queue
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_queue_item notification_queue;
BEGIN
  -- Claim oldest pending notification
  UPDATE notification_queue
  SET
    status = 'processing',
    locked_by = p_worker_id,
    locked_at = NOW(),
    attempts = attempts + 1
  WHERE id = (
    SELECT id FROM notification_queue
    WHERE status = 'pending'
      AND process_after <= NOW()
      AND attempts < max_attempts
    ORDER BY priority ASC, process_after ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  RETURNING * INTO v_queue_item;

  RETURN v_queue_item;
END;
$$;

-- Function to mark notification as sent
CREATE OR REPLACE FUNCTION mark_notification_sent(
  p_notification_id UUID,
  p_provider TEXT,
  p_provider_message_id TEXT DEFAULT NULL,
  p_provider_response JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update notification log
  UPDATE reservation_notifications
  SET
    status = 'sent',
    provider = p_provider,
    provider_message_id = p_provider_message_id,
    provider_response = p_provider_response,
    sent_at = NOW()
  WHERE id = p_notification_id;

  -- Update queue
  UPDATE notification_queue
  SET
    status = 'completed',
    completed_at = NOW()
  WHERE notification_id = p_notification_id;
END;
$$;

-- Function to mark notification as failed
CREATE OR REPLACE FUNCTION mark_notification_failed(
  p_notification_id UUID,
  p_error_message TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_queue notification_queue;
BEGIN
  -- Get queue item
  SELECT * INTO v_queue
  FROM notification_queue
  WHERE notification_id = p_notification_id;

  -- Update notification log
  UPDATE reservation_notifications
  SET
    status = CASE
      WHEN v_queue.attempts >= v_queue.max_attempts THEN 'failed'
      ELSE 'pending'
    END,
    error_message = p_error_message,
    retry_count = COALESCE(retry_count, 0) + 1,
    failed_at = CASE
      WHEN v_queue.attempts >= v_queue.max_attempts THEN NOW()
      ELSE NULL
    END
  WHERE id = p_notification_id;

  -- Update queue
  UPDATE notification_queue
  SET
    status = CASE
      WHEN attempts >= max_attempts THEN 'failed'
      ELSE 'pending'
    END,
    locked_by = NULL,
    locked_at = NULL,
    process_after = CASE
      WHEN attempts >= max_attempts THEN process_after
      ELSE NOW() + (attempts * INTERVAL '5 minutes')  -- Exponential backoff
    END
  WHERE notification_id = p_notification_id;
END;
$$;

-- =============================================
-- 8. TRIGGERS
-- =============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_notification_prefs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notification_prefs_updated_at
  BEFORE UPDATE ON notification_channel_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_prefs_updated_at();

CREATE TRIGGER trg_notification_templates_updated_at
  BEFORE UPDATE ON notification_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_prefs_updated_at();

-- =============================================
-- 9. COMMENTS
-- =============================================

COMMENT ON TABLE notification_channel_preferences IS 'Per-user notification channel preferences and identifiers';
COMMENT ON TABLE notification_templates IS 'Message templates for different notification types, channels, and languages';
COMMENT ON TABLE reservation_notifications IS 'Log of all notifications sent for reservations';
COMMENT ON TABLE notification_queue IS 'Queue for async notification processing';

COMMENT ON FUNCTION get_notification_template IS 'Get notification template with fallback to default merchant and English locale';
COMMENT ON FUNCTION queue_reservation_notification IS 'Queue a notification for a reservation with template rendering';
COMMENT ON FUNCTION claim_notification_from_queue IS 'Claim the next pending notification for processing';
COMMENT ON FUNCTION mark_notification_sent IS 'Mark a notification as successfully sent';
COMMENT ON FUNCTION mark_notification_failed IS 'Mark a notification as failed with retry logic';
