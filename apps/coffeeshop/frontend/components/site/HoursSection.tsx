'use client';

import { HoursContent, SiteSectionContent } from '../../lib/site-config';
import { OpenStatusBadge, OpeningHoursDisplay } from '../OpenStatusBadge';

interface HoursSectionProps {
  content: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

export function HoursSection({ content, styleOverrides }: HoursSectionProps) {
  const hoursContent = content as HoursContent;
  const { title, show_status_badge } = hoursContent;

  return (
    <section className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-theme-text-primary text-2xl font-bold">
          🕐 {title || 'Opening Hours'}
        </h2>
        {show_status_badge && <OpenStatusBadge showHours={false} />}
      </div>
      <OpeningHoursDisplay />
    </section>
  );
}
