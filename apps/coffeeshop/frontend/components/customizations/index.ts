/**
 * Database-Driven Dynamic Customizations
 *
 * This module exports all components needed for rendering product customizations
 * dynamically from database configuration.
 *
 * Architecture:
 * - Individual components for each customization type (Radio, Checkbox, Quantity, Text)
 * - Master orchestrator component (DynamicCustomizationRenderer)
 * - Helper functions for validation and price calculation
 *
 * Usage:
 * ```tsx
 * import { DynamicCustomizationRenderer, CustomizationState } from '@/components/customizations';
 *
 * const [state, setState] = useState<CustomizationState>({});
 *
 * <DynamicCustomizationRenderer
 *   customizations={product.customizations}
 *   state={state}
 *   onChange={(id, value) => setState(prev => ({ ...prev, [id]: value }))}
 *   language="it"
 * />
 * ```
 */

// Individual customization type components
export { RadioGroupCustomization } from './RadioGroupCustomization';
export { CheckboxGroupCustomization } from './CheckboxGroupCustomization';
export { QuantityCustomization } from './QuantityCustomization';
export { TextInputCustomization } from './TextInputCustomization';

// Master orchestrator
export {
  DynamicCustomizationRenderer,
  validateCustomizations,
  calculateCustomizationPrice
} from './DynamicCustomizationRenderer';

// Type exports
export type { CustomizationState } from './DynamicCustomizationRenderer';
