import { describe, it, expect } from 'vitest';
import {
  generateWiFiString,
  EXPORT_PRESETS,
  DEFAULT_QR_DESIGN,
  WiFiConfig,
  WiFiSecurity,
  MaterialPreset,
  ExportFormat,
  ColorMode,
} from '../qr-types';

// ============================================
// generateWiFiString Tests
// ============================================

describe('generateWiFiString', () => {
  describe('security types', () => {
    it('should generate valid WPA WiFi string', () => {
      const config: WiFiConfig = {
        ssid: 'MyNetwork',
        password: 'secret123',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:MyNetwork;P:secret123;H:false;;');
    });

    it('should generate valid WEP WiFi string', () => {
      const config: WiFiConfig = {
        ssid: 'OldNetwork',
        password: 'wepkey',
        security: 'WEP',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WEP;S:OldNetwork;P:wepkey;H:false;;');
    });

    it('should generate valid nopass WiFi string', () => {
      const config: WiFiConfig = {
        ssid: 'OpenNetwork',
        password: '',
        security: 'nopass',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:nopass;S:OpenNetwork;P:;H:false;;');
    });
  });

  describe('hidden network', () => {
    it('should handle hidden network true', () => {
      const config: WiFiConfig = {
        ssid: 'HiddenNet',
        password: 'pass123',
        security: 'WPA',
        hidden: true,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:HiddenNet;P:pass123;H:true;;');
    });

    it('should handle hidden network false', () => {
      const config: WiFiConfig = {
        ssid: 'VisibleNet',
        password: 'pass456',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:VisibleNet;P:pass456;H:false;;');
    });
  });

  describe('special character escaping', () => {
    it('should escape semicolons in SSID', () => {
      const config: WiFiConfig = {
        ssid: 'My;Network',
        password: 'pass',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:My\\;Network;P:pass;H:false;;');
    });

    it('should escape colons in SSID', () => {
      const config: WiFiConfig = {
        ssid: 'My:Network',
        password: 'pass',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:My\\:Network;P:pass;H:false;;');
    });

    it('should escape commas in SSID', () => {
      const config: WiFiConfig = {
        ssid: 'My,Network',
        password: 'pass',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:My\\,Network;P:pass;H:false;;');
    });

    it('should escape backslashes in SSID', () => {
      const config: WiFiConfig = {
        ssid: 'My\\Network',
        password: 'pass',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:My\\\\Network;P:pass;H:false;;');
    });

    it('should escape semicolons in password', () => {
      const config: WiFiConfig = {
        ssid: 'Network',
        password: 'pass;word',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:Network;P:pass\\;word;H:false;;');
    });

    it('should escape colons in password', () => {
      const config: WiFiConfig = {
        ssid: 'Network',
        password: 'pass:word',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:Network;P:pass\\:word;H:false;;');
    });

    it('should escape commas in password', () => {
      const config: WiFiConfig = {
        ssid: 'Network',
        password: 'pass,word',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:Network;P:pass\\,word;H:false;;');
    });

    it('should escape backslashes in password', () => {
      const config: WiFiConfig = {
        ssid: 'Network',
        password: 'pass\\word',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:Network;P:pass\\\\word;H:false;;');
    });

    it('should escape multiple special characters in SSID and password', () => {
      const config: WiFiConfig = {
        ssid: 'My;Net:work,Test',
        password: 'pass;word:123,456',
        security: 'WPA',
        hidden: true,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:My\\;Net\\:work\\,Test;P:pass\\;word\\:123\\,456;H:true;;');
    });

    it('should handle all special characters together', () => {
      const config: WiFiConfig = {
        ssid: 'A\\B;C:D,E',
        password: '1\\2;3:4,5',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:A\\\\B\\;C\\:D\\,E;P:1\\\\2\\;3\\:4\\,5;H:false;;');
    });
  });

  describe('edge cases', () => {
    it('should handle empty SSID', () => {
      const config: WiFiConfig = {
        ssid: '',
        password: 'pass',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:;P:pass;H:false;;');
    });

    it('should handle empty password with WPA', () => {
      const config: WiFiConfig = {
        ssid: 'Network',
        password: '',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:Network;P:;H:false;;');
    });

    it('should handle unicode characters in SSID', () => {
      const config: WiFiConfig = {
        ssid: 'CafeWiFi',
        password: 'password123',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:CafeWiFi;P:password123;H:false;;');
    });

    it('should handle spaces in SSID and password', () => {
      const config: WiFiConfig = {
        ssid: 'My Network Name',
        password: 'my password',
        security: 'WPA',
        hidden: false,
      };
      const result = generateWiFiString(config);
      expect(result).toBe('WIFI:T:WPA;S:My Network Name;P:my password;H:false;;');
    });
  });
});

// ============================================
// EXPORT_PRESETS Tests
// ============================================

describe('EXPORT_PRESETS', () => {
  const validFormats: ExportFormat[] = ['png', 'png-hd', 'svg', 'pdf'];
  const validColorModes: ColorMode[] = ['rgb', 'cmyk', 'grayscale'];
  const presetNames: MaterialPreset[] = [
    'paper',
    'tshirt',
    'sticker',
    'banner',
    'newspaper',
    'business-card',
    'menu',
    'tent-card',
  ];

  describe('preset structure validation', () => {
    it.each(presetNames)('preset "%s" should have valid format', (preset) => {
      expect(EXPORT_PRESETS[preset]).toBeDefined();
      expect(validFormats).toContain(EXPORT_PRESETS[preset].format);
    });

    it.each(presetNames)('preset "%s" should have valid colorMode if defined', (preset) => {
      const options = EXPORT_PRESETS[preset];
      if (options.colorMode !== undefined) {
        expect(validColorModes).toContain(options.colorMode);
      }
    });

    it.each(presetNames)('preset "%s" should have quietZone as number if defined', (preset) => {
      const options = EXPORT_PRESETS[preset];
      if (options.quietZone !== undefined) {
        expect(typeof options.quietZone).toBe('number');
        expect(options.quietZone).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('specific preset requirements', () => {
    it('paper preset should have cmyk color mode', () => {
      expect(EXPORT_PRESETS.paper.colorMode).toBe('cmyk');
    });

    it('paper preset should have pdf format', () => {
      expect(EXPORT_PRESETS.paper.format).toBe('pdf');
    });

    it('paper preset should include bleed', () => {
      expect(EXPORT_PRESETS.paper.includeBleed).toBe(true);
    });

    it('tshirt preset should have transparent background', () => {
      expect(EXPORT_PRESETS.tshirt.transparentBg).toBe(true);
    });

    it('tshirt preset should have svg format', () => {
      expect(EXPORT_PRESETS.tshirt.format).toBe('svg');
    });

    it('newspaper preset should have grayscale color mode', () => {
      expect(EXPORT_PRESETS.newspaper.colorMode).toBe('grayscale');
    });

    it('newspaper preset should have pdf format', () => {
      expect(EXPORT_PRESETS.newspaper.format).toBe('pdf');
    });

    it('sticker preset should have svg format', () => {
      expect(EXPORT_PRESETS.sticker.format).toBe('svg');
    });

    it('banner preset should have svg format', () => {
      expect(EXPORT_PRESETS.banner.format).toBe('svg');
    });

    it('business-card preset should have png-hd format', () => {
      expect(EXPORT_PRESETS['business-card'].format).toBe('png-hd');
    });

    it('menu preset should have cmyk color mode', () => {
      expect(EXPORT_PRESETS.menu.colorMode).toBe('cmyk');
    });

    it('menu preset should have pdf format', () => {
      expect(EXPORT_PRESETS.menu.format).toBe('pdf');
    });

    it('tent-card preset should have cmyk color mode', () => {
      expect(EXPORT_PRESETS['tent-card'].colorMode).toBe('cmyk');
    });

    it('tent-card preset should have pdf format', () => {
      expect(EXPORT_PRESETS['tent-card'].format).toBe('pdf');
    });

    it('tent-card preset should include bleed', () => {
      expect(EXPORT_PRESETS['tent-card'].includeBleed).toBe(true);
    });
  });

  describe('quiet zone values', () => {
    it('paper preset should have quietZone of 4', () => {
      expect(EXPORT_PRESETS.paper.quietZone).toBe(4);
    });

    it('tshirt preset should have quietZone of 2', () => {
      expect(EXPORT_PRESETS.tshirt.quietZone).toBe(2);
    });

    it('sticker preset should have quietZone of 2', () => {
      expect(EXPORT_PRESETS.sticker.quietZone).toBe(2);
    });

    it('banner preset should have quietZone of 4', () => {
      expect(EXPORT_PRESETS.banner.quietZone).toBe(4);
    });
  });

  describe('completeness', () => {
    it('should have all expected presets defined', () => {
      expect(Object.keys(EXPORT_PRESETS)).toHaveLength(8);
      presetNames.forEach((preset) => {
        expect(EXPORT_PRESETS).toHaveProperty(preset);
      });
    });
  });
});

// ============================================
// DEFAULT_QR_DESIGN Tests
// ============================================

describe('DEFAULT_QR_DESIGN', () => {
  describe('colors', () => {
    it('should have colors object defined', () => {
      expect(DEFAULT_QR_DESIGN.colors).toBeDefined();
    });

    it('should have black foreground color', () => {
      expect(DEFAULT_QR_DESIGN.colors.foreground).toBe('#000000');
    });

    it('should have white background color', () => {
      expect(DEFAULT_QR_DESIGN.colors.background).toBe('#FFFFFF');
    });

    it('foreground color should be valid hex', () => {
      expect(DEFAULT_QR_DESIGN.colors.foreground).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it('background color should be valid hex', () => {
      expect(DEFAULT_QR_DESIGN.colors.background).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  describe('pattern', () => {
    it('should have square as default pattern', () => {
      expect(DEFAULT_QR_DESIGN.pattern).toBe('square');
    });

    it('pattern should be a valid QRPattern type', () => {
      const validPatterns = ['square', 'dots', 'rounded'];
      expect(validPatterns).toContain(DEFAULT_QR_DESIGN.pattern);
    });
  });

  describe('optional properties', () => {
    it('should not have logo by default', () => {
      expect(DEFAULT_QR_DESIGN.logo).toBeUndefined();
    });

    it('should not have frame by default', () => {
      expect(DEFAULT_QR_DESIGN.frame).toBeUndefined();
    });
  });

  describe('structure', () => {
    it('should have exactly the expected properties', () => {
      const keys = Object.keys(DEFAULT_QR_DESIGN);
      expect(keys).toContain('colors');
      expect(keys).toContain('pattern');
      // logo and frame are optional and should not be present
      expect(DEFAULT_QR_DESIGN).not.toHaveProperty('logo');
      expect(DEFAULT_QR_DESIGN).not.toHaveProperty('frame');
    });
  });
});

// ============================================
// Type Exports Validation (compile-time checks)
// ============================================

describe('type exports', () => {
  it('WiFiConfig type should be usable', () => {
    const config: WiFiConfig = {
      ssid: 'test',
      password: 'test',
      security: 'WPA',
      hidden: false,
    };
    expect(config).toBeDefined();
  });

  it('WiFiSecurity type should accept valid values', () => {
    const wpa: WiFiSecurity = 'WPA';
    const wep: WiFiSecurity = 'WEP';
    const nopass: WiFiSecurity = 'nopass';
    expect([wpa, wep, nopass]).toEqual(['WPA', 'WEP', 'nopass']);
  });

  it('MaterialPreset type should accept valid values', () => {
    const presets: MaterialPreset[] = [
      'paper',
      'tshirt',
      'sticker',
      'banner',
      'newspaper',
      'business-card',
      'menu',
      'tent-card',
    ];
    expect(presets).toHaveLength(8);
  });

  it('ExportFormat type should accept valid values', () => {
    const formats: ExportFormat[] = ['png', 'png-hd', 'svg', 'pdf'];
    expect(formats).toHaveLength(4);
  });

  it('ColorMode type should accept valid values', () => {
    const modes: ColorMode[] = ['rgb', 'cmyk', 'grayscale'];
    expect(modes).toHaveLength(3);
  });
});
