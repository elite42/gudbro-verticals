-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 11: IMPROVEMENT SUGGESTIONS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-02
-- Description: User-submitted improvement suggestions for ingredients,
--              products, translations, and general feedback
-- ============================================================================

-- ============================================================================
-- 1. IMPROVEMENT SUGGESTIONS TABLE
-- ============================================================================

DROP TABLE IF EXISTS improvement_suggestions CASCADE;

CREATE TABLE improvement_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Who submitted
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- What type of suggestion
    suggestion_type TEXT NOT NULL CHECK (suggestion_type IN (
        'ingredient_correction',    -- Fix ingredient data
        'ingredient_addition',      -- Add new ingredient
        'product_correction',       -- Fix product data
        'product_addition',         -- Add new product
        'translation_correction',   -- Fix translation
        'translation_addition',     -- Add missing translation
        'nutrition_correction',     -- Fix nutrition data
        'allergen_correction',      -- Fix allergen data
        'general_feedback',         -- General feedback
        'bug_report',               -- Bug report
        'feature_request'           -- Feature request
    )),

    -- Priority (set by moderators)
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN (
        'low', 'normal', 'high', 'critical'
    )),

    -- Status workflow
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',          -- Awaiting review
        'under_review',     -- Being reviewed by moderator
        'approved',         -- Approved, waiting implementation
        'implemented',      -- Change has been made
        'rejected',         -- Not accepted
        'duplicate',        -- Duplicate of another suggestion
        'needs_info'        -- Needs more information from user
    )),

    -- Content
    title TEXT NOT NULL,
    description TEXT NOT NULL,

    -- Reference to existing entity (if applicable)
    entity_type TEXT,                   -- 'ingredient', 'product', 'translation'
    entity_id UUID,                     -- ID of the entity being corrected
    entity_name TEXT,                   -- Name for display (denormalized)

    -- Suggested changes (structured)
    current_value JSONB,                -- Current state of the entity
    suggested_value JSONB,              -- Proposed changes
    /*
    Examples:
    - ingredient_correction: { "name": "Parmesan", "allergens": ["dairy"] }
    - translation_addition: { "key": "product.name", "locale": "it", "value": "Pizza Margherita" }
    - nutrition_correction: { "calories": 250, "protein": 12 }
    */

    -- Supporting evidence
    sources TEXT[],                     -- URLs or references
    attachments TEXT[],                 -- File URLs (images, documents)

    -- Moderation
    reviewed_by UUID REFERENCES accounts(id),
    reviewed_at TIMESTAMPTZ,
    moderator_notes TEXT,
    rejection_reason TEXT,

    -- If duplicate, reference to original
    duplicate_of UUID REFERENCES improvement_suggestions(id),

    -- Implementation tracking
    implemented_by UUID REFERENCES accounts(id),
    implemented_at TIMESTAMPTZ,
    implementation_notes TEXT,

    -- Points awarded for accepted suggestions
    points_awarded INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 2. SUGGESTION COMMENTS TABLE
-- ============================================================================

DROP TABLE IF EXISTS suggestion_comments CASCADE;

CREATE TABLE suggestion_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    suggestion_id UUID NOT NULL REFERENCES improvement_suggestions(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    comment TEXT NOT NULL,
    is_moderator_comment BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. SUGGESTION VOTES TABLE
-- ============================================================================

DROP TABLE IF EXISTS suggestion_votes CASCADE;

CREATE TABLE suggestion_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    suggestion_id UUID NOT NULL REFERENCES improvement_suggestions(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT unique_suggestion_vote UNIQUE (suggestion_id, account_id)
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

CREATE INDEX idx_suggestions_account ON improvement_suggestions(account_id);
CREATE INDEX idx_suggestions_type ON improvement_suggestions(suggestion_type);
CREATE INDEX idx_suggestions_status ON improvement_suggestions(status);
CREATE INDEX idx_suggestions_priority ON improvement_suggestions(priority);
CREATE INDEX idx_suggestions_entity ON improvement_suggestions(entity_type, entity_id)
    WHERE entity_id IS NOT NULL;
CREATE INDEX idx_suggestions_created ON improvement_suggestions(created_at DESC);
CREATE INDEX idx_suggestions_pending ON improvement_suggestions(created_at DESC)
    WHERE status = 'pending';

CREATE INDEX idx_suggestion_comments_suggestion ON suggestion_comments(suggestion_id);
CREATE INDEX idx_suggestion_votes_suggestion ON suggestion_votes(suggestion_id);

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- Drop existing functions
DROP FUNCTION IF EXISTS submit_suggestion CASCADE;
DROP FUNCTION IF EXISTS update_suggestion_status CASCADE;
DROP FUNCTION IF EXISTS vote_on_suggestion CASCADE;
DROP FUNCTION IF EXISTS get_my_suggestions CASCADE;
DROP FUNCTION IF EXISTS get_pending_suggestions CASCADE;
DROP FUNCTION IF EXISTS get_suggestion_stats CASCADE;

-- Submit a new suggestion
CREATE OR REPLACE FUNCTION submit_suggestion(
    p_account_id UUID,
    p_suggestion_type TEXT,
    p_title TEXT,
    p_description TEXT,
    p_entity_type TEXT DEFAULT NULL,
    p_entity_id UUID DEFAULT NULL,
    p_entity_name TEXT DEFAULT NULL,
    p_current_value JSONB DEFAULT NULL,
    p_suggested_value JSONB DEFAULT NULL,
    p_sources TEXT[] DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_suggestion_id UUID;
BEGIN
    INSERT INTO improvement_suggestions (
        account_id, suggestion_type, title, description,
        entity_type, entity_id, entity_name,
        current_value, suggested_value, sources
    ) VALUES (
        p_account_id, p_suggestion_type, p_title, p_description,
        p_entity_type, p_entity_id, p_entity_name,
        p_current_value, p_suggested_value, p_sources
    )
    RETURNING id INTO v_suggestion_id;

    RETURN v_suggestion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update suggestion status (moderator action)
CREATE OR REPLACE FUNCTION update_suggestion_status(
    p_suggestion_id UUID,
    p_moderator_id UUID,
    p_new_status TEXT,
    p_notes TEXT DEFAULT NULL,
    p_rejection_reason TEXT DEFAULT NULL,
    p_duplicate_of UUID DEFAULT NULL,
    p_points_to_award INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_suggestion RECORD;
    v_points INTEGER;
BEGIN
    SELECT * INTO v_suggestion FROM improvement_suggestions WHERE id = p_suggestion_id;

    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    -- Determine points to award
    IF p_new_status = 'implemented' THEN
        v_points := COALESCE(p_points_to_award,
            CASE v_suggestion.suggestion_type
                WHEN 'ingredient_addition' THEN 50
                WHEN 'product_addition' THEN 75
                WHEN 'ingredient_correction' THEN 25
                WHEN 'product_correction' THEN 30
                WHEN 'translation_addition' THEN 20
                WHEN 'translation_correction' THEN 15
                WHEN 'nutrition_correction' THEN 35
                WHEN 'allergen_correction' THEN 40
                WHEN 'bug_report' THEN 50
                WHEN 'feature_request' THEN 100
                ELSE 10
            END
        );
    ELSE
        v_points := 0;
    END IF;

    UPDATE improvement_suggestions SET
        status = p_new_status,
        reviewed_by = p_moderator_id,
        reviewed_at = NOW(),
        moderator_notes = COALESCE(p_notes, moderator_notes),
        rejection_reason = p_rejection_reason,
        duplicate_of = p_duplicate_of,
        points_awarded = v_points,
        implemented_by = CASE WHEN p_new_status = 'implemented' THEN p_moderator_id ELSE implemented_by END,
        implemented_at = CASE WHEN p_new_status = 'implemented' THEN NOW() ELSE implemented_at END,
        updated_at = NOW()
    WHERE id = p_suggestion_id;

    -- Award points if implemented
    IF p_new_status = 'implemented' AND v_points > 0 THEN
        UPDATE accounts SET
            points_balance = points_balance + v_points,
            points_earned = points_earned + v_points,
            updated_at = NOW()
        WHERE id = v_suggestion.account_id;

        -- Log the points transaction
        INSERT INTO points_transactions (
            account_id, points, transaction_type, action_type,
            reference_type, reference_id, description
        ) VALUES (
            v_suggestion.account_id, v_points, 'earn', 'suggestion_accepted',
            'improvement_suggestion', p_suggestion_id,
            'Points for accepted suggestion: ' || v_suggestion.title
        );
    END IF;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Vote on a suggestion
CREATE OR REPLACE FUNCTION vote_on_suggestion(
    p_suggestion_id UUID,
    p_account_id UUID,
    p_vote_type TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO suggestion_votes (suggestion_id, account_id, vote_type)
    VALUES (p_suggestion_id, p_account_id, p_vote_type)
    ON CONFLICT (suggestion_id, account_id)
    DO UPDATE SET
        vote_type = EXCLUDED.vote_type,
        created_at = NOW();

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Get user's suggestions
CREATE OR REPLACE FUNCTION get_my_suggestions(
    p_account_id UUID,
    p_status TEXT DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
    id UUID,
    suggestion_type TEXT,
    status TEXT,
    priority TEXT,
    title TEXT,
    description TEXT,
    entity_type TEXT,
    entity_name TEXT,
    points_awarded INTEGER,
    upvotes BIGINT,
    downvotes BIGINT,
    comments_count BIGINT,
    created_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.id,
        s.suggestion_type,
        s.status,
        s.priority,
        s.title,
        s.description,
        s.entity_type,
        s.entity_name,
        s.points_awarded,
        COUNT(*) FILTER (WHERE sv.vote_type = 'upvote') AS upvotes,
        COUNT(*) FILTER (WHERE sv.vote_type = 'downvote') AS downvotes,
        (SELECT COUNT(*) FROM suggestion_comments sc WHERE sc.suggestion_id = s.id) AS comments_count,
        s.created_at,
        s.reviewed_at
    FROM improvement_suggestions s
    LEFT JOIN suggestion_votes sv ON sv.suggestion_id = s.id
    WHERE s.account_id = p_account_id
    AND (p_status IS NULL OR s.status = p_status)
    GROUP BY s.id
    ORDER BY s.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get pending suggestions for moderators
CREATE OR REPLACE FUNCTION get_pending_suggestions(
    p_suggestion_type TEXT DEFAULT NULL,
    p_priority TEXT DEFAULT NULL,
    p_limit INTEGER DEFAULT 50,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
    id UUID,
    account_id UUID,
    account_name TEXT,
    suggestion_type TEXT,
    status TEXT,
    priority TEXT,
    title TEXT,
    description TEXT,
    entity_type TEXT,
    entity_id UUID,
    entity_name TEXT,
    current_value JSONB,
    suggested_value JSONB,
    sources TEXT[],
    upvotes BIGINT,
    downvotes BIGINT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.id,
        s.account_id,
        a.display_name AS account_name,
        s.suggestion_type,
        s.status,
        s.priority,
        s.title,
        s.description,
        s.entity_type,
        s.entity_id,
        s.entity_name,
        s.current_value,
        s.suggested_value,
        s.sources,
        COUNT(*) FILTER (WHERE sv.vote_type = 'upvote') AS upvotes,
        COUNT(*) FILTER (WHERE sv.vote_type = 'downvote') AS downvotes,
        s.created_at
    FROM improvement_suggestions s
    JOIN accounts a ON a.id = s.account_id
    LEFT JOIN suggestion_votes sv ON sv.suggestion_id = s.id
    WHERE s.status IN ('pending', 'under_review', 'needs_info')
    AND (p_suggestion_type IS NULL OR s.suggestion_type = p_suggestion_type)
    AND (p_priority IS NULL OR s.priority = p_priority)
    GROUP BY s.id, a.display_name
    ORDER BY
        CASE s.priority
            WHEN 'critical' THEN 1
            WHEN 'high' THEN 2
            WHEN 'normal' THEN 3
            ELSE 4
        END,
        s.created_at ASC
    LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get suggestion statistics
CREATE OR REPLACE FUNCTION get_suggestion_stats(
    p_account_id UUID DEFAULT NULL
)
RETURNS TABLE(
    total_suggestions BIGINT,
    pending BIGINT,
    under_review BIGINT,
    approved BIGINT,
    implemented BIGINT,
    rejected BIGINT,
    total_points_earned BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) AS total_suggestions,
        COUNT(*) FILTER (WHERE status = 'pending') AS pending,
        COUNT(*) FILTER (WHERE status = 'under_review') AS under_review,
        COUNT(*) FILTER (WHERE status = 'approved') AS approved,
        COUNT(*) FILTER (WHERE status = 'implemented') AS implemented,
        COUNT(*) FILTER (WHERE status = 'rejected') AS rejected,
        COALESCE(SUM(points_awarded), 0)::BIGINT AS total_points_earned
    FROM improvement_suggestions
    WHERE p_account_id IS NULL OR account_id = p_account_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. VIEWS
-- ============================================================================

-- Top contributors view
CREATE OR REPLACE VIEW v_suggestion_leaderboard AS
SELECT
    a.id AS account_id,
    a.display_name,
    a.avatar_url,
    COUNT(*) AS total_suggestions,
    COUNT(*) FILTER (WHERE s.status = 'implemented') AS implemented_count,
    COALESCE(SUM(s.points_awarded), 0) AS total_points,
    ROUND(
        COUNT(*) FILTER (WHERE s.status = 'implemented')::NUMERIC /
        NULLIF(COUNT(*), 0) * 100,
        1
    ) AS acceptance_rate
FROM accounts a
JOIN improvement_suggestions s ON s.account_id = a.id
GROUP BY a.id, a.display_name, a.avatar_url
HAVING COUNT(*) >= 3
ORDER BY total_points DESC, implemented_count DESC;

-- Recent activity view
CREATE OR REPLACE VIEW v_recent_suggestions AS
SELECT
    s.id,
    s.suggestion_type,
    s.status,
    s.title,
    a.display_name AS submitted_by,
    s.created_at,
    s.reviewed_at,
    s.points_awarded
FROM improvement_suggestions s
JOIN accounts a ON a.id = s.account_id
WHERE s.created_at >= CURRENT_DATE - 30
ORDER BY s.created_at DESC;

-- ============================================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE improvement_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestion_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestion_votes ENABLE ROW LEVEL SECURITY;

-- Users can view all suggestions (public)
CREATE POLICY "Anyone can view suggestions" ON improvement_suggestions
    FOR SELECT USING (TRUE);

-- Users can create their own suggestions
CREATE POLICY "Users can create suggestions" ON improvement_suggestions
    FOR INSERT WITH CHECK (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Users can update their own pending suggestions
CREATE POLICY "Users can update own pending suggestions" ON improvement_suggestions
    FOR UPDATE USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        AND status = 'pending'
    );

-- Comments: anyone can view, users can create their own
CREATE POLICY "Anyone can view comments" ON suggestion_comments
    FOR SELECT USING (TRUE);

CREATE POLICY "Users can create comments" ON suggestion_comments
    FOR INSERT WITH CHECK (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Votes: anyone can view, users can manage their own
CREATE POLICY "Anyone can view votes" ON suggestion_votes
    FOR SELECT USING (TRUE);

CREATE POLICY "Users can manage own votes" ON suggestion_votes
    FOR ALL USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Service role full access
CREATE POLICY "Service role full access suggestions" ON improvement_suggestions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access comments" ON suggestion_comments
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access votes" ON suggestion_votes
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 8. COMMENTS
-- ============================================================================

COMMENT ON TABLE improvement_suggestions IS 'User-submitted suggestions for improving data quality';
COMMENT ON TABLE suggestion_comments IS 'Comments on improvement suggestions';
COMMENT ON TABLE suggestion_votes IS 'User votes on suggestions';
COMMENT ON FUNCTION submit_suggestion IS 'Submit a new improvement suggestion';
COMMENT ON FUNCTION update_suggestion_status IS 'Update suggestion status (moderator action)';
COMMENT ON FUNCTION vote_on_suggestion IS 'Vote on a suggestion';
COMMENT ON FUNCTION get_my_suggestions IS 'Get user own suggestions';
COMMENT ON FUNCTION get_pending_suggestions IS 'Get pending suggestions for moderation';
COMMENT ON FUNCTION get_suggestion_stats IS 'Get suggestion statistics';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
