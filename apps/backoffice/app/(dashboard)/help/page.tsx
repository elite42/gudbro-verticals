'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Lightbulb,
  List,
  MessageSquare,
} from 'lucide-react';
import { KB_SECTIONS, getPage, searchKB, type KBSection, type KBPage } from '@/lib/kb/kb-content';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>('dashboard');
  const [selectedPage, setSelectedPage] = useState<string | null>('dashboard');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dashboard: true,
  });

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchKB(searchQuery);
  }, [searchQuery]);

  // Current page content
  const currentPage = selectedPage ? getPage(selectedPage) : null;

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const selectPage = (page: KBPage, sectionId: string) => {
    setSelectedSection(sectionId);
    setSelectedPage(page.id);
    setSearchQuery('');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-0">
      {/* Sidebar Navigation */}
      <div className="w-72 shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <h1 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Knowledge Base
          </h1>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Search Results */}
          {searchResults && searchResults.length > 0 && (
            <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-2">
              <p className="mb-2 text-xs font-medium text-blue-700">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
              {searchResults.slice(0, 5).map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    const section = KB_SECTIONS.find((s) => s.pages.some((p) => p.id === page.id));
                    if (section) selectPage(page, section.id);
                  }}
                  className="block w-full rounded px-2 py-1 text-left text-sm text-blue-800 hover:bg-blue-100"
                >
                  {page.title}
                </button>
              ))}
            </div>
          )}

          {/* Section Navigation */}
          <nav className="space-y-1">
            {KB_SECTIONS.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    selectedSection === section.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="flex-1">{section.title}</span>
                  {expandedSections[section.id] ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {expandedSections[section.id] && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-2">
                    {section.pages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => selectPage(page, section.id)}
                        className={`block w-full rounded px-3 py-1.5 text-left text-sm transition-colors ${
                          selectedPage === page.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {page.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white p-8">
        {currentPage ? (
          <PageContent page={currentPage} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            <div className="text-center">
              <HelpCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p>Select a topic from the sidebar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Page Content Component
function PageContent({ page }: { page: KBPage }) {
  return (
    <article className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <code className="rounded bg-gray-100 px-2 py-0.5">{page.path}</code>
          <a href={page.path} className="flex items-center gap-1 text-blue-600 hover:underline">
            Open page <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
      </div>

      {/* Purpose */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <div className="rounded bg-blue-100 p-1">
            <BookOpen className="h-4 w-4 text-blue-600" />
          </div>
          Purpose
        </h2>
        <p className="text-gray-700">{page.purpose}</p>
      </section>

      {/* How to Get There */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <div className="rounded bg-green-100 p-1">
            <ChevronRight className="h-4 w-4 text-green-600" />
          </div>
          How to Get There
        </h2>
        <ul className="space-y-1">
          {page.navigation.map((nav, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-700">
              <span className="text-gray-400">•</span>
              {nav}
            </li>
          ))}
        </ul>
      </section>

      {/* What You See */}
      {page.whatYouSee && page.whatYouSee.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="rounded bg-purple-100 p-1">
              <List className="h-4 w-4 text-purple-600" />
            </div>
            What You See
          </h2>
          <div className="space-y-4">
            {page.whatYouSee.map((section, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 font-medium text-gray-900">{section.title}</h3>
                {section.description && (
                  <p className="text-sm text-gray-600">{section.description}</p>
                )}
                {section.items && (
                  <table className="mt-2 w-full text-sm">
                    <tbody>
                      {section.items.map((item, j) => (
                        <tr key={j} className="border-t border-gray-100">
                          <td className="py-1.5 pr-4 font-medium text-gray-800">{item.label}</td>
                          <td className="py-1.5 text-gray-600">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      {page.actions && page.actions.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="rounded bg-orange-100 p-1">
              <ChevronRight className="h-4 w-4 text-orange-600" />
            </div>
            Available Actions
          </h2>
          <div className="rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Action</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                {page.actions.map((action, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.name}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{action.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Workflows */}
      {page.workflows && page.workflows.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="rounded bg-cyan-100 p-1">
              <List className="h-4 w-4 text-cyan-600" />
            </div>
            Typical Workflows
          </h2>
          <div className="space-y-4">
            {page.workflows.map((workflow, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-3 font-medium text-gray-900">{workflow.title}</h3>
                <ol className="space-y-2">
                  {workflow.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                        {j + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faq && page.faq.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="rounded bg-amber-100 p-1">
              <MessageSquare className="h-4 w-4 text-amber-600" />
            </div>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {page.faq.map((item, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <p className="mb-2 font-medium text-gray-900">Q: {item.q}</p>
                <p className="text-sm text-gray-700">A: {item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tips */}
      {page.tips && page.tips.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="rounded bg-yellow-100 p-1">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
            </div>
            Tips
          </h2>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <ul className="space-y-2">
              {page.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-yellow-900">
                  <span className="text-yellow-500">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
