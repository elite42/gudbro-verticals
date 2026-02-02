/**
 * Mock Data for E2E Multi-System Tests
 *
 * Fake accounts, tables, orders, and requests for testing
 * the complete flow across all systems:
 * - Backoffice (Manager)
 * - Waiter PWA (Staff)
 * - Customer PWA (Clients)
 * - Kitchen Display
 * - Bar Display
 */

// ============================================
// FAKE ACCOUNTS
// ============================================

export interface FakeAccount {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'staff' | 'customer';
  locationId: string;
}

export const FAKE_ACCOUNTS: Record<string, FakeAccount> = {
  // Manager account for backoffice
  manager: {
    id: 'fake-manager-001',
    email: 'manager@test.gudbro.dev',
    name: 'Anna Manager',
    role: 'manager',
    locationId: 'loc-test-001',
  },

  // Staff accounts for waiter PWA
  waiter1: {
    id: 'fake-waiter-001',
    email: 'mario@test.gudbro.dev',
    name: 'Mario Cameriere',
    role: 'staff',
    locationId: 'loc-test-001',
  },
  waiter2: {
    id: 'fake-waiter-002',
    email: 'luigi@test.gudbro.dev',
    name: 'Luigi Cameriere',
    role: 'staff',
    locationId: 'loc-test-001',
  },
  waiter3: {
    id: 'fake-waiter-003',
    email: 'peach@test.gudbro.dev',
    name: 'Peach Cameriera',
    role: 'staff',
    locationId: 'loc-test-001',
  },

  // Customer accounts for client PWA
  customer1: {
    id: 'fake-customer-001',
    email: 'cliente1@test.gudbro.dev',
    name: 'Marco Cliente',
    role: 'customer',
    locationId: 'loc-test-001',
  },
  customer2: {
    id: 'fake-customer-002',
    email: 'cliente2@test.gudbro.dev',
    name: 'Giulia Cliente',
    role: 'customer',
    locationId: 'loc-test-001',
  },
  customer3: {
    id: 'fake-customer-003',
    email: 'cliente3@test.gudbro.dev',
    name: 'Paolo Cliente',
    role: 'customer',
    locationId: 'loc-test-001',
  },
};

// ============================================
// FAKE LOCATION
// ============================================

export interface FakeLocation {
  id: string;
  name: string;
  address: string;
  tables: FakeTable[];
  zones: FakeZone[];
}

export interface FakeZone {
  id: string;
  name: string;
  tableIds: string[];
}

export interface FakeTable {
  id: string;
  number: string;
  capacity: number;
  zoneId: string;
  qrCode: string;
}

export const FAKE_LOCATION: FakeLocation = {
  id: 'loc-test-001',
  name: 'Ristorante Test',
  address: 'Via dei Test 123, Roma',
  zones: [
    { id: 'zone-interno', name: 'Sala Interna', tableIds: ['t1', 't2', 't3', 't4'] },
    { id: 'zone-esterno', name: 'Terrazza', tableIds: ['t5', 't6', 't7', 't8'] },
    { id: 'zone-bar', name: 'Bar', tableIds: ['t9', 't10'] },
  ],
  tables: [
    // Sala Interna
    { id: 't1', number: '1', capacity: 4, zoneId: 'zone-interno', qrCode: 'QR-T1-TEST' },
    { id: 't2', number: '2', capacity: 2, zoneId: 'zone-interno', qrCode: 'QR-T2-TEST' },
    { id: 't3', number: '3', capacity: 6, zoneId: 'zone-interno', qrCode: 'QR-T3-TEST' },
    { id: 't4', number: '4', capacity: 4, zoneId: 'zone-interno', qrCode: 'QR-T4-TEST' },
    // Terrazza
    { id: 't5', number: '5', capacity: 4, zoneId: 'zone-esterno', qrCode: 'QR-T5-TEST' },
    { id: 't6', number: '6', capacity: 6, zoneId: 'zone-esterno', qrCode: 'QR-T6-TEST' },
    { id: 't7', number: '7', capacity: 2, zoneId: 'zone-esterno', qrCode: 'QR-T7-TEST' },
    { id: 't8', number: '8', capacity: 8, zoneId: 'zone-esterno', qrCode: 'QR-T8-TEST' },
    // Bar
    { id: 't9', number: 'B1', capacity: 2, zoneId: 'zone-bar', qrCode: 'QR-B1-TEST' },
    { id: 't10', number: 'B2', capacity: 2, zoneId: 'zone-bar', qrCode: 'QR-B2-TEST' },
  ],
};

// ============================================
// FAKE MENU ITEMS
// ============================================

export interface FakeMenuItem {
  id: string;
  name: { en: string; it: string };
  category: string;
  price: number;
  isBeverage: boolean;
  preparationTime: number; // minutes
}

export const FAKE_MENU: FakeMenuItem[] = [
  // Food - Kitchen
  { id: 'item-001', name: { en: 'Margherita Pizza', it: 'Pizza Margherita' }, category: 'pizza', price: 8.50, isBeverage: false, preparationTime: 12 },
  { id: 'item-002', name: { en: 'Diavola Pizza', it: 'Pizza Diavola' }, category: 'pizza', price: 10.00, isBeverage: false, preparationTime: 12 },
  { id: 'item-003', name: { en: 'Carbonara', it: 'Carbonara' }, category: 'pasta', price: 12.00, isBeverage: false, preparationTime: 15 },
  { id: 'item-004', name: { en: 'Amatriciana', it: 'Amatriciana' }, category: 'pasta', price: 11.00, isBeverage: false, preparationTime: 15 },
  { id: 'item-005', name: { en: 'Caesar Salad', it: 'Insalata Caesar' }, category: 'salad', price: 9.00, isBeverage: false, preparationTime: 5 },
  { id: 'item-006', name: { en: 'Grilled Steak', it: 'Bistecca alla Griglia' }, category: 'main', price: 22.00, isBeverage: false, preparationTime: 20 },
  { id: 'item-007', name: { en: 'Tiramisu', it: 'Tiramisù' }, category: 'dessert', price: 6.00, isBeverage: false, preparationTime: 2 },

  // Beverages - Bar
  { id: 'bev-001', name: { en: 'Espresso', it: 'Caffè Espresso' }, category: 'coffee', price: 1.50, isBeverage: true, preparationTime: 2 },
  { id: 'bev-002', name: { en: 'Cappuccino', it: 'Cappuccino' }, category: 'coffee', price: 2.50, isBeverage: true, preparationTime: 3 },
  { id: 'bev-003', name: { en: 'Latte Macchiato', it: 'Latte Macchiato' }, category: 'coffee', price: 3.00, isBeverage: true, preparationTime: 3 },
  { id: 'bev-004', name: { en: 'Beer (Draft)', it: 'Birra alla Spina' }, category: 'beer', price: 5.00, isBeverage: true, preparationTime: 1 },
  { id: 'bev-005', name: { en: 'House Wine (Glass)', it: 'Vino della Casa (Calice)' }, category: 'wine', price: 4.50, isBeverage: true, preparationTime: 1 },
  { id: 'bev-006', name: { en: 'Aperol Spritz', it: 'Aperol Spritz' }, category: 'cocktail', price: 7.00, isBeverage: true, preparationTime: 3 },
  { id: 'bev-007', name: { en: 'Mojito', it: 'Mojito' }, category: 'cocktail', price: 8.00, isBeverage: true, preparationTime: 4 },
  { id: 'bev-008', name: { en: 'Still Water', it: 'Acqua Naturale' }, category: 'beverage', price: 2.00, isBeverage: true, preparationTime: 0 },
  { id: 'bev-009', name: { en: 'Sparkling Water', it: 'Acqua Frizzante' }, category: 'beverage', price: 2.00, isBeverage: true, preparationTime: 0 },
  { id: 'bev-010', name: { en: 'Coca Cola', it: 'Coca Cola' }, category: 'beverage', price: 3.00, isBeverage: true, preparationTime: 0 },
];

// ============================================
// FAKE ORDERS (Pre-built scenarios)
// ============================================

export interface FakeOrderItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
}

export interface FakeOrder {
  id: string;
  code: string;
  tableId: string;
  customerId: string;
  items: FakeOrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'completed';
  total: number;
  createdAt: Date;
}

// Pre-built orders for test scenarios
export const FAKE_ORDERS: Record<string, FakeOrder> = {
  // Scenario: Simple lunch
  simpleLunch: {
    id: 'order-001',
    code: 'ORD-001',
    tableId: 't5',
    customerId: 'fake-customer-001',
    items: [
      { menuItemId: 'item-001', quantity: 1 }, // Pizza Margherita
      { menuItemId: 'bev-004', quantity: 2 },  // 2 Birre
    ],
    status: 'pending',
    total: 18.50,
    createdAt: new Date(),
  },

  // Scenario: Family dinner
  familyDinner: {
    id: 'order-002',
    code: 'ORD-002',
    tableId: 't3',
    customerId: 'fake-customer-002',
    items: [
      { menuItemId: 'item-001', quantity: 2 }, // 2 Pizza Margherita
      { menuItemId: 'item-003', quantity: 1 }, // Carbonara
      { menuItemId: 'item-005', quantity: 1 }, // Caesar Salad
      { menuItemId: 'bev-008', quantity: 2 },  // 2 Acqua
      { menuItemId: 'bev-010', quantity: 2 },  // 2 Coca Cola
    ],
    status: 'pending',
    total: 44.00,
    createdAt: new Date(),
  },

  // Scenario: Bar order only
  barOrder: {
    id: 'order-003',
    code: 'ORD-003',
    tableId: 't9',
    customerId: 'fake-customer-003',
    items: [
      { menuItemId: 'bev-006', quantity: 2 }, // 2 Aperol Spritz
      { menuItemId: 'bev-007', quantity: 1 }, // Mojito
    ],
    status: 'pending',
    total: 22.00,
    createdAt: new Date(),
  },

  // Scenario: Complex mixed order
  complexOrder: {
    id: 'order-004',
    code: 'ORD-004',
    tableId: 't8',
    customerId: 'fake-customer-001',
    items: [
      { menuItemId: 'item-006', quantity: 2 }, // 2 Bistecche
      { menuItemId: 'item-004', quantity: 2 }, // 2 Amatriciana
      { menuItemId: 'item-002', quantity: 1 }, // Pizza Diavola
      { menuItemId: 'bev-005', quantity: 4 },  // 4 Vini
      { menuItemId: 'bev-008', quantity: 2 },  // 2 Acqua
      { menuItemId: 'item-007', quantity: 3 }, // 3 Tiramisù
    ],
    status: 'pending',
    total: 104.00,
    createdAt: new Date(),
  },
};

// ============================================
// FAKE REQUESTS (Hot Actions)
// ============================================

export type RequestType = 'call_waiter' | 'request_bill' | 'report_problem' | 'other';
export type RequestPriority = 'low' | 'medium' | 'high';

export interface FakeRequest {
  id: string;
  tableId: string;
  type: RequestType;
  priority: RequestPriority;
  message?: string;
  status: 'pending' | 'acknowledged' | 'completed';
  createdAt: Date;
}

export const FAKE_REQUESTS: FakeRequest[] = [
  {
    id: 'req-001',
    tableId: 't5',
    type: 'call_waiter',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
  },
  {
    id: 'req-002',
    tableId: 't3',
    type: 'request_bill',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
  },
  {
    id: 'req-003',
    tableId: 't6',
    type: 'report_problem',
    priority: 'high',
    message: 'Wrong dish served',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 60 * 1000), // 1 min ago
  },
];

// ============================================
// WAITER ASSIGNMENTS
// ============================================

export interface FakeAssignment {
  waiterId: string;
  tableIds: string[];
  zone?: string;
}

export const FAKE_ASSIGNMENTS: FakeAssignment[] = [
  {
    waiterId: 'fake-waiter-001', // Mario
    tableIds: ['t1', 't2', 't3', 't4'], // Sala Interna
    zone: 'zone-interno',
  },
  {
    waiterId: 'fake-waiter-002', // Luigi
    tableIds: ['t5', 't6', 't7', 't8'], // Terrazza
    zone: 'zone-esterno',
  },
  {
    waiterId: 'fake-waiter-003', // Peach
    tableIds: ['t9', 't10'], // Bar
    zone: 'zone-bar',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTableById(tableId: string): FakeTable | undefined {
  return FAKE_LOCATION.tables.find(t => t.id === tableId);
}

export function getMenuItemById(itemId: string): FakeMenuItem | undefined {
  return FAKE_MENU.find(i => i.id === itemId);
}

export function getWaiterForTable(tableId: string): FakeAccount | undefined {
  const assignment = FAKE_ASSIGNMENTS.find(a => a.tableIds.includes(tableId));
  if (!assignment) return undefined;
  return Object.values(FAKE_ACCOUNTS).find(a => a.id === assignment.waiterId);
}

export function getBeverageItems(): FakeMenuItem[] {
  return FAKE_MENU.filter(i => i.isBeverage);
}

export function getFoodItems(): FakeMenuItem[] {
  return FAKE_MENU.filter(i => !i.isBeverage);
}

export function calculateOrderTotal(items: FakeOrderItem[]): number {
  return items.reduce((sum, item) => {
    const menuItem = getMenuItemById(item.menuItemId);
    return sum + (menuItem?.price || 0) * item.quantity;
  }, 0);
}
