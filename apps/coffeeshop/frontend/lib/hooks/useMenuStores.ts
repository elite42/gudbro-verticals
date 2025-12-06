/**
 * useMenuStores Hook
 *
 * Manages subscriptions to various stores:
 * - Favorites store
 * - Selections store
 * - Table context store
 *
 * Provides reactive state that updates when stores change.
 */

import { useState, useEffect, useCallback } from 'react';
import { favoritesStore } from '@/lib/favorites-store';
import { selectionsStore } from '@/lib/selections-store';
import { tableContextStore, TableContext } from '@/lib/table-context-store';

export interface UseMenuStoresResult {
  // State
  isClient: boolean;
  favoritesCount: number;
  selectionsCount: number;
  tableContext: TableContext;

  // Actions
  checkQRCodeScan: () => void;
  isTableNameRequired: () => boolean;
}

export function useMenuStores(): UseMenuStoresResult {
  const [isClient, setIsClient] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [selectionsCount, setSelectionsCount] = useState(0);
  const [tableContext, setTableContext] = useState<TableContext>(() => tableContextStore.get());

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setFavoritesCount(favoritesStore.count());
    setSelectionsCount(selectionsStore.getCount());
    setTableContext(tableContextStore.get());
  }, []);

  // Listen for favorites changes
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      setFavoritesCount(favoritesStore.count());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('favorites-updated', handleFavoritesUpdate);
      return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate);
    }
  }, []);

  // Listen for selections changes
  useEffect(() => {
    const handleSelectionsUpdate = () => {
      setSelectionsCount(selectionsStore.getCount());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('selections-updated', handleSelectionsUpdate);
      return () => window.removeEventListener('selections-updated', handleSelectionsUpdate);
    }
  }, []);

  // Listen for table context changes
  useEffect(() => {
    const handleTableContextUpdate = (event: CustomEvent<TableContext>) => {
      setTableContext(event.detail);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('table-context-updated', handleTableContextUpdate as EventListener);
      return () => window.removeEventListener('table-context-updated', handleTableContextUpdate as EventListener);
    }
  }, []);

  // Check for QR code scan from URL
  const checkQRCodeScan = useCallback(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const tableParam = urlParams.get('table');

    if (tableParam) {
      const tableNumber = tableContextStore.parseQR(tableParam);
      if (tableNumber) {
        console.log('[useMenuStores] QR Code scanned - Table:', tableNumber);
        tableContextStore.setFromQR(tableNumber);
        setTableContext(tableContextStore.get());
      }
    }
  }, []);

  // Check if customer name is required
  const isTableNameRequired = useCallback(() => {
    return tableContextStore.isNameRequired();
  }, []);

  return {
    isClient,
    favoritesCount,
    selectionsCount,
    tableContext,
    checkQRCodeScan,
    isTableNameRequired,
  };
}
