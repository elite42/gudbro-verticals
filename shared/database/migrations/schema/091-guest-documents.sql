-- ============================================================================
-- Migration 091: Guest Documents for Document Upload & Visa Tracking
-- ============================================================================
-- Date: 2026-02-01
-- Description: Creates accom_guest_documents table for storing guest passport
--              and visa document metadata, private storage bucket for files,
--              and property-level retention/reminder configuration columns.
-- Depends on: 090 (access settings)
-- Part of: v1.5 Frictionless Guest Access (Phase 28)
-- ============================================================================

-- ============================================================================
-- 1. CREATE GUEST DOCUMENTS TABLE
-- ============================================================================

CREATE TABLE accom_guest_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('passport', 'visa')),
    storage_path TEXT NOT NULL,
    file_size_bytes INTEGER,
    visa_expiry_date DATE,
    superseded_by UUID REFERENCES accom_guest_documents(id),
    consent_given_at TIMESTAMPTZ NOT NULL,
    consent_text_hash TEXT NOT NULL,
    registered_with_authorities BOOLEAN DEFAULT false,
    registered_at TIMESTAMPTZ,
    reminder_sent_7d BOOLEAN DEFAULT false,
    reminder_sent_3d BOOLEAN DEFAULT false,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE accom_guest_documents IS
    'Guest passport and visa document metadata. Files stored in guest-documents bucket. '
    'Soft-deleted by GDPR cron after retention period post-checkout.';

-- ============================================================================
-- 2. CREATE INDEXES
-- ============================================================================

CREATE INDEX idx_guest_docs_booking
    ON accom_guest_documents (booking_id)
    WHERE deleted_at IS NULL;

CREATE INDEX idx_guest_docs_property
    ON accom_guest_documents (property_id)
    WHERE deleted_at IS NULL;

CREATE INDEX idx_guest_docs_visa_expiry
    ON accom_guest_documents (visa_expiry_date)
    WHERE document_type = 'visa'
      AND deleted_at IS NULL
      AND visa_expiry_date IS NOT NULL;

CREATE INDEX idx_guest_docs_cleanup
    ON accom_guest_documents (property_id, deleted_at)
    WHERE deleted_at IS NULL;

-- ============================================================================
-- 3. ADD RETENTION & REMINDER COLUMNS TO PROPERTIES
-- ============================================================================

ALTER TABLE accom_properties
    ADD COLUMN IF NOT EXISTS document_retention_days INTEGER DEFAULT 30
        CHECK (document_retention_days >= 7 AND document_retention_days <= 90);

ALTER TABLE accom_properties
    ADD COLUMN IF NOT EXISTS visa_reminder_days INTEGER[] DEFAULT '{7,3}';

ALTER TABLE accom_properties
    ADD COLUMN IF NOT EXISTS visa_extension_info TEXT;

COMMENT ON COLUMN accom_properties.document_retention_days IS
    'Days after checkout to retain guest documents before GDPR auto-deletion. Min 7, max 90.';

COMMENT ON COLUMN accom_properties.visa_reminder_days IS
    'Array of days-before-expiry to send visa reminders. Default: 7 and 3 days.';

COMMENT ON COLUMN accom_properties.visa_extension_info IS
    'Optional text shown in visa expiry reminders if owner has convention with visa offices.';

-- ============================================================================
-- 4. CREATE PRIVATE STORAGE BUCKET
-- ============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'guest-documents',
    'guest-documents',
    false,
    5242880,
    '{"image/jpeg","image/png","image/webp"}'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE accom_guest_documents ENABLE ROW LEVEL SECURITY;

-- Service role has full access (all access via API routes with service role client)
CREATE POLICY "Service role full access on accom_guest_documents"
    ON accom_guest_documents
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- No anon or authenticated policies: guests have no Supabase auth session.
-- All access is mediated through API routes using service role.

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
