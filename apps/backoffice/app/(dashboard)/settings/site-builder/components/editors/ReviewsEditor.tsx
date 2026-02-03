'use client';

import { Plus, Trash, Star } from '@phosphor-icons/react';
import { ReviewsContent } from '@/lib/supabase';

interface ReviewsEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export function ReviewsEditor({ content, onChange }: ReviewsEditorProps) {
  const reviewsContent = content as unknown as ReviewsContent;

  const updateField = (field: keyof ReviewsContent, value: unknown) => {
    onChange({ ...content, [field]: value });
  };

  // Testimonial helpers
  const addTestimonial = () => {
    const testimonials = reviewsContent.testimonials || [];
    updateField('testimonials', [
      ...testimonials,
      { name: '', rating: 5, text: '', date: '', avatar_url: '' },
    ]);
  };

  const updateTestimonial = (index: number, field: string, value: string | number) => {
    const testimonials = [...(reviewsContent.testimonials || [])];
    testimonials[index] = { ...testimonials[index], [field]: value };
    updateField('testimonials', testimonials);
  };

  const removeTestimonial = (index: number) => {
    const testimonials = [...(reviewsContent.testimonials || [])];
    testimonials.splice(index, 1);
    updateField('testimonials', testimonials);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
        <input
          type="text"
          value={reviewsContent.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Reviews"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Review Platform Links */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h4 className="mb-3 font-medium text-gray-900">Review Platform Links</h4>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-600">Google Place ID</label>
            <input
              type="text"
              value={reviewsContent.google_place_id || ''}
              onChange={(e) => updateField('google_place_id', e.target.value)}
              placeholder="ChIJxxxxxxx"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Find your Place ID at{' '}
              <a
                href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google's Place ID Finder
              </a>
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-600">TripAdvisor URL</label>
            <input
              type="url"
              value={reviewsContent.tripadvisor_url || ''}
              onChange={(e) => updateField('tripadvisor_url', e.target.value)}
              placeholder="https://www.tripadvisor.com/..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Manual Testimonials */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Featured Testimonials</label>
          <button
            onClick={addTestimonial}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </button>
        </div>

        <div className="space-y-4">
          {(reviewsContent.testimonials || []).map((testimonial, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Testimonial {index + 1}</span>
                <button
                  onClick={() => removeTestimonial(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                    placeholder="Customer name"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={testimonial.date || ''}
                    onChange={(e) => updateTestimonial(index, 'date', e.target.value)}
                    placeholder="Date (e.g., Jan 2024)"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateTestimonial(index, 'rating', star)}
                        className={`p-1 ${
                          star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star
                          className="h-5 w-5"
                          fill={star <= testimonial.rating ? 'currentColor' : 'none'}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{testimonial.rating}/5</span>
                  </div>
                </div>

                <textarea
                  value={testimonial.text}
                  onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                  placeholder="Review text..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <input
                  type="url"
                  value={testimonial.avatar_url || ''}
                  onChange={(e) => updateTestimonial(index, 'avatar_url', e.target.value)}
                  placeholder="Avatar URL (optional)"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          {(reviewsContent.testimonials || []).length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">
                Add testimonials to showcase on your site, or connect your Google/TripAdvisor
                accounts above to pull reviews automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
