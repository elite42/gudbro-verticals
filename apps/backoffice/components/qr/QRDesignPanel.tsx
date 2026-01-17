'use client';

import { useState, useRef } from 'react';
import { QRDesign, QRPattern, DEFAULT_QR_DESIGN } from '@/lib/qr/qr-types';
import { validateColorContrast } from '@/lib/qr/qr-generator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Upload, X, Image as ImageIcon, Type, Square, Circle } from 'lucide-react';

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
  { value: 'squares', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
];

type EyeStyle = 'square' | 'circle' | 'rounded';

const EYE_STYLE_OPTIONS: { value: EyeStyle; label: string; icon: typeof Square }[] = [
  { value: 'square', label: 'Square', icon: Square },
  { value: 'circle', label: 'Circle', icon: Circle },
  { value: 'rounded', label: 'Rounded', icon: Square }, // We'll style this differently
];

const LOGO_SIZE_OPTIONS = [
  { value: 15, label: 'Small' },
  { value: 20, label: 'Medium' },
  { value: 25, label: 'Large' },
  { value: 30, label: 'Max' },
];

export function QRDesignPanel({ design, onChange, className }: QRDesignPanelProps) {
  const [contrastWarning, setContrastWarning] = useState<string | null>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const updateEyeStyle = (eye_style: EyeStyle) => {
    onChange({ ...design, eye_style });
  };

  const updateLogo = (logo: QRDesign['logo']) => {
    onChange({ ...design, logo });
  };

  const updateFrame = (frame: QRDesign['frame']) => {
    onChange({ ...design, frame });
  };

  const applyPreset = (preset: (typeof COLOR_PRESETS)[0]) => {
    updateColors(preset.foreground, preset.background);
  };

  // Handle logo file upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo must be less than 2MB');
      return;
    }

    setIsUploadingLogo(true);

    try {
      // Convert to base64 for preview (in production, upload to storage)
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        updateLogo({
          url: dataUrl,
          size: design.logo?.size || 20,
        });
        setIsUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading logo:', error);
      setIsUploadingLogo(false);
    }
  };

  const removeLogo = () => {
    updateLogo(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

      {/* Eye Style Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Corner Style</Label>
        <div className="flex gap-2">
          {EYE_STYLE_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => updateEyeStyle(option.value)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                  design.eye_style === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                )}
              >
                <Icon className={cn('h-4 w-4', option.value === 'rounded' && 'rounded-sm')} />
                {option.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500">Style of the three corner markers in the QR code</p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Logo (Optional)</Label>

        {design.logo?.url ? (
          <div className="space-y-3">
            {/* Logo Preview */}
            <div className="relative inline-block">
              <div className="h-20 w-20 overflow-hidden rounded-lg border bg-gray-50">
                <img
                  src={design.logo.url}
                  alt="Logo preview"
                  className="h-full w-full object-contain"
                />
              </div>
              <button
                onClick={removeLogo}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
                title="Remove logo"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            {/* Logo Size */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Logo Size</Label>
              <div className="flex gap-2">
                {LOGO_SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateLogo({ ...design.logo!, size: option.value })}
                    className={cn(
                      'flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                      design.logo?.size === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">Larger logos may reduce scannability</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
              isUploadingLogo
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            {isUploadingLogo ? (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                <span className="text-sm">Uploading...</span>
              </div>
            ) : (
              <>
                <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                <p className="text-sm font-medium text-gray-700">Click to upload logo</p>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
              </>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
      </div>

      {/* Frame Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Frame with Text</Label>
          <button
            onClick={() =>
              updateFrame(
                design.frame?.enabled
                  ? { ...design.frame, enabled: false }
                  : { enabled: true, text: 'SCAN ME', color: design.colors.foreground }
              )
            }
            className={cn(
              'relative h-6 w-11 rounded-full transition-colors',
              design.frame?.enabled ? 'bg-blue-500' : 'bg-gray-200'
            )}
          >
            <span
              className={cn(
                'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                design.frame?.enabled && 'translate-x-5'
              )}
            />
          </button>
        </div>

        {design.frame?.enabled && (
          <div className="space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="space-y-2">
              <Label htmlFor="frame-text" className="text-xs text-gray-600">
                Frame Text
              </Label>
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-gray-400" />
                <Input
                  id="frame-text"
                  type="text"
                  value={design.frame.text || ''}
                  onChange={(e) => updateFrame({ ...design.frame!, text: e.target.value })}
                  placeholder="SCAN ME"
                  maxLength={20}
                  className="flex-1 text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">Max 20 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frame-color" className="text-xs text-gray-600">
                Frame Color
              </Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  id="frame-color"
                  value={design.frame.color || design.colors.foreground}
                  onChange={(e) => updateFrame({ ...design.frame!, color: e.target.value })}
                  className="h-8 w-8 cursor-pointer p-0.5"
                />
                <Input
                  type="text"
                  value={design.frame.color || design.colors.foreground}
                  onChange={(e) => updateFrame({ ...design.frame!, color: e.target.value })}
                  className="flex-1 font-mono text-xs"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        )}
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
