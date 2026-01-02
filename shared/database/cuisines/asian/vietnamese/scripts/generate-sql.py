#!/usr/bin/env python3
"""
Generate SQL import scripts for Vietnamese database.
DATABASE-STANDARDS v1.1 compliant
"""

import json
import re
from typing import List, Dict

# =============================================================================
# MISSING INGREDIENTS (51 total)
# =============================================================================

MISSING_INGREDIENTS = [
    {
        "id": "ING_ANNATTO_SEEDS",
        "name": "Annatto Seeds",
        "slug": "annatto-seeds",
        "description": "Red-orange seeds used for coloring in Vietnamese and Latin cuisines",
        "category": "spices",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_BANANA_LEAVES",
        "name": "Banana Leaves",
        "slug": "banana-leaves",
        "description": "Large tropical leaves used for wrapping and steaming foods",
        "category": "vegetables",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_BANANAS",
        "name": "Bananas",
        "slug": "bananas",
        "description": "Sweet tropical fruit, commonly used in Vietnamese desserts",
        "category": "fruits",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_BEEF_BONES",
        "name": "Beef Bones",
        "slug": "beef-bones",
        "description": "Marrow bones used for making rich beef broth for pho",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_BEEF_TENDON",
        "name": "Beef Tendon",
        "slug": "beef-tendon",
        "description": "Gelatinous connective tissue prized for texture in pho",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_BEEF_TRIPE",
        "name": "Beef Tripe",
        "slug": "beef-tripe",
        "description": "Edible stomach lining, common in traditional pho",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_BROKEN_RICE",
        "name": "Broken Rice",
        "slug": "broken-rice",
        "description": "Fragmented rice grains, foundation of Com Tam dishes",
        "category": "grains",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_CARAMEL_SAUCE",
        "name": "Caramel Sauce",
        "slug": "caramel-sauce",
        "description": "Vietnamese dark caramel (nuoc mau) for braised dishes",
        "category": "condiments",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_CHA_LUA",
        "name": "Cha Lua",
        "slug": "cha-lua",
        "description": "Vietnamese pork sausage/ham, essential for banh mi",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_CHICKEN_BONES",
        "name": "Chicken Bones",
        "slug": "chicken-bones",
        "description": "Bones for making chicken broth for pho ga",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_CRAB_PASTE",
        "name": "Crab Paste",
        "slug": "crab-paste",
        "description": "Fermented crab paste for bun rieu and other dishes",
        "category": "seafood",
        "is_allergen": True,
        "allergen_type": "crustacean",
    },
    {
        "id": "ING_CULANTRO",
        "name": "Culantro",
        "slug": "culantro",
        "description": "Ngo gai - sawtooth herb with strong cilantro-like flavor",
        "category": "herbs",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_DUCK_BONES",
        "name": "Duck Bones",
        "slug": "duck-bones",
        "description": "Bones for making duck broth for pho vit",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_EGG_OMELET",
        "name": "Egg Omelet",
        "slug": "egg-omelet",
        "description": "Thin egg sheets cut into strips for garnish",
        "category": "eggs",
        "is_allergen": True,
        "allergen_type": "egg",
    },
    {
        "id": "ING_FERMENTED_FISH",
        "name": "Fermented Fish",
        "slug": "fermented-fish",
        "description": "Mam ca - fermented fish paste for bun mam",
        "category": "seafood",
        "is_allergen": True,
        "allergen_type": "fish",
    },
    {
        "id": "ING_FERMENTED_TOFU",
        "name": "Fermented Tofu",
        "slug": "fermented-tofu",
        "description": "Chao - pungent fermented bean curd used in hot pots",
        "category": "soy",
        "is_allergen": True,
        "allergen_type": "soy",
    },
    {
        "id": "ING_FISH_BALLS",
        "name": "Fish Balls",
        "slug": "fish-balls",
        "description": "Bouncy fish paste balls for hot pot and noodles",
        "category": "seafood",
        "is_allergen": True,
        "allergen_type": "fish",
    },
    {
        "id": "ING_FISH_BONES",
        "name": "Fish Bones",
        "slug": "fish-bones",
        "description": "Bones for making seafood broth",
        "category": "seafood",
        "is_allergen": True,
        "allergen_type": "fish",
    },
    {
        "id": "ING_FISH_FILLET",
        "name": "Fish Fillet",
        "slug": "fish-fillet",
        "description": "Boneless fish portions for soups and grilling",
        "category": "seafood",
        "is_allergen": True,
        "allergen_type": "fish",
    },
    {
        "id": "ING_GLUTINOUS_RICE",
        "name": "Glutinous Rice",
        "slug": "glutinous-rice",
        "description": "Sticky rice used for xoi and desserts",
        "category": "grains",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_GOAT_BONES",
        "name": "Goat Bones",
        "slug": "goat-bones",
        "description": "Bones for goat hot pot broth",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_GOAT_MEAT",
        "name": "Goat Meat",
        "slug": "goat-meat",
        "description": "Lean meat used in Northern Vietnamese hot pot",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_JICAMA",
        "name": "Jicama",
        "slug": "jicama",
        "description": "Cu san - crispy root vegetable for spring rolls",
        "category": "vegetables",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_KOHLRABI",
        "name": "Kohlrabi",
        "slug": "kohlrabi",
        "description": "Su hao - bulb vegetable used in Vietnamese cooking",
        "category": "vegetables",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_KUMQUAT",
        "name": "Kumquat",
        "slug": "kumquat",
        "description": "Tac - small citrus fruit for juices and garnish",
        "category": "fruits",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_LAP_XUONG",
        "name": "Lap Xuong",
        "slug": "lap-xuong",
        "description": "Chinese-style sweet dried sausage used in Vietnamese dishes",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_MAGGI",
        "name": "Maggi Seasoning",
        "slug": "maggi-seasoning",
        "description": "Popular condiment in Vietnamese cuisine",
        "category": "condiments",
        "is_allergen": True,
        "allergen_type": "soy",
    },
    {
        "id": "ING_PANDAN_JELLY",
        "name": "Pandan Jelly",
        "slug": "pandan-jelly",
        "description": "Green jelly made from pandan leaves for desserts",
        "category": "other",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_PEPPER",
        "name": "Black Pepper",
        "slug": "black-pepper",
        "description": "Ground black pepper, essential in Vietnamese cooking",
        "category": "spices",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_PICKLED_CARROTS",
        "name": "Pickled Carrots",
        "slug": "pickled-carrots",
        "description": "Do chua - pickled carrots for banh mi and more",
        "category": "vegetables",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_PORK_BONES",
        "name": "Pork Bones",
        "slug": "pork-bones",
        "description": "Bones for making broth",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_PORK_CHOP",
        "name": "Pork Chop",
        "slug": "pork-chop",
        "description": "Bone-in pork cut for com tam suon nuong",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_PORK_EGG_MEATLOAF",
        "name": "Pork Egg Meatloaf",
        "slug": "pork-egg-meatloaf",
        "description": "Cha trung - steamed pork and egg meatloaf",
        "category": "meat",
        "is_allergen": True,
        "allergen_type": "egg",
    },
    {
        "id": "ING_PORK_FLOSS",
        "name": "Pork Floss",
        "slug": "pork-floss",
        "description": "Ruoc - dried shredded pork for toppings",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_PORK_SKIN",
        "name": "Pork Skin",
        "slug": "pork-skin",
        "description": "Bi - shredded pork skin mixed with rice powder",
        "category": "meat",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_QUAIL_EGGS",
        "name": "Quail Eggs",
        "slug": "quail-eggs",
        "description": "Small eggs used in banh bao and hot pots",
        "category": "eggs",
        "is_allergen": True,
        "allergen_type": "egg",
    },
    {
        "id": "ING_RICE_CRACKERS",
        "name": "Rice Crackers",
        "slug": "rice-crackers",
        "description": "Banh trang - crispy rice paper crackers",
        "category": "grains",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_RICE_NOODLES_WIDE",
        "name": "Wide Rice Noodles",
        "slug": "wide-rice-noodles",
        "description": "Flat wide rice noodles for Northern pho",
        "category": "noodles",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_RICE_WINE",
        "name": "Rice Wine",
        "slug": "rice-wine",
        "description": "Ruou gao - fermented rice alcohol for cooking",
        "category": "alcohol",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_RIVER_SNAILS",
        "name": "River Snails",
        "slug": "river-snails",
        "description": "Oc - freshwater snails for bun oc",
        "category": "seafood",
        "is_allergen": True,
        "allergen_type": "mollusk",
    },
    {
        "id": "ING_SALTED_FISH",
        "name": "Salted Fish",
        "slug": "salted-fish",
        "description": "Ca man - dried salted fish for fried rice",
        "category": "seafood",
        "is_allergen": True,
        "allergen_type": "fish",
    },
    {
        "id": "ING_SHIITAKE_MUSHROOMS",
        "name": "Shiitake Mushrooms",
        "slug": "shiitake-mushrooms",
        "description": "Nam dong co - aromatic Asian mushrooms",
        "category": "vegetables",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_SUGARCANE",
        "name": "Sugarcane",
        "slug": "sugarcane",
        "description": "Mia - fresh sugarcane for juice",
        "category": "other",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_TARO",
        "name": "Taro",
        "slug": "taro",
        "description": "Khoai mon - starchy root for spring rolls and desserts",
        "category": "vegetables",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_TOFU_FRIED",
        "name": "Fried Tofu",
        "slug": "fried-tofu",
        "description": "Dau hu chien - deep-fried tofu puffs",
        "category": "soy",
        "is_allergen": True,
        "allergen_type": "soy",
    },
    {
        "id": "ING_VEGETARIAN_NUOC_CHAM",
        "name": "Vegetarian Nuoc Cham",
        "slug": "vegetarian-nuoc-cham",
        "description": "Fish sauce alternative made with soy",
        "category": "condiments",
        "is_allergen": True,
        "allergen_type": "soy",
    },
    {
        "id": "ING_VEGETARIAN_PATE",
        "name": "Vegetarian Pate",
        "slug": "vegetarian-pate",
        "description": "Plant-based pate for vegan banh mi",
        "category": "other",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_VIETNAMESE_COFFEE",
        "name": "Vietnamese Coffee",
        "slug": "vietnamese-coffee",
        "description": "Ca phe - strong dark roast for ca phe sua da",
        "category": "other",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_VIETNAMESE_CORIANDER",
        "name": "Vietnamese Coriander",
        "slug": "vietnamese-coriander",
        "description": "Rau ram - peppery herb essential in Vietnamese cuisine",
        "category": "herbs",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_WATER_SPINACH",
        "name": "Water Spinach",
        "slug": "water-spinach",
        "description": "Rau muong - morning glory, popular Vietnamese green",
        "category": "vegetables",
        "is_allergen": False,
        "allergen_type": None,
    },
    {
        "id": "ING_WHEAT_WRAPPER",
        "name": "Wheat Wrapper",
        "slug": "wheat-wrapper",
        "description": "Wheat-based spring roll wrapper for nem ran",
        "category": "grains",
        "is_allergen": True,
        "allergen_type": "gluten",
    },
]


def generate_ingredients_sql() -> str:
    """Generate SQL for missing ingredients."""
    lines = [
        "-- =============================================================================",
        "-- VIETNAMESE DATABASE - MISSING INGREDIENTS",
        "-- 51 new ingredients for Vietnamese cuisine",
        "-- =============================================================================",
        "",
        "INSERT INTO ingredients (id, name, slug, description, category, is_allergen, allergen_type)",
        "VALUES"
    ]

    values = []
    for ing in MISSING_INGREDIENTS:
        allergen_type = f"'{ing['allergen_type']}'" if ing['allergen_type'] else "NULL"
        values.append(
            f"  ('{ing['id']}', '{ing['name']}', '{ing['slug']}', "
            f"'{ing['description'].replace(chr(39), chr(39)+chr(39))}', "
            f"'{ing['category']}', {str(ing['is_allergen']).lower()}, {allergen_type})"
        )

    lines.append(",\n".join(values) + ";")
    return "\n".join(lines)


def escape_sql(s: str) -> str:
    """Escape single quotes for SQL."""
    if s is None:
        return "NULL"
    return s.replace("'", "''")


def array_to_sql(arr: List[str]) -> str:
    """Convert Python list to SQL array format."""
    if not arr:
        return "ARRAY[]::TEXT[]"
    escaped = [f"'{escape_sql(x)}'" for x in arr]
    return f"ARRAY[{', '.join(escaped)}]"


# Vietnamese dishes data (simplified for script)
# We'll read this from the TypeScript files

print(generate_ingredients_sql())
