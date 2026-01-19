import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QRDesignPanel } from '../QRDesignPanel';
import { QRDesign, DEFAULT_QR_DESIGN } from '@/lib/qr/qr-types';

// Use vi.hoisted to create the mock function before vi.mock runs
const { mockValidateColorContrast } = vi.hoisted(() => ({
  mockValidateColorContrast: vi.fn(),
}));

// Mock qr-generator module
vi.mock('@/lib/qr/qr-generator', () => ({
  validateColorContrast: mockValidateColorContrast,
}));

describe('QRDesignPanel', () => {
  const mockOnChange = vi.fn();
  const defaultDesign: QRDesign = {
    colors: {
      foreground: '#000000',
      background: '#FFFFFF',
    },
    pattern: 'squares',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock: high contrast (valid)
    mockValidateColorContrast.mockReturnValue({
      valid: true,
      ratio: 21,
      message: undefined,
    });
  });

  it('should render with default design', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Check that the quick colors label is present
    expect(screen.getByText('Quick Colors')).toBeInTheDocument();

    // Check that pattern options are present (may have duplicates for eye style)
    expect(screen.getAllByText('Square').length).toBeGreaterThan(0);
    expect(screen.getByText('Dots')).toBeInTheDocument();
    expect(screen.getAllByText('Rounded').length).toBeGreaterThan(0);

    // Check that reset button is present
    expect(screen.getByText('Reset to default')).toBeInTheDocument();
  });

  it('should call onChange with new colors when clicking a preset', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Find the Navy preset button (by title)
    const navyPreset = screen.getByTitle('Navy');
    fireEvent.click(navyPreset);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: {
          foreground: '#1e3a5f',
          background: '#FFFFFF',
        },
      })
    );
  });

  it('should call onChange with inverted colors when clicking Inverted preset', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    const invertedPreset = screen.getByTitle('Inverted');
    fireEvent.click(invertedPreset);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: {
          foreground: '#FFFFFF',
          background: '#000000',
        },
      })
    );
  });

  it('should call onChange when foreground color input changes', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Find the foreground color input (type="color")
    const foregroundInput = screen.getByLabelText('Foreground');
    fireEvent.change(foregroundInput, { target: { value: '#ff0000' } });

    // Color inputs return lowercase hex values
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: {
          foreground: '#ff0000',
          background: '#FFFFFF',
        },
      })
    );
  });

  it('should call onChange when background color input changes', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Find the background color input
    const backgroundInput = screen.getByLabelText('Background');
    fireEvent.change(backgroundInput, { target: { value: '#00ff00' } });

    // Color inputs return lowercase hex values
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: {
          foreground: '#000000',
          background: '#00ff00',
        },
      })
    );
  });

  it('should call onChange when selecting a different pattern', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    const dotsButton = screen.getByText('Dots');
    fireEvent.click(dotsButton);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        pattern: 'dots',
      })
    );
  });

  it('should call onChange when selecting Rounded pattern', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Get the first "Rounded" button (pattern selector, not eye style)
    const roundedButtons = screen.getAllByText('Rounded');
    fireEvent.click(roundedButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        pattern: 'rounded',
      })
    );
  });

  it('should call onChange with DEFAULT_QR_DESIGN when clicking reset', () => {
    const customDesign: QRDesign = {
      colors: {
        foreground: '#FF0000',
        background: '#00FF00',
      },
      pattern: 'dots',
    };

    render(<QRDesignPanel design={customDesign} onChange={mockOnChange} />);

    const resetButton = screen.getByText('Reset to default');
    fireEvent.click(resetButton);

    expect(mockOnChange).toHaveBeenCalledWith(DEFAULT_QR_DESIGN);
  });

  it('should show contrast warning for low contrast colors', () => {
    // Configure mock to return low contrast warning
    mockValidateColorContrast.mockReturnValue({
      valid: false,
      ratio: 1.2,
      message: 'Contrast ratio 1.2:1 is too low. Minimum 4:1 required for reliable scanning.',
    });

    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Click a preset to trigger validation (presets reliably call updateColors)
    const invertedPreset = screen.getByTitle('Inverted');
    fireEvent.click(invertedPreset);

    // The warning should appear
    expect(screen.getByText(/Contrast ratio.*is too low/i)).toBeInTheDocument();
  });

  it('should not show contrast warning for high contrast colors', () => {
    // Mock returns valid (high contrast) by default from beforeEach
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Click a preset to trigger validation
    const navyPreset = screen.getByTitle('Navy');
    fireEvent.click(navyPreset);

    // No warning should be present (mock returns valid by default)
    expect(screen.queryByText(/Contrast ratio.*is too low/i)).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-panel-class';
    const { container } = render(
      <QRDesignPanel design={defaultDesign} onChange={mockOnChange} className={customClass} />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(customClass);
  });

  it('should highlight the currently selected pattern', () => {
    const designWithDots: QRDesign = {
      colors: {
        foreground: '#000000',
        background: '#FFFFFF',
      },
      pattern: 'dots',
    };

    render(<QRDesignPanel design={designWithDots} onChange={mockOnChange} />);

    const dotsButton = screen.getByText('Dots');
    // Check that it has the selected styling (bg-blue-50)
    expect(dotsButton).toHaveClass('bg-blue-50');
  });

  it('should show pattern note text', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    expect(screen.getByText(/Pattern style may affect scannability/i)).toBeInTheDocument();
  });

  it('should display all color presets', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Check all preset titles are present
    expect(screen.getByTitle('Classic')).toBeInTheDocument();
    expect(screen.getByTitle('Inverted')).toBeInTheDocument();
    expect(screen.getByTitle('Navy')).toBeInTheDocument();
    expect(screen.getByTitle('Forest')).toBeInTheDocument();
    expect(screen.getByTitle('Wine')).toBeInTheDocument();
    expect(screen.getByTitle('Purple')).toBeInTheDocument();
  });

  it('should handle foreground text input change', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    // Find all text inputs (there should be 2 - one for foreground, one for background)
    const textInputs = screen.getAllByRole('textbox');

    // First text input should be foreground
    fireEvent.change(textInputs[0], { target: { value: '#AABBCC' } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: {
          foreground: '#AABBCC',
          background: '#FFFFFF',
        },
      })
    );
  });

  it('should handle background text input change', () => {
    render(<QRDesignPanel design={defaultDesign} onChange={mockOnChange} />);

    const textInputs = screen.getAllByRole('textbox');

    // Second text input should be background
    fireEvent.change(textInputs[1], { target: { value: '#DDEEFF' } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: {
          foreground: '#000000',
          background: '#DDEEFF',
        },
      })
    );
  });
});
