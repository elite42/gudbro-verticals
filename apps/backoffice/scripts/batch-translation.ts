/**
 * Batch Translation Script
 *
 * Traduce ingredienti in batch usando OpenAI GPT-4o-mini.
 * Salva direttamente nel database Supabase.
 *
 * Esegui con: npx tsx scripts/batch-translation.ts
 */

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Carica .env.local
const envPath = resolve(__dirname, '../.env.local');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
} catch (_e) {
  console.log('Nota: .env.local non trovato');
}

// Configurazione
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Configurazione mancante!');
  console.log('Richiesti: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Configurazione batch
const BATCH_SIZE = 50; // Ingredienti per batch
const TARGET_LOCALES = ['it', 'es', 'fr', 'de', 'pt']; // 5 lingue europee
const ITEMS_PER_API_CALL = 25; // Items per chiamata OpenAI (per stare nei limiti)

const LOCALE_NAMES: Record<string, string> = {
  it: 'Italian',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  vi: 'Vietnamese',
  ko: 'Korean',
  ja: 'Japanese',
  ru: 'Russian',
  zh: 'Chinese',
  th: 'Thai',
  tr: 'Turkish',
};

const SYSTEM_PROMPT = `You are a professional food terminology translator.

RULES:
1. Translate ingredient names accurately
2. Keep proper nouns (AOC cheeses, traditional names) as-is
3. Use common culinary terms for each locale
4. Return ONLY valid JSON array, no markdown

CONTEXT: Food ingredients for restaurant menus.`;

interface Ingredient {
  id: string;
  name: string;
  category: string;
}

interface TranslationResult {
  index: number;
  translations: Record<string, string>;
}

async function getUntranslatedIngredients(limit: number): Promise<Ingredient[]> {
  // Get ingredients that don't have translations for the first target locale
  const { data, error } = await supabase
    .from('ingredients')
    .select('id, name, category')
    .not(
      'id',
      'in',
      `(SELECT entity_id FROM translations WHERE entity_type = 'ingredient' AND locale = '${TARGET_LOCALES[0]}')`
    )
    .order('name')
    .limit(limit);

  if (error) {
    console.error('Errore fetch ingredienti:', error.message);
    return [];
  }

  return data || [];
}

async function translateBatch(items: Ingredient[]): Promise<TranslationResult[]> {
  const localeList = TARGET_LOCALES.map((l) => `${l} (${LOCALE_NAMES[l]})`).join(', ');

  const itemsList = items.map((item, idx) => `${idx + 1}. "${item.name}"`).join('\n');

  const prompt = `Translate these ${items.length} food ingredients to: ${localeList}

${itemsList}

Return JSON array:
[{"index": 1, "translations": {"it": "...", "es": "...", "fr": "...", "de": "...", "pt": "..."}}, ...]`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content || '[]';

  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : parsed.translations || [];
  } catch {
    console.error('Errore parsing JSON');
    return [];
  }
}

async function saveTranslations(
  items: Ingredient[],
  results: TranslationResult[]
): Promise<number> {
  const rows: any[] = [];

  for (const result of results) {
    const item = items[result.index - 1];
    if (!item) continue;

    for (const [locale, value] of Object.entries(result.translations)) {
      if (value && TARGET_LOCALES.includes(locale)) {
        rows.push({
          entity_type: 'ingredient',
          entity_id: item.id,
          field: 'name',
          locale,
          value: value.trim(),
          is_verified: false,
          translated_by: 'openai-gpt4o-mini',
        });
      }
    }
  }

  if (rows.length === 0) return 0;

  const { error } = await supabase.from('translations').upsert(rows, {
    onConflict: 'entity_type,entity_id,field,locale',
    ignoreDuplicates: true,
  });

  if (error) {
    console.error('Errore salvataggio:', error.message);
    return 0;
  }

  return rows.length;
}

async function main() {
  console.log('🚀 BATCH TRANSLATION\n');
  console.log('═'.repeat(60));
  console.log(`📦 Ingredienti per batch: ${BATCH_SIZE}`);
  console.log(`🌍 Lingue: ${TARGET_LOCALES.join(', ')}`);
  console.log(`💰 Costo stimato: ~$0.02-0.03`);
  console.log('═'.repeat(60));

  // 1. Fetch ingredients
  console.log('\n📥 Carico ingredienti da tradurre...');
  const ingredients = await getUntranslatedIngredients(BATCH_SIZE);

  if (ingredients.length === 0) {
    console.log('✅ Tutti gli ingredienti sono già tradotti!');
    return;
  }

  console.log(`   Trovati: ${ingredients.length} ingredienti\n`);

  // 2. Translate in sub-batches
  let totalTranslations = 0;
  let totalCost = 0;

  for (let i = 0; i < ingredients.length; i += ITEMS_PER_API_CALL) {
    const batch = ingredients.slice(i, i + ITEMS_PER_API_CALL);
    const batchNum = Math.floor(i / ITEMS_PER_API_CALL) + 1;
    const totalBatches = Math.ceil(ingredients.length / ITEMS_PER_API_CALL);

    console.log(`📤 Batch ${batchNum}/${totalBatches}: ${batch.length} ingredienti...`);

    try {
      const startTime = Date.now();
      const results = await translateBatch(batch);
      const duration = Date.now() - startTime;

      // Save to database
      const saved = await saveTranslations(batch, results);
      totalTranslations += saved;

      // Estimate cost (rough)
      const estimatedCost = 0.0003 * batch.length;
      totalCost += estimatedCost;

      console.log(`   ✅ ${saved} traduzioni salvate (${duration}ms)`);

      // Rate limiting - wait 1 second between batches
      if (i + ITEMS_PER_API_CALL < ingredients.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (error) {
      console.error(`   ❌ Errore batch ${batchNum}:`, error);
    }
  }

  // 3. Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 RIEPILOGO');
  console.log(`   Ingredienti processati: ${ingredients.length}`);
  console.log(`   Traduzioni salvate: ${totalTranslations}`);
  console.log(`   Costo stimato: $${totalCost.toFixed(4)}`);
  console.log('═'.repeat(60));

  // 4. Verify
  const { count } = await supabase
    .from('translations')
    .select('*', { count: 'exact', head: true })
    .eq('entity_type', 'ingredient');

  console.log(`\n✅ Totale traduzioni ingredienti nel DB: ${count}`);
}

main().catch(console.error);
