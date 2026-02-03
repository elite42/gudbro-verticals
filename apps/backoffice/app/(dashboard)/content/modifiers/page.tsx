'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

import type {
  ModifierGroup,
  Modifier,
  GroupFormState,
  ModifierFormState,
} from './components/types';
import { GroupSidebar } from './components/GroupSidebar';
import { ModifiersTable } from './components/ModifiersTable';
import { GroupFormModal } from './components/GroupFormModal';
import { ModifierFormModal } from './components/ModifierFormModal';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
  const [groupForm, setGroupForm] = useState<GroupFormState>({
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

  // Modifier form state
  const [modifierForm, setModifierForm] = useState<ModifierFormState>({
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
        <GroupSidebar
          groups={groups}
          selectedGroupId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
          onAddGroup={() => {
            resetGroupForm();
            setShowGroupModal(true);
          }}
          onEditGroup={openEditGroupModal}
          onDeleteGroup={handleDeleteGroup}
          onToggleGroupActive={toggleGroupActive}
        />

        <ModifiersTable
          filteredModifiers={filteredModifiers}
          selectedGroup={selectedGroup}
          selectedGroupId={selectedGroupId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddModifier={() => {
            resetModifierForm();
            setShowModifierModal(true);
          }}
          onEditModifier={openEditModifierModal}
          onDeleteModifier={handleDeleteModifier}
          onToggleModifierAvailable={toggleModifierAvailable}
        />
      </div>

      <GroupFormModal
        show={showGroupModal}
        editingGroup={editingGroup}
        groupForm={groupForm}
        onFormChange={setGroupForm}
        onSave={handleSaveGroup}
        onClose={() => {
          setShowGroupModal(false);
          resetGroupForm();
        }}
      />

      <ModifierFormModal
        show={showModifierModal}
        editingModifier={editingModifier}
        modifierForm={modifierForm}
        onFormChange={setModifierForm}
        onSave={handleSaveModifier}
        onClose={() => {
          setShowModifierModal(false);
          resetModifierForm();
        }}
      />
    </div>
  );
}
