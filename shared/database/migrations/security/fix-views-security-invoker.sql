-- ============================================================================
-- FIX: Supabase Security Advisor - All Issues
-- ============================================================================
-- Date: 2026-01-03
-- Status: EXECUTED SUCCESSFULLY
-- Result: 18 errors → 0 errors, 4 warnings → 1 warning (Pro plan required)
-- ============================================================================
--
-- Remaining warning: "Leaked Password Protection Disabled"
-- This requires Supabase Pro plan to enable HaveIBeenPwned integration
-- ============================================================================

-- v_recent_loyalty_transactions
ALTER VIEW IF EXISTS public.v_recent_loyalty_transactions SET (security_invoker = on);

-- v_referral_leaderboard
ALTER VIEW IF EXISTS public.v_referral_leaderboard SET (security_invoker = on);

-- v_account_with_roles
ALTER VIEW IF EXISTS public.v_account_with_roles SET (security_invoker = on);

-- v_pending_staff_invitations
ALTER VIEW IF EXISTS public.v_pending_staff_invitations SET (security_invoker = on);

-- v_rewards_admin
ALTER VIEW IF EXISTS public.v_rewards_admin SET (security_invoker = on);

-- v_organization_staff
ALTER VIEW IF EXISTS public.v_organization_staff SET (security_invoker = on);

-- v_onboarding_stats
ALTER VIEW IF EXISTS public.v_onboarding_stats SET (security_invoker = on);

-- v_pending_onboardings
ALTER VIEW IF EXISTS public.v_pending_onboardings SET (security_invoker = on);

-- v_suggestion_leaderboard
ALTER VIEW IF EXISTS public.v_suggestion_leaderboard SET (security_invoker = on);

-- v_realtime_analytics
ALTER VIEW IF EXISTS public.v_realtime_analytics SET (security_invoker = on);

-- v_tier_progression
ALTER VIEW IF EXISTS public.v_tier_progression SET (security_invoker = on);

-- v_scheduled_loyalty_jobs
ALTER VIEW IF EXISTS public.v_scheduled_loyalty_jobs SET (security_invoker = on);

-- v_referral_stats
ALTER VIEW IF EXISTS public.v_referral_stats SET (security_invoker = on);

-- v_contributor_stats
ALTER VIEW IF EXISTS public.v_contributor_stats SET (security_invoker = on);

-- v_recent_suggestions
ALTER VIEW IF EXISTS public.v_recent_suggestions SET (security_invoker = on);

-- v_pending_contributions
ALTER VIEW IF EXISTS public.v_pending_contributions SET (security_invoker = on);

-- v_loyalty_summary
ALTER VIEW IF EXISTS public.v_loyalty_summary SET (security_invoker = on);

-- v_top_events (added in second pass)
ALTER VIEW IF EXISTS public.v_top_events SET (security_invoker = on);

-- ============================================================================
-- FIX: Functions search_path (prevents SQL injection)
-- ============================================================================
ALTER FUNCTION public.get_loyalty_points SET search_path = public;
ALTER FUNCTION public.set_event_date SET search_path = public;
ALTER FUNCTION public.get_tier_for_points SET search_path = public;

-- ============================================================================
-- Verification query (run after to confirm changes)
-- ============================================================================
-- SELECT schemaname, viewname,
--        (SELECT relrowsecurity FROM pg_class WHERE relname = viewname) as rls_enabled
-- FROM pg_views
-- WHERE schemaname = 'public' AND viewname LIKE 'v_%';
