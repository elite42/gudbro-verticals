/**
 * GUDBRO Core Library
 *
 * Shared infrastructure for all GUDBRO hospitality applications.
 *
 * Includes:
 * - Translation Engine (AI-powered, provider-agnostic)
 * - Reusable Modules (WiFi, Prices, Contacts, Attractions, etc.)
 * - Pre-configured Templates (Hotel, Airbnb, F&B)
 *
 * Usage:
 *
 * ```typescript
 * // Translation Engine
 * import { TranslationEngine, createTranslationEngine } from '@gudbro/core/translation-engine';
 *
 * // Modules (Components + Types)
 * import {
 *   WiFiCard,
 *   PriceListCard,
 *   ContactsCard,
 *   AttractionsCard,
 * } from '@gudbro/core/modules';
 *
 * import type {
 *   WiFiConfig,
 *   TemplateConfig,
 *   MultiLangText,
 * } from '@gudbro/core/modules';
 *
 * // Templates
 * import { hotelRoomTemplate, airbnbTemplate } from '@gudbro/core/templates';
 * ```
 */

// Re-export everything
export * from './translation-engine';
export * from './modules';
export * from './templates';
