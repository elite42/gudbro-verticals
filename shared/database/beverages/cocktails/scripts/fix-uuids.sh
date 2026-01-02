#!/bin/bash

# Process each batch file
for batch in batches/batch-*.sql; do
    echo "Processing $batch..."
    
    # Create temp file
    temp_file=$(mktemp)
    
    # Read file and replace each UUID with a new one
    while IFS= read -r line; do
        # Find UUID pattern and replace with new UUID
        new_line="$line"
        
        # Extract UUID if line starts with VALUES
        if [[ "$line" == VALUES* ]]; then
            old_uuid=$(echo "$line" | grep -oE "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}" | head -1)
            if [ -n "$old_uuid" ]; then
                new_uuid=$(uuidgen | tr '[:upper:]' '[:lower:]')
                new_line="${line/$old_uuid/$new_uuid}"
            fi
        fi
        
        echo "$new_line" >> "$temp_file"
    done < "$batch"
    
    mv "$temp_file" "$batch"
done

echo "Done!"
