/**
 * useMenuUI Hook
 *
 * Manages UI state for the menu:
 * - Modals (preferences, welcome, customer name)
 * - Sidebars (account, selections)
 * - Overlays (search)
 * - Selected product (bottom sheet)
 */

import { useState, useCallback } from 'react';
import { DishItem } from '@/components/DishCard';

export interface UseMenuUIResult {
  // Modal states
  showPreferencesModal: boolean;
  showWelcomeModal: boolean;
  showCustomerNameModal: boolean;

  // Sidebar states
  showAccountSidebar: boolean;
  showSelectionsSidebar: boolean;

  // Overlay states
  showSearchOverlay: boolean;

  // Selected product (for bottom sheet)
  selectedProduct: DishItem | null;

  // Modal actions
  openPreferencesModal: () => void;
  closePreferencesModal: () => void;
  openWelcomeModal: () => void;
  closeWelcomeModal: () => void;
  openCustomerNameModal: () => void;
  closeCustomerNameModal: () => void;

  // Sidebar actions
  openAccountSidebar: () => void;
  closeAccountSidebar: () => void;
  openSelectionsSidebar: () => void;
  closeSelectionsSidebar: () => void;

  // Overlay actions
  openSearchOverlay: () => void;
  closeSearchOverlay: () => void;

  // Product actions
  selectProduct: (product: DishItem) => void;
  clearSelectedProduct: () => void;

  // Combined actions
  openPreferencesFromAccount: () => void;
  editProductFromSelections: (product: DishItem) => void;
}

export function useMenuUI(): UseMenuUIResult {
  // Modal states
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showCustomerNameModal, setShowCustomerNameModal] = useState(false);

  // Sidebar states
  const [showAccountSidebar, setShowAccountSidebar] = useState(false);
  const [showSelectionsSidebar, setShowSelectionsSidebar] = useState(false);

  // Overlay states
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  // Selected product
  const [selectedProduct, setSelectedProduct] = useState<DishItem | null>(null);

  // Modal actions
  const openPreferencesModal = useCallback(() => setShowPreferencesModal(true), []);
  const closePreferencesModal = useCallback(() => setShowPreferencesModal(false), []);
  const openWelcomeModal = useCallback(() => setShowWelcomeModal(true), []);
  const closeWelcomeModal = useCallback(() => setShowWelcomeModal(false), []);
  const openCustomerNameModal = useCallback(() => setShowCustomerNameModal(true), []);
  const closeCustomerNameModal = useCallback(() => setShowCustomerNameModal(false), []);

  // Sidebar actions
  const openAccountSidebar = useCallback(() => setShowAccountSidebar(true), []);
  const closeAccountSidebar = useCallback(() => setShowAccountSidebar(false), []);
  const openSelectionsSidebar = useCallback(() => setShowSelectionsSidebar(true), []);
  const closeSelectionsSidebar = useCallback(() => setShowSelectionsSidebar(false), []);

  // Overlay actions
  const openSearchOverlay = useCallback(() => setShowSearchOverlay(true), []);
  const closeSearchOverlay = useCallback(() => setShowSearchOverlay(false), []);

  // Product actions
  const selectProduct = useCallback((product: DishItem) => setSelectedProduct(product), []);
  const clearSelectedProduct = useCallback(() => setSelectedProduct(null), []);

  // Combined actions
  const openPreferencesFromAccount = useCallback(() => {
    setShowAccountSidebar(false);
    setShowPreferencesModal(true);
  }, []);

  const editProductFromSelections = useCallback((product: DishItem) => {
    setShowSelectionsSidebar(false); // Close sidebar first
    setSelectedProduct(product); // Then open product modal
  }, []);

  return {
    // Modal states
    showPreferencesModal,
    showWelcomeModal,
    showCustomerNameModal,

    // Sidebar states
    showAccountSidebar,
    showSelectionsSidebar,

    // Overlay states
    showSearchOverlay,

    // Selected product
    selectedProduct,

    // Modal actions
    openPreferencesModal,
    closePreferencesModal,
    openWelcomeModal,
    closeWelcomeModal,
    openCustomerNameModal,
    closeCustomerNameModal,

    // Sidebar actions
    openAccountSidebar,
    closeAccountSidebar,
    openSelectionsSidebar,
    closeSelectionsSidebar,

    // Overlay actions
    openSearchOverlay,
    closeSearchOverlay,

    // Product actions
    selectProduct,
    clearSelectedProduct,

    // Combined actions
    openPreferencesFromAccount,
    editProductFromSelections,
  };
}
