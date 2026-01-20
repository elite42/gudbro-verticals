'use client';

import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface InfoTooltipProps {
  contentKey: string; // i18n key: nav.dashboard, pages.analytics, etc.
  kbPageId?: string; // Optional KB page link
  side?: 'top' | 'right' | 'bottom' | 'left';
  iconSize?: number;
  className?: string;
}

export function InfoTooltip({
  contentKey,
  kbPageId,
  side = 'top',
  iconSize = 16,
  className,
}: InfoTooltipProps) {
  const t = useTranslations('tooltips');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className={`ml-1.5 inline-flex cursor-pointer rounded-sm text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${className || ''}`}
          aria-label="More information"
        >
          <HelpCircle size={iconSize} />
        </span>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-xs">
        <p className="text-sm">{t(contentKey)}</p>
        {kbPageId && (
          <Link
            href={`/help?page=${kbPageId}`}
            className="mt-2 flex items-center gap-1 text-xs text-blue-300 transition-colors hover:text-blue-200"
          >
            <span>📖</span> {t('learnMore')}
          </Link>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
