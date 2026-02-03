// Types
export interface ModifierGroup {
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

export interface Modifier {
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

export interface GroupFormState {
  name_en: string;
  name_it: string;
  name_vi: string;
  description_en: string;
  selection_type: 'single' | 'multiple';
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  icon: string;
}

export interface ModifierFormState {
  name_en: string;
  name_it: string;
  name_vi: string;
  price_adjustment: string;
  price_type: 'fixed' | 'percentage' | 'replace';
  is_default: boolean;
  calories_adjustment: string;
  icon: string;
  color: string | null;
}

// Icons for groups
export const GROUP_ICONS = ['📏', '🥛', '➕', '🍬', '🧊', '🔥', '🍫', '🥜', '🍓', '🌿', '☕', '🧁'];

// Colors for modifiers
export const MODIFIER_COLORS = [
  { name: 'Default', value: null },
  { name: 'Blue', value: 'bg-blue-100 text-blue-800' },
  { name: 'Green', value: 'bg-green-100 text-green-800' },
  { name: 'Yellow', value: 'bg-yellow-100 text-yellow-800' },
  { name: 'Red', value: 'bg-red-100 text-red-800' },
  { name: 'Purple', value: 'bg-purple-100 text-purple-800' },
  { name: 'Orange', value: 'bg-orange-100 text-orange-800' },
];
