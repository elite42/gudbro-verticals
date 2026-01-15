-- =============================================
-- 057-customer-chat.sql
-- AI Customer Chat System
-- =============================================
-- Customer-facing AI chat with multi-channel support
-- Handles conversations, messages, preferences, and escalations
-- =============================================

-- =============================================
-- 1. CUSTOMER CONVERSATIONS
-- =============================================

CREATE TABLE IF NOT EXISTS customer_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

    -- Customer identification (optional - can be anonymous)
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    customer_phone TEXT,
    customer_email TEXT,
    customer_name TEXT,

    -- Channel info
    channel TEXT NOT NULL CHECK (channel IN ('widget', 'whatsapp', 'telegram', 'line', 'zalo', 'instagram', 'web')),
    channel_user_id TEXT, -- External ID from the channel (WhatsApp phone, Telegram user_id, etc.)

    -- Conversation state
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'escalated', 'archived')),
    language TEXT DEFAULT 'en',

    -- Context
    topic TEXT CHECK (topic IN ('reservation', 'menu', 'order', 'general', 'complaint', 'feedback', 'other')),
    reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
    order_id UUID, -- Reference to orders if/when that table exists

    -- Escalation
    escalated_at TIMESTAMPTZ,
    escalated_to UUID REFERENCES accounts(id) ON DELETE SET NULL,
    escalation_reason TEXT,

    -- AI stats
    total_messages INTEGER DEFAULT 0,
    ai_messages INTEGER DEFAULT 0,
    human_messages INTEGER DEFAULT 0,
    avg_response_time_ms INTEGER,

    -- Satisfaction
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

-- Indexes for common queries
CREATE INDEX idx_customer_conversations_location ON customer_conversations(location_id);
CREATE INDEX idx_customer_conversations_account ON customer_conversations(account_id) WHERE account_id IS NOT NULL;
CREATE INDEX idx_customer_conversations_channel ON customer_conversations(channel, channel_user_id);
CREATE INDEX idx_customer_conversations_status ON customer_conversations(status) WHERE status IN ('active', 'escalated');
CREATE INDEX idx_customer_conversations_last_message ON customer_conversations(last_message_at DESC);

-- =============================================
-- 2. CUSTOMER MESSAGES
-- =============================================

CREATE TABLE IF NOT EXISTS customer_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES customer_conversations(id) ON DELETE CASCADE,

    -- Message content
    role TEXT NOT NULL CHECK (role IN ('customer', 'assistant', 'system', 'agent')),
    content TEXT NOT NULL,

    -- For agent role - who sent it
    agent_id UUID REFERENCES accounts(id) ON DELETE SET NULL,

    -- AI metadata
    model TEXT, -- e.g., 'gpt-4o-mini'
    tokens_prompt INTEGER,
    tokens_completion INTEGER,
    latency_ms INTEGER,

    -- Function calling
    function_name TEXT,
    function_args JSONB,
    function_result JSONB,

    -- Channel-specific metadata
    channel_message_id TEXT, -- ID from the external channel
    metadata JSONB DEFAULT '{}',

    -- Status
    status TEXT DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
    error_message TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_customer_messages_conversation ON customer_messages(conversation_id, created_at);
CREATE INDEX idx_customer_messages_role ON customer_messages(role) WHERE role = 'customer';

-- =============================================
-- 3. CUSTOMER AI PREFERENCES
-- =============================================

CREATE TABLE IF NOT EXISTS customer_ai_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Can be linked to account or channel user
    account_id UUID UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
    channel TEXT,
    channel_user_id TEXT,

    -- Communication preferences
    preferred_language TEXT DEFAULT 'en',
    communication_style TEXT DEFAULT 'friendly' CHECK (communication_style IN ('formal', 'friendly', 'brief', 'detailed')),

    -- Opt-outs
    allow_proactive_messages BOOLEAN DEFAULT TRUE,
    allow_promotions BOOLEAN DEFAULT TRUE,
    allow_reminders BOOLEAN DEFAULT TRUE,

    -- Dietary preferences (for menu recommendations)
    dietary_restrictions TEXT[] DEFAULT '{}',
    allergens TEXT[] DEFAULT '{}',
    cuisine_preferences TEXT[] DEFAULT '{}',

    -- Contact preferences
    preferred_channel TEXT CHECK (preferred_channel IN ('widget', 'whatsapp', 'telegram', 'line', 'zalo', 'email', 'sms')),
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    timezone TEXT DEFAULT 'UTC',

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Unique constraint for channel-based identification
    CONSTRAINT unique_channel_user UNIQUE (channel, channel_user_id)
);

-- Indexes
CREATE INDEX idx_customer_ai_prefs_channel ON customer_ai_preferences(channel, channel_user_id)
    WHERE channel IS NOT NULL AND channel_user_id IS NOT NULL;

-- =============================================
-- 4. CONVERSATION ESCALATIONS
-- =============================================

CREATE TABLE IF NOT EXISTS conversation_escalations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES customer_conversations(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

    -- Escalation details
    reason TEXT NOT NULL CHECK (reason IN (
        'customer_request',    -- Customer asked for human
        'ai_uncertainty',      -- AI confidence too low
        'negative_sentiment',  -- Detected angry/frustrated customer
        'complex_issue',       -- Multi-step issue AI can't handle
        'complaint',           -- Formal complaint
        'urgent',              -- Time-sensitive issue
        'payment_issue',       -- Payment-related problems
        'other'
    )),
    reason_details TEXT,

    -- AI analysis at escalation
    ai_summary TEXT,
    suggested_actions TEXT[],

    -- Assignment
    assigned_to UUID REFERENCES accounts(id) ON DELETE SET NULL,
    assigned_at TIMESTAMPTZ,

    -- Resolution
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'resolved', 'closed')),
    resolution TEXT,
    resolution_time_minutes INTEGER,

    -- Priority
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_escalations_location ON conversation_escalations(location_id);
CREATE INDEX idx_escalations_status ON conversation_escalations(status) WHERE status IN ('pending', 'assigned', 'in_progress');
CREATE INDEX idx_escalations_assigned ON conversation_escalations(assigned_to) WHERE assigned_to IS NOT NULL;
CREATE INDEX idx_escalations_priority ON conversation_escalations(priority, created_at) WHERE status = 'pending';

-- =============================================
-- 5. CHAT QUICK REPLIES (Templates)
-- =============================================

CREATE TABLE IF NOT EXISTS chat_quick_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

    -- NULL location_id = system default
    is_system_default BOOLEAN DEFAULT FALSE,

    -- Content
    trigger_keywords TEXT[] NOT NULL DEFAULT '{}',
    category TEXT CHECK (category IN ('greeting', 'hours', 'location', 'menu', 'reservation', 'order', 'payment', 'closing', 'other')),

    -- Multi-language content
    content_en TEXT NOT NULL,
    content_vi TEXT,
    content_it TEXT,

    -- Display
    button_label_en TEXT,
    button_label_vi TEXT,
    button_label_it TEXT,

    -- Ordering
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_quick_replies_location ON chat_quick_replies(location_id) WHERE is_active = TRUE;

-- =============================================
-- 6. CHAT ANALYTICS (Aggregated)
-- =============================================

CREATE TABLE IF NOT EXISTS chat_analytics_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    date DATE NOT NULL,

    -- Volume
    total_conversations INTEGER DEFAULT 0,
    total_messages INTEGER DEFAULT 0,
    unique_customers INTEGER DEFAULT 0,

    -- By channel
    conversations_widget INTEGER DEFAULT 0,
    conversations_whatsapp INTEGER DEFAULT 0,
    conversations_telegram INTEGER DEFAULT 0,
    conversations_line INTEGER DEFAULT 0,
    conversations_zalo INTEGER DEFAULT 0,

    -- By topic
    topic_reservation INTEGER DEFAULT 0,
    topic_menu INTEGER DEFAULT 0,
    topic_order INTEGER DEFAULT 0,
    topic_general INTEGER DEFAULT 0,
    topic_complaint INTEGER DEFAULT 0,

    -- AI performance
    ai_handled_fully INTEGER DEFAULT 0, -- Resolved without escalation
    escalated INTEGER DEFAULT 0,
    avg_response_time_ms INTEGER,
    avg_messages_per_conversation NUMERIC(5,2),

    -- Satisfaction
    avg_rating NUMERIC(3,2),
    ratings_count INTEGER DEFAULT 0,

    -- Conversions
    reservations_made INTEGER DEFAULT 0,
    orders_placed INTEGER DEFAULT 0,

    -- Costs
    total_tokens_used INTEGER DEFAULT 0,
    estimated_cost_usd NUMERIC(10,4) DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_location_date UNIQUE (location_id, date)
);

-- Index
CREATE INDEX idx_chat_analytics_location_date ON chat_analytics_daily(location_id, date DESC);

-- =============================================
-- 7. TRIGGERS
-- =============================================

-- Update conversation stats on new message
CREATE OR REPLACE FUNCTION update_conversation_on_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE customer_conversations
    SET
        total_messages = total_messages + 1,
        ai_messages = ai_messages + CASE WHEN NEW.role = 'assistant' THEN 1 ELSE 0 END,
        human_messages = human_messages + CASE WHEN NEW.role IN ('customer', 'agent') THEN 1 ELSE 0 END,
        last_message_at = NEW.created_at,
        updated_at = NOW()
    WHERE id = NEW.conversation_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

CREATE TRIGGER trigger_update_conversation_on_message
    AFTER INSERT ON customer_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_conversation_on_message();

-- Update timestamps
CREATE OR REPLACE FUNCTION update_customer_chat_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_customer_conversations_updated_at
    BEFORE UPDATE ON customer_conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_chat_updated_at();

CREATE TRIGGER trigger_customer_ai_prefs_updated_at
    BEFORE UPDATE ON customer_ai_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_chat_updated_at();

CREATE TRIGGER trigger_escalations_updated_at
    BEFORE UPDATE ON conversation_escalations
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_chat_updated_at();

-- =============================================
-- 8. RLS POLICIES
-- =============================================

ALTER TABLE customer_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_ai_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_quick_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_analytics_daily ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "service_role_customer_conversations"
    ON customer_conversations FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_customer_messages"
    ON customer_messages FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_customer_ai_preferences"
    ON customer_ai_preferences FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_conversation_escalations"
    ON conversation_escalations FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_chat_quick_replies"
    ON chat_quick_replies FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_chat_analytics_daily"
    ON chat_analytics_daily FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Customers can read their own conversations (if authenticated)
CREATE POLICY "customers_read_own_conversations"
    ON customer_conversations FOR SELECT
    USING (account_id = auth.uid());

CREATE POLICY "customers_read_own_messages"
    ON customer_messages FOR SELECT
    USING (
        conversation_id IN (
            SELECT id FROM customer_conversations WHERE account_id = auth.uid()
        )
    );

CREATE POLICY "customers_manage_own_preferences"
    ON customer_ai_preferences FOR ALL
    USING (account_id = auth.uid())
    WITH CHECK (account_id = auth.uid());

-- Merchants can read conversations for their locations (using tenant_id where tenant_type='location')
CREATE POLICY "merchants_read_location_conversations"
    ON customer_conversations FOR SELECT
    USING (
        location_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'location'
            AND role_type IN ('owner', 'manager', 'staff')
        )
    );

CREATE POLICY "merchants_read_location_messages"
    ON customer_messages FOR SELECT
    USING (
        conversation_id IN (
            SELECT cc.id FROM customer_conversations cc
            JOIN account_roles ar ON cc.location_id = ar.tenant_id AND ar.tenant_type = 'location'
            WHERE ar.account_id = auth.uid()
            AND ar.role_type IN ('owner', 'manager', 'staff')
        )
    );

CREATE POLICY "merchants_manage_escalations"
    ON conversation_escalations FOR ALL
    USING (
        location_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'location'
            AND role_type IN ('owner', 'manager')
        )
    )
    WITH CHECK (
        location_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'location'
            AND role_type IN ('owner', 'manager')
        )
    );

CREATE POLICY "merchants_manage_quick_replies"
    ON chat_quick_replies FOR ALL
    USING (
        location_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'location'
            AND role_type IN ('owner', 'manager')
        )
        OR is_system_default = TRUE
    )
    WITH CHECK (
        location_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'location'
            AND role_type IN ('owner', 'manager')
        )
    );

CREATE POLICY "merchants_read_analytics"
    ON chat_analytics_daily FOR SELECT
    USING (
        location_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'location'
            AND role_type IN ('owner', 'manager')
        )
    );

-- =============================================
-- 9. DEFAULT QUICK REPLIES (System)
-- =============================================

INSERT INTO chat_quick_replies (is_system_default, category, trigger_keywords, content_en, content_vi, content_it, button_label_en, button_label_vi, button_label_it, sort_order)
VALUES
    -- Greetings
    (TRUE, 'greeting', ARRAY['hi', 'hello', 'hey', 'ciao', 'xin chao'],
     'Hello! Welcome to our restaurant. How can I help you today? I can assist with reservations, menu information, or answer any questions you have.',
     'Xin chao! Chao mung ban den nha hang cua chung toi. Toi co the giup gi cho ban? Toi co the ho tro dat ban, thong tin thuc don, hoac tra loi bat ky cau hoi nao.',
     'Ciao! Benvenuto nel nostro ristorante. Come posso aiutarti oggi? Posso assisterti con prenotazioni, informazioni sul menu, o rispondere alle tue domande.',
     'Start Chat', 'Bat dau', 'Inizia', 1),

    -- Hours
    (TRUE, 'hours', ARRAY['hours', 'open', 'close', 'time', 'orari', 'gio mo cua'],
     'Our opening hours vary by location. Would you like me to check the hours for a specific location?',
     'Gio mo cua cua chung toi thay doi theo dia diem. Ban co muon toi kiem tra gio cua mot dia diem cu the khong?',
     'I nostri orari variano per sede. Vuoi che controlli gli orari per una sede specifica?',
     'Check Hours', 'Xem gio', 'Orari', 2),

    -- Reservation
    (TRUE, 'reservation', ARRAY['book', 'reserve', 'table', 'reservation', 'prenotare', 'dat ban'],
     'I''d be happy to help you make a reservation! Please let me know: 1) Date and time, 2) Number of guests, 3) Any special requests',
     'Toi rat vui long giup ban dat ban! Vui long cho toi biet: 1) Ngay va gio, 2) So khach, 3) Yeu cau dac biet (neu co)',
     'Saro'' felice di aiutarti a prenotare! Per favore dimmi: 1) Data e ora, 2) Numero di ospiti, 3) Richieste speciali',
     'Make Reservation', 'Dat ban', 'Prenota', 3),

    -- Menu
    (TRUE, 'menu', ARRAY['menu', 'food', 'dishes', 'eat', 'thuc don', 'mon an'],
     'I can help you explore our menu! Are you looking for something specific? I can also provide information about allergens and dietary options.',
     'Toi co the giup ban kham pha thuc don! Ban dang tim gi cu the? Toi cung co the cung cap thong tin ve di ung va cac lua chon an kieng.',
     'Posso aiutarti a esplorare il nostro menu! Cerchi qualcosa di specifico? Posso anche fornire informazioni su allergeni e opzioni dietetiche.',
     'View Menu', 'Xem menu', 'Menu', 4),

    -- Closing
    (TRUE, 'closing', ARRAY['bye', 'goodbye', 'thanks', 'thank', 'cam on', 'grazie'],
     'Thank you for chatting with us! If you have any more questions, feel free to reach out anytime. We hope to see you soon!',
     'Cam on ban da tro chuyen voi chung toi! Neu ban co bat ky cau hoi nao khac, hay lien he bat cu luc nao. Chung toi hy vong som gap lai ban!',
     'Grazie per aver chattato con noi! Se hai altre domande, non esitare a contattarci. Speriamo di vederti presto!',
     'End Chat', 'Ket thuc', 'Fine', 10)
ON CONFLICT DO NOTHING;

-- =============================================
-- 10. COMMENTS
-- =============================================

COMMENT ON TABLE customer_conversations IS 'Customer chat sessions across all channels';
COMMENT ON TABLE customer_messages IS 'Individual messages within customer conversations';
COMMENT ON TABLE customer_ai_preferences IS 'Customer preferences for AI communication';
COMMENT ON TABLE conversation_escalations IS 'Escalated conversations requiring human attention';
COMMENT ON TABLE chat_quick_replies IS 'Pre-defined quick reply templates';
COMMENT ON TABLE chat_analytics_daily IS 'Daily aggregated chat analytics per location';
