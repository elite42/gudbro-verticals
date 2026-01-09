'use client';

import { useState } from 'react';
import { QRDesign, QRPattern, DEFAULT_QR_DESIGN } from '@/lib/qr/qr-types';
import { validateColorContrast } from '@/lib/qr/qr-generator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface QRDesignPanelProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
  className?: string;
}

// Preset color combinations
const COLOR_PRESETS = [
  { name: 'Classic', foreground: '#000000', background: '#FFFFFF' },
  { name: 'Inverted', foreground: '#FFFFFF', background: '#000000' },
  { name: 'Navy', foreground: '#1e3a5f', background: '#FFFFFF' },
  { name: 'Forest', foreground: '#1a472a', background: '#FFFFFF' },
  { name: 'Wine', foreground: '#722f37', background: '#FFFFFF' },
  { name: 'Purple', foreground: '#4a1c7c', background: '#FFFFFF' },
];

const PATTERN_OPTIONS: { value: QRPattern; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
];

export function QRDesignPanel({ design, onChange, className }: QRDesignPanelProps) {
  const [contrastWarning, setContrastWarning] = useState<string | null>(null);

  const updateColors = (foreground: string, background: string) => {
    // Validate contrast
    const contrast = validateColorContrast(foreground, background);
    setContrastWarning(contrast.valid ? null : contrast.message || null);

    onChange({
      ...design,
      colors: { foreground, background },
    });
  };

  const updatePattern = (pattern: QRPattern) => {
    onChange({ ...design, pattern });
  };

  const applyPreset = (preset: (typeof COLOR_PRESETS)[0]) => {
    updateColors(preset.foreground, preset.background);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Color Presets */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Quick Colors</Label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={cn(
                'h-8 w-8 rounded-full border-2 transition-all hover:scale-110',
                design.colors.foreground === preset.foreground &&
                  design.colors.background === preset.background
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'border-gray-200'
              )}
              style={{
                background: `linear-gradient(135deg, ${preset.foreground} 50%, ${preset.background} 50%)`,
              }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="foreground" className="text-sm">
            Foreground
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="foreground"
              value={design.colors.foreground}
              onChange={(e) => updateColors(e.target.value, design.colors.background)}
              className="h-10 w-10 cursor-pointer p-1"
            />
            <Input
              type="text"
              value={design.colors.foreground}
              onChange={(e) => updateColors(e.target.value, design.colors.background)}
              className="flex-1 font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="background" className="text-sm">
            Background
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="background"
              value={design.colors.background}
              onChange={(e) => updateColors(design.colors.foreground, e.target.value)}
              className="h-10 w-10 cursor-pointer p-1"
            />
            <Input
              type="text"
              value={design.colors.background}
              onChange={(e) => updateColors(design.colors.foreground, e.target.value)}
              className="flex-1 font-mono text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>

      {/* Contrast Warning */}
      {contrastWarning && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
          {contrastWarning}
        </div>
      )}

      {/* Pattern Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Pattern Style</Label>
        <div className="flex gap-2">
          {PATTERN_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updatePattern(option.value)}
              className={cn(
                'flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                design.pattern === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:bg-gray-50'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Note: Pattern style may affect scannability on some devices
        </p>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onChange(DEFAULT_QR_DESIGN)}
        className="text-sm text-gray-500 underline hover:text-gray-700"
      >
        Reset to default
      </button>
    </div>
  );
}
