# HOTEL-AUTOCOMPLETE

> Google Places API per ricerca hotel durante onboarding turisti

**Status:** Pending
**Priority:** P1
**Effort:** Medium
**Created:** 2026-01-17

---

## Problema

Durante l'onboarding, i turisti devono inserire dove alloggiano. Attualmente:

- Devono scrivere il nome esatto dell'hotel
- Rischio errori di battitura
- Non abbiamo le coordinate per il delivery
- Non possiamo linkare agli hotel partner

## Soluzione

Usare Google Places Autocomplete per:

1. Ricerca hotel con autocompletamento
2. Ottenere automaticamente: nome, indirizzo, coordinate, place_id
3. Matchare con `accommodation_partners` se l'hotel è partner

## User Flow

```
1. Utente seleziona "Sono un turista"
2. Sistema chiede "Dove alloggi?"
3. Opzioni: Hotel / Hostel / Rental / Friend / Altro
4. Se "Hotel" o "Hostel":
   a. Campo di ricerca LODGING (solo strutture ricettive)
   b. Utente digita "Fus..."
   c. Appare lista: "Fusion Suites Da Nang Beach", "Fusion Maia Da Nang"...
   d. Seleziona hotel
   e. Sistema salva: nome, place_id, lat/lng, address
   f. Sistema chiede "Numero stanza?"
5. Se "Rental" / "Friend" / "Altro":
   a. Campo di ricerca ADDRESS (indirizzi generici)
   b. Utente digita indirizzo o cerca luogo
   c. Sistema salva: address, lat/lng
   d. NO room_number richiesto
```

## Due Modalità di Ricerca

| Accommodation Type | Tipo Ricerca | Google Places Type                  | Room Number  |
| ------------------ | ------------ | ----------------------------------- | ------------ |
| `hotel`            | Lodging      | `includedPrimaryTypes: ['lodging']` | ✅ Richiesto |
| `hostel`           | Lodging      | `includedPrimaryTypes: ['lodging']` | ✅ Opzionale |
| `rental`           | Address      | Geocoding/Address autocomplete      | ❌ No        |
| `friend`           | Address      | Geocoding/Address autocomplete      | ❌ No        |
| `other`            | Address      | Geocoding/Address autocomplete      | ❌ No        |

## Database Fields (già aggiunti)

```sql
-- In accounts table
accommodation_type TEXT  -- 'hotel', 'rental', 'hostel', 'friend', 'resident', 'other'
hotel_name TEXT
hotel_place_id TEXT      -- Google Place ID
hotel_address TEXT
hotel_latitude NUMERIC
hotel_longitude NUMERIC
room_number TEXT
arrival_date DATE
departure_date DATE
lifecycle_status TEXT    -- 'active', 'departed', 'returning'
accommodation_partner_id UUID  -- FK to accommodation_partners
```

## Google Places API

### API da usare

```
Places API (New) - Autocomplete
https://places.googleapis.com/v1/places:autocomplete
```

### Request

```javascript
const response = await fetch(
  'https://places.googleapis.com/v1/places:autocomplete',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
    },
    body: JSON.stringify({
      input: 'Fusion Suites',
      includedPrimaryTypes: ['lodging'], // Solo hotel/alloggi
      locationBias: {
        circle: {
          center: { latitude: 16.0544, longitude: 108.2022 }, // Da Nang
          radius: 50000, // 50km
        },
      },
      languageCode: 'en',
    }),
  }
);
```

### Response

```json
{
  "suggestions": [
    {
      "placePrediction": {
        "place": "places/ChIJ...",
        "placeId": "ChIJ...",
        "text": {
          "text": "Fusion Suites Da Nang Beach"
        },
        "structuredFormat": {
          "mainText": { "text": "Fusion Suites Da Nang Beach" },
          "secondaryText": { "text": "Vo Nguyen Giap, Da Nang" }
        }
      }
    }
  ]
}
```

### Get Place Details (dopo selezione)

```javascript
const details = await fetch(
  `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,formattedAddress,location`,
  { headers: { 'X-Goog-Api-Key': API_KEY } }
);
```

## Costi API

| Richiesta          | Costo                  |
| ------------------ | ---------------------- |
| Autocomplete (New) | $2.83 / 1000 requests  |
| Place Details      | $17.00 / 1000 requests |

**Stima:** ~100 onboarding/mese = ~$2/mese

## Implementazione

### Files da creare/modificare

1. **`lib/google-places.ts`** - Client API
2. **`components/onboarding/HotelSearch.tsx`** - Componente autocomplete
3. **`app/api/places/autocomplete/route.ts`** - Proxy API (nasconde API key)
4. **`app/api/places/details/route.ts`** - Proxy per dettagli

### Componente React

```tsx
// components/onboarding/HotelSearch.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface HotelSearchProps {
  onSelect: (hotel: {
    name: string;
    placeId: string;
    address: string;
    lat: number;
    lng: number;
  }) => void;
  locationBias?: { lat: number; lng: number };
}

export function HotelSearch({ onSelect, locationBias }: HotelSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    fetchSuggestions(debouncedQuery, locationBias)
      .then(setSuggestions)
      .catch(console.error);
  }, [debouncedQuery, locationBias]);

  const handleSelect = async (placeId: string, name: string) => {
    setIsLoading(true);
    const details = await fetchPlaceDetails(placeId);
    onSelect({
      name,
      placeId,
      address: details.formattedAddress,
      lat: details.location.latitude,
      lng: details.location.longitude,
    });
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search hotel name..."
        className="w-full rounded-lg border px-4 py-2"
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full rounded-lg border bg-white shadow-lg">
          {suggestions.map((s) => (
            <li
              key={s.placeId}
              onClick={() => handleSelect(s.placeId, s.name)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-50"
            >
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-gray-500">{s.secondaryText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Link con Partners

Quando utente seleziona hotel, verificare se è partner:

```typescript
// Dopo selezione hotel
const partner = await supabase
  .from('accommodation_partners')
  .select('id, name, partnership_status')
  .or(`google_place_id.eq.${placeId},name.ilike.%${hotelName}%`)
  .single();

if (partner) {
  // Mostra badge "Partner Hotel"
  // Offri promozioni speciali
  // Salva accommodation_partner_id nel profilo utente
}
```

## Env Variables

```bash
# .env.local
GOOGLE_PLACES_API_KEY=AIza...
```

## Testing

1. Cerca "Fusion" → deve mostrare "Fusion Suites Da Nang Beach"
2. Cerca "Melia" → deve mostrare "Melia Danang Beach Resort"
3. Seleziona hotel → deve popolare tutti i campi
4. Se hotel è partner → deve mostrare badge

## Timeline

| Task                         | Effort   |
| ---------------------------- | -------- |
| Setup Google Cloud + API Key | 1h       |
| API proxy routes             | 2h       |
| HotelSearch component        | 3h       |
| Integration in onboarding    | 2h       |
| Partner matching logic       | 1h       |
| Testing                      | 2h       |
| **Total**                    | **~11h** |

---

## References

- [Google Places API (New)](https://developers.google.com/maps/documentation/places/web-service/op-overview)
- [Autocomplete API](https://developers.google.com/maps/documentation/places/web-service/place-autocomplete)
- [Place Details API](https://developers.google.com/maps/documentation/places/web-service/place-details)
