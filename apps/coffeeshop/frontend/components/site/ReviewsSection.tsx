'use client';

import { ReviewsContent, SiteSectionContent } from '../../lib/site-config';

interface ReviewsSectionProps {
  content: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

export function ReviewsSection({ content, styleOverrides }: ReviewsSectionProps) {
  const reviewsContent = content as ReviewsContent;
  const { title, google_place_id, tripadvisor_url, testimonials } = reviewsContent;

  // Don't render if no content
  const hasTestimonials = testimonials && testimonials.length > 0;
  const hasLinks = google_place_id || tripadvisor_url;

  if (!hasTestimonials && !hasLinks) {
    return null;
  }

  return (
    <section className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
      <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">⭐ {title || 'Reviews'}</h2>

      {/* Review Platform Links */}
      {hasLinks && (
        <div className="mb-6 flex flex-wrap gap-3">
          {google_place_id && (
            <a
              href={`https://search.google.com/local/writereview?placeid=${google_place_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <span>G</span>
              Review on Google
            </a>
          )}
          {tripadvisor_url && (
            <a
              href={tripadvisor_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <span>🦉</span>
              TripAdvisor
            </a>
          )}
        </div>
      )}

      {/* Testimonials */}
      {hasTestimonials && (
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-theme-bg-secondary rounded-xl p-4">
              <div className="mb-3 flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-lg">👤</span>
                  )}
                </div>

                {/* Name & Rating */}
                <div className="flex-1">
                  <p className="text-theme-text-primary font-medium">{testimonial.name}</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                    {testimonial.date && (
                      <span className="text-theme-text-secondary ml-2 text-sm">
                        {testimonial.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-theme-text-secondary">{testimonial.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
