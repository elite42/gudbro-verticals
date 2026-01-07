/**
 * Test Translation Script
 *
 * Testa il servizio di traduzione con 5 ingredienti su 3 lingue.
 * NON salva nel database - mostra solo i risultati per verifica.
 *
 * Esegui con: npx tsx scripts/test-translation.ts
 */

import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Carica .env.local manualmente
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
  console.log('Nota: .env.local non trovato, uso variabili ambiente');
}

// Configurazione
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY non configurata!');
  console.log('Esegui: export OPENAI_API_KEY="sk-..."');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// 5 ingredienti di test (non ancora tradotti)
const TEST_ITEMS = [
  { id: 'ING_AARUUL', name: 'Aaruul', category: 'cheese', note: 'Formaggio mongolo essiccato' },
  { id: 'ING_ABONDANCE', name: 'Abondance', category: 'cheese', note: 'Formaggio francese AOC' },
  { id: 'ING_ABSINTHE', name: 'Absinthe', category: 'spirits', note: 'Liquore alle erbe' },
  { id: 'ING_ABURAAGE', name: 'Aburaage', category: 'legumes', note: 'Tofu fritto giapponese' },
  { id: 'ING_ACAI', name: 'Acai Berry (Frozen)', category: 'fruits', note: 'Bacca brasiliana' },
];

// 3 lingue di test
const TARGET_LOCALES = ['it', 'es', 'fr'];

const SYSTEM_PROMPT = `You are a professional food and restaurant terminology translator.

RULES:
1. Translate ONLY the text provided
2. Keep proper nouns (AOC cheese names, traditional dish names) that shouldn't be translated
3. Use culinary terminology appropriate to each locale
4. For ingredients: use the most common local name
5. Return ONLY valid JSON, no markdown, no explanations

CONTEXT: Food & Beverage industry - ingredients for restaurant menus.`;

async function testTranslation() {
  console.log('🧪 TEST TRADUZIONE - Fase 1\n');
  console.log('═'.repeat(60));
  console.log(`📦 Ingredienti: ${TEST_ITEMS.length}`);
  console.log(`🌍 Lingue: ${TARGET_LOCALES.join(', ')}`);
  console.log(`💰 Costo stimato: ~$0.001`);
  console.log('═'.repeat(60));
  console.log();

  // Costruisci prompt
  const itemsList = TEST_ITEMS.map((item, idx) => `${idx + 1}. "${item.name}" (${item.note})`).join(
    '\n'
  );

  const prompt = `Translate these 5 food ingredients to Italian (it), Spanish (es), and French (fr):

${itemsList}

Return a JSON object with this exact structure:
{
  "translations": [
    {"index": 1, "it": "...", "es": "...", "fr": "..."},
    {"index": 2, "it": "...", "es": "...", "fr": "..."}
  ]
}

IMPORTANT: Some items like "Aaruul", "Abondance", "Aburaage" are proper nouns - keep them as-is or provide the local equivalent if commonly used.`;

  console.log('📤 Invio richiesta a OpenAI GPT-4o-mini...\n');

  const startTime = Date.now();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const durationMs = Date.now() - startTime;
    const content = response.choices[0]?.message?.content || '{}';

    // Parse response
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error('❌ Errore parsing JSON:', content);
      return;
    }

    // Mostra risultati
    console.log('✅ RISULTATI TRADUZIONE\n');
    console.log('─'.repeat(60));

    for (const result of parsed.translations || []) {
      const item = TEST_ITEMS[result.index - 1];
      if (!item) continue;

      console.log(`\n📌 ${item.name} (${item.category})`);
      console.log(`   🇮🇹 IT: ${result.it || '—'}`);
      console.log(`   🇪🇸 ES: ${result.es || '—'}`);
      console.log(`   🇫🇷 FR: ${result.fr || '—'}`);
    }

    console.log('\n' + '─'.repeat(60));

    // Stats
    const usage = response.usage;
    const inputCost = ((usage?.prompt_tokens || 0) / 1_000_000) * 0.15;
    const outputCost = ((usage?.completion_tokens || 0) / 1_000_000) * 0.6;
    const totalCost = inputCost + outputCost;

    console.log('\n📊 STATISTICHE');
    console.log(`   ⏱️  Durata: ${durationMs}ms`);
    console.log(`   📥 Input tokens: ${usage?.prompt_tokens || 0}`);
    console.log(`   📤 Output tokens: ${usage?.completion_tokens || 0}`);
    console.log(`   💵 Costo: $${totalCost.toFixed(6)}`);

    console.log('\n' + '═'.repeat(60));
    console.log('⚠️  NESSUN DATO SALVATO - Solo test di verifica');
    console.log('═'.repeat(60));
  } catch (error) {
    console.error('❌ Errore:', error);
  }
}

// Esegui
testTranslation();
