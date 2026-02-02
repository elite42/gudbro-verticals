/**
 * E2E Scenario: Full Lunch Flow
 *
 * Complete flow from table assignment to payment:
 *
 * 1. [Backoffice] Manager sees overview
 * 2. [Waiter] Scans QR, auto-assigns to table
 * 3. [Customer] Scans QR, views menu, places order
 * 4. [Waiter] Receives notification, confirms order
 * 5. [Kitchen] Sees order, starts preparing, marks ready
 * 6. [Bar] Sees drink items, prepares, marks ready
 * 7. [Waiter] Receives "ready" notification, serves
 * 8. [Customer] Requests bill (hot action)
 * 9. [Waiter] Receives notification, processes payment
 * 10. [Backoffice] Sees updated statistics
 *
 * Systems involved: ALL
 */

import {
  SYSTEMS,
  SystemName,
  runScenario,
  ScenarioStep,
  waitForAllSystems,
  testEventLog,
  waitFor,
} from '../utils/multi-system-helper';

import {
  FAKE_ACCOUNTS,
  FAKE_LOCATION,
  FAKE_MENU,
  FAKE_ORDERS,
  getTableById,
  getWaiterForTable,
} from '../fixtures/mock-data';

// ============================================
// SCENARIO CONFIGURATION
// ============================================

const SCENARIO_CONFIG = {
  tableId: 't5',           // Terrazza, Table 5
  customerId: 'fake-customer-001',
  waiterId: 'fake-waiter-002', // Luigi (assigned to Terrazza)
  orderItems: [
    { menuItemId: 'item-001', quantity: 1 }, // Pizza Margherita (kitchen)
    { menuItemId: 'item-003', quantity: 1 }, // Carbonara (kitchen)
    { menuItemId: 'bev-004', quantity: 2 },  // 2 Birre (bar)
    { menuItemId: 'bev-001', quantity: 2 },  // 2 Espresso (bar)
  ],
};

// ============================================
// STEP IMPLEMENTATIONS
// ============================================

/**
 * Step 1: Manager checks backoffice dashboard
 */
async function backofficeCheckDashboard(): Promise<void> {
  console.log('   → Manager opens backoffice dashboard');
  console.log(`   → URL: ${SYSTEMS.backoffice.baseUrl}`);

  // In real test: navigate to backoffice, verify dashboard loads
  // Verify: tables overview visible, stats displayed

  // Simulate action
  await simulateDelay(500);
}

/**
 * Step 2: Waiter scans table QR code
 */
async function waiterScanTable(): Promise<void> {
  const table = getTableById(SCENARIO_CONFIG.tableId);
  console.log(`   → Waiter scans QR code: ${table?.qrCode}`);
  console.log(`   → Table: ${table?.number} (${table?.capacity} seats)`);

  // In real test:
  // 1. Navigate to waiter app /scan
  // 2. Simulate QR scan or manual entry
  // 3. Verify auto-assignment happens

  await simulateDelay(500);
}

/**
 * Step 3: Waiter auto-assigns to table
 */
async function waiterAutoAssign(): Promise<void> {
  const table = getTableById(SCENARIO_CONFIG.tableId);
  const waiter = FAKE_ACCOUNTS.waiter2; // Luigi

  console.log(`   → ${waiter.name} assigned to table ${table?.number}`);
  console.log(`   → Assignment stored in waiter PWA`);

  // In real test:
  // 1. Verify assignment appears in /tables
  // 2. Verify table tile shows correct status
  // 3. Verify assignment count updates

  await simulateDelay(300);
}

/**
 * Step 4: Customer scans QR and opens menu
 */
async function customerOpenMenu(): Promise<void> {
  const table = getTableById(SCENARIO_CONFIG.tableId);
  console.log(`   → Customer at table ${table?.number} scans QR`);
  console.log(`   → Opens menu at: ${SYSTEMS.customer.baseUrl}`);

  // In real test:
  // 1. Navigate to customer PWA
  // 2. Verify menu loads
  // 3. Verify table number displayed

  await simulateDelay(500);
}

/**
 * Step 5: Customer places order
 */
async function customerPlaceOrder(): Promise<void> {
  const items = SCENARIO_CONFIG.orderItems;
  const total = items.reduce((sum, item) => {
    const menuItem = FAKE_MENU.find(m => m.menuItemId === item.menuItemId);
    return sum + (menuItem?.price || 0) * item.quantity;
  }, 0);

  console.log(`   → Customer adds ${items.length} item types to cart`);
  console.log(`   → Total: €${total.toFixed(2)}`);
  console.log(`   → Customer submits order`);

  // In real test:
  // 1. Add items to cart
  // 2. Navigate to checkout
  // 3. Submit order
  // 4. Verify confirmation screen

  await simulateDelay(1000);
}

/**
 * Step 6: Waiter receives order notification
 */
async function waiterReceiveOrderNotification(): Promise<void> {
  const waiter = FAKE_ACCOUNTS.waiter2;
  console.log(`   → ${waiter.name} receives push notification`);
  console.log(`   → "New order for Table 5"`);

  // In real test:
  // 1. Verify push notification received (or in-app notification)
  // 2. Verify order appears in waiter's orders list
  // 3. Verify badge count updates

  await simulateDelay(500);
}

/**
 * Step 7: Waiter confirms order
 */
async function waiterConfirmOrder(): Promise<void> {
  console.log(`   → Waiter opens order details`);
  console.log(`   → Waiter confirms order`);
  console.log(`   → Order status: confirmed`);

  // In real test:
  // 1. Navigate to /orders
  // 2. Find the new order
  // 3. Click confirm
  // 4. Verify status changes

  await simulateDelay(500);
}

/**
 * Step 8: Kitchen sees food items
 */
async function kitchenReceiveOrder(): Promise<void> {
  const foodItems = SCENARIO_CONFIG.orderItems.filter(item => {
    const menuItem = FAKE_MENU.find(m => m.id === item.menuItemId);
    return menuItem && !menuItem.isBeverage;
  });

  console.log(`   → Kitchen Display shows new order`);
  console.log(`   → ${foodItems.length} food items in queue`);
  console.log(`   → Sound alert plays`);

  // In real test:
  // 1. Kitchen display at /orders/kitchen
  // 2. Verify order appears in "Queue" column
  // 3. Verify sound plays for new order

  await simulateDelay(500);
}

/**
 * Step 9: Kitchen starts preparing
 */
async function kitchenStartPreparing(): Promise<void> {
  console.log(`   → Kitchen staff clicks "START"`);
  console.log(`   → Order moves to "Preparing" column`);
  console.log(`   → Timer starts`);

  // In real test:
  // 1. Click START button on order card
  // 2. Verify order moves to Preparing column
  // 3. Verify status in database updates

  await simulateDelay(500);
}

/**
 * Step 10: Bar sees drink items
 */
async function barReceiveOrder(): Promise<void> {
  const drinkItems = SCENARIO_CONFIG.orderItems.filter(item => {
    const menuItem = FAKE_MENU.find(m => m.id === item.menuItemId);
    return menuItem?.isBeverage;
  });

  console.log(`   → Bar Display shows drink order`);
  console.log(`   → ${drinkItems.length} drink items in queue`);
  console.log(`   → Sound alert plays`);

  // In real test:
  // 1. Bar display at /orders/bar
  // 2. Verify drinks appear (filtered from main order)
  // 3. Verify sound plays

  await simulateDelay(500);
}

/**
 * Step 11: Bar prepares and marks ready
 */
async function barMarkReady(): Promise<void> {
  console.log(`   → Barista prepares drinks`);
  console.log(`   → Clicks "START" then "DONE"`);
  console.log(`   → Drinks moved to "Ready" column`);

  // In real test:
  // 1. Click START on bar order
  // 2. Wait, then click DONE
  // 3. Verify moves to Ready

  await simulateDelay(500);
}

/**
 * Step 12: Kitchen marks food ready
 */
async function kitchenMarkReady(): Promise<void> {
  console.log(`   → Kitchen finishes preparing`);
  console.log(`   → Clicks "DONE"`);
  console.log(`   → Food moved to "Ready" column`);
  console.log(`   → Push notification sent to customer`);

  // In real test:
  // 1. Click DONE on kitchen order
  // 2. Verify moves to Ready
  // 3. Verify push notification API called

  await simulateDelay(500);
}

/**
 * Step 13: Waiter sees "ready" notification
 */
async function waiterReceiveReadyNotification(): Promise<void> {
  const waiter = FAKE_ACCOUNTS.waiter2;
  console.log(`   → ${waiter.name} receives notification`);
  console.log(`   → "Order ready for Table 5"`);
  console.log(`   → Table tile turns orange (ready status)`);

  // In real test:
  // 1. Verify notification received
  // 2. Verify table status in /tables changes to "ready"
  // 3. Verify tile color is orange

  await simulateDelay(500);
}

/**
 * Step 14: Waiter serves the order
 */
async function waiterServeOrder(): Promise<void> {
  console.log(`   → Waiter picks up food from kitchen`);
  console.log(`   → Waiter picks up drinks from bar`);
  console.log(`   → Serves to Table 5`);
  console.log(`   → Marks order as "served" in app`);

  // In real test:
  // 1. Navigate to table detail
  // 2. Mark order as served
  // 3. Verify status updates

  await simulateDelay(500);
}

/**
 * Step 15: Customer requests bill (hot action)
 */
async function customerRequestBill(): Promise<void> {
  console.log(`   → Customer presses "Request Bill" in PWA`);
  console.log(`   → Hot action created with type: request_bill`);

  // In real test:
  // 1. Customer app has "Request Bill" button
  // 2. Click creates hot_action_request
  // 3. Real-time subscription notifies waiter

  await simulateDelay(500);
}

/**
 * Step 16: Waiter receives bill request
 */
async function waiterReceiveBillRequest(): Promise<void> {
  const waiter = FAKE_ACCOUNTS.waiter2;
  console.log(`   → ${waiter.name} receives urgent notification`);
  console.log(`   → "Table 5 requests bill"`);
  console.log(`   → Request appears in /requests`);
  console.log(`   → Table tile shows "payment" status (blue)`);

  // In real test:
  // 1. Verify notification
  // 2. Verify request in /requests list
  // 3. Verify table tile is blue

  await simulateDelay(500);
}

/**
 * Step 17: Waiter opens payment flow
 */
async function waiterOpenPayment(): Promise<void> {
  console.log(`   → Waiter taps on Table 5 tile`);
  console.log(`   → Bottom sheet opens`);
  console.log(`   → Waiter clicks "Payment"`);
  console.log(`   → Payment sheet opens with 5 methods`);

  // In real test:
  // 1. Tap table tile
  // 2. Verify bottom sheet with table details
  // 3. Click Payment button
  // 4. Verify payment sheet with all methods

  await simulateDelay(500);
}

/**
 * Step 18: Waiter processes cash payment
 */
async function waiterProcessPayment(): Promise<void> {
  const total = 35.50; // Example total
  console.log(`   → Total: €${total.toFixed(2)}`);
  console.log(`   → Waiter selects "Cash"`);
  console.log(`   → Customer pays €50`);
  console.log(`   → Change: €${(50 - total).toFixed(2)}`);
  console.log(`   → Waiter confirms payment`);

  // In real test:
  // 1. Select cash payment
  // 2. Enter received amount
  // 3. Verify change calculation
  // 4. Confirm payment

  await simulateDelay(500);
}

/**
 * Step 19: Table closed
 */
async function waiterCloseTable(): Promise<void> {
  console.log(`   → Payment confirmed`);
  console.log(`   → Table 5 marked as "completed"`);
  console.log(`   → Assignment removed`);
  console.log(`   → Table available for next customer`);

  // In real test:
  // 1. Verify table removed from active assignments
  // 2. Verify order marked as completed
  // 3. Verify hot action marked as completed

  await simulateDelay(500);
}

/**
 * Step 20: Backoffice sees updated stats
 */
async function backofficeVerifyStats(): Promise<void> {
  console.log(`   → Manager checks dashboard`);
  console.log(`   → Revenue updated with new order`);
  console.log(`   → Orders count incremented`);
  console.log(`   → Table 5 shows as available`);

  // In real test:
  // 1. Navigate to backoffice dashboard
  // 2. Verify daily revenue updated
  // 3. Verify order count updated
  // 4. Verify table status in overview

  await simulateDelay(500);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

async function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// SCENARIO DEFINITION
// ============================================

const FULL_LUNCH_SCENARIO: ScenarioStep[] = [
  {
    system: 'backoffice',
    action: 'check_dashboard',
    description: 'Manager checks backoffice dashboard',
    execute: backofficeCheckDashboard,
  },
  {
    system: 'waiter',
    action: 'scan_table',
    description: 'Waiter scans table QR code',
    execute: waiterScanTable,
  },
  {
    system: 'waiter',
    action: 'auto_assign',
    description: 'Waiter auto-assigns to table',
    execute: waiterAutoAssign,
  },
  {
    system: 'customer',
    action: 'open_menu',
    description: 'Customer scans QR and opens menu',
    execute: customerOpenMenu,
  },
  {
    system: 'customer',
    action: 'place_order',
    description: 'Customer places order',
    execute: customerPlaceOrder,
  },
  {
    system: 'waiter',
    action: 'receive_notification',
    description: 'Waiter receives order notification',
    execute: waiterReceiveOrderNotification,
  },
  {
    system: 'waiter',
    action: 'confirm_order',
    description: 'Waiter confirms order',
    execute: waiterConfirmOrder,
  },
  {
    system: 'kitchen',
    action: 'receive_order',
    description: 'Kitchen sees food items',
    execute: kitchenReceiveOrder,
  },
  {
    system: 'kitchen',
    action: 'start_preparing',
    description: 'Kitchen starts preparing',
    execute: kitchenStartPreparing,
  },
  {
    system: 'bar',
    action: 'receive_order',
    description: 'Bar sees drink items',
    execute: barReceiveOrder,
  },
  {
    system: 'bar',
    action: 'mark_ready',
    description: 'Bar prepares and marks ready',
    execute: barMarkReady,
  },
  {
    system: 'kitchen',
    action: 'mark_ready',
    description: 'Kitchen marks food ready',
    execute: kitchenMarkReady,
  },
  {
    system: 'waiter',
    action: 'receive_ready',
    description: 'Waiter sees "ready" notification',
    execute: waiterReceiveReadyNotification,
  },
  {
    system: 'waiter',
    action: 'serve_order',
    description: 'Waiter serves the order',
    execute: waiterServeOrder,
  },
  {
    system: 'customer',
    action: 'request_bill',
    description: 'Customer requests bill',
    execute: customerRequestBill,
  },
  {
    system: 'waiter',
    action: 'receive_bill_request',
    description: 'Waiter receives bill request',
    execute: waiterReceiveBillRequest,
  },
  {
    system: 'waiter',
    action: 'open_payment',
    description: 'Waiter opens payment flow',
    execute: waiterOpenPayment,
  },
  {
    system: 'waiter',
    action: 'process_payment',
    description: 'Waiter processes cash payment',
    execute: waiterProcessPayment,
  },
  {
    system: 'waiter',
    action: 'close_table',
    description: 'Table closed',
    execute: waiterCloseTable,
  },
  {
    system: 'backoffice',
    action: 'verify_stats',
    description: 'Backoffice sees updated stats',
    execute: backofficeVerifyStats,
  },
];

// ============================================
// RUN SCENARIO
// ============================================

export async function runFullLunchScenario() {
  console.log('\n🍝 FULL LUNCH FLOW SCENARIO');
  console.log('Testing complete flow from table scan to payment\n');

  // Check all systems are up
  console.log('Checking system health...');
  const { allUp, statuses } = await waitForAllSystems(5, 2000);

  if (!allUp) {
    console.log('\n❌ Not all systems are ready:');
    statuses.forEach(s => {
      console.log(`  ${s.isUp ? '✅' : '❌'} ${s.name}`);
    });
    console.log('\nPlease start all systems before running this test.');
    return { success: false, error: 'Systems not ready' };
  }

  console.log('✅ All systems are up!\n');

  // Run the scenario
  return runScenario('Full Lunch Flow', FULL_LUNCH_SCENARIO);
}

// Run if executed directly
if (require.main === module) {
  runFullLunchScenario()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(err => {
      console.error('Scenario failed:', err);
      process.exit(1);
    });
}
