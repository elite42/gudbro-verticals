'use client';

import { useTranslations } from 'next-intl';
import type { ModifierGroup, GroupFormState } from './types';
import { GROUP_ICONS } from './types';

interface GroupFormModalProps {
  show: boolean;
  editingGroup: ModifierGroup | null;
  groupForm: GroupFormState;
  onFormChange: (form: GroupFormState) => void;
  onSave: () => void;
  onClose: () => void;
}

export function GroupFormModal({
  show,
  editingGroup,
  groupForm,
  onFormChange,
  onSave,
  onClose,
}: GroupFormModalProps) {
  const t = useTranslations('modifiersPage');

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {editingGroup ? t('groupModal.editTitle') : t('groupModal.addTitle')}
        </h2>

        <div className="space-y-4">
          {/* Icon picker */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('groupModal.icon')}
            </label>
            <div className="flex flex-wrap gap-2">
              {GROUP_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => onFormChange({ ...groupForm, icon })}
                  className={`h-10 w-10 rounded-lg border-2 text-xl transition-colors ${
                    groupForm.icon === icon
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Name fields */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t('groupModal.nameEn')}
            </label>
            <input
              type="text"
              value={groupForm.name_en}
              onChange={(e) => onFormChange({ ...groupForm, name_en: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder={t('groupModal.nameEnPlaceholder')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('groupModal.nameIt')}
              </label>
              <input
                type="text"
                value={groupForm.name_it}
                onChange={(e) => onFormChange({ ...groupForm, name_it: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder={t('groupModal.nameItPlaceholder')}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('groupModal.nameVi')}
              </label>
              <input
                type="text"
                value={groupForm.name_vi}
                onChange={(e) => onFormChange({ ...groupForm, name_vi: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder={t('groupModal.nameViPlaceholder')}
              />
            </div>
          </div>

          {/* Selection type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('groupModal.selectionType')}
            </label>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="selection_type"
                  checked={groupForm.selection_type === 'single'}
                  onChange={() =>
                    onFormChange({ ...groupForm, selection_type: 'single', max_selections: 1 })
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">{t('groupModal.singleRadio')}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="selection_type"
                  checked={groupForm.selection_type === 'multiple'}
                  onChange={() =>
                    onFormChange({
                      ...groupForm,
                      selection_type: 'multiple',
                      max_selections: 5,
                    })
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">{t('groupModal.multipleCheckbox')}</span>
              </label>
            </div>
          </div>

          {/* Required & Max selections */}
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={groupForm.is_required}
                onChange={(e) => onFormChange({ ...groupForm, is_required: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">{t('groupModal.required')}</span>
            </label>
          </div>

          {groupForm.selection_type === 'multiple' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('groupModal.maxSelections')}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={groupForm.max_selections}
                onChange={(e) =>
                  onFormChange({ ...groupForm, max_selections: parseInt(e.target.value) || 1 })
                }
                className="w-24 rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            {t('groupModal.cancel')}
          </button>
          <button
            onClick={onSave}
            disabled={!groupForm.name_en}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {editingGroup ? t('groupModal.saveChanges') : t('groupModal.addGroup')}
          </button>
        </div>
      </div>
    </div>
  );
}
