'use client';

import { useTranslations } from 'next-intl';
import type { ModifierGroup } from './types';

interface GroupSidebarProps {
  groups: ModifierGroup[];
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string) => void;
  onAddGroup: () => void;
  onEditGroup: (group: ModifierGroup) => void;
  onDeleteGroup: (groupId: string) => void;
  onToggleGroupActive: (groupId: string, currentStatus: boolean) => void;
}

export function GroupSidebar({
  groups,
  selectedGroupId,
  onSelectGroup,
  onAddGroup,
  onEditGroup,
  onDeleteGroup,
  onToggleGroupActive,
}: GroupSidebarProps) {
  const t = useTranslations('modifiersPage');

  return (
    <div className="lg:col-span-1">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="font-semibold text-gray-900">{t('groups.title')}</h2>
          <button
            onClick={onAddGroup}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {t('groups.add')}
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={`cursor-pointer p-4 transition-colors ${
                selectedGroupId === group.id
                  ? 'border-l-4 border-l-blue-600 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{group.name_multilang?.en}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{t('groups.options', { count: group.modifiers_count ?? 0 })}</span>
                      <span>•</span>
                      <span>
                        {group.selection_type === 'single'
                          ? t('groups.single')
                          : t('groups.multiple')}
                      </span>
                      {group.is_required && (
                        <>
                          <span>•</span>
                          <span className="text-red-500">{t('groups.required')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditGroup(group);
                    }}
                    className="rounded p-1.5 text-gray-400 hover:text-blue-600"
                    title={t('groups.edit')}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleGroupActive(group.id, group.is_active);
                    }}
                    className={`rounded p-1.5 ${group.is_active ? 'text-green-600' : 'text-gray-300'}`}
                    title={group.is_active ? t('groups.active') : t('groups.inactive')}
                  >
                    {group.is_active ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteGroup(group.id);
                    }}
                    className="rounded p-1.5 text-gray-400 hover:text-red-600"
                    title={t('groups.delete')}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}

          {groups.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>{t('groups.empty')}</p>
              <button
                onClick={onAddGroup}
                className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {t('groups.createFirst')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
