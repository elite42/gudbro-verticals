'use client';

import { useState, useEffect } from 'react';
import {
  getPendingContributions,
  getContributionStats,
  approveContribution,
  rejectContribution,
  markAsDuplicate,
  searchIngredients,
  type PendingContribution,
} from '@/lib/contribution-admin-service';
import { InfoTooltip } from '@/components/ui/info-tooltip';

type ActionType = 'approve' | 'reject' | 'duplicate' | null;

interface ModalState {
  isOpen: boolean;
  contribution: PendingContribution | null;
  action: ActionType;
}

export default function ContributionsPage() {
  const [contributions, setContributions] = useState<PendingContribution[]>([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    contribution: null,
    action: null,
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [duplicateSearch, setDuplicateSearch] = useState('');
  const [duplicateResults, setDuplicateResults] = useState<{ id: string; name: string }[]>([]);
  const [selectedDuplicateId, setSelectedDuplicateId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [contribs, statsData] = await Promise.all([
      getPendingContributions(),
      getContributionStats(),
    ]);
    setContributions(contribs);
    setStats(statsData);
    setIsLoading(false);
  };

  const openModal = (contribution: PendingContribution, action: ActionType) => {
    setModal({ isOpen: true, contribution, action });
    setNotes('');
    setRejectionReason('');
    setDuplicateSearch('');
    setDuplicateResults([]);
    setSelectedDuplicateId('');
  };

  const closeModal = () => {
    setModal({ isOpen: false, contribution: null, action: null });
  };

  const handleSearchDuplicate = async (query: string) => {
    setDuplicateSearch(query);
    if (query.length >= 2) {
      const results = await searchIngredients(query);
      setDuplicateResults(results);
    } else {
      setDuplicateResults([]);
    }
  };

  const handleAction = async () => {
    if (!modal.contribution) return;

    setActionLoading(true);

    // Mock reviewer account ID - in production this comes from auth
    const reviewerAccountId = '00000000-0000-0000-0000-000000000000';

    let result;
    switch (modal.action) {
      case 'approve':
        result = await approveContribution(modal.contribution.id, reviewerAccountId, {
          isNew: true,
          notes,
        });
        break;
      case 'reject':
        result = await rejectContribution(
          modal.contribution.id,
          reviewerAccountId,
          rejectionReason,
          notes
        );
        break;
      case 'duplicate':
        if (!selectedDuplicateId) {
          setActionLoading(false);
          return;
        }
        result = await markAsDuplicate(
          modal.contribution.id,
          reviewerAccountId,
          selectedDuplicateId,
          notes
        );
        break;
    }

    setActionLoading(false);

    if (result?.success) {
      closeModal();
      loadData();
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryLabel = (category: string | undefined) => {
    const labels: Record<string, string> = {
      vegetables: 'Verdure',
      fruits: 'Frutta',
      meat: 'Carne',
      poultry: 'Pollame',
      seafood: 'Pesce',
      dairy: 'Latticini',
      grains: 'Cereali',
      legumes: 'Legumi',
      nuts_seeds: 'Frutta Secca',
      herbs: 'Erbe',
      spices: 'Spezie',
      oils_fats: 'Oli',
      sweeteners: 'Dolcificanti',
      condiments: 'Condimenti',
      beverages: 'Bevande',
      other: 'Altro',
    };
    return labels[category || ''] || category || '-';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Ingredient Contributions</h1>
            <InfoTooltip contentKey="pages.contributions" kbPageId="content-contributions" />
          </div>
          <p className="text-gray-600">Review and approve user-submitted ingredients</p>
        </div>
        <button
          onClick={loadData}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
          <p className="text-sm text-yellow-600">Pending Review</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
          <p className="text-sm text-green-600">Approved</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
          <p className="text-sm text-red-600">Rejected</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
          <p className="text-sm text-blue-600">Total</p>
        </div>
      </div>

      {/* Contributions Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Pending Contributions</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
            <p className="mt-3 text-gray-500">Loading...</p>
          </div>
        ) : contributions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-3xl">✓</span>
            </div>
            <p className="font-medium text-gray-600">All caught up!</p>
            <p className="mt-1 text-sm text-gray-500">No pending contributions to review</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ingredient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contributor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Submitted
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contributions.map((contribution) => (
                <tr key={contribution.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{contribution.ingredientName}</p>
                      {contribution.ingredientNameLocal && (
                        <p className="text-sm text-gray-500">{contribution.ingredientNameLocal}</p>
                      )}
                      {contribution.submittedJson.allergens &&
                        contribution.submittedJson.allergens.length > 0 && (
                          <div className="mt-1 flex gap-1">
                            {contribution.submittedJson.allergens.slice(0, 3).map((a) => (
                              <span
                                key={a}
                                className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] text-red-700"
                              >
                                {a}
                              </span>
                            ))}
                            {contribution.submittedJson.allergens.length > 3 && (
                              <span className="text-[10px] text-gray-500">
                                +{contribution.submittedJson.allergens.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-700">
                      {getCategoryLabel(contribution.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">
                        {contribution.contributorName || contribution.contributorEmail}
                      </p>
                      <p className="text-xs text-gray-500">
                        {contribution.contributorTotalPoints} points
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-lg px-2 py-1 text-xs font-medium ${
                        contribution.sourceType === 'photo_ai'
                          ? 'bg-purple-100 text-purple-700'
                          : contribution.sourceType === 'barcode'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {contribution.sourceType === 'photo_ai'
                        ? 'AI Photo'
                        : contribution.sourceType === 'barcode'
                          ? 'Barcode'
                          : contribution.sourceType === 'import'
                            ? 'Import'
                            : 'Manual'}
                    </span>
                    {contribution.aiConfidenceScore && (
                      <span className="ml-1 text-xs text-gray-500">
                        {Math.round(contribution.aiConfidenceScore * 100)}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(contribution.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(contribution, 'approve')}
                        className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-100"
                        title="Approve"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => openModal(contribution, 'duplicate')}
                        className="rounded-lg p-2 text-yellow-600 transition-colors hover:bg-yellow-100"
                        title="Mark as Duplicate"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => openModal(contribution, 'reject')}
                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-100"
                        title="Reject"
                      >
                        <svg
                          className="h-5 w-5"
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
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Action Modal */}
      {modal.isOpen && modal.contribution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white">
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  {modal.action === 'approve' && 'Approve Contribution'}
                  {modal.action === 'reject' && 'Reject Contribution'}
                  {modal.action === 'duplicate' && 'Mark as Duplicate'}
                </h3>
                <button
                  onClick={closeModal}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  <svg
                    className="h-5 w-5 text-gray-500"
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
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 p-6">
              {/* Contribution Preview */}
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-lg font-semibold text-gray-900">
                  {modal.contribution.ingredientName}
                </p>
                {modal.contribution.category && (
                  <p className="mt-1 text-sm text-gray-600">
                    Category: {getCategoryLabel(modal.contribution.category)}
                  </p>
                )}
                {modal.contribution.submittedJson.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {modal.contribution.submittedJson.description}
                  </p>
                )}
              </div>

              {/* Rejection Reason (for reject action) */}
              {modal.action === 'reject' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Rejection Reason *
                  </label>
                  <select
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select reason...</option>
                    <option value="incomplete">Incomplete information</option>
                    <option value="invalid">Invalid ingredient</option>
                    <option value="inappropriate">Inappropriate content</option>
                    <option value="low_quality">Low quality submission</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              {/* Duplicate Search (for duplicate action) */}
              {modal.action === 'duplicate' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Search Existing Ingredient *
                  </label>
                  <input
                    type="text"
                    value={duplicateSearch}
                    onChange={(e) => handleSearchDuplicate(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                  />
                  {duplicateResults.length > 0 && (
                    <div className="mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200">
                      {duplicateResults.map((ing) => (
                        <button
                          key={ing.id}
                          onClick={() => setSelectedDuplicateId(ing.id)}
                          className={`w-full px-4 py-2 text-left transition-colors hover:bg-gray-50 ${
                            selectedDuplicateId === ing.id ? 'bg-yellow-50' : ''
                          }`}
                        >
                          <span className="font-medium">{ing.name}</span>
                          <span className="ml-2 text-xs text-gray-500">{ing.id}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {selectedDuplicateId && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {duplicateResults.find((i) => i.id === selectedDuplicateId)?.name}
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add reviewer notes..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Points Info */}
              {modal.action === 'approve' && (
                <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="font-medium text-purple-900">50 points will be awarded</p>
                    <p className="text-sm text-purple-700">
                      to {modal.contribution.contributorName || modal.contribution.contributorEmail}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 border-t border-gray-200 p-6">
              <button
                onClick={closeModal}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={
                  actionLoading ||
                  (modal.action === 'reject' && !rejectionReason) ||
                  (modal.action === 'duplicate' && !selectedDuplicateId)
                }
                className={`flex-1 rounded-lg px-4 py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  modal.action === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : modal.action === 'reject'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                }`}
              >
                {actionLoading
                  ? 'Processing...'
                  : modal.action === 'approve'
                    ? 'Approve & Award Points'
                    : modal.action === 'reject'
                      ? 'Reject'
                      : 'Mark as Duplicate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
