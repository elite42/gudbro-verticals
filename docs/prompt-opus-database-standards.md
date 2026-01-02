# Prompt per Claude Opus Browser

---

Crea delle **linee guida complete e definitive** per la gestione del database centralizzato food & bevande di GUDBRO.

Queste linee guida saranno usate da Claude Code ogni volta che si crea o modifica un database. Il documento deve essere salvato come `DATABASE-STANDARDS.md` in `shared/database/`.

## Cosa Includere

1. **Naming Conventions** - ID, slug, nomi, prefissi per categoria
2. **Schema Database Standard** - Campi obbligatori, tipi dato, constraints
3. **Regole sui Dati** - null vs default, arrays, boolean, scale numeriche, pesi metrici
4. **Gestione Ingredienti** - ingredient_ids, validazione, ordine
5. **Sistema 5 Dimensioni** - allergens, dietary flags, nutrition, spice_level
6. **Lingua e Traduzioni** - solo inglese, nomi propri, tabella translations
7. **SQL Best Practices** - ENUM, indexes GIN, RLS, triggers
8. **Struttura File/Cartelle** - types.ts, data/, schema/, scripts/
9. **Checklist Obbligatorie** - pre, durante, post creazione
10. **Errori Comuni** - lista errori da evitare
11. **Versionamento** - migrazioni, changelog
12. **Edge Cases** - stagionali, varianti, combo, personalizzabili

## Output

Documento markdown completo con:
- Versione v1.0
- Regole chiare e non ambigue
- Esempi (✅ corretto, ❌ sbagliato)
- Tabelle
- Checklist con checkbox

Preferisco regole strict. Il documento deve essere autosufficiente - chiunque lo legga deve poter creare un nuovo database senza chiarimenti.
