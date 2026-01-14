# GUDBRO Features Documentation

> Index di tutte le 15 aree funzionali del backoffice GUDBRO

**Last Updated:** 2026-01-14

---

## Features Status Matrix

| #   | Feature                             | Funzionalita | Test  | EXEC | USER                          | DEV                          |
| --- | ----------------------------------- | ------------ | ----- | ---- | ----------------------------- | ---------------------------- |
| 1   | [QR Codes](./qr-codes/)             | ✅           | ✅ 9% | ❌   | ❌                            | ❌                           |
| 2   | [Food Cost](./food-cost/)           | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 3   | [AI Co-Manager](./ai-co-manager/)   | ✅           | ❌    | ❌   | [✅](./ai-co-manager/USER.md) | [✅](./ai-co-manager/DEV.md) |
| 4   | [Orders/KDS](./orders/)             | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 5   | [Marketing](./marketing/)           | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 6   | [Customers](./customers/)           | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 7   | [Team](./team/)                     | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 8   | [Content](./content/)               | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 9   | [Translations](./translations/)     | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 10  | [Settings](./settings/)             | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 11  | [Analytics](./analytics/)           | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 12  | [Partnerships B2B](./partnerships/) | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 13  | [Onboarding](./onboarding/)         | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 14  | [Hot Actions](./hot-actions/)       | ✅           | ❌    | ❌   | ❌                            | ❌                           |
| 15  | [Platform](./platform/)             | ✅           | ❌    | ❌   | ❌                            | ❌                           |

**Legenda:**

- ✅ = Completo
- 🟡 = Parziale
- ❌ = Mancante
- % = Test coverage

---

## Summary

| Metrica             | Valore   |
| ------------------- | -------- |
| Features totali     | 15       |
| Con test            | 1 (6.7%) |
| Con EXECUTIVE.md    | 0 (0%)   |
| Con USER.md         | 1 (6.7%) |
| Con DEV.md          | 1 (6.7%) |
| **Completezza doc** | **~2%**  |

---

## Priority per Documentazione

Ordine consigliato per documentare (business impact):

| Priorita | Feature          | Perche                        |
| -------- | ---------------- | ----------------------------- |
| P1       | QR Codes         | Revenue-critical, gia testato |
| P1       | Food Cost        | Core differentiator           |
| P1       | AI Co-Manager    | Gia documentato parzialmente  |
| P2       | Orders/KDS       | Operationally critical        |
| P2       | Marketing        | Revenue generation            |
| P2       | Customers        | CRM, retention                |
| P3       | Team             | Staff management              |
| P3       | Content          | Menu management               |
| P3       | Translations     | Internazionalizzazione        |
| P3       | Settings         | Configurazione                |
| P4       | Analytics        | Reporting                     |
| P4       | Partnerships B2B | Nuovo, meno urgente           |
| P4       | Onboarding       | First-time experience         |
| P4       | Hot Actions      | Quick actions                 |
| P4       | Platform         | Internal only                 |

---

## Quick Navigation

### Per Imprenditore

- [Template EXECUTIVE.md](./_template/EXECUTIVE.md) - Come leggere i riepiloghi
- [QA Overview](../qa/README.md) - Sistema qualita

### Per Sviluppatori

- [AI Co-Manager - Dev Docs](./ai-co-manager/DEV.md)
- [Template DEV.md](./_template/DEV.md)
- [Development Workflow](../DEVELOPMENT-WORKFLOW.md)
- [Database Schema](../DATABASE-SCHEMA.md)

### Per Utenti

- [AI Co-Manager - User Guide](./ai-co-manager/USER.md)
- [Template USER.md](./_template/USER.md)

---

## Come Documentare una Feature

1. **Crea cartella:** `docs/features/[feature-name]/`
2. **Copia template:**
   ```bash
   cp docs/features/_template/* docs/features/[feature-name]/
   ```
3. **Compila in ordine:**
   - `EXECUTIVE.md` - Prima (overview per imprenditore)
   - `USER.md` - Poi (guida utente)
   - `DEV.md` - Infine (dettagli tecnici)
4. **Aggiorna questa tabella** con i link

---

## Documentation Status Legend

| Status | Meaning                  |
| ------ | ------------------------ |
| ✅     | Completo e aggiornato    |
| 🟡     | Parziale o da aggiornare |
| ❌     | Mancante                 |
| TODO   | Da creare                |

---

## Related

- [QA System](../qa/README.md) - Overview sistema qualita
- [Coverage Report](../qa/COVERAGE-REPORT.md) - Stato test
- [Feature Audit Template](../qa/templates/feature-audit.md) - Per audit singola feature

---

_Ultimo aggiornamento: 2026-01-14_
