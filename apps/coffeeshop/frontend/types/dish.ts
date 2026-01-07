// Shared types for dish-related components

export interface Extra {
  id: string;
  name: string;
  price: number;
  type: 'size' | 'milk' | 'shot' | 'sweetener' | 'liquor' | 'addon' | 'side';
  maxQuantity?: number;
}

// Multilingual text object
export interface MultilingualText {
  en?: string;
  vi?: string;
  it?: string;
}

export interface DishItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  origin?: string;
  availableExtras?: Extra[];
  customizations?: any[];
  suggestions?: DishItem[];
  dietary?: string[];
  allergens?: string[];
  intolerances?: string[];
  spiciness?: number; // 0-5

  // Multilingual fields (optional - for client-side language switching)
  nameMulti?: MultilingualText;
  descriptionMulti?: MultilingualText;

  // Nutritional info (per serving)
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  fiber_g?: number;

  isNew?: boolean;
  newUntil?: string;
  timeSlots?: ('breakfast' | 'lunch' | 'dinner' | 'aperitivo' | 'late-night' | 'all-day')[];
}

export type DishCardVariant = 'horizontal' | 'vertical' | 'grid' | 'compact';

export interface DishCardProps {
  dish: DishItem;
  variant?: DishCardVariant;
  onAddToCart?: (dish: DishItem, quantity: number, extras: Extra[]) => void;
  onCardClick?: (dish: DishItem) => void;
}
