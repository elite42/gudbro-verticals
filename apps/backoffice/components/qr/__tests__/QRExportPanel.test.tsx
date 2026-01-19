import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QRExportPanel } from '../QRExportPanel';
import { DEFAULT_QR_DESIGN, EXPORT_PRESETS } from '@/lib/qr/qr-types';
import { exportQRCode } from '@/lib/qr/qr-generator';

// Mock qr-generator exports
vi.mock('@/lib/qr/qr-generator', () => ({
  exportQRCode: vi.fn().mockResolvedValue({
    data: 'data:image/png;base64,mockBase64Data',
    mimeType: 'image/png',
    filename: 'qr-code.png',
  }),
  getRecommendedSize: vi.fn().mockReturnValue(512),
  SIZE_PRESETS: { small: 256, medium: 512, large: 1024 },
}));

// Mock link element for download tracking
const mockLinkClick = vi.fn();
let lastCreatedLink: { href: string; download: string; click: () => void } | null = null;

describe('QRExportPanel', () => {
  const defaultProps = {
    content: 'https://example.com',
    design: DEFAULT_QR_DESIGN,
  };

  // Store original methods
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    vi.clearAllMocks();
    lastCreatedLink = null;
    mockLinkClick.mockClear();

    // Mock URL.createObjectURL and URL.revokeObjectURL
    URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
    URL.revokeObjectURL = vi.fn();

    // Override createElement to track anchor element creation
    document.createElement = vi.fn((tagName: string) => {
      const element = originalCreateElement(tagName);
      if (tagName === 'a') {
        // Track the anchor element
        const _originalClick = element.click.bind(element);
        element.click = () => {
          mockLinkClick();
          lastCreatedLink = {
            href: element.getAttribute('href') || (element as HTMLAnchorElement).href,
            download: (element as HTMLAnchorElement).download,
            click: mockLinkClick,
          };
        };
      }
      return element;
    }) as typeof document.createElement;
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    document.createElement = originalCreateElement;
  });

  // Helper to get the last download info
  const getLastDownloadInfo = () => lastCreatedLink;

  // ====================================
  // RENDER TESTS
  // ====================================
  describe('Initial Render', () => {
    it('should render mode toggle with Quick Export and For Printing buttons', () => {
      render(<QRExportPanel {...defaultProps} />);

      expect(screen.getByText('Quick Export')).toBeInTheDocument();
      expect(screen.getByText('For Printing')).toBeInTheDocument();
    });

    it('should default to quick export mode', () => {
      render(<QRExportPanel {...defaultProps} />);

      // Quick Export button should be styled as active (has shadow class)
      const quickExportBtn = screen.getByText('Quick Export');
      expect(quickExportBtn.className).toContain('shadow');
    });

    it('should show 4 format buttons in quick mode (PNG, PNG HD, SVG, PDF)', () => {
      render(<QRExportPanel {...defaultProps} />);

      expect(screen.getByText('PNG')).toBeInTheDocument();
      expect(screen.getByText('PNG HD')).toBeInTheDocument();
      expect(screen.getByText('SVG')).toBeInTheDocument();
      expect(screen.getByText('PDF')).toBeInTheDocument();
    });

    it('should show format descriptions', () => {
      render(<QRExportPanel {...defaultProps} />);

      expect(screen.getByText('Standard (512px)')).toBeInTheDocument();
      expect(screen.getByText('Print quality (2048px)')).toBeInTheDocument();
      expect(screen.getByText('Vector, scalable')).toBeInTheDocument();
      expect(screen.getByText('Print-ready')).toBeInTheDocument();
    });

    it('should show printing tips section', () => {
      render(<QRExportPanel {...defaultProps} />);

      expect(screen.getByText('Tips for printing:')).toBeInTheDocument();
      expect(screen.getByText(/Keep QR code at least 2x2 cm/)).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<QRExportPanel {...defaultProps} className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  // ====================================
  // QUICK EXPORT MODE TESTS
  // ====================================
  describe('Quick Export Mode', () => {
    it('should call exportQRCode with format "png" when clicking PNG button', async () => {
      render(<QRExportPanel {...defaultProps} />);

      const pngButton = screen.getByText('PNG').closest('button')!;
      fireEvent.click(pngButton);

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith('https://example.com', {
          format: 'png',
          design: DEFAULT_QR_DESIGN,
        });
      });
    });

    it('should call exportQRCode with format "png-hd" when clicking PNG HD button', async () => {
      render(<QRExportPanel {...defaultProps} />);

      const pngHdButton = screen.getByText('PNG HD').closest('button')!;
      fireEvent.click(pngHdButton);

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith('https://example.com', {
          format: 'png-hd',
          design: DEFAULT_QR_DESIGN,
        });
      });
    });

    it('should call exportQRCode with format "svg" when clicking SVG button', async () => {
      render(<QRExportPanel {...defaultProps} />);

      const svgButton = screen.getByText('SVG').closest('button')!;
      fireEvent.click(svgButton);

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith('https://example.com', {
          format: 'svg',
          design: DEFAULT_QR_DESIGN,
        });
      });
    });

    it('should call exportQRCode with format "pdf" when clicking PDF button', async () => {
      render(<QRExportPanel {...defaultProps} />);

      const pdfButton = screen.getByText('PDF').closest('button')!;
      fireEvent.click(pdfButton);

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith('https://example.com', {
          format: 'pdf',
          design: DEFAULT_QR_DESIGN,
        });
      });
    });

    it('should disable buttons during export (isExporting)', async () => {
      // Make exportQRCode return a promise that doesn't resolve immediately
      let resolveExport: (value: unknown) => void;
      (exportQRCode as Mock).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveExport = resolve;
          })
      );

      render(<QRExportPanel {...defaultProps} />);

      const pngButton = screen.getByText('PNG').closest('button')!;
      fireEvent.click(pngButton);

      // Check that all format buttons are disabled during export
      await waitFor(() => {
        const allButtons = screen.getAllByRole('button');
        const formatButtons = allButtons.filter((btn) => {
          const text = btn.textContent || '';
          return text.includes('PNG') || text.includes('SVG') || text.includes('PDF');
        });

        formatButtons.forEach((btn) => {
          expect(btn).toBeDisabled();
        });
      });

      // Resolve the export
      resolveExport!({
        data: 'data:image/png;base64,mock',
        mimeType: 'image/png',
        filename: 'qr-code.png',
      });

      // Buttons should be enabled again
      await waitFor(() => {
        const pngBtn = screen.getByText('PNG').closest('button');
        expect(pngBtn).not.toBeDisabled();
      });
    });

    it('should use custom filename when provided', async () => {
      render(<QRExportPanel {...defaultProps} filename="my-custom-qr" />);

      const pngButton = screen.getByText('PNG').closest('button')!;
      fireEvent.click(pngButton);

      await waitFor(() => {
        const downloadInfo = getLastDownloadInfo();
        expect(downloadInfo?.download).toBe('my-custom-qr.png');
      });
    });
  });

  // ====================================
  // PRESET MODE TESTS
  // ====================================
  describe('Preset Mode', () => {
    it('should switch to preset mode when clicking "For Printing"', () => {
      render(<QRExportPanel {...defaultProps} />);

      const forPrintingBtn = screen.getByText('For Printing');
      fireEvent.click(forPrintingBtn);

      // Should show "Where will you print this?"
      expect(screen.getByText('Where will you print this?')).toBeInTheDocument();
    });

    it('should show 8 material options in preset mode', () => {
      render(<QRExportPanel {...defaultProps} />);

      const forPrintingBtn = screen.getByText('For Printing');
      fireEvent.click(forPrintingBtn);

      expect(screen.getByText('Paper / Flyer')).toBeInTheDocument();
      expect(screen.getByText('Tent Card')).toBeInTheDocument();
      expect(screen.getByText('Sticker')).toBeInTheDocument();
      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByText('T-Shirt')).toBeInTheDocument();
      expect(screen.getByText('Banner / Poster')).toBeInTheDocument();
      expect(screen.getByText('Business Card')).toBeInTheDocument();
      expect(screen.getByText('Newspaper')).toBeInTheDocument();
    });

    it('should show material descriptions', () => {
      render(<QRExportPanel {...defaultProps} />);

      const forPrintingBtn = screen.getByText('For Printing');
      fireEvent.click(forPrintingBtn);

      expect(screen.getByText('PDF, 300dpi, CMYK')).toBeInTheDocument();
      expect(screen.getByText('SVG, cut-ready')).toBeInTheDocument();
      expect(screen.getByText('SVG, transparent')).toBeInTheDocument();
    });

    it('should highlight selected material and show download button', () => {
      render(<QRExportPanel {...defaultProps} />);

      const forPrintingBtn = screen.getByText('For Printing');
      fireEvent.click(forPrintingBtn);

      const paperOption = screen.getByText('Paper / Flyer').closest('button')!;
      fireEvent.click(paperOption);

      // Should show download button
      expect(screen.getByText('Download for Print')).toBeInTheDocument();

      // Should show selected material info (case insensitive check)
      expect(screen.getByText(/optimized for/i)).toBeInTheDocument();
    });

    it('should call exportQRCode with preset config when clicking download', async () => {
      render(<QRExportPanel {...defaultProps} />);

      // Switch to preset mode
      fireEvent.click(screen.getByText('For Printing'));

      // Select "Paper / Flyer"
      fireEvent.click(screen.getByText('Paper / Flyer').closest('button')!);

      // Click download
      fireEvent.click(screen.getByText('Download for Print'));

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith('https://example.com', {
          ...EXPORT_PRESETS.paper,
          design: DEFAULT_QR_DESIGN,
        });
      });
    });

    it('should call exportQRCode with sticker preset when sticker selected', async () => {
      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('For Printing'));
      fireEvent.click(screen.getByText('Sticker').closest('button')!);
      fireEvent.click(screen.getByText('Download for Print'));

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith('https://example.com', {
          ...EXPORT_PRESETS.sticker,
          design: DEFAULT_QR_DESIGN,
        });
      });
    });

    it('should show "Preparing..." during preset export', async () => {
      let resolveExport: (value: unknown) => void;
      (exportQRCode as Mock).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveExport = resolve;
          })
      );

      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('For Printing'));
      fireEvent.click(screen.getByText('Paper / Flyer').closest('button')!);
      fireEvent.click(screen.getByText('Download for Print'));

      await waitFor(() => {
        expect(screen.getByText('Preparing...')).toBeInTheDocument();
      });

      resolveExport!({
        data: 'data:image/png;base64,mock',
        mimeType: 'image/png',
        filename: 'qr-code.png',
      });

      await waitFor(() => {
        expect(screen.getByText('Download for Print')).toBeInTheDocument();
      });
    });

    it('should not show download button when no material selected', () => {
      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('For Printing'));

      expect(screen.queryByText('Download for Print')).not.toBeInTheDocument();
    });

    it('should use correct filename with preset suffix', async () => {
      render(<QRExportPanel {...defaultProps} filename="restaurant-qr" />);

      fireEvent.click(screen.getByText('For Printing'));
      fireEvent.click(screen.getByText('T-Shirt').closest('button')!);
      fireEvent.click(screen.getByText('Download for Print'));

      await waitFor(() => {
        const downloadInfo = getLastDownloadInfo();
        // T-shirt preset uses SVG format
        expect(downloadInfo?.download).toBe('restaurant-qr-tshirt.svg');
      });
    });
  });

  // ====================================
  // DOWNLOAD LOGIC TESTS
  // ====================================
  describe('Download Logic', () => {
    it('should create blob URL and trigger download for PNG', async () => {
      render(<QRExportPanel {...defaultProps} />);

      const pngButton = screen.getByText('PNG').closest('button')!;
      fireEvent.click(pngButton);

      await waitFor(() => {
        expect(URL.createObjectURL).toHaveBeenCalled();
        expect(mockLinkClick).toHaveBeenCalled();
        expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
      });
    });

    it('should set correct download filename for PNG', async () => {
      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('PNG').closest('button')!);

      await waitFor(() => {
        const downloadInfo = getLastDownloadInfo();
        expect(downloadInfo?.download).toBe('qr-code.png');
      });
    });

    it('should set correct download filename for SVG', async () => {
      (exportQRCode as Mock).mockResolvedValueOnce({
        data: '<svg>...</svg>',
        mimeType: 'image/svg+xml',
        filename: 'qr-code.svg',
      });

      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('SVG').closest('button')!);

      await waitFor(() => {
        const downloadInfo = getLastDownloadInfo();
        expect(downloadInfo?.download).toBe('qr-code.svg');
      });
    });

    it('should set correct download filename for PDF (currently SVG)', async () => {
      // Note: PDF currently exports as SVG until jsPDF is added
      (exportQRCode as Mock).mockResolvedValueOnce({
        data: '<svg>...</svg>',
        mimeType: 'image/svg+xml',
        filename: 'qr-code.svg',
      });

      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('PDF').closest('button')!);

      await waitFor(() => {
        const downloadInfo = getLastDownloadInfo();
        // PDF format uses .pdf extension
        expect(downloadInfo?.download).toBe('qr-code.pdf');
      });
    });

    it('should handle export error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (exportQRCode as Mock).mockRejectedValueOnce(new Error('Export failed'));

      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('PNG').closest('button')!);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Export failed:', expect.any(Error));
      });

      // Component should recover - buttons should be enabled again
      await waitFor(() => {
        const pngBtn = screen.getByText('PNG').closest('button');
        expect(pngBtn).not.toBeDisabled();
      });

      consoleSpy.mockRestore();
    });

    it('should trigger link click for download', async () => {
      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('PNG').closest('button')!);

      await waitFor(() => {
        expect(mockLinkClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ====================================
  // MODE SWITCHING TESTS
  // ====================================
  describe('Mode Switching', () => {
    it('should switch between quick and preset modes', () => {
      render(<QRExportPanel {...defaultProps} />);

      // Start in quick mode
      expect(screen.getByText('Standard (512px)')).toBeInTheDocument();

      // Switch to preset mode
      fireEvent.click(screen.getByText('For Printing'));
      expect(screen.getByText('Where will you print this?')).toBeInTheDocument();
      expect(screen.queryByText('Standard (512px)')).not.toBeInTheDocument();

      // Switch back to quick mode
      fireEvent.click(screen.getByText('Quick Export'));
      expect(screen.getByText('Standard (512px)')).toBeInTheDocument();
      expect(screen.queryByText('Where will you print this?')).not.toBeInTheDocument();
    });

    it('should preserve selected preset when switching modes and back', () => {
      render(<QRExportPanel {...defaultProps} />);

      // Go to preset mode and select
      fireEvent.click(screen.getByText('For Printing'));
      fireEvent.click(screen.getByText('Paper / Flyer').closest('button')!);
      expect(screen.getByText('Download for Print')).toBeInTheDocument();

      // Switch to quick mode
      fireEvent.click(screen.getByText('Quick Export'));

      // Switch back - selection should persist (component maintains state)
      fireEvent.click(screen.getByText('For Printing'));
      expect(screen.getByText('Download for Print')).toBeInTheDocument();
    });
  });

  // ====================================
  // PROPS TESTS
  // ====================================
  describe('Props Handling', () => {
    it('should use provided content for export', async () => {
      render(<QRExportPanel {...defaultProps} content="https://custom-url.com/menu" />);

      fireEvent.click(screen.getByText('PNG').closest('button')!);

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith(
          'https://custom-url.com/menu',
          expect.any(Object)
        );
      });
    });

    it('should use provided design for export', async () => {
      const customDesign = {
        colors: {
          foreground: '#FF0000',
          background: '#00FF00',
        },
        pattern: 'dots' as const,
      };

      render(<QRExportPanel {...defaultProps} design={customDesign} />);

      fireEvent.click(screen.getByText('PNG').closest('button')!);

      await waitFor(() => {
        expect(exportQRCode).toHaveBeenCalledWith('https://example.com', {
          format: 'png',
          design: customDesign,
        });
      });
    });

    it('should use default filename "qr-code" when not provided', async () => {
      render(<QRExportPanel content="https://test.com" design={DEFAULT_QR_DESIGN} />);

      fireEvent.click(screen.getByText('PNG').closest('button')!);

      await waitFor(() => {
        const downloadInfo = getLastDownloadInfo();
        expect(downloadInfo?.download).toBe('qr-code.png');
      });
    });
  });

  // ====================================
  // MATERIAL SELECTION VISUAL TESTS
  // ====================================
  describe('Material Selection Visuals', () => {
    it('should apply selected styles to chosen material', () => {
      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('For Printing'));

      const paperOption = screen.getByText('Paper / Flyer').closest('button')!;
      fireEvent.click(paperOption);

      // Check for selected styling (border-blue-500)
      expect(paperOption.className).toContain('border-blue-500');
    });

    it('should remove selected styles when another material is chosen', () => {
      render(<QRExportPanel {...defaultProps} />);

      fireEvent.click(screen.getByText('For Printing'));

      const paperOption = screen.getByText('Paper / Flyer').closest('button')!;
      const stickerOption = screen.getByText('Sticker').closest('button')!;

      fireEvent.click(paperOption);
      expect(paperOption.className).toContain('border-blue-500');

      fireEvent.click(stickerOption);
      expect(stickerOption.className).toContain('border-blue-500');
      expect(paperOption.className).not.toContain('border-blue-500');
    });
  });
});
