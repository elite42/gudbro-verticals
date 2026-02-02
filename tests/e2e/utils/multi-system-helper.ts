/**
 * Multi-System Test Helper
 *
 * Utilities for coordinating tests across all systems:
 * - Backoffice (:3023)
 * - Waiter PWA (:3005)
 * - Customer PWA (:3004)
 * - Kitchen Display (:3023/orders/kitchen)
 * - Bar Display (:3023/orders/bar)
 */

// ============================================
// SYSTEM CONFIGURATION
// ============================================

export const SYSTEMS = {
  backoffice: {
    name: 'Backoffice',
    baseUrl: 'http://localhost:3023',
    healthCheck: '/api/health',
    loginPath: '/login',
    dashboardPath: '/',
  },
  waiter: {
    name: 'Waiter PWA',
    baseUrl: 'http://localhost:3005',
    healthCheck: '/api/health',
    loginPath: '/login',
    dashboardPath: '/',
    tablesPath: '/tables',
    requestsPath: '/requests',
    ordersPath: '/orders',
    scanPath: '/scan',
  },
  customer: {
    name: 'Customer PWA',
    baseUrl: 'http://localhost:3004',
    healthCheck: '/api/health',
    menuPath: '/',
    cartPath: '/cart',
    orderPath: '/order',
  },
  kitchen: {
    name: 'Kitchen Display',
    baseUrl: 'http://localhost:3023',
    path: '/orders/kitchen',
  },
  bar: {
    name: 'Bar Display',
    baseUrl: 'http://localhost:3023',
    path: '/orders/bar',
  },
} as const;

export type SystemName = keyof typeof SYSTEMS;

// ============================================
// HEALTH CHECK
// ============================================

export interface SystemStatus {
  name: string;
  url: string;
  isUp: boolean;
  responseTime?: number;
  error?: string;
}

/**
 * Check if a system is running
 */
export async function checkSystemHealth(system: SystemName): Promise<SystemStatus> {
  const config = SYSTEMS[system];
  const url = 'healthCheck' in config
    ? `${config.baseUrl}${config.healthCheck}`
    : `${config.baseUrl}${config.path}`;

  const startTime = Date.now();

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });

    return {
      name: config.name,
      url,
      isUp: response.ok,
      responseTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      name: config.name,
      url,
      isUp: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check all systems
 */
export async function checkAllSystems(): Promise<SystemStatus[]> {
  const systems: SystemName[] = ['backoffice', 'waiter', 'customer', 'kitchen', 'bar'];
  return Promise.all(systems.map(checkSystemHealth));
}

/**
 * Wait for all systems to be ready
 */
export async function waitForAllSystems(
  maxRetries = 30,
  retryDelay = 1000
): Promise<{ allUp: boolean; statuses: SystemStatus[] }> {
  for (let i = 0; i < maxRetries; i++) {
    const statuses = await checkAllSystems();
    const allUp = statuses.every(s => s.isUp);

    if (allUp) {
      return { allUp: true, statuses };
    }

    console.log(`[Attempt ${i + 1}/${maxRetries}] Waiting for systems...`);
    statuses.filter(s => !s.isUp).forEach(s => {
      console.log(`  ❌ ${s.name}: ${s.error || 'Not responding'}`);
    });

    await new Promise(resolve => setTimeout(resolve, retryDelay));
  }

  const finalStatuses = await checkAllSystems();
  return { allUp: false, statuses: finalStatuses };
}

// ============================================
// TEST COORDINATION
// ============================================

export interface TestEvent {
  timestamp: Date;
  system: SystemName;
  action: string;
  data?: Record<string, unknown>;
}

/**
 * Event log for tracking test flow across systems
 */
class TestEventLog {
  private events: TestEvent[] = [];

  log(system: SystemName, action: string, data?: Record<string, unknown>) {
    this.events.push({
      timestamp: new Date(),
      system,
      action,
      data,
    });
  }

  getEvents(): TestEvent[] {
    return [...this.events];
  }

  getEventsBySystem(system: SystemName): TestEvent[] {
    return this.events.filter(e => e.system === system);
  }

  clear() {
    this.events = [];
  }

  printTimeline() {
    console.log('\n📋 Test Timeline:');
    console.log('─'.repeat(60));

    this.events.forEach((event, index) => {
      const time = event.timestamp.toISOString().split('T')[1].split('.')[0];
      const systemEmoji = {
        backoffice: '🏢',
        waiter: '👔',
        customer: '👤',
        kitchen: '🍳',
        bar: '🍹',
      }[event.system];

      console.log(`${index + 1}. [${time}] ${systemEmoji} ${event.system}: ${event.action}`);
      if (event.data) {
        console.log(`   └── ${JSON.stringify(event.data)}`);
      }
    });

    console.log('─'.repeat(60));
  }
}

export const testEventLog = new TestEventLog();

// ============================================
// WAIT UTILITIES
// ============================================

/**
 * Wait for a condition to be true
 */
export async function waitFor(
  condition: () => Promise<boolean>,
  options: { timeout?: number; interval?: number; description?: string } = {}
): Promise<boolean> {
  const { timeout = 10000, interval = 500, description = 'condition' } = options;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  console.warn(`⚠️ Timeout waiting for: ${description}`);
  return false;
}

/**
 * Wait for an order to reach a specific status
 */
export async function waitForOrderStatus(
  orderId: string,
  expectedStatus: string,
  timeout = 30000
): Promise<boolean> {
  return waitFor(
    async () => {
      // In real implementation, would check database or API
      // For now, this is a placeholder
      return false;
    },
    { timeout, description: `order ${orderId} to be ${expectedStatus}` }
  );
}

/**
 * Wait for a notification to arrive
 */
export async function waitForNotification(
  system: SystemName,
  type: string,
  timeout = 15000
): Promise<boolean> {
  return waitFor(
    async () => {
      // In real implementation, would check notification system
      return false;
    },
    { timeout, description: `${type} notification on ${system}` }
  );
}

// ============================================
// TEST SCENARIO HELPERS
// ============================================

export interface ScenarioStep {
  system: SystemName;
  action: string;
  description: string;
  execute: () => Promise<void>;
  verify?: () => Promise<boolean>;
}

/**
 * Run a multi-system test scenario
 */
export async function runScenario(
  name: string,
  steps: ScenarioStep[]
): Promise<{ success: boolean; failedStep?: number; error?: string }> {
  console.log(`\n🎬 Starting Scenario: ${name}`);
  console.log('═'.repeat(60));

  testEventLog.clear();

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`\n[Step ${i + 1}/${steps.length}] ${step.description}`);
    console.log(`   System: ${step.system} | Action: ${step.action}`);

    try {
      // Execute the step
      await step.execute();
      testEventLog.log(step.system, step.action);

      // Verify if needed
      if (step.verify) {
        const verified = await step.verify();
        if (!verified) {
          console.log(`   ❌ Verification failed`);
          return { success: false, failedStep: i + 1, error: 'Verification failed' };
        }
      }

      console.log(`   ✅ Complete`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.log(`   ❌ Error: ${errorMsg}`);
      return { success: false, failedStep: i + 1, error: errorMsg };
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`✅ Scenario "${name}" completed successfully!`);

  testEventLog.printTimeline();

  return { success: true };
}

// ============================================
// DEV MODE AUTH HELPERS
// ============================================

/**
 * Set dev session cookie for a system
 */
export function createDevSessionCookie(account: {
  id: string;
  email: string;
  name: string;
  role: string;
  locationId?: string;
}): string {
  return encodeURIComponent(JSON.stringify(account));
}

/**
 * Get dev login URL for waiter app
 */
export function getWaiterDevLoginUrl(accountId: string): string {
  return `${SYSTEMS.waiter.baseUrl}${SYSTEMS.waiter.loginPath}?devAccount=${accountId}`;
}

// ============================================
// REPORT GENERATION
// ============================================

export interface TestReport {
  scenarioName: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  success: boolean;
  systemStatuses: SystemStatus[];
  events: TestEvent[];
  errors: string[];
}

export function generateReport(
  scenarioName: string,
  startTime: Date,
  success: boolean,
  errors: string[] = []
): TestReport {
  const endTime = new Date();

  return {
    scenarioName,
    startTime,
    endTime,
    duration: endTime.getTime() - startTime.getTime(),
    success,
    systemStatuses: [], // Would be populated from health checks
    events: testEventLog.getEvents(),
    errors,
  };
}

export function printReport(report: TestReport) {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 TEST REPORT');
  console.log('═'.repeat(60));
  console.log(`Scenario: ${report.scenarioName}`);
  console.log(`Status: ${report.success ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Duration: ${report.duration}ms`);
  console.log(`Events: ${report.events.length}`);

  if (report.errors.length > 0) {
    console.log('\nErrors:');
    report.errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
  }

  console.log('═'.repeat(60));
}
