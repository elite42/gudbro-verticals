'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// CSV Utilities
function escapeCSV(value: string | null): string {
  if (!value) return '';
  // Escape quotes by doubling them and wrap in quotes if contains comma, newline, or quote
  if (value.includes(',') || value.includes('\n') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentField.trim());
        if (currentRow.some((f) => f !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
        if (char === '\r') i++; // Skip \n after \r
      } else {
        currentField += char;
      }
    }
  }

  // Don't forget last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
}

interface CSVImportResult {
  success: number;
  errors: string[];
}

// Types
interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
}

interface MenuItemTranslation {
  id: string;
  menu_item_id: string;
  language_code: string;
  name: string;
  description: string | null;
}

interface CategoryTranslation {
  id: string;
  category_id: string;
  language_code: string;
  name: string;
  description: string | null;
}

interface Language {
  code: string;
  name: string;
  native_name: string;
  direction: 'ltr' | 'rtl';
}

interface TranslationRow {
  id: string;
  type: 'menu_item' | 'category';
  itemId: string;
  name: string;
  description: string | null;
  slug: string;
  translations: Record<
    string,
    { name: string; description: string | null; translationId?: string }
  >;
}

// Flag mapping for common languages
const FLAG_MAP: Record<string, string> = {
  en: '🇬🇧',
  vi: '🇻🇳',
  it: '🇮🇹',
  ko: '🇰🇷',
  ja: '🇯🇵',
  zh: '🇨🇳',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  pt: '🇵🇹',
  ru: '🇷🇺',
  ar: '🇸🇦',
  he: '🇮🇱',
  th: '🇹🇭',
  fa: '🇮🇷',
};

export default function TranslationsPage() {
  const [rows, setRows] = useState<TranslationRow[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['vi', 'it']);
  const [filterType, setFilterType] = useState<'all' | 'menu_item' | 'category'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    lang: string;
    field: 'name' | 'description';
  } | null>(null);
  const [editValue, setEditValue] = useState('');

  // Import/Export state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<CSVImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all data
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      // Fetch languages from database
      const { data: langData } = await supabase
        .from('languages')
        .select('code, name, native_name, direction')
        .order('name');

      // Fetch menu items
      const { data: menuItems } = await supabase
        .from('menu_items')
        .select('id, name, description, slug, category_id')
        .order('display_order');

      // Fetch categories
      const { data: categories } = await supabase
        .from('menu_categories')
        .select('id, name, description, slug')
        .order('display_order');

      // Fetch menu item translations
      const { data: menuTranslations } = await supabase.from('menu_item_translations').select('*');

      // Fetch category translations
      const { data: catTranslations } = await supabase.from('category_translations').select('*');

      // Set languages (filter to common ones if too many)
      const commonLanguages =
        langData?.filter((l) =>
          ['en', 'vi', 'it', 'ko', 'ja', 'zh', 'fr', 'de', 'es', 'ar', 'he', 'th'].includes(l.code)
        ) || [];
      setLanguages(commonLanguages);

      // Build translation rows
      const translationRows: TranslationRow[] = [];

      // Process menu items
      (menuItems || []).forEach((item) => {
        const itemTranslations: Record<
          string,
          { name: string; description: string | null; translationId?: string }
        > = {};

        (menuTranslations || [])
          .filter((t) => t.menu_item_id === item.id)
          .forEach((t) => {
            itemTranslations[t.language_code] = {
              name: t.name,
              description: t.description,
              translationId: t.id,
            };
          });

        translationRows.push({
          id: `menu-${item.id}`,
          type: 'menu_item',
          itemId: item.id,
          name: item.name,
          description: item.description,
          slug: item.slug,
          translations: itemTranslations,
        });
      });

      // Process categories
      (categories || []).forEach((cat) => {
        const catTranslationsMap: Record<
          string,
          { name: string; description: string | null; translationId?: string }
        > = {};

        (catTranslations || [])
          .filter((t) => t.category_id === cat.id)
          .forEach((t) => {
            catTranslationsMap[t.language_code] = {
              name: t.name,
              description: t.description,
              translationId: t.id,
            };
          });

        translationRows.push({
          id: `cat-${cat.id}`,
          type: 'category',
          itemId: cat.id,
          name: cat.name,
          description: cat.description,
          slug: cat.slug,
          translations: catTranslationsMap,
        });
      });

      setRows(translationRows);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Save translation
  async function saveTranslation(
    row: TranslationRow,
    langCode: string,
    name: string,
    description: string | null
  ) {
    setSaving(true);
    try {
      const existing = row.translations[langCode];
      const table = row.type === 'menu_item' ? 'menu_item_translations' : 'category_translations';
      const foreignKey = row.type === 'menu_item' ? 'menu_item_id' : 'category_id';

      if (existing?.translationId) {
        // Update existing translation
        await supabase.from(table).update({ name, description }).eq('id', existing.translationId);
      } else {
        // Insert new translation
        await supabase.from(table).insert({
          [foreignKey]: row.itemId,
          language_code: langCode,
          name,
          description,
        });
      }

      // Refresh data
      await fetchData();
    } catch (err) {
      console.error('Error saving translation:', err);
    } finally {
      setSaving(false);
    }
  }

  // Handle edit start
  const handleStartEdit = (
    rowId: string,
    lang: string,
    field: 'name' | 'description',
    currentValue: string
  ) => {
    setEditingCell({ rowId, lang, field });
    setEditValue(currentValue || '');
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!editingCell) return;

    const row = rows.find((r) => r.id === editingCell.rowId);
    if (!row) return;

    const currentTranslation = row.translations[editingCell.lang] || {
      name: '',
      description: null,
    };
    const newName = editingCell.field === 'name' ? editValue : currentTranslation.name;
    const newDesc =
      editingCell.field === 'description' ? editValue : currentTranslation.description;

    await saveTranslation(row, editingCell.lang, newName, newDesc);
    setEditingCell(null);
    setEditValue('');
  };

  // Export to CSV
  const handleExportCSV = () => {
    // CSV Header: type,item_id,slug,original_name,original_description,lang_code,translated_name,translated_description
    const csvRows: string[] = [
      'type,item_id,slug,original_name,original_description,language_code,translated_name,translated_description',
    ];

    // Export all rows with all selected languages
    rows.forEach((row) => {
      selectedLanguages.forEach((langCode) => {
        const translation = row.translations[langCode] || { name: '', description: null };
        csvRows.push(
          [
            row.type,
            row.itemId,
            escapeCSV(row.slug),
            escapeCSV(row.name),
            escapeCSV(row.description),
            langCode,
            escapeCSV(translation.name),
            escapeCSV(translation.description),
          ].join(',')
        );
      });
    });

    // Create and download file
    const csvContent = csvRows.join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' }); // BOM for Excel UTF-8
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `translations_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import from CSV
  const handleImportCSV = async (file: File) => {
    setImporting(true);
    setImportResult(null);

    try {
      const text = await file.text();
      const csvRows = parseCSV(text);

      if (csvRows.length < 2) {
        setImportResult({ success: 0, errors: ['CSV file is empty or has no data rows'] });
        return;
      }

      // Validate header
      const header = csvRows[0].map((h) => h.toLowerCase().replace(/\s+/g, '_'));
      const requiredColumns = ['type', 'item_id', 'language_code', 'translated_name'];
      const missingColumns = requiredColumns.filter((col) => !header.includes(col));

      if (missingColumns.length > 0) {
        setImportResult({
          success: 0,
          errors: [`Missing required columns: ${missingColumns.join(', ')}`],
        });
        return;
      }

      // Get column indices
      const typeIdx = header.indexOf('type');
      const itemIdIdx = header.indexOf('item_id');
      const langIdx = header.indexOf('language_code');
      const nameIdx = header.indexOf('translated_name');
      const descIdx = header.indexOf('translated_description');

      const errors: string[] = [];
      let successCount = 0;

      // Process each row (skip header)
      for (let i = 1; i < csvRows.length; i++) {
        const row = csvRows[i];
        const rowNum = i + 1;

        try {
          const type = row[typeIdx]?.toLowerCase();
          const itemId = row[itemIdIdx];
          const langCode = row[langIdx];
          const name = row[nameIdx] || '';
          const description = descIdx >= 0 ? row[descIdx] || null : null;

          // Skip empty rows
          if (!type || !itemId || !langCode) {
            continue;
          }

          // Validate type
          if (type !== 'menu_item' && type !== 'category') {
            errors.push(`Row ${rowNum}: Invalid type "${type}" (must be menu_item or category)`);
            continue;
          }

          // Skip if no translation provided
          if (!name) {
            continue;
          }

          const table = type === 'menu_item' ? 'menu_item_translations' : 'category_translations';
          const foreignKey = type === 'menu_item' ? 'menu_item_id' : 'category_id';

          // Check if translation exists
          const { data: existing } = await supabase
            .from(table)
            .select('id')
            .eq(foreignKey, itemId)
            .eq('language_code', langCode)
            .single();

          if (existing) {
            // Update existing
            const { error } = await supabase
              .from(table)
              .update({ name, description })
              .eq('id', existing.id);

            if (error) {
              errors.push(`Row ${rowNum}: ${error.message}`);
            } else {
              successCount++;
            }
          } else {
            // Insert new
            const { error } = await supabase.from(table).insert({
              [foreignKey]: itemId,
              language_code: langCode,
              name,
              description,
            });

            if (error) {
              errors.push(`Row ${rowNum}: ${error.message}`);
            } else {
              successCount++;
            }
          }
        } catch (err) {
          errors.push(`Row ${rowNum}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }

      setImportResult({ success: successCount, errors });

      // Refresh data if any success
      if (successCount > 0) {
        await fetchData();
      }
    } catch (err) {
      setImportResult({
        success: 0,
        errors: [`Failed to parse CSV: ${err instanceof Error ? err.message : 'Unknown error'}`],
      });
    } finally {
      setImporting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImportCSV(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  // Filter rows
  const filteredRows = rows.filter((row) => {
    if (filterType !== 'all' && row.type !== filterType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return row.name.toLowerCase().includes(query) || row.slug.toLowerCase().includes(query);
    }
    return true;
  });

  // Calculate stats
  const stats = {
    total: rows.length,
    menuItems: rows.filter((r) => r.type === 'menu_item').length,
    categories: rows.filter((r) => r.type === 'category').length,
    translated: rows.reduce((acc, row) => {
      return acc + selectedLanguages.filter((lang) => row.translations[lang]?.name).length;
    }, 0),
    pending: rows.reduce((acc, row) => {
      return acc + selectedLanguages.filter((lang) => !row.translations[lang]?.name).length;
    }, 0),
  };

  const getFlag = (code: string) => FLAG_MAP[code] || '🏳️';

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading translations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Translations</h1>
            <InfoTooltip contentKey="pages.translations" kbPageId="translations" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Manage menu translations using the new translation tables
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            onClick={handleExportCSV}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Export CSV
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Import CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-600">Menu Items</p>
          <p className="text-2xl font-bold text-blue-700">{stats.menuItems}</p>
        </div>
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <p className="text-sm text-purple-600">Categories</p>
          <p className="text-2xl font-bold text-purple-700">{stats.categories}</p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-600">Translated</p>
          <p className="text-2xl font-bold text-green-700">{stats.translated}</p>
        </div>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Target Languages</h3>
            <p className="text-sm text-gray-500">Select languages to translate into</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
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
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                selectedLanguages.includes(lang.code)
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{getFlag(lang.code)}</span>
              <span>{lang.native_name || lang.name}</span>
              {lang.direction === 'rtl' && (
                <span className="rounded bg-gray-100 px-1 text-xs">RTL</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as typeof filterType)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="menu_item">Menu Items</option>
          <option value="category">Categories</option>
        </select>
      </div>

      {/* Translation Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-16 px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="min-w-[200px] px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Original (EN)
                </th>
                {selectedLanguages.map((langCode) => {
                  const lang = languages.find((l) => l.code === langCode);
                  return (
                    <th
                      key={langCode}
                      className="min-w-[250px] px-4 py-3 text-left text-sm font-medium text-gray-500"
                    >
                      <span className="flex items-center gap-2">
                        {getFlag(langCode)}
                        {lang?.native_name || lang?.name || langCode.toUpperCase()}
                        {lang?.direction === 'rtl' && <span className="text-xs">RTL</span>}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {/* Type Badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${
                        row.type === 'menu_item'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {row.type === 'menu_item' ? 'Menu' : 'Cat'}
                    </span>
                  </td>

                  {/* Original (English) */}
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{row.name}</p>
                    {row.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">{row.description}</p>
                    )}
                    <p className="mt-1 font-mono text-xs text-gray-400">{row.slug}</p>
                  </td>

                  {/* Translation Columns */}
                  {selectedLanguages.map((langCode) => {
                    const translation = row.translations[langCode];
                    const isEditingName =
                      editingCell?.rowId === row.id &&
                      editingCell?.lang === langCode &&
                      editingCell?.field === 'name';
                    const isEditingDesc =
                      editingCell?.rowId === row.id &&
                      editingCell?.lang === langCode &&
                      editingCell?.field === 'description';

                    return (
                      <td key={langCode} className="px-4 py-3">
                        {/* Name */}
                        <div className="mb-2">
                          {isEditingName ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="flex-1 rounded border border-blue-300 px-2 py-1 text-sm"
                                autoFocus
                                disabled={saving}
                              />
                              <button
                                onClick={handleSaveEdit}
                                disabled={saving}
                                className="rounded bg-blue-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                              >
                                {saving ? '...' : 'Save'}
                              </button>
                              <button
                                onClick={() => setEditingCell(null)}
                                className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700"
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                handleStartEdit(row.id, langCode, 'name', translation?.name || '')
                              }
                              className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-gray-100"
                            >
                              <span
                                className={`text-sm ${translation?.name ? 'text-gray-900' : 'italic text-gray-400'}`}
                              >
                                {translation?.name || 'Click to add name...'}
                              </span>
                              <span
                                className={`rounded px-1.5 py-0.5 text-xs ${
                                  translation?.name
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                              >
                                {translation?.name ? '✓' : '!'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description (only show if original has description) */}
                        {row.description && (
                          <div>
                            {isEditingDesc ? (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="flex-1 rounded border border-blue-300 px-2 py-1 text-xs"
                                  autoFocus
                                  disabled={saving}
                                />
                                <button
                                  onClick={handleSaveEdit}
                                  disabled={saving}
                                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                                >
                                  {saving ? '...' : 'Save'}
                                </button>
                                <button
                                  onClick={() => setEditingCell(null)}
                                  className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700"
                                >
                                  X
                                </button>
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  handleStartEdit(
                                    row.id,
                                    langCode,
                                    'description',
                                    translation?.description || ''
                                  )
                                }
                                className="cursor-pointer rounded p-1 hover:bg-gray-100"
                              >
                                <span
                                  className={`text-xs ${translation?.description ? 'text-gray-600' : 'italic text-gray-400'}`}
                                >
                                  {translation?.description || 'Add description...'}
                                </span>
                              </div>
                            )}
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

        {filteredRows.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No items found</p>
          </div>
        )}
      </div>

      {/* Database Info */}
      <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🗄️</span>
          <div>
            <h3 className="font-medium text-gray-900">Using New Translation Tables</h3>
            <p className="text-sm text-gray-600">
              Translations are stored in{' '}
              <code className="rounded bg-white px-1">menu_item_translations</code> and{' '}
              <code className="rounded bg-white px-1">category_translations</code> tables with
              proper language codes.
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-medium text-blue-900">Tips</h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-800">
          <li>Click on any cell to edit translations</li>
          <li>Translations are saved to the new translation tables</li>
          <li>RTL languages (Arabic, Hebrew) are marked for proper text display</li>
          <li>Use CSV import/export for bulk translations</li>
        </ul>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".csv"
        className="hidden"
      />

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-lg rounded-xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Import Translations</h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportResult(null);
                }}
                className="rounded p-1 hover:bg-gray-100"
              >
                <span className="text-xl text-gray-500">×</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 p-4">
              {!importResult ? (
                <>
                  {/* Instructions */}
                  <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                    <h3 className="font-medium text-gray-900">CSV Format Requirements</h3>
                    <p className="text-sm text-gray-600">
                      Your CSV must include these columns (header row required):
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                      <li>
                        <code className="rounded bg-gray-200 px-1">type</code> -
                        &quot;menu_item&quot; or &quot;category&quot;
                      </li>
                      <li>
                        <code className="rounded bg-gray-200 px-1">item_id</code> - UUID of the item
                      </li>
                      <li>
                        <code className="rounded bg-gray-200 px-1">language_code</code> - e.g.,
                        &quot;vi&quot;, &quot;it&quot;, &quot;ar&quot;
                      </li>
                      <li>
                        <code className="rounded bg-gray-200 px-1">translated_name</code> -
                        Translation of name
                      </li>
                      <li>
                        <code className="rounded bg-gray-200 px-1">translated_description</code> -
                        (optional) Translation of description
                      </li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">
                      Tip: Export existing translations first to get the correct format.
                    </p>
                  </div>

                  {/* Upload Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                      importing
                        ? 'cursor-wait border-gray-200 bg-gray-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {importing ? (
                      <>
                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Processing translations...</p>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl">📄</span>
                        <p className="mt-2 font-medium text-gray-700">Click to select CSV file</p>
                        <p className="text-sm text-gray-500">or drag and drop</p>
                      </>
                    )}
                  </div>
                </>
              ) : (
                /* Import Results */
                <div className="space-y-4">
                  {/* Summary */}
                  <div
                    className={`rounded-lg p-4 ${
                      importResult.success > 0 && importResult.errors.length === 0
                        ? 'border border-green-200 bg-green-50'
                        : importResult.success > 0
                          ? 'border border-yellow-200 bg-yellow-50'
                          : 'border border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {importResult.success > 0 && importResult.errors.length === 0
                          ? '✅'
                          : importResult.success > 0
                            ? '⚠️'
                            : '❌'}
                      </span>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {importResult.success > 0 && importResult.errors.length === 0
                            ? 'Import Successful!'
                            : importResult.success > 0
                              ? 'Import Completed with Warnings'
                              : 'Import Failed'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {importResult.success} translation{importResult.success !== 1 ? 's' : ''}{' '}
                          imported
                          {importResult.errors.length > 0 &&
                            `, ${importResult.errors.length} error${importResult.errors.length !== 1 ? 's' : ''}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Errors */}
                  {importResult.errors.length > 0 && (
                    <div className="max-h-48 overflow-y-auto rounded-lg bg-red-50 p-4">
                      <h4 className="mb-2 font-medium text-red-900">Errors:</h4>
                      <ul className="space-y-1 text-sm text-red-700">
                        {importResult.errors.slice(0, 10).map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                        {importResult.errors.length > 10 && (
                          <li className="font-medium">
                            ...and {importResult.errors.length - 10} more errors
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-4">
              {importResult ? (
                <>
                  <button
                    onClick={() => setImportResult(null)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Import Another
                  </button>
                  <button
                    onClick={() => {
                      setShowImportModal(false);
                      setImportResult(null);
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Done
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowImportModal(false)}
                  disabled={importing}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
