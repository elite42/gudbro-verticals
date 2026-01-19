'use client';

import { SiteSection, SiteSectionType } from '../../lib/site-config';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { GallerySection } from './GallerySection';
import { HoursSection } from './HoursSection';
import { ContactSection } from './ContactSection';
import { SocialSection } from './SocialSection';
import { ReviewsSection } from './ReviewsSection';

interface SectionRendererProps {
  section: SiteSection;
}

/**
 * Renders the appropriate section component based on section type
 */
export function SectionRenderer({ section }: SectionRendererProps) {
  if (!section.is_enabled) {
    return null;
  }

  const { section_type, content, style_overrides } = section;

  switch (section_type) {
    case 'hero':
      return <HeroSection content={content} styleOverrides={style_overrides} />;
    case 'about':
      return <AboutSection content={content} styleOverrides={style_overrides} />;
    case 'gallery':
      return <GallerySection content={content} styleOverrides={style_overrides} />;
    case 'hours':
      return <HoursSection content={content} styleOverrides={style_overrides} />;
    case 'contact':
      return <ContactSection content={content} styleOverrides={style_overrides} />;
    case 'social':
      return <SocialSection content={content} styleOverrides={style_overrides} />;
    case 'reviews':
      return <ReviewsSection content={content} styleOverrides={style_overrides} />;
    default:
      console.warn(`[SectionRenderer] Unknown section type: ${section_type}`);
      return null;
  }
}

/**
 * Renders all sections in order
 */
interface SectionListRendererProps {
  sections: SiteSection[];
}

export function SectionListRenderer({ sections }: SectionListRendererProps) {
  const enabledSections = sections.filter((s) => s.is_enabled);

  if (enabledSections.length === 0) {
    return null;
  }

  return (
    <>
      {enabledSections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}
