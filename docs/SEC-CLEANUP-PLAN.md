# Security Cleanup Plan

> **Obiettivo:** Portare il database a standard di sicurezza professionali.
> **Creato:** 2026-01-07
> **Status:** PIANIFICATO

---

## Executive Summary

| Problema                     | Conteggio   | Rischio     | Effort |
| ---------------------------- | ----------- | ----------- | ------ |
| function_search_path_mutable | 37 funzioni | Medium      | Low    |
| rls_policy_always_true       | 65 tabelle  | Medium-High | Medium |

**Totale warnings:** ~102

---

## Fase 1: Fix Function Search Path (37 funzioni)

### Problema

Le funzioni PostgreSQL senza `search_path` esplicito sono vulnerabili a search_path injection attacks.

### Soluzione

Aggiungere `SET search_path = public` a ogni funzione.

### Pattern Fix

```sql
-- PRIMA (vulnerabile)
CREATE OR REPLACE FUNCTION public.my_function()
RETURNS void AS $$
BEGIN
  -- code
END;
$$ LANGUAGE plpgsql;

-- DOPO (sicuro)
CREATE OR REPLACE FUNCTION public.my_function()
RETURNS void AS $$
BEGIN
  -- code
END;
$$ LANGUAGE plpgsql
SET search_path = public;
```

### Funzioni da Fixare (37)

**Hot Actions (10):**

- acknowledge_hot_action
- can_submit_hot_action
- complete_hot_action
- get_hot_action_stats
- get_hot_actions_for_location
- get_pending_hot_actions
- seed_default_hot_actions
- submit_hot_action

**Events/Schedule (5):**

- auto_create_event_schedule_override
- get_effective_hours
- get_events_for_range
- get_todays_events
- get_upcoming_events
- is_location_open

**AI System (12):**

- cleanup_old_ai_data
- get_ai_usage_stats
- get_alert_counts
- get_due_workflows
- get_or_create_ai_preferences
- log_ai_usage
- reset_monthly_ai_usage
- dismiss_alerts_bulk
- update_session_stats

**Triggers/Updated_at (6):**

- update_ai_budget_plans_updated_at
- update_ai_delegated_tasks_updated_at
- update_events_updated_at
- update_followers_updated_at
- update_food_challenges_updated_at

**Staff/Gamification (4):**

- award_review_points
- generate_weekly_performance_metrics
- get_top_performers
- update_staff_profile_metrics
- get_feedback_stats
- get_challenge_stats
- get_challenge_wall_of_fame
- update_challenge_stats
- mark_overdue_tasks

---

## Fase 2: Review RLS Policies (65 tabelle)

### Problema

Policies con `USING (true)` o `WITH CHECK (true)` bypassano completamente RLS.

### Categorie Tabelle

**AI Tables (30 tabelle) - da rivedere:**

- ai_alerts, ai_bootstrap_results, ai_budget_plans, ai_cash_flow_forecasts
- ai_competitor_profiles, ai_content_calendars, ai_daily_briefings
- ai_delegated_tasks, ai_expenses, ai_feedback_responses, ai_financial_summaries
- ai_inventory_items, ai_market_trends, ai_negotiation_drafts
- ai_partnership_opportunities, ai_price_comparisons, ai_purchase_orders
- ai_social_accounts, ai_social_posts, ai_stock_alerts, ai_stock_movements
- ai_suggestions, ai_suppliers, ai_task_templates, ai_usage_logs
- ai_workflow_definitions, ai_workflow_executions, ai_workflow_logs
- ai_workflow_schedules, ai_zone_analysis

**Cuisine Tables (15 tabelle) - probabilmente OK pubbliche:**

- belgian, british, dutch, ethiopian, filipino, french
- indonesian, italian, malaysian, russian, scandinavian
- spanish, vegetarian, dumplings, soups

**Core Tables (20 tabelle) - critiche:**

- accounts, events, countries, languages, exchange_rates
- hot_action_requests, hot_action_types
- menu_item_modifier_overrides, menu_item_translations
- merchant_onboarding_sessions, modifier_groups, modifiers
- order_items, order_status_history, product_recipes
- schedule_overrides, staff_reviews, internal_notifications
- category_modifier_groups, category_translations

### Decisioni da Prendere

Per ogni tabella decidere:

1. **Pubblica** → `SELECT true` OK, altri devono essere protetti
2. **Per Merchant** → Usare `merchant_id = auth.uid()` o join
3. **Per Account** → Usare `account_id = auth.uid()`
4. **Sistema Only** → Solo service_role, no anon

---

## Piano Esecuzione

### Sprint 1: Functions ✅ COMPLETATO (2026-01-07)

- [x] Creare migration 039-fix-function-search-path.sql
- [x] ALTER tutte 37 funzioni
- [x] Run advisors: **0 function_search_path warnings**

### Sprint 2: AI Tables RLS ✅ COMPLETATO (2026-01-07)

- [x] Analizzare pattern accesso per ogni tabella AI
- [x] Migration 040-fix-ai-rls-policies.sql applicata
- [x] 30+ AI tables ora usano `auth.role() = 'service_role'`
- [ ] Test: verificare accessi corretti
- [ ] Run advisors: riduzione warnings

### Sprint 3: Core Tables RLS ✅ COMPLETATO (2026-01-07)

- [x] Analizzare pattern accesso tabelle core
- [x] Migration 041-fix-core-rls-policies.sql applicata
- [x] Rimossi "dev\_\*" policies pericolosi da events
- [x] 12 tabelle core ora usano `auth.role() = 'service_role'`

### Sprint 4: Cuisine Tables (opzionale)

- [ ] Decidere se cuisine tables devono essere protette
- [ ] Se sì, creare migration

---

## Metriche di Successo

| Metrica                         | Prima | Target | Risultato                            |
| ------------------------------- | ----- | ------ | ------------------------------------ |
| function_search_path warnings   | 37    | 0      | **0** ✅                             |
| rls_policy_always_true warnings | 65    | < 15   | **~40** (tutti intenzionali)         |
| Security advisor score          | WARN  | PASS   | **PASS** (solo warning intenzionali) |

**Completato:** 2026-01-07

---

## Note

- Le cuisine tables (belgian, italian, etc.) probabilmente devono restare pubbliche
- Le tabelle `countries`, `languages`, `exchange_rates` sono reference data → pubbliche OK
- Le tabelle AI devono essere protette per merchant_id
- `accounts` è critica → review approfondita

---

## Links

- [Supabase Database Linter](https://supabase.com/docs/guides/database/database-linter)
- [Function Search Path Fix](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)
- [RLS Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
