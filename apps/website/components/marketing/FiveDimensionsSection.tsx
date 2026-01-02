import Link from 'next/link';

const dimensions = [
  {
    number: '1',
    title: 'Allergens',
    subtitle: '30 major allergens tracked',
    icon: '🥜',
    description: 'Comprehensive coverage of EU 14, USA Big 9, Japan 28, Korea 22, and more.',
    color: 'bg-red-500',
    examples: ['Peanuts', 'Tree Nuts', 'Shellfish', 'Gluten', 'Sesame', 'Mustard'],
  },
  {
    number: '2',
    title: 'Intolerances',
    subtitle: '10 digestive sensitivities',
    icon: '🍞',
    description: 'Beyond allergies - common food sensitivities that affect millions.',
    color: 'bg-purple-500',
    examples: ['Lactose', 'Fructose', 'Histamine', 'Sulfites', 'Caffeine', 'FODMAP'],
  },
  {
    number: '3',
    title: 'Diets',
    subtitle: '11 dietary preferences',
    icon: '🥗',
    description: 'Support every lifestyle choice from ethical to health-driven.',
    color: 'bg-green-500',
    examples: ['Vegan', 'Vegetarian', 'Keto', 'Halal', 'Kosher', 'Paleo'],
  },
  {
    number: '4',
    title: 'Nutrition',
    subtitle: 'Complete macro & micro data',
    icon: '📊',
    description: 'Accurate nutritional information for every dish, automatically calculated.',
    color: 'bg-blue-500',
    examples: ['Calories', 'Protein', 'Carbs', 'Fat', 'Fiber', 'Sodium'],
  },
  {
    number: '5',
    title: 'Compliance',
    subtitle: '50+ countries covered',
    icon: '✅',
    description: 'Meet legal requirements for allergen disclosure in EU, USA, UK, Asia, and beyond.',
    color: 'bg-orange-500',
    examples: ['EU FIC', 'USA FALCPA', 'UK Natasha\'s Law', 'Japan', 'Korea', 'Australia'],
  },
];

export function FiveDimensionsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            The GUDBRO Advantage
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            5 Dimensions of Food Intelligence
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We don&apos;t just show menus. We provide complete food intelligence with 51 health filters,
            covering 2,500+ ingredients and 4,600+ recipes.
          </p>
        </div>

        {/* Dimensions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dimensions.slice(0, 3).map((dim) => (
            <div
              key={dim.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 ${dim.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                    {dim.number}
                  </span>
                  <span className="text-3xl">{dim.icon}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{dim.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{dim.subtitle}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{dim.description}</p>
              <div className="flex flex-wrap gap-2">
                {dim.examples.map((example) => (
                  <span
                    key={example}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {dimensions.slice(3).map((dim) => (
            <div
              key={dim.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 ${dim.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                    {dim.number}
                  </span>
                  <span className="text-3xl">{dim.icon}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{dim.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{dim.subtitle}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{dim.description}</p>
              <div className="flex flex-wrap gap-2">
                {dim.examples.map((example) => (
                  <span
                    key={example}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold">51</p>
              <p className="text-blue-100 text-sm mt-1">Health Filters</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">2,548</p>
              <p className="text-blue-100 text-sm mt-1">Ingredients</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">4,653+</p>
              <p className="text-blue-100 text-sm mt-1">Recipes</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">50+</p>
              <p className="text-blue-100 text-sm mt-1">Countries</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Our Database
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
