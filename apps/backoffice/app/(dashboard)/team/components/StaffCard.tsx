'use client';

import type { StaffProfile } from './types';

function StaffCard({ profile, onEdit }: { profile: StaffProfile; onEdit: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-700';
      case 'terminated':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Attivo';
      case 'on_leave':
        return 'In ferie';
      case 'terminated':
        return 'Non attivo';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      {/* Header with photo */}
      <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.displayName}
                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/20 text-xl font-bold text-white shadow-lg">
                {profile.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-white">{profile.displayName}</h3>
              <p className="text-sm text-white/80">{profile.jobTitle}</p>
            </div>
          </div>
          {profile.isPublic && (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
              👁️ Pubblico
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-4 w-4 ${star <= profile.averageRating ? 'text-yellow-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm font-medium text-gray-700">
              {profile.averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-500">{profile.totalReviews} review</span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-gray-500">Positive rate</span>
            <span className="font-medium text-gray-700">
              {profile.positiveReviewRate.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${profile.positiveReviewRate}%` }}
            />
          </div>
        </div>

        {/* Specialties */}
        {profile.specialties.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {profile.specialties.slice(0, 3).map((s) => (
              <span key={s} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                {s}
              </span>
            ))}
            {profile.specialties.length > 3 && (
              <span className="text-xs text-gray-400">+{profile.specialties.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(profile.status)}`}
          >
            {getStatusLabel(profile.status)}
          </span>
          <button onClick={onEdit} className="text-xs text-blue-600 hover:text-blue-700">
            Modifica →
          </button>
        </div>
      </div>
    </div>
  );
}

export { StaffCard };
