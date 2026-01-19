'use client';

import Link from 'next/link';
import { HeroContent, SiteSectionContent } from '../../lib/site-config';

interface HeroSectionProps {
  content: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

export function HeroSection({ content, styleOverrides }: HeroSectionProps) {
  const heroContent = content as HeroContent;
  const { title, subtitle, image_url, cta_text, cta_link, overlay_opacity = 0.4 } = heroContent;

  // Don't render if no content
  if (!title && !subtitle && !image_url) {
    return null;
  }

  return (
    <section className="relative mb-8 overflow-hidden rounded-2xl shadow-xl">
      {/* Background Image */}
      {image_url && (
        <div className="absolute inset-0">
          <img
            src={image_url}
            alt={title || 'Hero background'}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black" style={{ opacity: overlay_opacity }} />
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 px-6 py-16 text-center ${
          image_url ? 'text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        }`}
      >
        {title && <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>}
        {subtitle && <p className="mb-8 text-lg text-white/90 md:text-xl">{subtitle}</p>}
        {cta_text && cta_link && (
          <Link
            href={cta_link}
            className="bg-primary inline-block rounded-full px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            {cta_text}
          </Link>
        )}
      </div>
    </section>
  );
}
