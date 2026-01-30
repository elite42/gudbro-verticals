'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  Bug,
  Lightbulb,
  ChatCircle,
  Camera,
  X,
  Check,
  CaretDown,
  CaretUp,
  Image,
} from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

type FeedbackType = 'bug' | 'feature_request' | 'feedback';

interface Submission {
  id: string;
  original_title: string;
  type: string;
  status: string;
  created_at: string;
  screenshot_url: string | null;
  original_body: string;
}

interface FeedbackSubmissionManagerProps {
  merchantId: string;
}

const TYPE_OPTIONS: {
  value: FeedbackType;
  label: string;
  icon: typeof Bug;
  accent: string;
  selectedBg: string;
  selectedBorder: string;
  selectedText: string;
}[] = [
  {
    value: 'bug',
    label: 'Bug',
    icon: Bug,
    accent: 'red',
    selectedBg: 'bg-red-50',
    selectedBorder: 'border-red-400',
    selectedText: 'text-red-700',
  },
  {
    value: 'feature_request',
    label: 'Nuova Funzione',
    icon: Lightbulb,
    accent: 'blue',
    selectedBg: 'bg-blue-50',
    selectedBorder: 'border-blue-400',
    selectedText: 'text-blue-700',
  },
  {
    value: 'feedback',
    label: 'Feedback',
    icon: ChatCircle,
    accent: 'green',
    selectedBg: 'bg-green-50',
    selectedBorder: 'border-green-400',
    selectedText: 'text-green-700',
  },
];

// ============================================================================
// Display helpers
// ============================================================================

const TYPE_BADGE_MAP: Record<string, { label: string; bg: string; text: string }> = {
  bug: { label: 'Bug', bg: 'bg-red-100', text: 'text-red-700' },
  feature_request: { label: 'Richiesta', bg: 'bg-blue-100', text: 'text-blue-700' },
  improvement: { label: 'Feedback', bg: 'bg-green-100', text: 'text-green-700' },
};

const STATUS_BADGE_MAP: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'In attesa', bg: 'bg-gray-100', text: 'text-gray-700' },
  processing: { label: 'In elaborazione', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  processed: { label: 'Elaborato', bg: 'bg-blue-100', text: 'text-blue-700' },
  acknowledged: { label: 'Preso in carico', bg: 'bg-green-100', text: 'text-green-700' },
  rejected: { label: 'Rifiutato', bg: 'bg-red-100', text: 'text-red-700' },
};

function getTypeBadge(type: string) {
  return (
    TYPE_BADGE_MAP[type] || {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      bg: 'bg-gray-100',
      text: 'text-gray-700',
    }
  );
}

function getStatusBadge(status: string) {
  return (
    STATUS_BADGE_MAP[status] || {
      label: status.charAt(0).toUpperCase() + status.slice(1),
      bg: 'bg-gray-100',
      text: 'text-gray-700',
    }
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

// ============================================================================
// Component
// ============================================================================

export function FeedbackSubmissionManager({ merchantId }: FeedbackSubmissionManagerProps) {
  const pathname = usePathname();

  // Form state
  const [type, setType] = useState<FeedbackType>('feedback');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // History state
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch submission history
  const fetchHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch(`/api/feedback/history?merchantId=${merchantId}`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error('Error fetching feedback history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [merchantId]);

  // Fetch history on mount
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Clean up object URL on unmount or removal
  useEffect(() => {
    return () => {
      if (screenshotPreview) {
        URL.revokeObjectURL(screenshotPreview);
      }
    };
  }, [screenshotPreview]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Formato non supportato. Usa PNG, JPG o WebP.');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Immagine troppo grande. Massimo 5MB.');
      return;
    }

    // Clear previous preview
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
    }

    setScreenshotFile(file);
    setScreenshotPreview(URL.createObjectURL(file));
    setError(null);
  };

  // Remove screenshot
  const removeScreenshot = () => {
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
    }
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Reset form
  const resetForm = () => {
    setType('feedback');
    setTitle('');
    setBody('');
    removeScreenshot();
    setError(null);
  };

  // Submit handler
  const handleSubmit = async () => {
    setIsSaving(true);
    setError(null);

    try {
      let screenshotUrl: string | null = null;

      // Upload screenshot if present
      if (screenshotFile) {
        const formData = new FormData();
        formData.append('file', screenshotFile);
        formData.append('folder', 'feedback-screenshots');
        formData.append('entityId', crypto.randomUUID());

        const uploadRes = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json();
          throw new Error(uploadError.error || 'Errore nel caricamento dello screenshot');
        }

        const uploadData = await uploadRes.json();
        screenshotUrl = uploadData.url;
      }

      // Map UI type to API type
      const apiType = type === 'feedback' ? 'improvement' : type;

      // Submit feedback
      const res = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          original_title: title.trim(),
          original_body: body.trim(),
          type: apiType,
          merchant_id: merchantId,
          vertical: 'backoffice',
          page_path: pathname,
          screenshot_url: screenshotUrl,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Errore nell'invio della segnalazione");
      }

      // Success
      resetForm();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);

      // Refresh history to show new submission
      fetchHistory();
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(err instanceof Error ? err.message : "Errore nell'invio della segnalazione");
    } finally {
      setIsSaving(false);
    }
  };

  const canSubmit = !isSaving && title.trim().length > 0 && body.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" weight="bold" />
            <p className="font-medium text-green-800">
              Segnalazione inviata con successo! Grazie per il tuo feedback.
            </p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Form Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="space-y-6 p-6">
          {/* Type Selector */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Tipo di segnalazione
            </label>
            <div className="grid grid-cols-3 gap-3">
              {TYPE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = type === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setType(option.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all ${
                      isSelected
                        ? `${option.selectedBg} ${option.selectedBorder} ${option.selectedText}`
                        : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={28} weight={isSelected ? 'fill' : 'duotone'} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Titolo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              placeholder="Descrivi brevemente il problema o la richiesta"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-400">{title.length}/200</p>
          </div>

          {/* Description Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Descrizione <span className="text-red-500">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              placeholder="Fornisci tutti i dettagli utili..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Screenshot (opzionale)
            </label>

            {screenshotPreview ? (
              <div className="relative inline-block">
                <img
                  src={screenshotPreview}
                  alt="Screenshot preview"
                  className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
                />
                <button
                  type="button"
                  onClick={removeScreenshot}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600"
              >
                <Camera size={20} weight="duotone" />
                Allega Screenshot
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="mt-1 text-xs text-gray-400">PNG, JPG o WebP. Massimo 5MB.</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Invia Segnalazione
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* History Section */}
      {/* ================================================================== */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="p-6">
          {/* Section Header */}
          <div className="mb-4 flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Le tue segnalazioni</h3>
            {!isLoadingHistory && submissions.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {submissions.length}
              </span>
            )}
          </div>

          {/* Loading */}
          {isLoadingHistory && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          )}

          {/* Empty State */}
          {!isLoadingHistory && submissions.length === 0 && (
            <p className="py-6 text-center text-sm italic text-gray-400">
              Nessuna segnalazione inviata
            </p>
          )}

          {/* Submissions List */}
          {!isLoadingHistory && submissions.length > 0 && (
            <div className="divide-y divide-gray-100">
              {submissions.map((sub) => {
                const typeBadge = getTypeBadge(sub.type);
                const statusBadge = getStatusBadge(sub.status);
                const isExpanded = expandedId === sub.id;

                return (
                  <div key={sub.id}>
                    {/* Row */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                      className="flex w-full items-center gap-3 px-2 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      {/* Title */}
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">
                        {sub.original_title}
                      </span>

                      {/* Type Badge */}
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeBadge.bg} ${typeBadge.text}`}
                      >
                        {typeBadge.label}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                      >
                        {statusBadge.label}
                      </span>

                      {/* Date */}
                      <span className="shrink-0 text-xs text-gray-400">
                        {formatDate(sub.created_at)}
                      </span>

                      {/* Expand icon */}
                      {isExpanded ? (
                        <CaretUp size={16} className="shrink-0 text-gray-400" />
                      ) : (
                        <CaretDown size={16} className="shrink-0 text-gray-400" />
                      )}
                    </button>

                    {/* Expanded Detail */}
                    {isExpanded && (
                      <div className="mb-3 ml-2 rounded-lg border border-gray-100 bg-gray-50 p-4">
                        {/* Description */}
                        <p className="whitespace-pre-wrap text-sm text-gray-700">
                          {sub.original_body}
                        </p>

                        {/* Screenshot */}
                        {sub.screenshot_url && (
                          <div className="mt-3">
                            <a
                              href={sub.screenshot_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-block"
                            >
                              <div className="flex items-center gap-2 text-xs text-blue-600 group-hover:text-blue-700">
                                <Image size={16} weight="duotone" />
                                <span className="underline">Vedi screenshot</span>
                              </div>
                              <img
                                src={sub.screenshot_url}
                                alt="Screenshot"
                                className="mt-2 h-32 w-auto rounded-lg border border-gray-200 object-cover"
                              />
                            </a>
                          </div>
                        )}

                        {/* Status in detail */}
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs text-gray-500">Stato:</span>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                          >
                            {statusBadge.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
