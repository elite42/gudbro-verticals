'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

      // Get merchant
      const { data: merchants, error: merchantError } = await supabase
        .from('merchants')
        .select('id')
        .limit(1);

      console.log('🏪 Merchants query result:', { merchants, error: merchantError });

      if (merchantError) {
        console.error('❌ Error fetching merchant:', merchantError);
      }

      if (merchants && merchants.length > 0) {
        console.log('✅ Setting merchantId:', merchants[0].id);
        setMerchantId(merchants[0].id);
      } else {
        console.warn('⚠️ No merchants found in database');
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
      (modifiersData || []).forEach(mod => {
        modifierCounts[mod.group_id] = (modifierCounts[mod.group_id] || 0) + 1;
      });

      const groupsWithCount = (groupsData || []).map(g => ({
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
  const filteredModifiers = modifiers.filter(mod => {
    const matchesGroup = !selectedGroupId || mod.group_id === selectedGroupId;
    const matchesSearch = !searchQuery ||
      (mod.name_multilang?.en || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mod.name_multilang?.it || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // Get selected group
  const selectedGroup = groups.find(g => g.id === selectedGroupId);

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
    console.log('🔵 handleSaveGroup called', { merchantId, name: groupForm.name_en });

    if (!merchantId) {
      console.error('❌ No merchantId - cannot save group');
      alert('Error: No merchant ID. Please refresh the page.');
      return;
    }

    if (!groupForm.name_en) {
      console.error('❌ No name_en - cannot save group');
      return;
    }

    const slug = groupForm.name_en.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const tempId = `temp-${Date.now()}`;

    const groupData = {
      merchant_id: merchantId,
      slug: editingGroup?.slug || slug,
      name_multilang: {
        en: groupForm.name_en,
        it: groupForm.name_it || undefined,
        vi: groupForm.name_vi || undefined,
      },
      description_multilang: groupForm.description_en ? {
        en: groupForm.description_en,
      } : undefined,
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
      setGroups(prev => prev.map(g =>
        g.id === editingGroup.id
          ? { ...g, ...groupData, modifiers_count: g.modifiers_count }
          : g
      ));
    } else {
      // Optimistic update for add
      const newGroup: ModifierGroup = {
        ...groupData,
        id: tempId,
        display_order: groups.length,
        modifiers_count: 0,
      } as ModifierGroup;
      setGroups(prev => [...prev, newGroup]);
      setSelectedGroupId(tempId);
    }

    resetGroupForm();

    // Background: Save to database
    try {
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
          setGroups(prev => prev.map(g =>
            g.id === tempId ? { ...g, id: data.id } : g
          ));
          setSelectedGroupId(data.id);
        }
      }
    } catch (err) {
      console.error('Error saving group:', err);
      // Rollback on error
      setGroups(previousGroups);
      alert('Failed to save group');
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    if ((group.modifiers_count || 0) > 0) {
      alert(`Cannot delete "${group.name_multilang?.en}": has ${group.modifiers_count} modifiers. Delete modifiers first.`);
      return;
    }

    if (!confirm(`Delete group "${group.name_multilang?.en}"?`)) return;

    try {
      const { error } = await supabase
        .from('modifier_groups')
        .delete()
        .eq('id', groupId);

      if (error) throw error;

      setGroups(prev => prev.filter(g => g.id !== groupId));
      if (selectedGroupId === groupId) {
        setSelectedGroupId(groups[0]?.id || null);
      }
    } catch (err) {
      console.error('Error deleting group:', err);
      alert('Failed to delete group');
    }
  };

  const toggleGroupActive = async (groupId: string, currentStatus: boolean) => {
    // Optimistic: Update UI immediately
    setGroups(prev =>
      prev.map(g => g.id === groupId ? { ...g, is_active: !currentStatus } : g)
    );

    // Background: Save to database
    try {
      const { error } = await supabase
        .from('modifier_groups')
        .update({ is_active: !currentStatus })
        .eq('id', groupId);

      if (error) throw error;
    } catch (err) {
      console.error('Error toggling group:', err);
      // Rollback on error
      setGroups(prev =>
        prev.map(g => g.id === groupId ? { ...g, is_active: currentStatus } : g)
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
    if (!merchantId || !selectedGroupId || !modifierForm.name_en) return;

    const slug = modifierForm.name_en.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const tempId = `temp-${Date.now()}`;
    const groupModifiers = modifiers.filter(m => m.group_id === selectedGroupId);

    const modifierData = {
      merchant_id: merchantId,
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
      setModifiers(prev => prev.map(m =>
        m.id === editingModifier.id ? { ...m, ...modifierData } as Modifier : m
      ));
    } else {
      // Optimistic update for add
      const newModifier: Modifier = {
        ...modifierData,
        id: tempId,
        display_order: groupModifiers.length,
      } as Modifier;
      setModifiers(prev => [...prev, newModifier]);
      // Update group modifiers count
      setGroups(prev => prev.map(g =>
        g.id === selectedGroupId ? { ...g, modifiers_count: (g.modifiers_count || 0) + 1 } : g
      ));
    }

    // If setting as default in single-selection group, unset others optimistically
    if (modifierForm.is_default && selectedGroup?.selection_type === 'single') {
      setModifiers(prev => prev.map(m =>
        m.group_id === selectedGroupId && m.id !== editingModifier?.id
          ? { ...m, is_default: false }
          : m
      ));
    }

    resetModifierForm();

    // Background: Save to database
    try {
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
          setModifiers(prev => prev.map(m =>
            m.id === tempId ? { ...m, id: data.id } : m
          ));
        }
      }

      // If setting as default, unset others in same group (in database)
      if (modifierForm.is_default && selectedGroup?.selection_type === 'single') {
        const otherDefaults = previousModifiers.filter(
          m => m.group_id === selectedGroupId && m.is_default && m.id !== editingModifier?.id
        );
        for (const other of otherDefaults) {
          await supabase
            .from('modifiers')
            .update({ is_default: false })
            .eq('id', other.id);
        }
      }
    } catch (err) {
      console.error('Error saving modifier:', err);
      // Rollback on error
      setModifiers(previousModifiers);
      setGroups(previousGroups);
      alert('Failed to save modifier');
    }
  };

  const handleDeleteModifier = async (modifierId: string) => {
    const modifier = modifiers.find(m => m.id === modifierId);
    if (!modifier) return;

    if (!confirm(`Delete "${modifier.name_multilang?.en}"?`)) return;

    try {
      const { error } = await supabase
        .from('modifiers')
        .delete()
        .eq('id', modifierId);

      if (error) throw error;
      setModifiers(prev => prev.filter(m => m.id !== modifierId));
    } catch (err) {
      console.error('Error deleting modifier:', err);
      alert('Failed to delete modifier');
    }
  };

  const toggleModifierAvailable = async (modifierId: string, currentStatus: boolean) => {
    // Optimistic: Update UI immediately
    setModifiers(prev =>
      prev.map(m => m.id === modifierId ? { ...m, is_available: !currentStatus } : m)
    );

    // Background: Save to database
    try {
      const { error } = await supabase
        .from('modifiers')
        .update({ is_available: !currentStatus })
        .eq('id', modifierId);

      if (error) throw error;
    } catch (err) {
      console.error('Error toggling modifier:', err);
      // Rollback on error
      setModifiers(prev =>
        prev.map(m => m.id === modifierId ? { ...m, is_available: currentStatus } : m)
      );
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/content" className="hover:text-gray-700">Content</Link>
            <span>/</span>
            <span className="text-gray-900">Modifiers</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Product Modifiers</h1>
          <p className="text-sm text-gray-500 mt-1">
            {groups.length} groups, {modifiers.length} options
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Groups */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Modifier Groups</h2>
              <button
                onClick={() => { resetGroupForm(); setShowGroupModal(true); }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {groups.map(group => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedGroupId === group.id
                      ? 'bg-blue-50 border-l-4 border-l-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {group.name_multilang?.en}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <span>{group.modifiers_count} options</span>
                          <span>•</span>
                          <span>{group.selection_type === 'single' ? 'Single' : 'Multiple'}</span>
                          {group.is_required && (
                            <>
                              <span>•</span>
                              <span className="text-red-500">Required</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditGroupModal(group); }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleGroupActive(group.id, group.is_active); }}
                        className={`p-1.5 rounded ${group.is_active ? 'text-green-600' : 'text-gray-300'}`}
                        title={group.is_active ? 'Active' : 'Inactive'}
                      >
                        {group.is_active ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteGroup(group.id); }}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {groups.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No modifier groups yet</p>
                  <button
                    onClick={() => { resetGroupForm(); setShowGroupModal(true); }}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Create your first group
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Modifiers */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {selectedGroup && (
                  <>
                    <span className="text-2xl">{selectedGroup.icon}</span>
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {selectedGroup.name_multilang?.en}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {selectedGroup.selection_type === 'single' ? 'Single selection' : 'Multiple selection'}
                        {selectedGroup.is_required && ' • Required'}
                        {selectedGroup.max_selections > 1 && ` • Max ${selectedGroup.max_selections}`}
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
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-48"
                  />
                </div>
                <button
                  onClick={() => { resetModifierForm(); setShowModifierModal(true); }}
                  disabled={!selectedGroupId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add Option
                </button>
              </div>
            </div>

            {/* Modifiers table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Option</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calories</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Default</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Available</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredModifiers.map(modifier => (
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
                        <span className={`font-medium ${modifier.price_adjustment > 0 ? 'text-green-600' : modifier.price_adjustment < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          {modifier.price_adjustment > 0 ? '+' : ''}
                          {modifier.price_adjustment === 0 ? 'Free' : `€${modifier.price_adjustment.toFixed(2)}`}
                        </span>
                        {modifier.price_type !== 'fixed' && (
                          <span className="ml-1 text-xs text-gray-400">
                            ({modifier.price_type})
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {modifier.calories_adjustment > 0 ? `+${modifier.calories_adjustment} kcal` : '-'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {modifier.is_default && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Default
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleModifierAvailable(modifier.id, modifier.is_available)}
                          className={`w-10 h-6 rounded-full transition-colors ${
                            modifier.is_available ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
                            modifier.is_available ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModifierModal(modifier)}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteModifier(modifier.id)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredModifiers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {selectedGroupId ? 'No options in this group yet' : 'Select a group to view options'}
                  </p>
                  {selectedGroupId && (
                    <button
                      onClick={() => { resetModifierForm(); setShowModifierModal(true); }}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Add first option
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingGroup ? 'Edit Group' : 'Add Modifier Group'}
            </h2>

            <div className="space-y-4">
              {/* Icon picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {GROUP_ICONS.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setGroupForm({ ...groupForm, icon })}
                      className={`w-10 h-10 text-xl rounded-lg border-2 transition-colors ${
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name (English) *
                </label>
                <input
                  type="text"
                  value={groupForm.name_en}
                  onChange={(e) => setGroupForm({ ...groupForm, name_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Size, Milk Type"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Italian)
                  </label>
                  <input
                    type="text"
                    value={groupForm.name_it}
                    onChange={(e) => setGroupForm({ ...groupForm, name_it: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Dimensione"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Vietnamese)
                  </label>
                  <input
                    type="text"
                    value={groupForm.name_vi}
                    onChange={(e) => setGroupForm({ ...groupForm, name_vi: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Kích cỡ"
                  />
                </div>
              </div>

              {/* Selection type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Selection Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selection_type"
                      checked={groupForm.selection_type === 'single'}
                      onChange={() => setGroupForm({ ...groupForm, selection_type: 'single', max_selections: 1 })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Single (radio)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selection_type"
                      checked={groupForm.selection_type === 'multiple'}
                      onChange={() => setGroupForm({ ...groupForm, selection_type: 'multiple', max_selections: 5 })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Multiple (checkbox)</span>
                  </label>
                </div>
              </div>

              {/* Required & Max selections */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={groupForm.is_required}
                    onChange={(e) => setGroupForm({ ...groupForm, is_required: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Required</span>
                </label>
              </div>

              {groupForm.selection_type === 'multiple' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max selections
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={groupForm.max_selections}
                    onChange={(e) => setGroupForm({ ...groupForm, max_selections: parseInt(e.target.value) || 1 })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => { setShowGroupModal(false); resetGroupForm(); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGroup}
                disabled={!groupForm.name_en}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {editingGroup ? 'Save Changes' : 'Add Group'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifier Modal */}
      {showModifierModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingModifier ? 'Edit Option' : 'Add Option'}
            </h2>

            <div className="space-y-4">
              {/* Name fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name (English) *
                </label>
                <input
                  type="text"
                  value={modifierForm.name_en}
                  onChange={(e) => setModifierForm({ ...modifierForm, name_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Large, Oat Milk"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Italian)
                  </label>
                  <input
                    type="text"
                    value={modifierForm.name_it}
                    onChange={(e) => setModifierForm({ ...modifierForm, name_it: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Grande"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Vietnamese)
                  </label>
                  <input
                    type="text"
                    value={modifierForm.name_vi}
                    onChange={(e) => setModifierForm({ ...modifierForm, name_vi: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Lớn"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Adjustment (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={modifierForm.price_adjustment}
                    onChange={(e) => setModifierForm({ ...modifierForm, price_adjustment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="0.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Type
                  </label>
                  <select
                    value={modifierForm.price_type}
                    onChange={(e) => setModifierForm({ ...modifierForm, price_type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="fixed">Fixed (+€)</option>
                    <option value="percentage">Percentage (+%)</option>
                    <option value="replace">Replace price</option>
                  </select>
                </div>
              </div>

              {/* Calories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories Adjustment (kcal)
                </label>
                <input
                  type="number"
                  value={modifierForm.calories_adjustment}
                  onChange={(e) => setModifierForm({ ...modifierForm, calories_adjustment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon (emoji, optional)
                </label>
                <input
                  type="text"
                  value={modifierForm.icon}
                  onChange={(e) => setModifierForm({ ...modifierForm, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="🥛"
                  maxLength={2}
                />
              </div>

              {/* Default checkbox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modifierForm.is_default}
                  onChange={(e) => setModifierForm({ ...modifierForm, is_default: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Set as default selection</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => { setShowModifierModal(false); resetModifierForm(); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModifier}
                disabled={!modifierForm.name_en}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {editingModifier ? 'Save Changes' : 'Add Option'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
