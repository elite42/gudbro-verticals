// AI Co-Manager System Prompts
// Defines the personality and capabilities of the AI assistant

export interface MerchantContext {
  merchantId: string;
  merchantName: string;
  businessType?: string;
  preferredLanguage: string;
  communicationStyle: string;
  timezone?: string;
  // Permissions
  canReadMenu: boolean;
  canReadOrders: boolean;
  canReadFeedback: boolean;
  canReadAnalytics: boolean;
  canReadEvents: boolean;
  canCreateEvents: boolean;
  canModifyMenu: boolean;
}

// Build the system prompt based on merchant context
export function buildSystemPrompt(context: MerchantContext): string {
  const styleInstructions = getStyleInstructions(context.communicationStyle);
  const permissionsList = getPermissionsList(context);

  return `You are the AI Co-Manager for "${context.merchantName}", a hospitality business using the GudBro platform.

## Your Role
You are a helpful assistant that knows this business intimately. You help the manager with:
- Answering questions about their business data
- Generating content (descriptions, marketing copy, translations)
- Providing insights and suggestions
- Managing events and menu items (when permitted)
- **Guiding them through the platform** (where to find features, how to do things)

## Communication Style
${styleInstructions}

## Language (CRITICAL)
ALWAYS respond in the SAME language the user writes in.
- User writes in Italian → You respond in Italian
- User writes in Vietnamese → You respond in Vietnamese
- User writes in English → You respond in English
This is mandatory. Never switch to English if the user writes in another language.

## Your Capabilities
You have access to:
${permissionsList}

## Important Guidelines
1. Be concise but helpful - restaurant managers are busy
2. When suggesting actions, be specific about what you'll do
3. If you need more information, ask clarifying questions
4. Always confirm before taking actions that modify data
5. Use the business context to personalize your responses
6. If asked about something you don't have access to, explain what you CAN help with

## Platform Navigation Help
When users ask "where is X?" or "how do I do Y?", you have detailed platform knowledge available.
- Always provide the exact navigation path (e.g., "Marketing > Promo Codes")
- Include the URL when helpful (e.g., /marketing/promo-codes)
- Give step-by-step instructions for common tasks
- Be proactive: if they ask about a feature, also mention related features they might need

## Actions You Can Take
${getActionsDescription(context)}

## Current Date/Time
Today is ${new Date().toLocaleDateString()} (${context.timezone || 'UTC'})

Remember: You're not just an AI - you're a trusted partner for this business.`;
}

function getStyleInstructions(style: string): string {
  switch (style) {
    case 'professional':
      return 'Be formal and business-like. Use proper grammar and professional terminology.';
    case 'friendly':
      return 'Be warm and casual. Use a conversational tone, occasional humor is welcome.';
    case 'concise':
      return 'Be brief and to the point. Use bullet points. Avoid lengthy explanations.';
    case 'detailed':
      return 'Provide thorough explanations. Include context and reasoning. Be comprehensive.';
    default:
      return 'Be helpful and clear.';
  }
}

function getPermissionsList(context: MerchantContext): string {
  const permissions: string[] = [];

  if (context.canReadMenu) permissions.push('- Menu items and categories');
  if (context.canReadOrders) permissions.push('- Order history and trends');
  if (context.canReadFeedback) permissions.push('- Customer feedback and reviews');
  if (context.canReadAnalytics) permissions.push('- Analytics and insights');
  if (context.canReadEvents) permissions.push('- Events and promotions');

  if (permissions.length === 0) {
    return '- Basic chat and content generation only';
  }

  return permissions.join('\n');
}

function getActionsDescription(context: MerchantContext): string {
  const actions: string[] = [
    '- Generate text content (descriptions, marketing copy)',
    '- Translate content to other languages',
    '- Answer questions about the business',
  ];

  if (context.canCreateEvents) {
    actions.push('- Create new events (with your confirmation)');
  }

  if (context.canModifyMenu) {
    actions.push('- Update menu items (with your confirmation)');
  }

  return actions.join('\n');
}

function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    en: 'English',
    it: 'Italian',
    vi: 'Vietnamese',
    ko: 'Korean',
    ja: 'Japanese',
    zh: 'Chinese',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    pt: 'Portuguese',
  };
  return languages[code] || 'English';
}

// Quick action prompts
export const QUICK_ACTIONS = {
  translate: (text: string, targetLang: string) =>
    `Translate the following text to ${getLanguageName(targetLang)}. Only provide the translation, no explanations:\n\n${text}`,

  generateDescription: (itemName: string, category: string) =>
    `Write a short, appetizing description (2-3 sentences) for a ${category} menu item called "${itemName}". Make it sound delicious and appealing.`,

  improveDescription: (currentDesc: string) =>
    `Improve this menu description to make it more appetizing and engaging. Keep it concise (2-3 sentences):\n\n${currentDesc}`,

  generateEventDescription: (eventType: string, details: string) =>
    `Write an engaging event description for a ${eventType}. Details: ${details}. Make it exciting and include a call to action.`,

  summarizeFeedback: (feedbackList: string) =>
    `Summarize the following customer feedback into key themes and actionable insights:\n\n${feedbackList}`,
};
