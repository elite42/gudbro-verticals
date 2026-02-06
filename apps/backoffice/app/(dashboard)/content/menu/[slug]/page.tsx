'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { formatPrice as _fp } from '@gudbro/utils';
import type {
  MultiLangText,
  AllergenFlags,
  IntoleranceFlags,
  DietaryFlags,
  MenuItem,
  Category,
  Ingredient,
  MenuItemIngredient,
  TabId,
} from './components/types';
import { EditorHeader } from './components/EditorHeader';
import { BasicInfoTab } from './components/BasicInfoTab';
import { IngredientsTab } from './components/IngredientsTab';
import { SafetyDietaryTab } from './components/SafetyDietaryTab';
import { CustomizationsTab } from './components/CustomizationsTab';
import { AvailabilityTab } from './components/AvailabilityTab';
import { SeoTagsTab } from './components/SeoTagsTab';

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
          .select(
            'id, slug, name_multilang, allergens, intolerances, dietary_flags, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g'
          )
          .order('slug');
        setAllIngredients(ingredientsData || []);

        // Check if this is a new item
        if (resolvedParams.slug === 'new') {
          setIsNewItem(true);
          const merchantId = catsData?.[0]?.id
            ? (await supabase.from('menu_categories').select('merchant_id').limit(1).single()).data
                ?.merchant_id
            : null;

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

          const { data: itemIngredientsData } = await supabase
            .from('menu_item_ingredients')
            .select('id, ingredient_id, quantity_grams, is_optional, display_order')
            .eq('menu_item_id', itemData.id)
            .order('display_order');

          const enrichedIngredients = (itemIngredientsData || []).map((ii) => ({
            ...ii,
            ingredient: ingredientsData?.find((i) => i.id === ii.ingredient_id),
          }));
          setItemIngredients(enrichedIngredients);

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

  // --- State updaters ---

  const updateItem = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => {
    setItem((prev) => (prev ? { ...prev, [key]: value } : prev));
    setHasChanges(true);
  };

  const updateName = (lang: keyof MultiLangText, value: string) => {
    setItem((prev) => (prev ? { ...prev, name: { ...prev.name, [lang]: value } } : prev));
    setHasChanges(true);
  };

  const updateDescription = (lang: keyof MultiLangText, value: string) => {
    setItem((prev) =>
      prev
        ? {
            ...prev,
            description: { ...(prev.description || { en: '', it: '', vi: '' }), [lang]: value },
          }
        : prev
    );
    setHasChanges(true);
  };

  const toggleAllergen = (key: keyof AllergenFlags) => {
    setItem((prev) =>
      prev ? { ...prev, allergens: { ...prev.allergens, [key]: !prev.allergens[key] } } : prev
    );
    setHasChanges(true);
  };

  const toggleIntolerance = (key: keyof IntoleranceFlags) => {
    setItem((prev) =>
      prev
        ? { ...prev, intolerances: { ...prev.intolerances, [key]: !prev.intolerances[key] } }
        : prev
    );
    setHasChanges(true);
  };

  const toggleDietary = (key: keyof DietaryFlags) => {
    setItem((prev) =>
      prev
        ? { ...prev, dietaryFlags: { ...prev.dietaryFlags, [key]: !prev.dietaryFlags[key] } }
        : prev
    );
    setHasChanges(true);
  };

  // --- Ingredient management ---

  const computeFromIngredients = (ingredients: MenuItemIngredient[]) => {
    if (!item) return;

    const computedAllergens: AllergenFlags = {};
    const computedIntolerances: IntoleranceFlags = {};
    const computedDietary: DietaryFlags = {};
    let totalCalories = 0;

    ingredients.forEach((ii) => {
      if (!ii.ingredient || ii.is_optional) return;
      const ing = ii.ingredient;
      const factor = ii.quantity_grams / 100;

      Object.entries(ing.allergens || {}).forEach(([key, value]) => {
        if (value) computedAllergens[key as keyof AllergenFlags] = true;
      });
      Object.entries(ing.intolerances || {}).forEach(([key, value]) => {
        if (value) computedIntolerances[key as keyof IntoleranceFlags] = true;
      });
      Object.entries(ing.dietary_flags || {}).forEach(([key, value]) => {
        if (value) computedDietary[key as keyof DietaryFlags] = true;
      });
      if (ing.calories_per_100g) totalCalories += ing.calories_per_100g * factor;
    });

    setItem((prev) =>
      prev
        ? {
            ...prev,
            allergens: computedAllergens,
            intolerances: computedIntolerances,
            dietaryFlags: computedDietary,
            calories: Math.round(totalCalories),
            safetyDataSource: 'computed' as const,
          }
        : prev
    );
    setHasChanges(true);
  };

  const addIngredient = async (ingredientId: string) => {
    if (!item?.id || isNewItem) {
      const ingredient = allIngredients.find((i) => i.id === ingredientId);
      if (!ingredient) return;

      const newItemIngredient: MenuItemIngredient = {
        id: `temp-${Date.now()}`,
        ingredient_id: ingredientId,
        quantity_grams: 10,
        is_optional: false,
        display_order: itemIngredients.length,
        ingredient,
      };
      setItemIngredients((prev) => [...prev, newItemIngredient]);
      setHasChanges(true);
      setShowIngredientPicker(false);
      return;
    }

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

      const ingredient = allIngredients.find((i) => i.id === ingredientId);
      setItemIngredients((prev) => [...prev, { ...data, ingredient }]);
      setShowIngredientPicker(false);
      computeFromIngredients([...itemIngredients, { ...data, ingredient }]);
    } catch (err) {
      console.error('Error adding ingredient:', err);
    }
  };

  const removeIngredient = async (itemIngredientId: string) => {
    if (itemIngredientId.startsWith('temp-')) {
      setItemIngredients((prev) => prev.filter((i) => i.id !== itemIngredientId));
      setHasChanges(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('menu_item_ingredients')
        .delete()
        .eq('id', itemIngredientId);
      if (error) throw error;

      const remaining = itemIngredients.filter((i) => i.id !== itemIngredientId);
      setItemIngredients(remaining);
      computeFromIngredients(remaining);
    } catch (err) {
      console.error('Error removing ingredient:', err);
    }
  };

  const updateIngredientQuantity = async (itemIngredientId: string, quantity: number) => {
    if (itemIngredientId.startsWith('temp-')) {
      setItemIngredients((prev) =>
        prev.map((i) => (i.id === itemIngredientId ? { ...i, quantity_grams: quantity } : i))
      );
      setHasChanges(true);
      return;
    }

    try {
      await supabase
        .from('menu_item_ingredients')
        .update({ quantity_grams: quantity })
        .eq('id', itemIngredientId);

      setItemIngredients((prev) =>
        prev.map((i) => (i.id === itemIngredientId ? { ...i, quantity_grams: quantity } : i))
      );
      computeFromIngredients(
        itemIngredients.map((i) =>
          i.id === itemIngredientId ? { ...i, quantity_grams: quantity } : i
        )
      );
    } catch (err) {
      console.error('Error updating ingredient:', err);
    }
  };

  const toggleIngredientOptional = async (itemIngredientId: string) => {
    const ing = itemIngredients.find((i) => i.id === itemIngredientId);
    if (!ing) return;

    if (itemIngredientId.startsWith('temp-')) {
      setItemIngredients((prev) =>
        prev.map((i) => (i.id === itemIngredientId ? { ...i, is_optional: !i.is_optional } : i))
      );
      setHasChanges(true);
      return;
    }

    try {
      await supabase
        .from('menu_item_ingredients')
        .update({ is_optional: !ing.is_optional })
        .eq('id', itemIngredientId);

      setItemIngredients((prev) =>
        prev.map((i) => (i.id === itemIngredientId ? { ...i, is_optional: !i.is_optional } : i))
      );
    } catch (err) {
      console.error('Error toggling optional:', err);
    }
  };

  // --- Derived state ---

  const availableIngredients = allIngredients.filter(
    (ing) => !itemIngredients.some((ii) => ii.ingredient_id === ing.id)
  );

  const filteredAvailableIngredients = ingredientSearch
    ? availableIngredients.filter(
        (ing) =>
          ing.name_multilang?.en?.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
          ing.slug.toLowerCase().includes(ingredientSearch.toLowerCase())
      )
    : availableIngredients;

  const formatPrice = (price: number) => _fp(price, 'VND');

  // --- Save handler ---

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
        const { data, error } = await supabase
          .from('menu_items')
          .insert({ ...dbData, merchant_id: item.merchantId })
          .select()
          .single();
        if (error) throw error;
        router.push(`/content/menu/${data.slug}`);
      } else {
        const { error } = await supabase.from('menu_items').update(dbData).eq('id', item.id);
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

  // --- Render ---

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-6xl">404</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Product not found</h2>
          <p className="mb-4 text-gray-500">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/content/menu')}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EditorHeader
        item={item}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onSave={handleSave}
        onBack={() => router.back()}
        onPreview={() => router.push(`/preview/${item.slug}`)}
      />

      <div className="mx-auto max-w-5xl p-6">
        {activeTab === 'basic' && (
          <BasicInfoTab
            item={item}
            categories={categories}
            updateItem={updateItem}
            updateName={updateName}
            updateDescription={updateDescription}
            formatPrice={formatPrice}
          />
        )}

        {activeTab === 'ingredients' && (
          <IngredientsTab
            item={item}
            itemIngredients={itemIngredients}
            ingredientSearch={ingredientSearch}
            setIngredientSearch={setIngredientSearch}
            showIngredientPicker={showIngredientPicker}
            setShowIngredientPicker={setShowIngredientPicker}
            filteredAvailableIngredients={filteredAvailableIngredients}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            updateIngredientQuantity={updateIngredientQuantity}
            toggleIngredientOptional={toggleIngredientOptional}
            computeFromIngredients={computeFromIngredients}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyDietaryTab
            item={item}
            itemIngredients={itemIngredients}
            updateItem={updateItem}
            toggleAllergen={toggleAllergen}
            toggleIntolerance={toggleIntolerance}
            toggleDietary={toggleDietary}
          />
        )}

        {activeTab === 'customizations' && (
          <CustomizationsTab item={item} formatPrice={formatPrice} />
        )}

        {activeTab === 'availability' && <AvailabilityTab item={item} updateItem={updateItem} />}

        {activeTab === 'seo' && <SeoTagsTab item={item} updateItem={updateItem} />}
      </div>
    </div>
  );
}
