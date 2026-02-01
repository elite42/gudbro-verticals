'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Wrench,
  Broom,
  Question,
  Warning,
  X,
  Check,
  Camera,
  FileImage,
  ArrowCounterClockwise,
  PaperPlaneTilt,
} from '@phosphor-icons/react';
import { processDocumentImage } from '@/lib/image-utils';
import { submitFeedback, getFeedbackUploadUrl } from '@/lib/feedback-api';
import type { FeedbackCategory } from '@/types/stay';

type FeedbackStep = 'category' | 'details' | 'photo' | 'submitting' | 'done' | 'error';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  stayCode: string;
  token: string;
}

const CATEGORIES: { value: FeedbackCategory; label: string; icon: typeof Wrench; color: string }[] =
  [
    { value: 'maintenance', label: 'Maintenance', icon: Wrench, color: '#E07A5F' },
    { value: 'housekeeping', label: 'Housekeeping', icon: Broom, color: '#3D8B87' },
    { value: 'question', label: 'Question', icon: Question, color: '#6366F1' },
    { value: 'complaint', label: 'Complaint', icon: Warning, color: '#DC2626' },
  ];

function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export default function FeedbackForm({ isOpen, onClose, stayCode, token }: FeedbackFormProps) {
  const [step, setStep] = useState<FeedbackStep>('category');
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory | null>(null);
  const [message, setMessage] = useState('');
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setStep('category');
    setSelectedCategory(null);
    setMessage('');
    setProcessedBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setErrorMessage('');
  }, [previewUrl]);

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleCategorySelect = (cat: FeedbackCategory) => {
    setSelectedCategory(cat);
    setStep('details');
  };

  const handleDetailsNext = () => {
    if (message.trim().length < 10) return;
    setStep('photo');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await processDocumentImage(file);
      setProcessedBlob(result.blob);
      const url = URL.createObjectURL(result.blob);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(url);
    } catch (err) {
      console.error('[FeedbackForm] image processing error:', err);
      // Don't fail the form, just skip the photo
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setProcessedBlob(null);
  };

  const handleSubmit = async () => {
    if (!selectedCategory || message.trim().length < 10) return;

    setStep('submitting');

    try {
      let photoUrl: string | undefined;

      // Upload photo if present
      if (processedBlob) {
        const { data: uploadData, error: uploadErr } = await getFeedbackUploadUrl(stayCode, token);

        if (uploadErr || !uploadData) {
          throw new Error(uploadErr || 'Failed to get upload URL');
        }

        const uploadRes = await fetch(uploadData.signedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': processedBlob.type || 'image/jpeg' },
          body: processedBlob,
        });

        if (!uploadRes.ok) {
          throw new Error(`Photo upload failed (${uploadRes.status})`);
        }

        photoUrl = uploadData.path;
      }

      // Submit feedback
      const { error: submitErr } = await submitFeedback(stayCode, token, {
        category: selectedCategory,
        message: message.trim(),
        photoUrl,
      });

      if (submitErr) {
        throw new Error(submitErr);
      }

      setStep('done');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('[FeedbackForm] submit error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.');
      setStep('error');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/40" onClick={handleClose} />

      {/* Bottom sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white pb-8 shadow-xl">
        {/* Handle bar */}
        <div className="sticky top-0 z-10 flex justify-center bg-white pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <div className="px-5">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#2D2016]">
              {step === 'category' && 'Report an Issue'}
              {step === 'details' && 'Describe the Issue'}
              {step === 'photo' && 'Add Photo (Optional)'}
              {step === 'submitting' && 'Submitting...'}
              {step === 'done' && 'Thank You!'}
              {step === 'error' && 'Something Went Wrong'}
            </h2>
            {step !== 'submitting' && step !== 'done' && (
              <button onClick={handleClose} className="text-[#8B7355] hover:text-[#2D2016]">
                <X size={22} />
              </button>
            )}
          </div>

          {/* Step: Category */}
          {step === 'category' && (
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => handleCategorySelect(value)}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-colors hover:bg-[#FAF8F5]"
                  style={{ borderTopWidth: '3px', borderTopColor: color }}
                >
                  <Icon size={32} weight="duotone" style={{ color }} />
                  <span className="text-sm font-medium text-[#2D2016]">{label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step: Details */}
          {step === 'details' && (
            <div className="space-y-4">
              {selectedCategory && (
                <div className="flex items-center gap-2">
                  {CATEGORIES.filter((c) => c.value === selectedCategory).map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <div key={cat.value} className="flex items-center gap-2">
                        <CatIcon size={20} weight="duotone" style={{ color: cat.color }} />
                        <span className="text-sm font-medium text-[#2D2016]">{cat.label}</span>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => setStep('category')}
                    className="ml-auto text-xs text-[#3D8B87] hover:underline"
                  >
                    Change
                  </button>
                </div>
              )}

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe the issue in detail..."
                rows={4}
                className="w-full resize-none rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm text-[#2D2016] placeholder-[#8B7355]/60 focus:border-[#3D8B87] focus:outline-none focus:ring-1 focus:ring-[#3D8B87]"
              />

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs ${message.trim().length < 10 ? 'text-[#8B7355]' : 'text-emerald-600'}`}
                >
                  {message.trim().length}/10 min characters
                </span>
                <button
                  onClick={handleDetailsNext}
                  disabled={message.trim().length < 10}
                  className="rounded-xl bg-[#3D8B87] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3D8B87]/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step: Photo (optional) */}
          {step === 'photo' && (
            <div className="space-y-4">
              <p className="text-sm text-[#8B7355]">
                A photo helps us understand and resolve the issue faster.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.heic,.heif"
                capture={isMobile() ? 'environment' : undefined}
                onChange={handleFileSelect}
                className="hidden"
              />

              {previewUrl ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-xl border border-[#E8E2D9]">
                    <img
                      src={previewUrl}
                      alt="Feedback photo"
                      className="max-h-48 w-full object-contain"
                    />
                  </div>
                  <button
                    onClick={handleRemovePhoto}
                    className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700"
                  >
                    <ArrowCounterClockwise size={14} />
                    Remove photo
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {isMobile() && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm font-medium text-[#2D2016] transition-colors hover:bg-[#FAF8F5]"
                    >
                      <Camera size={20} className="text-[#3D8B87]" />
                      Take Photo
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.removeAttribute('capture');
                        fileInputRef.current.click();
                        if (isMobile()) {
                          fileInputRef.current.setAttribute('capture', 'environment');
                        }
                      }
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm font-medium text-[#2D2016] transition-colors hover:bg-[#FAF8F5]"
                  >
                    <FileImage size={20} className="text-[#3D8B87]" />
                    {isMobile() ? 'Choose from Gallery' : 'Select File'}
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm font-medium text-[#2D2016] transition-colors hover:bg-[#FAF8F5]"
                >
                  Skip Photo
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!processedBlob}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D8B87] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3D8B87]/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <PaperPlaneTilt size={16} />
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Step: Submitting */}
          {step === 'submitting' && (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3D8B87] border-t-transparent" />
              <p className="text-sm text-[#8B7355]">Sending your feedback...</p>
            </div>
          )}

          {/* Step: Done */}
          {step === 'done' && (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Check size={24} weight="bold" className="text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-[#2D2016]">Feedback submitted successfully</p>
              <p className="text-xs text-[#8B7355]">The host has been notified.</p>
            </div>
          )}

          {/* Step: Error */}
          {step === 'error' && (
            <div className="space-y-4">
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
                <Warning size={20} className="mt-0.5 shrink-0 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-800">Submission failed</p>
                  <p className="mt-0.5 text-xs text-red-700">{errorMessage}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex flex-1 items-center justify-center rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm font-medium text-[#2D2016] transition-colors hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D8B87] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3D8B87]/90"
                >
                  <ArrowCounterClockwise size={16} />
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
