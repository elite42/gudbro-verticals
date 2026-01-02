# Dish Type Reference

> Sistema di classificazione universale per tutti i piatti

---

## Scopo

Il campo `dish_type` permette di classificare ogni piatto con un tipo universale, indipendentemente dalla cucina di origine:
- Query cross-cuisine: "tutti gli antipasti"
- Menu builder automatico
- Suggerimenti AI
- Analytics per tipo di piatto

---

## Schema

```sql
ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS dish_type TEXT;
CREATE INDEX IF NOT EXISTS idx_{table_name}_dish_type ON {table_name}(dish_type);
```

---

## Valori Validi (20)

| dish_type | Descrizione | Esempi |
|-----------|-------------|--------|
| `appetizer` | Antipasti, tapas, starters | Bruschetta, Hummus |
| `main` | Piatti principali, secondi | Tagine, Coq au Vin |
| `side` | Contorni | Patate, Verdure |
| `soup` | Zuppe, brodi, stews | Ramen, Harira, Pho |
| `salad` | Insalate | Caesar, Tabbouleh |
| `bread` | Pane, focacce | Naan, Lavash |
| `sauce` | Salse, condimenti | Pesto, Chimichurri |
| `dessert` | Dolci, pasticceria | Tiramisu, Baklava |
| `rice` | Piatti a base di riso | Paella, Risotto, Biryani |
| `pasta` | Piatti a base di pasta | Carbonara, Pad Thai |
| `pizza` | Pizze | Margherita, Calzone |
| `sandwich` | Panini, burgers, wraps | Burger, Banh Mi |
| `grill` | Grigliate, BBQ, steaks | Yakitori, Asado |
| `dumpling` | Ravioli, gyoza, dim sum | Khinkali, Gyoza |
| `egg` | Piatti a base di uova | Shakshuka |
| `breakfast` | Colazione | Eggs Benedict |
| `fried` | Fritti | Tempura, Arancini |
| `seafood` | Frutti di mare | Bouillabaisse |
| `cheese` | Formaggi, fondute | Fondue, Raclette |
| `cured` | Salumi, affettati | Jamón, Bresaola |

---

## Assegnazione per Tabella

```sql
-- Tabelle con nome = tipo piatto
UPDATE appetizers SET dish_type = 'appetizer';
UPDATE desserts SET dish_type = 'dessert';
UPDATE soups SET dish_type = 'soup';
UPDATE pasta SET dish_type = 'pasta';
UPDATE pizzas SET dish_type = 'pizza';
UPDATE steaks SET dish_type = 'grill';
UPDATE dumplings SET dish_type = 'dumpling';
```

```sql
-- Cucine nazionali (mappare category)
UPDATE french SET dish_type = CASE category
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'main' THEN 'main'
  WHEN 'seafood' THEN 'seafood'
  WHEN 'sauce' THEN 'sauce'
  WHEN 'pastry' THEN 'dessert'
  ELSE 'main'
END;
```

---

## Query Cross-Cuisine

```sql
-- Tutti gli antipasti di tutte le cucine
SELECT * FROM moroccan WHERE dish_type = 'appetizer'
UNION ALL
SELECT * FROM french WHERE dish_type = 'appetizer'
UNION ALL
SELECT * FROM spanish WHERE dish_type = 'appetizer';

-- Piatti grill argentini
SELECT * FROM steaks
WHERE dish_type = 'grill'
AND origin->>'country_code' = 'AR';
```

---

**File:** `docs/STANDARDS/05-dish-type.md`
