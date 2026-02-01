'use client';

interface ContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  whatsapp?: string | null;
  roomNumber: string;
  propertyName: string;
}

export default function ContactSheet({
  isOpen,
  onClose,
  phone,
  whatsapp,
  roomNumber,
  propertyName,
}: ContactSheetProps) {
  const cleanPhone = phone.replace(/[\s\-+]/g, '');
  const whatsappNumber = whatsapp?.replace(/[\s\-+]/g, '') || cleanPhone;
  const prefilledMessage = `Hi, I'm staying in Room ${roomNumber} at ${propertyName}. `;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;
  const telUrl = `tel:${phone.replace(/\s/g, '')}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 pb-24">
        <div className="mb-5 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Host</h3>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#3D8B87]/10"
          >
            <span className="text-2xl">💬</span>
            <span className="font-medium text-gray-900">WhatsApp</span>
          </a>
          <a
            href={telUrl}
            className="flex items-center gap-3 rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#3D8B87]/10"
          >
            <span className="text-2xl">📞</span>
            <span className="font-medium text-gray-900">Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
