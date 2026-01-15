// Customer AI Chat Service
// Handles chat interactions with customers across multiple channels

import { getOpenAIClient, calculateCost } from '../openai';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { fetchCustomerContext, formatCustomerKnowledge } from './customer-context-service';
import { buildCustomerSystemPrompt, CustomerContext } from './customer-prompts';
import {
  CUSTOMER_CHAT_TOOLS,
  executeCustomerAction,
  CustomerActionResult,
} from './customer-actions-service';

// Use a smaller model for customer chat to reduce costs
const CUSTOMER_CHAT_MODEL = 'gpt-4o-mini';

export interface CustomerChatMessage {
  role: 'customer' | 'assistant' | 'system';
  content: string;
}

export interface CustomerChatRequest {
  locationId: string;
  conversationId?: string; // Existing conversation or create new
  channel: 'widget' | 'whatsapp' | 'telegram' | 'line' | 'zalo' | 'web';
  channelUserId?: string; // External user ID from the channel
  message: string;
  // Optional customer identification
  accountId?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerName?: string;
  // Language preference
  language?: string;
}

export interface CustomerChatResponse {
  conversationId: string;
  message: string;
  suggestedReplies?: string[];
  actions?: CustomerActionResult[];
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  isEscalated: boolean;
  escalationReason?: string;
}

// Get or create a conversation
async function getOrCreateConversation(
  request: CustomerChatRequest
): Promise<{ id: string; isNew: boolean; language: string }> {
  // If conversationId provided, try to get existing
  if (request.conversationId) {
    const { data: existing } = await supabaseAdmin
      .from('customer_conversations')
      .select('id, language')
      .eq('id', request.conversationId)
      .eq('status', 'active')
      .single();

    if (existing) {
      return { id: existing.id, isNew: false, language: existing.language || 'en' };
    }
  }

  // Try to find existing active conversation for this channel user
  if (request.channelUserId) {
    const { data: existing } = await supabaseAdmin
      .from('customer_conversations')
      .select('id, language')
      .eq('location_id', request.locationId)
      .eq('channel', request.channel)
      .eq('channel_user_id', request.channelUserId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existing) {
      return { id: existing.id, isNew: false, language: existing.language || 'en' };
    }
  }

  // Create new conversation
  const { data: newConv, error } = await supabaseAdmin
    .from('customer_conversations')
    .insert({
      location_id: request.locationId,
      account_id: request.accountId || null,
      customer_phone: request.customerPhone || null,
      customer_email: request.customerEmail || null,
      customer_name: request.customerName || null,
      channel: request.channel,
      channel_user_id: request.channelUserId || null,
      language: request.language || 'en',
      status: 'active',
    })
    .select('id, language')
    .single();

  if (error || !newConv) {
    throw new Error(`Failed to create conversation: ${error?.message}`);
  }

  return { id: newConv.id, isNew: true, language: newConv.language || 'en' };
}

// Load conversation history
async function loadConversationHistory(
  conversationId: string,
  limit: number = 20
): Promise<CustomerChatMessage[]> {
  const { data } = await supabaseAdmin
    .from('customer_messages')
    .select('role, content')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (!data) return [];

  return data.map((msg: { role: string; content: string }) => ({
    role: msg.role as 'customer' | 'assistant' | 'system',
    content: msg.content,
  }));
}

// Save message to database
async function saveMessage(
  conversationId: string,
  role: 'customer' | 'assistant' | 'system' | 'agent',
  content: string,
  options?: {
    model?: string;
    tokensPrompt?: number;
    tokensCompletion?: number;
    latencyMs?: number;
    functionName?: string;
    functionArgs?: Record<string, unknown>;
    functionResult?: Record<string, unknown>;
    channelMessageId?: string;
  }
): Promise<void> {
  await supabaseAdmin.from('customer_messages').insert({
    conversation_id: conversationId,
    role,
    content,
    model: options?.model,
    tokens_prompt: options?.tokensPrompt,
    tokens_completion: options?.tokensCompletion,
    latency_ms: options?.latencyMs,
    function_name: options?.functionName,
    function_args: options?.functionArgs,
    function_result: options?.functionResult,
    channel_message_id: options?.channelMessageId,
    status: 'sent',
  });
}

// Update conversation topic based on message content
async function detectAndUpdateTopic(conversationId: string, message: string): Promise<void> {
  // Simple keyword-based topic detection
  const topicKeywords: Record<string, string[]> = {
    reservation: ['book', 'reserve', 'table', 'reservation', 'dat ban', 'prenotare'],
    menu: ['menu', 'food', 'dish', 'eat', 'thuc don', 'mon an', 'price'],
    order: ['order', 'delivery', 'takeaway', 'pickup', 'dat mon'],
    complaint: ['complain', 'problem', 'issue', 'bad', 'terrible', 'wrong'],
    feedback: ['feedback', 'review', 'rate', 'opinion', 'suggest'],
  };

  const lowerMessage = message.toLowerCase();
  let detectedTopic = 'general';

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((kw) => lowerMessage.includes(kw))) {
      detectedTopic = topic;
      break;
    }
  }

  await supabaseAdmin
    .from('customer_conversations')
    .update({ topic: detectedTopic })
    .eq('id', conversationId);
}

// Check if escalation is needed
function shouldEscalate(
  message: string,
  aiResponse: string,
  actions: CustomerActionResult[]
): { shouldEscalate: boolean; reason?: string } {
  const lowerMessage = message.toLowerCase();

  // Customer explicitly asks for human
  const humanRequestKeywords = [
    'human',
    'person',
    'agent',
    'staff',
    'manager',
    'speak to someone',
    'real person',
    'operator',
    'help me',
    'noi chuyen voi nguoi',
  ];
  if (humanRequestKeywords.some((kw) => lowerMessage.includes(kw))) {
    return { shouldEscalate: true, reason: 'customer_request' };
  }

  // Negative sentiment detection (simple)
  const negativeKeywords = [
    'angry',
    'furious',
    'terrible',
    'worst',
    'never again',
    'lawsuit',
    'complain',
    'unacceptable',
    'refund',
    'disgusting',
    'scam',
  ];
  if (negativeKeywords.some((kw) => lowerMessage.includes(kw))) {
    return { shouldEscalate: true, reason: 'negative_sentiment' };
  }

  // Payment/refund issues
  const paymentKeywords = ['refund', 'charge', 'payment', 'money back', 'overcharged'];
  if (paymentKeywords.some((kw) => lowerMessage.includes(kw))) {
    return { shouldEscalate: true, reason: 'payment_issue' };
  }

  // Check if any action failed that requires human intervention
  const failedCriticalActions = actions.filter((a) => !a.success && a.requiresHumanFollowup);
  if (failedCriticalActions.length > 0) {
    return { shouldEscalate: true, reason: 'complex_issue' };
  }

  return { shouldEscalate: false };
}

// Create escalation record
async function createEscalation(
  conversationId: string,
  locationId: string,
  reason: string,
  aiSummary: string
): Promise<void> {
  // Update conversation status
  await supabaseAdmin
    .from('customer_conversations')
    .update({
      status: 'escalated',
      escalated_at: new Date().toISOString(),
      escalation_reason: reason,
    })
    .eq('id', conversationId);

  // Create escalation record
  await supabaseAdmin.from('conversation_escalations').insert({
    conversation_id: conversationId,
    location_id: locationId,
    reason,
    ai_summary: aiSummary,
    status: 'pending',
    priority: reason === 'payment_issue' || reason === 'complaint' ? 'high' : 'normal',
  });
}

// Generate suggested quick replies
function generateSuggestedReplies(
  context: CustomerContext,
  topic: string | null,
  language: string
): string[] {
  const replies: Record<string, Record<string, string[]>> = {
    en: {
      general: ['View menu', 'Make reservation', 'Opening hours', 'Contact'],
      reservation: ['Check availability', 'Modify reservation', 'Cancel reservation'],
      menu: ['Popular dishes', 'Vegetarian options', 'Allergen info', 'Prices'],
      order: ['Track order', 'Order status', 'Delivery time'],
    },
    vi: {
      general: ['Xem thuc don', 'Dat ban', 'Gio mo cua', 'Lien he'],
      reservation: ['Kiem tra cho trong', 'Sua dat ban', 'Huy dat ban'],
      menu: ['Mon pho bien', 'Mon chay', 'Thong tin di ung', 'Gia'],
      order: ['Theo doi don', 'Trang thai don', 'Thoi gian giao'],
    },
    it: {
      general: ['Vedi menu', 'Prenota', 'Orari', 'Contatti'],
      reservation: ['Verifica disponibilita', 'Modifica prenotazione', 'Cancella'],
      menu: ['Piatti popolari', 'Opzioni vegetariane', 'Allergeni', 'Prezzi'],
      order: ['Traccia ordine', 'Stato ordine', 'Tempo consegna'],
    },
  };

  const lang = replies[language] ? language : 'en';
  const topicReplies = replies[lang][topic || 'general'] || replies[lang].general;

  return topicReplies.slice(0, 4);
}

// Main customer chat function
export async function customerChat(request: CustomerChatRequest): Promise<CustomerChatResponse> {
  const startTime = Date.now();
  const openai = getOpenAIClient();

  // Get or create conversation
  const { id: conversationId, isNew, language } = await getOrCreateConversation(request);

  // Detect topic from message
  await detectAndUpdateTopic(conversationId, request.message);

  // Get customer context (location info, menu, hours, etc.)
  const context = await fetchCustomerContext(request.locationId, language);
  const knowledgeContext = formatCustomerKnowledge(context);

  // Build system prompt
  const systemPrompt = buildCustomerSystemPrompt(context, language);
  const fullSystemPrompt = `${systemPrompt}\n\n${knowledgeContext}`;

  // Load conversation history
  const history = isNew ? [] : await loadConversationHistory(conversationId);

  // Build messages array (convert roles for OpenAI)
  const messages = [
    { role: 'system' as const, content: fullSystemPrompt },
    ...history.map((m) => ({
      role: (m.role === 'customer' ? 'user' : m.role) as 'user' | 'assistant' | 'system',
      content: m.content,
    })),
    { role: 'user' as const, content: request.message },
  ];

  // Save customer message
  await saveMessage(conversationId, 'customer', request.message);

  try {
    // Call OpenAI with function calling
    const completion = await openai.chat.completions.create({
      model: CUSTOMER_CHAT_MODEL,
      messages,
      tools: CUSTOMER_CHAT_TOOLS,
      tool_choice: 'auto',
      max_tokens: 500, // Keep responses concise for chat
      temperature: 0.7,
    });

    const latencyMs = Date.now() - startTime;
    let responseMessage = completion.choices[0]?.message?.content || '';
    const inputTokens = completion.usage?.prompt_tokens || 0;
    const outputTokens = completion.usage?.completion_tokens || 0;
    const executedActions: CustomerActionResult[] = [];

    // Check if AI wants to call functions
    const toolCalls = completion.choices[0]?.message?.tool_calls;

    if (toolCalls && toolCalls.length > 0) {
      const toolResults: { tool_call_id: string; content: string }[] = [];

      for (const toolCall of toolCalls) {
        // Type assertion for OpenAI tool call structure
        const fn = (toolCall as { function: { name: string; arguments: string } }).function;
        const functionName = fn.name;
        const functionArgs = JSON.parse(fn.arguments);

        // Execute customer action
        const result = await executeCustomerAction(request.locationId, functionName, functionArgs, {
          conversationId,
          accountId: request.accountId,
          customerPhone: request.customerPhone,
          customerEmail: request.customerEmail,
          customerName: request.customerName,
        });

        executedActions.push(result);

        toolResults.push({
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });

        // Log action
        await saveMessage(conversationId, 'system', `Action: ${functionName}`, {
          functionName,
          functionArgs,
          functionResult: result as unknown as Record<string, unknown>,
        });
      }

      // Get final response with tool results
      const followUpCompletion = await openai.chat.completions.create({
        model: CUSTOMER_CHAT_MODEL,
        messages: [
          ...messages,
          completion.choices[0].message,
          ...toolResults.map((tr) => ({
            role: 'tool' as const,
            tool_call_id: tr.tool_call_id,
            content: tr.content,
          })),
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      responseMessage = followUpCompletion.choices[0]?.message?.content || responseMessage;
    }

    // Check if escalation is needed
    const escalation = shouldEscalate(request.message, responseMessage, executedActions);

    if (escalation.shouldEscalate && escalation.reason) {
      await createEscalation(
        conversationId,
        request.locationId,
        escalation.reason,
        `Customer: ${request.message.slice(0, 200)}\nAI: ${responseMessage.slice(0, 200)}`
      );

      // Append escalation notice to response
      const escalationNotice =
        language === 'vi'
          ? '\n\nToi da chuyen cuoc tro chuyen nay den nhan vien cua chung toi. Ho se lien he voi ban som.'
          : language === 'it'
            ? '\n\nHo trasferito questa conversazione al nostro staff. Ti contatteranno presto.'
            : "\n\nI've transferred this conversation to our staff. They will get back to you shortly.";

      responseMessage += escalationNotice;
    }

    // Save assistant response
    await saveMessage(conversationId, 'assistant', responseMessage, {
      model: CUSTOMER_CHAT_MODEL,
      tokensPrompt: inputTokens,
      tokensCompletion: outputTokens,
      latencyMs,
    });

    // Get current topic for suggested replies
    const { data: convData } = await supabaseAdmin
      .from('customer_conversations')
      .select('topic')
      .eq('id', conversationId)
      .single();

    return {
      conversationId,
      message: responseMessage,
      suggestedReplies: generateSuggestedReplies(context, convData?.topic || null, language),
      actions: executedActions.length > 0 ? executedActions : undefined,
      inputTokens,
      outputTokens,
      latencyMs,
      isEscalated: escalation.shouldEscalate,
      escalationReason: escalation.reason,
    };
  } catch (error) {
    // Save error message
    const errorMessage =
      language === 'vi'
        ? 'Xin loi, toi dang gap su co. Vui long thu lai sau hoac lien he truc tiep voi chung toi.'
        : language === 'it'
          ? 'Mi scuso, sto riscontrando un problema. Riprova piu tardi o contattaci direttamente.'
          : "I apologize, I'm experiencing an issue. Please try again later or contact us directly.";

    await saveMessage(conversationId, 'assistant', errorMessage);

    return {
      conversationId,
      message: errorMessage,
      inputTokens: 0,
      outputTokens: 0,
      latencyMs: Date.now() - startTime,
      isEscalated: false,
    };
  }
}

// Close a conversation
export async function closeConversation(
  conversationId: string,
  rating?: number,
  feedback?: string
): Promise<void> {
  await supabaseAdmin
    .from('customer_conversations')
    .update({
      status: 'closed',
      closed_at: new Date().toISOString(),
      rating: rating || null,
      feedback: feedback || null,
    })
    .eq('id', conversationId);
}
