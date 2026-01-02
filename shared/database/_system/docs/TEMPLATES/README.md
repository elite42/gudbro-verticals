# SQL Templates

> **COPIA-INCOLLA** questi template per creare nuovi database.
> Sostituisci i placeholder `{cuisine}`, `{PREFIX}`, etc.

## File Disponibili

| File | Uso | Placeholder da sostituire |
|------|-----|---------------------------|
| `01-product-taxonomy-cuisine.sql` | Registrare cucina in taxonomy | `{cuisine}`, `{Display Name}`, `{emoji}` |
| `02-schema-cuisine.sql` | Creare tabella cucina | `{cuisine}`, categories, regions |
| `03-missing-ingredients.sql` | Aggiungere ingredienti | `{NAME}`, `{slug}`, `{category}` |
| `04-product-ingredients.sql` | Collegare prodotti-ingredienti | `{cuisine}`, `{PREFIX}`, product IDs |

## Ordine Esecuzione

```
1. 03-missing-ingredients.sql   → Aggiungere nuovi ingredienti
2. 02-schema-cuisine.sql        → Creare tabella
3. 01-product-taxonomy-cuisine.sql → Registrare in taxonomy
4. [data INSERT statements]     → Inserire dati
5. 04-product-ingredients.sql   → Collegare ingredienti
```

## Valori Standard per Cucine Nazionali

### product_taxonomy
```sql
menu_type: 'standalone'
service_type: 'food'
category: 'second_course'
is_alcoholic: false
is_hot_served: true
requires_cooking: true
```

### status validi
```sql
'active'    -- Piatto disponibile
'classic'   -- Classico tradizionale
'regional'  -- Specialità regionale
'seasonal'  -- Stagionale
```

### serving_temp validi
```sql
'hot'       -- Servito caldo
'warm'      -- Servito tiepido
'cold'      -- Servito freddo
'room_temp' -- Temperatura ambiente
```

### price_category validi
```sql
'budget'    -- Economico
'moderate'  -- Medio
'premium'   -- Premium
```

## Checklist Pre-Uso

- [ ] Letto PROCEDURE-NEW-DATABASE.md
- [ ] Verificato ingredienti in cache locale
- [ ] Scelto prefix unico (es: GER_, POR_, POL_)
- [ ] Definito categories e regions per la cucina

---

**Creato:** 2025-12-24
**Motivo:** Errori German (product_taxonomy) - necessità template esatti
