'use client';

import { ContactContent, SiteSectionContent } from '../../lib/site-config';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { useTranslation } from '../../lib/use-translation';

interface ContactSectionProps {
  content: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

export function ContactSection({ content, styleOverrides }: ContactSectionProps) {
  const { t } = useTranslation();
  const contactContent = content as ContactContent;
  const { title, show_phone, show_email, show_map, map_embed_url } = contactContent;
  const { contact, location } = coffeeshopConfig;

  return (
    <section className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
      <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">
        📞 {title || t.home.sections.contactUs.title}
      </h2>

      <div className="space-y-3">
        {/* Phone */}
        {show_phone && contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex items-center gap-3 rounded-xl p-3 transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl text-white">
              📞
            </div>
            <div>
              <div className="text-theme-text-primary font-semibold">
                {t.home.sections.contactUs.phone}
              </div>
              <div className="text-theme-text-secondary">{contact.phone}</div>
            </div>
          </a>
        )}

        {/* Zalo (specific to Vietnam market) */}
        {show_phone && contact.zaloId && (
          <a
            href={`https://zalo.me/${contact.zaloId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex items-center gap-3 rounded-xl p-3 transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl text-white">
              💬
            </div>
            <div>
              <div className="text-theme-text-primary font-semibold">
                {t.home.sections.contactUs.zalo}
              </div>
              <div className="text-theme-text-secondary">
                {t.home.sections.contactUs.zaloDescription}
              </div>
            </div>
          </a>
        )}

        {/* Email */}
        {show_email && contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex items-center gap-3 rounded-xl p-3 transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-xl text-white">
              ✉️
            </div>
            <div>
              <div className="text-theme-text-primary font-semibold">
                {t.home.sections.contactUs.email}
              </div>
              <div className="text-theme-text-secondary">{contact.email}</div>
            </div>
          </a>
        )}

        {/* Map */}
        {show_map && (
          <>
            {map_embed_url && (
              <div className="overflow-hidden rounded-xl">
                <iframe
                  src={map_embed_url}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
            {location?.googleMapsUrl && (
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary inline-block rounded-full px-6 py-3 font-bold text-white transition-all hover:shadow-lg"
              >
                🗺️ {t.home.sections.findUs.buttonText}
              </a>
            )}
          </>
        )}
      </div>
    </section>
  );
}
