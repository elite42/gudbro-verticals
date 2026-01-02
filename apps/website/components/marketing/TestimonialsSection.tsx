const testimonials = [
  {
    quote: "GUDBRO transformed our cafe. Tourists can now read our menu in Korean and Japanese. Orders doubled!",
    author: "Linh Nguyen",
    role: "Owner, ROOTS Plant-Based Cafe",
    location: "Da Nang, Vietnam",
    avatar: "🌱",
    rating: 5,
  },
  {
    quote: "Our guests love scanning the room QR for WiFi and local tips. No more paper printouts!",
    author: "Mai Tran",
    role: "General Manager, Seaside Hotel",
    location: "Hoi An, Vietnam",
    avatar: "🏨",
    rating: 5,
  },
  {
    quote: "I manage 5 Airbnbs. The self check-in instructions and house rules in 6 languages save me hours every week.",
    author: "David Kim",
    role: "Property Host",
    location: "Ho Chi Minh City, Vietnam",
    avatar: "🏠",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Loved by hospitality businesses
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { value: '100+', label: 'Businesses' },
            { value: '50K+', label: 'QR Scans/Month' },
            { value: '16+', label: 'Languages' },
            { value: '4.9/5', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
