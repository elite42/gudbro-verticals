'use client';

import { useState } from 'react';
import { userProfileStore } from '../lib/user-profile-store';
import { SocialReviewPrompt } from './SocialReviewPrompt';
import { useTranslation } from '../lib/use-translation';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';

interface FeedbackRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Ratings {
  service: number;
  ambiance: number;
  foodBeverage: number;
}

type FeedbackType = 'feedback' | 'suggestion' | 'request';

export function FeedbackRatingModal({ isOpen, onClose }: FeedbackRatingModalProps) {
  const { t, replace } = useTranslation();
  const [currentStep, setCurrentStep] = useState<'rating' | 'feedback' | 'social' | 'thanks'>('rating');
  const [ratings, setRatings] = useState<Ratings>({
    service: 0,
    ambiance: 0,
    foodBeverage: 0
  });
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feedback');
  const [feedbackText, setFeedbackText] = useState('');
  const [discrepancyCategory, setDiscrepancyCategory] = useState<string | null>(null);

  // Calculate average rating
  const getAverageRating = (): number => {
    const sum = ratings.service + ratings.ambiance + ratings.foodBeverage;
    const count = Object.values(ratings).filter(r => r > 0).length;
    return count > 0 ? sum / count : 0;
  };

  // Smart discrepancy detection
  const detectDiscrepancy = (): string | null => {
    const ratingValues = Object.entries(ratings);
    const lowRatings = ratingValues.filter(([_, value]) => value > 0 && value <= 2);
    const highRatings = ratingValues.filter(([_, value]) => value >= 4);

    // If there's at least one low rating (1-2 stars) and at least one high rating (4-5 stars)
    if (lowRatings.length > 0 && highRatings.length > 0) {
      const categoryNames: Record<string, string> = {
        service: 'Service',
        ambiance: 'Ambiance',
        foodBeverage: 'Food & Beverage'
      };
      return categoryNames[lowRatings[0][0]];
    }
    return null;
  };

  const handleSubmitRating = () => {
    const average = getAverageRating();
    const discrepancy = detectDiscrepancy();

    if (discrepancy) {
      setDiscrepancyCategory(discrepancy);
      setCurrentStep('feedback');
    } else if (average < 4) {
      setCurrentStep('feedback');
    } else {
      setCurrentStep('social');
    }
  };

  const handleSubmitFeedback = () => {
    const average = getAverageRating();
    const userProfile = userProfileStore.get();

    // Save feedback using feedbackStore
    const feedbackData = {
      ratings,
      averageRating: average,
      feedbackType,
      feedbackText,
      discrepancyCategory,
      userId: userProfile.id,
      timestamp: new Date().toISOString()
    };

    // Import feedbackStore dynamically
    import('../lib/feedback-store').then(({ feedbackStore }) => {
      feedbackStore.save(feedbackData);
    });

    // If average >= 4 and no discrepancy, show social prompt
    if (average >= 4 && !discrepancyCategory) {
      setCurrentStep('social');
    } else {
      setCurrentStep('thanks');
    }
  };

  const handleClose = () => {
    // Reset state
    setCurrentStep('rating');
    setRatings({ service: 0, ambiance: 0, foodBeverage: 0 });
    setFeedbackType('feedback');
    setFeedbackText('');
    setDiscrepancyCategory(null);
    onClose();
  };

  const swipe = useSwipeToDismiss({ isOpen, onClose: handleClose });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[10000]"
        style={swipe.getBackdropStyle()}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-theme-bg-elevated rounded-t-3xl shadow-2xl z-[10001] max-h-[90vh] overflow-y-auto select-none"
        style={swipe.getModalStyle()}
        onTouchStart={swipe.handleTouchStart}
        onTouchMove={swipe.handleTouchMove}
        onTouchEnd={swipe.handleTouchEnd}
        onMouseDown={swipe.handleMouseDown}
        onMouseMove={swipe.handleMouseMove}
        onMouseUp={swipe.handleMouseUp}
        onMouseLeave={swipe.handleMouseLeave}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3 sticky top-0 bg-theme-bg-elevated z-10">
          <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full" />
        </div>

        {/* Content */}
        <div className="p-6 pb-32">
          {currentStep === 'rating' && (
            <RatingStep
              ratings={ratings}
              setRatings={setRatings}
              onSubmit={handleSubmitRating}
              onClose={handleClose}
              translations={t}
            />
          )}

          {currentStep === 'feedback' && (
            <FeedbackStep
              feedbackType={feedbackType}
              setFeedbackType={setFeedbackType}
              feedbackText={feedbackText}
              setFeedbackText={setFeedbackText}
              discrepancyCategory={discrepancyCategory}
              onSubmit={handleSubmitFeedback}
              onBack={() => setCurrentStep('rating')}
              translations={t}
              replace={replace}
            />
          )}

          {currentStep === 'social' && (
            <SocialReviewPrompt
              averageRating={getAverageRating()}
              onComplete={() => setCurrentStep('thanks')}
              onSkip={() => setCurrentStep('thanks')}
            />
          )}

          {currentStep === 'thanks' && (
            <ThanksStep onClose={handleClose} translations={t} />
          )}
        </div>
      </div>

    </>
  );
}

// Rating Step Component
function RatingStep({
  ratings,
  setRatings,
  onSubmit,
  onClose,
  translations
}: {
  ratings: Ratings;
  setRatings: (ratings: Ratings) => void;
  onSubmit: () => void;
  onClose: () => void;
  translations: any;
}) {
  const categories = [
    { key: 'service' as keyof Ratings, label: translations.feedback.rating.categories.service, icon: '👥' },
    { key: 'ambiance' as keyof Ratings, label: translations.feedback.rating.categories.ambiance, icon: '🏠' },
    { key: 'foodBeverage' as keyof Ratings, label: translations.feedback.rating.categories.foodBeverage, icon: '🍽️' }
  ];

  const canSubmit = Object.values(ratings).every(r => r > 0);

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-theme-text-primary mb-2">
          {translations.feedback.rating.title}
        </h2>
        <p className="text-theme-text-secondary">
          {translations.feedback.rating.subtitle}
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {categories.map((category) => (
          <div key={category.key} className="bg-theme-bg-secondary rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="font-semibold text-theme-text-primary">{category.label}</span>
            </div>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatings({ ...ratings, [category.key]: star })}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-10 h-10 ${
                      star <= ratings[category.key]
                        ? 'text-yellow-400 fill-current'
                        : 'text-theme-text-tertiary fill-none stroke-current stroke-2'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 bg-theme-bg-secondary text-theme-text-secondary px-6 py-3 rounded-full font-bold hover:bg-theme-bg-tertiary transition-colors"
        >
          {translations.common.cancel}
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`flex-1 px-6 py-3 rounded-full font-bold transition-all ${
            canSubmit
              ? 'bg-primary text-white hover:shadow-lg'
              : 'bg-theme-bg-tertiary text-theme-text-tertiary cursor-not-allowed'
          }`}
        >
          {translations.common.continue}
        </button>
      </div>
    </div>
  );
}

// Feedback Step Component
function FeedbackStep({
  feedbackType,
  setFeedbackType,
  feedbackText,
  setFeedbackText,
  discrepancyCategory,
  onSubmit,
  onBack,
  translations,
  replace
}: {
  feedbackType: FeedbackType;
  setFeedbackType: (type: FeedbackType) => void;
  feedbackText: string;
  setFeedbackText: (text: string) => void;
  discrepancyCategory: string | null;
  onSubmit: () => void;
  onBack: () => void;
  translations: any;
  replace: (text: string, values: Record<string, string>) => string;
}) {
  const feedbackTypes = [
    { value: 'feedback' as FeedbackType, label: translations.feedback.feedbackStep.types.feedback, icon: '💬' },
    { value: 'suggestion' as FeedbackType, label: translations.feedback.feedbackStep.types.suggestion, icon: '💡' },
    { value: 'request' as FeedbackType, label: translations.feedback.feedbackStep.types.request, icon: '🙏' }
  ];

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-theme-text-primary mb-2">
          {discrepancyCategory
            ? replace(translations.feedback.feedbackStep.titleWithCategory, { category: discrepancyCategory })
            : translations.feedback.feedbackStep.title}
        </h2>
        <p className="text-theme-text-secondary">
          {discrepancyCategory
            ? replace(translations.feedback.feedbackStep.subtitleWithCategory, { category: discrepancyCategory.toLowerCase() })
            : translations.feedback.feedbackStep.subtitle}
        </p>
      </div>

      {!discrepancyCategory && (
        <div className="flex gap-2 mb-4">
          {feedbackTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFeedbackType(type.value)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                feedbackType === type.value
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
              }`}
            >
              <div className="text-xl mb-1">{type.icon}</div>
              <div className="text-sm">{type.label}</div>
            </button>
          ))}
        </div>
      )}

      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder={
          discrepancyCategory
            ? replace(translations.feedback.feedbackStep.placeholderWithCategory, { category: discrepancyCategory.toLowerCase() })
            : translations.feedback.feedbackStep.placeholder
        }
        className="w-full h-40 p-4 border-2 border-theme-bg-tertiary rounded-2xl focus:border-primary focus:outline-none resize-none mb-6 placeholder-theme-text-tertiary"
      />

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-theme-bg-secondary text-theme-text-secondary px-6 py-3 rounded-full font-bold hover:bg-theme-bg-tertiary transition-colors"
        >
          {translations.common.back}
        </button>
        <button
          onClick={onSubmit}
          disabled={!feedbackText.trim()}
          className={`flex-1 px-6 py-3 rounded-full font-bold transition-all ${
            feedbackText.trim()
              ? 'bg-primary text-white hover:shadow-lg'
              : 'bg-theme-bg-tertiary text-theme-text-tertiary cursor-not-allowed'
          }`}
        >
          {translations.common.submit}
        </button>
      </div>
    </div>
  );
}

// Thanks Step Component
function ThanksStep({ onClose, translations }: { onClose: () => void; translations: any }) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-theme-text-primary mb-2">
        {translations.feedback.thanks.title}
      </h2>
      <p className="text-theme-text-secondary mb-6">
        {translations.feedback.thanks.message}
      </p>
      <button
        onClick={onClose}
        className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
      >
        {translations.common.done}
      </button>
    </div>
  );
}
