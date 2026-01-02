# Pizza Backoffice Tasks

## Overview

The pizza database stores **master product data** (recipes, ingredients, dietary info, cooking specs).

**Location-specific configuration** (prices, sizes, availability) is managed via `LocationPizzaConfig` in the backoffice - NOT in the pizza database itself.

---

## Backoffice Implementation Tasks

### 1. Pizza Menu Configuration Page

**Purpose:** Allow location managers to configure which pizzas are on their menu and how they're sold.

**Features needed:**
- [ ] List all available pizzas from master catalog
- [ ] Toggle enable/disable per pizza
- [ ] Configure selling modes per pizza:
  - **Whole pizza** with optional sizes (S/M/L/XL/XXL)
  - **By slice** with single price
  - **By weight** with price per 100g
- [ ] Set prices for each enabled mode
- [ ] Set display order for menu sorting
- [ ] Mark pizzas as "featured"

### 2. Size Configuration

**The 5 standard sizes:**

| Size | Code | Approximate Diameter | Use Case |
|------|------|---------------------|----------|
| Small | S | ~25cm / 10" | Individual |
| Medium | M | ~30cm / 12" | Standard |
| Large | L | ~35cm / 14" | Sharing 2-3 |
| Extra Large | XL | ~40cm / 16" | Sharing 3-4 |
| Family/Party | XXL | ~50cm / 20" | Large groups |

**Implementation:**
```typescript
interface PizzaSizeConfig {
  sizes_enabled: boolean;
  prices: {
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
    XXL?: number;
    default?: number;  // If sizes_enabled = false
  };
}
```

**UI Flow:**
1. Manager enables "Sell whole pizzas" toggle
2. Manager chooses "Enable size options" (yes/no)
3. If YES: Show 5 size inputs (S/M/L/XL/XXL) - can leave some blank
4. If NO: Show single "default price" input

### 3. Selling Modes

Each pizza can be sold in multiple modes simultaneously:

| Mode | Description | Price Format | Typical Use |
|------|-------------|--------------|-------------|
| `whole` | Full pizza | Per size or flat | Dine-in, delivery |
| `slice` | Individual slice | Per slice | Quick service |
| `weight` | By weight | Per 100g | Al taglio style |

**UI Elements:**
- 3 toggles (one per mode)
- Conditional price inputs based on enabled modes

### 4. Availability Configuration

**Features:**
- [ ] Available days (checkboxes: Mon-Sun)
- [ ] Available hours (time range picker)
- [ ] Seasonal/temporary disable

### 5. Local Customizations

**Optional overrides:**
- [ ] Custom name for this location
- [ ] Custom description
- [ ] Local ingredient variations (e.g., different cheese brand)

---

## Database Schema for LocationPizzaConfig

```sql
CREATE TABLE location_pizza_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id),
    pizza_id UUID NOT NULL REFERENCES pizzas(id),

    -- Availability
    enabled BOOLEAN DEFAULT true,
    available_days TEXT[] DEFAULT '{mon,tue,wed,thu,fri,sat,sun}',
    available_from TIME,
    available_to TIME,

    -- Selling modes (JSONB for flexibility)
    selling_modes JSONB NOT NULL DEFAULT '{
        "whole": {"enabled": false},
        "slice": {"enabled": false},
        "weight": {"enabled": false}
    }',

    -- Local overrides
    custom_name JSONB,
    custom_description JSONB,
    local_ingredients JSONB,

    -- Display
    display_order INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(location_id, pizza_id)
);
```

**Example selling_modes JSONB:**
```json
{
  "whole": {
    "enabled": true,
    "sizes_enabled": true,
    "prices": {
      "S": 8.50,
      "M": 12.00,
      "L": 15.00,
      "XL": 18.00
    }
  },
  "slice": {
    "enabled": true,
    "price": 3.50
  },
  "weight": {
    "enabled": false
  }
}
```

---

## UI Mockup Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ Pizza Menu Configuration                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 🍕 Margherita                              [✓] Enabled      │
│    Classic Neapolitan • Vegetarian                          │
│                                                             │
│    Selling Modes:                                           │
│    ┌─────────────────────────────────────────────────────┐ │
│    │ [✓] Whole Pizza                                     │ │
│    │     [✓] Enable size options                         │ │
│    │     S: €_8.50_  M: €_12.00_ L: €_15.00_            │ │
│    │     XL: €_18.00_ XXL: €______                       │ │
│    │                                                     │ │
│    │ [✓] By Slice                                        │ │
│    │     Price per slice: €_3.50_                        │ │
│    │                                                     │ │
│    │ [ ] By Weight                                       │ │
│    │     Price per 100g: €______                         │ │
│    └─────────────────────────────────────────────────────┘ │
│                                                             │
│    Availability:                                            │
│    [✓]Mon [✓]Tue [✓]Wed [✓]Thu [✓]Fri [✓]Sat [✓]Sun      │
│    From: [11:00] To: [23:00]                               │
│                                                             │
│    [ ] Featured on menu                                     │
│    Display order: [1]                                       │
│                                                             │
│    [Save Changes]                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ 🍕 Diavola                                  [✓] Enabled     │
│    Spicy salami • Hot                                       │
│    ...                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## API Endpoints Needed

```typescript
// Get all pizzas with location config
GET /api/locations/:locationId/pizzas

// Update pizza configuration for location
PUT /api/locations/:locationId/pizzas/:pizzaId/config
Body: LocationPizzaConfig

// Bulk enable/disable pizzas
POST /api/locations/:locationId/pizzas/bulk-update
Body: { pizzaIds: string[], enabled: boolean }

// Reorder pizzas
PUT /api/locations/:locationId/pizzas/reorder
Body: { orderedPizzaIds: string[] }
```

---

## PWA Menu Display Logic

When fetching menu for PWA:

1. Get all pizzas from master catalog
2. Join with `location_pizza_config` for current location
3. Filter to `enabled = true`
4. Apply availability rules (day/time)
5. Display only enabled selling modes with configured prices
6. Show size options if `sizes_enabled = true`

---

## Priority Implementation Order

1. **Phase 1:** Basic enable/disable + whole pizza with default price
2. **Phase 2:** Size options (S/M/L/XL/XXL) configuration
3. **Phase 3:** Slice and weight selling modes
4. **Phase 4:** Availability scheduling
5. **Phase 5:** Local customizations and featured pizzas
