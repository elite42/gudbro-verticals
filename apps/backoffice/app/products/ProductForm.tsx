'use client';

import { createLocalProduct, updateProduct, getIngredients, computeSafetyFlags } from '../actions';
import { useTransition, useState, useEffect } from 'react';

interface ProductFormProps {
  initialData?: {
    id: string;
    name: any; // MultiLangText
    description: any; // MultiLangText
    price: number;
    category: string;
    image?: string;
    ingredients?: any[];
  };
  onCancel?: () => void;
  onSuccess?: () => void;
}

type Language = 'en' | 'it' | 'vi';

interface IngredientOption {
  id: string;
  name: { en: string; it?: string; vi?: string };
}

export function ProductForm({ initialData, onCancel, onSuccess }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  // Multi-language state
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [nameTranslations, setNameTranslations] = useState({
    en: initialData?.name?.en || '',
    it: initialData?.name?.it || '',
    vi: initialData?.name?.vi || '',
  });
  const [descTranslations, setDescTranslations] = useState({
    en: initialData?.description?.en || '',
    it: initialData?.description?.it || '',
    vi: initialData?.description?.vi || '',
  });

  // Image state
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  // Ingredients state
  const [availableIngredients, setAvailableIngredients] = useState<IngredientOption[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [computedFlags, setComputedFlags] = useState<any>(null);

  // Load ingredients on mount
  useEffect(() => {
    getIngredients().then(setAvailableIngredients);
  }, []);

  // Compute safety flags when ingredients change
  useEffect(() => {
    if (selectedIngredients.length > 0) {
      computeSafetyFlags(selectedIngredients).then(setComputedFlags);
    } else {
      setComputedFlags(null);
    }
  }, [selectedIngredients]);

  const handleImageChange = (url: string) => {
    setImageUrl(url);
    // Simple validation - check if it's a valid URL
    try {
      new URL(url);
      setImagePreview(url);
    } catch {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Add computed values as hidden fields
    formData.set('nameJson', JSON.stringify(nameTranslations));
    formData.set('descriptionJson', JSON.stringify(descTranslations));
    formData.set('image', imageUrl);
    formData.set('ingredientIds', selectedIngredients.join(','));

    if (computedFlags) {
      formData.set('computed', JSON.stringify(computedFlags));
    }

    startTransition(async () => {
      if (isEditing) {
        await updateProduct(initialData.id, formData);
      } else {
        await createLocalProduct(formData);
      }
      if (onSuccess) onSuccess();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl space-y-6 rounded-lg border bg-white p-6 shadow-sm"
    >
      <h3 className="text-2xl font-bold text-gray-900">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h3>

      {/* Language Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentLang('en')}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              currentLang === 'en'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            type="button"
            onClick={() => setCurrentLang('it')}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              currentLang === 'it'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🇮🇹 Italiano
          </button>
          <button
            type="button"
            onClick={() => setCurrentLang('vi')}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              currentLang === 'vi'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🇻🇳 Tiếng Việt
          </button>
        </div>
      </div>

      {/* Name Field */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Product Name ({currentLang.toUpperCase()}){' '}
          {currentLang === 'en' && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={nameTranslations[currentLang]}
          onChange={(e) =>
            setNameTranslations({ ...nameTranslations, [currentLang]: e.target.value })
          }
          required={currentLang === 'en'}
          className="block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder={`Enter product name in ${currentLang === 'en' ? 'English' : currentLang === 'it' ? 'Italian' : 'Vietnamese'}`}
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description ({currentLang.toUpperCase()})
        </label>
        <textarea
          value={descTranslations[currentLang]}
          onChange={(e) =>
            setDescTranslations({ ...descTranslations, [currentLang]: e.target.value })
          }
          rows={3}
          className="block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder={`Enter description in ${currentLang === 'en' ? 'English' : currentLang === 'it' ? 'Italian' : 'Vietnamese'}`}
        />
      </div>

      {/* Price and Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            defaultValue={initialData?.price}
            required
            className="block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            defaultValue={initialData?.category}
            required
            className="block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="coffee">Coffee</option>
            <option value="tea">Tea</option>
            <option value="smoothie">Smoothie</option>
            <option value="beverage">Beverage</option>
            <option value="food">Food</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Product Image</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => handleImageChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://images.unsplash.com/..."
        />
        {imagePreview && (
          <div className="relative mt-3 inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-48 w-48 rounded-lg object-cover shadow-md"
              onError={() => setImagePreview('')}
            />
            <button
              type="button"
              onClick={() => {
                setImageUrl('');
                setImagePreview('');
              }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Ingredients</label>
        <select
          multiple
          value={selectedIngredients}
          onChange={(e) =>
            setSelectedIngredients(Array.from(e.target.selectedOptions).map((opt) => opt.value))
          }
          className="block h-32 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {availableIngredients.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.name.en}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple ingredients</p>
      </div>

      {/* Auto-Computed Preview */}
      {computedFlags && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-blue-900">
            <span>📊</span> Auto-Computed Safety Flags
          </h4>
          <div className="space-y-2 text-sm">
            {computedFlags.allergens.present.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-red-700">⚠️ Allergens:</span>
                <span className="text-gray-700">
                  {computedFlags.allergens.present.length} detected
                </span>
              </div>
            )}
            {computedFlags.intolerances.present.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-yellow-700">🚫 Intolerances:</span>
                <span className="text-gray-700">
                  {computedFlags.intolerances.present.length} detected
                </span>
              </div>
            )}
            {computedFlags.diets.compatible.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-green-700">✅ Diets:</span>
                <span className="text-gray-700">{computedFlags.diets.compatible.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
