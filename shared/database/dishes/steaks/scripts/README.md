# Steaks Database - Scripts

## Ordine di Esecuzione

Esegui in Supabase SQL Editor in questo ordine:

### 1. Ingredienti Mancanti (se non già fatto)
```
steaks-missing-ingredients.sql
```
Aggiunge 62 nuovi ingredienti per carni, spezie, condimenti.

### 2. Schema e Dati Steaks
```
steaks-complete-import.sql
```
Crea tabella + inserisce 55 piatti.

### 3. Links Product-Ingredients
```
steaks-product-ingredients.sql
```
Crea ~270 links tra piatti e ingredienti.

## Verifica

```sql
-- Conta piatti
SELECT COUNT(*) FROM steaks;  -- 55

-- Conta nuovi ingredienti
SELECT COUNT(*) FROM ingredients WHERE id LIKE 'ING_BEEF%' OR id LIKE 'ING_LAMB%';

-- Conta links
SELECT COUNT(*) FROM product_ingredients WHERE product_type = 'steaks';  -- ~270
```

## File

| File | Descrizione |
|------|-------------|
| `steaks-complete-import.sql` | Schema v3.0 (TEXT+CHECK) + 55 piatti |
| `steaks-missing-ingredients.sql` | 62 ingredienti per steaks |
| `steaks-product-ingredients.sql` | Links junction table |
| `generate-import-sql.py` | Script generazione (legacy) |
| `import-to-supabase.py` | Import diretto (legacy) |

## Statistiche Database

### Per Categoria (5)
| Categoria | Piatti |
|-----------|--------|
| beef_steak | 22 |
| international_grill | 9 |
| ribs_bbq | 8 |
| poultry_grill | 6 |
| lamb_game | 5 |

### Per Cucina (18 stili)
- American (15), Italian (11), French (9)
- Turkish (5), Korean (5), Brazilian (5), Argentinian (5)
- British (4), Spanish (3), Portuguese (3), Persian (3)
- Middle Eastern (3), Japanese (3), Jamaican (3), Indian (3), German (3)
- International (3), Australian (1)

### Per Paese di Origine
- United States (12), Italy (7), France (4)
- + 15 altri paesi

### Tagli di Carne (32 tipi)
- Beef: ribeye, filet_mignon, strip, t_bone, porterhouse, tomahawk, etc.
- Lamb: rack, chops, shank, leg
- Pork: baby_back_ribs, spare_ribs, knuckle
- Poultry: whole_chicken, spatchcock, chicken_pieces
- Veal: cutlet, shank

## Note Tecniche

- Schema v3.0 usa TEXT + CHECK invece di ENUM (DATABASE-STANDARDS v1.1)
- Sistema 5 Dimensioni completo (allergens, dietary, nutrition, spice)
- RLS abilitato con policy pubblica per SELECT
