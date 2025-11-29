'use client';

import { useState } from 'react';

interface TranslationItem {
  id: string;
  type: 'menu_item' | 'service' | 'attraction' | 'general';
  originalText: string;
  originalLang: string;
  translations: Record<string, { text: string; status: 'complete' | 'pending' | 'review'; aiGenerated: boolean }>;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
];

const translationItems: TranslationItem[] = [
  {
    id: '1',
    type: 'menu_item',
    originalText: 'Vietnamese Egg Coffee',
    originalLang: 'en',
    translations: {
      vi: { text: 'Cà Phê Trứng', status: 'complete', aiGenerated: true },
      ko: { text: '베트남 에그 커피', status: 'complete', aiGenerated: true },
      zh: { text: '', status: 'pending', aiGenerated: false },
      ja: { text: '', status: 'pending', aiGenerated: false },
    },
  },
  {
    id: '2',
    type: 'menu_item',
    originalText: 'Traditional Hanoi-style egg coffee with rich, creamy foam',
    originalLang: 'en',
    translations: {
      vi: { text: 'Cà phê trứng truyền thống Hà Nội với bọt kem béo ngậy', status: 'complete', aiGenerated: true },
      ko: { text: '풍부하고 크리미한 거품의 전통 하노이식 에그 커피', status: 'review', aiGenerated: true },
      zh: { text: '', status: 'pending', aiGenerated: false },
    },
  },
  {
    id: '3',
    type: 'service',
    originalText: 'Room Service Available 24/7',
    originalLang: 'en',
    translations: {
      vi: { text: 'Dịch vụ phòng 24/7', status: 'complete', aiGenerated: false },
      ko: { text: '', status: 'pending', aiGenerated: false },
    },
  },
];

export default function TranslationsPage() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en', 'vi', 'ko']);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isTranslating, setIsTranslating] = useState(false);

  const pendingCount = translationItems.reduce((acc, item) => {
    return acc + Object.values(item.translations).filter((t) => t.status === 'pending').length;
  }, 0);

  const reviewCount = translationItems.reduce((acc, item) => {
    return acc + Object.values(item.translations).filter((t) => t.status === 'review').length;
  }, 0);

  const handleTranslateAll = async () => {
    setIsTranslating(true);
    // Simulate translation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsTranslating(false);
  };

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
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export Translations
          </button>
          <button
            onClick={handleTranslateAll}
            disabled={isTranslating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isTranslating ? (
              <>
                <span className="animate-spin">⏳</span>
                Translating...
              </>
            ) : (
              <>
                🤖 Translate All Pending
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Texts</p>
          <p className="text-2xl font-bold text-gray-900">{translationItems.length}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-600">Completed</p>
          <p className="text-2xl font-bold text-green-700">
            {translationItems.reduce(
              (acc, item) =>
                acc + Object.values(item.translations).filter((t) => t.status === 'complete').length,
              0
            )}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600">Needs Review</p>
          <p className="text-2xl font-bold text-purple-700">{reviewCount}</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Target Languages</h3>
            <p className="text-sm text-gray-500">Select languages to translate your content into</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">+ Add Language</button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                if (selectedLanguages.includes(lang.code)) {
                  setSelectedLanguages(selectedLanguages.filter((l) => l !== lang.code));
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

      {/* AI Provider Info */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="font-medium text-gray-900">AI Translation Provider</h3>
              <p className="text-sm text-gray-600">Currently using: <strong>GPT-4o-mini</strong> (OpenAI)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Est. cost per 1000 words</p>
            <p className="font-bold text-green-600">~$0.006</p>
          </div>
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
          <option value="service">Services</option>
          <option value="attraction">Attractions</option>
          <option value="general">General</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All Status</option>
          <option value="complete">Completed</option>
          <option value="pending">Pending</option>
          <option value="review">Needs Review</option>
        </select>
      </div>

      {/* Translation Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Original Text</th>
                {selectedLanguages.slice(1).map((langCode) => {
                  const lang = languages.find((l) => l.code === langCode);
                  return (
                    <th key={langCode} className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                      {lang?.flag} {lang?.name}
                    </th>
                  );
                })}
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {translationItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-900">{item.originalText}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  {selectedLanguages.slice(1).map((langCode) => {
                    const translation = item.translations[langCode];
                    return (
                      <td key={langCode} className="px-4 py-3">
                        {translation ? (
                          <div>
                            <p className={`text-sm ${translation.text ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                              {translation.text || 'Not translated'}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`px-2 py-0.5 text-xs rounded ${
                                  translation.status === 'complete'
                                    ? 'bg-green-100 text-green-700'
                                    : translation.status === 'review'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                              >
                                {translation.status}
                              </span>
                              {translation.aiGenerated && (
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                                  🤖 AI
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Not configured</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        ✏️
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded">
                        🤖
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Translation Tips */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
        <h3 className="font-medium text-blue-900">💡 Translation Tips</h3>
        <ul className="mt-2 text-sm text-blue-800 space-y-1">
          <li>• AI translations are marked with 🤖 and should be reviewed for accuracy</li>
          <li>• Context-aware translations work best for menu items and descriptions</li>
          <li>• You can batch translate all pending items using the button above</li>
          <li>• Costs are estimated based on text length and target languages</li>
        </ul>
      </div>
    </div>
  );
}
