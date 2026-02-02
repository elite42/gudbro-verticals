# FEATURES INVENTORY

> **Central mapping of all GUDBRO features**
>
> **Last Updated:** 2026-01-06
> **Version:** 1.0

---

## 1. Overview

This document maps all features implemented in the backoffice to their corresponding landing page sections, ensuring nothing falls through the cracks.

---

## 2. Feature Matrix

### Legend

- ✅ = Implemented and marketed
- 🔧 = Implemented in backoffice, NOT on landing page
- 📋 = Planned / In TODO
- ❌ = Not implemented

---

## 3. Backoffice Features → Landing Page Mapping

| Backoffice Route          | Feature                          | Landing Section                   | Status |
| ------------------------- | -------------------------------- | --------------------------------- | ------ |
| `/dashboard`              | Main Dashboard                   | HeroSection                       | ✅     |
| `/ai`                     | **AI Co-Manager (13 services)**  | AICoManagerSection                | ✅     |
| `/content/menu`           | Menu Management                  | FeaturesSection                   | ✅     |
| `/content/recipes`        | Recipe Browser                   | FeaturesSection                   | ✅     |
| `/content/ingredients`    | Ingredients Database             | DatabaseSection                   | ✅     |
| `/content/modifiers`      | Menu Modifiers                   | FeaturesSection (implied)         | ✅     |
| `/content/categories`     | Menu Categories                  | FeaturesSection (implied)         | ✅     |
| `/content/menu-builder`   | Menu Builder                     | FeaturesSection                   | ✅     |
| `/content/wines`          | Wine Management                  | DatabaseSection                   | ✅     |
| `/content/contributions`  | Community Contributions          | DatabaseSection                   | ✅     |
| `/food-costs`             | **Food Cost Calculator**         | FoodCostsSection                  | ✅     |
| `/food-costs/ingredients` | Ingredient Pricing               | FoodCostsSection                  | ✅     |
| `/orders`                 | Order Management                 | KitchenDisplaySection             | ✅     |
| `/orders/kitchen`         | **Kitchen Display (KDS)**        | KitchenDisplaySection             | ✅     |
| `/marketing/events`       | Events (29 types)                | EventsPromotionsSection           | ✅     |
| `/marketing/promotions`   | Promotions (16 mechanics)        | EventsPromotionsSection           | ✅     |
| `/marketing/loyalty`      | Loyalty Program                  | EventsPromotionsSection           | ✅     |
| `/marketing/challenges`   | Food Challenges                  | FoodChallengesSection             | ✅     |
| `/team`                   | **Staff Management**             | **MANCA**                         | 🔧     |
| `/customers`              | Customer Overview                | **MANCA**                         | 🔧     |
| `/customers/followers`    | Followers Management             | **MANCA**                         | 🔧     |
| `/customers/feedback`     | Feedback Management              | **MANCA**                         | 🔧     |
| `/analytics`              | **Analytics Dashboard**          | AnalyticsSection                  | ✅     |
| `/qr-codes`               | QR Code Generator                | EventsPromotionsSection (partial) | ✅     |
| `/translations`           | Translation Management           | FiveDimensionsSection             | ✅     |
| `/billing`                | Subscription/Billing             | PricingSection                    | ✅     |
| `/settings/*`             | Settings (hours, currency, etc.) | -                                 | N/A    |
| `/hot-actions`            | Quick Actions                    | -                                 | N/A    |
| `/platform`               | Platform Status                  | -                                 | N/A    |

---

## 4. Landing Page Sections Audit

### Current Sections (15)

| Section                   | Backoffice Features Covered                           |
| ------------------------- | ----------------------------------------------------- |
| HeroSection               | General overview                                      |
| ROIStatsSection           | Business metrics                                      |
| FeaturesSection           | Menu, recipes, modifiers                              |
| **AICoManagerSection**    | **13 AI services, daily briefings, proactive alerts** |
| FiveDimensionsSection     | 5 food intelligence dimensions                        |
| **FoodCostsSection**      | **Recipe costing, margin calculator, pricing**        |
| DatabaseSection           | Ingredients, wines, dishes                            |
| VerticalsSection          | 75 cuisine verticals                                  |
| EventsPromotionsSection   | Events, promos, loyalty                               |
| **AnalyticsSection**      | **Real-time metrics, charts, insights**               |
| **KitchenDisplaySection** | **KDS, order flow, prep tracking**                    |
| FoodChallengesSection     | Food challenges                                       |
| PricingSection            | Billing, subscriptions                                |
| TestimonialsSection       | Social proof                                          |
| CTASection                | Conversion                                            |

### Missing Sections (Priority)

| Priority   | Section Needed            | Features to Highlight                                   | Status  |
| ---------- | ------------------------- | ------------------------------------------------------- | ------- |
| ~~**P0**~~ | ~~AICoManagerSection~~    | ~~13 AI services, daily briefings, proactive alerts~~   | ✅ DONE |
| ~~**P1**~~ | ~~FoodCostsSection~~      | ~~Recipe costing, margin calculator, supplier pricing~~ | ✅ DONE |
| ~~**P1**~~ | ~~AnalyticsSection~~      | ~~Real-time metrics, reports, insights~~                | ✅ DONE |
| ~~**P2**~~ | ~~KitchenDisplaySection~~ | ~~KDS, order flow, prep tracking~~                      | ✅ DONE |
| **P2**     | TeamManagementSection     | Staff roles, permissions, schedules                     | 🔧 TODO |
| **P3**     | CustomerManagementSection | Followers, feedback, CRM                                | 🔧 TODO |

---

## 5. AI Co-Manager Services (Detailed)

> **13 AI services implemented** - This is our biggest differentiator!

| Service                       | Purpose                               | Database Tables                                      |
| ----------------------------- | ------------------------------------- | ---------------------------------------------------- |
| chat-service                  | Main AI chat interface                | -                                                    |
| knowledge-service             | Menu, orders, events, feedback access | Multiple                                             |
| actions-service               | Create events, translate, update menu | events, translations                                 |
| proactivity-service           | Daily briefings, alerts               | ai_daily_briefings                                   |
| feedback-loop-service         | Collect merchant feedback             | improvement_suggestions                              |
| bootstrap-service             | Zone analysis, competitors            | zone_analysis, competitors                           |
| market-intelligence-service   | Pricing, partnerships                 | market_prices, partnerships                          |
| social-media-service          | Auto posts, calendars                 | ai_social_posts, ai_content_calendars                |
| financial-service             | P&L, budgets, forecasts               | ai_financial_summaries, ai_budget_plans              |
| task-delegation-service       | Staff task management                 | ai_delegated_tasks                                   |
| agentic-workflow-service      | Multi-step automations                | ai_workflow_definitions, ai_workflow_executions      |
| inventory-negotiation-service | Stock, suppliers, POs                 | ai_suppliers, ai_inventory_items, ai_purchase_orders |
| onboarding-service            | Guided setup                          | ai_merchant_preferences                              |

---

## 6. Database Numbers (Marketing Assets)

Use these in landing page copy:

| Metric             | Value  | Source                         |
| ------------------ | ------ | ------------------------------ |
| Database Entries   | 4,653+ | product_taxonomy               |
| Ingredients        | 2,548  | ingredients table              |
| Cuisines/Verticals | 75     | cuisines folder count          |
| Event Types        | 29     | events-service.ts              |
| Promo Mechanics    | 16     | events-service.ts              |
| Sports Types       | 9      | events-service.ts              |
| Loyalty Actions    | 18     | loyalty_config                 |
| Loyalty Tiers      | 4      | loyalty_tiers                  |
| AI Services        | 13     | lib/ai/                        |
| AI DB Tables       | 10     | migrations 027-036             |
| Countries          | 31     | countries table                |
| Languages          | 50+    | Supported                      |
| Allergens Tracked  | 14     | allergens enum                 |
| Dietary Filters    | 10+    | is_vegan, is_gluten_free, etc. |

---

## 7. Action Plan

### Completed (2026-01-06)

- [x] Create AICoManagerSection.tsx - 13 AI services showcased
- [x] Create FoodCostsSection.tsx - Margin tracking, recipe costing
- [x] Create AnalyticsSection.tsx - Real-time metrics, charts
- [x] Create KitchenDisplaySection.tsx - KDS preview, order flow

### Remaining (P2-P3)

- [ ] Create TeamManagementSection.tsx - Staff roles, permissions
- [ ] Create CustomerManagementSection.tsx - Followers, feedback

---

## 8. Cross-Reference

### Related Documents

- `CLAUDE.md` - Main project context
- `docs/DATABASE-INVENTORY.md` - Database state
- `docs/DATABASE-SCHEMA.md` - Table schemas
- `docs/backlog/` - Task tracking

### Backoffice Entry Points

- AI: `apps/backoffice/app/(dashboard)/ai/page.tsx`
- Events: `apps/backoffice/app/(dashboard)/marketing/events/page.tsx`
- Food Costs: `apps/backoffice/app/(dashboard)/food-costs/page.tsx`
- Analytics: `apps/backoffice/app/(dashboard)/analytics/page.tsx`

### Landing Page Entry

- Homepage: `apps/website/app/page.tsx`
- Components: `apps/website/components/marketing/`

---

**File:** `docs/FEATURES-INVENTORY.md`
**Version:** 1.1
**Updated:** 2026-01-06
**Changes:** v1.1 - Added 4 new landing page sections (AI, Food Costs, Analytics, Kitchen Display)
