'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Types
interface ModifierGroup {
  id: string;
  merchant_id: string;
  slug: string;
  name_multilang: { en?: string; it?: string; vi?: string };
  description_multilang?: { en?: string; it?: string; vi?: string };
  selection_type: 'single' | 'multiple';
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  display_order: number;
  icon: string | null;
  is_active: boolean;
  modifiers_count?: number;
}

interface Modifier {
  id: string;
  merchant_id: string;
  group_id: string;
  slug: string;
  name_multilang: { en?: string; it?: string; vi?: string };
  description_multilang?: { en?: string; it?: string; vi?: string };
  price_adjustment: number;
  price_type: 'fixed' | 'percentage' | 'replace';
  display_order: number;
  icon: string | null;
  color: string | null;
  is_default: boolean;
  calories_adjustment: number;
  is_active: boolean;
  is_available: boolean;
}

// Icons for groups
const GROUP_ICONS = ['📏', '🥛', '➕', '🍬', '🧊', '🔥', '🍫', '🥜', '🍓', '🌿', '☕', '🧁'];

// Colors for modifiers
const MODIFIER_COLORS = [
  { name: 'Default', value: null },
  { name: 'Blue', value: 'bg-blue-100 text-blue-800' },
  { name: 'Green', value: 'bg-green-100 text-green-800' },
  { name: 'Yellow', value: 'bg-yellow-100 text-yellow-800' },
  { name: 'Red', value: 'bg-red-100 text-red-800' },
  { name: 'Purple', value: 'bg-purple-100 text-purple-800' },
  { name: 'Orange', value: 'bg-orange-100 text-orange-800' },
];

export default function ModifiersPage() {
  const t = useTranslations('modifiersPage');
  // Data state
  const [groups, setGroups] = useState<ModifierGroup[]>([]);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [loading, setLoading] = useState(true);
  const [merchantId, setMerchantId] = useState<string | null>(null);

  // UI state
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showModifierModal, setShowModifierModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ModifierGroup | null>(null);
  const [editingModifier, setEditingModifier] = useState<Modifier | null>(null);

  // Group form state
  const [groupForm, setGroupForm] = useState({
    name_en: '',
    name_it: '',
    name_vi: '',
    description_en: '',
    selection_type: 'single' as 'single' | 'multiple',
    is_required: false,
    min_selections: 0,
    max_selections: 1,
    icon: '📏',
  });

  // Modifier form state
  const [modifierForm, setModifierForm] = useState({
    name_en: '',
    name_it: '',
    name_vi: '',
    price_adjustment: '',
    price_type: 'fixed' as 'fixed' | 'percentage' | 'replace',
    is_default: false,
    calories_adjustment: '',
    icon: '',
    color: null as string | null,
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      // Check if Supabase client exists
      if (!supabase) {
        console.error('❌ Supabase client not initialized - check env vars');
        setLoading(false);
        return;
      }

      // Get merchant
      const { data: merchants, error: merchantError } = await supabase
        .from('merchants')
        .select('id')
        .limit(1);

      if (merchantError) {
        console.error('❌ Error fetching merchant:', merchantError);
      }

      if (merchants && merchants.length > 0) {
        setMerchantId(merchants[0].id);
      } else {
        console.warn('⚠️ No merchants found - creating default merchant...');
        // Auto-create a default merchant
        const { data: newMerchant, error: createError } = await supabase
          .from('merchants')
          .insert({
            name: 'GUDBRO Demo Restaurant',
            slug: 'gudbro-demo',
            email: 'demo@gudbro.com',
            is_active: true,
          })
          .select()
          .single();

        if (createError) {
          console.error('❌ Error creating default merchant:', createError);
        } else if (newMerchant) {
          setMerchantId(newMerchant.id);
        }
      }

      // Fetch groups
      const { data: groupsData, error: groupsError } = await supabase
        .from('modifier_groups')
        .select('*')
        .order('display_order');

      if (groupsError) throw groupsError;

      // Fetch modifiers
      const { data: modifiersData, error: modifiersError } = await supabase
        .from('modifiers')
        .select('*')
        .order('display_order');

      if (modifiersError) throw modifiersError;

      // Count modifiers per group
      const modifierCounts: Record<string, number> = {};
      (modifiersData || []).forEach((mod) => {
        modifierCounts[mod.group_id] = (modifierCounts[mod.group_id] || 0) + 1;
      });

      const groupsWithCount = (groupsData || []).map((g) => ({
        ...g,
        modifiers_count: modifierCounts[g.id] || 0,
      }));

      setGroups(groupsWithCount);
      setModifiers(modifiersData || []);

      // Select first group by default
      if (groupsWithCount.length > 0 && !selectedGroupId) {
        setSelectedGroupId(groupsWithCount[0].id);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter modifiers by selected group and search
  const filteredModifiers = modifiers.filter((mod) => {
    const matchesGroup = !selectedGroupId || mod.group_id === selectedGroupId;
    const matchesSearch =
      !searchQuery ||
      (mod.name_multilang?.en || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mod.name_multilang?.it || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // Get selected group
  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  // ============================================================================
  // GROUP CRUD
  // ============================================================================

  const resetGroupForm = () => {
    setGroupForm({
      name_en: '',
      name_it: '',
      name_vi: '',
      description_en: '',
      selection_type: 'single',
      is_required: false,
      min_selections: 0,
      max_selections: 1,
      icon: '📏',
    });
    setEditingGroup(null);
  };

  const openEditGroupModal = (group: ModifierGroup) => {
    setEditingGroup(group);
    setGroupForm({
      name_en: group.name_multilang?.en || '',
      name_it: group.name_multilang?.it || '',
      name_vi: group.name_multilang?.vi || '',
      description_en: group.description_multilang?.en || '',
      selection_type: group.selection_type,
      is_required: group.is_required,
      min_selections: group.min_selections,
      max_selections: group.max_selections,
      icon: group.icon || '📏',
    });
    setShowGroupModal(true);
  };

  const handleSaveGroup = async () => {
    // TEMP FIX: Use hardcoded merchant ID if state is null
    // This bypasses the fetchData() issue until Vercel deploys correctly
    const FALLBACK_MERCHANT_ID = 'f8bf7ceb-0923-437b-bc7a-1af3b82f3049';
    const effectiveMerchantId = merchantId || FALLBACK_MERCHANT_ID;

    if (!effectiveMerchantId) {
      console.error('❌ No merchantId - cannot save group');
      alert(t('errors.noMerchant'));
      return;
    }

    if (!groupForm.name_en) {
      console.error('❌ No name_en - cannot save group');
      return;
    }

    const slug = groupForm.name_en
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    const tempId = `temp-${Date.now()}`;

    const groupData = {
      merchant_id: effectiveMerchantId,
      slug: editingGroup?.slug || slug,
      name_multilang: {
        en: groupForm.name_en,
        it: groupForm.name_it || undefined,
        vi: groupForm.name_vi || undefined,
      },
      description_multilang: groupForm.description_en
        ? {
            en: groupForm.description_en,
          }
        : undefined,
      selection_type: groupForm.selection_type,
      is_required: groupForm.is_required,
      min_selections: groupForm.min_selections,
      max_selections: groupForm.max_selections,
      icon: groupForm.icon,
      is_active: true,
    };

    // Optimistic: Close modal and update UI immediately
    setShowGroupModal(false);
    const previousGroups = [...groups];

    if (editingGroup) {
      // Optimistic update for edit
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id ? { ...g, ...groupData, modifiers_count: g.modifiers_count } : g
        )
      );
    } else {
      // Optimistic update for add
      const newGroup: ModifierGroup = {
        ...groupData,
        id: tempId,
        display_order: groups.length,
        modifiers_count: 0,
      } as ModifierGroup;
      setGroups((prev) => [...prev, newGroup]);
      setSelectedGroupId(tempId);
    }

    resetGroupForm();

    // Background: Save to database
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      if (editingGroup) {
        const { error } = await supabase
          .from('modifier_groups')
          .update(groupData)
          .eq('id', editingGroup.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('modifier_groups')
          .insert({ ...groupData, display_order: groups.length })
          .select()
          .single();
        if (error) throw error;
        // Replace temp ID with real ID
        if (data) {
          setGroups((prev) => prev.map((g) => (g.id === tempId ? { ...g, id: data.id } : g)));
          setSelectedGroupId(data.id);
        }
      }
    } catch (err) {
      console.error('❌ Error saving group:', err);
      // Rollback on error
      setGroups(previousGroups);
      alert('Failed to save group: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    if ((group.modifiers_count || 0) > 0) {
      alert(
        t('groups.cannotDelete', {
          name: group.name_multilang?.en ?? '',
          count: group.modifiers_count ?? 0,
        })
      );
      return;
    }

    if (!confirm(t('groups.confirmDelete', { name: group.name_multilang?.en ?? '' }))) return;

    try {
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error } = await supabase.from('modifier_groups').delete().eq('id', groupId);

      if (error) throw error;

      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      if (selectedGroupId === groupId) {
        setSelectedGroupId(groups[0]?.id || null);
      }
    } catch (err) {
      console.error('❌ Error deleting group:', err);
      alert('Failed to delete group');
    }
  };

  const toggleGroupActive = async (groupId: string, currentStatus: boolean) => {
    if (!supabase) return;

    // Optimistic: Update UI immediately
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, is_active: !currentStatus } : g))
    );

    // Background: Save to database
    try {
      const { error } = await supabase
        .from('modifier_groups')
        .update({ is_active: !currentStatus })
        .eq('id', groupId);

      if (error) throw error;
    } catch (err) {
      console.error('❌ Error toggling group:', err);
      // Rollback on error
      setGroups((prev) =>
        prev.map((g) => (g.id === groupId ? { ...g, is_active: currentStatus } : g))
      );
    }
  };

  // ============================================================================
  // MODIFIER CRUD
  // ============================================================================

  const resetModifierForm = () => {
    setModifierForm({
      name_en: '',
      name_it: '',
      name_vi: '',
      price_adjustment: '',
      price_type: 'fixed',
      is_default: false,
      calories_adjustment: '',
      icon: '',
      color: null,
    });
    setEditingModifier(null);
  };

  const openEditModifierModal = (modifier: Modifier) => {
    setEditingModifier(modifier);
    setModifierForm({
      name_en: modifier.name_multilang?.en || '',
      name_it: modifier.name_multilang?.it || '',
      name_vi: modifier.name_multilang?.vi || '',
      price_adjustment: modifier.price_adjustment.toString(),
      price_type: modifier.price_type,
      is_default: modifier.is_default,
      calories_adjustment: modifier.calories_adjustment?.toString() || '',
      icon: modifier.icon || '',
      color: modifier.color,
    });
    setShowModifierModal(true);
  };

  const handleSaveModifier = async () => {
    // TEMP FIX: Use hardcoded merchant ID if state is null
    const FALLBACK_MERCHANT_ID = 'f8bf7ceb-0923-437b-bc7a-1af3b82f3049';
    const effectiveMerchantId = merchantId || FALLBACK_MERCHANT_ID;

    if (!effectiveMerchantId || !selectedGroupId || !modifierForm.name_en) return;

    const slug = modifierForm.name_en
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    const tempId = `temp-${Date.now()}`;
    const groupModifiers = modifiers.filter((m) => m.group_id === selectedGroupId);

    const modifierData = {
      merchant_id: effectiveMerchantId,
      group_id: selectedGroupId,
      slug: editingModifier?.slug || slug,
      name_multilang: {
        en: modifierForm.name_en,
        it: modifierForm.name_it || undefined,
        vi: modifierForm.name_vi || undefined,
      },
      price_adjustment: parseFloat(modifierForm.price_adjustment) || 0,
      price_type: modifierForm.price_type,
      is_default: modifierForm.is_default,
      calories_adjustment: parseInt(modifierForm.calories_adjustment) || 0,
      icon: modifierForm.icon || null,
      color: modifierForm.color,
      is_active: true,
      is_available: true,
    };

    // Optimistic: Close modal and update UI immediately
    setShowModifierModal(false);
    const previousModifiers = [...modifiers];
    const previousGroups = [...groups];

    if (editingModifier) {
      // Optimistic update for edit
      setModifiers((prev) =>
        prev.map((m) => (m.id === editingModifier.id ? ({ ...m, ...modifierData } as Modifier) : m))
      );
    } else {
      // Optimistic update for add
      const newModifier: Modifier = {
        ...modifierData,
        id: tempId,
        display_order: groupModifiers.length,
      } as Modifier;
      setModifiers((prev) => [...prev, newModifier]);
      // Update group modifiers count
      setGroups((prev) =>
        prev.map((g) =>
          g.id === selectedGroupId ? { ...g, modifiers_count: (g.modifiers_count || 0) + 1 } : g
        )
      );
    }

    // If setting as default in single-selection group, unset others optimistically
    if (modifierForm.is_default && selectedGroup?.selection_type === 'single') {
      setModifiers((prev) =>
        prev.map((m) =>
          m.group_id === selectedGroupId && m.id !== editingModifier?.id
            ? { ...m, is_default: false }
            : m
        )
      );
    }

    resetModifierForm();

    // Background: Save to database
    try {
      if (!supabase) throw new Error('Supabase client not initialized');

      if (editingModifier) {
        const { error } = await supabase
          .from('modifiers')
          .update(modifierData)
          .eq('id', editingModifier.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('modifiers')
          .insert({
            ...modifierData,
            display_order: groupModifiers.length,
          })
          .select()
          .single();
        if (error) throw error;
        // Replace temp ID with real ID
        if (data) {
          setModifiers((prev) => prev.map((m) => (m.id === tempId ? { ...m, id: data.id } : m)));
        }
      }

      // If setting as default, unset others in same group (in database)
      if (modifierForm.is_default && selectedGroup?.selection_type === 'single') {
        const otherDefaults = previousModifiers.filter(
          (m) => m.group_id === selectedGroupId && m.is_default && m.id !== editingModifier?.id
        );
        for (const other of otherDefaults) {
          await supabase.from('modifiers').update({ is_default: false }).eq('id', other.id);
        }
      }
    } catch (err) {
      console.error('❌ Error saving modifier:', err);
      // Rollback on error
      setModifiers(previousModifiers);
      setGroups(previousGroups);
      alert('Failed to save modifier');
    }
  };

  const handleDeleteModifier = async (modifierId: string) => {
    if (!supabase) return;
    const modifier = modifiers.find((m) => m.id === modifierId);
    if (!modifier) return;

    if (!confirm(t('modifiers.confirmDelete', { name: modifier.name_multilang?.en ?? '' }))) return;

    try {
      const { error } = await supabase.from('modifiers').delete().eq('id', modifierId);

      if (error) throw error;
      setModifiers((prev) => prev.filter((m) => m.id !== modifierId));
    } catch (err) {
      console.error('❌ Error deleting modifier:', err);
      alert('Failed to delete modifier');
    }
  };

  const toggleModifierAvailable = async (modifierId: string, currentStatus: boolean) => {
    if (!supabase) return;

    // Optimistic: Update UI immediately
    setModifiers((prev) =>
      prev.map((m) => (m.id === modifierId ? { ...m, is_available: !currentStatus } : m))
    );

    // Background: Save to database
    try {
      const { error } = await supabase
        .from('modifiers')
        .update({ is_available: !currentStatus })
        .eq('id', modifierId);

      if (error) throw error;
    } catch (err) {
      console.error('❌ Error toggling modifier:', err);
      // Rollback on error
      setModifiers((prev) =>
        prev.map((m) => (m.id === modifierId ? { ...m, is_available: currentStatus } : m))
      );
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/content" className="hover:text-gray-700">
              {t('breadcrumb')}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{t('title')}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.modifiers" kbPageId="content-modifiers" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {t('subtitle', { groups: groups.length, options: modifiers.length })}
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: Groups */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="font-semibold text-gray-900">{t('groups.title')}</h2>
              <button
                onClick={() => {
                  resetGroupForm();
                  setShowGroupModal(true);
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {t('groups.add')}
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {groups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
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
                          openEditGroupModal(group);
                        }}
                        className="rounded p-1.5 text-gray-400 hover:text-blue-600"
                        title={t('groups.edit')}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleGroupActive(group.id, group.is_active);
                        }}
                        className={`rounded p-1.5 ${group.is_active ? 'text-green-600' : 'text-gray-300'}`}
                        title={group.is_active ? t('groups.active') : t('groups.inactive')}
                      >
                        {group.is_active ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group.id);
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
                    onClick={() => {
                      resetGroupForm();
                      setShowGroupModal(true);
                    }}
                    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    {t('groups.createFirst')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Modifiers */}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm"
                  />
                </div>
                <button
                  onClick={() => {
                    resetModifierForm();
                    setShowModifierModal(true);
                  }}
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
                              <div className="text-sm text-gray-500">
                                {modifier.name_multilang.it}
                              </div>
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
                          <span className="ml-1 text-xs text-gray-400">
                            ({modifier.price_type})
                          </span>
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
                          onClick={() =>
                            toggleModifierAvailable(modifier.id, modifier.is_available)
                          }
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
                            onClick={() => openEditModifierModal(modifier)}
                            className="text-sm text-blue-600 hover:text-blue-900"
                          >
                            {t('modifiers.edit')}
                          </button>
                          <button
                            onClick={() => handleDeleteModifier(modifier.id)}
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
                      onClick={() => {
                        resetModifierForm();
                        setShowModifierModal(true);
                      }}
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
      </div>

      {/* Group Modal */}
      {showGroupModal && (
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
                      onClick={() => setGroupForm({ ...groupForm, icon })}
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
                  onChange={(e) => setGroupForm({ ...groupForm, name_en: e.target.value })}
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
                    onChange={(e) => setGroupForm({ ...groupForm, name_it: e.target.value })}
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
                    onChange={(e) => setGroupForm({ ...groupForm, name_vi: e.target.value })}
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
                        setGroupForm({ ...groupForm, selection_type: 'single', max_selections: 1 })
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
                        setGroupForm({
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
                    onChange={(e) => setGroupForm({ ...groupForm, is_required: e.target.checked })}
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
                      setGroupForm({ ...groupForm, max_selections: parseInt(e.target.value) || 1 })
                    }
                    className="w-24 rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => {
                  setShowGroupModal(false);
                  resetGroupForm();
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                {t('groupModal.cancel')}
              </button>
              <button
                onClick={handleSaveGroup}
                disabled={!groupForm.name_en}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {editingGroup ? t('groupModal.saveChanges') : t('groupModal.addGroup')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifier Modal */}
      {showModifierModal && (
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
                  onChange={(e) => setModifierForm({ ...modifierForm, name_en: e.target.value })}
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
                    onChange={(e) => setModifierForm({ ...modifierForm, name_it: e.target.value })}
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
                    onChange={(e) => setModifierForm({ ...modifierForm, name_vi: e.target.value })}
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
                      setModifierForm({ ...modifierForm, price_adjustment: e.target.value })
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
                      setModifierForm({ ...modifierForm, price_type: e.target.value as any })
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
                    setModifierForm({ ...modifierForm, calories_adjustment: e.target.value })
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
                  onChange={(e) => setModifierForm({ ...modifierForm, icon: e.target.value })}
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
                  onChange={(e) =>
                    setModifierForm({ ...modifierForm, is_default: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{t('modifierModal.setDefault')}</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => {
                  setShowModifierModal(false);
                  resetModifierForm();
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                {t('modifierModal.cancel')}
              </button>
              <button
                onClick={handleSaveModifier}
                disabled={!modifierForm.name_en}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {editingModifier ? t('modifierModal.saveChanges') : t('modifierModal.addOption')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
