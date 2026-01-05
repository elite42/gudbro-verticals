'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AIChatPanel } from './AIChatPanel';

interface AIChatButtonProps {
  merchantId: string;
  accountId: string;
  merchantName?: string;
}

export function AIChatButton({ merchantId, accountId, merchantName }: AIChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
        >
          <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
          <span className="font-medium">AI Co-Manager</span>
        </button>
      )}

      {/* Chat panel */}
      <AIChatPanel
        merchantId={merchantId}
        accountId={accountId}
        merchantName={merchantName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="floating"
      />
    </>
  );
}
