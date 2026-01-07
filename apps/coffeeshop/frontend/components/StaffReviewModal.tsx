'use client';

import { useState } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { userProfileStore } from '../lib/user-profile-store';

// Review categories matching backend
const REVIEW_CATEGORIES = [
  { id: 'friendly', label: 'Cordiale', emoji: '😊' },
  { id: 'fast', label: 'Veloce', emoji: '⚡' },
  { id: 'professional', label: 'Professionale', emoji: '👔' },
  { id: 'helpful', label: 'Disponibile', emoji: '🤝' },
  { id: 'knowledgeable', label: 'Competente', emoji: '🎓' },
  { id: 'attentive', label: 'Attento', emoji: '👀' },
  { id: 'patient', label: 'Paziente', emoji: '🧘' },
  { id: 'creative', label: 'Creativo', emoji: '🎨' },
];

interface StaffMember {
  id: string;
  displayName: string;
  photoUrl?: string | null;
  jobTitle?: string | null;
  averageRating?: number;
  totalReviews?: number;
}

interface StaffReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: StaffMember | null;
  locationId: string;
  onSuccess?: (pointsAwarded: number) => void;
}

export function StaffReviewModal({
  isOpen,
  onClose,
  staffMember,
  locationId,
  onSuccess,
}: StaffReviewModalProps) {
  const [currentStep, setCurrentStep] = useState<'rating' | 'categories' | 'comment' | 'thanks'>(
    'rating'
  );
  const [rating, setRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const swipe = useSwipeToDismiss({ isOpen, onClose: handleClose });

  function handleClose() {
    // Reset state
    setCurrentStep('rating');
    setRating(0);
    setSelectedCategories([]);
    setComment('');
    setIsAnonymous(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    setPointsAwarded(0);
    onClose();
  }

  function toggleCategory(categoryId: string) {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : prev.length < 4
          ? [...prev, categoryId]
          : prev
    );
  }

  async function handleSubmit() {
    if (!staffMember) return;

    setIsSubmitting(true);

    try {
      const userProfile = userProfileStore.get();

      const response = await fetch('/api/staff/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: staffMember.id,
          locationId,
          reviewerAccountId: userProfile?.id || undefined,
          isAnonymous,
          rating,
          categories: selectedCategories,
          comment: comment.trim() || undefined,
          source: 'app',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPointsAwarded(data.pointsAwarded || 0);
        setCurrentStep('thanks');
        onSuccess?.(data.pointsAwarded || 0);
      } else {
        throw new Error(data.error || 'Error submitting review');
      }
    } catch (error) {
      console.error('Review submission error:', error);
      setErrorMessage('Si è verificato un errore. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen || !staffMember) return null;

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
        className="bg-theme-bg-elevated fixed bottom-0 left-0 right-0 z-[10001] max-h-[90vh] select-none overflow-y-auto rounded-t-3xl shadow-2xl"
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
        <div className="bg-theme-bg-elevated sticky top-0 z-10 flex justify-center py-3">
          <div className="bg-theme-bg-tertiary h-1.5 w-12 rounded-full" />
        </div>

        {/* Error Toast */}
        {errorMessage && (
          <div className="mx-6 mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                className="h-4 w-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="flex-1 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 pb-32">
          {currentStep === 'rating' && (
            <RatingStep
              staffMember={staffMember}
              rating={rating}
              setRating={setRating}
              onNext={() => setCurrentStep('categories')}
              onClose={handleClose}
            />
          )}

          {currentStep === 'categories' && (
            <CategoriesStep
              staffMember={staffMember}
              rating={rating}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              onNext={() => setCurrentStep('comment')}
              onBack={() => setCurrentStep('rating')}
            />
          )}

          {currentStep === 'comment' && (
            <CommentStep
              staffMember={staffMember}
              comment={comment}
              setComment={setComment}
              isAnonymous={isAnonymous}
              setIsAnonymous={setIsAnonymous}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onBack={() => setCurrentStep('categories')}
            />
          )}

          {currentStep === 'thanks' && (
            <ThanksStep
              staffMember={staffMember}
              pointsAwarded={pointsAwarded}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
}

// Rating Step
function RatingStep({
  staffMember,
  rating,
  setRating,
  onNext,
  onClose,
}: {
  staffMember: StaffMember;
  rating: number;
  setRating: (r: number) => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <div>
      {/* Staff Profile Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
          {staffMember.photoUrl ? (
            <img
              src={staffMember.photoUrl}
              alt={staffMember.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {staffMember.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="text-theme-text-primary text-xl font-bold">{staffMember.displayName}</h2>
        {staffMember.jobTitle && (
          <p className="text-theme-text-secondary text-sm">{staffMember.jobTitle}</p>
        )}
      </div>

      {/* Rating Question */}
      <div className="mb-6 text-center">
        <h3 className="text-theme-text-primary mb-2 text-lg font-semibold">
          Come ti ha servito {staffMember.displayName.split(' ')[0]}?
        </h3>
        <p className="text-theme-text-secondary text-sm">Tocca per valutare</p>
      </div>

      {/* Star Rating */}
      <div className="mb-8 flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <svg
              className={`h-12 w-12 ${
                star <= rating
                  ? 'fill-current text-yellow-400'
                  : 'text-theme-text-tertiary fill-none stroke-current stroke-2'
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>

      {/* Rating Labels */}
      <div className="text-theme-text-tertiary mb-8 flex justify-between px-4 text-xs">
        <span>Pessimo</span>
        <span>Eccellente</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary flex-1 rounded-full px-6 py-3 font-bold transition-colors"
        >
          Annulla
        </button>
        <button
          onClick={onNext}
          disabled={rating === 0}
          className={`flex-1 rounded-full px-6 py-3 font-bold transition-all ${
            rating > 0
              ? 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg'
              : 'bg-theme-bg-tertiary text-theme-text-tertiary cursor-not-allowed'
          }`}
        >
          Continua
        </button>
      </div>
    </div>
  );
}

// Categories Step
function CategoriesStep({
  staffMember,
  rating,
  selectedCategories,
  toggleCategory,
  onNext,
  onBack,
}: {
  staffMember: StaffMember;
  rating: number;
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const firstName = staffMember.displayName.split(' ')[0];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <h3 className="text-theme-text-primary text-lg font-semibold">
            {rating >= 4 ? `Cosa ti ha colpito di ${firstName}?` : `Cosa possiamo migliorare?`}
          </h3>
        </div>
        <p className="text-theme-text-secondary text-sm">Seleziona fino a 4 opzioni (opzionale)</p>
      </div>

      {/* Categories Grid */}
      <div className="mb-8 grid grid-cols-2 gap-3">
        {REVIEW_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`flex items-center gap-3 rounded-2xl p-4 transition-all ${
                isSelected
                  ? 'border-2 border-pink-500 bg-pink-100 dark:bg-pink-900/30'
                  : 'bg-theme-bg-secondary hover:bg-theme-bg-tertiary border-2 border-transparent'
              }`}
            >
              <span className="text-2xl">{category.emoji}</span>
              <span
                className={`font-medium ${
                  isSelected ? 'text-pink-600 dark:text-pink-400' : 'text-theme-text-primary'
                }`}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selection Counter */}
      {selectedCategories.length > 0 && (
        <p className="text-theme-text-secondary mb-6 text-center text-sm">
          {selectedCategories.length}/4 selezionate
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary flex-1 rounded-full px-6 py-3 font-bold transition-colors"
        >
          Indietro
        </button>
        <button
          onClick={onNext}
          className="flex-1 rounded-full bg-pink-500 px-6 py-3 font-bold text-white transition-all hover:bg-pink-600 hover:shadow-lg"
        >
          Continua
        </button>
      </div>
    </div>
  );
}

// Comment Step
function CommentStep({
  staffMember,
  comment,
  setComment,
  isAnonymous,
  setIsAnonymous,
  isSubmitting,
  onSubmit,
  onBack,
}: {
  staffMember: StaffMember;
  comment: string;
  setComment: (c: string) => void;
  isAnonymous: boolean;
  setIsAnonymous: (a: boolean) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const firstName = staffMember.displayName.split(' ')[0];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-theme-text-primary mb-2 text-lg font-semibold">
          Vuoi aggiungere un commento?
        </h3>
        <p className="text-theme-text-secondary text-sm">
          Un messaggio per {firstName} (opzionale)
        </p>
      </div>

      {/* Comment Textarea */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={`Scrivi qualcosa su ${firstName}...`}
        className="border-theme-bg-tertiary placeholder-theme-text-tertiary bg-theme-bg-secondary text-theme-text-primary mb-4 h-32 w-full resize-none rounded-2xl border-2 p-4 focus:border-pink-500 focus:outline-none"
        maxLength={500}
      />

      {/* Character counter */}
      <div className="text-theme-text-tertiary mb-4 text-right text-xs">{comment.length}/500</div>

      {/* Anonymous Toggle */}
      <div className="bg-theme-bg-secondary mb-6 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎭</span>
            <div>
              <p className="text-theme-text-primary font-medium">Recensione anonima</p>
              <p className="text-theme-text-secondary text-xs">
                {isAnonymous ? 'Nessun punto fedeltà' : '+10-20 punti fedeltà'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`h-8 w-14 rounded-full transition-colors ${
              isAnonymous ? 'bg-pink-500' : 'bg-theme-bg-tertiary'
            }`}
          >
            <div
              className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                isAnonymous ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Points Info */}
      {!isAnonymous && (
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 p-4 dark:from-pink-900/20 dark:to-purple-900/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-theme-text-primary text-sm font-semibold">
                Guadagna punti fedeltà!
              </p>
              <ul className="text-theme-text-secondary mt-1 space-y-0.5 text-xs">
                <li>• 10 punti base</li>
                <li>• +5 punti con commento dettagliato</li>
                <li>• +5 punti con ordine verificato</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary flex-1 rounded-full px-6 py-3 font-bold transition-colors disabled:opacity-50"
        >
          Indietro
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-bold text-white transition-all hover:bg-pink-600 hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Invio...
            </>
          ) : (
            'Invia Recensione'
          )}
        </button>
      </div>
    </div>
  );
}

// Thanks Step
function ThanksStep({
  staffMember,
  pointsAwarded,
  onClose,
}: {
  staffMember: StaffMember;
  pointsAwarded: number;
  onClose: () => void;
}) {
  return (
    <div className="py-8 text-center">
      {/* Success Icon */}
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <svg
          className="h-10 w-10 text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-theme-text-primary mb-2 text-2xl font-bold">Grazie!</h2>

      {/* Message */}
      <p className="text-theme-text-secondary mb-4">
        La tua recensione per {staffMember.displayName} è stata inviata.
      </p>

      {/* Points Badge */}
      {pointsAwarded > 0 && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 text-white">
          <span className="text-2xl">🎉</span>
          <span className="font-bold">+{pointsAwarded} punti guadagnati!</span>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="mx-auto w-full max-w-xs rounded-full bg-pink-500 px-8 py-3 font-bold text-white transition-all hover:bg-pink-600 hover:shadow-lg"
      >
        Chiudi
      </button>
    </div>
  );
}
