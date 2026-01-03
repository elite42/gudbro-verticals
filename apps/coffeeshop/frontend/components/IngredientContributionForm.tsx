'use client';

import { useState } from 'react';
import {
  submitIngredientContribution,
  INGREDIENT_CATEGORIES,
  COMMON_ALLERGENS,
  DIETARY_TAGS,
  type IngredientData,
} from '../lib/contribution-service';

interface IngredientContributionFormProps {
  onClose: () => void;
  onSuccess?: (contributionId: string) => void;
}

export function IngredientContributionForm({
  onClose,
  onSuccess,
}: IngredientContributionFormProps) {
  const [step, setStep] = useState<'form' | 'allergens' | 'dietary' | 'review'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [nameLocal, setNameLocal] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  const handleAllergenToggle = (allergen: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleDietaryToggle = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Il nome ingrediente è obbligatorio');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const ingredientData: IngredientData = {
      name: name.trim(),
      nameLocal: nameLocal.trim() || undefined,
      category: category || undefined,
      description: description.trim() || undefined,
      origin: origin.trim() || undefined,
      allergens: selectedAllergens.length > 0 ? selectedAllergens : undefined,
      dietary: selectedDietary.length > 0 ? selectedDietary : undefined,
    };

    const result = await submitIngredientContribution(name.trim(), ingredientData, {
      category: category || undefined,
      sourceType: 'manual',
    });

    setIsSubmitting(false);

    if (result.success && result.contributionId) {
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess?.(result.contributionId!);
        onClose();
      }, 2000);
    } else {
      setError(result.error || 'Errore durante l\'invio');
    }
  };

  const categoryLabels: Record<string, string> = {
    vegetables: 'Verdure',
    fruits: 'Frutta',
    meat: 'Carne',
    poultry: 'Pollame',
    seafood: 'Pesce e Frutti di Mare',
    dairy: 'Latticini',
    grains: 'Cereali',
    legumes: 'Legumi',
    nuts_seeds: 'Frutta Secca e Semi',
    herbs: 'Erbe',
    spices: 'Spezie',
    oils_fats: 'Oli e Grassi',
    sweeteners: 'Dolcificanti',
    condiments: 'Condimenti',
    beverages: 'Bevande',
    other: 'Altro',
  };

  const allergenLabels: Record<string, string> = {
    gluten: 'Glutine',
    milk: 'Latte',
    eggs: 'Uova',
    fish: 'Pesce',
    crustaceans: 'Crostacei',
    molluscs: 'Molluschi',
    peanuts: 'Arachidi',
    nuts: 'Frutta a guscio',
    soya: 'Soia',
    celery: 'Sedano',
    mustard: 'Senape',
    sesame: 'Sesamo',
    sulphites: 'Solfiti',
    lupin: 'Lupini',
  };

  const dietaryLabels: Record<string, string> = {
    vegan: 'Vegano',
    vegetarian: 'Vegetariano',
    gluten_free: 'Senza Glutine',
    dairy_free: 'Senza Latticini',
    nut_free: 'Senza Frutta a Guscio',
    halal: 'Halal',
    kosher: 'Kosher',
    organic: 'Biologico',
    low_carb: 'Low Carb',
    keto: 'Keto',
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-bounce-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Contributo Inviato!</h3>
          <p className="text-gray-600">
            Grazie per il tuo contributo. Riceverai 50 punti quando sarà approvato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-end sm:items-center justify-center">
      <div className="bg-theme-bg-elevated rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-theme-bg-elevated border-b border-theme-bg-tertiary p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {step !== 'form' && (
              <button
                onClick={() => {
                  if (step === 'allergens') setStep('form');
                  else if (step === 'dietary') setStep('allergens');
                  else if (step === 'review') setStep('dietary');
                }}
                className="p-2 hover:bg-theme-bg-secondary rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-lg font-bold text-theme-text-primary">
              {step === 'form' && 'Nuovo Ingrediente'}
              {step === 'allergens' && 'Allergeni'}
              {step === 'dietary' && 'Info Dietetiche'}
              {step === 'review' && 'Conferma'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-theme-bg-secondary rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2 bg-theme-bg-secondary">
          <div className="flex gap-1">
            {['form', 'allergens', 'dietary', 'review'].map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  ['form', 'allergens', 'dietary', 'review'].indexOf(step) >= i
                    ? 'bg-green-500'
                    : 'bg-theme-bg-tertiary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 'form' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-theme-text-primary mb-1">
                  Nome Ingrediente *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="es. Basilico Genovese"
                  className="w-full px-4 py-3 border border-theme-bg-tertiary rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-theme-bg-secondary text-theme-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-text-primary mb-1">
                  Nome in Italiano (opzionale)
                </label>
                <input
                  type="text"
                  value={nameLocal}
                  onChange={(e) => setNameLocal(e.target.value)}
                  placeholder="Nome locale o traduzione"
                  className="w-full px-4 py-3 border border-theme-bg-tertiary rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-theme-bg-secondary text-theme-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-text-primary mb-1">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-theme-bg-tertiary rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-theme-bg-secondary text-theme-text-primary"
                >
                  <option value="">Seleziona categoria...</option>
                  {INGREDIENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabels[cat] || cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-text-primary mb-1">
                  Origine (opzionale)
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="es. Italia, Liguria"
                  className="w-full px-4 py-3 border border-theme-bg-tertiary rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-theme-bg-secondary text-theme-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-text-primary mb-1">
                  Descrizione (opzionale)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Breve descrizione dell'ingrediente..."
                  rows={3}
                  className="w-full px-4 py-3 border border-theme-bg-tertiary rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-theme-bg-secondary text-theme-text-primary resize-none"
                />
              </div>

              <button
                onClick={() => name.trim() ? setStep('allergens') : setError('Il nome è obbligatorio')}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Continua
              </button>
            </div>
          )}

          {/* Step 2: Allergens */}
          {step === 'allergens' && (
            <div className="space-y-4">
              <p className="text-sm text-theme-text-secondary mb-4">
                Seleziona gli allergeni contenuti in questo ingrediente (se presenti)
              </p>

              <div className="grid grid-cols-2 gap-2">
                {COMMON_ALLERGENS.map((allergen) => (
                  <button
                    key={allergen}
                    onClick={() => handleAllergenToggle(allergen)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedAllergens.includes(allergen)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-theme-bg-tertiary bg-theme-bg-secondary text-theme-text-primary hover:border-theme-text-tertiary'
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {allergenLabels[allergen] || allergen}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => setStep('dietary')}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Continua
                </button>
                <button
                  onClick={() => {
                    setSelectedAllergens([]);
                    setStep('dietary');
                  }}
                  className="w-full text-theme-text-secondary py-2 text-sm"
                >
                  Nessun allergene - Salta
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Dietary */}
          {step === 'dietary' && (
            <div className="space-y-4">
              <p className="text-sm text-theme-text-secondary mb-4">
                Seleziona le caratteristiche dietetiche applicabili
              </p>

              <div className="grid grid-cols-2 gap-2">
                {DIETARY_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleDietaryToggle(tag)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedDietary.includes(tag)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-theme-bg-tertiary bg-theme-bg-secondary text-theme-text-primary hover:border-theme-text-tertiary'
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {dietaryLabels[tag] || tag}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => setStep('review')}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Continua
                </button>
                <button
                  onClick={() => {
                    setSelectedDietary([]);
                    setStep('review');
                  }}
                  className="w-full text-theme-text-secondary py-2 text-sm"
                >
                  Nessuna selezione - Salta
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="bg-theme-bg-secondary rounded-xl p-4 space-y-3">
                <div>
                  <span className="text-xs text-theme-text-tertiary uppercase tracking-wide">Nome</span>
                  <p className="font-semibold text-theme-text-primary">{name}</p>
                </div>

                {nameLocal && (
                  <div>
                    <span className="text-xs text-theme-text-tertiary uppercase tracking-wide">Nome Locale</span>
                    <p className="text-theme-text-primary">{nameLocal}</p>
                  </div>
                )}

                {category && (
                  <div>
                    <span className="text-xs text-theme-text-tertiary uppercase tracking-wide">Categoria</span>
                    <p className="text-theme-text-primary">{categoryLabels[category] || category}</p>
                  </div>
                )}

                {origin && (
                  <div>
                    <span className="text-xs text-theme-text-tertiary uppercase tracking-wide">Origine</span>
                    <p className="text-theme-text-primary">{origin}</p>
                  </div>
                )}

                {description && (
                  <div>
                    <span className="text-xs text-theme-text-tertiary uppercase tracking-wide">Descrizione</span>
                    <p className="text-theme-text-primary text-sm">{description}</p>
                  </div>
                )}

                {selectedAllergens.length > 0 && (
                  <div>
                    <span className="text-xs text-theme-text-tertiary uppercase tracking-wide">Allergeni</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedAllergens.map((a) => (
                        <span key={a} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          {allergenLabels[a] || a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDietary.length > 0 && (
                  <div>
                    <span className="text-xs text-theme-text-tertiary uppercase tracking-wide">Dietetico</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedDietary.map((d) => (
                        <span key={d} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {dietaryLabels[d] || d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
                <div>
                  <p className="font-semibold text-purple-900">+50 punti</p>
                  <p className="text-sm text-purple-700">Riceverai i punti all'approvazione</p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Invio in corso...
                  </>
                ) : (
                  'Invia Contributo'
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
