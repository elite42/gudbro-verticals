/**
 * WiFi Resolution Helper
 *
 * Shared utility for building consistent WifiInfo across all guest API routes.
 * Resolution priority: room override > wifi_zones > legacy wifi_network/wifi_password.
 */

import type { WifiInfo, WifiZoneInfo } from '@/types/stay';

interface RawWifiData {
  wifi_network: string | null;
  wifi_password: string | null;
  wifi_zones: WifiZone[] | null;
}

interface RawRoomOverride {
  wifi_ssid_override: string | null;
  wifi_password_override: string | null;
}

interface WifiZone {
  zone_id: string;
  label: string;
  zone_type: string;
  icon: string;
  ssid: string;
  password: string;
  sort_order: number;
}

/**
 * Build a consistent WifiInfo object from property and optional room override data.
 *
 * @param property - Raw property data with wifi_network, wifi_password, wifi_zones
 * @param roomOverride - Optional room-level WiFi override (ssid + password)
 * @returns WifiInfo with backward-compatible network/password fields plus optional zones array
 */
export function buildWifiInfo(
  property: RawWifiData,
  roomOverride?: RawRoomOverride | null
): WifiInfo {
  const zones: WifiZoneInfo[] = [];

  // 1. Room override takes top priority
  if (roomOverride?.wifi_ssid_override) {
    zones.push({
      zoneId: 'room-override',
      label: 'Your Room',
      zoneType: 'room',
      icon: 'Bed',
      ssid: roomOverride.wifi_ssid_override,
      password: roomOverride.wifi_password_override || '',
      sortOrder: -1,
      isRoomNetwork: true,
    });
  }

  // 2. Property zones
  if (property.wifi_zones && Array.isArray(property.wifi_zones) && property.wifi_zones.length > 0) {
    for (const zone of property.wifi_zones) {
      const isRoom = !roomOverride?.wifi_ssid_override && zone.zone_type === 'room';
      zones.push({
        zoneId: zone.zone_id,
        label: zone.label,
        zoneType: zone.zone_type,
        icon: zone.icon,
        ssid: zone.ssid,
        password: zone.password,
        sortOrder: zone.sort_order,
        isRoomNetwork: isRoom,
      });
    }
  }

  // 3. Legacy fallback (no zones configured)
  if (zones.length === 0 && property.wifi_network) {
    return {
      network: property.wifi_network,
      password: property.wifi_password,
    };
  }

  // Sort: room network first, then by sort_order
  zones.sort((a, b) => {
    if (a.isRoomNetwork && !b.isRoomNetwork) return -1;
    if (!a.isRoomNetwork && b.isRoomNetwork) return 1;
    return a.sortOrder - b.sortOrder;
  });

  return {
    network: zones[0]?.ssid || property.wifi_network || null,
    password: zones[0]?.password || property.wifi_password || null,
    zones: zones.length > 0 ? zones : undefined,
  };
}
