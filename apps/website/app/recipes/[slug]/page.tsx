import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PrintButton } from '@/components/ui/PrintButton';
import { ServingsSelector } from '@/components/recipes/ServingsSelector';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Mock data - In production, this would come from Supabase
const mockRecipe = {
  id: 'PST_CARBONARA',
  name: 'Spaghetti Carbonara',
  slug: 'spaghetti-carbonara',
  cuisine: 'Italian',
  category: 'pasta',
  dish_type: 'main',
  description: 'A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper. Authentic carbonara relies on the emulsion of eggs and cheese to create its signature creamy sauce - no cream needed!',
  image_url: null,

  // Origin
  origin: {
    country: 'Italy',
    region: 'Lazio',
    city: 'Rome'
  },

  // Times & Difficulty
  prep_time_min: 10,
  cook_time_min: 20,
  total_time_min: 30,
  servings: 4,
  difficulty: 2, // 1-5 scale

  // Computed 5 Dimensions (from ingredients)
  allergens: ['eggs', 'gluten', 'milk'],
  intolerances: ['lactose', 'gluten_sensitivity'],
  dietary: {
    vegan: false,
    vegetarian: false,
    gluten_free: false,
    dairy_free: false,
    nut_free: true,
    halal: false,
    kosher: false,
    pescatarian: false,
  },
  nutrition_per_serving: {
    calories: 650,
    protein: 28,
    fat: 32,
    carbohydrates: 58,
    fiber: 3,
    sugar: 2,
    sodium: 890,
  },
  spice_level: 1,

  // Ingredients with quantities
  ingredients: [
    { id: 'ING_SPAGHETTI', name: 'Spaghetti', quantity: 400, unit: 'g', role: 'main', slug: 'spaghetti' },
    { id: 'ING_GUANCIALE', name: 'Guanciale', quantity: 200, unit: 'g', role: 'main', slug: 'guanciale', note: 'or pancetta as substitute' },
    { id: 'ING_EGG_YOLK', name: 'Egg Yolks', quantity: 6, unit: 'pcs', role: 'main', slug: 'egg-yolk' },
    { id: 'ING_EGG', name: 'Whole Eggs', quantity: 2, unit: 'pcs', role: 'main', slug: 'egg' },
    { id: 'ING_PECORINO', name: 'Pecorino Romano', quantity: 100, unit: 'g', role: 'main', slug: 'pecorino-romano', note: 'freshly grated' },
    { id: 'ING_PARMESAN', name: 'Parmigiano-Reggiano', quantity: 50, unit: 'g', role: 'secondary', slug: 'parmesan-cheese', note: 'optional, for a milder taste' },
    { id: 'ING_BLACK_PEPPER', name: 'Black Pepper', quantity: 2, unit: 'tsp', role: 'seasoning', slug: 'black-pepper', note: 'freshly ground' },
    { id: 'ING_SALT', name: 'Salt', quantity: 1, unit: 'tbsp', role: 'seasoning', slug: 'salt', note: 'for pasta water' },
  ],

  // Recipe Steps
  steps: [
    {
      order: 1,
      title: 'Prepare the Egg Mixture',
      instruction: 'In a large bowl, whisk together the egg yolks, whole eggs, grated Pecorino Romano, and half of the black pepper. Set aside.',
      tip: 'Make sure the eggs are at room temperature for a smoother emulsion.',
      duration_min: 5
    },
    {
      order: 2,
      title: 'Cook the Guanciale',
      instruction: 'Cut the guanciale into small strips or cubes. In a large cold pan, add the guanciale and cook over medium-low heat until the fat renders and the meat becomes crispy. This should take about 8-10 minutes.',
      tip: 'Starting with a cold pan allows the fat to render slowly without burning the meat.',
      duration_min: 10
    },
    {
      order: 3,
      title: 'Cook the Pasta',
      instruction: 'Bring a large pot of salted water to boil. Cook the spaghetti according to package directions until al dente. Reserve 1 cup of pasta water before draining.',
      tip: 'The starchy pasta water is crucial for creating the creamy sauce.',
      duration_min: 10
    },
    {
      order: 4,
      title: 'Combine Pasta and Guanciale',
      instruction: 'Remove the pan with guanciale from heat. Add the drained pasta to the pan and toss to coat with the rendered fat.',
      tip: 'Taking the pan off heat prevents the eggs from scrambling.',
      duration_min: 2
    },
    {
      order: 5,
      title: 'Create the Sauce',
      instruction: 'While the pasta is still hot but the pan is off heat, pour the egg mixture over the pasta. Toss vigorously, adding pasta water a little at a time until you achieve a creamy, glossy sauce that coats each strand.',
      tip: 'The residual heat will cook the eggs gently. If the sauce is too thick, add more pasta water.',
      duration_min: 3
    },
    {
      order: 6,
      title: 'Serve Immediately',
      instruction: 'Divide among warmed plates. Top with remaining black pepper and extra Pecorino. Serve immediately.',
      tip: 'Carbonara waits for no one - it should be served right away!',
      duration_min: 2
    }
  ],

  // History & Story
  history: `The origins of Carbonara are debated, but most food historians agree it emerged in Rome during or shortly after World War II. One popular theory suggests American GIs combined their rations of bacon and eggs with Italian pasta. Another theory credits the "carbonari" (charcoal workers) who needed a hearty, protein-rich meal.

Whatever its true origin, Carbonara has become one of the most beloved pasta dishes worldwide. The authentic Roman version uses guanciale (cured pork cheek) and Pecorino Romano - never cream, garlic, or onions.`,

  // Common Mistakes
  common_mistakes: [
    'Adding cream - authentic carbonara is creamy from eggs and cheese alone',
    'Scrambling the eggs by adding them to a hot pan',
    'Using bacon instead of guanciale or pancetta',
    'Not reserving pasta water for the sauce',
    'Adding garlic or onions (not traditional)',
  ],

  // Chef Notes
  chef_notes: `The secret to perfect carbonara is temperature control. You want the eggs to emulsify with the cheese and pasta water, not scramble. Always remove the pan from heat before adding the egg mixture, and work quickly while the pasta is still hot.

If using pancetta instead of guanciale, the flavor will be smokier. For a more authentic taste, seek out guanciale at Italian specialty stores.`,

  // Wine Pairings
  wine_pairings: [
    { name: 'Frascati', type: 'White', region: 'Lazio, Italy', slug: 'frascati', note: 'Traditional Roman pairing' },
    { name: 'Verdicchio', type: 'White', region: 'Marche, Italy', slug: 'verdicchio', note: 'Crisp and refreshing' },
    { name: 'Pinot Grigio', type: 'White', region: 'Various', slug: 'pinot-grigio', note: 'Light and versatile' },
  ],

  // Related Recipes
  related_recipes: [
    { name: 'Cacio e Pepe', slug: 'cacio-e-pepe', cuisine: 'Italian' },
    { name: 'Amatriciana', slug: 'pasta-amatriciana', cuisine: 'Italian' },
    { name: 'Gricia', slug: 'pasta-alla-gricia', cuisine: 'Italian' },
    { name: 'Pasta Alfredo', slug: 'pasta-alfredo', cuisine: 'Italian-American' },
  ],

  // Tags
  tags: ['quick', 'comfort-food', 'classic', 'roman', 'eggs', 'pork'],

  // Ratings (mock)
  rating: 4.8,
  review_count: 2847,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = mockRecipe;

  return {
    title: `${recipe.name} Recipe - Authentic ${recipe.cuisine} | GUDBRO`,
    description: `Learn how to make authentic ${recipe.name}. ${recipe.description.slice(0, 120)}... Ready in ${recipe.total_time_min} minutes.`,
    openGraph: {
      title: `${recipe.name} - GUDBRO Recipes`,
      description: recipe.description,
      type: 'article',
    },
  };
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-gray-600">{rating}</span>
    </div>
  );
}

// Difficulty indicator
function DifficultyIndicator({ level }: { level: number }) {
  const labels = ['', 'Easy', 'Medium', 'Intermediate', 'Advanced', 'Expert'];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((l) => (
          <div
            key={l}
            className={`w-2 h-6 rounded-full ${l <= level ? 'bg-orange-500' : 'bg-gray-200'}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">Difficulty: {labels[level]}</span>
    </div>
  );
}

// Nutrition card
function NutritionCard({ nutrition }: { nutrition: typeof mockRecipe.nutrition_per_serving }) {
  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="bg-orange-50 rounded-xl p-3">
        <p className="text-xl font-bold text-orange-600">{nutrition.calories}</p>
        <p className="text-xs text-gray-500">Calories</p>
      </div>
      <div className="bg-blue-50 rounded-xl p-3">
        <p className="text-xl font-bold text-blue-600">{nutrition.protein}g</p>
        <p className="text-xs text-gray-500">Protein</p>
      </div>
      <div className="bg-yellow-50 rounded-xl p-3">
        <p className="text-xl font-bold text-yellow-600">{nutrition.fat}g</p>
        <p className="text-xs text-gray-500">Fat</p>
      </div>
      <div className="bg-green-50 rounded-xl p-3">
        <p className="text-xl font-bold text-green-600">{nutrition.carbohydrates}g</p>
        <p className="text-xs text-gray-500">Carbs</p>
      </div>
    </div>
  );
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = mockRecipe;

  if (!recipe) {
    notFound();
  }

  // JSON-LD Recipe structured data for rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: recipe.image_url || 'https://gudbro.com/images/default-recipe.jpg',
    author: {
      '@type': 'Organization',
      name: 'GUDBRO'
    },
    datePublished: '2024-01-01',
    prepTime: `PT${recipe.prep_time_min}M`,
    cookTime: `PT${recipe.cook_time_min}M`,
    totalTime: `PT${recipe.total_time_min}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    recipeIngredient: recipe.ingredients.map(i => `${i.quantity} ${i.unit} ${i.name}`),
    recipeInstructions: recipe.steps.map(s => ({
      '@type': 'HowToStep',
      name: s.title,
      text: s.instruction
    })),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition_per_serving.calories} calories`,
      proteinContent: `${recipe.nutrition_per_serving.protein}g`,
      fatContent: `${recipe.nutrition_per_serving.fat}g`,
      carbohydrateContent: `${recipe.nutrition_per_serving.carbohydrates}g`,
      fiberContent: `${recipe.nutrition_per_serving.fiber}g`,
      sodiumContent: `${recipe.nutrition_per_serving.sodium}mg`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: recipe.rating,
      reviewCount: recipe.review_count
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/recipes" className="hover:text-gray-700">Recipes</Link>
              <span className="mx-2">/</span>
              <Link href={`/recipes/cuisine/${recipe.cuisine.toLowerCase()}`} className="hover:text-gray-700">
                {recipe.cuisine}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{recipe.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {recipe.image_url ? (
                  <img src={recipe.image_url} alt={recipe.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-8xl">🍝</span>
                )}
                {/* Jump to Recipe button */}
                <a
                  href="#recipe-steps"
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-medium text-gray-900 shadow-lg hover:bg-white transition-colors"
                >
                  Jump to Recipe ↓
                </a>
              </div>

              {/* Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                  <Link href={`/recipes/cuisine/${recipe.cuisine.toLowerCase()}`} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium hover:bg-orange-200 transition-colors">
                    {recipe.cuisine}
                  </Link>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full capitalize">
                    {recipe.category}
                  </span>
                  {recipe.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {recipe.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <StarRating rating={recipe.rating} />
                  <span className="text-gray-500 text-sm">({recipe.review_count.toLocaleString()} reviews)</span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {recipe.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{recipe.prep_time_min}</p>
                    <p className="text-xs text-gray-500">Prep (min)</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{recipe.cook_time_min}</p>
                    <p className="text-xs text-gray-500">Cook (min)</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{recipe.servings}</p>
                    <p className="text-xs text-gray-500">Servings</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <DifficultyIndicator level={recipe.difficulty} />
                  </div>
                </div>

                {/* Allergen Warning */}
                {recipe.allergens.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <span>⚠️</span> Contains Allergens
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recipe.allergens.map((allergen) => (
                        <span key={allergen} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Intolerances Warning */}
                {recipe.intolerances.length > 0 && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <span>🔔</span> May Affect Intolerances
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recipe.intolerances.map((intolerance) => (
                        <span key={intolerance} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {intolerance.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary Badges */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(recipe.dietary).map(([diet, suitable]) => {
                    if (!suitable) return null;
                    const icons: Record<string, string> = {
                      vegan: '🌱', vegetarian: '🥗', gluten_free: '🌾', dairy_free: '🥛',
                      nut_free: '🥜', halal: '☪️', kosher: '✡️', pescatarian: '🐟'
                    };
                    return (
                      <span key={diet} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        {icons[diet]} {diet.replace('_', '-')}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* History & Story */}
              {recipe.history && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📜</span> The Story of {recipe.name}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {recipe.history.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 mb-4 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients with Dynamic Servings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🥘</span> Ingredients
                </h2>
                <ServingsSelector
                  defaultServings={recipe.servings}
                  ingredients={recipe.ingredients.map(ing => ({
                    name: ing.name,
                    amount: ing.quantity,
                    unit: ing.unit,
                    notes: ing.note,
                  }))}
                  allergens={recipe.allergens}
                  nutritionPerServing={recipe.nutrition_per_serving}
                />
              </div>

              {/* Recipe Steps */}
              <div id="recipe-steps" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>👨‍🍳</span> Instructions
                </h2>
                <ol className="space-y-6">
                  {recipe.steps.map((step) => (
                    <li key={step.order} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        {step.order}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-700 mb-2">{step.instruction}</p>
                        {step.tip && (
                          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg">
                            <p className="text-sm text-amber-800">
                              <span className="font-medium">💡 Pro Tip:</span> {step.tip}
                            </p>
                          </div>
                        )}
                        {step.duration_min && (
                          <p className="text-sm text-gray-500 mt-2">⏱️ {step.duration_min} min</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Common Mistakes */}
              {recipe.common_mistakes && recipe.common_mistakes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>❌</span> Common Mistakes to Avoid
                  </h2>
                  <ul className="space-y-2">
                    {recipe.common_mistakes.map((mistake, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <span className="text-red-500 mt-0.5">✗</span>
                        <span className="text-gray-700">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chef Notes */}
              {recipe.chef_notes && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>👨‍🍳</span> Chef&apos;s Notes
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {recipe.chef_notes.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 mb-4 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Nutrition */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span> Nutrition per Serving
                </h3>
                <NutritionCard nutrition={recipe.nutrition_per_serving} />
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fiber</span>
                    <span className="font-medium">{recipe.nutrition_per_serving.fiber}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sugar</span>
                    <span className="font-medium">{recipe.nutrition_per_serving.sugar}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sodium</span>
                    <span className="font-medium">{recipe.nutrition_per_serving.sodium}mg</span>
                  </div>
                </div>
              </div>

              {/* Wine Pairing */}
              {recipe.wine_pairings && recipe.wine_pairings.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🍷</span> Wine Pairings
                  </h3>
                  <div className="space-y-3">
                    {recipe.wine_pairings.map((wine) => (
                      <Link
                        key={wine.slug}
                        href={`/wines/${wine.slug}`}
                        className="block p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{wine.type === 'Red' ? '🍷' : wine.type === 'White' ? '🥂' : '🍾'}</span>
                          <div>
                            <p className="font-medium text-gray-900">{wine.name}</p>
                            <p className="text-sm text-gray-500">{wine.region}</p>
                          </div>
                        </div>
                        {wine.note && (
                          <p className="text-xs text-gray-500 mt-2 italic">{wine.note}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Spice Level */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🌶️</span> Spice Level
                </h3>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        level <= recipe.spice_level
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      🌶️
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {recipe.spice_level === 0 && 'Not spicy'}
                  {recipe.spice_level === 1 && 'Mild - just a hint of pepper'}
                  {recipe.spice_level === 2 && 'Medium'}
                  {recipe.spice_level === 3 && 'Hot'}
                  {recipe.spice_level === 4 && 'Very Hot'}
                  {recipe.spice_level === 5 && 'Extreme'}
                </p>
              </div>

              {/* Related Recipes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🍴</span> You Might Also Like
                </h3>
                <div className="space-y-3">
                  {recipe.related_recipes.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/recipes/${related.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-200 rounded-lg flex items-center justify-center text-xl">
                        🍝
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{related.name}</p>
                        <p className="text-sm text-gray-500">{related.cuisine}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA - Create Menu */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Add to Your Digital Menu</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Create a professional digital menu for your restaurant with automatic allergen labeling and nutrition info.
                </p>
                <Link
                  href="/sign-up"
                  className="block w-full bg-white text-gray-900 text-center py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Print Button */}
              <PrintButton />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
