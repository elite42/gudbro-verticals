'use client';

import { SocialContent, SiteSectionContent } from '../../lib/site-config';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { useTranslation } from '../../lib/use-translation';

interface SocialSectionProps {
  content: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

// Platform configuration
const PLATFORMS = {
  facebook: {
    label: 'Facebook',
    bgColor: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    icon: 'f',
  },
  instagram: {
    label: 'Instagram',
    bgColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
    hoverColor: 'hover:opacity-90',
    icon: '📷',
  },
  tiktok: {
    label: 'TikTok',
    bgColor: 'bg-black',
    hoverColor: 'hover:bg-gray-800',
    icon: '♪',
  },
  twitter: {
    label: 'Twitter',
    bgColor: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600',
    icon: '𝕏',
  },
  youtube: {
    label: 'YouTube',
    bgColor: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    icon: '▶',
  },
  tripadvisor: {
    label: 'TripAdvisor',
    bgColor: 'bg-green-600',
    hoverColor: 'hover:bg-green-700',
    icon: '🦉',
  },
};

export function SocialSection({ content, styleOverrides }: SocialSectionProps) {
  const { t } = useTranslation();
  const socialContent = content as SocialContent;
  const { title, display_style = 'buttons' } = socialContent;
  const { social } = coffeeshopConfig;

  // Build links array from config
  const links = [
    social?.facebook && { platform: 'facebook', url: social.facebook },
    social?.instagram && { platform: 'instagram', url: social.instagram },
    social?.tiktok && { platform: 'tiktok', url: social.tiktok },
    // social?.twitter && { platform: 'twitter', url: social.twitter },
    // social?.youtube && { platform: 'youtube', url: social.youtube },
  ].filter(Boolean) as Array<{ platform: keyof typeof PLATFORMS; url: string }>;

  if (links.length === 0) {
    return null;
  }

  return (
    <section className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
      <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">
        🌟 {title || t.home.sections.followUs.title}
      </h2>

      {/* Buttons Style */}
      {display_style === 'buttons' && (
        <div className="flex gap-4">
          {links.map(({ platform, url }) => {
            const config = PLATFORMS[platform];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 rounded-xl ${config.bgColor} p-4 text-center font-bold text-white transition-colors ${config.hoverColor}`}
              >
                {config.label}
              </a>
            );
          })}
        </div>
      )}

      {/* Icons Style */}
      {display_style === 'icons' && (
        <div className="flex gap-4">
          {links.map(({ platform, url }) => {
            const config = PLATFORMS[platform];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-12 w-12 items-center justify-center rounded-full ${config.bgColor} text-xl text-white transition-transform hover:scale-110`}
                title={config.label}
              >
                {config.icon}
              </a>
            );
          })}
        </div>
      )}

      {/* List Style */}
      {display_style === 'list' && (
        <div className="space-y-2">
          {links.map(({ platform, url }) => {
            const config = PLATFORMS[platform];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex items-center gap-3 rounded-xl p-3 transition-colors"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bgColor} text-lg text-white`}
                >
                  {config.icon}
                </div>
                <div>
                  <div className="text-theme-text-primary font-medium">{config.label}</div>
                  <div className="text-theme-text-secondary text-sm">
                    Follow us on {config.label}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
