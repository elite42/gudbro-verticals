'use client';

import { useState, useEffect } from 'react';
import { Heart, Clock, Fire, Leaf, GrainsSlash, Pepper, Plus, Lock } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useTierFeature } from '@/lib/hooks/useTierFeature';

// Category-based placeholder images
const PLACEHOLDER_IMAGES: Record<string, string> = {
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  bowls: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
  dessert: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
};

const getPlaceholderImage = (category?: string): string => {
  if (!category) return PLACEHOLDER_IMAGES.default;
  const key = category.toLowerCase();
  return PLACEHOLDER_IMAGES[key] || PLACEHOLDER_IMAGES.default;
};

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category?: string;

  // Badges & Status
  isNew?: boolean;
  isPopular?: boolean;
  isBestSeller?: boolean;

  // Dietary
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;

  // Allergens (short codes like GFO, VG, DF, NF)
  allergens?: string[];

  // Meta
  prepTime?: number; // in minutes
  calories?: number;
  likesCount?: number;

  // State
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onClick?: () => void;

  // Cart
  onAddToCart?: (id: string) => void;
  /** Show quick add button (default: true if onAddToCart provided) */
  showQuickAdd?: boolean;

  // Formatting
  formatPrice?: (price: number) => string;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  category,
  isNew,
  isPopular,
  isBestSeller,
  isVegan,
  isVegetarian,
  isGlutenFree,
  isSpicy,
  allergens,
  prepTime,
  calories,
  likesCount,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
  onAddToCart,
  showQuickAdd,
  formatPrice = (p) => `${Math.round(p / 1000)}K`,
}: ProductCardProps) {
  // Check tier for cart feature
  const { isEnabled: cartEnabled, tierConfig } = useTierFeature('enableCart');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(image || getPlaceholderImage(category));
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  // Update image source when prop changes
  useEffect(() => {
    setImageSrc(image || getPlaceholderImage(category));
    setImageLoaded(false);
  }, [image, category]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalFavorite(!localFavorite);
    onFavoriteToggle?.(id);
  };

  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Determine which badge to show (priority: Best Seller > Popular > New)
  const badge = isBestSeller ? 'BEST SELLER' : isPopular ? 'POPULAR' : isNew ? 'NEW' : null;
  const badgeClass = isBestSeller ? 'badge-best-seller' : isPopular ? 'badge-popular' : 'badge-new';

  return (
    <motion.article
      onClick={onClick}
      className="card group cursor-pointer overflow-hidden"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* Skeleton while loading */}
        {!imageLoaded && (
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        )}

        {/* Product image */}
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            // Use category-based fallback
            const fallback = getPlaceholderImage(category);
            if (imageSrc !== fallback) {
              setImageSrc(fallback);
            }
            setImageLoaded(true);
          }}
        />

        {/* Badge */}
        {badge && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
          >
            {badge}
          </span>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span
            className="absolute right-2 top-2 rounded-full px-2 py-1 text-[10px] font-bold"
            style={{
              background: 'var(--status-success)',
              color: 'white',
            }}
          >
            -{discountPercent}%
          </span>
        )}

        {/* Favorite button with animation */}
        <motion.button
          onClick={handleFavoriteClick}
          className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full"
          style={{
            background: localFavorite ? 'var(--status-error)' : 'rgba(255,255,255,0.9)',
            color: localFavorite ? 'white' : 'var(--text-tertiary)',
          }}
          whileTap={{ scale: 0.8 }}
          aria-label={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <motion.div
            key={localFavorite ? 'filled' : 'empty'}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <Heart size={18} weight={localFavorite ? 'fill' : 'regular'} />
          </motion.div>
        </motion.button>

        {/* Likes count */}
        {likesCount && likesCount > 0 && (
          <span
            className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
            }}
          >
            <Heart size={12} weight="fill" style={{ color: 'var(--status-error)' }} />
            {likesCount}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Dietary icons row - ICONS ONLY, no text (saves space, universal) */}
        {(isVegan || isVegetarian || isGlutenFree || isSpicy) && (
          <div className="mb-2 flex items-center gap-1.5">
            {isVegan && <Leaf size={18} weight="fill" style={{ color: 'var(--status-success)' }} />}
            {isVegetarian && !isVegan && (
              <Leaf size={18} weight="duotone" style={{ color: 'var(--status-success)' }} />
            )}
            {isGlutenFree && (
              <GrainsSlash size={18} weight="fill" style={{ color: 'var(--status-warning)' }} />
            )}
            {isSpicy && <Pepper size={18} weight="fill" style={{ color: 'var(--status-error)' }} />}
          </div>
        )}

        {/* Allergen pills (short codes: GFO, VG, DF, NF) */}
        {allergens && allergens.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {allergens.slice(0, 3).map((allergen) => (
              <span
                key={allergen}
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
              >
                {allergen}
              </span>
            ))}
            {allergens.length > 3 && (
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-tertiary)',
                }}
              >
                +{allergens.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Name */}
        <h3
          className="font-display mb-1 line-clamp-2 text-base font-medium leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p
            className="mb-2 line-clamp-2 text-sm leading-relaxed"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {description}
          </p>
        )}

        {/* Meta row: prep time & calories */}
        {(prepTime || calories) && (
          <div
            className="mb-2 flex items-center gap-3 text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {prepTime && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {prepTime} min
              </span>
            )}
            {calories && (
              <span className="flex items-center gap-1">
                <Fire size={12} />
                {calories} kcal
              </span>
            )}
          </div>
        )}

        {/* Price row with Quick Add button */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-lg font-semibold"
              style={{ color: hasDiscount ? 'var(--price-discount)' : 'var(--price-primary)' }}
            >
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-sm line-through" style={{ color: 'var(--price-original)' }}>
                {formatPrice(originalPrice!)}
              </span>
            )}
          </div>

          {/* Quick Add Button - Tier-aware */}
          {showQuickAdd !== false &&
            onAddToCart &&
            (cartEnabled ? (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(id);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background: 'var(--interactive-primary)',
                  color: 'white',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Add to cart"
              >
                <Plus size={16} weight="bold" />
              </motion.button>
            ) : (
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 items-center gap-1 rounded-full px-2 text-xs font-medium"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-tertiary)',
                }}
                disabled
                aria-label="Upgrade to add to cart"
              >
                <Lock size={12} weight="bold" />
                <span>{tierConfig.branding?.badge || 'PRO'}</span>
              </button>
            ))}
        </div>
      </div>
    </motion.article>
  );
}
