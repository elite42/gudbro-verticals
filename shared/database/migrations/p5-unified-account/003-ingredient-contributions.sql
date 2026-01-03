-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 2.5: INGREDIENT CONTRIBUTIONS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-02
-- Description: User-generated ingredients via crowdsourcing
-- ============================================================================

-- ============================================================================
-- 1. INGREDIENT CONTRIBUTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS ingredient_contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Contributor
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Submitted Data
    ingredient_name TEXT NOT NULL,
    ingredient_name_local TEXT, -- Name in contributor's language
    category TEXT, -- e.g., 'vegetables', 'spices', 'dairy'
    subcategory TEXT,

    -- Structured data extracted from photo/AI
    submitted_json JSONB NOT NULL DEFAULT '{}',
    -- Expected structure:
    -- {
    --   "name": "...",
    --   "allergens": [...],
    --   "nutritional_info": {...},
    --   "dietary": [...],
    --   "origin": "...",
    --   "description": "..."
    -- }

    -- Source photos (URLs from Supabase Storage)
    source_photos TEXT[] DEFAULT '{}',
    photo_extraction_prompt TEXT, -- The prompt used for AI extraction
    ai_confidence_score DECIMAL(3,2), -- 0.00 to 1.00

    -- Workflow status
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'in_review', 'approved', 'merged', 'rejected', 'duplicate')),

    -- Review info
    reviewer_account_id UUID REFERENCES accounts(id),
    reviewer_notes TEXT,
    rejection_reason TEXT,

    -- If approved, which ingredient was created/updated
    merged_into_id TEXT, -- References ingredients(id) - TEXT because ingredients use string IDs
    is_new_ingredient BOOLEAN DEFAULT TRUE, -- FALSE if merged into existing

    -- Rewards
    points_awarded INTEGER DEFAULT 0,

    -- Metadata
    source_type TEXT DEFAULT 'manual' CHECK (source_type IN ('manual', 'photo_ai', 'barcode', 'import')),
    contributor_locale TEXT DEFAULT 'en',

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    merged_at TIMESTAMPTZ
);

-- ============================================================================
-- 2. INDEXES
-- ============================================================================

CREATE INDEX idx_contributions_account ON ingredient_contributions(account_id);
CREATE INDEX idx_contributions_status ON ingredient_contributions(status);
CREATE INDEX idx_contributions_pending ON ingredient_contributions(status, created_at)
    WHERE status = 'pending';
CREATE INDEX idx_contributions_reviewer ON ingredient_contributions(reviewer_account_id)
    WHERE reviewer_account_id IS NOT NULL;
CREATE INDEX idx_contributions_name ON ingredient_contributions(ingredient_name);
CREATE INDEX idx_contributions_category ON ingredient_contributions(category)
    WHERE category IS NOT NULL;

-- ============================================================================
-- 3. TRIGGERS
-- ============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_ingredient_contributions_updated_at
    BEFORE UPDATE ON ingredient_contributions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. HELPER FUNCTIONS
-- ============================================================================

-- Submit a new ingredient contribution
CREATE OR REPLACE FUNCTION submit_ingredient_contribution(
    p_account_id UUID,
    p_ingredient_name TEXT,
    p_submitted_json JSONB,
    p_category TEXT DEFAULT NULL,
    p_source_photos TEXT[] DEFAULT '{}',
    p_source_type TEXT DEFAULT 'manual',
    p_locale TEXT DEFAULT 'en'
)
RETURNS UUID AS $$
DECLARE
    v_contribution_id UUID;
BEGIN
    INSERT INTO ingredient_contributions (
        account_id,
        ingredient_name,
        category,
        submitted_json,
        source_photos,
        source_type,
        contributor_locale
    ) VALUES (
        p_account_id,
        p_ingredient_name,
        p_category,
        p_submitted_json,
        p_source_photos,
        p_source_type,
        p_locale
    )
    RETURNING id INTO v_contribution_id;

    RETURN v_contribution_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Approve and merge contribution
CREATE OR REPLACE FUNCTION approve_ingredient_contribution(
    p_contribution_id UUID,
    p_reviewer_account_id UUID,
    p_merged_into_id TEXT DEFAULT NULL,
    p_is_new BOOLEAN DEFAULT TRUE,
    p_notes TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_contributor_id UUID;
    v_points INTEGER := 50; -- Default points for approved ingredient
BEGIN
    -- Get contributor ID
    SELECT account_id INTO v_contributor_id
    FROM ingredient_contributions
    WHERE id = p_contribution_id;

    IF v_contributor_id IS NULL THEN
        RAISE EXCEPTION 'Contribution not found';
    END IF;

    -- Update contribution status
    UPDATE ingredient_contributions
    SET
        status = CASE WHEN p_merged_into_id IS NOT NULL THEN 'merged' ELSE 'approved' END,
        reviewer_account_id = p_reviewer_account_id,
        reviewer_notes = p_notes,
        merged_into_id = p_merged_into_id,
        is_new_ingredient = p_is_new,
        points_awarded = v_points,
        reviewed_at = NOW(),
        merged_at = CASE WHEN p_merged_into_id IS NOT NULL THEN NOW() ELSE NULL END
    WHERE id = p_contribution_id;

    -- Award points to contributor
    PERFORM award_loyalty_points(
        v_contributor_id,
        v_points,
        'contributor',
        'ingredient_contributed',
        'Ingredient contribution approved',
        'contribution',
        p_contribution_id
    );

    RETURN v_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Reject contribution
CREATE OR REPLACE FUNCTION reject_ingredient_contribution(
    p_contribution_id UUID,
    p_reviewer_account_id UUID,
    p_reason TEXT,
    p_notes TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE ingredient_contributions
    SET
        status = 'rejected',
        reviewer_account_id = p_reviewer_account_id,
        reviewer_notes = p_notes,
        rejection_reason = p_reason,
        reviewed_at = NOW()
    WHERE id = p_contribution_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Mark as duplicate
CREATE OR REPLACE FUNCTION mark_contribution_duplicate(
    p_contribution_id UUID,
    p_reviewer_account_id UUID,
    p_existing_ingredient_id TEXT,
    p_notes TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE ingredient_contributions
    SET
        status = 'duplicate',
        reviewer_account_id = p_reviewer_account_id,
        reviewer_notes = p_notes,
        merged_into_id = p_existing_ingredient_id,
        is_new_ingredient = FALSE,
        reviewed_at = NOW()
    WHERE id = p_contribution_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 5. VIEWS
-- ============================================================================

-- Pending contributions for review queue
CREATE OR REPLACE VIEW v_pending_contributions AS
SELECT
    ic.id,
    ic.ingredient_name,
    ic.ingredient_name_local,
    ic.category,
    ic.submitted_json,
    ic.source_photos,
    ic.source_type,
    ic.ai_confidence_score,
    ic.contributor_locale,
    ic.created_at,
    a.email AS contributor_email,
    a.display_name AS contributor_name,
    a.contributor_points AS contributor_total_points
FROM ingredient_contributions ic
JOIN accounts a ON a.id = ic.account_id
WHERE ic.status = 'pending'
ORDER BY ic.created_at ASC;

-- Contributor stats
CREATE OR REPLACE VIEW v_contributor_stats AS
SELECT
    a.id AS account_id,
    a.email,
    a.display_name,
    a.contributor_points,
    COUNT(ic.id) AS total_submissions,
    COUNT(ic.id) FILTER (WHERE ic.status = 'approved' OR ic.status = 'merged') AS approved_count,
    COUNT(ic.id) FILTER (WHERE ic.status = 'rejected') AS rejected_count,
    COUNT(ic.id) FILTER (WHERE ic.status = 'pending') AS pending_count,
    SUM(ic.points_awarded) AS total_points_from_contributions
FROM accounts a
LEFT JOIN ingredient_contributions ic ON ic.account_id = a.id
WHERE a.contributor_points > 0 OR EXISTS (
    SELECT 1 FROM ingredient_contributions WHERE account_id = a.id
)
GROUP BY a.id;

-- ============================================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE ingredient_contributions ENABLE ROW LEVEL SECURITY;

-- Users can view their own contributions
CREATE POLICY "Users can view own contributions" ON ingredient_contributions
    FOR SELECT USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Users can create contributions
CREATE POLICY "Users can create contributions" ON ingredient_contributions
    FOR INSERT WITH CHECK (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Admins/reviewers can view all pending
CREATE POLICY "Reviewers can view all contributions" ON ingredient_contributions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM account_roles ar
            JOIN accounts a ON a.id = ar.account_id
            WHERE a.auth_id = auth.uid()
            AND ar.role_type IN ('admin', 'contributor')
            AND ar.is_active = TRUE
        )
    );

-- Service role full access
CREATE POLICY "Service role full access contributions" ON ingredient_contributions
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 7. COMMENTS
-- ============================================================================

COMMENT ON TABLE ingredient_contributions IS 'User-submitted ingredients for crowdsourcing the database';
COMMENT ON COLUMN ingredient_contributions.submitted_json IS 'Structured data: name, allergens, nutritional_info, dietary, origin, description';
COMMENT ON COLUMN ingredient_contributions.ai_confidence_score IS 'Confidence score from AI extraction (0.00 to 1.00)';
COMMENT ON COLUMN ingredient_contributions.merged_into_id IS 'References ingredients(id) if merged into existing ingredient';
COMMENT ON FUNCTION submit_ingredient_contribution IS 'Submit a new ingredient for review';
COMMENT ON FUNCTION approve_ingredient_contribution IS 'Approve contribution and award 50 points';
COMMENT ON FUNCTION reject_ingredient_contribution IS 'Reject contribution with reason';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
