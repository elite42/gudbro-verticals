/**
 * Translation Engine Types
 * Provider-agnostic translation system for GUDBRO
 *
 * Supports multiple AI providers for cost optimization:
 * - Claude (quality, expensive)
 * - GPT-4o-mini (good, cheap)
 * - DeepL (excellent, medium)
 * - Google Translate (basic, cheap)
 * - Local LLM (free, self-hosted)
 */

// Supported languages - expandable
export type LanguageCode =
  | 'en' | 'vi' | 'it'  // Current
  | 'ko' | 'zh' | 'ja' | 'th'  // Asia priority
  | 'fr' | 'de' | 'es' | 'pt' | 'ru'  // Europe
  | 'ar' | 'hi' | 'id' | 'ms';  // Other markets

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;  // Right-to-left (Arabic, Hebrew)
}

// All supported languages
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
];

// Translation context for better accuracy
export type TranslationContext =
  | 'menu_item'           // Food/drink names
  | 'menu_description'    // Food descriptions
  | 'hotel_service'       // Hotel services
  | 'hotel_amenity'       // Room amenities
  | 'attraction'          // Tourist attractions
  | 'transport'           // Transportation info
  | 'price_list'          // Price listings
  | 'instruction'         // How-to instructions
  | 'legal'               // Terms, policies
  | 'marketing'           // Promotional content
  | 'ui_label'            // Button/label text
  | 'general';            // Default

// Translation request
export interface TranslationRequest {
  text: string;
  sourceLanguage: LanguageCode;
  targetLanguages: LanguageCode[];
  context: TranslationContext;
  preserveFormatting?: boolean;  // Keep HTML, markdown, etc.
  glossary?: Record<string, string>;  // Custom term translations
}

// Translation result
export interface TranslationResult {
  original: string;
  sourceLanguage: LanguageCode;
  translations: Record<LanguageCode, string>;
  provider: TranslationProvider;
  cached: boolean;
  cost?: number;  // Estimated cost in USD
}

// Batch translation for efficiency
export interface BatchTranslationRequest {
  items: TranslationRequest[];
  priority?: 'speed' | 'quality' | 'cost';
}

export interface BatchTranslationResult {
  results: TranslationResult[];
  totalCost?: number;
  processingTime: number;
}

// Provider types
export type TranslationProvider =
  | 'claude-haiku'
  | 'claude-sonnet'
  | 'gpt-4o-mini'
  | 'gpt-4o'
  | 'deepl'
  | 'google'
  | 'local';

// Provider configuration
export interface ProviderConfig {
  provider: TranslationProvider;
  apiKey?: string;
  endpoint?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

// Provider interface - all providers implement this
export interface TranslationProviderInterface {
  name: TranslationProvider;
  translate(request: TranslationRequest): Promise<TranslationResult>;
  translateBatch(request: BatchTranslationRequest): Promise<BatchTranslationResult>;
  estimateCost(request: TranslationRequest): number;
  isAvailable(): Promise<boolean>;
}

// Multi-language text storage
export interface MultiLangText {
  en?: string;
  vi?: string;
  it?: string;
  ko?: string;
  zh?: string;
  ja?: string;
  th?: string;
  fr?: string;
  de?: string;
  es?: string;
  pt?: string;
  ru?: string;
  ar?: string;
  hi?: string;
  id?: string;
  ms?: string;
  [key: string]: string | undefined;
}

// Helper to get text in preferred language with fallback
export function getLocalizedText(
  text: MultiLangText,
  preferredLanguage: LanguageCode,
  fallbackLanguage: LanguageCode = 'en'
): string {
  return text[preferredLanguage] || text[fallbackLanguage] || text.en || '';
}

// Helper to check if translation exists
export function hasTranslation(
  text: MultiLangText,
  language: LanguageCode
): boolean {
  return !!text[language] && text[language]!.trim().length > 0;
}

// Helper to get missing translations
export function getMissingTranslations(
  text: MultiLangText,
  requiredLanguages: LanguageCode[]
): LanguageCode[] {
  return requiredLanguages.filter(lang => !hasTranslation(text, lang));
}
