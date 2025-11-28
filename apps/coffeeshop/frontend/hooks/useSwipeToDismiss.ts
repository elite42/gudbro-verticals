import { useState, useEffect, useCallback } from 'react';

interface UseSwipeToDismissOptions {
  isOpen: boolean;
  onClose: () => void;
  distanceThreshold?: number;  // Default: 100px
  velocityThreshold?: number;  // Default: 0.5 px/ms
}

interface UseSwipeToDismissReturn {
  // Drag state
  isDragging: boolean;
  dragY: number;

  // Event handlers
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;

  // Styles
  getModalStyle: () => {
    transform: string;
    transition: string;
  };
  getBackdropStyle: () => {
    backgroundColor: string;
  };
}

/**
 * Custom hook for swipe-to-dismiss functionality on bottom sheet modals
 *
 * Features:
 * - Swipe down to dismiss
 * - Distance threshold: 100px
 * - Velocity threshold: 0.5 px/ms
 * - Scroll blocking when modal is open
 * - Smooth animations
 *
 * @example
 * ```tsx
 * const swipe = useSwipeToDismiss({ isOpen: showModal, onClose: () => setShowModal(false) });
 *
 * <div
 *   style={swipe.getModalStyle()}
 *   onTouchStart={swipe.handleTouchStart}
 *   onTouchMove={swipe.handleTouchMove}
 *   onTouchEnd={swipe.handleTouchEnd}
 * >
 *   {/* Modal content *\/}
 * </div>
 * ```
 */
export function useSwipeToDismiss({
  isOpen,
  onClose,
  distanceThreshold = 100,
  velocityThreshold = 0.5
}: UseSwipeToDismissOptions): UseSwipeToDismissReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Block scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Drag handlers
  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartTime(Date.now());
    setDragY(0);
  }, []);

  const handleDragMove = useCallback((clientY: number) => {
    if (!isDragging) return;

    const deltaY = clientY - startY;
    // Only allow dragging down (positive deltaY)
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  }, [isDragging, startY]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const deltaTime = Date.now() - startTime;
    const velocity = dragY / deltaTime; // px per ms

    // Distance threshold or velocity threshold
    const shouldClose = dragY > distanceThreshold || velocity > velocityThreshold;

    if (shouldClose) {
      onClose();
    }

    // Reset drag state
    setIsDragging(false);
    setDragY(0);
    setStartY(0);
    setStartTime(0);
  }, [isDragging, dragY, startTime, distanceThreshold, velocityThreshold, onClose]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Mouse event handlers (for desktop testing)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e.clientY);
    }
  }, [isDragging, handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
  }, [isDragging, handleDragEnd]);

  // Style getters
  const getModalStyle = useCallback(() => ({
    transform: `translateY(${dragY}px)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
  }), [dragY, isDragging]);

  const getBackdropStyle = useCallback(() => ({
    backgroundColor: `rgba(0, 0, 0, ${Math.max(0.4 - (dragY / 500), 0.1)})`
  }), [dragY]);

  return {
    isDragging,
    dragY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    getModalStyle,
    getBackdropStyle
  };
}
