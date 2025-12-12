'use client';

import { useState } from 'react';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { engagementStore } from '../lib/engagement-store';
import { userProfileStore } from '../lib/user-profile-store';

interface ReviewModalProps {
  onClose: () => void;
}

export function ReviewModal({ onClose }: ReviewModalProps) {
  const [step, setStep] = useState<'rating' | 'public' | 'private' | 'success'>('rating');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [contactRequested, setContactRequested] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const engagement = (coffeeshopConfig as any).engagement;
  if (!engagement) return null;

  const { reviewPlatforms, minRatingForPublic } = engagement;

  const handleRatingSelect = (selectedRating: 1 | 2 | 3 | 4 | 5) => {
    setRating(selectedRating);

    // Branch logic: >= minRating = public, < minRating = private
    if (selectedRating >= minRatingForPublic) {
      setStep('public');
    } else {
      setStep('private');
    }
  };

  const handlePublicReview = (platform: 'google' | 'tripadvisor' | 'facebook') => {
    // Create engagement record
    const userId = userProfileStore.getRaw().name || 'anonymous';
    const record = engagementStore.create({
      userId,
      action: 'review',
      rating: rating!,
      platform,
      email: email || undefined,
    });

    setDiscountCode(record.discountCode);
    setStep('success');

    // Open review platform in new tab
    const platformData = reviewPlatforms.find((p: any) => p.id === platform);
    if (platformData) {
      window.open(platformData.url, '_blank');
    }
  };

  const handlePrivateFeedback = () => {
    // Create engagement record with feedback
    const userId = userProfileStore.getRaw().name || 'anonymous';
    const record = engagementStore.create({
      userId,
      action: 'review',
      rating: rating!,
      feedbackText,
      suggestions,
      contactRequested,
      email: email || undefined,
    });

    setDiscountCode(record.discountCode);
    setStep('success');
    // TODO: Send feedback to backend/email in production
  };

  const handleChangeRating = () => {
    setStep('rating');
    setFeedbackText('');
    setSuggestions('');
    setContactRequested(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-theme-bg-elevated rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full
            bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-secondary hover:text-theme-text-primary transition-all z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Rating Selection */}
          {step === 'rating' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-4xl">
                  ⭐
                </div>
              </div>

              <h2 className="text-2xl font-bold text-theme-text-primary text-center mb-2">
                Rate Your Experience
              </h2>
              <p className="text-theme-text-secondary text-center mb-8">
                How was your visit to ROOTS?
              </p>

              {/* Star Rating */}
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingSelect(star as 1 | 2 | 3 | 4 | 5)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className="transform transition-all hover:scale-125 active:scale-110"
                  >
                    <svg
                      className={`w-12 h-12 ${
                        (hoveredStar !== null ? star <= hoveredStar : star <= (rating || 0))
                          ? 'text-yellow-400 fill-current'
                          : 'text-theme-text-tertiary'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-theme-text-tertiary">
                Tap a star to rate
              </p>
            </>
          )}

          {/* Step 2a: Public Review (>= 4 stars) */}
          {step === 'public' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-4xl">
                  🎉
                </div>
              </div>

              <h2 className="text-2xl font-bold text-theme-text-primary text-center mb-2">
                Thank You!
              </h2>
              <p className="text-theme-text-secondary text-center mb-6">
                We'd love if you shared your experience online
              </p>

              {/* Rating Display */}
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-6 h-6 ${star <= (rating || 0) ? 'text-yellow-400 fill-current' : 'text-theme-text-tertiary'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
                <button
                  onClick={handleChangeRating}
                  className="ml-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Change
                </button>
              </div>

              {/* Review Platforms */}
              <div className="space-y-3 mb-6">
                {reviewPlatforms.map((platform: any) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePublicReview(platform.id as 'google' | 'tripadvisor' | 'facebook')}
                    className="w-full bg-theme-bg-secondary hover:bg-theme-bg-tertiary p-4 rounded-xl flex items-center gap-3 transition-colors"
                  >
                    <div className="text-3xl">{platform.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-theme-text-primary">{platform.name}</div>
                      <div className="text-sm text-theme-text-secondary">Leave a review</div>
                    </div>
                    <div className="text-green-600 font-bold">10% OFF</div>
                  </button>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full bg-theme-bg-tertiary text-theme-text-primary px-6 py-3 rounded-xl font-bold hover:bg-theme-bg-tertiary transition-colors"
              >
                Skip
              </button>
            </>
          )}

          {/* Step 2b: Private Feedback (< 4 stars) */}
          {step === 'private' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-theme-brand-accent to-red-500 rounded-full flex items-center justify-center text-4xl">
                  😔
                </div>
              </div>

              <h2 className="text-2xl font-bold text-theme-text-primary text-center mb-2">
                We're Sorry!
              </h2>
              <p className="text-theme-text-secondary text-center mb-6">
                Help us improve and get 15% off your next visit
              </p>

              {/* Rating Display */}
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-6 h-6 ${star <= (rating || 0) ? 'text-yellow-400 fill-current' : 'text-theme-text-tertiary'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
                <button
                  onClick={handleChangeRating}
                  className="ml-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Change
                </button>
              </div>

              {/* Feedback Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    What went wrong?
                  </label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full px-4 py-3 border-2 border-theme-bg-tertiary rounded-xl text-theme-text-primary
                      placeholder-theme-text-tertiary focus:outline-none focus:border-theme-brand-primary"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    How can we improve? (optional)
                  </label>
                  <textarea
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    placeholder="Your suggestions..."
                    className="w-full px-4 py-3 border-2 border-theme-bg-tertiary rounded-xl text-theme-text-primary
                      placeholder-theme-text-tertiary focus:outline-none focus:border-theme-brand-primary"
                    rows={2}
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contactRequested}
                    onChange={(e) => setContactRequested(e.target.checked)}
                    className="w-5 h-5 text-theme-brand-primary border-gray-300 rounded focus:ring-theme-brand-primary"
                  />
                  <span className="text-sm text-theme-text-primary">
                    I'd like the manager to contact me
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handlePrivateFeedback}
                disabled={!feedbackText.trim()}
                className="w-full bg-gradient-to-r from-theme-brand-accent to-red-500 text-white px-6 py-4 rounded-xl font-bold
                  hover:from-theme-brand-primary hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Submit Feedback & Get 15% OFF
              </button>
            </>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-4xl">
                  🎁
                </div>
              </div>

              <h2 className="text-2xl font-bold text-theme-text-primary text-center mb-2">
                Thank You!
              </h2>
              <p className="text-theme-text-secondary text-center mb-6">
                Here's your discount code
              </p>

              {/* Discount Code */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6 text-center">
                <div className="text-sm text-theme-text-secondary mb-2">Your Discount Code</div>
                <div className="text-3xl font-mono font-bold text-green-600 mb-3">{discountCode}</div>
                <div className="text-sm text-theme-text-secondary mb-4">
                  {rating && rating >= minRatingForPublic ? '10% OFF' : '15% OFF'} • Valid for 30 days
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(discountCode);
                    alert('Code copied to clipboard!');
                  }}
                  className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition-colors"
                >
                  Copy Code
                </button>
              </div>

              {/* Optional Email Collection - Opzione A: Give first, ask later */}
              {!emailSent && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <h4 className="font-bold text-theme-text-primary mb-2 text-sm">
                    💌 Get this code via email?
                  </h4>
                  <p className="text-xs text-theme-text-secondary mb-3">
                    We'll send it to you so you won't lose it!
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-3 py-2 border border-theme-bg-tertiary rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => {
                        if (email && email.includes('@')) {
                          // TODO: Send email via API in production
                          setEmailSent(true);
                        } else {
                          alert('Please enter a valid email');
                        }
                      }}
                      disabled={!email || !email.includes('@')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-theme-text-tertiary mt-2">
                    Optional • Create an account to access your codes on any device
                  </p>
                </div>
              )}

              {/* Email sent confirmation */}
              {emailSent && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-green-800 font-medium">
                    ✅ Email sent to {email}!
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full bg-theme-bg-tertiary text-theme-text-primary px-6 py-3 rounded-xl font-bold hover:bg-theme-bg-tertiary transition-colors"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
