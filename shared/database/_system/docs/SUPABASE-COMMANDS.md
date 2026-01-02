# Supabase Commands Reference

> **Comandi testati e funzionanti per interagire con Supabase REST API**
>
> **Ultimo aggiornamento:** 2025-12-20

---

## Credenziali

```bash
# URL CORRETTO - nota "ezrz" nel mezzo!
URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW9uZWJidWV6cnp2amVrcXhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM1NDA0OSwiZXhwIjoyMDc5OTMwMDQ5fQ.tVvhJiYaSTYoKRPXDCV6Q2-jr5w2oMM-oOJ_VxtlgPI"
```

---

## Script Utility (RACCOMANDATO)

```bash
# Contare records in una tabella
./scripts/supabase-check.sh indian
# Output: indian: 65 records

# Contare links in product_ingredients
./scripts/supabase-check.sh --links indian
# Output: Product_ingredients links for indian: 705

# Contare ingredienti totali (con paginazione)
./scripts/supabase-check.sh --ingredients
# Output: Total ingredients: 1845

# Report completo di tutte le tabelle
./scripts/supabase-check.sh --all
```

---

## Pattern Bash Manuali

### Contare Records

```bash
# Pattern base - SEMPRE usare python3 per JSON
KEY="eyJ..."
URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"

curl -s "$URL/indian?select=id" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```

### Contare con Limite (tabelle grandi)

```bash
curl -s "$URL/ingredients?select=id&limit=2000" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```

### Contare product_ingredients per Tipo

```bash
curl -s "$URL/product_ingredients?select=id&product_type=eq.indian" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```

### Sample Records

```bash
curl -s "$URL/indian?select=id,name&limit=5" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY"
```

---

## Query Struttura Tabelle

### Schema di una Tabella

```bash
curl -s "$URL/ingredients?select=*&limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY"
```

### Valori CHECK Constraints

```bash
# Categorie ingredienti valide
curl -s "$URL/ingredients?select=category&limit=100" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import json,sys; print(sorted(set(x['category'] for x in json.load(sys.stdin))))"

# menu_type validi
curl -s "$URL/product_taxonomy?select=menu_type" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import json,sys; print(sorted(set(x['menu_type'] for x in json.load(sys.stdin) if x['menu_type'])))"

# service_type validi
curl -s "$URL/product_taxonomy?select=service_type" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import json,sys; print(sorted(set(x['service_type'] for x in json.load(sys.stdin) if x['service_type'])))"

# category validi in product_taxonomy
curl -s "$URL/product_taxonomy?select=category" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import json,sys; print(sorted(set(x['category'] for x in json.load(sys.stdin) if x['category'])))"
```

---

## Verificare Ingredienti

### Controllare se un Ingrediente Esiste

```bash
curl -s "$URL/ingredients?select=id,name&id=eq.ING_EXAMPLE" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY"
```

### Verificare Slug Esistenti

```bash
curl -s "$URL/ingredients?select=id,slug&slug=eq.example-slug" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY"
```

### Batch Verifica Multipli

```bash
for slug in "slug1" "slug2" "slug3"; do
  result=$(curl -s "$URL/ingredients?select=id,slug&slug=eq.$slug" \
    -H "apikey: $KEY" \
    -H "Authorization: Bearer $KEY")
  if [ "$result" != "[]" ]; then
    echo "EXISTS: $slug -> $result"
  fi
done
```

### Estrai e Confronta IDs

```bash
# Estrai tutti gli ING_ IDs usati nel tuo file
grep -oE "'ING_[A-Z_]+'" /path/to/script.sql | tr -d "'" | sort | uniq > /tmp/needed.txt

# Estrai tutti gli ING_ IDs esistenti in Supabase
curl -s "$URL/ingredients?select=id&limit=2000" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  grep -oE '"id":"[^"]+"' | cut -d'"' -f4 | sort > /tmp/existing.txt

# Trova quelli mancanti
comm -23 /tmp/needed.txt /tmp/existing.txt
```

---

## Report Completo Database

```bash
# Report tutte le tabelle
bash -c 'KEY="eyJ..."; URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1";
for table in cocktails wines sushi pasta coffee seafood pizzas tea steaks salads appetizers sandwiches beers burgers soups desserts risotti dumplings mexican vegetarian fried breakfast indian thai chinese korean spirits vietnamese greek lebanese georgian turkish brazilian caribbean waters softdrinks; do
  count=$(curl -s "${URL}/${table}?select=id" \
    -H "apikey: ${KEY}" \
    -H "Authorization: Bearer ${KEY}" | \
    grep -o "\"id\"" | wc -l | tr -d " ")
  printf "%-20s | %4s records\n" "$table" "$count"
done'
```

---

## Errori Comuni da EVITARE

```bash
# SBAGLIATO - wc -l conta righe JSON, non records
curl ... | wc -l

# SBAGLIATO - grep conta occorrenze, impreciso per grandi volumi
curl ... | grep -o '"id"' | wc -l

# SBAGLIATO - echo nel pipe
echo "Label:" && curl ... | wc -l

# SBAGLIATO - variabili non quotate
curl -s $URL/$table?select=id  # Mancano quote!

# SBAGLIATO - header su più righe senza backslash
curl -s "$URL/table?select=id"
  -H "apikey: $KEY"   # ERRORE: nuova linea!

# CORRETTO - Usa SEMPRE python3 per contare JSON
curl -s "$URL/table?select=id" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" | \
  python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```

---

## Debugging Connessione

```bash
# Test connessione base
curl -s "$URL/cocktails?select=id&limit=1" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY"

# Se errore "No API key found":
# - Verifica che $KEY sia definito
# - Verifica quote attorno a $KEY

# Se errore DNS/connessione:
# - Verifica URL (ezrz nel mezzo!)
# - Prova: ping vnaonebbuezrzvjekqxs.supabase.co
```

---

**File:** `shared/database/docs/SUPABASE-COMMANDS.md`
**Extracted from:** `PROCEDURE-NEW-DATABASE.md`
