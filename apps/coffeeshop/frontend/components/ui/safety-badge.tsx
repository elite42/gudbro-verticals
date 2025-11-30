import * as React from 'react'
import { Badge, BadgeProps } from './badge'
import { safetyFilters, type SafetyFilter } from '../../../../../shared/database/safety-filters'
import { AllergenIcon, getIconNameFromFilterId } from './allergen-icon'

export interface SafetyBadgeProps extends Omit<BadgeProps, 'children'> {
  /** Filter ID from safety-filters database */
  filterId: string
  /** Icon type: 'emoji', 'svg', or 'none' */
  iconType?: 'emoji' | 'svg' | 'none'
  /** Show label text */
  showText?: boolean
  /** Language for label (defaults to 'en') */
  language?: 'en' | 'it' | 'vi'
  /** Show tooltip on hover with description */
  showTooltip?: boolean
}

/**
 * SafetyBadge Component
 *
 * Intelligent badge for food safety filters (allergens, intolerances, diets).
 * Automatically pulls data from the safety-filters database.
 *
 * @example
 * // Glassmorphism badge with SVG icon and text
 * <SafetyBadge filterId="gluten" variant="glassmorphism" iconType="svg" showText />
 *
 * // Emoji icon only (compact)
 * <SafetyBadge filterId="vegan" iconType="emoji" />
 *
 * // Text only (accessibility)
 * <SafetyBadge filterId="halal" iconType="none" showText language="it" />
 *
 * // With tooltip
 * <SafetyBadge filterId="lactose" iconType="svg" showText showTooltip />
 */
export function SafetyBadge({
  filterId,
  iconType = 'svg',
  showText = true,
  language = 'en',
  showTooltip = false,
  variant = 'glassmorphism',
  size = 'md',
  className,
  ...badgeProps
}: SafetyBadgeProps) {
  // Find filter in database
  const filter = safetyFilters.find((f) => f.id === filterId)

  // If filter not found, show error badge (dev mode)
  if (!filter) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <Badge variant="error" size={size} className={className} {...badgeProps}>
          ⚠️ Filter '{filterId}' not found
        </Badge>
      )
    }
    return null
  }

  // Get SVG icon name if using SVG icons
  const svgIconName = iconType === 'svg' ? getIconNameFromFilterId(filterId) : null

  // Size mapping for SVG icons
  const iconSizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  // Map filter type to color scheme
  const colorScheme = filter.type as 'allergen' | 'intolerance' | 'diet'

  // Intelligent fallback: If SVG requested but not available, use emoji
  const effectiveIconType = iconType === 'svg' && !svgIconName ? 'emoji' : iconType

  // Build badge content
  const content = (
    <>
      {effectiveIconType === 'emoji' && filter.icon && <span>{filter.icon}</span>}
      {effectiveIconType === 'svg' && svgIconName && (
        <AllergenIcon
          name={svgIconName}
          size={iconSizeMap[size]}
          colorScheme={colorScheme}
        />
      )}
      {showText && <span>{filter.label[language]}</span>}
    </>
  )

  // Build tooltip title
  const tooltipTitle = showTooltip && filter.description
    ? `${filter.label[language]}: ${filter.description[language]}`
    : filter.label[language]

  return (
    <Badge
      variant={variant}
      size={size}
      className={className}
      title={showTooltip ? tooltipTitle : undefined}
      {...badgeProps}
    >
      {content}
    </Badge>
  )
}

/**
 * SafetyBadgeList Component
 *
 * Renders a list of safety badges for a menu item.
 *
 * @example
 * <SafetyBadgeList
 *   filterIds={['gluten', 'lactose', 'vegan']}
 *   variant="glassmorphism"
 *   iconType="svg"
 *   showText
 * />
 */
export interface SafetyBadgeListProps {
  /** Array of filter IDs to display */
  filterIds: string[]
  /** Badge variant */
  variant?: BadgeProps['variant']
  /** Badge size */
  size?: BadgeProps['size']
  /** Icon type */
  iconType?: 'emoji' | 'svg' | 'none'
  /** Show text */
  showText?: boolean
  /** Language */
  language?: 'en' | 'it' | 'vi'
  /** Show tooltips */
  showTooltip?: boolean
  /** Additional className for the container */
  className?: string
}

export function SafetyBadgeList({
  filterIds,
  variant = 'glassmorphism',
  size = 'md',
  iconType = 'svg',
  showText = true,
  language = 'en',
  showTooltip = false,
  className,
}: SafetyBadgeListProps) {
  if (!filterIds || filterIds.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {filterIds.map((filterId) => (
        <SafetyBadge
          key={filterId}
          filterId={filterId}
          variant={variant}
          size={size}
          iconType={iconType}
          showText={showText}
          language={language}
          showTooltip={showTooltip}
        />
      ))}
    </div>
  )
}
