/**
 * React Query hooks for optimistic updates
 *
 * Provides instant UI feedback while server requests are in flight.
 * Automatically rolls back on error.
 *
 * Usage:
 * ```tsx
 * import { useUpdateOrderStatus, useToggleItemStatus } from '@/lib/query';
 *
 * function MyComponent() {
 *   const updateStatus = useUpdateOrderStatus();
 *
 *   const handleStatusChange = () => {
 *     updateStatus.mutate({
 *       orderId: 'xxx',
 *       newStatus: 'preparing'
 *     });
 *   };
 * }
 * ```
 */

export { QueryProvider } from './query-client';
export { useUpdateOrderStatus, useBatchUpdateOrderStatus } from './use-order-mutations';
export {
  useMenuItems,
  useUpdateMenuItem,
  useToggleItemStatus,
  useDeleteMenuItem,
  useReorderMenuItems,
  menuItemKeys,
} from './use-menu-mutations';
