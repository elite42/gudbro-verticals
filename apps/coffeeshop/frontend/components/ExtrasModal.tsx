'use client';

import { useState } from 'react';
import { DishItem, Extra } from './DishCard';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';

interface ExtrasModalProps {
  dish: DishItem;
  onClose: () => void;
  onAddToCart: (selectedExtras: Extra[], quantity: number) => void;
}

export function ExtrasModal({ dish, onClose, onAddToCart }: ExtrasModalProps) {
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [dineIn, setDineIn] = useState(true); // true = dine-in, false = takeaway

  // Group extras by type
  const groupedExtras = dish.availableExtras?.reduce((acc, extra) => {
    if (!acc[extra.type]) {
      acc[extra.type] = [];
    }
    acc[extra.type].push(extra);
    return acc;
  }, {} as Record<string, Extra[]>) || {};

  const handleToggleExtra = (extra: Extra) => {
    // For size and milk, only one can be selected
    if (extra.type === 'size' || extra.type === 'milk') {
      setSelectedExtras(prev => {
        const filtered = prev.filter(e => e.type !== extra.type);
        const exists = prev.find(e => e.id === extra.id);
        return exists ? filtered : [...filtered, extra];
      });
    } else {
      // For other types, multiple can be selected
      setSelectedExtras(prev => {
        const exists = prev.find(e => e.id === extra.id);
        return exists
          ? prev.filter(e => e.id !== extra.id)
          : [...prev, extra];
      });
    }
  };

  const isSelected = (extra: Extra) => {
    return selectedExtras.some(e => e.id === extra.id);
  };

  const getTotalPrice = () => {
    const basePrice = dish.price;
    const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    return (basePrice + extrasPrice) * quantity;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(selectedExtras, quantity);
  };

  const swipe = useSwipeToDismiss({ isOpen: true, onClose });

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      size: '☕ Dimensione',
      milk: '🥛 Tipo di Latte',
      shot: '⚡ Extra Shot',
      sweetener: '🍯 Dolcificante',
      liquor: '🥃 Liquore',
      addon: '🍪 Extra'
    };
    return labels[type] || type;
  };

  const getTypeDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      size: 'Scegli una dimensione',
      milk: 'Scegli un tipo di latte',
      shot: 'Aggiungi caffè extra',
      sweetener: 'Aggiungi dolcificante',
      liquor: 'Aggiungi un liquore',
      addon: 'Aggiungi extra'
    };
    return descriptions[type] || '';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={swipe.getBackdropStyle()}
    >
      <div
        className="bg-theme-bg-elevated rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto select-none"
        style={swipe.getModalStyle()}
        onTouchStart={swipe.handleTouchStart}
        onTouchMove={swipe.handleTouchMove}
        onTouchEnd={swipe.handleTouchEnd}
        onMouseDown={swipe.handleMouseDown}
        onMouseMove={swipe.handleMouseMove}
        onMouseUp={swipe.handleMouseUp}
        onMouseLeave={swipe.handleMouseLeave}
      >
        {/* Header */}
        <div className="sticky top-0 bg-theme-bg-elevated border-b border-theme-bg-tertiary p-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-bold text-lg text-theme-text-primary">{dish.name}</h2>
              <p className="text-sm text-theme-text-secondary">{formatPrice(dish.price)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-theme-bg-secondary rounded-full flex items-center justify-center hover:bg-theme-bg-tertiary transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Dine-in vs Takeaway */}
          <div>
            <h3 className="font-bold text-theme-text-primary mb-3">🍽️ Modalità di Consumo</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setDineIn(true)}
                className={`flex-1 px-4 py-3 rounded-xl border-2 font-semibold transition-all ${
                  dineIn
                    ? 'border-theme-brand-primary bg-theme-brand-secondary text-theme-brand-primary'
                    : 'border-theme-bg-tertiary bg-theme-bg-elevated text-theme-text-secondary'
                }`}
              >
                🍽️ Al Tavolo
              </button>
              <button
                onClick={() => setDineIn(false)}
                className={`flex-1 px-4 py-3 rounded-xl border-2 font-semibold transition-all ${
                  !dineIn
                    ? 'border-theme-brand-primary bg-theme-brand-secondary text-theme-brand-primary'
                    : 'border-theme-bg-tertiary bg-theme-bg-elevated text-theme-text-secondary'
                }`}
              >
                🥡 Da Asporto
              </button>
            </div>
          </div>

          {/* Extras sections */}
          {Object.entries(groupedExtras).map(([type, extras]) => (
            <div key={type}>
              <div className="mb-3">
                <h3 className="font-bold text-theme-text-primary">{getTypeLabel(type)}</h3>
                <p className="text-sm text-theme-text-secondary">{getTypeDescription(type)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {extras.map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => handleToggleExtra(extra)}
                    className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all text-left ${
                      isSelected(extra)
                        ? 'border-theme-brand-primary bg-theme-brand-secondary text-theme-brand-primary'
                        : 'border-theme-bg-tertiary bg-theme-bg-elevated text-theme-text-secondary hover:border-theme-bg-tertiary'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{extra.name}</span>
                      {extra.price > 0 && (
                        <span className="text-sm">+{formatPrice(extra.price)}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Suggestions */}
          {dish.suggestions && dish.suggestions.length > 0 && (
            <div>
              <h3 className="font-bold text-theme-text-primary mb-3">💡 Potrebbero Piacerti Anche</h3>
              <div className="space-y-2">
                {dish.suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex items-center gap-3 p-3 bg-theme-bg-secondary rounded-xl hover:bg-theme-bg-tertiary transition-colors cursor-pointer"
                  >
                    <img
                      src={suggestion.image}
                      alt={suggestion.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-theme-text-primary">{suggestion.name}</h4>
                      <p className="text-sm text-theme-text-secondary">{formatPrice(suggestion.price)}</p>
                    </div>
                    <button className="px-3 py-1 bg-theme-brand-primary text-white rounded-full text-sm font-semibold hover:bg-theme-brand-primary-hover">
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <h3 className="font-bold text-theme-text-primary mb-3">📦 Quantità</h3>
            <div className="flex items-center justify-center gap-4 bg-theme-bg-secondary rounded-xl p-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-12 h-12 bg-theme-bg-elevated rounded-full font-bold text-xl text-theme-text-primary hover:bg-theme-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                −
              </button>
              <span className="font-bold text-2xl text-theme-text-primary min-w-[40px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-theme-bg-elevated rounded-full font-bold text-xl text-theme-brand-primary hover:bg-theme-bg-tertiary transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer - Add to Cart */}
        <div className="sticky bottom-0 bg-theme-bg-elevated border-t border-theme-bg-tertiary p-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Aggiungi al Carrello - {formatPrice(getTotalPrice())}
          </button>
          {selectedExtras.length > 0 && (
            <p className="text-center text-sm text-theme-text-secondary mt-2">
              {selectedExtras.length} personalizzazione{selectedExtras.length > 1 ? 'i' : ''} selezionate
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
