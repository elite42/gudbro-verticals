'use client';

import { useState, useEffect } from 'react';
import { userProfileStore } from '../lib/user-profile-store';
import { favoritesStore } from '../lib/favorites-store';
import { preferencesStore } from '../lib/user-preferences';

export function WelcomeBackBanner() {
  const [isMounted, setIsMounted] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [hasPreferences, setHasPreferences] = useState(false);

  useEffect(() => {
    // Mark component as mounted to prevent hydration errors
    setIsMounted(true);

    // Get user profile data
    const profile = userProfileStore.getRaw();
    setIsReturning(userProfileStore.isReturningVisitor());
    setUserName(profile.name);

    // Get favorites count
    setFavoritesCount(favoritesStore.count());

    // Check if user has dietary preferences
    const prefs = preferencesStore.get();
    const hasDietaryPrefs =
      prefs.allergens_to_avoid.length > 0 ||
      prefs.intolerances.length > 0 ||
      prefs.dietary_preferences.length > 0;
    setHasPreferences(hasDietaryPrefs);

    // Listen for updates
    const handleFavoritesUpdate = () => setFavoritesCount(favoritesStore.count());
    const handlePreferencesUpdate = () => {
      const prefs = preferencesStore.get();
      const hasDietaryPrefs =
        prefs.allergens_to_avoid.length > 0 ||
        prefs.intolerances.length > 0 ||
        prefs.dietary_preferences.length > 0;
      setHasPreferences(hasDietaryPrefs);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('favorites-updated', handleFavoritesUpdate);
      window.addEventListener('preferences-updated', handlePreferencesUpdate);

      return () => {
        window.removeEventListener('favorites-updated', handleFavoritesUpdate);
        window.removeEventListener('preferences-updated', handlePreferencesUpdate);
      };
    }
  }, []);

  const handleSaveName = () => {
    // Allow saving empty name (removes name)
    const trimmedName = nameInput.trim();
    userProfileStore.setName(trimmedName);
    setUserName(trimmedName || undefined);
    setShowNameInput(false);
    setNameInput('');
  };

  // Don't render anything until mounted (prevents hydration errors)
  if (!isMounted) {
    return null;
  }

  // Don't show banner for first-time visitors
  if (!isReturning) {
    return null;
  }

  return (
    <>
      {/* Clean Welcome Banner */}
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">👋</span>
                {userName ? `Welcome back, ${userName}!` : 'Welcome back!'}
              </h3>

              {/* Edit name button for users with name */}
              {userName && (
                <button
                  onClick={() => {
                    setNameInput(userName);
                    setShowNameInput(true);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full
                    hover:bg-white/30 active:scale-95 transition-all duration-150"
                  title="Change name"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Name prompt for users without name */}
            {!userName && (
              <button
                onClick={() => setShowNameInput(true)}
                className="bg-white text-green-600 px-6 py-3 rounded-full text-sm font-bold
                  hover:bg-green-50 active:scale-95 transition-all duration-150 whitespace-nowrap shadow-md"
              >
                Tell us your name
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Name Input Modal */}
      {showNameInput && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowNameInput(false);
            setNameInput('');
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close X button */}
            <button
              onClick={() => {
                setShowNameInput(false);
                setNameInput('');
              }}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-4xl">
                👋
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Tell us your name
            </h2>
            <p className="text-gray-600 text-center mb-6">
              To serve you better and personalize your experience
            </p>

            {/* Input */}
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              placeholder="Your name..."
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-gray-900
                placeholder-gray-400 focus:outline-none focus:border-green-500 text-lg mb-6 text-center font-medium"
              autoFocus
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNameInput(false);
                  setNameInput('');
                }}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-2xl text-base font-bold
                  hover:bg-gray-200 active:scale-95 transition-all duration-150"
              >
                {userName ? 'Cancel' : 'Skip'}
              </button>
              <button
                onClick={handleSaveName}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-4 rounded-2xl text-base font-bold
                  hover:from-green-500 hover:to-emerald-600 active:scale-95 transition-all duration-150 shadow-lg"
              >
                OK
              </button>
            </div>

            {/* Help text */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              {userName ? 'Clear the field and press OK to remove your name' : 'You can add your name later anytime'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
