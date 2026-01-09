/**
 * Translate Missing Ingredients
 *
 * Trova ingredienti SENZA traduzione per una lingua e li traduce.
 * Riempie i buchi lasciati dai batch precedenti.
 *
 * Esegui con: npx tsx scripts/translate-missing.ts
 */

import OpenAI from 'openai';
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
  // .env.local file may not exist
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Chiavi mancanti');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ========== CONFIGURA QUI ==========
const BATCH_SIZE = 50;
// Lingua di riferimento per trovare buchi (tutte le 9 hanno gli stessi buchi)
const REFERENCE_LOCALE = 'vi';
// ===================================

const TARGET_LOCALES = ['vi', 'zh', 'ja', 'ko', 'th', 'ru', 'tr', 'hi', 'ar'];

const SYSTEM_PROMPT = `You are a food terminology translator. Translate ingredient names.
RULES:
1. Keep proper nouns as-is when appropriate
2. Use common culinary terms
3. Return ONLY valid JSON`;

async function fetchMissingIngredients(): Promise<{ id: string; name: string }[]> {
  // Query per trovare ingredienti senza traduzione in REFERENCE_LOCALE
  const _query = `
    SELECT i.id, i.name
    FROM ingredients i
    LEFT JOIN translations t ON t.entity_id = i.id
      AND t.entity_type = 'ingredient'
      AND t.locale = '${REFERENCE_LOCALE}'
    WHERE t.id IS NULL
    ORDER BY i.name
    LIMIT ${BATCH_SIZE}
  `;

  const _url = `${SUPABASE_URL}/rest/v1/rpc/exec_sql`;

  // Proviamo con query diretta invece
  const _directUrl = `${SUPABASE_URL}/rest/v1/ingredients?select=id,name&order=name&limit=${BATCH_SIZE}`;

  // Prima otteniamo tutti gli ingredienti, poi filtriamo quelli senza traduzione
  const allIngredientsRes = await fetch(
    `${SUPABASE_URL}/rest/v1/ingredients?select=id,name&order=name`,
    {
      headers: {
        apikey: SUPABASE_KEY!,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  const translationsRes = await fetch(
    `${SUPABASE_URL}/rest/v1/translations?select=entity_id&entity_type=eq.ingredient&locale=eq.${REFERENCE_LOCALE}`,
    {
      headers: {
        apikey: SUPABASE_KEY!,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  if (!allIngredientsRes.ok || !translationsRes.ok) {
    throw new Error('Fetch failed');
  }

  const allIngredients: { id: string; name: string }[] = await allIngredientsRes.json();
  const translations: { entity_id: string }[] = await translationsRes.json();

  const translatedIds = new Set(translations.map((t) => t.entity_id));
  const missing = allIngredients.filter((ing) => !translatedIds.has(ing.id));

  return missing.slice(0, BATCH_SIZE);
}

async function insertTranslations(
  translations: { entity_id: string; locale: string; value: string }[]
): Promise<number> {
  // Output SQL per MCP (più affidabile del REST API)
  const values = translations
    .map(
      (t) =>
        `('ingredient','${t.entity_id}','name','${t.locale}','${t.value.replace(/'/g, "''")}',false,'openai-gpt4o-mini')`
    )
    .join(',\n');

  console.log('-- SQL_START');
  console.log(
    `INSERT INTO translations(entity_type,entity_id,field,locale,value,is_verified,translated_by)VALUES\n${values}\nON CONFLICT (entity_type,entity_id,field,locale) DO NOTHING;`
  );
  console.log('-- SQL_END');

  return translations.length;
}

async function translate() {
  const ingredients = await fetchMissingIngredients();

  if (ingredients.length === 0) {
    console.log('✅ Nessun ingrediente mancante!');
    return;
  }

  console.log(
    `🔍 Trovati ${ingredients.length} ingredienti senza traduzione ${REFERENCE_LOCALE}...`
  );

  const localeNames: Record<string, string> = {
    vi: 'Vietnamese',
    zh: 'Chinese Simplified',
    ja: 'Japanese',
    ko: 'Korean',
    th: 'Thai',
    ru: 'Russian',
    tr: 'Turkish',
    hi: 'Hindi',
    ar: 'Arabic',
  };

  const localeList = TARGET_LOCALES.map((l) => `${localeNames[l]} (${l})`).join(', ');
  const jsonExample = TARGET_LOCALES.map((l) => `"${l}": "..."`).join(', ');

  const prompt = `Translate these ${ingredients.length} food ingredients to ${localeList}:

${ingredients.map((ing, i) => `${i + 1}. "${ing.name}"`).join('\n')}

Return JSON array:
[{"index": 1, ${jsonExample}}, ...]`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 8000,
  });

  let content = response.choices[0]?.message?.content || '[]';
  content = content
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  let results;
  try {
    results = JSON.parse(content);
  } catch (e) {
    console.error('❌ Parse error:', e);
    return;
  }

  const translations: { entity_id: string; locale: string; value: string }[] = [];
  for (const result of results) {
    const ing = ingredients[result.index - 1];
    if (!ing) continue;

    for (const locale of TARGET_LOCALES) {
      const value = result[locale];
      if (value) {
        translations.push({ entity_id: ing.id, locale, value });
      }
    }
  }

  const inserted = await insertTranslations(translations);

  const usage = response.usage;
  const cost =
    ((usage?.prompt_tokens || 0) / 1_000_000) * 0.15 +
    ((usage?.completion_tokens || 0) / 1_000_000) * 0.6;

  console.log(
    `✅ ${inserted} traduzioni inserite | $${cost.toFixed(4)} | Rimanenti: esegui di nuovo per prossimo batch`
  );
}

translate().catch(console.error);
