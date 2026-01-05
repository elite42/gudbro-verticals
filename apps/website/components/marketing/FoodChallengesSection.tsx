const challengeFeatures = [
  {
    icon: '🍔',
    title: 'Epic Food Challenges',
    description:
      'Create "Man vs Food" style challenges. Giant burgers, spicy wing challenges, massive desserts - set the rules and time limit.',
  },
  {
    icon: '⏱️',
    title: 'Live Timer & Tracking',
    description:
      'Customers see a real-time countdown. Staff record completion times. Every attempt is automatically tracked.',
  },
  {
    icon: '🏆',
    title: 'Wall of Fame',
    description:
      'Winners get featured on your digital Hall of Fame with their photo, time, and date. Ultimate bragging rights.',
  },
  {
    icon: '💰',
    title: 'Flexible Rewards',
    description:
      'Free meal if they win, pay full price if they lose. Add cash prizes or record-breaker bonuses to sweeten the deal.',
  },
];

const stats = [
  { value: '10x', label: 'Social shares per challenge' },
  { value: '85%', label: 'Come back to try again' },
  { value: '300%', label: 'Increase in table bookings' },
];

export function FoodChallengesSection() {
  return (
    <section
      id="food-challenges"
      className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/20" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-red-200/30 blur-3xl dark:bg-red-900/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 dark:bg-orange-900/30">
            <span className="text-2xl">🔥</span>
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-300">
              PRO Feature
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Turn Eating Into Entertainment
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Create viral food challenges that bring customers back, fill tables on slow nights, and
            generate endless social media buzz. Think &quot;Man vs Food&quot; for your restaurant.
          </p>
        </div>

        {/* Main visual */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Challenge card mock */}
          <div className="relative">
            {/* Mock challenge card */}
            <div className="transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-300 hover:scale-[1.02] dark:bg-gray-800">
              {/* Image placeholder */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
                <span className="text-8xl">🍖</span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Badges */}
                <div className="mb-4 flex gap-2">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    EXTREME
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                    <span>⏱️</span> 15 min
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  The Mega Meat Stack
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  2kg of premium beef, 6 slices of bacon, triple cheese, loaded with fries
                </p>

                {/* Prize info */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">If you WIN</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        FREE + $50 Cash!
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">If you lose</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">$45</p>
                    </div>
                  </div>
                </div>

                {/* Record banner */}
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                  <span className="text-2xl">👑</span>
                  <div>
                    <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                      Current Record: 8:42
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      Beat it for +$100 bonus!
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-xl">
                  Accept Challenge
                </button>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 -top-4 animate-bounce rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <span className="text-4xl">🏆</span>
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl bg-white p-3 shadow-lg dark:bg-gray-800">
              <span className="text-2xl">📸</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Photo on the Wall!
              </span>
            </div>
          </div>

          {/* Right: Features */}
          <div className="space-y-6">
            {challengeFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:bg-gray-800/80"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl dark:bg-orange-900/30">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 lg:text-5xl">
                {stat.value}
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="rounded-xl bg-orange-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl"
            >
              Get PRO for Challenges
            </a>
            <a
              href="/demo"
              className="rounded-xl border border-gray-200 bg-white px-8 py-4 font-bold text-gray-900 shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              See Live Demo
            </a>
          </div>
          <p className="mt-6 text-gray-500 dark:text-gray-400">
            Perfect for restaurants, pubs, cafes, and any venue that wants to go viral
          </p>
        </div>
      </div>
    </section>
  );
}
