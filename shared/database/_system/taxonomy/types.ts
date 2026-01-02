// ============================================
// GUDBRO Product Taxonomy - Type Definitions
// Version: 1.0
// ============================================

/**
 * Service Type - Level 1
 * Distinguishes between food and beverages
 */
export type ServiceType = 'food' | 'beverage';

/**
 * Menu Type - Level 2
 * How the product is typically served/ordered
 */
export type MenuType =
  | 'traditional_course'  // Part of multi-course meal (antipasto, primo, secondo, dolce)
  | 'standalone'          // Single dish meal (pizza, burger, sushi)
  | 'bar_menu'            // Alcoholic beverages
  | 'cafe_menu'           // Hot beverages, non-alcoholic
  | 'side_dish';          // Accompaniments (salads, sides)

/**
 * Category - Level 3
 * Specific classification
 */
export type TaxonomyCategory =
  // Traditional courses
  | 'appetizer'       // Antipasti
  | 'first_course'    // Primi (pasta, risotto, soup)
  | 'second_course'   // Secondi (meat, fish)
  | 'side'            // Contorni
  | 'dessert'         // Dolci
  // Standalone foods
  | 'pizza'
  | 'burger'
  | 'sandwich'
  | 'sushi'
  | 'dumpling'
  // Beverages
  | 'cocktail'
  | 'wine'
  | 'beer'
  | 'coffee'
  | 'tea'
  | 'soft_drink'
  | 'juice'
  | 'smoothie';

/**
 * Subcategory - Level 4
 * More specific classification within a category
 */
export type TaxonomySubcategory =
  // First course subcategories
  | 'pasta'
  | 'risotto'
  | 'soup'
  | 'dumpling'
  // Second course subcategories
  | 'meat'
  | 'fish'
  | 'poultry'
  // Side subcategories
  | 'salad'
  | 'vegetable'
  // Generic
  | null;

/**
 * Product Types - All 18 databases
 */
export type ProductType =
  // Beverages - Bar
  | 'cocktails'
  | 'wines'
  | 'beers'
  // Beverages - Cafe
  | 'coffee'
  | 'tea'
  // Food - Traditional Course
  | 'appetizers'
  | 'soups'
  | 'pasta'
  | 'risotti'
  | 'dumplings'
  | 'steaks'
  | 'seafood'
  | 'salads'
  | 'desserts'
  // Food - Standalone
  | 'pizzas'
  | 'burgers'
  | 'sandwiches'
  | 'sushi';

/**
 * Course Order
 * Traditional Italian meal order
 */
export enum CourseOrder {
  APPETIZER = 1,
  FIRST = 2,
  SECOND = 3,
  DESSERT = 4,
}

/**
 * Product Taxonomy Entry
 * Main interface for taxonomy records
 */
export interface ProductTaxonomy {
  id: number;

  // Product reference
  product_type: ProductType;
  product_id: string | null;  // null = applies to all items in product_type

  // Classification hierarchy
  service_type: ServiceType;
  menu_type: MenuType;
  category: TaxonomyCategory;
  subcategory: TaxonomySubcategory;

  // Ordering
  course_order: CourseOrder | null;  // null for non-course items
  display_order: number;

  // Display info (multilingual)
  display_name_en: string;
  display_name_it?: string;
  display_name_vi?: string;
  display_name_ko?: string;
  display_name_ja?: string;

  description_en?: string;
  icon?: string;

  // Flags
  is_alcoholic: boolean;
  is_hot_served: boolean | null;
  requires_cooking: boolean;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// ============================================
// HELPER CONSTANTS
// ============================================

/**
 * Course order labels
 */
export const COURSE_LABELS: Record<CourseOrder, { en: string; it: string }> = {
  [CourseOrder.APPETIZER]: { en: 'Appetizers', it: 'Antipasti' },
  [CourseOrder.FIRST]: { en: 'First Courses', it: 'Primi Piatti' },
  [CourseOrder.SECOND]: { en: 'Main Courses', it: 'Secondi Piatti' },
  [CourseOrder.DESSERT]: { en: 'Desserts', it: 'Dolci' },
};

/**
 * Service type labels
 */
export const SERVICE_TYPE_LABELS: Record<ServiceType, { en: string; it: string }> = {
  food: { en: 'Food', it: 'Cibo' },
  beverage: { en: 'Beverages', it: 'Bevande' },
};

/**
 * Menu type labels
 */
export const MENU_TYPE_LABELS: Record<MenuType, { en: string; it: string }> = {
  traditional_course: { en: 'Traditional Menu', it: 'Menu Tradizionale' },
  standalone: { en: 'Main Dishes', it: 'Piatti Unici' },
  bar_menu: { en: 'Bar Menu', it: 'Carta Bar' },
  cafe_menu: { en: 'Cafe Menu', it: 'Caffetteria' },
  side_dish: { en: 'Sides', it: 'Contorni' },
};

// ============================================
// TAXONOMY MAPPING
// ============================================

/**
 * Default taxonomy for each product type
 * Used for quick lookups without DB query
 */
export const DEFAULT_TAXONOMY: Record<ProductType, Partial<ProductTaxonomy>> = {
  // Beverages - Bar
  cocktails: { service_type: 'beverage', menu_type: 'bar_menu', category: 'cocktail', is_alcoholic: true },
  wines: { service_type: 'beverage', menu_type: 'bar_menu', category: 'wine', is_alcoholic: true },
  beers: { service_type: 'beverage', menu_type: 'bar_menu', category: 'beer', is_alcoholic: true },

  // Beverages - Cafe
  coffee: { service_type: 'beverage', menu_type: 'cafe_menu', category: 'coffee', is_hot_served: true },
  tea: { service_type: 'beverage', menu_type: 'cafe_menu', category: 'tea', is_hot_served: true },

  // Food - Traditional Course
  appetizers: { service_type: 'food', menu_type: 'traditional_course', category: 'appetizer', course_order: CourseOrder.APPETIZER },
  soups: { service_type: 'food', menu_type: 'traditional_course', category: 'first_course', subcategory: 'soup', course_order: CourseOrder.FIRST },
  pasta: { service_type: 'food', menu_type: 'traditional_course', category: 'first_course', subcategory: 'pasta', course_order: CourseOrder.FIRST },
  risotti: { service_type: 'food', menu_type: 'traditional_course', category: 'first_course', subcategory: 'risotto', course_order: CourseOrder.FIRST },
  dumplings: { service_type: 'food', menu_type: 'traditional_course', category: 'first_course', subcategory: 'dumpling', course_order: CourseOrder.FIRST },
  steaks: { service_type: 'food', menu_type: 'traditional_course', category: 'second_course', subcategory: 'meat', course_order: CourseOrder.SECOND },
  seafood: { service_type: 'food', menu_type: 'traditional_course', category: 'second_course', subcategory: 'fish', course_order: CourseOrder.SECOND },
  salads: { service_type: 'food', menu_type: 'side_dish', category: 'side', subcategory: 'salad' },
  desserts: { service_type: 'food', menu_type: 'traditional_course', category: 'dessert', course_order: CourseOrder.DESSERT },

  // Food - Standalone
  pizzas: { service_type: 'food', menu_type: 'standalone', category: 'pizza' },
  burgers: { service_type: 'food', menu_type: 'standalone', category: 'burger' },
  sandwiches: { service_type: 'food', menu_type: 'standalone', category: 'sandwich' },
  sushi: { service_type: 'food', menu_type: 'standalone', category: 'sushi' },
};
