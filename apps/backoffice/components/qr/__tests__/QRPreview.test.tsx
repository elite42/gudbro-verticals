import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QRPreview, generateQRPreview } from '../QRPreview';
import { DEFAULT_QR_DESIGN } from '@/lib/qr/qr-types';

// Mock qrcode lib
vi.mock('qrcode', () => ({
  default: {
    toCanvas: vi.fn().mockResolvedValue(undefined),
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mock'),
  },
}));

// Import the mocked module to access mock functions
import QRCode from 'qrcode';

describe('QRPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render canvas when content is provided', async () => {
    render(<QRPreview content="https://example.com" />);

    // Wait for the QR code to be generated
    await waitFor(() => {
      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    // Canvas should be present
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should show "No content" message when content is empty', () => {
    render(<QRPreview content="" />);

    expect(screen.getByText('No content')).toBeInTheDocument();
  });

  it('should show content text when showContent is true', async () => {
    const testUrl = 'https://example.com/test';
    render(<QRPreview content={testUrl} showContent={true} />);

    await waitFor(() => {
      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    expect(screen.getByText(testUrl)).toBeInTheDocument();
  });

  it('should not show content text when showContent is false', async () => {
    const testUrl = 'https://example.com/test';
    render(<QRPreview content={testUrl} showContent={false} />);

    await waitFor(() => {
      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    expect(screen.queryByText(testUrl)).not.toBeInTheDocument();
  });

  it('should apply custom className', async () => {
    const customClass = 'custom-test-class';
    const { container } = render(
      <QRPreview content="https://example.com" className={customClass} />
    );

    await waitFor(() => {
      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    // The className should be applied to the wrapper div
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(customClass);
  });

  it('should call toCanvas with correct design colors', async () => {
    const customDesign = {
      colors: {
        foreground: '#FF0000',
        background: '#00FF00',
      },
      pattern: 'squares' as const,
    };

    render(<QRPreview content="https://example.com" design={customDesign} />);

    await waitFor(() => {
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'https://example.com',
        expect.objectContaining({
          color: {
            dark: '#FF0000',
            light: '#00FF00',
          },
        })
      );
    });
  });

  it('should use default design when not provided', async () => {
    render(<QRPreview content="https://example.com" />);

    await waitFor(() => {
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'https://example.com',
        expect.objectContaining({
          color: {
            dark: DEFAULT_QR_DESIGN.colors.foreground,
            light: DEFAULT_QR_DESIGN.colors.background,
          },
        })
      );
    });
  });

  it('should use custom size', async () => {
    const customSize = 300;
    render(<QRPreview content="https://example.com" size={customSize} />);

    await waitFor(() => {
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'https://example.com',
        expect.objectContaining({
          width: customSize,
        })
      );
    });
  });

  it('should apply className to error state container', () => {
    const customClass = 'error-custom-class';
    const { container } = render(<QRPreview content="" className={customClass} />);

    const errorWrapper = container.firstChild as HTMLElement;
    expect(errorWrapper).toHaveClass(customClass);
  });
});

describe('generateQRPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a valid data URL', async () => {
    const result = await generateQRPreview('https://example.com');

    expect(result).toBe('data:image/png;base64,mock');
    expect(QRCode.toDataURL).toHaveBeenCalled();
  });

  it('should call toDataURL with correct parameters', async () => {
    const content = 'https://test.com';
    const design = {
      colors: {
        foreground: '#123456',
        background: '#ABCDEF',
      },
      pattern: 'dots' as const,
    };
    const size = 1024;

    await generateQRPreview(content, design, size);

    expect(QRCode.toDataURL).toHaveBeenCalledWith(
      content,
      expect.objectContaining({
        width: size,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: design.colors.foreground,
          light: design.colors.background,
        },
      })
    );
  });

  it('should use default design when not provided', async () => {
    await generateQRPreview('https://example.com');

    expect(QRCode.toDataURL).toHaveBeenCalledWith(
      'https://example.com',
      expect.objectContaining({
        color: {
          dark: DEFAULT_QR_DESIGN.colors.foreground,
          light: DEFAULT_QR_DESIGN.colors.background,
        },
      })
    );
  });

  it('should use default size of 512 when not provided', async () => {
    await generateQRPreview('https://example.com');

    expect(QRCode.toDataURL).toHaveBeenCalledWith(
      'https://example.com',
      expect.objectContaining({
        width: 512,
      })
    );
  });
});
