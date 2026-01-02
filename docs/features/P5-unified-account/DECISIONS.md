# P5 Architectural Decisions

> **Last Updated:** 2026-01-02

---

## ADR-001: Health Profiles Separati da Accounts

**Data:** 2026-01-02

**Contesto:**
Il BACKLOG originale aveva `health_profile JSONB` e `dietary_preferences JSONB` direttamente nella tabella `accounts`.

**Decisione:**
Creare tabella separata `health_profiles` con relazione 1:1 a `accounts`.

**Rationale:**
1. **GDPR Compliance** - Dati sanitari sono "special category data", richiedono protezione extra
2. **Privacy by Design** - Piu facile applicare RLS granulari
3. **Data Portability** - Piu facile export/delete dei soli dati sanitari
4. **Performance** - Account queries non caricano dati sanitari inutilmente

**Conseguenze:**
- JOIN richiesto per profilo completo
- `share_with_merchants` flag per controllo utente
- `share_anonymized` flag per analytics

---

## ADR-002: Mantenere merchant_users Esistente

**Data:** 2026-01-02

**Contesto:**
Esiste gia tabella `merchant_users` con schema proprio.

**Decisione:**
NON migrare o modificare `merchant_users`. Creare `accounts` + `account_roles` in parallelo.

**Rationale:**
1. **Zero Downtime** - Nessun impatto su sistema esistente
2. **Gradual Migration** - Futura migration linkera email
3. **Backward Compatibility** - Codice esistente continua a funzionare

**Conseguenze:**
- Duplicazione temporanea dati utente
- Futura migration necessaria: `merchant_users.email -> accounts.email`
- Serve sync logic quando stesso utente esiste in entrambi

---

## ADR-003: Supabase Auth Integration via auth_id

**Data:** 2026-01-02

**Contesto:**
Come collegare `accounts` a Supabase Auth (`auth.users`)?

**Decisione:**
Campo `auth_id UUID` che referenzia `auth.users.id`. RLS usa `auth.uid()`.

**Rationale:**
1. **Native Integration** - Supabase pattern standard
2. **Secure** - `auth.uid()` verificato da Supabase
3. **Flexible** - Account puo esistere senza auth (pre-signup referral)

**Conseguenze:**
- RLS policies usano subquery: `WHERE auth_id = auth.uid()`
- Signup flow deve creare auth.user + accounts + account_roles
- `auth_id` puo essere NULL (invited but not signed up)

---

## ADR-004: Loyalty Tier Automatico via Trigger

**Data:** 2026-01-02

**Contesto:**
Come gestire upgrade/downgrade tier loyalty?

**Decisione:**
Funzione `check_loyalty_tier_upgrade()` chiamata dopo ogni `award_loyalty_points()`.

**Rationale:**
1. **Consistency** - Tier sempre sincronizzato con punti
2. **Atomicity** - Upgrade + bonus in stessa transaction
3. **Auditability** - Tier bonus registrato in loyalty_transactions

**Tier Thresholds:**
- Bronze: 0-999 punti
- Silver: 1000-4999 punti (bonus 100pt)
- Gold: 5000-9999 punti (bonus 250pt)
- Platinum: 10000+ punti (bonus 500pt)
- Founding: Assegnato manualmente (early adopters)

**Conseguenze:**
- No downgrade automatico (discussione futura)
- Tier bonus puo causare cascade upgrade

---

## ADR-005: Referral Code Auto-Generato

**Data:** 2026-01-02

**Contesto:**
Come generare codici referral univoci?

**Decisione:**
Trigger `generate_referral_code()` che genera 8 caratteri alfanumerici uppercase da MD5 hash.

**Formula:**
```sql
UPPER(SUBSTRING(MD5(id::TEXT || NOW()::TEXT) FROM 1 FOR 8))
```

**Rationale:**
1. **Unique** - UUID + timestamp garantisce unicita
2. **Human-Friendly** - 8 char facili da condividere
3. **Consistent** - Formato uniforme (es: "A3F7B2C1")

**Conseguenze:**
- Collision teoricamente possibile ma improbabile (16^8 = 4.3 miliardi combinazioni)
- Utente non puo scegliere proprio codice (potrebbe essere feature futura)

---

## ADR-006: Role Types Estendibili

**Data:** 2026-01-02

**Contesto:**
Quali role types supportare?

**Decisione:**
CHECK constraint con: `consumer`, `merchant`, `admin`, `contributor`

**Rationale:**
1. **Consumer** - Utente che ordina/recensisce
2. **Merchant** - Gestisce un locale (con tenant_id)
3. **Admin** - Superuser GudBro
4. **Contributor** - Utente che contribuisce ingredienti/feedback

**Da Aggiungere (Futuro):**
- `partner` - Partner commerciale (es: fornitore)
- `moderator` - Review moderator

**Conseguenze:**
- `merchant` richiede `tenant_id`
- `contributor` puo essere aggiunto a qualsiasi account
- ALTER TABLE per nuovi roles

---

## ADR-007: 5 Dimensioni come JSONB Separati

**Data:** 2026-01-02

**Contesto:**
Come strutturare i dati delle 5 dimensioni in health_profiles?

**Decisione:**
5 colonne JSONB separate invece di un unico campo.

**Struttura:**
```sql
allergens JSONB       -- Dim 1: 30 allergens
intolerances JSONB    -- Dim 2: 10 intolerances
dietary JSONB         -- Dim 3: 11 dietary preferences
food_styles JSONB     -- Dim 4: spice, cuisines, portions
preferences JSONB     -- Dim 5: organic, local, sustainable
```

**Rationale:**
1. **Queryability** - GIN index su singola dimensione
2. **Partial Updates** - Aggiorna solo una dimensione
3. **Completeness Score** - Facile calcolare % per dimensione

**Conseguenze:**
- 5 colonne invece di 1
- `completeness_score` calcolato da trigger
- Query esempio: `WHERE allergens->>'gluten' = 'true'`

