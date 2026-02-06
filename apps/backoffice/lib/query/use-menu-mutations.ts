'use client';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface MenuItem {
  id: string;
  slug: string;
  name_multilang: { en?: string; vi?: string; it?: string };
  description_multilang?: { en?: string; vi?: string; it?: string };
  price: number;
  currency: string;
  category_id?: string;
  is_available: boolean;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  display_order?: number;
  [key: string]: unknown;
}

interface UpdateMenuItemParams {
  itemId: string;
  updates: Partial<MenuItem>;
}

interface ToggleItemStatusParams {
  itemId: string;
  field: 'is_available' | 'is_active' | 'is_featured' | 'is_new';
  value: boolean;
}

/**
 * Query key factory for menu items
 */
export const menuItemKeys = {
  all: ['menu-items'] as const,
  lists: () => [...menuItemKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...menuItemKeys.lists(), filters] as const,
  details: () => [...menuItemKeys.all, 'detail'] as const,
  detail: (id: string) => [...menuItemKeys.details(), id] as const,
};

/**
 * Hook to fetch menu items
 */
export function useMenuItems(categoryId?: string) {
  return useQuery({
    queryKey: menuItemKeys.list({ categoryId }),
    queryFn: async () => {
      let query = supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MenuItem[];
    },
  });
}

/**
 * Hook for optimistic menu item updates
 *
 * Updates the UI immediately while the server request is in flight.
 * Automatically rolls back on error.
 */
export function useUpdateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, updates }: UpdateMenuItemParams) => {
      const { data, error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', itemId)
        .select()
        .single();

      if (error) throw error;
      return data as MenuItem;
    },

    // Optimistically update before server responds
    onMutate: async ({ itemId, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: menuItemKeys.all });

      // Snapshot all list queries
      const previousData = queryClient.getQueriesData<MenuItem[]>({
        queryKey: menuItemKeys.lists(),
      });

      // Optimistically update all matching queries
      queryClient.setQueriesData<MenuItem[]>({ queryKey: menuItemKeys.lists() }, (old) => {
        if (!old) return old;
        return old.map((item) => (item.id === itemId ? { ...item, ...updates } : item));
      });

      // Also update detail query if exists
      const previousDetail = queryClient.getQueryData<MenuItem>(menuItemKeys.detail(itemId));
      if (previousDetail) {
        queryClient.setQueryData<MenuItem>(menuItemKeys.detail(itemId), {
          ...previousDetail,
          ...updates,
        });
      }

      return { previousData, previousDetail, itemId };
    },

    // On error, roll back to previous value
    onError: (err, variables, context) => {
      console.error('[Menu Item Update] Error:', err);

      // Restore all list queries
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      // Restore detail query
      if (context?.previousDetail && context?.itemId) {
        queryClient.setQueryData(menuItemKeys.detail(context.itemId), context.previousDetail);
      }
    },

    // Always refetch after error or success to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: menuItemKeys.all });
    },
  });
}

/**
 * Hook for quick status toggles (availability, featured, etc.)
 *
 * Provides instant feedback for toggle switches.
 */
export function useToggleItemStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, field, value }: ToggleItemStatusParams) => {
      const { error } = await supabase
        .from('menu_items')
        .update({ [field]: value })
        .eq('id', itemId);

      if (error) throw error;
      return { itemId, field, value };
    },

    onMutate: async ({ itemId, field, value }) => {
      await queryClient.cancelQueries({ queryKey: menuItemKeys.all });

      const previousData = queryClient.getQueriesData<MenuItem[]>({
        queryKey: menuItemKeys.lists(),
      });

      queryClient.setQueriesData<MenuItem[]>({ queryKey: menuItemKeys.lists() }, (old) => {
        if (!old) return old;
        return old.map((item) => (item.id === itemId ? { ...item, [field]: value } : item));
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      console.error('[Toggle Status] Error:', err);
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: menuItemKeys.all });
    },
  });
}

/**
 * Hook for deleting menu items with optimistic removal
 */
export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase.from('menu_items').delete().eq('id', itemId);

      if (error) throw error;
      return itemId;
    },

    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: menuItemKeys.all });

      const previousData = queryClient.getQueriesData<MenuItem[]>({
        queryKey: menuItemKeys.lists(),
      });

      // Optimistically remove from all lists
      queryClient.setQueriesData<MenuItem[]>({ queryKey: menuItemKeys.lists() }, (old) => {
        if (!old) return old;
        return old.filter((item) => item.id !== itemId);
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      console.error('[Delete MenuItem] Error:', err);
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: menuItemKeys.all });
    },
  });
}

/**
 * Hook for reordering menu items
 */
export function useReorderMenuItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: { id: string; display_order: number }[]) => {
      const updates = items.map(({ id, display_order }) =>
        supabase.from('menu_items').update({ display_order }).eq('id', id)
      );

      const results = await Promise.all(updates);
      const errors = results.filter((r) => r.error);
      if (errors.length > 0) {
        throw new Error(`Failed to update ${errors.length} items`);
      }
      return items;
    },

    onMutate: async (items) => {
      await queryClient.cancelQueries({ queryKey: menuItemKeys.all });

      const previousData = queryClient.getQueriesData<MenuItem[]>({
        queryKey: menuItemKeys.lists(),
      });

      // Optimistically update order
      queryClient.setQueriesData<MenuItem[]>({ queryKey: menuItemKeys.lists() }, (old) => {
        if (!old) return old;
        return old
          .map((item) => {
            const update = items.find((u) => u.id === item.id);
            if (update) {
              return { ...item, display_order: update.display_order };
            }
            return item;
          })
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      console.error('[Reorder MenuItems] Error:', err);
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: menuItemKeys.all });
    },
  });
}
