# 🔄 IN PROGRESS

> Task attualmente in lavorazione.
> **Max 3 task** alla volta per focus.
> Quando completata → spostala in `3-TESTING.md` o `4-DONE.md`

**Last Updated:** 2026-01-07

---

| ID                   | Feature                | Descrizione                  | Priority | Started    | Assignee |
| -------------------- | ---------------------- | ---------------------------- | -------- | ---------- | -------- |
| ING-TRANSLATIONS-ALL | Traduzioni Ingredienti | 2551 ingredienti × 14 lingue | P1       | 2026-01-06 | Claude   |

---

## Note Lavori in Corso

### ING-TRANSLATIONS-ALL - Traduzioni Complete Ingredienti

**Obiettivo:** 2551 ingredienti × 14 lingue = 35,714 traduzioni totali

**Lingue Target:**

- **Fase 1 (COMPLETATA):** it, es, fr, de, pt (5 lingue europee)
- **Fase 2 (IN CORSO):** vi, zh, ja, ko, th, ru, tr, hi, ar (9 lingue Asia/Middle East)

**Stato Attuale (2026-01-07):**

| Lingua | Nome        | Traduzioni | Copertura | Status      |
| ------ | ----------- | ---------- | --------- | ----------- |
| it     | Italiano    | 2541       | 99.6%     | ✅ COMPLETO |
| es     | Spagnolo    | 2544       | 99.7%     | ✅ COMPLETO |
| fr     | Francese    | 2541       | 99.6%     | ✅ COMPLETO |
| de     | Tedesco     | 2540       | 99.6%     | ✅ COMPLETO |
| pt     | Portoghese  | 2540       | 99.6%     | ✅ COMPLETO |
| tr     | Turco       | 289        | 11.3%     | 🔄 In corso |
| vi     | Vietnamita  | 277        | 10.9%     | 🔄 In corso |
| zh     | Cinese      | 277        | 10.9%     | 🔄 In corso |
| ja     | Giapponese  | 277        | 10.9%     | 🔄 In corso |
| ko     | Coreano     | 277        | 10.9%     | 🔄 In corso |
| th     | Thailandese | 277        | 10.9%     | 🔄 In corso |
| ru     | Russo       | 277        | 10.9%     | 🔄 In corso |
| hi     | Hindi       | 150        | 5.9%      | 🔄 In corso |
| ar     | Arabo       | 150        | 5.9%      | 🔄 In corso |

**Progresso Fase 2:** ~2,251 / 22,959 (≈10%)

**Come riprendere:**

```sql
-- 1. Verifica stato attuale
SELECT locale, COUNT(*) FROM translations
WHERE entity_type = 'ingredient'
GROUP BY locale ORDER BY count DESC;

-- 2. Prossimi ingredienti (OFFSET 150)
SELECT id, name FROM ingredients ORDER BY id LIMIT 50 OFFSET 150;

-- 3. Pattern INSERT (50 ing × 9 lang = 450 righe per batch)
INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by)
VALUES ('ingredient', 'ING_XXX', 'name', 'vi', 'traduzione', false, 'openai-gpt4o-mini'), ...
ON CONFLICT DO NOTHING;
```

**Decisioni prese:**

- ❌ Escluso: nl (olandese) - parlano tutti inglese
- ✅ Aggiunto: hi (hindi) - forte turismo indiano in Asia
- ✅ Aggiunto: ar (arabo) - arabi viaggiano molto
