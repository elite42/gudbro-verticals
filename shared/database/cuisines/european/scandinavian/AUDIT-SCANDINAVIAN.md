# Audit: Scandinavian Database Creation

> **Data:** 2025-12-24
> **Risultato finale:** SUCCESSO (78 piatti, 496 links, 12 ingredienti)
> **Tempo totale stimato:** ~2-3 ore (doveva essere ~30-45 min)
> **Efficienza:** ~25-30% (troppi errori evitabili)

---

## Riepilogo Errori

| # | Errore | Causa | Tempo perso | Evitabile? |
|---|--------|-------|-------------|------------|
| 1 | `ON CONFLICT (product_type)` fallito | Non usato template WHERE NOT EXISTS | ~10 min | ✅ Sì |
| 2 | FK violation ING_REINDEER | Cache non verificata correttamente | ~15 min | ✅ Sì |
| 3 | ENUM `'produce'` non valido | Non verificato categorie ENUM reali | ~15 min | ✅ Sì |
| 4 | ING_JUNIPER_BERRIES già esisteva | Non verificato DB prima di creare | ~5 min | ✅ Sì |
| 5 | ING_SWEDE già esisteva (=rutabaga) | Non verificato sinonimi | ~5 min | ✅ Sì |
| 6 | Script 01 duplicato (01b creato) | Primo run parzialmente riuscito | ~10 min | ✅ Sì |
| 7 | 5 ingredienti mancanti scoperti dopo | Verifica ingredienti incompleta | ~20 min | ✅ Sì |

**Totale tempo perso per errori:** ~80 minuti

---

## Analisi Dettagliata

### Errore 1: ON CONFLICT senza UNIQUE constraint

**Cosa è successo:**
```sql
-- Script 02 usava:
INSERT INTO product_taxonomy (...)
ON CONFLICT (product_type) DO UPDATE SET...

-- Errore: product_type non ha UNIQUE constraint
```

**Procedura violata:**
- LESSONS-LEARNED #10: "Usare INSERT...WHERE NOT EXISTS"
- Template `01-product-taxonomy-cuisine.sql` non consultato

**Azione correttiva:** Usato pattern WHERE NOT EXISTS

---

### Errore 2-7: Verifica ingredienti fallita

**Cosa è successo:**
1. Ho dichiarato "9 ingredienti mancanti" ma ne mancavano 12
2. Ho usato categoria `'produce'` invece di `'fruits'`/`'vegetables'`
3. ING_JUNIPER_BERRY e ING_RUTABAGA esistevano già con nomi diversi
4. Script 01 eseguito parzialmente, richiesto script 01b

**Procedura violata:**
- LESSONS-LEARNED #25: "Verificare TUTTI gli ingredient_id PRIMA di eseguire script 04"
- LESSONS-LEARNED #47: "SEMPRE usare cache locale PRIMA di chiamate API"
- LESSONS-LEARNED #56: "Verificare SCHEMA ingredienti prima di scrivere script 01"

**Root cause:**
Ho fatto assunzioni invece di query precise. Non ho verificato:
1. Quali ingredienti esistevano già nel DB (query batch)
2. Quali categorie ENUM sono valide (query)
3. Se esistevano sinonimi (ING_SWEDE = rutabaga)

---

## Procedure NON Seguite

| Step Procedura | Cosa dovevo fare | Cosa ho fatto |
|----------------|------------------|---------------|
| Step 4.1 | Verificare cache locale FIRST | ✅ Fatto |
| Step 4.2 | Verificare schema DB per nuovi ingredienti | ❌ Saltato |
| Step 5 | Usare TEMPLATES copia-incolla | ❌ Parziale |
| Pre-script 04 | Verificare TUTTI gli ING_* nel DB | ❌ Fatto male |

---

## Cosa Ha Funzionato

1. **Struttura file corretta** - types.ts, data/, scripts/ creati
2. **78 piatti** - tutti inseriti correttamente
3. **496 links** - product_ingredients completo
4. **Documentazione aggiornata** - DATABASE-INVENTORY.md

---

## Nuove Lezioni Apprese

### #58 - Verifica ingredienti: query BATCH, non assunzioni

```bash
# PRIMA di scrivere script 01, fare UNA query batch:
INGREDIENTS="ING_A,ING_B,ING_C,..."
curl -s "$URL/ingredients?id=in.($INGREDIENTS)&select=id" \
  -H "apikey: $KEY" | python3 -c "
import json,sys
found = {i['id'] for i in json.load(sys.stdin)}
needed = '$INGREDIENTS'.split(',')
missing = [i for i in needed if i not in found]
print(f'Missing: {missing}')
"
```

### #59 - Verificare ENUM categories prima di script ingredienti

```bash
# Query per vedere categorie valide:
curl -s "$URL/ingredients?select=category&limit=500" -H "apikey: $KEY" | \
  python3 -c "import json,sys; print(set(i['category'] for i in json.load(sys.stdin)))"
```

### #60 - Cercare sinonimi per ingredienti regionali

Prima di creare ING_RUTABAGA, verificare:
```bash
curl -s "$URL/ingredients?name=ilike.*swede*&select=id,name" -H "apikey: $KEY"
curl -s "$URL/ingredients?name=ilike.*turnip*&select=id,name" -H "apikey: $KEY"
```

---

## Checklist Pre-Import (AGGIORNATA)

```
PRIMA di eseguire qualsiasi script:

[ ] 1. Leggere PROCEDURE-NEW-DATABASE.md
[ ] 2. Consultare database recente come template

PRIMA di script 01 (ingredienti):
[ ] 3. Estrarre tutti ING_* dai data files
[ ] 4. Query BATCH al DB per verificare esistenti
[ ] 5. Query categorie ENUM valide
[ ] 6. Cercare sinonimi per ingredienti regionali
[ ] 7. Verificare schema ingredienti (allergens JSONB, dietary JSONB)

PRIMA di script 02 (schema):
[ ] 8. Usare template WHERE NOT EXISTS per product_taxonomy
[ ] 9. Verificare category: 'second_course' per cucine

PRIMA di script 04 (links):
[ ] 10. Verificare TUTTI gli ING_* esistono (script01 + DB)
```

---

## Metriche Finali

| Metrica | Valore |
|---------|--------|
| Piatti creati | 78 |
| Links creati | 496 |
| Ingredienti aggiunti | 12 |
| Script eseguiti | 5 (01, 01b, 02, 03, 04) |
| Errori totali | 7 |
| Errori evitabili | 7 (100%) |
| Tempo stimato | 30-45 min |
| Tempo reale | ~2-3 ore |
| Efficienza | ~25% |

---

## Raccomandazioni

1. **SEMPRE fare query batch** per verificare ingredienti esistenti
2. **MAI assumere categorie ENUM** - verificare sempre
3. **Cercare sinonimi** per ingredienti regionali (swede/rutabaga, scallion/spring onion)
4. **Usare script di pre-flight check** automatizzato
5. **Aggiungere lezioni #58-60** a LESSONS-LEARNED.md

---

**File:** `AUDIT-SCANDINAVIAN.md`
**Created:** 2025-12-24
