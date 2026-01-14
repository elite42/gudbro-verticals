# 🔄 IN PROGRESS

> Task attualmente in lavorazione.
> **Max 3 task** alla volta per focus.
> Quando completata → spostala in `3-TESTING.md` o `4-DONE.md`

**Last Updated:** 2026-01-15

---

| ID                | Feature             | Descrizione                  | Priority | Started    | Assignee |
| ----------------- | ------------------- | ---------------------------- | -------- | ---------- | -------- |
| AI-FIRST-REDESIGN | Backoffice AI-First | Sprint 1-5 DONE - COMPLETATO | P1       | 2026-01-14 | Claude   |

---

## Note Lavori in Corso

### AI-FIRST-REDESIGN

**Sprint 1 completato (2026-01-14):**

- AIPriorityCard, AIPrioritiesHero, OpportunityBanner esistenti
- Aggiunto Food Cost triggers (alert >35%, critical >45%)
- OpportunityBannerWrapper aggiunto a dashboard
- Weather + Food Cost integrati in AI Priorities

**Sprint 2 completato (2026-01-15):**

- Template 5 domande (situation, reason, impact, aiSuggestion, actions)
- Interface AIPriority estesa con nuovi campi
- AIPriorityCard UI aggiornata per mostrare 5 campi
- Tutti i trigger in AIPrioritiesHero usano nuovo template
- Nuovo componente AIInlineTrigger per trigger contestuali
- AIInlineTrigger aggiunto a /food-cost page

**Sprint 3 completato (2026-01-15):**

- Confidence Score 3 livelli (Alta/Media/Bassa con emoji)
- Spiegazioni on-demand ("Perché?") con dataPoints
- Feedback buttons (thumbs up/down)
- AI ammette errori (previousError con learningNote)
- Low confidence warning (AI ammette "non so")
- Linguaggio humanizzato (Ti consiglio, Migliorerò, etc.)

**Sprint 4 completato (2026-01-15):**

- Hook `useIsMobile()` per detection viewport
- `MobileDecisionCard` ottimizzato per tap
- `MobileCommandCenter` con header brand/time/temp
- Max 2 decisioni con bottoni grandi (APPLICA/IGNORA)
- Stato "Tutto OK" quando nessuna decisione
- Dashboard mostra mobile view su viewport <768px

**Sprint 5 completato (2026-01-15):**

- `lib/ai/scenario-detection.ts` con 5 scenari madre
- `ScenarioBanner` espandibile con azioni suggerite
- `ScenarioChip` per mobile (versione compatta)
- Detection basata su: meteo, food cost, ora/giorno, traffico
- Integrato in AIPrioritiesHero e MobileCommandCenter

**FEATURE COMPLETATA!** Tutti i 5 sprint sono stati implementati.

**Prossimi passi:**

- Test iterativi con Atlas
- KPI tracking (AI Action Rate, Decision Time)
- Possibile spostamento in DONE
