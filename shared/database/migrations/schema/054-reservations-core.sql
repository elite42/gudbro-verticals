-- ============================================================================
-- 054-reservations-core.sql
-- RESERVATIONS SYSTEM - Core Reservations & Settings
-- ============================================================================

-- ============================================================================
-- 1. RESERVATION_SETTINGS - Per-location reservation configuration
-- ============================================================================

CREATE TABLE reservation_settings (
    location_id UUID PRIMARY KEY REFERENCES locations(id) ON DELETE CASCADE,

    -- Booking windows
    min_advance_hours INTEGER NOT NULL DEFAULT 2,
    max_advance_days INTEGER NOT NULL DEFAULT 30,

    -- Time slots
    slot_duration_minutes INTEGER NOT NULL DEFAULT 15,
    default_dining_duration INTEGER NOT NULL DEFAULT 90,

    -- Auto-confirmation
    auto_confirm_threshold INTEGER DEFAULT 4,  -- Auto-confirm parties <= this size

    -- Cancellation
    cancellation_deadline_hours INTEGER NOT NULL DEFAULT 24,
    no_show_penalty_amount DECIMAL(10,2) DEFAULT 0,

    -- Deposits
    require_deposit BOOLEAN DEFAULT FALSE,
    deposit_amount DECIMAL(10,2) DEFAULT 0,
    deposit_percent INTEGER DEFAULT 0,  -- Alternative: percentage of estimated bill

    -- Reminders
    send_reminder_hours INTEGER DEFAULT 24,
    send_confirmation BOOLEAN DEFAULT TRUE,

    -- Capacity limits
    max_party_size INTEGER DEFAULT 20,
    min_party_size INTEGER DEFAULT 1,

    -- Operating hours override (NULL = use location hours)
    reservation_hours JSONB DEFAULT NULL,  -- {"mon": {"open": "18:00", "close": "22:00"}, ...}

    -- Special settings
    allow_section_preference BOOLEAN DEFAULT TRUE,
    allow_table_preference BOOLEAN DEFAULT FALSE,
    require_phone BOOLEAN DEFAULT TRUE,
    require_email BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE reservation_settings IS 'Per-location reservation configuration';
COMMENT ON COLUMN reservation_settings.auto_confirm_threshold IS 'Auto-confirm reservations for party sizes <= this value. NULL = manual confirmation always';
COMMENT ON COLUMN reservation_settings.reservation_hours IS 'Override operating hours for reservations. NULL = use location standard hours';

-- ============================================================================
-- 2. RESERVATIONS - Core reservation records
-- ============================================================================

CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

    -- Unique booking reference
    reservation_code TEXT NOT NULL UNIQUE,

    -- Guest info (linked account or anonymous)
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT,
    guest_phone TEXT,
    guest_locale TEXT DEFAULT 'en',

    -- Booking details
    party_size INTEGER NOT NULL CHECK (party_size >= 1),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    end_time TIME,  -- Calculated from duration
    duration_minutes INTEGER NOT NULL DEFAULT 90,

    -- Location preferences
    section_id UUID REFERENCES location_sections(id) ON DELETE SET NULL,
    table_ids JSONB DEFAULT '[]',  -- Array of assigned table UUIDs

    -- Status workflow
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',      -- Awaiting confirmation
        'confirmed',    -- Confirmed by restaurant
        'reminder_sent', -- 24h reminder sent
        'seated',       -- Guest has arrived
        'completed',    -- Dining finished
        'cancelled',    -- Cancelled by guest or restaurant
        'no_show'       -- Guest didn't arrive
    )),
    status_changed_at TIMESTAMPTZ DEFAULT NOW(),
    status_changed_by UUID REFERENCES accounts(id),

    -- Booking source
    source TEXT NOT NULL DEFAULT 'website' CHECK (source IN (
        'website',      -- Customer widget
        'phone',        -- Phone booking
        'walk_in',      -- Walk-in converted to reservation
        'partner',      -- Via partner/Google
        'google',       -- Google Reserve
        'backoffice'    -- Staff created
    )),

    -- Special requests
    occasion TEXT CHECK (occasion IN (
        'birthday', 'anniversary', 'business', 'date', 'celebration', 'other', NULL
    )),
    special_requests TEXT,
    dietary_requirements JSONB DEFAULT '[]',

    -- Deposit handling
    deposit_status TEXT DEFAULT 'not_required' CHECK (deposit_status IN (
        'not_required',
        'pending',
        'paid',
        'refunded',
        'forfeited'
    )),
    deposit_amount DECIMAL(10,2) DEFAULT 0,
    deposit_transaction_id TEXT,

    -- Internal notes
    notes TEXT,
    internal_notes TEXT,  -- Staff-only notes
    tags JSONB DEFAULT '[]',

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    confirmed_at TIMESTAMPTZ,
    seated_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT
);

COMMENT ON TABLE reservations IS 'Core reservation records';
COMMENT ON COLUMN reservations.reservation_code IS 'Human-readable booking reference (e.g., RES-2026-01-15-ABC12)';
COMMENT ON COLUMN reservations.table_ids IS 'Array of assigned table UUIDs for combined seating';
COMMENT ON COLUMN reservations.dietary_requirements IS 'Array of dietary needs: ["vegetarian", "gluten_free", "nut_allergy"]';

-- ============================================================================
-- 3. RESERVATION_TABLE_ASSIGNMENTS - Many-to-many for table assignments
-- ============================================================================

CREATE TABLE reservation_table_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    table_id UUID NOT NULL REFERENCES location_tables(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    assigned_by UUID REFERENCES accounts(id),

    UNIQUE(reservation_id, table_id)
);

COMMENT ON TABLE reservation_table_assignments IS 'Links reservations to assigned tables (supports table combining)';

-- ============================================================================
-- 4. RESERVATION_HISTORY - Audit trail for status changes
-- ============================================================================

CREATE TABLE reservation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    old_status TEXT,
    new_status TEXT,
    changed_by UUID REFERENCES accounts(id),
    change_source TEXT DEFAULT 'backoffice',  -- backoffice, customer, system
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE reservation_history IS 'Audit trail for all reservation changes';

-- ============================================================================
-- 5. BLOCKED_SLOTS - Block specific time slots
-- ============================================================================

CREATE TABLE blocked_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

    -- Block period
    block_date DATE NOT NULL,
    start_time TIME,  -- NULL = entire day
    end_time TIME,

    -- Scope
    section_id UUID REFERENCES location_sections(id) ON DELETE CASCADE,  -- NULL = all sections
    table_id UUID REFERENCES location_tables(id) ON DELETE CASCADE,      -- NULL = all tables in section

    -- Details
    reason TEXT NOT NULL,
    block_type TEXT DEFAULT 'manual' CHECK (block_type IN (
        'manual',       -- Staff blocked
        'private_event',-- Private event
        'maintenance',  -- Maintenance/repairs
        'holiday',      -- Holiday closure
        'capacity'      -- Capacity limit reached
    )),

    created_by UUID REFERENCES accounts(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE blocked_slots IS 'Block specific time slots, tables, or entire days from reservations';

-- ============================================================================
-- 6. INDEXES
-- ============================================================================

-- Reservations indexes
CREATE INDEX idx_reservations_location ON reservations(location_id);
CREATE INDEX idx_reservations_date ON reservations(location_id, reservation_date);
CREATE INDEX idx_reservations_status ON reservations(location_id, status);
CREATE INDEX idx_reservations_code ON reservations(reservation_code);
CREATE INDEX idx_reservations_account ON reservations(account_id) WHERE account_id IS NOT NULL;
CREATE INDEX idx_reservations_upcoming ON reservations(location_id, reservation_date, reservation_time)
    WHERE status IN ('pending', 'confirmed', 'reminder_sent');
CREATE INDEX idx_reservations_date_status ON reservations(reservation_date, status);

-- Table assignments indexes
CREATE INDEX idx_reservation_table_assignments_reservation ON reservation_table_assignments(reservation_id);
CREATE INDEX idx_reservation_table_assignments_table ON reservation_table_assignments(table_id);

-- History indexes
CREATE INDEX idx_reservation_history_reservation ON reservation_history(reservation_id);

-- Blocked slots indexes
CREATE INDEX idx_blocked_slots_location ON blocked_slots(location_id);
CREATE INDEX idx_blocked_slots_date ON blocked_slots(location_id, block_date);

-- ============================================================================
-- 7. TRIGGERS
-- ============================================================================

-- Update updated_at trigger for reservation_settings
CREATE OR REPLACE FUNCTION update_reservation_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_reservation_settings_updated_at
    BEFORE UPDATE ON reservation_settings
    FOR EACH ROW EXECUTE FUNCTION update_reservation_settings_updated_at();

-- Update updated_at trigger for reservations
CREATE OR REPLACE FUNCTION update_reservations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();

    -- Track status changes
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        NEW.status_changed_at = NOW();

        -- Set specific timestamps
        IF NEW.status = 'confirmed' THEN
            NEW.confirmed_at = NOW();
        ELSIF NEW.status = 'seated' THEN
            NEW.seated_at = NOW();
        ELSIF NEW.status = 'completed' THEN
            NEW.completed_at = NOW();
        ELSIF NEW.status = 'cancelled' THEN
            NEW.cancelled_at = NOW();
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_reservations_updated_at();

-- Auto-generate reservation code
CREATE OR REPLACE FUNCTION generate_reservation_code()
RETURNS TRIGGER AS $$
DECLARE
    v_date_part TEXT;
    v_random_part TEXT;
BEGIN
    v_date_part := TO_CHAR(NEW.reservation_date, 'YYMMDD');
    v_random_part := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 5));
    NEW.reservation_code := 'RES-' || v_date_part || '-' || v_random_part;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_generate_reservation_code
    BEFORE INSERT ON reservations
    FOR EACH ROW
    WHEN (NEW.reservation_code IS NULL)
    EXECUTE FUNCTION generate_reservation_code();

-- Calculate end_time from duration
CREATE OR REPLACE FUNCTION calculate_reservation_end_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.end_time := NEW.reservation_time + (NEW.duration_minutes || ' minutes')::INTERVAL;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_calculate_reservation_end_time
    BEFORE INSERT OR UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION calculate_reservation_end_time();

-- Log status changes to history
CREATE OR REPLACE FUNCTION log_reservation_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO reservation_history (
            reservation_id,
            action,
            old_status,
            new_status,
            changed_by,
            change_source
        ) VALUES (
            NEW.id,
            'status_change',
            OLD.status,
            NEW.status,
            NEW.status_changed_by,
            'system'
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_log_reservation_status_change
    AFTER UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION log_reservation_status_change();

-- ============================================================================
-- 8. RLS POLICIES
-- ============================================================================

ALTER TABLE reservation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_table_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;

-- reservation_settings: Service role full access
CREATE POLICY "reservation_settings_service_role_all"
ON reservation_settings
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- reservation_settings: Location managers can manage
CREATE POLICY "reservation_settings_location_manage"
ON reservation_settings
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = reservation_settings.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = reservation_settings.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
);

-- reservations: Service role full access
CREATE POLICY "reservations_service_role_all"
ON reservations
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- reservations: Public can read their own (by account_id)
CREATE POLICY "reservations_own_select"
ON reservations
FOR SELECT
USING (account_id = auth.uid());

-- reservations: Public can create (anonymous booking)
CREATE POLICY "reservations_public_insert"
ON reservations
FOR INSERT
WITH CHECK (TRUE);

-- reservations: Location staff can manage all reservations
CREATE POLICY "reservations_location_manage"
ON reservations
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = reservations.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin', 'staff')
        AND ar.is_active = TRUE
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = reservations.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin', 'staff')
        AND ar.is_active = TRUE
    )
);

-- reservation_table_assignments: Service role full access
CREATE POLICY "reservation_table_assignments_service_role_all"
ON reservation_table_assignments
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- reservation_table_assignments: Location staff can manage
CREATE POLICY "reservation_table_assignments_location_manage"
ON reservation_table_assignments
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM reservations r
        JOIN account_roles ar ON ar.tenant_id = r.location_id
        WHERE r.id = reservation_table_assignments.reservation_id
        AND ar.account_id = auth.uid()
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin', 'staff')
        AND ar.is_active = TRUE
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM reservations r
        JOIN account_roles ar ON ar.tenant_id = r.location_id
        WHERE r.id = reservation_table_assignments.reservation_id
        AND ar.account_id = auth.uid()
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin', 'staff')
        AND ar.is_active = TRUE
    )
);

-- reservation_history: Service role full access
CREATE POLICY "reservation_history_service_role_all"
ON reservation_history
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- reservation_history: Location staff can read
CREATE POLICY "reservation_history_location_select"
ON reservation_history
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM reservations r
        JOIN account_roles ar ON ar.tenant_id = r.location_id
        WHERE r.id = reservation_history.reservation_id
        AND ar.account_id = auth.uid()
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin', 'staff')
        AND ar.is_active = TRUE
    )
);

-- blocked_slots: Service role full access
CREATE POLICY "blocked_slots_service_role_all"
ON blocked_slots
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- blocked_slots: Location managers can manage
CREATE POLICY "blocked_slots_location_manage"
ON blocked_slots
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = blocked_slots.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = blocked_slots.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
);

-- ============================================================================
-- 9. HELPER FUNCTIONS
-- ============================================================================

-- Check if a time slot is available
CREATE OR REPLACE FUNCTION check_slot_availability(
    p_location_id UUID,
    p_date DATE,
    p_time TIME,
    p_party_size INTEGER,
    p_duration_minutes INTEGER DEFAULT 90
)
RETURNS BOOLEAN AS $$
DECLARE
    v_end_time TIME;
    v_is_blocked BOOLEAN;
    v_overlapping_count INTEGER;
BEGIN
    v_end_time := p_time + (p_duration_minutes || ' minutes')::INTERVAL;

    -- Check blocked slots
    SELECT EXISTS (
        SELECT 1 FROM blocked_slots
        WHERE location_id = p_location_id
        AND block_date = p_date
        AND (
            (start_time IS NULL) OR
            (p_time >= start_time AND p_time < end_time) OR
            (v_end_time > start_time AND v_end_time <= end_time) OR
            (p_time <= start_time AND v_end_time >= end_time)
        )
    ) INTO v_is_blocked;

    IF v_is_blocked THEN
        RETURN FALSE;
    END IF;

    -- For now, return TRUE - actual availability check will be done in service layer
    -- considering table assignments and capacity
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get reservations for a date
CREATE OR REPLACE FUNCTION get_reservations_for_date(
    p_location_id UUID,
    p_date DATE
)
RETURNS TABLE (
    id UUID,
    reservation_code TEXT,
    guest_name TEXT,
    party_size INTEGER,
    reservation_time TIME,
    end_time TIME,
    status TEXT,
    section_id UUID,
    section_name TEXT,
    table_ids JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.id,
        r.reservation_code,
        r.guest_name,
        r.party_size,
        r.reservation_time,
        r.end_time,
        r.status,
        r.section_id,
        s.name AS section_name,
        r.table_ids
    FROM reservations r
    LEFT JOIN location_sections s ON s.id = r.section_id
    WHERE r.location_id = p_location_id
    AND r.reservation_date = p_date
    AND r.status NOT IN ('cancelled', 'no_show')
    ORDER BY r.reservation_time;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get today's reservation stats
CREATE OR REPLACE FUNCTION get_reservation_stats(
    p_location_id UUID,
    p_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
    total_reservations INTEGER,
    total_covers INTEGER,
    pending_count INTEGER,
    confirmed_count INTEGER,
    seated_count INTEGER,
    completed_count INTEGER,
    cancelled_count INTEGER,
    no_show_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::INTEGER AS total_reservations,
        COALESCE(SUM(r.party_size), 0)::INTEGER AS total_covers,
        COUNT(*) FILTER (WHERE r.status = 'pending')::INTEGER AS pending_count,
        COUNT(*) FILTER (WHERE r.status = 'confirmed')::INTEGER AS confirmed_count,
        COUNT(*) FILTER (WHERE r.status = 'seated')::INTEGER AS seated_count,
        COUNT(*) FILTER (WHERE r.status = 'completed')::INTEGER AS completed_count,
        COUNT(*) FILTER (WHERE r.status = 'cancelled')::INTEGER AS cancelled_count,
        COUNT(*) FILTER (WHERE r.status = 'no_show')::INTEGER AS no_show_count
    FROM reservations r
    WHERE r.location_id = p_location_id
    AND r.reservation_date = p_date;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- End of migration 054
-- ============================================================================
