'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types from shared database
interface MultiLangText {
  en: string;
  it: string;
  vi: string;
  ko?: string;
  ja?: string;
}

interface AllergenFlags {
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

interface IntoleranceFlags {
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

interface DietaryFlags {
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

type SpiceLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface ProductCustomization {
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

interface MenuItem {
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

// Allergen list with icons for UI
const allergensList: { key: keyof AllergenFlags; label: string; icon: string; region: string }[] = [
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

const intolerancesList: { key: keyof IntoleranceFlags; label: string; icon: string }[] = [
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

const dietaryList: { key: keyof DietaryFlags; label: string; icon: string; positive: boolean }[] = [
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

const spiceLevels: { level: SpiceLevel; label: string; icon: string; description: string }[] = [
  { level: 0, label: 'None', icon: '⚪', description: 'No spice' },
  { level: 1, label: 'Mild', icon: '🌶️', description: '0-500 SHU' },
  { level: 2, label: 'Medium', icon: '🌶️🌶️', description: '500-2,500 SHU' },
  { level: 3, label: 'Hot', icon: '🌶️🌶️🌶️', description: '2,500-8,000 SHU' },
  { level: 4, label: 'Very Hot', icon: '🔥', description: '8,000-50,000 SHU' },
  { level: 5, label: 'Extreme', icon: '🔥🔥', description: '50,000+ SHU' },
];

// Mock data - in production this would come from the repository
const mockMenuItem: MenuItem = {
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
        { id: 'small', name: { en: 'Small (8oz)', it: 'Piccolo', vi: 'Nhỏ' }, price_modifier: 0, is_default: true },
        { id: 'medium', name: { en: 'Medium (12oz)', it: 'Medio', vi: 'Vừa' }, price_modifier: 10000, is_default: false },
        { id: 'large', name: { en: 'Large (16oz)', it: 'Grande', vi: 'Lớn' }, price_modifier: 20000, is_default: false },
      ],
      display_order: 1,
    },
    {
      id: 'milk-type',
      type: 'radio',
      name: { en: 'Milk Type', it: 'Tipo di Latte', vi: 'Loại Sữa' },
      required: true,
      options: [
        { id: 'regular', name: { en: 'Regular Milk', it: 'Latte Normale', vi: 'Sữa thường' }, price_modifier: 0, is_default: true },
        { id: 'oat', name: { en: 'Oat Milk', it: 'Latte di Avena', vi: 'Sữa yến mạch' }, price_modifier: 15000, is_default: false },
        { id: 'almond', name: { en: 'Almond Milk', it: 'Latte di Mandorla', vi: 'Sữa hạnh nhân' }, price_modifier: 15000, is_default: false },
        { id: 'soy', name: { en: 'Soy Milk', it: 'Latte di Soia', vi: 'Sữa đậu nành' }, price_modifier: 10000, is_default: false },
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

interface Category {
  id: string;
  slug: string;
  name_multilang: { en?: string; vi?: string };
  icon: string | null;
}

interface Ingredient {
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

interface MenuItemIngredient {
  id: string;
  ingredient_id: string;
  quantity_grams: number;
  is_optional: boolean;
  display_order: number;
  ingredient?: Ingredient;
}

type TabId = 'basic' | 'ingredients' | 'safety' | 'customizations' | 'availability' | 'seo';

export default function ProductEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [item, setItem] = useState<MenuItem | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [itemIngredients, setItemIngredients] = useState<MenuItemIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [allergenRegionFilter, setAllergenRegionFilter] = useState<string>('all');
  const [isNewItem, setIsNewItem] = useState(false);
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [showIngredientPicker, setShowIngredientPicker] = useState(false);

  // Fetch item and categories from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch categories
        const { data: catsData } = await supabase
          .from('menu_categories')
          .select('id, slug, name_multilang, icon')
          .order('display_order');
        setCategories(catsData || []);

        // Fetch all ingredients
        const { data: ingredientsData } = await supabase
          .from('ingredients')
          .select('id, slug, name_multilang, allergens, intolerances, dietary_flags, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g')
          .order('slug');
        setAllIngredients(ingredientsData || []);

        // Check if this is a new item
        if (resolvedParams.slug === 'new') {
          setIsNewItem(true);
          // Get merchant_id from first category
          const merchantId = catsData?.[0]?.id
            ? (await supabase.from('menu_categories').select('merchant_id').limit(1).single()).data?.merchant_id
            : null;

          // Create empty item for new entry
          setItem({
            id: '',
            merchantId: merchantId || '',
            slug: '',
            name: { en: '', it: '', vi: '' },
            description: { en: '', it: '', vi: '' },
            price: 0,
            currency: 'VND',
            allergens: {},
            intolerances: {},
            dietaryFlags: {},
            spiceLevel: 0,
            safetyDataSource: 'manual',
            customizations: [],
            trackInventory: false,
            lowStockThreshold: 10,
            isAvailable: true,
            isActive: true,
            isFeatured: false,
            isNew: true,
            displayOrder: 0,
            tags: [],
            totalOrders: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else {
          // Fetch existing item
          const { data: itemData, error } = await supabase
            .from('menu_items')
            .select('*')
            .eq('slug', resolvedParams.slug)
            .single();

          if (error || !itemData) {
            console.error('Item not found');
            router.push('/content/menu');
            return;
          }

          // Fetch item's ingredients
          const { data: itemIngredientsData } = await supabase
            .from('menu_item_ingredients')
            .select('id, ingredient_id, quantity_grams, is_optional, display_order')
            .eq('menu_item_id', itemData.id)
            .order('display_order');

          // Enrich with ingredient details
          const enrichedIngredients = (itemIngredientsData || []).map(ii => ({
            ...ii,
            ingredient: ingredientsData?.find(i => i.id === ii.ingredient_id),
          }));
          setItemIngredients(enrichedIngredients);

          // Convert DB format to component format
          setItem({
            id: itemData.id,
            merchantId: itemData.merchant_id,
            categoryId: itemData.category_id,
            slug: itemData.slug,
            name: itemData.name_multilang || { en: '', it: '', vi: '' },
            description: itemData.description_multilang || { en: '', it: '', vi: '' },
            price: itemData.price,
            currency: itemData.currency || 'VND',
            imageUrl: itemData.image_url,
            allergens: itemData.allergens || {},
            intolerances: itemData.intolerances || {},
            dietaryFlags: itemData.dietary_flags || {},
            spiceLevel: itemData.spice_level || 0,
            safetyDataSource: itemData.safety_data_source || 'manual',
            calories: itemData.calories,
            customizations: itemData.customizations || [],
            trackInventory: itemData.track_inventory || false,
            inventoryCount: itemData.inventory_count,
            lowStockThreshold: itemData.low_stock_threshold || 10,
            isAvailable: itemData.is_available,
            isActive: itemData.is_active,
            isFeatured: itemData.is_featured,
            isNew: itemData.is_new,
            displayOrder: itemData.display_order || 0,
            tags: itemData.tags || [],
            totalOrders: itemData.total_orders || 0,
            createdAt: itemData.created_at,
            updatedAt: itemData.updated_at,
          });
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [resolvedParams.slug, router]);

  const updateItem = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => {
    setItem(prev => prev ? { ...prev, [key]: value } : prev);
    setHasChanges(true);
  };

  const updateName = (lang: keyof MultiLangText, value: string) => {
    setItem(prev => prev ? ({
      ...prev,
      name: { ...prev.name, [lang]: value },
    }) : prev);
    setHasChanges(true);
  };

  const updateDescription = (lang: keyof MultiLangText, value: string) => {
    setItem(prev => prev ? ({
      ...prev,
      description: { ...(prev.description || { en: '', it: '', vi: '' }), [lang]: value },
    }) : prev);
    setHasChanges(true);
  };

  const toggleAllergen = (key: keyof AllergenFlags) => {
    setItem(prev => prev ? ({
      ...prev,
      allergens: { ...prev.allergens, [key]: !prev.allergens[key] },
    }) : prev);
    setHasChanges(true);
  };

  const toggleIntolerance = (key: keyof IntoleranceFlags) => {
    setItem(prev => prev ? ({
      ...prev,
      intolerances: { ...prev.intolerances, [key]: !prev.intolerances[key] },
    }) : prev);
    setHasChanges(true);
  };

  const toggleDietary = (key: keyof DietaryFlags) => {
    setItem(prev => prev ? ({
      ...prev,
      dietaryFlags: { ...prev.dietaryFlags, [key]: !prev.dietaryFlags[key] },
    }) : prev);
    setHasChanges(true);
  };

  // Ingredient management functions
  const addIngredient = async (ingredientId: string) => {
    if (!item?.id || isNewItem) {
      // For new items, just add to local state
      const ingredient = allIngredients.find(i => i.id === ingredientId);
      if (!ingredient) return;

      const newItemIngredient: MenuItemIngredient = {
        id: `temp-${Date.now()}`,
        ingredient_id: ingredientId,
        quantity_grams: 10,
        is_optional: false,
        display_order: itemIngredients.length,
        ingredient,
      };
      setItemIngredients(prev => [...prev, newItemIngredient]);
      setHasChanges(true);
      setShowIngredientPicker(false);
      return;
    }

    // For existing items, save to DB immediately
    try {
      const { data, error } = await supabase
        .from('menu_item_ingredients')
        .insert({
          menu_item_id: item.id,
          ingredient_id: ingredientId,
          quantity_grams: 10,
          is_optional: false,
          display_order: itemIngredients.length,
        })
        .select()
        .single();

      if (error) throw error;

      const ingredient = allIngredients.find(i => i.id === ingredientId);
      setItemIngredients(prev => [...prev, { ...data, ingredient }]);
      setShowIngredientPicker(false);
      computeFromIngredients([...itemIngredients, { ...data, ingredient }]);
    } catch (err) {
      console.error('Error adding ingredient:', err);
    }
  };

  const removeIngredient = async (itemIngredientId: string) => {
    if (itemIngredientId.startsWith('temp-')) {
      // Temp item, just remove from state
      setItemIngredients(prev => prev.filter(i => i.id !== itemIngredientId));
      setHasChanges(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('menu_item_ingredients')
        .delete()
        .eq('id', itemIngredientId);

      if (error) throw error;

      const remaining = itemIngredients.filter(i => i.id !== itemIngredientId);
      setItemIngredients(remaining);
      computeFromIngredients(remaining);
    } catch (err) {
      console.error('Error removing ingredient:', err);
    }
  };

  const updateIngredientQuantity = async (itemIngredientId: string, quantity: number) => {
    if (itemIngredientId.startsWith('temp-')) {
      setItemIngredients(prev => prev.map(i =>
        i.id === itemIngredientId ? { ...i, quantity_grams: quantity } : i
      ));
      setHasChanges(true);
      return;
    }

    try {
      await supabase
        .from('menu_item_ingredients')
        .update({ quantity_grams: quantity })
        .eq('id', itemIngredientId);

      setItemIngredients(prev => prev.map(i =>
        i.id === itemIngredientId ? { ...i, quantity_grams: quantity } : i
      ));
      computeFromIngredients(itemIngredients.map(i =>
        i.id === itemIngredientId ? { ...i, quantity_grams: quantity } : i
      ));
    } catch (err) {
      console.error('Error updating ingredient:', err);
    }
  };

  const toggleIngredientOptional = async (itemIngredientId: string) => {
    const ing = itemIngredients.find(i => i.id === itemIngredientId);
    if (!ing) return;

    if (itemIngredientId.startsWith('temp-')) {
      setItemIngredients(prev => prev.map(i =>
        i.id === itemIngredientId ? { ...i, is_optional: !i.is_optional } : i
      ));
      setHasChanges(true);
      return;
    }

    try {
      await supabase
        .from('menu_item_ingredients')
        .update({ is_optional: !ing.is_optional })
        .eq('id', itemIngredientId);

      setItemIngredients(prev => prev.map(i =>
        i.id === itemIngredientId ? { ...i, is_optional: !i.is_optional } : i
      ));
    } catch (err) {
      console.error('Error toggling optional:', err);
    }
  };

  // Compute allergens, intolerances, dietary flags, and nutrition from ingredients
  const computeFromIngredients = (ingredients: MenuItemIngredient[]) => {
    if (!item) return;

    // Aggregate allergens (OR logic - if any ingredient has it, product has it)
    const computedAllergens: AllergenFlags = {};
    const computedIntolerances: IntoleranceFlags = {};
    const computedDietary: DietaryFlags = {};
    let totalCalories = 0;

    ingredients.forEach(ii => {
      if (!ii.ingredient || ii.is_optional) return;

      const ing = ii.ingredient;
      const factor = ii.quantity_grams / 100;

      // Merge allergens
      Object.entries(ing.allergens || {}).forEach(([key, value]) => {
        if (value) computedAllergens[key as keyof AllergenFlags] = true;
      });

      // Merge intolerances
      Object.entries(ing.intolerances || {}).forEach(([key, value]) => {
        if (value) computedIntolerances[key as keyof IntoleranceFlags] = true;
      });

      // Merge dietary flags (for positive flags: ALL ingredients must have it, for negative: ANY)
      // For simplicity, we'll just aggregate - the UI can show computed vs manual
      Object.entries(ing.dietary_flags || {}).forEach(([key, value]) => {
        if (value) computedDietary[key as keyof DietaryFlags] = true;
      });

      // Calculate nutrition
      if (ing.calories_per_100g) {
        totalCalories += ing.calories_per_100g * factor;
      }
    });

    // Update item with computed values
    setItem(prev => prev ? ({
      ...prev,
      allergens: computedAllergens,
      intolerances: computedIntolerances,
      dietaryFlags: computedDietary,
      calories: Math.round(totalCalories),
      safetyDataSource: 'computed' as const,
    }) : prev);
    setHasChanges(true);
  };

  // Get ingredients not yet added
  const availableIngredients = allIngredients.filter(
    ing => !itemIngredients.some(ii => ii.ingredient_id === ing.id)
  );

  const filteredAvailableIngredients = ingredientSearch
    ? availableIngredients.filter(ing =>
        ing.name_multilang?.en?.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
        ing.slug.toLowerCase().includes(ingredientSearch.toLowerCase())
      )
    : availableIngredients;

  const handleSave = async () => {
    if (!item) return;
    setIsSaving(true);

    try {
      const dbData = {
        slug: item.slug || item.name.en.toLowerCase().replace(/\s+/g, '-'),
        name_multilang: item.name,
        description_multilang: item.description,
        price: item.price,
        currency: item.currency,
        category_id: item.categoryId,
        image_url: item.imageUrl,
        allergens: item.allergens,
        intolerances: item.intolerances,
        dietary_flags: item.dietaryFlags,
        spice_level: item.spiceLevel,
        calories: item.calories,
        customizations: item.customizations,
        track_inventory: item.trackInventory,
        inventory_count: item.inventoryCount,
        low_stock_threshold: item.lowStockThreshold,
        is_available: item.isAvailable,
        is_active: item.isActive,
        is_featured: item.isFeatured,
        is_new: item.isNew,
        display_order: item.displayOrder,
        tags: item.tags,
      };

      if (isNewItem) {
        // Insert new item
        const { data, error } = await supabase
          .from('menu_items')
          .insert({ ...dbData, merchant_id: item.merchantId })
          .select()
          .single();

        if (error) throw error;

        // Navigate to the new item's page
        router.push(`/content/menu/${data.slug}`);
      } else {
        // Update existing item
        const { error } = await supabase
          .from('menu_items')
          .update(dbData)
          .eq('id', item.id);

        if (error) throw error;
      }

      setHasChanges(false);
    } catch (err) {
      console.error('Error saving:', err);
      alert('Failed to save item');
    } finally {
      setIsSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  const filteredAllergens = allergenRegionFilter === 'all'
    ? allergensList
    : allergensList.filter(a => a.region === allergenRegionFilter);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'ingredients', label: 'Ingredients', icon: '🥗' },
    { id: 'safety', label: 'Safety & Dietary', icon: '⚠️' },
    { id: 'customizations', label: 'Customizations', icon: '⚙️' },
    { id: 'availability', label: 'Availability', icon: '📅' },
    { id: 'seo', label: 'SEO & Tags', icon: '🏷️' },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state - item not found
  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">404</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-500 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/content/menu')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                ← Back
              </button>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <a href="/content/menu" className="hover:text-gray-700">Menu</a>
                  <span>/</span>
                  <span className="text-gray-900">{item.name.en}</span>
                </div>
                <h1 className="mt-1 text-xl font-bold text-gray-900 flex items-center gap-2">
                  {item.name.en}
                  {item.isFeatured && <span className="text-yellow-500">⭐</span>}
                  {item.isNew && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">NEW</span>}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="text-sm text-amber-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Unsaved changes
                </span>
              )}
              <button
                onClick={() => router.push(`/preview/${item.slug}`)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Preview
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  hasChanges
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-1 border-b border-gray-200 -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            {/* Two Column Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Main Info */}
              <div className="col-span-2 space-y-6">
                {/* Names */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Name</h3>
                  <div className="space-y-4">
                    {(['en', 'vi', 'it'] as const).map(lang => (
                      <div key={lang}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {lang === 'en' ? '🇬🇧 English' : lang === 'vi' ? '🇻🇳 Vietnamese' : '🇮🇹 Italian'}
                          {lang === 'en' && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          value={item.name[lang] || ''}
                          onChange={(e) => updateName(lang, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Name in ${lang.toUpperCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Descriptions */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <div className="space-y-4">
                    {(['en', 'vi', 'it'] as const).map(lang => (
                      <div key={lang}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {lang === 'en' ? '🇬🇧 English' : lang === 'vi' ? '🇻🇳 Vietnamese' : '🇮🇹 Italian'}
                        </label>
                        <textarea
                          value={item.description?.[lang] || ''}
                          onChange={(e) => updateDescription(lang, e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Description in ${lang.toUpperCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => updateItem('categoryId', cat.id)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          item.categoryId === cat.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <p className="mt-1 font-medium text-sm">{cat.name_multilang?.en || cat.slug}</p>
                        <p className="text-xs text-gray-500">{cat.name_multilang?.vi}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Image & Pricing */}
              <div className="space-y-6">
                {/* Image */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Image</h3>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-6xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    {item.imageUrl ? (
                      <span>☕</span>
                    ) : (
                      <div className="text-center">
                        <span className="text-4xl text-gray-400">📷</span>
                        <p className="mt-2 text-sm text-gray-500">Click to upload</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem('price', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                          {item.currency}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Compare at Price
                      </label>
                      <input
                        type="number"
                        value={item.compareAtPrice || ''}
                        onChange={(e) => updateItem('compareAtPrice', e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Original price for discounts"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Total Orders</span>
                      <span className="font-semibold">{item.totalOrders.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Created</span>
                      <span className="text-sm">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Last Updated</span>
                      <span className="text-sm">{new Date(item.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === 'ingredients' && (
          <div className="space-y-6">
            {/* Ingredients List */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recipe Ingredients</h3>
                  <p className="text-sm text-gray-500">
                    Add ingredients to auto-calculate allergens, nutrition & dietary flags
                  </p>
                </div>
                <button
                  onClick={() => setShowIngredientPicker(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  + Add Ingredient
                </button>
              </div>

              {itemIngredients.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <span className="text-4xl">🥗</span>
                  <p className="mt-2 text-gray-500">No ingredients added yet</p>
                  <p className="text-sm text-gray-400">Add ingredients to auto-compute safety data</p>
                  <button
                    onClick={() => setShowIngredientPicker(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Add First Ingredient
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {itemIngredients.map((ii, index) => (
                    <div
                      key={ii.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        ii.is_optional ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      {/* Order */}
                      <span className="text-gray-400 text-sm w-6">{index + 1}.</span>

                      {/* Ingredient Info */}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {ii.ingredient?.name_multilang?.en || ii.ingredient_id}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {Object.entries(ii.ingredient?.allergens || {}).filter(([,v]) => v).slice(0, 3).map(([key]) => (
                            <span key={key} className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                              {allergensList.find(a => a.key === key)?.icon} {key}
                            </span>
                          ))}
                          {Object.entries(ii.ingredient?.allergens || {}).filter(([,v]) => v).length > 3 && (
                            <span className="text-xs text-gray-400">
                              +{Object.entries(ii.ingredient?.allergens || {}).filter(([,v]) => v).length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={ii.quantity_grams}
                          onChange={(e) => updateIngredientQuantity(ii.id, Number(e.target.value))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                          min="1"
                        />
                        <span className="text-sm text-gray-500">g</span>
                      </div>

                      {/* Optional Toggle */}
                      <button
                        onClick={() => toggleIngredientOptional(ii.id)}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          ii.is_optional
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {ii.is_optional ? 'Optional' : 'Required'}
                      </button>

                      {/* Nutrition Preview */}
                      {ii.ingredient?.calories_per_100g && (
                        <span className="text-xs text-gray-400">
                          {Math.round(ii.ingredient.calories_per_100g * ii.quantity_grams / 100)} kcal
                        </span>
                      )}

                      {/* Remove */}
                      <button
                        onClick={() => removeIngredient(ii.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Computed Summary */}
              {itemIngredients.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-blue-900">Computed from {itemIngredients.filter(i => !i.is_optional).length} Ingredients</h4>
                    <button
                      onClick={() => computeFromIngredients(itemIngredients)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Recalculate
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600">Allergens</p>
                      <p className="font-semibold text-blue-900">
                        {Object.entries(item.allergens).filter(([,v]) => v).length || 0} detected
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-600">Intolerances</p>
                      <p className="font-semibold text-blue-900">
                        {Object.entries(item.intolerances).filter(([,v]) => v).length || 0} detected
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-600">Calories</p>
                      <p className="font-semibold text-blue-900">
                        {item.calories || 0} kcal
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ingredient Picker Modal */}
            {showIngredientPicker && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[80vh] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Add Ingredient</h3>
                    <button
                      onClick={() => {
                        setShowIngredientPicker(false);
                        setIngredientSearch('');
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <input
                    type="text"
                    value={ingredientSearch}
                    onChange={(e) => setIngredientSearch(e.target.value)}
                    placeholder="Search ingredients..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                    autoFocus
                  />

                  <div className="flex-1 overflow-y-auto space-y-1">
                    {filteredAvailableIngredients.length === 0 ? (
                      <p className="text-center py-8 text-gray-500">
                        {ingredientSearch ? 'No ingredients match your search' : 'All ingredients already added'}
                      </p>
                    ) : (
                      filteredAvailableIngredients.map(ing => (
                        <button
                          key={ing.id}
                          onClick={() => addIngredient(ing.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-left transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {ing.name_multilang?.en || ing.slug}
                            </p>
                            <div className="flex gap-2 mt-1">
                              {Object.entries(ing.allergens || {}).filter(([,v]) => v).slice(0, 4).map(([key]) => (
                                <span key={key} className="text-xs text-red-600">
                                  {allergensList.find(a => a.key === key)?.icon}
                                </span>
                              ))}
                              {ing.calories_per_100g && (
                                <span className="text-xs text-gray-400">
                                  {ing.calories_per_100g} kcal/100g
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-blue-600">+ Add</span>
                        </button>
                      ))
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t text-center">
                    <a href="/content/ingredients" className="text-sm text-blue-600 hover:underline">
                      Manage Ingredients Database →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Safety & Dietary Tab */}
        {activeTab === 'safety' && (
          <div className="space-y-6">
            {/* Data Source Info */}
            {item.safetyDataSource === 'computed' && itemIngredients.length > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-medium text-green-900">Auto-Computed from Ingredients</h3>
                    <p className="text-sm text-green-700">
                      Safety data is automatically calculated from {itemIngredients.filter(i => !i.is_optional).length} ingredients.
                      You can still override values manually below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Allergens */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Allergens</h3>
                  <p className="text-sm text-gray-500">Sistema 5 Dimensioni - 30 allergens from EU, Korea, Japan + GUDBRO</p>
                </div>
                <div className="flex gap-2">
                  {['all', 'EU', 'Korea', 'Japan', 'GUDBRO'].map(region => (
                    <button
                      key={region}
                      onClick={() => setAllergenRegionFilter(region)}
                      className={`px-3 py-1 text-xs rounded-full ${
                        allergenRegionFilter === region
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {region === 'all' ? 'All' : region}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {filteredAllergens.map(allergen => (
                  <button
                    key={allergen.key}
                    onClick={() => toggleAllergen(allergen.key)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      item.allergens[allergen.key]
                        ? 'border-red-400 bg-red-50 text-red-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{allergen.icon}</span>
                    <p className="mt-1 text-xs font-medium">{allergen.label}</p>
                    <p className="text-xs text-gray-400">{allergen.region}</p>
                  </button>
                ))}
              </div>
              {Object.entries(item.allergens).filter(([, v]) => v).length > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    ⚠️ <strong>Contains:</strong>{' '}
                    {Object.entries(item.allergens)
                      .filter(([, v]) => v)
                      .map(([k]) => allergensList.find(a => a.key === k)?.label)
                      .join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Intolerances */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intolerances</h3>
              <p className="text-sm text-gray-500 mb-4">Select intolerances that may affect sensitive customers</p>
              <div className="grid grid-cols-5 gap-2">
                {intolerancesList.map(intolerance => (
                  <button
                    key={intolerance.key}
                    onClick={() => toggleIntolerance(intolerance.key)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      item.intolerances[intolerance.key]
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{intolerance.icon}</span>
                    <p className="mt-1 text-xs font-medium">{intolerance.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Flags */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dietary Compatibility</h3>
              <p className="text-sm text-gray-500 mb-4">Mark which diets this item is suitable for</p>
              <div className="grid grid-cols-4 gap-2">
                {dietaryList.map(diet => (
                  <button
                    key={diet.key}
                    onClick={() => toggleDietary(diet.key)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      item.dietaryFlags[diet.key]
                        ? diet.positive
                          ? 'border-green-400 bg-green-50 text-green-700'
                          : 'border-red-400 bg-red-50 text-red-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{diet.icon}</span>
                    <p className="mt-1 text-xs font-medium">{diet.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Spice Level */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Spice Level</h3>
              <p className="text-sm text-gray-500 mb-4">Select the heat level (Scoville scale)</p>
              <div className="flex gap-2">
                {spiceLevels.map(spice => (
                  <button
                    key={spice.level}
                    onClick={() => updateItem('spiceLevel', spice.level)}
                    className={`flex-1 p-4 rounded-lg border text-center transition-colors ${
                      item.spiceLevel === spice.level
                        ? spice.level === 0
                          ? 'border-gray-400 bg-gray-100'
                          : 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{spice.icon}</span>
                    <p className="mt-1 text-sm font-medium">{spice.label}</p>
                    <p className="text-xs text-gray-400">{spice.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Nutrition Info</h3>
                  <p className="text-sm text-gray-500">
                    {item.safetyDataSource === 'computed'
                      ? '✅ Auto-calculated from ingredients'
                      : '✏️ Manual entry (add ingredients to auto-calculate)'}
                  </p>
                </div>
                {item.calories && (
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">{item.calories}</p>
                    <p className="text-sm text-gray-500">kcal / serving</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={item.calories || ''}
                    onChange={(e) => updateItem('calories', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 150"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 5.2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 20.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 8.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Add ingredients with quantities in the Ingredients section to automatically calculate nutrition values.
                  Each ingredient has pre-defined nutrition data per 100g.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Customizations Tab */}
        {activeTab === 'customizations' && (
          <div className="space-y-6">
            {item.customizations.map((customization, index) => (
              <div key={customization.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{customization.name.en}</h3>
                    <p className="text-sm text-gray-500">
                      {customization.type === 'radio' ? 'Single choice' : 'Multiple choice'} •{' '}
                      {customization.required ? 'Required' : 'Optional'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                      ✏️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {customization.options.map(option => (
                    <div
                      key={option.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        option.is_default ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {option.is_default && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Default</span>
                        )}
                        <span className="font-medium">{option.name.en}</span>
                        <span className="text-gray-400 text-sm">{option.name.vi}</span>
                      </div>
                      <span className={option.price_modifier > 0 ? 'text-green-600' : 'text-gray-500'}>
                        {option.price_modifier > 0 && '+'}
                        {formatPrice(option.price_modifier)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              + Add Customization Group
            </button>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Active</p>
                    <p className="text-sm text-gray-500">Show this item in the menu</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isActive}
                      onChange={(e) => updateItem('isActive', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Available</p>
                    <p className="text-sm text-gray-500">Currently in stock and can be ordered</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isAvailable}
                      onChange={(e) => updateItem('isAvailable', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Featured ⭐</p>
                    <p className="text-sm text-gray-500">Show in featured section</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isFeatured}
                      onChange={(e) => updateItem('isFeatured', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">New Item 🆕</p>
                    <p className="text-sm text-gray-500">Display &quot;New&quot; badge</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isNew}
                      onChange={(e) => updateItem('isNew', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Time-based Availability */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time-based Availability</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                  <input
                    type="time"
                    value={item.availableFrom || ''}
                    onChange={(e) => updateItem('availableFrom', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available To</label>
                  <input
                    type="time"
                    value={item.availableTo || ''}
                    onChange={(e) => updateItem('availableTo', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Leave empty for all-day availability</p>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <div>
                  <p className="font-medium text-gray-900">Track Inventory</p>
                  <p className="text-sm text-gray-500">Enable stock tracking for this item</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.trackInventory}
                    onChange={(e) => updateItem('trackInventory', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              {item.trackInventory && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                    <input
                      type="number"
                      value={item.inventoryCount || 0}
                      onChange={(e) => updateItem('inventoryCount', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Alert</label>
                    <input
                      type="number"
                      value={item.lowStockThreshold}
                      onChange={(e) => updateItem('lowStockThreshold', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEO & Tags Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            {/* Slug */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">URL Slug</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">/menu/</span>
                <input
                  type="text"
                  value={item.slug}
                  onChange={(e) => updateItem('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Full URL: https://demo-cafe.gudbro.com/menu/{item.slug}
              </p>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => updateItem('tags', item.tags.filter((_, i) => i !== index))}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      const tag = input.value.trim().toLowerCase();
                      if (tag && !item.tags.includes(tag)) {
                        updateItem('tags', [...item.tags, tag]);
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Press Enter to add a tag</p>
            </div>

            {/* Display Order */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Order</h3>
              <input
                type="number"
                value={item.displayOrder}
                onChange={(e) => updateItem('displayOrder', Number(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-2 text-sm text-gray-500">Lower numbers appear first in the category</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
