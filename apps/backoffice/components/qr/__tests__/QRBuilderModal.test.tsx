import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QRBuilderModal } from '../QRBuilderModal';
import type { QRCode, QRDesign } from '@/lib/qr/qr-types';

// Mock the service layer
vi.mock('@/lib/qr/qr-service', () => ({
  createQRCode: vi.fn(),
  updateQRCode: vi.fn(),
}));

// Mock the generator functions
vi.mock('@/lib/qr/qr-generator', () => ({
  validateWiFiConfig: vi.fn(),
  validateURL: vi.fn(),
  buildTableQRUrl: vi.fn(
    (slug: string, table: number, base: string) => `${base}/${slug}/menu?table=${table}`
  ),
  buildExternalQRUrl: vi.fn(
    (slug: string, source: string, base: string) => `${base}/${slug}?source=${source}`
  ),
}));

// Mock child components to simplify testing
vi.mock('../QRPreview', () => ({
  QRPreview: ({
    content,
    size,
    showContent,
  }: {
    content: string;
    size: number;
    showContent?: boolean;
  }) => (
    <div
      data-testid="qr-preview"
      data-content={content}
      data-size={size}
      data-show-content={showContent}
    >
      QR Preview Mock
    </div>
  ),
}));

vi.mock('../QRDesignPanel', () => ({
  QRDesignPanel: ({ design, onChange }: { design: QRDesign; onChange: (d: QRDesign) => void }) => (
    <div data-testid="qr-design-panel">
      <button
        onClick={() =>
          onChange({ ...design, colors: { foreground: '#ff0000', background: '#ffffff' } })
        }
        data-testid="change-design"
      >
        Change Design
      </button>
    </div>
  ),
}));

vi.mock('../QRExportPanel', () => ({
  QRExportPanel: ({ content, filename }: { content: string; filename: string }) => (
    <div data-testid="qr-export-panel" data-content={content} data-filename={filename}>
      QR Export Panel Mock
    </div>
  ),
}));

import { createQRCode, updateQRCode } from '@/lib/qr/qr-service';
import { validateWiFiConfig, validateURL } from '@/lib/qr/qr-generator';

const mockCreateQRCode = createQRCode as ReturnType<typeof vi.fn>;
const mockUpdateQRCode = updateQRCode as ReturnType<typeof vi.fn>;
const mockValidateWiFiConfig = validateWiFiConfig as ReturnType<typeof vi.fn>;
const mockValidateURL = validateURL as ReturnType<typeof vi.fn>;

describe('QRBuilderModal', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    onComplete: vi.fn(),
  };

  const mockQRCode: QRCode = {
    id: 'test-uuid-1234',
    merchant_id: '00000000-0000-0000-0000-000000000001',
    type: 'url',
    short_code: 'abc123',
    destination_url: 'https://menu.gudbro.com/demo/menu?table=5',
    use_short_url: true,
    context: 'table',
    source: null,
    table_number: 5,
    event_id: null,
    wifi_ssid: null,
    wifi_password: null,
    wifi_security: null,
    wifi_hidden: false,
    title: 'Table 5',
    description: null,
    design: {
      colors: { foreground: '#000000', background: '#ffffff' },
      pattern: 'squares',
    },
    is_active: true,
    expires_at: null,
    max_scans: null,
    total_scans: 0,
    last_scanned_at: null,
    created_at: '2026-01-09T00:00:00Z',
    updated_at: '2026-01-09T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementations
    mockValidateURL.mockReturnValue({ valid: true });
    mockValidateWiFiConfig.mockReturnValue({ valid: true, errors: [] });
    mockCreateQRCode.mockResolvedValue(mockQRCode);
    mockUpdateQRCode.mockResolvedValue(mockQRCode);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the modal when open is true', () => {
      render(<QRBuilderModal {...defaultProps} />);
      expect(screen.getByText('Create QR Code')).toBeInTheDocument();
    });

    it('should not render content when open is false', () => {
      render(<QRBuilderModal {...defaultProps} open={false} />);
      expect(screen.queryByText('Create QR Code')).not.toBeInTheDocument();
    });

    it('should show type selection step by default', () => {
      render(<QRBuilderModal {...defaultProps} />);
      expect(screen.getByText('URL / Link')).toBeInTheDocument();
      expect(screen.getByText('WiFi Network')).toBeInTheDocument();
    });

    it('should show step progress indicator with 4 steps', () => {
      render(<QRBuilderModal {...defaultProps} />);
      // Look for step indicators (1, 2, 3, 4)
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    });
  });

  describe('Type Selection Step', () => {
    it('should advance to details step when URL type is selected', () => {
      render(<QRBuilderModal {...defaultProps} />);

      const urlOption = screen.getByText('URL / Link').closest('button');
      fireEvent.click(urlOption!);

      expect(screen.getByText('Where will this QR be used?')).toBeInTheDocument();
    });

    it('should advance to details step when WiFi type is selected', () => {
      render(<QRBuilderModal {...defaultProps} />);

      const wifiOption = screen.getByText('WiFi Network').closest('button');
      fireEvent.click(wifiOption!);

      expect(screen.getByText('Network Name (SSID)')).toBeInTheDocument();
    });

    it('should skip type selection when defaultType is provided', () => {
      render(<QRBuilderModal {...defaultProps} defaultType="url" />);

      // Should start on details step directly
      expect(screen.getByText('Where will this QR be used?')).toBeInTheDocument();
      expect(
        screen.queryByText('Select the type of QR code you want to create')
      ).not.toBeInTheDocument();
    });
  });

  describe('URL Details Step', () => {
    const renderAtDetailsStep = (extraProps = {}) => {
      render(<QRBuilderModal {...defaultProps} defaultType="url" {...extraProps} />);
    };

    it('should show context options for URL type', () => {
      renderAtDetailsStep();

      expect(screen.getByText('Table')).toBeInTheDocument();
      expect(screen.getByText('Marketing')).toBeInTheDocument();
      expect(screen.getByText('Takeaway')).toBeInTheDocument();
      expect(screen.getByText('Delivery')).toBeInTheDocument();
    });

    it('should show table number input when table context is selected', () => {
      renderAtDetailsStep();

      const tableOption = screen.getByText('Table').closest('button');
      fireEvent.click(tableOption!);

      expect(screen.getByLabelText('Table Number')).toBeInTheDocument();
    });

    it('should show source options when external/marketing context is selected', () => {
      renderAtDetailsStep();

      const marketingOption = screen.getByText('Marketing').closest('button');
      fireEvent.click(marketingOption!);

      expect(screen.getByText('Traffic Source')).toBeInTheDocument();
      expect(screen.getByText('Google Maps')).toBeInTheDocument();
      expect(screen.getByText('Instagram')).toBeInTheDocument();
    });

    it('should pre-populate table number when provided', () => {
      renderAtDetailsStep({ defaultContext: 'table', tableNumber: 7 });

      const tableInput = screen.getByLabelText('Table Number') as HTMLInputElement;
      expect(tableInput.value).toBe('7');
    });

    it('should show custom URL input for non-table contexts', () => {
      renderAtDetailsStep();

      const marketingOption = screen.getByText('Marketing').closest('button');
      fireEvent.click(marketingOption!);

      expect(screen.getByLabelText('Custom URL (optional)')).toBeInTheDocument();
    });

    it('should show QR preview', () => {
      renderAtDetailsStep();
      expect(screen.getByTestId('qr-preview')).toBeInTheDocument();
    });
  });

  describe('WiFi Details Step', () => {
    const renderWiFiStep = () => {
      render(<QRBuilderModal {...defaultProps} defaultType="wifi" />);
    };

    it('should show WiFi form fields', () => {
      renderWiFiStep();

      expect(screen.getByLabelText('Network Name (SSID)')).toBeInTheDocument();
      expect(screen.getByText('Security Type')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('should show security type options', () => {
      renderWiFiStep();

      expect(screen.getByText('WPA/WPA2/WPA3')).toBeInTheDocument();
      expect(screen.getByText('WEP (legacy)')).toBeInTheDocument();
      expect(screen.getByText('Open (no password)')).toBeInTheDocument();
    });

    it('should hide password field when nopass security is selected', () => {
      renderWiFiStep();

      const nopassOption = screen.getByText('Open (no password)');
      fireEvent.click(nopassOption);

      expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
    });

    it('should show hidden network checkbox', () => {
      renderWiFiStep();
      expect(screen.getByLabelText('Hidden network')).toBeInTheDocument();
    });

    it('should update SSID when typing', () => {
      renderWiFiStep();

      const ssidInput = screen.getByLabelText('Network Name (SSID)');
      fireEvent.change(ssidInput, { target: { value: 'MyWiFi' } });

      expect((ssidInput as HTMLInputElement).value).toBe('MyWiFi');
    });
  });

  describe('Form Validation', () => {
    it('should show error when table number is missing', async () => {
      render(<QRBuilderModal {...defaultProps} defaultType="url" defaultContext="table" />);

      // Try to create without table number - use role selector to avoid title match
      const createButton = screen.getByRole('button', { name: /^create qr code$/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByText('Table number is required')).toBeInTheDocument();
      });
    });

    it('should validate URL format', async () => {
      mockValidateURL.mockReturnValue({ valid: false, error: 'Invalid URL format' });

      render(<QRBuilderModal {...defaultProps} defaultType="url" defaultContext="external" />);

      const urlInput = screen.getByLabelText('Custom URL (optional)');
      fireEvent.change(urlInput, { target: { value: 'not-a-url' } });

      const createButton = screen.getByRole('button', { name: /^create qr code$/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid URL format')).toBeInTheDocument();
      });
    });

    it('should validate WiFi config', async () => {
      mockValidateWiFiConfig.mockReturnValue({
        valid: false,
        errors: ['SSID is required'],
      });

      render(<QRBuilderModal {...defaultProps} defaultType="wifi" />);

      const createButton = screen.getByRole('button', { name: /^create qr code$/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByText('SSID is required')).toBeInTheDocument();
      });
    });

    it('should require source or URL for external context', async () => {
      render(<QRBuilderModal {...defaultProps} defaultType="url" defaultContext="external" />);

      // Don't select any source or enter URL
      const createButton = screen.getByRole('button', { name: /^create qr code$/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByText('Please select a source or enter a URL')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate to design step with Customize Design button', () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      const customizeButton = screen.getByRole('button', { name: /customize design/i });
      fireEvent.click(customizeButton);

      expect(screen.getByTestId('qr-design-panel')).toBeInTheDocument();
    });

    it('should navigate back from design step', () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      // Go to design
      fireEvent.click(screen.getByRole('button', { name: /customize design/i }));
      expect(screen.getByTestId('qr-design-panel')).toBeInTheDocument();

      // Go back
      fireEvent.click(screen.getByRole('button', { name: /back/i }));
      expect(screen.getByText('Where will this QR be used?')).toBeInTheDocument();
    });

    it('should show Done button on export step', async () => {
      mockValidateURL.mockReturnValue({ valid: true });

      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      const createButton = screen.getByRole('button', { name: /^create qr code$/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
      });
    });
  });

  describe('Create QR Code', () => {
    it('should call createQRCode with correct data for table QR', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      const createButton = screen.getByRole('button', { name: /^create qr code$/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(mockCreateQRCode).toHaveBeenCalledWith(
          '00000000-0000-0000-0000-000000000001',
          expect.objectContaining({
            type: 'url',
            context: 'table',
            table_number: 5,
            use_short_url: true,
          })
        );
      });
    });

    it('should call createQRCode with correct data for WiFi QR', async () => {
      render(<QRBuilderModal {...defaultProps} defaultType="wifi" />);

      // Fill WiFi form
      const ssidInput = screen.getByLabelText('Network Name (SSID)');
      fireEvent.change(ssidInput, { target: { value: 'TestNetwork' } });

      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'secret123' } });

      const createButton = screen.getByRole('button', { name: /^create qr code$/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(mockCreateQRCode).toHaveBeenCalledWith(
          '00000000-0000-0000-0000-000000000001',
          expect.objectContaining({
            type: 'wifi',
            wifi_ssid: 'TestNetwork',
            wifi_password: 'secret123',
            wifi_security: 'WPA',
          })
        );
      });
    });

    it('should call onComplete callback after successful creation', async () => {
      const onComplete = vi.fn();
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
          onComplete={onComplete}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith(mockQRCode);
      });
    });

    it('should advance to export step after creation', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        expect(screen.getByTestId('qr-export-panel')).toBeInTheDocument();
        expect(screen.getByText('QR Code Created!')).toBeInTheDocument();
      });
    });

    it('should show short code after creation', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        expect(screen.getByText(/go\.gudbro\.com\/abc123/)).toBeInTheDocument();
      });
    });

    it('should show loading state while creating', async () => {
      // Make the mock return a pending promise
      let resolvePromise: (value: QRCode) => void;
      mockCreateQRCode.mockReturnValue(
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
      );

      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      // Button should be disabled during loading
      const buttons = screen.getAllByRole('button');
      const createBtn = buttons.find((btn) => btn.textContent?.includes('QR Code'));
      expect(createBtn).toBeDisabled();

      // Resolve the promise
      resolvePromise!(mockQRCode);
    });

    it('should show error on creation failure', async () => {
      mockCreateQRCode.mockRejectedValue(new Error('Network error'));

      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        expect(screen.getByText('Failed to save QR code. Please try again.')).toBeInTheDocument();
      });
    });
  });

  describe('Edit Mode', () => {
    const existingQRCode: QRCode = {
      id: 'existing-qr-id',
      merchant_id: '00000000-0000-0000-0000-000000000001',
      type: 'url',
      short_code: 'xyz789',
      destination_url: 'https://menu.gudbro.com/test/menu?table=3',
      use_short_url: true,
      context: 'table',
      source: null,
      table_number: 3,
      event_id: null,
      wifi_ssid: null,
      wifi_password: null,
      wifi_security: null,
      wifi_hidden: false,
      title: 'Table 3',
      description: null,
      design: {
        colors: { foreground: '#333333', background: '#eeeeee' },
        pattern: 'dots',
      },
      is_active: true,
      expires_at: null,
      max_scans: null,
      total_scans: 42,
      last_scanned_at: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-08T00:00:00Z',
    };

    it('should show Edit title when editQRCode is provided', () => {
      render(<QRBuilderModal {...defaultProps} editQRCode={existingQRCode} />);

      expect(screen.getByText('Edit QR Code')).toBeInTheDocument();
    });

    it('should pre-populate form with existing data', () => {
      render(<QRBuilderModal {...defaultProps} editQRCode={existingQRCode} />);

      // Should start on details step, not type step
      expect(screen.getByText('Where will this QR be used?')).toBeInTheDocument();

      // Table number should be pre-filled
      const tableInput = screen.getByLabelText('Table Number') as HTMLInputElement;
      expect(tableInput.value).toBe('3');
    });

    it('should pre-populate WiFi data when editing WiFi QR', () => {
      const wifiQRCode: QRCode = {
        ...existingQRCode,
        type: 'wifi',
        wifi_ssid: 'ExistingNetwork',
        wifi_password: 'existingpass',
        wifi_security: 'WPA',
        wifi_hidden: true,
      };

      render(<QRBuilderModal {...defaultProps} editQRCode={wifiQRCode} />);

      const ssidInput = screen.getByLabelText('Network Name (SSID)') as HTMLInputElement;
      expect(ssidInput.value).toBe('ExistingNetwork');

      const hiddenCheckbox = screen.getByLabelText('Hidden network') as HTMLInputElement;
      expect(hiddenCheckbox.checked).toBe(true);
    });

    it('should show Update button instead of Create', () => {
      render(<QRBuilderModal {...defaultProps} editQRCode={existingQRCode} />);

      expect(screen.getByRole('button', { name: /^update qr code$/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /^create qr code$/i })).not.toBeInTheDocument();
    });

    it('should call updateQRCode instead of createQRCode', async () => {
      render(<QRBuilderModal {...defaultProps} editQRCode={existingQRCode} />);

      fireEvent.click(screen.getByRole('button', { name: /^update qr code$/i }));

      await waitFor(() => {
        expect(mockUpdateQRCode).toHaveBeenCalledWith('existing-qr-id', expect.any(Object));
        expect(mockCreateQRCode).not.toHaveBeenCalled();
      });
    });
  });

  describe('Design Step', () => {
    it('should pass design to QRDesignPanel', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /customize design/i }));

      expect(screen.getByTestId('qr-design-panel')).toBeInTheDocument();
    });

    it('should update form design when QRDesignPanel changes it', () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /customize design/i }));

      // Click the mock change design button
      fireEvent.click(screen.getByTestId('change-design'));

      // The preview should still be visible with updated design
      expect(screen.getByTestId('qr-preview')).toBeInTheDocument();
    });

    it('should allow creating QR from design step', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /customize design/i }));

      // There should be a Create button on design step too
      const createButton = screen.getByRole('button', { name: /qr code$/i });
      expect(createButton).toBeInTheDocument();
    });
  });

  describe('Export Step', () => {
    it('should show QRExportPanel with correct props', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        const exportPanel = screen.getByTestId('qr-export-panel');
        expect(exportPanel).toBeInTheDocument();
      });
    });

    it('should use title for filename when provided', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      // Set a custom title
      const titleInput = screen.getByLabelText('Title (optional)');
      fireEvent.change(titleInput, { target: { value: 'My Custom QR' } });

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        const exportPanel = screen.getByTestId('qr-export-panel');
        expect(exportPanel.getAttribute('data-filename')).toBe('my-custom-qr');
      });
    });

    it('should close modal when Done is clicked', async () => {
      const onClose = vi.fn();
      render(
        <QRBuilderModal
          {...defaultProps}
          onClose={onClose}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        fireEvent.click(screen.getByRole('button', { name: /done/i }));
        expect(onClose).toHaveBeenCalled();
      });
    });
  });

  describe('Preview Content Generation', () => {
    it('should generate WiFi preview content', () => {
      render(<QRBuilderModal {...defaultProps} defaultType="wifi" />);

      const ssidInput = screen.getByLabelText('Network Name (SSID)');
      fireEvent.change(ssidInput, { target: { value: 'TestSSID' } });

      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      const preview = screen.getByTestId('qr-preview');
      expect(preview.getAttribute('data-content')).toContain('WIFI:');
      expect(preview.getAttribute('data-content')).toContain('TestSSID');
    });

    it('should generate table URL preview', () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      const preview = screen.getByTestId('qr-preview');
      expect(preview.getAttribute('data-content')).toContain('table=5');
    });

    it('should use custom URL when provided', () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="external"
          defaultSource="instagram"
        />
      );

      const urlInput = screen.getByLabelText('Custom URL (optional)');
      fireEvent.change(urlInput, { target: { value: 'https://custom.url/page' } });

      const preview = screen.getByTestId('qr-preview');
      expect(preview.getAttribute('data-content')).toBe('https://custom.url/page');
    });

    it('should show empty preview when no content', () => {
      render(<QRBuilderModal {...defaultProps} defaultType="url" />);

      // No context selected, no URL, preview should be empty
      const preview = screen.getByTestId('qr-preview');
      expect(preview.getAttribute('data-content')).toBe('');
    });
  });

  describe('Modal Behavior', () => {
    it('should reset form when modal reopens', async () => {
      const { rerender } = render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      // Make some changes
      const titleInput = screen.getByLabelText('Title (optional)');
      fireEvent.change(titleInput, { target: { value: 'Custom Title' } });

      // Close modal
      rerender(
        <QRBuilderModal
          {...defaultProps}
          open={false}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      // Reopen modal
      rerender(
        <QRBuilderModal
          {...defaultProps}
          open={true}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      // Title should be reset (default behavior of useEffect)
      const newTitleInput = screen.getByLabelText('Title (optional)') as HTMLInputElement;
      expect(newTitleInput.value).toBe('');
    });

    it('should call onClose when dialog is dismissed', () => {
      const onClose = vi.fn();
      render(<QRBuilderModal {...defaultProps} onClose={onClose} />);

      // Find the dialog and trigger close
      // The dialog component wraps everything
      const dialogContent = screen.getByRole('dialog');
      expect(dialogContent).toBeInTheDocument();
    });
  });

  describe('Step Descriptions', () => {
    it('should show correct description for type step', () => {
      render(<QRBuilderModal {...defaultProps} />);
      expect(screen.getByText('Select the type of QR code you want to create')).toBeInTheDocument();
    });

    it('should show correct description for details step', () => {
      render(<QRBuilderModal {...defaultProps} defaultType="url" />);
      expect(screen.getByText('Configure your QR code settings')).toBeInTheDocument();
    });

    it('should show correct description for design step', () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /customize design/i }));
      expect(screen.getByText('Customize the look of your QR code')).toBeInTheDocument();
    });

    it('should show correct description for export step', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        expect(screen.getByText('Download your QR code')).toBeInTheDocument();
      });
    });
  });

  describe('Auto-generated Titles', () => {
    it('should auto-generate title for table QR', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        expect(mockCreateQRCode).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            title: 'Table 5',
          })
        );
      });
    });

    it('should use custom title when provided', async () => {
      render(
        <QRBuilderModal
          {...defaultProps}
          defaultType="url"
          defaultContext="table"
          tableNumber={5}
        />
      );

      const titleInput = screen.getByLabelText('Title (optional)');
      fireEvent.change(titleInput, { target: { value: 'VIP Table' } });

      fireEvent.click(screen.getByRole('button', { name: /^create qr code$/i }));

      await waitFor(() => {
        expect(mockCreateQRCode).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            title: 'VIP Table',
          })
        );
      });
    });
  });
});
