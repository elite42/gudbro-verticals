// AI Social Media Service
// Phase 8: Auto post generation, content calendar, captions

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export interface SocialPost {
  id: string;
  merchantId: string;

  // Platform
  platform: 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'google_business';

  // Content
  content: string;
  caption: string;
  hashtags: string[];
  callToAction?: string;

  // Media
  mediaType: 'image' | 'video' | 'carousel' | 'story' | 'reel';
  mediaUrls?: string[];
  mediaSuggestion?: string; // AI suggestion for what image to use

  // Scheduling
  scheduledFor?: string;
  bestTimeToPost?: string;
  timezone: string;

  // Status
  status: 'draft' | 'scheduled' | 'published' | 'failed';

  // Performance (after publishing)
  likes?: number;
  comments?: number;
  shares?: number;
  reach?: number;

  createdAt: string;
  publishedAt?: string;
}

export interface ContentCalendar {
  id: string;
  merchantId: string;
  weekStart: string;
  posts: {
    day: string;
    platform: string;
    contentType: string;
    topic: string;
    status: 'planned' | 'created' | 'scheduled' | 'published';
  }[];
  createdAt: string;
}

export interface CaptionStyle {
  tone: 'casual' | 'professional' | 'fun' | 'elegant' | 'friendly';
  length: 'short' | 'medium' | 'long';
  includeEmojis: boolean;
  includeHashtags: boolean;
  language: string;
}

// Generate social media post
export async function generatePost(
  merchantId: string,
  options: {
    platform: SocialPost['platform'];
    contentType:
      | 'promotion'
      | 'event'
      | 'menu_item'
      | 'behind_scenes'
      | 'customer_story'
      | 'announcement';
    topic: string;
    style?: Partial<CaptionStyle>;
    menuItem?: { name: string; description?: string; price?: number };
    event?: { title: string; date: string; description?: string };
  }
): Promise<SocialPost> {
  const openai = getOpenAIClient();

  // Get merchant info for context
  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  const style: CaptionStyle = {
    tone: options.style?.tone || 'friendly',
    length: options.style?.length || 'medium',
    includeEmojis: options.style?.includeEmojis ?? true,
    includeHashtags: options.style?.includeHashtags ?? true,
    language: options.style?.language || 'en',
  };

  const lengthGuide = {
    short: '1-2 sentences, under 100 characters',
    medium: '2-3 sentences, 100-200 characters',
    long: '3-5 sentences, 200-300 characters',
  };

  const platformGuide = {
    instagram: 'Focus on visuals, use up to 30 hashtags, storytelling captions work well',
    facebook: 'Can be longer, conversational, include call to action',
    tiktok: 'Short, trendy, use trending sounds/hashtags references',
    twitter: 'Max 280 chars, punchy, 1-3 hashtags max',
    google_business: 'Professional, informative, focus on local SEO keywords',
  };

  let contextInfo = '';
  if (options.menuItem) {
    contextInfo = `Menu item: ${options.menuItem.name}${options.menuItem.description ? ` - ${options.menuItem.description}` : ''}${options.menuItem.price ? ` ($${options.menuItem.price})` : ''}`;
  } else if (options.event) {
    contextInfo = `Event: ${options.event.title} on ${options.event.date}${options.event.description ? ` - ${options.event.description}` : ''}`;
  }

  const prompt = `Create a ${options.platform} post for ${merchant?.name || 'a restaurant'} (${merchant?.business_type || 'restaurant/bar'}).

Content type: ${options.contentType}
Topic: ${options.topic}
${contextInfo ? `Context: ${contextInfo}` : ''}

Style requirements:
- Tone: ${style.tone}
- Length: ${lengthGuide[style.length]}
- Emojis: ${style.includeEmojis ? 'Yes, use appropriately' : 'No emojis'}
- Hashtags: ${style.includeHashtags ? 'Include relevant hashtags' : 'No hashtags'}
- Language: ${style.language}

Platform tips: ${platformGuide[options.platform]}

Respond with JSON:
{
  "caption": "The main caption text",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "callToAction": "Optional call to action",
  "mediaSuggestion": "Description of ideal image/video to accompany this post",
  "bestTimeToPost": "Suggested time like '12:00' or '18:30'"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a social media marketing expert. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = {
        caption: 'Check out what we have for you today!',
        hashtags: ['foodie', 'restaurant'],
        mediaSuggestion: 'A photo of the featured item or venue',
      };
    }

    const post: SocialPost = {
      id: crypto.randomUUID(),
      merchantId,
      platform: options.platform,
      content: parsed.caption || '',
      caption: parsed.caption || '',
      hashtags: parsed.hashtags || [],
      callToAction: parsed.callToAction,
      mediaType: options.platform === 'tiktok' ? 'video' : 'image',
      mediaSuggestion: parsed.mediaSuggestion,
      bestTimeToPost: parsed.bestTimeToPost,
      timezone: 'UTC',
      status: 'draft',
      createdAt: new Date().toISOString(),
    };

    // Save to database
    await supabase.from('ai_social_posts').insert({
      id: post.id,
      merchant_id: post.merchantId,
      platform: post.platform,
      content: post.content,
      caption: post.caption,
      hashtags: post.hashtags,
      call_to_action: post.callToAction,
      media_type: post.mediaType,
      media_suggestion: post.mediaSuggestion,
      best_time_to_post: post.bestTimeToPost,
      timezone: post.timezone,
      status: post.status,
      created_at: post.createdAt,
    });

    return post;
  } catch (error) {
    console.error('Post generation failed:', error);
    throw error;
  }
}

// Generate content calendar for a week
export async function generateContentCalendar(
  merchantId: string,
  options: {
    weekStart: string; // ISO date
    platforms: SocialPost['platform'][];
    postsPerWeek: number;
    focusAreas?: string[]; // e.g., ['new menu', 'happy hour', 'weekend specials']
  }
): Promise<ContentCalendar> {
  const openai = getOpenAIClient();

  // Get merchant info
  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  // Get upcoming events
  const { data: events } = await supabase
    .from('events')
    .select('title, start_date')
    .eq('merchant_id', merchantId)
    .gte('start_date', options.weekStart)
    .limit(5);

  const prompt = `Create a weekly social media content calendar for ${merchant?.name || 'a restaurant'}.

Week starting: ${options.weekStart}
Platforms: ${options.platforms.join(', ')}
Target posts per week: ${options.postsPerWeek}
${options.focusAreas ? `Focus areas: ${options.focusAreas.join(', ')}` : ''}
${events && events.length > 0 ? `Upcoming events: ${events.map((e) => `${e.title} (${e.start_date})`).join(', ')}` : ''}

Create a balanced calendar with varied content types. Respond with JSON:
{
  "posts": [
    {
      "day": "Monday",
      "platform": "instagram",
      "contentType": "menu_item|promotion|event|behind_scenes|customer_story|announcement",
      "topic": "Brief description of what to post about"
    }
  ]
}

Distribute posts across the week, avoid posting too much on one day.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a social media strategist. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '{"posts":[]}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { posts: [] };
    }

    const calendar: ContentCalendar = {
      id: crypto.randomUUID(),
      merchantId,
      weekStart: options.weekStart,
      posts: (parsed.posts || []).map((p: any) => ({
        day: p.day || 'Monday',
        platform: p.platform || 'instagram',
        contentType: p.contentType || 'menu_item',
        topic: p.topic || '',
        status: 'planned' as const,
      })),
      createdAt: new Date().toISOString(),
    };

    // Save to database
    await supabase.from('ai_content_calendars').insert({
      id: calendar.id,
      merchant_id: calendar.merchantId,
      week_start: calendar.weekStart,
      posts: calendar.posts,
      created_at: calendar.createdAt,
    });

    return calendar;
  } catch (error) {
    console.error('Calendar generation failed:', error);
    throw error;
  }
}

// Generate multiple caption variations
export async function generateCaptionVariations(
  merchantId: string,
  options: {
    topic: string;
    platform: SocialPost['platform'];
    numberOfVariations: number;
    style?: Partial<CaptionStyle>;
  }
): Promise<string[]> {
  const openai = getOpenAIClient();

  const { data: merchant } = await supabase
    .from('merchants')
    .select('name')
    .eq('id', merchantId)
    .single();

  const prompt = `Generate ${options.numberOfVariations} different caption variations for ${merchant?.name || 'a restaurant'} on ${options.platform}.

Topic: ${options.topic}
Tone: ${options.style?.tone || 'friendly'}

Each caption should:
- Be unique in approach/angle
- Fit the platform
${options.style?.includeEmojis !== false ? '- Include emojis' : '- No emojis'}
${options.style?.includeHashtags !== false ? '- Include 3-5 relevant hashtags' : '- No hashtags'}

Respond with JSON: { "captions": ["caption1", "caption2", ...] }`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: 'You are a creative copywriter. Respond with valid JSON only.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '{"captions":[]}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { captions: [] };
    }

    return parsed.captions || [];
  } catch (error) {
    console.error('Caption variations failed:', error);
    throw error;
  }
}

// Get posts for a merchant
export async function getPosts(
  merchantId: string,
  options: {
    status?: SocialPost['status'];
    platform?: SocialPost['platform'];
    limit?: number;
  } = {}
): Promise<SocialPost[]> {
  let query = supabase
    .from('ai_social_posts')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(options.limit || 20);

  if (options.status) query = query.eq('status', options.status);
  if (options.platform) query = query.eq('platform', options.platform);

  const { data } = await query;

  return (data || []).map((p) => ({
    id: p.id,
    merchantId: p.merchant_id,
    platform: p.platform,
    content: p.content,
    caption: p.caption,
    hashtags: p.hashtags || [],
    callToAction: p.call_to_action,
    mediaType: p.media_type,
    mediaUrls: p.media_urls,
    mediaSuggestion: p.media_suggestion,
    scheduledFor: p.scheduled_for,
    bestTimeToPost: p.best_time_to_post,
    timezone: p.timezone,
    status: p.status,
    likes: p.likes,
    comments: p.comments,
    shares: p.shares,
    reach: p.reach,
    createdAt: p.created_at,
    publishedAt: p.published_at,
  }));
}

// Update post status
export async function updatePostStatus(
  postId: string,
  status: SocialPost['status'],
  scheduledFor?: string
): Promise<void> {
  const updateData: any = {
    status,
  };

  if (scheduledFor) {
    updateData.scheduled_for = scheduledFor;
  }

  if (status === 'published') {
    updateData.published_at = new Date().toISOString();
  }

  await supabase.from('ai_social_posts').update(updateData).eq('id', postId);
}

// Get content calendars
export async function getContentCalendars(
  merchantId: string,
  limit: number = 10
): Promise<ContentCalendar[]> {
  const { data } = await supabase
    .from('ai_content_calendars')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('week_start', { ascending: false })
    .limit(limit);

  return (data || []).map((c) => ({
    id: c.id,
    merchantId: c.merchant_id,
    weekStart: c.week_start,
    posts: c.posts || [],
    createdAt: c.created_at,
  }));
}
