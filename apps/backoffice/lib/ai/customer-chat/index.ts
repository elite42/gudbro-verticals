// Customer Chat Module
// AI-powered chat for customer-facing interactions

export {
  customerChat,
  closeConversation,
  type CustomerChatRequest,
  type CustomerChatResponse,
  type CustomerChatMessage,
} from './customer-chat-service';

export {
  fetchCustomerContext,
  formatCustomerKnowledge,
  type CustomerContext,
} from './customer-context-service';

export { buildCustomerSystemPrompt, SCENARIO_PROMPTS } from './customer-prompts';

export {
  executeCustomerAction,
  CUSTOMER_CHAT_TOOLS,
  type CustomerActionResult,
} from './customer-actions-service';

export {
  routeIncomingMessage,
  parseWhatsAppWebhook,
  parseTelegramWebhook,
  parseLINEWebhook,
  parseZaloWebhook,
  type IncomingMessage,
} from './channel-router';
