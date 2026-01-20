'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  Calculator,
  ChefHat,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Plus,
  Trash2,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  Trophy,
  Lightbulb,
  BookOpen,
  Loader2,
} from 'lucide-react';

type OnboardingStep = 'intro' | 'education' | 'dishes' | 'ingredients' | 'results';

interface DishEntry {
  id: string;
  name: string;
  sellingPrice: number;
  category: string;
}

interface IngredientEntry {
  id: string;
  name: string;
  costPerKg: number;
  dishId: string;
  quantityGrams: number;
}

const steps: { id: OnboardingStep; name: string; icon: typeof Calculator }[] = [
  { id: 'intro', name: 'Benvenuto', icon: Sparkles },
  { id: 'education', name: 'Perché conta', icon: BookOpen },
  { id: 'dishes', name: 'I tuoi piatti', icon: ChefHat },
  { id: 'ingredients', name: 'Ingredienti', icon: DollarSign },
  { id: 'results', name: 'Risultati', icon: Trophy },
];

const categories = [
  { id: 'antipasti', name: 'Antipasti', icon: '🥗' },
  { id: 'primi', name: 'Primi', icon: '🍝' },
  { id: 'secondi', name: 'Secondi', icon: '🥩' },
  { id: 'contorni', name: 'Contorni', icon: '🥬' },
  { id: 'dolci', name: 'Dolci', icon: '🍰' },
  { id: 'bevande', name: 'Bevande', icon: '🍹' },
];

// Knowledge nuggets to display during education
const knowledgeNuggets = [
  {
    title: 'Il 90% dei ristoranti',
    fact: 'calcola SOLO il food cost ingredienti e prende decisioni su dati incompleti.',
    icon: AlertTriangle,
    color: 'amber',
  },
  {
    title: 'Food Cost ideale',
    fact: '25-35% per casual dining, 30-40% per fine dining. Sopra il 40% è pericoloso.',
    icon: Target,
    color: 'blue',
  },
  {
    title: 'Prime Cost (Food + Labor)',
    fact: 'Deve essere < 60%. Sopra il 65% il ristorante è in pericolo.',
    icon: Calculator,
    color: 'purple',
  },
  {
    title: 'Piatti Dogs',
    fact: 'Basso margine + basse vendite = RIMUOVILI dal menu. Liberano spazio per i tuoi Stars.',
    icon: TrendingUp,
    color: 'red',
  },
];

export default function FoodCostOnboardingPage() {
  const router = useRouter();
  const { location, brand } = useTenant();
  const locationId = location?.id || brand?.id;

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro');
  const [dishes, setDishes] = useState<DishEntry[]>([]);
  const [ingredients, setIngredients] = useState<IngredientEntry[]>([]);
  const [selectedDishForIngredients, setSelectedDishForIngredients] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // New dish form state
  const [newDish, setNewDish] = useState({ name: '', sellingPrice: '', category: 'primi' });

  // New ingredient form state
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    costPerKg: '',
    quantityGrams: '',
  });

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  // Load existing dishes when entering dishes step
  const loadExistingDishes = useCallback(async () => {
    if (!locationId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/food-cost/dishes?locationId=${locationId}`);
      const data = await res.json();

      if (data.dishes && data.dishes.length > 0) {
        const mappedDishes: DishEntry[] = data.dishes.map((d: Record<string, unknown>) => ({
          id: d.id as string,
          name: d.name as string,
          sellingPrice: d.selling_price as number,
          category: d.category as string,
        }));
        setDishes(mappedDishes);

        // Also load ingredients for each dish
        const allIngredients: IngredientEntry[] = [];
        for (const dish of data.dishes) {
          if (dish.ingredients && Array.isArray(dish.ingredients)) {
            for (const ing of dish.ingredients) {
              allIngredients.push({
                id: ing.id,
                name: ing.ingredient_name,
                costPerKg: ing.cost_per_kg,
                dishId: dish.id,
                quantityGrams: ing.quantity_grams,
              });
            }
          }
        }
        setIngredients(allIngredients);
      }
    } catch (err) {
      console.error('Error loading dishes:', err);
    } finally {
      setIsLoading(false);
    }
  }, [locationId]);

  // Load existing data on mount
  useEffect(() => {
    if (locationId) {
      loadExistingDishes();
    }
  }, [locationId, loadExistingDishes]);

  const addDish = async () => {
    if (!newDish.name || !newDish.sellingPrice || !locationId) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/food-cost/dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          name: newDish.name,
          category: newDish.category,
          sellingPrice: parseFloat(newDish.sellingPrice),
        }),
      });

      const data = await res.json();
      if (data.dish) {
        setDishes([
          ...dishes,
          {
            id: data.dish.id,
            name: data.dish.name,
            sellingPrice: data.dish.selling_price,
            category: data.dish.category,
          },
        ]);
        setNewDish({ name: '', sellingPrice: '', category: 'primi' });
      }
    } catch (err) {
      console.error('Error adding dish:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const removeDish = async (id: string) => {
    setIsSaving(true);
    try {
      await fetch(`/api/food-cost/dishes/${id}`, { method: 'DELETE' });
      setDishes(dishes.filter((d) => d.id !== id));
      setIngredients(ingredients.filter((i) => i.dishId !== id));
    } catch (err) {
      console.error('Error removing dish:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const addIngredient = async () => {
    if (!newIngredient.name || !newIngredient.costPerKg || !selectedDishForIngredients) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/food-cost/dishes/${selectedDishForIngredients}/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredientName: newIngredient.name,
          costPerKg: parseFloat(newIngredient.costPerKg),
          quantityGrams: parseFloat(newIngredient.quantityGrams) || 100,
        }),
      });

      const data = await res.json();
      if (data.ingredient) {
        setIngredients([
          ...ingredients,
          {
            id: data.ingredient.id,
            name: data.ingredient.ingredient_name,
            costPerKg: data.ingredient.cost_per_kg,
            dishId: selectedDishForIngredients,
            quantityGrams: data.ingredient.quantity_grams,
          },
        ]);
        setNewIngredient({ name: '', costPerKg: '', quantityGrams: '' });
      }
    } catch (err) {
      console.error('Error adding ingredient:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const removeIngredient = async (id: string) => {
    const ingredient = ingredients.find((i) => i.id === id);
    if (!ingredient) return;

    setIsSaving(true);
    try {
      await fetch(`/api/food-cost/dishes/${ingredient.dishId}/ingredients/${id}`, {
        method: 'DELETE',
      });
      setIngredients(ingredients.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Error removing ingredient:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate food cost for a dish
  const calculateDishFoodCost = (dishId: string): number => {
    const dishIngredients = ingredients.filter((i) => i.dishId === dishId);
    return dishIngredients.reduce((sum, ing) => {
      return sum + (ing.costPerKg * ing.quantityGrams) / 1000;
    }, 0);
  };

  // Calculate food cost percentage
  const calculateFoodCostPercent = (dishId: string): number => {
    const dish = dishes.find((d) => d.id === dishId);
    if (!dish) return 0;
    const foodCost = calculateDishFoodCost(dishId);
    return (foodCost / dish.sellingPrice) * 100;
  };

  // Get BCG classification
  const getBCGClassification = (
    foodCostPercent: number
  ): { name: string; color: string; emoji: string } => {
    if (foodCostPercent < 25) return { name: 'Star', color: 'text-yellow-600', emoji: '⭐' };
    if (foodCostPercent < 35) return { name: 'Puzzle', color: 'text-purple-600', emoji: '❓' };
    if (foodCostPercent < 45) return { name: 'Plowhorse', color: 'text-blue-600', emoji: '🐴' };
    return { name: 'Dog', color: 'text-red-600', emoji: '💀' };
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'intro':
      case 'education':
        return true;
      case 'dishes':
        return dishes.length >= 1;
      case 'ingredients':
        return dishes.every((d) => ingredients.filter((i) => i.dishId === d.id).length > 0);
      case 'results':
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepId = steps[currentIndex + 1].id;
      setCurrentStep(nextStepId);

      // Auto-select first dish when entering ingredients step
      if (nextStepId === 'ingredients' && dishes.length > 0 && !selectedDishForIngredients) {
        setSelectedDishForIngredients(dishes[0].id);
      }
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleComplete = () => {
    // Data is already saved to API via real-time calls
    router.push('/food-cost');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-2">
                <Calculator className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900">Food Cost Setup</h1>
                  <InfoTooltip contentKey="pages.foodCostSetup" kbPageId="food-cost-setup" />
                </div>
                <p className="text-sm text-gray-500">Scopri i tuoi margini reali</p>
              </div>
            </div>
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
              Esci
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="mt-4 flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = step.id === currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 ${
                      isCurrent
                        ? 'text-orange-600'
                        : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isCompleted ? 'bg-green-100' : isCurrent ? 'bg-orange-100' : 'bg-gray-100'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className="hidden text-sm font-medium sm:inline">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-8 sm:w-16 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Step: Intro */}
        {currentStep === 'intro' && (
          <div className="py-12 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <Sparkles className="h-10 w-10 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Benvenuto nel Food Cost Tracker</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
              In pochi minuti scoprirai quali piatti ti fanno guadagnare e quali ti stanno facendo
              perdere soldi.
            </p>

            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900">5 minuti</h3>
                <p className="mt-1 text-sm text-gray-500">Per inserire i tuoi primi 5 piatti</p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Margini reali</h3>
                <p className="mt-1 text-sm text-gray-500">Scopri il food cost % di ogni piatto</p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Menu Engineering</h3>
                <p className="mt-1 text-sm text-gray-500">Stars, Puzzles, Plowhorses, Dogs</p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-xl rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600" />
                <div className="text-left">
                  <p className="font-medium text-amber-900">Lo sapevi?</p>
                  <p className="mt-1 text-sm text-amber-800">
                    "Investire 2 ore con il tuo chef per inserire i dati corretti può farti scoprire
                    €500/mese di margine nascosto."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Education */}
        {currentStep === 'education' && (
          <div className="py-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Perché il Food Cost conta?</h2>
              <p className="mt-2 text-gray-600">Ecco cosa devi sapere prima di iniziare</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {knowledgeNuggets.map((nugget, index) => {
                const Icon = nugget.icon;
                return (
                  <div
                    key={index}
                    className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md`}
                  >
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center bg-${nugget.color}-100 mb-4 rounded-lg`}
                    >
                      <Icon className={`h-5 w-5 text-${nugget.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{nugget.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{nugget.fact}</p>
                  </div>
                );
              })}
            </div>

            {/* Formula Card */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
              <h3 className="mb-4 text-lg font-semibold">Formula Food Cost %</h3>
              <div className="rounded-lg bg-white/10 p-4 text-center font-mono text-lg">
                Food Cost % = (Costo ingredienti / Prezzo vendita) × 100
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="font-medium text-green-400">Ottimo</p>
                  <p className="text-gray-300">&lt; 30%</p>
                </div>
                <div>
                  <p className="font-medium text-yellow-400">Accettabile</p>
                  <p className="text-gray-300">30-40%</p>
                </div>
                <div>
                  <p className="font-medium text-red-400">Pericoloso</p>
                  <p className="text-gray-300">&gt; 40%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Dishes */}
        {currentStep === 'dishes' && (
          <div className="py-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Inserisci i tuoi piatti</h2>
              <p className="mt-2 text-gray-600">
                Inizia con almeno 5 piatti per un'analisi significativa
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                <span className="ml-2 text-gray-600">Caricamento piatti esistenti...</span>
              </div>
            ) : (
              <>
                {/* Add Dish Form */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 font-medium text-gray-900">Aggiungi un piatto</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-sm text-gray-600">Nome piatto</label>
                      <input
                        type="text"
                        value={newDish.name}
                        onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                        placeholder="es. Spaghetti alla Carbonara"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-600">Prezzo vendita (€)</label>
                      <input
                        type="number"
                        step="0.50"
                        value={newDish.sellingPrice}
                        onChange={(e) => setNewDish({ ...newDish, sellingPrice: e.target.value })}
                        placeholder="es. 14.00"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-600">Categoria</label>
                      <select
                        value={newDish.category}
                        onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={addDish}
                    disabled={!newDish.name || !newDish.sellingPrice || isSaving}
                    className="mt-4 flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    Aggiungi Piatto
                  </button>
                </div>

                {/* Dishes List */}
                {dishes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">I tuoi piatti ({dishes.length})</h3>
                    {dishes.map((dish) => {
                      const category = categories.find((c) => c.id === dish.category);
                      return (
                        <div
                          key={dish.id}
                          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{category?.icon || '🍽️'}</span>
                            <div>
                              <p className="font-medium text-gray-900">{dish.name}</p>
                              <p className="text-sm text-gray-500">{category?.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold text-green-600">
                              €{dish.sellingPrice.toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeDish(dish.id)}
                              className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Quick wins */}
                {dishes.length > 0 && dishes.length < 5 && (
                  <div className="mt-6 rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-5 w-5 text-amber-600" />
                      <p className="text-sm text-amber-800">
                        <strong>Quick win:</strong> Inserisci ancora {5 - dishes.length} piatti per
                        sbloccare l'analisi base!
                      </p>
                    </div>
                  </div>
                )}

                {dishes.length >= 5 && (
                  <div className="mt-6 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-green-800">
                        <strong>Ottimo!</strong> Hai inserito abbastanza piatti per un'analisi
                        significativa.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Step: Ingredients */}
        {currentStep === 'ingredients' && (
          <div className="py-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Aggiungi gli ingredienti</h2>
              <p className="mt-2 text-gray-600">
                Per ogni piatto, inserisci gli ingredienti principali con costo e quantità
              </p>
            </div>

            {/* Dish Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {dishes.map((dish) => {
                const dishIngredients = ingredients.filter((i) => i.dishId === dish.id);
                const isComplete = dishIngredients.length > 0;

                return (
                  <button
                    key={dish.id}
                    onClick={() => setSelectedDishForIngredients(dish.id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 transition-all ${
                      selectedDishForIngredients === dish.id
                        ? 'bg-orange-600 text-white'
                        : isComplete
                          ? 'border border-green-200 bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isComplete && <CheckCircle className="h-4 w-4" />}
                    {dish.name}
                  </button>
                );
              })}
            </div>

            {/* Selected Dish Info */}
            {selectedDishForIngredients && (
              <>
                {(() => {
                  const dish = dishes.find((d) => d.id === selectedDishForIngredients);
                  if (!dish) return null;

                  const dishIngredients = ingredients.filter((i) => i.dishId === dish.id);
                  const foodCost = calculateDishFoodCost(dish.id);
                  const foodCostPercent = calculateFoodCostPercent(dish.id);

                  return (
                    <>
                      {/* Current Status */}
                      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{dish.name}</h3>
                            <p className="text-sm text-gray-500">
                              Prezzo vendita: €{dish.sellingPrice.toFixed(2)}
                            </p>
                          </div>
                          {dishIngredients.length > 0 && (
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Food Cost stimato</p>
                              <p
                                className={`text-2xl font-bold ${
                                  foodCostPercent < 30
                                    ? 'text-green-600'
                                    : foodCostPercent < 40
                                      ? 'text-amber-600'
                                      : 'text-red-600'
                                }`}
                              >
                                {foodCostPercent.toFixed(1)}%
                              </p>
                              <p className="text-sm text-gray-500">€{foodCost.toFixed(2)}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Add Ingredient Form */}
                      <div className="mb-6 rounded-xl bg-gray-50 p-4">
                        <h4 className="mb-3 font-medium text-gray-900">Aggiungi ingrediente</h4>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={newIngredient.name}
                              onChange={(e) =>
                                setNewIngredient({ ...newIngredient, name: e.target.value })
                              }
                              placeholder="Nome ingrediente"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              step="0.10"
                              value={newIngredient.costPerKg}
                              onChange={(e) =>
                                setNewIngredient({ ...newIngredient, costPerKg: e.target.value })
                              }
                              placeholder="€/kg"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              value={newIngredient.quantityGrams}
                              onChange={(e) =>
                                setNewIngredient({
                                  ...newIngredient,
                                  quantityGrams: e.target.value,
                                })
                              }
                              placeholder="grammi"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                        </div>
                        <button
                          onClick={addIngredient}
                          disabled={!newIngredient.name || !newIngredient.costPerKg || isSaving}
                          className="mt-3 flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                          Aggiungi
                        </button>
                      </div>

                      {/* Ingredients List */}
                      {dishIngredients.length > 0 && (
                        <div className="space-y-2">
                          {dishIngredients.map((ing) => (
                            <div
                              key={ing.id}
                              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
                            >
                              <div className="flex items-center gap-3">
                                <span>🥕</span>
                                <div>
                                  <p className="font-medium text-gray-900">{ing.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {ing.quantityGrams}g × €{ing.costPerKg.toFixed(2)}/kg
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-gray-900">
                                  €{((ing.costPerKg * ing.quantityGrams) / 1000).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeIngredient(ing.id)}
                                  className="p-1 text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </>
            )}

            {/* Progress indicator */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Piatti con ingredienti</span>
                <span className="text-sm text-gray-500">
                  {
                    dishes.filter((d) => ingredients.filter((i) => i.dishId === d.id).length > 0)
                      .length
                  }
                  /{dishes.length}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{
                    width: `${(dishes.filter((d) => ingredients.filter((i) => i.dishId === d.id).length > 0).length / dishes.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step: Results */}
        {currentStep === 'results' && (
          <div className="py-8">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">I tuoi risultati!</h2>
              <p className="mt-2 text-gray-600">
                Ecco l'analisi dei tuoi piatti basata sui dati inseriti
              </p>
            </div>

            {/* Summary Cards */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{dishes.length}</p>
                <p className="text-sm text-gray-500">Piatti analizzati</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{ingredients.length}</p>
                <p className="text-sm text-gray-500">Ingredienti</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {dishes.filter((d) => calculateFoodCostPercent(d.id) < 30).length}
                </p>
                <p className="text-sm text-gray-500">Piatti Star</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {dishes.filter((d) => calculateFoodCostPercent(d.id) >= 40).length}
                </p>
                <p className="text-sm text-gray-500">Piatti Dog</p>
              </div>
            </div>

            {/* Dishes Analysis */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Analisi per piatto</h3>
              {dishes.map((dish) => {
                const foodCost = calculateDishFoodCost(dish.id);
                const foodCostPercent = calculateFoodCostPercent(dish.id);
                const bcg = getBCGClassification(foodCostPercent);
                const margin = dish.sellingPrice - foodCost;

                return (
                  <div key={dish.id} className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{bcg.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{dish.name}</p>
                            <span
                              className={`rounded px-2 py-0.5 text-xs font-medium ${bcg.color} bg-gray-100`}
                            >
                              {bcg.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            €{dish.sellingPrice.toFixed(2)} vendita • €{foodCost.toFixed(2)} costo
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-2xl font-bold ${
                            foodCostPercent < 30
                              ? 'text-green-600'
                              : foodCostPercent < 40
                                ? 'text-amber-600'
                                : 'text-red-600'
                          }`}
                        >
                          {foodCostPercent.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-500">Margine: €{margin.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${
                          foodCostPercent < 30
                            ? 'bg-green-500'
                            : foodCostPercent < 40
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(foodCostPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Insight */}
            <div className="mt-8 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900">Suggerimento AI</p>
                  <p className="mt-1 text-sm text-purple-800">
                    {dishes.filter((d) => calculateFoodCostPercent(d.id) >= 40).length > 0
                      ? `Hai ${dishes.filter((d) => calculateFoodCostPercent(d.id) >= 40).length} piatti "Dog" con food cost > 40%. Considera di aumentare il prezzo o ridurre le porzioni per migliorare i margini.`
                      : "Ottimo lavoro! I tuoi piatti hanno un food cost nella norma. Continua a monitorare e inserisci altri piatti per un'analisi più completa."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            {currentStepIndex > 0 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Indietro
              </button>
            ) : (
              <div />
            )}

            {currentStep === 'results' ? (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
              >
                <CheckCircle className="h-5 w-5" />
                Completa Setup
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continua
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
