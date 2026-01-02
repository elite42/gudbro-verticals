import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Mock data - In production, this would come from Supabase
const mockIngredient = {
  id: 'ING_PARMESAN',
  name: 'Parmesan Cheese',
  slug: 'parmesan-cheese',
  category: 'cheese',
  subcategory: 'hard cheese',
  description: 'Parmigiano-Reggiano is a hard, granular cheese produced from unpasteurized cow\'s milk. Aged for a minimum of 12 months, this Italian cheese is known as the "King of Cheeses" for its complex, nutty flavor and versatility in cooking.',
  origin: {
    country: 'Italy',
    region: 'Emilia-Romagna',
    city: 'Parma'
  },
  image_url: null,

  // 5 Dimensions
  allergens: { milk: true },
  intolerances: { lactose: true },
  dietary: {
    vegan: false,
    vegetarian: true, // Traditional parmesan uses animal rennet, but we mark as vegetarian for simplicity
    gluten_free: true,
    dairy_free: false,
    nut_free: true,
    halal: true,
    kosher: false,
    pescatarian: true,
  },
  nutrition: {
    calories: 431,
    protein: 38.5,
    fat: 29.0,
    carbohydrates: 4.1,
    fiber: 0,
    sugar: 0.9,
    sodium: 1529,
    saturated_fat: 18.5
  },
  spice_level: 0,

  // Additional info
  storage_temp: 'refrigerated',
  shelf_life_days: 180,
  is_seasonal: false,
  season_months: null,

  // Pairings (would come from DB)
  pairs_well_with: [
    { type: 'ingredient', name: 'Prosciutto', slug: 'prosciutto' },
    { type: 'ingredient', name: 'Balsamic Vinegar', slug: 'balsamic-vinegar' },
    { type: 'ingredient', name: 'Fresh Figs', slug: 'fresh-fig' },
    { type: 'ingredient', name: 'Honey', slug: 'honey' },
    { type: 'wine', name: 'Lambrusco', slug: 'lambrusco' },
    { type: 'wine', name: 'Chianti', slug: 'chianti' },
  ],

  // Recipes using this ingredient (would come from product_ingredients)
  used_in_recipes: [
    { name: 'Spaghetti Carbonara', slug: 'spaghetti-carbonara', cuisine: 'Italian' },
    { name: 'Risotto alla Milanese', slug: 'risotto-alla-milanese', cuisine: 'Italian' },
    { name: 'Caesar Salad', slug: 'caesar-salad', cuisine: 'American' },
    { name: 'Cacio e Pepe', slug: 'cacio-e-pepe', cuisine: 'Italian' },
    { name: 'Pesto Genovese', slug: 'pesto-genovese', cuisine: 'Italian' },
  ],

  // Fun facts
  fun_facts: [
    'A wheel of authentic Parmigiano-Reggiano takes about 550 liters of milk to produce.',
    'The cheese must be aged for at least 12 months, but premium varieties are aged 24-36 months.',
    'In Italy, banks accept wheels of Parmesan as collateral for loans.',
    'The rind is edible and often used to flavor soups and sauces.',
  ],

  // Tips
  tips: [
    'Store wrapped in parchment paper, then plastic wrap, in the refrigerator.',
    'Grate fresh just before using for the best flavor.',
    'Save the rind to add umami to soups and stews.',
    'Bring to room temperature before serving on a cheese board.',
  ],
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // In production, fetch from DB
  const ingredient = mockIngredient;

  return {
    title: `${ingredient.name} - Nutrition, Allergens & Recipes | GUDBRO`,
    description: `Learn about ${ingredient.name}: nutrition facts, allergens, dietary info, and ${ingredient.used_in_recipes.length}+ recipes. ${ingredient.description.slice(0, 100)}...`,
    openGraph: {
      title: `${ingredient.name} - GUDBRO Food Database`,
      description: ingredient.description,
      type: 'article',
    },
  };
}

// Allergen badge component
function AllergenBadge({ allergen, present }: { allergen: string; present: boolean }) {
  if (!present) return null;

  const allergenInfo: Record<string, { icon: string; label: string; color: string }> = {
    milk: { icon: '🥛', label: 'Milk', color: 'bg-blue-100 text-blue-800' },
    gluten: { icon: '🌾', label: 'Gluten', color: 'bg-amber-100 text-amber-800' },
    eggs: { icon: '🥚', label: 'Eggs', color: 'bg-yellow-100 text-yellow-800' },
    fish: { icon: '🐟', label: 'Fish', color: 'bg-cyan-100 text-cyan-800' },
    nuts: { icon: '🥜', label: 'Tree Nuts', color: 'bg-orange-100 text-orange-800' },
    peanuts: { icon: '🥜', label: 'Peanuts', color: 'bg-orange-100 text-orange-800' },
    soy: { icon: '🫘', label: 'Soy', color: 'bg-green-100 text-green-800' },
    shellfish: { icon: '🦐', label: 'Shellfish', color: 'bg-red-100 text-red-800' },
    sesame: { icon: '🥯', label: 'Sesame', color: 'bg-amber-100 text-amber-800' },
  };

  const info = allergenInfo[allergen] || { icon: '⚠️', label: allergen, color: 'bg-gray-100 text-gray-800' };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${info.color}`}>
      {info.icon} {info.label}
    </span>
  );
}

// Diet badge component
function DietBadge({ diet, suitable }: { diet: string; suitable: boolean }) {
  const dietInfo: Record<string, { icon: string; label: string }> = {
    vegan: { icon: '🌱', label: 'Vegan' },
    vegetarian: { icon: '🥗', label: 'Vegetarian' },
    gluten_free: { icon: '🌾', label: 'Gluten-Free' },
    dairy_free: { icon: '🥛', label: 'Dairy-Free' },
    nut_free: { icon: '🥜', label: 'Nut-Free' },
    halal: { icon: '☪️', label: 'Halal' },
    kosher: { icon: '✡️', label: 'Kosher' },
    pescatarian: { icon: '🐟', label: 'Pescatarian' },
  };

  const info = dietInfo[diet] || { icon: '✓', label: diet };

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg ${suitable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <span className="text-xl">{info.icon}</span>
      <div>
        <p className={`font-medium ${suitable ? 'text-green-800' : 'text-red-800'}`}>{info.label}</p>
        <p className={`text-sm ${suitable ? 'text-green-600' : 'text-red-600'}`}>
          {suitable ? 'Suitable' : 'Not suitable'}
        </p>
      </div>
    </div>
  );
}

// Nutrition row component
function NutritionRow({ label, value, unit, daily }: { label: string; value: number; unit: string; daily?: number }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}</span>
      <div className="text-right">
        <span className="font-medium text-gray-900">{value}{unit}</span>
        {daily && <span className="text-sm text-gray-500 ml-2">({daily}% DV)</span>}
      </div>
    </div>
  );
}

export default async function IngredientPage({ params }: Props) {
  const { slug } = await params;

  // In production, fetch from Supabase
  // const ingredient = await getIngredientBySlug(slug);
  const ingredient = mockIngredient;

  if (!ingredient) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NutritionInformation',
    name: ingredient.name,
    description: ingredient.description,
    calories: `${ingredient.nutrition.calories} calories`,
    proteinContent: `${ingredient.nutrition.protein}g`,
    fatContent: `${ingredient.nutrition.fat}g`,
    carbohydrateContent: `${ingredient.nutrition.carbohydrates}g`,
    fiberContent: `${ingredient.nutrition.fiber}g`,
    sodiumContent: `${ingredient.nutrition.sodium}mg`,
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
              <Link href="/ingredients" className="hover:text-gray-700">Ingredients</Link>
              <span className="mx-2">/</span>
              <Link href={`/ingredients/category/${ingredient.category}`} className="hover:text-gray-700 capitalize">
                {ingredient.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{ingredient.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                {ingredient.image_url ? (
                  <img src={ingredient.image_url} alt={ingredient.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className="text-8xl">🧀</span>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded">{ingredient.category}</span>
                  {ingredient.subcategory && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{ingredient.subcategory}</span>
                    </>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {ingredient.name}
                </h1>

                {ingredient.origin && (
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <span>📍</span>
                    {ingredient.origin.region}, {ingredient.origin.country}
                  </p>
                )}

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {ingredient.description}
                </p>

                {/* Allergens Warning */}
                {Object.entries(ingredient.allergens).some(([_, v]) => v) && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <span>⚠️</span> Contains Allergens
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(ingredient.allergens).map(([key, value]) => (
                        <AllergenBadge key={key} allergen={key} present={value as boolean} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{ingredient.nutrition.calories}</p>
                    <p className="text-sm text-gray-500">Calories</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{ingredient.nutrition.protein}g</p>
                    <p className="text-sm text-gray-500">Protein</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{ingredient.nutrition.fat}g</p>
                    <p className="text-sm text-gray-500">Fat</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{ingredient.nutrition.carbohydrates}g</p>
                    <p className="text-sm text-gray-500">Carbs</p>
                  </div>
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
              {/* Dietary Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🥗</span> Dietary Information
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(ingredient.dietary).map(([diet, suitable]) => (
                    <DietBadge key={diet} diet={diet} suitable={suitable as boolean} />
                  ))}
                </div>
              </div>

              {/* Nutrition Facts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span> Nutrition Facts
                </h2>
                <p className="text-sm text-gray-500 mb-4">Per 100g serving</p>
                <div className="space-y-1">
                  <NutritionRow label="Calories" value={ingredient.nutrition.calories} unit=" kcal" />
                  <NutritionRow label="Protein" value={ingredient.nutrition.protein} unit="g" daily={Math.round(ingredient.nutrition.protein / 50 * 100)} />
                  <NutritionRow label="Total Fat" value={ingredient.nutrition.fat} unit="g" daily={Math.round(ingredient.nutrition.fat / 65 * 100)} />
                  <NutritionRow label="Saturated Fat" value={ingredient.nutrition.saturated_fat} unit="g" daily={Math.round(ingredient.nutrition.saturated_fat / 20 * 100)} />
                  <NutritionRow label="Carbohydrates" value={ingredient.nutrition.carbohydrates} unit="g" daily={Math.round(ingredient.nutrition.carbohydrates / 300 * 100)} />
                  <NutritionRow label="Sugar" value={ingredient.nutrition.sugar} unit="g" />
                  <NutritionRow label="Fiber" value={ingredient.nutrition.fiber} unit="g" daily={Math.round(ingredient.nutrition.fiber / 25 * 100)} />
                  <NutritionRow label="Sodium" value={ingredient.nutrition.sodium} unit="mg" daily={Math.round(ingredient.nutrition.sodium / 2300 * 100)} />
                </div>
              </div>

              {/* Fun Facts */}
              {ingredient.fun_facts && ingredient.fun_facts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💡</span> Did You Know?
                  </h2>
                  <ul className="space-y-3">
                    {ingredient.fun_facts.map((fact, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-amber-500 font-bold">{index + 1}.</span>
                        <span className="text-gray-700">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips */}
              {ingredient.tips && ingredient.tips.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>👨‍🍳</span> Chef Tips
                  </h2>
                  <ul className="space-y-3">
                    {ingredient.tips.map((tip, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recipes Using This Ingredient */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🍳</span> Recipes Using {ingredient.name}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ingredient.used_in_recipes.map((recipe) => (
                    <Link
                      key={recipe.slug}
                      href={`/recipes/${recipe.slug}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center text-2xl">
                        🍝
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{recipe.name}</h3>
                        <p className="text-sm text-gray-500">{recipe.cuisine} cuisine</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/recipes?ingredient=${ingredient.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-gray-600 hover:text-gray-900"
                >
                  View all recipes with {ingredient.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Storage Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🧊</span> Storage
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Temperature</span>
                    <span className="font-medium capitalize">{ingredient.storage_temp}</span>
                  </div>
                  {ingredient.shelf_life_days && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shelf Life</span>
                      <span className="font-medium">{ingredient.shelf_life_days} days</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pairs Well With */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🤝</span> Pairs Well With
                </h3>
                <div className="space-y-2">
                  {ingredient.pairs_well_with.map((pairing) => (
                    <Link
                      key={pairing.slug}
                      href={pairing.type === 'wine' ? `/wines/${pairing.slug}` : `/ingredients/${pairing.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">
                        {pairing.type === 'wine' ? '🍷' : '🥘'}
                      </span>
                      <span className="text-gray-700">{pairing.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🌶️</span> Spice Level
                </h3>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        level <= ingredient.spice_level
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      🌶️
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {ingredient.spice_level === 0 && 'No spice'}
                  {ingredient.spice_level === 1 && 'Mild'}
                  {ingredient.spice_level === 2 && 'Medium'}
                  {ingredient.spice_level === 3 && 'Hot'}
                  {ingredient.spice_level === 4 && 'Very Hot'}
                  {ingredient.spice_level === 5 && 'Extreme'}
                </p>
              </div>

              {/* CTA - Create Menu */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Create Your Digital Menu</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Add {ingredient.name} to your restaurant&apos;s digital menu with automatic allergen labeling.
                </p>
                <Link
                  href="/sign-up"
                  className="block w-full bg-white text-gray-900 text-center py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
