/**
 * ROOTS Menu Integration
 *
 * This file imports the 13 real ROOTS products from the centralized database
 * and converts them to the frontend format with auto-computed allergens and diets.
 */

import { rootsProducts, foodProducts } from '@/database/index';
import { allIngredients } from '@/database/index';
import { autoComputeProduct, getIngredientMasters } from '@/database/index';

// Combine all products
const allProducts = [...rootsProducts, ...foodProducts];
import type { Product, IngredientMaster, AutoComputationResult } from '@/database/types';
import type { DishItem } from '../components/DishCard';

/**
 * Product with computed safety data
 */
interface ProductWithComputation extends Product {
  computed_data?: AutoComputationResult;
}

/**
 * Convert ROOTS products to frontend DishItem format
 * with auto-computed allergens and dietary information
 */
export async function getROOTSMenuItems(): Promise<DishItem[]> {
  const menuItems: DishItem[] = [];

  for (const product of allProducts) {
    try {
      // Get ingredient masters for this product
      const ingredientMasters: IngredientMaster[] = [];

      for (const prodIngredient of product.ingredients) {
        const ingredient = allIngredients.find(
          ing => ing.id === prodIngredient.ingredient_id
        );
        if (ingredient) {
          ingredientMasters.push(ingredient);
        }
      }

      // Auto-compute allergens and diets
      const computedData = autoComputeProduct(ingredientMasters);

      const frontendCategory = mapCategoryToFrontend(product.category.main);
      const productName = product.name.en;

      // Get extras for this product
      const extras = getExtrasForProduct(frontendCategory, productName);

      // Convert to DishItem format
      const dishItem: DishItem = {
        id: product.slug,
        name: productName,
        description: product.description?.en || '',
        image: product.media?.images?.thumbnail || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
        price: product.pricing?.selling_price_local?.amount || 0,
        category: frontendCategory,
        origin: product.category.sub, // Pass origin (italiano, vietnamita, giapponese, etc.)
        dietary: computedData.diets.compatible,
        allergens: computedData.allergens.present,
        // Pass through database customizations if they exist, otherwise use availableExtras
        ...(product.customizations ? { customizations: product.customizations } : (extras ? { availableExtras: extras } : {})),
        timeSlots: product.availability?.time_slots,
      };

      menuItems.push(dishItem);
    } catch (error) {
      console.error(`Error processing product ${product.id}:`, error);
    }
  }

  return menuItems;
}

/**
 * Map database categories to frontend categories
 * New professional structure: Antipasti → Primi → Secondi → Contorni → Piatti Unici → Dessert → Bevande
 */
function mapCategoryToFrontend(dbCategory: string): string {
  const categoryMap: Record<string, string> = {
    // Professional Restaurant Categories (Portate)
    'antipasti': 'antipasti',
    'primi': 'primi',
    'secondi': 'secondi',
    'contorni': 'contorni',
    'piatti-unici': 'piatti-unici',
    'pizza': 'pizza', // Dedicated category for pizzas with unique extras
    'dessert': 'dessert',
    'bevande': 'bevande',

    // Original ROOTS categories (kept for coffee shop products)
    'coffee': 'coffee',
    'smoothie': 'smoothie',
    'bowl': 'bowl',
    'wellness': 'wellness',
  };

  return categoryMap[dbCategory] || dbCategory;
}

/**
 * Get available extras based on product category and name
 */
function getExtrasForProduct(category: string, productName: string): any[] | undefined {
  // Pizza - Unique extras for toppings and crust
  if (category === 'pizza') {
    return [
      // Extra Toppings
      { id: 'extra-mozzarella', name: 'Extra Mozzarella', price: 15000, type: 'addon' },
      { id: 'extra-basil', name: 'Fresh Basil', price: 5000, type: 'addon' },
      { id: 'extra-mushrooms', name: 'Extra Mushrooms', price: 10000, type: 'addon' },
      { id: 'extra-olives', name: 'Extra Olives', price: 8000, type: 'addon' },
      { id: 'extra-peppers', name: 'Extra Peppers', price: 8000, type: 'addon' },
      { id: 'extra-onions', name: 'Extra Onions', price: 5000, type: 'addon' },
      // Crust Options
      { id: 'crust-thin', name: 'Thin Crust', price: 0, type: 'size' },
      { id: 'crust-regular', name: 'Regular Crust', price: 0, type: 'size' },
      { id: 'crust-thick', name: 'Thick Crust', price: 10000, type: 'size' },
      { id: 'crust-stuffed', name: 'Stuffed Crust', price: 20000, type: 'size' },
    ];
  }

  // Piatti Unici - Side dishes and sauces
  if (category === 'piatti-unici') {
    return [
      // Sides
      { id: 'side-fries', name: 'French Fries', price: 15000, type: 'addon' },
      { id: 'side-salad', name: 'Side Salad', price: 20000, type: 'addon' },
      { id: 'side-rice', name: 'Extra Rice', price: 10000, type: 'addon' },
      // Sauces
      { id: 'sauce-ketchup', name: 'Ketchup', price: 3000, type: 'addon' },
      { id: 'sauce-mayo', name: 'Mayonnaise', price: 3000, type: 'addon' },
      { id: 'sauce-bbq', name: 'BBQ Sauce', price: 5000, type: 'addon' },
      { id: 'sauce-hot', name: 'Hot Sauce', price: 5000, type: 'addon' },
    ];
  }

  // Primi - Extra portions and ingredients
  if (category === 'primi') {
    return [
      { id: 'extra-pasta', name: 'Extra Pasta', price: 15000, type: 'addon' },
      { id: 'extra-cheese', name: 'Extra Cheese', price: 10000, type: 'addon' },
      { id: 'extra-vegetables', name: 'Extra Vegetables', price: 12000, type: 'addon' },
      { id: 'gluten-free-pasta', name: 'Gluten-Free Pasta', price: 20000, type: 'addon' },
    ];
  }

  // Secondi - Side dishes
  if (category === 'secondi') {
    return [
      { id: 'side-potatoes', name: 'Roasted Potatoes', price: 15000, type: 'addon' },
      { id: 'side-vegetables', name: 'Grilled Vegetables', price: 18000, type: 'addon' },
      { id: 'side-salad', name: 'Mixed Salad', price: 20000, type: 'addon' },
    ];
  }

  // Bevande - Size options + extras
  if (category === 'bevande') {
    return [
      // Size options
      { id: 'size-small', name: 'Small (250ml)', price: 0, type: 'size' },
      { id: 'size-medium', name: 'Medium (500ml)', price: 10000, type: 'size' },
      { id: 'size-large', name: 'Large (750ml)', price: 20000, type: 'size' },
      // Ice level
      { id: 'ice-extra', name: 'Extra Ice', price: 0, type: 'addon' },
      { id: 'ice-light', name: 'Light Ice', price: 0, type: 'addon' },
      { id: 'ice-none', name: 'No Ice', price: 0, type: 'addon' },
      // Service type
      { id: 'takeaway', name: 'Takeaway / To Go', price: 0, type: 'addon' },
      { id: 'eco-cup', name: 'Eco Cup (riutilizzabile)', price: 5000, type: 'addon' },
    ];
  }

  // Coffee products get customization options
  if (category === 'coffee' || category === 'beverages') {
    const extras = [];

    // Milk options for coffee-based drinks (exclude juices)
    if (!productName.toLowerCase().includes('juice')) {
      extras.push(
        { id: 'oat-milk', name: 'Oat Milk', price: 5000, type: 'milk' },
        { id: 'soy-milk', name: 'Soy Milk', price: 5000, type: 'milk' },
        { id: 'almond-milk', name: 'Almond Milk', price: 7000, type: 'milk' },
        { id: 'coconut-milk', name: 'Coconut Milk', price: 7000, type: 'milk' }
      );
    }

    // Size options for all coffee drinks
    extras.push(
      { id: 'size-small', name: 'Small', price: 0, type: 'size' },
      { id: 'size-medium', name: 'Medium', price: 5000, type: 'size' },
      { id: 'size-large', name: 'Large', price: 10000, type: 'size' }
    );

    // Extra shots for espresso-based drinks
    if (productName.toLowerCase().includes('espresso') ||
        productName.toLowerCase().includes('latte') ||
        productName.toLowerCase().includes('cappuccino')) {
      extras.push(
        { id: 'extra-shot', name: 'Extra Shot', price: 10000, type: 'shot' }
      );
    }

    return extras.length > 0 ? extras : undefined;
  }

  // Smoothies and bowls might have add-ons
  if (category === 'smoothie' || category === 'bowl') {
    return [
      { id: 'protein-powder', name: 'Protein Powder', price: 15000, type: 'addon' },
      { id: 'chia-seeds', name: 'Chia Seeds', price: 8000, type: 'addon' },
      { id: 'extra-fruit', name: 'Extra Fruit', price: 10000, type: 'addon' },
    ];
  }

  return undefined;
}

/**
 * Get ROOTS menu items synchronously (for immediate use)
 * Note: Auto-computation happens synchronously in the database
 */
export function getROOTSMenuItemsSync(): DishItem[] {
  const menuItems: DishItem[] = [];

  for (const product of allProducts) {
    try {
      // Get ingredient masters for this product
      const ingredientMasters: IngredientMaster[] = [];

      for (const prodIngredient of product.ingredients) {
        const ingredient = allIngredients.find(
          ing => ing.id === prodIngredient.ingredient_id
        );
        if (ingredient) {
          ingredientMasters.push(ingredient);
        }
      }

      // Auto-compute allergens and diets
      const computedData = autoComputeProduct(ingredientMasters);

      const frontendCategory = mapCategoryToFrontend(product.category.main);
      const productName = product.name.en;

      // Get extras for this product
      const extras = getExtrasForProduct(frontendCategory, productName);

      // Convert to DishItem format
      const dishItem: DishItem = {
        id: product.slug,
        name: productName,
        description: product.description?.en || '',
        image: product.media?.images?.thumbnail || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
        price: product.pricing?.selling_price_local?.amount || 0,
        category: frontendCategory,
        origin: product.category.sub, // Pass origin (italiano, vietnamita, giapponese, etc.)
        dietary: computedData.diets.compatible,
        allergens: computedData.allergens.present,
        // Pass through database customizations if they exist, otherwise use availableExtras
        ...(product.customizations ? { customizations: product.customizations } : (extras ? { availableExtras: extras } : {})),
        timeSlots: product.availability?.time_slots,
      };

      menuItems.push(dishItem);
    } catch (error) {
      console.error(`Error processing product ${product.id}:`, error);
    }
  }

  return menuItems;
}

/**
 * Get statistics about the ROOTS menu
 */
export function getROOTSMenuStats() {
  const items = getROOTSMenuItemsSync();

  const categories = new Set(items.map(item => item.category));
  const totalProducts = items.length;
  const avgPrice = items.reduce((sum, item) => sum + item.price, 0) / totalProducts;

  return {
    totalProducts,
    categories: Array.from(categories),
    categoryCount: categories.size,
    avgPrice: Math.round(avgPrice),
    priceRange: {
      min: Math.min(...items.map(i => i.price)),
      max: Math.max(...items.map(i => i.price)),
    }
  };
}
