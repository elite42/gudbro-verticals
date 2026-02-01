'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Camera,
  FileImage,
  Check,
  Warning,
  IdentificationBadge,
  IdentificationCard,
  ArrowCounterClockwise,
  X,
  Upload,
} from '@phosphor-icons/react';
import type { GuestDocument } from '@/types/stay';
import { processDocumentImage } from '@/lib/image-utils';
import { requestDocumentUploadUrl, confirmDocumentUpload } from '@/lib/stay-api';
import DocumentConsent from './DocumentConsent';

type UploadStep =
  | 'idle'
  | 'consent'
  | 'capture'
  | 'processing'
  | 'preview'
  | 'details'
  | 'uploading'
  | 'done'
  | 'error';

type DocType = 'passport' | 'visa';

interface DocumentUploadProps {
  bookingCode: string;
  token: string;
  onUploadComplete: () => void;
  existingDocuments: GuestDocument[];
}

function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export default function DocumentUpload({
  bookingCode,
  token,
  onUploadComplete,
  existingDocuments,
}: DocumentUploadProps) {
  const [step, setStep] = useState<UploadStep>('idle');
  const [docType, setDocType] = useState<DocType | null>(null);
  const [consentHash, setConsentHash] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isBlurry, setIsBlurry] = useState(false);
  const [visaExpiryDate, setVisaExpiryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasPassport = existingDocuments.some(
    (d) => d.documentType === 'passport' && !d.supersededBy
  );

  const resetState = useCallback(() => {
    setStep('idle');
    setDocType(null);
    setProcessedBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setIsBlurry(false);
    setVisaExpiryDate('');
    setErrorMessage('');
  }, [previewUrl]);

  const handleDocTypeSelect = (type: DocType) => {
    setDocType(type);
    // If already consented (from a previous upload in this session), skip consent
    if (consentHash) {
      setStep('capture');
    } else {
      setStep('consent');
    }
  };

  const handleConsentGiven = (hash: string) => {
    setConsentHash(hash);
  };

  const proceedToCapture = () => {
    if (!consentHash) return;
    setStep('capture');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStep('processing');
    try {
      const result = await processDocumentImage(file);
      setProcessedBlob(result.blob);
      setIsBlurry(result.isBlurry);

      const url = URL.createObjectURL(result.blob);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(url);

      if (result.isBlurry) {
        setStep('preview'); // Show blur warning
      } else if (docType === 'visa') {
        setStep('details'); // Need expiry date
      } else {
        setStep('preview'); // Show preview before upload
      }
    } catch (err) {
      console.error('[DocumentUpload] processing error:', err);
      setErrorMessage('Failed to process image. Please try again.');
      setStep('error');
    }

    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRetake = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setProcessedBlob(null);
    setIsBlurry(false);
    setStep('capture');
  };

  const handleProceedFromPreview = () => {
    if (docType === 'visa') {
      setStep('details');
    } else {
      handleUpload();
    }
  };

  const handleUpload = async () => {
    if (!processedBlob || !docType || !consentHash) return;

    setStep('uploading');
    try {
      // 1. Get signed upload URL
      const { data: uploadData, error: urlError } = await requestDocumentUploadUrl(
        bookingCode,
        token,
        {
          documentType: docType,
          consentTextHash: consentHash,
          visaExpiryDate: docType === 'visa' && visaExpiryDate ? visaExpiryDate : undefined,
        }
      );

      if (urlError || !uploadData) {
        throw new Error(urlError || 'Failed to get upload URL');
      }

      // 2. Upload to signed URL
      const uploadRes = await fetch(uploadData.signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': processedBlob.type || 'image/jpeg',
        },
        body: processedBlob,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed (${uploadRes.status})`);
      }

      // 3. Confirm upload
      const { error: confirmError } = await confirmDocumentUpload(bookingCode, token, {
        docId: uploadData.docId,
        fileSizeBytes: processedBlob.size,
      });

      if (confirmError) {
        throw new Error(confirmError);
      }

      setStep('done');
      setTimeout(() => {
        onUploadComplete();
        resetState();
      }, 1500);
    } catch (err) {
      console.error('[DocumentUpload] upload error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setStep('error');
    }
  };

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  // --- Render ---

  // Step: idle — document type selector
  if (step === 'idle') {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#2D2016]">Upload Document</h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleDocTypeSelect('passport')}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-colors hover:border-[#3D8B87] hover:bg-[#3D8B87]/5"
          >
            <IdentificationCard size={32} weight="duotone" className="text-[#3D8B87]" />
            <span className="text-sm font-medium text-[#2D2016]">Passport</span>
            {hasPassport && (
              <span className="flex items-center gap-1 text-xs text-emerald-600">
                <Check size={12} weight="bold" />
                On file
              </span>
            )}
          </button>

          <button
            onClick={() => handleDocTypeSelect('visa')}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-colors hover:border-[#3D8B87] hover:bg-[#3D8B87]/5"
          >
            <IdentificationBadge size={32} weight="duotone" className="text-[#3D8B87]" />
            <span className="text-sm font-medium text-[#2D2016]">Visa</span>
          </button>
        </div>
      </div>
    );
  }

  // Step: consent
  if (step === 'consent') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2D2016]">Data Protection Consent</h3>
          <button onClick={resetState} className="text-[#8B7355] hover:text-[#2D2016]">
            <X size={20} />
          </button>
        </div>

        <DocumentConsent
          onConsent={handleConsentGiven}
          isChecked={consentChecked}
          onCheckChange={setConsentChecked}
        />

        <button
          onClick={proceedToCapture}
          disabled={!consentHash}
          className="w-full rounded-xl bg-[#3D8B87] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3D8B87]/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    );
  }

  // Step: capture
  if (step === 'capture') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2D2016]">
            Upload {docType === 'passport' ? 'Passport' : 'Visa'}
          </h3>
          <button onClick={resetState} className="text-[#8B7355] hover:text-[#2D2016]">
            <X size={20} />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          capture={isMobile() ? 'environment' : undefined}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          {isMobile() && (
            <button
              onClick={openFileInput}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D8B87] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3D8B87]/90"
            >
              <Camera size={20} />
              Take Photo
            </button>
          )}

          <button
            onClick={() => {
              // Remove capture attribute for gallery selection
              if (fileInputRef.current) {
                fileInputRef.current.removeAttribute('capture');
                fileInputRef.current.click();
                // Restore capture for next use
                if (isMobile()) {
                  fileInputRef.current.setAttribute('capture', 'environment');
                }
              }
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              isMobile()
                ? 'border-[#E8E2D9] bg-white text-[#2D2016] hover:bg-[#FAF8F5]'
                : 'border-[#3D8B87] bg-[#3D8B87] text-white hover:bg-[#3D8B87]/90'
            }`}
          >
            <FileImage size={20} />
            {isMobile() ? 'Choose from Gallery' : 'Select File'}
          </button>
        </div>

        <p className="text-center text-xs text-[#8B7355]">
          Supported: JPEG, PNG, HEIC. Max 10MB before compression.
        </p>
      </div>
    );
  }

  // Step: processing
  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3D8B87] border-t-transparent" />
        <p className="text-sm text-[#8B7355]">Processing image...</p>
      </div>
    );
  }

  // Step: preview (with optional blur warning)
  if (step === 'preview') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2D2016]">Preview</h3>
          <button onClick={resetState} className="text-[#8B7355] hover:text-[#2D2016]">
            <X size={20} />
          </button>
        </div>

        {isBlurry && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
            <Warning size={20} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-800">Photo appears blurry</p>
              <p className="mt-0.5 text-xs text-amber-700">
                For best results, hold your phone steady and ensure good lighting.
              </p>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="overflow-hidden rounded-xl border border-[#E8E2D9]">
            <img src={previewUrl} alt="Document preview" className="w-full object-contain" />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleRetake}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm font-medium text-[#2D2016] transition-colors hover:bg-[#FAF8F5]"
          >
            <ArrowCounterClockwise size={16} />
            Retake
          </button>
          <button
            onClick={handleProceedFromPreview}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D8B87] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3D8B87]/90"
          >
            {isBlurry ? 'Use Anyway' : docType === 'visa' ? 'Next' : 'Upload'}
          </button>
        </div>
      </div>
    );
  }

  // Step: details (visa expiry date)
  if (step === 'details') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2D2016]">Visa Details</h3>
          <button onClick={resetState} className="text-[#8B7355] hover:text-[#2D2016]">
            <X size={20} />
          </button>
        </div>

        <div>
          <label htmlFor="visa-expiry" className="mb-1.5 block text-sm text-[#8B7355]">
            Visa expiry date
          </label>
          <input
            id="visa-expiry"
            type="date"
            value={visaExpiryDate}
            onChange={(e) => setVisaExpiryDate(e.target.value)}
            className="w-full rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm text-[#2D2016] focus:border-[#3D8B87] focus:outline-none focus:ring-1 focus:ring-[#3D8B87]"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!visaExpiryDate}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D8B87] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3D8B87]/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Upload size={16} />
          Upload Visa
        </button>
      </div>
    );
  }

  // Step: uploading
  if (step === 'uploading') {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3D8B87] border-t-transparent" />
        <p className="text-sm text-[#8B7355]">Uploading document...</p>
      </div>
    );
  }

  // Step: done
  if (step === 'done') {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Check size={24} weight="bold" className="text-emerald-600" />
        </div>
        <p className="text-sm font-medium text-[#2D2016]">Document uploaded successfully</p>
      </div>
    );
  }

  // Step: error
  if (step === 'error') {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
          <Warning size={20} className="mt-0.5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800">Upload failed</p>
            <p className="mt-0.5 text-xs text-red-700">{errorMessage}</p>
          </div>
        </div>

        <button
          onClick={resetState}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm font-medium text-[#2D2016] transition-colors hover:bg-[#FAF8F5]"
        >
          <ArrowCounterClockwise size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return null;
}
