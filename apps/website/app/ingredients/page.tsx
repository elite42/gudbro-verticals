import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Ingredients Database - Nutrition, Allergens & Recipes | GUDBRO',
  description: 'Explore our comprehensive database of 2500+ ingredients with nutrition facts, allergen information, dietary compatibility, and recipe suggestions.',
};

// Mock categories - In production, aggregated from Supabase
const categories = [
  { name: 'Vegetables', slug: 'vegetables', count: 235, icon: '🥬', color: 'from-green-100 to-green-200' },
  { name: 'Fruits', slug: 'fruits', count: 264, icon: '🍎', color: 'from-red-100 to-red-200' },
  { name: 'Cheese', slug: 'cheese', count: 226, icon: '🧀', color: 'from-yellow-100 to-yellow-200' },
  { name: 'Spices', slug: 'spices', count: 153, icon: '🌶️', color: 'from-orange-100 to-orange-200' },
  { name: 'Grains', slug: 'grains', count: 144, icon: '🌾', color: 'from-amber-100 to-amber-200' },
  { name: 'Seafood', slug: 'seafood', count: 69, icon: '🐟', color: 'from-blue-100 to-blue-200' },
  { name: 'Red Meat', slug: 'red_meat', count: 92, icon: '🥩', color: 'from-rose-100 to-rose-200' },
  { name: 'Poultry', slug: 'poultry', count: 27, icon: '🍗', color: 'from-orange-100 to-orange-200' },
  { name: 'Dairy', slug: 'dairy', count: 54, icon: '🥛', color: 'from-sky-100 to-sky-200' },
  { name: 'Herbs', slug: 'herbs', count: 87, icon: '🌿', color: 'from-emerald-100 to-emerald-200' },
  { name: 'Nuts', slug: 'nuts', count: 36, icon: '🥜', color: 'from-amber-100 to-amber-200' },
  { name: 'Legumes', slug: 'legumes', count: 43, icon: '🫘', color: 'from-stone-100 to-stone-200' },
  { name: 'Pasta', slug: 'pasta', count: 38, icon: '🍝', color: 'from-yellow-100 to-yellow-200' },
  { name: 'Sauces', slug: 'sauces', count: 108, icon: '🥫', color: 'from-red-100 to-red-200' },
  { name: 'Spirits', slug: 'spirits', count: 55, icon: '🥃', color: 'from-amber-100 to-amber-200' },
  { name: 'Wines', slug: 'wines', count: 19, icon: '🍷', color: 'from-purple-100 to-purple-200' },
];

// Featured ingredients
const featuredIngredients = [
  { name: 'Parmesan Cheese', slug: 'parmesan-cheese', category: 'cheese', icon: '🧀' },
  { name: 'Olive Oil', slug: 'olive-oil', category: 'oils', icon: '🫒' },
  { name: 'Garlic', slug: 'garlic', category: 'vegetables', icon: '🧄' },
  { name: 'Salmon', slug: 'salmon', category: 'seafood', icon: '🐟' },
  { name: 'Basil', slug: 'basil', category: 'herbs', icon: '🌿' },
  { name: 'Wagyu Beef', slug: 'wagyu-beef', category: 'red_meat', icon: '🥩' },
];

export default function IngredientsIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Food Ingredients Database
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
              Explore 2,500+ ingredients with complete nutrition facts, allergen information, and dietary compatibility.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-300"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-8 text-sm">
              <div>
                <p className="text-3xl font-bold">2,548</p>
                <p className="text-green-200">Ingredients</p>
              </div>
              <div>
                <p className="text-3xl font-bold">30</p>
                <p className="text-green-200">Allergens Tracked</p>
              </div>
              <div>
                <p className="text-3xl font-bold">11</p>
                <p className="text-green-200">Diets Supported</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/ingredients/category/${category.slug}`}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1`}
              >
                <span className="text-4xl block mb-2">{category.icon}</span>
                <p className="font-medium text-gray-900 text-sm">{category.name}</p>
                <p className="text-xs text-gray-500">{category.count} items</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Ingredients */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Ingredients</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredIngredients.map((ingredient) => (
              <Link
                key={ingredient.slug}
                href={`/ingredients/${ingredient.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
              >
                <span className="text-4xl">{ingredient.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{ingredient.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{ingredient.category.replace('_', ' ')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Filter by Diet */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Filter by Dietary Needs</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Gluten-Free', icon: '🌾', slug: 'gluten-free' },
                { name: 'Vegan', icon: '🌱', slug: 'vegan' },
                { name: 'Vegetarian', icon: '🥗', slug: 'vegetarian' },
                { name: 'Dairy-Free', icon: '🥛', slug: 'dairy-free' },
                { name: 'Nut-Free', icon: '🥜', slug: 'nut-free' },
                { name: 'Halal', icon: '☪️', slug: 'halal' },
                { name: 'Kosher', icon: '✡️', slug: 'kosher' },
                { name: 'Low-Carb', icon: '🥑', slug: 'low-carb' },
              ].map((diet) => (
                <Link
                  key={diet.slug}
                  href={`/ingredients/diet/${diet.slug}`}
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
                >
                  <span>{diet.icon}</span>
                  <span className="font-medium text-gray-700">{diet.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need This Data for Your App?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Access our complete ingredient database via API. Get nutrition facts, allergens, and dietary information for 2,500+ ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/api-docs"
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                View API Docs
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
