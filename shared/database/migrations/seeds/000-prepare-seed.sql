-- =====================================================
-- PREPARE FOR SEED DATA
-- Date: 2026-01-05
-- RUN THIS FIRST before 001-test-data.sql
-- =====================================================

-- Step 1: Drop the problematic trigger
DROP TRIGGER IF EXISTS trg_account_welcome_bonus ON accounts;

-- Step 2: Clean up any partial seed data from failed runs
-- Using specific UUIDs we defined in seed file

-- AI tables by merchant_id
DELETE FROM ai_social_posts WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);
DELETE FROM ai_delegated_tasks WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);
DELETE FROM ai_workflow_definitions WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);
DELETE FROM ai_inventory_items WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);
DELETE FROM ai_suppliers WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);
DELETE FROM ai_financial_summaries WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);
DELETE FROM ai_daily_briefings WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);
DELETE FROM ai_merchant_preferences WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);

-- Tables by location_id
DELETE FROM events WHERE location_id IN ('10000000-0000-0000-0000-000000000001'::uuid, '10000000-0000-0000-0000-000000000002'::uuid, '10000000-0000-0000-0000-000000000003'::uuid, '10000000-0000-0000-0000-000000000004'::uuid);

-- customer_feedback uses merchant_id
DELETE FROM customer_feedback WHERE merchant_id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid);

-- Core tables by id (UUIDs must use hex chars: 0-9, a-f)
DELETE FROM account_roles WHERE account_id IN ('a0000000-0000-0000-0000-000000000001'::uuid, 'a0000000-0000-0000-0000-000000000002'::uuid, 'a0000000-0000-0000-0000-000000000003'::uuid, 'a0000000-0000-0000-0000-000000000004'::uuid);
DELETE FROM accounts WHERE id IN ('a0000000-0000-0000-0000-000000000001'::uuid, 'a0000000-0000-0000-0000-000000000002'::uuid, 'a0000000-0000-0000-0000-000000000003'::uuid, 'a0000000-0000-0000-0000-000000000004'::uuid);
DELETE FROM merchants WHERE id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, '33333333-3333-3333-3333-333333333333'::uuid);
DELETE FROM locations WHERE id IN ('10000000-0000-0000-0000-000000000001'::uuid, '10000000-0000-0000-0000-000000000002'::uuid, '10000000-0000-0000-0000-000000000003'::uuid, '10000000-0000-0000-0000-000000000004'::uuid);
DELETE FROM brands WHERE id IN ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid, 'dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid);
DELETE FROM organizations WHERE id IN ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, '33333333-3333-3333-3333-333333333333'::uuid);

-- Verify trigger is gone
SELECT 'Trigger dropped successfully' as result;

-- =====================================================
-- NOW RUN 001-test-data.sql
-- =====================================================
