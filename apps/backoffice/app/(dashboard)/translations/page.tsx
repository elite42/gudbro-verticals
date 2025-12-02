'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface TranslationItem {
  id: string;
  type: 'menu_item' | 'category' | 'ingredient';
  field: 'name' | 'description';
  originalText: string;
  translations: Record<string, string>;
  slug: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
];

export default function TranslationsPage() {
  const [items, setItems] = useState<TranslationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en', 'vi', 'ko']);
  const [filterType, setFilterType] = useState<string>('all');
  const [isTranslating, setIsTranslating] = useState(false);
  const [editingCell, setEditingCell] = useState<{ id: string; lang: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchTranslations();
  }, []);

  async function fetchTranslations() {
    try {
      setLoading(true);

      // Fetch menu items
      const { data: menuItems } = await supabase
        .from('menu_items')
        .select('id, slug, name_multilang, description_multilang')
        .order('display_order');

      // Fetch categories
      const { data: categories } = await supabase
        .from('menu_categories')
        .select('id, slug, name_multilang, description_multilang')
        .order('display_order');

      const translationItems: TranslationItem[] = [];

      // Process menu items
      (menuItems || []).forEach((item) => {
        // Name translations
        translationItems.push({
          id: `menu-name-${item.id}`,
          type: 'menu_item',
          field: 'name',
          originalText: item.name_multilang?.en || '',
          translations: item.name_multilang || {},
          slug: item.slug,
        });

        // Description translations (if exists)
        if (item.description_multilang?.en) {
          translationItems.push({
            id: `menu-desc-${item.id}`,
            type: 'menu_item',
            field: 'description',
            originalText: item.description_multilang?.en || '',
            translations: item.description_multilang || {},
            slug: item.slug,
          });
        }
      });

      // Process categories
      (categories || []).forEach((cat) => {
        translationItems.push({
          id: `cat-name-${cat.id}`,
          type: 'category',
          field: 'name',
          originalText: cat.name_multilang?.en || '',
          translations: cat.name_multilang || {},
          slug: cat.slug,
        });
      });

      setItems(translationItems);
    } catch (err) {
      console.error('Error fetching translations:', err);
    } finally {
      setLoading(false);
    }
  }

  const getTranslationStatus = (item: TranslationItem, langCode: string): 'complete' | 'pending' => {
    return item.translations[langCode] ? 'complete' : 'pending';
  };

  const filteredItems = items.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    return true;
  });

  const stats = {
    total: items.length,
    complete: items.reduce((acc, item) => {
      return acc + selectedLanguages.filter(lang => lang !== 'en' && item.translations[lang]).length;
    }, 0),
    pending: items.reduce((acc, item) => {
      return acc + selectedLanguages.filter(lang => lang !== 'en' && !item.translations[lang]).length;
    }, 0),
  };

  const handleStartEdit = (id: string, lang: string, currentValue: string) => {
    setEditingCell({ id, lang });
    setEditValue(currentValue);
  };

  const handleSaveEdit = async () => {
    if (!editingCell) return;

    const item = items.find(i => i.id === editingCell.id);
    if (!item) return;

    // Update local state
    const updatedItems = items.map(i => {
      if (i.id === editingCell.id) {
        return {
          ...i,
          translations: { ...i.translations, [editingCell.lang]: editValue },
        };
      }
      return i;
    });
    setItems(updatedItems);

    // Update in Supabase
    try {
      const [type, field, dbId] = item.id.split('-');
      const table = type === 'menu' ? 'menu_items' : 'menu_categories';
      const column = field === 'name' ? 'name_multilang' : 'description_multilang';

      const newTranslations = { ...item.translations, [editingCell.lang]: editValue };

      await supabase
        .from(table)
        .update({ [column]: newTranslations })
        .eq('id', dbId);
    } catch (err) {
      console.error('Error saving translation:', err);
    }

    setEditingCell(null);
    setEditValue('');
  };

  const handleTranslateAll = async () => {
    setIsTranslating(true);
    // In production, this would call an AI translation API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsTranslating(false);
    alert('AI Translation would be triggered here. Connect your preferred AI provider (Claude, OpenAI, etc.)');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Translations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage multi-language content with AI-powered translations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTranslations}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            onClick={handleTranslateAll}
            disabled={isTranslating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isTranslating ? (
              <>
                <span className="animate-spin">...</span>
                Translating...
              </>
            ) : (
              <>Translate All Pending</>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Texts</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-600">Translated</p>
          <p className="text-2xl font-bold text-green-700">{stats.complete}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600">Languages</p>
          <p className="text-2xl font-bold text-blue-700">{selectedLanguages.length}</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Target Languages</h3>
            <p className="text-sm text-gray-500">Select languages to display</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                if (selectedLanguages.includes(lang.code)) {
                  if (lang.code !== 'en') {
                    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang.code));
                  }
                } else {
                  setSelectedLanguages([...selectedLanguages, lang.code]);
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                selectedLanguages.includes(lang.code)
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All Types</option>
          <option value="menu_item">Menu Items</option>
          <option value="category">Categories</option>
          <option value="ingredient">Ingredients</option>
        </select>
      </div>

      {/* Translation Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 w-16">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Original (EN)</th>
                {selectedLanguages.filter(l => l !== 'en').map((langCode) => {
                  const lang = languages.find((l) => l.code === langCode);
                  return (
                    <th key={langCode} className="text-left px-4 py-3 text-sm font-medium text-gray-500 min-w-[200px]">
                      {lang?.flag} {lang?.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded ${
                      item.type === 'menu_item' ? 'bg-blue-100 text-blue-700' :
                      item.type === 'category' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.type === 'menu_item' ? 'Menu' : item.type === 'category' ? 'Cat' : 'Ing'}
                    </span>
                    <span className="block text-xs text-gray-400 mt-1">{item.field}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">{item.originalText}</p>
                    <p className="text-xs text-gray-400 font-mono mt-1">{item.slug}</p>
                  </td>
                  {selectedLanguages.filter(l => l !== 'en').map((langCode) => {
                    const translation = item.translations[langCode];
                    const isEditing = editingCell?.id === item.id && editingCell?.lang === langCode;

                    return (
                      <td key={langCode} className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 px-2 py-1 border border-blue-300 rounded text-sm"
                              autoFocus
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCell(null)}
                              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleStartEdit(item.id, langCode, translation || '')}
                            className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                          >
                            <p className={`text-sm ${translation ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                              {translation || 'Click to add...'}
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${
                                translation
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {translation ? 'complete' : 'pending'}
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No items to translate</p>
          </div>
        )}
      </div>

      {/* AI Provider Info */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">AI</span>
            <div>
              <h3 className="font-medium text-gray-900">AI Translation Ready</h3>
              <p className="text-sm text-gray-600">
                Connect Claude or OpenAI to auto-translate all pending items
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Estimated cost</p>
            <p className="font-bold text-green-600">~$0.01 / 1000 words</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
        <h3 className="font-medium text-blue-900">Tips</h3>
        <ul className="mt-2 text-sm text-blue-800 space-y-1">
          <li>Click on any cell to edit translations manually</li>
          <li>Use &quot;Translate All Pending&quot; to batch translate with AI</li>
          <li>Translations are saved to Supabase automatically</li>
        </ul>
      </div>
    </div>
  );
}
