'use client';

import { useTranslations } from 'next-intl';
import type { Modifier, ModifierFormState } from './types';

interface ModifierFormModalProps {
  show: boolean;
  editingModifier: Modifier | null;
  modifierForm: ModifierFormState;
  onFormChange: (form: ModifierFormState) => void;
  onSave: () => void;
  onClose: () => void;
}

export function ModifierFormModal({
  show,
  editingModifier,
  modifierForm,
  onFormChange,
  onSave,
  onClose,
}: ModifierFormModalProps) {
  const t = useTranslations('modifiersPage');

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {editingModifier ? t('modifierModal.editTitle') : t('modifierModal.addTitle')}
        </h2>

        <div className="space-y-4">
          {/* Name fields */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t('modifierModal.nameEn')}
            </label>
            <input
              type="text"
              value={modifierForm.name_en}
              onChange={(e) => onFormChange({ ...modifierForm, name_en: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder={t('modifierModal.nameEnPlaceholder')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('modifierModal.nameIt')}
              </label>
              <input
                type="text"
                value={modifierForm.name_it}
                onChange={(e) => onFormChange({ ...modifierForm, name_it: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder={t('modifierModal.nameItPlaceholder')}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('modifierModal.nameVi')}
              </label>
              <input
                type="text"
                value={modifierForm.name_vi}
                onChange={(e) => onFormChange({ ...modifierForm, name_vi: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder={t('modifierModal.nameViPlaceholder')}
              />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('modifierModal.priceAdjustment')}
              </label>
              <input
                type="number"
                step="0.01"
                value={modifierForm.price_adjustment}
                onChange={(e) =>
                  onFormChange({ ...modifierForm, price_adjustment: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder={t('modifierModal.priceAdjustmentPlaceholder')}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('modifierModal.priceType')}
              </label>
              <select
                value={modifierForm.price_type}
                onChange={(e) =>
                  onFormChange({ ...modifierForm, price_type: e.target.value as any })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="fixed">{t('modifierModal.priceTypes.fixed')}</option>
                <option value="percentage">{t('modifierModal.priceTypes.percentage')}</option>
                <option value="replace">{t('modifierModal.priceTypes.replace')}</option>
              </select>
            </div>
          </div>

          {/* Calories */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t('modifierModal.caloriesAdjustment')}
            </label>
            <input
              type="number"
              value={modifierForm.calories_adjustment}
              onChange={(e) =>
                onFormChange({ ...modifierForm, calories_adjustment: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder={t('modifierModal.caloriesPlaceholder')}
            />
          </div>

          {/* Icon */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t('modifierModal.iconLabel')}
            </label>
            <input
              type="text"
              value={modifierForm.icon}
              onChange={(e) => onFormChange({ ...modifierForm, icon: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder={t('modifierModal.iconPlaceholder')}
              maxLength={2}
            />
          </div>

          {/* Default checkbox */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={modifierForm.is_default}
              onChange={(e) => onFormChange({ ...modifierForm, is_default: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">{t('modifierModal.setDefault')}</span>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            {t('modifierModal.cancel')}
          </button>
          <button
            onClick={onSave}
            disabled={!modifierForm.name_en}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {editingModifier ? t('modifierModal.saveChanges') : t('modifierModal.addOption')}
          </button>
        </div>
      </div>
    </div>
  );
}
