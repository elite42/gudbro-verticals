import { SpinnerGap, Check } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

interface SaveButtonProps {
  isSaving: boolean;
  saveSuccess: boolean;
  onSave: () => void;
}

export function SaveButton({ isSaving, saveSuccess, onSave }: SaveButtonProps) {
  const t = useTranslations('paymentsPage');

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
      <div>
        {saveSuccess && (
          <span className="flex items-center gap-1 text-sm text-green-600">
            <Check className="h-4 w-4" />
            {t('saveSuccess')}
          </span>
        )}
      </div>
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {isSaving ? (
          <>
            <SpinnerGap className="h-4 w-4 animate-spin" />
            {t('saving')}
          </>
        ) : (
          t('saveChanges')
        )}
      </button>
    </div>
  );
}
