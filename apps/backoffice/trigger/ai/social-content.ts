/**
 * Social Content Generator
 *
 * Event-triggered task for generating social media content.
 * Called when merchants want AI-generated posts.
 */

import { task, logger } from '@trigger.dev/sdk/v3';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { getOpenAIClient, DEFAULT_MODEL } from '@/lib/ai/openai';

interface SocialContentPayload {
  merchantId: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok';
  contentType: 'promotion' | 'event' | 'menu_highlight' | 'general';
  context?: string;
  language?: string;
}

interface GeneratedContent {
  caption: string;
  hashtags: string[];
  suggestedImagePrompt?: string;
  bestTimeToPost?: string;
}

// Task for generating social content
export const generateSocialContentTask = task({
  id: 'generate-social-content',
  run: async (payload: SocialContentPayload): Promise<GeneratedContent> => {
    const { merchantId, platform, contentType, context, language = 'en' } = payload;
    const supabase = getSupabaseAdmin();

    // Get merchant info for context
    const { data: merchant } = await supabase
      .from('merchants')
      .select('name, business_type, description')
      .eq('id', merchantId)
      .single();

    if (!merchant) {
      throw new Error('Merchant not found');
    }

    // Get recent menu items for content ideas
    const { data: menuItems } = await supabase
      .from('menu_items')
      .select('name, description, price')
      .eq('merchant_id', merchantId)
      .eq('is_available', true)
      .limit(5);

    const openai = getOpenAIClient();

    const platformGuidelines: Record<string, string> = {
      instagram: 'Visual-first, use emojis, max 2200 chars, hashtags important',
      facebook: 'Conversational, can be longer, engage community',
      twitter: 'Concise, max 280 chars, witty, timely',
      tiktok: 'Trendy, fun, casual language, use trending hashtags',
    };

    const prompt = `Generate social media content for ${merchant.name} (${merchant.business_type}).

Platform: ${platform}
Guidelines: ${platformGuidelines[platform]}
Content Type: ${contentType}
Language: ${language}
${context ? `Additional Context: ${context}` : ''}

Business Description: ${merchant.description || 'A local restaurant/venue'}

${menuItems?.length ? `Popular Items: ${menuItems.map((i) => i.name).join(', ')}` : ''}

Generate:
1. A compelling caption (respect platform character limits)
2. 5-7 relevant hashtags
3. A suggested image prompt for AI image generation (optional)
4. Best time to post (based on platform best practices)

Respond in JSON format:
{
  "caption": "...",
  "hashtags": ["...", "..."],
  "suggestedImagePrompt": "...",
  "bestTimeToPost": "..."
}`;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a social media marketing expert. Generate engaging, platform-appropriate content. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';

    let parsed: GeneratedContent;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = {
        caption: 'Check out our latest offerings!',
        hashtags: ['food', 'restaurant', 'foodie'],
      };
    }

    // Save the generated content
    await supabase.from('ai_social_posts').insert({
      merchant_id: merchantId,
      platform,
      content_type: contentType,
      caption: parsed.caption,
      hashtags: parsed.hashtags,
      suggested_image_prompt: parsed.suggestedImagePrompt,
      status: 'draft',
      generated_at: new Date().toISOString(),
    });

    logger.info('Social content generated', {
      merchantId,
      platform,
      contentType,
    });

    return parsed;
  },
});

// Batch generate content for a merchant across platforms
export const generateBatchSocialContentTask = task({
  id: 'generate-batch-social-content',
  run: async (payload: {
    merchantId: string;
    platforms: SocialContentPayload['platform'][];
    contentType: SocialContentPayload['contentType'];
    context?: string;
  }) => {
    const { merchantId, platforms, contentType, context } = payload;

    const results = await Promise.allSettled(
      platforms.map((platform) =>
        generateSocialContentTask.triggerAndWait({
          merchantId,
          platform,
          contentType,
          context,
        })
      )
    );

    const summary = {
      total: platforms.length,
      success: results.filter((r) => r.status === 'fulfilled').length,
      failed: results.filter((r) => r.status === 'rejected').length,
    };

    logger.info('Batch social content generated', summary);
    return summary;
  },
});
