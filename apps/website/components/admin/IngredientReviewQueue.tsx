'use client';

import { useState, useEffect } from 'react';

interface Contribution {
  id: string;
  ingredient_name: string;
  category: string;
  submitted_json: {
    name: string;
    category: string;
    nutrition: {
      calories: number;
      protein: number;
      carbohydrates: number;
      fat: number;
      [key: string]: number | undefined;
    };
    allergens?: string[];
    is_vegan?: boolean;
    is_vegetarian?: boolean;
    is_gluten_free?: boolean;
    description?: string;
    brand?: string;
    origin_country?: string;
  };
  source_type: string;
  status: string;
  is_new_ingredient: boolean;
  created_at: string;
  accounts: {
    id: string;
    email: string;
    display_name: string;
    avatar_url: string | null;
  };
}

interface SimilarIngredient {
  id: string;
  name: string;
  category: string;
  nutrition: Record<string, number>;
}

interface ReviewQueueProps {
  initialStatus?: string;
}

export function IngredientReviewQueue({ initialStatus = 'pending' }: ReviewQueueProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [similarIngredients, setSimilarIngredients] = useState<SimilarIngredient[]>([]);
  const [processing, setProcessing] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [mergeIntoId, setMergeIntoId] = useState('');

  useEffect(() => {
    fetchContributions();
  }, [currentStatus]);

  const fetchContributions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/ingredients/contributions?status=${currentStatus}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch contributions');
      }

      const data = await response.json();
      setContributions(data.contributions);
      setCounts(data.counts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load contributions');
    } finally {
      setLoading(false);
    }
  };

  const fetchContributionDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/ingredients/contributions/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }

      const data = await response.json();
      setSelectedContribution(data.contribution);
      setSimilarIngredients(data.similarIngredients);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load details');
    }
  };

  const handleAction = async (action: 'approve' | 'reject' | 'merge' | 'mark_duplicate' | 'start_review') => {
    if (!selectedContribution) return;

    setProcessing(true);

    try {
      const response = await fetch(
        `/api/admin/ingredients/contributions/${selectedContribution.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
          },
          body: JSON.stringify({
            action,
            reviewerNotes: reviewNotes || undefined,
            rejectionReason: action === 'reject' ? reviewNotes : undefined,
            mergeIntoId: action === 'merge' ? mergeIntoId : undefined,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Action failed');
      }

      // Refresh list and close modal
      setSelectedContribution(null);
      setReviewNotes('');
      setMergeIntoId('');
      fetchContributions();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Action failed');
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusTabs = [
    { key: 'pending', label: 'Pending', color: 'yellow' },
    { key: 'in_review', label: 'In Review', color: 'blue' },
    { key: 'approved', label: 'Approved', color: 'green' },
    { key: 'rejected', label: 'Rejected', color: 'red' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Ingredient Review Queue</h2>
        <p className="text-sm text-gray-500">Review and approve user-contributed ingredients</p>
      </div>

      {/* Status Tabs */}
      <div className="flex border-b px-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurrentStatus(tab.key)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              currentStatus === tab.key
                ? `border-${tab.color}-500 text-${tab.color}-600`
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {counts[tab.key] !== undefined && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                currentStatus === tab.key
                  ? `bg-${tab.color}-100 text-${tab.color}-700`
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchContributions}
              className="text-green-500 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : contributions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No {currentStatus.replace('_', ' ')} contributions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contributions.map((contribution) => (
              <div
                key={contribution.id}
                onClick={() => fetchContributionDetails(contribution.id)}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {contribution.accounts.avatar_url ? (
                    <img
                      src={contribution.accounts.avatar_url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 font-medium">
                      {contribution.accounts.display_name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{contribution.ingredient_name}</p>
                  <p className="text-sm text-gray-500">
                    by {contribution.accounts.display_name || contribution.accounts.email}
                    {' • '}
                    <span className="capitalize">{contribution.category}</span>
                    {' • '}
                    {formatDate(contribution.created_at)}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                  {contribution.is_new_ingredient ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                      Possible Duplicate
                    </span>
                  )}
                  <span className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedContribution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">Review Contribution</h3>
              <button
                onClick={() => {
                  setSelectedContribution(null);
                  setReviewNotes('');
                  setMergeIntoId('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contributor Info */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {selectedContribution.accounts.display_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium">{selectedContribution.accounts.display_name}</p>
                  <p className="text-sm text-gray-500">{selectedContribution.accounts.email}</p>
                </div>
              </div>

              {/* Ingredient Data */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Submitted Ingredient</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <p className="font-medium">{selectedContribution.submitted_json.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <p className="font-medium capitalize">{selectedContribution.submitted_json.category}</p>
                  </div>
                  {selectedContribution.submitted_json.brand && (
                    <div>
                      <span className="text-gray-500">Brand:</span>
                      <p className="font-medium">{selectedContribution.submitted_json.brand}</p>
                    </div>
                  )}
                  {selectedContribution.submitted_json.origin_country && (
                    <div>
                      <span className="text-gray-500">Origin:</span>
                      <p className="font-medium">{selectedContribution.submitted_json.origin_country}</p>
                    </div>
                  )}
                </div>

                {/* Nutrition */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Nutrition per 100g</h5>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="font-bold">{selectedContribution.submitted_json.nutrition.calories}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="font-bold">{selectedContribution.submitted_json.nutrition.protein}g</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Carbs</p>
                      <p className="font-bold">{selectedContribution.submitted_json.nutrition.carbohydrates}g</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Fat</p>
                      <p className="font-bold">{selectedContribution.submitted_json.nutrition.fat}g</p>
                    </div>
                  </div>
                </div>

                {/* Allergens & Dietary */}
                <div className="flex flex-wrap gap-2">
                  {selectedContribution.submitted_json.allergens?.map((allergen) => (
                    <span key={allergen} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                      {allergen}
                    </span>
                  ))}
                  {selectedContribution.submitted_json.is_vegan && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Vegan</span>
                  )}
                  {selectedContribution.submitted_json.is_vegetarian && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Vegetarian</span>
                  )}
                  {selectedContribution.submitted_json.is_gluten_free && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Gluten Free</span>
                  )}
                </div>
              </div>

              {/* Similar Ingredients */}
              {similarIngredients.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Similar Existing Ingredients</h4>
                  <div className="space-y-2">
                    {similarIngredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          mergeIntoId === ingredient.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setMergeIntoId(ingredient.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{ingredient.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{ingredient.category}</p>
                          </div>
                          {mergeIntoId === ingredient.id && (
                            <span className="text-green-500">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes (optional)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes for the contributor..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {currentStatus === 'pending' && (
                  <button
                    onClick={() => handleAction('start_review')}
                    disabled={processing}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    Start Review
                  </button>
                )}

                {(currentStatus === 'pending' || currentStatus === 'in_review') && (
                  <>
                    <button
                      onClick={() => handleAction('approve')}
                      disabled={processing}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      Approve (+50 pts)
                    </button>

                    {similarIngredients.length > 0 && mergeIntoId && (
                      <button
                        onClick={() => handleAction('merge')}
                        disabled={processing}
                        className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-600 transition-colors disabled:opacity-50"
                      >
                        Merge (+25 pts)
                      </button>
                    )}

                    <button
                      onClick={() => handleAction('mark_duplicate')}
                      disabled={processing}
                      className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50"
                    >
                      Duplicate
                    </button>

                    <button
                      onClick={() => handleAction('reject')}
                      disabled={processing}
                      className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
