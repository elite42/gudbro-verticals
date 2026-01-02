#!/bin/bash

input="seed-beers-english.sql"
output_dir="batches"
batch_size=10
batch_num=1
beer_count=0
current_batch=""

# Read the header (first 12 lines)
header=$(head -12 "$input")

while IFS= read -r line; do
    # Skip header lines
    if [[ "$line" == "-- "* ]] && [ "$beer_count" -eq 0 ]; then
        continue
    fi
    
    # Check if this is a new INSERT statement
    if [[ "$line" == "INSERT INTO beers"* ]]; then
        ((beer_count++))
        
        # If we've reached batch size, write the batch
        if [ $((beer_count % batch_size)) -eq 1 ] && [ "$beer_count" -gt 1 ]; then
            # Write previous batch
            echo "$current_batch" > "$output_dir/batch-$(printf '%02d' $batch_num).sql"
            ((batch_num++))
            current_batch=""
        fi
    fi
    
    current_batch+="$line"$'\n'
    
done < "$input"

# Write the last batch
if [ -n "$current_batch" ]; then
    echo "$current_batch" > "$output_dir/batch-$(printf '%02d' $batch_num).sql"
fi

echo "Created $batch_num batches"
