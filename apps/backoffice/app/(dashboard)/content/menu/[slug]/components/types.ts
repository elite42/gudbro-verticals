// Types from shared database
export interface MultiLangText {
  en: string;
  it: string;
  vi: string;
  ko?: string;
  ja?: string;
}

export interface AllergenFlags {
  gluten?: boolean;
  crustaceans?: boolean;
  eggs?: boolean;
  fish?: boolean;
  peanuts?: boolean;
  soybeans?: boolean;
  milk?: boolean;
  nuts?: boolean;
  celery?: boolean;
  mustard?: boolean;
  sesame?: boolean;
  sulphites?: boolean;
  lupin?: boolean;
  molluscs?: boolean;
  pork?: boolean;
  peach?: boolean;
  tomato?: boolean;
  beef?: boolean;
  chicken?: boolean;
  squid?: boolean;
  pine_nuts?: boolean;
  kiwi?: boolean;
  banana?: boolean;
  mango?: boolean;
  apple?: boolean;
  orange?: boolean;
  matsutake?: boolean;
  yam?: boolean;
  coriander?: boolean;
  chili_pepper?: boolean;
}

export interface IntoleranceFlags {
  lactose?: boolean;
  gluten_celiac?: boolean;
  fructose?: boolean;
  fodmap?: boolean;
  msg?: boolean;
  histamine?: boolean;
  salicylates?: boolean;
  sulphites_intolerance?: boolean;
  caffeine?: boolean;
  alcohol?: boolean;
}

export interface DietaryFlags {
  buddhist_restricted?: boolean;
  halal?: boolean;
  non_halal?: boolean;
  kosher?: boolean;
  non_kosher?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  pescatarian?: boolean;
  gluten_free?: boolean;
  dairy_free?: boolean;
  nut_free?: boolean;
  low_carb?: boolean;
}

export type SpiceLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface ProductCustomization {
  id: string;
  type: 'radio' | 'checkbox' | 'quantity';
  name: MultiLangText;
  required: boolean;
  max_selections?: number;
  options: {
    id: string;
    name: MultiLangText;
    price_modifier: number;
    is_default: boolean;
  }[];
  display_order: number;
}

export interface MenuItem {
  id: string;
  merchantId: string;
  categoryId?: string;
  slug: string;
  name: MultiLangText;
  description?: MultiLangText;
  shortDescription?: MultiLangText;
  price: number;
  compareAtPrice?: number;
  currency: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  galleryUrls?: string[];
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietaryFlags: DietaryFlags;
  spiceLevel: SpiceLevel;
  safetyDataSource: 'manual' | 'computed' | 'recipe';
  calories?: number;
  customizations: ProductCustomization[];
  trackInventory: boolean;
  inventoryCount?: number;
  lowStockThreshold: number;
  isAvailable: boolean;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  newUntil?: string;
  availableFrom?: string;
  availableTo?: string;
  availableDays?: number[];
  displayOrder: number;
  tags: string[];
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name_multilang: { en?: string; vi?: string };
  icon: string | null;
}

export interface Ingredient {
  id: string;
  slug: string;
  name_multilang: { en?: string; vi?: string };
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietary_flags: DietaryFlags;
  calories_per_100g: number | null;
  protein_per_100g: number | null;
  carbs_per_100g: number | null;
  fat_per_100g: number | null;
}

export interface MenuItemIngredient {
  id: string;
  ingredient_id: string;
  quantity_grams: number;
  is_optional: boolean;
  display_order: number;
  ingredient?: Ingredient;
}

export type TabId = 'basic' | 'ingredients' | 'safety' | 'customizations' | 'availability' | 'seo';

// Allergen list with icons for UI
export const allergensList: {
  key: keyof AllergenFlags;
  label: string;
  icon: string;
  region: string;
}[] = [
  // EU 14
  { key: 'gluten', label: 'Gluten', icon: '🌾', region: 'EU' },
  { key: 'crustaceans', label: 'Crustaceans', icon: '🦐', region: 'EU' },
  { key: 'eggs', label: 'Eggs', icon: '🥚', region: 'EU' },
  { key: 'fish', label: 'Fish', icon: '🐟', region: 'EU' },
  { key: 'peanuts', label: 'Peanuts', icon: '🥜', region: 'EU' },
  { key: 'soybeans', label: 'Soybeans', icon: '🫘', region: 'EU' },
  { key: 'milk', label: 'Milk', icon: '🥛', region: 'EU' },
  { key: 'nuts', label: 'Tree Nuts', icon: '🌰', region: 'EU' },
  { key: 'celery', label: 'Celery', icon: '🥬', region: 'EU' },
  { key: 'mustard', label: 'Mustard', icon: '🟡', region: 'EU' },
  { key: 'sesame', label: 'Sesame', icon: '⚪', region: 'EU' },
  { key: 'sulphites', label: 'Sulphites', icon: '🍷', region: 'EU' },
  { key: 'lupin', label: 'Lupin', icon: '🌸', region: 'EU' },
  { key: 'molluscs', label: 'Molluscs', icon: '🦪', region: 'EU' },
  // Korea +7
  { key: 'pork', label: 'Pork', icon: '🐷', region: 'Korea' },
  { key: 'peach', label: 'Peach', icon: '🍑', region: 'Korea' },
  { key: 'tomato', label: 'Tomato', icon: '🍅', region: 'Korea' },
  { key: 'beef', label: 'Beef', icon: '🥩', region: 'Korea' },
  { key: 'chicken', label: 'Chicken', icon: '🍗', region: 'Korea' },
  { key: 'squid', label: 'Squid', icon: '🦑', region: 'Korea' },
  { key: 'pine_nuts', label: 'Pine Nuts', icon: '🌲', region: 'Korea' },
  // Japan +7
  { key: 'kiwi', label: 'Kiwi', icon: '🥝', region: 'Japan' },
  { key: 'banana', label: 'Banana', icon: '🍌', region: 'Japan' },
  { key: 'mango', label: 'Mango', icon: '🥭', region: 'Japan' },
  { key: 'apple', label: 'Apple', icon: '🍎', region: 'Japan' },
  { key: 'orange', label: 'Orange', icon: '🍊', region: 'Japan' },
  { key: 'matsutake', label: 'Matsutake', icon: '🍄', region: 'Japan' },
  { key: 'yam', label: 'Yam', icon: '🍠', region: 'Japan' },
  // GUDBRO +2
  { key: 'coriander', label: 'Coriander', icon: '🌿', region: 'GUDBRO' },
  { key: 'chili_pepper', label: 'Chili Pepper', icon: '🌶️', region: 'GUDBRO' },
];

export const intolerancesList: { key: keyof IntoleranceFlags; label: string; icon: string }[] = [
  { key: 'lactose', label: 'Lactose', icon: '🥛' },
  { key: 'gluten_celiac', label: 'Celiac', icon: '🌾' },
  { key: 'fructose', label: 'Fructose', icon: '🍎' },
  { key: 'fodmap', label: 'FODMAP', icon: '🫘' },
  { key: 'msg', label: 'MSG', icon: '⚡' },
  { key: 'histamine', label: 'Histamine', icon: '🧀' },
  { key: 'salicylates', label: 'Salicylates', icon: '💊' },
  { key: 'sulphites_intolerance', label: 'Sulphites', icon: '🍷' },
  { key: 'caffeine', label: 'Caffeine', icon: '☕' },
  { key: 'alcohol', label: 'Alcohol', icon: '🍺' },
];

export const dietaryList: {
  key: keyof DietaryFlags;
  label: string;
  icon: string;
  positive: boolean;
}[] = [
  { key: 'vegan', label: 'Vegan', icon: '🌱', positive: true },
  { key: 'vegetarian', label: 'Vegetarian', icon: '🥬', positive: true },
  { key: 'pescatarian', label: 'Pescatarian', icon: '🐟', positive: true },
  { key: 'gluten_free', label: 'Gluten-Free', icon: '🌾', positive: true },
  { key: 'dairy_free', label: 'Dairy-Free', icon: '🥛', positive: true },
  { key: 'nut_free', label: 'Nut-Free', icon: '🥜', positive: true },
  { key: 'low_carb', label: 'Low Carb', icon: '🥑', positive: true },
  { key: 'halal', label: 'Halal', icon: '☪️', positive: true },
  { key: 'kosher', label: 'Kosher', icon: '✡️', positive: true },
  { key: 'buddhist_restricted', label: 'Buddhist (5 pungent)', icon: '☸️', positive: false },
  { key: 'non_halal', label: 'Non-Halal', icon: '🐷', positive: false },
  { key: 'non_kosher', label: 'Non-Kosher', icon: '🦞', positive: false },
];

export const spiceLevels: {
  level: SpiceLevel;
  label: string;
  icon: string;
  description: string;
}[] = [
  { level: 0, label: 'None', icon: '⚪', description: 'No spice' },
  { level: 1, label: 'Mild', icon: '🌶️', description: '0-500 SHU' },
  { level: 2, label: 'Medium', icon: '🌶️🌶️', description: '500-2,500 SHU' },
  { level: 3, label: 'Hot', icon: '🌶️🌶️🌶️', description: '2,500-8,000 SHU' },
  { level: 4, label: 'Very Hot', icon: '🔥', description: '8,000-50,000 SHU' },
  { level: 5, label: 'Extreme', icon: '🔥🔥', description: '50,000+ SHU' },
];

// Mock data - in production this would come from the repository
export const mockMenuItem: MenuItem = {
  id: 'item-uuid-002',
  merchantId: 'demo-cafe-uuid-001',
  categoryId: 'cat-uuid-001',
  slug: 'cappuccino',
  name: { en: 'Cappuccino', it: 'Cappuccino', vi: 'Cappuccino' },
  description: {
    en: 'Espresso with steamed milk and foam',
    it: 'Espresso con latte caldo e schiuma',
    vi: 'Espresso với sữa nóng và bọt sữa',
  },
  price: 55000,
  currency: 'VND',
  imageUrl: '/images/menu/cappuccino.jpg',
  allergens: { milk: true },
  intolerances: { caffeine: true, lactose: true },
  dietaryFlags: { vegetarian: true, gluten_free: true },
  spiceLevel: 0,
  safetyDataSource: 'manual',
  customizations: [
    {
      id: 'size',
      type: 'radio',
      name: { en: 'Size', it: 'Dimensione', vi: 'Kích cỡ' },
      required: true,
      options: [
        {
          id: 'small',
          name: { en: 'Small (8oz)', it: 'Piccolo', vi: 'Nhỏ' },
          price_modifier: 0,
          is_default: true,
        },
        {
          id: 'medium',
          name: { en: 'Medium (12oz)', it: 'Medio', vi: 'Vừa' },
          price_modifier: 10000,
          is_default: false,
        },
        {
          id: 'large',
          name: { en: 'Large (16oz)', it: 'Grande', vi: 'Lớn' },
          price_modifier: 20000,
          is_default: false,
        },
      ],
      display_order: 1,
    },
    {
      id: 'milk-type',
      type: 'radio',
      name: { en: 'Milk Type', it: 'Tipo di Latte', vi: 'Loại Sữa' },
      required: true,
      options: [
        {
          id: 'regular',
          name: { en: 'Regular Milk', it: 'Latte Normale', vi: 'Sữa thường' },
          price_modifier: 0,
          is_default: true,
        },
        {
          id: 'oat',
          name: { en: 'Oat Milk', it: 'Latte di Avena', vi: 'Sữa yến mạch' },
          price_modifier: 15000,
          is_default: false,
        },
        {
          id: 'almond',
          name: { en: 'Almond Milk', it: 'Latte di Mandorla', vi: 'Sữa hạnh nhân' },
          price_modifier: 15000,
          is_default: false,
        },
        {
          id: 'soy',
          name: { en: 'Soy Milk', it: 'Latte di Soia', vi: 'Sữa đậu nành' },
          price_modifier: 10000,
          is_default: false,
        },
      ],
      display_order: 2,
    },
  ],
  trackInventory: false,
  lowStockThreshold: 10,
  isAvailable: true,
  isActive: true,
  isFeatured: true,
  isNew: false,
  displayOrder: 2,
  tags: ['coffee', 'classic', 'milk-based'],
  totalOrders: 3420,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-11-29T10:00:00Z',
};
