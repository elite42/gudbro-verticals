# Onboarding - Executive Summary

> Wizard guidato per setup account e feature education.

---

## Cosa Fa

Onboarding fornisce un **wizard multi-step** per la creazione account (Organization → Brand → Location) e **onboarding feature-specific** educativo (es. Food Cost). Include **AI conversational support** che guida il merchant attraverso il setup con domande one-at-a-time e spiega il valore di ogni campo.

---

## Perche E' Importante

| Impatto              | Descrizione                                |
| -------------------- | ------------------------------------------ |
| **Time-to-Value**    | Merchant operativo in 5 minuti             |
| **Completion Rate**  | Wizard guidato aumenta completamento       |
| **Feature Adoption** | Education onboarding spiega valore         |
| **Data Quality**     | Campi obbligatori assicurano dati completi |
| **Self-Service**     | Riduce support tickets per setup           |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                    |
| -------------- | ----------- | --------------------------------------- |
| Funzionalita   | ✅ 90%      | Account + Food Cost onboarding completi |
| Test Coverage  | ~50%        | Test per onboarding-service             |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md                      |
| Database       | ✅ 100%     | Integrato con org/brand/location        |

---

## Funzionalita Chiave

### 1. Account Onboarding (5 Step)

| Step             | Contenuto                                                                |
| ---------------- | ------------------------------------------------------------------------ |
| **Account Type** | Standard (free, 10 locations) vs Enterprise                              |
| **Organization** | Nome, country → auto-popola currency, language, timezone                 |
| **Brand**        | Business type (Restaurant, Hotel, Rental, Wellness, Other), nome, colori |
| **Location**     | Nome, indirizzo, citta, telefono, email, lingue clienti                  |
| **Review**       | Conferma dati prima di creare account                                    |

### 2. Business Types

| Tipo            | Icon |
| --------------- | ---- |
| Restaurant/Cafe | 🍽️   |
| Hotel           | 🏨   |
| Rental Property | 🏠   |
| Wellness/Spa    | 💆   |
| Other           | 🏢   |

### 3. Food Cost Onboarding (5 Step)

| Step              | Contenuto                                           |
| ----------------- | --------------------------------------------------- |
| **Benvenuto**     | Value props (5 min setup, real margins)             |
| **Perche conta**  | Education: food cost ideale, prime cost, BCG matrix |
| **I tuoi piatti** | Inserisci min 5 piatti con prezzi                   |
| **Ingredienti**   | Costo/kg e quantita per piatto                      |
| **Risultati**     | BCG analysis, Star/Dog identification               |

### 4. AI Conversational Support

- **Sistema prompt dinamico** che si aggiorna con progress
- **One question at a time** approach
- **Field priority**: Critical → Important → Optional
- **Tool definitions** per OpenAI function calling:
  - update_organization_info
  - update_brand_info
  - update_location_info
  - check_onboarding_progress

### 5. Progress Tracking

- **localStorage** per UI state (dismissed, completed steps)
- **API endpoint** per real-time progress
- **Completion percentage** calcolato da missing fields
- **OnboardingChecklist** component riutilizzabile

### 6. Gamification (Limitata)

| Elemento            | Presente       |
| ------------------- | -------------- |
| Progress bars       | ✅             |
| Step checkmarks     | ✅             |
| Color progression   | ✅             |
| Trophy icon         | ✅ (Food Cost) |
| Star emoji dishes   | ✅ (Food Cost) |
| Celebration message | ✅             |
| Points/Badges       | ❌             |
| Leaderboards        | ❌             |

---

## Metriche Chiave

| Metrica                | Valore |
| ---------------------- | ------ |
| Account wizard steps   | 5      |
| Food Cost wizard steps | 5      |
| Business types         | 5      |
| Field priority levels  | 3      |
| AI tools               | 4      |
| Total onboarding LOC   | ~3,500 |

---

## Competitivita

| Aspetto                     | GUDBRO     | Toast | Square | Lightspeed |
| --------------------------- | ---------- | ----- | ------ | ---------- |
| Wizard multi-step           | ✅         | ✅    | ✅     | ✅         |
| Feature-specific onboarding | ✅         | ❌    | ❌     | 🟡         |
| AI conversational setup     | ✅         | ❌    | ❌     | ❌         |
| BCG education               | ✅         | ❌    | ❌     | ❌         |
| Progress persistence        | ✅         | 🟡    | 🟡     | 🟡         |
| Multi-language              | ✅ (IT/EN) | 🟡    | 🟡     | 🟡         |

---

## Roadmap

### Completato

- [x] Account wizard (5 step)
- [x] Food Cost onboarding (5 step educativo)
- [x] API integration (CRUD + status)
- [x] AI service layer
- [x] OnboardingChecklist component
- [x] Progress tracking (localStorage + API)
- [x] Validation gates per step
- [x] Mobile responsive

### Planned

- [ ] Gamification avanzata (points, badges)
- [ ] Altri feature-specific onboarding (es. Marketing, Team)
- [ ] Video tutorials embedded
- [ ] Onboarding analytics (drop-off tracking)

---

## Rischi & Mitigazioni

| Rischio                    | Probabilita | Impatto | Mitigazione                         |
| -------------------------- | ----------- | ------- | ----------------------------------- |
| Drop-off mid-wizard        | Media       | Alto    | Progress saving + email reminder    |
| Food Cost too complex      | Bassa       | Medio   | Education step spiega valore        |
| Gamification insufficiente | Media       | Basso   | Visual feedback sufficiente per MVP |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                            | Scopo                      |
| ----------------------------------------------- | -------------------------- |
| `app/(onboarding)/onboarding/page.tsx`          | Account wizard (795 LOC)   |
| `app/(dashboard)/food-cost/onboarding/page.tsx` | Food Cost wizard (991 LOC) |
| `lib/ai/onboarding-service.ts`                  | AI service (869 LOC)       |
| `app/api/ai/onboarding/route.ts`                | API endpoints              |
| `components/onboarding/OnboardingChecklist.tsx` | Checklist component        |

---

_Ultimo aggiornamento: 2026-01-14_
