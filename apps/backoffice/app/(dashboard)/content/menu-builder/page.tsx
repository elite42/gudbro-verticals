'use client';

import { useState } from 'react';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { formatPrice as _fp } from '@gudbro/utils';

// Types based on our food-database
type DietaryTag = 'vegan' | 'vegetarian' | 'gluten_free' | 'dairy_free' | 'keto' | 'halal';
type Allergen = 'gluten' | 'dairy' | 'eggs' | 'nuts' | 'soy' | 'fish' | 'shellfish';

interface MasterRecipe {
  id: string;
  slug: string;
  name: { en: string; vi: string; ko?: string };
  description: { en: string; vi: string };
  category: string;
  tags: string[];
  dietaryTags: DietaryTag[];
  allergens: Allergen[];
  prepTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedPrice: number;
  foodCostPercentage: number;
  image: string;
  ingredients: { name: string; quantity: string; isOptional?: boolean }[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Sample data from our seed data
const sampleRecipes: MasterRecipe[] = [
  {
    id: '1',
    slug: 'vietnamese-egg-coffee',
    name: { en: 'Vietnamese Egg Coffee', vi: 'Cà Phê Trứng' },
    description: {
      en: 'Traditional Hanoi-style egg coffee with rich, creamy foam',
      vi: 'Cà phê trứng truyền thống Hà Nội với bọt kem béo ngậy',
    },
    category: 'hot_coffee',
    tags: ['signature', 'vietnamese', 'traditional', 'bestseller'],
    dietaryTags: ['vegetarian', 'gluten_free'],
    allergens: ['eggs', 'dairy'],
    prepTime: 10,
    difficulty: 'medium',
    suggestedPrice: 55000,
    foodCostPercentage: 25,
    image: '/images/egg-coffee.jpg',
    ingredients: [
      { name: 'Vietnamese robusta coffee', quantity: '25g' },
      { name: 'Egg yolk', quantity: '1' },
      { name: 'Condensed milk', quantity: '2 tbsp' },
    ],
    nutrition: { calories: 150, protein: 4, carbs: 18, fat: 7 },
  },
  {
    id: '2',
    slug: 'coconut-cold-brew',
    name: { en: 'Coconut Cold Brew', vi: 'Cold Brew Dừa' },
    description: {
      en: 'Smooth cold brew with creamy coconut milk',
      vi: 'Cold brew mượt mà với sữa dừa béo ngậy',
    },
    category: 'iced_coffee',
    tags: ['refreshing', 'tropical', 'vegan-option'],
    dietaryTags: ['vegan', 'dairy_free', 'gluten_free'],
    allergens: [],
    prepTime: 5,
    difficulty: 'easy',
    suggestedPrice: 65000,
    foodCostPercentage: 22,
    image: '/images/coconut-cold-brew.jpg',
    ingredients: [
      { name: 'Cold brew coffee', quantity: '150ml' },
      { name: 'Coconut milk', quantity: '100ml' },
      { name: 'Ice', quantity: 'as needed' },
    ],
    nutrition: { calories: 120, protein: 1, carbs: 8, fat: 10 },
  },
  {
    id: '3',
    slug: 'matcha-latte',
    name: { en: 'Matcha Latte', vi: 'Matcha Latte', ko: '말차 라떼' },
    description: {
      en: 'Premium ceremonial-grade Japanese matcha',
      vi: 'Matcha Nhật Bản cao cấp',
    },
    category: 'hot_tea',
    tags: ['healthy', 'japanese', 'antioxidants'],
    dietaryTags: ['vegetarian', 'gluten_free'],
    allergens: ['dairy'],
    prepTime: 5,
    difficulty: 'medium',
    suggestedPrice: 70000,
    foodCostPercentage: 30,
    image: '/images/matcha-latte.jpg',
    ingredients: [
      { name: 'Matcha powder', quantity: '2g' },
      { name: 'Hot water', quantity: '30ml' },
      { name: 'Steamed milk', quantity: '250ml' },
    ],
    nutrition: { calories: 180, protein: 8, carbs: 20, fat: 7 },
  },
  {
    id: '4',
    slug: 'tropical-smoothie-bowl',
    name: { en: 'Tropical Smoothie Bowl', vi: 'Bowl Sinh Tố Nhiệt Đới' },
    description: {
      en: 'Thick frozen blend of mango, pineapple, and banana',
      vi: 'Hỗn hợp đông lạnh đặc từ xoài, dứa và chuối',
    },
    category: 'smoothies',
    tags: ['healthy', 'breakfast', 'instagram'],
    dietaryTags: ['vegan', 'dairy_free', 'gluten_free'],
    allergens: [],
    prepTime: 10,
    difficulty: 'easy',
    suggestedPrice: 85000,
    foodCostPercentage: 30,
    image: '/images/tropical-bowl.jpg',
    ingredients: [
      { name: 'Frozen mango', quantity: '100g' },
      { name: 'Frozen pineapple', quantity: '50g' },
      { name: 'Banana', quantity: '1' },
      { name: 'Coconut milk', quantity: '100ml' },
      { name: 'Granola', quantity: '30g', isOptional: true },
    ],
    nutrition: { calories: 320, protein: 5, carbs: 65, fat: 8 },
  },
  {
    id: '5',
    slug: 'avocado-toast',
    name: { en: 'Avocado Toast', vi: 'Bánh Mì Nướng Bơ' },
    description: {
      en: 'Sourdough with smashed avocado and poached egg',
      vi: 'Bánh mì chua với bơ nghiền và trứng chần',
    },
    category: 'breakfast',
    tags: ['healthy', 'brunch', 'protein'],
    dietaryTags: ['vegetarian'],
    allergens: ['gluten', 'eggs'],
    prepTime: 10,
    difficulty: 'easy',
    suggestedPrice: 95000,
    foodCostPercentage: 30,
    image: '/images/avocado-toast.jpg',
    ingredients: [
      { name: 'Sourdough bread', quantity: '2 slices' },
      { name: 'Avocado', quantity: '1' },
      { name: 'Egg', quantity: '1' },
      { name: 'Cherry tomatoes', quantity: '5' },
    ],
    nutrition: { calories: 420, protein: 14, carbs: 35, fat: 28 },
  },
  {
    id: '6',
    slug: 'banh-mi',
    name: { en: 'Bánh Mì Sandwich', vi: 'Bánh Mì Thịt' },
    description: {
      en: 'Crispy Vietnamese baguette with grilled pork',
      vi: 'Bánh mì giòn nhân thịt nướng',
    },
    category: 'sandwiches',
    tags: ['vietnamese', 'classic', 'street-food', 'bestseller'],
    dietaryTags: [],
    allergens: ['gluten', 'eggs', 'soy'],
    prepTime: 10,
    difficulty: 'medium',
    suggestedPrice: 45000,
    foodCostPercentage: 28,
    image: '/images/banh-mi.jpg',
    ingredients: [
      { name: 'Vietnamese baguette', quantity: '1' },
      { name: 'Grilled pork', quantity: '80g' },
      { name: 'Pâté', quantity: '1 tbsp' },
      { name: 'Pickled vegetables', quantity: '30g' },
      { name: 'Fresh herbs', quantity: 'as needed' },
    ],
    nutrition: { calories: 380, protein: 22, carbs: 42, fat: 14 },
  },
];

const categories = [
  { id: 'all', name: 'All Recipes', icon: '📋' },
  { id: 'hot_coffee', name: 'Hot Coffee', icon: '☕' },
  { id: 'iced_coffee', name: 'Iced Coffee', icon: '🧊' },
  { id: 'hot_tea', name: 'Hot Tea', icon: '🍵' },
  { id: 'smoothies', name: 'Smoothies', icon: '🥤' },
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
];

const dietaryFilters: { id: DietaryTag; label: string; icon: string }[] = [
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { id: 'gluten_free', label: 'Gluten-Free', icon: '🌾' },
  { id: 'dairy_free', label: 'Dairy-Free', icon: '🥛' },
  { id: 'keto', label: 'Keto', icon: '🥑' },
  { id: 'halal', label: 'Halal', icon: '☪️' },
];

export default function MenuBuilderPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<MasterRecipe | null>(null);
  const [addedToMenu, setAddedToMenu] = useState<string[]>([]);

  const filteredRecipes = sampleRecipes.filter((recipe) => {
    // Category filter
    if (selectedCategory !== 'all' && recipe.category !== selectedCategory) {
      return false;
    }

    // Dietary filter
    if (selectedDietary.length > 0) {
      const hasAllTags = selectedDietary.every((tag) => recipe.dietaryTags.includes(tag));
      if (!hasAllTags) return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        recipe.name.en.toLowerCase().includes(query) ||
        recipe.name.vi.toLowerCase().includes(query) ||
        recipe.tags.some((tag) => tag.includes(query))
      );
    }

    return true;
  });

  const formatPrice = (price: number) => _fp(price, 'VND');

  const toggleDietary = (tag: DietaryTag) => {
    if (selectedDietary.includes(tag)) {
      setSelectedDietary(selectedDietary.filter((t) => t !== tag));
    } else {
      setSelectedDietary([...selectedDietary, tag]);
    }
  };

  const addToMenu = (recipeId: string) => {
    if (!addedToMenu.includes(recipeId)) {
      setAddedToMenu([...addedToMenu, recipeId]);
    }
  };

  const removeFromMenu = (recipeId: string) => {
    setAddedToMenu(addedToMenu.filter((id) => id !== recipeId));
  };

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Menu Builder</h1>
              <InfoTooltip contentKey="pages.menuBuilder" kbPageId="content-menu-builder" />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Browse our recipe library and add items to your menu
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{addedToMenu.length} items in menu</span>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Save Menu
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search recipes by name, ingredient, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex flex-wrap gap-2">
            {dietaryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleDietary(filter.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedDietary.includes(filter.id)
                    ? 'border border-green-300 bg-green-100 text-green-700'
                    : 'border border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
            {selectedDietary.length > 0 && (
              <button
                onClick={() => setSelectedDietary([])}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`cursor-pointer overflow-hidden rounded-xl border bg-white transition-all hover:shadow-md ${
                addedToMenu.includes(recipe.id)
                  ? 'border-green-400 ring-2 ring-green-100'
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              {/* Image */}
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-6xl">
                {recipe.category.includes('coffee') && '☕'}
                {recipe.category.includes('tea') && '🍵'}
                {recipe.category === 'smoothies' && '🥤'}
                {recipe.category === 'breakfast' && '🍳'}
                {recipe.category === 'sandwiches' && '🥪'}

                {addedToMenu.includes(recipe.id) && (
                  <div className="absolute right-2 top-2 rounded-full bg-green-500 p-1 text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {recipe.tags.includes('bestseller') && (
                  <div className="absolute left-2 top-2 rounded-full bg-yellow-500 px-2 py-1 text-xs text-white">
                    Bestseller
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{recipe.name.en}</h3>
                    <p className="text-sm text-gray-500">{recipe.name.vi}</p>
                  </div>
                  <span className="font-bold text-blue-600">
                    {formatPrice(recipe.suggestedPrice)}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{recipe.description.en}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {recipe.dietaryTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700"
                    >
                      {tag.replace('_', '-')}
                    </span>
                  ))}
                  {recipe.allergens.length > 0 && (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                      Contains: {recipe.allergens.slice(0, 2).join(', ')}
                    </span>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <span>⏱️ {recipe.prepTime} min</span>
                  <span>📊 {recipe.foodCostPercentage}% cost</span>
                  <span>🔥 {recipe.nutrition.calories} cal</span>
                </div>

                {/* Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (addedToMenu.includes(recipe.id)) {
                      removeFromMenu(recipe.id);
                    } else {
                      addToMenu(recipe.id);
                    }
                  }}
                  className={`mt-4 w-full rounded-lg py-2 text-sm font-medium transition-colors ${
                    addedToMenu.includes(recipe.id)
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {addedToMenu.includes(recipe.id) ? '✓ Added to Menu' : '+ Add to Menu'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="py-12 text-center">
            <span className="text-6xl">🔍</span>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No recipes found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Recipe Detail Sidebar */}
      {selectedRecipe && (
        <div className="w-96 overflow-auto border-l border-gray-200 bg-white">
          <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-4">
            <h2 className="font-semibold text-gray-900">Recipe Details</h2>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6 p-4">
            {/* Header */}
            <div>
              <div className="flex h-48 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-7xl">
                {selectedRecipe.category.includes('coffee') && '☕'}
                {selectedRecipe.category.includes('tea') && '🍵'}
                {selectedRecipe.category === 'smoothies' && '🥤'}
                {selectedRecipe.category === 'breakfast' && '🍳'}
                {selectedRecipe.category === 'sandwiches' && '🥪'}
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">{selectedRecipe.name.en}</h3>
              <p className="text-gray-500">{selectedRecipe.name.vi}</p>
              <p className="mt-2 text-gray-600">{selectedRecipe.description.en}</p>
            </div>

            {/* Price & Cost */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-blue-600">Suggested Price</p>
                <p className="text-xl font-bold text-blue-900">
                  {formatPrice(selectedRecipe.suggestedPrice)}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm text-green-600">Food Cost</p>
                <p className="text-xl font-bold text-green-900">
                  {selectedRecipe.foodCostPercentage}%
                </p>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Ingredients</h4>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center justify-between text-sm">
                    <span className={ing.isOptional ? 'text-gray-400' : 'text-gray-700'}>
                      {ing.name} {ing.isOptional && '(optional)'}
                    </span>
                    <span className="text-gray-500">{ing.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutrition */}
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Nutrition per serving</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="rounded bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">
                    {selectedRecipe.nutrition.calories}
                  </p>
                  <p className="text-xs text-gray-500">Calories</p>
                </div>
                <div className="rounded bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">
                    {selectedRecipe.nutrition.protein}g
                  </p>
                  <p className="text-xs text-gray-500">Protein</p>
                </div>
                <div className="rounded bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">
                    {selectedRecipe.nutrition.carbs}g
                  </p>
                  <p className="text-xs text-gray-500">Carbs</p>
                </div>
                <div className="rounded bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{selectedRecipe.nutrition.fat}g</p>
                  <p className="text-xs text-gray-500">Fat</p>
                </div>
              </div>
            </div>

            {/* Dietary & Allergens */}
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Dietary Info</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRecipe.dietaryTags.map((tag) => (
                  <span key={tag} className="rounded bg-green-100 px-2 py-1 text-sm text-green-700">
                    {tag.replace('_', '-')}
                  </span>
                ))}
              </div>
              {selectedRecipe.allergens.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-red-600">
                    ⚠️ Contains: {selectedRecipe.allergens.join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  if (addedToMenu.includes(selectedRecipe.id)) {
                    removeFromMenu(selectedRecipe.id);
                  } else {
                    addToMenu(selectedRecipe.id);
                  }
                }}
                className={`w-full rounded-lg py-3 font-medium ${
                  addedToMenu.includes(selectedRecipe.id)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {addedToMenu.includes(selectedRecipe.id) ? '✓ Added to Menu' : '+ Add to My Menu'}
              </button>
              <button className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50">
                Customize Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
