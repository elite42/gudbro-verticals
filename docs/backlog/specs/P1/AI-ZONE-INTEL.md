# AI-ZONE-INTEL - Zone Intelligence & Customer Intelligence

**Priority:** P1 - Alta Priorità
**Status:** ✅ Phase 1-4 COMPLETATO (2026-01-12)
**Effort:** High (completato)

---

## Vision

Il Co-Manager conosce la zona meglio del manager. Analizza clienti, territorio, e crea strategie di fidelizzazione impossibili per un umano.

## Perché è una killer feature

| Manager Umano Vede   | Co-Manager Vede                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------- |
| "Marco viene spesso" | Marco vive a 300m, lavora a 500m, viene 3x/sett, spesa media €8.50, potenziale +€40/mese |
| "Zona tranquilla"    | 3 uffici (850 dipendenti), 2 scuole (1200 studenti), 1 palestra, flusso 8-9 e 17-19      |
| "Pochi delivery"     | 73% clienti entro 500m → potenziale dine-in, non delivery                                |

**Un umano non può fare questi calcoli su 500+ clienti. L'AI sì.**

---

## Completato

- ✅ Migration 045: 5 tabelle AI (customer_intelligence, zone_profiles, merchant_knowledge, customer_triggers, trigger_executions)
- ✅ 8 funzioni PostgreSQL
- ✅ 2 views
- ✅ RLS completo
- ✅ customer-intelligence-service.ts
- ✅ trigger-engine-service.ts
- ✅ /api/ai/customer-intelligence
- ✅ /api/ai/triggers
- ✅ UI: /customers/intelligence, /ai/triggers

---

## Limitazioni Attuali (da risolvere)

| Limitazione                  | Descrizione                                                                        | Impatto                                           |
| ---------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Dati AI-Generated**        | Zone analysis, competitors, market pricing sono generati da OpenAI, NON dati reali | Manager potrebbe aspettarsi dati Google Maps/Yelp |
| **No Real-Time Market Data** | Prezzi competitor e POI sono stime AI, non prezzi effettivi                        | Decisioni basate su dati approssimativi           |
| **No Google Places API**     | POI e competitor scoperti via AI, non API strutturate                              | Meno accuratezza su nomi/indirizzi reali          |
| **Pedestrian Flows Stimati** | Flussi pedonali sono ipotesi AI basate su tipo zona                                | Non misurati realmente                            |

## Roadmap per risolvere

| Fase | Feature                                      | Effort | Valore                           |
| ---- | -------------------------------------------- | ------ | -------------------------------- |
| F1   | Google Places API integration                | High   | Competitor reali con nomi/rating |
| F2   | Real-time pricing (Deliveroo/Glovo scraping) | High   | Prezzi competitor aggiornati     |
| F3   | External data enrichment                     | Medium | Dati demografici, traffic        |
| F4   | Foot traffic analytics                       | High   | Misurazioni reali flussi         |

---

## Files

- Migration: `shared/database/migrations/schema/045-ai-zone-intel.sql`
- Services: `apps/backoffice/lib/ai/customer-intelligence-service.ts`, `trigger-engine-service.ts`
- API: `/api/ai/customer-intelligence`, `/api/ai/triggers`
- UI: `/customers/intelligence`, `/ai/triggers`

---

**Related:** TOURISM-B2B, AI-FIRST-REDESIGN
