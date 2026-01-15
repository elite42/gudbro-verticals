/**
 * AI Onboarding Chat Service
 *
 * Conversational onboarding for new merchants.
 * The AI asks questions and captures business information naturally.
 */

import { getOpenAIClient, ONBOARDING_MODEL, MAX_ONBOARDING_TOKENS } from './openai';
import { getSupabase } from '@/lib/supabase-lazy';
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources/chat/completions';

// Onboarding conversation message
export interface OnboardingMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Request for chat
export interface OnboardingChatRequest {
  sessionToken: string;
  message: string;
  conversationHistory?: OnboardingMessage[];
}

// Response from chat
export interface OnboardingChatResponse {
  message: string;
  updatedFields?: Record<string, unknown>;
  conversationHistory: OnboardingMessage[];
  completionPercentage: number;
  isComplete: boolean;
  error?: string;
}

// Session data structure
interface OnboardingSessionData {
  id: string;
  email: string;
  business_name: string | null;
  business_type: string | null;
  country_code: string | null;
  city: string | null;
  brand_name: string | null;
  location_name: string | null;
  location_address: string | null;
  primary_color: string | null;
  phone: string | null;
  selected_plan: string | null;
  first_name: string | null;
  last_name: string | null;
  is_completed: boolean;
  expires_at: string;
}

// Fields to capture during onboarding
const ONBOARDING_FIELDS = [
  { key: 'business_name', label: 'Business Name', required: true, priority: 1 },
  { key: 'business_type', label: 'Business Type', required: true, priority: 2 },
  { key: 'country_code', label: 'Country', required: true, priority: 3 },
  { key: 'city', label: 'City', required: false, priority: 4 },
  { key: 'location_address', label: 'Address', required: false, priority: 5 },
  { key: 'phone', label: 'Phone', required: false, priority: 6 },
  { key: 'primary_color', label: 'Brand Color', required: false, priority: 7 },
];

// OpenAI tools for field capture
const ONBOARDING_TOOLS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'save_business_info',
      description:
        'Save business information captured from the conversation. Call this when the user provides any business details.',
      parameters: {
        type: 'object',
        properties: {
          business_name: {
            type: 'string',
            description: 'The name of the business (e.g., "La Dolce Vita Cafe")',
          },
          business_type: {
            type: 'string',
            enum: ['fnb', 'hotel', 'rental', 'wellness', 'other'],
            description:
              'Type of business: fnb (restaurant/cafe), hotel, rental (vacation rental), wellness (spa), other',
          },
          country_code: {
            type: 'string',
            description:
              'ISO 2-letter country code (e.g., "IT" for Italy, "US" for USA, "VN" for Vietnam)',
          },
          city: {
            type: 'string',
            description: 'City name (e.g., "Rome", "New York")',
          },
          location_address: {
            type: 'string',
            description: 'Street address of the business',
          },
          phone: {
            type: 'string',
            description: 'Contact phone number with country code',
          },
          primary_color: {
            type: 'string',
            description: 'Brand primary color as hex code (e.g., "#FF5733")',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_progress',
      description: 'Check what information has been collected so far and what is still needed.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];

/**
 * Build system prompt for onboarding conversation
 */
function buildSystemPrompt(session: OnboardingSessionData): string {
  const collectedFields: string[] = [];
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  for (const field of ONBOARDING_FIELDS) {
    const value = session[field.key as keyof OnboardingSessionData];
    if (value) {
      collectedFields.push(`- ${field.label}: ${value}`);
    } else if (field.required) {
      missingRequired.push(field.label);
    } else {
      missingOptional.push(field.label);
    }
  }

  const nextField = missingRequired[0] || missingOptional[0] || null;

  return `You are an AI assistant helping a new merchant set up their business on GudBro, a digital menu and ordering platform.

Your goal is to collect business information through natural conversation. Be friendly, encouraging, and professional.

## Current Session
Email: ${session.email}
${session.first_name ? `Name: ${session.first_name} ${session.last_name || ''}` : ''}

## Information Collected
${collectedFields.length > 0 ? collectedFields.join('\n') : '- Nothing yet'}

## Still Needed
Required: ${missingRequired.length > 0 ? missingRequired.join(', ') : 'All required fields complete!'}
Optional: ${missingOptional.length > 0 ? missingOptional.join(', ') : 'None'}

## Guidelines
1. Ask for ONE piece of information at a time
2. When the user provides information, use save_business_info to save it
3. Confirm what was saved and move to the next field
4. ${nextField ? `Focus on getting: ${nextField}` : 'All critical fields complete - ask if they want to add optional details or proceed to setup'}
5. Be conversational and helpful - avoid sounding like a form
6. For business_type, explain the options naturally (restaurant/cafe, hotel, vacation rental, wellness/spa, other)
7. For country, accept country names and convert to codes
8. When all required fields are done, congratulate them and explain next steps

## Language
Respond in the same language the user writes in. If they write in Italian, respond in Italian. Default to English.`;
}

/**
 * Calculate completion percentage
 */
function calculateCompletion(session: OnboardingSessionData): {
  percentage: number;
  isComplete: boolean;
} {
  const requiredFields = ONBOARDING_FIELDS.filter((f) => f.required);
  let filledRequired = 0;

  for (const field of requiredFields) {
    if (session[field.key as keyof OnboardingSessionData]) {
      filledRequired++;
    }
  }

  const percentage = Math.round((filledRequired / requiredFields.length) * 100);
  const isComplete = filledRequired === requiredFields.length;

  return { percentage, isComplete };
}

/**
 * Validate session token and get session data
 */
async function getSession(sessionToken: string): Promise<OnboardingSessionData | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase.rpc('get_onboarding_session', {
    p_session_token: sessionToken,
  });

  if (error || !data || data.length === 0) {
    return null;
  }

  const session = data[0];

  // Check expiration
  if (new Date(session.expires_at) < new Date()) {
    return null;
  }

  return session;
}

/**
 * Save captured fields to session
 */
async function saveFields(
  sessionToken: string,
  fields: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  // Convert field names to match DB (snake_case)
  const dbFields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null && value !== '') {
      dbFields[key] = value;
    }
  }

  if (Object.keys(dbFields).length === 0) {
    return { success: true };
  }

  const { error } = await supabase.rpc('update_onboarding_step', {
    p_session_token: sessionToken,
    p_step: 1, // All AI fields go to step 1
    p_data: dbFields,
  });

  if (error) {
    console.error('[OnboardingChat] Save error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Process tool calls from OpenAI response
 */
async function processToolCalls(
  toolCalls: { id: string; function: { name: string; arguments: string } }[],
  sessionToken: string,
  session: OnboardingSessionData
): Promise<{
  toolResults: { tool_call_id: string; output: string }[];
  updatedFields: Record<string, unknown>;
}> {
  const toolResults: { tool_call_id: string; output: string }[] = [];
  const updatedFields: Record<string, unknown> = {};

  for (const call of toolCalls) {
    const { name, arguments: argsStr } = call.function;

    try {
      const args = JSON.parse(argsStr);

      if (name === 'save_business_info') {
        // Save the fields
        const { success, error } = await saveFields(sessionToken, args);

        if (success) {
          // Track what was updated
          for (const [key, value] of Object.entries(args)) {
            if (value) {
              updatedFields[key] = value;
            }
          }

          const savedFields = Object.keys(args)
            .filter((k) => args[k])
            .join(', ');
          toolResults.push({
            tool_call_id: call.id,
            output: `Successfully saved: ${savedFields}`,
          });
        } else {
          toolResults.push({
            tool_call_id: call.id,
            output: `Error saving: ${error}`,
          });
        }
      } else if (name === 'check_progress') {
        const { percentage, isComplete } = calculateCompletion(session);
        const status = isComplete
          ? 'All required information collected!'
          : `${percentage}% complete. Still need required fields.`;
        toolResults.push({
          tool_call_id: call.id,
          output: status,
        });
      } else {
        toolResults.push({
          tool_call_id: call.id,
          output: 'Unknown function',
        });
      }
    } catch {
      toolResults.push({
        tool_call_id: call.id,
        output: 'Error processing request',
      });
    }
  }

  return { toolResults, updatedFields };
}

/**
 * Main chat function for onboarding
 */
export async function chatOnboarding(
  request: OnboardingChatRequest
): Promise<OnboardingChatResponse> {
  const { sessionToken, message, conversationHistory = [] } = request;

  // Validate session
  const session = await getSession(sessionToken);
  if (!session) {
    return {
      message: '',
      conversationHistory: [],
      completionPercentage: 0,
      isComplete: false,
      error: 'Invalid or expired session',
    };
  }

  // Build messages for OpenAI
  const systemPrompt = buildSystemPrompt(session);
  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: message },
  ];

  try {
    const openai = getOpenAIClient();

    // First API call
    let response = await openai.chat.completions.create({
      model: ONBOARDING_MODEL,
      messages,
      tools: ONBOARDING_TOOLS,
      tool_choice: 'auto',
      max_tokens: MAX_ONBOARDING_TOKENS,
      temperature: 0.7,
    });

    let assistantMessage = response.choices[0]?.message;
    let allUpdatedFields: Record<string, unknown> = {};

    // Process tool calls if any
    while (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
      // Extract function tool calls (filter out custom tool calls)
      const functionToolCalls = assistantMessage.tool_calls
        .filter(
          (
            tc
          ): tc is {
            id: string;
            type: 'function';
            function: { name: string; arguments: string };
          } => tc.type === 'function' && 'function' in tc
        )
        .map((tc) => ({
          id: tc.id,
          function: {
            name: tc.function.name,
            arguments: tc.function.arguments,
          },
        }));

      const { toolResults, updatedFields } = await processToolCalls(
        functionToolCalls,
        sessionToken,
        session
      );

      // Merge updated fields
      allUpdatedFields = { ...allUpdatedFields, ...updatedFields };

      // Add tool call and results to messages
      messages.push({
        role: 'assistant',
        content: assistantMessage.content || '',
        tool_calls: assistantMessage.tool_calls,
      });

      for (const result of toolResults) {
        messages.push({
          role: 'tool',
          tool_call_id: result.tool_call_id,
          content: result.output,
        });
      }

      // Get next response
      response = await openai.chat.completions.create({
        model: ONBOARDING_MODEL,
        messages,
        tools: ONBOARDING_TOOLS,
        tool_choice: 'auto',
        max_tokens: MAX_ONBOARDING_TOKENS,
        temperature: 0.7,
      });

      assistantMessage = response.choices[0]?.message;
    }

    const responseText = assistantMessage?.content || "I'm here to help you set up your business!";

    // Update conversation history
    const newHistory: OnboardingMessage[] = [
      ...conversationHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: responseText },
    ];

    // Recalculate completion with updated fields
    const updatedSession = { ...session, ...allUpdatedFields };
    const { percentage, isComplete } = calculateCompletion(updatedSession as OnboardingSessionData);

    return {
      message: responseText,
      updatedFields: Object.keys(allUpdatedFields).length > 0 ? allUpdatedFields : undefined,
      conversationHistory: newHistory,
      completionPercentage: percentage,
      isComplete,
    };
  } catch (error) {
    console.error('[OnboardingChat] Error:', error);
    return {
      message: '',
      conversationHistory,
      completionPercentage: 0,
      isComplete: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get initial greeting for new onboarding session
 */
export function getInitialGreeting(session: { email: string; first_name?: string }): string {
  const name = session.first_name || session.email.split('@')[0];

  return `Ciao ${name}! I'm your GudBro assistant, and I'm here to help you set up your business.

Let's make this quick and easy - just tell me a bit about your business. What's the name of your restaurant, cafe, or business?`;
}
