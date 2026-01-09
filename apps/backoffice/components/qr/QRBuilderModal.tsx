'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  QRType,
  QRContext,
  QRSource,
  WiFiSecurity,
  QRDesign,
  QRCode,
  CreateQRCodeInput,
  QRBuilderModalProps,
  DEFAULT_QR_DESIGN,
} from '@/lib/qr/qr-types';
import {
  validateWiFiConfig,
  validateURL,
  buildTableQRUrl,
  buildExternalQRUrl,
} from '@/lib/qr/qr-generator';
import { createQRCode, updateQRCode } from '@/lib/qr/qr-service';
import { QRPreview } from './QRPreview';
import { QRDesignPanel } from './QRDesignPanel';
import { QRExportPanel } from './QRExportPanel';
import { cn } from '@/lib/utils';
import {
  LinkIcon,
  WifiIcon,
  TableIcon,
  ShareIcon,
  PackageIcon,
  TruckIcon,
  ChevronLeftIcon,
  CheckIcon,
  Loader2Icon,
  PaletteIcon,
} from 'lucide-react';

type Step = 'type' | 'details' | 'design' | 'export';

const STEPS: Step[] = ['type', 'details', 'design', 'export'];

const QR_TYPES: { value: QRType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'url',
    label: 'URL / Link',
    description: 'Link to your menu, social media, or any URL',
    icon: <LinkIcon className="h-6 w-6" />,
  },
  {
    value: 'wifi',
    label: 'WiFi Network',
    description: 'Let customers connect to your WiFi easily',
    icon: <WifiIcon className="h-6 w-6" />,
  },
];

const CONTEXT_OPTIONS: {
  value: QRContext;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'table',
    label: 'Table',
    description: 'QR code for a specific table',
    icon: <TableIcon className="h-5 w-5" />,
  },
  {
    value: 'external',
    label: 'Marketing',
    description: 'For social media, flyers, events',
    icon: <ShareIcon className="h-5 w-5" />,
  },
  {
    value: 'takeaway',
    label: 'Takeaway',
    description: 'For takeaway packaging',
    icon: <PackageIcon className="h-5 w-5" />,
  },
  {
    value: 'delivery',
    label: 'Delivery',
    description: 'For delivery packaging',
    icon: <TruckIcon className="h-5 w-5" />,
  },
];

const SOURCE_OPTIONS: { value: QRSource; label: string }[] = [
  { value: 'google_maps', label: 'Google Maps' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tripadvisor', label: 'TripAdvisor' },
  { value: 'flyer', label: 'Flyer / Print' },
  { value: 'event', label: 'Event' },
  { value: 'website', label: 'Website' },
  { value: 'email', label: 'Email' },
  { value: 'other', label: 'Other' },
];

const WIFI_SECURITY_OPTIONS: { value: WiFiSecurity; label: string }[] = [
  { value: 'WPA', label: 'WPA/WPA2/WPA3' },
  { value: 'WEP', label: 'WEP (legacy)' },
  { value: 'nopass', label: 'Open (no password)' },
];

interface FormState {
  type: QRType;
  // URL fields
  context: QRContext | null;
  source: QRSource | null;
  destinationUrl: string;
  tableNumber: number | null;
  useShortUrl: boolean;
  // WiFi fields
  wifiSsid: string;
  wifiPassword: string;
  wifiSecurity: WiFiSecurity;
  wifiHidden: boolean;
  // Common fields
  title: string;
  description: string;
  design: QRDesign;
}

const initialFormState: FormState = {
  type: 'url',
  context: null,
  source: null,
  destinationUrl: '',
  tableNumber: null,
  useShortUrl: true,
  wifiSsid: '',
  wifiPassword: '',
  wifiSecurity: 'WPA',
  wifiHidden: false,
  title: '',
  description: '',
  design: DEFAULT_QR_DESIGN,
};

// Fallback for development when no merchant is provided
const DEFAULT_MERCHANT_ID = '00000000-0000-0000-0000-000000000001';
const DEFAULT_MERCHANT_SLUG = 'demo-merchant';

export function QRBuilderModal({
  open,
  onClose,
  merchantId: propMerchantId,
  merchantSlug: propMerchantSlug,
  defaultType,
  defaultContext,
  defaultSource,
  tableNumber: presetTableNumber,
  _eventId,
  editQRCode,
  onComplete,
}: QRBuilderModalProps) {
  const [step, setStep] = useState<Step>('type');
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdQR, setCreatedQR] = useState<QRCode | null>(null);

  // Use props with fallback for development
  const merchantId = propMerchantId || DEFAULT_MERCHANT_ID;
  const merchantSlug = propMerchantSlug || DEFAULT_MERCHANT_SLUG;
  const baseMenuUrl = 'https://menu.gudbro.com';

  // Initialize form with defaults or edit data
  useEffect(() => {
    if (open) {
      if (editQRCode) {
        setForm({
          type: editQRCode.type,
          context: editQRCode.context || null,
          source: editQRCode.source || null,
          destinationUrl: editQRCode.destination_url || '',
          tableNumber: editQRCode.table_number || null,
          useShortUrl: editQRCode.use_short_url,
          wifiSsid: editQRCode.wifi_ssid || '',
          wifiPassword: editQRCode.wifi_password || '',
          wifiSecurity: editQRCode.wifi_security || 'WPA',
          wifiHidden: editQRCode.wifi_hidden || false,
          title: editQRCode.title || '',
          description: editQRCode.description || '',
          design: editQRCode.design || DEFAULT_QR_DESIGN,
        });
        setStep('details');
      } else {
        setForm({
          ...initialFormState,
          type: defaultType || 'url',
          context: defaultContext || null,
          source: defaultSource || null,
          tableNumber: presetTableNumber || null,
        });
        setStep(defaultType ? 'details' : 'type');
      }
      setCreatedQR(null);
      setErrors({});
    }
  }, [open, editQRCode, defaultType, defaultContext, defaultSource, presetTableNumber]);

  // Build preview content
  const getPreviewContent = (): string => {
    if (form.type === 'wifi') {
      if (!form.wifiSsid) return '';
      return `WIFI:T:${form.wifiSecurity};S:${form.wifiSsid};P:${form.wifiPassword};H:${form.wifiHidden};;`;
    }

    if (form.context === 'table' && form.tableNumber) {
      return buildTableQRUrl(merchantSlug, form.tableNumber, baseMenuUrl);
    }

    if (form.destinationUrl) {
      return form.destinationUrl;
    }

    if (form.source) {
      return buildExternalQRUrl(merchantSlug, form.source, baseMenuUrl);
    }

    return '';
  };

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'details') {
      if (form.type === 'url') {
        if (form.context === 'table' && !form.tableNumber) {
          newErrors.tableNumber = 'Table number is required';
        }
        if (form.context !== 'table' && !form.destinationUrl) {
          // Auto-generate URL for external contexts
          if (!form.source) {
            newErrors.destinationUrl = 'Please select a source or enter a URL';
          }
        }
        if (form.destinationUrl) {
          const urlValidation = validateURL(form.destinationUrl);
          if (!urlValidation.valid) {
            newErrors.destinationUrl = urlValidation.error || 'Invalid URL';
          }
        }
      } else if (form.type === 'wifi') {
        const wifiValidation = validateWiFiConfig({
          ssid: form.wifiSsid,
          password: form.wifiPassword,
          security: form.wifiSecurity,
        });
        if (!wifiValidation.valid) {
          wifiValidation.errors.forEach((err, index) => {
            newErrors[`wifi_${index}`] = err;
          });
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    const currentIndex = STEPS.indexOf(step);
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.indexOf(step);
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1]);
    }
  };

  const handleSave = async () => {
    if (!validateStep('details')) return;

    setIsSubmitting(true);
    try {
      // Build destination URL if not explicitly set
      let destinationUrl = form.destinationUrl;
      if (form.type === 'url' && !destinationUrl) {
        if (form.context === 'table' && form.tableNumber) {
          destinationUrl = buildTableQRUrl(merchantSlug, form.tableNumber, baseMenuUrl);
        } else if (form.source) {
          destinationUrl = buildExternalQRUrl(merchantSlug, form.source, baseMenuUrl);
        }
      }

      const input: CreateQRCodeInput = {
        type: form.type,
        destination_url: form.type === 'url' ? destinationUrl : undefined,
        use_short_url: form.useShortUrl,
        context: form.context || undefined,
        source: form.source || undefined,
        table_number: form.tableNumber || undefined,
        wifi_ssid: form.type === 'wifi' ? form.wifiSsid : undefined,
        wifi_password: form.type === 'wifi' ? form.wifiPassword : undefined,
        wifi_security: form.type === 'wifi' ? form.wifiSecurity : undefined,
        wifi_hidden: form.type === 'wifi' ? form.wifiHidden : undefined,
        title: form.title || (form.context === 'table' ? `Table ${form.tableNumber}` : undefined),
        description: form.description || undefined,
        design: form.design,
      };

      let result: QRCode;
      if (editQRCode) {
        result = await updateQRCode(editQRCode.id, {
          title: input.title,
          description: input.description,
          design: input.design,
          destination_url: input.destination_url,
          source: input.source,
          wifi_ssid: input.wifi_ssid,
          wifi_password: input.wifi_password,
          wifi_security: input.wifi_security,
          wifi_hidden: input.wifi_hidden,
        });
      } else {
        result = await createQRCode(merchantId, input);
      }

      setCreatedQR(result);
      setStep('export');

      if (onComplete) {
        onComplete(result);
      }
    } catch (error) {
      console.error('Failed to save QR code:', error);
      setErrors({ submit: 'Failed to save QR code. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepIndex = STEPS.indexOf(step);
  const previewContent = getPreviewContent();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editQRCode ? 'Edit QR Code' : 'Create QR Code'}</DialogTitle>
          <DialogDescription>
            {step === 'type' && 'Select the type of QR code you want to create'}
            {step === 'details' && 'Configure your QR code settings'}
            {step === 'design' && 'Customize the look of your QR code'}
            {step === 'export' && 'Download your QR code'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 py-4">
          {STEPS.map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  index < currentStepIndex
                    ? 'bg-green-500 text-white'
                    : index === currentStepIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                )}
              >
                {index < currentStepIndex ? <CheckIcon className="h-4 w-4" /> : index + 1}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-1 h-0.5 w-12',
                    index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] py-4">
          {/* Step 1: Type Selection */}
          {step === 'type' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {QR_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setForm({ ...form, type: type.value });
                      handleNext();
                    }}
                    className={cn(
                      'rounded-lg border-2 p-6 text-left transition-all hover:border-blue-300 hover:bg-blue-50',
                      form.type === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    )}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 p-2 text-blue-600">{type.icon}</div>
                      <span className="font-semibold">{type.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Form Section */}
              <div className="space-y-4">
                {form.type === 'url' ? (
                  <>
                    {/* Context Selection */}
                    <div className="space-y-2">
                      <Label>Where will this QR be used?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {CONTEXT_OPTIONS.map((ctx) => (
                          <button
                            key={ctx.value}
                            onClick={() => setForm({ ...form, context: ctx.value })}
                            className={cn(
                              'rounded-lg border p-3 text-left transition-all',
                              form.context === ctx.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            <div className="mb-1 flex items-center gap-2">
                              {ctx.icon}
                              <span className="text-sm font-medium">{ctx.label}</span>
                            </div>
                            <p className="text-xs text-gray-500">{ctx.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Table Number */}
                    {form.context === 'table' && (
                      <div className="space-y-2">
                        <Label htmlFor="tableNumber">Table Number</Label>
                        <Input
                          id="tableNumber"
                          type="number"
                          min={1}
                          value={form.tableNumber || ''}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              tableNumber: parseInt(e.target.value) || null,
                            })
                          }
                          placeholder="e.g., 5"
                        />
                        {errors.tableNumber && (
                          <p className="text-sm text-red-500">{errors.tableNumber}</p>
                        )}
                      </div>
                    )}

                    {/* Source Selection (for external/marketing) */}
                    {form.context === 'external' && (
                      <div className="space-y-2">
                        <Label>Traffic Source</Label>
                        <div className="flex flex-wrap gap-2">
                          {SOURCE_OPTIONS.map((src) => (
                            <button
                              key={src.value}
                              onClick={() => setForm({ ...form, source: src.value })}
                              className={cn(
                                'rounded-full border px-3 py-1.5 text-sm transition-colors',
                                form.source === src.value
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              )}
                            >
                              {src.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom URL (optional for external) */}
                    {form.context !== 'table' && (
                      <div className="space-y-2">
                        <Label htmlFor="destinationUrl">Custom URL (optional)</Label>
                        <Input
                          id="destinationUrl"
                          type="url"
                          value={form.destinationUrl}
                          onChange={(e) => setForm({ ...form, destinationUrl: e.target.value })}
                          placeholder="https://..."
                        />
                        {errors.destinationUrl && (
                          <p className="text-sm text-red-500">{errors.destinationUrl}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          Leave empty to use default menu link with tracking
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  /* WiFi Form */
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="wifiSsid">Network Name (SSID)</Label>
                      <Input
                        id="wifiSsid"
                        value={form.wifiSsid}
                        onChange={(e) => setForm({ ...form, wifiSsid: e.target.value })}
                        placeholder="Your WiFi network name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wifiSecurity">Security Type</Label>
                      <div className="flex gap-2">
                        {WIFI_SECURITY_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setForm({ ...form, wifiSecurity: opt.value })}
                            className={cn(
                              'flex-1 rounded-lg border px-3 py-2 text-sm transition-colors',
                              form.wifiSecurity === opt.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {form.wifiSecurity !== 'nopass' && (
                      <div className="space-y-2">
                        <Label htmlFor="wifiPassword">Password</Label>
                        <Input
                          id="wifiPassword"
                          type="password"
                          value={form.wifiPassword}
                          onChange={(e) => setForm({ ...form, wifiPassword: e.target.value })}
                          placeholder="WiFi password"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="wifiHidden"
                        checked={form.wifiHidden}
                        onChange={(e) => setForm({ ...form, wifiHidden: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="wifiHidden" className="text-sm">
                        Hidden network
                      </Label>
                    </div>

                    {Object.entries(errors)
                      .filter(([key]) => key.startsWith('wifi_'))
                      .map(([key, value]) => (
                        <p key={key} className="text-sm text-red-500">
                          {value}
                        </p>
                      ))}
                  </>
                )}

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Table 5, Instagram QR"
                  />
                </div>
              </div>

              {/* Preview Section */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4">
                <QRPreview content={previewContent} design={form.design} size={180} showContent />
                <p className="mt-4 text-center text-sm text-gray-600">Live Preview</p>
              </div>
            </div>
          )}

          {/* Step 3: Design */}
          {step === 'design' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <QRDesignPanel
                design={form.design}
                onChange={(design) => setForm({ ...form, design })}
              />
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4">
                <QRPreview content={previewContent} design={form.design} size={200} />
              </div>
            </div>
          )}

          {/* Step 4: Export */}
          {step === 'export' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-4">
                <QRPreview content={previewContent} design={form.design} size={200} />
                {createdQR && (
                  <div className="mt-4 text-center">
                    <p className="font-medium text-green-600">QR Code Created!</p>
                    {createdQR.short_code && (
                      <p className="text-sm text-gray-500">
                        Short URL: go.gudbro.com/{createdQR.short_code}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <QRExportPanel
                content={previewContent}
                design={form.design}
                filename={form.title?.toLowerCase().replace(/\s+/g, '-') || 'qr-code'}
              />
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <p className="mt-4 text-center text-sm text-red-500">{errors.submit}</p>
          )}
        </div>

        <DialogFooter className="gap-2">
          {step !== 'type' && step !== 'export' && (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}

          {step === 'details' && (
            <>
              <Button variant="outline" onClick={handleNext}>
                <PaletteIcon className="mr-2 h-4 w-4" />
                Customize Design
              </Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckIcon className="mr-2 h-4 w-4" />
                )}
                {editQRCode ? 'Update' : 'Create'} QR Code
              </Button>
            </>
          )}

          {step === 'design' && (
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckIcon className="mr-2 h-4 w-4" />
              )}
              {editQRCode ? 'Update' : 'Create'} QR Code
            </Button>
          )}

          {step === 'export' && <Button onClick={onClose}>Done</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
