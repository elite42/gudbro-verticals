/**
 * Table Context Store
 *
 * Manages the dining context for QR-based orders:
 * - Table identification from QR code
 * - Customer name for table service
 * - Consumption type (dine-in vs takeaway)
 *
 * Flow:
 * 1. Customer scans QR code → table_number extracted
 * 2. Default: consumption_type = 'dine-in'
 * 3. If multiple customers at same table → ask for name
 * 4. Customer can change to 'takeaway' in customizations
 */

export interface TableContext {
  table_number: string | null;  // e.g., "12", "A5", null if no QR scanned
  customer_name: string | null;  // e.g., "Marco", null if not set
  consumption_type: 'dine-in' | 'takeaway';  // Default: 'dine-in' if QR scanned
  scanned_at: string | null;     // ISO timestamp of QR scan
}

const STORAGE_KEY = 'table_context';

/**
 * Default state: No table (customer browsing menu without QR)
 */
const defaultContext: TableContext = {
  table_number: null,
  customer_name: null,
  consumption_type: 'dine-in', // Default for no-QR browsing (counter/bar service)
  scanned_at: null
};

/**
 * Get current table context
 */
export function getTableContext(): TableContext {
  if (typeof window === 'undefined') return defaultContext;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading table context:', error);
  }

  return defaultContext;
}

/**
 * Set table context (from QR scan)
 */
export function setTableContext(context: Partial<TableContext>): void {
  if (typeof window === 'undefined') return;

  try {
    const current = getTableContext();
    const updated = { ...current, ...context };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch custom event for reactivity
    window.dispatchEvent(new CustomEvent('table-context-updated', {
      detail: updated
    }));
  } catch (error) {
    console.error('Error saving table context:', error);
  }
}

/**
 * Set table from QR code scan
 * Automatically sets consumption_type to 'dine-in'
 */
export function setTableFromQR(tableNumber: string): void {
  setTableContext({
    table_number: tableNumber,
    consumption_type: 'dine-in',
    scanned_at: new Date().toISOString()
  });
}

/**
 * Set customer name
 */
export function setCustomerName(name: string): void {
  setTableContext({
    customer_name: name
  });
}

/**
 * Set consumption type
 * Can be changed by customer in customizations
 */
export function setConsumptionType(type: 'dine-in' | 'takeaway'): void {
  setTableContext({
    consumption_type: type
  });
}

/**
 * Clear table context (end of session, payment completed)
 */
export function clearTableContext(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('table-context-updated', {
      detail: defaultContext
    }));
  } catch (error) {
    console.error('Error clearing table context:', error);
  }
}

/**
 * Check if customer is at a table (QR scanned)
 */
export function isAtTable(): boolean {
  return getTableContext().table_number !== null;
}

/**
 * Check if customer name is required
 * Name is required if:
 * - At a table (QR scanned)
 * - AND consumption type is 'dine-in'
 * - AND name not already set
 */
export function isCustomerNameRequired(): boolean {
  const context = getTableContext();
  return (
    context.table_number !== null &&
    context.consumption_type === 'dine-in' &&
    context.customer_name === null
  );
}

/**
 * Get formatted table display
 * e.g., "Tavolo 12", "Table A5", null if no table
 */
export function getTableDisplay(): string | null {
  const context = getTableContext();
  if (!context.table_number) return null;

  return `Tavolo ${context.table_number}`;
}

/**
 * Get order context for backend
 * Returns object to be included in order payload
 */
export function getOrderContext(): {
  table_number: string | null;
  customer_name: string | null;
  consumption_type: 'dine-in' | 'takeaway';
  service_type: 'table-service' | 'counter-pickup' | 'takeaway';
} {
  const context = getTableContext();

  // Determine service type
  let service_type: 'table-service' | 'counter-pickup' | 'takeaway';
  if (context.consumption_type === 'takeaway') {
    service_type = 'takeaway';
  } else if (context.table_number) {
    service_type = 'table-service';
  } else {
    service_type = 'counter-pickup';
  }

  return {
    table_number: context.table_number,
    customer_name: context.customer_name,
    consumption_type: context.consumption_type,
    service_type
  };
}

/**
 * Parse QR code data
 * Supports formats:
 * - "table-12" → "12"
 * - "T12" → "12"
 * - "A5" → "A5"
 * - "https://example.com/table/12" → "12"
 */
export function parseQRCode(qrData: string): string | null {
  try {
    // Format: "table-X" or "table_X"
    const tableMatch = qrData.match(/table[_-](\w+)/i);
    if (tableMatch) return tableMatch[1];

    // Format: "TX" where X is number
    const tMatch = qrData.match(/^T(\d+)$/i);
    if (tMatch) return tMatch[1];

    // Format: URL with table parameter
    const urlMatch = qrData.match(/\/table\/(\w+)/i);
    if (urlMatch) return urlMatch[1];

    // Direct table number/code
    if (/^[A-Z0-9]+$/i.test(qrData)) {
      return qrData.toUpperCase();
    }

    return null;
  } catch (error) {
    console.error('Error parsing QR code:', error);
    return null;
  }
}

/**
 * Table Context Store Object (for compatibility with existing patterns)
 */
export const tableContextStore = {
  get: getTableContext,
  set: setTableContext,
  setFromQR: setTableFromQR,
  setName: setCustomerName,
  setConsumptionType: setConsumptionType,
  clear: clearTableContext,
  isAtTable: isAtTable,
  isNameRequired: isCustomerNameRequired,
  getDisplay: getTableDisplay,
  getOrderContext: getOrderContext,
  parseQR: parseQRCode
};
