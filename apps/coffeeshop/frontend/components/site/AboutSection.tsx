'use client';

import { AboutContent, SiteSectionContent } from '../../lib/site-config';

interface AboutSectionProps {
  content: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

export function AboutSection({ content, styleOverrides }: AboutSectionProps) {
  const aboutContent = content as AboutContent;
  const { title, description, team, values } = aboutContent;

  // Don't render if no content
  if (!title && !description && (!team || team.length === 0) && (!values || values.length === 0)) {
    return null;
  }

  return (
    <section className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
      {/* Title */}
      {title && <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">📖 {title}</h2>}

      {/* Description */}
      {description && (
        <p className="text-theme-text-secondary mb-6 leading-relaxed">{description}</p>
      )}

      {/* Values */}
      {values && values.length > 0 && (
        <div className="mb-6">
          <h3 className="text-theme-text-primary mb-3 font-semibold">Our Values</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {values.map((value, index) => (
              <div key={index} className="bg-theme-bg-secondary rounded-xl p-4">
                <div className="mb-2 flex items-center gap-2">
                  {value.icon && <span className="text-xl">{value.icon}</span>}
                  <h4 className="text-theme-text-primary font-medium">{value.title}</h4>
                </div>
                <p className="text-theme-text-secondary text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team */}
      {team && team.length > 0 && (
        <div>
          <h3 className="text-theme-text-primary mb-3 font-semibold">Our Team</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-theme-bg-secondary mx-auto mb-2 h-20 w-20 overflow-hidden rounded-full">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl">
                      👤
                    </div>
                  )}
                </div>
                <p className="text-theme-text-primary font-medium">{member.name}</p>
                <p className="text-theme-text-secondary text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
