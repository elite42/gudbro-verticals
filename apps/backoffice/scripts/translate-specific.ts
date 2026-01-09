/**
 * Translate Specific Ingredients - reads from /tmp/missing_ingredients.json
 */
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local
const envPath = resolve(
  '/Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/backoffice/.env.local'
);
try {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
} catch (_e) {
  // .env.local is optional
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY mancante');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const TARGET_LOCALES = ['vi', 'zh', 'ja', 'ko', 'th', 'ru', 'tr', 'hi', 'ar'];

const SYSTEM_PROMPT = `You are a food terminology translator. Translate ingredient names.
RULES:
1. Keep proper nouns as-is when appropriate (Benedictine, Biscotti, Biltong)
2. Use common culinary terms
3. Return ONLY valid JSON`;

async function translate() {
  const ingredients: { id: string; name: string }[] = JSON.parse(
    readFileSync('/tmp/missing_ingredients.json', 'utf-8')
  );

  console.error(`🔍 Translating ${ingredients.length} ingredients...`);

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
    console.error('Content:', content);
    return;
  }

  const translations: string[] = [];
  for (const result of results) {
    const ing = ingredients[result.index - 1];
    if (!ing) continue;

    for (const locale of TARGET_LOCALES) {
      const value = result[locale];
      if (value) {
        translations.push(
          `('ingredient','${ing.id}','name','${locale}','${value.replace(/'/g, "''")}',false,'openai-gpt4o-mini')`
        );
      }
    }
  }

  // Output SQL
  console.log(
    `INSERT INTO translations(entity_type,entity_id,field,locale,value,is_verified,translated_by)VALUES`
  );
  console.log(translations.join(',\n'));
  console.log(`ON CONFLICT (entity_type,entity_id,field,locale) DO NOTHING;`);

  const usage = response.usage;
  const cost =
    ((usage?.prompt_tokens || 0) / 1_000_000) * 0.15 +
    ((usage?.completion_tokens || 0) / 1_000_000) * 0.6;

  console.error(`✅ ${translations.length} traduzioni | $${cost.toFixed(4)}`);
}

translate().catch(console.error);
