#!/bin/bash
# =============================================================================
# SUPABASE DATABASE VERIFICATION SCRIPT
# =============================================================================
# Uso: ./supabase-check.sh [table_name] [options]
#
# Esempi:
#   ./supabase-check.sh indian              # Conta records nella tabella indian
#   ./supabase-check.sh indian --sample     # Mostra primi 5 records
#   ./supabase-check.sh --all               # Conta tutte le tabelle food
#   ./supabase-check.sh --ingredients       # Conta ingredienti totali
#   ./supabase-check.sh --links indian      # Conta product_ingredients per indian
#
# NOTA: Questo script usa il pattern TESTATO che funziona con Supabase REST API
# =============================================================================

# Credenziali (dalla documentazione CLAUDE.md)
# URL CORRETTO: nota "ezrz" nel mezzo, NON "eezr"
SUPABASE_URL="https://vnaonebbuezrzvjekqxs.supabase.co/rest/v1"
API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW9uZWJidWV6cnp2amVrcXhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM1NDA0OSwiZXhwIjoyMDc5OTMwMDQ5fQ.tVvhJiYaSTYoKRPXDCV6Q2-jr5w2oMM-oOJ_VxtlgPI"

# Lista tabelle food
FOOD_TABLES="cocktails wines sushi pasta coffee mexican vegetarian breakfast indian seafood pizzas tea steaks salads appetizers sandwiches fried beers burgers soups desserts risotti dumplings"

# Funzione per contare records in una tabella
count_table() {
    local table=$1
    local count=$(curl -s "$SUPABASE_URL/$table?select=id" \
        -H "apikey: $API_KEY" \
        -H "Authorization: Bearer $API_KEY" | \
        python3 -c "import sys,json; data=json.load(sys.stdin); print(len(data) if isinstance(data, list) else 'ERROR: ' + str(data))" 2>/dev/null)
    echo "$count"
}

# Funzione per mostrare sample records
sample_table() {
    local table=$1
    local limit=${2:-5}
    curl -s "$SUPABASE_URL/$table?select=id,name&limit=$limit" \
        -H "apikey: $API_KEY" \
        -H "Authorization: Bearer $API_KEY" | \
        python3 -c "import sys,json; data=json.load(sys.stdin); [print(f\"  {r.get('id', 'N/A')}: {r.get('name', 'N/A')}\") for r in data]" 2>/dev/null
}

# Funzione per contare product_ingredients per tipo
count_links() {
    local product_type=$1
    local count=$(curl -s "$SUPABASE_URL/product_ingredients?select=id&product_type=eq.$product_type" \
        -H "apikey: $API_KEY" \
        -H "Authorization: Bearer $API_KEY" | \
        python3 -c "import sys,json; data=json.load(sys.stdin); print(len(data) if isinstance(data, list) else 'ERROR')" 2>/dev/null)
    echo "$count"
}

# Funzione per contare ingredienti totali (con paginazione)
count_ingredients() {
    local total=0
    local offset=0
    local batch_size=1000

    while true; do
        local count=$(curl -s "$SUPABASE_URL/ingredients?select=id&offset=$offset&limit=$batch_size" \
            -H "apikey: $API_KEY" \
            -H "Authorization: Bearer $API_KEY" | \
            python3 -c "import sys,json; data=json.load(sys.stdin); print(len(data) if isinstance(data, list) else 0)" 2>/dev/null)

        if [ "$count" -eq 0 ] 2>/dev/null; then
            break
        fi

        total=$((total + count))

        if [ "$count" -lt "$batch_size" ]; then
            break
        fi

        offset=$((offset + batch_size))
    done

    echo "$total"
}

# Funzione per report completo
full_report() {
    echo "=============================================="
    echo "GUDBRO DATABASE STATUS REPORT"
    echo "=============================================="
    echo ""
    echo "FOOD TABLES:"
    echo "----------------------------------------------"
    printf "%-20s | %8s | %8s\n" "Table" "Records" "Links"
    echo "----------------------------------------------"

    local total_products=0
    local total_links=0

    for table in $FOOD_TABLES; do
        local count=$(count_table "$table")
        local links=$(count_links "$table")

        if [[ "$count" =~ ^[0-9]+$ ]]; then
            total_products=$((total_products + count))
        fi
        if [[ "$links" =~ ^[0-9]+$ ]]; then
            total_links=$((total_links + links))
        fi

        printf "%-20s | %8s | %8s\n" "$table" "$count" "$links"
    done

    echo "----------------------------------------------"
    printf "%-20s | %8s | %8s\n" "TOTAL PRODUCTS" "$total_products" "$total_links"
    echo ""

    echo "INGREDIENTS:"
    echo "----------------------------------------------"
    local ing_count=$(count_ingredients)
    printf "Total ingredients: %s\n" "$ing_count"
    echo "=============================================="
}

# Main
case "$1" in
    --all)
        full_report
        ;;
    --ingredients)
        echo "Counting ingredients (with pagination)..."
        count=$(count_ingredients)
        echo "Total ingredients: $count"
        ;;
    --links)
        if [ -z "$2" ]; then
            echo "Usage: $0 --links <product_type>"
            exit 1
        fi
        count=$(count_links "$2")
        echo "Product_ingredients links for $2: $count"
        ;;
    --sample)
        if [ -z "$2" ]; then
            echo "Usage: $0 --sample <table_name>"
            exit 1
        fi
        echo "Sample records from $2:"
        sample_table "$2"
        ;;
    --help|-h)
        head -20 "$0" | tail -15
        ;;
    *)
        if [ -z "$1" ]; then
            echo "Usage: $0 <table_name> | --all | --ingredients | --links <type> | --sample <table>"
            echo "Run '$0 --help' for more info"
            exit 1
        fi

        # Conta singola tabella
        count=$(count_table "$1")
        echo "$1: $count records"

        # Se richiesto --sample come secondo argomento
        if [ "$2" == "--sample" ]; then
            echo "Sample:"
            sample_table "$1"
        fi
        ;;
esac
