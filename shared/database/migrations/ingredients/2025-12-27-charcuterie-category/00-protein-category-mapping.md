# Protein Category Restructuring

## Overview
Splitting `proteins` (439 ingredients) into 7 specific categories:

## New Categories

### 1. RED_MEAT (~80 items)
Beef, pork, lamb, veal, goat - fresh cuts and ground meat

### 2. POULTRY (~30 items)
Chicken, duck, turkey, goose, pigeon, hen

### 3. GAME (~15 items)
Venison, rabbit, wild boar, reindeer, pheasant + exotic (kangaroo, emu, alligator, alpaca, cuy)

### 4. OFFAL (~40 items)
Liver, kidney, heart, tripe, tongue, brain, intestines, feet, sweetbreads, blood

### 5. CURED_MEATS (~50 items)
Dry-cured/aged: prosciutto, bresaola, speck, salami, bacon, pancetta, guanciale, jamon, coppa

### 6. SAUSAGES (~60 items)
Fresh/cooked sausages: bratwurst, kielbasa, chorizo, blood sausage, mortadella, hot dog

### 7. SEAFOOD (already exists)
Fish and shellfish already have their own category

### 8. PROTEINS (remaining ~50 items)
Tofu, seitan, tempeh, prepared proteins (chashu, carnitas, pulled pork), fish products (surimi, hanpen), broths

## Migration Strategy

1. Update CHECK constraint to add new categories
2. Run migration scripts in order
3. Verify counts
4. Update documentation

## Items to KEEP in proteins (prepared/processed)
- Broths: ING_BEEF_BROTH, ING_CHICKEN_BROTH, ING_PORK_BROTH, ING_PORK_STOCK
- Tofu family: ING_TOFU_*, ING_SILKEN_TOFU, ING_SMOKED_TOFU, ING_FERMENTED_TOFU, ING_ATSUAGE
- Plant proteins: ING_SEITAN
- Fish products: ING_FISH_CAKES, ING_CRAB_STICK, ING_HANPEN, ING_CHIKUWA, ING_KAKIAGE
- Prepared: ING_CARNITAS, ING_PULLED_PORK, ING_CHASHU_PORK, ING_CHAR_SIU, ING_TONKATSU
- Meatballs: ING_MEATBALLS, ING_BEEF_MEATBALLS, ING_PORK_MEATBALLS, ING_CHICKEN_MEATBALL
- Misc: ING_WONTONS, ING_SPAM, ING_SEASONED_GROUND_BEEF
