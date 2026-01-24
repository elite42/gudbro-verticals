'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import {
  X,
  Minus,
  Plus,
  Heart,
  ShareNetwork,
  Clock,
  Fire,
  Leaf,
  GrainsSlash,
  Pepper,
  Warning,
  ShoppingBag,
  CaretDown,
  CaretUp,
  Barbell,
  Lock,
} from '@phosphor-icons/react';

interface Extra {
  id: string;
  name: string;
  price: number;
}

interface NutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
}

interface ProductBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    image: string;
    category?: string;
    isVegan?: boolean;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
    isSpicy?: boolean;
    prepTime?: number;
    calories?: number;
    allergens?: string[];
    extras?: Extra[];
    nutrition?: NutritionInfo;
  } | null;
  /** Callback when add to cart is clicked. If undefined, button shows upgrade prompt */
  onAddToCart?: (productId: string, quantity: number, selectedExtras: Extra[]) => void;
  formatPrice?: (price: number) => string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function ProductBottomSheet({
  isOpen,
  onClose,
  product,
  onAddToCart,
  formatPrice = (p) => `${Math.round(p / 1000)}K`,
  isFavorite = false,
  onFavoriteToggle,
}: ProductBottomSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(isFavorite);
  const [showAllergens, setShowAllergens] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedExtras([]);
      setImageLoaded(false);
      setLocalFavorite(isFavorite);
      setShowAllergens(false);
      setShowNutrition(false);
    }
  }, [product?.id, isFavorite]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.velocity.y > 500 || info.offset.y > 200) {
      onClose();
    }
  };

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id) ? prev.filter((e) => e.id !== extra.id) : [...prev, extra]
    );
  };

  const handleFavoriteClick = () => {
    setLocalFavorite(!localFavorite);
    onFavoriteToggle?.(product.id);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity, selectedExtras);
      onClose();
    }
  };

  // Calculate total
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const total = (product.price + extrasTotal) * quantity;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'var(--surface-overlay)' }}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-hidden rounded-t-3xl"
            style={{ background: 'var(--surface-card)' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div
                className="h-1 w-12 rounded-full"
                style={{ background: 'var(--border-heavy)' }}
              />
            </div>

            {/* Scrollable content */}
            <div className="scrollbar-styled pb-safe max-h-[calc(90vh-60px)] overflow-y-auto">
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                {!imageLoaded && <div className="skeleton absolute inset-0" />}
                <img
                  src={product.image}
                  alt={product.name}
                  className={`img-cover transition-opacity ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                  }}
                >
                  <X size={20} weight="bold" />
                </button>

                {/* Action buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handleFavoriteClick}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    style={{
                      background: localFavorite ? 'var(--status-error)' : 'rgba(255,255,255,0.9)',
                      color: localFavorite ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    <Heart size={20} weight={localFavorite ? 'fill' : 'regular'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <ShareNetwork size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Dietary badges */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {product.isVegan && (
                    <span
                      className="badge"
                      style={{
                        background: 'var(--status-success-bg)',
                        color: 'var(--status-success)',
                      }}
                    >
                      <Leaf size={12} weight="fill" className="mr-1" />
                      Vegan
                    </span>
                  )}
                  {product.isVegetarian && !product.isVegan && (
                    <span
                      className="badge"
                      style={{
                        background: 'var(--status-success-bg)',
                        color: 'var(--status-success)',
                      }}
                    >
                      <Leaf size={12} className="mr-1" />
                      Vegetarian
                    </span>
                  )}
                  {product.isGlutenFree && (
                    <span
                      className="badge"
                      style={{
                        background: 'var(--status-warning-bg)',
                        color: 'var(--status-warning)',
                      }}
                    >
                      <GrainsSlash size={12} className="mr-1" />
                      Gluten-Free
                    </span>
                  )}
                  {product.isSpicy && (
                    <span
                      className="badge"
                      style={{
                        background: 'var(--status-error-bg)',
                        color: 'var(--status-error)',
                      }}
                    >
                      <Pepper size={12} weight="fill" className="mr-1" />
                      Spicy
                    </span>
                  )}
                </div>

                {/* Title & Price */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2
                    className="font-display text-2xl font-semibold leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {product.name}
                  </h2>
                  <div className="text-right">
                    <p
                      className="font-display text-2xl font-semibold"
                      style={{
                        color: hasDiscount ? 'var(--price-discount)' : 'var(--price-primary)',
                      }}
                    >
                      {formatPrice(product.price)}
                    </p>
                    {hasDiscount && (
                      <p
                        className="text-sm line-through"
                        style={{ color: 'var(--price-original)' }}
                      >
                        {formatPrice(product.originalPrice!)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Meta: prep time, calories */}
                {(product.prepTime || product.calories) && (
                  <div
                    className="mb-4 flex gap-4 text-sm"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {product.prepTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {product.prepTime} min
                      </span>
                    )}
                    {product.calories && (
                      <span className="flex items-center gap-1.5">
                        <Fire size={16} />
                        {product.calories} kcal
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                {product.description && (
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {product.description}
                  </p>
                )}

                {/* Allergens - Collapsible */}
                {product.allergens && product.allergens.length > 0 && (
                  <div
                    className="mb-4 overflow-hidden rounded-xl"
                    style={{ background: 'var(--status-warning-bg)' }}
                  >
                    <button
                      onClick={() => setShowAllergens(!showAllergens)}
                      className="flex w-full items-center justify-between p-3"
                    >
                      <div
                        className="flex items-center gap-2 text-sm font-medium"
                        style={{ color: 'var(--status-warning)' }}
                      >
                        <Warning size={16} />
                        Allergens ({product.allergens.length})
                      </div>
                      {showAllergens ? (
                        <CaretUp size={16} style={{ color: 'var(--status-warning)' }} />
                      ) : (
                        <CaretDown size={16} style={{ color: 'var(--status-warning)' }} />
                      )}
                    </button>
                    {showAllergens && (
                      <div className="px-3 pb-3">
                        <div className="flex flex-wrap gap-2">
                          {product.allergens.map((allergen) => (
                            <span
                              key={allergen}
                              className="rounded-full px-3 py-1 text-xs font-medium"
                              style={{
                                background: 'var(--bg-primary)',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Nutrition Facts - Collapsible */}
                {(product.nutrition || product.calories) && (
                  <div
                    className="mb-4 overflow-hidden rounded-xl"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <button
                      onClick={() => setShowNutrition(!showNutrition)}
                      className="flex w-full items-center justify-between p-3"
                    >
                      <div
                        className="flex items-center gap-2 text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <Barbell size={16} style={{ color: 'var(--brand-warm)' }} />
                        Nutrition Facts
                      </div>
                      {showNutrition ? (
                        <CaretUp size={16} style={{ color: 'var(--text-tertiary)' }} />
                      ) : (
                        <CaretDown size={16} style={{ color: 'var(--text-tertiary)' }} />
                      )}
                    </button>
                    {showNutrition && (
                      <div className="px-3 pb-3">
                        <div className="grid grid-cols-2 gap-2">
                          {/* Calories */}
                          <div
                            className="rounded-lg p-2"
                            style={{ background: 'var(--bg-tertiary)' }}
                          >
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                              Calories
                            </p>
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {product.nutrition?.calories ?? product.calories ?? '-'} kcal
                            </p>
                          </div>
                          {/* Protein */}
                          <div
                            className="rounded-lg p-2"
                            style={{ background: 'var(--bg-tertiary)' }}
                          >
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                              Protein
                            </p>
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {product.nutrition?.protein ?? '-'}g
                            </p>
                          </div>
                          {/* Carbs */}
                          <div
                            className="rounded-lg p-2"
                            style={{ background: 'var(--bg-tertiary)' }}
                          >
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                              Carbs
                            </p>
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {product.nutrition?.carbs ?? '-'}g
                            </p>
                          </div>
                          {/* Fat */}
                          <div
                            className="rounded-lg p-2"
                            style={{ background: 'var(--bg-tertiary)' }}
                          >
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                              Fat
                            </p>
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {product.nutrition?.fat ?? '-'}g
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Extras */}
                {product.extras && product.extras.length > 0 && (
                  <div className="mb-6">
                    <h3
                      className="font-display mb-3 text-lg font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Add extras
                    </h3>
                    <div className="space-y-2">
                      {product.extras.map((extra) => {
                        const isSelected = selectedExtras.some((e) => e.id === extra.id);
                        return (
                          <button
                            key={extra.id}
                            onClick={() => toggleExtra(extra)}
                            className="flex w-full items-center justify-between rounded-xl p-3 transition-colors"
                            style={{
                              background: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                              border: isSelected
                                ? '2px solid var(--brand-warm)'
                                : '2px solid transparent',
                            }}
                          >
                            <span style={{ color: 'var(--text-primary)' }}>{extra.name}</span>
                            <span
                              className="font-medium"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              +{formatPrice(extra.price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity selector */}
                <div
                  className="mb-6 flex items-center justify-between rounded-xl p-4"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    Quantity
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                      style={{
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                      }}
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} weight="bold" />
                    </button>
                    <span
                      className="min-w-[2rem] text-center text-xl font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                      style={{
                        background: 'var(--interactive-primary)',
                        color: 'var(--text-inverse)',
                      }}
                    >
                      <Plus size={18} weight="bold" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sticky footer with Add to Cart */}
              <div
                className="sticky bottom-0 border-t p-4"
                style={{
                  background: 'var(--surface-card)',
                  borderColor: 'var(--border-light)',
                }}
              >
                {onAddToCart ? (
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-base font-semibold text-white transition-all duration-200"
                    style={{
                      background: '#22C55E',
                      boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)',
                    }}
                  >
                    <ShoppingBag size={22} weight="bold" />
                    <span>Add to Order</span>
                    <span className="font-display ml-auto font-bold">{formatPrice(total)}</span>
                  </motion.button>
                ) : (
                  /* Tier-locked state - cart not enabled */
                  <button
                    disabled
                    className="flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-base font-semibold transition-all duration-200"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    <Lock size={22} weight="bold" />
                    <span>Upgrade to Order</span>
                    <span
                      className="ml-auto rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{
                        background: 'var(--status-warning)',
                        color: 'white',
                      }}
                    >
                      PRO
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
