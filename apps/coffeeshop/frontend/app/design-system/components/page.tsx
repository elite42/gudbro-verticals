'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';

export default function ComponentsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UI Components</h1>
        <p className="text-gray-600">
          Complete library of type-safe UI components with variants and examples
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card padding="md" className="text-center bg-gradient-to-br from-[#cd0931] to-[#a00727]">
          <div className="text-2xl font-bold text-white">5</div>
          <div className="text-sm text-white/90">Components</div>
        </Card>
        <Card padding="md" className="text-center bg-gradient-to-br from-[#f8ad16] to-[#f88d16]">
          <div className="text-2xl font-bold text-black">25+</div>
          <div className="text-sm text-black/90">Variants</div>
        </Card>
        <Card padding="md" className="text-center bg-gradient-to-br from-[#0931cd] to-[#072399]">
          <div className="text-2xl font-bold text-white">100%</div>
          <div className="text-sm text-white/90">Type-Safe</div>
        </Card>
        <Card padding="md" className="text-center bg-gradient-to-br from-[#333333] to-[#000000]">
          <div className="text-2xl font-bold text-white">CVA</div>
          <div className="text-sm text-white/90">Powered</div>
        </Card>
      </div>

      {/* Button Component */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Button</h2>
        <Card padding="lg">
          <h3 className="font-semibold text-gray-900 mb-4">Variants</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="outline">Outline</Button>
          </div>

          <h3 className="font-semibold text-gray-900 mb-4 mt-6">Sizes</h3>
          <div className="flex flex-wrap items-end gap-3 mb-6">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">Extra Large</Button>
          </div>

          <h3 className="font-semibold text-gray-900 mb-4 mt-6">States</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Default</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </Card>
      </div>

      {/* Card Component */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="default" padding="md">
            <h3 className="font-semibold text-gray-900 mb-2">Default</h3>
            <p className="text-sm text-gray-600">Standard card with border</p>
          </Card>
          <Card variant="elevated" padding="md">
            <h3 className="font-semibold text-gray-900 mb-2">Elevated</h3>
            <p className="text-sm text-gray-600">Card with shadow elevation</p>
          </Card>
          <Card variant="interactive" padding="md">
            <h3 className="font-semibold text-gray-900 mb-2">Interactive</h3>
            <p className="text-sm text-gray-600">Hover effects for clickable cards</p>
          </Card>
          <Card variant="selected" padding="md">
            <h3 className="font-semibold text-gray-900 mb-2">Selected</h3>
            <p className="text-sm text-gray-600">Active/selected state</p>
          </Card>
          <Card variant="ghost" padding="md">
            <h3 className="font-semibold text-gray-900 mb-2">Ghost</h3>
            <p className="text-sm text-gray-600">No border, subtle background</p>
          </Card>
        </div>
      </div>

      {/* Input Component */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Input & Textarea</h2>
        <Card padding="lg">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Input</label>
              <Input placeholder="Enter text..." inputSize="md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Error State</label>
              <Input placeholder="Invalid input" inputSize="md" variant="error" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Success State</label>
              <Input placeholder="Valid input" inputSize="md" variant="success" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ghost Input</label>
              <Input placeholder="Minimal style" inputSize="md" variant="ghost" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Textarea</label>
              <textarea
                placeholder="Enter multiline text..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Badge Component */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Badge</h2>
        <Card padding="lg">
          <h3 className="font-semibold text-gray-900 mb-4">Variants</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>

          <h3 className="font-semibold text-gray-900 mb-4 mt-6">Use Cases</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Status:</span>
              <Badge variant="success">Active</Badge>
              <Badge variant="danger">Inactive</Badge>
              <Badge variant="warning">Pending</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Categories:</span>
              <Badge variant="primary">Beverage</Badge>
              <Badge variant="secondary">Food</Badge>
              <Badge variant="info">Dessert</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Allergens:</span>
              <Badge variant="danger">Gluten</Badge>
              <Badge variant="danger">Dairy</Badge>
              <Badge variant="danger">Nuts</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Alert Component */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Alert</h2>
        <div className="space-y-4">
          <Alert variant="info">
            <strong>Info:</strong> This is an informational message.
          </Alert>
          <Alert variant="success">
            <strong>Success:</strong> Your action was completed successfully!
          </Alert>
          <Alert variant="warning">
            <strong>Warning:</strong> Please review this carefully before proceeding.
          </Alert>
          <Alert variant="danger">
            <strong>Error:</strong> Something went wrong. Please try again.
          </Alert>
          <Alert variant="default">
            <strong>Note:</strong> This is a neutral message.
          </Alert>
        </div>
      </div>

      {/* Usage Documentation */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage</h2>
        <Card padding="lg" className="bg-gray-900 text-gray-100">
          <h3 className="font-semibold mb-4 text-white">Import Components</h3>
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Button, Card, Input, Badge, Alert } from '@/components/ui';

// Button usage
<Button variant="primary" size="lg">Click Me</Button>

// Card usage
<Card variant="elevated" padding="lg">
  <h2>Card Title</h2>
  <p>Card content...</p>
</Card>

// Input usage
<Input placeholder="Enter text" inputSize="md" />

// Badge usage
<Badge variant="success">Active</Badge>

// Alert usage
<Alert variant="info">Information message</Alert>`}</code>
          </pre>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="lg" className="border-l-4 border-[#cd0931]">
            <h3 className="font-bold text-gray-900 mb-3">Benefits</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Type-safe with TypeScript autocomplete</li>
              <li>✅ Consistent styling across all pages</li>
              <li>✅ Single source of truth for UI</li>
              <li>✅ Easy to customize and extend</li>
              <li>✅ Accessibility built-in (WCAG AA)</li>
            </ul>
          </Card>

          <Card padding="lg" className="border-l-4 border-[#0931cd]">
            <h3 className="font-bold text-gray-900 mb-3">Documentation</h3>
            <p className="text-sm text-gray-700 mb-4">
              Complete documentation with examples, API reference, and best practices.
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
              components/ui/README.md
            </code>
          </Card>
        </div>
      </div>
    </div>
  );
}
