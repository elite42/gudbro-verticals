// AI Chat Service
// Handles chat interactions with the AI Co-Manager

import { getOpenAIClient, DEFAULT_MODEL, calculateCost } from './openai';
import { buildSystemPrompt, MerchantContext } from './prompts';
import { supabase } from '@/lib/supabase';
import { fetchMerchantKnowledge, formatKnowledgeForAI } from './knowledge-service';
import { AI_TOOLS, executeAction, logActionExecution, ActionResult } from './actions-service';
import {
  checkOnboardingStatus,
  buildOnboardingPrompt,
  ONBOARDING_TOOLS,
  updateOrganization,
  updateBrand,
  updateLocation,
  OnboardingStatus,
} from './onboarding-service';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  merchantId: string;
  accountId: string;
  sessionId: string;
  message: string;
  locationId?: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  inputTokens: number;
  outputTokens: number;
  model: string;
  latencyMs: number;
  actions?: ActionResult[];
  onboardingStatus?: OnboardingStatus;
}

// Get or create merchant AI preferences and knowledge
async function getMerchantContext(
  merchantId: string
): Promise<MerchantContext & { knowledgeContext: string }> {
  // First, get the merchant info
  const { data: merchant } = await supabase
    .from('merchants')
    .select('id, name, business_type, timezone')
    .eq('id', merchantId)
    .single();

  // Get or create AI preferences
  const { data: prefs } = await supabase.rpc('get_or_create_ai_preferences', {
    p_merchant_id: merchantId,
  });

  const preferences = prefs || {
    communication_style: 'professional',
    preferred_language: 'en',
    can_read_menu: true,
    can_read_orders: true,
    can_read_feedback: true,
    can_read_analytics: true,
    can_read_events: true,
    can_create_events: false,
    can_modify_menu: false,
    include_last_n_days_data: 30,
  };

  // Fetch knowledge based on permissions
  const knowledge = await fetchMerchantKnowledge(merchantId, undefined, {
    includeMenu: preferences.can_read_menu ?? true,
    includeAnalytics: preferences.can_read_analytics ?? true,
    includeEvents: preferences.can_read_events ?? true,
    includeFeedback: preferences.can_read_feedback ?? true,
    analyticsPeriodDays: preferences.include_last_n_days_data || 30,
  });

  const knowledgeContext = formatKnowledgeForAI(knowledge);

  return {
    merchantId,
    merchantName: merchant?.name || 'Your Business',
    businessType: merchant?.business_type,
    preferredLanguage: preferences.preferred_language || 'en',
    communicationStyle: preferences.communication_style || 'professional',
    timezone: merchant?.timezone || 'UTC',
    canReadMenu: preferences.can_read_menu ?? true,
    canReadOrders: preferences.can_read_orders ?? true,
    canReadFeedback: preferences.can_read_feedback ?? true,
    canReadAnalytics: preferences.can_read_analytics ?? true,
    canReadEvents: preferences.can_read_events ?? true,
    canCreateEvents: preferences.can_create_events ?? false,
    canModifyMenu: preferences.can_modify_menu ?? false,
    knowledgeContext,
  };
}

// Load conversation history from database
async function loadConversationHistory(
  sessionId: string,
  limit: number = 20
): Promise<ChatMessage[]> {
  const { data } = await supabase
    .from('ai_conversations')
    .select('role, content')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (!data) return [];

  return data.map((msg) => ({
    role: msg.role as 'user' | 'assistant' | 'system',
    content: msg.content,
  }));
}

// Save message to database
async function saveMessage(
  merchantId: string,
  accountId: string,
  sessionId: string,
  role: 'user' | 'assistant',
  content: string,
  inputTokens: number = 0,
  outputTokens: number = 0,
  model?: string
): Promise<void> {
  await supabase.from('ai_conversations').insert({
    merchant_id: merchantId,
    account_id: accountId,
    session_id: sessionId,
    role,
    content,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    model,
  });
}

// Log AI usage
async function logUsage(
  merchantId: string,
  accountId: string,
  sessionId: string,
  inputTokens: number,
  outputTokens: number,
  model: string,
  latencyMs: number,
  promptSummary: string,
  responseSummary: string
): Promise<void> {
  await supabase.rpc('log_ai_usage', {
    p_merchant_id: merchantId,
    p_account_id: accountId,
    p_action_type: 'chat',
    p_session_id: sessionId,
    p_prompt_summary: promptSummary.slice(0, 200),
    p_response_summary: responseSummary.slice(0, 200),
    p_input_tokens: inputTokens,
    p_output_tokens: outputTokens,
    p_model: model,
    p_latency_ms: latencyMs,
  });
}

// Execute onboarding action
async function executeOnboardingAction(
  merchantId: string,
  locationId: string | undefined,
  functionName: string,
  args: Record<string, unknown>,
  onboardingStatus: OnboardingStatus
): Promise<ActionResult> {
  try {
    let result;

    switch (functionName) {
      case 'update_organization_info': {
        if (!onboardingStatus.organization?.id) {
          return {
            success: false,
            action: functionName,
            message: 'No organization found to update',
          };
        }
        result = await updateOrganization(
          onboardingStatus.organization.id,
          args as Record<string, string>
        );
        break;
      }

      case 'update_brand_info': {
        if (!onboardingStatus.brand?.id) {
          return {
            success: false,
            action: functionName,
            message: 'No brand found to update',
          };
        }
        result = await updateBrand(onboardingStatus.brand.id, args as Record<string, string>);
        break;
      }

      case 'update_location_info': {
        if (!onboardingStatus.location?.id) {
          return {
            success: false,
            action: functionName,
            message: 'No location found to update',
          };
        }
        result = await updateLocation(onboardingStatus.location.id, args as Record<string, string>);
        break;
      }

      case 'check_onboarding_progress': {
        const status = await checkOnboardingStatus(merchantId, locationId);
        return {
          success: true,
          action: functionName,
          message: `Onboarding is ${status.completionPercentage}% complete. ${status.missingFields.length} fields remaining.`,
          data: status,
        };
      }

      default:
        return {
          success: false,
          action: functionName,
          message: `Unknown onboarding action: ${functionName}`,
        };
    }

    return {
      success: result.success,
      action: functionName,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      action: functionName,
      message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Main chat function
export async function chat(request: ChatRequest): Promise<ChatResponse> {
  const startTime = Date.now();
  const openai = getOpenAIClient();

  // Check onboarding status
  const onboardingStatus = await checkOnboardingStatus(request.merchantId, request.locationId);

  // Get merchant context for system prompt (includes knowledge)
  const context = await getMerchantContext(request.merchantId);
  const systemPrompt = buildSystemPrompt(context);

  // Build onboarding prompt if incomplete
  const onboardingPrompt = buildOnboardingPrompt(onboardingStatus);

  // Combine system prompt with knowledge context and onboarding
  const fullSystemPrompt = systemPrompt + '\n' + context.knowledgeContext + onboardingPrompt;

  // Combine tools - include onboarding tools if onboarding is incomplete
  const tools = onboardingStatus.isComplete ? AI_TOOLS : [...AI_TOOLS, ...ONBOARDING_TOOLS];

  // Load conversation history if not provided
  let history = request.conversationHistory;
  if (!history) {
    history = await loadConversationHistory(request.sessionId);
  }

  // Build messages array
  const messages: ChatMessage[] = [
    { role: 'system', content: fullSystemPrompt },
    ...history,
    { role: 'user', content: request.message },
  ];

  // Save user message
  await saveMessage(
    request.merchantId,
    request.accountId,
    request.sessionId,
    'user',
    request.message
  );

  // List of onboarding function names for routing
  const onboardingFunctionNames = [
    'update_organization_info',
    'update_brand_info',
    'update_location_info',
    'check_onboarding_progress',
  ];

  try {
    // Call OpenAI with function calling
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      tools,
      tool_choice: 'auto',
      max_tokens: 1000,
      temperature: 0.7,
    });

    let latencyMs = Date.now() - startTime;
    let responseMessage = completion.choices[0]?.message?.content || '';
    let inputTokens = completion.usage?.prompt_tokens || 0;
    let outputTokens = completion.usage?.completion_tokens || 0;
    const executedActions: ActionResult[] = [];

    // Check if AI wants to call functions
    const toolCalls = completion.choices[0]?.message?.tool_calls;

    if (toolCalls && toolCalls.length > 0) {
      // Execute each function call
      for (const toolCall of toolCalls) {
        // Type assertion for OpenAI tool call structure
        const fn = (toolCall as { function: { name: string; arguments: string } }).function;
        const functionName = fn.name;
        const functionArgs = JSON.parse(fn.arguments);

        let result: ActionResult;

        // Route to appropriate handler
        if (onboardingFunctionNames.includes(functionName)) {
          // Execute onboarding action
          result = await executeOnboardingAction(
            request.merchantId,
            request.locationId,
            functionName,
            functionArgs,
            onboardingStatus
          );
        } else {
          // Execute regular action
          result = await executeAction(
            request.merchantId,
            request.locationId,
            functionName,
            functionArgs
          );
        }

        executedActions.push(result);

        // Log the action
        await logActionExecution(
          request.merchantId,
          request.accountId,
          request.sessionId,
          functionName,
          functionArgs,
          result
        );
      }

      // Get a follow-up response that incorporates the action results
      const actionResultsMessage = executedActions
        .map((a) => `[${a.action}]: ${a.message}`)
        .join('\n');

      const followUpMessages = [
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant' | 'system',
          content: m.content,
        })),
        {
          role: 'assistant' as const,
          content: null,
          tool_calls: toolCalls,
        },
        {
          role: 'tool' as const,
          tool_call_id: toolCalls[0].id,
          content: actionResultsMessage,
        },
      ];

      const followUp = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: followUpMessages,
        max_tokens: 500,
        temperature: 0.7,
      });

      responseMessage = followUp.choices[0]?.message?.content || responseMessage;
      inputTokens += followUp.usage?.prompt_tokens || 0;
      outputTokens += followUp.usage?.completion_tokens || 0;
      latencyMs = Date.now() - startTime;
    }

    // Save assistant response
    await saveMessage(
      request.merchantId,
      request.accountId,
      request.sessionId,
      'assistant',
      responseMessage,
      inputTokens,
      outputTokens,
      DEFAULT_MODEL
    );

    // Log usage for billing
    await logUsage(
      request.merchantId,
      request.accountId,
      request.sessionId,
      inputTokens,
      outputTokens,
      DEFAULT_MODEL,
      latencyMs,
      request.message,
      responseMessage
    );

    // Get updated onboarding status if actions were executed
    const finalOnboardingStatus =
      executedActions.length > 0
        ? await checkOnboardingStatus(request.merchantId, request.locationId)
        : onboardingStatus;

    return {
      message: responseMessage,
      sessionId: request.sessionId,
      inputTokens,
      outputTokens,
      model: DEFAULT_MODEL,
      latencyMs,
      actions: executedActions.length > 0 ? executedActions : undefined,
      onboardingStatus: finalOnboardingStatus.isComplete ? undefined : finalOnboardingStatus,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('AI Chat error:', errorMessage);

    // Log the error
    await supabase.from('ai_usage_logs').insert({
      merchant_id: request.merchantId,
      account_id: request.accountId,
      action_type: 'chat',
      session_id: request.sessionId,
      prompt_summary: request.message.slice(0, 200),
      status: 'error',
      error_message: errorMessage,
      latency_ms: Date.now() - startTime,
      model: DEFAULT_MODEL,
    });

    throw new Error(`AI request failed: ${errorMessage}`);
  }
}

// Create a new session
export async function createSession(
  merchantId: string,
  accountId: string,
  title?: string
): Promise<string> {
  const sessionId = crypto.randomUUID();

  await supabase.from('ai_sessions').insert({
    id: sessionId,
    merchant_id: merchantId,
    account_id: accountId,
    title: title || 'New Conversation',
    status: 'active',
  });

  return sessionId;
}

// Get user's sessions
export async function getSessions(
  merchantId: string,
  accountId: string,
  limit: number = 20
): Promise<any[]> {
  const { data } = await supabase
    .from('ai_sessions')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('account_id', accountId)
    .order('last_message_at', { ascending: false })
    .limit(limit);

  return data || [];
}

// Archive a session
export async function archiveSession(sessionId: string): Promise<void> {
  await supabase
    .from('ai_sessions')
    .update({
      status: 'archived',
      archived_at: new Date().toISOString(),
    })
    .eq('id', sessionId);
}
