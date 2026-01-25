# 🧪 TESTING

> Task completate che richiedono test/validazione.
> Dopo il test → spostala in `4-DONE.md`

**Last Updated:** 2026-01-19

---

| ID            | Feature                 | Descrizione                                          | Priority | Notes                                                       |
| ------------- | ----------------------- | ---------------------------------------------------- | -------- | ----------------------------------------------------------- |
| QR-BUILDER-V2 | QR Code System          | Database, types, service, components, AI integration | P1       | Migration 042, QR Builder Modal, AI actions/alerts, PWA     |
| GB-STAFF-MGT  | Staff Management        | Team profiles, reviews, performance, PWA flow        | P0       | Migration 038, Backoffice Team page, PWA /team              |
| GB-AI-P1      | AI Co-Manager MVP       | Chat UI + OpenAI integration                         | P0       | Migration 027, API key, test chat pending                   |
| GB-AI-P2      | AI Knowledge Base       | Menu + Orders + Events + Feedback access             | P0       | knowledge-service.ts integrato                              |
| GB-AI-P3      | AI Actions              | Create events, translate, update menu                | P0       | actions-service.ts + function calling                       |
| GB-AI-P4      | AI Proactivity          | Daily briefing, alerts, suggestions                  | P0       | Migration 028, proactivity-service.ts, API routes           |
| GB-AI-P5      | AI Feedback Loop        | Collect feedback → GudBro Team                       | P0       | Migration 029, feedback-loop-service.ts                     |
| GB-AI-P6      | AI Bootstrap            | Setup automatico zona, competitor                    | P0       | Migration 030, bootstrap-service.ts                         |
| GB-AI-P7      | Market Intelligence     | Price comparison, partnership finder                 | P0       | Migration 031, market-intelligence-service.ts               |
| GB-AI-P8      | Social Media Automation | Auto post, calendar, captions                        | P0       | Migration 032, social-media-service.ts                      |
| GB-AI-P9      | Financial Management    | P&L, budgets, cash flow forecasts                    | P0       | Migration 033, financial-service.ts                         |
| GB-AI-P10     | Task Delegation         | AI delegates physical tasks to staff                 | P0       | Migration 034, task-delegation-service.ts                   |
| GB-AI-P11     | Agentic Workflows       | Multi-step automated workflows                       | P0       | Migration 035, agentic-workflow-service.ts                  |
| GB-AI-P12     | Inventory & Negotiation | Stock tracking, supplier management, AI negotiation  | P0       | Migration 036, inventory-negotiation-service.ts             |
| GB-AI-P13     | AI-Assisted Onboarding  | Conversational onboarding + logo upload              | P0       | onboarding-service.ts, /api/ai/onboarding, /api/upload/logo |

---

## Come Testare

### GB-AI-P1 - AI Co-Manager MVP

1. Vai su http://localhost:3001
2. Login con account dev
3. Cerca il pulsante "AI Co-Manager" in basso a destra
4. Apri la chat e prova a fare domande
5. Verifica che le risposte siano coerenti

### GB-AI-P2 - AI Knowledge Base

1. Chiedi all'AI: "Quali sono i miei prodotti più venduti?"
2. Chiedi: "Come stanno andando le vendite?"
3. Chiedi: "Quali eventi ho in programma?"
4. Verifica che l'AI abbia accesso ai dati reali del merchant

### GB-AI-P3 - AI Actions

1. Chiedi: "Crea un evento per la partita Liverpool vs Roma sabato alle 20:00"
2. Chiedi: "Traduci 'Pasta alla carbonara' in vietnamita e coreano"
3. Chiedi: "Scrivi una descrizione appetitosa per Tiramisù"
4. Verifica che gli eventi vengano creati come draft in Supabase

### GB-AI-P4 - AI Proactivity

1. Esegui migration 028-ai-proactivity.sql su Supabase
2. Test API briefing: `GET /api/ai/briefing?merchantId=XXX`
3. Test API alerts: `GET /api/ai/alerts?merchantId=XXX`
4. Test API suggestions: `POST /api/ai/suggestions` con merchantId
5. Verifica che il briefing contenga highlights, alerts e suggestions

### GB-AI-P5 - AI Feedback Loop

1. Esegui migration 029-ai-feedback-loop.sql su Supabase
2. Test submit feedback: `POST /api/ai/feedback` con type, category, subject, description
3. Test get merchant feedback: `GET /api/ai/feedback?merchantId=XXX`
4. Test admin view: `GET /api/ai/feedback?admin=true`
5. Verifica che l'AI analizzi sentiment e priorità del feedback

### GB-AI-P6 - AI Bootstrap

1. Esegui migration 030-ai-bootstrap.sql su Supabase
2. Test full bootstrap: `POST /api/ai/bootstrap` con merchantId, locationId
3. Test zone analysis: `POST /api/ai/bootstrap` con action=zone_analysis
4. Test competitor discovery: `POST /api/ai/bootstrap` con action=competitors
5. Get existing data: `GET /api/ai/bootstrap?merchantId=XXX&locationId=YYY`

### GB-AI-P7 - Market Intelligence

1. Esegui migration 031-ai-market-intelligence.sql su Supabase
2. Test pricing: `POST /api/ai/market` con action=pricing, items[]
3. Test partnerships: `POST /api/ai/market` con action=partnerships
4. Test trends: `POST /api/ai/market` con action=trends
5. Get all data: `GET /api/ai/market?merchantId=XXX`

### GB-AI-P8 - Social Media Automation

1. Esegui migration 032-ai-social-media.sql su Supabase
2. Test post generation: `POST /api/ai/social` con action=post, platform, contentType, topic
3. Test calendar: `POST /api/ai/social` con action=calendar, weekStart, platforms, postsPerWeek
4. Test captions: `POST /api/ai/social` con action=captions, topic, platform
5. Get posts: `GET /api/ai/social?merchantId=XXX&type=posts`
6. Get calendars: `GET /api/ai/social?merchantId=XXX&type=calendars`

### GB-AI-P9 - Financial Management

1. Esegui migration 033-ai-financial.sql su Supabase
2. Test P&L summary: `POST /api/ai/finance` con action=summary, period, periodStart, periodEnd
3. Test budget plan: `POST /api/ai/finance` con action=budget, year, month, totalBudget
4. Test forecast: `POST /api/ai/finance` con action=forecast, months
5. Get all financial data: `GET /api/ai/finance?merchantId=XXX`

### GB-AI-P10 - Task Delegation

1. Esegui migration 034-ai-task-delegation.sql su Supabase
2. Test generate tasks: `POST /api/ai/tasks` con action=generate
3. Test create task: `POST /api/ai/tasks` con action=create, title, category, priority
4. Test update status: `PATCH /api/ai/tasks` con taskId, action=status, status
5. Get tasks: `GET /api/ai/tasks?merchantId=XXX`
6. Get analysis: `GET /api/ai/tasks?merchantId=XXX&type=analysis`

### GB-AI-P11 - Agentic Workflows

1. Esegui migration 035-ai-agentic-workflows.sql su Supabase
2. Test create defaults: `POST /api/ai/workflows` con action=create_defaults
3. Test create workflow: `POST /api/ai/workflows` con action=create, name, trigger, steps
4. Test execute: `POST /api/ai/workflows` con action=execute, workflowId
5. Get workflows: `GET /api/ai/workflows?merchantId=XXX`
6. Get executions: `GET /api/ai/workflows?merchantId=XXX&type=executions`

### GB-AI-P12 - Inventory & Negotiation

1. Esegui migration 036-ai-inventory-negotiation.sql su Supabase
2. Test add supplier: `POST /api/ai/inventory` con action=add_supplier, name, categories[]
3. Test add item: `POST /api/ai/inventory` con action=add_item, name, category, unit
4. Test update stock: `POST /api/ai/inventory` con action=update_stock, itemId, adjustment
5. Test find suppliers: `POST /api/ai/inventory` con action=find_suppliers, category
6. Test purchase order: `POST /api/ai/inventory` con action=purchase_order, supplierId, itemIds[]
7. Test negotiate: `POST /api/ai/inventory` con action=negotiate, supplierId, type
8. Get inventory data: `GET /api/ai/inventory?merchantId=XXX`
9. Analyze inventory: `GET /api/ai/inventory?merchantId=XXX&analyze=true`

### GB-AI-P13 - AI-Assisted Onboarding

1. **Logo Upload API:**
   - `POST /api/upload/logo` con FormData (file, brandId opzionale)
   - Verifica che l'immagine venga salvata in Supabase Storage bucket "brand-assets"
   - Verifica che venga restituito l'URL pubblico
   - Formati supportati: PNG, JPEG, WebP, SVG (max 5MB)

2. **Onboarding Status Check:**
   - `GET /api/ai/onboarding?locationId=XXX`
   - Verifica che ritorni: isComplete, completionPercentage, missingFields[], nextStep
   - Verifica che missingFields abbia priority: critical/important/optional

3. **Onboarding Actions:**
   - `POST /api/ai/onboarding` con action=update_organization_info, organizationId, name
   - `POST /api/ai/onboarding` con action=update_brand_info, brandId, name, business_type
   - `POST /api/ai/onboarding` con action=update_location_info, locationId, city, phone
   - `POST /api/ai/onboarding` con action=check_onboarding_progress, merchantId, locationId

4. **AI Chat Onboarding Integration:**
   - Apri AI Chat con un merchant incompleto
   - Verifica che AI menzioni i campi mancanti nel primo messaggio
   - Prova: "Il mio ristorante si chiama ROOTS Cafe"
   - Verifica che AI usi update_brand_info per salvare il nome
   - Prova: "Siamo a Da Nang, Vietnam"
   - Verifica che AI usi update_location_info per city e country

5. **Completeness Flow:**
   - Verifica che completionPercentage aumenti dopo ogni update
   - Quando tutti i campi critical sono completati, verifica isComplete=true
   - Verifica che onboardingStatus sparisca dalla risposta quando completo

### GB-STAFF-MGT - Staff Management

#### 1. Database Tables (Migration 038)

```sql
-- Verifica che le 6 tabelle esistano:
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('staff_profiles', 'staff_reviews', 'staff_achievements',
                   'staff_performance_metrics', 'location_team_settings', 'manager_evaluations');
```

#### 2. Backoffice Team Page (http://localhost:3001/team)

1. **Tab Members:**
   - Verifica che mostra i profili staff con foto, nome, ruolo
   - Verifica rating e numero recensioni
   - Test pulsante "Add Staff" (apre modal)

2. **Tab Performance:**
   - Verifica Weekly Report con statistiche
   - Verifica Top Performers della settimana
   - Verifica AI Suggestions (se OpenAI configurato)

3. **Tab Settings:**
   - Toggle "Mostra team sul menu" → verifica salvataggio
   - Toggle "Consenti recensioni staff" → verifica salvataggio
   - Toggle "Riconoscimenti settimanali" → verifica salvataggio
   - Click "?" per vedere tooltip pro/contro

#### 3. Backoffice API Tests

```bash
# Get staff profiles
curl "http://localhost:3001/api/staff?locationId=10000000-0000-0000-0000-000000000001&type=profiles"

# Get team settings
curl "http://localhost:3001/api/staff?locationId=10000000-0000-0000-0000-000000000001&type=settings"

# Get performance data
curl "http://localhost:3001/api/staff?locationId=10000000-0000-0000-0000-000000000001&type=performance"

# Get review categories
curl "http://localhost:3001/api/staff?type=categories"
```

#### 4. PWA Team Page (http://localhost:3004/team)

1. Verifica che mostra solo staff pubblico
2. Verifica card con foto, nome, ruolo, rating
3. Click "Lascia una recensione" → apre modal

#### 5. PWA Review Flow

1. **Step 1 - Rating:** Tocca 1-5 stelle
2. **Step 2 - Categories:** Seleziona fino a 4 tag (friendly, fast, etc.)
3. **Step 3 - Comment:** Scrivi commento opzionale, toggle anonimo
4. **Step 4 - Thanks:** Verifica punti guadagnati (se non anonimo)

#### 6. PWA API Tests

```bash
# Get public staff
curl "http://localhost:3004/api/staff/reviews?type=publicStaff&locationId=10000000-0000-0000-0000-000000000001"

# Submit review (POST)
curl -X POST "http://localhost:3004/api/staff/reviews" \
  -H "Content-Type: application/json" \
  -d '{"staffId":"1ac70236-81fe-4201-ae28-264e2d9d6cb8","locationId":"10000000-0000-0000-0000-000000000001","rating":5,"categories":["friendly","fast"],"isAnonymous":true}'
```

#### 7. Integration Checks

- [ ] Review submitted → staff average_rating updated automatically
- [ ] Review submitted → total_reviews incremented
- [ ] Non-anonymous review → points awarded to reviewer
- [ ] Settings toggle → affects what's visible in PWA

### QR-BUILDER-V2 - QR Code System

#### 1. Database Tables (Migration 042)

```sql
-- Verifica che le 2 tabelle esistano:
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('qr_codes', 'qr_scans');
```

#### 2. Backoffice QR Codes Page (http://localhost:3001/qr-codes)

1. **Create QR Code:**
   - Click "Create QR" button → opens QRBuilderModal
   - Select type: URL or WiFi
   - For URL: enter destination, select context (table/external/takeaway)
   - For WiFi: enter SSID, password, security type
   - Customize colors and pattern in Design panel
   - Preview updates in real-time
   - Save and verify QR appears in list

2. **Bulk Create:**
   - Test "Bulk Create" for tables (enter number of tables)
   - Verify multiple QR codes created

3. **Export Options:**
   - Download PNG (standard)
   - Download PNG HD (for print)
   - Download SVG (vector)
   - Test material presets (paper, t-shirt, sticker, etc.)

4. **QR Statistics:**
   - Verify stats cards show: Total QRs, Active, Total Scans, Today's Scans

#### 3. QR Redirect Flow

1. **Create a URL QR with short code**
2. **Visit:** `http://localhost:3001/api/qr/r/[shortCode]`
3. **Verify:**
   - Redirect to destination URL
   - Scan logged in qr_scans table
   - scan_count incremented on qr_codes

4. **Error Pages:**
   - Test `/qr-not-found` - shows "QR Code Not Found"
   - Test `/qr-inactive` - shows "QR Code Inactive"
   - Test `/qr-expired` - shows "QR Code Expired"
   - Test `/wifi-info?ssid=Test` - shows WiFi connection instructions

#### 4. AI Integration

1. **Test AI Actions (via AI Chat):**
   - "Create a QR code for table 5"
   - "Create QR codes for 10 tables"
   - "What format should I use for t-shirt printing?"
   - "How are my QR codes performing?"

2. **Test AI Alerts:**
   - Check `/api/ai/alerts` for QR-related alerts:
     - Underperforming QR codes
     - High performer detection
     - Source comparison insights

#### 5. PWA Source Welcome Banner

1. **Visit PWA with source parameter:**
   - `http://localhost:3004?source=google_maps`
   - `http://localhost:3004?source=instagram`
   - `http://localhost:3004?source=flyer`

2. **Verify:**
   - Welcome banner appears with source-specific message
   - Banner dismisses and doesn't reappear (localStorage)
   - Promo code applied if source has one

#### 6. WiFi QR Flow

1. **Create WiFi QR in backoffice**
2. **Scan with phone camera**
3. **Verify phone offers to connect to WiFi network**
