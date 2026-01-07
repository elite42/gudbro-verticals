-- Migration 039: Fix Function Search Path Security
-- Fixes 37 functions with mutable search_path vulnerability
-- Reference: https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

-- ============================================
-- HOT ACTIONS FUNCTIONS (8)
-- ============================================

ALTER FUNCTION public.acknowledge_hot_action SET search_path = public;
ALTER FUNCTION public.can_submit_hot_action SET search_path = public;
ALTER FUNCTION public.complete_hot_action SET search_path = public;
ALTER FUNCTION public.get_hot_action_stats SET search_path = public;
ALTER FUNCTION public.get_hot_actions_for_location SET search_path = public;
ALTER FUNCTION public.get_pending_hot_actions SET search_path = public;
ALTER FUNCTION public.seed_default_hot_actions SET search_path = public;
ALTER FUNCTION public.submit_hot_action SET search_path = public;

-- ============================================
-- EVENTS/SCHEDULE FUNCTIONS (6)
-- ============================================

ALTER FUNCTION public.auto_create_event_schedule_override SET search_path = public;
ALTER FUNCTION public.get_effective_hours SET search_path = public;
ALTER FUNCTION public.get_events_for_range SET search_path = public;
ALTER FUNCTION public.get_todays_events SET search_path = public;
ALTER FUNCTION public.get_upcoming_events SET search_path = public;
ALTER FUNCTION public.is_location_open SET search_path = public;

-- ============================================
-- AI SYSTEM FUNCTIONS (9)
-- ============================================

ALTER FUNCTION public.cleanup_old_ai_data SET search_path = public;
ALTER FUNCTION public.get_ai_usage_stats SET search_path = public;
ALTER FUNCTION public.get_alert_counts SET search_path = public;
ALTER FUNCTION public.get_due_workflows SET search_path = public;
ALTER FUNCTION public.get_or_create_ai_preferences SET search_path = public;
ALTER FUNCTION public.log_ai_usage SET search_path = public;
ALTER FUNCTION public.reset_monthly_ai_usage SET search_path = public;
ALTER FUNCTION public.dismiss_alerts_bulk SET search_path = public;
ALTER FUNCTION public.update_session_stats SET search_path = public;

-- ============================================
-- TRIGGER FUNCTIONS (updated_at) (5)
-- ============================================

ALTER FUNCTION public.update_ai_budget_plans_updated_at SET search_path = public;
ALTER FUNCTION public.update_ai_delegated_tasks_updated_at SET search_path = public;
ALTER FUNCTION public.update_events_updated_at SET search_path = public;
ALTER FUNCTION public.update_followers_updated_at SET search_path = public;
ALTER FUNCTION public.update_food_challenges_updated_at SET search_path = public;

-- ============================================
-- STAFF/GAMIFICATION FUNCTIONS (9)
-- ============================================

ALTER FUNCTION public.award_review_points SET search_path = public;
ALTER FUNCTION public.generate_weekly_performance_metrics SET search_path = public;
ALTER FUNCTION public.get_top_performers SET search_path = public;
ALTER FUNCTION public.update_staff_profile_metrics SET search_path = public;
ALTER FUNCTION public.get_feedback_stats SET search_path = public;
ALTER FUNCTION public.get_challenge_stats SET search_path = public;
ALTER FUNCTION public.get_challenge_wall_of_fame SET search_path = public;
ALTER FUNCTION public.update_challenge_stats SET search_path = public;
ALTER FUNCTION public.mark_overdue_tasks SET search_path = public;

-- ============================================
-- VERIFICATION
-- ============================================

-- After applying, run: SELECT * FROM supabase_functions.get_advisors('security')
-- Expected: 0 function_search_path_mutable warnings
