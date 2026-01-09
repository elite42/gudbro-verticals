'use client';

import { useState } from 'react';
import { ExportFormat, MaterialPreset, EXPORT_PRESETS, QRDesign } from '@/lib/qr/qr-types';
import { exportQRCode } from '@/lib/qr/qr-generator';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DownloadIcon, PrinterIcon, ImageIcon, FileIcon } from 'lucide-react';

interface QRExportPanelProps {
  content: string;
  design: QRDesign;
  filename?: string;
  className?: string;
}

const MATERIAL_OPTIONS: {
  value: MaterialPreset;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'paper',
    label: 'Paper / Flyer',
    description: 'PDF, 300dpi, CMYK',
    icon: <FileIcon className="h-5 w-5" />,
  },
  {
    value: 'tent-card',
    label: 'Tent Card',
    description: 'PDF with bleed',
    icon: <PrinterIcon className="h-5 w-5" />,
  },
  {
    value: 'sticker',
    label: 'Sticker',
    description: 'SVG, cut-ready',
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    value: 'menu',
    label: 'Menu',
    description: 'PDF, high quality',
    icon: <FileIcon className="h-5 w-5" />,
  },
  {
    value: 'tshirt',
    label: 'T-Shirt',
    description: 'SVG, transparent',
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    value: 'banner',
    label: 'Banner / Poster',
    description: 'SVG, scalable',
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    value: 'business-card',
    label: 'Business Card',
    description: 'PNG HD, small',
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    value: 'newspaper',
    label: 'Newspaper',
    description: 'PDF, grayscale',
    icon: <FileIcon className="h-5 w-5" />,
  },
];

const FORMAT_OPTIONS: {
  value: ExportFormat;
  label: string;
  description: string;
}[] = [
  { value: 'png', label: 'PNG', description: 'Standard (512px)' },
  { value: 'png-hd', label: 'PNG HD', description: 'Print quality (2048px)' },
  { value: 'svg', label: 'SVG', description: 'Vector, scalable' },
  { value: 'pdf', label: 'PDF', description: 'Print-ready' },
];

export function QRExportPanel({
  content,
  design,
  filename = 'qr-code',
  className,
}: QRExportPanelProps) {
  const [selectedPreset, setSelectedPreset] = useState<MaterialPreset | null>(null);
  const [_selectedFormat, _setSelectedFormat] = useState<ExportFormat>('png');
  const [isExporting, setIsExporting] = useState(false);
  const [mode, setMode] = useState<'quick' | 'preset'>('quick');

  const handleQuickDownload = async (format: ExportFormat) => {
    setIsExporting(true);
    try {
      const result = await exportQRCode(content, { format, design });
      downloadFile(result.data, result.mimeType, `${filename}.${getExtension(format)}`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePresetDownload = async () => {
    if (!selectedPreset) return;

    setIsExporting(true);
    try {
      const presetConfig = EXPORT_PRESETS[selectedPreset];
      const result = await exportQRCode(content, { ...presetConfig, design });
      downloadFile(
        result.data,
        result.mimeType,
        `${filename}-${selectedPreset}.${getExtension(presetConfig.format)}`
      );
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const downloadFile = (data: string, mimeType: string, filename: string) => {
    const blob = data.startsWith('data:')
      ? dataURLtoBlob(data)
      : new Blob([data], { type: mimeType });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const getExtension = (format: ExportFormat): string => {
    switch (format) {
      case 'png':
      case 'png-hd':
        return 'png';
      case 'svg':
        return 'svg';
      case 'pdf':
        return 'svg'; // We export SVG for PDF until jsPDF is added
      default:
        return 'png';
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Mode Toggle */}
      <div className="flex rounded-lg border bg-gray-50 p-1">
        <button
          onClick={() => setMode('quick')}
          className={cn(
            'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
            mode === 'quick' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
          )}
        >
          Quick Export
        </button>
        <button
          onClick={() => setMode('preset')}
          className={cn(
            'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
            mode === 'preset'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          For Printing
        </button>
      </div>

      {mode === 'quick' ? (
        /* Quick Export Mode */
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Download your QR code in common formats</p>
          <div className="grid grid-cols-2 gap-3">
            {FORMAT_OPTIONS.map((format) => (
              <Button
                key={format.value}
                variant="outline"
                className="flex h-auto flex-col items-start py-3"
                onClick={() => handleQuickDownload(format.value)}
                disabled={isExporting}
              >
                <span className="font-medium">{format.label}</span>
                <span className="text-xs text-gray-500">{format.description}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        /* Preset Mode */
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Where will you print this?</Label>
            <div className="grid grid-cols-2 gap-2">
              {MATERIAL_OPTIONS.map((material) => (
                <button
                  key={material.value}
                  onClick={() => setSelectedPreset(material.value)}
                  className={cn(
                    'rounded-lg border p-3 text-left transition-all',
                    selectedPreset === material.value
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <div className="mb-1 flex items-center gap-2">
                    {material.icon}
                    <span className="text-sm font-medium">{material.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{material.description}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedPreset && (
            <div className="border-t pt-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {MATERIAL_OPTIONS.find((m) => m.value === selectedPreset)?.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    Optimized for{' '}
                    {MATERIAL_OPTIONS.find(
                      (m) => m.value === selectedPreset
                    )?.description.toLowerCase()}
                  </p>
                </div>
              </div>
              <Button onClick={handlePresetDownload} disabled={isExporting} className="w-full">
                <DownloadIcon className="mr-2 h-4 w-4" />
                {isExporting ? 'Preparing...' : 'Download for Print'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="space-y-1 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
        <p className="font-medium">Tips for printing:</p>
        <ul className="list-inside list-disc space-y-0.5">
          <li>Keep QR code at least 2x2 cm for reliable scanning</li>
          <li>Ensure high contrast between colors</li>
          <li>Test scanning before mass printing</li>
        </ul>
      </div>
    </div>
  );
}
