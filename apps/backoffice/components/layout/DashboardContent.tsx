'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAI } from '@/lib/contexts/AIContext';
import { useSidebar } from '@/lib/contexts/SidebarContext';

interface DashboardContentProps {
  children: ReactNode;
}

/**
 * Dashboard content wrapper that responds to sidebar and AI panel state.
 * - Left sidebar: collapsible (64px collapsed, 256px expanded)
 * - Right AI panel: 420px when open
 */
export function DashboardContent({ children }: DashboardContentProps) {
  const { isOpen: isAIOpen } = useAI();
  const { isExpanded: _isSidebarExpanded } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Sidebar - fixed width based on state */}
      <Sidebar />

      {/* Main content area - adjusts to both sidebars */}
      <div
        className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-out ${
          isAIOpen ? 'mr-0 sm:mr-[420px]' : 'mr-0'
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
