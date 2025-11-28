import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const brandColors = {
  primary: [
    { name: 'Red', hex: '#cd0931', rgb: '205, 9, 49', usage: 'Primary brand color, CTAs, highlights' },
    { name: 'Black', hex: '#000000', rgb: '0, 0, 0', usage: 'Text, headers, strong emphasis' },
    { name: 'Gold', hex: '#f8ad16', rgb: '248, 173, 22', usage: 'Accent, success states, badges' },
    { name: 'Light Gray', hex: '#f2f2f2', rgb: '242, 242, 242', usage: 'Backgrounds, subtle sections' },
  ],
  secondary: [
    { name: 'Blue', hex: '#0931cd', rgb: '9, 49, 205', usage: 'Secondary accent, links, info states' },
    { name: 'Dark Gray', hex: '#333333', rgb: '51, 51, 51', usage: 'Secondary text, borders' },
    { name: 'Orange', hex: '#f88d16', rgb: '248, 141, 22', usage: 'Warning states, highlights' },
  ],
};

const typography = {
  primary: {
    name: 'Rethink Sans',
    usage: 'Headers, buttons, UI elements',
    weights: ['300 Light', '400 Regular', '500 Medium', '600 SemiBold', '700 Bold', '800 ExtraBold'],
  },
  secondary: {
    name: 'Planet Kosmos',
    usage: 'Display text, special emphasis',
    weights: ['400 Regular', '700 Bold'],
  },
};

const spacingScale = [
  { name: 'xs', value: '0.25rem', pixels: '4px' },
  { name: 'sm', value: '0.5rem', pixels: '8px' },
  { name: 'md', value: '1rem', pixels: '16px' },
  { name: 'lg', value: '1.5rem', pixels: '24px' },
  { name: 'xl', value: '2rem', pixels: '32px' },
  { name: '2xl', value: '3rem', pixels: '48px' },
  { name: '3xl', value: '4rem', pixels: '64px' },
  { name: '4xl', value: '6rem', pixels: '96px' },
];

export default function BrandPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Foundations</h1>
        <p className="text-gray-600">
          Official GUDBRO brand guidelines for colors, typography, and spacing
        </p>
      </div>

      {/* Colors Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Color Palette</h2>

        {/* Primary Colors */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            Primary Colors
            <Badge variant="default" className="text-xs">4 colors</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brandColors.primary.map((color) => (
              <Card key={color.hex} padding="none" className="overflow-hidden">
                <div
                  className="h-32 w-full"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">{color.name}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">HEX:</span>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{color.hex}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RGB:</span>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{color.rgb}</code>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 italic">{color.usage}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            Secondary Colors
            <Badge variant="default" className="text-xs">3 colors</Badge>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {brandColors.secondary.map((color) => (
              <Card key={color.hex} padding="none" className="overflow-hidden">
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{color.name}</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">HEX:</span>
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{color.hex}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RGB:</span>
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{color.rgb}</code>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">{color.usage}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Typography</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Font */}
          <Card padding="lg">
            <div className="mb-4">
              <Badge variant="default" className="mb-2">Primary</Badge>
              <h3 className="text-2xl font-bold text-gray-900">{typography.primary.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{typography.primary.usage}</p>
            </div>

            <div className="space-y-2">
              {typography.primary.weights.map((weight) => (
                <div key={weight} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{weight}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Aa</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Secondary Font */}
          <Card padding="lg">
            <div className="mb-4">
              <Badge variant="default" className="mb-2">Secondary</Badge>
              <h3 className="text-2xl font-bold text-gray-900">{typography.secondary.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{typography.secondary.usage}</p>
            </div>

            <div className="space-y-2">
              {typography.secondary.weights.map((weight) => (
                <div key={weight} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{weight}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Aa</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Spacing Scale Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Spacing Scale</h2>

        <Card padding="lg">
          <div className="space-y-3">
            {spacingScale.map((space) => (
              <div key={space.name} className="flex items-center gap-6">
                <div className="w-16">
                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{space.name}</code>
                </div>
                <div
                  className="bg-gradient-to-r from-[#cd0931] to-[#a00727] h-6 rounded"
                  style={{ width: space.value }}
                />
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{space.value}</span>
                  <span className="text-gray-400">•</span>
                  <span>{space.pixels}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Usage Guidelines */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guidelines</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="lg" className="border-l-4 border-[#cd0931]">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              ✅ Do
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Use primary red (#cd0931) for CTAs and important actions</li>
              <li>• Maintain consistent spacing using the scale</li>
              <li>• Use Rethink Sans for all UI text</li>
              <li>• Ensure sufficient contrast (WCAG AA minimum)</li>
              <li>• Use gold (#f8ad16) for success states and highlights</li>
            </ul>
          </Card>

          <Card padding="lg" className="border-l-4 border-gray-400">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              ❌ Don't
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Don't use colors outside the palette</li>
              <li>• Don't use arbitrary spacing values</li>
              <li>• Don't mix font families arbitrarily</li>
              <li>• Don't use low-contrast color combinations</li>
              <li>• Don't override brand colors without approval</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Card padding="lg" className="bg-gradient-to-r from-[#f2f2f2] to-white">
          <h3 className="text-lg font-bold text-gray-900 mb-2">About GUDBRO Brand</h3>
          <p className="text-gray-700 mb-4">
            These brand guidelines are based on the official GUDBRO Brand Guidelines PDF.
            Consistent application ensures brand recognition and professional quality across all touchpoints.
          </p>
          <div className="text-sm text-gray-600">
            <strong className="text-gray-900">Source:</strong> Gudbro_BrandGuidelines.pdf (November 2025)
          </div>
        </Card>
      </div>
    </div>
  );
}
