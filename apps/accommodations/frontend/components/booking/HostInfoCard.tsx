import { WhatsappLogo, Translate, User } from '@phosphor-icons/react/dist/ssr';

interface HostInfoCardProps {
  hostName: string | null;
  hostPhoto: string | null;
  hostLanguages: string[];
  contactWhatsapp: string | null;
  contactPhone: string | null;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function HostInfoCard({
  hostName,
  hostPhoto,
  hostLanguages,
  contactWhatsapp,
  contactPhone,
}: HostInfoCardProps) {
  if (!hostName) return null;

  const whatsappNumber = contactWhatsapp || contactPhone;

  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">Your Host</h2>
      <div className="border-border bg-background rounded-xl border p-4">
        <div className="flex items-center gap-3">
          {/* Host photo or initials avatar */}
          {hostPhoto ? (
            <img src={hostPhoto} alt={hostName} className="h-14 w-14 rounded-full object-cover" />
          ) : (
            <div className="bg-primary-light flex h-14 w-14 items-center justify-center rounded-full">
              <User size={24} weight="duotone" className="text-primary" />
              <span className="sr-only">{getInitials(hostName)}</span>
            </div>
          )}

          <div>
            <p className="text-foreground font-medium">{hostName}</p>
            {hostLanguages.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <Translate size={14} className="text-foreground-muted" />
                {hostLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-secondary-light text-foreground-muted rounded-full px-2 py-0.5 text-xs"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp CTA */}
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <WhatsappLogo size={20} weight="fill" />
            Message Host
          </a>
        )}
      </div>
    </div>
  );
}
