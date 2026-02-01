'use client';

import { useState } from 'react';
import {
  Star,
  Broom,
  MapPin,
  CurrencyCircleDollar,
  ChatCircle,
  WifiHigh,
} from '@phosphor-icons/react';

interface PostStayRatingProps {
  bookingId: string;
  propertyName: string;
  stayDates: { checkIn: string; checkOut: string };
  onSubmit: (data: {
    ratings: Record<string, number>;
    overallRating: number;
    comment: string;
  }) => Promise<void>;
}

const RATING_CATEGORIES = [
  { key: 'cleanliness', label: 'Cleanliness', icon: Broom, color: '#3D8B87' },
  { key: 'location', label: 'Location', icon: MapPin, color: '#6366F1' },
  { key: 'value', label: 'Value for Money', icon: CurrencyCircleDollar, color: '#E07A5F' },
  { key: 'communication', label: 'Communication', icon: ChatCircle, color: '#8B5CF6' },
  { key: 'wifi', label: 'WiFi', icon: WifiHigh, color: '#0EA5E9' },
] as const;

function StarRating({
  value,
  onChange,
  size = 28,
}: {
  value: number;
  onChange: (val: number) => void;
  size?: number;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform active:scale-110"
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            weight={star <= value ? 'fill' : 'regular'}
            className={star <= value ? 'text-amber-400' : 'text-gray-300'}
          />
        </button>
      ))}
    </div>
  );
}

export default function PostStayRating({
  bookingId,
  propertyName,
  stayDates,
  onSubmit,
}: PostStayRatingProps) {
  const [ratings, setRatings] = useState<Record<string, number>>({
    cleanliness: 0,
    location: 0,
    value: 0,
    communication: 0,
    wifi: 0,
  });
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const allCategoriesRated = RATING_CATEGORIES.every((cat) => ratings[cat.key] > 0);
  const canSubmit = allCategoriesRated && overallRating > 0 && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit({ ratings, overallRating, comment: comment.trim() });
    } catch {
      setSubmitting(false);
    }
  };

  const handleCategoryRating = (key: string, val: number) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-6">
      {/* Overall rating (prominent, at top) */}
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-5 text-center shadow-sm">
        <h3 className="mb-1 text-lg font-semibold text-[#2D2016]">Overall Experience</h3>
        <p className="mb-3 text-sm text-[#8B7355]">How would you rate your stay overall?</p>
        <div className="flex justify-center">
          <StarRating value={overallRating} onChange={setOverallRating} size={36} />
        </div>
        {overallRating > 0 && (
          <p className="mt-2 text-sm font-medium text-amber-600">
            {overallRating === 5
              ? 'Excellent!'
              : overallRating === 4
                ? 'Great!'
                : overallRating === 3
                  ? 'Good'
                  : overallRating === 2
                    ? 'Fair'
                    : 'Poor'}
          </p>
        )}
      </div>

      {/* Category ratings */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B7355]">
          Rate Each Category
        </h3>
        {RATING_CATEGORIES.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="flex items-center gap-3 rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 shadow-sm"
          >
            <Icon size={24} weight="duotone" style={{ color }} className="shrink-0" />
            <span className="min-w-[100px] text-sm font-medium text-[#2D2016]">{label}</span>
            <div className="ml-auto">
              <StarRating
                value={ratings[key] || 0}
                onChange={(val) => handleCategoryRating(key, val)}
                size={24}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Optional comment */}
      <div>
        <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-[#8B7355]">
          Comments (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us more about your experience..."
          rows={3}
          className="w-full resize-none rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm text-[#2D2016] placeholder-[#8B7355]/50 focus:border-[#3D8B87] focus:outline-none focus:ring-1 focus:ring-[#3D8B87]"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full rounded-xl bg-[#3D8B87] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#3D8B87]/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {!allCategoriesRated && (
        <p className="text-center text-xs text-[#8B7355]">
          Please rate all categories to submit your feedback.
        </p>
      )}
    </div>
  );
}
