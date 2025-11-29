/**
 * GUDBRO Core Templates
 *
 * Pre-configured templates for different hospitality verticals.
 *
 * Usage:
 *
 * ```typescript
 * import {
 *   hotelRoomTemplate,
 *   airbnbTemplate,
 * } from '@gudbro/core/templates';
 *
 * // Use as a starting point for your configuration
 * const myHotelConfig = {
 *   ...hotelRoomTemplate,
 *   name: { en: 'My Hotel' },
 *   // Override specific settings
 * };
 * ```
 */

export { hotelRoomTemplate, default as hotelRoomTemplateDefault } from './hotel-room.example';
export { airbnbTemplate, default as airbnbTemplateDefault } from './airbnb.example';

// Future templates
// export { fnbTemplate } from './fnb.example';
// export { hostelTemplate } from './hostel.example';
// export { foodTruckTemplate } from './food-truck.example';
