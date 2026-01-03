'use client';

import { useState } from 'react';

interface NutritionData {
  calories: number;
  protein: number;
  carbohydrates: number;
  sugar?: number;
  fiber?: number;
  fat: number;
  saturated_fat?: number;
  sodium?: number;
  [key: string]: number | undefined;
}

interface IngredientJson {
  name: string;
  category: string;
  subcategory?: string;
  nutrition: NutritionData;
  allergens?: string[];
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  is_gluten_free?: boolean;
  is_dairy_free?: boolean;
  description?: string;
  origin_country?: string;
  brand?: string;
}

interface IngredientContributionFormProps {
  searchedName?: string;
  onSuccess?: (contributionId: string) => void;
  onCancel?: () => void;
}

const AI_PROMPT = `Analizza questa etichetta nutrizionale e restituisci un JSON con i dati dell'ingrediente.

REGOLE IMPORTANTI:
1. Tutti i valori nutrizionali devono essere PER 100g (normalizza se necessario)
2. Usa SOLO unità metriche (g, mg, mcg, kcal)
3. Il nome deve essere in INGLESE
4. Se un valore non è presente, usa null

FORMATO JSON RICHIESTO:
{
  "name": "Nome ingrediente in inglese",
  "category": "categoria",
  "nutrition": {
    "calories": numero,
    "protein": numero,
    "carbohydrates": numero,
    "sugar": numero,
    "fiber": numero,
    "fat": numero,
    "saturated_fat": numero,
    "sodium": numero
  },
  "allergens": ["array di allergeni se presenti"],
  "is_vegan": true/false,
  "is_vegetarian": true/false,
  "is_gluten_free": true/false,
  "is_dairy_free": true/false,
  "description": "Breve descrizione",
  "origin_country": "Codice ISO 2 lettere",
  "brand": "Marca se visibile"
}

Restituisci SOLO il JSON, senza spiegazioni.`;

export function IngredientContributionForm({
  searchedName = '',
  onSuccess,
  onCancel,
}: IngredientContributionFormProps) {
  const [step, setStep] = useState<'prompt' | 'paste' | 'review' | 'submitting' | 'success'>(
    'prompt'
  );
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState<IngredientJson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [promptCopied, setPromptCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AI_PROMPT);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      setError('Failed to copy prompt');
    }
  };

  const validateJson = (json: unknown): json is IngredientJson => {
    if (!json || typeof json !== 'object') return false;
    const data = json as Record<string, unknown>;

    if (!data.name || typeof data.name !== 'string') return false;
    if (!data.category || typeof data.category !== 'string') return false;
    if (!data.nutrition || typeof data.nutrition !== 'object') return false;

    const nutrition = data.nutrition as Record<string, unknown>;
    if (typeof nutrition.calories !== 'number') return false;
    if (typeof nutrition.protein !== 'number') return false;
    if (typeof nutrition.carbohydrates !== 'number') return false;
    if (typeof nutrition.fat !== 'number') return false;

    return true;
  };

  const parseJsonInput = () => {
    setError(null);
    try {
      // Clean up common issues
      let cleaned = jsonInput.trim();

      // Remove markdown code blocks if present
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.slice(7);
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.slice(3);
      }
      if (cleaned.endsWith('```')) {
        cleaned = cleaned.slice(0, -3);
      }
      cleaned = cleaned.trim();

      const parsed = JSON.parse(cleaned);

      if (!validateJson(parsed)) {
        setError(
          'JSON is missing required fields: name, category, and nutrition (calories, protein, carbohydrates, fat)'
        );
        return;
      }

      setParsedData(parsed);
      setStep('review');
    } catch (e) {
      setError('Invalid JSON format. Please check the format and try again.');
    }
  };

  const submitContribution = async () => {
    if (!parsedData) return;

    setStep('submitting');
    setError(null);

    try {
      const response = await fetch('/api/ingredients/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
        },
        body: JSON.stringify({
          ingredientName: parsedData.name,
          category: parsedData.category,
          submittedJson: parsedData,
          sourceType: 'photo_ai',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contribution');
      }

      setStep('success');
      onSuccess?.(data.contributionId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to submit contribution');
      setStep('review');
    }
  };

  const reset = () => {
    setStep('prompt');
    setJsonInput('');
    setParsedData(null);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contribute Ingredient</h2>
          <p className="text-sm text-gray-500">Help grow our database and earn 50 points!</p>
        </div>
        {onCancel && step !== 'success' && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center">
        {['Photo & AI', 'Paste JSON', 'Review', 'Submit'].map((label, idx) => {
          const stepIndex = ['prompt', 'paste', 'review', 'submitting'].indexOf(step);
          const isActive = idx <= stepIndex || step === 'success';
          const isCurrent = idx === stepIndex;

          return (
            <div key={label} className="flex flex-1 items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'} ${isCurrent ? 'ring-2 ring-green-500 ring-offset-2' : ''} `}
              >
                {step === 'success' && idx === 3 ? '✓' : idx + 1}
              </div>
              {idx < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 ${isActive && idx < stepIndex ? 'bg-green-500' : 'bg-gray-200'}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Prompt */}
      {step === 'prompt' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 p-4">
            <h3 className="mb-2 font-medium text-blue-900">Step 1: Use AI to Extract Data</h3>
            <ol className="list-inside list-decimal space-y-2 text-sm text-blue-800">
              <li>Take a photo of the nutrition label</li>
              <li>Copy the prompt below</li>
              <li>
                Open{' '}
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener"
                  className="underline"
                >
                  Gemini
                </a>{' '}
                or{' '}
                <a
                  href="https://chat.openai.com"
                  target="_blank"
                  rel="noopener"
                  className="underline"
                >
                  ChatGPT
                </a>
              </li>
              <li>Paste the prompt and attach your photo</li>
              <li>Copy the JSON response</li>
            </ol>
          </div>

          {searchedName && (
            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Searching for:</span> {searchedName}
              </p>
            </div>
          )}

          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              AI Prompt (click to copy)
            </label>
            <div
              onClick={copyPrompt}
              className="max-h-48 cursor-pointer overflow-y-auto rounded-xl bg-gray-50 p-4 font-mono text-xs text-gray-600 transition-colors hover:bg-gray-100"
            >
              <pre className="whitespace-pre-wrap">{AI_PROMPT}</pre>
            </div>
            {promptCopied && (
              <div className="absolute right-2 top-8 rounded bg-green-500 px-2 py-1 text-xs text-white">
                Copied!
              </div>
            )}
          </div>

          <button
            onClick={() => setStep('paste')}
            className="w-full rounded-xl bg-green-500 py-3 font-medium text-white transition-colors hover:bg-green-600"
          >
            I have the JSON response
          </button>
        </div>
      )}

      {/* Step 2: Paste JSON */}
      {step === 'paste' && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Paste JSON from AI
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"name": "Greek Yogurt", "category": "dairy", ...}'
              className="h-64 w-full rounded-xl border border-gray-300 px-4 py-3 font-mono text-sm focus:border-transparent focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep('prompt')}
              className="flex-1 rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={parseJsonInput}
              disabled={!jsonInput.trim()}
              className="flex-1 rounded-xl bg-green-500 py-3 font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Parse & Review
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 'review' && parsedData && (
        <div className="space-y-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <h3 className="mb-3 font-medium text-gray-900">Review Ingredient Data</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>
                <p className="font-medium">{parsedData.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Category:</span>
                <p className="font-medium capitalize">{parsedData.category.replace('_', ' ')}</p>
              </div>
              {parsedData.brand && (
                <div>
                  <span className="text-gray-500">Brand:</span>
                  <p className="font-medium">{parsedData.brand}</p>
                </div>
              )}
              {parsedData.origin_country && (
                <div>
                  <span className="text-gray-500">Origin:</span>
                  <p className="font-medium">{parsedData.origin_country}</p>
                </div>
              )}
            </div>

            <hr className="my-4" />

            <h4 className="mb-2 text-sm font-medium text-gray-700">Nutrition per 100g</h4>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="rounded-lg bg-white p-2 text-center">
                <p className="text-xs text-gray-500">Calories</p>
                <p className="font-bold">{parsedData.nutrition.calories}</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center">
                <p className="text-xs text-gray-500">Protein</p>
                <p className="font-bold">{parsedData.nutrition.protein}g</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center">
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="font-bold">{parsedData.nutrition.carbohydrates}g</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center">
                <p className="text-xs text-gray-500">Fat</p>
                <p className="font-bold">{parsedData.nutrition.fat}g</p>
              </div>
            </div>

            {parsedData.allergens && parsedData.allergens.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Allergens</h4>
                <div className="flex flex-wrap gap-2">
                  {parsedData.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {parsedData.is_vegan && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Vegan
                </span>
              )}
              {parsedData.is_vegetarian && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Vegetarian
                </span>
              )}
              {parsedData.is_gluten_free && (
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Gluten Free
                </span>
              )}
              {parsedData.is_dairy_free && (
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Dairy Free
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div className="rounded-xl bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Earn 50 points</span> when your contribution is approved
              by our team!
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('paste')}
              className="flex-1 rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Edit JSON
            </button>
            <button
              onClick={submitContribution}
              className="flex-1 rounded-xl bg-green-500 py-3 font-medium text-white transition-colors hover:bg-green-600"
            >
              Submit for Review
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Submitting */}
      {step === 'submitting' && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
          <p className="text-gray-600">Submitting your contribution...</p>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 'success' && (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">Contribution Submitted!</h3>
          <p className="mb-6 text-gray-600">
            Thank you for helping grow our ingredient database. You&apos;ll earn 50 points when
            approved!
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Add Another
            </button>
            {onCancel && (
              <button
                onClick={onCancel}
                className="rounded-xl bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
