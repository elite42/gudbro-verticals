import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recipes from 75 World Cuisines - Authentic Dishes | GUDBRO',
  description: 'Discover 4,600+ authentic recipes from 75 world cuisines. Complete with nutrition facts, allergen information, wine pairings, and step-by-step instructions.',
};

// Cuisines data
const cuisines = [
  { name: 'Italian', slug: 'italian', count: 102, icon: '🇮🇹', region: 'Europe' },
  { name: 'Japanese', slug: 'japanese', count: 173, icon: '🇯🇵', region: 'Asia' },
  { name: 'Mexican', slug: 'mexican', count: 66, icon: '🇲🇽', region: 'Americas' },
  { name: 'French', slug: 'french', count: 58, icon: '🇫🇷', region: 'Europe' },
  { name: 'Thai', slug: 'thai', count: 69, icon: '🇹🇭', region: 'Asia' },
  { name: 'Indian', slug: 'indian', count: 65, icon: '🇮🇳', region: 'Asia' },
  { name: 'Chinese', slug: 'chinese', count: 73, icon: '🇨🇳', region: 'Asia' },
  { name: 'Korean', slug: 'korean', count: 77, icon: '🇰🇷', region: 'Asia' },
  { name: 'Spanish', slug: 'spanish', count: 55, icon: '🇪🇸', region: 'Europe' },
  { name: 'Vietnamese', slug: 'vietnamese', count: 72, icon: '🇻🇳', region: 'Asia' },
  { name: 'Greek', slug: 'greek', count: 74, icon: '🇬🇷', region: 'Europe' },
  { name: 'Turkish', slug: 'turkish', count: 98, icon: '🇹🇷', region: 'Europe' },
];

// Dish categories
const dishCategories = [
  { name: 'Pasta', slug: 'pasta', count: 87, icon: '🍝' },
  { name: 'Pizza', slug: 'pizzas', count: 62, icon: '🍕' },
  { name: 'Steaks', slug: 'steaks', count: 100, icon: '🥩' },
  { name: 'Seafood', slug: 'seafood', count: 63, icon: '🦐' },
  { name: 'Burgers', slug: 'burgers', count: 45, icon: '🍔' },
  { name: 'Salads', slug: 'salads', count: 52, icon: '🥗' },
  { name: 'Soups', slug: 'soups', count: 39, icon: '🍲' },
  { name: 'Desserts', slug: 'desserts', count: 35, icon: '🍰' },
];

// Featured recipes
const featuredRecipes = [
  {
    name: 'Spaghetti Carbonara',
    slug: 'spaghetti-carbonara',
    cuisine: 'Italian',
    time: 30,
    difficulty: 'Medium',
    image: null,
    rating: 4.8,
  },
  {
    name: 'Pad Thai',
    slug: 'pad-thai',
    cuisine: 'Thai',
    time: 25,
    difficulty: 'Easy',
    image: null,
    rating: 4.7,
  },
  {
    name: 'Beef Tacos',
    slug: 'beef-tacos',
    cuisine: 'Mexican',
    time: 20,
    difficulty: 'Easy',
    image: null,
    rating: 4.6,
  },
  {
    name: 'Sushi Roll',
    slug: 'california-roll',
    cuisine: 'Japanese',
    time: 45,
    difficulty: 'Hard',
    image: null,
    rating: 4.9,
  },
  {
    name: 'Margherita Pizza',
    slug: 'pizza-margherita',
    cuisine: 'Italian',
    time: 35,
    difficulty: 'Medium',
    image: null,
    rating: 4.8,
  },
  {
    name: 'Chicken Tikka Masala',
    slug: 'chicken-tikka-masala',
    cuisine: 'Indian',
    time: 45,
    difficulty: 'Medium',
    image: null,
    rating: 4.7,
  },
];

// Recipe card component
function RecipeCard({ recipe }: { recipe: typeof featuredRecipes[0] }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center">
        <span className="text-6xl">🍝</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{recipe.cuisine}</span>
          <span>•</span>
          <span>{recipe.time} min</span>
          <span>•</span>
          <span>{recipe.difficulty}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{recipe.name}</h3>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">{recipe.rating}</span>
        </div>
      </div>
    </Link>
  );
}

export default function RecipesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              World Recipes Database
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8">
              Discover 4,600+ authentic recipes from 75 cuisines around the world. Complete with nutrition, allergens, and wine pairings.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-8 text-sm">
              <div>
                <p className="text-3xl font-bold">4,653</p>
                <p className="text-orange-200">Recipes</p>
              </div>
              <div>
                <p className="text-3xl font-bold">75</p>
                <p className="text-orange-200">Cuisines</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-orange-200">With Nutrition</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Recipes</h2>
            <Link href="/recipes/popular" className="text-orange-600 hover:text-orange-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* Browse by Cuisine */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Cuisine</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cuisines.map((cuisine) => (
                <Link
                  key={cuisine.slug}
                  href={`/recipes/cuisine/${cuisine.slug}`}
                  className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 text-center transition-all hover:-translate-y-1"
                >
                  <span className="text-4xl block mb-2">{cuisine.icon}</span>
                  <p className="font-medium text-gray-900">{cuisine.name}</p>
                  <p className="text-sm text-gray-500">{cuisine.count} recipes</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/recipes/cuisines" className="text-orange-600 hover:text-orange-700 font-medium">
                View all 75 cuisines →
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by Category */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dishCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/recipes/category/${category.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
              >
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-500">{category.count} recipes</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Filter by Diet */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dietary Preferences</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Vegetarian', icon: '🥗', slug: 'vegetarian', count: 890 },
                { name: 'Vegan', icon: '🌱', slug: 'vegan', count: 420 },
                { name: 'Gluten-Free', icon: '🌾', slug: 'gluten-free', count: 1200 },
                { name: 'Dairy-Free', icon: '🥛', slug: 'dairy-free', count: 980 },
                { name: 'Keto', icon: '🥑', slug: 'keto', count: 340 },
                { name: 'Halal', icon: '☪️', slug: 'halal', count: 2100 },
                { name: 'Pescatarian', icon: '🐟', slug: 'pescatarian', count: 560 },
                { name: 'Nut-Free', icon: '🥜', slug: 'nut-free', count: 3200 },
              ].map((diet) => (
                <Link
                  key={diet.slug}
                  href={`/recipes/diet/${diet.slug}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 px-4 py-3 rounded-xl shadow-sm transition-colors"
                >
                  <span className="text-xl">{diet.icon}</span>
                  <div>
                    <span className="font-medium text-gray-700">{diet.name}</span>
                    <span className="text-sm text-gray-400 ml-2">({diet.count})</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Filters */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Filters</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/recipes/quick" className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 hover:shadow-lg transition-all">
              <span className="text-3xl block mb-2">⚡</span>
              <h3 className="font-bold text-lg">Under 30 Minutes</h3>
              <p className="text-green-100 text-sm">Quick weeknight dinners</p>
            </Link>
            <Link href="/recipes/easy" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 hover:shadow-lg transition-all">
              <span className="text-3xl block mb-2">👶</span>
              <h3 className="font-bold text-lg">Beginner Friendly</h3>
              <p className="text-blue-100 text-sm">Simple recipes for beginners</p>
            </Link>
            <Link href="/recipes/healthy" className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-6 hover:shadow-lg transition-all">
              <span className="text-3xl block mb-2">💪</span>
              <h3 className="font-bold text-lg">Healthy & Light</h3>
              <p className="text-teal-100 text-sm">Low-calorie options</p>
            </Link>
            <Link href="/recipes/comfort" className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 hover:shadow-lg transition-all">
              <span className="text-3xl block mb-2">🍲</span>
              <h3 className="font-bold text-lg">Comfort Food</h3>
              <p className="text-orange-100 text-sm">Soul-warming classics</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Add These Recipes to Your Menu</h2>
                <p className="text-gray-300 mb-6">
                  Create a professional digital menu for your restaurant. Import any recipe from our database with automatic allergen labeling and nutrition info.
                </p>
                <Link
                  href="/sign-up"
                  className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
              <div className="text-center">
                <span className="text-8xl">📱</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
