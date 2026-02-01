'use client';

import { useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { hashConsentText } from '@/lib/image-utils';

const CONSENT_TEXT =
  'I consent to the processing of my passport/visa documents for temporary residence registration with local authorities.';

interface DocumentConsentProps {
  onConsent: (hash: string) => void;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export default function DocumentConsent({
  onConsent,
  isChecked,
  onCheckChange,
}: DocumentConsentProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (checked: boolean) => {
    onCheckChange(checked);
    if (checked) {
      onConsent(hashConsentText(CONSENT_TEXT));
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#E8E2D9] text-[#3D8B87] accent-[#3D8B87]"
        />
        <span className="text-sm leading-relaxed text-[#2D2016]">{CONSENT_TEXT}</span>
      </label>

      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-1 text-xs font-medium text-[#3D8B87] hover:underline"
      >
        {showDetails ? <CaretUp size={14} /> : <CaretDown size={14} />}
        {showDetails ? 'Hide details' : 'Learn more'}
      </button>

      {showDetails && (
        <div className="space-y-2 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] p-3 text-xs text-[#8B7355]">
          <p>
            <strong className="text-[#2D2016]">What data:</strong> Your passport photo page or visa
            page image.
          </p>
          <p>
            <strong className="text-[#2D2016]">Why:</strong> Legal obligation for temporary
            residence registration with local immigration authorities.
          </p>
          <p>
            <strong className="text-[#2D2016]">Who sees it:</strong> Only the property owner/manager
            and local authorities as required by law.
          </p>
          <p>
            <strong className="text-[#2D2016]">Retention:</strong> Documents are retained for the
            duration required by local law (typically 30 days after checkout), then permanently
            deleted.
          </p>
          <p>
            <strong className="text-[#2D2016]">Your rights:</strong> You may request deletion of
            your documents at any time by contacting the property. Deletion may be delayed if
            required by law.
          </p>
        </div>
      )}
    </div>
  );
}
