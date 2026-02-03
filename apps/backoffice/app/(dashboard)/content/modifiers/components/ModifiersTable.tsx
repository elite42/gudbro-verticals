'use client';

import { useTranslations } from 'next-intl';
import type { Modifier, ModifierGroup } from './types';

interface ModifiersTableProps {
  filteredModifiers: Modifier[];
  selectedGroup: ModifierGroup | undefined;
  selectedGroupId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddModifier: () => void;
  onEditModifier: (modifier: Modifier) => void;
  onDeleteModifier: (modifierId: string) => void;
  onToggleModifierAvailable: (modifierId: string, currentStatus: boolean) => void;
}

export function ModifiersTable({
  filteredModifiers,
  selectedGroup,
  selectedGroupId,
  searchQuery,
  onSearchChange,
  onAddModifier,
  onEditModifier,
  onDeleteModifier,
  onToggleModifierAvailable,
}: ModifiersTableProps) {
  const t = useTranslations('modifiersPage');

  return (
    <div className="lg:col-span-2">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            {selectedGroup && (
              <>
                <span className="text-2xl">{selectedGroup.icon}</span>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedGroup.name_multilang?.en}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {selectedGroup.selection_type === 'single'
                      ? t('modifiers.singleSelection')
                      : t('modifiers.multipleSelection')}
                    {selectedGroup.is_required && ` • ${t('groups.required')}`}
                    {selectedGroup.max_selections > 1 &&
                      ` • ${t('modifiers.max', { count: selectedGroup.max_selections })}`}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder={t('modifiers.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-48 rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm"
              />
            </div>
            <button
              onClick={onAddModifier}
              disabled={!selectedGroupId}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('modifiers.addOption')}
            </button>
          </div>
        </div>

        {/* Modifiers table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('modifiers.tableHeaders.option')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('modifiers.tableHeaders.price')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  {t('modifiers.tableHeaders.calories')}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">
                  {t('modifiers.tableHeaders.default')}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">
                  {t('modifiers.tableHeaders.available')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                  {t('modifiers.tableHeaders.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredModifiers.map((modifier) => (
                <tr key={modifier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {modifier.icon && <span className="text-xl">{modifier.icon}</span>}
                      <div>
                        <div className="font-medium text-gray-900">
                          {modifier.name_multilang?.en}
                        </div>
                        {modifier.name_multilang?.it && (
                          <div className="text-sm text-gray-500">{modifier.name_multilang.it}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${modifier.price_adjustment > 0 ? 'text-green-600' : modifier.price_adjustment < 0 ? 'text-red-600' : 'text-gray-500'}`}
                    >
                      {modifier.price_adjustment > 0 ? '+' : ''}
                      {modifier.price_adjustment === 0
                        ? t('modifiers.free')
                        : `€${modifier.price_adjustment.toFixed(2)}`}
                    </span>
                    {modifier.price_type !== 'fixed' && (
                      <span className="ml-1 text-xs text-gray-400">({modifier.price_type})</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {modifier.calories_adjustment > 0
                      ? `+${modifier.calories_adjustment} ${t('modifiers.kcal')}`
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {modifier.is_default && (
                      <span className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        {t('modifiers.tableHeaders.default')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onToggleModifierAvailable(modifier.id, modifier.is_available)}
                      className={`h-6 w-10 rounded-full transition-colors ${
                        modifier.is_available ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          modifier.is_available ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEditModifier(modifier)}
                        className="text-sm text-blue-600 hover:text-blue-900"
                      >
                        {t('modifiers.edit')}
                      </button>
                      <button
                        onClick={() => onDeleteModifier(modifier.id)}
                        className="text-sm text-red-600 hover:text-red-900"
                      >
                        {t('modifiers.delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredModifiers.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                {selectedGroupId ? t('modifiers.emptyGroup') : t('modifiers.selectGroup')}
              </p>
              {selectedGroupId && (
                <button
                  onClick={onAddModifier}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {t('modifiers.addFirst')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
