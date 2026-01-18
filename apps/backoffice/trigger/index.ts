/**
 * Trigger.dev Tasks Index
 *
 * Exports all background jobs for the GUDBRO backoffice.
 */

// Notifications
export {
  notificationQueueProcessor,
  processNotificationQueueTask,
} from './notifications/process-queue';
export { sendNotification } from './notifications/send-notification';

// AI
export {
  dailyBriefingGenerator,
  generateBriefingsTask,
  generateMerchantBriefingTask,
} from './ai/daily-briefing';
export { alertsChecker, checkAlertsTask, checkMerchantAlertsTask } from './ai/check-alerts';
export { generateSocialContentTask, generateBatchSocialContentTask } from './ai/social-content';

// Analytics
export {
  analyticsDailyAggregate,
  aggregateDailyAnalyticsTask,
  backfillAnalyticsTask,
} from './analytics/aggregate-daily';
export {
  refreshAnalyticsViews,
  refreshViewsTask,
  refreshSingleViewTask,
} from './analytics/refresh-views';
