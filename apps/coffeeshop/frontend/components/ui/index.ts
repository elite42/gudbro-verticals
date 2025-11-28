/**
 * UI Components Export
 *
 * Centralized export point for all UI components
 * Usage: import { Button, Card, Input, Badge, Alert } from '@/components/ui'
 */

// Button
export { Button, buttonVariants } from './button'
export type { ButtonProps } from './button'

// Card
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
export type { CardProps } from './card'

// Input & Textarea
export { Input, Textarea, inputVariants, textareaVariants } from './input'
export type { InputProps, TextareaProps } from './input'

// Badge
export { Badge, badgeVariants } from './badge'
export type { BadgeProps } from './badge'

// Alert
export { Alert, AlertTitle, AlertDescription, alertVariants } from './alert'
export type { AlertProps } from './alert'

// Safety Badges
export { SafetyBadge, SafetyBadgeList } from './safety-badge'
export type { SafetyBadgeProps, SafetyBadgeListProps } from './safety-badge'

// Spicy Level
export { SpicyLevel } from './spicy-level'
export type { SpicyLevelProps } from './spicy-level'

// Allergen Icon
export { AllergenIcon, getIconNameFromFilterId } from './allergen-icon'
export type { AllergenIconProps } from './allergen-icon'
