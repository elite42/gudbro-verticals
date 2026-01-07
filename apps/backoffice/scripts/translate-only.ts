/**
 * Translate Only Script
 *
 * Traduce ingredienti e stampa SQL ready per inserimento.
 * Non richiede SUPABASE_SERVICE_ROLE_KEY.
 *
 * Esegui con: npx tsx scripts/translate-only.ts
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
  // .env.local file may not exist, ignore
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY mancante');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// 50 ingredienti da tradurre (Batch 9 - presi dal DB)
const INGREDIENTS = [
  { id: 'ING_CASSAVA_FLOUR', name: 'Cassava Flour' },
  { id: 'ING_CASSAVA_STARCH', name: 'Cassava Starch' },
  { id: 'ING_CASTELMAGNO', name: 'Castelmagno' },
  { id: 'ING_CASTELO_BRANCO', name: 'Castelo Branco' },
  { id: 'ING_GRAPE_CATARRATTO', name: 'Catarratto Grape' },
  { id: 'ING_CATFISH', name: 'Catfish' },
  { id: 'ING_CATUPIRY', name: 'Catupiry' },
  { id: 'ING_CAULIFLOWER', name: 'Cauliflower' },
  { id: 'ING_OIL_CAYENNE', name: 'Cayenne Oil' },
  { id: 'ING_CAYENNE_PEPPER', name: 'Cayenne Pepper' },
  { id: 'ING_CAYENNE', name: 'Cayenne Pepper' },
  { id: 'ING_CECINA', name: 'Cecina' },
  { id: 'ING_CELERY', name: 'Celery' },
  { id: 'ING_CELERY_SALT', name: 'Celery Salt' },
  { id: 'ING_CELERY_SEEDS', name: 'Celery Seeds' },
  { id: 'ING_CEMPEDAK', name: 'Cempedak' },
  { id: 'ING_CENTURY_EGG', name: 'Century Egg (Preserved Egg)' },
  { id: 'ING_CERVELAT', name: 'Cervelat' },
  { id: 'ING_CEVAPI', name: 'Cevapi' },
  { id: 'ING_CEVIZ', name: 'Ceviz' },
  { id: 'ING_CHA_LUA', name: 'Cha Lua' },
  { id: 'ING_CHAAT_MASALA', name: 'Chaat Masala' },
  { id: 'ING_CHADON_BENI', name: 'Chadon Beni' },
  { id: 'ING_CHAGA', name: 'Chaga Mushroom Powder' },
  { id: 'ING_CHAI_CONCENTRATE', name: 'Chai Concentrate' },
  { id: 'ING_CHAI_SPICE', name: 'Chai Spice Blend' },
  { id: 'ING_CHAMBORD', name: 'Chambord' },
  { id: 'ING_CHAMPAGNE', name: 'Champagne' },
  { id: 'ING_CHANCACA', name: 'Chancaca' },
  { id: 'ING_CHAOURCE', name: 'Chaource' },
  { id: 'ING_CHAR_SIU', name: 'Char Siu (BBQ Pork)' },
  { id: 'ING_CHAR_SIU_SAUCE', name: 'Char Siu Sauce' },
  { id: 'ING_GRAPE_CHARDONNAY', name: 'Chardonnay Grape' },
  { id: 'ING_CHARQUE', name: 'Charque' },
  { id: 'ING_CHARQUI', name: 'Charqui' },
  { id: 'ING_CHARTREUSE_GREEN', name: 'Chartreuse Green' },
  { id: 'ING_CHARTREUSE_YELLOW', name: 'Chartreuse Yellow' },
  { id: 'ING_CHASHU_PORK', name: 'Chashu Pork' },
  { id: 'ING_GRAPE_CHASSELAS', name: 'Chasselas Grape' },
  { id: 'ING_CHAYOTE', name: 'Chayote' },
  { id: 'ING_CHEDDAR', name: 'Cheddar' },
  { id: 'ING_CHEESE', name: 'Cheese' },
  { id: 'ING_CHEESE_CURDS', name: 'Cheese Curds' },
  { id: 'ING_CHEESE_POWDER', name: 'Cheese Powder' },
  { id: 'ING_CHEESE_SAUCE', name: 'Cheese Sauce' },
  { id: 'ING_GRAPE_CHENIN_BLANC', name: 'Chenin Blanc Grape' },
  { id: 'ING_CHERIMOYA', name: 'Cherimoya' },
  { id: 'ING_CHERMOULA', name: 'Chermoula' },
  { id: 'ING_CHERRY', name: 'Cherry' },
  { id: 'ING_CHERRY_HEERING', name: 'Cherry Heering' },
];

const TARGET_LOCALES = ['it', 'es', 'fr', 'de', 'pt'];

const SYSTEM_PROMPT = `You are a food terminology translator. Translate ingredient names.
RULES:
1. Keep proper nouns as-is when appropriate
2. Use common culinary terms
3. Return ONLY valid JSON`;

async function translate() {
  console.log('🌍 Translating 50 ingredients to 5 languages...\n');

  const prompt = `Translate these 50 food ingredients to Italian (it), Spanish (es), French (fr), German (de), Portuguese (pt):

${INGREDIENTS.map((ing, i) => `${i + 1}. "${ing.name}"`).join('\n')}

Return JSON array:
[{"index": 1, "it": "...", "es": "...", "fr": "...", "de": "...", "pt": "..."}, ...]`;

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

  // Rimuovi markdown code blocks se presenti
  content = content
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  let results;
  try {
    results = JSON.parse(content);
  } catch (e) {
    console.error('Parse error:', e);
    console.error('Content:', content.slice(0, 1000));
    return;
  }

  // Generate SQL
  console.log('-- SQL INSERT for translations\n');
  console.log(
    'INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES'
  );

  const values: string[] = [];
  for (const result of results) {
    const ing = INGREDIENTS[result.index - 1];
    if (!ing) continue;

    for (const locale of TARGET_LOCALES) {
      const value = result[locale];
      if (value) {
        const escaped = value.replace(/'/g, "''");
        values.push(
          `('ingredient', '${ing.id}', 'name', '${locale}', '${escaped}', false, 'openai-gpt4o-mini')`
        );
      }
    }
  }

  console.log(values.join(',\n'));
  console.log('ON CONFLICT DO NOTHING;\n');

  // Stats
  const usage = response.usage;
  const cost =
    ((usage?.prompt_tokens || 0) / 1_000_000) * 0.15 +
    ((usage?.completion_tokens || 0) / 1_000_000) * 0.6;

  console.log(
    `-- Stats: ${usage?.prompt_tokens} input, ${usage?.completion_tokens} output, $${cost.toFixed(4)}`
  );
  console.log(`-- Total: ${values.length} translations`);
}

translate().catch(console.error);
