# P5 Progress Log

> **Last Updated:** 2026-01-02
> **Current Phase:** Phase 1 COMPLETATO

---

## Phase 1: Foundation

### Completato

| Task | Data | Note |
|------|------|------|
| Analisi schema auth Supabase esistente | 2026-01-02 | Trovate tabelle: merchants, merchant_users, organizations, partners, locations, brands (tutte vuote) |
| Analisi tabelle esistenti | 2026-01-02 | merchant_users ha schema base, da preservare per backward compatibility |
| Design schema Unified Account | 2026-01-02 | 5 tabelle + funzioni helper + RLS + views |
| Creazione migration SQL | 2026-01-02 | `001-accounts-foundation.sql` (753 righe) |
| Esecuzione migration | 2026-01-02 | Successo - tutte le tabelle create |
| Verifica tabelle | 2026-01-02 | Confermato via REST API |

### In Progress

| Task | Status | Blockers |
|------|--------|----------|
| Documentazione strutturata | 90% | - |
| Aggiornamento BACKLOG.md | Pending | - |

### Da Fare (Phase 1)

| Task | Priorita | Note |
|------|----------|------|
| Aggiungere role_type 'partner' | Bassa | Non critico per MVP |
| UI Role Switcher | Alta | ACC-ROLE-SWITCH nel backlog |
| Sign-up Multi-Step Wizard | Alta | ACC-SIGNUP-FLOW |
| Sync Preferenze su login merchant | Media | ACC-SYNC-PREFS |

---

## Phase 2: Loyalty System (NEXT)

### Da Fare

| Task | ID Backlog | Priorita |
|------|------------|----------|
| Definire regole punti | ACC-LOYALTY-UNIFIED | P2 |
| Consumer loyalty actions | ACC-LOYALTY-CONSUMER | P2 |
| Merchant loyalty actions | ACC-LOYALTY-MERCHANT | P2 |
| Bidirectional referral flow | ACC-REFERRAL-BIDIR | P2 |
| Contributor program | ACC-CONTRIBUTOR | P2 |

---

## Phase 2.5: User-Generated Ingredients

### Da Fare

| Task | ID Backlog | Note |
|------|------------|------|
| Creare tabella `ingredient_contributions` | ING-USER-CONTRIB | Schema gia definito in BACKLOG |
| Photo extraction prompt | ING-PHOTO-EXTRACT | Gemini/ChatGPT |
| Admin review queue | ING-REVIEW-QUEUE | Dashboard backoffice |
| Contributor rewards | ING-CONTRIBUTOR-REWARD | 50pt per ingrediente |

---

## Decisioni Prese

Vedi [DECISIONS.md](./DECISIONS.md) per dettagli.

| # | Decisione | Data | Rationale |
|---|-----------|------|-----------|
| 1 | health_profiles separato da accounts | 2026-01-02 | GDPR - dati sensibili isolati |
| 2 | Mantenere merchant_users esistente | 2026-01-02 | Backward compatibility |
| 3 | Usare auth.uid() per RLS | 2026-01-02 | Integrazione nativa Supabase Auth |
| 4 | Loyalty tier automatico | 2026-01-02 | Trigger su totale punti |
| 5 | Referral code auto-generato | 2026-01-02 | MD5 hash 8 char |

---

## Problemi Riscontrati

| # | Problema | Soluzione | Data |
|---|----------|-----------|------|
| 1 | Context perso tra sessioni | Creata struttura docs/features/P5-unified-account/ | 2026-01-02 |

---

## Metriche

| Metrica | Valore | Target |
|---------|--------|--------|
| Tabelle create | 5 | 5 |
| Funzioni helper | 4 | 4 |
| Trigger | 5 | 5 |
| RLS Policies | 11 | 11 |
| Views | 2 | 2 |
| Account registrati | 0 | - |

