# Validation Checklist

> **Checklist obbligatorie per import database GUDBRO**
>
> **Ultimo aggiornamento:** 2025-12-20

---

## Pre-Import Validation

```
PRIMA di eseguire l'import SQL:

[ ] 1. CONTA RECORDS NEL FILE SORGENTE (TypeScript)
      grep -c "id: '" shared/database/{nome}/data/*.ts
      Risultato: ___ records

[ ] 2. CONTA RECORDS NEL FILE SQL
      grep -c "^('{PREFIX}_" scripts/{nome}-complete-import.sql
      Risultato: ___ records

[ ] 3. I DUE NUMERI CORRISPONDONO?
      [ ] SÌ → Procedi
      [ ] NO → STOP! Investiga
```

---

## Pre-Flight Checks (OBBLIGATORI)

```
PRIMA di ogni script SQL:

[ ] Script 01 (ingredients):
    [ ] Formato JSONB per allergens, intolerances, dietary
    [ ] Categorie valide (query: SELECT DISTINCT category FROM ingredients)
    [ ] Nessun slug duplicato
    [ ] ON CONFLICT DO NOTHING (senza colonna!)

[ ] Script 02 (schema):
    [ ] product_taxonomy: usare INSERT...WHERE NOT EXISTS
    [ ] menu_type: 'standalone' per cucine etniche
    [ ] service_type: 'food' per cucine etniche
    [ ] category: 'second_course' per cucine etniche

[ ] Script 03 (data):
    [ ] Colonne corrispondono alla tabella
    [ ] Valori CHECK corretti

[ ] Script 04 (product_ingredients):
    [ ] TUTTI gli ingredient_id esistono nel DB
    [ ] Usa role/is_optional (NON is_primary/is_essential)
    [ ] Se fai DELETE prima, NON usare ON CONFLICT
```

---

## Post-Import Validation

```
DOPO aver eseguito l'import:

[ ] 4. CONTA RECORDS IN SUPABASE
      SELECT COUNT(*) FROM {table_name};
      Risultato: ___ records

[ ] 5. IL COUNT CORRISPONDE AL FILE SQL?
      File SQL: ___ records
      Supabase: ___ records
      [ ] SÌ → Procedi
      [ ] NO → STOP! Investiga

[ ] 6. SAMPLE CHECK
      SELECT id, name, category FROM {table} ORDER BY RANDOM() LIMIT 5;
      [ ] Dati corretti
```

---

## Documentation Update (OBBLIGATORIO!)

> **REGOLA FERREA:** Non considerare un database "completato" finché TUTTI questi file non sono aggiornati!

```
SOLO dopo validazione completata:

[ ] 7. AGGIORNA DATABASE-INVENTORY.md
      Formato: "{Database}: XX records (verified YYYY-MM-DD)"

[ ] 8. AGGIORNA BACKLOG.md
      [ ] Sposta database da "Da Fare" a "Completati"
      [ ] Aggiorna statistiche (totale database, records)
      [ ] Aggiorna "Last Updated" in cima al file

[ ] 9. AGGIORNA CLAUDE.md sezione "Sessione Corrente"

[ ] 10. TIMESTAMP DI VERIFICA
       Data: ____________
       Verificato da: ____________
```

**MOTIVO:** Se il BACKLOG non viene aggiornato, nelle sessioni successive si perde traccia di cosa è stato fatto e si rischia di duplicare lavoro o dimenticare task.

---

## Quick Validation Script

```bash
#!/bin/bash
# validate-db-counts.sh

KEY="your-service-role-key"
URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"

for table in cocktails wines pasta coffee tea steaks seafood pizzas; do
  count=$(curl -s "${URL}/${table}?select=id" \
    -H "apikey: ${KEY}" \
    -H "Authorization: Bearer ${KEY}" | \
    python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null)
  printf "%-15s | %5s records\n" "$table" "$count"
done
```

---

**File:** `shared/database/docs/VALIDATION-CHECKLIST.md`
