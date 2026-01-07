'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { StaffReviewModal } from '../../components/StaffReviewModal';
import { coffeeshopConfig } from '../../config/coffeeshop.config';

interface StaffMember {
  id: string;
  displayName: string;
  photoUrl?: string | null;
  jobTitle?: string | null;
  averageRating?: number;
  totalReviews?: number;
}

export default function TeamPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPointsToast, setShowPointsToast] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Get location ID - use UUID for database queries
  // This maps merchant slug to location UUID in production
  const locationId = '10000000-0000-0000-0000-000000000001'; // ROOTS My Khe

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/staff/reviews?type=publicStaff&locationId=${locationId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch staff');
      }

      const data = await response.json();

      if (data.success) {
        setStaff(data.staff || []);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError(err instanceof Error ? err.message : 'Errore nel caricamento');
    } finally {
      setIsLoading(false);
    }
  }

  function handleReviewClick(member: StaffMember) {
    setSelectedStaff(member);
    setShowReviewModal(true);
  }

  function handleReviewSuccess(points: number) {
    if (points > 0) {
      setPointsEarned(points);
      setShowPointsToast(true);
      setTimeout(() => setShowPointsToast(false), 3000);
    }
  }

  // Render star rating
  function renderRating(rating?: number) {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <svg key={i} className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              stroke="currentColor"
              strokeWidth="1"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="text-theme-text-tertiary h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      }
    }
    return stars;
  }

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28">
      {/* Header */}
      <header className="bg-theme-bg-elevated sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex h-10 w-10 items-center justify-center rounded-full transition-colors"
            >
              <svg
                className="text-theme-text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-theme-text-primary text-xl font-bold">
                {coffeeshopConfig.ui.labels.team}
              </h1>
              <p className="text-theme-text-secondary text-sm">{coffeeshopConfig.business.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Intro Card */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 p-5 text-white">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <h2 className="mb-1 text-lg font-bold">Conosci il nostro team!</h2>
              <p className="text-sm text-white/90">
                Lascia una recensione per premiare chi ti ha servito con un sorriso. Guadagna punti
                fedeltà!
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
            <p className="text-theme-text-secondary">Caricamento team...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="rounded-2xl bg-red-50 p-6 text-center dark:bg-red-900/20">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                className="h-6 w-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="mb-3 font-medium text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={fetchStaff}
              className="rounded-full bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              Riprova
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && staff.length === 0 && (
          <div className="bg-theme-bg-elevated rounded-2xl p-8 text-center">
            <div className="bg-theme-bg-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-theme-text-primary mb-2 text-lg font-bold">Team non disponibile</h3>
            <p className="text-theme-text-secondary text-sm">
              Al momento il team non è visibile pubblicamente.
            </p>
          </div>
        )}

        {/* Staff Grid */}
        {!isLoading && !error && staff.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {staff.map((member) => (
              <StaffCard
                key={member.id}
                member={member}
                renderRating={renderRating}
                onReviewClick={() => handleReviewClick(member)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Review Modal */}
      <StaffReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedStaff(null);
        }}
        staffMember={selectedStaff}
        locationId={locationId}
        onSuccess={handleReviewSuccess}
      />

      {/* Points Toast */}
      {showPointsToast && (
        <div className="fixed bottom-24 left-1/2 z-[10002] -translate-x-1/2 animate-bounce">
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 text-white shadow-lg">
            <span className="text-xl">🎉</span>
            <span className="font-bold">+{pointsEarned} punti!</span>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavLocal />
    </div>
  );
}

// Staff Card Component
function StaffCard({
  member,
  renderRating,
  onReviewClick,
}: {
  member: StaffMember;
  renderRating: (rating?: number) => React.ReactNode;
  onReviewClick: () => void;
}) {
  return (
    <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center gap-4">
        {/* Avatar */}
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
              {member.displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="text-theme-text-primary truncate font-bold">{member.displayName}</h3>
          {member.jobTitle && (
            <p className="text-theme-text-secondary truncate text-sm">{member.jobTitle}</p>
          )}

          {/* Rating */}
          {member.averageRating && member.averageRating > 0 && (
            <div className="mt-1 flex items-center gap-2">
              <div className="flex">{renderRating(member.averageRating)}</div>
              <span className="text-theme-text-secondary text-sm">
                ({member.totalReviews || 0})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Review Button */}
      <button
        onClick={onReviewClick}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 font-medium text-white transition-colors hover:bg-pink-600"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
        Lascia una recensione
      </button>
    </div>
  );
}
